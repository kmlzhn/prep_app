'use client';

import { UserButton, SignedIn, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState, useEffect } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson18() {
  const { isLoaded, isSignedIn } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [answers, setAnswers] = useState(['', '', '']);
  const [saved, setSaved] = useState([false, false, false]);
  const [checkResult, setCheckResult] = useState([null, null, null]);

  useEffect(() => {
    const savedAnswers = [];
    for (let i = 0; i < 3; i++) {
      const a = localStorage.getItem(`lesson18_answer_${i}`);
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
  const lessonId = 18;
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
    localStorage.setItem(`lesson18_answer_${idx}`, answers[idx]);
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
    ['is conducted', 'are conducted', 'by scientists', 'experiments', 'every day'],
    ['will be launched', 'by the company', 'next month', 'a new product'],
    ['has been collected', 'by people', 'the data']
  ];

  const checkAnswer = (idx) => {
    const answer = answers[idx].toLowerCase();
    const found = keywords[idx].some(word => answer.includes(word));
    setCheckResult(prev => {
      const next = [...prev];
      next[idx] = found ? 'Вы справились с заданием! Отличная работа!' : 'Попробуйте переформулировать или используйте пассивный залог.';
      return next;
    });
  };

  const handleAnswerChange = (idx, value) => {
    const next = [...answers];
    next[idx] = value;
    setAnswers(next);
    // Сброс фидбека для изменённого ответа
    setCheckResult(prev => {
      const nextResult = [...prev];
      nextResult[idx] = null;
      return nextResult;
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <WritingMasterySidebar activeLessonId={18} />

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
                <h1 className="text-3xl font-bold text-gray-900">Урок 18: Пассивный залог (Passive Voice)</h1>
                <p className="text-gray-600">Использование пассивного залога в академическом письме • 15 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Что такое пассивный залог?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Пассивный залог (Passive Voice) — это грамматическая конструкция, при которой подлежащее предложения испытывает действие, а не совершает его. В академическом письме пассив часто используется для акцентирования внимания на действии или результате, а не на исполнителе.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Когда использовать пассивный залог?</h3>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li>Когда исполнитель действия неизвестен или неважен.</li>
                  <li>Когда важнее само действие или результат.</li>
                  <li>Для формального и объективного стиля, характерного для академического письма.</li>
                  <li>В научных и технических текстах для описания процессов и экспериментов.</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Как образуется пассивный залог?</h3>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Формула:</h4>
                  <p className="text-gray-700">Подлежащее + to be (в нужном времени) + причастие прошедшего времени (V3) + [by + исполнитель, если нужно]</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Примеры:</h4>
                  <ul className="list-disc pl-5 text-blue-800 text-sm space-y-1">
                    <li><em>"The results <b>are analyzed</b> by scientists."</em></li>
                    <li><em>"A new law <b>was introduced</b> last year."</em></li>
                    <li><em>"The experiment <b>will be conducted</b> tomorrow."</em></li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Пассив в разных временах</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Present Simple</h4>
                  <p className="text-green-800 mb-2">am/is/are + V3</p>
                  <p className="text-green-800 text-sm italic">"The report <b>is written</b> every year."</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Past Simple</h4>
                  <p className="text-green-800 mb-2">was/were + V3</p>
                  <p className="text-green-800 text-sm italic">"The project <b>was completed</b> on time."</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Future Simple</h4>
                  <p className="text-green-800 mb-2">will be + V3</p>
                  <p className="text-green-800 text-sm italic">"The results <b>will be published</b> soon."</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Present Perfect</h4>
                  <p className="text-green-800 mb-2">have/has been + V3</p>
                  <p className="text-green-800 text-sm italic">"The data <b>has been collected</b>."</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Типичные ошибки при использовании пассивного залога</h3>
              <div className="bg-red-50 p-6 rounded-lg mb-6">
                <ul className="list-disc pl-6 text-red-800 space-y-2">
                  <li><b>Неправильное согласование времени:</b> "The results <b>is published</b>" ❌ → "The results <b>are published</b>" ✅</li>
                  <li><b>Пропуск to be:</b> "The report <b>written</b> by the manager." ❌ → "The report <b>was written</b> by the manager." ✅</li>
                  <li><b>Использование пассива без необходимости:</b> Не используйте пассив, если исполнитель важен или если активная форма звучит естественнее.</li>
                  <li><b>Двойной агент:</b> "The book was written by him by the author." ❌</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Советы по использованию пассивного залога</h3>
              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <ul className="list-disc pl-6 text-yellow-800 space-y-2">
                  <li>Используйте пассив для формального и объективного стиля.</li>
                  <li>Не злоупотребляйте пассивом — чередуйте с активным залогом для естественности текста.</li>
                  <li>Проверяйте согласование подлежащего и глагола.</li>
                  <li>Указывайте исполнителя (by...), только если это действительно важно.</li>
                  <li>Используйте пассив для описания процессов, исследований, экспериментов.</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Практическое задание</h3>
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <p className="text-blue-800 mb-4">Преобразуйте предложения из активного залога в пассивный:</p>
                <ol className="list-decimal pl-6 text-blue-800 space-y-3">
                  {[0,1,2].map(idx => (
                    <li key={idx} className="mb-4">
                      <p className="text-blue-700 mb-1">{idx === 0 ? 'Scientists conduct experiments every day.' : idx === 1 ? 'The company will launch a new product next month.' : 'People have collected the data.'}</p>
                      <div className="mt-2">
                        <textarea
                          className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          rows={3}
                          value={answers[idx]}
                          onChange={e => handleAnswerChange(idx, e.target.value)}
                          placeholder="Преобразуйте в пассивный залог..."
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
                  href="/courses/writing-mastery/lessons/lesson-19"
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