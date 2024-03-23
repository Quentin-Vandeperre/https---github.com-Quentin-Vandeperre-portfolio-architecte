let gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

export async function getApiWork(filter=0) {
    const reponse = await fetch('http://localhost:5678/api/works');
    const data = await reponse.json();
    gallery.innerHTML = ""                      // dés qu'on va rappeler l'api, tous va ce supprimer 
    if (filter==0) {
        data.forEach((element) => {
            let figure = appendElement(element);
            gallery.appendChild(figure);
        });
    }
    else {
        const dataFilter = data.filter(function(result) {
            return result.categoryId == filter
        })
        dataFilter.forEach((element) => {
            let figure = appendElement(element);
            gallery.appendChild(figure);
        })
    }
}

async function getApiCategories() {
    const reponseCategories = await fetch('http://localhost:5678/api/categories');
    const dataCategories = await reponseCategories.json();  
    getButtonTous()
    dataCategories.forEach((element) => {
        let button = appendCategories(element);
        filters.appendChild(button)
    })
}

getApiWork()
getApiCategories()

function appendElement(element) {
    let figure = document.createElement("figure");
    let figcaption = document.createElement("figcaption");
    let img = document.createElement("img");
    figure.appendChild(img);
    figure.appendChild(figcaption);
    figcaption.innerText = element.title;
    img.src = element.imageUrl;
    img.alt = element.title;
    return figure;
}

function getButtonTous() {
    let button = document.createElement("button")
    let textButton = document.createTextNode("Tous")
    filters.appendChild(button)
    button.appendChild(textButton)
    button.addEventListener("click", (event) => {
        getApiWork()
    })
}

function appendCategories(element) {
    let button = document.createElement ("button")
    let textButton = document.createTextNode(element.name)
    button.appendChild(textButton)
    button.addEventListener("click", function() {           
        let filters = element.id
        getApiWork(filters);
    })
    return button 
}

/**************************************LOGIN********************************************/

const buttonModify = document.querySelector(".jsModal")
const modeEdition = document.querySelector(".modeEdition")

const auth = JSON.parse(localStorage.getItem('token'));
if (auth && auth.token) {
    const navLogin = document.getElementById("navLogin")
    const navLogout = document.getElementById("navLogout")
    navLogin.style.display = "none"
    navLogout.style.display = "block";
    navLogout.addEventListener("click", function(event){
        localStorage.removeItem('token')
        window.location("login.html")
    })
    buttonModify.style.display = "flex"
    filters.style.display = "none"
    modeEdition.style.display = "flex"
}

