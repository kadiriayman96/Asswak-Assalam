document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("addModalBg");
    var modalBtn = document.querySelector(".btn-ajou");
    var updateModal = document.getElementById("updateModalBg");
    var updateModalBtn = document.querySelector(".add");
  
    var closeAddBtn = document.getElementById("customCloseBtn");
    var closeUpdateBtn = document.getElementById("customCloseBtnUp");
    modalBtn.addEventListener("click", function () {
      modal.style.display = "flex";
    });
    updateModalBtn.addEventListener("click", function () {
      updateModal.style.display = "flex";
    });
  
    closeAddBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });
    closeUpdateBtn.addEventListener("click", function () {
      updateModal.style.display = "none";
    });
  
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });


});