const enteredEmail = document.getElementById("email")
const enteredPassword = document.getElementById("password")
const span = document.getElementById("span")                // message erreur

let submit = document.getElementById("submit")
submit.addEventListener("click", function (event) {
    event.preventDefault()
    if (enteredEmail.value === "" || enteredPassword.value === "") {
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
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
        .then((response)=> response.json())
        .then ((data)=> {
            const token = localStorage.setItem('token', JSON.stringify(data));
            const auth = JSON.parse(localStorage.getItem('token'));
            if (auth && auth.token) {
                window.location = "index.html";
            } else {
                span.style.display = "block";
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            span.style.display = "block";
        })
    }
})
