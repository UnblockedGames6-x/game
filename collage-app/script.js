const canvas = new fabric.Canvas('c', {
  backgroundColor: '#ffffff'
});

function clearTemplate() {
  const tmpl = canvas.getObjects('rect');
  tmpl.forEach(o => canvas.remove(o));
}

function drawTwo() {
  clearTemplate();
  const w = canvas.width / 2;
  const h = canvas.height;
  const r1 = new fabric.Rect({left:0, top:0, width:w, height:h, fill:'', stroke:borderColor.value, strokeWidth:parseInt(borderWidth.value), selectable:false});
  const r2 = new fabric.Rect({left:w, top:0, width:w, height:h, fill:'', stroke:borderColor.value, strokeWidth:parseInt(borderWidth.value), selectable:false});
  canvas.add(r1, r2);
  canvas.sendToBack(r1);
  canvas.sendToBack(r2);
}

function drawFour() {
  clearTemplate();
  const w = canvas.width / 2;
  const h = canvas.height / 2;
  const rects = [];
  for(let i=0;i<2;i++){
    for(let j=0;j<2;j++){
      rects.push(new fabric.Rect({left:i*w, top:j*h, width:w, height:h, fill:'', stroke:borderColor.value, strokeWidth:parseInt(borderWidth.value), selectable:false}));
    }
  }
  rects.forEach(r => canvas.add(r));
  rects.forEach(r => canvas.sendToBack(r));
}

function drawThree() {
  clearTemplate();
  const w = canvas.width / 2;
  const h = canvas.height / 2;
  const r1 = new fabric.Rect({left:0, top:0, width:w, height:h*2, fill:'', stroke:borderColor.value, strokeWidth:parseInt(borderWidth.value), selectable:false});
  const r2 = new fabric.Rect({left:w, top:0, width:w, height:h, fill:'', stroke:borderColor.value, strokeWidth:parseInt(borderWidth.value), selectable:false});
  const r3 = new fabric.Rect({left:w, top:h, width:w, height:h, fill:'', stroke:borderColor.value, strokeWidth:parseInt(borderWidth.value), selectable:false});
  canvas.add(r1,r2,r3);
  canvas.sendToBack(r1);
  canvas.sendToBack(r2);
  canvas.sendToBack(r3);
}

const templateSelect = document.getElementById('templateSelect');
const bgColor = document.getElementById('bgColor');
const borderColor = document.getElementById('borderColor');
const borderWidth = document.getElementById('borderWidth');

templateSelect.addEventListener('change', () => {
  const val = templateSelect.value;
  if(val === 'two') drawTwo();
  if(val === 'four') drawFour();
  if(val === 'three') drawThree();
});

bgColor.addEventListener('change', () => {
  canvas.setBackgroundColor(bgColor.value, canvas.renderAll.bind(canvas));
});

borderColor.addEventListener('change', () => templateSelect.dispatchEvent(new Event('change')));
borderWidth.addEventListener('change', () => templateSelect.dispatchEvent(new Event('change')));


document.getElementById('imageLoader').addEventListener('change', function(e){
  const files = e.target.files;
  [...files].forEach(file => {
    const reader = new FileReader();
    reader.onload = function(f){
      fabric.Image.fromURL(f.target.result, img => {
        img.set({ left: 50, top: 50, cornerColor: 'blue', cornerSize:8 });
        img.scaleToWidth(200);
        canvas.add(img);
        canvas.setActiveObject(img);
      });
    };
    reader.readAsDataURL(file);
  });
});

function download(data, filename){
  const link = document.createElement('a');
  link.href = data;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.getElementById('exportPng').addEventListener('click', () => {
  const data = canvas.toDataURL({ format: 'png' });
  download(data, 'collage.png');
});

document.getElementById('exportJpg').addEventListener('click', () => {
  const data = canvas.toDataURL({ format: 'jpeg', quality: 1.0 });
  download(data, 'collage.jpg');
});

// Initialize default template
templateSelect.dispatchEvent(new Event('change'));
