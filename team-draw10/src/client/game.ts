const createGame = async () => {
  const gameNameInput = document.querySelector<HTMLInputElement>("#game-name");
  const gamePasswordInput = document.querySelector<HTMLInputElement>("#game-password");
  const maxPlayersInput = document.querySelector<HTMLSelectElement>("#max-players");

  if (!gameNameInput || !maxPlayersInput) {
    console.error("Game form elements not found.");
    return;
  }

  const name = gameNameInput.value.trim();
  const password = gamePasswordInput?.value.trim();
  const maxPlayers = parseInt(maxPlayersInput.value, 10);

  if (!name || !maxPlayers) {
    alert("Game name and maximum players are required.");
    return;
  }

  try {
    const response = await fetch("/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password, maxPlayers }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      alert("Game created successfully!");
      window.location.href = `/game/${data.gameId}`;
    } else {
      console.error("Error creating game:", data.error);
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error("Error creating game:", error);
    alert("An unexpected error occurred while creating the game.");
  }
};


const joinGame = async (gameId: number) => {
  try {
    const response = await fetch(`/join/${gameId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("Successfully joined the game!");
      window.location.href = `/game/${gameId}`;
    } else {
      const data = await response.json();
      console.error("Error joining game:", data.error);
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error("Error joining game:", error);
    alert("An unexpected error occurred while joining the game.");
  }
};

window.socket.on("game-created", (game) => {
  const gamesList = document.querySelector<HTMLUListElement>("#games-list");
  if (!gamesList) return;

  const gameItem = document.createElement("li");
  gameItem.textContent = `Game ID: ${game.id}, Players: ${game.players}/${game.player_count}`;
  const joinButton = document.createElement("button");
  joinButton.textContent = "Join Game";
  joinButton.onclick = () => joinGame(game.id);
  gameItem.appendChild(joinButton);
  gamesList.appendChild(gameItem);
});

window.socket.on("player-joined", ({ playerId, gameId }) => {
  console.log(`Player ${playerId} joined game ${gameId}.`);
});

window.socket.on("player-draw", ({ playerId, gameId }) => {
  console.log(`Player ${playerId} drew a card in game ${gameId}.`);
});


document.querySelector("#create-game-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  createGame();
});