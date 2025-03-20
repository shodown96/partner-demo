"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useFormik } from 'formik';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ERROR_MESSAGES, PLACEHOLDERS } from '@/lib/constants/index';
import { OnboardingParamsType, SubscribeParamsSchema, SubscribeParamsType } from '@/lib/validation';
import { PaystackReference } from "@/types/paystack";
import { useEffect } from "react";
import toast from 'react-hot-toast';
import { usePaystackPayment } from 'react-paystack';


interface ClientSubscribeDialogProps {
  open: boolean,
  onboardedValues: OnboardingParamsType,
  setOpen: (open: boolean) => void
}

function ClientSubscribeDialog({
  open,
  onboardedValues,
  setOpen
}: ClientSubscribeDialogProps) {

  const defined = typeof window !== 'undefined';
  if (!defined) {
    return null;
  }
  const initializePayment = usePaystackPayment({
    publicKey: String(process.env.NEXT_PUBLIC_PAYSTACK_API_PUBLIC_KEY)
  });

  const handleFormSubmit = async (values: SubscribeParamsType) => {
    try {
      setOpen(false)

      const onSuccess = async (reference: PaystackReference) => {
        console.log(reference);
        const toastId = toast.loading("Verifying transaction")
        toast.dismiss(toastId)
        toast.success("Thank you for purchasing this product! please check your email for further instructions, also check your spam in case you don't see it in your inbox.")
      };
      const onClose = () => {
        toast.error(ERROR_MESSAGES.UnexpectedError)
      }
      initializePayment({
        onSuccess,
        onClose,
        config: {
          ...values,
          firstname: values?.name.split(" ")?.[0] || "",
          lastname: values?.name.split(" ")?.[1] || "",
          amount: 5000 * 100,
          plan: process.env.NEXT_PUBLIC_PLAN_ID
        } as any
      })

    } catch (error) {

    }
  };

  const formik = useFormik<SubscribeParamsType>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: SubscribeParamsSchema,
    validateOnBlur: true,
    onSubmit: handleFormSubmit,
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    isSubmitting,
    setValues
  } = formik;

  useEffect(() => {
    if (onboardedValues) {
      setValues({
        name: onboardedValues.businessName,
        email: onboardedValues.email,
        phone: onboardedValues.phoneNumber,
      })
    }
  }, [onboardedValues])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:max-w-[500px]"
        onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Subscribe to Sendeet</DialogTitle>
          <DialogDescription>
            Enter your details
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 py-4">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="lg:min-w-20">
                  Name
                </Label>
                <Input
                  id="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  error={errors.name}
                  touched={touched.name}
                  placeholder={PLACEHOLDERS.NAME}
                  containerClass="w-full"
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="lg:min-w-20">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
                  placeholder={PLACEHOLDERS.EMAIL}
                  containerClass="w-full"
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="lg:min-w-20">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  error={errors.phone}
                  touched={touched.phone}
                  placeholder={PLACEHOLDERS.PHONE}
                  containerClass="w-full"
                  disabled
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              loading={isSubmitting}>
              Subscribe
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ClientSubscribeDialog