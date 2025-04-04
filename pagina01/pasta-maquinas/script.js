// Abrir e fechar o modal
const modal = document.getElementById("modal");
const btnAdicionar = document.getElementById("adicionar-operacao");
const spanFechar = document.querySelector(".close");
const form = document.getElementById("pedidoForm");
const tabela = document.getElementById("maquinasTable").querySelector("tbody");
const selectOrdenar = document.getElementById("ordenarpor");

// Array para armazenar os dados
let pedidos = [];

// Abrir modal
btnAdicionar.onclick = () => {
    modal.style.display = "block";
};

// Fechar modal
spanFechar.onclick = () => {
    modal.style.display = "none";
};

// Fechar modal ao clicar fora do conteúdo
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
    const status = document.getElementById("status").value;

    const novoPedido = { maquina, operacao, producao, status };
    pedidos.push(novoPedido);

    form.reset();
    modal.style.display = "none";
    atualizarTabela();
});

// Atualiza a tabela com os dados atuais
function atualizarTabela() {
    tabela.innerHTML = "";
    pedidos.forEach((pedido) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${pedido.maquina}</td>
            <td>${pedido.operacao}</td>
            <td>${pedido.producao}</td>
            <td>${pedido.status}</td>
        `;
        tabela.appendChild(row);
    });
}

// Ordenar por seleção
selectOrdenar.addEventListener("change", () => {
    const criterio = selectOrdenar.value;

    if (criterio) {
        pedidos.sort((a, b) => {
            if (typeof a[criterio] === 'number') {
                return a[criterio] - b[criterio];
            } else {
                return a[criterio].localeCompare(b[criterio]);
            }
        });
        atualizarTabela();
    }
});
