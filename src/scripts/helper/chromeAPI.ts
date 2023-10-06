export async function newTab(url: string): Promise<chrome.tabs.Tab> {
    return await chrome.tabs.create({
        url: url
    }).then( tab => tab)
        .catch( e => e);
}


// CHROME.STORAGE //
export async function storeLocal(key: string, value: string): Promise<void> {
    return chrome.storage.local.set({ [key]: value })
        .then( data => data)
        .catch( e => e);
}