import { useState, useEffect } from "react";
import "../styles/style.css";
import "../styles/mobile.css";
import logo from "../assets/LogoTipo.png";
import carImage from "../assets/IPVA.png";

const taxasEstados = {
  AC: 2, AL: 3, AP: 3, AM: 3, BA: 2.5, CE: 3.2, DF: 3.5, ES: 2,
  GO: 3.5, MA: 2.5, MT: 4, MS: 3.5, MG: 4, PA: 2.5, PB: 2.5, PR: 3.5,
  PE: 2.5, PI: 2.5, RJ: 4, RN: 3, RS: 3, RO: 3, RR: 3, SC: 2, SP: 4,
  SE: 2.5, TO: 2.5
};

const Home = () => {
  const [valorFipe, setValorFipe] = useState("");
  const [estado, setEstado] = useState("");
  const [taxa, setTaxa] = useState("");
  const [resultado, setResultado] = useState("");

  useEffect(() => {
    if (estado) {
      setTaxa(taxasEstados[estado]);
    }
  }, [estado]);

  useEffect(() => {
    const estadoCorrespondente = Object.keys(taxasEstados).find(
      (uf) => taxasEstados[uf] === Number(taxa)
    );
    if (estadoCorrespondente) {
      setEstado(estadoCorrespondente);
    }
  }, [taxa]);

  const calcularIPVA = () => {
    if (!valorFipe || !taxa) {
      setResultado("Preencha todos os campos corretamente!");
      return;
    }
    const ipvaFinal = (parseFloat(valorFipe) * (parseFloat(taxa) / 100)).toFixed(2);
    setResultado(`R$ ${ipvaFinal}`);
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <h1>AutoTaxa</h1>
      <img src={carImage} alt="Carro" className="car-image" />

      <div className="input-container">
        <label>Valor da Tabela FIPE:</label>
        <input
          type="number"
          placeholder="Digite o valor do veículo"
          value={valorFipe}
          onChange={(e) => setValorFipe(e.target.value)}
        />

        <label>Estado:</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="">Selecione um estado</option>
          {Object.keys(taxasEstados).map((uf) => (
            <option key={uf} value={uf}>{uf}</option>
          ))}
        </select>

        <label>Taxa do Estado (%):</label>
        <input
          type="number"
          placeholder="Digite a taxa"
          value={taxa}
          onChange={(e) => setTaxa(e.target.value)}
        />

        <button onClick={calcularIPVA}>Calcular IPVA</button>
      </div>

      {resultado && <p className="result">{resultado}</p>}
    </div>
  );
};

export default Home;
