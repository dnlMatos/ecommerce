const forgotPasswordTemplate = ({ name, otp }) => {
  return `
    <div style="background:#fff;max-width:500px;margin:40px auto;padding:32px 24px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.08);font-family:Arial,Helvetica,sans-serif;">
      <p style="color:#222;font-size:16px;margin-bottom:12px;">Prezado(a), ${name}</p>
      <p style="color:#222;font-size:16px;margin-bottom:12px;">Houve uma solicitação de redefinição de senha. Use o seguinte código OTP para redefinir sua senha:</p>
      <div style="background:#ffe066;font-size:22px;padding:18px;text-align:center;font-weight:800;letter-spacing:2px;border-radius:6px;margin:18px 0;">
        ${otp}
      </div>
      <p style="color:#222;font-size:16px;margin-bottom:12px;">Este código é válido por 1 hora. Caso não tenha solicitado redefinição de senha, desconsidere este email.</p>
      <br/>
      <p style="color:#222;font-size:16px;margin-bottom:12px;">Equipe Clothing Store</p>
    </div>
  `;
};

export default forgotPasswordTemplate;
