const visualizacao = document.getElementById("visualizacao"),
    estilos = document.getElementById("estilos"),
    controles = document.querySelectorAll(".configuracoes input"),
    botaoCopiar = document.getElementById("copiar-estilos");

controles.forEach((controle) => {
    controle.addEventListener("input", gerarEstilos);
});

function gerarEstilos() {
    const sombraHorizontal = document.getElementById("sombra-horizontal").value;
    const sombraVertical = document.getElementById("sombra-vertical").value;
    const raioDesuavizacao = document.getElementById("raio-desuavizacao").value;
    const raioExpansao = document.getElementById("raio-expansao").value;
    const corDaSombra = document.getElementById("cor-da-sombra").value;
    const opacidadeSombra = document.getElementById("opacidade-sombra").value;
    const sombraInterna = document.getElementById("sombra-interna").checked;
    const raioBorda = document.getElementById("raio-borda").value;

    const sombraCaixa = `${sombraInterna ? "inset " : ""}${sombraHorizontal}px ${sombraVertical}px ${raioDesuavizacao}px ${raioExpansao}px ${hexParaRgba(corDaSombra, opacidadeSombra)}`;

    visualizacao.style.boxShadow = sombraCaixa;
    visualizacao.style.borderRadius = `${raioBorda}px`;

    estilos.textContent = `box-shadow: ${sombraCaixa};\nborder-radius: ${raioBorda}px;`;
}

function hexParaRgba(corHex, opacidade) {
    const r = parseInt(corHex.substr(1, 2), 16);
    const g = parseInt(corHex.substr(3, 2), 16);
    const b = parseInt(corHex.substr(5, 2), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
}

function copiarEstilos() {
    estilos.select();
    document.execCommand("copy");
    botaoCopiar.innerText = "Copiado!";
    setTimeout(() => {
        botaoCopiar.innerText = "Copiar Estilos";
    }, 500);
}

gerarEstilos();
