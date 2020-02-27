document
    .querySelector('header button')
    .addEventListener("click", function() {
        document
        .querySelector('.form')
        .classList.toggle('hide')
    })

// INICIO FUNÇÃO DE MASCARA MAIUSCULA
function maiuscula(z){
    v = z.value.toUpperCase();
    z.value = v;
}
//FIM DA FUNÇÃO MASCARA MAIUSCULA