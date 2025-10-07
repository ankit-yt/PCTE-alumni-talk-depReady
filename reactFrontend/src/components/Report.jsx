import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Download, Check } from "lucide-react";
import Header from "./common/Header";
import { toast } from "sonner";

function Report() {
  const fields = [
    "alumni",
    "alumniCompany",
    "alumniPost",
    "alumniBatch",
    "title",
    "description",
    "time",
    "location",
    "organizedBy",
    "status",
    "classJoined"
  ];

  const [selectedArray, setSelectedArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheckBoxChange = (field) => {
    setSelectedArray((prev) =>
      prev.includes(field)
        ? prev.filter((item) => item !== field)
        : [...prev, field]
    );
  };

  const submit = async () => {
    if (selectedArray.length === 0) {
      toast.error("Please select at least one field to include in the report.")
      return;
    }
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        "/report",
        { selectedFields: selectedArray },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(
        new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading report:", err);
      toast.error("Something went wrong while generating the report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full  ">
      <div className="px-6 md:px-16 pt-12">
        <Header
          value={{
            title1: "Generate Report",
            description1:
              "Customize the data you want to include in your downloadable Excel report. Pick only the fields relevant to your analysis.",
            section: "report",
          }}
          setters={{}}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-start mt-8 px-6 md:px-12">
        <div className="w-full max-w-5xl bg-white shadow-md rounded-2xl border border-gray-100 p-8 md:p-10 flex flex-col justify-between h-[75vh]">
       
          <div className="flex-1 overflow-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Select Fields
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {fields.map((field) => {
                const isSelected = selectedArray.includes(field);
                return (
                  <button
                    key={field}
                    onClick={() => handleCheckBoxChange(field)}
                    className={`group flex items-center justify-between w-full rounded-xl px-4 py-3 text-sm font-medium transition-all duration-150 
                      ${
                        isSelected
                          ? "bg-red-50 text-red-600 border border-red-200 shadow-sm"
                          : "bg-gray-50 text-gray-700 border border-gray-100 hover:bg-gray-100"
                      }`}
                  >
                    <span className="capitalize truncate">{field === "title" ? "Talk Title" : field === "description" ? "Talk Description" : field === "time" ? "Talk Date" : field === "location" ? "venue" : field === "organizedBy" ? "Organizer" : field === 'classJoined' ? "classes Joined" : field}</span>
                    <span
                      className={`flex items-center justify-center w-5 h-5 rounded-md border text-[10px] transition-all ${
                        isSelected
                          ? "bg-red-600 border-red-600 text-white"
                          : "border-gray-300 group-hover:border-red-300 text-transparent"
                      }`}
                    >
                      <Check className="w-3 h-3" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between border-t pt-6">
            <p className="text-sm text-gray-500 mb-4 sm:mb-0">
              {selectedArray.length === 0 ? (
                <>No fields selected yet.</>
              ) : (
                <>
                  <span className="text-gray-900 font-semibold">
                    {selectedArray.length}
                  </span>{" "}
                  fields selected
                </>
              )}
            </p>

            <button
              onClick={submit}
              disabled={loading}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-semibold shadow-sm transition-all duration-200 ${
                loading
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              <Download className="w-4 h-4" />
              {loading ? "Generating..." : "Download Report"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
