window.onload = () => {
    const tabela = document.querySelector("#tabelaControle tbody");
  
    // Simula dados de pedidos (por cliente)
    const pedidos = [
      ...JSON.parse(localStorage.getItem("pedidos_C1") || "[]").map(p => ({ ...p, cliente: "C1" })),
      ...JSON.parse(localStorage.getItem("pedidos_C2") || "[]").map(p => ({ ...p, cliente: "C2" })),
      ...JSON.parse(localStorage.getItem("pedidos_C3") || "[]").map(p => ({ ...p, cliente: "C3" }))
    ];
  
    // Simula dados da produção atual
    const producao = JSON.parse(localStorage.getItem("producao") || "[]");
  
    // Simula máquinas ativas
    const maquinas = JSON.parse(localStorage.getItem("maquinas") || "[]")
      .filter(m => m.status.toLowerCase() === "funcionando");
  
    // Calcula a capacidade total de produção por dia
    const capacidadePorDia = maquinas.reduce((total, m) => {
      const qtd = parseInt(m.qtdPorTurno) || 0;
      return total + qtd;
    }, 0);
  
    pedidos.forEach(pedido => {
      const produzido = calcularProduzido(pedido.item);
      const tamanho = parseInt(pedido.tamanho) || 0;
      const faltando = Math.max(tamanho - produzido, 0);
  
      const diasNecessarios = capacidadePorDia > 0 ? Math.ceil(faltando / capacidadePorDia) : "-";
      const hoje = new Date();
      const entrega = new Date(pedido.dataEntrega);
      const previsao = diasNecessarios !== "-" ? new Date(hoje.getTime() + diasNecessarios * 86400000) : "-";
  
      let status = "⚠️ Em risco";
      if (previsao === "-") {
        status = "❓ Sem dados";
      } else if (previsao > entrega) {
        status = "❌ Atrasado";
      } else {
        status = "✅ No prazo";
      }
  
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${pedido.cliente}</td>
        <td>${pedido.item}</td>
        <td>${tamanho}</td>
        <td>${produzido}</td>
        <td>${faltando}</td>
        <td>${pedido.dataEntrega}</td>
        <td>${capacidadePorDia}</td>
        <td>${previsao !== "-" ? previsao.toLocaleDateString() : "-"}</td>
        <td class="${definirClasseStatus(status)}">${status}</td>
      `;
      tabela.appendChild(linha);
    });
  };
  
  // Verifica quantas peças já foram feitas de um item
  function calcularProduzido(item) {
    const producao = JSON.parse(localStorage.getItem("producao") || "[]");
    const total = producao
      .filter(p => p.item === item)
      .reduce((soma, p) => soma + (parseInt(p.qtdPronta) || 0), 0);
    return total;
  }
  
  // Retorna a classe CSS com base no status
  function definirClasseStatus(status) {
    if (status.includes("No prazo")) return "status-ok";
    if (status.includes("Atrasado")) return "status-late";
    if (status.includes("Em risco")) return "status-risk";
    return "";
  }
  
