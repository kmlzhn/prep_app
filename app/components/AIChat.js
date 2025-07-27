'use client';

import { useState, useRef, useEffect } from 'react';

export default function AIChat({ courseTitle, currentTopic, isOpen: externalIsOpen, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Используем внешнее состояние если передано
  const actualIsOpen = externalIsOpen !== undefined ? externalIsOpen : isOpen;
  const actualOnClose = onClose || (() => setIsOpen(false));
  const getWelcomeMessage = (course) => {
    const messages = {
      'Speaking Skills': 'Привет! Я ваш ИИ-помощник по Speaking Skills. Готов помочь с произношением, структурой ответов и confidence! 🎤',
      'Writing Mastery': 'Привет! Я ваш ИИ-помощник по Writing Mastery. Помогу с Task 1, Task 2, грамматикой и академическим стилем! ✍️',
      'Listening Practice': 'Привет! Я ваш ИИ-помощник по Listening Practice. Научу стратегиям понимания и работе с разными акцентами! 🎧',
      'Reading Comprehension': 'Привет! Я ваш ИИ-помощник по Reading Comprehension. Помогу с техниками чтения и пониманием сложных текстов! 📚',
      'Основы IELTS': 'Привет! Я ваш ИИ-помощник по основам IELTS. Расскажу о структуре экзамена и стратегиях подготовки! 🎯'
    };
    return messages[course] || messages['Основы IELTS'];
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: getWelcomeMessage(courseTitle),
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Симуляция ответа ИИ (здесь будет реальный API вызов)
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        text: generateContextualResponse(inputText, courseTitle, currentTopic),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateContextualResponse = (question, course, topic) => {
    const responses = {
      'Speaking Skills': [
        'Отличный вопрос о Speaking! Для Part 1 важно отвечать кратко и естественно. Попробуйте структурировать ответ: прямой ответ + деталь + пример.',
        'В Speaking важна беглость речи. Не останавливайтесь на ошибках - продолжайте говорить. Лучше показать уверенность, чем идеальную грамматику.',
        'Для Part 2 используйте всю минуту на подготовку! Составьте план: вступление, 2-3 основных пункта, заключение. Это поможет говорить уверенно.',
        'В Part 3 показывайте критическое мышление. Используйте фразы: "On one hand... on the other hand", "It depends on...", "In my opinion..."'
      ],
      'Writing Mastery': [
        'В Writing важна структура! Task 1: Overview → Details → Comparisons. Task 2: Introduction → Body 1 → Body 2 → Conclusion.',
        'Для Task 1 используйте разнообразную лексику: increase/rise/grow, decrease/fall/drop, remain stable/plateau.',
        'В Task 2 каждый параграф должен иметь clear topic sentence. Развивайте одну идею на параграф с примерами.',
        'Академический стиль: избегайте сокращений, используйте формальную лексику, пишите в третьем лице.'
      ],
      'Listening Practice': [
        'В Listening читайте вопросы до аудио! Подчеркните ключевые слова и предскажите тип ответа.',
        'Section 1 фокусируется на деталях: имена, числа, адреса. Тренируйте spelling и numbers daily.',
        'В Section 2-4 следите за синонимами! Аудио использует парафразы, а не точные слова из вопросов.',
        'Не паникуйте, если пропустили ответ. Переходите к следующему вопросу, не зацикливайтесь.'
      ],
      'Reading Comprehension': [
        'Управление временем ключевое! 20 минут на passage. Skimming → Questions → Scanning for answers.',
        'True/False/Not Given: TRUE = в тексте есть, FALSE = противоречит тексту, NOT GIVEN = не упоминается.',
        'Matching Headings: читайте первое и последнее предложения параграфа для общей идеи.',
        'В сложных текстах ищите linking words: however, furthermore, in contrast - они показывают структуру аргументов.'
      ],
      'Основы IELTS': [
        'IELTS оценивает 4 навыка: Listening, Reading, Writing, Speaking. Каждый раздел от 0 до 9 баллов.',
        'Время: Listening 30+10 мин, Reading 60 мин, Writing 60 мин, Speaking 11-14 мин.',
        'Стратегия подготовки: определите слабые места, тренируйтесь регулярно, изучайте формат заданий.',
        'Band 7.0 = Upper Intermediate level. Для достижения тренируйте академическую лексику и грамматику.'
      ]
    };

    const courseResponses = responses[course] || [
      'Спасибо за вопрос! Я помогу вам разобраться с этой темой IELTS.',
      'Это важный аспект подготовки к IELTS. Давайте проработаем это вместе.',
      'Отличный вопрос! В IELTS такие детали действительно важны.'
    ];

    return courseResponses[Math.floor(Math.random() * courseResponses.length)];
  };

  const getQuickQuestions = (course) => {
    const questions = {
      'Speaking Skills': [
        "Как улучшить произношение?",
        "Что делать, если забыл слово?",
        "Как структурировать ответ в Part 2?",
        "Типичные ошибки в Speaking"
      ],
      'Writing Mastery': [
        "Как написать введение в Task 2?",
        "Лексика для описания графиков",
        "Как структурировать аргументы?",
        "Типичные ошибки в Writing"
      ],
      'Listening Practice': [
        "Как улучшить понимание акцентов?",
        "Стратегии для Section 1",
        "Что делать, если не расслышал?",
        "Как тренировать spelling?"
      ],
      'Reading Comprehension': [
        "Как управлять временем?",
        "True/False/Not Given стратегии",
        "Техники scanning и skimming",
        "Как понять сложные тексты?"
      ],
      'Основы IELTS': [
        "Структура экзамена IELTS",
        "Критерии оценки",
        "План подготовки",
        "Как достичь Band 7.0?"
      ]
    };
    return questions[course] || questions['Основы IELTS'];
  };

  const quickQuestions = getQuickQuestions(courseTitle);

  return (
    <>
      {/* Кнопка открытия чата */}
      {externalIsOpen === undefined && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors"
            title="ИИ-помощник"
          >
            <span className="text-2xl">🤖</span>
          </button>
        </div>
      )}

      {/* Модальное окно чата */}
      {actualIsOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={actualOnClose}></div>
            
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
              {/* Заголовок */}
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🤖</span>
                  <div>
                    <h3 className="text-lg font-semibold">ИИ-помощник prepAI</h3>
                    <p className="text-sm text-gray-600">{courseTitle}</p>
                  </div>
                </div>
                <button
                  onClick={actualOnClose}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Быстрые вопросы */}
              <div className="p-4 border-b bg-gray-50">
                <p className="text-sm text-gray-600 mb-2">Популярные вопросы:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputText(question)}
                      className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Сообщения */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Поле ввода */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Задайте вопрос ИИ-помощнику..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isLoading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Отправить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 