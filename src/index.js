const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

// DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  createToy()
  updateToy()
})

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data => showToys(data))
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

function showToys(data) {
  const toyCollection = document.querySelector("#toy-collection")
  data.forEach(function(toy){
    const toyDiv = document.createElement("div")
    toyDiv.className = "card"
    toyDiv.innerHTML = `<h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn">Like <3</button><button class ="edit-btn">Edit</button>`
    toyCollection.prepend(toyDiv)
  })
}

function createToy() {
  const toyForm = document.querySelector(".add-toy-form")
  toyForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const inputName = e.target.querySelector("#inputName").value
    const inputImage = e.target.querySelector("#inputImage").value
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( {
        name: inputName,
        image: inputImage,
        likes: 0
      })
    }).then(fetchToys)
  })
}

function updateToy() {
  const toyCollection = document.querySelector("#toy-collection")
  const toyEditForm = document.querySelector(".edit-toy-form")
  let inputEditName = document.querySelector("#inputEditName").value
  let inputEditImage = document.querySelector("#inputEditImage").value
  toyCollection.addEventListener("click", function(e){
      if (e.target.className === "edit-btn") {
        let toyName = e.target.parentNode.querySelector("h2").innerText
        let toyImage = e.target.parentNode.querySelector("img").src

        inputEditName = toyName
        inputEditImage = toyImage

        toyForm.style.display = 'block'
      }
  })
}
