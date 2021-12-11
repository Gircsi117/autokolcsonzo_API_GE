const userId = "";

document.getElementById("updateForm").onsubmit = async (event)=>{
    event.preventDefault();
    const id = JSON.parse(sessionStorage.getItem("login")).id;
    const url = `http://localhost:3000/user/${id}`;

    const name = $("#name").val();
    const email = $("#email").val();
    const pass1 = $("#password1").val();
    const pass2 = $("#password2").val();
    const passNew = $("#password3").val();

    $("#errorMSG").html("");
    $("#errorMSG").css("padding", "0px")
    $("#errorMSG").css("border", "0px solid red")

    if (pass1 == pass2) {
        const body = {
            id: userId,
            name: name,
            email: email,
            pass: pass1,
            newPass = passNew
        }
    
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
                alert("Profil sikeresen módosítva!!")
            }
            else{
                $("#errorMSG").html(data.data);
                $("#errorMSG").css("padding", "5px")
                $("#errorMSG").css("border", "1px solid red")
            }
        }
        else{
            $("#errorMSG").html(data.data);
            $("#errorMSG").css("padding", "5px")
            $("#errorMSG").css("border", "1px solid red")
        }
    }
    else{
        $("#errorMSG").html("A jelszavak nem egyeznek!");
        $("#errorMSG").css("padding", "5px")
        $("#errorMSG").css("border", "1px solid red")
    }
    
}

async function get_user_data() {
    const id = JSON.parse(sessionStorage.getItem("login")).id;
    const url = `http://localhost:3000/user/${id}`;

    const response = await fetch(url);

    const data = await response.json();

    if (response.status == 200) {
        $("#name").val(data.data.nev)
        $("#email").val(data.data.email)
        userId = data.data.Id
    }
    else{
        $("#errorMSG").html(data.data);
        $("#errorMSG").css("padding", "5px")
        $("#errorMSG").css("border", "1px solid red")
    }
}

get_user_data()