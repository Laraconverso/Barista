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
    if (quantity < 5 ){
        myCart.push(Item[num]);
        quantity = myCart.length;
        //visualize
        console.log("Se ha agregado", product, "a su carrito.");
        console.log(Item.values(product));
    } else {
        alert("No hay mas stock");
    }
}


for (let index=0; index < quantity; index++) {
  const element = new Item("Item Numero " + index);
  myCart.push(product1);
  myCart.push(product2);
  myCart.push(product3);
}
//visualize
console.log(myCart);