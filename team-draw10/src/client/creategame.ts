window.socket.on("game-created", (game) => {
  const gamesList = document.querySelector<HTMLUListElement>("#games-list");
  if (!gamesList) return;

  const gameItem = document.createElement("li");
  gameItem.textContent = `Game ID: ${game.id}, Players: ${game.players}/${game.player_count}`;
  const joinButton = document.createElement("button");
  joinButton.textContent = "Join Game";
  joinButton.onclick = () => (window.location.href = `/game/${game.id}`);
  gameItem.appendChild(joinButton);
  gamesList.appendChild(gameItem);})
