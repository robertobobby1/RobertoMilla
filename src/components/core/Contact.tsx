import React, { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/helpers/Utils';
import { useTranslationWithType } from '@/helpers/Translations';
import { toast } from '@/hooks/use-toast';
import { getFunctions, httpsCallable } from 'firebase/functions';
import Socials from '../reusable/Socials';

const email = 'info@robertomilla.com';

const Contact = () => {
    const { t } = useTranslationWithType();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const functions = getFunctions();
        const callableRetMessage = httpsCallable(functions, 'sendContactRequest');
        callableRetMessage(formData)
            .then(data => {
                console.log(data);
                toast({
                    text: t('MESSAGE_SENT_SUCCESFUL'),
                    toasttype: 'success',
                });
                // Reset form and close popup
                setFormData({ name: '', email: '', message: '' });
            })
            .catch(error => {
                console.log(error);
                toast({
                    text: t('ERROR_SENDING_MAIL'),
                    toasttype: 'error',
                });
            });

        // Reset form
        setFormData({
            name: '',
            email: '',
            message: '',
        });

        setIsSubmitting(false);
    };

    return (
        <section id="contact" className="section bg-secondary/30">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('GET_IN_TOUCH')}</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">{t('HAVE_PROJECT_IN_MIND')}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="lg:col-span-2">
                        <div className="glass rounded-2xl p-8 h-full">
                            <h3 className="text-xl font-semibold mb-6">{t('CONTACT_INFO')}</h3>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-primary/5 p-3 rounded-lg mr-4">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium mb-1">{t('EMAIL')}</h4>
                                        <a
                                            href={`mailto:${email}`}
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {email}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-primary/5 p-3 rounded-lg mr-4">
                                        <MessageSquare className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium mb-1">{t('LETS_TALK')}</h4>
                                        <p className="text-muted-foreground">{t('OPEN_TO_DISCUSS')} </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16">
                                <h4 className="text-sm font-medium mb-3">{t('CONNECT_WITH_ME')}</h4>
                                <Socials />
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        {t('NAME')}
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={cn(
                                            'w-full px-4 py-3 rounded-lg border border-border focus:border-primary outline-none',
                                            'transition-all duration-200 bg-white/50 backdrop-blur-sm',
                                        )}
                                        placeholder={t('NAME_PLACEHOLDER')}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        {t('EMAIL')}
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={cn(
                                            'w-full px-4 py-3 rounded-lg border border-border focus:border-primary outline-none',
                                            'transition-all duration-200 bg-white/50 backdrop-blur-sm',
                                        )}
                                        placeholder={t('EMAIL_PLACEHOLDER')}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    {t('MESSAGE')}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={cn(
                                        'w-full px-4 py-3 rounded-lg border border-border focus:border-primary outline-none',
                                        'transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none',
                                    )}
                                    placeholder={t('MESSAGE_PLACEHOLDER')}
                                />
                            </div>

                            <div className="pt-2">
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={cn(
                                        'bg-primary text-white px-6 py-3 rounded-lg font-medium',
                                        'flex items-center justify-center',
                                        'transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20',
                                        isSubmitting ? 'opacity-80 cursor-not-allowed' : '',
                                    )}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            {t('SENDING')}
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <Send className="w-4 h-4 mr-2" />
                                            {t('SEND_MESSAGE')}
                                        </div>
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
