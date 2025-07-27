'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import AIChat from '../../components/AIChat';
import { useProgress } from '../../hooks/useProgress';

export default function BasicsCourse() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete, markLessonIncomplete, getCompletedLessonsCount, calculateProgress } = useProgress();

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'ielts-basics';
  const totalLessons = 8;

  const courseData = {
    id: 1,
    title: "Основы IELTS",
    description: "Знакомство с форматом экзамена и базовые навыки",
    totalLessons: totalLessons,
    icon: "📚",
    completedLessons: getCompletedLessonsCount(courseSlug),
    progressPercentage: calculateProgress(courseSlug, totalLessons)
  };

  const lessons = [
    {
      id: 1,
      title: "Введение в IELTS",
      description: "Что такое IELTS и зачем он нужен",
      duration: "15 мин",
      completed: true,
      type: "video"
    },
    {
      id: 2,
      title: "Структура экзамена",
      description: "Детальный обзор всех частей экзамена IELTS",
      duration: "20 мин",
      completed: true,
      type: "video"
    },
    {
      id: 3,
      title: "Критерии оценки",
      description: "Как оценивается каждая часть экзамена",
      duration: "18 мин",
      completed: true,
      type: "text"
    },
    {
      id: 4,
      title: "Стратегии подготовки",
      description: "Эффективные методы подготовки к экзамену",
      duration: "25 мин",
      completed: false,
      type: "video"
    },
    {
      id: 5,
      title: "Планирование обучения",
      description: "Как составить персональный план подготовки",
      duration: "22 мин",
      completed: false,
      type: "interactive"
    },
    {
      id: 6,
      title: "Общие ошибки новичков",
      description: "Чего следует избегать при подготовке",
      duration: "16 мин",
      completed: false,
      type: "text"
    },
    {
      id: 7,
      title: "Ресурсы для подготовки",
      description: "Полезные материалы и источники",
      duration: "12 мин",
      completed: false,
      type: "text"
    },
    {
      id: 8,
      title: "Итоговый тест",
      description: "Проверьте свои знания основ IELTS",
      duration: "30 мин",
      completed: false,
      type: "quiz"
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return '🎥';
      case 'text': return '📄';
      case 'interactive': return '🎯';
      case 'quiz': return '❓';
      default: return '📝';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <div className="hidden lg:flex w-80 bg-white shadow-sm border-r border-gray-200 flex-col">
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center text-2xl font-bold text-blue-600">
            🧠 prepAI
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <div className="mb-6">
            <Link href="/dashboard" className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 rounded-lg font-medium">
              ← Назад к обзору
            </Link>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
              {courseData.icon} {courseData.title}
            </h3>
            
            <div className="space-y-1">
              {lessons.map((lesson) => {
                const completed = isLessonCompleted(courseSlug, lesson.id);
                
                // Для уроков с отдельными страницами создаем ссылки
                if (lesson.id <= 8) {
                  return (
                    <Link 
                      key={lesson.id}
                      href={`/courses/ielts-basics/lessons/lesson-${lesson.id}`}
                      className={`block px-3 py-2 rounded-lg transition-colors ${
                        completed ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">{getTypeIcon(lesson.type)}</span>
                        <span className="text-sm font-medium">{lesson.id}. {lesson.title}</span>
                        {completed && <span className="ml-auto text-blue-500">✓</span>}
                      </div>
                    </Link>
                  );
                }
                
                // Для остальных уроков оставляем как есть
                return (
                <div key={lesson.id} className={`px-3 py-2 rounded-lg cursor-pointer ${
                    completed ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}>
                  <div className="flex items-center">
                    <span className="mr-2">{getTypeIcon(lesson.type)}</span>
                    <span className="text-sm font-medium">{lesson.id}. {lesson.title}</span>
                      {completed && <span className="ml-auto text-blue-500">✓</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <SignedIn>
            <div className="flex items-center px-3 py-2">
              <UserButton afterSignOutUrl="/" />
              <span className="ml-2 text-sm text-gray-600">
                {user?.firstName || 'Студент'}
              </span>
            </div>
          </SignedIn>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex-1 flex flex-col">
        {/* Мобильный хедер */}
        <div className="lg:hidden bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-blue-600">← Назад</Link>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>

        <main className="flex-1 p-4 lg:p-8">
          {/* Заголовок курса */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">{courseData.icon}</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{courseData.title}</h1>
                <p className="text-gray-600">{courseData.description}</p>
              </div>
            </div>

            {/* Прогресс */}
            <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Ваш прогресс</h3>
                <span className="text-sm text-gray-600">
                  {courseData.completedLessons} из {courseData.totalLessons} уроков
                </span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${courseData.progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Список уроков */}
          <div className="space-y-4">
            {lessons.map((lesson) => {
              const completed = isLessonCompleted(courseSlug, lesson.id);
              
              const handleLessonToggle = () => {
                if (completed) {
                  markLessonIncomplete(courseSlug, lesson.id);
                } else {
                  markLessonComplete(courseSlug, lesson.id);
                }
              };

              return (
              <div key={lesson.id} className={`bg-white rounded-lg p-6 shadow-sm border-l-4 ${
                  completed ? 'border-blue-500' : 'border-gray-300'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-3">{getTypeIcon(lesson.type)}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
                        {completed && (
                        <span className="ml-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                          Завершено
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{lesson.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Продолжительность: {lesson.duration}</span>
                        <div className="flex items-center space-x-2">
                          {/* Кнопки для уроков с отдельными страницами */}
                          {lesson.id <= 8 ? (
                            <Link 
                              href={`/courses/ielts-basics/lessons/lesson-${lesson.id}`}
                              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                                completed 
                                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                            >
                              {completed ? 'Повторить урок' : 'Начать урок'}
                            </Link>
                          ) : (
                            <button 
                              onClick={handleLessonToggle}
                              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                                completed 
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                            >
                              {completed ? 'Повторить' : 'Начать урок'}
                            </button>
                          )}
                          {completed && (
                            <button 
                              onClick={() => markLessonIncomplete(courseSlug, lesson.id)}
                              className="px-3 py-2 text-gray-400 hover:text-red-600 transition-colors"
                              title="Отметить как не завершенный"
                            >
                              ✗
                      </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
      
      {/* ИИ-помощник */}
      <AIChat 
        courseTitle="Основы IELTS" 
        currentTopic="IELTS Basics"
      />
    </div>
  );
} 