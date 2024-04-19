function generateRandomId(length) {
    let randomId = "";
    for (let i = 0; i < length; i++) {
        randomId += Math.floor(Math.random() * 10); // Generate a random number between 0 and 9
    }
    return parseInt(randomId); // Parse the string to an integer
}

document.querySelector(".btn-ajouter").addEventListener("click", function() {
    //  Get form field values
    let date = document.getElementById("date").value;
    let status = document.getElementById("status").value;
    let nomMagasin = document.getElementById("nom").value;
    let numeroTelephone = document.getElementById("NumeroTelephone").value;
    let ville = document.getElementById("Ville").value;
    let surface = document.getElementById("surface").value;
    let adresse = document.getElementById("adresse").value;

    let magasins = JSON.parse(localStorage.getItem("magasins")) || [];
    let randomId;

    if (magasins && magasins.length > 0) {
        do {
            randomId = generateRandomId(4); // Adjust the length as needed
        } while (magasins.some((data) => data.Id === randomId)); // Check if the ID already exists in magasins
    } else {
        randomId = 1; // If no magasins exist, start with ID 1
    }

    // Create store object
    let newMagasin = {
        Id: randomId,
        dateCreation: date,
        status: status,
        name: nomMagasin,
        numeroTelephone: numeroTelephone,
        ville: ville,
        surface: surface,
        adresse: adresse,
    };

    magasins.push(newMagasin);
    localStorage.setItem("magasins", JSON.stringify(magasins));
    alert("nadi");
});
