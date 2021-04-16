import IParticipantsSheetInformationRepository from '../../repositories/IParticipantsSheetInformationRepository';
import axios from './httpClient/axios';

interface sheetData {
    link: string;
    clientEmail: string;
    privateKey: string;
}

class ParticipantsSheetInformationRepository
    implements IParticipantsSheetInformationRepository {
    private link: string;

    private clientEmail: string;

    private privateKey: string;

    constructor({ link, clientEmail, privateKey }: sheetData) {
        this.link = link;
        this.clientEmail = clientEmail;
        this.privateKey = privateKey;
    }

    async getJSON(): Promise<JSON> {
        const result = await axios.get(this.link, {
            headers: {
                client_email: this.clientEmail,
                private_key: this.privateKey,
            },
        });

        const participants = result.data.sheet.data;

        return participants;
    }

    async getByColumnJSON(
        columnName: string,
        verify: (value: string) => boolean,
    ): Promise<JSON | false> {
        try {
            const result = await axios.get(this.link, {
                headers: {
                    client_email: this.clientEmail,
                    private_key: this.privateKey,
                },
            });

            const participants = result.data.sheet.data;

            const participantsFiltered = participants.filter(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (participant: any) => {
                    const value = participant[columnName];

                    return verify(value);
                },
            );

            return participantsFiltered;
        } catch {
            return false;
        }
    }
}

export default ParticipantsSheetInformationRepository;
