import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
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

export const AuthService = {
  insertIntoDB,
  signin,
};
