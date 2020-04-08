const shoppingForm = document.querySelector('form');
const list = document.querySelector('.list');

// an array to hold our state
const items = [];


function handleSubmit(e) {
	e.preventDefault();
	console.log(e.target.item.value);
	const name = e.target.item.value;
	
}


shoppingForm.addEventListener('submit', handleSubmit);