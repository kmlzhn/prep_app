'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson4() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'writing-mastery';
  const lessonId = 4;
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

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
    setShowFeedback(true);
    setIsCorrect(answerId === 3); // Answer 3 is correct
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <WritingMasterySidebar activeLessonId={4} />

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
                <h1 className="text-3xl font-bold text-gray-900">Урок 4: Столбчатые диаграммы</h1>
                <p className="text-gray-600">Сравнение категорий данных • 28 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Описание столбчатых диаграмм в IELTS Writing Task 1</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Столбчатые диаграммы (bar charts) — один из наиболее распространенных типов визуальной информации в IELTS Writing Task 1. Они используются для сравнения данных между различными категориями и могут показывать как статичные данные, так и изменения с течением времени. В этом уроке мы рассмотрим, как эффективно описывать столбчатые диаграммы для получения высокого балла.
              </p>

              {/* Визуализация столбчатой диаграммы */}
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Пример столбчатой диаграммы</h3>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="mb-2 text-center font-medium text-gray-700">
                    Потребление воды в разных странах (литры на человека в день)
                  </div>
                  <div className="h-64 flex items-end justify-around space-x-6 pb-6 px-4">
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-500 w-16 rounded-t-md" style={{ height: '19px' }}></div>
                      <div className="mt-2 text-sm font-medium">Индия</div>
                      <div className="text-xs text-gray-600">135л</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-500 w-16 rounded-t-md" style={{ height: '26px' }}></div>
                      <div className="mt-2 text-sm font-medium">Китай</div>
                      <div className="text-xs text-gray-600">180л</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-500 w-16 rounded-t-md" style={{ height: '38px' }}></div>
                      <div className="mt-2 text-sm font-medium">Россия</div>
                      <div className="text-xs text-gray-600">270л</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-500 w-16 rounded-t-md" style={{ height: '51px' }}></div>
                      <div className="mt-2 text-sm font-medium">Европа</div>
                      <div className="text-xs text-gray-600">360л</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-500 w-16 rounded-t-md" style={{ height: '64px' }}></div>
                      <div className="mt-2 text-sm font-medium">США</div>
                      <div className="text-xs text-gray-600">450л</div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Типы столбчатых диаграмм</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Простые столбчатые диаграммы</h4>
                  <p className="text-blue-800">Показывают одну категорию данных для разных групп. Например, население разных стран или продажи одного продукта в разные месяцы.</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Сгруппированные столбчатые диаграммы</h4>
                  <p className="text-green-800">Сравнивают несколько категорий данных для разных групп. Например, потребление разных видов энергии в разных странах.</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Составные столбчатые диаграммы</h4>
                  <p className="text-yellow-800">Показывают, как разные компоненты составляют целое. Каждый столбец разделен на сегменты, представляющие разные части целого.</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Горизонтальные столбчатые диаграммы</h4>
                  <p className="text-purple-800">Аналогичны вертикальным, но столбцы расположены горизонтально. Полезны при длинных названиях категорий или большом количестве данных.</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Структура описания столбчатой диаграммы</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Введение</h4>
                  <p className="text-gray-700">Перефразируйте задание, укажите тип диаграммы и опишите, какие данные она показывает.</p>
                  <div className="mt-2 p-3 bg-blue-50 rounded text-blue-800 text-sm">
                    <strong>Пример:</strong> <em>"The bar chart illustrates the daily water consumption per person in five different countries, measured in liters."</em>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Обзор</h4>
                  <p className="text-gray-700">Опишите 2-3 основные особенности данных: самые высокие/низкие значения, заметные различия или группировки.</p>
                  <div className="mt-2 p-3 bg-blue-50 rounded text-blue-800 text-sm">
                    <strong>Пример:</strong> <em>"Overall, there is a significant variation in water usage across the countries, with the United States having the highest consumption at 450 liters per day, which is more than three times the amount used in India, the country with the lowest figure."</em>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">3. Детальное описание: высокие значения</h4>
                  <p className="text-gray-700">Опишите группы с наиболее высокими значениями, используя точные цифры и сравнения.</p>
                  <div className="mt-2 p-3 bg-blue-50 rounded text-blue-800 text-sm">
                    <strong>Пример:</strong> <em>"The United States has the highest water consumption at 450 liters per person daily, followed by European countries with 360 liters, which is 20% less than the American figure. Russia ranks third with 270 liters per day, representing 60% of the American consumption."</em>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">4. Детальное описание: низкие значения</h4>
                  <p className="text-gray-700">Опишите группы с наиболее низкими значениями, используя точные цифры и сравнения.</p>
                  <div className="mt-2 p-3 bg-blue-50 rounded text-blue-800 text-sm">
                    <strong>Пример:</strong> <em>"China and India have considerably lower water usage figures, at 180 and 135 liters per day respectively. India's consumption is less than one-third of the American figure, while China's usage is exactly half that of European countries."</em>
                  </div>
                </div>
              </div>

              {/* Интерактивная секция с множественным выбором */}
              <div className="bg-yellow-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">Интерактивное задание</h3>
                <p className="text-yellow-800 mb-4">Выберите наиболее подходящий обзорный абзац (overview) для описания следующей столбчатой диаграммы:</p>
                
                <div className="bg-white p-4 rounded-lg border border-yellow-200 mb-4">
                  <div className="text-center font-medium text-gray-700 mb-2">
                    Процент населения с высшим образованием в разных возрастных группах
                  </div>
                  <div className="h-48 flex items-end justify-around space-x-4 pb-6 px-2">
                    <div className="flex flex-col items-center">
                      <div className="bg-green-500 w-12 rounded-t-md" style={{ height: '10px' }}></div>
                      <div className="mt-2 text-xs font-medium">65+</div>
                      <div className="text-xs text-gray-600">15%</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-green-500 w-12 rounded-t-md" style={{ height: '19px' }}></div>
                      <div className="mt-2 text-xs font-medium">55-64</div>
                      <div className="text-xs text-gray-600">30%</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-green-500 w-12 rounded-t-md" style={{ height: '29px' }}></div>
                      <div className="mt-2 text-xs font-medium">45-54</div>
                      <div className="text-xs text-gray-600">45%</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-green-500 w-12 rounded-t-md" style={{ height: '38px' }}></div>
                      <div className="mt-2 text-xs font-medium">35-44</div>
                      <div className="text-xs text-gray-600">60%</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-green-500 w-12 rounded-t-md" style={{ height: '48px' }}></div>
                      <div className="mt-2 text-xs font-medium">25-34</div>
                      <div className="text-xs text-gray-600">75%</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div 
                    className={`p-3 rounded-lg cursor-pointer border ${
                      selectedAnswer === 1 
                        ? 'bg-red-100 border-red-300' 
                        : 'bg-white border-gray-200 hover:border-yellow-300'
                    }`}
                    onClick={() => handleAnswerSelect(1)}
                  >
                    <p className="text-gray-800">
                      "The bar chart shows the percentage of people with higher education in different age groups. The figures range from 15% to 75%, with the highest percentage being in the 25-34 age group."
                    </p>
                  </div>
                  
                  <div 
                    className={`p-3 rounded-lg cursor-pointer border ${
                      selectedAnswer === 2 
                        ? 'bg-red-100 border-red-300' 
                        : 'bg-white border-gray-200 hover:border-yellow-300'
                    }`}
                    onClick={() => handleAnswerSelect(2)}
                  >
                    <p className="text-gray-800">
                      "Overall, the chart displays educational attainment across age demographics. Young people aged 25-34 have the highest rate at 75%, while the elderly population over 65 has only 15% with higher education."
                    </p>
                  </div>
                  
                  <div 
                    className={`p-3 rounded-lg cursor-pointer border ${
                      selectedAnswer === 3 
                        ? 'bg-green-100 border-green-300' 
                        : 'bg-white border-gray-200 hover:border-yellow-300'
                    }`}
                    onClick={() => handleAnswerSelect(3)}
                  >
                    <p className="text-gray-800">
                      "Overall, there is a clear inverse relationship between age and higher education levels, with each successively younger age group showing a higher percentage of university graduates. The youngest age group (25-34) has five times the proportion of university-educated individuals compared to the oldest group (65+)."
                    </p>
                  </div>
                  
                  <div 
                    className={`p-3 rounded-lg cursor-pointer border ${
                      selectedAnswer === 4 
                        ? 'bg-red-100 border-red-300' 
                        : 'bg-white border-gray-200 hover:border-yellow-300'
                    }`}
                    onClick={() => handleAnswerSelect(4)}
                  >
                    <p className="text-gray-800">
                      "The chart illustrates educational differences by age. It is evident that 75% of people aged 25-34 have higher education, 60% of those aged 35-44, 45% of the 45-54 age group, 30% of those aged 55-64, and only 15% of people over 65."
                    </p>
                  </div>
                </div>
                
                {showFeedback && (
                  <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {isCorrect ? (
                      <>
                        <p className="font-semibold">Правильно!</p>
                        <p>Этот обзор отлично описывает ключевую тенденцию (обратная зависимость между возрастом и уровнем образования) и включает количественное сравнение между крайними группами.</p>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold">Попробуйте еще раз!</p>
                        <p>Хороший обзор должен выделять основную тенденцию (обратную зависимость между возрастом и образованием) и включать значимое сравнение, а не просто перечислять цифры.</p>
                      </>
                    )}
                  </div>
                )}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Полезные фразы для описания столбчатых диаграмм</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Сравнение значений:</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                      <li>X is twice/three times as high as Y</li>
                      <li>X is double/triple the figure for Y</li>
                      <li>X accounts for the largest/smallest proportion</li>
                      <li>X is significantly/marginally higher/lower than Y</li>
                      <li>X exceeds Y by Z percent/units</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Описание различий:</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                      <li>There is a substantial/considerable difference between X and Y</li>
                      <li>The gap between X and Y is significant/minimal</li>
                      <li>X is far more/less prevalent than Y</li>
                      <li>The disparity between X and Y is striking/negligible</li>
                      <li>X outperforms/lags behind Y by a wide margin</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Описание групп и категорий:</h4>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                    <li>The figures can be divided into three main groups</li>
                    <li>Countries/categories fall into distinct tiers/levels</li>
                    <li>The highest/lowest values are found in X, Y, and Z</li>
                    <li>The middle-ranking countries/categories include X and Y</li>
                    <li>There is a clear hierarchy/pattern among the categories</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Распространенные ошибки при описании столбчатых диаграмм</h3>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <ul className="list-disc pl-6 text-red-800 space-y-2">
                  <li><strong>Перечисление всех данных</strong> — не нужно описывать каждый столбец по отдельности, группируйте данные логически.</li>
                  <li><strong>Отсутствие сравнений</strong> — столбчатые диаграммы предназначены для сравнения, поэтому важно сравнивать значения между собой.</li>
                  <li><strong>Игнорирование пропорций</strong> — указывайте не только абсолютные значения, но и относительные (в 2 раза больше, на 30% меньше и т.д.).</li>
                  <li><strong>Отсутствие группировки</strong> — при большом количестве категорий группируйте их по схожим значениям или другим логическим критериям.</li>
                  <li><strong>Неправильное использование единиц измерения</strong> — всегда указывайте правильные единицы измерения (проценты, миллионы и т.д.).</li>
                  <li><strong>Интерпретация причин</strong> — не предполагайте причины различий, если это не указано в задании.</li>
                </ul>
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
                  href="/courses/writing-mastery/lessons/lesson-5"
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