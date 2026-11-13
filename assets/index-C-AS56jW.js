(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h={},g=[],_=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,v=Array.isArray;function y(e,t){for(var n in t)e[n]=t[n];return e}function b(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function x(t,n,r){var i,a,o,s={};for(o in n)o==`key`?i=n[o]:o==`ref`?a=n[o]:s[o]=n[o];if(arguments.length>2&&(s.children=arguments.length>3?e.call(arguments,2):r),typeof t==`function`&&t.defaultProps!=null)for(o in t.defaultProps)s[o]===void 0&&(s[o]=t.defaultProps[o]);return S(t,s,i,a,null)}function S(e,r,i,a,o){var s={type:e,props:r,key:i,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:o??++n,__i:-1,__u:0};return o==null&&t.vnode!=null&&t.vnode(s),s}function C(e){return e.children}function w(e,t){this.props=e,this.context=t}function T(e,t){if(t==null)return e.__?T(e.__,e.__i+1):null;for(var n;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null)return n.__e;return typeof e.type==`function`?T(e):null}function E(e){if(e.__P&&e.__d){var n=e.__v,r=n.__e,i=[],a=[],o=y({},n);o.__v=n.__v+1,t.vnode&&t.vnode(o),te(e.__P,o,n,e.__n,e.__P.namespaceURI,32&n.__u?[r]:null,i,r??T(n),!!(32&n.__u),a),o.__v=n.__v,o.__.__k[o.__i]=o,re(i,o,a),n.__e=n.__=null,o.__e!=r&&D(o)}}function D(e){if((e=e.__)!=null&&e.__c!=null)return e.__e=e.__c.base=null,e.__k.some(function(t){if(t!=null&&t.__e!=null)return e.__e=e.__c.base=t.__e}),D(e)}function O(e){(!e.__d&&(e.__d=!0)&&i.push(e)&&!k.__r++||a!=t.debounceRendering)&&((a=t.debounceRendering)||o)(k)}function k(){try{for(var e,t=1;i.length;)i.length>t&&i.sort(s),e=i.shift(),t=i.length,E(e)}finally{i.length=k.__r=0}}function A(e,t,n,r,i,a,o,s,c,l,u){var d,f,p,m,_,v,y=r&&r.__k||g,b=t.length;for(c=j(n,t,y,c,b),d=0;d<b;d++)(p=n.__k[d])!=null&&(f=p.__i!=-1&&y[p.__i]||h,p.__i=d,v=te(e,p,f,i,a,o,s,c,l,u),m=p.__e,p.ref&&f.ref!=p.ref&&(f.ref&&ae(f.ref,null,p),u.push(p.ref,p.__c||m,p)),_==null&&m!=null&&(_=m),4&p.__u?(c=M(p,c,e),f.__e&&(f.__e=null)):typeof p.type==`function`&&v!==void 0?c=v:m&&(c=m.nextSibling),p.__u&=-7);return n.__e=_,c}function j(e,t,n,r,i){var a,o,s,c,l,u=n.length,d=u,f=0;for(e.__k=Array(i),a=0;a<i;a++)(o=t[a])!=null&&typeof o!=`boolean`&&typeof o!=`function`?(typeof o==`string`||typeof o==`number`||typeof o==`bigint`||o.constructor==String?o=e.__k[a]=S(null,o,null,null,null):v(o)?o=e.__k[a]=S(C,{children:o},null,null,null):o.constructor===void 0&&o.__b>0?o=e.__k[a]=S(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):e.__k[a]=o,c=a+f,o.__=e,o.__b=e.__b+1,s=null,(l=o.__i=N(o,n,c,d))!=-1&&(d--,(s=n[l])&&(s.__u|=2)),s==null||s.__v==null?(l==-1&&(i>u?f--:i<u&&f++),typeof o.type!=`function`&&(o.__u|=4)):l!=c&&(l==c-1?f--:l==c+1?f++:(l>c?f--:f++,o.__u|=4))):e.__k[a]=null;if(d)for(a=0;a<u;a++)(s=n[a])!=null&&!(2&s.__u)&&(s.__e==r&&(r=T(s)),oe(s,s));return r}function M(e,t,n){var r,i;if(typeof e.type==`function`){for(r=e.__k,i=0;r&&i<r.length;i++)r[i]&&(r[i].__=e,t=M(r[i],t,n));return t}e.__e!=t&&(t&&e.type&&!t.parentNode&&(t=T(e)),t=n.insertBefore(e.__e,t||null));do t&&=t.nextSibling;while(t!=null&&t.nodeType==8);return t}function N(e,t,n,r){var i,a,o,s=e.key,c=e.type,l=t[n],u=l!=null&&!(2&l.__u);if(l===null&&s==null||u&&s==l.key&&c==l.type)return n;if(r>+!!u){for(i=n-1,a=n+1;i>=0||a<t.length;)if((l=t[o=i>=0?i--:a++])!=null&&!(2&l.__u)&&s==l.key&&c==l.type)return o}return-1}function P(e,t,n){t[0]==`-`?e.setProperty(t,n??``):e[t]=n==null?``:typeof n!=`number`||_.test(t)?n:n+`px`}function F(e,t,n,r,i){var a,o;n:if(t==`style`){if(typeof n==`string`)e.style.cssText=n;else{if(typeof r==`string`&&(e.style.cssText=r=``),r)for(t in r)n&&t in n||P(e.style,t,``);if(n)for(t in n)r&&n[t]==r[t]||P(e.style,t,n[t])}}else if(t[0]==`o`&&t[1]==`n`)a=t!=(t=t.replace(d,`$1`)),o=t.toLowerCase(),t=o in e||t==`onFocusOut`||t==`onFocusIn`?o.slice(2):t.slice(2),e.l||={},e.l[t+a]=n,n?r?n[u]=r[u]:(n[u]=f,e.addEventListener(t,a?m:p,a)):e.removeEventListener(t,a?m:p,a);else{if(i==`http://www.w3.org/2000/svg`)t=t.replace(/xlink(H|:h)/,`h`).replace(/sName$/,`s`);else if(t!=`width`&&t!=`height`&&t!=`href`&&t!=`list`&&t!=`form`&&t!=`tabIndex`&&t!=`download`&&t!=`rowSpan`&&t!=`colSpan`&&t!=`role`&&t!=`popover`&&t in e)try{e[t]=n??``;break n}catch{}typeof n==`function`||(n==null||!1===n&&t[4]!=`-`?e.removeAttribute(t):e.setAttribute(t,t==`popover`&&n==1?``:n))}}function ee(e){return function(n){if(this.l){var r=this.l[n.type+e];if(n[l]==null)n[l]=f++;else if(n[l]<r[u])return;return r(t.event?t.event(n):n)}}}function te(e,n,r,i,a,o,s,c,l,u){var d,f,p,m,h,_,x,S,E,D,O,k,j,M,N,P,F=n.type;if(n.constructor!==void 0)return null;128&r.__u&&(l=!!(32&r.__u),o=[c=n.__e=r.__e]),(d=t.__b)&&d(n);n:if(typeof F==`function`){f=s.length;try{if(E=n.props,D=F.prototype&&F.prototype.render,O=(d=F.contextType)&&i[d.__c],k=d?O?O.props.value:d.__:i,r.__c?S=(p=n.__c=r.__c).__=p.__E:(D?n.__c=p=new F(E,k):(n.__c=p=new w(E,k),p.constructor=F,p.render=se),O&&O.sub(p),p.state||(p.state={}),p.__n=i,m=p.__d=!0,p.__h=[],p._sb=[]),D&&p.__s==null&&(p.__s=p.state),D&&F.getDerivedStateFromProps!=null&&(p.__s==p.state&&(p.__s=y({},p.__s)),y(p.__s,F.getDerivedStateFromProps(E,p.__s))),h=p.props,_=p.state,p.__v=n,m)D&&F.getDerivedStateFromProps==null&&p.componentWillMount!=null&&p.componentWillMount(),D&&p.componentDidMount!=null&&p.__h.push(p.componentDidMount);else{if(D&&F.getDerivedStateFromProps==null&&E!==h&&p.componentWillReceiveProps!=null&&p.componentWillReceiveProps(E,k),n.__v==r.__v||!p.__e&&p.shouldComponentUpdate!=null&&!1===p.shouldComponentUpdate(E,p.__s,k)){n.__v!=r.__v&&(p.props=E,p.state=p.__s,p.__d=!1),n.__e=r.__e,n.__k=r.__k,n.__k.some(function(e){e&&(e.__=n)}),g.push.apply(p.__h,p._sb),p._sb=[],p.__h.length&&s.push(p),c=T(r);break n}p.componentWillUpdate!=null&&p.componentWillUpdate(E,p.__s,k),D&&p.componentDidUpdate!=null&&p.__h.push(function(){p.componentDidUpdate(h,_,x)})}if(p.context=k,p.props=E,p.__P=e,p.__e=!1,j=t.__r,M=0,D)p.state=p.__s,p.__d=!1,j&&j(n),d=p.render(p.props,p.state,p.context),g.push.apply(p.__h,p._sb),p._sb=[];else do p.__d=!1,j&&j(n),d=p.render(p.props,p.state,p.context),p.state=p.__s;while(p.__d&&++M<25);p.state=p.__s,p.getChildContext!=null&&(i=y(y({},i),p.getChildContext())),D&&!m&&p.getSnapshotBeforeUpdate!=null&&(x=p.getSnapshotBeforeUpdate(h,_)),N=d!=null&&d.type===C&&d.key==null?ie(d.props.children):d,c=A(e,v(N)?N:[N],n,r,i,a,o,s,c,l,u),p.base=n.__e,n.__u&=-161,p.__h.length&&s.push(p),S&&(p.__E=p.__=null)}catch(e){if(s.length=f,n.__v=null,l||o!=null){if(e.then){for(n.__u|=l?160:128;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;o!=null&&(o[o.indexOf(c)]=null),n.__e=c}else if(o!=null)for(P=o.length;P--;)b(o[P])}else n.__e=r.__e;n.__k??=r.__k||[],e.then||ne(n),t.__e(e,n,r)}}else o==null&&n.__v==r.__v?(n.__k=r.__k,n.__e=r.__e):c=n.__e=I(r.__e,n,r,i,a,o,s,l,u);return(d=t.diffed)&&d(n),128&n.__u?void 0:c}function ne(e){e&&(e.__c&&(e.__c.__e=!0),e.__k&&e.__k.some(ne))}function re(e,n,r){for(var i=0;i<r.length;i++)ae(r[i],r[++i],r[++i]);t.__c&&t.__c(n,e),e.some(function(n){try{e=n.__h,n.__h=[],e.some(function(e){e.call(n)})}catch(e){t.__e(e,n.__v)}})}function ie(e){return typeof e!=`object`||!e||e.__b>0?e:v(e)?e.map(ie):e.constructor===void 0?y({},e):null}function I(n,r,i,a,o,s,c,l,u){var d,f,p,m,g,_,y,x=i.props||h,S=r.props,C=r.type;if(C==`svg`?o=`http://www.w3.org/2000/svg`:C==`math`?o=`http://www.w3.org/1998/Math/MathML`:o||=`http://www.w3.org/1999/xhtml`,s!=null){for(d=0;d<s.length;d++)if((g=s[d])&&`setAttribute`in g==!!C&&(C?g.localName==C:g.nodeType==3)){n=g,s[d]=null;break}}if(n==null){if(C==null)return document.createTextNode(S);n=document.createElementNS(o,C,S.is&&S),l&&=(t.__m&&t.__m(r,s),!1),s=null}if(C==null)x===S||l&&n.data==S||(n.data=S);else{if(s=C==`textarea`&&S.defaultValue!=null?null:s&&e.call(n.childNodes),!l&&s!=null)for(x={},d=0;d<n.attributes.length;d++)x[(g=n.attributes[d]).name]=g.value;for(d in x)g=x[d],d==`dangerouslySetInnerHTML`?p=g:d==`children`||d in S||d==`value`&&`defaultValue`in S||d==`checked`&&`defaultChecked`in S||F(n,d,null,g,o);for(d in S)g=S[d],d==`children`?m=g:d==`dangerouslySetInnerHTML`?f=g:d==`value`?_=g:d==`checked`?y=g:l&&typeof g!=`function`||x[d]===g||F(n,d,g,x[d],o);if(f)l||p&&(f.__html==p.__html||f.__html==n.innerHTML)||(n.innerHTML=f.__html),r.__k=[];else if(p&&(n.innerHTML=``),A(r.type==`template`?n.content:n,v(m)?m:[m],r,i,a,C==`foreignObject`?`http://www.w3.org/1999/xhtml`:o,s,c,s?s[0]:i.__k&&T(i,0),l,u),s!=null)for(d=s.length;d--;)b(s[d]);l&&C!=`textarea`||(d=`value`,C==`progress`&&_==null?n.removeAttribute(`value`):_!=null&&(_!==n[d]||C==`progress`&&!_||C==`option`&&_!=x[d])&&F(n,d,_,x[d],o),d=`checked`,y!=null&&y!=n[d]&&F(n,d,y,x[d],o))}return n}function ae(e,n,r){try{if(typeof e==`function`){var i=typeof e.__u==`function`;i&&e.__u(),i&&n==null||(e.__u=e(n))}else e.current=n}catch(e){t.__e(e,r)}}function oe(e,n,r){var i,a;if(t.unmount&&t.unmount(e),(i=e.ref)&&(i.current&&i.current!=e.__e||ae(i,null,n)),(i=e.__c)!=null){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(e){t.__e(e,n)}i.base=i.__P=i.__n=null}if(i=e.__k)for(a=0;a<i.length;a++)i[a]&&oe(i[a],n,r||typeof e.type!=`function`);r||b(e.__e),e.__c=e.__=e.__e=void 0}function se(e,t,n){return this.constructor(e,n)}function ce(n,r,i){var a,o,s,c;r==document&&(r=document.documentElement),t.__&&t.__(n,r),o=(a=typeof i==`function`)?null:i&&i.__k||r.__k,s=[],c=[],te(r,n=(!a&&i||r).__k=x(C,null,[n]),o||h,h,r.namespaceURI,!a&&i?[i]:o?null:r.firstChild?e.call(r.childNodes):null,s,!a&&i?i:o?o.__e:r.firstChild,a,c),re(s,n,c),n.props.children=null}e=g.slice,t={__e:function(e,t,n,r){for(var i,a,o;t=t.__;)if((i=t.__c)&&!i.__)try{if((a=i.constructor)&&a.getDerivedStateFromError!=null&&(i.setState(a.getDerivedStateFromError(e)),o=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(e,r||{}),o=i.__d),o)return i.__E=i}catch(t){e=t}throw e}},n=0,r=function(e){return e!=null&&e.constructor===void 0},w.prototype.setState=function(e,t){var n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=y({},this.state);typeof e==`function`&&(e=e(y({},n),this.props)),e&&y(n,e),e!=null&&this.__v&&(t&&this._sb.push(t),O(this))},w.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),O(this))},w.prototype.render=C,i=[],o=typeof Promise==`function`?Promise.prototype.then.bind(Promise.resolve()):setTimeout,s=function(e,t){return e.__v.__b-t.__v.__b},k.__r=0,c=Math.random().toString(8),l=`__d`+c,u=`__a`+c,d=/(PointerCapture)$|Capture$/i,f=0,p=ee(!1),m=ee(!0);var le=`Blockcraft`,ue=`0.1.0`,de=4096,fe=de*16,pe=1/20,me=4.5,he=class extends Error{problems;constructor(e){super(`Ungültige Konfiguration:\n  - ${e.join(`
  - `)}`),this.problems=e,this.name=`EnvError`}};function ge(e,t){let n={},r=[];for(let[i,a]of Object.entries(e)){let e=t[i],o=e===void 0?``:String(e).trim();if(o===``)n[i]=a.default;else switch(a.type){case`int`:{if(!/^-?\d+$/.test(o)){r.push(`${i}: "${o}" ist keine ganze Zahl`);break}let e=Number.parseInt(o,10);a.min!==void 0&&e<a.min?r.push(`${i}: ${e} < Minimum ${a.min}`):a.max!==void 0&&e>a.max?r.push(`${i}: ${e} > Maximum ${a.max}`):n[i]=e;break}case`bool`:{let e=o.toLowerCase();[`1`,`true`,`yes`,`on`].includes(e)?n[i]=!0:[`0`,`false`,`no`,`off`].includes(e)?n[i]=!1:r.push(`${i}: "${o}" ist kein Wahrheitswert (true/false)`);break}case`string`:a.oneOf&&!a.oneOf.includes(o)?r.push(`${i}: "${o}" ist nicht erlaubt (${a.oneOf.join(`, `)})`):n[i]=o;break;case`list`:n[i]=o.split(`,`).map(e=>e.trim()).filter(e=>e.length>0)}}if(r.length>0)throw new he(r);return n}function _e(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return ve(t)}function ve(e){return e^=e>>>16,e=Math.imul(e,2246822507),e^=e>>>13,e=Math.imul(e,3266489909),e^=e>>>16,e>>>0}function ye(...e){let t=2654435769;for(let n of e)t=ve(t^Math.imul(n|0,668265261));return t>>>0}var be=class{state;constructor(e){this.state=e>>>0}next(){let e=this.state=this.state+1831565813>>>0;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}int(e,t){return e+Math.floor(this.next()*(t-e+1))}chance(e){return this.next()<e}};function xe(e){let t=e.trim();return t===``?Math.random()*4294967295>>>0:/^-?\d+$/.test(t)?Number(BigInt.asUintN(32,BigInt(t))):_e(t)}var L=.5*(Math.sqrt(3)-1),Se=(3-Math.sqrt(3))/6,Ce=1/3,we=1/6,R=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),Te=class{perm=new Uint8Array(512);permMod12=new Uint8Array(512);constructor(e){let t=new be(e),n=new Uint8Array(256);for(let e=0;e<256;e++)n[e]=e;for(let e=255;e>0;e--){let r=Math.floor(t.next()*(e+1)),i=n[e];n[e]=n[r],n[r]=i}for(let e=0;e<512;e++)this.perm[e]=n[e&255],this.permMod12[e]=this.perm[e]%12}noise2(e,t){let n=this.perm,r=this.permMod12,i=(e+t)*L,a=Math.floor(e+i),o=Math.floor(t+i),s=(a+o)*Se,c=e-(a-s),l=t-(o-s),u=+(c>l),d=c>l?0:1,f=c-u+Se,p=l-d+Se,m=c-1+2*Se,h=l-1+2*Se,g=a&255,_=o&255,v=0,y=0,b=0,x=.5-c*c-l*l;if(x>=0){let e=r[g+n[_]]*3;x*=x,v=x*x*(R[e]*c+R[e+1]*l)}let S=.5-f*f-p*p;if(S>=0){let e=r[g+u+n[_+d]]*3;S*=S,y=S*S*(R[e]*f+R[e+1]*p)}let C=.5-m*m-h*h;if(C>=0){let e=r[g+1+n[_+1]]*3;C*=C,b=C*C*(R[e]*m+R[e+1]*h)}return 70*(v+y+b)}noise3(e,t,n){let r=this.perm,i=this.permMod12,a=(e+t+n)*Ce,o=Math.floor(e+a),s=Math.floor(t+a),c=Math.floor(n+a),l=(o+s+c)*we,u=e-(o-l),d=t-(s-l),f=n-(c-l),p,m,h,g,_,v;u>=d?d>=f?(p=1,m=0,h=0,g=1,_=1,v=0):u>=f?(p=1,m=0,h=0,g=1,_=0,v=1):(p=0,m=0,h=1,g=1,_=0,v=1):d<f?(p=0,m=0,h=1,g=0,_=1,v=1):u<f?(p=0,m=1,h=0,g=0,_=1,v=1):(p=0,m=1,h=0,g=1,_=1,v=0);let y=u-p+we,b=d-m+we,x=f-h+we,S=u-g+2*we,C=d-_+2*we,w=f-v+2*we,T=u-1+3*we,E=d-1+3*we,D=f-1+3*we,O=o&255,k=s&255,A=c&255,j=0,M=.6-u*u-d*d-f*f;if(M>=0){let e=i[O+r[k+r[A]]]*3;M*=M,j+=M*M*(R[e]*u+R[e+1]*d+R[e+2]*f)}let N=.6-y*y-b*b-x*x;if(N>=0){let e=i[O+p+r[k+m+r[A+h]]]*3;N*=N,j+=N*N*(R[e]*y+R[e+1]*b+R[e+2]*x)}let P=.6-S*S-C*C-w*w;if(P>=0){let e=i[O+g+r[k+_+r[A+v]]]*3;P*=P,j+=P*P*(R[e]*S+R[e+1]*C+R[e+2]*w)}let F=.6-T*T-E*E-D*D;if(F>=0){let e=i[O+1+r[k+1+r[A+1]]]*3;F*=F,j+=F*F*(R[e]*T+R[e+1]*E+R[e+2]*D)}return 32*j}fbm2(e,t,n,r=2,i=.5){let a=0,o=1,s=1,c=0;for(let l=0;l<n;l++)a+=o*this.noise2(e*s+l*31.7,t*s-l*17.3),c+=o,o*=i,s*=r;return a/c}},z=function(e){return e[e.Ocean=0]=`Ocean`,e[e.Beach=1]=`Beach`,e[e.Plains=2]=`Plains`,e[e.Forest=3]=`Forest`,e[e.Desert=4]=`Desert`,e[e.Mountains=5]=`Mountains`,e[e.Snowfields=6]=`Snowfields`,e[e.Taiga=7]=`Taiga`,e[e.Swamp=8]=`Swamp`,e}({}),B={0:`Ozean`,1:`Strand`,2:`Ebene`,3:`Wald`,4:`Wüste`,5:`Gebirge`,6:`Schneefelder`,7:`Taiga`,8:`Sumpf`},Ee=`stein.erde.gras_oben.gras_seite.sand.kies.sandstein_seite.sandstein_oben.urgestein.eiche_rinde.eiche_kern.eiche_laub.eiche_bretter.birke_rinde.birke_kern.birke_laub.birke_bretter.wasser.kohleerz.eisenerz.kaktus_seite.kaktus_oben.glas.bruchstein.ziegel.grasbueschel.sonnenkelch.glutmohn.duerrstrauch.leuchtkristall.schnee.schnee_seite.lehm.risse_0.risse_1.risse_2.risse_3.werktisch_oben.werktisch_seite.schmelze_seite.schmelze_front.schmelze_front_an.schmelze_oben.truhe_oben.truhe_seite.fackel.lumiterz.beerenstrauch.fichte_rinde.fichte_kern.fichte_nadeln.fichte_bretter.sumpf_laub.stock.kohle.eisenbarren.lumit.apfel.waldbeeren.holz_spitzhacke.holz_schaufel.holz_axt.holz_schwert.stein_spitzhacke.stein_schaufel.stein_axt.stein_schwert.eisen_spitzhacke.eisen_schaufel.eisen_axt.eisen_schwert.lumit_spitzhacke.lumit_schaufel.lumit_axt.lumit_schwert.eisen_helm.eisen_brustpanzer.eisen_beinschutz.eisen_stiefel.lumit_helm.lumit_brustpanzer.lumit_beinschutz.lumit_stiefel`.split(`.`),De=new Map(Ee.map((e,t)=>[e,t]));function Oe(e){let t=De.get(e);if(t===void 0)throw Error(`Unbekannte Textur: ${e}`);return t}var ke=function(e){return e[e.None=0]=`None`,e[e.Cube=1]=`Cube`,e[e.Cross=2]=`Cross`,e[e.Torch=3]=`Torch`,e}({}),Ae=[];function V(e,t){if(Ae[e])throw Error(`Block-ID ${e} doppelt vergeben`);let n=t.shape??1,r=t.all,i=Oe(t.top??r??`stein`),a=Oe(t.bottom??r??t.top??`stein`),o=Oe(t.side??r??`stein`),s=t.front?Oe(t.front):o,c=t.layer??(n===0?0:1);return Ae[e]={id:e,key:`bc:${t.key}`,name:t.name,shape:n,layer:c,solid:t.solid??n===1,opaque:t.opaque??(n===1&&c===1),lightFilter:t.lightFilter??0,lightEmission:t.lightEmission??0,cullSame:t.cullSame??!1,replaceable:t.replaceable??!1,selectable:t.selectable??n!==0,liquid:t.liquid??!1,hardness:t.hardness??1,tool:t.tool??`none`,harvestTier:t.harvestTier??-1,waterLevel:t.waterLevel??-1,interactive:t.interactive??!1,faces:[s,s,i,a,s,s],inCatalog:t.inCatalog??n!==0,mapColor:t.mapColor??8947848},e}var je=V(0,{key:`luft`,name:`Luft`,shape:0,solid:!1,opaque:!1,replaceable:!0,selectable:!1,inCatalog:!1}),Me=V(1,{key:`stein`,name:`Stein`,all:`stein`,hardness:1.5,tool:`spitzhacke`,harvestTier:0,mapColor:8223366}),Ne=V(2,{key:`erde`,name:`Erde`,all:`erde`,hardness:.5,tool:`schaufel`,mapColor:9067067}),Pe=V(3,{key:`grasboden`,name:`Grasboden`,top:`gras_oben`,bottom:`erde`,side:`gras_seite`,hardness:.6,tool:`schaufel`,mapColor:6270527}),Fe=V(4,{key:`sand`,name:`Sand`,all:`sand`,hardness:.5,tool:`schaufel`,mapColor:15126410}),Ie=V(5,{key:`kies`,name:`Kies`,all:`kies`,hardness:.6,tool:`schaufel`,mapColor:9405824}),Le=V(6,{key:`sandstein`,name:`Sandstein`,top:`sandstein_oben`,side:`sandstein_seite`,hardness:.8,tool:`spitzhacke`,harvestTier:0,mapColor:14269818}),Re=V(7,{key:`urgestein`,name:`Urgestein`,all:`urgestein`,hardness:-1,mapColor:3880512}),ze=V(8,{key:`eichenstamm`,name:`Eichenstamm`,top:`eiche_kern`,side:`eiche_rinde`,hardness:2,tool:`axt`,mapColor:7031339}),Be=V(9,{key:`eichenlaub`,name:`Eichenlaub`,all:`eiche_laub`,layer:2,opaque:!1,lightFilter:1,cullSame:!0,hardness:.2,mapColor:4164142}),Ve=V(10,{key:`eichenbretter`,name:`Eichenbretter`,all:`eiche_bretter`,hardness:2,tool:`axt`,mapColor:11567437}),He=V(11,{key:`birkenstamm`,name:`Birkenstamm`,top:`birke_kern`,side:`birke_rinde`,hardness:2,tool:`axt`,mapColor:14736587}),Ue=V(12,{key:`birkenlaub`,name:`Birkenlaub`,all:`birke_laub`,layer:2,opaque:!1,lightFilter:1,cullSame:!0,hardness:.2,mapColor:8368202}),We=V(13,{key:`wasser`,name:`Wasser`,all:`wasser`,layer:3,solid:!1,opaque:!1,lightFilter:2,cullSame:!0,replaceable:!0,selectable:!1,liquid:!0,hardness:-1,waterLevel:0,mapColor:3108816}),Ge=V(14,{key:`kohleerz`,name:`Kohleerz`,all:`kohleerz`,hardness:3,tool:`spitzhacke`,harvestTier:0,mapColor:5591642}),Ke=V(15,{key:`eisenerz`,name:`Eisenerz`,all:`eisenerz`,hardness:3,tool:`spitzhacke`,harvestTier:1,mapColor:10521210}),qe=V(16,{key:`kaktus`,name:`Kaktus`,top:`kaktus_oben`,side:`kaktus_seite`,hardness:.4,mapColor:4034362}),Je=V(17,{key:`glas`,name:`Glas`,all:`glas`,layer:2,opaque:!1,cullSame:!0,hardness:.3,mapColor:13626096}),Ye=V(18,{key:`bruchstein`,name:`Bruchstein`,all:`bruchstein`,hardness:2,tool:`spitzhacke`,harvestTier:0,mapColor:7762557}),Xe=V(19,{key:`ziegel`,name:`Ziegel`,all:`ziegel`,hardness:2,tool:`spitzhacke`,harvestTier:0,mapColor:10768959}),Ze=V(20,{key:`grasbueschel`,name:`Grasbüschel`,all:`grasbueschel`,shape:2,layer:2,solid:!1,opaque:!1,replaceable:!0,hardness:0,mapColor:6270527}),Qe=V(21,{key:`sonnenkelch`,name:`Sonnenkelch`,all:`sonnenkelch`,shape:2,layer:2,solid:!1,opaque:!1,hardness:0,mapColor:15910205}),$e=V(22,{key:`glutmohn`,name:`Glutmohn`,all:`glutmohn`,shape:2,layer:2,solid:!1,opaque:!1,hardness:0,mapColor:14172975}),et=V(23,{key:`duerrstrauch`,name:`Dürrstrauch`,all:`duerrstrauch`,shape:2,layer:2,solid:!1,opaque:!1,replaceable:!0,hardness:0,mapColor:10123850}),tt=V(24,{key:`leuchtkristall`,name:`Leuchtkristall`,all:`leuchtkristall`,lightEmission:15,hardness:.3,mapColor:16770976}),nt=V(25,{key:`schnee`,name:`Schnee`,all:`schnee`,hardness:.2,tool:`schaufel`,mapColor:16054527}),rt=V(26,{key:`schneeboden`,name:`Verschneiter Boden`,top:`schnee`,bottom:`erde`,side:`schnee_seite`,hardness:.6,tool:`schaufel`,mapColor:15265525}),it=V(27,{key:`lehm`,name:`Lehm`,all:`lehm`,hardness:.6,tool:`schaufel`,mapColor:10987960}),at=V(28,{key:`birkenbretter`,name:`Birkenbretter`,all:`birke_bretter`,hardness:2,tool:`axt`,mapColor:14206608}),ot=V(29,{key:`werktisch`,name:`Werktisch`,top:`werktisch_oben`,bottom:`eiche_bretter`,side:`werktisch_seite`,hardness:2.5,tool:`axt`,interactive:!0,mapColor:10186303}),st=V(30,{key:`schmelze`,name:`Schmelze`,top:`schmelze_oben`,side:`schmelze_seite`,front:`schmelze_front`,hardness:3.5,tool:`spitzhacke`,harvestTier:0,interactive:!0,mapColor:7038838}),ct=V(31,{key:`schmelze_an`,name:`Schmelze (brennt)`,top:`schmelze_oben`,side:`schmelze_seite`,front:`schmelze_front_an`,hardness:3.5,tool:`spitzhacke`,harvestTier:0,interactive:!0,lightEmission:13,inCatalog:!1,mapColor:7038838}),lt=V(32,{key:`truhe`,name:`Truhe`,top:`truhe_oben`,side:`truhe_seite`,hardness:2.5,tool:`axt`,interactive:!0,mapColor:10975816}),ut=V(33,{key:`fackel`,name:`Fackel`,all:`fackel`,shape:3,layer:2,solid:!1,opaque:!1,lightEmission:14,hardness:0,mapColor:16762458}),dt=V(34,{key:`lumiterz`,name:`Lumiterz`,all:`lumiterz`,hardness:3,tool:`spitzhacke`,harvestTier:2,mapColor:9068480}),ft=V(35,{key:`beerenstrauch`,name:`Beerenstrauch`,all:`beerenstrauch`,shape:2,layer:2,solid:!1,opaque:!1,hardness:0,mapColor:3107632}),pt=V(36,{key:`fichtenstamm`,name:`Fichtenstamm`,top:`fichte_kern`,side:`fichte_rinde`,hardness:2,tool:`axt`,mapColor:4862754}),mt=V(37,{key:`fichtennadeln`,name:`Fichtennadeln`,all:`fichte_nadeln`,layer:2,opaque:!1,lightFilter:1,cullSame:!0,hardness:.2,mapColor:2841141}),ht=V(38,{key:`fichtenbretter`,name:`Fichtenbretter`,all:`fichte_bretter`,hardness:2,tool:`axt`,mapColor:7228719}),gt=V(39,{key:`sumpflaub`,name:`Sumpflaub`,all:`sumpf_laub`,layer:2,opaque:!1,lightFilter:1,cullSame:!0,hardness:.2,mapColor:4942378}),_t=[];for(let e=1;e<=8;e++)_t[e]=V(40+e-1,{key:e===8?`wasser_fallend`:`wasser_${e}`,name:`Wasser`,all:`wasser`,layer:3,solid:!1,opaque:!1,lightFilter:2,cullSame:!0,replaceable:!0,selectable:!1,liquid:!0,hardness:-1,waterLevel:e,inCatalog:!1,mapColor:3108816});var vt=_t[8],yt=Ae.length,bt=Ae;function xt(e){return Ae[e]??Ae[je]}new Map(Ae.map(e=>[e.key,e]));var St=new Uint8Array(256),Ct=new Uint8Array(256),wt=new Uint8Array(256),Tt=new Uint8Array(256),Et=new Uint8Array(256),Dt=new Uint8Array(256),Ot=new Uint8Array(256),kt=new Uint8Array(256).fill(255);for(let e of Ae)St[e.id]=+!!e.opaque,Ct[e.id]=+!!e.solid,wt[e.id]=e.opaque?15:e.lightFilter,Tt[e.id]=e.lightEmission,Et[e.id]=e.shape,Dt[e.id]=e.layer,Ot[e.id]=+!!e.cullSame,e.waterLevel>=0&&(kt[e.id]=e.waterLevel);function At(e){return kt[e]!==255}Ae.filter(e=>e.inCatalog).map(e=>e.id);var jt=[Pe,Ne,Me,Ye,ze,Ve,Je,Xe,tt],Mt=(e,t,n)=>t<<8|n<<4|e,Nt=new Set([Ze,Qe,$e,et,ft]);function Pt(e,t,n){return e+(t-e)*n}function Ft(e){return e<0?0:e>1?1:e}function It(e,t,n){let r=Ft((n-e)/(t-e));return r*r*(3-2*r)}var Lt=[[-1,30],[-.45,40],[-.28,54],[-.18,61],[-.12,64],[.05,68],[.3,76],[.6,86],[1,96]];function Rt(e,t){if(t<=e[0][0])return e[0][1];for(let n=1;n<e.length;n++){let[r,i]=e[n];if(t<=r){let[a,o]=e[n-1];return Pt(o,i,(t-a)/(r-a))}}return e[e.length-1][1]}var zt=class{seed;continental;erosion;detail;ridge;temperature;humidity;cheese;spaghettiA;spaghettiB;constructor(e){this.seed=e,this.continental=new Te(ye(e,1)),this.erosion=new Te(ye(e,2)),this.detail=new Te(ye(e,3)),this.ridge=new Te(ye(e,4)),this.temperature=new Te(ye(e,5)),this.humidity=new Te(ye(e,6)),this.cheese=new Te(ye(e,7)),this.spaghettiA=new Te(ye(e,8)),this.spaghettiB=new Te(ye(e,9))}sample(e,t){let n=this.continental.fbm2(e/720,t/720,4),r=this.erosion.fbm2(e/380,t/380,3),i=this.detail.fbm2(e/96,t/96,4),a=Rt(Lt,n*1.6),o=1-Math.abs(this.ridge.fbm2(e/260,t/260,3)),s=It(.05,.4,n)*It(.15,-.35,r)*o*o*78,c=a+i*(3+9*It(-.1,.5,n))+s,l=this.temperature.fbm2(e/900,t/900,3),u=this.humidity.fbm2(e/700,t/700,3),d=It(.3,.42,u)*It(-.2,-.08,l)*It(.32,.2,l)*It(78,68,c);d>0&&(c=Pt(c,61.6+i*2.2,d));let f=Math.max(4,Math.min(236,Math.floor(c))),p;return p=d>.5&&f>=59?z.Swamp:f<61?z.Ocean:f<=64&&n*1.6<-.1?z.Beach:f>104?z.Mountains:l>.22&&u<.08?z.Desert:l<-.38?z.Snowfields:l<-.16&&u>-.15?z.Taiga:u>.08?z.Forest:z.Plains,{height:f,biome:p,continentalness:n}}generateColumn(e,t){let n=new Uint16Array(fe),r=new Int16Array(256),i=new Uint8Array(256),a=e*16,o=t*16,s=0;for(let e=0;e<16;e++)for(let t=0;t<16;t++){let c=this.sample(a+t,o+e),l=e<<4|t;r[l]=c.height,i[l]=c.biome,c.height>s&&(s=c.height),this.fillColumn(n,t,e,c.height,c.biome,a+t,o+e)}this.carveCaves(n,e,t,r,i,s),this.placeOres(n,e,t);for(let e=0;e<16;e++)for(let t=0;t<16;t++){let i=r[e<<4|t];for(let r=i+1;r<=62;r++){let i=Mt(t,r,e);n[i]===je&&(n[i]=We)}}this.placePlants(n,e,t,r,i);for(let r=t-1;r<=t+1;r++)for(let i=e-1;i<=e+1;i++)this.placeTrees(n,e,t,i,r);return n}fillColumn(e,t,n,r,i,a,o){let s=ye(this.seed,a,o,101);e[Mt(t,0,n)]=Re;for(let r=1;r<=3;r++)(s>>>r*3&7)<4-r?e[Mt(t,r,n)]=Re:e[Mt(t,r,n)]=Me;let c=r<62,l,u,d=3+(s&1),f=Me,p=0;switch(i){case z.Ocean:l=r>48?Fe:s&3?Ie:it,u=l===it?it:l,d=2;break;case z.Beach:l=Fe,u=Fe,f=Le,p=2;break;case z.Desert:l=Fe,u=Fe,d=4,f=Le,p=4;break;case z.Mountains:l=r>120?nt:Me,u=Me,d=1;break;case z.Snowfields:l=c?Ie:rt,u=Ne;break;case z.Swamp:l=c?s&3?Ne:it:Pe,u=Ne;break;default:l=c?r<59?Ie:Fe:Pe,u=c?l:Ne}for(let i=4;i<=r;i++){let a=r-i,o;o=a===0?l:a<=d?u:a<=d+p?f:Me,e[Mt(t,i,n)]=o}}carveCaves(e,t,n,r,i,a){let o=Math.min(256,a+8)/4+1,s=Math.ceil(o),c=new Float32Array(25*s*2),l=t*16,u=n*16;for(let e=0;e<s;e++)for(let t=0;t<5;t++)for(let n=0;n<5;n++){let r=l+n*4,i=e*4,a=u+t*4,o=((e*5+t)*5+n)*2;c[o]=this.cheese.noise3(r/52,i/30,a/52);let s=this.spaghettiA.noise3(r/70,i/44,a/70),d=this.spaghettiB.noise3(r/70,i/44,a/70);c[o+1]=s*s+d*d}let d=(e,t,n,r)=>{let i=e/4,a=t/4,o=n/4,l=Math.min(3,Math.floor(i)),u=Math.min(s-2,Math.floor(a)),d=Math.min(3,Math.floor(o)),f=i-l,p=a-u,m=o-d,h=(e,t,n)=>c[((t*5+n)*5+e)*2+r],g=Pt(h(l,u,d),h(l+1,u,d),f),_=Pt(h(l,u+1,d),h(l+1,u+1,d),f),v=Pt(h(l,u,d+1),h(l+1,u,d+1),f),y=Pt(h(l,u+1,d+1),h(l+1,u+1,d+1),f);return Pt(Pt(g,_,p),Pt(v,y,p),m)};for(let t=0;t<16;t++)for(let n=0;n<16;n++){let a=t<<4|n,o=r[a],s=i[a],c=s===z.Ocean||s===z.Beach||o<66?o-6:o,l=o-10;for(let r=5;r<=c;r++){let i=Mt(n,r,t),a=e[i];if(a===je||a===Re||a===We)continue;let o=!1;if(r<=l){let e=.6-It(50,10,r)*.12;d(n,r,t,0)>e&&(o=!0)}!o&&d(n,r,t,1)<.0035&&(o=!0),o&&(e[i]=je)}}}placeOres(e,t,n){let r=[[Ge,18,5,128,5,12,201],[Ke,11,5,64,4,8,202],[dt,2,5,16,2,5,205],[Ie,6,5,100,10,22,203],[Ne,6,5,100,10,22,204]];for(let[i,a,o,s,c,l,u]of r){let r=new be(ye(this.seed,t,n,u));for(let t=0;t<a;t++){let t=r.next()*16,n=o+r.next()*(s-o),a=r.next()*16,u=r.int(c,l);for(let o=0;o<u;o++){let o=Math.floor(t),s=Math.floor(n),c=Math.floor(a);if(o>=0&&o<16&&c>=0&&c<16&&s>0&&s<256){let t=Mt(o,s,c);e[t]===Me&&(e[t]=i)}t+=r.next()*2-1,n+=r.next()*1.4-.7,a+=r.next()*2-1}}}}placePlants(e,t,n,r,i){for(let a=0;a<16;a++)for(let o=0;o<16;o++){let s=a<<4|o,c=r[s];if(c+1>=256)continue;let l=e[Mt(o,c,a)],u=Mt(o,c+1,a);if(e[u]!==je)continue;let d=ye(this.seed,t*16+o,n*16+a,301)/4294967296,f=i[s];if(l===Pe){let t=f===z.Plains?.14:f===z.Swamp?.1:.07;(f===z.Forest||f===z.Taiga)&&d>.994?e[u]=ft:d<t?e[u]=Ze:d<t+.012?e[u]=Qe:d<t+.022&&(e[u]=$e)}else l===Fe&&f===z.Desert&&d<.008&&(e[u]=et)}}placeTrees(e,t,n,r,i){let a=new be(ye(this.seed,r,i,401));for(let o=0;o<14;o++){let o=r*16+a.int(0,15),s=i*16+a.int(0,15),c=a.next(),l=a.next(),u=a.next(),d=this.sample(o,s);if(d.height<62||d.height>244)continue;let f=null;switch(d.biome){case z.Forest:c<.5&&(f=l<.3?`birch`:`oak`);break;case z.Plains:c<.035&&(f=`oak`);break;case z.Snowfields:c<.06&&(f=l<.5?`spruce`:`birch`);break;case z.Taiga:c<.45&&(f=l<.85?`spruce`:`birch`);break;case z.Swamp:c<.12&&d.height>=62&&(f=`swamp`);break;case z.Desert:c<.07&&(f=`cactus`);break;case z.Mountains:c<.02&&d.height<112&&(f=`oak`)}if(!f)continue;let p=o-t*16,m=s-n*16,h=d.height+1;if(f===`cactus`){let t=1+Math.floor(u*3);for(let n=0;n<t;n++)this.put(e,p,h+n,m,qe,!0);continue}if(f===`spruce`){this.placeSpruce(e,p,h,m,6+Math.floor(u*4),o,s);continue}let g=f===`birch`?He:ze,_=f===`birch`?Ue:f===`swamp`?gt:Be,v=h+(f===`oak`?4+Math.floor(u*3):5+Math.floor(u*3))-1,y=new be(ye(this.seed,o,s,402));for(let t=-2;t<=1;t++){let n=t>=0?1:2;for(let r=-n;r<=n;r++)for(let i=-n;i<=n;i++){let a=Math.abs(i)===n&&Math.abs(r)===n,o=!a||t<0&&y.next()<.45;t===1&&a||o&&this.put(e,p+i,v+t,m+r,_,!1)}}f===`birch`&&this.put(e,p,v+2,m,_,!1);for(let t=h;t<=v;t++)this.put(e,p,t,m,g,!0);if(p>=0&&p<16&&m>=0&&m<16){let t=Mt(p,h-1,m);(e[t]===Pe||e[t]===rt)&&(e[t]=Ne)}}}placeSpruce(e,t,n,r,i,a,o){let s=n+i-1,c=new be(ye(this.seed,a,o,403));this.put(e,t,s+1,r,mt,!1);for(let n=0;n<=i-3;n++){let i=s-n,a=n===0?1:n%2==1?Math.min(3,1+(n>>1)):Math.max(1,Math.min(3,n>>1));for(let n=-a;n<=a;n++)for(let o=-a;o<=a;o++)Math.abs(o)+Math.abs(n)>a+ +(a>=2)||a>=2&&Math.abs(o)===a&&Math.abs(n)===a||Math.abs(o)+Math.abs(n)===a+1&&c.next()<.4||this.put(e,t+o,i,r+n,mt,!1)}for(let i=n;i<=s;i++)this.put(e,t,i,r,pt,!0);if(t>=0&&t<16&&r>=0&&r<16){let i=Mt(t,n-1,r);(e[i]===Pe||e[i]===rt)&&(e[i]=Ne)}}put(e,t,n,r,i,a){if(t<0||t>15||r<0||r>15||n<=0||n>=256)return;let o=Mt(t,n,r),s=e[o];s!==Re&&(a?(s===je||Nt.has(s)||s===Be||s===Ue||s===mt||s===gt||s===We)&&(e[o]=i):(s===je||Nt.has(s))&&(e[o]=i))}findSpawn(){for(let e=0;e<64;e++){let t=e===0?1:e*8;for(let n=0;n<t;n++){let r=n/t*Math.PI*2,i=Math.round(Math.cos(r)*e*24),a=Math.round(Math.sin(r)*e*24),o=this.sample(i,a);if((o.biome===z.Plains||o.biome===z.Forest)&&o.height>62)return{x:i+.5,y:o.height+1,z:a+.5}}}let e=this.sample(0,0);return{x:.5,y:Math.max(e.height,62)+1,z:.5}}};function Bt(e,t){return(e+1048576)*2097152+(t+1048576)}function Vt(e){return Math.floor(e/2097152)-1048576}function Ht(e){return e%2097152-1048576}function Ut(e,t,n){return Bt(e,n)*16+t}function Wt(e){return Math.floor(e/16)}function Gt(e){return e%16}var Kt=(e,t,n)=>t<<8|n<<4|e,qt=class e{cx;cz;blocks=Array(16).fill(null);light=Array(16).fill(null);modified=!1;blockEntities=new Map;constructor(e,t){this.cx=e,this.cz=t}getBlock(e,t,n){if(t<0||t>=256)return je;let r=this.blocks[t>>4];return r===null?je:r[(t&15)<<8|n<<4|e]}setBlock(e,t,n,r){if(t<0||t>=256)return;let i=t>>4,a=this.blocks[i];if(a===null){if(r===je)return;a=this.blocks[i]=new Uint16Array(de)}a[(t&15)<<8|n<<4|e]=r}getLight(e,t,n){if(t>=256)return 240;if(t<0)return 0;let r=this.light[t>>4];return r===null?240:r[(t&15)<<8|n<<4|e]}setLight(e,t,n,r){if(t<0||t>=256)return;let i=t>>4,a=this.light[i];if(a===null){if(r===240)return;a=this.light[i]=new Uint8Array(de).fill(240)}a[(t&15)<<8|n<<4|e]=r}topSection(){for(let e=15;e>=0;e--)if(this.blocks[e]!==null)return e;return-1}static fromFlat(t,n,r,i){let a=new e(t,n);return a.loadFlat(r,i),a}loadFlat(e,t){for(let n=0;n<16;n++){let r=n*de,i=e.subarray(r,r+de),a=!0;for(let e=0;e<de;e++)if(i[e]!==je){a=!1;break}if(this.blocks[n]=a?null:i.slice(),t){let e=t.subarray(r,r+de),i=!0;for(let t=0;t<de;t++)if(e[t]!==240){i=!1;break}this.light[n]=i?null:e.slice()}else this.light[n]=null}}toFlatBlocks(){let e=new Uint16Array(fe);for(let t=0;t<16;t++){let n=this.blocks[t];n&&e.set(n,t*de)}return e}},Jt=class{columns=new Map;dirtyListeners=[];getColumn(e,t){return this.columns.get(Bt(e,t))}hasColumn(e,t){return this.columns.has(Bt(e,t))}addColumn(e){this.columns.set(Bt(e.cx,e.cz),e)}removeColumn(e,t){let n=Bt(e,t),r=this.columns.get(n);return this.columns.delete(n),r}getBlock(e,t,n){if(t<0||t>=256)return je;let r=this.columns.get(Bt(e>>4,n>>4));return r?r.getBlock(e&15,t,n&15):je}getBlockOrUnloaded(e,t,n){if(t<0||t>=256)return je;let r=this.columns.get(Bt(e>>4,n>>4));return r?r.getBlock(e&15,t,n&15):-1}setBlockRaw(e,t,n,r){if(t<0||t>=256)return!1;let i=this.columns.get(Bt(e>>4,n>>4));return i?(i.setBlock(e&15,t,n&15,r),!0):!1}getLight(e,t,n){if(t>=256)return 240;if(t<0)return 0;let r=this.columns.get(Bt(e>>4,n>>4));return r?r.getLight(e&15,t,n&15):240}onSectionDirty(e){return this.dirtyListeners.push(e),()=>{let t=this.dirtyListeners.indexOf(e);t>=0&&this.dirtyListeners.splice(t,1)}}markSectionDirty(e,t,n){if(!(t<0||t>=16))for(let r of this.dirtyListeners)r(e,t,n)}markBlockDirty(e,t,n){let r=e>>4,i=n>>4,a=t>>4,o=e&15,s=t&15,c=n&15,l=o===0?-1:0,u=+(o===15),d=s===0?-1:0,f=+(s===15),p=c===0?-1:0,m=+(c===15);for(let e=l;e<=u;e++)for(let t=d;t<=f;t++)for(let n=p;n<=m;n++)this.markSectionDirty(r+e,a+t,i+n)}clear(){this.columns.clear()}};function Yt(e,t,n,r,i,a,o,s){let c=Math.hypot(i,a,o);if(c===0)return null;i/=c,a/=c,o/=c;let l=Math.floor(t),u=Math.floor(n),d=Math.floor(r),f=i>0?1:-1,p=a>0?1:-1,m=o>0?1:-1,h=i===0?1/0:Math.abs(1/i),g=a===0?1/0:Math.abs(1/a),_=o===0?1/0:Math.abs(1/o),v=i===0?1/0:(i>0?l+1-t:t-l)*h,y=a===0?1/0:(a>0?u+1-n:n-u)*g,b=o===0?1/0:(o>0?d+1-r:r-d)*_,x=0,S=0,C=0,w=0;for(;w<=s;){let t=e.getBlock(l,u,d);if(xt(t).selectable)return{x:l,y:u,z:d,nx:x,ny:S,nz:C,id:t,distance:w};v<y&&v<b?(l+=f,w=v,v+=h,x=-f,S=0,C=0):y<b?(u+=p,w=y,y+=g,x=0,S=-p,C=0):(d+=m,w=b,b+=_,x=0,S=0,C=-m)}return null}function Xt(e,t,n){if(n&&e===15&&t===0)return 15;let r=e-1-t;return r>0?r:0}var Zt=[1,-1,0,0,0,0],Qt=[0,0,1,-1,0,0],$t=[0,0,0,0,1,-1],en=class{world;lastKey=NaN;lastCol;addQ=[];remQ=[];constructor(e){this.world=e}col(e,t){let n=Bt(e>>4,t>>4);return n!==this.lastKey&&(this.lastKey=n,this.lastCol=this.world.columns.get(n)),this.lastCol}invalidateCache(){this.lastKey=NaN,this.lastCol=void 0}get(e,t,n,r){if(t>=256)return r?15:0;if(t<0)return 0;let i=this.col(e,n);if(!i)return-1;let a=i.getLight(e&15,t,n&15);return r?a>>4:a&15}set(e,t,n,r,i){let a=this.col(e,n);if(!a||t<0||t>=256)return;let o=e&15,s=n&15,c=a.getLight(o,t,s),l=r?i<<4|c&15:c&240|i;l!==c&&(a.setLight(o,t,s,l),this.world.markBlockDirty(e,t,n))}blockAt(e,t,n){let r=this.col(e,n);return r?r.getBlock(e&15,t,n&15):-1}stitchColumn(e,t){let n=e*16,r=t*16,i=[[-1,0],[1,0],[0,-1],[0,1]];for(let a of[!0,!1]){for(let[o,s]of i)if(this.world.hasColumn(e+o,t+s))for(let e=0;e<16;e++){let t=o<0?n:o>0?n+15:n+e,i=s<0?r:s>0?r+15:r+e,c=t+o,l=i+s;for(let e=0;e<256;e++){let n=this.get(t,e,i,a),r=this.get(c,e,l,a);if(n<=1&&r<=1)continue;let o=this.blockAt(t,e,i),s=this.blockAt(c,e,l);n>1&&s>=0&&!St[s]&&Xt(n,wt[s],!1)>r&&this.addQ.push(t,e,i),r>1&&o>=0&&!St[o]&&Xt(r,wt[o],!1)>n&&this.addQ.push(c,e,l)}}this.runAdd(a)}}onBlockChanged(e,t,n,r){for(let i of[!0,!1]){let a=this.get(e,t,n,i);a>0&&(this.set(e,t,n,i,0),this.remQ.push(e,t,n,a),this.runRemove(i));for(let a=0;a<6;a++){let o=e+Zt[a],s=t+Qt[a],c=n+$t[a];if(!(s<0)){if(s>=256){if(i){let i=r;if(!St[i]){let r=Xt(15,wt[i],!0);r>this.get(e,t,n,!0)&&(this.set(e,t,n,!0,r),this.addQ.push(e,t,n))}}}else this.get(o,s,c,i)>0&&this.addQ.push(o,s,c)}}if(!i){let i=Tt[r];i>0&&(this.set(e,t,n,!1,i),this.addQ.push(e,t,n))}this.runAdd(i)}}runRemove(e){let t=this.remQ,n=0;for(;n<t.length;){let r=t[n++],i=t[n++],a=t[n++],o=t[n++];for(let n=0;n<6;n++){let s=r+Zt[n],c=i+Qt[n],l=a+$t[n];if(c<0||c>=256)continue;let u=this.get(s,c,l,e);if(!(u<=0)){if(u<o||e&&n===3&&o===15&&u===15){if(!e&&(Tt[this.blockAt(s,c,l)]??0)>0){this.addQ.push(s,c,l);continue}this.set(s,c,l,e,0),t.push(s,c,l,u)}else this.addQ.push(s,c,l)}}}t.length=0}runAdd(e){let t=this.addQ,n=0;for(;n<t.length;){let r=t[n++],i=t[n++],a=t[n++],o=this.get(r,i,a,e);if(!(o<=1)){for(let n=0;n<6;n++){let s=r+Zt[n],c=i+Qt[n],l=a+$t[n];if(c<0||c>=256)continue;let u=this.blockAt(s,c,l);if(u<0||St[u])continue;let d=Xt(o,wt[u],e&&n===3);d>this.get(s,c,l,e)&&(this.set(s,c,l,e,d),t.push(s,c,l))}n>3e5&&n>t.length/2&&(t.splice(0,n),n=0)}}t.length=0}};function tn(e,t,n,r,i,a){let o=[];for(let n=-1;n<=1;n++)for(let i=-1;i<=1;i++)o.push(e.getColumn(t+i,r+n));let s=o[4];if(!s||s.blocks[n]===null)return!1;let c=n*16;for(let e=-1;e<=16;e++){let t=c+e;for(let n=-1;n<=16;n++){let r=n<0?0:n>15?2:1,s=n+16&15;for(let c=-1;c<=16;c++){let l=c<0?0:c>15?2:1,u=c+16&15,d=o[r*3+l],f=((e+1)*18+(n+1))*18+(c+1);t<0?(i[f]=Re,a[f]=0):t>=256||!d?(i[f]=je,a[f]=240):(i[f]=d.getBlock(u,t,s),a[f]=d.getLight(u,t,s))}}}return!0}var nn=class{pos=new Uint16Array(4096);uvl=new Uint16Array(4096);light=new Uint8Array(4096);index=new Uint32Array(1536);verts=0;indices=0;reset(){this.verts=0,this.indices=0}grow(){let e=e=>{let t=new Uint16Array(e.length*2);return t.set(e),t};this.pos=e(this.pos),this.uvl=e(this.uvl);let t=new Uint8Array(this.light.length*2);t.set(this.light),this.light=t}vertex(e,t,n,r,i,a,o,s,c,l){(this.verts+1)*4>this.pos.length&&this.grow();let u=this.verts*4;this.pos[u]=e,this.pos[u+1]=t,this.pos[u+2]=n,this.pos[u+3]=r,this.uvl[u]=Math.round(i*16),this.uvl[u+1]=Math.round(a*16),this.uvl[u+2]=o,this.light[u]=s,this.light[u+1]=c,this.light[u+2]=l,this.verts++}quadIndices(e){if(this.indices+6>this.index.length){let e=new Uint32Array(this.index.length*2);e.set(this.index),this.index=e}let t=this.verts-4,n=this.indices;e?(this.index[n]=t+1,this.index[n+1]=t+2,this.index[n+2]=t+3,this.index[n+3]=t+1,this.index[n+4]=t+3,this.index[n+5]=t):(this.index[n]=t,this.index[n+1]=t+1,this.index[n+2]=t+2,this.index[n+3]=t,this.index[n+4]=t+2,this.index[n+5]=t+3),this.indices+=6}result(){return this.verts===0?null:{pos:this.pos.slice(0,this.verts*4),uvl:this.uvl.slice(0,this.verts*4),light:this.light.slice(0,this.verts*4),index:this.index.slice(0,this.indices),vertexCount:this.verts}}};new nn,new nn,new nn;var rn=class e{minX;minY;minZ;maxX;maxY;maxZ;constructor(e,t,n,r,i,a){this.minX=e,this.minY=t,this.minZ=n,this.maxX=r,this.maxY=i,this.maxZ=a}static fromFeet(t,n,r,i,a){return new e(t-i,n,r-i,t+i,n+a,r+i)}offset(t,n,r){return new e(this.minX+t,this.minY+n,this.minZ+r,this.maxX+t,this.maxY+n,this.maxZ+r)}expandTowards(t,n,r){return new e(t<0?this.minX+t:this.minX,n<0?this.minY+n:this.minY,r<0?this.minZ+r:this.minZ,t>0?this.maxX+t:this.maxX,n>0?this.maxY+n:this.maxY,r>0?this.maxZ+r:this.maxZ)}intersects(e){return this.minX<e.maxX&&this.maxX>e.minX&&this.minY<e.maxY&&this.maxY>e.minY&&this.minZ<e.maxZ&&this.maxZ>e.minZ}clipY(e,t){if(this.maxX<=e.minX||this.minX>=e.maxX||this.maxZ<=e.minZ||this.minZ>=e.maxZ)return t;if(t>0&&this.maxY<=e.minY){let n=e.minY-this.maxY;if(n<t)return n}else if(t<0&&this.minY>=e.maxY){let n=e.maxY-this.minY;if(n>t)return n}return t}clipX(e,t){if(this.maxY<=e.minY||this.minY>=e.maxY||this.maxZ<=e.minZ||this.minZ>=e.maxZ)return t;if(t>0&&this.maxX<=e.minX){let n=e.minX-this.maxX;if(n<t)return n}else if(t<0&&this.minX>=e.maxX){let n=e.maxX-this.minX;if(n>t)return n}return t}clipZ(e,t){if(this.maxX<=e.minX||this.minX>=e.maxX||this.maxY<=e.minY||this.minY>=e.maxY)return t;if(t>0&&this.maxZ<=e.minZ){let n=e.minZ-this.maxZ;if(n<t)return n}else if(t<0&&this.minZ>=e.maxZ){let n=e.maxZ-this.minZ;if(n>t)return n}return t}},an=.3,on=1.8,sn=1.5,cn=1.62,ln=1.32,un=.08,dn=.98,fn=.546,pn=.91,mn=.1,hn=.13,gn=.42,_n=.3,vn=class{x=0;y=0;z=0;vx=0;vy=0;vz=0;prevX=0;prevY=0;prevZ=0;onGround=!1;inWater=!1;eyesInWater=!1;flying=!1;sneaking=!1;sprinting=!1;horizontalCollision=!1;fallDistance=0;canFly=!0;setPosition(e,t,n){this.x=this.prevX=e,this.y=this.prevY=t,this.z=this.prevZ=n,this.vx=this.vy=this.vz=0,this.fallDistance=0}get height(){return this.sneaking&&!this.flying?sn:on}get eyeHeight(){return this.sneaking&&!this.flying?ln:cn}box(){return rn.fromFeet(this.x,this.y,this.z,an,this.height)}tick(e,t){this.prevX=this.x,this.prevY=this.y,this.prevZ=this.z;let n={landedFrom:0,jumped:!1},r=t.sneak&&!this.flying;if(!r&&this.sneaking){let t=rn.fromFeet(this.x,this.y,this.z,an,on);this.collides(e,t)||(this.sneaking=!1)}else this.sneaking=r;t.sprint&&t.forward>0&&!this.sneaking&&(this.sprinting=!0),(t.forward<=0||this.sneaking||this.horizontalCollision&&!this.flying)&&(this.sprinting=!1);let i=t.forward*.98,a=t.strafe*.98;if(this.sneaking&&(i*=_n,a*=_n),this.updateWater(e),this.flying){let n=this.sprinting?.1:.05;this.moveRelative(i,a,n,t.yaw),t.jump&&(this.vy+=.15),t.sneak&&(this.vy-=.15),this.move(e,this.vx,this.vy,this.vz,!1),this.vx*=pn,this.vz*=pn,this.vy*=.6,this.onGround&&(this.flying=!1),this.fallDistance=0}else if(this.inWater){this.moveRelative(i,a,.02,t.yaw),t.jump&&(this.vy+=.04);let n=this.y;if(this.move(e,this.vx,this.vy,this.vz,!1),this.vx*=.8,this.vy*=.8,this.vz*=.8,this.vy-=.02,this.horizontalCollision&&t.jump){let t=this.box().offset(this.vx,this.vy+.6-this.y+n,this.vz);this.collides(e,t)||(this.vy=.3)}this.fallDistance=0}else{let r=this.onGround?fn:pn,o=this.sprinting?hn:mn,s=this.onGround?o*(.16277136/(r*r*r)):this.sprinting?.026:.02;t.jump&&this.onGround&&(this.vy=gn,n.jumped=!0,this.sprinting&&(this.vx+=-Math.sin(t.yaw)*.2,this.vz+=-Math.cos(t.yaw)*.2)),this.moveRelative(i,a,s,t.yaw);let c=this.onGround;this.move(e,this.vx,this.vy,this.vz,this.sneaking&&c),this.vy=(this.vy-un)*dn,this.vx*=r,this.vz*=r}return this.onGround&&(this.fallDistance>0&&(n.landedFrom=this.fallDistance),this.fallDistance=0),this.y,n}moveRelative(e,t,n,r){let i=e*e+t*t;if(i<1e-4)return;i=Math.sqrt(i),i<1&&(i=1),i=n/i;let a=e*i,o=t*i,s=Math.sin(r),c=Math.cos(r);this.vx+=-s*a+c*o,this.vz+=-c*a-s*o}updateWater(e){let t=this.box();this.inWater=!1;let n=Math.floor(t.minX+.001),r=Math.floor(t.maxX-.001),i=Math.floor(t.minY+.4),a=Math.floor(t.maxY-.001),o=Math.floor(t.minZ+.001),s=Math.floor(t.maxZ-.001);for(let t=i;t<=a&&!this.inWater;t++)for(let i=o;i<=s&&!this.inWater;i++)for(let a=n;a<=r;a++)if(xt(e.getBlock(a,t,i)).liquid){this.inWater=!0;break}let c=this.y+this.eyeHeight,l=e.getBlock(Math.floor(this.x),Math.floor(c),Math.floor(this.z));this.eyesInWater=xt(l).liquid&&c-Math.floor(c)<.875}solidBoxes(e,t){let n=[],r=Math.floor(t.minX),i=Math.floor(t.maxX),a=Math.floor(t.minY),o=Math.floor(t.maxY),s=Math.floor(t.minZ),c=Math.floor(t.maxZ);for(let t=a;t<=o;t++)for(let a=s;a<=c;a++)for(let o=r;o<=i;o++){let r=e.getBlockOrUnloaded(o,t,a);(r<0||Ct[r])&&n.push(new rn(o,t,a,o+1,t+1,a+1))}return n}collides(e,t){for(let n of this.solidBoxes(e,t))if(n.intersects(t))return!0;return!1}move(e,t,n,r,i){let a=this.box();if(i){let n=.05,i=(t,n)=>!this.collides(e,a.offset(t,-.6,n));for(;t!==0&&i(t,0);)Math.abs(t)<n?t=0:t-=Math.sign(t)*n;for(;r!==0&&i(0,r);)Math.abs(r)<n?r=0:r-=Math.sign(r)*n;for(;t!==0&&r!==0&&i(t,r);)Math.abs(t)<n?t=0:t-=Math.sign(t)*n,Math.abs(r)<n?r=0:r-=Math.sign(r)*n}let o=t,s=n,c=r,l=this.solidBoxes(e,a.expandTowards(t,n,r));for(let e of l)n=a.clipY(e,n);a=a.offset(0,n,0);for(let e of l)t=a.clipX(e,t);a=a.offset(t,0,0);for(let e of l)r=a.clipZ(e,r);a=a.offset(0,0,r),this.x=(a.minX+a.maxX)/2,this.y=a.minY,this.z=(a.minZ+a.maxZ)/2,this.horizontalCollision=o!==t||c!==r;let u=s!==n;this.onGround=u&&s<0,o!==t&&(this.vx=0),c!==r&&(this.vz=0),u&&(this.vy=0),!this.onGround&&n<0&&(this.fallDistance-=n)}},yn=Uint8Array,bn=Uint16Array,xn=Int32Array,Sn=new yn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Cn=new yn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),wn=new yn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Tn=function(e,t){for(var n=new bn(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var i=new xn(n[30]),r=1;r<30;++r)for(var a=n[r];a<n[r+1];++a)i[a]=a-n[r]<<5|r;return{b:n,r:i}},En=Tn(Sn,2),Dn=En.b,On=En.r;Dn[28]=258,On[258]=28;for(var kn=Tn(Cn,0),An=kn.b,jn=kn.r,Mn=new bn(32768),Nn=0;Nn<32768;++Nn){var Pn=(Nn&43690)>>1|(Nn&21845)<<1;Pn=(Pn&52428)>>2|(Pn&13107)<<2,Pn=(Pn&61680)>>4|(Pn&3855)<<4,Mn[Nn]=((Pn&65280)>>8|(Pn&255)<<8)>>1}for(var Fn=(function(e,t,n){for(var r=e.length,i=0,a=new bn(t);i<r;++i)e[i]&&++a[e[i]-1];var o=new bn(t);for(i=1;i<t;++i)o[i]=o[i-1]+a[i-1]<<1;var s;if(n){s=new bn(1<<t);var c=15-t;for(i=0;i<r;++i)if(e[i])for(var l=i<<4|e[i],u=t-e[i],d=o[e[i]-1]++<<u,f=d|(1<<u)-1;d<=f;++d)s[Mn[d]>>c]=l}else for(s=new bn(r),i=0;i<r;++i)e[i]&&(s[i]=Mn[o[e[i]-1]++]>>15-e[i]);return s}),In=new yn(288),Nn=0;Nn<144;++Nn)In[Nn]=8;for(var Nn=144;Nn<256;++Nn)In[Nn]=9;for(var Nn=256;Nn<280;++Nn)In[Nn]=7;for(var Nn=280;Nn<288;++Nn)In[Nn]=8;for(var Ln=new yn(32),Nn=0;Nn<32;++Nn)Ln[Nn]=5;var Rn=Fn(In,9,0),zn=Fn(In,9,1),Bn=Fn(Ln,5,0),Vn=Fn(Ln,5,1),Hn=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},Un=function(e,t,n){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(t&7)&n},Wn=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},Gn=function(e){return(e+7)/8|0},Kn=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new yn(e.subarray(t,n))},qn=[`unexpected EOF`,`invalid block type`,`invalid length/literal`,`invalid distance`,`stream finished`,`no stream handler`,,`no callback`,`invalid UTF-8 data`,`extra field too long`,`date not in range 1980-2099`,`filename too long`,`stream finishing`,`invalid zip data`],Jn=function(e,t,n){var r=Error(t||qn[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,Jn),!n)throw r;return r},Yn=function(e,t,n,r){var i=e.length,a=r?r.length:0;if(!i||t.f&&!t.l)return n||new yn(0);var o=!n,s=o||t.i!=2,c=t.i;o&&(n=new yn(i*3));var l=function(e){var t=n.length;if(e>t){var r=new yn(Math.max(t*2,e));r.set(n),n=r}},u=t.f||0,d=t.p||0,f=t.b||0,p=t.l,m=t.d,h=t.m,g=t.n,_=i*8;do{if(!p){u=Un(e,d,1);var v=Un(e,d+1,3);if(d+=3,!v){var y=Gn(d)+4,b=e[y-4]|e[y-3]<<8,x=y+b;if(x>i){c&&Jn(0);break}s&&l(f+b),n.set(e.subarray(y,x),f),t.b=f+=b,t.p=d=x*8,t.f=u;continue}if(v==1)p=zn,m=Vn,h=9,g=5;else if(v==2){var S=Un(e,d,31)+257,C=Un(e,d+10,15)+4,w=S+Un(e,d+5,31)+1;d+=14;for(var T=new yn(w),E=new yn(19),D=0;D<C;++D)E[wn[D]]=Un(e,d+D*3,7);d+=C*3;for(var O=Hn(E),k=(1<<O)-1,A=Fn(E,O,1),D=0;D<w;){var j=A[Un(e,d,k)];d+=j&15;var y=j>>4;if(y<16)T[D++]=y;else{var M=0,N=0;for(y==16?(N=3+Un(e,d,3),d+=2,M=T[D-1]):y==17?(N=3+Un(e,d,7),d+=3):y==18&&(N=11+Un(e,d,127),d+=7);N--;)T[D++]=M}}var P=T.subarray(0,S),F=T.subarray(S);h=Hn(P),g=Hn(F),p=Fn(P,h,1),m=Fn(F,g,1)}else Jn(1);if(d>_){c&&Jn(0);break}}s&&l(f+131072);for(var ee=(1<<h)-1,te=(1<<g)-1,ne=d;;ne=d){var M=p[Wn(e,d)&ee],re=M>>4;if(d+=M&15,d>_){c&&Jn(0);break}if(M||Jn(2),re<256)n[f++]=re;else if(re==256){ne=d,p=null;break}else{var ie=re-254;if(re>264){var D=re-257,I=Sn[D];ie=Un(e,d,(1<<I)-1)+Dn[D],d+=I}var ae=m[Wn(e,d)&te],oe=ae>>4;ae||Jn(3),d+=ae&15;var F=An[oe];if(oe>3){var I=Cn[oe];F+=Wn(e,d)&(1<<I)-1,d+=I}if(d>_){c&&Jn(0);break}s&&l(f+131072);var se=f+ie;if(f<F){var ce=a-F,le=Math.min(F,se);for(ce+f<0&&Jn(3);f<le;++f)n[f]=r[ce+f]}for(;f<se;++f)n[f]=n[f-F]}}t.l=p,t.p=ne,t.b=f,t.f=u,p&&(u=1,t.m=h,t.d=m,t.n=g)}while(!u);return f!=n.length&&o?Kn(n,0,f):n.subarray(0,f)},Xn=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8},Zn=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8,e[r+2]|=n>>16},Qn=function(e,t){for(var n=[],r=0;r<e.length;++r)e[r]&&n.push({s:r,f:e[r]});var i=n.length,a=n.slice();if(!i)return{t:ar,l:0};if(i==1){var o=new yn(n[0].s+1);return o[n[0].s]=1,{t:o,l:1}}n.sort(function(e,t){return e.f-t.f}),n.push({s:-1,f:25001});var s=n[0],c=n[1],l=0,u=1,d=2;for(n[0]={s:-1,f:s.f+c.f,l:s,r:c};u!=i-1;)s=n[n[l].f<n[d].f?l++:d++],c=n[l!=u&&n[l].f<n[d].f?l++:d++],n[u++]={s:-1,f:s.f+c.f,l:s,r:c};for(var f=a[0].s,r=1;r<i;++r)a[r].s>f&&(f=a[r].s);var p=new bn(f+1),m=$n(n[u-1],p,0);if(m>t){var r=0,h=0,g=m-t,_=1<<g;for(a.sort(function(e,t){return p[t.s]-p[e.s]||e.f-t.f});r<i;++r){var v=a[r].s;if(p[v]>t)h+=_-(1<<m-p[v]),p[v]=t;else break}for(h>>=g;h>0;){var y=a[r].s;p[y]<t?h-=1<<t-p[y]++-1:++r}for(;r>=0&&h;--r){var b=a[r].s;p[b]==t&&(--p[b],++h)}m=t}return{t:new yn(p),l:m}},$n=function(e,t,n){return e.s==-1?Math.max($n(e.l,t,n+1),$n(e.r,t,n+1)):t[e.s]=n},er=function(e){for(var t=e.length;t&&!e[--t];);for(var n=new bn(++t),r=0,i=e[0],a=1,o=function(e){n[r++]=e},s=1;s<=t;++s)if(e[s]==i&&s!=t)++a;else{if(!i&&a>2){for(;a>138;a-=138)o(32754);a>2&&(o(a>10?a-11<<5|28690:a-3<<5|12305),a=0)}else if(a>3){for(o(i),--a;a>6;a-=6)o(8304);a>2&&(o(a-3<<5|8208),a=0)}for(;a--;)o(i);a=1,i=e[s]}return{c:n.subarray(0,r),n:t}},tr=function(e,t){for(var n=0,r=0;r<t.length;++r)n+=e[r]*t[r];return n},nr=function(e,t,n){var r=n.length,i=Gn(t+2);e[i]=r&255,e[i+1]=r>>8,e[i+2]=e[i]^255,e[i+3]=e[i+1]^255;for(var a=0;a<r;++a)e[i+a+4]=n[a];return(i+4+r)*8},rr=function(e,t,n,r,i,a,o,s,c,l,u){Xn(t,u++,n),++i[256];for(var d=Qn(i,15),f=d.t,p=d.l,m=Qn(a,15),h=m.t,g=m.l,_=er(f),v=_.c,y=_.n,b=er(h),x=b.c,S=b.n,C=new bn(19),w=0;w<v.length;++w)++C[v[w]&31];for(var w=0;w<x.length;++w)++C[x[w]&31];for(var T=Qn(C,7),E=T.t,D=T.l,O=19;O>4&&!E[wn[O-1]];--O);var k=l+5<<3,A=tr(i,In)+tr(a,Ln)+o,j=tr(i,f)+tr(a,h)+o+14+3*O+tr(C,E)+2*C[16]+3*C[17]+7*C[18];if(c>=0&&k<=A&&k<=j)return nr(t,u,e.subarray(c,c+l));var M,N,P,F;if(Xn(t,u,1+(j<A)),u+=2,j<A){M=Fn(f,p,0),N=f,P=Fn(h,g,0),F=h;var ee=Fn(E,D,0);Xn(t,u,y-257),Xn(t,u+5,S-1),Xn(t,u+10,O-4),u+=14;for(var w=0;w<O;++w)Xn(t,u+3*w,E[wn[w]]);u+=3*O;for(var te=[v,x],ne=0;ne<2;++ne)for(var re=te[ne],w=0;w<re.length;++w){var ie=re[w]&31;Xn(t,u,ee[ie]),u+=E[ie],ie>15&&(Xn(t,u,re[w]>>5&127),u+=re[w]>>12)}}else M=Rn,N=In,P=Bn,F=Ln;for(var w=0;w<s;++w){var I=r[w];if(I>255){var ie=I>>18&31;Zn(t,u,M[ie+257]),u+=N[ie+257],ie>7&&(Xn(t,u,I>>23&31),u+=Sn[ie]);var ae=I&31;Zn(t,u,P[ae]),u+=F[ae],ae>3&&(Zn(t,u,I>>5&8191),u+=Cn[ae])}else Zn(t,u,M[I]),u+=N[I]}return Zn(t,u,M[256]),u+N[256]},ir=new xn([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),ar=new yn(0),or=function(e,t,n,r,i,a){var o=a.z||e.length,s=new yn(r+o+5*(1+Math.ceil(o/7e3))+i),c=s.subarray(r,s.length-i),l=a.l,u=(a.r||0)&7;if(t){u&&(c[0]=a.r>>3);for(var d=ir[t-1],f=d>>13,p=d&8191,m=(1<<n)-1,h=a.p||new bn(32768),g=a.h||new bn(m+1),_=Math.ceil(n/3),v=2*_,y=function(t){return(e[t]^e[t+1]<<_^e[t+2]<<v)&m},b=new xn(25e3),x=new bn(288),S=new bn(32),C=0,w=0,T=a.i||0,E=0,D=a.w||0,O=0;T+2<o;++T){var k=y(T),A=T&32767,j=g[k];if(h[A]=j,g[k]=A,D<=T){var M=o-T;if((C>7e3||E>24576)&&(M>423||!l)){u=rr(e,c,0,b,x,S,w,E,O,T-O,u),E=C=w=0,O=T;for(var N=0;N<286;++N)x[N]=0;for(var N=0;N<30;++N)S[N]=0}var P=2,F=0,ee=p,te=A-j&32767;if(M>2&&k==y(T-te))for(var ne=Math.min(f,M)-1,re=Math.min(32767,T),ie=Math.min(258,M);te<=re&&--ee&&A!=j;){if(e[T+P]==e[T+P-te]){for(var I=0;I<ie&&e[T+I]==e[T+I-te];++I);if(I>P){if(P=I,F=te,I>ne)break;for(var ae=Math.min(te,I-2),oe=0,N=0;N<ae;++N){var se=T-te+N&32767,ce=se-h[se]&32767;ce>oe&&(oe=ce,j=se)}}}A=j,j=h[A],te+=A-j&32767}if(F){b[E++]=268435456|On[P]<<18|jn[F];var le=On[P]&31,ue=jn[F]&31;w+=Sn[le]+Cn[ue],++x[257+le],++S[ue],D=T+P,++C}else b[E++]=e[T],++x[e[T]]}}for(T=Math.max(T,D);T<o;++T)b[E++]=e[T],++x[e[T]];u=rr(e,c,l,b,x,S,w,E,O,T-O,u),l||(a.r=u&7|c[u/8|0]<<3,u-=7,a.h=g,a.p=h,a.i=T,a.w=D)}else{for(var T=a.w||0;T<o+l;T+=65535){var de=T+65535;de>=o&&(c[u/8|0]=l,de=o),u=nr(c,u+1,e.subarray(T,de))}a.i=o}return Kn(s,0,r+Gn(u)+i)},sr=function(e,t,n,r,i){if(!i&&(i={l:1},t.dictionary)){var a=t.dictionary.subarray(-32768),o=new yn(a.length+e.length);o.set(a),o.set(e,a.length),e=o,i.w=a.length}return or(e,t.level==null?6:t.level,t.mem==null?i.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,r,i)};function cr(e,t){return sr(e,t||{},0,0)}function lr(e,t){return Yn(e,{i:2},t&&t.out,t&&t.dictionary)}var ur=typeof TextEncoder<`u`&&new TextEncoder,dr=typeof TextDecoder<`u`&&new TextDecoder;try{dr.decode(ar,{stream:!0})}catch{}var fr=function(e){for(var t=``,n=0;;){var r=e[n++],i=(r>127)+(r>223)+(r>239);if(n+i>e.length)return{s:t,r:Kn(e,n-1)};i?i==3?(r=((r&15)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,t+=String.fromCharCode(55296|r>>10,56320|r&1023)):i&1?t+=String.fromCharCode((r&31)<<6|e[n++]&63):t+=String.fromCharCode((r&15)<<12|(e[n++]&63)<<6|e[n++]&63):t+=String.fromCharCode(r)}};function pr(e,t){if(t){for(var n=new yn(e.length),r=0;r<e.length;++r)n[r]=e.charCodeAt(r);return n}if(ur)return ur.encode(e);for(var i=e.length,a=new yn(e.length+(e.length>>1)),o=0,s=function(e){a[o++]=e},r=0;r<i;++r){if(o+5>a.length){var c=new yn(o+8+(i-r<<1));c.set(a),a=c}var l=e.charCodeAt(r);l<128||t?s(l):l<2048?(s(192|l>>6),s(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|e.charCodeAt(++r)&1023,s(240|l>>18),s(128|l>>12&63),s(128|l>>6&63),s(128|l&63)):(s(224|l>>12),s(128|l>>6&63),s(128|l&63))}return Kn(a,0,o)}function mr(e,t){if(t){for(var n=``,r=0;r<e.length;r+=16384)n+=String.fromCharCode.apply(null,e.subarray(r,r+16384));return n}if(dr)return dr.decode(e);var i=fr(e),a=i.s,n=i.r;return n.length&&Jn(8),a}var hr=new Map([[Ve,300],[at,300],[ht,300],[ze,300],[He,300],[pt,300],[ot,300],[lt,300]]),gr=[],_r=new Map;for(let e of bt){if(e.id===0)continue;let t={id:e.id,key:e.key,name:e.name,kind:`block`,maxStack:64,block:e.id,fuel:hr.get(e.id)??0,icon:e.shape===ke.Cross||e.shape===ke.Torch?e.faces[0]:e.faces[4],inCatalog:e.inCatalog};gr[e.id]=t,_r.set(t.key,t)}var vr=256;function yr(e,t,n,r,i={}){let a=vr++,o={id:a,key:`bc:${e}`,name:t,kind:n,maxStack:n===`tool`||n===`armor`?1:64,fuel:0,icon:Oe(r),inCatalog:!0,...i};return gr[a]=o,_r.set(o.key,o),a}var br=yr(`stock`,`Stock`,`material`,`stock`,{fuel:100}),xr=yr(`kohle`,`Kohle`,`material`,`kohle`,{fuel:1600}),Sr=yr(`eisenbarren`,`Eisenbarren`,`material`,`eisenbarren`),Cr=yr(`lumit`,`Lumit`,`material`,`lumit`),wr=yr(`apfel`,`Apfel`,`food`,`apfel`,{food:{hunger:4,saturation:2.4}}),Tr=yr(`waldbeeren`,`Waldbeeren`,`food`,`waldbeeren`,{food:{hunger:2,saturation:.4}}),Er=[`Holz`,`Stein`,`Eisen`,`Lumit`],Dr=[`holz`,`stein`,`eisen`,`lumit`],Or=[2,4,6,8],kr=[59,131,250,1561],Ar=[`spitzhacke`,`schaufel`,`axt`,`schwert`],jr={spitzhacke:2,schaufel:2.5,axt:3,schwert:4},Mr={};for(let e of Ar)Mr[e]=Dr.map((t,n)=>yr(`${t}_${e}`,Nr(`${Er[n]}${e}`),`tool`,`${t}_${e}`,{tool:{type:e,tier:n,speed:Or[n],durability:kr[n],attack:jr[e]+n},fuel:n===0?200:0}));function Nr(e){return e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()}var Pr=[`helm`,`brustpanzer`,`beinschutz`,`stiefel`],Fr=[`helm`,`brustpanzer`,`beinschutz`,`stiefel`],Ir={eisen:[2,6,5,2],lumit:[3,8,6,3]},Lr={eisen:[165,240,225,195],lumit:[363,528,495,429]},Rr={};for(let e of[`eisen`,`lumit`])Rr[e]=Pr.map((t,n)=>yr(`${e}_${t}`,`${e===`eisen`?`Eisen`:`Lumit`}${Fr[n]}`,`armor`,`${e}_${t}`,{armor:{slot:n,points:Ir[e][n],durability:Lr[e][n]}}));function zr(e){return gr[e]}function Br(e){return _r.get(e.includes(`:`)?e:`bc:${e}`)}function Vr(e){return Number.isInteger(e)&&gr[e]!==void 0}function Hr(e){return gr[e]?.maxStack??64}function Ur(e){let t=gr[e];return t?.tool?.durability??t?.armor?.durability??0}var Wr=gr.filter(e=>!!e&&e.inCatalog).map(e=>e.id);function Gr(e){return e?{...e}:null}function Kr(e,t){return!!e&&!!t&&e.id===t.id&&(e.damage??0)===(t.damage??0)}function qr(e){return Hr(e.id)}var Jr=class{slots;constructor(e){this.slots=Array(e).fill(null)}get size(){return this.slots.length}toJSON(){return this.slots.map(Gr)}load(e){for(let t=0;t<this.slots.length;t++){let n=e?.[t];this.slots[t]=n&&zr(n.id)&&n.count>0?{id:n.id,count:Math.min(n.count,Hr(n.id)),damage:n.damage}:null}}isEmpty(){return this.slots.every(e=>e===null)}},Yr=class{main=new Jr(36);armor=new Jr(4);add(e){return Zr(this.main.slots,e,Xr)}count(e){let t=0;for(let n of this.main.slots)n&&n.id===e&&(t+=n.count);return t}armorPoints(){let e=0;for(let t of this.armor.slots)t&&(e+=zr(t.id)?.armor?.points??0);return e}},Xr=[...Array(36).keys()];function Zr(e,t,n=[...e.keys()]){let r=t.count,i=qr(t);for(let a of n){let n=e[a];if(n&&Kr(n,t)&&n.count<i){let e=Math.min(r,i-n.count);if(n.count+=e,r-=e,r===0)return null}}for(let a of n)if(e[a]===null){let n=Math.min(r,i);if(e[a]={id:t.id,count:n,damage:t.damage},r-=n,r===0)return null}return{...t,count:r}}var Qr=class{kind;id;refs=[];onChange=null;onTakeOutput=null;constructor(e,t){this.kind=e,this.id=t}add(e,t,n,r,i){this.refs.push({container:e,index:t,kind:n,group:r,armorSlot:i})}addPlayer(e){for(let t=9;t<36;t++)this.add(e.main,t,`normal`,`player`);for(let t=0;t<9;t++)this.add(e.main,t,`normal`,`hotbar`)}get(e){let t=this.refs[e];return t?t.container.slots[t.index]:null}set(e,t){let n=this.refs[e];n&&(n.container.slots[n.index]=t&&t.count>0?t:null)}snapshot(){return this.refs.map(e=>Gr(e.container.slots[e.index]))}};function $r(e,t){switch(e.kind){case`output`:return!1;case`armor`:return zr(t.id)?.armor?.slot===e.armorSlot;case`fuel`:return(zr(t.id)?.fuel??0)>0;default:return!0}}function ei(e,t){return e.kind===`armor`?1:qr(t)}function ti(e,t,n,r,i){let a=e.refs[n];if(!a)return;if(a.kind===`output`){ni(e,t,a,n,i),e.onChange?.();return}if(i){oi(e,n),e.onChange?.();return}let o=e.get(n),s=t.cursor;if(r===0){if(!s)t.cursor=o,e.set(n,null);else if(!o){if($r(a,s)){let r=Math.min(s.count,ei(a,s));e.set(n,{...s,count:r}),s.count-=r,t.cursor=s.count>0?s:null}}else if(Kr(o,s)){let e=Math.min(s.count,ei(a,o)-o.count);o.count+=e,s.count-=e,t.cursor=s.count>0?s:null}else $r(a,s)&&s.count<=ei(a,s)&&(e.set(n,s),t.cursor=o)}else if(s)o?Kr(o,s)?o.count<ei(a,o)&&(o.count+=1,--s.count,t.cursor=s.count>0?s:null):$r(a,s)&&s.count<=ei(a,s)&&(e.set(n,s),t.cursor=o):$r(a,s)&&(e.set(n,{...s,count:1}),--s.count,t.cursor=s.count>0?s:null);else if(o){let r=Math.ceil(o.count/2);t.cursor={...o,count:r},o.count-=r,e.set(n,o.count>0?o:null)}e.onChange?.()}function ni(e,t,n,r,i){let a=e.get(r);if(!a)return;if(i){for(let t=0;t<64;t++){let t=e.get(r);if(!t)break;let i=ai(e);if(!ri(e,i,t)||(ii(e,i,{...t}),e.onTakeOutput?e.onTakeOutput(n):e.set(r,null),e.onChange?.(),!e.onTakeOutput))break}return}let o=t.cursor;o&&(!Kr(o,a)||o.count+a.count>qr(o))||(t.cursor=o?{...o,count:o.count+a.count}:{...a},e.onTakeOutput?e.onTakeOutput(n):e.set(r,null))}function ri(e,t,n){let r=n.count;for(let i of t){let t=e.get(i),a=e.refs[i];if($r(a,n)&&(t?Kr(t,n)&&(r-=ei(a,t)-t.count):r-=ei(a,n),r<=0))return!0}return!1}function ii(e,t,n){let r=n.count;for(let i of t){let t=e.get(i),a=e.refs[i];if(t&&Kr(t,n)&&$r(a,n)){let e=Math.min(r,ei(a,t)-t.count);if(e>0&&(t.count+=e,r-=e),r===0)return 0}}for(let i of t){let t=e.refs[i];if(!e.get(i)&&$r(t,n)){let a=Math.min(r,ei(t,n));if(e.set(i,{...n,count:a}),r-=a,r===0)return 0}}return r}function ai(e){let t=e.refs.map((e,t)=>t);return[...t.filter(t=>e.refs[t].group===`hotbar`),...t.filter(t=>e.refs[t].group===`player`)]}function oi(e,t){let n=e.refs[t],r=e.get(t);if(!r)return;let i=e.refs.map((e,t)=>t),a;if(n.group===`other`||n.kind===`armor`)a=ai(e);else{let t=zr(r.id),o=i.filter(t=>e.refs[t].group===`other`&&e.refs[t].kind!==`output`),s=i.filter(n=>e.refs[n].kind===`armor`&&t?.armor?.slot===e.refs[n].armorSlot);if(s.length>0&&!e.get(s[0]))a=s;else if(e.kind===`furnace`||e.kind===`chest`){let n=o.filter(t=>e.refs[t].kind===`fuel`&&$r(e.refs[t],r));a=e.kind===`furnace`&&n.length&&(t?.fuel??0)>0?n:o.filter(t=>e.refs[t].kind!==`fuel`)}else{let t=n.group===`hotbar`?`player`:`hotbar`;a=i.filter(n=>e.refs[n].group===t)}}let o=ii(e,a,r);e.set(t,o>0?{...r,count:o}:null)}function si(e,t,n){let r=e.refs[t],i=e.refs.findIndex(e=>e.group===`hotbar`&&e.index===n);if(!r||i<0||i===t||r.kind===`output`)return;let a=e.get(t),o=e.get(i);(!o||$r(r,o))&&(e.set(t,o),e.set(i,a),e.onChange?.())}function ci(e){return e===lt?`chest`:e===st||e===ct?`furnace`:null}function li(e){return e===`chest`?{type:`chest`,container:new Jr(27)}:{type:`furnace`,container:new Jr(3),burn:0,burnMax:0,cook:0}}function ui(e,t){let n={i:e,type:t.type,items:t.container.toJSON()};return t.type===`furnace`&&(n.burn=t.burn,n.burnMax=t.burnMax,n.cook=t.cook),n}function di(e){let t=li(e.type);return t.container.load(e.items),t.type===`furnace`&&(t.burn=e.burn??0,t.burnMax=e.burnMax??0,t.cook=e.cook??0),t}var fi=2;function pi(e){let t=0,n=0;for(let r=0;r<16;r++)e.blocks[r]!==null&&(t|=1<<r,n++);let r=[...e.blockEntities].map(([e,t])=>ui(e,t)),i=pr(JSON.stringify(r)),a=new Uint8Array(3+n*de*2+4+i.byteLength),o=new DataView(a.buffer);o.setUint8(0,fi),o.setUint16(1,t,!0);let s=3;for(let t=0;t<16;t++){let n=e.blocks[t];if(n)for(let e=0;e<de;e++,s+=2)o.setUint16(s,n[e],!0)}return o.setUint32(s,i.byteLength,!0),a.set(i,s+4),cr(a,{level:6})}function mi(e){let t=lr(e),n=new DataView(t.buffer,t.byteOffset,t.byteLength),r=n.getUint8(0);if(r!==1&&r!==2)throw Error(`Unbekannte Chunk-Formatversion ${r}`);let i=n.getUint16(1,!0),a=new Uint16Array(fe),o=3;for(let e=0;e<16;e++){if(!(i&1<<e))continue;let t=e*de;for(let e=0;e<de;e++,o+=2)a[t+e]=n.getUint16(o,!0)}let s=[];if(r>=2&&o+4<=t.byteLength){let e=n.getUint32(o,!0);try{s=JSON.parse(mr(t.subarray(o+4,o+4+e)))}catch{s=[]}}return{blocks:a,blockEntities:s}}function hi(e,t){for(let n of t)n&&typeof n.i==`number`&&e.blockEntities.set(n.i,di(n))}function gi(e,t){let n=xt(e);if(n.harvestTier<0)return!0;let r=t===null?void 0:zr(t)?.tool;return!!r&&r.type===n.tool&&r.tier>=n.harvestTier}function _i(e,t){let n=xt(e),r=t===null?void 0:zr(t)?.tool;return r&&r.type===n.tool?r.speed:r&&r.type===`schwert`&&(n.id===Be||n.id===Ue||n.id===mt||n.id===gt)?1.5:1}function vi(e,t){let n=xt(e);if(n.hardness<0)return 1/0;if(n.hardness===0)return 0;let r=_i(e,t)/n.hardness/(gi(e,t)?30:100);return Math.ceil(1/r)}function yi(e,t,n){if(e===je||At(e)||!gi(e,t))return[];switch(e){case Pe:case rt:return[{id:Ne,count:1}];case Me:return[{id:Ye,count:1}];case Ge:return[{id:xr,count:1}];case dt:return[{id:Cr,count:1}];case ct:return[{id:st,count:1}];case Je:case Ze:return[];case et:return n()<.5?[{id:br,count:1+Math.floor(n()*2)}]:[];case ft:return[{id:Tr,count:1+Math.floor(n()*3)}];case Be:return n()<.05?[{id:wr,count:1}]:n()<.04?[{id:br,count:1}]:[];case Ue:case mt:case gt:return n()<.04?[{id:br,count:1}]:[];default:return[{id:e,count:1}]}}var bi=[Ve,at,ht],xi=[ze,He,pt],Si=[];function Ci(e,t,n,r=1){let i={};for(let[e,n]of Object.entries(t))i[e]=Array.isArray(n)?n:[n];Si.push({type:`shaped`,pattern:e,keys:i,result:{id:n,count:r}})}function wi(e,t,n=1){Si.push({type:`shapeless`,ingredients:e.map(e=>Array.isArray(e)?e:[e]),result:{id:t,count:n}})}wi([ze],Ve,4),wi([He],at,4),wi([pt],ht,4),Ci([`#`,`#`],{"#":bi},br,4),Ci([`##`,`##`],{"#":bi},ot),Ci([`###`,`# #`,`###`],{"#":bi},lt),Ci([`###`,`# #`,`###`],{"#":Ye},st),Ci([`##`,`##`],{"#":Fe},Le),Ci([`##`,`##`],{"#":it},Xe,2),Ci([`c`,`|`],{c:xr,"|":br},ut,4),Ci([` g `,`gcg`,` g `],{g:Je,c:xr},tt,2),Ci([`##`,`##`],{"#":nt},nt),[bi,[Ye],[Sr],[Cr]].forEach((e,t)=>{Ci([`MMM`,` | `,` | `],{M:e,"|":br},Mr.spitzhacke[t]),Ci([`M`,`|`,`|`],{M:e,"|":br},Mr.schaufel[t]),Ci([`MM`,`M|`,` |`],{M:e,"|":br},Mr.axt[t]),Ci([`M`,`M`,`|`],{M:e,"|":br},Mr.schwert[t])});for(let[e,t]of[[`eisen`,Sr],[`lumit`,Cr]])Ci([`MMM`,`M M`],{M:t},Rr[e][0]),Ci([`M M`,`MMM`,`MMM`],{M:t},Rr[e][1]),Ci([`MMM`,`M M`,`M M`],{M:t},Rr[e][2]),Ci([`M M`,`M M`],{M:t},Rr[e][3]);function Ti(e,t,n){let r=t,i=n,a=-1,o=-1;for(let s=0;s<n;s++)for(let n=0;n<t;n++)e[s*t+n]&&(r=Math.min(r,n),a=Math.max(a,n),i=Math.min(i,s),o=Math.max(o,s));if(a<0)return null;let s=a-r+1,c=o-i+1,l=(n,a)=>e[(i+a)*t+r+n]?.id??null,u=[];for(let t of e)t&&u.push(t.id);for(let e of Si)if(e.type===`shaped`){let t=e.pattern.length;if(Math.max(...e.pattern.map(e=>e.length))!==s||t!==c)continue;for(let t of[!1,!0]){let n=!0;for(let r=0;r<c&&n;r++)for(let i=0;i<s&&n;i++){let a=e.pattern[r][t?s-1-i:i]??` `,o=l(i,r);n=a===` `?o===null:o!==null&&e.keys[a].includes(o)}if(n)return{...e.result}}}else{if(u.length!==e.ingredients.length)continue;let t=Array(u.length).fill(!1);if(e.ingredients.every(e=>{let n=u.findIndex((n,r)=>!t[r]&&e.includes(n));return n<0?!1:(t[n]=!0,!0)}))return{...e.result}}return null}var Ei=new Map([[Ke,{id:Sr,count:1}],[dt,{id:Cr,count:1}],[Fe,{id:Je,count:1}],[Ye,{id:Me,count:1}],[it,{id:Xe,count:1}],...xi.map(e=>[e,{id:xr,count:1}])]);function Di(e){let t=Ei.get(e);return t?{...t}:null}function Oi(e){return zr(e)?.fuel??0}var ki=class{id;mode;inventory=new Yr;cursor=null;selected=0;health=20;hunger=20;saturation=5;exhaustion=0;air=300;dead=!1;hurtCooldown=0;foodTimer=0;voidTimer=0;x=0;y=0;z=0;yaw=0;pitch=0;eyesInWater=!1;inWater=!1;spawn=null;window=null;breakStart=null;dirty=!0;lastDeath=null;constructor(e,t){this.id=e,this.mode=t}held(){return this.inventory.main.slots[this.selected]}heldId(){return this.held()?.id??null}consumeHeld(e=1){if(this.mode===`creative`)return;let t=this.held();t&&(t.count-=e,t.count<=0&&(this.inventory.main.slots[this.selected]=null),this.dirty=!0)}damageHeldTool(){if(this.mode===`creative`)return!1;let e=this.held();return!e||!zr(e.id)?.tool?!1:(e.damage=(e.damage??0)+1,this.dirty=!0,e.damage>=Ur(e.id)&&(this.inventory.main.slots[this.selected]=null,!0))}addExhaustion(e){this.mode!==`creative`&&(this.exhaustion=Math.min(40,this.exhaustion+e))}damage(e,t){if(this.mode===`creative`||this.dead||e<=0||this.hurtCooldown>0&&t!==`void`&&t!==`starve`&&t!==`drown`)return!1;let n=e;if(t===`generic`){let t=this.inventory.armorPoints();n=e*(1-Math.min(20,t)/25);for(let e=0;e<4;e++){let t=this.inventory.armor.slots[e];t&&(t.damage=(t.damage??0)+1,t.damage>=Ur(t.id)&&(this.inventory.armor.slots[e]=null))}}return this.health=Math.max(0,this.health-n),this.hurtCooldown=10,this.addExhaustion(.1),this.dirty=!0,this.health<=0&&(this.dead=!0,this.lastDeath=t,!0)}heal(e){if(this.dead)return;let t=Math.min(20,this.health+e);t!==this.health&&(this.health=t,this.dirty=!0)}tickSurvival(){if(this.hurtCooldown>0&&this.hurtCooldown--,this.mode===`creative`||this.dead)return null;if(this.exhaustion>=4&&(this.exhaustion-=4,this.saturation>0?this.saturation=Math.max(0,this.saturation-1):this.hunger=Math.max(0,this.hunger-1),this.dirty=!0),this.foodTimer++,this.hunger>=18&&this.health<20)this.foodTimer>=80&&(this.heal(1),this.addExhaustion(3),this.foodTimer=0);else if(this.hunger<=0){if(this.foodTimer>=80&&(this.foodTimer=0,this.health>1&&this.damage(1,`starve`)))return`starve`}else this.foodTimer=0;if(this.eyesInWater){if(this.air--,this.air<=-20&&(this.air=0,this.damage(2,`drown`)))return`drown`;this.dirty=!0}else this.air<300&&(this.air=Math.min(300,this.air+5),this.dirty=!0);return this.y<-10&&++this.voidTimer>=10&&(this.voidTimer=0,this.damage(4,`void`))?`void`:null}eat(){let e=this.held(),t=e?zr(e.id)?.food:void 0;return!t||this.hunger>=20&&this.mode!==`creative`?!1:(this.hunger=Math.min(20,this.hunger+t.hunger),this.saturation=Math.min(this.hunger,this.saturation+t.saturation),this.consumeHeld(),this.dirty=!0,!0)}respawn(){this.health=20,this.hunger=20,this.saturation=5,this.exhaustion=0,this.air=300,this.dead=!1,this.lastDeath=null,this.hurtCooldown=20,this.dirty=!0}snapshot(){return{main:this.inventory.main.toJSON(),armor:this.inventory.armor.toJSON(),cursor:this.cursor?{...this.cursor}:null,selected:this.selected,health:this.health,hunger:this.hunger,saturation:this.saturation,air:this.air,armorPoints:this.inventory.armorPoints(),mode:this.mode,dead:this.dead}}persist(){return{main:this.inventory.main.toJSON(),armor:this.inventory.armor.toJSON(),selected:this.selected,health:this.health,hunger:this.hunger,saturation:this.saturation,air:this.air,spawn:this.spawn??void 0}}restore(e){this.inventory.main.load(e.main),this.inventory.armor.load(e.armor),this.selected=Math.max(0,Math.min(8,e.selected??0)),this.health=e.health??20,this.hunger=e.hunger??20,this.saturation=e.saturation??5,this.air=e.air??300,this.spawn=e.spawn??null,this.dead=this.health<=0,this.dirty=!0}},Ai=1500,ji=[1,-1,0,0],Mi=[0,0,1,-1];function Ni(e,t,n){return((e+1048576)*2097152+(n+1048576))*256+t}function Pi(e){let t=e%256,n=(e-t)/256,r=n%2097152-1048576;return[Math.floor(n/2097152)-1048576,t,r]}function Fi(e){if(e===je)return!0;if(e<0||At(e)||Ct[e])return!1;let t=xt(e);return t.shape===ke.Cross||t.shape===ke.Torch}var Ii=class{world;setBlock;scheduled=new Map;constructor(e,t){this.world=e,this.setBlock=t}get pending(){return this.scheduled.size}schedule(e,t,n,r,i=5){if(t<0||t>=256)return;let a=Ni(e,t,n),o=r+i,s=this.scheduled.get(a);(s===void 0||s>o)&&this.scheduled.set(a,o)}onBlockChanged(e,t,n,r){let i=(e,t,n)=>this.world.getBlock(e,t,n);At(i(e,t,n))&&this.schedule(e,t,n,r);let a=[[e+1,t,n],[e-1,t,n],[e,t+1,n],[e,t-1,n],[e,t,n+1],[e,t,n-1]];for(let[e,t,n]of a)At(i(e,t,n))&&this.schedule(e,t,n,r)}tick(e){if(this.scheduled.size===0)return;let t=[];for(let[n,r]of this.scheduled)if(r<=e&&(t.push(n),t.length>=Ai))break;for(let e of t){this.scheduled.delete(e);let[t,n,r]=Pi(e);this.update(t,n,r)}}get(e,t,n){return t<0?-1:t>=256?je:this.world.getBlockOrUnloaded(e,t,n)}update(e,t,n){let r=this.get(e,t,n);if(r<0||!At(r))return;let i=kt[r];if(i!==0){let i,a=this.get(e,t+1,n);if(a>=0&&At(a))i=vt;else{let r=99,a=0;for(let i=0;i<4;i++){let o=this.get(e+ji[i],t,n+Mi[i]);if(o<0||!At(o))continue;let s=kt[o];s===0&&a++,r=Math.min(r,s===8?0:s)}let o=this.get(e,t-1,n),s=o>=0&&(Ct[o]===1||At(o)&&kt[o]===0);i=a>=2&&s?We:r+1<=7?_t[r+1]:je}if(i!==r){this.setBlock(e,t,n,i);return}}let a=this.get(e,t-1,n),o=!1;if(t>0&&a>=0&&(Fi(a)||At(a)&&kt[a]!==0&&kt[a]!==8?(this.setBlock(e,t-1,n,vt),o=!0):At(a)&&(o=!0)),a>=0&&At(a)||o&&i!==0)return;let s=i===0||i===8?1:i+1;if(!(s>7))for(let r=0;r<4;r++){let i=e+ji[r],a=n+Mi[r],o=this.get(i,t,a);o<0||(Fi(o)||At(o)&&kt[o]!==0&&kt[o]!==8&&kt[o]>s)&&this.setBlock(i,t,a,_t[s])}}},Li=.125,Ri=class{id;item;x;y;z;vx=0;vy=0;vz=0;age=0;pickupDelay=10;onGround=!1;constructor(e,t,n,r,i){this.id=e,this.item=t,this.x=n,this.y=r,this.z=i}tick(e){this.age++,this.pickupDelay>0&&this.pickupDelay--;let t=this.x,n=this.y,r=this.z;At(e.getBlock(Math.floor(this.x),Math.floor(this.y+.1),Math.floor(this.z)))?(this.vy=this.vy*.8+.01,this.vx*=.9,this.vz*=.9):this.vy-=.04,this.move(e);let i=this.onGround?.588:.98;return this.vx*=i,this.vz*=i,this.vy*=.98,this.x!==t||this.y!==n||this.z!==r}move(e){let t=new rn(this.x-Li,this.y,this.z-Li,this.x+Li,this.y+Li*2,this.z+Li),n=this.vx,r=this.vy,i=this.vz,a=t.expandTowards(n,r,i),o=[];for(let t=Math.floor(a.minY);t<=Math.floor(a.maxY);t++)for(let n=Math.floor(a.minZ);n<=Math.floor(a.maxZ);n++)for(let r=Math.floor(a.minX);r<=Math.floor(a.maxX);r++){let i=e.getBlockOrUnloaded(r,t,n);(i<0||Ct[i])&&o.push(new rn(r,t,n,r+1,t+1,n+1))}if(o.some(e=>e.intersects(t))){this.y=Math.floor(this.y)+1,this.vy=0;return}let s=r;for(let e of o)r=t.clipY(e,r);t=t.offset(0,r,0);for(let e of o)n=t.clipX(e,n);t=t.offset(n,0,0);for(let e of o)i=t.clipZ(e,i);t=t.offset(0,0,i),this.onGround=s<0&&r!==s,r!==s&&(this.vy=0),n!==this.vx&&(this.vx=0),i!==this.vz&&(this.vz=0),this.x=(t.minX+t.maxX)/2,this.y=t.minY,this.z=(t.minZ+t.maxZ)/2}snapshot(){return{id:this.id,item:{...this.item},x:this.x,y:this.y,z:this.z,age:this.age}}};function zi(e,t,n,r,i,a){if(e.getBlock(n,r,i)===a||!e.setBlockRaw(n,r,i,a))return!1;t.onBlockChanged(n,r,i,a),e.markBlockDirty(n,r,i);let o=e.getColumn(n>>4,i>>4);return o&&(o.modified=!0),!0}var Bi={fall:`Du bist zu tief gefallen.`,drown:`Du bist ertrunken.`,starve:`Du bist verhungert.`,void:`Du bist ins Leere gestürzt.`,generic:`Du bist gestorben.`},Vi=class{world;light;time;dayLengthTicks;mode;players=new Map;items=new Map;water;spawn={x:.5,y:80,z:.5};listeners=[];rng;nextEntityId=1;nextWindowId=1;itemsDirty=!1;tickCount=0;constructor(e){this.world=e.world,this.light=e.light,this.time=e.time,this.dayLengthTicks=e.dayLengthTicks,this.mode=e.mode,this.rng=new be((e.seed??1)^20973),this.water=new Ii(this.world,(e,t,n,r)=>this.setBlock(e,t,n,r))}onEvent(e){return this.listeners.push(e),()=>{let t=this.listeners.indexOf(e);t>=0&&this.listeners.splice(t,1)}}emit(e,t=null){for(let n of this.listeners)n(e,t)}sound(e,t,n,r,i){this.emit({t:`sound`,name:e,x:t,y:n,z:r,block:i})}addPlayer(e,t=this.mode){let n=new ki(e,t);return this.players.set(e,n),n}removePlayer(e){let t=this.players.get(e);t&&this.closeWindow(t),this.players.delete(e)}getPlayer(e){return this.players.get(e)}handle(e,t=1){let n=this.players.get(t);if(n&&!(n.dead&&e.t!==`respawn`&&e.t!==`playerState`))switch(e.t){case`setBlock`:{let t=n.mode===`creative`?this.validateSetBlock(e.x,e.y,e.z,e.id):`Nur im Kreativmodus`;if(t)return this.reject(n,e.seq,t,e.x,e.y,e.z);this.setBlock(e.x,e.y,e.z,e.id);break}case`startBreak`:n.breakStart={x:e.x,y:e.y,z:e.z,tick:this.time};break;case`breakBlock`:this.breakBlock(n,e.seq,e.x,e.y,e.z);break;case`placeBlock`:this.placeBlock(n,e.seq,e.x,e.y,e.z,e.id);break;case`useBlock`:this.useBlock(n,e.x,e.y,e.z);break;case`openInventory`:this.openInventory(n);break;case`closeWindow`:this.closeWindow(n);break;case`windowClick`:n.window&&Number.isInteger(e.slot)&&(ti(n.window.win,n,e.slot,+(e.button===1),!!e.shift),this.afterWindowChange(n));break;case`windowSwap`:n.window&&Number.isInteger(e.slot)&&e.hotbar>=0&&e.hotbar<9&&(si(n.window.win,e.slot,e.hotbar),this.afterWindowChange(n));break;case`creativePick`:if(n.mode!==`creative`)break;n.cursor=e.id>0&&Vr(e.id)?{id:e.id,count:Math.max(1,Math.min(Hr(e.id),e.count|0))}:null,n.dirty=!0;break;case`pickBlock`:this.pickBlock(n,e.id);break;case`selectSlot`:Number.isInteger(e.slot)&&e.slot>=0&&e.slot<9&&(n.selected=e.slot,n.dirty=!0);break;case`eat`:n.eat()&&this.sound(`eat`,n.x,n.y,n.z);break;case`drop`:this.dropHeld(n,e.all);break;case`respawn`:if(n.dead){n.respawn();let e=n.spawn??this.spawn;n.x=e.x,n.y=e.y,n.z=e.z,this.emit({t:`teleport`,x:e.x,y:e.y,z:e.z},n.id)}break;case`setMode`:(e.mode===`creative`||e.mode===`survival`)&&(n.mode=e.mode,this.mode=e.mode,n.mode===`creative`&&n.respawn(),n.dirty=!0);break;case`playerState`:this.onPlayerState(n,e)}}reject(e,t,n,r,i,a){this.emit({t:`rejected`,seq:t,reason:n},e.id),this.emit({t:`blockChanged`,x:r,y:i,z:a,id:this.world.getBlock(r,i,a)},e.id)}onPlayerState(e,t){if(![t.x,t.y,t.z].every(Number.isFinite))return;let n=Math.hypot(t.x-e.x,t.z-e.z);if(e.x=t.x,e.y=t.y,e.z=t.z,e.yaw=t.yaw,e.pitch=t.pitch,e.inWater=t.inWater,e.eyesInWater=t.eyesInWater,!e.dead&&(t.sprinting&&n<2&&e.addExhaustion(.1*n),t.jumped&&e.addExhaustion(t.sprinting?.2:.05),t.landedFrom>3&&!t.inWater)){let n=Math.ceil(t.landedFrom-3);e.damage(n,`fall`)?this.onDeath(e):this.sound(`hurt`,e.x,e.y,e.z)}}inReach(e,t,n,r){let i=(e.mode===`creative`?5:me)+1.5;return Math.hypot(t+.5-e.x,n+.5-(e.y+1.6),r+.5-e.z)<=i+1}validateSetBlock(e,t,n,r){if(!Number.isInteger(e)||!Number.isInteger(t)||!Number.isInteger(n))return`Ungültige Position`;if(t<0||t>=256)return`Ausserhalb der Welt`;if(!Number.isInteger(r)||r<0||r>=yt)return`Unbekannter Block`;if(!this.world.hasColumn(e>>4,n>>4))return`Chunk nicht geladen`;if(r!==je){if(!xt(this.world.getBlock(e,t,n)).replaceable)return`Platz belegt`;let i=xt(r);if(i.shape===ke.Cross){let r=this.world.getBlock(e,t-1,n);if(r!==Pe&&r!==Ne&&r!==rt&&r!==Fe)return`Braucht Boden`}if(i.shape===ke.Torch&&!Ct[this.world.getBlock(e,t-1,n)])return`Braucht festen Boden`}return null}breakBlock(e,t,n,r,i){if(!this.world.hasColumn(n>>4,i>>4)||r<0||r>=256)return this.reject(e,t,`Ungültig`,n,r,i);let a=this.world.getBlock(n,r,i);if(a===je||At(a))return;if(!this.inReach(e,n,r,i))return this.reject(e,t,`Zu weit entfernt`,n,r,i);let o=e.mode===`creative`;if(!o){let o=vi(a,e.heldId());if(!Number.isFinite(o))return this.reject(e,t,`Unzerstörbar`,n,r,i);let s=e.breakStart,c=s&&s.x===n&&s.y===r&&s.z===i?this.time-s.tick:0;if(o>1&&c<o*.7-2)return this.reject(e,t,`Zu schnell abgebaut`,n,r,i)}e.breakStart=null;let s=e.heldId(),c=xt(a),l=this.getBlockEntity(n,r,i);if(l)for(let e of l.container.slots)e&&this.spawnItem(e,n+.5,r+.5,i+.5);if(this.setBlock(n,r,i,je),this.sound(`break`,n+.5,r+.5,i+.5,a),!o){for(let e of yi(a,s,()=>this.rng.next()))this.spawnItem(e,n+.5,r+.3,i+.5);e.addExhaustion(.005),c.hardness>0&&e.damageHeldTool()&&this.sound(`toolBreak`,e.x,e.y,e.z)}}placeBlock(e,t,n,r,i,a){let o=e.held(),s=o?zr(o.id)?.block:void 0;if(e.mode!==`creative`&&(s===void 0||s!==a))return this.reject(e,t,`Block nicht in der Hand`,n,r,i);if(e.mode===`creative`&&!(a>0&&a<yt))return this.reject(e,t,`Unbekannter Block`,n,r,i);if(!this.inReach(e,n,r,i))return this.reject(e,t,`Zu weit entfernt`,n,r,i);let c=this.validateSetBlock(n,r,i,a);if(c)return this.reject(e,t,c,n,r,i);this.setBlock(n,r,i,a),e.consumeHeld(),this.sound(`place`,n+.5,r+.5,i+.5,a)}pickBlock(e,t){if(e.mode!==`creative`||!Vr(t)||!zr(t)?.inCatalog){let n=e.inventory.main.slots.findIndex((e,n)=>n<9&&e?.id===t);n>=0&&(e.selected=n,e.dirty=!0);return}let n=e.inventory.main.slots,r=n.findIndex((e,n)=>n<9&&e?.id===t);if(r>=0)e.selected=r;else{let r=n.findIndex((e,t)=>t<9&&!e);r>=0&&(e.selected=r),n[e.selected]={id:t,count:Hr(t)}}e.dirty=!0}dropHeld(e,t){let n=e.held();if(!n)return;let r=t?n.count:1,i={...n,count:r};n.count-=r,n.count<=0&&(e.inventory.main.slots[e.selected]=null),e.dirty=!0,this.throwItem(e,i)}throwItem(e,t){let n=this.spawnItem(t,e.x,e.y+1.3,e.z,!1),r=Math.cos(e.pitch);n.vx=-Math.sin(e.yaw)*r*.3,n.vy=Math.sin(e.pitch)*.3+.1,n.vz=-Math.cos(e.yaw)*r*.3,n.pickupDelay=40}openInventory(e){this.closeWindow(e);let t=new Qr(`inventory`,this.nextWindowId++),n=new Jr(4),r=new Jr(1);t.add(r,0,`output`,`other`);for(let e=0;e<4;e++)t.add(n,e,`normal`,`other`);for(let n=0;n<4;n++)t.add(e.inventory.armor,n,`armor`,`other`,n);t.addPlayer(e.inventory),this.setupCrafting(t,n,r,2),e.window={win:t,grid:n,output:r},this.sendWindow(e)}setupCrafting(e,t,n,r){let i=()=>{n.slots[0]=Ti(t.slots,r,r)};e.onChange=i,e.onTakeOutput=()=>{for(let e=0;e<t.size;e++){let n=t.slots[e];n&&(n.count--,n.count<=0&&(t.slots[e]=null))}i()},i()}useBlock(e,t,n,r){if(!this.inReach(e,t,n,r))return;let i=this.world.getBlock(t,n,r);if(this.closeWindow(e),i===ot){let i=new Qr(`crafting`,this.nextWindowId++),a=new Jr(9),o=new Jr(1);i.add(o,0,`output`,`other`);for(let e=0;e<9;e++)i.add(a,e,`normal`,`other`);i.addPlayer(e.inventory),this.setupCrafting(i,a,o,3),e.window={win:i,grid:a,output:o,pos:{x:t,y:n,z:r}}}else if(i===st||i===ct||i===lt){let a=this.getBlockEntity(t,n,r)??this.ensureBlockEntity(t,n,r,i);if(!a)return;let o=new Qr(a.type===`chest`?`chest`:`furnace`,this.nextWindowId++);if(a.type===`chest`)for(let e=0;e<27;e++)o.add(a.container,e,`normal`,`other`);else o.add(a.container,0,`input`,`other`),o.add(a.container,1,`fuel`,`other`),o.add(a.container,2,`output`,`other`);o.addPlayer(e.inventory),e.window={win:o,pos:{x:t,y:n,z:r}},this.sound(`open`,t+.5,n+.5,r+.5,i)}else return;this.sendWindow(e)}closeWindow(e){let t=e.window;if(!t&&!e.cursor)return;let n=t=>{if(!t)return;let n=e.inventory.add(t);n&&this.throwItem(e,n)};if(t?.grid)for(let e=0;e<t.grid.size;e++)n(t.grid.slots[e]),t.grid.slots[e]=null;n(e.cursor),e.cursor=null,e.window=null,e.dirty=!0,t&&this.emit({t:`window`,window:null},e.id)}afterWindowChange(e){let t=e.window;if(t?.pos){let e=this.world.getColumn(t.pos.x>>4,t.pos.z>>4);e&&(e.modified=!0)}e.dirty=!0,this.sendWindow(e)}sendWindow(e){let t=e.window;if(!t)return;let n={id:t.win.id,kind:t.win.kind,slots:t.win.snapshot()};if(t.win.kind===`furnace`&&t.pos){let e=this.getBlockEntity(t.pos.x,t.pos.y,t.pos.z);e?.type===`furnace`&&(n.burn=e.burn,n.burnMax=e.burnMax,n.cook=e.cook)}this.emit({t:`window`,window:n},e.id)}getBlockEntity(e,t,n){return this.world.getColumn(e>>4,n>>4)?.blockEntities.get(Kt(e&15,t,n&15))}ensureBlockEntity(e,t,n,r){let i=ci(r),a=this.world.getColumn(e>>4,n>>4);if(!i||!a)return;let o=Kt(e&15,t,n&15),s=a.blockEntities.get(o);return s&&s.type===i||(s=li(i),a.blockEntities.set(o,s),a.modified=!0),s}setBlock(e,t,n,r){let i=this.world.getBlock(e,t,n);if(!zi(this.world,this.light,e,t,n,r))return;let a=this.world.getColumn(e>>4,n>>4);if(a){let o=Kt(e&15,t,n&15),s=ci(r);s?ci(i)!==s&&this.ensureBlockEntity(e,t,n,r):a.blockEntities.delete(o)}this.emit({t:`blockChanged`,x:e,y:t,z:n,id:r}),this.water.onBlockChanged(e,t,n,this.time);for(let a of this.players.values()){let o=a.window?.pos;(o&&o.x===e&&o.y===t&&o.z===n&&ci(r)!==ci(i)||o&&o.x===e&&o.y===t&&o.z===n&&r===je)&&this.closeWindow(a)}if(t+1<256&&!xt(r).solid){let r=this.world.getBlock(e,t+1,n),i=xt(r).shape;if(r!==je&&(i===ke.Cross||i===ke.Torch)){for(let i of yi(r,null,()=>this.rng.next()))this.spawnItem(i,e+.5,t+1.3,n+.5);this.setBlock(e,t+1,n,je)}}}spawnItem(e,t,n,r,i=!0){let a=new Ri(this.nextEntityId++,{...e},t,n,r);return i&&(a.vx=(this.rng.next()-.5)*.15,a.vy=.15+this.rng.next()*.05,a.vz=(this.rng.next()-.5)*.15),this.items.set(a.id,a),this.itemsDirty=!0,a}tickItems(){let e=[...this.items.values()];for(let t of e)if(this.world.hasColumn(Math.floor(t.x)>>4,Math.floor(t.z)>>4)){if(t.tick(this.world)&&(this.itemsDirty=!0),t.age>6e3||t.y<-64)this.items.delete(t.id),this.itemsDirty=!0;else if(!(t.pickupDelay>0))for(let e of this.players.values()){if(e.dead||Math.abs(t.x-e.x)>1.425||Math.abs(t.z-e.z)>1.425||t.y<e.y-.75||t.y>e.y+2.3)continue;let n=e.inventory.add(t.item);if(!n||n.count!==t.item.count){if(e.dirty=!0,this.sound(`pickup`,t.x,t.y,t.z),!n){this.items.delete(t.id),this.itemsDirty=!0;break}t.item=n,this.itemsDirty=!0}}}if(this.tickCount%20==0){let e=[...this.items.values()];for(let t=0;t<e.length;t++){let n=e[t];if(this.items.has(n.id))for(let r=t+1;r<e.length;r++){let t=e[r];this.items.has(t.id)&&n.item.id===t.item.id&&(n.item.damage??0)===(t.item.damage??0)&&(Math.hypot(n.x-t.x,n.y-t.y,n.z-t.z)>.8||n.item.count+t.item.count>Hr(n.item.id)||(n.item.count+=t.item.count,n.age=Math.min(n.age,t.age),this.items.delete(t.id),this.itemsDirty=!0))}}}}itemSnapshots(){return[...this.items.values()].map(e=>e.snapshot())}serializeItems(){return[...this.items.values()].map(e=>({item:{...e.item},x:e.x,y:e.y,z:e.z,age:e.age}))}loadItems(e){for(let t of e??[]){if(!t?.item||!Vr(t.item.id)||!(t.item.count>0))continue;let e=this.spawnItem(t.item,t.x,t.y,t.z,!1);e.age=t.age??0,e.pickupDelay=0}}tick(){this.time++,this.tickCount++,this.tickCount%20==0&&this.emit({t:`time`,ticks:this.time}),this.water.tick(this.time),this.tickFurnaces(),this.tickItems();for(let e of this.players.values())e.tickSurvival()&&this.onDeath(e),e.window?.win.kind===`furnace`&&this.sendWindow(e),e.dirty&&(e.dirty=!1,this.emit({t:`player`,state:e.snapshot()},e.id));this.itemsDirty&&(this.itemsDirty=!1,this.emit({t:`items`,list:this.itemSnapshots()}))}onDeath(e){this.closeWindow(e);for(let t of[e.inventory.main,e.inventory.armor])for(let n=0;n<t.size;n++){let r=t.slots[n];r&&this.spawnItem(r,e.x,e.y+1,e.z),t.slots[n]=null}e.dirty=!0,this.sound(`death`,e.x,e.y,e.z),this.emit({t:`death`,message:Bi[e.lastDeath??`generic`]},e.id)}tickFurnaces(){for(let e of this.world.columns.values())if(e.blockEntities.size!==0)for(let[t,n]of e.blockEntities){if(n.type!==`furnace`||!this.tickFurnace(n))continue;e.modified=!0;let r=e.cx*16+(t&15),i=e.cz*16+(t>>4&15),a=t>>8,o=n.burn>0,s=this.world.getBlock(r,a,i);o&&s===st?this.setBlock(r,a,i,ct):!o&&s===ct&&this.setBlock(r,a,i,st)}}tickFurnace(e){let[t,n,r]=e.container.slots,i=e.burn>0,a=!1;e.burn>0&&(e.burn--,a=!0);let o=t?Di(t.id):null,s=!!o&&(!r||r.id===o.id&&r.count+o.count<=Hr(r.id));if(o&&s){if(e.burn===0&&n){let t=Oi(n.id);t>0&&(e.burn=e.burnMax=t,n.count--,n.count<=0&&(e.container.slots[1]=null),a=!0)}e.burn>0?(e.cook++,a=!0,e.cook>=200&&(e.cook=0,t.count--,t.count<=0&&(e.container.slots[0]=null),r?r.count+=o.count:e.container.slots[2]={...o})):e.cook>0&&(e.cook=Math.max(0,e.cook-2),a=!0)}else e.cook>0&&(e.cook=0,a=!0);return a||i!==e.burn>0}modifiedColumns(){let e=[];for(let t of this.world.columns.values())t.modified&&e.push({cx:t.cx,cz:t.cz});return e}give(e,t){let n=this.players.get(e);return n?(n.dirty=!0,Zr(n.inventory.main.slots,t)):t}},Hi=class{sim;playerId;sharesWorld=!0;unsub=[];constructor(e,t=1){this.sim=e,this.playerId=t}send(e){this.sim.handle(e,this.playerId)}onEvent(e){let t=this.sim.onEvent((t,n)=>{(n===null||n===this.playerId)&&e(t)});return this.unsub.push(t),t}close(){for(let e of this.unsub)e();this.unsub.length=0}},H=16,Ui=class{data=new Uint8ClampedArray(H*H*4);set(e,t,n,r=255){e=(e%H+H)%H,t=(t%H+H)%H;let i=(t*H+e)*4;this.data[i]=n>>16&255,this.data[i+1]=n>>8&255,this.data[i+2]=n&255,this.data[i+3]=r}get(e,t){e=(e%H+H)%H,t=(t%H+H)%H;let n=(t*H+e)*4;return this.data[n]<<16|this.data[n+1]<<8|this.data[n+2]}alpha(e,t){return e=(e%H+H)%H,t=(t%H+H)%H,this.data[(t*H+e)*4+3]}fill(e){for(let t=0;t<H;t++)for(let n=0;n<H;n++){let r=e(n,t);r!==null&&this.set(n,t,r)}}},Wi=2,Gi=[1,2,4];function Ki(e){Wi=e}function qi(){return Wi}function Ji(e,t=Wi){if(t<=1)return;let n=e.data;for(let e=0;e<H;e+=t)for(let r=0;r<H;r+=t){let i=(e*H+r)*4;for(let a=0;a<t;a++)for(let o=0;o<t;o++){let t=((e+a)*H+(r+o))*4;n[t]=n[i],n[t+1]=n[i+1],n[t+2]=n[i+2],n[t+3]=n[i+3]}}}var Yi=e=>(t,n)=>{e(t,n),Ji(t)};function Xi(e,t){let n=H/t,r=new Float32Array(n*n);for(let t=0;t<r.length;t++)r[t]=e.next();let i=(e,t)=>r[(t%n+n)%n*n+(e%n+n)%n];return(e,n)=>{let r=e/t,a=n/t,o=Math.floor(r),s=Math.floor(a),c=r-o,l=a-s,u=c*c*(3-2*c),d=l*l*(3-2*l),f=i(o,s)+(i(o+1,s)-i(o,s))*u;return f+(i(o,s+1)+(i(o+1,s+1)-i(o,s+1))*u-f)*d}}function Zi(e,t){return e[Math.max(0,Math.min(e.length-1,Math.floor(t*e.length)))]}function Qi(e,t){let n=Math.max(0,Math.min(255,Math.round((e>>16&255)*t))),r=Math.max(0,Math.min(255,Math.round((e>>8&255)*t))),i=Math.max(0,Math.min(255,Math.round((e&255)*t)));return n<<16|r<<8|i}var U={stone:[6183528,7038838,7894146,8749455,9670556],dirt:[6963497,7883567,8737846,9592638,10513223],grass:[4031792,4690743,5349438,6073669,6928975],sand:[14072177,14533246,14928520,15324053,15719587],sandstone:[13215845,13807984,14269051,14795655],bedrock:[2499115,3354169,4209223,5130326,6248551],oakBark:[4862496,5716774,6637102,7557430],oakWood:[10186303,10975816,11765330,12555101],oakLeaf:[2911010,3504681,4164142,4954421],birchBark:[14472899,15131088,15723484,16250089],birchWood:[13087868,13746057,14404246,14996642],birchLeaf:[6263863,7119680,8041034,8961877],water:[2053560,2449606,2911442,3833052],cactus:[2780459,3243314,3837242,4694086],brick:[9387823,10241844,11030843,11754564],snow:[14674163,15265784,15791612,16317439],clay:[9409446,10133168,10856890,11580612]};function $i(e,t,n,r=4,i=.35){let a=Xi(t,r);e.fill((e,r)=>Zi(n,Math.min(.999,Math.max(0,a(e,r)*(1-i)+t.next()*i))))}var ea=(e,t)=>{ta(e,t),Ji(e)};function ta(e,t){$i(e,t,U.stone,8,.45);for(let n of[4,11]){let r=t.int(0,15);for(let i=0;i<H;i++){let a=n+Math.round(Math.sin((i+r)/2.6)*.8);t.next()<.8&&e.set(i,a,Qi(e.get(i,a),.82))}}for(let n=0;n<6;n++)e.set(t.int(0,15),t.int(0,15),U.stone[4])}var na=(e,t)=>{$i(e,t,U.dirt,4,.5);for(let n=0;n<7;n++){let n=t.int(0,15),r=t.int(0,15);e.set(n,r,11568480),e.set(n+1,r,Qi(11568480,.85))}for(let n=0;n<5;n++)e.set(t.int(0,15),t.int(0,15),5583647)},ra=(e,t)=>{$i(e,t,U.grass,4,.4);for(let n=0;n<22;n++){let n=t.int(0,15),r=t.int(0,15);e.set(n,r,U.grass[4]),e.set(n,r+1,U.grass[3])}for(let n=0;n<6;n++)e.set(t.int(0,15),t.int(0,15),3107621)},ia=(e,t)=>{na(e,t);let n=Xi(t,4);for(let r=0;r<H;r++){let i=3+Math.round(n(r,0)*2)+ +(t.next()<.2);for(let n=0;n<i;n++)e.set(r,n,Zi(U.grass,.25+t.next()*.7));e.set(r,i,Qi(U.grass[0],.8))}},aa=(e,t)=>{$i(e,t,U.sand,4,.55);for(let n=0;n<3;n++){let r=t.int(0,15);for(let i=0;i<H;i++){let a=r+Math.round(Math.sin(i/2.5+n)*1);t.next()<.6&&e.set(i,a,Qi(e.get(i,a),.92))}}},oa=(e,t)=>{let n=[7301219,8353907,9406336,10393229,6117203,9075822];e.fill(()=>n[4]);for(let r=0;r<26;r++){let r=t.int(0,15),i=t.int(0,15),a=n[t.int(0,n.length-1)],o=t.int(1,2);for(let t=-o;t<=o;t++)for(let n=-o;n<=o;n++)n*n+t*t>o*o+.5||e.set(r+n,i+t,t<0?Qi(a,1.12):a)}},sa=(e,t)=>{$i(e,t,U.sandstone,4,.3);for(let t=0;t<H;t++)e.set(t,0,U.sandstone[3]),e.set(t,5,Qi(U.sandstone[0],.9)),e.set(t,6,U.sandstone[3]),e.set(t,11,Qi(U.sandstone[0],.9)),e.set(t,12,U.sandstone[3]),e.set(t,15,Qi(U.sandstone[0],.85))},ca=(e,t)=>{$i(e,t,U.sandstone,8,.2);for(let t=0;t<H;t++)e.set(t,0,U.sandstone[0]),e.set(0,t,U.sandstone[0]),e.set(t,15,U.sandstone[3]),e.set(15,t,U.sandstone[3])},la=(e,t)=>{$i(e,t,U.bedrock,2,.6);for(let n=0;n<4;n++){let n=t.int(0,15),r=t.int(0,15);for(let i=0;i<6;i++)e.set(n,r,1578267),n+=t.int(-1,1),r+=1}},ua=(e,t)=>(n,r)=>{for(let t=0;t<H;t++){let i=t%4==0||t%4==2&&r.next()<.3;for(let a=0;a<H;a++){let o=(i?.05:.35+r.next()*.6)*.999;n.set(t,a,Zi(e,o))}}for(let e=0;e<8;e++){let e=r.int(0,15),i=r.int(0,15);n.set(e,i,t),n.set(e,i+1,t)}},da=(e,t)=>{$i(e,t,U.birchBark,4,.3);for(let n=0;n<9;n++){let n=t.int(0,15),r=t.int(0,15),i=t.int(2,5);for(let t=0;t<i;t++)e.set(n+t,r,t===0||t===i-1?5919560:3025445)}},fa=(e,t)=>n=>{n.fill((n,r)=>{let i=Math.max(Math.abs(n-7.5),Math.abs(r-7.5));if(i>7)return t;let a=Math.floor(i)%3;return e[a===0?3:a===1?2:1]}),n.set(7,7,e[0]),n.set(8,8,e[0])},pa=e=>(t,n)=>{let r=Xi(n,4);for(let i=0;i<H;i++)for(let a=0;a<H;a++){let o=r(a,i)*.6+n.next()*.4;o<.18?t.set(a,i,0,0):t.set(a,i,Zi(e,Math.min(.999,o)))}for(let r=0;r<10;r++){let r=n.int(0,15),i=n.int(0,15);t.set(r,i,Qi(e[3],1.12)),t.set(r,i+1,Qi(e[0],.85))}},ma=e=>(t,n)=>{for(let r=0;r<4;r++){let i=n.int(3,12),a=n.next()*.25;for(let i=r*4;i<r*4+4;i++)for(let o=0;o<H;o++){let s=.35+a+(n.next()<.15?.3:0);i===r*4+3&&(s=0),t.set(o,i,Zi(e,Math.min(.999,s)))}for(let n=r*4;n<r*4+3;n++)t.set(i,n,Qi(e[0],.8));t.set((i+2)%16,r*4+1,Qi(e[0],.6))}},ha=(e,t)=>{let n=Xi(t,8);for(let r=0;r<H;r++)for(let i=0;i<H;i++)e.set(i,r,Zi(U.water,Math.min(.999,n(i,r)*.8+t.next()*.2)),175);for(let n=0;n<5;n++){let n=t.int(0,15),r=t.int(0,15);for(let t=0;t<4;t++)e.set(n+t,r+(t===1||t===2?-1:0),7907566,200)}},ga=(e,t)=>(n,r)=>{if(ea(n,r),Wi<=1){_a(n,r,e,t,2,13,t===`facet`?4:5);return}let i=new Ui;for(let e=0;e<H;e++)for(let t=0;t<H;t++)i.set(t,e,0,0);_a(i,r,e,t,5,9,3);for(let e=0;e<H;e++)for(let t=0;t<H;t++){let r=Math.floor(t/2)+4,a=Math.floor(e/2)+4;i.alpha(r,a)>0&&n.set(t,e,i.get(r,a))}};function _a(e,t,n,r,i,a,o){for(let s=0;s<o;s++){let o=t.int(i,a),s=t.int(i,a);if(r===`facet`){for(let[t,r,i]of[[0,-1,2],[-1,0,1],[0,0,1],[1,0,0],[0,1,0]])e.set(o+t,s+r,n[i]);e.set(o,s-1,n[3])}else{for(let[r,i]of[[0,0],[1,0],[0,1],[1,1],[2,1]])e.set(o+r,s+i,n[t.int(0,2)]);e.set(o,s,n[3]),e.set(o+2,s+2,Qi(n[0],.7))}}}var va=(e,t)=>{for(let n=0;n<H;n++){let r=n%5==1;for(let i=0;i<H;i++)e.set(n,i,Zi(U.cactus,r?.9:.2+t.next()*.5))}for(let n=0;n<8;n++){let n=t.int(0,3)*5+1;e.set(n,t.int(0,15),15327920)}for(let t=0;t<H;t++)e.set(0,t,Qi(U.cactus[0],.8)),e.set(15,t,Qi(U.cactus[0],.8))},ya=(e,t)=>{e.fill((e,n)=>{let r=Math.max(Math.abs(e-7.5),Math.abs(n-7.5));return r>6.5?Qi(U.cactus[0],.8):Zi(U.cactus,r>4?.8:.3+t.next()*.3)}),e.set(7,7,15327920),e.set(8,8,15327920)},ba=e=>{for(let t=0;t<H;t++)for(let n=0;n<H;n++)e.set(n,t,16777215,0);for(let t=0;t<H;t++)e.set(t,0,14216949),e.set(t,15,11127766),e.set(0,t,14216949),e.set(15,t,11127766);for(let[t,n]of[[1,1],[14,1],[1,14],[14,14]])e.set(t,n,16055295);for(let t=3;t<8;t++)e.set(t,11-t,15398650,140);for(let t=9;t<12;t++)e.set(t,20-t,15398650,110)},xa=(e,t)=>{let n=[];for(let e=0;e<9;e++)n.push([t.next()*16,t.next()*16,t.next()]);for(let r=0;r<H;r++)for(let i=0;i<H;i++){let a=1e9,o=1e9,s=0;for(let[e,t,c]of n)for(let n=-16;n<=16;n+=16)for(let l=-16;l<=16;l+=16){let u=Math.hypot(i+.5-(e+l),r+.5-(t+n));u<a?(o=a,a=u,s=c):u<o&&(o=u)}o-a<1.1?e.set(i,r,4472907):e.set(i,r,Zi(U.stone,Math.min(.999,.2+s*.6+(a<2?.15:0)+t.next()*.1)))}},Sa=(e,t)=>{for(let n=0;n<H;n++){let r=Math.floor(n/4),i=r%2==0?0:4;for(let a=0;a<H;a++){if(n%4==3||(a+i)%8==7){e.set(a,n,12169896);continue}let o=Math.floor((a+i)/8)+r*3,s=U.brick[o*7%U.brick.length];e.set(a,n,Qi(s,.92+t.next()*.14))}}},Ca=e=>(t,n)=>{for(let e=0;e<H;e++)for(let n=0;n<H;n++)t.set(n,e,0,0);e(t,n)},wa=Ca((e,t)=>{for(let n=0;n<7;n++){let r=2+n*2+t.int(-1,0),i=t.int(6,13);for(let n=0;n<i;n++)e.set(r,15-n,Zi(U.grass,Math.min(.999,.2+n/i*.75))),n>i/2&&t.next()<.3&&(r+=t.next()<.5?-1:1)}}),Ta=(e,t,n)=>Ca(r=>{for(let e=8;e<16;e++)r.set(7,e,4098608);if(r.set(6,12,5020216),r.set(5,11,5020216),r.set(8,13,5020216),r.set(9,12,5020216),n){for(let[t,n]of[[5,4],[9,4],[5,5],[6,5],[7,5],[8,5],[9,5],[6,6],[7,6],[8,6],[6,7],[7,7],[8,7]])r.set(t,n,e);r.set(7,4,t),r.set(6,4,Qi(e,1.1)),r.set(8,4,Qi(e,1.1))}else{for(let[t,n]of[[6,3],[7,3],[8,3],[5,4],[6,4],[8,4],[9,4],[5,5],[9,5],[5,6],[6,6],[8,6],[9,6],[6,7],[7,7],[8,7]])r.set(t,n,e);r.set(7,4,Qi(e,.8)),r.set(6,5,t),r.set(7,5,t),r.set(8,5,t),r.set(7,6,t)}}),Ea=Ca((e,t)=>{let n=9071166;for(let[r,i]of[[7,15],[7,14],[7,13],[6,12],[5,11],[4,10],[3,8],[8,12],[9,11],[10,10],[11,9],[12,7],[7,11],[7,10],[8,9],[8,8],[7,7],[6,6],[9,7],[10,6]])e.set(r,i,t.next()<.3?Qi(n,.8):n)}),Da=(e,t)=>{e.fill((e,t)=>{let n=Math.abs(e-7.5)+Math.abs(t-7.5);return n<3?16776166:n<6?16771491:n<9?16109419:14264650});for(let n=0;n<10;n++)e.set(t.int(0,15),t.int(0,15),16774863);for(let t=0;t<H;t++)e.set(t,0,11764794),e.set(0,t,11764794),e.set(t,15,9398576),e.set(15,t,9398576)},Oa=(e,t)=>{$i(e,t,U.snow,4,.3);for(let n=0;n<6;n++)e.set(t.int(0,15),t.int(0,15),13622250)},ka=(e,t)=>{na(e,t);let n=Xi(t,4);for(let r=0;r<H;r++){let i=3+Math.round(n(r,0)*2);for(let n=0;n<i;n++)e.set(r,n,Zi(U.snow,.3+t.next()*.69));e.set(r,i,12832735)}},Aa=(e,t)=>{$i(e,t,U.clay,8,.25);for(let n=0;n<H;n++)t.next()<.7&&e.set(n,7+Math.round(Math.sin(n/3)),Qi(U.clay[0],.95))},ja=e=>(t,n)=>{for(let e=0;e<H;e++)for(let n=0;n<H;n++)t.set(n,e,0,0);let r=2+e*2;for(let i=0;i<r;i++){let r=8+n.int(-2,2),i=8+n.int(-2,2),a=3+e*2;for(let e=0;e<a;e++)t.set(r,i,1710618,200),r+=n.int(-1,1),i+=n.int(-1,1)}};function Ma(e,t,n){return(r,i)=>{if(n)n(r,i);else for(let e=0;e<H;e++)for(let t=0;t<H;t++)r.set(t,e,0,0);for(let n=0;n<H;n++){let i=e[n]??``;for(let e=0;e<H;e++){let a=i[e]??`.`;if(a===`.`)continue;let o=t[a];o!==void 0&&r.set(e,n,o)}}}}var Na={h:9068600,H:5190943},Pa={holz:{d:6176804,m:10186303,l:13212774},stein:{d:4933714,m:8025733,l:10920624},eisen:{d:8356749,m:12830671,l:15922423},lumit:{d:5121920,m:9787604,l:14465279}},Fa={spitzhacke:[`................`,`....dmmmmmmd....`,`...dmllllllmd...`,`..dmm..hH..mmd..`,`..dm...Hh...md..`,`..d....hH....d..`,`.......Hh.......`,`.......hH.......`,`.......Hh.......`,`.......hH.......`,`.......Hh.......`,`.......hH.......`,`.......Hh.......`,`.......hH.......`,`.......HH.......`],schaufel:[`................`,`......dmmd......`,`.....dmllmd.....`,`.....dmllmd.....`,`.....dmmmmd.....`,`......dmmd......`,`.......hH.......`,`.......Hh.......`,`.......hH.......`,`.......Hh.......`,`.......hH.......`,`.......Hh.......`,`.......hH.......`,`......dHHd......`,`.......dd.......`],axt:[`................`,`........dmmd....`,`.......hdmlmd...`,`.......Hdmllmd..`,`.......hdmllmd..`,`.......Hdmlmd...`,`.......hHdmd....`,`.......Hh.......`,`.......hH.......`,`.......Hh.......`,`.......hH.......`,`.......Hh.......`,`.......hH.......`,`.......Hh.......`,`.......HH.......`],schwert:[`................`,`.......dd.......`,`......dlmd......`,`......dlmd......`,`......dlmd......`,`......dlmd......`,`......dlmd......`,`......dlmd......`,`......dlmd......`,`....dddmmddd....`,`....dmmmmmmd....`,`.......Hh.......`,`.......hH.......`,`.......Hh.......`,`......dmmd......`]},Ia={helm:[``,``,``,`....dddddddd....`,`...dmmllllmmd...`,`...dmlmmmmlmd...`,`...dmd....dmd...`,`...dmd....dmd...`,`...ddd....ddd...`],brustpanzer:[``,`...ddd....ddd...`,`..dmmd....dmmd..`,`..dmlmddddmlmd..`,`..dmllmmmmllmd..`,`...dmlmmmmlmd...`,`...dmmmmmmmmd...`,`...dmmlmmlmmd...`,`...dmmmmmmmmd...`,`...dmmmmmmmmd...`,`...dmmmmmmmmd...`,`...dddddddddd...`],beinschutz:[``,`...dddddddddd...`,`...dmmllllmmd...`,`...dmmmmmmmmd...`,`...dmmmddmmmd...`,`...dmmd..dmmd...`,`...dmld..dlmd...`,`...dmmd..dmmd...`,`...dmmd..dmmd...`,`...dmld..dlmd...`,`...dmmd..dmmd...`,`...dddd..dddd...`],stiefel:[``,``,``,``,``,``,`...ddd....ddd...`,`...dmd....dmd...`,`...dld....dld...`,`..dmmd....dmmd..`,`.dmmmd....dmmmd.`,`.ddddd....ddddd.`]},La=(e,t)=>Ma(Fa[t],{...Pa[e],...Na}),Ra=(e,t)=>Ma(Ia[t],Pa[e]),za=Ma([``,`.............Hh.`,`............hH..`,`...........Hh...`,`..........hH....`,`.........Hh.....`,`........hH......`,`.......Hh.......`,`......hH........`,`.....Hh.........`,`....hH..........`,`...Hh...........`,`..hH............`],Na),Ba=Ma([``,``,``,`.....dddd.......`,`...ddmmmmdd.....`,`..dmmlmmmmmd....`,`..dmllmmmdmmd...`,`.dmmlmmmmmmmd...`,`.dmmmmmdmmmmd...`,`.dmmmmmmmmmd....`,`..ddmmmmmdd.....`,`....ddddd.......`],{d:1183764,m:2828336,l:5722719}),Va=Ma([``,``,``,``,``,`.....dddddddd...`,`....dllllllmd...`,`...dlmmmmmmmd...`,`..dlmmmmmmmd....`,`..dmmmmmmmdd....`,`..dddddddd......`],Pa.eisen),Ha=Ma([``,``,`.......dd.......`,`......dlld......`,`.....dllmmd.....`,`....dllmmmmd....`,`...dllmmmmmmd...`,`...dlmmmmmmdd...`,`....dmmmmmdd....`,`.....dmmmdd.....`,`......dmdd......`,`.......dd.......`],Pa.lumit),Ua=Ma([``,``,`.......H........`,`.......Hgg......`,`....rrrHrrr.....`,`...rlrrrrrrr....`,`..rllrrrrrrrr...`,`..rlrrrrrrrrr...`,`..rrrrrrrrrrr...`,`..rrrrrrrrrrd...`,`...rrrrrrrrd....`,`....rrdrrdd.....`],{r:13120556,l:15764074,d:8790300,H:5190943,g:5020216}),Wa=Ma([``,``,``,`......gg........`,`.....g..g.......`,`....bb...bb.....`,`...blbb.blbb....`,`...bbbb.bbbb....`,`....bb...bb.....`,`.......bb.......`,`......blbb......`,`......bbbb......`,`.......bb.......`],{b:2768794,l:9085168,g:4098608}),Ga=Ma([``,``,``,``,``,``,`.......fy.......`,`.......yY.......`,`.......YO.......`,`.......hH.......`,`.......Hh.......`,`.......hH.......`,`.......Hh.......`,`.......hH.......`,`.......Hh.......`,`.......hH.......`],{f:16774856,y:16766032,Y:16757294,O:14708766,...Na}),Ka=(e,t)=>{for(let t=0;t<H;t++)for(let n=0;n<H;n++)e.set(n,t,0,0);for(let n=3;n<16;n++)for(let r=1;r<15;r++){let i=Math.hypot((r-7.5)/7,(n-10)/7);i<1&&t.next()>.12&&e.set(r,n,Zi([2381098,3107632,3899192,4886850],Math.min(.999,t.next()*(1.1-i))))}for(let n=0;n<9;n++){let n=t.int(3,12),r=t.int(5,13);e.set(n,r,2768794),e.set(n,r-1,9085168)}},qa=(e,t)=>{ma(U.oakWood)(e,t);for(let t=0;t<H;t++)e.set(t,0,5190943),e.set(0,t,5190943),e.set(t,15,5190943),e.set(15,t,5190943);for(let t of[5,10])for(let n=2;n<14;n++)e.set(t,n,Qi(U.oakWood[0],.7)),e.set(n,t,Qi(U.oakWood[0],.7))},Ja=(e,t)=>{ma(U.oakWood)(e,t);for(let t=0;t<H;t++)for(let n=0;n<3;n++)e.set(t,n,n===2?5190943:8017200);[`.ddd.`,`.ddd.`,`..h..`,`..h..`,`..h..`].forEach((t,n)=>[...t].forEach((t,r)=>t!==`.`&&e.set(3+r,6+n,t===`d`?9409436:6176804)));for(let t=9;t<14;t++)e.set(t,7,12830671);for(let t=9;t<14;t+=2)e.set(t,8,12830671);e.set(13,6,6176804),e.set(13,7,6176804)},Ya=(e,t)=>{for(let n=0;n<H;n++){let r=Math.floor(n/4)%2?4:0;for(let i=0;i<H;i++)n%4==3||(i+r)%8==7?e.set(i,n,4538700):e.set(i,n,Zi(U.stone,.3+t.next()*.5))}},Xa=e=>(t,n)=>{Ya(t,n);for(let r=7;r<14;r++)for(let i=4;i<12;i++)if(r!==7||i!==4&&i!==11){if(!e)t.set(i,r,r>11?2762288:1512730);else{let e=(r-7)/7+n.next()*.25;t.set(i,r,e>.8?16769162:e>.55?16754748:e>.3?14178334:5905936)}}for(let e=3;e<13;e++)t.set(e,14,3025715)},Za=(e,t)=>{$i(e,t,U.stone,8,.25);for(let t=0;t<H;t++)e.set(t,0,4538700),e.set(0,t,4538700),e.set(t,15,4538700),e.set(15,t,4538700);for(let t=6;t<10;t++)for(let n=6;n<10;n++)e.set(n,t,1841696)},Qa=(e,t)=>{ma(U.oakWood)(e,t);for(let t=0;t<H;t++)e.set(t,0,5190943),e.set(0,t,5190943),e.set(t,15,5190943),e.set(15,t,5190943),e.set(t,7,9409436),e.set(t,8,7106682)},$a=(e,t)=>{Qa(e,t);for(let t=5;t<10;t++)for(let n=6;n<10;n++)e.set(n,t,t===5||t===9||n===6||n===9?7106682:12830671);e.set(7,7,2828336),e.set(8,7,2828336)},eo={spruceBark:[3811354,4599839,5388581,6177323],spruceWood:[6111528,6834734,7557941,8346940],spruceLeaf:[2049065,2510895,2972726,3500606],swampLeaf:[3954210,4613160,5271854,6061878]},to={stein:ea,erde:Yi(na),gras_oben:Yi(ra),gras_seite:Yi(ia),sand:Yi(aa),kies:Yi(oa),sandstein_seite:sa,sandstein_oben:Yi(ca),urgestein:Yi(la),eiche_rinde:Yi(ua(U.oakBark,3351322)),eiche_kern:fa(U.oakWood,U.oakBark[1]),eiche_laub:Yi(pa(U.oakLeaf)),eiche_bretter:ma(U.oakWood),birke_rinde:Yi(da),birke_kern:fa(U.birchWood,U.birchBark[1]),birke_laub:Yi(pa(U.birchLeaf)),birke_bretter:ma(U.birchWood),wasser:Yi(ha),kohleerz:ga([1841696,2828336,3814976,7170168],`facet`),eisenerz:ga([11759429,13207382,14262383,15779994],`nugget`),kaktus_seite:va,kaktus_oben:ya,glas:ba,bruchstein:Yi(xa),ziegel:Sa,grasbueschel:wa,sonnenkelch:Ta(15910205,12087326,!0),glutmohn:Ta(14172975,2759446,!1),duerrstrauch:Ea,leuchtkristall:Yi(Da),schnee:Yi(Oa),schnee_seite:Yi(ka),lehm:Yi(Aa),risse_0:ja(0),risse_1:ja(1),risse_2:ja(2),risse_3:ja(3),werktisch_oben:qa,werktisch_seite:Ja,schmelze_seite:Ya,schmelze_front:Xa(!1),schmelze_front_an:Xa(!0),schmelze_oben:Yi(Za),truhe_oben:Qa,truhe_seite:$a,fackel:Ga,lumiterz:ga([5121920,8012984,10842854,15125759],`facet`),beerenstrauch:Yi(Ka),fichte_rinde:Yi(ua(eo.spruceBark,2365455)),fichte_kern:fa(eo.spruceWood,eo.spruceBark[1]),fichte_nadeln:Yi(pa(eo.spruceLeaf)),fichte_bretter:ma(eo.spruceWood),sumpf_laub:Yi(pa(eo.swampLeaf)),stock:za,kohle:Ba,eisenbarren:Va,lumit:Ha,apfel:Ua,waldbeeren:Wa,holz_spitzhacke:La(`holz`,`spitzhacke`),holz_schaufel:La(`holz`,`schaufel`),holz_axt:La(`holz`,`axt`),holz_schwert:La(`holz`,`schwert`),stein_spitzhacke:La(`stein`,`spitzhacke`),stein_schaufel:La(`stein`,`schaufel`),stein_axt:La(`stein`,`axt`),stein_schwert:La(`stein`,`schwert`),eisen_spitzhacke:La(`eisen`,`spitzhacke`),eisen_schaufel:La(`eisen`,`schaufel`),eisen_axt:La(`eisen`,`axt`),eisen_schwert:La(`eisen`,`schwert`),lumit_spitzhacke:La(`lumit`,`spitzhacke`),lumit_schaufel:La(`lumit`,`schaufel`),lumit_axt:La(`lumit`,`axt`),lumit_schwert:La(`lumit`,`schwert`),eisen_helm:Ra(`eisen`,`helm`),eisen_brustpanzer:Ra(`eisen`,`brustpanzer`),eisen_beinschutz:Ra(`eisen`,`beinschutz`),eisen_stiefel:Ra(`eisen`,`stiefel`),lumit_helm:Ra(`lumit`,`helm`),lumit_brustpanzer:Ra(`lumit`,`brustpanzer`),lumit_beinschutz:Ra(`lumit`,`beinschutz`),lumit_stiefel:Ra(`lumit`,`stiefel`)};function no(e){let t=new Ui;return to[e](t,new be(_e(`tex:${e}`))),t.data}function ro(){let e=new Uint8Array(H*H*4*Ee.length);return Ee.forEach((t,n)=>e.set(no(t),n*H*H*4)),e}var io,ao,oo,so,co=0,lo=[],uo=t,fo=uo.__b,po=uo.__r,mo=uo.diffed,ho=uo.__c,go=uo.unmount,_o=uo.__;function vo(e,t){uo.__h&&uo.__h(ao,e,co||t),co=0;var n=ao.__H||(ao.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function yo(e){return co=1,bo(Ao,e)}function bo(e,t,n){var r=vo(io++,2);if(r.t=e,!r.__c&&(r.__=[n?n(t):Ao(void 0,t),function(e){var t=r.__N?r.__N[0]:r.__[0],n=r.t(t,e);t!==n&&(r.__N=[n,r.__[1]],r.__c.setState({}))}],r.__c=ao,!ao.__f)){var i=function(e,t,n){if(!r.__c.__H)return!0;var i=!1,o=r.__c.props!==e;if(r.__c.__H.__.some(function(e){if(e.__N){i=!0;var t=e.__[0];e.__=e.__N,e.__N=void 0,t!==e.__[0]&&(o=!0)}}),a){var s=a.call(this,e,t,n);return i?s||o:s}return!i||o};ao.__f=!0;var a=ao.shouldComponentUpdate,o=ao.componentWillUpdate;ao.componentWillUpdate=function(e,t,n){if(this.__e){var r=a;a=void 0,i(e,t,n),a=r}o&&o.call(this,e,t,n)},ao.shouldComponentUpdate=i}return r.__N||r.__}function xo(e,t){var n=vo(io++,3);!uo.__s&&ko(n.__H,t)&&(n.__=e,n.u=t,ao.__H.__h.push(n))}function So(e){return co=5,Co(function(){return{current:e}},[])}function Co(e,t){var n=vo(io++,7);return ko(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}function wo(){for(var e;e=lo.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(Do),t.__h.some(Oo),t.__h=[]}catch(n){t.__h=[],uo.__e(n,e.__v)}}}uo.__b=function(e){ao=null,fo&&fo(e)},uo.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),_o&&_o(e,t)},uo.__r=function(e){po&&po(e),io=0;var t=(ao=e.__c).__H;t&&(oo===ao?(t.__h=[],ao.__h=[],t.__.some(function(e){e.__N&&(e.__=e.__N),e.u=e.__N=void 0})):(t.__h.some(Do),t.__h.some(Oo),t.__h=[],io=0)),oo=ao},uo.diffed=function(e){mo&&mo(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(lo.push(t)!==1&&so===uo.requestAnimationFrame||((so=uo.requestAnimationFrame)||Eo)(wo)),t.__H.__.some(function(e){e.u&&=(e.__H=e.u,void 0)})),oo=ao=null},uo.__c=function(e,t){t.some(function(e){try{e.__h.some(Do),e.__h=e.__h.filter(function(e){return!e.__||Oo(e)})}catch(n){t.some(function(e){e.__h&&=[]}),t=[],uo.__e(n,e.__v)}}),ho&&ho(e,t)},uo.unmount=function(e){go&&go(e);var t,n=e.__c;n&&n.__H&&(n.__H.__.some(function(e){try{Do(e)}catch(e){t=e}}),n.__H=void 0,t&&uo.__e(t,n.__v))};var To=typeof requestAnimationFrame==`function`;function Eo(e){var t,n=function(){clearTimeout(r),To&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,35);To&&(t=requestAnimationFrame(n))}function Do(e){var t=ao,n=e.__c;typeof n==`function`&&(e.__c=void 0,n()),ao=t}function Oo(e){var t=ao;e.__c=e.__(),ao=t}function ko(e,t){return!e||e.length!==t.length||t.some(function(t,n){return t!==e[n]})}function Ao(e,t){return typeof t==`function`?t(e):t}var jo=Symbol.for(`preact-signals`);function Mo(){if(Ro>1)Ro--;else{var e,t=!1;for((function(){var e=Ho;for(Ho=void 0;e!==void 0;){var t=e.S;if(t.v===e.v)for(var n=t.t;n!==void 0;n=n.x)n.i===e.i&&(n.i=t.i);e=e.o}})();Lo!==void 0;){var n=Lo;for(Lo=void 0,zo++;n!==void 0;){var r=n.u;if(n.u=void 0,n.f&=-3,!(8&n.f)&&qo(n))try{n.c()}catch(n){t||=(e=n,!0)}n=r}}if(zo=0,Ro--,t)throw e}}function No(e){if(Ro>0)return e();Vo=++Bo,Ro++;try{return e()}finally{Mo()}}var Po,Fo=void 0;function Io(e){var t=Fo,n=Po;Fo=void 0,Po=void 0;try{return e()}finally{Fo=t,Po=n}}var Lo=void 0,Ro=0,zo=0,Bo=0,Vo=0,Ho=void 0,Uo=0;function Wo(e){if(Fo!==void 0){var t=e.n;if(t===void 0||t.t!==Fo)return t={i:0,S:e,p:Fo.s,n:void 0,t:Fo,e:void 0,x:void 0,r:t},Fo.s!==void 0&&(Fo.s.n=t),Fo.s=t,e.n=t,32&Fo.f&&e.S(t),t;if(t.i===-1)return t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=Fo.s,t.n=void 0,Fo.s.n=t,Fo.s=t),t}}function Go(e,t){this.v=e,this.i=0,this.n=void 0,this.t=void 0,this.l=0,this.W=t?.watched,this.Z=t?.unwatched,this.name=t?.name}Go.prototype.brand=jo,Go.prototype.h=function(){return!0},Go.prototype.S=function(e){var t=this,n=this.t;n!==e&&e.e===void 0&&(e.x=n,this.t=e,n===void 0?Io(function(){var e;(e=t.W)==null||e.call(t)}):n.e=e)},Go.prototype.U=function(e){var t=this;if(this.t!==void 0){var n=e.e,r=e.x;n!==void 0&&(n.x=r,e.e=void 0),r!==void 0&&(r.e=n,e.x=void 0),e===this.t&&(this.t=r,r===void 0&&Io(function(){var e;(e=t.Z)==null||e.call(t)}))}},Go.prototype.subscribe=function(e){var t=this;return ns(function(){var n=t.value;Io(function(){return e(n)})},{name:`sub`})},Go.prototype.valueOf=function(){return this.value},Go.prototype.toString=function(){return this.value+``},Go.prototype.toJSON=function(){return this.value},Go.prototype.peek=function(){var e=this;return Io(function(){return e.value})},Object.defineProperty(Go.prototype,"value",{get:function(){var e=Wo(this);return e!==void 0&&(e.i=this.i),this.v},set:function(e){if(e!==this.v){if(zo>100)throw Error(`Cycle detected`);(function(e){Ro!==0&&zo===0&&e.l!==Vo&&(e.l=Vo,Ho={S:e,v:e.v,i:e.i,o:Ho})})(this),this.v=e,this.i++,Uo++,Ro++;try{for(var t=this.t;t!==void 0;t=t.x)t.t.N()}finally{Mo()}}}});function Ko(e,t){return new Go(e,t)}function qo(e){for(var t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function Jo(e){for(var t=e.s;t!==void 0;t=t.n){var n=t.S.n;if(n!==void 0&&(t.r=n),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function Yo(e){for(var t=e.s,n=void 0;t!==void 0;){var r=t.p;t.i===-1?(t.S.U(t),r!==void 0&&(r.n=t.n),t.n!==void 0&&(t.n.p=r)):n=t,t.S.n=t.r,t.r!==void 0&&(t.r=void 0),t=r}e.s=n}function Xo(e,t){Go.call(this,void 0,t),this.x=e,this.s=void 0,this.g=Uo-1,this.f=4}Xo.prototype=new Go,Xo.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Uo))return!0;if(this.g=Uo,this.f|=1,this.i>0&&!qo(this))return this.f&=-2,!0;var e=Fo;try{Jo(this),Fo=this;var t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return Fo=e,Yo(this),this.f&=-2,!0},Xo.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(var t=this.s;t!==void 0;t=t.n)t.S.S(t)}Go.prototype.S.call(this,e)},Xo.prototype.U=function(e){if(this.t!==void 0&&(Go.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(var t=this.s;t!==void 0;t=t.n)t.S.U(t)}},Xo.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var e=this.t;e!==void 0;e=e.x)e.t.N()}},Object.defineProperty(Xo.prototype,"value",{get:function(){if(1&this.f)throw Error(`Cycle detected`);var e=Wo(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}});function Zo(e,t){return new Xo(e,t)}function Qo(e){var t=e.j;if(e.j=void 0,typeof t==`function`){Ro++;var n=Fo;Fo=void 0;try{t()}catch(t){throw e.f&=-2,e.f|=8,$o(e),t}finally{Fo=n,Mo()}}}function $o(e){for(var t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,Qo(e)}function es(e){if(Fo!==this)throw Error(`Out-of-order effect`);Yo(this),Fo=e,this.f&=-2;try{8&this.f&&$o(this)}finally{Mo()}}function ts(e,t){this.x=e,this.j=void 0,this.s=void 0,this.u=void 0,this.f=32,this.name=t?.name,Po&&Po.push(this)}ts.prototype.c=function(){var e=this.S();try{if(8&this.f||this.x===void 0)return;var t=this.x();typeof t==`function`&&(this.j=t)}finally{e()}},ts.prototype.S=function(){if(1&this.f)throw Error(`Cycle detected`);this.f|=1,this.f&=-9,Qo(this),Jo(this),Ro++;var e=Fo;return Fo=this,es.bind(this,e)},ts.prototype.N=function(){2&this.f||(this.f|=2,this.u=Lo,Lo=this)},ts.prototype.d=function(){this.f|=8,1&this.f||$o(this)},ts.prototype.dispose=function(){this.d()};function ns(e,t){var n=new ts(e,t);try{n.c()}catch(e){throw n.d(),e}var r=n.d.bind(n);return r[Symbol.dispose]=r,r}var rs,is,as=typeof window<`u`&&!!window.__PREACT_SIGNALS_DEVTOOLS__,os=[];ns(function(){rs=this.N})();function ss(e,n){t[e]=n.bind(null,t[e]||function(){})}function cs(e){if(is){var t=is;is=void 0,t()}is=e&&e.S()}function ls(e){var t=this,n=e.data,i=ds(n);i.name=`ReactiveDom`,i.value=n;var a=Co(function(){for(var e=t,n=t.__v;n=n.__;)if(n.__c){n.__c.__$f|=4;break}var a=Zo(function(){var e=i.value.value;return e===0?0:!0===e?``:e||``}),o=Zo(function(){return!Array.isArray(a.value)&&!r(a.value)}),s=ns(function(){if(this.N=ms,o.value){var t=a.value;e.__v&&e.__v.__e&&e.__v.__e.nodeType===3&&(e.__v.__e.data=t)}}),c=t.__$u.d;return t.__$u.d=function(){s(),c.call(this)},[o,a]},[]),o=a[0],s=a[1];return o.value?s.peek():s.value}ls.displayName=`ReactiveTextNode`,Object.defineProperties(Go.prototype,{constructor:{configurable:!0,value:x(C,null).constructor},type:{configurable:!0,value:ls},props:{configurable:!0,get:function(){var e=this;return{data:{get value(){return e.value}}}}},__b:{configurable:!0,value:1}}),ss(`__b`,function(e,t){if(cs(),typeof t.type==`string`){var n,r=t.props;for(var i in r)if(i!==`children`){var a=r[i];a instanceof Go&&(n||(t.__np=n={}),n[i]=a,r[i]=a.peek())}}e(t)}),ss(`__r`,function(e,t){if(e(t),t.type!==C){cs();var n,r=t.__c;r&&(r.__$f&=-2,(n=r.__$u)===void 0&&(r.__$u=n=function(e,t){var n;return ns(function(){n=this},{name:t}),n.c=e,n}(function(e){return function(){var t;as&&((t=this.y)==null||t.call(this)),e.__$f|=1,e.setState({})}}(r),typeof t.type==`function`?t.type.displayName||t.type.name:``))),cs(n)}}),ss(`__e`,function(e,t,n,r){cs(),e(t,n,r)}),ss(`diffed`,function(e,t){cs();var n;if(typeof t.type==`string`&&(n=t.__e)){var r=t.__np,i=t.props,a=n.U;if(a)for(var o in a){var s=a[o];s===void 0||r&&o in r||(s.d(),a[o]=void 0)}if(r)for(var c in a||(a={},n.U=a),r){var l=a[c],u=r[c];l===void 0?(l=us(n,c,u,i),a[c]=l):l.o(u,i)}}e(t)});function us(e,t,n,r){var i=t in e&&e.ownerSVGElement===void 0,a=Ko(n);return{o:function(e,t){a.value=e,r=t},d:ns(function(){this.N=ms;var n=a.value.value;r[t]!==n&&(r[t]=n,i?e[t]=n:n!=null&&(!1!==n||t[4]===`-`)?e.setAttribute(t,n):e.removeAttribute(t))})}}ss(`unmount`,function(e,t){if(typeof t.type==`string`){var n=t.__e;if(n){var r=n.U;if(r)for(var i in n.U=void 0,r){var a=r[i];a&&a.d()}}var o=t.__np;if(o){var s=t.props;for(var c in o)s[c]=o[c]}t.__np=void 0}else{var l=t.__c;if(l){l.__$f|=8;var u=l.__$u;u&&(l.__$u=void 0,u.d())}}e(t)}),ss(`__h`,function(e,t,n,r){r<3&&(t.__$f|=2),e(t,n,r)}),w.prototype.shouldComponentUpdate=function(e,t){if(this.__R)return!0;var n=this.__$u,r=n&&n.s!==void 0;for(var i in t)return!0;if(this.__f||typeof this.u==`boolean`&&!0===this.u){var a=2&this.__$f;if(!(r||a||4&this.__$f)||1&this.__$f)return!0}else if(!(r||4&this.__$f)||3&this.__$f)return!0;for(var o in e)if(o!==`__source`&&e[o]!==this.props[o])return!0;for(var s in this.props)if(!(s in e))return!0;return!1};function ds(e,t){return Co(function(){return Ko(e,t)},[])}var fs=function(e){queueMicrotask(function(){queueMicrotask(e)})};function ps(){No(function(){for(var e;e=os.shift();)rs.call(e)})}function ms(){os.push(this)===1&&(t.requestAnimationFrame||fs)(ps)}var hs=ge({VITE_SERVER_URL:{type:`string`,default:``},VITE_DEFAULT_SEED:{type:`string`,default:``},VITE_DEBUG:{type:`bool`,default:!1},VITE_DEFAULT_RENDER_DISTANCE:{type:`int`,default:8,min:2,max:32},VITE_MAX_RENDER_DISTANCE:{type:`int`,default:16,min:2,max:32},VITE_DAY_LENGTH_SECONDS:{type:`int`,default:1200,min:60,max:86400},VITE_WORKER_COUNT:{type:`int`,default:0,min:0,max:16}},{BASE_URL:`./`,DEV:!1,MODE:`production`,PROD:!0,SSR:!1,VITE_SERVER_URL:``}),gs=new URLSearchParams(location.search);hs.VITE_DEBUG||gs.has(`debug`)||gs.has(`test`);var _s=gs.has(`test`),vs=gs.has(`bench`);function ys(){if(hs.VITE_WORKER_COUNT>0)return hs.VITE_WORKER_COUNT;let e=navigator.hardwareConcurrency||4;return Math.max(1,Math.min(4,e-1))}var bs=`bc.settings.v1`,xs={renderDistance:Math.min(hs.VITE_DEFAULT_RENDER_DISTANCE,hs.VITE_MAX_RENDER_DISTANCE),fov:75,sensitivity:100,invertY:!1,showFps:!1,renderScale:1,textureStyle:2,volumeMaster:80,volumeEffects:100,volumeMusic:50};function Ss(){try{let e=localStorage.getItem(bs);if(e){let t={...xs,...JSON.parse(e)};return t.renderDistance=Math.max(2,Math.min(hs.VITE_MAX_RENDER_DISTANCE,Math.round(t.renderDistance))),t.fov=Math.max(50,Math.min(110,t.fov)),t.sensitivity=Math.max(10,Math.min(300,t.sensitivity)),t.renderScale=Math.max(.5,Math.min(1,t.renderScale)),[1,2,4].includes(t.textureStyle)||(t.textureStyle=2),t}}catch{}return{...xs}}var Cs=Ko(Ss());function ws(e){Cs.value={...Cs.value,...e};try{localStorage.setItem(bs,JSON.stringify(Cs.value))}catch{}}function Ts(e){if(e===void 0)return`dirt`;if(At(e))return`water`;if(e===Fe||e===Ie)return`sand`;if(e===Je)return`glass`;if([Be,Ue,mt,gt].includes(e))return`grass`;let t=xt(e);return t.shape===ke.Cross?`grass`:t.tool===`spitzhacke`?`stone`:t.tool===`axt`?`wood`:`dirt`}var Es={stone:{freq:1800,q:1.2,len:.16,type:`bandpass`},wood:{freq:650,q:3,len:.14,type:`bandpass`},dirt:{freq:420,q:.8,len:.16,type:`lowpass`},sand:{freq:2600,q:.5,len:.2,type:`highpass`},grass:{freq:1200,q:.7,len:.18,type:`bandpass`},glass:{freq:4200,q:6,len:.25,type:`bandpass`},water:{freq:700,q:.6,len:.35,type:`lowpass`}},Ds=class{ctx=null;master=null;fx=null;music=null;noise=null;listener={x:0,y:0,z:0,yaw:0};nextMusic=20;elapsed=0;unsub=null;resume(){try{if(!this.ctx){let e=window.AudioContext??window.webkitAudioContext;if(!e)return;this.ctx=new e,this.master=this.ctx.createGain(),this.fx=this.ctx.createGain(),this.music=this.ctx.createGain(),this.fx.connect(this.master),this.music.connect(this.master),this.master.connect(this.ctx.destination);let t=this.ctx.sampleRate;this.noise=this.ctx.createBuffer(1,t,this.ctx.sampleRate);let n=this.noise.getChannelData(0),r=12345;for(let e=0;e<t;e++)r=r*1103515245+12345>>>0,n[e]=r/4294967296*2-1;this.unsub=Cs.subscribe(()=>this.applyVolumes())}this.ctx.state===`suspended`&&this.ctx.resume()}catch{this.ctx=null}}applyVolumes(){let e=Cs.value;this.master&&this.fx&&this.music&&(this.master.gain.value=e.volumeMaster/100,this.fx.gain.value=e.volumeEffects/100,this.music.gain.value=e.volumeMusic/100*.35)}setListener(e,t,n,r){this.listener={x:e,y:t,z:n,yaw:r}}spatial(e,t,n){if(e===void 0||t===void 0||n===void 0)return{gain:1,pan:0};let r=e-this.listener.x,i=t-this.listener.y,a=n-this.listener.z,o=Math.hypot(r,i,a),s=Math.max(0,1-o/24),c=(r*Math.cos(this.listener.yaw)-a*Math.sin(this.listener.yaw))/Math.max(1,o);return{gain:s,pan:Math.max(-1,Math.min(1,c))}}burst(e,t,n,r,i,a=1){let o=this.ctx;if(!o||!this.noise||!this.fx)return;let{gain:s,pan:c}=this.spatial(n,r,i);if(s<=.01)return;let l=Es[e],u=o.currentTime,d=o.createBufferSource();d.buffer=this.noise,d.playbackRate.value=a*(.9+Math.random()*.2);let f=o.createBiquadFilter();f.type=l.type,f.frequency.value=l.freq*a,f.Q.value=l.q;let p=o.createGain();p.gain.setValueAtTime(0,u),p.gain.linearRampToValueAtTime(t*s,u+.008),p.gain.exponentialRampToValueAtTime(8e-4,u+l.len);let m=o.createStereoPanner();m.pan.value=c,d.connect(f).connect(p).connect(m).connect(this.fx),d.start(u,Math.random()*.5,l.len+.05)}tone(e,t,n,r,i=`sine`,a,o,s){let c=this.ctx;if(!c||!this.fx)return;let{gain:l,pan:u}=this.spatial(a,o,s);if(l<=.01)return;let d=c.currentTime,f=c.createOscillator();f.type=i,f.frequency.setValueAtTime(e,d),f.frequency.exponentialRampToValueAtTime(Math.max(20,t),d+n);let p=c.createGain();p.gain.setValueAtTime(0,d),p.gain.linearRampToValueAtTime(r*l,d+.01),p.gain.exponentialRampToValueAtTime(8e-4,d+n);let m=c.createStereoPanner();m.pan.value=u,f.connect(p).connect(m).connect(this.fx),f.start(d),f.stop(d+n+.05)}play(e,t,n,r,i){if(this.ctx)switch(e){case`break`:this.burst(Ts(i),.5,t,n,r,.8),this.burst(Ts(i),.3,t,n,r,1.2);break;case`place`:this.burst(Ts(i),.45,t,n,r,1.1);break;case`hurt`:this.tone(320,140,.25,.35,`square`);break;case`death`:this.tone(300,60,.9,.4,`sawtooth`);break;case`eat`:for(let e=0;e<3;e++)setTimeout(()=>this.burst(`dirt`,.35,void 0,void 0,void 0,1.6),e*110);break;case`pickup`:this.tone(600+Math.random()*200,1200,.09,.18,`triangle`,t,n,r);break;case`toolBreak`:this.burst(`glass`,.5),this.tone(900,300,.2,.2,`square`);break;case`splash`:this.burst(`water`,.5,t,n,r);break;case`open`:this.tone(180,120,.18,.2,`sawtooth`,t,n,r)}}step(e,t){this.burst(Ts(e),t?.16:.11,void 0,void 0,void 0,1.3)}update(e,t){if(!this.ctx||!this.music||(this.elapsed+=e,this.elapsed<this.nextMusic)||(this.nextMusic=this.elapsed+60+Math.random()*90,Cs.value.volumeMusic<=0))return;let n=this.ctx.currentTime+.1,r=t>.5?220:196,i=[0,2,4,7,9,12,14,16],a=[[0,4,7],[-3,0,4],[-5,-1,2],[-7,-3,0]],o=e=>r*2**(e/12);a.forEach((e,t)=>{for(let r of e)this.pad(o(r-12),n+t*6,7)});for(let e=0;e<10;e++){let t=i[Math.floor(Math.random()*i.length)];this.pad(o(t),n+1+e*2.2+Math.random()*.6,2.5,.05)}}pad(e,t,n,r=.04){let i=this.ctx,a=i.createOscillator();a.type=`triangle`,a.frequency.value=e;let o=i.createGain();o.gain.setValueAtTime(0,t),o.gain.linearRampToValueAtTime(r,t+n*.3),o.gain.linearRampToValueAtTime(0,t+n),a.connect(o).connect(this.music),a.start(t),a.stop(t+n+.1)}dispose(){this.unsub?.(),this.ctx?.close(),this.ctx=null}},Os={forward:[`KeyW`,`ArrowUp`],back:[`KeyS`,`ArrowDown`],left:[`KeyA`,`ArrowLeft`],right:[`KeyD`,`ArrowRight`],jump:[`Space`],sneak:[`ShiftLeft`,`ShiftRight`],sprint:[`ControlLeft`,`ControlRight`],inventory:[`KeyE`],drop:[`KeyQ`],debug:[`F3`]},ks={forward:`Vorwärts`,back:`Rückwärts`,left:`Links`,right:`Rechts`,jump:`Springen / Hochfliegen`,sneak:`Schleichen / Sinken`,sprint:`Sprinten`,inventory:`Inventar`,drop:`Item fallen lassen`,debug:`Debug-Anzeige`},As=`bc.keys.v1`;function js(){let e=structuredClone(Os);try{let t=localStorage.getItem(As);if(t){let n=JSON.parse(t);for(let t of Object.keys(e))Array.isArray(n[t])&&(e[t]=n[t].filter(e=>typeof e==`string`).slice(0,2))}}catch{}return e}var Ms=Ko(js());function Ns(e,t,n){let r=structuredClone(Ms.value),i=[...r[e]];n===null?i.splice(t,1):i[t]=n,r[e]=i.filter(Boolean),Ms.value=r;try{localStorage.setItem(As,JSON.stringify(r))}catch{}}function Ps(){Ms.value=structuredClone(Os);try{localStorage.removeItem(As)}catch{}}function Fs(e){let t=new Map,n=new Set;for(let r of Object.keys(e))for(let i of e[r])t.has(i)&&t.get(i)!==r&&n.add(i),t.set(i,r);return n}function Is(e){return e.startsWith(`Key`)?e.slice(3):e.startsWith(`Digit`)?e.slice(5):{Space:`Leertaste`,ShiftLeft:`Shift links`,ShiftRight:`Shift rechts`,ControlLeft:`Strg links`,ControlRight:`Strg rechts`,AltLeft:`Alt`,ArrowUp:`↑`,ArrowDown:`↓`,ArrowLeft:`←`,ArrowRight:`→`,Tab:`Tab`}[e]??e}var Ls=class{element;down=new Set;pressedOnce=new Set;mouseDX=0;mouseDY=0;wheel=0;buttons=new Set;clicked=new Set;locked=!1;cleanup=[];constructor(e){this.element=e;let t=(e,t,n,r)=>{e.addEventListener(t,n,r),this.cleanup.push(()=>e.removeEventListener(t,n,r))};t(document,`keydown`,e=>{e.repeat||(this.down.add(e.code),this.pressedOnce.add(e.code),this.locked&&(e.code===`Space`||e.code.startsWith(`Arrow`)||e.code===`F3`||e.ctrlKey)&&e.preventDefault())}),t(document,`keyup`,e=>{this.down.delete(e.code)}),t(window,`blur`,()=>{this.down.clear(),this.buttons.clear()}),t(document,`mousemove`,e=>{this.locked&&(this.mouseDX+=e.movementX,this.mouseDY+=e.movementY)}),t(document,`mousedown`,e=>{this.locked&&(this.buttons.add(e.button),this.clicked.add(e.button),e.preventDefault())}),t(document,`mouseup`,e=>{this.buttons.delete(e.button)}),t(document,`wheel`,e=>{this.locked&&(this.wheel+=Math.sign(e.deltaY),e.preventDefault())},{passive:!1}),t(document,`contextmenu`,e=>{this.locked&&e.preventDefault()}),t(document,`pointerlockchange`,()=>{this.locked=document.pointerLockElement===this.element,this.locked||(this.buttons.clear(),this.down.clear())})}isDown(e){return Ms.value[e].some(e=>this.down.has(e))}wasPressed(e){return Ms.value[e].some(e=>this.pressedOnce.has(e))}wasCodePressed(e){return this.pressedOnce.has(e)}endFrame(){this.pressedOnce.clear(),this.clicked.clear(),this.mouseDX=0,this.mouseDY=0,this.wheel=0}async lock(){try{let e=this.element.requestPointerLock();return e instanceof Promise&&await e,!0}catch{return!1}}unlock(){document.pointerLockElement&&document.exitPointerLock()}dispose(){for(let e of this.cleanup)e();this.unlock()}},Rs=1e3,zs=1001,Bs=1002,Vs=1003,Hs=1004,Us=1005,Ws=1006,Gs=1007,Ks=1008,qs=1009,Js=1010,Ys=1011,Xs=1012,Zs=1013,Qs=1014,$s=1015,ec=1016,tc=1017,nc=1018,rc=1020,ic=35902,ac=35899,oc=1021,sc=1022,cc=1023,lc=1026,uc=1027,dc=1028,fc=1029,pc=1030,mc=1031,hc=1033,gc=33776,_c=33777,vc=33778,yc=33779,bc=35840,xc=35841,Sc=35842,Cc=35843,wc=36196,Tc=37492,Ec=37496,Dc=37488,Oc=37489,kc=37490,Ac=37491,jc=37808,Mc=37809,Nc=37810,Pc=37811,Fc=37812,Ic=37813,Lc=37814,Rc=37815,zc=37816,Bc=37817,Vc=37818,Hc=37819,Uc=37820,Wc=37821,Gc=36492,Kc=36494,qc=36495,Jc=36283,Yc=36284,Xc=36285,Zc=36286,Qc=2300,$c=2301,el=2302,tl=2303,nl=2400,rl=2401,il=2402,al=3200,ol=`srgb`,sl=`srgb-linear`,cl=`linear`,ll=`srgb`,ul=7680,dl=35044,fl=`300 es`,pl=2e3;function ml(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function hl(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function gl(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function _l(){let e=gl(`canvas`);return e.style.display=`block`,e}var vl={};function yl(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function bl(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function W(...e){e=bl(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function G(...e){e=bl(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function xl(...e){let t=e.join(` `);t in vl||(vl[t]=!0,W(...e))}function Sl(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Cl={0:0,2:6,4:4,3:5,1:1,6:2,7:7,5:3},wl=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Tl=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),El=1234567,Dl=Math.PI/180,Ol=180/Math.PI;function kl(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Tl[e&255]+Tl[e>>8&255]+Tl[e>>16&255]+Tl[e>>24&255]+`-`+Tl[t&255]+Tl[t>>8&255]+`-`+Tl[t>>16&15|64]+Tl[t>>24&255]+`-`+Tl[n&63|128]+Tl[n>>8&255]+`-`+Tl[n>>16&255]+Tl[n>>24&255]+Tl[r&255]+Tl[r>>8&255]+Tl[r>>16&255]+Tl[r>>24&255]).toLowerCase()}function Al(e,t,n){return Math.max(t,Math.min(n,e))}function jl(e,t){return(e%t+t)%t}function Ml(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function Nl(e,t,n){return e===t?0:(n-e)/(t-e)}function Pl(e,t,n){return(1-n)*e+n*t}function Fl(e,t,n,r){return Pl(e,t,1-Math.exp(-n*r))}function Il(e,t=1){return t-Math.abs(jl(e,t*2)-t)}function Ll(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function Rl(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function zl(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Bl(e,t){return e+Math.random()*(t-e)}function Vl(e){return e*(.5-Math.random())}function Hl(e){e!==void 0&&(El=e);let t=El+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ul(e){return e*Dl}function Wl(e){return e*Ol}function Gl(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function Kl(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function ql(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Jl(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:W(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Yl(e){switch(e.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Xl(e,t){if(t.constructor===Float32Array)return e;let n=Yl(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.max(e/n,-1)}function Zl(e,t){if(t.constructor===Float32Array)return e;let n=Yl(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.round(e*n)}var Ql={DEG2RAD:Dl,RAD2DEG:Ol,generateUUID:kl,clamp:Al,euclideanModulo:jl,mapLinear:Ml,inverseLerp:Nl,lerp:Pl,damp:Fl,pingpong:Il,smoothstep:Ll,smootherstep:Rl,randInt:zl,randFloat:Bl,randFloatSpread:Vl,seededRandom:Hl,degToRad:Ul,radToDeg:Wl,isPowerOfTwo:Gl,ceilPowerOfTwo:Kl,floorPowerOfTwo:ql,setQuaternionFromProperEuler:Jl,normalize:Zl,denormalize:Xl},$l=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Al(this.x,e.x,t.x),this.y=Al(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Al(this.x,e,t),this.y=Al(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Al(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Al(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},eu=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:W(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Al(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},K=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(nu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(nu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Al(this.x,e.x,t.x),this.y=Al(this.y,e.y,t.y),this.z=Al(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Al(this.x,e,t),this.y=Al(this.y,e,t),this.z=Al(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Al(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return tu.copy(this).projectOnVector(e),this.sub(tu)}reflect(e){return this.sub(tu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Al(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},tu=new K,nu=new eu,q=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return xl(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(ru.makeScale(e,t)),this}rotate(e){return xl(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(ru.makeRotation(-e)),this}translate(e,t){return xl(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(ru.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},ru=new q,iu=new q().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),au=new q().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ou(){let e={enabled:!0,workingColorSpace:sl,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=cu(e.r),e.g=cu(e.g),e.b=cu(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=lu(e.r),e.g=lu(e.g),e.b=lu(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?cl:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[sl]:{primaries:t,whitePoint:r,transfer:cl,toXYZ:iu,fromXYZ:au,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ol},outputColorSpaceConfig:{drawingBufferColorSpace:ol}},[ol]:{primaries:t,whitePoint:r,transfer:ll,toXYZ:iu,fromXYZ:au,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ol}}}),e}var su=ou();function cu(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function lu(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var uu,du=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{uu===void 0&&(uu=gl(`canvas`)),uu.width=e.width,uu.height=e.height;let t=uu.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=uu}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=gl(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=cu(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(cu(t[e]/255)*255):t[e]=cu(t[e]);return{data:t,width:e.width,height:e.height}}return W(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},fu=0,pu=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:fu++}),this.uuid=kl(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width||0,t.height||0,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(mu(r[t].image)):e.push(mu(r[t]))}else e=mu(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function mu(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?du.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(W(`Texture: Unable to serialize Texture.`),{})}var hu=0,gu=new K,_u=class e extends wl{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=zs,i=zs,a=Ws,o=Ks,s=cc,c=qs,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=kl(),this.name=``,this.source=new pu(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new $l(0,0),this.repeat=new $l(1,1),this.center=new $l(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new q,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(gu).x}get height(){return this.source.getSize(gu).y}get depth(){return this.source.getSize(gu).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){W(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?W(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Rs:e.x-=Math.floor(e.x);break;case zs:e.x=e.x<0?0:1;break;case Bs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Rs:e.y-=Math.floor(e.y);break;case zs:e.y=e.y<0?0:1;break;case Bs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};_u.DEFAULT_IMAGE=null,_u.DEFAULT_MAPPING=300,_u.DEFAULT_ANISOTROPY=1;var vu=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Al(this.x,e.x,t.x),this.y=Al(this.y,e.y,t.y),this.z=Al(this.z,e.z,t.z),this.w=Al(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Al(this.x,e,t),this.y=Al(this.y,e,t),this.z=Al(this.z,e,t),this.w=Al(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Al(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},yu=class extends wl{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ws,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new vu(0,0,e,t),this.scissorTest=!1,this.viewport=new vu(0,0,e,t),this.textures=[];let r=n.count;for(let i=0;i<r;i++)this.textures[i]=new _u({width:e,height:t,depth:n.depth}),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Ws,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new pu(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},bu=class extends yu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},xu=class extends _u{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Vs,this.minFilter=Vs,this.wrapR=zs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Su=class extends _u{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Vs,this.minFilter=Vs,this.wrapR=zs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Cu=class e{static{this.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/wu.setFromMatrixColumn(e,0).length(),i=1/wu.setFromMatrixColumn(e,1).length(),a=1/wu.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Eu,e,Du)}lookAt(e,t,n){let r=this.elements;return Au.subVectors(e,t),Au.lengthSq()===0&&(Au.z=1),Au.normalize(),Ou.crossVectors(n,Au),Ou.lengthSq()===0&&(Math.abs(n.z)===1?Au.x+=1e-4:Au.z+=1e-4,Au.normalize(),Ou.crossVectors(n,Au)),Ou.normalize(),ku.crossVectors(Au,Ou),r[0]=Ou.x,r[4]=ku.x,r[8]=Au.x,r[1]=Ou.y,r[5]=ku.y,r[9]=Au.y,r[2]=Ou.z,r[6]=ku.z,r[10]=Au.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],ee=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*ee,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*ee,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*ee,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*ee,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=wu.set(r[0],r[1],r[2]).length(),o=wu.set(r[4],r[5],r[6]).length(),s=wu.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Tu.copy(this);let c=1/a,l=1/o,u=1/s;return Tu.elements[0]*=c,Tu.elements[1]*=c,Tu.elements[2]*=c,Tu.elements[4]*=l,Tu.elements[5]*=l,Tu.elements[6]*=l,Tu.elements[8]*=u,Tu.elements[9]*=u,Tu.elements[10]*=u,t.setFromRotationMatrix(Tu),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=pl,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=pl,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},wu=new K,Tu=new Cu,Eu=new K(0,0,0),Du=new K(1,1,1),Ou=new K,ku=new K,Au=new K,ju=new Cu,Mu=new eu,Nu=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(Al(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-Al(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(Al(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-Al(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(Al(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-Al(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:W(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ju.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ju,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Mu.setFromEuler(this),this.setFromQuaternion(Mu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Nu.DEFAULT_ORDER=`XYZ`;var Pu=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Fu=0,Iu=new K,Lu=new eu,Ru=new Cu,zu=new K,Bu=new K,Vu=new K,Hu=new eu,Uu=new K(1,0,0),Wu=new K(0,1,0),Gu=new K(0,0,1),Ku={type:`added`},qu={type:`removed`},Ju={type:`childadded`,child:null},Yu={type:`childremoved`,child:null},Xu=class e extends wl{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Fu++}),this.uuid=kl(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new K,n=new Nu,r=new eu,i=new K(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Cu},normalMatrix:{value:new q}}),this.matrix=new Cu,this.matrixWorld=new Cu,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Lu.setFromAxisAngle(e,t),this.quaternion.multiply(Lu),this}rotateOnWorldAxis(e,t){return Lu.setFromAxisAngle(e,t),this.quaternion.premultiply(Lu),this}rotateX(e){return this.rotateOnAxis(Uu,e)}rotateY(e){return this.rotateOnAxis(Wu,e)}rotateZ(e){return this.rotateOnAxis(Gu,e)}translateOnAxis(e,t){return Iu.copy(e).applyQuaternion(this.quaternion),this.position.add(Iu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Uu,e)}translateY(e){return this.translateOnAxis(Wu,e)}translateZ(e){return this.translateOnAxis(Gu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ru.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?zu.copy(e):zu.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Bu.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ru.lookAt(Bu,zu,this.up):Ru.lookAt(zu,Bu,this.up),this.quaternion.setFromRotationMatrix(Ru),r&&(Ru.extractRotation(r.matrixWorld),Lu.setFromRotationMatrix(Ru),this.quaternion.premultiply(Lu.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(G(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ku),Ju.child=e,this.dispatchEvent(Ju),Ju.child=null):G(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(qu),Yu.child=e,this.dispatchEvent(Yu),Yu.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ru.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ru.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ru),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ku),Ju.child=e,this.dispatchEvent(Ju),Ju.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bu,e,Vu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bu,Hu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Xu.DEFAULT_UP=new K(0,1,0),Xu.DEFAULT_MATRIX_AUTO_UPDATE=!0,Xu.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Zu=class extends Xu{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Qu={type:`move`},$u=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zu,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zu,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zu,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.quaternion,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Qu)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Zu;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},ed={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},td={h:0,s:0,l:0},nd={h:0,s:0,l:0};function rd(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var J=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ol){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,su.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=su.workingColorSpace){return this.r=e,this.g=t,this.b=n,su.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=su.workingColorSpace){if(e=jl(e,1),t=Al(t,0,1),n=Al(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=rd(i,r,e+1/3),this.g=rd(i,r,e),this.b=rd(i,r,e-1/3)}return su.colorSpaceToWorking(this,r),this}setStyle(e,t=ol){function n(t){t!==void 0&&parseFloat(t)<1&&W(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseFloat(i[1]))/100,Math.min(100,parseFloat(i[2]))/100,Math.min(100,parseFloat(i[3]))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:W(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);W(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ol){let n=ed[e.toLowerCase()];return n===void 0?W(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=cu(e.r),this.g=cu(e.g),this.b=cu(e.b),this}copyLinearToSRGB(e){return this.r=lu(e.r),this.g=lu(e.g),this.b=lu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ol){return su.workingToColorSpace(id.copy(this),e),Math.round(Al(id.r*255,0,255))*65536+Math.round(Al(id.g*255,0,255))*256+Math.round(Al(id.b*255,0,255))}getHexString(e=ol){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=su.workingColorSpace){su.workingToColorSpace(id.copy(this),t);let n=id.r,r=id.g,i=id.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=su.workingColorSpace){return su.workingToColorSpace(id.copy(this),t),e.r=id.r,e.g=id.g,e.b=id.b,e}getStyle(e=ol){su.workingToColorSpace(id.copy(this),e);let t=id.r,n=id.g,r=id.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(td),this.setHSL(td.h+e,td.s+t,td.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(td),e.getHSL(nd);let n=Pl(td.h,nd.h,t),r=Pl(td.s,nd.s,t),i=Pl(td.l,nd.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},id=new J;J.NAMES=ed;var ad=class extends Xu{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Nu,this.environmentIntensity=1,this.environmentRotation=new Nu,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background===null?null:e.background.clone(),this.environment=e.environment===null?null:e.environment.clone(),this.fog=e.fog===null?null:e.fog.clone(),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial===null?null:e.overrideMaterial.clone(),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},od=new K,sd=new K,cd=new K,ld=new K,ud=new K,dd=new K,fd=new K,pd=new K,md=new K,hd=new K,gd=new vu,_d=new vu,vd=new vu,yd=class e{constructor(e=new K,t=new K,n=new K){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),od.subVectors(e,t),r.cross(od);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){od.subVectors(r,t),sd.subVectors(n,t),cd.subVectors(e,t);let a=od.dot(od),o=od.dot(sd),s=od.dot(cd),c=sd.dot(sd),l=sd.dot(cd),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,ld)!==null&&ld.x>=0&&ld.y>=0&&ld.x+ld.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,ld)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,ld.x),s.addScaledVector(a,ld.y),s.addScaledVector(o,ld.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return gd.setScalar(0),_d.setScalar(0),vd.setScalar(0),gd.fromBufferAttribute(e,t),_d.fromBufferAttribute(e,n),vd.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(gd,i.x),a.addScaledVector(_d,i.y),a.addScaledVector(vd,i.z),a}static isFrontFacing(e,t,n,r){return od.subVectors(n,t),sd.subVectors(e,t),od.cross(sd).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return od.subVectors(this.c,this.b),sd.subVectors(this.a,this.b),od.cross(sd).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;ud.subVectors(r,n),dd.subVectors(i,n),pd.subVectors(e,n);let s=ud.dot(pd),c=dd.dot(pd);if(s<=0&&c<=0)return t.copy(n);md.subVectors(e,r);let l=ud.dot(md),u=dd.dot(md);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0&&s-l>0)return a=s/(s-l),t.copy(n).addScaledVector(ud,a);hd.subVectors(e,i);let f=ud.dot(hd),p=dd.dot(hd);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(dd,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return fd.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(fd,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(ud,a).addScaledVector(dd,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},bd=class{constructor(e=new K(1/0,1/0,1/0),t=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Sd.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Sd.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Sd.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Sd):Sd.fromBufferAttribute(r,t),Sd.applyMatrix4(e.matrixWorld),this.expandByPoint(Sd);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Cd.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Cd.copy(e.boundingBox)),Cd.applyMatrix4(e.matrixWorld),this.union(Cd)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Sd),Sd.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ad),jd.subVectors(this.max,Ad),wd.subVectors(e.a,Ad),Td.subVectors(e.b,Ad),Ed.subVectors(e.c,Ad),Dd.subVectors(Td,wd),Od.subVectors(Ed,Td),kd.subVectors(wd,Ed);let t=[0,-Dd.z,Dd.y,0,-Od.z,Od.y,0,-kd.z,kd.y,Dd.z,0,-Dd.x,Od.z,0,-Od.x,kd.z,0,-kd.x,-Dd.y,Dd.x,0,-Od.y,Od.x,0,-kd.y,kd.x,0];return!Pd(t,wd,Td,Ed,jd)||(t=[1,0,0,0,1,0,0,0,1],!Pd(t,wd,Td,Ed,jd))?!1:(Md.crossVectors(Dd,Od),t=[Md.x,Md.y,Md.z],Pd(t,wd,Td,Ed,jd))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Sd).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Sd).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(xd[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xd[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xd[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xd[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xd[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xd[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xd[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xd[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xd)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},xd=[new K,new K,new K,new K,new K,new K,new K,new K],Sd=new K,Cd=new bd,wd=new K,Td=new K,Ed=new K,Dd=new K,Od=new K,kd=new K,Ad=new K,jd=new K,Md=new K,Nd=new K;function Pd(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Nd.fromArray(e,a);let o=i.x*Math.abs(Nd.x)+i.y*Math.abs(Nd.y)+i.z*Math.abs(Nd.z),s=t.dot(Nd),c=n.dot(Nd),l=r.dot(Nd);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Fd=new K,Id=new $l,Ld=0,Rd=class extends wl{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ld++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=dl,this.updateRanges=[],this.gpuType=$s,this.version=0,this._normalizationScale=e===void 0?void 0:Yl(e)}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Id.fromBufferAttribute(this,t),Id.applyMatrix3(e),this.setXY(t,Id.x,Id.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Fd.fromBufferAttribute(this,t),Fd.applyMatrix3(e),this.setXYZ(t,Fd.x,Fd.y,Fd.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Fd.fromBufferAttribute(this,t),Fd.applyMatrix4(e),this.setXYZ(t,Fd.x,Fd.y,Fd.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Fd.fromBufferAttribute(this,t),Fd.applyNormalMatrix(e),this.setXYZ(t,Fd.x,Fd.y,Fd.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Fd.fromBufferAttribute(this,t),Fd.transformDirection(e),this.setXYZ(t,Fd.x,Fd.y,Fd.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t===void 0?Xl(e,this.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?Zl(e,this.array):Math.round(e*t)}},zd=class extends Rd{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Bd=class extends Rd{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Vd=class extends Rd{constructor(e,t,n){super(new Float32Array(e),t,n)}},Hd=new bd,Ud=new K,Wd=new K,Gd=class{constructor(e=new K,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Hd.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ud.subVectors(e,this.center);let t=Ud.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Ud,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Wd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ud.copy(e.center).add(Wd)),this.expandByPoint(Ud.copy(e.center).sub(Wd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Kd=0,qd=new Cu,Jd=new Xu,Yd=new K,Xd=new bd,Zd=new bd,Qd=new K,$d=class e extends wl{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=kl(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(ml(e)?Bd:zd)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new q().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return qd.makeRotationFromQuaternion(e),this.applyMatrix4(qd),this}rotateX(e){return qd.makeRotationX(e),this.applyMatrix4(qd),this}rotateY(e){return qd.makeRotationY(e),this.applyMatrix4(qd),this}rotateZ(e){return qd.makeRotationZ(e),this.applyMatrix4(qd),this}translate(e,t,n){return qd.makeTranslation(e,t,n),this.applyMatrix4(qd),this}scale(e,t,n){return qd.makeScale(e,t,n),this.applyMatrix4(qd),this}lookAt(e){return Jd.lookAt(e),Jd.updateMatrix(),this.applyMatrix4(Jd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yd).negate(),this.translate(Yd.x,Yd.y,Yd.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Vd(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&W(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bd);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)G(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Xd.setFromBufferAttribute(n),this.morphTargetsRelative?(Qd.addVectors(this.boundingBox.min,Xd.min),this.boundingBox.expandByPoint(Qd),Qd.addVectors(this.boundingBox.max,Xd.max),this.boundingBox.expandByPoint(Qd)):(this.boundingBox.expandByPoint(Xd.min),this.boundingBox.expandByPoint(Xd.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&G(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gd);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)G(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new K,1/0);else if(e){let n=this.boundingSphere.center;if(Xd.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Zd.setFromBufferAttribute(n),this.morphTargetsRelative?(Qd.addVectors(Xd.min,Zd.min),Xd.expandByPoint(Qd),Qd.addVectors(Xd.max,Zd.max),Xd.expandByPoint(Qd)):(Xd.expandByPoint(Zd.min),Xd.expandByPoint(Zd.max))}Xd.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Qd.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Qd));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Qd.fromBufferAttribute(a,t),o&&(Yd.fromBufferAttribute(e,t),Qd.add(Yd)),r=Math.max(r,n.distanceToSquared(Qd))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&G(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){G(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Rd(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[],c=new Uint8Array(n.count);for(let e=0;e<n.count;e++)o[e]=new K,s[e]=new K;let l=new K,u=new K,d=new K,f=new $l,p=new $l,m=new $l,h=new K,g=new K;function _(e,t,r){c[e]=c[t]=c[r]=1,l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),s[e].add(g),s[t].add(g),s[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new K,b=new K,x=new K,S=new K;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let e=0,t=n.count;e<t;++e)c[e]&&C(e);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Rd(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new K,i=new K,a=new K,o=new K,s=new K,c=new K,l=new K,u=new K;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Qd.fromBufferAttribute(e,t),Qd.normalize(),e.setXYZ(t,Qd.x,Qd.y,Qd.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Rd(a,r,i)}if(this.index===null)return W(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},ef=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=dl,this.updateRanges=[],this.version=0,this.uuid=kl()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=tf(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),r=new this.constructor(n,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=tf(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function tf(e){return e.buffer._uuid===void 0&&(e.buffer._uuid=kl()),e.byteOffset===0&&e.byteLength===e.buffer.byteLength?e.buffer._uuid:e.buffer._uuid+`:`+e.byteOffset+`:`+e.byteLength}var nf=new K,rf=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r,this._normalizationScale=e===void 0?void 0:Yl(e.array)}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)nf.fromBufferAttribute(this,t),nf.applyMatrix4(e),this.setXYZ(t,nf.x,nf.y,nf.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)nf.fromBufferAttribute(this,t),nf.applyNormalMatrix(e),this.setXYZ(t,nf.x,nf.y,nf.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)nf.fromBufferAttribute(this,t),nf.transformDirection(e),this.setXYZ(t,nf.x,nf.y,nf.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){yl(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new Rd(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){yl(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t===void 0?Xl(e,this.data.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?Zl(e,this.data.array):Math.round(e*t)}},af=new K,of=new K,sf=new q,cf=class{constructor(e=new K(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=af.subVectors(n,t).cross(of.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(af),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||sf.getNormalMatrix(e),r=this.coplanarPoint(af).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},lf=0,uf=class extends wl{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:lf++}),this.uuid=kl(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new J(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ul,this.stencilZFail=ul,this.stencilZPass=ul,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){W(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?W(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new J().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new cf().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new $l().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new $l().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},df=class extends uf{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new J(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ff,pf=new K,mf=new K,hf=new K,gf=new $l,_f=new $l,vf=new Cu,yf=new K,bf=new K,xf=new K,Sf=new $l,Cf=new $l,wf=new $l,Tf=class extends Xu{constructor(e=new df){if(super(),this.isSprite=!0,this.type=`Sprite`,ff===void 0){ff=new $d;let e=new ef(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);ff.setIndex([0,1,2,0,2,3]),ff.setAttribute(`position`,new rf(e,3,0,!1)),ff.setAttribute(`uv`,new rf(e,2,3,!1))}this.geometry=ff,this.material=e,this.center=new $l(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&G(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),mf.setFromMatrixScale(this.matrixWorld),vf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),hf.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&mf.multiplyScalar(-hf.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;Ef(yf.set(-.5,-.5,0),hf,a,mf,r,i),Ef(bf.set(.5,-.5,0),hf,a,mf,r,i),Ef(xf.set(.5,.5,0),hf,a,mf,r,i),Sf.set(0,0),Cf.set(1,0),wf.set(1,1);let o=e.ray.intersectTriangle(yf,bf,xf,!1,pf);if(o===null&&(Ef(bf.set(-.5,.5,0),hf,a,mf,r,i),Cf.set(0,1),o=e.ray.intersectTriangle(yf,xf,bf,!1,pf),o===null))return;let s=e.ray.origin.distanceTo(pf);s<e.near||s>e.far||t.push({distance:s,point:pf.clone(),uv:yd.getInterpolation(pf,yf,bf,xf,Sf,Cf,wf,new $l),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function Ef(e,t,n,r,i,a){gf.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?_f.copy(gf):(_f.x=a*gf.x-i*gf.y,_f.y=i*gf.x+a*gf.y),e.copy(t),e.x+=_f.x,e.y+=_f.y,e.applyMatrix4(vf)}var Df=new K,Of=new K,kf=new K,Af=new K,jf=class{constructor(e=new K,t=new K(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Df)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Df.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Df.copy(this.origin).addScaledVector(this.direction,t),Df.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Of.copy(e).add(t).multiplyScalar(.5),kf.copy(t).sub(e).normalize(),Af.copy(this.origin).sub(Of);let i=e.distanceTo(t)*.5,a=-this.direction.dot(kf),o=Af.dot(this.direction),s=-Af.dot(kf),c=Af.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Of).addScaledVector(kf,d),f}intersectSphere(e,t){if(e.radius<0)return null;Df.subVectors(e.center,this.origin);let n=Df.dot(this.direction),r=Df.dot(Df)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Df)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,F=C/w,ee=1/w,te=T-P*D,ne=E-F*D,re=O-P*A,ie=k-F*A,I=j-P*N,ae=M-F*N,oe=I*ie-ae*re,se=te*ae-ne*I,ce=re*ne-ie*te;if(r){if(oe<0||se<0||ce<0)return null}else if((oe<0||se<0||ce<0)&&(oe>0||se>0||ce>0))return null;let le=oe+se+ce;if(le===0)return null;let ue=ee*(oe*D+se*A+ce*N);return(le>0?ue<0:ue>0)?null:this.at(ue/le,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Mf=class extends uf{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nu,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Nf=new Cu,Pf=new jf,Ff=new Gd,If=new K,Lf=new K,Rf=new K,zf=new K,Bf=new K,Vf=new K,Hf=new K,Uf=new K,Wf=class extends Xu{constructor(e=new $d,t=new Mf){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Vf.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Bf.fromBufferAttribute(s,e),a?Vf.addScaledVector(Bf,r):Vf.addScaledVector(Bf.sub(t),r))}t.add(Vf)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ff.copy(n.boundingSphere),Ff.applyMatrix4(i),Pf.copy(e.ray).recast(e.near),Ff.containsPoint(Pf.origin)===!1&&(Pf.intersectSphere(Ff,If)===null||Pf.origin.distanceToSquared(If)>(e.far-e.near)**2)||(Nf.copy(i).invert(),Pf.copy(e.ray).applyMatrix4(Nf),(n.boundingBox===null||Pf.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Pf)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Kf(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Kf(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Kf(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Kf(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Gf(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Uf.copy(s),Uf.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Uf);return l<n.near||l>n.far?null:{distance:l,point:Uf.clone(),object:e}}function Kf(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Lf),e.getVertexPosition(c,Rf),e.getVertexPosition(l,zf);let u=Gf(e,t,n,r,Lf,Rf,zf,Hf);if(u){let e=new K;yd.getBarycoord(Hf,Lf,Rf,zf,e),i&&(u.uv=yd.getInterpolatedAttribute(i,s,c,l,e,new $l)),a&&(u.uv1=yd.getInterpolatedAttribute(a,s,c,l,e,new $l)),o&&(u.normal=yd.getInterpolatedAttribute(o,s,c,l,e,new K),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new K,materialIndex:0};yd.getNormal(Lf,Rf,zf,t.normal),u.face=t,u.barycoord=e}return u}var qf=class extends _u{constructor(e=null,t=1,n=1,r,i,a,o,s,c=Vs,l=Vs,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Jf=new Gd,Yf=new $l(.5,.5),Xf=new K,Zf=class{constructor(e=new cf,t=new cf,n=new cf,r=new cf,i=new cf,a=new cf){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=pl,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Jf.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Jf.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Jf)}intersectsSprite(e){return Jf.center.set(0,0,0),Jf.radius=.7071067811865476+Yf.distanceTo(e.center),Jf.applyMatrix4(e.matrixWorld),this.intersectsSphere(Jf)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Xf.x=r.normal.x>0?e.max.x:e.min.x,Xf.y=r.normal.y>0?e.max.y:e.min.y,Xf.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Xf)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Qf=new Cu,$f=class e{constructor(){this.coordinateSystem=pl,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let e=0;e<t.length;e++){let r=t[e];Qf.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[e]===void 0&&(n[e]=new Zf),n[e].setFromProjectionMatrix(Qf,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new Zf),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new e().copy(this)}},ep=class extends uf{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new J(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},tp=new K,np=new K,rp=new Cu,ip=new jf,ap=new Gd,op=new K,sp=new K,cp=class extends Xu{constructor(e=new $d,t=new ep){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)tp.fromBufferAttribute(t,e-1),np.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=tp.distanceTo(np);e.setAttribute(`lineDistance`,new Vd(n,1))}else W(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ap.copy(n.boundingSphere),ap.applyMatrix4(r),ap.radius+=i,e.ray.intersectsSphere(ap)===!1)return;rp.copy(r).invert(),ip.copy(e.ray).applyMatrix4(rp);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=lp(this,e,ip,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=lp(this,e,ip,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=lp(this,e,ip,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=lp(this,e,ip,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function lp(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(tp.fromBufferAttribute(s,i),np.fromBufferAttribute(s,a),n.distanceSqToSegment(tp,np,op,sp)>r)return;op.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(op);if(!(c<t.near||c>t.far))return{distance:c,point:sp.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var up=new K,dp=new K,fp=class extends cp{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)up.fromBufferAttribute(t,e),dp.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+up.distanceTo(dp);e.setAttribute(`lineDistance`,new Vd(n,1))}else W(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},pp=class extends uf{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new J(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},mp=new Cu,hp=new jf,gp=new Gd,_p=new K,vp=class extends Xu{constructor(e=new $d,t=new pp){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),gp.copy(n.boundingSphere),gp.applyMatrix4(r),gp.radius+=i,e.ray.intersectsSphere(gp)===!1)return;mp.copy(r).invert(),hp.copy(e.ray).applyMatrix4(mp);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);_p.fromBufferAttribute(l,n),yp(_p,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)_p.fromBufferAttribute(l,a),yp(_p,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function yp(e,t,n,r,i,a,o){let s=hp.distanceSqToPoint(e);if(s<n){let n=new K;hp.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var bp=class extends _u{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},xp=class extends _u{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Sp=class extends _u{constructor(e,t,n=Qs,r,i,a,o=Vs,s=Vs,c,l=lc,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new pu(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Cp=class extends Sp{constructor(e,t=Qs,n=301,r,i,a=Vs,o=Vs,s,c=lc){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},wp=class extends _u{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Tp=class e extends $d{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Vd(c,3)),this.setAttribute(`normal`,new Vd(l,3)),this.setAttribute(`uv`,new Vd(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new K;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ep=new K,Dp=new K,Op=new K,kp=new yd,Ap=class extends $d{constructor(e=null,t=1){if(super(),this.type=`EdgesGeometry`,this.parameters={geometry:e,thresholdAngle:t},e!==null){let n=1e4,r=Math.cos(Dl*t),i=e.getIndex(),a=e.getAttribute(`position`),o=i?i.count:a.count,s=[0,0,0],c=[`a`,`b`,`c`],l=[,,,],u=new Map,d=[];for(let e=0;e<o;e+=3){i?(s[0]=i.getX(e),s[1]=i.getX(e+1),s[2]=i.getX(e+2)):(s[0]=e,s[1]=e+1,s[2]=e+2);let{a:t,b:o,c:f}=kp;if(t.fromBufferAttribute(a,s[0]),o.fromBufferAttribute(a,s[1]),f.fromBufferAttribute(a,s[2]),kp.getNormal(Op),l[0]=`${Math.round(t.x*n)},${Math.round(t.y*n)},${Math.round(t.z*n)}`,l[1]=`${Math.round(o.x*n)},${Math.round(o.y*n)},${Math.round(o.z*n)}`,l[2]=`${Math.round(f.x*n)},${Math.round(f.y*n)},${Math.round(f.z*n)}`,l[0]!==l[1]&&l[1]!==l[2]&&l[2]!==l[0])for(let e=0;e<3;e++){let t=(e+1)%3,n=l[e],i=l[t],a=kp[c[e]],o=kp[c[t]],f=`${n}_${i}`,p=`${i}_${n}`,m=u.get(p);m?(Op.dot(m.normal)<=r&&(d.push(a.x,a.y,a.z),d.push(o.x,o.y,o.z)),u.set(p,null)):u.has(f)||u.set(f,{index0:s[e],index1:s[t],normal:Op.clone()})}}for(let e of u.values())if(e){let{index0:t,index1:n}=e;Ep.fromBufferAttribute(a,t),Dp.fromBufferAttribute(a,n),d.push(Ep.x,Ep.y,Ep.z),d.push(Dp.x,Dp.y,Dp.z)}this.setAttribute(`position`,new Vd(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},jp=class e extends $d{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Vd(p,3)),this.setAttribute(`normal`,new Vd(m,3)),this.setAttribute(`uv`,new Vd(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};function Mp(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Pp(i))i.isRenderTargetTexture?(W(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Pp(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Np(e){let t={};for(let n=0;n<e.length;n++){let r=Mp(e[n]);for(let e in r)t[e]=r[e]}return t}function Pp(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Fp(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Ip(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:su.workingColorSpace}var Lp={clone:Mp,merge:Np},Rp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Bp=class extends uf{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rp,this.fragmentShader=zp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Mp(e.uniforms),this.uniformsGroups=Fp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new J().setHex(r.value);break;case`v2`:this.uniforms[n].value=new $l().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new K().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new vu().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new q().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Cu().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Vp=class extends Bp{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Hp=class extends uf{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=al,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Up=class extends uf{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Wp(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Gp(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Kp=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},qp=class extends Kp{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:nl,endingEnd:nl}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case rl:i=e,o=2*t-n;break;case il:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case rl:a=e,s=2*n-t;break;case il:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Jp=class extends Kp{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Yp=class extends Kp{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Xp=class extends Kp{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=$p(n,t,g,y,r);i[p]=Zp(x,o,_,b,m)}return i}};function Zp(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Qp(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function $p(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Zp(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Qp(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var em=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Wp(t,this.TimeBufferType),this.values=Wp(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Wp(e.times,Array),values:Wp(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Gp(e.settings)&&(n.settings={inTangents:Wp(e.settings.inTangents,Array),outTangents:Wp(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Yp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Jp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new qp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Xp(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Qc:t=this.InterpolantFactoryMethodDiscrete;break;case $c:t=this.InterpolantFactoryMethodLinear;break;case el:t=this.InterpolantFactoryMethodSmooth;break;case tl:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return W(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Qc;case this.InterpolantFactoryMethodLinear:return $c;case this.InterpolantFactoryMethodSmooth:return el;case this.InterpolantFactoryMethodBezier:return tl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;Gp(this.settings)&&(tm(this.settings.inTangents,e),tm(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Gp(this.settings)&&(nm(this.settings.inTangents,e),nm(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(G(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(G(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){G(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){G(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&hl(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){G(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===el,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Gp(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function tm(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]+=t}function nm(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}em.prototype.ValueTypeName=``,em.prototype.TimeBufferType=Float32Array,em.prototype.ValueBufferType=Float32Array,em.prototype.DefaultInterpolation=$c;var rm=class extends em{constructor(e,t,n){super(e,t,n)}};rm.prototype.ValueTypeName=`bool`,rm.prototype.ValueBufferType=Array,rm.prototype.DefaultInterpolation=Qc,rm.prototype.InterpolantFactoryMethodLinear=void 0,rm.prototype.InterpolantFactoryMethodSmooth=void 0;var im=class extends em{constructor(e,t,n,r){super(e,t,n,r)}};im.prototype.ValueTypeName=`color`;var am=class extends em{constructor(e,t,n,r){super(e,t,n,r)}};am.prototype.ValueTypeName=`number`;var om=class extends Kp{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)eu.slerpFlat(i,0,a,c-o,a,c,s);return i}},sm=class extends em{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new om(this.times,this.values,this.getValueSize(),e)}};sm.prototype.ValueTypeName=`quaternion`,sm.prototype.InterpolantFactoryMethodSmooth=void 0;var cm=class extends em{constructor(e,t,n){super(e,t,n)}};cm.prototype.ValueTypeName=`string`,cm.prototype.ValueBufferType=Array,cm.prototype.DefaultInterpolation=Qc,cm.prototype.InterpolantFactoryMethodLinear=void 0,cm.prototype.InterpolantFactoryMethodSmooth=void 0;var lm=class extends em{constructor(e,t,n,r){super(e,t,n,r)}};lm.prototype.ValueTypeName=`vector`;var um=new K,dm=new eu,fm=new K,pm=class extends Xu{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Cu,this.projectionMatrix=new Cu,this.projectionMatrixInverse=new Cu,this.coordinateSystem=pl,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(um,dm,fm),fm.x===1&&fm.y===1&&fm.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(um,dm,fm.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(um,dm,fm),fm.x===1&&fm.y===1&&fm.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(um,dm,fm.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},mm=new K,hm=new $l,gm=new $l,_m=class extends pm{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ol*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Dl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ol*2*Math.atan(Math.tan(Dl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){mm.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(mm.x,mm.y).multiplyScalar(-e/mm.z),mm.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(mm.x,mm.y).multiplyScalar(-e/mm.z)}getViewSize(e,t){return this.getViewBounds(e,hm,gm),t.subVectors(gm,hm)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Dl*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},vm=class extends pm{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ym=-90,bm=1,xm=class extends Xu{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new _m(ym,bm,e,t);r.layers=this.layers,this.add(r);let i=new _m(ym,bm,e,t);i.layers=this.layers,this.add(i);let a=new _m(ym,bm,e,t);a.layers=this.layers,this.add(a);let o=new _m(ym,bm,e,t);o.layers=this.layers,this.add(o);let s=new _m(ym,bm,e,t);s.layers=this.layers,this.add(s);let c=new _m(ym,bm,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Sm=class extends _m{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},Cm=`\\[\\]\\.:\\/`,wm=RegExp(`[\\[\\]\\.:\\/]`,`g`),Tm=`[^\\[\\]\\.:\\/]`,Em=`[^`+Cm.replace(`\\.`,``)+`]`,Dm=`((?:WC+[\\/:])*)`.replace(`WC`,Tm),Om=`(WCOD+)?`.replace(`WCOD`,Em),km=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Tm),Am=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Tm),jm=RegExp(`^`+Dm+Om+km+Am+`$`),Mm=[`material`,`materials`,`bones`,`map`],Nm=class{constructor(e,t,n){let r=n||Pm.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Pm=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(wm,``)}static parseTrackName(e){let t=jm.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Mm.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){W(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){G(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){G(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){G(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){G(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){G(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){G(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){G(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;G(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){G(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){G(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Pm.Composite=Nm,Pm.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Pm.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Pm.prototype.GetterByBindingType=[Pm.prototype._getValue_direct,Pm.prototype._getValue_array,Pm.prototype._getValue_arrayElement,Pm.prototype._getValue_toArray],Pm.prototype.SetterByBindingTypeAndVersioning=[[Pm.prototype._setValue_direct,Pm.prototype._setValue_direct_setNeedsUpdate,Pm.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Pm.prototype._setValue_array,Pm.prototype._setValue_array_setNeedsUpdate,Pm.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Pm.prototype._setValue_arrayElement,Pm.prototype._setValue_arrayElement_setNeedsUpdate,Pm.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Pm.prototype._setValue_fromArray,Pm.prototype._setValue_fromArray_setNeedsUpdate,Pm.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};function Fm(e,t,n,r){let i=Im(r);switch(n){case oc:return e*t;case dc:return e*t/i.components*i.byteLength;case fc:return e*t/i.components*i.byteLength;case pc:return e*t*2/i.components*i.byteLength;case mc:return e*t*2/i.components*i.byteLength;case sc:return e*t*3/i.components*i.byteLength;case cc:return e*t*4/i.components*i.byteLength;case hc:return e*t*4/i.components*i.byteLength;case gc:case _c:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case vc:case yc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case xc:case Cc:return Math.max(e,16)*Math.max(t,8)/4;case bc:case Sc:return Math.max(e,8)*Math.max(t,8)/2;case wc:case Tc:case Dc:case Oc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ec:case kc:case Ac:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case jc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Mc:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Nc:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Pc:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Fc:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Ic:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Lc:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Rc:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case zc:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Bc:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Vc:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Hc:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Uc:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Wc:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Gc:case Kc:case qc:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Jc:case Yc:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Xc:case Zc:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Im(e){switch(e){case qs:case Js:return{byteLength:1,components:1};case Xs:case Ys:case ec:return{byteLength:2,components:1};case tc:case nc:return{byteLength:2,components:4};case Qs:case Zs:case $s:return{byteLength:4,components:1};case ic:case ac:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}})),typeof window<`u`&&(window.__THREE__?W(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function Lm(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Rm(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Y={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},X={common:{diffuse:{value:new J(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new q}},envmap:{envMap:{value:null},envMapRotation:{value:new q},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new q}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new q}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new q},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new q},normalScale:{value:new $l(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new q},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new q}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new q}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new q}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new J(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new J(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0},uvTransform:{value:new q}},sprite:{diffuse:{value:new J(16777215)},opacity:{value:1},center:{value:new $l(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}}},zm={basic:{uniforms:Np([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.fog]),vertexShader:Y.meshbasic_vert,fragmentShader:Y.meshbasic_frag},lambert:{uniforms:Np([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new J(0)},envMapIntensity:{value:1}}]),vertexShader:Y.meshlambert_vert,fragmentShader:Y.meshlambert_frag},phong:{uniforms:Np([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new J(0)},specular:{value:new J(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Y.meshphong_vert,fragmentShader:Y.meshphong_frag},standard:{uniforms:Np([X.common,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.roughnessmap,X.metalnessmap,X.fog,X.lights,{emissive:{value:new J(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Y.meshphysical_vert,fragmentShader:Y.meshphysical_frag},toon:{uniforms:Np([X.common,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.gradientmap,X.fog,X.lights,{emissive:{value:new J(0)}}]),vertexShader:Y.meshtoon_vert,fragmentShader:Y.meshtoon_frag},matcap:{uniforms:Np([X.common,X.bumpmap,X.normalmap,X.displacementmap,X.fog,{matcap:{value:null}}]),vertexShader:Y.meshmatcap_vert,fragmentShader:Y.meshmatcap_frag},points:{uniforms:Np([X.points,X.fog]),vertexShader:Y.points_vert,fragmentShader:Y.points_frag},dashed:{uniforms:Np([X.common,X.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Y.linedashed_vert,fragmentShader:Y.linedashed_frag},depth:{uniforms:Np([X.common,X.displacementmap]),vertexShader:Y.depth_vert,fragmentShader:Y.depth_frag},normal:{uniforms:Np([X.common,X.bumpmap,X.normalmap,X.displacementmap,{opacity:{value:1}}]),vertexShader:Y.meshnormal_vert,fragmentShader:Y.meshnormal_frag},sprite:{uniforms:Np([X.sprite,X.fog]),vertexShader:Y.sprite_vert,fragmentShader:Y.sprite_frag},background:{uniforms:{uvTransform:{value:new q},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Y.background_vert,fragmentShader:Y.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new q}},vertexShader:Y.backgroundCube_vert,fragmentShader:Y.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Y.cube_vert,fragmentShader:Y.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Y.equirect_vert,fragmentShader:Y.equirect_frag},distance:{uniforms:Np([X.common,X.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Y.distance_vert,fragmentShader:Y.distance_frag},shadow:{uniforms:Np([X.lights,X.fog,{color:{value:new J(0)},opacity:{value:1}}]),vertexShader:Y.shadow_vert,fragmentShader:Y.shadow_frag}};zm.physical={uniforms:Np([zm.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new q},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new q},clearcoatNormalScale:{value:new $l(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new q},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new q},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new q},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new q},sheen:{value:0},sheenColor:{value:new J(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new q},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new q},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new q},transmissionSamplerSize:{value:new $l},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new q},attenuationDistance:{value:0},attenuationColor:{value:new J(0)},specularColor:{value:new J(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new q},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new q},anisotropyVector:{value:new $l},anisotropyMap:{value:null},anisotropyMapTransform:{value:new q}}]),vertexShader:Y.meshphysical_vert,fragmentShader:Y.meshphysical_frag};var Bm={r:0,b:0,g:0},Vm=new Cu,Hm=new q;Hm.set(-1,0,0,0,1,0,0,0,1);function Um(e,t,n,r,i,a){let o=new J(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new Wf(new Tp(1,1,1),new Bp({name:`BackgroundCubeMaterial`,uniforms:Mp(zm.backgroundCube.uniforms),vertexShader:zm.backgroundCube.vertexShader,fragmentShader:zm.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Vm.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Hm),l.material.toneMapped=su.getTransfer(i.colorSpace)!==ll,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Wf(new jp(2,2),new Bp({name:`BackgroundMaterial`,uniforms:Mp(zm.background.uniforms),vertexShader:zm.background.vertexShader,fragmentShader:zm.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=su.getTransfer(i.colorSpace)!==ll,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Bm,Ip(e)),n.buffers.color.setClear(Bm.r,Bm.g,Bm.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Wm(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Gm(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Km(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(W(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&W(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&W(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function qm(e){let t=this,n=null,r=0,i=!1,a=!1,o=new cf,s=new q,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Jm=class extends bu{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new bp(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Tp(5,5,5),i=new Bp({name:`CubemapFromEquirect`,uniforms:Mp(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Wf(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=Ws),new xm(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},Ym=256,Xm=3,Zm=20,Qm=256,$m=16,eh=3,th=new K,nh=new J,rh=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new xm(1,10,null),this._boxMesh=new Wf(new Tp(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=th}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(nh));let h=new xm(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=uh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Ym,ql(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?Ym:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=ih(e,!1,!1),n=Math.log2(e)-Xm;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=ih(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=uh()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=lh()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=oh(),this._integrationMaterial=sh());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/$m);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-eh)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(Qm*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=ch());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function ih(e,t,n){return new Jm(e,{minFilter:Ks,generateMipmaps:t,type:ec,colorSpace:sl,depthBuffer:n})}function ah(e,t,n){return new Bp({name:e,uniforms:t,vertexShader:Y.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function oh(){return ah(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Qm}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function sh(){return ah(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:$m}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function ch(){return ah(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Zm}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function lh(){return ah(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function uh(){return ah(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function dh(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Jm(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new rh(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new rh(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function fh(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&xl(`WebGLRenderer: `+e+` extension not supported.`),t}}}function ph(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?Bd:zd)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function mh(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function hh(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:G(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function gh(e,t,n){let r=new WeakMap,i=new vu;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new xu(h,p,m,u);g.type=$s,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new $l(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function _h(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var vh={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function yh(e,t,n,r,i,a){let o=new bu(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=null,u=new $d;u.setAttribute(`position`,new Vd([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new Vd([0,2,0,0,2,0],2));let d=new Vp({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Wf(u,d),p=new vm(-1,1,1,-1,0,1),m=null,h=null,g=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new bu(t,n,{type:ec,depthBuffer:!1,stencilBuffer:!1}),c=new bu(t,n,{type:ec,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&y.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&l===null&&(l=new Sp(t,n),a===!0&&(l.format=uc,l.type=rc)),o.dispose(),o.depthTexture=r?l:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<y.length;e++){let i=y[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(l)}},this.begin=function(e,t){if(g||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,g=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},su.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=vh[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(f,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var bh=new _u,xh=new Sp(1,1),Sh=new Cp(1),Ch=new xu,wh=new Su,Th=new bp,Eh=[],Dh=[],Oh=new Float32Array(16),kh=new Float32Array(9),Ah=new Float32Array(4);function jh(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Eh[i];if(a===void 0&&(a=new Float32Array(i),Eh[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Mh(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Nh(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Ph(e,t){let n=Dh[t];n===void 0&&(n=new Int32Array(t),Dh[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Fh(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Ih(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Mh(n,t))return;e.uniform2fv(this.addr,t),Nh(n,t)}}function Lh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Mh(n,t))return;e.uniform3fv(this.addr,t),Nh(n,t)}}function Rh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Mh(n,t))return;e.uniform4fv(this.addr,t),Nh(n,t)}}function zh(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Mh(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Nh(n,t)}else{if(Mh(n,r))return;Ah.set(r),e.uniformMatrix2fv(this.addr,!1,Ah),Nh(n,r)}}function Bh(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Mh(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Nh(n,t)}else{if(Mh(n,r))return;kh.set(r),e.uniformMatrix3fv(this.addr,!1,kh),Nh(n,r)}}function Vh(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Mh(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Nh(n,t)}else{if(Mh(n,r))return;Oh.set(r),e.uniformMatrix4fv(this.addr,!1,Oh),Nh(n,r)}}function Hh(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Uh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Mh(n,t))return;e.uniform2iv(this.addr,t),Nh(n,t)}}function Wh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Mh(n,t))return;e.uniform3iv(this.addr,t),Nh(n,t)}}function Gh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Mh(n,t))return;e.uniform4iv(this.addr,t),Nh(n,t)}}function Kh(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function qh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Mh(n,t))return;e.uniform2uiv(this.addr,t),Nh(n,t)}}function Jh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Mh(n,t))return;e.uniform3uiv(this.addr,t),Nh(n,t)}}function Yh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Mh(n,t))return;e.uniform4uiv(this.addr,t),Nh(n,t)}}function Xh(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function Zh(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?Xh(xh):bh,n.setTexture2D(t||a,i)}function Qh(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||wh,i)}function $h(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?Xh(Sh):Th,n.setTextureCube(t||a,i)}function eg(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Ch,i)}function tg(e){switch(e){case 5126:return Fh;case 35664:return Ih;case 35665:return Lh;case 35666:return Rh;case 35674:return zh;case 35675:return Bh;case 35676:return Vh;case 5124:case 35670:return Hh;case 35667:case 35671:return Uh;case 35668:case 35672:return Wh;case 35669:case 35673:return Gh;case 5125:return Kh;case 36294:return qh;case 36295:return Jh;case 36296:return Yh;case 35678:case 36198:case 36298:case 36306:case 35682:return Zh;case 35679:case 36299:case 36307:return Qh;case 35680:case 36300:case 36308:case 36293:return $h;case 36289:case 36303:case 36311:case 36292:return eg}}function ng(e,t){e.uniform1fv(this.addr,t)}function rg(e,t){let n=jh(t,this.size,2);e.uniform2fv(this.addr,n)}function ig(e,t){let n=jh(t,this.size,3);e.uniform3fv(this.addr,n)}function ag(e,t){let n=jh(t,this.size,4);e.uniform4fv(this.addr,n)}function og(e,t){let n=jh(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function sg(e,t){let n=jh(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function cg(e,t){let n=jh(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function lg(e,t){e.uniform1iv(this.addr,t)}function ug(e,t){e.uniform2iv(this.addr,t)}function dg(e,t){e.uniform3iv(this.addr,t)}function fg(e,t){e.uniform4iv(this.addr,t)}function pg(e,t){e.uniform1uiv(this.addr,t)}function mg(e,t){e.uniform2uiv(this.addr,t)}function hg(e,t){e.uniform3uiv(this.addr,t)}function gg(e,t){e.uniform4uiv(this.addr,t)}function _g(e,t,n){let r=this.cache,i=t.length,a=Ph(n,i);Mh(r,a)||(e.uniform1iv(this.addr,a),Nh(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Xh(xh):bh;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function vg(e,t,n){let r=this.cache,i=t.length,a=Ph(n,i);Mh(r,a)||(e.uniform1iv(this.addr,a),Nh(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||wh,a[e])}function yg(e,t,n){let r=this.cache,i=t.length,a=Ph(n,i);Mh(r,a)||(e.uniform1iv(this.addr,a),Nh(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?Xh(Sh):Th;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function bg(e,t,n){let r=this.cache,i=t.length,a=Ph(n,i);Mh(r,a)||(e.uniform1iv(this.addr,a),Nh(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Ch,a[e])}function xg(e){switch(e){case 5126:return ng;case 35664:return rg;case 35665:return ig;case 35666:return ag;case 35674:return og;case 35675:return sg;case 35676:return cg;case 5124:case 35670:return lg;case 35667:case 35671:return ug;case 35668:case 35672:return dg;case 35669:case 35673:return fg;case 5125:return pg;case 36294:return mg;case 36295:return hg;case 36296:return gg;case 35678:case 36198:case 36298:case 36306:case 35682:return _g;case 35679:case 36299:case 36307:return vg;case 35680:case 36300:case 36308:case 36293:return yg;case 36289:case 36303:case 36311:case 36292:return bg}}var Sg=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=tg(t.type)}},Cg=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=xg(t.type)}},wg=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Tg=/(\w+)(\])?(\[|\.)?/g;function Eg(e,t){e.seq.push(t),e.map[t.id]=t}function Dg(e,t,n){let r=e.name,i=r.length;for(Tg.lastIndex=0;;){let a=Tg.exec(r),o=Tg.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Eg(n,l===void 0?new Sg(s,e,t):new Cg(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new wg(s),Eg(n,e)),n=e}}}var Og=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Dg(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function kg(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Ag=37297,jg=0;function Mg(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Ng=new q;function Pg(e){su._getMatrix(Ng,su.workingColorSpace,e);let t=`mat3( ${Ng.elements.map(e=>e.toFixed(4))} )`;switch(su.getTransfer(e)){case cl:return[t,`LinearTransferOETF`];case ll:return[t,`sRGBTransferOETF`];default:return W(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Fg(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Mg(e.getShaderSource(t),r)}return i}function Ig(e,t){let n=Pg(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var Lg={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Rg(e,t){let n=Lg[t];return n===void 0?(W(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var zg=new K;function Bg(){return su.getLuminanceCoefficients(zg),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${zg.x.toFixed(4)}, ${zg.y.toFixed(4)}, ${zg.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Vg(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Wg).join(`
`)}function Hg(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Ug(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Wg(e){return e!==``}function Gg(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Kg(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var qg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jg(e){return e.replace(qg,Yg)}function Yg(e,t){let n=Y[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return Jg(n)}var Xg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zg(e){return e.replace(Xg,Qg)}function Qg(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function $g(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var e_={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function t_(e){return e_[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var n_={302:`ENVMAP_MODE_REFRACTION`};function r_(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:n_[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var i_={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function a_(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:i_[e.combine]||`ENVMAP_BLENDING_NONE`}function o_(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=t_(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=r_(n),d=a_(n),f=Vg(n),p=Hg(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Wg).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Wg).join(`
`),g.length>0&&(g+=`
`)):(h=[$g(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Wg).join(`
`),g=[$g(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Y.tonemapping_pars_fragment,n.toneMapping===0?``:Rg(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Y.colorspace_pars_fragment,Ig(`linearToOutputTexel`,n.outputColorSpace),Bg(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Wg).join(`
`)),o=Jg(o),o=Gg(o,n),o=Kg(o,n),s=Jg(s),s=Gg(s,n),s=Kg(s,n),o=Zg(o),s=Zg(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=kg(i,i.VERTEX_SHADER,v),x=kg(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=Fg(i,b,`vertex`),n=Fg(i,x,`fragment`);G(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):W(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new Og(i,m),w=Ug(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,Ag)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=jg++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var s_=0,c_=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new l_(e),t.set(e,n)),n}},l_=class{constructor(e){this.id=s_++,this.code=e,this.usedTimes=0}};function u_(e){return e===1030||e===37490||e===36285}function d_(e,t,n,r,i,a){let o=new Pu,s=new c_,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,_=m.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=f[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&W(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(x){let e=zm[x];E=e.vertexShader,D=e.fragmentShader}else{E=i.vertexShader,D=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),M=m.isInstancedMesh===!0,N=m.isBatchedMesh===!0,P=!!i.map,F=!!i.matcap,ee=!!b,te=ee&&b.isPMREMTexture===!0,ne=!!i.aoMap,re=!!i.lightMap,ie=!!i.bumpMap&&i.wireframe===!1,I=!!i.normalMap,ae=!!i.displacementMap,oe=!!i.emissiveMap,se=!!i.metalnessMap,ce=!!i.roughnessMap,le=i.anisotropy>0,ue=i.clearcoat>0,de=i.diffuseRoughness>0,fe=i.dispersion>0,pe=i.retroreflectivity>0,me=i.iridescence>0,he=i.sheen>0,ge=i.transmission>0,_e=le&&!!i.anisotropyMap,ve=ue&&!!i.clearcoatMap,ye=ue&&!!i.clearcoatNormalMap,be=ue&&!!i.clearcoatRoughnessMap,xe=de&&!!i.diffuseRoughnessMap,L=me&&!!i.iridescenceMap,Se=me&&!!i.iridescenceThicknessMap,Ce=he&&!!i.sheenColorMap,we=he&&!!i.sheenRoughnessMap,R=!!i.specularMap,Te=!!i.specularColorMap,z=!!i.specularIntensityMap,B=ge&&!!i.transmissionMap,Ee=ge&&!!i.thicknessMap,De=!!i.gradientMap,Oe=!!i.alphaMap,ke=i.alphaTest>0,Ae=!!i.alphaHash,V=!!i.extensions,je=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(je=e.toneMapping);let Me=te?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,Ne={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:N,batchingColor:N&&m._colorsTexture!==null,instancing:M,instancingColor:M&&m.instanceColor!==null,instancingMorph:M&&m.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:su.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:P,matcap:F,envMap:ee,envMapMode:ee&&b.mapping,envMapPMREM:te,envMapMaxLod:te?Me.length-1:null,envMapSize:te?Me[0].width:null,aoMap:ne,lightMap:re,bumpMap:ie,normalMap:I,displacementMap:ae,emissiveMap:oe,normalMapObjectSpace:I&&i.normalMapType===1,normalMapTangentSpace:I&&i.normalMapType===0,packedNormalMap:I&&i.normalMapType===0&&u_(i.normalMap.format),metalnessMap:se,roughnessMap:ce,anisotropy:le,anisotropyMap:_e,clearcoat:ue,clearcoatMap:ve,clearcoatNormalMap:ye,clearcoatRoughnessMap:be,diffuseRoughness:de,diffuseRoughnessMap:xe,dispersion:fe,retroreflection:pe,iridescence:me,iridescenceMap:L,iridescenceThicknessMap:Se,sheen:he,sheenColorMap:Ce,sheenRoughnessMap:we,specularMap:R,specularColorMap:Te,specularIntensityMap:z,transmission:ge,transmissionMap:B,thicknessMap:Ee,gradientMap:De,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Oe,alphaTest:ke,alphaHash:Ae,combine:i.combine,mapUv:P&&p(i.map.channel),aoMapUv:ne&&p(i.aoMap.channel),lightMapUv:re&&p(i.lightMap.channel),bumpMapUv:ie&&p(i.bumpMap.channel),normalMapUv:I&&p(i.normalMap.channel),displacementMapUv:ae&&p(i.displacementMap.channel),emissiveMapUv:oe&&p(i.emissiveMap.channel),metalnessMapUv:se&&p(i.metalnessMap.channel),roughnessMapUv:ce&&p(i.roughnessMap.channel),anisotropyMapUv:_e&&p(i.anisotropyMap.channel),clearcoatMapUv:ve&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:ye&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:xe&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:L&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:Se&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:we&&p(i.sheenRoughnessMap.channel),specularMapUv:R&&p(i.specularMap.channel),specularColorMapUv:Te&&p(i.specularColorMap.channel),specularIntensityMapUv:z&&p(i.specularIntensityMap.channel),transmissionMapUv:B&&p(i.transmissionMap.channel),thicknessMapUv:Ee&&p(i.thicknessMap.channel),alphaMapUv:Oe&&p(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(I||le),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!_.attributes.uv&&(P||Oe),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&I===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:je,decodeVideoTexture:P&&i.map.isVideoTexture===!0&&su.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:oe&&i.emissiveMap.isVideoTexture===!0&&su.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:V&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(V&&i.extensions.multiDraw===!0||N)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ne.vertexUv1s=c.has(1),Ne.vertexUv2s=c.has(2),Ne.vertexUv3s=c.has(3),c.clear(),Ne}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),_(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function _(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function v(e){let t=f[e.type],n;if(t){let e=zm[t];n=Lp.clone(e.uniforms)}else n=e.uniforms;return n}function y(t,n){let r=u.get(n);return r===void 0?(r=new o_(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function b(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function x(e){s.remove(e)}function S(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:x,programs:l,dispose:S}}function f_(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function p_(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function m_(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function h_(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||p_),r.length>1&&r.sort(t||m_),i.length>1&&i.sort(t||m_)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function g_(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new h_,e.set(t,[i])):n>=r.length?(i=new h_,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function __(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new K,color:new J};break;case`SpotLight`:n={position:new K,direction:new K,color:new J,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new K,color:new J,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new K,skyColor:new J,groundColor:new J};break;case`RectAreaLight`:n={color:new J,position:new K,halfWidth:new K,halfHeight:new K}}return e[t.id]=n,n}}}function v_(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $l};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $l};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $l,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var y_=0;function b_(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function x_(e){let t=new __,n=v_(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new K);let i=new K,a=new Cu,o=new Cu;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(b_);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=X.LTC_FLOAT_1,r.rectAreaLTC2=X.LTC_FLOAT_2):(r.rectAreaLTC1=X.LTC_HALF_1,r.rectAreaLTC2=X.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=y_++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function S_(e){let t=new x_(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function C_(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new S_(e),t.set(n,[a])):r>=i.length?(a=new S_(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var w_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,T_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,E_=[new K(1,0,0),new K(-1,0,0),new K(0,1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1)],D_=[new K(0,-1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1),new K(0,-1,0),new K(0,-1,0)],O_=new Cu,k_=new K,A_=new K;function j_(e,t,n){let r=new Zf,i=new $l,a=new $l,o=new vu,s=new Hp,c=new Up,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new Bp({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $l},radius:{value:4}},vertexShader:w_,fragmentShader:T_}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new $d;m.setAttribute(`position`,new Rd(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Wf(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(W(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){W(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){W(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new bu(i.x,i.y,{format:pc,type:ec,minFilter:Ws,magFilter:Ws,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Sp(i.x,i.y,$s),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=lc,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Vs,d.map.depthTexture.magFilter=Vs}else l.isPointLight?(d.map=new Jm(i.x),d.map.depthTexture=new Cp(i.x,Qs)):(d.map=new bu(i.x,i.y),d.map.depthTexture=new Sp(i.x,i.y,Qs)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=lc,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=Ws,d.map.depthTexture.magFilter=Ws):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Vs,d.map.depthTexture.magFilter=Vs);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let _=d.camera.layers.mask&4294967294?d.camera.layers:s.layers;for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),k_.setFromMatrixPosition(l.matrixWorld),e.position.copy(k_),A_.copy(e.position),A_.add(E_[t]),e.up.copy(D_[t]),e.lookAt(A_),e.updateMatrixWorld(),n.makeTranslation(-k_.x,-k_.y,-k_.z),O_.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(O_,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,_,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new bu(i.x,i.y,{format:pc,type:ec}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=y(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)b(l[e],i,a,o,s,c)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function M_(e,t){function n(){let t=!1,n=new vu,r=null,i=new vu(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?se(e.DEPTH_TEST):ce(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Cl[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?se(e.STENCIL_TEST):ce(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,F=e.getParameter(e.VERSION);F.indexOf(`WebGL`)===-1?F.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=P>=1);let ee=null,te={},ne=e.getParameter(e.SCISSOR_BOX),re=e.getParameter(e.VIEWPORT),ie=new vu().fromArray(ne),I=new vu().fromArray(re);function ae(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let oe={};oe[e.TEXTURE_2D]=ae(e.TEXTURE_2D,e.TEXTURE_2D,1),oe[e.TEXTURE_CUBE_MAP]=ae(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[e.TEXTURE_2D_ARRAY]=ae(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),oe[e.TEXTURE_3D]=ae(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),se(e.DEPTH_TEST),o.setFunc(3),ge(!1),_e(1),se(e.CULL_FACE),me(0);function se(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ce(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function le(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function ue(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function de(t){return h!==t&&(e.useProgram(t),h=t,!0)}let fe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};fe[103]=e.MIN,fe[104]=e.MAX;let pe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function me(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(ce(e.BLEND),g=!1);else if(g===!1&&(se(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:G(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:G(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:G(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:G(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(fe[n],fe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(pe[r],pe[i],pe[o],pe[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function he(t,n){t.side===2?ce(e.CULL_FACE):se(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ge(r),t.blending===1&&t.transparent===!1?me(0):me(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ye(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?se(e.SAMPLE_ALPHA_TO_COVERAGE):ce(e.SAMPLE_ALPHA_TO_COVERAGE)}function ge(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function _e(t){t===0?ce(e.CULL_FACE):(se(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ve(t){t!==k&&(N&&e.lineWidth(t),k=t)}function ye(t,n,r){t?(se(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):ce(e.POLYGON_OFFSET_FILL)}function be(t){t?se(e.SCISSOR_TEST):ce(e.SCISSOR_TEST)}function xe(t){t===void 0&&(t=e.TEXTURE0+M-1),ee!==t&&(e.activeTexture(t),ee=t)}function L(t,n,r){r===void 0&&(r=ee===null?e.TEXTURE0+M-1:ee);let i=te[r];i===void 0&&(i={type:void 0,texture:void 0},te[r]=i),(i.type!==t||i.texture!==n)&&(ee!==r&&(e.activeTexture(r),ee=r),e.bindTexture(t,n||oe[t]),i.type=t,i.texture=n)}function Se(){let t=te[ee];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ce(){try{e.compressedTexImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function we(){try{e.compressedTexImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function R(){try{e.texSubImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Te(){try{e.texSubImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function z(){try{e.compressedTexSubImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function B(){try{e.compressedTexSubImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Ee(){try{e.texStorage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function De(){try{e.texStorage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Oe(){try{e.texImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function ke(){try{e.texImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Ae(t){return d[t]===void 0?e.getParameter(t):d[t]}function V(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function je(t){ie.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ie.copy(t))}function Me(t){I.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),I.copy(t))}function Ne(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function Pe(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function Fe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},ee=null,te={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ie.set(0,0,e.canvas.width,e.canvas.height),I.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:se,disable:ce,bindFramebuffer:le,drawBuffers:ue,useProgram:de,setBlending:me,setMaterial:he,setFlipSided:ge,setCullFace:_e,setLineWidth:ve,setPolygonOffset:ye,setScissorTest:be,activeTexture:xe,bindTexture:L,unbindTexture:Se,compressedTexImage2D:Ce,compressedTexImage3D:we,texImage2D:Oe,texImage3D:ke,pixelStorei:V,getParameter:Ae,updateUBOMapping:Ne,uniformBlockBinding:Pe,texStorage2D:Ee,texStorage3D:De,texSubImage2D:R,texSubImage3D:Te,compressedTexSubImage2D:z,compressedTexSubImage3D:B,scissor:je,viewport:Me,reset:Fe}}function N_(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new $l,u=new WeakMap,d=new Set,f,p=new WeakMap,m=new Set,h=new FinalizationRegistry(e=>m.delete(e)),g=!1;try{g=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function _(e,t){return g?new OffscreenCanvas(e,t):gl(`canvas`)}function v(e,t,n){let r=1,i=Ee(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=_(n,a));let o=t?_(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),W(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&W(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function y(e){return e.generateMipmaps}function b(t){e.generateMipmap(t)}function x(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];W(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||W(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?cl:su.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function C(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,W(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function w(e,t){return y(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function T(e){let t=new WeakRef(e);r.get(e).__ref=t,m.add(t),h.register(e,t,t)}function E(e){let t=r.get(e).__ref;t!==void 0&&(m.delete(t),h.unregister(t))}function D(e){k(e.target)}function O(e){A(e.target)}function k(e){e.removeEventListener(`dispose`,D),E(e),M(e),e.isVideoTexture&&u.delete(e),e.isHTMLTexture&&d.delete(e)}function A(e){e.removeEventListener(`dispose`,O),E(e),P(e)}function j(){for(let e of m){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?A(t):k(t))}m.clear(),d.clear()}function M(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&N(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function N(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function P(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&k(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(a[t])}r.remove(t)}let F=0;function ee(){F=0}function te(){return F}function ne(e){F=e}function re(){let e=F;return e>=i.maxTextures&&W(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),F+=1,e}function ie(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function I(t,i){let a=r.get(t);if(t.isVideoTexture&&z(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)W(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)W(`WebGLRenderer: Texture marked for update but image is incomplete`);else{he(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function ae(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?he(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function oe(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?he(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function se(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?ge(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ce={[Rs]:e.REPEAT,[zs]:e.CLAMP_TO_EDGE,[Bs]:e.MIRRORED_REPEAT},le={[Vs]:e.NEAREST,[Hs]:e.NEAREST_MIPMAP_NEAREST,[Us]:e.NEAREST_MIPMAP_LINEAR,[Ws]:e.LINEAR,[Gs]:e.LINEAR_MIPMAP_NEAREST,[Ks]:e.LINEAR_MIPMAP_LINEAR},ue={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function de(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&W(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ce[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ce[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ce[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,le[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,le[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ue[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function fe(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,D),T(n));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=ie(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&N(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function pe(e,t,n){return Math.floor(Math.floor(e/n)/t)}function me(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=pe(n.start,r.width,4),c=pe(t.start,r.width,4);n.start<=i+1&&a===c&&pe(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function he(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=fe(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=su.getPrimaries(su.workingColorSpace),r=o.colorSpace===``?null:su.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=v(o.image,!1,i.maxTextureSize);t=B(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=S(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);de(c,o);let h,g=o.mipmaps,_=o.isVideoTexture!==!0,x=f.__version===void 0||l===!0,T=u.dataReady,E=w(o,t);if(o.isDepthTexture)m=C(o.format===uc,o.type),x&&(_?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(g.length>0){_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else _?(x&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&me(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){_&&x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,g[0].width,g[0].height,t.depth);for(let i=0,a=g.length;i<a;i++)if(h=g[i],o.format!==1023){if(r!==null){if(_){if(T){if(o.layerUpdates.size>0){let t=Fm(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else W(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else _?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],o.format===1023?_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?W(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):_?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(_){if(x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=Fm(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)_?(x&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(x){if(_)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(g.length>0){if(_&&x){let t=Ee(g[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(_){if(x){let r=Ee(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);y(o)&&o.mipmapsAutoUpdate===!0&&b(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ge(t,o,s){if(o.image.length!==6)return;let c=fe(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=su.getPrimaries(su.workingColorSpace),r=o.colorSpace===``?null:su.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=v(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=B(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),x=S(o.internalFormat,g,_,o.normalized,o.colorSpace),T=o.isVideoTexture!==!0,E=u.__version===void 0||c===!0,D=l.dataReady,O=w(o,h);de(e.TEXTURE_CUBE_MAP,o);let k;if(o.isDepthTexture){if(x=C(o.format===uc,o.type),E){if(T)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,x,h.width,h.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,h.width,h.height,0,g,_,null)}}else if(f){T&&E&&n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,h.width,h.height);for(let t=0;t<6;t++){k=m[t].mipmaps;for(let r=0;r<k.length;r++){let i=k[r];o.format===1023?T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,g,_,i.data):g===null?W(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):T?D&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,i.data)}}}else{if(k=o.mipmaps,T&&E){k.length>0&&O++;let t=Ee(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,t.width,t.height)}for(let t=0;t<6;t++)if(p){T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<k.length;r++){let i=k[r].image[t].image;T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,i.width,i.height,0,g,_,i.data)}}else{T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,g,_,m[t]);for(let r=0;r<k.length;r++){let i=k[r];T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,g,_,i.image[t])}}}y(o)&&o.mipmapsAutoUpdate===!0&&b(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function _e(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=S(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Te(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,R(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function ve(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=C(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Te(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,R(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,R(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=S(o.internalFormat,c,l,o.normalized,o.colorSpace);Te(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,R(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,R(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ye(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let c=r.get(i.depthTexture);c.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;c.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?se(i.depthTexture,0):I(i.depthTexture,0);let u=c.__webglTexture,d=R(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Te(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Te(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function be(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)ye(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?ye(i.__webglFramebuffer[0],t,0):ye(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),ve(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),ve(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function xe(t,n,i){let a=r.get(t);n!==void 0&&_e(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&be(t)}function L(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,O),T(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Te(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=S(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=R(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),ve(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),de(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)_e(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else _e(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);y(i)?b(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),de(c,a),_e(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),y(a)&&b(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),de(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)_e(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else _e(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);y(i)?b(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&be(t)}function Se(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(y(a)&&a.mipmapsAutoUpdate===!0){let t=x(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),b(t),n.unbindTexture()}}}let Ce=[];function we(t){if(t.samples>0){if(Te(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Ce.length=0,Ce.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&Ce.push(l),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ce))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function R(e){return Math.min(i.maxSamples,e.samples)}function Te(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function z(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function B(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(su.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&W(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):G(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ee(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=re,this.resetTextureUnits=ee,this.getTextureUnits=te,this.setTextureUnits=ne,this.setTexture2D=I,this.setTexture2DArray=ae,this.setTexture3D=oe,this.setTextureCube=se,this.rebindTextures=xe,this.setupRenderTarget=L,this.updateRenderTargetMipmap=Se,this.updateMultisampleRenderTarget=we,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=Te,this.dispose=j}function P_(e,t){function n(n,r=``){let i,a=su.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var F_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,I_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,L_=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new wp(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Bp({vertexShader:F_,fragmentShader:I_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Wf(new jp(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},R_=class extends wl{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new L_,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new $l,C=null,w=null,T=new _m;T.viewport=new vu;let E=new _m;E.viewport=new vu;let D=[T,E],O=new Sm,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new $u,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new $u,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new $u,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function M(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,M),r.removeEventListener(`inputsourceschange`,N);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,ne.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&W(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&W(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,M),r.addEventListener(`inputsourceschange`,N),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?uc:lc,a=_.stencil?rc:Qs);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new bu(d.textureWidth,d.textureHeight,{format:cc,type:qs,depthTexture:new Sp(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new bu(f.framebufferWidth,f.framebufferHeight,{format:cc,type:qs,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ne.setContext(r),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function N(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}function P(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;P(O,i);for(let e=0;e<a.length;e++)P(a[e],i);O.projectionMatrix.copy(T.projectionMatrix),O.projectionMatrixInverse.copy(T.projectionMatrixInverse),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),F(e,O,i)};function F(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Ol*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let ee=null;function te(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new _m,o.layers.enable(n),o.viewport=new vu,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new wp,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ee&&ee(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let ne=new Lm;ne.setAnimationLoop(te),this.setAnimationLoop=function(e){ee=e},this.dispose=function(){}}},z_=new Cu,B_=new q;B_.set(-1,0,0,0,1,0,0,0,1);function V_(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Ip(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(z_.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(B_),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function H_(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?W(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):W(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var U_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),W_=null;function G_(){return W_===null&&(W_=new qf(U_,16,16,pc,ec),W_.name=`DFG_LUT`,W_.minFilter=Ws,W_.magFilter=Ws,W_.wrapS=zs,W_.wrapT=zs,W_.generateMipmaps=!1,W_.needsUpdate=!0),W_}var K_=class{constructor(e={}){let{canvas:t=_l(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=qs}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([hc,mc,fc]),g=new Set([qs,Qs,Xs,rc,tc,nc]),_=new Uint32Array(4),v=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=ol;let j=0,M=0,N=null,P=-1,F=null,ee=new vu,te=new vu,ne=null,re=new J(0),ie=0,I=t.width,ae=t.height,oe=1,se=null,ce=null,le=new vu(0,0,I,ae),ue=new vu(0,0,I,ae),de=!1,fe=new Zf,pe=new $f,me=!1,he=!1,ge=new Cu,_e=new K,ve=new vu,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},be=!1;function xe(){return N===null?oe:1}let L=n;function Se(e,n){return t.getContext(e,n)}let Ce,we,R,Te,z,B,Ee,De,Oe,ke,Ae,V,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,We,!1),t.addEventListener(`webglcontextrestored`,Ge,!1),t.addEventListener(`webglcontextcreationerror`,Ke,!1),L===null){let t=`webgl2`;if(L=Se(t,e),L===null)throw Se(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}He()}catch(e){throw t.removeEventListener(`webglcontextlost`,We,!1),t.removeEventListener(`webglcontextrestored`,Ge,!1),t.removeEventListener(`webglcontextcreationerror`,Ke,!1),G(`WebGLRenderer: `+e.message),e}function He(){Ce=new fh(L),Ce.init(),ze=new P_(L,Ce),we=new Km(L,Ce,e,ze),R=new M_(L,Ce),we.reversedDepthBuffer&&d&&R.buffers.depth.setReversed(!0),O=L.createFramebuffer(),k=L.createFramebuffer(),A=L.createFramebuffer(),Te=new hh(L),z=new f_,B=new N_(L,Ce,R,z,we,ze,Te),Ee=new dh(T),De=new Rm(L),Be=new Wm(L,De),Oe=new ph(L,De,Te,Be),ke=new _h(L,Oe,De,Be,Te),Ie=new gh(L,we,B),Ne=new qm(z),Ae=new d_(T,Ee,Ce,we,Be,Ne),V=new V_(T,z),je=new g_,Me=new C_(Ce),Fe=new Um(T,Ee,R,ke,p,s),Pe=new j_(T,ke,we),Ve=new H_(L,Te,we,R),Le=new Gm(L,Ce,Te),Re=new mh(L,Ce,Te),Te.programs=Ae.programs,T.capabilities=we,T.extensions=Ce,T.properties=z,T.renderLists=je,T.shadowMap=Pe,T.state=R,T.info=Te}m!==1009&&(w=new yh(m,t.width,t.height,o,r,i));let Ue=new R_(T,L);this.xr=Ue,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let e=Ce.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ce.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return oe},this.setPixelRatio=function(e){e!==void 0&&(oe=e,this.setSize(I,ae,!1))},this.getSize=function(e){return e.set(I,ae)},this.setSize=function(e,n,r=!0){Ue.isPresenting?W(`WebGLRenderer: Can't change size while VR device is presenting.`):(I=e,ae=n,t.width=Math.floor(e*oe),t.height=Math.floor(n*oe),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(I*oe,ae*oe).floor()},this.setDrawingBufferSize=function(e,n,r){I=e,ae=n,oe=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)G(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){W(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(ee)},this.getViewport=function(e){return e.copy(le)},this.setViewport=function(e,t,n,r){e.isVector4?le.set(e.x,e.y,e.z,e.w):le.set(e,t,n,r),R.viewport(ee.copy(le).multiplyScalar(xe()).round())},this.getScissor=function(e){return e.copy(ue)},this.setScissor=function(e,t,n,r){e.isVector4?ue.set(e.x,e.y,e.z,e.w):ue.set(e,t,n,r),R.scissor(te.copy(ue).multiplyScalar(xe()).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(e){R.setScissorTest(de=e)},this.setOpaqueSort=function(e){se=e},this.setTransparentSort=function(e){ce=e},this.getClearColor=function(e){return e.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=Fe.getClearColor(),r=Fe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,L.clearBufferuiv(L.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,L.clearBufferiv(L.COLOR,0,v))}else r|=L.COLOR_BUFFER_BIT}t&&(r|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&L.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,We,!1),t.removeEventListener(`webglcontextrestored`,Ge,!1),t.removeEventListener(`webglcontextcreationerror`,Ke,!1),Fe.dispose(),je.dispose(),Me.dispose(),B.dispose(),z.dispose(),Ee.dispose(),ke.dispose(),Oe.dispose(),Be.dispose(),Ve.dispose(),Ae.dispose(),Ue.dispose(),Ue.removeEventListener(`sessionstart`,$e),Ue.removeEventListener(`sessionend`,et),tt.stop()};function We(e){e.preventDefault(),yl(`WebGLRenderer: Context Lost.`),E=!0}function Ge(){yl(`WebGLRenderer: Context Restored.`),E=!1;let e=Te.autoReset,t=Pe.enabled,n=Pe.autoUpdate,r=Pe.needsUpdate,i=Pe.type;He(),Te.autoReset=e,Pe.enabled=t,Pe.autoUpdate=n,Pe.needsUpdate=r,Pe.type=i}function Ke(e){G(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function qe(e){let t=e.target;t.removeEventListener(`dispose`,qe),Je(t)}function Je(e){Ye(e),z.remove(e)}function Ye(e){let t=z.get(e).programs;t!==void 0&&(t.forEach(function(e){Ae.releaseProgram(e)}),e.isShaderMaterial&&Ae.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ye);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=ft(e,t,n,r,i);R.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Oe.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Be.setup(i,r,s,n,c);let h,g=Le;if(c!==null&&(h=De.get(c),g=Re,g.setIndex(h)),i.isMesh)r.wireframe===!0?(R.setLineWidth(r.wireframeLinewidth*xe()),g.setMode(L.LINES)):g.setMode(L.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),R.setLineWidth(e*xe()),i.isLineSegments?g.setMode(L.LINES):i.isLineLoop?g.setMode(L.LINE_LOOP):g.setMode(L.LINE_STRIP)}else i.isPoints?g.setMode(L.POINTS):i.isSprite&&g.setMode(L.TRIANGLES);if(i.isBatchedMesh){if(Ce.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?De.get(c).bytesPerElement:1,o=z.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(L,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function Xe(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),me===!0&&Ne.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,ct(e,t,r),e.side=0,e.needsUpdate=!0,ct(e,t,r),e.side=2):ct(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Me.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),he=this.localClippingEnabled,me=Ne.init(this.clippingPlanes,he),me===!0&&Ne.setGlobalState(this.clippingPlanes,t),D!==null&&Pe.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];Xe(o,n,t,e),r.add(o)}else Xe(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=z.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Ce.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let Ze=null;function Qe(e){Ze&&Ze(e)}function $e(){tt.stop()}function et(){tt.start()}let tt=new Lm;tt.setAnimationLoop(Qe),typeof self<`u`&&tt.setContext(self),this.setAnimationLoop=function(e){Ze=e,Ue.setAnimationLoop(e),e===null?tt.stop():tt.start()},Ue.addEventListener(`sessionstart`,$e),Ue.addEventListener(`sessionend`,et),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){G(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Ue.enabled===!0&&Ue.isPresenting===!0,r=w!==null&&(N===null||n)&&w.begin(T,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera(t),t=Ue.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,N),x=Me.get(e,C.length),x.init(t),x.state.textureUnits=B.getTextureUnits(),C.push(x),ge.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?pe.setFromArrayCamera(t):fe.setFromProjectionMatrix(ge,pl,t.reversedDepth),he=this.localClippingEnabled,me=Ne.init(this.clippingPlanes,he),b=je.get(e,S.length),b.init(),S.push(b),this.info.render.frame++,Ue.enabled===!0&&Ue.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&nt(e,t,-1/0,T.sortObjects)}nt(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(se,ce),be=Ue.enabled===!1||Ue.isPresenting===!1||Ue.hasDepthSensing()===!1,be&&Fe.addToRenderList(b,e),this.info.autoReset===!0&&this.info.reset(),me===!0&&Ne.beginShadows();let i=x.state.shadowsArray;if(Pe.render(i,e,t),me===!0&&Ne.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];it(n,r,e,a)}be&&Fe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];rt(b,e,n,n.viewport)}}else r.length>0&&it(n,r,e,t),be&&Fe.render(e),rt(b,e,t)}N!==null&&M===0&&(B.updateMultisampleRenderTarget(N),B.updateRenderTargetMipmap(N)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Be.resetDefaultState(),P=-1,F=null,C.pop(),C.length>0?(x=C[C.length-1],B.setTextureUnits(x.state.textureUnits),me===!0&&Ne.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function nt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?pe:fe;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&ve.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ge);let i=ke.update(e),a=e.material;a.visible&&b.push(e,i,a,n,ve.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?pe:fe;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=ke.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),ve.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),ve.copy(e.boundingSphere.center)),ve.applyMatrix4(e.matrixWorld).applyMatrix4(ge)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,ve.z,s,t)}}else a.visible&&b.push(e,i,a,n,ve.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)nt(i[e],t,n,r)}function rt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),me===!0&&Ne.setGlobalState(T.clippingPlanes,n),r&&R.viewport(ee.copy(r)),i.length>0&&at(i,t,n),a.length>0&&at(a,t,n),o.length>0&&at(o,t,n),R.buffers.depth.setTest(!0),R.buffers.depth.setMask(!0),R.buffers.color.setMask(!0),R.setPolygonOffset(!1)}function it(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Ce.has(`EXT_color_buffer_half_float`)||Ce.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new bu(1,1,{generateMipmaps:!0,type:e?ec:qs,minFilter:Ks,samples:Math.max(4,we.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:su.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||ee;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(re),ie=T.getClearAlpha(),ie<1&&T.setClearColor(16777215,.5),T.clear(),be&&Fe.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),me===!0&&Ne.setGlobalState(T.clippingPlanes,r),at(e,n,r),B.updateMultisampleRenderTarget(a),B.updateRenderTargetMipmap(a),Ce.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,ot(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(B.updateMultisampleRenderTarget(a),B.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(re,ie),d!==void 0&&(r.viewport=d),T.toneMapping=u}function at(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&ot(o,t,n,s,l,c)}}function ot(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function st(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function ct(e,t,n){t.isScene!==!0&&(t=ye);let r=z.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Ae.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Ae.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ee.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,qe),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return dt(e,s),d}else s.uniforms=Ae.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Ae.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ne.uniform),dt(e,s),r.needsLights=mt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=st(x.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function lt(e,t,n,r,i){let a=z.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=ct(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function ut(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Og.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function dt(e,t){let n=z.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function ft(e,t,n,r,i){t.isScene!==!0&&(t=ye),B.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?T.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:su.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ee.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=z.get(r),b=x.state.lights;if(me===!0&&(he===!0||e!==F)){let t=e===F&&r.id===P;Ne.setState(r,e,t)}let S=!1,C=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==b.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?S=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ne.numPlanes||v.numIntersection!==Ne.numIntersection)?S=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===st(x.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(C=!0):S=!0:S=!0:(S=!0,v.__version=r.version);let w=v.currentProgram;(S===!0||C===!0)&&(w=C===!0?lt(r,t,i,s,h):ct(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,w,v));let E=!1,O=!1,k=!1,A=w.getUniforms(),j=v.uniforms;if(R.useProgram(w.program)&&(E=!0,O=!0,k=!0),r.id!==P&&(P=r.id,O=!0),E||F!==e){R.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),A.setValue(L,`projectionMatrix`,e.projectionMatrix),A.setValue(L,`viewMatrix`,e.matrixWorldInverse);let t=A.map.cameraPosition;t!==void 0&&t.setValue(L,_e.setFromMatrixPosition(e.matrixWorld)),we.logarithmicDepthBuffer&&A.setValue(L,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&A.setValue(L,`isOrthographic`,e.isOrthographicCamera===!0),F!==e&&(F=e,O=!0,k=!0)}if(v.needsLights&&(b.state.sunShadowMap.length>0&&A.setValue(L,`sunShadowMap`,b.state.sunShadowMap,B),b.state.directionalShadowMap.length>0&&A.setValue(L,`directionalShadowMap`,b.state.directionalShadowMap,B),b.state.spotShadowMap.length>0&&A.setValue(L,`spotShadowMap`,b.state.spotShadowMap,B),b.state.pointShadowMap.length>0&&A.setValue(L,`pointShadowMap`,b.state.pointShadowMap,B)),i.isSkinnedMesh){A.setOptional(L,i,`bindMatrix`),A.setOptional(L,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),A.setValue(L,`boneTexture`,e.boneTexture,B))}i.isBatchedMesh&&(A.setOptional(L,i,`batchingTexture`),A.setValue(L,`batchingTexture`,i._matricesTexture,B),A.setOptional(L,i,`batchingIdTexture`),A.setValue(L,`batchingIdTexture`,i._indirectTexture,B),A.setOptional(L,i,`batchingColorTexture`),i._colorsTexture!==null&&A.setValue(L,`batchingColorTexture`,i._colorsTexture,B));let M=n.morphAttributes;if((M.position!==void 0||M.normal!==void 0||M.color!==void 0)&&Ie.update(i,n,w),(O||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,A.setValue(L,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(j.envMapIntensity.value=t.environmentIntensity),j.dfgLUT!==void 0&&(j.dfgLUT.value=G_()),O){if(A.setValue(L,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&pt(j,k),a&&r.fog===!0&&V.refreshFogUniforms(j,a),V.refreshMaterialUniforms(j,r,oe,ae,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=y,t=0;for(let n of x.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;j.probesSH.value=e.textures,j.probesMin.value=e.min,j.probesMax.value=e.max,j.probesResolution.value=e.resolution}Og.upload(L,ut(v),j,B)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Og.upload(L,ut(v),j,B),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&A.setValue(L,`center`,i.center),A.setValue(L,`modelViewMatrix`,i.modelViewMatrix),A.setValue(L,`normalMatrix`,i.normalMatrix),A.setValue(L,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Ve.update(n,w),Ve.bind(n,w)}}return w}function pt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function mt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=z.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),z.get(e.texture).__webglTexture=t,z.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=z.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,j=t,M=n;let r=null,i=!1,a=!1;if(e){let o=z.get(e);if(o.__useDefaultFramebuffer!==void 0){R.bindFramebuffer(L.FRAMEBUFFER,o.__webglFramebuffer),ee.copy(e.viewport),te.copy(e.scissor),ne=e.scissorTest,R.viewport(ee),R.scissor(te),R.setScissorTest(ne),P=-1;return}if(o.__webglFramebuffer===void 0)B.setupRenderTarget(e);else if(o.__hasExternalTextures)B.rebindTextures(e,z.get(e.texture).__webglTexture,z.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&z.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);B.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=z.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&B.useMultisampledRTT(e)===!1?z.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,ee.copy(e.viewport),te.copy(e.scissor),ne=e.scissorTest}else ee.copy(le).multiplyScalar(oe).floor(),te.copy(ue).multiplyScalar(oe).floor(),ne=de;if(n!==0&&(r=O),R.bindFramebuffer(L.FRAMEBUFFER,r)&&R.drawBuffers(e,r),R.viewport(ee),R.scissor(te),R.setScissorTest(ne),i){let r=z.get(e.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=z.get(e.textures[t]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=z.get(e.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,t.__webglTexture,n)}P=-1};function ht(e){let t=z.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=we.textureFormatReadable(e.format),t.__typeReadable=we.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){G(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=z.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){R.bindFramebuffer(L.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+s);let u=ht(o);if(u.__formatReadable===!1){G(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){G(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&L.readPixels(t,n,r,i,ze.convert(c),ze.convert(l),a)}finally{let e=N===null?null:z.get(N).__webglFramebuffer;R.bindFramebuffer(L.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=z.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){R.bindFramebuffer(L.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+s);let d=ht(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,f),L.bufferData(L.PIXEL_PACK_BUFFER,a.byteLength,L.STREAM_READ),L.readPixels(t,n,r,i,ze.convert(l),ze.convert(u),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);let p=N===null?null:z.get(N).__webglFramebuffer;R.bindFramebuffer(L.FRAMEBUFFER,p);let m=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Sl(L,m,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,f),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,a),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(f),L.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;B.setTexture2D(e,0),L.copyTexSubImage2D(L.TEXTURE_2D,n,0,0,o,s,i,a),R.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=ze.convert(t.format),_=ze.convert(t.type),v;t.isData3DTexture?(B.setTexture3D(t,0),v=L.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(B.setTexture2DArray(t,0),v=L.TEXTURE_2D_ARRAY):(B.setTexture2D(t,0),v=L.TEXTURE_2D),R.activeTexture(L.TEXTURE0),R.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,t.flipY),R.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),R.pixelStorei(L.UNPACK_ALIGNMENT,t.unpackAlignment);let y=R.getParameter(L.UNPACK_ROW_LENGTH),b=R.getParameter(L.UNPACK_IMAGE_HEIGHT),x=R.getParameter(L.UNPACK_SKIP_PIXELS),S=R.getParameter(L.UNPACK_SKIP_ROWS),C=R.getParameter(L.UNPACK_SKIP_IMAGES);R.pixelStorei(L.UNPACK_ROW_LENGTH,h.width),R.pixelStorei(L.UNPACK_IMAGE_HEIGHT,h.height),R.pixelStorei(L.UNPACK_SKIP_PIXELS,l),R.pixelStorei(L.UNPACK_SKIP_ROWS,u),R.pixelStorei(L.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=z.get(e),r=z.get(t),h=z.get(n.__renderTarget),g=z.get(r.__renderTarget);R.bindFramebuffer(L.READ_FRAMEBUFFER,h.__webglFramebuffer),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(e).__webglTexture,i,d+n),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(t).__webglTexture,a,m+n)),L.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,L.DEPTH_BUFFER_BIT,L.NEAREST);R.bindFramebuffer(L.READ_FRAMEBUFFER,null),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||z.has(e)){let n=z.get(e),r=z.get(t);R.bindFramebuffer(L.READ_FRAMEBUFFER,k),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,n.__webglTexture,i),T?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,r.__webglTexture,a),i===0?T?L.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):L.copyTexSubImage2D(v,a,f,p,l,u,o,s):L.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,L.COLOR_BUFFER_BIT,L.NEAREST);R.bindFramebuffer(L.READ_FRAMEBUFFER,null),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?L.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?L.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):L.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):L.texSubImage2D(L.TEXTURE_2D,a,f,p,o,s,g,_,h);R.pixelStorei(L.UNPACK_ROW_LENGTH,y),R.pixelStorei(L.UNPACK_IMAGE_HEIGHT,b),R.pixelStorei(L.UNPACK_SKIP_PIXELS,x),R.pixelStorei(L.UNPACK_SKIP_ROWS,S),R.pixelStorei(L.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&L.generateMipmap(v),R.unbindTexture()},this.initRenderTarget=function(e){z.get(e).__webglFramebuffer===void 0&&B.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?B.setTextureCube(e,0):e.isData3DTexture?B.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?B.setTexture2DArray(e,0):B.setTexture2D(e,0),R.unbindTexture()},this.resetState=function(){j=0,M=0,N=null,R.reset(),Be.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return pl}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=su._getDrawingBufferColorSpace(e),t.unpackColorSpace=su._getUnpackColorSpace()}},q_=.25,J_=.25,Y_=.2,X_=1.6,Z_=.3,Q_=class{world;input;send;body=new vn;yaw=0;pitch=0;creative=!0;target=null;breakProgress=0;eatProgress=0;state=null;selected=0;eye=1.62;breakCooldown=0;placeCooldown=0;breaking=null;lastJumpTap=-10;lastForwardTap=-10;sprintToggle=!1;clock=0;seq=0;bobPhase=0;lastEvents={landedFrom:0,jumped:!1};constructor(e,t,n){this.world=e,this.input=t,this.send=n}tick(e){let t=this.input,n=!e,r=n?+!!t.isDown(`forward`)-!!t.isDown(`back`):0,i=n?+!!t.isDown(`right`)-!!t.isDown(`left`):0;r<=0&&(this.sprintToggle=!1);let a={forward:r,strafe:i,jump:n&&t.isDown(`jump`),sneak:n&&t.isDown(`sneak`),sprint:n&&(t.isDown(`sprint`)||this.sprintToggle),yaw:this.yaw};this.body.canFly=this.creative,this.creative||(this.body.flying=!1),this.lastEvents=this.body.tick(this.world,a);let o=Math.hypot(this.body.vx,this.body.vz);this.body.onGround&&o>.01&&(this.bobPhase+=o*2.2);let s=this.body;this.send({t:`playerState`,x:s.x,y:s.y,z:s.z,yaw:this.yaw,pitch:this.pitch,inWater:s.inWater,eyesInWater:s.eyesInWater,sprinting:s.sprinting,jumped:this.lastEvents.jumped,landedFrom:this.creative?0:this.lastEvents.landedFrom})}get lastPhysics(){return this.lastEvents}held(){return this.state?.main[this.selected]??null}frame(e,t,n,r,i,a){this.clock+=e;let o=this.input;if(o.locked){let e=r/100*.0022;this.yaw-=o.mouseDX*e,this.pitch-=o.mouseDY*e*(i?-1:1);let t=Math.PI/2-.001;this.pitch=Math.max(-t,Math.min(t,this.pitch)),this.yaw=(this.yaw%(Math.PI*2)+Math.PI*2)%(Math.PI*2),o.wasPressed(`jump`)&&(this.creative&&this.clock-this.lastJumpTap<Z_?(this.body.flying=!this.body.flying,this.lastJumpTap=-10):this.lastJumpTap=this.clock),o.wasPressed(`forward`)&&(this.clock-this.lastForwardTap<Z_&&(this.sprintToggle=!0),this.lastForwardTap=this.clock)}let s=this.body,c=s.prevX+(s.x-s.prevX)*n,l=s.prevY+(s.y-s.prevY)*n,u=s.prevZ+(s.z-s.prevZ)*n;this.eye+=(s.eyeHeight-this.eye)*Math.min(1,e*14);let d=s.flying?0:Math.sin(this.bobPhase)*.035;t.position.set(c,l+this.eye+Math.abs(d),u),t.rotation.set(this.pitch,this.yaw,0);let f=this.lookDir(),p=this.creative?5:me;if(this.target=Yt(this.world,t.position.x,t.position.y,t.position.z,f.x,f.y,f.z,p),this.breakCooldown=Math.max(0,this.breakCooldown-e),this.placeCooldown=Math.max(0,this.placeCooldown-e),!o.locked||!a){this.resetBreak(),this.eatProgress=0;return}let m=this.target;o.buttons.has(0)&&m?this.updateBreaking(m,e,o.clicked.has(0)):this.resetBreak();let h=this.held(),g=h?zr(h.id)?.food:void 0,_=o.isDown(`sneak`);o.buttons.has(2)?m&&xt(m.id).interactive&&!_?(o.clicked.has(2)&&this.send({t:`useBlock`,x:m.x,y:m.y,z:m.z}),this.eatProgress=0):g&&(this.creative||(this.state?.hunger??20)<20)?(this.eatProgress+=e/X_,this.eatProgress>=1&&(this.send({t:`eat`}),this.eatProgress=0)):m&&(o.clicked.has(2)||this.placeCooldown<=0)&&(this.placeBlock(m)||o.clicked.has(2))&&(this.placeCooldown=Y_):this.eatProgress=0,o.clicked.has(1)&&m&&this.send({t:`pickBlock`,id:m.id===ct?st:m.id}),o.wasPressed(`drop`)&&this.send({t:`drop`,all:o.isDown(`sprint`)})}resetBreak(){this.breaking=null,this.breakProgress=0}updateBreaking(e,t,n){if(this.creative){(n||this.breakCooldown<=0)&&(this.send({t:`breakBlock`,seq:++this.seq,x:e.x,y:e.y,z:e.z}),this.breakCooldown=q_);return}let r=this.breaking;if(!r||r.x!==e.x||r.y!==e.y||r.z!==e.z){if(this.breakCooldown>0&&!n)return;this.breaking={x:e.x,y:e.y,z:e.z},this.breakProgress=0,this.send({t:`startBreak`,x:e.x,y:e.y,z:e.z})}let i=vi(e.id,this.held()?.id??null);Number.isFinite(i)&&(this.breakProgress+=i<=0?1:t*20/i,this.breakProgress>=1&&(this.send({t:`breakBlock`,seq:++this.seq,x:e.x,y:e.y,z:e.z}),this.resetBreak(),this.breakCooldown=J_))}placeBlock(e){let t=this.held(),n=t?zr(t.id)?.block:void 0;if(n===void 0)return!1;let r=e.x,i=e.y,a=e.z;return xt(e.id).replaceable||(r+=e.nx,i+=e.ny,a+=e.nz),!xt(this.world.getBlock(r,i,a)).replaceable||xt(n).solid&&new rn(r,i,a,r+1,i+1,a+1).intersects(this.body.box())?!1:(this.send({t:`placeBlock`,seq:++this.seq,x:r,y:i,z:a,id:n}),!0)}lookDir(){let e=Math.cos(this.pitch);return new K(-Math.sin(this.yaw)*e,Math.sin(this.pitch),-Math.cos(this.yaw)*e)}facingName(){let e=this.lookDir();return Math.abs(e.x)>Math.abs(e.z)?e.x>0?`Osten (+X)`:`Westen (−X)`:e.z>0?`Süden (+Z)`:`Norden (−Z)`}findFreeSpot(e,t,n){for(let r=Math.max(1,Math.floor(t));r<255;r++){let t=rn.fromFeet(e,r,n,an,1.8),i=!0;for(let e=Math.floor(t.minY);e<=Math.floor(t.maxY)&&i;e++)for(let n=Math.floor(t.minZ);n<=Math.floor(t.maxZ)&&i;n++)for(let r=Math.floor(t.minX);r<=Math.floor(t.maxX);r++)if(xt(this.world.getBlock(r,e,n)).solid){i=!1;break}let a=xt(this.world.getBlock(Math.floor(e),r-1,Math.floor(n)));if(i&&(a.solid||a.liquid))return r}return Math.floor(t)}},$_=[Oe(`risse_0`),Oe(`risse_1`),Oe(`risse_2`),Oe(`risse_3`)],ev=class{mesh;material;constructor(e){this.material=new Bp({glslVersion:fl,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4,uniforms:{uAtlas:e,uLayer:{value:$_[0]}},vertexShader:`out vec2 vUv; void main(){ vUv = vec2(uv.x, 1.0 - uv.y); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`precision highp float; precision highp sampler2DArray;
        uniform sampler2DArray uAtlas; uniform float uLayer; in vec2 vUv; layout(location = 0) out vec4 outColor;
        void main(){ vec4 t = texture(uAtlas, vec3(vUv, uLayer)); if (t.a < 0.1) discard; outColor = vec4(t.rgb, t.a * 0.85); }`}),this.mesh=new Wf(new Tp(1.002,1.002,1.002),this.material),this.mesh.visible=!1,this.mesh.renderOrder=6}update(e,t){!e||t<=0?this.mesh.visible=!1:(this.mesh.visible=!0,this.mesh.position.set(e.x+.5,e.y+.5,e.z+.5),this.material.uniforms.uLayer.value=$_[Math.min(3,Math.floor(t*4))])}dispose(){this.mesh.geometry.dispose(),this.material.dispose()}},tv=`
in vec4 aPos;
in vec4 aUvl;
in vec4 aLight;

out vec2 vUv;
flat out float vLayer;
out float vShade;
out float vSky;
out float vBlock;
out float vFogDepth;

void main() {
  vec3 p = aPos.xyz / 16.0;
  int n = int(aPos.w + 0.5);
  // Richtungsabhängige Schattierung (oben hell, unten dunkel)
  float dirShade = n == 2 ? 1.0 : n == 3 ? 0.55 : (n == 0 || n == 1) ? 0.8 : n == 6 ? 0.92 : 0.68;
  float ao = aLight.x / 3.0;
  vShade = dirShade * (0.5 + 0.5 * ao);
  vSky = aLight.y / 15.0;
  vBlock = aLight.z / 15.0;
  vUv = aUvl.xy / 16.0;
  vLayer = aUvl.z;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vFogDepth = length(mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`,nv=`
precision highp float;
precision highp sampler2DArray;

uniform sampler2DArray uAtlas;
uniform float uDaylight;
uniform vec3 uSkyTint;
uniform vec3 uFogColor;
uniform float uFogNear;
uniform float uFogFar;
uniform float uAlphaTest;
uniform float uOpacity;

in vec2 vUv;
flat in float vLayer;
in float vShade;
in float vSky;
in float vBlock;
in float vFogDepth;

layout(location = 0) out vec4 outColor;

float curve(float l) {
  return 0.035 + 0.965 * pow(l, 1.5);
}

void main() {
  vec4 tex = texture(uAtlas, vec3(vUv, vLayer));
  if (tex.a < uAlphaTest) discard;
  vec3 skyLight = uSkyTint * curve(vSky * uDaylight);
  vec3 blockLight = vec3(1.0, 0.86, 0.66) * curve(vBlock) * step(0.01, vBlock);
  vec3 light = max(skyLight, blockLight);
  vec3 color = tex.rgb * light * vShade;
  float fog = smoothstep(uFogNear, uFogFar, vFogDepth);
  color = mix(color, uFogColor, fog);
  outColor = vec4(color, tex.a * uOpacity);
}
`,rv=new Gd(new K(8,8,8),13.86),iv=new bd(new K(0,0,0),new K(16,16,16)),av=class{uniforms;group=new Zu;materials;meshes=new Map;triangles=0;constructor(e){this.uniforms=e;let t=(t,n,r)=>new Bp({glslVersion:fl,vertexShader:tv,fragmentShader:nv,uniforms:{...e,uAlphaTest:{value:t},uOpacity:{value:r}},transparent:n,depthWrite:!n,side:0});this.materials=[t(0,!1,1),t(.5,!1,1),t(.01,!0,1)],this.group.name=`chunks`,this.group.matrixAutoUpdate=!1}get count(){return this.meshes.size}upload(e,t){this.remove(e);let n=Wt(e),r=Vt(n),i=Ht(n),a=Gt(e),o=[t.opaque,t.cutout,t.translucent],s=[null,null,null],c=!1;o.forEach((e,t)=>{if(!e)return;let n=this.createMesh(e,this.materials[t]);n.position.set(r*16,a*16,i*16),n.updateMatrix(),n.matrixAutoUpdate=!1,n.renderOrder=t,this.group.add(n),s[t]=n,this.triangles+=e.index.length/3,c=!0}),c&&this.meshes.set(e,s)}createMesh(e,t){let n=new $d;n.setAttribute(`aPos`,new Rd(e.pos,4,!1)),n.setAttribute(`aUvl`,new Rd(e.uvl,4,!1)),n.setAttribute(`aLight`,new Rd(e.light,4,!1)),n.setIndex(new Rd(e.index,1)),n.boundingSphere=rv.clone(),n.boundingBox=iv.clone();let r=new Wf(n,t);return r.frustumCulled=!0,r}remove(e){let t=this.meshes.get(e);if(t){for(let e of t){if(!e)continue;this.group.remove(e);let t=e.geometry.getIndex();t&&(this.triangles-=t.count/3),e.geometry.dispose()}this.meshes.delete(e)}}removeColumn(e){for(let t=0;t<16;t++)this.remove(e*16+t)}dispose(){for(let e of[...this.meshes.keys()])this.remove(e);for(let e of this.materials)e.dispose()}},ov=new Map,sv=new Map,cv=new Map;function lv(){ov.clear(),sv.clear(),cv.clear()}function uv(e,t){let n=`${e}:${t}`,r=cv.get(n);if(r)return r;let i=no(Ee[e]),a=document.createElement(`canvas`);a.width=a.height=16;let o=a.getContext(`2d`),s=o.createImageData(16,16);for(let e=0;e<i.length;e+=4)s.data[e]=i[e]*t,s.data[e+1]=i[e+1]*t,s.data[e+2]=i[e+2]*t,s.data[e+3]=i[e+3];return o.putImageData(s,0,0),cv.set(n,a),a}function dv(e){let t=sv.get(e);if(t)return t;let n=document.createElement(`canvas`);n.width=n.height=48;let r=n.getContext(`2d`);r.imageSmoothingEnabled=!1;let i=1/16,a=zr(e),o=a?.block===void 0?void 0:bt[a.block];return a&&(!o||o.shape===ke.Cross||o.shape===ke.Torch?r.drawImage(uv(a.icon,1),4,4,40,40):(r.setTransform(20*i,-10*i,20*i,10*i,4,14),r.drawImage(uv(o.faces[2],1),0,0),r.setTransform(20*i,10*i,0,22*i,4,14),r.drawImage(uv(o.faces[4],.78),0,0),r.setTransform(20*i,-10*i,0,22*i,24,24),r.drawImage(uv(o.faces[0],.62),0,0),r.setTransform(1,0,0,1,0,0))),sv.set(e,n),n}function fv(e){let t=ov.get(e);if(t)return t;let n=dv(e).toDataURL();return ov.set(e,n),n}var pv={heart:{rows:[`.dd...dd.`,`drrd.drrd`,`drlrrrrrd`,`drrrrrrrd`,`.drrrrrd.`,`..drrrd..`,`...drd...`,`....d....`],pal:{d:`#3a0c10`,r:`#e0403a`,l:`#ff9a8a`}},heartHalf:{rows:[`.dd...dd.`,`drrd.dggd`,`drlrrgggd`,`drrrrgggd`,`.drrrggd.`,`..drrgd..`,`...drd...`,`....d....`],pal:{d:`#3a0c10`,r:`#e0403a`,l:`#ff9a8a`,g:`#3b3540`}},heartEmpty:{rows:[`.dd...dd.`,`dggd.dggd`,`dgggggggd`,`dgggggggd`,`.dgggggd.`,`..dgggd..`,`...dgd...`,`....d....`],pal:{d:`#1a1418`,g:`#3b3540`}},food:{rows:[`......dd.`,`.....dbbd`,`..ddddbd.`,`.dmmmmd..`,`dmllmmmd.`,`dmlmmmmd.`,`dmmmmmd..`,`.dmmmd...`,`..ddd....`],pal:{d:`#3a210c`,m:`#c07a35`,l:`#f0b46a`,b:`#efe4cf`}},foodEmpty:{rows:[`......dd.`,`.....dggd`,`..ddddgd.`,`.dggggd..`,`dgggggd..`,`dgggggggd`,`dggggggd.`,`.dgggd...`,`..ddd....`],pal:{d:`#1a1418`,g:`#3b3540`}},armor:{rows:[`ddddddddd`,`dllmmmmmd`,`dlmmmmmmd`,`dmmmmmmmd`,`dmmmmmmmd`,`.dmmmmmd.`,`..dmmmd..`,`...ddd...`],pal:{d:`#2f3340`,m:`#aab0bd`,l:`#eef1f5`}},armorEmpty:{rows:[`ddddddddd`,`dgggggggd`,`dgggggggd`,`dgggggggd`,`dgggggggd`,`.dgggggd.`,`..dgggd..`,`...ddd...`],pal:{d:`#1a1418`,g:`#3b3540`}},bubble:{rows:[`..ddddd..`,`.dbbbbbd.`,`dbllbbbbd`,`dblbbbbbd`,`dbbbbbbbd`,`dbbbbbbbd`,`.dbbbbbd.`,`..ddddd..`],pal:{d:`#1d3f78`,b:`#5a9de8`,l:`#d8ecff`}}},mv=new Map;function hv(e){let t=mv.get(e);if(t)return t;let{rows:n,pal:r}=pv[e],i=document.createElement(`canvas`);i.width=i.height=9;let a=i.getContext(`2d`);n.forEach((e,t)=>[...e].forEach((e,n)=>{e!==`.`&&(a.fillStyle=r[e],a.fillRect(n,t,1,1))}));let o=i.toDataURL();return mv.set(e,o),o}var gv=class{group=new Zu;sprites=new Map;textures=new Map;texture(e){let t=this.textures.get(e);return t||(t=new xp(dv(e)),t.magFilter=Vs,t.minFilter=Vs,t.colorSpace=``,this.textures.set(e,t)),t}sync(e){let t=new Set;for(let n of e){t.add(n.id);let e=this.sprites.get(n.id);if(!e||e.itemId!==n.item.id){e&&this.removeSprite(n.id);let t=new Tf(new df({map:this.texture(n.item.id),alphaTest:.5,fog:!1}));t.scale.setScalar(.38),this.group.add(t),e={sprite:t,itemId:n.item.id,snap:n},this.sprites.set(n.id,e)}e.snap=n}for(let e of[...this.sprites.keys()])t.has(e)||this.removeSprite(e)}removeSprite(e){let t=this.sprites.get(e);t&&(this.group.remove(t.sprite),t.sprite.material.dispose(),this.sprites.delete(e))}update(e,t,n){for(let{sprite:r,snap:i}of this.sprites.values()){let a=Math.sin(e*2.5+i.id)*.06;r.position.set(i.x,i.y+.22+a,i.z);let o=t.getLight(Math.floor(i.x),Math.floor(i.y+.2),Math.floor(i.z)),s=Math.max((o>>4)/15*n,(o&15)/15);r.material.color.setScalar(.12+.88*s**1.3)}}get count(){return this.sprites.size}clearTextures(){for(let e of this.textures.values())e.dispose();this.textures.clear();for(let e of this.sprites.values())e.sprite.material.map=this.texture(e.itemId),e.sprite.material.needsUpdate=!0}dispose(){for(let e of[...this.sprites.keys()])this.removeSprite(e);for(let e of this.textures.values())e.dispose()}},_v=new J(8831983),vv=new J(15768162),yv=new J(659234),bv=new J(1,1,1),xv=new J(.62,.7,1),Sv=class{group=new Zu;sun;moon;stars;clouds;cloudMat;state={daylight:1,skyColor:_v.clone(),fogColor:_v.clone(),tint:bv.clone()};constructor(e){let t=e=>new Bp({transparent:!0,depthWrite:!1,fog:!1,uniforms:{uKind:{value:e}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`
          varying vec2 vUv; uniform int uKind;
          void main(){
            vec2 p = (vUv - 0.5) * 2.0;
            float d = length(p);
            // Pixelig: auf 16er-Raster quantisieren
            vec2 q = floor(vUv * 16.0) / 16.0 - 0.5 + 1.0/32.0;
            float dq = length(q * 2.0);
            vec4 c = vec4(0.0);
            if (uKind == 0) {
              if (dq < 0.55) c = vec4(1.0, 0.95, 0.72, 1.0);
              else if (dq < 0.66) c = vec4(1.0, 0.82, 0.45, 1.0);
              else if (dq > 0.8 && dq < 0.9) c = vec4(1.0, 0.85, 0.5, 0.55);
            } else {
              if (dq < 0.6) {
                c = vec4(0.86, 0.88, 0.96, 1.0);
                vec2 a = q - vec2(0.12, 0.08); vec2 b = q + vec2(0.14, -0.12); vec2 e = q + vec2(-0.05, 0.18);
                if (length(a) < 0.08 || length(b) < 0.06 || length(e) < 0.05) c.rgb *= 0.8;
              }
            }
            if (c.a <= 0.0) discard;
            gl_FragColor = c;
          }`}),n=new jp(1,1);this.sun=new Wf(n,t(0)),this.sun.scale.setScalar(90),this.moon=new Wf(n,t(1)),this.moon.scale.setScalar(60);for(let e of[this.sun,this.moon])e.renderOrder=-10,e.frustumCulled=!1;let r=new $d,i=new Float32Array(2700),a=e>>>0,o=()=>(a=a*1664525+1013904223>>>0,a/4294967296);for(let e=0;e<900;e++){let t=o()*2-1,n=o()*Math.PI*2,r=Math.sqrt(1-t*t);i[e*3]=r*Math.cos(n)*450,i[e*3+1]=Math.abs(t)*450,i[e*3+2]=r*Math.sin(n)*450}r.setAttribute(`position`,new Rd(i,3)),this.stars=new vp(r,new pp({color:16777215,size:1.6,sizeAttenuation:!1,transparent:!0,depthWrite:!1,fog:!1})),this.stars.renderOrder=-11,this.stars.frustumCulled=!1;let s=new Te(e^1540483477),c=new Uint8Array(65536);for(let e=0;e<128;e++)for(let t=0;t<128;t++){let n=t/128*Math.PI*2,r=e/128*Math.PI*2,i=s.noise3(Math.cos(n)*2.2,Math.sin(n)*2.2+Math.cos(r)*2.2,Math.sin(r)*2.2)*.7+s.noise3(Math.cos(n)*5,Math.sin(r)*5,Math.sin(n)*5+Math.cos(r)*5)*.3,a=(e*128+t)*4,o=i>.18?255:0;c[a]=c[a+1]=c[a+2]=255,c[a+3]=o}let l=new qf(c,128,128,cc);l.wrapS=l.wrapT=Rs,l.magFilter=Vs,l.minFilter=Vs,l.needsUpdate=!0,this.cloudMat=new Bp({transparent:!0,depthWrite:!1,side:2,uniforms:{uTex:{value:l},uOffset:{value:new $l},uColor:{value:new J(1,1,1)},uFogColor:{value:new J}},vertexShader:`varying vec2 vWorld; varying float vDist; uniform vec2 uOffset;
        void main(){ vec4 w = modelMatrix * vec4(position,1.0); vWorld = w.xz / 12.0 / 128.0 + uOffset; vec4 mv = viewMatrix * w; vDist = length(mv.xz); gl_Position = projectionMatrix * mv; }`,fragmentShader:`uniform sampler2D uTex; uniform vec3 uColor; uniform vec3 uFogColor; varying vec2 vWorld; varying float vDist;
        void main(){ vec4 t = texture2D(uTex, vWorld); if (t.a < 0.5) discard; float f = smoothstep(180.0, 420.0, vDist); gl_FragColor = vec4(mix(uColor, uFogColor, f), 0.82 * (1.0 - f)); }`}),this.clouds=new Wf(new jp(1e3,1e3),this.cloudMat),this.clouds.rotation.x=-Math.PI/2,this.clouds.renderOrder=5,this.clouds.frustumCulled=!1,this.group.add(this.stars,this.sun,this.moon,this.clouds)}update(e,t,n){let r=e*Math.PI*2,i=Math.sin(r),a=Ql.clamp(i*2.2+.45,.16,1);this.state.daylight=a;let o=Math.max(0,1-Math.abs(i)*3.2),s=Ql.clamp(i*2+.5,0,1);this.state.skyColor.copy(yv).lerp(_v,s).lerp(vv,o*.55),this.state.fogColor.copy(this.state.skyColor),this.state.tint.copy(xv).lerp(bv,s);let c=t.position,l=new K(Math.cos(r),Math.sin(r),.25).normalize();this.sun.position.copy(c).addScaledVector(l,400),this.sun.lookAt(c),this.moon.position.copy(c).addScaledVector(l,-400),this.moon.lookAt(c),this.stars.position.copy(c),this.stars.rotation.z=r,this.stars.material.opacity=Ql.clamp(1-s*1.6,0,1),this.clouds.position.set(c.x,150,c.z),this.cloudMat.uniforms.uOffset.value.set(n*6e-4,0);let u=.35+.65*s;this.cloudMat.uniforms.uColor.value.setRGB(u,u,u*1.02).lerp(vv,o*.3),this.cloudMat.uniforms.uFogColor.value.copy(this.state.fogColor)}dispose(){this.group.traverse(e=>{(e instanceof Wf||e instanceof vp)&&(e.geometry.dispose(),e.material.dispose())}),this.cloudMat.uniforms.uTex.value.dispose()}};function Cv(){let e=new xu(ro(),16,16,Ee.length);return e.format=cc,e.type=qs,e.magFilter=Vs,e.minFilter=Hs,e.wrapS=Rs,e.wrapT=Rs,e.generateMipmaps=!0,e.colorSpace=``,e.needsUpdate=!0,e}su.enabled=!1;var wv=new J(1457274),Tv=class{container;renderer;scene=new ad;camera;chunks;sky;highlight;breakOverlay;items=new gv;resizeObserver;atlas;renderDistance=8;renderScale=1;underwater=!1;contextLost=!1;constructor(e,t){this.container=e,this.renderer=new K_({antialias:!1,powerPreference:`high-performance`,stencil:!1}),this.renderer.outputColorSpace=sl,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.domElement.className=`game-canvas`,this.renderer.domElement.tabIndex=0,e.appendChild(this.renderer.domElement),this.renderer.domElement.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),this.contextLost=!0}),this.renderer.domElement.addEventListener(`webglcontextrestored`,()=>{this.contextLost=!1}),this.camera=new _m(75,1,.05,1e3),this.camera.rotation.order=`YXZ`,this.atlas=Cv(),this.chunks=new av({uAtlas:{value:this.atlas},uDaylight:{value:1},uSkyTint:{value:new J(1,1,1)},uFogColor:{value:new J},uFogNear:{value:80},uFogFar:{value:120}}),this.sky=new Sv(t),this.scene.add(this.sky.group,this.chunks.group);let n=new Ap(new Tp(1.004,1.004,1.004));this.highlight=new fp(n,new ep({color:1052688,transparent:!0,opacity:.55,depthWrite:!1})),this.highlight.visible=!1,this.highlight.renderOrder=4,this.scene.add(this.highlight),this.breakOverlay=new ev(this.chunks.uniforms.uAtlas),this.scene.add(this.breakOverlay.mesh,this.items.group),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),this.resize()}reloadTextures(){let e=this.atlas;this.atlas=Cv(),this.chunks.uniforms.uAtlas.value=this.atlas,e.dispose(),this.items.clearTextures()}get canvas(){return this.renderer.domElement}resize(){let e=Math.max(1,this.container.clientWidth),t=Math.max(1,this.container.clientHeight);this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)*this.renderScale),this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}setFov(e){Math.abs(this.camera.fov-e)>.01&&(this.camera.fov=e,this.camera.updateProjectionMatrix())}setHighlight(e){e?(this.highlight.visible=!0,this.highlight.position.set(e.x+.5,e.y+.5,e.z+.5)):this.highlight.visible=!1}render(e,t){if(this.contextLost)return;this.sky.update(e,this.camera,t);let n=this.chunks.uniforms,r=this.sky.state;n.uDaylight.value=r.daylight,n.uSkyTint.value.copy(r.tint);let i=this.renderDistance*16;this.underwater?(n.uFogColor.value.copy(wv).multiplyScalar(.35+.65*r.daylight),n.uFogNear.value=2,n.uFogFar.value=28,this.scene.background=n.uFogColor.value):(n.uFogColor.value.copy(r.fogColor),n.uFogNear.value=i*.62,n.uFogFar.value=i-4,this.scene.background=r.skyColor),this.sky.group.visible=!this.underwater,this.camera.far=Math.max(500,i+64),this.camera.updateProjectionMatrix(),this.renderer.render(this.scene,this.camera)}get stats(){let e=this.renderer.info.render;return{calls:e.calls,triangles:e.triangles}}dispose(){this.resizeObserver.disconnect(),this.chunks.dispose(),this.breakOverlay.dispose(),this.items.dispose(),this.sky.dispose(),this.atlas.dispose(),this.highlight.geometry.dispose(),this.highlight.material.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}},Z=Ko(`boot`),Ev=Ko(`menu`),Dv=Ko(``),Ov=Ko(0),kv=Ko(``),Av=Ko(null),jv=Ko(null),Mv=Ko(null),Nv=Ko(``),Pv=Ko(0),Fv=Ko(0),Iv=Ko(!1),Lv=Ko(!1),Rv=Ko(!1),zv=Ko(null),Bv=Ko(0),Vv;function Hv(e,t=3500){Av.value=e,clearTimeout(Vv),Vv=setTimeout(()=>Av.value=null,t)}var Uv=class{world;light;pool;meshes;opts;renderDistance=8;centerX=NaN;centerZ=NaN;centerSY=4;appliedRD=-1;wanted=[];loading=new Set;meshable=new Set;dirty=new Set;meshing=new Set;results=[];padPool=[];offDirty;pendingEntities=new Map;disposed=!1;generated=0;meshedTotal=0;constructor(e,t,n,r,i){this.world=e,this.light=t,this.pool=n,this.meshes=r,this.opts=i,this.offDirty=e.onSectionDirty((t,n,r)=>{e.hasColumn(t,r)&&this.dirty.add(Ut(t,n,r))})}get loadedCount(){return this.world.columns.size}get pendingMeshes(){return this.dirty.size+this.meshing.size+this.results.length}get loadingCount(){return this.loading.size}inLoadRadius(e,t){let n=this.renderDistance+1.5;return e*e+t*t<=n*n}inMeshRadius(e,t){let n=this.renderDistance+.5;return e*e+t*t<=n*n}update(e,t,n,r=4){if(this.disposed)return;let i=Math.floor(e)>>4,a=Math.floor(n)>>4;this.centerSY=Math.max(0,Math.min(15,Math.floor(t)>>4)),(i!==this.centerX||a!==this.centerZ||this.appliedRD!==this.renderDistance)&&this.recenter(i,a),this.scheduleLoads(),this.scheduleMeshes(),this.applyResults(r)}recenter(e,t){this.centerX=e,this.centerZ=t;let n=this.appliedRD!==this.renderDistance;this.appliedRD=this.renderDistance;let r=Math.ceil(this.renderDistance+1.5),i=[];for(let n=-r;n<=r;n++)for(let a=-r;a<=r;a++)this.inLoadRadius(a,n)&&i.push({key:Bt(e+a,t+n),d:a*a+n*n});i.sort((e,t)=>e.d-t.d),this.wanted=i.map(e=>e.key);let a=this.renderDistance+2.5;for(let[r,i]of this.world.columns){let o=i.cx-e,s=i.cz-t;o*o+s*s>a*a?this.unload(r,i):n&&!this.inMeshRadius(o,s)&&this.meshes.removeColumn(r)}if(n)for(let n of this.meshable){let r=Vt(n)-e,i=Ht(n)-t;this.inMeshRadius(r,i)&&this.markColumnDirty(n)}}unload(e,t){this.opts.onUnload(t),this.meshes.removeColumn(e),this.world.removeColumn(t.cx,t.cz),this.light.invalidateCache(),this.meshable.delete(e);for(let e=-1;e<=1;e++)for(let n=-1;n<=1;n++)this.meshable.delete(Bt(t.cx+n,t.cz+e));for(let t=0;t<16;t++)this.dirty.delete(e*16+t)}scheduleLoads(){let e=this.pool.size+1;for(let t of this.wanted){if(this.loading.size>=e)break;if(this.loading.has(t)||this.world.columns.has(t))continue;let n=Vt(t),r=Ht(t);this.loading.add(t),(this.opts.savedKeys.has(t)?this.opts.loadSaved(n,r).then(e=>{if(!e)return this.pool.run({op:`gen`,cx:n,cz:r});let i=mi(e);i.blockEntities.length&&this.pendingEntities.set(t,i.blockEntities);let a=i.blocks;return this.pool.run({op:`light`,cx:n,cz:r,blocks:a},[a.buffer])}):this.pool.run({op:`gen`,cx:n,cz:r})).then(e=>{this.loading.delete(t),this.disposed||e.op!==`column`||this.onColumnLoaded(e.cx,e.cz,e.blocks,e.light)}).catch(e=>{this.loading.delete(t),console.error(`Chunk konnte nicht geladen werden`,n,r,e)})}}onColumnLoaded(e,t,n,r){if(!this.inLoadRadius(e-this.centerX,t-this.centerZ)||this.world.hasColumn(e,t))return;let i=qt.fromFlat(e,t,n,r),a=Bt(e,t),o=this.pendingEntities.get(a);o&&(hi(i,o),this.pendingEntities.delete(a)),this.world.addColumn(i),this.light.invalidateCache(),this.light.stitchColumn(e,t),this.generated++;for(let n=-1;n<=1;n++)for(let r=-1;r<=1;r++){let i=Bt(e+r,t+n);!this.meshable.has(i)&&this.world.columns.has(i)&&this.isMeshable(e+r,t+n)&&(this.meshable.add(i),this.markColumnDirty(i))}}isMeshable(e,t){for(let n=-1;n<=1;n++)for(let r=-1;r<=1;r++)if(!this.world.hasColumn(e+r,t+n))return!1;return!0}markColumnDirty(e){let t=this.world.columns.get(e);if(t)for(let n=0;n<16;n++)t.blocks[n]&&this.dirty.add(e*16+n)}takePad(){return this.padPool.pop()??{blocks:new Uint16Array(5832),light:new Uint8Array(5832)}}scheduleMeshes(){let e=this.pool.size*2-this.pool.busy;if(e<=0||this.dirty.size===0)return;let t=[];for(let e of this.dirty){let n=Wt(e);if(!this.meshable.has(n)){this.dirty.delete(e);continue}let r=Vt(n)-this.centerX,i=Ht(n)-this.centerZ;if(!this.inMeshRadius(r,i)){this.dirty.delete(e),this.meshes.remove(e);continue}if(this.meshing.has(e))continue;let a=Gt(e)-this.centerSY;t.push({key:e,d:r*r+i*i+a*a*.5})}if(t.length===0)return;t.length>e&&t.sort((e,t)=>e.d-t.d);let n=Math.min(e,t.length);for(let e=0;e<n;e++){let{key:n,d:r}=t[e];this.dirty.delete(n);let i=Wt(n),a=this.takePad();tn(this.world,Vt(i),Gt(n),Ht(i),a.blocks,a.light)?(this.meshing.add(n),this.pool.run({op:`mesh`,key:n,blocks:a.blocks,light:a.light},[a.blocks.buffer,a.light.buffer],r<=2).then(e=>{this.meshing.delete(n),e.op===`mesh`&&(this.padPool.length<32&&this.padPool.push({blocks:e.blocks,light:e.light}),this.disposed||this.results.push(e))}).catch(()=>this.meshing.delete(n))):(this.meshes.remove(n),this.padPool.push(a))}}applyResults(e){let t=performance.now();for(;this.results.length>0;){let n=this.results.shift(),r=Wt(n.key);if(this.meshable.has(r)&&this.inMeshRadius(Vt(r)-this.centerX,Ht(r)-this.centerZ)&&(this.meshes.upload(n.key,n.data),this.meshedTotal++),performance.now()-t>e)break}}isAreaReady(e,t,n){let r=Math.floor(e)>>4,i=Math.floor(t)>>4;for(let e=-n;e<=n;e++)for(let t=-n;t<=n;t++){let n=Bt(r+t,i+e);if(!this.meshable.has(n))return!1;for(let e=0;e<16;e++){let t=n*16+e;if(this.dirty.has(t)||this.meshing.has(t))return!1}}for(let e of this.results){let t=Wt(e.key);if(Math.abs(Vt(t)-r)<=n&&Math.abs(Ht(t)-i)<=n)return!1}return!0}areaProgress(e,t,n){let r=Math.floor(e)>>4,i=Math.floor(t)>>4,a=0,o=0;for(let e=-n;e<=n;e++)for(let t=-n;t<=n;t++){a+=2;let n=Bt(r+t,i+e);if(this.world.columns.has(n)&&o++,this.meshable.has(n)){let e=!1;for(let t=0;t<16&&!e;t++){let r=n*16+t;e=this.dirty.has(r)||this.meshing.has(r)}e||o++}}return o/a}dispose(){this.disposed=!0,this.offDirty()}},Wv=class{size;slots=[];queue=[];lastGenMs=0;lastMeshMs=0;constructor(e){this.size=e;for(let t=0;t<e;t++){let e=new Worker(new URL(new URL(`world.worker-BbKIovkb.js`,import.meta.url).href,``+import.meta.url),{type:`module`,name:`welt-${t}`}),n={worker:e,job:null};e.onmessage=e=>{let t=n.job;n.job=null;let r=e.data;r.op===`column`?this.lastGenMs=r.ms:r.op===`mesh`&&(this.lastMeshMs=r.ms),t?.resolve(r),this.pump()},e.onerror=e=>{let t=n.job;n.job=null,t?.reject(e),this.pump()},this.slots.push(n)}}async broadcast(e){await Promise.all(this.slots.map(t=>new Promise((n,r)=>{let i={msg:e,transfer:[],resolve:()=>n(),reject:r};t.job?this.queue.unshift(i):(t.job=i,t.worker.postMessage(e))})))}run(e,t=[],n=!1){return new Promise((r,i)=>{let a={msg:e,transfer:t,resolve:r,reject:i};n?this.queue.unshift(a):this.queue.push(a),this.pump()})}get busy(){return this.slots.filter(e=>e.job).length+this.queue.length}pump(){for(let e of this.slots){if(e.job||this.queue.length===0)continue;let t=this.queue.shift();e.job=t,e.worker.postMessage(t.msg,t.transfer)}}dispose(){for(let e of this.slots)e.worker.terminate();this.slots.length=0;for(let e of this.queue)e.reject(Error(`Pool beendet`));this.queue.length=0}},Gv=30,Kv=3,qv=class{container;store;meta;options;world=new Jt;light=new en(this.world);sim;transport;renderer;input;player;sound=new Ds;simPlayer;pool=null;streamer=null;gen;savedKeys=new Set;pendingSaves=new Map;running=!1;raf=0;last=0;acc=0;seconds=0;sinceSave=0;saving=null;suppressPause=!1;phase=`loading`;spawn={x:.5,y:80,z:.5};hasSave=!1;startedAt=0;stepDistance=0;prevScreen=Z.value;spawnMs=0;fpsFrames=0;fpsTime=0;fps=0;frameMs=0;benchFrames=[];benchStart=0;benchResult=null;cleanups=[];constructor(e,t,n,r={}){this.container=e,this.store=t,this.meta=n,this.options=r,this.gen=new zt(n.seed),this.sim=new Vi({world:this.world,light:this.light,time:n.time,dayLengthTicks:hs.VITE_DAY_LENGTH_SECONDS*20,mode:n.mode,seed:n.seed}),this.simPlayer=this.sim.addPlayer(1,n.mode),this.transport=new Hi(this.sim,1),this.renderer=new Tv(e,n.seed),this.input=new Ls(this.renderer.canvas),this.player=new Q_(this.world,this.input,e=>this.transport.send(e)),this.player.creative=n.mode===`creative`,this.cleanups.push(this.transport.onEvent(e=>this.onServerEvent(e)))}async start(){this.startedAt=performance.now(),Z.value=`loading`,Dv.value=`Welt wird vorbereitet …`,Ov.value=0,jv.value=null,Mv.value=null,this.pool=new Wv(ys()),await this.pool.broadcast({op:`init`,seed:this.meta.seed});let e=this.options.bench?null:this.store,t=this.simPlayer;if(e){this.savedKeys=await e.listChunkKeys(this.meta.id);let n=await e.loadPlayer(this.meta.id);n&&(this.hasSave=!0,this.spawn={x:n.x,y:n.y,z:n.z},this.player.yaw=n.yaw,this.player.pitch=n.pitch,this.player.body.flying=n.flying,n.state?t.restore(n.state):n.hotbar&&(n.hotbar.forEach((e,n)=>{Vr(e)&&(t.inventory.main.slots[n]={id:e,count:Hr(e)})}),t.selected=n.selected??0)),this.sim.loadItems(await e.loadItems(this.meta.id))}if(!this.hasSave){let e=this.gen.findSpawn();this.spawn=this.options.bench?{x:.5,y:110,z:.5}:e,this.options.bench&&(this.player.body.flying=!0),this.meta.mode===`creative`&&jt.forEach((e,n)=>t.inventory.main.slots[n]={id:e,count:Hr(e)})}Pv.value=t.selected,this.player.selected=t.selected,this.player.body.setPosition(this.spawn.x,this.spawn.y,this.spawn.z),t.x=this.spawn.x,t.y=this.spawn.y,t.z=this.spawn.z,this.sim.spawn={...this.spawn},t.dirty=!0,this.streamer=new Uv(this.world,this.light,this.pool,this.renderer.chunks,{savedKeys:this.savedKeys,loadSaved:async(e,t)=>this.pendingSaves.get(Bt(e,t))||this.store?.loadChunk(this.meta.id,e,t),onUnload:e=>{e.modified&&this.saveUnloaded(e)}}),this.applySettings();let n=()=>{let e=document.pointerLockElement===this.renderer.canvas;Iv.value=e,e?(this.sound.resume(),Z.value===`paused`&&(Z.value=`playing`)):Z.value===`playing`&&!this.suppressPause&&this.phase===`playing`&&(Z.value=`paused`),this.suppressPause=!1};document.addEventListener(`pointerlockchange`,n),this.cleanups.push(()=>document.removeEventListener(`pointerlockchange`,n));let r=()=>{document.visibilityState===`hidden`&&this.save()};document.addEventListener(`visibilitychange`,r),window.addEventListener(`pagehide`,r),this.cleanups.push(()=>{document.removeEventListener(`visibilitychange`,r),window.removeEventListener(`pagehide`,r)}),this.cleanups.push(Cs.subscribe(()=>this.applySettings())),this.renderer.canvas.addEventListener(`click`,this.onCanvasClick),this.cleanups.push(()=>this.renderer.canvas.removeEventListener(`click`,this.onCanvasClick)),this.running=!0,this.last=performance.now(),this.raf=requestAnimationFrame(this.frame)}get pendingWork(){return(this.streamer?.pendingMeshes??0)+(this.streamer?.loadingCount??0)}get mode(){return this.simPlayer.mode}onServerEvent(e){switch(e.t){case`player`:jv.value=e.state,this.player.state=e.state,this.player.creative=e.state.mode===`creative`,e.state.dead&&Z.value!==`dead`&&this.phase===`playing`&&this.showDeath();break;case`window`:Mv.value=e.window,e.window&&Z.value===`playing`?(this.suppressPause=!0,Z.value=`inventory`,this.input.unlock()):!e.window&&Z.value===`inventory`&&(Z.value=`playing`,this.lock());break;case`items`:this.renderer.items.sync(e.list);break;case`sound`:this.sound.play(e.name,e.x,e.y,e.z,e.block);break;case`teleport`:this.player.body.setPosition(e.x,e.y,e.z);break;case`death`:Nv.value=e.message,this.showDeath()}}showDeath(){Z.value!==`dead`&&(this.suppressPause=!0,Mv.value=null,Z.value=`dead`,this.input.unlock())}respawn(){this.transport.send({t:`respawn`}),Z.value=`playing`,this.lock()}setMode(e){this.transport.send({t:`setMode`,mode:e}),this.meta.mode=e,this.player.creative=e===`creative`,Hv(e===`creative`?`Spielmodus: Kreativ`:`Spielmodus: Überleben`)}onCanvasClick=()=>{this.sound.resume(),this.phase===`playing`&&!this.input.locked&&Z.value===`playing`&&this.lock()};applySettings(){let e=Cs.value,t=this.options.bench?Math.min(hs.VITE_MAX_RENDER_DISTANCE,8):e.renderDistance;this.streamer&&(this.streamer.renderDistance=t),this.renderer.renderDistance=t,this.renderer.setFov(e.fov),this.renderer.renderScale!==e.renderScale&&(this.renderer.renderScale=e.renderScale,this.renderer.resize()),Rv.value=e.showFps||Rv.value}async lock(){await this.input.lock()||Hv(`Maus konnte nicht eingefangen werden. Klicke ins Spielfeld (im iframe wird «allow=pointer-lock» benötigt).`)}resume(){Z.value=`playing`,this.lock()}windowClick(e,t,n){this.transport.send({t:`windowClick`,slot:e,button:t,shift:n})}windowSwap(e,t){this.transport.send({t:`windowSwap`,slot:e,hotbar:t})}creativePick(e,t){this.transport.send({t:`creativePick`,id:e,count:t})}openInventory(){Z.value===`playing`&&this.transport.send({t:`openInventory`})}closeInventory(){Z.value===`inventory`&&this.transport.send({t:`closeWindow`})}selectSlot(e){Pv.value=e,this.player.selected=e,this.transport.send({t:`selectSlot`,slot:e})}frame=e=>{if(!this.running)return;this.raf=requestAnimationFrame(this.frame);let t=Math.min(.25,(e-this.last)/1e3);this.last=e,this.seconds+=t,this.updateFps(t);let n=this.streamer,r=this.player.body;if(this.phase===`loading`){n.update(this.spawn.x,this.spawn.y,this.spawn.z,12);let e=Math.min(Kv,n.renderDistance);Ov.value=n.areaProgress(this.spawn.x,this.spawn.z,e),Dv.value=`Welt wird erzeugt … ${n.loadedCount} Chunks`,n.isAreaReady(this.spawn.x,this.spawn.z,e)&&this.enterWorld(),this.player.frame(t,this.renderer.camera,1,Cs.value.sensitivity,Cs.value.invertY,!1),this.renderer.render(this.dayFraction(0),this.seconds),this.input.endFrame();return}let i=Z.value===`paused`||Z.value===`settings`||Z.value===`keys`,a=this.simPlayer.dead;if(!i){this.acc+=t;let e=0;for(;this.acc>=.05&&e<10;){if(this.options.bench)this.benchTick();else{let e=r.onGround;this.player.tick(a),this.footsteps(e)}this.sim.tick(),this.acc-=pe,e++}e===10&&(this.acc=0)}let o=i?1:this.acc/pe;this.handleHotkeys(),this.player.frame(t,this.renderer.camera,o,Cs.value.sensitivity,Cs.value.invertY,Z.value===`playing`&&!a),Fv.value=this.player.eatProgress;let s=this.player.target;if(this.renderer.setHighlight(s&&Z.value===`playing`?s:null),this.renderer.breakOverlay.update(s,this.player.breakProgress),r.y<-40&&this.mode===`creative`){let e=this.player.findFreeSpot(this.spawn.x,60,this.spawn.z);r.setPosition(this.spawn.x,e,this.spawn.z)}n.update(r.x,r.y,r.z,4),this.renderer.underwater=r.eyesInWater,Lv.value=r.eyesInWater,this.renderer.items.update(this.seconds,this.world,this.renderer.sky.state.daylight);let c=this.renderer.camera.position;this.sound.setListener(c.x,c.y,c.z,this.player.yaw),this.sound.update(t,this.renderer.sky.state.daylight),this.renderer.render(this.dayFraction(o),this.seconds),this.options.bench?this.benchFrame(t):(this.sinceSave+=t,this.sinceSave>=Gv&&(this.sinceSave=0,this.save())),this.prevScreen=Z.value,this.input.endFrame()};footsteps(e){let t=this.player.body;if(t.inWater&&!e&&t.onGround===!1&&Math.abs(t.vy)>.3&&this.sound.play(`splash`),t.onGround&&!t.flying&&(this.stepDistance+=Math.hypot(t.x-t.prevX,t.z-t.prevZ),this.stepDistance>1.7||!e&&t.onGround)){this.stepDistance=0;let e=this.world.getBlock(Math.floor(t.x),Math.floor(t.y-.1),Math.floor(t.z));this.sound.step(e,t.sprinting)}}enterWorld(){let e=this.player.body;if(!this.hasSave){let t=this.player.findFreeSpot(this.spawn.x,this.spawn.y,this.spawn.z);this.options.bench||(this.spawn.y=t,e.setPosition(this.spawn.x,t,this.spawn.z),this.sim.spawn={...this.spawn})}this.phase=`playing`,this.spawnMs=performance.now()-this.startedAt,console.info(`[Blockcraft] Spawn bereit nach ${Math.round(this.spawnMs)} ms`),this.simPlayer.dead?this.showDeath():(Z.value=`playing`,this.options.bench?(this.benchStart=this.seconds,Hv(`Benchmark läuft (${this.options.bench.seconds} s) …`,4e3)):this.lock())}handleHotkeys(){let e=this.input;e.wasPressed(`debug`)&&(Rv.value=!Rv.value);let t=this.prevScreen;if(e.wasPressed(`inventory`)&&(Z.value===`playing`&&t===`playing`?this.openInventory():Z.value===`inventory`&&t===`inventory`&&this.closeInventory()),Z.value===`playing`&&t===`playing`){if(e.wasCodePressed(`Escape`))this.input.locked?this.input.unlock():Z.value=`paused`;else{for(let t=0;t<9;t++)e.wasCodePressed(`Digit${t+1}`)&&this.selectSlot(t);e.wheel!==0&&this.selectSlot(((Pv.value+e.wheel)%9+9)%9)}}}dayFraction(e){let t=this.sim.dayLengthTicks;return((this.sim.time+e)%t+t)%t/t}updateFps(e){this.fpsFrames++,this.fpsTime+=e,this.frameMs=this.frameMs*.9+e*1e3*.1,this.fpsTime>=.5&&(this.fps=this.fpsFrames/this.fpsTime,this.fpsFrames=0,this.fpsTime=0,Rv.value&&this.publishDebug())}publishDebug(){let e=this.player.body,t=this.renderer.stats,n=Math.floor(e.x),r=Math.floor(e.z),i=this.world.getLight(n,Math.floor(e.y+.5),r),a=this.player.target,o=(6+(this.sim.time%this.sim.dayLengthTicks+this.sim.dayLengthTicks)%this.sim.dayLengthTicks/this.sim.dayLengthTicks*24)%24;zv.value={fps:Math.round(this.fps),frameMs:Math.round(this.frameMs*10)/10,x:e.x,y:e.y,z:e.z,chunkX:n>>4,chunkZ:r>>4,facing:this.player.facingName(),biome:B[this.gen.sample(n,r).biome],light:`Sonne ${i>>4}, Block ${i&15}`,loaded:this.streamer?.loadedCount??0,meshes:this.renderer.chunks.count,pending:this.streamer?.pendingMeshes??0,calls:t.calls,triangles:t.triangles,genMs:Math.round((this.pool?.lastGenMs??0)*10)/10,meshMs:Math.round((this.pool?.lastMeshMs??0)*10)/10,workers:this.pool?.size??0,time:`${String(Math.floor(o)).padStart(2,`0`)}:${String(Math.floor(o%1*60)).padStart(2,`0`)}`,target:a?`${xt(a.id).name} @ ${a.x} ${a.y} ${a.z}`:`–`,flying:e.flying}}saveUnloaded(e){if(!this.store||this.options.bench)return;let t=Bt(e.cx,e.cz),n=pi(e);e.modified=!1,this.pendingSaves.set(t,n),this.savedKeys.add(t),this.store.saveChunks(this.meta.id,[{cx:e.cx,cz:e.cz,data:n}]).finally(()=>{this.pendingSaves.get(t)===n&&this.pendingSaves.delete(t)})}save(){if(!this.store||this.options.bench||this.phase!==`playing`)return Promise.resolve();if(this.saving)return this.saving.then(()=>this.save());let e=this.store,t=async()=>{let t=[];for(let{cx:e,cz:n}of this.sim.modifiedColumns()){let r=this.world.getColumn(e,n);t.push({cx:e,cz:n,data:pi(r)}),r.modified=!1,this.savedKeys.add(Bt(e,n))}let n=this.player.body;this.meta.time=this.sim.time,this.meta.lastPlayed=Date.now(),this.meta.mode=this.simPlayer.mode,await Promise.all([e.saveChunks(this.meta.id,t),e.savePlayer({worldId:this.meta.id,x:n.x,y:n.y,z:n.z,yaw:this.player.yaw,pitch:this.player.pitch,flying:n.flying,selected:Pv.value,state:this.simPlayer.persist()}),e.saveItems(this.meta.id,this.sim.serializeItems()),e.putWorld({...this.meta})])};return this.saving=t().catch(e=>{console.error(`Speichern fehlgeschlagen`,e),Hv(`Speichern fehlgeschlagen – ist der Browser-Speicher voll oder blockiert?`)}).finally(()=>{this.saving=null}),this.saving}async quit(){this.transport.send({t:`closeWindow`}),await this.save(),this.dispose()}dispose(){this.running=!1,cancelAnimationFrame(this.raf);for(let e of this.cleanups)e();this.streamer?.dispose(),this.pool?.dispose(),this.transport.close(),this.input.dispose(),this.sound.dispose(),this.renderer.dispose(),this.world.clear(),jv.value=null,Mv.value=null}benchTick(){let e=this.player.body;e.prevX=e.x,e.prevY=e.y,e.prevZ=e.z;let t=this.seconds-this.benchStart;e.x+=12*pe,e.y=100,this.player.yaw=-Math.PI/2+Math.sin(t*.25)*.9,this.player.pitch=-.25+Math.sin(t*.17)*.15}benchFrame(e){if(this.benchResult||(this.benchFrames.push(e),this.seconds-this.benchStart<(this.options.bench?.seconds??60)))return;let t=this.benchFrames.slice(5),n=t.reduce((e,t)=>e+t,0),r=[...t].sort((e,t)=>t-e),i=r.slice(0,Math.max(1,Math.floor(r.length/100))),a=this.renderer.stats;this.benchResult={avgFps:Math.round(t.length/n*10)/10,low1Fps:Math.round(i.length/i.reduce((e,t)=>e+t,0)*10)/10,frames:t.length,seconds:Math.round(n),renderDistance:this.renderer.renderDistance,calls:a.calls,triangles:a.triangles},console.info(`[Blockcraft] Benchmark`,this.benchResult),Hv(`Benchmark: Ø ${this.benchResult.avgFps} FPS, 1%-Low ${this.benchResult.low1Fps} FPS`,6e5)}},Jv=(e,t)=>t.some(t=>e instanceof t),Yv,Xv;function Zv(){return Yv||=[IDBIndex,IDBObjectStore,IDBCursor,IDBDatabase,IDBTransaction]}function Qv(){return Xv||=[`advance`,`continue`,`continuePrimaryKey`].map(e=>IDBCursor.prototype[e])}var $v=new WeakMap,ey=new WeakMap,ty=new WeakMap;function ny(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`success`,i),e.removeEventListener(`error`,a)},i=()=>{t(cy(e.result)),r()},a=()=>{n(e.error),r()};e.addEventListener(`success`,i),e.addEventListener(`error`,a)});return ty.set(t,e),t}function ry(e){if($v.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`complete`,i),e.removeEventListener(`error`,a),e.removeEventListener(`abort`,a)},i=()=>{t(),r()},a=()=>{n(e.error||new DOMException(`AbortError`,`AbortError`)),r()};e.addEventListener(`complete`,i),e.addEventListener(`error`,a),e.addEventListener(`abort`,a)});$v.set(e,t)}var iy={get(e,t,n){if(e instanceof IDBTransaction){if(t===`done`)return $v.get(e);if(t===`store`)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return cy(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t===`done`||t===`store`)||t in e}};function ay(e){iy=e(iy)}function oy(e){return Qv().includes(e)?function(...t){return e.apply(ly(this),t),cy(this.request)}:function(...t){return cy(e.apply(ly(this),t))}}function sy(e){return typeof e==`function`?oy(e):(e instanceof IDBTransaction&&ry(e),Jv(e,Zv())?new Proxy(e,iy):e)}function cy(e){if(e instanceof IDBRequest)return ny(e);if(ey.has(e))return ey.get(e);let t=sy(e);return Object.is(t,e)||(ey.set(e,t),ty.set(t,e)),t}var ly=e=>ty.get(e);function uy(e,t,{blocked:n,upgrade:r,blocking:i,terminated:a}={}){let o=indexedDB.open(e,t),s=cy(o);return r&&o.addEventListener(`upgradeneeded`,e=>{r(cy(o.result),e.oldVersion,e.newVersion,cy(o.transaction),e)}),n&&o.addEventListener(`blocked`,e=>n(e.oldVersion,e.newVersion,e)),s.then(e=>{a&&e.addEventListener(`close`,()=>a()),i&&e.addEventListener(`versionchange`,e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),s}var dy=[`get`,`getKey`,`getAll`,`getAllKeys`,`count`],fy=[`put`,`add`,`delete`,`clear`],py={};function my(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t==`string`))return;if(py[t])return py[t];let n=t.replace(/FromIndex$/,``),r=t!==n,i=fy.includes(n);return!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||dy.includes(n))?void 0:py[t]=async function(e,...t){let a=this.transaction(e,i?`readwrite`:`readonly`),o=a.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&a.done]))[0]}}ay(e=>({...e,get:(t,n,r)=>my(t,n)||e.get(t,n,r),has:(t,n)=>!!my(t,n)||e.has(t,n)}));var hy=[`advance`,`continue`,`continuePrimaryKey`],gy={},_y=new WeakMap,vy=new WeakMap,yy={get(e,t){if(!hy.includes(t))return e[t];let n=gy[t];return n||=gy[t]=function(...e){_y.set(this,vy.get(this)[t](...e))},n}};async function*by(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;let n=new Proxy(t,yy);for(vy.set(n,t),ty.set(n,ly(t));t;)yield n,t=await(_y.get(n)||t.continue()),_y.delete(n)}function xy(e,t){return t===Symbol.asyncIterator&&Jv(e,[IDBIndex,IDBObjectStore,IDBCursor])||t===`iterate`&&Jv(e,[IDBIndex,IDBObjectStore])}ay(e=>({...e,get(t,n,r){return xy(t,n)?by:e.get(t,n,r)},has(t,n){return xy(t,n)||e.has(t,n)}}));var Sy=`bc-worlds`,Cy=2;function wy(e){return IDBKeyRange.bound([e,-1/0,-1/0],[e,1/0,1/0])}var Ty=class e{db;constructor(e){this.db=e}static async open(){let t=await uy(Sy,Cy,{upgrade(e,t){t<1&&(e.createObjectStore(`worlds`,{keyPath:`id`}),e.createObjectStore(`chunks`,{keyPath:[`worldId`,`cx`,`cz`]}),e.createObjectStore(`players`,{keyPath:`worldId`})),t<2&&e.createObjectStore(`entities`,{keyPath:`worldId`})},blocked(){console.warn(`IndexedDB-Upgrade blockiert (andere Tabs offen?)`)}});try{navigator.storage?.persist?.()}catch{}return new e(t)}async listWorlds(){return(await this.db.getAll(`worlds`)).sort((e,t)=>t.lastPlayed-e.lastPlayed)}getWorld(e){return this.db.get(`worlds`,e)}async putWorld(e){await this.db.put(`worlds`,e)}async createWorld(e,t,n,r){let i={id:`w_${Date.now().toString(36)}_${Math.floor(Math.random()*1e9).toString(36)}`,name:e.trim()||`Neue Welt`,seed:t,seedText:n,mode:r,createdAt:Date.now(),lastPlayed:Date.now(),time:1e3,version:1,genVersion:2};return await this.putWorld(i),i}async deleteWorld(e){let t=this.db.transaction([`worlds`,`chunks`,`players`,`entities`],`readwrite`);await Promise.all([t.objectStore(`worlds`).delete(e),t.objectStore(`chunks`).delete(wy(e)),t.objectStore(`players`).delete(e),t.objectStore(`entities`).delete(e),t.done])}async listChunkKeys(e){let t=await this.db.getAllKeys(`chunks`,wy(e));return new Set(t.map(([,e,t])=>Bt(e,t)))}async loadChunk(e,t,n){return(await this.db.get(`chunks`,[e,t,n]))?.data}async saveChunks(e,t){if(t.length===0)return;let n=this.db.transaction(`chunks`,`readwrite`);for(let r of t)n.store.put({worldId:e,cx:r.cx,cz:r.cz,data:r.data});await n.done}loadPlayer(e){return this.db.get(`players`,e)}async savePlayer(e){await this.db.put(`players`,e)}async loadItems(e){return(await this.db.get(`entities`,e))?.items??[]}async saveItems(e,t){await this.db.put(`entities`,{worldId:e,items:t})}async worldSize(e){let t=0,n=await this.db.transaction(`chunks`).store.openCursor(wy(e));for(;n;)t+=n.value.data.byteLength,n=await n.continue();return t}async exportWorld(e){let t=await this.getWorld(e);if(!t)throw Error(`Welt nicht gefunden`);let n=await this.loadPlayer(e),r=await this.loadItems(e),i=await this.db.getAll(`chunks`,wy(e)),a=new TextEncoder().encode(JSON.stringify({meta:t,player:n,items:r})),o=[],s=new Uint8Array(8);s.set([66,67,87,49]),new DataView(s.buffer).setUint32(4,a.byteLength,!0),o.push(s,a);for(let e of i){let t=new Uint8Array(12),n=new DataView(t.buffer);n.setInt32(0,e.cx,!0),n.setInt32(4,e.cz,!0),n.setUint32(8,e.data.byteLength,!0),o.push(t,e.data)}return new Blob(o,{type:`application/octet-stream`})}async importWorld(e){let t=new Uint8Array(await e.arrayBuffer()),n=new DataView(t.buffer);if(t.length<8||t[0]!==66||t[1]!==67||t[2]!==87||t[3]!==49)throw Error(`Keine gültige Welt-Datei`);let r=n.getUint32(4,!0),i=JSON.parse(new TextDecoder().decode(t.subarray(8,8+r))),a=await this.createWorld(`${i.meta.name} (Import)`,i.meta.seed,i.meta.seedText,i.meta.mode);a.time=i.meta.time,a.genVersion=i.meta.genVersion,await this.putWorld(a),i.items?.length&&await this.saveItems(a.id,i.items);let o=[],s=8+r;for(;s+12<=t.length;){let e=n.getInt32(s,!0),r=n.getInt32(s+4,!0),i=n.getUint32(s+8,!0);s+=12,o.push({cx:e,cz:r,data:t.slice(s,s+i)}),s+=i}return await this.saveChunks(a.id,o),i.player&&await this.savePlayer({...i.player,worldId:a.id}),a}close(){this.db.close()}},Ey=Ko([]),Dy=Ko({}),Oy=Ko(``),ky=null,Q=null,Ay=null;function jy(){return Q}function My(e){Ay=e}function Ny(){try{return!!document.createElement(`canvas`).getContext(`webgl2`)}catch{return!1}}async function Py(){if(!Ny())kv.value=`Dein Browser unterstützt kein WebGL 2. Bitte nutze einen aktuellen Chrome, Edge, Firefox oder Safari.`,Z.value=`error`;else{try{ky=await Ty.open()}catch(e){console.warn(`IndexedDB nicht verfügbar`,e),ky=null,Hv(`Browser-Speicher nicht verfügbar: Welten können nicht gespeichert werden.`,8e3)}vs?await By(Number(new URLSearchParams(location.search).get(`bench`))||60):(Ky(),await Fy(),Z.value=`menu`)}}async function Fy(){if(!ky){Ey.value=[];return}Ey.value=await ky.listWorlds();let e={};for(let t of Ey.value)e[t.id]=await ky.worldSize(t.id);Dy.value=e;try{let e=await navigator.storage?.estimate?.();e?.quota&&(Oy.value=`Speicher: ${Iy(e.usage??0)} von ${Iy(e.quota)} belegt`)}catch{Oy.value=``}}function Iy(e){return e<1024?`${e} B`:e<1048576?`${(e/1024).toFixed(1)} KB`:e<1073741824?`${(e/1024/1024).toFixed(1)} MB`:`${(e/1024/1024/1024).toFixed(1)} GB`}function Ly(e,t,n){return{id:`mem_${Date.now()}`,name:e,seed:t,seedText:String(t),mode:n,createdAt:Date.now(),lastPlayed:Date.now(),time:1e3,version:1}}async function Ry(e,t,n){let r=xe(t);await zy(ky?await ky.createWorld(e,r,t.trim()||String(r),n):Ly(e,r,n))}async function zy(e){if(!Ay)throw Error(`Kein Spielcontainer`);Q&&await Vy(!1),e.lastPlayed=Date.now(),await ky?.putWorld(e),Q=new qv(Ay,ky,e),Ky();try{await Q.start()}catch(e){console.error(e),kv.value=`Die Welt konnte nicht gestartet werden: ${String(e)}`,Z.value=`error`}}async function By(e){Ay&&(Q=new qv(Ay,null,Ly(`Benchmark`,1111838275,`creative`),{bench:{seconds:e}}),Ky(),await Q.start())}async function Vy(e=!0){let t=Q;Q=null,t&&(Z.value=`loading`,await t.quit()),e&&(await Fy(),Z.value=`worlds`)}async function Hy(e){await ky?.deleteWorld(e),await Fy()}async function Uy(e,t){ky&&t.trim()&&(await ky.putWorld({...e,name:t.trim()}),await Fy())}async function Wy(e){if(!ky)return;let t=await ky.exportWorld(e.id),n=document.createElement(`a`);n.href=URL.createObjectURL(t),n.download=`${e.name.replace(/[^\w\-äöüÄÖÜ ]+/g,`_`)}.bcworld`,document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e4)}async function Gy(e){if(ky){try{Hv(`Welt «${(await ky.importWorld(e)).name}» importiert.`)}catch(e){Hv(`Import fehlgeschlagen: ${String(e)}`)}await Fy()}}function Ky(){if(!_s&&!vs)return;let e=window;e.__bc={get screen(){return Z.value},get ready(){return Z.value===`playing`&&(Q?.spawnMs??0)>0},get spawnMs(){return Q?.spawnMs??0},get bench(){return Q?.benchResult??null},player(){let e=Q?.player.body;return e?{x:e.x,y:e.y,z:e.z,onGround:e.onGround,flying:e.flying}:null},getBlock(e,t,n){return Q?.world.getBlock(e,t,n)??-1},setBlock(e,t,n,r){return Q?.sim.setBlock(e,t,n,r),Q?.world.getBlock(e,t,n)??-1},state(){return Q?.simPlayer.snapshot()??null},give(e,t){if(!Vr(e))throw Error(`Unbekanntes Item ${e}`);return Q?.sim.give(1,{id:e,count:Math.max(1,Math.min(Hr(e),t))})??null},itemId(e){return Br(e)?.id??-1},send(e){Q?.transport.send(e)},window(){return Q?.simPlayer.window?Q.simPlayer.window.win.snapshot():null},items(){return Q?.sim.itemSnapshots()??[]},tick(e=1){for(let t=0;t<e;t++)Q?.sim.tick()},save(){return Q?.save()},teleport(e,t,n,r=!0){let i=Q?.player.body;if(!i||!Q)return;i.setPosition(e,t,n),i.flying=r;let a=Q.simPlayer;a.x=e,a.y=t,a.z=n},look(e,t){Q&&(Q.player.yaw=e,Q.player.pitch=t)},setTime(e){Q&&(Q.sim.time=e)},simulateLock(){Q&&(Q.input.locked=!0,Z.value=`playing`)},light(e,t,n){let r=Q?.world.getLight(e,t,n)??0;return{sky:r>>4,block:r&15}},input(){if(!Q)return null;let e=Q.player.target;return{locked:Q.input.locked,target:e?{x:e.x,y:e.y,z:e.z,id:e.id}:null,held:Q.player.held()?.id??null}},stats(){return Q?{...Q.renderer.stats,meshes:Q.renderer.chunks.count,loaded:Q.world.columns.size,pending:Q.pendingWork}:null},findBlock(e,t=48){let n=Q?.player.body;if(!n)return null;for(let r=5;r<120;r++)for(let i=-t;i<=t;i++)for(let a=-t;a<=t;a++){let t=Math.floor(n.x)+a,o=Math.floor(n.z)+i;if(Q.world.getBlock(t,r,o)===e)return{x:t,y:r,z:o}}return null},quit(){return Vy(!0)},worlds(){return Ey.value.map(e=>({id:e.id,name:e.name}))},play(e){let t=Ey.value.find(t=>t.id===e);return t?zy(t):Promise.reject(Error(`unbekannte Welt`))},create(e,t,n=`creative`){return Ry(e,t,n)}}}var qy=0;Array.isArray;function $(e,n,r,i,a,o){n||={};var s,c,l=n;if(`ref`in l)for(c in l={},n)c==`ref`?s=n[c]:l[c]=n[c];var u={type:e,props:l,key:r,ref:s,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--qy,__i:-1,__u:0,__source:a,__self:o};if(typeof e==`function`&&(s=e.defaultProps))for(c in s)l[c]===void 0&&(l[c]=s[c]);return t.vnode&&t.vnode(u),u}function Jy({stack:e}){let t=Ur(e.id);if(!t||!e.damage)return null;let n=1-e.damage/t;return $(`div`,{class:`durability`,children:$(`div`,{style:{width:`${Math.max(0,n)*100}%`,background:`hsl(${n*120}, 80%, 50%)`}})})}function Yy({stack:e}){if(Bv.value,!e)return null;let t=zr(e.id);return $(C,{children:[$(`img`,{src:fv(e.id),alt:t?.name??``,draggable:!1}),e.count>1&&$(`span`,{class:`count`,children:e.count}),$(Jy,{stack:e})]})}function Xy(e){if(!e)return``;let t=zr(e.id);if(!t)return``;let n=t.name;t.tool&&(n+=` · Stufe ${Er[t.tool.tier]}`),t.armor&&(n+=` · Rüstung +${t.armor.points}`),t.food&&(n+=` · Nahrung +${t.food.hunger}`);let r=Ur(e.id);return r&&(n+=` · ${r-(e.damage??0)}/${r}`),n}var Zy=null,Qy=new Set;function $y({index:e,stack:t,onHover:n,kind:r}){return $(`div`,{class:`slot ${r??``}`,"data-slot":e,onMouseDown:t=>{t.preventDefault();let n=+(t.button===2);Zy=t.button,Qy.clear(),Qy.add(e),jy()?.windowClick(e,n,t.shiftKey)},onMouseEnter:()=>{n(e,t),Zy===2&&!Qy.has(e)&&jv.value?.cursor&&(Qy.add(e),jy()?.windowClick(e,1,!1))},onMouseLeave:()=>n(null,null),onContextMenu:e=>e.preventDefault(),children:$(Yy,{stack:t})})}function eb({from:e,count:t,cols:n,slots:r,onHover:i,kind:a}){return $(`div`,{class:`grid`,style:{gridTemplateColumns:`repeat(${n}, var(--slot))`},children:Array.from({length:t},(t,n)=>$($y,{index:e+n,stack:r[e+n]??null,onHover:i,kind:a},e+n))})}function tb({from:e,slots:t,onHover:n}){return $(`div`,{class:`player-grid`,children:[$(eb,{from:e,count:27,cols:9,slots:t,onHover:n}),$(`div`,{class:`gap`}),$(eb,{from:e+27,count:9,cols:9,slots:t,onHover:n})]})}function nb({progress:e}){return $(`div`,{class:`arrow`,children:$(`div`,{style:{width:`${Math.round((e??1)*100)}%`}})})}function rb(){return $(`div`,{class:`silhouette`,"aria-hidden":`true`,children:[$(`div`,{class:`head`}),$(`div`,{class:`body`}),$(`div`,{class:`legs`})]})}function ib({w:e,onHover:t}){let n=e.slots;switch(e.kind){case`inventory`:return $(C,{children:[$(`div`,{class:`win-top`,children:[$(eb,{from:5,count:4,cols:1,slots:n,onHover:t,kind:`armor-slot`}),$(rb,{}),$(`div`,{class:`craft`,children:[$(`span`,{class:`label`,children:`Herstellen`}),$(`div`,{class:`craft-row`,children:[$(eb,{from:1,count:4,cols:2,slots:n,onHover:t}),$(nb,{}),$($y,{index:0,stack:n[0],onHover:t,kind:`output`})]})]})]}),$(tb,{from:9,slots:n,onHover:t})]});case`crafting`:return $(C,{children:[$(`div`,{class:`win-top center`,children:$(`div`,{class:`craft-row`,children:[$(eb,{from:1,count:9,cols:3,slots:n,onHover:t}),$(nb,{}),$($y,{index:0,stack:n[0],onHover:t,kind:`output big`})]})}),$(tb,{from:10,slots:n,onHover:t})]});case`furnace`:{let r=e.burnMax?(e.burn??0)/e.burnMax:0;return $(C,{children:[$(`div`,{class:`win-top center`,children:$(`div`,{class:`furnace`,children:[$(`div`,{class:`furnace-in`,children:[$($y,{index:0,stack:n[0],onHover:t}),$(`div`,{class:`flame`,children:$(`div`,{style:{height:`${Math.round(r*100)}%`}})}),$($y,{index:1,stack:n[1],onHover:t,kind:`fuel`})]}),$(nb,{progress:(e.cook??0)/200}),$($y,{index:2,stack:n[2],onHover:t,kind:`output big`})]})}),$(tb,{from:3,slots:n,onHover:t})]})}case`chest`:return $(C,{children:[$(eb,{from:0,count:27,cols:9,slots:n,onHover:t}),$(`div`,{class:`gap`}),$(tb,{from:27,slots:n,onHover:t})]})}}var ab={inventory:`Inventar`,crafting:`Werktisch`,furnace:`Schmelze`,chest:`Truhe`};function ob({onHover:e}){let[t,n]=yo(``),r=t.trim().toLowerCase(),i=Wr.filter(e=>!r||(zr(e)?.name.toLowerCase().includes(r)??!1));return $(`div`,{class:`catalog-wrap`,children:[$(`input`,{class:`search`,placeholder:`Suchen …`,value:t,onInput:e=>n(e.target.value),onKeyDown:e=>e.stopPropagation()}),$(`div`,{class:`catalog`,children:i.map(t=>$(`div`,{class:`slot`,onMouseDown:e=>{e.preventDefault();let n=jy(),r=zr(t);n&&r&&(jv.value?.cursor?n.creativePick(0,0):n.creativePick(t,e.button===2?1:r.maxStack))},onMouseEnter:()=>e({id:t,count:1}),onMouseLeave:()=>e(null),onContextMenu:e=>e.preventDefault(),children:$(Yy,{stack:{id:t,count:1}})},t))})]})}function sb(){let e=Mv.value,t=jv.value,[n,r]=yo({index:null,stack:null}),[i,a]=yo({x:-100,y:-100}),o=So(null);if(o.current=n.index,xo(()=>{let e=e=>{let t=jy();if(!t)return;if(e.code===`Escape`){e.preventDefault(),t.closeInventory();return}let n=/^Digit([1-9])$/.exec(e.code);n&&o.current!==null&&t.windowSwap(o.current,Number(n[1])-1)},t=()=>{Zy=null};return document.addEventListener(`keydown`,e),document.addEventListener(`mouseup`,t),()=>{document.removeEventListener(`keydown`,e),document.removeEventListener(`mouseup`,t)}},[]),!e||!t)return null;let s=t.mode===`creative`&&e.kind===`inventory`;return $(`div`,{class:`screen overlay`,onMouseMove:e=>a({x:e.clientX,y:e.clientY}),onMouseDown:e=>{e.target===e.currentTarget&&jy()?.closeInventory()},onContextMenu:e=>e.preventDefault(),children:[$(`div`,{class:`panel window win-${e.kind} ${s?`creative`:``}`,children:[$(`h2`,{children:s?`Kreativ-Inventar`:ab[e.kind]}),s?$(C,{children:[$(ob,{onHover:e=>r({index:null,stack:e})}),$(`p`,{class:`hint`,children:`Klick: Stapel nehmen · Rechtsklick: einzeln · Item auf den Katalog legen löscht es`}),$(tb,{from:9,slots:e.slots,onHover:(e,t)=>r({index:e,stack:t})})]}):$(ib,{w:e,onHover:(e,t)=>r({index:e,stack:t})}),$(`p`,{class:`hint`,children:`Shift-Klick verschiebt · Rechtsklick halbiert · Zahlentasten tauschen mit der Hotbar · Esc oder Inventar-Taste schliesst`})]}),t.cursor&&$(`div`,{class:`cursor-item`,style:{left:`${i.x-22}px`,top:`${i.y-22}px`},children:$(`div`,{class:`slot ghost`,children:$(Yy,{stack:t.cursor})})}),!t.cursor&&n.stack&&$(`div`,{class:`tooltip`,style:{left:`${i.x+16}px`,top:`${i.y+12}px`},children:Xy(n.stack)})]})}function cb(){Bv.value;let e=jv.value,t=Pv.value,n=e?.main.slice(0,9)??Array(9).fill(null),r=n[t];return $(`div`,{class:`hotbar`,children:[n.map((e,n)=>$(`div`,{class:`slot ${n===t?`active`:``}`,onClick:()=>jy()?.selectSlot(n),children:[$(Yy,{stack:e}),$(`span`,{class:`num`,children:n+1})]},n)),r&&$(`div`,{class:`held-name`,children:zr(r.id)?.name},`${t}-${r.id}`)]})}function lb(){return $(`h1`,{class:`logo`,"aria-label":le,children:le.split(``).map((e,t)=>$(`span`,{style:{"--i":t},children:e},t))})}function ub(e){return $(`button`,{class:`btn ${e.kind??``}`,onClick:e.onClick,disabled:e.disabled,title:e.title,children:e.children})}function db(){return $(`div`,{class:`screen menu`,children:[$(lb,{}),$(`p`,{class:`tagline`,children:`Bauen. Graben. Entdecken.`}),$(`div`,{class:`stack`,children:[$(ub,{kind:`primary`,onClick:()=>Z.value=`worlds`,children:`Einzelspieler`}),$(ub,{disabled:!0,title:`Kommt in Phase 3 (Raumcodes über den Render-Server)`,children:[`Mehrspieler `,$(`small`,{children:`(bald)`})]}),$(ub,{onClick:()=>{Ev.value=`menu`,Z.value=`settings`},children:`Einstellungen`})]}),$(`footer`,{class:`footer`,children:[le,` `,ue,` · eigenständiges Projekt`]})]})}function fb(e){return new Date(e).toLocaleString(`de-CH`,{dateStyle:`medium`,timeStyle:`short`})}function pb(){let[e,t]=yo(Ey.value[0]?.id??null),[n,r]=yo(null),[i,a]=yo(null),o=So(null),s=Ey.value,c=s.find(t=>t.id===e)??null;return $(`div`,{class:`screen panel-screen`,children:$(`div`,{class:`panel wide`,children:[$(`h2`,{children:`Welt auswählen`}),$(`div`,{class:`world-list`,role:`listbox`,children:[s.length===0&&$(`p`,{class:`empty`,children:`Noch keine Welten. Erstelle deine erste!`}),s.map(i=>$(`div`,{role:`option`,"aria-selected":i.id===e,class:`world ${i.id===e?`selected`:``}`,onClick:()=>t(i.id),onDblClick:()=>void zy(i),children:[n===i.id?$(`input`,{class:`rename`,autoFocus:!0,defaultValue:i.name,onKeyDown:e=>{e.key===`Enter`?(Uy(i,e.target.value),r(null)):e.key===`Escape`&&r(null)},onBlur:e=>{Uy(i,e.target.value),r(null)}}):$(`div`,{class:`world-name`,children:i.name}),$(`div`,{class:`world-meta`,children:[i.mode===`creative`?`Kreativ`:`Überleben`,` · Seed `,i.seedText,` · `,fb(i.lastPlayed),` ·`,` `,Iy(Dy.value[i.id]??0)]})]},i.id))]}),Oy.value&&$(`p`,{class:`hint`,children:Oy.value}),$(`div`,{class:`row`,children:[$(ub,{kind:`primary`,disabled:!c,onClick:()=>c&&void zy(c),children:`Spielen`}),$(ub,{onClick:()=>Z.value=`create`,children:`Neue Welt`})]}),$(`div`,{class:`row`,children:[$(ub,{disabled:!c,onClick:()=>c&&r(c.id),children:`Umbenennen`}),$(ub,{disabled:!c,onClick:()=>c&&void Wy(c),children:`Exportieren`}),$(ub,{onClick:()=>o.current?.click(),children:`Importieren`}),i&&i===c?.id?$(ub,{kind:`danger`,onClick:()=>{Hy(i),a(null),t(null)},children:`Wirklich löschen?`}):$(ub,{kind:`danger`,disabled:!c,onClick:()=>c&&a(c.id),children:`Löschen`})]}),$(`input`,{ref:o,type:`file`,accept:`.bcworld,application/octet-stream`,hidden:!0,onChange:e=>{let t=e.target.files?.[0];t&&Gy(t),e.target.value=``}}),$(`div`,{class:`row`,children:$(ub,{onClick:()=>Z.value=`menu`,children:`Zurück`})})]})})}function mb(){let[e,t]=yo(`Neue Welt`),[n,r]=yo(hs.VITE_DEFAULT_SEED),[i,a]=yo(`survival`);return $(`div`,{class:`screen panel-screen`,children:$(`form`,{class:`panel`,onSubmit:t=>{t.preventDefault(),Ry(e,n,i)},children:[$(`h2`,{children:`Neue Welt erstellen`}),$(`label`,{children:[`Name der Welt`,$(`input`,{value:e,maxLength:40,onInput:e=>t(e.target.value)})]}),$(`label`,{children:[`Seed (leer = zufällig)`,$(`input`,{value:n,maxLength:64,placeholder:`z. B. Abenteuer`,onInput:e=>r(e.target.value)})]}),$(`fieldset`,{class:`modes`,children:[$(`legend`,{children:`Spielmodus`}),$(`label`,{class:`radio`,children:[$(`input`,{type:`radio`,name:`mode`,checked:i===`survival`,onChange:()=>a(`survival`)}),` Überleben`]}),$(`label`,{class:`radio`,children:[$(`input`,{type:`radio`,name:`mode`,checked:i===`creative`,onChange:()=>a(`creative`)}),` Kreativ`]})]}),$(`div`,{class:`row`,children:[$(`button`,{class:`btn primary`,type:`submit`,children:`Welt erstellen`}),$(ub,{onClick:()=>Z.value=`worlds`,children:`Abbrechen`})]})]})})}function hb(e){return $(`label`,{class:`slider`,children:[$(`span`,{children:[e.label,`: `,$(`b`,{children:e.format?e.format(e.value):e.value})]}),$(`input`,{type:`range`,min:e.min,max:e.max,step:e.step??1,value:e.value,onInput:t=>e.onChange(Number(t.target.value))})]})}function gb(){let e=Cs.value;return $(`div`,{class:`screen panel-screen`,children:$(`div`,{class:`panel`,children:[$(`h2`,{children:`Einstellungen`}),$(hb,{label:`Sichtweite`,value:e.renderDistance,min:2,max:hs.VITE_MAX_RENDER_DISTANCE,format:e=>`${e} Chunks`,onChange:e=>ws({renderDistance:e})}),$(hb,{label:`Sichtfeld (FOV)`,value:e.fov,min:50,max:110,format:e=>`${e}°`,onChange:e=>ws({fov:e})}),$(hb,{label:`Maus-Empfindlichkeit`,value:e.sensitivity,min:10,max:300,step:5,format:e=>`${e} %`,onChange:e=>ws({sensitivity:e})}),$(hb,{label:`Auflösung`,value:Math.round(e.renderScale*100),min:50,max:100,step:5,format:e=>`${e} %`,onChange:e=>ws({renderScale:e/100})}),$(hb,{label:`Lautstärke gesamt`,value:e.volumeMaster,min:0,max:100,step:5,format:e=>`${e} %`,onChange:e=>ws({volumeMaster:e})}),$(hb,{label:`Effekte`,value:e.volumeEffects,min:0,max:100,step:5,format:e=>`${e} %`,onChange:e=>ws({volumeEffects:e})}),$(hb,{label:`Musik`,value:e.volumeMusic,min:0,max:100,step:5,format:e=>`${e} %`,onChange:e=>ws({volumeMusic:e})}),$(`fieldset`,{class:`modes`,children:[$(`legend`,{children:`Texturstil`}),[[1,`Fein`],[2,`Pixelig`],[4,`Sehr pixelig`]].map(([t,n])=>$(`label`,{class:`radio`,children:[$(`input`,{type:`radio`,name:`texstyle`,checked:e.textureStyle===t,onChange:()=>ws({textureStyle:t})}),` `,n]},t))]}),$(`label`,{class:`check`,children:[$(`input`,{type:`checkbox`,checked:e.invertY,onChange:e=>ws({invertY:e.target.checked})}),`Maus-Y-Achse umkehren`]}),$(`label`,{class:`check`,children:[$(`input`,{type:`checkbox`,checked:e.showFps,onChange:e=>{let t=e.target.checked;ws({showFps:t}),Rv.value=t}}),`Debug-Anzeige (F3) beim Start einblenden`]}),$(`p`,{class:`hint`,children:`Maus: Linksklick abbauen (halten) · Rechtsklick platzieren, benutzen oder essen (halten) · Mittelklick Block wählen · 1–9/Mausrad Hotbar · Esc Pause`}),$(`div`,{class:`row`,children:[$(ub,{onClick:()=>Z.value=`keys`,children:`Tastenbelegung …`}),$(ub,{onClick:()=>ws({...xs}),children:`Zurücksetzen`}),$(ub,{kind:`primary`,onClick:()=>Z.value=Ev.value,children:`Fertig`})]})]})})}function _b(){return $(`div`,{class:`screen loading`,children:[$(lb,{}),$(`div`,{class:`progress`,role:`progressbar`,"aria-valuenow":Math.round(Ov.value*100),children:$(`div`,{style:{width:`${Math.round(Ov.value*100)}%`}})}),$(`p`,{children:Dv.value})]})}function vb(){let e=zv.value;return e?$(`div`,{class:`debug`,children:[$(`div`,{children:[le,` `,ue,` · `,e.fps,` FPS (`,e.frameMs,` ms)`]}),$(`div`,{children:[`XYZ: `,e.x.toFixed(2),` / `,e.y.toFixed(2),` / `,e.z.toFixed(2)]}),$(`div`,{children:[`Chunk: `,e.chunkX,` `,e.chunkZ,` · Blick: `,e.facing]}),$(`div`,{children:[`Biom: `,e.biome,` · Licht: `,e.light,` · Uhrzeit `,e.time]}),$(`div`,{children:[`Ziel: `,e.target]}),$(`div`,{children:[`Chunks geladen: `,e.loaded,` · Meshes: `,e.meshes,` · offen: `,e.pending]}),$(`div`,{children:[`Draw Calls: `,e.calls,` · Dreiecke: `,(e.triangles/1e3).toFixed(0),`k`]}),$(`div`,{children:[`Worker: `,e.workers,` · Gen `,e.genMs,` ms · Mesh `,e.meshMs,` ms `,e.flying?`· fliegt`:``]})]}):$(`div`,{class:`debug`,children:`…`})}function yb(){let e=jv.value;if(!e||e.mode===`creative`)return null;let t=(e,t,n,r,i=!1)=>{let a=Array.from({length:10},(i,a)=>{let o=e-a*2;return $(`img`,{src:hv(o>=2?t:o>=1&&n?n:o>=1?t:r),alt:``},a)});return $(`div`,{class:`stat-row ${i?`reverse`:``}`,children:i?a.reverse():a})},n=Math.ceil(Math.max(0,e.air)/300*10);return $(`div`,{class:`stats`,children:[$(`div`,{class:`stats-left`,children:[e.armorPoints>0&&t(e.armorPoints,`armor`,null,`armorEmpty`),t(Math.ceil(e.health),`heart`,`heartHalf`,`heartEmpty`)]}),$(`div`,{class:`stats-right`,children:[e.air<300&&$(`div`,{class:`stat-row reverse`,children:Array.from({length:n},(e,t)=>$(`img`,{src:hv(`bubble`),alt:``},t))}),t(e.hunger,`food`,null,`foodEmpty`,!0)]})]})}function bb(){let e=Z.value===`playing`,t=jv.value;return $(`div`,{class:`hud`,children:[Lv.value&&$(`div`,{class:`underwater`}),e&&$(`div`,{class:`crosshair`}),e&&Fv.value>0&&$(`div`,{class:`eat-bar`,children:$(`div`,{style:{width:`${Math.round(Fv.value*100)}%`}})}),t&&t.health<6&&t.mode===`survival`&&$(`div`,{class:`low-health`}),$(yb,{}),$(cb,{}),Rv.value&&$(vb,{}),e&&!Iv.value&&!vs&&$(`div`,{class:`click-to-play`,onClick:()=>void jy()?.lock(),children:`Klicken zum Spielen`})]})}function xb(){return $(`div`,{class:`screen overlay`,children:$(`div`,{class:`panel`,children:[$(`h2`,{children:`Pause`}),$(`div`,{class:`stack`,children:[$(ub,{kind:`primary`,onClick:()=>jy()?.resume(),children:`Weiterspielen`}),$(ub,{onClick:()=>{Ev.value=`paused`,Z.value=`settings`},children:`Einstellungen`}),$(ub,{onClick:()=>{let e=jy();e&&e.setMode(e.mode===`creative`?`survival`:`creative`)},children:[`Spielmodus: `,jv.value?.mode===`creative`?`Kreativ`:`Überleben`]}),$(ub,{onClick:()=>void Vy(!0),children:`Speichern & zum Menü`})]})]})})}function Sb(){return $(`div`,{class:`screen overlay death`,children:$(`div`,{class:`panel`,children:[$(`h2`,{children:`Du bist gestorben`}),$(`p`,{children:Nv.value}),$(`p`,{class:`hint`,children:`Deine Items liegen dort, wo du gestorben bist.`}),$(`div`,{class:`stack`,children:[$(ub,{kind:`primary`,onClick:()=>jy()?.respawn(),children:`Wiederbeleben`}),$(ub,{onClick:()=>void Vy(!0),children:`Zum Hauptmenü`})]})]})})}function Cb(){let[e,t]=yo(null),n=Ms.value,r=Fs(n);return xo(()=>{if(!e)return;let n=n=>{n.preventDefault(),n.stopPropagation(),n.code===`Escape`?Ns(e.action,e.slot,null):Ns(e.action,e.slot,n.code),t(null)};return document.addEventListener(`keydown`,n,!0),()=>document.removeEventListener(`keydown`,n,!0)},[e]),$(`div`,{class:`screen panel-screen`,children:$(`div`,{class:`panel wide`,children:[$(`h2`,{children:`Tastenbelegung`}),$(`div`,{class:`keys`,children:Object.keys(ks).map(i=>$(`div`,{class:`key-row`,children:[$(`span`,{children:ks[i]}),[0,1].map(a=>{let o=n[i][a],s=e?.action===i&&e.slot===a;return $(`button`,{class:`btn key ${o&&r.has(o)?`conflict`:``}`,onClick:()=>t({action:i,slot:a}),children:s?`Taste drücken …`:o?Is(o):`–`},a)})]},i))}),$(`p`,{class:`hint`,children:`Klicke ein Feld und drücke die neue Taste. Esc entfernt die Belegung. Rot = doppelt belegt.`}),$(`div`,{class:`row`,children:[$(ub,{onClick:()=>Ps(),children:`Standard wiederherstellen`}),$(ub,{kind:`primary`,onClick:()=>Z.value=`settings`,children:`Fertig`})]})]})})}function wb(){return $(`div`,{class:`screen panel-screen`,children:$(`div`,{class:`panel`,children:[$(`h2`,{children:`Hoppla`}),$(`p`,{children:kv.value}),$(ub,{onClick:()=>location.reload(),children:`Neu laden`})]})})}function Tb(){return Av.value?$(`div`,{class:`notice`,children:Av.value}):null}function Eb(){let e=So(null);xo(()=>{e.current&&My(e.current)},[]);let t=Z.value,n=t===`playing`||t===`paused`||t===`inventory`||t===`dead`||(t===`settings`||t===`keys`)&&Ev.value===`paused`;return $(`div`,{class:`app ${n?`in-game`:``}`,children:[$(`div`,{ref:e,class:`game-container`}),!n&&t!==`loading`&&$(`div`,{class:`backdrop`}),n&&t!==`settings`&&t!==`keys`&&$(bb,{}),t===`boot`&&$(`div`,{class:`screen loading`,children:$(lb,{})}),t===`menu`&&$(db,{}),t===`worlds`&&$(pb,{}),t===`create`&&$(mb,{}),t===`settings`&&$(gb,{}),t===`loading`&&$(_b,{}),t===`paused`&&$(xb,{}),t===`inventory`&&$(sb,{}),t===`dead`&&$(Sb,{}),t===`keys`&&$(Cb,{}),t===`error`&&$(wb,{}),$(Tb,{})]})}var Db=Number(new URLSearchParams(location.search).get(`pixel`)),Ob=Gi.includes(Db)?Db:null;Ki(Ob??Cs.value.textureStyle),Cs.subscribe(e=>{let t=Ob??e.textureStyle;t!==qi()&&(Ki(t),lv(),jy()?.renderer.reloadTextures(),Bv.value++)}),ce($(Eb,{}),document.getElementById(`app`)),requestAnimationFrame(()=>void Py()),`serviceWorker`in navigator&&!new URLSearchParams(location.search).has(`nosw`)&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`./sw.js`).catch(()=>{})});