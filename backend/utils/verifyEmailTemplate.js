const verifyEmailTemplate = ({ name, url }) => `
  <div style="background:#fff;max-width:500px;margin:40px auto;padding:32px 24px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.08);font-family:Arial,Helvetica,sans-serif;">
    <h1 style="color:#222;font-size:24px;margin-bottom:16px;">Olá ${name}</h1>
    <p style="color:#222;font-size:16px;margin-bottom:18px;">
      Bem-vindo ao nosso site! Para começar, por favor, verifique seu email clicando no botão abaixo:
    </p>
    <a href="${url}" style="display:inline-block;background:#ffe066;color:#222;text-decoration:none;font-weight:700;padding:14px 28px;border-radius:6px;font-size:18px;box-shadow:0 1px 4px rgba(0,0,0,0.06);margin-bottom:18px;">
      Verificar email
    </a>
    <p style="color:#888;font-size:14px;margin-top:24px;">
      Se você não criou uma conta, pode ignorar este email.
    </p>
    <p style="color:#222;font-size:16px;margin-top:32px;">Equipe Clothing Store</p>
  </div>
`;

export default verifyEmailTemplate;
