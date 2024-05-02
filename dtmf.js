var current_mode = 'none';
var correct_counter = 0;
var incorrect_counter = 0;

function next_quiz() {
	stop_tone();
	make_quiz_page(current_mode);
}

function change_mode(mode) {
	current_mode=mode;
	teacher.style.display='initial';
	next_quiz();
	correct_counter = 0;
	incorrect_counter = 0;
}

var current_correct_btn=' ';

const ac = new AudioContext();
var osc1;
var osc2;

function stop_tone() {
	try {osc1.stop();} catch (e){}
	try {osc2.stop();} catch (e){}
}
window.onmouseup = stop_tone;

function play_tone(f1,f2) {
  stop_tone();
  
  osc1 = ac.createOscillator();
  osc2 = ac.createOscillator();
  osc1.connect(ac.destination);
  osc2.connect(ac.destination);
  
  osc1.frequency.value=f1;
  osc2.frequency.value=f2;
  
  ac.resume();
  
  if (f1>10) osc1.start();
  if (f2>10) osc2.start();
  
}

function play_key_tone(key_name=current_correct_btn) {
	let key = keys_by_key[key_name];
	let f_row = tone_rows_regular[key.row];
	let f_col = tone_cols_regular[key.col];
	switch (current_mode) {
		case 'just_rows': play_tone(f_row,0); break;
		case 'just_cols': play_tone(0,f_col); break;
		default: play_tone(f_row,f_col); break;
	}
}

function disable_btns(ex = null, ele = answers) {
	let btns = ele.getElementsByTagName('button');
	for (let i=0; i<btns.length; i++) {
		let btn = btns[i];
		if (btn != ex) {
			btn.disabled=true;
			if (btn.classList.length == 0) btn.classList.add('disabled_answer');
		}
	}
}

function btn_correct(e) {
	let btn = e.target;
	btn.classList.add('correct_answer');
	play_key_tone(btn.innerText);
	disable_btns(btn);
	btn.onmousedown=next_quiz;
	correct_counter++;
	stats_correct.innerText=correct_counter;
}

function btn_incorrect(e) {
	let btn = e.target;
	btn.classList.add('incorrect_answer');
	play_key_tone(btn.innerText);
	incorrect_counter++;
	stats_incorrect.innerText=incorrect_counter;
}

function random_element(arr) {
	return arr[Math.round(Math.random()*(arr.length-1))];
}

function add_btns_1d(ele,row,col,arr,ans) {
	for (let i = 0; i < arr.length; i++) {
		let x = arr[i];
		let btn = document.createElement('button');
		btn.onmousedown = (x==ans) ? btn_correct : btn_incorrect;
		btn.innerText = x;
		if (row<0) btn.style.gridRow = i+1;
		else btn.style.gridRow = row;
		if (col<0) btn.style.gridColumn = i+1;
		else btn.style.gridColumn = col;
		ele.appendChild(btn);
	}
}

function make_quiz_page(mode=current_mode) {
  answers.innerHTML="";
  switch (mode) {
    case 'cols':
    case 'just_cols': {
      let row = 0; 
      if (mode == 'cols') row = Math.round(Math.random()*(keys_by_row_col.length-1));
      let row_arr = keys_by_row_col[row];
      let key = random_element(row_arr);
      add_btns_1d(answers,1,-1,row_arr,key);
      current_correct_btn=key;
    } break;
    case 'rows':
    case 'just_rows': {
      let col = 0;
      if (mode == 'rows') col = Math.round(Math.random()*(keys_by_col_row.length-1));
      let col_arr = keys_by_col_row[col];
      let key = random_element(col_arr);
      add_btns_1d(answers,-1,1,col_arr,key);
      current_correct_btn=key;
    } break;
    default: console.error("make_quiz_page() case not covered"); break;
  }
}

