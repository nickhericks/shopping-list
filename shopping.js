const shoppingForm = document.querySelector('form');
const list = document.querySelector('.list');

// an array to hold our state
const items = [];


function handleSubmit(e) {
	e.preventDefault();
	const name = e.target.item.value;
	
	const item = {
		name,
		id: Date.now(),
		complete: false
	};

	items.push(item);
	console.log(`There are not ${items.length} items in your cart.`);

	// clear the form
	e.target.reset();
	displayItems();
}

function displayItems() {
	console.log(items);
	const html = items.map( item => `<li class="shopping-item">
		${item.name}
		
	</li>` ).join('');

	list.innerHTML = html;
	console.log(list);

}


shoppingForm.addEventListener('submit', handleSubmit);