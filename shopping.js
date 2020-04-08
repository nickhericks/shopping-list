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

	// clear the form
	e.target.reset();

	// we don't want to tightly couple displayItems function with handleSubmit function because we will also need to update the listed events on the page when someone completes and event or deletes an event. Instead of running displayItems in each of those functions, we will instead create our own custom event, then listen for that custom event.
	// displayItems();

	// fire off a custom event that will tell anyone else who cares that the items have been updated.
	list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
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
}

function mirrorToLocalStorage() {
	console.log('saving items to localstorage');
	localStorage.setItem('items', JSON.stringify(items));
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);