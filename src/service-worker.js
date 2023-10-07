import Client from "./scripts/client.js";

const CLIENT = Client.getInstance();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "host") {
        host(message, sender, sendResponse);
        return true;
    };
});

const host = async (message, sender, sendResponse) => {
    try {
        await CLIENT.host();
        console.log("Hosted");
        sendResponse("success");
    } catch (e) {
        console.error(e);
        sendResponse("error");
    }
}