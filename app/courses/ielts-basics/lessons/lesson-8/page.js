'use client';

import IELTSBasicsSidebar from '../../../../components/IELTSBasicsSidebar';
import Link from 'next/link';
import { useState } from 'react';
import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useProgress } from '../../../../hooks/useProgress';

const quizQuestions = [
  {
    type: 'single',
    question: 'Какие четыре секции включает экзамен IELTS?',
    options: [
      'Listening, Reading, Writing, Grammar',
      'Listening, Reading, Writing, Speaking',
      'Reading, Writing, Grammar, Vocabulary',
      'Speaking, Reading, Grammar, Listening',
    ],
    correct: 1,
    explanation: 'IELTS состоит из Listening, Reading, Writing и Speaking.'
  },
  {
    type: 'single',
    question: 'Сколько времени длится секция Listening?',
    options: [
      '20 минут',
      '30 минут',
      '45 минут',
      '60 минут',
    ],
    correct: 1,
    explanation: 'Listening длится 30 минут (плюс 10 минут на перенос ответов).' 
  },
  {
    type: 'text',
    question: 'Назовите два типа экзамена IELTS.',
    correct: ['academic', 'general training'],
    explanation: 'Два типа: Academic и General Training.'
  },
  {
    type: 'single',
    question: 'Что такое band descriptors?',
    options: [
      'Список тем для Speaking',
      'Официальные книги для подготовки',
      'Критерии оценки для Speaking и Writing',
      'Типы вопросов в Reading',
    ],
    correct: 2,
    explanation: 'Band descriptors — это официальные критерии оценки для Speaking и Writing.'
  },
  {
    type: 'multi',
    question: 'Выберите все официальные ресурсы для подготовки к IELTS:',
    options: [
      'Cambridge IELTS books',
      'British Council',
      'Wikipedia',
      'IELTS Liz',
    ],
    correct: [0, 1, 3],
    explanation: 'Официальные ресурсы: Cambridge IELTS, British Council, IELTS Liz.'
  },
  {
    type: 'single',
    question: 'В чем ошибка: студент готовится только к Reading и игнорирует Speaking?',
    options: [
      'Нет ошибки',
      'Нужно тренировать все секции экзамена',
      'Speaking не важен',
      'Reading — самая сложная часть',
    ],
    correct: 1,
    explanation: 'Важно тренировать все секции экзамена для высокого балла.'
  },
  {
    type: 'single',
    question: 'Какой совет НЕ является эффективной стратегией подготовки?',
    options: [
      'Планируйте занятия и придерживайтесь расписания',
      'Используйте только один учебник и не ищите другие источники',
      'Практикуйте все секции экзамена',
      'Анализируйте ошибки после пробных тестов',
    ],
    correct: 1,
    explanation: 'Использовать только один учебник — неэффективно, важно разнообразие материалов.'
  },
  {
    type: 'single',
    question: 'Какой из вариантов — типичная ошибка новичка?',
    options: [
      'Регулярная практика Speaking',
      'Использование официальных материалов',
      'Подготовка без анализа ошибок',
      'Тренировка тайм-менеджмента',
    ],
    correct: 2,
    explanation: 'Одна из типичных ошибок — не анализировать свои ошибки.'
  },
  {
    type: 'single',
    question: 'Для чего важно анализировать свои ошибки после пробных тестов?',
    options: [
      'Чтобы повторять одни и те же ошибки',
      'Чтобы понять слабые места и улучшить результат',
      'Чтобы быстрее закончить подготовку',
      'Это не важно',
    ],
    correct: 1,
    explanation: 'Анализ ошибок помогает выявить слабые места и повысить балл.'
  },
  {
    type: 'single',
    question: 'Какой формат Speaking-практики наиболее эффективен?',
    options: [
      'Только чтение текстов вслух',
      'Общение с партнёром и запись ответов на диктофон',
      'Просмотр фильмов без обсуждения',
      'Изучение грамматики без практики',
    ],
    correct: 1,
    explanation: 'Лучше всего — общаться с партнёром и анализировать свои ответы.'
  },
];

function normalizeText(text) {
  return text.trim().toLowerCase().replace(/ё/g, 'е');
}

export default function Lesson8() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [explanations, setExplanations] = useState([]);

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'ielts-basics';
  const lessonId = 8;
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

  const handleChange = (qIdx, value) => {
    setAnswers(prev => {
      const updated = [...prev];
      updated[qIdx] = value;
      return updated;
    });
  };

  const handleMultiChange = (qIdx, optionIdx) => {
    setAnswers(prev => {
      const updated = [...prev];
      const arr = Array.isArray(updated[qIdx]) ? [...updated[qIdx]] : [];
      if (arr.includes(optionIdx)) {
        updated[qIdx] = arr.filter(i => i !== optionIdx);
      } else {
        updated[qIdx] = [...arr, optionIdx];
      }
      return updated;
    });
  };

  const checkQuiz = () => {
    let correct = 0;
    let expl = [];
    quizQuestions.forEach((q, idx) => {
      let isCorrect = false;
      if (q.type === 'single') {
        isCorrect = answers[idx] === q.correct;
      } else if (q.type === 'multi') {
        const a = Array.isArray(answers[idx]) ? answers[idx].sort() : [];
        const c = q.correct.slice().sort();
        isCorrect = JSON.stringify(a) === JSON.stringify(c);
      } else if (q.type === 'text') {
        if (!answers[idx]) return;
        const user = normalizeText(answers[idx]);
        const corrects = q.correct.map(normalizeText);
        isCorrect = corrects.every(c => user.includes(c));
      }
      if (isCorrect) correct++;
      expl.push({
        isCorrect,
        explanation: q.explanation,
        userAnswer: answers[idx],
        question: q.question,
        correct: q.correct,
        options: q.options
      });
    });
    setScore(correct);
    setExplanations(expl);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setAnswers(Array(quizQuestions.length).fill(null));
    setShowResult(false);
    setScore(0);
    setExplanations([]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <IELTSBasicsSidebar activeLessonId={8} />
      {/* Основной контент */}
      <div className="flex-1 flex flex-col">
        {/* Мобильный хедер */}
        <div className="lg:hidden bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <Link href="/courses/ielts-basics" className="text-blue-600">← Назад к курсу</Link>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
        <main className="flex-1 p-4 lg:p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">❓</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Урок 8: Итоговый тест</h1>
                <p className="text-gray-600">Проверьте свои знания основ IELTS — 10 вопросов</p>
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
          <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="prose max-w-none">
              {!showResult ? (
                <form onSubmit={e => { e.preventDefault(); checkQuiz(); }}>
                  {quizQuestions.map((q, idx) => (
                    <div key={idx} className="mb-8">
                      <div className="font-semibold mb-2">{idx + 1}. {q.question}</div>
                      {q.type === 'single' && (
                        <div className="space-y-2">
                          {q.options.map((opt, oIdx) => (
                            <label key={oIdx} className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                name={`q${idx}`}
                                value={oIdx}
                                checked={answers[idx] === oIdx}
                                onChange={() => handleChange(idx, oIdx)}
                                className="mr-2"
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      {q.type === 'multi' && (
                        <div className="space-y-2">
                          {q.options.map((opt, oIdx) => (
                            <label key={oIdx} className="flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                name={`q${idx}_${oIdx}`}
                                checked={Array.isArray(answers[idx]) && answers[idx].includes(oIdx)}
                                onChange={() => handleMultiChange(idx, oIdx)}
                                className="mr-2"
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      {q.type === 'text' && (
                        <input
                          type="text"
                          className="mt-2 border rounded px-3 py-2 w-full"
                          placeholder="Ваш ответ..."
                          value={answers[idx] || ''}
                          onChange={e => handleChange(idx, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full mt-4"
                  >
                    Проверить ответы
                  </button>
                </form>
              ) : (
                <div>
                  <div className="text-2xl font-bold text-center mb-6">
                    Ваш результат: {score} из {quizQuestions.length}
                  </div>
                  {explanations.map((ex, idx) => (
                    <div key={idx} className={`mb-6 p-4 rounded-lg border ${ex.isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                      <div className="font-semibold mb-2">{idx + 1}. {ex.question}</div>
                      <div className="mb-1">
                        <span className={ex.isCorrect ? 'text-green-700' : 'text-red-700 font-semibold'}>
                          {ex.isCorrect ? 'Верно!' : 'Ошибка.'}
                        </span>
                      </div>
                      <div className="mb-1 text-gray-700">
                        <strong>Пояснение:</strong> {ex.explanation}
                      </div>
                      {!ex.isCorrect && (
                        <div className="text-gray-600 text-sm">
                          <strong>Ваш ответ:</strong> {Array.isArray(ex.userAnswer) ? ex.userAnswer.map(i => ex.options ? ex.options[i] : i).join(', ') : (ex.options ? ex.options?.[ex.userAnswer] : ex.userAnswer)}
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={resetQuiz}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full mt-4"
                  >
                    Пройти ещё раз
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Add completion button after quiz results */}
          {showResult && !completed && (
            <div className="text-center mt-8">
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
            </div>
          )}

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