import { useNavigate } from 'react-router';
import { BookOpen, Code, Lightbulb, FileText, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { askLLM } from '@/lib/llm.ts';
import ReactMarkdown from 'react-markdown';
import { useHistory } from '@/app/context/HistoryContext';

const modes = [
  {
    id: 'study',
    title: 'Estudar',
    description: 'Aprenda passo a passo.',
    icon: BookOpen,
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200 hover:border-blue-300',
    iconColor: 'text-blue-600',
    path: '/study',
  },
  {
    id: 'program',
    title: 'Programar',
    description: 'Resolva problemas técnicos.',
    icon: Code,
    color: 'bg-purple-50 hover:bg-purple-100 border-purple-200 hover:border-purple-300',
    iconColor: 'text-purple-600',
    path: '/program',
  },
  {
    id: 'brainstorm',
    title: 'Brainstorm',
    description: 'Explore ideias criativas.',
    icon: Lightbulb,
    color: 'bg-amber-50 hover:bg-amber-100 border-amber-200 hover:border-amber-300',
    iconColor: 'text-amber-600',
    path: '/brainstorm',
  },
  {
    id: 'write',
    title: 'Escrever',
    description: 'Revise e organize textos.',
    icon: FileText,
    color: 'bg-green-50 hover:bg-green-100 border-green-200 hover:border-green-300',
    iconColor: 'text-green-600',
    path: '/study',
  },
];

const quickSuggestions = [
  'Explicar conceito',
  'Revisar texto',
  'Gerar ideias',
  'Corrigir código',
];

export function ModuxHome() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const handleModeClick = (path: string) => {
    navigate(path);
  };

  const { addConversation } = useHistory();

  const handleQuickChat = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    setShowResponse(false);

    try {
      const response = await askLLM(
        `Você é um assistente direto e conciso. Responda em português em no máximo 3 frases. 
         Se a pergunta for complexa, sugira usar um dos modos específicos (Estudo, Programação, Brainstorm ou Escrita).`,
         question
        );
      setAiResponse(response);

      addConversation({
        title: question,
        preview: response.slice(0, 80),
        category: 'study',
        hasFiles: false,
        conversation: [
          { role: 'user', content: question },
          { role: 'ai', content: response },
        ]
      });

      setShowResponse(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuestion(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleQuickChat();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-8 py-16">
      <div className="w-full max-w-4xl">
        {/* Header Text */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Como você quer usar a IA hoje?
          </h2>
          <p className="text-lg text-gray-600">
            Escolha um modo de interação baseado no seu objetivo.
          </p>
        </div>

        {/* Mode Cards */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {modes.map((mode, index) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => handleModeClick(mode.path)}
                style={{ animationDelay: `${index * 100}ms` }}
                className={`${mode.color} border rounded-2xl p-6 w-44 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:scale-105 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8`}
              >
                <div className={`${mode.iconColor} mb-3 transition-transform group-hover:scale-110`}>
                  <Icon className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {mode.title}
                </h3>
                <p className="text-xs text-gray-600">{mode.description}</p>
              </button>
            );
          })}
        </div>

        {/* Quick Input */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '400ms' }}>
          <div className="bg-white border-2 border-gray-300 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-300 p-4 flex items-center gap-3">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Faça uma pergunta rápida…"
              className="flex-1 resize-none outline-none text-gray-700 placeholder:text-gray-400 bg-transparent max-h-32"
              rows={1}
            />
            <button
              onClick={handleQuickChat}
              disabled={isLoading || !question.trim()}
              className="bg-gray-900 text-white p-3 rounded-xl hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <p className="text-blue-900 font-medium">Processando sua pergunta...</p>
            </div>
          </div>
        )}

        {/* Quick Response */}
        {showResponse && (
          <div className="mb-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">M</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Resposta</h3>
                <div className="text-gray-700 leading-relaxed prose prose-sm max-w-none"> 
                  <ReactMarkdown>{aiResponse}</ReactMarkdown>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/study')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Usar Modo Estudo
              </button>
              <button
                onClick={() => setShowResponse(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Nova pergunta
              </button>
            </div>
          </div>
        )}

        {/* Quick Suggestions */}
        <div className="flex justify-center gap-2 flex-wrap animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '500ms' }}>
          {quickSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-400 hover:shadow-sm hover:scale-105 transition-all duration-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
