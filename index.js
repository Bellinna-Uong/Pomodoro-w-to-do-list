// POMODORO //

// Variables globales
let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');
let workTime = 40;
let breakTime = 5;
let interval;
let minute = workTime;
let seconde = 0
let isBreak = false;

// Affichage initial avec un affichage de la période de travail
window.onload = () => {
    document.getElementById('minute').innerHTML = workTime;
    document.getElementById('seconde').innerHTML = "00";
    workTittle.classList.add('active-work');
}

// Fonction de démarrage du minuteur
function start() {
    // On cache le bouton start et montre le bouton pause
    document.getElementById('start').style.display = "none";
    document.getElementById('pause').style.display = "block";

    // Si l'intervalle existe déjà, ne pas le redémarrer
    if (interval) return;

    function updateTimer() {
        // Mise à jour de l'affichage du minuteur
        document.getElementById('minute').innerHTML = minute;
        document.getElementById('seconde').innerHTML = seconde < 10 ? "0" + seconde : seconde;

        // Baisse des secondes
        seconde--;

        if (seconde < 0) {
            seconde = 59;
            minute--;
            if (minute < 0) {
                if (isBreak) {
                  // Temps de pause terminé, arrêter le minuteur
                  clearInterval(interval);
                  interval = null;
                  // Réinitialiser l'affichage
                  resetTimer();
                  return;
                } else {
                    // Début de la pause
                    minute = breakTime;
                    seconde = 0;
                    workTittle.classList.remove('active-work');
                    breakTittle.classList.add('active-break');
                }
                isBreak = !isBreak;
            }
        }
    }

    interval = setInterval(updateTimer, 1000);
}

// Fonction de pause du minuteur
function pause() {
    // Cache le bouton pause et montre le bouton start
    document.getElementById('pause').style.display = "none";
    document.getElementById('start').style.display = "block";

    // Arrête l'intervalle du minuteur
    clearInterval(interval);
    interval = null; // Réinitialiser l'intervalle
}

// Fonction de réinitialisation du minuteur
function resetTimer() {
    // Arrête l'intervalle en cours s'il existe
    if (interval) {
        clearInterval(interval);
        interval = null; // Réinitialiser l'intervalle
    }

    // Réinitialise les variables du minuteur
    minute = workTime;
    seconde = 0;
    isBreak = false;

    // Met à jour l'affichage du minuteur
    document.getElementById('minute').innerHTML = minute;
    document.getElementById('seconde').innerHTML = "00";

    // Affiche le bouton start et cache le bouton pause
    document.getElementById('start').style.display = "block";
    document.getElementById('pause').style.display = "none";

    // Réinitialise les titres
    workTittle.classList.add('active-work');
    workTittle.classList.remove('active-break');
    breakTittle.classList.remove('active-break');
}

// Ajouter des écouteurs d'événements pour les boutons
document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', resetTimer);

// TO DO LIST //
const input=document.querySelector(".todo-input");
const addButton=document.querySelector(".add-button");
const todosHtml=document.querySelector(".todos");
const dogimage=document.querySelector(".dog-image");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let filter = '';


showTodos();

function getTodoHtml(todo, index) {
    if (filter && filter !== todo.status) {
      return '';
    }
    let checked = todo.status == "completed" ? "checked" : "";
    return /* html */ `
      <li class="todo">
        <label for="${index}">
          <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
          <span class="${checked}">${todo.name}</span>
        </label>
        <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
      </li>
    `; 
  }

function showTodos () {
    if (todosJson.length == 0) { //Si aucune tâche n'existe
        todosHtml.innerHTML = ''; //affiche une image pour montrer que la liste est vide
        dogimage.style.display ='block';
    } else {
        todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
        dogimage.style.display ='none'; //sinon affiche ces tâches à la place de l'image.
    }
}

function addTodo(todo) {
    if (!todo) return;
    input.value = "";
    todosJson.unshift ({name: todo, status : "pending"}); // Ajoute la nouvelle tâche
    localStorage.setItem("todos", JSON.stringify(todosJson)); // Sauvegarde dans localStorage
    showTodos(); // Met à jour l'affichage des tâches
}

input.addEventListener ("keyup", e => {
    let todo = input.value.trim (); // Récupère le texte saisi
    if (!todo || e.key !== "Enter") { // Si le champ est vide ou si "Enter" n'est pas pressé, ne fait rien
        return;
    }
    addTodo(todo); // Ajoute la tâche
});

addButton.addEventListener("click",() => {
    let todo = input.value.trim();
    if (!todo) {
        return;
    }
    addTodo(todo);
});

addButton.addEventListener ("click", () => {
    let todo = input.value.trim ();
    if (!todo) {
        return;
    }
    addTodo(todo);
})

function updateStatus(todo) {
    let todoName = todo.parentElement.lastElementChild;
    if (todo.checked) {
        todoName.classList.add("checked");
        todosJson[todo.id].status = "completed"
    } else {
        todoName.classList.remove("checked");
        todosJson[todo.id].status = "pending";
    }
    localStorage.setItem ("todos", JSON.stringify(todosJson));
}

function remove(todo) {
    const index = todo.dataset.index;
    todosJson.splice(index, 1);
    showTodos();
    localStorage.setItem("todos", JSON.stringify(todosJson));
}

filters.forEach(function (el) {
    el.addEventListener("click", (e) => {
        if (el.classList.contains('active')) {
            el.classList.remove('active');
            filter = '';
        } else {
            filters.forEach(tag => tag.classList.remove ('active'));
            el.classList.add('active');
            filter = e.target.dataset.filter;
        }
        showTodos();
    });
});

deleteAllButton.addEventListener("click", () => {
    todosJson = [];
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
  });

// CHANGEMENT THEME
const themetogglecheckbox = document.querySelector (".theme-toggler-checkbox");
const all = document.querySelector(".all");
const body = document.querySelector("body");

let isDay = true ; //jour par défaut

themetogglecheckbox.addEventListener("change", () => {
    body.classList.toggle("nuit");
});

themetogglecheckbox.addEventListener("change", () => {
    if(isDay) {
        all.classList.remove("jour");
        all.classList.add("nuit");
        body.classList.remove("jour");
        body.classList.add("nuit");
    } else {
        all.classList.add("jour");
        all.classList.remove("nuit");
        body.classList.add("jour");
        body.classList.remove("nuit");
    }
    isDay =!isDay;
});