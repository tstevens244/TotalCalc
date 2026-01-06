document.addEventListener('DOMContentLoaded', () => {
    const metricBtn = document.getElementById('metric-btn');
    const imperialBtn = document.getElementById('imperial-btn');
    const metricInputs = document.getElementById('metric-inputs');
    const imperialInputs = document.getElementById('imperial-inputs');
    const bmiForm = document.getElementById('bmi-form');
    const resultSection = document.getElementById('result-container');

    // Default set to Imperial
    let currentUnit = 'imperial';

    metricBtn.addEventListener('click', () => {
        currentUnit = 'metric';
        updateUI(metricBtn, imperialBtn, metricInputs, imperialInputs);
    });

    imperialBtn.addEventListener('click', () => {
        currentUnit = 'imperial';
        updateUI(imperialBtn, metricBtn, imperialInputs, metricInputs);
    });

    function updateUI(activeBtn, inactiveBtn, showGroup, hideGroup) {
        activeBtn.classList.add('active');
        inactiveBtn.classList.remove('active');
        showGroup.classList.remove('hidden');
        hideGroup.classList.add('hidden');
        resultSection.classList.add('hidden');
    }

    bmiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let bmi = 0;

        if (currentUnit === 'metric') {
            const h = parseFloat(document.getElementById('height-cm').value) / 100;
            const w = parseFloat(document.getElementById('weight-kg').value);
            if (h > 0 && w > 0) bmi = w / (h * h);
        } else {
            const ft = parseFloat(document.getElementById('height-ft').value) || 0;
            const inches = parseFloat(document.getElementById('height-in').value) || 0;
            const w = parseFloat(document.getElementById('weight-lb').value);
            const totalInches = (ft * 12) + inches;
            if (totalInches > 0 && w > 0) bmi = (w / (totalInches * totalInches)) * 703;
        }

        bmi > 0 ? displayResult(bmi) : alert("Please enter valid numbers.");
    });

    function displayResult(bmi) {
        const valEl = document.getElementById('bmi-value');
        const catEl = document.getElementById('bmi-category');
        const expEl = document.getElementById('bmi-explanation');
        const root = document.documentElement;

        valEl.textContent = bmi.toFixed(1);
        resultSection.classList.remove('hidden');

        if (bmi < 18.5) {
            setResult("Underweight", "Try to focus on nutrient-dense foods.", "var(--underweight)");
        } else if (bmi < 25) {
            setResult("Healthy Weight", "You are within the recommended range.", "var(--healthy)");
        } else if (bmi < 30) {
            setResult("Overweight", "Consider increasing physical activity.", "var(--overweight)");
        } else {
            setResult("Obese", "Consult a professional for personalized advice.", "var(--obese)");
        }

        function setResult(cat, exp, color) {
            catEl.textContent = cat;
            expEl.textContent = exp;
            root.style.setProperty('--accent', color);
        }
    }
});
