//Carrito
let cart =[];
let quantity = 0;

function Item(product, price) {
    this.product = product;
    this.price = price;
    this.buy = function () { return `Se ha agregado ${product} a su carrito.`};
}
//Products
  let product1 = new Item("Vainilla Brew", "$1000");
  let product2 = new Item("Shangai Blend", "$1000");
  let product3 = new Item("Colombian Blend","$1000");
//visualize (this lines will be eliminated)
console.log(product1.buy()); 
console.log(product2.buy());
console.log(product3.buy());