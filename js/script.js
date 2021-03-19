//DeclareCart & Buttons 
var cart = [];
var botones = [];

// variables
let capsulas = document.querySelector(".products"); //Showing the products in the Page
let btn = document.querySelector(".btn"); //visualize/open cart button
let DOM = document.querySelector(".cart"); //CartDOM (strutcture)
let sideBar = document.querySelector(".sideBar");//SideBar Logic 
let content = document.querySelector(".content"); // Adding Items and removing them
let items = document.querySelector(".items");//Whats in the Cart
let clearAllBtn = document.querySelector(".clear");//Remove all the items from the cart button
let total = document.querySelector(".total");//Calculating the total checkout
let closeBtn = document.querySelector(".close");//Close/hide cart button
let keepB = document.querySelector(".keepB"); //Keep buying button


//Setting up the Customer view
class Customer {

    //Display  each product 
    displayProducts(products) {
      let result = "";
      products.forEach(product => {
        result +=
         `
          <article class="product">
            <div class="photo">
                <img src=${product.image} alt="product" class="product-img"/>
                <button class="bag-btn" data-id=${product.id}>
                    <i class="fas fa-shopping-cart"></i>agregar
                </button>
            </div>
            <hr>
            <h3 id="inf">${product.title} (10u)</h3>
            <h4>$${product.price}</h4>
          </article>
          <!-- end of single product -->
        `;
      });
      capsulas.innerHTML = result;
    }

    //Add Item Buttons 
    getBagButtons() {
      let buttons = [...$(".bag-btn")];
      botones = buttons;
      buttons.forEach(button => {
        let id = button.dataset.id;

        let inCart = cart.find(item => item.id === id);
  
        if (inCart) {
          button.innerText = "Agregado";
          button.disabled = true;
        }
        $(button).on("click", event => {
          // disable bag-button
          event.target.innerText = "Agregado";
          event.target.disabled = true;
          // addint item to cart
          let cartItem = { ...Storage.getProduct(id), amount: 1 };
          cart = [...cart, cartItem];
          Storage.saveCart(cart);
          // add to DOM (in cart)
          this.setCartValues(cart);
          this.addCartItem(cartItem);
          this.showCart();
        });
      });
    }

    //Checkout total
    setCartValues(cart) {
      let tempTotal = 0;
      let itemsTotal = 0;
      cart.map(item => {
        tempTotal += item.price * item.amount;
        itemsTotal += item.amount;
      });
      total.innerText = parseFloat(tempTotal.toFixed(2));
      items.innerText = itemsTotal;
    }
  
    addCartItem(item) {
      let div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = 
        `
        <img src=${item.image} alt="product" />
        <div>
            <h4>${item.title} (10u)</h4>
            <h5>$${item.price}</h5>
            <span class="remove-item" data-id=${item.id}>Eliminar</span>
        </div>
        <div>
            <i class="fas fa-chevron-up" data-id=${item.id}></i>
            <p class="item-amount">${item.amount}</p>
            <i class="fas fa-chevron-down" data-id=${item.id}></i>
        </div>
      `;
      content.appendChild(div);
    }

    //Cart SideBar show
    showCart() {
      $(sideBar).addClass("transparentBcg");
      $(DOM).addClass("showCart");
    }

    //Setting up the Cart SideBar
    CART() {
      cart = Storage.getCart();
      this.setCartValues(cart);
      this.addItem(cart);
      $(btn).on("click", this.showCart);
      $(closeBtn).click(this.closeCart);
      $(keepB).click(this.closeCart);
    }

    //Adding item
    addItem(cart) {
      cart.forEach(item => this.addCartItem(item));
    }

    //Close Cart
    closeCart() {
      $(sideBar).removeClass("transparentBcg");
      $(DOM).removeClass("showCart");
    }

    //Cart Logic
    logica() {

      //clear cart button  
      $(clearAllBtn).click(() => {
        this.clearCart();
      });

      //Cart Content and Single Items (in Cart) Action 
      $(content).click( event => {
        if (event.target.classList.contains("remove-item")) {
          let removeItem = event.target;
          let id = removeItem.dataset.id;
          content.removeChild(removeItem.parentElement.parentElement);
          // remove item
          this.removeItem(id);
        } 
        //add one single item (qnty)
        else if (event.target.classList.contains("fa-chevron-up")) { //Adding Single Item
          let addAmount = event.target;
          let id = addAmount.dataset.id;
          let tempItem = cart.find(item => item.id === id);
          tempItem.amount = tempItem.amount + 1;

          //updating storage
          Storage.saveCart(cart);
          this.setCartValues(cart);
          addAmount.nextElementSibling.innerText = tempItem.amount;
        } 
        //erase one single item (qnty)
        else if (event.target.classList.contains("fa-chevron-down")) { //Removing Single Item
          let lowerAmount = event.target;
          let id = lowerAmount.dataset.id;
          let tempItem = cart.find(item => item.id === id);
          tempItem.amount = tempItem.amount - 1;
          if (tempItem.amount > 0) {

              //updating storage
            Storage.saveCart(cart);
            this.setCartValues(cart);
            lowerAmount.previousElementSibling.innerText = tempItem.amount;
          } else {
            content.removeChild(lowerAmount.parentElement.parentElement);
            this.removeItem(id);
          }
        }
      });
    }

    //clear (All) cart
    clearCart() {
      // console.log(this);
      let items = cart.map(item => item.id);
      items.forEach(id => this.removeItem(id));
      while (content.children.length > 0) {
        content.removeChild(content.children[0]);
      }
      this.closeCart();
    }

    //removing items 
    removeItem(id) {
      cart = cart.filter(item => item.id !== id);
      this.setCartValues(cart);
      Storage.saveCart(cart);
      let button = this.getSingleButton(id);
      button.disabled = false;
      button.innerHTML = `<i class="fas fa-shopping-cart"></i>agregar`;
    }
    getSingleButton(id) {
      return botones.find(button => button.dataset.id === id);
    }
}

//Mercado Pago button  
$(document).ready(function() {
    $('#mercadoPago').hide();
    $('#formu').hide();
    $('#cancelar').hide();
    $('#question').hide();
    $('#mercadopago').hide();
      $('#end').click(function(){
        $('.content').hide();
        $('#end').hide();
        $('#mercadopago').hide();
        $('#vaciar').hide();
        $('.close').hide();
        $('#formu').show();
        $('#question').show();
        $('#cancelar').show();
          });
      $('#cancelar').click(function(){
        $('#formu').hide();
        $('#mercadopago').hide();
        $('#question').hide();
        $('#cancelar').hide();
        $('.close').show();
        $('.content').show();
        $('#end').show();
        $('#vaciar').show();
          });
      $('#question').click(function(){
        $('#formu').hide();
        $('#question').hide();
        $('.close').hide();
        $('.content').hide();
        $('#end').hide();
        $('#vaciar').hide();
        $('#cancelar').show();
        $('#mercadopago').show();
        });
});

/* PRUEBA
function end() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("end").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "info.txt", true);
  xhttp.send();
}
*/


//Getting the products from Json 
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
          return {title,price,id,image};
        });
        return products;
      } catch(error) {
        console.log(error);
      }
    }
  }


//Local storage
class Storage {
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


//Customer view
$(document).ready(() => {
  let customer = new Customer();
  let products = new Products();
  customer.CART();

  // Display all products
  products
    .getProducts().then(products => {
      customer.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      customer.getBagButtons();
      customer.logica();
    });
});

//By Lara Converso