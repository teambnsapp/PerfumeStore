// Cart JS - no images, compact layout

const cartContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

// Load cart from localStorage
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    // Compact layout: Name | Quantity controls | Total price
    itemDiv.innerHTML = `
      <div class="cart-item-info">
        <span class="cart-item-name">${item.name}</span>
        <div class="quantity-container">
          <button class="qty-btn minus">-</button>
          <input type="number" value="${item.quantity}" readonly>
          <button class="qty-btn plus">+</button>
        </div>
        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
        <button class="remove-btn">Remove</button>
      </div>
    `;

    cartContainer.appendChild(itemDiv);

    total += item.price * item.quantity;

    // Quantity buttons
    const minusBtn = itemDiv.querySelector(".qty-btn.minus");
    const plusBtn = itemDiv.querySelector(".qty-btn.plus");
    const input = itemDiv.querySelector("input");
    const priceSpan = itemDiv.querySelector(".cart-item-price");

    minusBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        input.value = item.quantity;
        priceSpan.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
        updateCart(cart);
      }
    });

    plusBtn.addEventListener("click", () => {
      item.quantity++;
      input.value = item.quantity;
      priceSpan.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
      updateCart(cart);
    });

    // Remove button
    const removeBtn = itemDiv.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
      const index = cart.findIndex(c => c.id === item.id);
      if (index !== -1) {
        cart.splice(index, 1);
        updateCart(cart);
      }
    });
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Update cart in localStorage
function updateCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart(); // Reload cart to update UI
}
const checkoutBtn = document.getElementById("checkoutBtn");
const toast = document.getElementById("toast");

// Show in-page toast
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

checkoutBtn.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }

  let message = "Hello! I want to order:\n";
  let total = 0;

  cart.forEach(item => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;
    message += `- ${item.name} x${item.quantity} = $${lineTotal.toFixed(2)}\n`;
  });

  message += `Total: $${total.toFixed(2)}`;

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);

  // WhatsApp phone number (replace with your number, include country code without +)
  const phoneNumber = "+96176757868";

  // Open WhatsApp
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
});

// Initial load
loadCart();
