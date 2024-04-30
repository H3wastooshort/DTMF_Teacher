const tone_rows_regular = [697,770,852,941];
const tone_cols_regular = [1209,1336,1477,1633];

const keys_by_key = {
  '1' : {'col':0,'row':0},
  '2' : {'col':1,'row':0},
  '3' : {'col':2,'row':0},
  '4' : {'col':0,'row':1},
  '5' : {'col':1,'row':1},
  '6' : {'col':2,'row':1},
  '7' : {'col':0,'row':2},
  '8' : {'col':1,'row':2},
  '9' : {'col':2,'row':2},
  '*' : {'col':0,'row':3},
  '0' : {'col':1,'row':3},
  '#' : {'col':2,'row':3},
  
  'A' : {'col':3,'row':0},
  'B' : {'col':3,'row':1},
  'C' : {'col':3,'row':2},
  'D' : {'col':3,'row':3}
};

const keys_by_row_col = function(){
	let arr=[];
	for (const [k,v] of Object.entries(keys_by_key)) {
		if (arr[v.row] == undefined) arr[v.row] = [];
		if (arr[v.row][v.col] == undefined) arr[v.row][v.col] = [];
		arr[v.row][v.col]=k;
	}
	return arr;
}();

const keys_by_col_row = function(){
	let arr=[];
	for (const [k,v] of Object.entries(keys_by_key)) {
		if (arr[v.col] == undefined) arr[v.col] = [];
		if (arr[v.col][v.row] == undefined) arr[v.col][v.row] = [];
		arr[v.col][v.row]=k;
	}
	return arr;
}();
