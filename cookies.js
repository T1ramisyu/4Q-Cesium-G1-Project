function setCookie(cookieName, cookieValue, expires="", path="/") {
    // set default expiry when not specified
    if (expires === "") {
        let currentDate = new Date();
        // expire cookie next year
        expires = new Date(
            currentDate.getFullYear()+1,
            currentDate.getMonth(),
            currentDate.getDay())
    }

    cookie = ""
    cookie += `${cookieName}=${cookieValue};`
    cookie += `expires=${(new Date(expires)).toUTCString()};`
    cookie += `path=${path};`;
    
    document.cookie = cookie;
    
}

/* This function is called from checkCookie() as well,
in this getCookie() function, the username is derived by splitting
the string stored in the cookie. Each key-value pair is separated by
semicolons. Then the key and value are separated by equal signs. */
function getCookie(cookieName) {
    var key = cookieName + "=";
    var retrieveCookie = document.cookie;
    var ca = retrieveCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(key) == 0) {
            return c.substring(key.length, c.length);
        }
    }
    return "";
}