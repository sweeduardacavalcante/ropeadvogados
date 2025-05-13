// ========== SLIDER DE VÍDEO ==========
const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".video-slide");
const contents = document.querySelectorAll(".content");

let currentSlide = 0;

const sliderNav = function (manual) {
  btns.forEach((btn) => btn.classList.remove("active"));
  slides.forEach((slide) => slide.classList.remove("active"));
  contents.forEach((content) => content.classList.remove("active"));

  btns[manual].classList.add("active");
  slides[manual].classList.add("active");
  contents[manual].classList.add("active");

  currentSlide = manual; // salva qual slide está ativo
};

// Eventos para troca manual via botões
btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    sliderNav(i);
  });
});

// Troca automática de slides a cada 7 segundos
setInterval(() => {
  let nextSlide = (currentSlide + 1) % btns.length;
  sliderNav(nextSlide);
}, 7000);

// ========== MENU RESPONSIVO ==========
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navigation.classList.toggle("active");
});

// ========== MENU MOBILE ==========
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const navMenu = document.getElementById("nav-menu");

if (mobileMenuBtn && navMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    mobileMenuBtn.innerHTML = navMenu.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });
}

document.querySelectorAll(".navigation a[href^='#']").forEach((link) => {
  link.addEventListener("click", () => {
    const menuBtn = document.querySelector(".menu-btn");
    const navigation = document.querySelector(".navigation");

    menuBtn.classList.remove("active");
    navigation.classList.remove("active");

    if (mobileMenuBtn) {
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});

// ========== EFEITO SCROLL NO HEADER + BOTÃO TOPO ==========
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  const backToTop = document.getElementById("back-to-top");

  if (window.scrollY > 50) {
    header?.classList.add("scrolled");
  } else {
    header?.classList.remove("scrolled");
  }

  if (window.scrollY > 300) {
    backToTop?.classList.add("active");
  } else {
    backToTop?.classList.remove("active");
  }
});

// ========== BOTÃO "VOLTAR AO TOPO" ==========
const backToTop = document.getElementById("back-to-top");

backToTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ========== HERO BUTTON (CASO AINDA USE) ==========
const heroScroll = document.getElementById("hero-scroll");

heroScroll?.addEventListener("click", () => {
  const about = document.getElementById("about");
  if (about) {
    window.scrollTo({
      top: about.offsetTop - 80,
      behavior: "smooth",
    });
  }
});

// ========== ANIMAÇÃO SCROLL (FADE IN) ==========
const fadeElements = document.querySelectorAll(".fade-in");

const checkScroll = () => {
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add("visible");
    }
  });
};

// Checar na carga inicial e no scroll
checkScroll();
window.addEventListener("scroll", checkScroll);

// ========== TESTEMUNHOS (SLICK) ==========
$(document).ready(function () {
  $(".testimonials-container").slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: true,
    pauseOnHover: true,
  });
});

// ========== FAQ INTERATIVO ==========
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    // Fecha os outros
    faqItems.forEach((other) => {
      if (other !== item && other.classList.contains("active")) {
        other.classList.remove("active");
      }
    });

    item.classList.toggle("active");
  });
});

// ========== INTERAÇÃO COM O MAPA ==========
document.addEventListener("DOMContentLoaded", function () {
  const mapPoints = document.querySelectorAll(".map-point");
  const caseDetails = document.querySelectorAll(".map-details");

  caseDetails.forEach((detail) => detail.classList.remove("active"));

  mapPoints.forEach((point, index) => {
    point.addEventListener("click", function () {
      const correspondingDetail = caseDetails[index];
      const isActive = correspondingDetail.classList.contains("active");

      caseDetails.forEach((d) => d.classList.remove("active"));
      mapPoints.forEach((p) => p.classList.remove("active"));

      if (!isActive) {
        this.classList.add("active");
        correspondingDetail.classList.add("active");
      }
    });
  });
});

// ========== FORMULÁRIO DE CONTATO ==========
const contactForm = document.getElementById("contact-form");

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  contactForm.innerHTML = `
    <div style="text-align: center; padding: 2rem;">
      <i class="fas fa-check-circle" style="font-size: 3rem; color: #00ff9d; margin-bottom: 1rem;"></i>
      <h3 style="color: #1a2a3a; margin-bottom: 1rem;">Mensagem Enviada!</h3>
      <p style="color: #555;">Nossa equipe entrará em contato em até 24 horas úteis.</p>
    </div>
  `;
});

// FORMULÁRIO POR WHATSAPP
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("whatsapp-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("phone").value.trim();
    const assunto = document.getElementById("subject").value;
    const mensagem = document.getElementById("message").value.trim();

    if (!nome || !email || !telefone || !assunto || !mensagem) {
      alert("Por favor, preencha todos os campos antes de enviar.");
      return;
    }

    const numeroWhatsApp = "5561981627655"; // seu número com DDI + DDD

    const texto = `Olá, gostaria de entrar em contato!
*Nome:* ${nome}
*E-mail:* ${email}
*Telefone:* ${telefone}
*Assunto:* ${assunto}
*Mensagem:* ${mensagem}`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
      texto
    )}`;

    // Abre o WhatsApp
    window.open(url, "_blank");

    // Alerta de sucesso
    alert("Sua mensagem foi preparada e será enviada pelo WhatsApp! 😊");

    // Reseta o formulário
    form.reset();
  });
});
