const forgotPasswordTemplate = ({ name, otp }) => {
  return `
  <div>
  <h1>Olá ${name}</h1>
  <p>Houve uma solicitação de redefinição de senha. Use esse código OTP para redefini-la</p>
 <div style="background:yellow; font-size:20px; padding:20px; text-align:center; font-weight:800;">
  ${otp}
 </div>
  <p>Este código é válido por 1 hora</p>
  <p>Se você não solicitou isso, ignore este email</p>
  </div>
  `;
};

export default forgotPasswordTemplate;
