const today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0");
const yyyy = String(today.getFullYear());

export const identity = {
  fullName: "nilancyagarwal",
  user_id: `nilancyagarwal_${dd}${mm}${yyyy}`,
  email_id: "nilancy.agarwal@bajaj.edu.in",
  college_roll_number: "BTECH2026001"
};

export const isValidCollegeEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(edu|edu\.[a-z]{2}|ac\.[a-z]{2}|edu\.in)$/i.test(email);
