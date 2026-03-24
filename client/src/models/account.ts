export type LoginCreds = {
  email: string;
  password: string;
};

export type RegisterCreds = {
  email: string;
  password: string;
  displayName: string;
};

export type User = {
  displayName: string;
  id: string;
  email: string;
  imageUrl?: string;
  token: string;
};
