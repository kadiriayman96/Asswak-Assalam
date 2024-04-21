document.addEventListener("DOMContentLoaded", function () {
  // Load admin name and check session
  loadAdminName();

  // Logout functionality
  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", logout);

  var modal = document.getElementById("addModalBg");
  var modalBtn = document.querySelector(".btn-ajou");
  var updateModal = document.getElementById("updateModalBg");
  var deleteModal = document.getElementById("deleteModalBg");
  // var updateModalBtn = document.querySelector(".add");
  // var deleteModalBtn = document.querySelector(".actionMD .delete");
  var closeDeleteBtn = document.getElementById("customCloseBtnDel");
  var closeAddBtn = document.getElementById("customCloseBtn");
  var closeUpdateBtn = document.getElementById("customCloseBtnUp");
  var cancelBtn = document.getElementById("cancelBtn");
  // var magasins = JSON.parse(localStorage.getItem("magasins"));
  var magsinNam = document.getElementById("magsin-nam");

  cancelBtn.addEventListener("click", function () {
    deleteModal.style.display = "none";
  });

  modalBtn.addEventListener("click", function () {
    modal.style.display = "flex";
  });
  // updateModalBtn.addEventListener("click", function () {
  //   updateModal.style.display = "flex";
  // });
  // deleteModalBtn.addEventListener("click", function () {
  //   deleteModal.style.display = "flex";
  // });
  closeAddBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });
  closeUpdateBtn.addEventListener("click", function () {
    updateModal.style.display = "none";
  });
  closeDeleteBtn.addEventListener("click", function () {
    deleteModal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    } else if (event.target == updateModal) {
      updateModal.style.display = "none";
    } else if (event.target == deleteModal) {
      deleteModal.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Function to parse query parameters from URL
  function parseQueryParameters() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
  }

  // Get the ID from the URL
  var magasinId = parseQueryParameters();
  var magasins = JSON.parse(localStorage.getItem("magasins")) || [];
  var magasin = magasins.find((magasin) => magasin.Id == magasinId);
  var magsinNam = document.getElementById("magsin-nam");
  var magasin_vil = document.getElementById("magasin-vil");
  var magasin_dt = document.getElementById("magasin-dt");
  magsinNam.innerHTML = magasin.name;
  magasin_vil.innerHTML = magasin.ville;
  magasin_dt.innerHTML = magasin.dateCreation;

  // Function to generate a random ID
  function generateRandomId(length) {
    let randomId = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      randomId += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    return randomId;
  }

  // Function to check if the generated ID already exists
  function isIdUnique(id, MagasinDetailsArray) {
    return !MagasinDetailsArray.some((details) => details.id === id);
  }

  function saveFormData(MagasinDetails) {
    var magasins = JSON.parse(localStorage.getItem("magasins")) || [];
    var magasin = magasins.find((magasin) => magasin.Id == magasinId);

    if (magasin) {
      if (!magasin.MagasinDetails || !Array.isArray(magasin.MagasinDetails)) {
        magasin.MagasinDetails = [];
      }

      let uniqueId = generateRandomId(8);
      // Generate a unique ID for the MagasinDetails
      while (!isIdUnique(uniqueId, magasin.MagasinDetails)) {
        uniqueId = generateRandomId(8);
      }
      MagasinDetails.id = uniqueId;
      var currentDate = new Date();
      // Format date as YYYY-MM-DD
      var formattedDate =
        currentDate.getFullYear() +
        "-" +
        ("0" + (currentDate.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + currentDate.getDate()).slice(-2);
      MagasinDetails.date = formattedDate;
      magasin.MagasinDetails.push(MagasinDetails);
      localStorage.setItem("magasins", JSON.stringify(magasins));
      console.log("Form data saved successfully!");
    } else {
      console.error("Magasin with ID", magasinId, "not found.");
    }
  }

  var dataForm = document.getElementById("addModal-form");

  if (dataForm) {
    dataForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var MagasinDetails = {
        ca: document.getElementById("ca").value,
        annee: document.getElementById("annee").value,
        effectifs: document.getElementById("effectifs").value,
        surface: document.getElementById("surface").value,
      };

      saveFormData(MagasinDetails);

      dataForm.reset();
      var modal = document.getElementById("addModalBg");
      modal.style.display = "none";
      // location.reload();
      displayMagasinDetails();
    });
  } else {
    console.error("Data form element not found.");
  }
  // });

  //................................................addEventListener("DOMContentLoaded", function () {
  function displayMagasinDetails() {
    var magasins = JSON.parse(localStorage.getItem("magasins")) || [];
    var magasin = magasins.find((magasin) => magasin.Id == magasinId);
    var tableBody = document.querySelector("#table tbody");

    if (magasin && magasin.MagasinDetails) {
      tableBody.innerHTML = ""; // Clear existing table rows

      magasin.MagasinDetails.forEach((detail) => {
        var row = document.createElement("tr");
        row.innerHTML = `
          <td>${detail.annee}</td>
          <td>${detail.ca} MAD</td>
          <td>${detail.effectifs}</td>
          <td>${detail.surface} m²</td>
          <td class="actionMD">
            <div class="add" data-id="${detail.id}">Modifier</div>
            <div class="delete" data-id="${detail.id}">Supprimer</div>
          </td>
        `;
        tableBody.appendChild(row);

        // Add event listener for "Supprimer" button
        var deleteModal = document.getElementById("deleteModalBg");
        var deleteBtn = row.querySelector(".delete");
        deleteBtn.addEventListener("click", function () {
          // Display the delete modal
          deleteModal.style.display = "flex";

          // Handle deletion when the confirm delete button is clicked

          var confirmDeleteBtn = deleteModal.querySelector(".sup");
          confirmDeleteBtn.addEventListener("click", function () {
            var detailId = deleteBtn.getAttribute("data-id");
            deleteMagasinDetail(detailId);
            deleteModal.style.display = "none"; // Hide the modal after deletion
          });
        });
      });
    } else {
      // No MagasinDetails found, display a message or handle as needed
      tableBody.innerHTML =
        "<tr><td colspan='5'>No MagasinDetails found</td></tr>";
    }
  }

  // Call the function to fetch and display MagasinDetails data
  displayMagasinDetails();

  // Function to delete a MagasinDetail from both table and localStorage
  function deleteMagasinDetail(detailId) {
    var magasins = JSON.parse(localStorage.getItem("magasins")) || [];
    var magasinIndex = magasins.findIndex((magasin) => magasin.Id == magasinId);

    if (magasinIndex !== -1) {
      var magasin = magasins[magasinIndex];
      if (magasin && magasin.MagasinDetails) {
        var detailIndex = magasin.MagasinDetails.findIndex(
          (detail) => detail.id == detailId
        );
        if (detailIndex !== -1) {
          magasin.MagasinDetails.splice(detailIndex, 1); // Remove the detail from the array

          // Update localStorage
          localStorage.setItem("magasins", JSON.stringify(magasins));

          // Refresh table
          displayMagasinDetails();
          console.log("MagasinDetail deleted successfully.");
          return;
        }
      }
    } else {
      console.error("Failed to delete MagasinDetail.");
    }
  }

  //update func
  function handleUpdateClick(event) {
    var updateModal = document.getElementById("updateModalBg");
    var closeUpdateBtn = updateModal.querySelector("#customCloseBtnUp");
    closeUpdateBtn.addEventListener("click", function () {
      updateModal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target == updateModal) {
        updateModal.style.display = "none";
      }
    });

    var updateBtn = event.target.closest(".add");
    if (!updateBtn) return; // If the click is not on an update button, exit

    var detailId = updateBtn.dataset.id; // Get the ID from the dataset
    var magasins = JSON.parse(localStorage.getItem("magasins")) || [];
    var magasin = magasins.find((magasin) => magasin.Id == magasinId);

    if (magasin && magasin.MagasinDetails) {
      var detail = magasin.MagasinDetails.find(
        (detail) => detail.id === detailId
      );

      if (detail) {
        // Populate the update modal with existing data
        document.getElementById("update-annee").value = detail.annee;
        document.getElementById("update-ca").value = detail.ca;
        document.getElementById("update-effectifs").value = detail.effectifs;
        document.getElementById("update-surface").value = detail.surface;

        // Display the update modal
        updateModal.style.display = "flex";

        // Handle update form submission
        var updateForm = document.getElementById("updateModal-form");
        updateForm.addEventListener("submit", function (event) {
          event.preventDefault();

          // Update form data
          detail.annee = document.getElementById("update-annee").value;
          detail.ca = document.getElementById("update-ca").value;
          detail.effectifs = document.getElementById("update-effectifs").value;
          detail.surface = document.getElementById("update-surface").value;

          // Update local storage with modified data
          localStorage.setItem("magasins", JSON.stringify(magasins));

          // Refresh table
          displayMagasinDetails();

          // Close the update modal
          updateModal.style.display = "none";
        });
        return; // Exit the function if the form data is found and update modal displayed
      }
    }
    console.error("Magasin data or detail not found for the current user.");
  }

  var tableBody = document.querySelector("#table tbody");
  tableBody.addEventListener("click", handleUpdateClick);
});

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
