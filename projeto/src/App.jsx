import React, { useState } from 'react';
import './App.css';

const taxas = {
  "Acre": 0.02, "Alagoas": 0.02, "Amapá": 0.03, "Amazonas": 0.03, "Bahia": 0.02,
  "Ceará": 0.03, "Distrito Federal": 0.03, "Espírito Santo": 0.02, "Goiás": 0.04,
  "Maranhão": 0.03, "Mato Grosso": 0.03, "Mato Grosso do Sul": 0.03,
  "Minas Gerais": 0.04, "Pará": 0.02, "Paraíba": 0.02, "Paraná": 0.03,
  "Pernambuco": 0.02, "Piauí": 0.02, "Rio de Janeiro": 0.04, "Rio Grande do Norte": 0.03,
  "Rio Grande do Sul": 0.03, "Rondônia": 0.03, "Roraima": 0.03, "Santa Catarina": 0.02,
  "São Paulo": 0.04, "Sergipe": 0.02, "Tocantins": 0.02
};

export default function App() {
  const [estado, setEstado] = useState('');
  const [valorFipe, setValorFipe] = useState('');
  const [ano, setAno] = useState('');
  const [modelo, setModelo] = useState('');
  const [ipva, setIpva] = useState(null);
  const [taxa, setTaxa] = useState(null);

  const calcularIpva = () => {
    if (estado && valorFipe && !isNaN(parseFloat(valorFipe))) {
      const percentual = taxas[estado];
      const valorCalculado = parseFloat(valorFipe) * percentual;
      setTaxa(percentual);
      setIpva(valorCalculado);
    } else {
      setTaxa(null);
      setIpva(null);
    }
  };

  return (
    <div className="container-app">
      <header className="cabecalho">
        <h1>AutoTaxa</h1>
        <nav>
          <a href="#">Blog</a>
          <a href="#">Ajuda</a>
          <button className="botao-conta">Minha Conta</button>
        </nav>
      </header>

      <main className="principal">
        <section className="esquerda">
          <h2>Calculadora IPVA</h2>
          <p>Use a Calculadora IPVA e Não Seja Pego de Surpresa Com Seu IPVA</p>
          <img src="/IPVA.png" alt="IPVA" className="imagem-ipva" />
        </section>

        <section className="direita">
          <div className="grupo-formulario">
            <label>Selecione o Estado:</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="">Selecione</option>
              {Object.keys(taxas).map((uf) => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>

            <label>Ano:</label>
            <select value={ano} onChange={(e) => setAno(e.target.value)}>
              <option value="">Selecione</option>
              {[...Array(20)].map((_, i) => {
                const y = 2025 - i;
                return <option key={y} value={y}>{y}</option>;
              })}
            </select>

            <label>Modelo:</label>
            <select value={modelo} onChange={(e) => setModelo(e.target.value)}>
              <option value="">Selecione</option>
              <option value="Gol">Gol</option>
              <option value="Civic">Civic</option>
              <option value="Onix">Onix</option>
              <option value="Corolla">Corolla</option>
            </select>

            <label>Valor da Tabela FIPE (R$):</label>
            <input
              type="number"
              placeholder="Ex: 45000"
              value={valorFipe}
              onChange={(e) => setValorFipe(e.target.value)}
            />
          </div>

          <div className="area-resultados">
            <div>
              <strong>Taxa do Estado:</strong>
              <div className="caixa-valor">
                {taxa !== null ? `${(taxa * 100).toFixed(0)}%` : 'Valor da taxa a ser cobrada'}
              </div>
            </div>
            <div>
              <strong>IPVA Final:</strong>
              <div className="caixa-valor">
                {ipva !== null ? `R$ ${ipva.toFixed(2)}` : 'Valor final'}
              </div>
            </div>
          </div>

          <button className="botao-calcular" onClick={calcularIpva}>Calcular</button>
        </section>
      </main>
    </div>
  );
}
