//Variables
let cartBtn= document.querySelector(".cart-btn");
let closeCartBtn = document.querySelector(".close-cart");
let clearCartBtn = document.querySelector(".clear-cart");
let cartDOM = document.querySelector(".cart");
let cartOverlay = document.querySelector(".cart-overlay");
let cartItems = document.querySelector(".cart-items");
let cartTotal = document.querySelector(".cart-total");
let cartContent = document.querySelector(".cart-content");
let productsDOM = document.querySelector(".products-center");

//Carrito
let cart =[];
let buttonsDOM = [];

//Getting the products
class Products{
  async getProducts(){
    try{
      let result = await fetch('js/stock.json')
      let data = await result.json();
    
      let products = data.items;
      console.log(products);
      products = products.map(item => {
        let{title,price} = item.fields;
        let{id} = item.sys;
        let image = item.fields.image.fields.file.url;
        return {title,price,id,image};
      });
      return products;
    } catch(error) {
      console.log(error);
    }
  }
}

//Display products
class Customer{
    displayProducts(products) {
        let result = "";
        products.forEach(product => {
          result += `
          <article class="product">
            <div class="img-container">
                <img src="img/productModel.png" alt="product" class="product-img"/>
                <button class="bag-btn" data-id=${product.id}>
                    <i class="fas fa-shopping-cart"></i>
                    agregar
                </button>
            </div>
            <h3>${product.title}</h3>
            <h4>$${product.price}</h4>
          </article>
       `;
        });
        productsDOM.innerHTML = result;
      }
  getBagButtons() {
    let buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsDOM = buttons;
    buttons.forEach(button => {
      let id = button.dataset.id;
      let inCart = cart.find(item => item.id === id);

      if (inCart) {
        button.innerText = "Agregado";
        button.disabled = true;
      }
      button.addEventListener("click", event => {
        // disable button
        event.target.innerText = "Agregado";
        event.target.disabled = true;
        // add to cart
        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        cart = [...cart, cartItem];
        Storage.saveCart(cart);
        // add to DOM
        this.setCartValues(cart);
        this.addCartItem(cartItem);
        this.showCart();
      });
    });
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map(item => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }

  addCartItem(item) {
    let div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = 
    `<img src=${item.image} alt="product">
      <div>
        <h4>${item.title}</h4>
        <h5>${item.price}</h5>
        <span class="remove-item" data-id${item.id}>Eliminar</span>
      </div>
      <div>
        <i class="fas fa-chevron-up" data-id=${item.id}></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fas fa-chevron-down" ${item.id}></i>
      </div>
    `;
    cartContent.appendChild(div);
  }
  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
  }
  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartBtn.addEventListener("click", this.showCart);
    closeCartBtn.addEventListener("click", this.hideCart);
  }
  populateCart(cart) {
    cart.forEach(item => this.addCartItem(item));
  }
  hideCart() {
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
  }

//FALTA PENSAR LA LOGICA DEL CARRITO
cartLogic() {
    clearCartBtn.addEventListener("click", () => {
      this.clearCart();
    });
    cartContent.addEventListener("click", event => {
      if (event.target.classList.contains("remove-item")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cartContent.removeChild(removeItem.parentElement.parentElement);
        // remove item
        this.removeItem(id);
      } else if (event.target.classList.contains("fa-chevron-up")) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains("fa-chevron-down")) {
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount = tempItem.amount - 1;
        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lowerAmount.previousElementSibling.innerText = tempItem.amount;
        } else {
          cartContent.removeChild(lowerAmount.parentElement.parentElement);
          this.removeItem(id);
        }
      }
    });
  }
  clearCart() {
    // console.log(this);
    let cartItems = cart.map(item => item.id);
    cartItems.forEach(id => this.removeItem(id));
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
    this.hideCart();
  }
  removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `<i class="fas fa-shopping-cart"></i>agregar`;
  }
  getSingleButton(id) {
    return buttonsDOM.find(button => button.dataset.id === id);
  }
}

//Local storage
class Storage{
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    static getCart() {
        return localStorage.getItem("cart")
          ? JSON.parse(localStorage.getItem("cart"))
          : [];
    }
}

document.addEventListener("DOMContentLoaded" , () => {
  let customer = new Customer();
  let products = new Products();
  customer.setupAPP();
  //get stock 
  products.getProducts().then(products => {
      customer.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      customer.getBagButtons();
      customer.cartLogic();
    });
});
      



//By Lara Converso