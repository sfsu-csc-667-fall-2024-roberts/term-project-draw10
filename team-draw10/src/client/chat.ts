document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector<HTMLFormElement>("#chat-form");
  const input = document.querySelector<HTMLInputElement>("#chat-input");
  const messageArea = document.querySelector<HTMLDivElement>("#chat-messages");

  if (!form || !input || !messageArea) {
    console.error("Chat form elements not found.");
    return;
  }

  // Handle form submission to send messages
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = input.value.trim();
    input.value = "";

    if (!message) {
      console.error("Message cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`/chat/${window.roomId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Error sending message:", error.error || "Unknown error");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  });

  // Listen for incoming chat messages via WebSocket
  window.socket.on(
    `message:${window.roomId}`,
    ({
      message,
      sender,
      gravatar,
      timestamp,
    }: {
      message: string;
      sender: string;
      gravatar: string;
      timestamp: string;
    }) => {
      const messageElement = document.createElement("div");
      messageElement.classList.add("chat-message");
      messageElement.innerHTML = `
        <img src="https://www.gravatar.com/avatar/${gravatar}" alt="${sender}" class="chat-avatar" />
        <div class="chat-content">
          <strong>${sender}</strong>
          <p>${message}</p>
          <span class="chat-timestamp">${new Date(timestamp).toLocaleTimeString()}</span>
        </div>
      `;

      messageArea.appendChild(messageElement);
      messageArea.scrollTo(0, messageArea.scrollHeight); // Scroll to the bottom
    },
  );
});