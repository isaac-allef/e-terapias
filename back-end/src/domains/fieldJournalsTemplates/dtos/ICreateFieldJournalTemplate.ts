interface FieldTemplates {
    name: string;
    type: string;
}

interface Description {
    title: string;
    fieldTemplates: FieldTemplates[];
}

interface ICreateFieldJournalTemplate {
    name: string;
    description: Description;
}

export default ICreateFieldJournalTemplate;
