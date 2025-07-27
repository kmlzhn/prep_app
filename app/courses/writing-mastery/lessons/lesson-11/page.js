'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson11() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'writing-mastery';
  const lessonId = 11;
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
      <WritingMasterySidebar activeLessonId={11} />

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
                <h1 className="text-3xl font-bold text-gray-900">Урок 11: Введение и заключение</h1>
                <p className="text-gray-600">Эффективные начало и конец • 25 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Введение и заключение в IELTS Writing Task 2</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Введение и заключение играют критически важную роль в структуре вашего эссе. Они создают первое и последнее впечатление на экзаменатора и обрамляют ваши аргументы. Хорошо написанные введение и заключение могут значительно повысить ваш балл за Task Achievement и Coherence and Cohesion.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Эффективное введение</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-900 mb-3">Функции введения:</h4>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li><strong>Представить тему</strong> — перефразировать вопрос своими словами</li>
                  <li><strong>Обозначить вашу позицию</strong> — четко указать ваше мнение или подход к проблеме</li>
                  <li><strong>Представить структуру эссе</strong> — кратко указать, что будет рассмотрено (опционально)</li>
                </ul>
                
                <div className="mt-4 p-4 bg-white rounded">
                  <h5 className="font-medium text-gray-900 mb-2">Структура введения:</h5>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Предложение 1:</strong> Общее утверждение о теме + перефразирование вопроса</p>
                    <p><strong>Предложение 2:</strong> Ваша позиция или подход к проблеме</p>
                    <p><strong>Предложение 3 (опционально):</strong> Краткое представление структуры эссе</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Техники написания эффективного введения</h3>
              
              <div className="space-y-6 mb-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">1. Перефразирование вопроса</h4>
                  <div className="space-y-3">
                    <p className="text-gray-700">Перефразирование вопроса — это изложение той же идеи другими словами. Это показывает экзаменатору, что вы поняли вопрос и обладаете хорошим словарным запасом.</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Техники перефразирования:</p>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Использование синонимов</li>
                        <li>Изменение порядка слов</li>
                        <li>Изменение грамматической структуры (активный/пассивный залог)</li>
                        <li>Использование определений вместо ключевых терминов</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Пример:</p>
                      <p className="text-sm"><strong>Оригинальный вопрос:</strong> <em>"Some people believe that children should be allowed to stay at home and play instead of going to school."</em></p>
                      <p className="text-sm mt-1"><strong>Перефразирование:</strong> <em>"There is a growing debate about whether formal education should be mandatory or if young people should have the freedom to engage in recreational activities at home."</em></p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">2. Представление вашей позиции</h4>
                  <div className="space-y-3">
                    <p className="text-gray-700">В зависимости от типа эссе, вам может потребоваться четко выразить свое мнение или обозначить общий подход к проблеме.</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Для эссе-мнения:</p>
                      <ul className="list-disc pl-5 text-sm">
                        <li><em>"In my opinion, mandatory education is essential for children's development."</em></li>
                        <li><em>"I strongly believe that formal schooling plays a crucial role in a child's growth."</em></li>
                        <li><em>"From my perspective, allowing children to stay at home instead of attending school would be detrimental to their future."</em></li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Для эссе-обсуждения:</p>
                      <ul className="list-disc pl-5 text-sm">
                        <li><em>"This essay will examine both perspectives before reaching a conclusion."</em></li>
                        <li><em>"While there are valid arguments on both sides, I tend to believe that..."</em></li>
                        <li><em>"This issue has both advantages and disadvantages that need to be carefully considered."</em></li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">3. Представление структуры эссе (опционально)</h4>
                  <div className="space-y-3">
                    <p className="text-gray-700">Иногда полезно кратко указать, что будет рассмотрено в эссе, особенно для более сложных типов эссе.</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Примеры:</p>
                      <ul className="list-disc pl-5 text-sm">
                        <li><em>"This essay will explore the main causes of this problem and suggest some practical solutions."</em></li>
                        <li><em>"The following paragraphs will examine both the benefits and drawbacks of this approach."</em></li>
                        <li><em>"I will analyze this issue from economic, social, and environmental perspectives."</em></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Примеры эффективных введений</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium text-blue-900 mb-2">Для эссе-мнения:</p>
                  <p className="text-blue-800"><em>"In recent years, there has been considerable debate about whether young learners should be required to attend formal educational institutions or if they should be permitted to remain at home engaging in play-based activities. In my opinion, while play is undoubtedly important for child development, structured schooling provides essential academic, social, and developmental benefits that cannot be adequately replaced by staying at home."</em></p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-medium text-green-900 mb-2">Для эссе-обсуждения:</p>
                  <p className="text-green-800"><em>"The question of whether governments should prioritize investment in railway infrastructure or road networks has become increasingly relevant as cities face growing transportation challenges. While some argue that railways offer more sustainable and efficient mass transit solutions, others contend that road development provides greater flexibility and accessibility. This essay will examine both perspectives before concluding that a balanced approach, with emphasis on public transportation, would be most beneficial for modern societies."</em></p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="font-medium text-yellow-900 mb-2">Для эссе проблема-решение:</p>
                  <p className="text-yellow-800"><em>"Traffic congestion has emerged as one of the most pressing urban challenges of the 21st century, causing significant environmental pollution and economic inefficiency in metropolitan areas worldwide. This growing problem stems from multiple factors, including rapid urbanization and increasing car ownership. This essay will analyze the primary causes of traffic congestion and propose several practical measures that could effectively address this issue at both governmental and individual levels."</em></p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Эффективное заключение</h3>
              
              <div className="bg-purple-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-purple-900 mb-3">Функции заключения:</h4>
                <ul className="list-disc pl-6 text-purple-800 space-y-2">
                  <li><strong>Обобщить основные аргументы</strong> — кратко напомнить о ключевых моментах эссе</li>
                  <li><strong>Подтвердить вашу позицию</strong> — еще раз четко обозначить ваше мнение или вывод</li>
                  <li><strong>Предложить решение или прогноз</strong> — завершить эссе на конструктивной ноте (опционально)</li>
                </ul>
                
                <div className="mt-4 p-4 bg-white rounded">
                  <h5 className="font-medium text-gray-900 mb-2">Структура заключения:</h5>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Предложение 1:</strong> Обобщение основных аргументов или аспектов проблемы</p>
                    <p><strong>Предложение 2:</strong> Подтверждение вашей позиции или вывод</p>
                    <p><strong>Предложение 3 (опционально):</strong> Прогноз на будущее или предложение решения</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Техники написания эффективного заключения</h3>
              
              <div className="space-y-6 mb-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">1. Обобщение основных аргументов</h4>
                  <div className="space-y-3">
                    <p className="text-gray-700">В заключении важно кратко напомнить о ключевых аргументах, которые вы представили в основной части эссе. Это помогает экзаменатору увидеть целостность вашего эссе.</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Полезные фразы для обобщения:</p>
                      <ul className="list-disc pl-5 text-sm">
                        <li><em>"To summarize the key points discussed..."</em></li>
                        <li><em>"As illustrated by the arguments presented above..."</em></li>
                        <li><em>"The main issues examined in this essay were..."</em></li>
                        <li><em>"After considering the various aspects of this topic..."</em></li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">2. Подтверждение вашей позиции</h4>
                  <div className="space-y-3">
                    <p className="text-gray-700">В заключении необходимо еще раз четко обозначить вашу позицию или вывод, к которому вы пришли. Это должно соответствовать позиции, выраженной во введении.</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Полезные фразы для подтверждения позиции:</p>
                      <ul className="list-disc pl-5 text-sm">
                        <li><em>"In conclusion, I firmly believe that..."</em></li>
                        <li><em>"Therefore, it is clear that..."</em></li>
                        <li><em>"For the reasons discussed, I maintain that..."</em></li>
                        <li><em>"Based on the evidence presented, it can be concluded that..."</em></li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">3. Предложение решения или прогноз</h4>
                  <div className="space-y-3">
                    <p className="text-gray-700">Иногда полезно завершить эссе на конструктивной ноте, предложив решение проблемы или прогноз на будущее. Это особенно уместно для эссе проблема-решение.</p>
                    <div className="p-3 bg-white rounded text-gray-700">
                      <p className="font-medium mb-1">Полезные фразы для прогнозов и решений:</p>
                      <ul className="list-disc pl-5 text-sm">
                        <li><em>"Looking to the future, it seems likely that..."</em></li>
                        <li><em>"A balanced approach would involve..."</em></li>
                        <li><em>"The most effective solution would be to..."</em></li>
                        <li><em>"Only through collaborative efforts can we hope to address this issue in the long term."</em></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Примеры эффективных заключений</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium text-blue-900 mb-2">Для эссе-мнения:</p>
                  <p className="text-blue-800"><em>"In conclusion, while home-based learning and play certainly have their place in child development, they cannot replace the comprehensive benefits of formal education. Schools provide structured learning environments, social interaction, and professional guidance that are essential for children's academic and personal growth. Therefore, I strongly believe that mandatory school attendance remains crucial for preparing young people for their future roles in society."</em></p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-medium text-green-900 mb-2">Для эссе-обсуждения:</p>
                  <p className="text-green-800"><em>"To summarize, both railway and road infrastructure development present distinct advantages and limitations. Railways offer environmental benefits and efficient mass transit solutions, while road networks provide flexibility and accessibility, particularly in less densely populated areas. After weighing these considerations, it is evident that an integrated approach that prioritizes public transportation while maintaining adequate road infrastructure would be most beneficial for addressing modern transportation challenges in a sustainable manner."</em></p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="font-medium text-yellow-900 mb-2">Для эссе проблема-решение:</p>
                  <p className="text-yellow-800"><em>"In conclusion, traffic congestion in urban areas stems from multiple factors including rapid urbanization, increasing car ownership, and inadequate public transportation systems. Addressing this complex issue requires a comprehensive approach combining improved public transport infrastructure, congestion pricing mechanisms, and promotion of alternative transportation modes. Only through such coordinated efforts by governments, urban planners, and citizens can cities hope to create more efficient and sustainable transportation systems for future generations."</em></p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Типичные ошибки во введении и заключении</h3>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-900 mb-3">Ошибки во введении:</h4>
                    <ul className="list-disc pl-6 text-red-800 space-y-2">
                      <li><strong>Копирование задания дословно</strong> — всегда перефразируйте вопрос своими словами.</li>
                      <li><strong>Слишком длинное введение</strong> — введение должно составлять примерно 10-15% от общего объема эссе.</li>
                      <li><strong>Отсутствие четкой позиции</strong> — ваша позиция должна быть ясно выражена (для эссе-мнения).</li>
                      <li><strong>Включение деталей и примеров</strong> — оставьте их для основной части.</li>
                      <li><strong>Использование шаблонных фраз</strong> — избегайте заученных шаблонов, которые не связаны с конкретной темой.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-900 mb-3">Ошибки в заключении:</h4>
                    <ul className="list-disc pl-6 text-red-800 space-y-2">
                      <li><strong>Введение новых идей</strong> — заключение должно обобщать уже представленные идеи, а не вводить новые.</li>
                      <li><strong>Дословное повторение введения</strong> — используйте другие слова для обобщения.</li>
                      <li><strong>Слишком короткое заключение</strong> — заключение должно быть примерно такой же длины, как введение.</li>
                      <li><strong>Противоречие введению</strong> — ваша позиция в заключении должна соответствовать позиции во введении.</li>
                      <li><strong>Отсутствие заключения</strong> — никогда не заканчивайте эссе без заключения.</li>
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
                <h4 className="font-semibold text-gray-900 mb-3">Задание 1: Напишите введение для следующего вопроса:</h4>
                <p className="text-gray-700 mb-4"><em>"Some people believe that university students should pay all the costs of their studies, while others believe that higher education should be free. Discuss both views and give your opinion."</em></p>
                
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <p className="text-gray-500 italic">Образец ответа:</p>
                  <p className="mt-2 text-gray-700"><em>"The question of who should bear the financial burden of tertiary education has become a contentious issue in many countries. While some argue that students themselves should cover the entire cost of their university studies, others maintain that higher education should be provided free of charge by the state. This essay will examine both perspectives before arguing that a balanced approach, where costs are shared between students and governments, would be most beneficial for society."</em></p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Задание 2: Напишите заключение для следующего эссе:</h4>
                <p className="text-gray-700 mb-4"><em>Эссе о влиянии социальных сетей на современное общество, в котором обсуждались как положительные аспекты (улучшение коммуникации, доступ к информации), так и отрицательные (проблемы конфиденциальности, зависимость, негативное влияние на психическое здоровье).</em></p>
                
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <p className="text-gray-500 italic">Образец ответа:</p>
                  <p className="mt-2 text-gray-700"><em>"In conclusion, social media platforms have fundamentally transformed how we communicate and access information, offering unprecedented connectivity and knowledge-sharing opportunities. However, these benefits come with significant drawbacks, including privacy concerns, addiction issues, and potential negative impacts on mental well-being. On balance, while social media has become an integral part of modern society, it is essential that individuals, technology companies, and governments work together to mitigate its harmful effects while preserving its positive contributions to our increasingly digital world."</em></p>
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
                  href="/courses/writing-mastery/lessons/lesson-12"
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
