"use server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import DBconnect from "../../../libs/mongodb";
import Token from "../../../models/token";
import { NextResponse } from "next/server";
import resetEmail from "../../../components/js/resetEmail";

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
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

export async function POST(req) {
  await DBconnect();
  const { to, lang, username } = await req.json();

  // Generate a random hash
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Create a password reset link
  const resetLink = `${process.env.NEXTAUTH_URL}/resetpasswordoasis/${resetToken}`;

  const emailProps = {
    resetLink: resetLink,
    lang: lang,
    username: username,
  };

  const emailHtml = await resetEmail(emailProps);

  try {
    // Send email using Nodemailer
    await transporter.sendMail({
      from: process.env.MAIL_USER, // Sender address
      to: to, // List of recipients
      subject: "Password Reset", // Subject
      html: emailHtml, // HTML body
    });

    await Token.create({ username: username, resetToken: resetToken });

    return NextResponse.json(
      { message: "Email sent successfully.", lang: lang },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: err.message, lang: lang },
      { status: 500 },
    );
  }
}
