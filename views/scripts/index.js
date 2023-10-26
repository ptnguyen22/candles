window.onload = function(){
  let table = document.getElementById('myTable');
  for(let i of table.rows){
    if(table.rows[0]===i){
      continue;
    }
    console.log(i.lastChild.previousSibling.dataset.cid);
  }
}

async function deleteCandle(element){
  console.log(element);
  let base_url = window.location.origin;
  let cid = element.dataset.cid;
  console.log(base_url);
  await fetch(`${base_url}/deletecandle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cid: cid
    })
  })
  location.reload();
}