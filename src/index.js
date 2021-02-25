import "./assets/styles/styles.scss";
import "./index.scss";

const articleContainer = document.querySelector(".articles-container");
function fecthies(){
    const promesse = fetch("https://restapi.fr/api/rahff2");

    promesse
      .then((response) => {
        const rep = response.json();
        rep.then((data) => {
          createArticle(data);
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
        <p class="article-author">${data.author}  -  ${data.category}</p>
        <p class="article-content">
         ${data.content}
        </p>
        <div class="article-action">
            <button class="btn btn-danger" data-id="${id}">Supprimer</button>`;
    return articleDom;
  });

  articleContainer.innerHTML = "";
  articleContainer.append(...articlesDom);
  const deleteBtns = articleContainer.querySelectorAll(".btn-danger");
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
