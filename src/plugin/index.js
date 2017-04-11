let utils = {
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