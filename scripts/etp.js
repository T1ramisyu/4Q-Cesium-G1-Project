
const videoElements = [
    document.getElementById('video1'),
    document.getElementById('video2-file'),
    document.getElementById('video2-nrgdrink'),
    document.getElementById('video2-teleporter'),
    document.getElementById('video2-rocketlauncher'),
    document.getElementById('video2-cellphone'),
    document.getElementById('video3-window'),
    document.getElementById('video3-celldoor'),
    document.getElementById('video3-crowbar'),
    document.getElementById('video3-disguisingbag'),
    document.getElementById('video3-lawyerfail'),
    document.getElementById('video3-opacitator'),
    document.getElementById('video4-click1'),
    document.getElementById('video4-afterclick'),
    document.getElementById('video4-click1-fail'),
    document.getElementById('video4-click2'),
    document.getElementById('video4-click2-fail'),
    document.getElementById('video4-click3'),
    document.getElementById('video4-click3-fail'),
    document.getElementById('video4-click3-left'),
    document.getElementById('video4-click3-right'),
    document.getElementById('video4-click4-fail'),
    document.getElementById('video4-click4-left'),
    document.getElementById('video4-click4-up'),
    document.getElementById('video5-afterclick'),
    document.getElementById('video5-beltofgrenades'),
    document.getElementById('video5-chair'),
    document.getElementById('video5-chair-left'),
    document.getElementById('video5-chair-right'),
    document.getElementById('video5-click'),
    document.getElementById('video5-click-fail'),
    document.getElementById('video6-jetpack'),
    document.getElementById('video6-parachute'),
    document.getElementById('video6-plungers'),
    document.getElementById('video6-rope')
];
const retryButton = document.getElementById('retryButton');
const loadingBar = document.getElementById('loadingBar');
const loadingText = document.getElementById('loadingText');
const loadingScreen = document.getElementById('loadingScreen');
let scoreTime = 0;
let loadedCount = 0;
const video1 = document.getElementById('video1');

function updateLoadingBar(loaded, total) {
    const percent = Math.floor((loaded / total) * 100);
    loadingBar.style.width = percent + '%';
    loadingText.textContent = 'Loading: ' + percent + '%';
}

function preloadExistingVideos(videos, onAllLoaded) {
    videos.forEach((video) => {
        video.load();
        video.addEventListener('canplaythrough', () => {
            loadedCount++;
            updateLoadingBar(loadedCount, videos.length);

            if (loadedCount === videos.length) {
                onAllLoaded();
            }
        });
    });
}

function formatTime(ms) {
    const totalSeconds = ms / 1000;
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
    const hundredths = Math.floor((totalSeconds * 100) % 100).toString().padStart(2, '0');
    return `${minutes}:${seconds}.${hundredths}`;
}

function startGame() {
    video1.style.display = 'block';
    document.getElementById('skip').style.display='flex';
    video1.play();
    document.getElementById('startButton').style.display = 'none';

    const scoreDisplay = document.getElementById('scoreDisplay');
    startTime = performance.now();
    scoreDisplay.style.display = 'flex';

    scoreInterval = setInterval(() => {
        const now = performance.now();
        const elapsed = now - startTime;
        scoreDisplay.textContent = formatTime(elapsed);
    }, 50);
}

function showStart() {
    loadingScreen.style.display = 'none';
    document.getElementById('startButton').style.display = 'flex';
}

preloadExistingVideos(videoElements, showStart);

function afterScene(videonumber) {
    const choice = 'choices-overlay' + videonumber;
    document.getElementById(choice).style.display = "flex";
}

document.getElementById('video1').addEventListener('ended', () => {
    afterScene('1');
});

document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', startGame);
});
function afterChoice1Scene(itemChoice) {
    let videoID = "video2-" + itemChoice;
    document.getElementById('video1').style.display = 'none';
    document.getElementById('skip').style.display = 'none';
    document.getElementById('choices-overlay1').style.display = 'none';
    retryButton.onclick = () => retry('choices-overlay1', 'video1');
    playVideo(videoID);

    let vid = document.getElementById(videoID);
    vid.onended = () => {
        if (itemChoice === 'file') {
            afterScene('2')
        }else if (itemChoice === 'cellphone'){
            afterScene('6');
        }else if (itemChoice === 'drill'){
            afterScene('7')
        }else {
            showFail(itemChoice);
        }
    };
}
function afterChoice2Scene(itemChoice) {
    let videoID = "video3-" + itemChoice;
    document.getElementById('video2-file').style.display = 'none';
    document.getElementById('choices-overlay2').style.display = 'none';
    playVideo(videoID);

    let vid = document.getElementById(videoID);
    vid.onended = () => {
        if (itemChoice === 'celldoor') {
            clickfile1();
        }else {
            showFail(itemChoice);
            retryButton.onclick = () => retry('choices-overlay1', 'video1');
        }
    };
}
function afterChoice3Scene(itemChoice){
    let videoID = "video5-" + itemChoice;
    document.getElementById('video4-afterclick').style.display = 'none';
    document.getElementById('choices-overlay3').style.display = 'none';
    playVideo(videoID);

    let vid = document.getElementById(videoID);
    vid.onended = () => {
        if (itemChoice === 'chair') {
            afterScene('4');
        }else {
            showFail(itemChoice);
            retryButton.onclick = () => retry('choices-overlay3', 'video4-afterclick');
        }
    };
}
function afterChoice4Scene(itemChoice){
    let videoID = "video5-" + itemChoice;
    document.getElementById('video5-chair').style.display = 'none';
    document.getElementById('choices-overlay4').style.display = 'none';
    playVideo(videoID);

    let vid = document.getElementById(videoID);
    vid.onended = () => {
        if (itemChoice === 'chair-right') {
            afterScene('5');
        }else {
            showFail(itemChoice);
            retryButton.onclick = () => retry('choices-overlay3', 'video4-afterclick');
        }
    };
}
function afterChoice5Scene(itemChoice){
    let videoID = "video6-" + itemChoice;
    document.getElementById('video5-chair-right').style.display = 'none';
    document.getElementById('choices-overlay5').style.display = 'none';
    playVideo(videoID);

    let vid = document.getElementById(videoID);
    if(itemChoice==='plungers'){
        vid.addEventListener('timeupdate', function checkTime() {
            if (vid.currentTime >= 12) {
                stopTimer();
                vid.removeEventListener('timeupdate', checkTime);
            }
        });
    }
    
    vid.onended = () => {
        if (itemChoice === 'plungers') {
            showWin();
        }else {
            showFail(itemChoice);
            retryButton.onclick = () => retry('choices-overlay5', 'video5-chair-right');
        }
    };
}
function afterChoice6Scene(itemChoice){
    let videoID = "video3-" + itemChoice;
    document.getElementById('video2-cellphone').style.display = 'none';
    document.getElementById('choices-overlay6').style.display = 'none';
    playVideo(videoID);

    let vid = document.getElementById(videoID);
    if (itemChoice==='disguisingbag'){
        vid.addEventListener('timeupdate', function checkTime() {
            if (vid.currentTime >= 102) {
                stopTimer();
                vid.removeEventListener('timeupdate', checkTime);
            }
        });
    }
    vid.onended = () => {
        if (itemChoice === 'disguisingbag') {
            showWin();
        }else {
            showFail('lawyerfail');
            retryButton.onclick = () => retry('choices-overlay6', 'video2-cellphone');
        }
    };
}
function afterChoice7Scene(itemChoice) {
    let videoID = "video3-" + itemChoice;
    const vid = document.getElementById(videoID);
    const skipButton = document.getElementById('skip1');
    document.getElementById('video2-drill').style.display = 'none';
    document.getElementById('choices-overlay7').style.display = 'none';

    if (itemChoice === 'crowbar') {
        playVideo(videoID);
        vid.onended = () => {
            clickfile3();
        };
    } else if (itemChoice === 'opacitator') {
        playVideo(videoID);

        setTimeout(() => {
            skipButton.style.display = 'flex';

            const hideAt = 19.33;

            function checkSkipHide() {
                if (vid.currentTime >= hideAt) {
                    skipButton.style.display = 'none';
                    vid.removeEventListener('timeupdate', checkSkipHide);
                }
            }

            vid.addEventListener('timeupdate', checkSkipHide);

            const skipClickHandler = () => {
                vid.currentTime = hideAt;
                skipButton.style.display = 'none';
                skipButton.removeEventListener('click', skipClickHandler);
                vid.removeEventListener('timeupdate', checkSkipHide);
            };

            skipButton.addEventListener('click', skipClickHandler);
        }, 1000);

        vid.onended = () => {
            showFail('opacitator');
            retryButton.onclick = () => retry('choices-overlay7', 'video2-drill');
        };
    }
}


function clickfile1() {
    let videoID = "video4-click1";
    document.getElementById('fail').style.display = 'none';
    document.getElementById('video4-click1-fail').style.display = 'none';
    document.getElementById('video4-click2-fail').style.display = 'none';
    document.getElementById('video3-celldoor').style.display = 'none';

    let vid = document.getElementById(videoID);
    const arrow1 = document.getElementById('arrow1');
    const arrow1Holder = document.getElementById('arrow1-holder');
    let success = false;
    let failTimeout;

    vid.onended = () => {
        arrow1Holder.style.display = 'flex';
        failTimeout = showProgressBar(1000, () => {
            if (!success) {
                arrow1Holder.style.display = 'none';
                vid.style.display = 'none';
                playVideo('video4-click1-fail');
                document.getElementById('video4-click1-fail').onended = () => {
                    showFail('click1');
                    retryButton.onclick = () => clickfile1();
                };
            }
        });
    };

    arrow1.addEventListener('click', () => {
        if (success) return;
        success = true;
        clearTimeout(failTimeout);
        document.getElementById('click-timer-bar-container').style.display = 'none';
        arrow1Holder.style.display = 'none';
        clickfile2();
    }, { once: true });

    playVideo(videoID);
}
function clickfile2() {
    let videoID = "video4-click2";
    document.getElementById('video4-click1').style.display = 'none';
    document.getElementById('video4-click2-fail').style.display = 'none';

    let vid = document.getElementById(videoID);
    const arrow2 = document.getElementById('arrow2');
    const arrow2Holder = document.getElementById('arrow2-holder');
    let success = false;
    let failTimeout;

    vid.onended = () => {
        arrow2Holder.style.display = 'flex';
        failTimeout = showProgressBar(1000, () => {
            if (!success) {
                arrow2Holder.style.display = 'none';
                vid.style.display = 'none';
                playVideo('video4-click2-fail');
                document.getElementById('video4-click2-fail').onended = () => {
                    showFail('click2');
                    retryButton.onclick = () => clickfile1();
                };
            }
        });
    };

    arrow2.addEventListener('click', () => {
        if (success) return;
        success = true;
        clearTimeout(failTimeout);
        document.getElementById('click-timer-bar-container').style.display = 'none';
        arrow2Holder.style.display = 'none';
        vid.style.display = 'none';
        playVideo('video4-afterclick');
    }, { once: true });

    playVideo(videoID);
}

function clickfile3() {
    let videoID = "video4-click3";
    const vid = document.getElementById(videoID);
    const arrowLeft = document.getElementById('arrow1-left');
    const arrowRight = document.getElementById('arrow1-right');
    const arrowHolder = document.getElementById('arrows1');

    document.getElementById('fail').style.display = 'none';
    document.getElementById('video4-click3-fail').style.display = 'none';
    document.getElementById('video4-click4-fail').style.display = 'none';
    document.getElementById('video3-crowbar').style.display = 'none';

    let clicked = false;
    let failTimeout;

    vid.onended = () => {
        arrowHolder.style.display = 'flex';

        failTimeout = showProgressBar(1000, () => {
            if (!clicked) {
                arrowHolder.style.display = 'none';
                vid.style.display = 'none';
                playVideo('video4-click3-fail');
                document.getElementById('video4-click3-fail').onended = () => {
                    showFail('click3');
                    retryButton.onclick = () => clickfile3();
                }
            }
        });
    };

    const handleClick = (isCorrect) => {
        if (clicked) return;
        clicked = true;
        clearTimeout(failTimeout);
        document.getElementById('click-timer-bar-container').style.display = 'none';
        arrowHolder.style.display = 'none';
        vid.style.display = 'none';

        if (isCorrect) {
            clickfile4();
        } else {
            playVideo('video4-click3-right');
            document.getElementById('video4-click3-right').onended = () => {
                showFail('click3-right');
                retryButton.onclick = () => clickfile3();
            };
        }
    };

    arrowLeft.addEventListener('click', () => handleClick(true), { once: true });
    arrowRight.addEventListener('click', () => handleClick(false), { once: true });

    playVideo(videoID);
}
function clickfile4() {
    let videoID = "video4-click3-left";
    const vid = document.getElementById(videoID);
    const arrowLeft = document.getElementById('arrow2-left');
    const arrowUp = document.getElementById('arrow2-up');
    const arrowHolder = document.getElementById('arrows2');

    document.getElementById('video4-click3').style.display = 'none';
    document.getElementById('video4-click3-fail').style.display = 'none';
    document.getElementById('video4-click3-right').style.display = 'none';
    document.getElementById('fail').style.display = 'none';

    let clicked = false;
    let failTimeout;

    vid.onended = () => {
        arrowHolder.style.display = 'flex';

        failTimeout = showProgressBar(1000, () => {
            if (!clicked) {
                clicked = true;
                arrowHolder.style.display = 'none';
                vid.style.display = 'none';
                playVideo('video4-click4-fail');
                document.getElementById('video4-click4-fail').onended = () => {
                    showFail('click4');
                    retryButton.onclick = () => clickfile4();
                };
            }
        });
    };

    const handleClick = (isCorrect) => {
        if (clicked) return;
        clicked = true;
        clearTimeout(failTimeout);
        document.getElementById('click-timer-bar-container').style.display = 'none';
        arrowHolder.style.display = 'none';
        vid.style.display = 'none';

        if (isCorrect) {
            playVideo('video4-click4-up');
            document.getElementById('video4-click4-up').onended = () => {
                clickfile5();
            }
        } else {
            playVideo('video4-click4-left');
            document.getElementById('video4-click4-left').onended = () => {
                showFail('click4');
                retryButton.onclick = () => clickfile4();
            };
        }
    };

    arrowUp.addEventListener('click', () => handleClick(true), { once: true });
    arrowLeft.addEventListener('click', () => handleClick(false), { once: true });

    playVideo(videoID);
}
function clickfile5() {
    let videoID = "video5-click";
    const vid = document.getElementById(videoID);
    const finalClick = document.getElementById('finalclick');

    document.getElementById('video4-click3-left').style.display = 'none';
    document.getElementById('video4-click4-fail').style.display = 'none';
    document.getElementById('video4-click4-left').style.display = 'none';
    document.getElementById('video4-click4-up').style.display = 'none';
    document.getElementById('fail').style.display = 'none';

    let clicked = false;
    let failTimeout;

    const showBarThreshold = 0.5;

    function checkForBar() {
        if (vid.duration && vid.currentTime >= vid.duration - showBarThreshold) {
            vid.removeEventListener('timeupdate', checkForBar);

            finalClick.style.display = 'block';

            failTimeout = setTimeout(() => {
                if (!clicked) {
                    clicked = true;
                    finalClick.style.display = 'none';
                    vid.style.display = 'none';
                    playVideo('video5-click-fail');
                    document.getElementById('video5-click-fail').onended = () => {
                        showFail('click5');
                        retryButton.onclick = () => clickfile5();
                    };
                }
            }, 1000);
        }
    }

    vid.addEventListener('timeupdate', checkForBar);

    finalClick.addEventListener('click', () => {
        if (clicked) return;
        clicked = true;
        clearTimeout(failTimeout);
        finalClick.style.display = 'none';
        vid.style.display = 'none';

        playVideo('video5-afterclick');
        const afterVid = document.getElementById('video5-afterclick');

        afterVid.addEventListener('timeupdate', function checkTime() {
            if (afterVid.currentTime >= 26) {
                stopTimer();
                afterVid.removeEventListener('timeupdate', checkTime);
            }
        });

        afterVid.onended = () => {
            showWin();
        };
    }, { once: true });

    playVideo(videoID);
}



document.getElementById('video4-afterclick').addEventListener('ended', () => {
    afterScene('3');
});

function showFail(itemChoice){
    const failedChoice = itemChoice + '-fail-comment';
    document.getElementById('fail').style.display = 'flex';
    document.getElementById('fail-comment').classList.add(failedChoice);
}
function playVideo(videoID) {
    let vid = document.getElementById(videoID);
    vid.style.display = "block";
    vid.play();
}

function retry(choiceOverlay, videoID){
    const allVideos = document.querySelectorAll('#scenes video');
    const failComment = document.getElementById('fail-comment');
    allVideos.forEach(video => {
            video.style.display = 'none';
    });
    document.getElementById(choiceOverlay).style.display = 'flex';
    document.getElementById(videoID).style.display = 'block';
    document.getElementById('fail').style.display = 'none';
    while (failComment.classList.length > 0) {
        failComment.classList.remove(failComment.classList.item(0));
    }
}
   

document.getElementById('home').addEventListener('click', () => {
    window.location.href = 'home.html';
});
document.getElementById('skip').addEventListener('click', () => {
    video1.currentTime = video1.duration;
});


let currentState = 'normal';

function playForward(item, itemWord) {
    if (currentState === 'forward') return;
    
    const animationForward = item.id + '-forward';
    const animationWordForward = itemWord.id + '-forward';

    item.classList.add(animationForward);
    itemWord.classList.add(animationWordForward);
}

function resetAnimation(item, itemWord) {
    const animationForward = item.id + '-forward';
    const animationWordForward = itemWord.id + '-forward';

    item.classList.remove(animationForward);
    itemWord.classList.remove(animationWordForward);

    currentState = 'normal';
}

function showProgressBar(duration, onTimeout) {
    const barContainer = document.getElementById('click-timer-bar-container');
    const bar = document.getElementById('click-timer-bar');


    barContainer.style.display = 'block';
    bar.style.transition = 'none';
    bar.style.width = '100%';


    void bar.offsetWidth;


    bar.style.transition = `width ${duration}ms linear`;
    bar.style.width = '0%';


    return setTimeout(() => {
        barContainer.style.display = 'none';
        bar.style.transition = 'none';
        bar.style.width = '100%';
        if (typeof onTimeout === 'function') {
            onTimeout();
        }
    }, duration);
}
function showWin(){
            const finalTime = performance.now() - startTime;
            const formattedTime = formatTime(finalTime);
            const highScoreDiv = document.getElementById('previousHighScore');
            const currentScoreDiv = document.getElementById('currentScore');                
            const previousBest = localStorage.getItem('highScoreETP');
                if (!previousBest || finalTime < parseFloat(previousBest)) {
                    localStorage.setItem('highScoreETP', finalTime);
                    highScoreDiv.textContent = `New High Score: ${formattedTime}`;
                } else {
                    highScoreDiv.textContent = `High Score: ${formatTime(previousBest)}`;
                }
    
                currentScoreDiv.textContent = `Current Score: ${formattedTime}`;
                document.getElementById('scoreDisplay').style.display = 'none';
                document.getElementById('highScore').style.display = 'block';
                document.getElementById('home').style.display = 'block';
}
function stopTimer() {
    clearInterval(scoreInterval);
    document.getElementById('scoreDisplay').style.color = '#418843';
}
