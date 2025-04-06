// Elementos
const modal = document.getElementById("modal");
const btnAdicionar = document.getElementById("adicionar-operacao");
const spanFechar = document.querySelector(".close");
const form = document.getElementById("producaoForm");
const tabela = document.getElementById("producaoTable").querySelector("tbody");
const selectOrdenar = document.getElementById("producao");

const storageKey = "producao";
let producoes = JSON.parse(localStorage.getItem(storageKey)) || [];

// Abrir modal
btnAdicionar.onclick = () => {
    modal.style.display = "block";
};

// Fechar modal
spanFechar.onclick = () => {
    modal.style.display = "none";
};

// Fechar modal ao clicar fora
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Submeter formulário
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const maquina = document.getElementById("maquina").value;
    const operacao = document.getElementById("operacao").value;
    const producao = parseInt(document.getElementById("producao").value);
    const retrabalho = parseInt(document.getElementById("retrabalho").value);
    const refugo = parseInt(document.getElementById("refugo").value);

    const novaProducao = { maquina, operacao, producao, retrabalho, refugo };
    producoes.push(novaProducao);

    salvarLocal();
    form.reset();
    modal.style.display = "none";
    atualizarTabela();
});

// Atualiza a tabela
function atualizarTabela() {
    tabela.innerHTML = "";
    producoes.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.maquina}</td>
            <td>${item.operacao}</td>
            <td>${item.producao}</td>
            <td>${item.retrabalho}</td>
            <td>${item.refugo}</td>
        `;
        tabela.appendChild(row);
    });
}

// Salvar no localStorage
function salvarLocal() {
    localStorage.setItem(storageKey, JSON.stringify(producoes));
}

// Ordenar tabela
selectOrdenar.addEventListener("change", () => {
    const criterio = selectOrdenar.value;

    if (criterio) {
        producoes.sort((a, b) => {
            if (typeof a[criterio] === 'number') {
                return a[criterio] - b[criterio];
            } else {
                return a[criterio].toLowerCase().localeCompare(b[criterio].toLowerCase());
            }
        });
        atualizarTabela();
    }
});

// Carregar dados ao iniciar
atualizarTabela();
