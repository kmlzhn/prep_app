'use client';

import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useProgress } from '../../../../hooks/useProgress';
import { useState, useEffect, useRef } from 'react';
import SpeakingSkillsSidebar from '../../../../components/SpeakingSkillsSidebar';

export default function Lesson9() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLessonCompleted, markLessonComplete } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  
  // Speaking practice states
  const [activeSection, setActiveSection] = useState('part1'); // 'part1', 'part2', 'part3'
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);

  useEffect(() => {
    // Cleanup function
    return () => {
      if (audioURL) URL.revokeObjectURL(audioURL);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [audioURL]);

  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning]);

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const courseSlug = 'speaking-skills';
  const lessonId = 9;
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

  const fetchQuestion = async (part) => {
    setIsLoading(true);
    setFeedback(null);
    setAudioBlob(null);
    setAudioURL('');
    
    try {
      // In a real implementation, we would fetch from the API with the part parameter
      // For now, we'll simulate different questions based on the part
      const response = await fetch(`/api/speaking-practice?part=${part}`);
      const data = await response.json();
      
      setCurrentQuestion(data.question);
      setTimer(0);
    } catch (error) {
      console.error('Error fetching question:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        setAudioBlob(audioBlob);
        setAudioURL(audioUrl);
        
        // Stop all tracks from the stream
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsTimerRunning(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Не удалось получить доступ к микрофону. Пожалуйста, проверьте разрешения браузера.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsTimerRunning(false);
    }
  };

  const analyzeRecording = async () => {
    if (!audioBlob || !currentQuestion) return;

    setIsLoading(true);
    
    try {
      // Convert audioBlob to base64 for sending to API
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      
      reader.onloadend = async () => {
        try {
          const base64Audio = reader.result.split(',')[1];
          
          const response = await fetch('/api/speaking-practice', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              audioData: base64Audio,
              question: currentQuestion.question,
              part: currentQuestion.part
            }),
            // Add timeout to prevent infinite loading
            signal: AbortSignal.timeout(30000) // 30 second timeout
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error analyzing audio');
          }
          
          const data = await response.json();
          
          // Display the transcription along with the feedback
          setFeedback({
            ...data,
            transcription: data.transcription || 'Transcription not available'
          });
        } catch (error) {
          console.error('Error analyzing recording:', error);
          alert('An error occurred while analyzing the recording: ' + (error.message || 'Unknown error'));
        } finally {
          setIsLoading(false);
        }
      };
      
      reader.onerror = () => {
        console.error('Error reading audio file');
        alert('Error reading audio file');
        setIsLoading(false);
      };
    } catch (error) {
      console.error('Error analyzing recording:', error);
      alert('An error occurred while analyzing the recording: ' + error.message);
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderQuestionContent = () => {
    if (!currentQuestion) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-600">Нажмите одну из кнопок выше, чтобы получить вопрос</p>
          <button
            onClick={() => fetchQuestion(activeSection === 'part1' ? 1 : activeSection === 'part2' ? 2 : 3)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Получить вопрос
          </button>
        </div>
      );
    }

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-800 mb-2">Тема: {currentQuestion.topic}</h4>
        <p className="text-gray-700 mb-4">{currentQuestion.question}</p>
        
        {currentQuestion.part === 2 && currentQuestion.points && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Включите в ваш ответ:</p>
            <ul className="list-disc pl-6 text-sm text-gray-600">
              {currentQuestion.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">
              Время: <span className="font-medium">{formatTime(timer)}</span>
            </div>
            {currentQuestion.part === 2 && (
              <div className="text-sm text-gray-600">
                Рекомендуемое время: <span className="font-medium">01:00 - 02:00</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3">
            {!isRecording && !audioURL && (
              <button
                onClick={startRecording}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                🎤 Начать запись
              </button>
            )}
            
            {isRecording && (
              <button
                onClick={stopRecording}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                ⏹️ Остановить запись
              </button>
            )}
            
            {audioURL && (
              <>
                <audio controls src={audioURL} className="w-full mb-3" />
                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => {
                      setAudioBlob(null);
                      setAudioURL('');
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    🗑️ Удалить и записать заново
                  </button>
                  
                  <button
                    onClick={analyzeRecording}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    📊 Анализировать ответ
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderFeedback = () => {
    if (!feedback) return null;

    return (
      <div className="bg-gray-50 p-6 rounded-lg mt-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Анализ ответа</h3>
        
        {feedback.transcription && (
          <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-gray-800">Транскрипция:</h4>
              {feedback.transcriptionSource && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {feedback.transcriptionSource}
                </span>
              )}
            </div>
            <p className="text-gray-700 italic">{feedback.transcription}</p>
          </div>
        )}
        
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-2">Общий балл:</h4>
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">{feedback.score}</div>
            <div className="ml-2 text-gray-500">(из 9.0)</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Беглость и связность</h4>
            <div className="flex items-center">
              <div className="text-xl font-bold text-blue-600">{feedback.criteria.fluency}</div>
              <div className="ml-2 text-gray-500">(из 9.0)</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Произношение</h4>
            <div className="flex items-center">
              <div className="text-xl font-bold text-blue-600">{feedback.criteria.pronunciation}</div>
              <div className="ml-2 text-gray-500">(из 9.0)</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Лексический запас</h4>
            <div className="flex items-center">
              <div className="text-xl font-bold text-blue-600">{feedback.criteria.lexicalResource}</div>
              <div className="ml-2 text-gray-500">(из 9.0)</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Грамматика и точность</h4>
            <div className="flex items-center">
              <div className="text-xl font-bold text-blue-600">{feedback.criteria.grammar}</div>
              <div className="ml-2 text-gray-500">(из 9.0)</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Сильные стороны:</h4>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {feedback.feedback.positive.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Области для улучшения:</h4>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {feedback.feedback.improvements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Детальный анализ:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-3 rounded border border-blue-100">
              <p className="text-gray-600">Слов в минуту:</p>
              <p className="font-semibold text-blue-700">{feedback.detailedAnalysis.wordsPerMinute}</p>
            </div>
            <div className="bg-white p-3 rounded border border-blue-100">
              <p className="text-gray-600">Количество пауз:</p>
              <p className="font-semibold text-blue-700">{feedback.detailedAnalysis.pauseCount}</p>
            </div>
            <div className="bg-white p-3 rounded border border-blue-100">
              <p className="text-gray-600">Повторения:</p>
              <p className="font-semibold text-blue-700">{feedback.detailedAnalysis.repetitions}</p>
            </div>
          </div>
          
          {feedback.detailedAnalysis.incorrectPronunciations && feedback.detailedAnalysis.incorrectPronunciations.length > 0 && (
            <div className="mt-4">
              <h5 className="font-medium text-blue-800 mb-2">Произношение для улучшения:</h5>
              <div className="bg-white p-3 rounded border border-blue-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-1">Слово</th>
                      <th className="text-left py-1">Ваше произношение</th>
                      <th className="text-left py-1">Правильное произношение</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedback.detailedAnalysis.incorrectPronunciations.map((item, index) => (
                      <tr key={index} className={index !== 0 ? "border-t" : ""}>
                        <td className="py-1 font-medium">{item.word}</td>
                        <td className="py-1">{item.yourPronunciation}</td>
                        <td className="py-1">{item.correctPronunciation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <h4 className="font-semibold text-gray-800 mb-2">Следующие шаги:</h4>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            {feedback.nextSteps.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковая панель */}
      <SpeakingSkillsSidebar activeLessonId={9} />

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
              <span className="text-4xl mr-4">🎯</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Урок 9: Практика IELTS Speaking</h1>
                <p className="text-gray-600">Комплексная тренировка навыков • 45 минут</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Практика IELTS Speaking</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                В этом уроке мы сосредоточимся на практических упражнениях, которые помогут вам подготовиться к экзамену IELTS Speaking. Мы рассмотрим все три части экзамена и предоставим примеры вопросов и ответов, а также стратегии для каждой части.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Содержание урока:</h3>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li>Структура экзамена IELTS Speaking</li>
                  <li>Интерактивная практика с ИИ</li>
                  <li>Советы по управлению стрессом на экзамене</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Структура экзамена IELTS Speaking</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-gray-700 mb-3">Экзамен IELTS Speaking длится 11-14 минут и состоит из трех частей:</p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Часть 1 (4-5 минут)</h4>
                    <p className="text-blue-800 text-sm">Знакомство и общие вопросы о себе, семье, работе, учебе, интересах и т.д.</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Часть 2 (3-4 минуты)</h4>
                    <p className="text-green-800 text-sm">Монолог на заданную тему. У вас будет 1 минута на подготовку и 1-2 минуты на речь.</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Часть 3 (4-5 минут)</h4>
                    <p className="text-purple-800 text-sm">Обсуждение более абстрактных тем, связанных с темой Части 2.</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Интерактивная практика с ИИ</h3>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex flex-wrap gap-4 mb-6">
                  <button
                    onClick={() => {
                      setActiveSection('part1');
                      fetchQuestion(1);
                    }}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeSection === 'part1'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
                    }`}
                  >
                    Часть 1: Знакомство
                  </button>
                  
                  <button
                    onClick={() => {
                      setActiveSection('part2');
                      fetchQuestion(2);
                    }}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeSection === 'part2'
                        ? 'bg-green-600 text-white'
                        : 'bg-green-50 text-green-800 hover:bg-green-100'
                    }`}
                  >
                    Часть 2: Монолог
                  </button>
                  
                  <button
                    onClick={() => {
                      setActiveSection('part3');
                      fetchQuestion(3);
                    }}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeSection === 'part3'
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
                    }`}
                  >
                    Часть 3: Обсуждение
                  </button>
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <>
                    {renderQuestionContent()}
                    {renderFeedback()}
                  </>
                )}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Советы по управлению стрессом на экзамене</h3>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h4 className="font-semibold text-orange-800 mb-2">💡 Как справиться с волнением:</h4>
                <ul className="list-disc pl-6 text-orange-700 space-y-2">
                  <li><strong>Готовьтесь заранее</strong> — регулярная практика снижает тревожность</li>
                  <li><strong>Практикуйтесь с носителями языка</strong> — помогает привыкнуть к разговору с незнакомыми людьми</li>
                  <li><strong>Используйте техники глубокого дыхания</strong> — сделайте несколько глубоких вдохов перед экзаменом</li>
                  <li><strong>Визуализируйте успех</strong> — представьте, как вы уверенно отвечаете на все вопросы</li>
                  <li><strong>Помните, что экзаменатор на вашей стороне</strong> — его задача не запутать вас, а оценить ваши навыки</li>
                  <li><strong>Если вы не понимаете вопрос</strong> — вежливо попросите экзаменатора повторить или переформулировать</li>
                  <li><strong>Если вы допустили ошибку</strong> — не зацикливайтесь на ней, продолжайте говорить</li>
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
                    Завершение...
                  </span>
                ) : (
                  '✅ Отметить как завершенный'
                )}
              </button>
            ) : (
              <div className="space-y-4">
                <p className="text-green-600 font-semibold">Урок завершен! 🎉</p>
                <Link 
                  href="/courses/speaking-skills"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 hover:shadow-md transition-all duration-300"
                >
                  Вернуться к курсу
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