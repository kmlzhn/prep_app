'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState } from 'react';
import IELTSBasicsSidebar from '../../../../components/IELTSBasicsSidebar';

export default function Lesson5() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [currentLevel, setCurrentLevel] = useState('');

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'ielts-basics';
  const lessonId = 5;
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

  const generateStudyPlan = () => {
    if (!selectedTimeframe || !selectedGoal || !currentLevel) {
      alert('Пожалуйста, заполните все поля для создания персонального плана');
      return;
    }

    const planElement = document.getElementById('study-plan-result');
    if (planElement) {
      planElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <IELTSBasicsSidebar activeLessonId={5} />

      {/* Основной контент */}
      <div className="flex-1 flex flex-col">
        {/* Мобильный хедер */}
        <div className="lg:hidden bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <Link href="/courses/ielts-basics" className="text-blue-600">← Назад к курсу</Link>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>

        <main className="flex-1 p-4 lg:p-8 max-w-4xl mx-auto">
          {/* Заголовок урока */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">🎯</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Урок 5: Планирование обучения</h1>
                <p className="text-gray-600">Как составить персональный план подготовки • 22 минуты</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Эффективное планирование подготовки к IELTS</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Успешная подготовка к IELTS требует структурированного подхода. В этом уроке вы создадите 
                персональный план обучения, который поможет достичь желаемого результата.
              </p>

              {/* Этапы планирования */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">📋 Этапы планирования</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-blue-800">Определите цель</h4>
                      <p className="text-blue-700 text-sm">Какой балл нужен и для чего (учеба, работа, иммиграция)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-blue-800">Оцените текущий уровень</h4>
                      <p className="text-blue-700 text-sm">Пройдите пробный тест или самооценку</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-blue-800">Установите временные рамки</h4>
                      <p className="text-blue-700 text-sm">Когда планируете сдавать экзамен</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <h4 className="font-semibold text-blue-800">Составьте расписание</h4>
                      <p className="text-blue-700 text-sm">Распределите время на изучение каждого навыка</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Интерактивный планировщик */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">🎯 Создайте свой план обучения</h3>
                
                <div className="space-y-6">
                  {/* Текущий уровень */}
                  <div>
                    <label className="block text-sm font-medium text-purple-800 mb-2">
                      Ваш текущий уровень английского:
                    </label>
                    <select 
                      value={currentLevel}
                      onChange={(e) => setCurrentLevel(e.target.value)}
                      className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Выберите уровень</option>
                      <option value="beginner">Beginner (A1-A2)</option>
                      <option value="intermediate">Intermediate (B1-B2)</option>
                      <option value="advanced">Advanced (C1-C2)</option>
                      <option value="unsure">Не уверен</option>
                    </select>
                  </div>

                  {/* Целевой балл */}
                  <div>
                    <label className="block text-sm font-medium text-purple-800 mb-2">
                      Ваша цель:
                    </label>
                    <select 
                      value={selectedGoal}
                      onChange={(e) => setSelectedGoal(e.target.value)}
                      className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Выберите цель</option>
                      <option value="5.5">IELTS 5.5 - Базовый уровень</option>
                      <option value="6.0">IELTS 6.0 - Средний уровень</option>
                      <option value="6.5">IELTS 6.5 - Выше среднего</option>
                      <option value="7.0">IELTS 7.0 - Хороший уровень</option>
                      <option value="7.5">IELTS 7.5+ - Высокий уровень</option>
                    </select>
                  </div>

                  {/* Временные рамки */}
                  <div>
                    <label className="block text-sm font-medium text-purple-800 mb-2">
                      Когда планируете сдавать экзамен:
                    </label>
                    <select 
                      value={selectedTimeframe}
                      onChange={(e) => setSelectedTimeframe(e.target.value)}
                      className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Выберите период</option>
                      <option value="1-month">Через 1 месяц</option>
                      <option value="2-months">Через 2-3 месяца</option>
                      <option value="6-months">Через 3-6 месяцев</option>
                      <option value="more">Более 6 месяцев</option>
                    </select>
                  </div>

                  <button 
                    onClick={generateStudyPlan}
                    className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    🚀 Создать персональный план
                  </button>
                </div>
              </div>

              {/* Результат планирования */}
              {selectedTimeframe && selectedGoal && currentLevel && (
                <div id="study-plan-result" className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-4">✨ Ваш персональный план</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">📊 Анализ</h4>
                        <p className="text-green-700 text-sm">
                          Текущий уровень: <strong>{currentLevel}</strong><br/>
                          Целевой балл: <strong>{selectedGoal}</strong><br/>
                          Время подготовки: <strong>{selectedTimeframe}</strong>
                        </p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">⏰ Рекомендуемый график</h4>
                        <div className="text-green-700 text-sm space-y-1">
                          {selectedTimeframe === '1-month' && (
                            <>
                              <p>• 3-4 часа в день</p>
                              <p>• Интенсивная подготовка</p>
                              <p>• Фокус на слабые стороны</p>
                            </>
                          )}
                          {selectedTimeframe === '2-months' && (
                            <>
                              <p>• 2-3 часа в день</p>
                              <p>• Системная подготовка</p>
                              <p>• Регулярная практика</p>
                            </>
                          )}
                          {selectedTimeframe === '6-months' && (
                            <>
                              <p>• 1-2 часа в день</p>
                              <p>• Планомерное изучение</p>
                              <p>• Развитие всех навыков</p>
                            </>
                          )}
                          {selectedTimeframe === 'more' && (
                            <>
                              <p>• 30-60 минут в день</p>
                              <p>• Постепенное улучшение</p>
                              <p>• Фундаментальная подготовка</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">🎯 Приоритеты</h4>
                        <div className="text-green-700 text-sm space-y-1">
                          {parseFloat(selectedGoal) >= 7.0 ? (
                            <>
                              <p>• Writing (самая сложная часть)</p>
                              <p>• Speaking (развитие беглости)</p>
                              <p>• Advanced vocabulary</p>
                              <p>• Complex grammar</p>
                            </>
                          ) : (
                            <>
                              <p>• Listening (быстрые результаты)</p>
                              <p>• Reading (техники сканирования)</p>
                              <p>• Basic grammar</p>
                              <p>• Essential vocabulary</p>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">📚 Ресурсы</h4>
                        <div className="text-green-700 text-sm space-y-1">
                          <p>• Cambridge IELTS books</p>
                          <p>• IELTS-specific vocabulary</p>
                          <p>• Mock tests (еженедельно)</p>
                          <p>• Speaking practice partner</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Типичные ошибки планирования */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-red-900 mb-4">⚠️ Типичные ошибки планирования</h3>
                
                <ul className="list-disc pl-6 space-y-2 text-red-800">
                  <li>Переоценка своих возможностей — слишком интенсивный график</li>
                  <li>Изучение только одной части экзамена в ущерб другим</li>
                  <li>Отсутствие регулярной практики с mock tests</li>
                  <li>Игнорирование анализа ошибок</li>
                  <li>Планирование экзамена без запаса времени</li>
                  <li>Отсутствие плана Б если результат не достигнут</li>
                </ul>
              </div>

              {/* Чек-лист эффективной подготовки */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-yellow-900 mb-4">✅ Чек-лист эффективной подготовки</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-yellow-600" />
                      <span className="text-yellow-800 text-sm">Определил целевой балл</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-yellow-600" />
                      <span className="text-yellow-800 text-sm">Прошел диагностический тест</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-yellow-600" />
                      <span className="text-yellow-800 text-sm">Составил еженедельный план</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-yellow-600" />
                      <span className="text-yellow-800 text-sm">Выбрал учебные материалы</span>
                    </label>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-yellow-600" />
                      <span className="text-yellow-800 text-sm">Запланировал регулярные mock tests</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-yellow-600" />
                      <span className="text-yellow-800 text-sm">Нашел партнера для Speaking</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-yellow-600" />
                      <span className="text-yellow-800 text-sm">Зарегистрировался на экзамен</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-yellow-600" />
                      <span className="text-yellow-800 text-sm">Подготовил запасной план</span>
                    </label>
                  </div>
                </div>
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
                  href="/courses/ielts-basics"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 hover:shadow-md transition-all duration-300"
                >
                  Вернуться к курсу
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