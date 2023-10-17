async function retrieveSession() {
    loading();

    await chrome.runtime.sendMessage({
        target: "service_worker",
        message: "retrieve session"
    }, data => {
        if (data.connectionType == "Disconnected") {
            setPage(defaultPage);
        }
        else setPage(mainPage, data);
    });
    
    doneLoading();
}

retrieveSession();

function setPage(html, data=null) {
    main.innerHTML = html;

    switch(html) {
        case defaultPage:
            document.getElementById("host").addEventListener("click", async () => {
                loading();
            
                await chrome.runtime.sendMessage({
                    target: "service_worker",
                    message: "host"
                }, data => {
                    setPage(mainPage, data);
                });
            
                doneLoading();
            });
            break;

        case mainPage: 
            document.getElementById("title").innerHTML = data.connectionType;
            document.getElementById("peer").innerHTML = `Your peer ID is ${data.self}`
            document.getElementById("disconnect").addEventListener("click", async () => {
                loading();

                await chrome.runtime.sendMessage({
                    target: "service_worker",
                    message: "disconnect"
                });
                await retrieveSession();

                doneLoading();
            })
    };
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
    <button id="disconnect">Disconnect</button>
`