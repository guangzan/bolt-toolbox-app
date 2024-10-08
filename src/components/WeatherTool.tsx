import React, { useState } from 'react'
import { Cloud, Sun, CloudRain, CloudLightning } from 'lucide-react'

const WeatherTool: React.FC = () => {
  const [city, setCity] = useState<string>('')
  const [weather, setWeather] = useState<string | null>(null)

  const fetchWeather = () => {
    const mockWeather = ['晴朗', '多云', '雨天', '雷暴']
    const randomWeather = mockWeather[Math.floor(Math.random() * mockWeather.length)]
    setWeather(randomWeather)
  }

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case '晴朗':
        return <Sun className="w-12 h-12 text-yellow-500" />
      case '多云':
        return <Cloud className="w-12 h-12 text-gray-500" />
      case '雨天':
        return <CloudRain className="w-12 h-12 text-blue-500" />
      case '雷暴':
        return <CloudLightning className="w-12 h-12 text-purple-500" />
      default:
        return null
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">天气查询</h2>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 apple-input mr-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="输入城市名"
        />
        <button
          onClick={fetchWeather}
          className="apple-button"
        >
          查询
        </button>
      </div>
      {weather && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md flex items-center">
          {getWeatherIcon(weather)}
          <p className="ml-4 text-lg">{`${city}的天气：${weather}`}</p>
        </div>
      )}
    </div>
  )
}

export default WeatherTool