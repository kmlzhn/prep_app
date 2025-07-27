'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState, useEffect } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson9() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [answer, setAnswer] = useState('');
  const [saved, setSaved] = useState(false);
  const [checkResult, setCheckResult] = useState(null);

  useEffect(() => {
    const a = localStorage.getItem('lesson9_answer_0');
    setAnswer(a || '');
  }, []);

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'writing-mastery';
  const lessonId = 9;
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
    localStorage.setItem('lesson9_answer_0', answer);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const keywords = [
    'introduction', 'body', 'conclusion', 'paragraph', 'structure', 'essay', 'argument', 'example', 'topic sentence', 'thesis', 'position', 'opinion', 'main point', 'supporting evidence', 'transition', 'coherence'
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
      <WritingMasterySidebar activeLessonId={9} />

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
                <h1 className="text-3xl font-bold text-gray-900">Урок 9: Task 2: Структура эссе</h1>
                <p className="text-gray-600">Основы написания эссе • 30 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Структура эссе в IELTS Writing Task 2</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Task 2 в секции Writing экзамена IELTS требует написания эссе объемом не менее 250 слов в ответ на заданную тему или проблему. Это задание оценивается выше, чем Task 1, и требует хорошо структурированного и аргументированного ответа. Правильная структура эссе является ключевым фактором для получения высокого балла.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Основные компоненты эссе</h3>
              
              <div className="grid md:grid-cols-4 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Введение</h4>
                  <p className="text-blue-800">Представляет тему и обозначает вашу позицию или подход к проблеме.</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Основная часть 1</h4>
                  <p className="text-green-800">Первый ключевой аргумент или аспект проблемы с примерами и пояснениями.</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Основная часть 2</h4>
                  <p className="text-yellow-800">Второй ключевой аргумент или аспект проблемы с примерами и пояснениями.</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Заключение</h4>
                  <p className="text-purple-800">Обобщает основные идеи и подтверждает вашу позицию.</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Детальная структура эссе</h3>
              
              <div className="space-y-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">Введение (1 абзац)</h4>
                  <div className="space-y-3">
                    <p className="text-blue-800">Введение должно содержать 2-3 предложения и выполнять следующие функции:</p>
                    <ul className="list-disc pl-6 text-blue-800 space-y-1">
                      <li><strong>Перефразировать тему</strong> — изложите тему своими словами, не копируя задание дословно.</li>
                      <li><strong>Обозначить свою позицию</strong> — четко укажите свое мнение по вопросу (для эссе-мнения) или обозначьте общий подход к проблеме.</li>
                      <li><strong>Представить структуру эссе</strong> — кратко укажите, что будет рассмотрено в эссе (опционально).</li>
                    </ul>
                    <div className="mt-3 p-3 bg-white rounded text-gray-700 text-sm">
                      <p className="font-medium mb-1">Пример введения:</p>
                      <p><em>"In recent years, there has been a growing debate about whether governments should impose taxes on unhealthy foods to address the obesity crisis. In my opinion, while such taxes could potentially discourage the consumption of harmful products, they should be implemented alongside other comprehensive measures to effectively tackle this complex health issue."</em></p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">Основная часть: Первый аргумент (1-2 абзаца)</h4>
                  <div className="space-y-3">
                    <p className="text-green-800">Первый абзац основной части должен содержать:</p>
                    <ul className="list-disc pl-6 text-green-800 space-y-1">
                      <li><strong>Тематическое предложение</strong> — представьте первый основной аргумент или идею.</li>
                      <li><strong>Объяснение</strong> — развейте свою мысль, объясните, почему этот аргумент важен.</li>
                      <li><strong>Пример</strong> — приведите конкретный пример, подтверждающий вашу точку зрения.</li>
                      <li><strong>Связь с темой</strong> — объясните, как этот аргумент поддерживает вашу общую позицию.</li>
                    </ul>
                    <div className="mt-3 p-3 bg-white rounded text-gray-700 text-sm">
                      <p className="font-medium mb-1">Пример первого абзаца основной части:</p>
                      <p><em>"One of the main advantages of implementing taxes on unhealthy foods is that they can directly discourage consumption through increased prices. When products such as sugary drinks or high-fat snacks become more expensive, consumers are more likely to reconsider their purchases and potentially choose healthier alternatives. For instance, after Mexico introduced a tax on sugar-sweetened beverages in 2014, consumption decreased by 12% within the first year, demonstrating that financial incentives can effectively influence dietary choices."</em></p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-3">Основная часть: Второй аргумент (1-2 абзаца)</h4>
                  <div className="space-y-3">
                    <p className="text-yellow-800">Второй абзац основной части имеет аналогичную структуру:</p>
                    <ul className="list-disc pl-6 text-yellow-800 space-y-1">
                      <li><strong>Тематическое предложение</strong> — представьте второй основной аргумент или идею.</li>
                      <li><strong>Объяснение</strong> — развейте свою мысль, объясните ее значимость.</li>
                      <li><strong>Пример</strong> — приведите конкретный пример для подтверждения.</li>
                      <li><strong>Связь с темой</strong> — соотнесите этот аргумент с вашей общей позицией.</li>
                    </ul>
                    <div className="mt-3 p-3 bg-white rounded text-gray-700 text-sm">
                      <p className="font-medium mb-1">Пример второго абзаца основной части:</p>
                      <p><em>"However, taxes alone are insufficient to address the complex issue of obesity. A more comprehensive approach should include educational programs that inform people about healthy eating habits and the risks associated with poor nutrition. Schools, for example, can integrate nutrition education into their curricula and provide healthier meal options in cafeterias. In Finland, a combination of nutrition education and improved school meals has contributed to better dietary habits among children, showing that education plays a crucial role in promoting healthier lifestyles."</em></p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-3">Заключение (1 абзац)</h4>
                  <div className="space-y-3">
                    <p className="text-purple-800">Заключение должно содержать 2-3 предложения и выполнять следующие функции:</p>
                    <ul className="list-disc pl-6 text-purple-800 space-y-1">
                      <li><strong>Обобщить основные аргументы</strong> — кратко напомните о ключевых моментах, рассмотренных в эссе.</li>
                      <li><strong>Подтвердить свою позицию</strong> — еще раз четко обозначьте свое мнение или подход к проблеме.</li>
                      <li><strong>Предложить решение или прогноз</strong> — можно завершить эссе предложением решения проблемы или прогнозом на будущее (опционально).</li>
                    </ul>
                    <div className="mt-3 p-3 bg-white rounded text-gray-700 text-sm">
                      <p className="font-medium mb-1">Пример заключения:</p>
                      <p><em>"In conclusion, while taxes on unhealthy foods can be an effective tool in discouraging their consumption, they should be part of a broader strategy that includes educational initiatives and increased accessibility to healthy alternatives. Only through such a multifaceted approach can societies effectively address the growing obesity crisis and promote better public health outcomes."</em></p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Распределение слов в эссе</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-gray-700 mb-4">Для эссе объемом 250-280 слов рекомендуется следующее распределение:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-blue-50 rounded text-center">
                    <p className="text-blue-900 font-semibold">Введение</p>
                    <p className="text-blue-800 text-xl font-bold">40-50 слов</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded text-center">
                    <p className="text-green-900 font-semibold">Основная часть 1</p>
                    <p className="text-green-800 text-xl font-bold">80-100 слов</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded text-center">
                    <p className="text-yellow-900 font-semibold">Основная часть 2</p>
                    <p className="text-yellow-800 text-xl font-bold">80-100 слов</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded text-center">
                    <p className="text-purple-900 font-semibold">Заключение</p>
                    <p className="text-purple-800 text-xl font-bold">40-50 слов</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Типичные ошибки в структуре эссе</h3>
              
              <div className="bg-red-50 p-6 rounded-lg mb-6">
                <ul className="list-disc pl-6 text-red-800 space-y-2">
                  <li><strong>Отсутствие четкого введения или заключения</strong> — каждое эссе должно иметь ясное начало и конец.</li>
                  <li><strong>Слишком длинное введение</strong> — введение не должно превышать 20% от общего объема эссе.</li>
                  <li><strong>Отсутствие тематических предложений</strong> — каждый абзац должен начинаться с предложения, ясно выражающего основную идею.</li>
                  <li><strong>Недостаточное развитие аргументов</strong> — каждый аргумент должен быть подкреплен объяснениями и примерами.</li>
                  <li><strong>Отсутствие связи между абзацами</strong> — используйте связующие слова и фразы для обеспечения плавного перехода между абзацами.</li>
                  <li><strong>Представление новых идей в заключении</strong> — заключение должно обобщать уже представленные идеи, а не вводить новые.</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Советы по структурированию эссе</h3>
              
              <div className="bg-yellow-50 p-6 rounded-lg">
                <ul className="list-disc pl-6 text-yellow-800 space-y-2">
                  <li><strong>Планируйте перед написанием</strong> — потратьте 5 минут на составление плана эссе.</li>
                  <li><strong>Используйте четкую структуру абзацев</strong> — каждый абзац должен содержать одну основную идею.</li>
                  <li><strong>Применяйте связующие слова и фразы</strong> — используйте слова-связки для обеспечения логического перехода между предложениями и абзацами.</li>
                  <li><strong>Соблюдайте баланс</strong> — уделяйте примерно одинаковое внимание каждому аргументу.</li>
                  <li><strong>Будьте конкретны</strong> — подкрепляйте общие утверждения конкретными примерами.</li>
                  <li><strong>Проверяйте логическую последовательность</strong> — убедитесь, что ваши аргументы логически следуют друг за другом.</li>
                  <li><strong>Следите за объемом</strong> — стремитесь написать не менее 250 слов, но не более 300-320 слов.</li>
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
                <p className="text-gray-700 mb-4">Опишите основные компоненты структуры эссе IELTS Task 2:</p>
                <p className="text-gray-700 font-medium mb-4"><em>"Объясните, как должна быть структурирована основная часть эссе и какие элементы должны содержаться в каждом абзаце."</em></p>
                
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <p className="text-gray-500 italic mb-2">Подсказка:</p>
                  <p className="text-gray-700 text-sm"><em>Используйте термины: introduction, body paragraph, conclusion, topic sentence, argument, example, explanation, thesis statement, supporting evidence, transition.</em></p>
                </div>
              </div>
              
              <div className="mt-6">
                <textarea
                  className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  rows={6}
                  value={answer}
                  onChange={handleAnswerChange}
                  placeholder="Опишите структуру эссе IELTS Task 2..."
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
                  href="/courses/writing-mastery/lessons/lesson-10"
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
