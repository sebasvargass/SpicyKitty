let cajaAbierta = false;
let montoInicial = 0;


let ventasDia = JSON.parse(localStorage.getItem("ventasDia")) || 0;
let pedidosDia = JSON.parse(localStorage.getItem("pedidosDia")) || 0;
let historial = JSON.parse(localStorage.getItem("historial")) || [];
let ventasTotales = JSON.parse(localStorage.getItem("ventasTotales")) || ventasDia;

let efectivo = ventasDia;
let nequi = 0;
let daviplata = 0;
let transferencia = 0;


function actualizarDashboard() {
    document.getElementById("estado").textContent = cajaAbierta ? "Caja Abierta" : "Caja Cerrada";
    document.getElementById("montoInicial").textContent = `$${montoInicial}`;
    document.getElementById("ventasDia").textContent = `$${ventasDia}`;
    document.getElementById("pedidosDia").textContent = pedidosDia;
    document.getElementById("efectivo").textContent = `$${efectivo}`;
    document.getElementById("nequi").textContent = `$${nequi}`;
    document.getElementById("daviplata").textContent = `$${daviplata}`;
    document.getElementById("transferencia").textContent = `$${transferencia}`;
    document.getElementById("ventasTotales").textContent = `$${ventasTotales}`;

    const resultado = ventasTotales - 220700;
    document.getElementById("resultado").textContent = `$${resultado}`;
}


function abrirCaja() {
    montoInicial = Number(prompt("Monto inicial de la caja:"));
    cajaAbierta = true;
    actualizarDashboard();
}


function cerrarCaja() {
    cajaAbierta = false;
    actualizarDashboard();
}


function actualizarHistorial() {
    const lista = document.getElementById("historial");
    lista.innerHTML = "";

    historial.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        lista.appendChild(li);
    });
}


function mostrarPedidos() {
    const contenedor = document.getElementById("listaPedidos");
    contenedor.innerHTML = "";

    let pedidos = JSON.parse(localStorage.getItem("pedidosLista")) || [];

    if (pedidos.length === 0) {
        contenedor.innerHTML = "<p>No hay pedidos registrados aún 🐱💗</p>";
        return;
    }

    pedidos.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("pedido-card");

        div.innerHTML = `
            <h3>Pedido #${p.id}</h3>
            <p><strong>Cliente:</strong> ${p.usuario}</p>
            <p><strong>Total:</strong> $${p.total}</p>
            <p><strong>Método de pago:</strong> ${p.metodoPago}</p>
            <p><strong>Estado:</strong> ${p.estado}</p>
            <p><strong>Fecha:</strong> ${p.fecha}</p>
            <p><strong>Hora:</strong> ${p.hora}</p>

            <h4>Productos:</h4>
            <ul>
                ${p.productos.map(prod => `<li>${prod.name} - $${prod.price}</li>`).join("")}
            </ul>

            <button class="btn entregar" onclick="marcarEntregado(${p.id})">Marcar como entregado</button>
        `;

        contenedor.appendChild(div);
    });
}

function marcarEntregado(id) {
    let pedidos = JSON.parse(localStorage.getItem("pedidosLista")) || [];

    pedidos = pedidos.map(p => {
        if (p.id === id) {
            p.estado = "Entregado";
        }
        return p;
    });

    localStorage.setItem("pedidosLista", JSON.stringify(pedidos));

    mostrarPedidos();
}

actualizarDashboard();
actualizarHistorial();
mostrarPedidos();
