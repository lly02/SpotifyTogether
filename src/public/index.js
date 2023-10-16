const hostButton = document.getElementById("host");
const loader = document.getElementById("loader");
const main = document.getElementById("main");

async function retrieveSession() {
    const mainPage = await chrome.runtime.sendMessage({
        target: "service_worker",
        message: "retrieve session"
    });
    
    if (mainPage != "") main.innerHTML = mainPage;
    
    doneLoading();
}

retrieveSession();

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

hostButton.addEventListener("click", () => {
    chrome.runtime.sendMessage("host", res => {
        document.getElementById("hosted").innerHTML = `Hosted at ${res}`;
    });
});