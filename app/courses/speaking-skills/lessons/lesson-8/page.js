'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState } from 'react';
import SpeakingSkillsSidebar from '../../../../components/SpeakingSkillsSidebar';

export default function Lesson8() {
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

  const courseSlug = 'speaking-skills';
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <SpeakingSkillsSidebar activeLessonId={8} />

      {/* Основной контент */}
      <div className="flex-1 flex flex-col">
        {/* Мобильный хедер */}
        <div className="lg:hidden bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <Link href="/courses/speaking-skills" className="text-blue-600">← Назад к курсу</Link>
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
                <h1 className="text-3xl font-bold text-gray-900">Урок 8: Связность речи</h1>
                <p className="text-gray-600">Логические связки и переходы • 25 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Связность речи в IELTS Speaking</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Связность речи (Coherence and Cohesion) — один из критериев оценки в экзамене IELTS Speaking. Этот критерий оценивает вашу способность логично организовать свою речь, использовать связующие элементы и плавно переходить от одной мысли к другой. В этом уроке мы рассмотрим стратегии для улучшения связности вашей речи.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Содержание урока:</h3>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li>Что такое связность речи и как она оценивается</li>
                  <li>Связующие слова и выражения</li>
                  <li>Структурирование ответа</li>
                  <li>Практические упражнения</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Что такое связность речи</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-gray-700 mb-3">Связность речи состоит из двух основных компонентов:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Coherence (логическая связность)</strong> — логическое построение высказывания, где одна мысль естественно вытекает из другой.</li>
                  <li><strong>Cohesion (структурная связность)</strong> — использование языковых средств (союзов, местоимений, связующих слов) для соединения частей высказывания.</li>
                </ul>
                <p className="text-gray-700 mt-3">В IELTS Speaking экзаменаторы оценивают, насколько хорошо вы можете организовать свои мысли, развивать идеи и связывать их в единое целое.</p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Связующие слова и выражения</h3>
              
              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <p className="text-yellow-800 mb-3">Использование связующих слов делает вашу речь более плавной и структурированной. Вот некоторые полезные связующие элементы по категориям:</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Для добавления информации</h4>
                    <ul className="list-disc pl-6 text-yellow-800 space-y-1 text-sm">
                      <li>Additionally / In addition</li>
                      <li>Furthermore / Moreover</li>
                      <li>Also / As well as</li>
                      <li>Not only... but also...</li>
                      <li>Besides / Apart from that</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Для противопоставления</h4>
                    <ul className="list-disc pl-6 text-yellow-800 space-y-1 text-sm">
                      <li>However / Nevertheless</li>
                      <li>On the other hand</li>
                      <li>In contrast / Conversely</li>
                      <li>Despite / In spite of</li>
                      <li>Although / Even though</li>
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Для причинно-следственных связей</h4>
                    <ul className="list-disc pl-6 text-yellow-800 space-y-1 text-sm">
                      <li>Therefore / Thus</li>
                      <li>As a result / Consequently</li>
                      <li>Due to / Because of</li>
                      <li>Since / As</li>
                      <li>This leads to / This results in</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Для примеров и пояснений</h4>
                    <ul className="list-disc pl-6 text-yellow-800 space-y-1 text-sm">
                      <li>For example / For instance</li>
                      <li>To illustrate / To demonstrate</li>
                      <li>Such as / Including</li>
                      <li>In other words / That is to say</li>
                      <li>Specifically / Particularly</li>
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Для структурирования ответа</h4>
                    <ul className="list-disc pl-6 text-yellow-800 space-y-1 text-sm">
                      <li>Firstly / Secondly / Finally</li>
                      <li>To begin with / To start with</li>
                      <li>In conclusion / To sum up</li>
                      <li>On the one hand / On the other hand</li>
                      <li>Above all / Most importantly</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Для выражения мнения</h4>
                    <ul className="list-disc pl-6 text-yellow-800 space-y-1 text-sm">
                      <li>In my opinion / From my perspective</li>
                      <li>I believe / I think</li>
                      <li>It seems to me that</li>
                      <li>As far as I'm concerned</li>
                      <li>Personally, I feel that</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Структурирование ответа</h3>
              
              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <p className="text-green-800 mb-3">Хорошо структурированный ответ обычно содержит следующие элементы:</p>
                
                <ol className="list-decimal pl-6 text-green-800 space-y-3">
                  <li>
                    <strong>Введение</strong>
                    <p className="text-sm mt-1">Начните с прямого ответа на вопрос и представьте основную идею.</p>
                    <p className="text-sm italic mt-1">
                      "I believe that social media has both positive and negative effects on society. Let me explain why..."
                    </p>
                  </li>
                  <li>
                    <strong>Основная часть</strong>
                    <p className="text-sm mt-1">Развивайте свои идеи, приводя аргументы, примеры и детали. Используйте связующие слова для плавного перехода между мыслями.</p>
                    <p className="text-sm italic mt-1">
                      "Firstly, social media helps people stay connected... Additionally, it provides access to information... On the other hand, it can be addictive..."
                    </p>
                  </li>
                  <li>
                    <strong>Заключение</strong>
                    <p className="text-sm mt-1">Подведите итог своим мыслям или сделайте финальное утверждение.</p>
                    <p className="text-sm italic mt-1">
                      "In conclusion, while social media has revolutionized communication, we need to be mindful of its potential drawbacks."
                    </p>
                  </li>
                </ol>

                <p className="text-green-800 mt-4">Помните, что в IELTS Speaking важно не только то, что вы говорите, но и как вы это говорите. Структурированный ответ с четкими переходами между идеями производит гораздо лучшее впечатление на экзаменатора.</p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Техники улучшения связности речи</h3>
              
              <div className="bg-purple-50 p-6 rounded-lg mb-6">
                <ul className="list-disc pl-6 text-purple-800 space-y-2">
                  <li>
                    <strong>Техника "Signposting"</strong>
                    <p className="text-sm mt-1">Используйте фразы, которые указывают на структуру вашего ответа: "Let me start by...", "Moving on to...", "To conclude..."</p>
                  </li>
                  <li>
                    <strong>Техника "Linking"</strong>
                    <p className="text-sm mt-1">Связывайте новые идеи с предыдущими: "This relates to what I mentioned earlier about...", "As I've already explained..."</p>
                  </li>
                  <li>
                    <strong>Техника "Referencing"</strong>
                    <p className="text-sm mt-1">Используйте местоимения и указательные слова для ссылки на ранее упомянутые идеи: "this issue", "these factors", "such problems"</p>
                  </li>
                  <li>
                    <strong>Техника "Paraphrasing"</strong>
                    <p className="text-sm mt-1">Перефразируйте ключевые идеи, чтобы подчеркнуть их важность и избежать повторений</p>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Практические упражнения</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-900 mb-3">Упражнение 1: Соединение предложений</h4>
                <p className="text-blue-800 mb-2">Соедините следующие пары предложений, используя подходящие связующие слова:</p>
                <div className="space-y-3 text-blue-800 text-sm">
                  <div>
                    <p><strong>Исходные предложения:</strong> <span className="italic">I enjoy traveling. I don't have enough time for it.</span></p>
                    <p><strong>Соединенные:</strong> <span className="italic">Although I enjoy traveling, I don't have enough time for it.</span></p>
                  </div>
                  <div>
                    <p><strong>Исходные предложения:</strong> <span className="italic">The internet provides access to information. It can contain unreliable sources.</span></p>
                    <p><strong>Соединенные:</strong> <span className="italic">While the internet provides access to information, it can contain unreliable sources.</span></p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Упражнение 2: Структурирование монолога</h4>
                <p className="text-gray-700 mb-2">Выберите одну из следующих тем и подготовьте структурированный 1-2 минутный монолог, используя связующие слова и выражения:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Опишите место, которое вы хотели бы посетить</li>
                  <li>Расскажите о влиянии технологий на образование</li>
                  <li>Обсудите преимущества и недостатки работы из дома</li>
                </ul>
                <p className="text-gray-700 mt-2">Запишите свой монолог и проанализируйте, насколько связно вы смогли выразить свои мысли.</p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h4 className="font-semibold text-orange-800 mb-2">💡 Советы для улучшения связности речи:</h4>
                <ul className="list-disc pl-6 text-orange-700 space-y-2">
                  <li><strong>Планируйте свой ответ</strong> — даже несколько секунд размышления помогут организовать мысли.</li>
                  <li><strong>Не перегружайте речь связующими словами</strong> — используйте их естественно и уместно.</li>
                  <li><strong>Практикуйте монологи на разные темы</strong> — это поможет автоматизировать использование связующих элементов.</li>
                  <li><strong>Слушайте образцы хорошей связной речи</strong> — подкасты, выступления, дебаты.</li>
                  <li><strong>Читайте качественные тексты вслух</strong> — обращайте внимание на структуру и связующие элементы.</li>
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
                  href="/courses/speaking-skills/lessons/lesson-9"
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