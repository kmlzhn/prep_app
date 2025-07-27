'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState } from 'react';
import SpeakingSkillsSidebar from '../../../../components/SpeakingSkillsSidebar';

export default function Lesson4() {
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
  const lessonId = 4;
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
      <SpeakingSkillsSidebar activeLessonId={4} />

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
                <h1 className="text-3xl font-bold text-gray-900">Урок 4: Произношение и интонация</h1>
                <p className="text-gray-600">Работа над четкостью речи • 35 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Произношение и интонация в IELTS Speaking</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Произношение и интонация — одни из ключевых критериев оценки в экзамене IELTS Speaking. Даже если у вас богатый словарный запас и отличная грамматика, неправильное произношение может значительно снизить вашу оценку. В этом уроке мы рассмотрим основные аспекты произношения и интонации, а также техники для их улучшения.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Что оценивается в произношении</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Отдельные звуки</h4>
                  <ul className="list-disc pl-4 text-blue-800 space-y-1 text-sm">
                    <li>Правильное произношение согласных звуков</li>
                    <li>Различение похожих звуков (например, /p/ и /b/)</li>
                    <li>Правильное произношение гласных звуков</li>
                    <li>Долгота гласных звуков (например, ship vs. sheep)</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Просодические особенности</h4>
                  <ul className="list-disc pl-4 text-green-800 space-y-1 text-sm">
                    <li>Ударение в словах</li>
                    <li>Ударение в предложениях</li>
                    <li>Ритм речи</li>
                    <li>Интонационные контуры</li>
                    <li>Паузация</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Распространенные проблемы произношения</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Звуки /θ/ и /ð/</strong> — "th" в словах "think" и "this"</li>
                  <li><strong>Звуки /v/ и /w/</strong> — различие между "vest" и "west"</li>
                  <li><strong>Звуки /l/ и /r/</strong> — различие между "light" и "right"</li>
                  <li><strong>Звуки /ʃ/ и /tʃ/</strong> — различие между "ship" и "chip"</li>
                  <li><strong>Звуки /s/ и /z/</strong> — различие между "price" и "prize"</li>
                  <li><strong>Конечные согласные</strong> — четкое произношение звуков в конце слов</li>
                  <li><strong>Сложные сочетания согласных</strong> — например, "strengths", "sixths"</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Интонация и ее роль</h3>
              
              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <p className="text-yellow-800 mb-4">Интонация — это мелодика речи, изменение высоты голоса. Она выполняет несколько функций:</p>
                <ul className="list-disc pl-6 text-yellow-800 space-y-2">
                  <li><strong>Выражение эмоций</strong> — интерес, удивление, уверенность, сомнение</li>
                  <li><strong>Выделение важной информации</strong> — логическое ударение на ключевых словах</li>
                  <li><strong>Различение типов предложений</strong> — утверждение, вопрос, просьба</li>
                  <li><strong>Структурирование речи</strong> — обозначение границ смысловых групп</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Основные интонационные модели</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Нисходящая интонация (↘️)</h4>
                  <p className="text-purple-800 text-sm mb-2">Используется в:</p>
                  <ul className="list-disc pl-4 text-purple-800 space-y-1 text-sm">
                    <li>Утверждениях: "I'm going <strong>home</strong>."</li>
                    <li>Специальных вопросах: "Where are you <strong>going</strong>?"</li>
                    <li>Командах: "Close the <strong>door</strong>."</li>
                    <li>Восклицаниях: "What a beautiful <strong>day</strong>!"</li>
                  </ul>
                </div>
                <div className="bg-pink-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-pink-900 mb-2">Восходящая интонация (↗️)</h4>
                  <p className="text-pink-800 text-sm mb-2">Используется в:</p>
                  <ul className="list-disc pl-4 text-pink-800 space-y-1 text-sm">
                    <li>Общих вопросах: "Are you <strong>ready</strong>?"</li>
                    <li>Незаконченных фразах: "If you're <strong>free</strong>..."</li>
                    <li>Перечислениях: "<strong>Apples</strong>, <strong>oranges</strong>, <strong>bananas</strong>..."</li>
                    <li>Переспросах: "You're <strong>leaving</strong>?"</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Практические упражнения</h3>
              
              <div className="bg-gray-100 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">1. Минимальные пары</h4>
                <p className="text-gray-700 mb-2">Тренируйте различение похожих звуков:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>ship - sheep</li>
                  <li>pen - pan</li>
                  <li>live - leave</li>
                  <li>full - fool</li>
                  <li>thin - sin</li>
                </ul>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">2. Скороговорки</h4>
                <p className="text-gray-700 mb-2">Практикуйте беглость и четкость произношения:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>"She sells seashells by the seashore."</li>
                  <li>"Red lorry, yellow lorry."</li>
                  <li>"Unique New York, New York unique."</li>
                  <li>"How much wood would a woodchuck chuck if a woodchuck could chuck wood?"</li>
                </ul>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">3. Интонационные упражнения</h4>
                <p className="text-gray-700 mb-2">Практикуйте различные интонационные модели:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Произнесите "Really?" с разной интонацией, выражая удивление, сомнение, интерес.</li>
                  <li>Произнесите "I didn't say he stole the money", делая ударение на разных словах.</li>
                  <li>Прочитайте диалоги вслух, обращая внимание на интонацию разных типов предложений.</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h4 className="font-semibold text-orange-800 mb-2">💡 Советы для улучшения произношения:</h4>
                <ul className="list-disc pl-6 text-orange-700 space-y-2">
                  <li><strong>Слушайте и имитируйте</strong> — регулярно слушайте носителей языка и повторяйте за ними.</li>
                  <li><strong>Записывайте свою речь</strong> — сравнивайте ее с речью носителей языка и отмечайте различия.</li>
                  <li><strong>Изучайте фонетические символы</strong> — они помогут вам правильно произносить новые слова.</li>
                  <li><strong>Практикуйте ритм</strong> — английский язык имеет ритмическую структуру, основанную на ударных слогах.</li>
                  <li><strong>Обращайте внимание на связывание слов</strong> — в естественной речи слова часто соединяются.</li>
                  <li><strong>Не бойтесь ошибок</strong> — практика и осознанность важнее идеального произношения.</li>
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
                  href="/courses/speaking-skills/lessons/lesson-5"
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