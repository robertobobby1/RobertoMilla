import React, { useRef } from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { TranslationKey, useTranslationWithType } from '@/helpers/Translations';
import robertoImage from '@/images/roberto.webp';

// Random tech-related unsplash image
const image = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=2000&q=80';
const name = 'Roberto Milla';
const title: TranslationKey = 'SOFTWARE_ENGINEER';

const Hero = () => {
    const { t } = useTranslationWithType();
    const heroRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    const handleScrollDown = (e: React.MouseEvent, selector: string) => {
        e.preventDefault();
        const experienceSection = document.querySelector(selector);
        if (experienceSection) {
            window.scrollTo({
                top: experienceSection.getBoundingClientRect().top + window.scrollY - 100,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
            ref={heroRef}
        >
            {/* Background layers */}
            <div className="absolute inset-0">
                {/* Background image */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'multiply',
                    }}
                ></div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-green-100/80 to-transparent"></div>
            </div>

            {/* Content container - directly visible without animation delay */}
            <div className="container relative">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="overflow-hidden rounded-full w-32 h-32 mx-auto mb-8 border-4 border-green-200 shadow-lg">
                        <img src={robertoImage} alt={t(title)} className="w-full h-full object-cover" />
                    </div>

                    <p className="text-sm md:text-base font-medium text-green-600 mb-4 tracking-wider">
                        {t(title).toUpperCase()}
                    </p>

                    <h1
                        ref={headingRef}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight tracking-tight mb-6"
                    >
                        {t('HI_I_AM')} {name}
                    </h1>

                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                        {t('HERO_SINOPSIS')}
                    </p>

                    <div className="flex justify-center space-x-4">
                        <a
                            href="#contact"
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg"
                            onClick={e => {
                                handleScrollDown(e, '#contact');
                            }}
                        >
                            {t('GET_IN_TOUCH')}
                        </a>
                    </div>
                </div>
            </div>

            <a
                href="#experience"
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-sm text-green-600 hover:text-green-700 transition-colors"
                onClick={e => {
                    handleScrollDown(e, '#experience');
                }}
            >
                <span className="mb-2">{t('SCROLL_DOWN')}</span>
                <ArrowDownCircle size={24} className="animate-float" />
            </a>
        </section>
    );
};

export default Hero;
