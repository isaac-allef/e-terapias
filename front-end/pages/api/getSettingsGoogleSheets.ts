import type { NextApiRequest, NextApiResponse } from 'next';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    return response.json({
        docIdEtherapies: process.env.DOCIDETHERAPIES,
        docIdModerators: process.env.DOCIDMODERATORS,
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY,
    });
}