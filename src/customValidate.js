/*
插件自带的验证规则：
after{target} - 比target要大的一个合法日期，格式(DD/MM/YYYY)
alpha - 只包含英文字符
alpha_dash - 可以包含英文、数字、下划线、破折号
alpha_num - 可以包含英文和数字
before:{target} - 和after相反
between:{min},{max} - 在min和max之间的数字
confirmed:{target} - 必须和target一样
date_between:{min,max} - 日期在min和max之间
date_format:{format} - 合法的format格式化日期
decimal:{decimals?} - 数字，而且是decimals进制
digits:{length} - 长度为length的数字
dimensions:{width},{height} - 符合宽高规定的图片
email - 不解释
ext:[extensions] - 后缀名
image - 图片 
in:[list] - 包含在数组list内的值
ip - ipv4地址
max:{length} - 最大长度为length的字符
mimes:[list] - 文件类型
min - max相反
mot_in - in相反
numeric - 只允许数字
regex:{pattern} - 值必须符合正则pattern
required - 不解释
size:{kb} - 文件大小不超过
url:{domain?} - (指定域名的)url
 */

import { Validator } from 'vee-validate';


/*
*自定义规则：****
*/
Validator.extend('abc', {
    messages: {
        zh_CN: field => field + ':' + 'abc',
    },
    validate: value => {
        return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
});
//名字验证
Validator.extend('name', {
    messages: {
      zh_CN: field => field + '* ' + '真实姓名必须是2-6个中文。',
  },
  validate: value => {
    return value = /^[\u4e00-\u9fa5]{2,6}$/.test(value)
  }
});
//身份证验证
Validator.extend('idCard', {
    messages: {
      zh_CN: field => field + '* ' + '请输入正确的18位身份证号码。',
  },
  validate: value => {
    return value = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
  }
});
//银行卡验证
Validator.extend('amount', {
    messages: {
      zh_CN: field => field + '* ' + '充值金额大于等于100。',
  },
  validate: value => {
  return value =  /^(([1-9]{1}\d{2,})|([1-9]{1}\d{2,}\.[0-9]{1,2}))$/.test(value)
}
});
//金额验证
Validator.extend('bank', {
    messages: {
      zh_CN: field => field + '* ' + '对不起，当前暂不支持此银行，请联系客服。',
  },
  validate: value => {
  return value =  /^[0-9]{16,19}$/.test(value)
}
});
//手机验证
Validator.extend('leftMobile', {
  messages: {
    zh_CN:field => field + '* 必须是11位手机号码',
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});
/*
*异步验证****
*/
Validator.extend('verify_coupon', {
    getMessage: (field) => `The ${field} is not a valid coupon.`,
    validate: (value) => new Promise(resolve => {
        console.log(1)
    })
});


export default Validator;
