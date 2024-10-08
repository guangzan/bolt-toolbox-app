import React, { useState } from 'react'
import { Calculator, CheckSquare, Cloud, MapPin, Code, QrCode } from 'lucide-react'
import CalculatorTool from './components/CalculatorTool'
import TodoList from './components/TodoList'
import WeatherTool from './components/WeatherTool'
import IPMapTool from './components/IPMapTool'
import JSONFormatterTool from './components/JSONFormatterTool'
import QRCodeGenerator from './components/QRCodeGenerator'

function App() {
  const [activeTool, setActiveTool] = useState<string>('calculator')

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">工具箱应用</h1>
        </div>
      </header>
      <div className="flex-1 flex">
        <nav className="w-64 bg-gray-100 p-4">
          <ul className="space-y-2">
            {[
              { id: 'calculator', name: '计算器', icon: Calculator },
              { id: 'todo', name: '待办事项', icon: CheckSquare },
              { id: 'weather', name: '天气', icon: Cloud },
              { id: 'ipmap', name: 'IP & 地图', icon: MapPin },
              { id: 'jsonformatter', name: 'JSON 格式化', icon: Code },
              { id: 'qrcode', name: '二维码生成', icon: QrCode },
            ].map((tool) => (
              <li 
                key={tool.id}
                className={`cursor-pointer p-2 rounded-lg transition duration-200 ease-in-out ${
                  activeTool === tool.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                }`}
                onClick={() => setActiveTool(tool.id)}
              >
                <tool.icon className="inline-block mr-2" />
                {tool.name}
              </li>
            ))}
          </ul>
        </nav>
        <main className="flex-1 p-8">
          <div className="apple-card">
            {activeTool === 'calculator' && <CalculatorTool />}
            {activeTool === 'todo' && <TodoList />}
            {activeTool === 'weather' && <WeatherTool />}
            {activeTool === 'ipmap' && <IPMapTool />}
            {activeTool === 'jsonformatter' && <JSONFormatterTool />}
            {activeTool === 'qrcode' && <QRCodeGenerator />}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App