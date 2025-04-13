import { onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
};

admin.initializeApp(firebaseConfig);

export const sendContactRequest = onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.set('Access-Control-Allow-Headers', 'content-type');

    if (request.method === 'OPTIONS') {
        // stop preflight requests here
        response.status(204).send(true);
        return;
    }

    const { name, email, message } = request.body.data;

    await admin
        .firestore()
        .collection('mails')
        .add({
            to: process.env.MAIL_TO,
            message: {
                subject: `New email from ${email}`,
                html: `
                    Name: ${name}
                    Email: ${email}
                    message: ${message}
                `,
            },
            ip: request.ip,
        });

    response.send({ data: true });
});
