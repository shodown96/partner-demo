import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { VALIDATION_MESSAGES } from "@/lib/constants";
import { format } from "@/lib/utils";

const OnboardingParams = z.object({
    name: z.string({
        required_error: format(VALIDATION_MESSAGES.Required, "Name"),
    }),
    businessName: z.string({
        required_error: format(VALIDATION_MESSAGES.Required, "Business name"),
    }),
    email: z
        .string({
            required_error: format(VALIDATION_MESSAGES.Required, "Email"),
        })
        .email({ message: VALIDATION_MESSAGES.EmailInvalid }),
    phoneNumber: z.string({
        required_error: format(VALIDATION_MESSAGES.Required, "Phone Number"),
    }).regex(/^\+?[0-9]\d{1,14}$/, "Invalid phone number"),
});

export const OnboardingParamsSchema = toFormikValidationSchema(OnboardingParams);
export type OnboardingParamsType = z.infer<typeof OnboardingParams>;


const SubscribeParams = z.object({
    name: z.string({
        required_error: format(VALIDATION_MESSAGES.Required, "Name"),
    }),
    email: z
        .string({
            required_error: format(VALIDATION_MESSAGES.Required, "Email"),
        })
        .email({ message: VALIDATION_MESSAGES.EmailInvalid }),
    phone: z.string({
        required_error: format(VALIDATION_MESSAGES.Required, "Phone Number"),
    }).regex(/^\+?[0-9]\d{1,14}$/, "Invalid phone number"),
});

export const SubscribeParamsSchema = toFormikValidationSchema(SubscribeParams);
export type SubscribeParamsType = z.infer<typeof SubscribeParams>;