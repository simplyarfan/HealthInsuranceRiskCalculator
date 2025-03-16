const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post("/calculate-risk", (req, res) => {
    const { age, height, weight, systolicBP, diastolicBP, disease } = req.body;

    if (!age || !height || !weight || !systolicBP || !diastolicBP || !disease) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (height < 60) {
        return res.status(400).json({ error: "Height must be at least 60 cm" });
    }

    let riskCategory = "Low"; 

    if (age > 50 || weight > 100 || systolicBP > 140 || diastolicBP > 90) {
        riskCategory = "Moderate";
    }
    if (disease !== "None") {
        riskCategory = "High";
    }

    res.json({ risk: riskCategory });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
