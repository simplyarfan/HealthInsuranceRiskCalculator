module.exports = async function (context, req) {
    const { age, height, weight, bp, history } = req.body;

    if (!age || !height || !weight || !bp || !history) {
        context.res = { status: 400, body: "Missing required parameters" };
        return;
    }

    // Convert height to meters and calculate BMI
    let heightM = height / 100;
    let bmi = (weight / (heightM * heightM)).toFixed(1);

    // Assign BMI category points
    let bmiPoints = bmi < 18.5 ? 0 : bmi <= 24.9 ? 0 : bmi <= 29.9 ? 30 : 75;

    // Assign Blood Pressure Points
    let bpPoints = {
        "normal": 0,
        "elevated": 15,
        "stage1": 30,
        "stage2": 75,
        "crisis": 100
    };

    let bpRiskPoints = bpPoints[bp] || 0;

    // Assign Age Points
    let agePoints = age < 30 ? 0 : age < 45 ? 10 : age < 60 ? 20 : 30;

    // Assign Family History Points
    let familyHistoryPoints = history.length * 10;

    // Calculate total risk score
    let totalRiskScore = agePoints + bpRiskPoints + bmiPoints + familyHistoryPoints;

    // Determine risk category
    let riskCategory = totalRiskScore <= 20 ? "Low Risk"
                    : totalRiskScore <= 50 ? "Moderate Risk"
                    : totalRiskScore <= 75 ? "High Risk"
                    : "Uninsurable";

    context.res = {
        body: {
            age,
            height,
            weight,
            bmi,
            riskScore: totalRiskScore,
            category: riskCategory
        }
    };
};
