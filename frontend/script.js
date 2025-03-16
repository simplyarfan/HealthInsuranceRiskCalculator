document.getElementById("riskForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const data = {
        age: parseInt(document.getElementById("age").value),
        bmi: parseFloat(document.getElementById("weight").value) / (parseFloat(document.getElementById("height").value) ** 2),
        systolic: parseInt(document.getElementById("systolic").value),
        diastolic: parseInt(document.getElementById("diastolic").value),
        history: document.getElementById("history").value
    };

    fetch("https://health-insurance-riskcalculator-aa-c9hh4hpdfjf3gs.uaenorth-01.azurewebsites.net/calculate-risk", {  // Azure Web App API
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById("result").innerText = "Risk Level: " + result.riskLevel;
    })
    .catch(error => console.error("Error:", error));
});
