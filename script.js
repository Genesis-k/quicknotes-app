// DOM ELEMENT SELECTIONS (using querySelector)

const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");
const clearAllBtn = document.querySelector("#clear-all-btn");

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