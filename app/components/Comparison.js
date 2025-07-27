export default function Comparison() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Традиционные курсы созданы для всех, а не для вас
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Traditional Learning */}
          <div className="bg-red-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-red-600">
              Традиционное обучение
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-red-500 mr-3">❌</span>
                <span>Одинаковая программа для всех уровней</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3">❌</span>
                <span>Дорогие индивидуальные занятия</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3">❌</span>
                <span>Ограниченное время с преподавателем</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3">❌</span>
                <span>Нет мгновенной обратной связи</span>
              </li>
            </ul>
          </div>

          {/* AI-Powered Learning */}
          <div className="bg-green-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-green-600">
              Обучение с ИИ
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✅</span>
                <span>Персонализированная программа</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✅</span>
                <span>Доступная цена</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✅</span>
                <span>24/7 поддержка ИИ-помощника</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✅</span>
                <span>Мгновенная проверка и советы</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 