interface FieldTemplates {
    name: string;
    type: string;
}

interface Description {
    title: string;
    fieldTemplates: FieldTemplates[];
}

interface CreateFieldJournalTemplateDTO {
    name: string;
    description: Description;
}

export default CreateFieldJournalTemplateDTO;
