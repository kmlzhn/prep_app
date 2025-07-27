'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState, useEffect } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson3() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [answer, setAnswer] = useState('');
  const [saved, setSaved] = useState(false);
  const [checkResult, setCheckResult] = useState(null);

  useEffect(() => {
    const a = localStorage.getItem('lesson3_answer_0');
    setAnswer(a || '');
  }, []);

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'writing-mastery';
  const lessonId = 3;
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
    localStorage.setItem('lesson3_answer_0', answer);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const keywords = [
    'overall', 'trend', 'upward', 'downward', 'increase', 'decrease', 'coffee', 'tea', 'consumption', 'cups', 'person', 'day', 'period', 'shift', 'preferences', 'beverage', 'uk', 'steady', 'gradually', 'notably', 'reversed'
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
      <WritingMasterySidebar activeLessonId={3} />

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
                <h1 className="text-3xl font-bold text-gray-900">Урок 3: Линейные графики</h1>
                <p className="text-gray-600">Описание трендов и изменений • 30 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Описание линейных графиков в IELTS Writing Task 1</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Линейные графики (line graphs) — один из наиболее распространенных типов визуальной информации в IELTS Writing Task 1. Они показывают изменения данных с течением времени и позволяют легко выявить тенденции, колебания и сравнить несколько показателей. В этом уроке мы рассмотрим, как эффективно описывать линейные графики для получения высокого балла.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Особенности линейных графиков</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li><strong>Временная шкала</strong> — обычно на оси X (горизонтальной) отображается время (годы, месяцы, дни).</li>
                  <li><strong>Значения</strong> — на оси Y (вертикальной) отображаются числовые значения (проценты, количество, деньги и т.д.).</li>
                  <li><strong>Одна или несколько линий</strong> — график может показывать одну линию или несколько для сравнения разных показателей.</li>
                  <li><strong>Точки данных</strong> — отмечены на графике и соединены линиями для отображения тенденций.</li>
                  <li><strong>Легенда</strong> — объясняет, что представляет каждая линия, если их несколько.</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ключевые аспекты для описания</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Общие тенденции</h4>
                  <p className="text-gray-700">Определите основные тренды для каждой линии: рост, падение, стабильность, колебания. Это должно быть включено в ваш обзорный абзац.</p>
                  <div className="mt-2 p-3 bg-blue-50 rounded text-blue-800 text-sm">
                    <strong>Пример:</strong> <em>"Overall, the number of international students in Australia showed a steady upward trend between 2005 and 2020, while the number in Canada fluctuated but ultimately increased by the end of the period."</em>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Начальные и конечные значения</h4>
                  <p className="text-gray-700">Сравните значения в начале и конце периода для каждой линии. Это помогает показать общие изменения за весь период.</p>
                  <div className="mt-2 p-3 bg-blue-50 rounded text-blue-800 text-sm">
                    <strong>Пример:</strong> <em>"In 2005, approximately 200,000 international students were studying in Australia, and this figure more than doubled to reach 450,000 by 2020."</em>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">3. Пики и спады</h4>
                  <p className="text-gray-700">Отметьте самые высокие и самые низкие точки на графике, а также когда они произошли.</p>
                  <div className="mt-2 p-3 bg-blue-50 rounded text-blue-800 text-sm">
                    <strong>Пример:</strong> <em>"The number of tourists visiting Thailand peaked in 2019 at approximately 40 million, before plummeting to its lowest point of just 5 million in 2020."</em>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">4. Значительные изменения</h4>
                  <p className="text-gray-700">Опишите резкие изменения, необычные колебания или периоды стабильности.</p>
                  <div className="mt-2 p-3 bg-blue-50 rounded text-blue-800 text-sm">
                    <strong>Пример:</strong> <em>"Between 2008 and 2009, there was a dramatic decline of 30% in house prices, which coincided with the global financial crisis."</em>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">5. Сравнения между линиями</h4>
                  <p className="text-gray-700">Если на графике несколько линий, сравните их тенденции, точки пересечения и различия.</p>
                  <div className="mt-2 p-3 bg-blue-50 rounded text-blue-800 text-sm">
                    <strong>Пример:</strong> <em>"While smartphone sales continued to rise steadily, tablet sales began to decline after 2015, creating a widening gap between the two products."</em>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Полезные фразы для описания линейных графиков</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Описание тенденций во времени:</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                      <li>From 2010 to 2015, the figures rose steadily.</li>
                      <li>Between January and June, sales declined gradually.</li>
                      <li>During the first quarter, prices remained stable.</li>
                      <li>Throughout the period, the trend was generally upward.</li>
                      <li>In the final year, there was a sudden increase.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Описание точек и значений:</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                      <li>The figure stood at 65% in 2018.</li>
                      <li>The number reached its peak at 500 units in May.</li>
                      <li>The lowest point was recorded in December at just 120.</li>
                      <li>By the end of the period, the rate had climbed to 3.5%.</li>
                      <li>The value fluctuated between 200 and 250 throughout the year.</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Сравнение линий:</h4>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                    <li>While X increased, Y decreased at a similar rate.</li>
                    <li>The two lines intersected in 2012, after which A exceeded B.</li>
                    <li>The gap between urban and rural areas widened significantly after 2015.</li>
                    <li>In contrast to men's participation, women's participation showed a consistent upward trend.</li>
                    <li>Both categories followed a similar pattern until 2018, when they began to diverge.</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Практическое задание</h3>
              
              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <p className="text-green-800 mb-4">
                  <strong>Описание задания:</strong> Представьте, что вам дан линейный график, показывающий потребление кофе и чая (в чашках в день на человека) в Великобритании с 2000 по 2020 год. Кофе: начало — 1.5 чашки, конец — 2.8 чашки, с постоянным ростом. Чай: начало — 3.2 чашки, конец — 2.5 чашки, с постепенным снижением.
                </p>
                <p className="text-green-800 mb-2">
                  <strong>Задание:</strong> Напишите обзорный абзац (overview) для этого графика.
                </p>
                <div className="bg-white p-4 rounded border border-green-200 text-gray-700">
                  <p>
                    <em>Overall, there was a clear shift in beverage preferences in the UK over the 20-year period. While coffee consumption showed a steady upward trend, increasing from 1.5 cups per person per day in 2000 to 2.8 cups in 2020, tea consumption moved in the opposite direction, gradually declining from 3.2 cups to 2.5 cups over the same period. Notably, while tea was significantly more popular than coffee at the beginning of the period, this situation had reversed by 2020, with coffee becoming the more consumed beverage.</em>
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <textarea
                  className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  rows={6}
                  value={answer}
                  onChange={handleAnswerChange}
                  placeholder="Напишите обзорный абзац для графика потребления кофе и чая..."
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

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Распространенные ошибки при описании линейных графиков</h3>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <ul className="list-disc pl-6 text-red-800 space-y-2">
                  <li><strong>Описание каждой точки данных</strong> — вместо этого группируйте данные и описывайте общие тенденции.</li>
                  <li><strong>Игнорирование обзора</strong> — всегда включайте абзац с общим обзором основных тенденций.</li>
                  <li><strong>Повторение одних и тех же слов</strong> — используйте разнообразную лексику для описания изменений.</li>
                  <li><strong>Спекуляции о причинах</strong> — не предполагайте, почему произошли изменения, если это не указано в задании.</li>
                  <li><strong>Неточное указание цифр</strong> — будьте точны при указании значений, используйте приблизительные термины, если необходимо (около, примерно).</li>
                  <li><strong>Игнорирование единиц измерения</strong> — всегда указывайте правильные единицы измерения (проценты, миллионы и т.д.).</li>
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
                  href="/courses/writing-mastery/lessons/lesson-4"
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