const bootText = document.getElementById("bootText");
const bootLines = [
    `
 ██████   █████                             ███████     █████████ 
░░██████ ░░███                            ███░░░░░███  ███░░░░░███
 ░███░███ ░███   ██████  █████████████   ███     ░░███░███    ░░░ 
 ░███░░███░███  ███░░███░░███░░███░░███ ░███      ░███░░█████████ 
 ░███ ░░██████ ░███████  ░███ ░███ ░███ ░███      ░███ ░░░░░░░░███
 ░███  ░░█████ ░███░░░   ░███ ░███ ░███ ░░███     ███  ███    ░███
 █████  ░░█████░░██████  █████░███ █████ ░░░███████░  ░░█████████ 
░░░░░    ░░░░░  ░░░░░░  ░░░░░ ░░░ ░░░░░    ░░░░░░░     ░░░░░░░░░  
    `,
    "NemOS RECOVERY BOOT LOADER v0.13",
    "",
    "Checking archive integrity...",
    "[CORRUPTED]",
    "",
    "Mounting archive sectors...",
    "[PARTIAL]",
    "",
    "Scanning memory partitions...",
    "[WARNING]",
    "",
    "Loading user profile...",
    "",
    "User:",
    "[Nemo]",
    "",
    "Identity verification...",
    "[FAILED]",
    "",
    "Attempting reconstruction...",
    "[ERROR 0x0013]",
    "",
    "Archive owner could not be verified.",
    "",
    "Recovered records:",
    "- ARCHIVE_NOTICE.txt",
    "- README_FIRST.txt",
    "",
    "Corrupted records:",
    "[UNKNOWN]",
    "",
    "Missing records:",
    "[UNKNOWN]",
    "",
    "ERROR 0x0013",
    "ERROR 0x0013",
    "ERROR 0x0013",
    "",
    "[REDACTED]",
    "",
    "Project [NULL] records detected.",
    "",
    "WARNING:",
    "Recovered files may contain altered or incomplete information.",
    "",
    "[REDACTED]:",
    "01001001 00100000 01100001 01101101 00100000 01110011 01101111 01110010 01110010 01111001 00100000 01100111 01110010 01100001 01101110 01100100 01101101 01100001 00101110 00101110 00101110 00100000",
    "",
    "Grant access to launch NemOS? (Y/N)",
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
        line.includes("REDACTED") ||
        line.includes("UNKNOWN") ||
        line.includes("FAILED") ||
        line.includes("CORRUPTED") ||
        line.includes("PARTIAL")
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
        addLine("");
        addLine("[REDACTED]:")
        addLine("01010100 01101000 01100001 01101110 01101011 00100000 01111001 01101111 01110101 00100000 01110011 01101111 00100000 01101101 01110101 01100011 01101000 00100000 01110110 01101001 01100101 01110111 01100101 01110010 00101110 00101110 00101110");
        addLine("");
        addLine("Launching NemOS...");

        setTimeout(launchDesktop, 1500);
    } else {
        addLine("Access denied.");
        addLine("");
        addLine("ERROR: Firewall integrity compromised.");
        addLine("ERROR: Unauthorized process detected.");
        addLine("");
        addLine("[REDACTED]:")
        addLine("01010000 01101100 01100101 01100001 01110011 01100101 00100000 01100100 01101111 01101110 00100111 01110100 00100000 01100111 01101111 00100000 01100001 01110111 01100001 01111001 00101110 00101110 00101110 00100000");
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
    document.querySelectorAll(".desktopIcon").forEach(i => i.classList.remove("selected"));
    icon.classList.add("selected");
});

icon.addEventListener("dblclick", () => {
    icon.classList.add("selected");
    windowElement.style.display = "block";
});

const archiveItems = [
    {
        id: "diaryFolder",
        name: "Daily_Diary",
        type: "folder",
        unlocked: true,
        expanded: false
    },

    {
        id: "labFolder",
        type: "folder",
        name: "Lab_Logs",
        unlocked: false,
        expanded: false
    },

    {
        id: "securityFolder",
        type: "folder",
        name: "Security_Footage",
        unlocked: false,
        expanded: false
    },

    {
        id: "diary001",
        parent: "diaryFolder",
        type: "file",
        name: "diary_001.txt",
        unlocked: true,

        content: `
    Day 1 on the new project.
        
    They're calling it "Ti-plasmid downprocessing"
    which sounds much cooler than what I studied 
    in college for the past 4 years.
        
    Grandma made cabbage rolls tonight.
        
    I told her about the lab.
        
    She pretends to understand every word.
        
    I love her. She's my reason for living.
    `
    },

    {
        id: "diary002",
        name: "diary_002.txt",
        type: "file",
        parent: "diaryFolder",
        unlocked: false,

        content: `
    I met my supervisor.

    His name is [REDACTED], CODENAME: Donut.
        
    Today he stood next to my bench
    for 3 hours and 41 minutes without saying a word.
        
    Nice guy.
        
    Weird guy.
    `
    }
];

function renderExplorer() {
    const explorer = document.getElementById("explorerContent");
    explorer.innerHTML = "";
    const root=document.createElement("div");
    root.className="explorerRoot";
    root.innerText="▼ ROOT";
    explorer.appendChild(root);
    archiveItems.forEach(item=>{
        if(item.type==="folder" && item.unlocked){
            const folder=document.createElement("div");
            folder.className="explorerFolder";
            folder.innerText=(item.expanded ? "├── " : "├── ") + item.name;
            folder.style.cursor = "pointer";
            folder.onclick=()=>{
                item.expanded=!item.expanded;
                renderExplorer();
            };
            explorer.appendChild(folder);
            if(item.expanded){
                const children = archiveItems.filter(
                    child => child.parent === item.id && child.unlocked
                );
                children.forEach((child,index)=>{
                    if(child.parent===item.id && child.unlocked){
                        const file=document.createElement("div");
                        file.className="explorerFile";
                        file.style.paddingLeft="30px";
                        const branch = index === children.length-1 ? "└──" : "├──";
                        file.innerText = "     " + branch + child.name;
                        file.ondblclick=()=>openFile(child);
                        explorer.appendChild(file);
                    }
                });
            }
        }
    });
}

function openFile(file) {
    document.getElementById("viewerTitle").innerText = file.name;
    document.getElementById("viewerContent").value = file.content;
    openWindow(document.getElementById("fileViewer"));
    if (file.id === "diary001") {
        archiveItems.find(f => f.id === "diary002").unlocked = true;
        renderExplorer();
    }
}

document.getElementById("viewerClose").addEventListener("click", () => {
    closeWindow(document.getElementById("fileViewer"));
});

dragElement(document.getElementById("fileViewer"), document.getElementById("fileViewerHeader"));


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
addWindowTapHandling(document.getElementById("fileViewer"));



document.getElementById("fileText").value = `
[NOTES: LAST SYNC FAILED]

If you are reading this then the sync system probably broke again.

Not surpriseing.

Most things in this archive seem to break eventually.

This folder mostly exists so I don't forget things.

Work notes.
Ideas.
Daily diary.
Reminders.
Recipes grandma keeps insisting I'll lose.

Nothing important.

If files seem incomplete, they're probably corrupted.
Maybe hidden too.

I don't really have an explanation for that one.

Anyways.

If I forget something important, it's probably somewhere else in the
archive.

- [REDACTED], CODENAME: Nemo

01110100 01111001 01110000 01100101 00100000 01110100 01101000 01101001 01110011 00100000 01101001 01110011 00100000 01110100 01101000 01100101 00100000 01110100 01100101 01111000 01110100 00100000 01100010 01101111 01111000 00100000 01100001 01100010 01101111 01110110 01100101
2:9; 3:11; 4:1; 5:16; 9:3; 13:4; 17:7; 18:3;
`;
const readmeCommand = document.getElementById("readmeCommand");
readmeCommand.addEventListener("keydown", function(e){
    if(e.key !== "Enter") return;
    const command = this.value.trim().toLowerCase();
    this.value = "";
    if(command === "remember"){
        document.getElementById("archiveExplorerIcon").style.display="block";
        document.getElementById("fileText").value += 
`\n\n> ${command}
[ARCHIVE RESTORED]

Recovery progress increased by 1.
ARCHIVE_EXPLORER.exe restored.
NemOS is everchanging...`;
fileText.scrollTop = fileText.scrollHeight;
    }
    else{
        document.getElementById("fileText").value +=
`\n\n> ${command}
No response.`;
fileText.scrollTop = fileText.scrollHeight;
    }
});
const archiveExplorerWindow = document.getElementById("archiveExplorerWindow");
const archiveExplorerIcon = document.getElementById("archiveExplorerIcon");
archiveExplorerIcon.addEventListener("click", () => {
    document.querySelectorAll(".desktopIcon").forEach(i => i.classList.remove("selected"));
    archiveExplorerIcon.classList.add("selected");
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

document.addEventListener("click", (e) => {
    if  (
        !archiveExplorerIcon.contains(e.target) && 
        !archiveExplorerWindow.contains(e.target)
        )   {
                !archiveExplorerIcon.classList.remove("selected");
            }
});
renderExplorer();