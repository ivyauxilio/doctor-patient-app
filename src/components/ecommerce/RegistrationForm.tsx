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

interface Props {
  patient?: PatientData | null;
}

export default function Registration({ patient }: Props) {
	const [message, setMessage] = useState("");
	const [formData, setFormData] = useState<PatientData>({
    user_id: 1,
    dob: '',
    first_name: '',
    last_name: '',
    age: 0,
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
	});
	
	useEffect(() => {
    if (patient) {
      setFormData(patient);
    }
	}, [patient]);
	const dispatch = useDispatch<AppDispatch>();
	const [token, setToken] = useState<string>('');
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

	const options = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" }
  ];
  const handleSelectChange = (value: string) => {
		setSelectedOption(value);
		setFormData((prev) => ({
			...prev,
			sex: value, // store just the value, e.g. "female"
		}));
  };

	const handleTextAreaChange = (field: string) => (value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const userId = localStorage.getItem('user_id');
		if (!userId) {
				setMessage('User not logged in. Please login again.');
			return;
		}

		const updatedFormData = {
			...formData,
			user_id: userId ? parseInt(userId) : null,
		};

		try {
			let result;
			if (formData.id) {
				// Editing an existing patient
				result = await dispatch(updatePatient({ updatedData: formData, id: formData.id, })).unwrap();
				console.log("formedit", formData)
				setMessage('Patient successfully updated!');
				document.getElementById("editPatient")?.style.setProperty("display", "none");
				document.body.style.overflow = '';
				Swal.fire({
					icon: 'success',
					title: 'Updated!',
					text: 'Patient updated successfully.',
				});
			} else {
				// Creating a new patient
				result = await createPatient(updatedFormData);
				setMessage('Patient successfully added!');
				Swal.fire({
					icon: 'success',
					title: 'Updated!',
					text: 'Patient successfully added!',
				});
			}
		} catch (error: any) {
			console.error(error.response?.data || error.message);
			setMessage('Error saving patient.');
			Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
		}
    // try {
		// 	let result = await createPatient(updatedFormData);
    //   setMessage('Patient successfully added!');
    //   console.log(result);
    // } catch (error: any) {
    //   console.error(error.response?.data || error.message);
    //   setMessage('Error creating patient.');
    // }
  };
	
	return(
		<ComponentCard title="Patient information">
			<form onSubmit={handleSubmit}>
			<div className="space-y-6">
				<div className='flex items-center space-x-4'>
					<div className='w-1/3'> 
						<Label>First Name</Label>
						<Input type="text" value={formData.first_name} name="first_name" onChange={handleChange}/>
					</div>
					{/* <div className='w-1/3'> 
						<Label>Middle Name</Label>
						<Input type="text" name="last_name" onChange={handleChange} />
						</div> */}
					<div className='w-1/3'> 
						<Label>Last Name</Label>
						<Input type="text" value={formData.last_name} name="last_name" onChange={handleChange}/>
					</div>
				</div>
				<div className='flex items-center space-x-4'>
						<div className='w-1/4 md:w-auto'> 
							<Label>Sex</Label>
							<div className="relative">
								<Select
									options={options}
									value={formData.sex}
									placeholder="Select an option"
									onChange={handleSelectChange}
									className="dark:bg-dark-900"
								/>
							<span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
								<ChevronDownIcon/>
								</span>
							</div>
						</div>
						<div className='w-1/6 md:w-auto'> 
							<Label>Age</Label>
							<Input name="age" value={formData.age.toString()} type="number" onChange={handleChange}/>
						</div>
						<div> 
							<Label>Phone Number</Label>
							<Input type="text" value={formData.telephone_number}  name="telephone_number" onChange={handleChange}/>
						</div>
						<div>

						</div>
					</div>	
					<div>
						<Label>Address</Label>
						<Input type="text" value={formData.address} name="address" onChange={handleChange}/>
					</div>
					<div>
						<Label>Chief Complain</Label>
						<TextArea
							value={formData.chief_complaint}
							rows={3}
							onChange={handleTextAreaChange("chief_complaint")}
						/>

					</div>
					<div>
						<Label>HPI</Label>
						<TextArea
							value={formData.hpi}
							onChange={handleTextAreaChange("hpi")}
							rows={2}
						/>
					</div>
					<div>
						<Label>NOS</Label>
						<TextArea
							value={formData.nos}
							onChange={handleTextAreaChange("nos")}
							rows={2}
						/>
					</div>
					<div>
						<Label>PMHx</Label>
						<TextArea
							value={formData.pmhx}
							onChange={handleTextAreaChange("pmhx")}
							rows={2}
						/>
					</div>
					<div>
						<Label>PE</Label>
						<TextArea
							value={formData.pe}
							onChange={handleTextAreaChange("pe")}
							rows={2}
						/>
					</div>
					<div>
						<Label>Laboratories/Diagnostics</Label>
						<TextArea
							value={formData.lab_diagnostic}
							onChange={handleTextAreaChange("lab_diagnostic")}
							rows={2}
						/>
					</div>
					<div>
						<Label>Impression</Label>
						<TextArea
							value={formData.impression}
							onChange={handleTextAreaChange("impression")}
							rows={2}
						/>
					</div>
					<div>
						<Label>Treatment Plan</Label>
						<TextArea
							value={formData.treatment_plan}
							onChange={handleTextAreaChange("treatment_plan")}
							rows={3}
						/>
					</div>
					<div>
						<Label>Surgical Procedure</Label>
						<TextArea
							value={formData.surgical_procedure}
							onChange={handleTextAreaChange("surgical_procedure")}
							rows={3}
						/>
					</div>
						<div>						
								<DatePicker
									id="surgery_date"
									label="Date of Surgery"
									placeholder="Select date"
									defaultDate={formData.surgery_date}
									onChange={(val) =>
										setFormData((prev) => ({ ...prev, surgery_date: val }))
									}
								/>
						</div>
					<div> 
						<Label>Place of Surgery</Label>
						<Input type="text" value={formData.surgery_place} name="surgery_place" onChange={handleChange}/>
					</div>
					<div>
						<Label>On Findings</Label>
						<TextArea
							value={formData.on_findings}
							onChange={handleTextAreaChange("on_findings")}
							rows={3}
						/>
					</div>
					<div>
						<Label>HISTOPATH</Label>
						<TextArea
							value={formData.histopath}
							onChange={handleTextAreaChange("histopath")}
							rows={3}
						/>
					</div>
					<div> 
						<Label>ANESTHESIOLOGIST</Label>
						<Input type="text" value={formData.anesthesiologist} name="anesthesiologist" onChange={handleChange}/>
					</div>
					<div className="flex items-center justify-end gap-5">
							<Button size="sm" variant="success" startIcon={<CheckCircleIcon />}>
								Save Details
							</Button>
					</div>
				</div>
			</form>
	</ComponentCard>
	);
}