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
        
        console.table(data.data)

        var html = `<div class="table-head row d-none d-md-flex">
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
            html += `<div class="row table-item">
                <div class="col-6 d-flex d-md-none">ID</div>
                <div class="col-6 col-md"><p>${auto.id}</p></div>
                <div class="col-6 d-flex d-md-none">Gyarto</div>
                <div class="col-6 col-md"><p>${auto.gyarto}</p></div>
                <div class="col-6 d-flex d-md-none">Tipus</div>
                <div class="col-6 col-md"><p>${auto.tipus}</p></div>
                <div class="col-6 d-flex d-md-none">Km óra</div>
                <div class="col-6 col-md"><p>${auto.km_ora}</p></div>
                <div class="col-6 d-flex d-md-none">Szervíz díj</div>
                <div class="col-6 col-md"><p>${auto.szerviz_dij}</p></div>
                <div class="col-6 d-flex d-md-none">Napi díj</div>
                <div class="col-6 col-md"><p>${auto.napi_dij}</p></div>
                <div class="col-6 d-flex d-md-none">Km díj</div>
                <div class="col-6 col-md"><p>${auto.km_dij}</p></div>
                <div class="col-6 d-flex d-md-none">Szervíi km</div>
                <div class="col-6 col-md"><p>${auto.szerviz_km}</p></div>
                <div class="col-6 d-flex d-md-none">Status</div>
                <div class="col-6 col-md"><p>${auto.status}</p></div>
                <div class="text-center col-12 col-md button" onclick="kivalaszt(${k})">Kiválaszt</div>
                </div>`;
            k++;
        });
        $("#autok").html(html)
    }
    else{
        errorMessage("errorMSG", data.data, 1)
    }
}
all_auto(0);