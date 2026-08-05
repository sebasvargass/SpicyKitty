function login() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;
    const error = document.getElementById("error");

    if (user === "admin" && pass === "1234") {
        window.location.href = "admin.html";
        return;
    }

    if (user === "karen" && pass === "hermosa") {
        window.location.href = "index.html";
        return;
    }

    error.textContent = "Usuario o contraseña incorrectos 💔🐱";
}
