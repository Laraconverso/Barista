//Cart & Buttons 
var carrito =[];
var botones  = [];

//Variables
let capsulas = document.querySelector(".products"); //Showing the products in the Page
let btn= document.querySelector(".btn"); //visualize/open cart button
let cDOM = document.querySelector(".cart"); //CartDOM (strutcture)
let sideBar = document.querySelector(".sideBar"); //SideBar Logic 
let content = document.querySelector(".content"); // Adding Items and removing them
let items = document.querySelector(".items"); //Whats in the Cart
let clearAllBtn = document.querySelector(".clear"); //Remove all the items from the cart button
let totalCh = document.querySelector(".total"); //Calculating the total checkout
let closeBtn = document.querySelector(".close"); //close/hide cart button



//Setting up the Customer view
class Customer{

  //Display Products 
    displayProducts(products) {
        let result = "";
        products.forEach(product => {
          result += 
          `
            <article class="product">
              <div class="photo">
                  <img src=${product.image} alt="product" class="product-img"/>
                  <button class="bag-btn" data-id=${product.id}>
                      <i class="fas fa-shopping-cart"></i>
                      agregar
                  </button>
              </div>
              <h3>${product.title} (10)</h3>
              <h4>$${product.price}</h4>
            </article>
          `;
        });
        capsulas.innerHTML = result;
      }

  //Add Item Buttons 
  getBagButtons() {
    let buttons = [...$(".bag-btn")];
    botones  = buttons;
    buttons.forEach(button => {
      let id = button.dataset.id;
      let inCart = carrito.find(item => item.id === id);

      if (inCart) {
        button.innerText = "Agregado";
        button.disabled = true;
      }
      $(button).click(event => {
        // disable button
        event.target.innerText = "Agregado";
        event.target.disabled = true;
        // add to cart
        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        carrito = [...carrito, cartItem];
        Storage.saveCart(carrito);
        // add to DOM
        this.setCartValues(carrito);
        this.addCartItem(cartItem);
        this.showCart();
      });
    });
  }

  //Checkout total
  setCartValues(carrito) {
    let tempTotal = 0;
    let itemsTotal = 0;
    carrito.map(item => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    totalCh.innerText = parseFloat(tempTotal.toFixed(1));
    items.innerText = itemsTotal;
  }


  //Adding items to the Cart
  addCartItem(item) {
    let div = document.createElement("div");
    $(div).addClass("cart-item");
    div.innerHTML = 
    `<img src=${item.image} alt="product">
      <div>
        <h4>${item.title}</h4>
        <h5>$${item.price}</h5>
      </div>
      <div>
        <i class="fas fa-chevron-up" data-id=${item.id}></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fas fa-chevron-down" data-id=${item.id}></i>
      </div>
    `;
    content.appendChild(div);
  }


  //Cart SideBar
  showCart() {
    $(sideBar).addClass("transparentBcg");
    $(cDOM).addClass("showCart");
  }

  //Setting the Cart SideBar
  CART() {
    carrito = Storage.getCart();
    this.setCartValues(carrito);
    this.addItem(carrito);
    $(btn).click( this.showCart);
    $(closeBtn).click(this.closeCart);
  }

  //Adding item
  addItem(carrito) {
    carrito.forEach(item => this.addCartItem(item));
  }

  //Close Cart
  closeCart() {
    $(sideBar).removeClass("transparentBcg");
    $(cDOM).removeClass("showCart");
  }

  //Cart Logic
  cartLogic() {

    //Clear Cart button 
    $(clearAllBtn).click(() => {
      this.clearCart();
    });

    //Cart Content // Single Item (In Cart) Actions
    $(content).click( event => { 
      if (event.target.classList.contains("fa-chevron-up")) { //Adding Single Item
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = carrito.find(item => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        
        
        Storage.saveCart(carrito); //updating storage 
        this.setCartValues(carrito);
        addAmount.nextElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains("fa-chevron-down")) { //Removing Single Item
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = carrito.find(item => item.id === id);
        tempItem.amount = tempItem.amount - 1;
        if (tempItem.amount > 0) {

          Storage.saveCart(carrito);//updating storage 
          this.setCartValues(carrito);
          lowerAmount.previousElementSibling.innerText = tempItem.amount;

        } else {
          content.removeChild(lowerAmount.parentElement.parentElement);
          this.removeItem(id);
        }
      }
    });
  }

  //Clear Cart
  clearCart() {
    // console.log(this);
    let items = carrito.map(item => item.id);
    items.forEach(id => this.removeItem(id));
    while (content.children.length > 0) {
      content.removeChild(content.children[0]);
    }
    this.closeCart();
  }

  //Removing items
  removeItem(id) {
    carrito = carrito.filter(item => item.id !== id);
    this.setCartValues(carrito);
    Storage.saveCart(carrito);
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `<i class="fas fa-shopping-cart"></i>agregar`;
  }
  getSingleButton(id) {
    return botones .find(button => button.dataset.id === id);
  }
}

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

//Mercado Pago button  
$(document).ready(function() {
  $('#mercadoPago').hide();
          $('#end').click(function(){
              $('#end').hide();
              $('#vaciar').hide();
              $('#mercadoPago').show();
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

//Local storage
class Storage{
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id === id);
    }
    static saveCart(carrito) {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    static getCart() {
        return localStorage.getItem("carrito")
          ? JSON.parse(localStorage.getItem("carrito"))
          : [];
    }
}


//Customer view
$(document).ready(() => {
  let customer = new Customer();
  let products = new Products();
  customer.CART();


  //Display Products
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