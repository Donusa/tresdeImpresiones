import { useEffect, useState } from 'react';

const MINIMUM_DURATION = 1600;
const EXIT_DURATION = 450;
const MAXIMUM_WAIT = 8000;

function LoadingScreen({ onComplete }) {
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pageReady = document.readyState === 'complete';
    let minimumReached = reducedMotion;
    let finished = false;
    let exitTimer;

    const finish = () => {
      if (!pageReady || !minimumReached || finished) return;
      finished = true;
      setFill(100);
      exitTimer = window.setTimeout(onComplete, reducedMotion ? 0 : EXIT_DURATION);
    };

    const handleLoad = () => {
      pageReady = true;
      finish();
    };

    window.addEventListener('load', handleLoad);
    const fillTimer = reducedMotion ? null : window.setTimeout(() => setFill(86), 60);
    const minimumTimer = window.setTimeout(() => {
      minimumReached = true;
      finish();
    }, reducedMotion ? 0 : MINIMUM_DURATION);
    const fallbackTimer = window.setTimeout(handleLoad, MAXIMUM_WAIT);
    finish();

    return () => {
      window.removeEventListener('load', handleLoad);
      window.clearTimeout(fillTimer);
      window.clearTimeout(minimumTimer);
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loading-screen ${fill === 100 ? 'loading-screen--complete' : ''}`} role="status" aria-live="polite" aria-label="Cargando TresDe Impresiones">
      <div className="loading-screen__content">
        <div className="loading-screen__logo" style={{ '--fill-level': `${100 - fill}%` }} aria-hidden="true">
          <img className="loading-screen__logo-base" src="/icono.png" alt="" />
          <img className="loading-screen__logo-fill" src="/icono.png" alt="" />
        </div>
        <p className="loading-screen__caption">CARGANDO</p>
        <span className="loading-screen__rule" aria-hidden="true" />
      </div>
    </div>
  );
}

export default LoadingScreen;
