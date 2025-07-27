'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState } from 'react';
import SpeakingSkillsSidebar from '../../../../components/SpeakingSkillsSidebar';

export default function Lesson3() {
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
  const lessonId = 3;
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
      <SpeakingSkillsSidebar activeLessonId={3} />

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
                <h1 className="text-3xl font-bold text-gray-900">Урок 3: Part 3: Абстрактные темы</h1>
                <p className="text-gray-600">Переход к сложным дискуссиям • 22 минуты</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Третья часть Speaking экзамена</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Part 3 Speaking экзамена IELTS — это дискуссионная часть, которая следует сразу за монологом из Part 2. В этой части экзаменатор задает более абстрактные вопросы, связанные с темой из Part 2, и ожидает от вас развернутых, аналитических ответов.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Особенности Part 3</h3>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>Продолжительность:</strong> 4-5 минут.</li>
                <li><strong>Формат:</strong> Диалог с экзаменатором (вопрос-ответ).</li>
                <li><strong>Сложность:</strong> Более высокий уровень, чем в Part 1 и Part 2.</li>
                <li><strong>Тематика:</strong> Абстрактные темы, связанные с предыдущим монологом.</li>
                <li><strong>Цель:</strong> Оценка способности анализировать, сравнивать, обобщать и высказывать мнение.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Типы вопросов в Part 3</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">🔄 Сравнение</h4>
                  <ul className="list-disc pl-4 text-blue-800 space-y-1 text-sm">
                    <li>How do attitudes to X differ between younger and older generations?</li>
                    <li>What are the differences between X in your country and Western countries?</li>
                    <li>How has X changed over the last few decades?</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">🧠 Анализ</h4>
                  <ul className="list-disc pl-4 text-green-800 space-y-1 text-sm">
                    <li>Why do you think people tend to X?</li>
                    <li>What factors contribute to X in modern society?</li>
                    <li>How does X affect people's daily lives?</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">🔮 Предположение</h4>
                  <ul className="list-disc pl-4 text-purple-800 space-y-1 text-sm">
                    <li>Do you think X will become more important in the future?</li>
                    <li>How might X change in the next 20 years?</li>
                    <li>What would happen if everyone started to X?</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">⚖️ Оценка</h4>
                  <ul className="list-disc pl-4 text-yellow-800 space-y-1 text-sm">
                    <li>Do you think X is a positive or negative development?</li>
                    <li>To what extent do you agree that X is important?</li>
                    <li>How beneficial is X for society?</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Стратегии ответа в Part 3</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                  <li><strong>PEEL структура</strong> — Point (основная мысль), Explanation (объяснение), Example (пример), Link (связь с вопросом).</li>
                  <li><strong>Рассмотрите разные точки зрения</strong> — "On one hand... on the other hand..."</li>
                  <li><strong>Используйте условные предложения</strong> — "If this trend continues, it might lead to..."</li>
                  <li><strong>Приводите конкретные примеры</strong> — из личного опыта, новостей, истории.</li>
                  <li><strong>Избегайте категоричных утверждений</strong> — используйте "I believe", "In my view", "It seems that".</li>
                </ol>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Полезные фразы для Part 3</h3>
              
              <div className="bg-gray-100 p-6 rounded-lg mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Для выражения мнения:</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                      <li>In my opinion...</li>
                      <li>I believe that...</li>
                      <li>From my perspective...</li>
                      <li>It seems to me that...</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Для сравнения:</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                      <li>In contrast to...</li>
                      <li>Compared with...</li>
                      <li>Similarly/Likewise...</li>
                      <li>While X..., Y...</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Для предположений:</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                      <li>It's likely that...</li>
                      <li>This might/could lead to...</li>
                      <li>In the foreseeable future...</li>
                      <li>If this trend continues...</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Для обобщения:</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                      <li>On the whole...</li>
                      <li>Generally speaking...</li>
                      <li>By and large...</li>
                      <li>Taking everything into account...</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Пример ответа в Part 3</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <p className="text-blue-800 mb-2"><strong>Вопрос:</strong> How do you think technology will change education in the future?</p>
                <p className="text-blue-700 italic">
                  "I believe that technology will fundamentally transform education in several ways. <span className="text-purple-600">[Point]</span> One of the most significant changes will likely be the shift towards more personalized learning experiences, where AI systems can adapt content to each student's individual pace and learning style. <span className="text-purple-600">[Explanation]</span> For instance, there are already platforms like Duolingo that use algorithms to identify a learner's weaknesses and adjust lessons accordingly, making the learning process more efficient. <span className="text-purple-600">[Example]</span> This kind of personalization could help address one of the biggest challenges in traditional education: the fact that different students learn in different ways and at different speeds. <span className="text-purple-600">[Link]</span>
                  
                  However, I think it's important to maintain a balance. While technology offers many advantages, human interaction remains crucial for developing social skills and critical thinking. So rather than replacing teachers, technology will likely become a powerful tool that enhances the educational experience while preserving the irreplaceable human element of teaching."
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h4 className="font-semibold text-orange-800 mb-2">💡 Советы для успешного прохождения Part 3:</h4>
                <ul className="list-disc pl-6 text-orange-700 space-y-2">
                  <li>Развивайте свои ответы, но не уходите слишком далеко от темы.</li>
                  <li>Не бойтесь пауз — лучше взять 1-2 секунды на размышление, чем давать неструктурированный ответ.</li>
                  <li>Если вы не уверены в вопросе, попросите экзаменатора уточнить его.</li>
                  <li>Практикуйтесь обсуждать абстрактные темы — читайте аналитические статьи и смотрите дебаты.</li>
                  <li>Расширяйте словарный запас академической лексики и связующих фраз.</li>
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
                  href="/courses/speaking-skills/lessons/lesson-4"
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