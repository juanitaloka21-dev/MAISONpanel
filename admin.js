window.onload = () => {
  const pedidosGuardados = JSON.parse(localStorage.getItem("pedidosMaison")) || [];
  const tbody = document.querySelector("#tabla-pedidos tbody");
  pedidosGuardados.forEach((p, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `<td>${i + 1}</td><td>${p.nombre}</td><td>$${p.precio.toFixed(2)}</td><td>${p.hora}</td>`;
    tbody.appendChild(fila);
  });
};
