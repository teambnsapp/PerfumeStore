import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

console.log("Store JS loaded");

// Containers for each type
const containers = {
  men: document.getElementById("products-men"),
  woman: document.getElementById("products-woman"),
  unisex: document.getElementById("products-unisex")
};

let allProducts = [];
// Show a toast message
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  // Remove after 2 seconds
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// Load products from Firestore
async function loadProducts() {
  const snapshot = await getDocs(collection(db, "products"));
  allProducts = [];

  // Clear containers first
  Object.values(containers).forEach(c => c.innerHTML = "");

  snapshot.forEach(doc => {
    const p = doc.data();
    p.id = doc.id;
    allProducts.push(p);

    if (containers[p.type]) {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>

        <div class="quantity-container">
          <button class="qty-btn minus">-</button>
          <input type="number" min="1" value="${p.defaultQuantity || 1}" readonly>
          <button class="qty-btn plus">+</button>
        </div>

        <button class="add-to-cart-btn">Add to Cart</button>
      `;

      containers[p.type].appendChild(card);

      // Quantity logic (local only, does NOT reload products)
      const minusBtn = card.querySelector(".qty-btn.minus");
      const plusBtn = card.querySelector(".qty-btn.plus");
      const input = card.querySelector("input");

      minusBtn.addEventListener("click", () => {
        let val = parseInt(input.value);
        if (val > 1) input.value = val - 1;
      });

      plusBtn.addEventListener("click", () => {
        let val = parseInt(input.value);
        input.value = val + 1;
      });

      // Add to cart
      const addToCartBtn = card.querySelector(".add-to-cart-btn");
      addToCartBtn.addEventListener("click", () => {
        const quantity = parseInt(input.value);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingIndex = cart.findIndex(item => item.id === p.id);
        if (existingIndex !== -1) {
          cart[existingIndex].quantity += quantity;
        } else {
          cart.push({
            id: p.id,
            name: p.name,
            price: p.price,
            quantity: quantity,
            image: p.image,
            type: p.type
          });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        showToast(`Added ${quantity} of ${p.name} to cart`);

      });
    }
  });
}

// Initial load
loadProducts();
