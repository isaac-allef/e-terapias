import Etherapy from './Etherapy';

export type templateField = {
    name: string;
    type:
        | 'short'
        | 'long'
        | 'date'
        | 'choice'
        | 'check'
        | 'dropdown'
        | 'linear';
    options?: string[];
};

interface Template {
    id: string;

    name: string;

    templateFields: templateField[];

    etherapies: Etherapy[];
}

export default Template;
