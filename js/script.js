function go(){
    let str = document.getElementById("t1").value;
    let vocal = "aeiouAEIOU";
    let consonante = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ";
    let ctrV = 0;
    let ctrC = 0;
    for(let x = 0; x < str.length; x++){
        for(let y = 0; y < vocal.length; y++){
            if(str[x] ==vocal[y])
            {
                ctrV++;
            }
        }
        for(let z = 0; z < consonante.length; z++){
            if(str[x] ==consonante[z])
            {
                ctrC++;
            }
        }
    }
    document.getElementById("p1").innerHTML = "La cantidad de vocales ingresadas es " + ctrV;
    document.getElementById("p2").innerHTML = "La cantidad de consonantes ingresadas es: " + ctrC;
} 
    