import i18n from 'i18next';
import Backend, { HttpBackendOptions } from 'i18next-http-backend';
import { FallbackNs, initReactI18next, useTranslation, UseTranslationResponse } from 'react-i18next';
import * as englishTemplate from '../../public/lang/en.json';

export type TranslationFile = typeof englishTemplate;

type DeepKeys<T> = {
    [K in keyof T]: K extends string ? (T[K] extends string ? K : `${K}.${DeepKeys<T[K]>}`) : never;
}[keyof T];

export type TranslationKey = DeepKeys<TranslationFile>;

export function configureI18n() {
    if (i18n.isInitialized) {
        return;
    }

    i18n.use(Backend)
        .use(initReactI18next)
        .init<HttpBackendOptions>({
            fallbackLng: 'en',
            backend: {
                loadPath: '/lang/{{lng}}.json',
            },
        });
}
export const i18nInstance = configureI18n();

export type TranslationResponse = Omit<UseTranslationResponse<FallbackNs<undefined>, undefined>, 't'> & {
    t: (key: TranslationKey) => string;
};

export function useTranslationWithType(): TranslationResponse {
    const useTranslationObject = useTranslation();

    return {
        ...useTranslationObject,
        t: (key: TranslationKey): string => {
            return useTranslationObject.t(key);
        },
    };
}
