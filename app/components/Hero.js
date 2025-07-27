import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Подготовка к IELTS с ИИ
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Достигните желаемого балла за недели, а не месяцы — с персонализированным обучением 
          и поддержкой искусственного интеллекта
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
            Много практики
          </span>
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
            Быстрый результат
          </span>
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
            ИИ-поддержка
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Демо платформы
          </button>
          <Link href="/dashboard" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            Начать обучение
          </Link>
        </div>

        <p className="mt-8 text-sm opacity-90">
          100+ студентов уже улучшили свои результаты
        </p>
      </div>
    </section>
  );
} 