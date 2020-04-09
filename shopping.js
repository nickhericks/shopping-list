
// This is how all the frameworks work.
// You have some state. 
// Write a bunch of handlers to update, modify state.
// When that state changes, rerender the html on page.

// One security issue here for now is that we need to clean data before we let the user submit it so that they can't submit crazy code in the input box. Refer to wesbos security video for that tutorial.


const shoppingForm = document.querySelector('form');
const list = document.querySelector('.list');

// an array to hold our state
let items = [];

function handleSubmit(e) {
  e.preventDefault();
  const name = e.target.item.value;

  // if it's empty, don't do anything
  if (!name) return;

  const item = {
    name,
    id: Date.now(),
    complete: false,
  };
  console.log(items);
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
      item => `<li class="shopping-item">
        <input 
          value=${item.id} 
          type="checkbox"
          ${item.complete ? 'checked' : ''}
        >
				<span class="itemName">${item.name}</span>
        <button 
          aria-label="Remove ${item.name}"
          value="${item.id} "
        >&times;</button>
			</li>`
    )
    .join('');

  list.innerHTML = html;
}

function mirrorToLocalStorage() {
  console.log('saving items to localstorage');
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  console.log('Restoring from localStorage');
  // pull items from localStorage
  const lsItems = JSON.parse(localStorage.getItem('items'));
  console.log(lsItems);
  if (lsItems.length) {
    lsItems.forEach(item => items.push(item));
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function deleteItem(id) {
  // update items array without this one
  items = items.filter(item => item.id !== id);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markAsComplete(id) {
  const itemRef = items.find(item => item.id === id);
  console.log(itemRef);
  // since we don't know if we should be changing it from true to false or false to true we can use ! to set it to the opposite of whichever it currently is.
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handleSubmit);

// we've attached both of these functions to our custom event
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);

// event delegation: we listen for the click on the list <ul> but then delegate the click over to the button if that is what is clicked
list.addEventListener('click', function(e) {
  const id = parseInt(e.target.value);
  if(e.target.matches('button')) {
    deleteItem(id);
  }
  if(e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});

// grab data from browser's localStorage and populate shopping list on the page
restoreFromLocalStorage();
