export type SessionProps = {
  user: UserSessionProps;
};

type UserSessionProps = {
  id?: string | null;
  name: string;
  email: string;
  image: string;
};
