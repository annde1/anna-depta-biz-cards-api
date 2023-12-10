import { RequestHandler } from "express";

const notFound: RequestHandler = (req, res, next) => {
  //Request failed and this is the response:
  res.status(404).json({ message: "Not Found" });
};
export { notFound };
