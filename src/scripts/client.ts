import * as codeVerifier from "./codeVerifier.js"

const CLIENT_ID = "22e1420d4e9743bab929b848c5e1bdc9";
const REDIRECT_URL = 'http://localhost:8080';

export default class client {
    static instance: client = new client();

    static getInstance(): client {
        return client.instance;
    }

    host(): void {
        const randomString = codeVerifier.generateRandomString(128);

        codeVerifier.generateCodeChallenge(randomString)
            .then(codeChallenge => {
                let state = codeVerifier.generateRandomString(16);
                let scope = 'user-read-private user-read-email';

                localStorage.setItem('code_verifier', randomString);

                let args = new URLSearchParams({
                    response_type: 'code',
                    client_id: CLIENT_ID,
                    scope: scope,
                    redirect_uri: REDIRECT_URL,
                    state: state,
                    code_challenge_method: 'S256',
                    code_challenge: codeChallenge
                });

                window.location.href = 'https://accounts.spotify.com/authorize?' + args;
            });
    }
}