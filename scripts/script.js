function showSignUp(){
    document.getElementById('signup').style.display = "flex";
    document.getElementById('home').style.filter = "blur(8px)";
    document.getElementById('home').style.pointerEvents = "none";
}
function changeButton(){
    document.getElementById('signupbutton').style.display = "none";
    document.getElementById('play').style.display = "block";
    document.getElementById('signup').style.display = "none";
    document.getElementById('home').style.filter = "blur(0px)";
    document.getElementById('home').style.pointerEvents = "auto";
}
function createCookie(){
    const username = document.getElementById('user').value;

    setCookie("username", username);
}
function checkCookie() {
    const username = getCookie("username");
    if (username !== "") {
        changeButton();
    }
}
function checkValidUser(){
    let user = document.getElementById('user').value;
    let check = /^[a-zA-Z0-9]+$/.test(user)
    if (check){
        document.getElementById('updateUser').innerHTML = 'Valid username.';
        document.getElementById('okay').disabled = false;
    }else{
        document.getElementById('updateUser').innerHTML = 'Invalid Username. Username must only contain numbers and letters!';
        document.getElementById('okay').disabled = true;
    }
}
function showWelcomeMessage(){
    const message = getCookie("username");
    document.getElementById('welcome-message').innerHTML = "Hello " + message + "!";
    document.getElementById('welcome').style.display = "flex";
    document.getElementById('interface').style.filter = "blur(5px)";
}
function closeWelcomeMessage(){
    document.getElementById('welcome').style.display = "none";
    document.getElementById('interface').style.filter = "blur(0px)";
}
function selectBTB(){
    document.getElementById('title').innerHTML = "Prologue:";
    document.getElementById('loading').src = "images/btb-loading.png";
    document.getElementById('logo').src = "images/btb-logo.webp";
    document.getElementById('play-button').href = "btb.html";
    document.getElementById('btb').classList.add('selected-map');
    document.body.style.backgroundImage = "url(../images/btb-bg.png)";
}
function selectETP(){
    document.getElementById('title').innerHTML = "Episode 1:";
    document.getElementById('loading').src = "images/etp-loading.png";
    document.getElementById('logo').src = "images/etp-logo.webp";
    document.getElementById('play-button').href = "etp.html";
    document.getElementById('etp').classList.add('selected-map');
    document.body.style.backgroundImage = "url(../images/etp-bg.png)";
}
function selectSTD(){
    document.getElementById('title').innerHTML = "Episode 2:";
    document.getElementById('loading').src = "images/std-loading.png";
    document.getElementById('logo').src = "images/std-logo.webp";
    document.getElementById('play-button').href = "std.html";
    document.getElementById('std').classList.add('selected-map');
    document.body.style.backgroundImage = "url(../images/std-bg.png)";
}
function selectITA(){
    document.getElementById('title').innerHTML = "Episode 3:";
    document.getElementById('loading').src = "images/ita-loading.gif";
    document.getElementById('logo').src = "images/ita-logo.webp";
    document.getElementById('play-button').href = "ita.html";
    document.getElementById('ita').classList.add('selected-map');
    document.body.style.backgroundImage = "url(../images/ita-bg.png)";
}
function selectFTC(){
    document.getElementById('title').innerHTML = "Episode 4:";
    document.getElementById('loading').src = "images/ftc-loading.png";
    document.getElementById('logo').src = "images/ftc-logo.webp";
    document.getElementById('play-button').href = "ftc.html";
    document.getElementById('ftc').classList.add('selected-map');
    document.body.style.backgroundImage = "url(../images/ftc-bg.png)";
}
function selectCTM(){
    document.getElementById('title').innerHTML = "Episode 5:";
    document.getElementById('loading').src = "images/ctm-loading.png";
    document.getElementById('logo').src = "images/ctm-logo.webp";
    document.getElementById('play-button').href = "ctm.html";
    document.getElementById('ctm').classList.add('selected-map');
    document.body.style.backgroundImage = "url(../images/ctm-bg.png)";
}
function removeSelection(){
    const maps = document.getElementsByClassName('map');
    for (let i = 0; i < maps.length; i++) {
        maps[i].classList.remove('selected-map');
    }
}
function playCutscene(){
    const selectedMap = document.querySelector('.map.selected-map');
    const mapID = selectedMap.id;
    const cutscene = document.getElementById(mapID + '-cutscene');
    cutscene.style.display="flex";
    document.getElementById('flash').classList.add('flash');

    setTimeout(function() {
        window.location.href = mapID +".html";
    }, 3000);
}