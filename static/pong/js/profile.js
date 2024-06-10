function setupProfile() {
  const nameInput = document.getElementById("display-name");
  nameInput.defaultValue = nameInput.placeholder;
  console.log("setup");

  window.addEventListener("submit", (event) => {
    console.log("submit");
    event.preventDefault();
  });
}
