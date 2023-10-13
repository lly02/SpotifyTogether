const hostButton = document.getElementById("host");

hostButton.addEventListener("click", () => {
    chrome.runtime.sendMessage("host", res => {
        document.getElementById("hosted").innerHTML = `Hosted at ${res}`;
    });
});