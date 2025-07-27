import { auth } from '@clerk/nextjs/server';

// Симулируем базу данных в памяти для демонстрации
const progressData = new Map();

export async function GET() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Получаем прогресс пользователя
    const userProgress = progressData.get(userId) || {
      'ielts-basics': { completedLessons: [] },
      'speaking-skills': { completedLessons: [] },
      'writing-mastery': { completedLessons: [] },
      'listening-practice': { completedLessons: [] },
      'reading-comprehension': { completedLessons: [] }
    };

    return Response.json(userProgress);
  } catch (error) {
    console.error('Ошибка при получении прогресса:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { userId } = auth();
    console.log('POST /api/progress - userId:', userId);
    
    if (!userId) {
      console.log('Пользователь не авторизован');
      return new Response('Unauthorized', { status: 401 });
    }

    const { courseSlug, lessonId, completed } = await request.json();
    console.log('Данные запроса:', { courseSlug, lessonId, completed });

    // Получаем текущий прогресс пользователя
    let userProgress = progressData.get(userId) || {
      'ielts-basics': { completedLessons: [] },
      'speaking-skills': { completedLessons: [] },
      'writing-mastery': { completedLessons: [] },
      'listening-practice': { completedLessons: [] },
      'reading-comprehension': { completedLessons: [] }
    };

    // Инициализируем курс если он не существует
    if (!userProgress[courseSlug]) {
      userProgress[courseSlug] = { completedLessons: [] };
    }

    if (completed) {
      // Добавляем урок в завершенные, если его там нет
      if (!userProgress[courseSlug].completedLessons.includes(lessonId)) {
        userProgress[courseSlug].completedLessons.push(lessonId);
      }
    } else {
      // Удаляем урок из завершенных
      userProgress[courseSlug].completedLessons = userProgress[courseSlug].completedLessons.filter(
        id => id !== lessonId
      );
    }

    // Сохраняем обновленный прогресс
    progressData.set(userId, userProgress);
    console.log('Прогресс сохранен:', userProgress[courseSlug]);

    return Response.json({ 
      success: true, 
      progress: userProgress[courseSlug],
      message: completed ? 'Урок отмечен как завершенный' : 'Урок отмечен как незавершенный'
    });
  } catch (error) {
    console.error('Ошибка при обновлении прогресса:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Сбрасываем прогресс пользователя
    const emptyProgress = {
      'ielts-basics': { completedLessons: [] },
      'speaking-skills': { completedLessons: [] },
      'writing-mastery': { completedLessons: [] },
      'listening-practice': { completedLessons: [] },
      'reading-comprehension': { completedLessons: [] }
    };
    
    progressData.set(userId, emptyProgress);

    return Response.json({ 
      success: true, 
      message: 'Прогресс сброшен' 
    });
  } catch (error) {
    console.error('Ошибка при сбросе прогресса:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 