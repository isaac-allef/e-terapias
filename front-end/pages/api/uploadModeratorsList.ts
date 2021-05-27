import type { NextApiRequest, NextApiResponse } from 'next';
import api from '../../services/api';
import { getSheet } from '../../services/getSheet';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        const token = request.body?.headers?.Authorization || request.headers?.authorization;

        const sheet = await getSheet(process.env.DOCIDMODERATORS, 1);

        const sheetJson = sheet.objectJson.map(object => ({
            email: object['Endereço de e-mail'],
            name: object['Nome Completo:'],
            etherapiesIdentifiers: object['Você é mediador ou estudante de apoio em qual(is) oficina(s)?']
                                    .split(',')
                                    .map(etherapy => {
                                        return etherapy.split(' - ')[0].trim();
                                    }),
        }));

        const uploadRequest = {
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