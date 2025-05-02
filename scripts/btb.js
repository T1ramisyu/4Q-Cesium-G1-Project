
    const videoElements = [
        document.getElementById('video1'),
        document.getElementById('video2-shovel'),
        document.getElementById('video2-explosives'),
        document.getElementById('video2-teleporter'),
        document.getElementById('video2-lazer'),
        document.getElementById('video2-wreckingball'),
        document.getElementById('video2-disguise')
    ];
    
    const loadingBar = document.getElementById('loadingBar');
    const loadingText = document.getElementById('loadingText');
    const loadingScreen = document.getElementById('loadingScreen');
    let scoreTime = 0;
    let loadedCount = 0;
    
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
        const video1 = document.getElementById('video1');
        video1.style.display = 'block';
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
    
    function showChoices() {
        document.getElementById('choices-overlay').style.display = "flex";
    }
    
    function afterScene(videoID) {
        showChoices();
    }
    
    document.getElementById('video1').addEventListener('ended', () => {
        afterScene('video1');
    });
    
    document.addEventListener("DOMContentLoaded", function () {
        const startButton = document.getElementById('startButton');
        startButton.addEventListener('click', startGame);
    });
    
    function afterChoiceScene(itemChoice) {
        let videoID = "video2-" + itemChoice;
        document.getElementById('video1').style.display = 'none';
        document.getElementById('choices-overlay').style.display = 'none';
        playVideo(videoID);
    
        let vid = document.getElementById(videoID);
        vid.onended = () => {
            if (itemChoice === 'disguise') {
                // WIN CASE: Show final score
                clearInterval(scoreInterval);
                const finalTime = performance.now() - startTime;
                const formattedTime = formatTime(finalTime);
                const highScoreDiv = document.getElementById('previousHighScore');
                const currentScoreDiv = document.getElementById('currentScore');
                const previousBest = localStorage.getItem('highScore');
    
                if (!previousBest || finalTime < parseFloat(previousBest)) {
                    localStorage.setItem('highScore', finalTime);
                    highScoreDiv.textContent = `New High Score: ${formattedTime}`;
                } else {
                    highScoreDiv.textContent = `High Score: ${formatTime(previousBest)}`;
                }
    
                currentScoreDiv.textContent = `Current Score: ${formattedTime}`;
                document.getElementById('scoreDisplay').style.display = 'none';
                document.getElementById('highScore').style.display = 'block';
                document.getElementById('home').style.display = 'block';
            } else {
                document.getElementById('fail').style.display = 'flex';
            }
        };
    }
    
    function playVideo(videoID) {
        let vid = document.getElementById(videoID);
        vid.style.display = "block";
        vid.play();
    }
    
    document.getElementById('retryButton').addEventListener('click', () => {
        const allVideos = document.querySelectorAll('#scenes video');
        allVideos.forEach(video => {
            video.style.display = 'none';
        });
    
        document.getElementById('choices-overlay').style.display = 'flex';
        video1.style.display = 'block';
        document.getElementById('fail').style.display = 'none';
    });
    
    document.getElementById('home').addEventListener('click', () => {
        window.location.href = 'home.html';
    });
    
