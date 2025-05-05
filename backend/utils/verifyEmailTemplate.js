const verifyEmailTemplate = ({ name, url }) => {
  return `
    <h1>Olá ${name}</h1>
    <p>Bem-vindo ao nosso site! Para começar, por favor, verifique seu email clicando no link abaixo:</p>
    <a href="${url}">Verificar email</a>
    `;
};

export default verifyEmailTemplate;
