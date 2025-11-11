import React, { useEffect, useState } from "react";
import { Star, MessageSquare, Check, Loader2 } from "lucide-react";
import { Button } from "@/core/components/base/button";
import { Textarea } from "@/core/components/base/textarea";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/core/components/base/dialog";
import { Badge } from "@/core/components/base/badge";
import { Label } from "@/core/components/base/label";
import { useCreateRatingMutation } from "../queries/createRating.sf.mutation";
import { useGetRatingPerBooking } from "../queries/getRatingPerBooking.sf.query";
import { useUpdateRatingMutation } from "../queries/updateRating.sf.mutation";

// Types
export type RatableType = "Service" | "Package";

export interface RatableItem {
	id: string;
	name: string;
	type: RatableType;
}

export interface RatingFormData {
	ratable_id: string;
	ratable_type: RatableType;
	rating: number;
	comment: string;
}

interface ExistingRating {
	_id: string;
	ratable_id: { _id: string; name: string };
	ratable_type: RatableType;
	rating: number;
	comment?: string;
	created_at: string;
	response?: string;
	responded_at?: string;
}

// Star Rating Component
const StarRating: React.FC<{
	rating: number;
	onRatingChange?: (rating: number) => void;
	readonly?: boolean;
	size?: "sm" | "md" | "lg";
}> = ({ rating, onRatingChange, readonly = false, size = "md" }) => {
	const [hover, setHover] = useState(0);

	const sizeClasses = {
		sm: "w-4 h-4",
		md: "w-6 h-6",
		lg: "w-8 h-8",
	};

	return (
		<div className="flex gap-1">
			{[1, 2, 3, 4, 5].map((star) => (
				<button
					key={star}
					type="button"
					disabled={readonly}
					className={`transition-all ${
						readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
					}`}
					onClick={() => onRatingChange?.(star)}
					onMouseEnter={() => !readonly && setHover(star)}
					onMouseLeave={() => !readonly && setHover(0)}
				>
					<Star
						className={`${sizeClasses[size]} transition-colors ${
							star <= (hover || rating)
								? "fill-yellow-400 text-yellow-400"
								: "fill-gray-200 text-gray-300"
						}`}
					/>
				</button>
			))}
		</div>
	);
};

// Single Item Rating Form
const RatingItemForm: React.FC<{
	item: RatableItem;
	onCreateRating: (data: RatingFormData) => Promise<void>;
	onUpdateRating: (
		ratingId: string,
		data: { rating?: number; comment?: string }
	) => Promise<void>;
	existingRating?: ExistingRating;
	isSubmitting: boolean;
}> = ({
	item,
	onCreateRating,
	onUpdateRating,
	existingRating,
	isSubmitting,
}) => {
	const [rating, setRating] = useState(existingRating?.rating || 0);
	const [comment, setComment] = useState(existingRating?.comment || "");

	// Update local state when existingRating changes
	useEffect(() => {
		if (existingRating) {
			setRating(existingRating.rating);
			setComment(existingRating.comment || "");
		}
	}, [existingRating]);

	const handleSubmit = async () => {
		if (rating === 0) return;

		if (existingRating) {
			await onUpdateRating(existingRating._id, {
				rating,
				comment: comment.trim(),
			});
		} else {
			// Create new rating
			await onCreateRating({
				ratable_id: item.id,
				ratable_type: item.type,
				rating,
				comment: comment.trim(),
			});
		}
	};

	return (
		<div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
			<div className="flex items-start justify-between">
				<div>
					<div className="flex items-center gap-2">
						<h4 className="font-semibold text-gray-900">{item.name}</h4>
						<Badge variant="outline" className="text-xs">
							{item.type}
						</Badge>
					</div>
					{existingRating && (
						<p className="text-xs text-green-600 mt-1 flex items-center gap-1">
							<Check className="w-3 h-3" /> Already rated on{" "}
							{new Date(existingRating.created_at).toLocaleDateString()}
						</p>
					)}
				</div>
			</div>

			<div className="space-y-2">
				<Label className="text-sm font-medium">Your Rating</Label>
				<StarRating rating={rating} onRatingChange={setRating} size="lg" />
				{rating > 0 && (
					<p className="text-xs text-gray-500">
						{rating === 1 && "Poor"}
						{rating === 2 && "Fair"}
						{rating === 3 && "Good"}
						{rating === 4 && "Very Good"}
						{rating === 5 && "Excellent"}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<Label className="text-sm font-medium">
					Comment <span className="text-gray-400 font-normal">(Optional)</span>
				</Label>
				<Textarea
					placeholder="Share your experience..."
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					maxLength={1000}
					rows={3}
					className="resize-none"
				/>
				<p className="text-xs text-gray-400 text-right">
					{comment.length}/1000
				</p>
			</div>

			{existingRating?.response && (
				<div className="p-3 bg-blue-50 border border-blue-200 rounded">
					<p className="text-xs font-semibold text-blue-900 mb-1">
						Business Response:
					</p>
					<p className="text-sm text-blue-800">{existingRating.response}</p>
					<p className="text-xs text-blue-600 mt-1">
						{new Date(existingRating.responded_at!).toLocaleDateString()}
					</p>
				</div>
			)}

			<Button
				onClick={handleSubmit}
				disabled={rating === 0 || isSubmitting}
				className="w-full"
			>
				{isSubmitting ? (
					<>
						<Loader2 className="w-4 h-4 mr-2 animate-spin" />
						{existingRating ? "Updating..." : "Submitting..."}
					</>
				) : existingRating ? (
					"Update Rating"
				) : (
					"Submit Rating"
				)}
			</Button>
		</div>
	);
};

// Main Rating Modal
export const BookingRatingModal: React.FC<{
	bookingId: string;
	bookingReference: string;
	items: RatableItem[];
}> = ({ bookingId, bookingReference, items }) => {
	const [open, setOpen] = useState(false);

	const { mutateAsync: createRating, isPending: isCreating } =
		useCreateRatingMutation();
	const { mutateAsync: updateRating, isPending: isUpdating } =
		useUpdateRatingMutation();

	const {
		data: ratingsData,
		isLoading: isLoadingRatings,
		refetch: refetchRatings,
	} = useGetRatingPerBooking(bookingId);

	const existingRatings = ratingsData || [];

	const handleCreateRating = async (data: RatingFormData) => {
		try {
			await createRating({
				booking_id: bookingId,
				ratable_type: data.ratable_type,
				ratable_id: data.ratable_id,
				rating: data.rating,
				comment: data.comment,
			});

			// Refetch ratings after successful submission
			await refetchRatings();
		} catch (error) {
			console.error("Failed to create rating:", error);
		}
	};

	const handleUpdateRating = async (
		ratingId: string,
		data: { rating?: number; comment?: string }
	) => {
		try {
			await updateRating({
				ratingId,
				payload: data,
			});

			// Refetch ratings after successful update
			await refetchRatings();
		} catch (error) {
			console.error("Failed to update rating:", error);
		}
	};

	const getRatingForItem = (itemId: string) => {
		return existingRatings.find(
			(r) => r.ratable_id._id === itemId
		) as ExistingRating;
	};

	const allRated = items.every((item) => getRatingForItem(item.id));
	const isSubmitting = isCreating || isUpdating;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant={allRated ? "outline" : "default"} className="gap-2">
					{allRated ? (
						<>
							<Check className="w-4 h-4" />
							View Ratings
						</>
					) : (
						<>
							<Star className="w-4 h-4" />
							Rate Booking
						</>
					)}
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-2xl">Rate Your Experience</DialogTitle>
					<DialogDescription>
						Booking Reference:{" "}
						<span className="font-semibold text-primary">
							{bookingReference}
						</span>
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 mt-4">
					{isLoadingRatings ? (
						<div className="flex items-center justify-center py-8">
							<Loader2 className="w-8 h-8 animate-spin text-gray-400" />
							<p className="ml-3 text-gray-500">Loading ratings...</p>
						</div>
					) : items.length === 0 ? (
						<div className="text-center py-8 text-gray-500">
							<MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
							<p>No items available to rate</p>
						</div>
					) : (
						items.map((item) => (
							<RatingItemForm
								key={item.id}
								item={item}
								onCreateRating={handleCreateRating}
								onUpdateRating={handleUpdateRating}
								existingRating={getRatingForItem(item.id)}
								isSubmitting={isSubmitting}
							/>
						))
					)}
				</div>

				{allRated && !isLoadingRatings && (
					<div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
						<p className="text-sm text-green-800 font-medium flex items-center gap-2">
							<Check className="w-4 h-4" />
							Thank you for rating your booking! Your feedback helps us improve.
						</p>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};
