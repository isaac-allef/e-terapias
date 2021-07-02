import { GoogleSpreadsheet } from 'google-spreadsheet';

export const getSheet = async (client_email, private_key, docId, docIndex) => {

    const doc = new GoogleSpreadsheet(docId);

    await doc.useServiceAccountAuth({
        client_email,
        private_key,
    });

    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[docIndex || 0];

    await sheet.loadHeaderRow()
    const columnsNames = sheet.headerValues;

    const rows = await sheet.getRows();

    const stringJson = JSON.stringify(rows, removerMetaDatasAndCircularStructure());

    const objectJson = JSON.parse(stringJson);

    return {columnsNames, objectJson};
}

const removerMetaDatasAndCircularStructure = () => {
    const visited = new WeakSet();
    return (key: any, value: any) => {
        if (key == "_sheet" || key == "_rowNumber" || key == "_rawData") {
            return undefined
        }
        if (typeof value === "object" && value !== null) {
            if (visited.has(value)) return;
            visited.add(value);
        }
        return value;
    };
};