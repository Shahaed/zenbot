import { Firestore } from "@google-cloud/firestore";

export class DatabaseGateway {
    private static instance: DatabaseGateway;

    private firestore: Firestore;

    private constructor() {
        this.firestore = new Firestore({
            projectId: process.env.FIRESTORE_projectId,
            keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        });
    }

    static get getFirestore() {
        return DatabaseGateway.getInstance.firestore;
    }

    static get getInstance() {
        if (!DatabaseGateway.instance) {
            DatabaseGateway.instance = new DatabaseGateway();
        }

        return DatabaseGateway.instance;
    }
}
