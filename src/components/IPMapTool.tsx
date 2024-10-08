import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

interface IPInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
}

const IPMapTool: React.FC = () => {
  const [ipAddress, setIpAddress] = useState<string>('');
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchIPInfo = async () => {
    try {
      const response = await fetch(`https://ipinfo.io/${ipAddress}/json?token=YOUR_IPINFO_TOKEN`);
      if (!response.ok) {
        throw new Error('无法获取 IP 信息');
      }
      const data: IPInfo = await response.json();
      setIpInfo(data);
      setError(null);
    } catch (err) {
      setError('获取 IP 信息时出错');
      setIpInfo(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">IP 地址查询 & 地图</h2>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 apple-input mr-2"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          placeholder="输入 IP 地址"
        />
        <button onClick={fetchIPInfo} className="apple-button">
          查询
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {ipInfo && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <MapPin className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="text-xl font-semibold">IP 信息</h3>
          </div>
          <p><strong>IP:</strong> {ipInfo.ip}</p>
          <p><strong>城市:</strong> {ipInfo.city}</p>
          <p><strong>地区:</strong> {ipInfo.region}</p>
          <p><strong>国家:</strong> {ipInfo.country}</p>
          {ipInfo.loc && (
            <div className="mt-4 h-64 rounded-lg overflow-hidden">
              <MapContainer
                center={ipInfo.loc.split(',').map(Number)}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={ipInfo.loc.split(',').map(Number)}>
                  <Popup>{`${ipInfo.city}, ${ipInfo.region}, ${ipInfo.country}`}</Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IPMapTool;