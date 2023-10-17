import PeerClient from "./peerClient.js";

const PEER = PeerClient.getInstance();

chrome.runtime.onMessage.addListener(({ target, message }, sender, sendResponse) => {
    console.log("Offscreen received: " + message);
    
    if (target != "offscreen") return; 

    messageHandler(message, sender, sendResponse)
        .then(sendResponse);
    return true;
});

async function messageHandler(message, sender, sendResponse) {
    if (message.startsWith("connect")) {
        const connectId = message.split(" ")[1];
        return await PEER.connectPeer(connectId);
    }

    switch (message) {
        case "new peer":
            try {
                return await PEER.createPeer();
            } catch (e) {
                console.error(e);
                return "error: " + e;
            }

        case "all connections":
            return PEER.getAllConnectionIds();

        case "keep alive":
            return "keep alive true";

        case "kill":
            return PEER.kill();
    };
}