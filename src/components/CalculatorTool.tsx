import React, { useState } from 'react'

const CalculatorTool: React.FC = () => {
  const [result, setResult] = useState<string>('')

  const handleClick = (value: string) => {
    if (value === '=') {
      try {
        setResult(eval(result).toString())
      } catch (error) {
        setResult('错误')
      }
    } else if (value === 'C') {
      setResult('')
    } else {
      setResult(result + value)
    }
  }

  const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C']

  return (
    <div className="max-w-xs mx-auto">
      <h2 className="text-2xl font-semibold mb-4">计算器</h2>
      <input
        type="text"
        className="w-full p-3 mb-4 text-right apple-input text-lg"
        value={result}
        readOnly
      />
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleClick(btn)}
            className={`p-3 rounded-lg text-lg font-medium transition duration-200 ease-in-out ${
              btn === '=' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CalculatorTool