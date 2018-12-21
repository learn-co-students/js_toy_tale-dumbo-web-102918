// document.addEventListener('DOMContentLoaded', () => {

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false


// // YOUR CODE HERE
//   const toyCollection = document.getElementById("toy-collection")
// //console.log(toyCollection)

//   toys = "";
//   toyId = "";
// // 
//   function fetchToys() {
//     fetch("http://localhost:3000/toys")
//       .then(response => response.json())
//         .then(data => showToys(data))
//   }

//   function showToys(data) {
//     console.log(data)
//     data.forEach(function(toy) {
//       const newToy = document.createElement("div")
//       newToy.setAttribute("class", "card")
//       newToy.innerHTML=`
//         <h2>${toy.name}</h2>
//        <img src="${toy.image}" class="toy-avatar" />
//        <p class='toy-likes'>${toy.likes} </p>
//        <button data-id="${toy.id}" class="like-btn">Like <3</button>
//       `
//        toyCollection.appendChild(newToy)
//   })
//   }



//   addBtn.addEventListener('click', () => {
//     // hide & seek with the form
//     addToy = !addToy
//     if (addToy) {
//       toyForm.style.display = 'block'
//       // submit listener here
//     } else {
//       toyForm.style.display = 'none'
//     }
//   })

//   newToy(event)
//   newLike(event)

  

// });


// function newToy() {
//   let submitButton = document.getElementById("createNewToy")
  
//   submitButton.addEventListener('click', createToy);
// }

// function createToy(event) {
//   event.preventDefault()
//   console.log("hi")
//   let newName = document.getElementById("newToyName").value 
//   let newImage = document.getElementById("newToyImage").value 
//   // let likeButton = document.querySelector('like-btn')
//   const toyCollection = document.getElementById("toy-collection")
//   const newToy = document.createElement('div')
//   console.log(newToy)
//   newToy.setAttribute("class", "card")
//   newToy.innerHTML = `
//     <h2>${newName}</h2>
//     <img src="${newImage}" class="toy-avatar" />
//     <p class='toy-likes'> 0 </p>
//     <button data-id="${toy.id}" class="like-btn">Like <3</button>
//   `
//   toyCollection.append(newToy)
//   saveToy(newName, newImage)
// }

// function saveToy(newName, newImage) {
//   console.log(newName, newImage)
//   fetch("http://localhost:3000/toys", {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     name: newName,
//     image: newImage,
//     likes: 0
//     })
//   })
//   .then(response => console.log(response.json()))
//   // .then(data => console.log(data))
// }


// function newLike(){
//   const toyCollection = document.getElementById('toy-collection')

//   toyCollection.addEventListener('click', function(){
//     if (event.target.classList.contains('like-btn')){
      
//       let divCard = event.target.parentNode
//       let toyLikes = event.target.parentNode.querySelector('.toy-likes')
//       let toyId = parseInt(event.target.dataset.id)
//       let numberLikes = parseInt(divCard.querySelector('.toy-likes').innerText)
      
//       function plusOne() {
//         let numberPlus = numberLikes + 1
//         return numberPlus
//       }
//       // optimistically render +1 likes
//       // toyLikes.innerText = plusOne()
//       //pass that number into createLike function
//       createLike(plusOne(), toyId, toyLikes)
//     }
//   })
// };

// function createLike(plusOneVal, toyId, nodeToUpdate){
//   fetch(`http://localhost:3000/toys/${toyId}`, {
//     method: "PATCH",
//     headers:  { "Content-Type": "Application/json" },
//     body: JSON.stringify({
//       likes : plusOneVal
//     })
//   }).then(response => {
//     if (response.ok) {
//       nodeToUpdate.innerText = plusOneVal;
//     }
//   })

// }

//REVIEW

//STEP 1: Render all of the toys

let toyCollection = document.getElementById('toy-collection')

document.addEventListener('DOMContentLoaded', getToys)

function getToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => {
    data.forEach(toy => renderToy(toy))
  })
}

function renderToy(toy) {
  //creating and appending our DOM elements
  let toyCollection = document.getElementById('toy-collection')
  let toyDiv = document.createElement('div')
  toyDiv.className = 'card'
  toyDiv.dataset.id = toy.id 

  let h2 = document.createElement('h2')
    h2.innerText = toy.name
  let img = document.createElement('img')
    img.src = toy.image
    img.className = 'toy-avatar'
  let p = document.createElement('p')
    p.innerText = `${toy.likes} likes`
  let button = document.createElement('button')
    button.innerText = 'like <3'
    button.className = 'like-btn' 

toyCollection.appendChild(toyDiv)

    toyDiv.appendChild(h2)
    toyDiv.appendChild(img)
    toyDiv.appendChild(p)
    toyDiv.appendChild(button)
}

//STEP 2: Create a toy
let newToyForm = document.querySelector('.add-toy-form')
newToyForm.addEventListener('submit', inputHandler) 
function inputHandler(event) {
  let name = newToyForm.elements.namedItem('name').value
  let img = newToyForm.image.value 

  if (name === '' || img === ''){
    alert('Fill in both fields')
  } else {
    postToy(name, img)
  }
}

function postToy(name, img) {
  //post fetch
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify ({
      name: name,
      image: img,
      likes: 0
    })
  })
  .then(response => response.json())
  .then(data => {
    renderToy(data)
    newToyForm.reset()
   // window.scrollTo(0, document.body.scrollHeight)
  })
}

//STEP 3: Increase likes
toyCollection.addEventListener('click', function(event) {
  if(event.target.classList.contains('like-btn')){
    increaseLikes(event)
  }
}) 

function increaseLikes(event) {
  let likeButton = event.target
  let toyDiv = likeButton.parentNode
  let toyId = toyDiv.dataset.id
  let likesNumber = toyDiv.querySelector('p').innerText.split(' ')[0]
  
  likesNumber++;
  updateLikes(likesNumber, toyId)
}

function updateLikes(likes, id){
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      likes: likes
    })
  })
  .then(response => response.json())
  .then(singleToy => {
    let toyToUpdate = document.querySelector(`[data-id = ${id}]`)
    toyToUpdate.querySelector('p').innerText = `${likes} likes`
  })

}