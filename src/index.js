document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys").then(res => res.json()).then(loadToysHandler);
});

function loadToysHandler(toys) {
  let divRoot = document.getElementById('toy-collection');

  for(toy of toys) {
    let divChild = document.createElement('div');
    let toyName = document.createElement('h2');
    let img_url = document.createElement("img");
    let pLikes = document.createElement("p");
    let btn = document.createElement("button");

    divChild.setAttribute("class", "card");
    divChild.setAttribute("data-id", toy.id);
    toyName.innerText = `${toy.name}`;
    img_url.src = `${toy.image}`;
    img_url.setAttribute("class", "toy-avatar");
    pLikes.innerText = `${toy.likes}`;
    btn.innerText = "Like <3";
    btn.setAttribute("class", "like-btn");
    btn.addEventListener("click", likesHandler);

    //add btn event listener

    divChild.appendChild(toyName);
    divChild.appendChild(img_url);
    divChild.appendChild(pLikes);
    divChild.appendChild(btn);
    divRoot.appendChild(divChild);
  }
}

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    document.querySelector(".add-toy-form").addEventListener("submit", addToyHandler);
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
function addToyHandler(e) {
  let toy_name = e.target.name.value;
  let toy_image = e.target.image.value;

  fetch("http://localhost:3000/toys",
    { method: "POST",
      headers: { "Content-Type": "application/json",
                "Accept": "application/json" },
      body: JSON.stringify({ name: toy_name, image: toy_image, likes: 0})
    }).then(res => res.json()).then(loadToysHandler);

}

function likesHandler(e) {
  let divRoot = document.getElementById('toy-collection');
  let toyID = parseInt(e.target.parentElement.dataset.id);
  let totLikes = parseInt(e.target.parentElement.children[2].innerText) + 1;
  // debugger;


  fetch(`http://localhost:3000/toys/${toyID}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({likes: totLikes})
  })
  window.location.reload();
}
