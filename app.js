const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

if (navigator.appVersion.indexOf("Win") != -1 || navigator.appVersion.indexOf("Mac") != -1) {
    let player = { start: false, speed: 5, score: 0 }

    let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }

    document.addEventListener('keydown', (e) => {
        e.preventDefault();
        keys[e.key] = true;
    })
    document.addEventListener('keyup', (e) => {
        e.preventDefault();
        keys[e.key] = false;
    })

    startScreen.addEventListener('click', start);

    function start() {
        player.start = true;
        player.score = 0;
        gameArea.classList.remove('hide');
        score.classList.remove('hide');
        gameArea.innerHTML = '';
        startScreen.classList.add('hide');

        for (i = 0; i < 5; i++) {
            let roadLine = document.createElement('div');
            roadLine.setAttribute('class', 'roadLine');
            roadLine.y = (i * 150);
            roadLine.style.top = roadLine.y + 'px';
            gameArea.appendChild(roadLine);
        }

        for (i = 0; i < 4; i++) {
            let enemyCar = document.createElement('div');
            enemyCar.setAttribute('class', 'enemyCar');
            enemyCar.y = (i * 160);
            enemyCar.style.top = enemyCar.y + 'px';
            enemyCar.style.backgroundImage = ranCar();
            enemyCar.x = Math.floor(Math.random() * 380);
            enemyCar.style.left = enemyCar.x + 'px';
            gameArea.appendChild(enemyCar);
        }

        let car = document.createElement('div');
        car.setAttribute('class', 'car');
        gameArea.appendChild(car);
        player.x = car.offsetLeft;
        player.y = car.offsetTop;


        window.requestAnimationFrame(play);
    }

    function play() {
        let car = document.querySelector('.car');
        if (player.start) {
            moveLine();
            moveEnemy(car);
            // scoreCard(car);
            if (keys.ArrowUp && player.y > 100) { player.y -= player.speed }
            if (keys.ArrowDown && player.y < 680) { player.y += player.speed }
            if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
            if (keys.ArrowRight && player.x < 385) { player.x += player.speed }
            car.style.left = player.x + 'px';
            car.style.top = player.y + 'px';
            window.requestAnimationFrame(play);
            score.innerHTML = "Score: " + player.score++;
        }
    }

    function moveLine() {
        let roadLines = document.querySelectorAll('.roadLine');
        roadLines.forEach((i) => {
            if (i.y >= 700) {
                i.y -= 750;
            }
            i.y += player.speed;
            i.style.top = i.y + 'px';
        })
    }

    function moveEnemy(car) {
        let enemyCar = document.querySelectorAll('.enemyCar');
        enemyCar.forEach((i) => {
            if (gameOver(car, i)) {
                end();
            }
            if (i.y >= 700) {
                i.y -= 750;
                i.x = Math.floor(Math.random() * 365);
                i.style.backgroundImage = ranCar();
                i.style.left = i.x + 'px';
            }
            i.y += player.speed;
            i.style.top = i.y + 'px';
        })
    }

    function gameOver(car, enemyCar) {
        c = car.getBoundingClientRect();
        e = enemyCar.getBoundingClientRect();
        return !((c.top > e.bottom) || (c.bottom < e.top) || (c.right < e.left) || (c.left > e.right))
    }

    function randomColor() {
        let randCol = ['blue', 'green', 'yellow'];
        return randCol[Math.floor(Math.random() * randCol.length)]
    }

    function end() {
        player.start = false;
        startScreen.classList.remove('hide');
        startScreen.innerHTML = "Your Score is " + player.score + "<br>Tap to play again";
    }

    function ranCar(){
        let image = ['url(11.png)','url(33.png)','url(44.png)', 'url(55.png)'];
        return image[Math.floor(Math.random()*image.length)];
    }

    // function scoreCard(car){
    //     c=car.getBoundingClientRect();
    //     e=enemyCar.getBoundingClientRect();
    //     let count=0;
    //     if((c.top>e.bottom)||(c.bottom<e.top))
    //         count++;
    //     if(count==60)
    //         player.score++;
    //     console.log(player.score);
    // }
}

else{
    startScreen.innerHTML="OS Not Compatible <br> Try to run it on Windows or Mac";
}