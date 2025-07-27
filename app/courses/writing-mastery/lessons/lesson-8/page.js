'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState, useEffect } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson8() {
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
      const a = localStorage.getItem(`lesson8_answer_${i}`);
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

  const handleSave = (idx) => {
    localStorage.setItem(`lesson8_answer_${idx}`, answers[idx]);
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
    ['twice as', 'large as', 'twice as large as', 'that of'],
    ['whereas', 'car usage', 'bus usage', 'increased', 'decreased'],
    ['lowest', 'the lowest', 'among', 'studied', 'literacy rate'],
    ['ten times', 'that it was', 'what it was', 'in 2000', 'in 2020'],
    ['similar pattern', 'increase', 'urban', 'rural', 'areas']
  ];

  const checkAnswer = (idx) => {
    const answer = answers[idx].toLowerCase();
    const found = keywords[idx].some(word => answer.includes(word));
    setCheckResult(prev => {
      const next = [...prev];
      next[idx] = found ? 'Вы справились с заданием! Отличная работа!' : 'Попробуйте переформулировать или используйте ключевые слова из задания.';
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
      <WritingMasterySidebar activeLessonId={8} />

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
              <span className="text-4xl mr-4">💡</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Урок 8: Сравнения и контрасты</h1>
                <p className="text-gray-600">Языковые структуры для сравнений • 28 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Языковые структуры для сравнений и контрастов в IELTS Writing Task 1</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                В Task 1 IELTS часто требуется сравнивать и противопоставлять различные данные. Умение эффективно использовать языковые структуры для сравнения и контраста поможет вам получить высокий балл за связность и последовательность текста (Coherence and Cohesion), а также за грамматический диапазон (Grammatical Range).
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Основные структуры для сравнения</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-900 mb-3">Сравнительные конструкции:</h4>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-blue-800">1. Сравнительная степень прилагательных и наречий</p>
                    <div className="mt-2 p-3 bg-white rounded text-gray-700">
                      <p><strong>Структура:</strong> [subject] + [verb] + [comparative adjective/adverb] + than + [subject]</p>
                      <p className="mt-1"><strong>Примеры:</strong></p>
                      <ul className="list-disc pl-5 mt-1 text-blue-800 text-sm">
                        <li><em>"The population of City A grew <strong>more rapidly than</strong> that of City B."</em></li>
                        <li><em>"Oil consumption was <strong>higher than</strong> gas consumption throughout the period."</em></li>
                        <li><em>"Women spent <strong>less time</strong> on leisure activities <strong>than</strong> men did."</em></li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-blue-800">2. Конструкции с "as...as"</p>
                    <div className="mt-2 p-3 bg-white rounded text-gray-700">
                      <p><strong>Структура:</strong> [subject] + [verb] + [as + adjective/adverb + as] + [subject]</p>
                      <p className="mt-1"><strong>Примеры:</strong></p>
                      <ul className="list-disc pl-5 mt-1 text-blue-800 text-sm">
                        <li><em>"The number of visitors in 2020 was <strong>not as high as</strong> in the previous year."</em></li>
                        <li><em>"The rate of increase was <strong>twice as fast as</strong> the rate of decrease."</em></li>
                        <li><em>"The percentage of internet users in rural areas was <strong>almost as high as</strong> in urban regions by the end of the period."</em></li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-blue-800">3. Превосходная степень прилагательных и наречий</p>
                    <div className="mt-2 p-3 bg-white rounded text-gray-700">
                      <p><strong>Структура:</strong> [subject] + [verb] + [the + superlative adjective/adverb]</p>
                      <p className="mt-1"><strong>Примеры:</strong></p>
                      <ul className="list-disc pl-5 mt-1 text-blue-800 text-sm">
                        <li><em>"China had <strong>the highest</strong> carbon emissions among all countries shown."</em></li>
                        <li><em>"2019 was <strong>the most successful</strong> year in terms of sales."</em></li>
                        <li><em>"The elderly spent <strong>the least</strong> amount of time on social media."</em></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Структуры для выражения контраста</h3>
              
              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-green-900 mb-3">Контрастные конструкции:</h4>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-green-800">1. Противительные союзы и наречия</p>
                    <div className="mt-2 p-3 bg-white rounded text-gray-700">
                      <p><strong>Примеры:</strong></p>
                      <ul className="list-disc pl-5 mt-1 text-green-800 text-sm">
                        <li><em>"The number of male students increased, <strong>whereas/while</strong> the number of female students decreased."</em></li>
                        <li><em>"Car ownership increased steadily; <strong>in contrast</strong>, bicycle usage declined."</em></li>
                        <li><em>"Expenditure on healthcare rose significantly. <strong>On the other hand</strong>, spending on education remained stable."</em></li>
                        <li><em>"The urban population grew rapidly; <strong>however</strong>, the rural population showed a slight decline."</em></li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-green-800">2. Параллельные структуры с противопоставлением</p>
                    <div className="mt-2 p-3 bg-white rounded text-gray-700">
                      <p><strong>Примеры:</strong></p>
                      <ul className="list-disc pl-5 mt-1 text-green-800 text-sm">
                        <li><em>"<strong>While</strong> consumption increased in developed countries, <strong>it decreased</strong> in developing nations."</em></li>
                        <li><em>"<strong>Unlike</strong> the situation in Europe, Asia experienced a rapid growth in internet usage."</em></li>
                        <li><em>"The first quarter showed a profit, <strong>as opposed to</strong> the second quarter, which resulted in a loss."</em></li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-green-800">3. Выражение разницы и несоответствия</p>
                    <div className="mt-2 p-3 bg-white rounded text-gray-700">
                      <p><strong>Примеры:</strong></p>
                      <ul className="list-disc pl-5 mt-1 text-green-800 text-sm">
                        <li><em>"There was a <strong>marked difference between</strong> urban and rural internet access rates."</em></li>
                        <li><em>"The two countries <strong>differed significantly in terms of</strong> energy consumption."</em></li>
                        <li><em>"A <strong>notable disparity existed between</strong> male and female employment figures."</em></li>
                        <li><em>"The data <strong>reveals a stark contrast between</strong> the spending habits of different age groups."</em></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Структуры для описания сходств</h3>
              
              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-yellow-900 mb-3">Конструкции для выражения сходства:</h4>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-yellow-800">1. Слова и фразы, указывающие на сходство</p>
                    <div className="mt-2 p-3 bg-white rounded text-gray-700">
                      <p><strong>Примеры:</strong></p>
                      <ul className="list-disc pl-5 mt-1 text-yellow-800 text-sm">
                        <li><em>"<strong>Similarly</strong>, Country B also experienced a rapid increase in tourism."</em></li>
                        <li><em>"Both countries showed a <strong>similar pattern</strong> of economic growth."</em></li>
                        <li><em>"The consumption patterns in these two regions were <strong>remarkably similar</strong>."</em></li>
                        <li><em>"<strong>Like</strong> the previous year, 2019 saw a significant rise in online sales."</em></li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-yellow-800">2. Параллельные структуры для сходства</p>
                    <div className="mt-2 p-3 bg-white rounded text-gray-700">
                      <p><strong>Примеры:</strong></p>
                      <ul className="list-disc pl-5 mt-1 text-yellow-800 text-sm">
                        <li><em>"<strong>Just as</strong> City A experienced population growth, <strong>so too did</strong> City B."</em></li>
                        <li><em>"The trend for men <strong>mirrors that of</strong> women throughout the period."</em></li>
                        <li><em>"<strong>In the same way</strong> as developed countries, developing nations also showed an increase in internet usage."</em></li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-yellow-800">3. Выражение соответствия и корреляции</p>
                    <div className="mt-2 p-3 bg-white rounded text-gray-700">
                      <p><strong>Примеры:</strong></p>
                      <ul className="list-disc pl-5 mt-1 text-yellow-800 text-sm">
                        <li><em>"There was a <strong>strong correlation between</strong> education level and income."</em></li>
                        <li><em>"The two variables <strong>showed a consistent relationship</strong> throughout the period."</em></li>
                        <li><em>"Both graphs <strong>demonstrate a corresponding pattern</strong> of growth and decline."</em></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Сложные сравнительные конструкции</h3>
              
              <div className="bg-purple-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-purple-900 mb-3">Продвинутые структуры для сравнения:</h4>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-purple-800">1. Множественные сравнения</p>
                    <div className="mt-2 p-3 bg-white rounded text-gray-700">
                      <p><strong>Примеры:</strong></p>
                      <ul className="list-disc pl-5 mt-1 text-purple-800 text-sm">
                        <li><em>"Among all the countries shown, Japan had <strong>the highest</strong> literacy rate, followed by South Korea and then China."</em></li>
                        <li><em>"Of the three sectors, services experienced <strong>the most rapid</strong> growth, with manufacturing growing <strong>more slowly</strong> and agriculture showing <strong>the least</strong> development."</em></li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-purple-800">2. Пропорциональные сравнения</p>
                    <div className="mt-2 p-3 bg-white rounded text-gray-700">
                      <p><strong>Примеры:</strong></p>
                      <ul className="list-disc pl-5 mt-1 text-purple-800 text-sm">
                        <li><em>"The rate of increase in urban areas was <strong>twice as high as</strong> that in rural regions."</em></li>
                        <li><em>"Women spent <strong>three times longer</strong> on household chores <strong>than</strong> men did."</em></li>
                        <li><em>"The number of internet users in 2020 was <strong>five times what it had been</strong> in 2000."</em></li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-purple-800">3. Сравнения с использованием процентов и дробей</p>
                    <div className="mt-2 p-3 bg-white rounded text-gray-700">
                      <p><strong>Примеры:</strong></p>
                      <ul className="list-disc pl-5 mt-1 text-purple-800 text-sm">
                        <li><em>"By 2020, the number of smartphone users had increased by <strong>150% compared to</strong> 2010."</em></li>
                        <li><em>"Expenditure on healthcare was <strong>approximately one-third of</strong> the total budget."</em></li>
                        <li><em>"The population of City A was <strong>almost double that of</strong> City B."</em></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Типичные ошибки при использовании сравнительных конструкций</h3>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-3">Распространенные ошибки и их исправление:</h4>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-red-800">1. Двойные сравнения</p>
                    <div className="mt-2 p-3 bg-white rounded text-gray-700">
                      <p><strong>Неправильно:</strong> <em>"The rate of increase was <strong>more higher than</strong> expected."</em></p>
                      <p><strong>Правильно:</strong> <em>"The rate of increase was <strong>higher than</strong> expected."</em> или <em>"The rate of increase was <strong>much higher than</strong> expected."</em></p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-red-800">2. Неправильное использование "than" и "as"</p>
                    <div className="mt-2 p-3 bg-white rounded text-gray-700">
                      <p><strong>Неправильно:</strong> <em>"The number of visitors was <strong>more as</strong> last year."</em></p>
                      <p><strong>Правильно:</strong> <em>"The number of visitors was <strong>more than</strong> last year."</em></p>
                      <p className="mt-1"><strong>Неправильно:</strong> <em>"The results were <strong>not the same than</strong> before."</em></p>
                      <p><strong>Правильно:</strong> <em>"The results were <strong>not the same as</strong> before."</em></p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-red-800">3. Неполные сравнения</p>
                    <div className="mt-2 p-3 bg-white rounded text-gray-700">
                      <p><strong>Неправильно:</strong> <em>"The consumption of water in Country A was higher."</em> (Не указано, с чем сравнивается)</p>
                      <p><strong>Правильно:</strong> <em>"The consumption of water in Country A was higher <strong>than in Country B</strong>."</em></p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-red-800">4. Неправильное использование сравнительной и превосходной степеней</p>
                    <div className="mt-2 p-3 bg-white rounded text-gray-700">
                      <p><strong>Неправильно:</strong> <em>"This was the better result among all three experiments."</em> (Для сравнения трех и более объектов нужна превосходная степень)</p>
                      <p><strong>Правильно:</strong> <em>"This was <strong>the best</strong> result among all three experiments."</em></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Интерактивное задание */}
          <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Интерактивное задание</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Задание:</h4>
                <p className="text-gray-700 mb-4">Перепишите следующие предложения, используя указанные в скобках сравнительные конструкции:</p>
                
                <div className="space-y-4">
                  {[
                    'The population of City A is 2 million. The population of City B is 1 million. (использовать "twice as...as")',
                    'Car usage increased by 30%. Bus usage decreased by 15%. (использовать "whereas")',
                    'France, Germany, and Italy were studied. Italy had the lowest literacy rate. (использовать превосходную степень)',
                    'The number of internet users in 2000 was 400 million. The number in 2020 was 4 billion. (использовать "ten times")',
                    'Both urban and rural areas showed an increase in smartphone usage. (использовать "similar pattern")'
                  ].map((q, idx) => (
                    <div key={idx} className="p-4 bg-white border border-gray-200 rounded-lg">
                      <p className="text-gray-700 mb-2">{idx + 1}. "{q}"</p>
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
                <h4 className="font-semibold text-blue-900 mb-3">Советы по использованию сравнительных конструкций:</h4>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li><strong>Разнообразьте свои конструкции</strong> — не используйте одни и те же сравнительные структуры на протяжении всего текста.</li>
                  <li><strong>Убедитесь, что сравнения логичны</strong> — сравнивайте сопоставимые вещи (например, проценты с процентами, а не с абсолютными числами).</li>
                  <li><strong>Используйте точные данные</strong> — подкрепляйте сравнения конкретными цифрами из предоставленной информации.</li>
                  <li><strong>Избегайте преувеличений</strong> — не используйте слишком сильные выражения, если данные не подтверждают этого.</li>
                  <li><strong>Проверяйте грамматику</strong> — убедитесь, что вы правильно используете сравнительные и превосходные степени прилагательных и наречий.</li>
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
                  href="/courses/writing-mastery/lessons/lesson-9"
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
