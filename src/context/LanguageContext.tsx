"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { en } from '../locales/en';
import { te } from '../locales/te';
import { hi } from '../locales/hi';

type Language = 'en' | 'te' | 'hi';
type Translations = typeof en;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
    en,
    te,
    hi,
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');

    const t = (path: string) => {
        const keys = path.split('.');
        let current: any = translations[language];
        for (const key of keys) {
            if (current[key] === undefined) {
                // Fallback to English if translation missing
                let fallback: any = translations['en'];
                for (const k of keys) {
                    if (fallback[k] === undefined) return path;
                    fallback = fallback[k];
                }
                return fallback as string;
            }
            current = current[key];
        }
        return current as string;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
