const Student = require('../schema/StudentSchema')
const mongoose = require('mongoose')
const moment = require('moment');

const markpaid = async (req, res) => {
  try {
    const { id } = req.params;
    const { months, year } = req.body;


    const yearNum = Number(year);

    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });

   
    let yearRecord = student.feeRecords.find((y) => Number(y.year) === yearNum);
    
    if (!yearRecord) {
      student.feeRecords.push({ year: yearNum, paidMonths: [] });
      yearRecord = student.feeRecords[student.feeRecords.length - 1];
    }

    const alreadyPaid = months.filter((m) => yearRecord.paidMonths.includes(m));
    if (alreadyPaid.length > 0) {
      return res.status(400).json({ message: `Already paid: ${alreadyPaid.join(", ")}` });
    }

    yearRecord.paidMonths.push(...months);

    const now = new Date();
    let nextDue = new Date(now);
    nextDue.setMonth(nextDue.getMonth() + 1);

    student.nextDueDate = nextDue;
    student.feeStatus = 'Paid';

    // Mongoose ko batao ke nested array change hua hai
    student.markModified('feeRecords');

    await student.save();

    res.json({
      message: "Payment successful",
      nextDueDate: student.nextDueDate
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const Unpaid = async (req, res) => {
  try {
    const { id } = req.params;
    const { months, year } = req.body;

    const yearNum = Number(year);

    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    let yearRecord = student.feeRecords.find(y => Number(y.year) === yearNum);
    if (!yearRecord) {
      return res.status(400).json({ message: `No record found for year ${year}` });
    }

    const monthsActuallyPaid = yearRecord.paidMonths.filter(m => months.includes(m));
    
    
    if (monthsActuallyPaid.length === 0) {
      return res.status(400).json({ message: `Selected months are already unpaid` });
    }

    yearRecord.paidMonths = yearRecord.paidMonths.filter(m => !months.includes(m));

    student.feeStatus = yearRecord.paidMonths.length > 0 ? 'Paid' : 'Unpaid';
    student.LastFeeUpdate = new Date();
    student.nextDueDate = ''


    student.markModified('feeRecords');

    await student.save();

    res.json({
      message: "Months marked as unpaid successfully",
      year,
      paidMonths: yearRecord.paidMonths
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllFeeStatus = async (req, res) => {
  try {
    const students = await Student.find();

    const now = new Date();

    const result = students.map((student) => {
      let feeStatus = "Paid";

      if (student.nextDueDate && now > student.nextDueDate) {
        feeStatus = "Unpaid";
      }

      return {
        name: student.StudentName,
        feeStatus,
        nextDueDate: student.nextDueDate
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { markpaid, Unpaid,};