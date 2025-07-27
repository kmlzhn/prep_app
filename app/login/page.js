import { SignIn } from '@clerk/nextjs';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 bg-white">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl shadow-lg p-8">
            {/* Заголовок */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Вход в аккаунт</h1>
              <p className="text-gray-600">
                Войдите, чтобы продолжить подготовку к IELTS
              </p>
            </div>

            {/* Clerk SignIn компонент */}
            <div className="flex justify-center">
              <SignIn 
                redirectUrl="/dashboard"
                signUpUrl="/signup"
                routing="hash"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 