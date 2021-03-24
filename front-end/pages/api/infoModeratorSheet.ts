import { apiSheet } from '../../services/api';
import type { NextApiRequest, NextApiResponse } from 'next';

let moderatorsSheet = null;

async function getModeratorsSheet() {
    const result = await apiSheet.get(
        process.env.MODERATORS_SHEET_LINK,
        {
            headers: {
                'client_email': process.env.CLIENT_EMAIL,
                'private_key': process.env.PRIVATE_KEY,
            }
        }
    );


    return result.data;
}

function findModeratorByEmail(moderatorsSheet, email: string) {
    const moderators = moderatorsSheet.sheet.data;
    const moderator = moderators.find(moderator => {
        return moderator['Endereço de e-mail'] === email;
    });

    return moderator;
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const { email } = request.query;
    
    if (!email) {
        response.status(400).json({ message: 'Email missing.' });
    }

    moderatorsSheet = await getModeratorsSheet();

    const moderator = findModeratorByEmail(moderatorsSheet, email as string);

    if (!moderator) {
        response.status(400).json({ message: 'Email not found.' })
    }

    return response.json(moderator);
}