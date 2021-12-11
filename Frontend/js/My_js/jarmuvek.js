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