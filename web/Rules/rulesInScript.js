window.onload = prepare();

function prepare() {
    removeOld();
    document.getElementById("Rule1").style.display = "block";
    document.getElementById("Rule1Button").className += " active";
}

function removeOld(){
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
}

function openRule(Button, RuleName) {
    removeOld();
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(RuleName).style.display = "block";
    document.getElementById(Button).className += " active";
}


/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function sidebarOpenClose() {
    // client width - vyska aj s padding
    if (document.getElementById("mySidebar").clientWidth === 0) {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    } else {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    }
}


