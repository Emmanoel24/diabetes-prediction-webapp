document.addEventListener("DOMContentLoaded", () => {
  const btnPredict = document.getElementById("predictBtn");
  const btnReset   = document.getElementById("resetBtn");
  const resultBox  = document.getElementById("result");
  const spinner    = document.getElementById("spinner");

  const fields = ["preg", "glucose", "bp", "skin", "insulin", "bmi", "dpf", "age"]
    .map(id => document.getElementById(id));

  function readValues() {
    return fields.map(el => parseFloat(el.value));
  }

  function anyInvalid(values) {
    return values.some(v => Number.isNaN(v));
  }

  function setLoading(loading) {
    if (loading) {
      spinner.classList.remove("hidden");    // show spinner
      btnPredict.disabled = true;            // disable button while loading
      resultBox.textContent = "Predicting…";
      resultBox.style.color = "#2c3e50";
    } else {
      spinner.classList.add("hidden");       // hide spinner
      btnPredict.disabled = false;           
    }
  }

  btnPredict.addEventListener("click", async () => {
    const values = readValues();

    if (anyInvalid(values)) {
      resultBox.style.color = "red";
      resultBox.textContent = "⚠ Please fill all fields correctly.";
      return;
    }

    try {
      setLoading(true); // show spinner

      const res = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: values }),
      });

      const data = await res.json();

      if (data.prediction) {
        const isDiabetic = data.prediction.toLowerCase().includes("diabetic");
        resultBox.style.color = isDiabetic ? "crimson" : "green";
        resultBox.textContent = `Result: ${data.prediction}`;
      } else {
        resultBox.style.color = "orange";
        resultBox.textContent = "Error: " + (data.error || "Unknown error");
      }
    } catch (err) {
      resultBox.style.color = "crimson";
      resultBox.textContent = "❌ Something went wrong.";
    } finally {
      setLoading(false); // hide spinner after result
    }
  });

  btnReset.addEventListener("click", () => {
    fields.forEach(el => (el.value = ""));
    resultBox.textContent = "";
    resultBox.removeAttribute("style");
  });
});