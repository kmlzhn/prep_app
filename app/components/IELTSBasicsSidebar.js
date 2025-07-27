'use client';
import Link from 'next/link';
import { UserButton, SignedIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useProgress } from '../hooks/useProgress';

const lessons = [
  { id: 1, title: "Введение в IELTS", type: "video" },
  { id: 2, title: "Структура экзамена", type: "video" },
  { id: 3, title: "Критерии оценки", type: "text" },
  { id: 4, title: "Стратегии подготовки", type: "video" },
  { id: 5, title: "Планирование обучения", type: "interactive" },
  { id: 6, title: "Общие ошибки новичков", type: "text" },
  { id: 7, title: "Ресурсы для подготовки", type: "text" },
  { id: 8, title: "Итоговый тест", type: "quiz" },
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

export default function IELTSBasicsSidebar({ activeLessonId }) {
  const { user } = useUser();
  const { isLessonCompleted } = useProgress();
  const courseSlug = 'ielts-basics';

  return (
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
            📚 ОСНОВЫ IELTS
          </h3>
          <div className="space-y-1">
            {lessons.map((lesson) => {
              const completed = isLessonCompleted(courseSlug, lesson.id);
              return (
                <Link
                  key={lesson.id}
                  href={`/courses/ielts-basics/lessons/lesson-${lesson.id}`}
                  className={`block px-3 py-2 rounded-lg transition-colors flex items-center ${
                    lesson.id === activeLessonId
                      ? 'bg-blue-50 text-blue-600 font-semibold' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <span className="mr-2">{getTypeIcon(lesson.type)}</span>
                  <span className="text-sm font-medium">{lesson.id}. {lesson.title}</span>
                  {completed && <span className="ml-auto text-blue-500">✓</span>}
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