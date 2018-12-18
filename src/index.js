const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toysCollection = document.getElementById('toy-collection')
const newToyForm = document.querySelector('.add-toy-form')
const toyDiv = document.getElementsByClassName('card')
newToyForm.addEventListener('submit', addNewToy)
let addToy = false

// YOUR CODE HERE
  toysCollection.addEventListener('click', likes)
function likes(event) {
  if (event.target.tagName === 'BUTTON') {
    const toyId = event.target.parentNode.dataset.id
    let likeAmount = parseInt(event.target.parentNode.children[2].innerText) + 1
    fetch(`http://localhost:3000/toys/${ toyId }`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: likeAmount
      })
    })
     event.target.parentNode.children[2].innerText = likeAmount
  }
}



function addNewToy(event) {
  event.preventDefault()
  const nameInput = event.target.name.value
  const imageInput = event.target.image.value
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: nameInput,
      image: imageInput,
      likes: 0
    })
  }).then(res => res.json()).then(addToToys)


}
function addToToys(response) {
  const divCont = document.createElement('div')
  divCont.setAttribute('class', 'card')
  const headerTag = document.createElement('h2')
  const imageTag = document.createElement('img')
  imageTag.setAttribute('class', 'toy-avatar')
  const paragraphTag = document.createElement('p')
  const buttonTag = document.createElement('button')
  buttonTag.setAttribute('class', 'like-button')
  buttonTag.innerText = 'Like <3'
  headerTag.innerText = response.name;
  imageTag.src = response.image;
  paragraphTag.innerText = response.likes;
  divCont.appendChild(headerTag);
  divCont.appendChild(imageTag);
  divCont.appendChild(paragraphTag);
  divCont.appendChild(buttonTag);
  toysCollection.appendChild(divCont);
  const toyNameInput = document.getElementById('toy-name')
  const toyImageInput = document.getElementById('toy-img')
  toyNameInput.value = ""
  toyImageInput.value = ""
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

fetch("http://localhost:3000/toys")
.then(res => res.json())
.then(renderToys)

// OR HERE!
function renderToys(toysData) {
  toysData.forEach(toy => {
    const divCont = document.createElement('div')
    divCont.dataset.id = toy.id
    divCont.setAttribute('class', 'card')
    const headerTag = document.createElement('h2')
    const imageTag = document.createElement('img')
    imageTag.setAttribute('class', 'toy-avatar')
    const paragraphTag = document.createElement('p')
    const buttonTag = document.createElement('button')
    buttonTag.setAttribute('class', 'like-button')
    buttonTag.innerText = 'Like <3'
    headerTag.innerText = toy.name;
    imageTag.src = toy.image;
    paragraphTag.innerText = toy.likes;
    divCont.appendChild(headerTag);
    divCont.appendChild(imageTag);
    divCont.appendChild(paragraphTag);
    divCont.appendChild(buttonTag);
    toysCollection.appendChild(divCont);
  });
}
