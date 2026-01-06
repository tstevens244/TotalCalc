document.addEventListener('DOMContentLoaded', () => {
    const metricBtn = document.getElementById('metric-btn');
    const imperialBtn = document.getElementById('imperial-btn');
    const metricInputs = document.getElementById('metric-inputs');
    const imperialInputs = document.getElementById('imperial-inputs');
    const bmiForm = document.getElementById('bmi-form');
    const resultSection = document.getElementById('result-container');

    let currentUnit = 'metric';

    // Toggle Units
    metricBtn.addEventListener('click', () => {
        currentUnit = 'metric';
        toggleUnitActive(metricBtn, imperialBtn, metricInputs, imperialInputs);
    });

    imperialBtn.addEventListener('click', () => {
        currentUnit = 'imperial';
        toggleUnitActive(imperialBtn, metricBtn, imperialInputs, metricInputs);
    });

    function toggleUnitActive(activeBtn, inactiveBtn, showGroup, hideGroup) {
        activeBtn.classList.add('active');
        inactiveBtn.classList.remove('active');
        showGroup.classList.remove('hidden');
        hideGroup.classList.add('hidden');
        resultSection.classList.add('hidden');
    }

    // Calculation Logic
    bmiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let bmi = 0;
        let height = 0;
        let weight = 0;

        if (currentUnit === 'metric') {
            height = parseFloat(document.getElementById('height-cm').value) / 100; // cm to m
            weight = parseFloat(document.getElementById('weight-kg').value);
            
            if (validate(height, weight)) {
                bmi = weight / (height * height);
            }
        } else {
            const ft = parseFloat(document.getElementById('height-ft').value) || 0;
            const inches = parseFloat(document.getElementById('height-in').value) || 0;
            weight = parseFloat(document.getElementById('weight-lb').value);
            height = (ft * 12) + inches;

            if (validate(height, weight)) {
                bmi = (weight / (height * height)) * 703;
            }
        }

        if (bmi > 0) {
            displayResult(bmi);
        }
    });

    function validate(h, w) {
        if (!h || !w || h <= 0 || w <= 0) {
            alert("Please enter valid, positive numbers for height and weight.");
            return false;
        }
        return true;
    }

    function displayResult(bmi) {
        const bmiValueEl = document.getElementById('bmi-value');
        const categoryEl = document.getElementById('bmi-category');
        const explanationEl = document.getElementById('bmi-explanation');
        const root = document.documentElement;

        const roundedBmi = bmi.toFixed(1);
        bmiValueEl.textContent = roundedBmi;

        let category = "";
        let explanation = "";
        let colorVar = "";

        if (bmi < 18.5) {
            category = "Underweight";
            explanation = "A BMI below 18.5 suggests you may need to increase your caloric intake. Consult with a healthcare provider.";
            colorVar = "var(--underweight)";
        } else if (bmi < 25) {
            category = "Healthy Weight";
            explanation = "Great job! Your BMI falls within the healthy range of 18.5–24.9, which is associated with lower health risks.";
            colorVar = "var(--healthy)";
        } else if (bmi < 30) {
            category = "Overweight";
            explanation = "A BMI of 25–29.9 is considered overweight. Focusing on balanced nutrition and exercise may be beneficial.";
            colorVar = "var(--overweight)";
        } else {
            category = "Obese";
            explanation = "A BMI of 30 or higher indicates obesity. It is recommended to speak with a professional about weight management.";
            colorVar = "var(--obese)";
        }

        categoryEl.textContent = category;
        explanationEl.textContent = explanation;
        root.style.setProperty('--accent', colorVar);

        resultSection.classList.remove('hidden');
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }
});
