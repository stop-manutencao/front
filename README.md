# Stop da Cidadania
> Jogo com foco na educação de jovens e adultos sobre questões sociais e de cidadania


## Tecnologias Utilizadas
- VueJS
- Javascipt, HTML e CSS

## Pré-Requisitos
- NodeJs e NPM - [como instalar](https://www.npmjs.com/get-npm)


## Iniciando
- Clone o repositório:  
`git clone http://www.tools.ages.pucrs.br/StopCidadania/front.git`

- Entre no diretório:  
`cd front`

- Instale as dependências:  
`npm install`

- Iniciando o projeto para desenvolvimento:  
`npm start`

- Acesse no navegador:  
`http://localhost:8080`

> Os comandos acima iniciam apenas o *webapp*.  
> Para uma experiência completa inicie também a API, saiba mais [aqui](http://www.tools.ages.pucrs.br/StopCidadania/api).

## Estrutura

```
build/
dist/
config/
├─ index.js
├─ dev.env.js
├─ prod.env.js
├─ ...
src/
├─ assets/
├─ components/
│  ├─ HelloWorld.vue
│  ├─ ...
├─ pages/
│  ├─ Home.vue
│  ├─ ...
├─ router/
│  ├─ index.js
│  ├─ ...
├─ services/
│  ├─ http.js
│  ├─ ...
├─ App.vue
└─ main.js
```

## Comandos

``` bash
# instalar dependências
npm install

# server em localhost:8080
npm start

# build para produção
npm run build

# run simulate PWA in production
npm run pwa
```


## Saiba mais
- VueJS: [guia completo](https://br.vuejs.org/v2/guide/) e [boas práticas com o framework](https://br.vuejs.org/v2/style-guide/)

- Progressive Web Apps (PWA): [saiba mais](https://developers.google.com/web/progressive-web-apps/)

- Casos de uso com PWA: [artigo](https://medium.com/appscope/7-excellent-progressive-web-apps-that-prove-pwas-are-ready-for-mainstream-consumer-adoption-9a8a8e876eba)

- Loja de webapps: [appsco.pe](https://appsco.pe/)

- Saiba mais sobre cada arquivo da estrutura: [artigo](http://vuejs-brasil.com.br/crie-rapidamente-um-projeto-vue-com-vue-cli-e-browserify/)

- Stop da Cidadania API: [repositório](http://www.tools.ages.pucrs.br/StopCidadania/api)

- Sobre o projeto: [wiki](http://www.tools.ages.pucrs.br/StopCidadania/wiki)
