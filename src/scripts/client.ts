import { OAuthAuthorize } from "./api/spotifyAPI.js";
import { createPeerJSOffscreen, sendMessage } from "./api/chromeAPI.js";

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
        console.log("Creating offscreen");
        await createPeerJSOffscreen();

        console.log("Begin OAuth authorization");
        await OAuthAuthorize();

        console.log("Hosting peer connection");
        const peerID = await sendMessage("newPeer");
    }
}