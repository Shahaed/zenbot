import { Firestore } from "@google-cloud/firestore";

export class FirestoreDB {
    firestore: Firestore;

    constructor(projectId: string, keyFilename: string) {
        this.firestore = new Firestore({
            projectId: projectId,
            keyFilename: keyFilename,
        });
    }
}
