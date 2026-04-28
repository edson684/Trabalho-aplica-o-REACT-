import { useState } from 'react';
import { Link } from 'react-router-dom';
import { nasaApi } from '../services/nasaApi';
import { useFetch } from '../hooks/useFetch';
import './APOD.css';

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function APODGallery() {
  const [count] = useState(15);
  const { data, loading, error } = useFetch(() => nasaApi.getAPOD(count), [count]);

  return (
    <div className="apod-page page-enter">
      <div className="container">
        <header className="page-header">
          <span className="tag tag-cyan">NASA · APOD</span>
          <h1 className="page-title">Astronomia do Dia</h1>
          <p className="page-subtitle">
            A NASA seleciona diariamente uma imagem ou fotografia do nosso universo, 
            acompanhada por uma explicação de um astrônomo profissional.
          </p>
        </header>

        {loading && (
          <div className="loader-container">
            <div className="loader" />
            <p className="loader-text">Buscando imagens do cosmos...</p>
          </div>
        )}

        {error && <div className="error-box">⚠ Erro: {error}</div>}

        {data && (
          <div className="apod-grid">
            {data
              .filter((item) => item.media_type === 'image')
              .map((item) => (
                <Link
                  key={item.date}
                  to={`/apod/${item.date}`}
                  className="apod-card"
                  state={{ item }}
                >
                  <div className="apod-img-wrap">
                    <img
                      src={item.url}
                      alt={item.title}
                      loading="lazy"
                      className="apod-img"
                    />
                    <div className="apod-overlay">
                      <span className="apod-overlay-text">Ver detalhes →</span>
                    </div>
                  </div>
                  <div className="apod-info">
                    <p className="apod-date">{formatDate(item.date)}</p>
                    <h3 className="apod-title">{item.title}</h3>
                    {item.copyright && (
                      <p className="apod-credit">© {item.copyright.replace(/\n/g, ' ')}</p>
                    )}
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
