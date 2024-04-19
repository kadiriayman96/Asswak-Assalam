function displayCards() {
    // Récupérer les données du localStorage
    const data = JSON.parse(localStorage.getItem('stores'));

    // Sélectionner l'élément contenant les cartes
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.style.display = "flex"
    // Vider le contenu actuel des cartes
    cardsContainer.innerHTML = '';

    // Vérifier si des données sont présentes dans le localStorage
    if (data && data.length > 0) {
        // Parcourir les données

        data.forEach(magasin => {
            // Créer une carte pour chaque magasin
            const card = document.createElement('div');
            card.classList.add('v-card');
            
            // Contenu de la carte
            card.innerHTML = `
            <span class="material-symbols-outlined " id="icon-card">storefront</span>   
            <div class="v-card-content">
              <h3 class="v-card-title">${magasin.nomMagasin}</h3>
              <div class="v-card-text">
                <p  class="v-p-card">Date: ${magasin.date}</p>
              <p class="v-p-card">Ville: ${magasin.ville}</p>
              <p class="v-p-card" >Surface:${magasin.surface} m²  </p>
                </div>
            `;

            // Ajouter la carte au conteneur
            cardsContainer.appendChild(card);
        });
    } else {
        // Afficher un message si aucune donnée n'est disponible
        cardsContainer.innerHTML = '<p>Aucun magasin trouvé.</p>';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner l'élément span avec la classe "grid-symbol"
    const gridSymbol = document.querySelector('.grid-symbol');
    const gridSymbol_2 = document.querySelector('.grid-symbol-2');
    const h_cards = document.querySelector('.h-cards');
    // Ajouter un écouteur d'événements pour le clic sur le span
    gridSymbol.addEventListener('click', function() {
        // Appeler la fonction displayCards() lorsque vous cliquez sur le symbole de la grille
        h_cards.style.display="none";
        gridSymbol.style.backgroundColor = "white";
        gridSymbol_2.style.backgroundColor = "transparent";

        displayCards();
    });
});
function displayCardsH() {
    // Récupérer les données du localStorage
    const data = JSON.parse(localStorage.getItem('stores'));

    // Sélectionner l'élément contenant les cartes
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.style.display = "flex"
    // Vider le contenu actuel des cartes
    cardsContainer.innerHTML = '';

    // Vérifier si des données sont présentes dans le localStorage
    if (data && data.length > 0) {
        // Parcourir les données

        data.forEach(magasin => {
            // Créer une carte pour chaque magasin
            const card = document.createElement('div');
            card.classList.add('h-card');
            
            // Contenu de la carte
            card.innerHTML = `
            <span class="material-symbols-outlined" id="icon-card">storefront</span>   
            <div class="h-card-content">
                <h3 class="h-card-title">${magasin.nomMagasin}</h3>
                <div class="h-card-text">
                    <p class="h-p-card">Date:${magasin.date} </p>
                    <p class="h-p-card">Ville:${magasin.ville}</p>
                    <p class="h-p-card">Surface:${magasin.surface} m²</p>
                </div>
            </div>
            `;

            // Ajouter la carte au conteneur
            cardsContainer.appendChild(card);
        });
    } else {
        // Afficher un message si aucune donnée n'est disponible
        cardsContainer.innerHTML = '<p>Aucun magasin trouvé.</p>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner l'élément span avec la classe "grid-symbol"
    const gridSymbol = document.querySelector('.grid-symbol-2');
    const gridSymbol_1 = document.querySelector('.grid-symbol');
    const v_cards = document.querySelector('.v-cards');
    // Ajouter un écouteur d'événements pour le clic sur le span
    gridSymbol.addEventListener('click', function() {
        // Appeler la fonction displayCards() lorsque vous cliquez sur le symbole de la grille
        v_cards.style.display="none";
        gridSymbol.style.backgroundColor = "white";
        
        gridSymbol_1.style.backgroundColor = "transparent";

        displayCardsH();
    });
});



