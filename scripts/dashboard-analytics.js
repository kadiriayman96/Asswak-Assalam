document.addEventListener("DOMContentLoaded", function () {
  // Logout function & Load Admin Name
  loadAdminName();
  var logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", logout);

  // Load data and populate the dashboard
  loadDataAndPopulateDashboard();
});

// logout
function logout() {
  localStorage.removeItem("sessionAdmin");
  window.location.href = "index.html";
}

//Load admin name
function loadAdminName() {
  var sessionAdmin = JSON.parse(localStorage.getItem("sessionAdmin"));
  if (sessionAdmin) {
    document.getElementById(
      "admin-name"
    ).innerHTML = `Logout <br /> ${sessionAdmin.name}`;
  } else {
    window.location.href = "index.html";
  }
}

function loadDataAndPopulateDashboard() {
  // Retrieve magasins from localStorage or initialize an empty array
  const magasins = JSON.parse(localStorage.getItem("magasins")) || [];

  // Populate charts and table with magasin data
  populateChartsAndTable(magasins);
}

function populateChartsAndTable(magasins) {
  populateTableCA(magasins);
  populateChiffreAffaireChart(magasins);
  populateEffectifsChart(magasins);
  populateSurfaceChart(magasins);
}

function populateChiffreAffaireChart(magasins) {
  const labels = magasins.map((magasin) => magasin.name);
  const data = magasins.map((magasin) => {
    const latestCA = magasin.MagasinDetails[0].ca;
    return parseFloat(latestCA.replace(" DH", ""));
  });

  const ctx = document.getElementById("myChartCA").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Chiffre d'affaires (DH)",
          data: data,
          backgroundColor: "#36A2EB",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return value.toLocaleString(); // Format y-axis labels
            },
          },
        },
      },
    },
  });
}

function populateEffectifsChart(magasins) {
  const labels = magasins.map((magasin) => magasin.name);
  const data = magasins.map((magasin) => magasin.MagasinDetails[0].effectifs);

  const ctx = document.getElementById("myChartEffectifs").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Effectifs",
          data: data,
          backgroundColor: "#FF6384",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return value.toLocaleString(); // Format y-axis labels
            },
          },
        },
      },
    },
  });
}

function populateSurfaceChart(magasins) {
  const labels = magasins.map((magasin) => magasin.name);
  const data = magasins.map((magasin) => {
    const latestSurface = magasin.MagasinDetails[0].surface;
    return parseFloat(latestSurface.replace("m²", ""));
  });

  const ctx = document.getElementById("myChartSurface").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Surface (m²)",
          data: data,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4CAF50",
            "#9C27B0",
            "#FF9800",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

function populateTableCA(magasins) {
  const tableBody = document.getElementById("table-ca");
  tableBody.innerHTML = ""; // Clear existing table rows

  magasins.forEach((magasin) => {
    const statutClass =
      magasin.status === "Actif" ? "statut-active" : "statut-notactive";

    const row = `
      <tr>
        <td>${magasin.name}</td>
        <td>${magasin.ville}</td>
        <td>${magasin.numeroTelephone}</td>
        <td>${magasin.adresse}</td>
        <td>${magasin.surface} m²</td>
        <td>
          <div class="${statutClass}">${magasin.status}</div>
        </td>
      </tr>
    `;

    tableBody.innerHTML += row;
  });
}
