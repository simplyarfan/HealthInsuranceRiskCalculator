document.getElementById("riskForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let age = document.getElementById("age").value;
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let bp = document.getElementById("bp").value;

    // Collect selected diseases
    let diseases = [];
    if (document.getElementById("diabetes").checked) diseases.push("diabetes");
    if (document.getElementById("cancer").checked) diseases.push("cancer");
    if (document.getElementById("alzheimer").checked) diseases.push("alzheimer");

    // Validate inputs
    if (age < 0 || weight < 0 || height < 60) {
        alert("Invalid input. Age, weight, and height must be positive. Height must be at least 60 cm.");
        return;
    }

    // Send data to backend
    fetch("health-insurance-riskcalculator-aa-c9hhh4hpdffjf3gs.uaenorth-01.azurewebsites.net/calculate-risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age, height, weight, bp, diseases })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerText = "Risk Category: " + data.riskCategory;
    })
    .catch(error => console.error("Error:", error));
});
