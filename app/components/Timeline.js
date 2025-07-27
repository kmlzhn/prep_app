export default function Timeline() {
  const stages = [
    {
      day: "День 1",
      title: "Диагностический тест",
      description: "Определите свой текущий уровень",
      icon: "📊"
    },
    {
      day: "День 7",
      title: "Изучите стратегии",
      description: "Освойте техники для каждой секции",
      icon: "🎯"
    },
    {
      day: "День 14",
      title: "Практика с ИИ",
      description: "Тренируйтесь с персональным помощником",
      icon: "🤖"
    },
    {
      day: "День 21",
      title: "Сдайте IELTS!",
      description: "Достигните желаемого балла",
      icon: "🎉"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Ваш путь к успеху
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stages.map((stage, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{stage.icon}</div>
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  {stage.day}
                </h3>
                <h4 className="text-xl font-bold mb-3">{stage.title}</h4>
                <p className="text-gray-600">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 