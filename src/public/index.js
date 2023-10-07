const hostButton = document.getElementById("host");

hostButton.addEventListener("click", () => {
    chrome.runtime.sendMessage("host", res => {
        
    });
})