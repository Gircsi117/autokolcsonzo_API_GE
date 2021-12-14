var db = 0;
var autok;

async function db_szam(params) {
    const id = JSON.parse(sessionStorage.getItem("login")).id;
    const response = await fetch(`http://localhost:3000/autoszam/${id}`);

    const data = await response.json()

    if (response.status == 200) {
        db = data.data
        autok_leker(0)
    }
    else{
        if (data.data == "logout") {
            alert("Logolj ki te mocskos állat!!!");
        }
    }
}
db_szam();

async function autok_leker(tol) {
    if (tol >= 0 && tol < Math.ceil(db / 5)) {
        const id = JSON.parse(sessionStorage.getItem("login")).id;
        const response = await fetch(`http://localhost:3000/autok/${id}?tol=${tol}`);

        const data = await response.json();

        if (response.status == 200) {
            
            autok = data.data

            document.getElementById("previousBTN").innerHTML = `<p class="page-link" onclick="autok_leker(${tol-1})">Previous (${tol})</p>`
            document.getElementById("nextBTN").innerHTML = `<p class="page-link" onclick="autok_leker(${tol+1})">Next (${tol+2})</p>`

            var html = `<div class="table-head row d-none d-md-flex">
                <div class="col-3">ID</div>
                <div class="col-3">Gyartó</div>
                <div class="col-3">Típus</div>
                <div class="col-3">Select</div>
                </div>`;

            data.data.forEach(auto => {
                html += `<div class="row table-item">
                <div class="col-6 d-flex d-md-none">ID</div>
                <div class="col-6 col-md-3">${auto.id}</div>
                <div class="col-6 d-flex d-md-none">Gyarto</div>
                <div class="col-6 col-md-3 ">${auto.gyarto}</div>
                <div class="col-6 d-flex d-md-none">Tipus</div>
                <div class="col-6 col-md-3">${auto.tipus}</div>
                <div class="text-center col-12 col-md-3">Kiválaszt</div>
                </div>`
            });

            $("#autok").html(html);
        }
    }
}

//Autók lekérése
async function autoker(irany) {
    
}