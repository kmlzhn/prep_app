'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState, useEffect } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson13() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [answer, setAnswer] = useState('');
  const [saved, setSaved] = useState(false);
  const [checkResult, setCheckResult] = useState(null);

  useEffect(() => {
    const a = localStorage.getItem('lesson13_answer_0');
    setAnswer(a || '');
  }, []);

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'writing-mastery';
  const lessonId = 13;
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
    localStorage.setItem('lesson13_answer_0', answer);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const keywords = [
    'cohesive devices', 'logical connectors', 'for instance', 'however', 'as a result', 'nevertheless', 'in conclusion', 'especially', 'connectors', 'structure', 'synonyms', 'logical', 'coherence', 'cohesion'
  ];

  const checkAnswer = () => {
    const ans = answer.toLowerCase();
    const found = keywords.some(word => ans.includes(word));
    setCheckResult(found ? 'Вы справились с заданием! Отличная работа!' : 'Попробуйте переформулировать или используйте ключевые слова из задания.');
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
    setCheckResult(null); // Сброс фидбека при изменении ответа
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <WritingMasterySidebar activeLessonId={13} />

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
              <span className="text-4xl mr-4">💡</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Урок 13: Логические связки</h1>
                <p className="text-gray-600">Cohesion и coherence • 22 минуты</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Логические связки в академическом письме</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Логические связки (cohesive devices) играют ключевую роль в создании связного и логичного текста. Они помогают объединить идеи, показать отношения между предложениями и абзацами, а также сделать ваше эссе более последовательным и убедительным. В этом уроке мы рассмотрим основные типы логических связок и научимся эффективно их использовать.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Что такое Cohesion и Coherence?</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Cohesion (Связность)</h4>
                  <p className="text-blue-800">Связность текста на уровне предложений и абзацев. Достигается с помощью специальных слов и фраз, которые соединяют идеи и части текста.</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Coherence (Согласованность)</h4>
                  <p className="text-green-800">Логическая организация идей, которая помогает читателю следить за развитием мысли. Обеспечивает общую целостность и понятность текста.</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Основные типы логических связок</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Добавление информации</h4>
                  <p className="text-gray-700">Используются для добавления новой информации или развития идеи.</p>
                  <div className="mt-2 p-3 bg-white rounded text-gray-700">
                    <p><strong>Примеры:</strong></p>
                    <ul className="list-disc pl-5 text-blue-800 text-sm space-y-1">
                      <li>Additionally, furthermore, moreover, in addition, also, as well as</li>
                      <li>What is more, not only... but also, besides, apart from this</li>
                      <li><em>"Furthermore, the use of renewable energy sources has significantly reduced carbon emissions."</em></li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Противопоставление и контраст</h4>
                  <p className="text-gray-700">Показывают различия между идеями или противоположные точки зрения.</p>
                  <div className="mt-2 p-3 bg-white rounded text-gray-700">
                    <p><strong>Примеры:</strong></p>
                    <ul className="list-disc pl-5 text-blue-800 text-sm space-y-1">
                      <li>However, nevertheless, nonetheless, on the other hand, in contrast</li>
                      <li>Conversely, despite, although, even though, whereas, while</li>
                      <li><em>"While many people support this policy, others argue that it will have negative consequences."</em></li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">3. Причина и следствие</h4>
                  <p className="text-gray-700">Указывают на причинно-следственные связи между идеями.</p>
                  <div className="mt-2 p-3 bg-white rounded text-gray-700">
                    <p><strong>Примеры:</strong></p>
                    <ul className="list-disc pl-5 text-blue-800 text-sm space-y-1">
                      <li>Therefore, thus, consequently, as a result, hence, so</li>
                      <li>Because of this, due to, owing to, since, as</li>
                      <li><em>"The cost of housing has increased dramatically; consequently, many young people cannot afford to buy their first home."</em></li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">4. Примеры и иллюстрации</h4>
                  <p className="text-gray-700">Вводят примеры для подтверждения аргументов.</p>
                  <div className="mt-2 p-3 bg-white rounded text-gray-700">
                    <p><strong>Примеры:</strong></p>
                    <ul className="list-disc pl-5 text-blue-800 text-sm space-y-1">
                      <li>For example, for instance, such as, namely, to illustrate</li>
                      <li>As an illustration, a case in point, including</li>
                      <li><em>"Many countries have implemented successful public transport systems; for instance, Japan's bullet train network is both efficient and environmentally friendly."</em></li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">5. Последовательность и порядок</h4>
                  <p className="text-gray-700">Показывают порядок идей или хронологию событий.</p>
                  <div className="mt-2 p-3 bg-white rounded text-gray-700">
                    <p><strong>Примеры:</strong></p>
                    <ul className="list-disc pl-5 text-blue-800 text-sm space-y-1">
                      <li>Firstly, secondly, thirdly, finally, lastly</li>
                      <li>To begin with, next, then, subsequently, eventually</li>
                      <li><em>"Firstly, we need to identify the problem. Secondly, we should analyze possible solutions. Finally, we must implement the most effective approach."</em></li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">6. Обобщение и заключение</h4>
                  <p className="text-gray-700">Используются для подведения итогов или заключения.</p>
                  <div className="mt-2 p-3 bg-white rounded text-gray-700">
                    <p><strong>Примеры:</strong></p>
                    <ul className="list-disc pl-5 text-blue-800 text-sm space-y-1">
                      <li>In conclusion, to conclude, to summarize, in summary</li>
                      <li>Overall, on the whole, in brief, to sum up</li>
                      <li><em>"In conclusion, while there are both advantages and disadvantages to this approach, the benefits clearly outweigh the drawbacks."</em></li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Советы по использованию логических связок</h3>
              
              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <ul className="list-disc pl-6 text-yellow-800 space-y-2">
                  <li><strong>Не переусердствуйте</strong> — избыточное использование связок может сделать текст искусственным и тяжелым для чтения.</li>
                  <li><strong>Разнообразьте связки</strong> — не используйте одни и те же слова и фразы постоянно.</li>
                  <li><strong>Учитывайте регистр</strong> — некоторые связки более формальны, чем другие. В академическом письме предпочтительны формальные варианты.</li>
                  <li><strong>Обращайте внимание на пунктуацию</strong> — многие связки требуют запятой после них.</li>
                  <li><strong>Используйте связки осознанно</strong> — они должны точно отражать логические отношения между идеями.</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Практическое задание</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <p className="text-blue-800 mb-4">Прочитайте следующий отрывок из эссе и определите, какие логические связки были использованы и к какому типу они относятся:</p>
                
                <div className="bg-white p-4 rounded text-gray-700 mb-4">
                  <p className="italic">
                    "The rise of social media has transformed how people communicate. <strong>For instance</strong>, platforms like Facebook and Twitter allow instant sharing of information across the globe. <strong>However</strong>, this increased connectivity has <strong>also</strong> raised concerns about privacy and data security. <strong>As a result</strong>, many countries have implemented stricter regulations on how companies can collect and use personal data. <strong>Nevertheless</strong>, social media continues to grow in popularity, <strong>especially</strong> among younger generations. <strong>In conclusion</strong>, while social media offers numerous benefits in terms of communication and information sharing, it <strong>simultaneously</strong> presents significant challenges regarding privacy and security."
                  </p>
                </div>
                
                <div className="mt-6">
                  <textarea
                    className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    rows={6}
                    value={answer}
                    onChange={handleAnswerChange}
                    placeholder="Перепишите отрывок, заменив связки на синонимы..."
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
                    <div className={checkResult.includes('похож') ? 'mt-1 text-green-600' : 'mt-1 text-red-600'}>{checkResult}</div>
                  )}
                  {answer && (
                    <div className="mt-2"><span className="font-medium">Ваш ответ:</span> {answer}</div>
                  )}
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
                  href="/courses/writing-mastery/lessons/lesson-14"
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