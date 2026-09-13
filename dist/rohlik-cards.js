function t(t,e,r,i){var s,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(n<3?s(o):n>3?s(e,r,o):s(e,r))||o);return n>3&&o&&Object.defineProperty(e,r,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,r=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const r=void 0!==e&&1===e.length;r&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&s.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,r,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[i+1],t[0]);return new n(r,t,i)},a=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,m=globalThis,f=m.trustedTypes,g=f?f.emptyScript:"",v=m.reactiveElementPolyfillSupport,y=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch(t){r=null}}return r}},b=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(t,r,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){const{get:i,set:s}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);s?.call(this,e),this.requestUpdate(t,n,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...h(t),...u(t)];for(const r of e)this.createProperty(r,t[r])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const r=this._$Eu(t,e);void 0!==r&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const t of r)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(r)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const r of i){const i=document.createElement("style"),s=e.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=r.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){const r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(void 0!==i&&!0===r.reflect){const s=(void 0!==r.converter?.toAttribute?r.converter:_).toAttribute(e,r.type);this._$Em=t,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(t,e){const r=this.constructor,i=r._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=r.getPropertyOptions(i),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=i;const n=s.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,r,i=!1,s){if(void 0!==t){const n=this.constructor;if(!1===i&&(s=this[t]),r??=n.getPropertyOptions(t),!((r.hasChanged??b)(s,e)||r.useDefault&&r.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,r))))return;this.C(t,e,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:s},n){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==s||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,r]of t){const{wrapped:t}=r,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,r,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,v?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,k=t=>t,S=$.trustedTypes,A=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+z,I=`<${C}>`,O=document,P=()=>O.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,N="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,U=/>/g,j=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,F=/"/g,L=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...r)=>({_$litType$:t,strings:e,values:r}))(1),q=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),V=new WeakMap,K=O.createTreeWalker(O,129);function W(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}class Q{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let s=0,n=0;const o=t.length-1,a=this.parts,[l,c]=((t,e)=>{const r=t.length-1,i=[];let s,n=2===e?"<svg>":3===e?"<math>":"",o=D;for(let e=0;e<r;e++){const r=t[e];let a,l,c=-1,d=0;for(;d<r.length&&(o.lastIndex=d,l=o.exec(r),null!==l);)d=o.lastIndex,o===D?"!--"===l[1]?o=M:void 0!==l[1]?o=U:void 0!==l[2]?(L.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=j):void 0!==l[3]&&(o=j):o===j?">"===l[0]?(o=s??D,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?j:'"'===l[3]?F:H):o===F||o===H?o=j:o===M||o===U?o=D:(o=j,s=void 0);const h=o===j&&t[e+1].startsWith("/>")?" ":"";n+=o===D?r+I:c>=0?(i.push(a),r.slice(0,c)+E+r.slice(c)+z+h):r+z+(-2===c?e:h)}return[W(t,n+(t[r]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]})(t,e);if(this.el=Q.createElement(l,r),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=K.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(E)){const e=c[n++],r=i.getAttribute(t).split(z),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:o[2],strings:r,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?rt:X}),i.removeAttribute(t)}else t.startsWith(z)&&(a.push({type:6,index:s}),i.removeAttribute(t));if(L.test(i.tagName)){const t=i.textContent.split(z),e=t.length-1;if(e>0){i.textContent=S?S.emptyScript:"";for(let r=0;r<e;r++)i.append(t[r],P()),K.nextNode(),a.push({type:2,index:++s});i.append(t[e],P())}}}else if(8===i.nodeType)if(i.data===C)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=i.data.indexOf(z,t+1));)a.push({type:7,index:s}),t+=z.length-1}s++}}static createElement(t,e){const r=O.createElement("template");return r.innerHTML=t,r}}function Y(t,e,r=t,i){if(e===q)return e;let s=void 0!==i?r._$Co?.[i]:r._$Cl;const n=T(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,r,i)),void 0!==i?(r._$Co??=[])[i]=s:r._$Cl=s),void 0!==s&&(e=Y(t,s._$AS(t,e.values),s,i)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,i=(t?.creationScope??O).importNode(e,!0);K.currentNode=i;let s=K.nextNode(),n=0,o=0,a=r[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new J(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new it(s,this,t)),this._$AV.push(e),a=r[++o]}n!==a?.index&&(s=K.nextNode(),n++)}return K.currentNode=O,i}p(t){let e=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class J{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),T(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Z&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,i="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=Q.createElement(W(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new G(i,this),r=t.u(this.options);t.p(e),this.T(r),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Q(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,i=0;for(const s of t)i===e.length?e.push(r=new J(this.O(P()),this.O(P()),this,this.options)):r=e[i],r._$AI(s),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,s){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Z}_$AI(t,e=this,r,i){const s=this.strings;let n=!1;if(void 0===s)t=Y(this,t,e,0),n=!T(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const i=t;let o,a;for(t=s[0],o=0;o<s.length-1;o++)a=Y(this,i[r+o],e,o),a===q&&(a=this._$AH[o]),n||=!T(a)||a!==this._$AH[o],a===Z?t=Z:t!==Z&&(t+=(a??"")+s[o+1]),this._$AH[o]=a}n&&!i&&this.j(t)}j(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Z?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Z)}}class rt extends X{constructor(t,e,r,i,s){super(t,e,r,i,s),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??Z)===q)return;const r=this._$AH,i=t===Z&&r!==Z||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Z&&(r===Z||i);i&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const st={I:J},nt=$.litHtmlPolyfillSupport;nt?.(Q,J),($.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let at=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,r)=>{const i=r?.renderBefore??e;let s=i._$litPart$;if(void 0===s){const t=r?.renderBefore??null;i._$litPart$=s=new J(e.insertBefore(P(),t),t,void 0,r??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const lt=ot.litElementPolyfillSupport;lt?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct=t=>(e,r)=>{void 0!==r?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:b},ht=(t=dt,e,r)=>{const{kind:i,metadata:s}=r;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(r.name,t),"accessor"===i){const{name:i}=r;return{set(r){const s=e.get.call(this);e.set.call(this,r),this.requestUpdate(i,s,t,!0,r)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=r;return function(r){const s=this[i];e.call(this,r),this.requestUpdate(i,s,t,!0,r)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return(e,r)=>"object"==typeof r?ht(t,e,r):((t,e,r)=>{const i=e.hasOwnProperty(r);return e.constructor.createProperty(r,t),i?Object.getOwnPropertyDescriptor(e,r):void 0})(t,e,r)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return ut({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mt=1,ft=2,gt=t=>(...e)=>({_$litDirective$:t,values:e});let vt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yt=gt(class extends vt{constructor(t){if(super(t),t.type!==mt||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const r=t.element.classList;for(const t of this.st)t in e||(r.remove(t),this.st.delete(t));for(const t in e){const i=!!e[t];i===this.st.has(t)||this.nt?.has(t)||(i?(r.add(t),this.st.add(t)):(r.remove(t),this.st.delete(t)))}return q}}),_t="important",bt=" !"+_t,wt=gt(class extends vt{constructor(t){if(super(t),t.type!==mt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const i=t[r];return null==i?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:r}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?r.removeProperty(t):r[t]=null);for(const t in e){const i=e[t];if(null!=i){this.ft.add(t);const e="string"==typeof i&&i.endsWith(bt);t.includes("-")||e?r.setProperty(t,e?i.slice(0,-11):i,e?_t:""):r[t]=i}}return q}}),xt="rohlikcz";
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function $t(t){const e=new Set;for(const r of Object.values(t.entities??{}))r.platform===xt&&r.device_id&&e.add(r.device_id);const r=[];for(const i of e){const e=t.devices?.[i];e&&r.push(e)}return r}const kt=new Map;function St(t,e){const r=t.entities??{},i=kt.get(e);if(i&&i.entitiesRef===r)return i.map;const s=new Map;for(const t of Object.values(r))t.platform===xt&&t.device_id===e&&t.translation_key&&s.set(t.translation_key,t.entity_id);return kt.set(e,{entitiesRef:r,map:s}),s}function At(t){if(!t||"unknown"===t||"unavailable"===t)return null;const e=new Date(t);return Number.isNaN(e.getTime())?null:e}function Et(t){return t.locale?.language||"en"}function zt(t,e,r="CZK"){const i=Et(t);try{return new Intl.NumberFormat(i,{style:"currency",currency:r,currencyDisplay:"narrowSymbol"}).format(e)}catch{return`${new Intl.NumberFormat(i).format(e)} ${r}`}}function Ct(t,e){return new Intl.DateTimeFormat(Et(t),{hour:"2-digit",minute:"2-digit",hour12:!1}).format(e)}function It(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function Ot(t,e,r){const i=Et(t),s=Ct(t,e),n=new Date;if(It(e,n))return`${r.today} ${s}`;const o=new Date(n);if(o.setDate(n.getDate()+1),It(e,o))return`${r.tomorrow} ${s}`;return`${new Intl.DateTimeFormat(i,{weekday:"short",day:"numeric",month:"short"}).format(e)} ${s}`}const Pt={en:{future:["in ",""],past:[""," ago"]},cs:{future:["za ",""],past:["před ",""]}};function Tt(t,e){const r=t.slice(0,2).toLowerCase();return(Pt[r]??Pt.en)[e]}function Rt(t,e,r){const i=r.replace(/s$/,"");return new Intl.NumberFormat(t,{style:"unit",unit:i,unitDisplay:"short"}).format(e)}function Nt(t,e,r){return`${t}${e}${r}`}function Dt(t,e){const r=Et(t),[i,s]=Tt(r,"past"),n=Math.max(0,Math.round((Date.now()-e.getTime())/1e3)),o=Math.round(n/60);if(n<60)return Nt(i,Rt(r,n,"seconds"),s);if(o<60)return Nt(i,Rt(r,o,"minutes"),s);const a=Math.round(o/60);if(a<24)return Nt(i,Rt(r,a,"hours"),s);return Nt(i,Rt(r,Math.round(a/24),"days"),s)}function Mt(t,e,r,i){const s=(t.locale?.language||"en").slice(0,2).toLowerCase(),n=e[s]?.[r]??e.en?.[r]??r;return i?n.replace(/\{(\w+)\}/g,(t,e)=>Object.prototype.hasOwnProperty.call(i,e)?String(i[e]):t):n}const Ut={cs:{today:"Dnes",tomorrow:"Zítra",updated_ago:"Aktualizováno {time}",refresh:"Obnovit",unavailable:"Nedostupné",error_generic:"Něco se nepovedlo",show_all:"Zobrazit vše ({count})",show_less:"Zobrazit méně",items:"položek",free:"zdarma"},en:{today:"Today",tomorrow:"Tomorrow",updated_ago:"Updated {time}",refresh:"Refresh",unavailable:"Unavailable",error_generic:"Something went wrong",show_all:"Show all ({count})",show_less:"Show less",items:"items",free:"free"}},jt=o`
  :host {
    --rohlik-accent: var(--primary-color);
  }

  ha-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--primary-text-color);
    margin-bottom: 8px;
  }

  .header ha-icon,
  .header ha-svg-icon {
    color: var(--rohlik-accent);
    --mdc-icon-size: 24px;
  }

  .header .title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 10px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 1.6;
    white-space: nowrap;
  }

  .chip.ok {
    color: var(--success-color, #4caf50);
    background: color-mix(in srgb, var(--success-color, #4caf50) 15%, transparent);
  }

  .chip.warn {
    color: var(--warning-color, #ff9800);
    background: color-mix(in srgb, var(--warning-color, #ff9800) 15%, transparent);
  }

  .chip.err {
    color: var(--error-color, #db4437);
    background: color-mix(in srgb, var(--error-color, #db4437) 15%, transparent);
  }

  .chip.neutral {
    color: var(--secondary-text-color);
    background: color-mix(in srgb, var(--secondary-text-color) 15%, transparent);
  }

  .big {
    font-size: 2rem;
    font-weight: 600;
    color: var(--primary-text-color);
    line-height: 1.2;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    border-bottom: 1px solid var(--divider-color);
  }

  .row:last-child {
    border-bottom: none;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 6px 14px;
    border-radius: var(--ha-card-border-radius, 12px);
    border: none;
    background: var(--rohlik-accent);
    color: var(--text-primary-color, #fff);
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .btn.ghost {
    background: transparent;
    color: var(--rohlik-accent);
    border: 1px solid var(--rohlik-accent);
  }

  .footer {
    margin-top: 8px;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .footer.stale {
    color: var(--warning-color, #ff9800);
  }

  .error {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 8px;
    color: var(--error-color, #db4437);
    background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent);
    font-size: 0.85rem;
  }
`;class Ht extends at{constructor(){super(...arguments),this.entities=new Map}setConfig(t){if(!t?.device)throw new Error("Rohlík card: 'device' is required — pick the Rohlík.cz device in the card editor.");this.config=t,this.hass&&(this.entities=St(this.hass,this.config.device))}willUpdate(t){t.has("hass")&&this.hass&&this.config&&(this.entities=St(this.hass,this.config.device))}getCardSize(){return 3}getGridOptions(){return{columns:12,rows:3,min_columns:6,min_rows:2}}static getStubConfig(t){const e=$t(t);return{device:e[0]?.id??""}}entityId(t){return this.entities.get(t)}state(t){const e=this.entityId(t);return e?this.hass?.states?.[e]:void 0}attr(t,e){return this.state(t)?.attributes?.[e]}isOn(t){return"on"===this.state(t)?.state}deviceName(){if(this.config?.name)return this.config.name;const t=this.hass?.devices?.[this.config?.device];return t?.name_by_user||t?.name||"Rohlík.cz"}get accentStyle(){return this.config?.accent?{"--rohlik-accent":this.config.accent}:{}}t(t,e){return Mt(this.hass,{...Ut,...this.mergedStrings()},t,e)}mergedStrings(){const t={};for(const e of new Set([...Object.keys(Ut),...Object.keys(this.strings)]))t[e]={...Ut[e],...this.strings[e]};return t}renderFreshness(t="updated"){const e=At(this.state(t)?.state);if(!e)return Z;const r=Date.now()-e.getTime()>12e5;return B`
      <div class="footer ${r?"stale":""}">
        ${this.t("updated_ago",{time:Dt(this.hass,e)})}
      </div>
    `}renderError(t){return B`<div class="error">${t}</div>`}}Ht.styles=jt,t([ut({attribute:!1})],Ht.prototype,"hass",void 0),t([pt()],Ht.prototype,"config",void 0),t([pt()],Ht.prototype,"entities",void 0);let Ft=!1;function Lt(){Ft||(Ft=!0,console.info("%c ROHLIK-CARDS %c v0.1.0 ","color: white; background: #d4145a; font-weight: 700;","color: #d4145a; background: white; font-weight: 700;"))}function Bt(t){Lt(),window.customCards=window.customCards??[],window.customCards.push({preview:!0,...t})}const qt=new Map;function Zt(t,e){const r=qt.get(e);if(r)return r;const i=t.callWS({type:"config/entity_registry/get",entity_id:e}).then(t=>t.config_entry_id).catch(t=>{throw qt.delete(e),t});return qt.set(e,i),i}async function Vt(t,e,r,i,s=!1){const n=await t.callService("rohlikcz",r,{config_entry_id:e,...i},void 0,!0,s);return s?n.response:void 0}function Kt(t,e,r){const i=new CustomEvent(e,{detail:r,bubbles:!0,composed:!0});t.dispatchEvent(i)}function Wt(t,e){Kt(t,"hass-more-info",{entityId:e})}function Qt(t){return t.toString().padStart(2,"0")}function Yt(t){return`${Qt(t.getHours())}:${Qt(t.getMinutes())}`}function Gt(t,e){const r=function(t,e){if(t.isOrdered)return t.since&&e.getTime()>=t.since.getTime()?"arriving":"ordered";const r=t.recentDelivery;if(r){const t=r.till??r.endedAt,i=Math.max(t.getTime(),r.endedAt.getTime());if(e.getTime()-i<=216e5)return"delivered"}return"none"}(t,e);let i=null;t.since&&t.till&&(i=`${Yt(t.since)}–${Yt(t.till)}`);let s=null;if("arriving"===r&&t.since&&t.till&&t.till.getTime()>t.since.getTime()){s=function(t){return Math.min(1,Math.max(0,t))}(((t.eta??e).getTime()-t.since.getTime())/(t.till.getTime()-t.since.getTime()))}const n="delivered"===r?t.lastOrderItems??null:t.orderData?.itemsCount??null,o="delivered"===r?t.lastOrderPrice??null:t.orderData?.priceComposition?.total?.amount??null,a=t.recentDelivery?t.recentDelivery.till??t.recentDelivery.endedAt:null;return{state:r,since:t.since,till:t.till,eta:t.eta,progress:s,windowLabel:i,orderId:t.orderData?.id??null,summaryItems:n,summaryPrice:o,announcementText:t.announcementText??null,announcementExtra:t.announcementExtra??null,announcementUpdatedAt:t.announcementUpdatedAt??null,lastOrderAt:t.lastOrderAt??null,firstDeliveryText:t.firstDeliveryText??null,isReserved:t.isReserved,isExpressAvailable:t.isExpressAvailable,deliveredAt:a}}function Jt(t){return`rohlik-delivery-last:${t}`}function Xt(t,e){let r;try{r=t.getItem(Jt(e))}catch{return null}if(!r)return null;try{const t=JSON.parse(r);return t&&"object"==typeof t?{orderId:t.orderId??null,till:"string"==typeof t.till?t.till:null,endedAt:"string"==typeof t.endedAt?t.endedAt:null}:null}catch{return null}}function te(t,e,r){try{t.setItem(Jt(e),JSON.stringify(r))}catch{}}function ee(t){if(!t.endedAt)return null;const e=new Date(t.endedAt);if(Number.isNaN(e.getTime()))return null;const r=t.till?new Date(t.till):null;return{orderId:t.orderId,till:r&&!Number.isNaN(r.getTime())?r:null,endedAt:e}}function re(t,e,r){te(t,e,{orderId:r.orderId,till:r.till?r.till.toISOString():null,endedAt:null})}function ie(t,e){const r=Xt(t,e);return r?ee(r):null}function se(t,e,r){const i=Xt(t,e);if(!i)return null;if(i.endedAt)return ee(i);const s={...i,endedAt:r.toISOString()};return te(t,e,s),ee(s)}function ne(t,e){try{t.removeItem(Jt(e))}catch{}}function oe(){try{if("undefined"!=typeof window&&window.localStorage)return window.localStorage}catch{}return{getItem:()=>null,setItem:()=>{},removeItem:()=>{}}}const ae=o`
  .header {
    cursor: pointer;
  }

  .header.static {
    cursor: default;
  }

  .chips {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .headline {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin: 4px 0 2px;
  }

  .caption {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
  }

  .sub {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
    margin-bottom: 4px;
  }

  .track-wrap {
    margin: 16px 0 6px;
  }

  .track {
    position: relative;
    height: 6px;
    border-radius: 3px;
    background: var(--divider-color);
    overflow: visible;
  }

  .track-fill {
    position: absolute;
    inset: 0 auto 0 0;
    height: 100%;
    border-radius: 3px;
    background: var(--rohlik-accent, var(--primary-color));
  }

  .track-marker {
    position: absolute;
    top: 50%;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--rohlik-accent, var(--primary-color));
    border: 2px solid var(--card-background-color, #fff);
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 1px var(--rohlik-accent, var(--primary-color));
  }

  .ticks {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    color: var(--secondary-text-color);
    font-size: 0.7rem;
  }

  .announce {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .announce .text {
    color: var(--primary-text-color);
  }

  .announce .meta {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
  }

  ha-icon.spin {
    animation: rohlik-spin 1s linear infinite;
  }

  @keyframes rohlik-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .compact-row {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }

  .compact-row ha-icon {
    color: var(--rohlik-accent, var(--primary-color));
    --mdc-icon-size: 24px;
    flex-shrink: 0;
  }

  .compact-row .headline {
    flex: 1;
    margin: 0;
    overflow: hidden;
  }

  .compact-row .big {
    font-size: 1.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`,le={cs:{title:"Příští rozvoz",chip_arriving:"Na cestě",chip_ordered:"Objednáno",chip_delivered:"Doručeno",chip_none:"Bez objednávky",chip_express:"Expres k dispozici",chip_reserved:"Rezervovaný termín",estimated:"odhad",by:"do",delivered_caption:"doručeno",nearest_slot:"Nejbližší termín",window:"Okno",order:"objednávka",announcement_updated:"Aktualizováno {time}",refresh_failed:"Obnovení se nezdařilo",no_entities:"Na tomto zařízení nebyly nalezeny entity Rohlík.cz"},en:{title:"Next delivery",chip_arriving:"Arriving",chip_ordered:"Ordered",chip_delivered:"Delivered",chip_none:"No order",chip_express:"Express available",chip_reserved:"Slot reserved",estimated:"estimated",by:"by",delivered_caption:"delivered",nearest_slot:"nearest slot",window:"Window",order:"order",announcement_updated:"Updated {time}",refresh_failed:"Refresh failed",no_entities:"Rohlík.cz entities not found on this device"}},ce={cs:{device:"Zařízení",name:"Vlastní název",show_announcement:"Zobrazit oznámení kurýra",show_order_summary:"Zobrazit shrnutí objednávky",show_express_chip:"Zobrazit chip Expres",show_refresh:"Zobrazit tlačítko Obnovit",compact:"Kompaktní zobrazení"},en:{device:"Device",name:"Custom name",show_announcement:"Show courier announcement",show_order_summary:"Show order summary",show_express_chip:"Show express chip",show_refresh:"Show refresh button",compact:"Compact layout"}},de=[{name:"device",required:!0,selector:{device:{integration:"rohlikcz"}}},{name:"name",selector:{text:{}}}];class he extends at{constructor(){super(...arguments),this.computeLabel=t=>Mt(this.hass,this.labels,t.name)||t.name,this.onValueChanged=t=>{t.stopPropagation(),Kt(this,"config-changed",{config:{...this.config,...t.detail.value}})}}setConfig(t){this.config=t}get schema(){return[...de,...this.extraSchema()]}render(){return this.hass&&this.config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this.config}
        .schema=${this.schema}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    `:Z}}t([pt()],he.prototype,"hass",void 0),t([pt()],he.prototype,"config",void 0);let ue=class extends he{constructor(){super(...arguments),this.labels=ce}extraSchema(){return[{name:"show_announcement",selector:{boolean:{}}},{name:"show_order_summary",selector:{boolean:{}}},{name:"show_express_chip",selector:{boolean:{}}},{name:"show_refresh",selector:{boolean:{}}},{name:"compact",selector:{boolean:{}}}]}};ue=t([ct("rohlik-delivery-card-editor")],ue);const pe={arriving:"ok",ordered:"neutral",delivered:"ok",none:"neutral"};let me=class extends Ht{constructor(){super(...arguments),this.strings=le,this.refreshing=!1,this.refreshError=null,this.onHeaderTap=()=>{if(this.tapDisabled)return;const t=this.entityId("is_ordered");t&&Wt(this,t)},this.onRefresh=async t=>{if(t.stopPropagation(),this.refreshing)return;const e=this.entityId("is_ordered");if(e){this.refreshing=!0,this.refreshError=null;try{const t=await Zt(this.hass,e);if(!t)throw new Error("no config entry");const r=this.getView(),i="arriving"===r.state||"ordered"===r.state?"update_delivery_times":"refresh_slots";await Vt(this.hass,t,i)}catch{this.refreshError=this.t("refresh_failed")}finally{this.refreshing=!1}}}}static getConfigElement(){return document.createElement("rohlik-delivery-card-editor")}static getStubConfig(t){return{...Ht.getStubConfig(t),type:"custom:rohlik-delivery-card"}}connectedCallback(){super.connectedCallback(),this.tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),void 0!==this.tickTimer&&(clearInterval(this.tickTimer),this.tickTimer=void 0)}getCardSize(){return this.config?.compact?2:4}getGridOptions(){return this.config?.compact?{columns:6,rows:2,min_columns:6,min_rows:2}:{columns:12,rows:3,min_columns:6,min_rows:2}}textState(t){const e=this.state(t)?.state;return e&&"unknown"!==e&&"unavailable"!==e?e:null}syncMemory(t){const e=this.config?.device;if(!e)return null;const r=oe(),i=this.state("is_ordered")?.state;if("on"!==i&&"off"!==i)return ie(r,e);if(this.isOn("is_ordered")){const i=t?.id??null,s=ie(r,e);return s&&null!=i&&s.orderId!==i&&ne(r,e),re(r,e,{orderId:i,till:At(this.state("next_order_till")?.state)}),null}return se(r,e,new Date)}buildInput(){const t=this.attr("is_ordered","order_data")??null;return{isOrdered:this.isOn("is_ordered"),since:At(this.state("next_order_since")?.state),till:At(this.state("next_order_till")?.state),eta:At(this.state("delivery_time")?.state),orderData:t,announcementText:this.textState("delivery_info"),announcementExtra:this.attr("delivery_info","Additional Content")??null,announcementUpdatedAt:At(this.attr("delivery_info","Updated At")),lastOrderAt:At(this.state("last_order")?.state),lastOrderItems:this.attr("last_order","Items")??null,lastOrderPrice:this.attr("last_order","Price")??null,firstDeliveryText:this.textState("first_delivery"),isReserved:this.isOn("is_reserved"),isExpressAvailable:this.isOn("is_express_available"),recentDelivery:this.syncMemory(t)}}getView(){return Gt(this.buildInput(),new Date)}get tapDisabled(){const t=this.config?.tap_action;return"none"===t||!(!t||"object"!=typeof t||"none"!==t.action)}render(){if(!this.config)return Z;if(!this.entityId("is_ordered"))return B`
        <ha-card style=${wt(this.accentStyle)}>${this.renderError(this.t("no_entities"))}</ha-card>
      `;const t=this.getView();return B`
      <ha-card style=${wt(this.accentStyle)}>
        ${this.config.compact?this.renderCompact(t):this.renderFull(t)}
      </ha-card>
    `}renderChips(t){const e=!1!==this.config.show_express_chip&&t.isExpressAvailable,r="none"===t.state&&t.isReserved;return B`
      <div class="chips">
        <span class="chip ${pe[t.state]}">${this.t(`chip_${t.state}`)}</span>
        ${e?B`<span class="chip warn">${this.t("chip_express")}</span>`:Z}
        ${r?B`<span class="chip neutral">${this.t("chip_reserved")}</span>`:Z}
      </div>
    `}renderCompact(t){return B`
      <div
        class="compact-row"
        @click=${this.onHeaderTap}
        role=${this.tapDisabled?Z:"button"}
      >
        <ha-icon icon="mdi:truck-delivery"></ha-icon>
        <div class="headline">
          <span class="big">${this.headlineMain(t)}</span>
        </div>
        <span class="chip ${pe[t.state]}">${this.t(`chip_${t.state}`)}</span>
      </div>
    `}renderFull(t){const e=!1!==this.config.show_announcement&&("arriving"===t.state||"ordered"===t.state)&&!!t.announcementText,r=!1!==this.config.show_order_summary&&null!=t.summaryItems,i=!1!==this.config.show_refresh,s=!("arriving"!==t.state&&"ordered"!==t.state||!t.since||!t.till);return B`
      <div
        class=${yt({header:!0,static:this.tapDisabled})}
        @click=${this.onHeaderTap}
      >
        <ha-icon icon="mdi:truck-delivery"></ha-icon>
        <span class="title">${this.config.name||this.t("title")}</span>
        ${this.renderChips(t)}
      </div>

      <div class="headline">
        <span class="big">${this.headlineMain(t)}</span>
        <span class="caption">${this.headlineCaption(t)}</span>
      </div>

      ${s?B`<div class="sub">${this.renderSub(t)}</div>`:Z}
      ${"arriving"===t.state?this.renderTrack(t):Z}
      ${e?B`<div class="row">${this.renderAnnouncement(t)}</div>`:Z}
      ${r?B`<div class="row">${this.renderSummary(t)}</div>`:Z}
      ${this.refreshError?B`<div class="error">${this.refreshError}</div>`:Z}
      ${i?B`
            <div class="actions">
              <button class="btn ghost" ?disabled=${this.refreshing} @click=${this.onRefresh}>
                <ha-icon
                  icon="mdi:refresh"
                  class=${yt({spin:this.refreshing})}
                ></ha-icon>
                ${this.t("refresh")}
              </button>
            </div>
          `:Z}
      ${this.renderFreshness()}
    `}headlineMain(t){switch(t.state){case"arriving":return t.eta?Ct(this.hass,t.eta):t.till?Ct(this.hass,t.till):"—";case"ordered":return t.since?Ot(this.hass,t.since,{today:this.t("today"),tomorrow:this.t("tomorrow")}):"—";case"delivered":return t.deliveredAt?Ct(this.hass,t.deliveredAt):"—";default:return t.firstDeliveryText??"—"}}headlineCaption(t){switch(t.state){case"arriving":return this.t(t.eta?"estimated":"by");case"ordered":return t.since?function(t,e){const r=Et(t),[i,s]=Tt(r,"future"),n=Math.max(0,Math.round((e.getTime()-Date.now())/1e3)),o=Math.round(n/60);if(n<60)return Nt(i,Rt(r,n,"seconds"),s);if(o<60)return Nt(i,Rt(r,o,"minutes"),s);const a=Math.floor(o/60),l=o%60;if(a<24){const t=Rt(r,a,"hours");return Nt(i,0===l?t:`${t} ${Rt(r,l,"minutes")}`,s)}return Nt(i,Rt(r,Math.round(o/60/24),"days"),s)}(this.hass,t.since):"";case"delivered":return this.t("delivered_caption");default:return this.t("nearest_slot")}}renderSub(t){if(!t.since||!t.till)return Z;const e=Ot(this.hass,t.since,{today:this.t("today"),tomorrow:this.t("tomorrow")}),r=[`${this.t("window")} ${e} – ${Ct(this.hass,t.till)}`];return null!=t.orderId&&r.push(`${this.t("order")} ${t.orderId}`),B`${r.join(" · ")}`}renderTrack(t){if(!t.since||!t.till||null==t.progress)return Z;const e=new Date((t.since.getTime()+t.till.getTime())/2);return B`
      <div class="track-wrap">
        <div class="track">
          <div class="track-fill" style=${wt({width:100*t.progress+"%"})}></div>
          <div class="track-marker" style=${wt({left:100*t.progress+"%"})}></div>
        </div>
        <div class="ticks">
          <span>${Ct(this.hass,t.since)}</span>
          <span>${Ct(this.hass,e)}</span>
          <span>${Ct(this.hass,t.till)}</span>
        </div>
      </div>
    `}renderAnnouncement(t){return B`
      <div class="announce">
        <span class="text">${t.announcementText}</span>
        <span class="meta">
          ${t.announcementUpdatedAt?this.t("announcement_updated",{time:Ct(this.hass,t.announcementUpdatedAt)}):Z}
          ${t.announcementExtra?` · ${t.announcementExtra}`:Z}
        </span>
      </div>
    `}renderSummary(t){const e=`${t.summaryItems} ${this.t("items")}`,r=null!=t.summaryPrice?zt(this.hass,t.summaryPrice):"";return B`<span>${[e,r].filter(Boolean).join(" · ")}</span>`}};me.styles=[jt,ae],t([pt()],me.prototype,"refreshing",void 0),t([pt()],me.prototype,"refreshError",void 0),me=t([ct("rohlik-delivery-card")],me),Bt({type:"rohlik-delivery-card",name:"Rohlík.cz Next Delivery",description:"Shows the state of your next Rohlík.cz order: ordered, on its way, or delivered.",preview:!0});const fe={cs:{device:"Zařízení",name:"Vlastní název",show_name:"Zobrazit název zařízení"},en:{device:"Device",name:"Custom name",show_name:"Show device name"}};let ge=class extends he{constructor(){super(...arguments),this.labels=fe}extraSchema(){return[{name:"show_name",selector:{boolean:{}}}]}};ge=t([ct("rohlik-delivery-badge-editor")],ge);let ve=class extends at{constructor(){super(...arguments),this.entities=new Map,this.onClick=()=>{const t=this.entityId("is_ordered");t&&Wt(this,t)}}setConfig(t){if(!t?.device)throw new Error("Rohlík badge: 'device' is required — pick the Rohlík.cz device in the badge editor.");this.config=t,this.hass&&(this.entities=St(this.hass,this.config.device))}willUpdate(t){t.has("hass")&&this.hass&&this.config&&(this.entities=St(this.hass,this.config.device))}static getConfigElement(){return document.createElement("rohlik-delivery-badge-editor")}static getStubConfig(t){const e=$t(t);return{device:e[0]?.id??""}}entityId(t){return this.entities.get(t)}entityState(t){const e=this.entityId(t);return e?this.hass?.states?.[e]:void 0}attr(t,e){return this.entityState(t)?.attributes?.[e]}isOn(t){return"on"===this.entityState(t)?.state}textState(t){const e=this.entityState(t)?.state;return e&&"unknown"!==e&&"unavailable"!==e?e:null}t(t,e){return Mt(this.hass,{...Ut,...le},t,e)}deviceName(){if(this.config?.name)return this.config.name;const t=this.hass?.devices?.[this.config?.device];return t?.name_by_user||t?.name||"Rohlík.cz"}syncMemory(t){const e=this.config?.device;if(!e)return null;const r=oe(),i=this.entityState("is_ordered")?.state;if("on"!==i&&"off"!==i)return ie(r,e);if(this.isOn("is_ordered")){const i=t?.id??null,s=ie(r,e);return s&&null!=i&&s.orderId!==i&&ne(r,e),re(r,e,{orderId:i,till:At(this.entityState("next_order_till")?.state)}),null}return se(r,e,new Date)}buildInput(){const t=this.attr("is_ordered","order_data")??null;return{isOrdered:this.isOn("is_ordered"),since:At(this.entityState("next_order_since")?.state),till:At(this.entityState("next_order_till")?.state),eta:At(this.entityState("delivery_time")?.state),orderData:t,announcementText:this.textState("delivery_info"),announcementExtra:this.attr("delivery_info","Additional Content")??null,announcementUpdatedAt:At(this.attr("delivery_info","Updated At")),lastOrderAt:At(this.entityState("last_order")?.state),lastOrderItems:this.attr("last_order","Items")??null,lastOrderPrice:this.attr("last_order","Price")??null,firstDeliveryText:this.textState("first_delivery"),isReserved:this.isOn("is_reserved"),isExpressAvailable:this.isOn("is_express_available"),recentDelivery:this.syncMemory(t)}}render(){if(!this.config||!this.hass||!this.entityId("is_ordered"))return Z;const t=Gt(this.buildInput(),new Date),e="none"===t.state&&t.isExpressAvailable,r={...this.config.accent?{"--rohlik-accent":this.config.accent}:{},...e?{"--rohlik-icon-color":"var(--warning-color)"}:{}},i=this.config.show_name?`${this.deviceName()} · ${this.t(`chip_${t.state}`)}`:this.t(`chip_${t.state}`);return B`
      <div class="badge" style=${wt(r)} @click=${this.onClick}>
        <div class="icon-circle">
          <ha-icon icon=${"delivered"===t.state?"mdi:check":"mdi:truck-delivery"}></ha-icon>
        </div>
        <div class="text">
          <span class="label">${i}</span>
          <span class="value">${this.value(t)}</span>
        </div>
      </div>
    `}value(t){switch(t.state){case"arriving":return t.eta?Ct(this.hass,t.eta):t.till?Ct(this.hass,t.till):"—";case"ordered":return t.since?Ot(this.hass,t.since,{today:this.t("today"),tomorrow:this.t("tomorrow")}):"—";case"delivered":return t.deliveredAt?Ct(this.hass,t.deliveredAt):"—";default:return t.firstDeliveryText??"—"}}};var ye;ve.styles=o`
    :host {
      --rohlik-accent: var(--primary-color);
      display: inline-flex;
    }

    .badge {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 36px;
      padding: 0 12px 0 6px;
      box-sizing: border-box;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--ha-card-background, var(--card-background-color));
      cursor: pointer;
      max-width: 100%;
    }

    .icon-circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      flex-shrink: 0;
      background: color-mix(in srgb, var(--rohlik-icon-color, var(--rohlik-accent)) 15%, transparent);
    }

    ha-icon {
      color: var(--rohlik-icon-color, var(--rohlik-accent));
      --mdc-icon-size: 16px;
    }

    .text {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      line-height: 1.2;
    }

    .label {
      color: var(--secondary-text-color);
      font-size: 0.65rem;
      text-transform: uppercase;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .value {
      color: var(--primary-text-color);
      font-size: 0.8rem;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `,t([ut({attribute:!1})],ve.prototype,"hass",void 0),t([pt()],ve.prototype,"config",void 0),t([pt()],ve.prototype,"entities",void 0),ve=t([ct("rohlik-delivery-badge")],ve),ye={type:"rohlik-delivery-badge",name:"Rohlík.cz Delivery Badge",description:"Compact status pill for your next Rohlík.cz delivery.",preview:!0},Lt(),window.customBadges=window.customBadges??[],window.customBadges.push({preview:!0,...ye});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const{I:_e}=st,be=t=>t,we=()=>document.createComment(""),xe=(t,e,r)=>{const i=t._$AA.parentNode,s=void 0===e?t._$AB:e._$AA;if(void 0===r){const e=i.insertBefore(we(),s),n=i.insertBefore(we(),s);r=new _e(e,n,t,t.options)}else{const e=r._$AB.nextSibling,n=r._$AM,o=n!==t;if(o){let e;r._$AQ?.(t),r._$AM=t,void 0!==r._$AP&&(e=t._$AU)!==n._$AU&&r._$AP(e)}if(e!==s||o){let t=r._$AA;for(;t!==e;){const e=be(t).nextSibling;be(i).insertBefore(t,s),t=e}}}return r},$e=(t,e,r=t)=>(t._$AI(e,r),t),ke={},Se=(t,e=ke)=>t._$AH=e,Ae=t=>{t._$AR(),t._$AA.remove()},Ee=(t,e,r)=>{const i=new Map;for(let s=e;s<=r;s++)i.set(t[s],s);return i},ze=gt(class extends vt{constructor(t){if(super(t),t.type!==ft)throw Error("repeat() can only be used in text expressions")}dt(t,e,r){let i;void 0===r?r=e:void 0!==e&&(i=e);const s=[],n=[];let o=0;for(const e of t)s[o]=i?i(e,o):o,n[o]=r(e,o),o++;return{values:n,keys:s}}render(t,e,r){return this.dt(t,e,r).values}update(t,[e,r,i]){const s=(t=>t._$AH)(t),{values:n,keys:o}=this.dt(e,r,i);if(!Array.isArray(s))return this.ut=o,n;const a=this.ut??=[],l=[];let c,d,h=0,u=s.length-1,p=0,m=n.length-1;for(;h<=u&&p<=m;)if(null===s[h])h++;else if(null===s[u])u--;else if(a[h]===o[p])l[p]=$e(s[h],n[p]),h++,p++;else if(a[u]===o[m])l[m]=$e(s[u],n[m]),u--,m--;else if(a[h]===o[m])l[m]=$e(s[h],n[m]),xe(t,l[m+1],s[h]),h++,m--;else if(a[u]===o[p])l[p]=$e(s[u],n[p]),xe(t,s[h],s[u]),u--,p++;else if(void 0===c&&(c=Ee(o,p,m),d=Ee(a,h,u)),c.has(a[h]))if(c.has(a[u])){const e=d.get(o[p]),r=void 0!==e?s[e]:null;if(null===r){const e=xe(t,s[h]);$e(e,n[p]),l[p]=e}else l[p]=$e(r,n[p]),xe(t,s[h],r),s[e]=null;p++}else Ae(s[u]),u--;else Ae(s[h]),h++;for(;p<=m;){const e=xe(t,l[m+1]);$e(e,n[p]),l[p++]=e}for(;h<=u;){const t=s[h++];null!==t&&Ae(t)}return this.ut=o,Se(t,l),q}}),Ce=o`
  .caption {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
    margin-top: 2px;
  }

  .hint {
    color: var(--secondary-text-color);
    font-size: 0.8rem;
    margin-top: 4px;
  }

  .search {
    margin: 12px 0;
  }

  .search-box {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: var(--ha-card-border-radius, 12px);
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
  }

  .search-box ha-icon {
    color: var(--secondary-text-color);
    --mdc-icon-size: 20px;
  }

  .search-box input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    color: var(--primary-text-color);
    font-size: 0.9rem;
    font-family: inherit;
    padding: 6px 0;
  }

  .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .icon-btn:hover:not(:disabled) {
    background: color-mix(in srgb, var(--secondary-text-color) 12%, transparent);
  }

  .icon-btn:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .icon-btn.active {
    color: var(--rohlik-accent);
  }

  .icon-btn.remove:hover:not(:disabled) {
    color: var(--error-color, #db4437);
  }

  .spinner {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    border: 2px solid color-mix(in srgb, var(--rohlik-accent) 30%, transparent);
    border-top-color: var(--rohlik-accent);
    border-radius: 50%;
    animation: rohlik-spin 0.8s linear infinite;
  }

  @keyframes rohlik-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .search-results {
    margin-top: 4px;
    border-top: 1px solid var(--divider-color);
  }

  .row.search-result .cell {
    min-width: 0;
  }

  .row.search-result .price {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
    white-space: nowrap;
  }

  .category-header {
    margin-top: 12px;
    padding-bottom: 2px;
    color: var(--secondary-text-color);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .category-header:first-child {
    margin-top: 0;
  }

  .cell {
    flex: 1;
    min-width: 0;
  }

  .cell .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--primary-text-color);
  }

  .cell .secondary {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--secondary-text-color);
    font-size: 0.8rem;
  }

  .stepper {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 2px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--secondary-text-color) 10%, transparent);
    flex-shrink: 0;
  }

  .step-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--primary-text-color);
    font-size: 1rem;
    line-height: 1;
    cursor: pointer;
  }

  .step-btn:hover:not(:disabled) {
    background: color-mix(in srgb, var(--rohlik-accent) 20%, transparent);
  }

  .step-btn:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .qty {
    min-width: 1.4em;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .line-price {
    min-width: 4.5em;
    text-align: right;
    font-size: 0.9rem;
    color: var(--primary-text-color);
    flex-shrink: 0;
  }

  .row.pending {
    opacity: 0.6;
  }

  .show-toggle {
    align-self: center;
    margin-top: 8px;
  }

  .footer-row {
    margin-top: auto;
    padding-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .footer-row .footer {
    margin-top: 0;
  }
`,Ie={cs:{title:"Nákupní košík",can_order:"Lze objednat",below_minimum:"Pod minimem",empty_cart:"Košík je prázdný",last_order_hint:"Váš poslední nákup měl {count} položek",search_placeholder:"Hledat na Rohlíku…",favourite_only:"Jen oblíbené",add:"Přidat",remove:"Odebrat",uncategorised:"Bez kategorie",missing_entities:"Chybí entity nákupního košíku — zkontrolujte integraci HA-RohlikCZ.",load_error:"Nepodařilo se načíst obsah košíku.",action_error:"Akci se nepodařilo dokončit, zkuste to prosím znovu.",search_error:"Vyhledávání selhalo.",search_add_error:"Přidání do košíku selhalo."},en:{title:"Shopping cart",can_order:"Can order",below_minimum:"Below minimum",empty_cart:"Cart is empty",last_order_hint:"Your last order had {count} items",search_placeholder:"Search Rohlík…",favourite_only:"Favourites only",add:"Add",remove:"Remove",uncategorised:"Uncategorised",missing_entities:"Shopping cart entities are missing — check the HA-RohlikCZ integration.",load_error:"Failed to load the cart contents.",action_error:"Couldn't complete that action, please try again.",search_error:"Search failed.",search_add_error:"Adding to cart failed."}},Oe={cs:{device:"Zařízení",name:"Vlastní název",show_search:"Zobrazit vyhledávání",group_by_category:"Seskupit podle kategorie",show_brand:"Zobrazit značku",max_items:"Max. počet zobrazených položek"},en:{device:"Device",name:"Custom name",show_search:"Show search",group_by_category:"Group by category",show_brand:"Show brand",max_items:"Max. items shown"}},Pe=/^(.+)\s*\((\d+)\)\s*-\s*(\d+(?:[.,]\d+)?)\s*Kč\s*$/;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Te(t){if(!t||"string"!=typeof t.summary)return null;const e=Pe.exec(t.summary.trim());if(!e)return null;const[,r,i,s]=e,n=r.trim(),o=parseInt(i,10),a=parseFloat(s.replace(",","."));if(!n||!Number.isFinite(o)||!Number.isFinite(a))return null;const l={uid:t.uid,name:n,quantity:o,price:a},{category:c,brand:d,productId:h}=function(t){const e={};if(!t)return e;for(const r of t.split(/\r?\n/)){const t=r.indexOf(":");if(-1===t)continue;const i=r.slice(0,t).trim().toLowerCase().replace(/[^a-z0-9]/g,""),s=r.slice(t+1).trim();if(s)if("category"===i)e.category=s;else if("brand"===i)e.brand=s;else if("productid"===i){const t=parseInt(s,10);Number.isFinite(t)&&(e.productId=t)}}return e}(t.description);return void 0!==c&&(l.category=c),void 0!==d&&(l.brand=d),void 0!==h&&(l.productId=h),l}const Re=/^(\d+)\s+(.+)$/,Ne=/^(.+?)\s*\((\d+)\)\s*$/;function De(t){const e=(t??"").trim(),r=Re.exec(e);if(r){const t=r[2].trim();if(t)return{quantity:parseInt(r[1],10),name:t}}const i=Ne.exec(e);if(i){const t=i[1].trim();if(t)return{quantity:parseInt(i[2],10),name:t}}return{quantity:1,name:e}}let Me=class extends he{constructor(){super(...arguments),this.labels=Oe}extraSchema(){return[{name:"show_search",selector:{boolean:{}}},{name:"group_by_category",selector:{boolean:{}}},{name:"show_brand",selector:{boolean:{}}},{name:"max_items",selector:{number:{min:1,max:50,mode:"box"}}}]}};Me=t([ct("rohlik-cart-card-editor")],Me);let Ue=class extends Ht{constructor(){super(...arguments),this.strings=Ie,this.lines=[],this.loading=!1,this.error=null,this.expanded=!1,this.searchQuery="",this.searchResults=[],this.searching=!1,this.searchError=null,this.favouriteOnly=!1,this.pendingUids=new Set,this.searchSeq=0,this.onSearchInput=t=>{const e=t.target.value;this.searchQuery=e,this.searchError=null,this.searchDebounce&&clearTimeout(this.searchDebounce);const r=e.trim();if(r.length<2)return this.searchResults=[],void(this.searching=!1);this.searchDebounce=setTimeout(()=>{this.runSearch(r)},400)},this.onSearchKeydown=t=>{"Escape"!==t.key?"Enter"===t.key&&this.searchAndAdd():this.clearSearch()},this.toggleFavouriteOnly=()=>{this.favouriteOnly=!this.favouriteOnly;const t=this.searchQuery.trim();t.length>=2&&this.runSearch(t)}}static getConfigElement(){return document.createElement("rohlik-cart-card-editor")}static getStubConfig(t){return{...Ht.getStubConfig(t),type:"custom:rohlik-cart-card"}}getCardSize(){return 5}getGridOptions(){return{columns:12,rows:4,min_columns:6,min_rows:3}}willUpdate(t){if(super.willUpdate(t),!t.has("hass")||!this.hass||!this.config)return;const e=this.state("shopping_cart"),r=this.state("cart_price");if(!e||!r)return;const i=`${e.state}|${e.last_updated}|${r.state}`;i!==this.loadedKey&&(this.loadedKey=i,this.loadItems())}async ensureConfigEntryId(){if(this.configEntryId)return this.configEntryId;const t=this.entityId("cart_price");return t?(this.configEntryId=await Zt(this.hass,t),this.configEntryId):void 0}async loadItems(){const t=this.entityId("shopping_cart");if(t){this.loading=!0,this.error=null;try{const e=await this.hass.callWS({type:"todo/item/list",entity_id:t});this.lines=(e.items??[]).map(t=>Te(t)).filter(t=>null!==t)}catch{this.error=this.t("load_error")}finally{this.loading=!1}}}async removeItem(t){const e=this.entityId("shopping_cart");if(!e||this.pendingUids.has(t))return;const r=this.lines;this.pendingUids=new Set(this.pendingUids).add(t),this.lines=this.lines.filter(e=>e.uid!==t),this.error=null;try{await this.hass.callService("todo","remove_item",{item:t},{entity_id:e})}catch{this.lines=r,this.error=this.t("action_error")}finally{const e=new Set(this.pendingUids);e.delete(t),this.pendingUids=e}}async changeQuantity(t,e){if(this.pendingUids.has(t.uid))return;if(e<=0)return void await this.removeItem(t.uid);const r=this.entityId("shopping_cart");if(!r||void 0===t.productId)return;const i=this.lines;this.pendingUids=new Set(this.pendingUids).add(t.uid),this.lines=this.lines.map(r=>r.uid===t.uid?{...r,quantity:e}:r),this.error=null;try{await this.hass.callService("todo","remove_item",{item:t.uid},{entity_id:r});const i=await this.ensureConfigEntryId();if(!i)throw new Error("no config_entry_id for shopping_cart device");await Vt(this.hass,i,"add_to_cart",{product_id:t.productId,quantity:e})}catch{this.lines=i,this.error=this.t("action_error")}finally{const e=new Set(this.pendingUids);e.delete(t.uid),this.pendingUids=e}}async runSearch(t){const e=await this.ensureConfigEntryId();if(!e)return;const r=++this.searchSeq;this.searching=!0;try{const i=await Vt(this.hass,e,"search_product",{product_name:t,limit:8,favourite:this.favouriteOnly},!0);if(r!==this.searchSeq)return;this.searchResults=i?.search_results??[]}catch{if(r!==this.searchSeq)return;this.searchResults=[],this.searchError=this.t("search_error")}finally{r===this.searchSeq&&(this.searching=!1)}}async searchAndAdd(){const t=this.searchQuery.trim();if(!t)return;const e=await this.ensureConfigEntryId();if(!e)return;const{quantity:r,name:i}=De(t);this.searching=!0,this.searchError=null;try{const t=await Vt(this.hass,e,"search_and_add_to_cart",{product_name:i,quantity:r,favourite:this.favouriteOnly},!0);if(t&&!1===t.success)return void(this.searchError=t.message||this.t("search_add_error"));this.clearSearch(),await this.loadItems()}catch{this.searchError=this.t("search_add_error")}finally{this.searching=!1}}async addSearchResult(t){const e=await this.ensureConfigEntryId();if(!e)return;const{quantity:r}=De(this.searchQuery.trim());try{await Vt(this.hass,e,"add_to_cart",{product_id:t.id,quantity:r}),this.clearSearch(),await this.loadItems()}catch{this.searchError=this.t("search_add_error")}}clearSearch(){this.searchDebounce&&clearTimeout(this.searchDebounce),this.searchQuery="",this.searchResults=[],this.searchError=null,this.searching=!1}render(){if(!this.config)return Z;const t=this.entityId("shopping_cart"),e=this.entityId("cart_price");if(!t||!e)return B`<ha-card>${this.renderError(this.t("missing_entities"))}</ha-card>`;const r=this.state("cart_price"),i=r?parseFloat(r.state):0,s=Boolean(this.attr("cart_price","Can Order")),n=this.attr("cart_price","Total items"),o="number"==typeof n?n:this.lines.length,a=0===this.lines.length,l=!1!==this.config.show_search,c=!1!==this.config.show_brand,d=!0===this.config.group_by_category,h=this.config.max_items??6;return B`
      <ha-card style=${wt(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:cart"></ha-icon>
          <span class="title">${this.config.name||this.t("title")}</span>
          <span class="chip ${s?"ok":"warn"}">
            ${s?this.t("can_order"):this.t("below_minimum")}
          </span>
        </div>

        <div class="big">${zt(this.hass,Number.isFinite(i)?i:0)}</div>
        <div class="caption">
          ${a?this.t("empty_cart"):`${o} ${this.t("items")}`}
        </div>
        ${a?this.renderEmptyHint():Z}
        ${this.error?B`<div class="error">${this.error}</div>`:Z}
        ${l?this.renderSearch():Z}
        ${a?Z:this.renderLines(d,c,h)}

        <div class="footer-row">
          ${this.renderFreshness()}
          <button
            class="btn ghost"
            ?disabled=${this.loading}
            @click=${()=>{this.loadItems()}}
          >
            ${this.t("refresh")}
          </button>
        </div>
      </ha-card>
    `}renderEmptyHint(){const t=this.attr("last_order","Items");return"number"!=typeof t?Z:B`<div class="hint">${this.t("last_order_hint",{count:t})}</div>`}renderSearch(){return B`
      <div class="search">
        <div class="search-box">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input
            type="text"
            .value=${this.searchQuery}
            placeholder=${this.t("search_placeholder")}
            @input=${this.onSearchInput}
            @keydown=${this.onSearchKeydown}
          />
          ${this.searching?this.renderSpinner():Z}
          <button
            class=${yt({"icon-btn":!0,active:this.favouriteOnly})}
            title=${this.t("favourite_only")}
            @click=${this.toggleFavouriteOnly}
          >
            <ha-icon icon=${this.favouriteOnly?"mdi:heart":"mdi:heart-outline"}></ha-icon>
          </button>
        </div>
        ${this.searchError?B`<div class="error">${this.searchError}</div>`:Z}
        ${this.searchResults.length?B`
              <div class="search-results">
                ${ze(this.searchResults,t=>t.id,t=>this.renderSearchResult(t))}
              </div>
            `:Z}
      </div>
    `}renderSpinner(){return customElements.get("ha-circular-progress")?B`<ha-circular-progress indeterminate size="small"></ha-circular-progress>`:B`<div class="spinner"></div>`}renderSearchResult(t){const e=[t.brand,t.amount].filter(Boolean).join(" · ");return B`
      <div class="row search-result">
        <div class="cell">
          <div class="name">${t.name}</div>
          ${e?B`<div class="secondary">${e}</div>`:Z}
        </div>
        <div class="price">${t.price}</div>
        <button
          class="icon-btn"
          title=${this.t("add")}
          @click=${()=>{this.addSearchResult(t)}}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>
    `}renderLines(t,e,r){const i=this.expanded?this.lines:this.lines.slice(0,r),s=this.lines.length>r;return B`
      <div class="lines">
        ${t?ze(function(t){const e=new Map,r=[];for(const i of t){if(!i.category){r.push(i);continue}const t=e.get(i.category);t?t.push(i):e.set(i.category,[i])}const i=Array.from(e.entries()).sort(([t],[e])=>t.localeCompare(e)).map(([t,e])=>({category:t,lines:e}));return r.length&&i.push({category:void 0,lines:r}),i}(i),t=>t.category??"__uncategorised__",t=>B`
                <div class="category-header">${t.category??this.t("uncategorised")}</div>
                ${ze(t.lines,t=>t.uid,t=>this.renderLine(t,e))}
              `):ze(i,t=>t.uid,t=>this.renderLine(t,e))}
      </div>
      ${s?B`
            <button class="btn ghost show-toggle" @click=${()=>this.expanded=!this.expanded}>
              ${this.expanded?this.t("show_less"):this.t("show_all",{count:this.lines.length})}
            </button>
          `:Z}
    `}renderLine(t,e){const r=this.pendingUids.has(t.uid),i=[t.category,e?t.brand:void 0].filter(t=>Boolean(t)).join(" · ");return B`
      <div class=${yt({row:!0,"cart-line":!0,pending:r})}>
        <div class="cell">
          <div class="name">${t.name}</div>
          ${i?B`<div class="secondary">${i}</div>`:Z}
        </div>
        <div class="stepper">
          <button
            class="step-btn"
            ?disabled=${r}
            title=${this.t("remove")}
            @click=${()=>{this.changeQuantity(t,t.quantity-1)}}
          >
            −
          </button>
          <span class="qty">${t.quantity}</span>
          <button
            class="step-btn"
            ?disabled=${r}
            @click=${()=>{this.changeQuantity(t,t.quantity+1)}}
          >
            +
          </button>
        </div>
        <div class="line-price">${zt(this.hass,t.price)}</div>
        <button
          class="icon-btn remove"
          ?disabled=${r}
          title=${this.t("remove")}
          @click=${()=>{this.removeItem(t.uid)}}
        >
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `}};Ue.styles=[jt,Ce],t([pt()],Ue.prototype,"lines",void 0),t([pt()],Ue.prototype,"loading",void 0),t([pt()],Ue.prototype,"error",void 0),t([pt()],Ue.prototype,"expanded",void 0),t([pt()],Ue.prototype,"searchQuery",void 0),t([pt()],Ue.prototype,"searchResults",void 0),t([pt()],Ue.prototype,"searching",void 0),t([pt()],Ue.prototype,"searchError",void 0),t([pt()],Ue.prototype,"favouriteOnly",void 0),t([pt()],Ue.prototype,"pendingUids",void 0),Ue=t([ct("rohlik-cart-card")],Ue),Bt({type:"rohlik-cart-card",name:"Rohlík.cz Shopping Cart",description:"Live cart contents, quantity steppers and product search for Rohlík.cz."});const je=["express","standard","eco"],He={express:"mdi:lightning-bolt",standard:"mdi:truck-delivery",eco:"mdi:leaf"};function Fe(t){if("number"==typeof t&&Number.isFinite(t))return t;if("string"==typeof t&&""!==t.trim()){const e=Number(t);if(Number.isFinite(e))return e}return null}function Le(t){return"string"==typeof t&&""!==t.trim()?t:null}function Be(t){return null==t||Number.isNaN(t)?0:Math.min(100,Math.max(0,t))}const qe=o`
  :host {
    container-type: inline-size;
    container-name: rohlik-slots;
  }

  .watch-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    border: none;
    cursor: pointer;
    font: inherit;
  }

  .watch-btn ha-icon {
    --mdc-icon-size: 16px;
  }

  .watch-btn.watching {
    color: var(--rohlik-accent);
    background: color-mix(in srgb, var(--rohlik-accent) 15%, transparent);
  }

  .pulse-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    animation: rohlik-pulse 1.4s ease-in-out infinite;
  }

  @keyframes rohlik-pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.35;
      transform: scale(1.4);
    }
  }

  .location {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--secondary-text-color);
    font-size: 0.8rem;
    margin-bottom: 8px;
  }

  .location ha-icon {
    --mdc-icon-size: 14px;
  }

  .slots-grid {
    display: grid;
    grid-template-columns: repeat(var(--rohlik-slot-count, 3), 1fr);
    gap: 12px;
  }

  .slots-grid.column {
    grid-template-columns: 1fr;
  }

  @container rohlik-slots (max-width: 360px) {
    .slots-grid:not(.column) {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 360px) {
    .slots-grid:not(.column) {
      grid-template-columns: 1fr;
    }
  }

  .tile {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 10px 12px;
    border-radius: var(--ha-card-border-radius, 12px);
    background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
    min-width: 0;
  }

  .tile.muted {
    color: var(--secondary-text-color);
    justify-content: center;
    align-items: flex-start;
  }

  .tile-head {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--secondary-text-color);
    font-size: 0.8rem;
    font-weight: 500;
  }

  .tile-head ha-icon {
    --mdc-icon-size: 16px;
    color: var(--rohlik-accent);
  }

  .tile-time {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tile-caption {
    color: var(--secondary-text-color);
    font-size: 0.8rem;
  }

  .tile-subtitle {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .tile-unavailable {
    font-size: 0.9rem;
  }

  .capacity-bar {
    height: 4px;
    border-radius: 2px;
    background: var(--divider-color);
    overflow: hidden;
    margin-top: 2px;
  }

  .capacity-fill {
    height: 100%;
    border-radius: 2px;
    background: var(--rohlik-accent);
  }

  .capacity-fill.warn {
    background: var(--warning-color, #ff9800);
  }

  .capacity-fill.err {
    background: var(--error-color, #db4437);
  }

  .capacity-msg {
    color: var(--secondary-text-color);
    font-size: 0.7rem;
  }
`,Ze={cs:{title:"Termíny rozvozu",slot_express:"Expres",slot_standard:"Standard",slot_eco:"Eko",express_available:"Expres k dispozici",no_express:"Bez expresu",watch_toggle:"Sledovat expres",watch_error:"Aktualizace se nezdařila",no_entities:"Na tomto zařízení nebyly nalezeny entity Rohlík.cz",layout_row:"Řádek",layout_column:"Sloupec"},en:{title:"Delivery slots",slot_express:"Express",slot_standard:"Standard",slot_eco:"Eco",express_available:"Express available",no_express:"No express",watch_toggle:"Watch express",watch_error:"Refresh failed",no_entities:"Rohlík.cz entities not found on this device",layout_row:"Row",layout_column:"Column"}},Ve={cs:{device:"Zařízení",name:"Vlastní název",slots:"Zobrazené sloty",layout:"Rozložení",show_price:"Zobrazit cenu",show_location:"Zobrazit adresu",watch_interval:"Interval sledování (s)"},en:{device:"Device",name:"Custom name",slots:"Slots shown",layout:"Layout",show_price:"Show price",show_location:"Show location",watch_interval:"Watch interval (s)"}};let Ke=class extends he{constructor(){super(...arguments),this.labels=Ve}extraSchema(){const t=t=>Mt(this.hass,Ze,t);return[{name:"slots",selector:{select:{multiple:!0,mode:"list",options:[{value:"express",label:t("slot_express")},{value:"standard",label:t("slot_standard")},{value:"eco",label:t("slot_eco")}]}}},{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"row",label:t("layout_row")},{value:"column",label:t("layout_column")}]}}},{name:"show_price",selector:{boolean:{}}},{name:"show_location",selector:{boolean:{}}},{name:"watch_interval",selector:{number:{mode:"box",min:10,max:300}}}]}};Ke=t([ct("rohlik-slots-card-editor")],Ke);let We=class extends Ht{constructor(){super(...arguments),this.strings=Ze,this.watching=!1,this.pollError=null,this.onVisibilityChange=()=>this.syncPolling(),this.toggleWatch=()=>{this.watching=!this.watching,this.saveWatchFlag(this.watching),this.watching&&(this.pollError=null)}}static getConfigElement(){return document.createElement("rohlik-slots-card-editor")}static getStubConfig(t){return{...Ht.getStubConfig(t),type:"custom:rohlik-slots-card",slots:[...je],show_price:!0,show_location:!0,watch_interval:15,layout:"row"}}getGridOptions(){return"column"===this.config?.layout?{columns:4,rows:4,min_columns:3,min_rows:3}:{columns:12,rows:2,min_columns:6,min_rows:2}}setConfig(t){super.setConfig(t),this.watching=this.loadWatchFlag()}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this.onVisibilityChange),this.syncPolling()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("visibilitychange",this.onVisibilityChange),this.stopPolling()}willUpdate(t){super.willUpdate(t),this.syncPolling()}watchStorageKey(){const t=this.config?.device;return t?`rohlik-slots-watch:${t}`:null}loadWatchFlag(){const t=this.watchStorageKey();if(!t)return!1;try{return"1"===localStorage.getItem(t)}catch{return!1}}saveWatchFlag(t){const e=this.watchStorageKey();if(e)try{localStorage.setItem(e,t?"1":"0")}catch{}}syncPolling(){const t=this.watching&&"visible"===document.visibilityState&&!!this.config,e=Math.max(10,this.config?.watch_interval??15);t?void 0!==this.pollTimer&&this.pollSeconds===e||(this.stopPolling(),this.pollTimer=setInterval(()=>{this.poll()},1e3*e),this.pollSeconds=e):this.stopPolling()}stopPolling(){void 0!==this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=void 0),this.pollSeconds=void 0}async poll(){const t=this.entityId("express_slot")??this.entityId("standard_slot")??this.entityId("eco_slot");if(t&&this.hass)try{const e=await Zt(this.hass,t);if(!e)throw new Error("no config entry");await Vt(this.hass,e,"refresh_slots"),this.pollError=null}catch{this.pollError=this.t("watch_error")}}slotsToShow(){const t=this.config?.slots;return t&&t.length>0?t:je}render(){if(!this.config)return Z;if(0===this.entities.size)return B`
        <ha-card style=${wt(this.accentStyle)}>${this.renderError(this.t("no_entities"))}</ha-card>
      `;const t=this.slotsToShow(),e=this.isOn("is_express_available"),r=!1!==this.config.show_location,i=this.attr("first_delivery","delivery_location");return B`
      <ha-card style=${wt(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:calendar-clock"></ha-icon>
          <span class="title">${this.config.name||this.t("title")}</span>
          <button
            class=${yt({chip:!0,neutral:!this.watching,"watch-btn":!0,watching:this.watching})}
            @click=${this.toggleWatch}
            aria-pressed=${this.watching}
          >
            <ha-icon icon=${this.watching?"mdi:eye":"mdi:eye-outline"}></ha-icon>
            ${this.t("watch_toggle")}
            ${this.watching?B`<span class="pulse-dot"></span>`:Z}
          </button>
          <span class="chip ${e?"warn":"neutral"}">
            ${e?this.t("express_available"):this.t("no_express")}
          </span>
        </div>

        ${r&&"string"==typeof i&&i?B`
              <div class="location">
                <ha-icon icon="mdi:map-marker"></ha-icon>
                <span>${i}</span>
              </div>
            `:Z}
        ${this.pollError?this.renderError(this.pollError):Z}

        <div
          class=${yt({"slots-grid":!0,column:"column"===this.config.layout})}
          style=${wt({"--rohlik-slot-count":String(t.length)})}
        >
          ${t.map(t=>this.renderTile(t))}
        </div>

        ${this.renderFreshness()}
      </ha-card>
    `}renderTile(t){const e=function(t,e){const r=e?.attributes??{},i=At(e?.state);return{type:t,start:i,end:At(r["Delivery Slot End"]),price:Fe(r.Price),capacityPercent:Fe(r["Remaining Capacity Percent"]),capacityMessage:Le(r["Remaining Capacity Message"]),title:Le(r.Title),subtitle:Le(r.Subtitle),available:null!==i}}(t,this.state(`${t}_slot`)),r=He[t],i=e.title||this.t(`slot_${t}`);return e.available?B`
      <div class="tile">
        <div class="tile-head"><ha-icon icon=${r}></ha-icon><span>${i}</span></div>
        <div class="tile-time">${Ot(this.hass,e.start,{today:this.t("today"),tomorrow:this.t("tomorrow")})}</div>
        ${e.subtitle?B`<div class="tile-subtitle">${e.subtitle}</div>`:Z}
        ${this.renderPrice(e)}
        ${this.renderCapacity(e)}
      </div>
    `:B`
        <div class="tile muted">
          <div class="tile-head"><ha-icon icon=${r}></ha-icon><span>${i}</span></div>
          <div class="tile-unavailable">${this.t("unavailable")}</div>
        </div>
      `}renderPrice(t){if(!1===this.config.show_price||null==t.price)return Z;const e=0===t.price?this.t("free"):zt(this.hass,t.price);return B`<div class="tile-caption">${e}</div>`}renderCapacity(t){if(null==t.capacityPercent)return Z;const e=null==(r=t.capacityPercent)||Number.isNaN(r)?"err":r>=50?"ok":r>=10?"warn":"err";var r;return B`
      <div class="capacity-bar">
        <div
          class=${yt({"capacity-fill":!0,[e]:!0})}
          style=${wt({width:`${Be(t.capacityPercent)}%`})}
        ></div>
      </div>
      ${t.capacityMessage?B`<div class="capacity-msg">${t.capacityMessage}</div>`:Z}
    `}};We.styles=[jt,qe],t([pt()],We.prototype,"watching",void 0),t([pt()],We.prototype,"pollError",void 0),We=t([ct("rohlik-slots-card")],We),Bt({type:"rohlik-slots-card",name:"Rohlík.cz Delivery Slots",description:"Express, standard and eco delivery slot times, prices and remaining capacity.",preview:!0});const Qe=o`
  :host {
    container-type: inline-size;
    container-name: rohlik-account;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 4px;
  }

  @container rohlik-account (max-width: 320px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 320px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .stat-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    border-radius: 10px;
    background: color-mix(in srgb, var(--rohlik-accent) 15%, transparent);
  }

  .stat-icon ha-icon {
    color: var(--rohlik-accent);
    --mdc-icon-size: 20px;
  }

  .stat-body {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .stat-value {
    font-size: 1rem;
    font-weight: 600;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .stat-caption {
    color: var(--secondary-text-color);
    font-size: 0.72rem;
  }

  .stat-label {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .account-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-top: 12px;
    padding-top: 8px;
    border-top: 1px solid var(--divider-color);
  }

  .last-order {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .footer-right {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .footer-right .footer {
    margin-top: 0;
  }

  .icon-btn {
    padding: 4px;
    width: 28px;
    height: 28px;
  }

  ha-icon.spin {
    animation: rohlik-account-spin 1s linear infinite;
  }

  @keyframes rohlik-account-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`,Ye={cs:{title:"Účet",xtra_days:"Xtra · {days} dní",no_xtra:"Bez Xtra",stat_credit:"Kredit",stat_bags:"Tašky",stat_no_limit:"Objednávky bez limitu",stat_free_express:"Expres zdarma",stat_parents_club:"Rodičovský klub",stat_reusable:"Vratné tašky",deposit_caption:"záloha {amount}",remaining:"zbývá {n}",yes:"Ano",no:"Ne",last_order:"Poslední objednávka",refresh_failed:"Aktualizace se nezdařila",no_entities:"Na tomto zařízení nebyly nalezeny entity Rohlík.cz"},en:{title:"Account",xtra_days:"Xtra · {days} days",no_xtra:"No Xtra",stat_credit:"Credit",stat_bags:"Bags",stat_no_limit:"Orders without limit",stat_free_express:"Free express",stat_parents_club:"Parents Club",stat_reusable:"Reusable bags",deposit_caption:"{amount} deposit",remaining:"{n} left",yes:"Yes",no:"No",last_order:"Last order",refresh_failed:"Refresh failed",no_entities:"Rohlík.cz entities not found on this device"}},Ge={cs:{device:"Zařízení",name:"Vlastní název",stats:"Zobrazené statistiky",show_footer:"Zobrazit patičku"},en:{device:"Device",name:"Custom name",stats:"Stats shown",show_footer:"Show footer"}};let Je=class extends he{constructor(){super(...arguments),this.labels=Ge}extraSchema(){const t=t=>Mt(this.hass,Ye,t);return[{name:"stats",selector:{select:{multiple:!0,mode:"list",options:[{value:"credit",label:t("stat_credit")},{value:"bags",label:t("stat_bags")},{value:"no_limit",label:t("stat_no_limit")},{value:"free_express",label:t("stat_free_express")},{value:"parents_club",label:t("stat_parents_club")},{value:"reusable",label:t("stat_reusable")}]}}},{name:"show_footer",selector:{boolean:{}}}]}};Je=t([ct("rohlik-account-card-editor")],Je);const Xe=["credit","bags","no_limit","free_express","parents_club","reusable"];function tr(t){if(null==t||"unknown"===t||"unavailable"===t)return null;const e=Number(t);return Number.isNaN(e)?null:e}let er=class extends Ht{constructor(){super(...arguments),this.strings=Ye,this.refreshing=!1,this.refreshError=null,this.onRefresh=async()=>{if(this.refreshing)return;const t=this.entityId("credit_amount");if(t&&this.hass){this.refreshing=!0,this.refreshError=null;try{const e=await Zt(this.hass,t);if(!e)throw new Error("no config entry");await Vt(this.hass,e,"update_data")}catch{this.refreshError=this.t("refresh_failed")}finally{this.refreshing=!1}}}}static getConfigElement(){return document.createElement("rohlik-account-card-editor")}static getStubConfig(t){return{...Ht.getStubConfig(t),type:"custom:rohlik-account-card",stats:[...Xe],show_footer:!0}}getGridOptions(){return{columns:6,rows:3,min_columns:4,min_rows:2}}statsToShow(){const t=this.config?.stats;return t&&t.length>0?t:Xe}remainingDays(){const t=tr(this.state("premium_days")?.state);if(null!=t)return t;const e=this.attr("is_premium","remaining_days");return"number"==typeof e?e:null}statContent(t,e){switch(t){case"credit":{if(!this.entityId("credit_amount"))return null;const t=tr(this.state("credit_amount")?.state);return null==t?null:{icon:"mdi:cash-multiple",labelKey:"stat_credit",value:zt(this.hass,t)}}case"bags":{if(!this.entityId("bags_amount"))return null;const t=tr(this.state("bags_amount")?.state);if(null==t)return null;const e=this.attr("bags_amount","Max Bags"),r=this.attr("bags_amount","Deposit Amount"),i=this.attr("bags_amount","Deposit Currency"),s="number"==typeof e?`${t} / ${e}`:String(t);let n;if("number"==typeof r&&r>0){const t="string"==typeof i?i:"CZK";n=this.t("deposit_caption",{amount:zt(this.hass,r,t)})}return{icon:"mdi:shopping",labelKey:"stat_bags",value:s,caption:n}}case"no_limit":{if(!e||!this.entityId("no_limit"))return null;const t=tr(this.state("no_limit")?.state);return null==t?null:{icon:"mdi:cash-100",labelKey:"stat_no_limit",value:this.t("remaining",{n:t})}}case"free_express":{if(!e||!this.entityId("free_express"))return null;const t=tr(this.state("free_express")?.state);return null==t?null:{icon:"mdi:truck-fast",labelKey:"stat_free_express",value:this.t("remaining",{n:t})}}case"parents_club":return this.entityId("is_parent")?{icon:"mdi:human-male-female-child",labelKey:"stat_parents_club",value:this.isOn("is_parent")?this.t("yes"):this.t("no")}:null;case"reusable":return this.entityId("is_reusable")?{icon:"mdi:recycle",labelKey:"stat_reusable",value:this.isOn("is_reusable")?this.t("yes"):this.t("no")}:null;default:return null}}render(){if(!this.config)return Z;if(0===this.entities.size)return B`
        <ha-card style=${wt(this.accentStyle)}>${this.renderError(this.t("no_entities"))}</ha-card>
      `;const t=this.isOn("is_premium"),e=this.statsToShow();return B`
      <ha-card style=${wt(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:account-star"></ha-icon>
          <span class="title">${this.deviceName()}</span>
          ${this.renderHeaderChip(t)}
        </div>

        <div class="stats-grid">${e.map(e=>this.renderStat(e,t))}</div>

        ${!1!==this.config.show_footer?this.renderFooter():Z}
      </ha-card>
    `}renderHeaderChip(t){if(!t)return B`<span class="chip neutral">${this.t("no_xtra")}</span>`;const e=this.remainingDays();return B`
      <span class="chip ${null!=e&&e<7?"warn":"ok"}">${this.t("xtra_days",{days:e??"—"})}</span>
    `}renderStat(t,e){const r=this.statContent(t,e);return r?B`
      <div class="stat">
        <div class="stat-icon"><ha-icon icon=${r.icon}></ha-icon></div>
        <div class="stat-body">
          <span class="stat-value">${r.value}</span>
          ${r.caption?B`<span class="stat-caption">${r.caption}</span>`:Z}
          <span class="stat-label">${this.t(r.labelKey)}</span>
        </div>
      </div>
    `:Z}renderFooter(){return B`
      <div class="account-footer">
        ${this.renderLastOrderLine()}
        <div class="footer-right">
          ${this.renderFreshness()}
          <button
            class="btn ghost icon-btn"
            ?disabled=${this.refreshing}
            @click=${this.onRefresh}
            title=${this.t("refresh")}
          >
            <ha-icon icon="mdi:refresh" class=${yt({spin:this.refreshing})}></ha-icon>
          </button>
        </div>
      </div>
      ${this.refreshError?this.renderError(this.refreshError):Z}
    `}renderLastOrderLine(){const t=At(this.state("last_order")?.state);if(!t)return Z;const e=this.attr("last_order","Items"),r=this.attr("last_order","Price"),i=new Intl.DateTimeFormat(this.hass.locale?.language||"en",{day:"numeric",month:"short"}).format(t),s=[`${this.t("last_order")} ${i}`];return"number"==typeof e&&s.push(`${e} ${this.t("items")}`),"number"==typeof r&&s.push(zt(this.hass,r)),B`<div class="last-order">${s.join(" · ")}</div>`}};er.styles=[jt,Qe],t([pt()],er.prototype,"refreshing",void 0),t([pt()],er.prototype,"refreshError",void 0),er=t([ct("rohlik-account-card")],er),Bt({type:"rohlik-account-card",name:"Rohlík.cz Account",description:"Xtra membership status, credit, bags and account perks at a glance.",preview:!0});const rr=["l0","l1","l2","l3","items"],ir={l0:{year:"categories_l0_this_year",all:"categories_l0_all_time"},l1:{year:"categories_this_year",all:"categories_all_time"},l2:{year:"categories_l2_this_year",all:"categories_l2_all_time"},l3:{year:"categories_l3_this_year",all:"categories_l3_all_time"},items:{year:"items_this_year",all:"items_all_time"}};function sr(t,e){return ir[t][e]}function nr(t){if("number"==typeof t&&Number.isFinite(t))return t;if("string"==typeof t&&""!==t.trim()){const e=Number(t);if(Number.isFinite(e))return e}}const or={cs:{title:"Útraty",not_found:"Na tomto zařízení nebyly nalezeny entity Rohlík.cz",period_year:"Letos",period_all:"Celkem",avg_order:"průměrná objednávka",orders_count:"{n} objednávek",level_l0:"Hlavní",level_l1:"Kategorie",level_l2:"Podrobné",level_l3:"Nejpodrobnější",level_items:"Položky",expand_row:"{units} ks · {avg} za kus",enable_hint:"Rozpis zobrazíte zapnutím Analýzy útrat v nastavení integrace.",enriched:"obohaceno {enriched} z {total} objednávek"},en:{title:"Spending",not_found:"Rohlík.cz entities not found on this device",period_year:"This year",period_all:"All time",avg_order:"avg order",orders_count:"{n} orders",level_l0:"Top",level_l1:"Categories",level_l2:"Detailed",level_l3:"Specific",level_items:"Items",expand_row:"{units} units · {avg} per unit",enable_hint:"Enable Spending Analytics in the integration options to see a breakdown.",enriched:"{enriched} of {total} orders enriched"}},ar={cs:{device:"Zařízení",name:"Vlastní název",default_period:"Výchozí období",default_level:"Výchozí úroveň",top_n:"Počet položek",show_years:"Zobrazit graf let",show_totals:"Zobrazit souhrn"},en:{device:"Device",name:"Custom name",default_period:"Default period",default_level:"Default level",top_n:"Row count",show_years:"Show year chart",show_totals:"Show totals"}},lr=o`
  .segmented {
    display: inline-flex;
    padding: 2px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    gap: 2px;
  }

  .pill {
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    font-size: 0.78rem;
    font-weight: 500;
    padding: 4px 12px;
    border-radius: 999px;
    cursor: pointer;
    white-space: nowrap;
    font-family: inherit;
  }

  .pill.active {
    background: var(--rohlik-accent);
    color: var(--text-primary-color, #fff);
  }

  .pills-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 10px;
  }

  .totals {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 16px;
  }

  .totals-cell {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .totals-value {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .totals-caption {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .years-chart {
    display: block;
    width: 100%;
    height: auto;
    margin-bottom: 16px;
    overflow: visible;
  }

  .years-chart text {
    font-family: inherit;
  }

  .breakdown-hint {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
    padding: 8px 0;
  }

  .breakdown-row {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 7px 0;
    border-bottom: 1px solid var(--divider-color);
    cursor: pointer;
  }

  .breakdown-row:last-child {
    border-bottom: none;
  }

  .breakdown-main {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .breakdown-name {
    flex: 0 0 auto;
    width: 38%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--primary-text-color);
    font-size: 0.88rem;
  }

  .breakdown-bar-track {
    flex: 1;
    height: 10px;
    border-radius: 5px;
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    overflow: hidden;
  }

  .breakdown-bar-fill {
    height: 100%;
    border-radius: 5px;
    background: var(--rohlik-accent);
    opacity: 0.9;
  }

  .breakdown-spent {
    flex: 0 0 auto;
    min-width: 64px;
    text-align: right;
    font-variant-numeric: tabular-nums;
    color: var(--primary-text-color);
    font-size: 0.88rem;
  }

  .breakdown-expand {
    padding-left: calc(38% + 10px);
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .breakdown-footer {
    margin-top: 4px;
    color: var(--secondary-text-color);
    font-size: 0.72rem;
  }
`,cr={cs:{year:"Letos",all:"Celkem"},en:{year:"This year",all:"All time"}},dr={cs:{l0:"Hlavní",l1:"Kategorie",l2:"Podrobné",l3:"Nejpodrobnější",items:"Položky"},en:{l0:"Top",l1:"Categories",l2:"Detailed",l3:"Specific",items:"Items"}};let hr=class extends he{constructor(){super(...arguments),this.labels=ar}extraSchema(){return[{name:"default_period",selector:{select:{mode:"dropdown",options:["year","all"].map(t=>({value:t,label:Mt(this.hass,cr,t)}))}}},{name:"default_level",selector:{select:{mode:"dropdown",options:rr.map(t=>({value:t,label:Mt(this.hass,dr,t)}))}}},{name:"top_n",selector:{number:{min:1,max:50,mode:"box"}}},{name:"show_years",selector:{boolean:{}}},{name:"show_totals",selector:{boolean:{}}}]}};hr=t([ct("rohlik-spending-card-editor")],hr);let ur=class extends Ht{constructor(){super(...arguments),this.strings=or,this.expanded=new Set,this.hasSensor=t=>void 0!==this.entityId(t)}static getConfigElement(){return document.createElement("rohlik-spending-card-editor")}static getStubConfig(t){return{...Ht.getStubConfig(t),type:"custom:rohlik-spending-card"}}getCardSize(){return 6}getGridOptions(){return{columns:12,rows:5,min_columns:6,min_rows:3}}get effectivePeriod(){return this.period??this.config?.default_period??"year"}get levelsForCurrentPeriod(){return t=this.hasSensor,e=this.effectivePeriod,rr.filter(r=>t(sr(r,e)));var t,e}get hasAnyAnalytics(){return rr.some(t=>this.hasSensor(sr(t,"year"))||this.hasSensor(sr(t,"all")))}get effectiveLevel(){const t=this.levelsForCurrentPeriod;if(0===t.length)return;const e=this.level??this.config?.default_level??"l1";return t.includes(e)?e:t[0]}render(){if(!this.config)return Z;if(!this.state("monthly_spent"))return B`<ha-card style=${wt(this.accentStyle)}>
        ${this.renderError(this.t("not_found"))}
      </ha-card>`;const t=this.effectivePeriod,e=!1!==this.config.show_totals,r=!1!==this.config.show_years;return B`
      <ha-card style=${wt(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:chart-timeline-variant"></ha-icon>
          <span class="title">${this.t("title")}</span>
          <div class="segmented">
            <button
              class=${yt({pill:!0,active:"year"===t})}
              type="button"
              @click=${()=>this.period="year"}
            >
              ${this.t("period_year")}
            </button>
            <button
              class=${yt({pill:!0,active:"all"===t})}
              type="button"
              @click=${()=>this.period="all"}
            >
              ${this.t("period_all")}
            </button>
          </div>
        </div>

        ${e?this.renderTotals(t):Z}
        ${r?this.renderYearsChart():Z}
        ${this.renderBreakdown(t)}
        ${this.renderFreshness()}
      </ha-card>
    `}renderTotals(t){const e=this.state("monthly_spent"),r=Number(e?.state),i=new Intl.DateTimeFormat(this.hass.locale?.language||"en",{month:"long"}).format(new Date),s=this.state("yearly_spent"),n=Number(s?.state),o=s?.attributes?.year,a=Number(s?.attributes?.order_count??0),l=void 0!==o?`${o} · ${this.t("orders_count",{n:a})}`:this.t("orders_count",{n:a});let c,d;if("year"===t)c=Number(s?.attributes?.average_order_value),d=this.t("avg_order");else{const t=this.state("alltime_spent");c=Number(t?.attributes?.average_order_value);const e=Number(t?.attributes?.order_count??0);d=this.t("orders_count",{n:e})}return B`
      <div class="totals">
        <div class="totals-cell">
          <div class="totals-value">
            ${Number.isFinite(r)?zt(this.hass,r):"–"}
          </div>
          <div class="totals-caption">${i}</div>
        </div>
        <div class="totals-cell">
          <div class="totals-value">
            ${Number.isFinite(n)?zt(this.hass,n):"–"}
          </div>
          <div class="totals-caption">${l}</div>
        </div>
        <div class="totals-cell">
          <div class="totals-value">
            ${void 0!==c&&Number.isFinite(c)?zt(this.hass,c):"–"}
          </div>
          <div class="totals-caption">${d}</div>
        </div>
      </div>
    `}renderYearsChart(){const t=function(t){if(!t||"object"!=typeof t)return[];const e=[];for(const[r,i]of Object.entries(t)){const t=Number(r);if(!Number.isFinite(t))continue;if(!i||"object"!=typeof i)continue;const s=i;e.push({year:t,total:nr(s.total)??0,orderCount:nr(s.order_count)??0})}return e.sort((t,e)=>t.year-e.year),e}(this.state("alltime_spent")?.attributes?.by_year);if(t.length<2)return Z;const e=(new Date).getFullYear(),r=t.reduce((t,e)=>Math.max(t,e.total),0)||1,i=40*t.length-12+12;return B`
      <svg
        class="years-chart"
        viewBox="0 0 ${i} ${118}"
        preserveAspectRatio="xMidYMid meet"
        role="img"
      >
        ${ze(t,t=>t.year,(t,i)=>{const s=Math.max(2,t.total/r*90),n=6+40*i,o=90-s+6,a=t.year===e?"var(--rohlik-accent)":"color-mix(in srgb, var(--primary-text-color) 15%, transparent)";return B`
              <rect x=${n} y=${o} width=${28} height=${s} rx="4" fill=${a}>
                <title>${zt(this.hass,t.total)}</title>
              </rect>
              <text
                x=${n+14}
                y=${112}
                text-anchor="middle"
                font-size="10.5"
                fill="var(--secondary-text-color)"
              >
                ${t.year}
              </text>
            `})}
      </svg>
    `}renderBreakdown(t){if(!this.hasAnyAnalytics)return B`<div class="breakdown-hint">${this.t("enable_hint")}</div>`;const e=this.levelsForCurrentPeriod,r=this.effectiveLevel;if(!r)return Z;const i=this.config.top_n??10,s=this.state(sr(r,t)),{entries:n,enrichedOrders:o,totalOrders:a}=function(t,e){const r=t?.attributes??{},i=r.categories??r.items,s=Array.isArray(i)?i:[],n=[];for(const t of s){if(!t||"object"!=typeof t)continue;const e=t,r="string"==typeof e.name&&""!==e.name.trim()?e.name:void 0,i=nr(e.spent);r&&void 0!==i&&n.push({name:r,spent:i,units:nr(e.units)??0,avgUnitPrice:nr(e.avg_unit_price)??0,id:"string"==typeof e.id||"number"==typeof e.id?e.id:void 0})}n.sort((t,e)=>e.spent-t.spent);const o=nr(r.total_count)??n.length,a=nr(r.enriched_orders),l=nr(r.total_orders);return{entries:n.slice(0,Math.max(0,e)),totalCount:o,enrichedOrders:a,totalOrders:l}}(s,i),l=function(t){const e=t.reduce((t,e)=>Math.max(t,e.spent),0);return e<=0?t.map(()=>0):t.map(t=>Math.max(0,Math.min(100,t.spent/e*100)))}(n);return B`
      ${e.length>1?B`
            <div class="pills-row">
              ${ze(e,t=>t,t=>B`
                  <button
                    class=${yt({pill:!0,active:r===t})}
                    type="button"
                    @click=${()=>this.level=t}
                  >
                    ${this.t(`level_${t}`)}
                  </button>
                `)}
            </div>
          `:Z}
      ${ze(n,t=>t.id??t.name,(t,e)=>this.renderBreakdownRow(t,l[e]))}
      ${void 0!==o&&void 0!==a?B`
            <div class="breakdown-footer">
              ${this.t("enriched",{enriched:o,total:a})}
            </div>
          `:Z}
    `}renderBreakdownRow(t,e){const r=String(t.id??t.name),i=this.expanded.has(r);return B`
      <div
        class="breakdown-row"
        @click=${()=>this.toggleExpanded(r)}
        @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.toggleExpanded(r))}}
        role="button"
        tabindex="0"
      >
        <div class="breakdown-main">
          <span class="breakdown-name">${t.name}</span>
          <span class="breakdown-bar-track">
            <span
              class="breakdown-bar-fill"
              style=${wt({width:`${e}%`})}
            ></span>
          </span>
          <span class="breakdown-spent">${zt(this.hass,t.spent)}</span>
        </div>
        ${i?B`
              <div class="breakdown-expand">
                ${this.t("expand_row",{units:t.units,avg:zt(this.hass,t.avgUnitPrice)})}
              </div>
            `:Z}
      </div>
    `}toggleExpanded(t){const e=new Set(this.expanded);e.has(t)?e.delete(t):e.add(t),this.expanded=e}};ur.styles=[jt,lr],t([pt()],ur.prototype,"period",void 0),t([pt()],ur.prototype,"level",void 0),t([pt()],ur.prototype,"expanded",void 0),ur=t([ct("rohlik-spending-card")],ur),Bt({type:"rohlik-spending-card",name:"Rohlík.cz Spending",description:"Monthly, yearly and all-time spending totals with a category breakdown."});
