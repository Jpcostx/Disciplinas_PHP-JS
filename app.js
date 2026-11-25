const form = document.getElementById('form-disciplina');
const alertaBox = document.getElementById('alerta');
const tbody = document.getElementById('tabela-corpo');

document.addEventListener('DOMContentLoaded', () => {
    carregarDisciplinas();
});

function mostrarAlerta(mensagem, tipo = 'sucesso') {
    alertaBox.textContent = mensagem;
    alertaBox.className = `alerta ${tipo}`;
    setTimeout(() => {
        alertaBox.classList.add('oculto');
    }, 3500);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
        sigla: document.getElementById('sigla').value,
        nome: document.getElementById('nome').value,
        carga_horaria: document.getElementById('carga_horaria').value
    };

    try {
        const resposta = await fetch('api/cadastrar.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const resultado = await resposta.json();

        if (resultado.sucesso) {
            mostrarAlerta(resultado.mensagem, 'sucesso');
            form.reset();
            carregarDisciplinas();
        } else {
            mostrarAlerta(resultado.mensagem, 'erro');
        }
    } catch (erro) {
        mostrarAlerta('Erro de comunicação com o servidor.', 'erro');
    }
});

async function carregarDisciplinas() {
    try {
        const resposta = await fetch('api/listar.php');
        const resultado = await resposta.json();

        tbody.innerHTML = '';

        if (!resultado.dados || resultado.dados.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4">Nenhuma disciplina cadastrada até o momento.</td></tr>';
            return;
        }

        resultado.dados.forEach(d => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>#${d.id}</strong></td>
                <td><span class="badge">${escaparHTML(d.sigla)}</span></td>
                <td>${escaparHTML(d.nome)}</td>
                <td>${d.carga_horaria}h</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (erro) {
        mostrarAlerta('Erro ao carregar disciplinas.', 'erro');
    }
}

function escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}