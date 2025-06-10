"use client"
import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
// import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import Registration from '@/components/ecommerce/RegistrationForm';
// import StatisticsChart from "@/components/ecommerce/StatisticsChart";
// import RecentOrders from "@/components/ecommerce/RecentOrders";
// import DemographicCard from "@/components/ecommerce/DemographicCard";
import { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPatients } from '@/store/slices/patientSlice';
import { RootState, AppDispatch } from '@/store/store';

const metadata: Metadata = {
  title:
    "DR. Enesio Surgical Clinic App",
  description: "This is a doctor's clinic app for patients information",
};

export default function Ecommerce() {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState('');
  const { data, total, current_page, loading, error } = useSelector((state: RootState) => state.patients);
  
  useEffect(() => {
    dispatch(fetchPatients({ page: 1, search }));
  }, [dispatch]);

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics total={total} />

        {/* <MonthlySalesChart /> */}
        <Registration />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget data={data} />
      </div>

      {/* <div className="col-span-12">
        <StatisticsChart />
      </div> */}

      {/* <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div> */}
    </div>
  );
}
