'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState } from 'react';
import SpeakingSkillsSidebar from '../../../../components/SpeakingSkillsSidebar';

export default function Lesson7() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'speaking-skills';
  const lessonId = 7;
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <SpeakingSkillsSidebar activeLessonId={7} />

      {/* Основной контент */}
      <div className="flex-1 flex flex-col">
        {/* Мобильный хедер */}
        <div className="lg:hidden bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <Link href="/courses/speaking-skills" className="text-blue-600">← Назад к курсу</Link>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>

        <main className="flex-1 p-4 lg:p-8 max-w-4xl mx-auto">
          {/* Заголовок урока */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">🎯</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Урок 7: Грамматическая точность</h1>
                <p className="text-gray-600">Избегание типичных ошибок • 28 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Грамматическая точность в IELTS Speaking</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Грамматическая точность (Grammatical Range and Accuracy) — один из четырех критериев оценки в экзамене IELTS Speaking. Этот критерий оценивает вашу способность использовать разнообразные грамматические конструкции без ошибок. В этом уроке мы рассмотрим типичные грамматические ошибки и способы их избежать.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Содержание урока:</h3>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li>Что такое грамматическая точность и как она оценивается</li>
                  <li>Типичные грамматические ошибки русскоговорящих студентов</li>
                  <li>Сложные грамматические конструкции для высокого балла</li>
                  <li>Практические упражнения</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Критерии оценки грамматической точности</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-gray-700 mb-3">Экзаменаторы оценивают следующие аспекты вашей грамматики:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Разнообразие грамматических структур</strong> — использование различных времен, условных предложений, пассивного залога и т.д.</li>
                  <li><strong>Точность использования грамматики</strong> — отсутствие ошибок в базовых и сложных конструкциях</li>
                  <li><strong>Сложность предложений</strong> — использование сложносочиненных и сложноподчиненных предложений</li>
                  <li><strong>Связность речи</strong> — правильное использование союзов и связующих слов</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Типичные грамматические ошибки русскоговорящих студентов</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">Артикли</h4>
                  <p className="text-red-800 text-sm mb-2"><strong>Ошибка:</strong> <span className="italic">I went to hospital yesterday.</span></p>
                  <p className="text-red-800 text-sm mb-2"><strong>Правильно:</strong> <span className="italic">I went to the hospital yesterday.</span></p>
                  <p className="text-red-800 text-sm mb-2"><strong>Ошибка:</strong> <span className="italic">She is doctor.</span></p>
                  <p className="text-red-800 text-sm"><strong>Правильно:</strong> <span className="italic">She is a doctor.</span></p>
                </div>
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">Времена</h4>
                  <p className="text-red-800 text-sm mb-2"><strong>Ошибка:</strong> <span className="italic">I live here for 5 years.</span></p>
                  <p className="text-red-800 text-sm mb-2"><strong>Правильно:</strong> <span className="italic">I have lived here for 5 years.</span></p>
                  <p className="text-red-800 text-sm mb-2"><strong>Ошибка:</strong> <span className="italic">Yesterday I go to the cinema.</span></p>
                  <p className="text-red-800 text-sm"><strong>Правильно:</strong> <span className="italic">Yesterday I went to the cinema.</span></p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">Предлоги</h4>
                  <p className="text-red-800 text-sm mb-2"><strong>Ошибка:</strong> <span className="italic">I arrived to London on Monday.</span></p>
                  <p className="text-red-800 text-sm mb-2"><strong>Правильно:</strong> <span className="italic">I arrived in London on Monday.</span></p>
                  <p className="text-red-800 text-sm mb-2"><strong>Ошибка:</strong> <span className="italic">I'm good in playing tennis.</span></p>
                  <p className="text-red-800 text-sm"><strong>Правильно:</strong> <span className="italic">I'm good at playing tennis.</span></p>
                </div>
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">Порядок слов</h4>
                  <p className="text-red-800 text-sm mb-2"><strong>Ошибка:</strong> <span className="italic">I know where is the library.</span></p>
                  <p className="text-red-800 text-sm mb-2"><strong>Правильно:</strong> <span className="italic">I know where the library is.</span></p>
                  <p className="text-red-800 text-sm mb-2"><strong>Ошибка:</strong> <span className="italic">Always I walk to work.</span></p>
                  <p className="text-red-800 text-sm"><strong>Правильно:</strong> <span className="italic">I always walk to work.</span></p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Сложные грамматические конструкции для высокого балла</h3>
              
              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <p className="text-green-800 mb-3">Для получения высокого балла за грамматику стоит использовать следующие конструкции:</p>
                <ol className="list-decimal pl-6 text-green-800 space-y-3">
                  <li>
                    <strong>Условные предложения (Conditionals)</strong>
                    <p className="text-sm mt-1">
                      <span className="italic">If I had more time, I would travel more often.</span><br/>
                      <span className="italic">Had I known about the problem earlier, I would have fixed it.</span>
                    </p>
                  </li>
                  <li>
                    <strong>Пассивный залог (Passive Voice)</strong>
                    <p className="text-sm mt-1">
                      <span className="italic">The issue is being discussed by experts worldwide.</span><br/>
                      <span className="italic">The new policy has been implemented recently.</span>
                    </p>
                  </li>
                  <li>
                    <strong>Модальные глаголы для предположений</strong>
                    <p className="text-sm mt-1">
                      <span className="italic">He must have forgotten about our meeting.</span><br/>
                      <span className="italic">They might be considering other options.</span>
                    </p>
                  </li>
                  <li>
                    <strong>Инверсия</strong>
                    <p className="text-sm mt-1">
                      <span className="italic">Rarely have I seen such a beautiful sunset.</span><br/>
                      <span className="italic">Not only did she win the competition, but she also broke the record.</span>
                    </p>
                  </li>
                  <li>
                    <strong>Сложные герундиальные и инфинитивные конструкции</strong>
                    <p className="text-sm mt-1">
                      <span className="italic">I appreciate your taking the time to help me.</span><br/>
                      <span className="italic">The company expects its employees to be punctual.</span>
                    </p>
                  </li>
                </ol>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Практические упражнения</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-900 mb-3">Упражнение 1: Трансформация предложений</h4>
                <p className="text-blue-800 mb-2">Перефразируйте простые предложения, используя более сложные грамматические конструкции:</p>
                <div className="space-y-3 text-blue-800 text-sm">
                  <div>
                    <p><strong>Простое:</strong> <span className="italic">I was tired. I went to bed early.</span></p>
                    <p><strong>Сложное:</strong> <span className="italic">Being tired, I went to bed early. / As I was tired, I went to bed early.</span></p>
                  </div>
                  <div>
                    <p><strong>Простое:</strong> <span className="italic">She will come if you invite her.</span></p>
                    <p><strong>Сложное:</strong> <span className="italic">Should you invite her, she will come.</span></p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-purple-900 mb-3">Упражнение 2: Исправление ошибок</h4>
                <p className="text-purple-800 mb-2">Найдите и исправьте грамматические ошибки в следующих предложениях:</p>
                <div className="space-y-3 text-purple-800 text-sm">
                  <div>
                    <p><strong>С ошибкой:</strong> <span className="italic">I am living in this city since 2010.</span></p>
                    <p><strong>Правильно:</strong> <span className="italic">I have been living in this city since 2010.</span></p>
                  </div>
                  <div>
                    <p><strong>С ошибкой:</strong> <span className="italic">She told me about what happened yesterday.</span></p>
                    <p><strong>Правильно:</strong> <span className="italic">She told me what happened yesterday.</span></p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h4 className="font-semibold text-orange-800 mb-2">💡 Советы для улучшения грамматической точности:</h4>
                <ul className="list-disc pl-6 text-orange-700 space-y-2">
                  <li><strong>Регулярно повторяйте грамматические правила</strong> — особенно те, которые вызывают у вас трудности.</li>
                  <li><strong>Анализируйте свою речь</strong> — записывайте себя и отмечайте грамматические ошибки.</li>
                  <li><strong>Практикуйте разные времена</strong> — старайтесь использовать разнообразные временные формы в своей речи.</li>
                  <li><strong>Изучайте сложные конструкции постепенно</strong> — осваивайте по одной конструкции за раз и практикуйте её до автоматизма.</li>
                  <li><strong>Читайте вслух</strong> — это поможет запомнить правильные грамматические структуры.</li>
                  <li><strong>Не бойтесь ошибок</strong> — лучше попробовать использовать сложную конструкцию с риском ошибки, чем ограничиваться только простыми предложениями.</li>
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
                  href="/courses/speaking-skills/lessons/lesson-8"
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