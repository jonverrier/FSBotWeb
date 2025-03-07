(() => {
  // src/main.js
  (function() {
    "use strict";
    const select = (el, all = false) => {
      el = el.trim();
      if (all) {
        return [...document.querySelectorAll(el)];
      } else {
        return document.querySelector(el);
      }
    };
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
    const onscroll = (el, listener) => {
      el.addEventListener("scroll", listener);
    };
    let navbarlinks = select("#navbar .scrollto", true);
    const navbarlinksActive = () => {
      let position = window.scrollY + 200;
      navbarlinks.forEach((navbarlink) => {
        if (!navbarlink.hash) return;
        let section = select(navbarlink.hash);
        if (!section) return;
        if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
          navbarlink.classList.add("active");
        } else {
          navbarlink.classList.remove("active");
        }
      });
    };
    window.addEventListener("load", navbarlinksActive);
    onscroll(document, navbarlinksActive);
    const scrollto = (el) => {
      let header = select("#header");
      let offset = header.offsetHeight;
      if (!header.classList.contains("header-scrolled")) {
        offset -= 20;
      }
      let elementPos = select(el).offsetTop;
      window.scrollTo({
        top: elementPos - offset,
        behavior: "smooth"
      });
    };
    let selectHeader = select("#header");
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add("header-scrolled");
        } else {
          selectHeader.classList.remove("header-scrolled");
        }
      };
      window.addEventListener("load", headerScrolled);
      onscroll(document, headerScrolled);
    }
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
    on("click", ".mobile-nav-toggle", function(e) {
      select("#navbar").classList.toggle("navbar-mobile");
      this.classList.toggle("bi-list");
      this.classList.toggle("bi-x");
    });
    on("click", ".navbar .dropdown > a", function(e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    }, true);
    on("click", ".scrollto", function(e) {
      if (select(this.hash)) {
        e.preventDefault();
        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    }, true);
    window.addEventListener("load", () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash);
        }
      }
    });
    window.addEventListener("load", () => {
      let portfolioContainer = select(".portfolio-container");
      if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: ".portfolio-item",
          layoutMode: "fitRows"
        });
        let portfolioFilters = select("#portfolio-flters li", true);
        on("click", "#portfolio-flters li", function(e) {
          e.preventDefault();
          portfolioFilters.forEach(function(el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");
          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter")
          });
          portfolioIsotope.on("arrangeComplete", function() {
            AOS.refresh();
          });
        }, true);
      }
    });
    const portfolioLightbox = GLightbox({
      selector: ".portfolio-lightbox"
    });
    new Swiper(".portfolio-details-slider", {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5e3,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      }
    });
    window.addEventListener("load", () => {
      AOS.init({
        duration: 1e3,
        easing: "ease-in-out",
        once: true,
        mirror: false
      });
    });
    let forms = document.querySelectorAll(".email-form");
    forms.forEach(function(e) {
      e.addEventListener("submit", function(event) {
        event.preventDefault();
        let thisForm = this;
        let action = thisForm.getAttribute("action");
        if (!action) {
          displayError(thisForm, "The form action property is not set!");
          return;
        }
        thisForm.querySelector(".loading").classList.add("d-block");
        thisForm.querySelector(".error-message").classList.remove("d-block");
        thisForm.querySelector(".sent-message").classList.remove("d-block");
        let formData = new FormData(thisForm);
        if (typeof grecaptcha !== "undefined") {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute("6LfwYuobAAAAANkidB1EbtFgZIs1M-nIF19CX5hh", { action: "email_form_submit" }).then((token) => {
                formData.set("recaptchaToken", token);
                email_form_submit(thisForm, action, formData);
              });
            } catch (error) {
              displayError(thisForm, error);
            }
          });
        } else {
          email_form_submit(thisForm, action, formData);
        }
      });
    });
    function email_form_submit(thisForm, action, formData) {
      fetch(action, {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData.entries())),
        headers: { "Content-Type": "application/json" }
      }).then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error(`${response.status} ${response.statusText} ${response.url}`);
        }
      }).then((data) => {
        thisForm.querySelector(".loading").classList.remove("d-block");
        if (data.trim() == "OK") {
          thisForm.querySelector(".sent-message").classList.add("d-block");
          thisForm.reset();
        } else {
          throw new Error(data ? data : "Sorry, something went wrong. Please try again in a few minutes.");
        }
      }).catch((error) => {
        displayError(thisForm, error);
      });
    }
    function displayError(thisForm, error) {
      thisForm.querySelector(".loading").classList.remove("d-block");
      thisForm.querySelector(".error-message").innerHTML = error;
      thisForm.querySelector(".error-message").classList.add("d-block");
    }
  })();
})();
/*! Copyright TXPCo, 2020, 2021 */
