// When the user clicks on <div>, open the popup
function displayClosePopup() {
    var r = confirm("Do you really want to delete this post?");
    if (r == true) {
        deletePost();
    }
    //var popup = document.getElementById("myPopup");
    //popup.classList.toggle("show");
}

function deletePost() {
    var post = document.getElementById("round");
    post.style.display = "none";
    
}

function like(button) {
    button.backgroundImage = 'data:image/png;base64,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';
}

function displayLikeTooltip() {
    var popup = document.getElementById("likePopup");
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
