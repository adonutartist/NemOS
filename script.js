const bootText = document.getElementById("bootText");
const bootLines = [
    "Initializing NemOS Recovery Build...",
    "",
    "Loading kernel...",
    "Mounting archive sectors...",
    "Scanning memory partitions...",
    "Loading user profiles...",
    "",
    "[WARNING] Archive corruption detected.",
    "",
    "Attempting recovery...",
    "",
    "USER: Nemo",
    "ACCESS LEVEL: Administrator",
    "",
    "Fetching identity...",
    "",
    "IDENTITY STATUS: ERROR",
    "ATTEMPTING RECOVERY...",
    "",
    "ERROR 0x0013",
    "ERROR 0x0013",
    "ERROR 0x0013",
    "",
    "[REDACTED]",
    "",
    "Project NULL records detected.",
    "",
    "Memory Archive available.",
    "",
    "Grant access to launch NemOS? (y/n)",
];

let lineIndex = 0;
let waitingForAnswer = false;

function launchDesktop() {
    document.getElementById("bootScreen").style.display = "none";
    document.getElementById("desktop").style.display = "block";
}
const line = bootLines[lineIndex];
function addLine(line) {
    if (
        line.includes("ERROR") ||
        line.includes("WARNING") ||
        line.includes("REDACTED")
    ) {
        bootText.innerHTML +=
            `<span class="red">${line}</span>\n`;
    } else {
        bootText.innerHTML += line + "\n";
    }
    window.scrollTo(0, document.body.scrollHeight);
    const bootScreen = document.getElementById("bootScreen");
    requestAnimationFrame(() => {
        bootScreen.scrollTop = bootScreen.scrollHeight;
    });
}

function typeBootLine() {
    if (lineIndex >= bootLines.length) {
        waitingForAnswer = true;
        return;
    }
    addLine(bootLines[lineIndex]);
    lineIndex++;
    setTimeout(typeBootLine, 250);
}
document.addEventListener("keydown", function(event) {
    if (!waitingForAnswer) return;
    const key = event.key.toLowerCase();
    if (key !== "y" && key !== "n") return;
    waitingForAnswer = false;
    addLine("");
    addLine("> " + key.toUpperCase());
    addLine("");
    if (key == "y") {
        addLine("Access granted.");
        addLine("Launching NemOS...");

        setTimeout(launchDesktop, 1500);
    } else {
        addLine("Access denied.");
        addLine("");
        addLine("ERROR: Firewall integrity compromised.");
        addLine("ERROR: Unauthorized process detected.");
        addLine("");
        addLine("Forceful access granted to NemOS.");
        addLine("Launching NemOS...");
        setTimeout(launchDesktop, 2500);
    }
});

typeBootLine();

setInterval(function () {
    document.querySelector("#timeElement").innerHTML = new
    Date().toLocaleString();
}, 1000);

dragElement(
    document.getElementById("welcomeWindow"),
    document.getElementById("welcomeHeader") 
);
function dragElement(element, header) {
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = dragWindow;
    }

    function dragWindow(e) {
        e = e || window.event;
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        let newTop = element.offsetTop - currentY;
        let newLeft = element.offsetLeft - currentX;
        newTop = Math.max(
            47,
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

const icon = document.getElementById("nemoTXTIcon");
const windowElement = document.getElementById("nemoTXT");
const closeButton = document.getElementById("txtClose");
let selectedIcon = null;
icon.addEventListener("click", () => {
    document.querySelectorAll(".desktopIcon").forEach(i => i.classList.add("selected"));
    icon.classList.add("selected");
});

icon.addEventListener("dblclick", () => {
    icon.classList.add("selected");
    windowElement.style.display = "block";
});

closeButton.addEventListener("click", () => {
    windowElement.style.display = "none";
    document.getElementById("archiveExplorerIcon").style.display = "block";
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

        let newTop = windowElement.offsetTop - pos2;
        let newLeft = windowElement.offsetLeft - pos1;

        const topBarHeight = document.querySelector(".topBar").offsetHeight;
        newTop = Math.max(
            topBarHeight,
            Math.min(
                newTop,
                window.innerHeight - windowElement.offsetHeight
            )
        );
        newLeft = Math.max(
            0,
            Math.min(
                newLeft,
                window.innerWidth - windowElement.offsetWidth
            )
        );
        windowElement.style.top = newTop + "px";

        windowElement.style.left = newLeft + "px";
    }

    function closeDragElement() {

        document.onmouseup = null;
        document.onmousemove = null;
    }
}

addWindowTapHandling(document.getElementById("welcomeWindow"));
addWindowTapHandling(document.getElementById("nemoTXT"));



document.getElementById("fileText").innerText = `
My name is Nemo.

The records contained within this system are incomplete. Several
files have been damaged, hidden, or deliberately removed.

You may encounter references to a project known as NULL.

Do not assume these records are accurate.

Do not assume they are false either.

Memory is fragile.

The human mind is even more fragile.

There is one subject in particular whose records appear throughout
this archive.

Designation: 13

Most Information regarding Subject 13 has been lost.

Perhaps that is for the best.

Additional archive files may become available as damaged records
are recovered.

Proceed with caution.

-Nemo`

const archiveExplorerWindow = document.getElementById("archiveExplorerWindow");
const archiveExplorerIcon = document.getElementById("archiveExplorerIcon");
archiveExplorerIcon.addEventListener("click", () => {
    if (selectedIcon && selectedIcon !== archiveExplorerIcon) {
        deselectIcon(selectedIcon);
    }
    selectIcon(archiveExplorerIcon);
});
archiveExplorerIcon.addEventListener("dblclick", () => {
    openWindow(
        archiveExplorerWindow 
    );
});

const archiveExplorerClose = document.getElementById("archiveExplorerClose");
archiveExplorerClose.addEventListener(
    "click", () => {
        closeWindow(
            archiveExplorerWindow
        );
    }
);

dragElement(
    document.getElementById("archiveExplorerWindow"),
    document.getElementById("archiveExplorerHeader")
);

addWindowTapHandling(
    document.getElementById("archiveExplorerWindow")
);