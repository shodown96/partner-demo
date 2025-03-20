"use client"
import Title from '@/components/custom/title';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { OnboardingParamsSchema, OnboardingParamsType } from '../../lib/validation';

const ClientSubscribeModal = dynamic(() => import('../../components/custom/client-subscribe-modal'), { ssr: false })

export default function OnboardingPage() {
  const [open, setOpen] = useState(false)

  const handleFormSubmit = async (values: OnboardingParamsType) => {
    console.log("onboarding values", values)
    toast.custom(JSON.stringify(values))
    toast.success(`Welcome ${values.name}`)
    setOpen(true)
    // toast.success("Work in progress");
    // try {
    //   const result = await sendContact(values);
    //   if (result) {
    //     toast.success(MESSAGES.SuccessfulContact);
    //     formik.resetForm()
    //   } else {
    //     toast.error(MESSAGES.UnexpectedError);
    //   }
    // } catch (error) {
    //   toast.error(MESSAGES.UnexpectedError);
    // }
  };
  const formik = useFormik<OnboardingParamsType>({
    initialValues: {
      name: "",
      businessName: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: OnboardingParamsSchema,
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
    setValues,
    isSubmitting,
  } = formik;
  return (
    <div>
      <div className="pt-60 flex items-center flex-col">
        <Title
          title="Onboard user"
          description=""
        />
        <div className="flex gap-6 flex-col w-[500px]">
          <Input
            label="Name"
            id="name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            error={errors.name}
            touched={touched.name}
            containerClass="flex-1"
            placeholder="Enter your Full Name"
          />
          <Input
            label="Business Name"
            id="businessName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.businessName}
            error={errors.businessName}
            touched={touched.businessName}
            containerClass="flex-1"
            placeholder="Enter your Business name"
          />
          <Input
            label="Email"
            id="email"
            type="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            error={errors.email}
            touched={touched.email}
            placeholder="Enter your Email"
          />
          <Input
            label="Phone number"
            id="phoneNumber"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phoneNumber}
            error={errors.phoneNumber}
            touched={touched.phoneNumber}
            placeholder="Phone number"
          />
          <Button
            className="w-full"
            loading={isSubmitting}
            onClick={() => handleSubmit()}>
            Continue
          </Button>
          <ClientSubscribeModal open={open} setOpen={setOpen} onboardedValues={values} />
        </div>
      </div>
    </div>
  )
}
