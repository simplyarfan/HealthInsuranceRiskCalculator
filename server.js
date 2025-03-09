const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/calculate-risk", (req, res) => {
    const { age, bmi, systolic, diastolic, history } = req.body;

    let score = 0;

    // Age penalty
    if (age < 30) score += 0;
    else if (age < 45) score += 10;
    else if (age < 60) score += 20;
    else score += 30;

    // BMI penalty
    if (bmi >= 18.5 && bmi <= 24.9) score += 0;
    else if (bmi >= 25.0 && bmi <= 29.9) score += 30;
    else score += 75;

    // Blood Pressure penalty
    if (systolic < 120 && diastolic < 80) score += 0;
    else if (systolic >= 120 && systolic <= 129 && diastolic < 80) score += 15;
    else if (systolic >= 130 && systolic <= 139 || diastolic >= 80 && diastolic <= 89) score += 30;
    else if (systolic >= 140 || diastolic >= 90) score += 75;
    else if (systolic > 180 || diastolic > 120) score += 100;

    // Family History penalty
    if (history === "diabetes" || history === "cancer" || history === "alzheimer") score += 10;

    // Determine Risk Category
    let riskLevel = "Low Risk";
    if (score > 20 && score <= 50) riskLevel = "Moderate Risk";
    else if (score > 50 && score <= 75) riskLevel = "High Risk";
    else if (score > 75) riskLevel = "Uninsurable";

    res.json({ riskLevel });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
