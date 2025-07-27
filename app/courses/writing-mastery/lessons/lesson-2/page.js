'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState, useEffect } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson2() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [answer, setAnswer] = useState('');
  const [saved, setSaved] = useState(false);
  const [checkResult, setCheckResult] = useState(null);

  useEffect(() => {
    const a = localStorage.getItem('lesson2_answer_0');
    setAnswer(a || '');
  }, []);

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'writing-mastery';
  const lessonId = 2;
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
    localStorage.setItem('lesson2_answer_0', answer);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const keywords = [
    'line graph', 'illustrates', 'shows', 'displays', 'presents', 'consumption', 'trend', 'increase', 'decrease', 'overall', 'period', 'from', 'to', 'between', 'data', 'information', 'fast food', 'teenagers'
  ];

  const checkAnswer = () => {
    const ans = answer.toLowerCase();
    const found = keywords.some(word => ans.includes(word));
    setCheckResult(found ? 'Вы справились с заданием! Отличная работа!' : 'Попробуйте переформулировать или используйте ключевые слова из урока.');
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
    setCheckResult(null); // Сброс фидбека при изменении ответа
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <WritingMasterySidebar activeLessonId={2} />

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
              <span className="text-4xl mr-4">🎥</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Урок 2: Task 1: Описание графиков</h1>
                <p className="text-gray-600">Основы описания данных • 25 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Основы описания графиков в IELTS Writing Task 1</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                В Task 1 академического модуля IELTS вам необходимо описать и проанализировать визуальную информацию, представленную в виде графика, диаграммы, таблицы или карты. Ваша задача — объективно описать основные тенденции, сравнить данные и выделить ключевые особенности без высказывания собственного мнения.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Типы визуальной информации</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Линейные графики (Line Graphs)</h4>
                  <p className="text-blue-800">Показывают изменения данных с течением времени. Используются для отображения тенденций, колебаний и прогнозов.</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Столбчатые диаграммы (Bar Charts)</h4>
                  <p className="text-green-800">Сравнивают количественные данные между различными категориями. Могут быть простыми, составными или сгруппированными.</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Круговые диаграммы (Pie Charts)</h4>
                  <p className="text-yellow-800">Показывают пропорции или проценты от целого. Используются для сравнения долей в общей сумме.</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Таблицы и процессы</h4>
                  <p className="text-purple-800">Таблицы содержат числовые данные, а диаграммы процессов показывают последовательность действий или этапов.</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Структура ответа Task 1</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Введение (1 абзац)</h4>
                  <p className="text-gray-700">Перефразируйте задание, укажите тип визуальной информации и опишите, что она показывает. Не копируйте задание дословно.</p>
                  <div className="mt-2 p-3 bg-blue-50 rounded text-blue-800 text-sm">
                    <strong>Пример:</strong> <em>"The line graph illustrates the consumption of three different types of fast food in grams per week by Australian teenagers from 1975 to 2000."</em>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Обзор (1 абзац)</h4>
                  <p className="text-gray-700">Опишите 2-3 основные тенденции или наиболее заметные особенности данных. Это общий взгляд на информацию без деталей.</p>
                  <div className="mt-2 p-3 bg-blue-50 rounded text-blue-800 text-sm">
                    <strong>Пример:</strong> <em>"Overall, the consumption of pizza and hamburgers showed an upward trend over the period, while the amount of fish and chips eaten decreased. Pizza became the most popular fast food by the end of the period."</em>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Детальное описание (2-3 абзаца)</h4>
                  <p className="text-gray-700">Подробно опишите данные, разделив их на логические группы. Используйте цифры для подтверждения своих наблюдений. Сравнивайте и противопоставляйте данные.</p>
                  <div className="mt-2 p-3 bg-blue-50 rounded text-blue-800 text-sm">
                    <strong>Пример:</strong> <em>"In 1975, fish and chips were the most popular fast food, with consumption at around 100 grams per person per week. This was followed by hamburgers at approximately 60 grams, while pizza consumption was minimal at just 10 grams."</em>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Заключение (опционально)</h4>
                  <p className="text-gray-700">Для Task 1 заключение обычно не требуется, так как вы уже представили обзор в начале. Однако можно добавить краткое заключение, если осталось место и время.</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ключевая лексика для описания графиков</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Описание тенденций:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div className="p-2 bg-blue-50 rounded"><strong>Рост:</strong> increase, rise, grow, climb, surge</div>
                  <div className="p-2 bg-red-50 rounded"><strong>Падение:</strong> decrease, decline, fall, drop, plummet</div>
                  <div className="p-2 bg-green-50 rounded"><strong>Стабильность:</strong> remain stable, level off, plateau</div>
                  <div className="p-2 bg-yellow-50 rounded"><strong>Колебания:</strong> fluctuate, vary, oscillate</div>
                  <div className="p-2 bg-purple-50 rounded"><strong>Пик/Дно:</strong> peak, reach a high/low, bottom out</div>
                  <div className="p-2 bg-orange-50 rounded"><strong>Восстановление:</strong> recover, rebound, bounce back</div>
                </div>
                
                <h4 className="font-semibold text-gray-900 mt-4 mb-3">Описание скорости изменений:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div className="p-2 bg-blue-50 rounded"><strong>Быстро:</strong> rapidly, sharply, dramatically</div>
                  <div className="p-2 bg-green-50 rounded"><strong>Умеренно:</strong> gradually, steadily, moderately</div>
                  <div className="p-2 bg-yellow-50 rounded"><strong>Незначительно:</strong> slightly, marginally, minimally</div>
                  <div className="p-2 bg-purple-50 rounded"><strong>Внезапно:</strong> suddenly, abruptly, precipitously</div>
                  <div className="p-2 bg-red-50 rounded"><strong>Значительно:</strong> significantly, substantially, considerably</div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Полезные советы</h3>
              
              <div className="bg-yellow-50 p-6 rounded-lg">
                <ul className="list-disc pl-6 text-yellow-800 space-y-2">
                  <li><strong>Используйте разнообразную лексику</strong> — избегайте повторения одних и тех же слов для описания тенденций.</li>
                  <li><strong>Группируйте данные логически</strong> — не описывайте каждую точку данных по отдельности.</li>
                  <li><strong>Будьте точны с цифрами</strong> — используйте приблизительные значения, если точные цифры не указаны (около 50%, примерно 200 единиц).</li>
                  <li><strong>Используйте сравнения</strong> — сравнивайте разные периоды времени или категории данных.</li>
                  <li><strong>Не интерпретируйте причины</strong> — описывайте только то, что видите, без предположений о причинах изменений.</li>
                  <li><strong>Соблюдайте минимальный объем</strong> — пишите не менее 150 слов, но не более 200-220 слов.</li>
                  <li><strong>Распределяйте время</strong> — уделите Task 1 не более 20 минут, включая планирование и проверку.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Практическое задание */}
          <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Практическое задание</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Задание:</h4>
                <p className="text-gray-700 mb-4">Напишите введение для описания линейного графика:</p>
                <p className="text-gray-700 font-medium mb-4"><em>"The graph below shows the consumption of fast food by teenagers in Australia from 1975 to 2000."</em></p>
                
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <p className="text-gray-500 italic mb-2">Подсказка:</p>
                  <p className="text-gray-700 text-sm"><em>Используйте слова: illustrates, shows, displays, presents, consumption, fast food, teenagers, Australia, period, from, to.</em></p>
                </div>
              </div>
              
              <div className="mt-6">
                <textarea
                  className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  rows={4}
                  value={answer}
                  onChange={handleAnswerChange}
                  placeholder="Напишите введение для описания графика..."
                />
                <div className="flex items-center mb-2">
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-all text-sm"
                  >
                    Сохранить
                  </button>
                  {saved && <span className="ml-2 text-green-600 text-sm">Сохранено!</span>}
                  <button
                    onClick={checkAnswer}
                    className="ml-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-all text-xs"
                  >
                    Проверить
                  </button>
                </div>
                {checkResult && (
                  <div className={checkResult.includes('справились') ? 'mt-1 text-green-600' : 'mt-1 text-red-600'}>{checkResult}</div>
                )}
                {answer && (
                  <div className="mt-2"><span className="font-medium">Ваш ответ:</span> {answer}</div>
                )}
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
                  href="/courses/writing-mastery/lessons/lesson-3"
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