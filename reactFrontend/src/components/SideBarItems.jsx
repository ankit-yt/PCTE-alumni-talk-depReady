import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UserPlusIcon,
  CalendarDaysIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import React from "react";

const navItems = [
  { icon: HomeIcon, href: "/admin", label: "Dashboard" },
  { icon: UserPlusIcon, href: "/admin/add-alumni", label: "Add Alumni" },
  { icon: CalendarDaysIcon, href: "/admin/plan-meet", label: "Plan Meet" },
  { icon: ChartBarIcon, href: "/admin/stats", label: "Reports" },
];

const SidebarItem = ({ setSidebarOpen }) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="w-full space-y-2">
      {navItems.map(({ icon: Icon, href, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            to={href}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-200
              ${
                isActive
                  ? "bg-red-50 text-red-600 border-l-4 border-red-600 font-semibold shadow-sm"
                  : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
              }`}
          >
            <Icon
              className={`w-5 h-5 ${
                isActive
                  ? "text-red-600"
                  : "text-gray-500 group-hover:text-red-600"
              }`}
            />
            <span className="text-sm">{label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarItem;
