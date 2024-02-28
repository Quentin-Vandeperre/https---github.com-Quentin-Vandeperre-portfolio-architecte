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

