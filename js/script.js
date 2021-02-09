//Add items to the cart
let buttonBuyList = document.getElementsByClassName("buttonBuy");

for (let index = 0; index < buttonBuyList.length; index++) {
  let element = buttonBuyList[index];
  element.addEventListener("click", buyItem)
}

function buyItem(addItem) {
  let buttonBuy = addItem.target;
  buttonBuy.style.visivility = "hidden";
  alert(`Se agrego un item a tu carrito.`)
}
//Eliminating items from the cart
let buttonCancelList = document.getElementsByClassName("buttonCancel");

for (let index = 0; index < buttonCancelList.length; index++) {
  let element = buttonCancelList[index];
  element.addEventListener("click", cancelItem)
}

function cancelItem(eraseItem) {
  let buttonCancel = eraseItem.target;
  buttonCancel.style.visivility = "hidden";
  alert("Eliminaste un item de tu carrito");
}


//SWITCH
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






/* COMMENT SECTION (old code)
 //Carrito
let myCart =[];
let quantity = 1;

function Item(num, product, price) {
    this.num = num;
    this.product = product;
    this.price = price;
}

//Add to cart
function addToCart(num){
  if (quantity < 10 ){
      myCart.push(Item[num]);
      quantity = myCart.length;
      //visualize
      console.log(`Se ha agregado ${quantity} elementos a su carrito.`);
  } else {
      console.log("No hay mas stock");
  }
}
//Products
  let product1 = new Item(0, "Vainilla Brew", "$1000");
  let product2 = new Item(1, "Shangai Blend", "$1000");
  let product3 = new Item(2, "Colombian Blend","$1000");

*/