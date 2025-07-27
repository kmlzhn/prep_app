import Header from '../components/Header';
import Footer from '../components/Footer';
import Pricing from '../components/Pricing';

export default function Courses() {

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              prepAI - Курсы IELTS с ИИ
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Структурированные программы обучения Speaking и Writing с персонализированной поддержкой 
              искусственного интеллекта для достижения ваших целей
            </p>
          </div>

          {/* Тарифные планы - такие же как на главной странице */}
          <div className="mb-16">
            <Pricing showTitle={false} />
          </div>

          {/* Преимущества обучения с ИИ */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              Почему выбирают обучение с ИИ?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold mb-3">Персонализация</h3>
                <p className="text-gray-600">
                  ИИ адаптирует программу под ваш уровень и темп обучения
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-3">Мгновенная обратная связь</h3>
                <p className="text-gray-600">
                  Получайте анализ ошибок и советы сразу после выполнения заданий
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-semibold mb-3">Отслеживание прогресса</h3>
                <p className="text-gray-600">
                  Детальная аналитика вашего развития по Speaking и Writing
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 