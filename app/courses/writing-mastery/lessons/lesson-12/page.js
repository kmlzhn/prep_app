'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState, useEffect } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson12() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [answer, setAnswer] = useState('');
  const [saved, setSaved] = useState(false);
  const [checkResult, setCheckResult] = useState(null);

  useEffect(() => {
    const a = localStorage.getItem('lesson12_answer_0');
    setAnswer(a || '');
  }, []);

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'writing-mastery';
  const lessonId = 12;
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
    localStorage.setItem('lesson12_answer_0', answer);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const keywords = [
    'sports facilities', 'public health', 'physical activity', 'obesity', 'diabetes', 'cardiovascular', 'example', 'study', 'Finland', 'Copenhagen', 'Amsterdam', 'infrastructure', 'life expectancy', 'healthcare costs', 'wellbeing'
  ];

  const checkAnswer = () => {
    const ans = answer.toLowerCase();
    const found = keywords.some(word => ans.includes(word));
    setCheckResult(found ? 'Вы справились с заданием! Отличная работа!' : 'Попробуйте переформулировать или используйте ключевые слова из задания.');
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
    setCheckResult(null); // Сброс фидбека при изменении ответа
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <WritingMasterySidebar activeLessonId={12} />

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
                <h1 className="text-3xl font-bold text-gray-900">Урок 12: Основные параграфы</h1>
                <p className="text-gray-600">Развитие идей и аргументов • 30 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Основные параграфы в IELTS Writing Task 2</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Основные параграфы составляют большую часть вашего эссе и представляют собой место, где вы развиваете свои аргументы и идеи. Хорошо структурированные и содержательные параграфы основной части имеют решающее значение для получения высоких баллов за Task Achievement и Coherence and Cohesion.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Структура основного параграфа</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-900 mb-3">Модель PEEL для построения параграфа:</h4>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="font-bold text-blue-900 text-center">P</p>
                    <p className="font-medium text-blue-800 text-center">Point</p>
                    <p className="text-blue-700 text-sm text-center mt-2">Тематическое предложение с основной идеей параграфа</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="font-bold text-blue-900 text-center">E</p>
                    <p className="font-medium text-blue-800 text-center">Explanation</p>
                    <p className="text-blue-700 text-sm text-center mt-2">Объяснение и развитие основной идеи</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="font-bold text-blue-900 text-center">E</p>
                    <p className="font-medium text-blue-800 text-center">Example</p>
                    <p className="text-blue-700 text-sm text-center mt-2">Конкретный пример, подтверждающий вашу идею</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="font-bold text-blue-900 text-center">L</p>
                    <p className="font-medium text-blue-800 text-center">Link</p>
                    <p className="text-blue-700 text-sm text-center mt-2">Связь с темой эссе или переход к следующему параграфу</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Компоненты основного параграфа</h3>
              
              <div className="space-y-6 mb-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">1. Тематическое предложение (Topic Sentence)</h4>
                  <div className="space-y-3">
                    <p className="text-gray-700">Тематическое предложение — это первое предложение параграфа, которое представляет основную идею или аргумент, который будет развиваться в этом параграфе.</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Характеристики хорошего тематического предложения:</p>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Ясно выражает одну основную идею</li>
                        <li>Связано с темой эссе и вашей общей позицией</li>
                        <li>Не слишком общее и не слишком конкретное</li>
                        <li>Служит "мини-заголовком" для параграфа</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Примеры тематических предложений:</p>
                      <ul className="list-disc pl-5 text-sm">
                        <li><em>"One of the main advantages of public transportation is its positive environmental impact."</em></li>
                        <li><em>"Free university education can lead to significant economic benefits for society as a whole."</em></li>
                        <li><em>"The primary reason why governments should invest in renewable energy sources is long-term sustainability."</em></li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">2. Объяснение и развитие идеи (Explanation)</h4>
                  <div className="space-y-3">
                    <p className="text-gray-700">После тематического предложения необходимо объяснить и развить вашу основную идею. Это включает в себя более детальное рассмотрение аргумента, его обоснование и анализ.</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Техники для развития идеи:</p>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Определение ключевых терминов</li>
                        <li>Объяснение причинно-следственных связей</li>
                        <li>Анализ различных аспектов проблемы</li>
                        <li>Рассмотрение последствий или результатов</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Пример объяснения:</p>
                      <p className="text-sm"><em>"Public transportation systems significantly reduce carbon emissions by decreasing the number of private vehicles on the road. When people choose to travel by bus or train instead of driving individual cars, the overall fuel consumption and pollution levels drop dramatically. Moreover, modern public transit vehicles are increasingly adopting eco-friendly technologies, further minimizing their environmental footprint."</em></p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">3. Примеры и доказательства (Examples)</h4>
                  <div className="space-y-3">
                    <p className="text-gray-700">Конкретные примеры и доказательства придают вашим аргументам убедительность и достоверность. Они показывают экзаменатору, что вы можете подкрепить свои утверждения фактами.</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Типы примеров:</p>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Реальные случаи и ситуации</li>
                        <li>Статистические данные</li>
                        <li>Исторические события</li>
                        <li>Сравнения между странами или системами</li>
                        <li>Личный опыт (использовать с осторожностью)</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Пример использования доказательств:</p>
                      <p className="text-sm"><em>"For instance, in cities like Copenhagen and Amsterdam, where public transportation and cycling infrastructure are well-developed, carbon emissions from the transportation sector are significantly lower than in car-dependent cities. Copenhagen has reduced its carbon emissions by approximately 40% since 1990, largely due to its efficient public transit system and cycling culture. Similarly, Tokyo's extensive train network serves millions of commuters daily, preventing the emission of thousands of tons of greenhouse gases that would otherwise be produced by private vehicles."</em></p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">4. Связь с темой или переход (Link)</h4>
                  <div className="space-y-3">
                    <p className="text-gray-700">Заключительное предложение параграфа должно связывать ваш аргумент с общей темой эссе или создавать плавный переход к следующему параграфу.</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Функции заключительного предложения:</p>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Подведение итога аргумента</li>
                        <li>Связь с вашей общей позицией или тезисом</li>
                        <li>Создание плавного перехода к следующей идее</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Примеры связующих предложений:</p>
                      <ul className="list-disc pl-5 text-sm">
                        <li><em>"Thus, the environmental benefits of public transportation make it a crucial component of sustainable urban planning."</em></li>
                        <li><em>"While environmental advantages are significant, the economic benefits of public transportation are equally important to consider."</em> (переход к следующему параграфу)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Пример полного параграфа</h3>
              
              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <p className="text-green-800 mb-4"><strong>Тема:</strong> <em>"Some people believe that governments should focus on reducing environmental pollution, while others think that other issues are more important. Discuss both views and give your opinion."</em></p>
                
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-gray-700"><span className="bg-blue-100 px-1">One of the main arguments for prioritizing environmental pollution is its direct impact on public health.</span> When air, water, and soil become contaminated with harmful substances, they pose serious risks to human well-being. Pollutants such as particulate matter, nitrogen oxides, and toxic chemicals can cause respiratory diseases, cardiovascular problems, and even cancer when people are exposed to them regularly. <span className="bg-yellow-100 px-1">For example, a 2019 study by the World Health Organization found that air pollution alone contributes to approximately 7 million premature deaths worldwide each year, with higher rates in heavily industrialized urban areas.</span> In cities like Beijing and New Delhi, where air quality regularly reaches hazardous levels, hospitals report significant increases in respiratory admissions during pollution peaks. Children and elderly populations are particularly vulnerable, suffering from asthma and other chronic conditions at alarming rates. <span className="bg-green-100 px-1">Therefore, addressing environmental pollution is not merely an ecological concern but a critical public health issue that directly affects millions of lives, making it a legitimate priority for government action.</span></p>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-2">
                  <div className="p-2 bg-blue-100 rounded">
                    <p className="text-xs font-bold text-blue-800">POINT</p>
                    <p className="text-sm text-blue-700">Тематическое предложение с основной идеей о влиянии загрязнения на здоровье</p>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <p className="text-xs font-bold text-gray-800">EXPLANATION</p>
                    <p className="text-sm text-gray-700">Объяснение связи между загрязнением и проблемами со здоровьем</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded">
                    <p className="text-xs font-bold text-yellow-800">EXAMPLE</p>
                    <p className="text-sm text-yellow-700">Конкретные примеры и статистика от ВОЗ, примеры городов</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded">
                    <p className="text-xs font-bold text-green-800">LINK</p>
                    <p className="text-sm text-green-700">Связь с темой о приоритетах правительства</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Типы основных параграфов для разных эссе</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Для эссе-мнения:</h4>
                  <p className="text-blue-800">Каждый параграф должен представлять один сильный аргумент в поддержку вашей позиции. Все параграфы должны работать на подтверждение вашего мнения.</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Для эссе-обсуждения:</h4>
                  <p className="text-green-800">Один или несколько параграфов для первой точки зрения, один или несколько для противоположной точки зрения, и возможно отдельный параграф для вашего мнения.</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Для эссе проблема-решение:</h4>
                  <p className="text-yellow-800">Один или несколько параграфов для описания проблем, и один или несколько для предложения решений.</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Для эссе о преимуществах и недостатках:</h4>
                  <p className="text-purple-800">Один или несколько параграфов для преимуществ, и один или несколько для недостатков.</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Советы по написанию эффективных основных параграфов</h3>
              
              <div className="bg-yellow-50 p-6 rounded-lg">
                <ul className="list-disc pl-6 text-yellow-800 space-y-2">
                  <li><strong>Один параграф — одна идея</strong> — каждый параграф должен развивать только одну основную мысль.</li>
                  <li><strong>Используйте тематические предложения</strong> — начинайте каждый параграф с четкого тематического предложения.</li>
                  <li><strong>Подкрепляйте утверждения примерами</strong> — конкретные примеры делают ваши аргументы более убедительными.</li>
                  <li><strong>Соблюдайте логическую последовательность</strong> — идеи должны развиваться логически внутри параграфа.</li>
                  <li><strong>Используйте связующие слова</strong> — применяйте слова-связки для обеспечения плавного перехода между предложениями.</li>
                  <li><strong>Соблюдайте баланс</strong> — параграфы должны быть примерно одинаковой длины (4-6 предложений).</li>
                  <li><strong>Избегайте повторений</strong> — не повторяйте одни и те же идеи или примеры в разных параграфах.</li>
                  <li><strong>Создавайте плавные переходы</strong> — обеспечьте логические связи между параграфами.</li>
                </ul>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Типичные ошибки в основных параграфах</h3>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <ul className="list-disc pl-6 text-red-800 space-y-2">
                  <li><strong>Слишком много идей в одном параграфе</strong> — это затрудняет понимание и снижает ясность.</li>
                  <li><strong>Отсутствие тематического предложения</strong> — читателю трудно понять основную идею параграфа.</li>
                  <li><strong>Недостаточное развитие идеи</strong> — поверхностное рассмотрение аргумента без должного объяснения.</li>
                  <li><strong>Отсутствие примеров</strong> — утверждения без подтверждающих примеров выглядят необоснованными.</li>
                  <li><strong>Нерелевантные примеры</strong> — примеры, которые не связаны напрямую с аргументом или темой.</li>
                  <li><strong>Слишком короткие или длинные параграфы</strong> — нарушение баланса в структуре эссе.</li>
                  <li><strong>Отсутствие связи с общей темой</strong> — параграф не поддерживает основной тезис эссе.</li>
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
                <p className="text-gray-700 mb-4">Напишите основной параграф для следующего вопроса, используя модель PEEL:</p>
                <p className="text-gray-700 font-medium mb-4"><em>"Some people believe that the best way to improve public health is to increase the number of sports facilities. Others, however, believe there are more effective alternatives. Discuss both views and give your opinion."</em></p>
                
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <p className="text-gray-500 italic mb-2">Образец ответа для параграфа, поддерживающего первую точку зрения:</p>
                  <p className="text-gray-700"><em>"Proponents of increasing sports facilities argue that greater accessibility to exercise venues directly contributes to improved public health outcomes. When communities have convenient access to gyms, swimming pools, and playing fields, residents are more likely to engage in regular physical activity, which is essential for maintaining good health and preventing chronic diseases such as obesity, diabetes, and cardiovascular conditions. For example, a study conducted in Finland found that municipalities with higher numbers of sports facilities per capita reported lower rates of obesity and related health issues among their residents. Additionally, cities like Copenhagen and Amsterdam, which have invested heavily in sports infrastructure, consistently rank among the healthiest cities globally, with their citizens enjoying longer life expectancies and lower healthcare costs. Therefore, the correlation between abundant sports facilities and better public health indicators suggests that this approach can indeed be an effective strategy for improving overall community wellbeing."</em></p>
                </div>
              </div>
              
              <div className="mt-6">
                <textarea
                  className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  rows={6}
                  value={answer}
                  onChange={handleAnswerChange}
                  placeholder="Напишите свой основной параграф здесь..."
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
                  <div className={checkResult.includes('похож') ? 'mt-1 text-green-600' : 'mt-1 text-red-600'}>{checkResult}</div>
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
                  href="/courses/writing-mastery/lessons/lesson-13"
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
