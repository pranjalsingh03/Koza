import React from 'react';

function FAQSection() {
    const faqs = [
        {
            question: "Question 1?",
            answer: "Answer to question 1.",
        },
        {
            question: "Question 2?",
            answer: "Answer to question 2.",
        },
        {
            question: "Question 3?",
            answer: "Answer to question 3.",
        },
        {
            question: "Question 4?",
            answer: "Answer to question 4.",
        },
        {
            question: "Question 5?",
            answer: "Answer to question 5.",
        },
    ];

    return (
        <section className="faq-section max-w-lg mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 mb-4">
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                </div>
            ))}
        </section>
    );
}

export default FAQSection;
