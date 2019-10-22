var accountContainer;

function logout() {
    accountContainer.innerHTML = "";
    document.cookie = "Logged=false"
}


window.onload = function () {
    dateTimeOnload();
    accountInitOnLoad();
};

function accountInitOnLoad() {
    accountContainer = document.getElementById("accountContainer");
    let logged = getCookie('Logged');
    console.log(logged);
    if (logged == "true") {
        var logOut = document.createElement("div");
        logOut.innerText = "Logout";
        logOut.classList = "round menuItem logOut";
        accountContainer.appendChild(logOut);
        accountContainer.addEventListener("click", logout);
    } else {
    }
}


function setCookie(logged, username, userMap) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}


function save(e) {
    // setCookie()
    e.preventDefault();
    let form = e.target;

}

function del(e) {
    console.log(e)
}

// "Save" and "Delete" buttons
// o By clicking on the "save" button, a cookie will be stored with all the information
// contained
// in the form. If there is a cookie with the same email, the user will be notified that
// there is
// already an account associated with the specified email.
//     o By clicking on the "delete" button, the initial information of the form will be
