const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const createToy = document.querySelector('.submit');
const parentDiv = document.getElementById('toy-collection')

let addToy = false

// EVENT LISTENERS
createToy.addEventListener('click', addNewToy);
parentDiv.addEventListener('click', addLikes);

function addLikes(e) {
  if (e.target.className === "like-btn") {
    let likes = parseInt(e.target.previousElementSibling.lastElementChild.innerText)
    e.target.previousElementSibling.lastElementChild.innerText = likes + 1
  }
}


function addNewToy(e) {
  const input = document.querySelectorAll('.input-text');
  postToys(input[0].value, input[1].value, 0);
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

// READ DATA FROM JSON
async function getToys() {
  const response = await fetch('http://localhost:3000/toys');
  const data = await response.json();
  console.log(data);
  return data;
}

// CREATE NEW TOY (post)
async function postToys(name, image, likes) {
  console.log(name, image, likes)
  const response = await fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ name: name, image: image, likes: likes })
  });
  const resdata = await response.json();
  return resdata;
}

// LOAD TOYS
getToys().then(toys => {
  let output = '';
  console.log(toys)
  toys.forEach(function (toy) {
    output += toyCard(toy.name, toy.image, toy.likes)
  });
  document.getElementById('toy-collection').innerHTML = (output);
})

// CREATE TOY CARD UI
function toyCard(name, image, likes) {
  return `<div class="card">
          <h2>${name}</h2>
          <img src=${image} class="toy-avatar"/>
          <p>Likes:<span>${likes}</span></p>
          <button class="like-btn">Like</button>
          </div>
          `
}




