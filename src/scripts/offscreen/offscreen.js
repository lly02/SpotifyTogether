import PeerClient from "./peerClient.js";

const PEER = PeerClient.getInstance();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    messageHandler(message,sender, sendResponse)
        .then(sendResponse);
    return true;
});

async function messageHandler(message, sender, sendResponse) {
    switch (message) {
        case "newPeer":
            return await PEER.createPeer();
        case "keepAlive":
            return "keepAlive";
    };
}