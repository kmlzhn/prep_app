'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

export default function OnboardingPage() {
  const { user } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    email: user?.emailAddresses[0]?.emailAddress || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phoneNumber: '',
    targetScore: '7.0',
    currentLevel: 'Beginner'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Очистка ошибки при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Введите корректный email'
    }

    // Валидация имени
    if (!formData.firstName || formData.firstName.trim().length < 2) {
      newErrors.firstName = 'Имя должно содержать минимум 2 символа'
    }

    // Валидация телефона (опционально)
    if (formData.phoneNumber) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      if (!phoneRegex.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Введите корректный номер телефона'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        router.push('/dashboard')
      } else {
        setErrors({ submit: result.error || 'Ошибка при сохранении данных' })
      }
    } catch (error) {
      setErrors({ submit: 'Ошибка сети. Попробуйте еще раз.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Добро пожаловать в prepAI!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Расскажите немного о себе, чтобы мы могли персонализировать ваше обучение
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email адрес *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Имя */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                Имя *
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  errors.firstName ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Ваше имя"
              />
              {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
            </div>

            {/* Фамилия */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Фамилия
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Ваша фамилия"
              />
            </div>

            {/* Телефон */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Номер телефона
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="+7 (xxx) xxx-xx-xx"
              />
              {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
            </div>

            {/* Целевой балл */}
            <div>
              <label htmlFor="targetScore" className="block text-sm font-medium text-gray-700">
                Целевой балл IELTS
              </label>
              <select
                id="targetScore"
                name="targetScore"
                value={formData.targetScore}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="5.5">5.5</option>
                <option value="6.0">6.0</option>
                <option value="6.5">6.5</option>
                <option value="7.0">7.0</option>
                <option value="7.5">7.5</option>
                <option value="8.0">8.0</option>
                <option value="8.5">8.5</option>
                <option value="9.0">9.0</option>
              </select>
            </div>

            {/* Текущий уровень */}
            <div>
              <label htmlFor="currentLevel" className="block text-sm font-medium text-gray-700">
                Текущий уровень английского
              </label>
              <select
                id="currentLevel"
                name="currentLevel"
                value={formData.currentLevel}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="Beginner">Beginner (A1)</option>
                <option value="Elementary">Elementary (A2)</option>
                <option value="Pre-Intermediate">Pre-Intermediate (B1)</option>
                <option value="Intermediate">Intermediate (B2)</option>
                <option value="Upper-Intermediate">Upper-Intermediate (C1)</option>
                <option value="Advanced">Advanced (C2)</option>
              </select>
            </div>
          </div>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Сохранение...' : 'Продолжить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 