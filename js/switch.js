//Dark mode and light mode switch
let btnSwitch =  document.querySelector('#switch');
btnSwitch.addEventListener('click',() =>{
  document.body.classList.toggle('dark');
  btnSwitch.classList.toggle('active');  
//Guardamos el modo en local storage
if(document.body.classList.contains('dark')){
      localStorage.setItem('dark-mode', 'true');
  } else{
      localStorage.setItem('dark-mode', 'true');
  }
});
//Obtenemos el modo actual.
if(localStorage.getItem('dark-mode') === true){
  document.body.classList.toggle('dark'); 
  btnSwitch.classList.add('active');
} else {
  document.body.classList.add('light');
  btnSwitch.classList.remove('active');
}