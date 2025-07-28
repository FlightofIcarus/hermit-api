interface IPlayerData {
  name: string;
  nickname: string;
  email: string;
  password: string;
};

class InputedPlayerData implements InputedPlayerData {
  constructor(
    public name: string,
    public nickname: string,
    public email: string,
    public password: string
  ) {}
};

export { InputedPlayerData, IPlayerData };
