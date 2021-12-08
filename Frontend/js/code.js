let bente

//sessionStorage.setItem("login", true)
//sessionStorage.removeItem("login")

try {
    bente = sessionStorage.getItem("login")
    if (bente == null) {
        bente = false;
    }
}
catch (error) {
    console.log(error);
}

console.log(bente, "igen");

if (!bente && !String(document.location.href).includes("login")) {
    console.log("Alma");
    document.location.href = "./login.html"
}

//Login
document.getElementById("loginForm").onsubmit = async (event)=>{
    event.preventDefault();
    
    const body = {
        "email": document.getElementById("email").value,
        "pass": document.getElementById("password").value
    }
    console.log(body);

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    
    if (response.status == 200) {
        const data = await response.json();

        if (data.message) {
            console.log("Sikeres");
            sessionStorage.setItem("login", true)
            document.location.href = "./home.html"
        }
        else{
            console.log("Sikertelen");
            document.getElementById("errorMSG").innerHTML = "Hibás felhasználói adatok!"
        }

    }
}

//logout
function log_out(params) {
    sessionStorage.removeItem("login")
    document.location.href = "./login.html";
}