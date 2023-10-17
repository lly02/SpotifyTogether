import Client from "./scripts/client.js";

const CLIENT = Client.getInstance();

chrome.runtime.onMessage.addListener(({ target, message }, sender, sendResponse) => {
    console.log("Service worker recieved: " + message);

    if (target != "service_worker") return;

    try {
        messageHandler(message, sender, sendResponse)
            .then(sendResponse);
        return true;
    } catch (e) {
        console.log(e);
    }
});

async function messageHandler(message, sender, sendResponse) {
    if (message.startsWith("join")) {
        const peerId = message.split(" ")[1];
        await CLIENT.join(peerId);
        return await CLIENT.retrieveSession();
    }

    switch (message) {
        case "host":
            await CLIENT.host();
            break;

        case "retrieve session":
            break;

        case "disconnect":
            await CLIENT.disconnect();
            break;
    };

    return await CLIENT.retrieveSession();
}