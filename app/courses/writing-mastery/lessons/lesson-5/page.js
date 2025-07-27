'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson5() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItems, setDroppedItems] = useState({});
  const [showResult, setShowResult] = useState(false);

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'writing-mastery';
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

  const phrases = [
    { id: 1, text: "accounts for just over a quarter of" },
    { id: 2, text: "represents the largest proportion at" },
    { id: 3, text: "makes up approximately one-fifth of" },
    { id: 4, text: "constitutes a small fraction of" },
    { id: 5, text: "comprises nearly half of" }
  ];

  const dropTargets = [
    { id: "drop1", label: "Entertainment (45%)", correct: 5 },
    { id: "drop2", label: "Food (25%)", correct: 1 },
    { id: "drop3", label: "Transport (20%)", correct: 3 },
    { id: "drop4", label: "Other (10%)", correct: 4 }
  ];

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (draggedItem) {
      setDroppedItems({
        ...droppedItems,
        [targetId]: draggedItem
      });
    }
  };

  const checkAnswers = () => {
    setShowResult(true);
  };

  const isCorrect = (targetId) => {
    const target = dropTargets.find(t => t.id === targetId);
    return droppedItems[targetId]?.id === target.correct;
  };

  const allCorrect = () => {
    return dropTargets.every(target => 
      droppedItems[target.id]?.id === target.correct
    );
  };

  const resetExercise = () => {
    setDroppedItems({});
    setShowResult(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <WritingMasterySidebar activeLessonId={5} />

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
                <h1 className="text-3xl font-bold text-gray-900">Урок 5: Круговые диаграммы</h1>
                <p className="text-gray-600">Описание пропорций и долей • 25 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Описание круговых диаграмм в IELTS Writing Task 1</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Круговые диаграммы (pie charts) — важный тип визуальной информации в IELTS Writing Task 1. Они показывают пропорции или проценты от целого и используются для сравнения долей в общей сумме. В этом уроке мы рассмотрим, как эффективно описывать круговые диаграммы для получения высокого балла.
              </p>

              {/* Визуализация круговой диаграммы */}
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Пример круговой диаграммы</h3>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="mb-2 text-center font-medium text-gray-700">
                    Распределение расходов студентов (в процентах)
                  </div>
                  <div className="flex justify-center mb-4">
                    <div className="relative w-64 h-64">
                      {/* Круговая диаграмма с использованием CSS conic-gradient */}
                      <div 
                        className="w-full h-full rounded-full"
                        style={{
                          background: "conic-gradient(#4f46e5 0% 45%, #60a5fa 45% 70%, #34d399 70% 90%, #a3e635 90% 100%)"
                        }}
                      ></div>
                      {/* Белый круг в центре для создания эффекта пончика */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 bg-indigo-600 rounded-sm mr-2"></div>
                      <span className="text-sm">Развлечения: 45%</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 bg-blue-400 rounded-sm mr-2"></div>
                      <span className="text-sm">Питание: 25%</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 bg-emerald-400 rounded-sm mr-2"></div>
                      <span className="text-sm">Транспорт: 20%</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 bg-lime-400 rounded-sm mr-2"></div>
                      <span className="text-sm">Прочее: 10%</span>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Особенности круговых диаграмм</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li><strong>Показывают части целого</strong> — все сегменты вместе составляют 100%.</li>
                  <li><strong>Фокус на пропорциях</strong> — основное внимание уделяется относительным размерам сегментов.</li>
                  <li><strong>Ограниченное количество категорий</strong> — обычно не более 5-7 сегментов для удобства восприятия.</li>
                  <li><strong>Могут быть представлены в парах</strong> — для сравнения распределений в разные периоды времени или в разных группах.</li>
                  <li><strong>Часто используются с процентами</strong> — каждый сегмент обычно имеет числовое значение в процентах.</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Структура описания круговой диаграммы</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Введение</h4>
                  <p className="text-gray-700">Перефразируйте задание, укажите тип диаграммы и опишите, какие данные она показывает.</p>
                  <div className="mt-2 p-3 bg-blue-50 rounded text-blue-800 text-sm">
                    <strong>Пример:</strong> <em>"The pie chart illustrates how students allocate their monthly expenditure across different categories, expressed as percentages of their total spending."</em>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Обзор</h4>
                  <p className="text-gray-700">Опишите 2-3 основные особенности данных: самые большие/маленькие сегменты или значимые группировки.</p>
                  <div className="mt-2 p-3 bg-blue-50 rounded text-blue-800 text-sm">
                    <strong>Пример:</strong> <em>"Overall, entertainment represents the largest expense category, accounting for nearly half of students' spending, while essential costs like food and transport together make up less than half of the total budget."</em>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">3. Детальное описание: основные сегменты</h4>
                  <p className="text-gray-700">Опишите наиболее крупные сегменты, используя точные проценты и сравнения между ними.</p>
                  <div className="mt-2 p-3 bg-blue-50 rounded text-blue-800 text-sm">
                    <strong>Пример:</strong> <em>"Entertainment constitutes the largest expenditure at 45% of students' total spending, which is almost double the proportion allocated to food (25%). This suggests that students prioritize leisure activities over other categories."</em>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">4. Детальное описание: второстепенные сегменты</h4>
                  <p className="text-gray-700">Опишите менее крупные сегменты, группируя их при необходимости.</p>
                  <div className="mt-2 p-3 bg-blue-50 rounded text-blue-800 text-sm">
                    <strong>Пример:</strong> <em>"Transport accounts for one-fifth (20%) of students' expenses, while the remaining 10% is spent on miscellaneous items. These smaller categories together represent 30% of the total budget, which is still less than the amount spent on entertainment alone."</em>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Описание нескольких круговых диаграмм</h3>
              
              <div className="bg-purple-50 p-6 rounded-lg mb-6">
                <p className="text-purple-800 mb-4">
                  Если в задании представлены две или более круговые диаграммы (например, для разных лет или групп), следуйте этим рекомендациям:
                </p>
                <ul className="list-disc pl-6 text-purple-800 space-y-2">
                  <li><strong>Сравнивайте соответствующие сегменты</strong> — отметьте, как изменилась доля каждой категории.</li>
                  <li><strong>Выделите наиболее значительные изменения</strong> — категории, которые существенно выросли или уменьшились.</li>
                  <li><strong>Отметьте новые или исчезнувшие категории</strong> — если какие-то сегменты появились или исчезли.</li>
                  <li><strong>Определите общие тенденции</strong> — например, смещение от одного типа расходов к другому.</li>
                  <li><strong>Используйте сравнительные конструкции</strong> — "в отличие от", "по сравнению с", "в то время как" и т.д.</li>
                </ul>
                <div className="mt-4 p-3 bg-white rounded text-purple-900 text-sm border border-purple-200">
                  <strong>Пример:</strong> <em>"Comparing the expenditure patterns between 2010 and 2020, it is evident that the proportion spent on entertainment has increased significantly from 30% to 45%, while the percentage allocated to food has decreased from 35% to 25%. This shift suggests a change in students' priorities over the decade, with more emphasis now placed on leisure activities."</em>
                </div>
              </div>

              {/* Интерактивное упражнение с перетаскиванием */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Интерактивное упражнение</h3>
              
              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-yellow-900 mb-3">Соедините фразы с соответствующими сегментами круговой диаграммы</h4>
                <p className="text-yellow-800 mb-4">
                  Перетащите подходящие фразы к каждой категории расходов из примера выше:
                </p>
                
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {phrases.filter(phrase => !Object.values(droppedItems).some(item => item.id === phrase.id)).map(phrase => (
                      <div
                        key={phrase.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, phrase)}
                        className="bg-white p-2 rounded border border-yellow-300 cursor-move shadow-sm hover:shadow-md transition-shadow"
                      >
                        {phrase.text}
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    {dropTargets.map(target => (
                      <div 
                        key={target.id}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, target.id)}
                        className={`p-3 rounded-lg border-2 ${
                          showResult 
                            ? isCorrect(target.id)
                              ? 'border-green-400 bg-green-50'
                              : 'border-red-400 bg-red-50'
                            : 'border-dashed border-gray-300 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-sm mr-2" style={{
                            backgroundColor: target.id === 'drop1' ? '#60a5fa' : 
                                           target.id === 'drop2' ? '#4f46e5' :
                                           target.id === 'drop3' ? '#34d399' : '#a3e635'
                          }}></div>
                          <span className="font-medium mr-2">{target.label}</span>
                          {droppedItems[target.id] && (
                            <span className="bg-white px-2 py-1 rounded ml-2 flex-1">
                              {droppedItems[target.id].text}
                            </span>
                          )}
                          {!droppedItems[target.id] && (
                            <span className="text-gray-400 italic">Перетащите фразу сюда</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  {Object.keys(droppedItems).length > 0 && !showResult && (
                    <button 
                      onClick={checkAnswers}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      Проверить ответы
                    </button>
                  )}
                  
                  {showResult && (
                    <>
                      {allCorrect() ? (
                        <div className="text-green-700 font-medium">
                          Отлично! Все ответы правильные! 🎉
                        </div>
                      ) : (
                        <div className="text-red-700 font-medium">
                          Есть ошибки. Попробуйте еще раз!
                        </div>
                      )}
                      <button 
                        onClick={resetExercise}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Сбросить и попробовать снова
                      </button>
                    </>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Полезные фразы для описания круговых диаграмм</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Описание пропорций:</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                      <li>X accounts for/makes up/constitutes 25% of the total</li>
                      <li>X represents a quarter/third/half of the whole</li>
                      <li>X comprises just over/under 30% of all cases</li>
                      <li>The proportion/percentage/share of X is 40%</li>
                      <li>X takes up/occupies the largest/smallest segment</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Сравнение сегментов:</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                      <li>X is twice/three times the size of Y</li>
                      <li>X is double/triple the proportion of Y</li>
                      <li>X and Y together account for half/two-thirds of the total</li>
                      <li>X is marginally/significantly larger/smaller than Y</li>
                      <li>The combined share of X, Y and Z is 70%</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Описание изменений (для нескольких диаграмм):</h4>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                    <li>The proportion of X increased/decreased from 20% to 35%</li>
                    <li>X saw a rise/fall/growth/decline in its share from 15% to 25%</li>
                    <li>The percentage of X remained stable/constant at around 30%</li>
                    <li>X's share expanded/contracted by 10 percentage points</li>
                    <li>The distribution shifted from X to Y over the period</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Распространенные ошибки при описании круговых диаграмм</h3>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <ul className="list-disc pl-6 text-red-800 space-y-2">
                  <li><strong>Неправильное использование терминологии</strong> — используйте термины "segment", "proportion", "percentage", "share", а не "piece", "part" или "slice".</li>
                  <li><strong>Игнорирование соотношений</strong> — важно не только указать проценты, но и сравнить их между собой.</li>
                  <li><strong>Отсутствие группировки</strong> — при большом количестве сегментов группируйте их логически (например, "наибольшие три категории составляют 75%").</li>
                  <li><strong>Повторение одних и тех же фраз</strong> — используйте разнообразную лексику для описания пропорций.</li>
                  <li><strong>Отсутствие математической точности</strong> — убедитесь, что ваши сравнения математически корректны (например, 25% — это четверть, а не треть).</li>
                  <li><strong>Игнорирование "других" категорий</strong> — не забывайте упомянуть категорию "другое" или "прочее", если она присутствует.</li>
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
                  href="/courses/writing-mastery/lessons/lesson-6"
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