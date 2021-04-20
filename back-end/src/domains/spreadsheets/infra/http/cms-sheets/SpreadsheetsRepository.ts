import ISpreadsheetsRepository from '../../../repositories/ISpreadsheetsRepository';
import axios from './httpClient/axios';

interface sheetData {
    link: string;
    clientEmail: string;
    privateKey: string;
}

class SpreadsheetsRepository implements ISpreadsheetsRepository {
    private link: string;

    private clientEmail: string;

    private privateKey: string;

    constructor({ link, clientEmail, privateKey }: sheetData) {
        this.link = link;
        this.clientEmail = clientEmail;
        this.privateKey = privateKey;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getPageRows(): Promise<unknown[]> {
        const result = await axios.get(this.link, {
            headers: {
                client_email: this.clientEmail,
                private_key: this.privateKey,
            },
        });

        const rows = result.data.sheet.data;

        return rows;
    }

    async getPageRowsByColumn(
        columnName: string,
        like: (column: string, value: string) => boolean,
        verify: (value: string) => boolean,
    ): Promise<unknown[] | undefined> {
        const result = await axios.get(this.link, {
            headers: {
                client_email: this.clientEmail,
                private_key: this.privateKey,
            },
        });

        const rows = result.data.sheet.data;

        if (rows === []) {
            return rows;
        }

        const { columnsNames } = result.data.sheet;

        const columnNameComplete = columnsNames.find((column: string) => {
            return like(column, columnName);
        });

        if (!columnNameComplete) {
            return undefined;
        }

        const rowsFiltered = rows.filter(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (row: any) => {
                const value = row[columnNameComplete];

                return verify(value);
            },
        );

        return rowsFiltered;
    }
}

export default SpreadsheetsRepository;
