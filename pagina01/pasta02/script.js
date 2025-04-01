document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const adicionarPedidoBtn = document.getElementById("adicionarPedido");
    const closeModal = document.querySelector(".close");
    const pedidoForm = document.getElementById("pedidoForm");
    const pedidosTable = document.querySelector("#pedidosTable tbody");
    const ordenarSelect = document.getElementById("ordenarpor");
    let pedidos = [];

    adicionarPedidoBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    pedidoForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const novoPedido = {
            item: parseInt(document.getElementById("item").value),
            datainicial: formatarData(document.getElementById("datainicial").value),
            dataentrega: formatarData(document.getElementById("dataentrega").value),
            tamanho: parseInt(document.getElementById("tamanho").value),
            prioridade: parseInt(document.getElementById("prioridade").value) || 0,
        };
        
        pedidos.push(novoPedido);
        atualizarTabela();
        modal.style.display = "none";
        pedidoForm.reset();
    });

    function formatarData(dataISO) {
        const [ano, mes, dia] = dataISO.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    function atualizarTabela() {
        pedidosTable.innerHTML = "";
        pedidos.forEach((pedido) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${pedido.item}</td>
                <td>${pedido.datainicial}</td>
                <td>${pedido.dataentrega}</td>
                <td>${pedido.tamanho}</td>
                <td>${pedido.prioridade}</td>
            `;
            pedidosTable.appendChild(row);
        });
    }

    ordenarSelect.addEventListener("change", () => {
        const criterio = ordenarSelect.value;
        if (criterio) {
            pedidos.sort((a, b) => {
                if (criterio === "datainicial" || criterio === "dataentrega") {
                    return new Date(a[criterio].split("/").reverse().join("-")) - new Date(b[criterio].split("/").reverse().join("-"));
                }
                return a[criterio] - b[criterio];
            });
            atualizarTabela();
        }
    });
});
