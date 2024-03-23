import { getApiWork } from "./style.js";

getApiWork()
let modal = null
const auth = JSON.parse(localStorage.getItem('token'));
const jsModal = document.querySelector(".jsModal")
const jsModalClose = document.querySelector(".jsModalClose")
const jsModalClose1 = document.querySelector(".jsModalClose1")
const modal1 = document.querySelector('#modal1')
const modal2 = document.querySelector('#modal2')
let buttonReturn = document.querySelector(".returnModal1")

jsModal.addEventListener('click', function(event){
    openModal()
})

// on ouvre la modal

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

//on ferme la modal

function closeModal() {
    if(modal === null)return
    modal.style.display = "none" // afin d'annuler le display null
    modal.setAttribute('aria-hidden','true')
    modal.removeAttribute('aria-modal')
    modal = null
}

//on ouver la deuxieme modal

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

// lors du click sur le bouton "ajouter une photo" on appelle la fonction pour ouvrir la deuxieme modal

buttonModalAddPicture.addEventListener("click", function(){
    openModalPicture()
})

const stopPropagation = function(e){
    e.stopPropagation()
}

//fermeture de la modal quand l'utilisateur utilise esc

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


// appelle des projet

async function apiGet() {
    const reponse = await fetch('http://localhost:5678/api/works');
    const data = await reponse.json();
    data.forEach(function(e) {
        modalAddElement(e)   
    }
)}

apiGet()

let trashCan = document.querySelector(".fa-trash-can");

// creation de chaque projet 

function modalAddElement(e) {
    let divElement = document.createElement("div");
    let img = document.createElement("img");
    let buttonDelet = document.createElement("button");
    let i = document.createElement("i")
    i.classList.add("fa-trash-can")
    i.classList.add("fa-solid")
    deletProject.appendChild(divElement);
    divElement.appendChild(img);
    buttonDelet.appendChild(i);
    divElement.appendChild(buttonDelet);
    img.src = e.imageUrl;
    delet(buttonDelet, e, divElement)
}

// lors sur click sur la poubelle, alert, si l'utilisateur valide on envoie la suppression 

function delet(button, e, divElement) {
    button.addEventListener("click", function(){ 
        const text = "Etes vous sur de vouloir supprimer ce projet ?"
        if (confirm(text) == true) {
            let deletE = e.id
            fetch("http://localhost:5678/api/works/" + deletE, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + auth.token,          // autentification 
                    'Content-Type': 'application/json',
                },
            })
            divElement.remove()
            getApiWork()
        }
    })
}

/**************************************APPEND PROJECT********************************************/

let addCategory = document.querySelector("#addCategory")
let addTitle = document.querySelector("#addTitle")
let imgUpdate = document.querySelector("#imgUpdate")
let file = document.querySelector("#file")
let divInput = document.querySelector(".divInput")


// fonction qui ajoute les categorie 

async function getApiCategories() {
    const reponseCategories = await fetch('http://localhost:5678/api/categories');
    const dataCategories = await reponseCategories.json();  
    dataCategories.forEach((element) => {
        let option = document.createElement("option");
        option.value = element.id
        option.innerText = element.name;  
        addCategory.appendChild(option)
    })
}

getApiCategories()



file.onchange = function(){
    imgUpdate.style.display = "block"
    divInput.style.display = "none"
    imgUpdate.src = URL.createObjectURL(file.files[0]);
    verifValidityForm()
}

let movieForm = document.querySelector(".addForm")
movieForm.addEventListener("submit",addProject)

// enregistre les valeur entré par l'utilisateur 

function addProject(e){
    e.preventDefault();
    const title = document.querySelector("#addTitle").value;
    const category = document.querySelector("#addCategory").value;
    const file = document.querySelector("#file").files[0];
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);
    formData.append("category", category);
    saveProject(formData)
}

//fonction qui verifie si tous est rempli, si oui ajoute le nouveau projet 

function saveProject(project){
    if (verifValidityForm()===false){
        alert("Veuillez rentrer toutes les données")
    }
    else {
        fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + auth.token,          // autentification 
                },
                body: project
            })
        getApiWork()
    }
}

const submit = document.querySelector(".buttonAddProject")

addCategory.addEventListener("change", (event) =>{
    verifValidityForm()
})

addTitle.addEventListener("input", (event) =>{
    verifValidityForm()
})  

// fonction qui permet de changer la couleur du boutton valider

function verifValidityForm() {
    const title = document.querySelector("#addTitle").value;
    const category = document.querySelector("#addCategory").value;
    const file = document.querySelector("#file").files[0];
    if (title != '' && category != '' && file){
        submit.style.backgroundColor = '#1D6154'
        return true
    } else {
        submit.style.backgroundColor = '#A7A7A7'
        return false
    }
}

