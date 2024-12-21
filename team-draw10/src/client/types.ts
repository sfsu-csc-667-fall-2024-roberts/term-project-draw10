export type Card = {
  id: number;
  value: number;
  color?: string;
  type?: string;
};

export type Player = {
  gravatar: string;
  hand: Card[];
  id: number;
  isCurrent: boolean;
  lastDrawTurn: number;
  pile_1: number[];
  pile_2: number[];
  pile_3: number[];
  pile_4: number[];
  play_pile_top: number;
  play_pile_top_id: number;
  play_pile_count: number;
  seat: number;
  username: string;
};

export type GameState = Readonly<{
  players: Omit<Player, "hand">[];
  player: Player;
}>;