'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../hooks/useProgress';

export default function SpeakingCourse() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete, markLessonIncomplete, getCompletedLessonsCount, calculateProgress } = useProgress();
  
  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }
  
  const courseSlug = 'speaking-skills';
  const totalLessons = 9;

  const courseData = {
    id: 2,
    title: "Speaking Skills",
    description: "Развитие навыков устной речи для всех частей экзамена",
    totalLessons: totalLessons,
    icon: "🎤",
    completedLessons: getCompletedLessonsCount(courseSlug),
    progressPercentage: calculateProgress(courseSlug, totalLessons)
  };

  const lessons = [
    // Part 1
    { id: 1, title: "Part 1: Знакомство с экзаменатором", description: "Основы первой части Speaking", duration: "20 мин", type: "video", part: "Part 1" },
    
    // Part 2
    { id: 2, title: "Part 2: Структура монолога", description: "Как построить 2-минутную речь", duration: "25 мин", type: "video", part: "Part 2" },
    
    // Part 3
    { id: 3, title: "Part 3: Абстрактные темы", description: "Переход к сложным дискуссиям", duration: "22 мин", type: "video", part: "Part 3" },
    
    // Advanced Skills
    { id: 4, title: "Произношение и интонация", description: "Работа над четкостью речи", duration: "35 мин", type: "practice", part: "Advanced" },
    { id: 5, title: "Беглость речи", description: "Техники для плавного говорения", duration: "30 мин", type: "interactive", part: "Advanced" },
    { id: 6, title: "Лексическое разнообразие", description: "Расширение словарного запаса", duration: "32 мин", type: "video", part: "Advanced" },
    { id: 7, title: "Грамматическая точность", description: "Избегание типичных ошибок", duration: "28 мин", type: "practice", part: "Advanced" },
    { id: 8, title: "Связность речи", description: "Логические связки и переходы", duration: "25 мин", type: "video", part: "Advanced" },
    { id: 9, title: "Практика Speaking", description: "Комплексная тренировка навыков", duration: "45 мин", type: "practice", part: "Advanced" }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return '🎥';
      case 'practice': return '🎯';
      case 'interactive': return '💬';
      case 'exam': return '📝';
      default: return '📚';
    }
  };

  const getPartColor = (part) => {
    switch (part) {
      case 'Part 1': return 'bg-green-50 text-green-700';
      case 'Part 2': return 'bg-blue-50 text-blue-700';
      case 'Part 3': return 'bg-purple-50 text-purple-700';
      case 'Advanced': return 'bg-orange-50 text-orange-700';
      default: return 'bg-gray-50 text-gray-700';
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

        <nav className="flex-1 p-4 overflow-y-auto">
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
                
                return (
                <Link 
                  key={lesson.id}
                  href={`/courses/speaking-skills/lessons/lesson-${lesson.id}`}
                  className={`block px-3 py-2 rounded-lg cursor-pointer ${
                    completed ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{getTypeIcon(lesson.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{lesson.title}</div>
                      <div className={`text-xs px-1 py-0.5 rounded ${getPartColor(lesson.part)} inline-block mt-1`}>
                        {lesson.part}
                      </div>
                    </div>
                    {completed && <span className="ml-2 text-blue-500">✓</span>}
                  </div>
                </Link>
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

            {/* Легенда частей */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="font-semibold text-green-700">Part 1</div>
                <div className="text-xs text-green-600">Знакомство</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="font-semibold text-blue-700">Part 2</div>
                <div className="text-xs text-blue-600">Монолог</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <div className="font-semibold text-purple-700">Part 3</div>
                <div className="text-xs text-purple-600">Дискуссия</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg text-center">
                <div className="font-semibold text-orange-700">Advanced</div>
                <div className="text-xs text-orange-600">Продвинутое</div>
              </div>
            </div>
          </div>

          {/* Список уроков */}
          <div className="space-y-4">
            {lessons.map((lesson) => {
              const completed = isLessonCompleted(courseSlug, lesson.id);
              
              return (
              <div key={lesson.id} className={`bg-white rounded-lg p-6 shadow-sm border-l-4 ${
                completed ? 'border-blue-500' : 'border-gray-300'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-3">{getTypeIcon(lesson.type)}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
                      <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getPartColor(lesson.part)}`}>
                        {lesson.part}
                      </span>
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
                        <Link 
                          href={`/courses/speaking-skills/lessons/lesson-${lesson.id}`}
                          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                            completed 
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {completed ? 'Повторить урок' : 'Начать урок'}
                        </Link>
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
    </div>
  );
} 