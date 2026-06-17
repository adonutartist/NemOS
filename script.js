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
        let newTop = element.offsetTop - currentY;
        let newLeft = element.offsetLeft - currentX;
        newTop = Math.max(
            45,
            Math.min(newTop, window.innerHeight - element.offsetHeight)
        );
        newLeft = Math.max(
            0,
            Math.min(newLeft, window.innerWidth - element.offsetWidth)
        );
        element.style.top = newTop + "px";
        element.style.left = newLeft + "px";
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

const icon = document.getElementById("nemoTXTIcon");
const windowElement = document.getElementById("nemoTXT");
const closeButton = document.getElementById("txtClose");

icon.addEventListener("click", () => {
    icon.classList.add("selected");
});

icon.addEventListener("dblclick", () => {
    icon.classList.add("selected");
    windowElement.style.display = "block";
});

closeButton.addEventListener("click", () => {
    windowElement.style.display = "none";
});

document.addEventListener("click", (e) => {
    if (
        !icon.contains(e.target) &&
        !windowElement.contains(e.target)
    ) {
        icon.classList.remove("selected");
    }
});

var biggestIndex = 1;

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
        handleWindowTap(element)
    )
}

function handleWindowTap(element) {
    biggestIndex++; 
    element.style.zIndex = biggestIndex;
}

function openWindow(element) {
    element.style.display = "flex";
    biggestIndex++;
    element.style.zIndex = biggestIndex;
}

const nemoTXTIcon = addEventListener("dbclick", () => {
    nemoTXTIcon.classList.add("selected");
    openWindow(txtWindow);
})

dragWindow(
    document.getElementById("nemoTXT"),
    document.getElementById("txtHeader")
);

function dragWindow(windowElement, headerElement) {

    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;

    headerElement.onmousedown = dragMouseDown;

    function dragMouseDown(e) {

        e = e || window.event;
        e.preventDefault();

        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {

        e = e || window.event;
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;

        pos3 = e.clientX;
        pos4 = e.clientY;

        windowElement.style.top =
            (windowElement.offsetTop - pos2) + "px";

        windowElement.style.left =
            (windowElement.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {

        document.onmouseup = null;
        document.onmousemove = null;
    }
}

addWindowTapHandling(document.getElementById("welcomeWindow"));
addWindowTapHandling(document.getElementById("nemoTXT"));

const notesArea = document.getElementById("notesArea");

notesArea.value = localStorage.getItem("nemoNotes") || "";

notesArea.addEventListener("input", () => {
    localStorage.setItem(
        "nemoNotes",
        notesArea.value
    );
});