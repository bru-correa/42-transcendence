async function updateDisplayName(displayName, csrfToken) {
  const formData = new FormData();
  formData.append("name", displayName);
  const response = await fetch("user/update_name/", {
    method: "POST",
    headers: {
      "X-CSRFToken": csrfToken,
    },
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) {
    showErrorMessage(data.message);
  }
  console.log(data);
}

async function updateAvatar(avatar, csrfToken) {
  const formData = new FormData();
  formData.append("file", avatar);
  const response = await fetch("user/update_avatar/", {
    method: "POST",
    headers: {
      "X-CSRFToken": csrfToken,
    },
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) {
    showErrorMessage(data.message);
  }
}

function showErrorMessage(message) {
  const toast = document.getElementById("toast");
  const toastBody = document.getElementById("toast-body");
  toastBody.innerHTML = message;
  const toastInstance = bootstrap.Toast.getOrCreateInstance(toast);
  toastInstance.show();
}

function setupProfile() {
  window.addEventListener("submit", async (event) => {
    event.preventDefault();
    const csrfToken = document.querySelector(
      "[name=csrfmiddlewaretoken]",
    ).value;

    const displayName = document.getElementById("display-name").value;
    if (displayName) await updateDisplayName(displayName, csrfToken);

    const avatar = document.getElementById("avatar").files[0];
    if (avatar) await updateAvatar(avatar, csrfToken);

    // showSection("/");
  });
}
