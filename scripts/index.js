document.addEventListener("DOMContentLoaded", function () {
  // Functions
  adminExist();
  document.getElementById("login-form").addEventListener("submit", login);

  // Ajouter Admin au Local storage
  function addAdminToLocalStorage() {
    var admins = JSON.parse(localStorage.getItem("admins")) || [];

    var admin = {
      id: 69,
      name: "Mohammed Zefzaf",
      email: "admin@asswakassalam.osa",
      password: "admin@123",
    };

    admins.push(admin);
    localStorage.setItem("admins", JSON.stringify(admins));
  }

  // Check if Admin Exists in LocalStorage
  function adminExist() {
    var admins = JSON.parse(localStorage.getItem("admins"));
    var adminExists = false;

    if (admins) {
      admins.forEach(function (admin) {
        if (admin.id === 69) {
          adminExists = true;
        }
      });
    }

    if (!admins || !adminExists) {
      addAdminToLocalStorage();
    }
  }

  // Login
  function login(event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var admins = JSON.parse(localStorage.getItem("admins")) || [];

    var admin = admins.find(function (adm) {
      return adm.email === email && adm.password === password;
    });

    // Add admin to local storage sessionAdmin
    localStorage.setItem("sessionAdmin", JSON.stringify(admin));

    if (admin) {
      if (admin.id === 69) {
        window.location.href = "liste-des-magasins.html";
      } else {
        alert("You are not an admin");
      }
    } else {
      alert("Email ou mot de passe incorrect");
    }
  }

  // prevent logged in admins to return to index.html
  if (localStorage.getItem("sessionAdmin")) {
    window.location.href = "liste-des-magasins.html";
  }
});
