let modal = null

const jsModal = document.querySelector(".jsModal")
const jsModalClose = document.querySelector(".jsModalClose")
const jsModalClose1 = document.querySelector(".jsModalClose1")
const modal1 = document.querySelector('#modal1')
const modal2 = document.querySelector('#modal2')
let buttonReturn = document.querySelector(".returnModal1")

jsModal.addEventListener('click', function(event){
    openModal()
})

function openModal() {
    modal1.removeAttribute("aria-hidden")
    modal1.setAttribute("aria-modal", "true")
    modal1.style.display = null
    modal1.addEventListener('click', closeModal)
    jsModalClose.addEventListener("click", function(){
        closeModal()
    })
    modal = modal1
    modal.querySelector('.jsModalStop').addEventListener('click', stopPropagation)     // ferme la modale apres le click en dehors de la modale 
    
}

function closeModal() {
    if(modal === null)return
    modal.style.display = "none" // afin d'annuler le display null
    modal.setAttribute('aria-hidden','true')
    modal.removeAttribute('aria-modal')
    modal = null
}

function openModalPicture() {
    modal1.style.display = "none";
    modal2.removeAttribute('aria-hidden');
    modal2.setAttribute('aria-modal', 'true');
    modal2.style.display = null;
    modal2.addEventListener('click', closeModal)
    jsModalClose1.addEventListener("click", function(){
        closeModal()
    })
    modal = modal2
    modal.querySelector('.jsModalStop').addEventListener('click', stopPropagation)
}

const buttonModalAddPicture = document.querySelector(".buttonModalAddPicture")

buttonModalAddPicture.addEventListener("click", function(){
    openModalPicture()
})

const stopPropagation = function(e){
    e.stopPropagation()
}

window.addEventListener('keydown', function (e){
    if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e)
    }
})

buttonReturn.addEventListener("click", function() {
    modal1.style.display = "flex"
    modal2.style.display = "none"
    modal = modal1                                  // modal = modal2 donc on ne pourra plus fermer la modal
})




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

let addCategory = document.querySelector("#addCategory")

async function getApiCategories() {
    const reponseCategories = await fetch('http://localhost:5678/api/categories');
    const dataCategories = await reponseCategories.json();  
    dataCategories.forEach((element) => {
        let option = document.createElement("option");
        option.innerText = element.name;  
        addCategory.appendChild(option)
    })
}

getApiCategories()

let movieForm = document.querySelector(".addForm")
movieForm.addEventListener("submit",addProject)

function addProject(e){
    e.preventDefault();
    const formData = new FormData(movieForm);
    const image = formData.get("image");
    const title = formData.get("title");
    const category = formData.get("category");
    const newProject = {image, title, category};
    console.log(newProject)
    saveProject(newProject);
}

function saveProject(project){
    if (project.image === null || project.title === null || project.category === null){
        alert("Veuillez rentrer toutes les données")
    }
    else {
        fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + auth.token,          // autentification 
                    'Content-Type': 'application/json',
                },
            })
            .then((response)=> response.json())
            .then(res => console.log(res))
    }
}