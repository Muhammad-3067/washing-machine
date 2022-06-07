// Navbar active class
function activePageView() {
  const activePage = window.location.pathname;
  const activeList = document.querySelectorAll("#activate-list a");

  for (let i = 0; i < activeList.length; i++) {
    if (activeList[i].href.includes(`${activePage}`)) {
      activeList[i].classList.add("active");
    }
  }
}
activePageView();

// Responsive navbar

function responsiveNavbar() {
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".main-nav");

  hamburger.addEventListener("click", () => {
    navList.classList.toggle("active");
  });

  document.querySelectorAll(".main-nav li").forEach((n) =>
    n.addEventListener("click", () => {
      navList.classList.remove("active");
    })
  );
}
responsiveNavbar();

// pop-up modal
function popUpModal() {
  const openModalBtn = document.querySelectorAll("[data-modal-target]");
  const closeModalBtn = document.querySelectorAll("[data-close-btn]");
  const overlay = document.getElementById("overlay");

  overlay.addEventListener("click", () => {
    const modals = document.querySelectorAll(".modal.active");
    modals.forEach((modal) => {
      closeModal(modal);
    });
  });

  openModalBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = document.querySelector(btn.dataset.modalTarget);
      openModal(modal);
    });
  });

  closeModalBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      closeModal(modal);
    });
  });

  function openModal(modal) {
    if (modal == null) return;
    modal.classList.add("active");
    overlay.classList.add("active");
  }

  function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }
}
popUpModal();

// slider

function slider() {
  const unvisible_slider = document.querySelector(".slider-unvisible-items");
  const counter = document.querySelector(".counter");
  const maxSlider = document.querySelector(".max-num");

  if (maxSlider != null) {
    let maxNum = Number(maxSlider.textContent);
    let count = 3;
    let offset = 0;

    //
    document.querySelector(".prev").addEventListener("click", () => {
      offset = offset - 310;
      if (offset < 0) {
        offset = 1550;
      }
      unvisible_slider.style.left = -offset + "px";

      // slider counter
      count = count - 1;
      if (count < 3) {
        count = maxNum;
      }
      counter.textContent = count;
    });

    document.querySelector(".next").addEventListener("click", () => {
      offset = offset + 310;
      if (offset > 1550) {
        offset = 0;
      }
      unvisible_slider.style.left = -offset + "px";

      // slider counter
      count = count + 1;
      if (count > maxNum) {
        count = 3;
      }
      counter.textContent = count;
    });
  }
}
slider();
