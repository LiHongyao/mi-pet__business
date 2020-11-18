class Validator {
    // 中文名校验 
    static name(val) {
        return /^[\u4e00-\u9fa5]{2,6}$/.test(val);
    }
    // 身份证校验
    static idCard(val) {
        return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{7}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(val)
    }
    // 验证微信号
    static wechat(val) {
        return /^\w{6,20}$/.test(val);
    }
    // 验证QQ号
    static qq(val) {
        return /^\d{5,15}$/.test(val);
    }
    // 验证邮箱
    static email(val) {
        return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(val);
    }
    // 验证手机号
    static tel(val) {
        return /^1[3,4,5,6,7,8,9]\d{9}$/.test(val);
    }
	// 验证手机验证码
	static code(val) {
		return /^\d{6}$/.test(val);
	}
    // 验证Android环境
    static android() {
        return /Linux|Android/i.test(window.navigator.userAgent);
    }
    // 验证iOS环境
    static ios() {
        return /iPhone/i.test(window.navigator.userAgent);
    }
    // 验证微信环境
    static weixin() {
        return /MicroMessenger/i.test(window.navigator.userAgent);
    }
}

export default Validator;

