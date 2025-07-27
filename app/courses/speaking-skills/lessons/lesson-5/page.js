'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState } from 'react';
import SpeakingSkillsSidebar from '../../../../components/SpeakingSkillsSidebar';

export default function Lesson5() {
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
  const lessonId = 5;
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
      <SpeakingSkillsSidebar activeLessonId={5} />

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
              <span className="text-4xl mr-4">💬</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Урок 5: Беглость речи</h1>
                <p className="text-gray-600">Техники для плавного говорения • 30 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Беглость речи в IELTS Speaking</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Беглость речи (Fluency) — один из ключевых критериев оценки в экзамене IELTS Speaking. Этот навык отражает вашу способность говорить плавно, без излишних пауз и запинок. В этом уроке мы рассмотрим техники и стратегии для развития беглости речи.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Содержание урока:</h3>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li>Что такое беглость речи и как она оценивается</li>
                  <li>Основные проблемы, влияющие на беглость</li>
                  <li>Техники для развития плавности речи</li>
                  <li>Практические упражнения</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Что такое беглость речи</h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Беглость речи — это способность говорить непрерывно, естественно и без чрезмерных усилий. В контексте IELTS Speaking экзаменаторы оценивают:
              </p>
              
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Скорость речи (не слишком быстро и не слишком медленно)</li>
                <li>Отсутствие длительных пауз и запинок</li>
                <li>Естественность речи</li>
                <li>Способность говорить без повторений и самокоррекции</li>
                <li>Способность развивать мысль без отклонений от темы</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Основные проблемы, влияющие на беглость</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Языковые барьеры</h4>
                  <ul className="list-disc pl-4 text-yellow-800 space-y-1 text-sm">
                    <li>Ограниченный словарный запас</li>
                    <li>Неуверенность в грамматике</li>
                    <li>Трудности с произношением</li>
                    <li>Мышление на родном языке</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Психологические барьеры</h4>
                  <ul className="list-disc pl-4 text-green-800 space-y-1 text-sm">
                    <li>Страх сделать ошибку</li>
                    <li>Волнение и стресс</li>
                    <li>Перфекционизм</li>
                    <li>Недостаток уверенности</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Техники для развития беглости речи</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <ol className="list-decimal pl-6 text-gray-700 space-y-3">
                  <li>
                    <strong>Техника "4-3-2"</strong>
                    <p className="text-sm mt-1">Говорите на одну тему 4 минуты, затем сократите до 3 минут, затем до 2 минут. Это заставляет говорить быстрее и эффективнее.</p>
                  </li>
                  <li>
                    <strong>Техника теневого повторения (Shadowing)</strong>
                    <p className="text-sm mt-1">Слушайте аудио на английском и повторяйте за говорящим с минимальной задержкой, имитируя темп, ритм и интонацию.</p>
                  </li>
                  <li>
                    <strong>Техника "Говори, не останавливайся"</strong>
                    <p className="text-sm mt-1">Выберите тему и говорите о ней 1-2 минуты без остановки. Даже если вы не знаете, что сказать, используйте заполнители (fillers).</p>
                  </li>
                  <li>
                    <strong>Запись и анализ своей речи</strong>
                    <p className="text-sm mt-1">Записывайте свои ответы, анализируйте паузы и повторения, работайте над их устранением.</p>
                  </li>
                  <li>
                    <strong>Регулярная практика с партнером</strong>
                    <p className="text-sm mt-1">Практикуйте разговорную речь с партнером, который будет давать обратную связь о вашей беглости.</p>
                  </li>
                </ol>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Полезные заполнители речи (Fillers)</h3>
              
              <div className="bg-purple-50 p-6 rounded-lg mb-6">
                <p className="text-purple-800 mb-3">Заполнители помогают избегать неловких пауз, когда вы думаете, что сказать дальше:</p>
                <ul className="list-disc pl-6 text-purple-800 space-y-1">
                  <li><strong>Well...</strong> — используйте в начале ответа</li>
                  <li><strong>You know...</strong> — когда ищете подходящие слова</li>
                  <li><strong>I mean...</strong> — когда хотите уточнить сказанное</li>
                  <li><strong>Actually...</strong> — когда хотите добавить информацию</li>
                  <li><strong>Let me think...</strong> — когда нужно время на размышление</li>
                  <li><strong>To be honest...</strong> — когда выражаете личное мнение</li>
                </ul>
                <p className="text-purple-800 mt-3 text-sm italic">Важно: не злоупотребляйте заполнителями — они должны звучать естественно и использоваться умеренно.</p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Практические упражнения</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-900 mb-3">Упражнение 1: Описание картинки</h4>
                <p className="text-blue-800 mb-2">Найдите любую фотографию и опишите её в течение 1 минуты без остановки. Обратите внимание на:</p>
                <ul className="list-disc pl-6 text-blue-800 space-y-1 text-sm mb-2">
                  <li>Что изображено на картинке</li>
                  <li>Где это происходит</li>
                  <li>Кто на ней изображен</li>
                  <li>Что происходит</li>
                  <li>Какие эмоции вызывает эта картинка</li>
                </ul>
                <p className="text-blue-800 text-sm">Повторяйте упражнение с разными картинками, постепенно увеличивая время до 2 минут.</p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-green-900 mb-3">Упражнение 2: Импровизированная речь</h4>
                <p className="text-green-800 mb-2">Выберите случайную тему из списка и говорите о ней 1 минуту без подготовки:</p>
                <ul className="list-disc pl-6 text-green-800 space-y-1 text-sm">
                  <li>Ваш любимый фильм</li>
                  <li>Идеальный выходной день</li>
                  <li>Ваше хобби</li>
                  <li>Место, которое вы хотели бы посетить</li>
                  <li>Человек, которым вы восхищаетесь</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h4 className="font-semibold text-orange-800 mb-2">💡 Советы для улучшения беглости речи:</h4>
                <ul className="list-disc pl-6 text-orange-700 space-y-2">
                  <li><strong>Читайте вслух</strong> — ежедневно читайте английские тексты вслух в течение 10-15 минут.</li>
                  <li><strong>Слушайте подкасты и аудиокниги</strong> — погружайтесь в естественную английскую речь.</li>
                  <li><strong>Думайте на английском</strong> — старайтесь формулировать свои мысли сразу на английском языке.</li>
                  <li><strong>Не бойтесь ошибок</strong> — лучше говорить с ошибками, чем молчать из страха их совершить.</li>
                  <li><strong>Практикуйтесь регулярно</strong> — даже 15 минут ежедневной практики дадут заметный результат.</li>
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
                  href="/courses/speaking-skills/lessons/lesson-6"
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