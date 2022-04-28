const express = require("express");
const app = express();
const PORT = 3000;
let ArrayDeCartones = [];

const PedirNumero = (res) => {
   
    let Numero = res;
    let NumeroAleatorio = Math.floor(Math.random()*Numero);
   
    return NumeroAleatorio;
}

app.use(express.json());

app.post("/iniciar_juego", function (req, res) {
    
 
    for (let i = 0; i < req.body.Numero; i++) {
       
        let Carton = {
            NombreJugador: req.body.Nombres[i],
            numeros: [],
            tachados: []
        };
       
        for (let j = 0; j < 10; j++) {
            let numero = PedirNumero(100);
            Carton.numeros.push(numero);
        }
        ArrayDeCartones.push(Carton);
    }
 
 
    res.send(ArrayDeCartones);
})
   
app.get("/sacar_numero", function(req,res){
    let NumeroElegido = undefined;
    //let condicion = false;
    let jugadorGanador;
   
   // while (condicion == false) {
       
        NumeroElegido = PedirNumero(100);
       
        ArrayDeCartones.forEach(Carton => {
 
            for (let i = 0; i < 11; i++) {
               
                if (Carton.numeros[i] == NumeroElegido) {
                    Carton.tachados.push(NumeroElegido);
                }
            }
 
            if (Carton.tachados.length == 10) {
 
                //condicion = true;
                jugadorGanador = Carton.NombreJugador;
            }
        });
 
    //}
    if(jugadorGanador == undefined){
       res.send({NumeroElegido});
    } else{
       res.send({jugadorGanador}); 
    }
    
})
 
app.get("/cartones/:Nombre?", function(req,res){
    let Nombre = req.params.Nombre;
    let i = ArrayDeCartones.find(Carton => Carton.NombreJugador == Nombre);

    if(Nombre){
    res.send(i);
    } else{
    res.send(ArrayDeCartones); 
    }
    
});

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
