function displayCards(city) {
  // Récupérer les données du localStorage
  var data;
  var allData = JSON.parse(localStorage.getItem("magasins"));
  if (city == "All") {
    data = allData;
  } else {
    data = allData.filter((item) => item.ville === city); // Use === for comparison
  }

  // Sélectionner l'élément contenant les cartes
  const cardsContainer = document.querySelector(".cards");
  cardsContainer.style.display = "flex";
  // Vider le contenu actuel des cartes
  cardsContainer.innerHTML = "";

  // Vérifier si des données sont présentes dans le localStorage
  if (data && data.length > 0) {
    // Parcourir les données
    data.forEach((magasin) => {
      // Créer une carte pour chaque magasin
      const card = document.createElement("div");
      card.classList.add("v-card");

      // Contenu de la carte
      card.innerHTML = `
            <div class="v-img-card">
                <span class="material-symbols-outlined " id="icon-card">storefront</span> 
            </div> 
            <div class="v-card-content">
            <a href="magasine-details.html?id=${magasin.Id}" class="card-title">
              <h3 class="v-card-title hover-effect">${magasin.name}</h3>
            </a>
                <div class="v-card-text">
                    <p class="v-p-card">Date : ${magasin.dateCreation}</p>
                    <p class="v-p-card">Ville : ${magasin.ville}</p>
                    <p class="v-p-card">Surface : ${magasin.surface} m²</p>
                </div>
            </div>
            `;
      // Ajouter la carte au conteneur
      cardsContainer.appendChild(card);
      //add
      const cardTitle = card.querySelector(".card-title");
      cardTitle.addEventListener("click", function (event) {
        // Prevent default link behavior
        event.preventDefault();
        // Get the URL from the anchor tag
        const url = this.getAttribute("href");
        // Redirect to the URL
        window.location.href = url;
      });
    });
  } else {
    // Afficher un message si aucune donnée n'est disponible
    cardsContainer.innerHTML = `<p class="p-card">Aucun magasin trouvé.</p>`;
  }
}
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
document.addEventListener("DOMContentLoaded", function () {
  // Load admin name and check session
  loadAdminName();

  // Logout functionality
  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", logout);

  // Sélectionner l'élément span avec la classe "grid-symbol"
  const gridSymbol = document.querySelector(".grid-symbol");
  const gridSymbol_2 = document.querySelector(".grid-symbol-2");
  const h_cards = document.querySelector(".h-cards");
  // Ajouter un écouteur d'événements pour le clic sur le span
  gridSymbol.addEventListener("click", function () {
    // Appeler la fonction displayCards() lorsque vous cliquez sur le symbole de la grille
    h_cards.style.display = "none";
    gridSymbol.style.backgroundColor = "white";
    gridSymbol_2.style.backgroundColor = "transparent";
    var city = document.getElementById("Ville").value;
    displayCards(city);
  });
});

function displayCardsH(city) {
  var data;
  var allData = JSON.parse(localStorage.getItem("magasins"));
  if (city == "All") {
    data = allData;
  } else {
    data = allData.filter((item) => item.ville === city); // Use === for comparison
  }

  // Sélectionner l'élément contenant les cartes
  const cardsContainer = document.querySelector(".cards");
  cardsContainer.style.display = "flex";
  // Vider le contenu actuel des cartes
  cardsContainer.innerHTML = "";

  // Vérifier si des données sont présentes dans le localStorage
  if (data && data.length > 0) {
    // Parcourir les données
    data.forEach((magasin) => {
      // Créer une carte pour chaque magasin
      const card = document.createElement("div");
      card.classList.add("h-card");

      // Contenu de la carte
      card.innerHTML = `
            <div class="h-img-card">
                <span class="material-symbols-outlined " id="icon-card">storefront</span> 
            </div> 
            <div class="h-card-content">
                <a href="magasine-details.html?id=${magasin.Id}" class="card-title">
                  <h3 class="h-card-title hover-effect">${magasin.name}</h3>
              </a>
                <div class="h-card-text">
                    <p class="h-p-card">Date : ${magasin.dateCreation}</p>
                    <p class="h-p-card">Ville : ${magasin.ville}</p>
                    <p class="h-p-card">Surface : ${magasin.surface} m²</p>
                </div>
            </div>
            `;
      // Ajouter la carte au conteneur
      cardsContainer.appendChild(card);

      // Add event listener to the card title
      const cardTitle = card.querySelector(".card-title");
      cardTitle.addEventListener("click", function (event) {
        // Prevent default link behavior
        event.preventDefault();
        // Get the URL from the anchor tag
        const url = this.getAttribute("href");
        // Redirect to the URL
        window.location.href = url;
      });
    });
  } else {
    // Afficher un message si aucune donnée n'est disponible
    cardsContainer.innerHTML = `<p class="p-card">Aucun magasin trouvé.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Sélectionner l'élément span avec la classe "grid-symbol"
  const gridSymbol = document.querySelector(".grid-symbol-2");
  const gridSymbol_1 = document.querySelector(".grid-symbol");
  const v_cards = document.querySelector(".v-cards");
  // Ajouter un écouteur d'événements pour le clic sur le span
  gridSymbol.addEventListener("click", function () {
    // Appeler la fonction displayCardsH() lorsque vous cliquez sur le symbole de la grille
    v_cards.style.display = "none";
    gridSymbol.style.backgroundColor = "white";

    gridSymbol_1.style.backgroundColor = "transparent";
    var city = document.getElementById("Ville").value;
    displayCardsH(city);
  });
});

window.onload = function () {
  displayCards("All");
  document.getElementById("Ville").addEventListener("change", function () {
    var city = document.getElementById("Ville").value;
    displayCards(city);
  });
};
