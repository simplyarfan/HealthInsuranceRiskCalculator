module.exports = async function (context, req) {
    try {
        const { age, height, weight, bp, history } = req.body;

        if (!age || !height || !weight || !bp) {
            context.res = {
                status: 400,
                body: "Missing required fields."
            };
            return;
        }

        // BMI Calculation
        const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
        let bmiScore = bmi < 18.5 ? 0 : bmi < 25 ? 0 : bmi < 30 ? 30 : 75;

        // Age Score
        let ageScore = age < 30 ? 0 : age < 45 ? 10 : age < 60 ? 20 : 30;

        // Blood Pressure Score
        let bpScore = {
            "normal": 0,
            "elevated": 15,
            "stage1": 30,
            "stage2": 75,
            "crisis": 100
        }[bp] || 0;

        // Family History Score
        let historyScore = (history || []).length * 10;

        // Total Score Calculation
        let riskScore = ageScore + bmiScore + bpScore + historyScore;

        // Risk Category
        let category = riskScore <= 20 ? "Low Risk" :
                       riskScore <= 50 ? "Moderate Risk" :
                       riskScore <= 75 ? "High Risk" :
                       "Uninsurable";

        context.res = {
            status: 200,
            body: { age, height, weight, bmi, riskScore, category }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: `Error: ${error.message}`
        };
    }
};
