// DOM ELEMENT SELECTIONS (using querySelector)

const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");
const clearAllBtn = document.querySelector("#clear-all-btn");

// STATE MANAGEMENT & LOCAL STORAGE

let notes = JSON.parse(localStorage.getItem("quicknotes_data")) || [];
let currentSearch = "";

function saveNotes() {
  localStorage.setItem("quicknotes_data", JSON.stringify(notes));
}

// COUNT MESSAGE UPDATER
function updateCount(count) {
  if (count === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (count === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }
}

// RENDER FUNCTION

function render() {
  // Clear the existing list safely

  notesList.textContent = "";
  const query = currentSearch.toLowerCase();
  const visibleNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(query)
  );

  updateCount(notes.length);

  if (visibleNotes.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.className = "empty-state";
    emptyLi.textContent =
      notes.length === 0
        ? "No notes added yet. Create one above!"
        : "No notes match your search.";
    notesList.appendChild(emptyLi);
    return;
  }

  // Build note cards
  visibleNotes.forEach((note) => {
    const li = document.createElement("li");
    li.className = `note-card category-${note.category.toLowerCase()}`;

    // Note content paragraph (XSS-safe)
    const p = document.createElement("p");
    p.className = "note-text";
    p.textContent = note.text;

    // Meta container (category, timestamp, delete button)
    const metaDiv = document.createElement("div");
    metaDiv.className = "note-meta";

    const infoDiv = document.createElement("div");
    infoDiv.className = "note-info";

    const categorySpan = document.createElement("span");
    categorySpan.className = "category-tag";
    categorySpan.textContent = note.category;

    const dateSpan = document.createElement("span");
    dateSpan.className = "note-date";
    dateSpan.textContent = note.createdAt;

    infoDiv.appendChild(categorySpan);
    infoDiv.appendChild(dateSpan);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    metaDiv.appendChild(infoDiv);
    metaDiv.appendChild(deleteBtn);

    li.appendChild(p);
    li.appendChild(metaDiv);

    notesList.appendChild(li);
  });
}

// ADD NOTE WITH VALIDATION

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  // Validation: empty 
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  // Validation: character limit
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  // Clear validation errors
  errorMessage.textContent = "";

  // Create note object
  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  notes.push(newNote);
  saveNotes();
  render();

  noteInput.value = "";
  noteInput.focus();
});

// DELETE NOTE

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// SEARCH FILTERING

searchInput.addEventListener("input", (event) => {
  currentSearch = event.target.value.trim();
  render();
});

clearAllBtn.addEventListener("click", () => {
  if (notes.length === 0) return;

  const confirmed = confirm("Delete all notes?");
  if (confirmed) {
    notes = [];
    saveNotes();
    render();
  }
});

render();