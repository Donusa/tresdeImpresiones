import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { whatsappUrl } from '../data/contact';

export default function Hero() {
  return (
    <section id="inicio" className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero__inner">
        <div className="home-hero__content">
          <p className="home-hero__eyebrow"><span aria-hidden="true" /> IMPRESIÓN 3D A TU MEDIDA</p>
          <h1 id="home-hero-title" className="home-hero__title">
            Tus ideas, <em>hechas realidad</em> en 3D.
          </h1>
          <p className="home-hero__description">
            Creamos figuras y piezas únicas a pequeña escala. Desde la impresión hasta el pintado artesanal, cuidamos cada detalle de tu proyecto.
          </p>
          <div className="home-hero__actions">
            <a className="home-hero__button home-hero__button--primary" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              Cotizar ahora <ArrowRight size={19} aria-hidden="true" />
            </a>
            <a className="home-hero__button home-hero__button--secondary" href="#proyectos">
              Ver proyectos <ArrowUpRight size={19} aria-hidden="true" />
            </a>
          </div>
          <div className="home-hero__note">
            <span className="home-hero__note-line" aria-hidden="true" />
            <span>De tu imaginación a tus manos.</span>
          </div>
        </div>

        <div className="home-hero__visual">
          <div className="home-hero__image-wrap">
            <img
              className="home-hero__image"
              src="/display5.jpeg"
              alt="Sillas en miniatura impresas en 3D, en tonos naranja y turquesa"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
