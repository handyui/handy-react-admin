(window["webpackJsonprefo-css"]=window["webpackJsonprefo-css"]||[]).push([[21],{1403:function(e,t,n){"use strict";var r=n(148),a=n(147),c=n(107),o=n(0),i=n.n(o),u=n(1470),s=n(1541),l=n(1535);function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(n,!0).forEach(function(t){Object(a.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var d=Object(o.forwardRef)(function(e,t){var n=e.columns,a=e.rowKey,p=e.rowSelection,d=e.queryParams,m=e.pageOption,b=e.searchParam,y=e.getListFunc,h=e.type,O=e.onExpand,g=e.callback,v=Object(o.useState)([]),j=Object(c.a)(v,2),w=j[0],k=j[1],x=Object(o.useState)(!1),P=Object(c.a)(x,2),E=P[0],S=P[1],I=n.find(function(e){return"action"===(e.dataIndex||e.key)}),z=I?I.actions:[],T=i.a.useRef(!1),C=function(e){S(!0);var t=f({current:m.current,size:m.pageSize},d,{},b,{},e);y&&y(t).then(function(e){if(200===e.code&&!T.current){var n=e.result,r=n.records,a=n.current,c=n.size,o=n.total;g&&g({searchParam:t,pageOption:{current:a,pageSize:c,total:o}}),h&&"table-tree"===h&&r.forEach(function(e){e.children=[]}),k(r)}}).finally(function(){T.current||S(!1)})},R=function(t,n){return n({record:t,props:e},C)};Object(o.useEffect)(function(){return C(),function(){T.current=!0}},[]),Object(o.useImperativeHandle)(t,function(){return{refreshTable:function(e){C(e)}}});return i.a.createElement(l.a,{rowKey:a,rowSelection:p,columns:function(e){var t=[];return t.push.apply(t,Object(r.a)(e.filter(function(e){return"action"!==e.dataIndex}))),z.length>0&&t.push({title:"\u64cd\u4f5c",key:"action",render:function(e,t){return i.a.createElement(u.b,{size:"middle"},z.map(function(e,n){return["popconfirm"===e.type?i.a.createElement(s.a,{key:n,title:"\u60a8\u786e\u5b9a\u8981\u5220\u9664\u5417\uff1f",onConfirm:function(){return R(t,e.func)}},i.a.createElement("a",null,"\u5220\u9664")):"","text"===e.type?i.a.createElement("a",{key:n,onClick:function(){return R(t,e.func)}},e.text):""]}))}}),t}(n),dataSource:w,loading:E,pagination:f({},m,{onChange:function(e,t){var n={size:t||m.pageSize,current:e};g&&g({searchParam:b,pageOption:n}),C(n)},pageSizeOptions:["5","10","20","50"],showSizeChanger:!0}),onExpand:O})});d.defaultProps={pageOption:{current:1,pageSize:10},refreshTable:!1},t.a=d},1404:function(e,t){},1407:function(e,t,n){"use strict";var r=n(1403);n.d(t,"BasicTable",function(){return r.a});n(1404)},1412:function(e,t,n){"use strict";var r=n(0),a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"},c=n(10),o=function(e,t){return r.createElement(c.a,Object.assign({},e,{ref:t,icon:a}))};o.displayName="DeleteOutlined";t.a=r.forwardRef(o)},1542:function(e,t,n){"use strict";n.r(t);var r=n(42),a=n.n(r),c=n(77),o=n(148),i=n(107),u=n(0),s=n.n(u),l=n(1407),p=n(263),f=n(12),d=function(e){return f.a.post("/subsidyProgramme/selectProgrammePage",e)},m=n(1394),b=n(115),y=n(640),h=n(1412),O=n(1405),g=(n(447),n(50)),v=n(69),j=n(84);t.default=function(e){var t=e.history,n=Object(u.useState)([]),r=Object(i.a)(n,2),f=r[0],w=r[1],k=(Object(u.useRef)(null),Object(u.useRef)(null)),x=Object(u.useRef)(null),P=Object(g.l)(),E=P.pathname,S=P.state,I=Object(v.c)(function(e){return e.layoutReducer.panes}),z=Object(v.b)(),T=Object(u.useState)({pageOption:{},searchParam:{}}),C=Object(i.a)(T,2),R=C[0],M=C[1],D=function(e){var t=I.findIndex(function(t){return Object(g.j)(t.menuPath,{path:e,exact:!0})});if(t>0){var n=I;n.splice(t,1),z(Object(j.e)(Object(o.a)(n)))}},H=[{title:"\u65b9\u6848\u7c7b\u578b",dataIndex:"programmeType",key:"programmeType"},{title:"\u65b9\u6848\u540d\u79f0",dataIndex:"programmeName",key:"programmeName"},{title:"\u65b9\u6848\u6708\u4efd",dataIndex:"programmeMonth",key:"programmeMonth"},{title:"\u64cd\u4f5c\u4eba",dataIndex:"createUser",key:"createUser"},{title:"\u64cd\u4f5c\u65f6\u95f4",dataIndex:"createTime",key:"createTime"},{title:"\u5907\u6ce8",dataIndex:"remark",key:"remark"},{title:"\u64cd\u4f5c",dataIndex:"action",actions:[{type:"popconfirm",key:"fileid",text:"\u5220\u9664",permission:{action:"delete",effect:"disabled"},props:{type:"danger"},func:function(){var e=Object(c.a)(a.a.mark(function e(t,n){var r;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.record,e.next=3,Object(p.k)({userId:r.userId});case 3:n();case 4:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}()},{type:"text",key:"fileid",text:"\u7f16\u8f91",props:{type:"warning"},func:function(){var e=Object(c.a)(a.a.mark(function e(n,r){var c;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:c=n.record,D("/financeManage/subsidy/edit/:id"),t.push({pathname:"/financeManage/subsidy/edit/".concat(c.subsidyProgrammeId),state:{refresh:!0}});case 3:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}()}]}],B=function(e){M({pageOption:R.pageOption,searchParam:e}),x.current.refreshTable(e)};Object(u.useEffect)(function(){S&&S.refresh&&"/system/account"===E&&(console.log("resData",R),B(R.searchParam))},[S]);return s.a.createElement("div",{className:"content"},s.a.createElement(O.a,{ref:k,dynamicValidateForm:{layout:{labelCol:{span:6},wrapperCol:{span:18}},grid:{rowGutter:10,colSpan:5},formItem:[{type:"input",label:"\u8d26\u53f7",field:"account",value:"",props:{placeholder:"\u8bf7\u8f93\u5165\u8d26\u53f7\u6216\u624b\u673a\u53f7"}},{type:"input",label:"\u7528\u6237\u540d",field:"name",value:"",props:{placeholder:"\u8bf7\u8f93\u5165\u7528\u6237\u59d3\u540d"}},{type:"select",label:"\u72b6\u6001",field:"status",value:"",props:{placeholder:"\u8bf7\u9009\u62e9\u72b6\u6001"},options:[{label:"\u53ef\u7528",value:"y",key:"y"},{label:"\u4e0d\u53ef\u7528",value:"n",key:"n"}]}]},callback:B,showBtn:!0},s.a.createElement(b.a,{type:"primary",ghost:!0,icon:s.a.createElement(y.a,null),onClick:function(){t.push({pathname:"/financeManage/subsidy/add"})}}," \u6dfb\u52a0 "),s.a.createElement(b.a,{danger:!0,icon:s.a.createElement(h.a,null),onClick:function(){m.a.confirm({title:"\u63d0\u793a",icon:"",content:"\u60a8\u786e\u5b9a\u8981\u5220\u9664\u6240\u6709\u9009\u4e2d\u5417\uff1f",onOk:function(){var e=Object(c.a)(a.a.mark(function e(){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.l)(f.toString());case 2:x.current.refreshTable(),w([]);case 4:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()})}}," \u5220\u9664 ")),s.a.createElement(l.BasicTable,{ref:x,columns:H,getListFunc:d,rowKey:"subsidyProgrammeId",rowSelection:{selectedRowKeys:f,onChange:function(e){w(e)}},pageOption:R.pageOption,searchParam:R.searchParam,callback:function(e){return M(e)}}))}}}]);
//# sourceMappingURL=21.32acf62d.chunk.js.map