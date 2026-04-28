import { useState } from 'react';
import { nasaApi } from '../services/nasaApi';
import { useFetch } from '../hooks/useFetch';
import './NEO.css';

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getDatePlusDays(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

function kmToAu(km) {
  return (km / 149597870.7).toFixed(4);
}

function formatKm(km) {
  return Number(km).toLocaleString('pt-BR', { maximumFractionDigits: 0 });
}

export default function NEO() {
  const startDate = getToday();
  const endDate = getDatePlusDays(3);

  const { data, loading, error } = useFetch(
    () => nasaApi.getNEO(startDate, endDate),
    [startDate]
  );

  // Flatten all NEOs from all dates
  const allNEOs = data
    ? Object.values(data.near_earth_objects)
        .flat()
        .sort((a, b) => {
          const distA = parseFloat(a.close_approach_data[0]?.miss_distance?.kilometers || '0');
          const distB = parseFloat(b.close_approach_data[0]?.miss_distance?.kilometers || '0');
          return distA - distB;
        })
    : [];

  const hazardous = allNEOs.filter((n) => n.is_potentially_hazardous_asteroid);
  const safe = allNEOs.filter((n) => !n.is_potentially_hazardous_asteroid);

  return (
    <div className="neo-page page-enter">
      <div className="container">
        <header className="page-header">
          <span className="tag tag-gold">NASA · NEO</span>
          <h1 className="page-title">Asteroides Próximos</h1>
          <p className="page-subtitle">
            Objetos próximos à Terra (NEOs) monitorados pela NASA nos próximos 4 dias.
            Os dados são atualizados diariamente.
          </p>
        </header>

        {loading && (
          <div className="loader-container">
            <div className="loader" style={{ borderTopColor: 'var(--accent-gold)' }} />
            <p className="loader-text">Rastreando asteroides...</p>
          </div>
        )}

        {error && <div className="error-box">⚠ Erro: {error}</div>}

        {data && (
          <>
            {/* Summary */}
            <div className="neo-summary">
              <div className="neo-stat-card glass-card">
                <span className="neo-stat-icon">☄️</span>
                <span className="neo-stat-num">{allNEOs.length}</span>
                <span className="neo-stat-label">Total de NEOs</span>
              </div>
              <div className="neo-stat-card glass-card neo-stat-danger">
                <span className="neo-stat-icon">⚠️</span>
                <span className="neo-stat-num" style={{ color: 'var(--accent-orange)' }}>
                  {hazardous.length}
                </span>
                <span className="neo-stat-label">Potencialmente Perigosos</span>
              </div>
              <div className="neo-stat-card glass-card neo-stat-safe">
                <span className="neo-stat-icon">✅</span>
                <span className="neo-stat-num" style={{ color: '#4ade80' }}>
                  {safe.length}
                </span>
                <span className="neo-stat-label">Sem Risco</span>
              </div>
              <div className="neo-stat-card glass-card">
                <span className="neo-stat-icon">📅</span>
                <span className="neo-stat-num" style={{ fontSize: '1.1rem' }}>
                  {startDate}
                </span>
                <span className="neo-stat-label">a {endDate}</span>
              </div>
            </div>

            {/* NEO Table */}
            <div className="neo-table-wrap glass-card">
              <div className="neo-table-header">
                <h2 className="neo-table-title">Lista de Asteroides</h2>
                <span className="tag tag-gold">Ordenado por distância</span>
              </div>

              <div className="neo-table">
                <div className="neo-row neo-row-head">
                  <span>Nome</span>
                  <span>Diâmetro (m)</span>
                  <span>Velocidade (km/h)</span>
                  <span>Distância (km)</span>
                  <span>Data</span>
                  <span>Risco</span>
                </div>

                {allNEOs.map((neo) => {
                  const approach = neo.close_approach_data[0];
                  const dMin = neo.estimated_diameter.meters.estimated_diameter_min;
                  const dMax = neo.estimated_diameter.meters.estimated_diameter_max;
                  const velocity = parseFloat(approach?.relative_velocity?.kilometers_per_hour || 0);
                  const distance = parseFloat(approach?.miss_distance?.kilometers || 0);
                  const isHazardous = neo.is_potentially_hazardous_asteroid;

                  return (
                    <div key={neo.id} className={`neo-row ${isHazardous ? 'neo-row-danger' : ''}`}>
                      <span className="neo-name">
                        <a
                          href={neo.nasa_jpl_url}
                          target="_blank"
                          rel="noreferrer"
                          className="neo-link"
                        >
                          {neo.name.replace(/[()]/g, '')}
                        </a>
                      </span>
                      <span className="neo-cell">
                        {dMin.toFixed(0)}–{dMax.toFixed(0)}
                      </span>
                      <span className="neo-cell">
                        {velocity.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                      </span>
                      <span className="neo-cell">
                        {formatKm(distance)}
                      </span>
                      <span className="neo-cell neo-date">
                        {approach?.close_approach_date}
                      </span>
                      <span className="neo-cell">
                        {isHazardous ? (
                          <span className="tag tag-orange">⚠ Perigoso</span>
                        ) : (
                          <span className="tag" style={{ color: '#4ade80', borderColor: 'rgba(74,222,128,0.4)', background: 'rgba(74,222,128,0.08)' }}>
                            ✓ Seguro
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="neo-footnote">
              * Distâncias em km a partir do centro da Terra. Fonte: NASA Center for Near Earth Object Studies (CNEOS).
            </p>
          </>
        )}
      </div>
    </div>
  );
}
