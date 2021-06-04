export const timestampToDateTime = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString('pt-br');
};

export const timestampToDate = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString('pt-br', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });
};

export const timestampToDateShort = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString('pt-br', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });
};