// ===============================
// ✅ PANEL ADMINISTRATIVO MAISON
// ===============================

// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA9-npAmAqzL2ln9e0mYPbM1NoGm8V7qUk",
  authDomain: "maison-f4dc1.firebaseapp.com",
  databaseURL: "https://maison-f4dc1-default-rtdb.firebaseio.com/",
  projectId: "maison-f4dc1",
  storageBucket: "maison-f4dc1.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Referencia al tbody
const tbody = document.querySelector("#tabla-pedidos tbody");

// Escuchar los cambios en tiempo real
onValue(ref(db, "pedidos/"), (snapshot) => {
  const data = snapshot.val();
  tbody.innerHTML = "";

  if (!data) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">📭 No hay pedidos todavía</td></tr>`;
    return;
  }

  // Convertir los pedidos en un array y ordenarlos por hora
  const pedidosArray = Object.values(data).sort((a, b) => new Date(a.hora) - new Date(b.hora));

  let index = 1;
  pedidosArray.forEach((pedido) => {
    const productos = pedido.items.map(i => i.producto).join(", ");
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${index++}</td>
      <td>${pedido.mesa || "—"}</td>
      <td>${productos}</td>
      <td>$${pedido.total.toFixed(2)}</td>
      <td>${pedido.hora}</td>
    `;
    tbody.appendChild(fila);
  });
});
