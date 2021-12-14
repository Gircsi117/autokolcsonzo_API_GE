var db = 0;

async function db_szam(params) {
    const id = JSON.parse(sessionStorage.getItem("login")).id;
    const response = await fetch(`http://localhost:3000/autoszam/${id}`);

    const data = await response.json()

    if (response.status == 200) {
        db = data.data
        //autok_leker(0)
    }
    else{
        if (data.data == "logout") {
            alert("Logolj ki te mocskos állat!!!");
        }
    }
}
db_szam();

async function autok_leker(tol) {
    if (tol >= 0 && tol < db) {
        const id = JSON.parse(sessionStorage.getItem("login")).id;
        const response = await fetch(`http://localhost:3000/autok/${id}`);
    }
}

//Autók lekérése
async function autoker(irany) {
    
}