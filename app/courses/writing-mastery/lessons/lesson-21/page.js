'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState, useEffect } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson21() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [essay1, setEssay1] = useState('');
  const [essay2, setEssay2] = useState('');
  const [saved, setSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comparison, setComparison] = useState(null);
  const [wordCount1, setWordCount1] = useState(0);
  const [wordCount2, setWordCount2] = useState(0);

  // Объявляем функцию countWords перед её использованием
  const countWords = (text) => {
    const words = text.trim().split(/\s+/).filter(word => word !== '');
    return words.length;
  };

  useEffect(() => {
    const savedEssay1 = localStorage.getItem('lesson21_essay1');
    const savedEssay2 = localStorage.getItem('lesson21_essay2');
    if (savedEssay1) {
      setEssay1(savedEssay1);
      setWordCount1(countWords(savedEssay1));
    }
    if (savedEssay2) {
      setEssay2(savedEssay2);
      setWordCount2(countWords(savedEssay2));
    }
  }, []);

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'writing-mastery';
  const lessonId = 21;
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

  const handleSave = () => {
    localStorage.setItem('lesson21_essay1', essay1);
    localStorage.setItem('lesson21_essay2', essay2);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleEssay1Change = (e) => {
    const newText = e.target.value;
    setEssay1(newText);
    setWordCount1(countWords(newText));
  };

  const handleEssay2Change = (e) => {
    const newText = e.target.value;
    setEssay2(newText);
    setWordCount2(countWords(newText));
  };

  const handleSubmit = async () => {
    if (essay1.trim().length === 0 || essay2.trim().length === 0) {
      alert('Пожалуйста, напишите оба эссе перед отправкой на проверку.');
      return;
    }

    if (wordCount1 < 250 || wordCount2 < 250) {
      alert(`Ваши ответы должны содержать не менее 250 слов. Сейчас у вас: Эссе 1 - ${wordCount1} слов, Эссе 2 - ${wordCount2} слов.`);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/essay-comparison', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          essay1: essay1,
          essay2: essay2,
          taskType: 'Task 2',
          question: 'Some people believe that universities should focus on providing academic skills, while others think that universities should prepare students for their future careers. Discuss both views and give your own opinion.'
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error comparing essays');
      }
      
      const analysis = await response.json();
      setComparison(analysis);
    } catch (error) {
      console.error('Error submitting essays:', error);
      alert('Произошла ошибка при анализе эссе: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <WritingMasterySidebar activeLessonId={21} />

      {/* Основной контент */}
      <div className="flex-1 flex flex-col">
        {/* Мобильный хедер */}
        <div className="lg:hidden bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <Link href="/courses/writing-mastery" className="text-blue-600">← Назад к курсу</Link>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>

        <main className="flex-1 p-4 lg:p-8 max-w-4xl mx-auto">
          {/* Заголовок урока */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">📝</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Урок 21: Практическое Task 2</h1>
                <p className="text-gray-600">Написание эссе с фидбеком • 60 минут</p>
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
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Практическое задание: Сравнение двух эссе</h2>
              
              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-green-900 mb-4">Инструкции</h3>
                <ul className="list-disc pl-6 text-green-800 space-y-2">
                  <li>Напишите два разных эссе на одну и ту же тему.</li>
                  <li>Каждое эссе должно содержать не менее 250 слов.</li>
                  <li>Попробуйте разные подходы к аргументации.</li>
                  <li>ИИ ассистент сравнит ваши эссе и даст рекомендации.</li>
                  <li>Используйте академический стиль письма.</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Задание:</h3>
                <p className="text-gray-700 mb-6">
                  <em>Some people believe that universities should focus on providing academic skills, while others think that universities should prepare students for their future careers. Discuss both views and give your own opinion.</em>
                </p>
                <p className="text-gray-700 mb-6">
                  <em>Give reasons for your answer and include any relevant examples from your own knowledge or experience.</em>
                </p>

                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="font-medium text-gray-800 mb-4">Советы по написанию:</h4>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>В первом эссе сосредоточьтесь на академических навыках.</li>
                    <li>Во втором эссе подчеркните подготовку к карьере.</li>
                    <li>Используйте разные примеры и аргументы.</li>
                    <li>Попробуйте разные структуры предложений.</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                {/* Эссе 1 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Эссе 1:</h3>
                    <div className="text-sm text-gray-600">
                      Слов: <span className={wordCount1 < 250 ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                        {wordCount1}
                      </span>
                      <span className="text-gray-500"> / минимум 250</span>
                    </div>
                  </div>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 min-h-[300px]"
                    value={essay1}
                    onChange={handleEssay1Change}
                    placeholder="Напишите первое эссе здесь..."
                  />
                </div>

                {/* Эссе 2 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Эссе 2:</h3>
                    <div className="text-sm text-gray-600">
                      Слов: <span className={wordCount2 < 250 ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                        {wordCount2}
                      </span>
                      <span className="text-gray-500"> / минимум 250</span>
                    </div>
                  </div>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 min-h-[300px]"
                    value={essay2}
                    onChange={handleEssay2Change}
                    placeholder="Напишите второе эссе здесь..."
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Сохранить черновик
                </button>
                {saved && <span className="text-green-600 self-center">Сохранено!</span>}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || essay1.trim().length === 0 || essay2.trim().length === 0}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isSubmitting || essay1.trim().length === 0 || essay2.trim().length === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Анализ...
                    </span>
                  ) : (
                    'Сравнить эссе'
                  )}
                </button>
              </div>

              {comparison && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Результаты сравнения</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Эссе 1 результаты */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-3">Эссе 1</h4>
                      <div className="mb-3">
                        <div className="flex items-center">
                          <div className="text-2xl font-bold text-blue-600">{comparison.essay1.overallScore}</div>
                          <div className="ml-2 text-gray-500">(из 9.0)</div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>Task Response: {comparison.essay1.scores.taskResponse}</div>
                        <div>Coherence: {comparison.essay1.scores.coherenceCohesion}</div>
                        <div>Lexical: {comparison.essay1.scores.lexicalResource}</div>
                        <div>Grammar: {comparison.essay1.scores.grammarAccuracy}</div>
                      </div>
                    </div>

                    {/* Эссе 2 результаты */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-3">Эссе 2</h4>
                      <div className="mb-3">
                        <div className="flex items-center">
                          <div className="text-2xl font-bold text-blue-600">{comparison.essay2.overallScore}</div>
                          <div className="ml-2 text-gray-500">(из 9.0)</div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>Task Response: {comparison.essay2.scores.taskResponse}</div>
                        <div>Coherence: {comparison.essay2.scores.coherenceCohesion}</div>
                        <div>Lexical: {comparison.essay2.scores.lexicalResource}</div>
                        <div>Grammar: {comparison.essay2.scores.grammarAccuracy}</div>
                      </div>
                    </div>
                  </div>

                  {/* Сравнение */}
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-blue-900 mb-2">Сравнение:</h4>
                    <div className="text-blue-800 mb-3">
                      <strong>Лучшее эссе:</strong> {comparison.comparison.betterEssay === 'essay1' ? 'Эссе 1' : 'Эссе 2'}
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-medium text-blue-900">Ключевые различия:</h5>
                      <ul className="list-disc pl-6 text-blue-800 space-y-1">
                        {comparison.comparison.keyDifferences.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Рекомендации */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Рекомендации:</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      {comparison.comparison.recommendations.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
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
                  href="/courses/writing-mastery"
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