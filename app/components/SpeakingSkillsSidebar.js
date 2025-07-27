'use client';

import { UserButton, SignedIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../hooks/useProgress';

export default function SpeakingSkillsSidebar({ activeLessonId }) {
  const { user } = useUser();
  const { isLessonCompleted } = useProgress();
  const courseSlug = 'speaking-skills';

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
    <div className="hidden lg:flex w-80 bg-white shadow-sm border-r border-gray-200 flex-col">
      <div className="p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center text-2xl font-bold text-blue-600">
          🧠 prepAI
        </Link>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="mb-6">
          <Link href="/courses/speaking-skills" className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 rounded-lg font-medium">
            ← Назад к курсу
          </Link>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            🎤 Speaking Skills
          </h3>
          
          <div className="space-y-1">
            {lessons.map((lesson) => {
              const completed = isLessonCompleted(courseSlug, lesson.id);
              
              return (
                <Link 
                  key={lesson.id}
                  href={`/courses/speaking-skills/lessons/lesson-${lesson.id}`}
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
  );
} 