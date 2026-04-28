import { useParams, useLocation, Link } from 'react-router-dom';
import { nasaApi } from '../services/nasaApi';
import { useFetch } from '../hooks/useFetch';
import './APODDetail.css';

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
}

export default function APODDetail() {
  const { date } = useParams();
  const location = useLocation();
  const cached = location.state?.item;

  const { data, loading, error } = useFetch(
    () => cached ? Promise.resolve(cached) : nasaApi.getAPODByDate(date),
    [date]
  );

  return (
    <div className="apod-detail page-enter">
      <div className="container">
        <Link to="/apod" className="back-link">← Voltar à Galeria</Link>

        {loading && (
          <div className="loader-container">
            <div className="loader" />
            <p className="loader-text">Carregando imagem...</p>
          </div>
        )}

        {error && <div className="error-box">⚠ Erro: {error}</div>}

        {data && (
          <article className="detail-layout">
            <div className="detail-media">
              {data.media_type === 'image' ? (
                <img src={data.hdurl || data.url} alt={data.title} className="detail-img" />
              ) : (
                <iframe
                  src={data.url}
                  title={data.title}
                  className="detail-video"
                  allowFullScreen
                />
              )}
              {data.copyright && (
                <p className="detail-credit">© {data.copyright.replace(/\n/g, ' ')}</p>
              )}
            </div>

            <div className="detail-info glass-card">
              <div className="detail-meta">
                <span className="tag tag-cyan">NASA · APOD</span>
                <span className="detail-date">{formatDate(data.date)}</span>
              </div>
              <h1 className="detail-title">{data.title}</h1>
              <p className="detail-explanation">{data.explanation}</p>

              {data.hdurl && data.media_type === 'image' && (
                <a
                  href={data.hdurl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-detail"
                >
                  Ver em HD ↗
                </a>
              )}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
