async function retrieveSession() {
    loading();

    await chrome.runtime.sendMessage({
        target: "service_worker",
        message: "retrieve session"
    }, retrieveSessionCallback);
    
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
                }, retrieveSessionCallback);
            
                doneLoading();
            });

            document.getElementById("join").addEventListener("click", async () => {
                loading();
                
                const peerId = document.getElementById("id-textbox").value;

                await chrome.runtime.sendMessage({
                    target: "service_worker",
                    message: `join ${peerId}`
                }, retrieveSessionCallback);
            
                doneLoading();
            });

            break;

        case mainPage: 
            document.getElementById("title").innerHTML = data.connectionType;
            document.getElementById("peer").innerHTML = `Your peer ID is ${data.self}`
            document.getElementById("connections").innerHTML = "<div>You are connected to: </div>";
            console.log(data.peers)
            if (data.peers != "") {
                const peerIds = data.peers.split(" ");
                for (const peerId of peerIds) {
                    document.getElementById("connections").innerHTML += `<div class="connectedPeer">${peerId}</div>`;
                };
            }

            document.getElementById("disconnect").addEventListener("click", async () => {
                loading();

                await chrome.runtime.sendMessage({
                    target: "service_worker",
                    message: "disconnect"
                }, retrieveSessionCallback);

                doneLoading();
            })
    };
}

function retrieveSessionCallback(data) {
    if (data.connectionType == "Disconnected") {
        setPage(defaultPage);
    }
    else setPage(mainPage, data);
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
    <input id="id-textbox" placeholder="Peer ID to connect to">
    <button id="join">Join</button>
    <span id="hosted"></span>
`

const mainPage = `
    <div id="title"></div>
    <div id="peer"></div>
    <div id="connections"></div>
    <button id="disconnect">Disconnect</button>
`