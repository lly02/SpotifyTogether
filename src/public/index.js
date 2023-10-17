let hostButton = document.getElementById("host");
let loader = document.getElementById("loader");
let main = document.getElementById("main");

async function retrieveSession() {
    await chrome.runtime.sendMessage({
        target: "service_worker",
        message: "retrieve session"
    }, data => {
        if (data.connectionType == "Disconnected") refreshMain(defaultPage)
        else getPage(data);
    });
    
    doneLoading();
}

retrieveSession();

hostButton.addEventListener("click", async () => {
    console.log("clickeddd")
    loading();

    await chrome.runtime.sendMessage({
        target: "service_worker",
        message: "host"
    }, data => {
        getPage(data);
    });

    doneLoading();
});

function refreshElements() {
    hostButton = document.getElementById("host");
    loader = document.getElementById("loader");
    main = document.getElementById("main");
}

function refreshMain(html) {
    main.innerHtml = html;
    refreshElements();
}

function getPage(data) {
    main.innerHTML = mainPage;
    document.getElementById("title").innerHTML = data.connectionType;
    document.getElementById("peer").innerHTML = `Your peer ID is ${data.self}`
}

function show(element) {
    element.classList.remove("hidden");
}

function hide(element) {
    element.classList.add("hidden");
}

function loading() {
    hide(main);
    show(loader);
}

function doneLoading() {
    hide(loader);
    show(main);
}

const defaultPage = `
    <button id="host">Host</button>
    <button>Join</button>
    <span id="hosted"></span>
`

const mainPage = `
    <div id="title"></div>
    <div id="peer"></div>
    <div id="connections"></div>
`