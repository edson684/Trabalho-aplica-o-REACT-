import { useState } from 'react';
import { Link } from 'react-router-dom';
import { nasaApi } from '../services/nasaApi';
import { useFetch } from '../hooks/useFetch';
import './Mars.css';

const ROVERS = ['curiosity', 'opportunity', 'spirit'];
const CAMERAS = {
  curiosity: ['', 'FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'NAVCAM'],
  opportunity: ['', 'FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM'],
  spirit: ['', 'FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM'],
};
const ROVER_INFO = {
  curiosity: { sol: 3500, emoji: '🤖', color: 'cyan', status: 'Ativo' },
  opportunity: { sol: 5000, emoji: '🛰️', color: 'gold', status: 'Encerrado 2019' },
  spirit: { sol: 900, emoji: '🔭', color: 'orange', status: 'Encerrado 2010' },
};

export default function Mars() {
  const [rover, setRover] = useState('curiosity');
  const [camera, setCamera] = useState('');
  const [selected, setSelected] = useState(null);

  const sol = ROVER_INFO[rover].sol;

  const { data: photos, loading, error } = useFetch(
    () => nasaApi.getMarsPhotos(rover, sol, camera),
    [rover, camera]
  );

  return (
    <div className="mars-page page-enter">
      <div className="container">
        <header className="page-header">
          <span className="tag tag-orange">NASA · Mars Rovers</span>
          <h1 className="page-title">Superfície de Marte</h1>
          <p className="page-subtitle">
            Fotos reais capturadas pelos rovers da NASA na superfície do planeta vermelho.
          </p>
        </header>

        {/* Controls */}
        <div className="mars-controls glass-card">
          <div className="control-group">
            <label className="control-label">Rover</label>
            <div className="rover-btns">
              {ROVERS.map((r) => (
                <button
                  key={r}
                  className={`rover-btn rover-btn-${ROVER_INFO[r].color} ${rover === r ? 'active' : ''}`}
                  onClick={() => { setRover(r); setCamera(''); }}
                >
                  {ROVER_INFO[r].emoji} {r.charAt(0).toUpperCase() + r.slice(1)}
                  <span className={`rover-status status-${ROVER_INFO[r].color}`}>
                    {ROVER_INFO[r].status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">Câmera</label>
            <select
              className="camera-select"
              value={camera}
              onChange={(e) => setCamera(e.target.value)}
            >
              <option value="">Todas as câmeras</option>
              {CAMERAS[rover].slice(1).map((c) => (
                <option key={c} value={c.toLowerCase()}>{c}</option>
              ))}
            </select>
          </div>

          <div className="control-info">
            <span className="tag tag-orange">Sol {sol}</span>
            <span className="control-count">
              {photos ? `${photos.length} fotos encontradas` : '—'}
            </span>
          </div>
        </div>

        {loading && (
          <div className="loader-container">
            <div className="loader" style={{ borderTopColor: 'var(--accent-orange)' }} />
            <p className="loader-text">Transmitindo dados de Marte...</p>
          </div>
        )}

        {error && <div className="error-box">⚠ Erro: {error}</div>}

        {photos && photos.length === 0 && (
          <div className="empty-state">
            <span>📷</span>
            <p>Nenhuma foto encontrada para esta câmera neste Sol.</p>
          </div>
        )}

        {photos && photos.length > 0 && (
          <div className="mars-grid">
            {photos.map((photo) => (
              <button
                key={photo.id}
                className="mars-card"
                onClick={() => setSelected(photo)}
              >
                <img
                  src={photo.img_src}
                  alt={`Foto de Marte - ${photo.camera.full_name}`}
                  loading="lazy"
                  className="mars-img"
                />
                <div className="mars-card-info">
                  <span className="mars-camera">{photo.camera.name}</span>
                  <span className="mars-sol">Sol {photo.sol}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Modal */}
        {selected && (
          <div className="modal-backdrop" onClick={() => setSelected(null)}>
            <div className="modal glass-card" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
              <img src={selected.img_src} alt="Mars" className="modal-img" />
              <div className="modal-meta">
                <div>
                  <p className="modal-label">Rover</p>
                  <p className="modal-value">{selected.rover.name}</p>
                </div>
                <div>
                  <p className="modal-label">Câmera</p>
                  <p className="modal-value">{selected.camera.full_name}</p>
                </div>
                <div>
                  <p className="modal-label">Sol</p>
                  <p className="modal-value">{selected.sol}</p>
                </div>
                <div>
                  <p className="modal-label">Data terrestre</p>
                  <p className="modal-value">{selected.earth_date}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
