'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState } from 'react';
import SpeakingSkillsSidebar from '../../../../components/SpeakingSkillsSidebar';

export default function Lesson2() {
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
  const lessonId = 2;
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
      <SpeakingSkillsSidebar activeLessonId={2} />

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
                <h1 className="text-3xl font-bold text-gray-900">Урок 2: Part 2: Структура монолога</h1>
                <p className="text-gray-600">Как построить 2-минутную речь • 25 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Вторая часть Speaking экзамена</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Part 2 Speaking экзамена IELTS — это монологическая часть, в которой вам нужно говорить на заданную тему в течение 1-2 минут. Эта часть считается наиболее сложной для многих кандидатов, так как требует хорошей подготовки и структурированного ответа.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Структура Part 2</h3>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>Карточка с заданием:</strong> Экзаменатор даст вам карточку с темой и пунктами, которые нужно раскрыть.</li>
                <li><strong>Время на подготовку:</strong> У вас будет 1 минута на подготовку и заметки.</li>
                <li><strong>Монолог:</strong> Вам нужно говорить 1-2 минуты без перерыва.</li>
                <li><strong>Заключительный вопрос:</strong> После вашего монолога экзаменатор может задать 1-2 дополнительных вопроса по теме.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Типичные темы Part 2</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">👤 Описание человека</h4>
                  <p className="text-blue-800 text-sm mb-2">Пример задания:</p>
                  <p className="text-blue-800 text-sm italic">
                    Describe a person who has had an important influence on your life.<br/>
                    You should say:<br/>
                    • who this person is<br/>
                    • how you first met them<br/>
                    • what qualities you admire in them<br/>
                    • and explain how they have influenced your life.
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">🏙️ Описание места</h4>
                  <p className="text-green-800 text-sm mb-2">Пример задания:</p>
                  <p className="text-green-800 text-sm italic">
                    Describe a place you like to visit but you don't want to live there.<br/>
                    You should say:<br/>
                    • where this place is<br/>
                    • how often you go there<br/>
                    • what you do there<br/>
                    • and explain why you wouldn't like to live there.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Структура ответа</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Рекомендуемая структура монолога:</h4>
                <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                  <li><strong>Введение (10-15 секунд)</strong> — представьте тему и основную идею вашего рассказа.</li>
                  <li><strong>Основная часть (60-80 секунд)</strong> — последовательно раскройте все пункты из карточки.</li>
                  <li><strong>Заключение (10-15 секунд)</strong> — подведите итог или выразите свое отношение к теме.</li>
                </ol>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Как эффективно использовать время подготовки</h3>
              
              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <ul className="list-disc pl-6 text-yellow-800 space-y-2">
                  <li><strong>Быстро прочитайте все задание</strong> — убедитесь, что вы понимаете тему и все пункты.</li>
                  <li><strong>Делайте краткие заметки</strong> — используйте ключевые слова, а не полные предложения.</li>
                  <li><strong>Структурируйте ответ</strong> — распределите информацию по введению, основной части и заключению.</li>
                  <li><strong>Подумайте о связках</strong> — подготовьте фразы для плавного перехода между пунктами.</li>
                  <li><strong>Если не можете вспомнить реальный пример</strong> — не бойтесь придумать его.</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h4 className="font-semibold text-orange-800 mb-2">💡 Полезные советы:</h4>
                <ul className="list-disc pl-6 text-orange-700 space-y-2">
                  <li>Говорите четко и с уверенностью, даже если вы не полностью уверены в своем ответе.</li>
                  <li>Используйте разнообразную лексику и грамматические структуры.</li>
                  <li>Не останавливайтесь и не делайте длинных пауз — если забыли слово, перефразируйте мысль.</li>
                  <li>Практикуйтесь с таймером — научитесь чувствовать, сколько времени занимает 2-минутный монолог.</li>
                  <li>Развивайте идеи — не просто отвечайте на пункты, но и объясняйте "почему" и "как".</li>
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
                  href="/courses/speaking-skills/lessons/lesson-3"
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