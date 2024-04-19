document.addEventListener("DOMContentLoaded", function () {
  // Script to activate Bootstrap tab functionality
  $(document).ready(function () {
    $("#myTab a").click(function (e) {
      e.preventDefault();
      $(this).tab("show");
    });
  });

  // Script to activate Chart.js
  const myChartCA = document.getElementById("myChartCA").getContext("2d");
  new Chart(myChartCA, {
    type: "bar",
    data: {
      labels: ["33,39", "39,45", "45,51", "51,57", "57,63", "63,69"],
      datasets: [
        {
          label: "Chiffres d'affaires par mois",
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
          backgroundColor: "#0353A4",
        },
      ],
    },
    options: {
      // Chart options
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  const myChartEffectifs = document
    .getElementById("myChartEffectifs")
    .getContext("2d");
  new Chart(myChartEffectifs, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "Effectifs par mois",
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      // Chart options
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  var myChartSurface = document
    .getElementById("myChartSurface")
    .getContext("2d");

  new Chart(myChartSurface, {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "Surfaces par mois",
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4CAF50",
            "#9C27B0",
            "#FF9800",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
});
