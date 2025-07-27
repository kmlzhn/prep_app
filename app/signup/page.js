import { SignUp } from '@clerk/nextjs';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Signup() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 bg-white ">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl shadow-lg p-8">
            {/* Заголовок */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Создать аккаунт</h1>
              <p className="text-gray-600">
                Начните свою подготовку к IELTS с ИИ уже сегодня
              </p>
            </div>

            {/* Clerk SignUp компонент */}
            <div className="flex justify-center">
              <SignUp 
                redirectUrl="/dashboard"
                signInUrl="/login"
              />
            </div>

            {/* Бонус секция */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="text-center">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">
                  🎉 Бонус при регистрации
                </h3>
                <p className="text-xs text-blue-700">
                  Получите бесплатный диагностический тест и персональный план обучения
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