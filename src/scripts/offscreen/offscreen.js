import PeerClient from "./peerClient.js";

const PEER = PeerClient.getInstance();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    messageHandler(message, sender, sendResponse)
        .then(sendResponse);
    return true;
});

async function messageHandler({ target, message }, sender, sendResponse) {
    if (target != "offscreen") return "false";

    switch (message) {
        case "new peer":
            try {
                await PEER.createPeer();
            } catch (e) {
                console.error(e);
                return "error: " + e;
            }
            return "peer created";
        case "keep alive":
            return "keep alive true";
        case "retrieve session":
            return new XMLSerializer().serializeToString(document.getElementById("main"));
    };
}