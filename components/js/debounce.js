export default function debounce(fn, delay) {
    let timer = null;
    return function (this, ...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  } // 防抖函数