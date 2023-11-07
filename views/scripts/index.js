window.onload = function(){
  let table = document.getElementById('myTable');
  for(let i of table.rows){
    if(table.rows[0]===i){
      continue;
    }
    console.log(i.lastChild.previousSibling.dataset.cid);
  }
}

async function gotocandle(event, cid){
  console.log(event.target.parent);
  if(event.target.tagName==="BUTTON" || event.target.parentElement.tagName==="BUTTON"){
    return;
  }
  else {
    window.location.href = "/ViewCandle?cid="+cid;
  }
}

async function deleteCandle(element){
  let base_url = window.location.origin;
  let cid = element.dataset.cid;
  if(!confirm("Delete this candle?")){
    return;
  }
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