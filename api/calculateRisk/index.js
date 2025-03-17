module.exports = async function (context, req) {
    try {
        const { age, height, weight, bp, history } = req.body;

        if (!age || !height || !weight || !bp) {
            context.res = {
                status: 400,
                body: "Missing required fields",
            };
            return;
        }

        // Calculate BMI
        const bmi = weight / ((height / 100) ** 2);

        // Risk Scoring Logic
        let riskScore = 0;

        // Age Score
        if (age < 30) riskScore += 0;
        else if (age < 45) riskScore += 10;
        else if (age < 60) riskScore += 20;
        else riskScore += 30;

        // BMI Score
        if (bmi >= 25 && bmi < 30) riskScore += 30;
        else if (bmi >= 30) riskScore += 75;

        // Blood Pressure Score
        const bpScores = {
            normal: 0,
            elevated: 15,
            stage1: 30,
            stage2: 75,
            crisis: 100,
        };

        riskScore += bpScores[bp] || 0;

        // Family History Score
        const familyHistoryScore = history?.length * 10 || 0;
        riskScore += familyHistoryScore;

        // Risk Category
        let category = "Low Risk";
        if (riskScore > 75) category = "Uninsurable";
        else if (riskScore > 50) category = "High Risk";
        else if (riskScore > 20) category = "Moderate Risk";

        context.res = {
            status: 200,
            body: { age, height, weight, bmi, bp, history, riskScore, category },
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: "Internal Server Error",
        };
    }
};
