'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState, useEffect } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson6() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [answer, setAnswer] = useState('');
  const [saved, setSaved] = useState(false);
  const [checkResult, setCheckResult] = useState(null);

  useEffect(() => {
    const a = localStorage.getItem('lesson6_answer_0');
    setAnswer(a || '');
  }, []);

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'writing-mastery';
  const lessonId = 6;
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
    localStorage.setItem('lesson6_answer_0', answer);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const keywords = [
    'table', 'illustrates', 'shows', 'water consumption', 'liters', 'person', 'daily', 'countries', 'australia', 'brazil', 'canada', 'percentage', 'change', 'decreased', 'increased', 'highest', 'lowest', 'overall'
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
      <WritingMasterySidebar activeLessonId={6} />

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
                <h1 className="text-3xl font-bold text-gray-900">Урок 6: Таблицы и карты</h1>
                <p className="text-gray-600">Работа со сложными данными • 32 минуты</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Описание таблиц и карт в IELTS Writing Task 1</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                В этом уроке мы рассмотрим, как эффективно описывать таблицы и карты в Task 1 академического модуля IELTS. Эти типы визуальной информации могут показаться сложнее линейных, столбчатых или круговых диаграмм, но с правильным подходом вы сможете успешно справиться с ними.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Работа с таблицами</h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Таблицы часто содержат большое количество числовых данных, и ваша задача — выделить ключевую информацию, а не описывать каждое число.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-900 mb-3">Стратегия описания таблиц:</h4>
                <ol className="list-decimal pl-6 text-blue-800 space-y-2">
                  <li><strong>Определите общую тему таблицы</strong> — о чем эти данные в целом?</li>
                  <li><strong>Выделите наиболее значимые данные</strong> — самые высокие/низкие значения, значительные различия или сходства.</li>
                  <li><strong>Группируйте данные логически</strong> — по категориям, временным периодам или другим параметрам.</li>
                  <li><strong>Используйте сравнения</strong> — сравнивайте значения между строками и столбцами.</li>
                  <li><strong>Выделяйте тенденции</strong> — если таблица показывает изменения с течением времени.</li>
                </ol>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Пример описания таблицы:</h4>
                <div className="mb-4 p-4 bg-white border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">Таблица: Потребление воды в литрах на человека в день в трех странах в 2000 и 2020 годах</p>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border">Страна</th>
                        <th className="p-2 border">2000</th>
                        <th className="p-2 border">2020</th>
                        <th className="p-2 border">Изменение (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border">Австралия</td>
                        <td className="p-2 border">340</td>
                        <td className="p-2 border">280</td>
                        <td className="p-2 border">-17.6%</td>
                      </tr>
                      <tr>
                        <td className="p-2 border">Бразилия</td>
                        <td className="p-2 border">190</td>
                        <td className="p-2 border">210</td>
                        <td className="p-2 border">+10.5%</td>
                      </tr>
                      <tr>
                        <td className="p-2 border">Канада</td>
                        <td className="p-2 border">300</td>
                        <td className="p-2 border">250</td>
                        <td className="p-2 border">-16.7%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 bg-blue-50 rounded text-blue-800 text-sm">
                  <p className="font-semibold mb-2">Образец ответа:</p>
                  <p className="mb-2"><em>"The table illustrates the daily water consumption per person in three countries, Australia, Brazil, and Canada, in 2000 and 2020, as well as the percentage change over this period."</em></p>
                  <p className="mb-2"><em>"Overall, water usage decreased significantly in Australia and Canada, while it increased in Brazil. Australia had the highest consumption in both years, despite showing the largest percentage decrease."</em></p>
                  <p className="mb-2"><em>"In 2000, Australians consumed the most water at 340 liters per person daily, followed by Canadians at 300 liters, while Brazilians used considerably less at 190 liters. By 2020, consumption in Australia had fallen by 17.6% to 280 liters, and Canada experienced a similar trend with a 16.7% reduction to 250 liters per day. In contrast, Brazil's water usage increased by 10.5% to 210 liters per person daily."</em></p>
                  <p><em>"Despite these changes, Australia remained the country with the highest water consumption, although the gap between Australia and Canada narrowed from 40 liters in 2000 to 30 liters in 2020. Brazil, despite its increase, still had the lowest consumption among the three countries in 2020."</em></p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Работа с картами</h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Карты обычно показывают географические изменения или планы местности до и после изменений. Они требуют особого подхода к описанию.
              </p>

              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-green-900 mb-3">Стратегия описания карт:</h4>
                <ol className="list-decimal pl-6 text-green-800 space-y-2">
                  <li><strong>Определите тип карты</strong> — показывает ли она изменения с течением времени или сравнивает разные места?</li>
                  <li><strong>Опишите общий вид</strong> — что изображено на карте в целом?</li>
                  <li><strong>Выделите ключевые объекты</strong> — основные здания, природные объекты, дороги и т.д.</li>
                  <li><strong>Опишите изменения</strong> — если есть две карты (до и после), сосредоточьтесь на основных изменениях.</li>
                  <li><strong>Используйте пространственные предлоги</strong> — north of, to the south, adjacent to, opposite, between и т.д.</li>
                </ol>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Полезные выражения для описания карт:</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-green-50 rounded">
                    <strong>Расположение:</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-green-800">
                      <li>is located in the north/south/east/west</li>
                      <li>is situated between X and Y</li>
                      <li>lies to the north/south of X</li>
                      <li>can be found adjacent to X</li>
                      <li>is positioned on the outskirts/in the center</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-blue-50 rounded">
                    <strong>Изменения:</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-blue-800">
                      <li>was replaced by/with X</li>
                      <li>was converted into X</li>
                      <li>was demolished/constructed</li>
                      <li>was expanded/reduced in size</li>
                      <li>remained unchanged/was preserved</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded">
                    <strong>Соединения:</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-yellow-800">
                      <li>is connected to X by a road/bridge</li>
                      <li>is accessible via X</li>
                      <li>links X with Y</li>
                      <li>provides access to X</li>
                      <li>runs through/around/between X and Y</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-purple-50 rounded">
                    <strong>Описание территории:</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-purple-800">
                      <li>is surrounded by X</li>
                      <li>is bordered by X to the north/south</li>
                      <li>covers an area of X</li>
                      <li>occupies the majority/a small part of X</li>
                      <li>dominates the landscape/skyline</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Пример описания карты:</h4>
                <div className="p-4 bg-blue-50 rounded text-blue-800 text-sm">
                  <p className="font-semibold mb-2">Образец ответа (для карты, показывающей изменения в деревне):</p>
                  <p className="mb-2"><em>"The maps illustrate the transformation of a small village called Meadowfield over a 25-year period from 1990 to 2015."</em></p>
                  <p className="mb-2"><em>"Overall, the village underwent significant development, with the construction of new residential areas, commercial facilities, and improved transportation infrastructure, transforming it from a rural settlement into a more urbanized community."</em></p>
                  <p className="mb-2"><em>"In 1990, Meadowfield was a small rural village with a main road running from north to south. The village center consisted of a few houses clustered around a post office and a primary school located in the northeast. Farmland dominated the western and southern parts of the village, while a river flowed along the eastern edge with a bridge connecting to more farmland."</em></p>
                  <p><em>"By 2015, the village had expanded considerably. The farmland to the west was replaced by a large housing estate, while the southern farmland was converted into a shopping center with an adjacent parking lot. A new road was constructed, forming a ring around the village and connecting to the original main road at both ends. The primary school was expanded, and a new secondary school was built to the southeast. The river area was developed into a recreational park, and the bridge was widened to accommodate increased traffic."</em></p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Комбинированные задания</h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Иногда в Task 1 могут встречаться комбинированные задания, например, таблица и график вместе или карта с дополнительными данными.
              </p>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-3">Советы для комбинированных заданий:</h4>
                <ul className="list-disc pl-6 text-yellow-800 space-y-2">
                  <li><strong>Определите связь между разными элементами</strong> — как они дополняют друг друга?</li>
                  <li><strong>Объедините данные в логические группы</strong> — не описывайте каждый элемент отдельно.</li>
                  <li><strong>Выделите ключевую информацию</strong> — сосредоточьтесь на наиболее важных аспектах.</li>
                  <li><strong>Используйте сравнения</strong> — сравнивайте данные из разных источников.</li>
                  <li><strong>Соблюдайте баланс</strong> — уделите достаточно внимания каждому элементу, но не перегружайте описание деталями.</li>
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
                <p className="text-gray-700 mb-4">Изучите таблицу ниже и напишите отчет, описывающий основную информацию и делающий соответствующие сравнения.</p>
                
                <div className="mb-4 p-4 bg-white border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">Таблица: Процент населения, проживающего в городских районах в пяти странах, 1950-2050 (прогноз)</p>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border">Страна</th>
                        <th className="p-2 border">1950</th>
                        <th className="p-2 border">2000</th>
                        <th className="p-2 border">2050 (прогноз)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border">Индия</td>
                        <td className="p-2 border">17%</td>
                        <td className="p-2 border">28%</td>
                        <td className="p-2 border">50%</td>
                      </tr>
                      <tr>
                        <td className="p-2 border">Китай</td>
                        <td className="p-2 border">12%</td>
                        <td className="p-2 border">36%</td>
                        <td className="p-2 border">73%</td>
                      </tr>
                      <tr>
                        <td className="p-2 border">Бразилия</td>
                        <td className="p-2 border">36%</td>
                        <td className="p-2 border">81%</td>
                        <td className="p-2 border">93%</td>
                      </tr>
                      <tr>
                        <td className="p-2 border">Нигерия</td>
                        <td className="p-2 border">8%</td>
                        <td className="p-2 border">42%</td>
                        <td className="p-2 border">67%</td>
                      </tr>
                      <tr>
                        <td className="p-2 border">США</td>
                        <td className="p-2 border">64%</td>
                        <td className="p-2 border">79%</td>
                        <td className="p-2 border">87%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <p className="text-gray-700">Напишите не менее 150 слов.</p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-900 mb-3">Советы:</h4>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li>Начните с общего описания того, что показывает таблица.</li>
                  <li>Выделите основные тенденции и наиболее заметные особенности данных.</li>
                  <li>Сгруппируйте страны по схожим показателям или тенденциям.</li>
                  <li>Сравните начальные и конечные значения, а также темпы изменений.</li>
                  <li>Используйте разнообразную лексику для описания процентных изменений.</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <textarea
                  className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  rows={8}
                  value={answer}
                  onChange={handleAnswerChange}
                  placeholder="Напишите отчет, описывающий данные из таблицы..."
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
                  href="/courses/writing-mastery/lessons/lesson-7"
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
