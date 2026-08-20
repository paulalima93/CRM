// menu.js

// 1. Criamos o HTML do menu como uma string
const menuHTML = `
    <nav class="sidebar">
        <div class="sidebar-header">
            <h3>⚙️ Sistema CRM</h3>
        </div>
        <ul class="sidebar-links">
            <li><a href="cadastro.html">📝 Cadastro</a></li>
            <li><a href="listagem.html">👥 Listagem</a></li>
        </ul>
        <div class="sidebar-footer">
            <button id="btnSair" class="btn-sair">🚪 Sair do Sistema</button>
        </div>
    </nav>
`;

// 2. Injetamos esse HTML dentro daquela div vazia
document.getElementById('menu-container').innerHTML = menuHTML;

// 3. Adicionamos a lógica do botão de Sair (Logout)
document.getElementById('btnSair').addEventListener('click', async () => {
    try {
        console.log("Saindo do sistema...");
        // O Firebase encerra a sessão do usuário
        await firebase.auth().signOut(); 
        
        // Redireciona para a tela de login
        window.location.href = "index.html";
    } catch (error) {
        console.error("Erro ao sair: ", error);
        alert("Erro ao tentar deslogar.");
    }
});

// O Firebase fica vigiando: "Alguém está logado?"
firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        // Se o usuário for null (não estiver logado), chuta ele de volta pro login!
        window.location.href = "index.html";
    }
});
