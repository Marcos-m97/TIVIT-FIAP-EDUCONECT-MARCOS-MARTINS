// =========================================
// Dashboard.js - Pesquisa de alunos
// =========================================

// Buscar alunos salvos
function obterAlunos() {
  const dados = JSON.parse(localStorage.getItem("educonnect_dados"));
  return dados?.alunos || [];
}

// Exibir alunos na tabela
function exibirAlunos(lista) {
  const tabela = document.getElementById("listaResultados");
  const tbody = document.getElementById("tabelaAlunosBody");

  if (lista.length === 0) {
    tabela.classList.add("hidden");
    alert("Nenhum aluno encontrado.");
    return;
  }

  tbody.innerHTML = "";
  lista.forEach(aluno => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${aluno.nome} ${aluno.sobrenome}</td>
      <td>${aluno.matricula}</td>
      <td>${aluno.cpf}</td>
      <td>${aluno.nascimento}</td>
      <td><button class="verAluno" onclick="abrirAluno('${aluno.id}')">Ver</button></td>
    `;

    tbody.appendChild(tr);
  });

  tabela.classList.remove("hidden");
}

// Abrir página do aluno
function abrirAluno(id) {
  window.location.href = `aluno.html?id=${id}`;
}

// Buscar por nome ou matrícula
document.getElementById("btnBuscar").addEventListener("click", () => {
  const termo = document.getElementById("searchAluno").value.trim().toLowerCase();
  const alunos = obterAlunos();

  const filtrados = alunos.filter(a =>
    a.nome.toLowerCase().includes(termo) ||
    a.sobrenome.toLowerCase().includes(termo) ||
    a.matricula.toLowerCase().includes(termo)
  );

  exibirAlunos(filtrados);
});

// Pressionar Enter no campo de busca
document.getElementById("searchAluno").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("btnBuscar").click();
  }
});
