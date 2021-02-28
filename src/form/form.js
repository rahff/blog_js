import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector("form");
let errors = [];
const errorElement = document.querySelector("#errors");
const buttonCancel = document.querySelector('.btn-secondary');
let articleId;

const fillForm = (article)=>{
  const author = document.querySelector('input[name="author"]');
  const img = document.querySelector('input[name="img"]');
  const category = document.querySelector('input[name="category"]');
  const title = document.querySelector('input[name="title"]');
  const content = document.querySelector('textarea');
  author.value = article.author || '';
  img.value = article.img || '';
  title.value = article.title || '';
  category.value = article.category || '';
  content.value = article.content || '';
}

const initForm = async () =>{
  const params = new URL(location.href);
  articleId = params.searchParams.get('id');
  if(articleId){
    const response = await fetch(`https://restapi.fr/api/rahff2/${articleId}`);
    if(response.status < 300){
      const article = await response.json();
      fillForm(article);
    }
  }
}
initForm();


buttonCancel.addEventListener('click',()=>{
  location.assign("./index.html");
})
form.addEventListener("submit",  (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const article = Object.fromEntries(data.entries());
  if (formIsValid(article)) {
    
      const json = JSON.stringify(article);
      let response;
      if(articleId){
        response = fetch(`https://restapi.fr/api/rahff2/${articleId}`, {
          method: "PATCH",
          body:json,
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response)=>{
          if(response.status < 299){
            location.assign("./index.html");
        }
        }).catch((err)=>{
          console.log(err)
        })
        
      }
        else{
           response = fetch("https://restapi.fr/api/rahff2", {
            method: "POST",
            body:json,
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response)=>{
            if(response.status < 299){
              location.assign("./index.html");
          }
          }).catch((err)=>{
            console.log(err)
          })
        
        }
       
     
    
      }
   
    })
const formIsValid = (article) => {
  errors =[];
  if (!article.author || !article.category ||
     !article.content || !article.title || !article.img) {
    errors.push("Vous devez renseigner tous les champs");
  } else {
    errors = [];
  }
  if (errors.length) {
    let textError = "";
    errors.forEach((e) => {
      textError += `<li>${e}</li>`;
    });
    errorElement.innerHTML = textError;
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
}
