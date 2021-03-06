let order = 1;
let adding = false;

const error = document.querySelector('.error');
const message = 'Please add a description.';

const add_btn = document.querySelector('.add');
add_btn.addEventListener('click', () => {
  const target = document.querySelector('#requested');
  if (adding == false) {
    adding = true;
    target.appendChild(create_item());
  } else {
    error.innerHTML = message;
  }
});

const create_item = () => {
  let item = document.createElement('div');
  item.classList.add('item');
  item.id = 'item-' + order;
  item.draggable = true;

  // defines an event listener for dragstart
  item.addEventListener( 'dragstart', event =>
    event.dataTransfer.setData('text', event.target.id) );

  // define an event listener for drag end
  item.addEventListener('dragend', event =>
    event.dataTransfer.clearData() );

  // add an input child element to item
  let input = document.createElement('input');
  item.appendChild(input);

  // add the save button element to the document
  let save_btn = document.createElement('button');
  save_btn.innerHTML = 'Save';

  // add an event listener for the save button
  save_btn.addEventListener('click', () =>{
    error.innerHTML = '';
    if(input.value !== '')
    {
      order += 1;
      item.innerHTML = input.value;
      adding = false;
    }
    else {
      // in case of empty input ask for adding a description
      error.innerHTML = message;
    }
  });

  // append the save button to the item
  item.appendChild(save_btn);
  return item;
};

document.querySelectorAll('.drop').forEach(element => {

  // define the event listener for dropping element
  element.addEventListener('drop', event => {
    event.preventDefault();

    // save the text data of the element to the id variable
    let id = event.dataTransfer.getData('text');

    // append the dropped element
    event.target.appendChild(document.getElementById(id));
  });

  // add event listener for dragover of the element for prevent default
  element.addEventListener('dragover', event => event.preventDefault() );
});
