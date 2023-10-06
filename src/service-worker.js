// import "./src/scripts/client.ts";
// import client from "./src/scripts/client.ts";
// import "./src/scripts/codeVerifier.ts";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "host") {
    //   const CLIENT = client.getInstance();
    //   CLIENT.host();
    console.log('In')
    };
});