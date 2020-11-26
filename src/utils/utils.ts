
class Utils {
  // 构造单例
  private static instance: Utils;
  private constructor() { }
  static defaultUtils() {
    if (!this.instance) {
      this.instance = new Utils();
    }
    return this.instance;
  }
  /**
   * 获取queryString参数值
   * @param name 
   */
  public static getUrlParamByName(name?: string) {
    let search = window.location.search;
    if(!search) return '';
    let query = {};
    search.slice(1).split('&').forEach((item) => {
      let t = item.split('=');
      query[t[0]] = t[1];
    });
    return name ? ( query[name] ? query[name] : '') : query;
  }

  /**
   * 处理日期格式
   * @param timeStamp  时间错
   * @param format 格式
   */
  public static dateFormat(timeStamp: number, format?: string) {

    function formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }

    var date = new Date(timeStamp * 1000);
    var year = formatNumber(date.getFullYear());
    var month = formatNumber(date.getMonth() + 1);
    var day = formatNumber(date.getDate());
  
    var hour = formatNumber(date.getHours());
    var minute = formatNumber(date.getMinutes());
    var second = formatNumber(date.getSeconds());
  
    if(format) {
      return format
      .replace('yyyy', year)
      .replace('mm', month)
      .replace('dd', day)
      .replace('hh', hour)
      .replace('mm', minute)
      .replace('ss', second);
    }
    var res = "";
    res += year + '-' + month  + '-' + day + ' ';
    res += hour + ':' + minute + ':' + second;
    return res;
  }
   /**
   * 复制内容至剪贴板
   */
  public static clipboard(value: string) {
    return new Promise((resolve, reject) => {
      let input = document.createElement('input');
      input.setAttribute('style', 'display: block; width: 1px; height: 1px;');
      input.setAttribute('readonly', 'readonly');
      input.setAttribute('value', value);
      document.body.appendChild(input);
      input.setSelectionRange(0, Infinity);
      input.select();
      let result = document.execCommand('copy');
      document.body.removeChild(input);
      if (result) {
        resolve();
      } else {
        reject();
      }
    });
  }
}
export default Utils;
