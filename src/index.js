let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  //Manipulate DOM to display toys  
  function renderToy(toy){   
      //let toyDiv = document.getElementById('toy-collection')
      let card = document.createElement('div')
      card.className = 'card'
      //console.log(toyDiv);
      card.innerHTML = `    
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p><span id='likes'>${toy.likes}</span> Likes </p>
        <button class="like-btn" id="like">Like</button>
      `  
     
      //edit likes using PATCH
      // let likebutton = document.querySelector('.like-btn')
      // console.log(likebutton);
      card.querySelector('#like').addEventListener('click', (e)=>{
  //console.log(toy.likes);
      e.preventDefault
      toy.likes += 1
      card.querySelector('span').textContent = toy.likes
   updateLikes(toy) 
  

    })
    document.getElementById('toy-collection').appendChild(card)

   
  }

 

  //fetch toys
  function getToys(){
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toyData=>{
      console.log(toyData);
      toyData.forEach(toy => renderToy(toy))})
  }
  function initializetoys(){
    getToys()
  }
  initializetoys()
  //getToys()


  //POST toy

  document.querySelector('.add-toy-form').addEventListener('submit',handleSubmit)

  function handleSubmit(e){
    e.preventDefault()
    let toyObj = {
      name: e.target.querySelector('#toyName').value,
      image: e.target.querySelector('#toyImage').value,
      likes: 0

    }
    renderToy(toyObj)
    postToys(toyObj)
  }

  function postToys(toyObj){
    fetch('http://localhost:3000/toys',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toyObj)
    })
    .then(res => res.json())
    .then(toyData=>console.log(toyData))
  }


  //UPDATE
  function updateLikes(toyObj){
    fetch(`http://localhost:3000/toys/${toyObj.id}`,{
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toyObj)
    })
    .then(res => res.json())
    .then(toyData=>console.log(toyData))
  }

});
