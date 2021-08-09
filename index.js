var alphabetBoard = new Array(5);
for (var i = 0; i < alphabetBoard.length; i++){
    alphabetBoard[i] = new Array(5);
}

var oddFlag = false;
var decdec = "";
var zCheck = "";
var decryption;
var encryption;           
var blankCheck = "";

function main(){
    var eng = /[a-zA-Z]/;

    var key = document.getElementById('key').value; 
    var str = document.getElementById('str').value; 

    for(var i = 0; i < key.length; i++){
        if(eng.test(key[i]) == false && key[i] != " " && isNaN(key) == true){
            alert('영어만 입력하세요');
            return;
        }
    }
    
    for(var i = 0; i < str.length; i++){
        if(eng.test(str[i]) == false && str[i] != " " && isNaN(str) == true){
            alert('영어만 입력하세요');
            return;
        }
    }

    setBoard(key);

    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) == ' ') {
            str = str.substring(0, i) + str.substring(i + 1, str.length); 
            blankCheck += 10;   
        }
        else {
            blankCheck += 0;
        }
        if (str.charAt(i) == 'z') 
        {
            str = str.substring(0, i) + 'q' + str.substring(i + 1, str.length); 
            zCheck += 1;
        }
        else {
            zCheck += 0;
        }
    }

    encryption = strEncryption(str);

    document.write('<center>');
    document.write("<br>암호화된 고백 : " + encryption);

    for (var i = 0; i < encryption.length; i++) {
        if (encryption.charAt(i) == ' ')
            encryption = encryption.substring(0, i) + encryption.substring(i + 1, encryption.length);
    }
}

function find(){
    var eng = /[a-zA-Z]/;

    var key = document.getElementById('key').value; 
    var str = document.getElementById('str').value; 

    for(var i = 0; i < key.length; i++){
        if(eng.test(key[i]) == false && key[i] != " " && isNaN(key) == true){
            alert('영어만 입력하세요');
            return;
        }
    }
    
    for(var i = 0; i < str.length; i++){
        if(eng.test(str[i]) == false && str[i] != " " && isNaN(str) == true){
            alert('영어만 입력하세요');
            return;
        }
    }

    setBoard(key);

    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) == ' ') 
        {
            str = str.substring(0, i) + str.substring(i + 1, str.length); 
            blankCheck += 10;  
        }
        else {
            blankCheck += 0; 
        }
        if (str.charAt(i) == 'z') 
        {
            str = str.substring(0, i) + 'q' + str.substring(i + 1, str.length); 
            zCheck += 1;
        }
        else {
            zCheck += 0;
        }
    }

    encryption = strEncryption(str);

    for (var i = 0; i < encryption.length; i++) {
            encryption = encryption.substring(0, i) + encryption.substring(i + 1, encryption.length);
    }

    decryption = strDecryption(key, encryption, zCheck);
    
    for (var i = 0; i < decryption.length; i++) {
            if (blankCheck.charAt(i) == '1') {
                decryption = decryption.substring(0, i) + " " + decryption.substring(i, decryption.length);
            }
        }

    document.write('<center>'); 
    document.write("<br>복호된 고백 : " + decryption);
    document.write('</center>');

}

//암호화
function strEncryption(str) {  
    str = str.toLowerCase();  
    var playFair = []; 
    var encPlayFair = []; 
    var x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    var encStr = ""; 

    for(var i=0; i<str.length; i+=2) { 
        var tmpArr = new Array(2);
        tmpArr[0] = str.charAt(i);
        if(str.charAt(i) == str.charAt(i+1)) { 
            tmpArr[1] = 'x'; 
            i--; 
        }else{
            tmpArr[1] = str.charAt(i+1);  
        }

        if(i == str.length-1) {  
            tmpArr[1] = 'x';   
            oddFlag = true; 
        }

        playFair.push(tmpArr);

        
    }


    for(var i=0; i<playFair.length; i++) {
        var tmpArr2 = new Array(2);
        for(var j=0; j<alphabetBoard.length; j++) { 
            for(var k=0; k<alphabetBoard[j].length; k++) {  
                if(alphabetBoard[j][k] === playFair[i][0]) {    
                    x1 = j; 
                    y1 = k; 
                }
                if(alphabetBoard[j][k] === playFair[i][1]) {   
                    x2 = j; 
                    y2 = k; 
                }
            }
        }

        if(x1 === x2) { 
            tmpArr2[0] = alphabetBoard[x1][(y1+1)%5];   
            tmpArr2[1] = alphabetBoard[x2][(y2+1)%5];   
        }else if(y1 === y2) {   
            tmpArr2[0] = alphabetBoard[(x1+1)%5][y1];  
            tmpArr2[1] = alphabetBoard[(x2+1)%5][y2];  
        }else { 
            tmpArr2[0] = alphabetBoard[x2][y1];
            tmpArr2[1] = alphabetBoard[x1][y2];
        }
        encPlayFair.push(tmpArr2);
    }

    for(var i=0; i<encPlayFair.length; i++) {   
        encStr += encPlayFair[i][0] + "" + encPlayFair[i][1] + " ";
    }

    return encStr;
}
    
//복호화
function strDecryption(encryption, zCheck) {  
    var playFair = new Array(); 
    var decPlayFair = new Array(); 
    var x1 = 0 , x2 = 0 , y1 = 0, y2 = 0; 
    var decStr ="";
    
    for( var i = 0 ; i < encryption.length ; i+=2 ) {
        var tmpArr = new Array(2);
        tmpArr[0] = encryption.charAt(i);
        tmpArr[1] = encryption.charAt(i+1);
        playFair.push(tmpArr); 
    }

    for(var i = 0 ; i < playFair.length ; i++ ) {
        var tmpArr = new Array(2);
        for( var j = 0 ; j < alphabetBoard.length; j++ ){
            for( var k = 0 ; k < alphabetBoard[j].length ; k++ ){
                if(alphabetBoard[j][k] == playFair[i][0]){
                    x1 = j; 
                    y1 = k; 
                }
                if(alphabetBoard[j][k] == playFair[i][1]) {
                    x2 = j; 
                    y2 = k; 
                }
            }
        }
        
        if(x1==x2) {
            tmpArr[0] = alphabetBoard[x1][(y1+4)%5];
            tmpArr[1] = alphabetBoard[x2][(y2+4)%5];
        } else if(y1==y2) {
            tmpArr[0] = alphabetBoard[(x1+4)%5][y1];
            tmpArr[1] = alphabetBoard[(x2+4)%5][y2];
        } else {
            tmpArr[0] = alphabetBoard[x2][y1];
            tmpArr[1] = alphabetBoard[x1][y2];
        }
   
        decPlayFair.push(tmpArr);
    }
            
    for(var i = 0; i<playFair.length; i++){
        console.log(playFair.get(i)[0] +""+playFair.get(i)[1]+" ");
    }
    console.log(" ");
   
    for(var i = 0; i < decPlayFair.length; i++) {
        if(i != decPlayFair.length-1 && decPlayFair[i][1]=='x'&& decPlayFair[i][0]==decPlayFair[i][0]){	
            decStr += decPlayFair[i][0];    
        } else {
            decStr += decPlayFair[i][0] + "" + decPlayFair[i][1];   
        }
    }
    
    for(var i = 0; i < zCheck.length; i++ ) {
        if( zCheck.charAt(i) == '1' ) {
             decStr = decStr.substring(0,i)+'z'+decStr.substring(i+1,decStr.length);
        }            
    }
    
    if(oddFlag) decStr = decStr.substring(0,decStr.length-1);
    
    for(var i = 0 ; i < decStr.length; i++){
			if(i%2==lengthOddFlag){
				decStr = decStr.substring(0, i+1)+" "+decStr.substring(i+1, decStr.length);
				i++;
				lengthOddFlag = ++lengthOddFlag %2;
			}
		}

    return decStr;
}

function setBoard(key) {
    var keyForSet = "";					
    var duplicationFlag = false;		
    var keyLengthCount = 0;					

    key += "abcdefghijklmnopqrstuvwxyz"; 	

    for (var i = 0; i < key.length; i++) {
        for (var j = 0; j < keyForSet.length; j++) {
            if (key.charAt(i) == keyForSet.charAt(j)) {
                duplicationFlag = true;
                break;
            }
        }
        if (!(duplicationFlag)) keyForSet += key.charAt(i);
        duplicationFlag = false;
    }

    for (var i = 0; i < alphabetBoard.length; i++) {
        for (var j = 0; j < alphabetBoard[i].length; j++) {
            alphabetBoard[i][j] = keyForSet.charAt(keyLengthCount++);
        }
    }

    document.write('<center>');
    document.write('<table border="5" width = "400px"; height = "400px" " bordercolor = "#1aab63"');
    document.write('<tbody>');

    for (var i = 0; i < alphabetBoard.length; i++) {
        for (var j = 0; j < alphabetBoard[i].length; j++) {
            document.write('<td>' + '<center>' + alphabetBoard[i][j] + '</td>');
        }
        document.write("<br>");
        document.write('</tr>');
    }
    document.write('</tbody>');
    document.write('</table>');
    document.write('</center>');
}