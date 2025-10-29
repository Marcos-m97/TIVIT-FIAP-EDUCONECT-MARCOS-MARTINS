// =========================================
// aluno.js - Detalhes do aluno
// =========================================

// Obter ID da URL
const params = new URLSearchParams(window.location.search);
const alunoId = params.get("id");

// Buscar aluno no localStorage
function obterAlunoPorId(id) {
  const dados = JSON.parse(localStorage.getItem("educonnect_dados"));
  return dados?.alunos.find(a => a.id === id);
}

// Salvar alterações
function salvarAluno(alunoAtualizado) {
  const dados = JSON.parse(localStorage.getItem("educonnect_dados"));
  const idx = dados.alunos.findIndex(a => a.id === alunoAtualizado.id);
  if (idx >= 0) {
    dados.alunos[idx] = alunoAtualizado;
    localStorage.setItem("educonnect_dados", JSON.stringify(dados));
  }
}

// Renderizar dados do aluno
const aluno = obterAlunoPorId(alunoId);
const titulo = document.getElementById("tituloAluno");
const dadosAluno = document.getElementById("dadosAluno");
const listaEventos = document.getElementById("listaEventos");

if (!aluno) {
  alert("Aluno não encontrado.");
  window.location.href = "dashboard.html";
}

titulo.textContent = `${aluno.nome} ${aluno.sobrenome}`;
dadosAluno.innerHTML = `
  <p><strong>Matrícula:</strong> ${aluno.matricula}</p>
  <p><strong>CPF:</strong> ${aluno.cpf}</p>
  <p><strong>Data de Nascimento:</strong> ${aluno.nascimento}</p>
`;

// Renderizar gráfico
const ctx = document.getElementById("graficoAluno").getContext("2d");
let grafico = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["P1", "P2", "Atividade"],
    datasets: [{
      label: "Notas",
      data: [aluno.notas.p1 || 0, aluno.notas.p2 || 0, aluno.notas.atividade || 0],
      backgroundColor: "rgba(59,130,246,0.6)",
      borderColor: "rgba(59,130,246,1)",
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: { beginAtZero: true, max: 10 }
    }
  }
});

// Atualizar notas
document.getElementById("btnEditarNotas").addEventListener("click", () => {
  const p1 = prompt("Digite a nota da P1:", aluno.notas.p1 || "");
  const p2 = prompt("Digite a nota da P2:", aluno.notas.p2 || "");
  const atividade = prompt("Digite a nota da Atividade:", aluno.notas.atividade || "");

  aluno.notas = { p1: Number(p1), p2: Number(p2), atividade: Number(atividade) };
  salvarAluno(aluno);

  grafico.data.datasets[0].data = [aluno.notas.p1, aluno.notas.p2, aluno.notas.atividade];
  grafico.update();
});

// Adicionar evento
document.getElementById("btnAdicionarEvento").addEventListener("click", () => {
  const descricao = prompt("Descrição do evento:");
  if (!descricao) return;

  const data = new Date().toLocaleDateString("pt-BR");
  aluno.eventos.push({ data, descricao });
  salvarAluno(aluno);
  renderizarEventos();
});

// Renderizar lista de eventos
function renderizarEventos() {
  listaEventos.innerHTML = "";
  if (aluno.eventos.length === 0) {
    listaEventos.innerHTML = "<li>Nenhum evento cadastrado.</li>";
    return;
  }

  aluno.eventos.forEach(ev => {
    const li = document.createElement("li");
    li.textContent = `${ev.data} - ${ev.descricao}`;
    listaEventos.appendChild(li);
  });
}

renderizarEventos();

// Botão voltar
document.getElementById("btnVoltar").addEventListener("click", () => {
  window.location.href = "dashboard.html";
});
