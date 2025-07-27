'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState, useEffect } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson16() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [saved, setSaved] = useState([false, false, false, false]);
  const [checkResult, setCheckResult] = useState([null, null, null, null]);

  useEffect(() => {
    const savedAnswers = [];
    for (let i = 0; i < 4; i++) {
      const a = localStorage.getItem(`lesson16_answer_${i}`);
      savedAnswers.push(a || '');
    }
    setAnswers(savedAnswers);
  }, []);

  const handleSave = (idx) => {
    localStorage.setItem(`lesson16_answer_${idx}`, answers[idx]);
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

  const keywords = [
    ['although', 'but', 'however', 'yet', 'though', 'while'],
    ['because', 'since', 'as', 'therefore', 'so', 'due to'],
    ['if', 'unless', 'provided', 'as long as', 'when'],
    ['because', 'so that', 'in order to', 'as a result', 'if', 'although', 'while']
  ];

  const checkAnswer = (idx) => {
    const answer = answers[idx].toLowerCase();
    const found = keywords[idx].some(word => answer.includes(word));
    setCheckResult(prev => {
      const next = [...prev];
      next[idx] = found ? 'Вы справились с заданием! Отличная работа!' : 'Попробуйте переформулировать или используйте сложное предложение.';
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
  const lessonId = 16;
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
      <WritingMasterySidebar activeLessonId={16} />

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
              <span className="text-4xl mr-4">✍️</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Урок 16: Сложные предложения</h1>
                <p className="text-gray-600">Грамматические структуры • 32 минуты</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Сложные предложения в академическом письме</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Использование сложных предложений является важным аспектом академического письма, который демонстрирует ваше владение языком и способность выражать сложные идеи. В этом уроке мы рассмотрим различные типы сложных предложений и научимся эффективно использовать их в эссе для IELTS Writing.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Почему важны сложные предложения?</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li><strong>Демонстрация языковой компетенции</strong> — использование разнообразных грамматических структур показывает высокий уровень владения языком.</li>
                  <li><strong>Логические связи</strong> — сложные предложения позволяют четко выразить связи между идеями (причина-следствие, противопоставление, условие и т.д.).</li>
                  <li><strong>Разнообразие текста</strong> — чередование простых и сложных предложений делает текст более динамичным и интересным для чтения.</li>
                  <li><strong>Более высокая оценка</strong> — в критериях оценки IELTS Writing учитывается разнообразие грамматических структур.</li>
                  <li><strong>Эффективное использование слов</strong> — сложные предложения позволяют выразить больше идей в рамках ограниченного объема текста.</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Типы сложных предложений</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Сложносочиненные предложения (Compound Sentences)</h4>
                  <p className="text-gray-700">Состоят из двух или более независимых предложений, соединенных координирующими союзами (and, but, or, so, yet, for, nor) или точкой с запятой.</p>
                  
                  <div className="mt-2 p-3 bg-white rounded text-gray-700">
                    <p><strong>Структура:</strong> [независимое предложение] + [координирующий союз] + [независимое предложение]</p>
                    <p className="mt-2"><strong>Примеры:</strong></p>
                    <ul className="list-disc pl-5 mt-1 text-blue-800 text-sm space-y-1">
                      <li><em>"The government has invested in renewable energy, <strong>but</strong> the results have been disappointing."</em></li>
                      <li><em>"Education is essential for economic development, <strong>and</strong> it also promotes social equality."</em></li>
                      <li><em>"Some people prefer urban living; <strong>others</strong> enjoy the tranquility of rural areas."</em></li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Сложноподчиненные предложения (Complex Sentences)</h4>
                  <p className="text-gray-700">Состоят из одного независимого предложения и одного или нескольких зависимых предложений (придаточных).</p>
                  
                  <div className="mt-2 p-3 bg-white rounded text-gray-700">
                    <p><strong>Структура:</strong> [независимое предложение] + [подчинительный союз + зависимое предложение]</p>
                    <p className="mt-2"><strong>Примеры:</strong></p>
                    <ul className="list-disc pl-5 mt-1 text-blue-800 text-sm space-y-1">
                      <li><em>"<strong>Although</strong> renewable energy has many advantages, it still faces significant implementation challenges."</em></li>
                      <li><em>"The government should invest in public transport <strong>because</strong> it reduces traffic congestion and air pollution."</em></li>
                      <li><em>"<strong>When</strong> people have access to quality education, they are more likely to find well-paid employment."</em></li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">3. Сложносочиненно-подчиненные предложения (Compound-Complex Sentences)</h4>
                  <p className="text-gray-700">Содержат как минимум два независимых предложения и одно или несколько зависимых предложений.</p>
                  
                  <div className="mt-2 p-3 bg-white rounded text-gray-700">
                    <p><strong>Структура:</strong> Комбинация сложносочиненных и сложноподчиненных структур</p>
                    <p className="mt-2"><strong>Примеры:</strong></p>
                    <ul className="list-disc pl-5 mt-1 text-blue-800 text-sm space-y-1">
                      <li><em>"<strong>Although</strong> many countries have signed climate agreements, implementation has been slow, <strong>and</strong> global emissions continue to rise."</em></li>
                      <li><em>"Education should be a priority <strong>because</strong> it drives economic growth, <strong>but</strong> many governments fail to allocate sufficient resources to schools."</em></li>
                      <li><em>"<strong>When</strong> people have access to technology, they can learn new skills, <strong>and</strong> they become more competitive in the job market."</em></li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Основные типы придаточных предложений</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">1. Придаточные времени (Time Clauses)</h4>
                  <p className="text-green-800">Указывают на время действия. Используются союзы: when, while, as, before, after, until, since, as soon as.</p>
                  <p className="text-green-800 text-sm italic mt-1">
                    "<strong>After</strong> the government implemented new policies, the economy began to improve."
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">2. Придаточные причины (Reason Clauses)</h4>
                  <p className="text-green-800">Объясняют причину. Используются союзы: because, since, as, due to the fact that.</p>
                  <p className="text-green-800 text-sm italic mt-1">
                    "Many species are becoming extinct <strong>because</strong> their habitats are being destroyed."
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">3. Придаточные условия (Conditional Clauses)</h4>
                  <p className="text-green-800">Выражают условие. Используются союзы: if, unless, provided that, as long as.</p>
                  <p className="text-green-800 text-sm italic mt-1">
                    "<strong>If</strong> governments invest more in renewable energy, carbon emissions will decrease significantly."
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">4. Придаточные уступки (Concession Clauses)</h4>
                  <p className="text-green-800">Выражают противопоставление или неожиданный результат. Используются союзы: although, though, even though, despite the fact that, while.</p>
                  <p className="text-green-800 text-sm italic mt-1">
                    "<strong>Although</strong> technology has many benefits, it can also have negative effects on social interaction."
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">5. Придаточные цели (Purpose Clauses)</h4>
                  <p className="text-green-800">Указывают на цель действия. Используются союзы: so that, in order that, to, in order to.</p>
                  <p className="text-green-800 text-sm italic mt-1">
                    "Governments should invest in education <strong>so that</strong> future generations can compete in the global economy."
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">6. Придаточные результата (Result Clauses)</h4>
                  <p className="text-green-800">Указывают на результат действия. Используются союзы: so...that, such...that.</p>
                  <p className="text-green-800 text-sm italic mt-1">
                    "The cost of housing has risen <strong>so dramatically that</strong> many young people cannot afford to buy their first home."
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">7. Определительные придаточные (Relative Clauses)</h4>
                  <p className="text-green-800">Дают дополнительную информацию о существительном. Используются относительные местоимения: who, which, that, whose, whom, where.</p>
                  <p className="text-green-800 text-sm italic mt-1">
                    "People <strong>who</strong> have access to quality education generally enjoy better employment opportunities."
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Советы по использованию сложных предложений</h3>
              
              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <ul className="list-disc pl-6 text-yellow-800 space-y-2">
                  <li><strong>Стремитесь к разнообразию</strong> — используйте различные типы сложных предложений и союзов.</li>
                  <li><strong>Соблюдайте баланс</strong> — чередуйте простые и сложные предложения для лучшего ритма текста.</li>
                  <li><strong>Избегайте чрезмерной сложности</strong> — слишком длинные и запутанные предложения могут быть трудны для понимания.</li>
                  <li><strong>Следите за пунктуацией</strong> — правильно используйте запятые и другие знаки препинания в сложных предложениях.</li>
                  <li><strong>Проверяйте грамматическую согласованность</strong> — убедитесь, что времена глаголов согласованы в разных частях предложения.</li>
                  <li><strong>Используйте сложные предложения осознанно</strong> — они должны помогать выражать логические связи между идеями, а не просто демонстрировать сложность.</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Распространенные ошибки при использовании сложных предложений</h3>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-red-800 mb-1">1. Фрагментация предложений</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="text-red-700 text-sm"><strong>Неправильно:</strong> <em>"Although many countries have signed environmental agreements. Global pollution continues to increase."</em></p>
                      <p className="text-green-700 text-sm mt-1"><strong>Правильно:</strong> <em>"Although many countries have signed environmental agreements, global pollution continues to increase."</em></p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-red-800 mb-1">2. Слияние предложений (run-on sentences)</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="text-red-700 text-sm"><strong>Неправильно:</strong> <em>"Education is important it provides many opportunities for young people."</em></p>
                      <p className="text-green-700 text-sm mt-1"><strong>Правильно:</strong> <em>"Education is important because it provides many opportunities for young people."</em></p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-red-800 mb-1">3. Неправильное использование запятых</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="text-red-700 text-sm"><strong>Неправильно:</strong> <em>"When people have access to technology they can learn new skills."</em></p>
                      <p className="text-green-700 text-sm mt-1"><strong>Правильно:</strong> <em>"When people have access to technology, they can learn new skills."</em></p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-red-800 mb-1">4. Несогласованность времен</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="text-red-700 text-sm"><strong>Неправильно:</strong> <em>"If governments invest more in education, unemployment rates will decreased."</em></p>
                      <p className="text-green-700 text-sm mt-1"><strong>Правильно:</strong> <em>"If governments invest more in education, unemployment rates will decrease."</em></p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-red-800 mb-1">5. Чрезмерно длинные предложения</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="text-red-700 text-sm"><strong>Неправильно:</strong> <em>"Although many countries have signed environmental agreements, which were designed to reduce carbon emissions and protect biodiversity, implementation has been slow and ineffective, and global pollution continues to increase, which threatens the future of our planet and the well-being of future generations."</em></p>
                      <p className="text-green-700 text-sm mt-1"><strong>Правильно:</strong> <em>"Although many countries have signed environmental agreements designed to reduce carbon emissions, implementation has been slow and ineffective. As a result, global pollution continues to increase, threatening the future of our planet."</em></p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Практическое задание</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <p className="text-blue-800 mb-4">Объедините каждую пару простых предложений в одно сложное предложение, используя указанный тип связи:</p>
                
                <ol className="list-decimal pl-6 text-blue-800 space-y-3">
                  {[0,1,2,3].map(idx => (
                    <li key={idx} className="mb-4">
                      <p className="text-blue-700 mb-1">{idx === 0 ? 'Технологии меняют способ обучения. Не все студенты имеют доступ к компьютерам.' : idx === 1 ? 'Правительство увеличило финансирование образования. Качество школ улучшилось.' : idx === 2 ? 'Люди будут меньше использовать автомобили. Общественный транспорт должен стать более эффективным.' : 'Города становятся все более перенаселенными. Правительства должны инвестировать в развитие сельских районов. Это может снизить миграцию в городские центры.'}</p>
                      <div className="mt-2">
                        <textarea
                          className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          rows={3}
                          value={answers[idx]}
                          onChange={e => handleAnswerChange(idx, e.target.value)}
                          placeholder="Напишите сложное предложение..."
                        />
                        <div className="flex items-center mb-2">
                          <button
                            onClick={() => handleSave(idx)}
                            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-all text-sm"
                          >
                            Сохранить
                          </button>
                          {saved[idx] && <span className="ml-2 text-green-600 text-sm">Сохранено!</span>}
                          <button
                            onClick={() => checkAnswer(idx)}
                            className="ml-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-all text-xs"
                          >
                            Проверить
                          </button>
                        </div>
                        {checkResult[idx] && (
                          <div className={checkResult[idx].includes('похож') ? 'mt-1 text-green-600' : 'mt-1 text-red-600'}>{checkResult[idx]}</div>
                        )}
                        {answers[idx] && (
                          <div className="mt-2"><span className="font-medium">Ваш ответ:</span> {answers[idx]}</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
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
                  href="/courses/writing-mastery/lessons/lesson-17"
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
