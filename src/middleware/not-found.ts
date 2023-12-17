import { RequestHandler } from "express";

const notFound: RequestHandler = (req, res, next) => {
  //Request failed because of incorrect endpoint. Return response with:
  res.status(404).json({ message: "Not Found" });
};
export { notFound };
