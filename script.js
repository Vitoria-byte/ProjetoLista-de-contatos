document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registre");
    const btnCadastra = document.getElementById("btnCadastra");
    const listaDeTodosNumeros = document.getElementById("listaDeTodosNumeros");
    const modal = document.getElementById("meuModal");
    const modalContent = document.getElementById("modalLista");
    let contatos = [];
  
    // Carregar contatos do localStorage ao inicializar
    function carregarContatos() {
      const contatosSalvos = localStorage.getItem("contatos");
      if (contatosSalvos) {
        contatos = JSON.parse(contatosSalvos);
      }
    }
  
    // Salvar contatos no localStorage
    function salvarContatos() {
      localStorage.setItem("contatos", JSON.stringify(contatos));
    }
  
    // Exibir contatos na lista
    function exibirContatos() {
      listaDeTodosNumeros.innerHTML = "";
  
      if (contatos.length === 0) {
        listaDeTodosNumeros.innerHTML = "<p>Nenhum contato cadastrado.</p>";
        return;
      }
  
      contatos.forEach((contato, index) => {
        const contatoDiv = document.createElement("div");
        contatoDiv.className = "contato-item";
  
        contatoDiv.innerHTML = `
          <p><strong>Nome:</strong> ${contato.nome}</p>
          <p><strong>Número:</strong> ${contato.numero}</p>
          <p><strong>Email:</strong> ${contato.email}</p>
          <button class="btnEditar" data-index="${index}">Editar</button>
          <button class="btnExcluir" data-index="${index}">Excluir</button>
        `;
  
        listaDeTodosNumeros.appendChild(contatoDiv);
      });
  
      adicionarEventos();
    }
  
    // Adicionar eventos para editar e excluir
    function adicionarEventos() {
      const btnEditar = document.querySelectorAll(".btnEditar");
      const btnExcluir = document.querySelectorAll(".btnExcluir");
  
      btnEditar.forEach((botao) => {
        botao.addEventListener("click", (e) => {
          const index = e.target.dataset.index;
          editarContato(index);
        });
      });
  
      btnExcluir.forEach((botao) => {
        botao.addEventListener("click", (e) => {
          const index = e.target.dataset.index;
          excluirContato(index);
        });
      });
    }
  
    // Função para cadastrar um novo contato
    btnCadastra.addEventListener("click", (e) => {
      e.preventDefault();
  
      const nome = document.getElementById("nome_contato").value.trim();
      const numero = document.getElementById("numero").value.trim();
      const email = document.getElementById("email").value.trim();
  
      if (!nome || !numero || !email) {
        alert("Por favor, preencha todos os campos!");
        return;
      }
  
      contatos.push({ nome, numero, email });
  
      // Salvar contatos atualizados no localStorage
      salvarContatos();
  
      // Limpar os campos do formulário
      form.reset();
  
      // Atualizar a lista
      exibirContatos();
    });
  
    // Função para editar um contato
    function editarContato(index) {
      const contato = contatos[index];
  
      const novoNome = prompt("Digite o novo nome:", contato.nome);
      const novoNumero = prompt("Digite o novo número:", contato.numero);
      const novoEmail = prompt("Digite o novo email:", contato.email);
  
      if (novoNome && novoNumero && novoEmail) {
        contatos[index] = { nome: novoNome, numero: novoNumero, email: novoEmail };
  
        // Salvar contatos atualizados no localStorage
        salvarContatos();
  
        exibirContatos();
      } else {
        alert("Por favor, preencha todos os campos para editar.");
      }
    }
  
    // Função para excluir um contato
    function excluirContato(index) {
      if (confirm("Tem certeza que deseja excluir este contato?")) {
        contatos.splice(index, 1);
  
        // Salvar contatos atualizados no localStorage
        salvarContatos();
  
        exibirContatos();
      }
    }
  
    // Exibe o modal com informações dos contatos
    function exibirModal() {
      modal.style.display = "block";
  
      const lista = contatos.map(
        (contato) =>
          `<p><strong>${contato.nome}</strong> - ${contato.numero} (${contato.email})</p>`
      ).join("");
  
      modalContent.innerHTML = lista || "<p>Nenhum contato cadastrado.</p>";
    }
  
    // Fechar o modal ao clicar fora
    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  
    // Carregar contatos do localStorage e atualizar a lista na inicialização
    carregarContatos();
    exibirContatos();
  });