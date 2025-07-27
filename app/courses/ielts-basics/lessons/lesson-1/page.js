'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState } from 'react';
import IELTSBasicsSidebar from '../../../../components/IELTSBasicsSidebar';

export default function Lesson1() {
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

  const courseSlug = 'ielts-basics';
  const lessonId = 1;
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
      <IELTSBasicsSidebar activeLessonId={1} />

      {/* Основной контент */}
      <div className="flex-1 flex flex-col">
        {/* Мобильный хедер */}
        <div className="lg:hidden bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <Link href="/courses/ielts-basics" className="text-blue-600">← Назад к курсу</Link>
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
                <h1 className="text-3xl font-bold text-gray-900">Урок 1: Введение в IELTS</h1>
                <p className="text-gray-600">Что такое IELTS и зачем он нужен • 15 минут</p>
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
            {/* Видео плейсхолдер */}
            

            {/* Теоретический материал */}
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Что такое IELTS?</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
              IELTS (International English Language Testing System) — это всемирно признанная и стандартизированная система оценки знания английского языка для неносителей языка. Это один из самых авторитетных и популярных экзаменов в мире, который ежегодно сдают миллионы людей. IELTS оценивает все четыре ключевых языковых навыка: аудирование (Listening), чтение (Reading), письмо (Writing) и разговорную речь (Speaking). Экзамен разработан ведущими экспертами в области лингвистики и поддерживается тремя организациями-партнерами: British Council, IDP: IELTS Australia и Cambridge English Language Assessment, что гарантирует его качество и признание по всему миру.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Зачем сдавать IELTS?</h3>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>Образование:</strong> Это основной критерий для поступления в тысячи университетов и колледжей по всему миру, включая ведущие учебные заведения в Великобритании, Австралии, Канаде, Новой Зеландии, США, Ирландии и многих других странах, где обучение ведется на английском языке. Высокий балл по IELTS подтверждает вашу способность успешно учиться и воспринимать академический материал на английском.</li>
                <li><strong>Иммиграция:</strong> Для получения визы и разрешения на постоянное проживание в таких странах, как Канада, Австралия, Новая Зеландия, Великобритания, а также для получения гражданства в некоторых случаях. Правительства этих стран используют результаты IELTS как доказательство вашей интеграции и способности общаться в повседневной жизни и на работе.</li>
                <li><strong>Карьера:</strong> Трудоустройство в международных компаниях, где английский является рабочим языком. Многие транснациональные корпорации, а также местные компании в англоговорящих странах, требуют сертификат IELTS для подтверждения вашего уровня владения языком, что важно для эффективной коммуникации с коллегами, клиентами и партнерами.</li>
                <li><strong>Профессиональная регистрация:</strong>  Получение лицензии и подтверждение квалификации для таких специалистов, как врачи, медсестры, инженеры, юристы, учителя и других профессий, требующих обязательного подтверждения языковой компетенции для работы в англоговорящих странах. Это гарантирует, что вы сможете безопасно и эффективно выполнять свои профессиональные обязанности.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Две версии экзамена</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">📚 Academic (Академический)</h4>
                  <p className="text-blue-800">Эта версия разработана специально для тех, кто планирует поступать в высшие учебные заведения (университеты, колледжи) на программы бакалавриата, магистратуры, докторантуры. Также он требуется для профессиональной регистрации в таких сферах, как медицина, юриспруденция, инженерия, где необходимо глубокое понимание академического и профессионального языка. Задания в секциях Reading и Writing ориентированы на академическую тематику и требуют анализа научных текстов и написания эссе.</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">🌍 General Training</h4>
                  <p className="text-green-800">Эта версия подходит для тех, кто планирует иммигрировать в англоговорящие страны (например, Канаду, Австралию, Новую Зеландию), трудоустраиваться (не для высокорегулируемых профессий) или проходить среднее образование (школа) в англоговорящей среде. Задания в секциях Reading и Writing ориентированы на повседневные ситуации, социальные темы и рабочую переписку, отражая язык, используемый в повседневной жизни.</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Шкала оценок</h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                IELTS использует 9-балльную шкалу оценки:
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div><strong>9.0:</strong> Expert user</div>
                  <div><strong>8.0:</strong> Very good user</div>
                  <div><strong>7.0:</strong> Good user</div>
                  <div><strong>6.0:</strong> Competent user</div>
                  <div><strong>5.0:</strong> Modest user</div>
                  <div><strong>4.0:</strong> Limited user</div>
                  <div><strong>3.0:</strong> Extremely limited user</div>
                  <div><strong>2.0:</strong> Intermittent user</div>
                  <div><strong>1.0:</strong> Non-user</div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-semibold text-yellow-800 mb-2">💡 Полезно знать:</h4>
                <p className="text-yellow-700">
                  <div><strong>Требования варьируются: </strong> Очень важно всегда проверять конкретные требования к баллам IELTS для вашей программы обучения, учебного заведения или иммиграционной программы, так как они могут значительно отличаться. Например, для некоторых программ магистратуры или докторских исследований может потребоваться общий балл 7.0 или даже 7.5, с минимальным баллом в каждой секции не ниже 6.5 или 7.0.</div>
                  <div><strong>Срок действия:</strong> Результаты IELTS обычно действительны в течение двух лет с момента сдачи экзамена. После этого срока большинство учреждений потребуют сдать экзамен повторно.</div>
                  <div><strong>Computer-delivered IELTS:</strong> Помимо традиционного бумажного формата, IELTS также доступен в компьютерном формате, что может быть удобнее для некоторых кандидатов. Содержание и структура экзамена остаются одинаковыми, но меняется способ ввода ответов.</div>
                  <div><strong>One Skill Retake (OSR):</strong> В некоторых странах появилась возможность пересдать только один из модулей (Listening, Reading, Writing или Speaking), если вам нужно улучшить результат только в одной из секций, не пересдавая весь экзамен целиком. Это значительно упрощает процесс для многих кандидатов. Уточняйте доступность этой опции в вашем регионе.</div>
                </p>
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
                  href="/courses/ielts-basics/lessons/lesson-2"
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