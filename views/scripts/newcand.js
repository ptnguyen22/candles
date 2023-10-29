window.onload = function () {
  let wax = document.querySelectorAll(".wtype");
  document.getElementById('mydate').valueAsDate = new Date();
  addEventListener("submit", (event) => {
    let form = document.getElementById("mainform");
    form.style.display = "none";
    document.body.style.backgroundColor = 'black';
    let canvas = document.getElementById("fireworks");
    canvas.style.display = 'block';
    setTimeout(function(){
      document.location.href = "/";
    },2500);
  });
};

function insertWax() {
  let waxrow = document.getElementById("waxrow");
  let newrow = waxrow.cloneNode(true);
  waxrow.parentNode.insertBefore(newrow, waxrow.nextSibling);
}

function removeWax() {
  let waxes = document.querySelectorAll(".waxesrow");
  if(waxes.length===1){
    return;
  }
  waxes[waxes.length-1].remove();
}

function insertFO() {
  let fragrancerow = document.getElementById("fragrancerow");
  let newrow = fragrancerow.cloneNode(true);
  fragrancerow.parentNode.insertBefore(newrow, fragrancerow.nextSibling);
}