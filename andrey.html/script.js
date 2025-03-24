// Função para carregar os dados do localStorage
function carregarDados() {
    // Carregar funcionários
    let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    let listaFuncionarios = document.getElementById('listaFuncionarios');
    listaFuncionarios.innerHTML = '';
    funcionarios.forEach(f => {
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${f.nome} - ${f.cargo}`;
        listaFuncionarios.appendChild(li);
    });

    // Carregar produtos
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    let listaProdutos = document.getElementById('listaProdutos');
    listaProdutos.innerHTML = '';
    produtos.forEach(p => {
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${p.nome} - ${p.quantidade} em estoque - R$ ${p.preco.toFixed(2)}`;
        listaProdutos.appendChild(li);
    });

    // Carregar vendas
    let vendas = JSON.parse(localStorage.getItem('vendas')) || [];
    let listaVendas = document.getElementById('listaVendas');
    listaVendas.innerHTML = '';
    vendas.forEach(v => {
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `Venda: ${v.funcionario} - Produto: ${v.produto} - Quantidade: ${v.quantidade}`;
        listaVendas.appendChild(li);
    });
}

// Função para adicionar funcionário
document.getElementById('formFuncionario').addEventListener('submit', function(e) {
    e.preventDefault();
    let nome = document.getElementById('nomeFuncionario').value;
    let cargo = document.getElementById('cargoFuncionario').value;
    let id = document.getElementById('idFuncionario').value;

    let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    funcionarios.push({ nome, cargo, id });
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
    carregarDados();
    e.target.reset();
});

// Função para adicionar produto
document.getElementById('formProduto').addEventListener('submit', function(e) {
    e.preventDefault();
    let nome = document.getElementById('nomeProduto').value;
    let quantidade = parseInt(document.getElementById('quantidadeProduto').value);
    let preco = parseFloat(document.getElementById('precoProduto').value);

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push({ nome, quantidade, preco });
    localStorage.setItem('produtos', JSON.stringify(produtos));
    carregarDados();
    e.target.reset();
});

// Função para registrar venda
document.getElementById('formVenda').addEventListener('submit', function(e) {
    e.preventDefault();
    let funcionarioId = document.getElementById('funcionarioVenda').value;
    let produtoNome = document.getElementById('produtoVenda').value;
    let quantidade = parseInt(document.getElementById('quantidadeVenda').value);

    let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    let funcionario = funcionarios.find(f => f.id === funcionarioId);
    let produto = produtos.find(p => p.nome === produtoNome);

    if (produto.quantidade >= quantidade) {
        produto.quantidade -= quantidade;
        let vendas = JSON.parse(localStorage.getItem('vendas')) || [];
        vendas.push({ funcionario: funcionario.nome, produto: produto.nome, quantidade });
        localStorage.setItem('vendas', JSON.stringify(vendas));
        localStorage.setItem('produtos', JSON.stringify(produtos));
        carregarDados();
    } else {
        alert('Estoque insuficiente!');
    }

    e.target.reset();
});

// Carregar dados quando a página é carregada
document.addEventListener('DOMContentLoaded', carregarDados);
