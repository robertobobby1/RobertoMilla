import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, Check, Code, Layout, LucideIcon, Server, Workflow } from 'lucide-react';
import { cn } from '@/helpers/Utils';
import { TranslationKey, useTranslationWithType } from '@/helpers/Translations';

export interface Skills {
    name: TranslationKey;
    icon: LucideIcon;
    items: TranslationKey[];
}

export interface Experience {
    company: TranslationKey;
    position: TranslationKey;
    description: TranslationKey;
    tags: TranslationKey[];
    link: string;
    period: string;
}

const PRESENT_TOKEN = '$$PRESENT';

// Experience data
const EXPERIENCE: Experience[] = [
    {
        company: 'FLOWTRIBE',
        position: 'SOFTWARE_ENGINEER',
        period: `2022 - ${PRESENT_TOKEN}`,
        description: 'FLOWTRIBE_DESCRIPTION_SHORT',
        link: 'https://www.flowtribe.io/',
        tags: ['ANGULAR', 'GCLOUD', 'NESTJS', 'TS'],
    },
    {
        company: 'F1_CONNECTING',
        position: 'JUNIOR_SOFTWARE_ENGINEER',
        period: '2020 - 2021',
        description: 'F1_CONNECTING_DESCRIPTION_SHORT',
        link: 'https://f1-connecting.com/en/home/',
        tags: ['C++', 'PHP', 'HTML', 'LINUX'],
    },
    {
        company: 'UNIVERSITY_ANTWERP',
        position: 'STUDENT',
        period: '2022 - 2023',
        description: 'UNIVERSITY_ANTWERP_DESCRIPTION_SHORT',
        link: 'https://www.uantwerpen.be/en/',
        tags: ['AI', 'EMBEDDED', 'PYTHON', 'C++', 'ARDUINO'],
    },
    {
        company: 'UNIVERSITY_VALENCIA',
        position: 'STUDENT',
        period: '2018 - 2022',
        description: 'UNIVERSITY_VALENCIA_DESCRIPTION_SHORT',
        link: 'https://www.upv.es/',
        tags: ['HARDWARE', 'JAVA', 'JS'],
    },
];

// Skills data
const SKILLS: Skills[] = [
    { name: 'FRONTEND_DEV', icon: Layout, items: ['REACT', 'NEXT_JS', 'TAILWIND_CSS', 'ANGULAR'] },
    { name: 'BACKEND_DEV', icon: Server, items: ['C++', 'NODE', 'NESTJS'] },
    { name: 'PROCESS', icon: Workflow, items: ['GITHUB', 'BITBUCKET', 'JIRA', 'GCLOUD'] },
    { name: 'OTHERS', icon: Code, items: ['ARDUINO', 'EMBEDDED', 'AI', 'HARDWARE'] },
];

const Experience = () => {
    const { t } = useTranslationWithType();
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // Create a separate ref specifically for the first experience item
    const [secondItemRef, secondItemInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (secondItemInView) {
            // Start animation when first experience item is in view
            controls.start('visible');
        }
    }, [controls, secondItemInView]);

    useEffect(() => {
        for (const exp of EXPERIENCE) {
            exp.period = exp.period.replace(PRESENT_TOKEN, t('PRESENT'));
        }
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    const animationWrapper = content => {
        return (
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={controls}
                className="space-y-8"
            >
                {content}
            </motion.div>
        );
    };

    return (
        <section id="experience" className="section bg-secondary/30">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('EXPERIENCE_SKILLS')}</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">{t('EXPERIENCE_SINOPSIS')} </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Experience Timeline */}
                    {animationWrapper(
                        <>
                            <h3 className="text-xl font-semibold mb-6">{t('WORK_HISTORY')}</h3>
                            <div className="relative max-w-3xl mx-auto">
                                {/* Timeline line */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-border" />

                                {/* Experience items */}
                                <div className="space-y-12">
                                    {EXPERIENCE.map((exp, index) => (
                                        <motion.div
                                            key={index}
                                            ref={index === 1 ? secondItemRef : undefined}
                                            variants={itemVariants}
                                        >
                                            <div className={cn('relative grid grid-cols-1 gap-6 md:gap-8')}>
                                                {/* Date */}
                                                <div className="flex flex-col items-start">
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>{exp.period}</span>
                                                    </div>
                                                    <h3 className="text-xl font-semibold mt-2">{t(exp.position)}</h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Briefcase className="w-4 h-4 text-primary" />
                                                        <span className="font-medium">{t(exp.company)}</span>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div>
                                                    {/* Timeline dot */}
                                                    <div className="absolute left-1/2 z-10 transform -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full" />

                                                    <div className="glass-card rounded-lg p-6">
                                                        <p className="text-muted-foreground mb-4">
                                                            {t(exp.description)}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {exp.tags.map(tag => (
                                                                <span
                                                                    key={tag}
                                                                    className="text-xs font-medium bg-secondary px-3 py-1 rounded-full"
                                                                >
                                                                    {t(tag)}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </>,
                    )}

                    {/* Skills */}
                    {animationWrapper(
                        <>
                            <h3 className="text-xl font-semibold mb-6">{t('SKILLS_EXPERTISE')}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                                {SKILLS.map((skill, index) => (
                                    <motion.div key={index} variants={itemVariants} className="glass rounded-xl p-6">
                                        <div className="flex items-center mb-4">
                                            <div className="bg-primary/5 p-3 rounded-lg mr-4">
                                                <skill.icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <h4 className="font-medium">{t(skill.name)}</h4>
                                        </div>
                                        <ul className="space-y-2">
                                            {skill.items.map((item, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-center text-sm text-muted-foreground"
                                                >
                                                    <Check className="w-4 h-4 mr-2 text-primary/70" />
                                                    {t(item)}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </>,
                    )}
                </div>
            </div>
        </section>
    );
};

export default Experience;
