export type User = {
  isPro: boolean;
  name: string;
  avatarUrl: string;
};

export type UserFullData = User & {
  email: string;
  token: string;
}
