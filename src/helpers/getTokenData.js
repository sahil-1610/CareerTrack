import jwt from 'jsonwebtoken';

export const getTokenData = async (request) => {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded._id;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};
