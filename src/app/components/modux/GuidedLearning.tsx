import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, TrendingUp } from 'lucide-react';

export function GuidedLearning() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-8 py-6">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/study')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Aprendizado Guiado
            </h1>
            <p className="text-gray-600 mt-1">Passo {step} de 3</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* AI Question */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">IA</span>
              </div>
              <div className="flex-1">
                <p className="text-lg text-gray-900 mb-6">
                  Antes da resposta: o que você já sabe sobre derivadas?
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="px-6 py-3 bg-white border border-blue-300 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                    Nada ainda
                  </button>
                  <button className="px-6 py-3 bg-white border border-blue-300 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                    Sei o básico
                  </button>
                  <button className="px-6 py-3 bg-white border border-blue-300 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                    Só tenho dúvida em exercício
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Example */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
            <div className="flex gap-4 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">IA</span>
              </div>
              <p className="text-lg text-gray-900 pt-2">
                Vamos começar com um exemplo visual.
              </p>
            </div>

            {/* Simple Graph Visualization */}
            <div className="bg-gray-50 rounded-xl p-8 mb-6">
              <div className="flex items-center justify-center h-64 relative">
                <TrendingUp className="w-32 h-32 text-blue-400" />
                <div className="absolute bottom-4 left-4 text-sm text-gray-600">
                  x
                </div>
                <div className="absolute top-4 left-4 text-sm text-gray-600">
                  f(x)
                </div>
              </div>
              <p className="text-gray-700 text-center mt-4">
                A derivada mede a taxa de variação de uma função em um ponto
              </p>
            </div>

            {/* Explanation */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
              <p className="text-gray-800">
                Imagine que você está dirigindo. A derivada é como o
                velocímetro: ela mostra o quão rápido você está mudando de
                posição naquele exato momento.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3 bg-white border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                Quero dica
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Mostrar próximo passo
              </button>
              <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                Ver resposta completa
              </button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
