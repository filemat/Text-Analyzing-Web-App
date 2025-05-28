# 📊 Text Analysis Web Application

This project is a full-stack web application developed to analyze user submitted text. It provides detailed insights such as word count, character count, readability score, and a frequency analysis of the most common words. The goal of the project was to practice building a RESTful API using ASP.NET Core, and making it a responsive JavaScript-based frontend interface.

## 🛠️ Technologies Used

### Frontend
- **HTML5** – For structural layout
- **CSS3** – Custom styles and bar charts
- **Vanilla JavaScript (ES6+)** – Handles input validation, API requests, and dynamic rendering
- **Bootstrap** – Responsive layout and styled components

### Backend
- **ASP.NET Core Web API** – Serves the `/api/textanalysis` endpoint
- **C#** – Business logic for text analysis
- **Regex (System.Text.RegularExpressions)** – Tokenization and sentence detection
- **Swagger** – Built-in API documentation and testing interface
- **CORS configuration** – Enables frontend-backend communication during development

---

## 📊 Key Features

- 📝 **Submit raw text** via a single-page frontend interface
- 🔢 **Statistics returned**:
  - Word count
  - Character count (excluding whitespace)
  - Flesch Reading Ease index
  - Top 5 most frequent words
- 📉 **Visual representation** of word frequency
- 📐 **Readability classification** based on index:
  - Green = Easy
  - Orange = Medium
  - Red = Hard
- 📱 **Responsive layout** across all devices

---

## 🧠 Backend Logic Overview

- **Service Layer** (`TextAnalysisService.cs`): Core analysis is handled here
  - Words are extracted using `Regex`
  - Syllables are estimated using a simplified vowel-counting heuristic
  - Sentences are split on punctuation (`.`, `!`, `?`)
  - Flesch Reading Ease formula:

    ```
    206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
    ```

- **Controller Layer** (`TextAnalysisController.cs`):
  - Exposes a single `POST` route
  - Accepts a JSON body containing the `inputText`
  - Returns a `TextAnalysisResult` object with computed data

---

## 📁 Project Structure

```
TextAnalysisApp/
├── FRONTEND/                    # Static frontend files
│   ├── index.html               # Single-page UI
│   ├── css
│   │   └── style.css            # Custom styling + chart visuals
│   │   js
│   │   └── script.js            # Fetch call to backend, DOM rendering
├── BACKEND/                     # ASP.NET Core Web API
│   ├── Controllers/
│   │   └── TextAnalysisController.cs   # POST endpoint handler
│   ├── Services/
│   │   ├── ITextAnalysisService.cs     # Interface
│   │   └── TextAnalysisService.cs      # Implementation of core logic
│   ├── Models/
│   │   ├── TextAnalysisRequest.cs      # Input model
│   │   ├── TextAnalysisResult.cs       # Output model
│   │   └── WordFrequency.cs            # Word-frequency pair
│   └── Program.cs                      # Startup config, routing, CORS, Swagger
```
