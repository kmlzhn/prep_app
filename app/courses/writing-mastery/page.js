'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';

import AIChat from '../../components/AIChat';
import { useProgress } from '../../hooks/useProgress';

export default function WritingCourse() {
  const { isLoaded, isSignedIn, user } = useUser();
  
  const { isLessonCompleted, markLessonComplete, markLessonIncomplete, getCompletedLessonsCount, calculateProgress } = useProgress();

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'writing-mastery';

  const courseData = {
    id: 3,
    title: "Writing Mastery",
    description: "Техники написания эссе и описания графиков",
    totalLessons: 21,
    icon: "✍️",
    completedLessons: getCompletedLessonsCount(courseSlug),
    progressPercentage: calculateProgress(courseSlug, 21)
  };

  const lessons = [
    // Task 1
    { id: 1, title: "Обзор Writing секции", description: "Структура и требования Writing", duration: "20 мин", type: "video", task: "Основы" },
    { id: 2, title: "Task 1: Описание графиков", description: "Основы описания данных", duration: "25 мин", type: "video", task: "Task 1" },
    { id: 3, title: "Линейные графики", description: "Описание трендов и изменений", duration: "30 мин", type: "practice", task: "Task 1" },
    { id: 4, title: "Столбчатые диаграммы", description: "Сравнение категорий данных", duration: "28 мин", type: "practice", task: "Task 1" },
    { id: 5, title: "Круговые диаграммы", description: "Описание пропорций и долей", duration: "25 мин", type: "practice", task: "Task 1" },
    { id: 6, title: "Таблицы и карты", description: "Работа со сложными данными", duration: "32 мин", type: "practice", task: "Task 1" },
    { id: 7, title: "Академическая лексика", description: "Словарь для описания данных", duration: "35 мин", type: "video", task: "Task 1" },
    { id: 8, title: "Сравнения и контрасты", description: "Языковые структуры для сравнений", duration: "28 мин", type: "interactive", task: "Task 1" },
    
    // Task 2
    { id: 9, title: "Task 2: Структура эссе", description: "Основы написания эссе", duration: "30 мин", type: "video", task: "Task 2" },
    { id: 10, title: "Типы эссе", description: "Opinion, Discussion, Problem-Solution", duration: "35 мин", type: "video", task: "Task 2" },
    { id: 11, title: "Введение и заключение", description: "Эффективные начало и конец", duration: "25 мин", type: "practice", task: "Task 2" },
    { id: 12, title: "Основные параграфы", description: "Развитие идей и аргументов", duration: "30 мин", type: "practice", task: "Task 2" },
    { id: 13, title: "Логические связки", description: "Cohesion и coherence", duration: "22 мин", type: "interactive", task: "Task 2" },
    { id: 14, title: "Примеры и доказательства", description: "Поддержка аргументов", duration: "28 мин", type: "video", task: "Task 2" },
    { id: 15, title: "Формальный стиль", description: "Академический язык в эссе", duration: "26 мин", type: "video", task: "Task 2" },
    
    // Grammar & Vocabulary
    { id: 16, title: "Сложные предложения", description: "Грамматические структуры", duration: "32 мин", type: "practice", task: "Грамматика" },
    { id: 17, title: "Условные предложения", description: "Conditionals в академическом письме", duration: "28 мин", type: "practice", task: "Грамматика" },
    { id: 18, title: "Пассивный залог", description: "Использование passive voice", duration: "25 мин", type: "interactive", task: "Грамматика" },
    { id: 19, title: "Академические фразы", description: "Полезные выражения для эссе", duration: "30 мин", type: "video", task: "Лексика" },
    
    // Practice & Tests
    { id: 20, title: "Практическое Task 1", description: "Полный тест с оценкой ИИ", duration: "60 мин", type: "exam", task: "Практика" },
    { id: 21, title: "Практическое Task 2", description: "Написание эссе с фидбеком", duration: "60 мин", type: "exam", task: "Практика" }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return '🎥';
      case 'practice': return '✍️';
      case 'interactive': return '💡';
      case 'exam': return '📝';
      default: return '📚';
    }
  };

  const getTaskColor = (task) => {
    switch (task) {
      case 'Основы': return 'bg-gray-50 text-gray-700';
      case 'Task 1': return 'bg-blue-50 text-blue-700';
      case 'Task 2': return 'bg-green-50 text-green-700';
      case 'Грамматика': return 'bg-purple-50 text-purple-700';
      case 'Лексика': return 'bg-yellow-50 text-yellow-700';
      case 'Практика': return 'bg-red-50 text-red-700';
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
              {lessons.map((lesson) => (
                <Link 
                  key={lesson.id} 
                  href={`/courses/writing-mastery/lessons/lesson-${lesson.id}`}
                  className={`block px-3 py-2 rounded-lg cursor-pointer ${
                    isLessonCompleted(courseSlug, lesson.id) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-2 text-sm">{getTypeIcon(lesson.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{lesson.title}</div>
                      <div className={`text-xs px-1 py-0.5 rounded ${getTaskColor(lesson.task)} inline-block mt-1`}>
                        {lesson.task}
                      </div>
                    </div>
                    {isLessonCompleted(courseSlug, lesson.id) && <span className="ml-2 text-blue-500">✓</span>}
                  </div>
                </Link>
              ))}
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
        <div className="lg:hidden bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-blue-600">← Назад</Link>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>

        <main className="flex-1 p-4 lg:p-8">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">{courseData.icon}</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{courseData.title}</h1>
                <p className="text-gray-600">{courseData.description}</p>
              </div>
            </div>

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

          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div key={lesson.id} className={`bg-white rounded-lg p-6 shadow-sm border-l-4 ${
                isLessonCompleted(courseSlug, lesson.id) ? 'border-blue-500' : 'border-gray-300'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-3">{getTypeIcon(lesson.type)}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
                      <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getTaskColor(lesson.task)}`}>
                        {lesson.task}
                      </span>
                      {isLessonCompleted(courseSlug, lesson.id) && (
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
                          href={`/courses/writing-mastery/lessons/lesson-${lesson.id}`}
                          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                            isLessonCompleted(courseSlug, lesson.id) 
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {isLessonCompleted(courseSlug, lesson.id) ? 'Повторить' : 'Начать урок'}
                        </Link>
                        {isLessonCompleted(courseSlug, lesson.id) && (
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
            ))}
          </div>
        </main>
      </div>
      
      {/* ИИ-помощник */}
      <AIChat 
        courseTitle="Writing Mastery" 
        currentTopic="IELTS Writing Practice"
      />
    </div>
  );
} 