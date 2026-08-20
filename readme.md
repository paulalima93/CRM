\# 🏢 Projeto Pedagógico: Sistema CRM com Autenticação e Firestore



Este repositório contém um sistema completo de Gestão de Clientes (CRM) desenvolvido para ensinar a integração do Front-end clássico com um Backend as a Service (Firebase). O projeto aborda autenticação de usuários, operações de CRUD no banco de dados e consumo de APIs externas.



\## 🎯 Objetivos de Aprendizagem



Este projeto capacita o aluno a compreender a comunicação entre a interface do usuário e a nuvem, abordando:



\### 🧱 HTML5 (Arquitetura de Dados e Componentização)

\* \*\*Validação de Formulários:\*\* Uso prático de atributos como `required`, restrições de `minlength` para senhas e campos `readonly` bloqueados para edição manual.

\* \*\*Componentização de UI:\*\* Estruturação de contêineres vazios (`<div id="menu-container">`) projetados para receber injeção dinâmica de blocos de código via JavaScript, evitando repetição.



\### 🎨 CSS3 (Dashboards e Tratamento de Conteúdo)

\* \*\*Layout de Painel (Dashboard):\*\* Implementação de menu lateral estático utilizando `position: fixed` aliado ao ajuste de margens do `body` para garantir a fluidez do conteúdo adjacente.

\* \*\*Prevenção de Quebra de Layout:\*\* Uso de propriedades textuais avançadas (`white-space: nowrap`, `overflow: hidden` e `text-overflow: ellipsis`) para tratar e truncar textos longos retornados do banco de dados de forma previsível.



\### ⚙️ JavaScript (Backend as a Service, APIs e Regex)

\* \*\*Autenticação (Firebase Auth):\*\* Implementação completa de fluxos de segurança corporativa: registro de funcionários, login, logout e proteção de rotas (Auth Guards) verificando o status de sessão com `onAuthStateChanged`.

\* \*\*Manipulação de Banco de Dados (Firestore CRUD):\*\* Conexão com banco de dados NoSQL para Criar, Ler, Atualizar e Deletar documentos em tempo real.

\* \*\*Comunicação entre Páginas (URL Params):\*\* Extração de parâmetros da URL utilizando a interface `URLSearchParams` para alternar formulários entre modo de Inserção e modo de Edição.

\* \*\*Tratamento de Strings com Regex (Máscaras):\*\* Utilização de Expressões Regulares (`replace(/\\D/g, '')`) combinadas com métodos `.substring()` para formatar dados em tempo real, como máscaras de telefone comercial.

\* \*\*Integração de API Externa (ViaCEP):\*\* Acionamento de requisições Assíncronas (Fetch API) no evento `blur` (perda de foco do input) para preenchimento automatizado e inteligente de endereços.



\## 🚀 Tecnologias Utilizadas



\* \*\*HTML5\*\*

\* \*\*CSS3\*\*

\* \*\*JavaScript\*\* (ES6+)

\* \*\*Firebase Authentication\*\* (Gestão de Identidade)

\* \*\*Firebase Cloud Firestore\*\* (Banco de Dados NoSQL)

\* \*\*AwesomeAPI / ViaCEP\*\* (API REST para consulta de logradouros)



\## 📁 Estrutura do Projeto



```text

/

├── cadastro.html / cadastro.js

├── listagem.html / listagem.js

├── login.html / login.js

├── registro.html / registro.js

├── menu.js (Componente injetado)

├── firebase-config.js (Credenciais)

└── style.css

```



\## 💻 Como Executar e Estudar



1\. Clone este repositório para sua máquina local.

2\. Inicie acessando o arquivo `login.html` no navegador. Caso não possua conta, utilize a tela de `registro.html` para criar a primeira credencial administrativa.

3\. Acesse o sistema para adicionar, listar, editar e excluir clientes.

4\. \*\*Dica de Estudo (Tráfego de Rede):\*\* Na tela de cadastro de cliente, digite um CEP válido e aperte a tecla `TAB`. Abra a aba \*Network (Rede)\* do `F12` e observe o navegador realizando uma requisição silenciosa ao servidor do ViaCEP e trazendo o endereço formatado antes do salvamento no Firebase.

