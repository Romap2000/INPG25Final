
        var canvas = document.getElementById("arena");
        var ctx = canvas.getContext("2d");
        var x = Math.floor(Math.random() * 1000);
        var y = canvas.height-350;
        var dy = 2;
        
        var ballSize=20
        var cursorHeight=60;
        var cursorWidth=100;
        var cursorLoc=(canvas.width-cursorWidth) / 2;

        var rightPressed = false;
        var leftPressed = false;

        var skor=0
        var lives=3
        
        
        document.addEventListener("keydown",keyDownHandler,false)
        document.addEventListener("keyup",keyUpHandler,false)
        document.addEventListener("mousemove", mouseMoveHandler, false);

        function keyDownHandler(e) {
            if (e.key=="Right" || e.key=="ArrowRight") {
                rightPressed=true;
            }
            else if (e.key=="Left" || e.key=="ArrowLeft") {
                leftPressed=true;
            }
        }

        function keyUpHandler(e) {
            if (e.key=="Right" || e.key=="ArrowRight") {
                rightPressed=false;
            }
            else if (e.key=="Left" || e.key=="ArrowLeft") {
                leftPressed=false;
            }
        }
        
        function mouseMoveHandler(e) {
            var relativeX = e.clientX - canvas.offsetLeft;
            if(relativeX > 0 && relativeX < canvas.width) {
                cursorLoc = relativeX - cursorWidth/2;
            }
        }

        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballSize, 0, Math.PI*2);
            ctx.fillStyle = "#f00";
            ctx.fill();
            ctx.closePath();   
        }

        function drawCursor() {
            ctx.beginPath();
            ctx.rect(cursorLoc, canvas.height-cursorHeight, cursorWidth, cursorHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function tulisSkor(){
            ctx.font = "bold 28px Arial";
            ctx.fillStyle = "#ffff00";
            ctx.fillText("Score: "+skor, 8, 30);
        }

        function tulisLives() {
            ctx.font = "bold 24px Arial";
            ctx.fillStyle = "#8b0000";
            ctx.fillText("Lives : "+lives, 8, 50);
        }

        function clearDraw() {
            ctx.clearRect(0,0,1000,500);
            drawBall();
            drawCursor();
            tulisSkor();
            tulisLives();
            if (y + dy > canvas.height-ballSize) {
            // } else if (y + dy > canvas.height-) { //untuk tetap memantul
                if(x > cursorLoc && x < cursorLoc + cursorWidth) {
                
                x=Math.floor(Math.random() * 1000);
                y=canvas.height-400;
                dy=2; //gerak bola atas bawah
                skor++
            }
                    else {
                    lives--;
                    if(!lives) {
                        alert("GAME OVER");
                        document.location.reload();
                    }
                    else {
                        x=Math.floor(Math.random() * 1000);
                        y=canvas.height-400;
                        dy=2; //gerak bola atas bawah
                        cursorLoc=(canvas.width-cursorWith)/2;
                    }
                }
            }

            if(rightPressed) {
                cursorLoc += 7;
                if (cursorLoc + cursorWidth > canvas.width){
                    cursorLoc = canvas.width - cursorWidth;
                }
            }
            else if(leftPressed) {
                cursorLoc -= 7;
                if (cursorLoc < 0){
                    cursorLoc = 0;
                }
            }
            y += dy;                       
            // requestAnimationFrame(clearDraw)
        }             

        // setInterval(clearDraw,10)
        var interval = setInterval(clearDraw, 1);
        // clearDraw();
        