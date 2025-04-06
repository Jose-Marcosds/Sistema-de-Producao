// Elementos
const modal = document.getElementById("modal");
const btnAdicionar = document.getElementById("adicionar-operador");
const spanFechar = document.querySelector(".close");
const form = document.getElementById("operadorForm");
const tabela = document.getElementById("operadoresTable").querySelector("tbody");
const selectOrdenar = document.getElementById("ordenarpor");

const storageKey = "operadores";
let operadores = JSON.parse(localStorage.getItem(storageKey)) || [];

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

    const re = document.getElementById("re").value;
    const nome = document.getElementById("nome").value;
    const turno = document.getElementById("turno").value;
    const maquinas = document.getElementById("maquinas").value;

    const novoOperador = { re, nome, turno, maquinas };
    operadores.push(novoOperador);
    salvarLocal();
    form.reset();
    modal.style.display = "none";
    atualizarTabela();
});

// Atualiza a tabela
function atualizarTabela() {
    tabela.innerHTML = "";
    operadores.forEach((operador) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${operador.re}</td>
            <td>${operador.nome}</td>
            <td>${operador.turno}</td>
            <td>${operador.maquinas}</td>
        `;
        tabela.appendChild(row);
    });
}

// Salvar no localStorage
function salvarLocal() {
    localStorage.setItem(storageKey, JSON.stringify(operadores));
}

// Ordenação
selectOrdenar.addEventListener("change", () => {
    const criterio = selectOrdenar.value;
    const campo = (criterio === 'r.e') ? 're' : criterio;

    if (campo) {
        operadores.sort((a, b) => {
            return a[campo].toLowerCase().localeCompare(b[campo].toLowerCase());
        });
        atualizarTabela();
    }
});

// Carregar dados ao iniciar
atualizarTabela();


