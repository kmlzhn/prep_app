import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero секция */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">О нас</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Наша миссия - сделать подготовку к IELTS доступной и эффективной 
              с помощью современных технологий искусственного интеллекта
            </p>
          </div>

          {/* Основатель */}
          <div className="bg-gray-50 rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
                  <Image 
                    src="/kamilka.jpeg" 
                    alt="Камила Жандильдаева" 
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4">Камила Жандильдаева</h2>
                <p className="text-xl text-blue-600 mb-4">Основатель и ведущий преподаватель</p>
                
                <div className="space-y-4 text-gray-700">
                  <p>
                    С более чем 2-летним опытом подготовки студентов к IELTS, я знаю, 
                    как сложно может быть достичь желаемого балла традиционными методами.
                  </p>
                  <p>
                    Именно поэтому я создала эту платформу - чтобы объединить лучшие 
                    образовательные практики с возможностями искусственного интеллекта.
                  </p>
                  <p>
                    Наша цель - помочь каждому студенту достичь своих целей в кратчайшие 
                    сроки с максимальной эффективностью.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Достижения */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">8.0</div>
              <div className="text-3xl font-bold text-blue-600 mb-2 text-sm">R9, L9, W6.5, S7</div>
              <p className="text-gray-700">Мой личный балл</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">7.0</div>
              <p className="text-gray-700">Средний балл наших выпускников</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <p className="text-gray-700">Достигают целевого балла</p>
            </div>
          </div>

          {/* Наш подход */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Наш подход</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4 text-blue-600">🎯 Персонализация</h4>
                <p className="text-gray-700">
                  Каждый студент уникален. Наш ИИ анализирует ваши сильные и слабые стороны, 
                  создавая индивидуальный план обучения.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-4 text-green-600">⚡ Эффективность</h4>
                <p className="text-gray-700">
                  Мы фокусируемся на том, что действительно важно для экзамена, 
                  экономя ваше время и усилия.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-4 text-purple-600">🤖 Технологии</h4>
                <p className="text-gray-700">
                  Современный ИИ обеспечивает мгновенную обратную связь и помогает 
                  исправлять ошибки в реальном времени.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-4 text-orange-600">🎓 Опыт</h4>
                <p className="text-gray-700">
                  Годы практического опыта подготовки к IELTS объединены с 
                  инновационными методиками обучения.
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