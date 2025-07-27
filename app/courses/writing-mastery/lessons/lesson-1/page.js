'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState, useEffect } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson1() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [answer, setAnswer] = useState('');
  const [saved, setSaved] = useState(false);
  const [checkResult, setCheckResult] = useState(null);

  useEffect(() => {
    const a = localStorage.getItem('lesson1_answer_0');
    setAnswer(a || '');
  }, []);

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'writing-mastery';
  const lessonId = 1;
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
    localStorage.setItem('lesson1_answer_0', answer);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const keywords = [
    'task achievement', 'coherence', 'cohesion', 'lexical resource', 'grammatical range', 'accuracy', '150 words', '250 words', 'planning', 'structure', 'introduction', 'conclusion', 'academic', 'general', 'visual information', 'essay'
  ];

  const checkAnswer = () => {
    const ans = answer.toLowerCase();
    const found = keywords.some(word => ans.includes(word));
    setCheckResult(found ? 'Вы справились с заданием! Отличная работа!' : 'Попробуйте переформулировать или используйте ключевые слова из урока.');
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
    setCheckResult(null); // Сброс фидбека при изменении ответа
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <WritingMasterySidebar activeLessonId={1} />

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
              <span className="text-4xl mr-4">🎥</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Урок 1: Обзор Writing секции</h1>
                <p className="text-gray-600">Структура и требования Writing • 20 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Обзор секции Writing в IELTS</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Секция Writing в экзамене IELTS оценивает вашу способность писать на английском языке ясно, логично и с соответствующим уровнем сложности. В этой секции вы должны продемонстрировать навыки академического или общего письма в зависимости от выбранного модуля.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Структура секции Writing</h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Секция Writing длится 60 минут и состоит из двух заданий:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Task 1 (20 минут)</h4>
                  <p className="text-blue-800 mb-3">В академическом модуле вам нужно описать и интерпретировать визуальную информацию (график, таблицу, диаграмму или карту) минимум в 150 словах.</p>
                  <p className="text-blue-800">В общем модуле вам нужно написать письмо в ответ на заданную ситуацию (например, запрос информации, жалоба, просьба) минимум в 150 словах.</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Task 2 (40 минут)</h4>
                  <p className="text-green-800 mb-3">И в академическом, и в общем модуле вам нужно написать эссе в ответ на точку зрения, аргумент или проблему минимум в 250 словах.</p>
                  <p className="text-green-800">Task 2 оценивается выше, чем Task 1, поэтому рекомендуется уделить ему больше времени и внимания.</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Критерии оценки Writing</h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Ваша работа оценивается по четырем критериям:
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Task Achievement / Task Response</h4>
                  <p className="text-gray-700">Насколько полно и точно вы ответили на поставленный вопрос или выполнили задание. Включает в себя релевантность, полноту и развитие идей.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Coherence and Cohesion</h4>
                  <p className="text-gray-700">Логичность и связность вашего текста. Включает организацию идей, использование абзацев, связующих слов и фраз.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Lexical Resource</h4>
                  <p className="text-gray-700">Разнообразие и точность использования словарного запаса. Оценивается богатство лексики и правильность ее использования.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Grammatical Range and Accuracy</h4>
                  <p className="text-gray-700">Разнообразие и правильность грамматических структур. Оценивается использование различных грамматических конструкций и отсутствие ошибок.</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Распространенные ошибки в Writing</h3>
              
              <div className="bg-red-50 p-6 rounded-lg mb-6">
                <ul className="list-disc pl-6 text-red-800 space-y-2">
                  <li><strong>Недостаточное количество слов</strong> — всегда пишите не менее 150 слов для Task 1 и 250 слов для Task 2.</li>
                  <li><strong>Отклонение от темы</strong> — внимательно читайте задание и отвечайте именно на поставленный вопрос.</li>
                  <li><strong>Неправильное распределение времени</strong> — не тратьте слишком много времени на Task 1 в ущерб Task 2.</li>
                  <li><strong>Отсутствие структуры</strong> — всегда планируйте свое эссе перед написанием.</li>
                  <li><strong>Повторение одних и тех же слов</strong> — используйте синонимы и разнообразную лексику.</li>
                  <li><strong>Использование заученных фраз</strong> — экзаменаторы легко распознают заученные шаблоны.</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Стратегии успешного написания</h3>
              
              <div className="bg-yellow-50 p-6 rounded-lg">
                <ul className="list-disc pl-6 text-yellow-800 space-y-2">
                  <li><strong>Анализируйте задание</strong> — тщательно изучите вопрос или задание, подчеркните ключевые слова.</li>
                  <li><strong>Планируйте свое время</strong> — выделите примерно 5 минут на планирование, 15 минут на написание Task 1, 30 минут на написание Task 2 и 10 минут на проверку.</li>
                  <li><strong>Структурируйте свой ответ</strong> — используйте четкую структуру с введением, основной частью и заключением.</li>
                  <li><strong>Используйте разнообразную лексику</strong> — демонстрируйте богатый словарный запас, но избегайте слишком сложных или неуместных слов.</li>
                  <li><strong>Применяйте различные грамматические структуры</strong> — показывайте владение разными временами, условными предложениями, пассивным залогом и т.д.</li>
                  <li><strong>Проверяйте свою работу</strong> — всегда оставляйте время на проверку орфографии, грамматики и пунктуации.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Практическое задание */}
          <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Практическое задание</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Задание:</h4>
                <p className="text-gray-700 mb-4">Опишите основные компоненты секции Writing в IELTS, используя ключевые термины из урока:</p>
                <p className="text-gray-700 font-medium mb-4"><em>"Напишите краткое описание структуры и критериев оценки Writing секции IELTS, включая основные требования к Task 1 и Task 2."</em></p>
                
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <p className="text-gray-500 italic mb-2">Подсказка:</p>
                  <p className="text-gray-700 text-sm"><em>Используйте термины: Task Achievement, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy, 150 слов, 250 слов, планирование, структура.</em></p>
                </div>
              </div>
              
              <div className="mt-6">
                <textarea
                  className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  rows={6}
                  value={answer}
                  onChange={handleAnswerChange}
                  placeholder="Опишите структуру и критерии оценки Writing секции..."
                />
                <div className="flex items-center mb-2">
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-all text-sm"
                  >
                    Сохранить
                  </button>
                  {saved && <span className="ml-2 text-green-600 text-sm">Сохранено!</span>}
                  <button
                    onClick={checkAnswer}
                    className="ml-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-all text-xs"
                  >
                    Проверить
                  </button>
                </div>
                {checkResult && (
                  <div className={checkResult.includes('справились') ? 'mt-1 text-green-600' : 'mt-1 text-red-600'}>{checkResult}</div>
                )}
                {answer && (
                  <div className="mt-2"><span className="font-medium">Ваш ответ:</span> {answer}</div>
                )}
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
                  href="/courses/writing-mastery/lessons/lesson-2"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 hover:shadow-md transition-all duration-300"
                >
                  Перейти к следующему уроку →
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