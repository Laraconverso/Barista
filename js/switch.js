//Dark mode and light mode switch
let btnSwitch =  document.querySelector('#switch');
btnSwitch.addEventListener('click',() =>{
  document.body.classList.toggle('dark');
  btnSwitch.classList.toggle('active');  
//Guardamos el modo en local storage
if(document.body.classList.contains('dark')){
      localStorage.setItem('dark-mode', 'true');
  } else{
      localStorage.setItem('dark-mode', 'false');
  }
});
//Obtenemos el modo actual.
if(localStorage.getItem('dark-mode') === 'true'){
  document.body.classList.add('dark'); 
  btnSwitch.classList.add('active');
} else {
  document.body.classList.remove('dark');
  btnSwitch.classList.remove('active');
}

/*
TO DO LIST:
-agregar descripcion del producto y precio
-agregar seccion del carrito y visualizar la cuenta 
-Agregar funcion que suma los precios 
-Agregar las fotos de los productos
-agregar foto de bienvenida al sitio(+)
*/