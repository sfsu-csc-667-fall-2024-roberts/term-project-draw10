import db from "../connection";
import {
  ADD_PLAYER,
  ALL_PLAYER_DATA,
  AVAILABLE_CARDS_FOR_GAME,
  AVAILABLE_GAMES,
  CREATE_GAME,
  DEAL_CARDS,
  GET_PLAYER_HAND,
  GET_PLAYER_COUNT,
  INSERT_INITIAL_CARDS,
  IS_CURRENT,
  SHUFFLE_DISCARD_PILE,
  UPDATE_DRAW_TURN,
  GET_LAST_DRAW_TURN,
  UPDATE_PLAYER_DRAW_TURN,
} from "./sql";

type GameDescription = {
  id: number;
  players: number;
  player_count: number;
};

const create = async (playerId: number): Promise<GameDescription> => {
  const { id } = await db.one<GameDescription>(CREATE_GAME);
  await db.any(INSERT_INITIAL_CARDS, id);
  return await join(id, playerId);
};

const join = async (gameId: number, playerId: number) => {
  const gameDescription = await db.one<GameDescription>(ADD_PLAYER, [gameId, playerId]);
  
  // Deal 7 cards to the player for their starting hand
  await db.any(DEAL_CARDS, [playerId, 0, gameId, 7]);
  
  return gameDescription;
};

const availableGames = async (limit: number = 20, offset: number = 0): Promise<GameDescription[]> => {
  return db.any(AVAILABLE_GAMES, [limit, offset]);
};

const getPlayerCount = async (gameId: number): Promise<number> => {
  const { count } = await db.one<{ count: string }>(GET_PLAYER_COUNT, gameId);
  return parseInt(count, 10);
};

const drawCard = async (gameId: number, userId: number) => {
  const availableCards = parseInt((await db.one<{ count: string }>(AVAILABLE_CARDS_FOR_GAME, gameId)).count);

  if (availableCards === 0) {
    await db.none(SHUFFLE_DISCARD_PILE, [gameId]);
  }

  const card = await db.one<{ card_id: string }>(DEAL_CARDS, [userId, 0, gameId, 1]);
  await db.none(UPDATE_DRAW_TURN, [gameId, userId]);

  return card;
};

const getTurn = async (gameId: number) => {
  return await db.one("SELECT turn FROM games WHERE id = $1", gameId);
};

const playCard = async (playerId: number, gameId: number, cardId: number, cardType: string, chosenColor: string | null = null) => {
  // Remove card from player's hand and add it to the discard pile
  const card = await db.one(
    "DELETE FROM game_cards WHERE player_id = $1 AND card_id = $2 AND game_id = $3 RETURNING *", 
    [playerId, cardId, gameId]
  );

  // Add card to the discard pile
  await db.none(
    "INSERT INTO game_cards (game_id, card_id, player_id, is_in_pile) VALUES ($1, $2, -1, true)", 
    [gameId, cardId]
  );

  // Handle special card effects
  switch (cardType) {
    case 'DRAW_2':
     
      await db.any(DEAL_CARDS, [playerId, 0, gameId, 2]); // Next player draws 2 cards
      await incrementTurn(gameId); // Skip their turn
      break;

    case 'SKIP':
      await incrementTurn(gameId); // Skip next player's turn
      break;

    case 'REVERSE':
      await db.none("UPDATE games SET direction = direction * -1 WHERE id = $1", gameId); // Reverse direction
      break;

    case 'WILD':
      await db.none(
        "UPDATE games SET current_color = $1 WHERE id = $2", 
        [chosenColor, gameId]
      );
      break;

    default:
      break;
  }

  await incrementTurn(gameId); // Move to the next turn
  return card;
};

  const incrementTurn = async (gameId: number) => {
    const { direction, player_count, current_seat } = await db.one(
      "SELECT direction, player_count, current_seat FROM games WHERE id = $1", 
      [gameId]
    );
  
    // Calculate the next seat using modulo to wrap around player count
    const nextSeat = (current_seat + direction + player_count) % player_count;
  
    await db.none(
      "UPDATE games SET current_seat = $1 WHERE id = $2", 
      [nextSeat, gameId]
    );
  };
const playerGames = async (playerId: number): Promise<Record<number, boolean>> => {
  return (
    await db.any("SELECT game_id FROM game_users WHERE user_id=$1", playerId)
  ).reduce((memo, game) => ({ ...memo, [game.game_id]: true }), {});
};

const get = async (gameId: number, playerId: number) => {
  const currentSeat = await db.one("SELECT current_seat FROM games WHERE id=$1", gameId);
  const players = await getPlayers(gameId);
  const playerHand = await getPlayerHand(gameId, playerId);

  return {
    currentSeat,
    players,
    playerHand,
  };
};

const isCurrentPlayer = async (gameId: number, userId: number): Promise<{ is_current_player: boolean }> => {
  return await db.one(IS_CURRENT, [gameId, userId]);
};

const getPlayers = async (gameId: number) => {
  return await db.any(ALL_PLAYER_DATA, [gameId]);
};

const getPlayerHand = async (gameId: number, playerId: number) => {
  return await db.any(GET_PLAYER_HAND, [playerId, gameId, 0]);
};

const getLastDrawTurn = async (gameId: number, userId: number): Promise<{ last_draw_turn: number }> => {
  return await db.one(GET_LAST_DRAW_TURN, [gameId, userId]);
};

const updatePlayerDrawTurn = async (gameId: number, userId: number) => {
  return db.none(UPDATE_PLAYER_DRAW_TURN, [gameId, userId]);
};


const checkForUno = async (gameId: number, playerId: number) => {
  const handSize = await db.one(
    "SELECT COUNT(*) as count FROM game_cards WHERE player_id = $1 AND game_id = $2", 
    [playerId, gameId]
  );

  if (handSize.count == 1) {
    // Player must call UNO
    console.log(`Player ${playerId} must call UNO!`);
  }
};

const checkWinner = async (gameId: number, playerId: number) => {
  const handSize = await db.one(
    "SELECT COUNT(*) as count FROM game_cards WHERE player_id = $1 AND game_id = $2", 
    [playerId, gameId]
  );

  if (handSize.count == 0) {
    console.log(`Player ${playerId} is the winner!`);
    await db.none("UPDATE games SET status = 'completed', winner_id = $1 WHERE id = $2", [playerId, gameId]);
  }
};

export default {
  create,
  join,
  availableGames,
  getPlayerCount,
  drawCard,
  playCard,
  playerGames,
  get,
  isCurrentPlayer,
  incrementTurn,
  getTurn,
  getPlayers,
  getPlayerHand,
  getLastDrawTurn,
  updatePlayerDrawTurn,
};