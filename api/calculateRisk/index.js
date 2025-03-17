module.exports = async function (context, req) {
    context.log("Processing request for health risk calculation.");

    try {
        const { age, height, weight, bp, history } = req.body;

        // Ensure required fields are provided
        if (!age || !height || !weight || !bp || !history) {
            context.res = {
                status: 400,
                body: { error: "Missing required fields" }
            };
            return;
        }

        // Convert height from cm to meters for BMI calculation
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);

        // Calculate risk score based on provided inputs
        let riskScore = 0;

        // Age-based risk
        if (age < 30) riskScore += 0;
        else if (age < 45) riskScore += 10;
        else if (age < 60) riskScore += 20;
        else riskScore += 30;

        // BMI-based risk
        if (bmi >= 30) riskScore += 75;
        else if (bmi >= 25) riskScore += 30;
        else riskScore += 0;

        // Blood pressure risk
        const bpRisk = {
            normal: 0,
            elevated: 15,
            stage1: 30,
            stage2: 75,
            crisis: 100
        };
        riskScore += bpRisk[bp] || 0;

        // Family history risk
        const historyRisk = {
            diabetes: 10,
            cancer: 10,
            alzheimer: 10
        };
        history.forEach(disease => {
            if (historyRisk[disease]) {
                riskScore += historyRisk[disease];
            }
        });

        // Determine risk category
        let riskCategory = "Uninsurable";
        if (riskScore <= 20) riskCategory = "Low Risk";
        else if (riskScore <= 50) riskCategory = "Moderate Risk";
        else if (riskScore <= 75) riskCategory = "High Risk";

        // Respond with risk assessment
        context.res = {
            status: 200,
            body: {
                bmi: bmi.toFixed(2),
                riskScore,
                riskCategory
            }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: { error: "Internal Server Error" }
        };
    }
};
