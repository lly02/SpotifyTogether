const hostButton = document.getElementById("host");

hostButton.addEventListener("click", async() => {
    chrome.runtime.sendMessage("host", res => {
    });
})