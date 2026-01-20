<template> 
    <section class="projetos" aria-label="Seção de projetos">
      <div class="titulo">
        <h2>Projetos</h2>
      </div>
  
      <div class="area-projeto js-projeto">
        <div class="imagem-desktop js-projeto-img">
          <img
            src="/images/desktop-shiftfy.svg"
            alt="Imagem Projeto Shiftfy"
            width="700"
            height="500"
          />
        </div>
  
        <div class="titulo-projeto js-projeto-txt">
          <h2>SHIFTFY</h2>
          <p class="descricao">
            Sistema interno da empresa que atualmente trabalho <br />
            Essa versão é o MVP atualmente esta em desenvolvimento
          </p>
  
          <div class="tecnologias">
            <div class="tec">
              <img src="/images/nuxt-dourado.svg" alt="Ícone NuxtJS" />
              <p>NuxtJS</p>
            </div>
  
            <div class="tec">
              <img src="/images/vercel.svg" alt="Ícone Vercel" />
              <p>Vercel</p>
            </div>
  
            <div class="tec">
              <img src="/images/sass-dourado.svg" alt="Ícone Sass" />
              <p>Sass</p>
            </div>
          </div>
  
          <div class="acao">
            <a href="https://youtu.be/obgeOnP8UVg" target="_blank">
              <button type="button">
                <img src="/images/play.svg" alt="Play video" />
                Veja o video
              </button>
            </a>
          </div>
        </div>
      </div>
  
      <div class="area-projeto js-projeto">
        <div class="imagem-desktop js-projeto-img">
          <img
            src="/images/leans.svg"
            alt="Imagem Projeto Barbearia Leans"
            width="700"
            height="500"
          />
        </div>
  
        <div class="titulo-projeto js-projeto-txt">
          <h2>Barbearia Leans</h2>
          <p class="descricao">Landing Page para Barbearia Leans</p>
  
          <div class="tecnologias">
            <div class="tec">
              <img src="public/images/html-amarelo.svg" alt="Ícone HTML" />
              <p>HTML</p>
            </div>
  
            <div class="tec">
              <img src="/images/css-amarelo.svg" alt="Ícone CSS" />
              <p>CSS</p>
            </div>
  
            <div class="tec">
              <img src="/images/js-amarelo.svg" alt="Ícone Java Script" />
              <p>JavaScript</p>
            </div>
          </div>
  
          <div class="acao">
            <a href="https://guubernardi.github.io/landing_barbearia/" target="_blank">
              <button type="button">
                <img src="/images/play.svg" alt="Play video" />
                Veja no ar
              </button>
            </a>
          </div>
        </div>
      </div>

      <div class="area-projeto js-projeto">
        <div class="imagem-desktop js-projeto-img">
          <img
            src="/images/ia-remove.svg"
            alt="Imagem Projeto Barbearia Leans"
            width="700"
            height="500"
          />
        </div>
  
        <div class="titulo-projeto js-projeto-txt">
          <h2>IA Remove</h2>
          <p class="descricao">Removedor de Fundos de Imagens usando a API da Remove.bg</p>
  
          <div class="tecnologias">
            <div class="tec">
              <img src="public/images/html-amarelo.svg" alt="Ícone HTML" />
              <p>HTML</p>
            </div>
  
            <div class="tec">
              <img src="/images/css-amarelo.svg" alt="Ícone CSS" />
              <p>CSS</p>
            </div>
  
            <div class="tec">
              <img src="/images/js-amarelo.svg" alt="Ícone Java Script" />
              <p>JavaScript</p>
            </div>
          </div>
  
          <div class="acao">
            <a href="https://guubernardi.github.io/ia-remove/" target="_blank">
              <button type="button">
                <img src="/images/play.svg" alt="Play video" />
                Veja no Ar
              </button>
            </a>
          </div>
        </div>
      </div>

      <div class="area-projeto js-projeto">
        <div class="imagem-desktop js-projeto-img">
          <img
            src="/images/primeflix.svg"
            alt="Imagem Projeto PrimeFlix"
            width="700"
            height="500"
          />
        </div>
  
        <div class="titulo-projeto js-projeto-txt">
          <h2>PrimeFlix</h2>
          <p class="descricao">
            Projeto usando ReactJS com foco em requisição HTTP Utilizando a API The Movie Database
          </p>
  
          <div class="tecnologias">
            <div class="tec">
              <img src="/images/react-amarelo.svg" alt="Ícone Reactjs" />
              <p>ReactJS</p>
            </div>
  
            <div class="tec">
              <img src="/images/localstorage.svg" alt="Icone LocalStorage" />
              <p>LocalStorage</p>
            </div>
          </div>
  
          <div class="acao">
            <a href="https://primeflix-wine.vercel.app/" target="_blank">
              <button type="button">
                <img src="/images/play.svg" alt="Play video" />
                Veja no ar
              </button>
            </a>
          </div>
        </div>
      </div>
  
      <div class="area-projeto js-projeto" id="citytoys">
        <div class="imagem-desktop js-projeto-img">
          <img
            src="/images/city-toys.svg"
            alt="Imagem Projeto City Toys"
            width="700"
            height="500"
          />
        </div>
  
        <div class="titulo-projeto js-projeto-txt" id="citytoys">
          <h2>City Toys</h2>
          <p class="descricao">Landing Page para City Toys</p>
  
          <div class="tecnologias">
            <div class="tec">
              <img src="/images/html-amarelo.svg" alt="Ícone HTML" />
              <p>HTML</p>
            </div>
  
            <div class="tec">
              <img src="/images/css-amarelo.svg" alt="Ícone CSS" />
              <p>CSS</p>
            </div>
  
            <div class="tec">
              <img src="/images/js-amarelo.svg" alt="Icone JavaScript" />
              <p>JavaScript</p>
            </div>
          </div>
  
          <div class="acao">
            <a href="#">
              <button type="button">
                <img src="/images/play.svg" alt="Play video" />
                Veja no ar
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  </template>
  
<style scoped lang="sass">
  .projetos
    background-color: #1C1F25
    font-family: var(--light)
    padding-bottom: 70px
    --proj-pad-x: 90px
  
  .divisor
    height: 20px
    width: 100%
    background: rgba(255, 177, 43, 0.22)
  
  .titulo
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    text-align: center
    width: 100%
    padding: 40px 80px
    gap: 20px
  
    h2
      font-family: var(--bold)
      font-size: var(--f10)
      line-height: 1
      width: 100%
      max-width: 650px
      background: linear-gradient(0deg, #fddf5a, var(--cor-branco))
      -webkit-background-clip: text
      -webkit-text-fill-color: transparent
      background-clip: text
      -webkit-text-stroke: 1px #FFB12B
      text-stroke: 1px #FFB12B
  
  .area-projeto
    display: flex
    justify-content: space-between
    align-items: flex-start
    padding: 0 var(--proj-pad-x)
    margin-top: 50px
    gap: 50px
    position: relative
    padding-bottom: 60px
    &::after
      content: ''
      position: absolute
      left: var(--proj-pad-x)
      right: var(--proj-pad-x)
      bottom: 0
      height: 1px
      background: rgba(255, 177, 43, 0.35)
  
    &:last-of-type::after
      display: none
  
  .imagem-desktop
    flex: 0 0 auto
    display: flex
    align-items: center
    justify-content: center
  
    img
      width: 700px
      max-width: 100%
      height: auto
      display: block
  
  .titulo-projeto
    width: 800px
    max-width: 100%
    padding: 20px
  
    h2
      font-family: var(--bold)
      font-size: var(--f10)
      line-height: 1
      width: 100%
      max-width: 650px
      background: linear-gradient(0deg, #fddf5a, var(--cor-branco))
      -webkit-background-clip: text
      -webkit-text-fill-color: transparent
      background-clip: text
      -webkit-text-stroke: 1px #FFB12B
      text-stroke: 1px #FFB12B
      display: flex
      justify-content: center
      margin-bottom: 14px
      margin-left: 60px
  
    .descricao
      font-family: var(--regular)
      font-size: var(--f2)
      padding: 10px
      line-height: 1.5
      color: #C2C7D2
      text-align: center
  
    .tecnologias
      margin-top: 30px
      display: flex
      flex-direction: row
      gap: 32px
      align-items: center
      justify-content: center
      flex-wrap: wrap
  
    .tec
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      gap: 8px
      min-width: 90px
  
      img
        width: 60px
        height: 60px
        object-fit: contain
  
      p
        margin: 0
        font-size: 15px
        opacity: 0.9
        color: white
  
    .acao
      display: flex
      justify-content: center
      align-items: center
      margin-top: 45px
  
      a
        text-decoration: none
  
      button
        display: flex
        align-items: center
        justify-content: center
        gap: 10px
        padding: 10px 50px 10px 10px
        border-radius: 50px
        background: linear-gradient(90deg, #3C3A37, #FFB12B)
        color: white
        transition: transform 0.2s ease
        position: relative
        border: none
        cursor: pointer
        box-shadow: 0 0 0 0 rgba(255, 177, 43, 0)
  
        img
          width: 22px
          height: 22px
  
        &:hover
          animation: pulsar 1.6s ease-out infinite
  
        &:active
          transform: scale(0.98)
  
        &:focus-visible
          outline: 2px solid rgba(255, 177, 43, 0.9)
          outline-offset: 3px
  
  @keyframes pulsar
    0%
      box-shadow: 0 0 0 0 rgba(255, 177, 43, 0.55)
    70%
      box-shadow: 0 0 0 18px rgba(255, 177, 43, 0)
    100%
      box-shadow: 0 0 0 0 rgba(255, 177, 43, 0)
  
  @media (max-width: 1200px)
    .projetos
      --proj-pad-x: 48px
  
    .area-projeto
      gap: 36px
  
    .imagem-desktop img
      width: 620px
  
  @media (max-width: 1000px)
    .projetos
      --proj-pad-x: 24px
  
    .titulo
      padding: 32px 24px
  
    .area-projeto
      flex-direction: column
      align-items: center
      justify-content: center
      margin-top: 0
      padding-top: 26px
      padding-left: var(--proj-pad-x)
      padding-right: var(--proj-pad-x)
      gap: 26px
      text-align: center
      padding-bottom: 34px
  
      &::after
        left: var(--proj-pad-x)
        right: var(--proj-pad-x)
  
      &:first-of-type
        margin-top: 26px
  
    .imagem-desktop
      width: 100%
  
      img
        width: 100%
        max-width: 680px
  
    .titulo-projeto
      width: 100%
      padding: 12px 0
  
      h2
        margin-left: 0
        max-width: 100%
        justify-content: center
  
      .descricao
        padding: 0 6px
  
  @media (max-width: 600px)
    .projetos
      --proj-pad-x: 16px
  
    .titulo h2
      font-size: 46px
  
    .area-projeto
      padding-top: 26px
      padding-left: var(--proj-pad-x)
      padding-right: var(--proj-pad-x)
  
    .tecnologias
      gap: 18px
  
    .tec
      min-width: 78px
  
      img
        width: 52px
        height: 52px
  
    .acao button
      width: 100%
      max-width: 360px
      justify-content: center
      padding: 12px 18px

#citytoys
  display: none
</style>
  