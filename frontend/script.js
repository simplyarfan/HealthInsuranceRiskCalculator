document.getElementById("riskForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from refreshing

    // Get user inputs
    let age = parseInt(document.getElementById("age").value);
    let heightCm = parseInt(document.getElementById("height").value);
    let weightKg = parseFloat(document.getElementById("weight").value);
    let bloodPressure = document.getElementById("bp").value;
    let history = [];
    
    // Collect selected family history conditions
    document.querySelectorAll("input[name='history']:checked").forEach((checkbox) => {
        history.push(checkbox.value);
    });

    // Validate inputs
    if (age <= 0 || heightCm < 60 || weightKg <= 0) {
        document.getElementById("result").innerHTML = `<p style="color:red;">Please enter valid values. Height must be at least 60 cm.</p>`;
        return;
    }

    // Calculate BMI
    let heightM = heightCm / 100; // Convert height from cm to meters
    let bmi = (weightKg / (heightM * heightM)).toFixed(1); // Keep 1 decimal place

    // Categorize BMI
    let bmiCategory = "";
    if (bmi < 18.5) {
        bmiCategory = "Underweight (0 points)";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        bmiCategory = "Normal (0 points)";
    } else if (bmi >= 25 && bmi <= 29.9) {
        bmiCategory = "Overweight (30 points)";
    } else {
        bmiCategory = "Obese (75 points)";
    }

    // Assign Blood Pressure Points
    let bpPoints = {
        "normal": 0,
        "elevated": 15,
        "stage1": 30,
        "stage2": 75,
        "crisis": 100
    };
    let bpCategory = document.getElementById("bp").selectedOptions[0].text; // Get text of selected BP
    let bpRiskPoints = bpPoints[bloodPressure];

    // Assign Age Points
    let agePoints = age < 30 ? 0 : age < 45 ? 10 : age < 60 ? 20 : 30;

    // Assign Family History Points
    let familyHistoryPoints = history.length * 10; // Each selected condition adds 10 points

    // Calculate total score
    let totalRiskScore = agePoints + bpRiskPoints + (bmiCategory.includes("Overweight") ? 30 : bmiCategory.includes("Obese") ? 75 : 0) + familyHistoryPoints;

    // Determine risk category
    let riskCategory = "";
    if (totalRiskScore <= 20) {
        riskCategory = "Low Risk";
    } else if (totalRiskScore <= 50) {
        riskCategory = "Moderate Risk";
    } else if (totalRiskScore <= 75) {
        riskCategory = "High Risk";
    } else {
        riskCategory = "Uninsurable";
    }

    // Display the summary and result
    document.getElementById("result").innerHTML = `
        <h3>Summary of Inputs:</h3>
        <ul>
            <li><strong>Age:</strong> ${age} years (${agePoints} points)</li>
            <li><strong>Height:</strong> ${heightCm} cm</li>
            <li><strong>Weight:</strong> ${weightKg} kg</li>
            <li><strong>BMI:</strong> ${bmi} - ${bmiCategory}</li>
            <li><strong>Blood Pressure:</strong> ${bpCategory} (${bpRiskPoints} points)</li>
            <li><strong>Family History:</strong> ${history.length > 0 ? history.join(", ") : "None"} (${familyHistoryPoints} points)</li>
        </ul>
        <h3>Total Risk Score: ${totalRiskScore}</h3>
        <h2>Final Risk Category: <span style="color:${riskCategory === 'Uninsurable' ? 'red' : riskCategory === 'High Risk' ? 'orange' : 'green'};">${riskCategory}</span></h2>
    `;
});
