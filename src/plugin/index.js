let utils = {
    'jsonSort': (options)=>{
        let arrKey = Object.keys(options);
        let arrValue = [];
        if(options.type == 'days'){
            arrKey.sort(function (n1, n2){
                let arr = n1.split('-');
                let arr2 = n2.split('-');
                let oDate = new Date();
                let oDate2 = new Date();
                oDate.setFullYear(arr[0],arr[1],arr[2]);
                oDate2.setFullYear(arr2[0],arr2[1],arr2[2]);
                return oDate.getTime()-oDate2.getTime();
            });
            for(let name in options.json){
                arrKey.forEach(v => {
                    if(name == v){
                        arrValue.push(options.json[name]);
                    }
                });
            }
        }else if(options.type == 'hours'){
            arrKey.sort(function (n1, n2){
                return n1 - n2;
            });
            for(let name in options.json){
                arrKey.forEach(v => {
                    if(name == v){
                        arrValue.push(parseInt(options.json[name]));
                    }
                });
            }
            arrKey.forEach(function (v, i, arr) {
                arr[i] = utils.zeroFill(parseInt(v)) + ':00';
            });
        }
        return options.value == 'key' ? arrKey : arrValue;
    },
    'zeroFill': (n)=>{
        return n > 9 ? ' ' + n : ' 0' + n;
    },
    'getCharData' : (n, arr)=>{
        let res = {};
        let dateList = [];
        let categoriesArr = [];
        if(n == 1){
            arr.sort(function (obj1, obj2){
                return obj1.key - obj2.key;
            });
            arr.forEach(v=>{
                let hours = utils.zeroFill(new Date(v.key).getHours());
                // let oDate = +new(key);
                dateList.push(hours + ':00');
                categoriesArr.push(parseInt(v.doc_count));
            });
        }else{
            arr.sort(function (obj1, obj2){
                return obj1.key - obj2.key;
            });
            arr.forEach(v=>{
                dateList.push(v.key_as_string.substring(0, 10));
                categoriesArr.push(parseInt(v.doc_count));
            });
        }
        res.keys = dateList;
        res.values = categoriesArr;
        return res;
    }
};
export default utils;