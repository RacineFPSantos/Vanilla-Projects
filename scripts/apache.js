function start(){
    $("#inicio").hide();
    $("#fundo-game").append("<div id='jogador' class='anima1'></div>");
    $("#fundo-game").append("<div id='inimigo1' class='anima2'></div>");
    $("#fundo-game").append("<div id='inimigo2' ></div>");
    $("#fundo-game").append("<div id='amigo' class='anima3'></div>");
    $("#fundo-game").append("<div id='placar'></div>");
    $("#fundo-game").append("<div id='energia'></div>");

    
    var velocidade = 5;
    var jogo = {};
    var podeAtirar = true;
    var posicaoY = parseInt(Math.random() * 334);
    let fimJogo = false
    var pontos = 0;
    var salvos = 0;
    var perdidos = 0;
    var energiaAtual = 3;
    
    var TECLA = {
        W: 87,
        S: 83,
        D: 68
    }
    
    jogo.pressionou = [];
   
    var somDisparo = document.getElementById("somDisparo");
    var somExplosao = document.getElementById("somExplosao");
    var musica = document.getElementById("musica");
    var somGameover = document.getElementById("somGameover");
    var somPerdido = document.getElementById("somPerdido");
    var somResgate = document.getElementById("somResgate");
    
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();
    
    $(document).keydown((e) => {
        jogo.pressionou[e.which] = true;
    });
    
    $(document).keyup((e) => {
        jogo.pressionou[e.which] = false;
    });
     
    jogo.timer = setInterval(loop, 30);
    function loop(){
        moveFundo();
        moveJogador();
        moveInimigo1();
        moveInimigo2();
        moveAmigo(); 
        colisao();  
        placar(); 
        energia();    
    }

    function moveFundo(){
        esquerda = parseInt($("#fundo-game").css("background-position"));
        $("#fundo-game").css("background-position", esquerda-1);
    }

    function moveJogador(){
        //se possivel melhorar o logica nesse loop

        if(jogo.pressionou[TECLA.W]){
            var topo = parseInt($("#jogador").css("top"));            

            if(topo > 10){
                $("#jogador").css("top", topo-10);
            }           
        }

        if(jogo.pressionou[TECLA.S]){
            var topo = parseInt($("#jogador").css("top"));
                        
            if(topo <= 434){
                $("#jogador").css("top", topo+10);
            }
        }

        if(jogo.pressionou[TECLA.D]){
            disparo();            
        }
    }

    function moveInimigo1(){
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left", posicaoX - velocidade);
        $("#inimigo1").css("top", posicaoY);

        if(posicaoX <= 0){
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }
    }

    function moveInimigo2(){
        posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left", posicaoX - 3);

        if(posicaoX <= 0){
            $("#inimigo2").css("left", 775);
        }
    }

    function moveAmigo(){
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left", posicaoX + 1);

        if(posicaoX > 906){
            $("#amigo").css("left", 0);
        }
    }

    function disparo(){
        if(podeAtirar === true){

            somDisparo.play();
            podeAtirar = false;

            topo = parseInt($("#jogador").css("top"));
            posicaoX = parseInt($("#jogador").css("left"));
            tiroX = posicaoX + 190;
            topoTiro = topo + 37;

            $("#fundo-game").append("<div id='disparo'></div>");
            $("#disparo").css("top", topoTiro); 
            $("#disparo").css("left", tiroX);
            
            var tempoDisparo = window.setInterval(executaDisparo, 30);
        }

        function executaDisparo(){
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left", posicaoX + 15);

            if(posicaoX > 900){
                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;
            }
        }
    }

    
    function colisao(){
        
        var colImpacto1 = ($("#jogador").collision($("#inimigo1")));
        var colImpacto2 = ($("#jogador").collision($("#inimigo2")));
        var colImpacto3 = ($("#disparo").collision($("#inimigo1")));
        var colImpacto4 = ($("#disparo").collision($("#inimigo2")));
        var colImpacto5 = ($("#jogador").collision($("#amigo")));
        var colImpacto6 = ($("#inimigo2").collision($("#amigo")));

        if(colImpacto1.length > 0){
            energiaAtual--;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X, inimigo1Y); 

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY); 
        }

        if(colImpacto2.length > 0){
            energiaAtual--;
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X, inimigo2Y); 

            $("#inimigo2").remove();
            reposicionaInimigo2();
        }

        if(colImpacto3.length > 0){
            pontos += 100;
            velocidade += 0.03;
            console.log(velocidade);
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));

            explosao1(inimigo1X, inimigo1Y); 
            $("#disparo").css("left", 950);

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY); 
        }

        if(colImpacto4.length > 0){
            pontos = pontos + 50;
            
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();
            
            explosao2(inimigo2X, inimigo2Y); 
            $("#disparo").css("left", 950);
            reposicionaInimigo2();
        }

        if(colImpacto5.length > 0){
            somResgate.play();
            salvos ++;

            reposicionaAmigo();
            $("#amigo").remove();
        }

        if(colImpacto6.length > 0){
            perdidos++;
            
            inimigo2X = parseInt($("#amigo").css("left"));
            inimigo2Y = parseInt($("#amigo").css("top"));
            explosao3(inimigo2X, inimigo2Y); 
            $("#amigo").remove();

            reposicionaAmigo();
        }
    }

    function explosao1(inimigo1X, inimigo1Y){
        somExplosao.play();
        $("#fundo-game").append("<div id='explosao1'></div>")
        $("#explosao1").css("background-image", "url(imgs/explosao.png)");
       
        var div = $("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({width:200, opacity:0}, "slow");

        var tempoExplosao = window.setInterval(removeExplosao, 1000);

        function removeExplosao(){
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    }

    function explosao2(inimigo2X, inimigo2Y){
        somExplosao.play();
        $("#fundo-game").append("<div id='explosao2'></div>")
        $("#explosao2").css("background-image", "url(imgs/explosao.png)");
       
        var div2 = $("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({width:200, opacity:0}, "slow");

        var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

        function removeExplosao2(){
            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao = null;
        }
    }

    function explosao3(amigoX, amigoY){
        somPerdido.play();
        $("#fundo-game").append("<div id='explosao3' class='anima4'></div>")
        $("#explosao3").css("top", amigoY);
        $("#explosao3").css("left", amigoX);
       
        var tempoExplosao3 = window.setInterval(removeExplosao3, 1000);

        function removeExplosao3(){
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao = null;
        }
    }

    function reposicionaInimigo2(){
        var tempoColisao4 = window.setInterval(reposicao4, 5000);

        function reposicao4(){
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;

            if(fimJogo == false){
                $("fundo-game").append("<div id='inimigo2'></div>")
            }
        }
    }

    function reposicionaAmigo(){
        var tempoAmigo = window.setInterval(reposiciona6, 6000);

        function reposiciona6(){
            window.clearInterval(tempoAmigo);
            tempoAmigo = null;
            
            if(fimJogo == false){
                $("fundo-game").append("<div id='amigo' class='anima3'></div>")
            }
        }
    }

    function placar(){
        $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos +"</h2>")
    }

    function energia(){
        if(energiaAtual == 3){
            $("#energia").css("background-image", "url(./imgs/energia3.png)");
        }

        if(energiaAtual == 2){
            $("#energia").css("background-image", "url(./imgs/energia2.png)");
        }

        if(energiaAtual == 1){
            $("#energia").css("background-image", "url(./imgs/energia1.png)");
        }

        if(energiaAtual == 0){
            $("#energia").css("background-image", "url(./imgs/energia0.png)");   
            
            gameOver();
        }
    }

    function gameOver(){
        fimJogo = true;
        musica.pause();
        somGameover.play();

        window.clearInterval(jogo.timer);
        jogo.timer = null;

        $("#jogador").remove();
        $("#inimigo1").remove();
        $("#inimigo2").remove();
        $("#amigo").remove();

        $("#fundo-game").append("<div id='fim'></div>");
        $("#fim").html("<h1>Game Over </h1><p>Sua pontuação foi: " + pontos + "</p> <div id='reinicia' onClick=reiniciarJogo()><h3>Jogar Novamente</h3>");
    }
}

function reiniciarJogo(){
        somGameover.pause();
        $("#fim").remove();
        start();
    }