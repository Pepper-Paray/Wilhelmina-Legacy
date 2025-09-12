function showInput() {
  // Prevent the form from submitting and reloading the page
  event.preventDefault();

  var userInput = document.getElementById("userInput").value;

  var display = document.getElementById("display");

  var newMessage = document.createElement("p");
  newMessage.textContent = userInput; // Set the text content

  display.appendChild(newMessage);

  document.getElementById("theForm").reset();
}

document.getElementById("theForm").addEventListener("submit", showInput);
