// Check If There's Local Storage Color Option
let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

// Switch Random Background Option
// Variable To Control Interval
let backgroundInterval;

// Random Background Option
let backgroundOption = true;

// Check If There's Local Storage Random Background Item

let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

const randomBackgroundsElement = document.querySelectorAll(
  ".settings-box .random-backgrounds span"
);

// Loop On All Spans
randomBackgroundsElement.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImages();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// Toggle Spin Class on Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // Toggle Class Fa-Spin for rotation
  this.classList.toggle("fa-spin");

  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Set Color on Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    handleActive(e);

    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);
  });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array of Images
let imagesArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function randomizeImages() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imagesArray.length);

      // Change Background Image Url
      landingPage.style.backgroundImage = `url("images/${imagesArray[randomNumber]}")`;
    }, 10000);
  }
}

randomizeImages();

// Select Skills Selector

let ourSkills = document.querySelector(".skills");

// window.onscroll = function () {
//   // Skills Offset Top
//   let skillsOffsetTop = ourSkills.offsetTop;

//   // Skills Outer Height
//   let skillsOuterHeight = ourSkills.offsetHeight;

//   // Window Height
//   let windowHeight = this.innerHeight;

//   // Window ScrollTop
//   let windowScrollTop = this.scrollY;

//   var scrollPosition = window.scrollY + window.innerHeight;

//   if (scrollPosition > skills.offsetTop) {
//     let allSkills = document.querySelectorAll(
//       ".skill-box .skill-progress span"
//     );

//     allSkills.forEach((skill) => {
//       skill.style.width = skill.dataset.progress;
//     });
//   }
// };

window.addEventListener("scroll", function () {
  var skills = document.querySelector(".skills"); // الحصول على العنصر الذي تريد التفاعل معه
  var elementPosition = skills.getBoundingClientRect().top; // الحصول على موضع العنصر على الصفحة
  var windowHeight = window.innerHeight; // ارتفاع النافذة
  if (elementPosition < windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
});

// Create Popup with Gallery Image

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");

    // Add Class To Overlay
    overlay.className = "popup-overlay";

    // Append Overlay To Body
    document.body.appendChild(overlay);

    // Create The Popup Box
    let popupBox = document.createElement("div");

    // Add Class To Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imageHeadding = document.createElement("h3");

      // Create Text For Heading
      let imageText = document.createTextNode(img.alt);

      // Append Text To Heading
      imageHeadding.appendChild(imageText);

      // Append Heading To Popup Box
      popupBox.appendChild(imageHeadding);
    }

    // Create The Image
    let popupImage = document.createElement("img");

    // Set Image Source
    popupImage.src = img.src;

    // Add Image To Popup Box
    popupBox.appendChild(popupImage);

    // Add The Popup Box To Body
    document.body.appendChild(popupBox);

    // Create The Close Span
    let closeButton = document.createElement("span");

    // Create Close Button Text
    let closeButtonText = document.createTextNode("x");

    // Append Text To Close Button
    closeButton.appendChild(closeButtonText);

    // Add Class To Close Button
    closeButton.className = "close-button";

    // Add Close Button To The Popup Box
    popupBox.appendChild(closeButton);
  });
});

// Close Popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();

    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const allLinks = document.querySelectorAll(".links a");

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

function handleActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  event.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

// Reset Button

document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  window.location.reload();
};

// Toggle Menu

let toggleButton = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");

toggleButton.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  links.classList.toggle("open");
};

// Click Anywhere Outside Menu And Toggle Button

document.addEventListener("click", (e) => {
  if (e.target !== toggleButton && e.target !== links) {
    toggleButton.classList.remove("menu-active");
    links.classList.remove("open");
  }
});

links.onclick = function (e) {
  e.stopPropagation();
};
