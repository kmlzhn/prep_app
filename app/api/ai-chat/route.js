import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message, context } = await request.json();
    
    // Здесь будет интеграция с ИИ (например, OpenAI)
    // Пока что возвращаем mock ответ
    const mockResponse = {
      reply: `Понимаю ваш вопрос: "${message}". В контексте IELTS подготовки, рекомендую сосредоточиться на следующем...`,
      suggestions: [
        "Попробуйте практические упражнения",
        "Изучите примеры высокобалльных ответов",
        "Обратите внимание на структуру эссе"
      ],
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { error: 'Произошла ошибка при обработке запроса' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'ИИ-помощник для IELTS готов помочь вам!',
    status: 'active'
  });
} 