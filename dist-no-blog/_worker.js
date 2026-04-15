var Lc=Object.defineProperty;var ci=t=>{throw TypeError(t)};var jc=(t,r,n)=>r in t?Lc(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n;var B=(t,r,n)=>jc(t,typeof r!="symbol"?r+"":r,n),ra=(t,r,n)=>r.has(t)||ci("Cannot "+n);var k=(t,r,n)=>(ra(t,r,"read from private field"),n?n.call(t):r.get(t)),$=(t,r,n)=>r.has(t)?ci("Cannot add the same private member more than once"):r instanceof WeakSet?r.add(t):r.set(t,n),D=(t,r,n,a)=>(ra(t,r,"write to private field"),a?a.call(t,n):r.set(t,n),n),W=(t,r,n)=>(ra(t,r,"access private method"),n);var di=(t,r,n,a)=>({set _(s){D(t,r,s,n)},get _(){return k(t,r,a)}});var pl={Stringify:1},Pe=(t,r)=>{const n=new String(t);return n.isEscaped=!0,n.callbacks=r,n},Fc=/[&<>'"]/,ml=async(t,r)=>{let n="";r||(r=[]);const a=await Promise.all(t);for(let s=a.length-1;n+=a[s],s--,!(s<0);s--){let i=a[s];typeof i=="object"&&r.push(...i.callbacks||[]);const o=i.isEscaped;if(i=await(typeof i=="object"?i.toString():i),typeof i=="object"&&r.push(...i.callbacks||[]),i.isEscaped??o)n+=i;else{const l=[n];ct(i,l),n=l[0]}}return Pe(n,r)},ct=(t,r)=>{const n=t.search(Fc);if(n===-1){r[0]+=t;return}let a,s,i=0;for(s=n;s<t.length;s++){switch(t.charCodeAt(s)){case 34:a="&quot;";break;case 39:a="&#39;";break;case 38:a="&amp;";break;case 60:a="&lt;";break;case 62:a="&gt;";break;default:continue}r[0]+=t.substring(i,s)+a,i=s+1}r[0]+=t.substring(i,s)},gl=t=>{const r=t.callbacks;if(!(r!=null&&r.length))return t;const n=[t],a={};return r.forEach(s=>s({phase:pl.Stringify,buffer:n,context:a})),n[0]},fl=async(t,r,n,a,s)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const i=t.callbacks;return i!=null&&i.length?(s?s[0]+=t:s=[t],Promise.all(i.map(l=>l({phase:r,buffer:s,context:a}))).then(l=>Promise.all(l.filter(Boolean).map(c=>fl(c,r,!1,a,s))).then(()=>s[0]))):Promise.resolve(t)},$c=(t,...r)=>{const n=[""];for(let a=0,s=t.length-1;a<s;a++){n[0]+=t[a];const i=Array.isArray(r[a])?r[a].flat(1/0):[r[a]];for(let o=0,l=i.length;o<l;o++){const c=i[o];if(typeof c=="string")ct(c,n);else if(typeof c=="number")n[0]+=c;else{if(typeof c=="boolean"||c===null||c===void 0)continue;if(typeof c=="object"&&c.isEscaped)if(c.callbacks)n.unshift("",c);else{const u=c.toString();u instanceof Promise?n.unshift("",u):n[0]+=u}else c instanceof Promise?n.unshift("",c):ct(c.toString(),n)}}}return n[0]+=t.at(-1),n.length===1?"callbacks"in n?Pe(gl(Pe(n[0],n.callbacks))):Pe(n[0]):ml(n,n.callbacks)},Os=Symbol("RENDERER"),ws=Symbol("ERROR_HANDLER"),ee=Symbol("STASH"),yl=Symbol("INTERNAL"),zc=Symbol("MEMO"),Rn=Symbol("PERMALINK"),ui=t=>(t[yl]=!0,t),bl=t=>({value:r,children:n})=>{if(!n)return;const a={children:[{tag:ui(()=>{t.push(r)}),props:{}}]};Array.isArray(n)?a.children.push(...n.flat()):a.children.push(n),a.children.push({tag:ui(()=>{t.pop()}),props:{}});const s={tag:"",props:a,type:""};return s[ws]=i=>{throw t.pop(),i},s},xl=t=>{const r=[t],n=bl(r);return n.values=r,n.Provider=n,tr.push(n),n},tr=[],Ms=t=>{const r=[t],n=(a=>{r.push(a.value);let s;try{s=a.children?(Array.isArray(a.children)?new Tl("",{},a.children):a.children).toString():""}finally{r.pop()}return s instanceof Promise?s.then(i=>Pe(i,i.callbacks)):Pe(s)});return n.values=r,n.Provider=n,n[Os]=bl(r),tr.push(n),n},nr=t=>t.values.at(-1),kn={title:[],script:["src"],style:["data-href"],link:["href"],meta:["name","httpEquiv","charset","itemProp"]},Es={},Pn="data-precedence",Wr=t=>Array.isArray(t)?t:[t],hi=new WeakMap,pi=(t,r,n,a)=>({buffer:s,context:i})=>{if(!s)return;const o=hi.get(i)||{};hi.set(i,o);const l=o[t]||(o[t]=[]);let c=!1;const u=kn[t];if(u.length>0){e:for(const[,d]of l)for(const h of u)if(((d==null?void 0:d[h])??null)===(n==null?void 0:n[h])){c=!0;break e}}if(c?s[0]=s[0].replaceAll(r,""):u.length>0?l.push([r,n,a]):l.unshift([r,n,a]),s[0].indexOf("</head>")!==-1){let d;if(a===void 0)d=l.map(([h])=>h);else{const h=[];d=l.map(([g,,b])=>{let m=h.indexOf(b);return m===-1&&(h.push(b),m=h.length-1),[g,m]}).sort((g,b)=>g[1]-b[1]).map(([g])=>g)}d.forEach(h=>{s[0]=s[0].replaceAll(h,"")}),s[0]=s[0].replace(/(?=<\/head>)/,d.join(""))}},Hr=(t,r,n)=>Pe(new Me(t,n,Wr(r??[])).toString()),Gr=(t,r,n,a)=>{if("itemProp"in n)return Hr(t,r,n);let{precedence:s,blocking:i,...o}=n;s=a?s??"":void 0,a&&(o[Pn]=s);const l=new Me(t,o,Wr(r||[])).toString();return l instanceof Promise?l.then(c=>Pe(l,[...c.callbacks||[],pi(t,c,o,s)])):Pe(l,[pi(t,l,o,s)])},Uc=({children:t,...r})=>{const n=Rs();if(n){const a=nr(n);if(a==="svg"||a==="head")return new Me("title",r,Wr(t??[]))}return Gr("title",t,r,!1)},qc=({children:t,...r})=>{const n=Rs();return["src","async"].some(a=>!r[a])||n&&nr(n)==="head"?Hr("script",t,r):Gr("script",t,r,!1)},Wc=({children:t,...r})=>["href","precedence"].every(n=>n in r)?(r["data-href"]=r.href,delete r.href,Gr("style",t,r,!0)):Hr("style",t,r),Hc=({children:t,...r})=>["onLoad","onError"].some(n=>n in r)||r.rel==="stylesheet"&&(!("precedence"in r)||"disabled"in r)?Hr("link",t,r):Gr("link",t,r,"precedence"in r),Gc=({children:t,...r})=>{const n=Rs();return n&&nr(n)==="head"?Hr("meta",t,r):Gr("meta",t,r,!1)},vl=(t,{children:r,...n})=>new Me(t,n,Wr(r??[])),Yc=t=>(typeof t.action=="function"&&(t.action=Rn in t.action?t.action[Rn]:void 0),vl("form",t)),wl=(t,r)=>(typeof r.formAction=="function"&&(r.formAction=Rn in r.formAction?r.formAction[Rn]:void 0),vl(t,r)),Vc=t=>wl("input",t),Kc=t=>wl("button",t);const na=Object.freeze(Object.defineProperty({__proto__:null,button:Kc,form:Yc,input:Vc,link:Hc,meta:Gc,script:qc,style:Wc,title:Uc},Symbol.toStringTag,{value:"Module"}));var Jc=new Map([["className","class"],["htmlFor","for"],["crossOrigin","crossorigin"],["httpEquiv","http-equiv"],["itemProp","itemprop"],["fetchPriority","fetchpriority"],["noModule","nomodule"],["formAction","formaction"]]),Nn=t=>Jc.get(t)||t,El=(t,r)=>{for(const[n,a]of Object.entries(t)){const s=n[0]==="-"||!/[A-Z]/.test(n)?n:n.replace(/[A-Z]/g,i=>`-${i.toLowerCase()}`);r(s,a==null?null:typeof a=="number"?s.match(/^(?:a|border-im|column(?:-c|s)|flex(?:$|-[^b])|grid-(?:ar|[^a])|font-w|li|or|sca|st|ta|wido|z)|ty$/)?`${a}`:`${a}px`:a)}},Br=void 0,Rs=()=>Br,Xc=t=>/[A-Z]/.test(t)&&t.match(/^(?:al|basel|clip(?:Path|Rule)$|co|do|fill|fl|fo|gl|let|lig|i|marker[EMS]|o|pai|pointe|sh|st[or]|text[^L]|tr|u|ve|w)/)?t.replace(/([A-Z])/g,"-$1").toLowerCase():t,Qc=["area","base","br","col","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],Zc=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","defer","disabled","download","formnovalidate","hidden","inert","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"],Ns=(t,r)=>{for(let n=0,a=t.length;n<a;n++){const s=t[n];if(typeof s=="string")ct(s,r);else{if(typeof s=="boolean"||s===null||s===void 0)continue;s instanceof Me?s.toStringToBuffer(r):typeof s=="number"||s.isEscaped?r[0]+=s:s instanceof Promise?r.unshift("",s):Ns(s,r)}}},Me=class{constructor(t,r,n){B(this,"tag");B(this,"props");B(this,"key");B(this,"children");B(this,"isEscaped",!0);B(this,"localContexts");this.tag=t,this.props=r,this.children=n}get type(){return this.tag}get ref(){return this.props.ref||null}toString(){var r,n;const t=[""];(r=this.localContexts)==null||r.forEach(([a,s])=>{a.values.push(s)});try{this.toStringToBuffer(t)}finally{(n=this.localContexts)==null||n.forEach(([a])=>{a.values.pop()})}return t.length===1?"callbacks"in t?gl(Pe(t[0],t.callbacks)).toString():t[0]:ml(t,t.callbacks)}toStringToBuffer(t){const r=this.tag,n=this.props;let{children:a}=this;t[0]+=`<${r}`;const s=Br&&nr(Br)==="svg"?i=>Xc(Nn(i)):i=>Nn(i);for(let[i,o]of Object.entries(n))if(i=s(i),i!=="children"){if(i==="style"&&typeof o=="object"){let l="";El(o,(c,u)=>{u!=null&&(l+=`${l?";":""}${c}:${u}`)}),t[0]+=' style="',ct(l,t),t[0]+='"'}else if(typeof o=="string")t[0]+=` ${i}="`,ct(o,t),t[0]+='"';else if(o!=null)if(typeof o=="number"||o.isEscaped)t[0]+=` ${i}="${o}"`;else if(typeof o=="boolean"&&Zc.includes(i))o&&(t[0]+=` ${i}=""`);else if(i==="dangerouslySetInnerHTML"){if(a.length>0)throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");a=[Pe(o.__html)]}else if(o instanceof Promise)t[0]+=` ${i}="`,t.unshift('"',o);else if(typeof o=="function"){if(!i.startsWith("on")&&i!=="ref")throw new Error(`Invalid prop '${i}' of type 'function' supplied to '${r}'.`)}else t[0]+=` ${i}="`,ct(o.toString(),t),t[0]+='"'}if(Qc.includes(r)&&a.length===0){t[0]+="/>";return}t[0]+=">",Ns(a,t),t[0]+=`</${r}>`}},aa=class extends Me{toStringToBuffer(t){const{children:r}=this,n={...this.props};r.length&&(n.children=r.length===1?r[0]:r);const a=this.tag.call(null,n);if(!(typeof a=="boolean"||a==null))if(a instanceof Promise)if(tr.length===0)t.unshift("",a);else{const s=tr.map(i=>[i,i.values.at(-1)]);t.unshift("",a.then(i=>(i instanceof Me&&(i.localContexts=s),i)))}else a instanceof Me?a.toStringToBuffer(t):typeof a=="number"||a.isEscaped?(t[0]+=a,a.callbacks&&(t.callbacks||(t.callbacks=[]),t.callbacks.push(...a.callbacks))):ct(a,t)}},Tl=class extends Me{toStringToBuffer(t){Ns(this.children,t)}},mi=(t,r,...n)=>{r??(r={}),n.length&&(r.children=n.length===1?n[0]:n);const a=r.key;delete r.key;const s=_n(t,r,n);return s.key=a,s},gi=!1,_n=(t,r,n)=>{if(!gi){for(const a in Es)na[a][Os]=Es[a];gi=!0}return typeof t=="function"?new aa(t,r,n):na[t]?new aa(na[t],r,n):t==="svg"||t==="head"?(Br||(Br=Ms("")),new Me(t,r,[new aa(Br,{value:t},n)])):new Me(t,r,n)},ed=({children:t})=>new Tl("",{children:t},Array.isArray(t)?t:t?[t]:[]);function e(t,r,n){let a;if(!r||!("children"in r))a=_n(t,r,[]);else{const s=r.children;a=Array.isArray(s)?_n(t,r,s):_n(t,r,[s])}return a.key=n,a}var fi=(t,r,n)=>(a,s)=>{let i=-1;return o(0);async function o(l){if(l<=i)throw new Error("next() called multiple times");i=l;let c,u=!1,d;if(t[l]?(d=t[l][0][0],a.req.routeIndex=l):d=l===t.length&&s||void 0,d)try{c=await d(a,()=>o(l+1))}catch(h){if(h instanceof Error&&r)a.error=h,c=await r(h,a),u=!0;else throw h}else a.finalized===!1&&n&&(c=await n(a));return c&&(a.finalized===!1||u)&&(a.res=c),a}},td=Symbol(),rd=async(t,r=Object.create(null))=>{const{all:n=!1,dot:a=!1}=r,i=(t instanceof Cl?t.raw.headers:t.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?nd(t,{all:n,dot:a}):{}};async function nd(t,r){const n=await t.formData();return n?ad(n,r):{}}function ad(t,r){const n=Object.create(null);return t.forEach((a,s)=>{r.all||s.endsWith("[]")?sd(n,s,a):n[s]=a}),r.dot&&Object.entries(n).forEach(([a,s])=>{a.includes(".")&&(id(n,a,s),delete n[a])}),n}var sd=(t,r,n)=>{t[r]!==void 0?Array.isArray(t[r])?t[r].push(n):t[r]=[t[r],n]:r.endsWith("[]")?t[r]=[n]:t[r]=n},id=(t,r,n)=>{let a=t;const s=r.split(".");s.forEach((i,o)=>{o===s.length-1?a[i]=n:((!a[i]||typeof a[i]!="object"||Array.isArray(a[i])||a[i]instanceof File)&&(a[i]=Object.create(null)),a=a[i])})},Sl=t=>{const r=t.split("/");return r[0]===""&&r.shift(),r},od=t=>{const{groups:r,path:n}=ld(t),a=Sl(n);return cd(a,r)},ld=t=>{const r=[];return t=t.replace(/\{[^}]+\}/g,(n,a)=>{const s=`@${a}`;return r.push([s,n]),s}),{groups:r,path:t}},cd=(t,r)=>{for(let n=r.length-1;n>=0;n--){const[a]=r[n];for(let s=t.length-1;s>=0;s--)if(t[s].includes(a)){t[s]=t[s].replace(a,r[n][1]);break}}return t},Xr={},dd=(t,r)=>{if(t==="*")return"*";const n=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){const a=`${t}#${r}`;return Xr[a]||(n[2]?Xr[a]=r&&r[0]!==":"&&r[0]!=="*"?[a,n[1],new RegExp(`^${n[2]}(?=/${r})`)]:[t,n[1],new RegExp(`^${n[2]}$`)]:Xr[a]=[t,n[1],!0]),Xr[a]}return null},Bs=(t,r)=>{try{return r(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,n=>{try{return r(n)}catch{return n}})}},ud=t=>Bs(t,decodeURI),kl=t=>{const r=t.url,n=r.indexOf("/",r.indexOf(":")+4);let a=n;for(;a<r.length;a++){const s=r.charCodeAt(a);if(s===37){const i=r.indexOf("?",a),o=r.slice(n,i===-1?void 0:i);return ud(o.includes("%25")?o.replace(/%25/g,"%2525"):o)}else if(s===63)break}return r.slice(n,a)},hd=t=>{const r=kl(t);return r.length>1&&r.at(-1)==="/"?r.slice(0,-1):r},Ht=(t,r,...n)=>(n.length&&(r=Ht(r,...n)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${r==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(r==null?void 0:r[0])==="/"?r.slice(1):r}`}`),Pl=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const r=t.split("/"),n=[];let a="";return r.forEach(s=>{if(s!==""&&!/\:/.test(s))a+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){n.length===0&&a===""?n.push("/"):n.push(a);const i=s.replace("?","");a+="/"+i,n.push(a)}else a+="/"+s}),n.filter((s,i,o)=>o.indexOf(s)===i)},sa=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?Bs(t,Al):t):t,_l=(t,r,n)=>{let a;if(!n&&r&&!/[%+]/.test(r)){let o=t.indexOf("?",8);if(o===-1)return;for(t.startsWith(r,o+1)||(o=t.indexOf(`&${r}`,o+1));o!==-1;){const l=t.charCodeAt(o+r.length+1);if(l===61){const c=o+r.length+2,u=t.indexOf("&",c);return sa(t.slice(c,u===-1?void 0:u))}else if(l==38||isNaN(l))return"";o=t.indexOf(`&${r}`,o+1)}if(a=/[%+]/.test(t),!a)return}const s={};a??(a=/[%+]/.test(t));let i=t.indexOf("?",8);for(;i!==-1;){const o=t.indexOf("&",i+1);let l=t.indexOf("=",i);l>o&&o!==-1&&(l=-1);let c=t.slice(i+1,l===-1?o===-1?void 0:o:l);if(a&&(c=sa(c)),i=o,c==="")continue;let u;l===-1?u="":(u=t.slice(l+1,o===-1?void 0:o),a&&(u=sa(u))),n?(s[c]&&Array.isArray(s[c])||(s[c]=[]),s[c].push(u)):s[c]??(s[c]=u)}return r?s[r]:s},pd=_l,md=(t,r)=>_l(t,r,!0),Al=decodeURIComponent,yi=t=>Bs(t,Al),Vt,Se,qe,Il,Ol,Ts,nt,ol,Cl=(ol=class{constructor(t,r="/",n=[[]]){$(this,qe);B(this,"raw");$(this,Vt);$(this,Se);B(this,"routeIndex",0);B(this,"path");B(this,"bodyCache",{});$(this,nt,t=>{const{bodyCache:r,raw:n}=this,a=r[t];if(a)return a;const s=Object.keys(r)[0];return s?r[s].then(i=>(s==="json"&&(i=JSON.stringify(i)),new Response(i)[t]())):r[t]=n[t]()});this.raw=t,this.path=r,D(this,Se,n),D(this,Vt,{})}param(t){return t?W(this,qe,Il).call(this,t):W(this,qe,Ol).call(this)}query(t){return pd(this.url,t)}queries(t){return md(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const r={};return this.raw.headers.forEach((n,a)=>{r[a]=n}),r}async parseBody(t){var r;return(r=this.bodyCache).parsedBody??(r.parsedBody=await rd(this,t))}json(){return k(this,nt).call(this,"text").then(t=>JSON.parse(t))}text(){return k(this,nt).call(this,"text")}arrayBuffer(){return k(this,nt).call(this,"arrayBuffer")}blob(){return k(this,nt).call(this,"blob")}formData(){return k(this,nt).call(this,"formData")}addValidatedData(t,r){k(this,Vt)[t]=r}valid(t){return k(this,Vt)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[td](){return k(this,Se)}get matchedRoutes(){return k(this,Se)[0].map(([[,t]])=>t)}get routePath(){return k(this,Se)[0].map(([[,t]])=>t)[this.routeIndex].path}},Vt=new WeakMap,Se=new WeakMap,qe=new WeakSet,Il=function(t){const r=k(this,Se)[0][this.routeIndex][1][t],n=W(this,qe,Ts).call(this,r);return n&&/\%/.test(n)?yi(n):n},Ol=function(){const t={},r=Object.keys(k(this,Se)[0][this.routeIndex][1]);for(const n of r){const a=W(this,qe,Ts).call(this,k(this,Se)[0][this.routeIndex][1][n]);a!==void 0&&(t[n]=/\%/.test(a)?yi(a):a)}return t},Ts=function(t){return k(this,Se)[1]?k(this,Se)[1][t]:t},nt=new WeakMap,ol),gd="text/plain; charset=UTF-8",ia=(t,r)=>({"Content-Type":t,...r}),jr,Fr,Fe,Kt,$e,fe,$r,Jt,Xt,vt,zr,Ur,at,Gt,ll,fd=(ll=class{constructor(t,r){$(this,at);$(this,jr);$(this,Fr);B(this,"env",{});$(this,Fe);B(this,"finalized",!1);B(this,"error");$(this,Kt);$(this,$e);$(this,fe);$(this,$r);$(this,Jt);$(this,Xt);$(this,vt);$(this,zr);$(this,Ur);B(this,"render",(...t)=>(k(this,Jt)??D(this,Jt,r=>this.html(r)),k(this,Jt).call(this,...t)));B(this,"setLayout",t=>D(this,$r,t));B(this,"getLayout",()=>k(this,$r));B(this,"setRenderer",t=>{D(this,Jt,t)});B(this,"header",(t,r,n)=>{this.finalized&&D(this,fe,new Response(k(this,fe).body,k(this,fe)));const a=k(this,fe)?k(this,fe).headers:k(this,vt)??D(this,vt,new Headers);r===void 0?a.delete(t):n!=null&&n.append?a.append(t,r):a.set(t,r)});B(this,"status",t=>{D(this,Kt,t)});B(this,"set",(t,r)=>{k(this,Fe)??D(this,Fe,new Map),k(this,Fe).set(t,r)});B(this,"get",t=>k(this,Fe)?k(this,Fe).get(t):void 0);B(this,"newResponse",(...t)=>W(this,at,Gt).call(this,...t));B(this,"body",(t,r,n)=>W(this,at,Gt).call(this,t,r,n));B(this,"text",(t,r,n)=>!k(this,vt)&&!k(this,Kt)&&!r&&!n&&!this.finalized?new Response(t):W(this,at,Gt).call(this,t,r,ia(gd,n)));B(this,"json",(t,r,n)=>W(this,at,Gt).call(this,JSON.stringify(t),r,ia("application/json",n)));B(this,"html",(t,r,n)=>{const a=s=>W(this,at,Gt).call(this,s,r,ia("text/html; charset=UTF-8",n));return typeof t=="object"?fl(t,pl.Stringify,!1,{}).then(a):a(t)});B(this,"redirect",(t,r)=>{const n=String(t);return this.header("Location",/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,r??302)});B(this,"notFound",()=>(k(this,Xt)??D(this,Xt,()=>new Response),k(this,Xt).call(this,this)));D(this,jr,t),r&&(D(this,$e,r.executionCtx),this.env=r.env,D(this,Xt,r.notFoundHandler),D(this,Ur,r.path),D(this,zr,r.matchResult))}get req(){return k(this,Fr)??D(this,Fr,new Cl(k(this,jr),k(this,Ur),k(this,zr))),k(this,Fr)}get event(){if(k(this,$e)&&"respondWith"in k(this,$e))return k(this,$e);throw Error("This context has no FetchEvent")}get executionCtx(){if(k(this,$e))return k(this,$e);throw Error("This context has no ExecutionContext")}get res(){return k(this,fe)||D(this,fe,new Response(null,{headers:k(this,vt)??D(this,vt,new Headers)}))}set res(t){if(k(this,fe)&&t){t=new Response(t.body,t);for(const[r,n]of k(this,fe).headers.entries())if(r!=="content-type")if(r==="set-cookie"){const a=k(this,fe).headers.getSetCookie();t.headers.delete("set-cookie");for(const s of a)t.headers.append("set-cookie",s)}else t.headers.set(r,n)}D(this,fe,t),this.finalized=!0}get var(){return k(this,Fe)?Object.fromEntries(k(this,Fe)):{}}},jr=new WeakMap,Fr=new WeakMap,Fe=new WeakMap,Kt=new WeakMap,$e=new WeakMap,fe=new WeakMap,$r=new WeakMap,Jt=new WeakMap,Xt=new WeakMap,vt=new WeakMap,zr=new WeakMap,Ur=new WeakMap,at=new WeakSet,Gt=function(t,r,n){const a=k(this,fe)?new Headers(k(this,fe).headers):k(this,vt)??new Headers;if(typeof r=="object"&&"headers"in r){const i=r.headers instanceof Headers?r.headers:new Headers(r.headers);for(const[o,l]of i)o.toLowerCase()==="set-cookie"?a.append(o,l):a.set(o,l)}if(n)for(const[i,o]of Object.entries(n))if(typeof o=="string")a.set(i,o);else{a.delete(i);for(const l of o)a.append(i,l)}const s=typeof r=="number"?r:(r==null?void 0:r.status)??k(this,Kt);return new Response(t,{status:s,headers:a})},ll),ae="ALL",yd="all",bd=["get","post","put","delete","options","patch"],Ml="Can not add a route since the matcher is already built.",Rl=class extends Error{},xd="__COMPOSED_HANDLER",vd=t=>t.text("404 Not Found",404),bi=(t,r)=>{if("getResponse"in t){const n=t.getResponse();return r.newResponse(n.body,n)}return console.error(t),r.text("Internal Server Error",500)},Ce,se,Nl,Ie,yt,An,Cn,Qt,wd=(Qt=class{constructor(r={}){$(this,se);B(this,"get");B(this,"post");B(this,"put");B(this,"delete");B(this,"options");B(this,"patch");B(this,"all");B(this,"on");B(this,"use");B(this,"router");B(this,"getPath");B(this,"_basePath","/");$(this,Ce,"/");B(this,"routes",[]);$(this,Ie,vd);B(this,"errorHandler",bi);B(this,"onError",r=>(this.errorHandler=r,this));B(this,"notFound",r=>(D(this,Ie,r),this));B(this,"fetch",(r,...n)=>W(this,se,Cn).call(this,r,n[1],n[0],r.method));B(this,"request",(r,n,a,s)=>r instanceof Request?this.fetch(n?new Request(r,n):r,a,s):(r=r.toString(),this.fetch(new Request(/^https?:\/\//.test(r)?r:`http://localhost${Ht("/",r)}`,n),a,s)));B(this,"fire",()=>{addEventListener("fetch",r=>{r.respondWith(W(this,se,Cn).call(this,r.request,r,void 0,r.request.method))})});[...bd,yd].forEach(i=>{this[i]=(o,...l)=>(typeof o=="string"?D(this,Ce,o):W(this,se,yt).call(this,i,k(this,Ce),o),l.forEach(c=>{W(this,se,yt).call(this,i,k(this,Ce),c)}),this)}),this.on=(i,o,...l)=>{for(const c of[o].flat()){D(this,Ce,c);for(const u of[i].flat())l.map(d=>{W(this,se,yt).call(this,u.toUpperCase(),k(this,Ce),d)})}return this},this.use=(i,...o)=>(typeof i=="string"?D(this,Ce,i):(D(this,Ce,"*"),o.unshift(i)),o.forEach(l=>{W(this,se,yt).call(this,ae,k(this,Ce),l)}),this);const{strict:a,...s}=r;Object.assign(this,s),this.getPath=a??!0?r.getPath??kl:hd}route(r,n){const a=this.basePath(r);return n.routes.map(s=>{var o;let i;n.errorHandler===bi?i=s.handler:(i=async(l,c)=>(await fi([],n.errorHandler)(l,()=>s.handler(l,c))).res,i[xd]=s.handler),W(o=a,se,yt).call(o,s.method,s.path,i)}),this}basePath(r){const n=W(this,se,Nl).call(this);return n._basePath=Ht(this._basePath,r),n}mount(r,n,a){let s,i;a&&(typeof a=="function"?i=a:(i=a.optionHandler,a.replaceRequest===!1?s=c=>c:s=a.replaceRequest));const o=i?c=>{const u=i(c);return Array.isArray(u)?u:[u]}:c=>{let u;try{u=c.executionCtx}catch{}return[c.env,u]};s||(s=(()=>{const c=Ht(this._basePath,r),u=c==="/"?0:c.length;return d=>{const h=new URL(d.url);return h.pathname=h.pathname.slice(u)||"/",new Request(h,d)}})());const l=async(c,u)=>{const d=await n(s(c.req.raw),...o(c));if(d)return d;await u()};return W(this,se,yt).call(this,ae,Ht(r,"*"),l),this}},Ce=new WeakMap,se=new WeakSet,Nl=function(){const r=new Qt({router:this.router,getPath:this.getPath});return r.errorHandler=this.errorHandler,D(r,Ie,k(this,Ie)),r.routes=this.routes,r},Ie=new WeakMap,yt=function(r,n,a){r=r.toUpperCase(),n=Ht(this._basePath,n);const s={basePath:this._basePath,path:n,method:r,handler:a};this.router.add(r,n,[a,s]),this.routes.push(s)},An=function(r,n){if(r instanceof Error)return this.errorHandler(r,n);throw r},Cn=function(r,n,a,s){if(s==="HEAD")return(async()=>new Response(null,await W(this,se,Cn).call(this,r,n,a,"GET")))();const i=this.getPath(r,{env:a}),o=this.router.match(s,i),l=new fd(r,{path:i,matchResult:o,env:a,executionCtx:n,notFoundHandler:k(this,Ie)});if(o[0].length===1){let u;try{u=o[0][0][0][0](l,async()=>{l.res=await k(this,Ie).call(this,l)})}catch(d){return W(this,se,An).call(this,d,l)}return u instanceof Promise?u.then(d=>d||(l.finalized?l.res:k(this,Ie).call(this,l))).catch(d=>W(this,se,An).call(this,d,l)):u??k(this,Ie).call(this,l)}const c=fi(o[0],this.errorHandler,k(this,Ie));return(async()=>{try{const u=await c(l);if(!u.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return u.res}catch(u){return W(this,se,An).call(this,u,l)}})()},Qt),Bl=[];function Ed(t,r){const n=this.buildAllMatchers(),a=((s,i)=>{const o=n[s]||n[ae],l=o[2][i];if(l)return l;const c=i.match(o[0]);if(!c)return[[],Bl];const u=c.indexOf("",1);return[o[1][u],c]});return this.match=a,a(t,r)}var Bn="[^/]+",Mr=".*",Rr="(?:|/.*)",Yt=Symbol(),Td=new Set(".\\+*[^]$()");function Sd(t,r){return t.length===1?r.length===1?t<r?-1:1:-1:r.length===1||t===Mr||t===Rr?1:r===Mr||r===Rr?-1:t===Bn?1:r===Bn?-1:t.length===r.length?t<r?-1:1:r.length-t.length}var wt,Et,Oe,Pt,kd=(Pt=class{constructor(){$(this,wt);$(this,Et);$(this,Oe,Object.create(null))}insert(r,n,a,s,i){if(r.length===0){if(k(this,wt)!==void 0)throw Yt;if(i)return;D(this,wt,n);return}const[o,...l]=r,c=o==="*"?l.length===0?["","",Mr]:["","",Bn]:o==="/*"?["","",Rr]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let u;if(c){const d=c[1];let h=c[2]||Bn;if(d&&c[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw Yt;if(u=k(this,Oe)[h],!u){if(Object.keys(k(this,Oe)).some(g=>g!==Mr&&g!==Rr))throw Yt;if(i)return;u=k(this,Oe)[h]=new Pt,d!==""&&D(u,Et,s.varIndex++)}!i&&d!==""&&a.push([d,k(u,Et)])}else if(u=k(this,Oe)[o],!u){if(Object.keys(k(this,Oe)).some(d=>d.length>1&&d!==Mr&&d!==Rr))throw Yt;if(i)return;u=k(this,Oe)[o]=new Pt}u.insert(l,n,a,s,i)}buildRegExpStr(){const n=Object.keys(k(this,Oe)).sort(Sd).map(a=>{const s=k(this,Oe)[a];return(typeof k(s,Et)=="number"?`(${a})@${k(s,Et)}`:Td.has(a)?`\\${a}`:a)+s.buildRegExpStr()});return typeof k(this,wt)=="number"&&n.unshift(`#${k(this,wt)}`),n.length===0?"":n.length===1?n[0]:"(?:"+n.join("|")+")"}},wt=new WeakMap,Et=new WeakMap,Oe=new WeakMap,Pt),jn,qr,cl,Pd=(cl=class{constructor(){$(this,jn,{varIndex:0});$(this,qr,new kd)}insert(t,r,n){const a=[],s=[];for(let o=0;;){let l=!1;if(t=t.replace(/\{[^}]+\}/g,c=>{const u=`@\\${o}`;return s[o]=[u,c],o++,l=!0,u}),!l)break}const i=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let o=s.length-1;o>=0;o--){const[l]=s[o];for(let c=i.length-1;c>=0;c--)if(i[c].indexOf(l)!==-1){i[c]=i[c].replace(l,s[o][1]);break}}return k(this,qr).insert(i,r,a,k(this,jn),n),a}buildRegExp(){let t=k(this,qr).buildRegExpStr();if(t==="")return[/^$/,[],[]];let r=0;const n=[],a=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,i,o)=>i!==void 0?(n[++r]=Number(i),"$()"):(o!==void 0&&(a[Number(o)]=++r),"")),[new RegExp(`^${t}`),n,a]}},jn=new WeakMap,qr=new WeakMap,cl),_d=[/^$/,[],Object.create(null)],In=Object.create(null);function Dl(t){return In[t]??(In[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(r,n)=>n?`\\${n}`:"(?:|/.*)")}$`))}function Ad(){In=Object.create(null)}function Cd(t){var u;const r=new Pd,n=[];if(t.length===0)return _d;const a=t.map(d=>[!/\*|\/:/.test(d[0]),...d]).sort(([d,h],[g,b])=>d?1:g?-1:h.length-b.length),s=Object.create(null);for(let d=0,h=-1,g=a.length;d<g;d++){const[b,m,y]=a[d];b?s[m]=[y.map(([v])=>[v,Object.create(null)]),Bl]:h++;let f;try{f=r.insert(m,h,b)}catch(v){throw v===Yt?new Rl(m):v}b||(n[h]=y.map(([v,S])=>{const P=Object.create(null);for(S-=1;S>=0;S--){const[_,C]=f[S];P[_]=C}return[v,P]}))}const[i,o,l]=r.buildRegExp();for(let d=0,h=n.length;d<h;d++)for(let g=0,b=n[d].length;g<b;g++){const m=(u=n[d][g])==null?void 0:u[1];if(!m)continue;const y=Object.keys(m);for(let f=0,v=y.length;f<v;f++)m[y[f]]=l[m[y[f]]]}const c=[];for(const d in o)c[d]=n[o[d]];return[i,c,s]}function Nt(t,r){if(t){for(const n of Object.keys(t).sort((a,s)=>s.length-a.length))if(Dl(n).test(r))return[...t[n]]}}var st,it,Fn,Ll,dl,Id=(dl=class{constructor(){$(this,Fn);B(this,"name","RegExpRouter");$(this,st);$(this,it);B(this,"match",Ed);D(this,st,{[ae]:Object.create(null)}),D(this,it,{[ae]:Object.create(null)})}add(t,r,n){var l;const a=k(this,st),s=k(this,it);if(!a||!s)throw new Error(Ml);a[t]||[a,s].forEach(c=>{c[t]=Object.create(null),Object.keys(c[ae]).forEach(u=>{c[t][u]=[...c[ae][u]]})}),r==="/*"&&(r="*");const i=(r.match(/\/:/g)||[]).length;if(/\*$/.test(r)){const c=Dl(r);t===ae?Object.keys(a).forEach(u=>{var d;(d=a[u])[r]||(d[r]=Nt(a[u],r)||Nt(a[ae],r)||[])}):(l=a[t])[r]||(l[r]=Nt(a[t],r)||Nt(a[ae],r)||[]),Object.keys(a).forEach(u=>{(t===ae||t===u)&&Object.keys(a[u]).forEach(d=>{c.test(d)&&a[u][d].push([n,i])})}),Object.keys(s).forEach(u=>{(t===ae||t===u)&&Object.keys(s[u]).forEach(d=>c.test(d)&&s[u][d].push([n,i]))});return}const o=Pl(r)||[r];for(let c=0,u=o.length;c<u;c++){const d=o[c];Object.keys(s).forEach(h=>{var g;(t===ae||t===h)&&((g=s[h])[d]||(g[d]=[...Nt(a[h],d)||Nt(a[ae],d)||[]]),s[h][d].push([n,i-u+c+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(k(this,it)).concat(Object.keys(k(this,st))).forEach(r=>{t[r]||(t[r]=W(this,Fn,Ll).call(this,r))}),D(this,st,D(this,it,void 0)),Ad(),t}},st=new WeakMap,it=new WeakMap,Fn=new WeakSet,Ll=function(t){const r=[];let n=t===ae;return[k(this,st),k(this,it)].forEach(a=>{const s=a[t]?Object.keys(a[t]).map(i=>[i,a[t][i]]):[];s.length!==0?(n||(n=!0),r.push(...s)):t!==ae&&r.push(...Object.keys(a[ae]).map(i=>[i,a[ae][i]]))}),n?Cd(r):null},dl),ot,ze,ul,Od=(ul=class{constructor(t){B(this,"name","SmartRouter");$(this,ot,[]);$(this,ze,[]);D(this,ot,t.routers)}add(t,r,n){if(!k(this,ze))throw new Error(Ml);k(this,ze).push([t,r,n])}match(t,r){if(!k(this,ze))throw new Error("Fatal error");const n=k(this,ot),a=k(this,ze),s=n.length;let i=0,o;for(;i<s;i++){const l=n[i];try{for(let c=0,u=a.length;c<u;c++)l.add(...a[c]);o=l.match(t,r)}catch(c){if(c instanceof Rl)continue;throw c}this.match=l.match.bind(l),D(this,ot,[l]),D(this,ze,void 0);break}if(i===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(k(this,ze)||k(this,ot).length!==1)throw new Error("No active router has been determined yet.");return k(this,ot)[0]}},ot=new WeakMap,ze=new WeakMap,ul),cr=Object.create(null),lt,he,Tt,Zt,le,Ue,bt,er,Md=(er=class{constructor(r,n,a){$(this,Ue);$(this,lt);$(this,he);$(this,Tt);$(this,Zt,0);$(this,le,cr);if(D(this,he,a||Object.create(null)),D(this,lt,[]),r&&n){const s=Object.create(null);s[r]={handler:n,possibleKeys:[],score:0},D(this,lt,[s])}D(this,Tt,[])}insert(r,n,a){D(this,Zt,++di(this,Zt)._);let s=this;const i=od(n),o=[];for(let l=0,c=i.length;l<c;l++){const u=i[l],d=i[l+1],h=dd(u,d),g=Array.isArray(h)?h[0]:u;if(g in k(s,he)){s=k(s,he)[g],h&&o.push(h[1]);continue}k(s,he)[g]=new er,h&&(k(s,Tt).push(h),o.push(h[1])),s=k(s,he)[g]}return k(s,lt).push({[r]:{handler:a,possibleKeys:o.filter((l,c,u)=>u.indexOf(l)===c),score:k(this,Zt)}}),s}search(r,n){var c;const a=[];D(this,le,cr);let i=[this];const o=Sl(n),l=[];for(let u=0,d=o.length;u<d;u++){const h=o[u],g=u===d-1,b=[];for(let m=0,y=i.length;m<y;m++){const f=i[m],v=k(f,he)[h];v&&(D(v,le,k(f,le)),g?(k(v,he)["*"]&&a.push(...W(this,Ue,bt).call(this,k(v,he)["*"],r,k(f,le))),a.push(...W(this,Ue,bt).call(this,v,r,k(f,le)))):b.push(v));for(let S=0,P=k(f,Tt).length;S<P;S++){const _=k(f,Tt)[S],C=k(f,le)===cr?{}:{...k(f,le)};if(_==="*"){const N=k(f,he)["*"];N&&(a.push(...W(this,Ue,bt).call(this,N,r,k(f,le))),D(N,le,C),b.push(N));continue}const[M,E,A]=_;if(!h&&!(A instanceof RegExp))continue;const I=k(f,he)[M],R=o.slice(u).join("/");if(A instanceof RegExp){const N=A.exec(R);if(N){if(C[E]=N[0],a.push(...W(this,Ue,bt).call(this,I,r,k(f,le),C)),Object.keys(k(I,he)).length){D(I,le,C);const L=((c=N[0].match(/\//))==null?void 0:c.length)??0;(l[L]||(l[L]=[])).push(I)}continue}}(A===!0||A.test(h))&&(C[E]=h,g?(a.push(...W(this,Ue,bt).call(this,I,r,C,k(f,le))),k(I,he)["*"]&&a.push(...W(this,Ue,bt).call(this,k(I,he)["*"],r,C,k(f,le)))):(D(I,le,C),b.push(I)))}}i=b.concat(l.shift()??[])}return a.length>1&&a.sort((u,d)=>u.score-d.score),[a.map(({handler:u,params:d})=>[u,d])]}},lt=new WeakMap,he=new WeakMap,Tt=new WeakMap,Zt=new WeakMap,le=new WeakMap,Ue=new WeakSet,bt=function(r,n,a,s){const i=[];for(let o=0,l=k(r,lt).length;o<l;o++){const c=k(r,lt)[o],u=c[n]||c[ae],d={};if(u!==void 0&&(u.params=Object.create(null),i.push(u),a!==cr||s&&s!==cr))for(let h=0,g=u.possibleKeys.length;h<g;h++){const b=u.possibleKeys[h],m=d[u.score];u.params[b]=s!=null&&s[b]&&!m?s[b]:a[b]??(s==null?void 0:s[b]),d[u.score]=!0}}return i},er),St,hl,Rd=(hl=class{constructor(){B(this,"name","TrieRouter");$(this,St);D(this,St,new Md)}add(t,r,n){const a=Pl(r);if(a){for(let s=0,i=a.length;s<i;s++)k(this,St).insert(t,a[s],n);return}k(this,St).insert(t,r,n)}match(t,r){return k(this,St).search(t,r)}},St=new WeakMap,hl),Ds=class extends wd{constructor(t={}){super(t),this.router=t.router??new Od({routers:[new Id,new Rd]})}},Nd=t=>{const n={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},a=(i=>typeof i=="string"?i==="*"?()=>i:o=>i===o?o:null:typeof i=="function"?i:o=>i.includes(o)?o:null)(n.origin),s=(i=>typeof i=="function"?i:Array.isArray(i)?()=>i:()=>[])(n.allowMethods);return async function(o,l){var d;function c(h,g){o.res.headers.set(h,g)}const u=await a(o.req.header("origin")||"",o);if(u&&c("Access-Control-Allow-Origin",u),n.credentials&&c("Access-Control-Allow-Credentials","true"),(d=n.exposeHeaders)!=null&&d.length&&c("Access-Control-Expose-Headers",n.exposeHeaders.join(",")),o.req.method==="OPTIONS"){n.origin!=="*"&&c("Vary","Origin"),n.maxAge!=null&&c("Access-Control-Max-Age",n.maxAge.toString());const h=await s(o.req.header("origin")||"",o);h.length&&c("Access-Control-Allow-Methods",h.join(","));let g=n.allowHeaders;if(!(g!=null&&g.length)){const b=o.req.header("Access-Control-Request-Headers");b&&(g=b.split(/\s*,\s*/))}return g!=null&&g.length&&(c("Access-Control-Allow-Headers",g.join(",")),o.res.headers.append("Vary","Access-Control-Request-Headers")),o.res.headers.delete("Content-Length"),o.res.headers.delete("Content-Type"),new Response(null,{headers:o.res.headers,status:204,statusText:"No Content"})}await l(),n.origin!=="*"&&o.header("Vary","Origin",{append:!0})}},Dr="_hp",Bd={Change:"Input",DoubleClick:"DblClick"},Dd={svg:"2000/svg",math:"1998/Math/MathML"},Lr=[],Ss=new WeakMap,rr=void 0,Ld=()=>rr,je=t=>"t"in t,oa={onClick:["click",!1]},xi=t=>{if(!t.startsWith("on"))return;if(oa[t])return oa[t];const r=t.match(/^on([A-Z][a-zA-Z]+?(?:PointerCapture)?)(Capture)?$/);if(r){const[,n,a]=r;return oa[t]=[(Bd[n]||n).toLowerCase(),!!a]}},vi=(t,r)=>rr&&t instanceof SVGElement&&/[A-Z]/.test(r)&&(r in t.style||r.match(/^(?:o|pai|str|u|ve)/))?r.replace(/([A-Z])/g,"-$1").toLowerCase():r,jd=(t,r,n)=>{var a;r||(r={});for(let s in r){const i=r[s];if(s!=="children"&&(!n||n[s]!==i)){s=Nn(s);const o=xi(s);if(o){if((n==null?void 0:n[s])!==i&&(n&&t.removeEventListener(o[0],n[s],o[1]),i!=null)){if(typeof i!="function")throw new Error(`Event handler for "${s}" is not a function`);t.addEventListener(o[0],i,o[1])}}else if(s==="dangerouslySetInnerHTML"&&i)t.innerHTML=i.__html;else if(s==="ref"){let l;typeof i=="function"?l=i(t)||(()=>i(null)):i&&"current"in i&&(i.current=t,l=()=>i.current=null),Ss.set(t,l)}else if(s==="style"){const l=t.style;typeof i=="string"?l.cssText=i:(l.cssText="",i!=null&&El(i,l.setProperty.bind(l)))}else{if(s==="value"){const c=t.nodeName;if(c==="INPUT"||c==="TEXTAREA"||c==="SELECT"){if(t.value=i==null||i===!1?null:i,c==="TEXTAREA"){t.textContent=i;continue}else if(c==="SELECT"){t.selectedIndex===-1&&(t.selectedIndex=0);continue}}}else(s==="checked"&&t.nodeName==="INPUT"||s==="selected"&&t.nodeName==="OPTION")&&(t[s]=i);const l=vi(t,s);i==null||i===!1?t.removeAttribute(l):i===!0?t.setAttribute(l,""):typeof i=="string"||typeof i=="number"?t.setAttribute(l,i):t.setAttribute(l,i.toString())}}}if(n)for(let s in n){const i=n[s];if(s!=="children"&&!(s in r)){s=Nn(s);const o=xi(s);o?t.removeEventListener(o[0],i,o[1]):s==="ref"?(a=Ss.get(t))==null||a():t.removeAttribute(vi(t,s))}}},Fd=(t,r)=>{r[ee][0]=0,Lr.push([t,r]);const n=r.tag[Os]||r.tag,a=n.defaultProps?{...n.defaultProps,...r.props}:r.props;try{return[n.call(null,a)]}finally{Lr.pop()}},jl=(t,r,n,a,s)=>{var i,o;(i=t.vR)!=null&&i.length&&(a.push(...t.vR),delete t.vR),typeof t.tag=="function"&&((o=t[ee][1][Ul])==null||o.forEach(l=>s.push(l))),t.vC.forEach(l=>{var c;if(je(l))n.push(l);else if(typeof l.tag=="function"||l.tag===""){l.c=r;const u=n.length;if(jl(l,r,n,a,s),l.s){for(let d=u;d<n.length;d++)n[d].s=!0;l.s=!1}}else n.push(l),(c=l.vR)!=null&&c.length&&(a.push(...l.vR),delete l.vR)})},$d=t=>{for(;;t=t.tag===Dr||!t.vC||!t.pP?t.nN:t.vC[0]){if(!t)return null;if(t.tag!==Dr&&t.e)return t.e}},Fl=t=>{var r,n,a,s,i,o;je(t)||((n=(r=t[ee])==null?void 0:r[1][Ul])==null||n.forEach(l=>{var c;return(c=l[2])==null?void 0:c.call(l)}),(a=Ss.get(t.e))==null||a(),t.p===2&&((s=t.vC)==null||s.forEach(l=>l.p=2)),(i=t.vC)==null||i.forEach(Fl)),t.p||((o=t.e)==null||o.remove(),delete t.e),typeof t.tag=="function"&&(Or.delete(t),On.delete(t),delete t[ee][3],t.a=!0)},$l=(t,r,n)=>{t.c=r,zl(t,r,n)},wi=(t,r)=>{if(r){for(let n=0,a=t.length;n<a;n++)if(t[n]===r)return n}},Ei=Symbol(),zl=(t,r,n)=>{var u;const a=[],s=[],i=[];jl(t,r,a,s,i),s.forEach(Fl);const o=n?void 0:r.childNodes;let l,c=null;if(n)l=-1;else if(!o.length)l=0;else{const d=wi(o,$d(t.nN));d!==void 0?(c=o[d],l=d):l=wi(o,(u=a.find(h=>h.tag!==Dr&&h.e))==null?void 0:u.e)??-1,l===-1&&(n=!0)}for(let d=0,h=a.length;d<h;d++,l++){const g=a[d];let b;if(g.s&&g.e)b=g.e,g.s=!1;else{const m=n||!g.e;je(g)?(g.e&&g.d&&(g.e.textContent=g.t),g.d=!1,b=g.e||(g.e=document.createTextNode(g.t))):(b=g.e||(g.e=g.n?document.createElementNS(g.n,g.tag):document.createElement(g.tag)),jd(b,g.props,g.pP),zl(g,b,m))}g.tag===Dr?l--:n?b.parentNode||r.appendChild(b):o[l]!==b&&o[l-1]!==b&&(o[l+1]===b?r.appendChild(o[l]):r.insertBefore(b,c||o[l]||null))}if(t.pP&&delete t.pP,i.length){const d=[],h=[];i.forEach(([,g,,b,m])=>{g&&d.push(g),b&&h.push(b),m==null||m()}),d.forEach(g=>g()),h.length&&requestAnimationFrame(()=>{h.forEach(g=>g())})}},zd=(t,r)=>!!(t&&t.length===r.length&&t.every((n,a)=>n[1]===r[a][1])),On=new WeakMap,ks=(t,r,n)=>{var i,o,l,c,u,d;const a=!n&&r.pC;n&&(r.pC||(r.pC=r.vC));let s;try{n||(n=typeof r.tag=="function"?Fd(t,r):Wr(r.props.children)),((i=n[0])==null?void 0:i.tag)===""&&n[0][ws]&&(s=n[0][ws],t[5].push([t,s,r]));const h=a?[...r.pC]:r.vC?[...r.vC]:void 0,g=[];let b;for(let m=0;m<n.length;m++){Array.isArray(n[m])&&n.splice(m,1,...n[m].flat());let y=Ud(n[m]);if(y){typeof y.tag=="function"&&!y.tag[yl]&&(tr.length>0&&(y[ee][2]=tr.map(v=>[v,v.values.at(-1)])),(o=t[5])!=null&&o.length&&(y[ee][3]=t[5].at(-1)));let f;if(h&&h.length){const v=h.findIndex(je(y)?S=>je(S):y.key!==void 0?S=>S.key===y.key&&S.tag===y.tag:S=>S.tag===y.tag);v!==-1&&(f=h[v],h.splice(v,1))}if(f)if(je(y))f.t!==y.t&&(f.t=y.t,f.d=!0),y=f;else{const v=f.pP=f.props;if(f.props=y.props,f.f||(f.f=y.f||r.f),typeof y.tag=="function"){const S=f[ee][2];f[ee][2]=y[ee][2]||[],f[ee][3]=y[ee][3],!f.f&&((f.o||f)===y.o||(c=(l=f.tag)[zc])!=null&&c.call(l,v,f.props))&&zd(S,f[ee][2])&&(f.s=!0)}y=f}else if(!je(y)&&rr){const v=nr(rr);v&&(y.n=v)}if(!je(y)&&!y.s&&(ks(t,y),delete y.f),g.push(y),b&&!b.s&&!y.s)for(let v=b;v&&!je(v);v=(u=v.vC)==null?void 0:u.at(-1))v.nN=y;b=y}}r.vR=a?[...r.vC,...h||[]]:h||[],r.vC=g,a&&delete r.pC}catch(h){if(r.f=!0,h===Ei){if(s)return;throw h}const[g,b,m]=((d=r[ee])==null?void 0:d[3])||[];if(b){const y=()=>Mn([0,!1,t[2]],m),f=On.get(m)||[];f.push(y),On.set(m,f);const v=b(h,()=>{const S=On.get(m);if(S){const P=S.indexOf(y);if(P!==-1)return S.splice(P,1),y()}});if(v){if(t[0]===1)t[1]=!0;else if(ks(t,m,[v]),(b.length===1||t!==g)&&m.c){$l(m,m.c,!1);return}throw Ei}}throw h}finally{s&&t[5].pop()}},Ud=t=>{if(!(t==null||typeof t=="boolean")){if(typeof t=="string"||typeof t=="number")return{t:t.toString(),d:!0};if("vR"in t&&(t={tag:t.tag,props:t.props,key:t.key,f:t.f,type:t.tag,ref:t.props.ref,o:t.o||t}),typeof t.tag=="function")t[ee]=[0,[]];else{const r=Dd[t.tag];r&&(rr||(rr=xl("")),t.props.children=[{tag:rr,props:{value:t.n=`http://www.w3.org/${r}`,children:t.props.children}}])}return t}},Ti=(t,r)=>{var n,a;(n=r[ee][2])==null||n.forEach(([s,i])=>{s.values.push(i)});try{ks(t,r,void 0)}catch{return}if(r.a){delete r.a;return}(a=r[ee][2])==null||a.forEach(([s])=>{s.values.pop()}),(t[0]!==1||!t[1])&&$l(r,r.c,!1)},Or=new WeakMap,Si=[],Mn=async(t,r)=>{t[5]||(t[5]=[]);const n=Or.get(r);n&&n[0](void 0);let a;const s=new Promise(i=>a=i);if(Or.set(r,[a,()=>{t[2]?t[2](t,r,i=>{Ti(i,r)}).then(()=>a(r)):(Ti(t,r),a(r))}]),Si.length)Si.at(-1).add(r);else{await Promise.resolve();const i=Or.get(r);i&&(Or.delete(r),i[1]())}return s},qd=(t,r,n)=>({tag:Dr,props:{children:t},key:n,e:r,p:1}),la=0,Ul=1,ca=2,da=3,ua=new WeakMap,ql=(t,r)=>!t||!r||t.length!==r.length||r.some((n,a)=>n!==t[a]),Wd=void 0,ki=[],Hd=t=>{var o;const r=()=>typeof t=="function"?t():t,n=Lr.at(-1);if(!n)return[r(),()=>{}];const[,a]=n,s=(o=a[ee][1])[la]||(o[la]=[]),i=a[ee][0]++;return s[i]||(s[i]=[r(),l=>{const c=Wd,u=s[i];if(typeof l=="function"&&(l=l(u[0])),!Object.is(l,u[0]))if(u[0]=l,ki.length){const[d,h]=ki.at(-1);Promise.all([d===3?a:Mn([d,!1,c],a),h]).then(([g])=>{if(!g||!(d===2||d===3))return;const b=g.vC;requestAnimationFrame(()=>{setTimeout(()=>{b===g.vC&&Mn([d===3?1:0,!1,c],g)})})})}else Mn([0,!1,c],a)}])},Ls=(t,r)=>{var l;const n=Lr.at(-1);if(!n)return t;const[,a]=n,s=(l=a[ee][1])[ca]||(l[ca]=[]),i=a[ee][0]++,o=s[i];return ql(o==null?void 0:o[1],r)?s[i]=[t,r]:t=s[i][0],t},Gd=t=>{const r=ua.get(t);if(r){if(r.length===2)throw r[1];return r[0]}throw t.then(n=>ua.set(t,[n]),n=>ua.set(t,[void 0,n])),t},Yd=(t,r)=>{var l;const n=Lr.at(-1);if(!n)return t();const[,a]=n,s=(l=a[ee][1])[da]||(l[da]=[]),i=a[ee][0]++,o=s[i];return ql(o==null?void 0:o[1],r)&&(s[i]=[t(),r]),s[i][0]},Vd=xl({pending:!1,data:null,method:null,action:null}),Pi=new Set,Kd=t=>{Pi.add(t),t.finally(()=>Pi.delete(t))},js=(t,r)=>Yd(()=>n=>{let a;t&&(typeof t=="function"?a=t(n)||(()=>{t(null)}):t&&"current"in t&&(t.current=n,a=()=>{t.current=null}));const s=r(n);return()=>{s==null||s(),a==null||a()}},[t]),Bt=Object.create(null),Qr=Object.create(null),Yr=(t,r,n,a,s)=>{if(r!=null&&r.itemProp)return{tag:t,props:r,type:t,ref:r.ref};const i=document.head;let{onLoad:o,onError:l,precedence:c,blocking:u,...d}=r,h=null,g=!1;const b=kn[t];let m;if(b.length>0){const S=i.querySelectorAll(t);e:for(const P of S)for(const _ of kn[t])if(P.getAttribute(_)===r[_]){h=P;break e}if(!h){const P=b.reduce((_,C)=>r[C]===void 0?_:`${_}-${C}-${r[C]}`,t);g=!Qr[P],h=Qr[P]||(Qr[P]=(()=>{const _=document.createElement(t);for(const C of b)r[C]!==void 0&&_.setAttribute(C,r[C]),r.rel&&_.setAttribute("rel",r.rel);return _})())}}else m=i.querySelectorAll(t);c=a?c??"":void 0,a&&(d[Pn]=c);const y=Ls(S=>{if(b.length>0){let P=!1;for(const _ of i.querySelectorAll(t)){if(P&&_.getAttribute(Pn)!==c){i.insertBefore(S,_);return}_.getAttribute(Pn)===c&&(P=!0)}i.appendChild(S)}else if(m){let P=!1;for(const _ of m)if(_===S){P=!0;break}P||i.insertBefore(S,i.contains(m[0])?m[0]:i.querySelector(t)),m=void 0}},[c]),f=js(r.ref,S=>{var C;const P=b[0];if(n===2&&(S.innerHTML=""),(g||m)&&y(S),!l&&!o)return;let _=Bt[C=S.getAttribute(P)]||(Bt[C]=new Promise((M,E)=>{S.addEventListener("load",M),S.addEventListener("error",E)}));o&&(_=_.then(o)),l&&(_=_.catch(l)),_.catch(()=>{})});if(s&&u==="render"){const S=kn[t][0];if(r[S]){const P=r[S],_=Bt[P]||(Bt[P]=new Promise((C,M)=>{y(h),h.addEventListener("load",C),h.addEventListener("error",M)}));Gd(_)}}const v={tag:t,type:t,props:{...d,ref:f},ref:f};return v.p=n,h&&(v.e=h),qd(v,i)},Jd=t=>{const r=Ld(),n=r&&nr(r);return n!=null&&n.endsWith("svg")?{tag:"title",props:t,type:"title",ref:t.ref}:Yr("title",t,void 0,!1,!1)},Xd=t=>!t||["src","async"].some(r=>!t[r])?{tag:"script",props:t,type:"script",ref:t.ref}:Yr("script",t,1,!1,!0),Qd=t=>!t||!["href","precedence"].every(r=>r in t)?{tag:"style",props:t,type:"style",ref:t.ref}:(t["data-href"]=t.href,delete t.href,Yr("style",t,2,!0,!0)),Zd=t=>!t||["onLoad","onError"].some(r=>r in t)||t.rel==="stylesheet"&&(!("precedence"in t)||"disabled"in t)?{tag:"link",props:t,type:"link",ref:t.ref}:Yr("link",t,1,"precedence"in t,!0),eu=t=>Yr("meta",t,void 0,!1,!1),Wl=Symbol(),tu=t=>{const{action:r,...n}=t;typeof r!="function"&&(n.action=r);const[a,s]=Hd([null,!1]),i=Ls(async u=>{const d=u.isTrusted?r:u.detail[Wl];if(typeof d!="function")return;u.preventDefault();const h=new FormData(u.target);s([h,!0]);const g=d(h);g instanceof Promise&&(Kd(g),await g),s([null,!0])},[]),o=js(t.ref,u=>(u.addEventListener("submit",i),()=>{u.removeEventListener("submit",i)})),[l,c]=a;return a[1]=!1,{tag:Vd,props:{value:{pending:l!==null,data:l,method:l?"post":null,action:l?r:null},children:{tag:"form",props:{...n,ref:o},type:"form",ref:o}},f:c}},Hl=(t,{formAction:r,...n})=>{if(typeof r=="function"){const a=Ls(s=>{s.preventDefault(),s.currentTarget.form.dispatchEvent(new CustomEvent("submit",{detail:{[Wl]:r}}))},[]);n.ref=js(n.ref,s=>(s.addEventListener("click",a),()=>{s.removeEventListener("click",a)}))}return{tag:t,props:n,type:t,ref:n.ref}},ru=t=>Hl("input",t),nu=t=>Hl("button",t);Object.assign(Es,{title:Jd,script:Xd,style:Qd,link:Zd,meta:eu,form:tu,input:ru,button:nu});Ms(null);new TextEncoder;var au=Ms(null),su=(t,r,n,a)=>(s,i)=>{const o="<!DOCTYPE html>",l=n?mi(u=>n(u,t),{Layout:r,...i},s):s,c=$c`${Pe(o)}${mi(au.Provider,{value:t},l)}`;return t.html(c)},iu=(t,r)=>function(a,s){const i=a.getLayout()??ed;return t&&a.setLayout(o=>t({...o,Layout:i},a)),a.setRenderer(su(a,i,t)),s()};const ou=iu(({children:t,title:r})=>e("html",{lang:"en",children:[e("head",{children:[e("meta",{charset:"UTF-8"}),e("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),e("title",{children:r||"Acromatico - Creative Education for Homeschool Kids"}),e("meta",{name:"description",content:"Multi-revenue SaaS platform for homeschool families. Academy, Studio Services, Fine Art Prints, and Wedding Photography."}),e("script",{src:"https://cdn.tailwindcss.com"}),e("link",{href:"https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css",rel:"stylesheet"}),e("link",{href:"/static/style.css",rel:"stylesheet"})]}),e("body",{class:"bg-gray-50 text-gray-900",children:t})]}));var _i=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function lu(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var r=t.default;if(typeof r=="function"){var n=function a(){return this instanceof a?Reflect.construct(r,arguments,this.constructor):r.apply(this,arguments)};n.prototype=r.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(t).forEach(function(a){var s=Object.getOwnPropertyDescriptor(t,a);Object.defineProperty(n,a,s.get?s:{enumerable:!0,get:function(){return t[a]}})}),n}var ha,Ai;function ar(){return Ai||(Ai=1,ha=TypeError),ha}const cu={},du=Object.freeze(Object.defineProperty({__proto__:null,default:cu},Symbol.toStringTag,{value:"Module"})),uu=lu(du);var pa,Ci;function $n(){if(Ci)return pa;Ci=1;var t=typeof Map=="function"&&Map.prototype,r=Object.getOwnPropertyDescriptor&&t?Object.getOwnPropertyDescriptor(Map.prototype,"size"):null,n=t&&r&&typeof r.get=="function"?r.get:null,a=t&&Map.prototype.forEach,s=typeof Set=="function"&&Set.prototype,i=Object.getOwnPropertyDescriptor&&s?Object.getOwnPropertyDescriptor(Set.prototype,"size"):null,o=s&&i&&typeof i.get=="function"?i.get:null,l=s&&Set.prototype.forEach,c=typeof WeakMap=="function"&&WeakMap.prototype,u=c?WeakMap.prototype.has:null,d=typeof WeakSet=="function"&&WeakSet.prototype,h=d?WeakSet.prototype.has:null,g=typeof WeakRef=="function"&&WeakRef.prototype,b=g?WeakRef.prototype.deref:null,m=Boolean.prototype.valueOf,y=Object.prototype.toString,f=Function.prototype.toString,v=String.prototype.match,S=String.prototype.slice,P=String.prototype.replace,_=String.prototype.toUpperCase,C=String.prototype.toLowerCase,M=RegExp.prototype.test,E=Array.prototype.concat,A=Array.prototype.join,I=Array.prototype.slice,R=Math.floor,N=typeof BigInt=="function"?BigInt.prototype.valueOf:null,L=Object.getOwnPropertySymbols,H=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Symbol.prototype.toString:null,U=typeof Symbol=="function"&&typeof Symbol.iterator=="object",X=typeof Symbol=="function"&&Symbol.toStringTag&&(typeof Symbol.toStringTag===U||!0)?Symbol.toStringTag:null,F=Object.prototype.propertyIsEnumerable,Y=(typeof Reflect=="function"?Reflect.getPrototypeOf:Object.getPrototypeOf)||([].__proto__===Array.prototype?function(x){return x.__proto__}:null);function O(x,T){if(x===1/0||x===-1/0||x!==x||x&&x>-1e3&&x<1e3||M.call(/e/,T))return T;var q=/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;if(typeof x=="number"){var K=x<0?-R(-x):R(x);if(K!==x){var J=String(K),j=S.call(T,J.length+1);return P.call(J,q,"$&_")+"."+P.call(P.call(j,/([0-9]{3})/g,"$&_"),/_$/,"")}}return P.call(T,q,"$&_")}var ge=uu,Be=ge.custom,dt=de(Be)?Be:null,We={__proto__:null,double:'"',single:"'"},He={__proto__:null,double:/(["\\])/g,single:/(['\\])/g};pa=function x(T,q,K,J){var j=q||{};if(ye(j,"quoteStyle")&&!ye(We,j.quoteStyle))throw new TypeError('option "quoteStyle" must be "single" or "double"');if(ye(j,"maxStringLength")&&(typeof j.maxStringLength=="number"?j.maxStringLength<0&&j.maxStringLength!==1/0:j.maxStringLength!==null))throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');var Je=ye(j,"customInspect")?j.customInspect:!0;if(typeof Je!="boolean"&&Je!=="symbol")throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");if(ye(j,"indent")&&j.indent!==null&&j.indent!=="	"&&!(parseInt(j.indent,10)===j.indent&&j.indent>0))throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');if(ye(j,"numericSeparator")&&typeof j.numericSeparator!="boolean")throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');var ut=j.numericSeparator;if(typeof T>"u")return"undefined";if(T===null)return"null";if(typeof T=="boolean")return T?"true":"false";if(typeof T=="string")return Zs(T,j);if(typeof T=="number"){if(T===0)return 1/0/T>0?"0":"-0";var be=String(T);return ut?O(T,be):be}if(typeof T=="bigint"){var Xe=String(T)+"n";return ut?O(T,Xe):Xe}var Kn=typeof j.depth>"u"?5:j.depth;if(typeof K>"u"&&(K=0),K>=Kn&&Kn>0&&typeof T=="object")return Ye(T)?"[Array]":"[Object]";var Mt=Nc(j,K);if(typeof J>"u")J=[];else if(Ke(J,T)>=0)return"[Circular]";function Ae(Rt,Jr,Dc){if(Jr&&(J=I.call(J),J.push(Jr)),Dc){var li={depth:j.depth};return ye(j,"quoteStyle")&&(li.quoteStyle=j.quoteStyle),x(Rt,li,K+1,J)}return x(Rt,j,K+1,J)}if(typeof T=="function"&&!oe(T)){var ti=At(T),ri=Vr(T,Ae);return"[Function"+(ti?": "+ti:" (anonymous)")+"]"+(ri.length>0?" { "+A.call(ri,", ")+" }":"")}if(de(T)){var ni=U?P.call(String(T),/^(Symbol\(.*\))_[^)]*$/,"$1"):H.call(T);return typeof T=="object"&&!U?or(ni):ni}if(Oc(T)){for(var lr="<"+C.call(String(T.nodeName)),Jn=T.attributes||[],Kr=0;Kr<Jn.length;Kr++)lr+=" "+Jn[Kr].name+"="+Ge(De(Jn[Kr].value),"double",j);return lr+=">",T.childNodes&&T.childNodes.length&&(lr+="..."),lr+="</"+C.call(String(T.nodeName))+">",lr}if(Ye(T)){if(T.length===0)return"[]";var Xn=Vr(T,Ae);return Mt&&!Rc(Xn)?"["+Vn(Xn,Mt)+"]":"[ "+A.call(Xn,", ")+" ]"}if(z(T)){var Qn=Vr(T,Ae);return!("cause"in Error.prototype)&&"cause"in T&&!F.call(T,"cause")?"{ ["+String(T)+"] "+A.call(E.call("[cause]: "+Ae(T.cause),Qn),", ")+" }":Qn.length===0?"["+String(T)+"]":"{ ["+String(T)+"] "+A.call(Qn,", ")+" }"}if(typeof T=="object"&&Je){if(dt&&typeof T[dt]=="function"&&ge)return ge(T,{depth:Kn-K});if(Je!=="symbol"&&typeof T.inspect=="function")return T.inspect()}if(_e(T)){var ai=[];return a&&a.call(T,function(Rt,Jr){ai.push(Ae(Jr,T,!0)+" => "+Ae(Rt,T))}),ei("Map",n.call(T),ai,Mt)}if(Ot(T)){var si=[];return l&&l.call(T,function(Rt){si.push(Ae(Rt,T))}),ei("Set",o.call(T),si,Mt)}if(Ct(T))return Yn("WeakMap");if(Ic(T))return Yn("WeakSet");if(It(T))return Yn("WeakRef");if(V(T))return or(Ae(Number(T)));if(we(T))return or(Ae(N.call(T)));if(ne(T))return or(m.call(T));if(re(T))return or(Ae(String(T)));if(typeof window<"u"&&T===window)return"{ [object Window] }";if(typeof globalThis<"u"&&T===globalThis||typeof _i<"u"&&T===_i)return"{ [object globalThis] }";if(!Ve(T)&&!oe(T)){var Zn=Vr(T,Ae),ii=Y?Y(T)===Object.prototype:T instanceof Object||T.constructor===Object,ea=T instanceof Object?"":"null prototype",oi=!ii&&X&&Object(T)===T&&X in T?S.call(Ee(T),8,-1):ea?"Object":"",Bc=ii||typeof T.constructor!="function"?"":T.constructor.name?T.constructor.name+" ":"",ta=Bc+(oi||ea?"["+A.call(E.call([],oi||[],ea||[]),": ")+"] ":"");return Zn.length===0?ta+"{}":Mt?ta+"{"+Vn(Zn,Mt)+"}":ta+"{ "+A.call(Zn,", ")+" }"}return String(T)};function Ge(x,T,q){var K=q.quoteStyle||T,J=We[K];return J+x+J}function De(x){return P.call(String(x),/"/g,"&quot;")}function ve(x){return!X||!(typeof x=="object"&&(X in x||typeof x[X]<"u"))}function Ye(x){return Ee(x)==="[object Array]"&&ve(x)}function Ve(x){return Ee(x)==="[object Date]"&&ve(x)}function oe(x){return Ee(x)==="[object RegExp]"&&ve(x)}function z(x){return Ee(x)==="[object Error]"&&ve(x)}function re(x){return Ee(x)==="[object String]"&&ve(x)}function V(x){return Ee(x)==="[object Number]"&&ve(x)}function ne(x){return Ee(x)==="[object Boolean]"&&ve(x)}function de(x){if(U)return x&&typeof x=="object"&&x instanceof Symbol;if(typeof x=="symbol")return!0;if(!x||typeof x!="object"||!H)return!1;try{return H.call(x),!0}catch{}return!1}function we(x){if(!x||typeof x!="object"||!N)return!1;try{return N.call(x),!0}catch{}return!1}var ue=Object.prototype.hasOwnProperty||function(x){return x in this};function ye(x,T){return ue.call(x,T)}function Ee(x){return y.call(x)}function At(x){if(x.name)return x.name;var T=v.call(f.call(x),/^function\s*([\w$]+)/);return T?T[1]:null}function Ke(x,T){if(x.indexOf)return x.indexOf(T);for(var q=0,K=x.length;q<K;q++)if(x[q]===T)return q;return-1}function _e(x){if(!n||!x||typeof x!="object")return!1;try{n.call(x);try{o.call(x)}catch{return!0}return x instanceof Map}catch{}return!1}function Ct(x){if(!u||!x||typeof x!="object")return!1;try{u.call(x,u);try{h.call(x,h)}catch{return!0}return x instanceof WeakMap}catch{}return!1}function It(x){if(!b||!x||typeof x!="object")return!1;try{return b.call(x),!0}catch{}return!1}function Ot(x){if(!o||!x||typeof x!="object")return!1;try{o.call(x);try{n.call(x)}catch{return!0}return x instanceof Set}catch{}return!1}function Ic(x){if(!h||!x||typeof x!="object")return!1;try{h.call(x,h);try{u.call(x,u)}catch{return!0}return x instanceof WeakSet}catch{}return!1}function Oc(x){return!x||typeof x!="object"?!1:typeof HTMLElement<"u"&&x instanceof HTMLElement?!0:typeof x.nodeName=="string"&&typeof x.getAttribute=="function"}function Zs(x,T){if(x.length>T.maxStringLength){var q=x.length-T.maxStringLength,K="... "+q+" more character"+(q>1?"s":"");return Zs(S.call(x,0,T.maxStringLength),T)+K}var J=He[T.quoteStyle||"single"];J.lastIndex=0;var j=P.call(P.call(x,J,"\\$1"),/[\x00-\x1f]/g,Mc);return Ge(j,"single",T)}function Mc(x){var T=x.charCodeAt(0),q={8:"b",9:"t",10:"n",12:"f",13:"r"}[T];return q?"\\"+q:"\\x"+(T<16?"0":"")+_.call(T.toString(16))}function or(x){return"Object("+x+")"}function Yn(x){return x+" { ? }"}function ei(x,T,q,K){var J=K?Vn(q,K):A.call(q,", ");return x+" ("+T+") {"+J+"}"}function Rc(x){for(var T=0;T<x.length;T++)if(Ke(x[T],`
`)>=0)return!1;return!0}function Nc(x,T){var q;if(x.indent==="	")q="	";else if(typeof x.indent=="number"&&x.indent>0)q=A.call(Array(x.indent+1)," ");else return null;return{base:q,prev:A.call(Array(T+1),q)}}function Vn(x,T){if(x.length===0)return"";var q=`
`+T.prev+T.base;return q+A.call(x,","+q)+`
`+T.prev}function Vr(x,T){var q=Ye(x),K=[];if(q){K.length=x.length;for(var J=0;J<x.length;J++)K[J]=ye(x,J)?T(x[J],x):""}var j=typeof L=="function"?L(x):[],Je;if(U){Je={};for(var ut=0;ut<j.length;ut++)Je["$"+j[ut]]=j[ut]}for(var be in x)ye(x,be)&&(q&&String(Number(be))===be&&be<x.length||U&&Je["$"+be]instanceof Symbol||(M.call(/[^\w$]/,be)?K.push(T(be,x)+": "+T(x[be],x)):K.push(be+": "+T(x[be],x))));if(typeof L=="function")for(var Xe=0;Xe<j.length;Xe++)F.call(x,j[Xe])&&K.push("["+T(j[Xe])+"]: "+T(x[j[Xe]],x));return K}return pa}var ma,Ii;function hu(){if(Ii)return ma;Ii=1;var t=$n(),r=ar(),n=function(l,c,u){for(var d=l,h;(h=d.next)!=null;d=h)if(h.key===c)return d.next=h.next,u||(h.next=l.next,l.next=h),h},a=function(l,c){if(l){var u=n(l,c);return u&&u.value}},s=function(l,c,u){var d=n(l,c);d?d.value=u:l.next={key:c,next:l.next,value:u}},i=function(l,c){return l?!!n(l,c):!1},o=function(l,c){if(l)return n(l,c,!0)};return ma=function(){var c,u={assert:function(d){if(!u.has(d))throw new r("Side channel does not contain "+t(d))},delete:function(d){var h=c&&c.next,g=o(c,d);return g&&h&&h===g&&(c=void 0),!!g},get:function(d){return a(c,d)},has:function(d){return i(c,d)},set:function(d,h){c||(c={next:void 0}),s(c,d,h)}};return u},ma}var ga,Oi;function Gl(){return Oi||(Oi=1,ga=Object),ga}var fa,Mi;function pu(){return Mi||(Mi=1,fa=Error),fa}var ya,Ri;function mu(){return Ri||(Ri=1,ya=EvalError),ya}var ba,Ni;function gu(){return Ni||(Ni=1,ba=RangeError),ba}var xa,Bi;function fu(){return Bi||(Bi=1,xa=ReferenceError),xa}var va,Di;function yu(){return Di||(Di=1,va=SyntaxError),va}var wa,Li;function bu(){return Li||(Li=1,wa=URIError),wa}var Ea,ji;function xu(){return ji||(ji=1,Ea=Math.abs),Ea}var Ta,Fi;function vu(){return Fi||(Fi=1,Ta=Math.floor),Ta}var Sa,$i;function wu(){return $i||($i=1,Sa=Math.max),Sa}var ka,zi;function Eu(){return zi||(zi=1,ka=Math.min),ka}var Pa,Ui;function Tu(){return Ui||(Ui=1,Pa=Math.pow),Pa}var _a,qi;function Su(){return qi||(qi=1,_a=Math.round),_a}var Aa,Wi;function ku(){return Wi||(Wi=1,Aa=Number.isNaN||function(r){return r!==r}),Aa}var Ca,Hi;function Pu(){if(Hi)return Ca;Hi=1;var t=ku();return Ca=function(n){return t(n)||n===0?n:n<0?-1:1},Ca}var Ia,Gi;function _u(){return Gi||(Gi=1,Ia=Object.getOwnPropertyDescriptor),Ia}var Oa,Yi;function Yl(){if(Yi)return Oa;Yi=1;var t=_u();if(t)try{t([],"length")}catch{t=null}return Oa=t,Oa}var Ma,Vi;function Au(){if(Vi)return Ma;Vi=1;var t=Object.defineProperty||!1;if(t)try{t({},"a",{value:1})}catch{t=!1}return Ma=t,Ma}var Ra,Ki;function Cu(){return Ki||(Ki=1,Ra=function(){if(typeof Symbol!="function"||typeof Object.getOwnPropertySymbols!="function")return!1;if(typeof Symbol.iterator=="symbol")return!0;var r={},n=Symbol("test"),a=Object(n);if(typeof n=="string"||Object.prototype.toString.call(n)!=="[object Symbol]"||Object.prototype.toString.call(a)!=="[object Symbol]")return!1;var s=42;r[n]=s;for(var i in r)return!1;if(typeof Object.keys=="function"&&Object.keys(r).length!==0||typeof Object.getOwnPropertyNames=="function"&&Object.getOwnPropertyNames(r).length!==0)return!1;var o=Object.getOwnPropertySymbols(r);if(o.length!==1||o[0]!==n||!Object.prototype.propertyIsEnumerable.call(r,n))return!1;if(typeof Object.getOwnPropertyDescriptor=="function"){var l=Object.getOwnPropertyDescriptor(r,n);if(l.value!==s||l.enumerable!==!0)return!1}return!0}),Ra}var Na,Ji;function Iu(){if(Ji)return Na;Ji=1;var t=typeof Symbol<"u"&&Symbol,r=Cu();return Na=function(){return typeof t!="function"||typeof Symbol!="function"||typeof t("foo")!="symbol"||typeof Symbol("bar")!="symbol"?!1:r()},Na}var Ba,Xi;function Vl(){return Xi||(Xi=1,Ba=typeof Reflect<"u"&&Reflect.getPrototypeOf||null),Ba}var Da,Qi;function Kl(){if(Qi)return Da;Qi=1;var t=Gl();return Da=t.getPrototypeOf||null,Da}var La,Zi;function Ou(){if(Zi)return La;Zi=1;var t="Function.prototype.bind called on incompatible ",r=Object.prototype.toString,n=Math.max,a="[object Function]",s=function(c,u){for(var d=[],h=0;h<c.length;h+=1)d[h]=c[h];for(var g=0;g<u.length;g+=1)d[g+c.length]=u[g];return d},i=function(c,u){for(var d=[],h=u,g=0;h<c.length;h+=1,g+=1)d[g]=c[h];return d},o=function(l,c){for(var u="",d=0;d<l.length;d+=1)u+=l[d],d+1<l.length&&(u+=c);return u};return La=function(c){var u=this;if(typeof u!="function"||r.apply(u)!==a)throw new TypeError(t+u);for(var d=i(arguments,1),h,g=function(){if(this instanceof h){var v=u.apply(this,s(d,arguments));return Object(v)===v?v:this}return u.apply(c,s(d,arguments))},b=n(0,u.length-d.length),m=[],y=0;y<b;y++)m[y]="$"+y;if(h=Function("binder","return function ("+o(m,",")+"){ return binder.apply(this,arguments); }")(g),u.prototype){var f=function(){};f.prototype=u.prototype,h.prototype=new f,f.prototype=null}return h},La}var ja,eo;function zn(){if(eo)return ja;eo=1;var t=Ou();return ja=Function.prototype.bind||t,ja}var Fa,to;function Fs(){return to||(to=1,Fa=Function.prototype.call),Fa}var $a,ro;function Jl(){return ro||(ro=1,$a=Function.prototype.apply),$a}var za,no;function Mu(){return no||(no=1,za=typeof Reflect<"u"&&Reflect&&Reflect.apply),za}var Ua,ao;function Ru(){if(ao)return Ua;ao=1;var t=zn(),r=Jl(),n=Fs(),a=Mu();return Ua=a||t.call(n,r),Ua}var qa,so;function Xl(){if(so)return qa;so=1;var t=zn(),r=ar(),n=Fs(),a=Ru();return qa=function(i){if(i.length<1||typeof i[0]!="function")throw new r("a function is required");return a(t,n,i)},qa}var Wa,io;function Nu(){if(io)return Wa;io=1;var t=Xl(),r=Yl(),n;try{n=[].__proto__===Array.prototype}catch(o){if(!o||typeof o!="object"||!("code"in o)||o.code!=="ERR_PROTO_ACCESS")throw o}var a=!!n&&r&&r(Object.prototype,"__proto__"),s=Object,i=s.getPrototypeOf;return Wa=a&&typeof a.get=="function"?t([a.get]):typeof i=="function"?function(l){return i(l==null?l:s(l))}:!1,Wa}var Ha,oo;function Bu(){if(oo)return Ha;oo=1;var t=Vl(),r=Kl(),n=Nu();return Ha=t?function(s){return t(s)}:r?function(s){if(!s||typeof s!="object"&&typeof s!="function")throw new TypeError("getProto: not an object");return r(s)}:n?function(s){return n(s)}:null,Ha}var Ga,lo;function Du(){if(lo)return Ga;lo=1;var t=Function.prototype.call,r=Object.prototype.hasOwnProperty,n=zn();return Ga=n.call(t,r),Ga}var Ya,co;function $s(){if(co)return Ya;co=1;var t,r=Gl(),n=pu(),a=mu(),s=gu(),i=fu(),o=yu(),l=ar(),c=bu(),u=xu(),d=vu(),h=wu(),g=Eu(),b=Tu(),m=Su(),y=Pu(),f=Function,v=function(oe){try{return f('"use strict"; return ('+oe+").constructor;")()}catch{}},S=Yl(),P=Au(),_=function(){throw new l},C=S?(function(){try{return arguments.callee,_}catch{try{return S(arguments,"callee").get}catch{return _}}})():_,M=Iu()(),E=Bu(),A=Kl(),I=Vl(),R=Jl(),N=Fs(),L={},H=typeof Uint8Array>"u"||!E?t:E(Uint8Array),U={__proto__:null,"%AggregateError%":typeof AggregateError>"u"?t:AggregateError,"%Array%":Array,"%ArrayBuffer%":typeof ArrayBuffer>"u"?t:ArrayBuffer,"%ArrayIteratorPrototype%":M&&E?E([][Symbol.iterator]()):t,"%AsyncFromSyncIteratorPrototype%":t,"%AsyncFunction%":L,"%AsyncGenerator%":L,"%AsyncGeneratorFunction%":L,"%AsyncIteratorPrototype%":L,"%Atomics%":typeof Atomics>"u"?t:Atomics,"%BigInt%":typeof BigInt>"u"?t:BigInt,"%BigInt64Array%":typeof BigInt64Array>"u"?t:BigInt64Array,"%BigUint64Array%":typeof BigUint64Array>"u"?t:BigUint64Array,"%Boolean%":Boolean,"%DataView%":typeof DataView>"u"?t:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":n,"%eval%":eval,"%EvalError%":a,"%Float16Array%":typeof Float16Array>"u"?t:Float16Array,"%Float32Array%":typeof Float32Array>"u"?t:Float32Array,"%Float64Array%":typeof Float64Array>"u"?t:Float64Array,"%FinalizationRegistry%":typeof FinalizationRegistry>"u"?t:FinalizationRegistry,"%Function%":f,"%GeneratorFunction%":L,"%Int8Array%":typeof Int8Array>"u"?t:Int8Array,"%Int16Array%":typeof Int16Array>"u"?t:Int16Array,"%Int32Array%":typeof Int32Array>"u"?t:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":M&&E?E(E([][Symbol.iterator]())):t,"%JSON%":typeof JSON=="object"?JSON:t,"%Map%":typeof Map>"u"?t:Map,"%MapIteratorPrototype%":typeof Map>"u"||!M||!E?t:E(new Map()[Symbol.iterator]()),"%Math%":Math,"%Number%":Number,"%Object%":r,"%Object.getOwnPropertyDescriptor%":S,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":typeof Promise>"u"?t:Promise,"%Proxy%":typeof Proxy>"u"?t:Proxy,"%RangeError%":s,"%ReferenceError%":i,"%Reflect%":typeof Reflect>"u"?t:Reflect,"%RegExp%":RegExp,"%Set%":typeof Set>"u"?t:Set,"%SetIteratorPrototype%":typeof Set>"u"||!M||!E?t:E(new Set()[Symbol.iterator]()),"%SharedArrayBuffer%":typeof SharedArrayBuffer>"u"?t:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":M&&E?E(""[Symbol.iterator]()):t,"%Symbol%":M?Symbol:t,"%SyntaxError%":o,"%ThrowTypeError%":C,"%TypedArray%":H,"%TypeError%":l,"%Uint8Array%":typeof Uint8Array>"u"?t:Uint8Array,"%Uint8ClampedArray%":typeof Uint8ClampedArray>"u"?t:Uint8ClampedArray,"%Uint16Array%":typeof Uint16Array>"u"?t:Uint16Array,"%Uint32Array%":typeof Uint32Array>"u"?t:Uint32Array,"%URIError%":c,"%WeakMap%":typeof WeakMap>"u"?t:WeakMap,"%WeakRef%":typeof WeakRef>"u"?t:WeakRef,"%WeakSet%":typeof WeakSet>"u"?t:WeakSet,"%Function.prototype.call%":N,"%Function.prototype.apply%":R,"%Object.defineProperty%":P,"%Object.getPrototypeOf%":A,"%Math.abs%":u,"%Math.floor%":d,"%Math.max%":h,"%Math.min%":g,"%Math.pow%":b,"%Math.round%":m,"%Math.sign%":y,"%Reflect.getPrototypeOf%":I};if(E)try{null.error}catch(oe){var X=E(E(oe));U["%Error.prototype%"]=X}var F=function oe(z){var re;if(z==="%AsyncFunction%")re=v("async function () {}");else if(z==="%GeneratorFunction%")re=v("function* () {}");else if(z==="%AsyncGeneratorFunction%")re=v("async function* () {}");else if(z==="%AsyncGenerator%"){var V=oe("%AsyncGeneratorFunction%");V&&(re=V.prototype)}else if(z==="%AsyncIteratorPrototype%"){var ne=oe("%AsyncGenerator%");ne&&E&&(re=E(ne.prototype))}return U[z]=re,re},Y={__proto__:null,"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},O=zn(),ge=Du(),Be=O.call(N,Array.prototype.concat),dt=O.call(R,Array.prototype.splice),We=O.call(N,String.prototype.replace),He=O.call(N,String.prototype.slice),Ge=O.call(N,RegExp.prototype.exec),De=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,ve=/\\(\\)?/g,Ye=function(z){var re=He(z,0,1),V=He(z,-1);if(re==="%"&&V!=="%")throw new o("invalid intrinsic syntax, expected closing `%`");if(V==="%"&&re!=="%")throw new o("invalid intrinsic syntax, expected opening `%`");var ne=[];return We(z,De,function(de,we,ue,ye){ne[ne.length]=ue?We(ye,ve,"$1"):we||de}),ne},Ve=function(z,re){var V=z,ne;if(ge(Y,V)&&(ne=Y[V],V="%"+ne[0]+"%"),ge(U,V)){var de=U[V];if(de===L&&(de=F(V)),typeof de>"u"&&!re)throw new l("intrinsic "+z+" exists, but is not available. Please file an issue!");return{alias:ne,name:V,value:de}}throw new o("intrinsic "+z+" does not exist!")};return Ya=function(z,re){if(typeof z!="string"||z.length===0)throw new l("intrinsic name must be a non-empty string");if(arguments.length>1&&typeof re!="boolean")throw new l('"allowMissing" argument must be a boolean');if(Ge(/^%?[^%]*%?$/,z)===null)throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var V=Ye(z),ne=V.length>0?V[0]:"",de=Ve("%"+ne+"%",re),we=de.name,ue=de.value,ye=!1,Ee=de.alias;Ee&&(ne=Ee[0],dt(V,Be([0,1],Ee)));for(var At=1,Ke=!0;At<V.length;At+=1){var _e=V[At],Ct=He(_e,0,1),It=He(_e,-1);if((Ct==='"'||Ct==="'"||Ct==="`"||It==='"'||It==="'"||It==="`")&&Ct!==It)throw new o("property names with quotes must have matching quotes");if((_e==="constructor"||!Ke)&&(ye=!0),ne+="."+_e,we="%"+ne+"%",ge(U,we))ue=U[we];else if(ue!=null){if(!(_e in ue)){if(!re)throw new l("base intrinsic for "+z+" exists, but the property is not available.");return}if(S&&At+1>=V.length){var Ot=S(ue,_e);Ke=!!Ot,Ke&&"get"in Ot&&!("originalValue"in Ot.get)?ue=Ot.get:ue=ue[_e]}else Ke=ge(ue,_e),ue=ue[_e];Ke&&!ye&&(U[we]=ue)}}return ue},Ya}var Va,uo;function Ql(){if(uo)return Va;uo=1;var t=$s(),r=Xl(),n=r([t("%String.prototype.indexOf%")]);return Va=function(s,i){var o=t(s,!!i);return typeof o=="function"&&n(s,".prototype.")>-1?r([o]):o},Va}var Ka,ho;function Zl(){if(ho)return Ka;ho=1;var t=$s(),r=Ql(),n=$n(),a=ar(),s=t("%Map%",!0),i=r("Map.prototype.get",!0),o=r("Map.prototype.set",!0),l=r("Map.prototype.has",!0),c=r("Map.prototype.delete",!0),u=r("Map.prototype.size",!0);return Ka=!!s&&function(){var h,g={assert:function(b){if(!g.has(b))throw new a("Side channel does not contain "+n(b))},delete:function(b){if(h){var m=c(h,b);return u(h)===0&&(h=void 0),m}return!1},get:function(b){if(h)return i(h,b)},has:function(b){return h?l(h,b):!1},set:function(b,m){h||(h=new s),o(h,b,m)}};return g},Ka}var Ja,po;function Lu(){if(po)return Ja;po=1;var t=$s(),r=Ql(),n=$n(),a=Zl(),s=ar(),i=t("%WeakMap%",!0),o=r("WeakMap.prototype.get",!0),l=r("WeakMap.prototype.set",!0),c=r("WeakMap.prototype.has",!0),u=r("WeakMap.prototype.delete",!0);return Ja=i?function(){var h,g,b={assert:function(m){if(!b.has(m))throw new s("Side channel does not contain "+n(m))},delete:function(m){if(i&&m&&(typeof m=="object"||typeof m=="function")){if(h)return u(h,m)}else if(a&&g)return g.delete(m);return!1},get:function(m){return i&&m&&(typeof m=="object"||typeof m=="function")&&h?o(h,m):g&&g.get(m)},has:function(m){return i&&m&&(typeof m=="object"||typeof m=="function")&&h?c(h,m):!!g&&g.has(m)},set:function(m,y){i&&m&&(typeof m=="object"||typeof m=="function")?(h||(h=new i),l(h,m,y)):a&&(g||(g=a()),g.set(m,y))}};return b}:a,Ja}var Xa,mo;function ec(){if(mo)return Xa;mo=1;var t=ar(),r=$n(),n=hu(),a=Zl(),s=Lu(),i=s||a||n;return Xa=function(){var l,c={assert:function(u){if(!c.has(u))throw new t("Side channel does not contain "+r(u))},delete:function(u){return!!l&&l.delete(u)},get:function(u){return l&&l.get(u)},has:function(u){return!!l&&l.has(u)},set:function(u,d){l||(l=i()),l.set(u,d)}};return c},Xa}var Qa,go;function zs(){if(go)return Qa;go=1;var t=String.prototype.replace,r=/%20/g,n={RFC1738:"RFC1738",RFC3986:"RFC3986"};return Qa={default:n.RFC3986,formatters:{RFC1738:function(a){return t.call(a,r,"+")},RFC3986:function(a){return String(a)}},RFC1738:n.RFC1738,RFC3986:n.RFC3986},Qa}var Za,fo;function tc(){if(fo)return Za;fo=1;var t=zs(),r=ec(),n=Object.prototype.hasOwnProperty,a=Array.isArray,s=r(),i=function(E,A){return s.set(E,A),E},o=function(E){return s.has(E)},l=function(E){return s.get(E)},c=function(E,A){s.set(E,A)},u=(function(){for(var M=[],E=0;E<256;++E)M.push("%"+((E<16?"0":"")+E.toString(16)).toUpperCase());return M})(),d=function(E){for(;E.length>1;){var A=E.pop(),I=A.obj[A.prop];if(a(I)){for(var R=[],N=0;N<I.length;++N)typeof I[N]<"u"&&R.push(I[N]);A.obj[A.prop]=R}}},h=function(E,A){for(var I=A&&A.plainObjects?{__proto__:null}:{},R=0;R<E.length;++R)typeof E[R]<"u"&&(I[R]=E[R]);return I},g=function M(E,A,I){if(!A)return E;if(typeof A!="object"&&typeof A!="function"){if(a(E))E.push(A);else if(E&&typeof E=="object")if(o(E)){var R=l(E)+1;E[R]=A,c(E,R)}else(I&&(I.plainObjects||I.allowPrototypes)||!n.call(Object.prototype,A))&&(E[A]=!0);else return[E,A];return E}if(!E||typeof E!="object"){if(o(A)){for(var N=Object.keys(A),L=I&&I.plainObjects?{__proto__:null,0:E}:{0:E},H=0;H<N.length;H++){var U=parseInt(N[H],10);L[U+1]=A[N[H]]}return i(L,l(A)+1)}return[E].concat(A)}var X=E;return a(E)&&!a(A)&&(X=h(E,I)),a(E)&&a(A)?(A.forEach(function(F,Y){if(n.call(E,Y)){var O=E[Y];O&&typeof O=="object"&&F&&typeof F=="object"?E[Y]=M(O,F,I):E.push(F)}else E[Y]=F}),E):Object.keys(A).reduce(function(F,Y){var O=A[Y];return n.call(F,Y)?F[Y]=M(F[Y],O,I):F[Y]=O,F},X)},b=function(E,A){return Object.keys(A).reduce(function(I,R){return I[R]=A[R],I},E)},m=function(M,E,A){var I=M.replace(/\+/g," ");if(A==="iso-8859-1")return I.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(I)}catch{return I}},y=1024,f=function(E,A,I,R,N){if(E.length===0)return E;var L=E;if(typeof E=="symbol"?L=Symbol.prototype.toString.call(E):typeof E!="string"&&(L=String(E)),I==="iso-8859-1")return escape(L).replace(/%u[0-9a-f]{4}/gi,function(ge){return"%26%23"+parseInt(ge.slice(2),16)+"%3B"});for(var H="",U=0;U<L.length;U+=y){for(var X=L.length>=y?L.slice(U,U+y):L,F=[],Y=0;Y<X.length;++Y){var O=X.charCodeAt(Y);if(O===45||O===46||O===95||O===126||O>=48&&O<=57||O>=65&&O<=90||O>=97&&O<=122||N===t.RFC1738&&(O===40||O===41)){F[F.length]=X.charAt(Y);continue}if(O<128){F[F.length]=u[O];continue}if(O<2048){F[F.length]=u[192|O>>6]+u[128|O&63];continue}if(O<55296||O>=57344){F[F.length]=u[224|O>>12]+u[128|O>>6&63]+u[128|O&63];continue}Y+=1,O=65536+((O&1023)<<10|X.charCodeAt(Y)&1023),F[F.length]=u[240|O>>18]+u[128|O>>12&63]+u[128|O>>6&63]+u[128|O&63]}H+=F.join("")}return H},v=function(E){for(var A=[{obj:{o:E},prop:"o"}],I=[],R=0;R<A.length;++R)for(var N=A[R],L=N.obj[N.prop],H=Object.keys(L),U=0;U<H.length;++U){var X=H[U],F=L[X];typeof F=="object"&&F!==null&&I.indexOf(F)===-1&&(A.push({obj:L,prop:X}),I.push(F))}return d(A),E},S=function(E){return Object.prototype.toString.call(E)==="[object RegExp]"},P=function(E){return!E||typeof E!="object"?!1:!!(E.constructor&&E.constructor.isBuffer&&E.constructor.isBuffer(E))},_=function(E,A,I,R){if(o(E)){var N=l(E)+1;return E[N]=A,c(E,N),E}var L=[].concat(E,A);return L.length>I?i(h(L,{plainObjects:R}),L.length-1):L},C=function(E,A){if(a(E)){for(var I=[],R=0;R<E.length;R+=1)I.push(A(E[R]));return I}return A(E)};return Za={arrayToObject:h,assign:b,combine:_,compact:v,decode:m,encode:f,isBuffer:P,isOverflow:o,isRegExp:S,maybeMap:C,merge:g},Za}var es,yo;function ju(){if(yo)return es;yo=1;var t=ec(),r=tc(),n=zs(),a=Object.prototype.hasOwnProperty,s={brackets:function(f){return f+"[]"},comma:"comma",indices:function(f,v){return f+"["+v+"]"},repeat:function(f){return f}},i=Array.isArray,o=Array.prototype.push,l=function(y,f){o.apply(y,i(f)?f:[f])},c=Date.prototype.toISOString,u=n.default,d={addQueryPrefix:!1,allowDots:!1,allowEmptyArrays:!1,arrayFormat:"indices",charset:"utf-8",charsetSentinel:!1,commaRoundTrip:!1,delimiter:"&",encode:!0,encodeDotInKeys:!1,encoder:r.encode,encodeValuesOnly:!1,filter:void 0,format:u,formatter:n.formatters[u],indices:!1,serializeDate:function(f){return c.call(f)},skipNulls:!1,strictNullHandling:!1},h=function(f){return typeof f=="string"||typeof f=="number"||typeof f=="boolean"||typeof f=="symbol"||typeof f=="bigint"},g={},b=function y(f,v,S,P,_,C,M,E,A,I,R,N,L,H,U,X,F,Y){for(var O=f,ge=Y,Be=0,dt=!1;(ge=ge.get(g))!==void 0&&!dt;){var We=ge.get(f);if(Be+=1,typeof We<"u"){if(We===Be)throw new RangeError("Cyclic object value");dt=!0}typeof ge.get(g)>"u"&&(Be=0)}if(typeof I=="function"?O=I(v,O):O instanceof Date?O=L(O):S==="comma"&&i(O)&&(O=r.maybeMap(O,function(we){return we instanceof Date?L(we):we})),O===null){if(C)return A&&!X?A(v,d.encoder,F,"key",H):v;O=""}if(h(O)||r.isBuffer(O)){if(A){var He=X?v:A(v,d.encoder,F,"key",H);return[U(He)+"="+U(A(O,d.encoder,F,"value",H))]}return[U(v)+"="+U(String(O))]}var Ge=[];if(typeof O>"u")return Ge;var De;if(S==="comma"&&i(O))X&&A&&(O=r.maybeMap(O,A)),De=[{value:O.length>0?O.join(",")||null:void 0}];else if(i(I))De=I;else{var ve=Object.keys(O);De=R?ve.sort(R):ve}var Ye=E?String(v).replace(/\./g,"%2E"):String(v),Ve=P&&i(O)&&O.length===1?Ye+"[]":Ye;if(_&&i(O)&&O.length===0)return Ve+"[]";for(var oe=0;oe<De.length;++oe){var z=De[oe],re=typeof z=="object"&&z&&typeof z.value<"u"?z.value:O[z];if(!(M&&re===null)){var V=N&&E?String(z).replace(/\./g,"%2E"):String(z),ne=i(O)?typeof S=="function"?S(Ve,V):Ve:Ve+(N?"."+V:"["+V+"]");Y.set(f,Be);var de=t();de.set(g,Y),l(Ge,y(re,ne,S,P,_,C,M,E,S==="comma"&&X&&i(O)?null:A,I,R,N,L,H,U,X,F,de))}}return Ge},m=function(f){if(!f)return d;if(typeof f.allowEmptyArrays<"u"&&typeof f.allowEmptyArrays!="boolean")throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");if(typeof f.encodeDotInKeys<"u"&&typeof f.encodeDotInKeys!="boolean")throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");if(f.encoder!==null&&typeof f.encoder<"u"&&typeof f.encoder!="function")throw new TypeError("Encoder has to be a function.");var v=f.charset||d.charset;if(typeof f.charset<"u"&&f.charset!=="utf-8"&&f.charset!=="iso-8859-1")throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var S=n.default;if(typeof f.format<"u"){if(!a.call(n.formatters,f.format))throw new TypeError("Unknown format option provided.");S=f.format}var P=n.formatters[S],_=d.filter;(typeof f.filter=="function"||i(f.filter))&&(_=f.filter);var C;if(f.arrayFormat in s?C=f.arrayFormat:"indices"in f?C=f.indices?"indices":"repeat":C=d.arrayFormat,"commaRoundTrip"in f&&typeof f.commaRoundTrip!="boolean")throw new TypeError("`commaRoundTrip` must be a boolean, or absent");var M=typeof f.allowDots>"u"?f.encodeDotInKeys===!0?!0:d.allowDots:!!f.allowDots;return{addQueryPrefix:typeof f.addQueryPrefix=="boolean"?f.addQueryPrefix:d.addQueryPrefix,allowDots:M,allowEmptyArrays:typeof f.allowEmptyArrays=="boolean"?!!f.allowEmptyArrays:d.allowEmptyArrays,arrayFormat:C,charset:v,charsetSentinel:typeof f.charsetSentinel=="boolean"?f.charsetSentinel:d.charsetSentinel,commaRoundTrip:!!f.commaRoundTrip,delimiter:typeof f.delimiter>"u"?d.delimiter:f.delimiter,encode:typeof f.encode=="boolean"?f.encode:d.encode,encodeDotInKeys:typeof f.encodeDotInKeys=="boolean"?f.encodeDotInKeys:d.encodeDotInKeys,encoder:typeof f.encoder=="function"?f.encoder:d.encoder,encodeValuesOnly:typeof f.encodeValuesOnly=="boolean"?f.encodeValuesOnly:d.encodeValuesOnly,filter:_,format:S,formatter:P,serializeDate:typeof f.serializeDate=="function"?f.serializeDate:d.serializeDate,skipNulls:typeof f.skipNulls=="boolean"?f.skipNulls:d.skipNulls,sort:typeof f.sort=="function"?f.sort:null,strictNullHandling:typeof f.strictNullHandling=="boolean"?f.strictNullHandling:d.strictNullHandling}};return es=function(y,f){var v=y,S=m(f),P,_;typeof S.filter=="function"?(_=S.filter,v=_("",v)):i(S.filter)&&(_=S.filter,P=_);var C=[];if(typeof v!="object"||v===null)return"";var M=s[S.arrayFormat],E=M==="comma"&&S.commaRoundTrip;P||(P=Object.keys(v)),S.sort&&P.sort(S.sort);for(var A=t(),I=0;I<P.length;++I){var R=P[I],N=v[R];S.skipNulls&&N===null||l(C,b(N,R,M,E,S.allowEmptyArrays,S.strictNullHandling,S.skipNulls,S.encodeDotInKeys,S.encode?S.encoder:null,S.filter,S.sort,S.allowDots,S.serializeDate,S.format,S.formatter,S.encodeValuesOnly,S.charset,A))}var L=C.join(S.delimiter),H=S.addQueryPrefix===!0?"?":"";return S.charsetSentinel&&(S.charset==="iso-8859-1"?H+="utf8=%26%2310003%3B&":H+="utf8=%E2%9C%93&"),L.length>0?H+L:""},es}var ts,bo;function Fu(){if(bo)return ts;bo=1;var t=tc(),r=Object.prototype.hasOwnProperty,n=Array.isArray,a={allowDots:!1,allowEmptyArrays:!1,allowPrototypes:!1,allowSparse:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decodeDotInKeys:!1,decoder:t.decode,delimiter:"&",depth:5,duplicates:"combine",ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictDepth:!1,strictNullHandling:!1,throwOnLimitExceeded:!1},s=function(b){return b.replace(/&#(\d+);/g,function(m,y){return String.fromCharCode(parseInt(y,10))})},i=function(b,m,y){if(b&&typeof b=="string"&&m.comma&&b.indexOf(",")>-1)return b.split(",");if(m.throwOnLimitExceeded&&y>=m.arrayLimit)throw new RangeError("Array limit exceeded. Only "+m.arrayLimit+" element"+(m.arrayLimit===1?"":"s")+" allowed in an array.");return b},o="utf8=%26%2310003%3B",l="utf8=%E2%9C%93",c=function(m,y){var f={__proto__:null},v=y.ignoreQueryPrefix?m.replace(/^\?/,""):m;v=v.replace(/%5B/gi,"[").replace(/%5D/gi,"]");var S=y.parameterLimit===1/0?void 0:y.parameterLimit,P=v.split(y.delimiter,y.throwOnLimitExceeded?S+1:S);if(y.throwOnLimitExceeded&&P.length>S)throw new RangeError("Parameter limit exceeded. Only "+S+" parameter"+(S===1?"":"s")+" allowed.");var _=-1,C,M=y.charset;if(y.charsetSentinel)for(C=0;C<P.length;++C)P[C].indexOf("utf8=")===0&&(P[C]===l?M="utf-8":P[C]===o&&(M="iso-8859-1"),_=C,C=P.length);for(C=0;C<P.length;++C)if(C!==_){var E=P[C],A=E.indexOf("]="),I=A===-1?E.indexOf("="):A+1,R,N;if(I===-1?(R=y.decoder(E,a.decoder,M,"key"),N=y.strictNullHandling?null:""):(R=y.decoder(E.slice(0,I),a.decoder,M,"key"),R!==null&&(N=t.maybeMap(i(E.slice(I+1),y,n(f[R])?f[R].length:0),function(H){return y.decoder(H,a.decoder,M,"value")}))),N&&y.interpretNumericEntities&&M==="iso-8859-1"&&(N=s(String(N))),E.indexOf("[]=")>-1&&(N=n(N)?[N]:N),R!==null){var L=r.call(f,R);L&&y.duplicates==="combine"?f[R]=t.combine(f[R],N,y.arrayLimit,y.plainObjects):(!L||y.duplicates==="last")&&(f[R]=N)}}return f},u=function(b,m,y,f){var v=0;if(b.length>0&&b[b.length-1]==="[]"){var S=b.slice(0,-1).join("");v=Array.isArray(m)&&m[S]?m[S].length:0}for(var P=f?m:i(m,y,v),_=b.length-1;_>=0;--_){var C,M=b[_];if(M==="[]"&&y.parseArrays)t.isOverflow(P)?C=P:C=y.allowEmptyArrays&&(P===""||y.strictNullHandling&&P===null)?[]:t.combine([],P,y.arrayLimit,y.plainObjects);else{C=y.plainObjects?{__proto__:null}:{};var E=M.charAt(0)==="["&&M.charAt(M.length-1)==="]"?M.slice(1,-1):M,A=y.decodeDotInKeys?E.replace(/%2E/g,"."):E,I=parseInt(A,10);!y.parseArrays&&A===""?C={0:P}:!isNaN(I)&&M!==A&&String(I)===A&&I>=0&&y.parseArrays&&I<=y.arrayLimit?(C=[],C[I]=P):A!=="__proto__"&&(C[A]=P)}P=C}return P},d=function(m,y){var f=y.allowDots?m.replace(/\.([^.[]+)/g,"[$1]"):m;if(y.depth<=0)return!y.plainObjects&&r.call(Object.prototype,f)&&!y.allowPrototypes?void 0:[f];var v=/(\[[^[\]]*])/,S=/(\[[^[\]]*])/g,P=v.exec(f),_=P?f.slice(0,P.index):f,C=[];if(_){if(!y.plainObjects&&r.call(Object.prototype,_)&&!y.allowPrototypes)return;C.push(_)}for(var M=0;(P=S.exec(f))!==null&&M<y.depth;){M+=1;var E=P[1].slice(1,-1);if(!y.plainObjects&&r.call(Object.prototype,E)&&!y.allowPrototypes)return;C.push(P[1])}if(P){if(y.strictDepth===!0)throw new RangeError("Input depth exceeded depth option of "+y.depth+" and strictDepth is true");C.push("["+f.slice(P.index)+"]")}return C},h=function(m,y,f,v){if(m){var S=d(m,f);if(S)return u(S,y,f,v)}},g=function(m){if(!m)return a;if(typeof m.allowEmptyArrays<"u"&&typeof m.allowEmptyArrays!="boolean")throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");if(typeof m.decodeDotInKeys<"u"&&typeof m.decodeDotInKeys!="boolean")throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");if(m.decoder!==null&&typeof m.decoder<"u"&&typeof m.decoder!="function")throw new TypeError("Decoder has to be a function.");if(typeof m.charset<"u"&&m.charset!=="utf-8"&&m.charset!=="iso-8859-1")throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");if(typeof m.throwOnLimitExceeded<"u"&&typeof m.throwOnLimitExceeded!="boolean")throw new TypeError("`throwOnLimitExceeded` option must be a boolean");var y=typeof m.charset>"u"?a.charset:m.charset,f=typeof m.duplicates>"u"?a.duplicates:m.duplicates;if(f!=="combine"&&f!=="first"&&f!=="last")throw new TypeError("The duplicates option must be either combine, first, or last");var v=typeof m.allowDots>"u"?m.decodeDotInKeys===!0?!0:a.allowDots:!!m.allowDots;return{allowDots:v,allowEmptyArrays:typeof m.allowEmptyArrays=="boolean"?!!m.allowEmptyArrays:a.allowEmptyArrays,allowPrototypes:typeof m.allowPrototypes=="boolean"?m.allowPrototypes:a.allowPrototypes,allowSparse:typeof m.allowSparse=="boolean"?m.allowSparse:a.allowSparse,arrayLimit:typeof m.arrayLimit=="number"?m.arrayLimit:a.arrayLimit,charset:y,charsetSentinel:typeof m.charsetSentinel=="boolean"?m.charsetSentinel:a.charsetSentinel,comma:typeof m.comma=="boolean"?m.comma:a.comma,decodeDotInKeys:typeof m.decodeDotInKeys=="boolean"?m.decodeDotInKeys:a.decodeDotInKeys,decoder:typeof m.decoder=="function"?m.decoder:a.decoder,delimiter:typeof m.delimiter=="string"||t.isRegExp(m.delimiter)?m.delimiter:a.delimiter,depth:typeof m.depth=="number"||m.depth===!1?+m.depth:a.depth,duplicates:f,ignoreQueryPrefix:m.ignoreQueryPrefix===!0,interpretNumericEntities:typeof m.interpretNumericEntities=="boolean"?m.interpretNumericEntities:a.interpretNumericEntities,parameterLimit:typeof m.parameterLimit=="number"?m.parameterLimit:a.parameterLimit,parseArrays:m.parseArrays!==!1,plainObjects:typeof m.plainObjects=="boolean"?m.plainObjects:a.plainObjects,strictDepth:typeof m.strictDepth=="boolean"?!!m.strictDepth:a.strictDepth,strictNullHandling:typeof m.strictNullHandling=="boolean"?m.strictNullHandling:a.strictNullHandling,throwOnLimitExceeded:typeof m.throwOnLimitExceeded=="boolean"?m.throwOnLimitExceeded:!1}};return ts=function(b,m){var y=g(m);if(b===""||b===null||typeof b>"u")return y.plainObjects?{__proto__:null}:{};for(var f=typeof b=="string"?c(b,y):b,v=y.plainObjects?{__proto__:null}:{},S=Object.keys(f),P=0;P<S.length;++P){var _=S[P],C=h(_,f[_],y,typeof b=="string");v=t.merge(v,C,y)}return y.allowSparse===!0?v:t.compact(v)},ts}var rs,xo;function $u(){if(xo)return rs;xo=1;var t=ju(),r=Fu(),n=zs();return rs={formats:n,parse:r,stringify:t},rs}var zu=$u();const Us=["apiKey","idempotencyKey","stripeAccount","apiVersion","maxNetworkRetries","timeout","host","authenticator","stripeContext","additionalHeaders","streaming"];function rc(t){return t&&typeof t=="object"&&Us.some(r=>Object.prototype.hasOwnProperty.call(t,r))}function Un(t,r){return zu.stringify(t,{serializeDate:n=>Math.floor(n.getTime()/1e3).toString(),arrayFormat:"indices"}).replace(/%5B/g,"[").replace(/%5D/g,"]")}const Ps=(()=>{const t={"\n":"\\n",'"':'\\"',"\u2028":"\\u2028","\u2029":"\\u2029"};return r=>{const n=r.replace(/["\n\r\u2028\u2029]/g,a=>t[a]);return a=>n.replace(/\{([\s\S]+?)\}/g,(s,i)=>{const o=a[i];return Uu(o)?encodeURIComponent(o):""})}})();function Uu(t){return["number","string","boolean"].includes(typeof t)}function qu(t){const r=t.match(/\{\w+\}/g);return r?r.map(n=>n.replace(/[{}]/g,"")):[]}function qs(t){if(!Array.isArray(t)||!t[0]||typeof t[0]!="object")return{};if(!rc(t[0]))return t.shift();const r=Object.keys(t[0]),n=r.filter(a=>Us.includes(a));return n.length>0&&n.length!==r.length&&Dn(`Options found in arguments (${n.join(", ")}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options.`),{}}function nc(t){const r={host:null,headers:{},settings:{},streaming:!1};if(t.length>0){const n=t[t.length-1];if(typeof n=="string")r.authenticator=_s(t.pop());else if(rc(n)){const a=Object.assign({},t.pop()),s=Object.keys(a).filter(i=>!Us.includes(i));if(s.length&&Dn(`Invalid options found (${s.join(", ")}); ignoring.`),a.apiKey&&(r.authenticator=_s(a.apiKey)),a.idempotencyKey&&(r.headers["Idempotency-Key"]=a.idempotencyKey),a.stripeAccount&&(r.headers["Stripe-Account"]=a.stripeAccount),a.stripeContext){if(r.headers["Stripe-Account"])throw new Error("Can't specify both stripeAccount and stripeContext.");r.headers["Stripe-Context"]=a.stripeContext}if(a.apiVersion&&(r.headers["Stripe-Version"]=a.apiVersion),Number.isInteger(a.maxNetworkRetries)&&(r.settings.maxNetworkRetries=a.maxNetworkRetries),Number.isInteger(a.timeout)&&(r.settings.timeout=a.timeout),a.host&&(r.host=a.host),a.authenticator){if(a.apiKey)throw new Error("Can't specify both apiKey and authenticator.");if(typeof a.authenticator!="function")throw new Error("The authenticator must be a function receiving a request as the first parameter.");r.authenticator=a.authenticator}a.additionalHeaders&&(r.headers=a.additionalHeaders),a.streaming&&(r.streaming=!0)}}return r}function Wu(t){const r=this,n=Object.prototype.hasOwnProperty.call(t,"constructor")?t.constructor:function(...a){r.apply(this,a)};return Object.assign(n,r),n.prototype=Object.create(r.prototype),Object.assign(n.prototype,t),n}function ns(t){if(typeof t!="object")throw new Error("Argument must be an object");return Object.keys(t).reduce((r,n)=>(t[n]!=null&&(r[n]=t[n]),r),{})}function Hu(t){return t&&typeof t=="object"?Object.keys(t).reduce((r,n)=>(r[Gu(n)]=t[n],r),{}):t}function Gu(t){return t.split("-").map(r=>r.charAt(0).toUpperCase()+r.substr(1).toLowerCase()).join("-")}function Ws(t,r){return r?t.then(n=>{setTimeout(()=>{r(null,n)},0)},n=>{setTimeout(()=>{r(n,null)},0)}):t}function Yu(t){return t==="OAuth"?"oauth":t[0].toLowerCase()+t.substring(1)}function Dn(t){return typeof process.emitWarning!="function"?console.warn(`Stripe: ${t}`):process.emitWarning(t,"Stripe")}function Vu(t){const r=typeof t;return(r==="function"||r==="object")&&!!t}function Ku(t){const r={},n=(a,s)=>{Object.entries(a).forEach(([i,o])=>{const l=s?`${s}[${i}]`:i;if(Vu(o)){if(!(o instanceof Uint8Array)&&!Object.prototype.hasOwnProperty.call(o,"data"))return n(o,l);r[l]=o}else r[l]=String(o)})};return n(t,null),r}function as(t,r,n){if(!Number.isInteger(r)){if(n!==void 0)return n;throw new Error(`${t} must be an integer`)}return r}function Ju(){return typeof process>"u"?{}:{lang_version:process.version,platform:process.platform}}function _s(t){const r=n=>(n.headers.Authorization="Bearer "+t,Promise.resolve());return r._apiKey=t,r}function Xu(t,r){return this[t]instanceof Date?Math.floor(this[t].getTime()/1e3).toString():r}function Qu(t){return JSON.stringify(t,Xu)}function Hs(t){return t&&t.startsWith("/v2")?"v2":"v1"}function As(t){return Array.isArray(t)?t.join(", "):String(t)}function Zu(t){const r=Array.isArray(t)?t[0]:t;return Number(r)}function eh(t){return Object.entries(t).map(([r,n])=>[r,As(n)])}class ke{getClientName(){throw new Error("getClientName not implemented.")}makeRequest(r,n,a,s,i,o,l,c){throw new Error("makeRequest not implemented.")}static makeTimeoutError(){const r=new TypeError(ke.TIMEOUT_ERROR_CODE);return r.code=ke.TIMEOUT_ERROR_CODE,r}}ke.CONNECTION_CLOSED_ERROR_CODES=["ECONNRESET","EPIPE"];ke.TIMEOUT_ERROR_CODE="ETIMEDOUT";class ac{constructor(r,n){this._statusCode=r,this._headers=n}getStatusCode(){return this._statusCode}getHeaders(){return this._headers}getRawResponse(){throw new Error("getRawResponse not implemented.")}toStream(r){throw new Error("toStream not implemented.")}toJSON(){throw new Error("toJSON not implemented.")}}class Ln extends ke{constructor(r){if(super(),!r){if(!globalThis.fetch)throw new Error("fetch() function not provided and is not defined in the global scope. You must provide a fetch implementation.");r=globalThis.fetch}globalThis.AbortController?this._fetchFn=Ln.makeFetchWithAbortTimeout(r):this._fetchFn=Ln.makeFetchWithRaceTimeout(r)}static makeFetchWithRaceTimeout(r){return(n,a,s)=>{let i;const o=new Promise((c,u)=>{i=setTimeout(()=>{i=null,u(ke.makeTimeoutError())},s)}),l=r(n,a);return Promise.race([l,o]).finally(()=>{i&&clearTimeout(i)})}}static makeFetchWithAbortTimeout(r){return async(n,a,s)=>{const i=new AbortController;let o=setTimeout(()=>{o=null,i.abort(ke.makeTimeoutError())},s);try{return await r(n,Object.assign(Object.assign({},a),{signal:i.signal}))}catch(l){throw l.name==="AbortError"?ke.makeTimeoutError():l}finally{o&&clearTimeout(o)}}}getClientName(){return"fetch"}async makeRequest(r,n,a,s,i,o,l,c){const u=l==="http",d=new URL(a,`${u?"http":"https"}://${r}`);d.port=n;const h=s=="POST"||s=="PUT"||s=="PATCH",g=o||(h?"":void 0),b=await this._fetchFn(d.toString(),{method:s,headers:eh(i),body:g},c);return new Gs(b)}}class Gs extends ac{constructor(r){super(r.status,Gs._transformHeadersToObject(r.headers)),this._res=r}getRawResponse(){return this._res}toStream(r){return r(),this._res.body}toJSON(){return this._res.json()}static _transformHeadersToObject(r){const n={};for(const a of r){if(!Array.isArray(a)||a.length!=2)throw new Error("Response objects produced by the fetch function given to FetchHttpClient do not have an iterable headers map. Response#headers should be an iterable object.");n[a[0]]=a[1]}return n}}class sc{computeHMACSignature(r,n){throw new Error("computeHMACSignature not implemented.")}computeHMACSignatureAsync(r,n){throw new Error("computeHMACSignatureAsync not implemented.")}computeSHA256Async(r){throw new Error("computeSHA256 not implemented.")}}class ic extends Error{}class th extends sc{constructor(r){super(),this.subtleCrypto=r||crypto.subtle}computeHMACSignature(r,n){throw new ic("SubtleCryptoProvider cannot be used in a synchronous context.")}async computeHMACSignatureAsync(r,n){const a=new TextEncoder,s=await this.subtleCrypto.importKey("raw",a.encode(n),{name:"HMAC",hash:{name:"SHA-256"}},!1,["sign"]),i=await this.subtleCrypto.sign("hmac",s,a.encode(r)),o=new Uint8Array(i),l=new Array(o.length);for(let c=0;c<o.length;c++)l[c]=Cs[o[c]];return l.join("")}async computeSHA256Async(r){return new Uint8Array(await this.subtleCrypto.digest("SHA-256",r))}}const Cs=new Array(256);for(let t=0;t<Cs.length;t++)Cs[t]=t.toString(16).padStart(2,"0");class rh{constructor(){this._fetchFn=null,this._agent=null}getUname(){throw new Error("getUname not implemented.")}uuid4(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,r=>{const n=Math.random()*16|0;return(r==="x"?n:n&3|8).toString(16)})}secureCompare(r,n){if(r.length!==n.length)return!1;const a=r.length;let s=0;for(let i=0;i<a;++i)s|=r.charCodeAt(i)^n.charCodeAt(i);return s===0}createEmitter(){throw new Error("createEmitter not implemented.")}tryBufferData(r){throw new Error("tryBufferData not implemented.")}createNodeHttpClient(r){throw new Error("createNodeHttpClient not implemented.")}createFetchHttpClient(r){return new Ln(r)}createDefaultHttpClient(){throw new Error("createDefaultHttpClient not implemented.")}createNodeCryptoProvider(){throw new Error("createNodeCryptoProvider not implemented.")}createSubtleCryptoProvider(r){return new th(r)}createDefaultCryptoProvider(){throw new Error("createDefaultCryptoProvider not implemented.")}}class nh extends Event{constructor(r,n){super(r),this.data=n}}class ah{constructor(){this.eventTarget=new EventTarget,this.listenerMapping=new Map}on(r,n){const a=s=>{n(s.data)};return this.listenerMapping.set(n,a),this.eventTarget.addEventListener(r,a)}removeListener(r,n){const a=this.listenerMapping.get(n);return this.listenerMapping.delete(n),this.eventTarget.removeEventListener(r,a)}once(r,n){const a=s=>{n(s.data)};return this.listenerMapping.set(n,a),this.eventTarget.addEventListener(r,a,{once:!0})}emit(r,n){return this.eventTarget.dispatchEvent(new nh(r,n))}}class sh extends rh{getUname(){return Promise.resolve(null)}createEmitter(){return new ah}tryBufferData(r){if(r.file.data instanceof ReadableStream)throw new Error("Uploading a file as a stream is not supported in non-Node environments. Please open or upvote an issue at github.com/stripe/stripe-node if you use this, detailing your use-case.");return Promise.resolve(r)}createNodeHttpClient(){throw new Error("Stripe: `createNodeHttpClient()` is not available in non-Node environments. Please use `createFetchHttpClient()` instead.")}createDefaultHttpClient(){return super.createFetchHttpClient()}createNodeCryptoProvider(){throw new Error("Stripe: `createNodeCryptoProvider()` is not available in non-Node environments. Please use `createSubtleCryptoProvider()` instead.")}createDefaultCryptoProvider(){return this.createSubtleCryptoProvider()}}const qn=t=>{switch(t.type){case"card_error":return new lc(t);case"invalid_request_error":return new Ys(t);case"api_error":return new Vs(t);case"authentication_error":return new Ks(t);case"rate_limit_error":return new Js(t);case"idempotency_error":return new uc(t);case"invalid_grant":return new hc(t);default:return new pc(t)}},oc=t=>{switch(t.type){case"temporary_session_expired":return new mc(t)}switch(t.code){case"invalid_fields":return new Ys(t)}return qn(t)};class pe extends Error{constructor(r={},n=null){var a;super(r.message),this.type=n||this.constructor.name,this.raw=r,this.rawType=r.type,this.code=r.code,this.doc_url=r.doc_url,this.param=r.param,this.detail=r.detail,this.headers=r.headers,this.requestId=r.requestId,this.statusCode=r.statusCode,this.message=(a=r.message)!==null&&a!==void 0?a:"",this.userMessage=r.user_message,this.charge=r.charge,this.decline_code=r.decline_code,this.payment_intent=r.payment_intent,this.payment_method=r.payment_method,this.payment_method_type=r.payment_method_type,this.setup_intent=r.setup_intent,this.source=r.source}}pe.generate=qn;class lc extends pe{constructor(r={}){super(r,"StripeCardError")}}class Ys extends pe{constructor(r={}){super(r,"StripeInvalidRequestError")}}class Vs extends pe{constructor(r={}){super(r,"StripeAPIError")}}class Ks extends pe{constructor(r={}){super(r,"StripeAuthenticationError")}}class cc extends pe{constructor(r={}){super(r,"StripePermissionError")}}class Js extends pe{constructor(r={}){super(r,"StripeRateLimitError")}}class dc extends pe{constructor(r={}){super(r,"StripeConnectionError")}}class rt extends pe{constructor(r,n,a={}){super(a,"StripeSignatureVerificationError"),this.header=r,this.payload=n}}class uc extends pe{constructor(r={}){super(r,"StripeIdempotencyError")}}class hc extends pe{constructor(r={}){super(r,"StripeInvalidGrantError")}}class pc extends pe{constructor(r={}){super(r,"StripeUnknownError")}}class mc extends pe{constructor(r={}){super(r,"TemporarySessionExpiredError")}}const vo=Object.freeze(Object.defineProperty({__proto__:null,StripeAPIError:Vs,StripeAuthenticationError:Ks,StripeCardError:lc,StripeConnectionError:dc,StripeError:pe,StripeIdempotencyError:uc,StripeInvalidGrantError:hc,StripeInvalidRequestError:Ys,StripePermissionError:cc,StripeRateLimitError:Js,StripeSignatureVerificationError:rt,StripeUnknownError:pc,TemporarySessionExpiredError:mc,generateV1Error:qn,generateV2Error:oc},Symbol.toStringTag,{value:"Module"})),ih=60;class Nr{constructor(r,n){this._stripe=r,this._maxBufferedRequestMetric=n}_normalizeStripeContext(r,n){return r?r.toString()||null:(n==null?void 0:n.toString())||null}_addHeadersDirectlyToObject(r,n){r.requestId=n["request-id"],r.stripeAccount=r.stripeAccount||n["stripe-account"],r.apiVersion=r.apiVersion||n["stripe-version"],r.idempotencyKey=r.idempotencyKey||n["idempotency-key"]}_makeResponseEvent(r,n,a){const s=Date.now(),i=s-r.request_start_time;return ns({api_version:a["stripe-version"],account:a["stripe-account"],idempotency_key:a["idempotency-key"],method:r.method,path:r.path,status:n,request_id:this._getRequestId(a),elapsed:i,request_start_time:r.request_start_time,request_end_time:s})}_getRequestId(r){return r["request-id"]}_streamingResponseHandler(r,n,a){return s=>{const i=s.getHeaders(),o=()=>{const c=this._makeResponseEvent(r,s.getStatusCode(),i);this._stripe._emitter.emit("response",c),this._recordRequestMetrics(this._getRequestId(i),c.elapsed,n)},l=s.toStream(o);return this._addHeadersDirectlyToObject(l,i),a(null,l)}}_jsonResponseHandler(r,n,a,s){return i=>{const o=i.getHeaders(),l=this._getRequestId(o),c=i.getStatusCode(),u=this._makeResponseEvent(r,c,o);this._stripe._emitter.emit("response",u),i.toJSON().then(d=>{if(d.error){let h;throw typeof d.error=="string"&&(d.error={type:d.error,message:d.error_description}),d.error.headers=o,d.error.statusCode=c,d.error.requestId=l,c===401?h=new Ks(d.error):c===403?h=new cc(d.error):c===429?h=new Js(d.error):n==="v2"?h=oc(d.error):h=qn(d.error),h}return d},d=>{throw new Vs({message:"Invalid JSON received from the Stripe API",exception:d,requestId:o["request-id"]})}).then(d=>{this._recordRequestMetrics(l,u.elapsed,a);const h=i.getRawResponse();this._addHeadersDirectlyToObject(h,o),Object.defineProperty(d,"lastResponse",{enumerable:!1,writable:!1,value:h}),s(null,d)},d=>s(d,null))}}static _generateConnectionErrorMessage(r){return`An error occurred with our connection to Stripe.${r>0?` Request was retried ${r} times.`:""}`}static _shouldRetry(r,n,a,s){return s&&n===0&&ke.CONNECTION_CLOSED_ERROR_CODES.includes(s.code)?!0:n>=a?!1:r?r.getHeaders()["stripe-should-retry"]==="false"?!1:r.getHeaders()["stripe-should-retry"]==="true"||r.getStatusCode()===409||r.getStatusCode()>=500:!0}_getSleepTimeInMS(r,n=null){const a=this._stripe.getInitialNetworkRetryDelay(),s=this._stripe.getMaxNetworkRetryDelay();let i=Math.min(a*Math.pow(2,r-1),s);return i*=.5*(1+Math.random()),i=Math.max(a,i),Number.isInteger(n)&&n<=ih&&(i=Math.max(i,n)),i*1e3}_getMaxNetworkRetries(r={}){return r.maxNetworkRetries!==void 0&&Number.isInteger(r.maxNetworkRetries)?r.maxNetworkRetries:this._stripe.getMaxNetworkRetries()}_defaultIdempotencyKey(r,n,a){const s=this._getMaxNetworkRetries(n),i=()=>`stripe-node-retry-${this._stripe._platformFunctions.uuid4()}`;if(a==="v2"){if(r==="POST"||r==="DELETE")return i()}else if(a==="v1"&&r==="POST"&&s>0)return i();return null}_makeHeaders({contentType:r,contentLength:n,apiVersion:a,clientUserAgent:s,method:i,userSuppliedHeaders:o,userSuppliedSettings:l,stripeAccount:c,stripeContext:u,apiMode:d}){const h={Accept:"application/json","Content-Type":r,"User-Agent":this._getUserAgentString(d),"X-Stripe-Client-User-Agent":s,"X-Stripe-Client-Telemetry":this._getTelemetryHeader(),"Stripe-Version":a,"Stripe-Account":c,"Stripe-Context":u,"Idempotency-Key":this._defaultIdempotencyKey(i,l,d)},g=i=="POST"||i=="PUT"||i=="PATCH";return(g||n)&&(g||Dn(`${i} method had non-zero contentLength but no payload is expected for this verb`),h["Content-Length"]=n),Object.assign(ns(h),Hu(o))}_getUserAgentString(r){const n=this._stripe.getConstant("PACKAGE_VERSION"),a=this._stripe._appInfo?this._stripe.getAppInfoAsString():"";return`Stripe/${r} NodeBindings/${n} ${a}`.trim()}_getTelemetryHeader(){if(this._stripe.getTelemetryEnabled()&&this._stripe._prevRequestMetrics.length>0){const r=this._stripe._prevRequestMetrics.shift();return JSON.stringify({last_request_metrics:r})}}_recordRequestMetrics(r,n,a){if(this._stripe.getTelemetryEnabled()&&r)if(this._stripe._prevRequestMetrics.length>this._maxBufferedRequestMetric)Dn("Request metrics buffer is full, dropping telemetry message.");else{const s={request_id:r,request_duration_ms:n};a&&a.length>0&&(s.usage=a),this._stripe._prevRequestMetrics.push(s)}}_rawRequest(r,n,a,s,i){return new Promise((l,c)=>{let u;try{const m=r.toUpperCase();if(m!=="POST"&&a&&Object.keys(a).length!==0)throw new Error("rawRequest only supports params on POST requests. Please pass null and add your parameters to path.");const y=[].slice.call([a,s]),f=qs(y),v=m==="POST"?Object.assign({},f):null,S=nc(y),P=S.headers,_=S.authenticator;u={requestMethod:m,requestPath:n,bodyData:v,queryData:{},authenticator:_,headers:P,host:S.host,streaming:!!S.streaming,settings:{},usage:i||["raw_request"]}}catch(m){c(m);return}function d(m,y){m?c(m):l(y)}const{headers:h,settings:g}=u,b=u.authenticator;this._request(u.requestMethod,u.host,n,u.bodyData,b,{headers:h,settings:g,streaming:u.streaming},u.usage,d)})}_getContentLength(r){return typeof r=="string"?new TextEncoder().encode(r).length:r.length}_request(r,n,a,s,i,o,l=[],c,u=null){var d;let h;i=(d=i??this._stripe._authenticator)!==null&&d!==void 0?d:null;const g=Hs(a),b=(f,v,S,P,_)=>setTimeout(f,this._getSleepTimeInMS(P,_),v,S,P+1),m=(f,v,S)=>{const P=o.settings&&o.settings.timeout&&Number.isInteger(o.settings.timeout)&&o.settings.timeout>=0?o.settings.timeout:this._stripe.getApiField("timeout"),_={host:n||this._stripe.getApiField("host"),port:this._stripe.getApiField("port"),path:a,method:r,headers:Object.assign({},v),body:h,protocol:this._stripe.getApiField("protocol")};i(_).then(()=>{const C=this._stripe.getApiField("httpClient").makeRequest(_.host,_.port,_.path,_.method,_.headers,_.body,_.protocol,P),M=Date.now(),E=ns({api_version:f,account:As(v["Stripe-Account"]),idempotency_key:As(v["Idempotency-Key"]),method:r,path:a,request_start_time:M}),A=S||0,I=this._getMaxNetworkRetries(o.settings||{});this._stripe._emitter.emit("request",E),C.then(R=>Nr._shouldRetry(R,A,I)?b(m,f,v,A,Zu(R.getHeaders()["retry-after"])):o.streaming&&R.getStatusCode()<400?this._streamingResponseHandler(E,l,c)(R):this._jsonResponseHandler(E,g,l,c)(R)).catch(R=>{if(Nr._shouldRetry(null,A,I,R))return b(m,f,v,A,null);{const N=R.code&&R.code===ke.TIMEOUT_ERROR_CODE;return c(new dc({message:N?`Request aborted due to timeout being reached (${P}ms)`:Nr._generateConnectionErrorMessage(A),detail:R}))}})}).catch(C=>{throw new pe({message:"Unable to authenticate the request",exception:C})})},y=(f,v)=>{if(f)return c(f);h=v,this._stripe.getClientUserAgent(S=>{var P,_,C;const M=this._stripe.getApiField("version"),E=this._makeHeaders({contentType:g=="v2"?"application/json":"application/x-www-form-urlencoded",contentLength:this._getContentLength(v),apiVersion:M,clientUserAgent:S,method:r,userSuppliedHeaders:(P=o.headers)!==null&&P!==void 0?P:null,userSuppliedSettings:(_=o.settings)!==null&&_!==void 0?_:{},stripeAccount:(C=o.stripeAccount)!==null&&C!==void 0?C:this._stripe.getApiField("stripeAccount"),stripeContext:this._normalizeStripeContext(o.stripeContext,this._stripe.getApiField("stripeContext")),apiMode:g});m(M,E,0)})};if(u)u(r,s,o.headers,y);else{let f;g=="v2"?f=s?Qu(s):"":f=Un(s||{}),y(null,f)}}}class gc{constructor(r,n,a,s){this.index=0,this.pagePromise=r,this.promiseCache={currentPromise:null},this.requestArgs=n,this.spec=a,this.stripeResource=s}async iterate(r){if(!(r&&r.data&&typeof r.data.length=="number"))throw Error("Unexpected: Stripe API response does not have a well-formed `data` array.");const n=fc(this.requestArgs);if(this.index<r.data.length){const a=n?r.data.length-1-this.index:this.index,s=r.data[a];return this.index+=1,{value:s,done:!1}}else if(r.has_more){this.index=0,this.pagePromise=this.getNextPage(r);const a=await this.pagePromise;return this.iterate(a)}return{done:!0,value:void 0}}getNextPage(r){throw new Error("Unimplemented")}async _next(){return this.iterate(await this.pagePromise)}next(){if(this.promiseCache.currentPromise)return this.promiseCache.currentPromise;const r=(async()=>{const n=await this._next();return this.promiseCache.currentPromise=null,n})();return this.promiseCache.currentPromise=r,r}}class oh extends gc{getNextPage(r){const n=fc(this.requestArgs),a=mh(r,n);return this.stripeResource._makeRequest(this.requestArgs,this.spec,{[n?"ending_before":"starting_after"]:a})}}class lh extends gc{getNextPage(r){if(!r.next_page)throw Error("Unexpected: Stripe API response does not have a well-formed `next_page` field, but `has_more` was true.");return this.stripeResource._makeRequest(this.requestArgs,this.spec,{page:r.next_page})}}class ch{constructor(r,n,a,s){this.currentPageIterator=(async()=>(await r).data[Symbol.iterator]())(),this.nextPageUrl=(async()=>(await r).next_page_url||null)(),this.requestArgs=n,this.spec=a,this.stripeResource=s}async turnPage(){const r=await this.nextPageUrl;if(!r)return null;this.spec.fullPath=r;const n=await this.stripeResource._makeRequest([],this.spec,{});return this.nextPageUrl=Promise.resolve(n.next_page_url),this.currentPageIterator=Promise.resolve(n.data[Symbol.iterator]()),this.currentPageIterator}async next(){{const a=(await this.currentPageIterator).next();if(!a.done)return{done:!1,value:a.value}}const r=await this.turnPage();if(!r)return{done:!0,value:void 0};const n=r.next();return n.done?{done:!0,value:void 0}:{done:!1,value:n.value}}}const dh=(t,r,n,a)=>{const s=Hs(n.fullPath||n.path);return s!=="v2"&&n.methodType==="search"?ss(new lh(a,r,n,t)):s!=="v2"&&n.methodType==="list"?ss(new oh(a,r,n,t)):s==="v2"&&n.methodType==="list"?ss(new ch(a,r,n,t)):null},ss=t=>{const r=gh((...s)=>t.next(...s)),n=fh(r),a={autoPagingEach:r,autoPagingToArray:n,next:()=>t.next(),return:()=>({}),[uh()]:()=>a};return a};function uh(){return typeof Symbol<"u"&&Symbol.asyncIterator?Symbol.asyncIterator:"@@asyncIterator"}function hh(t){if(t.length<2)return null;const r=t[1];if(typeof r!="function")throw Error(`The second argument to autoPagingEach, if present, must be a callback function; received ${typeof r}`);return r}function ph(t){if(t.length===0)return;const r=t[0];if(typeof r!="function")throw Error(`The first argument to autoPagingEach, if present, must be a callback function; received ${typeof r}`);if(r.length===2)return r;if(r.length>2)throw Error(`The \`onItem\` callback function passed to autoPagingEach must accept at most two arguments; got ${r}`);return function(a,s){const i=r(a);s(i)}}function mh(t,r){const n=r?0:t.data.length-1,a=t.data[n],s=a&&a.id;if(!s)throw Error("Unexpected: No `id` found on the last item while auto-paging a list.");return s}function gh(t){return function(){const n=[].slice.call(arguments),a=ph(n),s=hh(n);if(n.length>2)throw Error(`autoPagingEach takes up to two arguments; received ${n}`);const i=yh(t,a);return Ws(i,s)}}function fh(t){return function(n,a){const s=n&&n.limit;if(!s)throw Error("You must pass a `limit` option to autoPagingToArray, e.g., `autoPagingToArray({limit: 1000});`.");if(s>1e4)throw Error("You cannot specify a limit of more than 10,000 items to fetch in `autoPagingToArray`; use `autoPagingEach` to iterate through longer lists.");const i=new Promise((o,l)=>{const c=[];t(u=>{if(c.push(u),c.length>=s)return!1}).then(()=>{o(c)}).catch(l)});return Ws(i,a)}}function yh(t,r){return new Promise((n,a)=>{function s(i){if(i.done){n();return}const o=i.value;return new Promise(l=>{r(o,l)}).then(l=>l===!1?s({done:!0,value:void 0}):t().then(s))}t().then(s).catch(a)})}function fc(t){const r=[].slice.call(t);return!!qs(r).ending_before}function bh(t){if(t.path!==void 0&&t.fullPath!==void 0)throw new Error(`Method spec specified both a 'path' (${t.path}) and a 'fullPath' (${t.fullPath}).`);return function(...r){const n=typeof r[r.length-1]=="function"&&r.pop();t.urlParams=qu(t.fullPath||this.createResourcePathWithSymbols(t.path||""));const a=Ws(this._makeRequest(r,t,{}),n);return Object.assign(a,dh(this,r,t,a)),a}}p.extend=Wu;p.method=bh;p.MAX_BUFFERED_REQUEST_METRICS=100;function p(t,r){if(this._stripe=t,r)throw new Error("Support for curried url params was dropped in stripe-node v7.0.0. Instead, pass two ids.");this.basePath=Ps(this.basePath||t.getApiField("basePath")),this.resourcePath=this.path,this.path=Ps(this.path),this.initialize(...arguments)}p.prototype={_stripe:null,path:"",resourcePath:"",basePath:null,initialize(){},requestDataProcessor:null,validateRequest:null,createFullPath(t,r){const n=[this.basePath(r),this.path(r)];if(typeof t=="function"){const a=t(r);a&&n.push(a)}else n.push(t);return this._joinUrlParts(n)},createResourcePathWithSymbols(t){return t?`/${this._joinUrlParts([this.resourcePath,t])}`:`/${this.resourcePath}`},_joinUrlParts(t){return t.join("/").replace(/\/{2,}/g,"/")},_getRequestOpts(t,r,n){var a;const s=(r.method||"GET").toUpperCase(),i=r.usage||[],o=r.urlParams||[],l=r.encode||(E=>E),c=!!r.fullPath,u=Ps(c?r.fullPath:r.path||""),d=c?r.fullPath:this.createResourcePathWithSymbols(r.path),h=[].slice.call(t),g=o.reduce((E,A)=>{const I=h.shift();if(typeof I!="string")throw new Error(`Stripe: Argument "${A}" must be a string, but got: ${I} (on API request to \`${s} ${d}\`)`);return E[A]=I,E},{}),b=qs(h),m=l(Object.assign({},b,n)),y=nc(h),f=y.host||r.host,v=!!r.streaming||!!y.streaming;if(h.filter(E=>E!=null).length)throw new Error(`Stripe: Unknown arguments (${h}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options. (on API request to ${s} \`${d}\`)`);const S=c?u(g):this.createFullPath(u,g),P=Object.assign(y.headers,r.headers);r.validator&&r.validator(m,{headers:P});const _=r.method==="GET"||r.method==="DELETE";return{requestMethod:s,requestPath:S,bodyData:_?null:m,queryData:_?m:{},authenticator:(a=y.authenticator)!==null&&a!==void 0?a:null,headers:P,host:f??null,streaming:v,settings:y.settings,usage:i}},_makeRequest(t,r,n){return new Promise((a,s)=>{var i;let o;try{o=this._getRequestOpts(t,r,n)}catch(g){s(g);return}function l(g,b){g?s(g):a(r.transformResponseData?r.transformResponseData(b):b)}const c=Object.keys(o.queryData).length===0,u=[o.requestPath,c?"":"?",Un(o.queryData,Hs(o.requestPath))].join(""),{headers:d,settings:h}=o;this._stripe._requestSender._request(o.requestMethod,o.host,u,o.bodyData,o.authenticator,{headers:d,settings:h,streaming:o.streaming},o.usage,l,(i=this.requestDataProcessor)===null||i===void 0?void 0:i.bind(this))})}};class xt{constructor(r=[]){this._segments=[...r]}get segments(){return[...this._segments]}push(r){if(!r)throw new Error("Segment cannot be null or undefined");return new xt([...this._segments,r])}pop(){if(this._segments.length===0)throw new Error("Cannot pop from an empty context");return new xt(this._segments.slice(0,-1))}toString(){return this._segments.join("/")}static parse(r){return r?new xt(r.split("/")):new xt([])}}function xh(t){const r={DEFAULT_TOLERANCE:300,signature:null,constructEvent(d,h,g,b,m,y){try{if(!this.signature)throw new Error("ERR: missing signature helper, unable to verify");this.signature.verifyHeader(d,h,g,b||r.DEFAULT_TOLERANCE,m,y)}catch(v){throw v instanceof ic&&(v.message+="\nUse `await constructEventAsync(...)` instead of `constructEvent(...)`"),v}return d instanceof Uint8Array?JSON.parse(new TextDecoder("utf8").decode(d)):JSON.parse(d)},async constructEventAsync(d,h,g,b,m,y){if(!this.signature)throw new Error("ERR: missing signature helper, unable to verify");return await this.signature.verifyHeaderAsync(d,h,g,b||r.DEFAULT_TOLERANCE,m,y),d instanceof Uint8Array?JSON.parse(new TextDecoder("utf8").decode(d)):JSON.parse(d)},generateTestHeaderString:function(d){const h=u(d),g=h.signature||h.cryptoProvider.computeHMACSignature(h.payloadString,h.secret);return h.generateHeaderString(g)},generateTestHeaderStringAsync:async function(d){const h=u(d),g=h.signature||await h.cryptoProvider.computeHMACSignatureAsync(h.payloadString,h.secret);return h.generateHeaderString(g)}},n={EXPECTED_SCHEME:"v1",verifyHeader(d,h,g,b,m,y){const{decodedHeader:f,decodedPayload:v,details:S,suspectPayloadType:P}=s(d,h,this.EXPECTED_SCHEME),_=/\s/.test(g);m=m||c();const C=m.computeHMACSignature(a(v,S),g);return i(v,f,S,C,b,P,_,y),!0},async verifyHeaderAsync(d,h,g,b,m,y){const{decodedHeader:f,decodedPayload:v,details:S,suspectPayloadType:P}=s(d,h,this.EXPECTED_SCHEME),_=/\s/.test(g);m=m||c();const C=await m.computeHMACSignatureAsync(a(v,S),g);return i(v,f,S,C,b,P,_,y)}};function a(d,h){return`${h.timestamp}.${d}`}function s(d,h,g){if(!d)throw new rt(h,d,{message:"No webhook payload was provided."});const b=typeof d!="string"&&!(d instanceof Uint8Array),m=new TextDecoder("utf8"),y=d instanceof Uint8Array?m.decode(d):d;if(Array.isArray(h))throw new Error("Unexpected: An array was passed as a header, which should not be possible for the stripe-signature header.");if(h==null||h=="")throw new rt(h,d,{message:"No stripe-signature header value was provided."});const f=h instanceof Uint8Array?m.decode(h):h,v=o(f,g);if(!v||v.timestamp===-1)throw new rt(f,y,{message:"Unable to extract timestamp and signatures from header"});if(!v.signatures.length)throw new rt(f,y,{message:"No signatures found with expected scheme"});return{decodedPayload:y,decodedHeader:f,details:v,suspectPayloadType:b}}function i(d,h,g,b,m,y,f,v){const S=!!g.signatures.filter(t.secureCompare.bind(t,b)).length,P=`
Learn more about webhook signing and explore webhook integration examples for various frameworks at https://docs.stripe.com/webhooks/signature`,_=f?`

Note: The provided signing secret contains whitespace. This often indicates an extra newline or space is in the value`:"";if(!S)throw y?new rt(h,d,{message:`Webhook payload must be provided as a string or a Buffer (https://nodejs.org/api/buffer.html) instance representing the _raw_ request body.Payload was provided as a parsed JavaScript object instead. 
Signature verification is impossible without access to the original signed material. 
`+P+`
`+_}):new rt(h,d,{message:`No signatures found matching the expected signature for payload. Are you passing the raw request body you received from Stripe? 
 If a webhook request is being forwarded by a third-party tool, ensure that the exact request body, including JSON formatting and new line style, is preserved.
`+P+`
`+_});const C=Math.floor((typeof v=="number"?v:Date.now())/1e3)-g.timestamp;if(m>0&&C>m)throw new rt(h,d,{message:"Timestamp outside the tolerance zone"});return!0}function o(d,h){return typeof d!="string"?null:d.split(",").reduce((g,b)=>{const m=b.split("=");return m[0]==="t"&&(g.timestamp=parseInt(m[1],10)),m[0]===h&&g.signatures.push(m[1]),g},{timestamp:-1,signatures:[]})}let l=null;function c(){return l||(l=t.createDefaultCryptoProvider()),l}function u(d){if(!d)throw new pe({message:"Options are required"});const h=Math.floor(d.timestamp)||Math.floor(Date.now()/1e3),g=d.scheme||n.EXPECTED_SCHEME,b=d.cryptoProvider||c(),m=`${h}.${d.payload}`,y=f=>`t=${h},${g}=${f}`;return Object.assign(Object.assign({},d),{timestamp:h,scheme:g,cryptoProvider:b,payloadString:m,generateHeaderString:y})}return r.signature=n,r}const yc="2025-12-15.clover";function vh(t,r){for(const n in r){if(!Object.prototype.hasOwnProperty.call(r,n))continue;const a=n[0].toLowerCase()+n.substring(1),s=new r[n](t);this[a]=s}}function Q(t,r){return function(n){return new vh(n,r)}}const wh=p.method,Eh=p.extend({create:wh({method:"POST",fullPath:"/v2/core/account_links"})}),wo=p.method,Th=p.extend({create:wo({method:"POST",fullPath:"/v2/core/account_tokens"}),retrieve:wo({method:"GET",fullPath:"/v2/core/account_tokens/{id}"})}),ht=p.method,Sh=p.extend({retrieve:ht({method:"GET",fullPath:"/v1/financial_connections/accounts/{account}"}),list:ht({method:"GET",fullPath:"/v1/financial_connections/accounts",methodType:"list"}),disconnect:ht({method:"POST",fullPath:"/v1/financial_connections/accounts/{account}/disconnect"}),listOwners:ht({method:"GET",fullPath:"/v1/financial_connections/accounts/{account}/owners",methodType:"list"}),refresh:ht({method:"POST",fullPath:"/v1/financial_connections/accounts/{account}/refresh"}),subscribe:ht({method:"POST",fullPath:"/v1/financial_connections/accounts/{account}/subscribe"}),unsubscribe:ht({method:"POST",fullPath:"/v1/financial_connections/accounts/{account}/unsubscribe"})}),dr=p.method,kh=p.extend({create:dr({method:"POST",fullPath:"/v2/core/accounts/{account_id}/persons"}),retrieve:dr({method:"GET",fullPath:"/v2/core/accounts/{account_id}/persons/{id}"}),update:dr({method:"POST",fullPath:"/v2/core/accounts/{account_id}/persons/{id}"}),list:dr({method:"GET",fullPath:"/v2/core/accounts/{account_id}/persons",methodType:"list"}),del:dr({method:"DELETE",fullPath:"/v2/core/accounts/{account_id}/persons/{id}"})}),Eo=p.method,Ph=p.extend({create:Eo({method:"POST",fullPath:"/v2/core/accounts/{account_id}/person_tokens"}),retrieve:Eo({method:"GET",fullPath:"/v2/core/accounts/{account_id}/person_tokens/{id}"})}),ur=p.method,_h=p.extend({constructor:function(...t){p.apply(this,t),this.persons=new kh(...t),this.personTokens=new Ph(...t)},create:ur({method:"POST",fullPath:"/v2/core/accounts"}),retrieve:ur({method:"GET",fullPath:"/v2/core/accounts/{id}"}),update:ur({method:"POST",fullPath:"/v2/core/accounts/{id}"}),list:ur({method:"GET",fullPath:"/v2/core/accounts",methodType:"list"}),close:ur({method:"POST",fullPath:"/v2/core/accounts/{id}/close"})}),To=p.method,Ah=p.extend({retrieve:To({method:"GET",fullPath:"/v1/entitlements/active_entitlements/{id}"}),list:To({method:"GET",fullPath:"/v1/entitlements/active_entitlements",methodType:"list"})}),Dt=p.method,Ch=p.extend({create:Dt({method:"POST",fullPath:"/v1/billing/alerts"}),retrieve:Dt({method:"GET",fullPath:"/v1/billing/alerts/{id}"}),list:Dt({method:"GET",fullPath:"/v1/billing/alerts",methodType:"list"}),activate:Dt({method:"POST",fullPath:"/v1/billing/alerts/{id}/activate"}),archive:Dt({method:"POST",fullPath:"/v1/billing/alerts/{id}/archive"}),deactivate:Dt({method:"POST",fullPath:"/v1/billing/alerts/{id}/deactivate"})}),Ih=p.method,Oh=p.extend({find:Ih({method:"GET",fullPath:"/v1/tax/associations/find"})}),hr=p.method,Mh=p.extend({retrieve:hr({method:"GET",fullPath:"/v1/issuing/authorizations/{authorization}"}),update:hr({method:"POST",fullPath:"/v1/issuing/authorizations/{authorization}"}),list:hr({method:"GET",fullPath:"/v1/issuing/authorizations",methodType:"list"}),approve:hr({method:"POST",fullPath:"/v1/issuing/authorizations/{authorization}/approve"}),decline:hr({method:"POST",fullPath:"/v1/issuing/authorizations/{authorization}/decline"})}),pt=p.method,Rh=p.extend({create:pt({method:"POST",fullPath:"/v1/test_helpers/issuing/authorizations"}),capture:pt({method:"POST",fullPath:"/v1/test_helpers/issuing/authorizations/{authorization}/capture"}),expire:pt({method:"POST",fullPath:"/v1/test_helpers/issuing/authorizations/{authorization}/expire"}),finalizeAmount:pt({method:"POST",fullPath:"/v1/test_helpers/issuing/authorizations/{authorization}/finalize_amount"}),increment:pt({method:"POST",fullPath:"/v1/test_helpers/issuing/authorizations/{authorization}/increment"}),respond:pt({method:"POST",fullPath:"/v1/test_helpers/issuing/authorizations/{authorization}/fraud_challenges/respond"}),reverse:pt({method:"POST",fullPath:"/v1/test_helpers/issuing/authorizations/{authorization}/reverse"})}),is=p.method,Nh=p.extend({create:is({method:"POST",fullPath:"/v1/tax/calculations"}),retrieve:is({method:"GET",fullPath:"/v1/tax/calculations/{calculation}"}),listLineItems:is({method:"GET",fullPath:"/v1/tax/calculations/{calculation}/line_items",methodType:"list"})}),Zr=p.method,Bh=p.extend({create:Zr({method:"POST",fullPath:"/v1/issuing/cardholders"}),retrieve:Zr({method:"GET",fullPath:"/v1/issuing/cardholders/{cardholder}"}),update:Zr({method:"POST",fullPath:"/v1/issuing/cardholders/{cardholder}"}),list:Zr({method:"GET",fullPath:"/v1/issuing/cardholders",methodType:"list"})}),en=p.method,Dh=p.extend({create:en({method:"POST",fullPath:"/v1/issuing/cards"}),retrieve:en({method:"GET",fullPath:"/v1/issuing/cards/{card}"}),update:en({method:"POST",fullPath:"/v1/issuing/cards/{card}"}),list:en({method:"GET",fullPath:"/v1/issuing/cards",methodType:"list"})}),pr=p.method,Lh=p.extend({deliverCard:pr({method:"POST",fullPath:"/v1/test_helpers/issuing/cards/{card}/shipping/deliver"}),failCard:pr({method:"POST",fullPath:"/v1/test_helpers/issuing/cards/{card}/shipping/fail"}),returnCard:pr({method:"POST",fullPath:"/v1/test_helpers/issuing/cards/{card}/shipping/return"}),shipCard:pr({method:"POST",fullPath:"/v1/test_helpers/issuing/cards/{card}/shipping/ship"}),submitCard:pr({method:"POST",fullPath:"/v1/test_helpers/issuing/cards/{card}/shipping/submit"})}),tn=p.method,jh=p.extend({create:tn({method:"POST",fullPath:"/v1/billing_portal/configurations"}),retrieve:tn({method:"GET",fullPath:"/v1/billing_portal/configurations/{configuration}"}),update:tn({method:"POST",fullPath:"/v1/billing_portal/configurations/{configuration}"}),list:tn({method:"GET",fullPath:"/v1/billing_portal/configurations",methodType:"list"})}),mr=p.method,Fh=p.extend({create:mr({method:"POST",fullPath:"/v1/terminal/configurations"}),retrieve:mr({method:"GET",fullPath:"/v1/terminal/configurations/{configuration}"}),update:mr({method:"POST",fullPath:"/v1/terminal/configurations/{configuration}"}),list:mr({method:"GET",fullPath:"/v1/terminal/configurations",methodType:"list"}),del:mr({method:"DELETE",fullPath:"/v1/terminal/configurations/{configuration}"})}),$h=p.method,zh=p.extend({create:$h({method:"POST",fullPath:"/v1/test_helpers/confirmation_tokens"})}),Uh=p.method,qh=p.extend({create:Uh({method:"POST",fullPath:"/v1/terminal/connection_tokens"})}),Wh=p.method,Hh=p.extend({retrieve:Wh({method:"GET",fullPath:"/v1/billing/credit_balance_summary"})}),So=p.method,Gh=p.extend({retrieve:So({method:"GET",fullPath:"/v1/billing/credit_balance_transactions/{id}"}),list:So({method:"GET",fullPath:"/v1/billing/credit_balance_transactions",methodType:"list"})}),Lt=p.method,Yh=p.extend({create:Lt({method:"POST",fullPath:"/v1/billing/credit_grants"}),retrieve:Lt({method:"GET",fullPath:"/v1/billing/credit_grants/{id}"}),update:Lt({method:"POST",fullPath:"/v1/billing/credit_grants/{id}"}),list:Lt({method:"GET",fullPath:"/v1/billing/credit_grants",methodType:"list"}),expire:Lt({method:"POST",fullPath:"/v1/billing/credit_grants/{id}/expire"}),voidGrant:Lt({method:"POST",fullPath:"/v1/billing/credit_grants/{id}/void"})}),os=p.method,Vh=p.extend({create:os({method:"POST",fullPath:"/v1/treasury/credit_reversals"}),retrieve:os({method:"GET",fullPath:"/v1/treasury/credit_reversals/{credit_reversal}"}),list:os({method:"GET",fullPath:"/v1/treasury/credit_reversals",methodType:"list"})}),Kh=p.method,Jh=p.extend({fundCashBalance:Kh({method:"POST",fullPath:"/v1/test_helpers/customers/{customer}/fund_cash_balance"})}),ls=p.method,Xh=p.extend({create:ls({method:"POST",fullPath:"/v1/treasury/debit_reversals"}),retrieve:ls({method:"GET",fullPath:"/v1/treasury/debit_reversals/{debit_reversal}"}),list:ls({method:"GET",fullPath:"/v1/treasury/debit_reversals",methodType:"list"})}),gr=p.method,Qh=p.extend({create:gr({method:"POST",fullPath:"/v1/issuing/disputes"}),retrieve:gr({method:"GET",fullPath:"/v1/issuing/disputes/{dispute}"}),update:gr({method:"POST",fullPath:"/v1/issuing/disputes/{dispute}"}),list:gr({method:"GET",fullPath:"/v1/issuing/disputes",methodType:"list"}),submit:gr({method:"POST",fullPath:"/v1/issuing/disputes/{dispute}/submit"})}),ko=p.method,Zh=p.extend({retrieve:ko({method:"GET",fullPath:"/v1/radar/early_fraud_warnings/{early_fraud_warning}"}),list:ko({method:"GET",fullPath:"/v1/radar/early_fraud_warnings",methodType:"list"})}),Qe=p.method,ep=p.extend({create:Qe({method:"POST",fullPath:"/v2/core/event_destinations"}),retrieve:Qe({method:"GET",fullPath:"/v2/core/event_destinations/{id}"}),update:Qe({method:"POST",fullPath:"/v2/core/event_destinations/{id}"}),list:Qe({method:"GET",fullPath:"/v2/core/event_destinations",methodType:"list"}),del:Qe({method:"DELETE",fullPath:"/v2/core/event_destinations/{id}"}),disable:Qe({method:"POST",fullPath:"/v2/core/event_destinations/{id}/disable"}),enable:Qe({method:"POST",fullPath:"/v2/core/event_destinations/{id}/enable"}),ping:Qe({method:"POST",fullPath:"/v2/core/event_destinations/{id}/ping"})}),cs=p.method,tp=p.extend({retrieve(...t){return cs({method:"GET",fullPath:"/v2/core/events/{id}",transformResponseData:n=>this.addFetchRelatedObjectIfNeeded(n)}).apply(this,t)},list(...t){return cs({method:"GET",fullPath:"/v2/core/events",methodType:"list",transformResponseData:n=>Object.assign(Object.assign({},n),{data:n.data.map(this.addFetchRelatedObjectIfNeeded.bind(this))})}).apply(this,t)},addFetchRelatedObjectIfNeeded(t){return!t.related_object||!t.related_object.url?t:Object.assign(Object.assign({},t),{fetchRelatedObject:()=>cs({method:"GET",fullPath:t.related_object.url}).apply(this,[{stripeContext:t.context}])})}}),rn=p.method,rp=p.extend({create:rn({method:"POST",fullPath:"/v1/entitlements/features"}),retrieve:rn({method:"GET",fullPath:"/v1/entitlements/features/{id}"}),update:rn({method:"POST",fullPath:"/v1/entitlements/features/{id}"}),list:rn({method:"GET",fullPath:"/v1/entitlements/features",methodType:"list"})}),mt=p.method,np=p.extend({create:mt({method:"POST",fullPath:"/v1/treasury/financial_accounts"}),retrieve:mt({method:"GET",fullPath:"/v1/treasury/financial_accounts/{financial_account}"}),update:mt({method:"POST",fullPath:"/v1/treasury/financial_accounts/{financial_account}"}),list:mt({method:"GET",fullPath:"/v1/treasury/financial_accounts",methodType:"list"}),close:mt({method:"POST",fullPath:"/v1/treasury/financial_accounts/{financial_account}/close"}),retrieveFeatures:mt({method:"GET",fullPath:"/v1/treasury/financial_accounts/{financial_account}/features"}),updateFeatures:mt({method:"POST",fullPath:"/v1/treasury/financial_accounts/{financial_account}/features"})}),ds=p.method,ap=p.extend({fail:ds({method:"POST",fullPath:"/v1/test_helpers/treasury/inbound_transfers/{id}/fail"}),returnInboundTransfer:ds({method:"POST",fullPath:"/v1/test_helpers/treasury/inbound_transfers/{id}/return"}),succeed:ds({method:"POST",fullPath:"/v1/test_helpers/treasury/inbound_transfers/{id}/succeed"})}),nn=p.method,sp=p.extend({create:nn({method:"POST",fullPath:"/v1/treasury/inbound_transfers"}),retrieve:nn({method:"GET",fullPath:"/v1/treasury/inbound_transfers/{id}"}),list:nn({method:"GET",fullPath:"/v1/treasury/inbound_transfers",methodType:"list"}),cancel:nn({method:"POST",fullPath:"/v1/treasury/inbound_transfers/{inbound_transfer}/cancel"})}),fr=p.method,ip=p.extend({create:fr({method:"POST",fullPath:"/v1/terminal/locations"}),retrieve:fr({method:"GET",fullPath:"/v1/terminal/locations/{location}"}),update:fr({method:"POST",fullPath:"/v1/terminal/locations/{location}"}),list:fr({method:"GET",fullPath:"/v1/terminal/locations",methodType:"list"}),del:fr({method:"DELETE",fullPath:"/v1/terminal/locations/{location}"})}),op=p.method,lp=p.extend({create:op({method:"POST",fullPath:"/v1/billing/meter_event_adjustments"})}),cp=p.method,dp=p.extend({create:cp({method:"POST",fullPath:"/v2/billing/meter_event_adjustments"})}),up=p.method,hp=p.extend({create:up({method:"POST",fullPath:"/v2/billing/meter_event_session"})}),pp=p.method,mp=p.extend({create:pp({method:"POST",fullPath:"/v2/billing/meter_event_stream",host:"meter-events.stripe.com"})}),gp=p.method,fp=p.extend({create:gp({method:"POST",fullPath:"/v1/billing/meter_events"})}),yp=p.method,bp=p.extend({create:yp({method:"POST",fullPath:"/v2/billing/meter_events"})}),gt=p.method,xp=p.extend({create:gt({method:"POST",fullPath:"/v1/billing/meters"}),retrieve:gt({method:"GET",fullPath:"/v1/billing/meters/{id}"}),update:gt({method:"POST",fullPath:"/v1/billing/meters/{id}"}),list:gt({method:"GET",fullPath:"/v1/billing/meters",methodType:"list"}),deactivate:gt({method:"POST",fullPath:"/v1/billing/meters/{id}/deactivate"}),listEventSummaries:gt({method:"GET",fullPath:"/v1/billing/meters/{id}/event_summaries",methodType:"list"}),reactivate:gt({method:"POST",fullPath:"/v1/billing/meters/{id}/reactivate"})}),vp=p.method,wp=p.extend({create:vp({method:"POST",fullPath:"/v1/terminal/onboarding_links"})}),yr=p.method,Ep=p.extend({create:yr({method:"POST",fullPath:"/v1/climate/orders"}),retrieve:yr({method:"GET",fullPath:"/v1/climate/orders/{order}"}),update:yr({method:"POST",fullPath:"/v1/climate/orders/{order}"}),list:yr({method:"GET",fullPath:"/v1/climate/orders",methodType:"list"}),cancel:yr({method:"POST",fullPath:"/v1/climate/orders/{order}/cancel"})}),an=p.method,Tp=p.extend({update:an({method:"POST",fullPath:"/v1/test_helpers/treasury/outbound_payments/{id}"}),fail:an({method:"POST",fullPath:"/v1/test_helpers/treasury/outbound_payments/{id}/fail"}),post:an({method:"POST",fullPath:"/v1/test_helpers/treasury/outbound_payments/{id}/post"}),returnOutboundPayment:an({method:"POST",fullPath:"/v1/test_helpers/treasury/outbound_payments/{id}/return"})}),sn=p.method,Sp=p.extend({create:sn({method:"POST",fullPath:"/v1/treasury/outbound_payments"}),retrieve:sn({method:"GET",fullPath:"/v1/treasury/outbound_payments/{id}"}),list:sn({method:"GET",fullPath:"/v1/treasury/outbound_payments",methodType:"list"}),cancel:sn({method:"POST",fullPath:"/v1/treasury/outbound_payments/{id}/cancel"})}),on=p.method,kp=p.extend({update:on({method:"POST",fullPath:"/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}"}),fail:on({method:"POST",fullPath:"/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/fail"}),post:on({method:"POST",fullPath:"/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/post"}),returnOutboundTransfer:on({method:"POST",fullPath:"/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/return"})}),ln=p.method,Pp=p.extend({create:ln({method:"POST",fullPath:"/v1/treasury/outbound_transfers"}),retrieve:ln({method:"GET",fullPath:"/v1/treasury/outbound_transfers/{outbound_transfer}"}),list:ln({method:"GET",fullPath:"/v1/treasury/outbound_transfers",methodType:"list"}),cancel:ln({method:"POST",fullPath:"/v1/treasury/outbound_transfers/{outbound_transfer}/cancel"})}),cn=p.method,_p=p.extend({create:cn({method:"POST",fullPath:"/v1/issuing/personalization_designs"}),retrieve:cn({method:"GET",fullPath:"/v1/issuing/personalization_designs/{personalization_design}"}),update:cn({method:"POST",fullPath:"/v1/issuing/personalization_designs/{personalization_design}"}),list:cn({method:"GET",fullPath:"/v1/issuing/personalization_designs",methodType:"list"})}),us=p.method,Ap=p.extend({activate:us({method:"POST",fullPath:"/v1/test_helpers/issuing/personalization_designs/{personalization_design}/activate"}),deactivate:us({method:"POST",fullPath:"/v1/test_helpers/issuing/personalization_designs/{personalization_design}/deactivate"}),reject:us({method:"POST",fullPath:"/v1/test_helpers/issuing/personalization_designs/{personalization_design}/reject"})}),Po=p.method,Cp=p.extend({retrieve:Po({method:"GET",fullPath:"/v1/issuing/physical_bundles/{physical_bundle}"}),list:Po({method:"GET",fullPath:"/v1/issuing/physical_bundles",methodType:"list"})}),_o=p.method,Ip=p.extend({retrieve:_o({method:"GET",fullPath:"/v1/climate/products/{product}"}),list:_o({method:"GET",fullPath:"/v1/climate/products",methodType:"list"})}),xe=p.method,Op=p.extend({create:xe({method:"POST",fullPath:"/v1/terminal/readers"}),retrieve:xe({method:"GET",fullPath:"/v1/terminal/readers/{reader}"}),update:xe({method:"POST",fullPath:"/v1/terminal/readers/{reader}"}),list:xe({method:"GET",fullPath:"/v1/terminal/readers",methodType:"list"}),del:xe({method:"DELETE",fullPath:"/v1/terminal/readers/{reader}"}),cancelAction:xe({method:"POST",fullPath:"/v1/terminal/readers/{reader}/cancel_action"}),collectInputs:xe({method:"POST",fullPath:"/v1/terminal/readers/{reader}/collect_inputs"}),collectPaymentMethod:xe({method:"POST",fullPath:"/v1/terminal/readers/{reader}/collect_payment_method"}),confirmPaymentIntent:xe({method:"POST",fullPath:"/v1/terminal/readers/{reader}/confirm_payment_intent"}),processPaymentIntent:xe({method:"POST",fullPath:"/v1/terminal/readers/{reader}/process_payment_intent"}),processSetupIntent:xe({method:"POST",fullPath:"/v1/terminal/readers/{reader}/process_setup_intent"}),refundPayment:xe({method:"POST",fullPath:"/v1/terminal/readers/{reader}/refund_payment"}),setReaderDisplay:xe({method:"POST",fullPath:"/v1/terminal/readers/{reader}/set_reader_display"})}),hs=p.method,Mp=p.extend({presentPaymentMethod:hs({method:"POST",fullPath:"/v1/test_helpers/terminal/readers/{reader}/present_payment_method"}),succeedInputCollection:hs({method:"POST",fullPath:"/v1/test_helpers/terminal/readers/{reader}/succeed_input_collection"}),timeoutInputCollection:hs({method:"POST",fullPath:"/v1/test_helpers/terminal/readers/{reader}/timeout_input_collection"})}),Rp=p.method,Np=p.extend({create:Rp({method:"POST",fullPath:"/v1/test_helpers/treasury/received_credits"})}),Ao=p.method,Bp=p.extend({retrieve:Ao({method:"GET",fullPath:"/v1/treasury/received_credits/{id}"}),list:Ao({method:"GET",fullPath:"/v1/treasury/received_credits",methodType:"list"})}),Dp=p.method,Lp=p.extend({create:Dp({method:"POST",fullPath:"/v1/test_helpers/treasury/received_debits"})}),Co=p.method,jp=p.extend({retrieve:Co({method:"GET",fullPath:"/v1/treasury/received_debits/{id}"}),list:Co({method:"GET",fullPath:"/v1/treasury/received_debits",methodType:"list"})}),Fp=p.method,$p=p.extend({expire:Fp({method:"POST",fullPath:"/v1/test_helpers/refunds/{refund}/expire"})}),dn=p.method,zp=p.extend({create:dn({method:"POST",fullPath:"/v1/tax/registrations"}),retrieve:dn({method:"GET",fullPath:"/v1/tax/registrations/{id}"}),update:dn({method:"POST",fullPath:"/v1/tax/registrations/{id}"}),list:dn({method:"GET",fullPath:"/v1/tax/registrations",methodType:"list"})}),ps=p.method,Up=p.extend({create:ps({method:"POST",fullPath:"/v1/reporting/report_runs"}),retrieve:ps({method:"GET",fullPath:"/v1/reporting/report_runs/{report_run}"}),list:ps({method:"GET",fullPath:"/v1/reporting/report_runs",methodType:"list"})}),Io=p.method,qp=p.extend({retrieve:Io({method:"GET",fullPath:"/v1/reporting/report_types/{report_type}"}),list:Io({method:"GET",fullPath:"/v1/reporting/report_types",methodType:"list"})}),ms=p.method,Wp=p.extend({create:ms({method:"POST",fullPath:"/v1/forwarding/requests"}),retrieve:ms({method:"GET",fullPath:"/v1/forwarding/requests/{id}"}),list:ms({method:"GET",fullPath:"/v1/forwarding/requests",methodType:"list"})}),Oo=p.method,Hp=p.extend({retrieve:Oo({method:"GET",fullPath:"/v1/sigma/scheduled_query_runs/{scheduled_query_run}"}),list:Oo({method:"GET",fullPath:"/v1/sigma/scheduled_query_runs",methodType:"list"})}),un=p.method,Gp=p.extend({create:un({method:"POST",fullPath:"/v1/apps/secrets"}),list:un({method:"GET",fullPath:"/v1/apps/secrets",methodType:"list"}),deleteWhere:un({method:"POST",fullPath:"/v1/apps/secrets/delete"}),find:un({method:"GET",fullPath:"/v1/apps/secrets/find"})}),Yp=p.method,Vp=p.extend({create:Yp({method:"POST",fullPath:"/v1/billing_portal/sessions"})}),jt=p.method,Kp=p.extend({create:jt({method:"POST",fullPath:"/v1/checkout/sessions"}),retrieve:jt({method:"GET",fullPath:"/v1/checkout/sessions/{session}"}),update:jt({method:"POST",fullPath:"/v1/checkout/sessions/{session}"}),list:jt({method:"GET",fullPath:"/v1/checkout/sessions",methodType:"list"}),expire:jt({method:"POST",fullPath:"/v1/checkout/sessions/{session}/expire"}),listLineItems:jt({method:"GET",fullPath:"/v1/checkout/sessions/{session}/line_items",methodType:"list"})}),Mo=p.method,Jp=p.extend({create:Mo({method:"POST",fullPath:"/v1/financial_connections/sessions"}),retrieve:Mo({method:"GET",fullPath:"/v1/financial_connections/sessions/{session}"})}),Ro=p.method,Xp=p.extend({retrieve:Ro({method:"GET",fullPath:"/v1/tax/settings"}),update:Ro({method:"POST",fullPath:"/v1/tax/settings"})}),No=p.method,Qp=p.extend({retrieve:No({method:"GET",fullPath:"/v1/climate/suppliers/{supplier}"}),list:No({method:"GET",fullPath:"/v1/climate/suppliers",methodType:"list"})}),br=p.method,Zp=p.extend({create:br({method:"POST",fullPath:"/v1/test_helpers/test_clocks"}),retrieve:br({method:"GET",fullPath:"/v1/test_helpers/test_clocks/{test_clock}"}),list:br({method:"GET",fullPath:"/v1/test_helpers/test_clocks",methodType:"list"}),del:br({method:"DELETE",fullPath:"/v1/test_helpers/test_clocks/{test_clock}"}),advance:br({method:"POST",fullPath:"/v1/test_helpers/test_clocks/{test_clock}/advance"})}),gs=p.method,em=p.extend({retrieve:gs({method:"GET",fullPath:"/v1/issuing/tokens/{token}"}),update:gs({method:"POST",fullPath:"/v1/issuing/tokens/{token}"}),list:gs({method:"GET",fullPath:"/v1/issuing/tokens",methodType:"list"})}),Bo=p.method,tm=p.extend({retrieve:Bo({method:"GET",fullPath:"/v1/treasury/transaction_entries/{id}"}),list:Bo({method:"GET",fullPath:"/v1/treasury/transaction_entries",methodType:"list"})}),Do=p.method,rm=p.extend({retrieve:Do({method:"GET",fullPath:"/v1/financial_connections/transactions/{transaction}"}),list:Do({method:"GET",fullPath:"/v1/financial_connections/transactions",methodType:"list"})}),fs=p.method,nm=p.extend({retrieve:fs({method:"GET",fullPath:"/v1/issuing/transactions/{transaction}"}),update:fs({method:"POST",fullPath:"/v1/issuing/transactions/{transaction}"}),list:fs({method:"GET",fullPath:"/v1/issuing/transactions",methodType:"list"})}),hn=p.method,am=p.extend({retrieve:hn({method:"GET",fullPath:"/v1/tax/transactions/{transaction}"}),createFromCalculation:hn({method:"POST",fullPath:"/v1/tax/transactions/create_from_calculation"}),createReversal:hn({method:"POST",fullPath:"/v1/tax/transactions/create_reversal"}),listLineItems:hn({method:"GET",fullPath:"/v1/tax/transactions/{transaction}/line_items",methodType:"list"})}),ys=p.method,sm=p.extend({createForceCapture:ys({method:"POST",fullPath:"/v1/test_helpers/issuing/transactions/create_force_capture"}),createUnlinkedRefund:ys({method:"POST",fullPath:"/v1/test_helpers/issuing/transactions/create_unlinked_refund"}),refund:ys({method:"POST",fullPath:"/v1/test_helpers/issuing/transactions/{transaction}/refund"})}),Lo=p.method,im=p.extend({retrieve:Lo({method:"GET",fullPath:"/v1/treasury/transactions/{id}"}),list:Lo({method:"GET",fullPath:"/v1/treasury/transactions",methodType:"list"})}),pn=p.method,om=p.extend({create:pn({method:"POST",fullPath:"/v1/radar/value_list_items"}),retrieve:pn({method:"GET",fullPath:"/v1/radar/value_list_items/{item}"}),list:pn({method:"GET",fullPath:"/v1/radar/value_list_items",methodType:"list"}),del:pn({method:"DELETE",fullPath:"/v1/radar/value_list_items/{item}"})}),xr=p.method,lm=p.extend({create:xr({method:"POST",fullPath:"/v1/radar/value_lists"}),retrieve:xr({method:"GET",fullPath:"/v1/radar/value_lists/{value_list}"}),update:xr({method:"POST",fullPath:"/v1/radar/value_lists/{value_list}"}),list:xr({method:"GET",fullPath:"/v1/radar/value_lists",methodType:"list"}),del:xr({method:"DELETE",fullPath:"/v1/radar/value_lists/{value_list}"})}),jo=p.method,cm=p.extend({retrieve:jo({method:"GET",fullPath:"/v1/identity/verification_reports/{report}"}),list:jo({method:"GET",fullPath:"/v1/identity/verification_reports",methodType:"list"})}),Ft=p.method,dm=p.extend({create:Ft({method:"POST",fullPath:"/v1/identity/verification_sessions"}),retrieve:Ft({method:"GET",fullPath:"/v1/identity/verification_sessions/{session}"}),update:Ft({method:"POST",fullPath:"/v1/identity/verification_sessions/{session}"}),list:Ft({method:"GET",fullPath:"/v1/identity/verification_sessions",methodType:"list"}),cancel:Ft({method:"POST",fullPath:"/v1/identity/verification_sessions/{session}/cancel"}),redact:Ft({method:"POST",fullPath:"/v1/identity/verification_sessions/{session}/redact"})}),Z=p.method,Fo=p.extend({create:Z({method:"POST",fullPath:"/v1/accounts"}),retrieve(t,...r){return typeof t=="string"?Z({method:"GET",fullPath:"/v1/accounts/{id}"}).apply(this,[t,...r]):(t==null&&[].shift.apply([t,...r]),Z({method:"GET",fullPath:"/v1/account"}).apply(this,[t,...r]))},update:Z({method:"POST",fullPath:"/v1/accounts/{account}"}),list:Z({method:"GET",fullPath:"/v1/accounts",methodType:"list"}),del:Z({method:"DELETE",fullPath:"/v1/accounts/{account}"}),createExternalAccount:Z({method:"POST",fullPath:"/v1/accounts/{account}/external_accounts"}),createLoginLink:Z({method:"POST",fullPath:"/v1/accounts/{account}/login_links"}),createPerson:Z({method:"POST",fullPath:"/v1/accounts/{account}/persons"}),deleteExternalAccount:Z({method:"DELETE",fullPath:"/v1/accounts/{account}/external_accounts/{id}"}),deletePerson:Z({method:"DELETE",fullPath:"/v1/accounts/{account}/persons/{person}"}),listCapabilities:Z({method:"GET",fullPath:"/v1/accounts/{account}/capabilities",methodType:"list"}),listExternalAccounts:Z({method:"GET",fullPath:"/v1/accounts/{account}/external_accounts",methodType:"list"}),listPersons:Z({method:"GET",fullPath:"/v1/accounts/{account}/persons",methodType:"list"}),reject:Z({method:"POST",fullPath:"/v1/accounts/{account}/reject"}),retrieveCurrent:Z({method:"GET",fullPath:"/v1/account"}),retrieveCapability:Z({method:"GET",fullPath:"/v1/accounts/{account}/capabilities/{capability}"}),retrieveExternalAccount:Z({method:"GET",fullPath:"/v1/accounts/{account}/external_accounts/{id}"}),retrievePerson:Z({method:"GET",fullPath:"/v1/accounts/{account}/persons/{person}"}),updateCapability:Z({method:"POST",fullPath:"/v1/accounts/{account}/capabilities/{capability}"}),updateExternalAccount:Z({method:"POST",fullPath:"/v1/accounts/{account}/external_accounts/{id}"}),updatePerson:Z({method:"POST",fullPath:"/v1/accounts/{account}/persons/{person}"})}),um=p.method,hm=p.extend({create:um({method:"POST",fullPath:"/v1/account_links"})}),pm=p.method,mm=p.extend({create:pm({method:"POST",fullPath:"/v1/account_sessions"})}),mn=p.method,gm=p.extend({create:mn({method:"POST",fullPath:"/v1/apple_pay/domains"}),retrieve:mn({method:"GET",fullPath:"/v1/apple_pay/domains/{domain}"}),list:mn({method:"GET",fullPath:"/v1/apple_pay/domains",methodType:"list"}),del:mn({method:"DELETE",fullPath:"/v1/apple_pay/domains/{domain}"})}),$t=p.method,fm=p.extend({retrieve:$t({method:"GET",fullPath:"/v1/application_fees/{id}"}),list:$t({method:"GET",fullPath:"/v1/application_fees",methodType:"list"}),createRefund:$t({method:"POST",fullPath:"/v1/application_fees/{id}/refunds"}),listRefunds:$t({method:"GET",fullPath:"/v1/application_fees/{id}/refunds",methodType:"list"}),retrieveRefund:$t({method:"GET",fullPath:"/v1/application_fees/{fee}/refunds/{id}"}),updateRefund:$t({method:"POST",fullPath:"/v1/application_fees/{fee}/refunds/{id}"})}),ym=p.method,bm=p.extend({retrieve:ym({method:"GET",fullPath:"/v1/balance"})}),$o=p.method,xm=p.extend({retrieve:$o({method:"GET",fullPath:"/v1/balance_settings"}),update:$o({method:"POST",fullPath:"/v1/balance_settings"})}),zo=p.method,vm=p.extend({retrieve:zo({method:"GET",fullPath:"/v1/balance_transactions/{id}"}),list:zo({method:"GET",fullPath:"/v1/balance_transactions",methodType:"list"})}),zt=p.method,wm=p.extend({create:zt({method:"POST",fullPath:"/v1/charges"}),retrieve:zt({method:"GET",fullPath:"/v1/charges/{charge}"}),update:zt({method:"POST",fullPath:"/v1/charges/{charge}"}),list:zt({method:"GET",fullPath:"/v1/charges",methodType:"list"}),capture:zt({method:"POST",fullPath:"/v1/charges/{charge}/capture"}),search:zt({method:"GET",fullPath:"/v1/charges/search",methodType:"search"})}),Em=p.method,Tm=p.extend({retrieve:Em({method:"GET",fullPath:"/v1/confirmation_tokens/{confirmation_token}"})}),Uo=p.method,Sm=p.extend({retrieve:Uo({method:"GET",fullPath:"/v1/country_specs/{country}"}),list:Uo({method:"GET",fullPath:"/v1/country_specs",methodType:"list"})}),vr=p.method,km=p.extend({create:vr({method:"POST",fullPath:"/v1/coupons"}),retrieve:vr({method:"GET",fullPath:"/v1/coupons/{coupon}"}),update:vr({method:"POST",fullPath:"/v1/coupons/{coupon}"}),list:vr({method:"GET",fullPath:"/v1/coupons",methodType:"list"}),del:vr({method:"DELETE",fullPath:"/v1/coupons/{coupon}"})}),Ze=p.method,Pm=p.extend({create:Ze({method:"POST",fullPath:"/v1/credit_notes"}),retrieve:Ze({method:"GET",fullPath:"/v1/credit_notes/{id}"}),update:Ze({method:"POST",fullPath:"/v1/credit_notes/{id}"}),list:Ze({method:"GET",fullPath:"/v1/credit_notes",methodType:"list"}),listLineItems:Ze({method:"GET",fullPath:"/v1/credit_notes/{credit_note}/lines",methodType:"list"}),listPreviewLineItems:Ze({method:"GET",fullPath:"/v1/credit_notes/preview/lines",methodType:"list"}),preview:Ze({method:"GET",fullPath:"/v1/credit_notes/preview"}),voidCreditNote:Ze({method:"POST",fullPath:"/v1/credit_notes/{id}/void"})}),_m=p.method,Am=p.extend({create:_m({method:"POST",fullPath:"/v1/customer_sessions"})}),G=p.method,Cm=p.extend({create:G({method:"POST",fullPath:"/v1/customers"}),retrieve:G({method:"GET",fullPath:"/v1/customers/{customer}"}),update:G({method:"POST",fullPath:"/v1/customers/{customer}"}),list:G({method:"GET",fullPath:"/v1/customers",methodType:"list"}),del:G({method:"DELETE",fullPath:"/v1/customers/{customer}"}),createBalanceTransaction:G({method:"POST",fullPath:"/v1/customers/{customer}/balance_transactions"}),createFundingInstructions:G({method:"POST",fullPath:"/v1/customers/{customer}/funding_instructions"}),createSource:G({method:"POST",fullPath:"/v1/customers/{customer}/sources"}),createTaxId:G({method:"POST",fullPath:"/v1/customers/{customer}/tax_ids"}),deleteDiscount:G({method:"DELETE",fullPath:"/v1/customers/{customer}/discount"}),deleteSource:G({method:"DELETE",fullPath:"/v1/customers/{customer}/sources/{id}"}),deleteTaxId:G({method:"DELETE",fullPath:"/v1/customers/{customer}/tax_ids/{id}"}),listBalanceTransactions:G({method:"GET",fullPath:"/v1/customers/{customer}/balance_transactions",methodType:"list"}),listCashBalanceTransactions:G({method:"GET",fullPath:"/v1/customers/{customer}/cash_balance_transactions",methodType:"list"}),listPaymentMethods:G({method:"GET",fullPath:"/v1/customers/{customer}/payment_methods",methodType:"list"}),listSources:G({method:"GET",fullPath:"/v1/customers/{customer}/sources",methodType:"list"}),listTaxIds:G({method:"GET",fullPath:"/v1/customers/{customer}/tax_ids",methodType:"list"}),retrieveBalanceTransaction:G({method:"GET",fullPath:"/v1/customers/{customer}/balance_transactions/{transaction}"}),retrieveCashBalance:G({method:"GET",fullPath:"/v1/customers/{customer}/cash_balance"}),retrieveCashBalanceTransaction:G({method:"GET",fullPath:"/v1/customers/{customer}/cash_balance_transactions/{transaction}"}),retrievePaymentMethod:G({method:"GET",fullPath:"/v1/customers/{customer}/payment_methods/{payment_method}"}),retrieveSource:G({method:"GET",fullPath:"/v1/customers/{customer}/sources/{id}"}),retrieveTaxId:G({method:"GET",fullPath:"/v1/customers/{customer}/tax_ids/{id}"}),search:G({method:"GET",fullPath:"/v1/customers/search",methodType:"search"}),updateBalanceTransaction:G({method:"POST",fullPath:"/v1/customers/{customer}/balance_transactions/{transaction}"}),updateCashBalance:G({method:"POST",fullPath:"/v1/customers/{customer}/cash_balance"}),updateSource:G({method:"POST",fullPath:"/v1/customers/{customer}/sources/{id}"}),verifySource:G({method:"POST",fullPath:"/v1/customers/{customer}/sources/{id}/verify"})}),gn=p.method,Im=p.extend({retrieve:gn({method:"GET",fullPath:"/v1/disputes/{dispute}"}),update:gn({method:"POST",fullPath:"/v1/disputes/{dispute}"}),list:gn({method:"GET",fullPath:"/v1/disputes",methodType:"list"}),close:gn({method:"POST",fullPath:"/v1/disputes/{dispute}/close"})}),qo=p.method,Om=p.extend({create:qo({method:"POST",fullPath:"/v1/ephemeral_keys",validator:(t,r)=>{if(!r.headers||!r.headers["Stripe-Version"])throw new Error("Passing apiVersion in a separate options hash is required to create an ephemeral key. See https://stripe.com/docs/api/versioning?lang=node")}}),del:qo({method:"DELETE",fullPath:"/v1/ephemeral_keys/{key}"})}),Wo=p.method,Mm=p.extend({retrieve:Wo({method:"GET",fullPath:"/v1/events/{id}"}),list:Wo({method:"GET",fullPath:"/v1/events",methodType:"list"})}),Ho=p.method,Rm=p.extend({retrieve:Ho({method:"GET",fullPath:"/v1/exchange_rates/{rate_id}"}),list:Ho({method:"GET",fullPath:"/v1/exchange_rates",methodType:"list"})}),fn=p.method,Nm=p.extend({create:fn({method:"POST",fullPath:"/v1/file_links"}),retrieve:fn({method:"GET",fullPath:"/v1/file_links/{link}"}),update:fn({method:"POST",fullPath:"/v1/file_links/{link}"}),list:fn({method:"GET",fullPath:"/v1/file_links",methodType:"list"})}),Bm=(t,r,n)=>{const a=(Math.round(Math.random()*1e16)+Math.round(Math.random()*1e16)).toString();n["Content-Type"]=`multipart/form-data; boundary=${a}`;const s=new TextEncoder;let i=new Uint8Array(0);const o=s.encode(`\r
`);function l(d){const h=i,g=d instanceof Uint8Array?d:new Uint8Array(s.encode(d));i=new Uint8Array(h.length+g.length+2),i.set(h),i.set(g,h.length),i.set(o,i.length-2)}function c(d){return`"${d.replace(/"|"/g,"%22").replace(/\r\n|\r|\n/g," ")}"`}const u=Ku(r);for(const d in u){if(!Object.prototype.hasOwnProperty.call(u,d))continue;const h=u[d];if(l(`--${a}`),Object.prototype.hasOwnProperty.call(h,"data")){const g=h;l(`Content-Disposition: form-data; name=${c(d)}; filename=${c(g.name||"blob")}`),l(`Content-Type: ${g.type||"application/octet-stream"}`),l(""),l(g.data)}else l(`Content-Disposition: form-data; name=${c(d)}`),l(""),l(h)}return l(`--${a}--`),i};function Dm(t,r,n,a){if(r=r||{},t!=="POST")return a(null,Un(r));this._stripe._platformFunctions.tryBufferData(r).then(s=>{const i=Bm(t,s,n);return a(null,i)}).catch(s=>a(s,null))}const bs=p.method,Lm=p.extend({create:bs({method:"POST",fullPath:"/v1/files",headers:{"Content-Type":"multipart/form-data"},host:"files.stripe.com"}),retrieve:bs({method:"GET",fullPath:"/v1/files/{file}"}),list:bs({method:"GET",fullPath:"/v1/files",methodType:"list"}),requestDataProcessor:Dm}),wr=p.method,jm=p.extend({create:wr({method:"POST",fullPath:"/v1/invoiceitems"}),retrieve:wr({method:"GET",fullPath:"/v1/invoiceitems/{invoiceitem}"}),update:wr({method:"POST",fullPath:"/v1/invoiceitems/{invoiceitem}"}),list:wr({method:"GET",fullPath:"/v1/invoiceitems",methodType:"list"}),del:wr({method:"DELETE",fullPath:"/v1/invoiceitems/{invoiceitem}"})}),Go=p.method,Fm=p.extend({retrieve:Go({method:"GET",fullPath:"/v1/invoice_payments/{invoice_payment}"}),list:Go({method:"GET",fullPath:"/v1/invoice_payments",methodType:"list"})}),yn=p.method,$m=p.extend({retrieve:yn({method:"GET",fullPath:"/v1/invoice_rendering_templates/{template}"}),list:yn({method:"GET",fullPath:"/v1/invoice_rendering_templates",methodType:"list"}),archive:yn({method:"POST",fullPath:"/v1/invoice_rendering_templates/{template}/archive"}),unarchive:yn({method:"POST",fullPath:"/v1/invoice_rendering_templates/{template}/unarchive"})}),ie=p.method,zm=p.extend({create:ie({method:"POST",fullPath:"/v1/invoices"}),retrieve:ie({method:"GET",fullPath:"/v1/invoices/{invoice}"}),update:ie({method:"POST",fullPath:"/v1/invoices/{invoice}"}),list:ie({method:"GET",fullPath:"/v1/invoices",methodType:"list"}),del:ie({method:"DELETE",fullPath:"/v1/invoices/{invoice}"}),addLines:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/add_lines"}),attachPayment:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/attach_payment"}),createPreview:ie({method:"POST",fullPath:"/v1/invoices/create_preview"}),finalizeInvoice:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/finalize"}),listLineItems:ie({method:"GET",fullPath:"/v1/invoices/{invoice}/lines",methodType:"list"}),markUncollectible:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/mark_uncollectible"}),pay:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/pay"}),removeLines:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/remove_lines"}),search:ie({method:"GET",fullPath:"/v1/invoices/search",methodType:"search"}),sendInvoice:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/send"}),updateLines:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/update_lines"}),updateLineItem:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/lines/{line_item_id}"}),voidInvoice:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/void"})}),Um=p.method,qm=p.extend({retrieve:Um({method:"GET",fullPath:"/v1/mandates/{mandate}"})}),Yo=p.method,xs="connect.stripe.com",Wm=p.extend({basePath:"/",authorizeUrl(t,r){t=t||{},r=r||{};let n="oauth/authorize";return r.express&&(n=`express/${n}`),t.response_type||(t.response_type="code"),t.client_id||(t.client_id=this._stripe.getClientId()),t.scope||(t.scope="read_write"),`https://${xs}/${n}?${Un(t)}`},token:Yo({method:"POST",path:"oauth/token",host:xs}),deauthorize(t,...r){return t.client_id||(t.client_id=this._stripe.getClientId()),Yo({method:"POST",path:"oauth/deauthorize",host:xs}).apply(this,[t,...r])}}),Vo=p.method,Hm=p.extend({retrieve:Vo({method:"GET",fullPath:"/v1/payment_attempt_records/{id}"}),list:Vo({method:"GET",fullPath:"/v1/payment_attempt_records",methodType:"list"})}),Te=p.method,Gm=p.extend({create:Te({method:"POST",fullPath:"/v1/payment_intents"}),retrieve:Te({method:"GET",fullPath:"/v1/payment_intents/{intent}"}),update:Te({method:"POST",fullPath:"/v1/payment_intents/{intent}"}),list:Te({method:"GET",fullPath:"/v1/payment_intents",methodType:"list"}),applyCustomerBalance:Te({method:"POST",fullPath:"/v1/payment_intents/{intent}/apply_customer_balance"}),cancel:Te({method:"POST",fullPath:"/v1/payment_intents/{intent}/cancel"}),capture:Te({method:"POST",fullPath:"/v1/payment_intents/{intent}/capture"}),confirm:Te({method:"POST",fullPath:"/v1/payment_intents/{intent}/confirm"}),incrementAuthorization:Te({method:"POST",fullPath:"/v1/payment_intents/{intent}/increment_authorization"}),listAmountDetailsLineItems:Te({method:"GET",fullPath:"/v1/payment_intents/{intent}/amount_details_line_items",methodType:"list"}),search:Te({method:"GET",fullPath:"/v1/payment_intents/search",methodType:"search"}),verifyMicrodeposits:Te({method:"POST",fullPath:"/v1/payment_intents/{intent}/verify_microdeposits"})}),Er=p.method,Ym=p.extend({create:Er({method:"POST",fullPath:"/v1/payment_links"}),retrieve:Er({method:"GET",fullPath:"/v1/payment_links/{payment_link}"}),update:Er({method:"POST",fullPath:"/v1/payment_links/{payment_link}"}),list:Er({method:"GET",fullPath:"/v1/payment_links",methodType:"list"}),listLineItems:Er({method:"GET",fullPath:"/v1/payment_links/{payment_link}/line_items",methodType:"list"})}),bn=p.method,Vm=p.extend({create:bn({method:"POST",fullPath:"/v1/payment_method_configurations"}),retrieve:bn({method:"GET",fullPath:"/v1/payment_method_configurations/{configuration}"}),update:bn({method:"POST",fullPath:"/v1/payment_method_configurations/{configuration}"}),list:bn({method:"GET",fullPath:"/v1/payment_method_configurations",methodType:"list"})}),Tr=p.method,Km=p.extend({create:Tr({method:"POST",fullPath:"/v1/payment_method_domains"}),retrieve:Tr({method:"GET",fullPath:"/v1/payment_method_domains/{payment_method_domain}"}),update:Tr({method:"POST",fullPath:"/v1/payment_method_domains/{payment_method_domain}"}),list:Tr({method:"GET",fullPath:"/v1/payment_method_domains",methodType:"list"}),validate:Tr({method:"POST",fullPath:"/v1/payment_method_domains/{payment_method_domain}/validate"})}),Ut=p.method,Jm=p.extend({create:Ut({method:"POST",fullPath:"/v1/payment_methods"}),retrieve:Ut({method:"GET",fullPath:"/v1/payment_methods/{payment_method}"}),update:Ut({method:"POST",fullPath:"/v1/payment_methods/{payment_method}"}),list:Ut({method:"GET",fullPath:"/v1/payment_methods",methodType:"list"}),attach:Ut({method:"POST",fullPath:"/v1/payment_methods/{payment_method}/attach"}),detach:Ut({method:"POST",fullPath:"/v1/payment_methods/{payment_method}/detach"})}),et=p.method,Xm=p.extend({retrieve:et({method:"GET",fullPath:"/v1/payment_records/{id}"}),reportPayment:et({method:"POST",fullPath:"/v1/payment_records/report_payment"}),reportPaymentAttempt:et({method:"POST",fullPath:"/v1/payment_records/{id}/report_payment_attempt"}),reportPaymentAttemptCanceled:et({method:"POST",fullPath:"/v1/payment_records/{id}/report_payment_attempt_canceled"}),reportPaymentAttemptFailed:et({method:"POST",fullPath:"/v1/payment_records/{id}/report_payment_attempt_failed"}),reportPaymentAttemptGuaranteed:et({method:"POST",fullPath:"/v1/payment_records/{id}/report_payment_attempt_guaranteed"}),reportPaymentAttemptInformational:et({method:"POST",fullPath:"/v1/payment_records/{id}/report_payment_attempt_informational"}),reportRefund:et({method:"POST",fullPath:"/v1/payment_records/{id}/report_refund"})}),qt=p.method,Qm=p.extend({create:qt({method:"POST",fullPath:"/v1/payouts"}),retrieve:qt({method:"GET",fullPath:"/v1/payouts/{payout}"}),update:qt({method:"POST",fullPath:"/v1/payouts/{payout}"}),list:qt({method:"GET",fullPath:"/v1/payouts",methodType:"list"}),cancel:qt({method:"POST",fullPath:"/v1/payouts/{payout}/cancel"}),reverse:qt({method:"POST",fullPath:"/v1/payouts/{payout}/reverse"})}),Sr=p.method,Zm=p.extend({create:Sr({method:"POST",fullPath:"/v1/plans"}),retrieve:Sr({method:"GET",fullPath:"/v1/plans/{plan}"}),update:Sr({method:"POST",fullPath:"/v1/plans/{plan}"}),list:Sr({method:"GET",fullPath:"/v1/plans",methodType:"list"}),del:Sr({method:"DELETE",fullPath:"/v1/plans/{plan}"})}),kr=p.method,eg=p.extend({create:kr({method:"POST",fullPath:"/v1/prices"}),retrieve:kr({method:"GET",fullPath:"/v1/prices/{price}"}),update:kr({method:"POST",fullPath:"/v1/prices/{price}"}),list:kr({method:"GET",fullPath:"/v1/prices",methodType:"list"}),search:kr({method:"GET",fullPath:"/v1/prices/search",methodType:"search"})}),Re=p.method,tg=p.extend({create:Re({method:"POST",fullPath:"/v1/products"}),retrieve:Re({method:"GET",fullPath:"/v1/products/{id}"}),update:Re({method:"POST",fullPath:"/v1/products/{id}"}),list:Re({method:"GET",fullPath:"/v1/products",methodType:"list"}),del:Re({method:"DELETE",fullPath:"/v1/products/{id}"}),createFeature:Re({method:"POST",fullPath:"/v1/products/{product}/features"}),deleteFeature:Re({method:"DELETE",fullPath:"/v1/products/{product}/features/{id}"}),listFeatures:Re({method:"GET",fullPath:"/v1/products/{product}/features",methodType:"list"}),retrieveFeature:Re({method:"GET",fullPath:"/v1/products/{product}/features/{id}"}),search:Re({method:"GET",fullPath:"/v1/products/search",methodType:"search"})}),xn=p.method,rg=p.extend({create:xn({method:"POST",fullPath:"/v1/promotion_codes"}),retrieve:xn({method:"GET",fullPath:"/v1/promotion_codes/{promotion_code}"}),update:xn({method:"POST",fullPath:"/v1/promotion_codes/{promotion_code}"}),list:xn({method:"GET",fullPath:"/v1/promotion_codes",methodType:"list"})}),Ne=p.method,ng=p.extend({create:Ne({method:"POST",fullPath:"/v1/quotes"}),retrieve:Ne({method:"GET",fullPath:"/v1/quotes/{quote}"}),update:Ne({method:"POST",fullPath:"/v1/quotes/{quote}"}),list:Ne({method:"GET",fullPath:"/v1/quotes",methodType:"list"}),accept:Ne({method:"POST",fullPath:"/v1/quotes/{quote}/accept"}),cancel:Ne({method:"POST",fullPath:"/v1/quotes/{quote}/cancel"}),finalizeQuote:Ne({method:"POST",fullPath:"/v1/quotes/{quote}/finalize"}),listComputedUpfrontLineItems:Ne({method:"GET",fullPath:"/v1/quotes/{quote}/computed_upfront_line_items",methodType:"list"}),listLineItems:Ne({method:"GET",fullPath:"/v1/quotes/{quote}/line_items",methodType:"list"}),pdf:Ne({method:"GET",fullPath:"/v1/quotes/{quote}/pdf",host:"files.stripe.com",streaming:!0})}),Pr=p.method,ag=p.extend({create:Pr({method:"POST",fullPath:"/v1/refunds"}),retrieve:Pr({method:"GET",fullPath:"/v1/refunds/{refund}"}),update:Pr({method:"POST",fullPath:"/v1/refunds/{refund}"}),list:Pr({method:"GET",fullPath:"/v1/refunds",methodType:"list"}),cancel:Pr({method:"POST",fullPath:"/v1/refunds/{refund}/cancel"})}),vs=p.method,sg=p.extend({retrieve:vs({method:"GET",fullPath:"/v1/reviews/{review}"}),list:vs({method:"GET",fullPath:"/v1/reviews",methodType:"list"}),approve:vs({method:"POST",fullPath:"/v1/reviews/{review}/approve"})}),ig=p.method,og=p.extend({list:ig({method:"GET",fullPath:"/v1/setup_attempts",methodType:"list"})}),ft=p.method,lg=p.extend({create:ft({method:"POST",fullPath:"/v1/setup_intents"}),retrieve:ft({method:"GET",fullPath:"/v1/setup_intents/{intent}"}),update:ft({method:"POST",fullPath:"/v1/setup_intents/{intent}"}),list:ft({method:"GET",fullPath:"/v1/setup_intents",methodType:"list"}),cancel:ft({method:"POST",fullPath:"/v1/setup_intents/{intent}/cancel"}),confirm:ft({method:"POST",fullPath:"/v1/setup_intents/{intent}/confirm"}),verifyMicrodeposits:ft({method:"POST",fullPath:"/v1/setup_intents/{intent}/verify_microdeposits"})}),vn=p.method,cg=p.extend({create:vn({method:"POST",fullPath:"/v1/shipping_rates"}),retrieve:vn({method:"GET",fullPath:"/v1/shipping_rates/{shipping_rate_token}"}),update:vn({method:"POST",fullPath:"/v1/shipping_rates/{shipping_rate_token}"}),list:vn({method:"GET",fullPath:"/v1/shipping_rates",methodType:"list"})}),_r=p.method,dg=p.extend({create:_r({method:"POST",fullPath:"/v1/sources"}),retrieve:_r({method:"GET",fullPath:"/v1/sources/{source}"}),update:_r({method:"POST",fullPath:"/v1/sources/{source}"}),listSourceTransactions:_r({method:"GET",fullPath:"/v1/sources/{source}/source_transactions",methodType:"list"}),verify:_r({method:"POST",fullPath:"/v1/sources/{source}/verify"})}),Ar=p.method,ug=p.extend({create:Ar({method:"POST",fullPath:"/v1/subscription_items"}),retrieve:Ar({method:"GET",fullPath:"/v1/subscription_items/{item}"}),update:Ar({method:"POST",fullPath:"/v1/subscription_items/{item}"}),list:Ar({method:"GET",fullPath:"/v1/subscription_items",methodType:"list"}),del:Ar({method:"DELETE",fullPath:"/v1/subscription_items/{item}"})}),Wt=p.method,hg=p.extend({create:Wt({method:"POST",fullPath:"/v1/subscription_schedules"}),retrieve:Wt({method:"GET",fullPath:"/v1/subscription_schedules/{schedule}"}),update:Wt({method:"POST",fullPath:"/v1/subscription_schedules/{schedule}"}),list:Wt({method:"GET",fullPath:"/v1/subscription_schedules",methodType:"list"}),cancel:Wt({method:"POST",fullPath:"/v1/subscription_schedules/{schedule}/cancel"}),release:Wt({method:"POST",fullPath:"/v1/subscription_schedules/{schedule}/release"})}),Le=p.method,pg=p.extend({create:Le({method:"POST",fullPath:"/v1/subscriptions"}),retrieve:Le({method:"GET",fullPath:"/v1/subscriptions/{subscription_exposed_id}"}),update:Le({method:"POST",fullPath:"/v1/subscriptions/{subscription_exposed_id}"}),list:Le({method:"GET",fullPath:"/v1/subscriptions",methodType:"list"}),cancel:Le({method:"DELETE",fullPath:"/v1/subscriptions/{subscription_exposed_id}"}),deleteDiscount:Le({method:"DELETE",fullPath:"/v1/subscriptions/{subscription_exposed_id}/discount"}),migrate:Le({method:"POST",fullPath:"/v1/subscriptions/{subscription}/migrate"}),resume:Le({method:"POST",fullPath:"/v1/subscriptions/{subscription}/resume"}),search:Le({method:"GET",fullPath:"/v1/subscriptions/search",methodType:"search"})}),Ko=p.method,mg=p.extend({retrieve:Ko({method:"GET",fullPath:"/v1/tax_codes/{id}"}),list:Ko({method:"GET",fullPath:"/v1/tax_codes",methodType:"list"})}),wn=p.method,gg=p.extend({create:wn({method:"POST",fullPath:"/v1/tax_ids"}),retrieve:wn({method:"GET",fullPath:"/v1/tax_ids/{id}"}),list:wn({method:"GET",fullPath:"/v1/tax_ids",methodType:"list"}),del:wn({method:"DELETE",fullPath:"/v1/tax_ids/{id}"})}),En=p.method,fg=p.extend({create:En({method:"POST",fullPath:"/v1/tax_rates"}),retrieve:En({method:"GET",fullPath:"/v1/tax_rates/{tax_rate}"}),update:En({method:"POST",fullPath:"/v1/tax_rates/{tax_rate}"}),list:En({method:"GET",fullPath:"/v1/tax_rates",methodType:"list"})}),Jo=p.method,yg=p.extend({create:Jo({method:"POST",fullPath:"/v1/tokens"}),retrieve:Jo({method:"GET",fullPath:"/v1/tokens/{token}"})}),Cr=p.method,bg=p.extend({create:Cr({method:"POST",fullPath:"/v1/topups"}),retrieve:Cr({method:"GET",fullPath:"/v1/topups/{topup}"}),update:Cr({method:"POST",fullPath:"/v1/topups/{topup}"}),list:Cr({method:"GET",fullPath:"/v1/topups",methodType:"list"}),cancel:Cr({method:"POST",fullPath:"/v1/topups/{topup}/cancel"})}),tt=p.method,xg=p.extend({create:tt({method:"POST",fullPath:"/v1/transfers"}),retrieve:tt({method:"GET",fullPath:"/v1/transfers/{transfer}"}),update:tt({method:"POST",fullPath:"/v1/transfers/{transfer}"}),list:tt({method:"GET",fullPath:"/v1/transfers",methodType:"list"}),createReversal:tt({method:"POST",fullPath:"/v1/transfers/{id}/reversals"}),listReversals:tt({method:"GET",fullPath:"/v1/transfers/{id}/reversals",methodType:"list"}),retrieveReversal:tt({method:"GET",fullPath:"/v1/transfers/{transfer}/reversals/{id}"}),updateReversal:tt({method:"POST",fullPath:"/v1/transfers/{transfer}/reversals/{id}"})}),Ir=p.method,vg=p.extend({create:Ir({method:"POST",fullPath:"/v1/webhook_endpoints"}),retrieve:Ir({method:"GET",fullPath:"/v1/webhook_endpoints/{webhook_endpoint}"}),update:Ir({method:"POST",fullPath:"/v1/webhook_endpoints/{webhook_endpoint}"}),list:Ir({method:"GET",fullPath:"/v1/webhook_endpoints",methodType:"list"}),del:Ir({method:"DELETE",fullPath:"/v1/webhook_endpoints/{webhook_endpoint}"})}),wg=Q("apps",{Secrets:Gp}),Eg=Q("billing",{Alerts:Ch,CreditBalanceSummary:Hh,CreditBalanceTransactions:Gh,CreditGrants:Yh,MeterEventAdjustments:lp,MeterEvents:fp,Meters:xp}),Tg=Q("billingPortal",{Configurations:jh,Sessions:Vp}),Sg=Q("checkout",{Sessions:Kp}),kg=Q("climate",{Orders:Ep,Products:Ip,Suppliers:Qp}),Pg=Q("entitlements",{ActiveEntitlements:Ah,Features:rp}),_g=Q("financialConnections",{Accounts:Sh,Sessions:Jp,Transactions:rm}),Ag=Q("forwarding",{Requests:Wp}),Cg=Q("identity",{VerificationReports:cm,VerificationSessions:dm}),Ig=Q("issuing",{Authorizations:Mh,Cardholders:Bh,Cards:Dh,Disputes:Qh,PersonalizationDesigns:_p,PhysicalBundles:Cp,Tokens:em,Transactions:nm}),Og=Q("radar",{EarlyFraudWarnings:Zh,ValueListItems:om,ValueLists:lm}),Mg=Q("reporting",{ReportRuns:Up,ReportTypes:qp}),Rg=Q("sigma",{ScheduledQueryRuns:Hp}),Ng=Q("tax",{Associations:Oh,Calculations:Nh,Registrations:zp,Settings:Xp,Transactions:am}),Bg=Q("terminal",{Configurations:Fh,ConnectionTokens:qh,Locations:ip,OnboardingLinks:wp,Readers:Op}),Dg=Q("testHelpers",{ConfirmationTokens:zh,Customers:Jh,Refunds:$p,TestClocks:Zp,Issuing:Q("issuing",{Authorizations:Rh,Cards:Lh,PersonalizationDesigns:Ap,Transactions:sm}),Terminal:Q("terminal",{Readers:Mp}),Treasury:Q("treasury",{InboundTransfers:ap,OutboundPayments:Tp,OutboundTransfers:kp,ReceivedCredits:Np,ReceivedDebits:Lp})}),Lg=Q("treasury",{CreditReversals:Vh,DebitReversals:Xh,FinancialAccounts:np,InboundTransfers:sp,OutboundPayments:Sp,OutboundTransfers:Pp,ReceivedCredits:Bp,ReceivedDebits:jp,TransactionEntries:tm,Transactions:im}),jg=Q("v2",{Billing:Q("billing",{MeterEventAdjustments:dp,MeterEventSession:hp,MeterEventStream:mp,MeterEvents:bp}),Core:Q("core",{AccountLinks:Eh,AccountTokens:Th,Accounts:_h,EventDestinations:ep,Events:tp})}),Tn=Object.freeze(Object.defineProperty({__proto__:null,Account:Fo,AccountLinks:hm,AccountSessions:mm,Accounts:Fo,ApplePayDomains:gm,ApplicationFees:fm,Apps:wg,Balance:bm,BalanceSettings:xm,BalanceTransactions:vm,Billing:Eg,BillingPortal:Tg,Charges:wm,Checkout:Sg,Climate:kg,ConfirmationTokens:Tm,CountrySpecs:Sm,Coupons:km,CreditNotes:Pm,CustomerSessions:Am,Customers:Cm,Disputes:Im,Entitlements:Pg,EphemeralKeys:Om,Events:Mm,ExchangeRates:Rm,FileLinks:Nm,Files:Lm,FinancialConnections:_g,Forwarding:Ag,Identity:Cg,InvoiceItems:jm,InvoicePayments:Fm,InvoiceRenderingTemplates:$m,Invoices:zm,Issuing:Ig,Mandates:qm,OAuth:Wm,PaymentAttemptRecords:Hm,PaymentIntents:Gm,PaymentLinks:Ym,PaymentMethodConfigurations:Vm,PaymentMethodDomains:Km,PaymentMethods:Jm,PaymentRecords:Xm,Payouts:Qm,Plans:Zm,Prices:eg,Products:tg,PromotionCodes:rg,Quotes:ng,Radar:Og,Refunds:ag,Reporting:Mg,Reviews:sg,SetupAttempts:og,SetupIntents:lg,ShippingRates:cg,Sigma:Rg,Sources:dg,SubscriptionItems:ug,SubscriptionSchedules:hg,Subscriptions:pg,Tax:Ng,TaxCodes:mg,TaxIds:gg,TaxRates:fg,Terminal:Bg,TestHelpers:Dg,Tokens:yg,Topups:bg,Transfers:xg,Treasury:Lg,V2:jg,WebhookEndpoints:vg},Symbol.toStringTag,{value:"Module"})),Xo="api.stripe.com",Qo="443",Zo="/v1/",el=yc,tl=8e4,rl=5,nl=.5,Fg=["name","version","url","partner_id"],al=["authenticator","apiVersion","typescript","maxNetworkRetries","httpAgent","httpClient","timeout","host","port","protocol","telemetry","appInfo","stripeAccount","stripeContext"],$g=t=>new Nr(t,p.MAX_BUFFERED_REQUEST_METRICS);function zg(t,r=$g){n.PACKAGE_VERSION="20.1.2",n.API_VERSION=yc,n.USER_AGENT=Object.assign({bindings_version:n.PACKAGE_VERSION,lang:"node",publisher:"stripe",uname:null,typescript:!1},Ju()),n.StripeResource=p,n.StripeContext=xt,n.resources=Tn,n.HttpClient=ke,n.HttpClientResponse=ac,n.CryptoProvider=sc,n.webhooks=xh(t);function n(a,s={}){if(!(this instanceof n))return new n(a,s);const i=this._getPropsFromConfig(s);this._platformFunctions=t,Object.defineProperty(this,"_emitter",{value:this._platformFunctions.createEmitter(),enumerable:!1,configurable:!1,writable:!1}),this.VERSION=n.PACKAGE_VERSION,this.on=this._emitter.on.bind(this._emitter),this.once=this._emitter.once.bind(this._emitter),this.off=this._emitter.removeListener.bind(this._emitter);const o=i.httpAgent||null;this._api={host:i.host||Xo,port:i.port||Qo,protocol:i.protocol||"https",basePath:Zo,version:i.apiVersion||el,timeout:as("timeout",i.timeout,tl),maxNetworkRetries:as("maxNetworkRetries",i.maxNetworkRetries,2),agent:o,httpClient:i.httpClient||(o?this._platformFunctions.createNodeHttpClient(o):this._platformFunctions.createDefaultHttpClient()),dev:!1,stripeAccount:i.stripeAccount||null,stripeContext:i.stripeContext||null};const l=i.typescript||!1;l!==n.USER_AGENT.typescript&&(n.USER_AGENT.typescript=l),i.appInfo&&this._setAppInfo(i.appInfo),this._prepResources(),this._setAuthenticator(a,i.authenticator),this.errors=vo,this.webhooks=n.webhooks,this._prevRequestMetrics=[],this._enableTelemetry=i.telemetry!==!1,this._requestSender=r(this),this.StripeResource=n.StripeResource}return n.errors=vo,n.createNodeHttpClient=t.createNodeHttpClient,n.createFetchHttpClient=t.createFetchHttpClient,n.createNodeCryptoProvider=t.createNodeCryptoProvider,n.createSubtleCryptoProvider=t.createSubtleCryptoProvider,n.prototype={_appInfo:void 0,on:null,off:null,once:null,VERSION:null,StripeResource:null,webhooks:null,errors:null,_api:null,_prevRequestMetrics:null,_emitter:null,_enableTelemetry:null,_requestSender:null,_platformFunctions:null,rawRequest(a,s,i,o){return this._requestSender._rawRequest(a,s,i,o)},_setAuthenticator(a,s){if(a&&s)throw new Error("Can't specify both apiKey and authenticator");if(!a&&!s)throw new Error("Neither apiKey nor config.authenticator provided");this._authenticator=a?_s(a):s},_setAppInfo(a){if(a&&typeof a!="object")throw new Error("AppInfo must be an object.");if(a&&!a.name)throw new Error("AppInfo.name is required");a=a||{},this._appInfo=Fg.reduce((s,i)=>(typeof a[i]=="string"&&(s=s||{},s[i]=a[i]),s),{})},_setApiField(a,s){this._api[a]=s},getApiField(a){return this._api[a]},setClientId(a){this._clientId=a},getClientId(){return this._clientId},getConstant:a=>{switch(a){case"DEFAULT_HOST":return Xo;case"DEFAULT_PORT":return Qo;case"DEFAULT_BASE_PATH":return Zo;case"DEFAULT_API_VERSION":return el;case"DEFAULT_TIMEOUT":return tl;case"MAX_NETWORK_RETRY_DELAY_SEC":return rl;case"INITIAL_NETWORK_RETRY_DELAY_SEC":return nl}return n[a]},getMaxNetworkRetries(){return this.getApiField("maxNetworkRetries")},_setApiNumberField(a,s,i){const o=as(a,s,i);this._setApiField(a,o)},getMaxNetworkRetryDelay(){return rl},getInitialNetworkRetryDelay(){return nl},getClientUserAgent(a){return this.getClientUserAgentSeeded(n.USER_AGENT,a)},getClientUserAgentSeeded(a,s){this._platformFunctions.getUname().then(i=>{var o;const l={};for(const u in a)Object.prototype.hasOwnProperty.call(a,u)&&(l[u]=encodeURIComponent((o=a[u])!==null&&o!==void 0?o:"null"));l.uname=encodeURIComponent(i||"UNKNOWN");const c=this.getApiField("httpClient");c&&(l.httplib=encodeURIComponent(c.getClientName())),this._appInfo&&(l.application=this._appInfo),s(JSON.stringify(l))})},getAppInfoAsString(){if(!this._appInfo)return"";let a=this._appInfo.name;return this._appInfo.version&&(a+=`/${this._appInfo.version}`),this._appInfo.url&&(a+=` (${this._appInfo.url})`),a},getTelemetryEnabled(){return this._enableTelemetry},_prepResources(){for(const a in Tn)Object.prototype.hasOwnProperty.call(Tn,a)&&(this[Yu(a)]=new Tn[a](this))},_getPropsFromConfig(a){if(!a)return{};const s=typeof a=="string";if(!(a===Object(a)&&!Array.isArray(a))&&!s)throw new Error("Config must either be an object or a string");if(s)return{apiVersion:a};if(Object.keys(a).filter(l=>!al.includes(l)).length>0)throw new Error(`Config object may only contain the following: ${al.join(", ")}`);return a},parseEventNotification(a,s,i,o,l,c){const u=this.webhooks.constructEvent(a,s,i,o,l,c);return u.context&&(u.context=xt.parse(u.context)),u.fetchEvent=()=>this._requestSender._rawRequest("GET",`/v2/core/events/${u.id}`,void 0,{stripeContext:u.context},["fetch_event"]),u.fetchRelatedObject=()=>u.related_object?this._requestSender._rawRequest("GET",u.related_object.url,void 0,{stripeContext:u.context},["fetch_related_object"]):Promise.resolve(null),u}},n}const Ug=zg(new sh),qg=JSON.parse('[{"id":37151,"slug":"rustic-barn-wedding-at-rolling-meadow-farm-sade-luke","title":{"rendered":"Rustic Barn Wedding at Rolling Meadow Farm | Sade + Luke"},"date":"2025-09-02T07:24:29","content":"<p>We hopped on a plane to Greensboro, NC for Sade + Luke’s wedding at <a href=\\"https://www.rollingmeadowfarmnc.com/\\" target=\\"_blank\\" rel=\\"noopener\\">Rolling Meadow Farm</a>, and honestly? 10/10, worth it. The rustic barn backdrop was already a dream, but the best part was getting to reconnect with an old friend on his happiest day ever and finally meet his amazing wife. The weather tried to mess with us — threatening rain — but instead we got full sunshine, golden hour fields, and then boom… the"},{"id":37039,"slug":"hudson-valley-barn-engagement-kate-steve","title":{"rendered":"Hudson Valley Barn Engagement | Kate + Steve"},"date":"2025-08-29T21:59:59","content":"<p>Kate and Steve’s Hudson Valley barn engagement wasn’t just pretty pictures — it was their family’s barn, the exact spot where they’ll say “I do” this November. That already makes it personal, but then you add a golden hour that hit just right, a little haze of farm dust floating in the light, and even their new puppy and lots of puppy kisses, and suddenly the whole place felt alive. This summer’s been cooler than the usual New York heatwave, so we had the perfect evening to wander between fie"},{"id":35090,"slug":"surprise-proposal-sarasota","title":{"rendered":"Surprise Proposal Sarasota | A Romantic Moment to Remember"},"date":"2024-09-30T16:15:15","content":"<div data-elementor-type=\\"wp-post\\" data-elementor-id=\\"35090\\" class=\\"elementor elementor-35090\\" data-elementor-post-type=\\"post\\">\\n\\t\\t\\t\\t<div class=\\"elementor-element elementor-element-d3cbcb2 e-flex e-con-boxed e-con e-parent\\" data-id=\\"d3cbcb2\\" data-element_type=\\"container\\">\\n\\t\\t\\t\\t\\t<div class=\\"e-con-inner\\">\\n\\t\\t\\t\\t<div class=\\"elementor-element elementor-element-0f5f91e elementor-widget elementor-widget-heading\\" data-id=\\"0f5f91e\\" data-element_type=\\"widget\\" data-widget_type=\\"heading.default\\">\\n\\t\\t\\t\\t<div clas"},{"id":34575,"slug":"cold-spring-ny-wedding-zeynep-dominic","title":{"rendered":"Cold Spring NY Wedding | Zeynep + Dominic’s Dream Celebration in the Hudson Valley&#8221;"},"date":"2024-09-05T05:29:12","content":"<p>Cold Spring NY Wedding dreams come to life in the scenic Hudson Valley, where nature and charm combine to create unforgettable celebrations. Nestled in the heart of this picturesque region, Cold Spring, NY, served as the perfect backdrop for Zeynep and Dominic&#8217;s stunning wedding. With its charming streets, breathtaking river views, and vibrant green foliage, this Hudson Valley treasure set the stage for a remarkable day filled with love and elegance. From the historic West Point Foundry"},{"id":34525,"slug":"piano-teacher-photo-session-mistico-restaurant-miami-fl","title":{"rendered":"Piano Teacher Photo Session | Mistico Restaurant, Miami FL"},"date":"2023-11-11T13:09:05","content":"<div data-elementor-type=\\"wp-post\\" data-elementor-id=\\"34525\\" class=\\"elementor elementor-34525\\" data-elementor-post-type=\\"post\\">\\n\\t\\t\\t\\t\\t\\t<section class=\\"elementor-section elementor-top-section elementor-element elementor-element-9f5b32b elementor-section-boxed elementor-section-height-default elementor-section-height-default\\" data-id=\\"9f5b32b\\" data-element_type=\\"section\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"elementor-container elementor-column-gap-default\\">\\n\\t\\t\\t\\t\\t<div class=\\"elementor-column elementor-col-100 element"},{"id":34477,"slug":"family-portrait-photos-at-villa-del-balbianello-lake-como","title":{"rendered":"Family Portrait Photos at Villa del Balbianello | Lake Como"},"date":"2023-10-31T18:24:40","content":"<div data-elementor-type=\\"wp-post\\" data-elementor-id=\\"34477\\" class=\\"elementor elementor-34477\\" data-elementor-post-type=\\"post\\">\\n\\t\\t\\t\\t<section class=\\"elementor-section elementor-top-section elementor-element elementor-element-296264f7 elementor-section-boxed elementor-section-height-default elementor-section-height-default\\" data-id=\\"296264f7\\" data-element_type=\\"section\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"elementor-container elementor-column-gap-default\\">\\n\\t\\t\\t\\t\\t<div class=\\"elementor-column elementor-col-100 element"},{"id":34271,"slug":"family-photo-shoot-at-villa-del-balbianello-lake-como-italy","title":{"rendered":"Family Photo Shoot at Villa del Balbianello | Lake Como Italy"},"date":"2023-10-31T17:00:41","content":"<p></p></p>\\n<p>Have you ever dreamed of visiting a fairy-tale villa on the shores of a beautiful lake? That’s exactly what we did when we went to Villa del Balbianello, one of the most marvelous places on Lake Como. We were fortunate enough to have our dear friends and gorgeous Artiles family join us for this unforgettable experience. And of course, we couldn’t miss the opportunity to capture some stunning photos of our happy moments together.</p>\\n<p><p></p></p>\\n<p>Villa del Balbianello is not j"},{"id":34382,"slug":"davie-fl-wedding-photography","title":{"rendered":"Davie FL Wedding Photography | Alicia + Claudio"},"date":"2023-10-29T03:40:06","content":"<div data-elementor-type=\\"wp-post\\" data-elementor-id=\\"34382\\" class=\\"elementor elementor-34382\\" data-elementor-post-type=\\"post\\">\\n\\t\\t\\t\\t\\t\\t<section class=\\"elementor-section elementor-top-section elementor-element elementor-element-41a0aab elementor-section-boxed elementor-section-height-default elementor-section-height-default\\" data-id=\\"41a0aab\\" data-element_type=\\"section\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"elementor-container elementor-column-gap-default\\">\\n\\t\\t\\t\\t\\t<div class=\\"elementor-column elementor-col-100 element"},{"id":33646,"slug":"20th-anniversary-photo-session","title":{"rendered":"20th Anniversary Photo Session | Mares Family"},"date":"2023-05-13T02:56:02","content":"<div data-elementor-type=\\"wp-post\\" data-elementor-id=\\"33646\\" class=\\"elementor elementor-33646\\" data-elementor-post-type=\\"post\\">\\n\\t\\t\\t\\t\\t\\t<section class=\\"elementor-section elementor-top-section elementor-element elementor-element-a3630e0 elementor-section-boxed elementor-section-height-default elementor-section-height-default\\" data-id=\\"a3630e0\\" data-element_type=\\"section\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"elementor-container elementor-column-gap-default\\">\\n\\t\\t\\t\\t\\t<div class=\\"elementor-column elementor-col-100 element"},{"id":33543,"slug":"newborn-session","title":{"rendered":"Newborn Session | Baby Noah"},"date":"2023-03-28T02:28:11","content":"<div data-elementor-type=\\"wp-post\\" data-elementor-id=\\"33543\\" class=\\"elementor elementor-33543\\" data-elementor-post-type=\\"post\\">\\n\\t\\t\\t\\t\\t\\t<section class=\\"elementor-section elementor-top-section elementor-element elementor-element-d4b6989 elementor-section-boxed elementor-section-height-default elementor-section-height-default\\" data-id=\\"d4b6989\\" data-element_type=\\"section\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"elementor-container elementor-column-gap-default\\">\\n\\t\\t\\t\\t\\t<div class=\\"elementor-column elementor-col-100 element"},{"id":33456,"slug":"tree-tops-park-family-photo-shoot","title":{"rendered":"Tree Tops Park Family Photo Shoot"},"date":"2023-02-16T22:56:01","content":"<div data-elementor-type=\\"wp-post\\" data-elementor-id=\\"33456\\" class=\\"elementor elementor-33456\\" data-elementor-post-type=\\"post\\">\\n\\t\\t\\t\\t\\t\\t<section class=\\"elementor-section elementor-top-section elementor-element elementor-element-8bb9bfa elementor-section-boxed elementor-section-height-default elementor-section-height-default\\" data-id=\\"8bb9bfa\\" data-element_type=\\"section\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"elementor-container elementor-column-gap-default\\">\\n\\t\\t\\t\\t\\t<div class=\\"elementor-column elementor-col-100 element"},{"id":32979,"slug":"ritz-carlton-wedding-coconut-grove-pakistani-syrian","title":{"rendered":"Ritz Carlton Wedding | Coconut Grove | Pakistani &amp; Syrian | Kawthr + Hamad"},"date":"2023-01-18T22:35:32","content":"<div data-elementor-type=\\"wp-post\\" data-elementor-id=\\"32979\\" class=\\"elementor elementor-32979\\" data-elementor-post-type=\\"post\\">\\n\\t\\t\\t\\t<section class=\\"elementor-section elementor-top-section elementor-element elementor-element-3ed3ab6 elementor-section-boxed elementor-section-height-default elementor-section-height-default\\" data-id=\\"3ed3ab6\\" data-element_type=\\"section\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"elementor-container elementor-column-gap-default\\">\\n\\t\\t\\t\\t\\t<div class=\\"elementor-column elementor-col-100 elementor"},{"id":32803,"slug":"50th-anniversary-photography","title":{"rendered":"50th Anniversary Photography"},"date":"2022-12-16T05:47:29","content":"<p>For us, there&#8217;s nothing more special then to witness this kind of celebrations! 50 years of marriage is something truly special, a huge milestone on its own. And having your family throw a surprise party for you to celebrate this incredible milestone makes it even more special! Congratulations Angela &amp; Heberto! Enjoy some of our favorite images of this gorgeous celebration!</p><figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\" height=\\"683\\" data-src=\\"https:/"},{"id":32617,"slug":"vizcaya-portrait-session","title":{"rendered":"Vizcaya Portrait Session"},"date":"2022-12-13T01:05:56","content":"<p>Vizcaya has always been a playground for us as photographers, because it has so much to offer.  From the beautiful mansion that&#8217;s an iconic place to visit in South Florida, to the gorgeous manicured gardens that are always breathtaking to see. </p><p>When we bring our clients here, we love seeing their reactions.  When they see the new scenes for their photo shoot, even though Vizcaya is one place for their photoshoot, it truly offers so many different scenarios.  The bay is definitely "},{"id":32439,"slug":"family-beach-sunrise-photos-cardiello-family","title":{"rendered":"Family Beach Sunrise Photos | Cardiello Family"},"date":"2022-11-09T00:11:39","content":"<p>Time for our yearly family sessions to start rolling.  We LOVE it when its this family&#8217;s turn as they are dear friends and truly so special to us</p><p>This year they decided to go for a different look so we headed at 6AM to Pompano beach for a sunrise photo session. Worth is? 100%!! The only way to get the water and crazy sky colors is at sunrise for South Florida and trust me, those colors will not disappoint, they are simply incredible!</p><p>Enjoy some of our favorites from this bea"},{"id":32327,"slug":"robbins-preserve-maternity-session-carol-diego","title":{"rendered":"Robbins Preserve Maternity Session | Carol + Diego"},"date":"2022-10-25T12:47:03","content":"<div data-elementor-type=\\"wp-post\\" data-elementor-id=\\"32327\\" class=\\"elementor elementor-32327\\" data-elementor-post-type=\\"post\\">\\n\\t\\t\\t\\t<section class=\\"elementor-section elementor-top-section elementor-element elementor-element-7ed9a48c elementor-section-boxed elementor-section-height-default elementor-section-height-default\\" data-id=\\"7ed9a48c\\" data-element_type=\\"section\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"elementor-container elementor-column-gap-default\\">\\n\\t\\t\\t\\t\\t<div class=\\"elementor-column elementor-col-100 element"},{"id":32270,"slug":"tree-tops-park-family-session-giacaman-family","title":{"rendered":"Tree Tops Park Family Session | Giacaman Family"},"date":"2022-10-10T15:14:34","content":"<p>Happy anniversary to our brother and sister!!! What a more precious way to celebrate such an important day than keeping these memories forever! </p><p>We took these photos right after hurricane Ian, so you could only imagine the amount of mosquitos there were after so much rain! We had to literally rush to take them before they would eat us alive lol. but you wouldn&#8217;t even imagine that by looking at the pictures! They did so good! </p><p>We went to one of our favorites parks to do famil"},{"id":32165,"slug":"sheraton-suites-fort-lauderdale-plantation-wedding-jessica-kiran","title":{"rendered":"Sheraton Suites Fort Lauderdale Plantation Wedding | Jessica + Kiran"},"date":"2022-10-06T22:50:08","content":"<p>What happens when you mix an Indian family with a Jewish family for a wedding? You get the FUNNEST wedding EVER! Even though there was a huge thunderstorm outside of the building, inside the party was lit! We&#8217;ve known the Levine family for many years, since Jessica&#8217;s sister got married! And we feel so blessed to be able to keep photographing this beautiful family! </p><p>Thank you for having us create memories for you to cherish forever! Enjoy some of our favorites: </p><p></p><fi"},{"id":31994,"slug":"whitney-farms-golf-course-wedding-monroe-ct-jennifer-gregory","title":{"rendered":"Whitney Farms Golf Course Wedding &#8211; Monroe, CT | Jennifer + Gregory"},"date":"2022-09-21T23:26:19","content":"<p>Jennifer and Gregory had their destination wedding at the Whitney Farms Gold Club in Monroe, CT. We met the very day of their wedding! Here&#8217;s how:</p><p>Just about two weeks prior to their wedding, I received a text message from Jennifer to see if we were available for their big day. After having to postpone their wedding during covid like many couples, they officially got married a year and a half ago and finally were able to celebrate their marriage with their closest family and frien"},{"id":31610,"slug":"destination-wedding-destin-fl-dawn-terry","title":{"rendered":"Destination Wedding &#8211; Destin, FL | Dawn + Terry"},"date":"2022-08-27T23:52:50","content":"<p>This next DESTINation wedding was everything! We flew out to Destin, FL to  shoot Dawn and Terry&#8217;s big day and were so happy to finally be able to meet them!</p><p>First of all, if you haven&#8217;t been to Destin yet, what are you waiting for? With a little bit of Mexico, Naples and Key West, Destin has the best of all worlds combined. From awesome food trucks to gorgeous Greek-like towns. Travelers from all over the US fly to Destin to enjoy the party scene but also the gorgeous cryst"},{"id":31430,"slug":"deer-creek-country-club-wedding-sabrina-andersson","title":{"rendered":"Deer Creek Country Club Wedding | Sabrina + Andersson"},"date":"2022-08-12T22:24:09","content":"<p>Had the pleasure of shooting Sabrina and Andersson this past weekend at the Deer Creek Country Club in Deerfield Beach. </p><p>We&#8217;ve known the Duarte&#8217;s for such a long time and it was so awesome being able to be a part of this very special day and being able to capture these beautiful moments for Sabrina and Andersson. </p><p>@Janydidmyhair rocked Sabrina&#8217;s hair and makeup and the Deer Creek Country Club was absolutely amazing to shoot at. We had the perfect day with clear s"},{"id":31239,"slug":"doral-park-country-club-heidy-david","title":{"rendered":"Doral Park Country Club | Heidy + David"},"date":"2022-08-08T18:30:19","content":"<p>Heidy is a very special girl to us, she&#8217;s the sweetest person in the room, funny and always giving, so when she called us to let us know about her wedding plans, we were so excited for her and honored to be part of her special day! </p><p>The day started with us capturing some quick getting ready shots of Heidy and David, and when I say quick I mean 20 minutes quick for both bride and groom who were getting ready at the same location, then we headed to a beautiful Kingdom Hall to witnes"},{"id":31186,"slug":"atticus-roche-miami-newborn-session","title":{"rendered":"Atticus Roche | Miami Newborn Session"},"date":"2022-08-06T17:03:29","content":"<p>One of our favorite sessions to shoot are newborn lifestyle photography, specially when dear friends calls us to capture these moments for them. Meet baby Atticus, the newest member to this gorgeous family! He&#8217;s a tiny little bundle of joy. Enjoy some of our favorites from this very special miami newborn session:</p><figure class=\\"wp-block-image size-full\\"><img decoding=\\"async\\" width=\\"1920\\" height=\\"1280\\" data-src=\\"https://acromatico.com/wp-content/uploads/2022/08/Miami-Newborn-Session-1"},{"id":31143,"slug":"south-florida-engagement-session-heidy-david","title":{"rendered":"South Florida Engagement Session | Heidy + David"},"date":"2022-07-06T16:53:02","content":"<p>What an honor it was to take these quick images of our friend Heidy and David. This was the most chill and casual session we&#8217;ve ever done. We went to our small park next to our house and litteraly took 15 minutes to take these quick images of them. We literally cannot wait till the wedding day! You guys make such a beautiful couple and we love to be part of your memories in this very special way! Love you, enjoy some of our favorites:</p><p></p><figure class=\\"wp-block-image size-full\\"><"},{"id":31093,"slug":"weston-baby-shower-atticus","title":{"rendered":"Weston Baby Shower | Atticus"},"date":"2022-06-06T15:04:06","content":"<p>Katrina and Billy are very special to us. They are dear friends of ours and we&#8217;ve been working together with them for a long time. We feel blessed to be called for their special events like births, baby showers, family events and yearly photo sessions. It&#8217;s so special to be part of our friends family this way. Their home has a gallery of moments throughout their history together and we feel blessed to have created so many of those memories for them that they will cherish forever. "},{"id":31049,"slug":"tree-tops-park-family-session-grugal-family","title":{"rendered":"Tree Tops Park Family Session | Grugal Family"},"date":"2022-06-06T14:31:48","content":"<p>This session hits our hearts so much. After seeing a post we made on instagram about how special your pets are we got a message asking us to do this family session because they don&#8217;t know how much more time they have left with their precious dog. Broke our hearts to hear this but felt so privileged to be able to give this family these memories to cherish forever with their beloved family member. The Grugal&#8217;s are also celebrating their 20th anniversary so we took advantage to make "},{"id":30960,"slug":"coral-gables-entrance-park","title":{"rendered":"Coral Gables Entrance Park"},"date":"2022-06-01T02:25:50","content":"<p>For this session we went to one of our favorite spots in South Florida that screams &#8220;Europe&#8221;. No, its not Vizcaya, we are talking about the Coral gables Entrance Park also known as &#8220;El Prado Entrance&#8221;.</p><figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"533\\" height=\\"800\\" data-src=\\"https://acromatico.com/wp-content/uploads/2022/06/Coral-Gables-Entrance-Park-Anniversary-Session-1.jpg\\" alt=\\"coral gables entrance park pergolas\\" class=\\"wp-image-30962 l"},{"id":30830,"slug":"greenpoint-loft-wedding-brooklyn-nessa-torry","title":{"rendered":"Greenpoint Loft Wedding &#8211; Brooklyn | Nessa + Torry"},"date":"2022-04-19T01:17:34","content":"<p>Just a few months ago, we were together with Nessa and Torry for their <a href=\\"https://acromatico.com/awosting-falls-engagement-nessa-torry/\\">engagement session</a>. By the time the session ended, we nearly froze to death. Clearly, the cold loves us. Despite spring finally springing, it was a nice and cool day on this Brooklyn wedding day. </p><p>Before heading to The Williamsburg Hotel we did a pit stop at Upstate Stock  to get fueled up for the day. It&#8217;s our fave! Nessa awaited us at"},{"id":30798,"slug":"newborn-photography-emilia","title":{"rendered":"Newborn Photography | Emilia"},"date":"2022-04-13T00:04:55","content":"<p>Lately, I&#8217;ve had the honor to work with brand new clients. By brand new, I mean new to the world! This little one is just six days old in these photos. Her name is Emilia and she was absolutely fantastic to work with!</p><p>Just a few weeks ago, I got to shoot her while she was still baking in the oven! Can&#8217;t believe she&#8217;s out in this world now, loved so much by her parents and everyone around her!</p><p>Check out her very first glamour shots, how do you think she did?</p><f"},{"id":30636,"slug":"lightner-museum-wedding-jane-dez","title":{"rendered":"Lightner Museum Wedding | Jane + Dez"},"date":"2022-04-05T01:51:08","content":"<p>After 20 years of creating moments and memories for beautiful people, I don&#8217;t think that we&#8217;ve ever taken so many photos in any wedding, ever!</p><p>I still can&#8217;t believe that it&#8217;s only been a year since Jane + Dez got <a href=\\"https://acromatico.com/secret-gardens-miami-engagement-session-jane-denzel/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">engaged at the Secret Gardens in Miami </a> and now we are here, witnessing one of the most important days of their lives at t"},{"id":30459,"slug":"lifestyle-newborn-session-jaelyn","title":{"rendered":"Lifestyle Newborn Session | Jaelyn"},"date":"2022-03-30T18:51:23","content":"<p>This lifestyle newborn session was extremely special to me. I got to photograph my dear friends&#8217; newborn, Jaelyn. They&#8217;re not just any friends, they&#8217;re the couple that we got to see fall in love with eachother right from the very day they met. I photographed their proposal, engagement, wedding, baby reveal and now this newborn session.</p><p>I&#8217;ve never seen so much love in one room. Being able to capture some natural, candid, shots of this new mama was just an amazing "},{"id":30424,"slug":"glen-island-park-maternity-ny-paula","title":{"rendered":"Glen Island Park Maternity, NY | Paula"},"date":"2022-03-30T18:23:17","content":"<p>For this next maternity sesh, we ended up nailing the PERFECT day during this bipolar spring weather here in NY.</p><p>Glen Island Park is such a great, diverse, location for some awesome pics. From castle to ruins, harbor to docks, greenery to beautiful trees. It has it all! On this 70 degree day, we took some light and airy boho shots of this mommy to be, Paula. </p><p>Maternity sessions, to me, aren&#8217;t just about the belly but the journey. What you&#8217;re feeling, how empowered you "},{"id":30403,"slug":"miami-studio-headshots-kata-carlos","title":{"rendered":"Miami Studio Headshots | Kata + Carlos"},"date":"2022-03-16T05:47:17","content":"<figure class=\\"wp-block-gallery columns-1 is-cropped wp-block-gallery-54 is-layout-flex wp-block-gallery-is-layout-flex\\"><ul class=\\"blocks-gallery-grid\\"><li class=\\"blocks-gallery-item\\"><figure><img decoding=\\"async\\" width=\\"1024\\" height=\\"683\\" data-src=\\"https://acromatico.com/wp-content/uploads/2022/03/Kata-Carlos-Axon-LATAM-1-1024x683.jpg\\" alt=\\"\\" data-id=\\"30405\\" data-full-url=\\"https://acromatico.com/wp-content/uploads/2022/03/Kata-Carlos-Axon-LATAM-1.jpg\\" data-link=\\"https://acromatico.com/?attachm"},{"id":30320,"slug":"miami-family-session-von-kretschmann-family","title":{"rendered":"Miami Family Session | Von Kretschmann Family"},"date":"2022-01-22T00:33:04","content":"<p>All the way from Chile meet this gorgeous family! Carol (the one with the green shirt)  is my sister in law that I happen to consider my best friend in life. I know not everyone is so blessed to have friendships like this one so if you do, always try to remind them how special they are. It&#8217;s funny how things happened, how we met and all the things we&#8217;ve lived together ever since. We&#8217;ve known each other since we were 13, we even went to the same school and we&#8217;ve been be"},{"id":30256,"slug":"awosting-falls-engagement-nessa-torry","title":{"rendered":"Awosting Falls Engagement | Nessa + Torry"},"date":"2021-12-23T23:52:03","content":"<p>They&#8217;ve been friends since they were 17. He loves Brooklyn, she loves nature. Meet Nessa and Torry!</p><p>He popped the question right at Central Park, I mean, how dreamy is that? Despite both being from the city, they wanted an upstate engagement session. Tricky part? Um, it&#8217;s kind of freezing!</p><p>Despite the ridiculously cold weather, we decided to go for it. Awosting Falls is the perfect spot for an engagement session. The best part? It was totally empty! The cold kept every"},{"id":30109,"slug":"pullman-miami-airport-hotel-wedding-oni-noel","title":{"rendered":"Pullman Miami Airport Hotel Wedding | Oni + Noel"},"date":"2021-12-09T05:08:55","content":"<p>The day is finally here! We got to witness Oni and Noel say &#8220;I Do&#8221; at the Pullman Miami Airport Hotel for their wedding.</p><p>A perfect winter day? This one! In South Florida that is&#8230;Sunny sky, zero humidity and most importantly, it wasn&#8217;t 20 degrees.</p><p>This wedding was proudly sponsored by lifesavers, because we sure did have some of them. Despite the many little hiccups, we all made it through.   The weather could not have been MORE perfect! This wedding was a t"},{"id":30038,"slug":"boho-senior-portrait-bal-harbour-jocelyn","title":{"rendered":"Boho Senior Portrait, Bal Harbour | Jocelyn"},"date":"2021-12-07T05:01:52","content":"<p>Senior sessions don&#8217;t come too too often for us, but when they do, we LOVE them.</p><p>We got to shoot Jocelyn&#8217;s boho senior portrait sesh at Bal Harbour Beach, one of our favorite beach locations to shoot at. </p><p>Working with Jocelyn was so refreshing and inspiring. Despite never having met her before, we felt an instant connection and my camera sure felt it! I asked her to give me a little vision of what she wanted and the rest was so easy. Capturing her contagious, energetic"},{"id":29913,"slug":"crystal-ballroom-wedding-alissa-imran","title":{"rendered":"Crystal Ballroom Wedding | Alissa + Imran"},"date":"2021-12-04T03:45:23","content":"<p>We had the opportunity to shoot Alissa and Imran&#8217;s <a href=\\"https://acromatico.com/fort-lauderdale-indian-wedding-alissa-imran/\\">Indian wedding</a> ceremony and now we get to do it all over again at the <a href=\\"https://www.crystalballroom.com/\\" target=\\"_blank\\" rel=\\"noopener\\">Crystal Ballroom</a> in Beach Place, Fort Lauderdale!</p><p>This multicultural couple has been a true blast to work with! A little boy, a newborn and having to plan two weddings, sure wasn&#8217;t an easy task. Yet"},{"id":29807,"slug":"wynwood-portrait-alexa","title":{"rendered":"Wynwood Portrait | Alexa"},"date":"2021-11-30T03:51:20","content":"<p>Had the pleasure of working with Alexa for this amazing Wynwood portrait featuring some of the amazing boho accessories from <a href=\\"https://www.instagram.com/kashiidesigns/\\" target=\\"_blank\\" rel=\\"noopener\\">Kashii Designs</a>!</p><p>Everyone knows Wynwood screams color and these amazing colors brought to life these beautiful crafted pieces made by wayuu artisans right from Colombia.</p><p>We got to shoot some of these pieces to be featured on their website and ig to prove that these amazing a"},{"id":29769,"slug":"robbins-preserve-family-session-seedman-family","title":{"rendered":"Robbins Preserve Family Session | Seedman Family"},"date":"2021-11-29T04:41:55","content":"<p>It was an absolute pleasure being able to be a part of the Seedman&#8217;s Family session for this year! </p><p>This little family was celebrating life, milestones and happiness while getting ready to run a 5k the next day. Truly inspirational family and I&#8217;m so happy I got to work with you all.</p><p>Robbins Preserve Park has been so fun to shoot at. No matter the amount of times we come here, it&#8217;s always a new perspective and no two sessions are ever the same.</p><p>Thank you for"},{"id":29717,"slug":"newborn-photography-celine","title":{"rendered":"Newborn Photography | Celine"},"date":"2021-11-29T03:11:55","content":"<p>This next post has our hearts! We got to do Celine&#8217;s newborn photography session at only 2 weeks old!</p><p>These proud parents got to have their second little girl and they couldn&#8217;t be more thrilled. This household is filled with all girls, including their doggie Belle. Needless to say, they&#8217;ve created some beautiful girls and we&#8217;re so proud to have been able to photograph both newborn photography sessions for them.</p><p>You might remember Claire in her newborn photo"},{"id":29657,"slug":"hugh-taylor-birch-park-family-session-visbal-family","title":{"rendered":"Hugh Taylor Birch Park  Family Session | Visbal Family"},"date":"2021-11-28T23:46:00","content":"<p>For our yearly family photo session with the Visbal Family, we made sure to get everything booked and set for them way ahead of time. Nothing was going to get in the way of their 2021 session&#8230;except when it comes to rain. It ALWAYS gets in the way.</p><p>Despite having to reschedule their Hugh Taylor Birch Park Family Session twice&#8230;it&#8217;s true what they say about the third time&#8230;except, it wasn&#8217;t a charm! Our actual rescheduled, photoshoot raincheck date, ended up r"},{"id":29540,"slug":"fort-lauderdale-indian-wedding-alissa-imran","title":{"rendered":"Fort Lauderdale Indian Wedding | Alissa + Imran"},"date":"2021-11-28T03:55:00","content":"<p>This next amazing wedding, was a cultural celebration right in the heart of Fort Lauderdale.</p><p>Alissa + Imran got to have their Indian Wedding celebration with their closest family and friends and we got to be a part of it! It was so much fun being able to work together with this beautiful couple. It was such a pleasure to be able to work with thee most amazing team:</p><p>MUA: <a href=\\"http://www.dejalanee.com\\" target=\\"_blank\\" rel=\\"noopener\\">Deja Lanee</a> + <a href=\\"http://www.makemeupn"},{"id":29478,"slug":"the-cruz-building-engagement-oni-noel","title":{"rendered":"The Cruz Building Engagement | Oni + Noel"},"date":"2021-11-10T23:09:16","content":"<p>This next couple will be getting married next month and we cannot wait!</p><p>Planning a wedding can be very overwhelming, especially during a pandemic, while a million unexpected things in life..just happen! Despite it all, Oni and Noel got to have their beautiful engagement session at the Cruz Building.</p><p>What a way to look so elegant and radiating through these epic photos. They sure came dressed to impress and we were totally loving it. </p><p>Warm tones, lots of light and drama, the "},{"id":29409,"slug":"dog-family-portrait-doozer-buckley","title":{"rendered":"Dog Family Portrait | Doozer + Buckley"},"date":"2021-11-03T17:26:02","content":"<p>They say (..who&#8217;s they?) &#8220;A house is not a home without a dog.&#8221; I can totally testify to that. Dana and Wesley are blessed to have TWO of them. They are the humans to the doggos Doozer and Buckley, were such a pleasure to work with for their Dog Family Portrait.</p><p>It&#8217;s not every day you get to marry your two loves: dogs and photography. I was totally stoked to be able to work on this one. This session was extra special as it was gifted to them by their lovely mom. "},{"id":29309,"slug":"robbins-preserve-family-session-campilii-family","title":{"rendered":"Robbins Preserve Family Session | Campilii Family"},"date":"2021-10-25T00:26:11","content":"<p>Where do you even begin when you get to shoot your favorite people at Robbins Park for their family session?</p><p>First of all, I&#8217;m extremely proud to call you my family:  brother, sister and coolest nephews in the world. Ale and Italo, you&#8217;ve taught me everything I know and I owe it all to the two of you. You&#8217;ve gifted me my career and I&#8217;m happy to be able to gift you these memories that I know you&#8217;ll be able to remember forever.</p><p>There&#8217;s so much to "},{"id":29230,"slug":"bal-harbour-anniversary-photoshoot-ashley-alex","title":{"rendered":"Bal Harbour Anniversary Photoshoot | Ashley + Alex"},"date":"2021-10-23T17:49:13","content":"<p>Ashely and Alex decided to celebrate their one year anniversary by capturing their memories at Bal Harbour.</p><p>Italo shot their wedding last year during their anniversary (they share the same wedding date!) and we go to capture their love after one year and a pandemic later.</p><p>Ashely said she wanted to get some boho vibes and also get in the water. This was a true recipe for BOMB beach photos! We love adventurous couples that are always up for anything. Despite not being a huge fan of "},{"id":29144,"slug":"matheson-hammock-park-family-portrait-cardiello-family","title":{"rendered":"Matheson Hammock Park Family Portrait | Cardiello Family"},"date":"2021-10-11T17:57:19","content":"<p>The family keeps growing and growing and we are so happy to capture the Cardiello Family for their yearly family portraits. </p><p>This time, we headed out to Matheson Hammock Park for this family sesh!</p><p>It was so fun capturing our dear friends and watching kids be kids. There&#8217;s nothing like siblings and it&#8217;s amazing how kids can get so big in the blink of an eye. Little Luca is already walking!</p><p>Such a pleasure being with you and creating some memories, enjoy some of ou"},{"id":29096,"slug":"tree-tops-park-maternity-josey-freddie","title":{"rendered":"Tree Tops Park Maternity | Josey + Freddie"},"date":"2021-10-08T13:54:18","content":"<p>There&#8217;s nothing better than watching a family grow, this time, with T W I N S. I had the honor of shooting Josey and Freddie&#8217;s Maternity sesh at Tree Tops Park for a true evergreen experience.</p><p>We just love Tree Tops Park and it never gets old coming here. It&#8217;s perfect for all types of sessions but this kind was truly something else. </p><p>They weren&#8217;t planning on having covid babies, little did they expect they&#8217;d be having covid twins! Yet, they rolled wit"},{"id":28888,"slug":"fern-forest-nature-center-wedding-geriliz-paul","title":{"rendered":"Fern Forest Nature Center Wedding | Geriliz + Paul"},"date":"2021-10-04T23:59:07","content":"<p>Limoncello, San Pellegrino, Pasta and ferns. This is how I&#8217;d sum up this Italian inspired Floridian wedding at the Fern Forest Nature Center.</p><p>It was such a pleasure finally getting to meet Geriliz and Paul. I have to say, this has been one of the most planned out weddings that actually everything went exactly as planned (and you KNOW that&#8217;s rare). You&#8217;re officially hired as a wedding planner, hehe!</p><p>Despite having a small, intimate wedding, this was definitely one"},{"id":28745,"slug":"vip-country-club-indian-wedding-ny-tessa-kurien","title":{"rendered":"VIP Country Club Indian Wedding, NY &#8211; Tessa + Kurien"},"date":"2021-07-30T04:33:28","content":"<p>We met Tessa and Kurien on their very own wedding day. The day couldn&#8217;t have been more perfect. End of July with zero humidity and a sunny day? I&#8217;ll take it!</p><p>How did we meet? This very day. It&#8217;s true. We don&#8217;t get to meet many of our bride and grooms until their wedding day. We usually prefer to even do an engagement session prior to the big day so we have a chance to bond and form a relationship.</p><p>Despite meeting Tessa and Kurien right on the spot, it was a"},{"id":28658,"slug":"bill-baggs-state-park-family-session-the-rivera-family","title":{"rendered":"Bill Baggs State Park Family Session |The Rivera Family"},"date":"2021-07-28T23:29:17","content":"<p>We went to the gorgeous Bill Baggs Cape Florida State Park for this unforgettable session! The first of many to come for this absolutely stunning family of 3. When Daniela contacted us to photograph her family we were extremely happy! not only because they are good friends but also because they have the MOST delicious baby boy and we couldn&#8217;t wait to meet him. You&#8217;ll see what we are talking about when you scroll down and see him and his beautiful big blue eyes. Enjoy some of our f"},{"id":28566,"slug":"firefighter-family-session-the-albadalejo-family","title":{"rendered":"Firefighter Family Session | The Albadalejo Family"},"date":"2021-07-07T01:33:04","content":"<p>We absolutely LOVED working with this super amazing family! It&#8217;s not everyday you get to go to the coolest fire station on earth right in FRONT of the beach in Miami and create beautiful memories for really really great people. It&#8217;s been a few years since our last family session with the Albadalejos so it was so nice to see them! Thank you for having us as part of your special family memories. Enjoy a few of our favorites from the session:</p><figure class=\\"wp-block-image size-ful"},{"id":28469,"slug":"connecticut-micro-wedding-tammy-tay","title":{"rendered":"Connecticut Micro Wedding | Tammy + Tay"},"date":"2021-07-04T01:01:49","content":"<p>For this next post, I got to work once again with Tammy and Tay, this time, for their Connecticut Micro Wedding.</p><p>You might remember these cuties from their fabulous Cold Spring <a href=\\"https://acromatico.com/cold-spring-ny-engagement-tammy-tay/\\">engagement sesh</a> in early May. I made them get in the water and get a little wet and they totally rocked with it.</p><p>For their wedding, we did something a little similar..except it was kind of not predicted, unwanted and definitely not pl"},{"id":28396,"slug":"wilton-ct-group-portrait-personal-branding-photoshoot","title":{"rendered":"Wilton, CT Group Portrait | Personal Branding Photoshoot"},"date":"2021-06-26T15:40:12","content":"<p>It&#8217;s not every day you get to stroll around Wilton, CT with a group of pretty ladies and shoot their group portrait for their personal branding.</p><p>I had such a great time working with these girls and vibing with their contagious positive energy. They made my job way too easy!</p><p>It was hot, it was sunny, yet these girls rocked their personal branding photoshoot and made it look so easy. Nothing like women that empower women with big smiles on their faces.</p><p>Thank you pretty l"},{"id":28131,"slug":"terrace-on-the-park-indian-wedding-ny-tintu-nemo","title":{"rendered":"Terrace On The Park Indian Wedding, NY &#8211; Tintu + Nemo"},"date":"2021-06-06T05:08:16","content":"<p>This wedding I have to say was very special. Not only did we get to work with one of the happiest grooms we&#8217;ve ever met but we also felt like we became a part of Tintu and Nirmal&#8217;s (aka Nemo&#8217;s) family.</p><p>We had the pleasure of shooting their <a href=\\"https://acromatico.com/central-park-indian-engagement-tintu-nemo/\\">engagement session</a> earlier this spring, with the most prettiest cherry blossom season right here in New York. What does this have to do with their weddin"},{"id":28105,"slug":"baby-portrait-miami-olivia","title":{"rendered":"Baby Portrait Miami | Olivia"},"date":"2021-06-01T18:54:44","content":"<p>We&#8217;ve been working with baby Olivia since before she was born! And she is the cutest little model out there! check out our latest session with this beauty queen and one of our favorite client: </p><figure class=\\"wp-block-image size-full\\"><img decoding=\\"async\\" width=\\"1200\\" height=\\"800\\" data-src=\\"https://acromatico.com/wp-content/uploads/2021/06/Baby-Portrait-Miami-1-1.jpg\\" alt=\\"\\" class=\\"wp-image-28111 lazyload\\" src=\\"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw"},{"id":28025,"slug":"cold-spring-ny-engagement-tammy-tay","title":{"rendered":"Cold Spring, NY &#8211; Engagement | Tammy + Tay"},"date":"2021-05-16T22:41:48","content":"<p>Photography is the gift that keeps on giving, after all, that&#8217;s exactly how we end up meeting most of our clients: through their very own friends.</p><p>When I met Tammy, she was walking one of our dear friend&#8217;s wedding. I never would&#8217;ve thought, just a few months later we&#8217;d be here, shooting her very own engagement sesh. </p><p>We had been planning the perfect session but the weather just didn&#8217;t seem to want to cooperate. New York has so many awesome locations a"},{"id":27943,"slug":"robbins-park-maternity-giacaman-family","title":{"rendered":"Robbins Park Maternity | Giacaman Family"},"date":"2021-05-14T20:16:43","content":"<p>By far this is one of the most special sessions this year! Not only this is our beautiful sister and brother welcoming another baby to the happy family of 3, but this happens to be the very awaited maternity session for THE FIRST baby girl of the family! We are so extremely excited to meet baby Gabriela coming soon!</p><p>This session seemed it was not going to happen yesterday, but despite the 80% chances of rain and the fact that it did rain and the park we had planed closed for the day, we"},{"id":27907,"slug":"the-ritz-carlton-bal-harbour-engagement-jessica-kiran","title":{"rendered":"The Ritz-Carlton Bal Harbour Engagement | Jessica + Kiran"},"date":"2021-04-24T19:33:17","content":"<p>We always LOVE it when we do a session at the Ritz Carlton in Bal Harbour! We used to be next door neighbors with this beautiful hotel a few years ago before babies and it bring back so many beautiful memories! </p><p>The original plan was to take the pictures at the beautiful beach they have in front but a tornado warning came earlier and the strong winds and uncontrollable rain made this impossible. What do you do when your clients fly all the way to Miami just to have their photos done wit"},{"id":27771,"slug":"garden-wedding-lisay-alex","title":{"rendered":"Garden Wedding | Lisay + Alex"},"date":"2021-04-24T15:45:22","content":"<p>You could literally say Lisay and Alex didn&#8217;t let ANYTHING ruin their wedding day. Not a global pandemic and certainly not a tornado warning during their day. </p><p>We have never seen such a poise and happy and  bride &amp; groom enjoying their outdoor wedding even though the rain was heavy and winds were strong. This is what made of this day such a special occasion for everyone. To witness the kind of person you both are.What a beautiful couple in every posible way. </p><p>You both en"},{"id":27744,"slug":"tree-tops-park-family-session","title":{"rendered":"Tree Tops Park | Family Session"},"date":"2021-04-16T19:23:38","content":"<p>What a better way to celebrate your 40 years of marriage than capturing this moment with the ones you love most: your family!</p><p>this is exactly what we did for this gorgeous couple celebrating the big 4-0!! So happy for you guys and the beautiful family you have created over the past 40 years. May you celebrate many many more years together! Please enjoy some of our favorites from this day:</p><figure class=\\"wp-block-image size-full\\"><img decoding=\\"async\\" width=\\"1920\\" height=\\"1280\\" data-s"},{"id":27683,"slug":"tree-tops-park-family-session-miguez-family","title":{"rendered":"Tree Tops Park Family Session | Miguez Family"},"date":"2021-04-15T15:12:05","content":"<p>Such a FUN bunch! We absolutely LOVED working with this gorgeous family of 5. They decided to go to one of our favorites parks here in South Florida: Tree Tops Park. We love the feel of this place because is so different, like if it came out of a book. Tall beautiful trees, lakes and random tree trunks scattered around make this park a truly magical place to visit. Enjoy some of our favorites:</p><figure class=\\"wp-block-image size-full\\"><img decoding=\\"async\\" width=\\"1200\\" height=\\"800\\" data-src"},{"id":27546,"slug":"central-park-indian-engagement-tintu-nemo","title":{"rendered":"Central Park Indian Engagement | Tintu + Nemo"},"date":"2021-04-11T04:06:37","content":"<p>They met during college almost 10 years ago, it was not love at first sight (for her) and he quickly got friend zoned. Of course, that all changed! This is the story of Tintu and Nemo. </p><p>Before we scroll down to the pictures we took in Central Park for this Indian Engagement session, I have to tell you a little bit about this sesh.</p><p>Tintu and Nemo contacted us during their quarantine and we scheduled the &#8220;perfect&#8221; spring day in April. They haven&#8217;t had the easiest y"},{"id":27473,"slug":"south-pointe-park-portrait-session-heimy-harold","title":{"rendered":"South Pointe Park Portrait Session | Heimy + Harold"},"date":"2021-04-09T20:44:45","content":"<p>South Pointe Park at South Beach in Miami is one of our ultimate favorite spots to shoot sessions, its such a fun, vibrant place that screams &#8220;Miami&#8221; from wherever you are looking. From the gorgeous white sandy beaches and turquoise clear water to  the beautiful modern, funky architecture, you can&#8217;t gp wrong when choosing this location for your next shoot. </p><p>And it was the perfect location for this beautiful couple that came all the way from Boston, MA. They wanted that"},{"id":27423,"slug":"personal-brand-photoshoot-jeilen","title":{"rendered":"Personal Brand Photoshoot | Jeilen"},"date":"2021-03-31T20:56:25","content":"<p>Meet Jeilen, a very talented and recently graduated Hairstylist.  We loved working with her on capturing a few portraits and she looked stunning! here are some of our favorite from this session: </p><figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\" height=\\"683\\" data-src=\\"https://acromatico.com/wp-content/uploads/2021/03/Personal-Brand-Photoshoot-1-1-1024x683.jpg\\" alt=\\"\\" class=\\"wp-image-27427 lazyload\\" src=\\"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAA"},{"id":27354,"slug":"secret-gardens-miami","title":{"rendered":"Secret Gardens Miami Engagement Session"},"date":"2021-03-15T23:54:42","content":"<p>Miami is a beautiful, vibrant city with a lot to offer. From the beaches to the nightlife, there is something for everyone in this city. And one of the best things about Miami is this amazing place: The Secret Gardens Miami.</p><h2 class=\\"wp-block-heading\\">Meet Jane + Denzel: a proposal story.</h2><figure class=\\"wp-block-image size-full\\"><img decoding=\\"async\\" width=\\"1200\\" height=\\"800\\" data-src=\\"https://acromatico.com/wp-content/uploads/2021/03/secret-gardens-miami-engagement-session-1-1.jpg\\" "},{"id":27235,"slug":"stamford-museum-nature-center-micro-wedding-yadi-jordan","title":{"rendered":"Stamford Museum &#038; Nature Center Micro Wedding | Yadi + Jordan"},"date":"2021-03-14T02:37:41","content":"<p>There&#8217;s nothing more special than to be there for your friends on the day of their micro wedding in the middle of a pandemic when you can only have the closest of people right by your side. Yes. I had the  h o n o r  of witnessing and capturing Yadi and Jordan&#8217;s micro wedding at the Stamford Museum &amp; Nature Center in Stamford, CT. </p><p>Story time. I can&#8217;t show you these pictures until I tell you a little background on these two. Yadi was the first person I &#8220;met&#"},{"id":27073,"slug":"east-miami-wedding-michelle-felipe","title":{"rendered":"East Miami Wedding | Michelle + Felipe"},"date":"2021-03-08T05:30:19","content":"<p>Miami has it&#8217;s special vibes, and today&#8217;s wedding was nothing short of it.  We met Michelle &amp; Felipe when we were invited to cover their proposal photos, and they&#8217;re totally made for one another.  Today marks their first special day for the rest of their lives, and we&#8217;re so thrilled to show you some behind-the-scenes images of their wedding day!</p><figure class=\\"wp-block-image size-full\\"><img decoding=\\"async\\" width=\\"1200\\" height=\\"800\\" data-src=\\"https://acromatico."},{"id":27016,"slug":"vizcaya-engagement-session-lisay-alex","title":{"rendered":"Vizcaya Engagement Session | Lisay + Alex"},"date":"2021-03-07T14:50:43","content":"<p>Lisay&#8217;s inspiration for her engagement was from the series of Netflix &#8220;The Grand Hotel&#8221;. If you know what show we are talking about then you&#8217;ll know the feel for this session had to be European. In Miami, the BEST place to achieve this kind of look is definitely, no questions asked: Vizcaya Museum and Gardens. We absolutely LOVE Vizcaya for so many reasons, but our top reasons are:</p><p>1- It looks like Italy, and we love Italy! </p><p>2- It has stunning views anywher"},{"id":26926,"slug":"cold-spring-ny-engagement-yadi-jordan","title":{"rendered":"Cold Spring, NY &#8211; Engagement | Yadi + Jordan"},"date":"2021-03-07T00:55:34","content":"<p>For this next sesh, we decided to take it to Cold Spring. Why? The name says it all..because it should already be spring and it&#8217;s just plain cold! </p><p>With just a few days away from their wedding and lot&#8217;s of final things left for the big day, we decided to do an early morning engagement session this am. Streets were empty in this little town, zero humans around, what could possibly be wrong with this picture? The fact that we did NOT plan for it to be THIS cold. After many hea"},{"id":26877,"slug":"personal-brand-photoshoot-alicia-from-legally-techie","title":{"rendered":"Personal Brand Photoshoot | Alicia From Legally Techie"},"date":"2021-02-25T03:22:04","content":"<p>Legally Techie. How cool is that name? You don&#8217;t often get to see girl girls I the tech workspace and Alicia blew our minds with her work! she is so down to earth and loves connecting with her customers and helping business owners with their biggest headaches. She has it all! if you ever need any advice form this gorgeous techie girl, make sure to call Alicia and check out her work here: www.ligallytechie.com and thank us later!</p><p>Meanwhile, enjoy some of our favorites from this per"},{"id":26633,"slug":"pawling-ny-snow-portrait-tifah","title":{"rendered":"Pawling, NY &#8211; Snow Portrait | Tifah"},"date":"2021-02-19T02:48:02","content":"<p>What do Sunday&#8217;s and snow days have in common? My camera.</p><p>Woke up to a text. 2 hours later we met up. Where to? Wherever. Headed to Pawling Park. Nothing was planned. The colors were perfect. Tifah absolutely rocked this by just being herself. A true winter wonderland: playground version.</p><p>Free spirited, happy and go with the flow. Loved her energy during this shoot. It was absolutely one I will never forget. Not only did we get to shoot in a fun playground in the middle of a"},{"id":26525,"slug":"coral-gables-country-club-wedding-chiara-rene","title":{"rendered":"Coral Gables Country Club Wedding | Chiara + Rene"},"date":"2021-02-01T15:35:56","content":"<p><strong>They say that it takes two to tango, and it’s no exception with these two.&nbsp;</strong></p><p>Rene always knew that Chiara was a lover of nature, and so he invited us to do their <a href=\\"https://acromatico.com/miami-proposal-chiara-rene/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">proposal</a> and we put on our ninja masks, and went to work behind the scenes.  Ever since then, it&#8217;s been such a blessing to work with them!</p><p>Chiara and Rene had been anxiously waiting for the"},{"id":26345,"slug":"florida-golf-course-wedding-ashley-alex","title":{"rendered":"Florida Golf Course Wedding | Ashley + Alex"},"date":"2020-12-25T21:48:22","content":"<p>COVID19 changed EVERYTHING, but when you love someone and want to spend the rest of your life with them, nothing should stop you from doing so, even if this means downsizing your guest list and changing the venue you had in mind. You can still have the wedding of your dreams and Ashley and Alex did just that. They married at a beautiful gulf country club in a very intimate setting. Enjoy some of our favorites from this special day:</p><figure class=\\"wp-block-image size-full\\"><img decoding=\\"as"},{"id":26145,"slug":"miami-marriott-biscayne-bay-wedding-natalya-peter","title":{"rendered":"Miami Marriott Biscayne Bay Wedding | Natalya + Peter"},"date":"2020-12-15T06:52:23","content":"<p>What a privilege it was to work this lovely wedding! Definitely one for the books in one of our absolute favorite venues in Miami.</p><p> Miami Marriott Biscayne Bay Wedding days are always a win! From the spectacular views of the bay to the highly amazing service you get its guaranteed your even will be a success. </p><figure class=\\"wp-block-image size-full\\"><img decoding=\\"async\\" width=\\"1820\\" height=\\"1213\\" data-src=\\"https://acromatico.com/wp-content/uploads/2020/12/Maimi-Marriott-Biscayne-Ba"},{"id":26073,"slug":"bal-harbour-maternity-session-jessica-danny","title":{"rendered":"Bal Harbour Maternity Session | Jessica + Danny"},"date":"2020-12-14T05:35:44","content":"<p>We absolutely LOVED working with Jessica, Danny and Benny for this beautiful sunrise maternity session! We felt like we&#8217;ve known each other from forever.. Thank you for trusting us with your special moment, loved creating these memories for you, enjoy some of our favorites from this beautiful morning: </p><figure class=\\"wp-block-image size-full\\"><img decoding=\\"async\\" width=\\"1820\\" height=\\"1213\\" data-src=\\"https://acromatico.com/wp-content/uploads/2020/12/Bal-Harbour-Maternity-Session-1-1."},{"id":25849,"slug":"deerfield-beach-family-session-visbal-family","title":{"rendered":"Deerfield Beach Family Session |Visbal Family"},"date":"2020-12-14T03:02:17","content":"<p>For the past 5 years we&#8217;ve had the privilege to work with this gorgeous family. We feel so blessed to be part of Ximena and Alvaro&#8217;s precious memories they have has a family every year.. Thank you for trusting us guys, means the world to us! Enjoy some of our favorites from this iconic 2020 year:</p><figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\" height=\\"767\\" data-src=\\"https://acromatico.com/wp-content/uploads/2020/12/Deerfield-Beach-Family-Session-1-2"},{"id":25670,"slug":"arlington-ma-micro-wedding-elle-hector","title":{"rendered":"Arlington, MA &#8211; Micro Wedding | Elle + Hector"},"date":"2020-11-27T05:32:20","content":"<p>A New York Wedding. That&#8217;s what they initially had planned.</p><p>Many of our dear brides have had to really change their wedding plans, pushing dates, having smaller weddings, sacrificing wedding parties, honeymoon and dear ones not being there. </p><p>In the case of Elle and Hector, they had to do all that while having to change all their prepaid wedding plans and move their wedding all the way to Massachusetts. When we found out their wedding turned into a destination, micro wedding,"},{"id":25506,"slug":"tree-tops-park-wedding-laura-antonio","title":{"rendered":"Tree Tops Park Wedding | Laura +Antonio"},"date":"2020-11-24T17:20:48","content":"<p>What a beautiful day this was. Tree Tops Park Wedding days are always a win! but for these 2 lovebirds it was truly something special. The forecast was predicting really bad weather, but to our surprise Florida decided to gift us the most beautiful blue skies instead. Laura you were one stunning bride. Even Chombi (their little dog) was super happy to see Laura walk down the aisle. We are so honored we got to be part of your union together, you make the most beautiful couple! Enjoy some of ou"},{"id":25392,"slug":"beacon-ny-engagement-elle-hector","title":{"rendered":"Beacon, NY &#8211; Engagement | Elle + Hector"},"date":"2020-11-17T04:45:21","content":"<p>He reserved a bookstore. She loves books. Hid a love story book in the shelves and then hid the ring inside a box that looked like a book. <a href=\\"https://www.binnaclebooks.com/\\" target=\\"_blank\\" rel=\\"noopener\\">Binnacle Books</a> in Beacon, NY. This is where Hector proposed to Elle (virtually), because you know, covid.</p><p>Fast forward to their engagement session, only a few days before their upcoming wedding in Boston. Right in that same Bookstore where she said: YES! Our friends at Binnac"},{"id":25201,"slug":"shoreham-long-island-ny-indian-wedding-christine-shawn","title":{"rendered":"Shoreham, Long Island, NY &#8211; Indian Wedding | Christine + Shawn"},"date":"2020-11-15T19:36:34","content":"<p>700 people. May 30th, 2020. These were the original wedding plans for Christine and Shawn.</p><p>We met this awesome couple in the beginning of covid. Everything was all up in the air and super confusing. We shot their <a href=\\"https://acromatico.com/dumbo-brooklyn-engagement-christine-shawn/\\">engagement session</a> at the Brooklyn Bridge and thought we&#8217;d be shooting their wedding in just a couple of months. That wasn&#8217;t the case.</p><p>Everyone&#8217;s worlds got rocked, their wed"},{"id":25022,"slug":"rusty-pelican-wedding-ashley-mike","title":{"rendered":"Rusty Pelican Wedding | Ashley + Mike"},"date":"2020-11-03T20:21:41","content":"<p>Whenever we receive a wedding inquiry that says &#8220;Rusty Pelican&#8221; as the venue you can&#8217;t understand the excitement! 11 years ago my hubby proposed and then we got married there! so this place holds precious memories for us!</p><p>Ashley and Mike, you guys make such a beautiful couple and we felt honored to be part of your special day. The emotions where high and the pictures show how much love there was in the room from everyone to you guys. Here are a few of our favorites, en"},{"id":24918,"slug":"gather-greene-coxsackie-ny-anniversary-tica-justin","title":{"rendered":"Gather Greene &#8211; Coxsackie, NY, Anniversary | Tica + Justin"},"date":"2020-10-18T23:16:45","content":"<p>What do you do when you&#8217;re in the middle of a pandemic and need to forget that you&#8217;re still in 2020 and it happens to be your 7th anniversary?</p><p>Easy. You go to <a href=\\"http://www.gathergreene.com/\\" target=\\"_blank\\" rel=\\"noopener\\">Gather Greene</a>.</p><p><strong>*** BRIDES, SURE YOU READ TIL THE END ***</strong></p><p>These lux, middle of the woods, tiny, woodsy, scandinavian, artsy, boho, cabins are all you need. AND they&#8217;re pet friendly. What else can you possibly wan"},{"id":24509,"slug":"new-milford-ct-fall-wedding-si-marcos","title":{"rendered":"New Milford, CT &#8211; Fall Wedding | Si + Marcos"},"date":"2020-10-09T03:18:35","content":"<p>This next wedding has our hearts. I had to give up my hubby (and awesome assistant) so he could marry our friends while I shot them. It was truly an unforgettable experience! </p><p>Despite the crazy circumstances we&#8217;re in and the endless amount of things these cuties had to tweak in order to have their perfect wedding day, this micro wedding was just EVERYTHING. I mean, we were all attacked  by the bees (again). Totally Si&#8217;s fault! A groomsmen got stung in the middle of the cerem"},{"id":24413,"slug":"lincoln-road-miami-engagement-session-natalya-peter","title":{"rendered":"Lincoln Road Miami Engagement Session | Natalya + Peter"},"date":"2020-10-07T19:18:48","content":"<p>We absolutely LOVE when we get clients like Natalia and Peter ready to make the most out of their session! We had a blast with these two! We got to enjoy a super fun afternoon in South Beach and it was almost empty for the first time ever! we where able to get inspired by the Tropical &#8211; European vibe this place has and get these cool shots:</p><figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\" height=\\"682\\" data-src=\\"https://acromatico.com/wp-content/uploads/202"},{"id":24323,"slug":"robbins-lodge-family-session-tejuca-family","title":{"rendered":"Robbins Lodge Family Session | Rodriguez Family"},"date":"2020-09-25T21:30:41","content":"<p>A few months ago we started venturing into another passion of ours, training people to grow their businesses, and we decided it would be a great idea to give our direct team a photoshoot, so here you have Amelia and her family, they come all the way from Orlando and made the trip for this special occasion! Meeting them wa so much fun, and it felt like we&#8217;ve known them for years!</p><p>When we started doing our training sessions, never did we imagined that this same team of girls will ev"},{"id":24268,"slug":"newborn-photography-luca","title":{"rendered":"Newborn Photography| Luca"},"date":"2020-09-13T00:52:40","content":"<p>There are times in life when you rejoice for accomplishments, and this is certainly one to remember.  We&#8217;ve been photographing our friends ever since their first newborn was announced, and within the past decade, their little family of two rapidly expanded to becoming a beautiful family of six! As soon as they found out on Luca&#8217;s newborn date, they scheduled us to do Luca&#8217;s newborn photography right away and we brought the studio to their house.  We&#8217;re so thrilled for "},{"id":24067,"slug":"blue-hill-farm-engagement-new-york-paula-roy","title":{"rendered":"Blue Hill Farm Engagement, New York | Paula + Roy"},"date":"2020-09-11T16:53:07","content":"<p>Paula and Roy chose the Blue Hill at Stone Barn farm location for their amazing engagement session. We have to just say, this next session is giving us all the feels.</p><p>These two were engaged in July, right on the day of their 10 year anniversary! They met at school and have been together ever since.</p><p>Paula and Roy were so much fun to work with. We got booked for this session overnight and they chose this great location: Blue Hill Farm right here in New York! The rest was totally unp"},{"id":23885,"slug":"fort-myers-wedding-angelica-jeasiel","title":{"rendered":"Fort Myers Wedding | Angelica + Jeasiel"},"date":"2020-09-05T03:46:29","content":"<p>This wedding was one for the books! It was an exciting one to be part of for sure! Not even a pandemic stopped these two lovebirds from having the wedding of their dreams, even though they had to sacrifice certain things they were determined to make the most out of this day, and sure they did! (they even jumped in the pool, because why not?) With only closed family members being part of the this special day it turned out to be very special, intimate and full of love with memories to treasure "},{"id":23549,"slug":"shulas-hotel-wedding-lorena-manny","title":{"rendered":"Shula&#8217;s Hotel Wedding | Lorena + Manny"},"date":"2020-08-28T20:32:30","content":"<p>Lorena and Many where determined to make this wedding happen, no matter what! Aside from the pandemic, that same day we where supposed to be hit by a category 1 hurricane BUT it didn&#8217;t happen! We had the most beautiful blue skies and were even able to fly a drone to take cool pictures and videos of the party!</p><p>The day started at the Sula&#8217;s Hotel in Miami where Lorena was getting ready with our beautiful and talented friend &#8220;<a href=\\"https://www.janydidmyhair.com\\" target"},{"id":23430,"slug":"waterfall-engagement-connecticut-si-marcos","title":{"rendered":"Waterfall Engagement, Connecticut | Si + Marcos"},"date":"2020-08-24T04:50:09","content":"<p>For this engagement session, we decided to be a little spontaneous and go with the flow. At first, we had this whole session planned, location was set, but then we said, hey LET&#8217;S JUST DO SOMETHING DIFFERENT. So we did! </p><p>**disclaimer, we (by we I mean me) did have a mini heart attack because the location we were originally going to was temporarily closed**</p><p>Marcos was on it and found us a new spot right away. All he told Si was: make sure to wear a flowy dress, so she did! Sh"},{"id":23323,"slug":"sunflower-maze-proposal-connecticut-si-marcos","title":{"rendered":"Sunflower Maze Proposal, Connecticut | Si + Marcos"},"date":"2020-08-17T03:59:15","content":"<p>She. Said. SI!</p><p>:: pun intended ::</p><p>We can&#8217;t believe we got to witness this epic proposal at a sunflower maze! We were there the moment Si and Marcos met and here we are, 10 months later, seeing him get down on one knee while she yells out: YES!</p><p>Si had no idea he was going to pop the question right this day. I mean, after all, it was supposed to be a simple, social-distanced, girls day out, while Marcos was &#8220;away&#8221; for work. Yes, this whole proposal was based "},{"id":23249,"slug":"baby-photo-session-miami-isaac","title":{"rendered":"Baby Photo Session Miami |Isaac"},"date":"2020-08-13T17:11:03","content":"<p>This baby right here is the cutest little thing! In the future, whenever we think of a happy baby this guy right here will pop to our minds forever. We have never seen a baby dancing bachata while moving his hips to the beat of the drums and throwing kisses to his auntie, fully enjoying life to the fullest! Enjoy some of our favorites from this little sailor, bachata dancer, professional cake eater:  </p><figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\" height=\\"682\\""},{"id":23078,"slug":"new-york-indian-wedding-geeta-vir","title":{"rendered":"New York Indian Wedding | Geeta + Vir"},"date":"2020-08-04T11:26:30","content":"<p>I don&#8217;t even know where to start with this amazing Indian Wedding we got to shoot in Glen Cove, Long Island. Everyone was just full of life, celebration and color explosions (literally!)</p><p>This wedding was so unique on its own and it&#8217;s definitely one I will never forget. Right in the middle of the pandemic, Geeta and Vir had their very close family members join them in their forever union as husband and wife. This Sikh-Punjab wedding was very memorable as Geeta was breaking tr"},{"id":22917,"slug":"miami-beach-maternity-session-cardiello-family","title":{"rendered":"Miami Beach Maternity Session | Cardiello Family"},"date":"2020-07-26T03:28:31","content":"<p>We look forward to working with our friends every year! It makes us so happy to be part of their special memories, and this one is so special as they are getting ready to welcome their fourth addition to the family! Luca will be so loved, can&#8217;t wait to meet him soon!</p><figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\" height=\\"682\\" data-src=\\"https://acromatico.com/wp-content/uploads/2020/07/Miami-Beach-Maternity-Session-001-6-1024x682.jpg\\" alt=\\"\\" class=\\"wp-ima"},{"id":22853,"slug":"miami-proposal-chiara-rene","title":{"rendered":"Miami Proposal | Chiara + Rene"},"date":"2020-07-17T05:37:43","content":"<p>Surprise proposals are our absolute favorite occasion to shoot! We love to be there and witness the raw emotions, the adrenaline, the love, the tears, the surprise face, the moment where it all started. And this time it was so special, Chiara and Rene make such  beautiful couple, inside and out. Thank you for allowing us to capture such a special moment in your lives. Enjoy some of our favorites from this Miami Proposal at the Glass and Vine restaurant in Miami:</p><figure class=\\"wp-block-ima"},{"id":22807,"slug":"baby-photo-session-olivia-roze","title":{"rendered":"Baby Photo Session | Olivia Roze"},"date":"2020-07-03T02:03:24","content":"<figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\" height=\\"767\\" data-src=\\"https://acromatico.com/wp-content/uploads/2020/07/Baby-Photo-Session-001-1024x767.jpg\\" alt=\\"\\" class=\\"wp-image-22830 lazyload\\" src=\\"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\\" style=\\"--smush-placeholder-width: 1024px; --smush-placeholder-aspect-ratio: 1024/767;\\" /></figure><figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\" height=\\"682\\" data-"},{"id":22727,"slug":"brooklyn-engagement-new-york-geeta-vir","title":{"rendered":"Brooklyn New York Engagement | Geeta + Vir"},"date":"2020-07-02T14:14:45","content":"<p>“We were supposed to get married last month in Mexico, 300 people”. Not an unusual quote. So many people have had to change their wedding plans due to covid, Geeta and Vir were no exception.</p><p>Despite it all, these guys are making the BEST of the situation to still move forward with their wedding plans, this time, in New York!</p><p>It was so fun and challenging at the same time shooting with a mask on and trying to guide them and having to yell so they could hear me. Literally: challenge"},{"id":22538,"slug":"country-club-prado-engagement-session-angelica-jeasiel","title":{"rendered":"Country Club Prado Engagement Session | Angelica + Jeasiel"},"date":"2020-06-22T23:17:22","content":"<figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\" height=\\"682\\" data-src=\\"https://acromatico.com/wp-content/uploads/2020/06/Country-Club-Prado-Engagement-Session-001-1024x682.jpg\\" alt=\\"\\" class=\\"wp-image-22544 lazyload\\" src=\\"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\\" style=\\"--smush-placeholder-width: 1024px; --smush-placeholder-aspect-ratio: 1024/682;\\" /></figure><figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\""}]'),Xs=new Ds;Xs.get("/",async t=>{const r=qg;return t.html(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - Acromatico</title>
    <meta name="description" content="Real wedding stories, engagement sessions, and love stories captured by Acromatico across South Florida, NYC, and destinations worldwide.">
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif;
            background: #FAFAFA;
            color: #1D1D1F;
            line-height: 1.6;
        }
        
        /* Header */
        .site-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 9999;
            padding: 20px 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: transparent;
        }
        
        .site-logo {
            max-width: 200px;
            height: auto;
            transition: all 0.3s;
        }
        
        .menu-toggle {
            position: fixed;
            top: 25px;
            right: 30px;
            z-index: 10000;
            background: transparent;
            border: none;
            cursor: pointer;
            width: 40px;
            height: 40px;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }
        
        .menu-toggle span {
            display: block;
            width: 30px;
            height: 2px;
            background: #ffffff;
            transition: all 0.3s ease;
            border-radius: 2px;
        }
        
        .menu-toggle:hover span {
            background: rgba(255,255,255,0.7);
        }
        
        /* Overlay Menu */
        .overlay-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.98);
            z-index: 9998;
            display: none;
            align-items: center;
            justify-content: center;
        }
        
        .overlay-menu.active {
            display: flex;
        }
        
        .menu-content {
            text-align: center;
        }
        
        .menu-content a {
            display: block;
            color: white;
            text-decoration: none;
            font-size: 2rem;
            font-weight: 300;
            margin: 1.5rem 0;
            transition: opacity 0.3s;
        }
        
        .menu-content a:hover {
            opacity: 0.6;
        }
        
        /* Hero Section */
        .hero-section {
            min-height: 100vh;
            background-image: url('https://acromatico.com/wp-content/uploads/2022/03/Lifestyle-Newborn-Session-001-1024x682.jpg');
            background-position: center center;
            background-size: cover;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        
        .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.35);
        }
        
        .hero-title {
            position: relative;
            z-index: 10;
            color: #ffffff;
            font-size: 56px;
            font-weight: 300;
            text-align: center;
            letter-spacing: -0.5px;
            line-height: 1.3em;
            max-width: 900px;
            padding: 0 40px;
            text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
            margin-bottom: 1rem;
        }
        
        .hero-subtitle {
            position: relative;
            z-index: 10;
            color: rgba(255, 255, 255, 0.95);
            font-size: 1.5rem;
            font-weight: 300;
            text-align: center;
            text-shadow: 0 1px 8px rgba(0,0,0,0.3);
        }
        
        /* Hero Search Bar (in controls section) */
        .hero-search-wrapper {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin: 0 auto 1.5rem;
        }
        
        .hero-search {
            width: 100%;
            padding: 1.25rem 1.75rem;
            font-size: 1.1rem;
            border: none;
            border-radius: 50px;
            background: #FAFAFA;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            transition: all 0.3s;
            color: #1D1D1F;
        }
        
        .hero-search:focus {
            outline: none;
            background: #ffffff;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
            transform: translateY(-2px);
        }
        
        .hero-search::placeholder {
            color: #86868B;
        }
        
        /* Autocomplete Dropdown */
        .autocomplete-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            margin-top: 0.5rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            max-height: 400px;
            overflow-y: auto;
            display: none;
            z-index: 1000;
        }
        
        .autocomplete-dropdown.active {
            display: block;
        }
        
        .autocomplete-item {
            padding: 1rem 1.5rem;
            cursor: pointer;
            transition: all 0.2s;
            border-bottom: 1px solid #F5F5F7;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .autocomplete-item:last-child {
            border-bottom: none;
        }
        
        .autocomplete-item:hover {
            background: #F5F5F7;
        }
        
        .autocomplete-item-category {
            background: #E5E5E7;
            color: #000;
            padding: 0.25rem 0.625rem;
            border-radius: 4px;
            font-size: 0.7rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .autocomplete-item-title {
            flex: 1;
            font-size: 0.95rem;
            color: #1D1D1F;
        }
        
        .autocomplete-item-title mark {
            background: #FFEB3B;
            color: #000;
            padding: 0 2px;
            border-radius: 2px;
        }
        
        /* Search & Filters */
        .controls {
            padding: 2rem 5%;
            background: white;
            border-top: 1px solid #E5E5E7;
        }
        
        .controls-wrapper {
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .filters {
            text-align: center;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.75rem;
        }
        
        .filter-btn {
            padding: 0.625rem 1.5rem;
            border: 1px solid #E5E5E7;
            border-radius: 6px;
            background: white;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.9rem;
            font-weight: 500;
            color: #1D1D1F;
        }
        
        .filter-btn:hover {
            background: #F5F5F7;
        }
        
        .filter-btn.active {
            background: #000;
            color: white;
            border-color: #000;
        }
        
        /* Blog Grid */
        .grid-wrapper {
            padding: 3rem 5%;
            background: #FAFAFA;
        }
        
        .grid {
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
            gap: 2.5rem;
        }
        
        /* Blog Cards */
        .card {
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            transition: all 0.3s;
            text-decoration: none;
            color: inherit;
            display: block;
        }
        
        .card:hover {
            transform: translateY(-6px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
        
        .card-img-wrapper {
            width: 100%;
            height: 280px;
            overflow: hidden;
            background: #F5F5F7;
        }
        
        .card-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s;
        }
        
        .card:hover .card-img {
            transform: scale(1.05);
        }
        
        .card-content {
            padding: 1.75rem;
        }
        
        .card-category {
            display: inline-block;
            background: #F5F5F7;
            color: #000;
            padding: 0.375rem 0.875rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            line-height: 1.4;
            margin-bottom: 0.75rem;
            color: #000;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .card-date {
            font-size: 0.875rem;
            color: #86868B;
        }
        
        /* No Results */
        .no-results {
            text-align: center;
            padding: 4rem;
            font-size: 1.1rem;
            color: #86868B;
            display: none;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .nav-links {
                display: none;
            }
            
            .hero-title {
                font-size: 2.5rem;
                padding: 0 20px;
            }
            
            .hero-subtitle {
                font-size: 1.1rem;
            }
            
            .site-logo {
                max-width: 150px;
            }
            
            .hero-search {
                font-size: 1rem;
                padding: 1rem 1.5rem;
            }
            
            .hero-search-wrapper {
                max-width: 90%;
            }
        }
    </style>
</head>
<body>
    <header class="site-header">
        <a href="/">
            <img src="/static/acromatico-logo-transparent.png" alt="Acromatico Photography" class="site-logo">
        </a>
        <button class="menu-toggle" id="menuToggle" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </header>
    
    <div class="overlay-menu" id="overlayMenu">
        <div class="menu-content">
            <a href="/">Home</a>
            <a href="/static/our-story-v2.html">Our Story</a>
            <a href="/blog">Blog</a>
            <a href="https://acromatico.com/galleries">Portfolio</a>
            <a href="https://acromatico.com/contact">Contact</a>
        </div>
    </div>
    
    <section class="hero-section">
        <h1 class="hero-title">Love Stories</h1>
        <p class="hero-subtitle"><span id="total-count">501</span> Real Weddings, Engagements & Moments</p>
    </section>
    
    <section class="controls">
        <div class="controls-wrapper">
            <div class="hero-search-wrapper">
                <input 
                    type="search" 
                    class="hero-search" 
                    id="heroSearch" 
                    placeholder="Search by couple names, location, or session type..."
                    autocomplete="off"
                >
                <div class="autocomplete-dropdown" id="autocompleteDropdown"></div>
            </div>
            
            <div class="filters">
                <button class="filter-btn active" data-filter="all">All Stories</button>
                <button class="filter-btn" data-filter="wedding">Weddings</button>
                <button class="filter-btn" data-filter="engagement">Engagements</button>
                <button class="filter-btn" data-filter="family">Family</button>
                <button class="filter-btn" data-filter="proposal">Proposals</button>
                <button class="filter-btn" data-filter="portrait">Portraits</button>
            </div>
        </div>
    </section>
    
    <section class="grid-wrapper">
        <div class="grid" id="grid"></div>
        <div class="no-results" id="no-results">
            No stories found. Try a different search or filter.
        </div>
    </section>
    
    <script>
        let allPosts = [];
        let displayedPosts = 0;
        const POSTS_PER_PAGE = 50;
        
        let currentFilter = 'all';
        let currentSearch = '';
        
        // Load all posts from static JSON
        async function loadAllPosts() {
            try {
                const response = await fetch('/static/blog_posts_data/all_posts.json');
                const data = await response.json();
                allPosts = data;
                document.getElementById('total-count').textContent = allPosts.length;
                renderPosts();
            } catch (error) {
                console.error('Error loading posts:', error);
                allPosts = ${JSON.stringify(r)};
                renderPosts();
            }
        }
        
        function getCategory(title) {
            const titleLower = title.toLowerCase();
            if (titleLower.includes('wedding')) return 'Wedding';
            if (titleLower.includes('engagement')) return 'Engagement';
            if (titleLower.includes('proposal')) return 'Proposal';
            if (titleLower.includes('family')) return 'Family';
            if (titleLower.includes('portrait') || titleLower.includes('senior') || titleLower.includes('headshot')) return 'Portrait';
            return 'Photography';
        }
        
        function extractImage(content) {
            // Extract all img tags
            const imgRegex = /<img[^>]+>/g;
            const imgs = content.match(imgRegex) || [];
            
            // Find first image with real src (not data: URI)
            for (const img of imgs) {
                const srcMatch = img.match(/src="([^">]+)"/);
                if (srcMatch && srcMatch[1] && !srcMatch[1].startsWith('data:')) {
                    return srcMatch[1];
                }
            }
            
            return 'https://acromatico.com/wp-content/uploads/logo.png';
        }
        
        function cleanTitle(title) {
            return title.replace(/&#8211;/g, '–').replace(/&#8217;/g, "'").replace(/&#038;/g, '&');
        }
        
        function formatDate(dateStr) {
            return new Date(dateStr).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        }
        
        function renderPosts() {
            const grid = document.getElementById('grid');
            const noResults = document.getElementById('no-results');
            
            let filtered = allPosts.filter(post => {
                const title = cleanTitle(post.title.rendered).toLowerCase();
                const category = getCategory(title);
                
                const matchesFilter = currentFilter === 'all' || category.toLowerCase() === currentFilter;
                const matchesSearch = currentSearch === '' || title.includes(currentSearch);
                
                return matchesFilter && matchesSearch;
            });
            
            if (filtered.length === 0) {
                noResults.style.display = 'block';
                return;
            } else {
                noResults.style.display = 'none';
            }
            
            grid.innerHTML = '';
            
            const postsToShow = filtered.slice(0, displayedPosts + POSTS_PER_PAGE);
            displayedPosts = postsToShow.length;
            
            postsToShow.forEach(post => {
                const title = cleanTitle(post.title.rendered);
                const category = getCategory(title);
                const img = extractImage(post.content.rendered);
                const date = formatDate(post.date);
                
                const card = document.createElement('a');
                card.href = \`/blog/\${post.slug}\`;
                card.className = 'card';
                card.innerHTML = \`
                    <div class="card-img-wrapper">
                        <img src="\${img}" alt="\${title}" class="card-img" loading="lazy">
                    </div>
                    <div class="card-content">
                        <span class="card-category">\${category}</span>
                        <h3 class="card-title">\${title}</h3>
                        <p class="card-date">\${date}</p>
                    </div>
                \`;
                
                grid.appendChild(card);
            });
        }
        
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                displayedPosts = 0;
                renderPosts();
            });
        });
        
        loadAllPosts();
        
        // Menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const overlayMenu = document.getElementById('overlayMenu');
        
        menuToggle.addEventListener('click', () => {
            overlayMenu.classList.toggle('active');
        });
        
        overlayMenu.addEventListener('click', (e) => {
            if (e.target === overlayMenu) {
                overlayMenu.classList.remove('active');
            }
        });
        
        // Hero Search with Autocomplete
        const heroSearch = document.getElementById('heroSearch');
        const autocompleteDropdown = document.getElementById('autocompleteDropdown');
        let autocompleteTimeout;
        
        heroSearch.addEventListener('input', (e) => {
            clearTimeout(autocompleteTimeout);
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 2) {
                autocompleteDropdown.classList.remove('active');
                return;
            }
            
            autocompleteTimeout = setTimeout(() => {
                const matches = allPosts.filter(post => {
                    const title = cleanTitle(post.title.rendered).toLowerCase();
                    return title.includes(query);
                }).slice(0, 8);
                
                if (matches.length === 0) {
                    autocompleteDropdown.classList.remove('active');
                    return;
                }
                
                autocompleteDropdown.innerHTML = matches.map(post => {
                    const title = cleanTitle(post.title.rendered);
                    const category = getCategory(title);
                    const regex = new RegExp('(' + query + ')', 'gi');
                    const highlightedTitle = title.replace(regex, '<mark>$1</mark>');
                    
                    return \`
                        <a href="/blog/\${post.slug}" class="autocomplete-item">
                            <span class="autocomplete-item-category">\${category}</span>
                            <span class="autocomplete-item-title">\${highlightedTitle}</span>
                        </a>
                    \`;
                }).join('');
                
                autocompleteDropdown.classList.add('active');
            }, 300);
        });
        
        // Close autocomplete when clicking outside
        document.addEventListener('click', (e) => {
            if (!heroSearch.contains(e.target) && !autocompleteDropdown.contains(e.target)) {
                autocompleteDropdown.classList.remove('active');
            }
        });
        
        // Handle Enter key
        heroSearch.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = heroSearch.value.toLowerCase().trim();
                if (query.length > 0) {
                    // Scroll to blog grid and apply search
                    currentSearch = query;
                    displayedPosts = 0;
                    renderPosts();
                    autocompleteDropdown.classList.remove('active');
                    document.querySelector('.grid-wrapper').scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    <\/script>
    
    <!-- Footer -->
    <footer style="background: #0A0A0A; border-top: 1px solid rgba(255,255,255,0.1); padding: 4rem 5%; margin-top: 6rem;">
        <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
            <a href="/" style="display: inline-block; margin-bottom: 2rem;">
                <img src="/static/acromatico-logo-white.png" alt="Acromatico Photography" style="height: 40px; width: auto;">
            </a>
            <div style="display: flex; justify-content: center; gap: 2rem; margin-bottom: 2rem; flex-wrap: wrap;">
                <a href="/static/our-story-v2.html" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.95rem;">Our Story</a>
                <a href="/blog" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.95rem;">Blog</a>
                <a href="https://acromatico.com/galleries" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.95rem;">Portfolio</a>
                <a href="https://acromatico.com/contact" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.95rem;">Contact</a>
            </div>
            <p style="color: rgba(255,255,255,0.4); font-size: 0.875rem; margin: 0;">© 2026 Acromatico Photography. Capturing love stories worldwide.</p>
        </div>
    </footer>
</body>
</html>
  `)});Xs.get("/:slug",async t=>{const r=t.req.param("slug");return t.redirect(`/static/blog/${r}.html`)});const _t=`
<footer class="bg-black border-t border-white/10 py-16">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-5 gap-12 mb-12">
      <div>
        <h4 class="font-bold mb-4" style="color: white;">Academy</h4>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="/education" class="hover:text-white transition">Academy</a></li>
          <li><a href="/academy" class="hover:text-white transition">Curriculum</a></li>
          <li><a href="/masterclass" class="hover:text-white transition">Masterclass</a></li>
          <li><a href="/pricing" class="hover:text-white transition">Pricing</a></li>
          <li><a href="/invoices" class="hover:text-white transition">Generate Invoice</a></li>
          <li><a href="/faq" class="hover:text-white transition">FAQ</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold mb-4" style="color: white;">Services</h4>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="/studio" class="hover:text-white transition">Brand Building</a></li>
          <li><a href="/prints" class="hover:text-white transition">Art Prints</a></li>
          <li><a href="/photography" class="hover:text-white transition">Photography</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold mb-4" style="color: white;">Company</h4>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="/about" class="hover:text-white transition">About</a></li>
          <li><a href="/blog" class="hover:text-white transition">Blog</a></li>
          <li><a href="/contact" class="hover:text-white transition">Contact</a></li>
          <li><a href="javascript:void(0)" onclick="openSupportModal()" class="hover:text-white transition">💬 Support</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold mb-4" style="color: white;">Legal</h4>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="/privacy" class="hover:text-white transition">Privacy</a></li>
          <li><a href="/terms" class="hover:text-white transition">Terms</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold mb-4" style="color: white;">Admin</h4>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="/admin/crm/login" class="hover:text-white transition">🔒 CRM Login</a></li>
        </ul>
      </div>
    </div>
    
    <!-- Sign In Section - Prominent on Mobile -->
    <div class="pt-8 pb-8 border-t border-white/10 text-center">
      <style>
        .footer-signin-btn {
          display: inline-block;
          padding: 1rem 3rem;
          background: rgba(71, 148, 166, 0.15);
          border: 2px solid #4794A6;
          color: #4794A6;
          font-weight: 600;
          font-size: 1.125rem;
          border-radius: 9999px;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .footer-signin-btn:hover {
          background: #4794A6;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(71, 148, 166, 0.4);
        }
        @media (min-width: 769px) {
          .footer-signin-btn {
            display: none; /* Hide on desktop - it's in header */
          }
        }
      </style>
      <a href="/login" class="footer-signin-btn">
        Sign In to Your Account →
      </a>
    </div>
    
    <div class="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
      <p>&copy; 2026 Acromatico. Built for creators, by creators.</p>
    </div>
  </div>
</footer>
`,Sn="#4794A6",Wg=`
<!-- Mobile Menu Overlay -->
<div class="ast-mobile-popup-overlay" id="overlay"></div>

<!-- Mobile Menu Drawer -->
<div class="ast-mobile-popup-drawer" id="drawer">
  <div class="ast-mobile-popup-inner">
    <div class="mobile-menu-logo">
      <img src="/static/acromatico-logo-black.png" alt="Acromatico Photography" />
    </div>
    
    <div class="mobile-menu-search">
      <input type="search" id="siteSearch" placeholder="Search our site" autocomplete="off" aria-label="Search" />
      <button type="submit" aria-label="Submit search">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </button>
      <div class="search-results" id="searchResults"></div>
    </div>
    
    <nav class="mobile-menu-nav">
      <ul>
        <li><a href="/">PORTFOLIOS</a></li>
        <li><a href="/static/blog-index.html">RECENT WORK</a></li>
        <li><a href="/our-story">ABOUT US</a></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/photography">PRICING</a></li>
        <li><a href="/contact">CONTACT</a></li>
      </ul>
    </nav>
    
    <div class="mobile-menu-footer">
      <div class="mobile-menu-tagline">
        South Florida & NYC Photographers
      </div>
      <div class="mobile-menu-social">
        <a href="https://www.instagram.com/acromatico" target="_blank" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
          </svg>
        </a>
        <a href="https://www.facebook.com/acromatico" target="_blank" aria-label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  /* Use Acromatico brand color: ${Sn} */
  
  /* FIXED: Hamburger menu visibility when scrolling */
  .menu-toggle {
    background: rgba(0, 0, 0, 0.6) !important;
    backdrop-filter: blur(10px);
    border-radius: 8px;
    padding: 10px !important;
    transition: all 0.3s ease;
  }
  
  .menu-toggle:hover {
    background: rgba(71, 148, 166, 0.9) !important;
  }
  
  .menu-toggle span {
    background: #ffffff !important;
  }
  
  .menu-toggle:hover span {
    background: #ffffff !important;
  }
  
  .main-header-menu .menu-link:hover {
    color: ${Sn} !important;
  }
  
  .mobile-menu-search input:focus {
    border-color: ${Sn} !important;
    box-shadow: 0 0 0 3px rgba(71, 148, 166, 0.1) !important;
  }
  
  .mobile-menu-nav ul li a:hover {
    color: ${Sn} !important;
  }
</style>

<script>
// Mobile Menu Toggle Script
(function() {
  const menuToggle = document.getElementById('menuToggle');
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('overlay');
  
  if (!menuToggle || !drawer || !overlay) {
    console.warn('Menu elements not found');
    return;
  }
  
  function toggleMenu() {
    const isActive = drawer.classList.contains('active');
    
    if (isActive) {
      // Close menu
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      // Open menu
      drawer.classList.add('active');
      overlay.classList.add('active');
      menuToggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
  
  // Toggle on hamburger click
  menuToggle.addEventListener('click', toggleMenu);
  
  // Close on overlay click
  overlay.addEventListener('click', toggleMenu);
  
  // Close on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      toggleMenu();
    }
  });
  
  // Close menu when clicking a link
  const menuLinks = drawer.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      toggleMenu();
    });
  });
  
  console.log('✅ Mobile menu initialized');
})();
<\/script>
`;function me(t){try{const r=JSON.parse(atob(t));return r.exp<Date.now()?null:r}catch{return null}}async function Hg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=me(a);if(!s)return t.json({message:"Invalid token"},401);const{firstName:i,lastName:o,age:l,grade:c}=await t.req.json();if(!i||!o)return t.json({message:"First and last name required"},400);const u=await r.prepare(`
      INSERT INTO students (parent_id, first_name, last_name, age, grade, enrollment_status)
      VALUES (?, ?, ?, ?, ?, 'active')
    `).bind(s.id,i,o,l||null,c||null).run();return t.json({message:"Student added successfully",studentId:u.meta.last_row_id},201)}catch(r){return console.error("Add student error:",r),t.json({message:"Failed to add student: "+r.message},500)}}async function Gg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=me(a);if(!s)return t.json({message:"Invalid token"},401);const{studentId:i,courseId:o}=await t.req.json();if(!i||!o)return t.json({message:"Student ID and Course ID required"},400);if(!await r.prepare("SELECT id FROM students WHERE id = ? AND parent_id = ?").bind(i,s.id).first())return t.json({message:"Student not found or unauthorized"},403);if(await r.prepare("SELECT id FROM enrollments WHERE student_id = ? AND course_id = ?").bind(i,o).first())return t.json({message:"Student already enrolled in this course"},400);const u=await r.prepare(`
      INSERT INTO enrollments (student_id, course_id, status, progress)
      VALUES (?, ?, 'active', 0)
    `).bind(i,o).run();return await r.prepare(`
      INSERT INTO class_attendance (live_class_id, student_id, status)
      SELECT id, ?, 'registered'
      FROM live_classes
      WHERE course_id = ? AND status = 'scheduled'
      AND datetime(scheduled_date || ' ' || scheduled_time) > datetime('now')
    `).bind(i,o).run(),t.json({message:"Enrollment created successfully",enrollmentId:u.meta.last_row_id},201)}catch(r){return console.error("Create enrollment error:",r),t.json({message:"Failed to create enrollment: "+r.message},500)}}async function Yg(t){try{const{DB_EDUCATION:r}=t.env,n=await r.prepare(`
      SELECT 
        c.id,
        c.title,
        c.description,
        c.category,
        c.thumbnail_url,
        c.price_monthly,
        COUNT(DISTINCT e.student_id) as enrolled_students,
        COUNT(DISTINCT lc.id) as total_classes
      FROM courses c
      LEFT JOIN enrollments e ON c.id = e.course_id AND e.status = 'active'
      LEFT JOIN live_classes lc ON c.id = lc.course_id
      WHERE c.status = 'active'
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `).all();return t.json({courses:(n==null?void 0:n.results)||[]})}catch(r){return console.error("Browse courses error:",r),t.json({message:"Failed to load courses: "+r.message},500)}}async function Vg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=me(a);if(!s)return t.json({message:"Invalid token"},401);let i;if(s.role==="student"){const l=await r.prepare("SELECT id FROM students WHERE parent_id = ? LIMIT 1").bind(s.id).first();i=l==null?void 0:l.id}else{const l=await r.prepare("SELECT id FROM students WHERE parent_id = ? LIMIT 1").bind(s.id).first();i=l==null?void 0:l.id}if(!i)return t.json({classes:[]});const o=await r.prepare(`
      SELECT 
        lc.id,
        lc.class_number,
        lc.title,
        lc.description,
        lc.scheduled_date,
        lc.scheduled_time,
        lc.duration_minutes,
        lc.meeting_link,
        lc.meeting_password,
        lc.status,
        c.title as course_title,
        ca.status as attendance_status
      FROM live_classes lc
      INNER JOIN courses c ON lc.course_id = c.id
      INNER JOIN enrollments e ON c.id = e.course_id AND e.student_id = ?
      LEFT JOIN class_attendance ca ON lc.id = ca.live_class_id AND ca.student_id = ?
      WHERE lc.status IN ('scheduled', 'in_progress')
      AND datetime(lc.scheduled_date || ' ' || lc.scheduled_time) >= datetime('now')
      ORDER BY lc.scheduled_date ASC, lc.scheduled_time ASC
      LIMIT 50
    `).bind(i,i).all();return t.json({classes:(o==null?void 0:o.results)||[]})}catch(r){return console.error("Get upcoming classes error:",r),t.json({message:"Failed to load classes: "+r.message},500)}}async function Kg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=me(a);if(!s)return t.json({message:"Invalid token"},401);const i=await r.prepare("SELECT id FROM students WHERE parent_id = ? LIMIT 1").bind(s.id).first();if(!i)return t.json({classes:[]});const o=await r.prepare(`
      SELECT 
        lc.id,
        lc.class_number,
        lc.title,
        lc.scheduled_date,
        lc.scheduled_time,
        c.title as course_title,
        ca.status as attendance_status,
        ca.attendance_minutes
      FROM live_classes lc
      INNER JOIN courses c ON lc.course_id = c.id
      INNER JOIN enrollments e ON c.id = e.course_id AND e.student_id = ?
      LEFT JOIN class_attendance ca ON lc.id = ca.live_class_id AND ca.student_id = ?
      WHERE lc.status = 'completed'
      ORDER BY lc.scheduled_date DESC, lc.scheduled_time DESC
      LIMIT 100
    `).bind(i.id,i.id).all();return t.json({classes:(o==null?void 0:o.results)||[]})}catch(r){return console.error("Get completed classes error:",r),t.json({message:"Failed to load classes: "+r.message},500)}}async function Jg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=me(a);if(!s)return t.json({message:"Invalid token"},401);const{assignmentId:i,submissionText:o,fileUrl:l}=await t.req.json();if(!i)return t.json({message:"Assignment ID required"},400);const c=await r.prepare("SELECT id FROM students WHERE parent_id = ? LIMIT 1").bind(s.id).first();if(!c)return t.json({message:"Student not found"},404);const u=await r.prepare("SELECT id FROM assignment_submissions WHERE assignment_id = ? AND student_id = ?").bind(i,c.id).first();return u?(await r.prepare(`
        UPDATE assignment_submissions
        SET submission_text = ?, file_url = ?, submitted_at = datetime('now'), status = 'submitted'
        WHERE id = ?
      `).bind(o||null,l||null,u.id).run(),t.json({message:"Assignment updated successfully"})):(await r.prepare(`
        INSERT INTO assignment_submissions (assignment_id, student_id, submission_text, file_url, status)
        VALUES (?, ?, ?, ?, 'submitted')
      `).bind(i,c.id,o||null,l||null).run(),t.json({message:"Assignment submitted successfully"},201))}catch(r){return console.error("Submit assignment error:",r),t.json({message:"Failed to submit assignment: "+r.message},500)}}async function Xg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=me(a);if(!s)return t.json({message:"Invalid token"},401);const i=await r.prepare("SELECT id FROM students WHERE parent_id = ? LIMIT 1").bind(s.id).first();if(!i)return t.json({achievements:[]});const o=await r.prepare(`
      SELECT 
        a.id,
        a.name,
        a.description,
        a.icon,
        sa.earned_at,
        CASE WHEN sa.id IS NOT NULL THEN 1 ELSE 0 END as earned
      FROM achievements a
      LEFT JOIN student_achievements sa ON a.id = sa.achievement_id AND sa.student_id = ?
      ORDER BY earned DESC, a.created_at ASC
    `).bind(i.id).all();return t.json({achievements:(o==null?void 0:o.results)||[]})}catch(r){return console.error("Get achievements error:",r),t.json({message:"Failed to load achievements: "+r.message},500)}}async function Qg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=me(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const{title:i,description:o,category:l,priceMonthly:c,thumbnailUrl:u}=await t.req.json();if(!i)return t.json({message:"Title required"},400);const d=await r.prepare(`
      INSERT INTO courses (title, description, category, price_monthly, thumbnail_url, status)
      VALUES (?, ?, ?, ?, ?, 'active')
    `).bind(i,o||null,l||null,c||49,u||null).run();return t.json({message:"Course created successfully",courseId:d.meta.last_row_id},201)}catch(r){return console.error("Create course error:",r),t.json({message:"Failed to create course: "+r.message},500)}}async function Zg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=me(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const{courseId:i,classNumber:o,title:l,description:c,scheduledDate:u,scheduledTime:d,durationMinutes:h,meetingLink:g,meetingPassword:b}=await t.req.json();if(!i||!l||!u||!d)return t.json({message:"Course ID, title, date, and time required"},400);const m=await r.prepare(`
      INSERT INTO live_classes (course_id, class_number, title, description, scheduled_date, scheduled_time, duration_minutes, meeting_link, meeting_password, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'scheduled')
    `).bind(i,o||1,l,c||null,u,d,h||60,g||null,b||null).run();return t.json({message:"Class scheduled successfully",classId:m.meta.last_row_id},201)}catch(r){return console.error("Schedule class error:",r),t.json({message:"Failed to schedule class: "+r.message},500)}}async function ef(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=me(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const{liveClassId:i,studentId:o,status:l,attendanceMinutes:c}=await t.req.json();return!i||!o||!l?t.json({message:"Class ID, student ID, and status required"},400):(await r.prepare(`
      INSERT INTO class_attendance (live_class_id, student_id, status, attendance_minutes, marked_by, marked_at)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
      ON CONFLICT(live_class_id, student_id) 
      DO UPDATE SET status = ?, attendance_minutes = ?, marked_by = ?, marked_at = datetime('now')
    `).bind(i,o,l,c||null,s.id,l,c||null,s.id).run(),t.json({message:"Attendance marked successfully"}))}catch(r){return console.error("Mark attendance error:",r),t.json({message:"Failed to mark attendance: "+r.message},500)}}async function tf(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=me(a);if(!s)return t.json({message:"Invalid token"},401);const i=await r.prepare(`
      SELECT 
        s.id,
        s.first_name,
        s.last_name,
        s.age,
        s.grade,
        s.enrollment_status,
        COUNT(DISTINCT e.course_id) as courses_enrolled,
        COUNT(DISTINCT ca.id) as classes_attended
      FROM students s
      LEFT JOIN enrollments e ON s.id = e.student_id AND e.status = 'active'
      LEFT JOIN class_attendance ca ON s.id = ca.student_id AND ca.status = 'present'
      WHERE s.parent_id = ?
      GROUP BY s.id
      ORDER BY s.created_at DESC
    `).bind(s.id).all();return t.json({students:(i==null?void 0:i.results)||[]})}catch(r){return console.error("Get my students error:",r),t.json({message:"Failed to load students: "+r.message},500)}}async function rf(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=me(a);if(!s)return t.json({message:"Invalid token"},401);const i=await r.prepare("SELECT id FROM students WHERE parent_id = ? LIMIT 1").bind(s.id).first();if(!i)return t.json({courses:[]});const o=await r.prepare(`
      SELECT 
        c.id,
        c.title,
        c.description,
        c.category,
        c.thumbnail_url,
        e.progress,
        e.status,
        COUNT(DISTINCT lc.id) as total_classes,
        COUNT(DISTINCT ca.id) as attended_classes
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      LEFT JOIN live_classes lc ON c.id = lc.course_id
      LEFT JOIN class_attendance ca ON lc.id = ca.live_class_id AND ca.student_id = e.student_id AND ca.status = 'present'
      WHERE e.student_id = ?
      GROUP BY c.id
      ORDER BY e.enrolled_at DESC
    `).bind(i.id).all();return t.json({courses:(o==null?void 0:o.results)||[]})}catch(r){return console.error("Get student courses error:",r),t.json({message:"Failed to load courses: "+r.message},500)}}async function nf(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=me(a);if(!s)return t.json({message:"Invalid token"},401);const i=await r.prepare("SELECT id FROM students WHERE parent_id = ? LIMIT 1").bind(s.id).first();if(!i)return t.json({assignments:[]});const o=await r.prepare(`
      SELECT 
        a.id,
        a.title,
        a.description,
        a.due_date,
        a.points_possible,
        a.assignment_type,
        c.title as course_title,
        lc.title as class_title,
        s.submission_text,
        s.file_url,
        s.submitted_at,
        s.grade,
        s.feedback,
        s.status
      FROM course_assignments a
      JOIN courses c ON a.course_id = c.id
      LEFT JOIN live_classes lc ON a.live_class_id = lc.id
      JOIN enrollments e ON c.id = e.course_id AND e.student_id = ?
      LEFT JOIN assignment_submissions s ON a.id = s.assignment_id AND s.student_id = ?
      ORDER BY a.due_date DESC
    `).bind(i.id,i.id).all();return t.json({assignments:(o==null?void 0:o.results)||[]})}catch(r){return console.error("Get student assignments error:",r),t.json({message:"Failed to load assignments: "+r.message},500)}}async function af(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=me(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const{courseId:i,liveClassId:o,title:l,description:c,dueDate:u,pointsPossible:d,assignmentType:h}=await t.req.json();if(!i||!l)return t.json({message:"Course ID and title required"},400);const g=await r.prepare(`
      INSERT INTO course_assignments (course_id, live_class_id, title, description, due_date, points_possible, assignment_type)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(i,o||null,l,c||null,u||null,d||100,h||"homework").run();return t.json({message:"Assignment created successfully",assignmentId:g.meta.last_row_id},201)}catch(r){return console.error("Create assignment error:",r),t.json({message:"Failed to create assignment: "+r.message},500)}}async function sf(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=me(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const{submissionId:i,grade:o,feedback:l}=await t.req.json();return!i||o===void 0?t.json({message:"Submission ID and grade required"},400):(await r.prepare(`
      UPDATE assignment_submissions
      SET grade = ?, feedback = ?, graded_by = ?, graded_at = datetime('now'), status = 'graded'
      WHERE id = ?
    `).bind(o,l||null,s.id,i).run(),t.json({message:"Assignment graded successfully"}))}catch(r){return console.error("Grade assignment error:",r),t.json({message:"Failed to grade assignment: "+r.message},500)}}async function of(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=me(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const{studentId:i,achievementId:o}=await t.req.json();if(!i||!o)return t.json({message:"Student ID and achievement ID required"},400);const l=await r.prepare(`
      INSERT INTO student_achievements (student_id, achievement_id, awarded_by)
      VALUES (?, ?, ?)
      ON CONFLICT(student_id, achievement_id) DO NOTHING
    `).bind(i,o,s.id).run();return t.json({message:"Achievement awarded successfully",awardId:l.meta.last_row_id},201)}catch(r){return console.error("Award achievement error:",r),t.json({message:"Failed to award achievement: "+r.message},500)}}async function lf(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=me(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const{userId:i,studentId:o,type:l,title:c,message:u,link:d}=await t.req.json();if(!i||!l||!c||!u)return t.json({message:"User ID, type, title, and message required"},400);const h=await r.prepare(`
      INSERT INTO notifications (user_id, student_id, type, title, message, link)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(i,o||null,l,c,u,d||null).run();return t.json({message:"Notification sent successfully",notificationId:h.meta.last_row_id},201)}catch(r){return console.error("Send notification error:",r),t.json({message:"Failed to send notification: "+r.message},500)}}const cf=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign In - Acromatico Education</title>
  <link rel="stylesheet" href="/static/acromatico-brand.css">
  <style>
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    .login-container {
      padding: 48px;
      width: 100%;
      max-width: 440px;
    }
    
    .logo {
      margin: 0 auto 32px;
      filter: brightness(1.1);
    }
    
    h1 {
      font-size: 32px;
      font-weight: 200;
      text-align: center;
      margin-bottom: 8px;
      letter-spacing: -0.02em;
    }
    
    .subtitle {
      text-align: center;
      margin-bottom: 32px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 300;
      color: rgba(255, 255, 255, 0.8);
    }
    
    .btn {
      width: 100%;
      padding: 16px;
      font-size: 16px;
      font-weight: 400;
      transition: all 0.3s ease;
      margin-top: 8px;
    }
    
    .btn:hover {
      background: #5aa5b8;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(71, 148, 166, 0.3);
    }
    
    .btn:active {
      transform: translateY(0);
    }
    
    .divider {
      text-align: center;
      margin: 24px 0;
      color: rgba(255, 255, 255, 0.4);
      font-size: 14px;
      position: relative;
    }
    
    .divider::before,
    .divider::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 40%;
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
    }
    
    .divider::before {
      left: 0;
    }
    
    .divider::after {
      right: 0;
    }
    
    .link {
      text-align: center;
      margin-top: 24px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
    }
    
    .link a {
      color: #4794A6;
      text-decoration: none;
      font-weight: 600;
    }
    
    .link a:hover {
      color: #5aa5b8;
      text-decoration: underline;
    }
    
    .back-link {
      text-align: center;
      margin-top: 32px;
    }
    
    .back-link a {
      color: rgba(255, 255, 255, 0.5);
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s ease;
    }
    
    .back-link a:hover {
      color: #4794A6;
    }
    
    .error-message {
      background: rgba(220, 38, 38, 0.1);
      border: 1px solid rgba(220, 38, 38, 0.3);
      color: #fca5a5;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      font-size: 14px;
      display: none;
    }
    
    .success-message {
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      color: #86efac;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      font-size: 14px;
      display: none;
    }
    
    @media (max-width: 480px) {
      .login-container {
        padding: 32px 24px;
      }
      
      h1 {
        font-size: 28px;
      }
    }
  </style>
</head>
<body>
  <div class="login-container glass-container">
    <img src="/static/acromatico-logo-white-best.png" alt="Acromatico" class="logo" style="width: 200px; height: auto;">
    <h1>Welcome Back</h1>
    <p class="subtitle text-muted">Sign in to continue your creative journey</p>
    
    <div id="errorMessage" class="error-message"></div>
    <div id="successMessage" class="success-message"></div>
    
    <form id="loginForm">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="you@example.com" required>
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="••••••••" required>
      </div>
      
      <button type="submit" class="btn btn-primary">Sign In</button>
    </form>
    
    <div class="divider">or</div>
    
    <div class="link">
      Don't have an account? <a href="/education/signup">Create account</a>
    </div>
    
    <div class="link">
      <a href="/education/reset-password">Forgot password?</a>
    </div>
    
    <div class="back-link">
      <a href="/education">← Back to Education</a>
    </div>
  </div>
  
  <script>
    const form = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      errorMessage.style.display = 'none';
      successMessage.style.display = 'none';
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          localStorage.setItem('auth_token', data.token);
          localStorage.setItem('user_role', data.user.role);
          
          successMessage.textContent = 'Login successful! Redirecting...';
          successMessage.style.display = 'block';
          
          setTimeout(() => {
            if (data.user.role === 'admin') {
              window.location.href = '/admin/dashboard';
            } else if (data.user.role === 'parent') {
              window.location.href = '/parent/dashboard';
            } else if (data.user.role === 'student') {
              window.location.href = '/student/dashboard';
            }
          }, 1000);
        } else {
          errorMessage.textContent = data.message || 'Login failed. Please try again.';
          errorMessage.style.display = 'block';
        }
      } catch (error) {
        errorMessage.textContent = 'Network error. Please try again.';
        errorMessage.style.display = 'block';
      }
    });
  <\/script>
</body>
</html>`,df="https://www.genspark.ai/api/llm_proxy/v1/chat/completions";async function Wn(t,r,n="genspark-pro",a=3){let s=null;for(let i=1;i<=a;i++)try{const o=await fetch(df,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({model:n,messages:t,temperature:.3,max_tokens:2e3})});if(!o.ok){const c=await o.text();throw new Error(`Genspark API error: ${o.status} ${o.statusText} - ${c}`)}return(await o.json()).choices[0].message.content}catch(o){s=o,console.error(`Genspark API attempt ${i}/${a} failed:`,o),i<a&&await new Promise(l=>setTimeout(l,Math.pow(2,i)*1e3))}throw new Error(`Genspark API failed after ${a} attempts: ${s==null?void 0:s.message}`)}function Hn(t){try{const r=t.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim();return JSON.parse(r)}catch{throw console.error("Failed to parse AI JSON:",t),new Error("AI returned invalid JSON format")}}async function bc(t,r){if(!r||r==="$GENSPARK_TOKEN"){t.rawMessage.toLowerCase();const l=/not working|broken|error|issue|problem|bug|fail/i.test(t.rawMessage),c=/asap|urgent|critical|immediately|now|emergency/i.test(t.rawMessage),u=/!{2,}|losing|can't|won't/i.test(t.rawMessage);return{messageType:l?"bug-report":"question",category:l?"technical":"business",urgency:c?"high":"medium",sentiment:u?"frustrated":"neutral",requiresAction:l||c,projectId:(t.projectName,null),confidence:.65,reasoning:"[DEMO MODE] Basic keyword analysis used (configure GENSPARK_API_KEY for full AI classification)"}}const n=`You are an Executive Assistant for Acromatico, a premium branding and web/app development agency.

Your task: Analyze client messages and classify them for the operations team with surgical precision.

CLASSIFICATION FRAMEWORK:

MESSAGE TYPES:
- bug-report: Something is broken or not working as expected
- feature-request: Client wants new functionality added
- question: Needs information, clarification, or guidance
- feedback: General comments about project quality or experience
- scope-change: Wants to modify project scope or add deliverables
- payment: Invoice, budget, timeline, or payment discussion
- personal: Social/relationship building, not project-related
- spam: Irrelevant, sales pitches, or automated messages

CATEGORIES:
- technical: Requires development work (coding, design, infrastructure)
- business: Contract, payment, timeline, budget discussions
- relationship: Check-ins, feedback, trust-building, satisfaction
- urgent-blocker: Blocking client's business operations RIGHT NOW
- non-actionable: No follow-up needed, informational only

URGENCY LEVELS:
- critical: Production down, revenue loss, angry client, legal issues
- high: Impacts project timeline or client satisfaction significantly
- medium: Important but not time-sensitive, can wait 48 hours
- low: Nice-to-have, no deadline, backlog item

SENTIMENT:
- positive: Happy, excited, grateful, enthusiastic
- neutral: Factual, transactional, professional
- negative: Disappointed, concerned, hesitant
- frustrated: Angry, impatient, threatening to leave

RESPOND WITH JSON ONLY (no markdown, no explanations, no code blocks):
{
  "messageType": "bug-report",
  "category": "urgent-blocker",
  "urgency": "critical",
  "sentiment": "frustrated",
  "requiresAction": true,
  "projectId": "proj-001",
  "confidence": 0.95,
  "reasoning": "Client reports login failure affecting their business operations"
}`,a=`CLIENT MESSAGE:
"""
${t.rawMessage}
"""

CONTEXT:
- Client: ${t.clientName||"Unknown"}
- Company: ${t.companyName||"Unknown"}
- Active Project: ${t.projectName||"No active project"}
${t.conversationHistory?`- Previous messages: ${t.conversationHistory.length} messages`:"- No previous conversation history"}

Classify this message now.`,i=await Wn([{role:"system",content:n},{role:"user",content:a}],r);return Hn(i)}async function xc(t,r){if(!r||r==="$GENSPARK_TOKEN"){const l=t.rawMessage;return{taskTitle:`[DEMO] ${l.length>50?l.substring(0,47)+"...":l}`,description:`CLIENT REQUEST:
${l}

[DEMO MODE] Configure GENSPARK_API_KEY for full AI task generation`,acceptanceCriteria:["[DEMO] Full criteria will be AI-generated"],estimatedEffort:t.classification.urgency==="critical"?"4hr":"2hr",priority:t.classification.urgency==="critical"?"critical":"medium",tags:["demo","needs-ai-config"],suggestedResponse:"Thanks for reaching out! We received your message and will get back to you within 2 hours. - Team Acromatico",scopeFlag:t.classification.category==="scope-change",clientApprovalRequired:t.classification.category==="scope-change"}}const n=`You are a Senior Project Manager at Acromatico, a premium branding and web/app development agency.

Your task: Convert client requests into detailed technical specifications that developers can execute immediately.

TASK CREATION RULES:

TITLE FORMAT:
- Start with action verb: "Fix", "Add", "Update", "Refactor", "Investigate"
- Be specific: "Fix login authentication on mobile Safari" not "Login issue"
- Include context: Platform, device, or feature area
- Examples: "Fix broken image upload on iPhone 13", "Add newsletter signup to homepage footer"

DESCRIPTION STRUCTURE:
1. CLIENT REQUEST: What the client said (verbatim or paraphrased)
2. CURRENT STATE: What's happening now (if bug) or what's missing (if feature)
3. EXPECTED STATE: What should happen instead
4. USER IMPACT: How this affects client's business or users
5. TECHNICAL CONTEXT: Relevant tech stack, dependencies, or constraints

ACCEPTANCE CRITERIA:
- Use "Given-When-Then" format for clarity
- Make them testable (pass/fail, no ambiguity)
- Include edge cases and error scenarios
- Example:
  * "Given user on mobile Safari, when clicking login button, then form submits successfully"
  * "Given invalid credentials, when submitting form, then show error message"
  * "Given valid credentials, when submitting form, then redirect to dashboard"

EFFORT ESTIMATION GUIDE:
- 15min: Typo fixes, config tweaks, simple CSS adjustments, content updates
- 30min: Minor bug fixes, small style changes, basic integrations
- 1hr: Small features, moderate styling work, simple API connections
- 2hr: Moderate features, authentication work, form implementations
- 4hr: Complex features, database schema changes, advanced integrations
- 8hr: Major features, architecture changes, third-party API deep integration
- 16hr: Epic-level work, requires planning session, multiple subsystems
- unknown: Scope unclear, needs discovery call with client

PRIORITY MAPPING:
- critical: Blocking production, revenue loss (maps from "critical" urgency)
- high: Impacts timeline or satisfaction (maps from "high" urgency)
- medium: Important but flexible (maps from "medium" urgency)
- low: Nice-to-have, backlog (maps from "low" urgency)

SCOPE DETECTION:
- Flag scopeFlag=true if request is outside original project agreement
- Flag clientApprovalRequired=true if task needs budget/timeline approval
- Examples of out-of-scope: "Can you also build a mobile app?" when project is website only

RESPONSE TEMPLATE GUIDE:
- Acknowledge: "Thanks for reaching out!"
- Confirm understanding: "We've identified [specific issue]"
- Set expectation: "We'll have [solution] ready by [timeframe]"
- Provide value: "I'll send you a confirmation once it's live"
- Stay professional but friendly

RESPOND WITH JSON ONLY (no markdown):
{
  "taskTitle": "Fix login authentication flow on mobile Safari",
  "description": "CLIENT REQUEST: Login button not working on iPhone\\n\\nCURRENT STATE: Button click has no effect, form doesn't submit\\n\\nEXPECTED STATE: Form submits on click, redirects to dashboard on success\\n\\nUSER IMPACT: Client cannot access admin panel from mobile device, affecting daily operations\\n\\nTECHNICAL CONTEXT: React form, Safari-specific event handling issue",
  "acceptanceCriteria": [
    "Given user on mobile Safari, when clicking login button, then form submits",
    "Given valid credentials, when form submits, then redirect to dashboard",
    "Given invalid credentials, when form submits, then show error message",
    "Given slow network, when submitting form, then show loading state"
  ],
  "estimatedEffort": "2hr",
  "priority": "high",
  "tags": ["bug", "mobile", "auth", "safari"],
  "suggestedResponse": "Thanks for reporting this! We've identified the mobile Safari issue with the login button. Our team will have a fix deployed by end of day Friday. I'll send you a confirmation email once it's live so you can test it. Let me know if you need anything else!",
  "scopeFlag": false,
  "clientApprovalRequired": false
}`,a=`CLIENT MESSAGE:
"""
${t.rawMessage}
"""

MESSAGE CLASSIFICATION:
- Type: ${t.classification.messageType}
- Category: ${t.classification.category}
- Urgency: ${t.classification.urgency}
- Sentiment: ${t.classification.sentiment}

PROJECT CONTEXT:
- Project: ${t.projectContext.projectName}
- Type: ${t.projectContext.projectType}
- Tech Stack: ${t.projectContext.techStack}
- Phase: ${t.projectContext.currentPhase}
- Budget: ${t.projectContext.budgetHours} hours (${t.projectContext.hoursUsed} used, ${t.projectContext.budgetHours-t.projectContext.hoursUsed} remaining)

Generate a detailed task specification now.`,i=await Wn([{role:"system",content:n},{role:"user",content:a}],r);return Hn(i)}async function uf(t,r){if(!r||r==="$GENSPARK_TOKEN"){const c=t.recentMessages.filter(d=>d.sentiment==="negative"||d.sentiment==="frustrated").length,u=75-c*10;return{healthScore:Math.max(20,Math.min(100,u)),churnRisk:c>2?"high":"low",sentimentTrend:c>1?"declining":"stable",upsellOpportunities:[],concerns:c>0?["[DEMO] Multiple negative messages detected"]:[],strengths:["[DEMO] Configure GENSPARK_API_KEY for full health analysis"],reasoning:"[DEMO MODE] Basic scoring used"}}const n=`You are an Account Manager at Acromatico analyzing client relationship health with data-driven precision.

Your task: Calculate health score and identify risks/opportunities.

HEALTH SCORING RUBRIC (START AT 75, ADJUST):

DEDUCT POINTS:
- Each negative sentiment message: -10 points
- Each frustrated sentiment message: -15 points
- Response time > 48 hours: -15 points
- Response time > 72 hours: -25 points
- Radio silence (no contact > 14 days): -25 points
- Radio silence > 21 days: -35 points
- Project behind schedule: -15 points
- Over budget: -20 points
- Payment issues: -25 points

ADD POINTS:
- Each positive sentiment message: +10 points
- Enthusiastic feedback: +15 points
- On-time project delivery: +15 points
- Under budget: +10 points
- Active engagement (messages every 3-7 days): +10 points
- Referrals or testimonials: +25 points
- Multiple active projects: +20 points

RISK LEVEL THRESHOLDS:
- 0-40: CRITICAL (immediate intervention required)
- 41-60: HIGH (schedule check-in within 48h)
- 61-79: MEDIUM (monitor closely, proactive check-in)
- 80-100: LOW (healthy relationship, maintain momentum)

CHURN RISK INDICATORS:
- Negative sentiment + slow responses
- Payment disputes or delays
- Silent for >21 days despite active project
- Scope creep complaints
- Expressing dissatisfaction with timeline
- Mentioning competitors

UPSELL SIGNALS:
- Mentions additional needs ("we also need...", "what about...")
- Expresses satisfaction ("love what you built", "exceeded expectations")
- Growing business ("scaling fast", "hiring team", "expanding")
- Asks about other services ("do you also do...", "can you help with...")
- Multiple successful projects (proven trust)

RECOMMENDED ACTIONS PRIORITY:
1. CRITICAL: Schedule immediate call (within 24h)
2. HIGH: Send personalized check-in email
3. MEDIUM: Add to weekly review list
4. LOW: Continue current cadence

RESPOND WITH JSON ONLY:
{
  "healthScore": 72,
  "riskLevel": "medium",
  "churnRiskFactors": ["slow-responses", "overdue-payment", "negative-sentiment-trend"],
  "upsellSignals": ["mentioned-mobile-app-need", "expressed-satisfaction", "expanding-team"],
  "responseTimeTrend": "declining",
  "sentimentTrend": "neutral",
  "recommendedActions": [
    "Schedule check-in call within 48 hours to address payment",
    "Send invoice reminder with payment link",
    "Propose mobile app development as Phase 2 (estimated $15k)",
    "Monitor next 2 messages for sentiment improvement"
  ],
  "confidence": 0.88
}`,a=t.responseMetrics.lastContactDate?Math.floor((Date.now()-new Date(t.responseMetrics.lastContactDate).getTime())/(1e3*60*60*24)):999,s=`CLIENT PROFILE:
- Name: ${t.clientData.name}
- Company: ${t.clientData.company}
- Total Projects: ${t.clientData.totalProjects}
- Active Projects: ${t.clientData.activeProjects}
- Total Revenue: $${t.clientData.totalRevenue.toLocaleString()}

RECENT MESSAGES (last 30 days):
${t.recentMessages.map((c,u)=>`${u+1}. [${c.sentiment.toUpperCase()}, ${c.urgency}] "${c.content.substring(0,100)}..." (${c.timestamp})`).join(`
`)}

RESPONSE METRICS:
- Average response time: ${t.responseMetrics.avgResponseTimeHours} hours
- Last contact: ${t.responseMetrics.lastContactDate||"Never"} (${a} days ago)

PROJECT PERFORMANCE:
- On-time delivery: ${t.projectMetrics.onTimeDelivery?"Yes":"No"}
- Budget compliance: ${t.projectMetrics.budgetCompliance?"Yes":"No"}
- Current status: ${t.projectMetrics.currentStatus}

Calculate health score and provide strategic recommendations.`,o=await Wn([{role:"system",content:n},{role:"user",content:s}],r);return Hn(o)}async function hf(t,r){if(!r||r==="$GENSPARK_TOKEN")return{commonPatterns:[{pattern:"[DEMO] Form submission issues",frequency:3,affectedClients:["client-joes-pizza"],potentialRevenue:5e3,recommendation:"Create reusable form validation component"}],productizationOpportunities:[{opportunity:"[DEMO] Restaurant Website Starter Kit",estimatedRevenue:15e3,developmentCost:40,roi:375,confidence:.6,description:"Configure GENSPARK_API_KEY for full pattern analysis"}],operationalInsights:{avgResponseTime:12,taskVelocity:8,estimationAccuracy:.85,bottlenecks:["[DEMO] API key needed for real insights"]},strategicRecommendations:["[DEMO] Configure GENSPARK_API_KEY to unlock full business intelligence"]};const n=`You are a McKinsey-level Business Analyst at Acromatico identifying patterns and strategic opportunities.

Your task: Analyze client data to generate executive intelligence for 10x growth decisions.

ANALYSIS DIMENSIONS:

1. COMMON REQUEST PATTERNS
   - What are multiple clients asking for?
   - Are there recurring technical issues?
   - Can we productize repeated custom work?
   - Example: If 5+ clients need "booking system" → Create "BookingStarter" template ($2k product)

2. PRODUCTIZATION OPPORTUNITIES (HIGH ROI)
   - Frequency: How many clients need this?
   - Revenue potential: What could we charge?
   - Development cost: One-time build effort
   - ROI calculation: (Revenue × Frequency) / Development Cost
   - Prioritize: ROI > 500% = HIGH, 200-500% = MEDIUM, <200% = LOW

3. OPERATIONAL BOTTLENECKS
   - Which task types take longest?
   - Where are estimates consistently wrong?
   - What's blocking project velocity?
   - Example: "Auth bugs take 3x longer than estimated → Invest in auth testing framework"

4. REVENUE OPPORTUNITIES (IMMEDIATE)
   - Which clients show expansion signals?
   - What services should we cross-sell?
   - Calculate estimated deal value × confidence score
   - Example: Client mentions "need mobile app" + high satisfaction → $15k opportunity at 0.85 confidence

5. STRATEGIC ALERTS
   - Critical: Requires action this week
   - High: Address within 2 weeks
   - Medium: Add to monthly strategy review

6. PRODUCTIVITY METRICS
   - Productivity Score = (Tasks Completed / Tasks Created) × Estimation Accuracy × 100
   - Estimation Accuracy = (Tasks where actual ≤ estimated) / Total Completed Tasks × 100

RESPOND WITH JSON ONLY:
{
  "topPatterns": [
    {
      "pattern": "Mobile responsiveness issues across Safari and Chrome",
      "frequency": 8,
      "affectedClients": ["client-001", "client-003", "client-005"],
      "productizationPotential": "high",
      "estimatedRevenue": 4000,
      "recommendation": "Create 'Mobile QA Package' ($500/client) - includes cross-browser testing, responsive audit, iOS/Android validation. ROI: 8 clients × $500 = $4k revenue for ~$600 dev cost = 667% ROI"
    }
  ],
  "operationalInsights": [
    {
      "insight": "Authentication tasks consistently take 2-3x longer than estimated",
      "impact": "high",
      "affectedTasks": 12,
      "recommendation": "Invest 8 hours building auth testing framework with Playwright. Will save ~24 hours over next quarter = 300% ROI"
    }
  ],
  "revenueOpportunities": [
    {
      "clientId": "client-002",
      "clientName": "FitPro App",
      "opportunity": "Email automation system integration",
      "estimatedValue": 3500,
      "confidence": 0.82,
      "nextSteps": "Client mentioned 'need to automate onboarding emails' in last message. Schedule 30-min discovery call, send proposal by Friday"
    }
  ],
  "strategicAlerts": [
    {
      "alert": "3 clients at high churn risk (health score < 50)",
      "urgency": "critical",
      "action": "Schedule retention calls this week with personalized recovery plans",
      "deadline": "2026-03-28"
    }
  ],
  "productivityScore": 78,
  "estimationAccuracy": 65
}`,a=`ANALYSIS TIMEFRAME: ${t.timeframe}

MESSAGE DATA (${t.allMessages.length} total):
${JSON.stringify(t.allMessages.slice(0,100),null,2)}

TASK DATA (${t.allTasks.length} total):
${JSON.stringify(t.allTasks.slice(0,50),null,2)}

CLIENT DATA (${t.allClients.length} total):
${JSON.stringify(t.allClients,null,2)}

Generate executive intelligence report with strategic recommendations ranked by ROI impact.`,i=await Wn([{role:"system",content:n},{role:"user",content:a}],r,"genspark-pro");return Hn(i)}function kt(t){const r=Date.now(),n=Math.random().toString(36).substring(2,8);return`${t}-${r}-${n}`}function Qs(t){const r=t.replace(/\D/g,"");return r.startsWith("1")?`+${r}`:`+1${r}`}const sr=()=>e("nav",{class:"glass-nav fixed top-0 left-0 right-0 z-50",children:[e("style",{children:`
      .glass-nav {
        background: rgba(10, 10, 10, 0.8);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      .btn-primary {
        background: #4794A6;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(71, 148, 166, 0.3);
      }
      .btn-primary:hover {
        background: #5aa5b8;
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(71, 148, 166, 0.5);
      }
      .site-logo-header {
        width: 200px;
        height: auto;
        filter: brightness(0) invert(1);
        transition: all 0.3s ease;
      }
      .header-signin {
        display: inline-block;
      }
      @media (max-width: 768px) {
        .site-logo-header {
          width: 150px;
        }
        .header-signin {
          display: none; /* Hide Sign In on mobile */
        }
        .btn-primary {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }
      }
    `}),e("div",{class:"max-w-7xl mx-auto px-6 lg:px-8",children:e("div",{class:"flex justify-between h-20 items-center",children:[e("div",{class:"flex items-center space-x-4 opacity-0",children:e("span",{children:"Spacer"})}),e("div",{class:"flex-1 flex justify-center",children:e("a",{href:"/",children:e("img",{src:"/static/acromatico-logo-transparent.png?v=3",alt:"Acromatico",class:"site-logo-header"})})}),e("div",{class:"flex items-center space-x-4",children:[e("a",{href:"/pricing",class:"btn-primary px-6 py-3 rounded-full font-semibold",children:"Enroll Now"}),e("a",{href:"/login",class:"header-signin text-gray-300 hover:text-white transition",children:"Sign In"})]})]})})]}),pf=()=>e("nav",{class:"glass-nav fixed top-0 left-0 right-0 z-50",style:"background: rgba(253, 253, 251, 0.95); backdrop-filter: blur(20px); border-bottom: 1px solid #E8E5E0;",children:[e("style",{children:`
      .site-logo-prints {
        width: 200px;
        height: auto;
        transition: all 0.3s ease;
      }
      @media (max-width: 768px) {
        .site-logo-prints {
          width: 150px;
        }
      }
    `}),e("div",{class:"max-w-7xl mx-auto px-6 lg:px-8",children:e("div",{class:"flex justify-between h-20 items-center",children:[e("div",{class:"flex items-center space-x-4 opacity-0",children:e("span",{children:"Spacer"})}),e("div",{class:"flex-1 flex justify-center",children:e("a",{href:"/",children:e("img",{src:"/static/acromatico-logo-transparent.png?v=3",alt:"Acromatico",class:"site-logo-prints"})})}),e("div",{class:"flex items-center space-x-6",children:[e("a",{href:"#",onclick:"event.preventDefault(); openComingSoonModal('Art Prints');",style:"color: #3D3935; text-decoration: none; font-size: 16px; font-weight: 500; cursor: pointer;",children:"Prints"}),e("a",{href:"/about",style:"color: #3D3935; text-decoration: none; font-size: 16px;",children:"About"}),e("button",{onclick:"viewCart()",style:"position: relative; background: none; border: none; cursor: pointer; color: #3D3935; font-size: 24px; padding: 8px;",children:["🛒",e("span",{class:"cart-badge",style:"display: none; position: absolute; top: 0; right: 0; background: #3D3935; color: white; border-radius: 50%; width: 20px; height: 20px; font-size: 12px; align-items: center; justify-content: center; font-weight: 500;",children:"0"})]})]})]})})]}),mf=()=>e("footer",{class:"bg-black border-t border-white/10 py-16",children:e("div",{class:"max-w-7xl mx-auto px-6 lg:px-8",children:[e("div",{class:"grid grid-cols-2 md:grid-cols-4 gap-12 mb-12",children:[e("div",{children:[e("h4",{class:"font-bold mb-4",style:"color: white;",children:"Academy"}),e("ul",{class:"space-y-2 text-gray-400 text-sm",children:[e("li",{children:e("a",{href:"/academy",class:"hover:text-white transition",children:"Curriculum"})}),e("li",{children:e("a",{href:"/pricing",class:"hover:text-white transition",children:"Pricing"})}),e("li",{children:e("a",{href:"/faq",class:"hover:text-white transition",children:"FAQ"})})]})]}),e("div",{children:[e("h4",{class:"font-bold mb-4",style:"color: white;",children:"Services"}),e("ul",{class:"space-y-2 text-gray-400 text-sm",children:[e("li",{children:e("a",{href:"/studio",class:"hover:text-white transition",children:"Studio"})}),e("li",{children:e("a",{href:"#",onclick:"event.preventDefault(); openComingSoonModal('Art Prints');",class:"hover:text-white transition cursor-pointer",children:"Art Prints"})}),e("li",{children:e("a",{href:"/photography",class:"hover:text-white transition",children:"Photography"})})]})]}),e("div",{children:[e("h4",{class:"font-bold mb-4",style:"color: white;",children:"Company"}),e("ul",{class:"space-y-2 text-gray-400 text-sm",children:[e("li",{children:e("a",{href:"/about",class:"hover:text-white transition",children:"About"})}),e("li",{children:e("a",{href:"/blog",class:"hover:text-white transition",children:"Blog"})}),e("li",{children:e("a",{href:"/contact",class:"hover:text-white transition",children:"Contact"})})]})]}),e("div",{children:[e("h4",{class:"font-bold mb-4",style:"color: white;",children:"Legal"}),e("ul",{class:"space-y-2 text-gray-400 text-sm",children:[e("li",{children:e("a",{href:"/privacy",class:"hover:text-white transition",children:"Privacy"})}),e("li",{children:e("a",{href:"/terms",class:"hover:text-white transition",children:"Terms"})})]})]})]}),e("div",{class:"pt-8 pb-8 border-t border-white/10 text-center",children:[e("style",{children:`
          .footer-signin-btn {
            display: inline-block;
            padding: 1rem 3rem;
            background: rgba(71, 148, 166, 0.15);
            border: 2px solid #4794A6;
            color: #4794A6;
            font-weight: 600;
            font-size: 1.125rem;
            border-radius: 9999px;
            transition: all 0.3s ease;
            text-decoration: none;
          }
          .footer-signin-btn:hover {
            background: #4794A6;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(71, 148, 166, 0.4);
          }
          @media (min-width: 769px) {
            .footer-signin-btn {
              display: none; /* Hide on desktop - it's in header */
            }
          }
        `}),e("a",{href:"/login",class:"footer-signin-btn",children:"Sign In to Your Account →"})]}),e("div",{class:"pt-8 border-t border-white/10 text-center text-gray-400 text-sm",children:e("p",{children:"© 2026 Acromatico. Built for creators, by creators."})})]})}),w=new Ds;w.use("/api/*",Nd());function gf(t){const r=t.toLowerCase();return r.includes("lead")||r.includes("customer")||r.includes("traffic")||r.includes("acquisition")?{category:"ACQUISITION",diagnosis:"🎯 You have an acquisition problem.",insight:"This is THE #1 business killer. Every other problem stems from not having enough qualified leads. Fix this and everything else gets easier."}:r.includes("time")||r.includes("hour")||r.includes("manual")||r.includes("automat")||r.includes("efficiency")?{category:"EFFICIENCY",diagnosis:"⏰ You have an efficiency problem.",insight:"Time = money. If you're spending 10 hours on manual work, that's 10 hours NOT spent on revenue. This compounds daily."}:r.includes("money")||r.includes("cost")||r.includes("expensive")||r.includes("price")||r.includes("margin")?{category:"ROI",diagnosis:"💰 You have an ROI problem.",insight:"Every dollar spent needs to return $3+. If your unit economics don't work, scaling just loses money faster."}:r.includes("trust")||r.includes("credibility")||r.includes("authority")||r.includes("brand")?{category:"AUTHORITY",diagnosis:"🛡️ You have an authority problem.",insight:"People buy from who they trust. Without credibility, you're fighting an uphill battle on every sale."}:r.includes("convert")||r.includes("close")||r.includes("sale")||r.includes("funnel")?{category:"CONVERSION",diagnosis:"📈 You have a conversion problem.",insight:"Traffic means nothing if it doesn't convert. This is pure math - and math can be fixed with the right frameworks."}:{category:"GROWTH BLOCKER",diagnosis:"🔥 You have a critical growth blocker.",insight:"This is costing you time, money, and momentum every single day. The longer it persists, the more opportunities you miss."}}function ff(t){const r=t.toLowerCase(),n={"saas|software|tech|app":{name:"SaaS/Tech",marketSize:"$700B+",growth:"18% YoY",opportunityScore:9,topPain:"Customer acquisition cost vs lifetime value",edgeInsight:"🚀 SaaS is BRUTAL. But if you solve a real pain better than competitors, users will PAY. Focus on retention over acquisition."},"ecommerce|retail|store|shop":{name:"E-commerce",marketSize:"$6T+",growth:"14% YoY",opportunityScore:8,topPain:"Standing out in crowded marketplace",edgeInsight:"🛒 D2C brands win on STORY + COMMUNITY. Amazon has logistics. You have personality. Use it."},"agency|marketing|consulting|services":{name:"Agency/Services",marketSize:"$500B+",growth:"11% YoY",opportunityScore:7,topPain:"Commoditization and price competition",edgeInsight:"💼 Services sell TIME. Position as OUTCOMES not hours. Productize your expertise into frameworks."},"coach|course|education|training":{name:"Education/Coaching",marketSize:"$350B+",growth:"20% YoY",opportunityScore:9,topPain:"Proving ROI and generating testimonials",edgeInsight:"🎓 People buy TRANSFORMATION. Show the before/after. Sell the result, not the process."}};for(const[a,s]of Object.entries(n))if(new RegExp(a).test(r))return s;return{name:"Your Industry",marketSize:"$$$B market",growth:"Growing rapidly",opportunityScore:8,topPain:"Differentiation",edgeInsight:"💡 Every industry has winners. The question is: what do THEY do that others don't?"}}function yf(t,r){const n=t.toLowerCase();let a="Unknown buying power",s="Unknown reachability",i="Unknown urgency";return n.includes("founder")||n.includes("ceo")||n.includes("owner")?(a="HIGH buying power - decision makers with budgets",i="HIGH urgency - their business depends on solving this"):n.includes("director")||n.includes("manager")||n.includes("head of")?(a="MEDIUM buying power - need approval but have influence",i="MEDIUM urgency - affects their performance metrics"):(a="Research their budget authority",i="Validate how critical this pain is"),n.includes("b2b")||n.includes("enterprise")||n.includes("business")?s="MEDIUM reach - LinkedIn, conferences, targeted ads":n.includes("consumer")||n.includes("individual")||n.includes("user")?s="HIGH reach - social, content, paid ads scale easily":s="Map their digital footprint",{buyingPower:a,reachability:s,urgency:i}}function bf(t){const r=t.toLowerCase();return r.includes("pre")||r.includes("0")||r.includes("idea")?{stage:"PRE-REVENUE",priority:"Get your first 10 paying customers",metrics:"Customer interviews, feedback quality, referral rate",timeline:"30-60 days to first sale",tactic:"Sell BEFORE you build. Pre-sell to validate demand. Manual outreach to 100 ideal customers."}:r.includes("5")||r.includes("10")?{stage:"$0-10K MRR",priority:"Double down on what's working",metrics:"CAC payback period, activation rate, churn",timeline:"90 days to $25K MRR",tactic:"Find your #1 acquisition channel. Go ALL IN. Ignore everything else. 10X that channel."}:r.includes("25")||r.includes("50")?{stage:"$10K-50K MRR",priority:"Systematize and scale",metrics:"LTV:CAC ratio, net retention, expansion revenue",timeline:"6-12 months to $100K",tactic:"Build systems. Hire strategically. Test channel #2. Retention > acquisition."}:{stage:"$50K+ MRR",priority:"Optimize unit economics and expand",metrics:"Gross margin, payback period, market penetration",timeline:"12-18 months to next milestone",tactic:"You're past PMF. Now it's about efficiency. Automate, delegate, multiply."}}function xf(t,r){const n=t.split(",").length;let a="",s="";return n>=3?(a=`You're in a CROWDED space with ${n}+ direct competitors. That means the market is PROVEN but differentiation is CRITICAL.`,s="1. Find the GAP they all miss<br>2. Serve a TIGHTER niche better<br>3. Bundle solutions differently<br>4. Compete on experience, not features"):n===2?(a='Two main competitors means you can be the THIRD option - the "Goldilocks" choice.',s='1. Study what users HATE about both<br>2. Position as "best of both worlds"<br>3. Use comparison marketing<br>4. Steal their unhappy customers'):(a="One competitor? That validates demand but gives you MASSIVE opportunity.",s="1. Copy what works, improve what doesn't<br>2. Target their ignored segments<br>3. Undercut on price OR go premium<br>4. Move faster than they can react"),{positioning:a,strategy:s}}function vf(t,r){return`<div class="strategic-brief">
<h3>🔥 STRATEGIC BRIEF: ${t.business||"Your Brand"}</h3>

<div class="brief-section">
<h4>📍 Current Position</h4>
<p><strong>Problem:</strong> "${t.problem}"<br>
<strong>Target:</strong> ${t.audience}<br>
<strong>Stage:</strong> ${t.stage}<br>
<strong>Competitors:</strong> ${t.competitors}</p>
</div>

<div class="brief-section">
<h4>⚡ Your Wedge</h4>
<p>"${r}"</p>
<p>This is your MOAT. Everything you build should amplify this.</p>
</div>

<div class="brief-section">
<h4>📈 4-Week Launch Roadmap</h4>
<p><strong>Week 1:</strong> Validate positioning with 20 customer interviews<br>
<strong>Week 2:</strong> Create proof content (case study, demo, testimonials)<br>
<strong>Week 3:</strong> Launch MVP to first 50 ideal customers<br>
<strong>Week 4:</strong> Iterate based on feedback, double down on what converts</p>
</div>

<div class="brief-section">
<h4>💰 Revenue Strategy</h4>
<p>Target: 10 customers @ $${sl(t.stage)}/mo = $${sl(t.stage)*10} MRR<br>
Channels: ${wf(t.audience)}<br>
Conversion: ${Ef(t.problem)}</p>
</div>

<p style="margin-top: 24px; padding: 16px; background: rgba(255,107,53,0.1); border-left: 4px solid #FF6B35; border-radius: 8px;">
<strong>Next Step:</strong> <a href="/contact" style="color: #FF6B35; text-decoration: underline; font-weight: 700;">Book a strategy call</a> and let's build this together. 🔥
</p>
</div>`}function sl(t){return t!=null&&t.includes("pre")?97:t!=null&&t.includes("5")||t!=null&&t.includes("10")?297:497}function wf(t){const r=(t==null?void 0:t.toLowerCase())||"";return r.includes("founder")||r.includes("b2b")?"LinkedIn, cold email, partnerships":r.includes("consumer")||r.includes("user")?"TikTok, Instagram, paid ads":"Content marketing, SEO, referrals"}function Ef(t){const r=(t==null?void 0:t.toLowerCase())||"";return r.includes("lead")?"Free audit/assessment → Paid strategy session":r.includes("time")?"ROI calculator → Demo → Trial":"Case study → Consultation → Proposal"}w.post("/api/spark-ai",async t=>{try{const{messages:r,userData:n}=await t.req.json(),a=r[r.length-1].content,s=r.filter(o=>o.role==="user").length;let i="";if(s===1){const o=gf(a);i=`"<em>${a}</em>"<br><br>${o.diagnosis}<br><br>🔍 This is a <strong>${o.category}</strong> problem. ${o.insight}<br><br><strong>What industry/business are you in?</strong> (This helps me benchmark you against competitors)`}else if(s===2){const o=ff(a);i=`Got it. <strong>${o.name}</strong> + "${n.problem}" = ${o.opportunityScore}/10 opportunity score.<br><br>📊 <strong>Market Intel:</strong><br>• Size: ${o.marketSize}<br>• Growth: ${o.growth}<br>• Main pain: ${o.topPain}<br><br>${o.edgeInsight}<br><br><strong>Who specifically feels "${n.problem}" the most?</strong> (Be surgical - "Series A SaaS founders" not "business owners")`}else if(s===3){const o=yf(a,n.problem||"");i=`Perfect. <strong>${a}</strong> struggling with "<em>${n.problem}</em>".<br><br>💰 ${o.buyingPower}<br>🎯 ${o.reachability}<br>⚡ ${o.urgency}<br><br><strong>What's your revenue stage?</strong><br>• Pre-revenue<br>• $0-10K MRR<br>• $10K-50K MRR<br>• $50K-100K MRR<br>• $100K+`}else if(s===4){const o=bf(a);i=`At <strong>${o.stage}</strong>, your ONLY focus: <strong>${o.priority}</strong>.<br><br>📈 Key metrics: ${o.metrics}<br>⏰ Timeline: ${o.timeline}<br><br>For "${n.problem}" → ${o.tactic}<br><br><strong>Who are your top 2-3 competitors?</strong>`}else if(s===5){const o=xf(a,n);i=`${o.positioning}<br><br>🥊 <strong>Battle Plan:</strong><br>${o.strategy}<br><br><strong>Final question: What makes YOU different?</strong> Why would ${n.audience} choose you over ${a.split(",")[0]}?`}else s===6?i=vf(n,a):i=`Let me dig deeper on that. ${a} - tell me more about how this affects your ${n.business||"business"}.`;return t.json({message:i,userData:n})}catch(r){return console.error("Spark AI Error:",r),t.json({error:"AI temporarily unavailable",details:r.message},500)}});w.route("/blog",Xs);w.get("/api/mobile-menu",t=>t.html(Wg));w.get("/api/footer",t=>t.html(_t));function vc(t){return btoa(t+"acromatico-salt-2026")}function wc(t){const r={userId:t.id,id:t.id,email:t.email,role:t.role,exp:Date.now()+6048e5};return btoa(JSON.stringify(r))}function te(t){try{const r=JSON.parse(atob(t));return r.exp<Date.now()?null:r}catch{return null}}function Ec(t,r){const n=te(t);return!n||n.role!==r?null:n}const ce=async(t,r)=>{var s;let n=(s=t.req.header("Authorization"))==null?void 0:s.replace("Bearer ","");if(!n){const o=(t.req.header("Cookie")||"").match(/admin_token=([^;]+)/);n=o?o[1]:null}if(!n)return t.json({success:!1,error:"No token provided"},401);const a=Ec(n,"admin");if(!a)return t.json({success:!1,error:"Unauthorized: Admin role required"},403);t.set("user",a),await r()},Gn=async(t,r)=>{const n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const a=n.substring(7),s=Ec(a,"parent");if(!s)return t.json({success:!1,error:"Unauthorized: Parent role required"},403);t.set("user",s),await r()};w.post("/api/payments/create-checkout-session",async t=>{var r;try{const{STRIPE_SECRET_KEY:n,STRIPE_PUBLISHABLE_KEY:a}=t.env;if(!n)return t.json({error:"Stripe not configured"},500);const s=await t.req.json(),{priceId:i,amount:o,productName:l,quantity:c=1,paymentMode:u,successUrl:d,cancelUrl:h,customerEmail:g,metadata:b}=s,m=u||"payment",y={};if(i)y["line_items[0][price]"]=i,y["line_items[0][quantity]"]=c.toString();else if(o&&l)y["line_items[0][price_data][currency]"]="usd",y["line_items[0][price_data][product_data][name]"]=l,y["line_items[0][price_data][unit_amount]"]=Math.round(o*100).toString(),m==="subscription"&&(y["line_items[0][price_data][recurring][interval]"]="month",y["line_items[0][price_data][recurring][interval_count]"]="1"),y["line_items[0][quantity]"]="1";else return t.json({error:"Either priceId or amount+productName required"},400);const f=b?Object.keys(b).reduce((P,_)=>{var C;return{...P,[`metadata[${_}]`]:((C=b[_])==null?void 0:C.toString())||""}},{}):{},v=await fetch("https://api.stripe.com/v1/checkout/sessions",{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({mode:m,...y,success_url:d||`${t.req.url.replace("/api/payments/create-checkout-session","")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,cancel_url:h||`${t.req.url.replace("/api/payments/create-checkout-session","")}/payment-cancel`,...g&&{customer_email:g},...f})}),S=await v.json();return v.ok?t.json({sessionId:S.id,url:S.url,publishableKey:a}):(console.error("Stripe API error:",S),t.json({error:((r=S.error)==null?void 0:r.message)||"Failed to create checkout session"},500))}catch(n){return console.error("Payment creation error:",n),t.json({error:n.message},500)}});w.post("/api/payments/webhook",async t=>{var r,n;try{const{DB_EDUCATION:a,STRIPE_WEBHOOK_SECRET:s}=t.env;if(!s)return t.json({error:"Webhook secret not configured"},500);const i=t.req.header("stripe-signature"),o=await t.req.text(),l=(r=i==null?void 0:i.split(",").find(d=>d.startsWith("t=")))==null?void 0:r.split("=")[1],c=(n=i==null?void 0:i.split(",").find(d=>d.startsWith("v1=")))==null?void 0:n.split("=")[1],u=JSON.parse(o);switch(console.log("Stripe webhook received:",u.type),u.type){case"checkout.session.completed":const d=u.data.object;console.log("Payment successful:",d.id),await a.prepare(`
          INSERT INTO payments (id, session_id, customer_email, amount, status, created_at)
          VALUES (?, ?, ?, ?, 'succeeded', datetime('now'))
        `).bind(`pay-${Date.now()}`,d.id,d.customer_email,d.amount_total).run();break;case"payment_intent.succeeded":console.log("PaymentIntent succeeded:",u.data.object.id);break;case"payment_intent.payment_failed":console.log("Payment failed:",u.data.object.id);break;case"customer.subscription.created":case"customer.subscription.updated":console.log("Subscription updated:",u.data.object.id);break;case"customer.subscription.deleted":console.log("Subscription cancelled:",u.data.object.id);break;default:console.log("Unhandled event type:",u.type)}return t.json({received:!0})}catch(a){return console.error("Webhook error:",a),t.json({error:a.message},500)}});w.get("/payment-success",t=>{const r=t.req.query("session_id");return t.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Successful | Acromatico</title>
      <script src="https://cdn.tailwindcss.com"><\/script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Inter', sans-serif; background: #0f172a; }
        .checkmark {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: block;
          stroke-width: 3;
          stroke: #4ade80;
          stroke-miterlimit: 10;
          box-shadow: inset 0px 0px 0px #4ade80;
          animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
        }
        .checkmark__circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 3;
          stroke-miterlimit: 10;
          stroke: #4ade80;
          fill: none;
          animation: stroke .6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .checkmark__check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke .3s cubic-bezier(0.65, 0, 0.45, 1) .8s forwards;
        }
        @keyframes stroke {
          100% { stroke-dashoffset: 0; }
        }
        @keyframes scale {
          0%, 100% { transform: none; }
          50% { transform: scale3d(1.1, 1.1, 1); }
        }
        @keyframes fill {
          100% { box-shadow: inset 0px 0px 0px 40px #4ade80; }
        }
      </style>
    </head>
    <body class="flex items-center justify-center min-h-screen">
      <div class="bg-slate-800 rounded-2xl p-12 text-center max-w-md border border-slate-700">
        <svg class="checkmark mx-auto mb-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
        <h1 class="text-3xl font-bold text-white mb-4">Payment Successful!</h1>
        <p class="text-slate-300 mb-6">
          Thank you for your purchase. You'll receive a confirmation email shortly.
        </p>
        <div class="text-sm text-slate-400 mb-8">
          Session ID: <span class="font-mono text-xs">${r}</span>
        </div>
        <a href="/" class="inline-block bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-700 transition-all">
          Return Home
        </a>
      </div>
    </body>
    </html>
  `)});w.get("/payment-cancel",t=>t.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Cancelled | Acromatico</title>
      <script src="https://cdn.tailwindcss.com"><\/script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Inter', sans-serif; background: #0f172a; }
      </style>
    </head>
    <body class="flex items-center justify-center min-h-screen">
      <div class="bg-slate-800 rounded-2xl p-12 text-center max-w-md border border-slate-700">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
          <svg class="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-white mb-4">Payment Cancelled</h1>
        <p class="text-slate-300 mb-8">
          Your payment was cancelled. No charges were made to your account.
        </p>
        <div class="flex gap-4">
          <a href="/" class="flex-1 bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-all">
            Return Home
          </a>
          <button onclick="history.back()" class="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-700 transition-all">
            Try Again
          </button>
        </div>
      </div>
    </body>
    </html>
  `));w.post("/api/auth/signup",async t=>{try{const{DB_EDUCATION:r}=t.env;try{await r.prepare(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          role TEXT CHECK(role IN ('student', 'parent', 'client', 'instructor', 'admin')) NOT NULL,
          first_name TEXT,
          last_name TEXT,
          stripe_customer_id TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `).run(),await r.prepare("CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)").run()}catch(b){console.log("Database init:",b)}const n=await t.req.json(),{firstName:a,lastName:s,email:i,password:o,role:l,age:c}=n;if(!a||!s||!i||!o||!l)return t.json({message:"All fields are required"},400);if(await r.prepare("SELECT id FROM users WHERE email = ?").bind(i).first())return t.json({message:"Email already registered"},400);const d=vc(o),g=(await r.prepare(`
      INSERT INTO users (email, password_hash, role, first_name, last_name)
      VALUES (?, ?, ?, ?, ?)
    `).bind(i,d,l,a,s).run()).meta.last_row_id;return t.json({message:"Account created successfully",userId:g},201)}catch(r){return console.error("Signup error:",r),t.json({message:"Signup failed: "+r.message},500)}});w.post("/api/auth/login",async t=>{try{const{DB_EDUCATION:r}=t.env,n=await t.req.json(),{email:a,password:s}=n;if(!a||!s)return t.json({message:"Email and password required"},400);const i=await r.prepare(`
      SELECT id, email, password_hash, role, first_name, last_name
      FROM users
      WHERE email = ?
    `).bind(a).first();if(!i)return t.json({message:"Invalid email or password"},401);const o=vc(s);if(i.password_hash!==o)return t.json({message:"Invalid email or password"},401);const l=wc(i);return t.json({message:"Login successful",token:l,user:{id:i.id,email:i.email,role:i.role,firstName:i.first_name,lastName:i.last_name}})}catch(r){return console.error("Login error:",r),t.json({message:"Login failed: "+r.message},500)}});w.get("/api/auth/me",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({message:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s)return t.json({message:"Invalid or expired token"},401);const i=await r.prepare(`
      SELECT id, email, role, first_name, last_name, created_at
      FROM users
      WHERE id = ?
    `).bind(s.id).first();return i?t.json({user:i}):t.json({message:"User not found"},404)}catch(r){return console.error("Get user error:",r),t.json({message:"Failed to get user: "+r.message},500)}});w.post("/api/auth/reset-password",async t=>{try{const{email:r}=await t.req.json();if(!r)return t.json({message:"Email is required"},400);const{DB_EDUCATION:n}=t.env;return await n.prepare("SELECT id, email FROM users WHERE email = ?").bind(r).first()?(console.log(`Password reset requested for: ${r}`),t.json({message:"If an account with that email exists, a reset link has been sent."})):t.json({message:"If an account with that email exists, a reset link has been sent."})}catch(r){return console.error("Reset password error:",r),t.json({message:"Failed to process request: "+r.message},500)}});w.post("/api/enrollments/create",async t=>{try{const r=await t.req.json(),{parentEmail:n,studentsCount:a,billingType:s,monthlyTotal:i,signatureMethod:o,signatureData:l,stripeSessionId:c,stripeCustomerId:u,stripeSubscriptionId:d,ipAddress:h}=r,g=crypto.randomUUID(),b=new Date().toISOString();return console.log("New enrollment:",{enrollmentId:g,parentEmail:n,studentsCount:a,billingType:s,monthlyTotal:i,stripeSessionId:c,stripeCustomerId:u,timestamp:b}),t.json({success:!0,enrollmentId:g,message:"Enrollment submitted successfully! We will send you a confirmation email within 24 hours at "+n})}catch(r){return console.error("Create enrollment error:",r),t.json({error:"Failed to create enrollment: "+r.message},500)}});w.get("/api/enrollments/by-email/:email",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("email"),a=await r.prepare("SELECT id FROM users WHERE email = ?").bind(n).first();if(!a)return t.json({enrollments:[]});const s=await r.prepare(`
      SELECT 
        e.*,
        c.title as course_title,
        c.description as course_description
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.student_id = ?
      ORDER BY e.enrolled_at DESC
    `).bind(a.id).all();return t.json({enrollments:s.results||[]})}catch(r){return console.error("Get enrollments error:",r),t.json({error:"Failed to fetch enrollments: "+r.message},500)}});w.get("/api/enrollments/:id/agreement",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("id"),a=await r.prepare(`
      SELECT 
        e.id,
        e.agreement_signed,
        e.agreement_version,
        e.signature_method,
        e.signature_data,
        e.signature_timestamp,
        e.signature_ip_address,
        e.billing_type,
        e.students_count,
        e.monthly_total,
        e.enrolled_at,
        u.email as parent_email,
        u.first_name as parent_first_name,
        u.last_name as parent_last_name,
        c.title as course_title
      FROM enrollments e
      JOIN users u ON e.student_id = u.id
      JOIN courses c ON e.course_id = c.id
      WHERE e.id = ?
    `).bind(n).first();return a?t.json({agreement:a}):t.json({error:"Enrollment not found"},404)}catch(r){return console.error("Get agreement error:",r),t.json({error:"Failed to fetch agreement: "+r.message},500)}});w.post("/api/admin/curriculum/seed",ce,async t=>{try{const{DB_EDUCATION:r}=t.env,{seedCurriculum:n}=await Promise.resolve().then(()=>Pf),{seedAdminUsers:a}=await Promise.resolve().then(()=>Cf),s=await a(r),i=await n(r);return t.json({success:!0,message:"✅ Database seeded successfully! Curriculum + Admin users created.",data:{adminUsers:s.users,modules:i.modules,weeks:i.weeks,total:s.users+i.modules+i.weeks}})}catch(r){return console.error("Seed error:",r),t.json({success:!1,message:"Failed to seed database: "+r.message},500)}});w.get("/api/admin/curriculum/modules",ce,async t=>{try{const{DB_EDUCATION:r}=t.env,{getAllModules:n}=await Promise.resolve().then(()=>ir),a=await n(r);return t.json({success:!0,data:a})}catch(r){return console.error("Get modules error:",r),t.json({success:!1,message:r.message},500)}});w.get("/api/admin/curriculum/module/:id",ce,async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("id"),{getModuleDetail:a}=await Promise.resolve().then(()=>ir),s=await a(r,n);return t.json({success:!0,data:s})}catch(r){return console.error("Get module detail error:",r),t.json({success:!1,message:r.message},500)}});w.post("/api/admin/curriculum/lesson",ce,async t=>{try{const{DB_EDUCATION:r}=t.env,n=await t.req.json(),{createLessonPlaceholder:a}=await Promise.resolve().then(()=>ir),s=await a(r,n);return t.json({success:!0,message:"Lesson placeholder created",lessonId:s})}catch(r){return console.error("Create lesson error:",r),t.json({success:!1,message:r.message},500)}});w.put("/api/admin/curriculum/lesson/:id",ce,async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("id"),a=await t.req.json(),{updateLesson:s}=await Promise.resolve().then(()=>ir);return await s(r,n,a),t.json({success:!0,message:"Lesson updated successfully"})}catch(r){return console.error("Update lesson error:",r),t.json({success:!1,message:r.message},500)}});w.delete("/api/admin/curriculum/lesson/:id",ce,async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("id"),{deleteLesson:a}=await Promise.resolve().then(()=>ir);return await a(r,n),t.json({success:!0,message:"Lesson deleted successfully"})}catch(r){return console.error("Delete lesson error:",r),t.json({success:!1,message:r.message},500)}});w.get("/api/student/progress/:lessonId",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("lessonId"),a=t.req.header("Authorization");if(!a||!a.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const s=a.substring(7),i=te(s);if(!i)return t.json({success:!1,error:"Invalid token"},401);const o=i.userId||i.id,l=await r.prepare(`
      SELECT * FROM curriculum_progress 
      WHERE user_id = ? AND lesson_id = ?
    `).bind(o,n).first();return t.json({success:!0,data:l||null})}catch(r){return console.error("Get progress error:",r),t.json({success:!1,error:r.message},500)}});w.post("/api/student/progress",async t=>{var r;try{const{DB_EDUCATION:n}=t.env,a=t.req.header("Authorization");if(!a||!a.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const s=a.substring(7),i=te(s);if(!i)return t.json({success:!1,error:"Invalid token"},401);const o=i.userId||i.id,l=await t.req.json(),{lesson_id:c,module_id:u,week_id:d,watch_time_seconds:h,progress_percent:g,status:b}=l;if(await n.prepare(`
      SELECT id FROM curriculum_progress 
      WHERE user_id = ? AND lesson_id = ?
    `).bind(o,c).first())await n.prepare(`
        UPDATE curriculum_progress 
        SET watch_time_seconds = ?, 
            progress_percent = ?, 
            status = ?,
            completed_at = CASE WHEN ? = 'completed' THEN datetime('now') ELSE completed_at END
        WHERE user_id = ? AND lesson_id = ?
      `).bind(h,g,b||"in_progress",b||"in_progress",o,c).run();else{const y=`prog-${Date.now()}-${Math.random().toString(36).substring(2,9)}`;await n.prepare(`
        INSERT INTO curriculum_progress 
        (id, user_id, lesson_id, module_id, week_id, watch_time_seconds, progress_percent, status, completed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, CASE WHEN ? = 'completed' THEN datetime('now') ELSE NULL END)
      `).bind(y,o,c,u,d,h,g,b||"in_progress",b||"in_progress").run()}if(b==="completed"){const{results:y}=await n.prepare(`
        SELECT COUNT(*) as count FROM curriculum_progress WHERE user_id = ? AND status = 'completed'
      `).bind(o).all(),f=((r=y[0])==null?void 0:r.count)||0,v=[{id:"ach-first-lesson",count:1},{id:"ach-5-lessons",count:5},{id:"ach-10-lessons",count:10},{id:"ach-25-lessons",count:25},{id:"ach-50-lessons",count:50}];for(const S of v)if(f===S.count){const{results:P}=await n.prepare(`
            SELECT id FROM user_achievements WHERE user_id = ? AND achievement_id = ?
          `).bind(o,S.id).all();if(P.length===0){await n.prepare(`
              INSERT INTO user_achievements (user_id, achievement_id)
              VALUES (?, ?)
            `).bind(o,S.id).run();const{results:_}=await n.prepare(`
              SELECT xp_reward FROM achievements WHERE id = ?
            `).bind(S.id).all();_.length>0&&await n.prepare(`
                INSERT INTO user_xp (user_id, total_xp, current_level, xp_to_next_level, rank_title)
                VALUES (?, ?, 1, 100, 'Beginner Creator')
                ON CONFLICT(user_id) DO UPDATE SET
                  total_xp = total_xp + ?,
                  updated_at = CURRENT_TIMESTAMP
              `).bind(o,_[0].xp_reward,_[0].xp_reward).run()}}}return t.json({success:!0,message:"Progress saved successfully"})}catch(n){return console.error("Save progress error:",n),t.json({success:!1,error:n.message},500)}});w.get("/api/student/progress/all",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s)return t.json({success:!1,error:"Invalid token"},401);const i=s.userId||s.id,{results:o}=await r.prepare(`
      SELECT * FROM curriculum_progress 
      WHERE user_id = ?
      ORDER BY created_at DESC
    `).bind(i).all();return t.json({success:!0,data:o})}catch(r){return console.error("Get all progress error:",r),t.json({success:!1,error:r.message},500)}});w.get("/api/student/submissions/:moduleId",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("moduleId"),a=t.req.header("Authorization");if(!a||!a.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const s=a.substring(7),i=te(s);if(!i)return t.json({success:!1,error:"Invalid token"},401);const o=i.userId||i.id,{results:l}=await r.prepare(`
      SELECT * FROM curriculum_submissions 
      WHERE user_id = ? AND module_id = ?
      ORDER BY submitted_at DESC
    `).bind(o,n).all();return t.json({success:!0,data:l})}catch(r){return console.error("Get submissions error:",r),t.json({success:!1,error:r.message},500)}});w.post("/api/student/submissions",async t=>{var r;try{const{DB_EDUCATION:n}=t.env,a=t.req.header("Authorization");if(!a||!a.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const s=a.substring(7),i=te(s);if(!i)return t.json({success:!1,error:"Invalid token"},401);const o=i.userId||i.id,l=await t.req.json(),{module_id:c,project_title:u,caption:d,media_url:h,media_type:g}=l,b=`sub-${Date.now()}-${Math.random().toString(36).substring(2,9)}`;await n.prepare(`
      INSERT INTO curriculum_submissions 
      (id, user_id, module_id, project_title, caption, media_url, media_type)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(b,o,c,u,d||"",h,g||"image").run();const{results:m}=await n.prepare(`
      SELECT COUNT(*) as count FROM curriculum_submissions WHERE user_id = ?
    `).bind(o).all(),y=((r=m[0])==null?void 0:r.count)||0,f=[{id:"ach-first-project",count:1},{id:"ach-5-projects",count:5},{id:"ach-10-projects",count:10}];for(const v of f)if(y===v.count){const{results:S}=await n.prepare(`
          SELECT id FROM user_achievements WHERE user_id = ? AND achievement_id = ?
        `).bind(o,v.id).all();if(S.length===0){await n.prepare(`
            INSERT INTO user_achievements (user_id, achievement_id)
            VALUES (?, ?)
          `).bind(o,v.id).run();const{results:P}=await n.prepare(`
            SELECT xp_reward FROM achievements WHERE id = ?
          `).bind(v.id).all();P.length>0&&await n.prepare(`
              INSERT INTO user_xp (user_id, total_xp, current_level, xp_to_next_level, rank_title)
              VALUES (?, ?, 1, 100, 'Beginner Creator')
              ON CONFLICT(user_id) DO UPDATE SET
                total_xp = total_xp + ?,
                updated_at = CURRENT_TIMESTAMP
            `).bind(o,P[0].xp_reward,P[0].xp_reward).run()}}return t.json({success:!0,message:"Submission created successfully",data:{id:b}})}catch(n){return console.error("Create submission error:",n),t.json({success:!1,error:n.message},500)}});w.put("/api/student/submissions/:id",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("id"),a=t.req.header("Authorization");if(!a||!a.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const s=a.substring(7),i=te(s);if(!i)return t.json({success:!1,error:"Invalid token"},401);const o=i.userId||i.id,l=await t.req.json(),{project_title:c,caption:u}=l;return await r.prepare(`
      UPDATE curriculum_submissions 
      SET project_title = ?, caption = ?
      WHERE id = ? AND user_id = ?
    `).bind(c,u,n,o).run(),t.json({success:!0,message:"Submission updated successfully"})}catch(r){return console.error("Update submission error:",r),t.json({success:!1,error:r.message},500)}});w.delete("/api/student/submissions/:id",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("id"),a=t.req.header("Authorization");if(!a||!a.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const s=a.substring(7),i=te(s);if(!i)return t.json({success:!1,error:"Invalid token"},401);const o=i.userId||i.id;return await r.prepare(`
      DELETE FROM curriculum_submissions 
      WHERE id = ? AND user_id = ?
    `).bind(n,o).run(),t.json({success:!0,message:"Submission deleted successfully"})}catch(r){return console.error("Delete submission error:",r),t.json({success:!1,error:r.message},500)}});w.get("/api/parent/children",Gn,async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.get("user"),a=n.userId||n.id,{results:s}=await r.prepare(`
      SELECT s.*, 
        COUNT(DISTINCT cp.id) as lessons_completed,
        COALESCE(AVG(cp.progress_percent), 0) as overall_progress
      FROM students s
      LEFT JOIN curriculum_progress cp ON cp.user_id = s.id AND cp.status = 'completed'
      WHERE s.parent_id = ?
      GROUP BY s.id
      ORDER BY s.created_at DESC
    `).bind(a).all();return t.json({success:!0,data:s})}catch(r){return console.error("Get children error:",r),t.json({success:!1,error:r.message},500)}});w.post("/api/parent/child",Gn,async t=>{try{const{DB_EDUCATION:r}=t.env,n=await t.req.json(),{firstName:a,lastName:s,age:i,grade:o}=n;if(!a||!s)return t.json({success:!1,error:"First name and last name are required"},400);const l=t.get("user"),c=l.userId||l.id,u=`stu-${Date.now()}-${Math.random().toString(36).substring(2,9)}`;return await r.prepare(`
      INSERT INTO students (id, parent_id, first_name, last_name, age, grade, enrollment_status)
      VALUES (?, ?, ?, ?, ?, ?, 'active')
    `).bind(u,c,a,s,i||null,o||null).run(),t.json({success:!0,data:{id:u,firstName:a,lastName:s,age:i,grade:o}})}catch(r){return console.error("Add child error:",r),t.json({success:!1,error:r.message},500)}});w.put("/api/parent/child/:id",Gn,async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("id"),a=await t.req.json(),{firstName:s,lastName:i,age:o,grade:l,enrollmentStatus:c}=a,u=t.get("user"),d=u.userId||u.id,{results:h}=await r.prepare(`
      SELECT id FROM students WHERE id = ? AND parent_id = ?
    `).bind(n,d).all();return h.length===0?t.json({success:!1,error:"Child not found or access denied"},404):(await r.prepare(`
      UPDATE students 
      SET first_name = ?, last_name = ?, age = ?, grade = ?, enrollment_status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND parent_id = ?
    `).bind(s,i,o,l,c,n,d).run(),t.json({success:!0,message:"Child updated successfully"}))}catch(r){return console.error("Update child error:",r),t.json({success:!1,error:r.message},500)}});w.get("/api/parent/child/:id/progress",Gn,async t=>{var r;try{const{DB_EDUCATION:n}=t.env,a=t.req.param("id"),s=t.get("user"),i=s.userId||s.id,{results:o}=await n.prepare(`
      SELECT * FROM students WHERE id = ? AND parent_id = ?
    `).bind(a,i).all();if(o.length===0)return t.json({success:!1,error:"Child not found or access denied"},404);const{results:l}=await n.prepare(`
      SELECT 
        cp.*,
        cm.month_name,
        cm.title as module_title,
        cw.title as week_title
      FROM curriculum_progress cp
      JOIN curriculum_modules cm ON cp.module_id = cm.id
      LEFT JOIN curriculum_weeks cw ON cp.week_id = cw.id
      WHERE cp.user_id = ?
      ORDER BY cp.created_at DESC
    `).bind(a).all(),{results:c}=await n.prepare(`
      SELECT COUNT(*) as count FROM curriculum_submissions WHERE user_id = ?
    `).bind(a).all();return t.json({success:!0,data:{child:o[0],progress:l,submissions_count:((r=c[0])==null?void 0:r.count)||0}})}catch(n){return console.error("Get child progress error:",n),t.json({success:!1,error:n.message},500)}});w.get("/api/student/achievements",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s)return t.json({success:!1,error:"Invalid token"},401);const i=s.userId||s.id,{results:o}=await r.prepare(`
      SELECT 
        ua.*,
        a.name,
        a.description,
        a.category,
        a.icon,
        a.xp_reward
      FROM user_achievements ua
      JOIN achievements a ON ua.achievement_id = a.id
      WHERE ua.user_id = ?
      ORDER BY ua.earned_at DESC
    `).bind(i).all(),{results:l}=await r.prepare(`
      SELECT * FROM achievements WHERE is_active = 1 ORDER BY sort_order
    `).all();return t.json({success:!0,data:{earned:o,available:l,total_earned:o.length,total_available:l.length}})}catch(r){return console.error("Get achievements error:",r),t.json({success:!1,error:r.message},500)}});w.get("/api/student/xp",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s)return t.json({success:!1,error:"Invalid token"},401);const i=s.userId||s.id;let{results:o}=await r.prepare(`
      SELECT * FROM user_xp WHERE user_id = ?
    `).bind(i).all();return o.length===0&&(await r.prepare(`
        INSERT INTO user_xp (user_id, total_xp, current_level, xp_to_next_level, rank_title)
        VALUES (?, 0, 1, 100, 'Beginner Creator')
      `).bind(i).run(),o=[{user_id:i,total_xp:0,current_level:1,xp_to_next_level:100,rank_title:"Beginner Creator"}]),t.json({success:!0,data:o[0]})}catch(r){return console.error("Get XP error:",r),t.json({success:!1,error:r.message},500)}});w.get("/api/student/streak",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s)return t.json({success:!1,error:"Invalid token"},401);const i=s.userId||s.id;let{results:o}=await r.prepare(`
      SELECT * FROM streak_stats WHERE user_id = ?
    `).bind(i).all();return o.length===0&&(await r.prepare(`
        INSERT INTO streak_stats (user_id, current_streak, longest_streak, last_activity_date)
        VALUES (?, 0, 0, NULL)
      `).bind(i).run(),o=[{user_id:i,current_streak:0,longest_streak:0,last_activity_date:null}]),t.json({success:!0,data:o[0]})}catch(r){return console.error("Get streak error:",r),t.json({success:!1,error:r.message},500)}});w.post("/api/student/track-activity",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s)return t.json({success:!1,error:"Invalid token"},401);const i=s.userId||s.id,o=new Date().toISOString().split("T")[0];await r.prepare(`
      INSERT INTO daily_streaks (user_id, activity_date, lessons_completed, time_spent_minutes)
      VALUES (?, ?, 1, 0)
      ON CONFLICT(user_id, activity_date) DO UPDATE SET
        lessons_completed = lessons_completed + 1,
        time_spent_minutes = time_spent_minutes + 1
    `).bind(i,o).run();const{results:l}=await r.prepare(`
      SELECT activity_date FROM daily_streaks 
      WHERE user_id = ?
      ORDER BY activity_date DESC
      LIMIT 100
    `).bind(i).all();let c=0;if(l.length>0){const d=l.map(h=>h.activity_date).sort().reverse();c=1;for(let h=1;h<d.length;h++){const g=new Date(d[h-1]),b=new Date(d[h]);if(Math.floor((g-b)/(1e3*60*60*24))===1)c++;else break}}await r.prepare(`
      INSERT INTO streak_stats (user_id, current_streak, longest_streak, last_activity_date)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET
        current_streak = ?,
        longest_streak = MAX(longest_streak, ?),
        last_activity_date = ?,
        updated_at = CURRENT_TIMESTAMP
    `).bind(i,c,c,o,c,c,o).run();const u=[{id:"ach-streak-3",days:3},{id:"ach-streak-7",days:7},{id:"ach-streak-14",days:14},{id:"ach-streak-30",days:30}];for(const d of u)if(c>=d.days){const{results:h}=await r.prepare(`
          SELECT id FROM user_achievements WHERE user_id = ? AND achievement_id = ?
        `).bind(i,d.id).all();if(h.length===0){await r.prepare(`
            INSERT INTO user_achievements (user_id, achievement_id)
            VALUES (?, ?)
          `).bind(i,d.id).run();const{results:g}=await r.prepare(`
            SELECT xp_reward FROM achievements WHERE id = ?
          `).bind(d.id).all();g.length>0&&await r.prepare(`
              UPDATE user_xp SET 
                total_xp = total_xp + ?,
                updated_at = CURRENT_TIMESTAMP
              WHERE user_id = ?
            `).bind(g[0].xp_reward,i).run()}}return t.json({success:!0,data:{currentStreak:c,today:o}})}catch(r){return console.error("Track activity error:",r),t.json({success:!1,error:r.message},500)}});w.post("/api/student/award-achievement",async t=>{try{const{DB_EDUCATION:r}=t.env,n=await t.req.json(),{achievementId:a}=n,s=t.req.header("Authorization");if(!s||!s.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const i=s.substring(7),o=te(i);if(!o)return t.json({success:!1,error:"Invalid token"},401);const l=o.userId||o.id,{results:c}=await r.prepare(`
      SELECT id FROM user_achievements WHERE user_id = ? AND achievement_id = ?
    `).bind(l,a).all();if(c.length>0)return t.json({success:!1,error:"Achievement already earned"});const{results:u}=await r.prepare(`
      SELECT * FROM achievements WHERE id = ?
    `).bind(a).all();if(u.length===0)return t.json({success:!1,error:"Achievement not found"},404);await r.prepare(`
      INSERT INTO user_achievements (user_id, achievement_id)
      VALUES (?, ?)
    `).bind(l,a).run();const d=u[0].xp_reward;await r.prepare(`
      INSERT INTO user_xp (user_id, total_xp, current_level, xp_to_next_level, rank_title)
      VALUES (?, ?, 1, 100, 'Beginner Creator')
      ON CONFLICT(user_id) DO UPDATE SET
        total_xp = total_xp + ?,
        updated_at = CURRENT_TIMESTAMP
    `).bind(l,d,d).run();const{results:h}=await r.prepare(`
      SELECT * FROM user_xp WHERE user_id = ?
    `).bind(l).all(),g=h[0],{newLevel:b,newRank:m,xpToNext:y}=Tf(g.total_xp);return b>g.current_level&&await r.prepare(`
        UPDATE user_xp SET
          current_level = ?,
          rank_title = ?,
          xp_to_next_level = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `).bind(b,m,y,l).run(),t.json({success:!0,data:{achievement:u[0],xp_earned:d,level_up:b>g.current_level,new_level:b}})}catch(r){return console.error("Award achievement error:",r),t.json({success:!1,error:r.message},500)}});function Tf(t){const r=[{level:1,xp:0,rank:"Beginner Creator",next:100},{level:2,xp:100,rank:"Explorer",next:200},{level:3,xp:300,rank:"Adventurer",next:300},{level:4,xp:600,rank:"Storyteller",next:400},{level:5,xp:1e3,rank:"Filmmaker",next:500},{level:6,xp:1500,rank:"Creative Pro",next:700},{level:7,xp:2200,rank:"Visual Master",next:800},{level:8,xp:3e3,rank:"Legend",next:1e3}];for(let n=r.length-1;n>=0;n--)if(t>=r[n].xp)return{newLevel:r[n].level,newRank:r[n].rank,xpToNext:n<r.length-1?r[n+1].xp-t:0};return{newLevel:1,newRank:"Beginner Creator",xpToNext:100-t}}w.get("/api/curriculum/download-pdf",async t=>{try{const{DB_EDUCATION:r}=t.env,{results:n}=await r.prepare(`
      SELECT * FROM curriculum_modules ORDER BY sort_order
    `).all();let a=`
ACROMATICO CREATOR ACADEMY
12-Month Visual Storytelling Curriculum
© 2026 Acromatico • Ages 7-14
═══════════════════════════════════════════════════════════

📚 CURRICULUM OVERVIEW

Transform your child into a creative storyteller with our comprehensive 
12-month journey covering photography, videography, and visual storytelling.

═══════════════════════════════════════════════════════════

📅 COMPLETE CURRICULUM BREAKDOWN

`;return n.forEach((s,i)=>{a+=`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${s.emoji} MONTH ${s.month_number}: ${s.month_name.toUpperCase()}
${s.title}
${s.subtitle}

Quarter: Q${s.quarter}
Theme Color: ${s.theme_color}

📖 Description:
${s.description}

🗺️ Adventure Project: ${s.adventure_title}
${s.adventure_desc}

`}),a+=`
═══════════════════════════════════════════════════════════

✨ WHAT'S INCLUDED

✓ 120+ HD Video Lessons
✓ 48 Weekly Learning Cycles
✓ 12 Monthly Adventure Projects
✓ 15 Achievement Badges to Earn
✓ XP & Level Progression System
✓ Parent Progress Dashboard
✓ Project Submission Portal
✓ Lifetime Access to Content

═══════════════════════════════════════════════════════════

💰 PRICING

Full Year Access: $297/year
That's just $24.75/month - less than a single art class!

✓ 30-Day Money-Back Guarantee
✓ Covers Entire Family (Multiple Children)
✓ Self-Paced Learning
✓ Professional Creator Instruction

═══════════════════════════════════════════════════════════

🚀 GET STARTED TODAY

Visit: https://acromatico.com/pricing
Email: hello@acromatico.com

Transform your child's creativity into professional skills!

═══════════════════════════════════════════════════════════
`,new Response(a,{headers:{"Content-Type":"text/plain; charset=utf-8","Content-Disposition":'attachment; filename="Acromatico-Creator-Academy-Curriculum-2026.txt"',"Cache-Control":"public, max-age=3600"}})}catch(r){return console.error("PDF generation error:",r),t.json({success:!1,error:r.message},500)}});w.get("/api/admin/curriculum/stats",ce,async t=>{try{const{DB_EDUCATION:r}=t.env,{getCurriculumStats:n}=await Promise.resolve().then(()=>ir),a=await n(r);return t.json({success:!0,data:a})}catch(r){return console.error("Get stats error:",r),t.json({success:!1,message:r.message},500)}});w.get("/api/dashboard/student",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({message:"No token provided"},401);const a=n.substring(7);return te(a)?t.json({stats:{coursesEnrolled:0,lessonsCompleted:0,achievementsEarned:0,dayStreak:0},courses:[],achievements:[]}):t.json({message:"Invalid or expired token"},401)}catch(r){return console.error("Dashboard error:",r),t.json({message:"Failed to load dashboard: "+r.message},500)}});w.get("/api/dashboard/parent",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({message:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s)return t.json({message:"Invalid or expired token"},401);const i=s.id,o=await r.prepare(`
      SELECT 
        s.id,
        s.first_name,
        s.last_name,
        s.age,
        s.grade,
        s.enrollment_status,
        0 as courses_enrolled,
        0 as lessons_completed,
        0 as badges_earned
      FROM students s
      WHERE s.parent_id = ?
      ORDER BY s.created_at DESC
    `).bind(i).all(),l=await r.prepare(`
      SELECT 
        s.id,
        s.status,
        s.monthly_price,
        s.next_billing_date
      FROM subscriptions s
      WHERE s.parent_id = ? AND s.status = 'active'
      ORDER BY s.created_at DESC
      LIMIT 1
    `).bind(i).first();return t.json({students:(o==null?void 0:o.results)||[],subscription:l||null})}catch(r){return console.error("Parent dashboard error:",r),t.json({message:"Failed to load dashboard: "+r.message},500)}});w.get("/api/dashboard/admin",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({message:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const i=await r.prepare('SELECT COUNT(*) as count FROM students WHERE enrollment_status = "active"').first(),o=await r.prepare("SELECT COUNT(*) as count FROM courses").first(),l=await r.prepare(`
      SELECT SUM(monthly_price) as total
      FROM subscriptions
      WHERE status = 'active'
    `).first(),c=await r.prepare(`
      SELECT 
        s.id,
        s.first_name || ' ' || s.last_name as name,
        u.email,
        s.age,
        s.grade,
        s.enrollment_status as status,
        0 as courses,
        0 as progress
      FROM students s
      INNER JOIN users u ON s.parent_id = u.id
      ORDER BY s.created_at DESC
      LIMIT 10
    `).all(),u=await r.prepare(`
      SELECT 
        c.id,
        c.title,
        c.category,
        c.status,
        0 as students,
        0 as completion,
        0 as rating
      FROM courses c
      ORDER BY c.created_at DESC
      LIMIT 10
    `).all();return t.json({stats:{totalStudents:(i==null?void 0:i.count)||0,activeCourses:(o==null?void 0:o.count)||0,monthlyRevenue:(l==null?void 0:l.total)||0,completionRate:0},students:(c==null?void 0:c.results)||[],courses:(u==null?void 0:u.results)||[]})}catch(r){return console.error("Admin dashboard error:",r),t.json({message:"Failed to load dashboard: "+r.message},500)}});w.post("/api/students/add",Hg);w.post("/api/enrollments/create",Gg);w.get("/api/students/my-students",tf);w.get("/api/courses/browse",Yg);w.get("/api/enrollments/my-courses",rf);w.get("/api/classes/upcoming",Vg);w.get("/api/classes/completed",Kg);w.get("/api/assignments/my-assignments",nf);w.post("/api/assignments/submit",Jg);w.get("/api/achievements/my-achievements",Xg);w.post("/api/admin/courses/create",Qg);w.post("/api/admin/classes/schedule",Zg);w.post("/api/admin/attendance/mark",ef);w.post("/api/admin/assignments/create",af);w.post("/api/admin/assignments/grade",sf);w.post("/api/admin/achievements/award",of);w.post("/api/admin/notifications/send",lf);w.get("/api/admin/students/all",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const i=await r.prepare(`
      SELECT 
        s.id,
        s.parent_id,
        s.first_name,
        s.last_name,
        s.age,
        s.grade,
        s.enrollment_status,
        s.created_at,
        u.email as parent_email,
        COUNT(DISTINCT e.course_id) as courses_enrolled
      FROM students s
      LEFT JOIN users u ON s.parent_id = u.id
      LEFT JOIN enrollments e ON s.id = e.student_id AND e.status = 'active'
      GROUP BY s.id
      ORDER BY s.created_at DESC
    `).all();return t.json({students:(i==null?void 0:i.results)||[]})}catch(r){return console.error("Get all students error:",r),t.json({message:"Failed to load students: "+r.message},500)}});w.get("/api/admin/classes/all",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const i=await r.prepare(`
      SELECT 
        lc.id,
        lc.course_id,
        lc.title,
        lc.description,
        lc.scheduled_date,
        lc.scheduled_time,
        lc.duration_minutes,
        lc.meeting_link,
        lc.meeting_password,
        lc.status,
        c.title as course_title
      FROM live_classes lc
      LEFT JOIN courses c ON lc.course_id = c.id
      ORDER BY lc.scheduled_date DESC, lc.scheduled_time DESC
    `).all();return t.json({classes:(i==null?void 0:i.results)||[]})}catch(r){return console.error("Get all classes error:",r),t.json({message:"Failed to load classes: "+r.message},500)}});w.get("/api/admin/classes/upcoming",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const i=await r.prepare(`
      SELECT 
        lc.id,
        lc.course_id,
        lc.title,
        lc.scheduled_date,
        lc.scheduled_time,
        c.title as course_title
      FROM live_classes lc
      LEFT JOIN courses c ON lc.course_id = c.id
      WHERE datetime(lc.scheduled_date || ' ' || lc.scheduled_time) >= datetime('now')
      ORDER BY lc.scheduled_date ASC, lc.scheduled_time ASC
    `).all();return t.json({classes:(i==null?void 0:i.results)||[]})}catch(r){return console.error("Get upcoming classes error:",r),t.json({message:"Failed to load classes: "+r.message},500)}});w.get("/api/admin/revenue/stats",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const i=await r.prepare(`
      SELECT SUM(monthly_price) as total FROM subscriptions WHERE status = 'active'
    `).first(),o=await r.prepare(`
      SELECT COUNT(*) as count FROM subscriptions WHERE status = 'active'
    `).first(),l=await r.prepare(`
      SELECT 
        s.id,
        s.num_students,
        s.monthly_price,
        s.billing_cycle,
        s.status,
        s.next_billing_date,
        u.email as parent_email
      FROM subscriptions s
      LEFT JOIN users u ON s.parent_id = u.id
      WHERE s.status = 'active'
      ORDER BY s.created_at DESC
    `).all(),c=(i==null?void 0:i.total)||0,u=(o==null?void 0:o.count)||0,d=u>0?c/u:0;return t.json({totalRevenue:c,activeSubscriptions:u,avgStudentValue:d,subscriptions:(l==null?void 0:l.results)||[]})}catch(r){return console.error("Get revenue stats error:",r),t.json({message:"Failed to load revenue: "+r.message},500)}});w.post("/api/admin/database/query",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const{query:i}=await t.req.json();if(!i)return t.json({message:"Query is required"},400);const o=await r.prepare(i).all();return t.json({results:(o==null?void 0:o.results)||[]})}catch(r){return console.error("Database query error:",r),t.json({message:"Query failed: "+r.message},500)}});w.post("/api/create-checkout",async t=>{try{const{STRIPE_SECRET_KEY:r}=t.env,n=new Ug(r,{apiVersion:"2024-12-18.acacia"}),a=await t.req.json(),{items:s}=a,i=s.map(l=>{const c=l.sizePrice+l.framePrice;return{price_data:{currency:"usd",product_data:{name:`${l.printName} - ${l.size}"`,description:`✨ Limited Edition 1/100
🖋️ Hand-Signed by Italo Campilii & Ale
🎨 ${l.frameName} Frame
📐 ${l.size}" Museum-Quality Print
📄 Archival Paper • UV-Protected
🏗️ Artisan-Made • Built to Order
📦 Ships in 4-6 Weeks • Free US Shipping`,images:l.imageUrl?[l.imageUrl]:[]},unit_amount:c*100},quantity:l.quantity||1}}),o=await n.checkout.sessions.create({payment_method_types:["card"],line_items:i,mode:"payment",success_url:`${t.req.url.split("/api")[0]}/success?session_id={CHECKOUT_SESSION_ID}`,cancel_url:`${t.req.url.split("/api")[0]}/prints`,shipping_address_collection:{allowed_countries:["US","CA"]},metadata:{items:JSON.stringify(s.map(l=>({print:l.printName,size:l.size,frame:l.frameName})))}});return t.json({url:o.url})}catch(r){return console.error("Stripe error:",r),t.json({error:"Failed to create checkout session"},500)}});w.post("/api/support-ticket",async t=>{try{const{name:r,email:n,subject:a,message:s}=await t.req.json();if(!r||!n||!a||!s)return t.json({error:"All fields are required"},400);const i=`TICKET-${Date.now()}-${Math.random().toString(36).substring(2,7).toUpperCase()}`,o=`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 300; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #4794A6; color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
    .header h1 { margin: 0; font-weight: 300; font-size: 28px; letter-spacing: -0.02em; }
    .ticket-id { background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; display: inline-block; margin-top: 12px; font-size: 13px; font-weight: 400; }
    .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
    .field { margin-bottom: 20px; }
    .field-label { font-weight: 400; color: #666; font-size: 13px; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
    .field-value { font-size: 15px; color: #000; font-weight: 300; }
    .message-box { background: #f8f8f8; padding: 20px; border-radius: 8px; border-left: 3px solid #4794A6; margin-top: 10px; }
    .footer { background: #f8f8f8; padding: 20px; text-align: center; font-size: 12px; color: #999; border-radius: 0 0 12px 12px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>💬 New Support Ticket</h1>
    <div class="ticket-id">${i}</div>
  </div>
  
  <div class="content">
    <div class="field">
      <div class="field-label">From</div>
      <div class="field-value">${r}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Email</div>
      <div class="field-value"><a href="mailto:${n}" style="color: #4794A6; text-decoration: none;">${n}</a></div>
    </div>
    
    <div class="field">
      <div class="field-label">Subject</div>
      <div class="field-value">${a}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Message</div>
      <div class="message-box">${s.replace(/\n/g,"<br>")}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Submitted</div>
      <div class="field-value">${new Date().toLocaleString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",timeZoneName:"short"})}</div>
    </div>
  </div>
  
  <div class="footer">
    <p style="margin: 0;">Reply to this email to respond directly to ${r}</p>
    <p style="margin: 8px 0 0 0; color: #ccc;">Acromatico Support System</p>
  </div>
</body>
</html>
    `.trim();return console.log("=== NEW SUPPORT TICKET ==="),console.log("Ticket ID:",i),console.log("From:",r,"<"+n+">"),console.log("Subject:",a),console.log("Message:",s),console.log("========================"),t.json({success:!0,ticketId:i,message:"Support ticket created successfully"})}catch(r){return console.error("Support ticket error:",r),t.json({error:"Failed to create support ticket"},500)}});w.get("/api/stripe-key",t=>t.json({publishableKey:t.env.STRIPE_PUBLISHABLE_KEY}));w.post("/api/coming-soon-inquiry",async t=>{try{const{name:r,email:n,message:a,service:s}=await t.req.json();return console.log("Coming Soon Inquiry:",{name:r,email:n,message:a,service:s,timestamp:new Date().toISOString()}),t.json({success:!0,message:"Thank you for your interest! We will contact you within 24 hours at "+n})}catch(r){return console.error("Coming soon inquiry error:",r),t.json({error:"Failed to submit inquiry"},500)}});w.use(ou);w.get("/",t=>t.redirect("/static/index"));w.get("/education",t=>t.render(e("div",{class:"min-h-screen bg-black text-white",children:[e("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        video {
          filter: brightness(0.8) saturate(1.1);
        }
        
        .video-zoom {
          transform: scale(1.2);
          object-fit: cover;
        }
        
        .glass-nav {
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .btn-primary {
          background: #4794A6;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(71, 148, 166, 0.3);
        }
        
        .btn-primary:hover {
          background: #5aa5b8;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(71, 148, 166, 0.5);
        }
        
        .feature-card {
          background: rgba(20, 20, 30, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(71, 148, 166, 0.5);
          box-shadow: 0 10px 40px rgba(71, 148, 166, 0.2);
        }
        
        .stat-number {
          background: linear-gradient(135deg, #4794A6 0%, #14b8a6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        @keyframes kenBurnsZoom {
          0% { transform: scale(1.0) translate(0, 0); }
          100% { transform: scale(1.15) translate(-2%, -5%); }
        }
        
        @keyframes lensFlare {
          0%, 100% { 
            top: 20%; left: 30%; 
            opacity: 0.6;
          }
          50% { 
            top: 40%; left: 60%; 
            opacity: 0.3;
          }
        }
        
        @keyframes filmGrain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
        }
      `}),e(sr,{}),e("section",{class:"relative h-screen flex items-start justify-end overflow-hidden",children:[e("div",{class:"absolute inset-0 hero-bg",style:"background: url('/static/images/hero-education-torres-high-angle-4k.jpg') center top/cover; animation: kenBurnsZoom 20s ease-in-out infinite alternate; filter: brightness(0.8) saturate(1.2);",children:[e("div",{class:"absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"}),e("div",{style:"position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,200,100,0.2) 20%, transparent 70%); pointer-events: none; mix-blend-mode: screen; animation: lensFlare 15s ease-in-out infinite; filter: blur(40px); top: 20%; left: 30%; z-index: 2;"}),e("div",{style:"position: absolute; inset: 0; background: repeating-linear-gradient(0deg, transparent 0px, rgba(255,255,255,0.03) 2px, transparent 4px); opacity: 0.4; animation: filmGrain 0.2s steps(10) infinite; pointer-events: none; z-index: 3;"})]}),e("div",{class:"relative z-20 max-w-4xl w-full px-6 md:px-12 pb-20 md:pb-32 text-left self-end",children:[e("h1",{class:"text-7xl md:text-8xl font-semibold tracking-tight mb-6",style:"letter-spacing: -0.05em; line-height: 0.95;",children:["See",e("br",{}),"differently."]}),e("p",{class:"text-2xl md:text-3xl font-light mb-12 text-white/90",style:"letter-spacing: -0.02em;",children:["Photography for young",e("br",{}),"creators 7–14."]}),e("div",{class:"flex flex-col sm:flex-row gap-4",children:[e("a",{href:"/checkout",class:"bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/90 transition inline-block text-center",children:"Start learning"}),e("a",{href:"#curriculum",class:"border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition inline-block text-center",children:"Explore curriculum"})]})]}),e("div",{class:"absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce",children:e("svg",{class:"w-6 h-10 text-white/60",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 14l-7 7m0 0l-7-7m7 7V3"})})})]}),e("section",{class:"py-32 bg-gradient-to-b from-black to-gray-900",children:e("div",{class:"max-w-6xl mx-auto px-6 lg:px-8",children:[e("div",{class:"max-w-6xl mx-auto mb-20",children:[e("div",{class:"text-center mb-16",children:[e("h2",{class:"text-5xl md:text-6xl font-black mb-6",children:"We're Italo & Ale"}),e("p",{class:"text-2xl text-white/90 font-light mb-8",children:"Parents. Photographers. Adventurers."}),e("p",{class:"text-2xl text-white leading-relaxed max-w-2xl mx-auto",children:"We teach kids to see the world differently—with a camera in hand and confidence in their vision."})]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-8 mb-12",children:[e("div",{children:e("img",{src:"/static/images/educators-ale-cropped.jpg",alt:"Ale - Professional Photographer & Educator",class:"w-full rounded-3xl shadow-2xl",style:"object-fit: cover; aspect-ratio: 3/4;"})}),e("div",{children:e("img",{src:"/static/images/educators-italo-cropped.jpg",alt:"Italo - Professional Photographer & Educator",class:"w-full rounded-3xl shadow-2xl",style:"object-fit: cover; aspect-ratio: 3/4;"})})]}),e("div",{class:"grid grid-cols-2 md:grid-cols-4 gap-8 text-center",children:[e("div",{children:[e("div",{class:"text-4xl font-light mb-2",children:"20+"}),e("div",{class:"text-sm text-gray-500 uppercase tracking-wider",children:"Years Pro"})]}),e("div",{children:[e("div",{class:"text-4xl font-light mb-2",children:"1,000+"}),e("div",{class:"text-sm text-gray-500 uppercase tracking-wider",children:"Events Shot"})]}),e("div",{children:[e("div",{class:"text-4xl font-light mb-2",children:"3"}),e("div",{class:"text-sm text-gray-500 uppercase tracking-wider",children:"Countries"})]}),e("div",{children:[e("div",{class:"text-4xl font-light mb-2",children:"1M+"}),e("div",{class:"text-sm text-gray-500 uppercase tracking-wider",children:"Images Taken"})]})]})]}),e("div",{class:"grid grid-cols-1 md:grid-cols-3 gap-8",children:[e("div",{class:"feature-card p-8 rounded-2xl text-center",children:[e("div",{class:"w-14 h-14 rounded-xl mb-4 flex items-center justify-center mx-auto",style:"background: #4794A6;",children:e("i",{class:"fas fa-camera text-2xl"})}),e("h3",{class:"text-xl font-bold mb-3",children:"Creator-First"}),e("p",{class:"text-gray-400 text-sm leading-relaxed",children:"Every lesson focuses on hands-on creation, not theory. Learn by doing."})]}),e("div",{class:"feature-card p-8 rounded-2xl text-center",children:[e("div",{class:"w-14 h-14 rounded-xl mb-4 flex items-center justify-center mx-auto",style:"background: #4794A6;",children:e("i",{class:"fas fa-calendar-day text-2xl"})}),e("h3",{class:"text-xl font-bold mb-3",children:"Flexible"}),e("p",{class:"text-gray-400 text-sm leading-relaxed",children:"Flexible billing. No contracts. Cancel anytime."})]}),e("div",{class:"feature-card p-8 rounded-2xl text-center",children:[e("div",{class:"w-14 h-14 rounded-xl mb-4 flex items-center justify-center mx-auto",style:"background: #4794A6;",children:e("i",{class:"fas fa-users text-2xl"})}),e("h3",{class:"text-xl font-bold mb-3",children:"Multi-Child Discounts"}),e("p",{class:"text-gray-400 text-sm leading-relaxed",children:"4+ students at just $9.88 per class (each)."})]})]})]})}),e("section",{id:"curriculum",class:"py-32 bg-black relative overflow-hidden",children:[e("iframe",{src:"https://www.youtube.com/embed/ekPhZnuaR0E?autoplay=1&mute=1&loop=1&playlist=ekPhZnuaR0E&controls=0&showinfo=0&modestbranding=1&playsinline=1&enablejsapi=1&rel=0&vq=hd1080",class:"absolute inset-0 w-full h-full pointer-events-none",style:"transform: scale(1.3); filter: brightness(1.1) saturate(1.2);",allow:"autoplay; encrypted-media",frameborder:"0"}),e("div",{class:"absolute inset-0 bg-black/40 z-10"}),e("div",{class:"absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10"}),e("div",{class:"relative z-20 max-w-6xl mx-auto px-6 lg:px-8",children:[e("div",{class:"text-center mb-20",children:[e("h2",{class:"text-5xl md:text-6xl font-black mb-6",children:"12-Month Journey"}),e("p",{class:"text-xl text-gray-400",children:"From finding your eye to storytelling through the lens"})]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"JANUARY"}),e("h4",{class:"text-xl font-bold mb-3",children:"Finding Your Eye"}),e("p",{class:"text-gray-400 text-sm",children:"Master composition, rule of thirds, leading lines"})]}),e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"FEBRUARY"}),e("h4",{class:"text-xl font-bold mb-3",children:"Light & Shadow"}),e("p",{class:"text-gray-400 text-sm",children:"Understanding natural light, golden hour, exposure"})]}),e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"MARCH"}),e("h4",{class:"text-xl font-bold mb-3",children:"Manual Mode Mastery"}),e("p",{class:"text-gray-400 text-sm",children:"Exposure triangle: aperture, shutter speed, ISO control"})]}),e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"APRIL"}),e("h4",{class:"text-xl font-bold mb-3",children:"Portrait Photography"}),e("p",{class:"text-gray-400 text-sm",children:"Capturing emotion, connection, and personality"})]}),e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"MAY"}),e("h4",{class:"text-xl font-bold mb-3",children:"Street Photography"}),e("p",{class:"text-gray-400 text-sm",children:"Candid moments, urban composition, storytelling"})]}),e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"JUNE"}),e("h4",{class:"text-xl font-bold mb-3",children:"Photo Essay Project"}),e("p",{class:"text-gray-400 text-sm",children:"Complete your first photo essay—10-15 curated images that tell a story"})]}),e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"SEPTEMBER"}),e("h4",{class:"text-xl font-bold mb-3",children:"Advanced Composition"}),e("p",{class:"text-gray-400 text-sm",children:"Breaking rules, creative framing, visual poetry"})]}),e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"OCTOBER"}),e("h4",{class:"text-xl font-bold mb-3",children:"Photo Editing Mastery"}),e("p",{class:"text-gray-400 text-sm",children:"Lightroom basics, turning good photos into great ones"})]}),e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"NOVEMBER"}),e("h4",{class:"text-xl font-bold mb-3",children:"Portfolio Building"}),e("p",{class:"text-gray-400 text-sm",children:"Curating work, presenting your unique vision"})]}),e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"DECEMBER"}),e("h4",{class:"text-xl font-bold mb-3",children:"Year-End Showcase"}),e("p",{class:"text-gray-400 text-sm",children:"Present your best work to family and community"})]})]})]})]}),e("section",{class:"py-32 relative overflow-hidden",children:[e("div",{class:"absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900",children:[e("div",{class:"stars-small"}),e("div",{class:"stars-medium"}),e("div",{class:"stars-large"})]}),e("style",{dangerouslySetInnerHTML:{__html:`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          
          .stars-small, .stars-medium, .stars-large {
            position: absolute;
            inset: 0;
          }
          
          .stars-small::before,
          .stars-medium::before,
          .stars-large::before {
            content: '';
            position: absolute;
            inset: 0;
            background-size: 200px 200px;
            animation: twinkle 3s infinite;
          }
          
          .stars-small::before {
            background-image: 
              radial-gradient(1px 1px at 20px 30px, rgba(20,184,166,0.8), transparent),
              radial-gradient(1px 1px at 60px 70px, rgba(6,182,212,0.8), transparent),
              radial-gradient(1px 1px at 140px 120px, rgba(20,184,166,0.8), transparent),
              radial-gradient(1px 1px at 180px 50px, rgba(6,182,212,0.6), transparent),
              radial-gradient(1px 1px at 90px 160px, rgba(20,184,166,0.6), transparent),
              radial-gradient(1px 1px at 30px 180px, rgba(6,182,212,0.6), transparent),
              radial-gradient(1px 1px at 150px 10px, rgba(20,184,166,0.7), transparent),
              radial-gradient(1px 1px at 110px 90px, rgba(6,182,212,0.7), transparent);
            animation-duration: 2s;
          }
          
          .stars-medium::before {
            background-image: 
              radial-gradient(2px 2px at 40px 60px, rgba(20,184,166,0.9), transparent),
              radial-gradient(2px 2px at 120px 140px, rgba(6,182,212,0.9), transparent),
              radial-gradient(2px 2px at 180px 100px, rgba(20,184,166,0.9), transparent),
              radial-gradient(2px 2px at 80px 30px, rgba(6,182,212,0.7), transparent),
              radial-gradient(2px 2px at 160px 180px, rgba(20,184,166,0.7), transparent);
            animation-duration: 4s;
            animation-delay: 0.5s;
          }
          
          .stars-large::before {
            background-image: 
              radial-gradient(3px 3px at 100px 120px, rgba(20,184,166,1), transparent),
              radial-gradient(3px 3px at 50px 150px, rgba(6,182,212,1), transparent),
              radial-gradient(3px 3px at 170px 80px, rgba(20,184,166,1), transparent);
            animation-duration: 5s;
            animation-delay: 1s;
          }
        `}}),e("div",{class:"relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center",children:[e("h2",{class:"text-5xl md:text-6xl font-black mb-8",children:"Ready to Create?"}),e("p",{class:"text-2xl mb-12 opacity-90",children:"Learn from educators with 20+ years of professional experience"}),e("button",{onclick:"openEducationModal()",class:"btn-primary px-12 py-6 rounded-full text-xl font-bold text-white inline-block shadow-2xl border-0 cursor-pointer",children:"Enroll Now"})]})]}),e("div",{dangerouslySetInnerHTML:{__html:_t}}),e("div",{id:"enrollment-modal",class:"fixed inset-0 bg-black/95 z-[100] hidden flex items-center justify-center p-4 overflow-y-auto",children:e("div",{class:"max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto",children:[e("div",{class:"mb-8",children:[e("div",{class:"flex justify-between mb-2 text-sm text-gray-400",children:[e("span",{id:"step-label",children:"Step 1 of 3"}),e("span",{id:"step-percentage",children:"33%"})]}),e("div",{class:"h-2 bg-gray-800 rounded-full overflow-hidden",children:e("div",{id:"progress-bar",class:"h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-500",style:"width: 33%"})})]}),e("div",{id:"step-1",class:"step-content",children:[e("h2",{class:"text-5xl font-black mb-4",children:"Create Your Free Account"}),e("p",{class:"text-xl text-gray-400 mb-8",children:"Get started in seconds - no credit card required"}),e("div",{class:"space-y-6",children:[e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"Parent Email"}),e("input",{type:"email",id:"parent-email",placeholder:"your@email.com",class:"w-full px-6 py-4 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-teal-500 focus:outline-none text-lg"})]}),e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"Create Password"}),e("input",{type:"password",id:"parent-password",placeholder:"Min 8 characters",class:"w-full px-6 py-4 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-teal-500 focus:outline-none text-lg"}),e("p",{class:"text-xs text-gray-500 mt-2",children:"Minimum 8 characters (letters, numbers, or symbols)"})]}),e("button",{onclick:"goToStep(2)",class:"btn-primary w-full px-8 py-5 rounded-full text-xl font-bold",style:"background: #4794A6;",children:"Continue →"})]}),e("div",{class:"mt-8 pt-8 border-t border-white/10",children:[e("div",{class:"flex items-center justify-center gap-3 text-sm text-gray-400",children:[e("svg",{class:"w-5 h-5 text-green-500",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("span",{class:"font-medium",children:"256-bit SSL Encryption"}),e("span",{class:"text-gray-600",children:"•"}),e("span",{children:"Your data is secure"})]}),e("p",{class:"text-center text-xs text-gray-500 mt-2",children:"We use industry-standard encryption (AES-256) and secure password hashing (bcrypt) to protect your information."})]})]}),e("div",{id:"step-2",class:"step-content hidden",children:[e("button",{onclick:"goToStep(1)",class:"text-gray-400 hover:text-white mb-3 flex items-center gap-2 text-sm",children:"← Back"}),e("h2",{class:"text-3xl font-black mb-2 text-center",children:"How Many Students?"}),e("p",{class:"text-base text-gray-400 mb-8 text-center",children:"Slide to see your savings"}),e("div",{class:"text-center mb-8",children:[e("div",{class:"text-8xl font-black mb-2",id:"big-price-display",children:"$12.50"}),e("div",{class:"text-xl text-gray-400",children:"per class per student"}),e("div",{class:"text-sm text-gray-500 mt-2",id:"student-count-text",children:"1 student • 8 live classes"})]}),e("div",{class:"mb-8 px-4",children:[e("div",{class:"flex justify-between items-center mb-3",children:[e("span",{class:"text-sm text-gray-400",children:"Number of Students"}),e("span",{class:"text-2xl font-bold text-white",id:"slider-number",children:"1"})]}),e("style",{dangerouslySetInnerHTML:{__html:`
                #student-slider::-webkit-slider-thumb {
                  appearance: none;
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background: #4794A6;
                  cursor: pointer;
                  border: 4px solid white;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  transition: transform 0.2s;
                }
                #student-slider::-webkit-slider-thumb:hover {
                  transform: scale(1.1);
                }
                #student-slider::-moz-range-thumb {
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background: #4794A6;
                  cursor: pointer;
                  border: 4px solid white;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  transition: transform 0.2s;
                }
                #student-slider::-moz-range-thumb:hover {
                  transform: scale(1.1);
                }
              `}}),e("input",{type:"range",id:"student-slider",min:"1",max:"6",value:"1",oninput:"updateSlider(this.value)",class:"w-full h-3 bg-gray-800 rounded-full appearance-none cursor-pointer",style:"background: linear-gradient(to right, #4794A6 0%, #4794A6 0%, #1f2937 0%, #1f2937 100%);"}),e("div",{class:"flex justify-between text-xs text-gray-500 mt-2",children:[e("span",{children:"1"}),e("span",{children:"2"}),e("span",{children:"3"}),e("span",{children:"4"}),e("span",{children:"5"}),e("span",{children:"6+"})]})]}),e("div",{class:"flex flex-col gap-4 mb-6",children:[e("div",{class:"flex items-center justify-center gap-2 bg-gray-900 p-2 rounded-full mx-auto",children:[e("button",{id:"per-class-tab-btn",onclick:"switchPricingTab('per-class')",class:"px-4 py-2 rounded-full font-semibold transition text-gray-400 text-sm whitespace-nowrap",children:"Per Class"}),e("button",{id:"monthly-tab-btn",onclick:"switchPricingTab('monthly')",class:"px-4 py-2 rounded-full font-semibold transition bg-teal-500 text-white text-sm",children:"Monthly"}),e("button",{id:"annual-tab-btn",onclick:"switchPricingTab('annual')",class:"px-4 py-2 rounded-full font-semibold transition text-gray-400 text-sm",children:["Annual ",e("span",{class:"text-teal-500 text-xs ml-1",children:"Save 20%"})]})]}),e("div",{id:"per-class-info",class:"text-center hidden",children:[e("p",{class:"text-sm font-semibold text-gray-300 mb-2",children:"Pay as you go"}),e("p",{class:"text-xs text-gray-500 mb-3",children:"No commitment • Book classes individually"}),e("div",{class:"inline-block bg-gray-500/10 border border-gray-500/20 rounded-full px-4 py-2",children:e("span",{class:"text-lg font-bold text-gray-400",id:"per-class-summary",children:"Bulk discounts with monthly/annual"})})]}),e("div",{id:"monthly-info",class:"text-center bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-2xl p-4 border border-teal-500/20",children:[e("p",{class:"text-sm font-semibold text-gray-300 mb-2",children:"Billed monthly • Cancel anytime"}),e("div",{class:"flex items-center justify-center gap-3 mb-2",children:[e("span",{class:"text-2xl line-through text-gray-600",id:"monthly-original-total",children:"$240"}),e("svg",{class:"w-6 h-6 text-teal-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 7l5 5m0 0l-5 5m5-5H6"})}),e("span",{class:"text-4xl font-black text-teal-500",id:"monthly-new-total",children:"$100"}),e("span",{class:"text-base text-gray-400",children:"/month"})]}),e("div",{class:"inline-block bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2",children:e("span",{class:"text-lg font-bold text-green-400",id:"monthly-savings",children:"Save $140/month"})})]}),e("div",{id:"annual-info",class:"text-center bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-2xl p-4 border border-teal-500/20 hidden",children:[e("p",{class:"text-sm font-semibold text-gray-300 mb-2",children:"12 months prepaid • Year-round classes"}),e("div",{class:"flex items-center justify-center gap-3 mb-2",children:[e("span",{class:"text-2xl line-through text-gray-600",id:"annual-original-total",children:"$2,400"}),e("svg",{class:"w-6 h-6 text-teal-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 7l5 5m0 0l-5 5m5-5H6"})}),e("span",{class:"text-4xl font-black text-teal-500",id:"annual-new-total",children:"$800"}),e("span",{class:"text-base text-gray-400",children:"/year"})]}),e("div",{class:"inline-block bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2",children:e("span",{class:"text-lg font-bold text-green-400",id:"annual-savings",children:"Save $1,600/year"})})]})]}),e("div",{class:"feature-card p-4 rounded-xl mt-4",children:[e("h3",{class:"text-base font-bold mb-3 text-center",children:"Everything Included"}),e("div",{class:"grid grid-cols-1 gap-2 text-xs",children:[e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"30-Minute Micro-Learning Sessions"}),e("div",{class:"text-gray-400 text-xs",children:"Perfect for young creators' attention spans - 8 live classes/month (Mon & Thu 11:30 AM ET)"})]})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"Lifetime Instruction Library"}),e("div",{class:"text-gray-400 text-xs",children:"Can't make it live? Catch up on expert-led teachings anytime."})]})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"December Bonus Workshops"}),e("div",{class:"text-gray-400 text-xs",children:"First 2 weeks of December: Special 1-hour fun workshops to celebrate the year!"})]})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"Portfolio Building"}),e("div",{class:"text-gray-400 text-xs",children:"Showcase your child's work and track their creative journey"})]})]})]})]}),e("button",{onclick:"selectPackage(parseInt(document.getElementById('student-slider').value))",class:"w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-full transition text-lg mt-6",children:"Continue to Payment →"})]}),e("div",{id:"step-3",class:"step-content hidden",children:[e("button",{onclick:"goToStep(2)",class:"text-gray-400 hover:text-white mb-4 flex items-center gap-2",children:"← Back"}),e("h2",{class:"text-5xl font-black mb-4",children:"Complete Enrollment"}),e("p",{class:"text-xl text-gray-400 mb-8",children:["You selected ",e("span",{id:"selected-package",class:"text-teal-500"})]}),e("div",{class:"feature-card p-6 rounded-2xl mb-6",children:[e("div",{class:"flex justify-between mb-4",children:[e("span",{class:"text-gray-400",children:"Students"}),e("span",{id:"summary-students",class:"font-bold"})]}),e("div",{class:"flex justify-between mb-4",children:[e("span",{class:"text-gray-400",children:"Price per student"}),e("span",{id:"summary-price",class:"font-bold"})]}),e("div",{class:"flex justify-between pt-4 border-t border-white/10",children:[e("span",{id:"summary-label",class:"text-xl font-bold",children:"Total Today (Prorated)"}),e("span",{id:"summary-total",class:"text-xl font-bold text-teal-500"})]}),e("div",{id:"savings-display",class:"flex justify-between mt-2 hidden",children:[e("span",{class:"text-sm text-gray-400",children:"Annual Savings"}),e("span",{id:"summary-savings",class:"text-sm font-bold text-green-500"})]}),e("p",{id:"billing-note",class:"text-xs text-gray-500 mt-2",children:"*Recurring billing on same date each month/year"})]}),e("div",{class:"feature-card p-6 rounded-2xl mb-6 border-2 border-teal-500/20",children:[e("h3",{class:"text-xl font-bold mb-4 flex items-center gap-2",children:[e("svg",{class:"w-6 h-6 text-teal-500",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z","clip-rule":"evenodd"})}),"Enrollment Agreement"]}),e("div",{class:"bg-gray-900 p-4 rounded-lg max-h-64 overflow-y-auto text-sm mb-4 space-y-3",children:[e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-white",children:"ACROMATICO CREATOR ACADEMY - ENROLLMENT TERMS"}),e("br",{}),"By enrolling in Acromatico Creator Academy programs, you agree to the following terms:"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"1. PROGRAM COMMITMENT"}),e("br",{}),"• 8 live classes per month (Monday & Thursday, 11:30 AM ET)",e("br",{}),"• 30-minute micro-learning sessions designed for youth creators",e("br",{}),"• Access to lifetime instruction library and recorded sessions",e("br",{}),"• Portfolio building tools and creative resources"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"2. PAYMENT TERMS"}),e("br",{}),"• Monthly billing: Charged on the same day each month",e("br",{}),"• Annual billing: 12 months prepaid (year-round classes)",e("br",{}),"• Full month billed on enrollment date; recurring monthly/annually",e("br",{}),"• Payments processed securely via Stripe"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"3. NO REFUND POLICY"}),e("br",{}),"• ",e("strong",{class:"text-white",children:"All class fees are NON-REFUNDABLE once charged"}),e("br",{}),"• Classes cannot be refunded, transferred, or credited",e("br",{}),"• Missed classes: Recordings available in instruction library",e("br",{}),"• No refunds for unused classes or early cancellation",e("br",{}),"• No chargebacks permitted - enrollment is a binding agreement"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"4. CANCELLATION POLICY"}),e("br",{}),"• Monthly: Cancel anytime (effective next billing cycle)",e("br",{}),"• Annual: No refunds on prepaid tuition (non-refundable)",e("br",{}),"• Must cancel before next billing date to avoid charges",e("br",{}),"• Cancellation does not entitle refunds for current period"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"5. CHARGEBACK PROTECTION"}),e("br",{}),"• By signing, you waive rights to initiate chargebacks",e("br",{}),"• Disputes must be handled directly with Acromatico",e("br",{}),"• Unauthorized chargebacks may result in account suspension",e("br",{}),"• You acknowledge receipt of services as described"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"6. ATTENDANCE & CONDUCT"}),e("br",{}),"• Students expected to attend live sessions when possible",e("br",{}),"• Respectful, kind, and collaborative behavior required",e("br",{}),"• ",e("strong",{class:"text-white",children:"Disruptive behaviors include:"})," bullying, inappropriate language, intentionally disrupting class, refusing to participate respectfully, or harassing other students/instructors",e("br",{}),"• ",e("strong",{class:"text-white",children:"Progressive discipline policy:"}),e("br",{}),"  → 1st incident: Verbal warning during class + email to parent",e("br",{}),"  → 2nd incident: Parent discussion call + written warning",e("br",{}),"  → 3rd incident: 1-week suspension from live classes (recordings still available)",e("br",{}),"  → Continued violations: Removal from program with no refund",e("br",{}),"• We work with parents to help students succeed, but safety and respect for all students is our priority",e("br",{}),"• Severe violations (threats, harassment, illegal activity) may result in immediate removal",e("br",{}),"• No refunds for removal due to code of conduct violations"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"7. CONTENT & INTELLECTUAL PROPERTY"}),e("br",{}),"• All course materials remain property of Acromatico",e("br",{}),"• Students retain rights to their created work and photographs",e("br",{}),"• ",e("strong",{class:"text-white",children:"Student Work Showcase:"})," Parents can opt-in via Parent Portal to allow us to showcase student work on social media, website, and marketing materials",e("br",{}),"• ",e("strong",{class:"text-white",children:"Photo Release for Subjects:"})," If students photograph people and wish to submit those images for showcase, a signed photo release from the photographed person (or their parent/guardian if under 18) must be uploaded via Parent Portal",e("br",{}),"• Parents control all consent settings in their dashboard and can revoke permission at any time"]}),e("p",{class:"text-gray-300 leading-relaxed",children:e("strong",{class:"text-white",children:"By signing below, you acknowledge that you have read, understood, and agree to these terms. You confirm that all enrollment fees are non-refundable and that you will not initiate chargebacks or payment disputes."})})]}),e("div",{class:"space-y-4",children:[e("div",{class:"flex gap-4 mb-4",children:[e("button",{id:"type-signature-btn",onclick:"switchSignatureMethod('type')",class:"flex-1 py-2 px-4 rounded-lg bg-teal-500 text-white font-semibold",children:"Type Signature"}),e("button",{id:"draw-signature-btn",onclick:"switchSignatureMethod('draw')",class:"flex-1 py-2 px-4 rounded-lg bg-gray-700 text-gray-300 font-semibold",children:"Draw Signature"})]}),e("div",{id:"type-signature-section",class:"space-y-3",children:[e("input",{type:"text",id:"typed-signature",placeholder:"Type your full name",class:"w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none text-white"}),e("p",{class:"text-xs text-gray-500",children:"By typing your name, you agree to sign this agreement electronically"})]}),e("div",{id:"draw-signature-section",class:"hidden space-y-3",children:[e("div",{class:"border-2 border-gray-700 rounded-lg bg-white",children:e("canvas",{id:"signature-canvas",width:"600",height:"200",class:"w-full cursor-crosshair rounded-lg",style:"touch-action: none;"})}),e("button",{onclick:"clearSignature()",class:"text-sm text-gray-400 hover:text-white",children:"Clear Signature"})]}),e("label",{class:"flex items-start gap-3 cursor-pointer",children:[e("input",{type:"checkbox",id:"agreement-checkbox",class:"mt-1 w-5 h-5 rounded border-gray-700 bg-gray-800 text-teal-500 focus:ring-teal-500 cursor-pointer"}),e("span",{class:"text-sm text-gray-300 leading-relaxed",children:["I have read and agree to the enrollment terms. I understand that all fees are ",e("strong",{class:"text-white",children:"non-refundable"})," and that I will not initiate chargebacks or payment disputes. I acknowledge this is a legally binding agreement."]})]})]})]}),e("style",{dangerouslySetInnerHTML:{__html:`
              @keyframes pulse-glow {
                0%, 100% {
                  box-shadow: 0 0 20px rgba(71, 148, 166, 0.3), 0 0 40px rgba(71, 148, 166, 0.1);
                }
                50% {
                  box-shadow: 0 0 30px rgba(71, 148, 166, 0.5), 0 0 60px rgba(71, 148, 166, 0.2);
                }
              }
              @keyframes gentle-bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-4px); }
              }
              .payment-button-pulse {
                animation: pulse-glow 2s ease-in-out infinite;
              }
              .payment-button-pulse:hover {
                animation: pulse-glow 2s ease-in-out infinite, gentle-bounce 0.6s ease-in-out infinite;
              }
            `}}),e("div",{class:"space-y-4 mb-6",children:[e("button",{onclick:"completeEnrollment()",class:"payment-button-pulse w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-6 px-8 rounded-2xl flex items-center justify-center gap-4 border-2 border-teal-400 transition-all shadow-2xl",id:"stripe-checkout-btn",children:[e("div",{class:"flex items-center gap-3",children:[e("svg",{class:"w-8 h-8",viewBox:"0 0 24 24",fill:"none",children:[e("rect",{x:"3",y:"5",width:"18",height:"14",rx:"2",stroke:"currentColor","stroke-width":"2"}),e("path",{d:"M3 10h18",stroke:"currentColor","stroke-width":"2"})]}),e("div",{class:"text-left",children:[e("div",{class:"text-xl font-bold",children:"Pay with Card"}),e("div",{class:"text-sm text-teal-100 font-normal",children:["Secure payment via Stripe • ",e("span",{id:"stripe-amount",children:"$0"})]})]})]}),e("div",{class:"ml-auto flex items-center gap-2 text-sm",children:[e("span",{class:"inline-flex items-center px-2 py-1 bg-white/20 rounded text-xs text-white",children:"Apple Pay"}),e("span",{class:"inline-flex items-center px-2 py-1 bg-white/20 rounded text-xs text-white",children:"G Pay"}),e("span",{class:"inline-flex items-center px-2 py-1 bg-white/20 rounded text-xs text-white",children:"+more"})]})]}),e("p",{class:"text-xs text-center text-gray-500",children:[e("svg",{class:"w-4 h-4 inline mr-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z","clip-rule":"evenodd"})}),"256-bit SSL Encryption • Your data is secure"]})]})]}),e("button",{onclick:"closeEnrollment()",class:"absolute top-8 right-8 text-gray-400 hover:text-white text-4xl",children:"×"})]})}),e("script",{dangerouslySetInnerHTML:{__html:`
        let currentStep = 1;
        let selectedStudents = 0;
        let selectedPrice = 0;
        let isAnnual = false;
        let pricingMode = 'monthly'; // 'per-class', 'monthly', or 'annual'
        
        // Pricing Constants
        const PER_CLASS_PRICE = 30; // $30 per individual class
        const BASE_MONTHLY_PRICE = 100; // $100/month for 8 classes (was $240)
        const SIBLING_DISCOUNT = 0.05; // 5% off per additional sibling
        const ANNUAL_DISCOUNT = 0.20; // 20% off annual prepaid
        
        function calculatePrice(students, isAnnual) {
          let total = 0;
          
          // Calculate total: if multiple students, everyone gets the sibling discount
          if (students === 1) {
            total = BASE_MONTHLY_PRICE; // $100 for single student
          } else {
            // With siblings, everyone pays discounted rate
            // 2 students = 5% off = $95 each = $190 total
            // 3 students = 10% off = $90 each = $270 total
            const discountRate = (students - 1) * SIBLING_DISCOUNT;
            const pricePerStudent = BASE_MONTHLY_PRICE * (1 - discountRate);
            total = pricePerStudent * students;
          }
          
          // Apply annual discount if selected
          if (isAnnual) {
            total = total * (1 - ANNUAL_DISCOUNT);
          }
          
          return total;
        }

        function openEnrollment() {
          document.getElementById('enrollment-modal').classList.remove('hidden');
          document.body.style.overflow = 'hidden';
          goToStep(1);
        }

        function closeEnrollment() {
          document.getElementById('enrollment-modal').classList.add('hidden');
          document.body.style.overflow = 'auto';
        }

        function goToStep(step) {
          // Validate Step 1 before proceeding to Step 2
          if (currentStep === 1 && step === 2) {
            const email = document.getElementById('parent-email').value.trim();
            const password = document.getElementById('parent-password').value;
            
            // Email validation
            const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
            if (!email || !emailRegex.test(email)) {
              alert('Please enter a valid email address');
              document.getElementById('parent-email').focus();
              return;
            }
            
            // Password validation (min 8 chars only - keep it simple)
            if (!password || password.length < 8) {
              alert('Password must be at least 8 characters long');
              document.getElementById('parent-password').focus();
              return;
            }
          }
          
          // Hide all steps
          document.querySelectorAll('.step-content').forEach(el => el.classList.add('hidden'));
          
          // Show target step
          document.getElementById('step-' + step).classList.remove('hidden');
          
          // Update progress
          currentStep = step;
          const percentage = (step / 3) * 100;
          document.getElementById('progress-bar').style.width = percentage + '%';
          document.getElementById('step-label').textContent = 'Step ' + step + ' of 3';
          document.getElementById('step-percentage').textContent = Math.round(percentage) + '%';
        }

        function switchPricingTab(mode) {
          pricingMode = mode;
          isAnnual = (mode === 'annual');
          
          // Update tab buttons
          const perClassBtn = document.getElementById('per-class-tab-btn');
          const monthlyBtn = document.getElementById('monthly-tab-btn');
          const annualBtn = document.getElementById('annual-tab-btn');
          
          // Reset all buttons
          [perClassBtn, monthlyBtn, annualBtn].forEach(btn => {
            btn.classList.remove('bg-teal-500', 'text-white');
            btn.classList.add('text-gray-400');
          });
          
          // Highlight active tab
          if (mode === 'per-class') {
            perClassBtn.classList.add('bg-teal-500', 'text-white');
            perClassBtn.classList.remove('text-gray-400');
          } else if (mode === 'monthly') {
            monthlyBtn.classList.add('bg-teal-500', 'text-white');
            monthlyBtn.classList.remove('text-gray-400');
          } else {
            annualBtn.classList.add('bg-teal-500', 'text-white');
            annualBtn.classList.remove('text-gray-400');
          }
          
          // Show/hide info sections
          document.getElementById('per-class-info').classList.toggle('hidden', mode !== 'per-class');
          document.getElementById('monthly-info').classList.toggle('hidden', mode !== 'monthly');
          document.getElementById('annual-info').classList.toggle('hidden', mode !== 'annual');
          
          // Update pricing display
          const currentStudents = parseInt(document.getElementById('student-slider').value);
          updateSlider(currentStudents);
        }

        function toggleBilling(type) {
          isAnnual = (type === 'annual');
          
          // Update toggle buttons
          const monthlyBtn = document.getElementById('monthly-toggle-btn');
          const annualBtn = document.getElementById('annual-toggle-btn');
          
          if (isAnnual) {
            monthlyBtn.classList.remove('bg-teal-500', 'text-white');
            monthlyBtn.classList.add('text-gray-400');
            annualBtn.classList.add('bg-teal-500', 'text-white');
            annualBtn.classList.remove('text-gray-400');
          } else {
            monthlyBtn.classList.add('bg-teal-500', 'text-white');
            monthlyBtn.classList.remove('text-gray-400');
            annualBtn.classList.remove('bg-teal-500', 'text-white');
            annualBtn.classList.add('text-gray-400');
          }
          
          // Toggle prices
          document.querySelectorAll('.monthly-price').forEach(el => {
            el.classList.toggle('hidden', isAnnual);
          });
          document.querySelectorAll('.annual-price').forEach(el => {
            el.classList.toggle('hidden', !isAnnual);
          });
          document.querySelectorAll('.annual-savings').forEach(el => {
            el.classList.toggle('hidden', !isAnnual);
          });
          
          // Toggle per-class pricing
          document.querySelectorAll('.monthly-per-class').forEach(el => {
            el.classList.toggle('hidden', isAnnual);
          });
          document.querySelectorAll('.annual-per-class').forEach(el => {
            el.classList.toggle('hidden', !isAnnual);
          });
          
          // Toggle billing notes
          document.querySelectorAll('.monthly-note').forEach(el => {
            el.classList.toggle('hidden', isAnnual);
          });
          document.querySelectorAll('.annual-note').forEach(el => {
            el.classList.toggle('hidden', !isAnnual);
          });
          
          // Update slider display with new pricing
          const currentStudents = parseInt(document.getElementById('student-slider').value);
          updateSlider(currentStudents);
        }

        function updateSlider(students) {
          students = parseInt(students);
          
          // Update slider visual feedback
          const slider = document.getElementById('student-slider');
          const percentage = ((students - 1) / 5) * 100;
          slider.style.background = \`linear-gradient(to right, #4794A6 0%, #4794A6 \${percentage}%, #1f2937 \${percentage}%, #1f2937 100%)\`;
          
          // Update slider number display
          document.getElementById('slider-number').textContent = students + (students >= 6 ? '+' : '');
          
          // Calculate pricing based on mode
          let bigPrice, studentCountText;
          
          if (pricingMode === 'per-class') {
            // Per-class pricing: $30/class
            bigPrice = PER_CLASS_PRICE;
            studentCountText = students + (students >= 6 ? '+' : '') + (students === 1 ? ' student' : ' students');
            // Note: per-class summary text is set in HTML, no need to update dynamically
          } else {
            // Monthly or Annual pricing
            const monthlyTotal = calculatePrice(students, isAnnual);
            const perStudentPerMonth = monthlyTotal / students;
            const perStudentPerClass = perStudentPerMonth / 8;
            
            bigPrice = perStudentPerClass;
            studentCountText = students + (students >= 6 ? '+' : '') + (students === 1 ? ' student' : ' students') + ' • 8 live classes';
            
            // Calculate original price (before discount) and savings
            const originalPerStudent = 30; // Original $30 per class
            const originalMonthlyTotal = originalPerStudent * 8 * students; // $30/class × 8 classes × students = $240/student baseline
            const newMonthlyTotal = monthlyTotal;
            const monthlySavings = originalMonthlyTotal - newMonthlyTotal;
            
            // Update Monthly pricing card
            const monthlyOriginalTotal = document.getElementById('monthly-original-total');
            const monthlyNewTotal = document.getElementById('monthly-new-total');
            const monthlySavingsText = document.getElementById('monthly-savings');
            
            if (monthlyOriginalTotal && monthlyNewTotal && monthlySavingsText) {
              monthlyOriginalTotal.textContent = '$' + originalMonthlyTotal.toFixed(0);
              monthlyNewTotal.textContent = '$' + newMonthlyTotal.toFixed(0);
              monthlySavingsText.textContent = 'Save $' + monthlySavings.toFixed(0) + '/month';
            }
            
            // Calculate Annual pricing (12 months - year-round)
            const annualOriginalTotal = originalMonthlyTotal * 12;
            const annualNewTotal = newMonthlyTotal * 12;
            const annualSavings = annualOriginalTotal - annualNewTotal;
            
            // Update Annual pricing card
            const annualOriginalTotalEl = document.getElementById('annual-original-total');
            const annualNewTotalEl = document.getElementById('annual-new-total');
            const annualSavingsEl = document.getElementById('annual-savings');
            
            if (annualOriginalTotalEl && annualNewTotalEl && annualSavingsEl) {
              annualOriginalTotalEl.textContent = '$' + annualOriginalTotal.toFixed(0);
              annualNewTotalEl.textContent = '$' + annualNewTotal.toFixed(0);
              annualSavingsEl.textContent = 'Save $' + annualSavings.toFixed(0) + '/year';
            }
            
            // Store for payment
            selectedPrice = monthlyTotal;
          }
          
          // Update BIG price display
          document.getElementById('big-price-display').textContent = '$' + bigPrice.toFixed(2);
          
          // Update student count text
          document.getElementById('student-count-text').textContent = studentCountText;
          
          // Auto-select package (for navigation to step 3)
          selectedStudents = students;
        }

        function selectPackage(students) {
          selectedStudents = students;
          
          // Calculate total monthly price with sibling discount
          const monthlyTotal = calculatePrice(students, isAnnual);
          selectedPrice = monthlyTotal; // Store total for later use
          
          let totalCharge, chargeLabel;
          
          if (isAnnual) {
            // Annual: 12 months prepaid (year-round classes including summer/winter)
            totalCharge = monthlyTotal * 12;
            chargeLabel = 'Total Due Today (Annual Prepaid)';
          } else {
            // Monthly: Full month charge, recurring on same date each month
            totalCharge = monthlyTotal;
            chargeLabel = 'First Month Total';
          }
          
          // Calculate savings for display (Annual vs Monthly)
          const yearlySavings = isAnnual ? 
            ((pricingData.monthly[students] * students * 10) - (pricePerStudent * students * 10)) : 0;
          
          // Update summary with clear pricing breakdown
          const billingText = isAnnual ? ' (Annual - 12 months)' : ' (Monthly)';
          const studentText = students + (students > 1 ? ' Students' : ' Student');
          document.getElementById('selected-package').textContent = studentText + billingText;
          document.getElementById('summary-students').textContent = students;
          
          // Show per-month total with discount info
          let priceText = '$' + monthlyTotal.toFixed(0) + '/month';
          if (students > 1) {
            const savingsPercent = Math.round((students - 1) * 10);
            priceText += ' (Save ' + savingsPercent + '% with siblings)';
          }
          if (isAnnual) {
            priceText += ' • 20% off annual';
          }
          document.getElementById('summary-price').textContent = priceText;
          document.getElementById('summary-total').textContent = '$' + totalCharge.toFixed(2);
          
          // Update the label and savings display
          document.getElementById('summary-label').textContent = chargeLabel;
          
          // Update Stripe button amount
          const stripeAmountEl = document.getElementById('stripe-amount');
          if (stripeAmountEl) {
            stripeAmountEl.textContent = '$' + totalCharge.toFixed(2);
          }
          
          if (isAnnual) {
            document.getElementById('savings-display').classList.remove('hidden');
            document.getElementById('summary-savings').textContent = '-$' + yearlySavings.toFixed(2);
          } else {
            document.getElementById('savings-display').classList.add('hidden');
          }
          
          // Always show billing note (no proration)
          const billingNote = document.getElementById('billing-note');
          if (billingNote) {
            billingNote.textContent = isAnnual ? 
              '*Annual prepaid - full 12 months charged today' : 
              '*Recurring monthly on ' + new Date().getDate() + 'th of each month';
          }
          
          // Go to next step
          setTimeout(() => goToStep(3), 300);
        }

        // Signature handling
        let signatureCanvas, signatureCtx, isDrawing = false;
        let signatureMethod = 'type'; // 'type' or 'draw'

        function initSignatureCanvas() {
          signatureCanvas = document.getElementById('signature-canvas');
          if (!signatureCanvas) return;
          
          signatureCtx = signatureCanvas.getContext('2d');
          signatureCtx.strokeStyle = '#000';
          signatureCtx.lineWidth = 2;
          signatureCtx.lineCap = 'round';

          // Mouse events
          signatureCanvas.addEventListener('mousedown', startDrawing);
          signatureCanvas.addEventListener('mousemove', draw);
          signatureCanvas.addEventListener('mouseup', stopDrawing);
          signatureCanvas.addEventListener('mouseout', stopDrawing);

          // Touch events
          signatureCanvas.addEventListener('touchstart', handleTouchStart);
          signatureCanvas.addEventListener('touchmove', handleTouchMove);
          signatureCanvas.addEventListener('touchend', stopDrawing);
        }

        function startDrawing(e) {
          isDrawing = true;
          const rect = signatureCanvas.getBoundingClientRect();
          signatureCtx.beginPath();
          signatureCtx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        }

        function draw(e) {
          if (!isDrawing) return;
          const rect = signatureCanvas.getBoundingClientRect();
          signatureCtx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
          signatureCtx.stroke();
        }

        function handleTouchStart(e) {
          e.preventDefault();
          isDrawing = true;
          const rect = signatureCanvas.getBoundingClientRect();
          const touch = e.touches[0];
          signatureCtx.beginPath();
          signatureCtx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
        }

        function handleTouchMove(e) {
          if (!isDrawing) return;
          e.preventDefault();
          const rect = signatureCanvas.getBoundingClientRect();
          const touch = e.touches[0];
          signatureCtx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
          signatureCtx.stroke();
        }

        function stopDrawing() {
          isDrawing = false;
        }

        function clearSignature() {
          if (!signatureCanvas) return;
          signatureCtx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
        }

        function switchSignatureMethod(method) {
          signatureMethod = method;
          
          if (method === 'type') {
            document.getElementById('type-signature-section').classList.remove('hidden');
            document.getElementById('draw-signature-section').classList.add('hidden');
            document.getElementById('type-signature-btn').classList.add('bg-teal-500', 'text-white');
            document.getElementById('type-signature-btn').classList.remove('bg-gray-700', 'text-gray-300');
            document.getElementById('draw-signature-btn').classList.remove('bg-teal-500', 'text-white');
            document.getElementById('draw-signature-btn').classList.add('bg-gray-700', 'text-gray-300');
          } else {
            document.getElementById('type-signature-section').classList.add('hidden');
            document.getElementById('draw-signature-section').classList.remove('hidden');
            document.getElementById('draw-signature-btn').classList.add('bg-teal-500', 'text-white');
            document.getElementById('draw-signature-btn').classList.remove('bg-gray-700', 'text-gray-300');
            document.getElementById('type-signature-btn').classList.remove('bg-teal-500', 'text-white');
            document.getElementById('type-signature-btn').classList.add('bg-gray-700', 'text-gray-300');
            
            // Initialize canvas if not already done
            if (!signatureCanvas) {
              setTimeout(initSignatureCanvas, 100);
            }
          }
        }

        function validateAgreement() {
          // Check if agreement checkbox is checked
          const agreementChecked = document.getElementById('agreement-checkbox').checked;
          if (!agreementChecked) {
            alert('Please read and agree to the enrollment terms before proceeding.');
            return false;
          }

          // Validate signature
          if (signatureMethod === 'type') {
            const typedSignature = document.getElementById('typed-signature').value.trim();
            if (!typedSignature || typedSignature.length < 3) {
              alert('Please type your full name to sign the agreement.');
              return false;
            }
          } else {
            // Check if canvas has been drawn on
            const canvas = document.getElementById('signature-canvas');
            const ctx = canvas.getContext('2d');
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const hasSignature = imageData.data.some(channel => channel !== 0);
            
            if (!hasSignature) {
              alert('Please draw your signature before proceeding.');
              return false;
            }
          }

          return true;
        }

        async function completeEnrollment() {
          // Validate agreement first
          if (!validateAgreement()) {
            return;
          }


          const email = document.getElementById('parent-email').value;
          const password = document.getElementById('parent-password').value;
          
          if (!email || !password) {
            alert('Please fill in all fields');
            return;
          }
          
          const billingType = isAnnual ? 'Annual (12 months prepaid - year-round)' : 'Monthly';
          const pricePerStudent = selectedPrice;
          const monthlyTotal = pricePerStudent * selectedStudents;
          const totalCharge = isAnnual ? monthlyTotal * 12 : monthlyTotal;
          
          // Show loading state
          const btn = document.getElementById('stripe-checkout-btn');
          const originalHTML = btn.innerHTML;
          btn.disabled = true;
          btn.innerHTML = '<div class="flex items-center gap-2"><svg class="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Saving agreement...</span></div>';
          
          try {
            // Get signature data
            const signatureData = signatureMethod === 'type' 
              ? document.getElementById('typed-signature').value 
              : signatureCanvas ? signatureCanvas.toDataURL() : 'drawn';

            // STEP 1: Create user account if it doesn't exist
            btn.innerHTML = '<div class="flex items-center gap-2"><svg class="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Creating account...</span></div>';
            
            const signupResponse = await fetch('/api/auth/signup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: email,
                password: password,
                firstName: email.split('@')[0], // Use email prefix as first name
                lastName: 'Parent', // Default last name
                role: 'parent' // Parent role for enrollment
              })
            });

            const signupData = await signupResponse.json();
            
            // If user already exists, that's okay - we'll continue with enrollment
            if (signupData.message && signupData.message.includes('already registered')) {
              console.log('✅ User already exists, continuing with enrollment');
            } else if (!signupResponse.ok) {
              throw new Error(signupData.message || 'Signup failed');
            }

            console.log('✅ User account ready');

            // STEP 2: Save enrollment with signed agreement
            btn.innerHTML = '<div class="flex items-center gap-2"><svg class="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Saving agreement...</span></div>';
            
            const enrollmentResponse = await fetch('/api/enrollments/create', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                parentEmail: email,
                studentsCount: selectedStudents,
                billingType: billingType,
                monthlyTotal: monthlyTotal,
                signatureMethod: signatureMethod,
                signatureData: signatureData,
                ipAddress: 'client_ip' // Will be replaced server-side if needed
              })
            });

            const enrollmentData = await enrollmentResponse.json();
            
            if (enrollmentData.error) {
              throw new Error(enrollmentData.error);
            }

            console.log('✅ Agreement saved:', enrollmentData.enrollmentId);
            
            // Update loading message
            btn.innerHTML = '<div class="flex items-center gap-2"><svg class="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Redirecting to Stripe...</span></div>';

            // Create Stripe checkout session
            const response = await fetch('/api/payments/create-checkout-session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                amount: totalCharge,
                productName: selectedStudents + ' Student' + (selectedStudents > 1 ? 's' : '') + ' - ' + billingType,
                customerEmail: email,
                paymentMode: isAnnual ? 'payment' : 'subscription',
                successUrl: window.location.origin + '/payment/success?session_id={CHECKOUT_SESSION_ID}',
                cancelUrl: window.location.origin + '/education',
                metadata: {
                  product_type: 'education',
                  students: selectedStudents,
                  price_per_student: pricePerStudent,
                  billing_type: billingType,
                  monthly_total: monthlyTotal,
                  total_charge: totalCharge,
                  parent_email: email,
                  source: 'enrollment_modal',
                  agreement_signed: 'yes',
                  signature_method: signatureMethod,
                  signature: signatureMethod === 'type' ? document.getElementById('typed-signature').value : 'drawn',
                  signature_timestamp: new Date().toISOString(),
                  ip_address: 'recorded_on_server'
                }
              })
            });
            
            const data = await response.json();
            
            if (data.error) {
              throw new Error(data.error);
            }
            
            // Redirect to Stripe Checkout
            window.location.href = data.url;
            
          } catch (error) {
            console.error('Checkout error:', error);
            alert('Payment error: ' + error.message + '\\n\\nPlease try again or contact support at info@acromatico.com');
            btn.disabled = false;
            btn.innerHTML = originalHTML;
          }
        }

        // Update all "Enroll Now" and "Start Creating Today" buttons
        document.addEventListener('DOMContentLoaded', function() {
          const enrollButtons = document.querySelectorAll('a[href="/pricing"], a[href="/checkout"]');
          enrollButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
              e.preventDefault();
              openEnrollment();
            });
          });
        });
      `}}),e("div",{id:"educationProgramsModal",class:"fixed inset-0 bg-black/95 z-[200] hidden flex items-center justify-center p-4",children:e("div",{class:"max-w-5xl w-full bg-gray-900 rounded-3xl p-12 relative max-h-[90vh] overflow-y-auto",children:[e("button",{onclick:"closeEducationProgramsModal()",class:"absolute top-6 right-6 text-gray-400 hover:text-white text-4xl font-light transition",children:"×"}),e("div",{class:"text-center mb-12",children:[e("h2",{class:"text-5xl font-black mb-4 text-white",children:"Choose Your Program"}),e("p",{class:"text-xl text-gray-400",children:"Select the package that fits your goals"})]}),e("div",{class:"flex justify-center gap-4 mb-12",children:[e("button",{onclick:"switchProgramType('youth')",id:"youthProgramBtn",class:"px-8 py-4 rounded-full font-bold text-lg transition bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg",children:"Youth Programs (Ages 10-17)"}),e("button",{onclick:"switchProgramType('masterclass')",id:"masterclassProgramBtn",class:"px-8 py-4 rounded-full font-bold text-lg transition bg-gray-800 text-gray-400 hover:bg-gray-700",children:"Masterclass (Ages 16+)"})]}),e("div",{id:"youthProgramsContent",class:"grid md:grid-cols-2 gap-8",children:[e("div",{class:"bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-2 border-blue-500/30 rounded-2xl p-8 hover:border-blue-500 transition cursor-pointer",onclick:"window.location.href='/pricing'",children:[e("div",{class:"flex items-center justify-between mb-4",children:[e("span",{class:"bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold",children:"LAUNCH OFFER"}),e("span",{class:"text-sm text-gray-400 line-through",children:"$1,200"})]}),e("h3",{class:"text-3xl font-black mb-2 text-white",children:"Starter Workshop"}),e("div",{class:"text-5xl font-black text-blue-400 mb-2",children:"$695"}),e("p",{class:"text-green-400 font-semibold mb-6",children:"Save $505 (42% off)"}),e("ul",{class:"space-y-3 text-gray-300 mb-8",children:[e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-blue-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"3 In-Person Workshops"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Hands-on learning sessions"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-blue-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"1-on-1 Personalized Session"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Individual coaching & feedback"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-blue-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Complimentary Photo Session"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"$395 value included"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-blue-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Digital Gallery"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"All your best shots delivered"})]})]})]}),e("button",{class:"w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition",children:"Enroll in Starter Workshop →"})]}),e("div",{class:"bg-gradient-to-br from-orange-900/30 to-orange-800/20 border-2 border-orange-500 rounded-2xl p-8 hover:border-orange-400 transition cursor-pointer relative",onclick:"window.location.href='/pricing'",children:[e("div",{class:"absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg",children:"BEST VALUE"}),e("div",{class:"flex items-center justify-between mb-4 mt-4",children:[e("span",{class:"bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold",children:"LAUNCH OFFER"}),e("span",{class:"text-sm text-gray-400 line-through",children:"$4,500"})]}),e("h3",{class:"text-3xl font-black mb-2 text-white",children:"Year-Long Accelerator"}),e("div",{class:"text-5xl font-black text-orange-400 mb-2",children:"$1,995"}),e("p",{class:"text-green-400 font-semibold mb-6",children:"Save $2,505 (56% off)"}),e("ul",{class:"space-y-3 text-gray-300 mb-8",children:[e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-orange-400 text-xl",children:"✓"}),e("span",{children:e("strong",{children:"Everything in Starter"})})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-orange-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"12 Months On-Demand 1-on-1 Coaching"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Unlimited questions & feedback"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-orange-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Full Year Membership Access"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"All workshops & resources"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-orange-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Portfolio Development"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Build a pro portfolio"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-orange-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Free Equipment Rental"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"For personal projects"})]})]})]}),e("button",{class:"w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition shadow-lg",children:"Enroll in Accelerator →"})]})]}),e("div",{id:"masterclassProgramsContent",class:"hidden grid md:grid-cols-2 gap-8",children:[e("div",{class:"bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-2 border-purple-500/30 rounded-2xl p-8 hover:border-purple-500 transition cursor-pointer",onclick:"window.location.href='/pricing'",children:[e("div",{class:"flex items-center justify-between mb-4",children:e("span",{class:"bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold",children:"TEENS & ADULTS"})}),e("h3",{class:"text-3xl font-black mb-2 text-white",children:"Masterclass Coaching"}),e("div",{class:"text-5xl font-black text-purple-400 mb-2",children:"$695"}),e("p",{class:"text-gray-400 mb-6",children:"2 Strategic Sessions"}),e("ul",{class:"space-y-3 text-gray-300 mb-8",children:[e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-purple-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"2 Strategic Coaching Sessions"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Deep-dive with award-winning photographers"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-purple-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Portfolio Review & Feedback"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Professional critique & strategies"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-purple-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Business Strategy Consultation"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Pricing, marketing, client acquisition"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-purple-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"$695 Credit Towards Business in a Box"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Apply full amount to complete program"})]})]})]}),e("button",{class:"w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 rounded-xl transition",children:"Book Strategic Sessions →"})]}),e("div",{class:"bg-gradient-to-br from-red-900/30 to-red-800/20 border-2 border-red-500 rounded-2xl p-8 hover:border-red-400 transition cursor-pointer relative",onclick:"window.location.href='/pricing'",children:[e("div",{class:"absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg",children:"PRO PROGRAM"}),e("div",{class:"flex items-center justify-between mb-4 mt-4",children:e("span",{class:"bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold",children:"AGES 16+"})}),e("h3",{class:"text-3xl font-black mb-2 text-white",children:"Business in a Box"}),e("div",{class:"text-5xl font-black text-red-400 mb-2",children:"$3,000"}),e("p",{class:"text-gray-400 mb-6",children:"Zero to Wedding Pro Program"}),e("ul",{class:"space-y-3 text-gray-300 mb-8",children:[e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-red-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Shoot Your First Wedding Confidently"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Complete technical & creative training"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-red-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Build Your Brand from Scratch"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Identity, website, marketing materials"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-red-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Legal & Business Setup"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Contracts, LLC, insurance, taxes"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-red-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Equipment Mastery"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Cameras, lenses, lighting, backup gear"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-red-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"$695 Credit Applied from Masterclass"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Effective price $2,305 when upgrading"})]})]})]}),e("button",{class:"w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 rounded-xl transition shadow-lg",children:"Launch Your Business →"})]})]}),e("p",{class:"text-center text-gray-500 text-sm mt-12",children:"Limited time launch pricing • Only available for first 20 families"})]})}),e("div",{id:"comingSoonModal",class:"fixed inset-0 bg-black/95 z-[200] hidden flex items-center justify-center p-4",children:e("div",{class:"bg-white rounded-3xl max-w-2xl w-full p-12 relative",children:[e("button",{onclick:"closeComingSoonModal()",class:"absolute top-6 right-6 text-gray-400 hover:text-black text-4xl font-light transition",children:"×"}),e("div",{class:"text-center mb-8",children:[e("h2",{class:"text-4xl font-bold mb-4",style:"color: #3D3935;",id:"comingSoonTitle",children:"Coming Soon!"}),e("p",{class:"text-xl text-gray-600 leading-relaxed",children:"We're busy building this amazing experience for you! It will be ready shortly."}),e("p",{class:"text-lg text-gray-600 mt-4",children:"Please reach out if you're interested in any of these services and we'll get back to you promptly."})]}),e("form",{id:"comingSoonForm",class:"space-y-6",children:[e("div",{children:[e("label",{class:"block text-sm font-medium text-gray-700 mb-2",children:"Name"}),e("input",{type:"text",id:"csName",required:!0,class:"w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none",placeholder:"Your full name"})]}),e("div",{children:[e("label",{class:"block text-sm font-medium text-gray-700 mb-2",children:"Email"}),e("input",{type:"email",id:"csEmail",required:!0,class:"w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none",placeholder:"your@email.com"})]}),e("div",{children:[e("label",{class:"block text-sm font-medium text-gray-700 mb-2",children:"Message"}),e("textarea",{id:"csMessage",required:!0,rows:"4",class:"w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none",placeholder:"Tell us about your project..."})]}),e("button",{type:"submit",class:"w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg hover:shadow-2xl transition transform hover:scale-105",children:"Send Inquiry"})]}),e("div",{id:"csSuccessMessage",class:"hidden mt-6 p-4 bg-green-100 text-green-800 rounded-lg text-center",children:"✅ Thank you! We'll get back to you within 24 hours."})]})}),e("script",{dangerouslySetInnerHTML:{__html:`
        function openEducationModal() {
          document.getElementById('educationProgramsModal').classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }

        function closeEducationProgramsModal() {
          document.getElementById('educationProgramsModal').classList.add('hidden');
          document.body.style.overflow = 'auto';
        }

        // Coming Soon Modal Functions
        function openComingSoonModal(serviceName) {
          document.getElementById('comingSoonTitle').textContent = serviceName + ' - Coming Soon!';
          document.getElementById('comingSoonModal').classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }

        function closeComingSoonModal() {
          document.getElementById('comingSoonModal').classList.add('hidden');
          document.body.style.overflow = 'auto';
          document.getElementById('comingSoonForm').reset();
          document.getElementById('csSuccessMessage').classList.add('hidden');
        }

        // Handle Coming Soon Form Submission
        document.addEventListener('DOMContentLoaded', function() {
          const csForm = document.getElementById('comingSoonForm');
          if (csForm) {
            csForm.addEventListener('submit', async function(e) {
              e.preventDefault();
              
              const name = document.getElementById('csName').value;
              const email = document.getElementById('csEmail').value;
              const message = document.getElementById('csMessage').value;
              const service = document.getElementById('comingSoonTitle').textContent;
              
              try {
                const response = await fetch('/api/coming-soon-inquiry', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name, email, message, service })
                });
                
                if (response.ok) {
                  document.getElementById('csSuccessMessage').classList.remove('hidden');
                  csForm.reset();
                  setTimeout(() => closeComingSoonModal(), 3000);
                } else {
                  alert('Error sending inquiry. Please email info@acromatico.com directly.');
                }
              } catch (error) {
                alert('Error sending inquiry. Please email info@acromatico.com directly.');
              }
            });
          }
        });

        function switchProgramType(type) {
          const youthBtn = document.getElementById('youthProgramBtn');
          const masterclassBtn = document.getElementById('masterclassProgramBtn');
          const youthContent = document.getElementById('youthProgramsContent');
          const masterclassContent = document.getElementById('masterclassProgramsContent');

          if (type === 'youth') {
            youthBtn.className = 'px-8 py-4 rounded-full font-bold text-lg transition bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg';
            masterclassBtn.className = 'px-8 py-4 rounded-full font-bold text-lg transition bg-gray-800 text-gray-400 hover:bg-gray-700';
            youthContent.classList.remove('hidden');
            masterclassContent.classList.add('hidden');
          } else {
            masterclassBtn.className = 'px-8 py-4 rounded-full font-bold text-lg transition bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg';
            youthBtn.className = 'px-8 py-4 rounded-full font-bold text-lg transition bg-gray-800 text-gray-400 hover:bg-gray-700';
            masterclassContent.classList.remove('hidden');
            youthContent.classList.add('hidden');
          }
        }
      `}})]}),{title:"Acromatico - Learn to See The World Differently"}));w.get("/masterclass",t=>t.render(e("div",{class:"min-h-screen bg-black text-white",children:[e("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}),e(sr,{}),e("section",{class:"relative py-32 px-6 overflow-hidden",children:e("div",{class:"max-w-7xl mx-auto text-center",children:[e("h1",{class:"text-8xl md:text-9xl font-black mb-8",style:"letter-spacing: -0.02em; background: linear-gradient(135deg, #4794A6 0%, #fff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;",children:"Masterclass."}),e("p",{class:"text-3xl md:text-4xl text-gray-400 mb-6 max-w-4xl mx-auto",children:["Strategic coaching and complete business training",e("br",{}),"for serious photographers."]}),e("p",{class:"text-xl text-gray-500 mb-12 max-w-3xl mx-auto",children:"Perfect for all ages—from kids seeking professional guidance to adults launching their photography business."}),e("a",{href:"#programs",class:"inline-block px-12 py-6 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white font-bold text-xl transition-all",children:"Explore Programs"})]})}),e("section",{id:"programs",class:"relative py-20 px-6",children:e("div",{class:"max-w-7xl mx-auto",children:[e("div",{class:"grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20",children:[e("div",{class:"relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 border-2 border-[#4794A6]/30 hover:border-[#4794A6] transition-all duration-300 group hover:-translate-y-2",children:[e("div",{class:"absolute top-8 right-8",children:e("span",{class:"inline-block bg-[#4794A6] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider",children:"STARTER"})}),e("h3",{class:"text-4xl font-bold mb-4",children:"Masterclass Coaching"}),e("div",{class:"text-6xl font-black mb-2 text-[#4794A6]",children:"$695"}),e("p",{class:"text-gray-400 text-lg mb-8",children:"Strategic sessions with award-winning photographers"}),e("ul",{class:"space-y-4 mb-10",children:[e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Mentorship for All Ages"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"2 Strategic Coaching Sessions"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Portfolio Review & Feedback"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Equipment Review"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Brand Guidance"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Business Strategy Consultation"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"$695 Credit Toward Business in a Box"})]})]}),e("a",{href:"mailto:hello@acromatico.com?subject=Masterclass%20Coaching%20Inquiry",class:"block w-full py-5 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-center font-bold text-lg transition-all",children:"Start with Coaching"})]}),e("div",{class:"relative bg-gradient-to-br from-white to-gray-100 rounded-3xl p-12 border-2 border-white hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 text-black",children:[e("div",{class:"absolute top-8 right-8",children:e("span",{class:"inline-block bg-black text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider",children:"PRO PROGRAM"})}),e("h3",{class:"text-4xl font-bold mb-4",children:"Business in a Box"}),e("div",{class:"text-6xl font-black mb-2",children:"$3,000"}),e("p",{class:"text-gray-600 text-lg mb-8",children:"Complete wedding photography business training"}),e("ul",{class:"space-y-4 mb-10",children:[e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-black flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg font-semibold",children:"Everything in Coaching, plus:"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-black flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Mentorship for All Ages"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-black flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Complete Wedding/Portrait/Commercial Training"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-black flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"AI Tools"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-black flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Brand Guidance"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-black flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Photography Workflow (Booking to Delivery)"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-black flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Business Plan & Marketing Strategy"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-black flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Legal & Business Guidance"})]})]}),e("a",{href:"mailto:hello@acromatico.com?subject=Business%20in%20a%20Box%20Inquiry",class:"block w-full py-5 rounded-full bg-black hover:bg-gray-800 text-white text-center font-bold text-lg transition-all",children:"Go All-In"})]})]}),e("div",{class:"max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 border-2 border-gray-800",children:[e("h3",{class:"text-4xl font-bold text-center mb-12",children:"Compare Programs"}),e("div",{class:"space-y-1",children:[e("div",{class:"grid grid-cols-3 gap-4 pb-4 border-b-2 border-gray-800 mb-4",children:[e("div",{class:"font-bold text-lg",children:"What's Included"}),e("div",{class:"font-bold text-lg text-center",children:"Coaching"}),e("div",{class:"font-bold text-lg text-center",children:"Business Box"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Mentorship for All Ages"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Strategic Coaching Sessions"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Portfolio Review & Feedback"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Equipment Review"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Brand Guidance"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Business Strategy Consultation"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Complete Photography Training"}),e("div",{class:"text-center text-gray-600",children:"—"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"AI Tools"}),e("div",{class:"text-center text-gray-600",children:"—"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Photography Workflow System"}),e("div",{class:"text-center text-gray-600",children:"—"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Business Plan & Financials"}),e("div",{class:"text-center text-gray-600",children:"—"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Marketing & Client Acquisition"}),e("div",{class:"text-center text-gray-600",children:"—"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Legal & Business Guidance"}),e("div",{class:"text-center text-gray-600",children:"—"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-6 mt-4 bg-gradient-to-r from-gray-900 to-black rounded-xl",children:[e("div",{class:"font-bold text-xl",children:"Investment"}),e("div",{class:"text-center font-bold text-2xl text-[#4794A6]",children:"$695"}),e("div",{class:"text-center font-bold text-2xl",children:"$3,000"})]})]})]}),e("div",{class:"text-center mt-20",children:[e("h3",{class:"text-4xl font-bold mb-6",children:"Ready to launch your photography business?"}),e("p",{class:"text-xl text-gray-400 mb-10",children:"Join photographers who have transformed their passion into a thriving business."}),e("div",{class:"flex flex-col sm:flex-row gap-4 justify-center",children:[e("a",{href:"mailto:hello@acromatico.com?subject=Masterclass%20Coaching%20Inquiry",class:"px-10 py-5 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white font-bold text-lg transition-all inline-block",children:"Start with Coaching - $695"}),e("a",{href:"mailto:hello@acromatico.com?subject=Business%20in%20a%20Box%20Inquiry",class:"px-10 py-5 rounded-full bg-white hover:bg-gray-100 text-black font-bold text-lg transition-all inline-block",children:"Go All-In - $3,000"})]})]})]})}),e("div",{dangerouslySetInnerHTML:{__html:_t}})]}),{title:"Masterclass - Acromatico"}));w.get("/api/health",t=>t.json({status:"healthy",timestamp:new Date().toISOString(),database:"connected"}));w.get("/api/db-test",async t=>{try{const r=await t.env.DB.prepare("SELECT 1 as test").first();return t.json({status:"success",message:"Database connection successful",result:r})}catch(r){return t.json({status:"error",message:r.message},500)}});w.get("/academy",t=>t.render(e("div",{class:"min-h-screen bg-black text-white",children:[e(sr,{}),e("section",{class:"pt-32 pb-16 text-center",children:e("div",{class:"max-w-4xl mx-auto px-6",children:[e("h1",{class:"text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent",children:"Your 12-Month Creative Journey"}),e("p",{class:"text-xl md:text-2xl text-gray-300 mb-8",children:"From camera-curious beginner to confident visual storyteller."}),e("a",{href:"/pricing",class:"inline-block px-10 py-4 rounded-full font-bold text-lg bg-teal-500 hover:bg-teal-600 transition",children:"Start Your Journey →"})]})}),e("section",{class:"py-20 bg-gradient-to-b from-black to-gray-900",children:e("div",{class:"max-w-6xl mx-auto px-6",children:e("div",{class:"grid md:grid-cols-2 gap-12 items-center",children:[e("div",{children:[e("div",{class:"text-teal-500 font-bold text-sm mb-2",children:"MONTH 1 • JANUARY"}),e("h2",{class:"text-4xl md:text-5xl font-black mb-6",children:"Finding Your Eye"}),e("p",{class:"text-lg text-gray-300 mb-4",children:[e("strong",{class:"text-white",children:"Imagine your child picking up a camera"})," and instinctively knowing exactly where to stand, what to frame, and when to press the shutter."]}),e("p",{class:"text-lg text-gray-300 mb-4",children:["Through the ",e("strong",{class:"text-white",children:"Rule of Thirds"})," and ",e("strong",{class:"text-white",children:"Leading Lines"}),", they learn why some photos feel balanced and others feel chaotic."]}),e("p",{class:"text-lg text-teal-400 font-semibold",children:"By the end of January, they won't just take photos — they'll compose them like a professional."})]}),e("div",{class:"relative",children:e("img",{src:"/static/images/curriculum/january-vintage-camera.jpg",alt:"Vintage Camera",class:"rounded-2xl shadow-2xl w-full"})})]})})}),e("section",{class:"py-20 bg-gray-900",children:e("div",{class:"max-w-6xl mx-auto px-6",children:e("div",{class:"grid md:grid-cols-2 gap-12 items-center",children:[e("div",{class:"order-2 md:order-1 relative",children:e("img",{src:"/static/images/curriculum/february-beach-boardwalk.jpg",alt:"Beach Boardwalk",class:"rounded-2xl shadow-2xl w-full"})}),e("div",{class:"order-1 md:order-2",children:[e("div",{class:"text-blue-500 font-bold text-sm mb-2",children:"MONTH 2 • FEBRUARY"}),e("h2",{class:"text-4xl md:text-5xl font-black mb-6",children:"Light & Shadow"}),e("p",{class:"text-lg text-gray-300 mb-4",children:[e("strong",{class:"text-white",children:"Photography is painting with light."})," And in February, your child becomes the artist."]}),e("p",{class:"text-lg text-gray-300 mb-4",children:["They'll learn why the ",e("strong",{class:"text-blue-400",children:"Golden Hour"})," makes everything look cinematic. Why shadows aren't mistakes, but tools for drama and depth."]}),e("p",{class:"text-lg text-blue-400 font-semibold",children:"Your child won't just take photos anymore. They'll chase the light."})]})]})})}),e("section",{class:"py-20 bg-gradient-to-b from-gray-900 to-black",children:e("div",{class:"max-w-6xl mx-auto px-6",children:e("div",{class:"grid md:grid-cols-2 gap-12 items-center",children:[e("div",{children:[e("div",{class:"text-purple-500 font-bold text-sm mb-2",children:"MONTH 3 • MARCH"}),e("h2",{class:"text-4xl md:text-5xl font-black mb-6",children:"Video Basics"}),e("p",{class:"text-lg text-gray-300 mb-4",children:[e("strong",{class:"text-white",children:"Still photos capture a moment."})," Video tells the whole story."]}),e("p",{class:"text-lg text-gray-300 mb-4",children:["In March, your child discovers ",e("strong",{class:"text-purple-400",children:"the power of motion"})," — how to make viewers feel like they're right there in the scene."]}),e("p",{class:"text-lg text-purple-400 font-semibold",children:`By the end of March, they'll be creating mini-movies that make you say "How did my kid do that?"`})]}),e("div",{class:"relative",children:e("img",{src:"/static/images/curriculum/march-mountain-photographer.jpg",alt:"Mountain Photographer",class:"rounded-2xl shadow-2xl w-full"})})]})})}),e("section",{class:"py-20 bg-black",children:e("div",{class:"max-w-6xl mx-auto px-6",children:e("div",{class:"grid md:grid-cols-2 gap-12 items-center",children:[e("div",{class:"order-2 md:order-1 relative",children:e("img",{src:"/static/images/curriculum/april-mom-child-beach.jpg",alt:"Mother and Child",class:"rounded-2xl shadow-2xl w-full"})}),e("div",{class:"order-1 md:order-2",children:[e("div",{class:"text-teal-500 font-bold text-sm mb-2",children:"MONTH 4 • APRIL"}),e("h2",{class:"text-4xl md:text-5xl font-black mb-6",children:"Portrait Photography"}),e("p",{class:"text-lg text-gray-300 mb-4",children:[e("strong",{class:"text-white",children:"People aren't just subjects."})," They're stories waiting to be told."]}),e("p",{class:"text-lg text-gray-300 mb-4",children:["In April, your child learns the art of ",e("strong",{class:"text-teal-400",children:"connection"})," — how to capture genuine smiles and personality."]}),e("p",{class:"text-lg text-teal-400 font-semibold",children:"Your child will become the family photographer everyone requests."})]})]})})}),e("section",{class:"py-20 bg-gradient-to-b from-black to-gray-900",children:e("div",{class:"max-w-6xl mx-auto px-6",children:e("div",{class:"grid md:grid-cols-2 gap-12 items-center",children:[e("div",{children:[e("div",{class:"text-blue-500 font-bold text-sm mb-2",children:"MONTH 5 • MAY"}),e("h2",{class:"text-4xl md:text-5xl font-black mb-6",children:"Street Photography"}),e("p",{class:"text-lg text-gray-300 mb-4",children:[e("strong",{class:"text-white",children:"The world is your canvas."})," And May is when your child learns to capture it."]}),e("p",{class:"text-lg text-gray-300 mb-4",children:[e("strong",{class:"text-blue-400",children:"Street photography"})," is all about ",e("strong",{class:"text-white",children:"decisive moments"})," — finding beauty in the everyday."]}),e("p",{class:"text-lg text-blue-400 font-semibold",children:"After May, every walk becomes a photo adventure."})]}),e("div",{class:"relative",children:e("img",{src:"/static/images/curriculum/may-chicago-skyline.jpg",alt:"Chicago Skyline",class:"rounded-2xl shadow-2xl w-full"})})]})})}),e("section",{class:"py-20 bg-gradient-to-r from-teal-900 via-cyan-900 to-teal-900",children:e("div",{class:"max-w-4xl mx-auto px-6 text-center",children:[e("div",{class:"text-teal-400 font-bold text-sm mb-2",children:"MONTH 6 • JUNE"}),e("h2",{class:"text-5xl md:text-6xl font-black mb-8",children:"Photo Essay Project"}),e("p",{class:"text-2xl text-gray-200 mb-8",children:["This is it. ",e("strong",{class:"text-white",children:"The big reveal."})]}),e("p",{class:"text-lg text-gray-300 mb-4",children:["Every student completes their ",e("strong",{class:"text-teal-400",children:"first photo essay"})," — a real, start-to-finish project that tells a story they care about."]}),e("p",{class:"text-xl text-teal-300 font-bold mt-8",children:"They present it to family and friends. 📸"})]})}),e("section",{class:"py-32 bg-black relative overflow-hidden",children:[e("div",{class:"max-w-4xl mx-auto px-6 text-center relative z-10",children:[e("h2",{class:"text-5xl md:text-6xl font-black mb-6",children:["Ready to Start",e("br",{}),"This Journey?"]}),e("p",{class:"text-xl text-gray-400 mb-8",children:"Join thousands of young creators learning to see differently."}),e("div",{class:"flex flex-col sm:flex-row gap-4 justify-center",children:[e("a",{href:"/checkout",class:"bg-teal-500 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-teal-400 transition inline-block text-center shadow-2xl hover:shadow-teal-500/50",children:"Enroll Now"}),e("a",{href:"#pricing",class:"border-2 border-teal-500 text-teal-500 px-10 py-5 rounded-full text-xl font-bold hover:bg-teal-500/10 transition inline-block text-center",children:"View Pricing"})]}),e("p",{class:"text-sm text-gray-500 mt-8",children:"Monthly from $79/student • Cancel anytime"})]}),e("div",{class:"absolute inset-0 opacity-10",children:[e("div",{class:"absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full filter blur-3xl"}),e("div",{class:"absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl"})]})]}),e("section",{class:"py-20 bg-black",children:e("div",{class:"max-w-6xl mx-auto px-6",children:e("div",{class:"grid md:grid-cols-2 gap-12 items-center",children:[e("div",{children:[e("div",{class:"text-teal-500 font-bold text-sm mb-2",children:"MONTH 7 • SEPTEMBER"}),e("h2",{class:"text-4xl md:text-5xl font-black mb-6",children:"Advanced Composition"}),e("p",{class:"text-lg text-gray-300 mb-4",children:[e("strong",{class:"text-white",children:"Now that they know the rules..."})," it's time to break them."]}),e("p",{class:"text-lg text-gray-300 mb-4",children:["September is where ",e("strong",{class:"text-teal-400",children:"creativity gets unleashed"}),". Negative space, unconventional framing, artistic choices."]}),e("p",{class:"text-lg text-teal-400 font-semibold",children:"Your child will develop their own unique style."})]}),e("div",{class:"relative",children:e("img",{src:"/static/images/curriculum/september-advanced-composition.jpg",alt:"Advanced Composition",class:"rounded-2xl shadow-2xl w-full"})})]})})}),e("section",{class:"py-20 bg-gray-900",children:e("div",{class:"max-w-6xl mx-auto px-6",children:e("div",{class:"grid md:grid-cols-2 gap-12 items-center",children:[e("div",{class:"order-2 md:order-1 relative",children:e("img",{src:"/static/images/curriculum/october-video-editing.jpg",alt:"Video Editing Timeline",class:"rounded-2xl shadow-2xl w-full"})}),e("div",{class:"order-1 md:order-2",children:[e("div",{class:"text-blue-500 font-bold text-sm mb-2",children:"MONTH 8 • OCTOBER"}),e("h2",{class:"text-4xl md:text-5xl font-black mb-6",children:"Photo Editing Mastery"}),e("p",{class:"text-lg text-gray-300 mb-4",children:[e("strong",{class:"text-white",children:"Great photos are made twice."})," Once in-camera. Once in post-production."]}),e("p",{class:"text-lg text-gray-300 mb-4",children:["In October, your child learns ",e("strong",{class:"text-blue-400",children:"professional editing techniques"})," using Lightroom."]}),e("p",{class:"text-lg text-blue-400 font-semibold",children:"They'll turn good photos into great ones."})]})]})})}),e("section",{class:"py-20 bg-gradient-to-b from-gray-900 to-black",children:e("div",{class:"max-w-6xl mx-auto px-6",children:e("div",{class:"grid md:grid-cols-2 gap-12 items-center",children:[e("div",{children:[e("div",{class:"text-teal-500 font-bold text-sm mb-2",children:"MONTH 9 • NOVEMBER"}),e("h2",{class:"text-4xl md:text-5xl font-black mb-6",children:"Portfolio Building"}),e("p",{class:"text-lg text-gray-300 mb-4",children:e("strong",{class:"text-white",children:"A year's worth of work deserves to be seen."})}),e("p",{class:"text-lg text-gray-300 mb-4",children:["In November, your child learns to ",e("strong",{class:"text-teal-400",children:"curate like a gallery curator"})," — selecting their strongest work."]}),e("p",{class:"text-lg text-teal-400 font-semibold",children:"Your child will have a professional portfolio they can be proud of."})]}),e("div",{class:"relative",children:e("img",{src:"/static/images/curriculum/november-portfolio-collage.jpg",alt:"Professional Portfolio Collage",class:"rounded-2xl shadow-2xl w-full"})})]})})}),e("section",{class:"py-20 bg-black",children:e("div",{class:"max-w-4xl mx-auto px-6 text-center",children:[e("div",{class:"text-teal-400 font-bold text-sm mb-2",children:"MONTH 10 • DECEMBER"}),e("h2",{class:"text-5xl md:text-6xl font-black mb-8",children:"Year-End Showcase"}),e("p",{class:"text-2xl text-gray-200 mb-8",children:[e("strong",{class:"text-white",children:"This is the moment."})," The celebration. The standing ovation."]}),e("p",{class:"text-lg text-gray-300 mb-4",children:["The ",e("strong",{class:"text-teal-400",children:"Year-End Showcase"})," is their moment to shine — presenting their best work to everyone who matters."]}),e("p",{class:"text-xl text-teal-300 font-bold mt-8",children:"Imagine your child standing in front of everyone, sharing their creative journey. 🎉"})]})}),e("section",{class:"py-32 bg-black text-center",children:e("div",{class:"max-w-4xl mx-auto px-6",children:[e("h2",{class:"text-5xl md:text-6xl font-black mb-6",children:"Ready to Start This Journey?"}),e("p",{class:"text-2xl text-gray-300 mb-12",children:"10 transformative months. 80 micro-learning sessions. 1 incredible creative journey."}),e("a",{href:"/pricing",class:"inline-block px-12 py-6 rounded-full text-xl font-bold text-white transition shadow-2xl",style:"background: #4794A6;",children:"Enroll Now"}),e("p",{class:"mt-8 text-sm text-gray-400",children:"30-minute sessions • Expert-led instruction • Lifetime access to all teachings"})]})}),e("footer",{class:"bg-gray-900 py-16 border-t border-white/10",children:e("div",{class:"max-w-7xl mx-auto px-6 text-center",children:e("p",{class:"text-gray-400 text-sm",children:"© 2026 Acromatico. Built for creators, by creators."})})}),e("div",{id:"enrollment-modal",class:"fixed inset-0 bg-black/95 z-[100] hidden flex items-center justify-center p-4",children:e("div",{class:"max-w-2xl w-full",children:[e("div",{class:"mb-8",children:[e("div",{class:"flex justify-between mb-2 text-sm text-gray-400",children:[e("span",{id:"step-label",children:"Step 1 of 3"}),e("span",{id:"step-percentage",children:"33%"})]}),e("div",{class:"h-2 bg-gray-800 rounded-full overflow-hidden",children:e("div",{id:"progress-bar",class:"h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-500",style:"width: 33%"})})]}),e("div",{id:"step-1",class:"step-content",children:[e("h2",{class:"text-5xl font-black mb-4",children:"Create Your Free Account"}),e("p",{class:"text-xl text-gray-400 mb-8",children:"Get started in seconds - no credit card required"}),e("div",{class:"space-y-6",children:[e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"Parent Email"}),e("input",{type:"email",id:"parent-email",placeholder:"your@email.com",class:"w-full px-6 py-4 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-teal-500 focus:outline-none text-lg"})]}),e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"Create Password"}),e("input",{type:"password",id:"parent-password",placeholder:"Min 8 characters",class:"w-full px-6 py-4 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-teal-500 focus:outline-none text-lg"}),e("p",{class:"text-xs text-gray-500 mt-2",children:"Minimum 8 characters (letters, numbers, or symbols)"})]}),e("button",{onclick:"goToStep(2)",class:"btn-primary w-full px-8 py-5 rounded-full text-xl font-bold",style:"background: #4794A6;",children:"Continue →"})]}),e("div",{class:"mt-8 pt-8 border-t border-white/10",children:[e("div",{class:"flex items-center justify-center gap-3 text-sm text-gray-400",children:[e("svg",{class:"w-5 h-5 text-green-500",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("span",{class:"font-medium",children:"256-bit SSL Encryption"}),e("span",{class:"text-gray-600",children:"•"}),e("span",{children:"Your data is secure"})]}),e("p",{class:"text-center text-xs text-gray-500 mt-2",children:"We use industry-standard encryption (AES-256) and secure password hashing (bcrypt) to protect your information."})]})]}),e("div",{id:"step-2",class:"step-content hidden",children:[e("button",{onclick:"goToStep(1)",class:"text-gray-400 hover:text-white mb-3 flex items-center gap-2 text-sm",children:"← Back"}),e("h2",{class:"text-3xl font-black mb-2 text-center",children:"How Many Students?"}),e("p",{class:"text-base text-gray-400 mb-8 text-center",children:"Slide to see your savings"}),e("div",{class:"text-center mb-8",children:[e("div",{class:"text-8xl font-black mb-2",id:"big-price-display",children:"$12.50"}),e("div",{class:"text-xl text-gray-400",children:"per class per student"}),e("div",{class:"text-sm text-gray-500 mt-2",id:"student-count-text",children:"1 student • 8 live classes"})]}),e("div",{class:"mb-8 px-4",children:[e("div",{class:"flex justify-between items-center mb-3",children:[e("span",{class:"text-sm text-gray-400",children:"Number of Students"}),e("span",{class:"text-2xl font-bold text-white",id:"slider-number",children:"1"})]}),e("style",{dangerouslySetInnerHTML:{__html:`
                #student-slider::-webkit-slider-thumb {
                  appearance: none;
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background: #4794A6;
                  cursor: pointer;
                  border: 4px solid white;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  transition: transform 0.2s;
                }
                #student-slider::-webkit-slider-thumb:hover {
                  transform: scale(1.1);
                }
                #student-slider::-moz-range-thumb {
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background: #4794A6;
                  cursor: pointer;
                  border: 4px solid white;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  transition: transform 0.2s;
                }
                #student-slider::-moz-range-thumb:hover {
                  transform: scale(1.1);
                }
              `}}),e("input",{type:"range",id:"student-slider",min:"1",max:"6",value:"1",oninput:"updateSlider(this.value)",class:"w-full h-3 bg-gray-800 rounded-full appearance-none cursor-pointer",style:"background: linear-gradient(to right, #4794A6 0%, #4794A6 0%, #1f2937 0%, #1f2937 100%);"}),e("div",{class:"flex justify-between text-xs text-gray-500 mt-2",children:[e("span",{children:"1"}),e("span",{children:"2"}),e("span",{children:"3"}),e("span",{children:"4"}),e("span",{children:"5"}),e("span",{children:"6+"})]})]}),e("div",{class:"flex flex-col gap-4 mb-6",children:[e("div",{class:"flex items-center justify-center gap-2 bg-gray-900 p-2 rounded-full mx-auto",children:[e("button",{id:"per-class-tab-btn",onclick:"switchPricingTab('per-class')",class:"px-4 py-2 rounded-full font-semibold transition text-gray-400 text-sm whitespace-nowrap",children:"Per Class"}),e("button",{id:"monthly-tab-btn",onclick:"switchPricingTab('monthly')",class:"px-4 py-2 rounded-full font-semibold transition bg-teal-500 text-white text-sm",children:"Monthly"}),e("button",{id:"annual-tab-btn",onclick:"switchPricingTab('annual')",class:"px-4 py-2 rounded-full font-semibold transition text-gray-400 text-sm",children:["Annual ",e("span",{class:"text-teal-500 text-xs ml-1",children:"Save 20%"})]})]}),e("div",{id:"per-class-info",class:"text-center hidden",children:[e("p",{class:"text-sm font-semibold text-gray-300 mb-2",children:"Pay as you go"}),e("p",{class:"text-xs text-gray-500 mb-3",children:"No commitment • Book classes individually"}),e("div",{class:"inline-block bg-gray-500/10 border border-gray-500/20 rounded-full px-4 py-2",children:e("span",{class:"text-lg font-bold text-gray-400",id:"per-class-summary",children:"Bulk discounts with monthly/annual"})})]}),e("div",{id:"monthly-info",class:"text-center bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-2xl p-4 border border-teal-500/20",children:[e("p",{class:"text-sm font-semibold text-gray-300 mb-2",children:"Billed monthly • Cancel anytime"}),e("div",{class:"flex items-center justify-center gap-3 mb-2",children:[e("span",{class:"text-2xl line-through text-gray-600",id:"monthly-original-total",children:"$240"}),e("svg",{class:"w-6 h-6 text-teal-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 7l5 5m0 0l-5 5m5-5H6"})}),e("span",{class:"text-4xl font-black text-teal-500",id:"monthly-new-total",children:"$100"}),e("span",{class:"text-base text-gray-400",children:"/month"})]}),e("div",{class:"inline-block bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2",children:e("span",{class:"text-lg font-bold text-green-400",id:"monthly-savings",children:"Save $140/month"})})]}),e("div",{id:"annual-info",class:"text-center bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-2xl p-4 border border-teal-500/20 hidden",children:[e("p",{class:"text-sm font-semibold text-gray-300 mb-2",children:"12 months prepaid • Year-round classes"}),e("div",{class:"flex items-center justify-center gap-3 mb-2",children:[e("span",{class:"text-2xl line-through text-gray-600",id:"annual-original-total",children:"$2,400"}),e("svg",{class:"w-6 h-6 text-teal-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 7l5 5m0 0l-5 5m5-5H6"})}),e("span",{class:"text-4xl font-black text-teal-500",id:"annual-new-total",children:"$800"}),e("span",{class:"text-base text-gray-400",children:"/year"})]}),e("div",{class:"inline-block bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2",children:e("span",{class:"text-lg font-bold text-green-400",id:"annual-savings",children:"Save $1,600/year"})})]})]}),e("div",{class:"feature-card p-4 rounded-xl mt-4",children:[e("h3",{class:"text-base font-bold mb-3 text-center",children:"Everything Included"}),e("div",{class:"grid grid-cols-1 gap-2 text-xs",children:[e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"30-Minute Micro-Learning Sessions"}),e("div",{class:"text-gray-400 text-xs",children:"Perfect for young creators' attention spans - 8 live classes/month (Mon & Thu 11:30 AM ET)"})]})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"Lifetime Instruction Library"}),e("div",{class:"text-gray-400 text-xs",children:"Can't make it live? Catch up on expert-led teachings anytime."})]})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"December Bonus Workshops"}),e("div",{class:"text-gray-400 text-xs",children:"First 2 weeks of December: Special 1-hour fun workshops to celebrate the year!"})]})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"Portfolio Building"}),e("div",{class:"text-gray-400 text-xs",children:"Showcase your child's work and track their creative journey"})]})]})]})]}),e("button",{onclick:"selectPackage(parseInt(document.getElementById('student-slider').value))",class:"w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-full transition text-lg mt-6",children:"Continue to Payment →"})]}),e("div",{id:"step-3",class:"step-content hidden",children:[e("button",{onclick:"goToStep(2)",class:"text-gray-400 hover:text-white mb-4 flex items-center gap-2",children:"← Back"}),e("h2",{class:"text-5xl font-black mb-4",children:"Complete Enrollment"}),e("p",{class:"text-xl text-gray-400 mb-8",children:["You selected ",e("span",{id:"selected-package",class:"text-teal-500"})]}),e("div",{class:"feature-card p-6 rounded-2xl mb-6",children:[e("div",{class:"flex justify-between mb-4",children:[e("span",{class:"text-gray-400",children:"Students"}),e("span",{id:"summary-students",class:"font-bold"})]}),e("div",{class:"flex justify-between mb-4",children:[e("span",{class:"text-gray-400",children:"Price per student"}),e("span",{id:"summary-price",class:"font-bold"})]}),e("div",{class:"flex justify-between pt-4 border-t border-white/10",children:[e("span",{id:"summary-label",class:"text-xl font-bold",children:"Total Today (Prorated)"}),e("span",{id:"summary-total",class:"text-xl font-bold text-teal-500"})]}),e("div",{id:"savings-display",class:"flex justify-between mt-2 hidden",children:[e("span",{class:"text-sm text-gray-400",children:"Annual Savings"}),e("span",{id:"summary-savings",class:"text-sm font-bold text-green-500"})]}),e("p",{id:"billing-note",class:"text-xs text-gray-500 mt-2",children:"*Recurring billing on same date each month/year"})]}),e("div",{class:"feature-card p-6 rounded-2xl mb-6 border-2 border-teal-500/20",children:[e("h3",{class:"text-xl font-bold mb-4 flex items-center gap-2",children:[e("svg",{class:"w-6 h-6 text-teal-500",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z","clip-rule":"evenodd"})}),"Enrollment Agreement"]}),e("div",{class:"bg-gray-900 p-4 rounded-lg max-h-64 overflow-y-auto text-sm mb-4 space-y-3",children:[e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-white",children:"ACROMATICO CREATOR ACADEMY - ENROLLMENT TERMS"}),e("br",{}),"By enrolling in Acromatico Creator Academy programs, you agree to the following terms:"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"1. PROGRAM COMMITMENT"}),e("br",{}),"• 8 live classes per month (Monday & Thursday, 11:30 AM ET)",e("br",{}),"• 30-minute micro-learning sessions designed for youth creators",e("br",{}),"• Access to lifetime instruction library and recorded sessions",e("br",{}),"• Portfolio building tools and creative resources"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"2. PAYMENT TERMS"}),e("br",{}),"• Monthly billing: Charged on the same day each month",e("br",{}),"• Annual billing: 12 months prepaid (year-round classes)",e("br",{}),"• Full month billed on enrollment date; recurring monthly/annually",e("br",{}),"• Payments processed securely via Stripe"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"3. NO REFUND POLICY"}),e("br",{}),"• ",e("strong",{class:"text-white",children:"All class fees are NON-REFUNDABLE once charged"}),e("br",{}),"• Classes cannot be refunded, transferred, or credited",e("br",{}),"• Missed classes: Recordings available in instruction library",e("br",{}),"• No refunds for unused classes or early cancellation",e("br",{}),"• No chargebacks permitted - enrollment is a binding agreement"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"4. CANCELLATION POLICY"}),e("br",{}),"• Monthly: Cancel anytime (effective next billing cycle)",e("br",{}),"• Annual: No refunds on prepaid tuition (non-refundable)",e("br",{}),"• Must cancel before next billing date to avoid charges",e("br",{}),"• Cancellation does not entitle refunds for current period"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"5. CHARGEBACK PROTECTION"}),e("br",{}),"• By signing, you waive rights to initiate chargebacks",e("br",{}),"• Disputes must be handled directly with Acromatico",e("br",{}),"• Unauthorized chargebacks may result in account suspension",e("br",{}),"• You acknowledge receipt of services as described"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"6. ATTENDANCE & CONDUCT"}),e("br",{}),"• Students expected to attend live sessions when possible",e("br",{}),"• Respectful, kind, and collaborative behavior required",e("br",{}),"• ",e("strong",{class:"text-white",children:"Disruptive behaviors include:"})," bullying, inappropriate language, intentionally disrupting class, refusing to participate respectfully, or harassing other students/instructors",e("br",{}),"• ",e("strong",{class:"text-white",children:"Progressive discipline policy:"}),e("br",{}),"  → 1st incident: Verbal warning during class + email to parent",e("br",{}),"  → 2nd incident: Parent discussion call + written warning",e("br",{}),"  → 3rd incident: 1-week suspension from live classes (recordings still available)",e("br",{}),"  → Continued violations: Removal from program with no refund",e("br",{}),"• We work with parents to help students succeed, but safety and respect for all students is our priority",e("br",{}),"• Severe violations (threats, harassment, illegal activity) may result in immediate removal",e("br",{}),"• No refunds for removal due to code of conduct violations"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"7. CONTENT & INTELLECTUAL PROPERTY"}),e("br",{}),"• All course materials remain property of Acromatico",e("br",{}),"• Students retain rights to their created work and photographs",e("br",{}),"• ",e("strong",{class:"text-white",children:"Student Work Showcase:"})," Parents can opt-in via Parent Portal to allow us to showcase student work on social media, website, and marketing materials",e("br",{}),"• ",e("strong",{class:"text-white",children:"Photo Release for Subjects:"})," If students photograph people and wish to submit those images for showcase, a signed photo release from the photographed person (or their parent/guardian if under 18) must be uploaded via Parent Portal",e("br",{}),"• Parents control all consent settings in their dashboard and can revoke permission at any time"]}),e("p",{class:"text-gray-300 leading-relaxed",children:e("strong",{class:"text-white",children:"By signing below, you acknowledge that you have read, understood, and agree to these terms. You confirm that all enrollment fees are non-refundable and that you will not initiate chargebacks or payment disputes."})})]}),e("div",{class:"space-y-4",children:[e("div",{class:"flex gap-4 mb-4",children:[e("button",{id:"type-signature-btn",onclick:"switchSignatureMethod('type')",class:"flex-1 py-2 px-4 rounded-lg bg-teal-500 text-white font-semibold",children:"Type Signature"}),e("button",{id:"draw-signature-btn",onclick:"switchSignatureMethod('draw')",class:"flex-1 py-2 px-4 rounded-lg bg-gray-700 text-gray-300 font-semibold",children:"Draw Signature"})]}),e("div",{id:"type-signature-section",class:"space-y-3",children:[e("input",{type:"text",id:"typed-signature",placeholder:"Type your full name",class:"w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none text-white"}),e("p",{class:"text-xs text-gray-500",children:"By typing your name, you agree to sign this agreement electronically"})]}),e("div",{id:"draw-signature-section",class:"hidden space-y-3",children:[e("div",{class:"border-2 border-gray-700 rounded-lg bg-white",children:e("canvas",{id:"signature-canvas",width:"600",height:"200",class:"w-full cursor-crosshair rounded-lg",style:"touch-action: none;"})}),e("button",{onclick:"clearSignature()",class:"text-sm text-gray-400 hover:text-white",children:"Clear Signature"})]}),e("label",{class:"flex items-start gap-3 cursor-pointer",children:[e("input",{type:"checkbox",id:"agreement-checkbox",class:"mt-1 w-5 h-5 rounded border-gray-700 bg-gray-800 text-teal-500 focus:ring-teal-500 cursor-pointer"}),e("span",{class:"text-sm text-gray-300 leading-relaxed",children:["I have read and agree to the enrollment terms. I understand that all fees are ",e("strong",{class:"text-white",children:"non-refundable"})," and that I will not initiate chargebacks or payment disputes. I acknowledge this is a legally binding agreement."]})]})]})]}),e("style",{dangerouslySetInnerHTML:{__html:`
              @keyframes pulse-glow {
                0%, 100% {
                  box-shadow: 0 0 20px rgba(71, 148, 166, 0.3), 0 0 40px rgba(71, 148, 166, 0.1);
                }
                50% {
                  box-shadow: 0 0 30px rgba(71, 148, 166, 0.5), 0 0 60px rgba(71, 148, 166, 0.2);
                }
              }
              @keyframes gentle-bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-4px); }
              }
              .payment-button-pulse {
                animation: pulse-glow 2s ease-in-out infinite;
              }
              .payment-button-pulse:hover {
                animation: pulse-glow 2s ease-in-out infinite, gentle-bounce 0.6s ease-in-out infinite;
              }
            `}}),e("div",{class:"space-y-4 mb-6",children:[e("button",{onclick:"completeEnrollment()",class:"payment-button-pulse w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-6 px-8 rounded-2xl flex items-center justify-center gap-4 border-2 border-teal-400 transition-all shadow-2xl",id:"stripe-checkout-btn",children:[e("div",{class:"flex items-center gap-3",children:[e("svg",{class:"w-8 h-8",viewBox:"0 0 24 24",fill:"none",children:[e("rect",{x:"3",y:"5",width:"18",height:"14",rx:"2",stroke:"currentColor","stroke-width":"2"}),e("path",{d:"M3 10h18",stroke:"currentColor","stroke-width":"2"})]}),e("div",{class:"text-left",children:[e("div",{class:"text-xl font-bold",children:"Pay with Card"}),e("div",{class:"text-sm text-teal-100 font-normal",children:["Secure payment via Stripe • ",e("span",{id:"stripe-amount",children:"$0"})]})]})]}),e("div",{class:"ml-auto flex items-center gap-2 text-sm",children:[e("span",{class:"inline-flex items-center px-2 py-1 bg-white/20 rounded text-xs text-white",children:"Apple Pay"}),e("span",{class:"inline-flex items-center px-2 py-1 bg-white/20 rounded text-xs text-white",children:"G Pay"}),e("span",{class:"inline-flex items-center px-2 py-1 bg-white/20 rounded text-xs text-white",children:"+more"})]})]}),e("p",{class:"text-xs text-center text-gray-500",children:[e("svg",{class:"w-4 h-4 inline mr-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z","clip-rule":"evenodd"})}),"256-bit SSL Encryption • Your data is secure"]})]})]}),e("button",{onclick:"closeEnrollment()",class:"absolute top-8 right-8 text-gray-400 hover:text-white text-4xl",children:"×"})]})}),e("script",{dangerouslySetInnerHTML:{__html:`
        let currentStep = 1;
        let selectedStudents = 0;
        let selectedPrice = 0;
        let isAnnual = false;
        let pricingMode = 'monthly'; // 'per-class', 'monthly', or 'annual'
        
        // Pricing Constants
        const PER_CLASS_PRICE = 30; // $30 per individual class
        const BASE_MONTHLY_PRICE = 100; // $100/month for 8 classes (was $240)
        const SIBLING_DISCOUNT = 0.05; // 5% off per additional sibling
        const ANNUAL_DISCOUNT = 0.20; // 20% off annual prepaid
        
        function calculatePrice(students, isAnnual) {
          let total = 0;
          
          // Calculate total: if multiple students, everyone gets the sibling discount
          if (students === 1) {
            total = BASE_MONTHLY_PRICE; // $100 for single student
          } else {
            // With siblings, everyone pays discounted rate
            // 2 students = 5% off = $95 each = $190 total
            // 3 students = 10% off = $90 each = $270 total
            const discountRate = (students - 1) * SIBLING_DISCOUNT;
            const pricePerStudent = BASE_MONTHLY_PRICE * (1 - discountRate);
            total = pricePerStudent * students;
          }
          
          // Apply annual discount if selected
          if (isAnnual) {
            total = total * (1 - ANNUAL_DISCOUNT);
          }
          
          return total;
        }

        function openEnrollment() {
          document.getElementById('enrollment-modal').classList.remove('hidden');
          document.body.style.overflow = 'hidden';
          goToStep(1);
        }

        function closeEnrollment() {
          document.getElementById('enrollment-modal').classList.add('hidden');
          document.body.style.overflow = 'auto';
        }

        function goToStep(step) {
          // Validate Step 1 before proceeding to Step 2
          if (currentStep === 1 && step === 2) {
            const email = document.getElementById('parent-email').value.trim();
            const password = document.getElementById('parent-password').value;
            
            // Email validation
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!email || !emailRegex.test(email)) {
              alert('Please enter a valid email address');
              document.getElementById('parent-email').focus();
              return;
            }
            
            // Password validation (min 8 chars only - keep it simple)
            if (!password || password.length < 8) {
              alert('Password must be at least 8 characters long');
              document.getElementById('parent-password').focus();
              return;
            }
          }
          
          // Hide all steps
          document.querySelectorAll('.step-content').forEach(el => el.classList.add('hidden'));
          
          // Show target step
          document.getElementById('step-' + step).classList.remove('hidden');
          
          // Update progress
          currentStep = step;
          const percentage = (step / 3) * 100;
          document.getElementById('progress-bar').style.width = percentage + '%';
          document.getElementById('step-label').textContent = 'Step ' + step + ' of 3';
          document.getElementById('step-percentage').textContent = Math.round(percentage) + '%';
        }

        function switchPricingTab(mode) {
          pricingMode = mode;
          isAnnual = (mode === 'annual');
          
          // Update tab buttons
          const perClassBtn = document.getElementById('per-class-tab-btn');
          const monthlyBtn = document.getElementById('monthly-tab-btn');
          const annualBtn = document.getElementById('annual-tab-btn');
          
          // Reset all buttons
          [perClassBtn, monthlyBtn, annualBtn].forEach(btn => {
            btn.classList.remove('bg-teal-500', 'text-white');
            btn.classList.add('text-gray-400');
          });
          
          // Highlight active tab
          if (mode === 'per-class') {
            perClassBtn.classList.add('bg-teal-500', 'text-white');
            perClassBtn.classList.remove('text-gray-400');
          } else if (mode === 'monthly') {
            monthlyBtn.classList.add('bg-teal-500', 'text-white');
            monthlyBtn.classList.remove('text-gray-400');
          } else {
            annualBtn.classList.add('bg-teal-500', 'text-white');
            annualBtn.classList.remove('text-gray-400');
          }
          
          // Show/hide info sections
          document.getElementById('per-class-info').classList.toggle('hidden', mode !== 'per-class');
          document.getElementById('monthly-info').classList.toggle('hidden', mode !== 'monthly');
          document.getElementById('annual-info').classList.toggle('hidden', mode !== 'annual');
          
          // Update pricing display
          const currentStudents = parseInt(document.getElementById('student-slider').value);
          updateSlider(currentStudents);
        }

        function toggleBilling(type) {
          isAnnual = (type === 'annual');
          
          // Update toggle buttons
          const monthlyBtn = document.getElementById('monthly-toggle-btn');
          const annualBtn = document.getElementById('annual-toggle-btn');
          
          if (isAnnual) {
            monthlyBtn.classList.remove('bg-teal-500', 'text-white');
            monthlyBtn.classList.add('text-gray-400');
            annualBtn.classList.add('bg-teal-500', 'text-white');
            annualBtn.classList.remove('text-gray-400');
          } else {
            monthlyBtn.classList.add('bg-teal-500', 'text-white');
            monthlyBtn.classList.remove('text-gray-400');
            annualBtn.classList.remove('bg-teal-500', 'text-white');
            annualBtn.classList.add('text-gray-400');
          }
          
          // Toggle prices
          document.querySelectorAll('.monthly-price').forEach(el => {
            el.classList.toggle('hidden', isAnnual);
          });
          document.querySelectorAll('.annual-price').forEach(el => {
            el.classList.toggle('hidden', !isAnnual);
          });
          document.querySelectorAll('.annual-savings').forEach(el => {
            el.classList.toggle('hidden', !isAnnual);
          });
          
          // Toggle per-class pricing
          document.querySelectorAll('.monthly-per-class').forEach(el => {
            el.classList.toggle('hidden', isAnnual);
          });
          document.querySelectorAll('.annual-per-class').forEach(el => {
            el.classList.toggle('hidden', !isAnnual);
          });
          
          // Toggle billing notes
          document.querySelectorAll('.monthly-note').forEach(el => {
            el.classList.toggle('hidden', isAnnual);
          });
          document.querySelectorAll('.annual-note').forEach(el => {
            el.classList.toggle('hidden', !isAnnual);
          });
          
          // Update slider display with new pricing
          const currentStudents = parseInt(document.getElementById('student-slider').value);
          updateSlider(currentStudents);
        }

        function updateSlider(students) {
          students = parseInt(students);
          
          // Update slider visual feedback
          const slider = document.getElementById('student-slider');
          const percentage = ((students - 1) / 5) * 100;
          slider.style.background = \`linear-gradient(to right, #4794A6 0%, #4794A6 \${percentage}%, #1f2937 \${percentage}%, #1f2937 100%)\`;
          
          // Update slider number display
          document.getElementById('slider-number').textContent = students + (students >= 6 ? '+' : '');
          
          // Calculate pricing based on mode
          let bigPrice, studentCountText;
          
          if (pricingMode === 'per-class') {
            // Per-class pricing: $30/class
            bigPrice = PER_CLASS_PRICE;
            studentCountText = students + (students >= 6 ? '+' : '') + (students === 1 ? ' student' : ' students');
            // Note: per-class summary text is set in HTML, no need to update dynamically
          } else {
            // Monthly or Annual pricing
            const monthlyTotal = calculatePrice(students, isAnnual);
            const perStudentPerMonth = monthlyTotal / students;
            const perStudentPerClass = perStudentPerMonth / 8;
            
            bigPrice = perStudentPerClass;
            studentCountText = students + (students >= 6 ? '+' : '') + (students === 1 ? ' student' : ' students') + ' • 8 live classes';
            
            // Calculate original price (before discount) and savings
            const originalPerStudent = 30; // Original $30 per class
            const originalMonthlyTotal = originalPerStudent * 8 * students; // $30/class × 8 classes × students = $240/student baseline
            const newMonthlyTotal = monthlyTotal;
            const monthlySavings = originalMonthlyTotal - newMonthlyTotal;
            
            // Update Monthly pricing card
            const monthlyOriginalTotal = document.getElementById('monthly-original-total');
            const monthlyNewTotal = document.getElementById('monthly-new-total');
            const monthlySavingsText = document.getElementById('monthly-savings');
            
            if (monthlyOriginalTotal && monthlyNewTotal && monthlySavingsText) {
              monthlyOriginalTotal.textContent = '$' + originalMonthlyTotal.toFixed(0);
              monthlyNewTotal.textContent = '$' + newMonthlyTotal.toFixed(0);
              monthlySavingsText.textContent = 'Save $' + monthlySavings.toFixed(0) + '/month';
            }
            
            // Calculate Annual pricing (12 months - year-round)
            const annualOriginalTotal = originalMonthlyTotal * 12;
            const annualNewTotal = newMonthlyTotal * 12;
            const annualSavings = annualOriginalTotal - annualNewTotal;
            
            // Update Annual pricing card
            const annualOriginalTotalEl = document.getElementById('annual-original-total');
            const annualNewTotalEl = document.getElementById('annual-new-total');
            const annualSavingsEl = document.getElementById('annual-savings');
            
            if (annualOriginalTotalEl && annualNewTotalEl && annualSavingsEl) {
              annualOriginalTotalEl.textContent = '$' + annualOriginalTotal.toFixed(0);
              annualNewTotalEl.textContent = '$' + annualNewTotal.toFixed(0);
              annualSavingsEl.textContent = 'Save $' + annualSavings.toFixed(0) + '/year';
            }
            
            // Store for payment
            selectedPrice = monthlyTotal;
          }
          
          // Update BIG price display
          document.getElementById('big-price-display').textContent = '$' + bigPrice.toFixed(2);
          
          // Update student count text
          document.getElementById('student-count-text').textContent = studentCountText;
          
          // Auto-select package (for navigation to step 3)
          selectedStudents = students;
        }

        function selectPackage(students) {
          selectedStudents = students;
          
          // Calculate total monthly price with sibling discount
          const monthlyTotal = calculatePrice(students, isAnnual);
          selectedPrice = monthlyTotal; // Store total for later use
          
          let totalCharge, chargeLabel;
          
          if (isAnnual) {
            // Annual: 12 months prepaid (year-round classes including summer/winter)
            totalCharge = monthlyTotal * 12;
            chargeLabel = 'Total Due Today (Annual Prepaid)';
          } else {
            // Monthly: Full month charge, recurring on same date each month
            totalCharge = monthlyTotal;
            chargeLabel = 'First Month Total';
          }
          
          // Calculate savings for display (Annual vs Monthly)
          const yearlySavings = isAnnual ? 
            ((pricingData.monthly[students] * students * 10) - (pricePerStudent * students * 10)) : 0;
          
          // Update summary with clear pricing breakdown
          const billingText = isAnnual ? ' (Annual - 12 months)' : ' (Monthly)';
          const studentText = students + (students > 1 ? ' Students' : ' Student');
          document.getElementById('selected-package').textContent = studentText + billingText;
          document.getElementById('summary-students').textContent = students;
          
          // Show per-month total with discount info
          let priceText = '$' + monthlyTotal.toFixed(0) + '/month';
          if (students > 1) {
            const savingsPercent = Math.round((students - 1) * 10);
            priceText += ' (Save ' + savingsPercent + '% with siblings)';
          }
          if (isAnnual) {
            priceText += ' • 20% off annual';
          }
          document.getElementById('summary-price').textContent = priceText;
          document.getElementById('summary-total').textContent = '$' + totalCharge.toFixed(2);
          
          // Update the label and savings display
          document.getElementById('summary-label').textContent = chargeLabel;
          
          // Update Stripe button amount
          const stripeAmountEl = document.getElementById('stripe-amount');
          if (stripeAmountEl) {
            stripeAmountEl.textContent = '$' + totalCharge.toFixed(2);
          }
          
          if (isAnnual) {
            document.getElementById('savings-display').classList.remove('hidden');
            document.getElementById('summary-savings').textContent = '-$' + yearlySavings.toFixed(2);
          } else {
            document.getElementById('savings-display').classList.add('hidden');
          }
          
          // Always show billing note (no proration)
          const billingNote = document.getElementById('billing-note');
          if (billingNote) {
            billingNote.textContent = isAnnual ? 
              '*Annual prepaid - full 12 months charged today' : 
              '*Recurring monthly on ' + new Date().getDate() + 'th of each month';
          }
          
          // Go to next step
          setTimeout(() => goToStep(3), 300);
        }

        function completeEnrollment() {
          const email = document.getElementById('parent-email').value;
          const password = document.getElementById('parent-password').value;
          
          if (!email || !password) {
            alert('Please fill in all fields');
            return;
          }
          
          const billingType = isAnnual ? 'Annual (12 months prepaid - year-round)' : 'Monthly';
          const pricePerStudent = selectedPrice;
          const monthlyTotal = pricePerStudent * selectedStudents;
          const totalCharge = isAnnual ? monthlyTotal * 12 : monthlyTotal;
          
          alert('🎉 Enrollment Complete!\\\\n\\\\nEmail: ' + email + '\\\\nPackage: ' + selectedStudents + ' students at $' + pricePerStudent + '/mo each\\\\nBilling: ' + billingType + '\\\\nTotal: $' + totalCharge.toFixed(2) + '\\\\n\\\\nStripe integration will be added next!');
          closeEnrollment();
        }

        // Update all "Enroll Now" and "Start Creating Today" buttons
        document.addEventListener('DOMContentLoaded', function() {
          const enrollButtons = document.querySelectorAll('a[href="/pricing"], a[href="/checkout"]');
          enrollButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
              e.preventDefault();
              openEnrollment();
            });
          });
        });
      `}})]}),{title:"Curriculum - Acromatico Academy"}));w.get("/studio",t=>t.redirect("/static/studio",302));w.get("/prints",t=>t.redirect("/static/prints",302));w.get("/photography",t=>t.redirect("/static/photography-main",302));w.get("/payment/success",t=>t.redirect("/static/payment-success",302));w.get("/payment/cancel",t=>t.redirect("/static/payment-cancel",302));w.get("/payment/declined",t=>t.redirect("/static/payment-declined",302));w.get("/weddings/booking",t=>t.redirect("/static/weddings-booking",302));w.get("/portraits/booking",t=>t.redirect("/static/portraits-booking",302));w.get("/events/booking",t=>t.redirect("/static/events-booking",302));w.get("/realestate/booking",t=>t.redirect("/static/realestate-booking",302));w.get("/commercial",t=>t.redirect("/static/commercial-booking",302));w.get("/commercial/booking",t=>t.redirect("/static/commercial-booking",302));w.get("/studio-old",t=>t.html(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We Build Movements — Acromatico</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html {
      scroll-behavior: smooth;
    }
    
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      -webkit-font-smoothing: antialiased;
      background: #000;
      color: #fff;
      overflow-x: hidden;
    }
    
    /* MINIMAL HEADER */
    header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      background: rgba(10, 10, 10, 0.8);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    nav {
      max-width: 1600px;
      margin: 0 auto;
      padding: 20px 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      text-decoration: none;
      letter-spacing: 0.2em;
    }
    
    .nav-links {
      display: flex;
      gap: 40px;
    }
    
    .nav-links a {
      color: rgba(255, 255, 255, 0.6);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: color 0.2s;
    }
    
    .nav-links a:hover {
      color: #fff;
    }
    
    /* HERO */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 140px 48px 80px;
      text-align: center;
      position: relative;
      background: #000;
    }
    
    .hero-content {
      max-width: 1200px;
      z-index: 2;
      position: relative;
    }
    
    .hero h1 {
      font-size: clamp(56px, 10vw, 160px);
      font-weight: 900;
      line-height: 0.95;
      letter-spacing: -0.03em;
      margin-bottom: 40px;
      color: #fff;
    }
    
    .hero h1 span {
      color: #4794A6;
    }
    
    .hero p {
      font-size: clamp(20px, 3vw, 32px);
      font-weight: 300;
      line-height: 1.5;
      color: rgba(255, 255, 255, 0.7);
      max-width: 900px;
      margin: 0 auto 60px;
    }
    
    .cta-primary {
      display: inline-block;
      background: #4794A6;
      color: #fff;
      padding: 24px 64px;
      font-size: 18px;
      font-weight: 700;
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    
    .cta-primary:hover {
      background: #3a7a8a;
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(71, 148, 166, 0.4);
    }
    
    /* TRUTH SECTION */
    .truth {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 120px 48px;
      background: #0a0a0a;
      text-align: center;
    }
    
    .truth-content {
      max-width: 1000px;
    }
    
    .truth h2 {
      font-size: clamp(40px, 7vw, 100px);
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 48px;
      color: #fff;
    }
    
    .truth p {
      font-size: clamp(18px, 2.5vw, 28px);
      font-weight: 300;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 32px;
    }
    
    .truth .highlight {
      color: #4794A6;
      font-weight: 600;
    }
    
    /* PROOF SECTION */
    .proof {
      padding: 120px 48px;
      background: #000;
    }
    
    .proof-header {
      text-align: center;
      margin-bottom: 100px;
    }
    
    .proof-header h2 {
      font-size: clamp(36px, 6vw, 80px);
      font-weight: 700;
      margin-bottom: 24px;
    }
    
    .proof-header p {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.6);
    }
    
    .case-studies {
      max-width: 1600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    
    .case {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 70vh;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .case:last-child {
      border-bottom: none;
    }
    
    .case-image {
      position: relative;
      overflow: hidden;
      background: #111;
    }
    
    .case-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }
    
    .case:hover .case-image img {
      transform: scale(1.05);
    }
    
    .case-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 80px;
      background: #000;
    }
    
    .case-label {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: rgba(255, 255, 255, 0.4);
      margin-bottom: 24px;
    }
    
    .case-title {
      font-size: clamp(32px, 5vw, 72px);
      font-weight: 900;
      line-height: 1;
      margin-bottom: 32px;
      color: #fff;
    }
    
    .case-metric {
      font-size: clamp(48px, 8vw, 120px);
      font-weight: 900;
      color: #4794A6;
      line-height: 1;
      margin-bottom: 16px;
    }
    
    .case-description {
      font-size: 18px;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 32px;
    }
    
    .case-stats {
      display: flex;
      gap: 48px;
      margin-top: 40px;
    }
    
    .stat {
      flex: 1;
    }
    
    .stat-number {
      font-size: 36px;
      font-weight: 700;
      color: #4794A6;
      margin-bottom: 8px;
    }
    
    .stat-label {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    
    /* SCARCITY */
    .scarcity {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 120px 48px;
      background: #0a0a0a;
      text-align: center;
    }
    
    .scarcity-content {
      max-width: 1000px;
    }
    
    .scarcity h2 {
      font-size: clamp(48px, 8vw, 140px);
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 40px;
      color: #fff;
    }
    
    .scarcity h2 span {
      color: #4794A6;
    }
    
    .scarcity p {
      font-size: clamp(20px, 3vw, 32px);
      font-weight: 300;
      line-height: 1.5;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 60px;
    }
    
    /* FINAL CTA */
    .final-cta {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 120px 48px;
      background: #000;
      text-align: center;
    }
    
    .final-cta-content {
      max-width: 1000px;
    }
    
    .final-cta h2 {
      font-size: clamp(48px, 8vw, 120px);
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 60px;
      color: #fff;
    }
    
    /* MOBILE */
    @media (max-width: 1024px) {
      nav {
        padding: 20px 32px;
      }
      
      .nav-links {
        gap: 24px;
        font-size: 12px;
      }
      
      .logo img {
        width: 140px !important;
      }
      
      .hero,
      .truth,
      .scarcity,
      .final-cta {
        padding: 100px 32px 80px;
      }
      
      .proof {
        padding: 80px 32px;
      }
      
      .case {
        grid-template-columns: 1fr;
      }
      
      /* CASE FEATURED - MOBILE */
      .case-featured {
        grid-template-columns: 1fr !important;
        min-height: auto !important;
        padding: 60px 24px !important;
        gap: 40px !important;
      }
      
      .case-info {
        max-width: 100% !important;
        text-align: center;
      }
      
      .case-label {
        font-size: 11px !important;
      }
      
      .case-title {
        font-size: 36px !important;
      }
      
      .case-metric {
        font-size: 48px !important;
      }
      
      .case-description {
        font-size: 16px !important;
      }
      
      /* DEVICE SHOWCASE - MOBILE */
      .device-showcase {
        height: auto !important;
        width: 100% !important;
      }
      
      .desktop-frame {
        width: 100% !important;
        margin-bottom: 0 !important;
      }
      
      .desktop-screen {
        padding: 6px !important;
      }
      
      .desktop-notch {
        height: 16px !important;
      }
      
      .desktop-stand {
        display: none !important;
      }
      
      .mobile-frame {
        display: none !important;
      }
      
      .portfolio-dashboard {
        position: relative !important;
        bottom: auto !important;
        right: auto !important;
        width: 100% !important;
        margin-top: 32px !important;
        padding: 24px !important;
      }
      
      .case-image {
        min-height: 50vh;
      }
      
      .case-content {
        padding: 60px 32px;
      }
      
      .case-stats {
        flex-direction: column;
        gap: 32px;
      }
      
      .cta-primary {
        padding: 20px 48px;
        font-size: 16px;
      }
    }
    
    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }
      
      .logo img {
        width: 120px !important;
      }
      
      header nav {
        padding: 16px 24px;
        justify-content: center;
      }
      
      .hero h1 {
        font-size: 48px !important;
      }
      
      .case-featured {
        padding: 40px 20px !important;
      }
      
      .case-title {
        font-size: 28px !important;
      }
      
      .case-metric {
        font-size: 36px !important;
      }
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header>
    <nav>
      <a href="/" class="logo">
        <img src="/static/acromatico-logo-transparent.png" alt="Acromatico" style="width: 180px; height: auto; filter: brightness(0) invert(1);">
      </a>
      <div class="nav-links">
        <a href="/">Home</a>
        <a href="/education">Education</a>
        <a href="/studio">Studio</a>
        <a href="#" onclick="event.preventDefault(); openComingSoonModal('Art Prints');" style="cursor: pointer;">Prints</a>
        <a href="/photography">Photography</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  </header>

  <!-- HERO: THE MOVEMENT -->
  <section class="hero">
    <div class="hero-content">
      <h1>You dream it.<br/>We <span>build</span> it.</h1>
      <p>Custom SaaS applications, enterprise platforms, and scalable web solutions. From concept to deployment, we turn your vision into reality. Full-stack development. Cloud architecture. Real results.</p>
      <a href="/contact" class="cta-primary">Start Your Project</a>
    </div>
  </section>

  <!-- TRUTH: WHY WE'RE DIFFERENT -->
  <section class="truth">
    <div class="truth-content">
      <h2>Your idea deserves world-class execution.</h2>
      <p>If your platform looks generic, you're invisible.</p>
      <p>If your tech stack is outdated, you're forgettable.</p>
      <p>If your user experience is clunky, you're <span class="highlight">just another app</span>.</p>
      <p>We make you <span class="highlight">the standard</span>.</p>
    </div>
  </section>

  <!-- PROOF: THE RESULTS -->
  <section class="proof">
    <div class="proof-header">
      <h2>Built for scale. Proven by results.</h2>
      <p>We only take 6 projects per year. Here's what we deliver.</p>
    </div>
    
    <div class="case-studies">
      
      <!-- ACCESS BY CGI -->
      <style>
        .case-featured {
          position: relative;
          min-height: 900px;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          padding: 80px 40px;
          overflow: visible;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          max-width: 1600px;
          margin: 0 auto;
        }
        
        .case-info {
          max-width: 500px;
        }
        
        .device-showcase {
          position: relative;
          width: 100%;
          height: 600px;
        }
        
        /* Desktop Frame - iMac Style */
        .desktop-frame {
          position: relative;
          width: 100%;
          z-index: 1;
          margin-bottom: 20px;
        }
        
        .desktop-screen {
          width: 100%;
          background: #1a1a1a;
          border-radius: 12px;
          padding: 8px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
        }
        
        .desktop-screen img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 8px;
        }
        
        .desktop-notch {
          height: 24px;
          background: #1a1a1a;
          border-radius: 0 0 8px 8px;
        }
        
        .desktop-stand {
          width: 200px;
          height: 80px;
          margin: 0 auto;
          position: relative;
        }
        
        .desktop-stand::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 50px;
          background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
          border-radius: 3px;
        }
        
        .desktop-stand::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 180px;
          height: 12px;
          background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
          border-radius: 6px;
        }
        
        /* Mobile Frame */
        .mobile-frame {
          position: absolute;
          right: -40px;
          bottom: 40px;
          width: 200px;
          background: #1a1a1a;
          border-radius: 28px;
          padding: 10px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6);
          z-index: 2;
        }
        
        .mobile-screen {
          width: 100%;
          border-radius: 24px;
          overflow: hidden;
          background: #000;
        }
        
        .mobile-screen img {
          width: 100%;
          height: auto;
          display: block;
        }
        
        /* Portfolio Dashboard */
        .portfolio-dashboard {
          position: absolute;
          right: 0;
          bottom: 40px;
          width: 400px;
          background: rgba(10, 10, 10, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 32px;
          backdrop-filter: blur(20px);
          z-index: 3;
        }
        
        .portfolio-header {
          font-size: 14px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }
        
        .portfolio-aum {
          font-size: 48px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }
        
        .portfolio-label {
          font-size: 14px;
          color: #888;
          margin-bottom: 24px;
        }
        
        .growth-chart {
          width: 100%;
          height: 120px;
          position: relative;
          margin-bottom: 24px;
        }
        
        .chart-bars {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 100%;
          gap: 12px;
        }
        
        .chart-bar {
          flex: 1;
          background: linear-gradient(180deg, #00d4ff 0%, #0066ff 100%);
          border-radius: 4px 4px 0 0;
          position: relative;
          transition: transform 0.3s ease;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 8px;
        }
        
        .chart-bar:hover {
          transform: translateY(-4px);
        }
        
        .bar-value {
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }
        
        .chart-bar.bar-1 { height: 20%; }
        .chart-bar.bar-2 { height: 40%; }
        .chart-bar.bar-3 { height: 60%; }
        .chart-bar.bar-4 { height: 80%; }
        .chart-bar.bar-5 { height: 100%; }
        
        .chart-years {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
        }
        
        .chart-year {
          font-size: 11px;
          color: #666;
        }
        
        .portfolio-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        
        .metric {
          text-align: center;
        }
        
        .metric-value {
          font-size: 24px;
          font-weight: 700;
          color: #00d4ff;
          margin-bottom: 4px;
        }
        
        .metric-label {
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .case-info {
          max-width: 600px;
          margin: 0 auto 60px;
          text-align: center;
        }
        
        @media (max-width: 1024px) {
          .case-featured {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .device-showcase {
            height: auto;
            min-height: 400px;
          }
          
          .desktop-frame {
            width: 100%;
            margin-bottom: 30px;
          }
          
          .mobile-frame {
            position: relative;
            width: 200px;
            margin: 0 auto;
            right: auto;
            bottom: auto;
          }
        }
      </style>
      
      <!-- ACCESS BY CGI / CGI MERCHANT GROUP - UNIFIED ICONIC SHOWCASE -->
      <div class="case case-featured" style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); padding: 100px 60px; min-height: auto;">
        
        <div style="max-width: 1400px; margin: 0 auto;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 80px;">
            <div class="case-label" style="margin-bottom: 24px;">Commercial Real Estate Investment Platform</div>
            <h2 class="case-title" style="margin-bottom: 24px;">Access by CGI</h2>
            <p style="font-size: 20px; line-height: 1.7; color: rgba(255,255,255,0.7); max-width: 900px; margin: 0 auto 40px;">When CGI Merchant Group acquired the Trump International Hotel in Washington D.C. for <span style="color: #4794A6; font-weight: 700;">$375 million</span>, they needed a platform that could democratize institutional-grade real estate investments. We built the complete infrastructure—from portfolio analytics to investor portals—managing <span style="color: #4794A6; font-weight: 700;">$1.2B+ in assets</span> across iconic properties.</p>
            
            <!-- Key Stats -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 40px; margin-top: 60px; max-width: 1000px; margin-left: auto; margin-right: auto;">
              <div>
                <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">$1.2B+</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.1em;">Assets Managed</div>
              </div>
              <div>
                <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">$375M</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.1em;">Flagship Acquisition</div>
              </div>
              <div>
                <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">525</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.1em;">Total Hotel Keys</div>
              </div>
              <div>
                <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">+500%</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.1em;">Growth Rate</div>
              </div>
            </div>
          </div>
          
          <!-- Platform UI Showcase -->
          <div style="margin-bottom: 100px;">
            <h3 style="font-size: 36px; font-weight: 900; text-align: center; margin-bottom: 60px; color: #fff;">Platform Interface</h3>
            <div class="desktop-frame" style="max-width: 1200px; margin: 0 auto;">
              <div class="desktop-screen">
                <img src="/static/images/brand-showcase/access-cgi-app-screen.jpg" alt="Access by CGI Dashboard">
              </div>
              <div class="desktop-notch"></div>
              <div class="desktop-stand"></div>
            </div>
          </div>
          
          <!-- Portfolio Growth Chart -->
          <div style="margin-bottom: 100px;">
            <div class="portfolio-dashboard" style="max-width: 900px; margin: 0 auto; background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 60px;">
              <div class="portfolio-header" style="text-align: center; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.5); margin-bottom: 20px;">Portfolio Growth</div>
              <div class="portfolio-aum" style="text-align: center; font-size: 72px; font-weight: 900; color: #4794A6; margin-bottom: 12px;">$1.2B</div>
              <div class="portfolio-label" style="text-align: center; font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 60px;">Assets Under Management During Our Relationship Period.</div>
              
              <div class="growth-chart">
                <div class="chart-bars" style="display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; height: 200px; margin-bottom: 20px;">
                  <div class="chart-bar bar-1" style="flex: 1; background: linear-gradient(to top, #4794A6, #5aa5b8); border-radius: 8px 8px 0 0; position: relative; height: 20%; display: flex; align-items: flex-start; justify-content: center; transition: all 0.3s ease;">
                    <span class="bar-value" style="position: absolute; top: -28px; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.8);">$200M</span>
                  </div>
                  <div class="chart-bar bar-2" style="flex: 1; background: linear-gradient(to top, #4794A6, #5aa5b8); border-radius: 8px 8px 0 0; position: relative; height: 45%; display: flex; align-items: flex-start; justify-content: center; transition: all 0.3s ease;">
                    <span class="bar-value" style="position: absolute; top: -28px; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.8);">$450M</span>
                  </div>
                  <div class="chart-bar bar-3" style="flex: 1; background: linear-gradient(to top, #4794A6, #5aa5b8); border-radius: 8px 8px 0 0; position: relative; height: 68%; display: flex; align-items: flex-start; justify-content: center; transition: all 0.3s ease;">
                    <span class="bar-value" style="position: absolute; top: -28px; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.8);">$680M</span>
                  </div>
                  <div class="chart-bar bar-4" style="flex: 1; background: linear-gradient(to top, #4794A6, #5aa5b8); border-radius: 8px 8px 0 0; position: relative; height: 90%; display: flex; align-items: flex-start; justify-content: center; transition: all 0.3s ease;">
                    <span class="bar-value" style="position: absolute; top: -28px; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.8);">$950M</span>
                  </div>
                  <div class="chart-bar bar-5" style="flex: 1; background: linear-gradient(to top, #4794A6, #5aa5b8); border-radius: 8px 8px 0 0; position: relative; height: 100%; display: flex; align-items: flex-start; justify-content: center; transition: all 0.3s ease;">
                    <span class="bar-value" style="position: absolute; top: -28px; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.8);">$1.2B</span>
                  </div>
                </div>
              </div>
              
              <div class="chart-years" style="display: flex; justify-content: space-between; gap: 24px; margin-bottom: 40px;">
                <span class="chart-year" style="flex: 1; text-align: center; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.5);">2020</span>
                <span class="chart-year" style="flex: 1; text-align: center; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.5);">2021</span>
                <span class="chart-year" style="flex: 1; text-align: center; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.5);">2022</span>
                <span class="chart-year" style="flex: 1; text-align: center; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.5);">2023</span>
                <span class="chart-year" style="flex: 1; text-align: center; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.5);">2024</span>
              </div>
              
              <div class="portfolio-metrics" style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.1);">
                <div class="metric" style="text-align: center;">
                  <div class="metric-value" style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">+500%</div>
                  <div class="metric-label" style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.5);">Growth Rate</div>
                </div>
                <div class="metric" style="text-align: center;">
                  <div class="metric-value" style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">$1B+</div>
                  <div class="metric-label" style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.5);">AUM Increase</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Iconic Properties Gallery -->
          <div style="margin-bottom: 60px;">
            <h3 style="font-size: 36px; font-weight: 900; text-align: center; margin-bottom: 60px; color: #fff;">Iconic Portfolio Properties</h3>
            
            <div style="display: flex; gap: 32px; overflow-x: auto; padding-bottom: 20px; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;">
              
              <!-- Waldorf Astoria DC -->
              <div style="flex: 0 0 500px; background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; overflow: hidden; scroll-snap-align: start; transition: all 0.3s ease;">
                <img src="/static/images/brand-showcase/waldorf-astoria-dc.jpg" alt="Waldorf Astoria Washington DC" style="width: 100%; height: 320px; object-fit: cover;">
                <div style="padding: 32px;">
                  <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #4794A6; margin-bottom: 12px;">ICONIC HOTEL</div>
                  <h4 style="font-size: 24px; font-weight: 900; margin-bottom: 12px; color: #fff;">Waldorf Astoria Washington D.C.</h4>
                  <p style="font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.6); margin-bottom: 24px;">Historic Old Post Office building (1899) on Pennsylvania Avenue. Between the White House and U.S. Capitol. CGI's $375M acquisition transformed this landmark.</p>
                  <div style="display: flex; gap: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <div>
                      <div style="font-size: 20px; font-weight: 700; color: #4794A6;">263</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.5);">Keys</div>
                    </div>
                    <div>
                      <div style="font-size: 20px; font-weight: 700; color: #4794A6;">$375M</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.5);">Acquisition</div>
                    </div>
                    <div>
                      <div style="font-size: 20px; font-weight: 700; color: #4794A6;">1899</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.5);">Built</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- The Gabriel South Beach -->
              <div style="flex: 0 0 500px; background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; overflow: hidden; scroll-snap-align: start; transition: all 0.3s ease;">
                <img src="/static/images/brand-showcase/gabriel-miami-south-beach.jpg" alt="The Gabriel Miami South Beach" style="width: 100%; height: 320px; object-fit: cover;">
                <div style="padding: 32px;">
                  <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #4794A6; margin-bottom: 12px;">ART DECO ICON</div>
                  <h4 style="font-size: 24px; font-weight: 900; margin-bottom: 12px; color: #fff;">The Gabriel Miami South Beach</h4>
                  <p style="font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.6); margin-bottom: 24px;">Blending mid-century modernism with Floridian style on Ocean Drive. Greatest linear footage on Miami Beach's most iconic street.</p>
                  <div style="display: flex; gap: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <div>
                      <div style="font-size: 20px; font-weight: 700; color: #4794A6;">132</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.5);">Keys</div>
                    </div>
                    <div>
                      <div style="font-size: 20px; font-weight: 700; color: #4794A6;">Ocean</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.5);">Drive</div>
                    </div>
                    <div>
                      <div style="font-size: 20px; font-weight: 700; color: #4794A6;">2 Pools</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.5);">Amenities</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- The Gabriel Downtown -->
              <div style="flex: 0 0 500px; background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; overflow: hidden; scroll-snap-align: start; transition: all 0.3s ease;">
                <img src="/static/images/brand-showcase/gabriel-miami-downtown.jpg" alt="The Gabriel Miami Downtown" style="width: 100%; height: 320px; object-fit: cover;">
                <div style="padding: 32px;">
                  <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #4794A6; margin-bottom: 12px;">MODERN LUXURY</div>
                  <h4 style="font-size: 24px; font-weight: 900; margin-bottom: 12px; color: #fff;">The Gabriel Miami Downtown</h4>
                  <p style="font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.6); margin-bottom: 24px;">Located in the arts and cultural epicenter of Miami. High-rise tower with stunning Biscayne Bay views.</p>
                  <div style="display: flex; gap: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <div>
                      <div style="font-size: 20px; font-weight: 700; color: #4794A6;">130</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.5);">Keys</div>
                    </div>
                    <div>
                      <div style="font-size: 20px; font-weight: 700; color: #4794A6;">Bay</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.5);">Views</div>
                    </div>
                    <div>
                      <div style="font-size: 20px; font-weight: 700; color: #4794A6;">Arts</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.5);">District</div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            <p style="text-align: center; font-size: 14px; color: rgba(255,255,255,0.4); margin-top: 24px;">← Scroll to explore properties →</p>
          </div>
          
          <!-- Platform Impact -->
          <div style="background: rgba(71,148,166,0.05); border: 1px solid rgba(71,148,166,0.2); border-radius: 18px; padding: 60px; text-align: center; margin-top: 80px;">
            <h3 style="font-size: 28px; font-weight: 900; margin-bottom: 24px; color: #fff;">Platform Impact</h3>
            <p style="font-size: 18px; line-height: 1.8; color: rgba(255,255,255,0.7); max-width: 800px; margin: 0 auto 32px;">We built a complete fintech SaaS that democratizes access to institutional-grade real estate investments. Secure deal flow management, investor portal with real-time analytics, automated document handling, and portfolio tracking. The platform enables both institutional and retail investors to access high-value commercial real estate opportunities.</p>
            
            <div style="border-top: 1px solid rgba(71,148,166,0.3); padding-top: 32px; margin-top: 32px;">
              <div style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #4794A6; margin-bottom: 16px;">Built For:</div>
              <p style="font-size: 18px; line-height: 1.8; color: rgba(255,255,255,0.7); max-width: 800px; margin: 0 auto;">
                <span style="color: #4794A6; font-weight: 700;">Fintech Startups</span> disrupting real estate investment. 
                <span style="color: #4794A6; font-weight: 700;">Family Offices</span> managing high-net-worth portfolios. 
                <span style="color: #4794A6; font-weight: 700;">Investment Firms</span> seeking institutional-grade infrastructure. 
                <span style="color: #4794A6; font-weight: 700;">Lenders</span> managing commercial real estate deals at scale.
              </p>
            </div>
          </div>
          
        </div>
      </div>
      
      <!-- TRAVEL DRD / VIBE36 - AIRBNB PORTFOLIO MANAGEMENT -->
      <div class="case case-featured" style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); padding: 100px 60px; min-height: auto;">
        
        <div style="max-width: 1400px; margin: 0 auto;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 80px;">
            <div class="case-label" style="margin-bottom: 24px;">Luxury Vacation Rental Portfolio Management</div>
            <h2 class="case-title" style="margin-bottom: 24px;">Travel DRD</h2>
            <p style="font-size: 20px; line-height: 1.7; color: rgba(255,255,255,0.7); max-width: 900px; margin: 0 auto 40px;">Building a tech platform for an exclusive vacation rental portfolio isn't just about booking calendars—it's about creating a system that manages <span style="color: #4794A6; font-weight: 700;">multiple high-end properties</span>, coordinates concierge services, tracks guest experiences, and automates operations at scale. We built the backbone for a luxury travel empire managing properties from <span style="color: #4794A6; font-weight: 700;">Miami Beach to Dominican Republic</span>.</p>
            
            <!-- Key Stats -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 40px; margin-top: 60px; max-width: 1000px; margin-left: auto; margin-right: auto;">
              <div>
                <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">10+</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.1em;">Properties Managed</div>
              </div>
              <div>
                <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">24/7</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.1em;">Concierge Portal</div>
              </div>
              <div>
                <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">100%</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.1em;">Exclusive Access</div>
              </div>
              <div>
                <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">∞</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.1em;">Premium Amenities</div>
              </div>
            </div>
          </div>
          
          <!-- Platform UI Showcase -->
          <div style="margin-bottom: 100px;">
            <h3 style="font-size: 36px; font-weight: 900; text-align: center; margin-bottom: 60px; color: #fff;">Platform Dashboard</h3>
            <div class="desktop-frame" style="max-width: 1200px; margin: 0 auto;">
              <div class="desktop-screen">
                <img src="/static/images/brand-showcase/travel-drd-hero.jpg" alt="Travel DRD Dashboard">
              </div>
              <div class="desktop-notch"></div>
              <div class="desktop-stand"></div>
            </div>
          </div>
          
          <!-- Vibe36 Story -->
          <div style="background: rgba(71,148,166,0.05); border: 1px solid rgba(71,148,166,0.2); border-radius: 18px; padding: 60px; margin-bottom: 80px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h3 style="font-size: 32px; font-weight: 900; margin-bottom: 24px; color: #fff;">The Vibe36 Story</h3>
              <p style="font-size: 18px; line-height: 1.8; color: rgba(255,255,255,0.7); max-width: 900px; margin: 0 auto;">When the founder approached us, they had a vision: transform how travelers discover and book luxury properties in the Caribbean. Not Airbnb. Not VRBO. Something <em>exclusive</em>. Something that spoke to travelers who demand more than just a place to sleep—they want <span style="color: #4794A6; font-weight: 700;">an experience</span>.</p>
            </div>
            
            <!-- Chart Showcase -->
            <div style="max-width: 1000px; margin: 0 auto 40px;">
              <img src="/static/images/brand-showcase/travel-drd-chart.jpg" alt="Travel DRD Analytics" style="width: 100%; height: auto; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            </div>
            
            <div style="max-width: 900px; margin: 0 auto;">
              <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); margin-bottom: 24px;">We didn't just build a booking engine. We built a complete ecosystem:</p>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-top: 40px;">
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px;">
                  <div style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #4794A6; margin-bottom: 12px;">Property Management</div>
                  <p style="font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.6); margin: 0;">Multi-property calendars, pricing automation, availability sync, maintenance scheduling.</p>
                </div>
                
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px;">
                  <div style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #4794A6; margin-bottom: 12px;">Guest Experience</div>
                  <p style="font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.6); margin: 0;">Custom booking flows, digital check-in, concierge requests, activity coordination.</p>
                </div>
                
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px;">
                  <div style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #4794A6; margin-bottom: 12px;">Revenue Analytics</div>
                  <p style="font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.6); margin: 0;">Real-time dashboards, occupancy tracking, revenue forecasting, performance metrics.</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Who It's For -->
          <div style="text-align: center; padding: 60px 40px; background: rgba(255,255,255,0.02); border-radius: 18px;">
            <h3 style="font-size: 28px; font-weight: 900; margin-bottom: 24px; color: #fff;">Built For:</h3>
            <p style="font-size: 18px; line-height: 1.8; color: rgba(255,255,255,0.7); max-width: 800px; margin: 0 auto;">
              <span style="color: #4794A6; font-weight: 700;">Airbnb Portfolio Managers</span> managing 5-50+ properties. 
              <span style="color: #4794A6; font-weight: 700;">Vacation Rental Companies</span> scaling operations. 
              <span style="color: #4794A6; font-weight: 700;">Luxury Property Owners</span> who refuse to settle for generic platforms.
            </p>
          </div>
          
        </div>
      </div>
      
      <!-- LIA - E-COMMERCE -->
      <div class="case case-featured">
        <div class="case-info">
          <div class="case-label">Celebrity Beauty Brand E-Commerce</div>
          <div class="case-title">LIA by Jomari Goyso</div>
          <div class="case-metric">$7.2M in 9 Months</div>
          <div class="case-description">
            Celebrity stylist Jomari Goyso needed more than a Shopify template—he needed a complete brand ecosystem that could scale to 7-figures fast. We built the visual identity from scratch, shot every piece of product photography in-house, and created a 12-month content system that turned his vision into a multi-million dollar beauty empire. From packaging design to Instagram strategy, we handled it all.
          </div>
          
          <!-- Built For Section -->
          <div style="margin-top: 40px; padding: 32px; background: rgba(71,148,166,0.05); border: 1px solid rgba(71,148,166,0.2); border-radius: 12px;">
            <div style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #4794A6; margin-bottom: 16px;">Built For:</div>
            <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); margin: 0;">
              <span style="color: #4794A6; font-weight: 700;">Celebrity Brands</span> launching product lines. 
              <span style="color: #4794A6; font-weight: 700;">Direct-to-Consumer Brands</span> scaling fast. 
              <span style="color: #4794A6; font-weight: 700;">Premium E-Commerce</span> companies that refuse stock photography and generic stores.
            </p>
          </div>
        </div>
        
        <div class="device-showcase">
          <!-- Desktop Frame - iMac Style -->
          <div class="desktop-frame">
            <div class="desktop-screen">
              <img src="/static/images/brand-showcase/lia-beauty.jpg" alt="LIA Beauty Platform">
            </div>
            <div class="desktop-notch"></div>
            <div class="desktop-stand"></div>
          </div>
        </div>
      </div>
      
      <!-- ECOLOSOPHY - E-COMMERCE -->
      <div class="case case-featured">
        <div class="case-info">
          <div class="case-label">Non-Toxic Cleaning Brand E-Commerce</div>
          <div class="case-title">Ecolosophy</div>
          <div class="case-metric">$0 → 6-Figures in 8 Months</div>
          <div class="case-description">
            Started with literally nothing. No brand. No product photography. No store. We built the complete Shopify ecosystem from the ground up: shot 500+ custom product photos, designed packaging, created a 12-month content calendar, integrated warehouse fulfillment with ShipMonk, and launched a movement—not just a cleaning products company. From concept to 6-figure revenue in 8 months. Zero stock images. 100% custom everything.
          </div>
          
          <!-- Built For Section -->
          <div style="margin-top: 40px; padding: 32px; background: rgba(71,148,166,0.05); border: 1px solid rgba(71,148,166,0.2); border-radius: 12px;">
            <div style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #4794A6; margin-bottom: 16px;">Built For:</div>
            <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); margin: 0;">
              <span style="color: #4794A6; font-weight: 700;">Product Startups</span> launching from zero. 
              <span style="color: #4794A6; font-weight: 700;">Mission-Driven Brands</span> building movements. 
              <span style="color: #4794A6; font-weight: 700;">E-Commerce Entrepreneurs</span> who want everything done in-house—from photography to fulfillment integration.
            </p>
          </div>
        </div>
        
        <div class="device-showcase">
          <!-- Desktop Frame - iMac Style -->
          <div class="desktop-frame">
            <div class="desktop-screen">
              <img src="/static/images/brand-showcase/ecolosophy-homepage.jpg" alt="Ecolosophy Platform">
            </div>
            <div class="desktop-notch"></div>
            <div class="desktop-stand"></div>
          </div>
        </div>
      </div>

      <!-- BLUE BUILDING - COMMERCIAL REAL ESTATE -->
      <div class="case case-featured">
        <div class="case-info">
          <div class="case-label">Smart Luxury Office Rentals</div>
          <div class="case-title">Blue Building</div>
          <div class="case-metric">24/7 Business Operations</div>
          <div class="case-description">
            Commercial real estate companies need more than a website—they need a platform that positions premium workspaces as the future of entrepreneurship. We created a complete visual identity and digital presence that speaks directly to growing businesses who demand excellence in every detail. From smart access control to amenity booking, we built a brand that transforms office rentals into lifestyle statements.
          </div>
          
          <!-- Built For Section -->
          <div style="margin-top: 40px; padding: 32px; background: rgba(71,148,166,0.05); border: 1px solid rgba(71,148,166,0.2); border-radius: 12px;">
            <div style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #4794A6; margin-bottom: 16px;">Built For:</div>
            <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); margin: 0;">
              <span style="color: #4794A6; font-weight: 700;">Commercial Building Owners</span> repositioning for modern tenants. 
              <span style="color: #4794A6; font-weight: 700;">Co-Working Operators</span> scaling locations. 
              <span style="color: #4794A6; font-weight: 700;">Property Developers</span> targeting high-growth startups and entrepreneurs.
            </p>
          </div>
        </div>
        
        <div class="device-showcase">
          <!-- Desktop Frame - iMac Style -->
          <div class="desktop-frame">
            <div class="desktop-screen">
              <img src="/static/images/brand-showcase/blue-building-real.jpg" alt="Blue Building Platform">
            </div>
            <div class="desktop-notch"></div>
            <div class="desktop-stand"></div>
          </div>
        </div>
      </div>
      
    </div>
  </section>

  <!-- FRAMEWORK: HOW WE WORK -->
  <section class="framework" style="background: #0a0a0a; padding: 120px 48px; border-top: 1px solid rgba(255,255,255,0.1);">
    <div style="max-width: 1400px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 80px;">
        <h2 style="font-size: clamp(48px, 8vw, 80px); font-weight: 900; line-height: 1; margin-bottom: 24px; color: #fff;">The Framework</h2>
        <p style="font-size: 20px; color: rgba(255,255,255,0.6); max-width: 700px; margin: 0 auto;">Our battle-tested process for building world-class SaaS products. Every project. Every time.</p>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; margin-bottom: 80px;">
        <div style="background: #111; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 40px; transition: transform 0.3s ease;">
          <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 16px;">01</div>
          <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 16px; color: #fff;">Discovery</h3>
          <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.6);">Deep-dive workshops. User research. Competitor analysis. Tech stack evaluation. We map every detail before writing a single line of code.</p>
        </div>
        
        <div style="background: #111; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 40px;">
          <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 16px;">02</div>
          <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 16px; color: #fff;">Design</h3>
          <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.6);">Wireframes, prototypes, user flows. Every pixel intentional. Every interaction tested. We design for conversion, not just aesthetics.</p>
        </div>
        
        <div style="background: #111; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 40px;">
          <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 16px;">03</div>
          <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 16px; color: #fff;">Development</h3>
          <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.6);">Modern tech stack. Clean architecture. Scalable infrastructure. We build platforms that handle millions of users without breaking.</p>
        </div>
        
        <div style="background: #111; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 40px;">
          <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 16px;">04</div>
          <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 16px; color: #fff;">Launch</h3>
          <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.6);">Deployment. Monitoring. Performance optimization. We don't just launch and disappear. We ensure your platform dominates from day one.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- PRICING PACKAGES -->
  <section class="pricing" style="background: #000; padding: 120px 48px; border-top: 1px solid rgba(255,255,255,0.1);">
    <div style="max-width: 1400px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 80px;">
        <h2 style="font-size: clamp(48px, 8vw, 80px); font-weight: 900; line-height: 1; margin-bottom: 24px; color: #fff;">Ready-to-Purchase Packages</h2>
        <p style="font-size: 20px; color: rgba(255,255,255,0.6); max-width: 700px; margin: 0 auto;">No sales calls. No negotiations. Just world-class SaaS development. Pick your package and let's build.</p>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 32px;">
        
        <!-- STARTER PACKAGE -->
        <div style="background: linear-gradient(135deg, #111 0%, #0a0a0a 100%); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 48px; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 24px; right: 24px; background: rgba(71,148,166,0.1); color: #4794A6; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Foundation</div>
          
          <h3 style="font-size: 32px; font-weight: 900; margin-bottom: 16px; color: #fff;">Starter</h3>
          <div style="font-size: 64px; font-weight: 900; color: #4794A6; line-height: 1; margin-bottom: 8px;">$25K</div>
          <p style="font-size: 14px; color: rgba(255,255,255,0.5); margin-bottom: 32px;">4-6 week delivery</p>
          
          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 32px; margin-bottom: 32px;">
            <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.7); margin-bottom: 32px;">Perfect for MVPs and proof-of-concept platforms. Get your idea validated fast.</p>
            
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Core platform (5-7 pages)</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ User authentication</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Database architecture</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Admin dashboard</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Mobile responsive</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Cloudflare deployment</li>
              <li style="padding: 12px 0; color: rgba(255,255,255,0.8); font-size: 15px;">✓ 30-day support</li>
            </ul>
          </div>
          
          <a href="/contact?package=starter" style="display: block; width: 100%; padding: 20px; background: rgba(71,148,166,0.1); border: 2px solid #4794A6; color: #4794A6; text-align: center; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; transition: all 0.3s ease;">Get Started</a>
        </div>
        
        <!-- GROWTH PACKAGE -->
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border: 2px solid #4794A6; border-radius: 24px; padding: 48px; position: relative; overflow: hidden; transform: scale(1.05); box-shadow: 0 20px 60px rgba(71,148,166,0.2);">
          <div style="position: absolute; top: 24px; right: 24px; background: #4794A6; color: #000; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Most Popular</div>
          
          <h3 style="font-size: 32px; font-weight: 900; margin-bottom: 16px; color: #fff;">Growth</h3>
          <div style="font-size: 64px; font-weight: 900; color: #4794A6; line-height: 1; margin-bottom: 8px;">$75K</div>
          <p style="font-size: 14px; color: rgba(255,255,255,0.5); margin-bottom: 32px;">8-12 week delivery</p>
          
          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 32px; margin-bottom: 32px;">
            <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.7); margin-bottom: 32px;">Full-featured SaaS ready for market. Built for scale from day one.</p>
            
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.9); font-size: 15px; font-weight: 600;">✓ Everything in Starter, plus:</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Advanced platform (15-20 pages)</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Multi-user roles & permissions</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Payment integration (Stripe)</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Email automation</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Analytics dashboard</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ API development</li>
              <li style="padding: 12px 0; color: rgba(255,255,255,0.8); font-size: 15px;">✓ 90-day support</li>
            </ul>
          </div>
          
          <a href="/contact?package=growth" style="display: block; width: 100%; padding: 20px; background: #4794A6; color: #000; text-align: center; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; transition: all 0.3s ease; box-shadow: 0 4px 20px rgba(71,148,166,0.3);">Get Started</a>
        </div>
        
        <!-- ENTERPRISE PACKAGE -->
        <div style="background: linear-gradient(135deg, #111 0%, #0a0a0a 100%); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 48px; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 24px; right: 24px; background: rgba(71,148,166,0.1); color: #4794A6; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Premium</div>
          
          <h3 style="font-size: 32px; font-weight: 900; margin-bottom: 16px; color: #fff;">Enterprise</h3>
          <div style="font-size: 64px; font-weight: 900; color: #4794A6; line-height: 1; margin-bottom: 8px;">$150K+</div>
          <p style="font-size: 14px; color: rgba(255,255,255,0.5); margin-bottom: 32px;">12-16 week delivery</p>
          
          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 32px; margin-bottom: 32px;">
            <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.7); margin-bottom: 32px;">Enterprise-grade platforms that handle millions. Built for institutional trust.</p>
            
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.9); font-size: 15px; font-weight: 600;">✓ Everything in Growth, plus:</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Unlimited pages & features</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Custom integrations</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Advanced security & compliance</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Dedicated account manager</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ White-label options</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Microservices architecture</li>
              <li style="padding: 12px 0; color: rgba(255,255,255,0.8); font-size: 15px;">✓ 6-month support</li>
            </ul>
          </div>
          
          <a href="/contact?package=enterprise" style="display: block; width: 100%; padding: 20px; background: rgba(71,148,166,0.1); border: 2px solid #4794A6; color: #4794A6; text-align: center; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; transition: all 0.3s ease;">Get Started</a>
        </div>
        
      </div>
      
      <div style="text-align: center; margin-top: 60px; padding-top: 60px; border-top: 1px solid rgba(255,255,255,0.1);">
        <p style="font-size: 16px; color: rgba(255,255,255,0.6); margin-bottom: 16px;">Need something custom? We build that too.</p>
        <a href="/contact?package=custom" style="color: #4794A6; text-decoration: none; font-weight: 600; font-size: 16px; border-bottom: 2px solid #4794A6; padding-bottom: 4px; transition: all 0.3s ease;">Schedule a Call →</a>
      </div>
    </div>
  </section>

  <!-- SCARCITY -->
  <section class="scarcity">
    <div class="scarcity-content">
      <h2>We only take<br/><span>6 clients</span><br/>per year.</h2>
      <p>Every brand gets 500+ custom photos. 12-month content systems. Full Shopify builds. Complete visual identities.</p>
      <p>That's not scalable. That's intentional.</p>
      <a href="/contact" class="cta-primary">Apply for 2026</a>
    </div>
  </section>

  <!-- FINAL CTA -->
  <section class="final-cta">
    <div class="final-cta-content">
      <h2>Ready to become<br/>a movement?</h2>
      <a href="/contact" class="cta-primary">Let's Talk</a>
    </div>
  </section>

  <!-- FOOTER -->
  <footer style="background: #000; border-top: 1px solid rgba(255,255,255,0.1); padding: 60px 48px; text-align: center;">
    <div style="max-width: 1600px; margin: 0 auto;">
      <img src="/static/acromatico-logo-transparent.png" alt="Acromatico" style="width: 200px; height: auto; filter: brightness(0) invert(1); margin-bottom: 32px; opacity: 0.6;">
      <div style="display: flex; justify-content: center; gap: 32px; margin-bottom: 32px; flex-wrap: wrap;">
        <a href="/" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: color 0.2s;">Home</a>
        <a href="/education" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: color 0.2s;">Education</a>
        <a href="/studio" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: color 0.2s;">Studio</a>
        <a href="#" onclick="event.preventDefault(); openComingSoonModal('Art Prints');" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: color 0.2s; cursor: pointer;">Prints</a>
        <a href="/photography" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: color 0.2s;">Photography</a>
        <a href="/contact" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: color 0.2s;">Contact</a>
      </div>
      <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 0;">© 2026 Acromatico. We help people see differently.</p>
    </div>
  </footer>

</body>
</html>
  `));w.get("/movement",t=>t.html(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Movement - Acromatico</title>
  <link rel="icon" type="image/png" href="/static/acromatico-icon.png">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #000;
      color: #fff;
      overflow-x: hidden;
    }
    
    .nav {
      position: fixed;
      top: 0;
      width: 100%;
      padding: 24px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1000;
      background: rgba(0,0,0,0.3);
      backdrop-filter: blur(20px);
    }
    
    .nav-logo {
      height: 32px;
    }
    
    .nav-links {
      display: flex;
      gap: 32px;
      align-items: center;
    }
    
    .nav-links a {
      color: #fff;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: opacity 0.3s;
    }
    
    .nav-links a:hover {
      opacity: 0.7;
    }
    
    .fullscreen-hero {
      height: 100vh;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    
    .fullscreen-hero img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.4);
    }
    
    .hero-text {
      position: relative;
      z-index: 2;
      text-align: center;
      padding: 0 40px;
    }
    
    .hero-text h1 {
      font-size: clamp(48px, 10vw, 140px);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1;
      margin-bottom: 24px;
      text-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }
    
    .hero-text p {
      font-size: clamp(18px, 2.5vw, 32px);
      font-weight: 300;
      max-width: 800px;
      margin: 0 auto;
      text-shadow: 0 2px 10px rgba(0,0,0,0.5);
    }
    
    .split-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 100vh;
    }
    
    .split-image {
      position: relative;
      overflow: hidden;
    }
    
    .split-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .split-content {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 80px 60px;
      background: #000;
    }
    
    .split-content-inner {
      max-width: 500px;
    }
    
    .split-content h2 {
      font-size: clamp(36px, 5vw, 72px);
      font-weight: 700;
      margin-bottom: 24px;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }
    
    .split-content p {
      font-size: clamp(16px, 2vw, 24px);
      line-height: 1.6;
      color: #ccc;
    }
    
    .triple-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0;
    }
    
    .grid-item {
      position: relative;
      aspect-ratio: 1;
      overflow: hidden;
    }
    
    .grid-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }
    
    .grid-item:hover img {
      transform: scale(1.1);
    }
    
    .grid-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 32px;
      background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, transparent 100%);
    }
    
    .grid-overlay h3 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    
    .grid-overlay p {
      font-size: 16px;
      color: #ccc;
    }
    
    .manifesto-big {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 120px 40px;
      background: #000;
    }
    
    .manifesto-big h2 {
      font-size: clamp(40px, 8vw, 120px);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.2;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .manifesto-big span {
      color: #00d4ff;
    }
    
    .final-cta {
      height: 100vh;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    
    .final-cta img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.3);
    }
    
    .final-cta-content {
      position: relative;
      z-index: 2;
      text-align: center;
    }
    
    .final-cta h2 {
      font-size: clamp(48px, 8vw, 96px);
      font-weight: 700;
      margin-bottom: 48px;
      letter-spacing: -0.02em;
      text-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }
    
    .final-cta a {
      display: inline-block;
      padding: 24px 60px;
      background: #fff;
      color: #000;
      text-decoration: none;
      font-size: 20px;
      font-weight: 700;
      border-radius: 50px;
      transition: transform 0.3s, box-shadow 0.3s;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    
    .final-cta a:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(255,255,255,0.3);
    }
    
    @media (max-width: 1024px) {
      .split-section {
        grid-template-columns: 1fr;
      }
      
      .split-image {
        min-height: 50vh;
      }
      
      .triple-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <!-- Navigation -->
  <nav class="nav">
    <a href="/">
      <img src="/static/acromatico-logo-transparent.png" alt="Acromatico" class="nav-logo">
    </a>
    <div class="nav-links">
      <a href="/studio">Studio</a>
      <a href="/academy">Academy</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </div>
  </nav>

  <!-- Hero: Full-screen image -->
  <section class="fullscreen-hero">
    <img src="/static/images/hero-freedom-hill.jpg" alt="Freedom">
    <div class="hero-text">
      <h1>FEEL ALIVE</h1>
      <p>This is the movement.</p>
    </div>
  </section>

  <!-- Feel Different -->
  <section class="split-section">
    <div class="split-content">
      <div class="split-content-inner">
        <h2>Feel<br/>Different</h2>
        <p>Stand out. Don't blend in. Your vision deserves more than templates.</p>
      </div>
    </div>
    <div class="split-image">
      <img src="/static/images/hero-brand-epic.jpg" alt="Different">
    </div>
  </section>

  <!-- Feel Empowered -->
  <section class="split-section">
    <div class="split-image">
      <img src="/static/images/hero-studio-wow.jpg" alt="Empowered">
    </div>
    <div class="split-content">
      <div class="split-content-inner">
        <h2>Feel<br/>Empowered</h2>
        <p>We amplify your vision. You walk away with power.</p>
      </div>
    </div>
  </section>

  <!-- Feel Confident -->
  <section class="split-section">
    <div class="split-content">
      <div class="split-content-inner">
        <h2>Feel<br/>Confident</h2>
        <p>Own your brand. Stand taller. Walk into rooms like you own them.</p>
      </div>
    </div>
    <div class="split-image">
      <img src="/static/images/brand-seaside-boca-shoot.jpg" alt="Confident">
    </div>
  </section>

  <!-- The Culture Grid -->
  <section class="triple-grid">
    <div class="grid-item">
      <img src="/static/images/hero-photography-wow.jpg" alt="Photography First">
      <div class="grid-overlay">
        <h3>Photography First</h3>
        <p>500+ custom photos per brand</p>
      </div>
    </div>
    <div class="grid-item">
      <img src="/static/images/hero-education-wow.jpg" alt="20+ Years">
      <div class="grid-overlay">
        <h3>20+ Years</h3>
        <p>Experience matters</p>
      </div>
    </div>
    <div class="grid-item">
      <img src="/static/images/hero-prints-wow.jpg" alt="Exclusive">
      <div class="grid-overlay">
        <h3>6 Clients Per Year</h3>
        <p>Intentionally exclusive</p>
      </div>
    </div>
  </section>

  <!-- Big Manifesto -->
  <section class="manifesto-big">
    <h2>
      We don't build brands.<br/>
      We build <span>movements.</span>
    </h2>
  </section>

  <!-- Final CTA -->
  <section class="final-cta">
    <img src="/static/images/hero-photography-real.jpg" alt="Join">
    <div class="final-cta-content">
      <h2>Ready?</h2>
      <a href="/contact">Join The Movement</a>
    </div>
  </section>

  ${_t}
</body>
</html>
  `));w.get("/about",t=>t.render(e("div",{style:"background: #F5F3F0; min-height: 100vh;",children:[e(pf,{}),e("section",{style:"padding: 140px 24px 80px; background: linear-gradient(180deg, #F5F3F0 0%, #E8E5E0 100%);",children:e("div",{style:"max-width: 1000px; margin: 0 auto; text-align: center;",children:[e("h1",{style:"font-size: 64px; font-weight: 300; letter-spacing: -2px; margin-bottom: 24px; color: #3D3935;",children:"Our Story"}),e("p",{style:"font-size: 24px; line-height: 1.6; color: #8B7E6A; max-width: 800px; margin: 0 auto;",children:"We're not just here to take photos—we're here to tell your story the way it was meant to be told."})]})}),e("section",{style:"padding: 100px 24px; background: white;",children:e("div",{style:"max-width: 900px; margin: 0 auto;",children:[e("div",{style:"margin-bottom: 80px;",children:[e("h2",{style:"font-size: 48px; font-weight: 300; letter-spacing: -1px; margin-bottom: 32px; color: #3D3935;",children:"No Forced Moments. No Copy-Paste Edits."}),e("p",{style:"font-size: 20px; line-height: 1.8; color: #5A5550; margin-bottom: 24px;",children:"Just real, meaningful connections captured with intention. We keep it real. Every couple, every brand, every story is different—so why should your photos look the same as everyone else's?"}),e("p",{style:"font-size: 20px; line-height: 1.8; color: #5A5550; margin-bottom: 24px;",children:["We take the time to understand who you are and craft images that feel like ",e("em",{style:"color: #3D3935; font-style: italic;",children:"you"}),". No awkward poses, no stiff smiles—just raw, authentic moments that hit home."]})]}),e("div",{style:"background: #F5F3F0; padding: 60px; margin-bottom: 80px; border-left: 4px solid #3D3935;",children:[e("h3",{style:"font-size: 32px; font-weight: 400; margin-bottom: 24px; color: #3D3935;",children:"We Keep It Honest."}),e("p",{style:"font-size: 20px; line-height: 1.8; color: #5A5550; margin-bottom: 24px;",children:"What you see is what you get. No paid referrals, no outsourcing, no gimmicks—just a team that genuinely cares about making every moment unforgettable."}),e("p",{style:"font-size: 20px; line-height: 1.8; color: #5A5550;",children:["For more than two decades, we've been all about one thing: ",e("strong",{style:"color: #3D3935;",children:"capturing stories that last."})]})]}),e("div",{style:"margin-bottom: 80px;",children:[e("h2",{style:"font-size: 48px; font-weight: 300; letter-spacing: -1px; margin-bottom: 48px; color: #3D3935; text-align: center;",children:"Meet the Artists"}),e("div",{style:"display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-bottom: 60px;",children:[e("div",{children:[e("h3",{style:"font-size: 28px; font-weight: 400; margin-bottom: 16px; color: #3D3935;",children:"Italo Campilii"}),e("p",{style:"font-size: 16px; line-height: 1.8; color: #8B7E6A; margin-bottom: 16px;",children:"Photographer, Filmmaker, Storyteller"}),e("p",{style:"font-size: 18px; line-height: 1.8; color: #5A5550;",children:["After decades of chasing light across continents—from the turquoise shores of Aruba to the golden villages of Cinque Terre—Italo discovered that the best photographs aren't staged. They're ",e("em",{style:"color: #3D3935;",children:"felt"}),"."]}),e("p",{style:"font-size: 18px; line-height: 1.8; color: #5A5550; margin-top: 16px;",children:"Co-founder of Ecolosophy, father, and advocate for intentional living, Italo brings a perspective shaped by years of healing, travel, and deep connection to nature."})]}),e("div",{children:[e("h3",{style:"font-size: 28px; font-weight: 400; margin-bottom: 16px; color: #3D3935;",children:"Ale"}),e("p",{style:"font-size: 16px; line-height: 1.8; color: #8B7E6A; margin-bottom: 16px;",children:"Photographer, Visual Artist, Detail Obsessive"}),e("p",{style:"font-size: 18px; line-height: 1.8; color: #5A5550;",children:"Ale sees the world in frames—the way light falls, the way a moment breathes, the way emotion lives in the smallest details. Together with Italo, she captures the places and moments that make us stop and remember what it feels like to be alive."}),e("p",{style:"font-size: 18px; line-height: 1.8; color: #5A5550; margin-top: 16px;",children:"Her work is defined by honesty, precision, and a refusal to settle for anything less than real."})]})]})]}),e("div",{style:"margin-bottom: 80px; text-align: center;",children:[e("h2",{style:"font-size: 48px; font-weight: 300; letter-spacing: -1px; margin-bottom: 32px; color: #3D3935;",children:"What We Believe"}),e("div",{style:"display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; margin-top: 60px;",children:[e("div",{children:[e("div",{style:"font-size: 48px; margin-bottom: 16px;",children:"📸"}),e("h4",{style:"font-size: 20px; font-weight: 500; margin-bottom: 12px; color: #3D3935;",children:"Authenticity Over Everything"}),e("p",{style:"font-size: 16px; line-height: 1.6; color: #8B7E6A;",children:"We don't manufacture moments. We capture them as they happen—raw, real, unforgettable."})]}),e("div",{children:[e("div",{style:"font-size: 48px; margin-bottom: 16px;",children:"🌍"}),e("h4",{style:"font-size: 20px; font-weight: 500; margin-bottom: 12px; color: #3D3935;",children:"Timeless, Not Trendy"}),e("p",{style:"font-size: 16px; line-height: 1.6; color: #8B7E6A;",children:"Trends fade. Moments last. We create images that will matter in 20 years, not just 20 minutes."})]}),e("div",{children:[e("div",{style:"font-size: 48px; margin-bottom: 16px;",children:"✨"}),e("h4",{style:"font-size: 20px; font-weight: 500; margin-bottom: 12px; color: #3D3935;",children:"Quality Over Quantity"}),e("p",{style:"font-size: 16px; line-height: 1.6; color: #8B7E6A;",children:"Limited editions. Hand-signed prints. Every piece is crafted with intention, not mass-produced."})]})]})]}),e("div",{style:"background: #3D3935; padding: 80px 60px; text-align: center; color: #F5F3F0;",children:[e("h2",{style:"font-size: 42px; font-weight: 300; margin-bottom: 24px; color: #F5F3F0;",children:"Let's Create Something Real, Together."}),e("p",{style:"font-size: 20px; line-height: 1.6; color: #E8E5E0; margin-bottom: 40px; max-width: 700px; margin-left: auto; margin-right: auto;",children:"Whether you're looking for fine art prints that transform your space or storytelling photography that captures your most important moments—we're here."}),e("div",{style:"display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;",children:[e("a",{href:"#",onclick:"event.preventDefault(); openComingSoonModal('Art Prints');",style:"padding: 18px 40px; background: white; color: #3D3935; text-decoration: none; font-size: 16px; font-weight: 500; letter-spacing: 1px; transition: all 0.3s; display: inline-block; cursor: pointer;",children:"EXPLORE PRINTS"}),e("a",{href:"https://acromatico.com/contact",target:"_blank",style:"padding: 18px 40px; background: transparent; color: white; border: 2px solid white; text-decoration: none; font-size: 16px; font-weight: 500; letter-spacing: 1px; transition: all 0.3s; display: inline-block;",children:"GET IN TOUCH"})]})]})]})}),e(mf,{})]})));w.get("/pricing",t=>t.render(e("div",{class:"min-h-screen bg-black text-white",children:[e("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}),e(sr,{}),e("section",{class:"pt-32 pb-20 px-6",children:e("div",{class:"max-w-7xl mx-auto text-center",children:[e("h1",{class:"text-7xl md:text-8xl font-black mb-6",style:"letter-spacing: -0.02em;",children:"Programs & Pricing"}),e("p",{class:"text-2xl text-gray-400 mb-12 max-w-3xl mx-auto",children:["From beginner-friendly academy classes to professional masterclass coaching—",e("br",{}),"find the perfect program for your journey."]})]})}),e("section",{class:"py-20 px-6 border-t border-white/10",children:e("div",{class:"max-w-7xl mx-auto",children:[e("div",{class:"text-center mb-16",children:[e("h2",{class:"text-5xl font-black mb-4",children:"Masterclass Programs"}),e("p",{class:"text-xl text-gray-400",children:"Professional coaching for photographers of all ages"})]}),e("div",{class:"grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16",children:[e("div",{class:"bg-gradient-to-br from-gray-900 to-black rounded-3xl p-10 border-2 border-[#4794A6]/30 hover:border-[#4794A6] transition-all",children:[e("div",{class:"flex justify-between items-start mb-6",children:[e("div",{children:[e("h3",{class:"text-3xl font-bold mb-2",children:"Masterclass Coaching"}),e("div",{class:"text-5xl font-black text-[#4794A6] mb-2",children:"$695"}),e("p",{class:"text-gray-400",children:"One-time investment"})]}),e("span",{class:"bg-[#4794A6] text-white px-3 py-1 rounded-full text-xs font-bold uppercase",children:"STARTER"})]}),e("a",{href:"/masterclass",class:"block w-full py-4 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-center font-bold text-lg mb-8 transition-all",children:"Learn More"}),e("div",{class:"space-y-3 text-sm",children:[e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Mentorship for All Ages"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"2 Strategic Coaching Sessions"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Portfolio Review & Feedback"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Equipment Review"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Brand Guidance"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Business Strategy Consultation"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"$695 Credit Toward Business in a Box"})]})]})]}),e("div",{class:"bg-gradient-to-br from-white to-gray-100 rounded-3xl p-10 border-2 border-white text-black",children:[e("div",{class:"flex justify-between items-start mb-6",children:[e("div",{children:[e("h3",{class:"text-3xl font-bold mb-2",children:"Business in a Box"}),e("div",{class:"text-5xl font-black mb-2",children:"$3,000"}),e("p",{class:"text-gray-600",children:"One-time investment"})]}),e("span",{class:"bg-black text-white px-3 py-1 rounded-full text-xs font-bold uppercase",children:"PRO"})]}),e("a",{href:"/masterclass",class:"block w-full py-4 rounded-full bg-black hover:bg-gray-800 text-white text-center font-bold text-lg mb-8 transition-all",children:"Learn More"}),e("div",{class:"space-y-3 text-sm",children:[e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-black flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"font-semibold",children:"Everything in Coaching, plus:"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-black flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Complete Wedding/Portrait/Commercial Training"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-black flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"AI Tools"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-black flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Photography Workflow (Booking to Delivery)"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-black flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Business Plan & Marketing Strategy"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-black flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Legal & Business Guidance"})]})]})]})]}),e("div",{class:"max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border-2 border-gray-800",children:[e("h3",{class:"text-3xl font-bold text-center mb-8",children:"Masterclass Comparison"}),e("div",{class:"overflow-x-auto",children:e("table",{class:"w-full",children:[e("thead",{children:e("tr",{class:"border-b-2 border-gray-800",children:[e("th",{class:"text-left py-4 px-4 font-bold",children:"Feature"}),e("th",{class:"text-center py-4 px-4 font-bold",children:"Coaching"}),e("th",{class:"text-center py-4 px-4 font-bold",children:"Business Box"})]})}),e("tbody",{class:"text-sm",children:[e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Mentorship for All Ages"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Strategic Coaching Sessions"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Portfolio Review & Feedback"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Equipment Review"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Brand Guidance"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Business Strategy Consultation"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Complete Photography Training"}),e("td",{class:"text-center py-3 px-4 text-gray-600",children:"—"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"AI Tools"}),e("td",{class:"text-center py-3 px-4 text-gray-600",children:"—"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Photography Workflow System"}),e("td",{class:"text-center py-3 px-4 text-gray-600",children:"—"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Business Plan & Marketing Strategy"}),e("td",{class:"text-center py-3 px-4 text-gray-600",children:"—"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Legal & Business Guidance"}),e("td",{class:"text-center py-3 px-4 text-gray-600",children:"—"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"bg-gradient-to-r from-gray-900 to-black",children:[e("td",{class:"py-4 px-4 font-bold text-lg",children:"Investment"}),e("td",{class:"text-center py-4 px-4 font-bold text-2xl text-[#4794A6]",children:"$695"}),e("td",{class:"text-center py-4 px-4 font-bold text-2xl",children:"$3,000"})]})]})]})})]})]})}),e("section",{class:"py-20 px-6 border-t border-white/10",children:e("div",{class:"max-w-7xl mx-auto",children:[e("div",{class:"text-center mb-16",children:[e("h2",{class:"text-5xl font-black mb-4",children:"Academy Programs"}),e("p",{class:"text-xl text-gray-400",children:"Monthly photography classes for young creators (Ages 7-14)"})]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16",children:[e("div",{class:"bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800",children:[e("div",{class:"text-center mb-6",children:[e("div",{class:"text-4xl font-black mb-2 text-[#4794A6]",children:"1"}),e("div",{class:"text-gray-400 text-sm",children:"Student"})]}),e("div",{class:"text-center mb-6",children:[e("div",{class:"text-3xl font-bold",children:["$116",e("span",{class:"text-sm text-gray-400",children:"/mo"})]}),e("div",{class:"text-xs text-gray-500 mt-1",children:"$93/mo annual"})]}),e("a",{href:"/education",class:"block w-full py-3 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-center font-bold text-sm transition-all",children:"Enroll Now"}),e("div",{class:"mt-6 pt-6 border-t border-gray-800 space-y-2 text-xs text-gray-400",children:[e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," 8 live classes/month"]}),e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," All recordings"]}),e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," Cancel anytime"]})]})]}),e("div",{class:"bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border-2 border-[#4794A6] relative",children:[e("div",{class:"absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4794A6] text-white px-3 py-1 rounded-full text-xs font-bold",children:"POPULAR"}),e("div",{class:"text-center mb-6",children:[e("div",{class:"text-4xl font-black mb-2 text-[#4794A6]",children:"2"}),e("div",{class:"text-gray-400 text-sm",children:"Students"})]}),e("div",{class:"text-center mb-6",children:[e("div",{class:"text-3xl font-bold",children:["$99",e("span",{class:"text-sm text-gray-400",children:"/mo"})]}),e("div",{class:"text-xs text-gray-500 mt-1",children:"$79/mo annual (each)"})]}),e("a",{href:"/education",class:"block w-full py-3 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-center font-bold text-sm transition-all",children:"Enroll Now"}),e("div",{class:"mt-6 pt-6 border-t border-gray-800 space-y-2 text-xs text-gray-400",children:[e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," 8 live classes/month"]}),e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," All recordings"]}),e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," Save $400/year"]})]})]}),e("div",{class:"bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800",children:[e("div",{class:"text-center mb-6",children:[e("div",{class:"text-4xl font-black mb-2 text-[#4794A6]",children:"3"}),e("div",{class:"text-gray-400 text-sm",children:"Students"})]}),e("div",{class:"text-center mb-6",children:[e("div",{class:"text-3xl font-bold",children:["$89",e("span",{class:"text-sm text-gray-400",children:"/mo"})]}),e("div",{class:"text-xs text-gray-500 mt-1",children:"$71/mo annual (each)"})]}),e("a",{href:"/education",class:"block w-full py-3 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-center font-bold text-sm transition-all",children:"Enroll Now"}),e("div",{class:"mt-6 pt-6 border-t border-gray-800 space-y-2 text-xs text-gray-400",children:[e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," 8 live classes/month"]}),e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," All recordings"]}),e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," Save $540/year"]})]})]}),e("div",{class:"bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800",children:[e("div",{class:"text-center mb-6",children:[e("div",{class:"text-4xl font-black mb-2 text-[#4794A6]",children:"4+"}),e("div",{class:"text-gray-400 text-sm",children:"Students"})]}),e("div",{class:"text-center mb-6",children:[e("div",{class:"text-3xl font-bold",children:["$79",e("span",{class:"text-sm text-gray-400",children:"/mo"})]}),e("div",{class:"text-xs text-gray-500 mt-1",children:"$63/mo annual (each)"})]}),e("a",{href:"/education",class:"block w-full py-3 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-center font-bold text-sm transition-all",children:"Enroll Now"}),e("div",{class:"mt-6 pt-6 border-t border-gray-800 space-y-2 text-xs text-gray-400",children:[e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," 8 live classes/month"]}),e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," All recordings"]}),e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," Save $640/year"]})]})]})]}),e("div",{class:"max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border-2 border-gray-800",children:[e("h3",{class:"text-3xl font-bold text-center mb-8",children:"What's Included in Academy"}),e("div",{class:"grid md:grid-cols-2 gap-6 text-sm",children:[e("div",{class:"space-y-3",children:[e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"30-Minute Micro-Learning Sessions"})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"8 Live Classes per Month"})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Lifetime Instruction Library"})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"December Bonus Workshops"})]})]}),e("div",{class:"space-y-3",children:[e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Portfolio Building"})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"All Class Recordings"})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Cancel Anytime (Daily Proration)"})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Annual Billing (Save 20%)"})]})]})]})]})]})}),e("section",{class:"py-20 px-6 border-t border-white/10",children:e("div",{class:"max-w-4xl mx-auto text-center",children:[e("h2",{class:"text-4xl font-bold mb-6",children:"Still have questions?"}),e("p",{class:"text-xl text-gray-400 mb-10",children:"We're here to help you find the perfect program for your photography journey."}),e("div",{class:"flex flex-col sm:flex-row gap-4 justify-center",children:[e("a",{href:"mailto:hello@acromatico.com",class:"px-10 py-5 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white font-bold text-lg transition-all inline-block",children:"Contact Us"}),e("a",{href:"/faq",class:"px-10 py-5 rounded-full border-2 border-white hover:bg-white hover:text-black text-white font-bold text-lg transition-all inline-block",children:"View FAQ"})]})]})}),e("div",{dangerouslySetInnerHTML:{__html:_t}})]}),{title:"Programs & Pricing - Acromatico"}));w.get("/invoices",t=>t.render(e("div",{class:"min-h-screen bg-black text-white",children:[e("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .invoice-container { box-shadow: none !important; border: 1px solid #ddd !important; }
        }
      `}),e("div",{class:"no-print",children:e(sr,{})}),e("section",{class:"pt-32 pb-20 px-6",children:e("div",{class:"max-w-5xl mx-auto",children:[e("div",{class:"no-print text-center mb-12",children:[e("h1",{class:"text-6xl mb-6",style:"font-weight: 300; letter-spacing: -0.03em; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;",children:"For Step Up Students"}),e("div",{class:"max-w-3xl mx-auto text-lg text-gray-400 space-y-4",style:"font-weight: 300; line-height: 1.7;",children:[e("p",{children:[e("strong",{class:"text-white",style:"font-weight: 400;",children:"We proudly collaborate with Step Up For Students"})," to make quality photography education accessible to Florida families."]}),e("p",{children:"If you cannot locate your original invoice or need to generate a new one for reimbursement, use this tool to download your invoice. All invoices are Step Up compliant and include detailed program descriptions."}),e("p",{class:"text-sm",style:"font-weight: 300;",children:[e("strong",{class:"text-white",style:"font-weight: 400;",children:"Note:"})," Our programs qualify under the ",e("span",{class:"text-[#4794A6]",children:"Electives"})," category. Instructor credentials available upon request."]})]}),e("div",{class:"mt-8",children:[e("button",{onclick:"downloadCredentials()",class:"px-8 py-4 rounded-full bg-gradient-to-r from-[#4794A6] to-[#5aa5b8] hover:from-[#5aa5b8] hover:to-[#6bb6c9] text-white text-lg transition-all shadow-lg",style:"font-weight: 400; letter-spacing: 0.01em;",children:"📄 Download Instructor Credentials"}),e("p",{class:"text-sm text-gray-500 mt-3",style:"font-weight: 300;",children:"For Step Up verification if requested"})]})]}),e("div",{class:"no-print bg-gradient-to-br from-[#4794A6]/20 to-[#4794A6]/5 rounded-3xl p-8 border-2 border-[#4794A6]/30 mb-8",children:[e("h2",{class:"text-2xl mb-4 text-center",style:"font-weight: 300; letter-spacing: -0.02em;",children:"💳 Payment Options"}),e("p",{class:"text-center text-gray-400 mb-6",style:"font-weight: 300;",children:"If you haven't done so, please complete your payment before generating your invoice"}),e("div",{class:"grid md:grid-cols-2 gap-6 max-w-3xl mx-auto",children:[e("div",{class:"bg-black/30 rounded-2xl p-6 border border-[#4794A6]/20 md:col-span-2",children:[e("p",{class:"mb-2 text-lg",style:"font-weight: 400;",children:"💳 Credit/Debit Card"}),e("p",{class:"text-sm text-gray-400 mb-3",style:"font-weight: 300;",children:"Secure payment powered by Stripe"}),e("button",{onclick:"openStripePayment()",class:"inline-block px-6 py-3 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-sm transition-all w-full",style:"font-weight: 400;",children:"Pay with Credit/Debit Card →"})]}),e("div",{class:"bg-black/30 rounded-2xl p-6 border border-[#4794A6]/20",children:[e("p",{class:"mb-2",style:"font-weight: 400;",children:"📱 Zelle"}),e("p",{class:"text-[#4794A6] font-mono text-lg",children:"954-779-0921"}),e("p",{class:"text-xs text-gray-400 mt-2",style:"font-weight: 300;",children:"Send payment to this phone number"})]}),e("div",{class:"bg-black/30 rounded-2xl p-6 border border-[#4794A6]/20",children:[e("p",{class:"mb-2",style:"font-weight: 400;",children:"💰 Venmo"}),e("p",{class:"text-[#4794A6] font-mono text-lg",children:"@acromatico"}),e("p",{class:"text-xs text-gray-400 mt-2",style:"font-weight: 300;",children:"Send payment to this handle"})]}),e("div",{class:"bg-black/30 rounded-2xl p-6 border border-[#4794A6]/20",children:[e("p",{class:"mb-2",style:"font-weight: 400;",children:"💵 Cash App"}),e("p",{class:"text-[#4794A6] font-mono text-lg",children:"$acromatico"}),e("p",{class:"text-xs text-gray-400 mt-2",style:"font-weight: 300;",children:"Send payment to this cashtag"})]}),e("div",{class:"bg-black/30 rounded-2xl p-6 border border-[#4794A6]/20",children:[e("p",{class:"mb-2",style:"font-weight: 400;",children:"💵 Check or Cash"}),e("p",{class:"text-sm text-gray-400",style:"font-weight: 300;",children:"Contact us for mailing address"})]})]})]}),e("div",{class:"no-print bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border-2 border-gray-800 mb-12",children:[e("h2",{class:"text-2xl mb-6",style:"font-weight: 300; letter-spacing: -0.02em;",children:"Generate Your Invoice"}),e("div",{class:"space-y-4",children:[e("div",{class:"grid md:grid-cols-2 gap-4",children:[e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Parent/Guardian Name*"}),e("input",{type:"text",id:"parentName",placeholder:"John Smith",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;"})]}),e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Email*"}),e("input",{type:"email",id:"parentEmail",placeholder:"john@example.com",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;"})]})]}),e("div",{class:"grid md:grid-cols-2 gap-4",children:[e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Student Name(s)*"}),e("input",{type:"text",id:"studentNames",placeholder:"Sarah Smith, Michael Smith",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;"})]}),e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Invoice Date*"}),e("input",{type:"date",id:"invoiceDate",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;"})]})]}),e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Program*"}),e("select",{id:"programType",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;",children:[e("option",{value:"",children:"Select a program..."}),e("optgroup",{label:"Academy (Ages 7-14)",children:[e("option",{value:"academy-1-monthly",children:"Academy - 1 Student - Monthly ($116/mo)"}),e("option",{value:"academy-1-annual",children:"Academy - 1 Student - Annual ($930/year)"}),e("option",{value:"academy-2-monthly",children:"Academy - 2 Students - Monthly ($198/mo)"}),e("option",{value:"academy-2-annual",children:"Academy - 2 Students - Annual ($1,580/year)"}),e("option",{value:"academy-3-monthly",children:"Academy - 3 Students - Monthly ($267/mo)"}),e("option",{value:"academy-3-annual",children:"Academy - 3 Students - Annual ($2,130/year)"}),e("option",{value:"academy-4-monthly",children:"Academy - 4+ Students - Monthly ($316/mo)"}),e("option",{value:"academy-4-annual",children:"Academy - 4+ Students - Annual ($2,520/year)"})]}),e("optgroup",{label:"Masterclass",children:[e("option",{value:"masterclass-coaching",children:"Masterclass Coaching ($695)"}),e("option",{value:"masterclass-business",children:"Business in a Box ($3,000)"})]})]})]}),e("div",{class:"grid md:grid-cols-2 gap-4",children:[e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Amount*"}),e("input",{type:"number",id:"invoiceAmount",placeholder:"116.00",step:"0.01",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;"})]}),e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Due Date"}),e("input",{type:"date",id:"dueDate",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;"})]})]}),e("div",{class:"grid md:grid-cols-2 gap-4",children:[e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Payment Date*"}),e("input",{type:"date",id:"paymentDate",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;"})]}),e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Payment Method*"}),e("select",{id:"paymentMethod",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;",children:[e("option",{value:"",children:"Select payment method..."}),e("option",{value:"Credit Card (Stripe)",children:"Credit Card (Stripe)"}),e("option",{value:"Zelle",children:"Zelle"}),e("option",{value:"Venmo",children:"Venmo"}),e("option",{value:"Cash App",children:"Cash App"}),e("option",{value:"Check",children:"Check"}),e("option",{value:"Cash",children:"Cash"})]})]})]}),e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Additional Notes"}),e("textarea",{id:"invoiceNotes",rows:"2",placeholder:"Any additional information...",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;"})]}),e("button",{onclick:"generateInvoice()",class:"w-full py-4 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-lg transition-all",style:"font-weight: 400; letter-spacing: 0.01em;",children:"Generate Invoice for Step Up"})]})]}),e("style",{children:`
            @media print {
              @page { 
                size: letter portrait; 
                margin: 0.4in 0.5in; 
              }
              body { 
                margin: 0 !important; 
                padding: 0 !important;
                width: 8.5in !important;
              }
              .invoice-container { 
                max-width: 7.5in !important;
                width: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
                border-radius: 0 !important;
                box-shadow: none !important;
                page-break-after: avoid !important;
                page-break-inside: avoid !important;
                transform: scale(0.92);
                transform-origin: top left;
              }
              .invoice-container * { 
                font-size: 10px !important; 
                line-height: 1.35 !important;
              }
              .invoice-container h1 { font-size: 28px !important; margin: 0 0 8px 0 !important; }
              .invoice-container .text-5xl { font-size: 28px !important; }
              .invoice-container .text-2xl { font-size: 16px !important; }
              .invoice-container .text-xl { font-size: 14px !important; }
              .invoice-container .text-lg { font-size: 12px !important; }
              .invoice-container .text-sm { font-size: 9px !important; }
              .invoice-container img { max-height: 42px !important; margin-bottom: 8px !important; }
              .invoice-container .p-12 { padding: 0 !important; }
              .invoice-container .pb-8 { padding-bottom: 0.2in !important; }
              .invoice-container .pt-8 { padding-top: 0.2in !important; }
              .invoice-container .py-8 { padding-top: 0.2in !important; padding-bottom: 0.2in !important; }
              .invoice-container .mb-8 { margin-bottom: 0.15in !important; }
              .invoice-container .mb-4 { margin-bottom: 0.08in !important; }
              .invoice-container table { margin-bottom: 0.15in !important; }
              .invoice-container thead th { padding: 6px 8px !important; }
              .invoice-container tbody td { padding: 6px 8px !important; }
              .invoice-container .border-b-2 { border-bottom-width: 1px !important; }
              .no-print { display: none !important; }
            }
          `}),e("div",{id:"invoicePreview",class:"invoice-container bg-white text-black rounded-3xl p-12 shadow-2xl hidden",children:[e("div",{class:"border-b-2 border-gray-300 pb-8 mb-8",children:e("div",{class:"flex justify-between items-start",children:[e("div",{children:[e("img",{src:"/static/acromatico-logo-official.png",alt:"Acromatico",class:"h-16 mb-4"}),e("div",{class:"text-sm text-gray-600",children:[e("p",{class:"font-bold text-lg text-black mb-2",children:"Acromatico Inc"}),e("p",{children:"2300 W 84th ST. Suite 213"}),e("p",{children:"Miami, FL 33016"}),e("p",{class:"mt-2",children:"Phone: 954.779.0921"}),e("p",{children:"Email: info@acromatico.com"})]})]}),e("div",{class:"text-right",children:[e("h1",{class:"text-5xl font-thin tracking-widest text-[#4794A6] mb-4",style:"font-family: 'Inter', sans-serif; letter-spacing: 0.2em;",children:"INVOICE"}),e("p",{class:"text-sm text-gray-600 mb-1",children:"Invoice #"}),e("p",{class:"text-2xl font-bold",id:"invoiceNumber",children:"INV-1247"}),e("p",{class:"text-sm text-gray-600 mt-3 mb-1",children:"Invoice Date"}),e("p",{class:"font-semibold",id:"displayInvoiceDate",children:"-"}),e("p",{class:"text-sm text-gray-600 mt-2 mb-1",children:"Due Date"}),e("p",{class:"font-semibold",id:"displayDueDate",children:"-"})]})]})}),e("div",{class:"mb-8",children:[e("p",{class:"text-sm text-gray-600 font-bold mb-2",children:"BILL TO"}),e("p",{class:"text-lg font-bold",id:"displayParentName",children:"-"}),e("p",{class:"text-gray-600",id:"displayParentEmail",children:"-"})]}),e("table",{class:"w-full mb-8",children:[e("thead",{class:"bg-gray-100 border-y-2 border-gray-300",children:e("tr",{children:[e("th",{class:"text-left py-3 px-4 font-bold",children:"Description"}),e("th",{class:"text-center py-3 px-4 font-bold",children:"Students"}),e("th",{class:"text-right py-3 px-4 font-bold",children:"Amount"})]})}),e("tbody",{children:e("tr",{class:"border-b border-gray-200",children:[e("td",{class:"py-4 px-4",children:[e("p",{class:"font-semibold text-lg mb-2",id:"displayProgram",children:"-"}),e("p",{class:"text-sm font-medium text-gray-700 mb-1",children:["Student(s): ",e("span",{id:"displayStudents",children:"-"})]}),e("div",{class:"text-sm text-gray-600 mt-2",id:"displayBenefits"})]}),e("td",{class:"text-center py-4 px-4 font-bold text-lg",id:"displayStudentCount",children:"1"}),e("td",{class:"text-right py-4 px-4 font-bold text-xl",id:"displayAmount",children:"$0.00"})]})})]}),e("div",{class:"flex justify-end mb-8",children:e("div",{class:"w-80",children:[e("div",{class:"flex justify-between py-2 text-lg",children:[e("span",{class:"font-bold",children:"Subtotal:"}),e("span",{id:"displaySubtotal",children:"$0.00"})]}),e("div",{class:"flex justify-between py-3 border-t-2 border-gray-300 text-2xl",children:[e("span",{class:"font-black",children:"TOTAL DUE:"}),e("span",{class:"font-black text-[#4794A6]",id:"displayTotal",children:"$0.00"})]})]})}),e("div",{class:"bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8",children:e("div",{class:"flex items-start gap-3",children:[e("div",{class:"text-3xl",children:"✅"}),e("div",{class:"flex-1",children:[e("p",{class:"font-bold text-lg text-green-800 mb-1",children:"PAYMENT RECEIVED"}),e("p",{class:"text-gray-700",children:["Payment Date: ",e("span",{class:"font-semibold",id:"displayPaymentDate",children:"-"})]}),e("p",{class:"text-gray-700",children:["Payment Method: ",e("span",{class:"font-semibold",id:"displayPaymentMethod",children:"-"})]}),e("p",{class:"text-sm text-gray-600 mt-2",children:"Thank you for your payment!"})]})]})}),e("div",{id:"notesSection",class:"mb-8 hidden",children:[e("p",{class:"text-sm font-bold text-gray-600 mb-2",children:"NOTES"}),e("p",{class:"text-gray-700",id:"displayNotes"})]}),e("div",{class:"border-t-2 border-gray-300 pt-6 text-center text-sm text-gray-600",children:[e("p",{class:"font-bold text-black mb-2",children:"For Step Up For Students Reimbursement"}),e("p",{children:"This invoice is compliant with Step Up For Students requirements and includes detailed educational program descriptions."}),e("p",{class:"mt-3",children:["Questions? Contact us at ",e("strong",{children:"info@acromatico.com"})," or ",e("strong",{children:"954.779.0921"})]})]})]}),e("div",{id:"invoiceActions",class:"no-print flex gap-4 justify-center mt-8 hidden",children:[e("button",{onclick:"window.print()",class:"px-8 py-4 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white font-bold transition-all",children:"📄 Download / Print Invoice"}),e("button",{onclick:"editInvoice()",class:"px-8 py-4 rounded-full border-2 border-white hover:bg-white hover:text-black text-white font-bold transition-all",children:"✏️ Edit Invoice"}),e("button",{onclick:"resetInvoice()",class:"px-8 py-4 rounded-full border-2 border-gray-800 hover:bg-gray-800 text-white font-bold transition-all",children:"🔄 New Invoice"})]})]})}),e("div",{class:"no-print",dangerouslySetInnerHTML:{__html:_t}}),e("script",{dangerouslySetInnerHTML:{__html:`
        // Program benefits (Step Up PEP compliant descriptions - ELECTIVES category)
        const programBenefits = {
          'academy-1-monthly': 'Photography elective lessons provided by experienced professional photographers with 20+ years of demonstrated expertise. Educational enrichment includes composition, lighting techniques, camera operation, and creative skill development. Program includes 8 individual instruction sessions per month (30 minutes each), supplemental recorded lessons, digital curriculum materials, and portfolio development for ages 7-14. (Electives - PEP Eligible)',
          'academy-1-annual': 'Full-year photography elective lessons provided by experienced professional photographers with 20+ years of demonstrated expertise. Educational enrichment includes composition, lighting techniques, camera operation, and creative skill development. Program includes 8 individual instruction sessions per month (30 minutes each), supplemental recorded lessons, digital curriculum materials, December enrichment activities, and portfolio development for ages 7-14. (Electives - PEP Eligible)',
          'academy-2-monthly': 'Photography elective lessons provided by experienced professional photographers with 20+ years of demonstrated expertise. Educational enrichment includes composition, lighting techniques, camera operation, and creative skill development. Program includes 8 individual instruction sessions per month (30 minutes each) per student, supplemental recorded lessons, digital curriculum materials, and portfolio development for ages 7-14. (Electives - PEP Eligible)',
          'academy-2-annual': 'Full-year photography elective lessons provided by experienced professional photographers with 20+ years of demonstrated expertise. Educational enrichment includes composition, lighting techniques, camera operation, and creative skill development. Program includes 8 individual instruction sessions per month (30 minutes each) per student, supplemental recorded lessons, digital curriculum materials, December enrichment activities, and portfolio development for ages 7-14. (Electives - PEP Eligible)',
          'academy-3-monthly': 'Photography elective lessons provided by experienced professional photographers with 20+ years of demonstrated expertise. Educational enrichment includes composition, lighting techniques, camera operation, and creative skill development. Program includes 8 individual instruction sessions per month (30 minutes each) per student, supplemental recorded lessons, digital curriculum materials, and portfolio development for ages 7-14. (Electives - PEP Eligible)',
          'academy-3-annual': 'Full-year photography elective lessons provided by experienced professional photographers with 20+ years of demonstrated expertise. Educational enrichment includes composition, lighting techniques, camera operation, and creative skill development. Program includes 8 individual instruction sessions per month (30 minutes each) per student, supplemental recorded lessons, digital curriculum materials, December enrichment activities, and portfolio development for ages 7-14. (Electives - PEP Eligible)',
          'academy-4-monthly': 'Photography elective lessons provided by experienced professional photographers with 20+ years of demonstrated expertise. Educational enrichment includes composition, lighting techniques, camera operation, and creative skill development. Program includes 8 individual instruction sessions per month (30 minutes each) per student, supplemental recorded lessons, digital curriculum materials, and portfolio development for ages 7-14. (Electives - PEP Eligible)',
          'academy-4-annual': 'Full-year photography elective lessons provided by experienced professional photographers with 20+ years of demonstrated expertise. Educational enrichment includes composition, lighting techniques, camera operation, and creative skill development. Program includes 8 individual instruction sessions per month (30 minutes each) per student, supplemental recorded lessons, digital curriculum materials, December enrichment activities, and portfolio development for ages 7-14. (Electives - PEP Eligible)',
          'masterclass-coaching': 'Photography business elective lessons and career enrichment provided by experienced professional photographers with 20+ years of demonstrated expertise and business credentials. Educational enrichment includes portfolio review and feedback, equipment consultation, brand development guidance, and business strategy planning. Two individual coaching sessions providing personalized mentorship and career development. (Electives - PEP Eligible)',
          'masterclass-business': 'Comprehensive photography business elective program and career enrichment provided by experienced professional photographers with 20+ years of demonstrated expertise and business credentials. Educational enrichment includes wedding, portrait, and commercial photography techniques, professional workflow development, business planning and financial management, marketing strategies, legal compliance guidance, digital tools training (AI editing), and industry best practices. Complete professional development delivered through individual instruction. (Electives - PEP Eligible)'
        };
        
        // Set defaults
        document.getElementById('invoiceDate').valueAsDate = new Date();
        document.getElementById('paymentDate').valueAsDate = new Date();
        
        // Auto-calculate due date
        document.getElementById('invoiceDate').addEventListener('change', function() {
          const invoiceDate = new Date(this.value);
          const dueDate = new Date(invoiceDate);
          dueDate.setDate(dueDate.getDate() + 30);
          document.getElementById('dueDate').valueAsDate = dueDate;
        });
        
        // Auto-populate amount
        document.getElementById('programType').addEventListener('change', function() {
          const prices = {
            'academy-1-monthly': 116, 'academy-1-annual': 930,
            'academy-2-monthly': 198, 'academy-2-annual': 1580,
            'academy-3-monthly': 267, 'academy-3-annual': 2130,
            'academy-4-monthly': 316, 'academy-4-annual': 2520,
            'masterclass-coaching': 695, 'masterclass-business': 3000
          };
          if (prices[this.value]) {
            document.getElementById('invoiceAmount').value = prices[this.value].toFixed(2);
          }
        });
        
        function generateInvoice() {
          // Get values
          const parentName = document.getElementById('parentName').value;
          const parentEmail = document.getElementById('parentEmail').value;
          const studentNames = document.getElementById('studentNames').value;
          const invoiceDate = document.getElementById('invoiceDate').value;
          const dueDate = document.getElementById('dueDate').value;
          const programType = document.getElementById('programType');
          const programText = programType.options[programType.selectedIndex].text;
          const programValue = programType.value;
          const amount = parseFloat(document.getElementById('invoiceAmount').value);
          const paymentDate = document.getElementById('paymentDate').value;
          const paymentMethod = document.getElementById('paymentMethod').value;
          const notes = document.getElementById('invoiceNotes').value;
          
          // Validation
          if (!parentName || !parentEmail || !studentNames || !invoiceDate || !programValue || !amount || !paymentDate || !paymentMethod) {
            alert('Please fill in all required fields (*)');
            return;
          }
          
          // Generate invoice with auto-incrementing number
          let invoiceCounter = parseInt(localStorage.getItem('acromatico_invoice_counter') || '1247');
          invoiceCounter += Math.floor(Math.random() * 3) + 1; // Skip 1-3 numbers to look busy
          localStorage.setItem('acromatico_invoice_counter', invoiceCounter.toString());
          const invoiceNum = 'INV-' + invoiceCounter;
          document.getElementById('invoiceNumber').textContent = invoiceNum;
          document.getElementById('displayInvoiceDate').textContent = new Date(invoiceDate).toLocaleDateString();
          document.getElementById('displayDueDate').textContent = dueDate ? new Date(dueDate).toLocaleDateString() : 'Upon Receipt';
          document.getElementById('displayParentName').textContent = parentName;
          document.getElementById('displayParentEmail').textContent = parentEmail;
          document.getElementById('displayProgram').textContent = programText;
          document.getElementById('displayStudents').textContent = studentNames;
          
          // Benefits
          const benefits = programBenefits[programValue] || 'Educational photography program';
          document.getElementById('displayBenefits').innerHTML = '<strong>Educational Benefits:</strong><br>' + benefits;
          
          // Student count
          const studentCount = studentNames.split(',').length;
          document.getElementById('displayStudentCount').textContent = studentCount;
          
          // Amounts
          const formattedAmount = '$' + amount.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
          document.getElementById('displayAmount').textContent = formattedAmount;
          document.getElementById('displaySubtotal').textContent = formattedAmount;
          document.getElementById('displayTotal').textContent = formattedAmount;
          
          // Payment info
          document.getElementById('displayPaymentDate').textContent = new Date(paymentDate).toLocaleDateString();
          document.getElementById('displayPaymentMethod').textContent = paymentMethod;
          
          // Notes
          if (notes) {
            document.getElementById('displayNotes').textContent = notes;
            document.getElementById('notesSection').classList.remove('hidden');
          } else {
            document.getElementById('notesSection').classList.add('hidden');
          }
          
          // Show invoice
          document.getElementById('invoicePreview').classList.remove('hidden');
          document.getElementById('invoiceActions').classList.remove('hidden');
          document.getElementById('invoicePreview').scrollIntoView({ behavior: 'smooth' });
        }
        
        function editInvoice() {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        function resetInvoice() {
          document.getElementById('parentName').value = '';
          document.getElementById('parentEmail').value = '';
          document.getElementById('studentNames').value = '';
          document.getElementById('programType').value = '';
          document.getElementById('invoiceAmount').value = '';
          document.getElementById('paymentMethod').value = '';
          document.getElementById('invoiceNotes').value = '';
          document.getElementById('invoiceDate').valueAsDate = new Date();
          document.getElementById('paymentDate').valueAsDate = new Date();
          const dueDate = new Date();
          dueDate.setDate(dueDate.getDate() + 30);
          document.getElementById('dueDate').valueAsDate = dueDate;
          document.getElementById('invoicePreview').classList.add('hidden');
          document.getElementById('invoiceActions').classList.add('hidden');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        function openStripePayment() {
          const programType = document.getElementById('programType').value;
          const amount = document.getElementById('invoiceAmount').value;
          
          if (!programType || !amount) {
            alert('Please select a program first to see the payment amount.');
            document.getElementById('programType').focus();
            return;
          }
          
          // Show custom payment modal with Stripe integration
          const modal = document.createElement('div');
          modal.id = 'stripe-modal';
          modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:9999;';
          
          modal.innerHTML = \`
            <div style="background:#1a1a1a;border-radius:24px;padding:48px;max-width:500px;width:90%;border:2px solid #4794A6;">
              <div style="text-align:center;margin-bottom:32px;">
                <h2 style="font-size:32px;font-weight:bold;color:white;margin-bottom:16px;">💳 Stripe Payment</h2>
                <p style="color:#999;margin-bottom:8px;">Amount to Pay</p>
                <p style="font-size:48px;font-weight:bold;color:#4794A6;">$\${parseFloat(amount).toFixed(2)}</p>
              </div>
              
              <div style="background:#0a0a0a;border-radius:16px;padding:24px;margin-bottom:24px;">
                <p style="color:#ccc;font-size:14px;line-height:1.6;">
                  <strong style="color:white;">Email us to get your secure payment link:</strong><br><br>
                  📧 <a href="mailto:info@acromatico.com?subject=Stripe Payment Request - $\${amount}&body=Hi, I'd like to make a payment of $\${amount} for my Step Up invoice. Please send me a secure Stripe payment link.%0A%0AProgram: \${programType}%0A%0AThank you!" style="color:#4794A6;text-decoration:underline;">info@acromatico.com</a><br><br>
                  We'll send you a secure Stripe payment link within 1 business hour.
                </p>
              </div>
              
              <button onclick="closeStripeModal()" style="width:100%;padding:16px;background:#4794A6;color:white;border:none;border-radius:12px;font-size:16px;font-weight:bold;cursor:pointer;">
                Close
              </button>
            </div>
          \`;
          
          document.body.appendChild(modal);
          modal.addEventListener('click', function(e) {
            if (e.target === modal) closeStripeModal();
          });
        }
        
        function closeStripeModal() {
          const modal = document.getElementById('stripe-modal');
          if (modal) modal.remove();
        }
        
        // Apple-Style Support Ticket System
        function openSupportModal() {
          const modal = document.createElement('div');
          modal.id = 'support-modal';
          modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);display:flex;align-items:center;justify-content:center;z-index:10000;backdrop-filter:blur(20px);';
          
          modal.innerHTML = \`
            <div style="background:#1a1a1a;border-radius:24px;padding:48px;max-width:600px;width:90%;border:1px solid rgba(71,148,166,0.3);box-shadow:0 25px 50px rgba(0,0,0,0.5);">
              <div style="text-align:center;margin-bottom:32px;">
                <div style="font-size:56px;margin-bottom:16px;">💬</div>
                <h2 style="font-size:32px;font-weight:300;color:white;margin-bottom:12px;letter-spacing:-0.02em;font-family:-apple-system,sans-serif;">How can we help?</h2>
                <p style="color:#999;font-size:15px;font-weight:300;line-height:1.6;">Tell us about your question or issue and we'll get back to you within 24 hours.</p>
              </div>
              
              <form id="supportForm" style="space-y-4;">
                <div style="margin-bottom:20px;">
                  <label style="display:block;color:#ccc;font-size:13px;font-weight:400;margin-bottom:8px;font-family:-apple-system,sans-serif;">Your Name</label>
                  <input type="text" id="supportName" required style="width:100%;padding:14px 16px;background:#0a0a0a;border:1px solid rgba(71,148,166,0.3);border-radius:12px;color:white;font-size:15px;font-weight:300;font-family:-apple-system,sans-serif;outline:none;transition:border 0.2s;" onfocus="this.style.borderColor='#4794A6'" onblur="this.style.borderColor='rgba(71,148,166,0.3)'" placeholder="John Smith" />
                </div>
                
                <div style="margin-bottom:20px;">
                  <label style="display:block;color:#ccc;font-size:13px;font-weight:400;margin-bottom:8px;font-family:-apple-system,sans-serif;">Email Address</label>
                  <input type="email" id="supportEmail" required style="width:100%;padding:14px 16px;background:#0a0a0a;border:1px solid rgba(71,148,166,0.3);border-radius:12px;color:white;font-size:15px;font-weight:300;font-family:-apple-system,sans-serif;outline:none;transition:border 0.2s;" onfocus="this.style.borderColor='#4794A6'" onblur="this.style.borderColor='rgba(71,148,166,0.3)'" placeholder="john@example.com" />
                </div>
                
                <div style="margin-bottom:20px;">
                  <label style="display:block;color:#ccc;font-size:13px;font-weight:400;margin-bottom:8px;font-family:-apple-system,sans-serif;">Subject</label>
                  <input type="text" id="supportSubject" required style="width:100%;padding:14px 16px;background:#0a0a0a;border:1px solid rgba(71,148,166,0.3);border-radius:12px;color:white;font-size:15px;font-weight:300;font-family:-apple-system,sans-serif;outline:none;transition:border 0.2s;" onfocus="this.style.borderColor='#4794A6'" onblur="this.style.borderColor='rgba(71,148,166,0.3)'" placeholder="Brief description of your issue" />
                </div>
                
                <div style="margin-bottom:24px;">
                  <label style="display:block;color:#ccc;font-size:13px;font-weight:400;margin-bottom:8px;font-family:-apple-system,sans-serif;">Message</label>
                  <textarea id="supportMessage" required rows="5" style="width:100%;padding:14px 16px;background:#0a0a0a;border:1px solid rgba(71,148,166,0.3);border-radius:12px;color:white;font-size:15px;font-weight:300;font-family:-apple-system,sans-serif;outline:none;resize:vertical;transition:border 0.2s;" onfocus="this.style.borderColor='#4794A6'" onblur="this.style.borderColor='rgba(71,148,166,0.3)'" placeholder="Please describe your question or issue in detail..."></textarea>
                </div>
                
                <div style="display:flex;gap:12px;">
                  <button type="button" onclick="closeSupportModal()" style="flex:1;padding:14px;background:#2a2a2a;color:#ccc;border:none;border-radius:12px;font-size:15px;font-weight:400;cursor:pointer;transition:all 0.2s;font-family:-apple-system,sans-serif;" onmouseover="this.style.background='#3a3a3a'" onmouseout="this.style.background='#2a2a2a'">
                    Cancel
                  </button>
                  <button type="submit" style="flex:1;padding:14px;background:#4794A6;color:white;border:none;border-radius:12px;font-size:15px;font-weight:400;cursor:pointer;transition:all 0.2s;font-family:-apple-system,sans-serif;" onmouseover="this.style.background='#5aa5b8'" onmouseout="this.style.background='#4794A6'">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          \`;
          
          document.body.appendChild(modal);
          modal.addEventListener('click', function(e) {
            if (e.target === modal) closeSupportModal();
          });
          
          // Handle form submission
          document.getElementById('supportForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = document.getElementById('supportName').value;
            const email = document.getElementById('supportEmail').value;
            const subject = document.getElementById('supportSubject').value;
            const message = document.getElementById('supportMessage').value;
            
            // Show loading state
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '⏳ Sending...';
            submitBtn.disabled = true;
            
            try {
              const response = await fetch('/api/support-ticket', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message })
              });
              
              if (response.ok) {
                closeSupportModal();
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.95);color:white;padding:40px 60px;border-radius:20px;z-index:10001;text-align:center;border:1px solid #4794A6;';
                successMsg.innerHTML = '<div style="font-size:48px;margin-bottom:16px;">✅</div><div style="font-size:20px;font-weight:300;margin-bottom:8px;font-family:-apple-system,sans-serif;">Message Sent!</div><div style="font-size:14px;color:#999;font-weight:300;">We\\'ll get back to you within 24 hours.</div>';
                document.body.appendChild(successMsg);
                setTimeout(() => successMsg.remove(), 3000);
              } else {
                throw new Error('Failed to send');
              }
            } catch (error) {
              submitBtn.innerHTML = originalText;
              submitBtn.disabled = false;
              alert('Failed to send message. Please try again or email us directly at info@acromatico.com');
            }
          });
        }
        
        function closeSupportModal() {
          const modal = document.getElementById('support-modal');
          if (modal) modal.remove();
        }
        
        async function downloadCredentials() {
          // Show loading message
          const loadingMsg = document.createElement('div');
          loadingMsg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.9);color:white;padding:30px 50px;border-radius:16px;z-index:99999;font-family:-apple-system,sans-serif;text-align:center;';
          loadingMsg.innerHTML = '<div style="font-size:24px;margin-bottom:10px;">⏳</div><div style="font-size:16px;font-weight:300;">Generating PDF...</div><div style="font-size:12px;color:#ccc;margin-top:8px;font-weight:300;">Including logo & photo • Luxury formatting</div>';
          document.body.appendChild(loadingMsg);
          
          try {
            // Load images as base64 first to ensure they show in PDF
            const loadImageAsBase64 = async (url) => {
              return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = function() {
                  const canvas = document.createElement('canvas');
                  canvas.width = img.width;
                  canvas.height = img.height;
                  const ctx = canvas.getContext('2d');
                  ctx.drawImage(img, 0, 0);
                  resolve(canvas.toDataURL('image/png'));
                };
                img.onerror = () => reject(new Error('Failed to load image: ' + url));
                img.src = url;
              });
            };
            
            loadingMsg.innerHTML = '<div style="font-size:24px;margin-bottom:10px;">⏳</div><div style="font-size:16px;font-weight:300;">Loading Acromatico logo...</div><div style="font-size:12px;color:#ccc;margin-top:8px;font-weight:300;">Step 1 of 3</div>';
            const logoBase64 = await loadImageAsBase64('/static/acromatico-logo-official.png');
            
            loadingMsg.innerHTML = '<div style="font-size:24px;margin-bottom:10px;">⏳</div><div style="font-size:16px;font-weight:300;">Loading your headshot...</div><div style="font-size:12px;color:#ccc;margin-top:8px;font-weight:300;">Step 2 of 3</div>';
            const photoBase64 = await loadImageAsBase64('/static/italo-headshot.jpg');
            
            loadingMsg.innerHTML = '<div style="font-size:24px;margin-bottom:10px;">⏳</div><div style="font-size:16px;font-weight:300;">Generating PDF...</div><div style="font-size:12px;color:#ccc;margin-top:8px;font-weight:300;">Step 3 of 3</div>';
            
            // Load html2pdf library
            await new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
              script.onload = resolve;
              script.onerror = reject;
              document.head.appendChild(script);
            });
            
            // Create beautiful HTML content for PDF with LUXURY THIN FONT
            const pdfContent = document.createElement('div');
            pdfContent.innerHTML = \`
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; width: 8.5in; min-height: 11in; padding: 0.65in 0.6in 1.3in 0.6in; background: white; color: #000; font-weight: 300; position: relative;">
                <!-- Header -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #4794A6; padding-bottom: 18px; margin-bottom: 26px;">
                  <div style="flex: 1;">
                    <img src="\${logoBase64}" style="width: 200px; height: auto; margin-bottom: 12px;" />
                    <h1 style="font-size: 28px; font-weight: 300; color: #000; margin: 0 0 8px 0; letter-spacing: -0.8px;">Acromatico Photography Academy</h1>
                    <h2 style="font-size: 14px; font-weight: 300; color: #4794A6; margin: 0 0 10px 0; letter-spacing: 0.3px;">Instructor Credentials • Step Up For Students PEP</h2>
                    <span style="display: inline-block; background: #4794A6; color: white; padding: 6px 16px; border-radius: 12px; font-size: 11px; font-weight: 400; letter-spacing: 0.5px;">ELECTIVES - Photography Enrichment</span>
                  </div>
                  <div style="text-align: center; margin-left: 30px;">
                    <img src="\${photoBase64}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 4px solid #4794A6; margin-bottom: 10px;" />
                    <div style="font-size: 16px; font-weight: 400; color: #000; letter-spacing: -0.3px;">Italo Campilii</div>
                    <div style="font-size: 12px; font-weight: 300; color: #666; letter-spacing: 0.2px;">Lead Instructor</div>
                  </div>
                </div>

                <!-- Two Column Layout -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-bottom: 26px;">
                  <!-- Left Column -->
                  <div>
                    <div style="background: #fafafa; padding: 18px; border-radius: 12px; border-left: 4px solid #4794A6; margin-bottom: 18px;">
                      <h3 style="font-size: 16px; font-weight: 400; color: #000; margin: 0 0 12px 0; letter-spacing: -0.3px;">📸 Photography Experience</h3>
                      <ul style="list-style: none; padding: 0; margin: 0; font-size: 12px; font-weight: 300; line-height: 1.7;">
                        <li style="margin-bottom: 9px; color: #333;">• <strong style="font-weight: 400;">20+ years</strong> professional experience (2004–present)</li>
                        <li style="margin-bottom: 9px; color: #333;">• <strong style="font-weight: 400;">1,000+ photography projects</strong> completed</li>
                        <li style="margin-bottom: 9px; color: #333;">• Co-Founder & CMO, <strong style="font-weight: 400;">Acromatico Photography</strong></li>
                        <li style="margin-bottom: 9px; color: #333;">• Award-winning wedding, portrait, commercial photographer</li>
                        <li style="margin-bottom: 0; color: #333;">• Portfolio: <strong style="font-weight: 400;">www.acromatico.com</strong></li>
                      </ul>
                    </div>

                    <div style="background: #fafafa; padding: 18px; border-radius: 12px; border-left: 4px solid #4794A6;">
                      <h3 style="font-size: 16px; font-weight: 400; color: #000; margin: 0 0 12px 0; letter-spacing: -0.3px;">🏆 Professional Certifications</h3>
                      <ul style="list-style: none; padding: 0; margin: 0; font-size: 12px; font-weight: 300; line-height: 1.7;">
                        <li style="margin-bottom: 11px; color: #333;">• <strong style="font-weight: 400;">John Maxwell Certified</strong><br><span style="font-size: 10px; color: #666; font-weight: 300;">Leadership Coach, Team & Speaker</span></li>
                        <li style="margin-bottom: 11px; color: #333;">• <strong style="font-weight: 400;">EXMA Certified Speaker</strong><br><span style="font-size: 10px; color: #666; font-weight: 300;">Experiential Marketing</span></li>
                        <li style="margin-bottom: 0; color: #333;">• <strong style="font-weight: 400;">Apple Sales Specialist (ASTO)</strong><br><span style="font-size: 10px; color: #666; font-weight: 300;">Apple Training & Certification</span></li>
                      </ul>
                    </div>
                  </div>

                  <!-- Right Column -->
                  <div>
                    <div style="background: #fafafa; padding: 18px; border-radius: 12px; border-left: 4px solid #4794A6; margin-bottom: 18px;">
                      <h3 style="font-size: 16px; font-weight: 400; color: #000; margin: 0 0 12px 0; letter-spacing: -0.3px;">🎓 Education & Training</h3>
                      <ul style="list-style: none; padding: 0; margin: 0; font-size: 12px; font-weight: 300; line-height: 1.7;">
                        <li style="margin-bottom: 11px; color: #333;">• <strong style="font-weight: 400;">FIAF Certified Photographer</strong><br><span style="font-size: 10px; color: #666; font-weight: 300;">Federazione Italiana Associazioni Fotografiche (Italy)</span></li>
                        <li style="margin-bottom: 0; color: #333;">• <strong style="font-weight: 400;">BS Business Administration</strong><br><span style="font-size: 10px; color: #666; font-weight: 300;">Business Information Systems</span></li>
                      </ul>
                    </div>

                    <div style="background: #fafafa; padding: 18px; border-radius: 12px; border-left: 4px solid #4794A6;">
                      <h3 style="font-size: 16px; font-weight: 400; color: #000; margin: 0 0 12px 0; letter-spacing: -0.3px;">🌟 Additional Credentials</h3>
                      <ul style="list-style: none; padding: 0; margin: 0; font-size: 12px; font-weight: 300; line-height: 1.7;">
                        <li style="margin-bottom: 11px; color: #333;">• <strong style="font-weight: 400;">Google AdWords Certified</strong><br><span style="font-size: 10px; color: #666; font-weight: 300;">Credential ID: 11533071</span></li>
                        <li style="margin-bottom: 11px; color: #333;">• <strong style="font-weight: 400;">Guinness World Record Holder</strong><br><span style="font-size: 10px; color: #666; font-weight: 300;">Professional Achievement</span></li>
                        <li style="margin-bottom: 0; color: #333;">• <strong style="font-weight: 400;">LinkedIn Profile</strong><br><span style="font-size: 10px; color: #666; font-weight: 300;">linkedin.com/in/italocampilii</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Compliance Box -->
                <div style="background: #f0f8fa; border: 2px solid #4794A6; padding: 18px; border-radius: 12px; margin-bottom: 0;">
                  <div style="font-size: 14px; font-weight: 400; color: #000; margin-bottom: 10px; letter-spacing: -0.3px;">✅ Step Up PEP Compliance Statement</div>
                  <p style="font-size: 11px; color: #333; line-height: 1.6; margin: 0 0 9px 0; font-weight: 300;">
                    Acromatico Photography Academy programs qualify under the <strong style="color: #4794A6; font-weight: 400;">Electives</strong> category of Step Up For Students PEP scholarship. Per PEP Purchasing Guide (Page 7, Electives Section), eligible providers must have <strong style="font-weight: 400;">"minimum of three years of experience in the relevant subject area as demonstrated by employment records."</strong>
                  </p>
                  <p style="font-size: 11px; color: #333; line-height: 1.6; margin: 0 0 9px 0; font-weight: 300;">
                    <strong style="font-weight: 400;">Our instructors exceed this requirement with 20+ years of professional photography experience and 1,000+ completed projects, documented at www.acromatico.com and LinkedIn.</strong>
                  </p>
                  <p style="font-size: 10px; color: #666; margin: 0; font-weight: 300;"><strong style="font-weight: 400;">Reference:</strong> Step Up PEP Purchasing Guide 2024-25, Page 7, Electives Section</p>
                </div>

                <!-- Footer positioned at bottom -->
                <div style="position: absolute; bottom: 0.5in; left: 0.6in; right: 0.6in; border-top: 1px solid #ddd; padding-top: 12px; text-align: center;">
                  <p style="font-size: 11px; color: #000; margin: 0 0 6px 0; font-weight: 300;"><strong style="font-weight: 400;">Acromatico Inc</strong> • 2300 W 84th ST. Suite 213, Miami, FL 33016</p>
                  <p style="font-size: 10px; color: #666; margin: 0 0 4px 0; font-weight: 300;">Phone: 954.779.0921 | Email: info@acromatico.com | Website: www.acromatico.com</p>
                  <p style="font-size: 9px; color: #999; margin: 0; font-weight: 300;">Document generated: \${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} • For Step Up verification purposes</p>
                </div>
              </div>
            \`;

            // Configure html2pdf options with better settings
            const opt = {
              margin: 0,
              filename: 'Acromatico_Instructor_Credentials_StepUp_PEP.pdf',
              image: { type: 'jpeg', quality: 1.0 },
              html2canvas: { 
                scale: 3,
                useCORS: false,
                allowTaint: false,
                logging: false,
                backgroundColor: '#ffffff'
              },
              jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            // Generate PDF
            await html2pdf().set(opt).from(pdfContent).save();
            
            document.body.removeChild(loadingMsg);
            alert('✅ Credentials Downloaded Successfully!\\n\\nYour instructor credentials PDF is ready to submit to Step Up For Students.\\n\\nFile saved: Acromatico_Instructor_Credentials_StepUp_PEP.pdf');
            
          } catch(error) {
            if (document.body.contains(loadingMsg)) {
              document.body.removeChild(loadingMsg);
            }
            alert('❌ PDF generation failed: ' + error.message + '\\n\\nPlease try again or contact support.');
            console.error('PDF Error:', error);
          }
        }
      `}})]}),{title:"For Step Up Students - Invoice Generator - Acromatico"}));w.get("/success",t=>(t.req.query("session_id"),t.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmed - Acromatico</title>
      <script src="https://cdn.tailwindcss.com"><\/script>
    </head>
    <body class="bg-white">
      <div class="min-h-screen flex items-center justify-center px-4">
        <div class="max-w-2xl w-full text-center">
          <div class="mb-8">
            <svg class="w-24 h-24 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          
          <h1 style="font-size: 48px; font-weight: 300; color: #3D3935; margin-bottom: 16px;">
            Order Confirmed
          </h1>
          
          <p style="font-size: 20px; color: #8B7E6A; margin-bottom: 32px; line-height: 1.6;">
            Thank you for your purchase! Your fine art print is being prepared by our artisan team.
          </p>
          
          <div style="background: #F5F3F0; border-radius: 12px; padding: 32px; margin-bottom: 32px; text-align: left;">
            <h3 style="font-size: 18px; font-weight: 500; color: #3D3935; margin-bottom: 16px;">What Happens Next?</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 12px 0; border-bottom: 1px solid #E8E5E0;">
                <strong style="color: #3D3935;">📧 Confirmation Email</strong>
                <p style="color: #8B7E6A; margin: 4px 0 0 0;">Check your inbox for order details and tracking</p>
              </li>
              <li style="padding: 12px 0; border-bottom: 1px solid #E8E5E0;">
                <strong style="color: #3D3935;">🎨 Artisan Production</strong>
                <p style="color: #8B7E6A; margin: 4px 0 0 0;">Your print is hand-crafted to order</p>
              </li>
              <li style="padding: 12px 0; border-bottom: 1px solid #E8E5E0;">
                <strong style="color: #3D3935;">📦 Shipping (4-6 Weeks)</strong>
                <p style="color: #8B7E6A; margin: 4px 0 0 0;">Free shipping within the United States</p>
              </li>
              <li style="padding: 12px 0;">
                <strong style="color: #3D3935;">✨ Edition 1/100</strong>
                <p style="color: #8B7E6A; margin: 4px 0 0 0;">Signed by artists Italo Campilii & John</p>
              </li>
            </ul>
          </div>
          
          <a href="#" onclick="event.preventDefault(); openComingSoonModal('Art Prints');" style="display: inline-block; background: #3D3935; color: white; padding: 16px 48px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: 500; margin-right: 12px; cursor: pointer;">
            Browse More Prints
          </a>
          
          <a href="/" style="display: inline-block; background: white; color: #3D3935; padding: 16px 48px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: 500; border: 2px solid #E8E5E0;">
            Back to Home
          </a>
          
          <p style="margin-top: 48px; font-size: 14px; color: #8B7E6A;">
            Questions? Email us at <a href="mailto:hello@acromatico.com" style="color: #3D3935; text-decoration: underline;">hello@acromatico.com</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `)));w.get("/cart",t=>t.render(e("div",{class:"min-h-screen bg-black text-white",children:[e(sr,{}),e("section",{class:"pt-32 pb-20 min-h-screen",children:e("div",{class:"max-w-6xl mx-auto px-6 lg:px-8",children:[e("h1",{class:"text-5xl font-black mb-12",children:"Shopping Cart"}),e("div",{class:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:[e("div",{class:"lg:col-span-2 space-y-4",id:"cart-items"}),e("div",{class:"lg:col-span-1",children:e("div",{class:"feature-card p-8 rounded-3xl sticky top-32",children:[e("h2",{class:"text-2xl font-bold mb-6",children:"Order Summary"}),e("div",{class:"space-y-4 mb-6",children:[e("div",{class:"flex justify-between text-gray-400",children:[e("span",{children:"Subtotal"}),e("span",{id:"subtotal",children:"$0.00"})]}),e("div",{class:"flex justify-between text-gray-400",children:[e("span",{children:"Annual Savings"}),e("span",{id:"savings",class:"text-teal-500",children:"-$0.00"})]}),e("div",{class:"pt-4 border-t border-white/10",children:[e("div",{class:"flex justify-between text-xl font-bold",children:[e("span",{children:"Total"}),e("span",{id:"total",children:"$0.00"})]}),e("div",{class:"text-sm text-gray-400 mt-2",id:"billing-cycle",children:"per month"})]})]}),e("a",{href:"/checkout",class:"btn-primary w-full px-6 py-4 rounded-full font-bold text-white text-center block",children:"Proceed to Checkout"}),e("p",{class:"text-xs text-gray-500 text-center mt-4",children:[e("i",{class:"fas fa-lock mr-1"}),"Secure checkout powered by Stripe"]})]})})]}),e("div",{id:"empty-cart",class:"text-center py-20 hidden",children:[e("i",{class:"fas fa-shopping-cart text-6xl text-gray-700 mb-6"}),e("h2",{class:"text-3xl font-bold mb-4",children:"Your cart is empty"}),e("p",{class:"text-gray-400 mb-8",children:"Add some students to get started!"}),e("a",{href:"/pricing",class:"btn-primary px-8 py-4 rounded-full font-bold text-white inline-block",children:"View Pricing"})]})]})}),e("script",{dangerouslySetInnerHTML:{__html:`
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        function updateCart() {
          localStorage.setItem('cart', JSON.stringify(cart));
          renderCart();
        }
        
        function removeItem(index) {
          cart.splice(index, 1);
          updateCart();
        }
        
        function updateQuantity(index, change) {
          cart[index].quantity += change;
          if (cart[index].quantity <= 0) {
            removeItem(index);
          } else {
            updateCart();
          }
        }
        
        function renderCart() {
          const container = document.getElementById('cart-items');
          const emptyState = document.getElementById('empty-cart');
          
          if (cart.length === 0) {
            container.parentElement.classList.add('hidden');
            emptyState.classList.remove('hidden');
            return;
          }
          
          container.parentElement.classList.remove('hidden');
          emptyState.classList.add('hidden');
          
          let subtotal = 0;
          let totalSavings = 0;
          
          container.innerHTML = cart.map((item, index) => {
            // Calculate price per student per month
            const pricePerStudent = item.price;
            const totalStudents = item.students * item.quantity;
            
            // Monthly total = price per student × number of students
            const monthlyTotal = pricePerStudent * totalStudents;
            
            // Annual billing: 12 months prepaid (year-round)
            let itemTotal = monthlyTotal;
            let itemSavings = 0;
            
            if (item.billing === 'annual') {
              // Annual total = monthly × 12 months (already has 20% discount in price)
              itemTotal = monthlyTotal * 12;
              
              // Calculate what they WOULD pay without discount
              const monthlyPriceWithoutDiscount = pricePerStudent / 0.8; // Reverse 20% discount
              const annualWithoutDiscount = monthlyPriceWithoutDiscount * totalStudents * 12;
              itemSavings = annualWithoutDiscount - itemTotal;
              totalSavings += itemSavings;
            }
            
            subtotal += itemTotal;
            
            return \`
              <div class="feature-card p-6 rounded-2xl">
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <h3 class="text-xl font-bold mb-2">
                      Acromatico Academy - \${item.students}\${item.students >= 4 ? '+' : ''} Student\${item.students > 1 ? 's' : ''}
                    </h3>
                    <p class="text-gray-400 text-sm mb-2">
                      $\${pricePerStudent}/month per student · \${item.billing === 'annual' ? 'Annual (12 months prepaid)' : 'Monthly'}
                    </p>
                    \${item.billing === 'annual' ? '<span class="text-teal-500 text-xs font-bold">💰 Save $' + itemSavings.toFixed(2) + ' with annual billing!</span>' : ''}
                  </div>
                  <div class="flex items-center gap-6">
                    <div class="flex items-center gap-3">
                      <button onclick="updateQuantity(\${index}, -1)" class="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center">
                        <i class="fas fa-minus text-sm"></i>
                      </button>
                      <span class="text-xl font-bold w-8 text-center">\${item.quantity}</span>
                      <button onclick="updateQuantity(\${index}, 1)" class="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center">
                        <i class="fas fa-plus text-sm"></i>
                      </button>
                    </div>
                    <div class="text-right min-w-[100px]">
                      <div class="text-xl font-bold">$\${itemTotal.toFixed(2)}</div>
                      <div class="text-xs text-gray-500">\${item.billing === 'annual' ? 'total (12 months)' : 'per month'}</div>
                    </div>
                    <button onclick="removeItem(\${index})" class="text-gray-400 hover:text-red-500 transition">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            \`;
          }).join('');
          
          // Update summary
          document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
          document.getElementById('savings').textContent = totalSavings > 0 ? '-$' + totalSavings.toFixed(2) : '$0.00';
          document.getElementById('total').textContent = '$' + subtotal.toFixed(2);
          
          const hasAnnual = cart.some(item => item.billing === 'annual');
          document.getElementById('billing-cycle').textContent = hasAnnual ? 'total for 12 months' : 'per month';
        }
        
        // Initial render
        renderCart();
      `}})]}),{title:"Shopping Cart - Acromatico"}));w.get("/checkout",t=>t.render(e("div",{class:"min-h-screen bg-black text-white",children:[e("nav",{class:"glass-nav fixed top-0 left-0 right-0 z-50",children:e("div",{class:"max-w-7xl mx-auto px-6 lg:px-8",children:e("div",{class:"flex justify-between h-20 items-center",children:[e("div",{class:"flex items-center space-x-4",children:e("a",{href:"/cart",class:"text-gray-300 hover:text-white transition",children:[e("i",{class:"fas fa-arrow-left mr-2"}),"Back to Cart"]})}),e("div",{class:"flex-1 flex justify-center",children:e("a",{href:"/",children:e("img",{src:"/static/acromatico-logo-white.png",alt:"Acromatico",class:"h-8 w-auto"})})}),e("div",{class:"flex items-center space-x-4 opacity-0",children:e("span",{children:"Spacer"})})]})})}),e("section",{class:"pt-32 pb-20",children:e("div",{class:"max-w-6xl mx-auto px-6 lg:px-8",children:[e("h1",{class:"text-5xl font-black mb-12",children:"Checkout"}),e("div",{class:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:[e("div",{class:"lg:col-span-2 space-y-8",children:[e("div",{class:"feature-card p-8 rounded-3xl",children:[e("h2",{class:"text-2xl font-bold mb-6 flex items-center gap-3",children:[e("span",{class:"w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-sm font-bold",children:"1"}),"Account Information"]}),e("div",{class:"space-y-4",children:[e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"First Name"}),e("input",{type:"text",id:"firstName",class:"w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none"})]}),e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"Last Name"}),e("input",{type:"text",id:"lastName",class:"w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none"})]})]}),e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"Email Address"}),e("input",{type:"email",id:"email",class:"w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none"})]}),e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"Password"}),e("input",{type:"password",id:"password",class:"w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none"})]})]})]}),e("div",{class:"feature-card p-8 rounded-3xl",children:[e("h2",{class:"text-2xl font-bold mb-6 flex items-center gap-3",children:[e("span",{class:"w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-sm font-bold",children:"2"}),"Student Information"]}),e("div",{id:"students-container",class:"space-y-6"})]}),e("div",{class:"feature-card p-8 rounded-3xl",children:[e("h2",{class:"text-2xl font-bold mb-6 flex items-center gap-3",children:[e("span",{class:"w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-sm font-bold",children:"3"}),"Payment Information"]}),e("div",{class:"space-y-4",children:[e("div",{id:"card-element",class:"w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700",children:e("div",{class:"text-gray-500 text-sm",children:"Stripe payment form will be integrated here"})}),e("p",{class:"text-xs text-gray-500",children:[e("i",{class:"fas fa-lock mr-1"}),"Your payment information is secure and encrypted"]})]})]}),e("button",{id:"submit-btn",class:"btn-primary w-full px-8 py-5 rounded-full text-xl font-bold text-white",children:"Complete Enrollment"})]}),e("div",{class:"lg:col-span-1",children:e("div",{class:"feature-card p-8 rounded-3xl sticky top-32",children:[e("h2",{class:"text-2xl font-bold mb-6",children:"Order Summary"}),e("div",{id:"order-items",class:"space-y-4 mb-6"}),e("div",{class:"space-y-3 mb-6",children:[e("div",{class:"flex justify-between text-gray-400",children:[e("span",{children:"Subtotal"}),e("span",{id:"checkout-subtotal",children:"$0.00"})]}),e("div",{class:"flex justify-between text-gray-400",children:[e("span",{children:"Annual Savings"}),e("span",{id:"checkout-savings",class:"text-teal-500",children:"-$0.00"})]}),e("div",{class:"pt-3 border-t border-white/10",children:[e("div",{class:"flex justify-between text-xl font-bold",children:[e("span",{children:"Total Today"}),e("span",{id:"checkout-total",children:"$0.00"})]}),e("div",{class:"text-sm text-gray-400 mt-2",children:"Recurring monthly on enrollment date"})]})]}),e("div",{class:"pt-6 border-t border-white/10 space-y-3 text-xs text-gray-500",children:[e("div",{class:"flex items-start gap-2",children:[e("i",{class:"fas fa-check text-teal-500 mt-0.5"}),e("span",{children:"Cancel anytime, no questions asked"})]}),e("div",{class:"flex items-start gap-2",children:[e("i",{class:"fas fa-check text-teal-500 mt-0.5"}),e("span",{children:"Recurring billing - same date each month"})]}),e("div",{class:"flex items-start gap-2",children:[e("i",{class:"fas fa-check text-teal-500 mt-0.5"}),e("span",{children:"Instant access to all class recordings"})]})]})]})})]})]})}),e("script",{dangerouslySetInnerHTML:{__html:`
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        function renderStudentForms() {
          const container = document.getElementById('students-container');
          const totalStudents = cart.reduce((sum, item) => sum + (item.students * item.quantity), 0);
          
          container.innerHTML = Array.from({ length: totalStudents }, (_, i) => \`
            <div class="p-6 bg-gray-900 rounded-xl">
              <h3 class="font-bold mb-4">Student \${i + 1}</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-2">First Name</label>
                  <input type="text" class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Last Name</label>
                  <input type="text" class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Age</label>
                  <input type="number" min="7" max="14" class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Grade</label>
                  <input type="text" class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none" />
                </div>
              </div>
            </div>
          \`).join('');
        }
        
        function renderOrderSummary() {
          const container = document.getElementById('order-items');
          let monthlySubtotal = 0;
          let totalSavings = 0;
          
          container.innerHTML = cart.map(item => {
            // Calculate price per student per month
            const pricePerStudent = item.price;
            const totalStudents = item.students * item.quantity;
            
            // Monthly total = price per student × number of students
            const monthlyTotal = pricePerStudent * totalStudents;
            
            let displayTotal = monthlyTotal;
            let itemSavings = 0;
            
            if (item.billing === 'annual') {
              // Annual: already has 20% discount in price, so total is monthly × 10
              displayTotal = monthlyTotal * 10;
              
              // Calculate savings: what they would pay without discount
              const monthlyPriceWithoutDiscount = pricePerStudent / 0.8;
              const annualWithoutDiscount = monthlyPriceWithoutDiscount * totalStudents * 10;
              itemSavings = annualWithoutDiscount - displayTotal;
              totalSavings += itemSavings;
            }
            
            monthlySubtotal += monthlyTotal;
            
            return \`
              <div class="pb-4 border-b border-white/10">
                <div class="font-bold mb-1">\${item.students}\${item.students >= 4 ? '+' : ''} Student\${item.students > 1 ? 's' : ''}\${item.quantity > 1 ? ' (×' + item.quantity + ' packages)' : ''}</div>
                <div class="text-sm text-gray-400">\${item.billing === 'annual' ? 'Annual (12 months)' : 'Monthly'} · $\${monthlyTotal.toFixed(2)}/mo</div>
                \${item.billing === 'annual' ? '<div class="text-teal-500 text-xs mt-1">Save $' + itemSavings.toFixed(2) + '</div>' : ''}
              </div>
            \`;
          }).join('');
          
          // No proration - full monthly amount charged on enrollment date
          // Recurring billing will happen on the same date each month
          const finalTotal = subtotal; // Full amount for annual or monthly
          
          document.getElementById('checkout-subtotal').textContent = '$' + monthlySubtotal.toFixed(2);
          document.getElementById('checkout-savings').textContent = totalSavings > 0 ? '-$' + totalSavings.toFixed(2) : '$0.00';
          document.getElementById('checkout-total').textContent = '$' + finalTotal.toFixed(2);
        }
        
        // Handle form submission
        document.getElementById('submit-btn').addEventListener('click', () => {
          alert('Payment integration coming soon! This will connect to Stripe for secure payment processing.');
        });
        
        // Initial render
        if (cart.length === 0) {
          window.location.href = '/pricing';
        } else {
          renderStudentForms();
          renderOrderSummary();
        }
      `}})]}),{title:"Checkout - Acromatico Academy"}));w.get("/login",t=>t.redirect("/education/login"));w.get("/education/login",t=>t.html(cf));w.get("/education/signup",t=>t.redirect("/static/education-signup"));w.get("/education/reset-password",t=>t.redirect("/education-reset-password.html"));w.get("/pricing",t=>t.redirect("/static/pricing"));w.get("/enroll",t=>t.redirect("/static/pricing"));w.get("/student/dashboard",t=>t.redirect("/static/student-dashboard.html"));w.get("/student/projects",t=>t.redirect("/static/student-projects.html"));w.get("/parent/dashboard",t=>t.redirect("/static/parent-dashboard.html"));w.get("/admin/dashboard",t=>t.redirect("/static/admin-dashboard.html"));w.get("/admin/curriculum",t=>t.redirect("/static/admin-curriculum-v2.html"));w.get("/admin/curriculum/old",t=>t.redirect("/static/admin-curriculum.html"));w.get("/debug/auth",t=>t.redirect("/static/debug-auth.html"));w.get("/admin/crm",t=>t.redirect("/static/admin-crm.html"));w.get("/assessment",t=>t.redirect("/static/assessment.html"));w.get("/contact",t=>t.render(e("div",{class:"p-8",children:e("h1",{class:"text-3xl font-bold",children:"Contact - Coming Soon"})})));w.get("/our-story",t=>t.render(e("div",{class:"min-h-screen bg-black text-white",children:[e("nav",{class:"glass-nav fixed top-0 left-0 right-0 z-50",children:e("div",{class:"max-w-7xl mx-auto px-6 lg:px-8",children:e("div",{class:"flex justify-between h-20 items-center",children:[e("div",{class:"flex items-center space-x-4 opacity-0",children:e("span",{children:"Spacer"})}),e("div",{class:"flex-1 flex justify-center",children:e("a",{href:"/",children:e("img",{src:"/static/acromatico-logo-white.png",alt:"Acromatico",class:"h-8 w-auto"})})}),e("div",{class:"flex items-center space-x-4",children:e("a",{href:"/login",class:"text-gray-300 hover:text-white transition",children:"Sign In"})})]})})}),e("section",{class:"pt-32 pb-20",children:e("div",{class:"max-w-4xl mx-auto px-6 lg:px-8",children:[e("h1",{class:"text-6xl font-black mb-8",children:"Our Story"}),e("div",{class:"space-y-8 text-xl text-gray-300 leading-relaxed",children:[e("p",{children:"Acromatico was born from a simple belief: every child has a unique way of seeing the world, and photography is one of the most powerful tools to help them discover and express that vision."}),e("p",{children:"Founded by award-winning photographers Italo Campilii and Ale, with over 20 years of combined experience in visual storytelling, documentary filmmaking, and portrait photography, Acromatico exists to empower young creators ages 7-14 with real-world skills."}),e("p",{children:"We're not just teaching kids how to use a camera. We're teaching them how to see, how to tell stories, and how to capture moments that matter. Our live, interactive classes combine technical expertise with creative freedom, giving students the confidence to create work they're proud of."}),e("p",{children:[e("strong",{class:"text-teal-500",children:"Our mission is simple:"})," Help 1,000 young creators discover their visual voice and build skills that last a lifetime."]})]})]})})]}),{title:"Our Story - Acromatico"}));w.get("/faq",t=>t.render(e("div",{class:"min-h-screen bg-black text-white",children:[e("nav",{class:"glass-nav fixed top-0 left-0 right-0 z-50",children:e("div",{class:"max-w-7xl mx-auto px-6 lg:px-8",children:e("div",{class:"flex justify-between h-20 items-center",children:[e("a",{href:"/",children:e("img",{src:"/static/acromatico-logo-white.png",alt:"Acromatico",class:"h-8"})}),e("div",{class:"flex items-center gap-6",children:e("a",{href:"/pricing",class:"btn-primary px-6 py-3 rounded-full text-sm font-bold inline-block",style:"background: #4794A6;",children:"Enroll Now"})})]})})}),e("section",{class:"pt-32 pb-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden",children:[e("div",{class:"absolute inset-0 opacity-20",children:[e("div",{class:"stars-small"}),e("div",{class:"stars-medium"}),e("div",{class:"stars-large"})]}),e("div",{class:"relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center",children:[e("h1",{class:"text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent",children:"Everything You Need to Know"}),e("p",{class:"text-2xl text-gray-300 mb-12 max-w-3xl mx-auto",children:"From enrollment to gear recommendations — your complete resource guide."})]})]}),e("section",{class:"py-20 bg-black",children:e("div",{class:"max-w-4xl mx-auto px-6 lg:px-8",children:[e("div",{class:"mb-16",children:[e("h2",{class:"text-4xl font-black mb-8 text-teal-500",children:"General Questions"}),e("div",{class:"space-y-6",children:[e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"What age is this program for?"}),e("p",{class:"text-gray-300 leading-relaxed",children:["Acromatico Academy is designed for young creators ",e("strong",{class:"text-white",children:"ages 7-14"}),". Our 30-minute micro-learning format is perfect for this age range — long enough to teach real skills, short enough to keep them engaged."]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"Do they need prior experience?"}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-white",children:"Absolutely not!"})," We start from the very beginning. Whether your child has never touched a camera or has been snapping photos on their phone, we'll meet them where they are and take them further."]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"What if they can't attend a live class?"}),e("p",{class:"text-gray-300 leading-relaxed",children:["No problem! Every class is recorded and available in our ",e("strong",{class:"text-teal-400",children:"Lifetime Instruction Library"}),". Your child can catch up on expert-led teachings anytime, rewatch lessons as many times as they need, and never fall behind."]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"How many classes per month?"}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-white",children:"8 live classes per month"})," — every Monday and Thursday at 11:30 AM ET. Plus, in December, we add ",e("strong",{class:"text-teal-400",children:"2 special 1-hour fun workshops"})," during the first 2 weeks to celebrate the year."]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"Can I cancel anytime?"}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-white",children:"Yes!"})," Monthly plans can be canceled anytime with no penalties. Cancellation takes effect at the end of your current billing cycle. Annual plans are prepaid for 12 months (year-round classes including summer & winter) and save you 20%."]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"What if we join mid-year?"}),e("p",{class:"text-gray-300 leading-relaxed mb-3",children:[e("strong",{class:"text-white",children:"No problem!"})," You can join anytime during the school year."]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-400",children:"For Monthly Plans:"})," You'll start with the current month's curriculum and continue through June. Any months you missed will roll over to the next school year, so your child completes the full 10-month journey."]}),e("p",{class:"text-gray-300 leading-relaxed mt-3",children:[e("strong",{class:"text-teal-400",children:"For Annual Plans:"})," If you join mid-year (e.g., January), your 10-month annual plan covers January-June this year, then September-December the following year. You get the full curriculum and 20% savings, just spread across two school years."]})]})]})]}),e("div",{class:"mb-16",children:[e("h2",{class:"text-4xl font-black mb-8 text-blue-500",children:"Gear Recommendations"}),e("div",{class:"bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-2xl border border-blue-800/30 mb-8",children:[e("h3",{class:"text-3xl font-bold mb-4 text-white",children:"Do they need a professional camera?"}),e("p",{class:"text-xl text-gray-300 leading-relaxed mb-4",children:e("strong",{class:"text-white",children:"Short answer: Not required, but highly recommended for serious growth."})}),e("p",{class:"text-gray-300 leading-relaxed",children:"Your child can start with a smartphone — many incredible photographers do. But if you want to invest in their creative future and give them full manual control, here's what we recommend:"})]}),e("div",{class:"space-y-8",children:[e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-4 text-teal-500",children:"Ages 7-10: Light & Fun"}),e("p",{class:"text-gray-300 mb-4",children:["At this age, ",e("strong",{class:"text-white",children:"lightweight and compact"})," is key. They need something they can carry, love using, and won't be intimidated by."]}),e("div",{class:"space-y-3",children:[e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"🎯 Best Option: Fujifilm Instax Mini Evo"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"Instant printing + digital saving. Kids LOVE seeing their photos instantly. Budget: $200-250"})]}),e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"📸 Step-Up Option: Sony ZV-1"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"Compact, point-and-shoot style, great for both photo and video. Perfect for learning. Budget: ~$899 (available on StepUp)"})]})]}),e("p",{class:"text-gray-400 text-sm mt-4",children:["💡 ",e("strong",{class:"text-white",children:"Pro Tip:"})," Check ",e("strong",{class:"text-teal-400",children:"StepUp"})," for budget-friendly options on used Sony, Canon, and Fujifilm cameras. Great way to get professional gear at student-friendly prices."]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-4 text-blue-500",children:"Ages 11-14: Serious Growth"}),e("p",{class:"text-gray-300 mb-4",children:["This is the sweet spot for ",e("strong",{class:"text-white",children:"mirrorless cameras"})," — professional quality, lightweight bodies, and room to grow into advanced techniques."]}),e("div",{class:"space-y-3",children:[e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"🏆 Best Option: Sony A6400 + 16-50mm Kit Lens"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"Lightweight, fast autofocus, excellent image quality. Perfect starter pro camera. Budget: $900-1,100 (check StepUp for savings)"})]}),e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"🎬 Budget Option: Fujifilm X-T30 II"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"Compact, retro design kids love, excellent colors straight out of camera. Budget: $800-900 (check StepUp for used)"})]})]}),e("div",{class:"mt-6 mb-4",children:[e("h4",{class:"text-xl font-bold text-white mb-3",children:"Pro Options (For Serious Growth)"}),e("p",{class:"text-gray-300 text-sm mb-4",children:"If your child is ready for professional-level gear, these are the systems we've used and recommend:"})]}),e("div",{class:"space-y-3",children:[e("div",{class:"bg-black/30 p-4 rounded-lg border border-teal-500/30",children:[e("strong",{class:"text-white",children:"💎 Sony A7 IV + 28-70mm Kit Lens (Pro Mirrorless)"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"Full-frame powerhouse. 33MP, incredible autofocus, 10fps burst, 4K 60p video. Perfect balance of photo/video. Lighter than Canon, longer battery life. Budget: $2,500-2,800"})]}),e("div",{class:"bg-black/30 p-4 rounded-lg border border-teal-500/30",children:[e("strong",{class:"text-white",children:"⭐ Sony A7R V + 20mm f/1.8 lens (What We Use!)"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"61MP resolution monster. Incredible sharpness, natural color science, simplified system. Best for portraits, landscapes, studio work. Lightweight mirrorless design. Budget: $3,500-4,000"})]}),e("div",{class:"bg-black/30 p-4 rounded-lg border border-blue-500/30",children:[e("strong",{class:"text-white",children:"📸 Canon EOS R6 Mark II + 24-105mm f/4-7.1 Kit Lens (Pro Canon)"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"24MP full-frame. Canon's flagship mirrorless. Incredible color science, reliable autofocus, works with Canon RF and EF lenses (with adapter). 2 decades of Canon fans love this. Budget: $2,500-2,800"})]}),e("div",{class:"bg-black/30 p-4 rounded-lg border border-blue-500/30",children:[e("strong",{class:"text-white",children:"🔥 Canon 5D Mark IV + 24-105mm f/4L II Kit Lens (Pro DSLR Classic)"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"30MP full-frame DSLR. The workhorse we used for almost a decade. Rugged, reliable, massive lens ecosystem. Heavier than mirrorless but built like a tank. Perfect for learning pro fundamentals. Budget: $2,000-2,500 (check StepUp for savings)"})]})]}),e("p",{class:"text-gray-400 text-sm mt-4",children:["💡 ",e("strong",{class:"text-white",children:"Pro Tip:"})," ",e("strong",{class:"text-teal-400",children:"StepUp"})," is a marketplace for high-quality used camera gear. You can save 20-40% on Sony, Canon, and Fujifilm bodies and lenses. All gear is inspected and rated by condition."]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-4 text-purple-500",children:"Lens Recommendations (For Serious Students)"}),e("p",{class:"text-gray-300 mb-4",children:"If your child is ready to invest in glass, here's what we recommend based on 2 decades of professional experience:"}),e("div",{class:"mb-6",children:[e("h4",{class:"text-lg font-bold text-white mb-3",children:"Sony E-Mount (Our Current System):"}),e("div",{class:"space-y-2",children:[e("div",{class:"bg-black/30 p-3 rounded-lg",children:[e("strong",{class:"text-white",children:"20mm f/1.8 G"}),e("p",{class:"text-gray-400 text-sm",children:"Wide angle for landscapes, architecture, environmental portraits, street photography. Budget: $900"})]}),e("div",{class:"bg-black/30 p-3 rounded-lg",children:[e("strong",{class:"text-white",children:"50mm f/1.8"}),e("p",{class:"text-gray-400 text-sm",children:"The classic everyday lens. Perfect for portraits, street photography, storytelling, and learning fundamentals. Budget: $250"})]}),e("div",{class:"bg-black/30 p-3 rounded-lg",children:[e("strong",{class:"text-white",children:"85mm f/1.8"}),e("p",{class:"text-gray-400 text-sm",children:"Portrait perfection. Beautiful bokeh, flattering compression, isolates subjects beautifully. Budget: $600"})]}),e("div",{class:"bg-black/30 p-3 rounded-lg",children:[e("strong",{class:"text-white",children:"70-200mm f/2.8 GM II"}),e("p",{class:"text-gray-400 text-sm",children:"Versatile telephoto zoom for portraits, sports, wildlife, events, and distant subjects. Budget: $2,600"})]})]})]}),e("div",{children:[e("h4",{class:"text-lg font-bold text-white mb-3",children:"Canon EF Mount (What We Used for a Decade):"}),e("div",{class:"space-y-2",children:[e("div",{class:"bg-black/30 p-3 rounded-lg",children:[e("strong",{class:"text-white",children:"24mm f/1.4L II"}),e("p",{class:"text-gray-400 text-sm",children:"Wide, sharp, perfect for storytelling, landscapes, architecture, and environmental portraits. Budget: $1,500"})]}),e("div",{class:"bg-black/30 p-3 rounded-lg",children:[e("strong",{class:"text-white",children:"50mm f/1.2L"}),e("p",{class:"text-gray-400 text-sm",children:"Dreamy bokeh, low-light champion. Creates beautiful subject separation and artistic portraits. Budget: $1,400"})]}),e("div",{class:"bg-black/30 p-3 rounded-lg",children:[e("strong",{class:"text-white",children:"85mm f/1.2L II (Our Favorite!)"}),e("p",{class:"text-gray-400 text-sm",children:"Magazine-quality portraits. Incredible bokeh, makes people look stunning, perfect for headshots and creative portraits. Budget: $2,000"})]}),e("div",{class:"bg-black/30 p-3 rounded-lg",children:[e("strong",{class:"text-white",children:"100mm f/2.8L IS Macro"}),e("p",{class:"text-gray-400 text-sm",children:"Dual-purpose: stunning portraits and extreme close-up macro photography. Incredible detail and sharpness. Budget: $900"})]}),e("div",{class:"bg-black/30 p-3 rounded-lg",children:[e("strong",{class:"text-white",children:"70-200mm f/2.8L IS II"}),e("p",{class:"text-gray-400 text-sm",children:"Workhorse telephoto zoom. Perfect for portraits, sports, wildlife, events, and any distant subjects. Budget: $2,000"})]})]})]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-4 text-teal-500",children:"Essential Accessories"}),e("div",{class:"space-y-3",children:[e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"🎒 Camera Bag & Lens Protection"}),e("p",{class:"text-gray-400 text-sm mt-1",children:[e("strong",{class:"text-white",children:"Think Tank Photo"})," — Industry standard. TSA-approved, travel-tested for nearly 20 years. Nearly indestructible. ",e("a",{href:"https://prz.io/paQKyvEIO",target:"_blank",class:"text-teal-400 underline",children:"Use our referral link"})," for $15 off. Budget: $100-300"]})]}),e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"💾 SD Cards (Sony Cameras)"}),e("p",{class:"text-gray-400 text-sm mt-1",children:[e("strong",{class:"text-white",children:"Sony SF-G UHS-II V90"})," or ",e("strong",{class:"text-white",children:"SanDisk Extreme Pro UHS-II V90"})," — 128GB or 256GB. Fast read/write speeds for burst shooting and 4K video. Budget: $60-120 each. Always carry at least 2."]})]}),e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"📥 SD Card Reader (For Sony Cameras)"}),e("p",{class:"text-gray-400 text-sm mt-1",children:[e("strong",{class:"text-white",children:"USB-C UHS-II Card Reader"})," — Fast ingesting for editing workflow. ProGrade Digital or SanDisk readers work great. Budget: $30-50"]})]}),e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"🔋 Extra Batteries"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"Always carry at least 2 batteries. Nothing worse than a dead battery mid-shoot. Sony NP-FZ100 for A7 series. Budget: $50-80 each"})]}),e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"🧼 Cleaning Kit"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"Microfiber cloths, lens pen, air blower. Keep gear pristine. Budget: $20-40"})]})]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-4 text-blue-500",children:"Bonus: Drones (For Advanced Students)"}),e("p",{class:"text-gray-300 mb-4",children:["Once your child masters ground-level photography, ",e("strong",{class:"text-white",children:"aerial perspective"})," opens up a whole new world."]}),e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"🚁 DJI Mini 4 Pro"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"Lightweight, under 249g (no FAA registration needed), 4K video, incredible stabilization. Budget: $750-900"})]})]})]})]}),e("div",{class:"mb-16",children:[e("h2",{class:"text-4xl font-black mb-8 text-purple-500",children:"Manual Mode Mastery"}),e("div",{class:"bg-gradient-to-br from-purple-900/20 to-teal-900/20 p-8 rounded-2xl border border-purple-800/30 mb-6",children:[e("h3",{class:"text-2xl font-bold mb-4 text-white",children:"Why Manual Mode Matters"}),e("p",{class:"text-gray-300 leading-relaxed mb-4",children:[e("strong",{class:"text-white",children:"Manual mode gives your child complete creative control."})," Instead of the camera guessing, they decide how the photo looks — the depth of field, the motion blur, the brightness, the mood."]}),e("p",{class:"text-gray-300 leading-relaxed",children:["We teach them to master the ",e("strong",{class:"text-teal-400",children:"Exposure Triangle"}),": Aperture (controls depth), Shutter Speed (controls motion), and ISO (controls light sensitivity). Once they understand how these three work together, they can shoot anything, anywhere, in any light."]})]}),e("div",{class:"grid md:grid-cols-3 gap-6",children:[e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h4",{class:"text-xl font-bold mb-3 text-teal-500",children:"Aperture (f-stop)"}),e("p",{class:"text-gray-400 text-sm",children:["Controls ",e("strong",{class:"text-white",children:"depth of field"}),". Wide open (f/1.8) = blurry background (portraits). Closed down (f/16) = everything sharp (landscapes)."]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h4",{class:"text-xl font-bold mb-3 text-blue-500",children:"Shutter Speed"}),e("p",{class:"text-gray-400 text-sm",children:["Controls ",e("strong",{class:"text-white",children:"motion"}),". Fast (1/1000s) = freeze action. Slow (1/30s) = motion blur (waterfalls, light trails)."]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h4",{class:"text-xl font-bold mb-3 text-purple-500",children:"ISO"}),e("p",{class:"text-gray-400 text-sm",children:["Controls ",e("strong",{class:"text-white",children:"sensitivity to light"}),". Low (100-400) = clean, sharp. High (1600+) = grainy but bright in darkness."]})]})]})]}),e("div",{class:"mb-16",children:[e("h2",{class:"text-4xl font-black mb-8 text-teal-500",children:"Budget Guide"}),e("div",{class:"grid md:grid-cols-3 gap-6",children:[e("div",{class:"bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"Starter Budget"}),e("p",{class:"text-4xl font-black text-teal-500 mb-4",children:"$0-300"}),e("ul",{class:"space-y-2 text-gray-300 text-sm",children:[e("li",{children:"✅ Smartphone camera (free!)"}),e("li",{children:"✅ Fujifilm Instax Mini ($200)"}),e("li",{children:"✅ Basic accessories ($50-100)"})]})]}),e("div",{class:"bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-xl border border-blue-700",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"Growth Budget"}),e("p",{class:"text-4xl font-black text-blue-400 mb-4",children:"$800-1,500"}),e("ul",{class:"space-y-2 text-gray-300 text-sm",children:[e("li",{children:"✅ Sony A6400 or Fujifilm X-T30 ($900)"}),e("li",{children:"✅ Kit lens + 50mm f/1.8 ($400)"}),e("li",{children:"✅ Bag, cards, batteries ($200)"})]})]}),e("div",{class:"bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-xl border border-purple-700",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"Pro Budget"}),e("p",{class:"text-4xl font-black text-purple-400 mb-4",children:"$3,000+"}),e("ul",{class:"space-y-2 text-gray-300 text-sm",children:[e("li",{children:"✅ Sony A7R V or Canon R6 ($3,500)"}),e("li",{children:"✅ Prime lenses 20mm, 50mm, 85mm ($2,000)"}),e("li",{children:"✅ Drone, lighting, accessories ($1,500)"})]})]})]}),e("div",{class:"mt-8 bg-gradient-to-r from-teal-900/30 to-blue-900/30 p-6 rounded-xl border border-teal-800/30",children:e("p",{class:"text-lg text-gray-300 leading-relaxed",children:[e("strong",{class:"text-white",children:"Remember:"})," Gear doesn't make the photographer. ",e("strong",{class:"text-teal-400",children:"Vision, composition, and light"})," make the photographer. A $200 camera in skilled hands beats a $5,000 camera in unskilled hands every time. We'll teach them the skills — you choose the tool that fits your budget."]})})]}),e("div",{class:"mb-16",children:[e("h2",{class:"text-4xl font-black mb-8 text-blue-500",children:"Software & Editing Tools"}),e("div",{class:"space-y-6",children:[e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"Adobe Student Photography Bundle (Required)"}),e("p",{class:"text-gray-300 leading-relaxed mb-3",children:[e("strong",{class:"text-white",children:"The industry standard for photo editing."})," We teach Lightroom basics in ",e("strong",{class:"text-teal-400",children:"October: Photo Editing Mastery"}),". It's how we bring colors to life, enhance natural beauty, and create that magazine-ready look."]}),e("p",{class:"text-gray-300 mb-3",children:["Includes ",e("strong",{class:"text-white",children:"Lightroom"})," + ",e("strong",{class:"text-white",children:"Lightroom Classic"})," + ",e("strong",{class:"text-white",children:"Photoshop"})," + 20GB cloud storage."]}),e("p",{class:"text-gray-400 text-sm",children:["Budget: ",e("strong",{class:"text-white",children:"~$19.99/month"})," with student discount | Check Adobe's website for current student pricing"]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"Photoshop Bundle (Optional — For Curious Students)"}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-white",children:"Not required."})," Lightroom covers 95% of post-production needs. But if your child wants to explore advanced compositing, graphic design, or creative effects, Photoshop is included in the Photography Bundle."]}),e("p",{class:"text-gray-400 text-sm mt-2",children:"Most professional photographers edit 100% in Lightroom. Photoshop is for advanced creative exploration."})]})]})]}),e("div",{class:"mb-24",children:[e("h2",{class:"text-4xl font-black mb-8 text-purple-500",children:"Computer Requirements for Editing"}),e("div",{class:"space-y-6",children:[e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"Mac (Highly Recommended)"}),e("p",{class:"text-gray-300 leading-relaxed mb-4",children:[e("strong",{class:"text-white",children:"Best editing experience on a Mac."})," Ideally on the new ",e("strong",{class:"text-teal-400",children:"Apple M1-M5 chips"})," for blazing-fast performance and energy efficiency."]}),e("p",{class:"text-teal-400 text-sm mb-4",children:["💡 ",e("strong",{class:"text-white",children:"Pro Tip:"})," Use ",e("strong",{class:"text-teal-400",children:"Apple Education Store"})," to get education discounts on Macs. Significant savings for students and educators!"]}),e("div",{class:"bg-black/30 p-4 rounded-lg mb-4",children:[e("strong",{class:"text-white",children:"💻 Minimum Specs (Starting Students)"}),e("ul",{class:"text-gray-400 text-sm mt-2 space-y-1 ml-4 list-disc",children:[e("li",{children:[e("strong",{class:"text-white",children:"16GB RAM"})," — Minimum for smooth Lightroom performance"]}),e("li",{children:[e("strong",{class:"text-white",children:"256GB SSD"})," — Enough for OS + apps + moderate photo library"]}),e("li",{children:[e("strong",{class:"text-white",children:"M1 chip or newer"})," — Fast, efficient, future-proof"]})]}),e("p",{class:"text-gray-400 text-sm mt-3",children:["Options: ",e("strong",{class:"text-white",children:"MacBook Air M1/M2"})," (portable, lightweight) or ",e("strong",{class:"text-white",children:'iMac 24" M1/M3'})," (larger screen, perfect for home editing)"]}),e("p",{class:"text-gray-400 text-sm mt-2",children:["Budget: ",e("strong",{class:"text-white",children:"$800-1,200"})," (check Apple Education Store for discounts)"]})]}),e("div",{class:"bg-black/30 p-4 rounded-lg mb-4",children:[e("strong",{class:"text-white",children:"🚀 Ideal Specs (Growing Photographers) — THE POWERHOUSE"}),e("ul",{class:"text-gray-400 text-sm mt-2 space-y-1 ml-4 list-disc",children:[e("li",{children:[e("strong",{class:"text-white",children:"32GB RAM"})," — Ideal for multitasking, large photo libraries, and advanced editing"]}),e("li",{children:[e("strong",{class:"text-white",children:"512GB-1TB SSD"})," — Room for growing photo library + video projects"]}),e("li",{children:[e("strong",{class:"text-white",children:"M3/M4 chip"})," — Faster rendering, smoother multitasking"]})]}),e("p",{class:"text-gray-400 text-sm mt-3",children:[e("strong",{class:"text-white",children:'Best Option: MacBook Pro 14" M3/M4 with 32GB RAM'}),' — Less expensive than 16" model, incredibly powerful, perfect balance of portability and performance. This is a true powerhouse for serious photographers.']}),e("p",{class:"text-gray-400 text-sm mt-2",children:["Alternative: ",e("strong",{class:"text-white",children:'iMac 24" M3 with 32GB RAM'})," — Gorgeous 4.5K Retina display, all-in-one setup, perfect for dedicated editing station at home."]}),e("p",{class:"text-gray-400 text-sm mt-2",children:["Budget: ",e("strong",{class:"text-white",children:"$1,800-2,500"})," (check Apple Education Store for discounts)"]})]}),e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"⚡ Professional Setup (What Italo Uses)"}),e("ul",{class:"text-gray-400 text-sm mt-2 space-y-1 ml-4 list-disc",children:[e("li",{children:e("strong",{class:"text-white",children:'MacBook Pro 16" M1 Pro'})}),e("li",{children:[e("strong",{class:"text-white",children:"64GB RAM"})," — Runs multiple apps simultaneously with zero lag"]}),e("li",{children:[e("strong",{class:"text-white",children:"1TB SSD"})," — Fast storage for large photo/video libraries"]})]}),e("p",{class:"text-gray-400 text-sm mt-3",children:[e("em",{children:`"I edit with speed and have multiple applications open at once. This is professional-level, not required for starting students—but shows what's possible."`})," — Italo"]}),e("p",{class:"text-gray-400 text-sm mt-2",children:["Budget: ",e("strong",{class:"text-white",children:"$3,000-4,500"}),' (MacBook Pro 16" M1 Pro/Max/Ultra with 64GB RAM)']})]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"PC/Windows (Alternative)"}),e("p",{class:"text-gray-300 leading-relaxed mb-3",children:[e("strong",{class:"text-white",children:"PCs work fine for Lightroom,"})," but Macs offer better color accuracy, battery life, and creative workflow optimization."]}),e("p",{class:"text-gray-400 text-sm",children:["Minimum: ",e("strong",{class:"text-white",children:"16GB RAM, Intel i5/AMD Ryzen 5 or better, 256GB SSD"})," | Budget: $700-1,200"]})]})]})]})]})}),e("section",{class:"py-32 bg-gradient-to-b from-black via-gray-900 to-black text-center",children:e("div",{class:"max-w-4xl mx-auto px-6 lg:px-8",children:[e("h2",{class:"text-5xl md:text-6xl font-black mb-6",children:"Ready to Start Their Journey?"}),e("p",{class:"text-2xl text-gray-300 mb-12 max-w-2xl mx-auto",children:"Questions answered. Gear researched. Time to enroll."}),e("div",{class:"flex flex-col sm:flex-row gap-4 justify-center",children:[e("a",{href:"/pricing",class:"btn-primary px-10 py-5 rounded-full text-lg font-bold inline-block",style:"background: #4794A6;",children:"Enroll Now"}),e("a",{href:"/academy",class:"px-10 py-5 rounded-full text-lg font-bold border-2 border-white/20 hover:border-teal-500/50 transition inline-block",children:"View Curriculum"})]})]})}),e("div",{dangerouslySetInnerHTML:{__html:_t}}),e("div",{id:"enrollment-modal",class:"fixed inset-0 bg-black/95 z-[100] hidden flex items-center justify-center p-4",children:e("div",{class:"max-w-2xl w-full",children:[e("div",{class:"mb-8",children:[e("div",{class:"flex justify-between mb-2 text-sm text-gray-400",children:[e("span",{id:"step-label",children:"Step 1 of 3"}),e("span",{id:"step-percentage",children:"33%"})]}),e("div",{class:"h-2 bg-gray-800 rounded-full overflow-hidden",children:e("div",{id:"progress-bar",class:"h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-500",style:"width: 33%"})})]}),e("div",{id:"step-1",class:"step-content",children:[e("h2",{class:"text-5xl font-black mb-4",children:"Create Your Free Account"}),e("p",{class:"text-xl text-gray-400 mb-8",children:"Get started in seconds - no credit card required"}),e("div",{class:"space-y-6",children:[e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"Parent Email"}),e("input",{type:"email",id:"parent-email",placeholder:"your@email.com",class:"w-full px-6 py-4 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-teal-500 focus:outline-none text-lg"})]}),e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"Create Password"}),e("input",{type:"password",id:"parent-password",placeholder:"Min 8 characters",class:"w-full px-6 py-4 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-teal-500 focus:outline-none text-lg"}),e("p",{class:"text-xs text-gray-500 mt-2",children:"Minimum 8 characters (letters, numbers, or symbols)"})]}),e("button",{onclick:"goToStep(2)",class:"btn-primary w-full px-8 py-5 rounded-full text-xl font-bold",style:"background: #4794A6;",children:"Continue →"})]}),e("div",{class:"mt-8 pt-8 border-t border-white/10",children:[e("div",{class:"flex items-center justify-center gap-3 text-sm text-gray-400",children:[e("svg",{class:"w-5 h-5 text-green-500",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("span",{class:"font-medium",children:"256-bit SSL Encryption"}),e("span",{class:"text-gray-600",children:"•"}),e("span",{children:"Your data is secure"})]}),e("p",{class:"text-center text-xs text-gray-500 mt-2",children:"We use industry-standard encryption (AES-256) and secure password hashing (bcrypt) to protect your information."})]})]}),e("div",{id:"step-2",class:"step-content hidden",children:[e("button",{onclick:"goToStep(1)",class:"text-gray-400 hover:text-white mb-3 flex items-center gap-2 text-sm",children:"← Back"}),e("h2",{class:"text-3xl font-black mb-2 text-center",children:"How Many Students?"}),e("p",{class:"text-base text-gray-400 mb-8 text-center",children:"Slide to see your savings"}),e("div",{class:"text-center mb-8",children:[e("div",{class:"text-8xl font-black mb-2",id:"big-price-display",children:"$12.50"}),e("div",{class:"text-xl text-gray-400",children:"per class per student"}),e("div",{class:"text-sm text-gray-500 mt-2",id:"student-count-text",children:"1 student • 8 live classes"})]}),e("div",{class:"mb-8 px-4",children:[e("div",{class:"flex justify-between items-center mb-3",children:[e("span",{class:"text-sm text-gray-400",children:"Number of Students"}),e("span",{class:"text-2xl font-bold text-white",id:"slider-number",children:"1"})]}),e("style",{dangerouslySetInnerHTML:{__html:`
                #student-slider::-webkit-slider-thumb {
                  appearance: none;
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background: #4794A6;
                  cursor: pointer;
                  border: 4px solid white;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  transition: transform 0.2s;
                }
                #student-slider::-webkit-slider-thumb:hover {
                  transform: scale(1.1);
                }
                #student-slider::-moz-range-thumb {
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background: #4794A6;
                  cursor: pointer;
                  border: 4px solid white;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  transition: transform 0.2s;
                }
                #student-slider::-moz-range-thumb:hover {
                  transform: scale(1.1);
                }
              `}}),e("input",{type:"range",id:"student-slider",min:"1",max:"6",value:"1",oninput:"updateSlider(this.value)",class:"w-full h-3 bg-gray-800 rounded-full appearance-none cursor-pointer",style:"background: linear-gradient(to right, #4794A6 0%, #4794A6 0%, #1f2937 0%, #1f2937 100%);"}),e("div",{class:"flex justify-between text-xs text-gray-500 mt-2",children:[e("span",{children:"1"}),e("span",{children:"2"}),e("span",{children:"3"}),e("span",{children:"4"}),e("span",{children:"5"}),e("span",{children:"6+"})]})]}),e("div",{class:"flex flex-col gap-4 mb-6",children:[e("div",{class:"flex items-center justify-center gap-2 bg-gray-900 p-2 rounded-full mx-auto",children:[e("button",{id:"per-class-tab-btn",onclick:"switchPricingTab('per-class')",class:"px-4 py-2 rounded-full font-semibold transition text-gray-400 text-sm whitespace-nowrap",children:"Per Class"}),e("button",{id:"monthly-tab-btn",onclick:"switchPricingTab('monthly')",class:"px-4 py-2 rounded-full font-semibold transition bg-teal-500 text-white text-sm",children:"Monthly"}),e("button",{id:"annual-tab-btn",onclick:"switchPricingTab('annual')",class:"px-4 py-2 rounded-full font-semibold transition text-gray-400 text-sm",children:["Annual ",e("span",{class:"text-teal-500 text-xs ml-1",children:"Save 20%"})]})]}),e("div",{id:"per-class-info",class:"text-center hidden",children:[e("p",{class:"text-sm font-semibold text-gray-300 mb-2",children:"Pay as you go"}),e("p",{class:"text-xs text-gray-500 mb-3",children:"No commitment • Book classes individually"}),e("div",{class:"inline-block bg-gray-500/10 border border-gray-500/20 rounded-full px-4 py-2",children:e("span",{class:"text-lg font-bold text-gray-400",id:"per-class-summary",children:"Bulk discounts with monthly/annual"})})]}),e("div",{id:"monthly-info",class:"text-center bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-2xl p-4 border border-teal-500/20",children:[e("p",{class:"text-sm font-semibold text-gray-300 mb-2",children:"Billed monthly • Cancel anytime"}),e("div",{class:"flex items-center justify-center gap-3 mb-2",children:[e("span",{class:"text-2xl line-through text-gray-600",id:"monthly-original-total",children:"$240"}),e("svg",{class:"w-6 h-6 text-teal-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 7l5 5m0 0l-5 5m5-5H6"})}),e("span",{class:"text-4xl font-black text-teal-500",id:"monthly-new-total",children:"$100"}),e("span",{class:"text-base text-gray-400",children:"/month"})]}),e("div",{class:"inline-block bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2",children:e("span",{class:"text-lg font-bold text-green-400",id:"monthly-savings",children:"Save $140/month"})})]}),e("div",{id:"annual-info",class:"text-center bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-2xl p-4 border border-teal-500/20 hidden",children:[e("p",{class:"text-sm font-semibold text-gray-300 mb-2",children:"12 months prepaid • Year-round classes"}),e("div",{class:"flex items-center justify-center gap-3 mb-2",children:[e("span",{class:"text-2xl line-through text-gray-600",id:"annual-original-total",children:"$2,400"}),e("svg",{class:"w-6 h-6 text-teal-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 7l5 5m0 0l-5 5m5-5H6"})}),e("span",{class:"text-4xl font-black text-teal-500",id:"annual-new-total",children:"$800"}),e("span",{class:"text-base text-gray-400",children:"/year"})]}),e("div",{class:"inline-block bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2",children:e("span",{class:"text-lg font-bold text-green-400",id:"annual-savings",children:"Save $1,600/year"})})]})]}),e("div",{class:"feature-card p-4 rounded-xl mt-4",children:[e("h3",{class:"text-base font-bold mb-3 text-center",children:"Everything Included"}),e("div",{class:"grid grid-cols-1 gap-2 text-xs",children:[e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"30-Minute Micro-Learning Sessions"}),e("div",{class:"text-gray-400 text-xs",children:"Perfect for young creators' attention spans - 8 live classes/month (Mon & Thu 11:30 AM ET)"})]})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"Lifetime Instruction Library"}),e("div",{class:"text-gray-400 text-xs",children:"Can't make it live? Catch up on expert-led teachings anytime."})]})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"December Bonus Workshops"}),e("div",{class:"text-gray-400 text-xs",children:"First 2 weeks of December: Special 1-hour fun workshops to celebrate the year!"})]})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"Portfolio Building"}),e("div",{class:"text-gray-400 text-xs",children:"Showcase your child's work and track their creative journey"})]})]})]})]}),e("button",{onclick:"selectPackage(parseInt(document.getElementById('student-slider').value))",class:"w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-full transition text-lg mt-6",children:"Continue to Payment →"})]}),e("div",{id:"step-3",class:"step-content hidden",children:[e("button",{onclick:"goToStep(2)",class:"text-gray-400 hover:text-white mb-4 flex items-center gap-2",children:"← Back"}),e("h2",{class:"text-5xl font-black mb-4",children:"Complete Enrollment"}),e("p",{class:"text-xl text-gray-400 mb-8",children:["You selected ",e("span",{id:"selected-package",class:"text-teal-500"})]}),e("div",{class:"feature-card p-6 rounded-2xl mb-6",children:[e("div",{class:"flex justify-between mb-4",children:[e("span",{class:"text-gray-400",children:"Students"}),e("span",{id:"summary-students",class:"font-bold"})]}),e("div",{class:"flex justify-between mb-4",children:[e("span",{class:"text-gray-400",children:"Price per student"}),e("span",{id:"summary-price",class:"font-bold"})]}),e("div",{class:"flex justify-between pt-4 border-t border-white/10",children:[e("span",{id:"summary-label",class:"text-xl font-bold",children:"Total Today (Prorated)"}),e("span",{id:"summary-total",class:"text-xl font-bold text-teal-500"})]}),e("div",{id:"savings-display",class:"flex justify-between mt-2 hidden",children:[e("span",{class:"text-sm text-gray-400",children:"Annual Savings"}),e("span",{id:"summary-savings",class:"text-sm font-bold text-green-500"})]}),e("p",{id:"billing-note",class:"text-xs text-gray-500 mt-2",children:"*Recurring billing on same date each month/year"})]}),e("div",{class:"feature-card p-6 rounded-2xl mb-6 border-2 border-teal-500/20",children:[e("h3",{class:"text-xl font-bold mb-4 flex items-center gap-2",children:[e("svg",{class:"w-6 h-6 text-teal-500",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z","clip-rule":"evenodd"})}),"Enrollment Agreement"]}),e("div",{class:"bg-gray-900 p-4 rounded-lg max-h-64 overflow-y-auto text-sm mb-4 space-y-3",children:[e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-white",children:"ACROMATICO CREATOR ACADEMY - ENROLLMENT TERMS"}),e("br",{}),"By enrolling in Acromatico Creator Academy programs, you agree to the following terms:"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"1. PROGRAM COMMITMENT"}),e("br",{}),"• 8 live classes per month (Monday & Thursday, 11:30 AM ET)",e("br",{}),"• 30-minute micro-learning sessions designed for youth creators",e("br",{}),"• Access to lifetime instruction library and recorded sessions",e("br",{}),"• Portfolio building tools and creative resources"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"2. PAYMENT TERMS"}),e("br",{}),"• Monthly billing: Charged on the same day each month",e("br",{}),"• Annual billing: 12 months prepaid (year-round classes)",e("br",{}),"• Full month billed on enrollment date; recurring monthly/annually",e("br",{}),"• Payments processed securely via Stripe"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"3. NO REFUND POLICY"}),e("br",{}),"• ",e("strong",{class:"text-white",children:"All class fees are NON-REFUNDABLE once charged"}),e("br",{}),"• Classes cannot be refunded, transferred, or credited",e("br",{}),"• Missed classes: Recordings available in instruction library",e("br",{}),"• No refunds for unused classes or early cancellation",e("br",{}),"• No chargebacks permitted - enrollment is a binding agreement"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"4. CANCELLATION POLICY"}),e("br",{}),"• Monthly: Cancel anytime (effective next billing cycle)",e("br",{}),"• Annual: No refunds on prepaid tuition (non-refundable)",e("br",{}),"• Must cancel before next billing date to avoid charges",e("br",{}),"• Cancellation does not entitle refunds for current period"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"5. CHARGEBACK PROTECTION"}),e("br",{}),"• By signing, you waive rights to initiate chargebacks",e("br",{}),"• Disputes must be handled directly with Acromatico",e("br",{}),"• Unauthorized chargebacks may result in account suspension",e("br",{}),"• You acknowledge receipt of services as described"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"6. ATTENDANCE & CONDUCT"}),e("br",{}),"• Students expected to attend live sessions when possible",e("br",{}),"• Respectful, kind, and collaborative behavior required",e("br",{}),"• ",e("strong",{class:"text-white",children:"Disruptive behaviors include:"})," bullying, inappropriate language, intentionally disrupting class, refusing to participate respectfully, or harassing other students/instructors",e("br",{}),"• ",e("strong",{class:"text-white",children:"Progressive discipline policy:"}),e("br",{}),"  → 1st incident: Verbal warning during class + email to parent",e("br",{}),"  → 2nd incident: Parent discussion call + written warning",e("br",{}),"  → 3rd incident: 1-week suspension from live classes (recordings still available)",e("br",{}),"  → Continued violations: Removal from program with no refund",e("br",{}),"• We work with parents to help students succeed, but safety and respect for all students is our priority",e("br",{}),"• Severe violations (threats, harassment, illegal activity) may result in immediate removal",e("br",{}),"• No refunds for removal due to code of conduct violations"]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-500",children:"7. CONTENT & INTELLECTUAL PROPERTY"}),e("br",{}),"• All course materials remain property of Acromatico",e("br",{}),"• Students retain rights to their created work and photographs",e("br",{}),"• ",e("strong",{class:"text-white",children:"Student Work Showcase:"})," Parents can opt-in via Parent Portal to allow us to showcase student work on social media, website, and marketing materials",e("br",{}),"• ",e("strong",{class:"text-white",children:"Photo Release for Subjects:"})," If students photograph people and wish to submit those images for showcase, a signed photo release from the photographed person (or their parent/guardian if under 18) must be uploaded via Parent Portal",e("br",{}),"• Parents control all consent settings in their dashboard and can revoke permission at any time"]}),e("p",{class:"text-gray-300 leading-relaxed",children:e("strong",{class:"text-white",children:"By signing below, you acknowledge that you have read, understood, and agree to these terms. You confirm that all enrollment fees are non-refundable and that you will not initiate chargebacks or payment disputes."})})]}),e("div",{class:"space-y-4",children:[e("div",{class:"flex gap-4 mb-4",children:[e("button",{id:"type-signature-btn",onclick:"switchSignatureMethod('type')",class:"flex-1 py-2 px-4 rounded-lg bg-teal-500 text-white font-semibold",children:"Type Signature"}),e("button",{id:"draw-signature-btn",onclick:"switchSignatureMethod('draw')",class:"flex-1 py-2 px-4 rounded-lg bg-gray-700 text-gray-300 font-semibold",children:"Draw Signature"})]}),e("div",{id:"type-signature-section",class:"space-y-3",children:[e("input",{type:"text",id:"typed-signature",placeholder:"Type your full name",class:"w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none text-white"}),e("p",{class:"text-xs text-gray-500",children:"By typing your name, you agree to sign this agreement electronically"})]}),e("div",{id:"draw-signature-section",class:"hidden space-y-3",children:[e("div",{class:"border-2 border-gray-700 rounded-lg bg-white",children:e("canvas",{id:"signature-canvas",width:"600",height:"200",class:"w-full cursor-crosshair rounded-lg",style:"touch-action: none;"})}),e("button",{onclick:"clearSignature()",class:"text-sm text-gray-400 hover:text-white",children:"Clear Signature"})]}),e("label",{class:"flex items-start gap-3 cursor-pointer",children:[e("input",{type:"checkbox",id:"agreement-checkbox",class:"mt-1 w-5 h-5 rounded border-gray-700 bg-gray-800 text-teal-500 focus:ring-teal-500 cursor-pointer"}),e("span",{class:"text-sm text-gray-300 leading-relaxed",children:["I have read and agree to the enrollment terms. I understand that all fees are ",e("strong",{class:"text-white",children:"non-refundable"})," and that I will not initiate chargebacks or payment disputes. I acknowledge this is a legally binding agreement."]})]})]})]}),e("style",{dangerouslySetInnerHTML:{__html:`
              @keyframes pulse-glow {
                0%, 100% {
                  box-shadow: 0 0 20px rgba(71, 148, 166, 0.3), 0 0 40px rgba(71, 148, 166, 0.1);
                }
                50% {
                  box-shadow: 0 0 30px rgba(71, 148, 166, 0.5), 0 0 60px rgba(71, 148, 166, 0.2);
                }
              }
              @keyframes gentle-bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-4px); }
              }
              .payment-button-pulse {
                animation: pulse-glow 2s ease-in-out infinite;
              }
              .payment-button-pulse:hover {
                animation: pulse-glow 2s ease-in-out infinite, gentle-bounce 0.6s ease-in-out infinite;
              }
            `}}),e("div",{class:"space-y-4 mb-6",children:[e("button",{onclick:"completeEnrollment()",class:"payment-button-pulse w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-6 px-8 rounded-2xl flex items-center justify-center gap-4 border-2 border-teal-400 transition-all shadow-2xl",id:"stripe-checkout-btn",children:[e("div",{class:"flex items-center gap-3",children:[e("svg",{class:"w-8 h-8",viewBox:"0 0 24 24",fill:"none",children:[e("rect",{x:"3",y:"5",width:"18",height:"14",rx:"2",stroke:"currentColor","stroke-width":"2"}),e("path",{d:"M3 10h18",stroke:"currentColor","stroke-width":"2"})]}),e("div",{class:"text-left",children:[e("div",{class:"text-xl font-bold",children:"Pay with Card"}),e("div",{class:"text-sm text-teal-100 font-normal",children:["Secure payment via Stripe • ",e("span",{id:"stripe-amount",children:"$0"})]})]})]}),e("div",{class:"ml-auto flex items-center gap-2 text-sm",children:[e("span",{class:"inline-flex items-center px-2 py-1 bg-white/20 rounded text-xs text-white",children:"Apple Pay"}),e("span",{class:"inline-flex items-center px-2 py-1 bg-white/20 rounded text-xs text-white",children:"G Pay"}),e("span",{class:"inline-flex items-center px-2 py-1 bg-white/20 rounded text-xs text-white",children:"+more"})]})]}),e("p",{class:"text-xs text-center text-gray-500",children:[e("svg",{class:"w-4 h-4 inline mr-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z","clip-rule":"evenodd"})}),"256-bit SSL Encryption • Your data is secure"]})]})]}),e("button",{onclick:"closeEnrollment()",class:"absolute top-8 right-8 text-gray-400 hover:text-white text-4xl",children:"×"})]})}),e("script",{dangerouslySetInnerHTML:{__html:`
        let currentStep = 1;
        let selectedStudents = 0;
        let selectedPrice = 0;
        let isAnnual = false;
        let pricingMode = 'monthly'; // 'per-class', 'monthly', or 'annual'
        
        // Pricing Constants
        const PER_CLASS_PRICE = 30; // $30 per individual class
        const BASE_MONTHLY_PRICE = 100; // $100/month for 8 classes (was $240)
        const SIBLING_DISCOUNT = 0.05; // 5% off per additional sibling
        const ANNUAL_DISCOUNT = 0.20; // 20% off annual prepaid
        
        function calculatePrice(students, isAnnual) {
          let total = 0;
          
          // Calculate total: if multiple students, everyone gets the sibling discount
          if (students === 1) {
            total = BASE_MONTHLY_PRICE; // $100 for single student
          } else {
            // With siblings, everyone pays discounted rate
            // 2 students = 5% off = $95 each = $190 total
            // 3 students = 10% off = $90 each = $270 total
            const discountRate = (students - 1) * SIBLING_DISCOUNT;
            const pricePerStudent = BASE_MONTHLY_PRICE * (1 - discountRate);
            total = pricePerStudent * students;
          }
          
          // Apply annual discount if selected
          if (isAnnual) {
            total = total * (1 - ANNUAL_DISCOUNT);
          }
          
          return total;
        }

        function openEnrollment() {
          document.getElementById('enrollment-modal').classList.remove('hidden');
          document.body.style.overflow = 'hidden';
          goToStep(1);
        }

        function closeEnrollment() {
          document.getElementById('enrollment-modal').classList.add('hidden');
          document.body.style.overflow = 'auto';
        }

        function goToStep(step) {
          // Validate Step 1 before proceeding to Step 2
          if (currentStep === 1 && step === 2) {
            const email = document.getElementById('parent-email').value.trim();
            const password = document.getElementById('parent-password').value;
            
            // Email validation
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!email || !emailRegex.test(email)) {
              alert('Please enter a valid email address');
              document.getElementById('parent-email').focus();
              return;
            }
            
            // Password validation (min 8 chars only - keep it simple)
            if (!password || password.length < 8) {
              alert('Password must be at least 8 characters long');
              document.getElementById('parent-password').focus();
              return;
            }
          }
          
          // Hide all steps
          document.querySelectorAll('.step-content').forEach(el => el.classList.add('hidden'));
          
          // Show target step
          document.getElementById('step-' + step).classList.remove('hidden');
          
          // Update progress
          currentStep = step;
          const percentage = (step / 3) * 100;
          document.getElementById('progress-bar').style.width = percentage + '%';
          document.getElementById('step-label').textContent = 'Step ' + step + ' of 3';
          document.getElementById('step-percentage').textContent = Math.round(percentage) + '%';
        }

        function switchPricingTab(mode) {
          pricingMode = mode;
          isAnnual = (mode === 'annual');
          
          // Update tab buttons
          const perClassBtn = document.getElementById('per-class-tab-btn');
          const monthlyBtn = document.getElementById('monthly-tab-btn');
          const annualBtn = document.getElementById('annual-tab-btn');
          
          // Reset all buttons
          [perClassBtn, monthlyBtn, annualBtn].forEach(btn => {
            btn.classList.remove('bg-teal-500', 'text-white');
            btn.classList.add('text-gray-400');
          });
          
          // Highlight active tab
          if (mode === 'per-class') {
            perClassBtn.classList.add('bg-teal-500', 'text-white');
            perClassBtn.classList.remove('text-gray-400');
          } else if (mode === 'monthly') {
            monthlyBtn.classList.add('bg-teal-500', 'text-white');
            monthlyBtn.classList.remove('text-gray-400');
          } else {
            annualBtn.classList.add('bg-teal-500', 'text-white');
            annualBtn.classList.remove('text-gray-400');
          }
          
          // Show/hide info sections
          document.getElementById('per-class-info').classList.toggle('hidden', mode !== 'per-class');
          document.getElementById('monthly-info').classList.toggle('hidden', mode !== 'monthly');
          document.getElementById('annual-info').classList.toggle('hidden', mode !== 'annual');
          
          // Update pricing display
          const currentStudents = parseInt(document.getElementById('student-slider').value);
          updateSlider(currentStudents);
        }

        function toggleBilling(type) {
          isAnnual = (type === 'annual');
          
          // Update toggle buttons
          const monthlyBtn = document.getElementById('monthly-toggle-btn');
          const annualBtn = document.getElementById('annual-toggle-btn');
          
          if (isAnnual) {
            monthlyBtn.classList.remove('bg-teal-500', 'text-white');
            monthlyBtn.classList.add('text-gray-400');
            annualBtn.classList.add('bg-teal-500', 'text-white');
            annualBtn.classList.remove('text-gray-400');
          } else {
            monthlyBtn.classList.add('bg-teal-500', 'text-white');
            monthlyBtn.classList.remove('text-gray-400');
            annualBtn.classList.remove('bg-teal-500', 'text-white');
            annualBtn.classList.add('text-gray-400');
          }
          
          // Toggle prices
          document.querySelectorAll('.monthly-price').forEach(el => {
            el.classList.toggle('hidden', isAnnual);
          });
          document.querySelectorAll('.annual-price').forEach(el => {
            el.classList.toggle('hidden', !isAnnual);
          });
          document.querySelectorAll('.annual-savings').forEach(el => {
            el.classList.toggle('hidden', !isAnnual);
          });
          
          // Toggle per-class pricing
          document.querySelectorAll('.monthly-per-class').forEach(el => {
            el.classList.toggle('hidden', isAnnual);
          });
          document.querySelectorAll('.annual-per-class').forEach(el => {
            el.classList.toggle('hidden', !isAnnual);
          });
          
          // Toggle billing notes
          document.querySelectorAll('.monthly-note').forEach(el => {
            el.classList.toggle('hidden', isAnnual);
          });
          document.querySelectorAll('.annual-note').forEach(el => {
            el.classList.toggle('hidden', !isAnnual);
          });
          
          // Update slider display with new pricing
          const currentStudents = parseInt(document.getElementById('student-slider').value);
          updateSlider(currentStudents);
        }

        function updateSlider(students) {
          students = parseInt(students);
          
          // Update slider visual feedback
          const slider = document.getElementById('student-slider');
          const percentage = ((students - 1) / 5) * 100;
          slider.style.background = \`linear-gradient(to right, #4794A6 0%, #4794A6 \${percentage}%, #1f2937 \${percentage}%, #1f2937 100%)\`;
          
          // Update slider number display
          document.getElementById('slider-number').textContent = students + (students >= 6 ? '+' : '');
          
          // Calculate pricing based on mode
          let bigPrice, studentCountText;
          
          if (pricingMode === 'per-class') {
            // Per-class pricing: $30/class
            bigPrice = PER_CLASS_PRICE;
            studentCountText = students + (students >= 6 ? '+' : '') + (students === 1 ? ' student' : ' students');
            // Note: per-class summary text is set in HTML, no need to update dynamically
          } else {
            // Monthly or Annual pricing
            const monthlyTotal = calculatePrice(students, isAnnual);
            const perStudentPerMonth = monthlyTotal / students;
            const perStudentPerClass = perStudentPerMonth / 8;
            
            bigPrice = perStudentPerClass;
            studentCountText = students + (students >= 6 ? '+' : '') + (students === 1 ? ' student' : ' students') + ' • 8 live classes';
            
            // Calculate original price (before discount) and savings
            const originalPerStudent = 30; // Original $30 per class
            const originalMonthlyTotal = originalPerStudent * 8 * students; // $30/class × 8 classes × students = $240/student baseline
            const newMonthlyTotal = monthlyTotal;
            const monthlySavings = originalMonthlyTotal - newMonthlyTotal;
            
            // Update Monthly pricing card
            const monthlyOriginalTotal = document.getElementById('monthly-original-total');
            const monthlyNewTotal = document.getElementById('monthly-new-total');
            const monthlySavingsText = document.getElementById('monthly-savings');
            
            if (monthlyOriginalTotal && monthlyNewTotal && monthlySavingsText) {
              monthlyOriginalTotal.textContent = '$' + originalMonthlyTotal.toFixed(0);
              monthlyNewTotal.textContent = '$' + newMonthlyTotal.toFixed(0);
              monthlySavingsText.textContent = 'Save $' + monthlySavings.toFixed(0) + '/month';
            }
            
            // Calculate Annual pricing (12 months - year-round)
            const annualOriginalTotal = originalMonthlyTotal * 12;
            const annualNewTotal = newMonthlyTotal * 12;
            const annualSavings = annualOriginalTotal - annualNewTotal;
            
            // Update Annual pricing card
            const annualOriginalTotalEl = document.getElementById('annual-original-total');
            const annualNewTotalEl = document.getElementById('annual-new-total');
            const annualSavingsEl = document.getElementById('annual-savings');
            
            if (annualOriginalTotalEl && annualNewTotalEl && annualSavingsEl) {
              annualOriginalTotalEl.textContent = '$' + annualOriginalTotal.toFixed(0);
              annualNewTotalEl.textContent = '$' + annualNewTotal.toFixed(0);
              annualSavingsEl.textContent = 'Save $' + annualSavings.toFixed(0) + '/year';
            }
            
            // Store for payment
            selectedPrice = monthlyTotal;
          }
          
          // Update BIG price display
          document.getElementById('big-price-display').textContent = '$' + bigPrice.toFixed(2);
          
          // Update student count text
          document.getElementById('student-count-text').textContent = studentCountText;
          
          // Auto-select package (for navigation to step 3)
          selectedStudents = students;
        }

        function selectPackage(students) {
          selectedStudents = students;
          
          // Calculate total monthly price with sibling discount
          const monthlyTotal = calculatePrice(students, isAnnual);
          selectedPrice = monthlyTotal; // Store total for later use
          
          let totalCharge, chargeLabel;
          
          if (isAnnual) {
            // Annual: 12 months prepaid (year-round classes including summer/winter)
            totalCharge = monthlyTotal * 12;
            chargeLabel = 'Total Due Today (Annual Prepaid)';
          } else {
            // Monthly: Full month charge, recurring on same date each month
            totalCharge = monthlyTotal;
            chargeLabel = 'First Month Total';
          }
          
          // Calculate savings for display (Annual vs Monthly)
          const yearlySavings = isAnnual ? 
            ((pricingData.monthly[students] * students * 10) - (pricePerStudent * students * 10)) : 0;
          
          // Update summary with clear pricing breakdown
          const billingText = isAnnual ? ' (Annual - 12 months)' : ' (Monthly)';
          const studentText = students + (students > 1 ? ' Students' : ' Student');
          document.getElementById('selected-package').textContent = studentText + billingText;
          document.getElementById('summary-students').textContent = students;
          
          // Show per-month total with discount info
          let priceText = '$' + monthlyTotal.toFixed(0) + '/month';
          if (students > 1) {
            const savingsPercent = Math.round((students - 1) * 10);
            priceText += ' (Save ' + savingsPercent + '% with siblings)';
          }
          if (isAnnual) {
            priceText += ' • 20% off annual';
          }
          document.getElementById('summary-price').textContent = priceText;
          document.getElementById('summary-total').textContent = '$' + totalCharge.toFixed(2);
          
          // Update the label and savings display
          document.getElementById('summary-label').textContent = chargeLabel;
          
          // Update Stripe button amount
          const stripeAmountEl = document.getElementById('stripe-amount');
          if (stripeAmountEl) {
            stripeAmountEl.textContent = '$' + totalCharge.toFixed(2);
          }
          
          if (isAnnual) {
            document.getElementById('savings-display').classList.remove('hidden');
            document.getElementById('summary-savings').textContent = '-$' + yearlySavings.toFixed(2);
          } else {
            document.getElementById('savings-display').classList.add('hidden');
          }
          
          // Always show billing note (no proration)
          const billingNote = document.getElementById('billing-note');
          if (billingNote) {
            billingNote.textContent = isAnnual ? 
              '*Annual prepaid - full 12 months charged today' : 
              '*Recurring monthly on ' + new Date().getDate() + 'th of each month';
          }
          
          // Go to next step
          setTimeout(() => goToStep(3), 300);
        }

        function completeEnrollment() {
          const email = document.getElementById('parent-email').value;
          const password = document.getElementById('parent-password').value;
          
          if (!email || !password) {
            alert('Please fill in all fields');
            return;
          }
          
          const billingType = isAnnual ? 'Annual (12 months prepaid - year-round)' : 'Monthly';
          const pricePerStudent = selectedPrice;
          const monthlyTotal = pricePerStudent * selectedStudents;
          const totalCharge = isAnnual ? monthlyTotal * 12 : monthlyTotal;
          
          alert('🎉 Enrollment Complete!\\\\n\\\\nEmail: ' + email + '\\\\nPackage: ' + selectedStudents + ' students at $' + pricePerStudent + '/mo each\\\\nBilling: ' + billingType + '\\\\nTotal: $' + totalCharge.toFixed(2) + '\\\\n\\\\nStripe integration will be added next!');
          closeEnrollment();
        }

        // Update all "Enroll Now" and "Start Creating Today" buttons
        document.addEventListener('DOMContentLoaded', function() {
          const enrollButtons = document.querySelectorAll('a[href="/pricing"], a[href="/checkout"]');
          enrollButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
              e.preventDefault();
              openEnrollment();
            });
          });
        });
      `}})]}),{title:"FAQ - Everything You Need to Know | Acromatico"}));w.get("/curriculum",t=>t.redirect("/static/curriculum"));w.post("/api/admin/login",async t=>{try{const{email:r,password:n}=await t.req.json(),a="italo@acromatico.com";if(r!==a||n!=="Acromatico2026!")return t.json({success:!1,error:"Invalid email or password"},401);const i={id:"admin-italo",email:a,role:"admin",name:"Italo Campilii"},o=wc(i);return t.json({success:!0,token:o,user:{name:i.name,email:i.email,role:i.role}})}catch(r){return console.error("[Admin Login] Error:",r),t.json({success:!1,error:r.message},500)}});w.use("/admin/crm/*",async(t,r)=>{const n=t.req.path;return["/admin/crm/login","/admin/crm/dashboard","/admin/crm/analytics","/admin/crm/projects","/admin/crm/projects/traveldrd","/admin/crm/roadmap"].includes(n)?r():ce(t,r)});w.use("/api/crm/process-message",ce);w.use("/api/crm/tasks",ce);w.use("/api/crm/tasks/*",ce);w.use("/api/crm/clients",ce);w.use("/api/crm/clients/*",ce);w.use("/api/crm/analytics/*",ce);function Tc(t){return{"bug-report":"BUSINESS_PROJECT","feature-request":"BUSINESS_PROJECT","scope-change":"BUSINESS_PROJECT",question:"BUSINESS_PROJECT",payment:"BUSINESS_ADMIN",feedback:"PERSONAL",personal:"PERSONAL",spam:"SPAM"}[t]||"UNKNOWN"}function Sc(t){return{positive:"POSITIVE",neutral:"NEUTRAL",negative:"FRUSTRATED",frustrated:"ANGRY"}[t]||"UNKNOWN"}function kc(t){return{critical:"P1",high:"P2",medium:"P3",low:"P4"}[t]||"P3"}function Pc(t){return{"15min":{effort:"XS",hours:.25},"30min":{effort:"XS",hours:.5},"1hr":{effort:"S",hours:1},"2hr":{effort:"S",hours:2},"4hr":{effort:"M",hours:4},"8hr":{effort:"L",hours:8},"16hr":{effort:"XL",hours:16},unknown:{effort:"M",hours:4}}[t]||{effort:"M",hours:4}}w.get("/admin/crm/login",t=>t.redirect("/static/admin-crm-login.html"));w.get("/admin/crm/login-old",t=>t.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Admin Login - Acromatico CRM</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        * { -webkit-tap-highlight-color: transparent; -webkit-touch-callout: none; }
        body { min-height: 100vh; min-height: -webkit-fill-available; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .glass-card { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); }
        .input-field { transition: all 0.3s ease; -webkit-appearance: none; appearance: none; }
        .input-field:focus { outline: none; border-color: #667eea; box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1); }
        .btn-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); transition: all 0.3s ease; }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); }
        .btn-primary:active { transform: translateY(0); }
        .error-shake { animation: shake 0.5s; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
        .fade-in { animation: fadeIn 0.3s ease-in; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .spinner { border: 3px solid rgba(255, 255, 255, 0.3); border-top-color: #667eea; border-radius: 50%; width: 24px; height: 24px; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>
</head>
<body class="flex items-center justify-center p-4">
    <div class="glass-card rounded-2xl p-8 w-full max-w-md fade-in">
        <div class="text-center mb-8">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <i class="fas fa-brain text-white text-2xl"></i>
            </div>
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Acromatico CRM</h1>
            <p class="text-gray-600 text-sm">AI-Powered Client Intelligence</p>
        </div>
        <form id="loginForm" class="space-y-6">
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-key mr-2 text-purple-600"></i>Admin Token
                </label>
                <textarea id="tokenInput" rows="4" class="input-field w-full px-4 py-3 border-2 border-gray-200 rounded-xl resize-none font-mono text-sm" placeholder="Paste your JWT token here..." required autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
                <p class="text-xs text-gray-500 mt-2"><i class="fas fa-info-circle mr-1"></i>Your secure access token from the admin team</p>
            </div>
            <div id="errorAlert" class="hidden p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <div class="flex items-center">
                    <i class="fas fa-exclamation-triangle text-red-500 mr-3"></i>
                    <div>
                        <p class="font-semibold text-red-800">Authentication Failed</p>
                        <p id="errorMessage" class="text-sm text-red-600 mt-1"></p>
                    </div>
                </div>
            </div>
            <div id="successAlert" class="hidden p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                <div class="flex items-center">
                    <i class="fas fa-check-circle text-green-500 mr-3"></i>
                    <p class="font-semibold text-green-800">Access Granted - Redirecting...</p>
                </div>
            </div>
            <button type="submit" id="submitBtn" class="btn-primary w-full py-4 text-white font-bold rounded-xl flex items-center justify-center">
                <span id="btnText"><i class="fas fa-sign-in-alt mr-2"></i>Access Dashboard</span>
                <span id="btnSpinner" class="hidden"><div class="spinner mr-3"></div>Processing...</span>
            </button>
        </form>
        <div class="mt-6 text-center text-sm text-gray-600">
            <i class="fas fa-shield-alt mr-1"></i>Secured with JWT Authentication
        </div>
        <div class="mt-8 pt-6 border-t border-gray-200">
            <p class="text-xs text-gray-500 text-center mb-3">System Status</p>
            <div class="grid grid-cols-3 gap-3 text-center">
                <div><div class="text-lg font-bold text-purple-600">🤖</div><div class="text-xs text-gray-600 mt-1">4 AI Agents</div></div>
                <div><div class="text-lg font-bold text-green-600">⚡</div><div class="text-xs text-gray-600 mt-1">15s Response</div></div>
                <div><div class="text-lg font-bold text-blue-600">📊</div><div class="text-xs text-gray-600 mt-1">Real-time BI</div></div>
            </div>
        </div>
    </div>
    <script>
        function setViewportHeight() { const vh = window.innerHeight * 0.01; document.documentElement.style.setProperty('--vh', \`\${vh}px\`); }
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);

        const form = document.getElementById('loginForm');
        const tokenInput = document.getElementById('tokenInput');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const btnSpinner = document.getElementById('btnSpinner');
        const errorAlert = document.getElementById('errorAlert');
        const successAlert = document.getElementById('successAlert');
        const errorMessage = document.getElementById('errorMessage');

        const existingToken = localStorage.getItem('admin_token');
        if (existingToken) { validateAndRedirect(existingToken); }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const token = tokenInput.value.trim();
            errorAlert.classList.add('hidden');
            successAlert.classList.add('hidden');
            
            console.log('Login attempt with token length:', token.length);
            
            if (!token || token.length < 20) { 
                showError('Invalid token format. Please paste the complete token.'); 
                return; 
            }
            
            submitBtn.disabled = true;
            btnText.classList.add('hidden');
            btnSpinner.classList.remove('hidden');
            
            try {
                await validateAndRedirect(token);
            } catch (error) {
                console.error('Login error:', error);
                showError(error.message || 'Authentication failed. Please check your token and try again.');
                submitBtn.disabled = false;
                btnText.classList.remove('hidden');
                btnSpinner.classList.add('hidden');
            }
        });

        async function validateAndRedirect(token) {
            try {
                const response = await fetch('/api/crm/clients', {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' }
                });
                if (response.status === 401) throw new Error('Invalid or expired token');
                if (response.status === 403) throw new Error('Unauthorized: Admin role required');
                if (!response.ok) throw new Error(\`Authentication failed (\${response.status})\`);
                
                // Set cookie for server-side auth (browser navigation)
                document.cookie = 'admin_token=' + token + '; path=/; max-age=86400; SameSite=Lax';
                
                // Keep localStorage for JS access
                localStorage.setItem('admin_token', token);
                
                successAlert.classList.remove('hidden');
                setTimeout(() => { window.location.href = '/admin/crm/dashboard'; }, 800);
            } catch (error) {
                localStorage.removeItem('admin_token');
                throw error;
            }
        }

        function showError(message) {
            errorMessage.textContent = message;
            errorAlert.classList.remove('hidden');
            errorAlert.classList.add('error-shake');
            setTimeout(() => { errorAlert.classList.remove('error-shake'); }, 500);
        }

        setTimeout(() => { tokenInput.focus(); }, 300);
    <\/script>
</body>
</html>`));w.get("/admin/crm/dashboard",t=>t.redirect("/static/admin-crm-dashboard.html"));w.get("/admin/crm/analytics",t=>t.redirect("/static/admin-crm-analytics.html"));w.get("/admin/crm/projects",t=>t.redirect("/static/admin-project-pipeline.html"));w.get("/admin/crm/projects/traveldrd",t=>t.redirect("/static/traveldrd-summary.html"));w.get("/admin/crm/roadmap",t=>t.redirect("/static/project-roadmap.html"));w.get("/api/projects",ce,async t=>{try{const{DB_EDUCATION:r}=t.env,{status:n,client_id:a,limit:s=50}=t.req.query();let i="SELECT * FROM projects";const o=[];n&&o.push(`status = '${n}'`),a&&o.push(`client_id = '${a}'`),o.length>0&&(i+=" WHERE "+o.join(" AND ")),i+=" ORDER BY created_at DESC LIMIT ?";const l=await r.prepare(i).bind(parseInt(s)).all();return t.json({success:!0,projects:l.results||[]})}catch(r){return console.error("Error fetching projects:",r),t.json({success:!1,error:r.message},500)}});w.post("/api/projects",ce,async t=>{try{const{DB_EDUCATION:r}=t.env,n=await t.req.json(),a=`proj-${Date.now()}-${Math.random().toString(36).substring(7)}`,{client_id:s,project_name:i,project_type:o,priority:l="P2",start_date:c,target_delivery:u,project_lead:d,estimated_hours:h,budget_dollars:g}=n;return await r.prepare(`
      INSERT INTO projects (
        id, client_id, project_name, project_type, status, priority,
        start_date, target_delivery, project_lead, estimated_hours, budget_dollars
      ) VALUES (?, ?, ?, ?, 'discovery', ?, ?, ?, ?, ?, ?)
    `).bind(a,s,i,o,l,c,u,d,h,g).run(),t.json({success:!0,project_id:a})}catch(r){return console.error("Error creating project:",r),t.json({success:!1,error:r.message},500)}});w.get("/api/pipeline/overview",ce,async t=>{try{const{DB_EDUCATION:r}=t.env,n=await r.prepare(`
      SELECT status, COUNT(*) as count FROM projects GROUP BY status
    `).all(),a=await r.prepare(`
      SELECT COUNT(*) as count FROM projects 
      WHERE status NOT IN ('delivered', 'cancelled')
    `).first(),s=await r.prepare(`
      SELECT id, project_name, target_delivery, days_remaining, status, priority
      FROM projects 
      WHERE status NOT IN ('delivered', 'cancelled')
      AND target_delivery IS NOT NULL
      ORDER BY target_delivery ASC
      LIMIT 10
    `).all(),i=await r.prepare(`
      SELECT COUNT(*) as count FROM projects 
      WHERE days_remaining < 7 AND status NOT IN ('delivered', 'cancelled')
    `).first();return t.json({success:!0,stats:{active:(a==null?void 0:a.count)||0,at_risk:(i==null?void 0:i.count)||0,by_status:n.results||[]},upcoming_deadlines:s.results||[]})}catch(r){return console.error("Error fetching pipeline overview:",r),t.json({success:!1,error:r.message},500)}});w.post("/api/crm/message-webhook",async t=>{try{const{DB_EDUCATION:r}=t.env;if(!t.env.TWILIO_AUTH_TOKEN)return console.error("TWILIO_AUTH_TOKEN not configured"),t.json({error:"Webhook not configured"},500);const a=await t.req.parseBody(),s=a.From,i=a.Body,o=a.MessageSid;console.log("[CRM Webhook] Received SMS from",s,":",i);const l=new Date(Date.now()-6e4).toISOString(),c=await r.prepare("SELECT COUNT(*) as count FROM crm_messages WHERE phone_number = ? AND created_at > ?").bind(s,l).first();if(c&&c.count>=100)return console.warn("[CRM Webhook] Rate limit exceeded for",s),t.text('<?xml version="1.0" encoding="UTF-8"?><Response></Response>',200,{"Content-Type":"text/xml"});const u=Qs(s);let d=await r.prepare("SELECT * FROM crm_clients WHERE phone_number = ?").bind(u).first();if(!d){const v=kt("client");await r.prepare("INSERT INTO crm_clients (id, name, phone_number, status) VALUES (?, ?, ?, ?)").bind(v,"Unknown Client",u,"lead").run(),d=await r.prepare("SELECT * FROM crm_clients WHERE id = ?").bind(v).first(),console.log("[CRM Webhook] Created new client:",v)}const h=t.env.GENSPARK_API_KEY;if(!h)throw new Error("GENSPARK_API_KEY not configured");const g=await bc({rawMessage:i,clientName:d.name,companyName:d.company},h);console.log("[CRM Agent 1] Classification:",g);const b=kt("msg");await r.prepare(`
      INSERT INTO crm_messages (
        id, client_id, source, phone_number, body,
        message_type, category, urgency, sentiment, 
        action_required, confidence_score, processed_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(b,d.id,"sms",u,i,Tc(g.messageType),g.category.toUpperCase(),g.urgency.toUpperCase(),Sc(g.sentiment),g.requiresAction?"create_task":"auto_resolve",g.confidence).run();let m=null,y="Thanks for reaching out! We received your message and will get back to you within 2 hours. - Team Acromatico";if(g.requiresAction){const v=await r.prepare("SELECT * FROM crm_projects WHERE client_id = ? AND status = ? LIMIT 1").bind(d.id,"active").first(),S=v?{projectName:v.name,projectType:v.project_type||"unknown",techStack:v.tech_stack||"[]",currentPhase:v.status,budgetHours:v.budget_hours||0,hoursUsed:v.hours_used||0}:{projectName:"No active project",projectType:"unknown",techStack:"[]",currentPhase:"discovery",budgetHours:0,hoursUsed:0},P=await xc({rawMessage:i,classification:g,projectContext:S},h);console.log("[CRM Agent 2] Task generated:",P.taskTitle),m=kt("task");const _=Pc(P.estimatedEffort);await r.prepare(`
        INSERT INTO crm_tasks (
          id, message_id, client_id, project_id,
          title, description, acceptance_criteria,
          effort, estimated_hours, priority, status, scope_flag, client_approval_required
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(m,b,d.id,v?v.id:null,P.taskTitle,P.description,JSON.stringify(P.acceptanceCriteria),_.effort,_.hours,kc(P.priority),"open",P.scopeFlag?1:0,P.clientApprovalRequired?1:0).run(),y=P.suggestedResponse}const f=`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${y}</Message>
</Response>`;return await r.prepare("UPDATE crm_messages SET auto_response_sent = ? WHERE id = ?").bind(y,b).run(),console.log("[CRM Webhook] Processed successfully:",b,m?`(Task: ${m})`:"(No task)"),t.text(f,200,{"Content-Type":"text/xml"})}catch(r){return console.error("[CRM Webhook] Error:",r),t.text('<?xml version="1.0" encoding="UTF-8"?><Response></Response>',200,{"Content-Type":"text/xml"})}});w.post("/api/crm/process-message",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.env.GENSPARK_API_KEY;if(!n)return t.json({success:!1,error:"GENSPARK_API_KEY not configured"},500);const a=await t.req.json(),{clientId:s,projectId:i,source:o,content:l,fromEmail:c,fromPhone:u}=a;if(!s||!o||!l)return t.json({success:!1,error:"Missing required fields: clientId, source, content"},400);const d=await r.prepare("SELECT * FROM crm_clients WHERE id = ?").bind(s).first();if(!d)return t.json({success:!1,error:"Client not found"},404);let h=null;i&&(h=await r.prepare("SELECT * FROM crm_projects WHERE id = ?").bind(i).first());const g=await bc({rawMessage:l,clientName:d.name,companyName:d.company,projectName:h?h.name:void 0},n),b=kt("msg");await r.prepare(`
      INSERT INTO crm_messages (
        id, client_id, project_id, source, 
        ${c?"email_address,":""} 
        ${u?"phone_number,":""}
        body, message_type, category, urgency, sentiment,
        action_required, confidence_score, processed_at
      ) VALUES (?, ?, ?, ?, ${c?"?,":""} ${u?"?,":""} ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(b,s,i,o,...c?[c]:[],...u?[Qs(u)]:[],l,Tc(g.messageType),g.category.toUpperCase(),g.urgency.toUpperCase(),Sc(g.sentiment),g.requiresAction?"create_task":"auto_resolve",g.confidence).run();let m=null,y=null;if(g.requiresAction&&h){y=await xc({rawMessage:l,classification:g,projectContext:{projectName:h.name,projectType:h.project_type||"unknown",techStack:h.tech_stack||"[]",currentPhase:h.status,budgetHours:h.budget_hours||0,hoursUsed:h.hours_used||0}},n),m=kt("task");const f=Pc(y.estimatedEffort);await r.prepare(`
        INSERT INTO crm_tasks (
          id, message_id, client_id, project_id,
          title, description, acceptance_criteria,
          effort, estimated_hours, priority, status, scope_flag, client_approval_required
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(m,b,s,i,y.taskTitle,y.description,JSON.stringify(y.acceptanceCriteria),f.effort,f.hours,kc(y.priority),"open",y.scopeFlag?1:0,y.clientApprovalRequired?1:0).run()}return t.json({success:!0,message:{id:b,classification:g,taskCreated:!!m,taskId:m,taskSpec:y?{title:y.taskTitle,effort:y.estimatedEffort,priority:y.priority,suggestedResponse:y.suggestedResponse}:null}})}catch(r){return console.error("[CRM Process] Error:",r),t.json({success:!1,error:r.message||"Failed to process message"},500)}});w.get("/api/crm/tasks",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.query("status"),a=t.req.query("priority"),s=t.req.query("clientId"),i=t.req.query("projectId");let o=`
      SELECT 
        t.*,
        c.name as client_name,
        c.company as client_company,
        p.name as project_name,
        p.project_type,
        m.body as original_message,
        m.sentiment as message_sentiment
      FROM crm_tasks t
      LEFT JOIN crm_clients c ON t.client_id = c.id
      LEFT JOIN crm_projects p ON t.project_id = p.id
      LEFT JOIN crm_messages m ON t.message_id = m.id
      WHERE 1=1
    `;const l=[];n&&(o+=" AND t.status = ?",l.push(n)),a&&(o+=" AND t.priority = ?",l.push(a)),s&&(o+=" AND t.client_id = ?",l.push(s)),i&&(o+=" AND t.project_id = ?",l.push(i)),o+=" ORDER BY t.created_at DESC LIMIT 100";const c=await r.prepare(o).bind(...l).all();return t.json({success:!0,tasks:c.results||[]})}catch(r){return console.error("[CRM Tasks] Error:",r),t.json({success:!1,error:r.message},500)}});w.get("/api/crm/tasks/:id",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("id"),a=await r.prepare(`
      SELECT 
        t.*,
        c.name as client_name,
        c.company as client_company,
        c.phone_number,
        c.email,
        p.name as project_name,
        p.project_type,
        p.tech_stack,
        m.body as original_message,
        m.sentiment,
        m.received_at
      FROM crm_tasks t
      LEFT JOIN crm_clients c ON t.client_id = c.id
      LEFT JOIN crm_projects p ON t.project_id = p.id
      LEFT JOIN crm_messages m ON t.message_id = m.id
      WHERE t.id = ?
    `).bind(n).first();return a?t.json({success:!0,task:a}):t.json({success:!1,error:"Task not found"},404)}catch(r){return console.error("[CRM Task Detail] Error:",r),t.json({success:!1,error:r.message},500)}});w.put("/api/crm/tasks/:id",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("id"),a=await t.req.json(),s=["status","assigned_to","actual_effort_hours","due_date","priority"],i=[],o=[];for(const[l,c]of Object.entries(a))s.includes(l)&&(i.push(`${l} = ?`),o.push(c));return i.length===0?t.json({success:!1,error:"No valid fields to update"},400):(a.status==="completed"&&i.push("completed_at = datetime('now')"),i.push("updated_at = datetime('now')"),o.push(n),await r.prepare(`UPDATE crm_tasks SET ${i.join(", ")} WHERE id = ?`).bind(...o).run(),t.json({success:!0,message:"Task updated successfully"}))}catch(r){return console.error("[CRM Task Update] Error:",r),t.json({success:!1,error:r.message},500)}});w.delete("/api/crm/tasks/:id",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("id");return await r.prepare("UPDATE crm_tasks SET status = ?, updated_at = datetime('now') WHERE id = ?").bind("cancelled",n).run(),t.json({success:!0,message:"Task cancelled successfully"})}catch(r){return console.error("[CRM Task Delete] Error:",r),t.json({success:!1,error:r.message},500)}});w.get("/api/crm/clients",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.query("sortBy")||"name",a=t.req.query("order")||"asc",s=await r.prepare(`
      SELECT 
        c.*,
        COUNT(DISTINCT p.id) as project_count,
        COUNT(DISTINCT CASE WHEN p.status = 'active' THEN p.id END) as active_project_count,
        h.health_score,
        h.churn_risk_level,
        h.sentiment_trend,
        h.calculated_at as health_updated_at
      FROM crm_clients c
      LEFT JOIN crm_projects p ON c.id = p.client_id
      LEFT JOIN crm_client_health h ON c.id = h.client_id
      GROUP BY c.id
      ORDER BY ${n==="healthScore"?"h.health_score":n==="lastContact"?"c.updated_at":"c.name"} ${a==="desc"?"DESC":"ASC"}
      LIMIT 100
    `).all();return t.json({success:!0,clients:s.results||[]})}catch(r){return console.error("[CRM Clients] Error:",r),t.json({success:!1,error:r.message},500)}});w.get("/api/crm/clients/:id",async t=>{var r;try{const{DB_EDUCATION:n}=t.env,a=t.env.GENSPARK_API_KEY,s=t.req.param("id"),i=await n.prepare("SELECT * FROM crm_clients WHERE id = ?").bind(s).first();if(!i)return t.json({success:!1,error:"Client not found"},404);const o=await n.prepare("SELECT * FROM crm_projects WHERE client_id = ? ORDER BY created_at DESC").bind(s).all(),l=new Date(Date.now()-720*60*60*1e3).toISOString(),c=await n.prepare("SELECT * FROM crm_messages WHERE client_id = ? AND created_at > ? ORDER BY created_at DESC LIMIT 50").bind(s,l).all();let d=await n.prepare("SELECT * FROM crm_client_health WHERE client_id = ? ORDER BY calculated_at DESC LIMIT 1").bind(s).first();if(a&&c.results&&c.results.length>0){const h=(r=o.results)==null?void 0:r.find(b=>b.status==="active"),g={clientId:s,clientData:{name:i.name,company:i.company||"",totalProjects:i.total_projects||0,activeProjects:i.active_projects||0,totalRevenue:i.total_spent||0},recentMessages:c.results.map(b=>({content:b.body,sentiment:b.sentiment||"neutral",urgency:b.urgency||"low",timestamp:b.created_at})),projectMetrics:{onTimeDelivery:!0,budgetCompliance:h?h.hours_used<=h.budget_hours:!0,currentStatus:h?h.status:"none"},responseMetrics:{avgResponseTimeHours:i.avg_response_time_hours||0,lastContactDate:i.updated_at}};try{const b=await uf(g,a),m=kt("health");await n.prepare(`
          INSERT INTO crm_client_health (
            id, client_id, health_score, churn_risk_level,
            sentiment_trend, upsell_opportunities, 
            response_time_avg_hours, calculated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
        `).bind(m,s,b.healthScore,b.riskLevel.toUpperCase(),b.sentimentTrend,JSON.stringify(b.upsellSignals),i.avg_response_time_hours||0).run(),d={health_score:b.healthScore,churn_risk_level:b.riskLevel.toUpperCase(),sentiment_trend:b.sentimentTrend,upsell_opportunities:JSON.stringify(b.upsellSignals),recommended_actions:b.recommendedActions,churn_risk_factors:b.churnRiskFactors}}catch(b){console.error("[Health Calculation] Error:",b)}}return t.json({success:!0,client:i,projects:o.results||[],recentMessages:c.results||[],healthScore:d})}catch(n){return console.error("[CRM Client Detail] Error:",n),t.json({success:!1,error:n.message},500)}});w.put("/api/crm/clients/:id",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("id"),a=await t.req.json(),s=["name","company","phone_number","email","tier","status","notes","tags"],i=[],o=[];for(const[l,c]of Object.entries(a))s.includes(l)&&(i.push(`${l} = ?`),o.push(c));return i.length===0?t.json({success:!1,error:"No valid fields to update"},400):(i.push("updated_at = datetime('now')"),o.push(n),await r.prepare(`UPDATE crm_clients SET ${i.join(", ")} WHERE id = ?`).bind(...o).run(),t.json({success:!0,message:"Client updated successfully"}))}catch(r){return console.error("[CRM Client Update] Error:",r),t.json({success:!1,error:r.message},500)}});w.post("/api/crm/clients",async t=>{try{const{DB_EDUCATION:r}=t.env,n=await t.req.json(),{name:a,company:s,phoneNumber:i,email:o,tier:l,notes:c}=n;if(!a)return t.json({success:!1,error:"Client name is required"},400);const u=kt("client");await r.prepare(`
      INSERT INTO crm_clients (
        id, name, company, phone_number, email, tier, status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(u,a,s||null,i?Qs(i):null,o||null,l||"standard","lead",c||null).run();const d=await r.prepare("SELECT * FROM crm_clients WHERE id = ?").bind(u).first();return t.json({success:!0,client:d})}catch(r){return console.error("[CRM Client Create] Error:",r),t.json({success:!1,error:r.message},500)}});w.get("/api/crm/analytics/dashboard",async t=>{try{const{DB_EDUCATION:r}=t.env,n=new Date(Date.now()-10080*60*1e3).toISOString(),a=await r.prepare("SELECT COUNT(*) as count FROM crm_messages WHERE created_at > ?").bind(n).first(),s=(a==null?void 0:a.count)||0,i=s*.33,o=Math.round(i*150),l=await r.prepare(`
      SELECT 
        COUNT(CASE WHEN h.health_score >= 70 THEN 1 END) as healthy,
        COUNT(CASE WHEN h.health_score >= 50 AND h.health_score < 70 THEN 1 END) as at_risk,
        COUNT(CASE WHEN h.health_score < 50 THEN 1 END) as critical
      FROM crm_clients c
      LEFT JOIN (
        SELECT client_id, health_score
        FROM crm_client_health
        WHERE (client_id, calculated_at) IN (
          SELECT client_id, MAX(calculated_at)
          FROM crm_client_health
          GROUP BY client_id
        )
      ) h ON c.id = h.client_id
      WHERE c.status = 'active'
    `).first(),c=await r.prepare(`
      SELECT 
        COUNT(CASE WHEN status = 'open' THEN 1 END) as backlog,
        COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress,
        COUNT(CASE WHEN status = 'completed' AND created_at > ? THEN 1 END) as completed_this_week
      FROM crm_tasks
    `).bind(n).first(),u=await r.prepare(`
      SELECT COALESCE(SUM(c.total_spent), 0) as total
      FROM crm_clients c
      INNER JOIN (
        SELECT client_id, health_score
        FROM crm_client_health
        WHERE (client_id, calculated_at) IN (
          SELECT client_id, MAX(calculated_at)
          FROM crm_client_health
          GROUP BY client_id
        )
      ) h ON c.id = h.client_id
      WHERE h.health_score < 50 AND c.status = 'active'
    `).first();return t.json({success:!0,data:{timeSaved:{hoursThisWeek:Number(i.toFixed(1)),dollarValue:o,messagesProcessed:s,trend:"up"},clientHealth:{healthy:(l==null?void 0:l.healthy)||0,atRisk:(l==null?void 0:l.at_risk)||0,critical:(l==null?void 0:l.critical)||0},taskMetrics:{backlog:(c==null?void 0:c.backlog)||0,inProgress:(c==null?void 0:c.in_progress)||0,completedThisWeek:(c==null?void 0:c.completed_this_week)||0},revenueAtRisk:(u==null?void 0:u.total)||0}})}catch(r){return console.error("[CRM Analytics Dashboard] Error:",r),t.json({success:!1,error:r.message},500)}});w.get("/api/crm/analytics/patterns",async t=>{var r,n,a;try{const{DB_EDUCATION:s}=t.env,i=t.env.GENSPARK_API_KEY;if(!i)return t.json({success:!1,error:"GENSPARK_API_KEY not configured"},500);const o=t.req.query("timeframe")||"30d",l={"7d":7,"30d":30,"90d":90},c=new Date(Date.now()-l[o]*24*60*60*1e3).toISOString(),u=await s.prepare(`
      SELECT 
        m.client_id,
        m.message_type,
        m.urgency,
        m.sentiment,
        m.body as content,
        p.project_type
      FROM crm_messages m
      LEFT JOIN crm_projects p ON m.project_id = p.id
      WHERE m.created_at > ?
      ORDER BY m.created_at DESC
      LIMIT 200
    `).bind(c).all(),d=await s.prepare(`
      SELECT 
        title,
        estimated_effort as effort,
        actual_effort_hours,
        status,
        category as tags
      FROM crm_tasks
      WHERE created_at > ?
      LIMIT 100
    `).bind(c).all(),h=await s.prepare(`
      SELECT 
        c.id,
        c.name,
        c.status,
        c.total_spent as totalRevenue,
        h.health_score
      FROM crm_clients c
      LEFT JOIN (
        SELECT client_id, health_score
        FROM crm_client_health
        WHERE (client_id, calculated_at) IN (
          SELECT client_id, MAX(calculated_at)
          FROM crm_client_health
          GROUP BY client_id
        )
      ) h ON c.id = h.client_id
      WHERE c.status IN ('active', 'lead')
    `).all(),g=await hf({timeframe:o,allMessages:u.results||[],allTasks:d.results||[],allClients:h.results||[]},i);return t.json({success:!0,analysis:g,metadata:{timeframe:o,messagesAnalyzed:((r=u.results)==null?void 0:r.length)||0,tasksAnalyzed:((n=d.results)==null?void 0:n.length)||0,clientsAnalyzed:((a=h.results)==null?void 0:a.length)||0,generatedAt:new Date().toISOString()}})}catch(s){return console.error("[CRM Pattern Analysis] Error:",s),t.json({success:!1,error:s.message},500)}});const il=new Ds,Sf=Object.assign({"/src/index.tsx":w});let _c=!1;for(const[,t]of Object.entries(Sf))t&&(il.all("*",r=>{let n;try{n=r.executionCtx}catch{}return t.fetch(r.req.raw,r.env,n)}),il.notFound(r=>{let n;try{n=r.executionCtx}catch{}return t.fetch(r.req.raw,r.env,n)}),_c=!0);if(!_c)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");const Is=[{id:"mod-jan",quarter:1,month_number:1,month_name:"January",title:"Visual Foundations",subtitle:"Learning to See Like a Pro",description:"Transform from snapshot-taker to visual storyteller. Master the Rule of Thirds, leading lines, and perspective magic.",emoji:"📷",theme_color:"#4794A6",adventure_title:"My World, My Way",adventure_desc:"Create a stunning portfolio showcasing your unique perspective.",image_url:"/static/images/curriculum/january-vintage-camera.jpg",sort_order:1},{id:"mod-feb",quarter:1,month_number:2,month_name:"February",title:"Light Mastery",subtitle:"Becoming a Light Hunter",description:"Transform into a light detective who understands how illumination creates mood and drama.",emoji:"💡",theme_color:"#FFD700",adventure_title:"Chasing Light",adventure_desc:"Build an epic collection showing your mastery of different lighting conditions.",image_url:"/static/images/curriculum/february-beach-boardwalk.jpg",sort_order:2},{id:"mod-mar",quarter:1,month_number:3,month_name:"March",title:"Story Foundations",subtitle:"Every Image Tells a Tale",description:"Learn how the best photographers use sequences, emotion, and timing to craft visual narratives that resonate.",emoji:"📖",theme_color:"#9333EA",adventure_title:"My Epic Story",adventure_desc:"Create a multi-part photo series that takes viewers on an unforgettable journey.",image_url:"/static/images/curriculum/march-mountain-photographer.jpg",sort_order:3},{id:"mod-apr",quarter:2,month_number:4,month_name:"April",title:"Portrait Power",subtitle:"Capturing People & Personality",description:"Discover how to photograph people in authentic, compelling ways that reveal character and emotion.",emoji:"👤",theme_color:"#EC4899",adventure_title:"Faces & Stories",adventure_desc:"Build a portrait collection that celebrates the people in your world.",image_url:"/static/images/curriculum/april-mom-child-beach.jpg",sort_order:4},{id:"mod-may",quarter:2,month_number:5,month_name:"May",title:"Urban Exploration",subtitle:"City as Canvas",description:"Transform urban environments into visual playgrounds. Learn architecture, street scenes, and cityscape secrets.",emoji:"🏙️",theme_color:"#14B8A6",adventure_title:"Concrete Jungle",adventure_desc:"Create a stunning urban portfolio that reveals the hidden beauty of city life.",image_url:"/static/images/curriculum/may-chicago-skyline.jpg",sort_order:5},{id:"mod-jun",quarter:2,month_number:6,month_name:"June",title:"Nature Immersion",subtitle:"Wild World Photography",description:"Venture into natural environments to capture landscapes, wildlife, and the raw beauty of the outdoors.",emoji:"🌲",theme_color:"#22C55E",adventure_title:"Into the Wild",adventure_desc:"Build a nature portfolio showcasing the incredible diversity of the natural world.",image_url:null,sort_order:6},{id:"mod-jul",quarter:3,month_number:7,month_name:"July",title:"Action & Motion",subtitle:"Freezing the Moment",description:"Master the art of capturing movement—sports, dance, action scenes that tell dynamic visual stories.",emoji:"⚡",theme_color:"#F59E0B",adventure_title:"Motion Magic",adventure_desc:"Create an action portfolio that captures energy, speed, and the thrill of movement.",image_url:null,sort_order:7},{id:"mod-aug",quarter:3,month_number:8,month_name:"August",title:"Color Theory",subtitle:"Mastering Visual Harmony",description:"Dive deep into how color creates mood, emotion, and impact in visual storytelling.",emoji:"🎨",theme_color:"#8B5CF6",adventure_title:"Color Symphony",adventure_desc:"Build a vibrant portfolio demonstrating your command of color relationships and visual impact.",image_url:null,sort_order:8},{id:"mod-sep",quarter:3,month_number:9,month_name:"September",title:"Advanced Composition",subtitle:"Breaking the Rules",description:"Level up with advanced framing techniques, creative angles, and experimental approaches to visual design.",emoji:"🎬",theme_color:"#6366F1",adventure_title:"Visual Rebel",adventure_desc:"Create a portfolio that showcases your unique compositional voice and creative vision.",image_url:null,sort_order:9},{id:"mod-oct",quarter:4,month_number:10,month_name:"October",title:"Video Storytelling",subtitle:"From Stills to Motion",description:"Transition into video creation with editing, sequencing, and cinematic storytelling techniques.",emoji:"🎥",theme_color:"#EF4444",adventure_title:"Motion Pictures",adventure_desc:"Create your first short film showcasing your unique visual storytelling abilities.",image_url:"/static/images/curriculum/october-video-editing.jpg",sort_order:10},{id:"mod-nov",quarter:4,month_number:11,month_name:"November",title:"Portfolio Building",subtitle:"Showcasing Your Best Work",description:"Learn how to curate, edit, and present your work like a professional creator.",emoji:"📸",theme_color:"#10B981",adventure_title:"My Signature Collection",adventure_desc:"Build a professional portfolio that opens doors and showcases your creative journey.",image_url:"/static/images/curriculum/november-portfolio-dashboard.jpg",sort_order:11},{id:"mod-dec",quarter:4,month_number:12,month_name:"December",title:"Creator Summit",subtitle:"Your Signature Project",description:"Culminate your year with a major creative project that showcases everything you've learned.",emoji:"🏆",theme_color:"#3B82F6",adventure_title:"The Final Masterpiece",adventure_desc:"Create your ultimate visual project—your signature statement as a young creator.",image_url:null,sort_order:12}];function Ac(t,r){return parseInt(t.split("-")[1].substring(0,2)),[{week_number:1,week_type:"eye",title:"The Eye",subtitle:"Composition & Visual Design",emoji:"👁️"},{week_number:2,week_type:"light",title:"The Light",subtitle:"Timing & Atmosphere",emoji:"💡"},{week_number:3,week_type:"story",title:"The Story",subtitle:"Motion & Narrative",emoji:"📖"},{week_number:4,week_type:"share",title:"The Share",subtitle:"Editing & Presentation",emoji:"🎬"}].map((a,s)=>({id:`week-${t.split("-")[1]}-${a.week_number}`,module_id:t,week_number:a.week_number,week_type:a.week_type,title:a.title,subtitle:a.subtitle,emoji:a.emoji,sort_order:r+s}))}async function kf(t){let r=0,n=0;for(const s of Is)(await t.prepare(`
      INSERT OR IGNORE INTO curriculum_modules 
      (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_title, adventure_desc, image_url, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(s.id,s.quarter,s.month_number,s.month_name,s.title,s.subtitle,s.description,s.emoji,s.theme_color,s.adventure_title,s.adventure_desc,s.image_url,s.sort_order).run()).success&&r++;let a=1;for(const s of Is){const i=Ac(s.id,a);for(const o of i)(await t.prepare(`
        INSERT OR IGNORE INTO curriculum_weeks 
        (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(o.id,o.module_id,o.week_number,o.week_type,o.title,o.subtitle,o.emoji,o.sort_order).run()).success&&n++;a+=4}return{modules:r,weeks:n}}const Pf=Object.freeze(Object.defineProperty({__proto__:null,CURRICULUM_MODULES:Is,generateWeeks:Ac,seedCurriculum:kf},Symbol.toStringTag,{value:"Module"}));function _f(t){let r=0;for(let n=0;n<t.length;n++){const a=t.charCodeAt(n);r=(r<<5)-r+a,r=r&r}return r.toString(36)}const Cc=[{email:"italo@acromatico.com",password:"admin123",firstName:"Italo",lastName:"Campilii",role:"admin"}];async function Af(t){let r=0;for(const n of Cc){if(await t.prepare("SELECT id FROM users WHERE email = ?").bind(n.email).first()){console.log(`User ${n.email} already exists, skipping...`);continue}const s=_f(n.password),i=crypto.randomUUID().replace(/-/g,"");(await t.prepare(`
      INSERT INTO users (id, email, password_hash, first_name, last_name, role, created_at)
      VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(i,n.email,s,n.firstName,n.lastName,n.role).run()).success&&(r++,console.log(`✅ Created admin user: ${n.email}`))}return{users:r}}const Cf=Object.freeze(Object.defineProperty({__proto__:null,DEFAULT_ADMIN_USERS:Cc,seedAdminUsers:Af},Symbol.toStringTag,{value:"Module"}));async function If(t){return(await t.prepare(`
    SELECT 
      m.*,
      COUNT(w.id) as week_count
    FROM curriculum_modules m
    LEFT JOIN curriculum_weeks w ON m.id = w.module_id
    GROUP BY m.id
    ORDER BY m.sort_order
  `).all()).results}async function Of(t,r){const n=await t.prepare(`
    SELECT * FROM curriculum_modules WHERE id = ?
  `).bind(r).first();if(!n)throw new Error("Module not found");const a=await t.prepare(`
    SELECT * FROM curriculum_weeks 
    WHERE module_id = ? 
    ORDER BY sort_order
  `).bind(r).all(),s=await t.prepare(`
    SELECT * FROM curriculum_lessons 
    WHERE module_id = ? 
    ORDER BY week_id, sort_order
  `).bind(r).all();return{module:n,weeks:a.results,lessons:s.results}}async function Mf(t,r){const n=`lesson-${Date.now()}-${Math.random().toString(36).substr(2,9)}`;return await t.prepare(`
    INSERT INTO curriculum_lessons 
    (id, module_id, week_id, lesson_type, title, duration_min, video_url, pdf_url, thumbnail_url, description, sort_order, upload_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(n,r.module_id,r.week_id,r.lesson_type,r.title,r.duration_min,r.video_url,r.pdf_url,r.thumbnail_url,r.description,r.sort_order,r.upload_status).run(),n}async function Rf(t,r,n){const a=[],s=[];if(n.title!==void 0&&(a.push("title = ?"),s.push(n.title)),n.video_url!==void 0&&(a.push("video_url = ?"),s.push(n.video_url)),n.pdf_url!==void 0&&(a.push("pdf_url = ?"),s.push(n.pdf_url)),n.thumbnail_url!==void 0&&(a.push("thumbnail_url = ?"),s.push(n.thumbnail_url)),n.description!==void 0&&(a.push("description = ?"),s.push(n.description)),n.duration_min!==void 0&&(a.push("duration_min = ?"),s.push(n.duration_min)),n.upload_status!==void 0&&(a.push("upload_status = ?"),s.push(n.upload_status)),a.length===0)throw new Error("No fields to update");s.push(r),await t.prepare(`
    UPDATE curriculum_lessons 
    SET ${a.join(", ")}
    WHERE id = ?
  `).bind(...s).run()}async function Nf(t,r){await t.prepare(`
    DELETE FROM curriculum_lessons WHERE id = ?
  `).bind(r).run()}async function Bf(t){return await t.prepare(`
    SELECT 
      COUNT(DISTINCT m.id) as total_modules,
      COUNT(DISTINCT w.id) as total_weeks,
      COUNT(l.id) as total_lessons,
      SUM(CASE WHEN l.upload_status = 'uploaded' THEN 1 ELSE 0 END) as uploaded_lessons,
      SUM(CASE WHEN l.upload_status = 'awaiting' THEN 1 ELSE 0 END) as awaiting_lessons
    FROM curriculum_modules m
    LEFT JOIN curriculum_weeks w ON m.id = w.module_id
    LEFT JOIN curriculum_lessons l ON m.id = l.module_id
  `).first()}const ir=Object.freeze(Object.defineProperty({__proto__:null,createLessonPlaceholder:Mf,deleteLesson:Nf,getAllModules:If,getCurriculumStats:Bf,getModuleDetail:Of,updateLesson:Rf},Symbol.toStringTag,{value:"Module"}));export{il as default};
