import "./assets/styles/styles.scss";
import "./index.scss";

const articleContainer = document.querySelector(".articles-container");
const categoriesContainer =document.querySelector('.categories-container');
function fecthies(){
    const promesse = fetch("https://restapi.fr/api/rahff2");

    promesse
      .then((response) => {
        const rep = response.json();
        rep.then((data) => {
          createArticle(data);
          createMenuCategory(data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
};
fecthies();

const createArticle = (data) => {
 
  const articlesDom = data.map((data) => {
    let id = data._id;
    const articleDom = document.createElement("div");
    articleDom.classList.add("article");
    articleDom.innerHTML = `<img src="${data.img}" alt="profile">
        <h2>${data.title}</h2>
        <p class="article-author">${data.author} - ${(new Date(data.createdAt)).toLocaleDateString("fr-FR",
        {weekday:"long",
      day:"2-digit",
    month:"long",
  year:'numeric'})}</p>
        <p class="article-content">
         ${data.content}
        </p>
        <div class="article-action">
        <button class="btn btn-danger" data-id="${id}">Supprimer</button>
        <button class="btn btn-primary" data-id="${id}">Modifier</button>`;

    return articleDom;
  });

  articleContainer.innerHTML = "";
  articleContainer.append(...articlesDom);
  const deleteBtns = articleContainer.querySelectorAll(".btn-danger");
  const editBtns = articleContainer.querySelectorAll(".btn-primary");
  editBtns.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
      const target = e.target;
      const articleId = target.dataset.id;
      location.assign(`./form.html?id=${articleId}`)
    })
  })
  deleteBtns.forEach((btns) => {
    btns.addEventListener("click",(e) => {
      try {
        const target = e.target;
        const id = target.dataset.id;
        const response =fetch(
          `https://restapi.fr/api/rahff2/${id}`,
          {
            method: "DELETE",
          }
        );
        const body = response.then((resp) =>{
            console.log(resp);
            fecthies();
        });
        
      } catch (e) {
        console.log(e);
      }
    });
  });
};
function createMenuCategory(data){
  const categories = data.reduce((acc,value)=>{
    if(acc[value.category]){
      acc[value.category]++;
    }else{
      acc[value.category]=1;
    } 
   return acc;
  },{})
  const arrayCategory = Object.keys(categories).map((category)=>{
    return [category,categories[category]];
   
  });
  displayMenuCategory(arrayCategory);
}

function displayMenuCategory(arrayCategory){

  const liElement = arrayCategory.map((truc)=>{
    const li = document.createElement('li');
    li.innerHTML = `${truc[0]} <strong>( ${truc[1]} )</strong>`;
    return li;
  })
  categoriesContainer.innerHTML=``;
  categoriesContainer.append(...liElement);
 
}