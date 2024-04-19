document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("addModalBg");
    var modalBtn = document.querySelector(".btn-ajou");
    var updateModal = document.getElementById("updateModalBg");
    var deleteModal = document.getElementById("deleteModalBg");
    var updateModalBtn = document.querySelector(".add");
    var deleteModalBtn = document.querySelector(".actionMD .delete");
    var closeDeleteBtn = document.getElementById("customCloseBtnDel")
    var closeAddBtn = document.getElementById("customCloseBtn");
    var closeUpdateBtn = document.getElementById("customCloseBtnUp");
    var cancelBtn = document.getElementById("cancelBtn");

    cancelBtn.addEventListener("click", function () {
      deleteModal.style.display = "none";
    });

    modalBtn.addEventListener("click", function () {
      modal.style.display = "flex";
    });
    updateModalBtn.addEventListener("click", function () {
      updateModal.style.display = "flex";
    });
    deleteModalBtn.addEventListener("click", function () {
      deleteModal.style.display = "flex";
    });
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