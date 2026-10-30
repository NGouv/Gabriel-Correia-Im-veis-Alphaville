const properties = [
  {
    type: "Casa em condomínio",
    location: "Alphaville Residencial",
    bedrooms: 4,
    suites: 4,
    parking: 4,
    area: 420,
    price: "R$ 4.800.000",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=82",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1500&q=85",
    ],
  },
  {
    type: "Apartamento",
    location: "Tamboré",
    bedrooms: 3,
    suites: 3,
    parking: 3,
    area: 210,
    price: "R$ 2.650.000",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=82",
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1500&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=85",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1500&q=85",
    ],
  },
  {
    type: "Casa contemporânea",
    location: "Santana de Parnaíba",
    bedrooms: 5,
    suites: 5,
    parking: 6,
    area: 680,
    price: "R$ 7.900.000",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=82",
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1500&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=85",
    ],
  },
];

const whatsappNumber = "5511997708099";
const propertyGrid = document.querySelector("#property-grid");
const propertyDialog = document.querySelector(".property-dialog");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const header = document.querySelector(".site-header");
let activeProperty = null;
let activeImageIndex = 0;
let lastFocusedElement = null;

function whatsappLink(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function propertyMessage(property) {
  return `Olá, Gabriel! Gostaria de saber mais sobre a ${property.type.toLowerCase()} em ${property.location} apresentada no seu site.`;
}

function renderProperties() {
  propertyGrid.innerHTML = properties
    .map(
      (property, index) => `
        <article class="property-card">
          <div class="property-image-wrap">
            <img class="property-image" src="${property.image}" alt="${property.type} demonstrativa" loading="lazy" />
            <span class="illustrative-badge">Exemplo ilustrativo</span>
          </div>
          <div class="property-body">
            <p class="property-type">${property.type}</p>
            <h3 class="property-title">${property.location}</h3>
            <div class="property-specs" aria-label="Características do imóvel">
              <span>${property.bedrooms} quartos</span>
              <span>${property.suites} suítes</span>
              <span>${property.parking} vagas</span>
              <span>${property.area} m²</span>
            </div>
            <div class="property-divider"></div>
            <p class="property-price-label">Valor demonstrativo</p>
            <p class="property-price">${property.price}</p>
            <div class="property-actions">
              <button class="button button-quiet" type="button" data-details="${index}">Ver detalhes</button>
              <a class="button button-dark" href="${whatsappLink(propertyMessage(property))}" target="_blank" rel="noopener noreferrer">
                Tenho interesse <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function updateGallery() {
  const image = propertyDialog.querySelector(".dialog-image");
  image.src = activeProperty.images[activeImageIndex];
  image.alt = `${activeProperty.type} demonstrativa, imagem ${activeImageIndex + 1}`;
  propertyDialog.querySelector(".gallery-count").textContent =
    `${activeImageIndex + 1} / ${activeProperty.images.length}`;
}

function openProperty(index, trigger) {
  activeProperty = properties[index];
  activeImageIndex = 0;
  lastFocusedElement = trigger;

  propertyDialog.querySelector(".dialog-type").textContent = activeProperty.type;
  propertyDialog.querySelector("#dialog-title").textContent = activeProperty.location;
  propertyDialog.querySelector(".dialog-location").textContent =
    `Localização: ${activeProperty.location}`;
  propertyDialog.querySelector(".dialog-price").textContent = activeProperty.price;
  propertyDialog.querySelector(".dialog-specs").innerHTML = `
    <span>${activeProperty.bedrooms} quartos</span>
    <span>${activeProperty.suites} suítes</span>
    <span>${activeProperty.parking} vagas</span>
    <span>${activeProperty.area} m²</span>
  `;
  propertyDialog.querySelector(".dialog-contact").href = whatsappLink(propertyMessage(activeProperty));
  updateGallery();
  propertyDialog.showModal();
  document.body.classList.add("dialog-open");
  propertyDialog.querySelector(".dialog-close").focus();
}

function closeProperty() {
  propertyDialog.close();
}

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  siteNav.classList.toggle("is-open", isOpen);
}

renderProperties();
document.querySelector("#current-year").textContent = new Date().getFullYear();

propertyGrid.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-details]");
  if (trigger) openProperty(Number(trigger.dataset.details), trigger);
});

propertyDialog.querySelector(".dialog-close").addEventListener("click", closeProperty);
propertyDialog.querySelector(".gallery-prev").addEventListener("click", () => {
  activeImageIndex = (activeImageIndex - 1 + activeProperty.images.length) % activeProperty.images.length;
  updateGallery();
});
propertyDialog.querySelector(".gallery-next").addEventListener("click", () => {
  activeImageIndex = (activeImageIndex + 1) % activeProperty.images.length;
  updateGallery();
});

propertyDialog.addEventListener("click", (event) => {
  if (event.target === propertyDialog) closeProperty();
});
propertyDialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  lastFocusedElement?.focus();
});

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});
siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && siteNav.classList.contains("is-open")) setMenuOpen(false);
});

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
