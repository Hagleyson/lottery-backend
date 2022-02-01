# TGL API

Passos para inicialização do projeto: 

1. git clone https://github.com/lubysoftware/LAB_TGL_API (**Execute em seu terminal**)
2. `yarn` ou `npm install` (**Execute em seu terminal, na raiz do seu projeto**)
3. Criar e configurar arquivo .env de acordo com o arquivo .env.example
4. Executar msql e criar um banco de dados chamado **default (Exemplo de ferrameta => https://laragon.org/download/)**
5. `node ace migration:run` (**Execute em seu terminal**) **Esse comando cria as tabelas em seu banco de dados**
7. `node ace db:seed` (**Execute em seu terminal**) **Esse comando preenche seu banco de dados com valores inciais**
8. `node ace serve --watch` (**Execute em seu terminal**) **Esse comando inicia o servidor e observa as alterações**
9. Baixe e instale o insomnia em sua máquina https://insomnia.rest/download
10. Os endpoints estarão na raiz desse projeto, você deve importá-lo no seu insomnia. O nome do arquivo é **TGL_ENDPOINTS.json**

**ATENÇÃO:** FIQUEM ATENTOS A ABA **_QUERY_ **NO ENPOIT DE **LISTAGEM DE APOSTAS.** ELA CONTÉM A FORMA DE FAZER AS FILTRAGENS
# lottery-backend
