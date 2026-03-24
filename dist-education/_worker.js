var kd=Object.defineProperty;var si=t=>{throw TypeError(t)};var _d=(t,r,n)=>r in t?kd(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n;var B=(t,r,n)=>_d(t,typeof r!="symbol"?r+"":r,n),Zn=(t,r,n)=>r.has(t)||si("Cannot "+n);var S=(t,r,n)=>(Zn(t,r,"read from private field"),n?n.call(t):r.get(t)),z=(t,r,n)=>r.has(t)?si("Cannot add the same private member more than once"):r instanceof WeakSet?r.add(t):r.set(t,n),N=(t,r,n,a)=>(Zn(t,r,"write to private field"),a?a.call(t,n):r.set(t,n),n),W=(t,r,n)=>(Zn(t,r,"access private method"),n);var ii=(t,r,n,a)=>({set _(s){N(t,r,s,n)},get _(){return S(t,r,a)}});var dl={Stringify:1},Pe=(t,r)=>{const n=new String(t);return n.isEscaped=!0,n.callbacks=r,n},Ad=/[&<>'"]/,cl=async(t,r)=>{let n="";r||(r=[]);const a=await Promise.all(t);for(let s=a.length-1;n+=a[s],s--,!(s<0);s--){let i=a[s];typeof i=="object"&&r.push(...i.callbacks||[]);const o=i.isEscaped;if(i=await(typeof i=="object"?i.toString():i),typeof i=="object"&&r.push(...i.callbacks||[]),i.isEscaped??o)n+=i;else{const l=[n];lt(i,l),n=l[0]}}return Pe(n,r)},lt=(t,r)=>{const n=t.search(Ad);if(n===-1){r[0]+=t;return}let a,s,i=0;for(s=n;s<t.length;s++){switch(t.charCodeAt(s)){case 34:a="&quot;";break;case 39:a="&#39;";break;case 38:a="&amp;";break;case 60:a="&lt;";break;case 62:a="&gt;";break;default:continue}r[0]+=t.substring(i,s)+a,i=s+1}r[0]+=t.substring(i,s)},hl=t=>{const r=t.callbacks;if(!(r!=null&&r.length))return t;const n=[t],a={};return r.forEach(s=>s({phase:dl.Stringify,buffer:n,context:a})),n[0]},ul=async(t,r,n,a,s)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const i=t.callbacks;return i!=null&&i.length?(s?s[0]+=t:s=[t],Promise.all(i.map(l=>l({phase:r,buffer:s,context:a}))).then(l=>Promise.all(l.filter(Boolean).map(d=>ul(d,r,!1,a,s))).then(()=>s[0]))):Promise.resolve(t)},Cd=(t,...r)=>{const n=[""];for(let a=0,s=t.length-1;a<s;a++){n[0]+=t[a];const i=Array.isArray(r[a])?r[a].flat(1/0):[r[a]];for(let o=0,l=i.length;o<l;o++){const d=i[o];if(typeof d=="string")lt(d,n);else if(typeof d=="number")n[0]+=d;else{if(typeof d=="boolean"||d===null||d===void 0)continue;if(typeof d=="object"&&d.isEscaped)if(d.callbacks)n.unshift("",d);else{const h=d.toString();h instanceof Promise?n.unshift("",h):n[0]+=h}else d instanceof Promise?n.unshift("",d):lt(d.toString(),n)}}}return n[0]+=t.at(-1),n.length===1?"callbacks"in n?Pe(hl(Pe(n[0],n.callbacks))):Pe(n[0]):cl(n,n.callbacks)},As=Symbol("RENDERER"),vs=Symbol("ERROR_HANDLER"),ee=Symbol("STASH"),pl=Symbol("INTERNAL"),Id=Symbol("MEMO"),Mn=Symbol("PERMALINK"),oi=t=>(t[pl]=!0,t),ml=t=>({value:r,children:n})=>{if(!n)return;const a={children:[{tag:oi(()=>{t.push(r)}),props:{}}]};Array.isArray(n)?a.children.push(...n.flat()):a.children.push(n),a.children.push({tag:oi(()=>{t.pop()}),props:{}});const s={tag:"",props:a,type:""};return s[vs]=i=>{throw t.pop(),i},s},gl=t=>{const r=[t],n=ml(r);return n.values=r,n.Provider=n,er.push(n),n},er=[],Cs=t=>{const r=[t],n=(a=>{r.push(a.value);let s;try{s=a.children?(Array.isArray(a.children)?new xl("",{},a.children):a.children).toString():""}finally{r.pop()}return s instanceof Promise?s.then(i=>Pe(i,i.callbacks)):Pe(s)});return n.values=r,n.Provider=n,n[As]=ml(r),er.push(n),n},rr=t=>t.values.at(-1),Sn={title:[],script:["src"],style:["data-href"],link:["href"],meta:["name","httpEquiv","charset","itemProp"]},xs={},Pn="data-precedence",Gr=t=>Array.isArray(t)?t:[t],li=new WeakMap,di=(t,r,n,a)=>({buffer:s,context:i})=>{if(!s)return;const o=li.get(i)||{};li.set(i,o);const l=o[t]||(o[t]=[]);let d=!1;const h=Sn[t];if(h.length>0){e:for(const[,c]of l)for(const p of h)if(((c==null?void 0:c[p])??null)===(n==null?void 0:n[p])){d=!0;break e}}if(d?s[0]=s[0].replaceAll(r,""):h.length>0?l.push([r,n,a]):l.unshift([r,n,a]),s[0].indexOf("</head>")!==-1){let c;if(a===void 0)c=l.map(([p])=>p);else{const p=[];c=l.map(([f,,v])=>{let m=p.indexOf(v);return m===-1&&(p.push(v),m=p.length-1),[f,m]}).sort((f,v)=>f[1]-v[1]).map(([f])=>f)}c.forEach(p=>{s[0]=s[0].replaceAll(p,"")}),s[0]=s[0].replace(/(?=<\/head>)/,c.join(""))}},Wr=(t,r,n)=>Pe(new Oe(t,n,Gr(r??[])).toString()),Ur=(t,r,n,a)=>{if("itemProp"in n)return Wr(t,r,n);let{precedence:s,blocking:i,...o}=n;s=a?s??"":void 0,a&&(o[Pn]=s);const l=new Oe(t,o,Gr(r||[])).toString();return l instanceof Promise?l.then(d=>Pe(l,[...d.callbacks||[],di(t,d,o,s)])):Pe(l,[di(t,l,o,s)])},Od=({children:t,...r})=>{const n=Is();if(n){const a=rr(n);if(a==="svg"||a==="head")return new Oe("title",r,Gr(t??[]))}return Ur("title",t,r,!1)},Md=({children:t,...r})=>{const n=Is();return["src","async"].some(a=>!r[a])||n&&rr(n)==="head"?Wr("script",t,r):Ur("script",t,r,!1)},Rd=({children:t,...r})=>["href","precedence"].every(n=>n in r)?(r["data-href"]=r.href,delete r.href,Ur("style",t,r,!0)):Wr("style",t,r),Dd=({children:t,...r})=>["onLoad","onError"].some(n=>n in r)||r.rel==="stylesheet"&&(!("precedence"in r)||"disabled"in r)?Wr("link",t,r):Ur("link",t,r,"precedence"in r),Bd=({children:t,...r})=>{const n=Is();return n&&rr(n)==="head"?Wr("meta",t,r):Ur("meta",t,r,!1)},fl=(t,{children:r,...n})=>new Oe(t,n,Gr(r??[])),Nd=t=>(typeof t.action=="function"&&(t.action=Mn in t.action?t.action[Mn]:void 0),fl("form",t)),yl=(t,r)=>(typeof r.formAction=="function"&&(r.formAction=Mn in r.formAction?r.formAction[Mn]:void 0),fl(t,r)),Ld=t=>yl("input",t),jd=t=>yl("button",t);const ea=Object.freeze(Object.defineProperty({__proto__:null,button:jd,form:Nd,input:Ld,link:Dd,meta:Bd,script:Md,style:Rd,title:Od},Symbol.toStringTag,{value:"Module"}));var Fd=new Map([["className","class"],["htmlFor","for"],["crossOrigin","crossorigin"],["httpEquiv","http-equiv"],["itemProp","itemprop"],["fetchPriority","fetchpriority"],["noModule","nomodule"],["formAction","formaction"]]),Rn=t=>Fd.get(t)||t,vl=(t,r)=>{for(const[n,a]of Object.entries(t)){const s=n[0]==="-"||!/[A-Z]/.test(n)?n:n.replace(/[A-Z]/g,i=>`-${i.toLowerCase()}`);r(s,a==null?null:typeof a=="number"?s.match(/^(?:a|border-im|column(?:-c|s)|flex(?:$|-[^b])|grid-(?:ar|[^a])|font-w|li|or|sca|st|ta|wido|z)|ty$/)?`${a}`:`${a}px`:a)}},Dr=void 0,Is=()=>Dr,zd=t=>/[A-Z]/.test(t)&&t.match(/^(?:al|basel|clip(?:Path|Rule)$|co|do|fill|fl|fo|gl|let|lig|i|marker[EMS]|o|pai|pointe|sh|st[or]|text[^L]|tr|u|ve|w)/)?t.replace(/([A-Z])/g,"-$1").toLowerCase():t,$d=["area","base","br","col","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],qd=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","defer","disabled","download","formnovalidate","hidden","inert","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"],Os=(t,r)=>{for(let n=0,a=t.length;n<a;n++){const s=t[n];if(typeof s=="string")lt(s,r);else{if(typeof s=="boolean"||s===null||s===void 0)continue;s instanceof Oe?s.toStringToBuffer(r):typeof s=="number"||s.isEscaped?r[0]+=s:s instanceof Promise?r.unshift("",s):Os(s,r)}}},Oe=class{constructor(t,r,n){B(this,"tag");B(this,"props");B(this,"key");B(this,"children");B(this,"isEscaped",!0);B(this,"localContexts");this.tag=t,this.props=r,this.children=n}get type(){return this.tag}get ref(){return this.props.ref||null}toString(){var r,n;const t=[""];(r=this.localContexts)==null||r.forEach(([a,s])=>{a.values.push(s)});try{this.toStringToBuffer(t)}finally{(n=this.localContexts)==null||n.forEach(([a])=>{a.values.pop()})}return t.length===1?"callbacks"in t?hl(Pe(t[0],t.callbacks)).toString():t[0]:cl(t,t.callbacks)}toStringToBuffer(t){const r=this.tag,n=this.props;let{children:a}=this;t[0]+=`<${r}`;const s=Dr&&rr(Dr)==="svg"?i=>zd(Rn(i)):i=>Rn(i);for(let[i,o]of Object.entries(n))if(i=s(i),i!=="children"){if(i==="style"&&typeof o=="object"){let l="";vl(o,(d,h)=>{h!=null&&(l+=`${l?";":""}${d}:${h}`)}),t[0]+=' style="',lt(l,t),t[0]+='"'}else if(typeof o=="string")t[0]+=` ${i}="`,lt(o,t),t[0]+='"';else if(o!=null)if(typeof o=="number"||o.isEscaped)t[0]+=` ${i}="${o}"`;else if(typeof o=="boolean"&&qd.includes(i))o&&(t[0]+=` ${i}=""`);else if(i==="dangerouslySetInnerHTML"){if(a.length>0)throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");a=[Pe(o.__html)]}else if(o instanceof Promise)t[0]+=` ${i}="`,t.unshift('"',o);else if(typeof o=="function"){if(!i.startsWith("on")&&i!=="ref")throw new Error(`Invalid prop '${i}' of type 'function' supplied to '${r}'.`)}else t[0]+=` ${i}="`,lt(o.toString(),t),t[0]+='"'}if($d.includes(r)&&a.length===0){t[0]+="/>";return}t[0]+=">",Os(a,t),t[0]+=`</${r}>`}},ta=class extends Oe{toStringToBuffer(t){const{children:r}=this,n={...this.props};r.length&&(n.children=r.length===1?r[0]:r);const a=this.tag.call(null,n);if(!(typeof a=="boolean"||a==null))if(a instanceof Promise)if(er.length===0)t.unshift("",a);else{const s=er.map(i=>[i,i.values.at(-1)]);t.unshift("",a.then(i=>(i instanceof Oe&&(i.localContexts=s),i)))}else a instanceof Oe?a.toStringToBuffer(t):typeof a=="number"||a.isEscaped?(t[0]+=a,a.callbacks&&(t.callbacks||(t.callbacks=[]),t.callbacks.push(...a.callbacks))):lt(a,t)}},xl=class extends Oe{toStringToBuffer(t){Os(this.children,t)}},ci=(t,r,...n)=>{r??(r={}),n.length&&(r.children=n.length===1?n[0]:n);const a=r.key;delete r.key;const s=kn(t,r,n);return s.key=a,s},hi=!1,kn=(t,r,n)=>{if(!hi){for(const a in xs)ea[a][As]=xs[a];hi=!0}return typeof t=="function"?new ta(t,r,n):ea[t]?new ta(ea[t],r,n):t==="svg"||t==="head"?(Dr||(Dr=Cs("")),new Oe(t,r,[new ta(Dr,{value:t},n)])):new Oe(t,r,n)},Gd=({children:t})=>new xl("",{children:t},Array.isArray(t)?t:t?[t]:[]);function e(t,r,n){let a;if(!r||!("children"in r))a=kn(t,r,[]);else{const s=r.children;a=Array.isArray(s)?kn(t,r,s):kn(t,r,[s])}return a.key=n,a}var ui=(t,r,n)=>(a,s)=>{let i=-1;return o(0);async function o(l){if(l<=i)throw new Error("next() called multiple times");i=l;let d,h=!1,c;if(t[l]?(c=t[l][0][0],a.req.routeIndex=l):c=l===t.length&&s||void 0,c)try{d=await c(a,()=>o(l+1))}catch(p){if(p instanceof Error&&r)a.error=p,d=await r(p,a),h=!0;else throw p}else a.finalized===!1&&n&&(d=await n(a));return d&&(a.finalized===!1||h)&&(a.res=d),a}},Wd=Symbol(),Ud=async(t,r=Object.create(null))=>{const{all:n=!1,dot:a=!1}=r,i=(t instanceof Pl?t.raw.headers:t.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?Hd(t,{all:n,dot:a}):{}};async function Hd(t,r){const n=await t.formData();return n?Yd(n,r):{}}function Yd(t,r){const n=Object.create(null);return t.forEach((a,s)=>{r.all||s.endsWith("[]")?Vd(n,s,a):n[s]=a}),r.dot&&Object.entries(n).forEach(([a,s])=>{a.includes(".")&&(Kd(n,a,s),delete n[a])}),n}var Vd=(t,r,n)=>{t[r]!==void 0?Array.isArray(t[r])?t[r].push(n):t[r]=[t[r],n]:r.endsWith("[]")?t[r]=[n]:t[r]=n},Kd=(t,r,n)=>{let a=t;const s=r.split(".");s.forEach((i,o)=>{o===s.length-1?a[i]=n:((!a[i]||typeof a[i]!="object"||Array.isArray(a[i])||a[i]instanceof File)&&(a[i]=Object.create(null)),a=a[i])})},bl=t=>{const r=t.split("/");return r[0]===""&&r.shift(),r},Jd=t=>{const{groups:r,path:n}=Qd(t),a=bl(n);return Xd(a,r)},Qd=t=>{const r=[];return t=t.replace(/\{[^}]+\}/g,(n,a)=>{const s=`@${a}`;return r.push([s,n]),s}),{groups:r,path:t}},Xd=(t,r)=>{for(let n=r.length-1;n>=0;n--){const[a]=r[n];for(let s=t.length-1;s>=0;s--)if(t[s].includes(a)){t[s]=t[s].replace(a,r[n][1]);break}}return t},Jr={},Zd=(t,r)=>{if(t==="*")return"*";const n=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){const a=`${t}#${r}`;return Jr[a]||(n[2]?Jr[a]=r&&r[0]!==":"&&r[0]!=="*"?[a,n[1],new RegExp(`^${n[2]}(?=/${r})`)]:[t,n[1],new RegExp(`^${n[2]}$`)]:Jr[a]=[t,n[1],!0]),Jr[a]}return null},Ms=(t,r)=>{try{return r(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,n=>{try{return r(n)}catch{return n}})}},ec=t=>Ms(t,decodeURI),wl=t=>{const r=t.url,n=r.indexOf("/",r.indexOf(":")+4);let a=n;for(;a<r.length;a++){const s=r.charCodeAt(a);if(s===37){const i=r.indexOf("?",a),o=r.slice(n,i===-1?void 0:i);return ec(o.includes("%25")?o.replace(/%25/g,"%2525"):o)}else if(s===63)break}return r.slice(n,a)},tc=t=>{const r=wl(t);return r.length>1&&r.at(-1)==="/"?r.slice(0,-1):r},Wt=(t,r,...n)=>(n.length&&(r=Wt(r,...n)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${r==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(r==null?void 0:r[0])==="/"?r.slice(1):r}`}`),El=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const r=t.split("/"),n=[];let a="";return r.forEach(s=>{if(s!==""&&!/\:/.test(s))a+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){n.length===0&&a===""?n.push("/"):n.push(a);const i=s.replace("?","");a+="/"+i,n.push(a)}else a+="/"+s}),n.filter((s,i,o)=>o.indexOf(s)===i)},ra=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?Ms(t,Sl):t):t,Tl=(t,r,n)=>{let a;if(!n&&r&&!/[%+]/.test(r)){let o=t.indexOf("?",8);if(o===-1)return;for(t.startsWith(r,o+1)||(o=t.indexOf(`&${r}`,o+1));o!==-1;){const l=t.charCodeAt(o+r.length+1);if(l===61){const d=o+r.length+2,h=t.indexOf("&",d);return ra(t.slice(d,h===-1?void 0:h))}else if(l==38||isNaN(l))return"";o=t.indexOf(`&${r}`,o+1)}if(a=/[%+]/.test(t),!a)return}const s={};a??(a=/[%+]/.test(t));let i=t.indexOf("?",8);for(;i!==-1;){const o=t.indexOf("&",i+1);let l=t.indexOf("=",i);l>o&&o!==-1&&(l=-1);let d=t.slice(i+1,l===-1?o===-1?void 0:o:l);if(a&&(d=ra(d)),i=o,d==="")continue;let h;l===-1?h="":(h=t.slice(l+1,o===-1?void 0:o),a&&(h=ra(h))),n?(s[d]&&Array.isArray(s[d])||(s[d]=[]),s[d].push(h)):s[d]??(s[d]=h)}return r?s[r]:s},rc=Tl,nc=(t,r)=>Tl(t,r,!0),Sl=decodeURIComponent,pi=t=>Ms(t,Sl),Yt,Te,qe,kl,_l,bs,rt,nl,Pl=(nl=class{constructor(t,r="/",n=[[]]){z(this,qe);B(this,"raw");z(this,Yt);z(this,Te);B(this,"routeIndex",0);B(this,"path");B(this,"bodyCache",{});z(this,rt,t=>{const{bodyCache:r,raw:n}=this,a=r[t];if(a)return a;const s=Object.keys(r)[0];return s?r[s].then(i=>(s==="json"&&(i=JSON.stringify(i)),new Response(i)[t]())):r[t]=n[t]()});this.raw=t,this.path=r,N(this,Te,n),N(this,Yt,{})}param(t){return t?W(this,qe,kl).call(this,t):W(this,qe,_l).call(this)}query(t){return rc(this.url,t)}queries(t){return nc(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const r={};return this.raw.headers.forEach((n,a)=>{r[a]=n}),r}async parseBody(t){var r;return(r=this.bodyCache).parsedBody??(r.parsedBody=await Ud(this,t))}json(){return S(this,rt).call(this,"text").then(t=>JSON.parse(t))}text(){return S(this,rt).call(this,"text")}arrayBuffer(){return S(this,rt).call(this,"arrayBuffer")}blob(){return S(this,rt).call(this,"blob")}formData(){return S(this,rt).call(this,"formData")}addValidatedData(t,r){S(this,Yt)[t]=r}valid(t){return S(this,Yt)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[Wd](){return S(this,Te)}get matchedRoutes(){return S(this,Te)[0].map(([[,t]])=>t)}get routePath(){return S(this,Te)[0].map(([[,t]])=>t)[this.routeIndex].path}},Yt=new WeakMap,Te=new WeakMap,qe=new WeakSet,kl=function(t){const r=S(this,Te)[0][this.routeIndex][1][t],n=W(this,qe,bs).call(this,r);return n&&/\%/.test(n)?pi(n):n},_l=function(){const t={},r=Object.keys(S(this,Te)[0][this.routeIndex][1]);for(const n of r){const a=W(this,qe,bs).call(this,S(this,Te)[0][this.routeIndex][1][n]);a!==void 0&&(t[n]=/\%/.test(a)?pi(a):a)}return t},bs=function(t){return S(this,Te)[1]?S(this,Te)[1][t]:t},rt=new WeakMap,nl),ac="text/plain; charset=UTF-8",na=(t,r)=>({"Content-Type":t,...r}),Lr,jr,je,Vt,Fe,ge,Fr,Kt,Jt,xt,zr,$r,nt,Ut,al,sc=(al=class{constructor(t,r){z(this,nt);z(this,Lr);z(this,jr);B(this,"env",{});z(this,je);B(this,"finalized",!1);B(this,"error");z(this,Vt);z(this,Fe);z(this,ge);z(this,Fr);z(this,Kt);z(this,Jt);z(this,xt);z(this,zr);z(this,$r);B(this,"render",(...t)=>(S(this,Kt)??N(this,Kt,r=>this.html(r)),S(this,Kt).call(this,...t)));B(this,"setLayout",t=>N(this,Fr,t));B(this,"getLayout",()=>S(this,Fr));B(this,"setRenderer",t=>{N(this,Kt,t)});B(this,"header",(t,r,n)=>{this.finalized&&N(this,ge,new Response(S(this,ge).body,S(this,ge)));const a=S(this,ge)?S(this,ge).headers:S(this,xt)??N(this,xt,new Headers);r===void 0?a.delete(t):n!=null&&n.append?a.append(t,r):a.set(t,r)});B(this,"status",t=>{N(this,Vt,t)});B(this,"set",(t,r)=>{S(this,je)??N(this,je,new Map),S(this,je).set(t,r)});B(this,"get",t=>S(this,je)?S(this,je).get(t):void 0);B(this,"newResponse",(...t)=>W(this,nt,Ut).call(this,...t));B(this,"body",(t,r,n)=>W(this,nt,Ut).call(this,t,r,n));B(this,"text",(t,r,n)=>!S(this,xt)&&!S(this,Vt)&&!r&&!n&&!this.finalized?new Response(t):W(this,nt,Ut).call(this,t,r,na(ac,n)));B(this,"json",(t,r,n)=>W(this,nt,Ut).call(this,JSON.stringify(t),r,na("application/json",n)));B(this,"html",(t,r,n)=>{const a=s=>W(this,nt,Ut).call(this,s,r,na("text/html; charset=UTF-8",n));return typeof t=="object"?ul(t,dl.Stringify,!1,{}).then(a):a(t)});B(this,"redirect",(t,r)=>{const n=String(t);return this.header("Location",/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,r??302)});B(this,"notFound",()=>(S(this,Jt)??N(this,Jt,()=>new Response),S(this,Jt).call(this,this)));N(this,Lr,t),r&&(N(this,Fe,r.executionCtx),this.env=r.env,N(this,Jt,r.notFoundHandler),N(this,$r,r.path),N(this,zr,r.matchResult))}get req(){return S(this,jr)??N(this,jr,new Pl(S(this,Lr),S(this,$r),S(this,zr))),S(this,jr)}get event(){if(S(this,Fe)&&"respondWith"in S(this,Fe))return S(this,Fe);throw Error("This context has no FetchEvent")}get executionCtx(){if(S(this,Fe))return S(this,Fe);throw Error("This context has no ExecutionContext")}get res(){return S(this,ge)||N(this,ge,new Response(null,{headers:S(this,xt)??N(this,xt,new Headers)}))}set res(t){if(S(this,ge)&&t){t=new Response(t.body,t);for(const[r,n]of S(this,ge).headers.entries())if(r!=="content-type")if(r==="set-cookie"){const a=S(this,ge).headers.getSetCookie();t.headers.delete("set-cookie");for(const s of a)t.headers.append("set-cookie",s)}else t.headers.set(r,n)}N(this,ge,t),this.finalized=!0}get var(){return S(this,je)?Object.fromEntries(S(this,je)):{}}},Lr=new WeakMap,jr=new WeakMap,je=new WeakMap,Vt=new WeakMap,Fe=new WeakMap,ge=new WeakMap,Fr=new WeakMap,Kt=new WeakMap,Jt=new WeakMap,xt=new WeakMap,zr=new WeakMap,$r=new WeakMap,nt=new WeakSet,Ut=function(t,r,n){const a=S(this,ge)?new Headers(S(this,ge).headers):S(this,xt)??new Headers;if(typeof r=="object"&&"headers"in r){const i=r.headers instanceof Headers?r.headers:new Headers(r.headers);for(const[o,l]of i)o.toLowerCase()==="set-cookie"?a.append(o,l):a.set(o,l)}if(n)for(const[i,o]of Object.entries(n))if(typeof o=="string")a.set(i,o);else{a.delete(i);for(const l of o)a.append(i,l)}const s=typeof r=="number"?r:(r==null?void 0:r.status)??S(this,Vt);return new Response(t,{status:s,headers:a})},al),ae="ALL",ic="all",oc=["get","post","put","delete","options","patch"],Al="Can not add a route since the matcher is already built.",Cl=class extends Error{},lc="__COMPOSED_HANDLER",dc=t=>t.text("404 Not Found",404),mi=(t,r)=>{if("getResponse"in t){const n=t.getResponse();return r.newResponse(n.body,n)}return console.error(t),r.text("Internal Server Error",500)},Ae,se,Il,Ce,ft,_n,An,Qt,cc=(Qt=class{constructor(r={}){z(this,se);B(this,"get");B(this,"post");B(this,"put");B(this,"delete");B(this,"options");B(this,"patch");B(this,"all");B(this,"on");B(this,"use");B(this,"router");B(this,"getPath");B(this,"_basePath","/");z(this,Ae,"/");B(this,"routes",[]);z(this,Ce,dc);B(this,"errorHandler",mi);B(this,"onError",r=>(this.errorHandler=r,this));B(this,"notFound",r=>(N(this,Ce,r),this));B(this,"fetch",(r,...n)=>W(this,se,An).call(this,r,n[1],n[0],r.method));B(this,"request",(r,n,a,s)=>r instanceof Request?this.fetch(n?new Request(r,n):r,a,s):(r=r.toString(),this.fetch(new Request(/^https?:\/\//.test(r)?r:`http://localhost${Wt("/",r)}`,n),a,s)));B(this,"fire",()=>{addEventListener("fetch",r=>{r.respondWith(W(this,se,An).call(this,r.request,r,void 0,r.request.method))})});[...oc,ic].forEach(i=>{this[i]=(o,...l)=>(typeof o=="string"?N(this,Ae,o):W(this,se,ft).call(this,i,S(this,Ae),o),l.forEach(d=>{W(this,se,ft).call(this,i,S(this,Ae),d)}),this)}),this.on=(i,o,...l)=>{for(const d of[o].flat()){N(this,Ae,d);for(const h of[i].flat())l.map(c=>{W(this,se,ft).call(this,h.toUpperCase(),S(this,Ae),c)})}return this},this.use=(i,...o)=>(typeof i=="string"?N(this,Ae,i):(N(this,Ae,"*"),o.unshift(i)),o.forEach(l=>{W(this,se,ft).call(this,ae,S(this,Ae),l)}),this);const{strict:a,...s}=r;Object.assign(this,s),this.getPath=a??!0?r.getPath??wl:tc}route(r,n){const a=this.basePath(r);return n.routes.map(s=>{var o;let i;n.errorHandler===mi?i=s.handler:(i=async(l,d)=>(await ui([],n.errorHandler)(l,()=>s.handler(l,d))).res,i[lc]=s.handler),W(o=a,se,ft).call(o,s.method,s.path,i)}),this}basePath(r){const n=W(this,se,Il).call(this);return n._basePath=Wt(this._basePath,r),n}mount(r,n,a){let s,i;a&&(typeof a=="function"?i=a:(i=a.optionHandler,a.replaceRequest===!1?s=d=>d:s=a.replaceRequest));const o=i?d=>{const h=i(d);return Array.isArray(h)?h:[h]}:d=>{let h;try{h=d.executionCtx}catch{}return[d.env,h]};s||(s=(()=>{const d=Wt(this._basePath,r),h=d==="/"?0:d.length;return c=>{const p=new URL(c.url);return p.pathname=p.pathname.slice(h)||"/",new Request(p,c)}})());const l=async(d,h)=>{const c=await n(s(d.req.raw),...o(d));if(c)return c;await h()};return W(this,se,ft).call(this,ae,Wt(r,"*"),l),this}},Ae=new WeakMap,se=new WeakSet,Il=function(){const r=new Qt({router:this.router,getPath:this.getPath});return r.errorHandler=this.errorHandler,N(r,Ce,S(this,Ce)),r.routes=this.routes,r},Ce=new WeakMap,ft=function(r,n,a){r=r.toUpperCase(),n=Wt(this._basePath,n);const s={basePath:this._basePath,path:n,method:r,handler:a};this.router.add(r,n,[a,s]),this.routes.push(s)},_n=function(r,n){if(r instanceof Error)return this.errorHandler(r,n);throw r},An=function(r,n,a,s){if(s==="HEAD")return(async()=>new Response(null,await W(this,se,An).call(this,r,n,a,"GET")))();const i=this.getPath(r,{env:a}),o=this.router.match(s,i),l=new sc(r,{path:i,matchResult:o,env:a,executionCtx:n,notFoundHandler:S(this,Ce)});if(o[0].length===1){let h;try{h=o[0][0][0][0](l,async()=>{l.res=await S(this,Ce).call(this,l)})}catch(c){return W(this,se,_n).call(this,c,l)}return h instanceof Promise?h.then(c=>c||(l.finalized?l.res:S(this,Ce).call(this,l))).catch(c=>W(this,se,_n).call(this,c,l)):h??S(this,Ce).call(this,l)}const d=ui(o[0],this.errorHandler,S(this,Ce));return(async()=>{try{const h=await d(l);if(!h.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return h.res}catch(h){return W(this,se,_n).call(this,h,l)}})()},Qt),Ol=[];function hc(t,r){const n=this.buildAllMatchers(),a=((s,i)=>{const o=n[s]||n[ae],l=o[2][i];if(l)return l;const d=i.match(o[0]);if(!d)return[[],Ol];const h=d.indexOf("",1);return[o[1][h],d]});return this.match=a,a(t,r)}var Dn="[^/]+",Or=".*",Mr="(?:|/.*)",Ht=Symbol(),uc=new Set(".\\+*[^]$()");function pc(t,r){return t.length===1?r.length===1?t<r?-1:1:-1:r.length===1||t===Or||t===Mr?1:r===Or||r===Mr?-1:t===Dn?1:r===Dn?-1:t.length===r.length?t<r?-1:1:r.length-t.length}var bt,wt,Ie,St,mc=(St=class{constructor(){z(this,bt);z(this,wt);z(this,Ie,Object.create(null))}insert(r,n,a,s,i){if(r.length===0){if(S(this,bt)!==void 0)throw Ht;if(i)return;N(this,bt,n);return}const[o,...l]=r,d=o==="*"?l.length===0?["","",Or]:["","",Dn]:o==="/*"?["","",Mr]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let h;if(d){const c=d[1];let p=d[2]||Dn;if(c&&d[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw Ht;if(h=S(this,Ie)[p],!h){if(Object.keys(S(this,Ie)).some(f=>f!==Or&&f!==Mr))throw Ht;if(i)return;h=S(this,Ie)[p]=new St,c!==""&&N(h,wt,s.varIndex++)}!i&&c!==""&&a.push([c,S(h,wt)])}else if(h=S(this,Ie)[o],!h){if(Object.keys(S(this,Ie)).some(c=>c.length>1&&c!==Or&&c!==Mr))throw Ht;if(i)return;h=S(this,Ie)[o]=new St}h.insert(l,n,a,s,i)}buildRegExpStr(){const n=Object.keys(S(this,Ie)).sort(pc).map(a=>{const s=S(this,Ie)[a];return(typeof S(s,wt)=="number"?`(${a})@${S(s,wt)}`:uc.has(a)?`\\${a}`:a)+s.buildRegExpStr()});return typeof S(this,bt)=="number"&&n.unshift(`#${S(this,bt)}`),n.length===0?"":n.length===1?n[0]:"(?:"+n.join("|")+")"}},bt=new WeakMap,wt=new WeakMap,Ie=new WeakMap,St),Ln,qr,sl,gc=(sl=class{constructor(){z(this,Ln,{varIndex:0});z(this,qr,new mc)}insert(t,r,n){const a=[],s=[];for(let o=0;;){let l=!1;if(t=t.replace(/\{[^}]+\}/g,d=>{const h=`@\\${o}`;return s[o]=[h,d],o++,l=!0,h}),!l)break}const i=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let o=s.length-1;o>=0;o--){const[l]=s[o];for(let d=i.length-1;d>=0;d--)if(i[d].indexOf(l)!==-1){i[d]=i[d].replace(l,s[o][1]);break}}return S(this,qr).insert(i,r,a,S(this,Ln),n),a}buildRegExp(){let t=S(this,qr).buildRegExpStr();if(t==="")return[/^$/,[],[]];let r=0;const n=[],a=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,i,o)=>i!==void 0?(n[++r]=Number(i),"$()"):(o!==void 0&&(a[Number(o)]=++r),"")),[new RegExp(`^${t}`),n,a]}},Ln=new WeakMap,qr=new WeakMap,sl),fc=[/^$/,[],Object.create(null)],Cn=Object.create(null);function Ml(t){return Cn[t]??(Cn[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(r,n)=>n?`\\${n}`:"(?:|/.*)")}$`))}function yc(){Cn=Object.create(null)}function vc(t){var h;const r=new gc,n=[];if(t.length===0)return fc;const a=t.map(c=>[!/\*|\/:/.test(c[0]),...c]).sort(([c,p],[f,v])=>c?1:f?-1:p.length-v.length),s=Object.create(null);for(let c=0,p=-1,f=a.length;c<f;c++){const[v,m,y]=a[c];v?s[m]=[y.map(([T])=>[T,Object.create(null)]),Ol]:p++;let g;try{g=r.insert(m,p,v)}catch(T){throw T===Ht?new Cl(m):T}v||(n[p]=y.map(([T,E])=>{const P=Object.create(null);for(E-=1;E>=0;E--){const[A,C]=g[E];P[A]=C}return[T,P]}))}const[i,o,l]=r.buildRegExp();for(let c=0,p=n.length;c<p;c++)for(let f=0,v=n[c].length;f<v;f++){const m=(h=n[c][f])==null?void 0:h[1];if(!m)continue;const y=Object.keys(m);for(let g=0,T=y.length;g<T;g++)m[y[g]]=l[m[y[g]]]}const d=[];for(const c in o)d[c]=n[o[c]];return[i,d,s]}function Rt(t,r){if(t){for(const n of Object.keys(t).sort((a,s)=>s.length-a.length))if(Ml(n).test(r))return[...t[n]]}}var at,st,jn,Rl,il,xc=(il=class{constructor(){z(this,jn);B(this,"name","RegExpRouter");z(this,at);z(this,st);B(this,"match",hc);N(this,at,{[ae]:Object.create(null)}),N(this,st,{[ae]:Object.create(null)})}add(t,r,n){var l;const a=S(this,at),s=S(this,st);if(!a||!s)throw new Error(Al);a[t]||[a,s].forEach(d=>{d[t]=Object.create(null),Object.keys(d[ae]).forEach(h=>{d[t][h]=[...d[ae][h]]})}),r==="/*"&&(r="*");const i=(r.match(/\/:/g)||[]).length;if(/\*$/.test(r)){const d=Ml(r);t===ae?Object.keys(a).forEach(h=>{var c;(c=a[h])[r]||(c[r]=Rt(a[h],r)||Rt(a[ae],r)||[])}):(l=a[t])[r]||(l[r]=Rt(a[t],r)||Rt(a[ae],r)||[]),Object.keys(a).forEach(h=>{(t===ae||t===h)&&Object.keys(a[h]).forEach(c=>{d.test(c)&&a[h][c].push([n,i])})}),Object.keys(s).forEach(h=>{(t===ae||t===h)&&Object.keys(s[h]).forEach(c=>d.test(c)&&s[h][c].push([n,i]))});return}const o=El(r)||[r];for(let d=0,h=o.length;d<h;d++){const c=o[d];Object.keys(s).forEach(p=>{var f;(t===ae||t===p)&&((f=s[p])[c]||(f[c]=[...Rt(a[p],c)||Rt(a[ae],c)||[]]),s[p][c].push([n,i-h+d+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(S(this,st)).concat(Object.keys(S(this,at))).forEach(r=>{t[r]||(t[r]=W(this,jn,Rl).call(this,r))}),N(this,at,N(this,st,void 0)),yc(),t}},at=new WeakMap,st=new WeakMap,jn=new WeakSet,Rl=function(t){const r=[];let n=t===ae;return[S(this,at),S(this,st)].forEach(a=>{const s=a[t]?Object.keys(a[t]).map(i=>[i,a[t][i]]):[];s.length!==0?(n||(n=!0),r.push(...s)):t!==ae&&r.push(...Object.keys(a[ae]).map(i=>[i,a[ae][i]]))}),n?vc(r):null},il),it,ze,ol,bc=(ol=class{constructor(t){B(this,"name","SmartRouter");z(this,it,[]);z(this,ze,[]);N(this,it,t.routers)}add(t,r,n){if(!S(this,ze))throw new Error(Al);S(this,ze).push([t,r,n])}match(t,r){if(!S(this,ze))throw new Error("Fatal error");const n=S(this,it),a=S(this,ze),s=n.length;let i=0,o;for(;i<s;i++){const l=n[i];try{for(let d=0,h=a.length;d<h;d++)l.add(...a[d]);o=l.match(t,r)}catch(d){if(d instanceof Cl)continue;throw d}this.match=l.match.bind(l),N(this,it,[l]),N(this,ze,void 0);break}if(i===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(S(this,ze)||S(this,it).length!==1)throw new Error("No active router has been determined yet.");return S(this,it)[0]}},it=new WeakMap,ze=new WeakMap,ol),lr=Object.create(null),ot,he,Et,Xt,le,$e,yt,Zt,wc=(Zt=class{constructor(r,n,a){z(this,$e);z(this,ot);z(this,he);z(this,Et);z(this,Xt,0);z(this,le,lr);if(N(this,he,a||Object.create(null)),N(this,ot,[]),r&&n){const s=Object.create(null);s[r]={handler:n,possibleKeys:[],score:0},N(this,ot,[s])}N(this,Et,[])}insert(r,n,a){N(this,Xt,++ii(this,Xt)._);let s=this;const i=Jd(n),o=[];for(let l=0,d=i.length;l<d;l++){const h=i[l],c=i[l+1],p=Zd(h,c),f=Array.isArray(p)?p[0]:h;if(f in S(s,he)){s=S(s,he)[f],p&&o.push(p[1]);continue}S(s,he)[f]=new Zt,p&&(S(s,Et).push(p),o.push(p[1])),s=S(s,he)[f]}return S(s,ot).push({[r]:{handler:a,possibleKeys:o.filter((l,d,h)=>h.indexOf(l)===d),score:S(this,Xt)}}),s}search(r,n){var d;const a=[];N(this,le,lr);let i=[this];const o=bl(n),l=[];for(let h=0,c=o.length;h<c;h++){const p=o[h],f=h===c-1,v=[];for(let m=0,y=i.length;m<y;m++){const g=i[m],T=S(g,he)[p];T&&(N(T,le,S(g,le)),f?(S(T,he)["*"]&&a.push(...W(this,$e,yt).call(this,S(T,he)["*"],r,S(g,le))),a.push(...W(this,$e,yt).call(this,T,r,S(g,le)))):v.push(T));for(let E=0,P=S(g,Et).length;E<P;E++){const A=S(g,Et)[E],C=S(g,le)===lr?{}:{...S(g,le)};if(A==="*"){const D=S(g,he)["*"];D&&(a.push(...W(this,$e,yt).call(this,D,r,S(g,le))),N(D,le,C),v.push(D));continue}const[M,b,_]=A;if(!p&&!(_ instanceof RegExp))continue;const I=S(g,he)[M],R=o.slice(h).join("/");if(_ instanceof RegExp){const D=_.exec(R);if(D){if(C[b]=D[0],a.push(...W(this,$e,yt).call(this,I,r,S(g,le),C)),Object.keys(S(I,he)).length){N(I,le,C);const L=((d=D[0].match(/\//))==null?void 0:d.length)??0;(l[L]||(l[L]=[])).push(I)}continue}}(_===!0||_.test(p))&&(C[b]=p,f?(a.push(...W(this,$e,yt).call(this,I,r,C,S(g,le))),S(I,he)["*"]&&a.push(...W(this,$e,yt).call(this,S(I,he)["*"],r,C,S(g,le)))):(N(I,le,C),v.push(I)))}}i=v.concat(l.shift()??[])}return a.length>1&&a.sort((h,c)=>h.score-c.score),[a.map(({handler:h,params:c})=>[h,c])]}},ot=new WeakMap,he=new WeakMap,Et=new WeakMap,Xt=new WeakMap,le=new WeakMap,$e=new WeakSet,yt=function(r,n,a,s){const i=[];for(let o=0,l=S(r,ot).length;o<l;o++){const d=S(r,ot)[o],h=d[n]||d[ae],c={};if(h!==void 0&&(h.params=Object.create(null),i.push(h),a!==lr||s&&s!==lr))for(let p=0,f=h.possibleKeys.length;p<f;p++){const v=h.possibleKeys[p],m=c[h.score];h.params[v]=s!=null&&s[v]&&!m?s[v]:a[v]??(s==null?void 0:s[v]),c[h.score]=!0}}return i},Zt),Tt,ll,Ec=(ll=class{constructor(){B(this,"name","TrieRouter");z(this,Tt);N(this,Tt,new wc)}add(t,r,n){const a=El(r);if(a){for(let s=0,i=a.length;s<i;s++)S(this,Tt).insert(t,a[s],n);return}S(this,Tt).insert(t,r,n)}match(t,r){return S(this,Tt).search(t,r)}},Tt=new WeakMap,ll),Rs=class extends cc{constructor(t={}){super(t),this.router=t.router??new bc({routers:[new xc,new Ec]})}},Tc=t=>{const n={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},a=(i=>typeof i=="string"?i==="*"?()=>i:o=>i===o?o:null:typeof i=="function"?i:o=>i.includes(o)?o:null)(n.origin),s=(i=>typeof i=="function"?i:Array.isArray(i)?()=>i:()=>[])(n.allowMethods);return async function(o,l){var c;function d(p,f){o.res.headers.set(p,f)}const h=await a(o.req.header("origin")||"",o);if(h&&d("Access-Control-Allow-Origin",h),n.credentials&&d("Access-Control-Allow-Credentials","true"),(c=n.exposeHeaders)!=null&&c.length&&d("Access-Control-Expose-Headers",n.exposeHeaders.join(",")),o.req.method==="OPTIONS"){n.origin!=="*"&&d("Vary","Origin"),n.maxAge!=null&&d("Access-Control-Max-Age",n.maxAge.toString());const p=await s(o.req.header("origin")||"",o);p.length&&d("Access-Control-Allow-Methods",p.join(","));let f=n.allowHeaders;if(!(f!=null&&f.length)){const v=o.req.header("Access-Control-Request-Headers");v&&(f=v.split(/\s*,\s*/))}return f!=null&&f.length&&(d("Access-Control-Allow-Headers",f.join(",")),o.res.headers.append("Vary","Access-Control-Request-Headers")),o.res.headers.delete("Content-Length"),o.res.headers.delete("Content-Type"),new Response(null,{headers:o.res.headers,status:204,statusText:"No Content"})}await l(),n.origin!=="*"&&o.header("Vary","Origin",{append:!0})}},Br="_hp",Sc={Change:"Input",DoubleClick:"DblClick"},Pc={svg:"2000/svg",math:"1998/Math/MathML"},Nr=[],ws=new WeakMap,tr=void 0,kc=()=>tr,Le=t=>"t"in t,aa={onClick:["click",!1]},gi=t=>{if(!t.startsWith("on"))return;if(aa[t])return aa[t];const r=t.match(/^on([A-Z][a-zA-Z]+?(?:PointerCapture)?)(Capture)?$/);if(r){const[,n,a]=r;return aa[t]=[(Sc[n]||n).toLowerCase(),!!a]}},fi=(t,r)=>tr&&t instanceof SVGElement&&/[A-Z]/.test(r)&&(r in t.style||r.match(/^(?:o|pai|str|u|ve)/))?r.replace(/([A-Z])/g,"-$1").toLowerCase():r,_c=(t,r,n)=>{var a;r||(r={});for(let s in r){const i=r[s];if(s!=="children"&&(!n||n[s]!==i)){s=Rn(s);const o=gi(s);if(o){if((n==null?void 0:n[s])!==i&&(n&&t.removeEventListener(o[0],n[s],o[1]),i!=null)){if(typeof i!="function")throw new Error(`Event handler for "${s}" is not a function`);t.addEventListener(o[0],i,o[1])}}else if(s==="dangerouslySetInnerHTML"&&i)t.innerHTML=i.__html;else if(s==="ref"){let l;typeof i=="function"?l=i(t)||(()=>i(null)):i&&"current"in i&&(i.current=t,l=()=>i.current=null),ws.set(t,l)}else if(s==="style"){const l=t.style;typeof i=="string"?l.cssText=i:(l.cssText="",i!=null&&vl(i,l.setProperty.bind(l)))}else{if(s==="value"){const d=t.nodeName;if(d==="INPUT"||d==="TEXTAREA"||d==="SELECT"){if(t.value=i==null||i===!1?null:i,d==="TEXTAREA"){t.textContent=i;continue}else if(d==="SELECT"){t.selectedIndex===-1&&(t.selectedIndex=0);continue}}}else(s==="checked"&&t.nodeName==="INPUT"||s==="selected"&&t.nodeName==="OPTION")&&(t[s]=i);const l=fi(t,s);i==null||i===!1?t.removeAttribute(l):i===!0?t.setAttribute(l,""):typeof i=="string"||typeof i=="number"?t.setAttribute(l,i):t.setAttribute(l,i.toString())}}}if(n)for(let s in n){const i=n[s];if(s!=="children"&&!(s in r)){s=Rn(s);const o=gi(s);o?t.removeEventListener(o[0],i,o[1]):s==="ref"?(a=ws.get(t))==null||a():t.removeAttribute(fi(t,s))}}},Ac=(t,r)=>{r[ee][0]=0,Nr.push([t,r]);const n=r.tag[As]||r.tag,a=n.defaultProps?{...n.defaultProps,...r.props}:r.props;try{return[n.call(null,a)]}finally{Nr.pop()}},Dl=(t,r,n,a,s)=>{var i,o;(i=t.vR)!=null&&i.length&&(a.push(...t.vR),delete t.vR),typeof t.tag=="function"&&((o=t[ee][1][jl])==null||o.forEach(l=>s.push(l))),t.vC.forEach(l=>{var d;if(Le(l))n.push(l);else if(typeof l.tag=="function"||l.tag===""){l.c=r;const h=n.length;if(Dl(l,r,n,a,s),l.s){for(let c=h;c<n.length;c++)n[c].s=!0;l.s=!1}}else n.push(l),(d=l.vR)!=null&&d.length&&(a.push(...l.vR),delete l.vR)})},Cc=t=>{for(;;t=t.tag===Br||!t.vC||!t.pP?t.nN:t.vC[0]){if(!t)return null;if(t.tag!==Br&&t.e)return t.e}},Bl=t=>{var r,n,a,s,i,o;Le(t)||((n=(r=t[ee])==null?void 0:r[1][jl])==null||n.forEach(l=>{var d;return(d=l[2])==null?void 0:d.call(l)}),(a=ws.get(t.e))==null||a(),t.p===2&&((s=t.vC)==null||s.forEach(l=>l.p=2)),(i=t.vC)==null||i.forEach(Bl)),t.p||((o=t.e)==null||o.remove(),delete t.e),typeof t.tag=="function"&&(Ir.delete(t),In.delete(t),delete t[ee][3],t.a=!0)},Nl=(t,r,n)=>{t.c=r,Ll(t,r,n)},yi=(t,r)=>{if(r){for(let n=0,a=t.length;n<a;n++)if(t[n]===r)return n}},vi=Symbol(),Ll=(t,r,n)=>{var h;const a=[],s=[],i=[];Dl(t,r,a,s,i),s.forEach(Bl);const o=n?void 0:r.childNodes;let l,d=null;if(n)l=-1;else if(!o.length)l=0;else{const c=yi(o,Cc(t.nN));c!==void 0?(d=o[c],l=c):l=yi(o,(h=a.find(p=>p.tag!==Br&&p.e))==null?void 0:h.e)??-1,l===-1&&(n=!0)}for(let c=0,p=a.length;c<p;c++,l++){const f=a[c];let v;if(f.s&&f.e)v=f.e,f.s=!1;else{const m=n||!f.e;Le(f)?(f.e&&f.d&&(f.e.textContent=f.t),f.d=!1,v=f.e||(f.e=document.createTextNode(f.t))):(v=f.e||(f.e=f.n?document.createElementNS(f.n,f.tag):document.createElement(f.tag)),_c(v,f.props,f.pP),Ll(f,v,m))}f.tag===Br?l--:n?v.parentNode||r.appendChild(v):o[l]!==v&&o[l-1]!==v&&(o[l+1]===v?r.appendChild(o[l]):r.insertBefore(v,d||o[l]||null))}if(t.pP&&delete t.pP,i.length){const c=[],p=[];i.forEach(([,f,,v,m])=>{f&&c.push(f),v&&p.push(v),m==null||m()}),c.forEach(f=>f()),p.length&&requestAnimationFrame(()=>{p.forEach(f=>f())})}},Ic=(t,r)=>!!(t&&t.length===r.length&&t.every((n,a)=>n[1]===r[a][1])),In=new WeakMap,Es=(t,r,n)=>{var i,o,l,d,h,c;const a=!n&&r.pC;n&&(r.pC||(r.pC=r.vC));let s;try{n||(n=typeof r.tag=="function"?Ac(t,r):Gr(r.props.children)),((i=n[0])==null?void 0:i.tag)===""&&n[0][vs]&&(s=n[0][vs],t[5].push([t,s,r]));const p=a?[...r.pC]:r.vC?[...r.vC]:void 0,f=[];let v;for(let m=0;m<n.length;m++){Array.isArray(n[m])&&n.splice(m,1,...n[m].flat());let y=Oc(n[m]);if(y){typeof y.tag=="function"&&!y.tag[pl]&&(er.length>0&&(y[ee][2]=er.map(T=>[T,T.values.at(-1)])),(o=t[5])!=null&&o.length&&(y[ee][3]=t[5].at(-1)));let g;if(p&&p.length){const T=p.findIndex(Le(y)?E=>Le(E):y.key!==void 0?E=>E.key===y.key&&E.tag===y.tag:E=>E.tag===y.tag);T!==-1&&(g=p[T],p.splice(T,1))}if(g)if(Le(y))g.t!==y.t&&(g.t=y.t,g.d=!0),y=g;else{const T=g.pP=g.props;if(g.props=y.props,g.f||(g.f=y.f||r.f),typeof y.tag=="function"){const E=g[ee][2];g[ee][2]=y[ee][2]||[],g[ee][3]=y[ee][3],!g.f&&((g.o||g)===y.o||(d=(l=g.tag)[Id])!=null&&d.call(l,T,g.props))&&Ic(E,g[ee][2])&&(g.s=!0)}y=g}else if(!Le(y)&&tr){const T=rr(tr);T&&(y.n=T)}if(!Le(y)&&!y.s&&(Es(t,y),delete y.f),f.push(y),v&&!v.s&&!y.s)for(let T=v;T&&!Le(T);T=(h=T.vC)==null?void 0:h.at(-1))T.nN=y;v=y}}r.vR=a?[...r.vC,...p||[]]:p||[],r.vC=f,a&&delete r.pC}catch(p){if(r.f=!0,p===vi){if(s)return;throw p}const[f,v,m]=((c=r[ee])==null?void 0:c[3])||[];if(v){const y=()=>On([0,!1,t[2]],m),g=In.get(m)||[];g.push(y),In.set(m,g);const T=v(p,()=>{const E=In.get(m);if(E){const P=E.indexOf(y);if(P!==-1)return E.splice(P,1),y()}});if(T){if(t[0]===1)t[1]=!0;else if(Es(t,m,[T]),(v.length===1||t!==f)&&m.c){Nl(m,m.c,!1);return}throw vi}}throw p}finally{s&&t[5].pop()}},Oc=t=>{if(!(t==null||typeof t=="boolean")){if(typeof t=="string"||typeof t=="number")return{t:t.toString(),d:!0};if("vR"in t&&(t={tag:t.tag,props:t.props,key:t.key,f:t.f,type:t.tag,ref:t.props.ref,o:t.o||t}),typeof t.tag=="function")t[ee]=[0,[]];else{const r=Pc[t.tag];r&&(tr||(tr=gl("")),t.props.children=[{tag:tr,props:{value:t.n=`http://www.w3.org/${r}`,children:t.props.children}}])}return t}},xi=(t,r)=>{var n,a;(n=r[ee][2])==null||n.forEach(([s,i])=>{s.values.push(i)});try{Es(t,r,void 0)}catch{return}if(r.a){delete r.a;return}(a=r[ee][2])==null||a.forEach(([s])=>{s.values.pop()}),(t[0]!==1||!t[1])&&Nl(r,r.c,!1)},Ir=new WeakMap,bi=[],On=async(t,r)=>{t[5]||(t[5]=[]);const n=Ir.get(r);n&&n[0](void 0);let a;const s=new Promise(i=>a=i);if(Ir.set(r,[a,()=>{t[2]?t[2](t,r,i=>{xi(i,r)}).then(()=>a(r)):(xi(t,r),a(r))}]),bi.length)bi.at(-1).add(r);else{await Promise.resolve();const i=Ir.get(r);i&&(Ir.delete(r),i[1]())}return s},Mc=(t,r,n)=>({tag:Br,props:{children:t},key:n,e:r,p:1}),sa=0,jl=1,ia=2,oa=3,la=new WeakMap,Fl=(t,r)=>!t||!r||t.length!==r.length||r.some((n,a)=>n!==t[a]),Rc=void 0,wi=[],Dc=t=>{var o;const r=()=>typeof t=="function"?t():t,n=Nr.at(-1);if(!n)return[r(),()=>{}];const[,a]=n,s=(o=a[ee][1])[sa]||(o[sa]=[]),i=a[ee][0]++;return s[i]||(s[i]=[r(),l=>{const d=Rc,h=s[i];if(typeof l=="function"&&(l=l(h[0])),!Object.is(l,h[0]))if(h[0]=l,wi.length){const[c,p]=wi.at(-1);Promise.all([c===3?a:On([c,!1,d],a),p]).then(([f])=>{if(!f||!(c===2||c===3))return;const v=f.vC;requestAnimationFrame(()=>{setTimeout(()=>{v===f.vC&&On([c===3?1:0,!1,d],f)})})})}else On([0,!1,d],a)}])},Ds=(t,r)=>{var l;const n=Nr.at(-1);if(!n)return t;const[,a]=n,s=(l=a[ee][1])[ia]||(l[ia]=[]),i=a[ee][0]++,o=s[i];return Fl(o==null?void 0:o[1],r)?s[i]=[t,r]:t=s[i][0],t},Bc=t=>{const r=la.get(t);if(r){if(r.length===2)throw r[1];return r[0]}throw t.then(n=>la.set(t,[n]),n=>la.set(t,[void 0,n])),t},Nc=(t,r)=>{var l;const n=Nr.at(-1);if(!n)return t();const[,a]=n,s=(l=a[ee][1])[oa]||(l[oa]=[]),i=a[ee][0]++,o=s[i];return Fl(o==null?void 0:o[1],r)&&(s[i]=[t(),r]),s[i][0]},Lc=gl({pending:!1,data:null,method:null,action:null}),Ei=new Set,jc=t=>{Ei.add(t),t.finally(()=>Ei.delete(t))},Bs=(t,r)=>Nc(()=>n=>{let a;t&&(typeof t=="function"?a=t(n)||(()=>{t(null)}):t&&"current"in t&&(t.current=n,a=()=>{t.current=null}));const s=r(n);return()=>{s==null||s(),a==null||a()}},[t]),Dt=Object.create(null),Qr=Object.create(null),Hr=(t,r,n,a,s)=>{if(r!=null&&r.itemProp)return{tag:t,props:r,type:t,ref:r.ref};const i=document.head;let{onLoad:o,onError:l,precedence:d,blocking:h,...c}=r,p=null,f=!1;const v=Sn[t];let m;if(v.length>0){const E=i.querySelectorAll(t);e:for(const P of E)for(const A of Sn[t])if(P.getAttribute(A)===r[A]){p=P;break e}if(!p){const P=v.reduce((A,C)=>r[C]===void 0?A:`${A}-${C}-${r[C]}`,t);f=!Qr[P],p=Qr[P]||(Qr[P]=(()=>{const A=document.createElement(t);for(const C of v)r[C]!==void 0&&A.setAttribute(C,r[C]),r.rel&&A.setAttribute("rel",r.rel);return A})())}}else m=i.querySelectorAll(t);d=a?d??"":void 0,a&&(c[Pn]=d);const y=Ds(E=>{if(v.length>0){let P=!1;for(const A of i.querySelectorAll(t)){if(P&&A.getAttribute(Pn)!==d){i.insertBefore(E,A);return}A.getAttribute(Pn)===d&&(P=!0)}i.appendChild(E)}else if(m){let P=!1;for(const A of m)if(A===E){P=!0;break}P||i.insertBefore(E,i.contains(m[0])?m[0]:i.querySelector(t)),m=void 0}},[d]),g=Bs(r.ref,E=>{var C;const P=v[0];if(n===2&&(E.innerHTML=""),(f||m)&&y(E),!l&&!o)return;let A=Dt[C=E.getAttribute(P)]||(Dt[C]=new Promise((M,b)=>{E.addEventListener("load",M),E.addEventListener("error",b)}));o&&(A=A.then(o)),l&&(A=A.catch(l)),A.catch(()=>{})});if(s&&h==="render"){const E=Sn[t][0];if(r[E]){const P=r[E],A=Dt[P]||(Dt[P]=new Promise((C,M)=>{y(p),p.addEventListener("load",C),p.addEventListener("error",M)}));Bc(A)}}const T={tag:t,type:t,props:{...c,ref:g},ref:g};return T.p=n,p&&(T.e=p),Mc(T,i)},Fc=t=>{const r=kc(),n=r&&rr(r);return n!=null&&n.endsWith("svg")?{tag:"title",props:t,type:"title",ref:t.ref}:Hr("title",t,void 0,!1,!1)},zc=t=>!t||["src","async"].some(r=>!t[r])?{tag:"script",props:t,type:"script",ref:t.ref}:Hr("script",t,1,!1,!0),$c=t=>!t||!["href","precedence"].every(r=>r in t)?{tag:"style",props:t,type:"style",ref:t.ref}:(t["data-href"]=t.href,delete t.href,Hr("style",t,2,!0,!0)),qc=t=>!t||["onLoad","onError"].some(r=>r in t)||t.rel==="stylesheet"&&(!("precedence"in t)||"disabled"in t)?{tag:"link",props:t,type:"link",ref:t.ref}:Hr("link",t,1,"precedence"in t,!0),Gc=t=>Hr("meta",t,void 0,!1,!1),zl=Symbol(),Wc=t=>{const{action:r,...n}=t;typeof r!="function"&&(n.action=r);const[a,s]=Dc([null,!1]),i=Ds(async h=>{const c=h.isTrusted?r:h.detail[zl];if(typeof c!="function")return;h.preventDefault();const p=new FormData(h.target);s([p,!0]);const f=c(p);f instanceof Promise&&(jc(f),await f),s([null,!0])},[]),o=Bs(t.ref,h=>(h.addEventListener("submit",i),()=>{h.removeEventListener("submit",i)})),[l,d]=a;return a[1]=!1,{tag:Lc,props:{value:{pending:l!==null,data:l,method:l?"post":null,action:l?r:null},children:{tag:"form",props:{...n,ref:o},type:"form",ref:o}},f:d}},$l=(t,{formAction:r,...n})=>{if(typeof r=="function"){const a=Ds(s=>{s.preventDefault(),s.currentTarget.form.dispatchEvent(new CustomEvent("submit",{detail:{[zl]:r}}))},[]);n.ref=Bs(n.ref,s=>(s.addEventListener("click",a),()=>{s.removeEventListener("click",a)}))}return{tag:t,props:n,type:t,ref:n.ref}},Uc=t=>$l("input",t),Hc=t=>$l("button",t);Object.assign(xs,{title:Fc,script:zc,style:$c,link:qc,meta:Gc,form:Wc,input:Uc,button:Hc});Cs(null);new TextEncoder;var Yc=Cs(null),Vc=(t,r,n,a)=>(s,i)=>{const o="<!DOCTYPE html>",l=n?ci(h=>n(h,t),{Layout:r,...i},s):s,d=Cd`${Pe(o)}${ci(Yc.Provider,{value:t},l)}`;return t.html(d)},Kc=(t,r)=>function(a,s){const i=a.getLayout()??Gd;return t&&a.setLayout(o=>t({...o,Layout:i},a)),a.setRenderer(Vc(a,i,t)),s()};const Jc=Kc(({children:t,title:r})=>e("html",{lang:"en",children:[e("head",{children:[e("meta",{charset:"UTF-8"}),e("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),e("title",{children:r||"Acromatico - Creative Education for Homeschool Kids"}),e("meta",{name:"description",content:"Multi-revenue SaaS platform for homeschool families. Academy, Studio Services, Fine Art Prints, and Wedding Photography."}),e("script",{src:"https://cdn.tailwindcss.com"}),e("link",{href:"https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css",rel:"stylesheet"}),e("link",{href:"/static/style.css",rel:"stylesheet"})]}),e("body",{class:"bg-gray-50 text-gray-900",children:t})]}));var Ti=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Qc(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var r=t.default;if(typeof r=="function"){var n=function a(){return this instanceof a?Reflect.construct(r,arguments,this.constructor):r.apply(this,arguments)};n.prototype=r.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(t).forEach(function(a){var s=Object.getOwnPropertyDescriptor(t,a);Object.defineProperty(n,a,s.get?s:{enumerable:!0,get:function(){return t[a]}})}),n}var da,Si;function nr(){return Si||(Si=1,da=TypeError),da}const Xc={},Zc=Object.freeze(Object.defineProperty({__proto__:null,default:Xc},Symbol.toStringTag,{value:"Module"})),eh=Qc(Zc);var ca,Pi;function Fn(){if(Pi)return ca;Pi=1;var t=typeof Map=="function"&&Map.prototype,r=Object.getOwnPropertyDescriptor&&t?Object.getOwnPropertyDescriptor(Map.prototype,"size"):null,n=t&&r&&typeof r.get=="function"?r.get:null,a=t&&Map.prototype.forEach,s=typeof Set=="function"&&Set.prototype,i=Object.getOwnPropertyDescriptor&&s?Object.getOwnPropertyDescriptor(Set.prototype,"size"):null,o=s&&i&&typeof i.get=="function"?i.get:null,l=s&&Set.prototype.forEach,d=typeof WeakMap=="function"&&WeakMap.prototype,h=d?WeakMap.prototype.has:null,c=typeof WeakSet=="function"&&WeakSet.prototype,p=c?WeakSet.prototype.has:null,f=typeof WeakRef=="function"&&WeakRef.prototype,v=f?WeakRef.prototype.deref:null,m=Boolean.prototype.valueOf,y=Object.prototype.toString,g=Function.prototype.toString,T=String.prototype.match,E=String.prototype.slice,P=String.prototype.replace,A=String.prototype.toUpperCase,C=String.prototype.toLowerCase,M=RegExp.prototype.test,b=Array.prototype.concat,_=Array.prototype.join,I=Array.prototype.slice,R=Math.floor,D=typeof BigInt=="function"?BigInt.prototype.valueOf:null,L=Object.getOwnPropertySymbols,U=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Symbol.prototype.toString:null,q=typeof Symbol=="function"&&typeof Symbol.iterator=="object",Q=typeof Symbol=="function"&&Symbol.toStringTag&&(typeof Symbol.toStringTag===q||!0)?Symbol.toStringTag:null,F=Object.prototype.propertyIsEnumerable,Y=(typeof Reflect=="function"?Reflect.getPrototypeOf:Object.getPrototypeOf)||([].__proto__===Array.prototype?function(x){return x.__proto__}:null);function O(x,w){if(x===1/0||x===-1/0||x!==x||x&&x>-1e3&&x<1e3||M.call(/e/,w))return w;var G=/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;if(typeof x=="number"){var K=x<0?-R(-x):R(x);if(K!==x){var J=String(K),j=E.call(w,J.length+1);return P.call(J,G,"$&_")+"."+P.call(P.call(j,/([0-9]{3})/g,"$&_"),/_$/,"")}}return P.call(w,G,"$&_")}var me=eh,De=me.custom,dt=de(De)?De:null,Ge={__proto__:null,double:'"',single:"'"},We={__proto__:null,double:/(["\\])/g,single:/(['\\])/g};ca=function x(w,G,K,J){var j=G||{};if(fe(j,"quoteStyle")&&!fe(Ge,j.quoteStyle))throw new TypeError('option "quoteStyle" must be "single" or "double"');if(fe(j,"maxStringLength")&&(typeof j.maxStringLength=="number"?j.maxStringLength<0&&j.maxStringLength!==1/0:j.maxStringLength!==null))throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');var Ke=fe(j,"customInspect")?j.customInspect:!0;if(typeof Ke!="boolean"&&Ke!=="symbol")throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");if(fe(j,"indent")&&j.indent!==null&&j.indent!=="	"&&!(parseInt(j.indent,10)===j.indent&&j.indent>0))throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');if(fe(j,"numericSeparator")&&typeof j.numericSeparator!="boolean")throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');var ct=j.numericSeparator;if(typeof w>"u")return"undefined";if(w===null)return"null";if(typeof w=="boolean")return w?"true":"false";if(typeof w=="string")return Ks(w,j);if(typeof w=="number"){if(w===0)return 1/0/w>0?"0":"-0";var ye=String(w);return ct?O(w,ye):ye}if(typeof w=="bigint"){var Je=String(w)+"n";return ct?O(w,Je):Je}var Hn=typeof j.depth>"u"?5:j.depth;if(typeof K>"u"&&(K=0),K>=Hn&&Hn>0&&typeof w=="object")return He(w)?"[Array]":"[Object]";var Ot=Td(j,K);if(typeof J>"u")J=[];else if(Ve(J,w)>=0)return"[Circular]";function _e(Mt,Kr,Pd){if(Kr&&(J=I.call(J),J.push(Kr)),Pd){var ai={depth:j.depth};return fe(j,"quoteStyle")&&(ai.quoteStyle=j.quoteStyle),x(Mt,ai,K+1,J)}return x(Mt,j,K+1,J)}if(typeof w=="function"&&!oe(w)){var Qs=_t(w),Xs=Yr(w,_e);return"[Function"+(Qs?": "+Qs:" (anonymous)")+"]"+(Xs.length>0?" { "+_.call(Xs,", ")+" }":"")}if(de(w)){var Zs=q?P.call(String(w),/^(Symbol\(.*\))_[^)]*$/,"$1"):U.call(w);return typeof w=="object"&&!q?ir(Zs):Zs}if(bd(w)){for(var or="<"+C.call(String(w.nodeName)),Yn=w.attributes||[],Vr=0;Vr<Yn.length;Vr++)or+=" "+Yn[Vr].name+"="+Ue(Be(Yn[Vr].value),"double",j);return or+=">",w.childNodes&&w.childNodes.length&&(or+="..."),or+="</"+C.call(String(w.nodeName))+">",or}if(He(w)){if(w.length===0)return"[]";var Vn=Yr(w,_e);return Ot&&!Ed(Vn)?"["+Un(Vn,Ot)+"]":"[ "+_.call(Vn,", ")+" ]"}if($(w)){var Kn=Yr(w,_e);return!("cause"in Error.prototype)&&"cause"in w&&!F.call(w,"cause")?"{ ["+String(w)+"] "+_.call(b.call("[cause]: "+_e(w.cause),Kn),", ")+" }":Kn.length===0?"["+String(w)+"]":"{ ["+String(w)+"] "+_.call(Kn,", ")+" }"}if(typeof w=="object"&&Ke){if(dt&&typeof w[dt]=="function"&&me)return me(w,{depth:Hn-K});if(Ke!=="symbol"&&typeof w.inspect=="function")return w.inspect()}if(ke(w)){var ei=[];return a&&a.call(w,function(Mt,Kr){ei.push(_e(Kr,w,!0)+" => "+_e(Mt,w))}),Js("Map",n.call(w),ei,Ot)}if(It(w)){var ti=[];return l&&l.call(w,function(Mt){ti.push(_e(Mt,w))}),Js("Set",o.call(w),ti,Ot)}if(At(w))return Wn("WeakMap");if(xd(w))return Wn("WeakSet");if(Ct(w))return Wn("WeakRef");if(V(w))return ir(_e(Number(w)));if(be(w))return ir(_e(D.call(w)));if(ne(w))return ir(m.call(w));if(re(w))return ir(_e(String(w)));if(typeof window<"u"&&w===window)return"{ [object Window] }";if(typeof globalThis<"u"&&w===globalThis||typeof Ti<"u"&&w===Ti)return"{ [object globalThis] }";if(!Ye(w)&&!oe(w)){var Jn=Yr(w,_e),ri=Y?Y(w)===Object.prototype:w instanceof Object||w.constructor===Object,Qn=w instanceof Object?"":"null prototype",ni=!ri&&Q&&Object(w)===w&&Q in w?E.call(we(w),8,-1):Qn?"Object":"",Sd=ri||typeof w.constructor!="function"?"":w.constructor.name?w.constructor.name+" ":"",Xn=Sd+(ni||Qn?"["+_.call(b.call([],ni||[],Qn||[]),": ")+"] ":"");return Jn.length===0?Xn+"{}":Ot?Xn+"{"+Un(Jn,Ot)+"}":Xn+"{ "+_.call(Jn,", ")+" }"}return String(w)};function Ue(x,w,G){var K=G.quoteStyle||w,J=Ge[K];return J+x+J}function Be(x){return P.call(String(x),/"/g,"&quot;")}function xe(x){return!Q||!(typeof x=="object"&&(Q in x||typeof x[Q]<"u"))}function He(x){return we(x)==="[object Array]"&&xe(x)}function Ye(x){return we(x)==="[object Date]"&&xe(x)}function oe(x){return we(x)==="[object RegExp]"&&xe(x)}function $(x){return we(x)==="[object Error]"&&xe(x)}function re(x){return we(x)==="[object String]"&&xe(x)}function V(x){return we(x)==="[object Number]"&&xe(x)}function ne(x){return we(x)==="[object Boolean]"&&xe(x)}function de(x){if(q)return x&&typeof x=="object"&&x instanceof Symbol;if(typeof x=="symbol")return!0;if(!x||typeof x!="object"||!U)return!1;try{return U.call(x),!0}catch{}return!1}function be(x){if(!x||typeof x!="object"||!D)return!1;try{return D.call(x),!0}catch{}return!1}var ce=Object.prototype.hasOwnProperty||function(x){return x in this};function fe(x,w){return ce.call(x,w)}function we(x){return y.call(x)}function _t(x){if(x.name)return x.name;var w=T.call(g.call(x),/^function\s*([\w$]+)/);return w?w[1]:null}function Ve(x,w){if(x.indexOf)return x.indexOf(w);for(var G=0,K=x.length;G<K;G++)if(x[G]===w)return G;return-1}function ke(x){if(!n||!x||typeof x!="object")return!1;try{n.call(x);try{o.call(x)}catch{return!0}return x instanceof Map}catch{}return!1}function At(x){if(!h||!x||typeof x!="object")return!1;try{h.call(x,h);try{p.call(x,p)}catch{return!0}return x instanceof WeakMap}catch{}return!1}function Ct(x){if(!v||!x||typeof x!="object")return!1;try{return v.call(x),!0}catch{}return!1}function It(x){if(!o||!x||typeof x!="object")return!1;try{o.call(x);try{n.call(x)}catch{return!0}return x instanceof Set}catch{}return!1}function xd(x){if(!p||!x||typeof x!="object")return!1;try{p.call(x,p);try{h.call(x,h)}catch{return!0}return x instanceof WeakSet}catch{}return!1}function bd(x){return!x||typeof x!="object"?!1:typeof HTMLElement<"u"&&x instanceof HTMLElement?!0:typeof x.nodeName=="string"&&typeof x.getAttribute=="function"}function Ks(x,w){if(x.length>w.maxStringLength){var G=x.length-w.maxStringLength,K="... "+G+" more character"+(G>1?"s":"");return Ks(E.call(x,0,w.maxStringLength),w)+K}var J=We[w.quoteStyle||"single"];J.lastIndex=0;var j=P.call(P.call(x,J,"\\$1"),/[\x00-\x1f]/g,wd);return Ue(j,"single",w)}function wd(x){var w=x.charCodeAt(0),G={8:"b",9:"t",10:"n",12:"f",13:"r"}[w];return G?"\\"+G:"\\x"+(w<16?"0":"")+A.call(w.toString(16))}function ir(x){return"Object("+x+")"}function Wn(x){return x+" { ? }"}function Js(x,w,G,K){var J=K?Un(G,K):_.call(G,", ");return x+" ("+w+") {"+J+"}"}function Ed(x){for(var w=0;w<x.length;w++)if(Ve(x[w],`
`)>=0)return!1;return!0}function Td(x,w){var G;if(x.indent==="	")G="	";else if(typeof x.indent=="number"&&x.indent>0)G=_.call(Array(x.indent+1)," ");else return null;return{base:G,prev:_.call(Array(w+1),G)}}function Un(x,w){if(x.length===0)return"";var G=`
`+w.prev+w.base;return G+_.call(x,","+G)+`
`+w.prev}function Yr(x,w){var G=He(x),K=[];if(G){K.length=x.length;for(var J=0;J<x.length;J++)K[J]=fe(x,J)?w(x[J],x):""}var j=typeof L=="function"?L(x):[],Ke;if(q){Ke={};for(var ct=0;ct<j.length;ct++)Ke["$"+j[ct]]=j[ct]}for(var ye in x)fe(x,ye)&&(G&&String(Number(ye))===ye&&ye<x.length||q&&Ke["$"+ye]instanceof Symbol||(M.call(/[^\w$]/,ye)?K.push(w(ye,x)+": "+w(x[ye],x)):K.push(ye+": "+w(x[ye],x))));if(typeof L=="function")for(var Je=0;Je<j.length;Je++)F.call(x,j[Je])&&K.push("["+w(j[Je])+"]: "+w(x[j[Je]],x));return K}return ca}var ha,ki;function th(){if(ki)return ha;ki=1;var t=Fn(),r=nr(),n=function(l,d,h){for(var c=l,p;(p=c.next)!=null;c=p)if(p.key===d)return c.next=p.next,h||(p.next=l.next,l.next=p),p},a=function(l,d){if(l){var h=n(l,d);return h&&h.value}},s=function(l,d,h){var c=n(l,d);c?c.value=h:l.next={key:d,next:l.next,value:h}},i=function(l,d){return l?!!n(l,d):!1},o=function(l,d){if(l)return n(l,d,!0)};return ha=function(){var d,h={assert:function(c){if(!h.has(c))throw new r("Side channel does not contain "+t(c))},delete:function(c){var p=d&&d.next,f=o(d,c);return f&&p&&p===f&&(d=void 0),!!f},get:function(c){return a(d,c)},has:function(c){return i(d,c)},set:function(c,p){d||(d={next:void 0}),s(d,c,p)}};return h},ha}var ua,_i;function ql(){return _i||(_i=1,ua=Object),ua}var pa,Ai;function rh(){return Ai||(Ai=1,pa=Error),pa}var ma,Ci;function nh(){return Ci||(Ci=1,ma=EvalError),ma}var ga,Ii;function ah(){return Ii||(Ii=1,ga=RangeError),ga}var fa,Oi;function sh(){return Oi||(Oi=1,fa=ReferenceError),fa}var ya,Mi;function ih(){return Mi||(Mi=1,ya=SyntaxError),ya}var va,Ri;function oh(){return Ri||(Ri=1,va=URIError),va}var xa,Di;function lh(){return Di||(Di=1,xa=Math.abs),xa}var ba,Bi;function dh(){return Bi||(Bi=1,ba=Math.floor),ba}var wa,Ni;function ch(){return Ni||(Ni=1,wa=Math.max),wa}var Ea,Li;function hh(){return Li||(Li=1,Ea=Math.min),Ea}var Ta,ji;function uh(){return ji||(ji=1,Ta=Math.pow),Ta}var Sa,Fi;function ph(){return Fi||(Fi=1,Sa=Math.round),Sa}var Pa,zi;function mh(){return zi||(zi=1,Pa=Number.isNaN||function(r){return r!==r}),Pa}var ka,$i;function gh(){if($i)return ka;$i=1;var t=mh();return ka=function(n){return t(n)||n===0?n:n<0?-1:1},ka}var _a,qi;function fh(){return qi||(qi=1,_a=Object.getOwnPropertyDescriptor),_a}var Aa,Gi;function Gl(){if(Gi)return Aa;Gi=1;var t=fh();if(t)try{t([],"length")}catch{t=null}return Aa=t,Aa}var Ca,Wi;function yh(){if(Wi)return Ca;Wi=1;var t=Object.defineProperty||!1;if(t)try{t({},"a",{value:1})}catch{t=!1}return Ca=t,Ca}var Ia,Ui;function vh(){return Ui||(Ui=1,Ia=function(){if(typeof Symbol!="function"||typeof Object.getOwnPropertySymbols!="function")return!1;if(typeof Symbol.iterator=="symbol")return!0;var r={},n=Symbol("test"),a=Object(n);if(typeof n=="string"||Object.prototype.toString.call(n)!=="[object Symbol]"||Object.prototype.toString.call(a)!=="[object Symbol]")return!1;var s=42;r[n]=s;for(var i in r)return!1;if(typeof Object.keys=="function"&&Object.keys(r).length!==0||typeof Object.getOwnPropertyNames=="function"&&Object.getOwnPropertyNames(r).length!==0)return!1;var o=Object.getOwnPropertySymbols(r);if(o.length!==1||o[0]!==n||!Object.prototype.propertyIsEnumerable.call(r,n))return!1;if(typeof Object.getOwnPropertyDescriptor=="function"){var l=Object.getOwnPropertyDescriptor(r,n);if(l.value!==s||l.enumerable!==!0)return!1}return!0}),Ia}var Oa,Hi;function xh(){if(Hi)return Oa;Hi=1;var t=typeof Symbol<"u"&&Symbol,r=vh();return Oa=function(){return typeof t!="function"||typeof Symbol!="function"||typeof t("foo")!="symbol"||typeof Symbol("bar")!="symbol"?!1:r()},Oa}var Ma,Yi;function Wl(){return Yi||(Yi=1,Ma=typeof Reflect<"u"&&Reflect.getPrototypeOf||null),Ma}var Ra,Vi;function Ul(){if(Vi)return Ra;Vi=1;var t=ql();return Ra=t.getPrototypeOf||null,Ra}var Da,Ki;function bh(){if(Ki)return Da;Ki=1;var t="Function.prototype.bind called on incompatible ",r=Object.prototype.toString,n=Math.max,a="[object Function]",s=function(d,h){for(var c=[],p=0;p<d.length;p+=1)c[p]=d[p];for(var f=0;f<h.length;f+=1)c[f+d.length]=h[f];return c},i=function(d,h){for(var c=[],p=h,f=0;p<d.length;p+=1,f+=1)c[f]=d[p];return c},o=function(l,d){for(var h="",c=0;c<l.length;c+=1)h+=l[c],c+1<l.length&&(h+=d);return h};return Da=function(d){var h=this;if(typeof h!="function"||r.apply(h)!==a)throw new TypeError(t+h);for(var c=i(arguments,1),p,f=function(){if(this instanceof p){var T=h.apply(this,s(c,arguments));return Object(T)===T?T:this}return h.apply(d,s(c,arguments))},v=n(0,h.length-c.length),m=[],y=0;y<v;y++)m[y]="$"+y;if(p=Function("binder","return function ("+o(m,",")+"){ return binder.apply(this,arguments); }")(f),h.prototype){var g=function(){};g.prototype=h.prototype,p.prototype=new g,g.prototype=null}return p},Da}var Ba,Ji;function zn(){if(Ji)return Ba;Ji=1;var t=bh();return Ba=Function.prototype.bind||t,Ba}var Na,Qi;function Ns(){return Qi||(Qi=1,Na=Function.prototype.call),Na}var La,Xi;function Hl(){return Xi||(Xi=1,La=Function.prototype.apply),La}var ja,Zi;function wh(){return Zi||(Zi=1,ja=typeof Reflect<"u"&&Reflect&&Reflect.apply),ja}var Fa,eo;function Eh(){if(eo)return Fa;eo=1;var t=zn(),r=Hl(),n=Ns(),a=wh();return Fa=a||t.call(n,r),Fa}var za,to;function Yl(){if(to)return za;to=1;var t=zn(),r=nr(),n=Ns(),a=Eh();return za=function(i){if(i.length<1||typeof i[0]!="function")throw new r("a function is required");return a(t,n,i)},za}var $a,ro;function Th(){if(ro)return $a;ro=1;var t=Yl(),r=Gl(),n;try{n=[].__proto__===Array.prototype}catch(o){if(!o||typeof o!="object"||!("code"in o)||o.code!=="ERR_PROTO_ACCESS")throw o}var a=!!n&&r&&r(Object.prototype,"__proto__"),s=Object,i=s.getPrototypeOf;return $a=a&&typeof a.get=="function"?t([a.get]):typeof i=="function"?function(l){return i(l==null?l:s(l))}:!1,$a}var qa,no;function Sh(){if(no)return qa;no=1;var t=Wl(),r=Ul(),n=Th();return qa=t?function(s){return t(s)}:r?function(s){if(!s||typeof s!="object"&&typeof s!="function")throw new TypeError("getProto: not an object");return r(s)}:n?function(s){return n(s)}:null,qa}var Ga,ao;function Ph(){if(ao)return Ga;ao=1;var t=Function.prototype.call,r=Object.prototype.hasOwnProperty,n=zn();return Ga=n.call(t,r),Ga}var Wa,so;function Ls(){if(so)return Wa;so=1;var t,r=ql(),n=rh(),a=nh(),s=ah(),i=sh(),o=ih(),l=nr(),d=oh(),h=lh(),c=dh(),p=ch(),f=hh(),v=uh(),m=ph(),y=gh(),g=Function,T=function(oe){try{return g('"use strict"; return ('+oe+").constructor;")()}catch{}},E=Gl(),P=yh(),A=function(){throw new l},C=E?(function(){try{return arguments.callee,A}catch{try{return E(arguments,"callee").get}catch{return A}}})():A,M=xh()(),b=Sh(),_=Ul(),I=Wl(),R=Hl(),D=Ns(),L={},U=typeof Uint8Array>"u"||!b?t:b(Uint8Array),q={__proto__:null,"%AggregateError%":typeof AggregateError>"u"?t:AggregateError,"%Array%":Array,"%ArrayBuffer%":typeof ArrayBuffer>"u"?t:ArrayBuffer,"%ArrayIteratorPrototype%":M&&b?b([][Symbol.iterator]()):t,"%AsyncFromSyncIteratorPrototype%":t,"%AsyncFunction%":L,"%AsyncGenerator%":L,"%AsyncGeneratorFunction%":L,"%AsyncIteratorPrototype%":L,"%Atomics%":typeof Atomics>"u"?t:Atomics,"%BigInt%":typeof BigInt>"u"?t:BigInt,"%BigInt64Array%":typeof BigInt64Array>"u"?t:BigInt64Array,"%BigUint64Array%":typeof BigUint64Array>"u"?t:BigUint64Array,"%Boolean%":Boolean,"%DataView%":typeof DataView>"u"?t:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":n,"%eval%":eval,"%EvalError%":a,"%Float16Array%":typeof Float16Array>"u"?t:Float16Array,"%Float32Array%":typeof Float32Array>"u"?t:Float32Array,"%Float64Array%":typeof Float64Array>"u"?t:Float64Array,"%FinalizationRegistry%":typeof FinalizationRegistry>"u"?t:FinalizationRegistry,"%Function%":g,"%GeneratorFunction%":L,"%Int8Array%":typeof Int8Array>"u"?t:Int8Array,"%Int16Array%":typeof Int16Array>"u"?t:Int16Array,"%Int32Array%":typeof Int32Array>"u"?t:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":M&&b?b(b([][Symbol.iterator]())):t,"%JSON%":typeof JSON=="object"?JSON:t,"%Map%":typeof Map>"u"?t:Map,"%MapIteratorPrototype%":typeof Map>"u"||!M||!b?t:b(new Map()[Symbol.iterator]()),"%Math%":Math,"%Number%":Number,"%Object%":r,"%Object.getOwnPropertyDescriptor%":E,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":typeof Promise>"u"?t:Promise,"%Proxy%":typeof Proxy>"u"?t:Proxy,"%RangeError%":s,"%ReferenceError%":i,"%Reflect%":typeof Reflect>"u"?t:Reflect,"%RegExp%":RegExp,"%Set%":typeof Set>"u"?t:Set,"%SetIteratorPrototype%":typeof Set>"u"||!M||!b?t:b(new Set()[Symbol.iterator]()),"%SharedArrayBuffer%":typeof SharedArrayBuffer>"u"?t:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":M&&b?b(""[Symbol.iterator]()):t,"%Symbol%":M?Symbol:t,"%SyntaxError%":o,"%ThrowTypeError%":C,"%TypedArray%":U,"%TypeError%":l,"%Uint8Array%":typeof Uint8Array>"u"?t:Uint8Array,"%Uint8ClampedArray%":typeof Uint8ClampedArray>"u"?t:Uint8ClampedArray,"%Uint16Array%":typeof Uint16Array>"u"?t:Uint16Array,"%Uint32Array%":typeof Uint32Array>"u"?t:Uint32Array,"%URIError%":d,"%WeakMap%":typeof WeakMap>"u"?t:WeakMap,"%WeakRef%":typeof WeakRef>"u"?t:WeakRef,"%WeakSet%":typeof WeakSet>"u"?t:WeakSet,"%Function.prototype.call%":D,"%Function.prototype.apply%":R,"%Object.defineProperty%":P,"%Object.getPrototypeOf%":_,"%Math.abs%":h,"%Math.floor%":c,"%Math.max%":p,"%Math.min%":f,"%Math.pow%":v,"%Math.round%":m,"%Math.sign%":y,"%Reflect.getPrototypeOf%":I};if(b)try{null.error}catch(oe){var Q=b(b(oe));q["%Error.prototype%"]=Q}var F=function oe($){var re;if($==="%AsyncFunction%")re=T("async function () {}");else if($==="%GeneratorFunction%")re=T("function* () {}");else if($==="%AsyncGeneratorFunction%")re=T("async function* () {}");else if($==="%AsyncGenerator%"){var V=oe("%AsyncGeneratorFunction%");V&&(re=V.prototype)}else if($==="%AsyncIteratorPrototype%"){var ne=oe("%AsyncGenerator%");ne&&b&&(re=b(ne.prototype))}return q[$]=re,re},Y={__proto__:null,"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},O=zn(),me=Ph(),De=O.call(D,Array.prototype.concat),dt=O.call(R,Array.prototype.splice),Ge=O.call(D,String.prototype.replace),We=O.call(D,String.prototype.slice),Ue=O.call(D,RegExp.prototype.exec),Be=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,xe=/\\(\\)?/g,He=function($){var re=We($,0,1),V=We($,-1);if(re==="%"&&V!=="%")throw new o("invalid intrinsic syntax, expected closing `%`");if(V==="%"&&re!=="%")throw new o("invalid intrinsic syntax, expected opening `%`");var ne=[];return Ge($,Be,function(de,be,ce,fe){ne[ne.length]=ce?Ge(fe,xe,"$1"):be||de}),ne},Ye=function($,re){var V=$,ne;if(me(Y,V)&&(ne=Y[V],V="%"+ne[0]+"%"),me(q,V)){var de=q[V];if(de===L&&(de=F(V)),typeof de>"u"&&!re)throw new l("intrinsic "+$+" exists, but is not available. Please file an issue!");return{alias:ne,name:V,value:de}}throw new o("intrinsic "+$+" does not exist!")};return Wa=function($,re){if(typeof $!="string"||$.length===0)throw new l("intrinsic name must be a non-empty string");if(arguments.length>1&&typeof re!="boolean")throw new l('"allowMissing" argument must be a boolean');if(Ue(/^%?[^%]*%?$/,$)===null)throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var V=He($),ne=V.length>0?V[0]:"",de=Ye("%"+ne+"%",re),be=de.name,ce=de.value,fe=!1,we=de.alias;we&&(ne=we[0],dt(V,De([0,1],we)));for(var _t=1,Ve=!0;_t<V.length;_t+=1){var ke=V[_t],At=We(ke,0,1),Ct=We(ke,-1);if((At==='"'||At==="'"||At==="`"||Ct==='"'||Ct==="'"||Ct==="`")&&At!==Ct)throw new o("property names with quotes must have matching quotes");if((ke==="constructor"||!Ve)&&(fe=!0),ne+="."+ke,be="%"+ne+"%",me(q,be))ce=q[be];else if(ce!=null){if(!(ke in ce)){if(!re)throw new l("base intrinsic for "+$+" exists, but the property is not available.");return}if(E&&_t+1>=V.length){var It=E(ce,ke);Ve=!!It,Ve&&"get"in It&&!("originalValue"in It.get)?ce=It.get:ce=ce[ke]}else Ve=me(ce,ke),ce=ce[ke];Ve&&!fe&&(q[be]=ce)}}return ce},Wa}var Ua,io;function Vl(){if(io)return Ua;io=1;var t=Ls(),r=Yl(),n=r([t("%String.prototype.indexOf%")]);return Ua=function(s,i){var o=t(s,!!i);return typeof o=="function"&&n(s,".prototype.")>-1?r([o]):o},Ua}var Ha,oo;function Kl(){if(oo)return Ha;oo=1;var t=Ls(),r=Vl(),n=Fn(),a=nr(),s=t("%Map%",!0),i=r("Map.prototype.get",!0),o=r("Map.prototype.set",!0),l=r("Map.prototype.has",!0),d=r("Map.prototype.delete",!0),h=r("Map.prototype.size",!0);return Ha=!!s&&function(){var p,f={assert:function(v){if(!f.has(v))throw new a("Side channel does not contain "+n(v))},delete:function(v){if(p){var m=d(p,v);return h(p)===0&&(p=void 0),m}return!1},get:function(v){if(p)return i(p,v)},has:function(v){return p?l(p,v):!1},set:function(v,m){p||(p=new s),o(p,v,m)}};return f},Ha}var Ya,lo;function kh(){if(lo)return Ya;lo=1;var t=Ls(),r=Vl(),n=Fn(),a=Kl(),s=nr(),i=t("%WeakMap%",!0),o=r("WeakMap.prototype.get",!0),l=r("WeakMap.prototype.set",!0),d=r("WeakMap.prototype.has",!0),h=r("WeakMap.prototype.delete",!0);return Ya=i?function(){var p,f,v={assert:function(m){if(!v.has(m))throw new s("Side channel does not contain "+n(m))},delete:function(m){if(i&&m&&(typeof m=="object"||typeof m=="function")){if(p)return h(p,m)}else if(a&&f)return f.delete(m);return!1},get:function(m){return i&&m&&(typeof m=="object"||typeof m=="function")&&p?o(p,m):f&&f.get(m)},has:function(m){return i&&m&&(typeof m=="object"||typeof m=="function")&&p?d(p,m):!!f&&f.has(m)},set:function(m,y){i&&m&&(typeof m=="object"||typeof m=="function")?(p||(p=new i),l(p,m,y)):a&&(f||(f=a()),f.set(m,y))}};return v}:a,Ya}var Va,co;function Jl(){if(co)return Va;co=1;var t=nr(),r=Fn(),n=th(),a=Kl(),s=kh(),i=s||a||n;return Va=function(){var l,d={assert:function(h){if(!d.has(h))throw new t("Side channel does not contain "+r(h))},delete:function(h){return!!l&&l.delete(h)},get:function(h){return l&&l.get(h)},has:function(h){return!!l&&l.has(h)},set:function(h,c){l||(l=i()),l.set(h,c)}};return d},Va}var Ka,ho;function js(){if(ho)return Ka;ho=1;var t=String.prototype.replace,r=/%20/g,n={RFC1738:"RFC1738",RFC3986:"RFC3986"};return Ka={default:n.RFC3986,formatters:{RFC1738:function(a){return t.call(a,r,"+")},RFC3986:function(a){return String(a)}},RFC1738:n.RFC1738,RFC3986:n.RFC3986},Ka}var Ja,uo;function Ql(){if(uo)return Ja;uo=1;var t=js(),r=Jl(),n=Object.prototype.hasOwnProperty,a=Array.isArray,s=r(),i=function(b,_){return s.set(b,_),b},o=function(b){return s.has(b)},l=function(b){return s.get(b)},d=function(b,_){s.set(b,_)},h=(function(){for(var M=[],b=0;b<256;++b)M.push("%"+((b<16?"0":"")+b.toString(16)).toUpperCase());return M})(),c=function(b){for(;b.length>1;){var _=b.pop(),I=_.obj[_.prop];if(a(I)){for(var R=[],D=0;D<I.length;++D)typeof I[D]<"u"&&R.push(I[D]);_.obj[_.prop]=R}}},p=function(b,_){for(var I=_&&_.plainObjects?{__proto__:null}:{},R=0;R<b.length;++R)typeof b[R]<"u"&&(I[R]=b[R]);return I},f=function M(b,_,I){if(!_)return b;if(typeof _!="object"&&typeof _!="function"){if(a(b))b.push(_);else if(b&&typeof b=="object")if(o(b)){var R=l(b)+1;b[R]=_,d(b,R)}else(I&&(I.plainObjects||I.allowPrototypes)||!n.call(Object.prototype,_))&&(b[_]=!0);else return[b,_];return b}if(!b||typeof b!="object"){if(o(_)){for(var D=Object.keys(_),L=I&&I.plainObjects?{__proto__:null,0:b}:{0:b},U=0;U<D.length;U++){var q=parseInt(D[U],10);L[q+1]=_[D[U]]}return i(L,l(_)+1)}return[b].concat(_)}var Q=b;return a(b)&&!a(_)&&(Q=p(b,I)),a(b)&&a(_)?(_.forEach(function(F,Y){if(n.call(b,Y)){var O=b[Y];O&&typeof O=="object"&&F&&typeof F=="object"?b[Y]=M(O,F,I):b.push(F)}else b[Y]=F}),b):Object.keys(_).reduce(function(F,Y){var O=_[Y];return n.call(F,Y)?F[Y]=M(F[Y],O,I):F[Y]=O,F},Q)},v=function(b,_){return Object.keys(_).reduce(function(I,R){return I[R]=_[R],I},b)},m=function(M,b,_){var I=M.replace(/\+/g," ");if(_==="iso-8859-1")return I.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(I)}catch{return I}},y=1024,g=function(b,_,I,R,D){if(b.length===0)return b;var L=b;if(typeof b=="symbol"?L=Symbol.prototype.toString.call(b):typeof b!="string"&&(L=String(b)),I==="iso-8859-1")return escape(L).replace(/%u[0-9a-f]{4}/gi,function(me){return"%26%23"+parseInt(me.slice(2),16)+"%3B"});for(var U="",q=0;q<L.length;q+=y){for(var Q=L.length>=y?L.slice(q,q+y):L,F=[],Y=0;Y<Q.length;++Y){var O=Q.charCodeAt(Y);if(O===45||O===46||O===95||O===126||O>=48&&O<=57||O>=65&&O<=90||O>=97&&O<=122||D===t.RFC1738&&(O===40||O===41)){F[F.length]=Q.charAt(Y);continue}if(O<128){F[F.length]=h[O];continue}if(O<2048){F[F.length]=h[192|O>>6]+h[128|O&63];continue}if(O<55296||O>=57344){F[F.length]=h[224|O>>12]+h[128|O>>6&63]+h[128|O&63];continue}Y+=1,O=65536+((O&1023)<<10|Q.charCodeAt(Y)&1023),F[F.length]=h[240|O>>18]+h[128|O>>12&63]+h[128|O>>6&63]+h[128|O&63]}U+=F.join("")}return U},T=function(b){for(var _=[{obj:{o:b},prop:"o"}],I=[],R=0;R<_.length;++R)for(var D=_[R],L=D.obj[D.prop],U=Object.keys(L),q=0;q<U.length;++q){var Q=U[q],F=L[Q];typeof F=="object"&&F!==null&&I.indexOf(F)===-1&&(_.push({obj:L,prop:Q}),I.push(F))}return c(_),b},E=function(b){return Object.prototype.toString.call(b)==="[object RegExp]"},P=function(b){return!b||typeof b!="object"?!1:!!(b.constructor&&b.constructor.isBuffer&&b.constructor.isBuffer(b))},A=function(b,_,I,R){if(o(b)){var D=l(b)+1;return b[D]=_,d(b,D),b}var L=[].concat(b,_);return L.length>I?i(p(L,{plainObjects:R}),L.length-1):L},C=function(b,_){if(a(b)){for(var I=[],R=0;R<b.length;R+=1)I.push(_(b[R]));return I}return _(b)};return Ja={arrayToObject:p,assign:v,combine:A,compact:T,decode:m,encode:g,isBuffer:P,isOverflow:o,isRegExp:E,maybeMap:C,merge:f},Ja}var Qa,po;function _h(){if(po)return Qa;po=1;var t=Jl(),r=Ql(),n=js(),a=Object.prototype.hasOwnProperty,s={brackets:function(g){return g+"[]"},comma:"comma",indices:function(g,T){return g+"["+T+"]"},repeat:function(g){return g}},i=Array.isArray,o=Array.prototype.push,l=function(y,g){o.apply(y,i(g)?g:[g])},d=Date.prototype.toISOString,h=n.default,c={addQueryPrefix:!1,allowDots:!1,allowEmptyArrays:!1,arrayFormat:"indices",charset:"utf-8",charsetSentinel:!1,commaRoundTrip:!1,delimiter:"&",encode:!0,encodeDotInKeys:!1,encoder:r.encode,encodeValuesOnly:!1,filter:void 0,format:h,formatter:n.formatters[h],indices:!1,serializeDate:function(g){return d.call(g)},skipNulls:!1,strictNullHandling:!1},p=function(g){return typeof g=="string"||typeof g=="number"||typeof g=="boolean"||typeof g=="symbol"||typeof g=="bigint"},f={},v=function y(g,T,E,P,A,C,M,b,_,I,R,D,L,U,q,Q,F,Y){for(var O=g,me=Y,De=0,dt=!1;(me=me.get(f))!==void 0&&!dt;){var Ge=me.get(g);if(De+=1,typeof Ge<"u"){if(Ge===De)throw new RangeError("Cyclic object value");dt=!0}typeof me.get(f)>"u"&&(De=0)}if(typeof I=="function"?O=I(T,O):O instanceof Date?O=L(O):E==="comma"&&i(O)&&(O=r.maybeMap(O,function(be){return be instanceof Date?L(be):be})),O===null){if(C)return _&&!Q?_(T,c.encoder,F,"key",U):T;O=""}if(p(O)||r.isBuffer(O)){if(_){var We=Q?T:_(T,c.encoder,F,"key",U);return[q(We)+"="+q(_(O,c.encoder,F,"value",U))]}return[q(T)+"="+q(String(O))]}var Ue=[];if(typeof O>"u")return Ue;var Be;if(E==="comma"&&i(O))Q&&_&&(O=r.maybeMap(O,_)),Be=[{value:O.length>0?O.join(",")||null:void 0}];else if(i(I))Be=I;else{var xe=Object.keys(O);Be=R?xe.sort(R):xe}var He=b?String(T).replace(/\./g,"%2E"):String(T),Ye=P&&i(O)&&O.length===1?He+"[]":He;if(A&&i(O)&&O.length===0)return Ye+"[]";for(var oe=0;oe<Be.length;++oe){var $=Be[oe],re=typeof $=="object"&&$&&typeof $.value<"u"?$.value:O[$];if(!(M&&re===null)){var V=D&&b?String($).replace(/\./g,"%2E"):String($),ne=i(O)?typeof E=="function"?E(Ye,V):Ye:Ye+(D?"."+V:"["+V+"]");Y.set(g,De);var de=t();de.set(f,Y),l(Ue,y(re,ne,E,P,A,C,M,b,E==="comma"&&Q&&i(O)?null:_,I,R,D,L,U,q,Q,F,de))}}return Ue},m=function(g){if(!g)return c;if(typeof g.allowEmptyArrays<"u"&&typeof g.allowEmptyArrays!="boolean")throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");if(typeof g.encodeDotInKeys<"u"&&typeof g.encodeDotInKeys!="boolean")throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");if(g.encoder!==null&&typeof g.encoder<"u"&&typeof g.encoder!="function")throw new TypeError("Encoder has to be a function.");var T=g.charset||c.charset;if(typeof g.charset<"u"&&g.charset!=="utf-8"&&g.charset!=="iso-8859-1")throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var E=n.default;if(typeof g.format<"u"){if(!a.call(n.formatters,g.format))throw new TypeError("Unknown format option provided.");E=g.format}var P=n.formatters[E],A=c.filter;(typeof g.filter=="function"||i(g.filter))&&(A=g.filter);var C;if(g.arrayFormat in s?C=g.arrayFormat:"indices"in g?C=g.indices?"indices":"repeat":C=c.arrayFormat,"commaRoundTrip"in g&&typeof g.commaRoundTrip!="boolean")throw new TypeError("`commaRoundTrip` must be a boolean, or absent");var M=typeof g.allowDots>"u"?g.encodeDotInKeys===!0?!0:c.allowDots:!!g.allowDots;return{addQueryPrefix:typeof g.addQueryPrefix=="boolean"?g.addQueryPrefix:c.addQueryPrefix,allowDots:M,allowEmptyArrays:typeof g.allowEmptyArrays=="boolean"?!!g.allowEmptyArrays:c.allowEmptyArrays,arrayFormat:C,charset:T,charsetSentinel:typeof g.charsetSentinel=="boolean"?g.charsetSentinel:c.charsetSentinel,commaRoundTrip:!!g.commaRoundTrip,delimiter:typeof g.delimiter>"u"?c.delimiter:g.delimiter,encode:typeof g.encode=="boolean"?g.encode:c.encode,encodeDotInKeys:typeof g.encodeDotInKeys=="boolean"?g.encodeDotInKeys:c.encodeDotInKeys,encoder:typeof g.encoder=="function"?g.encoder:c.encoder,encodeValuesOnly:typeof g.encodeValuesOnly=="boolean"?g.encodeValuesOnly:c.encodeValuesOnly,filter:A,format:E,formatter:P,serializeDate:typeof g.serializeDate=="function"?g.serializeDate:c.serializeDate,skipNulls:typeof g.skipNulls=="boolean"?g.skipNulls:c.skipNulls,sort:typeof g.sort=="function"?g.sort:null,strictNullHandling:typeof g.strictNullHandling=="boolean"?g.strictNullHandling:c.strictNullHandling}};return Qa=function(y,g){var T=y,E=m(g),P,A;typeof E.filter=="function"?(A=E.filter,T=A("",T)):i(E.filter)&&(A=E.filter,P=A);var C=[];if(typeof T!="object"||T===null)return"";var M=s[E.arrayFormat],b=M==="comma"&&E.commaRoundTrip;P||(P=Object.keys(T)),E.sort&&P.sort(E.sort);for(var _=t(),I=0;I<P.length;++I){var R=P[I],D=T[R];E.skipNulls&&D===null||l(C,v(D,R,M,b,E.allowEmptyArrays,E.strictNullHandling,E.skipNulls,E.encodeDotInKeys,E.encode?E.encoder:null,E.filter,E.sort,E.allowDots,E.serializeDate,E.format,E.formatter,E.encodeValuesOnly,E.charset,_))}var L=C.join(E.delimiter),U=E.addQueryPrefix===!0?"?":"";return E.charsetSentinel&&(E.charset==="iso-8859-1"?U+="utf8=%26%2310003%3B&":U+="utf8=%E2%9C%93&"),L.length>0?U+L:""},Qa}var Xa,mo;function Ah(){if(mo)return Xa;mo=1;var t=Ql(),r=Object.prototype.hasOwnProperty,n=Array.isArray,a={allowDots:!1,allowEmptyArrays:!1,allowPrototypes:!1,allowSparse:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decodeDotInKeys:!1,decoder:t.decode,delimiter:"&",depth:5,duplicates:"combine",ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictDepth:!1,strictNullHandling:!1,throwOnLimitExceeded:!1},s=function(v){return v.replace(/&#(\d+);/g,function(m,y){return String.fromCharCode(parseInt(y,10))})},i=function(v,m,y){if(v&&typeof v=="string"&&m.comma&&v.indexOf(",")>-1)return v.split(",");if(m.throwOnLimitExceeded&&y>=m.arrayLimit)throw new RangeError("Array limit exceeded. Only "+m.arrayLimit+" element"+(m.arrayLimit===1?"":"s")+" allowed in an array.");return v},o="utf8=%26%2310003%3B",l="utf8=%E2%9C%93",d=function(m,y){var g={__proto__:null},T=y.ignoreQueryPrefix?m.replace(/^\?/,""):m;T=T.replace(/%5B/gi,"[").replace(/%5D/gi,"]");var E=y.parameterLimit===1/0?void 0:y.parameterLimit,P=T.split(y.delimiter,y.throwOnLimitExceeded?E+1:E);if(y.throwOnLimitExceeded&&P.length>E)throw new RangeError("Parameter limit exceeded. Only "+E+" parameter"+(E===1?"":"s")+" allowed.");var A=-1,C,M=y.charset;if(y.charsetSentinel)for(C=0;C<P.length;++C)P[C].indexOf("utf8=")===0&&(P[C]===l?M="utf-8":P[C]===o&&(M="iso-8859-1"),A=C,C=P.length);for(C=0;C<P.length;++C)if(C!==A){var b=P[C],_=b.indexOf("]="),I=_===-1?b.indexOf("="):_+1,R,D;if(I===-1?(R=y.decoder(b,a.decoder,M,"key"),D=y.strictNullHandling?null:""):(R=y.decoder(b.slice(0,I),a.decoder,M,"key"),R!==null&&(D=t.maybeMap(i(b.slice(I+1),y,n(g[R])?g[R].length:0),function(U){return y.decoder(U,a.decoder,M,"value")}))),D&&y.interpretNumericEntities&&M==="iso-8859-1"&&(D=s(String(D))),b.indexOf("[]=")>-1&&(D=n(D)?[D]:D),R!==null){var L=r.call(g,R);L&&y.duplicates==="combine"?g[R]=t.combine(g[R],D,y.arrayLimit,y.plainObjects):(!L||y.duplicates==="last")&&(g[R]=D)}}return g},h=function(v,m,y,g){var T=0;if(v.length>0&&v[v.length-1]==="[]"){var E=v.slice(0,-1).join("");T=Array.isArray(m)&&m[E]?m[E].length:0}for(var P=g?m:i(m,y,T),A=v.length-1;A>=0;--A){var C,M=v[A];if(M==="[]"&&y.parseArrays)t.isOverflow(P)?C=P:C=y.allowEmptyArrays&&(P===""||y.strictNullHandling&&P===null)?[]:t.combine([],P,y.arrayLimit,y.plainObjects);else{C=y.plainObjects?{__proto__:null}:{};var b=M.charAt(0)==="["&&M.charAt(M.length-1)==="]"?M.slice(1,-1):M,_=y.decodeDotInKeys?b.replace(/%2E/g,"."):b,I=parseInt(_,10);!y.parseArrays&&_===""?C={0:P}:!isNaN(I)&&M!==_&&String(I)===_&&I>=0&&y.parseArrays&&I<=y.arrayLimit?(C=[],C[I]=P):_!=="__proto__"&&(C[_]=P)}P=C}return P},c=function(m,y){var g=y.allowDots?m.replace(/\.([^.[]+)/g,"[$1]"):m;if(y.depth<=0)return!y.plainObjects&&r.call(Object.prototype,g)&&!y.allowPrototypes?void 0:[g];var T=/(\[[^[\]]*])/,E=/(\[[^[\]]*])/g,P=T.exec(g),A=P?g.slice(0,P.index):g,C=[];if(A){if(!y.plainObjects&&r.call(Object.prototype,A)&&!y.allowPrototypes)return;C.push(A)}for(var M=0;(P=E.exec(g))!==null&&M<y.depth;){M+=1;var b=P[1].slice(1,-1);if(!y.plainObjects&&r.call(Object.prototype,b)&&!y.allowPrototypes)return;C.push(P[1])}if(P){if(y.strictDepth===!0)throw new RangeError("Input depth exceeded depth option of "+y.depth+" and strictDepth is true");C.push("["+g.slice(P.index)+"]")}return C},p=function(m,y,g,T){if(m){var E=c(m,g);if(E)return h(E,y,g,T)}},f=function(m){if(!m)return a;if(typeof m.allowEmptyArrays<"u"&&typeof m.allowEmptyArrays!="boolean")throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");if(typeof m.decodeDotInKeys<"u"&&typeof m.decodeDotInKeys!="boolean")throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");if(m.decoder!==null&&typeof m.decoder<"u"&&typeof m.decoder!="function")throw new TypeError("Decoder has to be a function.");if(typeof m.charset<"u"&&m.charset!=="utf-8"&&m.charset!=="iso-8859-1")throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");if(typeof m.throwOnLimitExceeded<"u"&&typeof m.throwOnLimitExceeded!="boolean")throw new TypeError("`throwOnLimitExceeded` option must be a boolean");var y=typeof m.charset>"u"?a.charset:m.charset,g=typeof m.duplicates>"u"?a.duplicates:m.duplicates;if(g!=="combine"&&g!=="first"&&g!=="last")throw new TypeError("The duplicates option must be either combine, first, or last");var T=typeof m.allowDots>"u"?m.decodeDotInKeys===!0?!0:a.allowDots:!!m.allowDots;return{allowDots:T,allowEmptyArrays:typeof m.allowEmptyArrays=="boolean"?!!m.allowEmptyArrays:a.allowEmptyArrays,allowPrototypes:typeof m.allowPrototypes=="boolean"?m.allowPrototypes:a.allowPrototypes,allowSparse:typeof m.allowSparse=="boolean"?m.allowSparse:a.allowSparse,arrayLimit:typeof m.arrayLimit=="number"?m.arrayLimit:a.arrayLimit,charset:y,charsetSentinel:typeof m.charsetSentinel=="boolean"?m.charsetSentinel:a.charsetSentinel,comma:typeof m.comma=="boolean"?m.comma:a.comma,decodeDotInKeys:typeof m.decodeDotInKeys=="boolean"?m.decodeDotInKeys:a.decodeDotInKeys,decoder:typeof m.decoder=="function"?m.decoder:a.decoder,delimiter:typeof m.delimiter=="string"||t.isRegExp(m.delimiter)?m.delimiter:a.delimiter,depth:typeof m.depth=="number"||m.depth===!1?+m.depth:a.depth,duplicates:g,ignoreQueryPrefix:m.ignoreQueryPrefix===!0,interpretNumericEntities:typeof m.interpretNumericEntities=="boolean"?m.interpretNumericEntities:a.interpretNumericEntities,parameterLimit:typeof m.parameterLimit=="number"?m.parameterLimit:a.parameterLimit,parseArrays:m.parseArrays!==!1,plainObjects:typeof m.plainObjects=="boolean"?m.plainObjects:a.plainObjects,strictDepth:typeof m.strictDepth=="boolean"?!!m.strictDepth:a.strictDepth,strictNullHandling:typeof m.strictNullHandling=="boolean"?m.strictNullHandling:a.strictNullHandling,throwOnLimitExceeded:typeof m.throwOnLimitExceeded=="boolean"?m.throwOnLimitExceeded:!1}};return Xa=function(v,m){var y=f(m);if(v===""||v===null||typeof v>"u")return y.plainObjects?{__proto__:null}:{};for(var g=typeof v=="string"?d(v,y):v,T=y.plainObjects?{__proto__:null}:{},E=Object.keys(g),P=0;P<E.length;++P){var A=E[P],C=p(A,g[A],y,typeof v=="string");T=t.merge(T,C,y)}return y.allowSparse===!0?T:t.compact(T)},Xa}var Za,go;function Ch(){if(go)return Za;go=1;var t=_h(),r=Ah(),n=js();return Za={formats:n,parse:r,stringify:t},Za}var Ih=Ch();const Fs=["apiKey","idempotencyKey","stripeAccount","apiVersion","maxNetworkRetries","timeout","host","authenticator","stripeContext","additionalHeaders","streaming"];function Xl(t){return t&&typeof t=="object"&&Fs.some(r=>Object.prototype.hasOwnProperty.call(t,r))}function $n(t,r){return Ih.stringify(t,{serializeDate:n=>Math.floor(n.getTime()/1e3).toString(),arrayFormat:"indices"}).replace(/%5B/g,"[").replace(/%5D/g,"]")}const Ts=(()=>{const t={"\n":"\\n",'"':'\\"',"\u2028":"\\u2028","\u2029":"\\u2029"};return r=>{const n=r.replace(/["\n\r\u2028\u2029]/g,a=>t[a]);return a=>n.replace(/\{([\s\S]+?)\}/g,(s,i)=>{const o=a[i];return Oh(o)?encodeURIComponent(o):""})}})();function Oh(t){return["number","string","boolean"].includes(typeof t)}function Mh(t){const r=t.match(/\{\w+\}/g);return r?r.map(n=>n.replace(/[{}]/g,"")):[]}function zs(t){if(!Array.isArray(t)||!t[0]||typeof t[0]!="object")return{};if(!Xl(t[0]))return t.shift();const r=Object.keys(t[0]),n=r.filter(a=>Fs.includes(a));return n.length>0&&n.length!==r.length&&Bn(`Options found in arguments (${n.join(", ")}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options.`),{}}function Zl(t){const r={host:null,headers:{},settings:{},streaming:!1};if(t.length>0){const n=t[t.length-1];if(typeof n=="string")r.authenticator=Ss(t.pop());else if(Xl(n)){const a=Object.assign({},t.pop()),s=Object.keys(a).filter(i=>!Fs.includes(i));if(s.length&&Bn(`Invalid options found (${s.join(", ")}); ignoring.`),a.apiKey&&(r.authenticator=Ss(a.apiKey)),a.idempotencyKey&&(r.headers["Idempotency-Key"]=a.idempotencyKey),a.stripeAccount&&(r.headers["Stripe-Account"]=a.stripeAccount),a.stripeContext){if(r.headers["Stripe-Account"])throw new Error("Can't specify both stripeAccount and stripeContext.");r.headers["Stripe-Context"]=a.stripeContext}if(a.apiVersion&&(r.headers["Stripe-Version"]=a.apiVersion),Number.isInteger(a.maxNetworkRetries)&&(r.settings.maxNetworkRetries=a.maxNetworkRetries),Number.isInteger(a.timeout)&&(r.settings.timeout=a.timeout),a.host&&(r.host=a.host),a.authenticator){if(a.apiKey)throw new Error("Can't specify both apiKey and authenticator.");if(typeof a.authenticator!="function")throw new Error("The authenticator must be a function receiving a request as the first parameter.");r.authenticator=a.authenticator}a.additionalHeaders&&(r.headers=a.additionalHeaders),a.streaming&&(r.streaming=!0)}}return r}function Rh(t){const r=this,n=Object.prototype.hasOwnProperty.call(t,"constructor")?t.constructor:function(...a){r.apply(this,a)};return Object.assign(n,r),n.prototype=Object.create(r.prototype),Object.assign(n.prototype,t),n}function es(t){if(typeof t!="object")throw new Error("Argument must be an object");return Object.keys(t).reduce((r,n)=>(t[n]!=null&&(r[n]=t[n]),r),{})}function Dh(t){return t&&typeof t=="object"?Object.keys(t).reduce((r,n)=>(r[Bh(n)]=t[n],r),{}):t}function Bh(t){return t.split("-").map(r=>r.charAt(0).toUpperCase()+r.substr(1).toLowerCase()).join("-")}function $s(t,r){return r?t.then(n=>{setTimeout(()=>{r(null,n)},0)},n=>{setTimeout(()=>{r(n,null)},0)}):t}function Nh(t){return t==="OAuth"?"oauth":t[0].toLowerCase()+t.substring(1)}function Bn(t){return typeof process.emitWarning!="function"?console.warn(`Stripe: ${t}`):process.emitWarning(t,"Stripe")}function Lh(t){const r=typeof t;return(r==="function"||r==="object")&&!!t}function jh(t){const r={},n=(a,s)=>{Object.entries(a).forEach(([i,o])=>{const l=s?`${s}[${i}]`:i;if(Lh(o)){if(!(o instanceof Uint8Array)&&!Object.prototype.hasOwnProperty.call(o,"data"))return n(o,l);r[l]=o}else r[l]=String(o)})};return n(t,null),r}function ts(t,r,n){if(!Number.isInteger(r)){if(n!==void 0)return n;throw new Error(`${t} must be an integer`)}return r}function Fh(){return typeof process>"u"?{}:{lang_version:process.version,platform:process.platform}}function Ss(t){const r=n=>(n.headers.Authorization="Bearer "+t,Promise.resolve());return r._apiKey=t,r}function zh(t,r){return this[t]instanceof Date?Math.floor(this[t].getTime()/1e3).toString():r}function $h(t){return JSON.stringify(t,zh)}function qs(t){return t&&t.startsWith("/v2")?"v2":"v1"}function Ps(t){return Array.isArray(t)?t.join(", "):String(t)}function qh(t){const r=Array.isArray(t)?t[0]:t;return Number(r)}function Gh(t){return Object.entries(t).map(([r,n])=>[r,Ps(n)])}class Se{getClientName(){throw new Error("getClientName not implemented.")}makeRequest(r,n,a,s,i,o,l,d){throw new Error("makeRequest not implemented.")}static makeTimeoutError(){const r=new TypeError(Se.TIMEOUT_ERROR_CODE);return r.code=Se.TIMEOUT_ERROR_CODE,r}}Se.CONNECTION_CLOSED_ERROR_CODES=["ECONNRESET","EPIPE"];Se.TIMEOUT_ERROR_CODE="ETIMEDOUT";class ed{constructor(r,n){this._statusCode=r,this._headers=n}getStatusCode(){return this._statusCode}getHeaders(){return this._headers}getRawResponse(){throw new Error("getRawResponse not implemented.")}toStream(r){throw new Error("toStream not implemented.")}toJSON(){throw new Error("toJSON not implemented.")}}class Nn extends Se{constructor(r){if(super(),!r){if(!globalThis.fetch)throw new Error("fetch() function not provided and is not defined in the global scope. You must provide a fetch implementation.");r=globalThis.fetch}globalThis.AbortController?this._fetchFn=Nn.makeFetchWithAbortTimeout(r):this._fetchFn=Nn.makeFetchWithRaceTimeout(r)}static makeFetchWithRaceTimeout(r){return(n,a,s)=>{let i;const o=new Promise((d,h)=>{i=setTimeout(()=>{i=null,h(Se.makeTimeoutError())},s)}),l=r(n,a);return Promise.race([l,o]).finally(()=>{i&&clearTimeout(i)})}}static makeFetchWithAbortTimeout(r){return async(n,a,s)=>{const i=new AbortController;let o=setTimeout(()=>{o=null,i.abort(Se.makeTimeoutError())},s);try{return await r(n,Object.assign(Object.assign({},a),{signal:i.signal}))}catch(l){throw l.name==="AbortError"?Se.makeTimeoutError():l}finally{o&&clearTimeout(o)}}}getClientName(){return"fetch"}async makeRequest(r,n,a,s,i,o,l,d){const h=l==="http",c=new URL(a,`${h?"http":"https"}://${r}`);c.port=n;const p=s=="POST"||s=="PUT"||s=="PATCH",f=o||(p?"":void 0),v=await this._fetchFn(c.toString(),{method:s,headers:Gh(i),body:f},d);return new Gs(v)}}class Gs extends ed{constructor(r){super(r.status,Gs._transformHeadersToObject(r.headers)),this._res=r}getRawResponse(){return this._res}toStream(r){return r(),this._res.body}toJSON(){return this._res.json()}static _transformHeadersToObject(r){const n={};for(const a of r){if(!Array.isArray(a)||a.length!=2)throw new Error("Response objects produced by the fetch function given to FetchHttpClient do not have an iterable headers map. Response#headers should be an iterable object.");n[a[0]]=a[1]}return n}}class td{computeHMACSignature(r,n){throw new Error("computeHMACSignature not implemented.")}computeHMACSignatureAsync(r,n){throw new Error("computeHMACSignatureAsync not implemented.")}computeSHA256Async(r){throw new Error("computeSHA256 not implemented.")}}class rd extends Error{}class Wh extends td{constructor(r){super(),this.subtleCrypto=r||crypto.subtle}computeHMACSignature(r,n){throw new rd("SubtleCryptoProvider cannot be used in a synchronous context.")}async computeHMACSignatureAsync(r,n){const a=new TextEncoder,s=await this.subtleCrypto.importKey("raw",a.encode(n),{name:"HMAC",hash:{name:"SHA-256"}},!1,["sign"]),i=await this.subtleCrypto.sign("hmac",s,a.encode(r)),o=new Uint8Array(i),l=new Array(o.length);for(let d=0;d<o.length;d++)l[d]=ks[o[d]];return l.join("")}async computeSHA256Async(r){return new Uint8Array(await this.subtleCrypto.digest("SHA-256",r))}}const ks=new Array(256);for(let t=0;t<ks.length;t++)ks[t]=t.toString(16).padStart(2,"0");class Uh{constructor(){this._fetchFn=null,this._agent=null}getUname(){throw new Error("getUname not implemented.")}uuid4(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,r=>{const n=Math.random()*16|0;return(r==="x"?n:n&3|8).toString(16)})}secureCompare(r,n){if(r.length!==n.length)return!1;const a=r.length;let s=0;for(let i=0;i<a;++i)s|=r.charCodeAt(i)^n.charCodeAt(i);return s===0}createEmitter(){throw new Error("createEmitter not implemented.")}tryBufferData(r){throw new Error("tryBufferData not implemented.")}createNodeHttpClient(r){throw new Error("createNodeHttpClient not implemented.")}createFetchHttpClient(r){return new Nn(r)}createDefaultHttpClient(){throw new Error("createDefaultHttpClient not implemented.")}createNodeCryptoProvider(){throw new Error("createNodeCryptoProvider not implemented.")}createSubtleCryptoProvider(r){return new Wh(r)}createDefaultCryptoProvider(){throw new Error("createDefaultCryptoProvider not implemented.")}}class Hh extends Event{constructor(r,n){super(r),this.data=n}}class Yh{constructor(){this.eventTarget=new EventTarget,this.listenerMapping=new Map}on(r,n){const a=s=>{n(s.data)};return this.listenerMapping.set(n,a),this.eventTarget.addEventListener(r,a)}removeListener(r,n){const a=this.listenerMapping.get(n);return this.listenerMapping.delete(n),this.eventTarget.removeEventListener(r,a)}once(r,n){const a=s=>{n(s.data)};return this.listenerMapping.set(n,a),this.eventTarget.addEventListener(r,a,{once:!0})}emit(r,n){return this.eventTarget.dispatchEvent(new Hh(r,n))}}class Vh extends Uh{getUname(){return Promise.resolve(null)}createEmitter(){return new Yh}tryBufferData(r){if(r.file.data instanceof ReadableStream)throw new Error("Uploading a file as a stream is not supported in non-Node environments. Please open or upvote an issue at github.com/stripe/stripe-node if you use this, detailing your use-case.");return Promise.resolve(r)}createNodeHttpClient(){throw new Error("Stripe: `createNodeHttpClient()` is not available in non-Node environments. Please use `createFetchHttpClient()` instead.")}createDefaultHttpClient(){return super.createFetchHttpClient()}createNodeCryptoProvider(){throw new Error("Stripe: `createNodeCryptoProvider()` is not available in non-Node environments. Please use `createSubtleCryptoProvider()` instead.")}createDefaultCryptoProvider(){return this.createSubtleCryptoProvider()}}const qn=t=>{switch(t.type){case"card_error":return new ad(t);case"invalid_request_error":return new Ws(t);case"api_error":return new Us(t);case"authentication_error":return new Hs(t);case"rate_limit_error":return new Ys(t);case"idempotency_error":return new od(t);case"invalid_grant":return new ld(t);default:return new dd(t)}},nd=t=>{switch(t.type){case"temporary_session_expired":return new cd(t)}switch(t.code){case"invalid_fields":return new Ws(t)}return qn(t)};class ue extends Error{constructor(r={},n=null){var a;super(r.message),this.type=n||this.constructor.name,this.raw=r,this.rawType=r.type,this.code=r.code,this.doc_url=r.doc_url,this.param=r.param,this.detail=r.detail,this.headers=r.headers,this.requestId=r.requestId,this.statusCode=r.statusCode,this.message=(a=r.message)!==null&&a!==void 0?a:"",this.userMessage=r.user_message,this.charge=r.charge,this.decline_code=r.decline_code,this.payment_intent=r.payment_intent,this.payment_method=r.payment_method,this.payment_method_type=r.payment_method_type,this.setup_intent=r.setup_intent,this.source=r.source}}ue.generate=qn;class ad extends ue{constructor(r={}){super(r,"StripeCardError")}}class Ws extends ue{constructor(r={}){super(r,"StripeInvalidRequestError")}}class Us extends ue{constructor(r={}){super(r,"StripeAPIError")}}class Hs extends ue{constructor(r={}){super(r,"StripeAuthenticationError")}}class sd extends ue{constructor(r={}){super(r,"StripePermissionError")}}class Ys extends ue{constructor(r={}){super(r,"StripeRateLimitError")}}class id extends ue{constructor(r={}){super(r,"StripeConnectionError")}}class tt extends ue{constructor(r,n,a={}){super(a,"StripeSignatureVerificationError"),this.header=r,this.payload=n}}class od extends ue{constructor(r={}){super(r,"StripeIdempotencyError")}}class ld extends ue{constructor(r={}){super(r,"StripeInvalidGrantError")}}class dd extends ue{constructor(r={}){super(r,"StripeUnknownError")}}class cd extends ue{constructor(r={}){super(r,"TemporarySessionExpiredError")}}const fo=Object.freeze(Object.defineProperty({__proto__:null,StripeAPIError:Us,StripeAuthenticationError:Hs,StripeCardError:ad,StripeConnectionError:id,StripeError:ue,StripeIdempotencyError:od,StripeInvalidGrantError:ld,StripeInvalidRequestError:Ws,StripePermissionError:sd,StripeRateLimitError:Ys,StripeSignatureVerificationError:tt,StripeUnknownError:dd,TemporarySessionExpiredError:cd,generateV1Error:qn,generateV2Error:nd},Symbol.toStringTag,{value:"Module"})),Kh=60;class Rr{constructor(r,n){this._stripe=r,this._maxBufferedRequestMetric=n}_normalizeStripeContext(r,n){return r?r.toString()||null:(n==null?void 0:n.toString())||null}_addHeadersDirectlyToObject(r,n){r.requestId=n["request-id"],r.stripeAccount=r.stripeAccount||n["stripe-account"],r.apiVersion=r.apiVersion||n["stripe-version"],r.idempotencyKey=r.idempotencyKey||n["idempotency-key"]}_makeResponseEvent(r,n,a){const s=Date.now(),i=s-r.request_start_time;return es({api_version:a["stripe-version"],account:a["stripe-account"],idempotency_key:a["idempotency-key"],method:r.method,path:r.path,status:n,request_id:this._getRequestId(a),elapsed:i,request_start_time:r.request_start_time,request_end_time:s})}_getRequestId(r){return r["request-id"]}_streamingResponseHandler(r,n,a){return s=>{const i=s.getHeaders(),o=()=>{const d=this._makeResponseEvent(r,s.getStatusCode(),i);this._stripe._emitter.emit("response",d),this._recordRequestMetrics(this._getRequestId(i),d.elapsed,n)},l=s.toStream(o);return this._addHeadersDirectlyToObject(l,i),a(null,l)}}_jsonResponseHandler(r,n,a,s){return i=>{const o=i.getHeaders(),l=this._getRequestId(o),d=i.getStatusCode(),h=this._makeResponseEvent(r,d,o);this._stripe._emitter.emit("response",h),i.toJSON().then(c=>{if(c.error){let p;throw typeof c.error=="string"&&(c.error={type:c.error,message:c.error_description}),c.error.headers=o,c.error.statusCode=d,c.error.requestId=l,d===401?p=new Hs(c.error):d===403?p=new sd(c.error):d===429?p=new Ys(c.error):n==="v2"?p=nd(c.error):p=qn(c.error),p}return c},c=>{throw new Us({message:"Invalid JSON received from the Stripe API",exception:c,requestId:o["request-id"]})}).then(c=>{this._recordRequestMetrics(l,h.elapsed,a);const p=i.getRawResponse();this._addHeadersDirectlyToObject(p,o),Object.defineProperty(c,"lastResponse",{enumerable:!1,writable:!1,value:p}),s(null,c)},c=>s(c,null))}}static _generateConnectionErrorMessage(r){return`An error occurred with our connection to Stripe.${r>0?` Request was retried ${r} times.`:""}`}static _shouldRetry(r,n,a,s){return s&&n===0&&Se.CONNECTION_CLOSED_ERROR_CODES.includes(s.code)?!0:n>=a?!1:r?r.getHeaders()["stripe-should-retry"]==="false"?!1:r.getHeaders()["stripe-should-retry"]==="true"||r.getStatusCode()===409||r.getStatusCode()>=500:!0}_getSleepTimeInMS(r,n=null){const a=this._stripe.getInitialNetworkRetryDelay(),s=this._stripe.getMaxNetworkRetryDelay();let i=Math.min(a*Math.pow(2,r-1),s);return i*=.5*(1+Math.random()),i=Math.max(a,i),Number.isInteger(n)&&n<=Kh&&(i=Math.max(i,n)),i*1e3}_getMaxNetworkRetries(r={}){return r.maxNetworkRetries!==void 0&&Number.isInteger(r.maxNetworkRetries)?r.maxNetworkRetries:this._stripe.getMaxNetworkRetries()}_defaultIdempotencyKey(r,n,a){const s=this._getMaxNetworkRetries(n),i=()=>`stripe-node-retry-${this._stripe._platformFunctions.uuid4()}`;if(a==="v2"){if(r==="POST"||r==="DELETE")return i()}else if(a==="v1"&&r==="POST"&&s>0)return i();return null}_makeHeaders({contentType:r,contentLength:n,apiVersion:a,clientUserAgent:s,method:i,userSuppliedHeaders:o,userSuppliedSettings:l,stripeAccount:d,stripeContext:h,apiMode:c}){const p={Accept:"application/json","Content-Type":r,"User-Agent":this._getUserAgentString(c),"X-Stripe-Client-User-Agent":s,"X-Stripe-Client-Telemetry":this._getTelemetryHeader(),"Stripe-Version":a,"Stripe-Account":d,"Stripe-Context":h,"Idempotency-Key":this._defaultIdempotencyKey(i,l,c)},f=i=="POST"||i=="PUT"||i=="PATCH";return(f||n)&&(f||Bn(`${i} method had non-zero contentLength but no payload is expected for this verb`),p["Content-Length"]=n),Object.assign(es(p),Dh(o))}_getUserAgentString(r){const n=this._stripe.getConstant("PACKAGE_VERSION"),a=this._stripe._appInfo?this._stripe.getAppInfoAsString():"";return`Stripe/${r} NodeBindings/${n} ${a}`.trim()}_getTelemetryHeader(){if(this._stripe.getTelemetryEnabled()&&this._stripe._prevRequestMetrics.length>0){const r=this._stripe._prevRequestMetrics.shift();return JSON.stringify({last_request_metrics:r})}}_recordRequestMetrics(r,n,a){if(this._stripe.getTelemetryEnabled()&&r)if(this._stripe._prevRequestMetrics.length>this._maxBufferedRequestMetric)Bn("Request metrics buffer is full, dropping telemetry message.");else{const s={request_id:r,request_duration_ms:n};a&&a.length>0&&(s.usage=a),this._stripe._prevRequestMetrics.push(s)}}_rawRequest(r,n,a,s,i){return new Promise((l,d)=>{let h;try{const m=r.toUpperCase();if(m!=="POST"&&a&&Object.keys(a).length!==0)throw new Error("rawRequest only supports params on POST requests. Please pass null and add your parameters to path.");const y=[].slice.call([a,s]),g=zs(y),T=m==="POST"?Object.assign({},g):null,E=Zl(y),P=E.headers,A=E.authenticator;h={requestMethod:m,requestPath:n,bodyData:T,queryData:{},authenticator:A,headers:P,host:E.host,streaming:!!E.streaming,settings:{},usage:i||["raw_request"]}}catch(m){d(m);return}function c(m,y){m?d(m):l(y)}const{headers:p,settings:f}=h,v=h.authenticator;this._request(h.requestMethod,h.host,n,h.bodyData,v,{headers:p,settings:f,streaming:h.streaming},h.usage,c)})}_getContentLength(r){return typeof r=="string"?new TextEncoder().encode(r).length:r.length}_request(r,n,a,s,i,o,l=[],d,h=null){var c;let p;i=(c=i??this._stripe._authenticator)!==null&&c!==void 0?c:null;const f=qs(a),v=(g,T,E,P,A)=>setTimeout(g,this._getSleepTimeInMS(P,A),T,E,P+1),m=(g,T,E)=>{const P=o.settings&&o.settings.timeout&&Number.isInteger(o.settings.timeout)&&o.settings.timeout>=0?o.settings.timeout:this._stripe.getApiField("timeout"),A={host:n||this._stripe.getApiField("host"),port:this._stripe.getApiField("port"),path:a,method:r,headers:Object.assign({},T),body:p,protocol:this._stripe.getApiField("protocol")};i(A).then(()=>{const C=this._stripe.getApiField("httpClient").makeRequest(A.host,A.port,A.path,A.method,A.headers,A.body,A.protocol,P),M=Date.now(),b=es({api_version:g,account:Ps(T["Stripe-Account"]),idempotency_key:Ps(T["Idempotency-Key"]),method:r,path:a,request_start_time:M}),_=E||0,I=this._getMaxNetworkRetries(o.settings||{});this._stripe._emitter.emit("request",b),C.then(R=>Rr._shouldRetry(R,_,I)?v(m,g,T,_,qh(R.getHeaders()["retry-after"])):o.streaming&&R.getStatusCode()<400?this._streamingResponseHandler(b,l,d)(R):this._jsonResponseHandler(b,f,l,d)(R)).catch(R=>{if(Rr._shouldRetry(null,_,I,R))return v(m,g,T,_,null);{const D=R.code&&R.code===Se.TIMEOUT_ERROR_CODE;return d(new id({message:D?`Request aborted due to timeout being reached (${P}ms)`:Rr._generateConnectionErrorMessage(_),detail:R}))}})}).catch(C=>{throw new ue({message:"Unable to authenticate the request",exception:C})})},y=(g,T)=>{if(g)return d(g);p=T,this._stripe.getClientUserAgent(E=>{var P,A,C;const M=this._stripe.getApiField("version"),b=this._makeHeaders({contentType:f=="v2"?"application/json":"application/x-www-form-urlencoded",contentLength:this._getContentLength(T),apiVersion:M,clientUserAgent:E,method:r,userSuppliedHeaders:(P=o.headers)!==null&&P!==void 0?P:null,userSuppliedSettings:(A=o.settings)!==null&&A!==void 0?A:{},stripeAccount:(C=o.stripeAccount)!==null&&C!==void 0?C:this._stripe.getApiField("stripeAccount"),stripeContext:this._normalizeStripeContext(o.stripeContext,this._stripe.getApiField("stripeContext")),apiMode:f});m(M,b,0)})};if(h)h(r,s,o.headers,y);else{let g;f=="v2"?g=s?$h(s):"":g=$n(s||{}),y(null,g)}}}class hd{constructor(r,n,a,s){this.index=0,this.pagePromise=r,this.promiseCache={currentPromise:null},this.requestArgs=n,this.spec=a,this.stripeResource=s}async iterate(r){if(!(r&&r.data&&typeof r.data.length=="number"))throw Error("Unexpected: Stripe API response does not have a well-formed `data` array.");const n=ud(this.requestArgs);if(this.index<r.data.length){const a=n?r.data.length-1-this.index:this.index,s=r.data[a];return this.index+=1,{value:s,done:!1}}else if(r.has_more){this.index=0,this.pagePromise=this.getNextPage(r);const a=await this.pagePromise;return this.iterate(a)}return{done:!0,value:void 0}}getNextPage(r){throw new Error("Unimplemented")}async _next(){return this.iterate(await this.pagePromise)}next(){if(this.promiseCache.currentPromise)return this.promiseCache.currentPromise;const r=(async()=>{const n=await this._next();return this.promiseCache.currentPromise=null,n})();return this.promiseCache.currentPromise=r,r}}class Jh extends hd{getNextPage(r){const n=ud(this.requestArgs),a=nu(r,n);return this.stripeResource._makeRequest(this.requestArgs,this.spec,{[n?"ending_before":"starting_after"]:a})}}class Qh extends hd{getNextPage(r){if(!r.next_page)throw Error("Unexpected: Stripe API response does not have a well-formed `next_page` field, but `has_more` was true.");return this.stripeResource._makeRequest(this.requestArgs,this.spec,{page:r.next_page})}}class Xh{constructor(r,n,a,s){this.currentPageIterator=(async()=>(await r).data[Symbol.iterator]())(),this.nextPageUrl=(async()=>(await r).next_page_url||null)(),this.requestArgs=n,this.spec=a,this.stripeResource=s}async turnPage(){const r=await this.nextPageUrl;if(!r)return null;this.spec.fullPath=r;const n=await this.stripeResource._makeRequest([],this.spec,{});return this.nextPageUrl=Promise.resolve(n.next_page_url),this.currentPageIterator=Promise.resolve(n.data[Symbol.iterator]()),this.currentPageIterator}async next(){{const a=(await this.currentPageIterator).next();if(!a.done)return{done:!1,value:a.value}}const r=await this.turnPage();if(!r)return{done:!0,value:void 0};const n=r.next();return n.done?{done:!0,value:void 0}:{done:!1,value:n.value}}}const Zh=(t,r,n,a)=>{const s=qs(n.fullPath||n.path);return s!=="v2"&&n.methodType==="search"?rs(new Qh(a,r,n,t)):s!=="v2"&&n.methodType==="list"?rs(new Jh(a,r,n,t)):s==="v2"&&n.methodType==="list"?rs(new Xh(a,r,n,t)):null},rs=t=>{const r=au((...s)=>t.next(...s)),n=su(r),a={autoPagingEach:r,autoPagingToArray:n,next:()=>t.next(),return:()=>({}),[eu()]:()=>a};return a};function eu(){return typeof Symbol<"u"&&Symbol.asyncIterator?Symbol.asyncIterator:"@@asyncIterator"}function tu(t){if(t.length<2)return null;const r=t[1];if(typeof r!="function")throw Error(`The second argument to autoPagingEach, if present, must be a callback function; received ${typeof r}`);return r}function ru(t){if(t.length===0)return;const r=t[0];if(typeof r!="function")throw Error(`The first argument to autoPagingEach, if present, must be a callback function; received ${typeof r}`);if(r.length===2)return r;if(r.length>2)throw Error(`The \`onItem\` callback function passed to autoPagingEach must accept at most two arguments; got ${r}`);return function(a,s){const i=r(a);s(i)}}function nu(t,r){const n=r?0:t.data.length-1,a=t.data[n],s=a&&a.id;if(!s)throw Error("Unexpected: No `id` found on the last item while auto-paging a list.");return s}function au(t){return function(){const n=[].slice.call(arguments),a=ru(n),s=tu(n);if(n.length>2)throw Error(`autoPagingEach takes up to two arguments; received ${n}`);const i=iu(t,a);return $s(i,s)}}function su(t){return function(n,a){const s=n&&n.limit;if(!s)throw Error("You must pass a `limit` option to autoPagingToArray, e.g., `autoPagingToArray({limit: 1000});`.");if(s>1e4)throw Error("You cannot specify a limit of more than 10,000 items to fetch in `autoPagingToArray`; use `autoPagingEach` to iterate through longer lists.");const i=new Promise((o,l)=>{const d=[];t(h=>{if(d.push(h),d.length>=s)return!1}).then(()=>{o(d)}).catch(l)});return $s(i,a)}}function iu(t,r){return new Promise((n,a)=>{function s(i){if(i.done){n();return}const o=i.value;return new Promise(l=>{r(o,l)}).then(l=>l===!1?s({done:!0,value:void 0}):t().then(s))}t().then(s).catch(a)})}function ud(t){const r=[].slice.call(t);return!!zs(r).ending_before}function ou(t){if(t.path!==void 0&&t.fullPath!==void 0)throw new Error(`Method spec specified both a 'path' (${t.path}) and a 'fullPath' (${t.fullPath}).`);return function(...r){const n=typeof r[r.length-1]=="function"&&r.pop();t.urlParams=Mh(t.fullPath||this.createResourcePathWithSymbols(t.path||""));const a=$s(this._makeRequest(r,t,{}),n);return Object.assign(a,Zh(this,r,t,a)),a}}u.extend=Rh;u.method=ou;u.MAX_BUFFERED_REQUEST_METRICS=100;function u(t,r){if(this._stripe=t,r)throw new Error("Support for curried url params was dropped in stripe-node v7.0.0. Instead, pass two ids.");this.basePath=Ts(this.basePath||t.getApiField("basePath")),this.resourcePath=this.path,this.path=Ts(this.path),this.initialize(...arguments)}u.prototype={_stripe:null,path:"",resourcePath:"",basePath:null,initialize(){},requestDataProcessor:null,validateRequest:null,createFullPath(t,r){const n=[this.basePath(r),this.path(r)];if(typeof t=="function"){const a=t(r);a&&n.push(a)}else n.push(t);return this._joinUrlParts(n)},createResourcePathWithSymbols(t){return t?`/${this._joinUrlParts([this.resourcePath,t])}`:`/${this.resourcePath}`},_joinUrlParts(t){return t.join("/").replace(/\/{2,}/g,"/")},_getRequestOpts(t,r,n){var a;const s=(r.method||"GET").toUpperCase(),i=r.usage||[],o=r.urlParams||[],l=r.encode||(b=>b),d=!!r.fullPath,h=Ts(d?r.fullPath:r.path||""),c=d?r.fullPath:this.createResourcePathWithSymbols(r.path),p=[].slice.call(t),f=o.reduce((b,_)=>{const I=p.shift();if(typeof I!="string")throw new Error(`Stripe: Argument "${_}" must be a string, but got: ${I} (on API request to \`${s} ${c}\`)`);return b[_]=I,b},{}),v=zs(p),m=l(Object.assign({},v,n)),y=Zl(p),g=y.host||r.host,T=!!r.streaming||!!y.streaming;if(p.filter(b=>b!=null).length)throw new Error(`Stripe: Unknown arguments (${p}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options. (on API request to ${s} \`${c}\`)`);const E=d?h(f):this.createFullPath(h,f),P=Object.assign(y.headers,r.headers);r.validator&&r.validator(m,{headers:P});const A=r.method==="GET"||r.method==="DELETE";return{requestMethod:s,requestPath:E,bodyData:A?null:m,queryData:A?m:{},authenticator:(a=y.authenticator)!==null&&a!==void 0?a:null,headers:P,host:g??null,streaming:T,settings:y.settings,usage:i}},_makeRequest(t,r,n){return new Promise((a,s)=>{var i;let o;try{o=this._getRequestOpts(t,r,n)}catch(f){s(f);return}function l(f,v){f?s(f):a(r.transformResponseData?r.transformResponseData(v):v)}const d=Object.keys(o.queryData).length===0,h=[o.requestPath,d?"":"?",$n(o.queryData,qs(o.requestPath))].join(""),{headers:c,settings:p}=o;this._stripe._requestSender._request(o.requestMethod,o.host,h,o.bodyData,o.authenticator,{headers:c,settings:p,streaming:o.streaming},o.usage,l,(i=this.requestDataProcessor)===null||i===void 0?void 0:i.bind(this))})}};class vt{constructor(r=[]){this._segments=[...r]}get segments(){return[...this._segments]}push(r){if(!r)throw new Error("Segment cannot be null or undefined");return new vt([...this._segments,r])}pop(){if(this._segments.length===0)throw new Error("Cannot pop from an empty context");return new vt(this._segments.slice(0,-1))}toString(){return this._segments.join("/")}static parse(r){return r?new vt(r.split("/")):new vt([])}}function lu(t){const r={DEFAULT_TOLERANCE:300,signature:null,constructEvent(c,p,f,v,m,y){try{if(!this.signature)throw new Error("ERR: missing signature helper, unable to verify");this.signature.verifyHeader(c,p,f,v||r.DEFAULT_TOLERANCE,m,y)}catch(T){throw T instanceof rd&&(T.message+="\nUse `await constructEventAsync(...)` instead of `constructEvent(...)`"),T}return c instanceof Uint8Array?JSON.parse(new TextDecoder("utf8").decode(c)):JSON.parse(c)},async constructEventAsync(c,p,f,v,m,y){if(!this.signature)throw new Error("ERR: missing signature helper, unable to verify");return await this.signature.verifyHeaderAsync(c,p,f,v||r.DEFAULT_TOLERANCE,m,y),c instanceof Uint8Array?JSON.parse(new TextDecoder("utf8").decode(c)):JSON.parse(c)},generateTestHeaderString:function(c){const p=h(c),f=p.signature||p.cryptoProvider.computeHMACSignature(p.payloadString,p.secret);return p.generateHeaderString(f)},generateTestHeaderStringAsync:async function(c){const p=h(c),f=p.signature||await p.cryptoProvider.computeHMACSignatureAsync(p.payloadString,p.secret);return p.generateHeaderString(f)}},n={EXPECTED_SCHEME:"v1",verifyHeader(c,p,f,v,m,y){const{decodedHeader:g,decodedPayload:T,details:E,suspectPayloadType:P}=s(c,p,this.EXPECTED_SCHEME),A=/\s/.test(f);m=m||d();const C=m.computeHMACSignature(a(T,E),f);return i(T,g,E,C,v,P,A,y),!0},async verifyHeaderAsync(c,p,f,v,m,y){const{decodedHeader:g,decodedPayload:T,details:E,suspectPayloadType:P}=s(c,p,this.EXPECTED_SCHEME),A=/\s/.test(f);m=m||d();const C=await m.computeHMACSignatureAsync(a(T,E),f);return i(T,g,E,C,v,P,A,y)}};function a(c,p){return`${p.timestamp}.${c}`}function s(c,p,f){if(!c)throw new tt(p,c,{message:"No webhook payload was provided."});const v=typeof c!="string"&&!(c instanceof Uint8Array),m=new TextDecoder("utf8"),y=c instanceof Uint8Array?m.decode(c):c;if(Array.isArray(p))throw new Error("Unexpected: An array was passed as a header, which should not be possible for the stripe-signature header.");if(p==null||p=="")throw new tt(p,c,{message:"No stripe-signature header value was provided."});const g=p instanceof Uint8Array?m.decode(p):p,T=o(g,f);if(!T||T.timestamp===-1)throw new tt(g,y,{message:"Unable to extract timestamp and signatures from header"});if(!T.signatures.length)throw new tt(g,y,{message:"No signatures found with expected scheme"});return{decodedPayload:y,decodedHeader:g,details:T,suspectPayloadType:v}}function i(c,p,f,v,m,y,g,T){const E=!!f.signatures.filter(t.secureCompare.bind(t,v)).length,P=`
Learn more about webhook signing and explore webhook integration examples for various frameworks at https://docs.stripe.com/webhooks/signature`,A=g?`

Note: The provided signing secret contains whitespace. This often indicates an extra newline or space is in the value`:"";if(!E)throw y?new tt(p,c,{message:`Webhook payload must be provided as a string or a Buffer (https://nodejs.org/api/buffer.html) instance representing the _raw_ request body.Payload was provided as a parsed JavaScript object instead. 
Signature verification is impossible without access to the original signed material. 
`+P+`
`+A}):new tt(p,c,{message:`No signatures found matching the expected signature for payload. Are you passing the raw request body you received from Stripe? 
 If a webhook request is being forwarded by a third-party tool, ensure that the exact request body, including JSON formatting and new line style, is preserved.
`+P+`
`+A});const C=Math.floor((typeof T=="number"?T:Date.now())/1e3)-f.timestamp;if(m>0&&C>m)throw new tt(p,c,{message:"Timestamp outside the tolerance zone"});return!0}function o(c,p){return typeof c!="string"?null:c.split(",").reduce((f,v)=>{const m=v.split("=");return m[0]==="t"&&(f.timestamp=parseInt(m[1],10)),m[0]===p&&f.signatures.push(m[1]),f},{timestamp:-1,signatures:[]})}let l=null;function d(){return l||(l=t.createDefaultCryptoProvider()),l}function h(c){if(!c)throw new ue({message:"Options are required"});const p=Math.floor(c.timestamp)||Math.floor(Date.now()/1e3),f=c.scheme||n.EXPECTED_SCHEME,v=c.cryptoProvider||d(),m=`${p}.${c.payload}`,y=g=>`t=${p},${f}=${g}`;return Object.assign(Object.assign({},c),{timestamp:p,scheme:f,cryptoProvider:v,payloadString:m,generateHeaderString:y})}return r.signature=n,r}const pd="2025-12-15.clover";function du(t,r){for(const n in r){if(!Object.prototype.hasOwnProperty.call(r,n))continue;const a=n[0].toLowerCase()+n.substring(1),s=new r[n](t);this[a]=s}}function X(t,r){return function(n){return new du(n,r)}}const cu=u.method,hu=u.extend({create:cu({method:"POST",fullPath:"/v2/core/account_links"})}),yo=u.method,uu=u.extend({create:yo({method:"POST",fullPath:"/v2/core/account_tokens"}),retrieve:yo({method:"GET",fullPath:"/v2/core/account_tokens/{id}"})}),ht=u.method,pu=u.extend({retrieve:ht({method:"GET",fullPath:"/v1/financial_connections/accounts/{account}"}),list:ht({method:"GET",fullPath:"/v1/financial_connections/accounts",methodType:"list"}),disconnect:ht({method:"POST",fullPath:"/v1/financial_connections/accounts/{account}/disconnect"}),listOwners:ht({method:"GET",fullPath:"/v1/financial_connections/accounts/{account}/owners",methodType:"list"}),refresh:ht({method:"POST",fullPath:"/v1/financial_connections/accounts/{account}/refresh"}),subscribe:ht({method:"POST",fullPath:"/v1/financial_connections/accounts/{account}/subscribe"}),unsubscribe:ht({method:"POST",fullPath:"/v1/financial_connections/accounts/{account}/unsubscribe"})}),dr=u.method,mu=u.extend({create:dr({method:"POST",fullPath:"/v2/core/accounts/{account_id}/persons"}),retrieve:dr({method:"GET",fullPath:"/v2/core/accounts/{account_id}/persons/{id}"}),update:dr({method:"POST",fullPath:"/v2/core/accounts/{account_id}/persons/{id}"}),list:dr({method:"GET",fullPath:"/v2/core/accounts/{account_id}/persons",methodType:"list"}),del:dr({method:"DELETE",fullPath:"/v2/core/accounts/{account_id}/persons/{id}"})}),vo=u.method,gu=u.extend({create:vo({method:"POST",fullPath:"/v2/core/accounts/{account_id}/person_tokens"}),retrieve:vo({method:"GET",fullPath:"/v2/core/accounts/{account_id}/person_tokens/{id}"})}),cr=u.method,fu=u.extend({constructor:function(...t){u.apply(this,t),this.persons=new mu(...t),this.personTokens=new gu(...t)},create:cr({method:"POST",fullPath:"/v2/core/accounts"}),retrieve:cr({method:"GET",fullPath:"/v2/core/accounts/{id}"}),update:cr({method:"POST",fullPath:"/v2/core/accounts/{id}"}),list:cr({method:"GET",fullPath:"/v2/core/accounts",methodType:"list"}),close:cr({method:"POST",fullPath:"/v2/core/accounts/{id}/close"})}),xo=u.method,yu=u.extend({retrieve:xo({method:"GET",fullPath:"/v1/entitlements/active_entitlements/{id}"}),list:xo({method:"GET",fullPath:"/v1/entitlements/active_entitlements",methodType:"list"})}),Bt=u.method,vu=u.extend({create:Bt({method:"POST",fullPath:"/v1/billing/alerts"}),retrieve:Bt({method:"GET",fullPath:"/v1/billing/alerts/{id}"}),list:Bt({method:"GET",fullPath:"/v1/billing/alerts",methodType:"list"}),activate:Bt({method:"POST",fullPath:"/v1/billing/alerts/{id}/activate"}),archive:Bt({method:"POST",fullPath:"/v1/billing/alerts/{id}/archive"}),deactivate:Bt({method:"POST",fullPath:"/v1/billing/alerts/{id}/deactivate"})}),xu=u.method,bu=u.extend({find:xu({method:"GET",fullPath:"/v1/tax/associations/find"})}),hr=u.method,wu=u.extend({retrieve:hr({method:"GET",fullPath:"/v1/issuing/authorizations/{authorization}"}),update:hr({method:"POST",fullPath:"/v1/issuing/authorizations/{authorization}"}),list:hr({method:"GET",fullPath:"/v1/issuing/authorizations",methodType:"list"}),approve:hr({method:"POST",fullPath:"/v1/issuing/authorizations/{authorization}/approve"}),decline:hr({method:"POST",fullPath:"/v1/issuing/authorizations/{authorization}/decline"})}),ut=u.method,Eu=u.extend({create:ut({method:"POST",fullPath:"/v1/test_helpers/issuing/authorizations"}),capture:ut({method:"POST",fullPath:"/v1/test_helpers/issuing/authorizations/{authorization}/capture"}),expire:ut({method:"POST",fullPath:"/v1/test_helpers/issuing/authorizations/{authorization}/expire"}),finalizeAmount:ut({method:"POST",fullPath:"/v1/test_helpers/issuing/authorizations/{authorization}/finalize_amount"}),increment:ut({method:"POST",fullPath:"/v1/test_helpers/issuing/authorizations/{authorization}/increment"}),respond:ut({method:"POST",fullPath:"/v1/test_helpers/issuing/authorizations/{authorization}/fraud_challenges/respond"}),reverse:ut({method:"POST",fullPath:"/v1/test_helpers/issuing/authorizations/{authorization}/reverse"})}),ns=u.method,Tu=u.extend({create:ns({method:"POST",fullPath:"/v1/tax/calculations"}),retrieve:ns({method:"GET",fullPath:"/v1/tax/calculations/{calculation}"}),listLineItems:ns({method:"GET",fullPath:"/v1/tax/calculations/{calculation}/line_items",methodType:"list"})}),Xr=u.method,Su=u.extend({create:Xr({method:"POST",fullPath:"/v1/issuing/cardholders"}),retrieve:Xr({method:"GET",fullPath:"/v1/issuing/cardholders/{cardholder}"}),update:Xr({method:"POST",fullPath:"/v1/issuing/cardholders/{cardholder}"}),list:Xr({method:"GET",fullPath:"/v1/issuing/cardholders",methodType:"list"})}),Zr=u.method,Pu=u.extend({create:Zr({method:"POST",fullPath:"/v1/issuing/cards"}),retrieve:Zr({method:"GET",fullPath:"/v1/issuing/cards/{card}"}),update:Zr({method:"POST",fullPath:"/v1/issuing/cards/{card}"}),list:Zr({method:"GET",fullPath:"/v1/issuing/cards",methodType:"list"})}),ur=u.method,ku=u.extend({deliverCard:ur({method:"POST",fullPath:"/v1/test_helpers/issuing/cards/{card}/shipping/deliver"}),failCard:ur({method:"POST",fullPath:"/v1/test_helpers/issuing/cards/{card}/shipping/fail"}),returnCard:ur({method:"POST",fullPath:"/v1/test_helpers/issuing/cards/{card}/shipping/return"}),shipCard:ur({method:"POST",fullPath:"/v1/test_helpers/issuing/cards/{card}/shipping/ship"}),submitCard:ur({method:"POST",fullPath:"/v1/test_helpers/issuing/cards/{card}/shipping/submit"})}),en=u.method,_u=u.extend({create:en({method:"POST",fullPath:"/v1/billing_portal/configurations"}),retrieve:en({method:"GET",fullPath:"/v1/billing_portal/configurations/{configuration}"}),update:en({method:"POST",fullPath:"/v1/billing_portal/configurations/{configuration}"}),list:en({method:"GET",fullPath:"/v1/billing_portal/configurations",methodType:"list"})}),pr=u.method,Au=u.extend({create:pr({method:"POST",fullPath:"/v1/terminal/configurations"}),retrieve:pr({method:"GET",fullPath:"/v1/terminal/configurations/{configuration}"}),update:pr({method:"POST",fullPath:"/v1/terminal/configurations/{configuration}"}),list:pr({method:"GET",fullPath:"/v1/terminal/configurations",methodType:"list"}),del:pr({method:"DELETE",fullPath:"/v1/terminal/configurations/{configuration}"})}),Cu=u.method,Iu=u.extend({create:Cu({method:"POST",fullPath:"/v1/test_helpers/confirmation_tokens"})}),Ou=u.method,Mu=u.extend({create:Ou({method:"POST",fullPath:"/v1/terminal/connection_tokens"})}),Ru=u.method,Du=u.extend({retrieve:Ru({method:"GET",fullPath:"/v1/billing/credit_balance_summary"})}),bo=u.method,Bu=u.extend({retrieve:bo({method:"GET",fullPath:"/v1/billing/credit_balance_transactions/{id}"}),list:bo({method:"GET",fullPath:"/v1/billing/credit_balance_transactions",methodType:"list"})}),Nt=u.method,Nu=u.extend({create:Nt({method:"POST",fullPath:"/v1/billing/credit_grants"}),retrieve:Nt({method:"GET",fullPath:"/v1/billing/credit_grants/{id}"}),update:Nt({method:"POST",fullPath:"/v1/billing/credit_grants/{id}"}),list:Nt({method:"GET",fullPath:"/v1/billing/credit_grants",methodType:"list"}),expire:Nt({method:"POST",fullPath:"/v1/billing/credit_grants/{id}/expire"}),voidGrant:Nt({method:"POST",fullPath:"/v1/billing/credit_grants/{id}/void"})}),as=u.method,Lu=u.extend({create:as({method:"POST",fullPath:"/v1/treasury/credit_reversals"}),retrieve:as({method:"GET",fullPath:"/v1/treasury/credit_reversals/{credit_reversal}"}),list:as({method:"GET",fullPath:"/v1/treasury/credit_reversals",methodType:"list"})}),ju=u.method,Fu=u.extend({fundCashBalance:ju({method:"POST",fullPath:"/v1/test_helpers/customers/{customer}/fund_cash_balance"})}),ss=u.method,zu=u.extend({create:ss({method:"POST",fullPath:"/v1/treasury/debit_reversals"}),retrieve:ss({method:"GET",fullPath:"/v1/treasury/debit_reversals/{debit_reversal}"}),list:ss({method:"GET",fullPath:"/v1/treasury/debit_reversals",methodType:"list"})}),mr=u.method,$u=u.extend({create:mr({method:"POST",fullPath:"/v1/issuing/disputes"}),retrieve:mr({method:"GET",fullPath:"/v1/issuing/disputes/{dispute}"}),update:mr({method:"POST",fullPath:"/v1/issuing/disputes/{dispute}"}),list:mr({method:"GET",fullPath:"/v1/issuing/disputes",methodType:"list"}),submit:mr({method:"POST",fullPath:"/v1/issuing/disputes/{dispute}/submit"})}),wo=u.method,qu=u.extend({retrieve:wo({method:"GET",fullPath:"/v1/radar/early_fraud_warnings/{early_fraud_warning}"}),list:wo({method:"GET",fullPath:"/v1/radar/early_fraud_warnings",methodType:"list"})}),Qe=u.method,Gu=u.extend({create:Qe({method:"POST",fullPath:"/v2/core/event_destinations"}),retrieve:Qe({method:"GET",fullPath:"/v2/core/event_destinations/{id}"}),update:Qe({method:"POST",fullPath:"/v2/core/event_destinations/{id}"}),list:Qe({method:"GET",fullPath:"/v2/core/event_destinations",methodType:"list"}),del:Qe({method:"DELETE",fullPath:"/v2/core/event_destinations/{id}"}),disable:Qe({method:"POST",fullPath:"/v2/core/event_destinations/{id}/disable"}),enable:Qe({method:"POST",fullPath:"/v2/core/event_destinations/{id}/enable"}),ping:Qe({method:"POST",fullPath:"/v2/core/event_destinations/{id}/ping"})}),is=u.method,Wu=u.extend({retrieve(...t){return is({method:"GET",fullPath:"/v2/core/events/{id}",transformResponseData:n=>this.addFetchRelatedObjectIfNeeded(n)}).apply(this,t)},list(...t){return is({method:"GET",fullPath:"/v2/core/events",methodType:"list",transformResponseData:n=>Object.assign(Object.assign({},n),{data:n.data.map(this.addFetchRelatedObjectIfNeeded.bind(this))})}).apply(this,t)},addFetchRelatedObjectIfNeeded(t){return!t.related_object||!t.related_object.url?t:Object.assign(Object.assign({},t),{fetchRelatedObject:()=>is({method:"GET",fullPath:t.related_object.url}).apply(this,[{stripeContext:t.context}])})}}),tn=u.method,Uu=u.extend({create:tn({method:"POST",fullPath:"/v1/entitlements/features"}),retrieve:tn({method:"GET",fullPath:"/v1/entitlements/features/{id}"}),update:tn({method:"POST",fullPath:"/v1/entitlements/features/{id}"}),list:tn({method:"GET",fullPath:"/v1/entitlements/features",methodType:"list"})}),pt=u.method,Hu=u.extend({create:pt({method:"POST",fullPath:"/v1/treasury/financial_accounts"}),retrieve:pt({method:"GET",fullPath:"/v1/treasury/financial_accounts/{financial_account}"}),update:pt({method:"POST",fullPath:"/v1/treasury/financial_accounts/{financial_account}"}),list:pt({method:"GET",fullPath:"/v1/treasury/financial_accounts",methodType:"list"}),close:pt({method:"POST",fullPath:"/v1/treasury/financial_accounts/{financial_account}/close"}),retrieveFeatures:pt({method:"GET",fullPath:"/v1/treasury/financial_accounts/{financial_account}/features"}),updateFeatures:pt({method:"POST",fullPath:"/v1/treasury/financial_accounts/{financial_account}/features"})}),os=u.method,Yu=u.extend({fail:os({method:"POST",fullPath:"/v1/test_helpers/treasury/inbound_transfers/{id}/fail"}),returnInboundTransfer:os({method:"POST",fullPath:"/v1/test_helpers/treasury/inbound_transfers/{id}/return"}),succeed:os({method:"POST",fullPath:"/v1/test_helpers/treasury/inbound_transfers/{id}/succeed"})}),rn=u.method,Vu=u.extend({create:rn({method:"POST",fullPath:"/v1/treasury/inbound_transfers"}),retrieve:rn({method:"GET",fullPath:"/v1/treasury/inbound_transfers/{id}"}),list:rn({method:"GET",fullPath:"/v1/treasury/inbound_transfers",methodType:"list"}),cancel:rn({method:"POST",fullPath:"/v1/treasury/inbound_transfers/{inbound_transfer}/cancel"})}),gr=u.method,Ku=u.extend({create:gr({method:"POST",fullPath:"/v1/terminal/locations"}),retrieve:gr({method:"GET",fullPath:"/v1/terminal/locations/{location}"}),update:gr({method:"POST",fullPath:"/v1/terminal/locations/{location}"}),list:gr({method:"GET",fullPath:"/v1/terminal/locations",methodType:"list"}),del:gr({method:"DELETE",fullPath:"/v1/terminal/locations/{location}"})}),Ju=u.method,Qu=u.extend({create:Ju({method:"POST",fullPath:"/v1/billing/meter_event_adjustments"})}),Xu=u.method,Zu=u.extend({create:Xu({method:"POST",fullPath:"/v2/billing/meter_event_adjustments"})}),ep=u.method,tp=u.extend({create:ep({method:"POST",fullPath:"/v2/billing/meter_event_session"})}),rp=u.method,np=u.extend({create:rp({method:"POST",fullPath:"/v2/billing/meter_event_stream",host:"meter-events.stripe.com"})}),ap=u.method,sp=u.extend({create:ap({method:"POST",fullPath:"/v1/billing/meter_events"})}),ip=u.method,op=u.extend({create:ip({method:"POST",fullPath:"/v2/billing/meter_events"})}),mt=u.method,lp=u.extend({create:mt({method:"POST",fullPath:"/v1/billing/meters"}),retrieve:mt({method:"GET",fullPath:"/v1/billing/meters/{id}"}),update:mt({method:"POST",fullPath:"/v1/billing/meters/{id}"}),list:mt({method:"GET",fullPath:"/v1/billing/meters",methodType:"list"}),deactivate:mt({method:"POST",fullPath:"/v1/billing/meters/{id}/deactivate"}),listEventSummaries:mt({method:"GET",fullPath:"/v1/billing/meters/{id}/event_summaries",methodType:"list"}),reactivate:mt({method:"POST",fullPath:"/v1/billing/meters/{id}/reactivate"})}),dp=u.method,cp=u.extend({create:dp({method:"POST",fullPath:"/v1/terminal/onboarding_links"})}),fr=u.method,hp=u.extend({create:fr({method:"POST",fullPath:"/v1/climate/orders"}),retrieve:fr({method:"GET",fullPath:"/v1/climate/orders/{order}"}),update:fr({method:"POST",fullPath:"/v1/climate/orders/{order}"}),list:fr({method:"GET",fullPath:"/v1/climate/orders",methodType:"list"}),cancel:fr({method:"POST",fullPath:"/v1/climate/orders/{order}/cancel"})}),nn=u.method,up=u.extend({update:nn({method:"POST",fullPath:"/v1/test_helpers/treasury/outbound_payments/{id}"}),fail:nn({method:"POST",fullPath:"/v1/test_helpers/treasury/outbound_payments/{id}/fail"}),post:nn({method:"POST",fullPath:"/v1/test_helpers/treasury/outbound_payments/{id}/post"}),returnOutboundPayment:nn({method:"POST",fullPath:"/v1/test_helpers/treasury/outbound_payments/{id}/return"})}),an=u.method,pp=u.extend({create:an({method:"POST",fullPath:"/v1/treasury/outbound_payments"}),retrieve:an({method:"GET",fullPath:"/v1/treasury/outbound_payments/{id}"}),list:an({method:"GET",fullPath:"/v1/treasury/outbound_payments",methodType:"list"}),cancel:an({method:"POST",fullPath:"/v1/treasury/outbound_payments/{id}/cancel"})}),sn=u.method,mp=u.extend({update:sn({method:"POST",fullPath:"/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}"}),fail:sn({method:"POST",fullPath:"/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/fail"}),post:sn({method:"POST",fullPath:"/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/post"}),returnOutboundTransfer:sn({method:"POST",fullPath:"/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/return"})}),on=u.method,gp=u.extend({create:on({method:"POST",fullPath:"/v1/treasury/outbound_transfers"}),retrieve:on({method:"GET",fullPath:"/v1/treasury/outbound_transfers/{outbound_transfer}"}),list:on({method:"GET",fullPath:"/v1/treasury/outbound_transfers",methodType:"list"}),cancel:on({method:"POST",fullPath:"/v1/treasury/outbound_transfers/{outbound_transfer}/cancel"})}),ln=u.method,fp=u.extend({create:ln({method:"POST",fullPath:"/v1/issuing/personalization_designs"}),retrieve:ln({method:"GET",fullPath:"/v1/issuing/personalization_designs/{personalization_design}"}),update:ln({method:"POST",fullPath:"/v1/issuing/personalization_designs/{personalization_design}"}),list:ln({method:"GET",fullPath:"/v1/issuing/personalization_designs",methodType:"list"})}),ls=u.method,yp=u.extend({activate:ls({method:"POST",fullPath:"/v1/test_helpers/issuing/personalization_designs/{personalization_design}/activate"}),deactivate:ls({method:"POST",fullPath:"/v1/test_helpers/issuing/personalization_designs/{personalization_design}/deactivate"}),reject:ls({method:"POST",fullPath:"/v1/test_helpers/issuing/personalization_designs/{personalization_design}/reject"})}),Eo=u.method,vp=u.extend({retrieve:Eo({method:"GET",fullPath:"/v1/issuing/physical_bundles/{physical_bundle}"}),list:Eo({method:"GET",fullPath:"/v1/issuing/physical_bundles",methodType:"list"})}),To=u.method,xp=u.extend({retrieve:To({method:"GET",fullPath:"/v1/climate/products/{product}"}),list:To({method:"GET",fullPath:"/v1/climate/products",methodType:"list"})}),ve=u.method,bp=u.extend({create:ve({method:"POST",fullPath:"/v1/terminal/readers"}),retrieve:ve({method:"GET",fullPath:"/v1/terminal/readers/{reader}"}),update:ve({method:"POST",fullPath:"/v1/terminal/readers/{reader}"}),list:ve({method:"GET",fullPath:"/v1/terminal/readers",methodType:"list"}),del:ve({method:"DELETE",fullPath:"/v1/terminal/readers/{reader}"}),cancelAction:ve({method:"POST",fullPath:"/v1/terminal/readers/{reader}/cancel_action"}),collectInputs:ve({method:"POST",fullPath:"/v1/terminal/readers/{reader}/collect_inputs"}),collectPaymentMethod:ve({method:"POST",fullPath:"/v1/terminal/readers/{reader}/collect_payment_method"}),confirmPaymentIntent:ve({method:"POST",fullPath:"/v1/terminal/readers/{reader}/confirm_payment_intent"}),processPaymentIntent:ve({method:"POST",fullPath:"/v1/terminal/readers/{reader}/process_payment_intent"}),processSetupIntent:ve({method:"POST",fullPath:"/v1/terminal/readers/{reader}/process_setup_intent"}),refundPayment:ve({method:"POST",fullPath:"/v1/terminal/readers/{reader}/refund_payment"}),setReaderDisplay:ve({method:"POST",fullPath:"/v1/terminal/readers/{reader}/set_reader_display"})}),ds=u.method,wp=u.extend({presentPaymentMethod:ds({method:"POST",fullPath:"/v1/test_helpers/terminal/readers/{reader}/present_payment_method"}),succeedInputCollection:ds({method:"POST",fullPath:"/v1/test_helpers/terminal/readers/{reader}/succeed_input_collection"}),timeoutInputCollection:ds({method:"POST",fullPath:"/v1/test_helpers/terminal/readers/{reader}/timeout_input_collection"})}),Ep=u.method,Tp=u.extend({create:Ep({method:"POST",fullPath:"/v1/test_helpers/treasury/received_credits"})}),So=u.method,Sp=u.extend({retrieve:So({method:"GET",fullPath:"/v1/treasury/received_credits/{id}"}),list:So({method:"GET",fullPath:"/v1/treasury/received_credits",methodType:"list"})}),Pp=u.method,kp=u.extend({create:Pp({method:"POST",fullPath:"/v1/test_helpers/treasury/received_debits"})}),Po=u.method,_p=u.extend({retrieve:Po({method:"GET",fullPath:"/v1/treasury/received_debits/{id}"}),list:Po({method:"GET",fullPath:"/v1/treasury/received_debits",methodType:"list"})}),Ap=u.method,Cp=u.extend({expire:Ap({method:"POST",fullPath:"/v1/test_helpers/refunds/{refund}/expire"})}),dn=u.method,Ip=u.extend({create:dn({method:"POST",fullPath:"/v1/tax/registrations"}),retrieve:dn({method:"GET",fullPath:"/v1/tax/registrations/{id}"}),update:dn({method:"POST",fullPath:"/v1/tax/registrations/{id}"}),list:dn({method:"GET",fullPath:"/v1/tax/registrations",methodType:"list"})}),cs=u.method,Op=u.extend({create:cs({method:"POST",fullPath:"/v1/reporting/report_runs"}),retrieve:cs({method:"GET",fullPath:"/v1/reporting/report_runs/{report_run}"}),list:cs({method:"GET",fullPath:"/v1/reporting/report_runs",methodType:"list"})}),ko=u.method,Mp=u.extend({retrieve:ko({method:"GET",fullPath:"/v1/reporting/report_types/{report_type}"}),list:ko({method:"GET",fullPath:"/v1/reporting/report_types",methodType:"list"})}),hs=u.method,Rp=u.extend({create:hs({method:"POST",fullPath:"/v1/forwarding/requests"}),retrieve:hs({method:"GET",fullPath:"/v1/forwarding/requests/{id}"}),list:hs({method:"GET",fullPath:"/v1/forwarding/requests",methodType:"list"})}),_o=u.method,Dp=u.extend({retrieve:_o({method:"GET",fullPath:"/v1/sigma/scheduled_query_runs/{scheduled_query_run}"}),list:_o({method:"GET",fullPath:"/v1/sigma/scheduled_query_runs",methodType:"list"})}),cn=u.method,Bp=u.extend({create:cn({method:"POST",fullPath:"/v1/apps/secrets"}),list:cn({method:"GET",fullPath:"/v1/apps/secrets",methodType:"list"}),deleteWhere:cn({method:"POST",fullPath:"/v1/apps/secrets/delete"}),find:cn({method:"GET",fullPath:"/v1/apps/secrets/find"})}),Np=u.method,Lp=u.extend({create:Np({method:"POST",fullPath:"/v1/billing_portal/sessions"})}),Lt=u.method,jp=u.extend({create:Lt({method:"POST",fullPath:"/v1/checkout/sessions"}),retrieve:Lt({method:"GET",fullPath:"/v1/checkout/sessions/{session}"}),update:Lt({method:"POST",fullPath:"/v1/checkout/sessions/{session}"}),list:Lt({method:"GET",fullPath:"/v1/checkout/sessions",methodType:"list"}),expire:Lt({method:"POST",fullPath:"/v1/checkout/sessions/{session}/expire"}),listLineItems:Lt({method:"GET",fullPath:"/v1/checkout/sessions/{session}/line_items",methodType:"list"})}),Ao=u.method,Fp=u.extend({create:Ao({method:"POST",fullPath:"/v1/financial_connections/sessions"}),retrieve:Ao({method:"GET",fullPath:"/v1/financial_connections/sessions/{session}"})}),Co=u.method,zp=u.extend({retrieve:Co({method:"GET",fullPath:"/v1/tax/settings"}),update:Co({method:"POST",fullPath:"/v1/tax/settings"})}),Io=u.method,$p=u.extend({retrieve:Io({method:"GET",fullPath:"/v1/climate/suppliers/{supplier}"}),list:Io({method:"GET",fullPath:"/v1/climate/suppliers",methodType:"list"})}),yr=u.method,qp=u.extend({create:yr({method:"POST",fullPath:"/v1/test_helpers/test_clocks"}),retrieve:yr({method:"GET",fullPath:"/v1/test_helpers/test_clocks/{test_clock}"}),list:yr({method:"GET",fullPath:"/v1/test_helpers/test_clocks",methodType:"list"}),del:yr({method:"DELETE",fullPath:"/v1/test_helpers/test_clocks/{test_clock}"}),advance:yr({method:"POST",fullPath:"/v1/test_helpers/test_clocks/{test_clock}/advance"})}),us=u.method,Gp=u.extend({retrieve:us({method:"GET",fullPath:"/v1/issuing/tokens/{token}"}),update:us({method:"POST",fullPath:"/v1/issuing/tokens/{token}"}),list:us({method:"GET",fullPath:"/v1/issuing/tokens",methodType:"list"})}),Oo=u.method,Wp=u.extend({retrieve:Oo({method:"GET",fullPath:"/v1/treasury/transaction_entries/{id}"}),list:Oo({method:"GET",fullPath:"/v1/treasury/transaction_entries",methodType:"list"})}),Mo=u.method,Up=u.extend({retrieve:Mo({method:"GET",fullPath:"/v1/financial_connections/transactions/{transaction}"}),list:Mo({method:"GET",fullPath:"/v1/financial_connections/transactions",methodType:"list"})}),ps=u.method,Hp=u.extend({retrieve:ps({method:"GET",fullPath:"/v1/issuing/transactions/{transaction}"}),update:ps({method:"POST",fullPath:"/v1/issuing/transactions/{transaction}"}),list:ps({method:"GET",fullPath:"/v1/issuing/transactions",methodType:"list"})}),hn=u.method,Yp=u.extend({retrieve:hn({method:"GET",fullPath:"/v1/tax/transactions/{transaction}"}),createFromCalculation:hn({method:"POST",fullPath:"/v1/tax/transactions/create_from_calculation"}),createReversal:hn({method:"POST",fullPath:"/v1/tax/transactions/create_reversal"}),listLineItems:hn({method:"GET",fullPath:"/v1/tax/transactions/{transaction}/line_items",methodType:"list"})}),ms=u.method,Vp=u.extend({createForceCapture:ms({method:"POST",fullPath:"/v1/test_helpers/issuing/transactions/create_force_capture"}),createUnlinkedRefund:ms({method:"POST",fullPath:"/v1/test_helpers/issuing/transactions/create_unlinked_refund"}),refund:ms({method:"POST",fullPath:"/v1/test_helpers/issuing/transactions/{transaction}/refund"})}),Ro=u.method,Kp=u.extend({retrieve:Ro({method:"GET",fullPath:"/v1/treasury/transactions/{id}"}),list:Ro({method:"GET",fullPath:"/v1/treasury/transactions",methodType:"list"})}),un=u.method,Jp=u.extend({create:un({method:"POST",fullPath:"/v1/radar/value_list_items"}),retrieve:un({method:"GET",fullPath:"/v1/radar/value_list_items/{item}"}),list:un({method:"GET",fullPath:"/v1/radar/value_list_items",methodType:"list"}),del:un({method:"DELETE",fullPath:"/v1/radar/value_list_items/{item}"})}),vr=u.method,Qp=u.extend({create:vr({method:"POST",fullPath:"/v1/radar/value_lists"}),retrieve:vr({method:"GET",fullPath:"/v1/radar/value_lists/{value_list}"}),update:vr({method:"POST",fullPath:"/v1/radar/value_lists/{value_list}"}),list:vr({method:"GET",fullPath:"/v1/radar/value_lists",methodType:"list"}),del:vr({method:"DELETE",fullPath:"/v1/radar/value_lists/{value_list}"})}),Do=u.method,Xp=u.extend({retrieve:Do({method:"GET",fullPath:"/v1/identity/verification_reports/{report}"}),list:Do({method:"GET",fullPath:"/v1/identity/verification_reports",methodType:"list"})}),jt=u.method,Zp=u.extend({create:jt({method:"POST",fullPath:"/v1/identity/verification_sessions"}),retrieve:jt({method:"GET",fullPath:"/v1/identity/verification_sessions/{session}"}),update:jt({method:"POST",fullPath:"/v1/identity/verification_sessions/{session}"}),list:jt({method:"GET",fullPath:"/v1/identity/verification_sessions",methodType:"list"}),cancel:jt({method:"POST",fullPath:"/v1/identity/verification_sessions/{session}/cancel"}),redact:jt({method:"POST",fullPath:"/v1/identity/verification_sessions/{session}/redact"})}),Z=u.method,Bo=u.extend({create:Z({method:"POST",fullPath:"/v1/accounts"}),retrieve(t,...r){return typeof t=="string"?Z({method:"GET",fullPath:"/v1/accounts/{id}"}).apply(this,[t,...r]):(t==null&&[].shift.apply([t,...r]),Z({method:"GET",fullPath:"/v1/account"}).apply(this,[t,...r]))},update:Z({method:"POST",fullPath:"/v1/accounts/{account}"}),list:Z({method:"GET",fullPath:"/v1/accounts",methodType:"list"}),del:Z({method:"DELETE",fullPath:"/v1/accounts/{account}"}),createExternalAccount:Z({method:"POST",fullPath:"/v1/accounts/{account}/external_accounts"}),createLoginLink:Z({method:"POST",fullPath:"/v1/accounts/{account}/login_links"}),createPerson:Z({method:"POST",fullPath:"/v1/accounts/{account}/persons"}),deleteExternalAccount:Z({method:"DELETE",fullPath:"/v1/accounts/{account}/external_accounts/{id}"}),deletePerson:Z({method:"DELETE",fullPath:"/v1/accounts/{account}/persons/{person}"}),listCapabilities:Z({method:"GET",fullPath:"/v1/accounts/{account}/capabilities",methodType:"list"}),listExternalAccounts:Z({method:"GET",fullPath:"/v1/accounts/{account}/external_accounts",methodType:"list"}),listPersons:Z({method:"GET",fullPath:"/v1/accounts/{account}/persons",methodType:"list"}),reject:Z({method:"POST",fullPath:"/v1/accounts/{account}/reject"}),retrieveCurrent:Z({method:"GET",fullPath:"/v1/account"}),retrieveCapability:Z({method:"GET",fullPath:"/v1/accounts/{account}/capabilities/{capability}"}),retrieveExternalAccount:Z({method:"GET",fullPath:"/v1/accounts/{account}/external_accounts/{id}"}),retrievePerson:Z({method:"GET",fullPath:"/v1/accounts/{account}/persons/{person}"}),updateCapability:Z({method:"POST",fullPath:"/v1/accounts/{account}/capabilities/{capability}"}),updateExternalAccount:Z({method:"POST",fullPath:"/v1/accounts/{account}/external_accounts/{id}"}),updatePerson:Z({method:"POST",fullPath:"/v1/accounts/{account}/persons/{person}"})}),em=u.method,tm=u.extend({create:em({method:"POST",fullPath:"/v1/account_links"})}),rm=u.method,nm=u.extend({create:rm({method:"POST",fullPath:"/v1/account_sessions"})}),pn=u.method,am=u.extend({create:pn({method:"POST",fullPath:"/v1/apple_pay/domains"}),retrieve:pn({method:"GET",fullPath:"/v1/apple_pay/domains/{domain}"}),list:pn({method:"GET",fullPath:"/v1/apple_pay/domains",methodType:"list"}),del:pn({method:"DELETE",fullPath:"/v1/apple_pay/domains/{domain}"})}),Ft=u.method,sm=u.extend({retrieve:Ft({method:"GET",fullPath:"/v1/application_fees/{id}"}),list:Ft({method:"GET",fullPath:"/v1/application_fees",methodType:"list"}),createRefund:Ft({method:"POST",fullPath:"/v1/application_fees/{id}/refunds"}),listRefunds:Ft({method:"GET",fullPath:"/v1/application_fees/{id}/refunds",methodType:"list"}),retrieveRefund:Ft({method:"GET",fullPath:"/v1/application_fees/{fee}/refunds/{id}"}),updateRefund:Ft({method:"POST",fullPath:"/v1/application_fees/{fee}/refunds/{id}"})}),im=u.method,om=u.extend({retrieve:im({method:"GET",fullPath:"/v1/balance"})}),No=u.method,lm=u.extend({retrieve:No({method:"GET",fullPath:"/v1/balance_settings"}),update:No({method:"POST",fullPath:"/v1/balance_settings"})}),Lo=u.method,dm=u.extend({retrieve:Lo({method:"GET",fullPath:"/v1/balance_transactions/{id}"}),list:Lo({method:"GET",fullPath:"/v1/balance_transactions",methodType:"list"})}),zt=u.method,cm=u.extend({create:zt({method:"POST",fullPath:"/v1/charges"}),retrieve:zt({method:"GET",fullPath:"/v1/charges/{charge}"}),update:zt({method:"POST",fullPath:"/v1/charges/{charge}"}),list:zt({method:"GET",fullPath:"/v1/charges",methodType:"list"}),capture:zt({method:"POST",fullPath:"/v1/charges/{charge}/capture"}),search:zt({method:"GET",fullPath:"/v1/charges/search",methodType:"search"})}),hm=u.method,um=u.extend({retrieve:hm({method:"GET",fullPath:"/v1/confirmation_tokens/{confirmation_token}"})}),jo=u.method,pm=u.extend({retrieve:jo({method:"GET",fullPath:"/v1/country_specs/{country}"}),list:jo({method:"GET",fullPath:"/v1/country_specs",methodType:"list"})}),xr=u.method,mm=u.extend({create:xr({method:"POST",fullPath:"/v1/coupons"}),retrieve:xr({method:"GET",fullPath:"/v1/coupons/{coupon}"}),update:xr({method:"POST",fullPath:"/v1/coupons/{coupon}"}),list:xr({method:"GET",fullPath:"/v1/coupons",methodType:"list"}),del:xr({method:"DELETE",fullPath:"/v1/coupons/{coupon}"})}),Xe=u.method,gm=u.extend({create:Xe({method:"POST",fullPath:"/v1/credit_notes"}),retrieve:Xe({method:"GET",fullPath:"/v1/credit_notes/{id}"}),update:Xe({method:"POST",fullPath:"/v1/credit_notes/{id}"}),list:Xe({method:"GET",fullPath:"/v1/credit_notes",methodType:"list"}),listLineItems:Xe({method:"GET",fullPath:"/v1/credit_notes/{credit_note}/lines",methodType:"list"}),listPreviewLineItems:Xe({method:"GET",fullPath:"/v1/credit_notes/preview/lines",methodType:"list"}),preview:Xe({method:"GET",fullPath:"/v1/credit_notes/preview"}),voidCreditNote:Xe({method:"POST",fullPath:"/v1/credit_notes/{id}/void"})}),fm=u.method,ym=u.extend({create:fm({method:"POST",fullPath:"/v1/customer_sessions"})}),H=u.method,vm=u.extend({create:H({method:"POST",fullPath:"/v1/customers"}),retrieve:H({method:"GET",fullPath:"/v1/customers/{customer}"}),update:H({method:"POST",fullPath:"/v1/customers/{customer}"}),list:H({method:"GET",fullPath:"/v1/customers",methodType:"list"}),del:H({method:"DELETE",fullPath:"/v1/customers/{customer}"}),createBalanceTransaction:H({method:"POST",fullPath:"/v1/customers/{customer}/balance_transactions"}),createFundingInstructions:H({method:"POST",fullPath:"/v1/customers/{customer}/funding_instructions"}),createSource:H({method:"POST",fullPath:"/v1/customers/{customer}/sources"}),createTaxId:H({method:"POST",fullPath:"/v1/customers/{customer}/tax_ids"}),deleteDiscount:H({method:"DELETE",fullPath:"/v1/customers/{customer}/discount"}),deleteSource:H({method:"DELETE",fullPath:"/v1/customers/{customer}/sources/{id}"}),deleteTaxId:H({method:"DELETE",fullPath:"/v1/customers/{customer}/tax_ids/{id}"}),listBalanceTransactions:H({method:"GET",fullPath:"/v1/customers/{customer}/balance_transactions",methodType:"list"}),listCashBalanceTransactions:H({method:"GET",fullPath:"/v1/customers/{customer}/cash_balance_transactions",methodType:"list"}),listPaymentMethods:H({method:"GET",fullPath:"/v1/customers/{customer}/payment_methods",methodType:"list"}),listSources:H({method:"GET",fullPath:"/v1/customers/{customer}/sources",methodType:"list"}),listTaxIds:H({method:"GET",fullPath:"/v1/customers/{customer}/tax_ids",methodType:"list"}),retrieveBalanceTransaction:H({method:"GET",fullPath:"/v1/customers/{customer}/balance_transactions/{transaction}"}),retrieveCashBalance:H({method:"GET",fullPath:"/v1/customers/{customer}/cash_balance"}),retrieveCashBalanceTransaction:H({method:"GET",fullPath:"/v1/customers/{customer}/cash_balance_transactions/{transaction}"}),retrievePaymentMethod:H({method:"GET",fullPath:"/v1/customers/{customer}/payment_methods/{payment_method}"}),retrieveSource:H({method:"GET",fullPath:"/v1/customers/{customer}/sources/{id}"}),retrieveTaxId:H({method:"GET",fullPath:"/v1/customers/{customer}/tax_ids/{id}"}),search:H({method:"GET",fullPath:"/v1/customers/search",methodType:"search"}),updateBalanceTransaction:H({method:"POST",fullPath:"/v1/customers/{customer}/balance_transactions/{transaction}"}),updateCashBalance:H({method:"POST",fullPath:"/v1/customers/{customer}/cash_balance"}),updateSource:H({method:"POST",fullPath:"/v1/customers/{customer}/sources/{id}"}),verifySource:H({method:"POST",fullPath:"/v1/customers/{customer}/sources/{id}/verify"})}),mn=u.method,xm=u.extend({retrieve:mn({method:"GET",fullPath:"/v1/disputes/{dispute}"}),update:mn({method:"POST",fullPath:"/v1/disputes/{dispute}"}),list:mn({method:"GET",fullPath:"/v1/disputes",methodType:"list"}),close:mn({method:"POST",fullPath:"/v1/disputes/{dispute}/close"})}),Fo=u.method,bm=u.extend({create:Fo({method:"POST",fullPath:"/v1/ephemeral_keys",validator:(t,r)=>{if(!r.headers||!r.headers["Stripe-Version"])throw new Error("Passing apiVersion in a separate options hash is required to create an ephemeral key. See https://stripe.com/docs/api/versioning?lang=node")}}),del:Fo({method:"DELETE",fullPath:"/v1/ephemeral_keys/{key}"})}),zo=u.method,wm=u.extend({retrieve:zo({method:"GET",fullPath:"/v1/events/{id}"}),list:zo({method:"GET",fullPath:"/v1/events",methodType:"list"})}),$o=u.method,Em=u.extend({retrieve:$o({method:"GET",fullPath:"/v1/exchange_rates/{rate_id}"}),list:$o({method:"GET",fullPath:"/v1/exchange_rates",methodType:"list"})}),gn=u.method,Tm=u.extend({create:gn({method:"POST",fullPath:"/v1/file_links"}),retrieve:gn({method:"GET",fullPath:"/v1/file_links/{link}"}),update:gn({method:"POST",fullPath:"/v1/file_links/{link}"}),list:gn({method:"GET",fullPath:"/v1/file_links",methodType:"list"})}),Sm=(t,r,n)=>{const a=(Math.round(Math.random()*1e16)+Math.round(Math.random()*1e16)).toString();n["Content-Type"]=`multipart/form-data; boundary=${a}`;const s=new TextEncoder;let i=new Uint8Array(0);const o=s.encode(`\r
`);function l(c){const p=i,f=c instanceof Uint8Array?c:new Uint8Array(s.encode(c));i=new Uint8Array(p.length+f.length+2),i.set(p),i.set(f,p.length),i.set(o,i.length-2)}function d(c){return`"${c.replace(/"|"/g,"%22").replace(/\r\n|\r|\n/g," ")}"`}const h=jh(r);for(const c in h){if(!Object.prototype.hasOwnProperty.call(h,c))continue;const p=h[c];if(l(`--${a}`),Object.prototype.hasOwnProperty.call(p,"data")){const f=p;l(`Content-Disposition: form-data; name=${d(c)}; filename=${d(f.name||"blob")}`),l(`Content-Type: ${f.type||"application/octet-stream"}`),l(""),l(f.data)}else l(`Content-Disposition: form-data; name=${d(c)}`),l(""),l(p)}return l(`--${a}--`),i};function Pm(t,r,n,a){if(r=r||{},t!=="POST")return a(null,$n(r));this._stripe._platformFunctions.tryBufferData(r).then(s=>{const i=Sm(t,s,n);return a(null,i)}).catch(s=>a(s,null))}const gs=u.method,km=u.extend({create:gs({method:"POST",fullPath:"/v1/files",headers:{"Content-Type":"multipart/form-data"},host:"files.stripe.com"}),retrieve:gs({method:"GET",fullPath:"/v1/files/{file}"}),list:gs({method:"GET",fullPath:"/v1/files",methodType:"list"}),requestDataProcessor:Pm}),br=u.method,_m=u.extend({create:br({method:"POST",fullPath:"/v1/invoiceitems"}),retrieve:br({method:"GET",fullPath:"/v1/invoiceitems/{invoiceitem}"}),update:br({method:"POST",fullPath:"/v1/invoiceitems/{invoiceitem}"}),list:br({method:"GET",fullPath:"/v1/invoiceitems",methodType:"list"}),del:br({method:"DELETE",fullPath:"/v1/invoiceitems/{invoiceitem}"})}),qo=u.method,Am=u.extend({retrieve:qo({method:"GET",fullPath:"/v1/invoice_payments/{invoice_payment}"}),list:qo({method:"GET",fullPath:"/v1/invoice_payments",methodType:"list"})}),fn=u.method,Cm=u.extend({retrieve:fn({method:"GET",fullPath:"/v1/invoice_rendering_templates/{template}"}),list:fn({method:"GET",fullPath:"/v1/invoice_rendering_templates",methodType:"list"}),archive:fn({method:"POST",fullPath:"/v1/invoice_rendering_templates/{template}/archive"}),unarchive:fn({method:"POST",fullPath:"/v1/invoice_rendering_templates/{template}/unarchive"})}),ie=u.method,Im=u.extend({create:ie({method:"POST",fullPath:"/v1/invoices"}),retrieve:ie({method:"GET",fullPath:"/v1/invoices/{invoice}"}),update:ie({method:"POST",fullPath:"/v1/invoices/{invoice}"}),list:ie({method:"GET",fullPath:"/v1/invoices",methodType:"list"}),del:ie({method:"DELETE",fullPath:"/v1/invoices/{invoice}"}),addLines:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/add_lines"}),attachPayment:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/attach_payment"}),createPreview:ie({method:"POST",fullPath:"/v1/invoices/create_preview"}),finalizeInvoice:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/finalize"}),listLineItems:ie({method:"GET",fullPath:"/v1/invoices/{invoice}/lines",methodType:"list"}),markUncollectible:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/mark_uncollectible"}),pay:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/pay"}),removeLines:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/remove_lines"}),search:ie({method:"GET",fullPath:"/v1/invoices/search",methodType:"search"}),sendInvoice:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/send"}),updateLines:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/update_lines"}),updateLineItem:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/lines/{line_item_id}"}),voidInvoice:ie({method:"POST",fullPath:"/v1/invoices/{invoice}/void"})}),Om=u.method,Mm=u.extend({retrieve:Om({method:"GET",fullPath:"/v1/mandates/{mandate}"})}),Go=u.method,fs="connect.stripe.com",Rm=u.extend({basePath:"/",authorizeUrl(t,r){t=t||{},r=r||{};let n="oauth/authorize";return r.express&&(n=`express/${n}`),t.response_type||(t.response_type="code"),t.client_id||(t.client_id=this._stripe.getClientId()),t.scope||(t.scope="read_write"),`https://${fs}/${n}?${$n(t)}`},token:Go({method:"POST",path:"oauth/token",host:fs}),deauthorize(t,...r){return t.client_id||(t.client_id=this._stripe.getClientId()),Go({method:"POST",path:"oauth/deauthorize",host:fs}).apply(this,[t,...r])}}),Wo=u.method,Dm=u.extend({retrieve:Wo({method:"GET",fullPath:"/v1/payment_attempt_records/{id}"}),list:Wo({method:"GET",fullPath:"/v1/payment_attempt_records",methodType:"list"})}),Ee=u.method,Bm=u.extend({create:Ee({method:"POST",fullPath:"/v1/payment_intents"}),retrieve:Ee({method:"GET",fullPath:"/v1/payment_intents/{intent}"}),update:Ee({method:"POST",fullPath:"/v1/payment_intents/{intent}"}),list:Ee({method:"GET",fullPath:"/v1/payment_intents",methodType:"list"}),applyCustomerBalance:Ee({method:"POST",fullPath:"/v1/payment_intents/{intent}/apply_customer_balance"}),cancel:Ee({method:"POST",fullPath:"/v1/payment_intents/{intent}/cancel"}),capture:Ee({method:"POST",fullPath:"/v1/payment_intents/{intent}/capture"}),confirm:Ee({method:"POST",fullPath:"/v1/payment_intents/{intent}/confirm"}),incrementAuthorization:Ee({method:"POST",fullPath:"/v1/payment_intents/{intent}/increment_authorization"}),listAmountDetailsLineItems:Ee({method:"GET",fullPath:"/v1/payment_intents/{intent}/amount_details_line_items",methodType:"list"}),search:Ee({method:"GET",fullPath:"/v1/payment_intents/search",methodType:"search"}),verifyMicrodeposits:Ee({method:"POST",fullPath:"/v1/payment_intents/{intent}/verify_microdeposits"})}),wr=u.method,Nm=u.extend({create:wr({method:"POST",fullPath:"/v1/payment_links"}),retrieve:wr({method:"GET",fullPath:"/v1/payment_links/{payment_link}"}),update:wr({method:"POST",fullPath:"/v1/payment_links/{payment_link}"}),list:wr({method:"GET",fullPath:"/v1/payment_links",methodType:"list"}),listLineItems:wr({method:"GET",fullPath:"/v1/payment_links/{payment_link}/line_items",methodType:"list"})}),yn=u.method,Lm=u.extend({create:yn({method:"POST",fullPath:"/v1/payment_method_configurations"}),retrieve:yn({method:"GET",fullPath:"/v1/payment_method_configurations/{configuration}"}),update:yn({method:"POST",fullPath:"/v1/payment_method_configurations/{configuration}"}),list:yn({method:"GET",fullPath:"/v1/payment_method_configurations",methodType:"list"})}),Er=u.method,jm=u.extend({create:Er({method:"POST",fullPath:"/v1/payment_method_domains"}),retrieve:Er({method:"GET",fullPath:"/v1/payment_method_domains/{payment_method_domain}"}),update:Er({method:"POST",fullPath:"/v1/payment_method_domains/{payment_method_domain}"}),list:Er({method:"GET",fullPath:"/v1/payment_method_domains",methodType:"list"}),validate:Er({method:"POST",fullPath:"/v1/payment_method_domains/{payment_method_domain}/validate"})}),$t=u.method,Fm=u.extend({create:$t({method:"POST",fullPath:"/v1/payment_methods"}),retrieve:$t({method:"GET",fullPath:"/v1/payment_methods/{payment_method}"}),update:$t({method:"POST",fullPath:"/v1/payment_methods/{payment_method}"}),list:$t({method:"GET",fullPath:"/v1/payment_methods",methodType:"list"}),attach:$t({method:"POST",fullPath:"/v1/payment_methods/{payment_method}/attach"}),detach:$t({method:"POST",fullPath:"/v1/payment_methods/{payment_method}/detach"})}),Ze=u.method,zm=u.extend({retrieve:Ze({method:"GET",fullPath:"/v1/payment_records/{id}"}),reportPayment:Ze({method:"POST",fullPath:"/v1/payment_records/report_payment"}),reportPaymentAttempt:Ze({method:"POST",fullPath:"/v1/payment_records/{id}/report_payment_attempt"}),reportPaymentAttemptCanceled:Ze({method:"POST",fullPath:"/v1/payment_records/{id}/report_payment_attempt_canceled"}),reportPaymentAttemptFailed:Ze({method:"POST",fullPath:"/v1/payment_records/{id}/report_payment_attempt_failed"}),reportPaymentAttemptGuaranteed:Ze({method:"POST",fullPath:"/v1/payment_records/{id}/report_payment_attempt_guaranteed"}),reportPaymentAttemptInformational:Ze({method:"POST",fullPath:"/v1/payment_records/{id}/report_payment_attempt_informational"}),reportRefund:Ze({method:"POST",fullPath:"/v1/payment_records/{id}/report_refund"})}),qt=u.method,$m=u.extend({create:qt({method:"POST",fullPath:"/v1/payouts"}),retrieve:qt({method:"GET",fullPath:"/v1/payouts/{payout}"}),update:qt({method:"POST",fullPath:"/v1/payouts/{payout}"}),list:qt({method:"GET",fullPath:"/v1/payouts",methodType:"list"}),cancel:qt({method:"POST",fullPath:"/v1/payouts/{payout}/cancel"}),reverse:qt({method:"POST",fullPath:"/v1/payouts/{payout}/reverse"})}),Tr=u.method,qm=u.extend({create:Tr({method:"POST",fullPath:"/v1/plans"}),retrieve:Tr({method:"GET",fullPath:"/v1/plans/{plan}"}),update:Tr({method:"POST",fullPath:"/v1/plans/{plan}"}),list:Tr({method:"GET",fullPath:"/v1/plans",methodType:"list"}),del:Tr({method:"DELETE",fullPath:"/v1/plans/{plan}"})}),Sr=u.method,Gm=u.extend({create:Sr({method:"POST",fullPath:"/v1/prices"}),retrieve:Sr({method:"GET",fullPath:"/v1/prices/{price}"}),update:Sr({method:"POST",fullPath:"/v1/prices/{price}"}),list:Sr({method:"GET",fullPath:"/v1/prices",methodType:"list"}),search:Sr({method:"GET",fullPath:"/v1/prices/search",methodType:"search"})}),Me=u.method,Wm=u.extend({create:Me({method:"POST",fullPath:"/v1/products"}),retrieve:Me({method:"GET",fullPath:"/v1/products/{id}"}),update:Me({method:"POST",fullPath:"/v1/products/{id}"}),list:Me({method:"GET",fullPath:"/v1/products",methodType:"list"}),del:Me({method:"DELETE",fullPath:"/v1/products/{id}"}),createFeature:Me({method:"POST",fullPath:"/v1/products/{product}/features"}),deleteFeature:Me({method:"DELETE",fullPath:"/v1/products/{product}/features/{id}"}),listFeatures:Me({method:"GET",fullPath:"/v1/products/{product}/features",methodType:"list"}),retrieveFeature:Me({method:"GET",fullPath:"/v1/products/{product}/features/{id}"}),search:Me({method:"GET",fullPath:"/v1/products/search",methodType:"search"})}),vn=u.method,Um=u.extend({create:vn({method:"POST",fullPath:"/v1/promotion_codes"}),retrieve:vn({method:"GET",fullPath:"/v1/promotion_codes/{promotion_code}"}),update:vn({method:"POST",fullPath:"/v1/promotion_codes/{promotion_code}"}),list:vn({method:"GET",fullPath:"/v1/promotion_codes",methodType:"list"})}),Re=u.method,Hm=u.extend({create:Re({method:"POST",fullPath:"/v1/quotes"}),retrieve:Re({method:"GET",fullPath:"/v1/quotes/{quote}"}),update:Re({method:"POST",fullPath:"/v1/quotes/{quote}"}),list:Re({method:"GET",fullPath:"/v1/quotes",methodType:"list"}),accept:Re({method:"POST",fullPath:"/v1/quotes/{quote}/accept"}),cancel:Re({method:"POST",fullPath:"/v1/quotes/{quote}/cancel"}),finalizeQuote:Re({method:"POST",fullPath:"/v1/quotes/{quote}/finalize"}),listComputedUpfrontLineItems:Re({method:"GET",fullPath:"/v1/quotes/{quote}/computed_upfront_line_items",methodType:"list"}),listLineItems:Re({method:"GET",fullPath:"/v1/quotes/{quote}/line_items",methodType:"list"}),pdf:Re({method:"GET",fullPath:"/v1/quotes/{quote}/pdf",host:"files.stripe.com",streaming:!0})}),Pr=u.method,Ym=u.extend({create:Pr({method:"POST",fullPath:"/v1/refunds"}),retrieve:Pr({method:"GET",fullPath:"/v1/refunds/{refund}"}),update:Pr({method:"POST",fullPath:"/v1/refunds/{refund}"}),list:Pr({method:"GET",fullPath:"/v1/refunds",methodType:"list"}),cancel:Pr({method:"POST",fullPath:"/v1/refunds/{refund}/cancel"})}),ys=u.method,Vm=u.extend({retrieve:ys({method:"GET",fullPath:"/v1/reviews/{review}"}),list:ys({method:"GET",fullPath:"/v1/reviews",methodType:"list"}),approve:ys({method:"POST",fullPath:"/v1/reviews/{review}/approve"})}),Km=u.method,Jm=u.extend({list:Km({method:"GET",fullPath:"/v1/setup_attempts",methodType:"list"})}),gt=u.method,Qm=u.extend({create:gt({method:"POST",fullPath:"/v1/setup_intents"}),retrieve:gt({method:"GET",fullPath:"/v1/setup_intents/{intent}"}),update:gt({method:"POST",fullPath:"/v1/setup_intents/{intent}"}),list:gt({method:"GET",fullPath:"/v1/setup_intents",methodType:"list"}),cancel:gt({method:"POST",fullPath:"/v1/setup_intents/{intent}/cancel"}),confirm:gt({method:"POST",fullPath:"/v1/setup_intents/{intent}/confirm"}),verifyMicrodeposits:gt({method:"POST",fullPath:"/v1/setup_intents/{intent}/verify_microdeposits"})}),xn=u.method,Xm=u.extend({create:xn({method:"POST",fullPath:"/v1/shipping_rates"}),retrieve:xn({method:"GET",fullPath:"/v1/shipping_rates/{shipping_rate_token}"}),update:xn({method:"POST",fullPath:"/v1/shipping_rates/{shipping_rate_token}"}),list:xn({method:"GET",fullPath:"/v1/shipping_rates",methodType:"list"})}),kr=u.method,Zm=u.extend({create:kr({method:"POST",fullPath:"/v1/sources"}),retrieve:kr({method:"GET",fullPath:"/v1/sources/{source}"}),update:kr({method:"POST",fullPath:"/v1/sources/{source}"}),listSourceTransactions:kr({method:"GET",fullPath:"/v1/sources/{source}/source_transactions",methodType:"list"}),verify:kr({method:"POST",fullPath:"/v1/sources/{source}/verify"})}),_r=u.method,eg=u.extend({create:_r({method:"POST",fullPath:"/v1/subscription_items"}),retrieve:_r({method:"GET",fullPath:"/v1/subscription_items/{item}"}),update:_r({method:"POST",fullPath:"/v1/subscription_items/{item}"}),list:_r({method:"GET",fullPath:"/v1/subscription_items",methodType:"list"}),del:_r({method:"DELETE",fullPath:"/v1/subscription_items/{item}"})}),Gt=u.method,tg=u.extend({create:Gt({method:"POST",fullPath:"/v1/subscription_schedules"}),retrieve:Gt({method:"GET",fullPath:"/v1/subscription_schedules/{schedule}"}),update:Gt({method:"POST",fullPath:"/v1/subscription_schedules/{schedule}"}),list:Gt({method:"GET",fullPath:"/v1/subscription_schedules",methodType:"list"}),cancel:Gt({method:"POST",fullPath:"/v1/subscription_schedules/{schedule}/cancel"}),release:Gt({method:"POST",fullPath:"/v1/subscription_schedules/{schedule}/release"})}),Ne=u.method,rg=u.extend({create:Ne({method:"POST",fullPath:"/v1/subscriptions"}),retrieve:Ne({method:"GET",fullPath:"/v1/subscriptions/{subscription_exposed_id}"}),update:Ne({method:"POST",fullPath:"/v1/subscriptions/{subscription_exposed_id}"}),list:Ne({method:"GET",fullPath:"/v1/subscriptions",methodType:"list"}),cancel:Ne({method:"DELETE",fullPath:"/v1/subscriptions/{subscription_exposed_id}"}),deleteDiscount:Ne({method:"DELETE",fullPath:"/v1/subscriptions/{subscription_exposed_id}/discount"}),migrate:Ne({method:"POST",fullPath:"/v1/subscriptions/{subscription}/migrate"}),resume:Ne({method:"POST",fullPath:"/v1/subscriptions/{subscription}/resume"}),search:Ne({method:"GET",fullPath:"/v1/subscriptions/search",methodType:"search"})}),Uo=u.method,ng=u.extend({retrieve:Uo({method:"GET",fullPath:"/v1/tax_codes/{id}"}),list:Uo({method:"GET",fullPath:"/v1/tax_codes",methodType:"list"})}),bn=u.method,ag=u.extend({create:bn({method:"POST",fullPath:"/v1/tax_ids"}),retrieve:bn({method:"GET",fullPath:"/v1/tax_ids/{id}"}),list:bn({method:"GET",fullPath:"/v1/tax_ids",methodType:"list"}),del:bn({method:"DELETE",fullPath:"/v1/tax_ids/{id}"})}),wn=u.method,sg=u.extend({create:wn({method:"POST",fullPath:"/v1/tax_rates"}),retrieve:wn({method:"GET",fullPath:"/v1/tax_rates/{tax_rate}"}),update:wn({method:"POST",fullPath:"/v1/tax_rates/{tax_rate}"}),list:wn({method:"GET",fullPath:"/v1/tax_rates",methodType:"list"})}),Ho=u.method,ig=u.extend({create:Ho({method:"POST",fullPath:"/v1/tokens"}),retrieve:Ho({method:"GET",fullPath:"/v1/tokens/{token}"})}),Ar=u.method,og=u.extend({create:Ar({method:"POST",fullPath:"/v1/topups"}),retrieve:Ar({method:"GET",fullPath:"/v1/topups/{topup}"}),update:Ar({method:"POST",fullPath:"/v1/topups/{topup}"}),list:Ar({method:"GET",fullPath:"/v1/topups",methodType:"list"}),cancel:Ar({method:"POST",fullPath:"/v1/topups/{topup}/cancel"})}),et=u.method,lg=u.extend({create:et({method:"POST",fullPath:"/v1/transfers"}),retrieve:et({method:"GET",fullPath:"/v1/transfers/{transfer}"}),update:et({method:"POST",fullPath:"/v1/transfers/{transfer}"}),list:et({method:"GET",fullPath:"/v1/transfers",methodType:"list"}),createReversal:et({method:"POST",fullPath:"/v1/transfers/{id}/reversals"}),listReversals:et({method:"GET",fullPath:"/v1/transfers/{id}/reversals",methodType:"list"}),retrieveReversal:et({method:"GET",fullPath:"/v1/transfers/{transfer}/reversals/{id}"}),updateReversal:et({method:"POST",fullPath:"/v1/transfers/{transfer}/reversals/{id}"})}),Cr=u.method,dg=u.extend({create:Cr({method:"POST",fullPath:"/v1/webhook_endpoints"}),retrieve:Cr({method:"GET",fullPath:"/v1/webhook_endpoints/{webhook_endpoint}"}),update:Cr({method:"POST",fullPath:"/v1/webhook_endpoints/{webhook_endpoint}"}),list:Cr({method:"GET",fullPath:"/v1/webhook_endpoints",methodType:"list"}),del:Cr({method:"DELETE",fullPath:"/v1/webhook_endpoints/{webhook_endpoint}"})}),cg=X("apps",{Secrets:Bp}),hg=X("billing",{Alerts:vu,CreditBalanceSummary:Du,CreditBalanceTransactions:Bu,CreditGrants:Nu,MeterEventAdjustments:Qu,MeterEvents:sp,Meters:lp}),ug=X("billingPortal",{Configurations:_u,Sessions:Lp}),pg=X("checkout",{Sessions:jp}),mg=X("climate",{Orders:hp,Products:xp,Suppliers:$p}),gg=X("entitlements",{ActiveEntitlements:yu,Features:Uu}),fg=X("financialConnections",{Accounts:pu,Sessions:Fp,Transactions:Up}),yg=X("forwarding",{Requests:Rp}),vg=X("identity",{VerificationReports:Xp,VerificationSessions:Zp}),xg=X("issuing",{Authorizations:wu,Cardholders:Su,Cards:Pu,Disputes:$u,PersonalizationDesigns:fp,PhysicalBundles:vp,Tokens:Gp,Transactions:Hp}),bg=X("radar",{EarlyFraudWarnings:qu,ValueListItems:Jp,ValueLists:Qp}),wg=X("reporting",{ReportRuns:Op,ReportTypes:Mp}),Eg=X("sigma",{ScheduledQueryRuns:Dp}),Tg=X("tax",{Associations:bu,Calculations:Tu,Registrations:Ip,Settings:zp,Transactions:Yp}),Sg=X("terminal",{Configurations:Au,ConnectionTokens:Mu,Locations:Ku,OnboardingLinks:cp,Readers:bp}),Pg=X("testHelpers",{ConfirmationTokens:Iu,Customers:Fu,Refunds:Cp,TestClocks:qp,Issuing:X("issuing",{Authorizations:Eu,Cards:ku,PersonalizationDesigns:yp,Transactions:Vp}),Terminal:X("terminal",{Readers:wp}),Treasury:X("treasury",{InboundTransfers:Yu,OutboundPayments:up,OutboundTransfers:mp,ReceivedCredits:Tp,ReceivedDebits:kp})}),kg=X("treasury",{CreditReversals:Lu,DebitReversals:zu,FinancialAccounts:Hu,InboundTransfers:Vu,OutboundPayments:pp,OutboundTransfers:gp,ReceivedCredits:Sp,ReceivedDebits:_p,TransactionEntries:Wp,Transactions:Kp}),_g=X("v2",{Billing:X("billing",{MeterEventAdjustments:Zu,MeterEventSession:tp,MeterEventStream:np,MeterEvents:op}),Core:X("core",{AccountLinks:hu,AccountTokens:uu,Accounts:fu,EventDestinations:Gu,Events:Wu})}),En=Object.freeze(Object.defineProperty({__proto__:null,Account:Bo,AccountLinks:tm,AccountSessions:nm,Accounts:Bo,ApplePayDomains:am,ApplicationFees:sm,Apps:cg,Balance:om,BalanceSettings:lm,BalanceTransactions:dm,Billing:hg,BillingPortal:ug,Charges:cm,Checkout:pg,Climate:mg,ConfirmationTokens:um,CountrySpecs:pm,Coupons:mm,CreditNotes:gm,CustomerSessions:ym,Customers:vm,Disputes:xm,Entitlements:gg,EphemeralKeys:bm,Events:wm,ExchangeRates:Em,FileLinks:Tm,Files:km,FinancialConnections:fg,Forwarding:yg,Identity:vg,InvoiceItems:_m,InvoicePayments:Am,InvoiceRenderingTemplates:Cm,Invoices:Im,Issuing:xg,Mandates:Mm,OAuth:Rm,PaymentAttemptRecords:Dm,PaymentIntents:Bm,PaymentLinks:Nm,PaymentMethodConfigurations:Lm,PaymentMethodDomains:jm,PaymentMethods:Fm,PaymentRecords:zm,Payouts:$m,Plans:qm,Prices:Gm,Products:Wm,PromotionCodes:Um,Quotes:Hm,Radar:bg,Refunds:Ym,Reporting:wg,Reviews:Vm,SetupAttempts:Jm,SetupIntents:Qm,ShippingRates:Xm,Sigma:Eg,Sources:Zm,SubscriptionItems:eg,SubscriptionSchedules:tg,Subscriptions:rg,Tax:Tg,TaxCodes:ng,TaxIds:ag,TaxRates:sg,Terminal:Sg,TestHelpers:Pg,Tokens:ig,Topups:og,Transfers:lg,Treasury:kg,V2:_g,WebhookEndpoints:dg},Symbol.toStringTag,{value:"Module"})),Yo="api.stripe.com",Vo="443",Ko="/v1/",Jo=pd,Qo=8e4,Xo=5,Zo=.5,Ag=["name","version","url","partner_id"],el=["authenticator","apiVersion","typescript","maxNetworkRetries","httpAgent","httpClient","timeout","host","port","protocol","telemetry","appInfo","stripeAccount","stripeContext"],Cg=t=>new Rr(t,u.MAX_BUFFERED_REQUEST_METRICS);function Ig(t,r=Cg){n.PACKAGE_VERSION="20.1.2",n.API_VERSION=pd,n.USER_AGENT=Object.assign({bindings_version:n.PACKAGE_VERSION,lang:"node",publisher:"stripe",uname:null,typescript:!1},Fh()),n.StripeResource=u,n.StripeContext=vt,n.resources=En,n.HttpClient=Se,n.HttpClientResponse=ed,n.CryptoProvider=td,n.webhooks=lu(t);function n(a,s={}){if(!(this instanceof n))return new n(a,s);const i=this._getPropsFromConfig(s);this._platformFunctions=t,Object.defineProperty(this,"_emitter",{value:this._platformFunctions.createEmitter(),enumerable:!1,configurable:!1,writable:!1}),this.VERSION=n.PACKAGE_VERSION,this.on=this._emitter.on.bind(this._emitter),this.once=this._emitter.once.bind(this._emitter),this.off=this._emitter.removeListener.bind(this._emitter);const o=i.httpAgent||null;this._api={host:i.host||Yo,port:i.port||Vo,protocol:i.protocol||"https",basePath:Ko,version:i.apiVersion||Jo,timeout:ts("timeout",i.timeout,Qo),maxNetworkRetries:ts("maxNetworkRetries",i.maxNetworkRetries,2),agent:o,httpClient:i.httpClient||(o?this._platformFunctions.createNodeHttpClient(o):this._platformFunctions.createDefaultHttpClient()),dev:!1,stripeAccount:i.stripeAccount||null,stripeContext:i.stripeContext||null};const l=i.typescript||!1;l!==n.USER_AGENT.typescript&&(n.USER_AGENT.typescript=l),i.appInfo&&this._setAppInfo(i.appInfo),this._prepResources(),this._setAuthenticator(a,i.authenticator),this.errors=fo,this.webhooks=n.webhooks,this._prevRequestMetrics=[],this._enableTelemetry=i.telemetry!==!1,this._requestSender=r(this),this.StripeResource=n.StripeResource}return n.errors=fo,n.createNodeHttpClient=t.createNodeHttpClient,n.createFetchHttpClient=t.createFetchHttpClient,n.createNodeCryptoProvider=t.createNodeCryptoProvider,n.createSubtleCryptoProvider=t.createSubtleCryptoProvider,n.prototype={_appInfo:void 0,on:null,off:null,once:null,VERSION:null,StripeResource:null,webhooks:null,errors:null,_api:null,_prevRequestMetrics:null,_emitter:null,_enableTelemetry:null,_requestSender:null,_platformFunctions:null,rawRequest(a,s,i,o){return this._requestSender._rawRequest(a,s,i,o)},_setAuthenticator(a,s){if(a&&s)throw new Error("Can't specify both apiKey and authenticator");if(!a&&!s)throw new Error("Neither apiKey nor config.authenticator provided");this._authenticator=a?Ss(a):s},_setAppInfo(a){if(a&&typeof a!="object")throw new Error("AppInfo must be an object.");if(a&&!a.name)throw new Error("AppInfo.name is required");a=a||{},this._appInfo=Ag.reduce((s,i)=>(typeof a[i]=="string"&&(s=s||{},s[i]=a[i]),s),{})},_setApiField(a,s){this._api[a]=s},getApiField(a){return this._api[a]},setClientId(a){this._clientId=a},getClientId(){return this._clientId},getConstant:a=>{switch(a){case"DEFAULT_HOST":return Yo;case"DEFAULT_PORT":return Vo;case"DEFAULT_BASE_PATH":return Ko;case"DEFAULT_API_VERSION":return Jo;case"DEFAULT_TIMEOUT":return Qo;case"MAX_NETWORK_RETRY_DELAY_SEC":return Xo;case"INITIAL_NETWORK_RETRY_DELAY_SEC":return Zo}return n[a]},getMaxNetworkRetries(){return this.getApiField("maxNetworkRetries")},_setApiNumberField(a,s,i){const o=ts(a,s,i);this._setApiField(a,o)},getMaxNetworkRetryDelay(){return Xo},getInitialNetworkRetryDelay(){return Zo},getClientUserAgent(a){return this.getClientUserAgentSeeded(n.USER_AGENT,a)},getClientUserAgentSeeded(a,s){this._platformFunctions.getUname().then(i=>{var o;const l={};for(const h in a)Object.prototype.hasOwnProperty.call(a,h)&&(l[h]=encodeURIComponent((o=a[h])!==null&&o!==void 0?o:"null"));l.uname=encodeURIComponent(i||"UNKNOWN");const d=this.getApiField("httpClient");d&&(l.httplib=encodeURIComponent(d.getClientName())),this._appInfo&&(l.application=this._appInfo),s(JSON.stringify(l))})},getAppInfoAsString(){if(!this._appInfo)return"";let a=this._appInfo.name;return this._appInfo.version&&(a+=`/${this._appInfo.version}`),this._appInfo.url&&(a+=` (${this._appInfo.url})`),a},getTelemetryEnabled(){return this._enableTelemetry},_prepResources(){for(const a in En)Object.prototype.hasOwnProperty.call(En,a)&&(this[Nh(a)]=new En[a](this))},_getPropsFromConfig(a){if(!a)return{};const s=typeof a=="string";if(!(a===Object(a)&&!Array.isArray(a))&&!s)throw new Error("Config must either be an object or a string");if(s)return{apiVersion:a};if(Object.keys(a).filter(l=>!el.includes(l)).length>0)throw new Error(`Config object may only contain the following: ${el.join(", ")}`);return a},parseEventNotification(a,s,i,o,l,d){const h=this.webhooks.constructEvent(a,s,i,o,l,d);return h.context&&(h.context=vt.parse(h.context)),h.fetchEvent=()=>this._requestSender._rawRequest("GET",`/v2/core/events/${h.id}`,void 0,{stripeContext:h.context},["fetch_event"]),h.fetchRelatedObject=()=>h.related_object?this._requestSender._rawRequest("GET",h.related_object.url,void 0,{stripeContext:h.context},["fetch_related_object"]):Promise.resolve(null),h}},n}const Og=Ig(new Vh),Mg=JSON.parse('[{"id":37151,"slug":"rustic-barn-wedding-at-rolling-meadow-farm-sade-luke","title":{"rendered":"Rustic Barn Wedding at Rolling Meadow Farm | Sade + Luke"},"date":"2025-09-02T07:24:29","content":"<p>We hopped on a plane to Greensboro, NC for Sade + Luke’s wedding at <a href=\\"https://www.rollingmeadowfarmnc.com/\\" target=\\"_blank\\" rel=\\"noopener\\">Rolling Meadow Farm</a>, and honestly? 10/10, worth it. The rustic barn backdrop was already a dream, but the best part was getting to reconnect with an old friend on his happiest day ever and finally meet his amazing wife. The weather tried to mess with us — threatening rain — but instead we got full sunshine, golden hour fields, and then boom… the"},{"id":37039,"slug":"hudson-valley-barn-engagement-kate-steve","title":{"rendered":"Hudson Valley Barn Engagement | Kate + Steve"},"date":"2025-08-29T21:59:59","content":"<p>Kate and Steve’s Hudson Valley barn engagement wasn’t just pretty pictures — it was their family’s barn, the exact spot where they’ll say “I do” this November. That already makes it personal, but then you add a golden hour that hit just right, a little haze of farm dust floating in the light, and even their new puppy and lots of puppy kisses, and suddenly the whole place felt alive. This summer’s been cooler than the usual New York heatwave, so we had the perfect evening to wander between fie"},{"id":35090,"slug":"surprise-proposal-sarasota","title":{"rendered":"Surprise Proposal Sarasota | A Romantic Moment to Remember"},"date":"2024-09-30T16:15:15","content":"<div data-elementor-type=\\"wp-post\\" data-elementor-id=\\"35090\\" class=\\"elementor elementor-35090\\" data-elementor-post-type=\\"post\\">\\n\\t\\t\\t\\t<div class=\\"elementor-element elementor-element-d3cbcb2 e-flex e-con-boxed e-con e-parent\\" data-id=\\"d3cbcb2\\" data-element_type=\\"container\\">\\n\\t\\t\\t\\t\\t<div class=\\"e-con-inner\\">\\n\\t\\t\\t\\t<div class=\\"elementor-element elementor-element-0f5f91e elementor-widget elementor-widget-heading\\" data-id=\\"0f5f91e\\" data-element_type=\\"widget\\" data-widget_type=\\"heading.default\\">\\n\\t\\t\\t\\t<div clas"},{"id":34575,"slug":"cold-spring-ny-wedding-zeynep-dominic","title":{"rendered":"Cold Spring NY Wedding | Zeynep + Dominic’s Dream Celebration in the Hudson Valley&#8221;"},"date":"2024-09-05T05:29:12","content":"<p>Cold Spring NY Wedding dreams come to life in the scenic Hudson Valley, where nature and charm combine to create unforgettable celebrations. Nestled in the heart of this picturesque region, Cold Spring, NY, served as the perfect backdrop for Zeynep and Dominic&#8217;s stunning wedding. With its charming streets, breathtaking river views, and vibrant green foliage, this Hudson Valley treasure set the stage for a remarkable day filled with love and elegance. From the historic West Point Foundry"},{"id":34525,"slug":"piano-teacher-photo-session-mistico-restaurant-miami-fl","title":{"rendered":"Piano Teacher Photo Session | Mistico Restaurant, Miami FL"},"date":"2023-11-11T13:09:05","content":"<div data-elementor-type=\\"wp-post\\" data-elementor-id=\\"34525\\" class=\\"elementor elementor-34525\\" data-elementor-post-type=\\"post\\">\\n\\t\\t\\t\\t\\t\\t<section class=\\"elementor-section elementor-top-section elementor-element elementor-element-9f5b32b elementor-section-boxed elementor-section-height-default elementor-section-height-default\\" data-id=\\"9f5b32b\\" data-element_type=\\"section\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"elementor-container elementor-column-gap-default\\">\\n\\t\\t\\t\\t\\t<div class=\\"elementor-column elementor-col-100 element"},{"id":34477,"slug":"family-portrait-photos-at-villa-del-balbianello-lake-como","title":{"rendered":"Family Portrait Photos at Villa del Balbianello | Lake Como"},"date":"2023-10-31T18:24:40","content":"<div data-elementor-type=\\"wp-post\\" data-elementor-id=\\"34477\\" class=\\"elementor elementor-34477\\" data-elementor-post-type=\\"post\\">\\n\\t\\t\\t\\t<section class=\\"elementor-section elementor-top-section elementor-element elementor-element-296264f7 elementor-section-boxed elementor-section-height-default elementor-section-height-default\\" data-id=\\"296264f7\\" data-element_type=\\"section\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"elementor-container elementor-column-gap-default\\">\\n\\t\\t\\t\\t\\t<div class=\\"elementor-column elementor-col-100 element"},{"id":34271,"slug":"family-photo-shoot-at-villa-del-balbianello-lake-como-italy","title":{"rendered":"Family Photo Shoot at Villa del Balbianello | Lake Como Italy"},"date":"2023-10-31T17:00:41","content":"<p></p></p>\\n<p>Have you ever dreamed of visiting a fairy-tale villa on the shores of a beautiful lake? That’s exactly what we did when we went to Villa del Balbianello, one of the most marvelous places on Lake Como. We were fortunate enough to have our dear friends and gorgeous Artiles family join us for this unforgettable experience. And of course, we couldn’t miss the opportunity to capture some stunning photos of our happy moments together.</p>\\n<p><p></p></p>\\n<p>Villa del Balbianello is not j"},{"id":34382,"slug":"davie-fl-wedding-photography","title":{"rendered":"Davie FL Wedding Photography | Alicia + Claudio"},"date":"2023-10-29T03:40:06","content":"<div data-elementor-type=\\"wp-post\\" data-elementor-id=\\"34382\\" class=\\"elementor elementor-34382\\" data-elementor-post-type=\\"post\\">\\n\\t\\t\\t\\t\\t\\t<section class=\\"elementor-section elementor-top-section elementor-element elementor-element-41a0aab elementor-section-boxed elementor-section-height-default elementor-section-height-default\\" data-id=\\"41a0aab\\" data-element_type=\\"section\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"elementor-container elementor-column-gap-default\\">\\n\\t\\t\\t\\t\\t<div class=\\"elementor-column elementor-col-100 element"},{"id":33646,"slug":"20th-anniversary-photo-session","title":{"rendered":"20th Anniversary Photo Session | Mares Family"},"date":"2023-05-13T02:56:02","content":"<div data-elementor-type=\\"wp-post\\" data-elementor-id=\\"33646\\" class=\\"elementor elementor-33646\\" data-elementor-post-type=\\"post\\">\\n\\t\\t\\t\\t\\t\\t<section class=\\"elementor-section elementor-top-section elementor-element elementor-element-a3630e0 elementor-section-boxed elementor-section-height-default elementor-section-height-default\\" data-id=\\"a3630e0\\" data-element_type=\\"section\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"elementor-container elementor-column-gap-default\\">\\n\\t\\t\\t\\t\\t<div class=\\"elementor-column elementor-col-100 element"},{"id":33543,"slug":"newborn-session","title":{"rendered":"Newborn Session | Baby Noah"},"date":"2023-03-28T02:28:11","content":"<div data-elementor-type=\\"wp-post\\" data-elementor-id=\\"33543\\" class=\\"elementor elementor-33543\\" data-elementor-post-type=\\"post\\">\\n\\t\\t\\t\\t\\t\\t<section class=\\"elementor-section elementor-top-section elementor-element elementor-element-d4b6989 elementor-section-boxed elementor-section-height-default elementor-section-height-default\\" data-id=\\"d4b6989\\" data-element_type=\\"section\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"elementor-container elementor-column-gap-default\\">\\n\\t\\t\\t\\t\\t<div class=\\"elementor-column elementor-col-100 element"},{"id":33456,"slug":"tree-tops-park-family-photo-shoot","title":{"rendered":"Tree Tops Park Family Photo Shoot"},"date":"2023-02-16T22:56:01","content":"<div data-elementor-type=\\"wp-post\\" data-elementor-id=\\"33456\\" class=\\"elementor elementor-33456\\" data-elementor-post-type=\\"post\\">\\n\\t\\t\\t\\t\\t\\t<section class=\\"elementor-section elementor-top-section elementor-element elementor-element-8bb9bfa elementor-section-boxed elementor-section-height-default elementor-section-height-default\\" data-id=\\"8bb9bfa\\" data-element_type=\\"section\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"elementor-container elementor-column-gap-default\\">\\n\\t\\t\\t\\t\\t<div class=\\"elementor-column elementor-col-100 element"},{"id":32979,"slug":"ritz-carlton-wedding-coconut-grove-pakistani-syrian","title":{"rendered":"Ritz Carlton Wedding | Coconut Grove | Pakistani &amp; Syrian | Kawthr + Hamad"},"date":"2023-01-18T22:35:32","content":"<div data-elementor-type=\\"wp-post\\" data-elementor-id=\\"32979\\" class=\\"elementor elementor-32979\\" data-elementor-post-type=\\"post\\">\\n\\t\\t\\t\\t<section class=\\"elementor-section elementor-top-section elementor-element elementor-element-3ed3ab6 elementor-section-boxed elementor-section-height-default elementor-section-height-default\\" data-id=\\"3ed3ab6\\" data-element_type=\\"section\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"elementor-container elementor-column-gap-default\\">\\n\\t\\t\\t\\t\\t<div class=\\"elementor-column elementor-col-100 elementor"},{"id":32803,"slug":"50th-anniversary-photography","title":{"rendered":"50th Anniversary Photography"},"date":"2022-12-16T05:47:29","content":"<p>For us, there&#8217;s nothing more special then to witness this kind of celebrations! 50 years of marriage is something truly special, a huge milestone on its own. And having your family throw a surprise party for you to celebrate this incredible milestone makes it even more special! Congratulations Angela &amp; Heberto! Enjoy some of our favorite images of this gorgeous celebration!</p><figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\" height=\\"683\\" data-src=\\"https:/"},{"id":32617,"slug":"vizcaya-portrait-session","title":{"rendered":"Vizcaya Portrait Session"},"date":"2022-12-13T01:05:56","content":"<p>Vizcaya has always been a playground for us as photographers, because it has so much to offer.  From the beautiful mansion that&#8217;s an iconic place to visit in South Florida, to the gorgeous manicured gardens that are always breathtaking to see. </p><p>When we bring our clients here, we love seeing their reactions.  When they see the new scenes for their photo shoot, even though Vizcaya is one place for their photoshoot, it truly offers so many different scenarios.  The bay is definitely "},{"id":32439,"slug":"family-beach-sunrise-photos-cardiello-family","title":{"rendered":"Family Beach Sunrise Photos | Cardiello Family"},"date":"2022-11-09T00:11:39","content":"<p>Time for our yearly family sessions to start rolling.  We LOVE it when its this family&#8217;s turn as they are dear friends and truly so special to us</p><p>This year they decided to go for a different look so we headed at 6AM to Pompano beach for a sunrise photo session. Worth is? 100%!! The only way to get the water and crazy sky colors is at sunrise for South Florida and trust me, those colors will not disappoint, they are simply incredible!</p><p>Enjoy some of our favorites from this bea"},{"id":32327,"slug":"robbins-preserve-maternity-session-carol-diego","title":{"rendered":"Robbins Preserve Maternity Session | Carol + Diego"},"date":"2022-10-25T12:47:03","content":"<div data-elementor-type=\\"wp-post\\" data-elementor-id=\\"32327\\" class=\\"elementor elementor-32327\\" data-elementor-post-type=\\"post\\">\\n\\t\\t\\t\\t<section class=\\"elementor-section elementor-top-section elementor-element elementor-element-7ed9a48c elementor-section-boxed elementor-section-height-default elementor-section-height-default\\" data-id=\\"7ed9a48c\\" data-element_type=\\"section\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"elementor-container elementor-column-gap-default\\">\\n\\t\\t\\t\\t\\t<div class=\\"elementor-column elementor-col-100 element"},{"id":32270,"slug":"tree-tops-park-family-session-giacaman-family","title":{"rendered":"Tree Tops Park Family Session | Giacaman Family"},"date":"2022-10-10T15:14:34","content":"<p>Happy anniversary to our brother and sister!!! What a more precious way to celebrate such an important day than keeping these memories forever! </p><p>We took these photos right after hurricane Ian, so you could only imagine the amount of mosquitos there were after so much rain! We had to literally rush to take them before they would eat us alive lol. but you wouldn&#8217;t even imagine that by looking at the pictures! They did so good! </p><p>We went to one of our favorites parks to do famil"},{"id":32165,"slug":"sheraton-suites-fort-lauderdale-plantation-wedding-jessica-kiran","title":{"rendered":"Sheraton Suites Fort Lauderdale Plantation Wedding | Jessica + Kiran"},"date":"2022-10-06T22:50:08","content":"<p>What happens when you mix an Indian family with a Jewish family for a wedding? You get the FUNNEST wedding EVER! Even though there was a huge thunderstorm outside of the building, inside the party was lit! We&#8217;ve known the Levine family for many years, since Jessica&#8217;s sister got married! And we feel so blessed to be able to keep photographing this beautiful family! </p><p>Thank you for having us create memories for you to cherish forever! Enjoy some of our favorites: </p><p></p><fi"},{"id":31994,"slug":"whitney-farms-golf-course-wedding-monroe-ct-jennifer-gregory","title":{"rendered":"Whitney Farms Golf Course Wedding &#8211; Monroe, CT | Jennifer + Gregory"},"date":"2022-09-21T23:26:19","content":"<p>Jennifer and Gregory had their destination wedding at the Whitney Farms Gold Club in Monroe, CT. We met the very day of their wedding! Here&#8217;s how:</p><p>Just about two weeks prior to their wedding, I received a text message from Jennifer to see if we were available for their big day. After having to postpone their wedding during covid like many couples, they officially got married a year and a half ago and finally were able to celebrate their marriage with their closest family and frien"},{"id":31610,"slug":"destination-wedding-destin-fl-dawn-terry","title":{"rendered":"Destination Wedding &#8211; Destin, FL | Dawn + Terry"},"date":"2022-08-27T23:52:50","content":"<p>This next DESTINation wedding was everything! We flew out to Destin, FL to  shoot Dawn and Terry&#8217;s big day and were so happy to finally be able to meet them!</p><p>First of all, if you haven&#8217;t been to Destin yet, what are you waiting for? With a little bit of Mexico, Naples and Key West, Destin has the best of all worlds combined. From awesome food trucks to gorgeous Greek-like towns. Travelers from all over the US fly to Destin to enjoy the party scene but also the gorgeous cryst"},{"id":31430,"slug":"deer-creek-country-club-wedding-sabrina-andersson","title":{"rendered":"Deer Creek Country Club Wedding | Sabrina + Andersson"},"date":"2022-08-12T22:24:09","content":"<p>Had the pleasure of shooting Sabrina and Andersson this past weekend at the Deer Creek Country Club in Deerfield Beach. </p><p>We&#8217;ve known the Duarte&#8217;s for such a long time and it was so awesome being able to be a part of this very special day and being able to capture these beautiful moments for Sabrina and Andersson. </p><p>@Janydidmyhair rocked Sabrina&#8217;s hair and makeup and the Deer Creek Country Club was absolutely amazing to shoot at. We had the perfect day with clear s"},{"id":31239,"slug":"doral-park-country-club-heidy-david","title":{"rendered":"Doral Park Country Club | Heidy + David"},"date":"2022-08-08T18:30:19","content":"<p>Heidy is a very special girl to us, she&#8217;s the sweetest person in the room, funny and always giving, so when she called us to let us know about her wedding plans, we were so excited for her and honored to be part of her special day! </p><p>The day started with us capturing some quick getting ready shots of Heidy and David, and when I say quick I mean 20 minutes quick for both bride and groom who were getting ready at the same location, then we headed to a beautiful Kingdom Hall to witnes"},{"id":31186,"slug":"atticus-roche-miami-newborn-session","title":{"rendered":"Atticus Roche | Miami Newborn Session"},"date":"2022-08-06T17:03:29","content":"<p>One of our favorite sessions to shoot are newborn lifestyle photography, specially when dear friends calls us to capture these moments for them. Meet baby Atticus, the newest member to this gorgeous family! He&#8217;s a tiny little bundle of joy. Enjoy some of our favorites from this very special miami newborn session:</p><figure class=\\"wp-block-image size-full\\"><img decoding=\\"async\\" width=\\"1920\\" height=\\"1280\\" data-src=\\"https://acromatico.com/wp-content/uploads/2022/08/Miami-Newborn-Session-1"},{"id":31143,"slug":"south-florida-engagement-session-heidy-david","title":{"rendered":"South Florida Engagement Session | Heidy + David"},"date":"2022-07-06T16:53:02","content":"<p>What an honor it was to take these quick images of our friend Heidy and David. This was the most chill and casual session we&#8217;ve ever done. We went to our small park next to our house and litteraly took 15 minutes to take these quick images of them. We literally cannot wait till the wedding day! You guys make such a beautiful couple and we love to be part of your memories in this very special way! Love you, enjoy some of our favorites:</p><p></p><figure class=\\"wp-block-image size-full\\"><"},{"id":31093,"slug":"weston-baby-shower-atticus","title":{"rendered":"Weston Baby Shower | Atticus"},"date":"2022-06-06T15:04:06","content":"<p>Katrina and Billy are very special to us. They are dear friends of ours and we&#8217;ve been working together with them for a long time. We feel blessed to be called for their special events like births, baby showers, family events and yearly photo sessions. It&#8217;s so special to be part of our friends family this way. Their home has a gallery of moments throughout their history together and we feel blessed to have created so many of those memories for them that they will cherish forever. "},{"id":31049,"slug":"tree-tops-park-family-session-grugal-family","title":{"rendered":"Tree Tops Park Family Session | Grugal Family"},"date":"2022-06-06T14:31:48","content":"<p>This session hits our hearts so much. After seeing a post we made on instagram about how special your pets are we got a message asking us to do this family session because they don&#8217;t know how much more time they have left with their precious dog. Broke our hearts to hear this but felt so privileged to be able to give this family these memories to cherish forever with their beloved family member. The Grugal&#8217;s are also celebrating their 20th anniversary so we took advantage to make "},{"id":30960,"slug":"coral-gables-entrance-park","title":{"rendered":"Coral Gables Entrance Park"},"date":"2022-06-01T02:25:50","content":"<p>For this session we went to one of our favorite spots in South Florida that screams &#8220;Europe&#8221;. No, its not Vizcaya, we are talking about the Coral gables Entrance Park also known as &#8220;El Prado Entrance&#8221;.</p><figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"533\\" height=\\"800\\" data-src=\\"https://acromatico.com/wp-content/uploads/2022/06/Coral-Gables-Entrance-Park-Anniversary-Session-1.jpg\\" alt=\\"coral gables entrance park pergolas\\" class=\\"wp-image-30962 l"},{"id":30830,"slug":"greenpoint-loft-wedding-brooklyn-nessa-torry","title":{"rendered":"Greenpoint Loft Wedding &#8211; Brooklyn | Nessa + Torry"},"date":"2022-04-19T01:17:34","content":"<p>Just a few months ago, we were together with Nessa and Torry for their <a href=\\"https://acromatico.com/awosting-falls-engagement-nessa-torry/\\">engagement session</a>. By the time the session ended, we nearly froze to death. Clearly, the cold loves us. Despite spring finally springing, it was a nice and cool day on this Brooklyn wedding day. </p><p>Before heading to The Williamsburg Hotel we did a pit stop at Upstate Stock  to get fueled up for the day. It&#8217;s our fave! Nessa awaited us at"},{"id":30798,"slug":"newborn-photography-emilia","title":{"rendered":"Newborn Photography | Emilia"},"date":"2022-04-13T00:04:55","content":"<p>Lately, I&#8217;ve had the honor to work with brand new clients. By brand new, I mean new to the world! This little one is just six days old in these photos. Her name is Emilia and she was absolutely fantastic to work with!</p><p>Just a few weeks ago, I got to shoot her while she was still baking in the oven! Can&#8217;t believe she&#8217;s out in this world now, loved so much by her parents and everyone around her!</p><p>Check out her very first glamour shots, how do you think she did?</p><f"},{"id":30636,"slug":"lightner-museum-wedding-jane-dez","title":{"rendered":"Lightner Museum Wedding | Jane + Dez"},"date":"2022-04-05T01:51:08","content":"<p>After 20 years of creating moments and memories for beautiful people, I don&#8217;t think that we&#8217;ve ever taken so many photos in any wedding, ever!</p><p>I still can&#8217;t believe that it&#8217;s only been a year since Jane + Dez got <a href=\\"https://acromatico.com/secret-gardens-miami-engagement-session-jane-denzel/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">engaged at the Secret Gardens in Miami </a> and now we are here, witnessing one of the most important days of their lives at t"},{"id":30459,"slug":"lifestyle-newborn-session-jaelyn","title":{"rendered":"Lifestyle Newborn Session | Jaelyn"},"date":"2022-03-30T18:51:23","content":"<p>This lifestyle newborn session was extremely special to me. I got to photograph my dear friends&#8217; newborn, Jaelyn. They&#8217;re not just any friends, they&#8217;re the couple that we got to see fall in love with eachother right from the very day they met. I photographed their proposal, engagement, wedding, baby reveal and now this newborn session.</p><p>I&#8217;ve never seen so much love in one room. Being able to capture some natural, candid, shots of this new mama was just an amazing "},{"id":30424,"slug":"glen-island-park-maternity-ny-paula","title":{"rendered":"Glen Island Park Maternity, NY | Paula"},"date":"2022-03-30T18:23:17","content":"<p>For this next maternity sesh, we ended up nailing the PERFECT day during this bipolar spring weather here in NY.</p><p>Glen Island Park is such a great, diverse, location for some awesome pics. From castle to ruins, harbor to docks, greenery to beautiful trees. It has it all! On this 70 degree day, we took some light and airy boho shots of this mommy to be, Paula. </p><p>Maternity sessions, to me, aren&#8217;t just about the belly but the journey. What you&#8217;re feeling, how empowered you "},{"id":30403,"slug":"miami-studio-headshots-kata-carlos","title":{"rendered":"Miami Studio Headshots | Kata + Carlos"},"date":"2022-03-16T05:47:17","content":"<figure class=\\"wp-block-gallery columns-1 is-cropped wp-block-gallery-54 is-layout-flex wp-block-gallery-is-layout-flex\\"><ul class=\\"blocks-gallery-grid\\"><li class=\\"blocks-gallery-item\\"><figure><img decoding=\\"async\\" width=\\"1024\\" height=\\"683\\" data-src=\\"https://acromatico.com/wp-content/uploads/2022/03/Kata-Carlos-Axon-LATAM-1-1024x683.jpg\\" alt=\\"\\" data-id=\\"30405\\" data-full-url=\\"https://acromatico.com/wp-content/uploads/2022/03/Kata-Carlos-Axon-LATAM-1.jpg\\" data-link=\\"https://acromatico.com/?attachm"},{"id":30320,"slug":"miami-family-session-von-kretschmann-family","title":{"rendered":"Miami Family Session | Von Kretschmann Family"},"date":"2022-01-22T00:33:04","content":"<p>All the way from Chile meet this gorgeous family! Carol (the one with the green shirt)  is my sister in law that I happen to consider my best friend in life. I know not everyone is so blessed to have friendships like this one so if you do, always try to remind them how special they are. It&#8217;s funny how things happened, how we met and all the things we&#8217;ve lived together ever since. We&#8217;ve known each other since we were 13, we even went to the same school and we&#8217;ve been be"},{"id":30256,"slug":"awosting-falls-engagement-nessa-torry","title":{"rendered":"Awosting Falls Engagement | Nessa + Torry"},"date":"2021-12-23T23:52:03","content":"<p>They&#8217;ve been friends since they were 17. He loves Brooklyn, she loves nature. Meet Nessa and Torry!</p><p>He popped the question right at Central Park, I mean, how dreamy is that? Despite both being from the city, they wanted an upstate engagement session. Tricky part? Um, it&#8217;s kind of freezing!</p><p>Despite the ridiculously cold weather, we decided to go for it. Awosting Falls is the perfect spot for an engagement session. The best part? It was totally empty! The cold kept every"},{"id":30109,"slug":"pullman-miami-airport-hotel-wedding-oni-noel","title":{"rendered":"Pullman Miami Airport Hotel Wedding | Oni + Noel"},"date":"2021-12-09T05:08:55","content":"<p>The day is finally here! We got to witness Oni and Noel say &#8220;I Do&#8221; at the Pullman Miami Airport Hotel for their wedding.</p><p>A perfect winter day? This one! In South Florida that is&#8230;Sunny sky, zero humidity and most importantly, it wasn&#8217;t 20 degrees.</p><p>This wedding was proudly sponsored by lifesavers, because we sure did have some of them. Despite the many little hiccups, we all made it through.   The weather could not have been MORE perfect! This wedding was a t"},{"id":30038,"slug":"boho-senior-portrait-bal-harbour-jocelyn","title":{"rendered":"Boho Senior Portrait, Bal Harbour | Jocelyn"},"date":"2021-12-07T05:01:52","content":"<p>Senior sessions don&#8217;t come too too often for us, but when they do, we LOVE them.</p><p>We got to shoot Jocelyn&#8217;s boho senior portrait sesh at Bal Harbour Beach, one of our favorite beach locations to shoot at. </p><p>Working with Jocelyn was so refreshing and inspiring. Despite never having met her before, we felt an instant connection and my camera sure felt it! I asked her to give me a little vision of what she wanted and the rest was so easy. Capturing her contagious, energetic"},{"id":29913,"slug":"crystal-ballroom-wedding-alissa-imran","title":{"rendered":"Crystal Ballroom Wedding | Alissa + Imran"},"date":"2021-12-04T03:45:23","content":"<p>We had the opportunity to shoot Alissa and Imran&#8217;s <a href=\\"https://acromatico.com/fort-lauderdale-indian-wedding-alissa-imran/\\">Indian wedding</a> ceremony and now we get to do it all over again at the <a href=\\"https://www.crystalballroom.com/\\" target=\\"_blank\\" rel=\\"noopener\\">Crystal Ballroom</a> in Beach Place, Fort Lauderdale!</p><p>This multicultural couple has been a true blast to work with! A little boy, a newborn and having to plan two weddings, sure wasn&#8217;t an easy task. Yet"},{"id":29807,"slug":"wynwood-portrait-alexa","title":{"rendered":"Wynwood Portrait | Alexa"},"date":"2021-11-30T03:51:20","content":"<p>Had the pleasure of working with Alexa for this amazing Wynwood portrait featuring some of the amazing boho accessories from <a href=\\"https://www.instagram.com/kashiidesigns/\\" target=\\"_blank\\" rel=\\"noopener\\">Kashii Designs</a>!</p><p>Everyone knows Wynwood screams color and these amazing colors brought to life these beautiful crafted pieces made by wayuu artisans right from Colombia.</p><p>We got to shoot some of these pieces to be featured on their website and ig to prove that these amazing a"},{"id":29769,"slug":"robbins-preserve-family-session-seedman-family","title":{"rendered":"Robbins Preserve Family Session | Seedman Family"},"date":"2021-11-29T04:41:55","content":"<p>It was an absolute pleasure being able to be a part of the Seedman&#8217;s Family session for this year! </p><p>This little family was celebrating life, milestones and happiness while getting ready to run a 5k the next day. Truly inspirational family and I&#8217;m so happy I got to work with you all.</p><p>Robbins Preserve Park has been so fun to shoot at. No matter the amount of times we come here, it&#8217;s always a new perspective and no two sessions are ever the same.</p><p>Thank you for"},{"id":29717,"slug":"newborn-photography-celine","title":{"rendered":"Newborn Photography | Celine"},"date":"2021-11-29T03:11:55","content":"<p>This next post has our hearts! We got to do Celine&#8217;s newborn photography session at only 2 weeks old!</p><p>These proud parents got to have their second little girl and they couldn&#8217;t be more thrilled. This household is filled with all girls, including their doggie Belle. Needless to say, they&#8217;ve created some beautiful girls and we&#8217;re so proud to have been able to photograph both newborn photography sessions for them.</p><p>You might remember Claire in her newborn photo"},{"id":29657,"slug":"hugh-taylor-birch-park-family-session-visbal-family","title":{"rendered":"Hugh Taylor Birch Park  Family Session | Visbal Family"},"date":"2021-11-28T23:46:00","content":"<p>For our yearly family photo session with the Visbal Family, we made sure to get everything booked and set for them way ahead of time. Nothing was going to get in the way of their 2021 session&#8230;except when it comes to rain. It ALWAYS gets in the way.</p><p>Despite having to reschedule their Hugh Taylor Birch Park Family Session twice&#8230;it&#8217;s true what they say about the third time&#8230;except, it wasn&#8217;t a charm! Our actual rescheduled, photoshoot raincheck date, ended up r"},{"id":29540,"slug":"fort-lauderdale-indian-wedding-alissa-imran","title":{"rendered":"Fort Lauderdale Indian Wedding | Alissa + Imran"},"date":"2021-11-28T03:55:00","content":"<p>This next amazing wedding, was a cultural celebration right in the heart of Fort Lauderdale.</p><p>Alissa + Imran got to have their Indian Wedding celebration with their closest family and friends and we got to be a part of it! It was so much fun being able to work together with this beautiful couple. It was such a pleasure to be able to work with thee most amazing team:</p><p>MUA: <a href=\\"http://www.dejalanee.com\\" target=\\"_blank\\" rel=\\"noopener\\">Deja Lanee</a> + <a href=\\"http://www.makemeupn"},{"id":29478,"slug":"the-cruz-building-engagement-oni-noel","title":{"rendered":"The Cruz Building Engagement | Oni + Noel"},"date":"2021-11-10T23:09:16","content":"<p>This next couple will be getting married next month and we cannot wait!</p><p>Planning a wedding can be very overwhelming, especially during a pandemic, while a million unexpected things in life..just happen! Despite it all, Oni and Noel got to have their beautiful engagement session at the Cruz Building.</p><p>What a way to look so elegant and radiating through these epic photos. They sure came dressed to impress and we were totally loving it. </p><p>Warm tones, lots of light and drama, the "},{"id":29409,"slug":"dog-family-portrait-doozer-buckley","title":{"rendered":"Dog Family Portrait | Doozer + Buckley"},"date":"2021-11-03T17:26:02","content":"<p>They say (..who&#8217;s they?) &#8220;A house is not a home without a dog.&#8221; I can totally testify to that. Dana and Wesley are blessed to have TWO of them. They are the humans to the doggos Doozer and Buckley, were such a pleasure to work with for their Dog Family Portrait.</p><p>It&#8217;s not every day you get to marry your two loves: dogs and photography. I was totally stoked to be able to work on this one. This session was extra special as it was gifted to them by their lovely mom. "},{"id":29309,"slug":"robbins-preserve-family-session-campilii-family","title":{"rendered":"Robbins Preserve Family Session | Campilii Family"},"date":"2021-10-25T00:26:11","content":"<p>Where do you even begin when you get to shoot your favorite people at Robbins Park for their family session?</p><p>First of all, I&#8217;m extremely proud to call you my family:  brother, sister and coolest nephews in the world. Ale and Italo, you&#8217;ve taught me everything I know and I owe it all to the two of you. You&#8217;ve gifted me my career and I&#8217;m happy to be able to gift you these memories that I know you&#8217;ll be able to remember forever.</p><p>There&#8217;s so much to "},{"id":29230,"slug":"bal-harbour-anniversary-photoshoot-ashley-alex","title":{"rendered":"Bal Harbour Anniversary Photoshoot | Ashley + Alex"},"date":"2021-10-23T17:49:13","content":"<p>Ashely and Alex decided to celebrate their one year anniversary by capturing their memories at Bal Harbour.</p><p>Italo shot their wedding last year during their anniversary (they share the same wedding date!) and we go to capture their love after one year and a pandemic later.</p><p>Ashely said she wanted to get some boho vibes and also get in the water. This was a true recipe for BOMB beach photos! We love adventurous couples that are always up for anything. Despite not being a huge fan of "},{"id":29144,"slug":"matheson-hammock-park-family-portrait-cardiello-family","title":{"rendered":"Matheson Hammock Park Family Portrait | Cardiello Family"},"date":"2021-10-11T17:57:19","content":"<p>The family keeps growing and growing and we are so happy to capture the Cardiello Family for their yearly family portraits. </p><p>This time, we headed out to Matheson Hammock Park for this family sesh!</p><p>It was so fun capturing our dear friends and watching kids be kids. There&#8217;s nothing like siblings and it&#8217;s amazing how kids can get so big in the blink of an eye. Little Luca is already walking!</p><p>Such a pleasure being with you and creating some memories, enjoy some of ou"},{"id":29096,"slug":"tree-tops-park-maternity-josey-freddie","title":{"rendered":"Tree Tops Park Maternity | Josey + Freddie"},"date":"2021-10-08T13:54:18","content":"<p>There&#8217;s nothing better than watching a family grow, this time, with T W I N S. I had the honor of shooting Josey and Freddie&#8217;s Maternity sesh at Tree Tops Park for a true evergreen experience.</p><p>We just love Tree Tops Park and it never gets old coming here. It&#8217;s perfect for all types of sessions but this kind was truly something else. </p><p>They weren&#8217;t planning on having covid babies, little did they expect they&#8217;d be having covid twins! Yet, they rolled wit"},{"id":28888,"slug":"fern-forest-nature-center-wedding-geriliz-paul","title":{"rendered":"Fern Forest Nature Center Wedding | Geriliz + Paul"},"date":"2021-10-04T23:59:07","content":"<p>Limoncello, San Pellegrino, Pasta and ferns. This is how I&#8217;d sum up this Italian inspired Floridian wedding at the Fern Forest Nature Center.</p><p>It was such a pleasure finally getting to meet Geriliz and Paul. I have to say, this has been one of the most planned out weddings that actually everything went exactly as planned (and you KNOW that&#8217;s rare). You&#8217;re officially hired as a wedding planner, hehe!</p><p>Despite having a small, intimate wedding, this was definitely one"},{"id":28745,"slug":"vip-country-club-indian-wedding-ny-tessa-kurien","title":{"rendered":"VIP Country Club Indian Wedding, NY &#8211; Tessa + Kurien"},"date":"2021-07-30T04:33:28","content":"<p>We met Tessa and Kurien on their very own wedding day. The day couldn&#8217;t have been more perfect. End of July with zero humidity and a sunny day? I&#8217;ll take it!</p><p>How did we meet? This very day. It&#8217;s true. We don&#8217;t get to meet many of our bride and grooms until their wedding day. We usually prefer to even do an engagement session prior to the big day so we have a chance to bond and form a relationship.</p><p>Despite meeting Tessa and Kurien right on the spot, it was a"},{"id":28658,"slug":"bill-baggs-state-park-family-session-the-rivera-family","title":{"rendered":"Bill Baggs State Park Family Session |The Rivera Family"},"date":"2021-07-28T23:29:17","content":"<p>We went to the gorgeous Bill Baggs Cape Florida State Park for this unforgettable session! The first of many to come for this absolutely stunning family of 3. When Daniela contacted us to photograph her family we were extremely happy! not only because they are good friends but also because they have the MOST delicious baby boy and we couldn&#8217;t wait to meet him. You&#8217;ll see what we are talking about when you scroll down and see him and his beautiful big blue eyes. Enjoy some of our f"},{"id":28566,"slug":"firefighter-family-session-the-albadalejo-family","title":{"rendered":"Firefighter Family Session | The Albadalejo Family"},"date":"2021-07-07T01:33:04","content":"<p>We absolutely LOVED working with this super amazing family! It&#8217;s not everyday you get to go to the coolest fire station on earth right in FRONT of the beach in Miami and create beautiful memories for really really great people. It&#8217;s been a few years since our last family session with the Albadalejos so it was so nice to see them! Thank you for having us as part of your special family memories. Enjoy a few of our favorites from the session:</p><figure class=\\"wp-block-image size-ful"},{"id":28469,"slug":"connecticut-micro-wedding-tammy-tay","title":{"rendered":"Connecticut Micro Wedding | Tammy + Tay"},"date":"2021-07-04T01:01:49","content":"<p>For this next post, I got to work once again with Tammy and Tay, this time, for their Connecticut Micro Wedding.</p><p>You might remember these cuties from their fabulous Cold Spring <a href=\\"https://acromatico.com/cold-spring-ny-engagement-tammy-tay/\\">engagement sesh</a> in early May. I made them get in the water and get a little wet and they totally rocked with it.</p><p>For their wedding, we did something a little similar..except it was kind of not predicted, unwanted and definitely not pl"},{"id":28396,"slug":"wilton-ct-group-portrait-personal-branding-photoshoot","title":{"rendered":"Wilton, CT Group Portrait | Personal Branding Photoshoot"},"date":"2021-06-26T15:40:12","content":"<p>It&#8217;s not every day you get to stroll around Wilton, CT with a group of pretty ladies and shoot their group portrait for their personal branding.</p><p>I had such a great time working with these girls and vibing with their contagious positive energy. They made my job way too easy!</p><p>It was hot, it was sunny, yet these girls rocked their personal branding photoshoot and made it look so easy. Nothing like women that empower women with big smiles on their faces.</p><p>Thank you pretty l"},{"id":28131,"slug":"terrace-on-the-park-indian-wedding-ny-tintu-nemo","title":{"rendered":"Terrace On The Park Indian Wedding, NY &#8211; Tintu + Nemo"},"date":"2021-06-06T05:08:16","content":"<p>This wedding I have to say was very special. Not only did we get to work with one of the happiest grooms we&#8217;ve ever met but we also felt like we became a part of Tintu and Nirmal&#8217;s (aka Nemo&#8217;s) family.</p><p>We had the pleasure of shooting their <a href=\\"https://acromatico.com/central-park-indian-engagement-tintu-nemo/\\">engagement session</a> earlier this spring, with the most prettiest cherry blossom season right here in New York. What does this have to do with their weddin"},{"id":28105,"slug":"baby-portrait-miami-olivia","title":{"rendered":"Baby Portrait Miami | Olivia"},"date":"2021-06-01T18:54:44","content":"<p>We&#8217;ve been working with baby Olivia since before she was born! And she is the cutest little model out there! check out our latest session with this beauty queen and one of our favorite client: </p><figure class=\\"wp-block-image size-full\\"><img decoding=\\"async\\" width=\\"1200\\" height=\\"800\\" data-src=\\"https://acromatico.com/wp-content/uploads/2021/06/Baby-Portrait-Miami-1-1.jpg\\" alt=\\"\\" class=\\"wp-image-28111 lazyload\\" src=\\"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw"},{"id":28025,"slug":"cold-spring-ny-engagement-tammy-tay","title":{"rendered":"Cold Spring, NY &#8211; Engagement | Tammy + Tay"},"date":"2021-05-16T22:41:48","content":"<p>Photography is the gift that keeps on giving, after all, that&#8217;s exactly how we end up meeting most of our clients: through their very own friends.</p><p>When I met Tammy, she was walking one of our dear friend&#8217;s wedding. I never would&#8217;ve thought, just a few months later we&#8217;d be here, shooting her very own engagement sesh. </p><p>We had been planning the perfect session but the weather just didn&#8217;t seem to want to cooperate. New York has so many awesome locations a"},{"id":27943,"slug":"robbins-park-maternity-giacaman-family","title":{"rendered":"Robbins Park Maternity | Giacaman Family"},"date":"2021-05-14T20:16:43","content":"<p>By far this is one of the most special sessions this year! Not only this is our beautiful sister and brother welcoming another baby to the happy family of 3, but this happens to be the very awaited maternity session for THE FIRST baby girl of the family! We are so extremely excited to meet baby Gabriela coming soon!</p><p>This session seemed it was not going to happen yesterday, but despite the 80% chances of rain and the fact that it did rain and the park we had planed closed for the day, we"},{"id":27907,"slug":"the-ritz-carlton-bal-harbour-engagement-jessica-kiran","title":{"rendered":"The Ritz-Carlton Bal Harbour Engagement | Jessica + Kiran"},"date":"2021-04-24T19:33:17","content":"<p>We always LOVE it when we do a session at the Ritz Carlton in Bal Harbour! We used to be next door neighbors with this beautiful hotel a few years ago before babies and it bring back so many beautiful memories! </p><p>The original plan was to take the pictures at the beautiful beach they have in front but a tornado warning came earlier and the strong winds and uncontrollable rain made this impossible. What do you do when your clients fly all the way to Miami just to have their photos done wit"},{"id":27771,"slug":"garden-wedding-lisay-alex","title":{"rendered":"Garden Wedding | Lisay + Alex"},"date":"2021-04-24T15:45:22","content":"<p>You could literally say Lisay and Alex didn&#8217;t let ANYTHING ruin their wedding day. Not a global pandemic and certainly not a tornado warning during their day. </p><p>We have never seen such a poise and happy and  bride &amp; groom enjoying their outdoor wedding even though the rain was heavy and winds were strong. This is what made of this day such a special occasion for everyone. To witness the kind of person you both are.What a beautiful couple in every posible way. </p><p>You both en"},{"id":27744,"slug":"tree-tops-park-family-session","title":{"rendered":"Tree Tops Park | Family Session"},"date":"2021-04-16T19:23:38","content":"<p>What a better way to celebrate your 40 years of marriage than capturing this moment with the ones you love most: your family!</p><p>this is exactly what we did for this gorgeous couple celebrating the big 4-0!! So happy for you guys and the beautiful family you have created over the past 40 years. May you celebrate many many more years together! Please enjoy some of our favorites from this day:</p><figure class=\\"wp-block-image size-full\\"><img decoding=\\"async\\" width=\\"1920\\" height=\\"1280\\" data-s"},{"id":27683,"slug":"tree-tops-park-family-session-miguez-family","title":{"rendered":"Tree Tops Park Family Session | Miguez Family"},"date":"2021-04-15T15:12:05","content":"<p>Such a FUN bunch! We absolutely LOVED working with this gorgeous family of 5. They decided to go to one of our favorites parks here in South Florida: Tree Tops Park. We love the feel of this place because is so different, like if it came out of a book. Tall beautiful trees, lakes and random tree trunks scattered around make this park a truly magical place to visit. Enjoy some of our favorites:</p><figure class=\\"wp-block-image size-full\\"><img decoding=\\"async\\" width=\\"1200\\" height=\\"800\\" data-src"},{"id":27546,"slug":"central-park-indian-engagement-tintu-nemo","title":{"rendered":"Central Park Indian Engagement | Tintu + Nemo"},"date":"2021-04-11T04:06:37","content":"<p>They met during college almost 10 years ago, it was not love at first sight (for her) and he quickly got friend zoned. Of course, that all changed! This is the story of Tintu and Nemo. </p><p>Before we scroll down to the pictures we took in Central Park for this Indian Engagement session, I have to tell you a little bit about this sesh.</p><p>Tintu and Nemo contacted us during their quarantine and we scheduled the &#8220;perfect&#8221; spring day in April. They haven&#8217;t had the easiest y"},{"id":27473,"slug":"south-pointe-park-portrait-session-heimy-harold","title":{"rendered":"South Pointe Park Portrait Session | Heimy + Harold"},"date":"2021-04-09T20:44:45","content":"<p>South Pointe Park at South Beach in Miami is one of our ultimate favorite spots to shoot sessions, its such a fun, vibrant place that screams &#8220;Miami&#8221; from wherever you are looking. From the gorgeous white sandy beaches and turquoise clear water to  the beautiful modern, funky architecture, you can&#8217;t gp wrong when choosing this location for your next shoot. </p><p>And it was the perfect location for this beautiful couple that came all the way from Boston, MA. They wanted that"},{"id":27423,"slug":"personal-brand-photoshoot-jeilen","title":{"rendered":"Personal Brand Photoshoot | Jeilen"},"date":"2021-03-31T20:56:25","content":"<p>Meet Jeilen, a very talented and recently graduated Hairstylist.  We loved working with her on capturing a few portraits and she looked stunning! here are some of our favorite from this session: </p><figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\" height=\\"683\\" data-src=\\"https://acromatico.com/wp-content/uploads/2021/03/Personal-Brand-Photoshoot-1-1-1024x683.jpg\\" alt=\\"\\" class=\\"wp-image-27427 lazyload\\" src=\\"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAA"},{"id":27354,"slug":"secret-gardens-miami","title":{"rendered":"Secret Gardens Miami Engagement Session"},"date":"2021-03-15T23:54:42","content":"<p>Miami is a beautiful, vibrant city with a lot to offer. From the beaches to the nightlife, there is something for everyone in this city. And one of the best things about Miami is this amazing place: The Secret Gardens Miami.</p><h2 class=\\"wp-block-heading\\">Meet Jane + Denzel: a proposal story.</h2><figure class=\\"wp-block-image size-full\\"><img decoding=\\"async\\" width=\\"1200\\" height=\\"800\\" data-src=\\"https://acromatico.com/wp-content/uploads/2021/03/secret-gardens-miami-engagement-session-1-1.jpg\\" "},{"id":27235,"slug":"stamford-museum-nature-center-micro-wedding-yadi-jordan","title":{"rendered":"Stamford Museum &#038; Nature Center Micro Wedding | Yadi + Jordan"},"date":"2021-03-14T02:37:41","content":"<p>There&#8217;s nothing more special than to be there for your friends on the day of their micro wedding in the middle of a pandemic when you can only have the closest of people right by your side. Yes. I had the  h o n o r  of witnessing and capturing Yadi and Jordan&#8217;s micro wedding at the Stamford Museum &amp; Nature Center in Stamford, CT. </p><p>Story time. I can&#8217;t show you these pictures until I tell you a little background on these two. Yadi was the first person I &#8220;met&#"},{"id":27073,"slug":"east-miami-wedding-michelle-felipe","title":{"rendered":"East Miami Wedding | Michelle + Felipe"},"date":"2021-03-08T05:30:19","content":"<p>Miami has it&#8217;s special vibes, and today&#8217;s wedding was nothing short of it.  We met Michelle &amp; Felipe when we were invited to cover their proposal photos, and they&#8217;re totally made for one another.  Today marks their first special day for the rest of their lives, and we&#8217;re so thrilled to show you some behind-the-scenes images of their wedding day!</p><figure class=\\"wp-block-image size-full\\"><img decoding=\\"async\\" width=\\"1200\\" height=\\"800\\" data-src=\\"https://acromatico."},{"id":27016,"slug":"vizcaya-engagement-session-lisay-alex","title":{"rendered":"Vizcaya Engagement Session | Lisay + Alex"},"date":"2021-03-07T14:50:43","content":"<p>Lisay&#8217;s inspiration for her engagement was from the series of Netflix &#8220;The Grand Hotel&#8221;. If you know what show we are talking about then you&#8217;ll know the feel for this session had to be European. In Miami, the BEST place to achieve this kind of look is definitely, no questions asked: Vizcaya Museum and Gardens. We absolutely LOVE Vizcaya for so many reasons, but our top reasons are:</p><p>1- It looks like Italy, and we love Italy! </p><p>2- It has stunning views anywher"},{"id":26926,"slug":"cold-spring-ny-engagement-yadi-jordan","title":{"rendered":"Cold Spring, NY &#8211; Engagement | Yadi + Jordan"},"date":"2021-03-07T00:55:34","content":"<p>For this next sesh, we decided to take it to Cold Spring. Why? The name says it all..because it should already be spring and it&#8217;s just plain cold! </p><p>With just a few days away from their wedding and lot&#8217;s of final things left for the big day, we decided to do an early morning engagement session this am. Streets were empty in this little town, zero humans around, what could possibly be wrong with this picture? The fact that we did NOT plan for it to be THIS cold. After many hea"},{"id":26877,"slug":"personal-brand-photoshoot-alicia-from-legally-techie","title":{"rendered":"Personal Brand Photoshoot | Alicia From Legally Techie"},"date":"2021-02-25T03:22:04","content":"<p>Legally Techie. How cool is that name? You don&#8217;t often get to see girl girls I the tech workspace and Alicia blew our minds with her work! she is so down to earth and loves connecting with her customers and helping business owners with their biggest headaches. She has it all! if you ever need any advice form this gorgeous techie girl, make sure to call Alicia and check out her work here: www.ligallytechie.com and thank us later!</p><p>Meanwhile, enjoy some of our favorites from this per"},{"id":26633,"slug":"pawling-ny-snow-portrait-tifah","title":{"rendered":"Pawling, NY &#8211; Snow Portrait | Tifah"},"date":"2021-02-19T02:48:02","content":"<p>What do Sunday&#8217;s and snow days have in common? My camera.</p><p>Woke up to a text. 2 hours later we met up. Where to? Wherever. Headed to Pawling Park. Nothing was planned. The colors were perfect. Tifah absolutely rocked this by just being herself. A true winter wonderland: playground version.</p><p>Free spirited, happy and go with the flow. Loved her energy during this shoot. It was absolutely one I will never forget. Not only did we get to shoot in a fun playground in the middle of a"},{"id":26525,"slug":"coral-gables-country-club-wedding-chiara-rene","title":{"rendered":"Coral Gables Country Club Wedding | Chiara + Rene"},"date":"2021-02-01T15:35:56","content":"<p><strong>They say that it takes two to tango, and it’s no exception with these two.&nbsp;</strong></p><p>Rene always knew that Chiara was a lover of nature, and so he invited us to do their <a href=\\"https://acromatico.com/miami-proposal-chiara-rene/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">proposal</a> and we put on our ninja masks, and went to work behind the scenes.  Ever since then, it&#8217;s been such a blessing to work with them!</p><p>Chiara and Rene had been anxiously waiting for the"},{"id":26345,"slug":"florida-golf-course-wedding-ashley-alex","title":{"rendered":"Florida Golf Course Wedding | Ashley + Alex"},"date":"2020-12-25T21:48:22","content":"<p>COVID19 changed EVERYTHING, but when you love someone and want to spend the rest of your life with them, nothing should stop you from doing so, even if this means downsizing your guest list and changing the venue you had in mind. You can still have the wedding of your dreams and Ashley and Alex did just that. They married at a beautiful gulf country club in a very intimate setting. Enjoy some of our favorites from this special day:</p><figure class=\\"wp-block-image size-full\\"><img decoding=\\"as"},{"id":26145,"slug":"miami-marriott-biscayne-bay-wedding-natalya-peter","title":{"rendered":"Miami Marriott Biscayne Bay Wedding | Natalya + Peter"},"date":"2020-12-15T06:52:23","content":"<p>What a privilege it was to work this lovely wedding! Definitely one for the books in one of our absolute favorite venues in Miami.</p><p> Miami Marriott Biscayne Bay Wedding days are always a win! From the spectacular views of the bay to the highly amazing service you get its guaranteed your even will be a success. </p><figure class=\\"wp-block-image size-full\\"><img decoding=\\"async\\" width=\\"1820\\" height=\\"1213\\" data-src=\\"https://acromatico.com/wp-content/uploads/2020/12/Maimi-Marriott-Biscayne-Ba"},{"id":26073,"slug":"bal-harbour-maternity-session-jessica-danny","title":{"rendered":"Bal Harbour Maternity Session | Jessica + Danny"},"date":"2020-12-14T05:35:44","content":"<p>We absolutely LOVED working with Jessica, Danny and Benny for this beautiful sunrise maternity session! We felt like we&#8217;ve known each other from forever.. Thank you for trusting us with your special moment, loved creating these memories for you, enjoy some of our favorites from this beautiful morning: </p><figure class=\\"wp-block-image size-full\\"><img decoding=\\"async\\" width=\\"1820\\" height=\\"1213\\" data-src=\\"https://acromatico.com/wp-content/uploads/2020/12/Bal-Harbour-Maternity-Session-1-1."},{"id":25849,"slug":"deerfield-beach-family-session-visbal-family","title":{"rendered":"Deerfield Beach Family Session |Visbal Family"},"date":"2020-12-14T03:02:17","content":"<p>For the past 5 years we&#8217;ve had the privilege to work with this gorgeous family. We feel so blessed to be part of Ximena and Alvaro&#8217;s precious memories they have has a family every year.. Thank you for trusting us guys, means the world to us! Enjoy some of our favorites from this iconic 2020 year:</p><figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\" height=\\"767\\" data-src=\\"https://acromatico.com/wp-content/uploads/2020/12/Deerfield-Beach-Family-Session-1-2"},{"id":25670,"slug":"arlington-ma-micro-wedding-elle-hector","title":{"rendered":"Arlington, MA &#8211; Micro Wedding | Elle + Hector"},"date":"2020-11-27T05:32:20","content":"<p>A New York Wedding. That&#8217;s what they initially had planned.</p><p>Many of our dear brides have had to really change their wedding plans, pushing dates, having smaller weddings, sacrificing wedding parties, honeymoon and dear ones not being there. </p><p>In the case of Elle and Hector, they had to do all that while having to change all their prepaid wedding plans and move their wedding all the way to Massachusetts. When we found out their wedding turned into a destination, micro wedding,"},{"id":25506,"slug":"tree-tops-park-wedding-laura-antonio","title":{"rendered":"Tree Tops Park Wedding | Laura +Antonio"},"date":"2020-11-24T17:20:48","content":"<p>What a beautiful day this was. Tree Tops Park Wedding days are always a win! but for these 2 lovebirds it was truly something special. The forecast was predicting really bad weather, but to our surprise Florida decided to gift us the most beautiful blue skies instead. Laura you were one stunning bride. Even Chombi (their little dog) was super happy to see Laura walk down the aisle. We are so honored we got to be part of your union together, you make the most beautiful couple! Enjoy some of ou"},{"id":25392,"slug":"beacon-ny-engagement-elle-hector","title":{"rendered":"Beacon, NY &#8211; Engagement | Elle + Hector"},"date":"2020-11-17T04:45:21","content":"<p>He reserved a bookstore. She loves books. Hid a love story book in the shelves and then hid the ring inside a box that looked like a book. <a href=\\"https://www.binnaclebooks.com/\\" target=\\"_blank\\" rel=\\"noopener\\">Binnacle Books</a> in Beacon, NY. This is where Hector proposed to Elle (virtually), because you know, covid.</p><p>Fast forward to their engagement session, only a few days before their upcoming wedding in Boston. Right in that same Bookstore where she said: YES! Our friends at Binnac"},{"id":25201,"slug":"shoreham-long-island-ny-indian-wedding-christine-shawn","title":{"rendered":"Shoreham, Long Island, NY &#8211; Indian Wedding | Christine + Shawn"},"date":"2020-11-15T19:36:34","content":"<p>700 people. May 30th, 2020. These were the original wedding plans for Christine and Shawn.</p><p>We met this awesome couple in the beginning of covid. Everything was all up in the air and super confusing. We shot their <a href=\\"https://acromatico.com/dumbo-brooklyn-engagement-christine-shawn/\\">engagement session</a> at the Brooklyn Bridge and thought we&#8217;d be shooting their wedding in just a couple of months. That wasn&#8217;t the case.</p><p>Everyone&#8217;s worlds got rocked, their wed"},{"id":25022,"slug":"rusty-pelican-wedding-ashley-mike","title":{"rendered":"Rusty Pelican Wedding | Ashley + Mike"},"date":"2020-11-03T20:21:41","content":"<p>Whenever we receive a wedding inquiry that says &#8220;Rusty Pelican&#8221; as the venue you can&#8217;t understand the excitement! 11 years ago my hubby proposed and then we got married there! so this place holds precious memories for us!</p><p>Ashley and Mike, you guys make such a beautiful couple and we felt honored to be part of your special day. The emotions where high and the pictures show how much love there was in the room from everyone to you guys. Here are a few of our favorites, en"},{"id":24918,"slug":"gather-greene-coxsackie-ny-anniversary-tica-justin","title":{"rendered":"Gather Greene &#8211; Coxsackie, NY, Anniversary | Tica + Justin"},"date":"2020-10-18T23:16:45","content":"<p>What do you do when you&#8217;re in the middle of a pandemic and need to forget that you&#8217;re still in 2020 and it happens to be your 7th anniversary?</p><p>Easy. You go to <a href=\\"http://www.gathergreene.com/\\" target=\\"_blank\\" rel=\\"noopener\\">Gather Greene</a>.</p><p><strong>*** BRIDES, SURE YOU READ TIL THE END ***</strong></p><p>These lux, middle of the woods, tiny, woodsy, scandinavian, artsy, boho, cabins are all you need. AND they&#8217;re pet friendly. What else can you possibly wan"},{"id":24509,"slug":"new-milford-ct-fall-wedding-si-marcos","title":{"rendered":"New Milford, CT &#8211; Fall Wedding | Si + Marcos"},"date":"2020-10-09T03:18:35","content":"<p>This next wedding has our hearts. I had to give up my hubby (and awesome assistant) so he could marry our friends while I shot them. It was truly an unforgettable experience! </p><p>Despite the crazy circumstances we&#8217;re in and the endless amount of things these cuties had to tweak in order to have their perfect wedding day, this micro wedding was just EVERYTHING. I mean, we were all attacked  by the bees (again). Totally Si&#8217;s fault! A groomsmen got stung in the middle of the cerem"},{"id":24413,"slug":"lincoln-road-miami-engagement-session-natalya-peter","title":{"rendered":"Lincoln Road Miami Engagement Session | Natalya + Peter"},"date":"2020-10-07T19:18:48","content":"<p>We absolutely LOVE when we get clients like Natalia and Peter ready to make the most out of their session! We had a blast with these two! We got to enjoy a super fun afternoon in South Beach and it was almost empty for the first time ever! we where able to get inspired by the Tropical &#8211; European vibe this place has and get these cool shots:</p><figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\" height=\\"682\\" data-src=\\"https://acromatico.com/wp-content/uploads/202"},{"id":24323,"slug":"robbins-lodge-family-session-tejuca-family","title":{"rendered":"Robbins Lodge Family Session | Rodriguez Family"},"date":"2020-09-25T21:30:41","content":"<p>A few months ago we started venturing into another passion of ours, training people to grow their businesses, and we decided it would be a great idea to give our direct team a photoshoot, so here you have Amelia and her family, they come all the way from Orlando and made the trip for this special occasion! Meeting them wa so much fun, and it felt like we&#8217;ve known them for years!</p><p>When we started doing our training sessions, never did we imagined that this same team of girls will ev"},{"id":24268,"slug":"newborn-photography-luca","title":{"rendered":"Newborn Photography| Luca"},"date":"2020-09-13T00:52:40","content":"<p>There are times in life when you rejoice for accomplishments, and this is certainly one to remember.  We&#8217;ve been photographing our friends ever since their first newborn was announced, and within the past decade, their little family of two rapidly expanded to becoming a beautiful family of six! As soon as they found out on Luca&#8217;s newborn date, they scheduled us to do Luca&#8217;s newborn photography right away and we brought the studio to their house.  We&#8217;re so thrilled for "},{"id":24067,"slug":"blue-hill-farm-engagement-new-york-paula-roy","title":{"rendered":"Blue Hill Farm Engagement, New York | Paula + Roy"},"date":"2020-09-11T16:53:07","content":"<p>Paula and Roy chose the Blue Hill at Stone Barn farm location for their amazing engagement session. We have to just say, this next session is giving us all the feels.</p><p>These two were engaged in July, right on the day of their 10 year anniversary! They met at school and have been together ever since.</p><p>Paula and Roy were so much fun to work with. We got booked for this session overnight and they chose this great location: Blue Hill Farm right here in New York! The rest was totally unp"},{"id":23885,"slug":"fort-myers-wedding-angelica-jeasiel","title":{"rendered":"Fort Myers Wedding | Angelica + Jeasiel"},"date":"2020-09-05T03:46:29","content":"<p>This wedding was one for the books! It was an exciting one to be part of for sure! Not even a pandemic stopped these two lovebirds from having the wedding of their dreams, even though they had to sacrifice certain things they were determined to make the most out of this day, and sure they did! (they even jumped in the pool, because why not?) With only closed family members being part of the this special day it turned out to be very special, intimate and full of love with memories to treasure "},{"id":23549,"slug":"shulas-hotel-wedding-lorena-manny","title":{"rendered":"Shula&#8217;s Hotel Wedding | Lorena + Manny"},"date":"2020-08-28T20:32:30","content":"<p>Lorena and Many where determined to make this wedding happen, no matter what! Aside from the pandemic, that same day we where supposed to be hit by a category 1 hurricane BUT it didn&#8217;t happen! We had the most beautiful blue skies and were even able to fly a drone to take cool pictures and videos of the party!</p><p>The day started at the Sula&#8217;s Hotel in Miami where Lorena was getting ready with our beautiful and talented friend &#8220;<a href=\\"https://www.janydidmyhair.com\\" target"},{"id":23430,"slug":"waterfall-engagement-connecticut-si-marcos","title":{"rendered":"Waterfall Engagement, Connecticut | Si + Marcos"},"date":"2020-08-24T04:50:09","content":"<p>For this engagement session, we decided to be a little spontaneous and go with the flow. At first, we had this whole session planned, location was set, but then we said, hey LET&#8217;S JUST DO SOMETHING DIFFERENT. So we did! </p><p>**disclaimer, we (by we I mean me) did have a mini heart attack because the location we were originally going to was temporarily closed**</p><p>Marcos was on it and found us a new spot right away. All he told Si was: make sure to wear a flowy dress, so she did! Sh"},{"id":23323,"slug":"sunflower-maze-proposal-connecticut-si-marcos","title":{"rendered":"Sunflower Maze Proposal, Connecticut | Si + Marcos"},"date":"2020-08-17T03:59:15","content":"<p>She. Said. SI!</p><p>:: pun intended ::</p><p>We can&#8217;t believe we got to witness this epic proposal at a sunflower maze! We were there the moment Si and Marcos met and here we are, 10 months later, seeing him get down on one knee while she yells out: YES!</p><p>Si had no idea he was going to pop the question right this day. I mean, after all, it was supposed to be a simple, social-distanced, girls day out, while Marcos was &#8220;away&#8221; for work. Yes, this whole proposal was based "},{"id":23249,"slug":"baby-photo-session-miami-isaac","title":{"rendered":"Baby Photo Session Miami |Isaac"},"date":"2020-08-13T17:11:03","content":"<p>This baby right here is the cutest little thing! In the future, whenever we think of a happy baby this guy right here will pop to our minds forever. We have never seen a baby dancing bachata while moving his hips to the beat of the drums and throwing kisses to his auntie, fully enjoying life to the fullest! Enjoy some of our favorites from this little sailor, bachata dancer, professional cake eater:  </p><figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\" height=\\"682\\""},{"id":23078,"slug":"new-york-indian-wedding-geeta-vir","title":{"rendered":"New York Indian Wedding | Geeta + Vir"},"date":"2020-08-04T11:26:30","content":"<p>I don&#8217;t even know where to start with this amazing Indian Wedding we got to shoot in Glen Cove, Long Island. Everyone was just full of life, celebration and color explosions (literally!)</p><p>This wedding was so unique on its own and it&#8217;s definitely one I will never forget. Right in the middle of the pandemic, Geeta and Vir had their very close family members join them in their forever union as husband and wife. This Sikh-Punjab wedding was very memorable as Geeta was breaking tr"},{"id":22917,"slug":"miami-beach-maternity-session-cardiello-family","title":{"rendered":"Miami Beach Maternity Session | Cardiello Family"},"date":"2020-07-26T03:28:31","content":"<p>We look forward to working with our friends every year! It makes us so happy to be part of their special memories, and this one is so special as they are getting ready to welcome their fourth addition to the family! Luca will be so loved, can&#8217;t wait to meet him soon!</p><figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\" height=\\"682\\" data-src=\\"https://acromatico.com/wp-content/uploads/2020/07/Miami-Beach-Maternity-Session-001-6-1024x682.jpg\\" alt=\\"\\" class=\\"wp-ima"},{"id":22853,"slug":"miami-proposal-chiara-rene","title":{"rendered":"Miami Proposal | Chiara + Rene"},"date":"2020-07-17T05:37:43","content":"<p>Surprise proposals are our absolute favorite occasion to shoot! We love to be there and witness the raw emotions, the adrenaline, the love, the tears, the surprise face, the moment where it all started. And this time it was so special, Chiara and Rene make such  beautiful couple, inside and out. Thank you for allowing us to capture such a special moment in your lives. Enjoy some of our favorites from this Miami Proposal at the Glass and Vine restaurant in Miami:</p><figure class=\\"wp-block-ima"},{"id":22807,"slug":"baby-photo-session-olivia-roze","title":{"rendered":"Baby Photo Session | Olivia Roze"},"date":"2020-07-03T02:03:24","content":"<figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\" height=\\"767\\" data-src=\\"https://acromatico.com/wp-content/uploads/2020/07/Baby-Photo-Session-001-1024x767.jpg\\" alt=\\"\\" class=\\"wp-image-22830 lazyload\\" src=\\"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\\" style=\\"--smush-placeholder-width: 1024px; --smush-placeholder-aspect-ratio: 1024/767;\\" /></figure><figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\" height=\\"682\\" data-"},{"id":22727,"slug":"brooklyn-engagement-new-york-geeta-vir","title":{"rendered":"Brooklyn New York Engagement | Geeta + Vir"},"date":"2020-07-02T14:14:45","content":"<p>“We were supposed to get married last month in Mexico, 300 people”. Not an unusual quote. So many people have had to change their wedding plans due to covid, Geeta and Vir were no exception.</p><p>Despite it all, these guys are making the BEST of the situation to still move forward with their wedding plans, this time, in New York!</p><p>It was so fun and challenging at the same time shooting with a mask on and trying to guide them and having to yell so they could hear me. Literally: challenge"},{"id":22538,"slug":"country-club-prado-engagement-session-angelica-jeasiel","title":{"rendered":"Country Club Prado Engagement Session | Angelica + Jeasiel"},"date":"2020-06-22T23:17:22","content":"<figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\" height=\\"682\\" data-src=\\"https://acromatico.com/wp-content/uploads/2020/06/Country-Club-Prado-Engagement-Session-001-1024x682.jpg\\" alt=\\"\\" class=\\"wp-image-22544 lazyload\\" src=\\"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\\" style=\\"--smush-placeholder-width: 1024px; --smush-placeholder-aspect-ratio: 1024/682;\\" /></figure><figure class=\\"wp-block-image size-large\\"><img decoding=\\"async\\" width=\\"1024\\""}]'),Vs=new Rs;Vs.get("/",async t=>{const r=Mg;return t.html(`
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
  `)});Vs.get("/:slug",async t=>{const r=t.req.param("slug");return t.redirect(`/static/blog/${r}.html`)});const Pt=`
<footer class="bg-black border-t border-white/10 py-16">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
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
`,Tn="#4794A6",Rg=`
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
  /* Use Acromatico brand color: ${Tn} */
  
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
    color: ${Tn} !important;
  }
  
  .mobile-menu-search input:focus {
    border-color: ${Tn} !important;
    box-shadow: 0 0 0 3px rgba(71, 148, 166, 0.1) !important;
  }
  
  .mobile-menu-nav ul li a:hover {
    color: ${Tn} !important;
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
`;function pe(t){try{const r=JSON.parse(atob(t));return r.exp<Date.now()?null:r}catch{return null}}async function Dg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=pe(a);if(!s)return t.json({message:"Invalid token"},401);const{firstName:i,lastName:o,age:l,grade:d}=await t.req.json();if(!i||!o)return t.json({message:"First and last name required"},400);const h=await r.prepare(`
      INSERT INTO students (parent_id, first_name, last_name, age, grade, enrollment_status)
      VALUES (?, ?, ?, ?, ?, 'active')
    `).bind(s.id,i,o,l||null,d||null).run();return t.json({message:"Student added successfully",studentId:h.meta.last_row_id},201)}catch(r){return console.error("Add student error:",r),t.json({message:"Failed to add student: "+r.message},500)}}async function Bg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=pe(a);if(!s)return t.json({message:"Invalid token"},401);const{studentId:i,courseId:o}=await t.req.json();if(!i||!o)return t.json({message:"Student ID and Course ID required"},400);if(!await r.prepare("SELECT id FROM students WHERE id = ? AND parent_id = ?").bind(i,s.id).first())return t.json({message:"Student not found or unauthorized"},403);if(await r.prepare("SELECT id FROM enrollments WHERE student_id = ? AND course_id = ?").bind(i,o).first())return t.json({message:"Student already enrolled in this course"},400);const h=await r.prepare(`
      INSERT INTO enrollments (student_id, course_id, status, progress)
      VALUES (?, ?, 'active', 0)
    `).bind(i,o).run();return await r.prepare(`
      INSERT INTO class_attendance (live_class_id, student_id, status)
      SELECT id, ?, 'registered'
      FROM live_classes
      WHERE course_id = ? AND status = 'scheduled'
      AND datetime(scheduled_date || ' ' || scheduled_time) > datetime('now')
    `).bind(i,o).run(),t.json({message:"Enrollment created successfully",enrollmentId:h.meta.last_row_id},201)}catch(r){return console.error("Create enrollment error:",r),t.json({message:"Failed to create enrollment: "+r.message},500)}}async function Ng(t){try{const{DB_EDUCATION:r}=t.env,n=await r.prepare(`
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
    `).all();return t.json({courses:(n==null?void 0:n.results)||[]})}catch(r){return console.error("Browse courses error:",r),t.json({message:"Failed to load courses: "+r.message},500)}}async function Lg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=pe(a);if(!s)return t.json({message:"Invalid token"},401);let i;if(s.role==="student"){const l=await r.prepare("SELECT id FROM students WHERE parent_id = ? LIMIT 1").bind(s.id).first();i=l==null?void 0:l.id}else{const l=await r.prepare("SELECT id FROM students WHERE parent_id = ? LIMIT 1").bind(s.id).first();i=l==null?void 0:l.id}if(!i)return t.json({classes:[]});const o=await r.prepare(`
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
    `).bind(i,i).all();return t.json({classes:(o==null?void 0:o.results)||[]})}catch(r){return console.error("Get upcoming classes error:",r),t.json({message:"Failed to load classes: "+r.message},500)}}async function jg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=pe(a);if(!s)return t.json({message:"Invalid token"},401);const i=await r.prepare("SELECT id FROM students WHERE parent_id = ? LIMIT 1").bind(s.id).first();if(!i)return t.json({classes:[]});const o=await r.prepare(`
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
    `).bind(i.id,i.id).all();return t.json({classes:(o==null?void 0:o.results)||[]})}catch(r){return console.error("Get completed classes error:",r),t.json({message:"Failed to load classes: "+r.message},500)}}async function Fg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=pe(a);if(!s)return t.json({message:"Invalid token"},401);const{assignmentId:i,submissionText:o,fileUrl:l}=await t.req.json();if(!i)return t.json({message:"Assignment ID required"},400);const d=await r.prepare("SELECT id FROM students WHERE parent_id = ? LIMIT 1").bind(s.id).first();if(!d)return t.json({message:"Student not found"},404);const h=await r.prepare("SELECT id FROM assignment_submissions WHERE assignment_id = ? AND student_id = ?").bind(i,d.id).first();return h?(await r.prepare(`
        UPDATE assignment_submissions
        SET submission_text = ?, file_url = ?, submitted_at = datetime('now'), status = 'submitted'
        WHERE id = ?
      `).bind(o||null,l||null,h.id).run(),t.json({message:"Assignment updated successfully"})):(await r.prepare(`
        INSERT INTO assignment_submissions (assignment_id, student_id, submission_text, file_url, status)
        VALUES (?, ?, ?, ?, 'submitted')
      `).bind(i,d.id,o||null,l||null).run(),t.json({message:"Assignment submitted successfully"},201))}catch(r){return console.error("Submit assignment error:",r),t.json({message:"Failed to submit assignment: "+r.message},500)}}async function zg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=pe(a);if(!s)return t.json({message:"Invalid token"},401);const i=await r.prepare("SELECT id FROM students WHERE parent_id = ? LIMIT 1").bind(s.id).first();if(!i)return t.json({achievements:[]});const o=await r.prepare(`
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
    `).bind(i.id).all();return t.json({achievements:(o==null?void 0:o.results)||[]})}catch(r){return console.error("Get achievements error:",r),t.json({message:"Failed to load achievements: "+r.message},500)}}async function $g(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=pe(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const{title:i,description:o,category:l,priceMonthly:d,thumbnailUrl:h}=await t.req.json();if(!i)return t.json({message:"Title required"},400);const c=await r.prepare(`
      INSERT INTO courses (title, description, category, price_monthly, thumbnail_url, status)
      VALUES (?, ?, ?, ?, ?, 'active')
    `).bind(i,o||null,l||null,d||49,h||null).run();return t.json({message:"Course created successfully",courseId:c.meta.last_row_id},201)}catch(r){return console.error("Create course error:",r),t.json({message:"Failed to create course: "+r.message},500)}}async function qg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=pe(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const{courseId:i,classNumber:o,title:l,description:d,scheduledDate:h,scheduledTime:c,durationMinutes:p,meetingLink:f,meetingPassword:v}=await t.req.json();if(!i||!l||!h||!c)return t.json({message:"Course ID, title, date, and time required"},400);const m=await r.prepare(`
      INSERT INTO live_classes (course_id, class_number, title, description, scheduled_date, scheduled_time, duration_minutes, meeting_link, meeting_password, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'scheduled')
    `).bind(i,o||1,l,d||null,h,c,p||60,f||null,v||null).run();return t.json({message:"Class scheduled successfully",classId:m.meta.last_row_id},201)}catch(r){return console.error("Schedule class error:",r),t.json({message:"Failed to schedule class: "+r.message},500)}}async function Gg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=pe(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const{liveClassId:i,studentId:o,status:l,attendanceMinutes:d}=await t.req.json();return!i||!o||!l?t.json({message:"Class ID, student ID, and status required"},400):(await r.prepare(`
      INSERT INTO class_attendance (live_class_id, student_id, status, attendance_minutes, marked_by, marked_at)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
      ON CONFLICT(live_class_id, student_id) 
      DO UPDATE SET status = ?, attendance_minutes = ?, marked_by = ?, marked_at = datetime('now')
    `).bind(i,o,l,d||null,s.id,l,d||null,s.id).run(),t.json({message:"Attendance marked successfully"}))}catch(r){return console.error("Mark attendance error:",r),t.json({message:"Failed to mark attendance: "+r.message},500)}}async function Wg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=pe(a);if(!s)return t.json({message:"Invalid token"},401);const i=await r.prepare(`
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
    `).bind(s.id).all();return t.json({students:(i==null?void 0:i.results)||[]})}catch(r){return console.error("Get my students error:",r),t.json({message:"Failed to load students: "+r.message},500)}}async function Ug(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=pe(a);if(!s)return t.json({message:"Invalid token"},401);const i=await r.prepare("SELECT id FROM students WHERE parent_id = ? LIMIT 1").bind(s.id).first();if(!i)return t.json({courses:[]});const o=await r.prepare(`
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
    `).bind(i.id).all();return t.json({courses:(o==null?void 0:o.results)||[]})}catch(r){return console.error("Get student courses error:",r),t.json({message:"Failed to load courses: "+r.message},500)}}async function Hg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=pe(a);if(!s)return t.json({message:"Invalid token"},401);const i=await r.prepare("SELECT id FROM students WHERE parent_id = ? LIMIT 1").bind(s.id).first();if(!i)return t.json({assignments:[]});const o=await r.prepare(`
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
    `).bind(i.id,i.id).all();return t.json({assignments:(o==null?void 0:o.results)||[]})}catch(r){return console.error("Get student assignments error:",r),t.json({message:"Failed to load assignments: "+r.message},500)}}async function Yg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=pe(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const{courseId:i,liveClassId:o,title:l,description:d,dueDate:h,pointsPossible:c,assignmentType:p}=await t.req.json();if(!i||!l)return t.json({message:"Course ID and title required"},400);const f=await r.prepare(`
      INSERT INTO course_assignments (course_id, live_class_id, title, description, due_date, points_possible, assignment_type)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(i,o||null,l,d||null,h||null,c||100,p||"homework").run();return t.json({message:"Assignment created successfully",assignmentId:f.meta.last_row_id},201)}catch(r){return console.error("Create assignment error:",r),t.json({message:"Failed to create assignment: "+r.message},500)}}async function Vg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=pe(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const{submissionId:i,grade:o,feedback:l}=await t.req.json();return!i||o===void 0?t.json({message:"Submission ID and grade required"},400):(await r.prepare(`
      UPDATE assignment_submissions
      SET grade = ?, feedback = ?, graded_by = ?, graded_at = datetime('now'), status = 'graded'
      WHERE id = ?
    `).bind(o,l||null,s.id,i).run(),t.json({message:"Assignment graded successfully"}))}catch(r){return console.error("Grade assignment error:",r),t.json({message:"Failed to grade assignment: "+r.message},500)}}async function Kg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=pe(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const{studentId:i,achievementId:o}=await t.req.json();if(!i||!o)return t.json({message:"Student ID and achievement ID required"},400);const l=await r.prepare(`
      INSERT INTO student_achievements (student_id, achievement_id, awarded_by)
      VALUES (?, ?, ?)
      ON CONFLICT(student_id, achievement_id) DO NOTHING
    `).bind(i,o,s.id).run();return t.json({message:"Achievement awarded successfully",awardId:l.meta.last_row_id},201)}catch(r){return console.error("Award achievement error:",r),t.json({message:"Failed to award achievement: "+r.message},500)}}async function Jg(t){try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=pe(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const{userId:i,studentId:o,type:l,title:d,message:h,link:c}=await t.req.json();if(!i||!l||!d||!h)return t.json({message:"User ID, type, title, and message required"},400);const p=await r.prepare(`
      INSERT INTO notifications (user_id, student_id, type, title, message, link)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(i,o||null,l,d,h,c||null).run();return t.json({message:"Notification sent successfully",notificationId:p.meta.last_row_id},201)}catch(r){return console.error("Send notification error:",r),t.json({message:"Failed to send notification: "+r.message},500)}}const Qg=`<!DOCTYPE html>
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
</html>`,ar=()=>e("nav",{class:"glass-nav fixed top-0 left-0 right-0 z-50",children:[e("style",{children:`
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
    `}),e("div",{class:"max-w-7xl mx-auto px-6 lg:px-8",children:e("div",{class:"flex justify-between h-20 items-center",children:[e("div",{class:"flex items-center space-x-4 opacity-0",children:e("span",{children:"Spacer"})}),e("div",{class:"flex-1 flex justify-center",children:e("a",{href:"/",children:e("img",{src:"/static/acromatico-logo-transparent.png?v=3",alt:"Acromatico",class:"site-logo-header"})})}),e("div",{class:"flex items-center space-x-4",children:[e("a",{href:"/pricing",class:"btn-primary px-6 py-3 rounded-full font-semibold",children:"Enroll Now"}),e("a",{href:"/login",class:"header-signin text-gray-300 hover:text-white transition",children:"Sign In"})]})]})})]}),Xg=()=>e("nav",{class:"glass-nav fixed top-0 left-0 right-0 z-50",style:"background: rgba(253, 253, 251, 0.95); backdrop-filter: blur(20px); border-bottom: 1px solid #E8E5E0;",children:[e("style",{children:`
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
    `}),e("div",{class:"max-w-7xl mx-auto px-6 lg:px-8",children:e("div",{class:"flex justify-between h-20 items-center",children:[e("div",{class:"flex items-center space-x-4 opacity-0",children:e("span",{children:"Spacer"})}),e("div",{class:"flex-1 flex justify-center",children:e("a",{href:"/",children:e("img",{src:"/static/acromatico-logo-transparent.png?v=3",alt:"Acromatico",class:"site-logo-prints"})})}),e("div",{class:"flex items-center space-x-6",children:[e("a",{href:"/prints",style:"color: #3D3935; text-decoration: none; font-size: 16px; font-weight: 500;",children:"Prints"}),e("a",{href:"/about",style:"color: #3D3935; text-decoration: none; font-size: 16px;",children:"About"}),e("button",{onclick:"viewCart()",style:"position: relative; background: none; border: none; cursor: pointer; color: #3D3935; font-size: 24px; padding: 8px;",children:["🛒",e("span",{class:"cart-badge",style:"display: none; position: absolute; top: 0; right: 0; background: #3D3935; color: white; border-radius: 50%; width: 20px; height: 20px; font-size: 12px; align-items: center; justify-content: center; font-weight: 500;",children:"0"})]})]})]})})]}),Zg=()=>e("footer",{class:"bg-black border-t border-white/10 py-16",children:e("div",{class:"max-w-7xl mx-auto px-6 lg:px-8",children:[e("div",{class:"grid grid-cols-2 md:grid-cols-4 gap-12 mb-12",children:[e("div",{children:[e("h4",{class:"font-bold mb-4",style:"color: white;",children:"Academy"}),e("ul",{class:"space-y-2 text-gray-400 text-sm",children:[e("li",{children:e("a",{href:"/academy",class:"hover:text-white transition",children:"Curriculum"})}),e("li",{children:e("a",{href:"/pricing",class:"hover:text-white transition",children:"Pricing"})}),e("li",{children:e("a",{href:"/faq",class:"hover:text-white transition",children:"FAQ"})})]})]}),e("div",{children:[e("h4",{class:"font-bold mb-4",style:"color: white;",children:"Services"}),e("ul",{class:"space-y-2 text-gray-400 text-sm",children:[e("li",{children:e("a",{href:"/studio",class:"hover:text-white transition",children:"Studio"})}),e("li",{children:e("a",{href:"/prints",class:"hover:text-white transition",children:"Art Prints"})}),e("li",{children:e("a",{href:"/photography",class:"hover:text-white transition",children:"Photography"})})]})]}),e("div",{children:[e("h4",{class:"font-bold mb-4",style:"color: white;",children:"Company"}),e("ul",{class:"space-y-2 text-gray-400 text-sm",children:[e("li",{children:e("a",{href:"/about",class:"hover:text-white transition",children:"About"})}),e("li",{children:e("a",{href:"/blog",class:"hover:text-white transition",children:"Blog"})}),e("li",{children:e("a",{href:"/contact",class:"hover:text-white transition",children:"Contact"})})]})]}),e("div",{children:[e("h4",{class:"font-bold mb-4",style:"color: white;",children:"Legal"}),e("ul",{class:"space-y-2 text-gray-400 text-sm",children:[e("li",{children:e("a",{href:"/privacy",class:"hover:text-white transition",children:"Privacy"})}),e("li",{children:e("a",{href:"/terms",class:"hover:text-white transition",children:"Terms"})})]})]})]}),e("div",{class:"pt-8 pb-8 border-t border-white/10 text-center",children:[e("style",{children:`
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
        `}),e("a",{href:"/login",class:"footer-signin-btn",children:"Sign In to Your Account →"})]}),e("div",{class:"pt-8 border-t border-white/10 text-center text-gray-400 text-sm",children:e("p",{children:"© 2026 Acromatico. Built for creators, by creators."})})]})}),k=new Rs;k.use("/api/*",Tc());function ef(t){const r=t.toLowerCase();return r.includes("lead")||r.includes("customer")||r.includes("traffic")||r.includes("acquisition")?{category:"ACQUISITION",diagnosis:"🎯 You have an acquisition problem.",insight:"This is THE #1 business killer. Every other problem stems from not having enough qualified leads. Fix this and everything else gets easier."}:r.includes("time")||r.includes("hour")||r.includes("manual")||r.includes("automat")||r.includes("efficiency")?{category:"EFFICIENCY",diagnosis:"⏰ You have an efficiency problem.",insight:"Time = money. If you're spending 10 hours on manual work, that's 10 hours NOT spent on revenue. This compounds daily."}:r.includes("money")||r.includes("cost")||r.includes("expensive")||r.includes("price")||r.includes("margin")?{category:"ROI",diagnosis:"💰 You have an ROI problem.",insight:"Every dollar spent needs to return $3+. If your unit economics don't work, scaling just loses money faster."}:r.includes("trust")||r.includes("credibility")||r.includes("authority")||r.includes("brand")?{category:"AUTHORITY",diagnosis:"🛡️ You have an authority problem.",insight:"People buy from who they trust. Without credibility, you're fighting an uphill battle on every sale."}:r.includes("convert")||r.includes("close")||r.includes("sale")||r.includes("funnel")?{category:"CONVERSION",diagnosis:"📈 You have a conversion problem.",insight:"Traffic means nothing if it doesn't convert. This is pure math - and math can be fixed with the right frameworks."}:{category:"GROWTH BLOCKER",diagnosis:"🔥 You have a critical growth blocker.",insight:"This is costing you time, money, and momentum every single day. The longer it persists, the more opportunities you miss."}}function tf(t){const r=t.toLowerCase(),n={"saas|software|tech|app":{name:"SaaS/Tech",marketSize:"$700B+",growth:"18% YoY",opportunityScore:9,topPain:"Customer acquisition cost vs lifetime value",edgeInsight:"🚀 SaaS is BRUTAL. But if you solve a real pain better than competitors, users will PAY. Focus on retention over acquisition."},"ecommerce|retail|store|shop":{name:"E-commerce",marketSize:"$6T+",growth:"14% YoY",opportunityScore:8,topPain:"Standing out in crowded marketplace",edgeInsight:"🛒 D2C brands win on STORY + COMMUNITY. Amazon has logistics. You have personality. Use it."},"agency|marketing|consulting|services":{name:"Agency/Services",marketSize:"$500B+",growth:"11% YoY",opportunityScore:7,topPain:"Commoditization and price competition",edgeInsight:"💼 Services sell TIME. Position as OUTCOMES not hours. Productize your expertise into frameworks."},"coach|course|education|training":{name:"Education/Coaching",marketSize:"$350B+",growth:"20% YoY",opportunityScore:9,topPain:"Proving ROI and generating testimonials",edgeInsight:"🎓 People buy TRANSFORMATION. Show the before/after. Sell the result, not the process."}};for(const[a,s]of Object.entries(n))if(new RegExp(a).test(r))return s;return{name:"Your Industry",marketSize:"$$$B market",growth:"Growing rapidly",opportunityScore:8,topPain:"Differentiation",edgeInsight:"💡 Every industry has winners. The question is: what do THEY do that others don't?"}}function rf(t,r){const n=t.toLowerCase();let a="Unknown buying power",s="Unknown reachability",i="Unknown urgency";return n.includes("founder")||n.includes("ceo")||n.includes("owner")?(a="HIGH buying power - decision makers with budgets",i="HIGH urgency - their business depends on solving this"):n.includes("director")||n.includes("manager")||n.includes("head of")?(a="MEDIUM buying power - need approval but have influence",i="MEDIUM urgency - affects their performance metrics"):(a="Research their budget authority",i="Validate how critical this pain is"),n.includes("b2b")||n.includes("enterprise")||n.includes("business")?s="MEDIUM reach - LinkedIn, conferences, targeted ads":n.includes("consumer")||n.includes("individual")||n.includes("user")?s="HIGH reach - social, content, paid ads scale easily":s="Map their digital footprint",{buyingPower:a,reachability:s,urgency:i}}function nf(t){const r=t.toLowerCase();return r.includes("pre")||r.includes("0")||r.includes("idea")?{stage:"PRE-REVENUE",priority:"Get your first 10 paying customers",metrics:"Customer interviews, feedback quality, referral rate",timeline:"30-60 days to first sale",tactic:"Sell BEFORE you build. Pre-sell to validate demand. Manual outreach to 100 ideal customers."}:r.includes("5")||r.includes("10")?{stage:"$0-10K MRR",priority:"Double down on what's working",metrics:"CAC payback period, activation rate, churn",timeline:"90 days to $25K MRR",tactic:"Find your #1 acquisition channel. Go ALL IN. Ignore everything else. 10X that channel."}:r.includes("25")||r.includes("50")?{stage:"$10K-50K MRR",priority:"Systematize and scale",metrics:"LTV:CAC ratio, net retention, expansion revenue",timeline:"6-12 months to $100K",tactic:"Build systems. Hire strategically. Test channel #2. Retention > acquisition."}:{stage:"$50K+ MRR",priority:"Optimize unit economics and expand",metrics:"Gross margin, payback period, market penetration",timeline:"12-18 months to next milestone",tactic:"You're past PMF. Now it's about efficiency. Automate, delegate, multiply."}}function af(t,r){const n=t.split(",").length;let a="",s="";return n>=3?(a=`You're in a CROWDED space with ${n}+ direct competitors. That means the market is PROVEN but differentiation is CRITICAL.`,s="1. Find the GAP they all miss<br>2. Serve a TIGHTER niche better<br>3. Bundle solutions differently<br>4. Compete on experience, not features"):n===2?(a='Two main competitors means you can be the THIRD option - the "Goldilocks" choice.',s='1. Study what users HATE about both<br>2. Position as "best of both worlds"<br>3. Use comparison marketing<br>4. Steal their unhappy customers'):(a="One competitor? That validates demand but gives you MASSIVE opportunity.",s="1. Copy what works, improve what doesn't<br>2. Target their ignored segments<br>3. Undercut on price OR go premium<br>4. Move faster than they can react"),{positioning:a,strategy:s}}function sf(t,r){return`<div class="strategic-brief">
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
<p>Target: 10 customers @ $${tl(t.stage)}/mo = $${tl(t.stage)*10} MRR<br>
Channels: ${of(t.audience)}<br>
Conversion: ${lf(t.problem)}</p>
</div>

<p style="margin-top: 24px; padding: 16px; background: rgba(255,107,53,0.1); border-left: 4px solid #FF6B35; border-radius: 8px;">
<strong>Next Step:</strong> <a href="/contact" style="color: #FF6B35; text-decoration: underline; font-weight: 700;">Book a strategy call</a> and let's build this together. 🔥
</p>
</div>`}function tl(t){return t!=null&&t.includes("pre")?97:t!=null&&t.includes("5")||t!=null&&t.includes("10")?297:497}function of(t){const r=(t==null?void 0:t.toLowerCase())||"";return r.includes("founder")||r.includes("b2b")?"LinkedIn, cold email, partnerships":r.includes("consumer")||r.includes("user")?"TikTok, Instagram, paid ads":"Content marketing, SEO, referrals"}function lf(t){const r=(t==null?void 0:t.toLowerCase())||"";return r.includes("lead")?"Free audit/assessment → Paid strategy session":r.includes("time")?"ROI calculator → Demo → Trial":"Case study → Consultation → Proposal"}k.post("/api/spark-ai",async t=>{try{const{messages:r,userData:n}=await t.req.json(),a=r[r.length-1].content,s=r.filter(o=>o.role==="user").length;let i="";if(s===1){const o=ef(a);i=`"<em>${a}</em>"<br><br>${o.diagnosis}<br><br>🔍 This is a <strong>${o.category}</strong> problem. ${o.insight}<br><br><strong>What industry/business are you in?</strong> (This helps me benchmark you against competitors)`}else if(s===2){const o=tf(a);i=`Got it. <strong>${o.name}</strong> + "${n.problem}" = ${o.opportunityScore}/10 opportunity score.<br><br>📊 <strong>Market Intel:</strong><br>• Size: ${o.marketSize}<br>• Growth: ${o.growth}<br>• Main pain: ${o.topPain}<br><br>${o.edgeInsight}<br><br><strong>Who specifically feels "${n.problem}" the most?</strong> (Be surgical - "Series A SaaS founders" not "business owners")`}else if(s===3){const o=rf(a,n.problem||"");i=`Perfect. <strong>${a}</strong> struggling with "<em>${n.problem}</em>".<br><br>💰 ${o.buyingPower}<br>🎯 ${o.reachability}<br>⚡ ${o.urgency}<br><br><strong>What's your revenue stage?</strong><br>• Pre-revenue<br>• $0-10K MRR<br>• $10K-50K MRR<br>• $50K-100K MRR<br>• $100K+`}else if(s===4){const o=nf(a);i=`At <strong>${o.stage}</strong>, your ONLY focus: <strong>${o.priority}</strong>.<br><br>📈 Key metrics: ${o.metrics}<br>⏰ Timeline: ${o.timeline}<br><br>For "${n.problem}" → ${o.tactic}<br><br><strong>Who are your top 2-3 competitors?</strong>`}else if(s===5){const o=af(a,n);i=`${o.positioning}<br><br>🥊 <strong>Battle Plan:</strong><br>${o.strategy}<br><br><strong>Final question: What makes YOU different?</strong> Why would ${n.audience} choose you over ${a.split(",")[0]}?`}else s===6?i=sf(n,a):i=`Let me dig deeper on that. ${a} - tell me more about how this affects your ${n.business||"business"}.`;return t.json({message:i,userData:n})}catch(r){return console.error("Spark AI Error:",r),t.json({error:"AI temporarily unavailable",details:r.message},500)}});k.route("/blog",Vs);k.get("/api/mobile-menu",t=>t.html(Rg));k.get("/api/footer",t=>t.html(Pt));function md(t){return btoa(t+"acromatico-salt-2026")}function df(t){const r={userId:t.id,id:t.id,email:t.email,role:t.role,exp:Date.now()+6048e5};return btoa(JSON.stringify(r))}function te(t){try{const r=JSON.parse(atob(t));return r.exp<Date.now()?null:r}catch{return null}}function gd(t,r){const n=te(t);return!n||n.role!==r?null:n}const kt=async(t,r)=>{const n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const a=n.substring(7),s=gd(a,"admin");if(!s)return t.json({success:!1,error:"Unauthorized: Admin role required"},403);t.set("user",s),await r()},Gn=async(t,r)=>{const n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const a=n.substring(7),s=gd(a,"parent");if(!s)return t.json({success:!1,error:"Unauthorized: Parent role required"},403);t.set("user",s),await r()};k.post("/api/auth/signup",async t=>{try{const{DB_EDUCATION:r}=t.env,n=await t.req.json(),{firstName:a,lastName:s,email:i,password:o,role:l,age:d}=n;if(!a||!s||!i||!o||!l)return t.json({message:"All fields are required"},400);if(await r.prepare("SELECT id FROM users WHERE email = ?").bind(i).first())return t.json({message:"Email already registered"},400);const c=md(o),f=(await r.prepare(`
      INSERT INTO users (email, password_hash, role, first_name, last_name)
      VALUES (?, ?, ?, ?, ?)
    `).bind(i,c,l,a,s).run()).meta.last_row_id;return t.json({message:"Account created successfully",userId:f},201)}catch(r){return console.error("Signup error:",r),t.json({message:"Signup failed: "+r.message},500)}});k.post("/api/auth/login",async t=>{try{const{DB_EDUCATION:r}=t.env,n=await t.req.json(),{email:a,password:s}=n;if(!a||!s)return t.json({message:"Email and password required"},400);const i=await r.prepare(`
      SELECT id, email, password_hash, role, first_name, last_name
      FROM users
      WHERE email = ?
    `).bind(a).first();if(!i)return t.json({message:"Invalid email or password"},401);const o=md(s);if(i.password_hash!==o)return t.json({message:"Invalid email or password"},401);const l=df(i);return t.json({message:"Login successful",token:l,user:{id:i.id,email:i.email,role:i.role,firstName:i.first_name,lastName:i.last_name}})}catch(r){return console.error("Login error:",r),t.json({message:"Login failed: "+r.message},500)}});k.get("/api/auth/me",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({message:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s)return t.json({message:"Invalid or expired token"},401);const i=await r.prepare(`
      SELECT id, email, role, first_name, last_name, created_at
      FROM users
      WHERE id = ?
    `).bind(s.id).first();return i?t.json({user:i}):t.json({message:"User not found"},404)}catch(r){return console.error("Get user error:",r),t.json({message:"Failed to get user: "+r.message},500)}});k.post("/api/auth/reset-password",async t=>{try{const{email:r}=await t.req.json();if(!r)return t.json({message:"Email is required"},400);const{DB_EDUCATION:n}=t.env;return await n.prepare("SELECT id, email FROM users WHERE email = ?").bind(r).first()?(console.log(`Password reset requested for: ${r}`),t.json({message:"If an account with that email exists, a reset link has been sent."})):t.json({message:"If an account with that email exists, a reset link has been sent."})}catch(r){return console.error("Reset password error:",r),t.json({message:"Failed to process request: "+r.message},500)}});k.post("/api/admin/curriculum/seed",kt,async t=>{try{const{DB_EDUCATION:r}=t.env,{seedCurriculum:n}=await Promise.resolve().then(()=>pf),{seedAdminUsers:a}=await Promise.resolve().then(()=>ff),s=await a(r),i=await n(r);return t.json({success:!0,message:"✅ Database seeded successfully! Curriculum + Admin users created.",data:{adminUsers:s.users,modules:i.modules,weeks:i.weeks,total:s.users+i.modules+i.weeks}})}catch(r){return console.error("Seed error:",r),t.json({success:!1,message:"Failed to seed database: "+r.message},500)}});k.get("/api/admin/curriculum/modules",kt,async t=>{try{const{DB_EDUCATION:r}=t.env,{getAllModules:n}=await Promise.resolve().then(()=>sr),a=await n(r);return t.json({success:!0,data:a})}catch(r){return console.error("Get modules error:",r),t.json({success:!1,message:r.message},500)}});k.get("/api/admin/curriculum/module/:id",kt,async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("id"),{getModuleDetail:a}=await Promise.resolve().then(()=>sr),s=await a(r,n);return t.json({success:!0,data:s})}catch(r){return console.error("Get module detail error:",r),t.json({success:!1,message:r.message},500)}});k.post("/api/admin/curriculum/lesson",kt,async t=>{try{const{DB_EDUCATION:r}=t.env,n=await t.req.json(),{createLessonPlaceholder:a}=await Promise.resolve().then(()=>sr),s=await a(r,n);return t.json({success:!0,message:"Lesson placeholder created",lessonId:s})}catch(r){return console.error("Create lesson error:",r),t.json({success:!1,message:r.message},500)}});k.put("/api/admin/curriculum/lesson/:id",kt,async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("id"),a=await t.req.json(),{updateLesson:s}=await Promise.resolve().then(()=>sr);return await s(r,n,a),t.json({success:!0,message:"Lesson updated successfully"})}catch(r){return console.error("Update lesson error:",r),t.json({success:!1,message:r.message},500)}});k.delete("/api/admin/curriculum/lesson/:id",kt,async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("id"),{deleteLesson:a}=await Promise.resolve().then(()=>sr);return await a(r,n),t.json({success:!0,message:"Lesson deleted successfully"})}catch(r){return console.error("Delete lesson error:",r),t.json({success:!1,message:r.message},500)}});k.get("/api/student/progress/:lessonId",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("lessonId"),a=t.req.header("Authorization");if(!a||!a.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const s=a.substring(7),i=te(s);if(!i)return t.json({success:!1,error:"Invalid token"},401);const o=i.userId||i.id,l=await r.prepare(`
      SELECT * FROM curriculum_progress 
      WHERE user_id = ? AND lesson_id = ?
    `).bind(o,n).first();return t.json({success:!0,data:l||null})}catch(r){return console.error("Get progress error:",r),t.json({success:!1,error:r.message},500)}});k.post("/api/student/progress",async t=>{var r;try{const{DB_EDUCATION:n}=t.env,a=t.req.header("Authorization");if(!a||!a.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const s=a.substring(7),i=te(s);if(!i)return t.json({success:!1,error:"Invalid token"},401);const o=i.userId||i.id,l=await t.req.json(),{lesson_id:d,module_id:h,week_id:c,watch_time_seconds:p,progress_percent:f,status:v}=l;if(await n.prepare(`
      SELECT id FROM curriculum_progress 
      WHERE user_id = ? AND lesson_id = ?
    `).bind(o,d).first())await n.prepare(`
        UPDATE curriculum_progress 
        SET watch_time_seconds = ?, 
            progress_percent = ?, 
            status = ?,
            completed_at = CASE WHEN ? = 'completed' THEN datetime('now') ELSE completed_at END
        WHERE user_id = ? AND lesson_id = ?
      `).bind(p,f,v||"in_progress",v||"in_progress",o,d).run();else{const y=`prog-${Date.now()}-${Math.random().toString(36).substring(2,9)}`;await n.prepare(`
        INSERT INTO curriculum_progress 
        (id, user_id, lesson_id, module_id, week_id, watch_time_seconds, progress_percent, status, completed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, CASE WHEN ? = 'completed' THEN datetime('now') ELSE NULL END)
      `).bind(y,o,d,h,c,p,f,v||"in_progress",v||"in_progress").run()}if(v==="completed"){const{results:y}=await n.prepare(`
        SELECT COUNT(*) as count FROM curriculum_progress WHERE user_id = ? AND status = 'completed'
      `).bind(o).all(),g=((r=y[0])==null?void 0:r.count)||0,T=[{id:"ach-first-lesson",count:1},{id:"ach-5-lessons",count:5},{id:"ach-10-lessons",count:10},{id:"ach-25-lessons",count:25},{id:"ach-50-lessons",count:50}];for(const E of T)if(g===E.count){const{results:P}=await n.prepare(`
            SELECT id FROM user_achievements WHERE user_id = ? AND achievement_id = ?
          `).bind(o,E.id).all();if(P.length===0){await n.prepare(`
              INSERT INTO user_achievements (user_id, achievement_id)
              VALUES (?, ?)
            `).bind(o,E.id).run();const{results:A}=await n.prepare(`
              SELECT xp_reward FROM achievements WHERE id = ?
            `).bind(E.id).all();A.length>0&&await n.prepare(`
                INSERT INTO user_xp (user_id, total_xp, current_level, xp_to_next_level, rank_title)
                VALUES (?, ?, 1, 100, 'Beginner Creator')
                ON CONFLICT(user_id) DO UPDATE SET
                  total_xp = total_xp + ?,
                  updated_at = CURRENT_TIMESTAMP
              `).bind(o,A[0].xp_reward,A[0].xp_reward).run()}}}return t.json({success:!0,message:"Progress saved successfully"})}catch(n){return console.error("Save progress error:",n),t.json({success:!1,error:n.message},500)}});k.get("/api/student/progress/all",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s)return t.json({success:!1,error:"Invalid token"},401);const i=s.userId||s.id,{results:o}=await r.prepare(`
      SELECT * FROM curriculum_progress 
      WHERE user_id = ?
      ORDER BY created_at DESC
    `).bind(i).all();return t.json({success:!0,data:o})}catch(r){return console.error("Get all progress error:",r),t.json({success:!1,error:r.message},500)}});k.get("/api/student/submissions/:moduleId",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("moduleId"),a=t.req.header("Authorization");if(!a||!a.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const s=a.substring(7),i=te(s);if(!i)return t.json({success:!1,error:"Invalid token"},401);const o=i.userId||i.id,{results:l}=await r.prepare(`
      SELECT * FROM curriculum_submissions 
      WHERE user_id = ? AND module_id = ?
      ORDER BY submitted_at DESC
    `).bind(o,n).all();return t.json({success:!0,data:l})}catch(r){return console.error("Get submissions error:",r),t.json({success:!1,error:r.message},500)}});k.post("/api/student/submissions",async t=>{var r;try{const{DB_EDUCATION:n}=t.env,a=t.req.header("Authorization");if(!a||!a.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const s=a.substring(7),i=te(s);if(!i)return t.json({success:!1,error:"Invalid token"},401);const o=i.userId||i.id,l=await t.req.json(),{module_id:d,project_title:h,caption:c,media_url:p,media_type:f}=l,v=`sub-${Date.now()}-${Math.random().toString(36).substring(2,9)}`;await n.prepare(`
      INSERT INTO curriculum_submissions 
      (id, user_id, module_id, project_title, caption, media_url, media_type)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(v,o,d,h,c||"",p,f||"image").run();const{results:m}=await n.prepare(`
      SELECT COUNT(*) as count FROM curriculum_submissions WHERE user_id = ?
    `).bind(o).all(),y=((r=m[0])==null?void 0:r.count)||0,g=[{id:"ach-first-project",count:1},{id:"ach-5-projects",count:5},{id:"ach-10-projects",count:10}];for(const T of g)if(y===T.count){const{results:E}=await n.prepare(`
          SELECT id FROM user_achievements WHERE user_id = ? AND achievement_id = ?
        `).bind(o,T.id).all();if(E.length===0){await n.prepare(`
            INSERT INTO user_achievements (user_id, achievement_id)
            VALUES (?, ?)
          `).bind(o,T.id).run();const{results:P}=await n.prepare(`
            SELECT xp_reward FROM achievements WHERE id = ?
          `).bind(T.id).all();P.length>0&&await n.prepare(`
              INSERT INTO user_xp (user_id, total_xp, current_level, xp_to_next_level, rank_title)
              VALUES (?, ?, 1, 100, 'Beginner Creator')
              ON CONFLICT(user_id) DO UPDATE SET
                total_xp = total_xp + ?,
                updated_at = CURRENT_TIMESTAMP
            `).bind(o,P[0].xp_reward,P[0].xp_reward).run()}}return t.json({success:!0,message:"Submission created successfully",data:{id:v}})}catch(n){return console.error("Create submission error:",n),t.json({success:!1,error:n.message},500)}});k.put("/api/student/submissions/:id",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("id"),a=t.req.header("Authorization");if(!a||!a.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const s=a.substring(7),i=te(s);if(!i)return t.json({success:!1,error:"Invalid token"},401);const o=i.userId||i.id,l=await t.req.json(),{project_title:d,caption:h}=l;return await r.prepare(`
      UPDATE curriculum_submissions 
      SET project_title = ?, caption = ?
      WHERE id = ? AND user_id = ?
    `).bind(d,h,n,o).run(),t.json({success:!0,message:"Submission updated successfully"})}catch(r){return console.error("Update submission error:",r),t.json({success:!1,error:r.message},500)}});k.delete("/api/student/submissions/:id",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("id"),a=t.req.header("Authorization");if(!a||!a.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const s=a.substring(7),i=te(s);if(!i)return t.json({success:!1,error:"Invalid token"},401);const o=i.userId||i.id;return await r.prepare(`
      DELETE FROM curriculum_submissions 
      WHERE id = ? AND user_id = ?
    `).bind(n,o).run(),t.json({success:!0,message:"Submission deleted successfully"})}catch(r){return console.error("Delete submission error:",r),t.json({success:!1,error:r.message},500)}});k.get("/api/parent/children",Gn,async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.get("user"),a=n.userId||n.id,{results:s}=await r.prepare(`
      SELECT s.*, 
        COUNT(DISTINCT cp.id) as lessons_completed,
        COALESCE(AVG(cp.progress_percent), 0) as overall_progress
      FROM students s
      LEFT JOIN curriculum_progress cp ON cp.user_id = s.id AND cp.status = 'completed'
      WHERE s.parent_id = ?
      GROUP BY s.id
      ORDER BY s.created_at DESC
    `).bind(a).all();return t.json({success:!0,data:s})}catch(r){return console.error("Get children error:",r),t.json({success:!1,error:r.message},500)}});k.post("/api/parent/child",Gn,async t=>{try{const{DB_EDUCATION:r}=t.env,n=await t.req.json(),{firstName:a,lastName:s,age:i,grade:o}=n;if(!a||!s)return t.json({success:!1,error:"First name and last name are required"},400);const l=t.get("user"),d=l.userId||l.id,h=`stu-${Date.now()}-${Math.random().toString(36).substring(2,9)}`;return await r.prepare(`
      INSERT INTO students (id, parent_id, first_name, last_name, age, grade, enrollment_status)
      VALUES (?, ?, ?, ?, ?, ?, 'active')
    `).bind(h,d,a,s,i||null,o||null).run(),t.json({success:!0,data:{id:h,firstName:a,lastName:s,age:i,grade:o}})}catch(r){return console.error("Add child error:",r),t.json({success:!1,error:r.message},500)}});k.put("/api/parent/child/:id",Gn,async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.param("id"),a=await t.req.json(),{firstName:s,lastName:i,age:o,grade:l,enrollmentStatus:d}=a,h=t.get("user"),c=h.userId||h.id,{results:p}=await r.prepare(`
      SELECT id FROM students WHERE id = ? AND parent_id = ?
    `).bind(n,c).all();return p.length===0?t.json({success:!1,error:"Child not found or access denied"},404):(await r.prepare(`
      UPDATE students 
      SET first_name = ?, last_name = ?, age = ?, grade = ?, enrollment_status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND parent_id = ?
    `).bind(s,i,o,l,d,n,c).run(),t.json({success:!0,message:"Child updated successfully"}))}catch(r){return console.error("Update child error:",r),t.json({success:!1,error:r.message},500)}});k.get("/api/parent/child/:id/progress",Gn,async t=>{var r;try{const{DB_EDUCATION:n}=t.env,a=t.req.param("id"),s=t.get("user"),i=s.userId||s.id,{results:o}=await n.prepare(`
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
    `).bind(a).all(),{results:d}=await n.prepare(`
      SELECT COUNT(*) as count FROM curriculum_submissions WHERE user_id = ?
    `).bind(a).all();return t.json({success:!0,data:{child:o[0],progress:l,submissions_count:((r=d[0])==null?void 0:r.count)||0}})}catch(n){return console.error("Get child progress error:",n),t.json({success:!1,error:n.message},500)}});k.get("/api/student/achievements",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s)return t.json({success:!1,error:"Invalid token"},401);const i=s.userId||s.id,{results:o}=await r.prepare(`
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
    `).all();return t.json({success:!0,data:{earned:o,available:l,total_earned:o.length,total_available:l.length}})}catch(r){return console.error("Get achievements error:",r),t.json({success:!1,error:r.message},500)}});k.get("/api/student/xp",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s)return t.json({success:!1,error:"Invalid token"},401);const i=s.userId||s.id;let{results:o}=await r.prepare(`
      SELECT * FROM user_xp WHERE user_id = ?
    `).bind(i).all();return o.length===0&&(await r.prepare(`
        INSERT INTO user_xp (user_id, total_xp, current_level, xp_to_next_level, rank_title)
        VALUES (?, 0, 1, 100, 'Beginner Creator')
      `).bind(i).run(),o=[{user_id:i,total_xp:0,current_level:1,xp_to_next_level:100,rank_title:"Beginner Creator"}]),t.json({success:!0,data:o[0]})}catch(r){return console.error("Get XP error:",r),t.json({success:!1,error:r.message},500)}});k.get("/api/student/streak",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s)return t.json({success:!1,error:"Invalid token"},401);const i=s.userId||s.id;let{results:o}=await r.prepare(`
      SELECT * FROM streak_stats WHERE user_id = ?
    `).bind(i).all();return o.length===0&&(await r.prepare(`
        INSERT INTO streak_stats (user_id, current_streak, longest_streak, last_activity_date)
        VALUES (?, 0, 0, NULL)
      `).bind(i).run(),o=[{user_id:i,current_streak:0,longest_streak:0,last_activity_date:null}]),t.json({success:!0,data:o[0]})}catch(r){return console.error("Get streak error:",r),t.json({success:!1,error:r.message},500)}});k.post("/api/student/track-activity",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s)return t.json({success:!1,error:"Invalid token"},401);const i=s.userId||s.id,o=new Date().toISOString().split("T")[0];await r.prepare(`
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
    `).bind(i).all();let d=0;if(l.length>0){const c=l.map(p=>p.activity_date).sort().reverse();d=1;for(let p=1;p<c.length;p++){const f=new Date(c[p-1]),v=new Date(c[p]);if(Math.floor((f-v)/(1e3*60*60*24))===1)d++;else break}}await r.prepare(`
      INSERT INTO streak_stats (user_id, current_streak, longest_streak, last_activity_date)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET
        current_streak = ?,
        longest_streak = MAX(longest_streak, ?),
        last_activity_date = ?,
        updated_at = CURRENT_TIMESTAMP
    `).bind(i,d,d,o,d,d,o).run();const h=[{id:"ach-streak-3",days:3},{id:"ach-streak-7",days:7},{id:"ach-streak-14",days:14},{id:"ach-streak-30",days:30}];for(const c of h)if(d>=c.days){const{results:p}=await r.prepare(`
          SELECT id FROM user_achievements WHERE user_id = ? AND achievement_id = ?
        `).bind(i,c.id).all();if(p.length===0){await r.prepare(`
            INSERT INTO user_achievements (user_id, achievement_id)
            VALUES (?, ?)
          `).bind(i,c.id).run();const{results:f}=await r.prepare(`
            SELECT xp_reward FROM achievements WHERE id = ?
          `).bind(c.id).all();f.length>0&&await r.prepare(`
              UPDATE user_xp SET 
                total_xp = total_xp + ?,
                updated_at = CURRENT_TIMESTAMP
              WHERE user_id = ?
            `).bind(f[0].xp_reward,i).run()}}return t.json({success:!0,data:{currentStreak:d,today:o}})}catch(r){return console.error("Track activity error:",r),t.json({success:!1,error:r.message},500)}});k.post("/api/student/award-achievement",async t=>{try{const{DB_EDUCATION:r}=t.env,n=await t.req.json(),{achievementId:a}=n,s=t.req.header("Authorization");if(!s||!s.startsWith("Bearer "))return t.json({success:!1,error:"No token provided"},401);const i=s.substring(7),o=te(i);if(!o)return t.json({success:!1,error:"Invalid token"},401);const l=o.userId||o.id,{results:d}=await r.prepare(`
      SELECT id FROM user_achievements WHERE user_id = ? AND achievement_id = ?
    `).bind(l,a).all();if(d.length>0)return t.json({success:!1,error:"Achievement already earned"});const{results:h}=await r.prepare(`
      SELECT * FROM achievements WHERE id = ?
    `).bind(a).all();if(h.length===0)return t.json({success:!1,error:"Achievement not found"},404);await r.prepare(`
      INSERT INTO user_achievements (user_id, achievement_id)
      VALUES (?, ?)
    `).bind(l,a).run();const c=h[0].xp_reward;await r.prepare(`
      INSERT INTO user_xp (user_id, total_xp, current_level, xp_to_next_level, rank_title)
      VALUES (?, ?, 1, 100, 'Beginner Creator')
      ON CONFLICT(user_id) DO UPDATE SET
        total_xp = total_xp + ?,
        updated_at = CURRENT_TIMESTAMP
    `).bind(l,c,c).run();const{results:p}=await r.prepare(`
      SELECT * FROM user_xp WHERE user_id = ?
    `).bind(l).all(),f=p[0],{newLevel:v,newRank:m,xpToNext:y}=cf(f.total_xp);return v>f.current_level&&await r.prepare(`
        UPDATE user_xp SET
          current_level = ?,
          rank_title = ?,
          xp_to_next_level = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `).bind(v,m,y,l).run(),t.json({success:!0,data:{achievement:h[0],xp_earned:c,level_up:v>f.current_level,new_level:v}})}catch(r){return console.error("Award achievement error:",r),t.json({success:!1,error:r.message},500)}});function cf(t){const r=[{level:1,xp:0,rank:"Beginner Creator",next:100},{level:2,xp:100,rank:"Explorer",next:200},{level:3,xp:300,rank:"Adventurer",next:300},{level:4,xp:600,rank:"Storyteller",next:400},{level:5,xp:1e3,rank:"Filmmaker",next:500},{level:6,xp:1500,rank:"Creative Pro",next:700},{level:7,xp:2200,rank:"Visual Master",next:800},{level:8,xp:3e3,rank:"Legend",next:1e3}];for(let n=r.length-1;n>=0;n--)if(t>=r[n].xp)return{newLevel:r[n].level,newRank:r[n].rank,xpToNext:n<r.length-1?r[n+1].xp-t:0};return{newLevel:1,newRank:"Beginner Creator",xpToNext:100-t}}k.get("/api/curriculum/download-pdf",async t=>{try{const{DB_EDUCATION:r}=t.env,{results:n}=await r.prepare(`
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
`,new Response(a,{headers:{"Content-Type":"text/plain; charset=utf-8","Content-Disposition":'attachment; filename="Acromatico-Creator-Academy-Curriculum-2026.txt"',"Cache-Control":"public, max-age=3600"}})}catch(r){return console.error("PDF generation error:",r),t.json({success:!1,error:r.message},500)}});k.get("/api/admin/curriculum/stats",kt,async t=>{try{const{DB_EDUCATION:r}=t.env,{getCurriculumStats:n}=await Promise.resolve().then(()=>sr),a=await n(r);return t.json({success:!0,data:a})}catch(r){return console.error("Get stats error:",r),t.json({success:!1,message:r.message},500)}});k.get("/api/dashboard/student",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({message:"No token provided"},401);const a=n.substring(7);return te(a)?t.json({stats:{coursesEnrolled:0,lessonsCompleted:0,achievementsEarned:0,dayStreak:0},courses:[],achievements:[]}):t.json({message:"Invalid or expired token"},401)}catch(r){return console.error("Dashboard error:",r),t.json({message:"Failed to load dashboard: "+r.message},500)}});k.get("/api/dashboard/parent",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({message:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s)return t.json({message:"Invalid or expired token"},401);const i=s.id,o=await r.prepare(`
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
    `).bind(i).first();return t.json({students:(o==null?void 0:o.results)||[],subscription:l||null})}catch(r){return console.error("Parent dashboard error:",r),t.json({message:"Failed to load dashboard: "+r.message},500)}});k.get("/api/dashboard/admin",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!n||!n.startsWith("Bearer "))return t.json({message:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const i=await r.prepare('SELECT COUNT(*) as count FROM students WHERE enrollment_status = "active"').first(),o=await r.prepare("SELECT COUNT(*) as count FROM courses").first(),l=await r.prepare(`
      SELECT SUM(monthly_price) as total
      FROM subscriptions
      WHERE status = 'active'
    `).first(),d=await r.prepare(`
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
    `).all(),h=await r.prepare(`
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
    `).all();return t.json({stats:{totalStudents:(i==null?void 0:i.count)||0,activeCourses:(o==null?void 0:o.count)||0,monthlyRevenue:(l==null?void 0:l.total)||0,completionRate:0},students:(d==null?void 0:d.results)||[],courses:(h==null?void 0:h.results)||[]})}catch(r){return console.error("Admin dashboard error:",r),t.json({message:"Failed to load dashboard: "+r.message},500)}});k.post("/api/students/add",Dg);k.post("/api/enrollments/create",Bg);k.get("/api/students/my-students",Wg);k.get("/api/courses/browse",Ng);k.get("/api/enrollments/my-courses",Ug);k.get("/api/classes/upcoming",Lg);k.get("/api/classes/completed",jg);k.get("/api/assignments/my-assignments",Hg);k.post("/api/assignments/submit",Fg);k.get("/api/achievements/my-achievements",zg);k.post("/api/admin/courses/create",$g);k.post("/api/admin/classes/schedule",qg);k.post("/api/admin/attendance/mark",Gg);k.post("/api/admin/assignments/create",Yg);k.post("/api/admin/assignments/grade",Vg);k.post("/api/admin/achievements/award",Kg);k.post("/api/admin/notifications/send",Jg);k.get("/api/admin/students/all",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const i=await r.prepare(`
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
    `).all();return t.json({students:(i==null?void 0:i.results)||[]})}catch(r){return console.error("Get all students error:",r),t.json({message:"Failed to load students: "+r.message},500)}});k.get("/api/admin/classes/all",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const i=await r.prepare(`
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
    `).all();return t.json({classes:(i==null?void 0:i.results)||[]})}catch(r){return console.error("Get all classes error:",r),t.json({message:"Failed to load classes: "+r.message},500)}});k.get("/api/admin/classes/upcoming",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const i=await r.prepare(`
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
    `).all();return t.json({classes:(i==null?void 0:i.results)||[]})}catch(r){return console.error("Get upcoming classes error:",r),t.json({message:"Failed to load classes: "+r.message},500)}});k.get("/api/admin/revenue/stats",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const i=await r.prepare(`
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
    `).all(),d=(i==null?void 0:i.total)||0,h=(o==null?void 0:o.count)||0,c=h>0?d/h:0;return t.json({totalRevenue:d,activeSubscriptions:h,avgStudentValue:c,subscriptions:(l==null?void 0:l.results)||[]})}catch(r){return console.error("Get revenue stats error:",r),t.json({message:"Failed to load revenue: "+r.message},500)}});k.post("/api/admin/database/query",async t=>{try{const{DB_EDUCATION:r}=t.env,n=t.req.header("Authorization");if(!(n!=null&&n.startsWith("Bearer ")))return t.json({message:"No token provided"},401);const a=n.substring(7),s=te(a);if(!s||s.role!=="admin")return t.json({message:"Unauthorized"},403);const{query:i}=await t.req.json();if(!i)return t.json({message:"Query is required"},400);const o=await r.prepare(i).all();return t.json({results:(o==null?void 0:o.results)||[]})}catch(r){return console.error("Database query error:",r),t.json({message:"Query failed: "+r.message},500)}});k.post("/api/create-checkout",async t=>{try{const{STRIPE_SECRET_KEY:r}=t.env,n=new Og(r,{apiVersion:"2024-12-18.acacia"}),a=await t.req.json(),{items:s}=a,i=s.map(l=>{const d=l.sizePrice+l.framePrice;return{price_data:{currency:"usd",product_data:{name:`${l.printName} - ${l.size}"`,description:`✨ Limited Edition 1/100
🖋️ Hand-Signed by Italo Campilii & Ale
🎨 ${l.frameName} Frame
📐 ${l.size}" Museum-Quality Print
📄 Archival Paper • UV-Protected
🏗️ Artisan-Made • Built to Order
📦 Ships in 4-6 Weeks • Free US Shipping`,images:l.imageUrl?[l.imageUrl]:[]},unit_amount:d*100},quantity:l.quantity||1}}),o=await n.checkout.sessions.create({payment_method_types:["card"],line_items:i,mode:"payment",success_url:`${t.req.url.split("/api")[0]}/success?session_id={CHECKOUT_SESSION_ID}`,cancel_url:`${t.req.url.split("/api")[0]}/prints`,shipping_address_collection:{allowed_countries:["US","CA"]},metadata:{items:JSON.stringify(s.map(l=>({print:l.printName,size:l.size,frame:l.frameName})))}});return t.json({url:o.url})}catch(r){return console.error("Stripe error:",r),t.json({error:"Failed to create checkout session"},500)}});k.post("/api/support-ticket",async t=>{try{const{name:r,email:n,subject:a,message:s}=await t.req.json();if(!r||!n||!a||!s)return t.json({error:"All fields are required"},400);const i=`TICKET-${Date.now()}-${Math.random().toString(36).substring(2,7).toUpperCase()}`,o=`
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
    `.trim();return console.log("=== NEW SUPPORT TICKET ==="),console.log("Ticket ID:",i),console.log("From:",r,"<"+n+">"),console.log("Subject:",a),console.log("Message:",s),console.log("========================"),t.json({success:!0,ticketId:i,message:"Support ticket created successfully"})}catch(r){return console.error("Support ticket error:",r),t.json({error:"Failed to create support ticket"},500)}});k.get("/api/stripe-key",t=>t.json({publishableKey:t.env.STRIPE_PUBLISHABLE_KEY}));k.use(Jc);k.get("/",t=>t.redirect("/static/index.html"));k.get("/education",t=>t.render(e("div",{class:"min-h-screen bg-black text-white",children:[e("style",{children:`
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
      `}),e(ar,{}),e("section",{class:"relative h-screen flex items-start justify-end overflow-hidden",children:[e("div",{class:"absolute inset-0 hero-bg",style:"background: url('/static/images/hero-education-torres-high-angle-4k.jpg') center top/cover; animation: kenBurnsZoom 20s ease-in-out infinite alternate; filter: brightness(0.8) saturate(1.2);",children:[e("div",{class:"absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"}),e("div",{style:"position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,200,100,0.2) 20%, transparent 70%); pointer-events: none; mix-blend-mode: screen; animation: lensFlare 15s ease-in-out infinite; filter: blur(40px); top: 20%; left: 30%; z-index: 2;"}),e("div",{style:"position: absolute; inset: 0; background: repeating-linear-gradient(0deg, transparent 0px, rgba(255,255,255,0.03) 2px, transparent 4px); opacity: 0.4; animation: filmGrain 0.2s steps(10) infinite; pointer-events: none; z-index: 3;"})]}),e("div",{class:"relative z-20 max-w-4xl w-full px-6 md:px-12 pb-20 md:pb-32 text-left self-end",children:[e("h1",{class:"text-7xl md:text-8xl font-semibold tracking-tight mb-6",style:"letter-spacing: -0.05em; line-height: 0.95;",children:["See",e("br",{}),"differently."]}),e("p",{class:"text-2xl md:text-3xl font-light mb-12 text-white/90",style:"letter-spacing: -0.02em;",children:["Photography for young",e("br",{}),"creators 7–14."]}),e("div",{class:"flex flex-col sm:flex-row gap-4",children:[e("a",{href:"/checkout",class:"bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/90 transition inline-block text-center",children:"Start learning"}),e("a",{href:"#curriculum",class:"border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition inline-block text-center",children:"Explore curriculum"})]})]}),e("div",{class:"absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce",children:e("svg",{class:"w-6 h-10 text-white/60",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 14l-7 7m0 0l-7-7m7 7V3"})})})]}),e("section",{class:"py-32 bg-gradient-to-b from-black to-gray-900",children:e("div",{class:"max-w-6xl mx-auto px-6 lg:px-8",children:[e("div",{class:"max-w-6xl mx-auto mb-20",children:[e("div",{class:"text-center mb-16",children:[e("h2",{class:"text-5xl md:text-6xl font-black mb-6",children:"We're Italo & Ale"}),e("p",{class:"text-2xl text-white/90 font-light mb-8",children:"Parents. Photographers. Adventurers."}),e("p",{class:"text-2xl text-white leading-relaxed max-w-2xl mx-auto",children:"We teach kids to see the world differently—with a camera in hand and confidence in their vision."})]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-8 mb-12",children:[e("div",{children:e("img",{src:"/static/images/educators-ale-cropped.jpg",alt:"Ale - Professional Photographer & Educator",class:"w-full rounded-3xl shadow-2xl",style:"object-fit: cover; aspect-ratio: 3/4;"})}),e("div",{children:e("img",{src:"/static/images/educators-italo-cropped.jpg",alt:"Italo - Professional Photographer & Educator",class:"w-full rounded-3xl shadow-2xl",style:"object-fit: cover; aspect-ratio: 3/4;"})})]}),e("div",{class:"grid grid-cols-2 md:grid-cols-4 gap-8 text-center",children:[e("div",{children:[e("div",{class:"text-4xl font-light mb-2",children:"20+"}),e("div",{class:"text-sm text-gray-500 uppercase tracking-wider",children:"Years Pro"})]}),e("div",{children:[e("div",{class:"text-4xl font-light mb-2",children:"1,000+"}),e("div",{class:"text-sm text-gray-500 uppercase tracking-wider",children:"Events Shot"})]}),e("div",{children:[e("div",{class:"text-4xl font-light mb-2",children:"3"}),e("div",{class:"text-sm text-gray-500 uppercase tracking-wider",children:"Countries"})]}),e("div",{children:[e("div",{class:"text-4xl font-light mb-2",children:"1M+"}),e("div",{class:"text-sm text-gray-500 uppercase tracking-wider",children:"Images Taken"})]})]})]}),e("div",{class:"grid grid-cols-1 md:grid-cols-3 gap-8",children:[e("div",{class:"feature-card p-8 rounded-2xl text-center",children:[e("div",{class:"w-14 h-14 rounded-xl mb-4 flex items-center justify-center mx-auto",style:"background: #4794A6;",children:e("i",{class:"fas fa-camera text-2xl"})}),e("h3",{class:"text-xl font-bold mb-3",children:"Creator-First"}),e("p",{class:"text-gray-400 text-sm leading-relaxed",children:"Every lesson focuses on hands-on creation, not theory. Learn by doing."})]}),e("div",{class:"feature-card p-8 rounded-2xl text-center",children:[e("div",{class:"w-14 h-14 rounded-xl mb-4 flex items-center justify-center mx-auto",style:"background: #4794A6;",children:e("i",{class:"fas fa-calendar-day text-2xl"})}),e("h3",{class:"text-xl font-bold mb-3",children:"Flexible"}),e("p",{class:"text-gray-400 text-sm leading-relaxed",children:"Daily proration. No contracts. Pay only for what you use."})]}),e("div",{class:"feature-card p-8 rounded-2xl text-center",children:[e("div",{class:"w-14 h-14 rounded-xl mb-4 flex items-center justify-center mx-auto",style:"background: #4794A6;",children:e("i",{class:"fas fa-users text-2xl"})}),e("h3",{class:"text-xl font-bold mb-3",children:"Multi-Child Discounts"}),e("p",{class:"text-gray-400 text-sm leading-relaxed",children:"4+ students at just $9.88 per class (each)."})]})]})]})}),e("section",{id:"curriculum",class:"py-32 bg-black relative overflow-hidden",children:[e("iframe",{src:"https://www.youtube.com/embed/ekPhZnuaR0E?autoplay=1&mute=1&loop=1&playlist=ekPhZnuaR0E&controls=0&showinfo=0&modestbranding=1&playsinline=1&enablejsapi=1&rel=0&vq=hd1080",class:"absolute inset-0 w-full h-full pointer-events-none",style:"transform: scale(1.3); filter: brightness(1.1) saturate(1.2);",allow:"autoplay; encrypted-media",frameborder:"0"}),e("div",{class:"absolute inset-0 bg-black/40 z-10"}),e("div",{class:"absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10"}),e("div",{class:"relative z-20 max-w-6xl mx-auto px-6 lg:px-8",children:[e("div",{class:"text-center mb-20",children:[e("h2",{class:"text-5xl md:text-6xl font-black mb-6",children:"12-Month Journey"}),e("p",{class:"text-xl text-gray-400",children:"From finding your eye to storytelling through the lens"})]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"JANUARY"}),e("h4",{class:"text-xl font-bold mb-3",children:"Finding Your Eye"}),e("p",{class:"text-gray-400 text-sm",children:"Master composition, rule of thirds, leading lines"})]}),e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"FEBRUARY"}),e("h4",{class:"text-xl font-bold mb-3",children:"Light & Shadow"}),e("p",{class:"text-gray-400 text-sm",children:"Understanding natural light, golden hour, exposure"})]}),e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"MARCH"}),e("h4",{class:"text-xl font-bold mb-3",children:"Manual Mode Mastery"}),e("p",{class:"text-gray-400 text-sm",children:"Exposure triangle: aperture, shutter speed, ISO control"})]}),e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"APRIL"}),e("h4",{class:"text-xl font-bold mb-3",children:"Portrait Photography"}),e("p",{class:"text-gray-400 text-sm",children:"Capturing emotion, connection, and personality"})]}),e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"MAY"}),e("h4",{class:"text-xl font-bold mb-3",children:"Street Photography"}),e("p",{class:"text-gray-400 text-sm",children:"Candid moments, urban composition, storytelling"})]}),e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"JUNE"}),e("h4",{class:"text-xl font-bold mb-3",children:"Photo Essay Project"}),e("p",{class:"text-gray-400 text-sm",children:"Complete your first photo essay—10-15 curated images that tell a story"})]}),e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"SEPTEMBER"}),e("h4",{class:"text-xl font-bold mb-3",children:"Advanced Composition"}),e("p",{class:"text-gray-400 text-sm",children:"Breaking rules, creative framing, visual poetry"})]}),e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"OCTOBER"}),e("h4",{class:"text-xl font-bold mb-3",children:"Photo Editing Mastery"}),e("p",{class:"text-gray-400 text-sm",children:"Lightroom basics, turning good photos into great ones"})]}),e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"NOVEMBER"}),e("h4",{class:"text-xl font-bold mb-3",children:"Portfolio Building"}),e("p",{class:"text-gray-400 text-sm",children:"Curating work, presenting your unique vision"})]}),e("div",{class:"feature-card p-8 rounded-2xl",children:[e("div",{class:"text-teal-500 font-bold mb-2",children:"DECEMBER"}),e("h4",{class:"text-xl font-bold mb-3",children:"Year-End Showcase"}),e("p",{class:"text-gray-400 text-sm",children:"Present your best work to family and community"})]})]})]})]}),e("section",{class:"py-32 relative overflow-hidden",children:[e("div",{class:"absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900",children:[e("div",{class:"stars-small"}),e("div",{class:"stars-medium"}),e("div",{class:"stars-large"})]}),e("style",{dangerouslySetInnerHTML:{__html:`
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
        `}}),e("div",{class:"relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center",children:[e("h2",{class:"text-5xl md:text-6xl font-black mb-8",children:"Ready to Create?"}),e("p",{class:"text-2xl mb-12 opacity-90",children:"Learn from educators with 20+ years of professional experience"}),e("button",{onclick:"openEducationModal()",class:"btn-primary px-12 py-6 rounded-full text-xl font-bold text-white inline-block shadow-2xl border-0 cursor-pointer",children:"Enroll Now"})]})]}),e("div",{dangerouslySetInnerHTML:{__html:Pt}}),e("div",{id:"enrollment-modal",class:"fixed inset-0 bg-black/95 z-[100] hidden flex items-center justify-center p-4 overflow-y-auto",children:e("div",{class:"max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto",children:[e("div",{class:"mb-8",children:[e("div",{class:"flex justify-between mb-2 text-sm text-gray-400",children:[e("span",{id:"step-label",children:"Step 1 of 3"}),e("span",{id:"step-percentage",children:"33%"})]}),e("div",{class:"h-2 bg-gray-800 rounded-full overflow-hidden",children:e("div",{id:"progress-bar",class:"h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-500",style:"width: 33%"})})]}),e("div",{id:"step-1",class:"step-content",children:[e("h2",{class:"text-5xl font-black mb-4",children:"Create Your Free Account"}),e("p",{class:"text-xl text-gray-400 mb-8",children:"Get started in seconds - no credit card required"}),e("div",{class:"space-y-6",children:[e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"Parent Email"}),e("input",{type:"email",id:"parent-email",placeholder:"your@email.com",class:"w-full px-6 py-4 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-teal-500 focus:outline-none text-lg"})]}),e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"Create Password"}),e("input",{type:"password",id:"parent-password",placeholder:"Min 8 characters",class:"w-full px-6 py-4 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-teal-500 focus:outline-none text-lg"}),e("p",{class:"text-xs text-gray-500 mt-2",children:"Minimum 8 characters (letters, numbers, or symbols)"})]}),e("button",{onclick:"goToStep(2)",class:"btn-primary w-full px-8 py-5 rounded-full text-xl font-bold",style:"background: #4794A6;",children:"Continue →"})]}),e("div",{class:"mt-8 pt-8 border-t border-white/10",children:[e("div",{class:"flex items-center justify-center gap-3 text-sm text-gray-400",children:[e("svg",{class:"w-5 h-5 text-green-500",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("span",{class:"font-medium",children:"256-bit SSL Encryption"}),e("span",{class:"text-gray-600",children:"•"}),e("span",{children:"Your data is secure"})]}),e("p",{class:"text-center text-xs text-gray-500 mt-2",children:"We use industry-standard encryption (AES-256) and secure password hashing (bcrypt) to protect your information."})]})]}),e("div",{id:"step-2",class:"step-content hidden",children:[e("button",{onclick:"goToStep(1)",class:"text-gray-400 hover:text-white mb-3 flex items-center gap-2 text-sm",children:"← Back"}),e("h2",{class:"text-3xl font-black mb-2",children:"How Many Students?"}),e("p",{class:"text-base text-gray-400 mb-4",children:"Select the package that fits your family"}),e("div",{class:"flex items-center justify-center gap-3 mb-4 bg-gray-900 p-2 rounded-full inline-flex mx-auto",children:[e("button",{id:"monthly-toggle-btn",onclick:"toggleBilling('monthly')",class:"px-4 py-2 rounded-full font-semibold transition bg-teal-500 text-white text-sm",children:"Monthly"}),e("button",{id:"annual-toggle-btn",onclick:"toggleBilling('annual')",class:"px-4 py-2 rounded-full font-semibold transition text-gray-400 text-sm",children:["Annual ",e("span",{class:"text-teal-500 text-xs ml-1",children:"Save 20%"})]})]}),e("p",{class:"text-center text-xs text-gray-400 mb-4",children:[e("span",{class:"annual-note hidden",children:"Annual: 10 months (Sept-June). December: 2 special workshops!"}),e("span",{class:"monthly-note",children:"Billed monthly. Cancel anytime."})]}),e("div",{class:"grid grid-cols-2 gap-3 mb-4",children:[e("div",{class:"package-option feature-card p-4 rounded-xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative",onclick:"selectPackage(1)",children:[e("div",{class:"text-3xl font-black mb-1",children:"1"}),e("div",{class:"text-gray-400 text-xs mb-2",children:"Student"}),e("div",{class:"text-xl font-bold",children:[e("span",{class:"monthly-price",children:"$116"}),e("span",{class:"annual-price hidden",children:"$93"}),e("span",{class:"text-xs text-gray-500",children:"/mo"})]}),e("div",{class:"annual-savings text-teal-500 text-xs mt-1 hidden",children:"Save $230"}),e("div",{class:"text-xs text-gray-500 mt-2 monthly-per-class",children:"$14.50 per class"}),e("div",{class:"text-xs text-gray-500 mt-2 annual-per-class hidden",children:"$11.63 per class"})]}),e("div",{class:"package-option feature-card p-4 rounded-xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition ring-2 ring-teal-500 relative",onclick:"selectPackage(2)",children:[e("div",{class:"absolute -top-2 left-1/2 -translate-x-1/2 bg-teal-500 px-2 py-0.5 rounded-full text-xs font-bold",children:"Most Popular"}),e("div",{class:"text-3xl font-black mb-1",children:"2"}),e("div",{class:"text-gray-400 text-xs mb-2",children:"Students"}),e("div",{class:"text-xl font-bold",children:[e("span",{class:"monthly-price",children:"$99"}),e("span",{class:"annual-price hidden",children:"$79"}),e("span",{class:"text-xs text-gray-500",children:"/mo each"})]}),e("div",{class:"annual-savings text-teal-500 text-xs mt-1 hidden",children:"Save $400"}),e("div",{class:"text-xs text-gray-500 mt-2 monthly-per-class",children:"$12.38 per class (each)"}),e("div",{class:"text-xs text-gray-500 mt-2 annual-per-class hidden",children:"$9.88 per class (each)"})]}),e("div",{class:"package-option feature-card p-4 rounded-xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative",onclick:"selectPackage(3)",children:[e("div",{class:"text-3xl font-black mb-1",children:"3"}),e("div",{class:"text-gray-400 text-xs mb-2",children:"Students"}),e("div",{class:"text-xl font-bold",children:[e("span",{class:"monthly-price",children:"$89"}),e("span",{class:"annual-price hidden",children:"$71"}),e("span",{class:"text-xs text-gray-500",children:"/mo each"})]}),e("div",{class:"annual-savings text-teal-500 text-xs mt-1 hidden",children:"Save $540"}),e("div",{class:"text-xs text-gray-500 mt-2 monthly-per-class",children:"$11.13 per class (each)"}),e("div",{class:"text-xs text-gray-500 mt-2 annual-per-class hidden",children:"$8.88 per class (each)"})]}),e("div",{class:"package-option feature-card p-4 rounded-xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative",onclick:"selectPackage(4)",children:[e("div",{class:"text-3xl font-black mb-1",children:"4+"}),e("div",{class:"text-gray-400 text-xs mb-2",children:"Students"}),e("div",{class:"text-xl font-bold",children:[e("span",{class:"monthly-price",children:"$79"}),e("span",{class:"annual-price hidden",children:"$63"}),e("span",{class:"text-xs text-gray-500",children:"/mo each"})]}),e("div",{class:"annual-savings text-teal-500 text-xs mt-1 hidden",children:"Save $640"}),e("div",{class:"text-xs text-gray-500 mt-2 monthly-per-class",children:"$9.88 per class (each)"}),e("div",{class:"text-xs text-gray-500 mt-2 annual-per-class hidden",children:"$7.88 per class (each)"})]})]}),e("div",{class:"feature-card p-4 rounded-xl mt-4",children:[e("h3",{class:"text-base font-bold mb-3 text-center",children:"Everything Included"}),e("div",{class:"grid grid-cols-1 gap-2 text-xs",children:[e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"30-Minute Micro-Learning Sessions"}),e("div",{class:"text-gray-400 text-xs",children:"Perfect for young creators' attention spans - 8 live classes/month (Mon & Thu 11:30 AM ET)"})]})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"Lifetime Instruction Library"}),e("div",{class:"text-gray-400 text-xs",children:"Can't make it live? Catch up on expert-led teachings anytime."})]})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"December Bonus Workshops"}),e("div",{class:"text-gray-400 text-xs",children:"First 2 weeks of December: Special 1-hour fun workshops to celebrate the year!"})]})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"Portfolio Building"}),e("div",{class:"text-gray-400 text-xs",children:"Showcase your child's work and track their creative journey"})]})]})]})]})]}),e("div",{id:"step-3",class:"step-content hidden",children:[e("button",{onclick:"goToStep(2)",class:"text-gray-400 hover:text-white mb-4 flex items-center gap-2",children:"← Back"}),e("h2",{class:"text-5xl font-black mb-4",children:"Complete Enrollment"}),e("p",{class:"text-xl text-gray-400 mb-8",children:["You selected ",e("span",{id:"selected-package",class:"text-teal-500"})]}),e("div",{class:"feature-card p-6 rounded-2xl mb-6",children:[e("div",{class:"flex justify-between mb-4",children:[e("span",{class:"text-gray-400",children:"Students"}),e("span",{id:"summary-students",class:"font-bold"})]}),e("div",{class:"flex justify-between mb-4",children:[e("span",{class:"text-gray-400",children:"Price per student"}),e("span",{id:"summary-price",class:"font-bold"})]}),e("div",{class:"flex justify-between pt-4 border-t border-white/10",children:[e("span",{id:"summary-label",class:"text-xl font-bold",children:"Total Today (Prorated)"}),e("span",{id:"summary-total",class:"text-xl font-bold text-teal-500"})]}),e("div",{id:"savings-display",class:"flex justify-between mt-2 hidden",children:[e("span",{class:"text-sm text-gray-400",children:"Annual Savings"}),e("span",{id:"summary-savings",class:"text-sm font-bold text-green-500"})]}),e("p",{id:"proration-note",class:"text-xs text-gray-500 mt-2",children:"*First month prorated based on days remaining"})]}),e("div",{class:"space-y-4 mb-6",children:e("div",{class:"bg-gray-900 border-2 border-gray-800 rounded-xl p-6",children:e("p",{class:"text-sm text-gray-400",children:"Stripe payment form will appear here"})})}),e("button",{onclick:"completeEnrollment()",class:"btn-primary w-full px-8 py-5 rounded-full text-xl font-bold",style:"background: #4794A6;",children:"Complete Enrollment 🎉"})]}),e("button",{onclick:"closeEnrollment()",class:"absolute top-8 right-8 text-gray-400 hover:text-white text-4xl",children:"×"})]})}),e("script",{dangerouslySetInnerHTML:{__html:`
        let currentStep = 1;
        let selectedStudents = 0;
        let selectedPrice = 0;
        let isAnnual = false;
        
        const pricingData = {
          monthly: { 1: 116, 2: 99, 3: 89, 4: 79 },
          annual: { 1: 93, 2: 79, 3: 71, 4: 63 }
        };

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
        }

        function selectPackage(students) {
          selectedStudents = students;
          selectedPrice = isAnnual ? pricingData.annual[students] : pricingData.monthly[students];
          
          // Calculate totals
          const pricePerStudent = selectedPrice;
          const monthlyTotal = pricePerStudent * students;
          
          let totalCharge, chargeLabel;
          
          if (isAnnual) {
            // Annual: 10 months prepaid (school year, no summer)
            totalCharge = monthlyTotal * 10;
            chargeLabel = 'Total (10 months prepaid)';
          } else {
            // Monthly: prorated for first month
            const today = new Date();
            const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
            const daysRemaining = daysInMonth - today.getDate() + 1;
            totalCharge = (monthlyTotal / daysInMonth) * daysRemaining;
            chargeLabel = 'Total Today (Prorated)';
          }
          
          // Calculate savings for display (Annual vs Monthly)
          const yearlySavings = isAnnual ? 
            ((pricingData.monthly[students] * students * 10) - (pricePerStudent * students * 10)) : 0;
          
          // Update summary
          const billingText = isAnnual ? ' (Annual - 10 months)' : ' (Monthly)';
          document.getElementById('selected-package').textContent = 
            students + (students >= 4 ? '+' : '') + ' student' + (students > 1 ? 's' : '') + billingText;
          document.getElementById('summary-students').textContent = students + (students >= 4 ? '+' : '');
          document.getElementById('summary-price').textContent = '$' + pricePerStudent + '/mo per student' + (isAnnual ? ' (20% off)' : '');
          document.getElementById('summary-total').textContent = '$' + totalCharge.toFixed(2);
          
          // Update the label and savings display
          document.getElementById('summary-label').textContent = chargeLabel;
          
          if (isAnnual) {
            document.getElementById('savings-display').classList.remove('hidden');
            document.getElementById('summary-savings').textContent = '-$' + yearlySavings.toFixed(2);
            document.getElementById('proration-note').classList.add('hidden');
          } else {
            document.getElementById('savings-display').classList.add('hidden');
            document.getElementById('proration-note').classList.remove('hidden');
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
          
          const billingType = isAnnual ? 'Annual (10 months prepaid - school year)' : 'Monthly';
          const pricePerStudent = selectedPrice;
          const monthlyTotal = pricePerStudent * selectedStudents;
          const totalCharge = isAnnual ? monthlyTotal * 10 : monthlyTotal;
          
          alert('🎉 Enrollment Complete!\\n\\nEmail: ' + email + '\\nPackage: ' + selectedStudents + ' students at $' + pricePerStudent + '/mo each\\nBilling: ' + billingType + '\\nTotal: $' + totalCharge.toFixed(2) + '\\n\\nStripe integration will be added next!');
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
      `}}),e("div",{id:"educationProgramsModal",class:"fixed inset-0 bg-black/95 z-[200] hidden flex items-center justify-center p-4",children:e("div",{class:"max-w-5xl w-full bg-gray-900 rounded-3xl p-12 relative max-h-[90vh] overflow-y-auto",children:[e("button",{onclick:"closeEducationProgramsModal()",class:"absolute top-6 right-6 text-gray-400 hover:text-white text-4xl font-light transition",children:"×"}),e("div",{class:"text-center mb-12",children:[e("h2",{class:"text-5xl font-black mb-4 text-white",children:"Choose Your Program"}),e("p",{class:"text-xl text-gray-400",children:"Select the package that fits your goals"})]}),e("div",{class:"flex justify-center gap-4 mb-12",children:[e("button",{onclick:"switchProgramType('youth')",id:"youthProgramBtn",class:"px-8 py-4 rounded-full font-bold text-lg transition bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg",children:"Youth Programs (Ages 10-17)"}),e("button",{onclick:"switchProgramType('masterclass')",id:"masterclassProgramBtn",class:"px-8 py-4 rounded-full font-bold text-lg transition bg-gray-800 text-gray-400 hover:bg-gray-700",children:"Masterclass (Ages 16+)"})]}),e("div",{id:"youthProgramsContent",class:"grid md:grid-cols-2 gap-8",children:[e("div",{class:"bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-2 border-blue-500/30 rounded-2xl p-8 hover:border-blue-500 transition cursor-pointer",onclick:"window.location.href='/pricing'",children:[e("div",{class:"flex items-center justify-between mb-4",children:[e("span",{class:"bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold",children:"LAUNCH OFFER"}),e("span",{class:"text-sm text-gray-400 line-through",children:"$1,200"})]}),e("h3",{class:"text-3xl font-black mb-2 text-white",children:"Starter Workshop"}),e("div",{class:"text-5xl font-black text-blue-400 mb-2",children:"$695"}),e("p",{class:"text-green-400 font-semibold mb-6",children:"Save $505 (42% off)"}),e("ul",{class:"space-y-3 text-gray-300 mb-8",children:[e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-blue-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"3 In-Person Workshops"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Hands-on learning sessions"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-blue-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"1-on-1 Personalized Session"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Individual coaching & feedback"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-blue-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Complimentary Photo Session"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"$395 value included"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-blue-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Digital Gallery"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"All your best shots delivered"})]})]})]}),e("button",{class:"w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition",children:"Enroll in Starter Workshop →"})]}),e("div",{class:"bg-gradient-to-br from-orange-900/30 to-orange-800/20 border-2 border-orange-500 rounded-2xl p-8 hover:border-orange-400 transition cursor-pointer relative",onclick:"window.location.href='/pricing'",children:[e("div",{class:"absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg",children:"BEST VALUE"}),e("div",{class:"flex items-center justify-between mb-4 mt-4",children:[e("span",{class:"bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold",children:"LAUNCH OFFER"}),e("span",{class:"text-sm text-gray-400 line-through",children:"$4,500"})]}),e("h3",{class:"text-3xl font-black mb-2 text-white",children:"Year-Long Accelerator"}),e("div",{class:"text-5xl font-black text-orange-400 mb-2",children:"$1,995"}),e("p",{class:"text-green-400 font-semibold mb-6",children:"Save $2,505 (56% off)"}),e("ul",{class:"space-y-3 text-gray-300 mb-8",children:[e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-orange-400 text-xl",children:"✓"}),e("span",{children:e("strong",{children:"Everything in Starter"})})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-orange-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"12 Months On-Demand 1-on-1 Coaching"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Unlimited questions & feedback"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-orange-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Full Year Membership Access"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"All workshops & resources"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-orange-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Portfolio Development"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Build a pro portfolio"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-orange-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Free Equipment Rental"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"For personal projects"})]})]})]}),e("button",{class:"w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition shadow-lg",children:"Enroll in Accelerator →"})]})]}),e("div",{id:"masterclassProgramsContent",class:"hidden grid md:grid-cols-2 gap-8",children:[e("div",{class:"bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-2 border-purple-500/30 rounded-2xl p-8 hover:border-purple-500 transition cursor-pointer",onclick:"window.location.href='/pricing'",children:[e("div",{class:"flex items-center justify-between mb-4",children:e("span",{class:"bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold",children:"TEENS & ADULTS"})}),e("h3",{class:"text-3xl font-black mb-2 text-white",children:"Masterclass Coaching"}),e("div",{class:"text-5xl font-black text-purple-400 mb-2",children:"$695"}),e("p",{class:"text-gray-400 mb-6",children:"2 Strategic Sessions"}),e("ul",{class:"space-y-3 text-gray-300 mb-8",children:[e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-purple-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"2 Strategic Coaching Sessions"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Deep-dive with award-winning photographers"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-purple-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Portfolio Review & Feedback"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Professional critique & strategies"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-purple-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Business Strategy Consultation"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Pricing, marketing, client acquisition"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-purple-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"$695 Credit Towards Business in a Box"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Apply full amount to complete program"})]})]})]}),e("button",{class:"w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 rounded-xl transition",children:"Book Strategic Sessions →"})]}),e("div",{class:"bg-gradient-to-br from-red-900/30 to-red-800/20 border-2 border-red-500 rounded-2xl p-8 hover:border-red-400 transition cursor-pointer relative",onclick:"window.location.href='/pricing'",children:[e("div",{class:"absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg",children:"PRO PROGRAM"}),e("div",{class:"flex items-center justify-between mb-4 mt-4",children:e("span",{class:"bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold",children:"AGES 16+"})}),e("h3",{class:"text-3xl font-black mb-2 text-white",children:"Business in a Box"}),e("div",{class:"text-5xl font-black text-red-400 mb-2",children:"$3,000"}),e("p",{class:"text-gray-400 mb-6",children:"Zero to Wedding Pro Program"}),e("ul",{class:"space-y-3 text-gray-300 mb-8",children:[e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-red-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Shoot Your First Wedding Confidently"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Complete technical & creative training"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-red-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Build Your Brand from Scratch"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Identity, website, marketing materials"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-red-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Legal & Business Setup"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Contracts, LLC, insurance, taxes"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-red-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"Equipment Mastery"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Cameras, lenses, lighting, backup gear"})]})]}),e("li",{class:"flex items-start gap-3",children:[e("span",{class:"text-red-400 text-xl",children:"✓"}),e("span",{children:[e("strong",{children:"$695 Credit Applied from Masterclass"}),e("br",{}),e("span",{class:"text-sm text-gray-400",children:"Effective price $2,305 when upgrading"})]})]})]}),e("button",{class:"w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 rounded-xl transition shadow-lg",children:"Launch Your Business →"})]})]}),e("p",{class:"text-center text-gray-500 text-sm mt-12",children:"Limited time launch pricing • Only available for first 20 families"})]})}),e("script",{dangerouslySetInnerHTML:{__html:`
        function openEducationModal() {
          document.getElementById('educationProgramsModal').classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }

        function closeEducationProgramsModal() {
          document.getElementById('educationProgramsModal').classList.add('hidden');
          document.body.style.overflow = 'auto';
        }

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
      `}})]}),{title:"Acromatico - Learn to See The World Differently"}));k.get("/masterclass",t=>t.render(e("div",{class:"min-h-screen bg-black text-white",children:[e("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}),e(ar,{}),e("section",{class:"relative py-32 px-6 overflow-hidden",children:e("div",{class:"max-w-7xl mx-auto text-center",children:[e("h1",{class:"text-8xl md:text-9xl font-black mb-8",style:"letter-spacing: -0.02em; background: linear-gradient(135deg, #4794A6 0%, #fff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;",children:"Masterclass."}),e("p",{class:"text-3xl md:text-4xl text-gray-400 mb-6 max-w-4xl mx-auto",children:["Strategic coaching and complete business training",e("br",{}),"for serious photographers."]}),e("p",{class:"text-xl text-gray-500 mb-12 max-w-3xl mx-auto",children:"Perfect for all ages—from kids seeking professional guidance to adults launching their photography business."}),e("a",{href:"#programs",class:"inline-block px-12 py-6 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white font-bold text-xl transition-all",children:"Explore Programs"})]})}),e("section",{id:"programs",class:"relative py-20 px-6",children:e("div",{class:"max-w-7xl mx-auto",children:[e("div",{class:"grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20",children:[e("div",{class:"relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 border-2 border-[#4794A6]/30 hover:border-[#4794A6] transition-all duration-300 group hover:-translate-y-2",children:[e("div",{class:"absolute top-8 right-8",children:e("span",{class:"inline-block bg-[#4794A6] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider",children:"STARTER"})}),e("h3",{class:"text-4xl font-bold mb-4",children:"Masterclass Coaching"}),e("div",{class:"text-6xl font-black mb-2 text-[#4794A6]",children:"$695"}),e("p",{class:"text-gray-400 text-lg mb-8",children:"Strategic sessions with award-winning photographers"}),e("ul",{class:"space-y-4 mb-10",children:[e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Mentorship for All Ages"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"2 Strategic Coaching Sessions"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Portfolio Review & Feedback"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Equipment Review"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Brand Guidance"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Business Strategy Consultation"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"$695 Credit Toward Business in a Box"})]})]}),e("a",{href:"mailto:hello@acromatico.com?subject=Masterclass%20Coaching%20Inquiry",class:"block w-full py-5 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-center font-bold text-lg transition-all",children:"Start with Coaching"})]}),e("div",{class:"relative bg-gradient-to-br from-white to-gray-100 rounded-3xl p-12 border-2 border-white hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 text-black",children:[e("div",{class:"absolute top-8 right-8",children:e("span",{class:"inline-block bg-black text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider",children:"PRO PROGRAM"})}),e("h3",{class:"text-4xl font-bold mb-4",children:"Business in a Box"}),e("div",{class:"text-6xl font-black mb-2",children:"$3,000"}),e("p",{class:"text-gray-600 text-lg mb-8",children:"Complete wedding photography business training"}),e("ul",{class:"space-y-4 mb-10",children:[e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-black flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg font-semibold",children:"Everything in Coaching, plus:"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-black flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Mentorship for All Ages"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-black flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Complete Wedding/Portrait/Commercial Training"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-black flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"AI Tools"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-black flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Brand Guidance"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-black flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Photography Workflow (Booking to Delivery)"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-black flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Business Plan & Marketing Strategy"})]}),e("li",{class:"flex items-start gap-3",children:[e("svg",{class:"w-6 h-6 text-black flex-shrink-0 mt-1",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"text-lg",children:"Legal & Business Guidance"})]})]}),e("a",{href:"mailto:hello@acromatico.com?subject=Business%20in%20a%20Box%20Inquiry",class:"block w-full py-5 rounded-full bg-black hover:bg-gray-800 text-white text-center font-bold text-lg transition-all",children:"Go All-In"})]})]}),e("div",{class:"max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 border-2 border-gray-800",children:[e("h3",{class:"text-4xl font-bold text-center mb-12",children:"Compare Programs"}),e("div",{class:"space-y-1",children:[e("div",{class:"grid grid-cols-3 gap-4 pb-4 border-b-2 border-gray-800 mb-4",children:[e("div",{class:"font-bold text-lg",children:"What's Included"}),e("div",{class:"font-bold text-lg text-center",children:"Coaching"}),e("div",{class:"font-bold text-lg text-center",children:"Business Box"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Mentorship for All Ages"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Strategic Coaching Sessions"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Portfolio Review & Feedback"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Equipment Review"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Brand Guidance"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Business Strategy Consultation"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Complete Photography Training"}),e("div",{class:"text-center text-gray-600",children:"—"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"AI Tools"}),e("div",{class:"text-center text-gray-600",children:"—"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Photography Workflow System"}),e("div",{class:"text-center text-gray-600",children:"—"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Business Plan & Financials"}),e("div",{class:"text-center text-gray-600",children:"—"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Marketing & Client Acquisition"}),e("div",{class:"text-center text-gray-600",children:"—"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50",children:[e("div",{children:"Legal & Business Guidance"}),e("div",{class:"text-center text-gray-600",children:"—"}),e("div",{class:"text-center text-[#4794A6] text-2xl",children:"✓"})]}),e("div",{class:"grid grid-cols-3 gap-4 py-6 mt-4 bg-gradient-to-r from-gray-900 to-black rounded-xl",children:[e("div",{class:"font-bold text-xl",children:"Investment"}),e("div",{class:"text-center font-bold text-2xl text-[#4794A6]",children:"$695"}),e("div",{class:"text-center font-bold text-2xl",children:"$3,000"})]})]})]}),e("div",{class:"text-center mt-20",children:[e("h3",{class:"text-4xl font-bold mb-6",children:"Ready to launch your photography business?"}),e("p",{class:"text-xl text-gray-400 mb-10",children:"Join photographers who have transformed their passion into a thriving business."}),e("div",{class:"flex flex-col sm:flex-row gap-4 justify-center",children:[e("a",{href:"mailto:hello@acromatico.com?subject=Masterclass%20Coaching%20Inquiry",class:"px-10 py-5 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white font-bold text-lg transition-all inline-block",children:"Start with Coaching - $695"}),e("a",{href:"mailto:hello@acromatico.com?subject=Business%20in%20a%20Box%20Inquiry",class:"px-10 py-5 rounded-full bg-white hover:bg-gray-100 text-black font-bold text-lg transition-all inline-block",children:"Go All-In - $3,000"})]})]})]})}),e("div",{dangerouslySetInnerHTML:{__html:Pt}})]}),{title:"Masterclass - Acromatico"}));k.get("/api/health",t=>t.json({status:"healthy",timestamp:new Date().toISOString(),database:"connected"}));k.get("/api/db-test",async t=>{try{const r=await t.env.DB.prepare("SELECT 1 as test").first();return t.json({status:"success",message:"Database connection successful",result:r})}catch(r){return t.json({status:"error",message:r.message},500)}});k.get("/academy",t=>t.render(e("div",{class:"min-h-screen bg-black text-white",children:[e(ar,{}),e("section",{class:"pt-32 pb-16 text-center",children:e("div",{class:"max-w-4xl mx-auto px-6",children:[e("h1",{class:"text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent",children:"Your 12-Month Creative Journey"}),e("p",{class:"text-xl md:text-2xl text-gray-300 mb-8",children:"From camera-curious beginner to confident visual storyteller."}),e("a",{href:"/pricing",class:"inline-block px-10 py-4 rounded-full font-bold text-lg bg-teal-500 hover:bg-teal-600 transition",children:"Start Your Journey →"})]})}),e("section",{class:"py-20 bg-gradient-to-b from-black to-gray-900",children:e("div",{class:"max-w-6xl mx-auto px-6",children:e("div",{class:"grid md:grid-cols-2 gap-12 items-center",children:[e("div",{children:[e("div",{class:"text-teal-500 font-bold text-sm mb-2",children:"MONTH 1 • JANUARY"}),e("h2",{class:"text-4xl md:text-5xl font-black mb-6",children:"Finding Your Eye"}),e("p",{class:"text-lg text-gray-300 mb-4",children:[e("strong",{class:"text-white",children:"Imagine your child picking up a camera"})," and instinctively knowing exactly where to stand, what to frame, and when to press the shutter."]}),e("p",{class:"text-lg text-gray-300 mb-4",children:["Through the ",e("strong",{class:"text-white",children:"Rule of Thirds"})," and ",e("strong",{class:"text-white",children:"Leading Lines"}),", they learn why some photos feel balanced and others feel chaotic."]}),e("p",{class:"text-lg text-teal-400 font-semibold",children:"By the end of January, they won't just take photos — they'll compose them like a professional."})]}),e("div",{class:"relative",children:e("img",{src:"/static/images/curriculum/january-vintage-camera.jpg",alt:"Vintage Camera",class:"rounded-2xl shadow-2xl w-full"})})]})})}),e("section",{class:"py-20 bg-gray-900",children:e("div",{class:"max-w-6xl mx-auto px-6",children:e("div",{class:"grid md:grid-cols-2 gap-12 items-center",children:[e("div",{class:"order-2 md:order-1 relative",children:e("img",{src:"/static/images/curriculum/february-beach-boardwalk.jpg",alt:"Beach Boardwalk",class:"rounded-2xl shadow-2xl w-full"})}),e("div",{class:"order-1 md:order-2",children:[e("div",{class:"text-blue-500 font-bold text-sm mb-2",children:"MONTH 2 • FEBRUARY"}),e("h2",{class:"text-4xl md:text-5xl font-black mb-6",children:"Light & Shadow"}),e("p",{class:"text-lg text-gray-300 mb-4",children:[e("strong",{class:"text-white",children:"Photography is painting with light."})," And in February, your child becomes the artist."]}),e("p",{class:"text-lg text-gray-300 mb-4",children:["They'll learn why the ",e("strong",{class:"text-blue-400",children:"Golden Hour"})," makes everything look cinematic. Why shadows aren't mistakes, but tools for drama and depth."]}),e("p",{class:"text-lg text-blue-400 font-semibold",children:"Your child won't just take photos anymore. They'll chase the light."})]})]})})}),e("section",{class:"py-20 bg-gradient-to-b from-gray-900 to-black",children:e("div",{class:"max-w-6xl mx-auto px-6",children:e("div",{class:"grid md:grid-cols-2 gap-12 items-center",children:[e("div",{children:[e("div",{class:"text-purple-500 font-bold text-sm mb-2",children:"MONTH 3 • MARCH"}),e("h2",{class:"text-4xl md:text-5xl font-black mb-6",children:"Video Basics"}),e("p",{class:"text-lg text-gray-300 mb-4",children:[e("strong",{class:"text-white",children:"Still photos capture a moment."})," Video tells the whole story."]}),e("p",{class:"text-lg text-gray-300 mb-4",children:["In March, your child discovers ",e("strong",{class:"text-purple-400",children:"the power of motion"})," — how to make viewers feel like they're right there in the scene."]}),e("p",{class:"text-lg text-purple-400 font-semibold",children:`By the end of March, they'll be creating mini-movies that make you say "How did my kid do that?"`})]}),e("div",{class:"relative",children:e("img",{src:"/static/images/curriculum/march-mountain-photographer.jpg",alt:"Mountain Photographer",class:"rounded-2xl shadow-2xl w-full"})})]})})}),e("section",{class:"py-20 bg-black",children:e("div",{class:"max-w-6xl mx-auto px-6",children:e("div",{class:"grid md:grid-cols-2 gap-12 items-center",children:[e("div",{class:"order-2 md:order-1 relative",children:e("img",{src:"/static/images/curriculum/april-mom-child-beach.jpg",alt:"Mother and Child",class:"rounded-2xl shadow-2xl w-full"})}),e("div",{class:"order-1 md:order-2",children:[e("div",{class:"text-teal-500 font-bold text-sm mb-2",children:"MONTH 4 • APRIL"}),e("h2",{class:"text-4xl md:text-5xl font-black mb-6",children:"Portrait Photography"}),e("p",{class:"text-lg text-gray-300 mb-4",children:[e("strong",{class:"text-white",children:"People aren't just subjects."})," They're stories waiting to be told."]}),e("p",{class:"text-lg text-gray-300 mb-4",children:["In April, your child learns the art of ",e("strong",{class:"text-teal-400",children:"connection"})," — how to capture genuine smiles and personality."]}),e("p",{class:"text-lg text-teal-400 font-semibold",children:"Your child will become the family photographer everyone requests."})]})]})})}),e("section",{class:"py-20 bg-gradient-to-b from-black to-gray-900",children:e("div",{class:"max-w-6xl mx-auto px-6",children:e("div",{class:"grid md:grid-cols-2 gap-12 items-center",children:[e("div",{children:[e("div",{class:"text-blue-500 font-bold text-sm mb-2",children:"MONTH 5 • MAY"}),e("h2",{class:"text-4xl md:text-5xl font-black mb-6",children:"Street Photography"}),e("p",{class:"text-lg text-gray-300 mb-4",children:[e("strong",{class:"text-white",children:"The world is your canvas."})," And May is when your child learns to capture it."]}),e("p",{class:"text-lg text-gray-300 mb-4",children:[e("strong",{class:"text-blue-400",children:"Street photography"})," is all about ",e("strong",{class:"text-white",children:"decisive moments"})," — finding beauty in the everyday."]}),e("p",{class:"text-lg text-blue-400 font-semibold",children:"After May, every walk becomes a photo adventure."})]}),e("div",{class:"relative",children:e("img",{src:"/static/images/curriculum/may-chicago-skyline.jpg",alt:"Chicago Skyline",class:"rounded-2xl shadow-2xl w-full"})})]})})}),e("section",{class:"py-20 bg-gradient-to-r from-teal-900 via-cyan-900 to-teal-900",children:e("div",{class:"max-w-4xl mx-auto px-6 text-center",children:[e("div",{class:"text-teal-400 font-bold text-sm mb-2",children:"MONTH 6 • JUNE"}),e("h2",{class:"text-5xl md:text-6xl font-black mb-8",children:"Photo Essay Project"}),e("p",{class:"text-2xl text-gray-200 mb-8",children:["This is it. ",e("strong",{class:"text-white",children:"The big reveal."})]}),e("p",{class:"text-lg text-gray-300 mb-4",children:["Every student completes their ",e("strong",{class:"text-teal-400",children:"first photo essay"})," — a real, start-to-finish project that tells a story they care about."]}),e("p",{class:"text-xl text-teal-300 font-bold mt-8",children:"They present it to family and friends. 📸"})]})}),e("section",{class:"py-32 bg-black relative overflow-hidden",children:[e("div",{class:"max-w-4xl mx-auto px-6 text-center relative z-10",children:[e("h2",{class:"text-5xl md:text-6xl font-black mb-6",children:["Ready to Start",e("br",{}),"This Journey?"]}),e("p",{class:"text-xl text-gray-400 mb-8",children:"Join thousands of young creators learning to see differently."}),e("div",{class:"flex flex-col sm:flex-row gap-4 justify-center",children:[e("a",{href:"/checkout",class:"bg-teal-500 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-teal-400 transition inline-block text-center shadow-2xl hover:shadow-teal-500/50",children:"Enroll Now"}),e("a",{href:"#pricing",class:"border-2 border-teal-500 text-teal-500 px-10 py-5 rounded-full text-xl font-bold hover:bg-teal-500/10 transition inline-block text-center",children:"View Pricing"})]}),e("p",{class:"text-sm text-gray-500 mt-8",children:"Monthly from $79/student • Cancel anytime"})]}),e("div",{class:"absolute inset-0 opacity-10",children:[e("div",{class:"absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full filter blur-3xl"}),e("div",{class:"absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl"})]})]}),e("section",{class:"py-20 bg-black",children:e("div",{class:"max-w-6xl mx-auto px-6",children:e("div",{class:"grid md:grid-cols-2 gap-12 items-center",children:[e("div",{children:[e("div",{class:"text-teal-500 font-bold text-sm mb-2",children:"MONTH 7 • SEPTEMBER"}),e("h2",{class:"text-4xl md:text-5xl font-black mb-6",children:"Advanced Composition"}),e("p",{class:"text-lg text-gray-300 mb-4",children:[e("strong",{class:"text-white",children:"Now that they know the rules..."})," it's time to break them."]}),e("p",{class:"text-lg text-gray-300 mb-4",children:["September is where ",e("strong",{class:"text-teal-400",children:"creativity gets unleashed"}),". Negative space, unconventional framing, artistic choices."]}),e("p",{class:"text-lg text-teal-400 font-semibold",children:"Your child will develop their own unique style."})]}),e("div",{class:"relative",children:e("img",{src:"/static/images/curriculum/september-advanced-composition.jpg",alt:"Advanced Composition",class:"rounded-2xl shadow-2xl w-full"})})]})})}),e("section",{class:"py-20 bg-gray-900",children:e("div",{class:"max-w-6xl mx-auto px-6",children:e("div",{class:"grid md:grid-cols-2 gap-12 items-center",children:[e("div",{class:"order-2 md:order-1 relative",children:e("img",{src:"/static/images/curriculum/october-video-editing.jpg",alt:"Video Editing Timeline",class:"rounded-2xl shadow-2xl w-full"})}),e("div",{class:"order-1 md:order-2",children:[e("div",{class:"text-blue-500 font-bold text-sm mb-2",children:"MONTH 8 • OCTOBER"}),e("h2",{class:"text-4xl md:text-5xl font-black mb-6",children:"Photo Editing Mastery"}),e("p",{class:"text-lg text-gray-300 mb-4",children:[e("strong",{class:"text-white",children:"Great photos are made twice."})," Once in-camera. Once in post-production."]}),e("p",{class:"text-lg text-gray-300 mb-4",children:["In October, your child learns ",e("strong",{class:"text-blue-400",children:"professional editing techniques"})," using Lightroom."]}),e("p",{class:"text-lg text-blue-400 font-semibold",children:"They'll turn good photos into great ones."})]})]})})}),e("section",{class:"py-20 bg-gradient-to-b from-gray-900 to-black",children:e("div",{class:"max-w-6xl mx-auto px-6",children:e("div",{class:"grid md:grid-cols-2 gap-12 items-center",children:[e("div",{children:[e("div",{class:"text-teal-500 font-bold text-sm mb-2",children:"MONTH 9 • NOVEMBER"}),e("h2",{class:"text-4xl md:text-5xl font-black mb-6",children:"Portfolio Building"}),e("p",{class:"text-lg text-gray-300 mb-4",children:e("strong",{class:"text-white",children:"A year's worth of work deserves to be seen."})}),e("p",{class:"text-lg text-gray-300 mb-4",children:["In November, your child learns to ",e("strong",{class:"text-teal-400",children:"curate like a gallery curator"})," — selecting their strongest work."]}),e("p",{class:"text-lg text-teal-400 font-semibold",children:"Your child will have a professional portfolio they can be proud of."})]}),e("div",{class:"relative",children:e("img",{src:"/static/images/curriculum/november-portfolio-collage.jpg",alt:"Professional Portfolio Collage",class:"rounded-2xl shadow-2xl w-full"})})]})})}),e("section",{class:"py-20 bg-black",children:e("div",{class:"max-w-4xl mx-auto px-6 text-center",children:[e("div",{class:"text-teal-400 font-bold text-sm mb-2",children:"MONTH 10 • DECEMBER"}),e("h2",{class:"text-5xl md:text-6xl font-black mb-8",children:"Year-End Showcase"}),e("p",{class:"text-2xl text-gray-200 mb-8",children:[e("strong",{class:"text-white",children:"This is the moment."})," The celebration. The standing ovation."]}),e("p",{class:"text-lg text-gray-300 mb-4",children:["The ",e("strong",{class:"text-teal-400",children:"Year-End Showcase"})," is their moment to shine — presenting their best work to everyone who matters."]}),e("p",{class:"text-xl text-teal-300 font-bold mt-8",children:"Imagine your child standing in front of everyone, sharing their creative journey. 🎉"})]})}),e("section",{class:"py-32 bg-black text-center",children:e("div",{class:"max-w-4xl mx-auto px-6",children:[e("h2",{class:"text-5xl md:text-6xl font-black mb-6",children:"Ready to Start This Journey?"}),e("p",{class:"text-2xl text-gray-300 mb-12",children:"10 transformative months. 80 micro-learning sessions. 1 incredible creative journey."}),e("a",{href:"/pricing",class:"inline-block px-12 py-6 rounded-full text-xl font-bold text-white transition shadow-2xl",style:"background: #4794A6;",children:"Enroll Now"}),e("p",{class:"mt-8 text-sm text-gray-400",children:"30-minute sessions • Expert-led instruction • Lifetime access to all teachings"})]})}),e("footer",{class:"bg-gray-900 py-16 border-t border-white/10",children:e("div",{class:"max-w-7xl mx-auto px-6 text-center",children:e("p",{class:"text-gray-400 text-sm",children:"© 2026 Acromatico. Built for creators, by creators."})})}),e("div",{id:"enrollment-modal",class:"fixed inset-0 bg-black/95 z-[100] hidden flex items-center justify-center p-4",children:e("div",{class:"max-w-2xl w-full",children:[e("div",{class:"mb-8",children:[e("div",{class:"flex justify-between mb-2 text-sm text-gray-400",children:[e("span",{id:"step-label",children:"Step 1 of 3"}),e("span",{id:"step-percentage",children:"33%"})]}),e("div",{class:"h-2 bg-gray-800 rounded-full overflow-hidden",children:e("div",{id:"progress-bar",class:"h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-500",style:"width: 33%"})})]}),e("div",{id:"step-1",class:"step-content",children:[e("h2",{class:"text-5xl font-black mb-4",children:"Create Your Free Account"}),e("p",{class:"text-xl text-gray-400 mb-8",children:"Get started in seconds - no credit card required"}),e("div",{class:"space-y-6",children:[e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"Parent Email"}),e("input",{type:"email",id:"parent-email",placeholder:"your@email.com",class:"w-full px-6 py-4 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-teal-500 focus:outline-none text-lg"})]}),e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"Create Password"}),e("input",{type:"password",id:"parent-password",placeholder:"Min 8 characters",class:"w-full px-6 py-4 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-teal-500 focus:outline-none text-lg"}),e("p",{class:"text-xs text-gray-500 mt-2",children:"Minimum 8 characters (letters, numbers, or symbols)"})]}),e("button",{onclick:"goToStep(2)",class:"btn-primary w-full px-8 py-5 rounded-full text-xl font-bold",style:"background: #4794A6;",children:"Continue →"})]}),e("div",{class:"mt-8 pt-8 border-t border-white/10",children:[e("div",{class:"flex items-center justify-center gap-3 text-sm text-gray-400",children:[e("svg",{class:"w-5 h-5 text-green-500",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("span",{class:"font-medium",children:"256-bit SSL Encryption"}),e("span",{class:"text-gray-600",children:"•"}),e("span",{children:"Your data is secure"})]}),e("p",{class:"text-center text-xs text-gray-500 mt-2",children:"We use industry-standard encryption (AES-256) and secure password hashing (bcrypt) to protect your information."})]})]}),e("div",{id:"step-2",class:"step-content hidden",children:[e("button",{onclick:"goToStep(1)",class:"text-gray-400 hover:text-white mb-3 flex items-center gap-2 text-sm",children:"← Back"}),e("h2",{class:"text-3xl font-black mb-2",children:"How Many Students?"}),e("p",{class:"text-base text-gray-400 mb-4",children:"Select the package that fits your family"}),e("div",{class:"flex items-center justify-center gap-3 mb-4 bg-gray-900 p-2 rounded-full inline-flex mx-auto",children:[e("button",{id:"monthly-toggle-btn",onclick:"toggleBilling('monthly')",class:"px-4 py-2 rounded-full font-semibold transition bg-teal-500 text-white text-sm",children:"Monthly"}),e("button",{id:"annual-toggle-btn",onclick:"toggleBilling('annual')",class:"px-4 py-2 rounded-full font-semibold transition text-gray-400 text-sm",children:["Annual ",e("span",{class:"text-teal-500 text-xs ml-1",children:"Save 20%"})]})]}),e("p",{class:"text-center text-xs text-gray-400 mb-4",children:[e("span",{class:"annual-note hidden",children:"Annual: 10 months (Sept-June). December: 2 special workshops!"}),e("span",{class:"monthly-note",children:"Billed monthly. Cancel anytime."})]}),e("div",{class:"grid grid-cols-2 gap-3 mb-4",children:[e("div",{class:"package-option feature-card p-4 rounded-xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative",onclick:"selectPackage(1)",children:[e("div",{class:"text-3xl font-black mb-1",children:"1"}),e("div",{class:"text-gray-400 text-xs mb-2",children:"Student"}),e("div",{class:"text-xl font-bold",children:[e("span",{class:"monthly-price",children:"$116"}),e("span",{class:"annual-price hidden",children:"$93"}),e("span",{class:"text-xs text-gray-500",children:"/mo"})]}),e("div",{class:"annual-savings text-teal-500 text-xs mt-1 hidden",children:"Save $230"}),e("div",{class:"text-xs text-gray-500 mt-2 monthly-per-class",children:"$14.50 per class"}),e("div",{class:"text-xs text-gray-500 mt-2 annual-per-class hidden",children:"$11.63 per class"})]}),e("div",{class:"package-option feature-card p-4 rounded-xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition ring-2 ring-teal-500 relative",onclick:"selectPackage(2)",children:[e("div",{class:"absolute -top-2 left-1/2 -translate-x-1/2 bg-teal-500 px-2 py-0.5 rounded-full text-xs font-bold",children:"Most Popular"}),e("div",{class:"text-3xl font-black mb-1",children:"2"}),e("div",{class:"text-gray-400 text-xs mb-2",children:"Students"}),e("div",{class:"text-xl font-bold",children:[e("span",{class:"monthly-price",children:"$99"}),e("span",{class:"annual-price hidden",children:"$79"}),e("span",{class:"text-xs text-gray-500",children:"/mo each"})]}),e("div",{class:"annual-savings text-teal-500 text-xs mt-1 hidden",children:"Save $400"}),e("div",{class:"text-xs text-gray-500 mt-2 monthly-per-class",children:"$12.38 per class (each)"}),e("div",{class:"text-xs text-gray-500 mt-2 annual-per-class hidden",children:"$9.88 per class (each)"})]}),e("div",{class:"package-option feature-card p-4 rounded-xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative",onclick:"selectPackage(3)",children:[e("div",{class:"text-3xl font-black mb-1",children:"3"}),e("div",{class:"text-gray-400 text-xs mb-2",children:"Students"}),e("div",{class:"text-xl font-bold",children:[e("span",{class:"monthly-price",children:"$89"}),e("span",{class:"annual-price hidden",children:"$71"}),e("span",{class:"text-xs text-gray-500",children:"/mo each"})]}),e("div",{class:"annual-savings text-teal-500 text-xs mt-1 hidden",children:"Save $540"}),e("div",{class:"text-xs text-gray-500 mt-2 monthly-per-class",children:"$11.13 per class (each)"}),e("div",{class:"text-xs text-gray-500 mt-2 annual-per-class hidden",children:"$8.88 per class (each)"})]}),e("div",{class:"package-option feature-card p-4 rounded-xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative",onclick:"selectPackage(4)",children:[e("div",{class:"text-3xl font-black mb-1",children:"4+"}),e("div",{class:"text-gray-400 text-xs mb-2",children:"Students"}),e("div",{class:"text-xl font-bold",children:[e("span",{class:"monthly-price",children:"$79"}),e("span",{class:"annual-price hidden",children:"$63"}),e("span",{class:"text-xs text-gray-500",children:"/mo each"})]}),e("div",{class:"annual-savings text-teal-500 text-xs mt-1 hidden",children:"Save $640"}),e("div",{class:"text-xs text-gray-500 mt-2 monthly-per-class",children:"$9.88 per class (each)"}),e("div",{class:"text-xs text-gray-500 mt-2 annual-per-class hidden",children:"$7.88 per class (each)"})]})]}),e("div",{class:"feature-card p-4 rounded-xl mt-4",children:[e("h3",{class:"text-base font-bold mb-3 text-center",children:"Everything Included"}),e("div",{class:"grid grid-cols-1 gap-2 text-xs",children:[e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"30-Minute Micro-Learning Sessions"}),e("div",{class:"text-gray-400 text-xs",children:"Perfect for young creators' attention spans - 8 live classes/month (Mon & Thu 11:30 AM ET)"})]})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"Lifetime Instruction Library"}),e("div",{class:"text-gray-400 text-xs",children:"Can't make it live? Catch up on expert-led teachings anytime."})]})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"December Bonus Workshops"}),e("div",{class:"text-gray-400 text-xs",children:"First 2 weeks of December: Special 1-hour fun workshops to celebrate the year!"})]})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"Portfolio Building"}),e("div",{class:"text-gray-400 text-xs",children:"Showcase your child's work and track their creative journey"})]})]})]})]})]}),e("div",{id:"step-3",class:"step-content hidden",children:[e("button",{onclick:"goToStep(2)",class:"text-gray-400 hover:text-white mb-4 flex items-center gap-2",children:"← Back"}),e("h2",{class:"text-5xl font-black mb-4",children:"Complete Enrollment"}),e("p",{class:"text-xl text-gray-400 mb-8",children:["You selected ",e("span",{id:"selected-package",class:"text-teal-500"})]}),e("div",{class:"feature-card p-6 rounded-2xl mb-6",children:[e("div",{class:"flex justify-between mb-4",children:[e("span",{class:"text-gray-400",children:"Students"}),e("span",{id:"summary-students",class:"font-bold"})]}),e("div",{class:"flex justify-between mb-4",children:[e("span",{class:"text-gray-400",children:"Price per student"}),e("span",{id:"summary-price",class:"font-bold"})]}),e("div",{class:"flex justify-between pt-4 border-t border-white/10",children:[e("span",{id:"summary-label",class:"text-xl font-bold",children:"Total Today (Prorated)"}),e("span",{id:"summary-total",class:"text-xl font-bold text-teal-500"})]}),e("div",{id:"savings-display",class:"flex justify-between mt-2 hidden",children:[e("span",{class:"text-sm text-gray-400",children:"Annual Savings"}),e("span",{id:"summary-savings",class:"text-sm font-bold text-green-500"})]}),e("p",{id:"proration-note",class:"text-xs text-gray-500 mt-2",children:"*First month prorated based on days remaining"})]}),e("div",{class:"space-y-4 mb-6",children:e("div",{class:"bg-gray-900 border-2 border-gray-800 rounded-xl p-6",children:e("p",{class:"text-sm text-gray-400",children:"Stripe payment form will appear here"})})}),e("button",{onclick:"completeEnrollment()",class:"btn-primary w-full px-8 py-5 rounded-full text-xl font-bold",style:"background: #4794A6;",children:"Complete Enrollment 🎉"})]}),e("button",{onclick:"closeEnrollment()",class:"absolute top-8 right-8 text-gray-400 hover:text-white text-4xl",children:"×"})]})}),e("script",{dangerouslySetInnerHTML:{__html:`
        let currentStep = 1;
        let selectedStudents = 0;
        let selectedPrice = 0;
        let isAnnual = false;
        
        const pricingData = {
          monthly: { 1: 116, 2: 99, 3: 89, 4: 79 },
          annual: { 1: 93, 2: 79, 3: 71, 4: 63 }
        };

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
        }

        function selectPackage(students) {
          selectedStudents = students;
          selectedPrice = isAnnual ? pricingData.annual[students] : pricingData.monthly[students];
          
          // Calculate totals
          const pricePerStudent = selectedPrice;
          const monthlyTotal = pricePerStudent * students;
          
          let totalCharge, chargeLabel;
          
          if (isAnnual) {
            // Annual: 10 months prepaid (school year, no summer)
            totalCharge = monthlyTotal * 10;
            chargeLabel = 'Total (10 months prepaid)';
          } else {
            // Monthly: prorated for first month
            const today = new Date();
            const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
            const daysRemaining = daysInMonth - today.getDate() + 1;
            totalCharge = (monthlyTotal / daysInMonth) * daysRemaining;
            chargeLabel = 'Total Today (Prorated)';
          }
          
          // Calculate savings for display (Annual vs Monthly)
          const yearlySavings = isAnnual ? 
            ((pricingData.monthly[students] * students * 10) - (pricePerStudent * students * 10)) : 0;
          
          // Update summary
          const billingText = isAnnual ? ' (Annual - 10 months)' : ' (Monthly)';
          document.getElementById('selected-package').textContent = 
            students + (students >= 4 ? '+' : '') + ' student' + (students > 1 ? 's' : '') + billingText;
          document.getElementById('summary-students').textContent = students + (students >= 4 ? '+' : '');
          document.getElementById('summary-price').textContent = '$' + pricePerStudent + '/mo per student' + (isAnnual ? ' (20% off)' : '');
          document.getElementById('summary-total').textContent = '$' + totalCharge.toFixed(2);
          
          // Update the label and savings display
          document.getElementById('summary-label').textContent = chargeLabel;
          
          if (isAnnual) {
            document.getElementById('savings-display').classList.remove('hidden');
            document.getElementById('summary-savings').textContent = '-$' + yearlySavings.toFixed(2);
            document.getElementById('proration-note').classList.add('hidden');
          } else {
            document.getElementById('savings-display').classList.add('hidden');
            document.getElementById('proration-note').classList.remove('hidden');
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
          
          const billingType = isAnnual ? 'Annual (10 months prepaid - school year)' : 'Monthly';
          const pricePerStudent = selectedPrice;
          const monthlyTotal = pricePerStudent * selectedStudents;
          const totalCharge = isAnnual ? monthlyTotal * 10 : monthlyTotal;
          
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
      `}})]}),{title:"Curriculum - Acromatico Academy"}));k.get("/studio",t=>t.redirect("/static/studio.html",302));k.get("/prints",t=>t.redirect("/static/prints.html",302));k.get("/photography",t=>t.redirect("/static/photography-main.html",302));k.get("/weddings/booking",t=>t.redirect(`/static/weddings-booking-new.html?v=${Date.now()}&bust=${Math.random()}`,302));k.get("/portraits/booking",t=>t.redirect(`/static/portraits-booking.html?v=${Date.now()}`,302));k.get("/events/booking",t=>t.redirect("/static/events-booking.html",302));k.get("/realestate/booking",t=>t.redirect("/static/realestate-booking.html",302));k.get("/commercial",t=>t.redirect("/static/commercial-booking.html",302));k.get("/commercial/booking",t=>t.redirect("/static/commercial-booking.html",302));k.get("/studio-old",t=>t.html(`
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
        <a href="/prints">Prints</a>
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
        <a href="/prints" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: color 0.2s;">Prints</a>
        <a href="/photography" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: color 0.2s;">Photography</a>
        <a href="/contact" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: color 0.2s;">Contact</a>
      </div>
      <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 0;">© 2026 Acromatico. We help people see differently.</p>
    </div>
  </footer>

</body>
</html>
  `));k.get("/movement",t=>t.html(`
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

  ${Pt}
</body>
</html>
  `));k.get("/about",t=>t.render(e("div",{style:"background: #F5F3F0; min-height: 100vh;",children:[e(Xg,{}),e("section",{style:"padding: 140px 24px 80px; background: linear-gradient(180deg, #F5F3F0 0%, #E8E5E0 100%);",children:e("div",{style:"max-width: 1000px; margin: 0 auto; text-align: center;",children:[e("h1",{style:"font-size: 64px; font-weight: 300; letter-spacing: -2px; margin-bottom: 24px; color: #3D3935;",children:"Our Story"}),e("p",{style:"font-size: 24px; line-height: 1.6; color: #8B7E6A; max-width: 800px; margin: 0 auto;",children:"We're not just here to take photos—we're here to tell your story the way it was meant to be told."})]})}),e("section",{style:"padding: 100px 24px; background: white;",children:e("div",{style:"max-width: 900px; margin: 0 auto;",children:[e("div",{style:"margin-bottom: 80px;",children:[e("h2",{style:"font-size: 48px; font-weight: 300; letter-spacing: -1px; margin-bottom: 32px; color: #3D3935;",children:"No Forced Moments. No Copy-Paste Edits."}),e("p",{style:"font-size: 20px; line-height: 1.8; color: #5A5550; margin-bottom: 24px;",children:"Just real, meaningful connections captured with intention. We keep it real. Every couple, every brand, every story is different—so why should your photos look the same as everyone else's?"}),e("p",{style:"font-size: 20px; line-height: 1.8; color: #5A5550; margin-bottom: 24px;",children:["We take the time to understand who you are and craft images that feel like ",e("em",{style:"color: #3D3935; font-style: italic;",children:"you"}),". No awkward poses, no stiff smiles—just raw, authentic moments that hit home."]})]}),e("div",{style:"background: #F5F3F0; padding: 60px; margin-bottom: 80px; border-left: 4px solid #3D3935;",children:[e("h3",{style:"font-size: 32px; font-weight: 400; margin-bottom: 24px; color: #3D3935;",children:"We Keep It Honest."}),e("p",{style:"font-size: 20px; line-height: 1.8; color: #5A5550; margin-bottom: 24px;",children:"What you see is what you get. No paid referrals, no outsourcing, no gimmicks—just a team that genuinely cares about making every moment unforgettable."}),e("p",{style:"font-size: 20px; line-height: 1.8; color: #5A5550;",children:["For more than two decades, we've been all about one thing: ",e("strong",{style:"color: #3D3935;",children:"capturing stories that last."})]})]}),e("div",{style:"margin-bottom: 80px;",children:[e("h2",{style:"font-size: 48px; font-weight: 300; letter-spacing: -1px; margin-bottom: 48px; color: #3D3935; text-align: center;",children:"Meet the Artists"}),e("div",{style:"display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-bottom: 60px;",children:[e("div",{children:[e("h3",{style:"font-size: 28px; font-weight: 400; margin-bottom: 16px; color: #3D3935;",children:"Italo Campilii"}),e("p",{style:"font-size: 16px; line-height: 1.8; color: #8B7E6A; margin-bottom: 16px;",children:"Photographer, Filmmaker, Storyteller"}),e("p",{style:"font-size: 18px; line-height: 1.8; color: #5A5550;",children:["After decades of chasing light across continents—from the turquoise shores of Aruba to the golden villages of Cinque Terre—Italo discovered that the best photographs aren't staged. They're ",e("em",{style:"color: #3D3935;",children:"felt"}),"."]}),e("p",{style:"font-size: 18px; line-height: 1.8; color: #5A5550; margin-top: 16px;",children:"Co-founder of Ecolosophy, father, and advocate for intentional living, Italo brings a perspective shaped by years of healing, travel, and deep connection to nature."})]}),e("div",{children:[e("h3",{style:"font-size: 28px; font-weight: 400; margin-bottom: 16px; color: #3D3935;",children:"Ale"}),e("p",{style:"font-size: 16px; line-height: 1.8; color: #8B7E6A; margin-bottom: 16px;",children:"Photographer, Visual Artist, Detail Obsessive"}),e("p",{style:"font-size: 18px; line-height: 1.8; color: #5A5550;",children:"Ale sees the world in frames—the way light falls, the way a moment breathes, the way emotion lives in the smallest details. Together with Italo, she captures the places and moments that make us stop and remember what it feels like to be alive."}),e("p",{style:"font-size: 18px; line-height: 1.8; color: #5A5550; margin-top: 16px;",children:"Her work is defined by honesty, precision, and a refusal to settle for anything less than real."})]})]})]}),e("div",{style:"margin-bottom: 80px; text-align: center;",children:[e("h2",{style:"font-size: 48px; font-weight: 300; letter-spacing: -1px; margin-bottom: 32px; color: #3D3935;",children:"What We Believe"}),e("div",{style:"display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; margin-top: 60px;",children:[e("div",{children:[e("div",{style:"font-size: 48px; margin-bottom: 16px;",children:"📸"}),e("h4",{style:"font-size: 20px; font-weight: 500; margin-bottom: 12px; color: #3D3935;",children:"Authenticity Over Everything"}),e("p",{style:"font-size: 16px; line-height: 1.6; color: #8B7E6A;",children:"We don't manufacture moments. We capture them as they happen—raw, real, unforgettable."})]}),e("div",{children:[e("div",{style:"font-size: 48px; margin-bottom: 16px;",children:"🌍"}),e("h4",{style:"font-size: 20px; font-weight: 500; margin-bottom: 12px; color: #3D3935;",children:"Timeless, Not Trendy"}),e("p",{style:"font-size: 16px; line-height: 1.6; color: #8B7E6A;",children:"Trends fade. Moments last. We create images that will matter in 20 years, not just 20 minutes."})]}),e("div",{children:[e("div",{style:"font-size: 48px; margin-bottom: 16px;",children:"✨"}),e("h4",{style:"font-size: 20px; font-weight: 500; margin-bottom: 12px; color: #3D3935;",children:"Quality Over Quantity"}),e("p",{style:"font-size: 16px; line-height: 1.6; color: #8B7E6A;",children:"Limited editions. Hand-signed prints. Every piece is crafted with intention, not mass-produced."})]})]})]}),e("div",{style:"background: #3D3935; padding: 80px 60px; text-align: center; color: #F5F3F0;",children:[e("h2",{style:"font-size: 42px; font-weight: 300; margin-bottom: 24px; color: #F5F3F0;",children:"Let's Create Something Real, Together."}),e("p",{style:"font-size: 20px; line-height: 1.6; color: #E8E5E0; margin-bottom: 40px; max-width: 700px; margin-left: auto; margin-right: auto;",children:"Whether you're looking for fine art prints that transform your space or storytelling photography that captures your most important moments—we're here."}),e("div",{style:"display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;",children:[e("a",{href:"/prints",style:"padding: 18px 40px; background: white; color: #3D3935; text-decoration: none; font-size: 16px; font-weight: 500; letter-spacing: 1px; transition: all 0.3s; display: inline-block;",children:"EXPLORE PRINTS"}),e("a",{href:"https://acromatico.com/contact",target:"_blank",style:"padding: 18px 40px; background: transparent; color: white; border: 2px solid white; text-decoration: none; font-size: 16px; font-weight: 500; letter-spacing: 1px; transition: all 0.3s; display: inline-block;",children:"GET IN TOUCH"})]})]})]})}),e(Zg,{})]})));k.get("/pricing",t=>t.render(e("div",{class:"min-h-screen bg-black text-white",children:[e("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}),e(ar,{}),e("section",{class:"pt-32 pb-20 px-6",children:e("div",{class:"max-w-7xl mx-auto text-center",children:[e("h1",{class:"text-7xl md:text-8xl font-black mb-6",style:"letter-spacing: -0.02em;",children:"Programs & Pricing"}),e("p",{class:"text-2xl text-gray-400 mb-12 max-w-3xl mx-auto",children:["From beginner-friendly academy classes to professional masterclass coaching—",e("br",{}),"find the perfect program for your journey."]})]})}),e("section",{class:"py-20 px-6 border-t border-white/10",children:e("div",{class:"max-w-7xl mx-auto",children:[e("div",{class:"text-center mb-16",children:[e("h2",{class:"text-5xl font-black mb-4",children:"Masterclass Programs"}),e("p",{class:"text-xl text-gray-400",children:"Professional coaching for photographers of all ages"})]}),e("div",{class:"grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16",children:[e("div",{class:"bg-gradient-to-br from-gray-900 to-black rounded-3xl p-10 border-2 border-[#4794A6]/30 hover:border-[#4794A6] transition-all",children:[e("div",{class:"flex justify-between items-start mb-6",children:[e("div",{children:[e("h3",{class:"text-3xl font-bold mb-2",children:"Masterclass Coaching"}),e("div",{class:"text-5xl font-black text-[#4794A6] mb-2",children:"$695"}),e("p",{class:"text-gray-400",children:"One-time investment"})]}),e("span",{class:"bg-[#4794A6] text-white px-3 py-1 rounded-full text-xs font-bold uppercase",children:"STARTER"})]}),e("a",{href:"/masterclass",class:"block w-full py-4 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-center font-bold text-lg mb-8 transition-all",children:"Learn More"}),e("div",{class:"space-y-3 text-sm",children:[e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Mentorship for All Ages"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"2 Strategic Coaching Sessions"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Portfolio Review & Feedback"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Equipment Review"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Brand Guidance"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Business Strategy Consultation"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"$695 Credit Toward Business in a Box"})]})]})]}),e("div",{class:"bg-gradient-to-br from-white to-gray-100 rounded-3xl p-10 border-2 border-white text-black",children:[e("div",{class:"flex justify-between items-start mb-6",children:[e("div",{children:[e("h3",{class:"text-3xl font-bold mb-2",children:"Business in a Box"}),e("div",{class:"text-5xl font-black mb-2",children:"$3,000"}),e("p",{class:"text-gray-600",children:"One-time investment"})]}),e("span",{class:"bg-black text-white px-3 py-1 rounded-full text-xs font-bold uppercase",children:"PRO"})]}),e("a",{href:"/masterclass",class:"block w-full py-4 rounded-full bg-black hover:bg-gray-800 text-white text-center font-bold text-lg mb-8 transition-all",children:"Learn More"}),e("div",{class:"space-y-3 text-sm",children:[e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-black flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{class:"font-semibold",children:"Everything in Coaching, plus:"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-black flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Complete Wedding/Portrait/Commercial Training"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-black flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"AI Tools"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-black flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Photography Workflow (Booking to Delivery)"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-black flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Business Plan & Marketing Strategy"})]}),e("div",{class:"flex items-start gap-2",children:[e("svg",{class:"w-5 h-5 text-black flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Legal & Business Guidance"})]})]})]})]}),e("div",{class:"max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border-2 border-gray-800",children:[e("h3",{class:"text-3xl font-bold text-center mb-8",children:"Masterclass Comparison"}),e("div",{class:"overflow-x-auto",children:e("table",{class:"w-full",children:[e("thead",{children:e("tr",{class:"border-b-2 border-gray-800",children:[e("th",{class:"text-left py-4 px-4 font-bold",children:"Feature"}),e("th",{class:"text-center py-4 px-4 font-bold",children:"Coaching"}),e("th",{class:"text-center py-4 px-4 font-bold",children:"Business Box"})]})}),e("tbody",{class:"text-sm",children:[e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Mentorship for All Ages"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Strategic Coaching Sessions"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Portfolio Review & Feedback"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Equipment Review"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Brand Guidance"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Business Strategy Consultation"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Complete Photography Training"}),e("td",{class:"text-center py-3 px-4 text-gray-600",children:"—"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"AI Tools"}),e("td",{class:"text-center py-3 px-4 text-gray-600",children:"—"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Photography Workflow System"}),e("td",{class:"text-center py-3 px-4 text-gray-600",children:"—"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Business Plan & Marketing Strategy"}),e("td",{class:"text-center py-3 px-4 text-gray-600",children:"—"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"border-b border-gray-800/50",children:[e("td",{class:"py-3 px-4",children:"Legal & Business Guidance"}),e("td",{class:"text-center py-3 px-4 text-gray-600",children:"—"}),e("td",{class:"text-center py-3 px-4 text-[#4794A6] text-xl",children:"✓"})]}),e("tr",{class:"bg-gradient-to-r from-gray-900 to-black",children:[e("td",{class:"py-4 px-4 font-bold text-lg",children:"Investment"}),e("td",{class:"text-center py-4 px-4 font-bold text-2xl text-[#4794A6]",children:"$695"}),e("td",{class:"text-center py-4 px-4 font-bold text-2xl",children:"$3,000"})]})]})]})})]})]})}),e("section",{class:"py-20 px-6 border-t border-white/10",children:e("div",{class:"max-w-7xl mx-auto",children:[e("div",{class:"text-center mb-16",children:[e("h2",{class:"text-5xl font-black mb-4",children:"Academy Programs"}),e("p",{class:"text-xl text-gray-400",children:"Monthly photography classes for young creators (Ages 7-14)"})]}),e("div",{class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16",children:[e("div",{class:"bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800",children:[e("div",{class:"text-center mb-6",children:[e("div",{class:"text-4xl font-black mb-2 text-[#4794A6]",children:"1"}),e("div",{class:"text-gray-400 text-sm",children:"Student"})]}),e("div",{class:"text-center mb-6",children:[e("div",{class:"text-3xl font-bold",children:["$116",e("span",{class:"text-sm text-gray-400",children:"/mo"})]}),e("div",{class:"text-xs text-gray-500 mt-1",children:"$93/mo annual"})]}),e("a",{href:"/education",class:"block w-full py-3 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-center font-bold text-sm transition-all",children:"Enroll Now"}),e("div",{class:"mt-6 pt-6 border-t border-gray-800 space-y-2 text-xs text-gray-400",children:[e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," 8 live classes/month"]}),e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," All recordings"]}),e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," Cancel anytime"]})]})]}),e("div",{class:"bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border-2 border-[#4794A6] relative",children:[e("div",{class:"absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4794A6] text-white px-3 py-1 rounded-full text-xs font-bold",children:"POPULAR"}),e("div",{class:"text-center mb-6",children:[e("div",{class:"text-4xl font-black mb-2 text-[#4794A6]",children:"2"}),e("div",{class:"text-gray-400 text-sm",children:"Students"})]}),e("div",{class:"text-center mb-6",children:[e("div",{class:"text-3xl font-bold",children:["$99",e("span",{class:"text-sm text-gray-400",children:"/mo"})]}),e("div",{class:"text-xs text-gray-500 mt-1",children:"$79/mo annual (each)"})]}),e("a",{href:"/education",class:"block w-full py-3 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-center font-bold text-sm transition-all",children:"Enroll Now"}),e("div",{class:"mt-6 pt-6 border-t border-gray-800 space-y-2 text-xs text-gray-400",children:[e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," 8 live classes/month"]}),e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," All recordings"]}),e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," Save $400/year"]})]})]}),e("div",{class:"bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800",children:[e("div",{class:"text-center mb-6",children:[e("div",{class:"text-4xl font-black mb-2 text-[#4794A6]",children:"3"}),e("div",{class:"text-gray-400 text-sm",children:"Students"})]}),e("div",{class:"text-center mb-6",children:[e("div",{class:"text-3xl font-bold",children:["$89",e("span",{class:"text-sm text-gray-400",children:"/mo"})]}),e("div",{class:"text-xs text-gray-500 mt-1",children:"$71/mo annual (each)"})]}),e("a",{href:"/education",class:"block w-full py-3 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-center font-bold text-sm transition-all",children:"Enroll Now"}),e("div",{class:"mt-6 pt-6 border-t border-gray-800 space-y-2 text-xs text-gray-400",children:[e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," 8 live classes/month"]}),e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," All recordings"]}),e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," Save $540/year"]})]})]}),e("div",{class:"bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800",children:[e("div",{class:"text-center mb-6",children:[e("div",{class:"text-4xl font-black mb-2 text-[#4794A6]",children:"4+"}),e("div",{class:"text-gray-400 text-sm",children:"Students"})]}),e("div",{class:"text-center mb-6",children:[e("div",{class:"text-3xl font-bold",children:["$79",e("span",{class:"text-sm text-gray-400",children:"/mo"})]}),e("div",{class:"text-xs text-gray-500 mt-1",children:"$63/mo annual (each)"})]}),e("a",{href:"/education",class:"block w-full py-3 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-center font-bold text-sm transition-all",children:"Enroll Now"}),e("div",{class:"mt-6 pt-6 border-t border-gray-800 space-y-2 text-xs text-gray-400",children:[e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," 8 live classes/month"]}),e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," All recordings"]}),e("div",{class:"flex items-center gap-2",children:[e("span",{class:"text-[#4794A6]",children:"✓"})," Save $640/year"]})]})]})]}),e("div",{class:"max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border-2 border-gray-800",children:[e("h3",{class:"text-3xl font-bold text-center mb-8",children:"What's Included in Academy"}),e("div",{class:"grid md:grid-cols-2 gap-6 text-sm",children:[e("div",{class:"space-y-3",children:[e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"30-Minute Micro-Learning Sessions"})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"8 Live Classes per Month"})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Lifetime Instruction Library"})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"December Bonus Workshops"})]})]}),e("div",{class:"space-y-3",children:[e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Portfolio Building"})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"All Class Recordings"})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Cancel Anytime (Daily Proration)"})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})}),e("span",{children:"Annual Billing (Save 20%)"})]})]})]})]})]})}),e("section",{class:"py-20 px-6 border-t border-white/10",children:e("div",{class:"max-w-4xl mx-auto text-center",children:[e("h2",{class:"text-4xl font-bold mb-6",children:"Still have questions?"}),e("p",{class:"text-xl text-gray-400 mb-10",children:"We're here to help you find the perfect program for your photography journey."}),e("div",{class:"flex flex-col sm:flex-row gap-4 justify-center",children:[e("a",{href:"mailto:hello@acromatico.com",class:"px-10 py-5 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white font-bold text-lg transition-all inline-block",children:"Contact Us"}),e("a",{href:"/faq",class:"px-10 py-5 rounded-full border-2 border-white hover:bg-white hover:text-black text-white font-bold text-lg transition-all inline-block",children:"View FAQ"})]})]})}),e("div",{dangerouslySetInnerHTML:{__html:Pt}})]}),{title:"Programs & Pricing - Acromatico"}));k.get("/invoices",t=>t.render(e("div",{class:"min-h-screen bg-black text-white",children:[e("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .invoice-container { box-shadow: none !important; border: 1px solid #ddd !important; }
        }
      `}),e("div",{class:"no-print",children:e(ar,{})}),e("section",{class:"pt-32 pb-20 px-6",children:e("div",{class:"max-w-5xl mx-auto",children:[e("div",{class:"no-print text-center mb-12",children:[e("h1",{class:"text-6xl mb-6",style:"font-weight: 300; letter-spacing: -0.03em; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;",children:"For Step Up Students"}),e("div",{class:"max-w-3xl mx-auto text-lg text-gray-400 space-y-4",style:"font-weight: 300; line-height: 1.7;",children:[e("p",{children:[e("strong",{class:"text-white",style:"font-weight: 400;",children:"We proudly collaborate with Step Up For Students"})," to make quality photography education accessible to Florida families."]}),e("p",{children:"If you cannot locate your original invoice or need to generate a new one for reimbursement, use this tool to download your invoice. All invoices are Step Up compliant and include detailed program descriptions."}),e("p",{class:"text-sm",style:"font-weight: 300;",children:[e("strong",{class:"text-white",style:"font-weight: 400;",children:"Note:"})," Our programs qualify under the ",e("span",{class:"text-[#4794A6]",children:"Electives"})," category. Instructor credentials available upon request."]})]}),e("div",{class:"mt-8",children:[e("button",{onclick:"downloadCredentials()",class:"px-8 py-4 rounded-full bg-gradient-to-r from-[#4794A6] to-[#5aa5b8] hover:from-[#5aa5b8] hover:to-[#6bb6c9] text-white text-lg transition-all shadow-lg",style:"font-weight: 400; letter-spacing: 0.01em;",children:"📄 Download Instructor Credentials"}),e("p",{class:"text-sm text-gray-500 mt-3",style:"font-weight: 300;",children:"For Step Up verification if requested"})]})]}),e("div",{class:"no-print bg-gradient-to-br from-[#4794A6]/20 to-[#4794A6]/5 rounded-3xl p-8 border-2 border-[#4794A6]/30 mb-8",children:[e("h2",{class:"text-2xl mb-4 text-center",style:"font-weight: 300; letter-spacing: -0.02em;",children:"💳 Payment Options"}),e("p",{class:"text-center text-gray-400 mb-6",style:"font-weight: 300;",children:"If you haven't done so, please complete your payment before generating your invoice"}),e("div",{class:"grid md:grid-cols-2 gap-6 max-w-3xl mx-auto",children:[e("div",{class:"bg-black/30 rounded-2xl p-6 border border-[#4794A6]/20 md:col-span-2",children:[e("p",{class:"mb-2 text-lg",style:"font-weight: 400;",children:"💳 Credit/Debit Card"}),e("p",{class:"text-sm text-gray-400 mb-3",style:"font-weight: 300;",children:"Secure payment powered by Stripe"}),e("button",{onclick:"openStripePayment()",class:"inline-block px-6 py-3 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-sm transition-all w-full",style:"font-weight: 400;",children:"Pay with Credit/Debit Card →"})]}),e("div",{class:"bg-black/30 rounded-2xl p-6 border border-[#4794A6]/20",children:[e("p",{class:"mb-2",style:"font-weight: 400;",children:"📱 Zelle"}),e("p",{class:"text-[#4794A6] font-mono text-lg",children:"954-779-0921"}),e("p",{class:"text-xs text-gray-400 mt-2",style:"font-weight: 300;",children:"Send payment to this phone number"})]}),e("div",{class:"bg-black/30 rounded-2xl p-6 border border-[#4794A6]/20",children:[e("p",{class:"mb-2",style:"font-weight: 400;",children:"💰 Venmo"}),e("p",{class:"text-[#4794A6] font-mono text-lg",children:"@acromatico"}),e("p",{class:"text-xs text-gray-400 mt-2",style:"font-weight: 300;",children:"Send payment to this handle"})]}),e("div",{class:"bg-black/30 rounded-2xl p-6 border border-[#4794A6]/20",children:[e("p",{class:"mb-2",style:"font-weight: 400;",children:"💵 Cash App"}),e("p",{class:"text-[#4794A6] font-mono text-lg",children:"$acromatico"}),e("p",{class:"text-xs text-gray-400 mt-2",style:"font-weight: 300;",children:"Send payment to this cashtag"})]}),e("div",{class:"bg-black/30 rounded-2xl p-6 border border-[#4794A6]/20",children:[e("p",{class:"mb-2",style:"font-weight: 400;",children:"💵 Check or Cash"}),e("p",{class:"text-sm text-gray-400",style:"font-weight: 300;",children:"Contact us for mailing address"})]})]})]}),e("div",{class:"no-print bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border-2 border-gray-800 mb-12",children:[e("h2",{class:"text-2xl mb-6",style:"font-weight: 300; letter-spacing: -0.02em;",children:"Generate Your Invoice"}),e("div",{class:"space-y-4",children:[e("div",{class:"grid md:grid-cols-2 gap-4",children:[e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Parent/Guardian Name*"}),e("input",{type:"text",id:"parentName",placeholder:"John Smith",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;"})]}),e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Email*"}),e("input",{type:"email",id:"parentEmail",placeholder:"john@example.com",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;"})]})]}),e("div",{class:"grid md:grid-cols-2 gap-4",children:[e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Student Name(s)*"}),e("input",{type:"text",id:"studentNames",placeholder:"Sarah Smith, Michael Smith",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;"})]}),e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Invoice Date*"}),e("input",{type:"date",id:"invoiceDate",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;"})]})]}),e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Program*"}),e("select",{id:"programType",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;",children:[e("option",{value:"",children:"Select a program..."}),e("optgroup",{label:"Academy (Ages 7-14)",children:[e("option",{value:"academy-1-monthly",children:"Academy - 1 Student - Monthly ($116/mo)"}),e("option",{value:"academy-1-annual",children:"Academy - 1 Student - Annual ($930/year)"}),e("option",{value:"academy-2-monthly",children:"Academy - 2 Students - Monthly ($198/mo)"}),e("option",{value:"academy-2-annual",children:"Academy - 2 Students - Annual ($1,580/year)"}),e("option",{value:"academy-3-monthly",children:"Academy - 3 Students - Monthly ($267/mo)"}),e("option",{value:"academy-3-annual",children:"Academy - 3 Students - Annual ($2,130/year)"}),e("option",{value:"academy-4-monthly",children:"Academy - 4+ Students - Monthly ($316/mo)"}),e("option",{value:"academy-4-annual",children:"Academy - 4+ Students - Annual ($2,520/year)"})]}),e("optgroup",{label:"Masterclass",children:[e("option",{value:"masterclass-coaching",children:"Masterclass Coaching ($695)"}),e("option",{value:"masterclass-business",children:"Business in a Box ($3,000)"})]})]})]}),e("div",{class:"grid md:grid-cols-2 gap-4",children:[e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Amount*"}),e("input",{type:"number",id:"invoiceAmount",placeholder:"116.00",step:"0.01",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;"})]}),e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Due Date"}),e("input",{type:"date",id:"dueDate",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;"})]})]}),e("div",{class:"grid md:grid-cols-2 gap-4",children:[e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Payment Date*"}),e("input",{type:"date",id:"paymentDate",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;"})]}),e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Payment Method*"}),e("select",{id:"paymentMethod",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;",children:[e("option",{value:"",children:"Select payment method..."}),e("option",{value:"Credit Card (Stripe)",children:"Credit Card (Stripe)"}),e("option",{value:"Zelle",children:"Zelle"}),e("option",{value:"Venmo",children:"Venmo"}),e("option",{value:"Cash App",children:"Cash App"}),e("option",{value:"Check",children:"Check"}),e("option",{value:"Cash",children:"Cash"})]})]})]}),e("div",{children:[e("label",{class:"block text-sm mb-2",style:"font-weight: 300; color: #ccc;",children:"Additional Notes"}),e("textarea",{id:"invoiceNotes",rows:"2",placeholder:"Any additional information...",class:"w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none",style:"font-weight: 300;"})]}),e("button",{onclick:"generateInvoice()",class:"w-full py-4 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-lg transition-all",style:"font-weight: 400; letter-spacing: 0.01em;",children:"Generate Invoice for Step Up"})]})]}),e("style",{children:`
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
          `}),e("div",{id:"invoicePreview",class:"invoice-container bg-white text-black rounded-3xl p-12 shadow-2xl hidden",children:[e("div",{class:"border-b-2 border-gray-300 pb-8 mb-8",children:e("div",{class:"flex justify-between items-start",children:[e("div",{children:[e("img",{src:"/static/acromatico-logo-official.png",alt:"Acromatico",class:"h-16 mb-4"}),e("div",{class:"text-sm text-gray-600",children:[e("p",{class:"font-bold text-lg text-black mb-2",children:"Acromatico Inc"}),e("p",{children:"2300 W 84th ST. Suite 213"}),e("p",{children:"Miami, FL 33016"}),e("p",{class:"mt-2",children:"Phone: 954.779.0921"}),e("p",{children:"Email: info@acromatico.com"})]})]}),e("div",{class:"text-right",children:[e("h1",{class:"text-5xl font-thin tracking-widest text-[#4794A6] mb-4",style:"font-family: 'Inter', sans-serif; letter-spacing: 0.2em;",children:"INVOICE"}),e("p",{class:"text-sm text-gray-600 mb-1",children:"Invoice #"}),e("p",{class:"text-2xl font-bold",id:"invoiceNumber",children:"INV-1247"}),e("p",{class:"text-sm text-gray-600 mt-3 mb-1",children:"Invoice Date"}),e("p",{class:"font-semibold",id:"displayInvoiceDate",children:"-"}),e("p",{class:"text-sm text-gray-600 mt-2 mb-1",children:"Due Date"}),e("p",{class:"font-semibold",id:"displayDueDate",children:"-"})]})]})}),e("div",{class:"mb-8",children:[e("p",{class:"text-sm text-gray-600 font-bold mb-2",children:"BILL TO"}),e("p",{class:"text-lg font-bold",id:"displayParentName",children:"-"}),e("p",{class:"text-gray-600",id:"displayParentEmail",children:"-"})]}),e("table",{class:"w-full mb-8",children:[e("thead",{class:"bg-gray-100 border-y-2 border-gray-300",children:e("tr",{children:[e("th",{class:"text-left py-3 px-4 font-bold",children:"Description"}),e("th",{class:"text-center py-3 px-4 font-bold",children:"Students"}),e("th",{class:"text-right py-3 px-4 font-bold",children:"Amount"})]})}),e("tbody",{children:e("tr",{class:"border-b border-gray-200",children:[e("td",{class:"py-4 px-4",children:[e("p",{class:"font-semibold text-lg mb-2",id:"displayProgram",children:"-"}),e("p",{class:"text-sm font-medium text-gray-700 mb-1",children:["Student(s): ",e("span",{id:"displayStudents",children:"-"})]}),e("div",{class:"text-sm text-gray-600 mt-2",id:"displayBenefits"})]}),e("td",{class:"text-center py-4 px-4 font-bold text-lg",id:"displayStudentCount",children:"1"}),e("td",{class:"text-right py-4 px-4 font-bold text-xl",id:"displayAmount",children:"$0.00"})]})})]}),e("div",{class:"flex justify-end mb-8",children:e("div",{class:"w-80",children:[e("div",{class:"flex justify-between py-2 text-lg",children:[e("span",{class:"font-bold",children:"Subtotal:"}),e("span",{id:"displaySubtotal",children:"$0.00"})]}),e("div",{class:"flex justify-between py-3 border-t-2 border-gray-300 text-2xl",children:[e("span",{class:"font-black",children:"TOTAL DUE:"}),e("span",{class:"font-black text-[#4794A6]",id:"displayTotal",children:"$0.00"})]})]})}),e("div",{class:"bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8",children:e("div",{class:"flex items-start gap-3",children:[e("div",{class:"text-3xl",children:"✅"}),e("div",{class:"flex-1",children:[e("p",{class:"font-bold text-lg text-green-800 mb-1",children:"PAYMENT RECEIVED"}),e("p",{class:"text-gray-700",children:["Payment Date: ",e("span",{class:"font-semibold",id:"displayPaymentDate",children:"-"})]}),e("p",{class:"text-gray-700",children:["Payment Method: ",e("span",{class:"font-semibold",id:"displayPaymentMethod",children:"-"})]}),e("p",{class:"text-sm text-gray-600 mt-2",children:"Thank you for your payment!"})]})]})}),e("div",{id:"notesSection",class:"mb-8 hidden",children:[e("p",{class:"text-sm font-bold text-gray-600 mb-2",children:"NOTES"}),e("p",{class:"text-gray-700",id:"displayNotes"})]}),e("div",{class:"border-t-2 border-gray-300 pt-6 text-center text-sm text-gray-600",children:[e("p",{class:"font-bold text-black mb-2",children:"For Step Up For Students Reimbursement"}),e("p",{children:"This invoice is compliant with Step Up For Students requirements and includes detailed educational program descriptions."}),e("p",{class:"mt-3",children:["Questions? Contact us at ",e("strong",{children:"info@acromatico.com"})," or ",e("strong",{children:"954.779.0921"})]})]})]}),e("div",{id:"invoiceActions",class:"no-print flex gap-4 justify-center mt-8 hidden",children:[e("button",{onclick:"window.print()",class:"px-8 py-4 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white font-bold transition-all",children:"📄 Download / Print Invoice"}),e("button",{onclick:"editInvoice()",class:"px-8 py-4 rounded-full border-2 border-white hover:bg-white hover:text-black text-white font-bold transition-all",children:"✏️ Edit Invoice"}),e("button",{onclick:"resetInvoice()",class:"px-8 py-4 rounded-full border-2 border-gray-800 hover:bg-gray-800 text-white font-bold transition-all",children:"🔄 New Invoice"})]})]})}),e("div",{class:"no-print",dangerouslySetInnerHTML:{__html:Pt}}),e("script",{dangerouslySetInnerHTML:{__html:`
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
      `}})]}),{title:"For Step Up Students - Invoice Generator - Acromatico"}));k.get("/success",t=>(t.req.query("session_id"),t.html(`
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
          
          <a href="/prints" style="display: inline-block; background: #3D3935; color: white; padding: 16px 48px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: 500; margin-right: 12px;">
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
  `)));k.get("/cart",t=>t.render(e("div",{class:"min-h-screen bg-black text-white",children:[e(ar,{}),e("section",{class:"pt-32 pb-20 min-h-screen",children:e("div",{class:"max-w-6xl mx-auto px-6 lg:px-8",children:[e("h1",{class:"text-5xl font-black mb-12",children:"Shopping Cart"}),e("div",{class:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:[e("div",{class:"lg:col-span-2 space-y-4",id:"cart-items"}),e("div",{class:"lg:col-span-1",children:e("div",{class:"feature-card p-8 rounded-3xl sticky top-32",children:[e("h2",{class:"text-2xl font-bold mb-6",children:"Order Summary"}),e("div",{class:"space-y-4 mb-6",children:[e("div",{class:"flex justify-between text-gray-400",children:[e("span",{children:"Subtotal"}),e("span",{id:"subtotal",children:"$0.00"})]}),e("div",{class:"flex justify-between text-gray-400",children:[e("span",{children:"Annual Savings"}),e("span",{id:"savings",class:"text-teal-500",children:"-$0.00"})]}),e("div",{class:"pt-4 border-t border-white/10",children:[e("div",{class:"flex justify-between text-xl font-bold",children:[e("span",{children:"Total"}),e("span",{id:"total",children:"$0.00"})]}),e("div",{class:"text-sm text-gray-400 mt-2",id:"billing-cycle",children:"per month"})]})]}),e("a",{href:"/checkout",class:"btn-primary w-full px-6 py-4 rounded-full font-bold text-white text-center block",children:"Proceed to Checkout"}),e("p",{class:"text-xs text-gray-500 text-center mt-4",children:[e("i",{class:"fas fa-lock mr-1"}),"Secure checkout powered by Stripe"]})]})})]}),e("div",{id:"empty-cart",class:"text-center py-20 hidden",children:[e("i",{class:"fas fa-shopping-cart text-6xl text-gray-700 mb-6"}),e("h2",{class:"text-3xl font-bold mb-4",children:"Your cart is empty"}),e("p",{class:"text-gray-400 mb-8",children:"Add some students to get started!"}),e("a",{href:"/pricing",class:"btn-primary px-8 py-4 rounded-full font-bold text-white inline-block",children:"View Pricing"})]})]})}),e("script",{dangerouslySetInnerHTML:{__html:`
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
            
            // Annual billing: 10 months prepaid
            let itemTotal = monthlyTotal;
            let itemSavings = 0;
            
            if (item.billing === 'annual') {
              // Annual total = monthly × 10 months (already has 20% discount in price)
              itemTotal = monthlyTotal * 10;
              
              // Calculate what they WOULD pay without discount
              const monthlyPriceWithoutDiscount = pricePerStudent / 0.8; // Reverse 20% discount
              const annualWithoutDiscount = monthlyPriceWithoutDiscount * totalStudents * 10;
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
                      $\${pricePerStudent}/month per student · \${item.billing === 'annual' ? 'Annual (10 months prepaid)' : 'Monthly'}
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
                      <div class="text-xs text-gray-500">\${item.billing === 'annual' ? 'total (10 months)' : 'per month'}</div>
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
          document.getElementById('billing-cycle').textContent = hasAnnual ? 'total for 10 months' : 'per month';
        }
        
        // Initial render
        renderCart();
      `}})]}),{title:"Shopping Cart - Acromatico"}));k.get("/checkout",t=>t.render(e("div",{class:"min-h-screen bg-black text-white",children:[e("nav",{class:"glass-nav fixed top-0 left-0 right-0 z-50",children:e("div",{class:"max-w-7xl mx-auto px-6 lg:px-8",children:e("div",{class:"flex justify-between h-20 items-center",children:[e("div",{class:"flex items-center space-x-4",children:e("a",{href:"/cart",class:"text-gray-300 hover:text-white transition",children:[e("i",{class:"fas fa-arrow-left mr-2"}),"Back to Cart"]})}),e("div",{class:"flex-1 flex justify-center",children:e("a",{href:"/",children:e("img",{src:"/static/acromatico-logo-white.png",alt:"Acromatico",class:"h-8 w-auto"})})}),e("div",{class:"flex items-center space-x-4 opacity-0",children:e("span",{children:"Spacer"})})]})})}),e("section",{class:"pt-32 pb-20",children:e("div",{class:"max-w-6xl mx-auto px-6 lg:px-8",children:[e("h1",{class:"text-5xl font-black mb-12",children:"Checkout"}),e("div",{class:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:[e("div",{class:"lg:col-span-2 space-y-8",children:[e("div",{class:"feature-card p-8 rounded-3xl",children:[e("h2",{class:"text-2xl font-bold mb-6 flex items-center gap-3",children:[e("span",{class:"w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-sm font-bold",children:"1"}),"Account Information"]}),e("div",{class:"space-y-4",children:[e("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"First Name"}),e("input",{type:"text",id:"firstName",class:"w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none"})]}),e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"Last Name"}),e("input",{type:"text",id:"lastName",class:"w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none"})]})]}),e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"Email Address"}),e("input",{type:"email",id:"email",class:"w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none"})]}),e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"Password"}),e("input",{type:"password",id:"password",class:"w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none"})]})]})]}),e("div",{class:"feature-card p-8 rounded-3xl",children:[e("h2",{class:"text-2xl font-bold mb-6 flex items-center gap-3",children:[e("span",{class:"w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-sm font-bold",children:"2"}),"Student Information"]}),e("div",{id:"students-container",class:"space-y-6"})]}),e("div",{class:"feature-card p-8 rounded-3xl",children:[e("h2",{class:"text-2xl font-bold mb-6 flex items-center gap-3",children:[e("span",{class:"w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-sm font-bold",children:"3"}),"Payment Information"]}),e("div",{class:"space-y-4",children:[e("div",{id:"card-element",class:"w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700",children:e("div",{class:"text-gray-500 text-sm",children:"Stripe payment form will be integrated here"})}),e("p",{class:"text-xs text-gray-500",children:[e("i",{class:"fas fa-lock mr-1"}),"Your payment information is secure and encrypted"]})]})]}),e("button",{id:"submit-btn",class:"btn-primary w-full px-8 py-5 rounded-full text-xl font-bold text-white",children:"Complete Enrollment"})]}),e("div",{class:"lg:col-span-1",children:e("div",{class:"feature-card p-8 rounded-3xl sticky top-32",children:[e("h2",{class:"text-2xl font-bold mb-6",children:"Order Summary"}),e("div",{id:"order-items",class:"space-y-4 mb-6"}),e("div",{class:"space-y-3 mb-6",children:[e("div",{class:"flex justify-between text-gray-400",children:[e("span",{children:"Subtotal"}),e("span",{id:"checkout-subtotal",children:"$0.00"})]}),e("div",{class:"flex justify-between text-gray-400",children:[e("span",{children:"Annual Savings"}),e("span",{id:"checkout-savings",class:"text-teal-500",children:"-$0.00"})]}),e("div",{class:"pt-3 border-t border-white/10",children:[e("div",{class:"flex justify-between text-xl font-bold",children:[e("span",{children:"Total Today"}),e("span",{id:"checkout-total",children:"$0.00"})]}),e("div",{class:"text-sm text-gray-400 mt-2",children:"Daily prorated for first month"})]})]}),e("div",{class:"pt-6 border-t border-white/10 space-y-3 text-xs text-gray-500",children:[e("div",{class:"flex items-start gap-2",children:[e("i",{class:"fas fa-check text-teal-500 mt-0.5"}),e("span",{children:"Cancel anytime, no questions asked"})]}),e("div",{class:"flex items-start gap-2",children:[e("i",{class:"fas fa-check text-teal-500 mt-0.5"}),e("span",{children:"Daily proration - pay only for days used"})]}),e("div",{class:"flex items-start gap-2",children:[e("i",{class:"fas fa-check text-teal-500 mt-0.5"}),e("span",{children:"Instant access to all class recordings"})]})]})]})})]})]})}),e("script",{dangerouslySetInnerHTML:{__html:`
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
                <div class="text-sm text-gray-400">\${item.billing === 'annual' ? 'Annual (10 months)' : 'Monthly'} · $\${monthlyTotal.toFixed(2)}/mo</div>
                \${item.billing === 'annual' ? '<div class="text-teal-500 text-xs mt-1">Save $' + itemSavings.toFixed(2) + '</div>' : ''}
              </div>
            \`;
          }).join('');
          
          // Calculate prorated amount for FIRST MONTH ONLY (for monthly billing)
          const today = new Date();
          const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
          const daysRemaining = daysInMonth - today.getDate() + 1;
          
          // For first month: prorate based on days remaining
          const proratedFirstMonth = (monthlySubtotal / daysInMonth) * daysRemaining;
          
          document.getElementById('checkout-subtotal').textContent = '$' + monthlySubtotal.toFixed(2);
          document.getElementById('checkout-savings').textContent = totalSavings > 0 ? '-$' + totalSavings.toFixed(2) : '$0.00';
          document.getElementById('checkout-total').textContent = '$' + proratedFirstMonth.toFixed(2);
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
      `}})]}),{title:"Checkout - Acromatico Academy"}));k.get("/login",t=>t.redirect("/education/login"));k.get("/education/login",t=>t.html(Qg));k.get("/education/signup",t=>t.redirect("/static/education-signup.html"));k.get("/education/reset-password",t=>t.redirect("/education-reset-password.html"));k.get("/pricing",t=>t.redirect("/static/pricing.html"));k.get("/enroll",t=>t.redirect("/static/pricing.html"));k.get("/student/dashboard",t=>t.redirect("/static/student-dashboard.html"));k.get("/student/projects",t=>t.redirect("/static/student-projects.html"));k.get("/parent/dashboard",t=>t.redirect("/static/parent-dashboard.html"));k.get("/admin/dashboard",t=>t.redirect("/static/admin-dashboard.html"));k.get("/admin/curriculum",t=>t.redirect("/static/admin-curriculum-v2.html"));k.get("/admin/curriculum/old",t=>t.redirect("/static/admin-curriculum.html"));k.get("/debug/auth",t=>t.redirect("/static/debug-auth.html"));k.get("/admin/crm",t=>t.redirect("/static/admin-crm.html"));k.get("/assessment",t=>t.redirect("/static/assessment.html"));k.get("/contact",t=>t.render(e("div",{class:"p-8",children:e("h1",{class:"text-3xl font-bold",children:"Contact - Coming Soon"})})));k.get("/our-story",t=>t.render(e("div",{class:"min-h-screen bg-black text-white",children:[e("nav",{class:"glass-nav fixed top-0 left-0 right-0 z-50",children:e("div",{class:"max-w-7xl mx-auto px-6 lg:px-8",children:e("div",{class:"flex justify-between h-20 items-center",children:[e("div",{class:"flex items-center space-x-4 opacity-0",children:e("span",{children:"Spacer"})}),e("div",{class:"flex-1 flex justify-center",children:e("a",{href:"/",children:e("img",{src:"/static/acromatico-logo-white.png",alt:"Acromatico",class:"h-8 w-auto"})})}),e("div",{class:"flex items-center space-x-4",children:e("a",{href:"/login",class:"text-gray-300 hover:text-white transition",children:"Sign In"})})]})})}),e("section",{class:"pt-32 pb-20",children:e("div",{class:"max-w-4xl mx-auto px-6 lg:px-8",children:[e("h1",{class:"text-6xl font-black mb-8",children:"Our Story"}),e("div",{class:"space-y-8 text-xl text-gray-300 leading-relaxed",children:[e("p",{children:"Acromatico was born from a simple belief: every child has a unique way of seeing the world, and photography is one of the most powerful tools to help them discover and express that vision."}),e("p",{children:"Founded by award-winning photographers Italo Campilii and Ale, with over 20 years of combined experience in visual storytelling, documentary filmmaking, and portrait photography, Acromatico exists to empower young creators ages 7-14 with real-world skills."}),e("p",{children:"We're not just teaching kids how to use a camera. We're teaching them how to see, how to tell stories, and how to capture moments that matter. Our live, interactive classes combine technical expertise with creative freedom, giving students the confidence to create work they're proud of."}),e("p",{children:[e("strong",{class:"text-teal-500",children:"Our mission is simple:"})," Help 1,000 young creators discover their visual voice and build skills that last a lifetime."]})]})]})})]}),{title:"Our Story - Acromatico"}));k.get("/faq",t=>t.render(e("div",{class:"min-h-screen bg-black text-white",children:[e("nav",{class:"glass-nav fixed top-0 left-0 right-0 z-50",children:e("div",{class:"max-w-7xl mx-auto px-6 lg:px-8",children:e("div",{class:"flex justify-between h-20 items-center",children:[e("a",{href:"/",children:e("img",{src:"/static/acromatico-logo-white.png",alt:"Acromatico",class:"h-8"})}),e("div",{class:"flex items-center gap-6",children:e("a",{href:"/pricing",class:"btn-primary px-6 py-3 rounded-full text-sm font-bold inline-block",style:"background: #4794A6;",children:"Enroll Now"})})]})})}),e("section",{class:"pt-32 pb-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden",children:[e("div",{class:"absolute inset-0 opacity-20",children:[e("div",{class:"stars-small"}),e("div",{class:"stars-medium"}),e("div",{class:"stars-large"})]}),e("div",{class:"relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center",children:[e("h1",{class:"text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent",children:"Everything You Need to Know"}),e("p",{class:"text-2xl text-gray-300 mb-12 max-w-3xl mx-auto",children:"From enrollment to gear recommendations — your complete resource guide."})]})]}),e("section",{class:"py-20 bg-black",children:e("div",{class:"max-w-4xl mx-auto px-6 lg:px-8",children:[e("div",{class:"mb-16",children:[e("h2",{class:"text-4xl font-black mb-8 text-teal-500",children:"General Questions"}),e("div",{class:"space-y-6",children:[e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"What age is this program for?"}),e("p",{class:"text-gray-300 leading-relaxed",children:["Acromatico Academy is designed for young creators ",e("strong",{class:"text-white",children:"ages 7-14"}),". Our 30-minute micro-learning format is perfect for this age range — long enough to teach real skills, short enough to keep them engaged."]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"Do they need prior experience?"}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-white",children:"Absolutely not!"})," We start from the very beginning. Whether your child has never touched a camera or has been snapping photos on their phone, we'll meet them where they are and take them further."]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"What if they can't attend a live class?"}),e("p",{class:"text-gray-300 leading-relaxed",children:["No problem! Every class is recorded and available in our ",e("strong",{class:"text-teal-400",children:"Lifetime Instruction Library"}),". Your child can catch up on expert-led teachings anytime, rewatch lessons as many times as they need, and never fall behind."]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"How many classes per month?"}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-white",children:"8 live classes per month"})," — every Monday and Thursday at 11:30 AM ET. Plus, in December, we add ",e("strong",{class:"text-teal-400",children:"2 special 1-hour fun workshops"})," during the first 2 weeks to celebrate the year."]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"Can I cancel anytime?"}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-white",children:"Yes!"})," Monthly plans can be canceled anytime with no penalties. You only pay for the days you use (daily proration). Annual plans are prepaid for 10 months (Sept-June school year) and save you 20%."]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"What if we join mid-year?"}),e("p",{class:"text-gray-300 leading-relaxed mb-3",children:[e("strong",{class:"text-white",children:"No problem!"})," You can join anytime during the school year."]}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-teal-400",children:"For Monthly Plans:"})," You'll start with the current month's curriculum and continue through June. Any months you missed will roll over to the next school year, so your child completes the full 10-month journey."]}),e("p",{class:"text-gray-300 leading-relaxed mt-3",children:[e("strong",{class:"text-teal-400",children:"For Annual Plans:"})," If you join mid-year (e.g., January), your 10-month annual plan covers January-June this year, then September-December the following year. You get the full curriculum and 20% savings, just spread across two school years."]})]})]})]}),e("div",{class:"mb-16",children:[e("h2",{class:"text-4xl font-black mb-8 text-blue-500",children:"Gear Recommendations"}),e("div",{class:"bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-2xl border border-blue-800/30 mb-8",children:[e("h3",{class:"text-3xl font-bold mb-4 text-white",children:"Do they need a professional camera?"}),e("p",{class:"text-xl text-gray-300 leading-relaxed mb-4",children:e("strong",{class:"text-white",children:"Short answer: Not required, but highly recommended for serious growth."})}),e("p",{class:"text-gray-300 leading-relaxed",children:"Your child can start with a smartphone — many incredible photographers do. But if you want to invest in their creative future and give them full manual control, here's what we recommend:"})]}),e("div",{class:"space-y-8",children:[e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-4 text-teal-500",children:"Ages 7-10: Light & Fun"}),e("p",{class:"text-gray-300 mb-4",children:["At this age, ",e("strong",{class:"text-white",children:"lightweight and compact"})," is key. They need something they can carry, love using, and won't be intimidated by."]}),e("div",{class:"space-y-3",children:[e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"🎯 Best Option: Fujifilm Instax Mini Evo"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"Instant printing + digital saving. Kids LOVE seeing their photos instantly. Budget: $200-250"})]}),e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"📸 Step-Up Option: Sony ZV-1"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"Compact, point-and-shoot style, great for both photo and video. Perfect for learning. Budget: ~$899 (available on StepUp)"})]})]}),e("p",{class:"text-gray-400 text-sm mt-4",children:["💡 ",e("strong",{class:"text-white",children:"Pro Tip:"})," Check ",e("strong",{class:"text-teal-400",children:"StepUp"})," for budget-friendly options on used Sony, Canon, and Fujifilm cameras. Great way to get professional gear at student-friendly prices."]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-4 text-blue-500",children:"Ages 11-14: Serious Growth"}),e("p",{class:"text-gray-300 mb-4",children:["This is the sweet spot for ",e("strong",{class:"text-white",children:"mirrorless cameras"})," — professional quality, lightweight bodies, and room to grow into advanced techniques."]}),e("div",{class:"space-y-3",children:[e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"🏆 Best Option: Sony A6400 + 16-50mm Kit Lens"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"Lightweight, fast autofocus, excellent image quality. Perfect starter pro camera. Budget: $900-1,100 (check StepUp for savings)"})]}),e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"🎬 Budget Option: Fujifilm X-T30 II"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"Compact, retro design kids love, excellent colors straight out of camera. Budget: $800-900 (check StepUp for used)"})]})]}),e("div",{class:"mt-6 mb-4",children:[e("h4",{class:"text-xl font-bold text-white mb-3",children:"Pro Options (For Serious Growth)"}),e("p",{class:"text-gray-300 text-sm mb-4",children:"If your child is ready for professional-level gear, these are the systems we've used and recommend:"})]}),e("div",{class:"space-y-3",children:[e("div",{class:"bg-black/30 p-4 rounded-lg border border-teal-500/30",children:[e("strong",{class:"text-white",children:"💎 Sony A7 IV + 28-70mm Kit Lens (Pro Mirrorless)"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"Full-frame powerhouse. 33MP, incredible autofocus, 10fps burst, 4K 60p video. Perfect balance of photo/video. Lighter than Canon, longer battery life. Budget: $2,500-2,800"})]}),e("div",{class:"bg-black/30 p-4 rounded-lg border border-teal-500/30",children:[e("strong",{class:"text-white",children:"⭐ Sony A7R V + 20mm f/1.8 lens (What We Use!)"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"61MP resolution monster. Incredible sharpness, natural color science, simplified system. Best for portraits, landscapes, studio work. Lightweight mirrorless design. Budget: $3,500-4,000"})]}),e("div",{class:"bg-black/30 p-4 rounded-lg border border-blue-500/30",children:[e("strong",{class:"text-white",children:"📸 Canon EOS R6 Mark II + 24-105mm f/4-7.1 Kit Lens (Pro Canon)"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"24MP full-frame. Canon's flagship mirrorless. Incredible color science, reliable autofocus, works with Canon RF and EF lenses (with adapter). 2 decades of Canon fans love this. Budget: $2,500-2,800"})]}),e("div",{class:"bg-black/30 p-4 rounded-lg border border-blue-500/30",children:[e("strong",{class:"text-white",children:"🔥 Canon 5D Mark IV + 24-105mm f/4L II Kit Lens (Pro DSLR Classic)"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"30MP full-frame DSLR. The workhorse we used for almost a decade. Rugged, reliable, massive lens ecosystem. Heavier than mirrorless but built like a tank. Perfect for learning pro fundamentals. Budget: $2,000-2,500 (check StepUp for savings)"})]})]}),e("p",{class:"text-gray-400 text-sm mt-4",children:["💡 ",e("strong",{class:"text-white",children:"Pro Tip:"})," ",e("strong",{class:"text-teal-400",children:"StepUp"})," is a marketplace for high-quality used camera gear. You can save 20-40% on Sony, Canon, and Fujifilm bodies and lenses. All gear is inspected and rated by condition."]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-4 text-purple-500",children:"Lens Recommendations (For Serious Students)"}),e("p",{class:"text-gray-300 mb-4",children:"If your child is ready to invest in glass, here's what we recommend based on 2 decades of professional experience:"}),e("div",{class:"mb-6",children:[e("h4",{class:"text-lg font-bold text-white mb-3",children:"Sony E-Mount (Our Current System):"}),e("div",{class:"space-y-2",children:[e("div",{class:"bg-black/30 p-3 rounded-lg",children:[e("strong",{class:"text-white",children:"20mm f/1.8 G"}),e("p",{class:"text-gray-400 text-sm",children:"Wide angle for landscapes, architecture, environmental portraits, street photography. Budget: $900"})]}),e("div",{class:"bg-black/30 p-3 rounded-lg",children:[e("strong",{class:"text-white",children:"50mm f/1.8"}),e("p",{class:"text-gray-400 text-sm",children:"The classic everyday lens. Perfect for portraits, street photography, storytelling, and learning fundamentals. Budget: $250"})]}),e("div",{class:"bg-black/30 p-3 rounded-lg",children:[e("strong",{class:"text-white",children:"85mm f/1.8"}),e("p",{class:"text-gray-400 text-sm",children:"Portrait perfection. Beautiful bokeh, flattering compression, isolates subjects beautifully. Budget: $600"})]}),e("div",{class:"bg-black/30 p-3 rounded-lg",children:[e("strong",{class:"text-white",children:"70-200mm f/2.8 GM II"}),e("p",{class:"text-gray-400 text-sm",children:"Versatile telephoto zoom for portraits, sports, wildlife, events, and distant subjects. Budget: $2,600"})]})]})]}),e("div",{children:[e("h4",{class:"text-lg font-bold text-white mb-3",children:"Canon EF Mount (What We Used for a Decade):"}),e("div",{class:"space-y-2",children:[e("div",{class:"bg-black/30 p-3 rounded-lg",children:[e("strong",{class:"text-white",children:"24mm f/1.4L II"}),e("p",{class:"text-gray-400 text-sm",children:"Wide, sharp, perfect for storytelling, landscapes, architecture, and environmental portraits. Budget: $1,500"})]}),e("div",{class:"bg-black/30 p-3 rounded-lg",children:[e("strong",{class:"text-white",children:"50mm f/1.2L"}),e("p",{class:"text-gray-400 text-sm",children:"Dreamy bokeh, low-light champion. Creates beautiful subject separation and artistic portraits. Budget: $1,400"})]}),e("div",{class:"bg-black/30 p-3 rounded-lg",children:[e("strong",{class:"text-white",children:"85mm f/1.2L II (Our Favorite!)"}),e("p",{class:"text-gray-400 text-sm",children:"Magazine-quality portraits. Incredible bokeh, makes people look stunning, perfect for headshots and creative portraits. Budget: $2,000"})]}),e("div",{class:"bg-black/30 p-3 rounded-lg",children:[e("strong",{class:"text-white",children:"100mm f/2.8L IS Macro"}),e("p",{class:"text-gray-400 text-sm",children:"Dual-purpose: stunning portraits and extreme close-up macro photography. Incredible detail and sharpness. Budget: $900"})]}),e("div",{class:"bg-black/30 p-3 rounded-lg",children:[e("strong",{class:"text-white",children:"70-200mm f/2.8L IS II"}),e("p",{class:"text-gray-400 text-sm",children:"Workhorse telephoto zoom. Perfect for portraits, sports, wildlife, events, and any distant subjects. Budget: $2,000"})]})]})]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-4 text-teal-500",children:"Essential Accessories"}),e("div",{class:"space-y-3",children:[e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"🎒 Camera Bag & Lens Protection"}),e("p",{class:"text-gray-400 text-sm mt-1",children:[e("strong",{class:"text-white",children:"Think Tank Photo"})," — Industry standard. TSA-approved, travel-tested for nearly 20 years. Nearly indestructible. ",e("a",{href:"https://prz.io/paQKyvEIO",target:"_blank",class:"text-teal-400 underline",children:"Use our referral link"})," for $15 off. Budget: $100-300"]})]}),e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"💾 SD Cards (Sony Cameras)"}),e("p",{class:"text-gray-400 text-sm mt-1",children:[e("strong",{class:"text-white",children:"Sony SF-G UHS-II V90"})," or ",e("strong",{class:"text-white",children:"SanDisk Extreme Pro UHS-II V90"})," — 128GB or 256GB. Fast read/write speeds for burst shooting and 4K video. Budget: $60-120 each. Always carry at least 2."]})]}),e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"📥 SD Card Reader (For Sony Cameras)"}),e("p",{class:"text-gray-400 text-sm mt-1",children:[e("strong",{class:"text-white",children:"USB-C UHS-II Card Reader"})," — Fast ingesting for editing workflow. ProGrade Digital or SanDisk readers work great. Budget: $30-50"]})]}),e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"🔋 Extra Batteries"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"Always carry at least 2 batteries. Nothing worse than a dead battery mid-shoot. Sony NP-FZ100 for A7 series. Budget: $50-80 each"})]}),e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"🧼 Cleaning Kit"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"Microfiber cloths, lens pen, air blower. Keep gear pristine. Budget: $20-40"})]})]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-4 text-blue-500",children:"Bonus: Drones (For Advanced Students)"}),e("p",{class:"text-gray-300 mb-4",children:["Once your child masters ground-level photography, ",e("strong",{class:"text-white",children:"aerial perspective"})," opens up a whole new world."]}),e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"🚁 DJI Mini 4 Pro"}),e("p",{class:"text-gray-400 text-sm mt-1",children:"Lightweight, under 249g (no FAA registration needed), 4K video, incredible stabilization. Budget: $750-900"})]})]})]})]}),e("div",{class:"mb-16",children:[e("h2",{class:"text-4xl font-black mb-8 text-purple-500",children:"Manual Mode Mastery"}),e("div",{class:"bg-gradient-to-br from-purple-900/20 to-teal-900/20 p-8 rounded-2xl border border-purple-800/30 mb-6",children:[e("h3",{class:"text-2xl font-bold mb-4 text-white",children:"Why Manual Mode Matters"}),e("p",{class:"text-gray-300 leading-relaxed mb-4",children:[e("strong",{class:"text-white",children:"Manual mode gives your child complete creative control."})," Instead of the camera guessing, they decide how the photo looks — the depth of field, the motion blur, the brightness, the mood."]}),e("p",{class:"text-gray-300 leading-relaxed",children:["We teach them to master the ",e("strong",{class:"text-teal-400",children:"Exposure Triangle"}),": Aperture (controls depth), Shutter Speed (controls motion), and ISO (controls light sensitivity). Once they understand how these three work together, they can shoot anything, anywhere, in any light."]})]}),e("div",{class:"grid md:grid-cols-3 gap-6",children:[e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h4",{class:"text-xl font-bold mb-3 text-teal-500",children:"Aperture (f-stop)"}),e("p",{class:"text-gray-400 text-sm",children:["Controls ",e("strong",{class:"text-white",children:"depth of field"}),". Wide open (f/1.8) = blurry background (portraits). Closed down (f/16) = everything sharp (landscapes)."]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h4",{class:"text-xl font-bold mb-3 text-blue-500",children:"Shutter Speed"}),e("p",{class:"text-gray-400 text-sm",children:["Controls ",e("strong",{class:"text-white",children:"motion"}),". Fast (1/1000s) = freeze action. Slow (1/30s) = motion blur (waterfalls, light trails)."]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h4",{class:"text-xl font-bold mb-3 text-purple-500",children:"ISO"}),e("p",{class:"text-gray-400 text-sm",children:["Controls ",e("strong",{class:"text-white",children:"sensitivity to light"}),". Low (100-400) = clean, sharp. High (1600+) = grainy but bright in darkness."]})]})]})]}),e("div",{class:"mb-16",children:[e("h2",{class:"text-4xl font-black mb-8 text-teal-500",children:"Budget Guide"}),e("div",{class:"grid md:grid-cols-3 gap-6",children:[e("div",{class:"bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"Starter Budget"}),e("p",{class:"text-4xl font-black text-teal-500 mb-4",children:"$0-300"}),e("ul",{class:"space-y-2 text-gray-300 text-sm",children:[e("li",{children:"✅ Smartphone camera (free!)"}),e("li",{children:"✅ Fujifilm Instax Mini ($200)"}),e("li",{children:"✅ Basic accessories ($50-100)"})]})]}),e("div",{class:"bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-xl border border-blue-700",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"Growth Budget"}),e("p",{class:"text-4xl font-black text-blue-400 mb-4",children:"$800-1,500"}),e("ul",{class:"space-y-2 text-gray-300 text-sm",children:[e("li",{children:"✅ Sony A6400 or Fujifilm X-T30 ($900)"}),e("li",{children:"✅ Kit lens + 50mm f/1.8 ($400)"}),e("li",{children:"✅ Bag, cards, batteries ($200)"})]})]}),e("div",{class:"bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-xl border border-purple-700",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"Pro Budget"}),e("p",{class:"text-4xl font-black text-purple-400 mb-4",children:"$3,000+"}),e("ul",{class:"space-y-2 text-gray-300 text-sm",children:[e("li",{children:"✅ Sony A7R V or Canon R6 ($3,500)"}),e("li",{children:"✅ Prime lenses 20mm, 50mm, 85mm ($2,000)"}),e("li",{children:"✅ Drone, lighting, accessories ($1,500)"})]})]})]}),e("div",{class:"mt-8 bg-gradient-to-r from-teal-900/30 to-blue-900/30 p-6 rounded-xl border border-teal-800/30",children:e("p",{class:"text-lg text-gray-300 leading-relaxed",children:[e("strong",{class:"text-white",children:"Remember:"})," Gear doesn't make the photographer. ",e("strong",{class:"text-teal-400",children:"Vision, composition, and light"})," make the photographer. A $200 camera in skilled hands beats a $5,000 camera in unskilled hands every time. We'll teach them the skills — you choose the tool that fits your budget."]})})]}),e("div",{class:"mb-16",children:[e("h2",{class:"text-4xl font-black mb-8 text-blue-500",children:"Software & Editing Tools"}),e("div",{class:"space-y-6",children:[e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"Adobe Student Photography Bundle (Required)"}),e("p",{class:"text-gray-300 leading-relaxed mb-3",children:[e("strong",{class:"text-white",children:"The industry standard for photo editing."})," We teach Lightroom basics in ",e("strong",{class:"text-teal-400",children:"October: Photo Editing Mastery"}),". It's how we bring colors to life, enhance natural beauty, and create that magazine-ready look."]}),e("p",{class:"text-gray-300 mb-3",children:["Includes ",e("strong",{class:"text-white",children:"Lightroom"})," + ",e("strong",{class:"text-white",children:"Lightroom Classic"})," + ",e("strong",{class:"text-white",children:"Photoshop"})," + 20GB cloud storage."]}),e("p",{class:"text-gray-400 text-sm",children:["Budget: ",e("strong",{class:"text-white",children:"~$19.99/month"})," with student discount | Check Adobe's website for current student pricing"]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"Photoshop Bundle (Optional — For Curious Students)"}),e("p",{class:"text-gray-300 leading-relaxed",children:[e("strong",{class:"text-white",children:"Not required."})," Lightroom covers 95% of post-production needs. But if your child wants to explore advanced compositing, graphic design, or creative effects, Photoshop is included in the Photography Bundle."]}),e("p",{class:"text-gray-400 text-sm mt-2",children:"Most professional photographers edit 100% in Lightroom. Photoshop is for advanced creative exploration."})]})]})]}),e("div",{class:"mb-24",children:[e("h2",{class:"text-4xl font-black mb-8 text-purple-500",children:"Computer Requirements for Editing"}),e("div",{class:"space-y-6",children:[e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"Mac (Highly Recommended)"}),e("p",{class:"text-gray-300 leading-relaxed mb-4",children:[e("strong",{class:"text-white",children:"Best editing experience on a Mac."})," Ideally on the new ",e("strong",{class:"text-teal-400",children:"Apple M1-M5 chips"})," for blazing-fast performance and energy efficiency."]}),e("p",{class:"text-teal-400 text-sm mb-4",children:["💡 ",e("strong",{class:"text-white",children:"Pro Tip:"})," Use ",e("strong",{class:"text-teal-400",children:"Apple Education Store"})," to get education discounts on Macs. Significant savings for students and educators!"]}),e("div",{class:"bg-black/30 p-4 rounded-lg mb-4",children:[e("strong",{class:"text-white",children:"💻 Minimum Specs (Starting Students)"}),e("ul",{class:"text-gray-400 text-sm mt-2 space-y-1 ml-4 list-disc",children:[e("li",{children:[e("strong",{class:"text-white",children:"16GB RAM"})," — Minimum for smooth Lightroom performance"]}),e("li",{children:[e("strong",{class:"text-white",children:"256GB SSD"})," — Enough for OS + apps + moderate photo library"]}),e("li",{children:[e("strong",{class:"text-white",children:"M1 chip or newer"})," — Fast, efficient, future-proof"]})]}),e("p",{class:"text-gray-400 text-sm mt-3",children:["Options: ",e("strong",{class:"text-white",children:"MacBook Air M1/M2"})," (portable, lightweight) or ",e("strong",{class:"text-white",children:'iMac 24" M1/M3'})," (larger screen, perfect for home editing)"]}),e("p",{class:"text-gray-400 text-sm mt-2",children:["Budget: ",e("strong",{class:"text-white",children:"$800-1,200"})," (check Apple Education Store for discounts)"]})]}),e("div",{class:"bg-black/30 p-4 rounded-lg mb-4",children:[e("strong",{class:"text-white",children:"🚀 Ideal Specs (Growing Photographers) — THE POWERHOUSE"}),e("ul",{class:"text-gray-400 text-sm mt-2 space-y-1 ml-4 list-disc",children:[e("li",{children:[e("strong",{class:"text-white",children:"32GB RAM"})," — Ideal for multitasking, large photo libraries, and advanced editing"]}),e("li",{children:[e("strong",{class:"text-white",children:"512GB-1TB SSD"})," — Room for growing photo library + video projects"]}),e("li",{children:[e("strong",{class:"text-white",children:"M3/M4 chip"})," — Faster rendering, smoother multitasking"]})]}),e("p",{class:"text-gray-400 text-sm mt-3",children:[e("strong",{class:"text-white",children:'Best Option: MacBook Pro 14" M3/M4 with 32GB RAM'}),' — Less expensive than 16" model, incredibly powerful, perfect balance of portability and performance. This is a true powerhouse for serious photographers.']}),e("p",{class:"text-gray-400 text-sm mt-2",children:["Alternative: ",e("strong",{class:"text-white",children:'iMac 24" M3 with 32GB RAM'})," — Gorgeous 4.5K Retina display, all-in-one setup, perfect for dedicated editing station at home."]}),e("p",{class:"text-gray-400 text-sm mt-2",children:["Budget: ",e("strong",{class:"text-white",children:"$1,800-2,500"})," (check Apple Education Store for discounts)"]})]}),e("div",{class:"bg-black/30 p-4 rounded-lg",children:[e("strong",{class:"text-white",children:"⚡ Professional Setup (What Italo Uses)"}),e("ul",{class:"text-gray-400 text-sm mt-2 space-y-1 ml-4 list-disc",children:[e("li",{children:e("strong",{class:"text-white",children:'MacBook Pro 16" M1 Pro'})}),e("li",{children:[e("strong",{class:"text-white",children:"64GB RAM"})," — Runs multiple apps simultaneously with zero lag"]}),e("li",{children:[e("strong",{class:"text-white",children:"1TB SSD"})," — Fast storage for large photo/video libraries"]})]}),e("p",{class:"text-gray-400 text-sm mt-3",children:[e("em",{children:`"I edit with speed and have multiple applications open at once. This is professional-level, not required for starting students—but shows what's possible."`})," — Italo"]}),e("p",{class:"text-gray-400 text-sm mt-2",children:["Budget: ",e("strong",{class:"text-white",children:"$3,000-4,500"}),' (MacBook Pro 16" M1 Pro/Max/Ultra with 64GB RAM)']})]})]}),e("div",{class:"bg-gray-900/50 p-6 rounded-xl border border-gray-800",children:[e("h3",{class:"text-2xl font-bold mb-3 text-white",children:"PC/Windows (Alternative)"}),e("p",{class:"text-gray-300 leading-relaxed mb-3",children:[e("strong",{class:"text-white",children:"PCs work fine for Lightroom,"})," but Macs offer better color accuracy, battery life, and creative workflow optimization."]}),e("p",{class:"text-gray-400 text-sm",children:["Minimum: ",e("strong",{class:"text-white",children:"16GB RAM, Intel i5/AMD Ryzen 5 or better, 256GB SSD"})," | Budget: $700-1,200"]})]})]})]})]})}),e("section",{class:"py-32 bg-gradient-to-b from-black via-gray-900 to-black text-center",children:e("div",{class:"max-w-4xl mx-auto px-6 lg:px-8",children:[e("h2",{class:"text-5xl md:text-6xl font-black mb-6",children:"Ready to Start Their Journey?"}),e("p",{class:"text-2xl text-gray-300 mb-12 max-w-2xl mx-auto",children:"Questions answered. Gear researched. Time to enroll."}),e("div",{class:"flex flex-col sm:flex-row gap-4 justify-center",children:[e("a",{href:"/pricing",class:"btn-primary px-10 py-5 rounded-full text-lg font-bold inline-block",style:"background: #4794A6;",children:"Enroll Now"}),e("a",{href:"/academy",class:"px-10 py-5 rounded-full text-lg font-bold border-2 border-white/20 hover:border-teal-500/50 transition inline-block",children:"View Curriculum"})]})]})}),e("div",{dangerouslySetInnerHTML:{__html:Pt}}),e("div",{id:"enrollment-modal",class:"fixed inset-0 bg-black/95 z-[100] hidden flex items-center justify-center p-4",children:e("div",{class:"max-w-2xl w-full",children:[e("div",{class:"mb-8",children:[e("div",{class:"flex justify-between mb-2 text-sm text-gray-400",children:[e("span",{id:"step-label",children:"Step 1 of 3"}),e("span",{id:"step-percentage",children:"33%"})]}),e("div",{class:"h-2 bg-gray-800 rounded-full overflow-hidden",children:e("div",{id:"progress-bar",class:"h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-500",style:"width: 33%"})})]}),e("div",{id:"step-1",class:"step-content",children:[e("h2",{class:"text-5xl font-black mb-4",children:"Create Your Free Account"}),e("p",{class:"text-xl text-gray-400 mb-8",children:"Get started in seconds - no credit card required"}),e("div",{class:"space-y-6",children:[e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"Parent Email"}),e("input",{type:"email",id:"parent-email",placeholder:"your@email.com",class:"w-full px-6 py-4 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-teal-500 focus:outline-none text-lg"})]}),e("div",{children:[e("label",{class:"block text-sm font-medium mb-2",children:"Create Password"}),e("input",{type:"password",id:"parent-password",placeholder:"Min 8 characters",class:"w-full px-6 py-4 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-teal-500 focus:outline-none text-lg"}),e("p",{class:"text-xs text-gray-500 mt-2",children:"Minimum 8 characters (letters, numbers, or symbols)"})]}),e("button",{onclick:"goToStep(2)",class:"btn-primary w-full px-8 py-5 rounded-full text-xl font-bold",style:"background: #4794A6;",children:"Continue →"})]}),e("div",{class:"mt-8 pt-8 border-t border-white/10",children:[e("div",{class:"flex items-center justify-center gap-3 text-sm text-gray-400",children:[e("svg",{class:"w-5 h-5 text-green-500",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("span",{class:"font-medium",children:"256-bit SSL Encryption"}),e("span",{class:"text-gray-600",children:"•"}),e("span",{children:"Your data is secure"})]}),e("p",{class:"text-center text-xs text-gray-500 mt-2",children:"We use industry-standard encryption (AES-256) and secure password hashing (bcrypt) to protect your information."})]})]}),e("div",{id:"step-2",class:"step-content hidden",children:[e("button",{onclick:"goToStep(1)",class:"text-gray-400 hover:text-white mb-3 flex items-center gap-2 text-sm",children:"← Back"}),e("h2",{class:"text-3xl font-black mb-2",children:"How Many Students?"}),e("p",{class:"text-base text-gray-400 mb-4",children:"Select the package that fits your family"}),e("div",{class:"flex items-center justify-center gap-3 mb-4 bg-gray-900 p-2 rounded-full inline-flex mx-auto",children:[e("button",{id:"monthly-toggle-btn",onclick:"toggleBilling('monthly')",class:"px-4 py-2 rounded-full font-semibold transition bg-teal-500 text-white text-sm",children:"Monthly"}),e("button",{id:"annual-toggle-btn",onclick:"toggleBilling('annual')",class:"px-4 py-2 rounded-full font-semibold transition text-gray-400 text-sm",children:["Annual ",e("span",{class:"text-teal-500 text-xs ml-1",children:"Save 20%"})]})]}),e("p",{class:"text-center text-xs text-gray-400 mb-4",children:[e("span",{class:"annual-note hidden",children:"Annual: 10 months (Sept-June). December: 2 special workshops!"}),e("span",{class:"monthly-note",children:"Billed monthly. Cancel anytime."})]}),e("div",{class:"grid grid-cols-2 gap-3 mb-4",children:[e("div",{class:"package-option feature-card p-4 rounded-xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative",onclick:"selectPackage(1)",children:[e("div",{class:"text-3xl font-black mb-1",children:"1"}),e("div",{class:"text-gray-400 text-xs mb-2",children:"Student"}),e("div",{class:"text-xl font-bold",children:[e("span",{class:"monthly-price",children:"$116"}),e("span",{class:"annual-price hidden",children:"$93"}),e("span",{class:"text-xs text-gray-500",children:"/mo"})]}),e("div",{class:"annual-savings text-teal-500 text-xs mt-1 hidden",children:"Save $230"}),e("div",{class:"text-xs text-gray-500 mt-2 monthly-per-class",children:"$14.50 per class"}),e("div",{class:"text-xs text-gray-500 mt-2 annual-per-class hidden",children:"$11.63 per class"})]}),e("div",{class:"package-option feature-card p-4 rounded-xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition ring-2 ring-teal-500 relative",onclick:"selectPackage(2)",children:[e("div",{class:"absolute -top-2 left-1/2 -translate-x-1/2 bg-teal-500 px-2 py-0.5 rounded-full text-xs font-bold",children:"Most Popular"}),e("div",{class:"text-3xl font-black mb-1",children:"2"}),e("div",{class:"text-gray-400 text-xs mb-2",children:"Students"}),e("div",{class:"text-xl font-bold",children:[e("span",{class:"monthly-price",children:"$99"}),e("span",{class:"annual-price hidden",children:"$79"}),e("span",{class:"text-xs text-gray-500",children:"/mo each"})]}),e("div",{class:"annual-savings text-teal-500 text-xs mt-1 hidden",children:"Save $400"}),e("div",{class:"text-xs text-gray-500 mt-2 monthly-per-class",children:"$12.38 per class (each)"}),e("div",{class:"text-xs text-gray-500 mt-2 annual-per-class hidden",children:"$9.88 per class (each)"})]}),e("div",{class:"package-option feature-card p-4 rounded-xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative",onclick:"selectPackage(3)",children:[e("div",{class:"text-3xl font-black mb-1",children:"3"}),e("div",{class:"text-gray-400 text-xs mb-2",children:"Students"}),e("div",{class:"text-xl font-bold",children:[e("span",{class:"monthly-price",children:"$89"}),e("span",{class:"annual-price hidden",children:"$71"}),e("span",{class:"text-xs text-gray-500",children:"/mo each"})]}),e("div",{class:"annual-savings text-teal-500 text-xs mt-1 hidden",children:"Save $540"}),e("div",{class:"text-xs text-gray-500 mt-2 monthly-per-class",children:"$11.13 per class (each)"}),e("div",{class:"text-xs text-gray-500 mt-2 annual-per-class hidden",children:"$8.88 per class (each)"})]}),e("div",{class:"package-option feature-card p-4 rounded-xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative",onclick:"selectPackage(4)",children:[e("div",{class:"text-3xl font-black mb-1",children:"4+"}),e("div",{class:"text-gray-400 text-xs mb-2",children:"Students"}),e("div",{class:"text-xl font-bold",children:[e("span",{class:"monthly-price",children:"$79"}),e("span",{class:"annual-price hidden",children:"$63"}),e("span",{class:"text-xs text-gray-500",children:"/mo each"})]}),e("div",{class:"annual-savings text-teal-500 text-xs mt-1 hidden",children:"Save $640"}),e("div",{class:"text-xs text-gray-500 mt-2 monthly-per-class",children:"$9.88 per class (each)"}),e("div",{class:"text-xs text-gray-500 mt-2 annual-per-class hidden",children:"$7.88 per class (each)"})]})]}),e("div",{class:"feature-card p-4 rounded-xl mt-4",children:[e("h3",{class:"text-base font-bold mb-3 text-center",children:"Everything Included"}),e("div",{class:"grid grid-cols-1 gap-2 text-xs",children:[e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"30-Minute Micro-Learning Sessions"}),e("div",{class:"text-gray-400 text-xs",children:"Perfect for young creators' attention spans - 8 live classes/month (Mon & Thu 11:30 AM ET)"})]})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"Lifetime Instruction Library"}),e("div",{class:"text-gray-400 text-xs",children:"Can't make it live? Catch up on expert-led teachings anytime."})]})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"December Bonus Workshops"}),e("div",{class:"text-gray-400 text-xs",children:"First 2 weeks of December: Special 1-hour fun workshops to celebrate the year!"})]})]}),e("div",{class:"flex items-start gap-3",children:[e("svg",{class:"w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"})}),e("div",{children:[e("div",{class:"font-semibold text-white",children:"Portfolio Building"}),e("div",{class:"text-gray-400 text-xs",children:"Showcase your child's work and track their creative journey"})]})]})]})]})]}),e("div",{id:"step-3",class:"step-content hidden",children:[e("button",{onclick:"goToStep(2)",class:"text-gray-400 hover:text-white mb-4 flex items-center gap-2",children:"← Back"}),e("h2",{class:"text-5xl font-black mb-4",children:"Complete Enrollment"}),e("p",{class:"text-xl text-gray-400 mb-8",children:["You selected ",e("span",{id:"selected-package",class:"text-teal-500"})]}),e("div",{class:"feature-card p-6 rounded-2xl mb-6",children:[e("div",{class:"flex justify-between mb-4",children:[e("span",{class:"text-gray-400",children:"Students"}),e("span",{id:"summary-students",class:"font-bold"})]}),e("div",{class:"flex justify-between mb-4",children:[e("span",{class:"text-gray-400",children:"Price per student"}),e("span",{id:"summary-price",class:"font-bold"})]}),e("div",{class:"flex justify-between pt-4 border-t border-white/10",children:[e("span",{id:"summary-label",class:"text-xl font-bold",children:"Total Today (Prorated)"}),e("span",{id:"summary-total",class:"text-xl font-bold text-teal-500"})]}),e("div",{id:"savings-display",class:"flex justify-between mt-2 hidden",children:[e("span",{class:"text-sm text-gray-400",children:"Annual Savings"}),e("span",{id:"summary-savings",class:"text-sm font-bold text-green-500"})]}),e("p",{id:"proration-note",class:"text-xs text-gray-500 mt-2",children:"*First month prorated based on days remaining"})]}),e("div",{class:"space-y-4 mb-6",children:e("div",{class:"bg-gray-900 border-2 border-gray-800 rounded-xl p-6",children:e("p",{class:"text-sm text-gray-400",children:"Stripe payment form will appear here"})})}),e("button",{onclick:"completeEnrollment()",class:"btn-primary w-full px-8 py-5 rounded-full text-xl font-bold",style:"background: #4794A6;",children:"Complete Enrollment 🎉"})]}),e("button",{onclick:"closeEnrollment()",class:"absolute top-8 right-8 text-gray-400 hover:text-white text-4xl",children:"×"})]})}),e("script",{dangerouslySetInnerHTML:{__html:`
        let currentStep = 1;
        let selectedStudents = 0;
        let selectedPrice = 0;
        let isAnnual = false;
        
        const pricingData = {
          monthly: { 1: 116, 2: 99, 3: 89, 4: 79 },
          annual: { 1: 93, 2: 79, 3: 71, 4: 63 }
        };

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
        }

        function selectPackage(students) {
          selectedStudents = students;
          selectedPrice = isAnnual ? pricingData.annual[students] : pricingData.monthly[students];
          
          // Calculate totals
          const pricePerStudent = selectedPrice;
          const monthlyTotal = pricePerStudent * students;
          
          let totalCharge, chargeLabel;
          
          if (isAnnual) {
            // Annual: 10 months prepaid (school year, no summer)
            totalCharge = monthlyTotal * 10;
            chargeLabel = 'Total (10 months prepaid)';
          } else {
            // Monthly: prorated for first month
            const today = new Date();
            const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
            const daysRemaining = daysInMonth - today.getDate() + 1;
            totalCharge = (monthlyTotal / daysInMonth) * daysRemaining;
            chargeLabel = 'Total Today (Prorated)';
          }
          
          // Calculate savings for display (Annual vs Monthly)
          const yearlySavings = isAnnual ? 
            ((pricingData.monthly[students] * students * 10) - (pricePerStudent * students * 10)) : 0;
          
          // Update summary
          const billingText = isAnnual ? ' (Annual - 10 months)' : ' (Monthly)';
          document.getElementById('selected-package').textContent = 
            students + (students >= 4 ? '+' : '') + ' student' + (students > 1 ? 's' : '') + billingText;
          document.getElementById('summary-students').textContent = students + (students >= 4 ? '+' : '');
          document.getElementById('summary-price').textContent = '$' + pricePerStudent + '/mo per student' + (isAnnual ? ' (20% off)' : '');
          document.getElementById('summary-total').textContent = '$' + totalCharge.toFixed(2);
          
          // Update the label and savings display
          document.getElementById('summary-label').textContent = chargeLabel;
          
          if (isAnnual) {
            document.getElementById('savings-display').classList.remove('hidden');
            document.getElementById('summary-savings').textContent = '-$' + yearlySavings.toFixed(2);
            document.getElementById('proration-note').classList.add('hidden');
          } else {
            document.getElementById('savings-display').classList.add('hidden');
            document.getElementById('proration-note').classList.remove('hidden');
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
          
          const billingType = isAnnual ? 'Annual (10 months prepaid - school year)' : 'Monthly';
          const pricePerStudent = selectedPrice;
          const monthlyTotal = pricePerStudent * selectedStudents;
          const totalCharge = isAnnual ? monthlyTotal * 10 : monthlyTotal;
          
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
      `}})]}),{title:"FAQ - Everything You Need to Know | Acromatico"}));k.get("/curriculum",t=>t.redirect("/static/curriculum.html"));const rl=new Rs,hf=Object.assign({"/src/index.tsx":k});let fd=!1;for(const[,t]of Object.entries(hf))t&&(rl.all("*",r=>{let n;try{n=r.executionCtx}catch{}return t.fetch(r.req.raw,r.env,n)}),rl.notFound(r=>{let n;try{n=r.executionCtx}catch{}return t.fetch(r.req.raw,r.env,n)}),fd=!0);if(!fd)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");const _s=[{id:"mod-jan",quarter:1,month_number:1,month_name:"January",title:"Visual Foundations",subtitle:"Learning to See Like a Pro",description:"Transform from snapshot-taker to visual storyteller. Master the Rule of Thirds, leading lines, and perspective magic.",emoji:"📷",theme_color:"#4794A6",adventure_title:"My World, My Way",adventure_desc:"Create a stunning portfolio showcasing your unique perspective.",image_url:"/static/images/curriculum/january-vintage-camera.jpg",sort_order:1},{id:"mod-feb",quarter:1,month_number:2,month_name:"February",title:"Light Mastery",subtitle:"Becoming a Light Hunter",description:"Transform into a light detective who understands how illumination creates mood and drama.",emoji:"💡",theme_color:"#FFD700",adventure_title:"Chasing Light",adventure_desc:"Build an epic collection showing your mastery of different lighting conditions.",image_url:"/static/images/curriculum/february-beach-boardwalk.jpg",sort_order:2},{id:"mod-mar",quarter:1,month_number:3,month_name:"March",title:"Story Foundations",subtitle:"Every Image Tells a Tale",description:"Learn how the best photographers use sequences, emotion, and timing to craft visual narratives that resonate.",emoji:"📖",theme_color:"#9333EA",adventure_title:"My Epic Story",adventure_desc:"Create a multi-part photo series that takes viewers on an unforgettable journey.",image_url:"/static/images/curriculum/march-mountain-photographer.jpg",sort_order:3},{id:"mod-apr",quarter:2,month_number:4,month_name:"April",title:"Portrait Power",subtitle:"Capturing People & Personality",description:"Discover how to photograph people in authentic, compelling ways that reveal character and emotion.",emoji:"👤",theme_color:"#EC4899",adventure_title:"Faces & Stories",adventure_desc:"Build a portrait collection that celebrates the people in your world.",image_url:"/static/images/curriculum/april-mom-child-beach.jpg",sort_order:4},{id:"mod-may",quarter:2,month_number:5,month_name:"May",title:"Urban Exploration",subtitle:"City as Canvas",description:"Transform urban environments into visual playgrounds. Learn architecture, street scenes, and cityscape secrets.",emoji:"🏙️",theme_color:"#14B8A6",adventure_title:"Concrete Jungle",adventure_desc:"Create a stunning urban portfolio that reveals the hidden beauty of city life.",image_url:"/static/images/curriculum/may-chicago-skyline.jpg",sort_order:5},{id:"mod-jun",quarter:2,month_number:6,month_name:"June",title:"Nature Immersion",subtitle:"Wild World Photography",description:"Venture into natural environments to capture landscapes, wildlife, and the raw beauty of the outdoors.",emoji:"🌲",theme_color:"#22C55E",adventure_title:"Into the Wild",adventure_desc:"Build a nature portfolio showcasing the incredible diversity of the natural world.",image_url:null,sort_order:6},{id:"mod-jul",quarter:3,month_number:7,month_name:"July",title:"Action & Motion",subtitle:"Freezing the Moment",description:"Master the art of capturing movement—sports, dance, action scenes that tell dynamic visual stories.",emoji:"⚡",theme_color:"#F59E0B",adventure_title:"Motion Magic",adventure_desc:"Create an action portfolio that captures energy, speed, and the thrill of movement.",image_url:null,sort_order:7},{id:"mod-aug",quarter:3,month_number:8,month_name:"August",title:"Color Theory",subtitle:"Mastering Visual Harmony",description:"Dive deep into how color creates mood, emotion, and impact in visual storytelling.",emoji:"🎨",theme_color:"#8B5CF6",adventure_title:"Color Symphony",adventure_desc:"Build a vibrant portfolio demonstrating your command of color relationships and visual impact.",image_url:null,sort_order:8},{id:"mod-sep",quarter:3,month_number:9,month_name:"September",title:"Advanced Composition",subtitle:"Breaking the Rules",description:"Level up with advanced framing techniques, creative angles, and experimental approaches to visual design.",emoji:"🎬",theme_color:"#6366F1",adventure_title:"Visual Rebel",adventure_desc:"Create a portfolio that showcases your unique compositional voice and creative vision.",image_url:null,sort_order:9},{id:"mod-oct",quarter:4,month_number:10,month_name:"October",title:"Video Storytelling",subtitle:"From Stills to Motion",description:"Transition into video creation with editing, sequencing, and cinematic storytelling techniques.",emoji:"🎥",theme_color:"#EF4444",adventure_title:"Motion Pictures",adventure_desc:"Create your first short film showcasing your unique visual storytelling abilities.",image_url:"/static/images/curriculum/october-video-editing.jpg",sort_order:10},{id:"mod-nov",quarter:4,month_number:11,month_name:"November",title:"Portfolio Building",subtitle:"Showcasing Your Best Work",description:"Learn how to curate, edit, and present your work like a professional creator.",emoji:"📸",theme_color:"#10B981",adventure_title:"My Signature Collection",adventure_desc:"Build a professional portfolio that opens doors and showcases your creative journey.",image_url:"/static/images/curriculum/november-portfolio-dashboard.jpg",sort_order:11},{id:"mod-dec",quarter:4,month_number:12,month_name:"December",title:"Creator Summit",subtitle:"Your Signature Project",description:"Culminate your year with a major creative project that showcases everything you've learned.",emoji:"🏆",theme_color:"#3B82F6",adventure_title:"The Final Masterpiece",adventure_desc:"Create your ultimate visual project—your signature statement as a young creator.",image_url:null,sort_order:12}];function yd(t,r){return parseInt(t.split("-")[1].substring(0,2)),[{week_number:1,week_type:"eye",title:"The Eye",subtitle:"Composition & Visual Design",emoji:"👁️"},{week_number:2,week_type:"light",title:"The Light",subtitle:"Timing & Atmosphere",emoji:"💡"},{week_number:3,week_type:"story",title:"The Story",subtitle:"Motion & Narrative",emoji:"📖"},{week_number:4,week_type:"share",title:"The Share",subtitle:"Editing & Presentation",emoji:"🎬"}].map((a,s)=>({id:`week-${t.split("-")[1]}-${a.week_number}`,module_id:t,week_number:a.week_number,week_type:a.week_type,title:a.title,subtitle:a.subtitle,emoji:a.emoji,sort_order:r+s}))}async function uf(t){let r=0,n=0;for(const s of _s)(await t.prepare(`
      INSERT OR IGNORE INTO curriculum_modules 
      (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_title, adventure_desc, image_url, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(s.id,s.quarter,s.month_number,s.month_name,s.title,s.subtitle,s.description,s.emoji,s.theme_color,s.adventure_title,s.adventure_desc,s.image_url,s.sort_order).run()).success&&r++;let a=1;for(const s of _s){const i=yd(s.id,a);for(const o of i)(await t.prepare(`
        INSERT OR IGNORE INTO curriculum_weeks 
        (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(o.id,o.module_id,o.week_number,o.week_type,o.title,o.subtitle,o.emoji,o.sort_order).run()).success&&n++;a+=4}return{modules:r,weeks:n}}const pf=Object.freeze(Object.defineProperty({__proto__:null,CURRICULUM_MODULES:_s,generateWeeks:yd,seedCurriculum:uf},Symbol.toStringTag,{value:"Module"}));function mf(t){let r=0;for(let n=0;n<t.length;n++){const a=t.charCodeAt(n);r=(r<<5)-r+a,r=r&r}return r.toString(36)}const vd=[{email:"italo@acromatico.com",password:"admin123",firstName:"Italo",lastName:"Campilii",role:"admin"}];async function gf(t){let r=0;for(const n of vd){if(await t.prepare("SELECT id FROM users WHERE email = ?").bind(n.email).first()){console.log(`User ${n.email} already exists, skipping...`);continue}const s=mf(n.password),i=crypto.randomUUID().replace(/-/g,"");(await t.prepare(`
      INSERT INTO users (id, email, password_hash, first_name, last_name, role, created_at)
      VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(i,n.email,s,n.firstName,n.lastName,n.role).run()).success&&(r++,console.log(`✅ Created admin user: ${n.email}`))}return{users:r}}const ff=Object.freeze(Object.defineProperty({__proto__:null,DEFAULT_ADMIN_USERS:vd,seedAdminUsers:gf},Symbol.toStringTag,{value:"Module"}));async function yf(t){return(await t.prepare(`
    SELECT 
      m.*,
      COUNT(w.id) as week_count
    FROM curriculum_modules m
    LEFT JOIN curriculum_weeks w ON m.id = w.module_id
    GROUP BY m.id
    ORDER BY m.sort_order
  `).all()).results}async function vf(t,r){const n=await t.prepare(`
    SELECT * FROM curriculum_modules WHERE id = ?
  `).bind(r).first();if(!n)throw new Error("Module not found");const a=await t.prepare(`
    SELECT * FROM curriculum_weeks 
    WHERE module_id = ? 
    ORDER BY sort_order
  `).bind(r).all(),s=await t.prepare(`
    SELECT * FROM curriculum_lessons 
    WHERE module_id = ? 
    ORDER BY week_id, sort_order
  `).bind(r).all();return{module:n,weeks:a.results,lessons:s.results}}async function xf(t,r){const n=`lesson-${Date.now()}-${Math.random().toString(36).substr(2,9)}`;return await t.prepare(`
    INSERT INTO curriculum_lessons 
    (id, module_id, week_id, lesson_type, title, duration_min, video_url, pdf_url, thumbnail_url, description, sort_order, upload_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(n,r.module_id,r.week_id,r.lesson_type,r.title,r.duration_min,r.video_url,r.pdf_url,r.thumbnail_url,r.description,r.sort_order,r.upload_status).run(),n}async function bf(t,r,n){const a=[],s=[];if(n.title!==void 0&&(a.push("title = ?"),s.push(n.title)),n.video_url!==void 0&&(a.push("video_url = ?"),s.push(n.video_url)),n.pdf_url!==void 0&&(a.push("pdf_url = ?"),s.push(n.pdf_url)),n.thumbnail_url!==void 0&&(a.push("thumbnail_url = ?"),s.push(n.thumbnail_url)),n.description!==void 0&&(a.push("description = ?"),s.push(n.description)),n.duration_min!==void 0&&(a.push("duration_min = ?"),s.push(n.duration_min)),n.upload_status!==void 0&&(a.push("upload_status = ?"),s.push(n.upload_status)),a.length===0)throw new Error("No fields to update");s.push(r),await t.prepare(`
    UPDATE curriculum_lessons 
    SET ${a.join(", ")}
    WHERE id = ?
  `).bind(...s).run()}async function wf(t,r){await t.prepare(`
    DELETE FROM curriculum_lessons WHERE id = ?
  `).bind(r).run()}async function Ef(t){return await t.prepare(`
    SELECT 
      COUNT(DISTINCT m.id) as total_modules,
      COUNT(DISTINCT w.id) as total_weeks,
      COUNT(l.id) as total_lessons,
      SUM(CASE WHEN l.upload_status = 'uploaded' THEN 1 ELSE 0 END) as uploaded_lessons,
      SUM(CASE WHEN l.upload_status = 'awaiting' THEN 1 ELSE 0 END) as awaiting_lessons
    FROM curriculum_modules m
    LEFT JOIN curriculum_weeks w ON m.id = w.module_id
    LEFT JOIN curriculum_lessons l ON m.id = l.module_id
  `).first()}const sr=Object.freeze(Object.defineProperty({__proto__:null,createLessonPlaceholder:xf,deleteLesson:wf,getAllModules:yf,getCurriculumStats:Ef,getModuleDetail:vf,updateLesson:bf},Symbol.toStringTag,{value:"Module"}));export{rl as default};
