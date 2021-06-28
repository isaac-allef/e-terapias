import Etherapy from './Etherapy';
import Manager from './Manager';

type settings_service_account = {
    client_email: string;
    private_key: string;
};

type settings_moderators = {
    sheet_link: string;
    column_email: string;
    column_name: string;
    column_etherapies_identifiers: string;
};

type settings_etherapies = {
    sheet_link: string;
    column_identifier: string;
    column_name: string;
};

export type settings = {
    serviceAccount: settings_service_account;
    moderators: settings_moderators;
    etherapies: settings_etherapies;
};

interface Offer {
    id: string;

    name: string;

    dateStart: Date;

    dateEnd: Date;

    settings: settings;

    managers: Manager[];

    etherapies: Etherapy[];
}

export default Offer;
