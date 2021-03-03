//PRUEBA//
// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrega credenciales
mercadopago.configure({
  access_token: 'PROD_ACCESS_TOKEN'
});
// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrega credenciales
mercadopago.configure({
  access_token: 'PROD_ACCESS_TOKEN'
});

// Crea un objeto de preferencia
let preference = {
  items: [
    {
      "sys": { "id": "1" },
      "fields": {
        "title": "Vainilla Brew",
        "price": 1100,
        "image": { "fields": { "file": { "url": "img/productModel.png" } } }
      }
    }
  ]
};

mercadopago.preferences.create(preference)
.then(function(response){
// Este valor reemplazará el string "<%= global.id %>" en tu HTML
  global.id = response.body.id;
}).catch(function(error){
  console.log(error);
});


//boton de pago <script src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js" data-preference-id='<%= global.id %>'></script>