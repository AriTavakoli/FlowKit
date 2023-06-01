 const leftSidebarLinks = document.querySelector('.left-sidebar-links');

    const buttonElement = document.createElement('div');
    buttonElement.setAttribute('class', 'button top exporter');


    const logo = document.createElement('img');

    const svg = document.createElement('svg');

    buttonElement.appendChild(svg);
    leftSidebarLinks.appendChild(buttonElement);
