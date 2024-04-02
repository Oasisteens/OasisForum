import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { to, subject, text } = await req.json();
  try {
    // 创建一个使用SMTP的邮件传输器
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 设置邮件内容
    let mailOptions = {
      from: process.env.MAIL_USER, // 发件人地址
      to: to, // 收件人列表
      subject: subject, // 主题
      text: text, // 纯文本内容
      // html: '<b>Hello world?</b>' // HTML内容，如果需要的话
    };

    // 发送邮件
    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    return NextResponse.json(
      { message: "Email sent successfully." },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
