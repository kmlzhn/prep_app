'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../hooks/useProgress';

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { getTotalProgress, getCompletedLessonsCount, calculateProgress, resetProgress, loading } = useProgress();

  if (!isLoaded || loading) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  // Получаем реальный прогресс пользователя
  const totalProgress = getTotalProgress();
  
  const courseProgress = {
    lessonsCompleted: totalProgress.completed,
    totalLessons: totalProgress.total,
    progressPercentage: totalProgress.percentage
  };

  const popularLessons = [
    { id: 1, title: "Введение в IELTS", completed: getCompletedLessonsCount('ielts-basics') > 0, course: 'ielts-basics', lesson: 1 },
    { id: 2, title: "Speaking: Part 1 - Знакомство", completed: getCompletedLessonsCount('speaking-skills') > 0, course: 'speaking-skills', lesson: 1 },
    { id: 3, title: "Writing: Task 1 - Описание графиков", completed: getCompletedLessonsCount('writing-mastery') > 0, course: 'writing-mastery', lesson: 2 }
  ];

  const courseStructure = [
    {
      id: 1,
      slug: "ielts-basics",
      title: "Основы IELTS",
      description: "Знакомство с форматом экзамена и базовые навыки",
      lessons: 8,
      icon: "📚"
    },
    {
      id: 2,
      slug: "speaking-skills",
      title: "Speaking Skills",
      description: "Развитие навыков устной речи для всех частей экзамена",
      lessons: 25,
      icon: "🎤"
    },
    {
      id: 3,
      slug: "writing-mastery",
      title: "Writing Mastery",
      description: "Техники написания эссе и описания графиков",
      lessons: 22,
      icon: "✍️"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель - скрыта на мобильных */}
      <div className="hidden lg:flex w-80 bg-white shadow-sm border-r border-gray-200 flex-col">
        {/* Логотип */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center text-2xl font-bold text-blue-600">
            🧠 prepAI
          </Link>
        </div>

        {/* Навигация */}
        <nav className="flex-1 p-4">
          {/* Обзор */}
          <div className="mb-6">
            <Link href="/dashboard" className="flex items-center px-3 py-2 text-blue-600 bg-blue-50 rounded-lg font-medium">
              🏠 Обзор
            </Link>
          </div>

          {/* Темы курса */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
              ТЕМЫ КУРСА
            </h3>
            
            <div className="space-y-1">
              {courseStructure.map((course) => {
                const completed = getCompletedLessonsCount(course.slug);
                const progress = calculateProgress(course.slug, course.lessons);
                
                return (
                  <Link 
                    key={course.id}
                    href={`/courses/${course.slug}`} 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span>{course.icon} {course.title}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{completed}/{course.lessons}</span>
                        {progress > 0 && (
                          <div className="w-8 h-1 bg-gray-200 rounded-full">
                            <div 
                              className="h-1 bg-blue-500 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Нижняя часть */}
        <div className="p-4 border-t border-gray-200 space-y-3">
          
          
          <div className="flex items-center px-3 py-2">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
              <span className="ml-2 text-sm text-gray-600">
                {user?.firstName && user?.lastName 
                  ? `${user.firstName} ${user.lastName}` 
                  : user?.firstName 
                  || user?.username 
                  || user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] 
                  || 'Студент'}
              </span>
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex-1 flex flex-col">
        {/* Мобильный хедер */}
        <div className="lg:hidden bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-xl font-bold text-blue-600">
              🧠 prepAI
            </Link>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>

        {/* Главная область */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Приветствие */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Добро пожаловать на платформу
            </h1>
            <p className="text-gray-600">
              Здесь вы найдете все необходимые уроки для подготовки к IELTS с персональным ИИ-помощником.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
            {/* Ваш прогресс */}
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border-l-4 border-blue-500">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Ваш прогресс</h2>
              
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">
                    Вы просмотрели {courseProgress.lessonsCompleted} из {courseProgress.totalLessons} уроков
                  </span>
                </div>
                
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${courseProgress.progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <Link href="/courses" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                Продолжить обучение →
              </Link>
            </div>

            {/* Популярные уроки */}
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border-l-4 border-blue-500">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Популярные уроки</h2>
              
              <div className="space-y-3">
                {popularLessons.map((lesson) => (
                  <Link 
                    key={lesson.id} 
                    href={`/courses/${lesson.course}/lessons/lesson-${lesson.lesson}`}
                    className="flex items-center hover:text-blue-600"
                  >
                    <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${lesson.completed ? 'bg-blue-500' : 'bg-gray-300'}`}>
                      {lesson.completed && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className="text-sm text-gray-700">{lesson.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Структура курса */}
          <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border-l-4 border-blue-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Структура курса</h2>
            </div>
            
            <div className="space-y-6">
              {courseStructure.map((section) => {
                const completed = getCompletedLessonsCount(section.slug);
                const progress = calculateProgress(section.slug, section.lessons);
                
                return (
                  <div key={section.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-xl lg:text-2xl mr-3">{section.icon}</span>
                          <h3 className="text-base lg:text-lg font-semibold text-gray-900">{section.title}</h3>
                          <span className="ml-auto text-sm text-gray-500">{completed}/{section.lessons} уроков</span>
                        </div>
                        <p className="text-gray-600 mb-3 text-sm lg:text-base">{section.description}</p>
                        
                        {/* Прогресс бар */}
                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-500">Прогресс</span>
                            <span className="text-xs text-gray-500">{progress}%</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <Link href={`/courses/${section.slug}`} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm lg:text-base">
                          {completed > 0 ? 'Продолжить' : 'Начать'} →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 