import { useEffect, useRef } from 'react'
/**
 * 修改页面标题
 * @param title 标题
 */
export function useTitle(title: string) {
  useEffect(() => {
    window.document.title = title;
    let i = window.document.createElement('iframe');
    i.src = '/favicon.icon';
    i.style.display = 'none';
    i.onload = function() {
      window.setTimeout(() => {
        i.remove();
      }, 0);
    }
    window.document.body.appendChild(i);
  }, [title]);
}



export function useSetInterval(callback: Function, delay: number) {
  
  const savedCallback = useRef<Function>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }
    let id = null;
    const tick = () => {
      const returnValue = savedCallback.current();
      if (returnValue) {
        console.log("come in");
        if (returnValue instanceof Function) {
          returnValue();
        } else {
          throw new Error("返回值必须是函数！");
        }
        clearTimeout(id);
        return;
      }
      id = setTimeout(tick, delay);
    };
    id = setTimeout(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}



