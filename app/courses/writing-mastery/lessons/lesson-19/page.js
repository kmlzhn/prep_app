'use client';

import { UserButton, SignedIn, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState, useEffect } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson19() {
  const { isLoaded, isSignedIn } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [answer, setAnswer] = useState('');
  const [saved, setSaved] = useState(false);
  const [checkResult, setCheckResult] = useState(null);

  useEffect(() => {
    const a = localStorage.getItem('lesson19_answer_0');
    setAnswer(a || '');
  }, []);

  const courseSlug = 'writing-mastery';
  const lessonId = 19;
  const completed = isLessonCompleted(courseSlug, lessonId);

  const handleSave = () => {
    localStorage.setItem('lesson19_answer_0', answer);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

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

  const keywords = [
    'paraphrase', 'paraphrasing', 'reword', 'rephrase', 'change structure', 'synonyms', 'academic', 'avoid plagiarism', 'own words', 'meaning', 'rewrite', 'IELTS', 'writing', 'task', 'sentence', 'idea'
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

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <WritingMasterySidebar activeLessonId={19} />

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
              <span className="text-4xl mr-4">🔄</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Урок 19: Парафраз (Paraphrasing) в академическом письме</h1>
                <p className="text-gray-600">Навык перефразирования для IELTS Writing • 20 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Что такое парафраз?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                <b>Парафраз (paraphrasing)</b> — это умение передавать ту же мысль другими словами, сохраняя исходный смысл. В академическом письме этот навык необходим для избежания плагиата, демонстрации владения лексикой и грамматикой, а также для повышения оригинальности текста.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-900 mb-3">Зачем нужен парафраз?</h4>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li>Избежать плагиата и копирования исходного текста</li>
                  <li>Показать разнообразие лексики и грамматических структур</li>
                  <li>Упростить или уточнить исходную мысль</li>
                  <li>Продемонстрировать понимание материала</li>
                </ul>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Стратегии парафраза</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">1. Использование синонимов</h4>
                  <p className="text-green-800">Заменяйте ключевые слова на синонимы, сохраняя общий смысл.</p>
                  <p className="text-green-800 text-sm italic mt-1">"Many people believe that education is important." → "Numerous individuals consider education to be essential."</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">2. Изменение структуры предложения</h4>
                  <p className="text-yellow-800">Меняйте порядок слов, используйте разные грамматические конструкции.</p>
                  <p className="text-yellow-800 text-sm italic mt-1">"The government introduced a new law." → "A new law was introduced by the government."</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">3. Обобщение или детализация</h4>
                  <p className="text-purple-800">Можно сделать мысль более общей или, наоборот, конкретизировать детали.</p>
                  <p className="text-purple-800 text-sm italic mt-1">"Children under 12 should not use smartphones." → "Young children should avoid using mobile devices."</p>
                </div>
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">4. Перестройка частей предложения</h4>
                  <p className="text-red-800">Меняйте местами части предложения, чтобы изменить акцент.</p>
                  <p className="text-red-800 text-sm italic mt-1">"Because pollution is increasing, governments are taking action." → "Governments are taking action due to the increase in pollution."</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Типичные ошибки при парафразе</h3>
              <div className="bg-red-50 p-6 rounded-lg mb-6">
                <ul className="list-disc pl-6 text-red-800 space-y-2">
                  <li>Слишком близкое копирование исходного текста</li>
                  <li>Искажение исходного смысла</li>
                  <li>Использование неуместных синонимов</li>
                  <li>Грамматические ошибки при перестройке предложения</li>
                </ul>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Советы по эффективному парафразированию</h3>
              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <ul className="list-disc pl-6 text-yellow-800 space-y-2">
                  <li>Всегда проверяйте, что смысл не изменился</li>
                  <li>Используйте разнообразные структуры и лексику</li>
                  <li>Сравнивайте свой вариант с оригиналом</li>
                  <li>Тренируйтесь на реальных примерах из IELTS</li>
                </ul>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Практическое задание</h3>
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <p className="text-blue-800 mb-4">Перефразируйте следующее предложение, используя стратегии из урока:</p>
                <div className="bg-white p-4 rounded text-gray-700 mb-4">
                  <p className="italic">"Nowadays, more and more people are choosing to work from home instead of commuting to an office every day."</p>
                </div>
                <div className="mt-6">
                  <textarea
                    className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    rows={4}
                    value={answer}
                    onChange={handleAnswerChange}
                    placeholder="Перефразируйте предложение..."
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
                  href="/courses/writing-mastery/lessons/lesson-20"
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