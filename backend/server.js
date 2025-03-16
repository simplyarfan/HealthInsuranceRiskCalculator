const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/calculate-risk", (req, res) => {
    const { age, height, weight, bp, diseases } = req.body;

    // Calculate BMI
    const bmi = weight / ((height / 100) * (height / 100));  // Convert height to meters
    let bmiPoints = bmi < 18.5 ? 0 : bmi < 25 ? 0 : bmi < 30 ? 30 : 75;

    // Age points
    let agePoints = age < 30 ? 0 : age < 45 ? 10 : age < 60 ? 20 : 30;

    // Blood Pressure points
    let bpPoints = bp === "normal" ? 0 : bp === "elevated" ? 15 : bp === "stage1" ? 30 : bp === "stage2" ? 75 : 100;

    // Disease points
    let diseasePoints = diseases.length * 10;  // Each disease adds 10 points

    // Calculate total score
    let totalScore = agePoints + bmiPoints + bpPoints + diseasePoints;

    // Determine risk category
    let riskCategory = totalScore <= 20 ? "Low Risk"
        : totalScore <= 50 ? "Moderate Risk"
        : totalScore <= 75 ? "High Risk"
        : "Uninsurable";

    res.json({ risk
