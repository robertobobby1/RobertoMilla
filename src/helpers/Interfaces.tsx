import { TranslationKey } from './Translations';

export interface ProjectItem {
    // title and description can be translation keys
    title: TranslationKey;
    description: TranslationKey;
    tags: TranslationKey[];
    image: string;
    github?: string;

    fromDate: Date;
    // to date may be undefined implying it is still active
    toDate?: Date;
    demo?: string;
}

export type ProjectList = ProjectItem[];
