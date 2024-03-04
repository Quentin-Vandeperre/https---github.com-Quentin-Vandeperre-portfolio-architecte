let gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

async function getApiWork(filter=0) {
    const reponse = await fetch('http://localhost:5678/api/works');
    const data = await reponse.json();
    gallery.innerHTML = ""
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

let i = 0

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

function filterByCategories(filters) {
    console.log(filters)
    
}

function filter(element) {
    console.log(element)
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
    modal.style.display = "none" // afin d'annuler le display none
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


let delectProject = document.querySelector(".delectProject")


async function appendPicture() {
    const reponse = await fetch('http://localhost:5678/api/works');
    const data = await reponse.json();
    data.forEach(function(e) {
        let img = document.createElement("img");
        delectProject.appendChild(img)
        img.src = e.imageUrl;
    }
)}

appendPicture()