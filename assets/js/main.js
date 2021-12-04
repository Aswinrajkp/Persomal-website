/**
 * Template Name: MyResume - v4.6.0
 * Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let body = select("body");
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Hero type effect
   */
  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Initiate portfolio details lightbox
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: ".portfolio-details-lightbox",
    width: "90%",
    height: "90vh",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();

// var one=0,two=0,three=0

// function Per(){
//   var username = $('#name').val()
//   var pattern=/^[a-zA-Z-()]+(\s+[-a-zA-Z- ()]+)*$/

//   if(username==""){
//    $('#peer').html("Enter The Name");
//       one=0
//       return false
//       }else if(username.match(pattern)){
//         one=1

//    $('#peer').html("");
//      return true

//   }

//  }
//  function mal(){
//   var email = $('#email').val()
//   var pattern=/^[^]+@[^]+\.[a-z]{2,3}$/
//   if(email==""){
//    $('#maal').html("Enter Valid Email");
//    two=0
//      return false

//   }else if(email.match(pattern)){
//    $('#maal').html("");
//    two=1
//      return true
//   }else{
//    $('#maal').html("Enter Correct Email");
//     two=1
//      return false

//   }

//  }
//  function mob(){
//   var mobile = $('#mobile').val()
//   var pattern=/^\d*(?:\.\d{1,2})?$/
//   if(mobile==""){
//    $('#mobb').html("Enter Valid number");
//    three=0
//      return false
//   }else if(mobile.length<10){
//     $('#mobb').html("Enter 10 digit number");
//     three=0
//     return false
//   }
//   else if(mobile.match(pattern)){
//     three=1
//    $('#mobb').html("");
//      return true
//   }
//   // else{
//   //  $('#mobb').html("Enter Correct number");
//   //  three=0
//   //    return false

//   // }
//  }

// function submitFun(){
//    if(document.getElementById('email').value !=''){
//       return true
//     }else{
//     alert("somthign wrong")
//      return false
//     }
// }

$("#submit-form").submit((e) => {
  e.preventDefault();
   
  count = 0
  Name()
  Email()
  Num()
  Subject()
  Messege()
  if (count == 5) {
    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbxGHve1eW4_Kq1Y6_3KfyLB2xyuveWTqMeU-fjz-3I0kWaK92V8R6CroICCh43lqlQg/exec",
      data: $("#submit-form").serialize(),
      method: "post",
      success: function (response) {
        alert("Form submitted successfully");
        window.location.reload();
      },
      error: function (err) {
        alert("Something Error");
      },
    });
  }
});

var username = document.getElementById("name");
var peer = document.getElementById("peer");
var maal = document.getElementById("maal")
var email = document.getElementById("email");
var number = document.getElementById("mobile");
var mobb = document.getElementById('mobb')
var subject = document.getElementById('subject')
var sub = document.getElementById("sub")
var mes = document.getElementById("mes")
var messege = document.getElementById("MESSEGE")
var nameReg = /^[a-zA-Z\s]*$/;
var emailReg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
var numberReg = /^\d+$/;
var count = 0

function Name() {
  if (username.value == "") {
    peer.innerHTML = "fill  this field";
  }else if(username.value.trim() == ""){
    peer.innerHTML = "space not allowded"
  }else if(nameReg.test(username.value) == false){
    peer.innerHTML = "only characters are allowded"
  }else{
    peer.innerHTML = ""
    count += 1
  }
}
function Email() {
  if (email.value == "") {
    maal.innerHTML = "fill  this field";
  } else if(email.value.trim() == ""){
    maal.innerHTML = "space not allowded";
  }
  else if (emailReg.test(email.value) == false) {
    maal.innerHTML = "enter correct email";
  } else {
       maal.innerHTML = "";
       count += 1;
  }
}
function Num() {
  if (number.value == "") {
    mobb.innerHTML = "fill  this field";
  }else if (number.value.trim() == ""){
    mobb.innerHTML = "space not allowded"
  }else if (numberReg.test(number.value) == false) {
    mobb.innerHTML = "enter valkid number";
  } else if (number.value.trim().length > 10) {
    mobb.innerHTML = "maximun length is 10";
  } else if (number.value.trim().length < 10) {
    mobb.innerHTML = "min legth is 10 digit";
  } else {
    mobb.innerHTML = "";
    count += 1
  }
}

function Subject() {
  if (subject.value == "") {
    sub.innerHTML = "fill this feild";
  } else if (subject.value.trim() == ""){
    sub.innerHTML = 'space not allowded'
  }else {
       sub.innerHTML = "";
       count += 1
  }
}

function Messege() {
  if (messege.value == "") {
       mes.innerHTML = "fill this field"
  }else if(messege.value.trim() == ""){
    mes.innerHTML = "space not allowded"
  }
   else {
       mes.innerHTML = "";
       count += 1
  }
}
  

