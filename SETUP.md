# Настройка переменных окружения

Для корректной работы приложения необходимо настроить следующие переменные окружения:

## 1. Создайте файл `.env.local` в корне проекта

```bash
# OpenAI API Key (для транскрипции речи)
OPENAI_API_KEY=your_openai_api_key_here

# Google Gemini API Key (для анализа ответов)
GEMINI_API_KEY=your_gemini_api_key_here

# Hugging Face API Key (опционально, для резервного варианта)
HUGGING_FACE_API_KEY=your_huggingface_api_key_here

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here

# Database
DATABASE_URL="file:./dev.db"
```

## 2. Получение API ключей

### OpenAI API Key
1. Зайдите на https://platform.openai.com/
2. Создайте аккаунт или войдите в существующий
3. Перейдите в раздел API Keys
4. Создайте новый ключ
5. Скопируйте ключ в переменную `OPENAI_API_KEY`

### Google Gemini API Key
1. Зайдите на https://makersuite.google.com/app/apikey
2. Войдите в Google аккаунт
3. Создайте новый API ключ
4. Скопируйте ключ в переменную `GEMINI_API_KEY`

### Clerk Authentication (опционально)
1. Зайдите на https://clerk.com/
2. Создайте новый проект
3. Скопируйте ключи из настроек проекта

## 3. Тестирование API

После настройки переменных окружения можно протестировать API:

### Тест Gemini API
```bash
curl -X GET http://localhost:3000/api/test-gemini
```

### Тест Speech-to-Text
```bash
curl -X POST http://localhost:3000/api/speech-to-text \
  -F "audio=@path/to/audio/file.webm" \
  -F "language=en"
```

## 4. Запуск приложения

```bash
npm run dev
```

Приложение будет доступно по адресу http://localhost:3000

## 5. Устранение неполадок

### Ошибка "GEMINI_API_KEY is not configured"
- Убедитесь, что файл `.env.local` создан в корне проекта
- Проверьте, что переменная `GEMINI_API_KEY` установлена
- Перезапустите сервер разработки

### Ошибка "An error occurred while analyzing the speech"
- Проверьте логи сервера для получения подробной информации об ошибке
- Убедитесь, что все API ключи настроены правильно
- Проверьте, что аудиофайл не пустой и имеет правильный формат

### Проблемы с транскрипцией
- Убедитесь, что `OPENAI_API_KEY` настроен правильно
- Проверьте, что аудиофайл имеет достаточный размер (>1KB)
- Убедитесь, что формат аудио поддерживается (WebM, MP3, WAV) 