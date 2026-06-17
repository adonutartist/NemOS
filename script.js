setInterval(function () {
    document.querySelector("#timeElement").innerHTML = new
    Date().toLocaleString();
}, 1000);

dragElement(document.getElementById("welcomeWindow"));
function dragElement(element) {
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    if (document.getElementById(element.id + "welcomeHeader")) {
        document.getElementById(element.id + "welcomeHeader").onmousedown = dragMouseDown;
    } else {
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = dragElement;
    }

    function dragElement(e) {
        e = e || window.event;
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

var welcomeScreen = document.querySelector("#welcomeWindow")

function closeWindow(element) {
    element.style.display = "none"
}

function openWindow(element) {
    element.style.display = "flex"
}

var welcomeScreenClose = document.querySelector('#welcomeClose');

var welcomeScreenOpen = document.querySelector('#welcomeOpen');

welcomeScreenClose.addEventListener("click", function() {
    closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
});

var selectedApp = undefined

function selectApp(element) {
    element.classList.add("desktopApps");
    selectedApp = element
}

function deselectApp(element) {
    element.classList.remove("desktopApps");
    selectedApp = undefined
}

function handleAppTap(element) {
    if (element.classList.contains("desktopApps")) {
        deselectApp(element)
        openWindow(window)
    } else {
        selectApp(element)
    }
}