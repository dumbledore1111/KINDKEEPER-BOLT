import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Smile, Camera, Send } from 'lucide-react';
import { voiceService } from '../lib/services/voiceService';
import { synthesizeSpeech } from '../lib/speech';
import { messageProcessingService } from '../lib/services/messageProcessingService';
import { chatStorageService, ChatMessage } from '../lib/services/chatStorageService';

export function VoiceChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      navigate('/');
      return;
    }

    // Load previous messages
    const loadMessages = async () => {
      const previousMessages = await chatStorageService.getMessages(user.id);
      setMessages(previousMessages);
    };

    loadMessages();

    // Add initial greeting if no previous messages
    if (messages.length === 0) {
      const greeting: ChatMessage = {
        id: crypto.randomUUID(),
        userId: user.id,
        type: 'assistant',
        content: "Hello, tell me, I am listening.",
        timestamp: new Date()
      };
      
      chatStorageService.saveMessage(greeting);
      setMessages([greeting]);
      setTimeout(() => {
        synthesizeSpeech(greeting.content);
      }, 500);
    }
  }, [navigate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleVoiceInput = async () => {
    try {
      if (isListening) {
        setIsListening(false);
        const transcription = await voiceService.stopRecording();
        console.log('Transcription:', transcription);
        
        if (transcription) {
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            userId: user.id,
            type: 'user',
            content: transcription,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, userMessage]);
          await chatStorageService.saveMessage(userMessage);
          
          // Process the transcribed message
          setIsProcessing(true);
          const { aiResponse } = await messageProcessingService.processMessage(user.id, transcription);
          
          const assistantMessage: ChatMessage = {
            id: crypto.randomUUID(),
            userId: user.id,
            type: 'assistant',
            content: aiResponse,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, assistantMessage]);
          await chatStorageService.saveMessage(assistantMessage);
          await synthesizeSpeech(aiResponse);
        }
      } else {
        setIsListening(true);
        await voiceService.startRecording();
      }
    } catch (error) {
      console.error('Detailed error with voice input:', error);
      setIsListening(false);
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        userId: JSON.parse(localStorage.getItem('user') || '{}').id,
        type: 'assistant',
        content: 'Sorry, there was an error with the voice input. Please try again.',
        timestamp: new Date()
      };
      await chatStorageService.saveMessage(errorMessage);
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isProcessing) return;
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      userId: user.id,
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);

    try {
      const { aiResponse } = await messageProcessingService.processMessage(user.id, inputText);
      
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        userId: user.id,
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      await synthesizeSpeech(aiResponse);
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        userId: user.id,
        type: 'user',
        content: 'Uploaded bill image',
        timestamp: new Date(),
        attachment: e.target?.result as string
      };

      await chatStorageService.saveMessage(userMessage);
      setMessages(prev => [...prev, userMessage]);
      
      setIsProcessing(true);
      try {
        const { aiResponse } = await messageProcessingService.processMessage(
          user.id,
          'I have uploaded a bill image. Please help me record this expense.'
        );

        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          userId: user.id,
          type: 'assistant',
          content: aiResponse,
          timestamp: new Date()
        };

        await chatStorageService.saveMessage(assistantMessage);
        setMessages(prev => [...prev, assistantMessage]);
        await synthesizeSpeech(aiResponse);
      } catch (error) {
        console.error('Error processing image:', error);
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Top Half - Voice Assistant Section */}
      <div className="h-[50vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900/95 backdrop-blur-xl border-b border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              <Button
                onClick={() => navigate('/dashboard')}
                className="text-2xl py-4 px-8 bg-[#FF6B2C]"
              >
                Back
              </Button>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="text-2xl py-4 px-8 bg-[#FF6B2C]"
              >
                <Camera className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Voice Button Container */}
        <div className="flex-1 flex items-center justify-center">
          <button 
            onClick={handleVoiceInput}
            disabled={isProcessing}
            className={`relative transform transition-all duration-500 ${
              isListening ? 'scale-110' : 'hover:scale-105'
            }`}
          >
            <div className={`absolute inset-0 bg-[#FF6B2C] blur-2xl rounded-full transition-all duration-500 ${
              isListening ? 'opacity-100 scale-125' : 'opacity-50 scale-100'
            }`} />
            <div className={`relative bg-gradient-to-br from-[#FF6B2C] to-[#FF4F2C] p-8 rounded-full transition-all duration-500 ${
              isListening ? 'animate-pulse' : ''
            }`}>
              <Smile className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-lg font-medium text-white/80">
              {isProcessing ? 'Processing...' : isListening ? 'Listening...' : 'Tap to Speak'}
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Half - Chat Section */}
      <div className="h-[50vh] border-t border-white/10">
        <div className="h-full container mx-auto px-4 max-w-2xl py-4">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/10 h-full flex flex-col">
            {/* Messages */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`max-w-[80%] ${
                    message.type === 'user' 
                      ? 'bg-[#FF6B2C]' 
                      : 'bg-slate-700'
                  } rounded-2xl p-4 shadow-lg`}>
                    {message.attachment && (
                      <img 
                        src={message.attachment} 
                        alt="Uploaded content"
                        className="max-w-full rounded-xl mb-2"
                      />
                    )}
                    <p className="text-lg text-white">{message.content}</p>
                    <p className="text-sm text-white/60 mt-2">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-700 rounded-xl px-4 py-3 text-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF6B2C]"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isProcessing || !inputText.trim()}
                  className={`p-3 ${
                    isProcessing || !inputText.trim()
                      ? 'bg-slate-700' 
                      : 'bg-[#FF6B2C] hover:bg-[#FF4F2C]'
                  } transition-colors`}
                >
                  <Send size={24} className="text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}