// import src/js files
import "./form";
// import "./submit";
import "./card";
import { toggleForm, clearForm } from "./form";

// import src/css files
import "../css/index.css";

import { Tooltip, Toast, Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { initDB, getDb, postDb, deleteDb, updateDb } from "./database.js";

// import src/images files
import Logo from "../images/logo.png";
import Bear from "../images/bear.png";
import Dog from "../images/dog.png";
import { fetchCards } from "./card";
// import Bird from "../images/bird.jpg";

window.addEventListener('load', function () {
    initDB();
    fetchCards();
    document.getElementById('logo').src = Logo;
    document.getElementById('bearThumbnail').src = Bear;
    document.getElementById('dogThumbnail').src = Dog;

});

// Form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;

// Install button functionality
const installBtn = document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installBtn.style.visibility = 'visible';
    installBtn.addEventListener('click', () => {
        event.prompt();
        installBtn.setAttribute('disabled', true);
        installBtn.textContent = 'Installed';
    });
});
    window.addEventListener('appinstalled', (event) => {
        console.log('App installed', event);
    });


// Share button functionality
const shareData = {
    title: 'Contact Cards',
    text: 'Contact Cards',
    url: 'https://developer.mozilla.org'
}
const shareBtn = document.getElementById('shareBtn');
// const resultPara = document.querySelector('.result');


// Share triggered by user activation
shareBtn.addEventListener('click', async () => {
    try {
        await navigator.share(shareData);
        // resultPara.textContent = 'Contact Cards shared successfully';
    } catch (err) {
        window.alert = `Error: ${err}`;
    }
});

newContactButton.addEventListener('click', event => {
    toggleForm()
})

form.addEventListener('submit', event => {
    // Handle data
    event.preventDefault();
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let profile = document.querySelector('input[type="radio"]:checked').value;

    // Post form data to IndexedDB OR Edit an existing card in IndexedDB
    if (submitBtnToUpdate == false) {
        postDb(name, email, phone, profile);
    } else {
        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;
        let profile = document.querySelector('input[type="radio"]:checked').value;
        updateDb(profileId, name, email, phone, profile);
        fetchCards();
        // Toggles the submit button back to POST functionality
        submitBtnToUpdate = false;
    }

    // Clear form
    clearForm();
    // Toggle form
    toggleForm();
    // Reload the DOM
    fetchCards();
})
    window.deleteCard = (e) => {
        let id = parseInt(e.id);
        deleteDb(id);
        fetchCards();
    };

window.editCard = (e) => {
    profileId = parseInt(e.dataset.id);

    let editName = e.dataset.name;
    let editEmail = e.dataset.email;
    let editPhone = e.dataset.phone;

    document.getElementById("name").value = editName;
    document.getElementById("email").value = editEmail;
    document.getElementById("phone").value = editPhone;

    form.style.display = "block";
    submitBtnToUpdate = true;
};

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js');
    })
};
