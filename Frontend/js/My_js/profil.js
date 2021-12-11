let userId = '';

document.getElementById("updateForm").onsubmit = async (event)=>{
    event.preventDefault();
    const id = JSON.parse(sessionStorage.getItem("login")).id;
    const url = `http://localhost:3000/user/${id}`;

    const name = $("#name").val();
    const email = $("#email").val();
    const pass1 = $("#password1").val();
    const pass2 = $("#password2").val();
    const passOld = $("#password3").val();

    errorMessage("errorMSG", "", 0)

    if (pass1 == pass2) {
        const body = {
            id: userId,
            name: name,
            email: email,
            newPass: pass1,
            oldPass: passOld
        }
        
        console.log(body);

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
                $("#password1").val("");
                $("#password2").val("");
                $("#password3").val("");

                alert(data.data)
            }
            else{
                errorMessage("#errorMSG", data.data, 1)
            }
        }
        else{
            errorMessage("#errorMSG", data.data, 1)
        }
    }
    else{
        errorMessage("#errorMSG", data.data, 1)
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
        await errorMessage("errorMSG", data.data, 1);
        document.getElementById("hozzaad").disabled = true
    }
}

get_user_data()