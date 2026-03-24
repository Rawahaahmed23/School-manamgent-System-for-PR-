

import React, { useState, useEffect } from "react";
import { X, CalendarCheck2, ChevronDown } from "lucide-react";

export const MonthsModal = ({
  isOpen,
  title,
  student,
  mode, 
  onConfirm,
  onClose,
  isLoading = false,
}) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [confirming, setConfirming] = useState(false);

  const monthOrder = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  const years = Array.from({ length: 6 }, (_, i) => String(2023 + i));

  useEffect(() => {
    if (isOpen) {
      setSelectedMonth("");
      setSelectedYear("2025");
    }
  }, [isOpen, student]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!selectedMonth) return;
    setConfirming(true);
    await onConfirm(selectedMonth, selectedYear);
    setConfirming(false);
    setSelectedMonth("");
  };

  const isPay = mode === "pay";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">


        <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600" />

        <div className="p-6">

          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <CalendarCheck2 size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 leading-tight">{title}</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {isPay ? "Mark month as paid" : "Mark month as unpaid"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-gray-500 transition-colors rounded-lg hover:bg-gray-100 p-1.5 -mt-1 -mr-1"
            >
              <X size={16} />
            </button>
          </div>

          {/* Month & Year Selects */}
          <div className="flex gap-3 mb-5">

            {/* Month Select */}
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Month
              </label>
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className={`w-full appearance-none bg-gray-50 border-2 rounded-xl px-3 py-2.5 text-sm font-medium pr-9 focus:outline-none transition-colors cursor-pointer ${
                    selectedMonth
                      ? "border-blue-400 text-gray-800"
                      : "border-gray-200 text-gray-400"
                  }`}
                >
                  <option value="">— Select —</option>
                  {monthOrder.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Year Select */}
            <div className="w-28 space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Year
              </label>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium pr-9 focus:outline-none transition-colors cursor-pointer text-gray-700 focus:border-blue-400"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

       
          {selectedMonth && (
            <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
              <CalendarCheck2 size={13} />
              {selectedMonth} {selectedYear} — marked as {isPay ? "paid ✓" : "unpaid ✗"}
            </div>
          )}

        
          <div className="flex gap-2.5">
            <button
              onClick={onClose}
              disabled={confirming || isLoading}
              className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-sm text-gray-600 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={confirming || isLoading || !selectedMonth}
              className="flex-1 py-2.5 rounded-xl text-sm text-white font-semibold transition-all disabled:opacity-40 flex items-center justify-center gap-2 active:scale-95 bg-blue-600 hover:bg-blue-700"
            >
              {confirming || isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm"
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};