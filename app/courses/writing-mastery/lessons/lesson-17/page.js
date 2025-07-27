'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState, useEffect } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson17() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [answers, setAnswers] = useState(['', '', '']);
  const [saved, setSaved] = useState([false, false, false]);
  const [checkResult, setCheckResult] = useState([null, null, null]);

  useEffect(() => {
    const savedAnswers = [];
    for (let i = 0; i < 3; i++) {
      const a = localStorage.getItem(`lesson17_answer_${i}`);
      savedAnswers.push(a || '');
    }
    setAnswers(savedAnswers);
  }, []);

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'writing-mastery';
  const lessonId = 17;
  const completed = isLessonCompleted(courseSlug, lessonId);

  const handleCompleteLesson = () => {
    setIsCompleting(true);
    setTimeout(() => {
      markLessonComplete(courseSlug, lessonId);
      setIsCompleting(false);
      setShowCompletion(true);
      setTimeout(() => {
        setShowCompletion(false);
      }, 3000);
    }, 500);
  };

  const handleSave = (idx) => {
    localStorage.setItem(`lesson17_answer_${idx}`, answers[idx]);
    setSaved((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
    setTimeout(() => {
      setSaved((prev) => {
        const next = [...prev];
        next[idx] = false;
        return next;
      });
    }, 1500);
  };

  const keywords = [
    ['if', 'when', 'present simple'],
    ['if', 'will', 'future', 'present simple'],
    ['if', 'would', 'could', 'might', 'past simple']
  ];

  const checkAnswer = (idx) => {
    const answer = answers[idx].toLowerCase();
    const found = keywords[idx].some(word => answer.includes(word));
    setCheckResult(prev => {
      const next = [...prev];
      next[idx] = found ? 'Вы справились с заданием! Отличная работа!' : 'Попробуйте переформулировать или используйте условное предложение.';
      return next;
    });
  };

  const handleAnswerChange = (idx, value) => {
    const next = [...answers];
    next[idx] = value;
    setAnswers(next);
    // Сброс фидбека для изменённого ответа
    setCheckResult(prev => {
      const nextResult = [...prev];
      nextResult[idx] = null;
      return nextResult;
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <WritingMasterySidebar activeLessonId={17} />

      {/* Основной контент */}
      <div className="flex-1 flex flex-col">
        {/* Мобильный хедер */}
        <div className="lg:hidden bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <Link href="/courses/writing-mastery" className="text-blue-600">← Назад к курсу</Link>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>

        <main className="flex-1 p-4 lg:p-8 max-w-4xl mx-auto">
          {/* Заголовок урока */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">✍️</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Урок 17: Условные предложения</h1>
                <p className="text-gray-600">Conditionals в академическом письме • 28 минут</p>
              </div>
            </div>
            
            {completed && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <span className="text-green-700 font-medium">Урок завершен!</span>
                </div>
              </div>
            )}
          </div>

          {/* Содержание урока */}
          <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Условные предложения в академическом письме</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Условные предложения (conditionals) — это мощный инструмент в академическом письме, который позволяет выражать гипотетические ситуации, причинно-следственные связи и предположения. Правильное использование условных предложений демонстрирует высокий уровень владения языком и помогает более точно выражать сложные идеи в эссе IELTS.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Зачем использовать условные предложения в эссе?</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li><strong>Выражение гипотетических ситуаций</strong> — для обсуждения возможных сценариев и их последствий.</li>
                  <li><strong>Формулировка рекомендаций</strong> — для предложения решений проблем ("Если правительства инвестируют в образование, уровень безработицы снизится").</li>
                  <li><strong>Анализ причин и следствий</strong> — для объяснения связей между явлениями.</li>
                  <li><strong>Демонстрация критического мышления</strong> — для рассмотрения альтернативных точек зрения и сценариев.</li>
                  <li><strong>Разнообразие грамматических структур</strong> — для получения более высокой оценки за грамматический диапазон.</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Типы условных предложений</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Условное предложение нулевого типа (Zero Conditional)</h4>
                  <p className="text-gray-700">Используется для описания общих истин, научных фактов или ситуаций, которые всегда верны при определенных условиях.</p>
                  
                  <div className="mt-2 p-3 bg-white rounded text-gray-700">
                    <p><strong>Структура:</strong> If/When + Present Simple, Present Simple</p>
                    <p className="mt-2"><strong>Примеры:</strong></p>
                    <ul className="list-disc pl-5 mt-1 text-blue-800 text-sm space-y-1">
                      <li><em>"If water reaches 100 degrees Celsius, it boils."</em></li>
                      <li><em>"When people have access to education, they generally enjoy better employment prospects."</em></li>
                      <li><em>"If governments invest in infrastructure, economic growth typically follows."</em></li>
                    </ul>
                    <p className="mt-2"><strong>Применение в академическом письме:</strong> Для утверждения общепринятых фактов или закономерностей.</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Условное предложение первого типа (First Conditional)</h4>
                  <p className="text-gray-700">Используется для описания реальных или вероятных ситуаций в настоящем или будущем.</p>
                  
                  <div className="mt-2 p-3 bg-white rounded text-gray-700">
                    <p><strong>Структура:</strong> If + Present Simple, will/can/may/might + инфинитив</p>
                    <p className="mt-2"><strong>Примеры:</strong></p>
                    <ul className="list-disc pl-5 mt-1 text-blue-800 text-sm space-y-1">
                      <li><em>"If governments implement stricter regulations, air pollution will decrease."</em></li>
                      <li><em>"If schools adopt modern teaching methods, students may perform better academically."</em></li>
                      <li><em>"If public transport becomes more efficient, more people will use it instead of private cars."</em></li>
                    </ul>
                    <p className="mt-2"><strong>Применение в академическом письме:</strong> Для предложения решений, прогнозирования результатов политики или действий.</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Условное предложение второго типа (Second Conditional)</h4>
                  <p className="text-gray-700">Используется для описания гипотетических или маловероятных ситуаций в настоящем или будущем.</p>
                  
                  <div className="mt-2 p-3 bg-white rounded text-gray-700">
                    <p><strong>Структура:</strong> If + Past Simple, would/could/might + инфинитив</p>
                    <p className="mt-2"><strong>Примеры:</strong></p>
                    <ul className="list-disc pl-5 mt-1 text-blue-800 text-sm space-y-1">
                      <li><em>"If all countries reduced their carbon emissions, global warming would slow down significantly."</em></li>
                      <li><em>"If education were free for everyone, society would benefit from a more skilled workforce."</em></li>
                      <li><em>"If governments invested more in preventive healthcare, they could reduce long-term medical costs."</em></li>
                    </ul>
                    <p className="mt-2"><strong>Применение в академическом письме:</strong> Для обсуждения идеальных сценариев, предложения амбициозных решений или критики текущей ситуации.</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Условное предложение третьего типа (Third Conditional)</h4>
                  <p className="text-gray-700">Используется для описания гипотетических ситуаций в прошлом (что могло бы произойти, но не произошло).</p>
                  
                  <div className="mt-2 p-3 bg-white rounded text-gray-700">
                    <p><strong>Структура:</strong> If + Past Perfect, would/could/might + have + причастие прошедшего времени</p>
                    <p className="mt-2"><strong>Примеры:</strong></p>
                    <ul className="list-disc pl-5 mt-1 text-blue-800 text-sm space-y-1">
                      <li><em>"If governments had taken climate change seriously in the 1990s, we would have avoided many environmental problems we face today."</em></li>
                      <li><em>"If more countries had invested in renewable energy earlier, dependence on fossil fuels might have decreased significantly."</em></li>
                      <li><em>"If educational reforms had been implemented sooner, the current skills gap in the workforce could have been prevented."</em></li>
                    </ul>
                    <p className="mt-2"><strong>Применение в академическом письме:</strong> Для критического анализа прошлых решений, обсуждения упущенных возможностей или извлечения уроков из истории.</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Смешанные условные предложения (Mixed Conditionals)</h4>
                  <p className="text-gray-700">Комбинируют элементы разных типов условных предложений для связи прошлого с настоящим или будущим.</p>
                  
                  <div className="mt-2 p-3 bg-white rounded text-gray-700">
                    <p><strong>Примеры:</strong></p>
                    <ul className="list-disc pl-5 mt-1 text-blue-800 text-sm space-y-1">
                      <li><em>"If governments had invested more in education (прошлое), the workforce would be more skilled today (настоящее)."</em></li>
                      <li><em>"If people were more environmentally conscious (настоящее), the planet would not have suffered such extensive damage (прошлое)."</em></li>
                    </ul>
                    <p className="mt-2"><strong>Применение в академическом письме:</strong> Для установления связей между прошлыми событиями и их текущими последствиями или для анализа влияния текущих тенденций на прошлые события.</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Альтернативные способы выражения условия</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">1. Unless (если не)</h4>
                  <p className="text-green-800">Используется вместо "if not" для выражения отрицательного условия.</p>
                  <p className="text-green-800 text-sm italic mt-1">
                    "<strong>Unless</strong> governments take immediate action, climate change will continue to worsen."<br/>
                    (= If governments do not take immediate action, climate change will continue to worsen.)
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">2. Provided that / Providing that / As long as / So long as</h4>
                  <p className="text-green-800">Выражают условие, которое должно быть выполнено.</p>
                  <p className="text-green-800 text-sm italic mt-1">
                    "Remote work can be highly effective <strong>provided that</strong> employees have access to appropriate technology."
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">3. In case (of) / In the event (of)</h4>
                  <p className="text-green-800">Используются для описания подготовки к возможной ситуации.</p>
                  <p className="text-green-800 text-sm italic mt-1">
                    "Countries should develop emergency response plans <strong>in case of</strong> natural disasters."
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">4. Otherwise / Or else</h4>
                  <p className="text-green-800">Указывают на негативные последствия, если условие не будет выполнено.</p>
                  <p className="text-green-800 text-sm italic mt-1">
                    "Governments must invest in sustainable energy; <strong>otherwise</strong>, environmental degradation will continue."
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">5. Причастные обороты</h4>
                  <p className="text-green-800">Более формальный способ выражения условия.</p>
                  <p className="text-green-800 text-sm italic mt-1">
                    "<strong>Given</strong> adequate resources, schools can implement effective educational programs."<br/>
                    (= If schools are given adequate resources, they can implement effective educational programs.)
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Советы по использованию условных предложений в академическом письме</h3>
              
              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <ul className="list-disc pl-6 text-yellow-800 space-y-2">
                  <li><strong>Используйте разнообразные структуры</strong> — демонстрируйте владение различными типами условных предложений.</li>
                  <li><strong>Будьте точны в выборе типа</strong> — убедитесь, что выбранный тип условного предложения соответствует степени вероятности описываемой ситуации.</li>
                  <li><strong>Следите за согласованием времен</strong> — особенно в сложных условных конструкциях.</li>
                  <li><strong>Избегайте чрезмерного использования</strong> — не перегружайте текст условными предложениями.</li>
                  <li><strong>Используйте условные предложения для структурирования аргументов</strong> — они помогают установить логические связи между идеями.</li>
                  <li><strong>Применяйте формальные альтернативы</strong> — в академическом письме предпочтительнее использовать более формальные способы выражения условия.</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Распространенные ошибки при использовании условных предложений</h3>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-red-800 mb-1">1. Неправильное использование времен</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="text-red-700 text-sm"><strong>Неправильно:</strong> <em>"If the government will invest more in education, the literacy rate will improve."</em></p>
                      <p className="text-green-700 text-sm mt-1"><strong>Правильно:</strong> <em>"If the government invests more in education, the literacy rate will improve."</em></p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-red-800 mb-1">2. Смешение типов без необходимости</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="text-red-700 text-sm"><strong>Неправильно:</strong> <em>"If people would recycle more, it will reduce waste in landfills."</em></p>
                      <p className="text-green-700 text-sm mt-1"><strong>Правильно:</strong> <em>"If people recycled more, it would reduce waste in landfills."</em> или <em>"If people recycle more, it will reduce waste in landfills."</em></p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-red-800 mb-1">3. Неправильное использование would в if-части</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="text-red-700 text-sm"><strong>Неправильно:</strong> <em>"If the government would implement stricter regulations, pollution levels would decrease."</em></p>
                      <p className="text-green-700 text-sm mt-1"><strong>Правильно:</strong> <em>"If the government implemented stricter regulations, pollution levels would decrease."</em></p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-red-800 mb-1">4. Неправильное использование unless</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="text-red-700 text-sm"><strong>Неправильно:</strong> <em>"Unless the government will not take action, the situation will worsen."</em></p>
                      <p className="text-green-700 text-sm mt-1"><strong>Правильно:</strong> <em>"Unless the government takes action, the situation will worsen."</em></p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Практическое задание</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <p className="text-blue-800 mb-4">Перепишите следующие предложения, используя указанный тип условного предложения:</p>
                
                <ol className="list-decimal pl-6 text-blue-800 space-y-3">
                  {[0,1,2].map(idx => (
                    <li key={idx} className="mb-4">
                      <p className="text-blue-700 mb-1">{idx === 0 ? 'Правительства инвестируют в образование. Экономика развивается быстрее.' : idx === 1 ? 'Общественный транспорт станет более эффективным. Люди будут меньше использовать личные автомобили.' : 'Все страны сотрудничают в борьбе с изменением климата. Глобальное потепление замедляется.'}</p>
                      <div className="mt-2">
                        <textarea
                          className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          rows={3}
                          value={answers[idx]}
                          onChange={e => handleAnswerChange(idx, e.target.value)}
                          placeholder="Напишите условное предложение..."
                        />
                        <div className="flex items-center mb-2">
                          <button
                            onClick={() => handleSave(idx)}
                            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-all text-sm"
                          >
                            Сохранить
                          </button>
                          {saved[idx] && <span className="ml-2 text-green-600 text-sm">Сохранено!</span>}
                          <button
                            onClick={() => checkAnswer(idx)}
                            className="ml-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-all text-xs"
                          >
                            Проверить
                          </button>
                        </div>
                        {checkResult[idx] && (
                          <div className={checkResult[idx].includes('похож') ? 'mt-1 text-green-600' : 'mt-1 text-red-600'}>{checkResult[idx]}</div>
                        )}
                        {answers[idx] && (
                          <div className="mt-2"><span className="font-medium">Ваш ответ:</span> {answers[idx]}</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Кнопка завершения урока */}
          <div className="text-center">
            {!completed ? (
              <button 
                onClick={handleCompleteLesson}
                disabled={isCompleting}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isCompleting 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md'
                }`}
              >
                {isCompleting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Завершаем...
                  </span>
                ) : (
                  '✅ Отметить как завершенный'
                )}
              </button>
            ) : (
              <div className="space-y-4">
                <p className="text-green-600 font-semibold">Урок завершен! 🎉</p>
                <Link 
                  href="/courses/writing-mastery/lessons/lesson-18"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 hover:shadow-md transition-all duration-300"
                >
                  Перейти к следующему уроку →
                </Link>
              </div>
            )}
          </div>

          {/* Уведомление о завершении */}
          {showCompletion && (
            <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
              <div className="flex items-center">
                <span className="mr-2">🎉</span>
                Урок отмечен как завершенный!
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
