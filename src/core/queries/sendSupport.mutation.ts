import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { toast } from "sonner";
import sendSupportApi from "../api/support/send-support.api";
import { SendSupportPayload } from "@/store-front/features/support/utils/schema/send-support.sf.schema";

export const useSendSupportMutation = () => {
	return useMutation({
		mutationFn: async (payload: SendSupportPayload) => {
			const res: BaseResponseDto<string> = await sendSupportApi.sendSupport(
				payload
			);

			if (res.error || !res.status) {
				throw new Error(res.message || "Failed to send your email!");
			}

			return res.data;
		},
		onSuccess: (data) => {
			toast.success("Your email has been sent!");

			return data;
		},
		onError: (error: Error) => {
			console.log("❌ Image upload mutation error:", error);
			toast.error(error.message);
		},
		onSettled: () => {
			console.log("ℹ️ Image upload mutation finished");
		},
	});
};
