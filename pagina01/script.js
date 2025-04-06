document.addEventListener("DOMContentLoaded", () => {
    // Recupera pedidos de todos os clientes
    const pedidosC1 = JSON.parse(localStorage.getItem("pedidos_C1") || "[]");
    const pedidosC2 = JSON.parse(localStorage.getItem("pedidos_C2") || "[]");
    const pedidosC3 = JSON.parse(localStorage.getItem("pedidos_C3") || "[]");
  
    const pedidosPendentes = pedidosC1.length + pedidosC2.length + pedidosC3.length;
  
    // Recupera máquinas e conta as que estão "funcionando"
    const maquinas = JSON.parse(localStorage.getItem("maquinas") || "[]");
    const maquinasAtivas = maquinas.filter(m => m.status.toLowerCase() === "funcionando").length;
  
    // Recupera operadores
    const operadores = JSON.parse(localStorage.getItem("operadores") || "[]").length;
  
    // Recupera produção e soma as peças prontas
    const producao = JSON.parse(localStorage.getItem("producao") || "[]");
    const totalProducao = producao.reduce((soma, p) => soma + (parseInt(p.qtdPronta) || 0), 0);
  
    // Atualiza os elementos do HTML
    document.getElementById("pedidos").textContent = pedidosPendentes;
    document.getElementById("maquinasAtivas").textContent = maquinasAtivas;
    document.getElementById("operadores").textContent = operadores;
    document.getElementById("producao").textContent = totalProducao;
  });
  