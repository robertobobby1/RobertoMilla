import { useState } from 'react';
import { Globe } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/helpers/Utils';
import i18next from 'i18next';
import { Language } from '@/helpers/Enum';
import { ValenciaFlagIcon, UKFlagIcon, SpainFlagIcon } from '@/helpers/CustomIcons';

type LanguageSelector = {
    lng: Language;
    code: string;
    name: string;
};

function getFlag(lng: Language) {
    switch (lng) {
        case Language.ENGLISH:
            return <UKFlagIcon size={20} className="shrink-0" />;
        case Language.SPANISH:
            return <SpainFlagIcon size={20} className="shrink-0" />;
        case Language.VALENCIANO:
            return <ValenciaFlagIcon size={20} className="shrink-0" />;
    }
}

const languages: LanguageSelector[] = [
    { lng: Language.ENGLISH, code: Language.ENGLISH, name: 'English' },
    { lng: Language.SPANISH, code: Language.SPANISH, name: 'Español' },
    { lng: Language.VALENCIANO, code: 'VLC', name: 'Valencià' },
];

interface LanguageSelectorProps {
    className?: string;
}

const LanguageSelector = ({ className }: LanguageSelectorProps) => {
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageSelector>(languages[0]);
    const handleLanguageChange = (lang: LanguageSelector) => {
        setSelectedLanguage(lang);
        i18next.changeLanguage(lang.lng);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        'flex items-center space-x-1 rounded-full px-2 py-1 text-sm transition-colors hover:bg-primary/10 outline-primary',
                        className,
                    )}
                >
                    {getFlag(selectedLanguage.lng)}
                    <span className="hidden sm:inline">{selectedLanguage.code.toUpperCase()}</span>
                    <Globe className="h-3.5 w-3.5 text-primary/70" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                {languages.map(language => (
                    <DropdownMenuItem
                        key={language.code}
                        className={cn(
                            'cursor-pointer flex items-center space-x-2',
                            selectedLanguage.code === language.code && 'bg-primary/10',
                        )}
                        onClick={() => handleLanguageChange(language)}
                    >
                        {getFlag(language.lng)}
                        <span>{language.name}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSelector;
