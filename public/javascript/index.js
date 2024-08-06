const charactersAPI = new APIHandler("http://localhost:8000");

window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", function (event) {
      charactersAPI.getFullList().then((charactersList) => {
        console.log(charactersList);
        const charactersContainer = document.querySelector(
          ".characters-container"
        );
        charactersContainer.innerHTML = "";
        charactersList.data.forEach((character) => {
          charactersContainer.innerHTML += `
        <div class="character-info">
          <div class="name">Character Name: ${character.name}</div>
          <div class="occupation">Character Occupation: ${character.occupation}</div>
          <div class="cartoon">Is a Cartoon? ${character.cartoon}</div>
          <div class="weapon">Character Weapon: ${character.weapon}</div>
        </div>`;
        });
      });
    });

  document
    .getElementById("fetch-one")
    .addEventListener("click", function (event) {
      const characterId = document.getElementById("character-id").value;
      charactersAPI.getOneRegister(characterId).then((character) => {
        console.log(character);
        const charactersContainer = document.querySelector(
          ".characters-container"
        );
        charactersContainer.innerHTML = `
            <div class="character-info">
              <div class="name">Character Name: ${character.data.name}</div>
              <div class="occupation">Character Occupation: ${character.data.occupation}</div>
              <div class="cartoon">Is a Cartoon? ${character.data.cartoon}</div>
              <div class="weapon">Character Weapon: ${character.data.weapon}</div>
            </div>`;
      });
    });

  document
    .getElementById("btn-delete-data")
    .addEventListener("click", function (event) {
      const characterId = document.getElementById("character-id-delete").value;
      const deleteButton = document.getElementById("btn-delete-data");
      charactersAPI
        .deleteOneRegister(characterId)
        .then(() => {
          console.log("Character deleted");
          deleteButton.style.backgroundColor = "green";
        })
        .catch(() => {
          deleteButton.style.backgroundColor = "red";
        });
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const characterId = document.getElementById("edit-character-id").value;
      const characterInfo = {
        name: document.getElementById("edit-name").value,
        occupation: document.getElementById("edit-occupation").value,
        weapon: document.getElementById("edit-weapon").value,
        cartoon: document.getElementById("edit-cartoon").checked,
      };
      const editButton = document.getElementById("btn-update-data");
      charactersAPI
        .updateOneRegister(characterId, characterInfo)
        .then(() => {
          console.log("Character updated");
          editButton.style.backgroundColor = "green";
        })
        .catch(() => {
          editButton.style.backgroundColor = "red";
        });
    });

  document
    .getElementById("new-character-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const characterInfo = {
        name: document.getElementById("new-name").value,
        occupation: document.getElementById("new-occupation").value,
        weapon: document.getElementById("new-weapon").value,
        cartoon: document.getElementById("new-cartoon").checked,
      };
      const createButton = document.getElementById("btn-new-data");
      charactersAPI
        .createOneRegister(characterInfo)
        .then(() => {
          console.log("Character created");
          createButton.style.backgroundColor = "green";
        })
        .catch(() => {
          createButton.style.backgroundColor = "red";
        });
    });
});
