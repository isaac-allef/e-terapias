import Etherapy from './Etherapy';
import Manager from './Manager';

type settings_service_account = {
    client_email: string;
    private_key: string;
};

type settings_moderators = {
    sheet_link: string;
    sheet_index: number;
    column_email: string;
    column_name: string;
    column_etherapies_identifiers: string;
};

type settings_etherapies = {
    sheet_link: string;
    sheet_index: number;
    column_identifier: string;
    column_name: string;
};

type settings_participants = {
    sheet_link: string;
    sheet_index: number;
};

export type settings = {
    serviceAccount: settings_service_account;
    moderators: settings_moderators;
    etherapies: settings_etherapies;
    participants: settings_participants;
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
