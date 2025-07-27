'use client';

import IELTSBasicsSidebar from '../../../../components/IELTSBasicsSidebar';
import Link from 'next/link';
import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useProgress } from '../../../../hooks/useProgress';
import { useState } from 'react';

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

  const courseSlug = 'ielts-basics';
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
      <IELTSBasicsSidebar activeLessonId={7} />
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
              <span className="text-4xl mr-4">📄</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Урок 7: Ресурсы для подготовки</h1>
                <p className="text-gray-600">Полезные материалы и источники для успешной подготовки к IELTS</p>
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
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Лучшие ресурсы для подготовки к IELTS</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>Официальные Cambridge IELTS книги:</strong> Самые достоверные пробники и задания.</li>
                <li><strong>British Council LearnEnglish:</strong> Бесплатные упражнения, видео и советы.</li>
                <li><strong>IELTS Liz, IELTS Simon:</strong> Популярные сайты с объяснениями стратегий и примерами ответов.</li>
                <li><strong>BBC Learning English, TED Talks:</strong> Для тренировки Listening и расширения словарного запаса.</li>
                <li><strong>Quizlet:</strong> Готовые карточки для изучения лексики по темам IELTS.</li>
                <li><strong>IELTS Speaking Partner:</strong> Telegram/WhatsApp чаты для поиска собеседников.</li>
                <li><strong>Официальные мобильные приложения:</strong> IELTS Prep, IELTS Word Power и др.</li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Как выбрать ресурсы?</h4>
                <ul className="list-disc pl-6 text-blue-800 space-y-1">
                  <li>Используйте только актуальные материалы (последние издания Cambridge IELTS).</li>
                  <li>Сравнивайте разные источники, чтобы понять структуру заданий.</li>
                  <li>Не ограничивайтесь только учебниками — слушайте подкасты, смотрите видео, читайте статьи.</li>
                  <li>Проверяйте отзывы о ресурсах на форумах и в соцсетях.</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-green-900 mb-2">✅ Советы по использованию ресурсов</h4>
                <ul className="list-disc pl-6 text-green-800 space-y-1">
                  <li>Ведите список полезных ссылок и делитесь ими с другими студентами.</li>
                  <li>Регулярно обновляйте свой набор материалов.</li>
                  <li>Сохраняйте лучшие примеры эссе, ответов и аудио для повторения.</li>
                  <li>Используйте мобильные приложения для тренировки в дороге.</li>
                </ul>
              </div>
              <p className="text-gray-700">Грамотно подобранные ресурсы — залог эффективной и быстрой подготовки к IELTS!</p>
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
                  href="/courses/ielts-basics/lessons/lesson-8"
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