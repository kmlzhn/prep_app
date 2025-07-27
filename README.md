# IELTS Preparation App

Полнофункциональное приложение для подготовки к IELTS с ИИ-ассистентом.

## 🚀 Функции

- **IELTS курсы**: Basics, Speaking Skills, Writing Mastery
- **ИИ анализ**: OpenAI Whisper + Google Gemini
- **Speaking practice**: Запись и анализ речи
- **Writing analysis**: Анализ эссе с AI feedback
- **Essay comparison**: Сравнение 2 эссе
- **Progress tracking**: Отслеживание прогресса
- **Authentication**: Clerk integration

## 🛠 Технологии

- **Next.js 15.2.3** - React framework
- **Clerk** - Authentication
- **OpenAI Whisper** - Speech-to-text
- **Google Gemini** - AI analysis
- **Prisma** - Database ORM
- **Tailwind CSS** - Styling
- **DaisyUI** - UI components

## 📦 Установка

```bash
npm install
```

## 🔧 Настройка

1. Создайте файл `.env.local`:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# OpenAI API (for speech-to-text)
OPENAI_API_KEY=your_openai_api_key

# Google Gemini API (for AI analysis)
GEMINI_API_KEY=your_gemini_api_key

# Database (PostgreSQL)
DATABASE_URL=your_database_url
```

2. Настройте базу данных:
```bash
npx prisma generate
npx prisma db push
```

## 🚀 Запуск

```bash
npm run dev
```

## 🌐 Деплой на Vercel

1. Подключите репозиторий к Vercel
2. Добавьте переменные окружения в Vercel Dashboard:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `OPENAI_API_KEY`
   - `GEMINI_API_KEY`
   - `DATABASE_URL`
3. Деплой автоматически запустится

## 📁 Структура проекта

```
app/
├── api/                    # API endpoints
│   ├── ai-chat/           # AI chat
│   ├── essay-comparison/  # Essay comparison
│   ├── progress/          # Progress tracking
│   ├── speaking-practice/ # Speaking analysis
│   ├── speech-to-text/    # Speech-to-text
│   └── writing-check/     # Writing analysis
├── components/            # React components
├── courses/              # Course pages
│   ├── ielts-basics/
│   ├── speaking-skills/
│   └── writing-mastery/
├── dashboard/            # User dashboard
└── hooks/               # Custom hooks

lib/
├── gemini.js            # Gemini API integration
├── huggingface.js       # Hugging Face API
└── prisma.js           # Database client
```

## 🔌 API Endpoints

- `POST /api/speech-to-text` - Конвертация речи в текст
- `POST /api/speaking-practice` - Анализ speaking ответов
- `POST /api/writing-check` - Анализ эссе
- `POST /api/essay-comparison` - Сравнение 2 эссе
- `GET/POST /api/progress` - Отслеживание прогресса
- `GET/POST /api/user` - Управление пользователями

## 🎯 Курсы

### IELTS Basics (8 уроков)
- Основы IELTS
- Стратегии экзамена
- Практические задания

### Speaking Skills (9 уроков)
- Speaking practice с AI
- Запись и анализ речи
- Улучшение произношения

### Writing Mastery (21 урок)
- Task 1 и Task 2
- Анализ эссе с AI
- Сравнение эссе
- Структура и стиль

## 🤖 ИИ Функции

- **Speech-to-Text**: OpenAI Whisper
- **Speaking Analysis**: Google Gemini
- **Writing Analysis**: Google Gemini
- **Essay Comparison**: Google Gemini
- **Smart Fallback**: Локальный анализ при превышении квоты

## 📊 Прогресс

- Отслеживание завершенных уроков
- Сохранение ответов
- Статистика обучения

## 🔐 Безопасность

- Clerk authentication
- Защищенные API endpoints
- Валидация данных
- Error handling

## 🐛 Отладка

- Подробные логи в консоли
- Error boundaries
- Fallback механизмы
- Тестовые API endpoints

## 📝 Лицензия

MIT License
