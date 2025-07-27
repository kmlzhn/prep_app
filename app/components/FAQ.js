'use client';
import { useState } from 'react';

export default function FAQ() {
  const [openIndexes, setOpenIndexes] = useState([]);

  const faqs = [
    {
      question: "Что именно я получу?",
      answer: "Вы получите полный курс подготовки к IELTS с ИИ-поддержкой, включающий диагностический тест, персональный план обучения, практические упражнения для Speaking и Writing секций, и постоянную обратную связь от искусственного интеллекта."
    },
    {
      question: "Для кого этот курс?",
      answer: "Курс подходит для всех, кто готовится к IELTS: от начинающих до продвинутых студентов. Особенно эффективен для тех, кто хочет быстро улучшить свои результаты с помощью современных технологий."
    },
    {
      question: "Как работает ИИ-помощник?",
      answer: "ИИ-помощник анализирует ваши ответы в реальном времени, предоставляет персонализированную обратную связь, помогает с практикой Speaking, проверяет Writing задания и адаптирует сложность упражнений под ваш уровень."
    },
    {
      question: "Какой балл я смогу получить?",
      answer: "Результат зависит от вашего начального уровня и усилий. В среднем, наши студенты повышают свой балл на 1.5-2 балла за 4-6 недель интенсивной подготовки."
    },
    {
      question: "Что если я застряну во время обучения?",
      answer: "У вас будет доступ к поддержке инструктора, закрытому сообществу студентов, а также 24/7 помощь ИИ-помощника для решения любых вопросов."
    },
    {
      question: "Есть ли гарантии?",
      answer: "Для тарифа Премиум мы предоставляем гарантию повышения балла. Если вы не улучшите свои результаты после прохождения курса, мы вернем деньги или предоставим дополнительные занятия бесплатно."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndexes(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const isOpen = (index) => openIndexes.includes(index);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Часто задаваемые вопросы
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
              <button
                className="w-full text-left p-6 focus:outline-none focus:ring-0 border-none hover:bg-gray-100 transition-all duration-500 ease-out"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <span 
                    className={`text-blue-600 text-xl transform transition-all duration-700 ease-out ${
                      isOpen(index) ? 'rotate-45 scale-110' : 'rotate-0 scale-100'
                    }`}
                  >
                    +
                  </span>
                </div>
              </button>
              
              <div 
                className={`transition-all duration-700 ease-out ${
                  isOpen(index)
                    ? 'max-h-screen opacity-100 transform translate-y-0' 
                    : 'max-h-0 opacity-0 transform -translate-y-2'
                }`}
                style={{
                  overflow: 'hidden'
                }}
              >
                <div className="px-6 pb-6">
                  <div className={`transition-all duration-500 delay-200 ${
                    isOpen(index) ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                  }`}>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 