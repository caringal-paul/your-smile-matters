import { create } from "zustand";
import { persist } from "zustand/middleware";
import debounce from "lodash/debounce";
import { formatToUtc } from "@/ami/shared/helpers/formatDate";
import { BookingStatus } from "@/ami/shared/types/status.types";

type StepKey = "step1" | "step2" | "step3" | "step4";

// Types based on your booking schema
export type BookingFormService = {
	_id: string;
	quantity: number;
	price_per_unit: number;
	total_price: number;
	duration_minutes?: number | null;
};

export type BookingFormData = {
	// Step 1: Services & Customization
	services: BookingFormService[];
	is_customized: boolean;
	customization_notes?: string | null;
	customer_id?: string;
	package_id?: string | null;

	// Step 2: Date, Time & Location
	booking_date: Date;
	start_time: string;
	end_time: string;
	session_duration_minutes: number;
	location: string;

	// Step 3: Photographer & Details
	photographer_id: string;
	photographer_name?: string | null;
	theme?: string | null;
	special_requests?: string | null;

	// Step 4: Payment & Pricing
	old_amount?: number;
	total_amount: number;
	discount_amount: number;
	promo_id?: string | null;
	final_amount: number;

	// Metadata
	is_booking_sent: boolean;
	status: BookingStatus;
	booking_reference: string;
};

type BookingState = {
	// Modal & Draft Management
	modalOpen: boolean;
	currentStep: number;

	// Form Data - Flat structure for easier management
	formData: BookingFormData;
	originalFormData: BookingFormData | null;

	draft: BookingFormData | null;

	saveDraft: () => void;
	loadDraft: () => void;
	clearDraft: () => void;

	// Form Validation State
	stepValidation: {
		step1: boolean;
		step2: boolean;
		step3: boolean;
		step4: boolean;
	};

	loading: boolean;
	// Actions
	openModal: (step?: number) => void;
	closeModal: () => void;
	setLoading: (loading: boolean) => void;
	// Debounced field updates
	setField: <K extends keyof BookingFormData>(
		field: K,
		value: BookingFormData[K]
	) => void;

	// Immediate field updates (for critical actions)
	setFieldImmediate: <K extends keyof BookingFormData>(
		field: K,
		value: BookingFormData[K]
	) => void;

	// Service management
	addService: (service: BookingFormService) => void;
	updateService: (index: number, service: BookingFormService) => void;

	updateServiceQuantity: (_id: string, quantity: number) => void;

	removeService: (index: number) => void;
	gotoStep: (index: number) => void;

	// Step validation
	setStepValid: (
		step: keyof BookingState["stepValidation"],
		isValid: boolean
	) => void;

	// Form lifecycle
	saveOriginalForm: (formData: BookingFormData) => void;
	resetForm: () => void;
	clearForm: () => void;

	// Computed values
	getTotalAmount: () => number;
	getTotalDuration: () => number;
	isStepComplete: (step: number) => boolean;
	validateStep: (step: number) => boolean;
	canProceedToStep: (step: number) => boolean;
};

const initialFormData: BookingFormData = {
	services: [],
	is_customized: false,
	customization_notes: null,
	customer_id: "",
	package_id: null,

	booking_date: formatToUtc(new Date()),
	start_time: "",
	end_time: "",
	session_duration_minutes: 0,
	location: "",

	photographer_id: "",
	photographer_name: null,
	theme: null,
	special_requests: null,

	total_amount: 0,
	discount_amount: 0,
	promo_id: null,
	final_amount: 0,

	is_booking_sent: false,
	status: "Pending",
	booking_reference: "",
};

export const useBookingFormStore = create<BookingState>()(
	persist(
		(set, get) => {
			// Create debounced setField function
			const debouncedSetField = debounce(
				<K extends keyof BookingFormData>(
					field: K,
					value: BookingFormData[K]
				) => {
					const debouncedValidateStep = debounce((step: number) => {
						get().validateStep(step);
					}, 150);

					set((state) => {
						const updatedFormData = { ...state.formData, [field]: value };

						// Auto-calculate derived values
						if (
							field === "services" ||
							field === "discount_amount" ||
							field === "promo_id"
						) {
							const total = calculateTotalAmount(updatedFormData.services);
							updatedFormData.total_amount = total;
							updatedFormData.final_amount =
								total - updatedFormData.discount_amount;
						}

						if (field === "services") {
							const totalDuration = calculateTotalDuration(
								updatedFormData.services
							);
							updatedFormData.session_duration_minutes = totalDuration;
						}

						if (field === "location") {
							// get().validateStep(2);
							debouncedValidateStep(2);
						}

						return {
							formData: updatedFormData,
							draft: updatedFormData,
						};
					});
				},
				100
			);

			return {
				modalOpen: false,
				currentStep: 1,
				loading: false,
				formData: initialFormData,
				draft: null,
				originalFormData: null,
				stepValidation: {
					step1: false,
					step2: false,
					step3: false,
					step4: false,
				},

				openModal: (step = 1) => set({ modalOpen: true, currentStep: step }),

				closeModal: () => set({ modalOpen: false }),

				setLoading: (loading) => set({ loading }),

				setField: debouncedSetField,

				setFieldImmediate: <K extends keyof BookingFormData>(
					field: K,
					value: BookingFormData[K]
				) => {
					set((state) => {
						const updatedFormData = { ...state.formData, [field]: value };

						// Auto-calculate derived values immediately
						if (
							field === "services" ||
							field === "discount_amount" ||
							field === "promo_id"
						) {
							const total = calculateTotalAmount(updatedFormData.services);
							updatedFormData.total_amount = total;
							updatedFormData.final_amount =
								total - updatedFormData.discount_amount;
						}

						if (field === "services") {
							const totalDuration = calculateTotalDuration(
								updatedFormData.services
							);
							updatedFormData.session_duration_minutes = totalDuration;
						}

						return {
							formData: updatedFormData,
							draft: updatedFormData,
						};
					});
				},

				addService: (service: BookingFormService) => {
					set((state) => {
						const updatedServices = [...state.formData.services, service];
						const total = calculateTotalAmount(updatedServices);
						const totalDuration = calculateTotalDuration(updatedServices);

						return {
							formData: {
								...state.formData,
								services: updatedServices,
								total_amount: total,
								final_amount: total - state.formData.discount_amount,
								session_duration_minutes: totalDuration,
								is_customized: true,
							},
						};
					});
				},

				updateService: (index: number, service: BookingFormService) => {
					set((state) => {
						const updatedServices = [...state.formData.services];
						updatedServices[index] = service;
						const total = calculateTotalAmount(updatedServices);
						const totalDuration = calculateTotalDuration(updatedServices);

						return {
							formData: {
								...state.formData,
								services: updatedServices,
								total_amount: total,
								final_amount: total - state.formData.discount_amount,
								session_duration_minutes: totalDuration,
							},
						};
					});
				},

				updateServiceQuantity: (_id: string, quantity: number) => {
					set((state) => {
						const updatedServices = state.formData.services.map((service) =>
							service._id === _id
								? {
										...service,
										quantity,
										total_price: quantity * service.price_per_unit,
								  }
								: service
						);

						const total = calculateTotalAmount(updatedServices);
						const totalDuration = calculateTotalDuration(updatedServices);

						return {
							formData: {
								...state.formData,
								services: updatedServices,
								total_amount: total,
								final_amount: total - state.formData.discount_amount,
								session_duration_minutes: totalDuration,
							},
						};
					});
				},

				removeService: (index: number) => {
					set((state) => {
						const updatedServices = state.formData.services.filter(
							(_, i) => i !== index
						);
						const total = calculateTotalAmount(updatedServices);
						const totalDuration = calculateTotalDuration(updatedServices);

						return {
							formData: {
								...state.formData,
								services: updatedServices,
								total_amount: total,
								final_amount: total - state.formData.discount_amount,
								session_duration_minutes: totalDuration,
							},
						};
					});
				},

				gotoStep: (step: number) => {
					set((state) => ({
						currentStep: step,
					}));
				},

				setStepValid: (step, isValid) => {
					set((state) => ({
						stepValidation: {
							...state.stepValidation,
							[step]: isValid,
						},
					}));
				},

				saveOriginalForm: (formData: BookingFormData) => {
					const session_duration_minutes = calculateTotalDuration(
						formData.services
					);

					set(() => ({
						originalFormData: { ...formData, session_duration_minutes },
						formData: { ...formData, session_duration_minutes },
					}));
				},

				saveDraft: () => {
					set((state) => ({
						draft: { ...state.formData },
					}));
				},

				loadDraft: () => {
					set((state) => {
						if (!state.draft) return state;
						return {
							formData: { ...state.draft },
						};
					});
				},

				clearDraft: () => {
					set({ draft: null });
				},

				resetForm: () => {
					set((state) => ({
						formData: state.originalFormData ?? initialFormData,
						currentStep: 1,
					}));

					for (let i = 1; i <= 4; i++) {
						get().validateStep(i);
					}
				},

				clearForm: () => {
					set({
						formData: initialFormData,
						currentStep: 1,
						stepValidation: {
							step1: false,
							step2: false,
							step3: false,
							step4: false,
						},
						originalFormData: null,
					});
				},

				getTotalAmount: () => {
					const { services } = get().formData;
					return calculateTotalAmount(services);
				},

				getTotalDuration: () => {
					const { services } = get().formData;
					return calculateTotalDuration(services);
				},

				isStepComplete: (step: number) => {
					const { formData, stepValidation } = get();

					switch (step) {
						case 1:
							return formData.services.length > 0 && stepValidation.step1;
						case 2:
							return (
								formData.booking_date !== null &&
								formData.start_time !== "" &&
								formData.end_time !== "" &&
								formData.location !== "" &&
								stepValidation.step2
							);
						case 3:
							return formData.photographer_id !== null && stepValidation.step3;
						case 4:
							return formData.final_amount > 0 && stepValidation.step4;
						default:
							return false;
					}
				},

				validateStep: (step: number): boolean => {
					const { formData } = get();
					const errors: string[] = [];

					switch (step) {
						case 1:
							if (!formData.services || formData.services.length === 0) {
								errors.push("At least one service must be selected.");
							}
							break;

						case 2:
							if (!formData.booking_date)
								errors.push("Booking date is required.");
							if (!formData.start_time) errors.push("Start time is required.");
							if (!formData.end_time) errors.push("End time is required.");
							if (!formData.location) errors.push("Location is required.");
							break;

						case 3:
							if (!formData.photographer_id) {
								errors.push("A photographer must be selected.");
							}
							break;

						case 4:
							if (formData.final_amount <= 0) {
								errors.push("Final amount must be greater than zero.");
							}

							break;
					}

					const isValid = errors.length === 0;

					set((state) => {
						const newValidation = { ...state.stepValidation };
						newValidation[`step${step}` as StepKey] = isValid;

						let newFormData = { ...state.formData };

						if (!isValid) {
							console.log(
								`Step ${step} failed validation, clearing dependent data`
							);

							// cascade reset later steps validation
							for (let i = step + 1; i <= 4; i++) {
								newValidation[`step${i}` as StepKey] = false;
							}

							// clear dependent step data based on requirement
							newFormData = clearDependentData(newFormData, step);
						}

						return {
							stepValidation: newValidation,
							formData: newFormData,
							currentStep: isValid ? step : state.currentStep,
						};
					});

					return isValid;
				},

				canProceedToStep: (step: number) => {
					const state = get();

					// Can always go to step 1
					if (step === 1) return true;

					// Check if previous steps are complete
					for (let i = 1; i < step; i++) {
						if (!state.isStepComplete(i)) {
							return false;
						}
					}

					return true;
				},
			};
		},
		{
			name: "booking-form",
			// Only persist essential data, not debounced functions
			partialize: (state) => ({
				modalOpen: state.modalOpen,
				currentStep: state.currentStep,
				formData: state.formData,
				stepValidation: state.stepValidation,
				draft: state.draft,
			}),
		}
	)
);

const clearDependentData = (
	formData: BookingFormData,
	step: number
): BookingFormData => {
	const newFormData = { ...formData };

	switch (step) {
		case 1: // Step 1 fail clears Step 2 + Step 3
			newFormData.booking_date = undefined as any;
			newFormData.start_time = "";
			newFormData.end_time = "";
			newFormData.location = "";
			newFormData.photographer_id = "";
			newFormData.photographer_name = null;
			newFormData.theme = null;
			newFormData.special_requests = null;
			newFormData.final_amount = 0;
			break;

		case 2: // Step 2 fail clears Step 3
			newFormData.photographer_id = "";
			newFormData.photographer_name = null;
			newFormData.theme = null;
			newFormData.special_requests = null;
			break;

		case 3: // Step 3 fail does nothing
			break;
	}

	return newFormData;
};

// Helper functions
const calculateTotalAmount = (services: BookingFormService[]): number => {
	return services.reduce((total, service) => total + service.total_price, 0);
};

const calculateTotalDuration = (services: BookingFormService[]): number => {
	return services.reduce((total, service) => {
		const serviceDuration = service.duration_minutes ?? 120; // ✅ changed to 120

		return total + serviceDuration * service.quantity;
	}, 0);
};
