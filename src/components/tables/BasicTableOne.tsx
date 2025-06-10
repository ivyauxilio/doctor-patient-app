"use client"
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPatients } from '@/store/slices/patientSlice';
import { RootState, AppDispatch } from '@/store/store';
import { usePathname } from 'next/navigation';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

// import Badge from "../ui/badge/Badge";
// import Image from "next/image";
import { PatientData } from '@/lib/api'; // or wherever you define it
import { format } from "date-fns";

interface BasicTableOneProps {
  data: PatientData[];
  // total: number | null;
}

interface Order {
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
  };
  projectName: string;
  team: {
    images: string[];
  };
  status: string;
  budget: string;
}

// Define the table data using the interface
const tableData: Order[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    projectName: "Agency Website",
    team: {
      images: [
        "/images/user/user-22.jpg",
        "/images/user/user-23.jpg",
        "/images/user/user-24.jpg",
      ],
    },
    budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Project Manager",
    },
    projectName: "Technology",
    team: {
      images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
    },
    budget: "24.9K",
    status: "Pending",
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Zain Geidt",
      role: "Content Writing",
    },
    projectName: "Blog Writing",
    team: {
      images: ["/images/user/user-27.jpg"],
    },
    budget: "12.7K",
    status: "Active",
  },
  {
    id: 4,
    user: {
      image: "/images/user/user-20.jpg",
      name: "Abram Schleifer",
      role: "Digital Marketer",
    },
    projectName: "Social Media",
    team: {
      images: [
        "/images/user/user-28.jpg",
        "/images/user/user-29.jpg",
        "/images/user/user-30.jpg",
      ],
    },
    budget: "2.8K",
    status: "Cancel",
  },
  {
    id: 5,
    user: {
      image: "/images/user/user-21.jpg",
      name: "Carla George",
      role: "Front-end Developer",
    },
    projectName: "Website",
    team: {
      images: [
        "/images/user/user-31.jpg",
        "/images/user/user-32.jpg",
        "/images/user/user-33.jpg",
      ],
    },
    budget: "4.5K",
    status: "Active",
  },
];

// const BasicTableOne: React.FC<BasicTableOneProps> = () => {
export default function BasicTableOne() {
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM d, yyyy, h:mm a");
  };
  const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();
    const [search, setSearch] = useState('');
    const { data, total, current_page, loading, error } = useSelector((state: RootState) => state.patients);
    
    useEffect(() => {
      dispatch(fetchPatients({ page: 1, search }));
    }, [dispatch]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchPatients({ page: 1, search }));
    console.log("se",search)
  };
  
  return (
    <div className='relative'>
      {pathname !== '/' && (
      <div className='flex justify-end pb-5'>
         <form onSubmit={handleSearch}>
              <div className="relative">
                <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
                  <svg
                    className="fill-gray-500 dark:fill-gray-400"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                      fill=""
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={handleInputChange}
                  placeholder="Search by name"
              className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent 
                  py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 
                  focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
            />
              {search ? (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  dispatch(fetchPatients({ page: 1, search: '' })); // reload all data
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white 
                rounded-lg px-[10px] py-[2px] hover:bg-red-600 text-2xl"
              >
                &times;
              </button>
            ) : (
                
                <button type="submit" className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 
                items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px]
                text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400
                 hover:bg-green-500 hover:text-black">
                  <span> ⌘ </span>
                  <span> Search </span>
                </button>
            )}

              </div>
            </form>  
        </div>
      )}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-y-auto overflow-x-auto">
          <div className="w-full overflow-x-auto">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    Date Created
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    Age
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    Sex
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    Address
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    Contact Number
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    Chief Complaint
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    HPI
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    NOS
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    PMHx
                  </TableCell>
                   <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    PE
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    Laboratory/Diagnostic
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    Impression
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    Treatment Plan
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    Surgical Procedure
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    Date of Surgery
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    Place of Surgery
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    On Findings
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    HISTOPATH
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-bold text-gray-800 text-start text-theme-xs dark:text-gray-400"
                  >
                    ANESTHESIOLOGIST
                  </TableCell> 
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {/* {data.map((i) => (
                  <p>{i.first_name}</p>
                )) } */}
                {data
                  .filter((p) => p.created_at)
                  .slice()
                  .sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())
                  .map((i) => (
                  <TableRow key={i.id}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {i.created_at && (formatDate(i.created_at))}
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        {/* <div className="w-10 h-10 overflow-hidden rounded-full">
                          <Image
                            src={i.sex?.toLowerCase().trim() === "male" ? "/images/icons/man.png" : "/images/icons/female.png"}
                            alt={i.sex}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div> */}
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {i.first_name} {i.last_name} 
                          </span>
                          {/* <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            {order.user.role}
                          </span> */}
                        </div>
                      </div>
                    </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {i.age}
                    </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {i.sex}
                    </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {i.address}
                    </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {i.telephone_number}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {i.chief_complaint}
                    </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {i.hpi}
                    </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {i.nos}
                    </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {i.pmhx}
                    </TableCell>
                 <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {i.pe}
                    </TableCell>
                   <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {i.lab_diagnostic}
                    </TableCell>
                   <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {i.impression}
                    </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {i.treatment_plan}
                    </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {i.surgical_procedure}
                    </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {i.surgery_date}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {i.surgery_place}
                    </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {i.on_findings}
                    </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {i.histopath}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {i.anesthesiologist}
                    </TableCell> 
                    {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="flex -space-x-2">
                        {order.team.images.map((teamImage, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                          >
                            <Image
                              width={24}
                              height={24}
                              src={teamImage}
                              alt={`Team member ${index + 1}`}
                              className="w-full"
                            />
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          order.status === "Active"
                            ? "success"
                            : order.status === "Pending"
                            ? "warning"
                            : "error"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {order.budget}
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default BasicTableOne;