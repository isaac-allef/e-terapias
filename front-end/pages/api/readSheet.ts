import type { NextApiRequest, NextApiResponse } from 'next';
import { getSheet } from '../../services/getSheet';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const { docId, docIndex } = request.query;

    if (!docId) {
        return response.status(400).json({error: 'Doc id required'});
    }

    const sheet = await getSheet(docId, docIndex);

    return response.json(sheet);
}