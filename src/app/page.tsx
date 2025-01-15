export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'></main>
  );
}
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Settings, Home, Users, Mail, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavColorTokens = () => {
  // Color states
  const [accentHex, setAccentHex] = useState('1558ea');
  const [backgroundHex, setBackgroundHex] = useState('ffffff');
  const [mixStrength, setMixStrength] = useState(0.15);
  
  // Token states with updated defaults
  const [selectedTextToken, setSelectedTextToken] = useState('accent-700');
  const [selectedNavToken, setSelectedNavToken] = useState('accent-100');

  // Generate token range from 25 to 1000 in steps of 25
  const generateTokenRange = () => {
    const tokens = [];
    for (let i = 25; i <= 1000; i += 25) {
      tokens.push(`accent-${i}`);
    }
    return tokens;
  };

  const allTokens = generateTokenRange();
  const textTokens = allTokens;
  const navTokens = allTokens;

  // Validate and format hex input
  const handleHexChange = (value, setter) => {
    const hex = value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6);
    setter(hex);
  };

  // Calculate color based on 500 as baseline
  const calculateTokenColor = (baseHex, tokenValue) => {
    const hex = baseHex.padStart(6, '0');
    
    if (tokenValue === 500) {
      return `#${hex}`;
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    const mixAmount = Math.abs(tokenValue - 500) / 500;

    if (tokenValue < 500) {
      const nr = Math.round(r + (255 - r) * mixAmount);
      const ng = Math.round(g + (255 - g) * mixAmount);
      const nb = Math.round(b + (255 - b) * mixAmount);
      return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
    } else {
      const nr = Math.round(r * (1 - mixAmount));
      const ng = Math.round(g * (1 - mixAmount));
      const nb = Math.round(b * (1 - mixAmount));
      return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
    }
  };

  // Mix two colors based on weight
  const mixColors = (color1, color2, weight) => {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    const r1 = parseInt(hex1.substring(0, 2), 16);
    const g1 = parseInt(hex1.substring(2, 4), 16);
    const b1 = parseInt(hex1.substring(4, 6), 16);
    
    const r2 = parseInt(hex2.substring(0, 2), 16);
    const g2 = parseInt(hex2.substring(2, 4), 16);
    const b2 = parseInt(hex2.substring(4, 6), 16);
    
    const r = Math.round(r1 * (1 - weight) + r2 * weight);
    const g = Math.round(g1 * (1 - weight) + g2 * weight);
    const b = Math.round(b1 * (1 - weight) + b2 * weight);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const getTokenValue = (token) => parseInt(token.split('-')[1]);

  const selectedTextColor = calculateTokenColor(accentHex, getTokenValue(selectedTextToken));
  const selectedTokenColor = calculateTokenColor(accentHex, getTokenValue(selectedNavToken));
  const selectedNavColor = mixColors(`#${backgroundHex}`, selectedTokenColor, mixStrength);

  const navItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: Users, label: 'Users' },
    { icon: Mail, label: 'Messages' },
    { icon: Settings, label: 'Settings' },
    { icon: AlertCircle, label: 'Support' },
  ];

  return (
    <div className="flex gap-8 p-6">
      <div className="flex-1 space-y-8 max-w-md">
        {/* Base Color Section */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">1. Base Colors</h2>
          
          {/* Color Presets */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Accent Color Presets</label>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries({
                'Blue': '1558EA',
                'Indigo': '4F46E5',
                'Purple': '7C3AED',
                'Pink': 'EC4899',
                'Red': 'EF4444',
                'Orange': 'F97316',
                'Yellow': 'EAB308',
                'Green': '22C55E',
                'Teal': '14B8A6',
                'Cyan': '06B6D4'
              }).map(([name, color]) => (
                <Button
                  key={name}
                  variant="outline"
                  className="p-1 h-auto flex flex-col items-center gap-1 hover:bg-gray-50"
                  onClick={() => setAccentHex(color)}
                >
                  <div
                    className="w-8 h-8 rounded-full border"
                    style={{ backgroundColor: `#${color}` }}
                    title={name}
                  />
                  <span className="text-xs">{name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Accent</label>
              <div className="flex space-x-2 items-center">
                <span className="text-sm">#</span>
                <Input
                  value={accentHex}
                  onChange={(e) => handleHexChange(e.target.value, setAccentHex)}
                  placeholder="Enter hex value"
                  className="font-mono"
                />
                <input
                  type="color"
                  value={`#${accentHex}`}
                  onChange={(e) => setAccentHex(e.target.value.substring(1))}
                  className="w-10 h-10 p-1 rounded cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Background</label>
              <div className="flex space-x-2 items-center">
                <span className="text-sm">#</span>
                <Input
                  value={backgroundHex}
                  onChange={(e) => handleHexChange(e.target.value, setBackgroundHex)}
                  placeholder="Enter hex value"
                  className="font-mono"
                />
                <input
                  type="color"
                  value={`#${backgroundHex}`}
                  onChange={(e) => setBackgroundHex(e.target.value.substring(1))}
                  className="w-10 h-10 p-1 rounded cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mix Strength: {(mixStrength * 100).toFixed(0)}%</label>
              <Slider
                value={[mixStrength * 100]}
                onValueChange={(value) => setMixStrength(value[0] / 100)}
                max={100}
                step={1}
              />
            </div>
          </div>
        </Card>

        {/* Token Selection Section */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">2. Token Selection</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Link Text</label>
              <Select value={selectedTextToken} onValueChange={setSelectedTextToken}>
                <SelectTrigger>
                  <SelectValue placeholder="Select text token" />
                </SelectTrigger>
                <SelectContent>
                  {textTokens.map((token) => (
                    <SelectItem key={token} value={token}
                      className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: calculateTokenColor(accentHex, getTokenValue(token)) }}
                        />
                        <span>{token}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nav Surface</label>
              <Select value={selectedNavToken} onValueChange={setSelectedNavToken}>
                <SelectTrigger>
                  <SelectValue placeholder="Select nav token" />
                </SelectTrigger>
                <SelectContent>
                  {navTokens.map((token) => (
                    <SelectItem key={token} value={token}
                      className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: calculateTokenColor(accentHex, getTokenValue(token)) }}
                        />
                        <span>{token}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Output Section */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">3. Output</h2>
          <div className="space-y-4">
            <div className="space-y-4">
              <div>
                <span className="font-medium block mb-2">Nav Surface</span>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: selectedTokenColor }}
                  />
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">{selectedTokenColor}</code>
                  <span className="text-sm text-gray-600">({selectedNavToken})</span>
                </div>
                <div className="mt-2">
                  <span className="font-medium block mb-2">Mixed with background ({(mixStrength * 100).toFixed(0)}%)</span>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: selectedNavColor }}
                    />
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">{selectedNavColor}</code>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="font-medium block mb-2">Link Text</span>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-6 h-6 rounded border"
                  style={{ backgroundColor: selectedTextColor }}
                />
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">{selectedTextColor}</code>
                <span className="text-sm text-gray-600">({selectedTextToken})</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Preview Section - Moved to right side */}
      <div className="flex-1 min-h-screen">
        <Card className="p-0 h-full sticky top-6">
          <div className="w-64 h-full min-h-[calc(100vh-3rem)]" style={{ backgroundColor: selectedNavColor }}>
            <div className="p-4 h-full">
              <h2 className="text-lg font-semibold mb-6" style={{ color: selectedTextColor }}>Navigation</h2>
              <nav className="space-y-2">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center space-x-3 px-4 py-2 rounded hover:bg-black/5"
                    style={{ color: selectedTextColor }}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NavColorTokens;
