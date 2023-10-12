import { OAuthAuthorize } from "./api/spotifyAPI.js";
import PeerClient from "./server/peerClient.js";

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
        console.log("Begin OAuth authorization");
        await OAuthAuthorize();

        console.log("Hosting peer connection");
        const peerObj = PeerClient.getInstance();
        const peerID = await peerObj.createPeer();
    }
}