/**
 * @file ContactSection.tsx
 * @description Contact section with email, social links, and call-to-action buttons.
 * Features a copy-to-clipboard email functionality.
 */

'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/ui/Button';

/**
 * Social media links for the contact section
 */
const socialLinks = [
    { name: 'GitHub (Professional)', icon: Github, url: 'https://github.com/VedMP' },
    { name: 'GitHub (Academic)', icon: Github, url: 'https://github.com/VedPatel169' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/ved-patel-cs/' },
];

/**
 * Contact email address
 */
const email = 'vedmpatel2005@gmail.com';

/**
 * ContactSection Component
 * 
 * Displays contact information with:
 * - Header badge and title
 * - Email address with copy button
 * - CTA buttons (email, resume download)
 * - Social media links
 */
export default function ContactSection() {
    // Track whether email was copied to clipboard
    const [copied, setCopied] = useState(false);

    /**
     * Copies email to clipboard and shows feedback
     */
    const copyEmail = async () => {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="relative w-full py-24 md:py-32 overflow-hidden">
            {/* Decorative background gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />

            {/* Container with 20px padding from edges */}
            <div className="relative w-full flex justify-center" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                <div className="w-full max-w-3xl text-center">
                    {/* Section badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-6 flex justify-center"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
                            <Send className="w-4 h-4" />
                            Let's Connect
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
                    >
                        Have a project in mind? <span className="gradient-text">Let's talk!</span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-lg text-slate-400 mb-10"
                    >
                        I'm always open to discussing new opportunities, interesting projects, or just having a conversation about tech.
                    </motion.p>

                    {/* Email card with copy button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="mb-10 flex justify-center"
                    >
                        <div className="inline-flex items-center gap-2 p-2 rounded-2xl bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-3 px-4 py-2">
                                <Mail className="w-5 h-5 text-blue-400" />
                                <span className="text-lg text-slate-200">{email}</span>
                            </div>
                            <button
                                onClick={copyEmail}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors"
                                aria-label={copied ? 'Email copied' : 'Copy email to clipboard'}
                            >
                                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                <span>{copied ? 'Copied!' : 'Copy'}</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* CTA buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                    >
                        <Button href={`mailto:${email}`} size="lg">
                            <Mail className="w-5 h-5" />
                            Send Email
                        </Button>
                        <Button href="/resume.pdf" variant="secondary" size="lg">
                            Download Resume
                        </Button>
                    </motion.div>

                    {/* Social links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-sm text-slate-500 mb-4">Or find me on</p>
                        <div className="flex items-center justify-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 transition-all"
                                    aria-label={`Visit ${social.name}`}
                                >
                                    <social.icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
