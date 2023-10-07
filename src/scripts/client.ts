import * as codeVerifier from "./helper/codeVerifier.js"
import * as chromeAPI from "./helper/chromeAPI.js"

const CLIENT_ID = "22e1420d4e9743bab929b848c5e1bdc9";
const REDIRECT_URI = 'http://localhost:8080/callback';

export default class Client {
    private static instance: Client;
    
    private constructor() {}

    public static getInstance(): Client {
        if (!Client.instance) {
            Client.instance = new Client();
        }

        return Client.instance;
    }

    public async host(): Promise<void> {
        const randomString = codeVerifier.generateRandomString(128);
        let oauthtab: chrome.tabs.Tab;

        await codeVerifier.generateCodeChallenge(randomString)
            .then(codeChallenge => {
                const state = codeVerifier.generateRandomString(16);
                const scope = "user-read-private user-read-email";

                chromeAPI.storeLocal("code_verifier", randomString);

                const args = new URLSearchParams({
                    response_type: "code",
                    client_id: CLIENT_ID,
                    scope: scope,
                    redirect_uri: REDIRECT_URI,
                    state: state,
                    code_challenge_method: "S256",
                    code_challenge: codeChallenge
                });
                
                return chromeAPI.newTab("https://accounts.spotify.com/authorize?" + args);
            })
            .then( OAuthTab => {
                oauthtab = OAuthTab;
                return chromeAPI.listenTabURLUpdate(OAuthTab, REDIRECT_URI)
            })
            .then( OAuthCallbackURI => {
                const OAuthURI = new URL(OAuthCallbackURI);
                const urlParams = new URLSearchParams(OAuthURI.search);
                const code = urlParams.get("code");
                chromeAPI.storeLocal("code", code!);
                return 
            })
            .then ( () => chromeAPI.closeTab(oauthtab))
            .catch( e => Promise.reject(e));
    }
}