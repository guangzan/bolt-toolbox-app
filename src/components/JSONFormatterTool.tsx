import React, { useState } from 'react';
import { Code } from 'lucide-react';

const JSONFormatterTool: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const formatJSON = () => {
    try {
      const parsedJSON = JSON.parse(input);
      const formattedJSON = JSON.stringify(parsedJSON, null, 2);
      setOutput(formattedJSON);
      setError(null);
    } catch (err) {
      setError('无效的 JSON 格式');
      setOutput('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">JSON 格式化工具</h2>
      <div className="mb-4">
        <textarea
          className="w-full h-40 apple-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="在此输入 JSON 字符串"
        />
      </div>
      <button onClick={formatJSON} className="apple-button mb-4">
        格式化 JSON
      </button>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {output && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <Code className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="text-xl font-semibold">格式化结果</h3>
          </div>
          <pre className="whitespace-pre-wrap break-words">{output}</pre>
        </div>
      )}
    </div>
  );
};

export default JSONFormatterTool;