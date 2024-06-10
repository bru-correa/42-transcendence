async function getSectionHTML(section) {
  const response = await fetch(section, {
    method: "GET",
    headers: {
      "X-Custom-Header": "self",
    },
  });
  return await response.text();
}

function setupSection(section) {
  if (section === "/game") {
    localStorage.setItem("gameMode", "local");
    startGame();
  } else if (section === "/tournament/game") {
    startGame();
  } else if (section === "/tournament") {
    loadTournament();
  } else if (section === "/tournament/create") {
    loadTournamentForm();
  } else if (section === "/tournament/winner") {
    setWinner();
  }
}

async function showSection(section) {
  const sectionHtml = await getSectionHTML(section);
  document.getElementById("app").innerHTML = sectionHtml;
  setupSection(section);
  window.history.pushState({}, "", section);
}

function activateSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.display = "flex";
}

function deactivateSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.display = "none";
}

window.addEventListener("popstate", async () => {
  const section = window.location.pathname;
  const sectionHtml = await getSectionHTML(section);
  document.getElementById("app").innerHTML = sectionHtml;
  setupSection(section);
});
