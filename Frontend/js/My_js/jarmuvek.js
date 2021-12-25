var jarmuvek;
var selected;

document.getElementById("car-form").onsubmit = async (event)=>{
    event.preventDefault();

    const id = JSON.parse(sessionStorage.getItem("login")).id;
    const url = `http://localhost:3000/car/${id}`

    const body = {
        gyarto: $("#gyarto").val(),
        tipus: $("#tipus").val(),
        km_ora: $("#km_ora").val(),
        szerviz_dij: $("#szerviz_dij").val(),
        napi_dij: $("#napi_dij").val(),
        km_dij: $("#km_dij").val(),
        szerviz_km: $("#szerviz_km").val(),
        status: $("#status").val()
    }

    console.log(body);

    errorMessage("errorMSG", "", 0)

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })

    const data = await response.json();

    if (response.status == 200) {
        if (data.message) {
            alert("Adatok sikeresen feléve!")
            all_auto(0)
        }
    }
    else{
        errorMessage("errorMSG", data.data, 1)
    }
}

async function all_auto(tol) {
    errorMessage("errorMSG", "", 0)
    const id = JSON.parse(sessionStorage.getItem("login")).id;

    const response = await fetch(`http://localhost:3000/allCar/${id}?tol=${tol}`)
    const data = await response.json();

    if (response.status == 200) {
        
        jarmuvek = data.data
        console.table(jarmuvek)

        if (data.data.length > 0) {
            $("#previousBTN").html(`<p class="page-link" onclick="all_auto(${tol-1})">Previous (${tol-1})</p>`);
            if (tol == 0) {
                $("#previousBTN").html(`<p class="page-link" onclick="">Previous</p>`);
            }
            $("#nextBTN").html(`<p class="page-link" onclick="all_auto(${tol+1})">Next (${tol+1})</p>`)

            var html = `<div class="table-head row d-none d-lg-flex">
                <div class="col">ID</div>
                <div class="col">Gyartó</div>
                <div class="col">Típus</div>
                <div class="col">Km óra</div>
                <div class="col">Szervíz díj</div>
                <div class="col">Napi díj</div>
                <div class="col">Km díj</div>
                <div class="col">Szervíz km</div>
                <div class="col">Status</div>
                <div class="col">Select</div>
            </div>`;

            var k = 0;

            data.data.forEach(auto => {
                html += `<div class="row table-item mt-3 mt-lg-0">
                    <div class="col-6 d-flex d-lg-none">ID</div>
                    <div class="col-6 col-lg"><p>${auto.id}</p></div>
                    <div class="col-6 d-flex d-lg-none">Gyarto</div>
                    <div class="col-6 col-lg"><p>${auto.gyarto}</p></div>
                    <div class="col-6 d-flex d-lg-none">Tipus</div>
                    <div class="col-6 col-lg"><p>${auto.tipus}</p></div>
                    <div class="col-6 d-flex d-lg-none">Km óra</div>
                    <div class="col-6 col-lg"><p>${auto.km_ora}</p></div>
                    <div class="col-6 d-flex d-lg-none">Szervíz díj</div>
                    <div class="col-6 col-lg"><p>${auto.szerviz_dij}</p></div>
                    <div class="col-6 d-flex d-lg-none">Napi díj</div>
                    <div class="col-6 col-lg"><p>${auto.napi_dij}</p></div>
                    <div class="col-6 d-flex d-lg-none">Km díj</div>
                    <div class="col-6 col-lg"><p>${auto.km_dij}</p></div>
                    <div class="col-6 d-flex d-lg-none">Szervíi km</div>
                    <div class="col-6 col-lg"><p>${auto.szerviz_km}</p></div>
                    <div class="col-6 d-flex d-lg-none">Status</div>
                    <div class="col-6 col-lg"><p>${auto.status}</p></div>
                    <div class="text-center col-12 col-lg button" onclick="kivalaszt(${k})">Kiválaszt</div>
                    </div>`;
                k++;
            });
            $("#autok").html(html)
        }
    }
    else{
        errorMessage("errorMSG", data.data, 1)
    }
}
all_auto(0);

function kivalaszt(k) {
    class_valt_form("car-form", "car-form_update", "d-none")
    selected = jarmuvek[k]
    console.table(selected)

    document.getElementById("delete").onclick = ()=>{
        torol("gepjarmuvek", selected.id)
    }

    var body = {
        id: selected.id,
        gyarto: selected.gyarto,
        tipus: selected.tipus,
        km_ora: selected.km_ora,
        szerviz_dij: selected.szerviz_dij,
        napi_dij: selected.napi_dij,
        km_dij: selected.km_dij,
        szerviz_km: selected.szerviz_km,
        status: selected.status
    }

    $("#Ugyarto").val(body.gyarto)
    $("#Utipus").val(body.tipus)
    $("#Ukm_ora").val(body.km_ora)
    $("#Uszerviz_dij").val(body.szerviz_dij)
    $("#Unapi_dij").val(body.napi_dij)
    $("#Ukm_dij").val(body.km_dij)
    $("#Uszerviz_km").val(body.szerviz_km)
    $("#Ustatus").val(selected.status)
}

document.getElementById("car-form_update").onsubmit = async (event)=>{
    event.preventDefault();

    errorMessage("UerrorMSG", "", 0)

    const body = {
        id: selected.id,
        gyarto: $("#Ugyarto").val(),
        tipus: $("#Utipus").val(),
        km_ora: $("#Ukm_ora").val(),
        szerviz_dij: $("#Uszerviz_dij").val(),
        napi_dij: $("#Unapi_dij").val(),
        km_dij: $("#Ukm_dij").val(),
        szerviz_km: $("#Uszerviz_km").val(),
        status: $("#Ustatus").val()
    }

    const id = JSON.parse(sessionStorage.getItem("login")).id;
    const url = `http://localhost:3000/updateCar/${id}`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })

    const data = await response.json()

    if (response.status == 200) {
        alert(data.data);
        all_auto(0)
    }
    else{
        errorMessage("UerrorMSG", data.data, 1)
        if (data.data.includes("Session")) {
            log_out();
        }
    }
}