import React, { useState, useEffect } from 'react';
import { cn } from '@/helpers/Utils';
import { Menu, X } from 'lucide-react';
import LanguageSelector from '@/components/reusable/LanguageSelector';
import { TranslationKey, useTranslationWithType } from '@/helpers/Translations';
import { RobertoLogoIcon } from '../../helpers/CustomIcons';

export interface NavItem {
    label: TranslationKey;
    href: string;
}

const NAV_ITEMS: NavItem[] = [
    { label: 'HOME', href: '#home' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONTACT', href: '#contact' },
];

const Navbar = () => {
    const { t } = useTranslationWithType();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('#home');

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }

            // Check which section is in view
            const sections = NAV_ITEMS.map(item => item.href);

            for (const section of sections) {
                const element = document.querySelector(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the section is in the viewport (with some buffer for the navbar)
                    const extraBuffer = 300;
                    if (rect.top <= extraBuffer && rect.bottom >= extraBuffer) {
                        if (activeSection !== section) {
                            setActiveSection(section);
                        }
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled, activeSection]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        closeMenu();
        const element = document.querySelector(href);
        if (element) {
            window.scrollTo({
                top: element.getBoundingClientRect().top + window.scrollY - 100,
                behavior: 'smooth',
            });
            setActiveSection(href);
        }
    };

    return (
        <header
            className={cn(
                'fixed top-0 w-full z-50 transition-all duration-300',
                scrolled && !isOpen ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent',
            )}
        >
            <div className="container mx-auto">
                <nav className="flex items-center justify-between">
                    <RobertoLogoIcon
                        size={34}
                        href="#home"
                        className="hover:cursor-pointer"
                        onClick={e => handleNavLinkClick(e, '#home')}
                    />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center py-4">
                        <ul className="flex space-x-8 links-underline mr-4">
                            {NAV_ITEMS.map(item => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className={cn(
                                            'text-sm font-medium transition-colors hover:text-primary relative',
                                            activeSection === item.href && 'text-primary',
                                        )}
                                        onClick={e => handleNavLinkClick(e, item.href)}
                                    >
                                        {t(item.label)}
                                        {activeSection === item.href && (
                                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <LanguageSelector />
                    </div>

                    {/* Mobile Navigation Toggle */}
                    <button
                        className="md:hidden rounded-md p-2 text-primary py-4"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    'md:hidden fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 transition-all duration-300 ease-in-out transform',
                    isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none',
                )}
            >
                <ul className="flex flex-col space-y-6 text-center">
                    {NAV_ITEMS.map(item => (
                        <li key={item.label}>
                            <a
                                href={item.href}
                                className={cn(
                                    'text-lg font-medium transition-colors hover:text-primary block py-2',
                                    activeSection === item.href && 'text-primary',
                                )}
                                onClick={e => handleNavLinkClick(e, item.href)}
                            >
                                {t(item.label)}
                                {activeSection === item.href && (
                                    <span className="block h-0.5 w-12 mx-auto mt-1 bg-primary rounded-full"></span>
                                )}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="mt-6 flex justify-center">
                    <LanguageSelector />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
