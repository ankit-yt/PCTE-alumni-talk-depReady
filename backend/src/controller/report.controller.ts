import { NextFunction, Request, Response } from "express";
import alumniMeetModel from "../model/alumniMeet.model";
import excelJs from "exceljs";
import { parse } from "path";

export const talkReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { selectedFields } = req.body;
    const talks = await alumniMeetModel.find().sort({createdAt:1}).populate("alumni");
    const workbook = new excelJs.Workbook();
    const workSheet = workbook.addWorksheet("Alumni Talks");
    const columns = selectedFields.map((field: string) => ({
      header:  field === "title" ? "Talk Title" : field === "description" ? "Talk Description" : field === "time" ? "Talk Date" : field === "location" ? "venue" : field === "organizedBy" ? "Organizer" : field === 'classJoined' ? "classes Joined" : field.charAt(0).toUpperCase() + field.slice(1),
      key: field,
      width: 30,
    }));
    workSheet.columns = columns;
    talks.forEach((talkDoc) => {
      const talk = talkDoc.toObject();
      const rowData: Record<string, any> = {};
      selectedFields.forEach((field: string) => {
        if (field.startsWith("alumni")) {
          const alumniData =
            Array.isArray(talk.alumni) && talk.alumni.length > 0
              ? talk.alumni[0]
              : null;
          if (field === "alumni") {
            rowData[field] = alumniData?.name;
          }
          if (field === "alumniCompany") {
            rowData[field] = alumniData?.currentCompany;
          }
          if (field === "alumniBatch") {
            rowData[field] = alumniData?.batch;
          }
          if (field === "alumniPost") {
            rowData[field] = alumniData?.currentRole;
          }
          if (field === "alumniEmail") {
            rowData[field] = alumniData?.email;
          }
        } else if (talk[field as keyof typeof talk]) {
          if (field === "classJoined") {
            if (
              Array.isArray(talkDoc.classJoined) &&
              talkDoc.classJoined.length > 0
            ) {
              const cleaned = talkDoc.classJoined.filter(
                (item) => item && item.trim && item.trim() !== ""
              );
              rowData[field] = cleaned.length > 0 ? cleaned.join(", ") : "";
            } else {
              rowData[field] = "";
            }
          }else{
            rowData[field] = talk[field as keyof typeof talk];
          }

          
        } else {
          rowData[field] = "";
        }
      });
      workSheet.addRow(rowData);
    });

  workSheet.getRow(1).eachCell((cell) => {
  cell.font = { bold: true, size: 12 };
  cell.alignment = { horizontal: "center", vertical: "middle" };
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFCCCCCC" }, // light gray header
  };
});
const statusIndex = selectedFields.indexOf("status");
if (statusIndex !== -1) {
  const statusCol = workSheet.getColumn(statusIndex + 1); // column numbers start at 1
  statusCol.eachCell((cell, rowNumber) => {
    if (rowNumber === 1) return;
    const value = cell.value?.toString().toLowerCase();
    if (value === "upcoming") {
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFF00" } };
    } else if (value === "completed") {
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF00FF00" } };
    }
    cell.alignment = { horizontal: "center" };
  });
}

// workSheet.eachRow((row) => {
//   row.eachCell((cell) => {
//     cell.border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//   }); 
// });  

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=alumni_talks.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err: any) {
    console.log(err.message);
    next();
  }
};
