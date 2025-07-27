'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState, useEffect } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson10() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [answers, setAnswers] = useState(['', '', '', '', '']);
  const [saved, setSaved] = useState([false, false, false, false, false]);
  const [checkResult, setCheckResult] = useState([null, null, null, null, null]);

  useEffect(() => {
    const savedAnswers = [];
    for (let i = 0; i < 5; i++) {
      const a = localStorage.getItem(`lesson10_answer_${i}`);
      savedAnswers.push(a || '');
    }
    setAnswers(savedAnswers);
  }, []);

  const handleSave = (idx) => {
    localStorage.setItem(`lesson10_answer_${idx}`, answers[idx]);
    setSaved((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
    setTimeout(() => {
      setSaved((prev) => {
        const next = [...prev];
        next[idx] = false;
        return next;
      });
    }, 1500);
  };

  // Ключевые слова для проверки
  const keywords = [
    ['discussion', 'обе', 'views', 'мнение', 'discuss', 'обсудить', 'введение', 'основная часть', 'заключение'],
    ['problem', 'solution', 'проблем', 'решени', 'government', 'individual', 'уровне', 'анализ', 'обобщение'],
    ['discussion', 'обе', 'views', 'мнение', 'discuss', 'альтернативн', 'длительных', 'заключение'],
    ['opinion', 'agree', 'disagree', 'мнение', 'положительн', 'отрицательн', 'поддержк', 'подтверждение'],
    ['problem', 'solution', 'two-part', 'двухчастн', 'проблем', 'решени', 'миграц', 'обобщение']
  ];

  const checkAnswer = (idx) => {
    const answer = answers[idx].toLowerCase();
    const found = keywords[idx].some(word => answer.includes(word));
    setCheckResult(prev => {
      const next = [...prev];
      next[idx] = found ? 'Вы справились с заданием! Отличная работа!' : 'Попробуйте переформулировать или используйте ключевые слова из структуры.';
      return next;
    });
  };

  const handleAnswerChange = (idx, value) => {
    const next = [...answers];
    next[idx] = value;
    setAnswers(next);
    // Сброс фидбека для изменённого ответа
    setCheckResult(prev => {
      const nextResult = [...prev];
      nextResult[idx] = null;
      return nextResult;
    });
  };

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'writing-mastery';
  const lessonId = 10;
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <WritingMasterySidebar activeLessonId={10} />

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
                <h1 className="text-3xl font-bold text-gray-900">Урок 10: Типы эссе</h1>
                <p className="text-gray-600">Opinion, Discussion, Problem-Solution • 35 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Типы эссе в IELTS Writing Task 2</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                В IELTS Writing Task 2 вы можете столкнуться с различными типами вопросов, каждый из которых требует определенного подхода к структуре и содержанию вашего эссе. Понимание типа вопроса поможет вам правильно организовать свои мысли и аргументы, что критически важно для получения высокого балла.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Основные типы эссе в IELTS Task 2</h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Существует пять основных типов эссе, которые могут встретиться в IELTS Writing Task 2:
              </p>

              <div className="space-y-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">1. Opinion Essay (Эссе-мнение)</h4>
                  <div className="space-y-3">
                    <p className="text-blue-800">В этом типе эссе вас просят выразить и обосновать свое мнение по определенному вопросу.</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Типичные формулировки:</p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li><em>"Do you agree or disagree with this statement?"</em></li>
                        <li><em>"To what extent do you agree or disagree?"</em></li>
                        <li><em>"What is your opinion on...?"</em></li>
                      </ul>
                      <p className="font-medium mt-3 mb-1">Пример вопроса:</p>
                      <p className="text-sm"><em>"Some people believe that children should be allowed to stay at home and play instead of going to school. Do you agree or disagree with this statement?"</em></p>
                    </div>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Структура эссе-мнения:</p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li><strong>Введение:</strong> Перефразируйте тему и четко выразите свое мнение.</li>
                        <li><strong>Основная часть 1:</strong> Первый аргумент в поддержку вашего мнения с примерами.</li>
                        <li><strong>Основная часть 2:</strong> Второй аргумент в поддержку вашего мнения с примерами.</li>
                        <li><strong>Заключение:</strong> Подтвердите свое мнение и обобщите основные аргументы.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">2. Discussion Essay (Эссе-обсуждение)</h4>
                  <div className="space-y-3">
                    <p className="text-green-800">В этом типе эссе вас просят обсудить обе стороны вопроса и высказать свое мнение.</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Типичные формулировки:</p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li><em>"Discuss both views and give your opinion."</em></li>
                        <li><em>"Discuss the advantages and disadvantages of..."</em></li>
                        <li><em>"Consider both sides of this argument and give your own opinion."</em></li>
                      </ul>
                      <p className="font-medium mt-3 mb-1">Пример вопроса:</p>
                      <p className="text-sm"><em>"Some people think that governments should spend money on railways. Others believe that there should be more investment in road networks. Discuss both views and give your opinion."</em></p>
                    </div>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Структура эссе-обсуждения:</p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li><strong>Введение:</strong> Перефразируйте тему и кратко представьте обе точки зрения. Укажите свое мнение.</li>
                        <li><strong>Основная часть 1:</strong> Обсудите первую точку зрения с аргументами и примерами.</li>
                        <li><strong>Основная часть 2:</strong> Обсудите вторую точку зрения с аргументами и примерами.</li>
                        <li><strong>Основная часть 3 (опционально):</strong> Представьте свое мнение с аргументами.</li>
                        <li><strong>Заключение:</strong> Обобщите обе точки зрения и подтвердите свое мнение.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-3">3. Problem-Solution Essay (Эссе проблема-решение)</h4>
                  <div className="space-y-3">
                    <p className="text-yellow-800">В этом типе эссе вас просят определить проблему и предложить возможные решения.</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Типичные формулировки:</p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li><em>"What problems does this cause and what solutions can you suggest?"</em></li>
                        <li><em>"What can be done to solve this problem?"</em></li>
                        <li><em>"How can this situation be improved?"</em></li>
                      </ul>
                      <p className="font-medium mt-3 mb-1">Пример вопроса:</p>
                      <p className="text-sm"><em>"Traffic congestion is becoming a major problem in many cities around the world. What are the causes of this problem and what measures can be taken to solve it?"</em></p>
                    </div>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Структура эссе проблема-решение:</p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li><strong>Введение:</strong> Перефразируйте тему, укажите проблему и кратко представьте основные решения.</li>
                        <li><strong>Основная часть 1:</strong> Опишите проблему и ее причины с примерами.</li>
                        <li><strong>Основная часть 2:</strong> Предложите первое решение с объяснением и примерами.</li>
                        <li><strong>Основная часть 3 (опционально):</strong> Предложите второе решение с объяснением и примерами.</li>
                        <li><strong>Заключение:</strong> Обобщите проблему и предложенные решения.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-3">4. Advantages and Disadvantages Essay (Эссе о преимуществах и недостатках)</h4>
                  <div className="space-y-3">
                    <p className="text-purple-800">В этом типе эссе вас просят рассмотреть положительные и отрицательные аспекты определенной темы.</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Типичные формулировки:</p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li><em>"What are the advantages and disadvantages of...?"</em></li>
                        <li><em>"Discuss the benefits and drawbacks of..."</em></li>
                        <li><em>"What are the positive and negative effects of...?"</em></li>
                      </ul>
                      <p className="font-medium mt-3 mb-1">Пример вопроса:</p>
                      <p className="text-sm"><em>"In many countries, the use of mobile phones in schools is banned. Discuss the advantages and disadvantages of this approach."</em></p>
                    </div>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Структура эссе о преимуществах и недостатках:</p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li><strong>Введение:</strong> Перефразируйте тему и кратко укажите, что вы рассмотрите преимущества и недостатки.</li>
                        <li><strong>Основная часть 1:</strong> Обсудите преимущества с аргументами и примерами.</li>
                        <li><strong>Основная часть 2:</strong> Обсудите недостатки с аргументами и примерами.</li>
                        <li><strong>Заключение:</strong> Обобщите основные преимущества и недостатки. Можно высказать сбалансированное мнение.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-3">5. Two-Part Question Essay (Эссе с двухчастным вопросом)</h4>
                  <div className="space-y-3">
                    <p className="text-red-800">В этом типе эссе вам задают два связанных вопроса, на которые нужно ответить.</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Типичные формулировки:</p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li><em>"Why is this happening? What can be done about it?"</em></li>
                        <li><em>"Do you think this is a positive or negative development? What are the reasons for your answer?"</em></li>
                        <li><em>"What are the causes of this problem and what solutions can you suggest?"</em></li>
                      </ul>
                      <p className="font-medium mt-3 mb-1">Пример вопроса:</p>
                      <p className="text-sm"><em>"In many countries, the amount of crime committed by teenagers is increasing. Why is this happening and what can be done to reduce it?"</em></p>
                    </div>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Структура эссе с двухчастным вопросом:</p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li><strong>Введение:</strong> Перефразируйте тему и кратко представьте оба вопроса.</li>
                        <li><strong>Основная часть 1:</strong> Ответьте на первый вопрос с аргументами и примерами.</li>
                        <li><strong>Основная часть 2:</strong> Ответьте на второй вопрос с аргументами и примерами.</li>
                        <li><strong>Заключение:</strong> Обобщите ответы на оба вопроса.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Как определить тип эссе</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-gray-700 mb-3">Чтобы правильно определить тип эссе, внимательно проанализируйте формулировку вопроса:</p>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded">
                    <p className="font-medium text-gray-900">1. Ищите ключевые слова и фразы:</p>
                    <ul className="list-disc pl-5 text-gray-700 text-sm">
                      <li><strong>"Agree or disagree"</strong> → Opinion Essay</li>
                      <li><strong>"Discuss both views"</strong> → Discussion Essay</li>
                      <li><strong>"Problems... solutions"</strong> → Problem-Solution Essay</li>
                      <li><strong>"Advantages and disadvantages"</strong> → Advantages and Disadvantages Essay</li>
                      <li><strong>Два вопроса в формулировке</strong> → Two-Part Question Essay</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-white rounded">
                    <p className="font-medium text-gray-900">2. Определите, что именно от вас требуется:</p>
                    <ul className="list-disc pl-5 text-gray-700 text-sm">
                      <li>Выразить и обосновать свое мнение?</li>
                      <li>Рассмотреть разные точки зрения?</li>
                      <li>Проанализировать проблему и предложить решения?</li>
                      <li>Оценить положительные и отрицательные аспекты?</li>
                      <li>Ответить на два связанных вопроса?</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Общие советы для всех типов эссе</h3>
              
              <div className="bg-yellow-50 p-6 rounded-lg">
                <ul className="list-disc pl-6 text-yellow-800 space-y-2">
                  <li><strong>Внимательно читайте вопрос</strong> — убедитесь, что вы правильно поняли, что от вас требуется.</li>
                  <li><strong>Планируйте структуру</strong> — потратьте 3-5 минут на составление плана эссе в соответствии с его типом.</li>
                  <li><strong>Используйте соответствующие связующие слова</strong> — для каждого типа эссе существуют свои характерные связующие фразы.</li>
                  <li><strong>Придерживайтесь темы</strong> — все ваши аргументы и примеры должны быть непосредственно связаны с темой вопроса.</li>
                  <li><strong>Будьте последовательны</strong> — если вы высказываете свое мнение, придерживайтесь его на протяжении всего эссе.</li>
                  <li><strong>Приводите конкретные примеры</strong> — подкрепляйте свои аргументы конкретными примерами из жизни, истории или литературы.</li>
                  <li><strong>Соблюдайте баланс</strong> — уделяйте примерно одинаковое внимание всем аспектам вопроса.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Практическое задание */}
          <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Практическое задание</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Определите тип эссе и предложите структуру:</h4>
                <div className="space-y-4">
                  {[
                    'Some people believe that hosting international sports events is beneficial for a country, while others think it is costly and results in problems. Discuss both views and give your opinion.',
                    'In many cities, the use of private cars is increasing, which is causing problems of pollution and congestion. What can be done to tackle these problems?',
                    'Some people think that the best way to reduce crime is to give longer prison sentences. Others, however, believe there are better alternative ways of reducing crime. Discuss both views and give your opinion.',
                    'The internet has transformed the way information is shared and consumed. It has also changed the way people interact with each other. Do you think these changes are mostly positive or mostly negative?',
                    'Many young people leave their hometowns to find better job opportunities in big cities. What problems does this cause? What solutions can you suggest?'
                  ].map((q, idx) => (
                    <div key={idx} className="p-4 bg-white border border-gray-200 rounded-lg">
                      <p className="text-gray-700 mb-2">{idx + 1}. <em>"{q}"</em></p>
                      <textarea
                        className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        rows={2}
                        value={answers[idx]}
                        onChange={e => {
                          handleAnswerChange(idx, e.target.value);
                        }}
                        placeholder="Ваш ответ..."
                      />
                      <button
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-all text-sm"
                        onClick={() => handleSave(idx)}
                        type="button"
                      >
                        Сохранить
                      </button>
                      {saved[idx] && <span className="ml-2 text-green-600 text-sm">Сохранено!</span>}
                      {answers[idx] && (
                        <div className="mt-2 text-gray-700 text-sm">
                          <span className="font-medium">Ваш ответ:</span> {answers[idx]}
                          <button
                            className="ml-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-all text-xs"
                            onClick={() => checkAnswer(idx)}
                            type="button"
                          >
                            Проверить
                          </button>
                          {checkResult[idx] && (
                            <div className={`mt-1 ${checkResult[idx].includes('похож') ? 'text-green-600' : 'text-red-600'}`}>{checkResult[idx]}</div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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
                  href="/courses/writing-mastery/lessons/lesson-11"
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
