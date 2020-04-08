const shoppingForm = document.querySelector('form');
const list = document.querySelector('.list');

// an array to hold our state
const items = [];

// prettier-ignore

function handleSubmit(e) {
	e.preventDefault();
	const name = e.target.item.value;
	
	// if it's empty, don't do anything
	if(!name) return;

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
  const html = items
    .map(
      (item) => `<li class="shopping-item">
				<input type="checkbox" value={item.complete} >
				<span class="name">${item.name}</span>
				<button aria-label="Remove ${item.name}">&times;</button>
			</li>`
    )
    .join("");


  list.innerHTML = html;
  console.log(list);
}

shoppingForm.addEventListener('submit', handleSubmit);
