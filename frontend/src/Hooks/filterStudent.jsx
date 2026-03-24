import { useState, useMemo } from "react";

export function useStudentFilters(students) {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [feeFilter, setFeeFilter] = useState(""); // ✅ ADD: feeFilter state

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        student.StudentName?.toLowerCase().includes(searchText) ||
        student.FatherName?.toLowerCase().includes(searchText);

      const matchesClass = classFilter
        ? student.Class === classFilter
        : true;

      const matchesGender = genderFilter
        ? student.Gender === genderFilter
        : true;

      // ✅ ADD: Fee filter logic
      const matchesFee = feeFilter
        ? student.feeStatus?.toLowerCase() === feeFilter.toLowerCase()
        : true;

      return matchesSearch && matchesClass && matchesGender && matchesFee;
    });
  }, [students, search, classFilter, genderFilter, feeFilter]);

  return {
    search,
    setSearch,
    classFilter,
    setClassFilter,
    genderFilter,
    setGenderFilter,
    feeFilter,       // ✅ ADD
    setFeeFilter,    // ✅ ADD
    filteredStudents,
  };
}