'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState } from 'react';
import IELTSBasicsSidebar from '../../../../components/IELTSBasicsSidebar';

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

  const courseSlug = 'ielts-basics';
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
      <IELTSBasicsSidebar activeLessonId={3} />

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
                <h1 className="text-3xl font-bold text-gray-900">Урок 3: Критерии оценки IELTS</h1>
                <p className="text-gray-600">Как оценивается каждая часть экзамена • 18 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Система оценивания IELTS</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Понимание критериев оценки IELTS — ключ к успешной подготовке. Каждая часть экзамена 
                оценивается по конкретным параметрам, знание которых поможет вам сфокусироваться на правильных аспектах.
              </p>

              {/* Speaking критерии */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-orange-900 mb-4">
                  🎤 Speaking - Критерии оценки
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">1. Fluency & Coherence (25%)</h4>
                      <p className="text-orange-700 text-sm">
                        Беглость речи, связность изложения, использование связующих слов
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">2. Lexical Resource (25%)</h4>
                      <p className="text-orange-700 text-sm">
                        Словарный запас, точность использования слов, разнообразие лексики
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">3. Grammatical Range (25%)</h4>
                      <p className="text-orange-700 text-sm">
                        Разнообразие грамматических структур, точность использования
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">4. Pronunciation (25%)</h4>
                      <p className="text-orange-700 text-sm">
                        Произношение, интонация, ударение, ритм речи
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Writing критерии */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">
                  ✍️ Writing - Критерии оценки
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">1. Task Achievement (25%)</h4>
                      <p className="text-purple-700 text-sm">
                        Выполнение поставленной задачи, полнота ответа, соответствие требованиям
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">2. Coherence & Cohesion (25%)</h4>
                      <p className="text-purple-700 text-sm">
                        Логичность изложения, связность текста, использование связующих элементов
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">3. Lexical Resource (25%)</h4>
                      <p className="text-purple-700 text-sm">
                        Словарный запас, точность выбора слов, стилистическая уместность
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">4. Grammar & Accuracy (25%)</h4>
                      <p className="text-purple-700 text-sm">
                        Грамматическая точность, разнообразие структур, контроль ошибок
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reading и Listening */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-4">
                    📖 Reading - Оценка
                  </h3>
                  <div className="space-y-3">
                    <p className="text-green-700 text-sm">
                      <strong>40 вопросов</strong> = один балл за каждый правильный ответ
                    </p>
                    <div className="bg-white p-3 rounded text-xs">
                      <div className="grid grid-cols-2 gap-2">
                        <div>39-40 → 9.0</div>
                        <div>37-38 → 8.5</div>
                        <div>35-36 → 8.0</div>
                        <div>33-34 → 7.5</div>
                        <div>30-32 → 7.0</div>
                        <div>27-29 → 6.5</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">
                    👂 Listening - Оценка
                  </h3>
                  <div className="space-y-3">
                    <p className="text-blue-700 text-sm">
                      <strong>40 вопросов</strong> = один балл за каждый правильный ответ
                    </p>
                    <div className="bg-white p-3 rounded text-xs">
                      <div className="grid grid-cols-2 gap-2">
                        <div>39-40 → 9.0</div>
                        <div>37-38 → 8.5</div>
                        <div>35-36 → 8.0</div>
                        <div>32-34 → 7.5</div>
                        <div>30-31 → 7.0</div>
                        <div>26-29 → 6.5</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Общий балл */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Расчет общего балла</h3>
                
                <p className="text-gray-700 mb-4">
                  Общий балл IELTS рассчитывается как среднее арифметическое четырех навыков, 
                  округленное до ближайшего полубалла.
                </p>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">Пример расчета:</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>Listening: 6.5</p>
                      <p>Reading: 6.0</p>
                      <p>Writing: 6.0</p>
                      <p>Speaking: 7.0</p>
                    </div>
                    <div>
                      <p><strong>Среднее:</strong> (6.5 + 6.0 + 6.0 + 7.0) ÷ 4 = 6.375</p>
                      <p><strong>Округление:</strong> 6.375 → 6.5</p>
                      <p><strong>Общий балл:</strong> <span className="text-blue-600 font-bold">6.5</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Практические советы */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-yellow-900 mb-4">💡 Практические советы</h3>
                
                <ul className="list-disc pl-6 space-y-2 text-yellow-800">
                  <li>Изучите band descriptors для каждой части — это поможет понять, что именно оценивается</li>
                  <li>В Speaking и Writing качество важнее количества — лучше меньше, но точнее</li>
                  <li>В Reading и Listening каждый правильный ответ важен — не оставляйте пустых мест</li>
                  <li>Тренируйтесь оценивать свои работы по критериям IELTS</li>
                  <li>Записывайте свою речь и анализируйте по четырем критериям Speaking</li>
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
                  href="/courses/ielts-basics/lessons/lesson-5"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 hover:shadow-md transition-all duration-300"
                >
                  Перейти к следующему доступному уроку →
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