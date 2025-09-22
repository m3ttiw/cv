import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'cv-profilo',
  standalone: true,
  template: `
    <section class="section">
      <div class="intro">
        <img class="avatar" src="assets/avatar.png" alt="Foto profilo" />
        <div>
          <h2>Mattia Patruno</h2>
          <p class="subtitle">Software Engineer • DevOps • AI Engineering</p>
          <p>
            5+ anni tra sviluppo software, DevOps e ML. Mi occupo di progettare, sviluppare e
            mettere in produzione soluzioni scalabili, con particolare attenzione a MLOps e data pipelines.
          </p>
          <div class="badges">
            <span>Angular</span><span>Java</span><span>Python</span><span>Docker</span><span>Elasticsearch</span>
          </div>
        </div>
      </div>
      <div class="cards">
        <a routerLink="/esperienza" class="card"><h3>Esperienza</h3><p>Ruoli, responsabilità, risultati.</p></a>
        <a routerLink="/progetti" class="card"><h3>Progetti</h3><p>Selezione con impatto e stack.</p></a>
        <a routerLink="/contatti" class="card"><h3>Contatti</h3><p>Email, LinkedIn, GitHub.</p></a>
      </div>
    </section>
  `,
  styles: [`
    .section { display: grid; gap: 2rem; }
    .intro { display: grid; grid-template-columns: 120px 1fr; gap: 1.25rem; align-items: center; }
    .avatar { width: 120px; height: 120px; border-radius: 999px; object-fit: cover; }
    .subtitle { opacity: .8; margin: .25rem 0 1rem; }
    .badges { display: flex; flex-wrap: wrap; gap: .5rem; }
    .badges span { padding: .25rem .6rem; border-radius: 999px; background: rgba(0,0,0,.06); font-size: .9rem; }
    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
    .card { display: block; padding: 1rem; border-radius: 1rem; text-decoration: none; border: 1px solid rgba(0,0,0,.1); }
    .card:hover { transform: translateY(-2px); transition: transform .15s ease; }
  `]
})
export class ProfiloComponent {}

@Component({
  selector: 'cv-esperienza',
  standalone: true,
  template: `
    <h2>Esperienza</h2>
    <ul class="timeline">
      <li>
        <div class="time">2021–oggi</div>
        <div class="desc">
          <h3>Software/DevOps Engineer</h3>
          <p>Progetti web e data/MLOps. CI/CD, container, IaC, monitoraggio.</p>
          <ul class="bullets">
            <li>Guidato integrazione Elasticsearch per skill matching su 5k risorse.</li>
            <li>Hardening pipeline di deploy e osservabilità.</li>
          </ul>
        </div>
      </li>
      <li>
        <div class="time">2019–2021</div>
        <div class="desc">
          <h3>Full‑stack Developer</h3>
          <p>Feature end‑to‑end, performance e UX.</p>
        </div>
      </li>
    </ul>
  `,
  styles: [`
    .timeline { list-style: none; padding: 0; margin: 1rem 0; display: grid; gap: 1.25rem; }
    .timeline li { display: grid; grid-template-columns: 120px 1fr; gap: 1rem; }
    .time { font-weight: 600; opacity: .8; }
    .bullets { margin: .5rem 0 0; }
  `]
})
export class EsperienzaComponent {}

@Component({
  selector: 'cv-progetti',
  standalone: true,
  template: `
    <h2>Progetti</h2>
    <div class="projects">
      <article class="project">
        <header>
          <h3>Skill Platform</h3>
          <small>Angular • NestJS • Elasticsearch • Docker</small>
        </header>
        <p>Piattaforma per gestione competenze, suggerimenti risorse/progetti, analytics.</p>
        <p><a href="https://github.com/your-user/your-repo" target="_blank" rel="noopener">Repo</a></p>
      </article>

      <article class="project">
        <header>
          <h3>CV Vision GAN Style Transfer</h3>
          <small>PyTorch • GAN • Segmentation</small>
        </header>
        <p>Trasferimento stile selettivo su immagini (NY ↔ Bari) con pipeline batch e GIF.</p>
      </article>
    </div>
  `,
  styles: [`
    .projects { display: grid; gap: 1rem; }
    .project { padding: 1rem; border: 1px solid rgba(0,0,0,.1); border-radius: 1rem; }
    header small { display: block; opacity: .7; margin-top: .25rem; }
  `]
})
export class ProgettiComponent {}

@Component({
  selector: 'cv-contatti',
  standalone: true,
  template: `
    <h2>Contatti</h2>
    <p>
      <a href="mailto:mattia@example.com">mattia@example.com</a> ·
      <a href="https://linkedin.com/in/your-handle" target="_blank" rel="noopener">LinkedIn</a> ·
      <a href="https://github.com/your-user" target="_blank" rel="noopener">GitHub</a>
    </p>
  `
})
export class ContattiComponent {}

export const routes: Routes = [
  { path: '', component: ProfiloComponent },
  { path: 'esperienza', component: EsperienzaComponent },
  { path: 'progetti', component: ProgettiComponent },
  { path: 'contatti', component: ContattiComponent },
  { path: '**', redirectTo: '' }
];
