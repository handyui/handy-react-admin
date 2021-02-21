import setprototypeof from  'setprototypeof';

Object.setPrototypeOf = setprototypeof;

// eslint-disable-next-line no-extend-native
// Function.prototype.inverse = function(){
//     for(var i = 0,j=this.length-1;i<j;i++,j--){
//         var s = this[i];
//         this[i] = this[j];
//         this[j] = s;
//         if(i>=j){ //从数组的第一项和最后一项进行调换//换到中间停止交换
//             break;
//         }
//     }
//     return this;//返回新数组
// }