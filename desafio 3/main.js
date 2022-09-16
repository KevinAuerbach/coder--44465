let notas = [];
let continuar = "";
let nota = 0;
let total = 0;
let promedio = 0;

function cargarNotas() {
    nota = Number(prompt("Ingrese su nota"));
    notas.push(nota);

    do {
        nota = Number(prompt("Ingrese otra nota para promediar"));
        notas.push(nota);
        continuar = prompt("Desea seguir ingresando notas para promediar? A- Si, B- No").toUpperCase()

        if (continuar === "B") {
            let total = notas.reduce((acc, nota) => acc + nota, 0)
            promedio = total / notas.length
            alert(`Su promedio es: ${promedio}`)


            if (promedio >= 6) {
                alert("Felicitaciones, usted aprobo la materia")
            } else {
                alert("No le alcanza para aprobar")
            }


        }

    }
    while (continuar !== "B")




}



cargarNotas()