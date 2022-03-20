const divVideo = document.querySelector('.videoSection');

function insertarVideo(opcion) {

    limpiarHTML();

    const mp4 = document.createElement("div");
    mp4.innerHTML = `
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${opcion}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   `;
    divVideo.appendChild(mp4);
}

function limpiarHTML() {
    while (divVideo.firstChild) {
        divVideo.removeChild(divVideo.firstChild);
    }
}