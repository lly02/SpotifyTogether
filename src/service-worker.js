import Client from "./scripts/client.js";
import * as chromeAPI from "./scripts/api/chromeAPI.js"

const CLIENT = Client.getInstance();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    try {
        messageHandler(message, sender, sendResponse)
            .then(sendResponse);
        return true;
    } catch (e) {
        console.log(e);
    }
});

async function messageHandler({ target, message }, sender, sendResponse) {
    if (target != "service_worker") return true;

    switch (message) {
        case "host":
            return await CLIENT.host();
        case "retrieve session":
            let mainPage;
            
            try {
                mainPage = await chromeAPI.sendMessage({
                    target: "offscreen",
                    message: "retrieve session"
                });
            } catch {
                return "";
            };

            return mainPage;
    };
}