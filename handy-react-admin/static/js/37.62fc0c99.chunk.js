(window["webpackJsonprefo-css"]=window["webpackJsonprefo-css"]||[]).push([[37],{1411:function(e,t,n){"use strict";var r=n(42),a=n.n(r),c=n(77),l=n(0),o=n.n(l),s=n(1394),u=n(638),i=n(1470),f=n(115),p=n(1406),m=n(1405),d=n(1408),b=n(50);t.a=function(e){var t=e.urlName,n=e.preType,r=Object(l.useRef)(null),v=Object(l.useRef)(null),k=Object(b.l)(),y=k.pathname,O=k.state;Object(l.useEffect)(function(){var e=y.lastIndexOf("/"),n=y.substring(0,e);O&&O.refresh&&n==="/soldierManage/".concat(t,"/audit")&&v.current.forceUpdate()},[O]);var g={formItem:[{type:"radio",label:"\u662f\u5426\u901a\u8fc7",field:"isOk",value:"",options:[{value:"1",label:"\u901a\u8fc7"},{value:"0",label:"\u4e0d\u901a\u8fc7"}]},{type:"textarea",label:"\u5907\u6ce8",field:"remarks",value:"",props:{placeholder:"\u8bf7\u8f93\u5165\u901a\u8fc7/\u4e0d\u901a\u8fc7\u539f\u56e0"}}]};return o.a.createElement(o.a.Fragment,null,o.a.createElement(p.b,{modalType:"detail",preType:n,ref:v}),o.a.createElement("div",{className:"form-footer center"},o.a.createElement(i.b,null,o.a.createElement(f.a,{type:"primary",onClick:function(){s.a.confirm({title:"\u5ba1\u6838\u4f18\u629a",icon:"",content:o.a.createElement(m.c,{ref:r,dynamicValidateForm:g}),onOk:function(e){r.current.validateFields().then(function(){var t=Object(c.a)(a.a.mark(function t(n){var r,c,l,o,s,i,f,p;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=v.current.resData,c=r.preferentialId,l=r.type,o=r.version,s={belongingId:c,isOk:n.isOk,remarks:n.remarks,type:l,version:o},t.next=4,Object(d.g)(s);case 4:i=t.sent,f=i.code,p=i.message,200===f&&(u.b.success("".concat(p),1.5,function(){return e()}),v.current.close());case 8:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()).catch(function(e){return console.log(e)})}})}},"\u5ba1\u6838"),o.a.createElement(f.a,{onClick:function(){v.current.close()}},"\u5173\u95ed"))))}},1509:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(1411);t.default=function(e){return a.a.createElement(c.a,{urlName:"uraniumMining",preType:"300027006"})}}}]);
//# sourceMappingURL=37.62fc0c99.chunk.js.map