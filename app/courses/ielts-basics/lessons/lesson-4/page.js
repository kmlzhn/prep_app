'use client';

import IELTSBasicsSidebar from '../../../../components/IELTSBasicsSidebar';
import Link from 'next/link';
import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useProgress } from '../../../../hooks/useProgress';
import { useState } from 'react';

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

  const courseSlug = 'ielts-basics';
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
      <IELTSBasicsSidebar activeLessonId={4} />
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
                <h1 className="text-3xl font-bold text-gray-900">Урок 4: Стратегии подготовки</h1>
                <p className="text-gray-600">Эффективные методы подготовки к экзамену IELTS</p>
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
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Почему важны стратегии?</h2>
              <p className="text-gray-700 mb-6">Правильная стратегия подготовки позволяет не только сэкономить время, но и повысить итоговый балл. Важно не просто учить материал, а учиться эффективно!</p>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ключевые стратегии подготовки к IELTS</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>Планируйте занятия:</strong> Составьте расписание и придерживайтесь его. Регулярность важнее длительности.</li>
                <li><strong>Практикуйте все секции:</strong> Не фокусируйтесь только на одной части экзамена. Развивайте Listening, Reading, Writing и Speaking.</li>
                <li><strong>Используйте реальные материалы:</strong> Проходите пробные тесты, используйте официальные Cambridge IELTS книги.</li>
                <li><strong>Анализируйте ошибки:</strong> После каждого теста разбирайте свои ошибки и работайте над ними.</li>
                <li><strong>Тренируйте тайм-менеджмент:</strong> Учитесь укладываться в отведённое время на каждую секцию.</li>
                <li><strong>Записывайте свою речь:</strong> Для Speaking записывайте себя на диктофон и анализируйте ответы.</li>
                <li><strong>Читайте и слушайте на английском:</strong> Включайте английский в повседневную жизнь: подкасты, статьи, видео.</li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Советы от экспертов</h4>
                <ul className="list-disc pl-6 text-blue-800 space-y-1">
                  <li>Ведите дневник ошибок и успехов.</li>
                  <li>Соберите список типовых тем для Speaking и Writing.</li>
                  <li>Используйте таймер при выполнении заданий.</li>
                  <li>Общайтесь с другими студентами, ищите speaking-партнёра.</li>
                  <li>Не бойтесь делать ошибки — это часть процесса обучения!</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-yellow-900 mb-2">⚡ Пример недельного плана</h4>
                <ul className="list-disc pl-6 text-yellow-800 space-y-1">
                  <li>Пн: Listening + анализ ошибок</li>
                  <li>Вт: Reading + словарь</li>
                  <li>Ср: Writing (Task 1) + грамматика</li>
                  <li>Чт: Speaking + произношение</li>
                  <li>Пт: Writing (Task 2) + эссе</li>
                  <li>Сб: Пробный тест (все секции)</li>
                  <li>Вс: Отдых или повторение сложных тем</li>
                </ul>
              </div>
              <p className="text-gray-700">Главное — не останавливаться и верить в свой прогресс! Удачи на экзамене!</p>
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
                  href="/courses/ielts-basics/lessons/lesson-5"
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