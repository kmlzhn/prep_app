'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState, useEffect } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson15() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [saved, setSaved] = useState([false, false, false, false]);
  const [checkResult, setCheckResult] = useState([null, null, null, null]);

  useEffect(() => {
    const savedAnswers = [];
    for (let i = 0; i < 4; i++) {
      const a = localStorage.getItem(`lesson15_answer_${i}`);
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
  const lessonId = 15;
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
    localStorage.setItem(`lesson15_answer_${idx}`, answers[idx]);
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
    ['children', 'excessive', 'screen time', 'detrimental', 'health', 'adverse', 'negative impact'],
    ['housing', 'afford', 'prices', 'increased', 'recent years', 'substantial', 'significant', 'cost'],
    ['government', 'improve', 'education system', 'ineffective', 'currently', 'reform', 'policies'],
    ['public transport', 'increase', 'usage', 'reduce', 'cars', 'encourage', 'alternative', 'commuting']
  ];

  const checkAnswer = (idx) => {
    const answer = answers[idx].toLowerCase();
    const found = keywords[idx].some(word => answer.includes(word));
    setCheckResult(prev => {
      const next = [...prev];
      next[idx] = found ? 'Ответ похож на примерный!' : 'Попробуйте переформулировать или используйте формальный стиль.';
      return next;
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <WritingMasterySidebar activeLessonId={15} />

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
                <h1 className="text-3xl font-bold text-gray-900">Урок 15: Формальный стиль</h1>
                <p className="text-gray-600">Академический язык в эссе • 26 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Формальный стиль в академическом письме</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Формальный академический стиль является одним из ключевых требований к письменным работам в IELTS Writing Task 2. Правильное использование формального языка демонстрирует вашу языковую компетентность и понимание академических конвенций. В этом уроке мы рассмотрим основные характеристики формального стиля и научимся применять их в эссе.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Характеристики формального академического стиля</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Объективность</h4>
                  <p className="text-gray-700">Академическое письмо стремится к объективности и беспристрастности. Избегайте чрезмерно эмоциональных высказываний и субъективных оценок.</p>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <div className="p-3 bg-red-50 rounded">
                      <p className="text-red-800 text-sm font-medium">Неформально:</p>
                      <p className="text-red-700 text-sm italic">"I think it's absolutely terrible how governments ignore climate change."</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <p className="text-green-800 text-sm font-medium">Формально:</p>
                      <p className="text-green-700 text-sm italic">"There appears to be insufficient governmental action regarding climate change."</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Отсутствие сокращений</h4>
                  <p className="text-gray-700">В формальном письме следует избегать сокращенных форм и использовать полные формы глаголов.</p>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <div className="p-3 bg-red-50 rounded">
                      <p className="text-red-800 text-sm font-medium">Неформально:</p>
                      <p className="text-red-700 text-sm italic">"They don't provide enough resources and can't solve the problem."</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <p className="text-green-800 text-sm font-medium">Формально:</p>
                      <p className="text-green-700 text-sm italic">"They do not provide sufficient resources and cannot solve the problem."</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">3. Отсутствие разговорных выражений и сленга</h4>
                  <p className="text-gray-700">Избегайте разговорных фраз, идиом и сленга, которые могут быть неуместны в академическом контексте.</p>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <div className="p-3 bg-red-50 rounded">
                      <p className="text-red-800 text-sm font-medium">Неформально:</p>
                      <p className="text-red-700 text-sm italic">"The government should get its act together and fix this mess."</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <p className="text-green-800 text-sm font-medium">Формально:</p>
                      <p className="text-green-700 text-sm italic">"The government should implement more effective policies to address this issue."</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">4. Использование пассивного залога</h4>
                  <p className="text-gray-700">Пассивный залог часто используется в академическом письме для создания объективного тона и фокусирования на действии, а не на исполнителе.</p>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <div className="p-3 bg-red-50 rounded">
                      <p className="text-red-800 text-sm font-medium">Активный залог:</p>
                      <p className="text-red-700 text-sm italic">"Scientists have conducted numerous studies on this topic."</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <p className="text-green-800 text-sm font-medium">Пассивный залог:</p>
                      <p className="text-green-700 text-sm italic">"Numerous studies have been conducted on this topic."</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">5. Избегание личных местоимений первого лица</h4>
                  <p className="text-gray-700">Старайтесь минимизировать использование "I", "we", "my", "our" и т.д., чтобы сохранить объективность и формальность.</p>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <div className="p-3 bg-red-50 rounded">
                      <p className="text-red-800 text-sm font-medium">Неформально:</p>
                      <p className="text-red-700 text-sm italic">"In my opinion, I think we should focus on renewable energy."</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <p className="text-green-800 text-sm font-medium">Формально:</p>
                      <p className="text-green-700 text-sm italic">"It appears that a focus on renewable energy would be beneficial."</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">6. Точность и конкретность</h4>
                  <p className="text-gray-700">Используйте точные термины и избегайте расплывчатых или неопределенных выражений.</p>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <div className="p-3 bg-red-50 rounded">
                      <p className="text-red-800 text-sm font-medium">Неточно:</p>
                      <p className="text-red-700 text-sm italic">"Many people use a lot of water every day."</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <p className="text-green-800 text-sm font-medium">Точно:</p>
                      <p className="text-green-700 text-sm italic">"The average household consumes approximately 300 liters of water daily."</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Формальные альтернативы для распространенных неформальных выражений</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="px-4 py-2 text-left text-blue-800">Неформальное выражение</th>
                        <th className="px-4 py-2 text-left text-blue-800">Формальная альтернатива</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-100">
                      <tr>
                        <td className="px-4 py-2 text-blue-700">a lot of / lots of</td>
                        <td className="px-4 py-2 text-blue-700">numerous, substantial, considerable, significant</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-blue-700">get</td>
                        <td className="px-4 py-2 text-blue-700">obtain, acquire, receive, gain</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-blue-700">show</td>
                        <td className="px-4 py-2 text-blue-700">demonstrate, indicate, illustrate, reveal</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-blue-700">think</td>
                        <td className="px-4 py-2 text-blue-700">consider, believe, suggest, propose</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-blue-700">find out</td>
                        <td className="px-4 py-2 text-blue-700">discover, determine, ascertain, establish</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-blue-700">look at</td>
                        <td className="px-4 py-2 text-blue-700">examine, analyze, investigate, explore</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-blue-700">big</td>
                        <td className="px-4 py-2 text-blue-700">substantial, significant, considerable, extensive</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-blue-700">small</td>
                        <td className="px-4 py-2 text-blue-700">minimal, limited, insignificant, negligible</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-blue-700">good</td>
                        <td className="px-4 py-2 text-blue-700">beneficial, advantageous, favorable, positive</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-blue-700">bad</td>
                        <td className="px-4 py-2 text-blue-700">detrimental, unfavorable, adverse, negative</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Формальные фразы для выражения мнения</h3>
              
              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <div className="space-y-3">
                  <p className="font-medium text-green-800">Вместо прямого "I think" или "In my opinion" используйте:</p>
                  <ul className="list-disc pl-6 text-green-700 space-y-1">
                    <li>It appears that...</li>
                    <li>It could be argued that...</li>
                    <li>The evidence suggests that...</li>
                    <li>It seems reasonable to assume that...</li>
                    <li>One might conclude that...</li>
                    <li>Research indicates that...</li>
                    <li>There is a strong case for...</li>
                    <li>It is widely acknowledged that...</li>
                    <li>A compelling argument can be made for...</li>
                    <li>The data points to the conclusion that...</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Советы по использованию формального стиля</h3>
              
              <div className="bg-yellow-50 p-6 rounded-lg">
                <ul className="list-disc pl-6 text-yellow-800 space-y-2">
                  <li><strong>Соблюдайте баланс</strong> — чрезмерно формальный стиль может звучать неестественно. Стремитесь к ясности и точности, а не к сложности ради сложности.</li>
                  <li><strong>Будьте последовательны</strong> — поддерживайте формальный тон на протяжении всего эссе.</li>
                  <li><strong>Используйте разнообразную лексику</strong> — демонстрируйте богатый словарный запас, но избегайте использования слов, в значении которых вы не уверены.</li>
                  <li><strong>Избегайте риторических вопросов</strong> — они часто звучат неформально и могут ослабить ваш аргумент.</li>
                  <li><strong>Будьте осторожны с фразовыми глаголами</strong> — часто существуют более формальные однословные эквиваленты.</li>
                  <li><strong>Используйте номинализацию</strong> — превращение глаголов в существительные часто делает текст более формальным (например, "improve" → "improvement", "develop" → "development").</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Практическое задание</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <p className="text-blue-800 mb-4">Переформулируйте следующие неформальные предложения в формальный академический стиль:</p>
                
                <ol className="list-decimal pl-6 text-blue-800 space-y-3">
                  {[0,1,2,3].map(idx => (
                    <li key={idx} className="mb-4">
                      <p className="text-blue-700 italic mb-1">{`"I think that kids spend too much time on their phones these days, and it's really bad for their health."`}</p>
                      <div className="mt-2">
                        <textarea
                          className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          rows={3}
                          value={answers[idx]}
                          onChange={e => setAnswers(a => { const n = [...a]; n[idx] = e.target.value; return n; })}
                          placeholder="Напишите формальный вариант..."
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
                  href="/courses/writing-mastery/lessons/lesson-16"
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
