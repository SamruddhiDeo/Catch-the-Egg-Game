let egg = document.querySelector(".egg");
let basket = document.querySelector(".basket");
let score = 0;
let highScore = 0;
let timeout;

//start game listener
document.querySelector(".startGameBtn").addEventListener("click", () => {
    document.querySelector(".startGame").style.display = 'none'
    startGame();
})

//to move basket
document.addEventListener("keydown", (e) => {
    let key = e.key;
    let leftValue = parseInt(basket.style.left.slice(0, basket.style.left.length - 1))
    if (key == "ArrowRight" && leftValue < (83)) {
        if (leftValue > 78) {
            basket.style.left = `83vw`
        } else {
            basket.style.left = `${leftValue + 5}vw`
        }
    }
    if (key == "ArrowLeft" && leftValue > 0) {
        if (leftValue < 5) {
            basket.style.left = `0vw`
        } else {
            basket.style.left = `${leftValue - 5}vw`
        }
    }
    leftValue = parseInt(basket.style.left.slice(0, basket.style.left.length - 1))

})

//function to start game
function startGame() {
    score = 0;
    document.querySelector(".score").innerHTML = `Score : ${score}`;
    document.querySelector(".highScore").innerHTML = `High Score : ${highScore}`;
    basket.style.left = "0vw"
    egg.style.bottom = "100%"
    main();
}

function main() {
    fallEgg();
    timeout = setTimeout(() => {
        let minBasketValue = parseInt(basket.style.left) + 1;
        let maxBasketValue = parseInt(basket.style.left) + 11;
        let eggValue = parseInt(egg.style.left);
        // console.log(`${minBasketValue} < ${eggValue} < ${maxBasketValue}`)
        if ((eggValue >= minBasketValue) && (eggValue <= maxBasketValue)) {
            egg.style.animation = "none";
            egg.style.bottom = "100%";
            score++;
            document.querySelector(".score").innerHTML = `Score : ${score}`;
            if (score > highScore) {
                highScore = score;
                document.querySelector(".highScore").innerHTML = `High Score : ${highScore}`;
            }
            egg.offsetHeight; //with this browser re-renders the layout-related properties egg
            main();
        } else {
            setTimeout(() => {
                egg.style.animation = "none";
                gameOver();
            }, 100);

        }
    }, 1900);
    return;
}

//function to fall egg
function fallEgg() {
    let eggLeft = Math.floor(Math.random() * 75) + 4;
    egg.style.left = `${eggLeft}vw`
    egg.style.animation = "fallAnimation 2s ease-in";
}

function gameOver() {
    document.querySelectorAll(".score")[1].innerHTML = `Score : ${score}`;
    document.querySelectorAll(".highScore")[1].innerHTML = `High Score : ${highScore}`;
    document.querySelector(".gameOver").style.display = "flex";
    document.querySelector(".playAgain").addEventListener("click", () => {
        document.querySelector(".gameOver").style.display = "none";
        clearTimeout(timeout);
        startGame();
    })
}