//on start the html next function is called
window.onload = function () {
    let playButton = document.getElementById("play");
    let spinButton = document.getElementById("spin");
    let leftContainer = document.getElementsByClassName("left-container");
    let partidas = [];
    let players = [];


    let acciones1 = {
        1: " debe dar un pico a ",
        2: " debe abrazarse durante 2 segundos con ",
        3: " debe dar un suave mordisquito en zona segura a ",
        4: " debe acariciar en zona segura a ", 
        5: " debe quitar una prenda a ",
        6: " debe lamer en zona segura a ",
        7: " debe mirarse a los ojos durante 10 segundos con ",
        8: " debe dar un masaje en los hombros durante 15 segundos a "
    };

    let acciones2 = {
        1: " debe besarse en la boca con ",
        2: " debe abrazar por detrás y oler el cuello de ",
        3: " debe dar un suave mordisquito en zona ofrecida a ",
        4: " debe acariciar en zona sexy a", 
        5: " debe quitar una prenda a ",
        6: " debe lamer en zona sexy a ", 
        7: " debe mirarse a los ojos a un palmo de distancia durante 10 segundos con ",
        8: " debe dar un masaje (boca abajo en espalda y pelvis) durante 20 segundos a "
    };

    let acciones3 = {
        1: " debe besarse con lengua con ",
        2: " debe abrazar por detrás durante 5 segundos a ",
        3: " debe dar un suave mordisquito en zona ofrecida a ",
        4: " debe acariciar en zona sexual a ",
        5: " debe quitar una prenda (de ropa interior si es posible) a ",
        6: " debe lamer en zona erógena a ", 
        7: " debe mirarse nariz con nariz durante 10 segundos con ",
        8: " debe dar un masaje de cuerpo entero durante 20 segundos a"
    };


    async function crearPartida(player, target) {
        let partida = `${player.name},${target.name}`
        let action = "";
        let jugador1 = player.name;
        let jugador2 = target.name;

        let frase1 = document.getElementById("frase1");
        let frase2 = document.getElementById("frase2");


        frase1.innerHTML = "...";
        frase2.innerHTML = "...";

        //sort alfabetically partida
        partida = partida.split(",").sort().join(",");

        partida += `,${devuelveNumAccion()},lvl1`
    
    
        if(partidas.includes(partida)){
            //splits partida then substracts "lvl1" and adds "lvl2"
            partida = partida.split(",");
            partida.pop();
            partida.push("lvl2");
            partida = partida.join(",");
        }

        //same with lvl2
        if(partidas.includes(partida)){
            partida = partida.split(",");
            partida.pop();
            partida.push("lvl3");
            partida = partida.join(",");
        }
   
        partidas.push(partida);


        let actionLvl = partida.split(",")[3];

        

        if (actionLvl == "lvl1") {
            action = acciones1[partida.split(",")[2]];
        }

        if (actionLvl == "lvl2") {
            action = acciones2[partida.split(",")[2]];
        }

        if (actionLvl == "lvl3") {
            action = acciones3[partida.split(",")[2]];
        }




        await delay(1000);


        frase1.innerHTML = jugador1 + action + "...";
        frase2.innerHTML = "..."+jugador2 + ".";
        console.log(jugador1+action+jugador2);

        
    
    }














    playButton.addEventListener("click", function () {
        let n1 = document.getElementById("1").value;
        let n2 = document.getElementById("2").value;
        let n3 = document.getElementById("3").value;
        let n4 = document.getElementById("4").value;

        if (n1 == "" || n2 == "" || n3 == "" || n4 == "" || n1 == null || n2 == null || n3 == null || n4 == null) {
            document.getElementsByClassName("error-message")[0].innerHTML = "Error! Los 4 jugadores deben tener nombre y sexo.";
            return;
        }
        //create an array with 4 objects

        players = [
            {
                name: n1,
                sex: document.getElementById("p1Sex").value,

            },
            {
                name: n2,
                sex: document.getElementById("p2Sex").value,
            },
            {
                name: n3,
                sex: document.getElementById("p3Sex").value,
            },
            {
                name: n4,
                sex: document.getElementById("p4Sex").value,
            }
        ];









        //lock the left container and show it in a different color
        leftContainer[0].style.pointerEvents = "none";
        leftContainer[0].style.backgroundColor = "#F9d8dd";
        document.getElementsByClassName("error-message")[0].innerHTML = "";

    });

    spinButton.addEventListener("click", spin);


    async function spin() {


        if (leftContainer[0].style.pointerEvents != "none") {
            document.getElementsByClassName("error-message")[0].innerHTML = "Error! Debes ingresar los nombres de los jugadores y su sexo antes de girar la ruleta.";
            return;
        }


        //select a random number from 0 to 3
        let random = Math.floor(Math.random() * 4) + 1;
        let random2 = Math.floor(Math.random() * 4) + 1;



        let player = players[random - 1];
        let target = players[random2 - 1];


        //si el numero es igual reroll 
        if (random == random2  ) {
            spin();
            return;
        }

        //si el los jugadores son los dos hombres reroll
        if (player.sex == "hombre" && target.sex == "hombre") {
            spin();
            return;
        }
        

        await ruleta(50);

        await delay(1000);





        if (document.getElementsByClassName("turnPlayer")[0] != null) {
            document.getElementsByClassName("turnPlayer")[0].classList.remove("turnPlayer");
        }
        document.getElementById(random).classList.add("turnPlayer");





        crearPartida(player, target);


    }






}

async function ruleta(iterations) {
    let random = Math.floor(Math.random() * 4) + 1;

    for (let i = 0; i < iterations; i++) {
        oldPlayer = document.getElementsByClassName("turnPlayer")[0];
        if (oldPlayer != null) {
            oldPlayer.classList.remove("turnPlayer");
        }

        if (random < 4) {
            random++;
        } else {
            random = 1;
        }



        playerText = document.getElementById(random);


        playerText.classList.add("turnPlayer");

        if (i <= 45) {
            await delay(100);
        } else {
            await delay(400);
        }


    }






}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}





function devuelveNumAccion() {
    //returns a random number from 1 to 8
    let accion = Math.floor(Math.random() * 8) + 1;




    return accion;
}