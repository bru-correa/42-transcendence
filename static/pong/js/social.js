// Run on page load
function setupSocial() {
  console.log("setup social");
}

function removeFriend(displayName) {
  const friendRow = document.getElementById(displayName);
  // Fetch remove friend
  friendRow.remove();
}

function acceptInvite(displayName) {}
