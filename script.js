let count=1;
document.getElementById('radio1').checked= true;

setInterval( function (){
    nextImage();
},2000)

function nextImage(){
    count++;
    if (count>4){
        count=1;
    }

    document.getElementById('radio'+count).checked= true;

}

let show = true;

const burg = document.querySelector(".burg")
const menuu = document.querySelector(".bx-menu")




burg.addEventListener("click", (e) => {

    document.body.style.overflow = show ? "hidden" : "initial"
    
    
    burg.classList.toggle("on", show)
    show = ! show;
    
})
// aula 05
// criar a variável modalKey sera global
let modalKey = 0

// variavel para controlar a quantidade inicial de produto na modal
let quantproduto = 1

let cart = [] // carrinho
// /aula 05

// res ou uteisfuncoes auxilia
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.produtoWindowArea').style.opacity = 0 // transparente
    seleciona('.produtoWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.produtoWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.produtoWindowArea').style.opacity = 0 // transparente
    setTimeout(() => seleciona('.produtoWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
    // BOTOES FECHAR MODAL
    selecionaTodos('.produtoInfo--cancelButton, .produtoInfo--cancelMobileButton').forEach( (item) => item.addEventListener('click', fecharModal) )
}

const preencheDadosDasproduto = (produtoItem, item, index) => {
    // aula 05
    // setar um atributo para identificar qual elemento foi clicado
	produtoItem.setAttribute('data-key', index)
    produtoItem.querySelector('.produto-item--img img').src = item.img
    produtoItem.querySelector('.produto-item--price').innerHTML = formatoReal(item.price[2])
    produtoItem.querySelector('.produto-item--name').innerHTML = item.name
}

const preencheDadosModal = (item) => {
    seleciona('.produtoBig img').src = item.img
    seleciona('.produtoInfo h1').innerHTML = item.name
    seleciona('.produtoInfo--actualPrice').innerHTML =formatoReal(item.price[2])
}

// aula 05
const pegarKey = (e) => {
    // .closest retorna o elemento mais proximo que tem a class que passamos
    // do .produto-item ele vai pegar o valor do atributo data-key
    let key = e.target.closest('.produto-item').getAttribute('data-key')
    console.log('produto clicado ' + key)
    console.log(produtosss[key])

    // garantir que a quantidade inicial de produtos é 1
    quantproduto = 1

    // Para manter a informação de qual produto foi clicada
    modalKey = key

    return key
}

const preencherTamanhos = (key) => {
    // tirar a selecao de tamanho atual e selecionar o tamanho grande
    seleciona('.produtoInfo--size.selected').classList.remove('selected')

    // selecionar todos os tamanhos
    selecionaTodos('.produtoInfo--size').forEach((size, sizeIndex) => {
        // selecionar o tamanho grande
        (sizeIndex == 2) ? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = produtosss[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key,) => {
    // Ações nos botões de tamanho
    // selecionar todos os tamanhos
    selecionaTodos('.produtoInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            // clicou em um item, tirar a selecao dos outros e marca o q vc clicou
            // tirar a selecao de tamanho atual e selecionar o tamanho grande
            seleciona('.produtoInfo--size.selected').classList.remove('selected')
            // marcar o que vc clicou, ao inves de usar e.target use size, pois ele é nosso item dentro do loop
            size.classList.add('selected')

            // mudar o preço de acordo com o tamanho
            seleciona('.produtoInfo--actualPrice').innerHTML = (produtosss[key].price[sizeIndex])
        })
    })
}

const mudarQuantidade = (subtotal) => {
    // Ações nos botões + e - da janela modal
    seleciona('.produtoInfo--qtmais').addEventListener('click', () => {
        quantproduto++
        subtotal
        seleciona('.produtoInfo--qt').innerHTML = quantproduto
        seleciona('.produtoInfo--sector').innerHTML=subtotal
    })

    seleciona('.produtoInfo--qtmenos').addEventListener('click', () => {
        if(quantproduto > 1) {
            quantproduto--
            seleciona('.produtoInfo--qt').innerHTML = quantproduto	
        }
    })
}
// /aula 05

// aula 06
const adicionarNoCarrinho = () => {
    seleciona('.produtoInfo--addButton').addEventListener('click', () => {
        console.log('Adicionar no carrinho')

        // pegar dados da janela modal atual
    	// qual produto? pegue o modalKey para usar produtoJson[modalKey]
    	console.log("produto " + modalKey)
    	// tamanho
	    //let size = seleciona('.produtoInfo--size.selected').getAttribute('data-key')
	    //console.log("Tamanho " + size)
	    // quantidade
    	console.log("Quant. " + quantproduto)
        // preco
        let price = seleciona('.produtoInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')
    
        // crie um identificador que junte id e tamanho
	    // concatene as duas informacoes separadas por um símbolo, vc escolhe
	    let identificador = produtosss[modalKey].id+'t'

        // antes de adicionar verifique se ja tem aquele codigo e tamanho
        // para adicionarmos a quantidade
        let key = cart.findIndex( (item) => item.identificador == identificador )
        console.log(key)

        if(key > -1) {
            // se encontrar aumente a quantidade
            cart[key].qt += quantproduto
        } else {
            // adicionar objeto produto no carrinho
            let produto = {
                identificador,
                id: produtosss[modalKey].id,
                //size, // size: size
                qt: quantproduto,
                price: parseFloat(price) // price: price
            }
            cart.push(produto)
            console.log(produto)
            console.log('Sub total R$ ' + (produto.qt * produto.price).toFixed(2))
        }

        fecharModal()
        //abrirCarrinho()
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)

        // mostrar o carrinho
	    seleciona('aside').classList.toggle('show')
        seleciona('aside').style.display='block'
        seleciona('aside').style.left='0'
      //  seleciona('header').style.display = 'flex' // mostrar barra superior
    

    // exibir aside do carrinho no modo mobile
    seleciona('.menu-openner').addEventListener('click', () => {
      
            seleciona('aside').classList.toggle('show')
            seleciona('aside').style.left = '0'
        
    })
}

const fecharCarrinho = () => {
    // fechar o carrinho com o botão X no modo mobile
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').classList.remove ('show') // usando 100vw ele ficara fora da tela
        //seleciona('header').style.display = 'flex'
      
    })
}

const atualizarCarrinho = () => {
    // exibir número de itens no carrinho
	seleciona('.menu-openner span').innerHTML = cart.length
	
	// mostrar ou nao o carrinho
	if(cart.length > 0) {

		// mostrar o carrinho
		//seleciona('aside').classList.add('show')

		// zerar meu .cart para nao fazer insercoes duplicadas
		seleciona('.cart').innerHTML = ''

        // crie as variaveis antes do for
		let subtotal = 0
		let desconto = 0
		let total    = 0

        // para preencher os itens do carrinho, calcular subtotal
		for(let i in cart) {
			// use o find para pegar o item por id
			let produtoItem = produtosss.find( (item) => item.id == cart[i].id )
			 

            // em cada item pegar o subtotal
        	subtotal += cart[i].price * cart[i].qt
            //console.log(cart[i].price)

			// fazer o clone, exibir na telas e depois preencher as informacoes
			let cartItem = seleciona('.models .cart--item').cloneNode(true)
			seleciona('.cart').append(cartItem)

			let produtoSizeName = cart[i]

			let produtoName = `${produtoItem.name} `

			// preencher as informacoes
			cartItem.querySelector('img').src = produtoItem.img
			cartItem.querySelector('.cart--item-nome').innerHTML = produtoName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt
         

			// selecionar botoes + e -
			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
				// adicionar apenas a quantidade que esta neste contexto
				cart[i].qt++
				// atualizar a quantidade
				atualizarCarrinho()
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(cart[i].qt > 1) {
					// subtrair apenas a quantidade que esta neste contexto
					cart[i].qt--
				} else {
					// remover se for zero
					cart.splice(i, 1)
				}

               // (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

				// atualizar a quantidade
				atualizarCarrinho()
			})

			seleciona('.cart').append(cartItem)

		} // fim do for

		// fora do for
		// calcule desconto 10% e total
		//desconto = subtotal * 0.1
		desconto = subtotal * 0
		total = subtotal - desconto

		// exibir na tela os resultados
		// selecionar o ultimo span do elemento
		seleciona('.subtotal span:last-child').innerHTML =formatoReal(subtotal)
        seleciona('.desconto span:last-child').innerHTML =formatoReal(desconto)
		seleciona('.total span:last-child').innerHTML    =formatoReal(total)

	} else {
		// ocultar o carrinho
		seleciona('aside').classList.remove('show')
		//seleciona('aside').style.left = '100vw'
	}
}

const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        //seleciona('header').style.display = 'flex'
    })
}

// /aula 06

// MAPEAR produtosss para gerar lista de produtos
 produtosss.map((item, index ) => {
    //console.log(item)
    let produtoItem = document.querySelector('.models .produto-item').cloneNode(true)
    //console.log(produtoItem)
    seleciona('.produto-area').append(produtoItem)

    // preencher os dados de cada produto
    preencheDadosDasproduto(produtoItem, item, index)
    
    // produto clicada
    produtoItem.querySelector('.produto-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou na produto')

        // aula 05
        let chave = pegarKey(e)
        // /aula 05

        // abrir janela modal
        abrirModal()

        // preenchimento dos dados
        preencheDadosModal(item)

        // aula 05
        // pegar tamanho selecionado
        //preencherTamanhos(chave)

		// definir quantidade inicial como 1
		seleciona('.produtoInfo--qt').innerHTML = quantproduto

        // selecionar o tamanho e preco com o clique no botao
        escolherTamanhoPreco(chave)
        // /aula 05

    })

    botoesFechar()

}) // fim do MAPEAR produtosss para gerar lista de produtos

// aula 05
// mudar quantidade com os botoes + e -
mudarQuantidade()
// /aula 05
abrirCarrinho()
// aula 06
adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()
// /aula 06
