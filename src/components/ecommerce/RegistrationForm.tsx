"use client"
import React, { useState,useEffect } from "react";
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import Select from '@/components/form/Select';
import TextArea from "@/components/form/input/TextArea";
import DatePicker from '@/components/form/date-picker';
import Button from "@/components/ui/button/Button";
import Swal from 'sweetalert2';
import { ChevronDownIcon, BoxIcon, CheckCircleIcon, EyeCloseIcon, EyeIcon, TimeIcon } from '@/icons';
import ComponentCard from '@/components/common/ComponentCard';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { createPatient, PatientData } from '@/lib/api';
import { updatePatient } from "@/store/slices/patientSlice";

import { useForm, Controller } from "react-hook-form";

interface Props {
  patient?: PatientData | null;
}

export default function PatientForm({ patient }: Props) {
  const dispatch = useDispatch<AppDispatch>();
	const minValue = 3;
	const maxValue = 99;
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PatientData>({
    defaultValues: {
      user_id: 1,
      dob: '',
      first_name: '',
      last_name: '',
      age: undefined,
      sex: '',
      address: '',
      telephone_number: '',
      chief_complaint: '',
      hpi: '',
      nos: '',
      pmhx: '',
      pe: '',
      lab_diagnostic: '',
      impression: '',
      treatment_plan: '',
      surgical_procedure: '',
			surgery_date: '',
      surgery_place: '',
      on_findings: '',
      histopath: '',
      anesthesiologist: '',
    },
  });

  useEffect(() => {
    if (patient) reset(patient);
  }, [patient, reset]);

  const onSubmit = async (data: PatientData) => {
    const userId = localStorage.getItem("user_id");
    const finalData = { ...data, user_id: parseInt(userId ?? '1') };

    try {
      if (patient?.id) {
        await dispatch(updatePatient({ id: patient.id, updatedData: finalData })).unwrap();
        Swal.fire("Updated!", "Patient updated successfully.", "success");
      } else {
        await createPatient(finalData);
        Swal.fire("Created!", "Patient added successfully.", "success");
        reset();
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  const options = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
  ];

  return (
    <ComponentCard title="Patient information">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-1/2">
            <Label className="required-asterisk">First Name</Label>
						<Input
							{...register("first_name", { required: "First name is required" })}
							min={String(minValue)}
							max={String(maxValue)}
						/>
            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
          </div>
          <div className="w-1/2">
            <Label className="required-asterisk">Last Name</Label>
						<Input {...register("last_name", { required: "Last name is required" })}
							min={String(minValue)}
							max={String(maxValue)}	
						/>
            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-1/4 md:w-auto">
            <Label className="required-asterisk">Sex</Label>
            <Controller
              name="sex"
              control={control}
              rules={{ required: "Sex is required" }}
              render={({ field }) => (
                <div className="relative">
                  <Select options={options} {...field} placeholder="Select" />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDownIcon />
                  </span>
                </div>
              )}
            />
            {errors.sex && <p className="text-red-500 text-sm">{errors.sex.message}</p>}
          </div>

          <div className="w-1/6 md:w-auto">
            <Label>Age</Label>
						<Input
							type="number"
							placeholder="Enter age"
							    {...register("age", {
								required: "Age is required",
								validate: (value) => {
									const num = Number(value);
									if (isNaN(num)) return "Age must be a number";
									if (num <= 0) return "Age must be greater than 0";
									if (num > 100) return "Age must be less than or equal to 100";
									return true;
								},
							})}
						/>
						{errors.age && (
							<p className="text-red-500 text-sm">{errors.age.message}</p>
						)}
          </div>

          <div>
            <Label className="required-asterisk">Phone Number</Label>
						<Input
							type="tel"
							min="0"
							{...register("telephone_number",
								{  
									required: "Phone number is required",
									   pattern: {
											value: /^(09|\+639)\d{9}$/,
											message: "Enter a valid PH phone number (e.g. 09171234567)",
										},
								 })}
							placeholder="e.g. 09171234567"
						/>
						{errors.telephone_number && (
							<p className="text-red-500 text-sm mt-1">
								{errors.telephone_number.message}
							</p>
						)}
          </div>
        </div>

        <div>
          <Label className="required-asterisk">Address</Label>
					<Input {...register("address", { required: "Address is required" })} />
						{errors.address && (
							<p className="text-red-500 text-sm mt-1">
								{errors.address.message}
							</p>
						)}
        </div>

        <div>
          <Label>Chief Complaint</Label>
          <Controller
						name="chief_complaint"
						control={control}
						rules={{
							required: "Chief complaint is required",
							minLength: { value: 10, message: "Too short" },
							maxLength: { value: 200, message: "Too long" },
						}}
						render={({ field, fieldState }) => (
							<TextArea
								value={field.value}
								onChange={field.onChange} // 
								rows={4}
								placeholder="Enter your complaint"
								error={!!fieldState?.error}
							/>
						)}
					/>
        </div>

        <div>
          <Label>HPI</Label>
					<Controller
						name="hpi"
						control={control}
						render={({ field, fieldState }) => (
							<TextArea
								value={field.value}
								onChange={field.onChange} // 
								rows={2}
								placeholder="Enter your message"
								error={!!fieldState?.error}
							/>
						)}
					/>
        </div>

        <div>
          <Label>NOS</Label>
					<Controller
						name="nos"
						control={control}
						render={({ field, fieldState }) => (
							<TextArea
								value={field.value}
								onChange={field.onChange} // 
								rows={2}
								placeholder="Enter your message"
								error={!!fieldState?.error}
							/>
						)}
					/>
        </div>

        <div>
          <Label>PMHx</Label>
					<Controller
						name="pmhx"
						control={control}
						render={({ field, fieldState }) => (
							<TextArea
								value={field.value}
								onChange={field.onChange} // 
								rows={3}
								placeholder="Enter your message"
								error={!!fieldState?.error}
							/>
						)}
					/>
        </div>

        <div>
          <Label>PE</Label>
					<Controller
						name="pe"
						control={control}
						render={({ field, fieldState }) => (
							<TextArea
								value={field.value}
								onChange={field.onChange} // 
								rows={2}
								placeholder="Enter your message"
								error={!!fieldState?.error}
							/>
						)}
					/>
        </div>

        <div>
          <Label>Lab Diagnostics</Label>
					<Controller
						name="lab_diagnostic"
						control={control}
						render={({ field, fieldState }) => (
							<TextArea
								value={field.value}
								onChange={field.onChange} // 
								rows={2}
								placeholder="Enter your message"
								error={!!fieldState?.error}
							/>
						)}
					/>
        </div>

        <div>
          <Label>Impression</Label>
					<Controller
						name="impression"
						control={control}
						render={({ field, fieldState }) => (
							<TextArea
								value={field.value}
								onChange={field.onChange} // 
								rows={2}
								placeholder="Enter your message"
								error={!!fieldState?.error}
							/>
						)}
					/>
        </div>

        <div>
          <Label>Treatment Plan</Label>
					<Controller
						name="treatment_plan"
						control={control}
						render={({ field, fieldState }) => (
							<TextArea
								value={field.value}
								onChange={field.onChange} // 
								rows={2}
								placeholder="Enter your message"
								error={!!fieldState?.error}
							/>
						)}
					/>
        </div>

        <div>
          <Label>Surgical Procedure</Label>
					<Controller
						name="surgical_procedure"
						control={control}
						render={({ field, fieldState }) => (
							<TextArea
								value={field.value}
								onChange={field.onChange} // 
								rows={2}
								placeholder="Enter your message"
								error={!!fieldState?.error}
							/>
						)}
					/>
        </div>
				<Controller
					name="surgery_date"
					control={control}
					render={({ field, fieldState }) => (
						<div>
							<DatePicker
								id="surgery_date"
								label="Date of Surgery"
								placeholder="Select date"
								defaultDate={field.value}
								onChange={(val) => field.onChange(val)} 
							/>
							{fieldState.error?.message && (
								<p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
							)}
						</div>
					)}
				/>
        <div>
          <Label>Surgery Place</Label>
          <Input {...register("surgery_place")} />
        </div>

        <div>
          <Label>On Findings</Label>
					<Controller
						name="on_findings"
						control={control}
						render={({ field, fieldState }) => (
							<TextArea
								value={field.value}
								onChange={field.onChange} // 
								rows={2}
								placeholder="Enter your message"
								error={!!fieldState?.error}
							/>
						)}
					/>
        </div>

        <div>
          <Label>Histopath</Label>
					<Controller
						name="histopath"
						control={control}
						render={({ field, fieldState }) => (
							<TextArea
								value={field.value}
								onChange={field.onChange} // 
								rows={2}
								placeholder="Enter your message"
								error={!!fieldState?.error}
							/>
						)}
					/>
        </div>

        <div>
          <Label>Anesthesiologist</Label>
					<Input {...register("anesthesiologist")} />
        </div>

        <div className="flex items-center justify-end gap-5">
          <Button size="sm" variant="success" startIcon={<CheckCircleIcon />}>
            Save Details
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}