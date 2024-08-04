document.getElementById('loginBtn').addEventListener('click', function () {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
});

document.getElementById('registerBtn').addEventListener('click', function () {
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
});

document.querySelectorAll('form button[type="submit"]').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();

        // Get the selected user type
        const userType = this.closest('form').querySelector('select').value;

        // Hide the login/register container
        document.querySelector('.container').style.display = 'none';

        // Show the appropriate home page based on user type
        if (userType === 'teacher') {
            document.querySelector('.teacher-home').style.display = 'flex';
        } else {
            document.querySelector('.student-home').style.display = 'flex';
        }
    });
});

// Handle logout for both teacher and student
document.querySelectorAll('.logoutBtn').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('.teacher-home').style.display = 'none';
        document.querySelector('.student-home').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
    });
});

// Show the script creation form when "Create a Script" is clicked
document.getElementById('createScriptLink').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('scriptCreationForm').style.display = 'block';
});

// Add a new character input set when the "Add Another Character" button is clicked
document.getElementById('addCharacterBtn').addEventListener('click', function () {
    const characterDiv = document.createElement('div');
    characterDiv.className = 'character';
    characterDiv.innerHTML = `
        <input type="text" name="characterName" placeholder="Character Name" required>
        <input type="number" name="characterAge" placeholder="Age" required>
        <button type="button" class="deleteCharacterBtn">✗</button>
    `;
    document.getElementById('charactersContainer').appendChild(characterDiv);

    // Add event listener for delete button
    characterDiv.querySelector('.deleteCharacterBtn').addEventListener('click', function () {
        this.parentElement.remove();
    });
});

// Initial delete button for the first character
document.querySelector('.deleteCharacterBtn').addEventListener('click', function () {
    this.parentElement.remove();
});

// Handle script form submission
document.getElementById('scriptForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const characters = [];
    for (let i = 0; i < formData.getAll('characterName').length; i++) {
        characters.push({
            name: formData.getAll('characterName')[i],
            age: formData.getAll('characterAge')[i]
        });
    }

    const scriptData = {
        characters,
        setting: formData.get('setting'),
        storyDetails: formData.get('storyDetails')
    };

    console.log('Script Data:', scriptData);

    // Call AI API or service to generate a child-friendly script
    generateChildFriendlyScript(scriptData);
});

// AI script generation function
function generateChildFriendlyScript(scriptData) {
    // This function would typically call an AI API to process the data
    // For now, we'll just simulate the AI processing with a console log

    console.log("Sending data to AI for script generation...", scriptData);

    // Simulate an AI response
    setTimeout(() => {
        const generatedScript = `Once upon a time in a ${scriptData.setting}, there were some characters...\n\n`;

        // Navigate to the script results page
        displayGeneratedScript(generatedScript);
    }, 2000);
}

// Display the generated script on a new page
function displayGeneratedScript(script) {
    // Hide the current page and show the results page
    document.querySelector('.teacher-home').style.display = 'none';
    document.getElementById('scriptCreationForm').style.display = 'none';
    document.getElementById('scriptResultsPage').style.display = 'block';

    // Populate the textarea with the generated script
    document.getElementById('generatedScript').value = script;
}

// Handle editing and approving the script
document.getElementById('editScriptBtn').addEventListener('click', function () {
    // Allow the user to edit the script in the textarea
    document.getElementById('generatedScript').removeAttribute('readonly');
});

document.getElementById('approveScriptBtn').addEventListener('click', function () {
    // Handle script approval logic here
    const approvedScript = document.getElementById('generatedScript').value;
    alert('Script approved:\n\n' + approvedScript);
});
