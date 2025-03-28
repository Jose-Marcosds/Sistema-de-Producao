document.addEventListener("DOMContentLoaded", () => {
    carregarPedidos(); // Carrega os pedidos pendentes

    document.getElementById("ordenarPor").addEventListener("change", carregarPedidos); // Atualiza os pedidos ao mudar o criterio de ordenação

    document.getElementById("adicionarPedido").addEventListener("click", () => { // Abre o modal
        document.getElementById("modal").style.display = "flex"; // Mostra o modal
        document.getElementById("pedidoForm").reset(); // Limpa o formulário
        document.getElementById("pedidoForm").onsubmit = adicionarLivro; // Define a função de envio
    });//resumo de tudo a cima:Quando o botão "Adicionar Livro" for clicado:
    //O modal será exibido (display: flex).
    //O formulário será resetado (limpo).
    //A função adicionarLivro será chamada quando o usuário enviar o formulário.

    document.querySelector(".close").addEventListener("click", () => { // Fecha o modal
        document.getElementById("modal").style.display = "none"; // Esconde o modal
    });
});

