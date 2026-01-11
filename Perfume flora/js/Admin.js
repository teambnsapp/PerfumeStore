import { db } from "./firebase.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===== AUTH =====
const auth = getAuth();
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.onclick = async () => {
  await signOut(auth);
  window.location.href = "login.html";
};

onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "login.html";
  }
});

// ===== ELEMENTS =====
const form = document.getElementById("productForm");
const productList = document.getElementById("productList");

// ===== LOAD PRODUCTS =====
async function loadProducts() {
  productList.innerHTML = "";

  const snapshot = await getDocs(collection(db, "products"));

  snapshot.forEach(d => {
    const p = d.data();

    productList.innerHTML += `
      <div>
        <strong>${p.name}</strong> - $${p.price} (${p.type || "no type"})
        <button data-id="${d.id}">Delete</button>
      </div>
    `;
  });

  // DELETE HANDLER
  document.querySelectorAll("button[data-id]").forEach(btn => {
    btn.onclick = async () => {
      await deleteDoc(doc(db, "products", btn.dataset.id));
      loadProducts();
    };
  });
}

// ===== ADD PRODUCT =====
form.onsubmit = async (e) => {
  e.preventDefault();

  // SELECT INPUTS
  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const imageInput = document.getElementById("image");
  const typeInput = document.getElementById("type");

  console.log("Adding product:", nameInput.value, priceInput.value, imageInput.value, typeInput.value);

  // ADD TO FIRESTORE with type AND default quantity
  await addDoc(collection(db, "products"), {
    name: nameInput.value,
    price: Number(priceInput.value),
    image: imageInput.value,
    type: typeInput.value,
    defaultQuantity: 1  // <-- NEW FIELD ADDED
  });

  form.reset();
  loadProducts();
};

// Initial load
loadProducts();
