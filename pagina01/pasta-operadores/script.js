// Elementos
const modal = document.getElementById("modal");
const btnAdicionar = document.getElementById("adicionar-operador");
const spanFechar = document.querySelector(".close");
const form = document.getElementById("operadorForm");
const tabela = document.getElementById("operadoresTable").querySelector("tbody");
const selectOrdenar = document.getElementById("ordenarpor");

// Lista de operadores
let operadores = [];

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

    form.reset();
    modal.style.display = "none";
    atualizarTabela();
});

// Atualiza a tabela com os dados atuais
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

// Ordenação
selectOrdenar.addEventListener("change", () => {
    const criterio = selectOrdenar.value;

    if (criterio) {
        // Corrigir campo 'r.e' para 're'
        const campo = (criterio === 'r.e') ? 're' : criterio;

        operadores.sort((a, b) => {
            return a[campo].toLowerCase().localeCompare(b[campo].toLowerCase());
        });

        atualizarTabela();
    }
});

// Inicializa a tabela