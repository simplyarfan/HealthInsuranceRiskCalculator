document.getElementById("riskForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let age = parseInt(document.getElementById("age").value);
    let height = parseFloat(document.getElementById("height").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let systolic = parseInt(document.getElementById("systolic").value);
    let diastolic = parseInt(document.getElementById("diastolic").value);
    let history = document.getElementById("history").value;

    // Calculate BMI
    let bmi = weight / (height * height);

    // Prepare data to send to server
    let userData = {
        age: age,
        bmi: bmi,
        systolic: systolic,
        diastolic: diastolic,
        history: history
    };

    // Send data to backend
    fetch("http://localhost:3000/calculate-risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerText = "Risk Level: " + data.riskLevel;
    })
    .catch(error => console.error("Error:", error));
});
