import PeerClient from "./peerClient.js";

const PEER = PeerClient.getInstance();

chrome.runtime.onMessage.addListener(({ target, message }, sender, sendResponse) => {
    if (target != "offscreen") return; 

    messageHandler(message, sender, sendResponse)
        .then(sendResponse);
    return true;
});

async function messageHandler(message, sender, sendResponse) {
    switch (message) {
        case "new peer":
            try {
                return await PEER.createPeer();
            } catch (e) {
                console.error(e);
                return "error: " + e;
            }

        case "all connections":
            return PEER.connections;

        case "keep alive":
            return "keep alive true";
    };
}