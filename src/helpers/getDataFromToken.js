import jwt from 'jsonwebtoken';

export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        if (!token) {
            throw new Error('No token found');
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken._id;
    } catch (error) {
        console.error('Token Error:', error);
        throw new Error('Authentication failed');
    }
};
