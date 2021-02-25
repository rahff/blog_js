import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector("form");
let errors = [];
const errorElement = document.querySelector("#errors");

form.addEventListener("submit",  (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const article = Object.fromEntries(data.entries());
  if (formIsValid(article)) {
    try {
      const json = JSON.stringify(article);
      const promesse = fetch("https://restapi.fr/api/rahff2", {
        method: "POST",
        body:json,
        headers: {
          "Content-Type": "application/json",
        },

      });
      const response = promesse.then((response) =>{
          console.log(response);
      })
     
    } catch (e) {
      console.log("error :", e);
    }
  }
});
const formIsValid = (article) => {
  if (!article.author || !article.category || !article.content || !article.title || !article.img) {
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
    return true
  }
};
