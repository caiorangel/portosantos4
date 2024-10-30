import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-900 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="bg-blue-900 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Chat de Atendimento</h3>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="bg-blue-100 p-3 rounded-lg mb-2 max-w-[80%]">
              <p className="text-sm">Olá! Como posso ajudar você hoje?</p>
            </div>
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition">
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}