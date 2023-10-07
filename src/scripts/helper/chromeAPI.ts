// CHROME.TABS //
export async function newTab(url: string): Promise<chrome.tabs.Tab> {
    return chrome.tabs.create({
        url: url
    })
        .then( tab => tab)
        .catch( e => e);
}

export async function closeTab(tab: chrome.tabs.Tab): Promise<void> {
    return chrome.tabs.remove(tab.id!);
}

export async function listenTabURLUpdate(tab: chrome.tabs.Tab, uri: string): Promise<string> {
    return new Promise( resolve => {
        const callback = ( listenerTabId: number, changeInfo: chrome.tabs.TabChangeInfo, listenerTab: chrome.tabs.Tab) => {
            if (listenerTabId != tab.id) return;
            if (listenerTab.url?.startsWith(uri)) {
                chrome.tabs.onUpdated.removeListener(callback);
                resolve(listenerTab.url);
            };
        };

        chrome.tabs.onUpdated.addListener(callback);
    });
}


// CHROME.STORAGE //
export async function storeLocal(key: string, value: string): Promise<void> {
    return chrome.storage.local.set({ [key]: value })
        .then( data => data)
        .catch( e => e);
}


export async function getLocal(key: string): Promise<{ [key: string]: any }> {
    return chrome.storage.local.get(key);
}