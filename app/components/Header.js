import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              prepAI
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center mx-auto">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Главная
            </Link>
            <Link href="/courses" className="text-gray-700 hover:text-blue-600 transition-colors">
              Курсы
            </Link>
            <Link href="/practice" className="text-gray-700 hover:text-blue-600 transition-colors">
              Практика
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              О нас
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="hidden md:block text-gray-700 hover:text-blue-600 transition-colors">
              Войти
            </Link>
            <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Начать обучение
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 