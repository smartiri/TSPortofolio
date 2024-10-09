const hamburger = document.getElementById('hamb-icon');
const navbar = document.getElementById('whole-menu');
const contact_submit = document.getElementById('contact-submit');
const form = document.getElementById('contact_form');    
const modal = document.getElementById('modal');
const view = document.getElementById('view_more');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const closeModal = document.getElementsByClassName("close")[0];
const date = new Date();
const projectsArr = [];

// api to fetch data from json

fetch('projects.json').then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); 
}).then(data => {
    projectsArr = data;
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});

document.getElementById("year").innerHTML = date.getFullYear();

function open_close() {
    if(navbar.style.display == 'none'){
        navbar.style.display = 'block';
    }
    else{
        navbar.style.display = 'none';
    }
    
}
console.log(projectsArr);
window.onscroll = function() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
};

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


form.addEventListener('submit', function (event) {
    event.preventDefault();
    let isValid = true;
    
    const fields = [
        { id: 'name', errorId: 'name-error', message: 'Name is required.' },
        { id: 'lastname', errorId: 'lastname-error', message: 'Lastname is required.' },
        { id: 'email', errorId: 'email-error', message: 'Email is required.', pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
        { id: 'subject', errorId: 'subject-error', message: 'Subject is required.' },
        { id: 'message', errorId: 'msg-error', message: 'Message is required.' }
    ];

    fields.forEach(({ id, errorId, message, pattern }) => {
        const field = document.getElementById(id);
        const errorField = document.getElementById(errorId);
        if (field.value.trim() === '') {
            errorField.innerText = message;
            isValid = false;
            document.getElementById('success').innerText = '';
        } else if (pattern && !pattern.test(field.value)) {
            errorField.innerText = 'Please enter a valid email address.';
            isValid = false;
            document.getElementById('success').innerText = '';
        } else {
            errorField.innerText = '';
        }
    });

    if (isValid) {
        document.getElementById('success').innerText = "Success!";
        form.reset();
        fields.forEach(({ errorId }) => document.getElementById(errorId).innerText = '');
    }
});


view.addEventListener('click',function(){
    console.log("hello");
    modal.style.display = "block";
});



window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

closeModal.onclick = function() {
    modal.style.display = "none";
}

