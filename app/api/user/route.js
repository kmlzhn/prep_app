import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '../../../lib/prisma'

// Валидация email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Валидация телефона
function isValidPhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone)
}

// Валидация имени
function isValidName(name) {
  if (!name || name.trim().length < 2) return false
  if (name.trim().length > 50) return false
  const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/
  return nameRegex.test(name.trim())
}

export async function POST(request) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const { email, firstName, lastName, phoneNumber, targetScore, currentLevel } = data

    // Валидация обязательных полей
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Некорректный email' }, { status: 400 })
    }

    if (!firstName || !isValidName(firstName)) {
      return NextResponse.json({ error: 'Имя должно содержать от 2 до 50 символов и только буквы' }, { status: 400 })
    }

    if (lastName && !isValidName(lastName)) {
      return NextResponse.json({ error: 'Фамилия должна содержать от 2 до 50 символов и только буквы' }, { status: 400 })
    }

    if (phoneNumber && !isValidPhone(phoneNumber)) {
      return NextResponse.json({ error: 'Некорректный номер телефона' }, { status: 400 })
    }

    if (targetScore && (targetScore < 1 || targetScore > 9)) {
      return NextResponse.json({ error: 'Целевой балл должен быть от 1 до 9' }, { status: 400 })
    }

    // Проверка существующего пользователя
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    let user
    if (existingUser) {
      // Обновление существующего пользователя
      user = await prisma.user.update({
        where: { clerkId: userId },
        data: {
          email,
          firstName: firstName.trim(),
          lastName: lastName?.trim(),
          phoneNumber,
          targetScore: targetScore ? parseFloat(targetScore) : 7.0,
          currentLevel: currentLevel || 'Beginner'
        }
      })
    } else {
      // Создание нового пользователя
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email,
          firstName: firstName.trim(),
          lastName: lastName?.trim(),
          phoneNumber,
          targetScore: targetScore ? parseFloat(targetScore) : 7.0,
          currentLevel: currentLevel || 'Beginner'
        }
      })
    }

    return NextResponse.json({ 
      message: 'Данные пользователя сохранены успешно',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        targetScore: user.targetScore,
        currentLevel: user.currentLevel
      }
    })

  } catch (error) {
    console.error('Error saving user:', error)
    return NextResponse.json({ 
      error: 'Ошибка при сохранении данных пользователя' 
    }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        practiceTests: {
          orderBy: { createdAt: 'desc' },
          take: 5
        },
        scores: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 })
    }

    return NextResponse.json({ user })

  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ 
      error: 'Ошибка при загрузке данных пользователя' 
    }, { status: 500 })
  }
} 