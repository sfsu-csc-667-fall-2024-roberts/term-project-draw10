
const createGame = async () => {
    try {
      const response = await fetch("/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await response.json();
      if (data.success) {
        alert("Game created successfully!");
        window.location.href = `/game/${data.gameId}`;
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error creating game:", error);
      alert("An unexpected error occurred.");
    }
  };