import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      throw new Error("No token found");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secret is not set in the environment variables");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken._id) {
      throw new Error("Invalid token: Missing user ID");
    }

    return decodedToken._id;
  } catch (error) {
    console.error("Token Error:", error.message);
    throw new Error("Authentication failed");
  }
};
