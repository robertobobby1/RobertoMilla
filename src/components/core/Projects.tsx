import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, ExternalLink, Github } from 'lucide-react';
import { cn } from '@/helpers/Utils';
import { ProjectList } from '@/helpers/Interfaces';
import { useTranslationWithType } from '@/helpers/Translations';
import { Button } from '@/components/ui/button';
import robertomilla from '@/images/robertomilla.webp';
import albertomilla from '@/images/albertomilla.webp';
import ajudadana from '@/images/ajudadana.webp';
import rcore from '@/images/rcore.webp';
import panga from '@/images/panga.webp';
import appnotas from '@/images/appnotas.webp';
import embedded from '@/images/embedded.webp';
import aiselfdriving from '@/images/aiselfdriving.webp';

// Project data
const PROJECTS: ProjectList = [
    {
        title: 'AJUDADANA',
        description: 'AJUDADANA_DESCRIPTION',
        fromDate: new Date(2023, 1),
        github: 'https://github.com/pedrolivaresanchez/emergency-cv',
        tags: ['REACT', 'NEXT_JS', 'TS', 'VERCEL', 'SUPABASE'],
        image: ajudadana,
        demo: 'https://ajudadana.es/',
    },
    {
        title: 'PORTFOLIO_WEB',
        description: 'PORTFOLIO_WEB_DESCRIPTION',
        fromDate: new Date(2024, 1),
        toDate: new Date(2024, 1),
        github: 'https://github.com/robertobobby1/RobertoMilla',
        tags: ['REACT', 'GCLOUD', 'HTML', 'TAILWIND_CSS'],
        image: robertomilla,
        demo: 'https://robertomilla.com/',
    },
    {
        title: 'ARQ_WEBSITE',
        description: 'ARQ_WEBSITE_DESCRIPTION',
        fromDate: new Date(2023, 1),
        toDate: new Date(2024, 1),
        github: 'https://github.com/robertobobby1/AlbertoMilla',
        tags: ['REACT', 'HTML', 'TAILWIND_CSS'],
        image: albertomilla,
        demo: 'https://albertomilla.com/',
    },
    {
        title: 'RCORE',
        description: 'RCORE_DESCRIPTION',
        fromDate: new Date(2023, 1),
        github: 'https://github.com/robertobobby1/R-core',
        tags: ['C++', 'LINUX', 'WINDOWS', 'MACOS'],
        image: rcore,
    },
    {
        title: 'AI_SELF_DRIVING',
        description: 'AI_SELF_DRIVING_DESCRIPTION',
        fromDate: new Date(2022, 1),
        toDate: new Date(2023, 1),
        github: 'https://github.com/MaartenVanLoo/AIonWheels',
        tags: ['PYTHON', 'AI'],
        image: aiselfdriving,
    },
    {
        title: 'EMBEDDED_SENSORING',
        description: 'EMBEDDED_SENSORING_DESCRIPTION',
        fromDate: new Date(2022, 1),
        toDate: new Date(2023, 1),
        github: 'https://github.com/robertobobby1/PlantMonitoring',
        tags: ['C++', 'EMBEDDED', 'HARDWARE'],
        image: embedded,
    },
    {
        title: 'APP_NOTAS',
        description: 'APP_NOTAS_DESCRIPTION',
        fromDate: new Date(2022, 1),
        toDate: new Date(2022, 1),
        github: 'https://github.com/robertobobby1/AppNotas',
        tags: ['XAMARIN', 'C_SHARP', 'ANDROID', 'IOS'],
        image: appnotas,
    },
    {
        title: 'PANGA',
        description: 'PANGA_DESCRIPTION',
        fromDate: new Date(2022, 1),
        toDate: new Date(2022, 1),
        github: 'https://github.com/robertobobby1/PangaGame',
        tags: ['UNITY', 'LINUX', 'WINDOWS'],
        image: panga,
    },
];

const Projects = () => {
    const [showMore, setShowMore] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const { t } = useTranslationWithType();

    // Calculate which projects to display
    const visibleProjects = showMore ? PROJECTS : PROJECTS.slice(0, 3);

    useEffect(() => {
        const handleScroll = () => {
            const projectElements = document.querySelectorAll('.project-card');

            projectElements.forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                const isVisible =
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth);

                if (isVisible) {
                    element.classList.add('active');
                }
            });
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleShowMore = () => {
        setShowMore(!showMore);

        // If toggling to show more, scroll to the newly visible projects after a brief delay
        if (!showMore) {
            setTimeout(() => {
                const additionalProjects = document.querySelectorAll('.project-card')[3]; // Get the fourth project
                if (additionalProjects) {
                    additionalProjects.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 100);
        }
    };

    return (
        <section id="projects" className="section bg-white">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('FEATURED_PROJECTS')}</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">{t('SELECTION_OF_WORK')}</p>
                </div>

                <div className="space-y-24">
                    {visibleProjects.map((project, index) => (
                        <div
                            key={index}
                            className={cn(
                                'project-card grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center reveal',
                                index % 2 === 1 ? 'lg:grid-flow-dense' : '',
                            )}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            {/* Project Image */}
                            <div
                                className={cn(
                                    'overflow-hidden rounded-2xl shadow-xl transform transition-all duration-500',
                                    activeIndex === index ? 'scale-[1.02]' : 'scale-100',
                                )}
                            >
                                <div
                                    className="w-full h-[300px] bg-cover bg-center transition-all duration-700"
                                    style={{
                                        backgroundImage: `url(${project.image})`,
                                        transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                                    }}
                                ></div>
                            </div>

                            {/* Project Details */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold">{t(project.title)}</h3>
                                <p className="text-muted-foreground">{t(project.description)}</p>

                                <div className="flex flex-wrap gap-2 my-4">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="text-xs font-medium bg-secondary px-3 py-1 rounded-full"
                                        >
                                            {t(tag)}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex space-x-4 pt-2">
                                    <a
                                        href={project.github}
                                        className="flex items-center text-sm font-medium hover:text-primary transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Github size={16} className="mr-2" />
                                        {t('SOURCE_CODE')}
                                    </a>
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            className="flex items-center text-sm font-medium hover:text-primary transition-colors"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ExternalLink size={16} className="mr-2" />
                                            {t('LIVE_DEMO')}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Button onClick={toggleShowMore} variant="outline" className="inline-flex items-center px-6">
                        {showMore ? (
                            <>
                                {t('SHOW_LESS')}
                                <ArrowUp size={16} className="ml-2" />
                            </>
                        ) : (
                            <>
                                {t('SHOW_MORE')}
                                <ArrowDown size={16} className="ml-2" />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Projects;
