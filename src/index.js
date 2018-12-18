const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;
let div = document.getElementById("toy-collection");

// YOUR CODE HERE
div.addEventListener("click", function(event) {
  // debugger;
  if (event.target.type === "button") {
    let toyId = event.target.dataset.id;
    let totalLikes = event.target.parentNode.querySelector("p").innerText;
    let parsedTotal = parseInt(totalLikes) + 1;
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({
        likes: parsedTotal
      })
    });
    event.target.parentNode.querySelector("p").innerText =
      `${parsedTotal}` + " " + "Likes";
  }
});
let toyCollection = document.querySelector("#toy-collection");
document.addEventListener("DOMContentLoaded", function() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => showToys(toys));
});

function showToys(toys) {
  toys.forEach(function(toy) {
    // let tag = document.createElement("div");
    // tag.className = "card";
    let eachToy = `  <div class="card">
                        <h2>${toy.name}</h2>
                        <img src=${toy.image} class="toy-avatar" />
                        <p>${toy.likes} Likes </p>
                        <button type="button" class="like-btn" data-id=${
                          toy.id
                        }>Like <3</button>
                    </div>`;
    div.innerHTML += eachToy;
  });
}
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    // submit listener here
  } else {
    toyForm.style.display = "none";
  }
});

let createToyForm = document.querySelector(".add-toy-form");
createToyForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const inputText = createToyForm.querySelector(".input-text").value;
  const inputImage = createToyForm.querySelector(".input-image").value;

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify({ name: inputText, image: inputImage, likes: 0 })
  })
    .then(res => res.json())
    .then(addToyInDom);
  event.target.reset();
});

function addToyInDom(toy) {
  const div = document.createElement("div");
  div.innerHTML = `  <div class="card">
                      <h2>${toy.name}</h2>
                      <img src=${toy.image} class="toy-avatar" />
                      <p>${toy.likes} Likes </p>
                      <button class="like-btn" data-id=${
                        toy.id
                      }>Like <3</button>
                  </div>`;
  toyCollection.appendChild(div);
}
// OR HERE!
