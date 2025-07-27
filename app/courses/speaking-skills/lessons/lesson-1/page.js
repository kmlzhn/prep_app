'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState } from 'react';
import SpeakingSkillsSidebar from '../../../../components/SpeakingSkillsSidebar';

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

  const courseSlug = 'speaking-skills';
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
      <SpeakingSkillsSidebar activeLessonId={1} />

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
              <span className="text-4xl mr-4">🎥</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Урок 1: Знакомство с экзаменатором</h1>
                <p className="text-gray-600">Основы первой части Speaking • 20 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Первая часть Speaking экзамена</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Part 1 Speaking экзамена IELTS — это знакомство с экзаменатором и ответы на общие вопросы о вас и вашей жизни. Эта часть длится 4-5 минут и является важным первым впечатлением, которое вы производите на экзаменатора.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Структура Part 1</h3>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>Представление:</strong> Экзаменатор представится и попросит вас подтвердить вашу личность.</li>
                <li><strong>Общие вопросы:</strong> Вам зададут 2-3 вопроса о вас (имя, работа/учеба).</li>
                <li><strong>Тематические вопросы:</strong> Экзаменатор выберет 2-3 темы и задаст по каждой 3-4 вопроса.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Типичные темы Part 1</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">🏠 Дом и район проживания</h4>
                  <ul className="list-disc pl-4 text-blue-800 space-y-1 text-sm">
                    <li>Где вы живете?</li>
                    <li>Как долго вы там живете?</li>
                    <li>Что вам нравится в вашем районе?</li>
                    <li>Хотели бы вы переехать в другое место?</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">🎓 Работа или учеба</h4>
                  <ul className="list-disc pl-4 text-green-800 space-y-1 text-sm">
                    <li>Чем вы занимаетесь?</li>
                    <li>Почему вы выбрали эту профессию/специальность?</li>
                    <li>Что вам нравится в вашей работе/учебе?</li>
                    <li>Планируете ли вы сменить профессию в будущем?</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">🎭 Хобби и свободное время</h4>
                  <ul className="list-disc pl-4 text-purple-800 space-y-1 text-sm">
                    <li>Чем вы любите заниматься в свободное время?</li>
                    <li>Как давно у вас это хобби?</li>
                    <li>С кем вы обычно проводите свободное время?</li>
                    <li>Есть ли хобби, которым вы хотели бы заняться?</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">👪 Семья и друзья</h4>
                  <ul className="list-disc pl-4 text-yellow-800 space-y-1 text-sm">
                    <li>Есть ли у вас большая семья?</li>
                    <li>Как часто вы видитесь с родственниками?</li>
                    <li>Кто ваш лучший друг?</li>
                    <li>Какие качества вы цените в друзьях?</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Стратегии успешного прохождения Part 1</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Давайте развернутые ответы</strong> — не отвечайте просто "да" или "нет". Добавляйте детали и примеры.</li>
                  <li><strong>Говорите 2-3 предложения</strong> на каждый вопрос — не слишком коротко и не слишком длинно.</li>
                  <li><strong>Используйте разнообразную лексику</strong> — покажите свой словарный запас.</li>
                  <li><strong>Будьте естественны</strong> — не пытайтесь звучать слишком формально или использовать заученные фразы.</li>
                  <li><strong>Практикуйтесь в разговоре на разные темы</strong> — чтобы быть готовым к любым вопросам.</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h4 className="font-semibold text-orange-800 mb-2">💡 Полезный совет:</h4>
                <p className="text-orange-700">
                  Помните, что Part 1 — это разминка перед более сложными частями экзамена. Экзаменатор хочет, чтобы вы расслабились и начали говорить свободно. Используйте эту возможность, чтобы продемонстрировать свою беглость речи и уверенность. Не бойтесь улыбаться и поддерживать зрительный контакт — это создаст положительное впечатление.
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
                  href="/courses/speaking-skills/lessons/lesson-2"
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