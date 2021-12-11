document.getElementById("ugyfel-form").onsubmit = async (event)=>{
    event.preventDefault();
    const id = JSON.parse(sessionStorage.getItem("login")).id;
    const url = `http://localhost:3000/ugyfel/${id}`

    $("#errorMSG").html("")
    $("#errorMSG").css("padding", "0px")
    $("#errorMSG").css("border", "0px solid red")

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
            $("#errorMSG").html(data.data)
            $("#errorMSG").css("padding", "5px")
            $("#errorMSG").css("border", "1px solid red")
        }
        else{
            alert(data.data)
            $("#name").val("")
            $("#szig").val("")
            $("#lakcim").val("")
        }
    }
}