import jwt from "jsonwebtoken";

/**
 * @description Generate a new token for the user
 */
const generateToken = (id: unknown) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

export default generateToken;
