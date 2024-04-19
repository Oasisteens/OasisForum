import i18n from "i18next";

async function initI18n() {
  await i18n.init({
    resources: require("../json/locales.json"),
    fallbackLng: "en",
  });
}

async function resetEmail({ resetLink, lang, username }) {
  await initI18n();
  const t = i18n.getFixedT(lang);
  return `<html>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Email</title>
    <style>
      a.btn:hover {
        background-color: #0352a6;
        transition: 0.4s;
      }
      a.btn {
        background-color: #007bff;
        transition: 0.4s;
        border-radius: 20px;
        display: inline-block;
        color: #ffffff;
        text-decoration: none;
        font-size: 16px;
        padding: 10px 20px;
        margin-bottom: 20px;
      }
    </style>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
    "
  >
    <table
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="600"
      style="border-collapse: collapse"
    >
      <tr>
        <td align="center" bgcolor="#ffffff" style="padding: 40px 0 30px 0">
          <img
            src="https://finanalize.ltd/public/favicon.png"
            alt="Logo"
            width="150"
            style="display: block"
          />
          <hr style="border-color: #cccccc; margin: 20px 0" />
          <h1 style="font-size: 20px; color: #333333">
            ${t("Dear user ")}${username}${t(",")}
          </h1>
          <p style="font-size: 16px; color: #333333; text-align: left">${t("Hello! You are receiving this email because we got your password reset request. Click the button below to reset your password:")}
          </p>
          <a class="btn" href="${resetLink}">${t("Reset Password")}</a>
          <p style="font-size: 14px; color: #333333">${t("If you did not request a password reset, please ignore this email.")}
          </p>
        </td>
      </tr>
      <tr>
        <td align="center" bgcolor="#f4f4f4" style="padding: 10px 0">
          <p style="font-size: 12px; color: #333333">
            ${t("This email is automatically sent by the system, please do not reply. If you have any questions, please send email to help@oasisforum.cn to contact us.")}
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export default resetEmail;
