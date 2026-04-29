import { Link } from 'react-router-dom';
import './Home.css';

const features = [
  {
    icon: '🌌',
    title: 'Galeria APOD',
    subtitle: 'Astronomy Picture of the Day',
    desc: 'Explore imagens astronômicas incríveis selecionadas diariamente pela NASA, com descrições de especialistas.',
    link: '/apod',
    color: 'cyan',
  },
  {
    icon: '☄️',
    title: 'Asteroides',
    subtitle: 'Near Earth Objects',
    desc: 'Monitore objetos próximos à Terra, suas velocidades, distâncias e se representam algum risco.',
    link: '/neo',
    color: 'gold',
  },
];

export default function Home() {
  return (
    <div className="home page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </div>
        <div className="container hero-content">
          <p className="hero-eyebrow">
            <span className="tag tag-cyan">NASA Open APIs</span>
          </p>
          <h1 className="hero-title">
            Explore o
            <br />
            <span className="hero-gradient">Universo</span>
          </h1>
          <p className="hero-desc">
            Dados em tempo real da NASA — imagens astronômicas, missões em Marte
            e asteroides próximos à Terra. Tudo em um só lugar.
          </p>
          <div className="hero-actions">
            <Link to="/apod" className="btn btn-primary">Começar exploração →</Link>
            <a
              href="https://api.nasa.gov"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              NASA APIs ↗
            </a>
          </div>
        </div>

        {/* Animated planet */}
        <div className="hero-planet" aria-hidden="true">
          <div className="planet" />
          <div className="planet-ring" />
          <div className="planet-glow" />
        </div>
      </section>

      {/* Feature cards */}
      <section className="features container">
        <div className="section-header">
          <span className="tag tag-cyan">Seções</span>
          <h2 className="section-title">O que você pode explorar</h2>
        </div>
        <div className="features-grid">
          {features.map((f) => (
            <Link key={f.link} to={f.link} className={`feature-card feature-card-${f.color}`}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-content">
                <span className={`tag tag-${f.color}`}>{f.subtitle}</span>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
              <span className="feature-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section container">
        <div className="stats-grid glass-card">
          {[
            { value: '13.8B', label: 'Anos do Universo' },
            { value: '2T+', label: 'Galáxias estimadas' },
            { value: '8', label: 'Planetas no Sistema Solar' },
            { value: '∞', label: 'Mistérios por descobrir' },
          ].map((s) => (
            <div key={s.label} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <p>Dados fornecidos pela <a href="https://api.nasa.gov" target="_blank" rel="noreferrer">NASA Open API</a> · Feito com ❤️ e React</p>
      </footer>
    </div>
  );
}
