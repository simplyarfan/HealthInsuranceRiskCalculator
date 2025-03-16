const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/calculate-risk", (req, res) => {
    const { age, bmi, systolic, diastolic, history } = req.body;
    let score = 0;

    // Age factor
    score += age < 30 ? 0 : age < 45 ? 10 : age < 60 ? 20 : 30;

    // BMI factor
    score += bmi < 25 ? 0 : bmi < 30 ? 30 : 75;

    // Blood Pressure
    score += systolic < 120 && diastolic < 80 ? 0 :
             systolic < 130 && diastolic < 80 ? 15 :
             systolic < 140 || diastolic < 90 ? 30 :
             systolic >= 140 || diastolic >= 90 ? 75 :
             systolic > 180 || diastolic > 120 ? 100 : 0;

    // Family History
    if (["diabetes", "cancer", "alzheimer"].includes(history)) score += 10;

    // Risk Category
    const riskLevel = score <= 20 ? "Low Risk" :
                      score <= 50 ? "Moderate Risk" :
                      score <= 75 ? "High Risk" :
                      "Uninsurable";

    res.json({ riskLevel });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
