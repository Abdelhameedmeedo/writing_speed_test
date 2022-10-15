//variables
let selectedTime = document.querySelector('.change-time select')
let leftCountDown = document.querySelector('.left-time .count-down')
let totalTime = document.querySelector('.total-time .total-time-value')
let playButton = document.querySelector('.play')
let score = document.querySelector('.score')
let showingText = document.querySelector('.showing-text')
let inputFiled = document.querySelector('.content input')
let defaultTime = 3
let scoreCount = 0;
//list of texts
words = ['welcome','javascript','php','kotlin','python','perl','c#','flutter','Rust','Ruby','dart']
totalTime.textContent =  defaultTime
leftCountDown.textContent = defaultTime
score.textContent = `score : ${scoreCount}`
//false input field paste 
inputFiled.onpaste = ()=>{
    return false
}
//change timer before play the game
selectedTime.onchange = ()=>{
    defaultTime = selectedTime.value
    leftCountDown.textContent = defaultTime
    totalTime.textContent =  defaultTime
}
//start game
playButton.addEventListener('click',()=>{
    playButton.classList.add('non-click')
    selectedTime.onchange = ()=>{return false}    //stop change timer while playing
    inputFiled.style.pointerEvents = 'unset'      //allow input writting
    inputFiled.focus()
    randomText()
    countDownTime()
 
})

//showing random text
function randomText(){
    //get random word
    let gettingWord = words[Math.floor(Math.random() * words.length)]
    //get word index
    let gettingWordIndex = words.indexOf(gettingWord)
    //remove word that appeard
    words.splice(gettingWordIndex,1)
    showingText.textContent = gettingWord
}

//start time
function countDownTime(){
    //reset time to not count with -
    leftCountDown.textContent = defaultTime
    let setInt = setInterval(()=>{
        leftCountDown.textContent --
        if(leftCountDown.textContent === '0'){
            clearInterval(setInt)
            //compare words
            if(inputFiled.value.toLowerCase() === showingText.textContent.toLowerCase()){
                inputFiled.value = ''
                if(words.length > 0){
                    randomText()
                }else{
                        if(words.length == 0){
                            let noItems = document.createElement('span')
                            noItems.className = 'no-items'
                            noItems.textContent = 'No items available'
                            document.body.appendChild(noItems)
                        }
                }
                countDownTime()
                scoreCount++
                score.textContent = `score : ${scoreCount}`
            }else{
                showingText.textContent = 'words here'
                let gameOver = document.createElement('div')
                    gameOver.className = 'game-over'
                let gameOverSpan1 = document.createElement('span')
                    gameOverSpan1.className = 'game-over-span'   
                    gameOverSpan1.textContent = 'Game Over!'
                let gameOverSpan2 = document.createElement('span')
                    gameOverSpan2.className = 'game-over-span'   
                    gameOverSpan2.textContent = `Your score : ${scoreCount}`
                let closeBtn = document.createElement('button')
                    closeBtn.className = 'close-btn'
                    closeBtn.textContent = 'x'
                    gameOver.appendChild(closeBtn)
                    gameOver.appendChild(gameOverSpan1)
                    gameOver.appendChild(gameOverSpan2)
                    document.body.appendChild(gameOver)
                document.querySelector('.close-btn').addEventListener('click',()=>{
                    document.querySelector('.game-over').remove()
                    playButton.classList.remove('non-click')
                    inputFiled.value = ''
                    score.textContent = `score : ${scoreCount=0}`
                })
            }
        }
    },1000)
}
