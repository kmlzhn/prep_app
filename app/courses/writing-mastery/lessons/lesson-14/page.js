'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState } from 'react';
import WritingMasterySidebar from '../../../../components/WritingMasterySidebar';

export default function Lesson14() {
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
  const lessonId = 14;
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
      <WritingMasterySidebar activeLessonId={14} />

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
                <h1 className="text-3xl font-bold text-gray-900">Урок 14: Примеры и доказательства</h1>
                <p className="text-gray-600">Поддержка аргументов • 28 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Примеры и доказательства в академическом эссе</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Использование примеров и доказательств является ключевым элементом убедительного академического письма. Они помогают подтвердить ваши аргументы, сделать их более конкретными и убедительными для читателя. В этом уроке мы рассмотрим различные типы примеров и доказательств, а также научимся эффективно интегрировать их в ваше эссе.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Зачем нужны примеры и доказательства?</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li><strong>Убедительность</strong> — подкрепляют ваши утверждения фактами и делают аргументы более весомыми.</li>
                  <li><strong>Конкретность</strong> — превращают абстрактные идеи в понятные и осязаемые концепции.</li>
                  <li><strong>Достоверность</strong> — демонстрируют, что ваши аргументы основаны на реальных фактах, а не только на личном мнении.</li>
                  <li><strong>Глубина анализа</strong> — показывают, что вы глубоко изучили тему и можете привести релевантные примеры.</li>
                  <li><strong>Ясность</strong> — помогают читателю лучше понять вашу точку зрения через конкретные иллюстрации.</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Типы примеров и доказательств</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Фактические данные</h4>
                  <p className="text-gray-700">Статистика, цифры, результаты исследований и другие количественные данные.</p>
                  <div className="mt-2 p-3 bg-white rounded text-gray-700">
                    <p><strong>Пример:</strong></p>
                    <p className="text-blue-800 text-sm italic">
                      "According to a 2022 report by the World Health Organization, approximately 30% of adults worldwide suffer from obesity, a figure that has tripled since 1975. This statistic clearly demonstrates the growing scale of the global obesity epidemic."
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Исторические примеры</h4>
                  <p className="text-gray-700">События из истории, которые иллюстрируют вашу точку зрения.</p>
                  <div className="mt-2 p-3 bg-white rounded text-gray-700">
                    <p><strong>Пример:</strong></p>
                    <p className="text-blue-800 text-sm italic">
                      "The Great Depression of the 1930s demonstrates how economic crises can lead to significant political changes. Following the economic collapse, many countries saw a rise in populist movements and a shift towards greater government intervention in the economy, as exemplified by Roosevelt's New Deal in the United States."
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">3. Конкретные случаи</h4>
                  <p className="text-gray-700">Реальные ситуации или кейсы, которые подтверждают ваш аргумент.</p>
                  <div className="mt-2 p-3 bg-white rounded text-gray-700">
                    <p><strong>Пример:</strong></p>
                    <p className="text-blue-800 text-sm italic">
                      "Singapore's transformation from a resource-poor island to a global financial hub illustrates how effective education policies can drive economic development. By investing heavily in STEM education and vocational training, Singapore created a highly skilled workforce that attracted multinational corporations and fostered innovation."
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">4. Экспертные мнения</h4>
                  <p className="text-gray-700">Цитаты или мнения признанных экспертов в соответствующей области.</p>
                  <div className="mt-2 p-3 bg-white rounded text-gray-700">
                    <p><strong>Пример:</strong></p>
                    <p className="text-blue-800 text-sm italic">
                      "Professor Jane Smith, a leading climate scientist at Oxford University, argues that 'current carbon reduction targets are insufficient to prevent a global temperature rise of more than 2 degrees Celsius.' This expert assessment highlights the urgency of implementing more ambitious climate policies."
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">5. Сравнения и аналогии</h4>
                  <p className="text-gray-700">Сопоставление с похожими ситуациями или использование аналогий для иллюстрации идеи.</p>
                  <div className="mt-2 p-3 bg-white rounded text-gray-700">
                    <p><strong>Пример:</strong></p>
                    <p className="text-blue-800 text-sm italic">
                      "The relationship between social media platforms and their users is similar to that of traditional media companies and their audiences. Just as television networks curate content to maximize viewership and advertising revenue, social media algorithms promote engaging content to keep users on the platform longer."
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Как эффективно использовать примеры и доказательства</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">1. Выбирайте релевантные примеры</h4>
                  <p className="text-green-800">Примеры должны напрямую относиться к вашему аргументу и помогать его подтверждать. Избегайте примеров, которые лишь отдаленно связаны с вашей точкой зрения.</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">2. Используйте актуальные данные</h4>
                  <p className="text-green-800">По возможности используйте свежие и актуальные примеры и статистику. Устаревшие данные могут снизить убедительность вашего аргумента.</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">3. Объясняйте связь</h4>
                  <p className="text-green-800">Четко объясняйте, как пример подтверждает ваш аргумент. Не полагайтесь на то, что связь будет очевидна для читателя.</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">4. Разнообразьте типы доказательств</h4>
                  <p className="text-green-800">Используйте разные типы примеров и доказательств для подкрепления ваших аргументов — статистику, кейсы, экспертные мнения и т.д.</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">5. Соблюдайте баланс</h4>
                  <p className="text-green-800">Не перегружайте текст примерами. Каждый абзац должен содержать один основной аргумент и 1-2 подтверждающих примера.</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Структура аргумента с примером</h3>
              
              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <p className="text-yellow-800 mb-4">Эффективный аргумент обычно следует структуре P.E.E. (Point, Evidence, Explanation) или T.E.E. (Topic, Evidence, Explanation):</p>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded">
                    <p className="font-medium text-gray-900">1. Point/Topic (Тезис)</p>
                    <p className="text-gray-700 text-sm">Четкое утверждение, которое вы хотите доказать.</p>
                    <p className="text-blue-800 text-sm italic mt-1">
                      "Remote work has significant environmental benefits."
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded">
                    <p className="font-medium text-gray-900">2. Evidence (Доказательство)</p>
                    <p className="text-gray-700 text-sm">Пример, статистика или другое доказательство, подтверждающее ваш тезис.</p>
                    <p className="text-blue-800 text-sm italic mt-1">
                      "A 2021 study by Stanford University found that remote workers reduced their carbon footprint by an average of 54% due to eliminated commuting."
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded">
                    <p className="font-medium text-gray-900">3. Explanation (Объяснение)</p>
                    <p className="text-gray-700 text-sm">Анализ того, как доказательство подтверждает ваш тезис.</p>
                    <p className="text-blue-800 text-sm italic mt-1">
                      "This significant reduction in emissions demonstrates how remote work policies can be an effective part of corporate sustainability strategies, contributing to broader environmental goals while also providing flexibility for employees."
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Распространенные ошибки при использовании примеров</h3>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <ul className="list-disc pl-6 text-red-800 space-y-2">
                  <li><strong>Чрезмерное обобщение</strong> — использование единичного примера для обоснования слишком широкого утверждения.</li>
                  <li><strong>Недостаточная конкретика</strong> — использование расплывчатых или неточных примеров без конкретных деталей.</li>
                  <li><strong>Нерелевантные примеры</strong> — использование примеров, которые не имеют прямого отношения к аргументу.</li>
                  <li><strong>Отсутствие анализа</strong> — представление примера без объяснения его значимости для аргумента.</li>
                  <li><strong>Использование непроверенных источников</strong> — опора на сомнительные или непроверенные данные и примеры.</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Практическое задание</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-blue-800 mb-4">Выберите один из следующих тезисов и напишите параграф, используя структуру P.E.E. (Point, Evidence, Explanation) с эффективным примером:</p>
                
                <ol className="list-decimal pl-6 text-blue-800 space-y-2">
                  <li>Инвестиции в общественный транспорт могут значительно улучшить качество жизни в городах.</li>
                  <li>Изучение иностранных языков имеет положительное влияние на когнитивные способности.</li>
                  <li>Социальные медиа оказывают негативное влияние на психическое здоровье молодежи.</li>
                  <li>Внедрение технологий в образовании повышает эффективность обучения.</li>
                </ol>
                
                <p className="text-blue-800 mt-4">Для каждого тезиса подберите конкретный пример (статистику, исследование, кейс или экспертное мнение) и объясните, как этот пример подтверждает ваш тезис.</p>
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
                  href="/courses/writing-mastery/lessons/lesson-15"
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
