document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.getElementById('cart-button');
    const modal = document.getElementById('carrinho-modal');
    const fecharBtn = document.getElementById('fechar-modal-btn');
    const itensCarrinho = document.getElementById('itens-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');
    const cartCount = document.getElementById('cart-count');

    let carrinho = [];
    let total = 0;
    let quantidade = 0;

    // Função para renderizar o carrinho
    function renderizarCarrinho() {  
        itensCarrinho.innerHTML = '';
        total = 0;
        quantidade = 0;
        carrinho.forEach((item, index) => {
            total += item.valor * item.qtd;
            quantidade += item.qtd;
            itensCarrinho.insertAdjacentHTML('beforeend', `
                <div class="flex items-center gap-2 border-b py-2">
                    <img src="${item.imgSrc}" class="h-16 w-16 object-cover rounded" />
                    <div>
                        <p class="font-bold">${item.nome}</p>
                        <p class="text-sm">${item.descricao}</p>
                        <p class="text-green-600">${item.preco} <span class="ml-2 text-black">Qtd: ${item.qtd}</span></p>
                    </div>
                    <button class="remover-item text-red-500 px-2 py-1 rounded ml-auto" data-index="${index}">Remover</button>
                </div>
            `);
        });
        totalCarrinho.innerText = `R$ ${total.toFixed(2)}`;
        cartCount.innerText = quantidade;

        // Adiciona o evento de remover para cada botão
        document.querySelectorAll('.remover-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(btn.getAttribute('data-index'));
                if (carrinho[idx].qtd > 1) {
                    carrinho[idx].qtd -= 1;
                } else {
                    carrinho.splice(idx, 1);
                }
                renderizarCarrinho();
            });
        });
    }

    // Abrir modal do carrinho ao clicar no ícone do carrinho
    if (cartBtn && modal) {
        cartBtn.addEventListener('click', function() {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });
    }

    // Fechar modal do carrinho
    if (fecharBtn && modal) {
        fecharBtn.addEventListener('click', function() {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        });
    }

    // Adicionar produto ao carrinho
    document.querySelectorAll('.adicionar-ao-carrinho').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            const card = btn.closest('.border');
            if (!card) return;

            const nomeElem = card.querySelector('p.font-bold');
            const descricaoElem = card.querySelector('p.text-sm');
            const precoElem = card.querySelector('.price');
            const imgElem = card.querySelector('img');

            if (!nomeElem || !descricaoElem || !precoElem || !imgElem) return;

            const nome = nomeElem.innerText;
            const descricao = descricaoElem.innerText;
            const preco = precoElem.innerText;
            const imgSrc = imgElem.src;
            const valor = parseFloat(preco.replace('R$', '').replace(',', '.').trim());

            // Verifica se o item já existe no carrinho
            const existente = carrinho.find(item => item.nome === nome && item.descricao === descricao && item.preco === preco);
            if (existente) {
                existente.qtd += 1;
            } else {
                carrinho.push({
                    nome,
                    descricao,
                    preco,
                    imgSrc,
                    valor,
                    qtd: 1
                });
            }

            renderizarCarrinho();
        });
    });

    // Função de pesquisa de produtos
    function pesquisarProdutos() {
        const termo = document.getElementById('pesquisar').value.toLowerCase();
        document.querySelectorAll('#menu main > div.border').forEach(card => {
            const nome = card.querySelector('p.font-bold')?.innerText.toLowerCase() || '';
            const descricao = card.querySelector('p.text-sm')?.innerText.toLowerCase() || '';
            if (nome.includes(termo) || descricao.includes(termo)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    document.getElementById('btn-pesquisar').addEventListener('click', pesquisarProdutos);
    document.getElementById('pesquisar').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            pesquisarProdutos();
        }
    });





    
    document.getElementById('finalizar-btn').addEventListener('click', function() {
        let mensagem = 'Pedido MK Raçoes:%0A%0A';

        carrinho.forEach(item => {
            mensagem += `• ${item.nome} (${item.descricao})%0A  Quantidade: ${item.qtd}x %0A  ${item.preco}%0A%0A`;
        });

        // Pegue o total
        const total = document.getElementById('total-carrinho').innerText.replace('R$ ', '');
        mensagem += `Total: R$ ${total}%0A`;

        // Pegue nome e endereço
        const nomeCliente = document.getElementById('nome-cliente').value;
        const endereco = document.getElementById('endereco').value;
        mensagem += `Nome: ${nomeCliente}%0AEndereço: ${endereco}`;

        // Monta o link do WhatsApp
        const telefone = "559996458528";
        const url = `https://wa.me/${telefone}?text=${mensagem}`;

        // Fecha o modal e abre o WhatsApp
        document.getElementById('carrinho-modal').style.display = 'none';
        window.open(url, '_blank');
    });
});