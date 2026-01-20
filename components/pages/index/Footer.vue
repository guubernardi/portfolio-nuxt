<template>
    <footer id="footer" class="footer">
      <div class="footer__top">
        <div class="footer__container">
          <div class="footer__grid">
            <div class="footer__brand">
              <p class="footer__name">
                <span class="nome--gold">Gustavo</span>
                <span class="nome--white">Bernardi</span>
              </p>
            </div>
  
            <!-- divisor vertical -->
            <div class="footer__divider" aria-hidden="true"></div>
  
            <!-- atalhos -->
            <nav class="footer__nav" aria-label="Atalhos do rodapé">
              <p class="footer__navTitle">Atalhos</p>
              <ul class="footer__links">
                <li><a href="#inicio">Início</a></li>
                <li><a href="#sobre">Quem sou eu</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projetos">Projetos</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
  
      <div class="footer__mid">
        <div class="footer__container footer__midGrid">
          <div class="footer__email">
            <p class="footer__label">E-mail</p>
            <a class="footer__emailLink" href="mailto:gubernardi@hotmail.com">
              gubernardi@hotmail.com
            </a>
          </div>
  
          <div class="footer__icons" aria-label="Redes sociais">
            <a class="social" href="https://wa.me/5511977912709" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M20.5 11.9c0 4.7-3.9 8.6-8.6 8.6-1.5 0-2.9-.4-4.2-1.1l-4.2 1.2 1.3-4.1c-.8-1.4-1.3-3-1.3-4.6C3.5 7.2 7.4 3.3 12 3.3c4.6 0 8.5 3.9 8.5 8.6Z"
                  fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"
                />
                <path
                  d="M10 8.6c-.2-.5-.5-.5-.8-.5h-.6c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.3.1.1 1.6 2.5 3.9 3.4 1.9.7 2.3.6 2.7.5.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1-.1-.1-.4-.2-.8-.4-.4-.2-1.3-.6-1.5-.7-.2-.1-.4-.2-.6.1-.2.2-.7.7-.8.9-.1.2-.3.2-.6.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.5-1.3-1.7-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-1.9Z"
                  fill="currentColor"
                />
              </svg>
            </a>
  
            <a class="social" href="https://github.com/guubernardi" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 2.6c-5.2 0-9.4 4.2-9.4 9.4 0 4.1 2.7 7.6 6.4 8.8.5.1.7-.2.7-.5v-1.9c-2.6.6-3.2-1.1-3.2-1.1-.4-1-.9-1.3-.9-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.2 1 2.7.8.1-.6.3-1 .5-1.2-2.1-.2-4.3-1.1-4.3-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.7 0 3.8-2.2 4.7-4.3 4.9.3.3.6.8.6 1.6v2.4c0 .3.2.6.7.5 3.7-1.2 6.4-4.7 6.4-8.8 0-5.2-4.2-9.4-9.4-9.4Z"
                  fill="currentColor"
                />
              </svg>
            </a>
  
            <a class="social" href="https://linkedin.com/in/gubernardi" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6.6 6.9a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM4.9 21.1h3.4V8.7H4.9v12.4ZM10.1 8.7h3.3v1.7h.1c.5-1 1.8-2 3.6-2 3.8 0 4.5 2.5 4.5 5.8v6.9h-3.4v-6.1c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3v6.2h-3.4V8.7Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
  
      <div class="footer__bottom">
        <div class="footer__container">
          <p class="footer__copy">Feito e Densenvolvido por Gustavo Bernardi - ©2026 - Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  </template>
  
  <style scoped lang="scss">
  .footer {
    --bg: #060606;
    --bg2: #070707;
    --line: rgba(255, 255, 255, 0.10);
    --text: rgba(255, 255, 255, 0.85);
    --muted: rgba(255, 255, 255, 0.45);
    --gold: #f2a900;
    background: var(--bg);
    color: var(--text);
    border-top: 1px solid var(--line);
  }
  
  .footer__container {
    width: min(1200px, 92vw);
    margin: 0 auto;
    font-family: var(--light);
  }
  
  .footer__top {
    padding: 40px 0;
  }
  
  .footer__grid {
    display: grid;
    grid-template-columns: 1fr 1px 1fr;
    align-items: center;
    gap: 36px;
  }
  
  .footer__brand {
    display: flex;
    justify-content: center;
  }
  
  .footer__name {
    margin: 0;
    font-weight: 600;
    letter-spacing: 0.02em;
    font-size: 15px;
    opacity: 0.95;
  }
  
  .nome--gold { color: var(--gold); }
  .nome--white { color: #fff; margin-left: 6px; }
  
  .footer__divider {
    width: 1px;
    height: 64px;
    background: var(--line);
    justify-self: center;
  }
  
  .footer__nav {
    justify-self: center;
    text-align: left;
  }
  
  .footer__navTitle {
    margin: 0 0 10px;
    font-size: 12px;
    color: #fff;
    opacity: 0.9;
    font-weight: 600;
  }
  
  .footer__links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 8px;
  
    a {
      color: var(--muted);
      text-decoration: none;
      font-size: 11px;
      transition: 200ms ease;
      &:hover {
        color: #fff;
        transform: translateX(2px);
      }
    }
  }
  
  .footer__mid {
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    background: var(--bg2);
  }
  
  .footer__midGrid {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: 22px 0;
    gap: 20px;
  }
  
  .footer__email {
    display: grid;
    gap: 6px;
  }
  
  .footer__label {
    margin: 0;
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  
  .footer__emailLink {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    letter-spacing: 0.02em;
    font-size: clamp(14px, 1.2vw, 18px);
    opacity: 0.96;
  
    &:hover {
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }
  
  .footer__icons {
    display: flex;
    align-items: center;
    gap: 18px;
  }
  
  .social {
    width: 22px;
    height: 22px;
    color: var(--gold);
    display: grid;
    place-items: center;
    transition: 200ms ease;
    text-decoration: none;
  
    svg {
      width: 22px;
      height: 22px;
      display: block;
    }
  
    &:hover {
      transform: translateY(-2px);
      filter: drop-shadow(0 6px 16px rgba(242, 169, 0, 0.25));
    }
  }
  
  .footer__bottom {
    padding: 18px 0 22px;
  }
  
  .footer__copy {
    margin: 0;
    text-align: center;
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.02em;
  }
  
  /* responsivo */
  @media (max-width: 720px) {
    .footer__grid {
      grid-template-columns: 1fr;
      gap: 18px;
    }
  
    .footer__divider { display: none; }
  
    .footer__nav {
      text-align: center;
    }
  
    .footer__midGrid {
      grid-template-columns: 1fr;
      justify-items: center;
      text-align: center;
    }
  
    .footer__icons {
      justify-content: center;
    }
  }
</style>  