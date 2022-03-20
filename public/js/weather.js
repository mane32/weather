const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})
function buscarClima(e) {
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
    if (ciudad === '' || pais == '') {
        //Hubo un error
        mostrarError('Ambos campos son obligatorios!');
        return;
    }
    consultarAPI(ciudad, pais);
}
function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if (!alerta) {
        const alerta = document.createElement('div');

        alerta.classList.add('pruebas', 'rounded', 'border', 'border-1', 'border-danger', 'text-center', 'p-2', 'w-50', 'm-auto', 'rojizo');

        alerta.innerHTML = `
             <strong class ="font-bold">Error!</strong>
             <span class ="block">${mensaje}</span>
            `;

        container.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
}