'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState } from 'react';
import SpeakingSkillsSidebar from '../../../../components/SpeakingSkillsSidebar';

export default function Lesson6() {
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
  const lessonId = 6;
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
      <SpeakingSkillsSidebar activeLessonId={6} />

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
                <h1 className="text-3xl font-bold text-gray-900">Урок 6: Лексическое разнообразие</h1>
                <p className="text-gray-600">Расширение словарного запаса • 32 минуты</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Лексическое разнообразие в IELTS Speaking</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Лексическое разнообразие (Lexical Resource) — один из четырех критериев оценки в экзамене IELTS Speaking. Этот критерий оценивает ваш словарный запас, умение точно и разнообразно выражать свои мысли. В этом уроке мы рассмотрим стратегии расширения словарного запаса и эффективного использования лексики на экзамене.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Содержание урока:</h3>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li>Что такое лексическое разнообразие и как оно оценивается</li>
                  <li>Стратегии расширения словарного запаса</li>
                  <li>Идиомы и коллокации для высокого балла</li>
                  <li>Практические упражнения</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Критерии оценки лексического ресурса</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-gray-700 mb-3">Экзаменаторы оценивают следующие аспекты вашей лексики:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Разнообразие словарного запаса</strong> — использование синонимов вместо повторения одних и тех же слов</li>
                  <li><strong>Точность использования слов</strong> — правильный выбор слов в соответствии с контекстом</li>
                  <li><strong>Идиоматичность</strong> — использование идиом, фразовых глаголов и коллокаций</li>
                  <li><strong>Специализированная лексика</strong> — использование тематической лексики в соответствии с темой разговора</li>
                  <li><strong>Гибкость</strong> — способность перефразировать мысль разными способами</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Стратегии расширения словарного запаса</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Тематические кластеры</h4>
                  <p className="text-green-800 text-sm mb-2">Группируйте слова по темам, например:</p>
                  <p className="text-green-800 text-sm italic">
                    <strong>Тема "Окружающая среда":</strong><br/>
                    climate change, pollution, renewable energy, sustainable development, biodiversity, ecosystem, carbon footprint, deforestation, conservation, greenhouse effect
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Синонимические ряды</h4>
                  <p className="text-purple-800 text-sm mb-2">Для каждого часто используемого слова подберите 3-5 синонимов:</p>
                  <p className="text-purple-800 text-sm italic">
                    <strong>Good:</strong> excellent, outstanding, superb, exceptional, remarkable<br/>
                    <strong>Important:</strong> crucial, essential, vital, significant, paramount<br/>
                    <strong>Interesting:</strong> fascinating, captivating, intriguing, engaging, compelling
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Идиомы и устойчивые выражения</h3>
              
              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <p className="text-yellow-800 mb-3">Использование идиом и устойчивых выражений значительно повышает оценку за лексический ресурс. Вот несколько полезных выражений для IELTS Speaking:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <ul className="list-disc pl-6 text-yellow-800 space-y-1 text-sm">
                      <li><strong>It's a double-edged sword</strong> — палка о двух концах</li>
                      <li><strong>To kill two birds with one stone</strong> — убить двух зайцев одним выстрелом</li>
                      <li><strong>To be on the same page</strong> — быть на одной волне</li>
                      <li><strong>To see eye to eye</strong> — сходиться во мнениях</li>
                      <li><strong>To take something with a pinch of salt</strong> — относиться скептически</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="list-disc pl-6 text-yellow-800 space-y-1 text-sm">
                      <li><strong>To be in two minds</strong> — сомневаться, колебаться</li>
                      <li><strong>To break the ice</strong> — растопить лёд, начать разговор</li>
                      <li><strong>To get to the point</strong> — перейти к сути</li>
                      <li><strong>To put it another way</strong> — иными словами</li>
                      <li><strong>To weigh the pros and cons</strong> — взвесить все за и против</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Коллокации</h3>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <p className="text-blue-800 mb-3">Коллокации — это устойчивые сочетания слов, которые часто используются вместе. Их использование делает речь более естественной:</p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-blue-900 mb-1">С прилагательными:</h5>
                    <ul className="list-disc pl-5 text-blue-800 space-y-1 text-sm">
                      <li>strong coffee</li>
                      <li>heavy rain</li>
                      <li>major problem</li>
                      <li>crucial decision</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-900 mb-1">С глаголами:</h5>
                    <ul className="list-disc pl-5 text-blue-800 space-y-1 text-sm">
                      <li>make a decision</li>
                      <li>take a risk</li>
                      <li>pay attention</li>
                      <li>raise awareness</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-900 mb-1">С предлогами:</h5>
                    <ul className="list-disc pl-5 text-blue-800 space-y-1 text-sm">
                      <li>depend on</li>
                      <li>interested in</li>
                      <li>aware of</li>
                      <li>responsible for</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Практические упражнения</h3>
              
              <div className="bg-gray-100 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Упражнение 1: Синонимическая замена</h4>
                <p className="text-gray-700 mb-2">Возьмите простое предложение и замените в нем как можно больше слов на синонимы:</p>
                <p className="text-gray-700 mb-1"><strong>Исходное:</strong> <span className="italic">The movie was good and I liked the story.</span></p>
                <p className="text-gray-700 mb-3"><strong>Улучшенное:</strong> <span className="italic">The film was outstanding and I found the plot captivating.</span></p>
                
                <h4 className="font-semibold text-gray-800 mb-3 mt-4">Упражнение 2: Тематический словарь</h4>
                <p className="text-gray-700 mb-2">Выберите тему и запишите как минимум 15 слов и выражений, связанных с ней:</p>
                <p className="text-gray-700 mb-1"><strong>Тема "Образование":</strong></p>
                <p className="text-gray-700 mb-3 italic text-sm">curriculum, academic achievement, higher education, vocational training, distance learning, undergraduate, postgraduate, dissertation, faculty, lecture, seminar, scholarship, tuition fees, extracurricular activities, alumni</p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h4 className="font-semibold text-orange-800 mb-2">💡 Советы для расширения словарного запаса:</h4>
                <ul className="list-disc pl-6 text-orange-700 space-y-2">
                  <li><strong>Ведите словарь</strong> — записывайте новые слова и регулярно повторяйте их.</li>
                  <li><strong>Используйте приложения</strong> — такие как Anki или Quizlet для запоминания новых слов.</li>
                  <li><strong>Читайте разнообразные тексты</strong> — статьи, книги, блоги на английском языке.</li>
                  <li><strong>Смотрите видео и слушайте подкасты</strong> — обращайте внимание на интересные выражения.</li>
                  <li><strong>Практикуйте новую лексику</strong> — старайтесь использовать новые слова в своей речи.</li>
                  <li><strong>Изучайте слова в контексте</strong> — запоминайте не отдельные слова, а целые фразы.</li>
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
                  href="/courses/speaking-skills/lessons/lesson-7"
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