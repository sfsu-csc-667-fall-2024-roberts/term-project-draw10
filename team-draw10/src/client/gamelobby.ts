window.socket.on("game-starting", () => {
  const roomId = window.roomId;

  if (!roomId) {
    console.error("Room ID is not available. Unable to redirect.");
    return;
  }

  window.location.href = `/games/${roomId}`;
});


window.socket.on(
  "player-joined",
  ({ username, email, gravatar }: { username: string; email: string; gravatar: string }) => {
    if (!username || !email || !gravatar) {
      console.warn("Received incomplete player data:", { username, email, gravatar });
      return;
    }

    console.log("Player joined!", { username, email, gravatar });

   
    const playerList = document.querySelector<HTMLUListElement>("#player-list");
    if (playerList) {
      const playerElement = document.createElement("li");
      playerElement.classList.add("player-item");
      playerElement.innerHTML = `
        <img
          src="https://www.gravatar.com/avatar/${gravatar}"
          alt="${username}'s avatar"
          class="player-avatar"
        />
        <span class="player-username">${username}</span>
        <span class="player-email">${email}</span>
      `;
      playerList.appendChild(playerElement);
    } else {
      console.warn("Player list element not found. Unable to update the UI.");
    }
  },
);