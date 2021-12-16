var db = 0;
var autok;
var selected;


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
            log_out();
        }
    }
}
db_szam();

//Autók lekérése
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
            <div class="col-3">Km óra</div>
            <div class="col-3">Gyartó</div>
            <div class="col-3">Típus</div>
            <div class="col-3">Select</div>
            </div>`;

            let k = 0;

            data.data.forEach(auto => {
                html += `<div class="row table-item">
                <div class="col-6 d-flex d-md-none">Km óra</div>
                <div class="col-6 col-md-3">${auto.km_ora}</div>
                <div class="col-6 d-flex d-md-none">Gyarto</div>
                <div class="col-6 col-md-3 ">${auto.gyarto}</div>
                <div class="col-6 d-flex d-md-none">Tipus</div>
                <div class="col-6 col-md-3">${auto.tipus}</div>
                <div class="text-center col-12 col-md-3" onclick="kivalaszt(${k})">Kiválaszt</div>
                </div>`;
                k++
            });

            $("#autok").html(html);
        }
    }
}

function kivalaszt(szam) {
    selected = autok[szam]
    var html = `<table>
        <tr>
            <td>Km óra</td>
            <td>${selected.km_ora} km</td>
        </tr>
        <tr>
            <td>Szervíz díj</td>
            <td>${selected.szerviz_dij} Ft</td>
        </tr>
        <tr>
            <td>Napi díj</td>
            <td>${selected.napi_dij} Ft</td>
        </tr>
        <tr>
            <td>Km díj</td>
            <td>${selected.km_dij} Ft</td>
        </tr>
        <tr>
            <td>Szervíz</td>
            <td>${selected.szerviz_km} Km</td>
        </tr>
    </table>`;

    $("#kivalasztTABLA").html(html)
}