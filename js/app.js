let cart = [];

function showDescription(name, img, desc) {
    document.getElementById("modal-title").textContent = name;
    document.getElementById("modal-product-img").src = img;
    document.getElementById("modal-desc").textContent = desc;

    document.getElementById("product-modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("product-modal").classList.add("hidden");
}

function addToCart(name, price, img) {
    cart.push({ name, price, img });
    updateCart();
    document.getElementById("cart-panel").classList.remove("hidden");
}

function updateCart() {
    const container = document.getElementById("cart-items");
    const total = document.getElementById("total");

    container.innerHTML = "";
    let sum = 0;

    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <img src="${item.img}">
            <div>
                <p>${item.name}</p>
                <p><strong>$${item.price}</strong></p>
            </div>
        `;

        container.appendChild(div);
        sum += item.price;
    });

    total.textContent = `Total: $${sum}`;
}

function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("hidden");
}

function order() {
    let totalVenta = 0;
    cart.forEach(item => totalVenta += item.price);

    const pedido = {
        id: Date.now(),
        usuario: "Cliente Spicy Kitty",
        productos: cart,
        total: totalVenta,
        metodoPago: "Efectivo",
        estado: "Pendiente",
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString()
    };

    let pedidos = JSON.parse(localStorage.getItem("pedidosLista")) || [];
    pedidos.push(pedido);
    localStorage.setItem("pedidosLista", JSON.stringify(pedidos));

    let ventas = JSON.parse(localStorage.getItem("ventasDia")) || 0;
    let pedidosDia = JSON.parse(localStorage.getItem("pedidosDia")) || 0;

    ventas += totalVenta;
    pedidosDia += 1;

    localStorage.setItem("ventasDia", JSON.stringify(ventas));
    localStorage.setItem("pedidosDia", JSON.stringify(pedidosDia));

    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.push(`Venta realizada: +$${totalVenta}`);
    localStorage.setItem("historial", JSON.stringify(historial));

    let ventasTotales = JSON.parse(localStorage.getItem("ventasTotales")) || 0;
    ventasTotales += totalVenta;
    localStorage.setItem("ventasTotales", JSON.stringify(ventasTotales));

    const instagramURL = "https://www.instagram.com/sspicy_kittyy?igsh=MXJhbmxnZXhvc2F6bw==";
    window.open(instagramURL, "_blank");

    cart = [];
    updateCart();
}
