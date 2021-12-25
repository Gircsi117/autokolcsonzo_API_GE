var ugyfelek;
var selected;

document.getElementById("ugyfel-form").onsubmit = async (event)=>{
    event.preventDefault();
    const id = JSON.parse(sessionStorage.getItem("login")).id;
    const url = `http://localhost:3000/ugyfel/${id}`

    errorMessage("errorMSG", "", 0)

    const body = {
        nev: $("#name").val(),
        szig: $("#szig").val(),
        lakcim: $("#lakcim").val()
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })

    if (response.status == 200) {
        const data = await response.json();
        if (!data.message) {
            errorMessage("errorMSG", data.data, 1)
        }
        else{
            alert(data.data)
            $("#name").val("")
            $("#szig").val("")
            $("#lakcim").val("")
        }
    }
}

async function all_ugyfel(tol) {
    errorMessage("errorMSG", "", 0)
    const id = JSON.parse(sessionStorage.getItem("login")).id;

    const response = await fetch(`http://localhost:3000/allUgyfel/${id}?tol=${tol}`)
    const data = await response.json();

    if (response.status == 200) {
        
        ugyfelek = data.data
        console.table(ugyfelek)

        if (data.data.length > 0) {
            $("#previousBTN").html(`<p class="page-link" onclick="all_ugyfel(${tol-1})">Previous (${tol-1})</p>`);
            if (tol == 0) {
                $("#previousBTN").html(`<p class="page-link" onclick="">Previous</p>`);
            }
            $("#nextBTN").html(`<p class="page-link" onclick="all_ugyfel(${tol+1})">Next (${tol+1})</p>`)

            var html = `<div class="table-head row d-none d-lg-flex">
                <div class="col">Name</div>
                <div class="col">Személyi</div>
                <div class="col">Lakcím</div>
                <div class="col">Select</div>
            </div>`;

            var k = 0;

            data.data.forEach(ugyfel => {
                html += `<div class="row table-item mt-3 mt-lg-0">
                    <div class="col-6 d-flex d-lg-none">Név</div>
                    <div class="col-6 col-lg"><p>${ugyfel.nev}</p></div>
                    <div class="col-6 d-flex d-lg-none">Személyi</div>
                    <div class="col-6 col-lg"><p>${ugyfel.szig}</p></div>
                    <div class="col-6 d-flex d-lg-none">Lakcím</div>
                    <div class="col-6 col-lg"><p>${ugyfel.lakcim}</p></div>
                    <div class="text-center col-12 col-lg button" onclick="kivalaszt(${k})">Kiválaszt</div>
                    </div>`;
                k++;
            });
            $("#ugyfelek").html(html)
        }
    }
    else{
        errorMessage("errorMSG", data.data, 1)
    }
}
all_ugyfel(0)

function kivalaszt(k) {
    class_valt_form("ugyfel-form", "ugyfel-form-update", "d-none")

    selected = ugyfelek[k]
    console.table(selected);

    document.getElementById("delete").onclick = ()=>{
        torol("ugyfelek", selected.id)
    }

    $("#Uname").val(selected.nev)
    $("#Uszig").val(selected.szig)
    $("#Ulakcim").val(selected.lakcim)
}

document.getElementById("ugyfel-form-update").onsubmit = async (event)=>{
    event.preventDefault();
    errorMessage("UerrorMSG", "", 0)

    const body = {
        id: selected.id,
        name: $("#Uname").val(),
        szig: $("#Uszig").val(),
        lakcim: $("#Ulakcim").val(),
    }

    const id = JSON.parse(sessionStorage.getItem("login")).id;
    const url = `http://localhost:3000/updateUgyfel/${id}`

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
        all_ugyfel(0)
    }
    else{
        errorMessage("UerrorMSG", data.data, 1)
        if (data.data.includes("Session")) {
            log_out();
        }
    }
}