/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */

import Moderator from '../../../src/core/entities/Moderator';
import LinkModeratorToEtherapyRepository from '../../../src/core/protocols/db/repositories/LinkModeratorToEtherapyRepository';
import Etherapy from '../../../src/core/entities/Etherapy';

export class LinkModeratorToEtherapyRepositoryStub
    implements LinkModeratorToEtherapyRepository {
    link(_moderator: Moderator, _etherapy: Etherapy): Promise<boolean> {
        return new Promise(resolve => resolve(true));
    }
}
