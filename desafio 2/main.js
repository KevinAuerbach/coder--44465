let notas = 0;
let contador = 0;
let continuar = ""

function cargarNotas(){
    notas += Number(prompt("Ingrese su nota"));
    contador++;

    do{
        notas += Number(prompt("Ingrese otra nota para promediar"));
        contador++;
        continuar =prompt("Desea seguir ingresando notas para promediar? A- Si, B- No").toUpperCase()

        if(continuar === "B"){
            alert(`Usted ingreso ${contador} notas y su promedio es ${promediar()}`)
        }
            
    }while(continuar !== "B")
    
   
}

const felicitar = () => {
    if(promediar() >= 6){
        alert("Felicitaciones, usted aprobo la materia")
    }else{
        alert("No le alcanza para aprobar")
    }
}

const promediar = () => notas / contador

cargarNotas()
felicitar()







 