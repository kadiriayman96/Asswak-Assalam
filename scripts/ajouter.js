document.querySelector(".btn-ajouter").addEventListener("click", function() {
    // Get form field values
    let date = document.getElementById("date").value;
    let status = document.getElementById("status").value;
    let nomMagasin = document.getElementById("nom").value;
    let numeroTelephone = document.getElementById("NumeroTelephone").value;
    let ville = document.getElementById("Ville").value;
    let surface = document.getElementById("surface").value;
    let adresse = document.getElementById("adresse").value;

    // Create store object
    let newStore = {
        date: date,
        status: status,
        nomMagasin: nomMagasin,
        numeroTelephone: numeroTelephone,
        ville: ville,
        surface: surface,
        adresse: adresse
    };
alert(newStore);
   
    let stores = JSON.parse(localStorage.getItem("stores")) || [];

  
    stores.push(newStore);

    localStorage.setItem("stores", JSON.stringify(stores));

    
});
