import { FileText, Image, Code2, FileSpreadsheet, Presentation, Calendar, Search, X, Download, Share2 } from 'lucide-react';
import { useState } from 'react';

const fileCategories = ['Todos', 'PDF', 'Imagens', 'Código', 'Resumos', 'Apresentações'];

const generatedFiles = [
  {
    id: 1,
    name: 'Resumo - Introdução à IA',
    type: 'PDF',
    date: '2026-05-07',
    category: 'Estudos',
    icon: FileText,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    preview: 'Este resumo cobre os conceitos fundamentais de Inteligência Artificial, incluindo aprendizado de máquina, redes neurais e aplicações práticas.',
  },
  {
    id: 2,
    name: 'Diagrama de Arquitetura',
    type: 'Imagem',
    date: '2026-05-06',
    category: 'Programação',
    icon: Image,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    preview: '[Diagrama visual mostrando a arquitetura do sistema com componentes frontend, backend e banco de dados]',
  },
  {
    id: 3,
    name: 'Componente React.tsx',
    type: 'Código',
    date: '2026-05-06',
    category: 'Programação',
    icon: Code2,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    preview: 'import React from \'react\';\n\nexport function Button({ children, onClick }) {\n  return (\n    <button onClick={onClick} className="px-4 py-2 bg-blue-600 text-white rounded">\n      {children}\n    </button>\n  );\n}',
  },
  {
    id: 4,
    name: 'Análise de Dados - Marketing',
    type: 'Planilha',
    date: '2026-05-05',
    category: 'Brainstorm',
    icon: FileSpreadsheet,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    preview: 'Planilha com análise de métricas de marketing: CTR, conversões, ROI e segmentação de público por plataforma.',
  },
  {
    id: 5,
    name: 'Apresentação Produto v2',
    type: 'Apresentação',
    date: '2026-05-04',
    category: 'Escrita',
    icon: Presentation,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    preview: 'Apresentação executiva do produto com slides sobre visão, features, roadmap e modelo de negócio.',
  },
  {
    id: 6,
    name: 'Guia de Estudo - React Hooks',
    type: 'PDF',
    date: '2026-05-03',
    category: 'Estudos',
    icon: FileText,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    preview: 'Guia completo sobre React Hooks: useState, useEffect, useContext, useMemo, useCallback com exemplos práticos e cases de uso.',
  },
];

const filterOptions = [
  { label: 'Hoje', value: 'today' },
  { label: 'Esta semana', value: 'week' },
  { label: 'Este mês', value: 'month' },
];

export function ModuxFiles() {
  const [selectedFile, setSelectedFile] = useState<typeof generatedFiles[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Arquivos Gerados</h1>
        <p className="text-gray-600">
          Tudo o que foi criado durante suas interações.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar arquivo..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter.value}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2">
          {fileCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                category === selectedCategory
                  ? 'bg-gray-900 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Files Grid */}
      <div className="flex-1 overflow-auto bg-[#fafafa] px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {generatedFiles.map((file) => {
            const Icon = file.icon;
            return (
              <div
                key={file.id}
                onClick={() => setSelectedFile(file)}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-2 hover:scale-105 hover:border-blue-400 transition-all duration-300 cursor-pointer group"
              >
                {/* File Icon */}
                <div className={`${file.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${file.color}`} />
                </div>

                {/* File Info */}
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {file.name}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                    {file.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span className="text-xs">{file.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* File Preview Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
            {/* Modal Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = selectedFile.icon;
                  return (
                    <div className={`${selectedFile.bgColor} p-3 rounded-lg`}>
                      <Icon className={`w-6 h-6 ${selectedFile.color}`} />
                    </div>
                  );
                })()}
                <div>
                  <h2 className="font-bold text-gray-900">{selectedFile.name}</h2>
                  <p className="text-xs text-gray-500">{selectedFile.type} • {selectedFile.date}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="p-2 hover:bg-white rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Preview Content */}
            <div className="p-8 overflow-y-auto max-h-[60vh]">
              {selectedFile.type === 'Código' ? (
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto font-mono text-sm">
                  <code>{selectedFile.preview}</code>
                </pre>
              ) : selectedFile.type === 'Imagem' ? (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-12 flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
                    <Image className="w-24 h-24 text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-600">{selectedFile.preview}</p>
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedFile.preview}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex gap-3">
              <button
                onClick={() => setSelectedFile(null)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Fechar
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Baixar
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                <Share2 className="w-4 h-4" />
                Compartilhar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
