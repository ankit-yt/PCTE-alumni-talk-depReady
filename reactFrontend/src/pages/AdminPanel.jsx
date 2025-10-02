import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarItem from "../components/SideBarItems";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { setScreenWidth } from "../redux/slices/uiSlice";
import { getAllAlumni } from "../api/alumni.api";
import { addAlumni } from "../redux/slices/alumniSlice";
import { toast } from "react-toastify";
import { getAllMeets } from "../api/meet.api";
import { addMeets } from "../redux/slices/meetSlice";

function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reFetch, setReFetch] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      dispatch(setScreenWidth(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  useEffect(() => {
    try {
      console.log("fetching alumnia data");
      const fetchAllAlumni = async () => {
        const response = await getAllAlumni();
        console.log(response.data);
        dispatch(addAlumni(response.data));
      };
      fetchAllAlumni();
      const fetchAllMeets = async () => {
        const response = await getAllMeets();
        dispatch(addMeets(response.data.data));
      };
      fetchAllMeets();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while fetching alumni data");
    }
  }, [dispatch, reFetch]);

  return (
    <div className="flex w-full h-screen relative">
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white shadow-md z-30 flex items-center p-4">
        <button onClick={() => setSidebarOpen(true)}>
          <Bars3Icon className="w-7 h-7 text-red-600" />
        </button>
        <h1 className="ml-4 font-bold text-lg text-red-600">Alumni Talks</h1>
      </div>

      <div
        className={`fixed lg:static top-0 left-0 h-screen flex flex-col items-start 
        bg-white border-r border-gray-200 px-4 py-6 transition-transform duration-300 z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 
        w-64`}
      >
        <div className="w-full mb-8 px-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
            <img src="" alt="" />
          </div>
          <h1 className="text-lg font-bold text-gray-800">Alumni TALK's</h1>
        </div>

        <SidebarItem setSidebarOpen={setSidebarOpen} />

        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-5 right-5 text-gray-500 lg:hidden"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 bg-[#f5f6fa] overflow-y-auto lg:ml-0 pt-14 lg:pt-0">
        <Outlet context={{ reFetch, setReFetch }} />
      </div>
    </div>
  );
}

export default AdminPanel;
