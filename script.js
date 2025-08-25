const noteInput = document.getElementById('noteTitle');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesList = document.getElementById('notesList');

document.addEventListener('DOMContentLoaded', loadNotes);

addNoteBtn.addEventListener('click', () => {
    const title = noteInput.value.trim();
    if (title === '') {
        alert("Digite um título para a nota.");
        return;
    }

    const notes = getNotes();

    if (notes.some(note => note.title === title)) {
        alert("Este título já foi usado. Use um título único.");
        return;
    }

    notes.push({ title });
    saveNotes(notes);
    noteInput.value = '';
    renderNotes(notes);
});

function getNotes() {
    const storedNotes = localStorage.getItem('notas');
    return storedNotes ? JSON.parse(storedNotes) : [];
}

function saveNotes(notes) {
    localStorage.setItem('notas', JSON.stringify(notes));
}


function renderNotes(notes) {
    notesList.innerHTML = '';
    notes.forEach(note => {
        const li = document.createElement('li');
        li.textContent = note.title;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remover';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', () => {
            removeNote(note.title);
        });

        li.appendChild(removeBtn);
        notesList.appendChild(li);
    });
}

function removeNote(title) {
    let notes = getNotes();
    notes = notes.filter(note => note.title !== title);
    saveNotes(notes);
    renderNotes(notes);
}

function loadNotes() {
    const notes = getNotes();
    renderNotes(notes);
}
