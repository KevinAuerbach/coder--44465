let entrada = parseInt(prompt("Ingrese un numero"));

let suma = 0; //Declare un contador en 0
for (let i = 0; i < entrada; i++) {
  console.log("Hola");
  suma++;//Cada vez que pasa por aca le suma 1
}

alert(`Tarde ${suma} veces en llegar a tu numero :D`);//Interpolo Strings con Variables usando `BackTicks`
