export default function Pricing({ showTitle = true }) {
  const plans = [
    {
      title: "Базовый",
      price: "9,990",
      originalPrice: "19,990",
      period: "тенге",
      features: [
        "Диагностический тест",
        "Базовые стратегии для Speaking и Writing",
        "ИИ-помощник для практики",
        "Отслеживание прогресса",
        "Доступ на 3 месяца"
      ],
      popular: false
    },
    {
      title: "Стандартный",
      price: "19,990",
      originalPrice: "29,990",
      period: "тенге",
      features: [
        "Всё из тарифа Базовый",
        "Персональный план обучения",
        "Детальный анализ Writing",
        "Speaking практика с ИИ",
        "Поддержка инструктора",
        "Доступ на 6 месяцев"
      ],
      popular: true
    },
    {
      title: "Премиум",
      price: "39,990",
      originalPrice: "59,990",
      period: "тенге",
      features: [
        "Всё из тарифа Стандартный",
        "1-на-1 сессии с инструктором",
        "Мок-тесты с детальным анализом",
        "Приоритетная поддержка",
        "Гарантия повышения балла",
        "Пожизненный доступ"
      ],
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Начните подготовку уже сегодня
            </h2>
            <p className="text-xl text-center text-gray-600 mb-16">
              Выберите план, который подходит именно вам
            </p>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`rounded-lg p-8 ${plan.popular ? 'bg-blue-50 border-2 border-blue-200 relative' : 'bg-white border border-gray-200'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Популярный
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
              <div className="mb-6">
                <span className="text-lg text-gray-500 line-through">{plan.originalPrice}</span>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                plan.popular 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}>
                Выбрать план
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 