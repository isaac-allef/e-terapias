import Etherapy from './Etherapy';

export type templateField = {
    name: string;
    type: 'short' | 'long';
};

interface Template {
    id: string;

    name: string;

    templateFields: templateField[];

    etherapies: Etherapy[];
}

export default Template;
