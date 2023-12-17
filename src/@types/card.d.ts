//TODO : create type for card
import { IAddress, IImage } from "./user";

type ICard = {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web?: string;
  image?: IImage;
  address: IAddress;
};

export { ICard };
