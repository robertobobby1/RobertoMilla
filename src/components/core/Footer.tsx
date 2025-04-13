import { ArrowUp, Heart } from 'lucide-react';
import { cn } from '@/helpers/Utils';
import { useTranslationWithType } from '@/helpers/Translations';
import Socials from '@/components/reusable/Socials';
import { RobertoLogoIcon } from '../../helpers/CustomIcons';

const Footer = () => {
    const { t } = useTranslationWithType();
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 bg-background border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} {t('ALL_RIGHTS_RESERVED')}
                        </p>
                    </div>

                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <span>{t('MADE_WITH')}</span>
                        <Heart className="w-4 h-4 text-primary fill-primary" />
                        <span>{t('AND_CODE')}</span>
                    </div>

                    <Socials />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
