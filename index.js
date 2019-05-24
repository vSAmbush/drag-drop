let products = document.querySelectorAll('.product-container');
let balanceBlock = document.querySelector('h1').querySelector('span');
let balance = parseInt(balanceBlock.textContent);

for(let i = 0; i < products.length; i++) {

	products[i].setAttribute('draggable', true);
	products[i].addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', e.target.id));
}

let cart = document.querySelector('.cart');
cart.addEventListener('dragover', e => e.preventDefault());

cart.addEventListener('dragenter', e => e.target.style.borderColor = 'red');

cart.addEventListener('dragleave', e => e.target.style.borderColor = '#434242');

cart.addEventListener('drop', (e, res = document.getElementById(e.dataTransfer.getData('text/plain'))) => {
	//to avoid pasting item into item
	if(e.target !== cart)
		return;

	res.style.cssFloat = 'left';
	res.classList.add('bought');
	e.target.style.borderColor = '#434242';
	let priceBlock = res.querySelector('.price');
	let price = parseInt(priceBlock.textContent);

	if(res.parentNode !== cart)
		balance -= price;

	if(balance >= 0) {
		balanceBlock.innerHTML = balance + '$';
		priceBlock.style.display = 'none';
		e.target.appendChild(res);
	}
	else {
		balance += price;
		balanceBlock.parentNode.classList.add('run-animation');
		setTimeout(() => balanceBlock.parentNode.classList.remove('run-animation'), 200);
	}
});

document.querySelector('body').addEventListener('dragover', e => e.preventDefault());

document.querySelector('body').addEventListener('drop', (e, res = document.getElementById(e.dataTransfer.getData('text/plain'))) => {

	let productsBlock = document.querySelector('.products');
	let priceBlock = res.querySelector('.price');

	if(res.classList.contains('bought') && e.target !== cart) {
		productsBlock.appendChild(res);
		res.classList.remove('bought');
		priceBlock.style.display = 'block';
		balance += parseInt(priceBlock.textContent);
		balanceBlock.innerHTML = balance + '$';
	}
});