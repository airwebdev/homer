import '../../scss/frontend/spoiler.scss';

const spoilers = document.querySelectorAll('.homer-spoiler');
spoilers.length &&
    spoilers.forEach(function (element) {
        element.addEventListener('click', function () {
            this.classList.add('active');
        });
    });
