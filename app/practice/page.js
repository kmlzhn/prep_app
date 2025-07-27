import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Practice() {
  const practiceTypes = [
    {
      title: "Speaking Practice",
      description: "Практикуйте разговорную речь с ИИ-помощником",
      icon: "🎤",
      features: ["ИИ-собеседник", "Анализ произношения", "Мгновенная обратная связь"],
      href: "/practice/speaking"
    },
    {
      title: "Writing Check",
      description: "Проверьте свои эссе с помощью искусственного интеллекта",
      icon: "✍️",
      features: ["Анализ структуры", "Проверка грамматики", "Советы по улучшению"],
      href: "/practice/writing"
    }
  ];

  return (
    <div className="min-h-screen bg-white ">
      <Header />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              prepAI - Практика IELTS с ИИ
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Выберите секцию для тренировки. Наш ИИ-помощник предоставит 
              персонализированную обратную связь и поможет улучшить ваши навыки.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {practiceTypes.map((type, index) => (
              <div key={index} className="bg-gray-50  rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{type.icon}</div>
                  <h2 className="text-2xl font-bold mb-3">{type.title}</h2>
                  <p className="text-gray-600 mb-6">{type.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a 
                  href="/courses"
                  className="block w-full bg-blue-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Начать практику
                </a>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Нужна помощь?</h3>
            <p className="text-gray-600 mb-6">
              Наш ИИ-помощник доступен 24/7 для ответов на ваши вопросы
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Задать вопрос ИИ
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 