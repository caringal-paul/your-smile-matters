// import { useEffect } from 'react';
// import { useForm, UseFormReturn, FieldValues, Path } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { BookingFormData, useBookingFormStore } from './useBookingFormStore';

// // Step-specific schemas for validation
// export const step1Schema = z.object({
//   services: z.array(z.object({
//     service_id: z.string().min(1, "Service is required"),
//     quantity: z.number().min(1, "Quantity must be at least 1"),
//     price_per_unit: z.number().min(0, "Price cannot be negative"),
//     total_price: z.number().min(0, "Total price cannot be negative"),
//     duration_minutes: z.number().nullable().optional(),
//   })).min(1, "At least one service is required"),
//   is_customized: z.boolean(),
//   customization_notes: z.string().nullable().optional(),
//   package_id: z.string().nullable().optional(),
// });

// export const step2Schema = z.object({
//   booking_date: z.date({ required_error: "Booking date is required" }),
//   start_time: z.string().min(1, "Start time is required").regex(
//     /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
//     "Invalid time format (HH:MM)"
//   ),
//   end_time: z.string().nullable().optional(),
//   session_duration_minutes: z.number().min(15, "Session must be at least 15 minutes"),
//   location: z.string().min(5, "Location must be at least 5 characters"),
// });

// export const step3Schema = z.object({
//   photographer_id: z.string().min(1, "Photographer selection is required"),
//   theme: z.string().nullable().optional(),
//   special_requests: z.string().nullable().optional(),
// });

// export const step4Schema = z.object({
//   total_amount: z.number().min(0, "Total amount cannot be negative"),
//   discount_amount: z.number().min(0, "Discount cannot be negative"),
//   promo_id: z.string().nullable().optional(),
//   final_amount: z.number().min(0, "Final amount cannot be negative"),
//   payment_image: z.array(z.string()).optional(),
// });

// // Combined schema for full form validation
// export const bookingFormSchema = z.object({
//   ...step1Schema.shape,
//   ...step2Schema.shape,
//   ...step3Schema.shape,
//   ...step4Schema.shape,
//   customer_name: z.string().min(2, "Name must be at least 2 characters"),
//   customer_email: z.string().email("Invalid email format"),
// });

// type StepSchemas = {
//   1: typeof step1Schema;
//   2: typeof step2Schema;
//   3: typeof step3Schema;
//   4: typeof step4Schema;
// };

// // Type for step-specific form data
// export type Step1FormData = z.infer<typeof step1Schema>;
// export type Step2FormData = z.infer<typeof step2Schema>;
// export type Step3FormData = z.infer<typeof step3Schema>;
// export type Step4FormData = z.infer<typeof step4Schema>;

// export type StepFormData = Step1FormData | Step2FormData | Step3FormData | Step4FormData;

// // Custom hook for each step
// export function useBookingStepForm<T extends keyof StepSchemas>(
//   step: T
// ): UseFormReturn<z.infer<StepSchemas[T]>> & {
//   syncWithStore: () => void;
//   saveProgress: () => void;
// } {
//   const {
//     formData,
//     setField,
//     setFieldImmediate,
//     setStepValid,
//     isDraft,
//     saveDraft,
//   } = useBookingFormStore();

//   // Get the appropriate schema for the step
//   const schemas = {
//     1: step1Schema,
//     2: step2Schema,
//     3: step3Schema,
//     4: step4Schema,
//   } as StepSchemas;

//   const currentSchema = schemas[step];

//   // Initialize React Hook Form
//   const form = useForm<z.infer<StepSchemas[T]>>({
//     resolver: zodResolver(currentSchema),
//     mode: 'onChange',
//     defaultValues: getStepDefaultValues(step, formData),
//   });

//   const { watch, setValue, formState, trigger } = form;

//   // Sync form data with Zustand store using debounced updates
//   useEffect(() => {
//     const subscription = watch((value, { name }) => {
//       if (name && value[name] !== undefined) {
//         // Use debounced update for most fields
//         setField(name as keyof BookingFormData, value[name]);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [watch, setField]);

//   // Update step validation status
//   useEffect(() => {
//     const stepKey = `step${step}` as keyof typeof formData;
//     setStepValid(stepKey as any, formState.isValid);
//   }, [formState.isValid, setStepValid, step]);

//   // Sync Zustand store data back to form (for when store is updated externally)
//   const syncWithStore = () => {
//     const stepData = getStepDefaultValues(step, formData);
//     Object.entries(stepData).forEach(([key, value]) => {
//       setValue(key as any, value, { shouldValidate: true });
//     });
//   };

//   // Manual save progress (immediate update)
//   const saveProgress = async () => {
//     const isValid = await trigger();
//     if (isValid) {
//       const values = form.getValues();
//       Object.entries(values).forEach(([key, value]) => {
//         setFieldImmediate(key as keyof BookingFormData, value);
//       });
//       saveDraft();
//     }
//   };

//   return {
//     ...form,
//     syncWithStore,
//     saveProgress,
//   };
// }

// // Helper function to get default values for each step
// function getStepDefaultValues<T extends keyof StepSchemas>(
//   step: T,
//   formData: BookingFormData
// ): Partial<z.infer<StepSchemas[T]>> {
//   switch (step) {
//     case 1:
//       return {
//         services: formData.services,
//         is_customized: formData.is_customized,
//         customization_notes: formData.customization_notes,
//         package_id: formData.package_id,
//       } as Partial<z.infer<StepSchemas[T]>>;

//     case 2:
//       return {
//         booking_date: formData.booking_date,
//         start_time: formData.start_time,
//         end_time: formData.end_time,
//         session_duration_minutes: formData.session_duration_minutes,
//         location: formData.location,
//       } as Partial<z.infer<StepSchemas[T]>>;

//     case 3:
//       return {
//         photographer_id: formData.photographer_id,
//         theme: formData.theme,
//         special_requests: formData.special_requests,
//       } as Partial<z.infer<StepSchemas[T]>>;

//     case 4:
//       return {
//         total_amount: formData.total_amount,
//         discount_amount: formData.discount_amount,
//         promo_id: formData.promo_id,
//         final_amount: formData.final_amount,
//         payment_image: formData.payment_image,
//       } as Partial<z.infer<StepSchemas[T]>>;

//     default:
//       return {};
//   }
// }

// // Utility hook for draft management
// export function useBookingDraftManager() {
//   const { isDraft, clearDraft, resetForm, modalOpen } = useBookingFormStore();

//   const confirmDraftDiscard = () => {
//     if (isDraft) {
//       const confirmed = window.confirm(
//         'You have unsaved changes. Are you sure you want to discard them?'
//       );
//       if (confirmed) {
//         resetForm();
//         return true;
//       }
//       return false;
//     }
//     return true;
//   };

//   const handleModalClose = () => {
//     if (!confirmDraftDiscard()) {
//       return false; // Don't close modal
//     }
//     return true; // Allow modal close
//   };

//   return {
//     isDraft,
//     clearDraft,
//     resetForm,
//     confirmDraftDiscard,
//     handleModalClose,
//   };
// }

// // Hook for step navigation
// export function useBookingStepNavigation() {
//   const {
//     currentStep,
//     setCurrentStep,
//     isStepComplete,
//     canProceedToStep,
//   } = useBookingFormStore();

//   const goToStep = (step: number) => {
//     if (canProceedToStep(step)) {
//       setCurrentStep(step);
//       return true;
//     }
//     return false;
//   };

//   const goToNextStep = () => {
//     const nextStep = currentStep + 1;
//     if (nextStep <= 5) { // Max 5 steps including summary
//       return goToStep(nextStep);
//     }
//     return false;
//   };

//   const goToPreviousStep = () => {
//     const prevStep = currentStep - 1;
//     if (prevStep >= 1) {
//       return goToStep(prevStep);
//     }
//     return false;
//   };

//   return {
//     currentStep,
//     goToStep,
//     goToNextStep,
//     goToPreviousStep,
//     isStepComplete,
//     canProceedToStep,
//   };
// }
