const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/iniciar_juego", function (req, res) {
	let ArrayDeCartones = [];
    for (let i = 0; i < req.body.Numero; i++) {
        let Carton = [];
        
        for (let j = 0; j < 10; j++) {
            let numero = PedirNumero(100);
            Carton.push(numero);
        }
        ArrayDeCartones.push(Carton);
    }
    res.send(ArrayDeCartones);
})
	
const PedirNumero = (res) => {
    
	let Numero = res;
    let NumeroAleatorio = Math.floor(Math.random()*Numero);
    
    return NumeroAleatorio;
}

app.listen(PORT, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});