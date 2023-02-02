/**
 * @description  throttle 节流函数
 * @param {function} fn 需要节流的函数
 * @param {number} delay 间隔时间(默认500ms)
 * @returns 节流后的函数
 */
// * 函数
export function throttle(fn: Function, delay: number = 500) {

}


// *类
// export class Throttle {
//     private timer: null | NodeJS.Timeout = null
//     private stop: boolean = false
//     private death: boolean = false
//     /**
//      * @param func 需要包装的函数
//      * @param delay 延迟时间，单位ms
//      * @param immediate 是否默认执行一次(第一次不延迟)
//      */
//     public use(func: Function, delay: number, immediate: boolean = false): Function {
//         let flag = true
//         const _this = this
//         return (...args: any) => {
//             if (this.death) {
//                 func.apply(this, args)
//                 return
//             }
//             if (this.stop) {
//                 func.apply(this, args)
//                 return
//             }
//             if (immediate) {
//                 func.apply(this, args)
//                 immediate = false
//                 return
//             }
//             if (!flag) {
//                 return
//             }
//             flag = false
//             _this.timer = setTimeout(() => {
//                 func.apply(this, args)
//                 flag = true
//             }, delay)
//         }
//     }

//     // 销毁
//     public destroy() {
//         this.death = true
//         this.stop = true
//         if (!!this.timer) {
//             clearTimeout(this.timer)
//             this.timer = null
//         }
//     }
//     // 开启
//     public open() {
//         if (!this.death) {
//             this.stop = false
//         }
//     }
//     // 关闭
//     public close() {
//         this.stop = true
//     }
// }