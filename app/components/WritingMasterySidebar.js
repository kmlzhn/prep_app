'use client';

import { UserButton, SignedIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../hooks/useProgress';

export default function WritingMasterySidebar({ activeLessonId }) {
  const { user } = useUser();
  const { isLessonCompleted } = useProgress();
  const courseSlug = 'writing-mastery';

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
            ✍️ Writing Mastery
          </h3>
          
          <div className="space-y-1">
            {lessons.map((lesson) => {
              const completed = isLessonCompleted(courseSlug, lesson.id);
              
              return (
                <Link 
                  key={lesson.id}
                  href={`/courses/writing-mastery/lessons/lesson-${lesson.id}`}
                  className={`block px-3 py-2 rounded-lg transition-colors ${
                    activeLessonId === lesson.id 
                      ? 'bg-blue-100 text-blue-700' 
                      : completed 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{getTypeIcon(lesson.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{lesson.title}</div>
                      <div className={`text-xs px-1 py-0.5 rounded ${getTaskColor(lesson.task)} inline-block mt-1`}>
                        {lesson.task}
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
  );
} 