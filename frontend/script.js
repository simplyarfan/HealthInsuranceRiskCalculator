document.getElementById("riskForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get values from form
    let age = parseInt(document.getElementById("age").value);
    let height = parseInt(document.getElementById("height").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let bp = document.getElementById("bp").value;

    // Get selected family history conditions
    let historyElements = document.querySelectorAll('input[name="history"]:checked');
    let historyConditions = Array.from(historyElements).map(el => el.value);

    // Calculate BMI
    let bmi = weight / ((height / 100) * (height / 100));

    // Risk Scoring based on Age
    let ageScore = 0;
    if (age >= 60) {
        ageScore = 30;
    } else if (age >= 45) {
        ageScore = 20;
    } else if (age >= 30) {
        ageScore = 10;
    }

    // Risk Scoring based on BMI
    let bmiScore = 0;
    if (bmi >= 30) {
        bmiScore = 75; // Obese
    } else if (bmi >= 25) {
        bmiScore = 30; // Overweight
    }

    // Risk Scoring based on Blood Pressure
    let bpScore = 0;
    switch (bp) {
        case "normal":
            bpScore = 0;
            break;
        case "elevated":
            bpScore = 15;
            break;
        case "stage1":
            bpScore = 30;
            break;
        case "stage2":
            bpScore = 75;
            break;
        case "crisis":
            bpScore = 100;
            break;
    }

    // Risk Scoring based on Family History
    let historyScore = 0;
    if (historyConditions.includes("diabetes")) historyScore += 10;
    if (historyConditions.includes("cancer")) historyScore += 10;
    if (historyConditions.includes("alzheimer")) historyScore += 10;

    // Total Score Calculation
    let totalScore = ageScore + bmiScore + bpScore + historyScore;

    // Determine Risk Category
    let riskCategory = "";
    if (totalScore <= 20) {
        riskCategory = "Low Risk";
    } else if (totalScore <= 50) {
        riskCategory = "Moderate Risk";
    } else if (totalScore <= 75) {
        riskCategory = "High Risk";
    } else {
        riskCategory = "Uninsurable";
    }

    // Display the result
    document.getElementById("result").innerHTML = `
        <p><strong>Total Score:</strong> ${totalScore}</p>
        <p><strong>Risk Category:</strong> ${riskCategory}</p>
    `;
});
