document.addEventListener("DOMContentLoaded", function () {
  //Load magasins data from local storage
  var magasins = JSON.parse(localStorage.getItem("magasins")) || [];

  // Load year select from local storage
  loadYearSelectFromLocalStorage();

  // Get the initially selected year element from the UI
  const selectedYearElement = document.getElementById("year-select");

  // Load admin name and check session
  loadAdminName();

  // Logout functionality
  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", logout);

  // Function to load data and calculate statistics based on the selected year
  function loadDataAndCalculateStatistics() {
    // Load all data
    populateTableData(magasins);

    // Get the selected year from the UI select element
    const selectedYear = selectedYearElement
      ? parseInt(selectedYearElement.value)
      : new Date().getFullYear(); // Use current year if element or value is not available

    // Calculate and display statistical metrics based on the selected year
    displayWeightedArithmeticMean(magasins, selectedYear);
    displayMode(magasins, selectedYear);
    displayMedian(magasins, selectedYear);
    displayStandardDeviation(magasins, selectedYear);
    displayCoefficientOfVariation(magasins, selectedYear);
  }

  // Attach change event listener to the year-select element
  if (selectedYearElement) {
    selectedYearElement.addEventListener("change", function () {
      loadDataAndCalculateStatistics();
    });
  }

  // Initial calculation when the page is loaded
  loadDataAndCalculateStatistics();

  //Load Chart data
  const frequencies = classifyMagasinsByRange(magasins);

  // Display bar chart
  displayBarChartCA(frequencies);
});
function loadYearSelectFromLocalStorage() {
  // Retrieve magasins data from local storage
  const magasins = JSON.parse(localStorage.getItem("magasins")) || [];

  // Extract unique years from magasins data
  const uniqueYears = [
    ...new Set(
      magasins.flatMap((magasin) =>
        magasin.MagasinDetails.map((detail) => parseInt(detail.annee))
      )
    ),
  ].sort((a, b) => b - a);

  // Select the year-select element
  const yearSelect = document.getElementById("year-select");

  // Clear existing options
  yearSelect.innerHTML = "";

  // Create and append new option elements for each unique year
  uniqueYears.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  });

  // Trigger change event to update statistics based on the first year in the list
  if (uniqueYears.length > 0) {
    yearSelect.value = uniqueYears[0];
    yearSelect.dispatchEvent(new Event("change"));
  }
}
// Logout function
function logout() {
  localStorage.removeItem("sessionAdmin");
  window.location.href = "index.html"; // Redirect to login page after logout
}

// Load admin name and validate session
function loadAdminName() {
  const sessionAdmin = JSON.parse(localStorage.getItem("sessionAdmin"));
  if (sessionAdmin) {
    const adminNameElement = document.getElementById("admin-name");
    if (adminNameElement) {
      adminNameElement.innerHTML = `Logout <br /> ${sessionAdmin.name}`;
    }
  } else {
    window.location.href = "index.html"; // Redirect to login page if session is not valid
  }
}

// Calculate Weighted Arithmetic Mean (Moyenne arithmétique pondérée) for Chiffre d'affaires
function calculateWeightedArithmeticMean(magasins, year) {
  let totalCA = 0;
  let totalWeight = 0;

  magasins.forEach((magasin) => {
    var details = magasin.MagasinDetails.find(
      (detail) => parseInt(detail.annee) === year
    );

    if (details) {
      const ca = details.ca;
      const weight = details.effectifs;
      totalCA += ca * weight;
      totalWeight += weight;
    }
  });

  if (totalWeight === 0) return 0; // Handle division by zero

  return totalCA / totalWeight;
}

// Display Weighted Arithmetic Mean on the webpage
function displayWeightedArithmeticMean(magasins, year) {
  const mean = calculateWeightedArithmeticMean(magasins, year);
  const meanElement = document.getElementById("weighted-mean");
  if (meanElement) {
    meanElement.innerHTML = `${mean.toFixed(2)} DH`;
  }
}

// Calculate Mode for Chiffre d'affaires
function calculateMode(magasins, year) {
  const caValues = magasins
    .flatMap((magasin) =>
      magasin.MagasinDetails.filter((detail) => parseInt(detail.annee) === year)
    )
    .map((detail) => parseInt(detail.ca));

  const counts = {};
  caValues.forEach((value) => {
    counts[value] = (counts[value] || 0) + 1;
  });

  let mode = null;
  let maxCount = 0;
  Object.entries(counts).forEach(([value, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mode = parseInt(value);
    }
  });

  return mode;
}

// Display Mode on the webpage
function displayMode(magasins, year) {
  const mode = calculateMode(magasins, year);
  const modeElement = document.getElementById("mode-value");
  const modeTextElement = document.getElementById("mode-value-text");
  if (modeElement) {
    modeElement.textContent = `${mode.toFixed(2)} DH`;
  }
  if (modeTextElement) {
    modeTextElement.textContent = `${mode.toFixed(2)} DH`;
  }
}

// Calculate Median for Chiffre d'affaires
function calculateMedian(magasins, year) {
  const caValues = magasins
    .flatMap((magasin) =>
      magasin.MagasinDetails.filter((detail) => parseInt(detail.annee) === year)
    )
    .map((detail) => parseInt(detail.ca));

  caValues.sort((a, b) => a - b);

  const mid = Math.floor(caValues.length / 2);
  if (caValues.length % 2 === 0) {
    return (caValues[mid - 1] + caValues[mid]) / 2;
  } else {
    return caValues[mid];
  }
}

// Display Median on the webpage
function displayMedian(magasins, year) {
  const median = calculateMedian(magasins, year);
  const medianElement = document.getElementById("median-value");
  const medianTextElement = document.getElementById("median-value-text");
  const medianTypeText = document.getElementById("median-type-texts");
  if (medianElement) {
    medianElement.textContent = `${median.toFixed(2)} DH`;
  }
  if (medianTextElement) {
    medianTextElement.textContent = `${median.toFixed(2)} DH`;
  }
  if (medianTypeText) {
    medianTypeText.textContent = `${median.toFixed(2)} DH`;
  }
}

// Calculate Standard Deviation for Chiffre d'affaires
function calculateStandardDeviation(magasins, year) {
  const caValues = magasins
    .flatMap((magasin) =>
      magasin.MagasinDetails.filter((detail) => parseInt(detail.annee) === year)
    )
    .map((detail) => parseInt(detail.ca));

  const mean = calculateWeightedArithmeticMean(magasins, year);
  const squaredDifferences = caValues.map((value) => (value - mean) ** 2);
  const variance =
    squaredDifferences.reduce((acc, val) => acc + val, 0) / caValues.length;

  return Math.sqrt(variance);
}

// Display Standard Deviation on the webpage
function displayStandardDeviation(magasins, year) {
  const standardDeviation = calculateStandardDeviation(magasins, year);
  const standardDeviationElement = document.getElementById("ecart-type");
  if (standardDeviationElement) {
    standardDeviationElement.innerHTML = `${standardDeviation.toFixed(2)} DH`;
  }
}

// Calculate Coefficient of Variation for Chiffre d'affaires
function calculateCoefficientOfVariation(magasins, year) {
  const mean = calculateWeightedArithmeticMean(magasins, year);
  const standardDeviation = calculateStandardDeviation(magasins, year);

  if (mean === 0) return 0; // Handle division by zero

  return (standardDeviation / mean) * 100;
}

// Display Coefficient of Variation on the webpage
function displayCoefficientOfVariation(magasins, year) {
  const coefficientOfVariation = calculateCoefficientOfVariation(
    magasins,
    year
  );
  const coefficientValueElement = document.getElementById("coefficient-value");
  const ecartTypeTextElement = document.getElementById("ecart-type-text");

  if (coefficientValueElement) {
    coefficientValueElement.textContent = `${coefficientOfVariation.toFixed(
      3
    )}`;
  }
  if (ecartTypeTextElement) {
    ecartTypeTextElement.textContent = `${coefficientOfVariation.toFixed(3)} %`;
  }
}
function populateTableData(magasins) {
  const tableBody = document.getElementById("table-ca");
  tableBody.innerHTML = ""; // Clear existing table rows

  magasins.forEach((magasin) => {
    let statutClass =
      magasin.status === "Actif" ? "statut-active" : "statut-notactive";
    let statutText = magasin.status === "Actif" ? "Actif" : "Inactif";

    const row = `
      <tr>
        <td>${magasin.name}</td>
        <td>${magasin.ville}</td>
        <td>${magasin.numeroTelephone}</td>
        <td>${magasin.adresse}</td>
        <td>${magasin.surface}</td>
        <td>
          <div class="${statutClass}">${
      magasin.status === "Actif" ? "Actif" : "Inactif"
    }</div>
        </td>
      </tr>
    `;

    tableBody.innerHTML += row;
  });
}

// Function to classify magasins by CA range
function classifyMagasinsByRange(magasins) {
  const ranges = [
    { label: "[33,39[", min: 3300000, max: 3900000 },
    { label: "[39,45[", min: 3900000, max: 4500000 },
    { label: "[45,51[", min: 4500000, max: 5100000 },
    { label: "[51,57[", min: 5100000, max: 5700000 },
    { label: "[57,63[", min: 5700000, max: 6300000 },
  ];

  const frequencies = new Array(ranges.length).fill(0);

  magasins.forEach((magasin) => {
    magasin.MagasinDetails.forEach((detail) => {
      const ca = parseInt(detail.ca);

      // Check if caNumeric is a valid number
      if (isNaN(ca)) {
        console.warn(`Invalid CA value: ${ca}`);
        return; // Skip processing this detail
      }

      // Find the range index for the current CA
      for (let i = 0; i < ranges.length; i++) {
        const { min, max } = ranges[i];

        // Check if CA falls within the current range
        if (ca >= min && ca < max) {
          frequencies[i]++;
          break; // Exit the loop once the range is found
        }
      }
    });
  });

  console.log(frequencies); // Output frequencies to inspect

  return frequencies;
}

// Function to display bar chart using Chart.js Chiffre d'affaires
function displayBarChartCA(frequencies) {
  const ranges = ["[33,39]", "[39,45]", "[45,51]", "[51,57]", "[57,63]"];

  const ctx = document.getElementById("myChartCA").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ranges,
      datasets: [
        {
          label: "Frequency of Magasins by CA Range",
          data: frequencies,
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Frequency",
          },
        },
        x: {
          title: {
            display: true,
            text: "CA Range",
          },
        },
      },
    },
  });
}
