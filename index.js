window.onload = function () {
    globalThis.partidas = [];
    globalThis.bottle = document.getElementById("bottle");

    document.getElementById("start").addEventListener("click", init);
    document.getElementById("play").addEventListener("click", play);


}


async function init() {
    globalThis.totalPlayers = await returnTotal();
    globalThis.lang = await returnLang();



    let startError = document.getElementById("startError");
    let innerHTML = "";



    startError.innerHTML = "";


    if (globalThis.totalPlayers == null || globalThis.totalPlayers == "") {

        startError.innerHTML = "Por favor Introduce un número de jugadores";
        return;
    }

    if (globalThis.totalPlayers < 3 || globalThis.totalPlayers > 10) {
        startError.innerHTML = "El número de jugadores debe estar entre 3 y 10";
        return;
    }


    

   


    
    innerHTML += `<div id = "players1">`

    for (let i = 1; i <= globalThis.totalPlayers; i++) {
        innerHTML += `  <div class="p${i}-container">
                            <input type="text" class="playerName${i}" placeholder="Nombre" id="${i}">
                                <select id="p${i}Sex">
                                    <option value="hombre">H</option>
                                    <option selected="selected" value="mujer">M</option>
                                    <option value="gay">G</option>
                                    <option value="lesbiana">L</option>
                                </select>  

                        </div>`

        if(i == 5){
            innerHTML += `</div><div id = "players2">`
        }
                      
          
    }

    innerHTML += `</div>`

    document.getElementById("players").innerHTML = innerHTML;
    document.getElementById("start-container").style.display = "none";


    startGame();
}

function play() {
    document.getElementsByClassName("error-message")[0].innerHTML = "";

    let jugadores = [];

    for (let i = 0; i < globalThis.totalPlayers; i++) {
        jugadores[i] = {
            name: document.getElementById(i + 1).value,
            sex: document.getElementById(`p${i + 1}Sex`).value,
        }

    }

    for (let i = 0; i < globalThis.totalPlayers; i++) {
        if (jugadores[i].name == null || jugadores[i].name == "") {
            document.getElementsByClassName("error-message")[0].innerHTML = "Error! Los " + globalThis.totalPlayers + " jugadores deben tener nombre y sexo.";
        }

    }

    if (document.getElementsByClassName("error-message")[0].innerHTML != "") {
        jugadores = [];
        return;
    }






    //lock the left container and show it in a different color
    document.getElementsByClassName("left-container")[0].style.pointerEvents = "none";
    document.getElementsByClassName("left-container")[0].style.backgroundColor = "#F9d8dd";
    document.getElementsByClassName("error-message")[0].innerHTML = "";


    const players = jugadores;
    document.getElementById("spin").addEventListener("click", spin);

    console.log(players)

    globalThis.players = players;

}

async function ruleta(iterations, role, random) {
    spinTheBottle(globalThis.bottle);

    for (let i = 0; i < iterations; i++) {
        oldPlayer = document.getElementsByClassName(role)[0];
        if (oldPlayer != null) {
            oldPlayer.classList.remove(role);
        }

        if (random < globalThis.totalPlayers) {
            random++;
        } else {
            random = 1;
        }



        playerText = document.getElementById(random);


        playerText.classList.add(role);

        if (i <= iterations - 5) {
            await delay(100);
        } else if (i <= iterations - 2) {
            await delay(400)
        } else {
            await delay(1000);
        }


        if (oldPlayer != null) {
            oldPlayer.classList.remove(role);
        }



    }

    await delay(200);
    playerText.classList.remove(role);



}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


function devuelveNumAccion() {
    //returns a random number from 1 to 8
    let accion = Math.floor(Math.random() * 8) + 1;
    return accion;

}


function spinTheBottle(bottle) {
    //reproducts sound
    let audio = new Audio('bottle.mp3');
    audio.play();

    bottle.classList.add('rotating');


    delay(8000).then(() => {
        bottle.classList.remove('rotating');
        //stop the audio forever
        audio.pause();
        audio.currentTime = 0;
    }
    );

}

function returnTotal() {
    return document.getElementById("numPlayers").value;
}

function returnLang() {
    return document.getElementById("lang").value;
}



async function startGame() {



    if (globalThis.lang == "SP") {

        globalThis.acciones1 = {
            1: " debe dar beso en la mejilla a ",
            2: " debe abrazarse durante 2 segundos con ",
            3: " debe dar un suave mordisquito en zona segura a ",
            4: " debe acariciar en zona segura a ",
            5: " debe quitar una prenda a ",
            6: " debe lamer en zona segura a ",
            7: " debe mirarse a los ojos durante 10 segundos con ",
            8: " debe dar un masaje en los hombros durante 15 segundos a "
        };

        globalThis.acciones2 = {
            1: " debe dar un pico a ",
            2: " debe abrazar por detrás y oler el cuello de ",
            3: " debe dar un suave mordisquito en zona ofrecida a ",
            4: " debe acariciar en zona sexy a ",
            5: " debe quitar una prenda a ",
            6: " debe lamer en zona sexy a ",
            7: " debe mirarse a los ojos a un palmo de distancia durante 10 segundos con ",
            8: " debe dar un masaje (boca abajo en espalda y pelvis) durante 20 segundos a "
        };

        globalThis.acciones3 = {
            1: " debe besarse apasionadamente con",
            2: " debe abrazar por detrás y tocar el cuerpo durante 5 segundos a ",
            3: " debe dar un suave mordisquito en zona sexy a ",
            4: " debe acariciar en zona sexual a ",
            5: " debe quitar una prenda (de ropa interior si es posible) a ",
            6: " debe lamer en zona erógena a ",
            7: " debe mirarse nariz con nariz durante 10 segundos con ",
            8: " debe dar un masaje de cuerpo entero durante 20 segundos a "
        };
    }

    if (globalThis.lang == "EN") {

        globalThis.acciones1 = {
            1: " must give a kiss on the cheek to ",
            2: " must hug for 2 seconds ",
            3: " must give a soft bite in safe zone to ",
            4: " must caress in safe zone to ",
            5: " must take off a piece of clothing to ",
            6: " must lick in safe zone to ",
            7: " must look into the eyes for 10 seconds with ",
            8: " must give a shoulder massage for 15 seconds to "
        };

        globalThis.acciones2 = {
            1: " must give a peck to ",
            2: " must hug from behind and smell the neck of ",
            3: " must give a soft bite in offered zone to ",
            4: " must caress in sexy zone to ",
            5: " must take off a piece of clothing to ",
            6: " must lick in sexy zone to ",
            7: " must look into the eyes at one hand distance for 10 seconds with ",
            8: " must give a massage (face down on back and pelvis) for 20 seconds to "
        };

        globalThis.acciones3 = {
            1: " must kiss passionately with ",
            2: " must hug from behind and touch the body for 5 seconds to ",
            3: " must give a soft bite in sexy zone to ",
            4: " must caress in sexual zone to ",
            5: " must take off a piece of clothing (underwear if possible) to ",
            6: " must lick in erogenous zone to ",
            7: " must look nose to nose for 10 seconds with ",
            8: " must give a full body massage for 20 seconds to "
        };

    }

    if (globalThis.lang == "FR") {
        globalThis.acciones1 = {
            1: " doit donner un baiser sur la joue à ",
            2: " doit s'embrasser pendant 2 secondes avec ",
            3: " doit donner un petit coup de dents dans la zone sûre à ",
            4: " doit caresser dans la zone sûre à ",
            5: " doit enlever un vêtement à ",
            6: " doit lécher dans la zone sûre à ",
            7: " doit se regarder dans les yeux pendant 10 secondes avec ",
            8: " doit faire un massage des épaules pendant 15 secondes à "
        };
    }



}





async function crearPartida(player, target, random2) {

    let action = "";
    let jugador1 = player.name;
    let jugador2 = target.name;
    let partida = `${jugador1},${jugador2}`

    let numAction = devuelveNumAccion();






    let frase1 = document.getElementById("frase1");
    let frase2 = document.getElementById("frase2");


    frase1.innerHTML = "";
    frase2.innerHTML = "";

    //sort alfabetically partida
    partida = partida.split(",").sort().join(",");

    partida += `,${numAction},lvl1`


    if (globalThis.partidas.includes(partida)) {
        //splits partida then substracts "lvl1" and adds "lvl2"
        partida = partida.split(",");
        partida.pop();
        partida.push("lvl2");
        partida = partida.join(",");
    }

    //same with lvl2
    if (globalThis.partidas.includes(partida)) {
        partida = partida.split(",");
        partida.pop();
        partida.push("lvl3");
        partida = partida.join(",");
    }

    globalThis.partidas.push(partida);


    let actionLvl = partida.split(",")[3];



    if (actionLvl == "lvl1") {
        action = globalThis.acciones1[partida.split(",")[2]];
    }

    if (actionLvl == "lvl2") {
        action = globalThis.acciones2[partida.split(",")[2]];
    }

    if (actionLvl == "lvl3") {
        action = globalThis.acciones3[partida.split(",")[2]];
    }




    await delay(1000);


    frase1.innerHTML = `<div class="playerName">${jugador1}</div>`;

    await delay(2000);

    document.getElementById("action").innerHTML = action.toUpperCase() + "<p>...</p>";

    await delay(2000);
    await ruleta(35, "targetPlayer", random2, globalThis.bottle, globalThis.totalPlayers);



    document.getElementById(random2).classList.add("targetPlayer");

    frase2.innerHTML = `<div class="playerName">${jugador2}</div>`;


    //añade nombre a name to naked si quieres que esa persona acabe desnuda antes que nadie. jijiji

    let nameToNaked = "";
    let cheating = false;
    if (nameToNaked != "" && globalThis.players.some(e => e.name === nameToNaked) && numAction == 5) {
        cheating = true;

        let cheatingNumber = Math.random();
        if (jugador1 != nameToNaked && jugador2 != nameToNaked && cheatingNumber < 0.65) {
            jugador2 = nameToNaked;
            document.getElementsByClassName("targetPlayer")[0].classList.remove("targetPlayer");

            for (let i = 1; i < 5; i++) {
                if (document.getElementById(i).value == nameToNaked) {
                    document.getElementById(i).classList.add("targetPlayer");
                }
            }
            console.log("Cheating?" + cheating)

        }
    }

    //fin cheating







    console.log(jugador1 + action + jugador2);
    await delay(500);
    document.getElementsByClassName("spin-button")[0].style.pointerEvents = "auto";

}

async function spin() {

    //blocks the button for 16 seconds

    document.getElementsByClassName("spin-button")[0].style.pointerEvents = "none";



    if (document.getElementsByClassName("targetPlayer")[0] != null) {
        document.getElementsByClassName("targetPlayer")[0].classList.remove("targetPlayer");
    }

    if (document.getElementsByClassName("turnPlayer")[0] != null) {
        document.getElementsByClassName("turnPlayer")[0].classList.remove("turnPlayer");
    }


    document.getElementById("frase1").innerHTML = "...";
    document.getElementById("frase2").innerHTML = "...";

    if (document.getElementsByClassName("left-container")[0].style.pointerEvents != "none") {
        document.getElementsByClassName("error-message")[0].innerHTML = "Error! Debes ingresar los nombres de los jugadores y su sexo antes de girar la ruleta.";
        return;
    }


    //select a random number from 1 to 10
    let random = Math.floor(Math.random() * globalThis.totalPlayers) + 1;
    let random2 = Math.floor(Math.random() * globalThis.totalPlayers) + 1;



    let player = globalThis.players[random - 1];
    let target = globalThis.players[random2 - 1];


    //si el numero es igual reroll 
    if (random == random2) {
        spin();
        return;
    }

    //si el los jugadores son los dos hombres reroll
    if (player.sex == "hombre" && target.sex == "hombre") {
        spin();
        return;
    }

    if (player.sex == "gay" && target.sex == "mujer") {
        spin();
        return;
    }

    if (player.sex == "mujer" && target.sex == "gay") {
        spin();
        return;
    }

    if (player.sex == "gay" && target.sex == "lesbiana") {
        spin();
        return;
    }

    if (player.sex == "lesbiana" && target.sex == "gay") {
        spin();
        return;
    }

    if (player.sex == "lesbiana" && target.sex == "hombre") {
        spin();
        return;
    }

    if (player.sex == "hombre" && target.sex == "lesbiana") {
        spin();
        return;
    }



    await ruleta((35), "turnPlayer", random, globalThis.bottle, globalThis.totalPlayers);






    document.getElementById(random).classList.add("turnPlayer");









    crearPartida(player, target, random2);

    if (document.getElementsByClassName("targetPlayer")[0] != null) {
        document.getElementsByClassName("targetPlayer")[0].classList.remove("targetPlayer");
    }




}

