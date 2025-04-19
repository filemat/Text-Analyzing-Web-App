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
            <tr><th>Olvashatósági index</th><td>${data.readabilityIndex.toFixed(2)}</td></tr>
        </tbody>
    </table>
    `;
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

    tableHTML += `
            </tbody>
        </table>
    `;

    chartDiv.innerHTML += tableHTML;
}