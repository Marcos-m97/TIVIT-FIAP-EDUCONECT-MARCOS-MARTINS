const form = document.getElementById("formCadastro");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const sobrenome = document.getElementById("sobrenome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const matricula = document.getElementById("matricula").value.trim();
  const nascimento = document.getElementById("nascimento").value;

  if (!nome || !sobrenome || !cpf || !matricula || !nascimento) {
    alert("Preencha todos os campos!");
    return;
  }

  const dados = JSON.parse(localStorage.getItem("educonnect_dados")) || { alunos: [] };

  const novoAluno = {
    id: `A${Date.now()}`,
    nome,
    sobrenome,
    cpf,
    matricula,
    nascimento,
    notas: { p1: 0, p2: 0, atividade: 0 },
    eventos: []
  };

  dados.alunos.push(novoAluno);
  localStorage.setItem("educonnect_dados", JSON.stringify(dados));

  alert("Aluno cadastrado com sucesso!");
  form.reset();
});
