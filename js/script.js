//Carrito
function MyItem (argNombre){
    this.nombre = argNombre;
}

let miCarrito =[];
const itemsCarrito = 10;
for (let index = 0; index < Array.length; index++){
    const element = new MyItem ("ItemNumero" + index)
    miCarrito.push(element);
}
console.log(miCarrito); 
//Productos 

    