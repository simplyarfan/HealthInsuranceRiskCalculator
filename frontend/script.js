document.getElementById("riskForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let age = parseInt(document.getElementById("age").value);
    let height = parseInt(document.getElementById("height").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let bp = document.getElementById("bp").value;
    let history = [];

    document.querySelectorAll("input[name='history']:checked").forEach((checkbox) => {
        history.push(checkbox.value);
    });

    // Validate inputs
    if (age <= 0 || height < 60 || weight <= 0) {
        document.getElementById("result").innerHTML = `<p style="color:red;">Please enter valid values. Height must be at least 60 cm.</p>`;
        return;
    }

    // Send data to Azure Function
    try {
        let response = await fetch("https://health-insurance-riskcalculator-api.azurewebsites.net/api/calculateRisk", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ age, height, weight, bp, history })
        });

        let data = await response.json();

        // Display results
        document.getElementById("result").innerHTML = `
            <h3>Summary of Inputs:</h3>
            <ul>
                <li><strong>Age:</strong> ${data.age} years</li>
                <li><strong>Height:</strong> ${data.height} cm</li>
                <li><strong>Weight:</strong> ${data.weight} kg</li>
                <li><strong>BMI:</strong> ${data.bmi}</li>
                <li><strong>Blood Pressure:</strong> ${bp}</li>
                <li><strong>Family History:</strong> ${history.length > 0 ? history.join(", ") : "None"}</li>
            </ul>
            <h3>Total Risk Score: ${data.riskScore}</h3>
            <h2>Final Risk Category: <span style="color:${data.category === 'Uninsurable' ? 'red' : data.category === 'High Risk' ? 'orange' : 'green'};">${data.category}</span></h2>
        `;
    } catch (error) {
        document.getElementById("result").innerHTML = `<p style="color:red;">Error calculating risk. Please try again.</p>`;
    }
});
