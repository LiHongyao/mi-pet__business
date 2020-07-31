import { useEffect } from 'react'
/**
 * 修改页面标题
 * @param title 标题
 */
export function useTitle(title: string) {
  useEffect(() => {
    window.document.title = title;
  }, [title]);
}