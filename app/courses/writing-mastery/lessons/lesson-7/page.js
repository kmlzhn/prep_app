'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState, useEffect } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson7() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [answers, setAnswers] = useState([
    '', '', '', '', ''
  ]);
  const [saved, setSaved] = useState([false, false, false, false, false]);
  const [checkResult, setCheckResult] = useState([null, null, null, null, null]);

  useEffect(() => {
    const savedAnswers = [];
    for (let i = 0; i < 5; i++) {
      const a = localStorage.getItem(`lesson7_answer_${i}`);
      savedAnswers.push(a || '');
    }
    setAnswers(savedAnswers);
  }, []);

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'writing-mastery';
  const lessonId = 7;
  const completed = isLessonCompleted(courseSlug, lessonId);

  const handleSave = (idx) => {
    localStorage.setItem(`lesson7_answer_${idx}`, answers[idx]);
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

  // Эталонные ключевые слова для проверки (можно расширить)
  const keywords = [
    ['increase', 'rise', 'grew', 'substantial', 'significant', 'from 2 million', 'to 5 million', '2010', '2020'],
    ['decline', 'decrease', 'fell', '15%', 'final quarter', 'last quarter'],
    ['fluctuated', 'considerably', 'significantly', 'throughout the year', 'changed a lot'],
    ['proportion', 'respondents', 'survey', '40%', 'participants', 'satisfaction', 'liked'],
    ['contrast', 'disparity', 'difference', 'internet usage', 'urban', 'rural', 'cities', 'areas']
  ];

  const checkAnswer = (idx) => {
    const answer = answers[idx].toLowerCase();
    const found = keywords[idx].some(word => answer.includes(word));
    setCheckResult(prev => {
      const next = [...prev];
      next[idx] = found ? 'Вы справились с заданием! Отличная работа!' : 'Попробуйте переформулировать или используйте более академическую лексику.';
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <WritingMasterySidebar activeLessonId={7} />

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
                <h1 className="text-3xl font-bold text-gray-900">Урок 7: Академическая лексика</h1>
                <p className="text-gray-600">Словарь для описания данных • 35 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Академическая лексика для описания данных в IELTS Writing Task 1</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Использование разнообразной и точной академической лексики — один из ключевых факторов получения высокого балла за Task 1. В этом уроке мы рассмотрим словарный запас, необходимый для эффективного описания различных типов данных и визуальной информации.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Общие принципы использования академической лексики</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-900 mb-3">Ключевые рекомендации:</h4>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li><strong>Точность</strong> — используйте слова, точно описывающие данные (например, "fluctuated" вместо "changed" для описания нестабильных изменений).</li>
                  <li><strong>Разнообразие</strong> — избегайте повторения одних и тех же слов, используйте синонимы.</li>
                  <li><strong>Формальность</strong> — используйте формальный академический стиль, избегайте разговорных выражений и сокращений.</li>
                  <li><strong>Специфичность</strong> — используйте специальную лексику для описания конкретных типов данных.</li>
                  <li><strong>Умеренность</strong> — не используйте слишком сложные или редкие слова только ради впечатления.</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Лексика для описания тенденций и изменений</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">Рост и увеличение:</h4>
                  <div className="space-y-2 text-green-800">
                    <p><strong>Существительные:</strong> increase, rise, growth, surge, upward trend, upswing, increment, expansion</p>
                    <p><strong>Глаголы:</strong> increase, rise, grow, climb, surge, soar, escalate, ascend, intensify</p>
                    <p><strong>Примеры:</strong> <em>"There was a significant increase in oil prices."</em> / <em>"The population grew steadily over the period."</em></p>
                  </div>
                </div>
                
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-3">Падение и уменьшение:</h4>
                  <div className="space-y-2 text-red-800">
                    <p><strong>Существительные:</strong> decrease, decline, fall, drop, reduction, downturn, slump, contraction</p>
                    <p><strong>Глаголы:</strong> decrease, decline, fall, drop, reduce, diminish, plummet, plunge, shrink</p>
                    <p><strong>Примеры:</strong> <em>"The unemployment rate saw a steady decline."</em> / <em>"Sales plummeted in the fourth quarter."</em></p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-3">Стабильность и отсутствие изменений:</h4>
                  <div className="space-y-2 text-yellow-800">
                    <p><strong>Существительные:</strong> stability, plateau, constancy, equilibrium, steadiness</p>
                    <p><strong>Глаголы:</strong> remain stable, stabilize, level off, plateau, stay constant, maintain, persist</p>
                    <p><strong>Примеры:</strong> <em>"Prices remained stable throughout the year."</em> / <em>"The rate of inflation plateaued at 3%."</em></p>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-3">Колебания и нестабильность:</h4>
                  <div className="space-y-2 text-purple-800">
                    <p><strong>Существительные:</strong> fluctuation, variation, volatility, oscillation, irregularity</p>
                    <p><strong>Глаголы:</strong> fluctuate, vary, oscillate, alternate, waver, seesaw</p>
                    <p><strong>Примеры:</strong> <em>"The stock market fluctuated wildly during this period."</em> / <em>"Temperatures varied considerably from month to month."</em></p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Лексика для описания скорости и степени изменений</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Наречия и прилагательные для описания изменений:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-blue-50 rounded">
                    <strong className="text-blue-900">Быстрые изменения:</strong>
                    <ul className="list-disc pl-5 mt-1 text-blue-800 text-sm">
                      <li>rapidly, sharply, dramatically</li>
                      <li>steep, abrupt, precipitous</li>
                      <li>sudden, swift, quick</li>
                      <li>substantial, considerable</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded">
                    <strong className="text-green-900">Умеренные изменения:</strong>
                    <ul className="list-disc pl-5 mt-1 text-green-800 text-sm">
                      <li>gradually, steadily, moderately</li>
                      <li>consistent, regular, moderate</li>
                      <li>progressive, incremental</li>
                      <li>measured, controlled</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 rounded">
                    <strong className="text-yellow-900">Незначительные изменения:</strong>
                    <ul className="list-disc pl-5 mt-1 text-yellow-800 text-sm">
                      <li>slightly, marginally, minimally</li>
                      <li>minor, subtle, negligible</li>
                      <li>fractional, nominal</li>
                      <li>barely, hardly, scarcely</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-red-50 rounded">
                    <strong className="text-red-900">Значительные изменения:</strong>
                    <ul className="list-disc pl-5 mt-1 text-red-800 text-sm">
                      <li>significantly, substantially, markedly</li>
                      <li>major, notable, remarkable</li>
                      <li>pronounced, striking, prominent</li>
                      <li>profound, extensive, far-reaching</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded">
                    <strong className="text-purple-900">Постоянные изменения:</strong>
                    <ul className="list-disc pl-5 mt-1 text-purple-800 text-sm">
                      <li>consistently, persistently, continuously</li>
                      <li>constant, uninterrupted, sustained</li>
                      <li>ongoing, unceasing, relentless</li>
                      <li>steady, stable, unwavering</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-orange-50 rounded">
                    <strong className="text-orange-900">Временные изменения:</strong>
                    <ul className="list-disc pl-5 mt-1 text-orange-800 text-sm">
                      <li>temporarily, momentarily, briefly</li>
                      <li>transient, short-lived, fleeting</li>
                      <li>interim, provisional</li>
                      <li>ephemeral, passing</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Лексика для сравнения и сопоставления</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Выражения для сравнения:</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>compared to/with</li>
                      <li>in comparison with</li>
                      <li>relative to</li>
                      <li>as opposed to</li>
                      <li>in contrast to/with</li>
                      <li>similarly, likewise</li>
                      <li>in the same way</li>
                      <li>correspondingly</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Выражения для указания различий:</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>whereas, while</li>
                      <li>however, nevertheless</li>
                      <li>on the other hand</li>
                      <li>in contrast</li>
                      <li>conversely</li>
                      <li>unlike</li>
                      <li>differed significantly</li>
                      <li>showed a marked difference</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded text-blue-800 text-sm">
                  <p className="font-semibold mb-2">Примеры использования:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><em>"Compared to urban areas, rural regions showed a much slower rate of population growth."</em></li>
                    <li><em>"The consumption of renewable energy increased significantly, whereas fossil fuel usage declined steadily."</em></li>
                    <li><em>"Internet usage in developed countries remained relatively stable, in contrast to developing nations where it rose dramatically."</em></li>
                    <li><em>"Similarly, both countries experienced a surge in tourism during the summer months."</em></li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Лексика для описания пропорций и долей</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Выражения для описания долей:</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>a proportion of</li>
                      <li>a percentage of</li>
                      <li>a fraction of</li>
                      <li>a share of</li>
                      <li>a segment of</li>
                      <li>accounted for</li>
                      <li>constituted</li>
                      <li>comprised</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Выражения для описания большинства/меньшинства:</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>the majority of</li>
                      <li>the minority of</li>
                      <li>a significant proportion of</li>
                      <li>a substantial percentage of</li>
                      <li>a considerable share of</li>
                      <li>a small fraction of</li>
                      <li>predominant, prevalent</li>
                      <li>marginal, negligible</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded text-blue-800 text-sm">
                  <p className="font-semibold mb-2">Примеры использования:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><em>"Renewable energy sources accounted for 35% of total energy production in 2020."</em></li>
                    <li><em>"A significant proportion of respondents (68%) expressed satisfaction with the new policy."</em></li>
                    <li><em>"The service sector constituted the largest segment of the economy, representing over 70% of GDP."</em></li>
                    <li><em>"Only a small fraction of the population (less than 5%) had access to these facilities."</em></li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Полезные фразовые шаблоны для Task 1</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Для введения:</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>The graph/chart/table/diagram illustrates/shows/presents/depicts...</li>
                      <li>The data provides information about...</li>
                      <li>The figure demonstrates/represents...</li>
                      <li>As can be seen from the graph/chart/table...</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Для обзора:</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Overall, it is clear that...</li>
                      <li>In general, the data indicates/suggests that...</li>
                      <li>The most striking feature of the data is...</li>
                      <li>It is evident from the information that...</li>
                      <li>A notable trend shown by the data is...</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Для детального описания:</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>According to the data/information provided...</li>
                      <li>The graph/chart/table reveals that...</li>
                      <li>It can be observed from the figure that...</li>
                      <li>The data indicates/demonstrates/highlights that...</li>
                      <li>As illustrated by the graph/chart/table...</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Для указания на конкретные данные:</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>The figure for X stood at/reached/was...</li>
                      <li>X accounted for/constituted/represented...</li>
                      <li>The highest/lowest value was recorded in/for...</li>
                      <li>There was a significant/substantial/marginal difference between...</li>
                      <li>The period saw a dramatic/steady/slight change in...</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Практическое задание */}
          <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Практическое задание</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Задание:</h4>
                <p className="text-gray-700 mb-4">Перепишите следующие предложения, используя более разнообразную и академическую лексику:</p>
                
                <div className="space-y-4">
                  {[
                    'The number of tourists went up from 2 million to 5 million between 2010 and 2020.',
                    'Car sales went down by 15% in the last quarter.',
                    'The price of oil changed a lot during the year.',
                    '40% of the people in the survey said they liked the product.',
                    'The graph shows that internet usage was different in cities and rural areas.'
                  ].map((q, idx) => (
                    <div key={idx} className="p-4 bg-white border border-gray-200 rounded-lg">
                      <p className="text-gray-500 mb-2">{idx + 1}. <em>"{q}"</em></p>
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
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Советы для расширения академического словарного запаса:</h4>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li><strong>Ведите словарь</strong> — записывайте полезные слова и выражения, группируя их по категориям (рост, падение, сравнение и т.д.).</li>
                  <li><strong>Читайте академические тексты</strong> — обращайте внимание на то, как авторы описывают данные и статистику.</li>
                  <li><strong>Практикуйтесь в перефразировании</strong> — регулярно переписывайте простые предложения, используя более сложную лексику.</li>
                  <li><strong>Используйте тезаурус</strong> — ищите синонимы для часто используемых слов, но убедитесь, что вы понимаете их точное значение.</li>
                  <li><strong>Анализируйте образцы высоких баллов</strong> — изучайте, какую лексику используют успешные кандидаты.</li>
                </ul>
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
                  href="/courses/writing-mastery/lessons/lesson-8"
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
