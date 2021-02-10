//Variables
let cartBtn= document.querySelector(".cart-btn");
let closeCartBtn = document.querySelector(".close-cart");
let clearCartBtn = document.querySelector(".clear-cart");
let cartItems = document.querySelector(".cart-items");
let cartTotal = document.querySelector(".cart-total");
let productsDOM = document.querySelector(".products-center");

//Carrito
let myCart =[];

//Getting the products
class Products{
  async getProducts(){
    try{
      let result = await fetch('js/stock.json')
      let data = await result.json();

      let products = data.items;
      products = products.map(item => {
        let{title,price} = item.fields;
        let{id} = item.sys;
        let image = item.fields.image.fields.file.url;
        return {title, price,id,image}
      })
      return products;
    } catch(error) {
      console.log(error);
    }
  }
}

//Display products
class Customer{
  displayProducts(products){
    let result = '';
    products.forEach(product => {
      result += `
      <!--single article-->
        <article class="product">
          <div class="img-container">
            <img src=${product.image} alt="producto" class="product-img">
              <button class="bag-btn" data-id=${product.id}>
                <i class="fas fa-shopping-cart"></i>
                  agregar
              </button>
          </div>
          <h5>${product.title}/h5>
          <h6>${product.price}</h6>
        </article>
      `
    });
    productsDOM.innerHTML = result;
  }
}

//Local storage
class Storage{

}

document.addEventListener("DOMContentLoaded" , () => {
  let customer = new Customer();
  let products = new Products();

  //get stock 
  products.getProducts().then(products => customer.displayProducts(products));
});
      

//OLD CODE
/*let quantity = 1;

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
//Products
class Products {
  async getProducts (){
    try {
      let result = await fetch("atock.json");
      let data = await result.json();
      let products = data.items;
      products = products.map(item => {
      let {title,price} = item.fields;
      let {id} = item.sys
      let image = item.fields.image.fields.file.url;
      return {title, price, id, image}
    })
      return products
    }   catch(error){
      console.log(error);
    }
  }
}
*/