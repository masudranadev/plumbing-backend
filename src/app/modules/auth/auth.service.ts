import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import nodemailer from 'nodemailer';
// import smtpTransport from "nodemailer-smtp-transport";
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { prisma } from '../../../shared/prisma';
import { ISigninData, ISigninResponse } from './auth.interface';

const insertIntoDB = async (data: User): Promise<User> => {
  const hashPassword = await bcrypt.hash(data.password, 12);
  data.password = hashPassword;
  const result = await prisma.user.create({ data });
  return result;
};

const signin = async (payload: ISigninData): Promise<ISigninResponse> => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "user can't find!");
  }

  if (
    isUserExist.password &&
    !(await bcrypt.compare(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "password doesn't match");
  }

  const { id: userId, email: userEmail, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

const resetPassword = async (
  payload: ISigninData
): Promise<{ message: string }> => {
  const { email } = payload;

  const isUserExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email is Incorrect');
  }

  const { email: userEmail, role, id } = isUserExist;
  const token = jwtHelpers.createToken(
    { userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.reset_expires_in as string
  );
  const link = `https://plumbing-livid.vercel.app/${id}/${token}`;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.user_name,
      pass: config.api_key,
    },
  });

  transporter.sendMail({
    from: config.sending_email,
    to: email,
    subject: 'Forgot password!',
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Password Reset</title>
      </head>
      <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>Hello ${isUserExist.fullName},</p>
          <p>We received a request to reset your password for your 'plumbing' account. If you didn't make this request, you can safely ignore this email.</p>
          <p>To reset your password, please click the following link:</p>
          <a href="${link}" style="background-color: #007BFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
          <p>If the link doesn't work, you can also copy and paste the following URL into your browser's address bar:</p>
          <p><a href="${link}">${link}</a></p>
          <p>This password reset link will expire in {only 5 minute}.</p>
          <p>If you have any issues, please contact our support team at {example@gmail.com}.</p>
          <p>Thank you,</p>
          <p>The {plumbing} Team</p>
        </div>
      </body>
    </html>
    `,
  });

  return {
    message: 'Please check your email!',
  };
};

export const AuthService = {
  signin,
  insertIntoDB,
  resetPassword,
};
