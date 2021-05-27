import type { NextApiRequest, NextApiResponse } from 'next';
import api from '../../services/api';
import { getSheet } from '../../services/getSheet';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        const token = request.body?.headers?.Authorization || request.headers?.authorization;

        const sheet = await getSheet(process.env.DOCIDETHERAPIES, 3);

        const sheetJson = sheet.objectJson.map(object => ({
            identifier: object.Identificador,
            name: object.Nome,
        }));

        const uploadRequest = {
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