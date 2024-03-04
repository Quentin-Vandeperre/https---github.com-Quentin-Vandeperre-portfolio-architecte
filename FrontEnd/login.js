const enteredEmail = document.getElementById("email")
const enteredPassword = document.getElementById("password")
const span = document.getElementById("span")

let submit = document.getElementById("submit")
submit.addEventListener("click", (event) => {
    event.preventDefault()
    if (enteredEmail.value === "" || enteredPassword.value === "") {
        console.log("de")
        span.style.display = "block"
    }
    else {
        span.style.display = "none"
        fetch('http://localhost:5678/api/users/login',{
            method: "POST",
            body : JSON.stringify({
                email: enteredEmail.value,
                password: enteredPassword.value,
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((response)=> response.json())
        .then ((data)=> {
            const token = localStorage.setItem('token', JSON.stringify(data));
            const auth = JSON.parse(localStorage.getItem('token'));
            // Si on a bien un token dans le localstorage, on redirige vers la page d'accueil
            if (auth && auth.token) {
                window.location = "index.html";
            // Sinon on affiche le message d'eereur
            } else {
                span.style.display = "block";
            }
        })
    }
})
