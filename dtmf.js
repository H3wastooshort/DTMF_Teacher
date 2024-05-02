
const ac = new AudioContext();
var osc1;
var osc2;

let fisrt_tone=true;
function play_tone(f1,f2) {
  osc1 = ac.createOscillator();
  osc2 = ac.createOscillator();
  osc1.connect(ac.destination);
  osc2.connect(ac.destination);
  
  osc1.frequency.value=f1;
  osc2.frequency.value=f2;
  
  ac.resume();

  osc1.start();
  osc2.start();
  
  if (f1>10) osc1.stop(ac.currentTime+1);
  if (f2>10) osc2.stop(ac.currentTime+1);
  
}

function btn_correct(btn) {
	
}

function btn_incorrect(btn) {
	
}

function random_element(arr) {
	return arr[Math.round(Math.random()*(arr.length-1))];
}

function add_btns_2d(ele,row,col,arr,ans) {
	for (let i = 0; i < arr.len; i++) {
		let x = arr[x];
		let btn = document.createElement('button');
		if (x==ans) btn.onclick=btn_correct;
		else btn.onclick=btn_incorrect;
		btn.innerText = x;
		if (row<0) btn.style.grid_row = i;
		else btn.style.grid_row = row;
		if (col<0) btn.style.grid_column = i;
		else btn.style.grid_column = col;
		ele.appendChild(btn);
	}
}

function make_quiz_page(mode) {
  answers.childNodes.forEach(e=>{e.remove()});
  switch (mode) {
    case 'just_rows': {
      let row = Math.round(Math.random()*keys_by_row_col.length);
      let row_arr = keys_by_row_col[row];
      let key = random_element(row_arr);
      add_btns_2d(answers,-1,1,row_arr,key);
    } break;
    case 'just_cols': {
      let col = Math.round(Math.random()*keys_by_col_row.length);
      let col_arr = keys_by_col_row[col];
      let key = random_element(col_arr);
      add_btns_2d(answers,1,-1,col_arr,key);
    } break;
  }
}

