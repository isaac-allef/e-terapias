import DeleteFieldJournalByIdService from '../../../../core/services/DeleteFieldJournalByIdService';
import FieldJournalTypeormRepository from '../../../../infra/db/typeorm/repositories/FieldJournalTypeormRepository';
import { DeleteFieldJournalController } from '../../../../presentation/controllers/DeleteFieldJournalController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeDeleteFieldJournalContoller = (): Controller => {
    const updateTemplateRepository = new FieldJournalTypeormRepository();
    const deleteFieldJournalByIdService = new DeleteFieldJournalByIdService(
        updateTemplateRepository,
    );
    return new DeleteFieldJournalController(deleteFieldJournalByIdService);
};

export default makeDeleteFieldJournalContoller;
