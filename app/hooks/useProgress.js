'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export const useProgress = () => {
  const { user, isLoaded } = useUser();
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user?.id) {
      loadProgress();
    }
  }, [isLoaded, user?.id]);

  const loadProgress = async () => {
    try {
      setLoading(true);
      console.log('Загружаем прогресс...');
      
      // Сначала пытаемся загрузить из localStorage
      let fallbackProgress = null;
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('userProgress');
        if (stored) {
          try {
            fallbackProgress = JSON.parse(stored);
            console.log('Найден прогресс в localStorage:', fallbackProgress);
          } catch (e) {
            console.error('Ошибка парсинга localStorage:', e);
          }
        }
      }
      
      const response = await fetch('/api/progress');
      console.log('Ответ загрузки прогресса:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Загруженный прогресс с сервера:', data);
        setProgress(data);
      } else {
        console.log('API недоступен, используем localStorage или пустой прогресс');
        
        const initialProgress = fallbackProgress || {
          'ielts-basics': { completedLessons: [] },
          'speaking-skills': { completedLessons: [] },
          'writing-mastery': { completedLessons: [] }
        };
        setProgress(initialProgress);
      }
    } catch (error) {
      console.error('Ошибка загрузки прогресса:', error);
      
      // Пытаемся использовать localStorage как fallback
      let fallbackProgress = null;
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('userProgress');
        if (stored) {
          try {
            fallbackProgress = JSON.parse(stored);
          } catch (e) {
            console.error('Ошибка парсинга localStorage в catch:', e);
          }
        }
      }
      
      const initialProgress = fallbackProgress || {
        'ielts-basics': { completedLessons: [] },
        'speaking-skills': { completedLessons: [] },
        'writing-mastery': { completedLessons: [] }
      };
      setProgress(initialProgress);
    } finally {
      setLoading(false);
    }
  };

  const markLessonComplete = async (courseSlug, lessonId) => {
    try {
      console.log('Отмечаем урок как завершенный:', { courseSlug, lessonId });
      
      // Сначала обновляем локальное состояние для мгновенного отклика
      const newProgress = { ...progress };
      
      if (!newProgress[courseSlug]) {
        newProgress[courseSlug] = { completedLessons: [] };
      }

      if (!newProgress[courseSlug].completedLessons.includes(lessonId)) {
        newProgress[courseSlug].completedLessons.push(lessonId);
      }

      console.log('Новый прогресс (локально):', newProgress);
      setProgress(newProgress);

      // Сохраняем в локальное хранилище как резервную копию
      if (typeof window !== 'undefined') {
        localStorage.setItem('userProgress', JSON.stringify(newProgress));
      }

      // Затем отправляем на сервер
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseSlug, lessonId, completed: true })
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Ответ сервера:', responseData);
      } else {
        console.error('Ошибка ответа сервера:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Ошибка отметки урока как завершенного:', error);
    }
  };

  const markLessonIncomplete = async (courseSlug, lessonId) => {
    try {
      // Сначала обновляем локальное состояние
      const newProgress = { ...progress };
      
      if (newProgress[courseSlug]) {
        newProgress[courseSlug].completedLessons = newProgress[courseSlug].completedLessons.filter(
          id => id !== lessonId
        );
      }

      setProgress(newProgress);

      // Сохраняем в localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('userProgress', JSON.stringify(newProgress));
      }

      // Затем отправляем на сервер
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseSlug, lessonId, completed: false })
      });

      if (response.ok) {
        console.log('Урок отмечен как незавершенный на сервере');
      }
    } catch (error) {
      console.error('Ошибка отметки урока как незавершенного:', error);
    }
  };

  const calculateProgress = (courseSlug, totalLessons) => {
    if (!progress[courseSlug]) return 0;
    const completed = progress[courseSlug].completedLessons.length;
    return Math.round((completed / totalLessons) * 100);
  };

  const isLessonCompleted = (courseSlug, lessonId) => {
    return progress[courseSlug]?.completedLessons?.includes(lessonId) || false;
  };

  const getCompletedLessonsCount = (courseSlug) => {
    return progress[courseSlug]?.completedLessons?.length || 0;
  };

  const getTotalProgress = () => {
    const courses = ['ielts-basics', 'speaking-skills', 'writing-mastery'];
    const totalLessons = { 
      'ielts-basics': 8, 
      'speaking-skills': 25, 
      'writing-mastery': 22
    };

    let totalCompleted = 0;
    let totalPossible = 0;

    courses.forEach(course => {
      totalCompleted += getCompletedLessonsCount(course);
      totalPossible += totalLessons[course];
    });

    return {
      completed: totalCompleted,
      total: totalPossible,
      percentage: Math.round((totalCompleted / totalPossible) * 100)
    };
  };

  const resetProgress = async () => {
    try {
      const response = await fetch('/api/progress', {
        method: 'DELETE'
      });

      if (response.ok) {
        const emptyProgress = {
          'ielts-basics': { completedLessons: [] },
          'speaking-skills': { completedLessons: [] },
          'writing-mastery': { completedLessons: [] }
        };
        setProgress(emptyProgress);
      }
    } catch (error) {
      console.error('Ошибка сброса прогресса:', error);
    }
  };

  return {
    markLessonComplete,
    markLessonIncomplete,
    calculateProgress,
    isLessonCompleted,
    getCompletedLessonsCount,
    getTotalProgress,
    resetProgress,
    progress,
    loading
  };
}; 