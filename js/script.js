//Carrito
let myCart =[];
let quantity = 1;

function Item(num, product, price) {
    this.num = num;
    this.product = product;
    this.price = price;
}
//Products
  let product1 = new Item(0, "Vainilla Brew", "$1000");
  let product2 = new Item(1, "Shangai Blend", "$1000");
  let product3 = new Item(2, "Colombian Blend","$1000");

//Add to cart
function addToCart(num){
  if (quantity > 10 ){
      myCart.push(Item[num]);
      quantity = myCart.length;
      //visualize
      console.log(`Se ha agregado ${quantity} a su carrito.`);
  } else {
      console.log("No hay mas stock");
  }
}

//Add items to the cart
let buttonBuyList = document.getElementsByClassName("buttonBuy");

for (let index = 0; index < buttonBuyList.length; index++) {
  let element = buttonBuyList[index];
  element.addEventListener("click", buyItem)
}

function buyItem(addItem) {
  let buttonBuy = addItem.target;
  buttonBuy.style.visivility = "hidden";
}
//Eliminating items from the cart
let buttonCancelList = document.getElementsByClassName("button cancel");

for (let index = 0; index < buttonCancelList.length; index++) {
  let element = buttonCancelList[index];
  element.addEventListener("click", cancelItem)
}

function cancelItem(eraseItem) {
  let buttonCancel = eraseItem.target;
  buttonCancel.style.visivility = "hidden";
  alert("Eliminaste un item de tu carrito");
}