import React, { useEffect } from 'react';
import Navbar from '@/components/core/Navbar';
import Hero from '@/components/core/Hero';
import Experience from '@/components/core/Experience';
import Projects from '@/components/core/Projects';
import Contact from '@/components/core/Contact';
import Footer from '@/components/core/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { initFirebase } from '@/helpers/Firebase';
import { configureI18n } from '@/helpers/Translations';

const Index = () => {
    useEffect(() => {
        initFirebase();
        configureI18n();

        const observeElements = () => {
            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('active');
                        }
                    });
                },
                {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.1,
                },
            );

            document.querySelectorAll('.reveal').forEach(element => {
                observer.observe(element);
            });
        };

        observeElements();
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen flex flex-col"
            >
                <Navbar />
                <main>
                    <Hero />
                    <Experience />
                    <Projects />
                    <Contact />
                </main>
                <Footer />
            </motion.div>
        </AnimatePresence>
    );
};

export default Index;
