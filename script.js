let storedDetails = [];
// Fixed admin credentials
const adminCredentials = { email: "koushi35@gmail.com", password: "kou123" };

// Initial view is the application name section
document.getElementById("application-name-section").style.display = "block";
document.getElementById("login-section").style.display = "none";
document.getElementById("sign-up-section").style.display = "none";
document.getElementById("forgot-password-section").style.display = "none";

// Function to show the login form
function showLogin() {
    document.getElementById("application-name-section").style.display = "none";
    document.getElementById("login-section").style.display = "flex";
    document.getElementById("sign-up-section").style.display = "none";
    document.getElementById("forgot-password-section").style.display = "none";
}

// Function to show the sign-up form
function showSignUp() {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("sign-up-section").style.display = "block";
}

// Function to show forgot password form
function showForgotPassword() {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("forgot-password-section").style.display = "block";
}

// Function to go back to the login screen from sign-up
function backToLogin() {
    document.getElementById("sign-up-section").style.display = "none";
    document.getElementById("login-section").style.display = "flex";
}

// Admin login
document.getElementById("admin-login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("admin-email").value;
    const password = document.getElementById("admin-password").value;

    if (email === adminCredentials.email && password === adminCredentials.password) {
        sessionStorage.setItem("role", "admin");
        alert("Admin Login Successful!");
        window.location.href = "admin.html";
    } else {
        alert("Invalid Admin Credentials. Please try again.");
    }
});

// User sign-up
document.getElementById("sign-up-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        alert("Email already registered. Please login.");
    } else {
        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("User registered successfully!");
        showLogin();
    }
});

// User login
document.getElementById("user-login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        sessionStorage.setItem("role", "user");
        alert("User Login Successful!");
        window.location.href = "user.html";
    } else {
        alert("Invalid User Credentials. Please try again.");
    }
});


// Function to navigate between sections
function navigateTo(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden'); // Hide all sections
    });
    document.getElementById(sectionId).classList.remove('hidden'); // Show the selected section
}

// Add event listener for logout button
document.getElementById("logout-button").addEventListener("click", function () {
    // Clear session data
    sessionStorage.removeItem("role");

    // Redirect to the index page
    window.location.href = "index.html";
});

// Function to open locker form
function openLocker(lockerType) {
    navigateTo('lockerFormSection');
    const lockerTitle = document.getElementById('lockerTitle');
    const lockerForm = document.getElementById('lockerForm');
  
    lockerTitle.textContent = `${lockerType} Locker - Add Information`;
  
    // Reset the form to clear previous data
    lockerForm.innerHTML = ''; // Clear previous form content
  
    // Dynamic form generation based on locker type
    switch(lockerType) {
        case 'Bank':
            lockerForm.innerHTML = `
                <label for="accountName">Account Name:</label>
                <input type="text" id="accountName" placeholder="Enter Account Name" required>
    
                <label for="accountNumber">Account Number:</label>
                <input type="text" id="accountNumber" placeholder="Enter Account Number" required>
    
                <label for="accountPin">PIN:</label>
                <input type="password" id="accountPin" placeholder="Enter PIN" required>
            `;
            break;
  
        case 'Mail':
            lockerForm.innerHTML = `
                <label for="mailID">Mail ID:</label>
                <input type="email" id="mailID" placeholder="Enter Mail ID" required>
    
                <label for="mailPassword">Password:</label>
                <input type="password" id="mailPassword" placeholder="Enter Password" required>
            `;
            break;
  
        case 'Music':
            lockerForm.innerHTML = `
                <label for="musicFile">Upload Audio File:</label>
                <input type="file" id="musicFile" accept=".mp3,.wav,.ogg" required>
            `;
            break;
  
        case 'Images':
            lockerForm.innerHTML = `
                <label for="imageFile">Upload PNG Image:</label>
                <input type="file" id="imageFile" accept=".png" required>
            `;
            break;
  
        case 'Videos':
            lockerForm.innerHTML = `
                <label for="videoFile">Upload Video File:</label>
                <input type="file" id="videoFile" accept=".mp4,.avi,.mov" required>
            `;
            break;
  
        case 'Documents':
            lockerForm.innerHTML = `
                <label for="documentFile">Upload Document:</label>
                <input type="file" id="documentFile" accept=".jpg,.pdf,.ppt,.docx,.txt" required>
            `;
            break;
  
        case 'Password':
            lockerForm.innerHTML = `
                <label for="websiteName">Website/Service Name:</label>
                <input type="text" id="websiteName" placeholder="Enter Website Name" required>
    
                <label for="username">Username:</label>
                <input type="text" id="username" placeholder="Enter Username" required>
    
                <label for="password">Password:</label>
                <input type="password" id="password" placeholder="Enter Password" required>
            `;
            break;
  
        default:
            console.log("Unknown locker type");
            break;
    }
}

// Function to save locker data
function saveData() {
    const lockerTitle = document.getElementById('lockerTitle').textContent.split(' ')[0]; // Extract locker type
    let lockerData = { type: `${lockerTitle} Locker` };
  
    switch(lockerTitle) {
        case 'Bank':
            const accountName = document.getElementById('accountName').value;
            const accountNumber = document.getElementById('accountNumber').value;
            const accountPin = document.getElementById('accountPin').value;
    
            if (!accountName || !accountNumber || !accountPin) {
                alert('Please fill in all Bank Locker fields');
                return;
            }
            lockerData.details = `Name: ${accountName}, Account Number: ${accountNumber}`;
            break;
  
        case 'Mail':
            const mailID = document.getElementById('mailID').value;
            const mailPassword = document.getElementById('mailPassword').value;
    
            if (!mailID || !mailPassword) {
                alert('Please fill in all Mail Locker fields');
                return;
            }
            lockerData.details = `Mail ID: ${mailID}`;
            break;
  
        case 'Music':
            const musicFile = document.getElementById('musicFile').files[0];
            if (!musicFile) {
                alert('Please upload an audio file');
                return;
            }
            lockerData.details = `Audio File: ${musicFile.name}`;
            break;
  
        case 'Images':
            const imageFile = document.getElementById('imageFile').files[0];
            if (!imageFile) {
                alert('Please upload a PNG image');
                return;
            }
            lockerData.details = `Image File: ${imageFile.name}`;
            break;
  
        case 'Videos':
            const videoFile = document.getElementById('videoFile').files[0];
            if (!videoFile) {
                alert('Please upload a video file');
                return;
            }
            lockerData.details = `Video File: ${videoFile.name}`;
            break;
  
        case 'Documents':
            const documentFile = document.getElementById('documentFile').files[0];
            if (!documentFile) {
                alert('Please upload a document');
                return;
            }
            lockerData.details = `Document File: ${documentFile.name}`;
            break;
  
        case 'Password':
            const websiteName = document.getElementById('websiteName').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
    
            if (!websiteName || !username || !password) {
                alert('Please fill in all Password Locker fields');
                return;
            }
            lockerData.details = `Website: ${websiteName}, Username: ${username}`;
            break;
  
        default:
            alert('Invalid locker type');
            return;
    }
  
    storedDetails.push(lockerData);
    alert(`${lockerTitle} Locker details saved successfully!`);
    updateMyLockersTable(); // Update the table with the new data
    navigateTo('dashboard');
}

// Function to update My Lockers table
function updateMyLockersTable() {
    const table = document.getElementById('myLockersTable');
    
    table.innerHTML = `
        <tr>
            <th>Locker Type</th>
            <th>Details</th>
        </tr>
    `;
  
    storedDetails.forEach(detail => {
        const row = table.insertRow();
        const typeCell = row.insertCell(0);
        const detailsCell = row.insertCell(1);
        
        typeCell.textContent = detail.type;
        detailsCell.textContent = detail.details;
    });
}

