"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

interface PassengerFormProps {
  passengerId: string;
  isLead: boolean;
  onDataChange: (passengerId: string, isValid: boolean, data: any) => void;
}

// Schema for passenger details
const passengerSchema = z.object({
  title: z.string().min(1, { message: "Please select a title" }),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .optional(),
  gender: z.string().optional(),
  idType: z.string().optional(),
  acceptTerms: z.boolean().optional(),
  idNumber: z.string().optional(),
  emergencyContact: z.string().optional(),
  phone: z
    .string()
    .min(10, { message: "Please enter a valid phone number" })
    .optional(),
  dateOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  specialRequirements: z.string().optional(),
  termsAccepted: z.boolean().optional(),
});

// Add required email and phone for lead passenger
const leadPassengerSchema = passengerSchema.extend({
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type PassengerFormValues = z.infer<typeof passengerSchema>;

export default function PassengerForm({
  passengerId,
  isLead,
  onDataChange,
}: PassengerFormProps) {
  const schema = isLead ? leadPassengerSchema : passengerSchema;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<PassengerFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      termsAccepted: false,
    },
    mode: "onChange",
  });

  // Watch form values to update parent component
  const formValues = watch();

  useEffect(() => {
    // Only notify parent when form is dirty (user has interacted with it)
    if (isDirty) {
      onDataChange(passengerId, isValid, formValues);
    }
  }, [passengerId, isValid, formValues, isDirty, onDataChange]);

  const [showAdvanced, setShowAdvanced] = useState(false);

  const form = useForm<PassengerFormValues>({
    resolver: zodResolver(passengerSchema),
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      idType: "",
      idNumber: "",
      phone: "",
      email: "",
      emergencyContact: "",
      specialRequirements: "",
      acceptTerms: false,
    },
  });

  function onSubmit(data: PassengerFormValues) {
    console.log(data);
  }

  return (
    <form className="space-y-6">
      <div>
        <Label htmlFor={`${passengerId}-title`}>Title</Label>
        <RadioGroup defaultValue="" className="flex flex-wrap gap-4 mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="mr"
              id={`${passengerId}-mr`}
              {...register("title")}
              onClick={() => setValue("title", "mr", { shouldValidate: true })}
            />
            <Label htmlFor={`${passengerId}-mr`}>Mr</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="mrs"
              id={`${passengerId}-mrs`}
              {...register("title")}
              onClick={() => setValue("title", "mrs", { shouldValidate: true })}
            />
            <Label htmlFor={`${passengerId}-mrs`}>Mrs</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="miss"
              id={`${passengerId}-miss`}
              {...register("title")}
              onClick={() =>
                setValue("title", "miss", { shouldValidate: true })
              }
            />
            <Label htmlFor={`${passengerId}-miss`}>Miss</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="ms"
              id={`${passengerId}-ms`}
              {...register("title")}
              onClick={() => setValue("title", "ms", { shouldValidate: true })}
            />
            <Label htmlFor={`${passengerId}-ms`}>Ms</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="dr"
              id={`${passengerId}-dr`}
              {...register("title")}
              onClick={() => setValue("title", "dr", { shouldValidate: true })}
            />
            <Label htmlFor={`${passengerId}-dr`}>Dr</Label>
          </div>
        </RadioGroup>
        {errors.title && (
          <p className="text-sm text-destructive mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${passengerId}-firstName`}>First Name</Label>
          <Input id={`${passengerId}-firstName`} {...register("firstName")} />
          {errors.firstName && (
            <p className="text-sm text-destructive">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${passengerId}-lastName`}>Last Name</Label>
          <Input id={`${passengerId}-lastName`} {...register("lastName")} />
          {errors.lastName && (
            <p className="text-sm text-destructive">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${passengerId}-email`}>
            Email{" "}
            {isLead ? (
              <span className="text-destructive">*</span>
            ) : (
              "(Optional)"
            )}
          </Label>
          <Input
            id={`${passengerId}-email`}
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${passengerId}-phone`}>
            Phone Number{" "}
            {isLead ? (
              <span className="text-destructive">*</span>
            ) : (
              "(Optional)"
            )}
          </Label>
          <Input id={`${passengerId}-phone`} {...register("phone")} />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${passengerId}-dateOfBirth`}>
            Date of Birth (Optional)
          </Label>
          <Input
            id={`${passengerId}-dateOfBirth`}
            type="date"
            {...register("dateOfBirth")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${passengerId}-nationality`}>
            Nationality (Optional)
          </Label>
          <Select onValueChange={(value) => setValue("nationality", value)}>
            <SelectTrigger id={`${passengerId}-nationality`}>
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nigeria">Nigeria</SelectItem>
              <SelectItem value="ghana">Ghana</SelectItem>
              <SelectItem value="cameroon">Cameroon</SelectItem>
              <SelectItem value="benin">Benin</SelectItem>
              <SelectItem value="togo">Togo</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${passengerId}-specialRequirements`}>
          Special Requirements (Optional)
        </Label>
        <Input
          id={`${passengerId}-specialRequirements`}
          {...register("specialRequirements")}
        />
      </div>

      {isLead && (
        <div className="flex items-start space-x-2 pt-2">
          <Checkbox
            id={`${passengerId}-termsAccepted`}
            {...register("termsAccepted")}
            onCheckedChange={(checked) =>
              setValue("termsAccepted", checked === true, {
                shouldValidate: true,
              })
            }
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor={`${passengerId}-termsAccepted`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I accept the terms and conditions
            </Label>
            {errors.termsAccepted && (
              <p className="text-sm text-destructive">
                {errors.termsAccepted.message}
              </p>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
