let gallery = document.querySelector(".gallery")

const reponse = await fetch('http://localhost:5678/api/works');
const data = await reponse.json();

const reponseCategories = await fetch('http://localhost:5678/api/categories');
const dataCategories = await reponseCategories.json(); 

let table = {}
let i = 0

function appendElement() {
    let figure = document.createElement("figure");
    let figcaption = document.createElement("figcaption");
    let img = document.createElement("img");
    gallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    return { figcaption, img };
}

function tous() {
    while (i<data.length) {
        table = data[i];
        let { figcaption, img } = appendElement();
        figcaption.innerText = table.title;
        img.src = table.imageUrl;
        i++;
    }
}


function appendElementCategories() {
    let divFilters = document.createElement("div")
    let button = document.createElement ("button")
    gallery.appendChild(divFilters)
    divFilters.appendChild(button)
    return button 
}


function createCategories() {
    i=0
    while (i<=dataCategories.length) {
        if (i==0) {
            let button = appendElementCategories();
            let textButton = document.createTextNode("Tous")
            button.appendChild(textButton)
        }
        else {
            table = dataCategories[i-1]
            let button = appendElementCategories();
            let textButton = document.createTextNode(table.name)
            button.appendChild(textButton)
        }
    i++
    }
}

function click() {
    let button = appendElementCategories();
    button.addEventListener ("click", () => {
        console.log("bonjoru")
    })
}

click()
tous()
createCategories()