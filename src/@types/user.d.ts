type IName = {
  first: string;
  middle?: string;
  last: string;
};
type IImage = {
  alt: string;
  url: string;
};
type IAddress = {
  street: string;
  city: string;
  state?: string;
  zip?: string;
  country: string;
  houseNumber: number;
};

type IUser = {
  name: IName;
  address: IAddress;
  image?: IImage;
  email: string;
  phone: string;
  password: string;
  isBusiness: boolean;
  isAdmin?: boolean;
  createdAt?: Date;
};

type ILogin = {
  email: string;
  password: string;
};

type IJWTPayload = {
  email: string;
};
// etc...
export { IUser, IName, IAddress, IImage, ILogin, IJWTPayload };
