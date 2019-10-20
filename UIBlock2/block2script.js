// When the user clicks on <div>, open the popup
function displayClosePopup(id, message) {
    message = message ? message : "Do you really want to delete this post?";
    var r = confirm(message);
    if (r == true) {
        deleteElement(id);
    }
    //var popup = document.getElementById("myPopup");
    //popup.classList.toggle("show");
}

function deleteElement(id) {
    var post = document.getElementById(id);
    post.style.display = "none";

}

function like(id) {
    var likeIcon = document.getElementById(id);
    style = likeIcon.currentStyle || window.getComputedStyle(likeIcon, false);
    if (style.backgroundImage.slice(-19, -2) == 'thumb_up-24px.svg'){
        likeIcon.style.backgroundImage = "url('thumb_up_filled-24px.svg')";
    } else {
        likeIcon.style.backgroundImage = "url('thumb_up-24px.svg')";
    }
}

function displayLikeTooltip() {
    var popup = document.getElementById("likeChoice");
    popup.classList.toggle("show");
}

function hideLikeTooltip() {
    var popup = document.getElementById("likePopup");
    popup.classList.toggle("hide");
}

function displayCommentTooltip() {
    var popup = document.getElementById("commentPopup");
    popup.classList.toggle("show");
}

function displayShareTooltip() {
    var popup = document.getElementById("sharePopup");
    popup.classList.toggle("show");
}

function toggleMenu(id) {
    console.log("we got here.");
    var popup = document.getElementById(id);
    popup.classList.toggle("hide");
}

window.onload = function(){
    getDateTime(["datetime1", "datetime2"]);
}

function getDateTime(idList) {
    var dt = new Date();
    for (var id of idList) {
        document.getElementById(id).innerHTML = (("0" + (dt.getMonth() + 1)).slice(-2)) + "/" + (("0" + dt.getDate()).slice(-2)) + "/" + (dt.getFullYear()) + " " + dt.getHours() + ":" + dt.getMinutes();
    }
}
