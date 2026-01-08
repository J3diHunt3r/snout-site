import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "How does the QR Code feature work?",
        answer: "Every pet gets a unique QR code on their tag. When scanned by anyone with a smartphone, it instantly shows your contact details (which you can toggle privacy for) and sends you a GPS location of where the scan occurred."
    },
    {
        question: "Is the AI vet consultation a replacement for real vets?",
        answer: "No, Gemini AI is an assistant. It helps triage symptoms, answers behavioral questions, and gives diet advice. For medical emergencies or diagnoses, the app will instantly direct you to the nearest open veterinary clinic."
    },
    {
        question: "Can I use Snout for my pet grooming business?",
        answer: "Absolutely! Our Business tier includes a full booking system, invoicing tools, client messaging, and a verified profile on our interactive map."
    },
    {
        question: "Does the lost pet broadcast work globally?",
        answer: "The broadcast feature alerts users within a scalable radius (default 2 miles) of your current location. While it works anywhere the app is used, it's most effective in active communities."
    }
];

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-100 dark:border-gray-700 last:border-none">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left hover:text-[var(--color-primary)] transition-colors dark:text-white"
            >
                <span className="text-lg font-bold">{question}</span>
                <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400'}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-gray-500 dark:text-gray-400 leading-relaxed pr-8">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-24 bg-[var(--color-bg)]">
            <div className="container max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold dark:text-white">Frequently Asked Questions</h2>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-2 md:p-8">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            {...faq}
                            isOpen={index === openIndex}
                            onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
