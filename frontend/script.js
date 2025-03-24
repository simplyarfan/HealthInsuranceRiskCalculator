document.getElementById("riskForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let age = parseInt(document.getElementById("age").value);
    let height = parseInt(document.getElementById("height").value);
    let weight = parseFloat(document.getElementById("weight").value);

    let bpLabel = document.getElementById("bp").value;
    const bpMapping = {
        "Normal (Systolic < 120 AND Diastolic < 80)": "normal",
        "Elevated (Systolic 120-129 AND Diastolic < 80)": "elevated",
        "High BP Stage 1 (Systolic 130-139 OR Diastolic 80-89)": "stage1",
        "High BP Stage 2 (Systolic ≥140 OR Diastolic ≥90)": "stage2",
        "Hypertensive Crisis (Systolic >180 AND/OR Diastolic >120)": "crisis"
    };
    let bp = bpMapping[bpLabel] || "normal";

    let history = [];
    document.querySelectorAll("input[name='history']:checked").forEach((checkbox) => {
        history.push(checkbox.value);
    });

    // Validate inputs
    if (age <= 0 || height < 60 || weight <= 0) {
        document.getElementById("result").innerHTML = `<p style="color:red;">Invalid inputs. Ensure values are correct.</p>`;
        return;
    }

    try {
        let response = await fetch("https://health-insurance-riskcalculator-api.azurewebsites.net/api/calculateRisk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ age, height, weight, bp, history }),
        });

        let data = await response.json();

        // Display results
        document.getElementById("result").innerHTML = `
            <h3>Summary of Inputs:</h3>
            <ul>
                <li><strong>Age:</strong> ${data.age} years</li>
                <li><strong>Height:</strong> ${data.height} cm</li>
                <li><strong>Weight:</strong> ${data.weight} kg</li>
                <li><strong>BMI:</strong> ${data.bmi.toFixed(2)}</li>
                <li><strong>Blood Pressure:</strong> ${data.bp}</li>
                <li><strong>Family History:</strong> ${history.length > 0 ? history.join(", ") : "None"}</li>
            </ul>
            <h3>Total Risk Score: ${data.riskScore}</h3>
            <h2>Final Risk Category: <span style="color:${data.category === "Uninsurable" ? "red" : data.category === "High Risk" ? "orange" : "green"};">${data.category}</span></h2>
        `;
    } catch (error) {
        document.getElementById("result").innerHTML = `<p style="color:red;">Error calculating risk. Please try again.</p>`;
    }
});
