export default function Features() {
  const features = [
    {
      category: "🎯 ДИАГНОСТИКА И ПЛАНИРОВАНИЕ",
      items: [
        "Диагностический тест",
        "Персональный план обучения",
        "Отслеживание прогресса"
      ]
    },
    {
      category: "📚 ИЗУЧЕНИЕ МАТЕРИАЛА",
      items: [
        "Стратегии для каждой секции",
        "Грамматика и лексика",
        "Примеры высокобалльных ответов"
      ]
    },
    {
      category: "💬 ПРАКТИКА SPEAKING",
      items: [
        "ИИ-собеседник для практики",
        "Анализ произношения",
        "Обратная связь в реальном времени"
      ]
    },
    {
      category: "✍️ ПРАКТИКА WRITING",
      items: [
        "Проверка эссе с ИИ",
        "Анализ структуры и содержания",
        "Улучшение академического стиля"
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          От начинающего до высокого балла
        </h2>
        <p className="text-xl text-center text-gray-600 mb-16">
          Всё необходимое для успешной сдачи IELTS в одной платформе
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-blue-600">
                {feature.category}
              </h3>
              <ul className="space-y-2">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 