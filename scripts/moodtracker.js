// DOM Elements
const form = document.getElementById('mood-form');
const moodSelect = document.getElementById('mood');
const noteInput = document.getElementById('note');
const logsList = document.getElementById('logs-list');
const back = document.querySelector('.back');

let current = 0;
const mood = document.querySelector('.mood');
const moodName = document.querySelector('.mood-name');
const leftA = document.querySelector('.left');
const rightA = document.querySelector('.right');

const baseurl = ""; // Update this with your base URL if needed
const moodss = [
    {
        name: "Happy",
        image: "./imagen/happy.png"
    },
    {
        name: "Sad",
        image: "./imagen/sad.png"
    },
    {
        name: "Emo",
        image: "./imagen/emo.png"
    },
    {
        name: "Love",
        image: "./imagen/love.png"
    },
    {
        name: "Evil",
        image: "./imagen/evil.png"
    },
];

// Function to set the mood based on the current index
function setMood() {
    if (mood && moodName) {
        mood.setAttribute('src', baseurl + moodss[current].image);
        moodName.textContent = moodss[current].name;
    }
}

// Initial setting of the mood
setMood();

// Event listener for left arrow button
leftA.addEventListener('click', function () {
    if (current > 0) {
        current--;
        setMood();
    }
});

// Event listener for right arrow button
rightA.addEventListener('click', function () {
    if (current < moodss.length - 1) {
        current++;
        setMood();
    }
});

back.addEventListener('click', function() {
    window.location.href = 'index.html';
})


// Retrieve moods from localStorage or initialize empty array
const moods = JSON.parse(localStorage.getItem('moods')) || [];

// Function to save moods to localStorage
const saveMoods = () => {
    localStorage.setItem('moods', JSON.stringify(moods));
};

// Function to display moods
const displayMoods = () => {
    logsList.innerHTML = '';
    moods.forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${entry.mood}</strong> - ${entry.note}
            <span style="font-size: 0.8rem; color: gray;">${entry.date}</span>
            <button onclick="deleteMood(${index})">Delete</button>
        `;
        logsList.appendChild(li);
    });
};

// Function to delete a mood
const deleteMood = (index) => {
    moods.splice(index, 1);
    saveMoods();
    displayMoods();
};

// Event listener for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const mood = moodSelect.value;
    const note = noteInput.value.trim();

    if (note === '') {
        alert('Please add a note!');
        return;
    }

    const moodEntry = {
        mood,
        note,
        date: new Date().toLocaleString(),
    };

    moods.push(moodEntry);
    saveMoods();
    displayMoods();

    // Reset form
    form.reset();
});

// Initial display of moods
displayMoods();
