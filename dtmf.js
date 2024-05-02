var current_mode = 'none';

function next_quiz() {
	make_quiz_page(current_mode);
}

function change_mode(mode) {
	current_mode=mode;
	teacher.style.display='initial';
	next_quiz();
}

const ac = new AudioContext();
var osc1;
var osc2;

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
var current_tone = [0,0];
function play_current_tone() {
	play_tone(current_tone[0],current_tone[1]);
}


function disable_btns(ele = answers) {
	let btns = ele.getElementsByTagName('button');
	for (let i=0; i<btns.length; i++) {
		let btn = btns[i];
		btn.disabled=true;
		if (btn.classList.length == 0) btn.classList.add('disabled_answer');
	}
}

function btn_correct(e) {
	e.target.classList.add('correct_answer');
}

function btn_incorrect(e) {
	e.target.classList.add('incorrect_answer');
}

function random_element(arr) {
	return arr[Math.round(Math.random()*(arr.length-1))];
}

function add_btns_1d(ele,row,col,arr,ans) {
	for (let i = 0; i < arr.length; i++) {
		let x = arr[i];
		let btn = document.createElement('button');
		if (x==ans) btn.onclick=btn_correct;
		else btn.onclick=btn_incorrect;
		btn.innerText = x;
		if (row<0) btn.style.gridRow = i;
		else btn.style.gridRow = row;
		if (col<0) btn.style.gridColumn = i;
		else btn.style.gridColumn = col;
		ele.appendChild(btn);
	}
}

function set_tone(key_name) {
	let key = keys_by_key[key_name];
	let f1 = tone_rows_regular[key.row];
	let f2 = tone_cols_regular[key.col];
	current_tone = [f1,f2]
}

function make_quiz_page(mode) {
  answers.innerHTML="";
  switch (mode) {
    case 'rows':
    case 'just_rows': {
      let row = Math.round(Math.random()*(keys_by_row_col.length-1));
      let row_arr = keys_by_row_col[row];
      let key = random_element(row_arr);
      add_btns_1d(answers,-1,1,row_arr,key);
	  set_tone(key);
	  if (mode == 'just_rows') current_tone[0] = 0;
    } break;
    case 'cols':
	case 'just_cols': {
      let col = Math.round(Math.random()*(keys_by_col_row.length-1));
      let col_arr = keys_by_col_row[col];
      let key = random_element(col_arr);
      add_btns_1d(answers,1,-1,col_arr,key);
	  set_tone(key);
	  if (mode == 'just_cols') current_tone[1] = 0;
    } break;
	default: console.error("make_quiz_page() case not covered"); break;
  }
}

