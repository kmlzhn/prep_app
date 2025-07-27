'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState } from 'react';
import IELTSBasicsSidebar from '../../../../components/IELTSBasicsSidebar';

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

  const courseSlug = 'ielts-basics';
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
      <IELTSBasicsSidebar activeLessonId={2} />

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
                <h1 className="text-3xl font-bold text-gray-900">Урок 2: Структура экзамена IELTS</h1>
                <p className="text-gray-600">Детальный обзор всех частей экзамена IELTS • 20 минут</p>
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
            

            {/* Теоретический материал */}
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Структура экзамена IELTS</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Экзамен IELTS состоит из четырех частей, которые проверяют все основные языковые навыки. 
                Общая продолжительность экзамена составляет примерно 2 часа 45 минут.
              </p>

              {/* Listening */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  👂 1. Listening (Аудирование) - 30 минут
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Формат:</h4>
                    <ul className="list-disc pl-5 text-blue-700 space-y-1">
                      <li>4 секции, 40 вопросов</li>
                      <li>Запись проигрывается только один раз</li>
                      <li>Время на перенос ответов - 10 минут</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Секции:</h4>
                    <ul className="list-disc pl-5 text-blue-700 space-y-1">
                      <li>Секция 1: Повседневная ситуация (диалог)</li>
                      <li>Секция 2: Повседневная ситуация (монолог)</li>
                      <li>Секция 3: Образовательная ситуация (диалог)</li>
                      <li>Секция 4: Академическая лекция (монолог)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Reading */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-green-900 mb-4">
                  📖 2. Reading (Чтение) - 60 минут
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Формат:</h4>
                    <ul className="list-disc pl-5 text-green-700 space-y-1">
                      <li>3 текста, 40 вопросов</li>
                      <li>Время на перенос ответов НЕ предоставляется</li>
                      <li>Тексты от простого к сложному</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Типы текстов:</h4>
                    <ul className="list-disc pl-5 text-green-700 space-y-1">
                      <li><strong>Academic:</strong> научные статьи, журналы</li>
                      <li><strong>General:</strong> газеты, брошюры, инструкции</li>
                      <li>Каждый текст 650-1000 слов</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Writing */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">
                  ✍️ 3. Writing (Письмо) - 60 минут
                </h3>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Task 1 (20 минут)</h4>
                      <p className="text-purple-700 text-sm mb-2">Минимум 150 слов</p>
                      <p className="text-purple-600">
                        <strong>Academic:</strong> Описание графика, диаграммы, таблицы<br/>
                        <strong>General:</strong> Письмо (формальное/неформальное)
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Task 2 (40 минут)</h4>
                      <p className="text-purple-700 text-sm mb-2">Минимум 250 слов</p>
                      <p className="text-purple-600">
                        Эссе на заданную тему: согласие/несогласие, причины/решения, проблемы/преимущества
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800 text-sm">
                      <strong>Важно:</strong> Task 2 оценивается в два раза больше, чем Task 1
                    </p>
                  </div>
                </div>
              </div>

              {/* Speaking */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-orange-900 mb-4">
                  🎤 4. Speaking (Говорение) - 11-14 минут
                </h3>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">Part 1 (4-5 мин)</h4>
                      <p className="text-orange-600 text-sm">
                        Знакомство и вопросы о себе, семье, работе, учебе, хобби
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">Part 2 (3-4 мин)</h4>
                      <p className="text-orange-600 text-sm">
                        Монолог на 2 минуты по карточке. 1 минута на подготовку
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">Part 3 (4-5 мин)</h4>
                      <p className="text-orange-600 text-sm">
                        Дискуссия на абстрактные темы, связанные с Part 2
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Общая информация */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Порядок проведения экзамена</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">📅 В один день:</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Listening (30 мин)</li>
                      <li>Reading (60 мин)</li>
                      <li>Writing (60 мин)</li>
                    </ul>
                    <p className="text-sm text-gray-600 mt-2">Между секциями небольшие перерывы</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">🗣️ Отдельно:</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Speaking (11-14 мин)</li>
                      <li>Может быть в тот же день или в течение недели</li>
                      <li>Индивидуальное интервью с экзаменатором</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Ключевые моменты:</h4>
                <ul className="list-disc pl-5 text-blue-700 space-y-1">
                  <li>Все секции обязательны для сдачи</li>
                  <li>Результат действителен 2 года</li>
                  <li>Можно пересдавать экзамен неограниченное количество раз</li>
                  <li>Результаты доступны через 13 дней после экзамена</li>
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
                  href="/courses/ielts-basics"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 hover:shadow-md transition-all duration-300"
                >
                  Вернуться к курсу
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