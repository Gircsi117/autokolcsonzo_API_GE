let bente

//sessionStorage.setItem("login", JSON.stringify({log: true, id:""}))
//sessionStorage.removeItem("login")

try {
    bente = JSON.parse(sessionStorage.getItem("login")).log;
} catch (error) {
    bente = false;
}

console.log(bente);

if (!bente && !String(document.location.href).includes("login")) {
    document.location.href = "./login.html";
}

//Login
try {
    document.getElementById("loginForm").onsubmit = async (event)=>{
        event.preventDefault();
        
        errorMessage("errorMSG-login", "", 0)

        const body = {
            "email": $("#email").val(),
            "pass": $("#password").val()
        }
        console.log(body);
    
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        
        if (response.status == 200) {
            const data = await response.json();
    
            if (data.message) {
                console.log("Sikeres");
                sessionStorage.setItem("login", JSON.stringify({log: true, id: data.id}))
                document.location.href = "./home.html"
            }
            else{
                console.log("Sikertelen");
                errorMessage("errorMSG-login", "Hibás felhasználói adatok!", 1)
            }
    
        }
    }
} catch (error) {}

//Registration
try {
    document.getElementById("regForm").onsubmit = async (event)=>{
        event.preventDefault();
        
        const name = $("#regName").val();
        const email = $("#regEmail").val();
        const pass1 = $("#regPassword1").val();
        const pass2 = $("#regPassword2").val();
        const key = $("#key").val();    

        errorMessage("errorMSG-reg", "", 0)

        if (pass1 != pass2) {
            $("#errorMSG-reg").html("A jelszavak nem egyeznek!");
        }
        else{
            const response = await fetch("http://localhost:3000/reg", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    pass: pass1,
                    key: key
                })
            });

            if (response.status == 200) {
                const data = await response.json();
                console.log(data);
                if (data.message) {
                    alert("Sikeres regisztráció!")
                    class_valt_form('regForm', 'loginForm', 'd-none');
                }
                else{
                    errorMessage("errorMSG-reg", data.err, 0)
                }
            }
        }
    }

} catch (error) {}

//logout
async function log_out(params) {

    let id = JSON.parse(sessionStorage.getItem("login")).id

    const response = await fetch("http://localhost:3000/logout/"+id)
    if (response.status == 200) {
        sessionStorage.removeItem("login")
        document.location.href = "./login.html";
    }
}

function class_valt_form(idadd, idremove, clas) {
    document.getElementById(idremove).classList.remove(clas);
    document.getElementById(idadd).classList.add(clas);
}

//getuser
async function getuser(params) {

    let id = JSON.parse(sessionStorage.getItem("login")).id

    const response = await fetch("http://localhost:3000/user/"+id);
    if (response.status == 200) {
        const data = await response.json()
        console.log(data);
    }
}

function errorMessage(id, message, number) {
    $(`#${id}`).html(message);
    $(`#${id}`).css("padding", `${(number*5)}px`)
    $(`#${id}`).css("border", `${number*1}px solid red`)
}