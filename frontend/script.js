document.getElementById("riskForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Fetch values from inputs
    const age = document.getElementById("age").value;
    let height = document.getElementById("height").value;
    height = height / 100;  // Convert cm to meters
    const weight = document.getElementById("weight").value;
    const systolic = document.getElementById("systolic").value;
    const diastolic = document.getElementById("diastolic").value;
    const history = document.getElementById("history").value;

    const requestData = {
        age: parseInt(age),
        height: parseFloat(height),
        weight: parseFloat(weight),
        systolic: parseInt(systolic),
        diastolic: parseInt(diastolic),
        history: history
    };

    fetch("health-insurance-riskcalculator-aa-c9hhh4hpdffjf3gs.uaenorth-01.azurewebsites.net/calculate", {  // Use the correct backend API
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerText = `Risk Category: ${data.risk}`;
    })
    .catch(error => console.error("Error:", error));
});
