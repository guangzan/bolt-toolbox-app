import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { QrCode, Copy, Download } from 'lucide-react';

const QRCodeGenerator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [qrValue, setQRValue] = useState<string>('');
  const qrRef = useRef<HTMLDivElement>(null);

  const generateQR = () => {
    setQRValue(input);
  };

  const copyQRCode = () => {
    if (qrRef.current) {
      toPng(qrRef.current)
        .then((dataUrl) => {
          const img = new Image();
          img.src = dataUrl;
          const item = new ClipboardItem({ "image/png": img.src });
          navigator.clipboard.write([item]).then(() => {
            alert('二维码已复制到剪贴板');
          });
        })
        .catch((error) => {
          console.error('复制二维码失败', error);
        });
    }
  };

  const downloadQRCode = () => {
    if (qrRef.current) {
      toPng(qrRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'qrcode.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error('下载二维码失败', error);
        });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">二维码生成器</h2>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 apple-input mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入文本或URL"
        />
        <button onClick={generateQR} className="apple-button">
          生成
        </button>
      </div>
      {qrValue && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <div ref={qrRef} className="flex justify-center mb-4">
            <QRCodeSVG value={qrValue} size={200} />
          </div>
          <div className="flex justify-center space-x-4">
            <button onClick={copyQRCode} className="apple-button flex items-center">
              <Copy className="w-4 h-4 mr-2" />
              复制
            </button>
            <button onClick={downloadQRCode} className="apple-button flex items-center">
              <Download className="w-4 h-4 mr-2" />
              下载
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;