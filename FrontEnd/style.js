let gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

async function getApiWork(filter=0) {
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

/**************************************MODAL********************************************/

let modal = null

const openModal = function(e){
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href')) // on va donc recuper l'attribut de href soit #modal1
    target.style.display = null // afin d'annuler le display none
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal','true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.jsModalClose').addEventListener('click', closeModal)
    modal.querySelector('.jsModalStop').addEventListener('click', stopPropagation)
}

const closeModal = function (e){
    if(modal === null)return
    e.preventDefault()
    modal.style.display = "none" // afin d'annuler le display null
    modal.setAttribute('aria-hidden','true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.jsModalClose').removeEventListener('click', closeModal)
    modal.querySelector('.jsModalStop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function(e){
    e.stopPropagation()
}

document.querySelectorAll(".jsModal").forEach(a=>{
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function (e){
    if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e)
    }
})

const auth = JSON.parse(localStorage.getItem('token'));
if (auth && auth.token) {
    const navLogin = document.getElementById("navLogin")
    const navLogout = document.getElementById("navLogout")
    navLogin.style.display = "none"
    navLogout.style.display = "block";
    navLogout.addEventListener("click", function(event){
        localStorage.removeItem('token')
        window.location("login.html")
        //mettre bandeau en haut, afficher le bouton modifier et cacher les filtres categories
    })
}

/**************************************DELETE PROJECT********************************************/


let deletProject = document.querySelector(".deletProject")


async function apiGet() {
    const reponse = await fetch('http://localhost:5678/api/works');
    const data = await reponse.json();
    data.forEach(function(e) {
        modalAddElement(e)   
    }
)}

apiGet()


function modalAddElement(e) {
    let divElement = document.createElement("div");
    let img = document.createElement("img");
    let buttonDelet = document.createElement("button");
    deletProject.appendChild(divElement);
    divElement.appendChild(img);
    divElement.appendChild(buttonDelet);
    img.src = e.imageUrl;
    buttonDelet.innerText = "X";
    delet(buttonDelet, e)
}

function delet(button, e) {
    button.addEventListener("click", function(){ 
        const text = "Etes vous sur de vouloir supprimer ce projet ?"
        if (confirm(text) == true) {
            fetch("http://localhost:5678/api/works/" + e.id, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + auth.token,          // autentification 
                    'Content-Type': 'application/json',
                },
            })
            .then((response)=> response.json())
            .then(res => console.log(res))
        }
    })
}

/**************************************APPEND PROJECT********************************************/

let boutonAddPicture = document.querySelector(".buttonAddPicture")
let buttonReturn = document.querySelector(".returnModal1")
let modalWrapper1 = document.querySelector(".modalWrapper")
let modalWrapper2 = document.querySelector(".modalWrapper2")

boutonAddPicture.addEventListener ("click", function(){
    modalWrapper1.style.display = "none"
    modalWrapper2.style.display = "flex"
})

buttonReturn.addEventListener("click", function() {
    modalWrapper1.style.display = "flex"
    modalWrapper2.style.display = "none"
})


let movieForm = document.querySelector(".addForm")
movieForm.addEventListener("submit",addProject)

function addProject(e){
    e.preventDefault();
    const formData = new FormData(movieForm);
    const image = formData.get("file");
    const title = formData.get("title");
    const category = formData.get("categories");
    const newProject = {image, title, category};
    console.log(newProject)
    saveProject(newProject);
}

function saveProject(project){
    if (project.image === File || project.title ==="" || project.category ===""){
        alert("Veuillez rentrer toutes les données")
    }
    else {
        let projects = JSON.parse(localStorage.getItem("projects"));
        projects = [...projects, project]
        localStorage.setItem("projects", JSON.stringify(projects))
    }
}