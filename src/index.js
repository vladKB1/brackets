module.exports = function check(str, bracketsConfig) {
    let n = bracketsConfig.length; 
    let m = str.length;  
    let pos = new Array(n);
    let same = new Array(n);
    let pref = new Array(n);
    let types = {};
    

    for (let i = 0; i < n; i++) {        
        types[bracketsConfig[i][0]] = i;
        pos[i] = new Array();
        if (bracketsConfig[i][0] === bracketsConfig[i][1]) {
            same[i] = true;
        } else {
            same[i] = false;
            types[bracketsConfig[i][1]] = -i - 1;            
        }
    }
    

    for (let i = 0; i < n; i++) {
        pref[i] = new Array(str.length);
        for (let j = 0; j < str.length; j++) {
            pref[i][j] = 0;
        }
    }

    for (let i = 0; i < str.length; i++) {  
        for (let j = 0; j < bracketsConfig.length; j++) {
            if (i != 0) pref[j][i] = pref[j][i - 1];            
            if (str[i] === bracketsConfig[j][0]) {
                pref[j][i]++;
            } else if (str[i] === bracketsConfig[j][1] && !same[j]) {
                pref[j][i]--;
            }
        }
    }

    for (let i = 0; i < m; i++) {
        let type = types[str[i]];                      

        if (same[type]) { 
            let right = true; 

            if (pos[type].length != 0) {                     
                for (let j = 0; j < n; j++) if (j != type && same[j]) {
                    let count = pref[j][i] - pref[j][pos[type][pos[type].length - 1]];
                    if (count % 2 != 0) {
                        right = false;
                        break;
                    }
                }               
            } 

            if (right && pos[type].length != 0) {
                pos[type].pop();
            } else {
                pos[type].push(i);
            }
        } else {
            if (type < 0) {                
                type++;
                type = Math.abs(type);                

                if (pos[type].length === 0) {
                    return false;                    
                }
            

                for (let j = 0; j < n; j++) if (type != j) {            
                    let count = pref[j][i] - pref[j][pos[type][pos[type].length - 1]];
                    if ((same[j] && count % 2 != 0) || (!same[j] && count != 0)) {
                        return false;                        
                    }
                }

                pos[type].pop();
            } else pos[type].push(i);            
        }
    }

    for (let i = 0; i < n; i++) if (pos[i].length != 0) {
        return false;
    }

    return true;
}
