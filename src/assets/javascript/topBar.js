const buttonToggler = document.querySelector('#butt');
const navbarCollapse = document.querySelector('#ulNav');
const header = document.querySelector('header');
const item1 =document.querySelector('#item1');
const item2 =document.querySelector('#item2');

buttonToggler.addEventListener('click', () =>{
    if(window.innerWidth < 767){
      navbarCollapse.classList.toggle('navbar-toggler');
    
      header.classList.toggle('navbar');
      item1.classList.toggle('show');
      item2.classList.toggle('show');
     
  
    }
  })