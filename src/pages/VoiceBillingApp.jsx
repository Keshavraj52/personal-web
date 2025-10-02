import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, Mic, MicOff, Download, Trash2, CreditCard, Volume2, Plus } from 'lucide-react';

// Product catalog with base price & unit
const PRODUCTS = {
  'sugar': { price: 40, unit: 'kg' },
  'rice': { price: 60, unit: 'kg' },
  'wheat flour': { price: 33, unit: 'kg' },
  'wheat': { price: 33, unit: 'kg' },
  'flour': { price: 33, unit: 'kg' },
  'oil': { price: 120, unit: 'liter' },
  'cooking oil': { price: 120, unit: 'liter' },
  'dal': { price: 80, unit: 'kg' },
  'lentils': { price: 80, unit: 'kg' },
  'milk': { price: 25, unit: 'liter' },
  'bread': { price: 30, unit: 'unit' },
  'onion': { price: 20, unit: 'kg' },
  'potato': { price: 15, unit: 'kg' },
  'tomato': { price: 25, unit: 'kg' },
  'salt': { price: 18, unit: 'kg' },
  'tea': { price: 200, unit: 'kg' },
  'coffee': { price: 300, unit: 'kg' },
  'ghee': { price: 450, unit: 'kg' },
  'butter': { price: 350, unit: 'kg' },
  'cheese': { price: 400, unit: 'kg' },
};

// Hindi display names
const HI_NAMES = {
  'sugar': 'चीनी',
  'rice': 'चावल',
  'wheat flour': 'आटा',
  'wheat': 'गेहूं',
  'flour': 'आटा',
  'oil': 'तेल',
  'cooking oil': 'खाद्य तेल',
  'dal': 'दाल',
  'lentils': 'दाल',
  'milk': 'दूध',
  'bread': 'ब्रेड',
  'onion': 'प्याज़',
  'potato': 'आलू',
  'tomato': 'टमाटर',
  'salt': 'नमक',
  'tea': 'चाय',
  'coffee': 'कॉफ़ी',
  'ghee': 'घी',
  'butter': 'मक्खन',
  'cheese': 'पनीर',
};

// Aliases for voice recognition
const ALIASES = {
  'sugar': 'sugar', 'चीनी': 'sugar', 'शक्कर': 'sugar',
  'rice': 'rice', 'चावल': 'rice',
  'wheat': 'wheat', 'गेहूं': 'wheat',
  'flour': 'flour', 'aata': 'wheat flour', 'atta': 'wheat flour', 'आटा': 'wheat flour', 'गेहूं का आटा': 'wheat flour', 'wheat flour': 'wheat flour',
  'oil': 'oil', 'cooking oil': 'cooking oil', 'तेल': 'oil', 'खाद्य तेल': 'cooking oil',
  'dal': 'dal', 'lentils': 'lentils', 'दाल': 'dal', 'मसूर': 'dal', 'तूर': 'dal', 'मूंग': 'dal', 'चना दाल': 'dal',
  'milk': 'milk', 'दूध': 'milk',
  'bread': 'bread', 'ब्रेड': 'bread',
  'onion': 'onion', 'प्याज': 'onion', 'प्याज़': 'onion',
  'potato': 'potato', 'आलू': 'potato',
  'tomato': 'tomato', 'टमाटर': 'tomato',
  'salt': 'salt', 'नमक': 'salt',
  'tea': 'tea', 'चाय': 'tea',
  'coffee': 'coffee', 'कॉफी': 'coffee', 'कॉफ़ी': 'coffee',
  'ghee': 'ghee', 'घी': 'ghee',
  'butter': 'butter', 'मक्खन': 'butter',
  'cheese': 'cheese', 'पनीर': 'cheese',
};

// Unit labels
const UNIT_LABELS = {
  'kg': { hi: 'किग्रा', en: 'kg' },
  'liter': { hi: 'लीटर', en: 'L' },
  'unit': { hi: 'पीस', en: 'pc' },
};

// Unit keywords for voice recognition
const UNIT_KEYWORDS = {
  'kg': 'kg', 'kilogram': 'kg', 'kilograms': 'kg',
  'किलो': 'kg', 'किलोग्राम': 'kg',
  'g': 'g', 'gram': 'g', 'grams': 'g', 'ग्राम': 'g',
  'l': 'liter', 'liter': 'liter', 'liters': 'liter',
  'लीटर': 'liter',
  'ml': 'ml', 'मिलीलीटर': 'ml',
  'piece': 'unit', 'pieces': 'unit', 'unit': 'unit',
  'पीस': 'unit', 'टुकड़े': 'unit', 'पैकेट': 'unit',
};

const VoiceBillingApp = () => {
  const [billItems, setBillItems] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('sugar');
  const [quantity, setQuantity] = useState(1.0);
  const [selectedUnit, setSelectedUnit] = useState('kg');
  const [voiceText, setVoiceText] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.lang = 'hi-IN';
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setVoiceText(transcript);
        parseVoiceCommand(transcript);
        setIsListening(false);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
      setIsVoiceSupported(true);
    }
  }, []);

  // Text-to-speech function
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Voice command parsing functions
  const normalizeUnit = (token) => {
    const normalized = (token || '').trim().toLowerCase();
    for (const [word, canon] of Object.entries(UNIT_KEYWORDS)) {
      if (normalized.includes(word)) {
        return canon;
      }
    }
    return null;
  };

  const toCanonicalProduct = (name) => {
    const normalized = (name || '').trim().toLowerCase();
    if (ALIASES[normalized]) {
      return ALIASES[normalized];
    }
    for (const [alias, canon] of Object.entries(ALIASES)) {
      if (alias.includes(normalized) || normalized.includes(alias)) {
        return canon;
      }
    }
    return null;
  };

  const convertQuantity = (qty, srcUnit, defaultUnit) => {
    if (!srcUnit) {
      return [parseFloat(qty), defaultUnit];
    }
    
    if (srcUnit === 'g') {
      return [parseFloat(qty) / 1000.0, 'kg'];
    }
    if (srcUnit === 'ml') {
      return [parseFloat(qty) / 1000.0, 'liter'];
    }
    
    if (['kg', 'liter', 'unit'].includes(srcUnit)) {
      return [parseFloat(qty), srcUnit];
    }
    
    return [parseFloat(qty), defaultUnit];
  };

  const parseVoiceCommand = (command) => {
    const cmd = (command || '').toLowerCase();
    const items = [];
    
    // Split by "और" or "and" or comma
    const segments = cmd.split(/\b(?:और|and)\b|,/);
    
    // Patterns: (qty [unit] product) or (product qty [unit])
    const patterns = [
      /(\d+(?:\.\d+)?)\s*([a-zA-Z\u0900-\u097F\.]*?)\s*(?:का|की|के)?\s*([a-zA-Z\u0900-\u097F\s]+)/,
      /([a-zA-Z\u0900-\u097F\s]+?)\s*(\d+(?:\.\d+)?)\s*([a-zA-Z\u0900-\u097F\.]*)/
    ];
    
    for (const seg of segments) {
      const segment = seg.trim();
      if (!segment) continue;
      
      for (const pattern of patterns) {
        const matches = segment.match(pattern);
        if (matches) {
          try {
            let qty, unitHint, productName;
            
            // Determine if first match is quantity or product
            if (/^\d/.test(matches[1])) {
              qty = parseFloat(matches[1]);
              unitHint = normalizeUnit(matches[2]);
              productName = matches[3].trim();
            } else {
              productName = matches[1].trim();
              qty = parseFloat(matches[2]);
              unitHint = normalizeUnit(matches[3]);
            }
            
            const canon = toCanonicalProduct(productName);
            if (!canon || !PRODUCTS[canon]) {
              continue;
            }
            
            const defaultUnit = PRODUCTS[canon].unit;
            const [qtyConv, finalUnit] = convertQuantity(qty, unitHint, defaultUnit);
            const price = PRODUCTS[canon].price;
            const total = qtyConv * price;
            
            items.push({
              product: canon,
              display_hi: HI_NAMES[canon] || canon,
              quantity: qtyConv,
              unit: PRODUCTS[canon].unit,
              price_per_unit: price,
              total_price: Math.round(total * 100) / 100,
            });
            break;
          } catch (e) {
            console.error('Error parsing voice command:', e);
          }
        }
      }
    }
    
    if (items.length > 0) {
      setBillItems(prev => [...prev, ...items]);
      speakText(`${items.length} वस्तुएं जोड़ दी गई हैं।`);
    } else {
      speakText('क्षमा करें, आपके आदेश में मान्य वस्तु नहीं मिली।');
    }
  };

  const startListening = () => {
    if (recognition && isVoiceSupported) {
      setIsListening(true);
      setVoiceText('');
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const addManualItem = () => {
    const price = PRODUCTS[selectedProduct].price;
    const defaultUnit = PRODUCTS[selectedProduct].unit;
    
    // Convert quantity based on selected unit
    let qtyBase, finalUnit;
    if (selectedUnit === 'g') {
      qtyBase = quantity / 1000.0;
      finalUnit = 'kg';
    } else if (selectedUnit === 'ml') {
      qtyBase = quantity / 1000.0;
      finalUnit = 'liter';
    } else {
      qtyBase = quantity;
      finalUnit = selectedUnit;
    }
    
    const total = qtyBase * price;
    
    const item = {
      product: selectedProduct,
      display_hi: HI_NAMES[selectedProduct],
      quantity: qtyBase,
      unit: defaultUnit,
      price_per_unit: price,
      total_price: Math.round(total * 100) / 100,
    };
    
    setBillItems(prev => [...prev, item]);
  };

  const clearBill = () => {
    setBillItems([]);
    setPaymentDone(false);
    setShowQR(false);
  };

  const totalAmount = billItems.reduce((sum, item) => sum + item.total_price, 0);

  const speakBill = () => {
    if (billItems.length === 0) return;
    
    const parts = billItems.map(item => {
      const unitHi = UNIT_LABELS[item.unit].hi;
      return `${item.quantity} ${unitHi} ${item.display_hi} के लिए ${Math.round(item.total_price)} रुपये`;
    });
    
    const billText = `आपके बिल में है: ${parts.join(', ')}। कुल राशि ${Math.round(totalAmount)} रुपये।`;
    speakText(billText);
  };

  const generateQRCode = () => {
    const upiId = "keshavrajpore52@okaxis";
    const payeeName = "keshavraj pore";
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${totalAmount.toFixed(2)}&cu=INR`;
    
    // For demo purposes, we'll show a placeholder QR code
    // In a real implementation, you'd use a QR code library
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;
  };

  const downloadPDF = () => {
    // For demo purposes, we'll create a simple text-based bill
    const billContent = `
किराना बिल
तारीख: ${new Date().toLocaleString('hi-IN')}
----------------------------------------
${billItems.map(item => {
  const unitHi = UNIT_LABELS[item.unit].hi;
  return `${item.display_hi} - ${item.quantity} ${unitHi} - ₹${item.price_per_unit}/${unitHi} - ₹${item.total_price.toFixed(2)}`;
}).join('\n')}
----------------------------------------
कुल राशि: ₹${totalAmount.toFixed(2)}
    `;
    
    const blob = new Blob([billContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bill_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4" style={{ margin: '64px' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <ShoppingCart className="text-orange-600" />
            हिंदी वॉइस-आधारित बिल कैलकुलेटर
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar: Product List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                📋 उपलब्ध वस्तुएं और कीमत
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {Object.entries(PRODUCTS).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                    <span className="font-medium text-gray-700">{HI_NAMES[key]}</span>
                    <span className="text-gray-600">₹{value.price}/{UNIT_LABELS[value.unit].hi}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Voice Input Section */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  🎤 आवाज़ से ऑर्डर
                </h2>
                
                {isVoiceSupported ? (
                  <div className="space-y-4">
                    <button
                      onClick={isListening ? stopListening : startListening}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                        isListening
                          ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                      {isListening ? 'सुनना बंद करें' : '🎙️ आवाज़ सुनना शुरू करें'}
                    </button>
                    
                    {voiceText && (
                      <div className="p-3 bg-green-100 border border-green-300 rounded-lg">
                        <p className="text-green-800">🎯 समझा गया: {voiceText}</p>
                      </div>
                    )}
                    
                    {isListening && (
                      <div className="p-3 bg-blue-100 border border-blue-300 rounded-lg">
                        <p className="text-blue-800">🎤 सुन रहे हैं... कृपया अपना ऑर्डर बोलें</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                    <p className="text-yellow-800">⚠️ आपका ब्राउज़र वॉइस रिकॉग्निशन को सपोर्ट नहीं करता</p>
                  </div>
                )}

                {/* Manual Input */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">✏️ मैन्युअल इनपुट</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">वस्तु चुनें</label>
                      <select
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {Object.keys(PRODUCTS).map(key => (
                          <option key={key} value={key}>{HI_NAMES[key]}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">मात्रा</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseFloat(e.target.value) || 0.1)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">इकाई</label>
                      <select
                        value={selectedUnit}
                        onChange={(e) => setSelectedUnit(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="kg">किग्रा</option>
                        <option value="g">ग्राम</option>
                        <option value="liter">लीटर</option>
                        <option value="ml">मिलीलीटर</option>
                        <option value="unit">पीस</option>
                      </select>
                    </div>
                    
                    <button
                      onClick={addManualItem}
                      className="w-full py-3 px-6 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus size={20} />
                      बिल में जोड़ें
                    </button>
                  </div>
                </div>
              </div>

              {/* Bill Section */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  🧾 वर्तमान बिल
                </h2>
                
                {billItems.length > 0 ? (
                  <div className="space-y-4">
                    {/* Bill Items */}
                    <div className="max-h-64 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left p-2">वस्तु</th>
                            <th className="text-left p-2">मात्रा</th>
                            <th className="text-left p-2">दाम</th>
                            <th className="text-left p-2">कुल</th>
                          </tr>
                        </thead>
                        <tbody>
                          {billItems.map((item, index) => (
                            <tr key={index} className="border-t">
                              <td className="p-2 font-medium">{item.display_hi}</td>
                              <td className="p-2">{item.quantity} {UNIT_LABELS[item.unit].hi}</td>
                              <td className="p-2">₹{item.price_per_unit}</td>
                              <td className="p-2 font-semibold">₹{item.total_price.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Total */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>💰 कुल राशि:</span>
                        <span className="text-green-600">₹{totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        onClick={clearBill}
                        className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm"
                      >
                        <Trash2 size={16} />
                        बिल साफ़ करें
                      </button>
                      
                      <button
                        onClick={speakBill}
                        className="py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm"
                      >
                        <Volume2 size={16} />
                        बिल सुनाएं
                      </button>
                      
                      {!paymentDone ? (
                        <button
                          onClick={() => setShowQR(!showQR)}
                          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <CreditCard size={16} />
                          भुगतान QR
                        </button>
                      ) : (
                        <button
                          onClick={downloadPDF}
                          className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <Download size={16} />
                          PDF डाउनलोड
                        </button>
                      )}
                    </div>
                    
                    {/* QR Code */}
                    {showQR && (
                      <div className="text-center space-y-4 pt-4 border-t">
                        <img
                          src={generateQRCode()}
                          alt="UPI QR Code"
                          className="mx-auto w-48 h-48 border border-gray-300 rounded-lg"
                        />
                        <p className="text-sm text-gray-600">📲 स्कैन करें और भुगतान करें</p>
                        
                        {!paymentDone && (
                          <button
                            onClick={() => {
                              setPaymentDone(true);
                              setShowQR(false);
                              speakText('भुगतान सफल, अब बिल बना सकते हैं।');
                            }}
                            className="py-2 px-6 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
                          >
                            ✅ भुगतान स्वीकार करें
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>🛒 आपका बिल खाली है। आवाज़ से या मैन्युअल तरीके से वस्तुएं जोड़ें।</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Instructions */}
            <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📝 आवाज़ कमांड के उदाहरण:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                <li>• "2 किलो चीनी"</li>
                <li>• "1.5 किलो चावल"</li>
                <li>• "500 ग्राम दाल" (अपने आप 0.5 किग्रा में बदलेगा)</li>
                <li>• "2 लीटर दूध"</li>
                <li>• "1 किलो प्याज़ और 2 किलो आलू"</li>
              </ul>
              
              <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">🎯 सुझाव:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• धीरे और साफ बोलें</li>
                <li>• मात्रा के साथ वस्तु का नाम बोलें (किलो/ग्राम/लीटर/पीस)</li>
                <li>• माइक सही काम कर रहा हो यह सुनिश्चित करें</li>
                <li>• एक साथ कई वस्तुओं के लिए "और" का उपयोग करें</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceBillingApp;