// Seleciona a div principal lá do HTML onde os cards serão injetados
const containerLista = document.getElementById('lista-clientes');

// Função assíncrona para buscar os dados no Firebase
async function carregarClientes() {
    try {
        // 1. Vai no banco de dados e "puxa" (.get) todos os documentos da coleção "clientes"
        const snapshot = await db.collection("clientes").get();

        // 2. Limpa o texto inicial de "Carregando dados..."
        containerLista.innerHTML = '';

        // 3. Verifica se o banco está vazio (se ninguém foi cadastrado ainda)
        if (snapshot.empty) {
            containerLista.innerHTML = '<p style="text-align: center; width: 100%;">Nenhum cliente cadastrado ainda.</p>';
            return; // Para a execução da função aqui
        }

        // 4. O forEach cria um "loop" que passa por cada documento retornado pelo banco
        snapshot.forEach((doc) => {
            // doc.data() traduz o formato interno do Firebase para um Objeto JavaScript normal
            const cliente = doc.data();

            // doc.id guarda aquela chave gigante e aleatória gerada pelo Firebase
            const idDoCliente = doc.id;

            // 5. Monta a estrutura HTML do card combinando texto e as variáveis do banco
            // Usamos as classes "card" e "h2" que já estão estilizadas no seu style.css
            const cardHTML = `
                <div class="card">
                    <h2>${cliente.nome}</h2>
                    <p><strong>E-mail:</strong> ${cliente.email}</p>
                    <p><strong>Telefone:</strong> ${cliente.telefone}</p>
                    <p><strong>Endereço:</strong> ${cliente.rua}, ${cliente.numero}</p>
                    <p><strong>Cidade:</strong> ${cliente.cidade} - ${cliente.estado}</p>
                    <hr style="margin: 10px 0; border: 0.5px solid #444;">
                    <div style="display: flex; gap: 10px;">
                        <button onclick="editarCliente('${idDoCliente}')" style="cursor: pointer; padding: 5px 10px;">Editar</button>
                        <button onclick="deletarCliente('${idDoCliente}')" style="cursor: pointer; padding: 5px 10px; background-color: #ff4a4a; color: white; border: none;">Excluir</button>
                    </div>
                </div>
            `;

            // 6. Adiciona (+ a igual) esse novo card dentro do container HTML
            containerLista.innerHTML += cardHTML;
        });
    } catch (error) {
        // 7. Se der erro (ex: falta de internet ou regra de segurança bloqueando)
        console.error("Erro ao puxar dados do Firebase: ", error);
        containerLista.innerHTML = '<p style="color: red; text-align: center; width: 100%;">Erro ao carregar os clientes. Verifique o console.</p>';
    }
}

// ==========================================
// FUNÇÃO PARA REDIRECIONAR PARA EDIÇÃO
// ==========================================
function editarCliente(id) {
    // Joga o usuário para a tela de cadastro, enviando o ID pela URL
    window.location.href = `cadastro.html?id=${id}`;
}

// ==========================================
// FUNÇÃO PARA DELETAR (Continua igual)
// ==========================================
async function deletarCliente(id) {
    const confirmacao = confirm("Tem certeza que deseja excluir este cliente?");
    if (confirmacao) {
        try {
            await db.collection("clientes").doc(id).delete();
            alert("Cliente excluído com sucesso!");
            carregarClientes(); // Recarrega a tela
        } catch (error) {
            console.error("Erro ao deletar: ", error);
        }
    }
}

// Executa a função automaticamente assim que o script é carregado pelo navegador
carregarClientes();