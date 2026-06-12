import { useState } from "react";
import {
  Lightbulb,
  ArrowRight,
  X,
  CheckCircle,
} from "lucide-react";

const knowledgeLevels = [
  "Nada ainda",
  "Sei o básico",
  "Tenho dúvida em exercícios",
];

const learningSteps = [
  {
    number: 1,
    title: "Conceito básico",
    description: "Entenda a definição fundamental",
    content:
      "Uma derivada mede a taxa de variação instantânea de uma função. Em termos práticos, ela nos diz o quão rápido algo está mudando em um dado momento.",
  },
  {
    number: 2,
    title: "Exemplo visual",
    description: "Veja como funciona na prática",
    content:
      "Imagine um carro em movimento. A derivada da função posição nos dá a velocidade do carro. Se x(t) = t², então x'(t) = 2t é a velocidade em cada momento.",
  },
  {
    number: 3,
    title: "Aplicação prática",
    description: "Resolva um problema real",
    content:
      "Vamos calcular: se f(x) = x³, qual é f'(x)? Use a regra da potência: multiplique o expoente pelo coeficiente e diminua 1 do expoente.",
  },
];

const hints = [
  'Pense na derivada como a "inclinação" da função em um ponto específico',
  "A notação f'(x) ou df/dx significa a mesma coisa: a derivada de f",
  "Derivadas constantes sempre resultam em zero",
];

export function StudyMode() {
  const [question, setQuestion] = useState("");
  const [showGuided, setShowGuided] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<
    string | null
  >(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showFullAnswer, setShowFullAnswer] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<
    number[]
  >([]);

  const handleStartGuided = () => {
    if (!question.trim()) {
      setQuestion("Como funcionam derivadas?");
    }
    setShowGuided(true);
  };

  const handleNextStep = () => {
    if (currentStep < learningSteps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
      setShowHint(false);
    }
  };

  const handleShowFullAnswer = () => {
    setShowFullAnswer(true);
  };

  return (
    <div className="h-full flex flex-col overflow-auto">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Modo Estudo
        </h1>
        <p className="text-gray-600">
          Aprender antes de responder.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#fafafa] px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Question Input */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <label className="block font-medium text-gray-900 mb-3">
              Qual é sua pergunta?
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Como funcionam derivadas?"
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div
            className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: "100ms" }}
          >
            <button
              onClick={handleStartGuided}
              className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Me guie
            </button>
            <button
              onClick={handleShowFullAnswer}
              className="flex-1 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 hover:scale-105 transition-all duration-300"
            >
              Resposta direta
            </button>
          </div>

          {/* Guided Learning Section */}
          {showGuided && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* AI Message */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="font-medium text-blue-900 mb-3">
                      Antes da resposta: o que você já sabe
                      sobre derivadas?
                    </p>
                    <div className="space-y-2">
                      {knowledgeLevels.map((level) => (
                        <button
                          key={level}
                          onClick={() =>
                            setSelectedLevel(level)
                          }
                          className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                            selectedLevel === level
                              ? "bg-blue-600 text-white shadow-md scale-105"
                              : "bg-white text-gray-700 hover:bg-blue-100 hover:scale-102"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Path */}
              {selectedLevel && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="font-bold text-gray-900 mb-6">
                    Fluxo de aprendizado
                  </h3>
                  <div className="space-y-4">
                    {learningSteps.map((step, index) => (
                      <div key={step.number}>
                        <div
                          className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-300 ${
                            index === currentStep
                              ? "bg-blue-50 border-2 border-blue-400 shadow-md"
                              : completedSteps.includes(index)
                                ? "bg-green-50 border border-green-300"
                                : "bg-gray-50 border border-gray-200"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 transition-all ${
                              completedSteps.includes(index)
                                ? "bg-green-600 text-white"
                                : index === currentStep
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {completedSteps.includes(index) ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              step.number
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {step.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {step.description}
                            </p>
                            {index === currentStep && (
                              <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200 animate-in fade-in slide-in-from-top-4 duration-300">
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  {step.content}
                                </p>
                              </div>
                            )}
                          </div>
                          {index === currentStep && (
                            <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1 animate-pulse" />
                          )}
                        </div>
                        {index < learningSteps.length - 1 && (
                          <div className="w-px h-4 bg-gray-300 ml-8" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-3 flex-wrap">
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-amber-50 hover:border-amber-400 transition-all duration-300 hover:scale-105"
                    >
                      💡 Quero dica
                    </button>
                    {currentStep < learningSteps.length - 1 && (
                      <button
                        onClick={handleNextStep}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        Próximo passo →
                      </button>
                    )}
                    <button
                      onClick={handleShowFullAnswer}
                      className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105"
                    >
                      Ver resposta completa
                    </button>
                  </div>
                </div>
              )}

              {/* Hint Panel */}
              {showHint && selectedLevel && (
                <div className="bg-amber-50 border border-amber-300 rounded-xl p-6 animate-in fade-in slide-in-from-right-4 duration-300 relative">
                  <button
                    onClick={() => setShowHint(false)}
                    className="absolute top-4 right-4 p-1 hover:bg-amber-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-amber-700" />
                  </button>
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-3">
                        Dica:
                      </h3>
                      <p className="text-amber-800">
                        {hints[currentStep] || hints[0]}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Full Answer Modal */}
              {showFullAnswer && (
                <div className="bg-white border-2 border-purple-300 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-lg">
                      Resposta Completa
                    </h3>
                    <button
                      onClick={() => setShowFullAnswer(false)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      <strong>Derivadas</strong> são conceitos
                      fundamentais do cálculo que medem a taxa
                      de variação de uma função. Em termos
                      simples, elas nos dizem o quão rápido algo
                      está mudando em um determinado ponto.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <p className="text-gray-700 font-mono text-sm">
                        Regra básica: Se f(x) = x^n, então f'(x)
                        = n·x^(n-1)
                      </p>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Por exemplo, se f(x) = x², aplicando a
                      regra: f'(x) = 2·x^(2-1) = 2x. Isso
                      significa que a taxa de variação em
                      qualquer ponto x é 2x.
                    </p>
                  </div>
                </div>
              )}

              {/* Example Graph */}
              {selectedLevel && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Visualização
                  </h3>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-64 h-64 border-2 border-blue-300 rounded-lg mb-4 flex items-center justify-center bg-white shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-blue-600 font-mono">
                          <div className="text-lg mb-4">
                            f(x) = x²
                          </div>
                          <div className="text-lg text-purple-600">
                            f'(x) = 2x
                          </div>
                          <div className="mt-6 text-xs text-gray-500">
                            [Gráfico interativo]
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Gráfico da função e sua derivada
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}