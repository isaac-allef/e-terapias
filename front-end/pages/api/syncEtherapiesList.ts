import type { NextApiRequest, NextApiResponse } from 'next';
import api from '../../services/api';
import { getSheet } from '../../services/getSheet';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        const token = request.body?.headers?.Authorization || request.headers?.authorization;
        const offerId = request.body?.offerId;
        const link = request.body?.link;
        const index = request.body?.index;
        const column_identifier = request.body?.column_identifier;
        const column_name = request.body?.column_name;

        const sheet = await getSheet(link, index);

        const sheetJson = sheet.objectJson.map(object => ({
            identifier: object[column_identifier],
            name: object[column_name],
        }));

        const uploadRequest = {
            offerId,
            basicInformations: sheetJson
        }
        
        const result = await api.post('/etherapies', uploadRequest, {
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