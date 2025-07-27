'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState, useEffect } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson20() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [essay, setEssay] = useState('');
  const [saved, setSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [wordCount, setWordCount] = useState(0);

  // Объявляем функцию countWords перед её использованием
  const countWords = (text) => {
    const words = text.trim().split(/\s+/).filter(word => word !== '');
    setWordCount(words.length);
    return words.length;
  };

  useEffect(() => {
    const savedEssay = localStorage.getItem('lesson20_essay');
    if (savedEssay) {
      setEssay(savedEssay);
      countWords(savedEssay);
    }
  }, []);

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'writing-mastery';
  const lessonId = 20;
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

  const handleSave = () => {
    localStorage.setItem('lesson20_essay', essay);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleEssayChange = (e) => {
    const newText = e.target.value;
    setEssay(newText);
    countWords(newText);
  };

  const handleSubmit = async () => {
    if (essay.trim().length === 0) {
      alert('Пожалуйста, напишите текст перед отправкой на проверку.');
      return;
    }

    if (wordCount < 150) {
      alert('Ваш ответ должен содержать не менее 150 слов. Сейчас у вас: ' + wordCount + ' слов.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/writing-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          essay: essay,
          taskType: 'Task 1',
          question: 'The line graph below shows the percentage of tourists to England who visited four different attractions in Brighton between 1980 and 2010. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.'
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error analyzing essay');
      }
      
      const analysis = await response.json();
      setFeedback(analysis);
    } catch (error) {
      console.error('Error submitting essay:', error);
      alert('Произошла ошибка при анализе эссе: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <WritingMasterySidebar activeLessonId={20} />

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
              <span className="text-4xl mr-4">📝</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Урок 20: Практическое Task 1</h1>
                <p className="text-gray-600">Полный тест с оценкой ИИ • 60 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Практическое задание: IELTS Writing Task 1</h2>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Инструкции</h3>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li>Вам следует потратить около 20 минут на это задание.</li>
                  <li>Напишите не менее 150 слов.</li>
                  <li>Описывайте только то, что видите на графике, без добавления своего мнения.</li>
                  <li>Используйте академический стиль письма.</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Задание:</h3>
                <p className="text-gray-700 mb-6">
                  <em>The line graph below shows the percentage of tourists to England who visited four different attractions in Brighton between 1980 and 2010.</em>
                </p>
                <p className="text-gray-700 mb-6">
                  <em>Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</em>
                </p>

                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="font-medium text-gray-800 mb-4 text-center">Percentage of Tourists Visiting Brighton Attractions (1980-2010)</h4>
                  <div className="w-full h-96 bg-white border border-gray-200 rounded p-4">
                    <div className="flex justify-center">
                      <div className="w-full max-w-3xl h-80 relative">
                        {/* Фон графика */}
                        <div className="absolute left-20 right-10 top-10 bottom-20 bg-white border border-gray-200"></div>
                        
                        {/* Горизонтальные линии сетки */}
                        <div className="absolute left-20 right-10 top-10 h-[0.5px] bg-gray-200"></div>
                        <div className="absolute left-20 right-10 top-[calc(10px+17.5px)] h-[0.5px] bg-gray-200"></div>
                        <div className="absolute left-20 right-10 top-[calc(10px+35px)] h-[0.5px] bg-gray-200"></div>
                        <div className="absolute left-20 right-10 top-[calc(10px+52.5px)] h-[0.5px] bg-gray-200"></div>
                        <div className="absolute left-20 right-10 bottom-20 h-[0.5px] bg-gray-200"></div>
                        
                        {/* Вертикальные линии сетки */}
                        <div className="absolute left-20 top-10 bottom-20 w-[0.5px] bg-gray-200"></div>
                        <div className="absolute left-[calc(20px+82.5px)] top-10 bottom-20 w-[0.5px] bg-gray-200"></div>
                        <div className="absolute left-[calc(20px+165px)] top-10 bottom-20 w-[0.5px] bg-gray-200"></div>
                        <div className="absolute left-[calc(20px+247.5px)] top-10 bottom-20 w-[0.5px] bg-gray-200"></div>
                        <div className="absolute right-10 top-10 bottom-20 w-[0.5px] bg-gray-200"></div>
                        
                        {/* Оси графика */}
                        <div className="absolute left-20 top-10 bottom-20 w-[1.5px] bg-gray-400"></div>
                        <div className="absolute left-20 right-10 bottom-20 h-[1.5px] bg-gray-400"></div>
                        
                        {/* Метки по оси Y */}
                        <div className="absolute left-0 top-[calc(20px+17.5px)] text-xs text-gray-600 w-16 text-right pr-2">100%</div>
                        <div className="absolute left-0 top-[calc(70px+17.5px)] text-xs text-gray-600 w-16 text-right pr-2">75%</div>
                        <div className="absolute left-0 top-[calc(120px+17.5px)] text-xs text-gray-600 w-16 text-right pr-2">50%</div>
                        <div className="absolute left-0 top-[calc(150px+35px)] text-xs text-gray-600 w-16 text-right pr-2">25%</div>
                        <div className="absolute left-0 bottom-20 text-xs text-gray-600 w-16 text-right pr-2">0%</div>
                        
                        {/* Метки по оси X */}
                        <div className="absolute left-20 bottom-10 text-xs text-gray-600 -ml-5 text-center w-10">1980</div>
                        <div className="absolute left-[calc(100px+165px)] bottom-10 text-xs text-gray-600 -ml-5 text-center w-10">1990</div>
                        <div className="absolute left-[calc(270px+165px)] bottom-10 text-xs text-gray-600 -ml-5 text-center w-10">2000</div>
                        <div className="absolute left-[calc(350px+247.5px)] bottom-10 text-xs text-gray-600 -ml-5 text-center w-10">2010</div>
                        
                        {/* Линии графика с точными координатами */}
                        <svg className="absolute left-20 right-10 top-10 bottom-20" viewBox="0 0 330 70" preserveAspectRatio="none">
                          {/* Пирс - синяя линия */}
                          <polyline 
                            points="0,35 82.5,15 165,45 247.5,15 330,30" 
                            fill="none" 
                            stroke="#4285F4" 
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                          />
                          
                          {/* Павильон - красная линия */}
                          <polyline 
                            points="0,15 82.5,40 165,15 247.5,40 330,15" 
                            fill="none" 
                            stroke="#EA4335" 
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                          />
                          
                          {/* Музей - зеленая линия */}
                          <polyline 
                            points="0,45 82.5,45 165,40 247.5,30 330,15" 
                            fill="none" 
                            stroke="#34A853" 
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                          />
                          
                          {/* Галерея - фиолетовая линия */}
                          <polyline 
                            points="0,55 82.5,50 165,45 247.5,40 330,35" 
                            fill="none" 
                            stroke="#9334E6" 
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                          />

                          {/* Точки на линиях */}
                          {/* Пирс */}
                          <circle cx="0" cy="35" r="3.5" fill="#4285F4" />
                          <circle cx="82.5" cy="15" r="3.5" fill="#4285F4" />
                          <circle cx="165" cy="45" r="3.5" fill="#4285F4" />
                          <circle cx="247.5" cy="15" r="3.5" fill="#4285F4" />
                          <circle cx="330" cy="30" r="3.5" fill="#4285F4" />
                          
                          {/* Павильон */}
                          <circle cx="0" cy="15" r="3.5" fill="#EA4335" />
                          <circle cx="82.5" cy="40" r="3.5" fill="#EA4335" />
                          <circle cx="165" cy="15" r="3.5" fill="#EA4335" />
                          <circle cx="247.5" cy="40" r="3.5" fill="#EA4335" />
                          <circle cx="330" cy="15" r="3.5" fill="#EA4335" />
                          
                          {/* Музей */}
                          <circle cx="0" cy="45" r="3.5" fill="#34A853" />
                          <circle cx="82.5" cy="45" r="3.5" fill="#34A853" />
                          <circle cx="165" cy="40" r="3.5" fill="#34A853" />
                          <circle cx="247.5" cy="30" r="3.5" fill="#34A853" />
                          <circle cx="330" cy="15" r="3.5" fill="#34A853" />
                          
                          {/* Галерея */}
                          <circle cx="0" cy="55" r="3.5" fill="#9334E6" />
                          <circle cx="82.5" cy="50" r="3.5" fill="#9334E6" />
                          <circle cx="165" cy="45" r="3.5" fill="#9334E6" />
                          <circle cx="247.5" cy="40" r="3.5" fill="#9334E6" />
                          <circle cx="330" cy="35" r="3.5" fill="#9334E6" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Легенда */}
                    <div className="flex justify-center mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-[#4285F4] rounded-full mr-2"></div>
                          <span>Пирс</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-[#EA4335] rounded-full mr-2"></div>
                          <span>Павильон</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-[#34A853] rounded-full mr-2"></div>
                          <span>Музей</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-[#9334E6] rounded-full mr-2"></div>
                          <span>Галерея</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Ваш ответ:</h3>
                  <div className="text-sm text-gray-600">
                    Слов: <span className={wordCount < 150 ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                      {wordCount}
                    </span>
                    <span className="text-gray-500"> / минимум 150</span>
                  </div>
                </div>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 min-h-[300px]"
                  value={essay}
                  onChange={handleEssayChange}
                  placeholder="Напишите свой ответ здесь..."
                />
                <div className="flex flex-wrap gap-3 mt-3">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Сохранить черновик
                  </button>
                  {saved && <span className="text-green-600 self-center">Сохранено!</span>}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || essay.trim().length === 0}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isSubmitting || essay.trim().length === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Проверка...
                      </span>
                    ) : (
                      'Отправить на проверку'
                    )}
                  </button>
                </div>
              </div>

              {feedback && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Результаты проверки</h3>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Общая оценка:</h4>
                    <div className="flex items-center">
                      <div className="text-2xl font-bold text-blue-600">{feedback.overallScore}</div>
                      <div className="ml-2 text-gray-500">(из 9.0)</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2">Task Achievement</h4>
                      <div className="flex items-center">
                        <div className="text-xl font-bold text-blue-600">{feedback.scores.taskResponse}</div>
                        <div className="ml-2 text-gray-500">(из 9.0)</div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2">Coherence & Cohesion</h4>
                      <div className="flex items-center">
                        <div className="text-xl font-bold text-blue-600">{feedback.scores.coherenceCohesion}</div>
                        <div className="ml-2 text-gray-500">(из 9.0)</div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2">Lexical Resource</h4>
                      <div className="flex items-center">
                        <div className="text-xl font-bold text-blue-600">{feedback.scores.lexicalResource}</div>
                        <div className="ml-2 text-gray-500">(из 9.0)</div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2">Grammar & Accuracy</h4>
                      <div className="flex items-center">
                        <div className="text-xl font-bold text-blue-600">{feedback.scores.grammarAccuracy}</div>
                        <div className="ml-2 text-gray-500">(из 9.0)</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Сильные стороны:</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        {feedback.feedback.strengths.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Области для улучшения:</h4>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        {feedback.feedback.improvements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Рекомендации:</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      {feedback.suggestions.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
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
                  href="/courses/writing-mastery/lessons/lesson-21"
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