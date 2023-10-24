window.onload = function() {
  let wax = document.querySelectorAll('.wtype');
  
}

function insertWax(){
  let waxrow = document.getElementById('waxrow');
  let newrow = waxrow.cloneNode(true);
  waxrow.parentNode.insertBefore(newrow, waxrow.nextSibling);
}

function insertWick(){
  let wickrow = document.getElementById('wickrow');
  let newrow = wickrow.cloneNode(true);
  wickrow.parentNode.insertBefore(newrow, wickrow.nextSibling);
}

function insertFO(){
  let fragrancerow = document.getElementById('fragrancerow');
  let newrow = fragrancerow.cloneNode(true);
  fragrancerow.parentNode.insertBefore(newrow, fragrancerow.nextSibling);
}