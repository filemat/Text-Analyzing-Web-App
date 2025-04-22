document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("analyzeBtn");
    btn.addEventListener("click", handleAnalyzeClick);
});

async function handleAnalyzeClick() {
    const textInput = document.getElementById("inputText").value.trim();

    if(!textInput){
        alert("Kérlek irj be valamilyen szöveget, a mező nem maradhat üresen!");
        return;
    }

    const response = await fetch("http://localhost:5167/api/textanalysis", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({inputText: textInput})
    });

    if(!response.ok) {
        alert("Hiba történt az elemzés során!");
    }

    const result = await response.json();
    renderResult(result);
    renderChart(result.topWords);
}

function renderResult(data) {
    const resultDiv = document.getElementById("results");
    resultDiv.innerHTML = `
    <h4>Eredmények:</h4>
    <table class="table table-bordered">
        <tbody>
            <tr><th>Szavak száma</th><td>${data.wordCount}</td></tr>
            <tr><th>Karakterek száma</th><td>${data.charCount}</td></tr>
            <tr>
                <th>Olvashatósági index</th>
                <td>
                    <span id="readabilityValue" class="readability-score">
                    ${data.readabilityIndex.toFixed(2)}
                    </span>
                    <span id="readabilityLabel" class="ms-2 fst-italic"></span>
                </td>
            </tr>
        </tbody>
    </table>
    `;
    updateReadabilityStyle(data.readabilityIndex);
}

function renderChart(topWords) {
    const chartDiv = document.getElementById("chart");
    chartDiv.innerHTML = "<h4>Leggyakoribb szavak:</h4>";

    if (!topWords || topWords.length === 0) {
        chartDiv.innerHTML += "<p>Nincs elég adat megjelenítéshez.</p>";
        return;
    }

    let tableHTML = `
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Szó</th>
                    <th>Gyakoriság</th>
                </tr>
            </thead>
            <tbody>
    `;

    topWords.forEach(word => {
        tableHTML += `
            <tr>
                <td>${word.word}</td>
                <td>${word.frequency}</td>
            </tr>
        `;
    });

    tableHTML += `</tbody></table>`;
    chartDiv.innerHTML += tableHTML;

    chartDiv.innerHTML += `<h4 class="mt-4">Top 5 szó diagramként:</h4>`;
    const barContainer = document.createElement("div");
    barContainer.className = "bar-container";

    const top5 = topWords.slice(0, 5);
    const maxFreq = Math.max(...top5.map(w => w.frequency));

    top5.forEach(word => {
        const row = document.createElement("div");
        row.className = "bar-row";
    
        const label = document.createElement("div");
        label.className = "bar-label";
        label.textContent = word.word;
    
        const barWrapper = document.createElement("div");
        barWrapper.className = "bar-wrapper";
    
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.width = `${(word.frequency / maxFreq) * 100}%`;
        bar.textContent = `${word.frequency}`;
    
        barWrapper.appendChild(bar);
        row.appendChild(label);
        row.appendChild(barWrapper);
        barContainer.appendChild(row);
    });

    chartDiv.appendChild(barContainer);
}

function updateReadabilityStyle(score) {
    const valueSpan = document.getElementById("readabilityValue");
    const labelSpan = document.getElementById("readabilityLabel");

    valueSpan.classList.remove("readability-easy", "readability-medium", "readability-hard");
    labelSpan.textContent = "";

    if (score >= 80) {
        valueSpan.classList.add("readability-easy");
        labelSpan.textContent = "Nagyon könnyen olvasható";
    } else if (score >= 50) {
        valueSpan.classList.add("readability-medium");
        labelSpan.textContent = "Átlagos nehézségű szöveg";
    } else if (score >= 0) {
        valueSpan.classList.add("readability-hard");
        labelSpan.textContent = "Nehéz szöveg";
    } else {
        valueSpan.classList.add("readability-hard");
        labelSpan.textContent = "Rendkívül nehéz szöveg";
    }
}