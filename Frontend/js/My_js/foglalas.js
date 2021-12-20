var szabad_db = 0;
var foglal_db = 0;
var autok;
var foglaltak;
var selected;
var foglalt_selected;
var datum;
var napok;

async function db_szam(params) {
    const id = JSON.parse(sessionStorage.getItem("login")).id;
    const response = await fetch(`http://localhost:3000/autoszam/${id}`);

    const data = await response.json()

    if (response.status == 200) {
        szabad_db= data.data
        autok_leker(0)
    }
    else{
        if (data.data == "logout") {
            log_out();
        }
    }

    const response2 = await fetch(`http://localhost:3000/foglalszam/${id}`);

    const data2 = await response2.json()

    if (response2.status == 200) {
        foglal_db= data2.data
        fizetendo_leker(0);
    }
    else{
        if (data2.data == "logout") {
            log_out();
        }
    }

}
db_szam();

//Autók lekérése
async function autok_leker(tol) {
    if (tol >= 0 && tol < Math.ceil(szabad_db / 5)) {
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

            autok.forEach(auto => {
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
            console.table(autok);
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

document.getElementById("newKolcson").onsubmit = async (event)=>{
    event.preventDefault();
    errorMessage("foglalErrorMSG", "", 0)

    const id = JSON.parse(sessionStorage.getItem("login")).id;
    const url = `http://localhost:3000/newKolcson/${id}`;

    if (selected == null) {
        errorMessage("foglalErrorMSG", "Nincs kiválasztott autó", 1)
    }
    else{
        const body = {
            szemSzam: $("#szemFoglal").val(),
            carId: selected.id
        }
    
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        const data = await response.json();

        if (response.status != 200) {
            errorMessage("foglalErrorMSG", data.data, 1);
            autok_leker(0);
        }
        else{
            selected = null;
            $("#kivalasztTABLA").html("");
            $("#szemFoglal").val("");

            alert(data.data)
            autok_leker(0);
            fizetendo_leker(0);

        }
    }
}

async function fizetendo_leker(tol) {
    if (tol >= 0 && tol < Math.ceil(foglal_db / 5)) {
        const id = JSON.parse(sessionStorage.getItem("login")).id;
        const response = await fetch(`http://localhost:3000/autok_foglal/${id}?tol=${tol}`);

        const data = await response.json();
        console.log(data);

        if (response.status == 200) {
            
            foglaltak = data.data

            document.getElementById("FpreviousBTN").innerHTML = `<p class="page-link" onclick="fizetendo_leker(${tol-1})">Previous (${tol})</p>`
            document.getElementById("FnextBTN").innerHTML = `<p class="page-link" onclick="fizetendo_leker(${tol+1})">Next (${tol+2})</p>`

            var html = `<div class="table-head row d-none d-md-flex">
                <div class="col-3">Ügyfél</div>
                <div class="col-3">Kiadás</div>
                <div class="col-3">Típus</div>
                <div class="col-3">Select</div>
            </div>`

            let k = 0;

            foglaltak.forEach(auto => {
                //console.log(auto.kiad_datum);
                var elvisz_datum = new Date(auto.kiad_datum)
                //console.log(datum);
                //console.log((new Date() - datum) / 86400000);
                var shortDate = `${elvisz_datum.getFullYear()}-${elvisz_datum.getMonth()+1}-${elvisz_datum.getDate()}`
                html += `<div class="row table-item">
                <div class="col-6 d-flex d-md-none">Ügyfél</div>
                <div class="col-6 col-md-3">${auto.szig}</div>
                <div class="col-6 d-flex d-md-none">Kiadás</div>
                <div class="col-6 col-md-3 ">${shortDate}</div>
                <div class="col-6 d-flex d-md-none">Tipus</div>
                <div class="col-6 col-md-3">${auto.tipus}</div>
                <div class="text-center col-12 col-md-3" onclick="foglal_kivalaszt(${k})">Kiválaszt</div>
                </div>`;
                k++
                console.log("");
            });

            $("#fizetAutok").html(html);
            console.table(foglaltak);
        }
    }
}

function foglal_kivalaszt(szam) {
    var osszeg = 0;
    foglalt_selected = foglaltak[szam];
    datum = new Date(foglalt_selected.kiad_datum)
    var shortDate = `${datum.getFullYear()}-${datum.getMonth()+1}-${datum.getDate()}`
    napok = Math.ceil((new Date - datum) / 86400000)
    var html = `<table>
        <tr>
            <td>Km óra</td>
            <td>${foglalt_selected.km_ora} km</td>
        </tr>
        <tr>
            <td>Megtett km</td>
            <td id="megtett"> </td>
        </tr>
        <tr>
            <td>Megtett km összeg</td>
            <td id="megtett_ossz"> </td>
        </tr>
        <tr>
            <td>Szervíz díj</td>
            <td>${foglalt_selected.szerviz_dij} Ft</td>
        </tr>
        <tr>
            <td>Napi díj</td>
            <td>${foglalt_selected.napi_dij} Ft</td>
        </tr>
        <tr>
            <td>Kint töltött napok</td>
            <td>${ napok }</td>
        </tr>
        <tr>
            <td>Nap összeg</td>
            <td id="napi">${Math.ceil((new Date - datum) / 86400000) * foglalt_selected.napi_dij}</td>
        </tr>
        <tr>
            <td>Km díj</td>
            <td>${foglalt_selected.km_dij} Ft</td>
        </tr>
        <tr>
            <td>Szervíz km</td>
            <td>${foglalt_selected.szerviz_km} Km</td>
        </tr>
        <tr>
            <td>Kiadás</td>
            <td>${shortDate}</td>
        </tr>
        <tr>
            <td>Össz</td>
            <td id="ossz"></td>
        </tr>
    </table>`;

    //$("#megtettKm").val(150)
    $("#foglaltKivalasztTABLA").html(html)
    szamol();
}

document.getElementById("megtettKm").addEventListener("keyup", (event)=>{
    if (foglalt_selected != null) {
        szamol();
    }
})

document.getElementById("megtettKm").addEventListener("change", (event)=>{
    if (foglalt_selected != null) {
        szamol();
    }
})

async function szamol(params) {
    errorMessage("errorMSG", "", 0);

    var megtett = Number($("#megtettKm").val()) - Number(foglalt_selected.km_ora)
    $("#megtett").html(`${megtett} km`);

    var napi = Number($("#napi").html());
    var fizet = megtett * Number(foglalt_selected.km_dij)

    $("#megtett_ossz").html(fizet)
    $("#ossz").html(napi + fizet)

    if (foglalt_selected.szerviz_km + megtett >= 10000) {
        errorMessage("errorMSG", "Szervízbe küldendő!", 1)
        $("#ossz").html(napi + fizet + foglalt_selected.szerviz_dij)
    }
}

document.getElementById("foglal-form").onsubmit = (event)=>{
    event.preventDefault();

    if (foglalt_selected.km_ora > Number($("#megtettKm").val())) {
        alert("A km óra nem lehet kissebb, mint mikor elvitték.")
    }
    else{
        const id = JSON.parse(sessionStorage.getItem("login")).id;

        var datum = new Date(foglalt_selected.kiad_datum)
        var shortDate = `${datum.getFullYear()}-${datum.getMonth()+1}-${datum.getDate()}`
        var megtett = Number($("#megtettKm").val()) - Number(foglalt_selected.km_ora)

        const body = {
            id: foglalt_selected.id,
            auto_id: foglalt_selected.auto_id,
            visszahoz_datum: shortDate,
            napszam: napok,
            km_ora_veg: Number($("#megtettKm").val()),
            ossz_km: megtett,
            osszeg: Number($("#ossz").html()),
            szerviz_e: (foglalt_selected.szerviz_km + megtett >= 10000) ? (true) : (false)
        }

        console.table(body)

        const id = JSON.parse(sessionStorage.getItem("login")).id;

        const url = `http://localhost:3000/fizetes/${id}`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

    }
}