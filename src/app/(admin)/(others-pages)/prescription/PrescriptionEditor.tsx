"use client"
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrescriptionEditor: React.FC = () => {

const contentRef = useRef<HTMLDivElement>(null);
const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-end items-center mb-4">
        {/* <h1 className="text-2xl font-bold">Prescription Editor</h1> */}
        <button
          onClick={reactToPrintFn}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Print
        </button>
      </div>

      {/* Prescription Content */}
      <div className="rounded-lg shadow-lg">
      <div ref={contentRef} className="bg-white p-10 ">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Dr. Emmanuel Enesio Surgical & Medical Clinic</h1>
          <p className="text-sm">Daet Medical Plaza, Bagasbas Road, Daet, Camarines Norte</p>
          <p className="text-sm">Contact No. (+63) 928-5000-298</p>
          <hr className="my-2 border-t-4 border-gray-300" />
        </div>

      <div className="flex items-center mb-1 space-x-4">
        <label
          htmlFor="name"
          className="text-sm font-medium whitespace-nowrap"
        >
          Name of Patient:
        </label>
        <input
          type="text"
          id="name"
          className="flex-1 border-b border-gray-400 focus:outline-none 
          focus:border-blue-600 px-2 py-1 bg-transparent"
          placeholder="Enter your name"
        />
      </div>

        <div className="flex flex-wrap gap-6 mb-1">
          {/* Address */}
          <div className="flex items-center space-x-2 min-w-[270px] flex-1">
            <label htmlFor="address" className="text-sm font-medium whitespace-nowrap">
              Address:
            </label>
            <input
              type="text"
              id="address"
              className="flex-1 border-b border-gray-400 focus:outline-none focus:border-blue-600 px-2 py-1 bg-transparent"
              placeholder="Enter address"
            />
          </div>

          {/* Age */}
          <div className="flex items-center space-x-2 min-w-[120px]">
            <label htmlFor="age" className="text-sm font-medium whitespace-nowrap">
              Age:
            </label>
            <input
              type="number"
              id="age"
              className="w-20 border-b border-gray-400 focus:outline-none focus:border-blue-600 px-2 py-1 bg-transparent"
              placeholder="Age"
            />
          </div>

          {/* Sex */}
          <div className="flex items-center space-x-2 min-w-[170px]">
            <label htmlFor="sex" className="text-sm font-medium whitespace-nowrap">
              Sex:
            </label>
            <select
              id="sex"
              className="border-b border-gray-400 focus:outline-none focus:border-blue-600 px-2 py-1 bg-transparent"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end text-right items-center mb-4 space-x-4">
          <label
            htmlFor="name"
            className="text-sm font-medium whitespace-nowrap"
          >
            Date: 
          </label>
          <input
            type="date"
            id="name"
            className="border-b border-gray-400 focus:outline-none 
            focus:border-blue-600 px-2 py-1 bg-transparent"
            placeholder="Enter your name"
          />
        </div>
        
        <div className="pl-5 mt-1">
          <span className="text-6xl font-bold text-black select-none">℞</span>
        </div>
        {/* <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Name of Patient</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input type="date" className="w-full border p-2 rounded mt-1" />
          </div>
        </div> */}

        <div className="my-6">
          {/* <label className="block text-sm font-medium">Diagnosis</label> */}
          <textarea
            className="w-full focus:outline-none border-b border-gray-100
            focus:border-blue-600 px-2 py-1 bg-transparent resize-none h-60"
            placeholder="Enter diagnosis details "
            
          />
        </div>

        <div className="mb-4">
          {/* <label className="block text-sm font-medium">Medications</label> */}
          <textarea
            
            className="w-full focus:outline-none  resize-none
            focus:border-blue-600 px-2 py-1 bg-transparent h-80"
            placeholder="Ex. 1. Paracetamol 500mg - Twice a day after meals..."
          />
        </div>

        <div className="flex justify-end mt-6">
          <div className="flex flex-col text-justify text-sm max-w-xs">
            <h4 className="text-based font-bold">Emmanuel D. Enesio, M.D.</h4>
            <p>Lic. No. <span className="underline font-bold">____88510_____</span></p>
            <p>S2  <strong>___________________</strong></p>
            <p>PTR<strong>__________________</strong></p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PrescriptionEditor;
