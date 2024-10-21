import createHttpError from "http-errors";
import { db } from "../../db.js";

function adjustDate(year, month, date, adjustmentType) {
  let originalDate = new Date(year, month - 1, date); // Month is 0-indexed in JS

  // Adjust the date based on the type of adjustment
  switch (adjustmentType) {
    case "year":
      originalDate.setMonth(originalDate.getMonth() - 11);
      break;
    case "month":
      originalDate.setMonth(originalDate.getMonth() - 1);
      break;
    case "week":
      originalDate.setDate(originalDate.getDate() - 7);
      break;
    default:
      console.error("Invalid adjustment type provided.");
      throw createHttpError(400, "Bad Type");
  }

  // Format the adjusted date as YYYY-MM-DD
  const formattedDate = originalDate.toISOString().split("T")[0];
  console.log("Formated Date: ", formattedDate);

  return formattedDate;
}

export const Summary = async (req, res, next) => {
  const { data } = req.query;
  console.log("\nRequesting bus summary:", data);

  // Destructuring Object
  const busId = data.busId;
  const DATE = parseInt(data.DATE);
  const MONTH = parseInt(data.MONTH);
  const YEAR = parseInt(data.YEAR);
  const type = data.type;

  const SUM = [
    { data: [1, 2, 5, 38, 5], label: "NA-1234" },
    { data: [1, 2, 5, 38, 5], label: "NA-1354" },
    { data: [1, 2, 5, 38, 5], label: "NC-5645" },
    { data: [1, 2, 5, 38, 5], label: "NC-5685" },
    { data: [1, 2, 5, 38, 5], label: "NC-5646" },
    { data: [1, 2, 5, 38, 5], label: "NA-1534" },
    { data: [1, 2, 5, 38, 5], label: "NA-1654" },
    { data: [1, 2, 5, 38, 5], label: "NC-5845" },
    { data: [1, 2, 5, 38, 5], label: "NC-5885" },
    { data: [1, 2, 5, 38, 5], label: "NC-5686" },
  ];
  res.json(SUM);
};
