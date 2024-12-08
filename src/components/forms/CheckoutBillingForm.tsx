"use client";

import Countries from "@/lib/json/country.json";
import makeApiCallService from "@/lib/service/apiService";
import { billingAtom } from "@/lib/storage/jotai";
import { useAtom } from "jotai";
import { ChangeEvent, FormEvent, useState } from "react";
import MainButton from "../common/MainButton";

type BillingInfo = {
  firstName: string;
  lastName: string;
  company?: string;
  country: string;
  street: string;
  town: string;
  province: string;
  zipCode: string;
  phone: string;
  email: string;
  additionalInfo?: string;
};

type Errors = Partial<Record<keyof BillingInfo, string>>;

export function CheckoutBillingForm() {
  const [billingInfo, setBillingInfo] = useAtom(billingAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<BillingInfo>({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    street: "",
    town: "",
    province: "",
    zipCode: "",
    phone: "",
    email: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.street.trim()) newErrors.street = "Street address is required.";
    if (!formData.town.trim()) newErrors.town = "Town/City is required.";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "A valid email address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = billingInfo
        ? await makeApiCallService("/api/billing", {
          method: "PUT",
          body: { data: formData, billingId: formData},
        })
        : await makeApiCallService("/api/billing", {
          method: "POST",
          body: formData,
        });

      setBillingInfo(response?.response?.data);
    } catch (error) {
      console.error("Error saving billing info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6 pb-32">
      <p className="font-bold text-[36px]">Billing details</p>

      <div className="flex gap-[31px] w-full">
        <div className="flex-grow">
          <label className="block font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="h-[50px] w-full"
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
        </div>

        <div className="flex-grow">
          <label className="block font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="h-[50px] w-full"
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Company Name (Optional)</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className="h-[50px] w-full"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Country / Region</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          className="h-[50px] w-full"
        >
          <option value="">Select Country</option>
          {Countries.map((country, index) => (
            <option key={index} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && <p className="text-red-500">{errors.country}</p>}
      </div>

      {["street", "town", "province", "zipCode", "phone", "email", "additionalInfo"].map((field) => (
        <div key={field}>
          <label className="block font-medium mb-1 capitalize">
            {field.replace(/([A-Z])/g, " $1")}
          </label>
          <input
            type="text"
            name={field}
            value={formData[field as keyof BillingInfo] || ""}
            onChange={handleInputChange}
            className="h-[50px] w-full"
          />
          {errors[field as keyof Errors] && <p className="text-red-500">{errors[field as keyof Errors]}</p>}
        </div>
      ))}

      <div className="mt-6">
        <MainButton text="Save Billing Info" isSubmitable isLoading={isLoading} />
      </div>
    </form>
  );
}
