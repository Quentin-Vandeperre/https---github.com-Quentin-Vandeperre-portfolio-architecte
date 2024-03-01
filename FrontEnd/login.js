async function fetch() {
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()                                  // permet d'attendre l'xécution de tout le code
    const login = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    }
    const loginJson = JSON.stringify(login)
    fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        body: loginJson,
        headers: { "Content-Type": "application/json" },
    }).then((response)=>console.log(response))
      .then ((data)=>{
      console.log(data)
      })
    })
    
}

fetch()

// const enteredEmail = document.getElementById("email").value
// const enteredPassword = document.getElementById("password").value

// let form = document.querySelector("form")
//     form.addEventListener("submit", (event) => {
//     event.preventDefault()
//     fetch('http://localhost:5678/api/users/login',{
//         method: "POST",
//         body : JSON.stringify({
//             email: enteredEmail,
//             password: enteredPassword,
//         }),
//         headers: {
//             "Content-Type": "application/json"
//         },
//     })
//     .then((response)=> response.json())
//     .then ((data)=> {
//         console.log(data)
//     } )
// })

