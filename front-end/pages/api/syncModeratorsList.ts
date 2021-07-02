import type { NextApiRequest, NextApiResponse } from 'next';
import api from '../../services/api';
import { getSheet } from '../../services/getSheet';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        const token = request.body?.headers?.Authorization || request.headers?.authorization;
        const offerId = request.body?.offerId;
        const client_email = request.body?.client_email;
        const private_key = request.body?.private_key;
        const link = request.body?.link;
        const index = request.body?.index;
        const column_email = request.body?.column_email;
        const column_name = request.body?.column_name;
        const column_etherapies_identifiers = request.body?.column_etherapies_identifiers;


        const sheet = await getSheet(client_email, private_key, link, index);

        const sheetJson = sheet.objectJson.map(object => ({
            email: object[column_email],
            name: object[column_name],
            etherapiesIdentifiers: object[column_etherapies_identifiers]
                                    .split(',')
                                    .map(etherapy => {
                                        return etherapy.split(' - ')[0].trim();
                                    }),
        }));

        const uploadRequest = {
            offerId,
            basicInformations: sheetJson
        }
        
        const result = await api.post('/moderators', uploadRequest, {
            headers: {
              'Authorization': `${token}`,
              'Content-Type': 'application/json',
            }
        });

        const uploadResponse = result.data;

        response.json(uploadResponse);
    } catch(err) {
        response.status(500).json({ message: err.message });
    }
}