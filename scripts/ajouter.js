function generateRandomId(length) {
  let randomId = "";
  for (let i = 0; i < length; i++) {
    randomId += Math.floor(Math.random() * 10); //Generate a random number between 0 and 9
  }
  return parseInt(randomId); //Parse the string to an integer
}

var handleSubmit = function handleSubmit(event) {
  event.preventDefault(); // Prevent the form from submitting automatically

  // Get form inputs
  const date = document.getElementById("date").value;
  const status = document.getElementById("status").value;
  const nom = document.getElementById("nom").value;
  const numeroTelephone = document.getElementById("NumeroTelephone").value;
  const ville = document.getElementById("Ville").value;
  const surface = document.getElementById("surface").value;
  const adresse = document.getElementById("adresse").value;

  // Check if all required fields are filled
  if (
    !validateDate(date) ||
    !validateNom(nom) ||
    !validateNumeroTelephone(numeroTelephone) ||
    !validateVille(ville) ||
    !validateSurface(surface)
  ) {
    return;
  }

  let magasins = JSON.parse(localStorage.getItem("magasins")) || [];
  let randomId;

  if (magasins && magasins.length > 0) {
    do {
      randomId = generateRandomId(4); //Adjust the length as needed
    } while (magasins.some((data) => data.Id === randomId)); // Check if the ID already exists in magasins
  } else {
    randomId = 1; //If no magasins exist, start with ID 1
  }

  //Create store object
  let newMagasin = {
    Id: randomId,
    dateCreation: date,
    status: status,
    name: nom,
    numeroTelephone: numeroTelephone,
    ville: ville,
    surface: surface,
    adresse: adresse,
  };

  magasins.push(newMagasin);
  localStorage.setItem("magasins", JSON.stringify(magasins));

  // Reset form fields after submission (optional)
  document.getElementById("date").value = "";
  document.getElementById("status").value = "Actif";
  document.getElementById("nom").value = "";
  document.getElementById("NumeroTelephone").value = "";
  document.getElementById("Ville").value = "Rabat";
  document.getElementById("surface").value = "";
  document.getElementById("adresse").value = "";

  $("#successModal").modal("show");
  $("#successModal").on("hidden.bs.modal", function (e) {
    window.location.href = "liste-des-magasins.html";
  });
};

// Validation functions for each form field
function validateDate(date) {
  if (!date) {
    displayErrorMessage("date", "Veuillez sélectionner une date.");
    return false;
  }
  return true;
}

function validateNom(nom) {
  if (!nom) {
    displayErrorMessage("nom", "Veuillez entrer un nom.");
    return false;
  }
  return true;
}

function validateNumeroTelephone(numeroTelephone) {
  if (!numeroTelephone) {
    displayErrorMessage(
      "NumeroTelephone",
      "Veuillez entrer un numéro de téléphone."
    );
    return false;
  }
  // Add additional validation for phone number format if needed
  return true;
}

function validateVille(ville) {
  if (!ville) {
    displayErrorMessage("Ville", "Veuillez sélectionner une ville.");
    return false;
  }
  return true;
}

function validateSurface(surface) {
  if (!surface) {
    displayErrorMessage("surface", "Veuillez entrer une surface.");
    return false;
  }
  return true;
}

// Function to display error message next to form field
function displayErrorMessage(fieldId, message) {
  const errorElement = document.getElementById(`${fieldId}-error`);
  errorElement.textContent = message;
}

//  //Add event listener to the form
//  const btnAjouter = document.querySelector('.btn-ajouter'); // Select the submit button
//  btnAjouter.addEventListener('click', function(event) {

//      handleSubmit(event);  //Call your handleSubmit function
//  });

var form = document.getElementById("formAdd-magasin");
form.addEventListener("submit", handleSubmit);

function logout() {
  localStorage.removeItem("sessionAdmin");
  window.location.href = "index.html"; // Redirect to login page after logout
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
  loadAdminName();

  // Logout functionality
  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", logout);
});
