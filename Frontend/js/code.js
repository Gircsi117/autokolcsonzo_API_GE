let bente

sessionStorage.setItem("login", true)
sessionStorage.removeItem("login")

try {
    bente = sessionStorage.getItem("login")
    if (bente == null) {
        bente = false;
    }
}
catch (error) {
    console.log(error);
}

console.log(bente);

if (!bente && !String(document.location.href).includes("login")) {
    console.log("alma");
    document.location.href = "./login.html"
}