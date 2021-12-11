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