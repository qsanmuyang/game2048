var board=new Array();
var indexd=0;
var indexm=0;
var score=0;
$(function(){
	newgame();
})
function newgame(){
	init();
	insertNum();
	insertNum();
	updateBoardView();
	
}
function init(){
	for(var i=0;i<4;i++){
		board[i]=new Array();
		for(var j=0;j<4;j++){
			board[i][j]=0;
			$("#grid-cell-"+i+"-"+j).css("top",(20+120*i)+"px");
			$("#grid-cell-"+i+"-"+j).css("left",(20+120*j)+"px");
		}
	}
	score=0;
}
function updateBoardView(){
	$(".number-cell").remove();
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			$("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
			if(board[i][j]==0){
	$("#number-cell-"+i+"-"+j).css("width","0px");
	$("#number-cell-"+i+"-"+j).css("height","0px");
	}else{
	$("#number-cell-"+i+"-"+j).css("top",(20+120*i)+"px");
	$("#number-cell-"+i+"-"+j).css("left",(20+120*j)+"px");
	$("#number-cell-"+i+"-"+j).css("height","100px");
	$("#number-cell-"+i+"-"+j).css("width","100px");
	$("#number-cell-"+i+"-"+j).css("height","100px");
	$("#number-cell-"+i+"-"+j).css("background-color",getNumberBackgroundColor(board[i][j]));
	$("#number-cell-"+i+"-"+j).css("color",getNumberColor(board[i][j]));
	$("#number-cell-"+i+"-"+j).text(board[i][j]);
			}
		}
		$("#score").text(score);
		if(!nospace()&&!iscanMove()){
		$("#score").text("GameOver");
		$("#getscore").text(score);
		$("#over").css("display","block");
		}
}
function setRandomNumber(){
	var rnumber=Math.random()<0.5 ? 2 : 4;
	return rnumber;
}
function insertNum(){
	if(!nospace()){
		return false;
	}
	var randomX=parseInt(Math.floor(Math.random()*4));
	var randomY=parseInt(Math.floor(Math.random()*4));
	while(board[randomX][randomY]>=0){
		if(board[randomX][randomY]==0){
		board[randomX][randomY]=setRandomNumber();
		break;
	}
var randomX=parseInt(Math.floor(Math.random()*4));
var randomY=parseInt(Math.floor(Math.random()*4));

}
}

function getNumberBackgroundColor(number){
	switch (number) {
		case 2: return '#eee4da'; break;
		case 4: return '#ede0c8'; break;
		case 8: return '#f2b179'; break;
		case 16: return '#f59563'; break;
		case 32: return '#f67c5f'; break;
		case 64: return '#f65e3b'; break;
		case 128: return '#edcf72'; break;
		case 256: return '#edcc61'; break;
		case 512: return '#9c0'; break;
		case 1024: return '#33b5e5'; break;
		case 2048: return '#09c'; break;
		case 4096: return '#a6c'; break;
		case 8192: return '#93c'; break;
	}
	return 'black';
}
function getNumberColor(number){
	if(number < 4){
		return '#776e65';
	}else{
		return "white";
	}
}
function nospace(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0){
				return true;
			}
		}
}
return false;
}
function moveLeft(){
	if(!canmoveLeft()){
		return false;
	}
	for(var i=0;i<4;i++){
		indexm=0;
		indexd=0;
		for(var j=1;j<4;j++){
			if(board[i][j]!==0){
				for(var k=0;k<j;k++){
					if(board[i][k]==0&&noBlock(i,k,j)){
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						break;
					}else if(board[i][k]==board[i][j]&&noBlock(i,k,j)){
						if(board[i][k]!=(indexm+indexd)){
						printscore(board[i][j]);
						showMoveAnimation(i,j,i,k);
						indexm=board[i][k];
						indexd=board[i][j];
						board[i][k]+=board[i][j];
						board[i][j]=0;
						break;
					}else{
						showMoveAnimation(i,j,i,k+1);
						board[i][k+1]=board[i][j];
						board[i][j]=0;
						break;
					}
					}
				}
			}
		}
	}
		setTimeout("updateBoardView()",300);
		return true;
}
function noBlock(row,col1,col2){
	for(var i=col1+1;i<col2;i++){
		if(board[row][i]!=0){
			return false;
		}
	}
	return true;
}
function showMoveAnimation(fromX,fromY,topX,topY){
var $numberCell=$("#number-cell-"+fromX+"-"+fromY);
$numberCell.animate({
	top:20+120*topX,
	left:20+120*topY
},200);
}
function canmoveLeft(){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				if(board[i][j-1]==0 || board[i][j]==board[i][j-1]){
					return true;
				}
			}
		}
	}
	return false;
}
function moveRight(){
	if(!canmoveRight()){
		return false;
	}
	for(var i=0;i<4;i++){
		indexm=0;
		indexd=0;
		for(var j=2;j>=0;j--){
			if(board[i][j]!==0){
				for(var k=3;k>=j+1;k--){
					if(board[i][k]==0&&noBlockr(i,k,j)){
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						break;
					}else if(board[i][k]==board[i][j]&&noBlockr(i,k,j)){
						if(board[i][k]!=(indexm+indexd)){
							printscore(board[i][j]);
							showMoveAnimation(i,j,i,k);
							indexm=board[i][k];
							indexd=board[i][j];
						             board[i][k]+=board[i][j];
						             board[i][j]=0;
						             break;
					}else{
						showMoveAnimation(i,j,i,k-1);
						board[i][k-1]=board[i][j];
						board[i][j]=0;
						break;
					}
					}
				}
			}
		}
	}
		setTimeout("updateBoardView()",300);
		return true;
}
function canmoveRight(){
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
			if(board[i][j]!=0){
				if(board[i][j+1]==0 || board[i][j]==board[i][j+1]){
					return true;
				}
			}
		}
	}
	return false;
}
function noBlockr(row,col1,col2){
	for(var i=col2+1;i<col1;i++){
		if(board[row][i]!=0){
			return false;
		}
	}
	return true;
}
function moveTop(){
	if(!canmoveTop()){
		return false;
	}
	for(var j=0;j<4;j++){
		indexm=0;
		indexd=0;
		for(var i=1;i<4;i++){
			if(board[i][j]!==0){
				for(var k=0;k<i;k++){
					if(board[k][j]==0&&noBlockt(j,k,i)){
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						break;
					}else if(board[k][j]==board[i][j]&&noBlockt(j,k,i)){
						if(board[k][j]!=(indexd+indexm)){
						printscore(board[i][j]);
						showMoveAnimation(i,j,k,j);
						indexd=board[i][j];
						indexm=board[k][j];
						board[k][j]+=board[i][j];
						board[i][j]=0;
						break;
					}else{
						showMoveAnimation(i,j,k+1,j);
						board[k+1][j]=board[i][j];
						board[i][j]=0;
						break;
					}
					}
				}
			}
		}
	}
		setTimeout("updateBoardView()",300);
		return true;
}
function canmoveTop(){
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){
				if(board[i-1][j]==0 || board[i-1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
function noBlockt(col,row1,row2){
	for(var i=row1+1;i<row2;i++){
		if(board[i][col]!=0){
			return false;
		}
	}
	return true;
}
function moveBottom(){
	if(!canmoveBottom()){
		return false;
	}
	for(var j=0;j<4;j++){
		indexm=0;
		indexd=0;
		for(var i=2;i>=0;i--){
			if(board[i][j]!==0){
				for(var k=3;k>i;k--){
					if(board[k][j]==0&&noBlockb(j,k,i)){
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						break;
					}else if(board[k][j]==board[i][j]&&noBlockb(j,k,i)){
						if(board[k][j]!=(indexd+indexm)){
						printscore(board[i][j]);
						showMoveAnimation(i,j,k,j);
						indexm=board[k][j];
						indexd=board[i][j];
						board[k][j]+=board[i][j];
						board[i][j]=0;
						break;
					}else{
						showMoveAnimation(i,j,k-1,j);
						board[k-1][j]=board[i][j];
						board[i][j]=0;
						break;
					}
					}
				}
			}
		}
	}
		setTimeout("updateBoardView()",300);
		return true;
}
function canmoveBottom(){
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(board[i][j]!=0){
				if(board[i+1][j]==0 || board[i+1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
function noBlockb(col,row1,row2){//j k i
	for(var i=row2+1;i<row1;i++){
		if(board[i][col]!=0||board[row2][col]==0){
			return false;
		}
	}
	return true;
}
$(document).keydown(function(event){
        switch(event.keyCode){
            case 37:
            if(moveLeft()){
            	insertNum();
            }
            break;            
            case 38:
            if(moveTop()){
            	insertNum();
            }
            break;
            case 39:
            if(moveRight()){
            	insertNum();
            }
            break;
            case 40:
            if(moveBottom()){
            	insertNum();
            }
            break;
        }
       })
function restart(){
	newgame();
	$("#over").css("display","none");
}
function printscore(num1){
	switch(num1){
		case 2:
		score+=10;
		break;
		case 4:
		score+=20;
		break;
		case 8:
		score+=50;
		break;
		case 16:
		score+=100;
		break;
		case 32:
		score+=200;
		break;
		case 64:
		score+=400;
		break;
		case 128:
		score+=800;
		break;
		case 256:
		score+=1600;
		break;
		case 512:
		score+=3200;
		break;
		case 1024:
		score+=6400;
		break;
		default:
		break;
	}
}
function iscanMove(){
	if(canmoveLeft()||canmoveRight()||canmoveTop()||canmoveBottom()){
		return true;
	}else{
		return false;
	}
}