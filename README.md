# 🛠️ Projeto AgroFlow Backend

Este é um projeto **backend** construído com **Node.js**, utilizando **Firebase Admin SDK** para autenticação e banco de dados, com suporte a envio de e-mails e **notificações em tempo real via WebSocket (Socket.IO)**.

---

## ✨ Funcionalidades

- ✅ Autenticação de usuários via Firebase (e-mail/senha)
- ✅ Envio de e-mails (ex: redefinição de senha, boas-vindas)
- ✅ Gerenciamento de dados via Firestore
- ✅ Envio de notificações em tempo real com **Socket.IO**
- ✅ Variáveis de ambiente configuráveis via `.env`

---

## 📦 Tecnologias e Bibliotecas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin)
- [Zod](https://zod.dev/) (validação de dados)
- [Nodemailer](https://nodemailer.com/) (envio de e-mails)
- [Socket.IO](https://socket.io/) (WebSocket)
- [Dotenv](https://github.com/motdotla/dotenv) (configuração via `.env`)

---

## 🔐 Firebase - Criação do projeto

Siga os passos abaixo para configurar o seu projeto Firebase, necessários para conectar um app com o Firebase SDK (Authentication, Firestore, etc.).

---

### 📌 Passo 1 – Acesse o Console do Firebase

Acesse: [https://console.firebase.google.com](https://console.firebase.google.com)  
Faça login com sua conta Google.

---

### 📌 Passo 2 – Crie um projeto

---

### 📌 Passo 3 – Adicione um app Web

1. No dashboard do projeto, clique no ícone **`</>`** (</> Web) para **adicionar um app Web**.
2. Dê um nome para o app (ex: `meu-app-web`).
3. Marque ou não a opção de usar Firebase Hosting (conforme desejar) e clique em **"Registrar app"**.

---

### 📌 Passo 4 – Copie a configuração

Após registrar o app, o Firebase mostrará um código semelhante ao a seguir.
Esta configuração é necessária para os projetos de Frontend Mobile e Web.

```js
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefghij123456",
};
```

---

### 📌 Passo 5 – Conta de Serviço

Para o backend será utilizado o Firebase Admin, para isto você precisa criar e incluir o arquivo `firebase-service-account.json`:

1. Acesse [console.firebase.google.com](https://console.firebase.google.com/)
2. Vá até `Configurações do Projeto > Contas de Serviço`
3. Clique em **Gerar nova chave privada**
4. Salve o arquivo como `firebase-service-account.json` na raiz do projeto (ou em outro caminho configurável)
5. Informe o caminho do arquivo em **.env** na chave **FIREBASE_SERVICE_ACCOUNT_KEY_PATH**

⚠️ **Nunca envie este arquivo ao Git!**  
Adicione ao `.gitignore`:

```gitignore
firebase-service-account.json
```

---

## ⚙️ Variáveis de ambiente (.env)

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
# Firebase
FIREBASE_SERVICE_ACCOUNT_KEY_PATH=./firebase-service-account.json
FIREBASE_API_KEY=sua-chave

# Email
EMAIL_USER=seu-email@exemplo.com
EMAIL_PASSWORD=sua-senha

# App
PORT=3000

```

---

## 🚀 Executando o Projeto

# Instale as dependências

```bash
npm install
```

# Rode o servidor

```bash
npm run dev
```

O servidor será iniciado em http://localhost:3000.

---

## 🔐 Autenticação

A autenticação é feita via Firebase Authentication com e-mail e senha.

O frontend deve enviar o token JWT no cabeçalho das requisições ou via cookie:

Authorization: Bearer

---

## 📧 Envio de E-mails

O serviço de e-mails utiliza Nodemailer, com os dados definidos no arquivo .env.

Exemplos de uso:
Definição de senha ao criar usuário;
Redefinição de senha;

---

## 🔔 Notificações em Tempo Real (Socket.IO)

O backend possui suporte a WebSocket via Socket.IO, permitindo envio de notificações em tempo real para os usuários conectados.

---

## ✅ Requisitos

- Node.js 20+;
- Conta no Firebase com Firestore e Authentication ativados;
- SMTP válido para envio de e-mails;

---

## 📄 Licença

Este projeto está licenciado sob a MIT License.

---

## 👨‍💻 Autor

Desenvolvido por Lucas R. Janzen e Johann Marzolla.
