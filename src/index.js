document.addEventListener("DOMContentLoaded", function(){
  getToys()
  formSubmit()
  populateEditToyForm()
  editToy()
  updateLikes()
  removeToy()
})

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
// let addToy = false

// YOUR CODE HERE
function getToys(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(json => {
    json.forEach(function(toy){
      makeToy(toy)
    })
  })
}

function makeToy(toy){
  const allToysDiv = document.querySelector("#toy-collection")
  const divCard = document.createElement("div")
  divCard.className = "card"
  divCard.innerHTML =
  `<div data-id="${toy.id}">
  <h2>${toy.name}</h2>
  <img class="toy-avatar" src="${toy.image}" />
  <p>${parseInt(toy.likes)}</p>
  <button class="like-btn">Like <3</button>
  <button class="edit-btn">Edit</button>
  <button class="delete-btn">Remove</button>
  </div>`
  allToysDiv.append(divCard)
}

// addBtn.addEventListener('click', () => {
//   // hide & seek with the form
//   addToy = !addToy
//   if (addToy) {
//     toyForm.style.display = 'block'
//     // submit listener here
//   } else {
//     toyForm.style.display = 'none'
//   }
// })


// OR HERE!



function formSubmit(){
  const form = document.querySelector(".add-toy-form");
  form.addEventListener("submit", function(e){
      e.preventDefault();
      const inputName = document.querySelector("#input-name").value
      const inputImage = document.querySelector("#input-image").value

      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": inputName,
          "image": inputImage,
          "likes": 0
        })
      })
      .then(res => res.json())
      .then(toy => {
        makeToy(toy)
        form.reset()
      })
  })

}

function populateEditToyForm(){
  const allToysDiv = document.querySelector("#toy-collection")
  allToysDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")){
      document.querySelector(".edit-toy-form").style.display = 'block'
      let editBtn = e.target
      let parent = editBtn.parentNode

      let toyName = parent.querySelector("h2").innerText
      let toyImage = parent.querySelector("img").src
      let id = parent.dataset.id

      let inputName = document.querySelector("#edit-name")
      let inputImage = document.querySelector("#edit-image")
      let toyId = document.querySelector("#new-toy-id")

      inputName.value = toyName
      inputImage.value = toyImage
      toyId.value = id
  }
  })
}


function editToy(){
  let inputName = document.querySelector("#edit-name")
  let inputImage = document.querySelector("#edit-image")

  let editForm = document.querySelector(".edit-toy-form")
  editForm.addEventListener("submit", function(e){
    e.preventDefault()
    let toyId = document.querySelector("#new-toy-id").value
    let parentDiv = document.querySelector(`[data-id="${toyId}"]`)

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": inputName.value,
        "image": inputImage.value
      })
    }).then(res => {
        parentDiv.querySelector("h2").innerText = inputName.value
        parentDiv.querySelector("img").src = inputImage.value
        editForm.reset()
      })
  })
}



function updateLikes(){
  const allToysDiv = document.querySelector("#toy-collection")
  allToysDiv.addEventListener("click", function(e){
    if (e.target.classList.contains("like-btn")){
      let likeBtn = e.target
      let parent = likeBtn.parentNode

      let id = parent.dataset.id
      let likes = parent.querySelector("p").innerText
      let likesNum = parseInt(likes)

      fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": ++likesNum
          })
      }).then(res => res.json())
        .then(data => parent.querySelector("p").innerText = data.likes)
    }
  })

}


function addLikes(){
  document.addEventListener('click', function(e){
    if (e.target.className === 'like-btn'){
      let likeCount = e.target.previousElementSibling
      likeCount.innerText = parseInt(likeCount.innerText) + 1;
      updateLikes(e.target.dataset.id, parseInt(likeCount.innerText));
    }
  })
}

function removeToy(){
  const allToysDiv = document.querySelector("#toy-collection")
  allToysDiv.addEventListener("click", function(e){
    if (e.target.classList.contains("delete-btn")){
      console.log(e.target)
      let deleteBtn = e.target
      let parent = deleteBtn.parentNode
      let id = parent.dataset.id

      fetch(`http://localhost:3000/toys/${id}`, {
        method: 'DELETE'
      }).then(res => {
        parent.parentNode.remove()
      })
    }
  })
}
