"use client"
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const MedicalEditor: React.FC = () => {

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
          <h1 className="text-2xl font-bold">Dr. Enesio Surgical & Medical Clinic</h1>
          <p className="text-sm">Daet Medical Plaza, Bagasbas Road, Daet, Camarines Norte</p>
          <p className="text-sm">Contact No. (+63) 928-5000-298</p>
          {/* <hr className="my-2 border-t-4 border-gray-300" /> */}
        </div>

        <h2 className="text-3xl font-bold text-center mb-10" style={{marginBottom: "50px", marginTop: "50px"}} >CERTIFICATION</h2>

          
        <div className="flex justify-start text-right items-center mt-10 mb-4 space-x-4">
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

      <div className="flex items-center flex-wrap mt-10">

        <p>This is to certify that </p>
           <input
          type="text"
          id="name"
          className="flex-1 border-b border-gray-400 focus:outline-none 
          focus:border-blue-600 px-2 py-1 bg-transparent"
          placeholder="Enter your name"
            /> 
            <p className="flex mt-5">, </p>
          <div className="flex items-center space-x-2 min-w-[120px]">
            <input
              type="number"
              id="age"
              className="w-20 border-b border-gray-400 focus:outline-none focus:border-blue-600 px-2 py-1 bg-transparent"
              placeholder="Age"
              />
           <label htmlFor="age" className="text-sm font-medium whitespace-nowrap">
              years old, has 
            </label>
              <br />
             
            </div>
             <p>been seen and examined in my clinic for Medical Check-up.</p>
      </div>

        <div className="flex flex-wrap gap-6 mb-1">
  
        </div>


        <div className="mt-20 pl-5 my-6">
          <label className="block text-sm font-medium">Impression:</label>
          <textarea
            className="w-full focus:outline-none border-b border-none
            focus:border-blue-600 px-2 py-1 bg-transparent resize-none h-30"
            placeholder="Enter impression details "
            
          />
        </div>

          <p>This certification was issued for whatever purpose it my serve him/her.</p>
          <p className="mt-10">Thank you very much.</p>

        <div className="flex justify-start mt-20">
          <div className="flex flex-col text-justify text-sm max-w-xs">
            <h4 className="text-based font-bold">Emmanuel D. Enesio, M.D.</h4>
            <p>Lic. No. <span className="underline font-bold">____88510_____</span></p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MedicalEditor;
