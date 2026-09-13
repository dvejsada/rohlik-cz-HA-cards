function t(t,e,r,i){var s,o=arguments.length,n=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(o<3?s(n):o>3?s(e,r,n):s(e,r))||n);return o>3&&n&&Object.defineProperty(e,r,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,r=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let o=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const r=void 0!==e&&1===e.length;r&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&s.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,r,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[i+1],t[0]);return new o(r,t,i)},a=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,g=m.trustedTypes,f=g?g.emptyScript:"",v=m.reactiveElementPolyfillSupport,y=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch(t){r=null}}return r}},_=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(t,r,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){const{get:i,set:s}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);s?.call(this,e),this.requestUpdate(t,o,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const r of e)this.createProperty(r,t[r])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const r=this._$Eu(t,e);void 0!==r&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const t of r)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(r)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const r of i){const i=document.createElement("style"),s=e.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=r.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){const r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(void 0!==i&&!0===r.reflect){const s=(void 0!==r.converter?.toAttribute?r.converter:b).toAttribute(e,r.type);this._$Em=t,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(t,e){const r=this.constructor,i=r._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=r.getPropertyOptions(i),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=i;const o=s.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,r,i=!1,s){if(void 0!==t){const o=this.constructor;if(!1===i&&(s=this[t]),r??=o.getPropertyOptions(t),!((r.hasChanged??_)(s,e)||r.useDefault&&r.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,r))))return;this.C(t,e,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:s},o){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,r]of t){const{wrapped:t}=r,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,r,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,v?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,k=t=>t,S=$.trustedTypes,A=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,z="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,I=`<${C}>`,O=document,R=()=>O.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,D="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,j=/>/g,U=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,F=/"/g,H=/^(?:script|style|textarea|title)$/i,B=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),q=B(1),K=B(2),Z=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,Q=O.createTreeWalker(O,129);function Y(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}class G{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let s=0,o=0;const n=t.length-1,a=this.parts,[l,c]=((t,e)=>{const r=t.length-1,i=[];let s,o=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<r;e++){const r=t[e];let a,l,c=-1,h=0;for(;h<r.length&&(n.lastIndex=h,l=n.exec(r),null!==l);)h=n.lastIndex,n===N?"!--"===l[1]?n=M:void 0!==l[1]?n=j:void 0!==l[2]?(H.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=U):void 0!==l[3]&&(n=U):n===U?">"===l[0]?(n=s??N,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?U:'"'===l[3]?F:L):n===F||n===L?n=U:n===M||n===j?n=N:(n=U,s=void 0);const d=n===U&&t[e+1].startsWith("/>")?" ":"";o+=n===N?r+I:c>=0?(i.push(a),r.slice(0,c)+z+r.slice(c)+E+d):r+E+(-2===c?e:d)}return[Y(t,o+(t[r]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]})(t,e);if(this.el=G.createElement(l,r),Q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=Q.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(z)){const e=c[o++],r=i.getAttribute(t).split(E),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:r,ctor:"."===n[1]?rt:"?"===n[1]?it:"@"===n[1]?st:et}),i.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:s}),i.removeAttribute(t));if(H.test(i.tagName)){const t=i.textContent.split(E),e=t.length-1;if(e>0){i.textContent=S?S.emptyScript:"";for(let r=0;r<e;r++)i.append(t[r],R()),Q.nextNode(),a.push({type:2,index:++s});i.append(t[e],R())}}}else if(8===i.nodeType)if(i.data===C)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=i.data.indexOf(E,t+1));)a.push({type:7,index:s}),t+=E.length-1}s++}}static createElement(t,e){const r=O.createElement("template");return r.innerHTML=t,r}}function J(t,e,r=t,i){if(e===Z)return e;let s=void 0!==i?r._$Co?.[i]:r._$Cl;const o=P(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,r,i)),void 0!==i?(r._$Co??=[])[i]=s:r._$Cl=s),void 0!==s&&(e=J(t,s._$AS(t,e.values),s,i)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,i=(t?.creationScope??O).importNode(e,!0);Q.currentNode=i;let s=Q.nextNode(),o=0,n=0,a=r[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new tt(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new ot(s,this,t)),this._$AV.push(e),a=r[++n]}o!==a?.index&&(s=Q.nextNode(),o++)}return Q.currentNode=O,i}p(t){let e=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),P(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==Z&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,i="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=G.createElement(Y(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new X(i,this),r=t.u(this.options);t.p(e),this.T(r),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new G(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,i=0;for(const s of t)i===e.length?e.push(r=new tt(this.O(R()),this.O(R()),this,this.options)):r=e[i],r._$AI(s),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,s){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=V}_$AI(t,e=this,r,i){const s=this.strings;let o=!1;if(void 0===s)t=J(this,t,e,0),o=!P(t)||t!==this._$AH&&t!==Z,o&&(this._$AH=t);else{const i=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=J(this,i[r+n],e,n),a===Z&&(a=this._$AH[n]),o||=!P(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}o&&!i&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class rt extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class it extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class st extends et{constructor(t,e,r,i,s){super(t,e,r,i,s),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??V)===Z)return;const r=this._$AH,i=t===V&&r!==V||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==V&&(r===V||i);i&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const nt={I:tt},at=$.litHtmlPolyfillSupport;at?.(G,tt),($.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ct=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,r)=>{const i=r?.renderBefore??e;let s=i._$litPart$;if(void 0===s){const t=r?.renderBefore??null;i._$litPart$=s=new tt(e.insertBefore(R(),t),t,void 0,r??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}};ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const ht=lt.litElementPolyfillSupport;ht?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt=t=>(e,r)=>{void 0!==r?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:_},ut=(t=pt,e,r)=>{const{kind:i,metadata:s}=r;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),o.set(r.name,t),"accessor"===i){const{name:i}=r;return{set(r){const s=e.get.call(this);e.set.call(this,r),this.requestUpdate(i,s,t,!0,r)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=r;return function(r){const s=this[i];e.call(this,r),this.requestUpdate(i,s,t,!0,r)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function mt(t){return(e,r)=>"object"==typeof r?ut(t,e,r):((t,e,r)=>{const i=e.hasOwnProperty(r);return e.constructor.createProperty(r,t),i?Object.getOwnPropertyDescriptor(e,r):void 0})(t,e,r)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function gt(t){return mt({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft=1,vt=2,yt=t=>(...e)=>({_$litDirective$:t,values:e});let bt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _t=yt(class extends bt{constructor(t){if(super(t),t.type!==ft||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const r=t.element.classList;for(const t of this.st)t in e||(r.remove(t),this.st.delete(t));for(const t in e){const i=!!e[t];i===this.st.has(t)||this.nt?.has(t)||(i?(r.add(t),this.st.add(t)):(r.remove(t),this.st.delete(t)))}return Z}}),wt="important",xt=" !"+wt,$t=yt(class extends bt{constructor(t){if(super(t),t.type!==ft||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const i=t[r];return null==i?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:r}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?r.removeProperty(t):r[t]=null);for(const t in e){const i=e[t];if(null!=i){this.ft.add(t);const e="string"==typeof i&&i.endsWith(xt);t.includes("-")||e?r.setProperty(t,e?i.slice(0,-11):i,e?wt:""):r[t]=i}}return Z}}),kt="rohlikcz";
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function St(t){const e=new Set;for(const r of Object.values(t.entities??{}))r.platform===kt&&r.device_id&&e.add(r.device_id);const r=[];for(const i of e){const e=t.devices?.[i];e&&r.push(e)}return r}const At=new Map;function zt(t,e){const r=t.entities??{},i=At.get(e);if(i&&i.entitiesRef===r)return i.map;const s=new Map;for(const t of Object.values(r))t.platform===kt&&t.device_id===e&&t.translation_key&&s.set(t.translation_key,t.entity_id);return At.set(e,{entitiesRef:r,map:s}),s}function Et(t){if(!t||"unknown"===t||"unavailable"===t)return null;const e=new Date(t);return Number.isNaN(e.getTime())?null:e}function Ct(t){return t.locale?.language||t.language||"en"}function It(t,e,r="CZK"){const i=Ct(t);if("CZK"===r){return`${new Intl.NumberFormat(i,{minimumFractionDigits:2,maximumFractionDigits:2}).format(e)} Kč`}try{return new Intl.NumberFormat(i,{style:"currency",currency:r,currencyDisplay:"narrowSymbol"}).format(e)}catch{return`${new Intl.NumberFormat(i).format(e)} ${r}`}}function Ot(t,e){return new Intl.DateTimeFormat(Ct(t),{hour:"2-digit",minute:"2-digit",hour12:!1}).format(e)}function Rt(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function Pt(t,e,r){const i=Ct(t),s=Ot(t,e),o=new Date;if(Rt(e,o))return`${r.today} ${s}`;const n=new Date(o);if(n.setDate(o.getDate()+1),Rt(e,n))return`${r.tomorrow} ${s}`;return`${new Intl.DateTimeFormat(i,{weekday:"short",day:"numeric",month:"short"}).format(e)} ${s}`}const Tt={en:{future:["in ",""],past:[""," ago"]},cs:{future:["za ",""],past:["před ",""]}};function Dt(t,e){const r=t.slice(0,2).toLowerCase();return(Tt[r]??Tt.en)[e]}function Nt(t,e,r){const i=r.replace(/s$/,"");return new Intl.NumberFormat(t,{style:"unit",unit:i,unitDisplay:"short"}).format(e)}function Mt(t,e,r){return`${t}${e}${r}`}function jt(t,e){const r=Ct(t),[i,s]=Dt(r,"past"),o=Math.max(0,Math.round((Date.now()-e.getTime())/1e3)),n=Math.round(o/60);if(o<60)return Mt(i,Nt(r,o,"seconds"),s);if(n<60)return Mt(i,Nt(r,n,"minutes"),s);const a=Math.round(n/60);if(a<24)return Mt(i,Nt(r,a,"hours"),s);return Mt(i,Nt(r,Math.round(a/24),"days"),s)}function Ut(t,e,r,i){const s=Ct(t).slice(0,2).toLowerCase(),o=e[s]?.[r]??e.en?.[r]??r;return i?o.replace(/\{(\w+)(?::([^{}]+))?\}/g,(t,e,r)=>Object.prototype.hasOwnProperty.call(i,e)?void 0===r?String(i[e]):function(t,e,r){if(e.length<2||Number.isNaN(r))return e[e.length-1]??"";const i=new Intl.PluralRules(t).select(r);return 2===e.length?"one"===i?e[0]:e[1]:"one"===i?e[0]:"few"===i?e[1]:e[e.length-1]}(s,r.split("|"),Number(i[e])):t):o}const Lt={cs:{today:"Dnes",tomorrow:"Zítra",updated_ago:"Aktualizováno {time}",refresh:"Obnovit",unavailable:"Nedostupné",error_generic:"Něco se nepovedlo",show_all:"Zobrazit vše ({count})",show_less:"Zobrazit méně",items:"položek",items_count:"{count} {count:položka|položky|položek}",free:"zdarma"},en:{today:"Today",tomorrow:"Tomorrow",updated_ago:"Updated {time}",refresh:"Refresh",unavailable:"Unavailable",error_generic:"Something went wrong",show_all:"Show all ({count})",show_less:"Show less",items:"items",items_count:"{count} {count:item|items}",free:"free"}},Ft=["cs","en"];function Ht(t,e){return e&&Ft.includes(e)?Ct(t).slice(0,2).toLowerCase()===e?t:{...t,language:e,locale:{...t.locale??{},language:e}}:t}const Bt=n`
  :host {
    --rohlik-accent: var(--primary-color);
    display: block;
    /* Lets cards adapt to their own width with @container queries. */
    container-type: inline-size;
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
    flex: 1 1 auto;
    min-width: 4em;
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
`;class qt extends ct{constructor(){super(...arguments),this.entities=new Map}get hass(){return this._localeHass??this._hass}set hass(t){const e=this.hass;this._hass=t,this._localeHass=this.applyLanguage(t),this.requestUpdate("hass",e)}get rawHass(){return this._hass}applyLanguage(t){if(!t||!this.config?.language||"auto"===this.config.language)return;const e=Ht(t,this.config.language);return e===t?void 0:e}setConfig(t){if(!t?.device)throw new Error("Rohlík card: 'device' is required — pick the Rohlík.cz device in the card editor.");this.config=t,this._localeHass=this.applyLanguage(this._hass),this.hass&&(this.entities=zt(this.hass,this.config.device))}willUpdate(t){t.has("hass")&&this.hass&&this.config&&(this.entities=zt(this.hass,this.config.device))}getCardSize(){return 3}getGridOptions(){return{columns:12,rows:3,min_columns:6,min_rows:2}}static getStubConfig(t){const e=St(t);return{device:e[0]?.id??""}}entityId(t){return this.entities.get(t)}state(t){const e=this.entityId(t);return e?this.hass?.states?.[e]:void 0}attr(t,e){return this.state(t)?.attributes?.[e]}isOn(t){return"on"===this.state(t)?.state}deviceName(){if(this.config?.name)return this.config.name;const t=this.hass?.devices?.[this.config?.device];return t?.name_by_user||t?.name||"Rohlík.cz"}get accentStyle(){return this.config?.accent?{"--rohlik-accent":this.config.accent}:{}}t(t,e){return Ut(this.hass,{...Lt,...this.mergedStrings()},t,e)}mergedStrings(){const t={};for(const e of new Set([...Object.keys(Lt),...Object.keys(this.strings)]))t[e]={...Lt[e],...this.strings[e]};return t}renderFreshness(t="updated"){const e=Et(this.state(t)?.state);if(!e)return V;const r=Date.now()-e.getTime()>12e5;return q`
      <div class="footer ${r?"stale":""}">
        ${this.t("updated_ago",{time:jt(this.hass,e)})}
      </div>
    `}renderError(t){return q`<div class="error">${t}</div>`}}qt.styles=Bt,t([mt({attribute:!1})],qt.prototype,"hass",null),t([gt()],qt.prototype,"config",void 0),t([gt()],qt.prototype,"entities",void 0);let Kt=!1;function Zt(){Kt||(Kt=!0,console.info("%c ROHLIK-CARDS %c v0.1.0 ","color: white; background: #d4145a; font-weight: 700;","color: #d4145a; background: white; font-weight: 700;"))}function Vt(t){Zt(),window.customCards=window.customCards??[],window.customCards.push({preview:!0,...t})}const Wt=new Map;function Qt(t,e){const r=Wt.get(e);if(r)return r;const i=t.callWS({type:"config/entity_registry/get",entity_id:e}).then(t=>t.config_entry_id).catch(t=>{throw Wt.delete(e),t});return Wt.set(e,i),i}async function Yt(t,e,r,i,s=!1){const o=await t.callService("rohlikcz",r,{config_entry_id:e,...i},void 0,!0,s);return s?o.response:void 0}function Gt(t,e,r){const i=new CustomEvent(e,{detail:r,bubbles:!0,composed:!0});t.dispatchEvent(i)}function Jt(t,e){Gt(t,"hass-more-info",{entityId:e})}function Xt(t){return t.toString().padStart(2,"0")}function te(t){return`${Xt(t.getHours())}:${Xt(t.getMinutes())}`}function ee(t,e){const r=function(t,e){if(t.isOrdered)return t.since&&e.getTime()>=t.since.getTime()?"arriving":"ordered";const r=t.recentDelivery;if(r){const t=r.till??r.endedAt,i=Math.max(t.getTime(),r.endedAt.getTime());if(e.getTime()-i<=216e5)return"delivered"}return"none"}(t,e);let i=null;t.since&&t.till&&(i=`${te(t.since)}–${te(t.till)}`);let s=null;if("arriving"===r&&t.since&&t.till&&t.till.getTime()>t.since.getTime()){s=function(t){return Math.min(1,Math.max(0,t))}(((t.eta??e).getTime()-t.since.getTime())/(t.till.getTime()-t.since.getTime()))}const o="delivered"===r?t.lastOrderItems??null:t.orderData?.itemsCount??null,n="delivered"===r?t.lastOrderPrice??null:t.orderData?.priceComposition?.total?.amount??null,a=t.recentDelivery?t.recentDelivery.till??t.recentDelivery.endedAt:null,l=(t.slots??[]).filter(t=>null!=t.start).map(t=>({key:t.key,start:t.start,price:t.price??null}));return{state:r,since:t.since,till:t.till,eta:t.eta,progress:s,windowLabel:i,orderId:t.orderData?.id??null,summaryItems:o,summaryPrice:n,announcementText:t.announcementText??null,announcementExtra:t.announcementExtra??null,announcementUpdatedAt:t.announcementUpdatedAt??null,lastOrderAt:t.lastOrderAt??null,firstDeliveryText:t.firstDeliveryText??null,isReserved:t.isReserved,isExpressAvailable:t.isExpressAvailable,deliveredAt:a,slots:l}}const re=/till|until|expir|end/i,ie=/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}/;const se=216e5;function oe(t){return`rohlik-delivery-last:${t}`}function ne(t,e){let r;try{r=t.getItem(oe(e))}catch{return null}if(!r)return null;try{const t=JSON.parse(r);return t&&"object"==typeof t?{orderId:t.orderId??null,till:"string"==typeof t.till?t.till:null,seenAt:"string"==typeof t.seenAt?t.seenAt:null,endedAt:"string"==typeof t.endedAt?t.endedAt:null}:null}catch{return null}}function ae(t,e,r){try{t.setItem(oe(e),JSON.stringify(r))}catch{}}function le(t){if(!t.endedAt)return null;const e=new Date(t.endedAt);if(Number.isNaN(e.getTime()))return null;const r=t.till?new Date(t.till):null;return{orderId:t.orderId,till:r&&!Number.isNaN(r.getTime())?r:null,endedAt:e}}function ce(t,e,r,i=new Date){ae(t,e,{orderId:r.orderId,till:r.till?r.till.toISOString():null,seenAt:i.toISOString(),endedAt:null})}function he(t,e){const r=ne(t,e);return r?le(r):null}function de(t,e,r){const i=ne(t,e);if(!i)return null;if(i.endedAt)return le(i);if(function(t,e){const r=t.seenAt?new Date(t.seenAt):null;if(!r||Number.isNaN(r.getTime()))return!0;if(e.getTime()-r.getTime()>se)return!0;const i=t.till?new Date(t.till):null;return!!(i&&!Number.isNaN(i.getTime())&&e.getTime()-i.getTime()>se)}(i,r))return pe(t,e),null;const s={...i,endedAt:r.toISOString()};return ae(t,e,s),le(s)}function pe(t,e){try{t.removeItem(oe(e))}catch{}}function ue(){try{if("undefined"!=typeof window&&window.localStorage)return window.localStorage}catch{}return{getItem:()=>null,setItem:()=>{},removeItem:()=>{}}}const me=n`
  .header {
    cursor: pointer;
  }

  .header.static {
    cursor: default;
  }

  .header:focus-visible,
  .compact-row:focus-visible {
    outline: 2px solid var(--rohlik-accent, var(--primary-color));
    outline-offset: 2px;
  }

  /* The title keeps a floor and the chips shrink (wrapping) first, so three
     chips can never squeeze the title to zero width in a mid-width card. */
  .header .title {
    flex: 1 1 auto;
    min-width: 5em;
  }

  .chips {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    flex: 0 1 auto;
    min-width: 0;
    flex-wrap: wrap;
  }

  .headline {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin: 4px 0 2px;
  }

  .caption {
    display: block;
    color: var(--secondary-text-color);
    font-size: 13px;
    margin: 0 0 4px;
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

  /* Flexbox won't let a flex child's text wrap unless it can shrink below
     its content width — the announcement row is inside .row (a flex
     container from core/styles.ts), so give it a floor of 0 explicitly. */
  .row .announce {
    min-width: 0;
    flex: 1;
  }

  .reserved-line {
    color: var(--secondary-text-color);
    font-size: 0.8rem;
    margin-bottom: 4px;
  }

  .slots {
    display: flex;
    flex-direction: column;
    margin: 4px 0;
  }

  .slot-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 0;
    border-bottom: 1px solid var(--divider-color);
    font-size: 0.85rem;
  }

  .slot-row:last-child {
    border-bottom: none;
  }

  .slot-row ha-icon {
    color: var(--rohlik-accent, var(--primary-color));
    --mdc-icon-size: 18px;
    flex-shrink: 0;
  }

  .slot-label {
    flex: 1;
    min-width: 0;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .slot-day {
    color: var(--secondary-text-color);
    white-space: nowrap;
  }

  .slot-price {
    font-weight: 500;
    color: var(--primary-text-color);
    min-width: 60px;
    text-align: right;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
  }

  .actions a.btn {
    text-decoration: none;
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

  /* :host sets container-type: inline-size (core/styles.ts) — this queries
     the card's own rendered width, not the viewport, so it also kicks in
     for a narrow column in a dashboard grid, not just a phone screen. */
  @container (max-width: 520px) {
    .header {
      flex-wrap: wrap;
      row-gap: 6px;
    }

    .header .chips {
      /* Forces a wrap point right before the chips, so they always land on
         their own line under the title instead of just shrinking it. */
      flex-basis: 100%;
    }

    .big {
      font-size: 26px;
    }

    .track-wrap {
      overflow: hidden;
    }

    .announce .text {
      overflow-wrap: break-word;
      word-break: break-word;
    }

    .slot-label {
      white-space: normal;
    }

    .actions {
      flex-direction: column;
      align-items: stretch;
    }

    .actions .btn {
      width: 100%;
    }
  }
`,ge={cs:{title:"Příští rozvoz",chip_arriving:"Na cestě",chip_ordered:"Objednáno",chip_delivered:"Doručeno",chip_none:"Bez objednávky",chip_express:"Expres k dispozici",chip_reserved:"Rezervovaný termín",estimated:"odhad",by:"do",delivered_caption:"doručeno",nearest_slot:"Nejbližší termín",window:"Okno",order:"objednávka",announcement_updated:"Aktualizováno {time}",refresh_failed:"Obnovení se nezdařilo",no_entities:"Na tomto zařízení nebyly nalezeny entity Rohlík.cz",reserved_until:"Rezervováno do {time}",shop_link:"Objednat znovu na rohlik.cz",slot_express:"Expres",slot_standard:"Standard",slot_eco:"Eko"},en:{title:"Next delivery",chip_arriving:"Arriving",chip_ordered:"Ordered",chip_delivered:"Delivered",chip_none:"No order",chip_express:"Express available",chip_reserved:"Slot reserved",estimated:"estimated",by:"by",delivered_caption:"delivered",nearest_slot:"nearest slot",window:"Window",order:"order",announcement_updated:"Updated {time}",refresh_failed:"Refresh failed",no_entities:"Rohlík.cz entities not found on this device",reserved_until:"Reserved until {time}",shop_link:"Order again on rohlik.cz",slot_express:"Express",slot_standard:"Standard",slot_eco:"Eco"}},fe={cs:{device:"Zařízení",name:"Vlastní název",show_announcement:"Zobrazit oznámení kurýra",show_order_summary:"Zobrazit shrnutí objednávky",show_express_chip:"Zobrazit chip Expres",show_refresh:"Zobrazit tlačítko Obnovit",show_slots:"Zobrazit termíny",show_shop_link:"Odkaz na obchod",compact:"Kompaktní zobrazení"},en:{device:"Device",name:"Custom name",show_announcement:"Show courier announcement",show_order_summary:"Show order summary",show_express_chip:"Show express chip",show_refresh:"Show refresh button",show_slots:"Show upcoming slots",show_shop_link:"Show shop link",compact:"Compact layout"}},ve=[{name:"device",required:!0,selector:{device:{integration:"rohlikcz"}}},{name:"name",selector:{text:{}}},{name:"language",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (Home Assistant)"},{value:"cs",label:"Čeština"},{value:"en",label:"English"}]}}}],ye={cs:{device:"Zařízení (účet Rohlík.cz)",name:"Vlastní název",language:"Jazyk karty"},en:{device:"Device (Rohlík.cz account)",name:"Custom name",language:"Card language"}};class be extends ct{constructor(){super(...arguments),this.defaults={},this.computeLabel=t=>{const e={};for(const t of new Set([...Object.keys(ye),...Object.keys(this.labels)]))e[t]={...ye[t],...this.labels[t]};return Ut(this.hass,e,t.name)||t.name},this.onValueChanged=t=>{t.stopPropagation();const e={...this.config,...t.detail.value};"auto"!==e.language&&""!==e.language||delete e.language;for(const[t,r]of Object.entries(this.defaults))t in e&&e[t]===r&&delete e[t];Gt(this,"config-changed",{config:e})}}setConfig(t){this.config=t}get schema(){return[...ve,...this.extraSchema()]}get formData(){return{language:"auto",...this.defaults,...this.config}}render(){return this.hass&&this.config?q`
      <ha-form
        .hass=${this.hass}
        .data=${this.formData}
        .schema=${this.schema}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    `:V}}t([gt()],be.prototype,"hass",void 0),t([gt()],be.prototype,"config",void 0);let _e=class extends be{constructor(){super(...arguments),this.labels=fe,this.defaults={show_announcement:!0,show_order_summary:!0,show_express_chip:!0,show_refresh:!0,show_slots:!0,show_shop_link:!0,compact:!1}}extraSchema(){return[{name:"show_announcement",selector:{boolean:{}}},{name:"show_order_summary",selector:{boolean:{}}},{name:"show_express_chip",selector:{boolean:{}}},{name:"show_refresh",selector:{boolean:{}}},{name:"show_slots",selector:{boolean:{}}},{name:"show_shop_link",selector:{boolean:{}}},{name:"compact",selector:{boolean:{}}}]}};_e=t([dt("rohlik-delivery-card-editor")],_e);const we={arriving:"ok",ordered:"neutral",delivered:"ok",none:"neutral"},xe=["express","standard","eco"],$e={express:"mdi:lightning-bolt",standard:"mdi:truck-delivery",eco:"mdi:leaf"};let ke=class extends qt{constructor(){super(...arguments),this.strings=ge,this.refreshing=!1,this.refreshError=null,this.onHeaderTap=()=>{if(this.tapDisabled)return;const t=this.entityId("is_ordered");t&&Jt(this,t)},this.onHeaderKeydown=t=>{this.tapDisabled||"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.onHeaderTap())},this.onRefresh=async t=>{if(t.stopPropagation(),this.refreshing)return;const e=this.entityId("is_ordered");if(e){this.refreshing=!0,this.refreshError=null;try{const t=await Qt(this.hass,e);if(!t)throw new Error("no config entry");const r=this.getView(),i="arriving"===r.state||"ordered"===r.state?"update_delivery_times":"refresh_slots";await Yt(this.hass,t,i)}catch{this.refreshError=this.t("refresh_failed")}finally{this.refreshing=!1}}}}static getConfigElement(){return document.createElement("rohlik-delivery-card-editor")}static getStubConfig(t){return{...qt.getStubConfig(t),type:"custom:rohlik-delivery-card"}}connectedCallback(){super.connectedCallback(),this.tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),void 0!==this.tickTimer&&(clearInterval(this.tickTimer),this.tickTimer=void 0)}getCardSize(){return this.config?.compact?2:4}getGridOptions(){return this.config?.compact?{columns:6,rows:2,min_columns:6,min_rows:2}:{columns:12,rows:3,min_columns:6,min_rows:2}}textState(t){const e=this.state(t)?.state;return e&&"unknown"!==e&&"unavailable"!==e?e:null}syncMemory(t){const e=this.config?.device;if(!e)return null;const r=ue(),i=this.state("is_ordered")?.state;if("on"!==i&&"off"!==i)return he(r,e);if(this.isOn("is_ordered")){const i=t?.id??null,s=he(r,e);return s&&null!=i&&s.orderId!==i&&pe(r,e),ce(r,e,{orderId:i,till:Et(this.state("next_order_till")?.state)}),null}return de(r,e,new Date)}buildInput(){const t=this.attr("is_ordered","order_data")??null;return{isOrdered:this.isOn("is_ordered"),since:Et(this.state("next_order_since")?.state),till:Et(this.state("next_order_till")?.state),eta:Et(this.state("delivery_time")?.state),orderData:t,announcementText:this.textState("delivery_info"),announcementExtra:this.attr("delivery_info","Additional Content")??null,announcementUpdatedAt:Et(this.attr("delivery_info","Updated At")),lastOrderAt:Et(this.state("last_order")?.state),lastOrderItems:this.attr("last_order","Items")??null,lastOrderPrice:this.attr("last_order","Price")??null,firstDeliveryText:this.textState("first_delivery"),isReserved:this.isOn("is_reserved"),isExpressAvailable:this.isOn("is_express_available"),recentDelivery:this.syncMemory(t),slots:xe.map(t=>({key:t,start:Et(this.state(`${t}_slot`)?.state),price:this.attr(`${t}_slot`,"Price")??null}))}}getView(){return ee(this.buildInput(),new Date)}get tapDisabled(){const t=this.config?.tap_action;return"none"===t||!(!t||"object"!=typeof t||"none"!==t.action)}render(){if(!this.config)return V;if(!this.entityId("is_ordered"))return q`
        <ha-card style=${$t(this.accentStyle)}>${this.renderError(this.t("no_entities"))}</ha-card>
      `;const t=this.getView();return q`
      <ha-card style=${$t(this.accentStyle)}>
        ${this.config.compact?this.renderCompact(t):this.renderFull(t)}
      </ha-card>
    `}renderChips(t){const e=!1!==this.config.show_express_chip&&t.isExpressAvailable,r="none"===t.state&&t.isReserved;return q`
      <div class="chips">
        <span class="chip ${we[t.state]}">${this.t(`chip_${t.state}`)}</span>
        ${e?q`<span class="chip warn">${this.t("chip_express")}</span>`:V}
        ${r?q`<span class="chip neutral">${this.t("chip_reserved")}</span>`:V}
      </div>
    `}renderCompact(t){return q`
      <div
        class="compact-row"
        @click=${this.onHeaderTap}
        @keydown=${this.onHeaderKeydown}
        role=${this.tapDisabled?V:"button"}
        tabindex=${this.tapDisabled?V:"0"}
      >
        <ha-icon icon="mdi:truck-delivery"></ha-icon>
        <div class="headline">
          <span class="big">${this.headlineMain(t)}</span>
        </div>
        <span class="chip ${we[t.state]}">${this.t(`chip_${t.state}`)}</span>
      </div>
    `}renderFull(t){const e=!1!==this.config.show_announcement&&("arriving"===t.state||"ordered"===t.state)&&!!t.announcementText,r=!1!==this.config.show_order_summary&&null!=t.summaryItems,i=!1!==this.config.show_refresh,s=!("arriving"!==t.state&&"ordered"!==t.state||!t.since||!t.till),o=!1!==this.config.show_slots&&"none"===t.state&&t.slots.length>0,n=!1!==this.config.show_shop_link&&"delivered"===t.state,a="none"===t.state&&t.isReserved?function(t){if(!t)return null;for(const[e,r]of Object.entries(t)){if(!re.test(e))continue;if("string"!=typeof r||!ie.test(r))continue;const t=new Date(r);if(!Number.isNaN(t.getTime()))return t}return null}(this.state("is_reserved")?.attributes):null,l=this.headlineCaption(t);return q`
      <div
        class=${_t({header:!0,static:this.tapDisabled})}
        @click=${this.onHeaderTap}
        @keydown=${this.onHeaderKeydown}
        role=${this.tapDisabled?V:"button"}
        tabindex=${this.tapDisabled?V:"0"}
      >
        <ha-icon icon="mdi:truck-delivery"></ha-icon>
        <span class="title">${this.config.name||this.t("title")}</span>
        ${this.renderChips(t)}
      </div>

      <div class="headline">
        <span class="big">${this.headlineMain(t)}</span>
      </div>
      ${l?q`<div class="caption">${l}</div>`:V}

      ${s?q`<div class="sub">${this.renderSub(t)}</div>`:V}
      ${"arriving"===t.state?this.renderTrack(t):V}
      ${a?q`<div class="reserved-line">${this.t("reserved_until",{time:Ot(this.hass,a)})}</div>`:V}
      ${o?this.renderSlots(t):V}
      ${e?q`<div class="row">${this.renderAnnouncement(t)}</div>`:V}
      ${r?q`<div class="row">${this.renderSummary(t)}</div>`:V}
      ${this.refreshError?q`<div class="error">${this.refreshError}</div>`:V}
      ${i||n?q`
            <div class="actions">
              ${n?q`
                    <a class="btn ghost" href="https://www.rohlik.cz" target="_blank" rel="noopener">
                      ${this.t("shop_link")}
                    </a>
                  `:V}
              ${i?q`
                    <button class="btn ghost" ?disabled=${this.refreshing} @click=${this.onRefresh}>
                      <ha-icon
                        icon="mdi:refresh"
                        class=${_t({spin:this.refreshing})}
                      ></ha-icon>
                      ${this.t("refresh")}
                    </button>
                  `:V}
            </div>
          `:V}
      ${this.renderFreshness()}
    `}renderSlots(t){return q`<div class="slots">${t.slots.map(t=>this.renderSlotRow(t))}</div>`}renderSlotRow(t){const e=Pt(this.hass,t.start,{today:this.t("today"),tomorrow:this.t("tomorrow")}),r=0===t.price?this.t("free"):null!=t.price?It(this.hass,t.price):"";return q`
      <div class="slot-row">
        <ha-icon icon=${$e[t.key]}></ha-icon>
        <span class="slot-label">${this.t(`slot_${t.key}`)}</span>
        <span class="slot-day">${e}</span>
        <span class="slot-price">${r}</span>
      </div>
    `}headlineMain(t){switch(t.state){case"arriving":return t.eta?Ot(this.hass,t.eta):t.till?Ot(this.hass,t.till):"—";case"ordered":return t.since?Pt(this.hass,t.since,{today:this.t("today"),tomorrow:this.t("tomorrow")}):"—";case"delivered":return t.deliveredAt?Ot(this.hass,t.deliveredAt):"—";default:return t.firstDeliveryText??"—"}}headlineCaption(t){switch(t.state){case"arriving":return this.t(t.eta?"estimated":"by");case"ordered":return t.since?function(t,e){const r=Ct(t),[i,s]=Dt(r,"future"),o=Math.max(0,Math.round((e.getTime()-Date.now())/1e3)),n=Math.round(o/60);if(o<60)return Mt(i,Nt(r,o,"seconds"),s);if(n<60)return Mt(i,Nt(r,n,"minutes"),s);const a=Math.floor(n/60),l=n%60;if(a<24){const t=Nt(r,a,"hours");return Mt(i,0===l?t:`${t} ${Nt(r,l,"minutes")}`,s)}return Mt(i,Nt(r,Math.round(n/60/24),"days"),s)}(this.hass,t.since):"";case"delivered":return this.t("delivered_caption");default:return this.t("nearest_slot")}}renderSub(t){if(!t.since||!t.till)return V;const e=Pt(this.hass,t.since,{today:this.t("today"),tomorrow:this.t("tomorrow")}),r=[`${this.t("window")} ${e} – ${Ot(this.hass,t.till)}`];return null!=t.orderId&&r.push(`${this.t("order")} ${t.orderId}`),q`${r.join(" · ")}`}renderTrack(t){if(!t.since||!t.till||null==t.progress)return V;const e=new Date((t.since.getTime()+t.till.getTime())/2);return q`
      <div class="track-wrap">
        <div class="track">
          <div class="track-fill" style=${$t({width:100*t.progress+"%"})}></div>
          <div class="track-marker" style=${$t({left:100*t.progress+"%"})}></div>
        </div>
        <div class="ticks">
          <span>${Ot(this.hass,t.since)}</span>
          <span>${Ot(this.hass,e)}</span>
          <span>${Ot(this.hass,t.till)}</span>
        </div>
      </div>
    `}renderAnnouncement(t){return q`
      <div class="announce">
        <span class="text">${t.announcementText}</span>
        <span class="meta">
          ${t.announcementUpdatedAt?this.t("announcement_updated",{time:Ot(this.hass,t.announcementUpdatedAt)}):V}
          ${t.announcementExtra?` · ${t.announcementExtra}`:V}
        </span>
      </div>
    `}renderSummary(t){const e=this.t("items_count",{count:t.summaryItems??0}),r=null!=t.summaryPrice?It(this.hass,t.summaryPrice):"";return q`<span>${[e,r].filter(Boolean).join(" · ")}</span>`}};ke.styles=[Bt,me],t([gt()],ke.prototype,"refreshing",void 0),t([gt()],ke.prototype,"refreshError",void 0),ke=t([dt("rohlik-delivery-card")],ke),Vt({type:"rohlik-delivery-card",name:"Rohlík.cz Next Delivery",description:"Shows the state of your next Rohlík.cz order: ordered, on its way, or delivered.",preview:!0});const Se={cs:{device:"Zařízení",name:"Vlastní název",show_name:"Zobrazit název zařízení"},en:{device:"Device",name:"Custom name",show_name:"Show device name"}};let Ae=class extends be{constructor(){super(...arguments),this.labels=Se}extraSchema(){return[{name:"show_name",selector:{boolean:{}}}]}};Ae=t([dt("rohlik-delivery-badge-editor")],Ae);let ze=class extends ct{constructor(){super(...arguments),this.entities=new Map,this.onClick=()=>{const t=this.entityId("is_ordered");t&&Jt(this,t)},this.onKeydown=t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.onClick())}}get hass(){return this._localeHass??this._hass}set hass(t){const e=this.hass;this._hass=t,this._localeHass=this.applyLanguage(t),this.requestUpdate("hass",e)}applyLanguage(t){if(!t||!this.config?.language||"auto"===this.config.language)return;const e=Ht(t,this.config.language);return e===t?void 0:e}setConfig(t){if(!t?.device)throw new Error("Rohlík badge: 'device' is required — pick the Rohlík.cz device in the badge editor.");this.config=t,this._localeHass=this.applyLanguage(this._hass),this.hass&&(this.entities=zt(this.hass,this.config.device))}willUpdate(t){t.has("hass")&&this.hass&&this.config&&(this.entities=zt(this.hass,this.config.device))}static getConfigElement(){return document.createElement("rohlik-delivery-badge-editor")}static getStubConfig(t){const e=St(t);return{device:e[0]?.id??""}}entityId(t){return this.entities.get(t)}entityState(t){const e=this.entityId(t);return e?this.hass?.states?.[e]:void 0}attr(t,e){return this.entityState(t)?.attributes?.[e]}isOn(t){return"on"===this.entityState(t)?.state}textState(t){const e=this.entityState(t)?.state;return e&&"unknown"!==e&&"unavailable"!==e?e:null}t(t,e){return Ut(this.hass,{...Lt,...ge},t,e)}deviceName(){if(this.config?.name)return this.config.name;const t=this.hass?.devices?.[this.config?.device];return t?.name_by_user||t?.name||"Rohlík.cz"}syncMemory(t){const e=this.config?.device;if(!e)return null;const r=ue(),i=this.entityState("is_ordered")?.state;if("on"!==i&&"off"!==i)return he(r,e);if(this.isOn("is_ordered")){const i=t?.id??null,s=he(r,e);return s&&null!=i&&s.orderId!==i&&pe(r,e),ce(r,e,{orderId:i,till:Et(this.entityState("next_order_till")?.state)}),null}return de(r,e,new Date)}buildInput(){const t=this.attr("is_ordered","order_data")??null;return{isOrdered:this.isOn("is_ordered"),since:Et(this.entityState("next_order_since")?.state),till:Et(this.entityState("next_order_till")?.state),eta:Et(this.entityState("delivery_time")?.state),orderData:t,announcementText:this.textState("delivery_info"),announcementExtra:this.attr("delivery_info","Additional Content")??null,announcementUpdatedAt:Et(this.attr("delivery_info","Updated At")),lastOrderAt:Et(this.entityState("last_order")?.state),lastOrderItems:this.attr("last_order","Items")??null,lastOrderPrice:this.attr("last_order","Price")??null,firstDeliveryText:this.textState("first_delivery"),isReserved:this.isOn("is_reserved"),isExpressAvailable:this.isOn("is_express_available"),recentDelivery:this.syncMemory(t)}}render(){if(!this.config||!this.hass||!this.entityId("is_ordered"))return V;const t=ee(this.buildInput(),new Date),e="none"===t.state&&t.isExpressAvailable,r={...this.config.accent?{"--rohlik-accent":this.config.accent}:{},...e?{"--rohlik-icon-color":"var(--warning-color)"}:{}},i=this.config.show_name?`${this.deviceName()} · ${this.t(`chip_${t.state}`)}`:this.t(`chip_${t.state}`);return q`
      <div
        class="badge"
        style=${$t(r)}
        @click=${this.onClick}
        @keydown=${this.onKeydown}
        role="button"
        tabindex="0"
      >
        <div class="icon-circle">
          <ha-icon icon=${"delivered"===t.state?"mdi:check":"mdi:truck-delivery"}></ha-icon>
        </div>
        <div class="text">
          <span class="label">${i}</span>
          <span class="value">${this.value(t)}</span>
        </div>
      </div>
    `}value(t){switch(t.state){case"arriving":return t.eta?Ot(this.hass,t.eta):t.till?Ot(this.hass,t.till):"—";case"ordered":return t.since?Pt(this.hass,t.since,{today:this.t("today"),tomorrow:this.t("tomorrow")}):"—";case"delivered":return t.deliveredAt?Ot(this.hass,t.deliveredAt):"—";default:return t.firstDeliveryText??"—"}}};var Ee;ze.styles=n`
    :host {
      --rohlik-accent: var(--primary-color);
      display: inline-flex;
      max-width: 100%;
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

    .badge:focus-visible {
      outline: 2px solid var(--rohlik-accent);
      outline-offset: 2px;
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
      flex: 1;
      min-width: 0;
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
  `,t([mt({attribute:!1})],ze.prototype,"hass",null),t([gt()],ze.prototype,"config",void 0),t([gt()],ze.prototype,"entities",void 0),ze=t([dt("rohlik-delivery-badge")],ze),Ee={type:"rohlik-delivery-badge",name:"Rohlík.cz Delivery Badge",description:"Compact status pill for your next Rohlík.cz delivery.",preview:!0},Zt(),window.customBadges=window.customBadges??[],window.customBadges.push({preview:!0,...Ee});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const{I:Ce}=nt,Ie=t=>t,Oe=()=>document.createComment(""),Re=(t,e,r)=>{const i=t._$AA.parentNode,s=void 0===e?t._$AB:e._$AA;if(void 0===r){const e=i.insertBefore(Oe(),s),o=i.insertBefore(Oe(),s);r=new Ce(e,o,t,t.options)}else{const e=r._$AB.nextSibling,o=r._$AM,n=o!==t;if(n){let e;r._$AQ?.(t),r._$AM=t,void 0!==r._$AP&&(e=t._$AU)!==o._$AU&&r._$AP(e)}if(e!==s||n){let t=r._$AA;for(;t!==e;){const e=Ie(t).nextSibling;Ie(i).insertBefore(t,s),t=e}}}return r},Pe=(t,e,r=t)=>(t._$AI(e,r),t),Te={},De=(t,e=Te)=>t._$AH=e,Ne=t=>{t._$AR(),t._$AA.remove()},Me=(t,e,r)=>{const i=new Map;for(let s=e;s<=r;s++)i.set(t[s],s);return i},je=yt(class extends bt{constructor(t){if(super(t),t.type!==vt)throw Error("repeat() can only be used in text expressions")}dt(t,e,r){let i;void 0===r?r=e:void 0!==e&&(i=e);const s=[],o=[];let n=0;for(const e of t)s[n]=i?i(e,n):n,o[n]=r(e,n),n++;return{values:o,keys:s}}render(t,e,r){return this.dt(t,e,r).values}update(t,[e,r,i]){const s=(t=>t._$AH)(t),{values:o,keys:n}=this.dt(e,r,i);if(!Array.isArray(s))return this.ut=n,o;const a=this.ut??=[],l=[];let c,h,d=0,p=s.length-1,u=0,m=o.length-1;for(;d<=p&&u<=m;)if(null===s[d])d++;else if(null===s[p])p--;else if(a[d]===n[u])l[u]=Pe(s[d],o[u]),d++,u++;else if(a[p]===n[m])l[m]=Pe(s[p],o[m]),p--,m--;else if(a[d]===n[m])l[m]=Pe(s[d],o[m]),Re(t,l[m+1],s[d]),d++,m--;else if(a[p]===n[u])l[u]=Pe(s[p],o[u]),Re(t,s[d],s[p]),p--,u++;else if(void 0===c&&(c=Me(n,u,m),h=Me(a,d,p)),c.has(a[d]))if(c.has(a[p])){const e=h.get(n[u]),r=void 0!==e?s[e]:null;if(null===r){const e=Re(t,s[d]);Pe(e,o[u]),l[u]=e}else l[u]=Pe(r,o[u]),Re(t,s[d],r),s[e]=null;u++}else Ne(s[p]),p--;else Ne(s[d]),d++;for(;u<=m;){const e=Re(t,l[m+1]);Pe(e,o[u]),l[u++]=e}for(;d<=p;){const t=s[d++];null!==t&&Ne(t)}return this.ut=n,De(t,l),Z}}),Ue=n`
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
    position: relative;
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

  /*
   * Floats over the page instead of pushing the card's own layout: fixed
   * positioning computed from the search box's own rect (see
   * positionPopover() in cart-card.ts), so it works even inside a dialog.
   */
  .search-popover {
    position: fixed;
    max-height: min(320px, 60vh);
    overflow-y: auto;
    z-index: 1000;
    box-sizing: border-box;
    background: var(--card-background-color);
    border: 1px solid var(--divider-color);
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  }

  .search-popover .row {
    padding: 8px 10px;
  }

  .search-popover .row.highlighted {
    background: color-mix(in srgb, var(--rohlik-accent) 14%, transparent);
  }

  .popover-error,
  .popover-empty {
    padding: 10px 12px;
    font-size: 0.85rem;
  }

  .popover-error {
    color: var(--error-color, #db4437);
  }

  .popover-empty {
    color: var(--secondary-text-color);
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
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    overflow-wrap: anywhere;
    color: var(--primary-text-color);
  }

  .cell .secondary {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--secondary-text-color);
    font-size: 0.8rem;
  }

  /* Groups the stepper/price/remove controls so they can be pulled onto
     their own right-aligned row under the narrow container query below. */
  .line-end {
    display: contents;
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

  .minimum-hint {
    color: var(--warning-color, #ff9800);
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

  .footer-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .btn.order {
    text-decoration: none;
  }

  .btn.order.disabled {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  }

  @container (max-width: 420px) {
    .header {
      flex-wrap: wrap;
      row-gap: 4px;
    }

    .big {
      font-size: 26px;
    }

    .cart-line {
      flex-wrap: wrap;
      row-gap: 6px;
    }

    .cart-line .cell {
      flex-basis: 100%;
    }

    .line-end {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-basis: 100%;
      justify-content: flex-end;
    }

    .footer-row {
      flex-wrap: wrap;
    }

    .footer-row .footer {
      flex-basis: 100%;
    }

    .footer-actions {
      flex-basis: 100%;
      width: 100%;
    }

    .footer-actions .btn {
      flex: 1;
    }
  }
`,Le={cs:{title:"Nákupní košík",can_order:"Lze objednat",below_minimum:"Pod minimem",empty_cart:"Košík je prázdný",last_order_hint:"Váš poslední nákup měl {count} {count:položku|položky|položek}",search_placeholder:"Hledat na Rohlíku…",favourite_only:"Jen oblíbené",add:"Přidat",remove:"Odebrat",uncategorised:"Bez kategorie",missing_entities:"Chybí entity nákupního košíku — zkontrolujte integraci HA-RohlikCZ.",load_error:"Nepodařilo se načíst obsah košíku.",action_error:"Akci se nepodařilo dokončit, zkuste to prosím znovu.",search_error:"Vyhledávání selhalo.",search_add_error:"Přidání do košíku selhalo.",no_results:"Žádné výsledky",order:"Objednat",below_minimum_order:"Pod minimální hodnotou objednávky",order_hint:"Otevře košík na rohlik.cz v novém okně"},en:{title:"Shopping cart",can_order:"Can order",below_minimum:"Below minimum",empty_cart:"Cart is empty",last_order_hint:"Your last order had {count} {count:item|items}",search_placeholder:"Search Rohlík…",favourite_only:"Favourites only",add:"Add",remove:"Remove",uncategorised:"Uncategorised",missing_entities:"Shopping cart entities are missing — check the HA-RohlikCZ integration.",load_error:"Failed to load the cart contents.",action_error:"Couldn't complete that action, please try again.",search_error:"Search failed.",search_add_error:"Adding to cart failed.",no_results:"No results",order:"Order",below_minimum_order:"Below minimum order",order_hint:"Opens the cart on rohlik.cz in a new tab"}},Fe={cs:{device:"Zařízení",name:"Vlastní název",show_search:"Zobrazit vyhledávání",group_by_category:"Seskupit podle kategorie",show_brand:"Zobrazit značku",max_items:"Max. počet zobrazených položek",show_order_button:"Tlačítko Objednat",checkout_url:"Adresa košíku"},en:{device:"Device",name:"Custom name",show_search:"Show search",group_by_category:"Group by category",show_brand:"Show brand",max_items:"Max. items shown",show_order_button:"Order button",checkout_url:"Checkout URL"}},He=/^(.+)\s*\((\d+)\)\s*-\s*(\d+(?:[.,]\d+)?)\s*Kč\s*$/;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Be(t){if(!t||"string"!=typeof t.summary)return null;const e=He.exec(t.summary.trim());if(!e)return null;const[,r,i,s]=e,o=r.trim(),n=parseInt(i,10),a=parseFloat(s.replace(",","."));if(!o||!Number.isFinite(n)||!Number.isFinite(a))return null;const l={uid:t.uid,name:o,quantity:n,price:a},{category:c,brand:h,productId:d}=function(t){const e={};if(!t)return e;for(const r of t.split(/\r?\n/)){const t=r.indexOf(":");if(-1===t)continue;const i=r.slice(0,t).trim().toLowerCase().replace(/[^a-z0-9]/g,""),s=r.slice(t+1).trim();if(s)if("category"===i)e.category=s;else if("brand"===i)e.brand=s;else if("productid"===i){const t=parseInt(s,10);Number.isFinite(t)&&(e.productId=t)}}return e}(t.description);return void 0!==c&&(l.category=c),void 0!==h&&(l.brand=h),void 0!==d&&(l.productId=d),l}const qe=/^(\d+)\s+(.+)$/,Ke=/^(.+?)\s*\((\d+)\)\s*$/;function Ze(t){const e=(t??"").trim(),r=qe.exec(e);if(r){const t=r[2].trim();if(t)return{quantity:parseInt(r[1],10),name:t}}const i=Ke.exec(e);if(i){const t=i[1].trim();if(t)return{quantity:parseInt(i[2],10),name:t}}return{quantity:1,name:e}}function Ve(t,e,r){if(r<=0)return-1;const i=t+e;return i<-1?-1:i>=r?r-1:i}let We=class extends be{constructor(){super(...arguments),this.labels=Fe,this.defaults={show_search:!0,show_brand:!0,group_by_category:!1,max_items:6,show_order_button:!0}}extraSchema(){return[{name:"show_search",selector:{boolean:{}}},{name:"group_by_category",selector:{boolean:{}}},{name:"show_brand",selector:{boolean:{}}},{name:"max_items",selector:{number:{min:1,max:50,mode:"box"}}},{name:"show_order_button",selector:{boolean:{}}},{name:"checkout_url",selector:{text:{}}}]}};We=t([dt("rohlik-cart-card-editor")],We);let Qe=class extends qt{constructor(){super(...arguments),this.strings=Le,this.lines=[],this.loading=!1,this.error=null,this.expanded=!1,this.searchQuery="",this.searchResults=[],this.searching=!1,this.searchError=null,this.searchAttempted=!1,this.favouriteOnly=!1,this.popoverOpen=!1,this.popoverRect=null,this.highlightedIndex=-1,this.pendingUids=new Set,this.searchSeq=0,this.loadSeq=0,this.popoverListenersAttached=!1,this.onWindowReposition=()=>{void 0===this.repositionRaf&&(this.repositionRaf=requestAnimationFrame(()=>{this.repositionRaf=void 0,this.positionPopover()}))},this.onDocumentPointerDown=t=>{t.composedPath().includes(this)||this.closePopover()},this.onSearchInput=t=>{const e=t.target.value;this.searchQuery=e,this.searchError=null,this.highlightedIndex=-1,this.searchDebounce&&clearTimeout(this.searchDebounce);const r=e.trim();if(r.length<2)return this.searchResults=[],this.searching=!1,this.searchAttempted=!1,void this.closePopover();this.openPopover(),this.searchDebounce=setTimeout(()=>{this.runSearch(r)},400)},this.onSearchFocus=()=>{this.searchQuery.trim().length>=2&&this.openPopover()},this.onSearchKeydown=t=>{if("Escape"===t.key)return this.popoverOpen&&t.preventDefault(),void this.clearSearch();if("ArrowDown"===t.key){if(!this.popoverOpen||!this.searchResults.length)return;return t.preventDefault(),void(this.highlightedIndex=Ve(this.highlightedIndex,1,this.searchResults.length))}if("ArrowUp"===t.key){if(!this.popoverOpen||!this.searchResults.length)return;return t.preventDefault(),void(this.highlightedIndex=Ve(this.highlightedIndex,-1,this.searchResults.length))}if("Enter"===t.key){t.preventDefault();const e=this.highlightedIndex>=0?this.searchResults[this.highlightedIndex]:void 0;if(e)return void this.addSearchResult(e);this.searchAndAdd()}},this.toggleFavouriteOnly=()=>{this.favouriteOnly=!this.favouriteOnly;const t=this.searchQuery.trim();t.length>=2&&this.runSearch(t)}}static getConfigElement(){return document.createElement("rohlik-cart-card-editor")}static getStubConfig(t){return{...qt.getStubConfig(t),type:"custom:rohlik-cart-card"}}getCardSize(){return 5}getGridOptions(){return{columns:12,rows:4,min_columns:6,min_rows:3}}disconnectedCallback(){super.disconnectedCallback(),this.searchDebounce&&clearTimeout(this.searchDebounce),this.detachPopoverListeners()}attachPopoverListeners(){this.popoverListenersAttached||(this.popoverListenersAttached=!0,window.addEventListener("scroll",this.onWindowReposition,!0),window.addEventListener("resize",this.onWindowReposition),document.addEventListener("pointerdown",this.onDocumentPointerDown))}detachPopoverListeners(){this.popoverListenersAttached&&(this.popoverListenersAttached=!1,window.removeEventListener("scroll",this.onWindowReposition,!0),window.removeEventListener("resize",this.onWindowReposition),document.removeEventListener("pointerdown",this.onDocumentPointerDown),void 0!==this.repositionRaf&&(cancelAnimationFrame(this.repositionRaf),this.repositionRaf=void 0))}positionPopover(){const t=this.searchBoxEl;if(!t)return;const e=t.getBoundingClientRect();this.popoverRect={left:e.left,top:e.bottom+4,width:e.width}}openPopover(){this.attachPopoverListeners(),this.popoverOpen=!0,this.positionPopover()}closePopover(){this.detachPopoverListeners(),(this.popoverOpen||-1!==this.highlightedIndex)&&(this.popoverOpen=!1,this.highlightedIndex=-1)}willUpdate(t){if(super.willUpdate(t),!t.has("hass")||!this.hass||!this.config)return;const e=this.state("shopping_cart"),r=this.state("cart_price");if(!e||!r)return;const i=`${e.state}|${e.last_updated}|${r.state}`;i!==this.loadedKey&&(this.loadedKey=i,this.loadItems())}async ensureConfigEntryId(){if(this.configEntryId)return this.configEntryId;const t=this.entityId("cart_price");return t?(this.configEntryId=await Qt(this.hass,t),this.configEntryId):void 0}async loadItems(){const t=this.entityId("shopping_cart");if(!t)return;const e=++this.loadSeq;this.loading=!0,this.error=null;try{const r=await this.hass.callWS({type:"todo/item/list",entity_id:t});if(e!==this.loadSeq)return;this.lines=(r.items??[]).map(t=>Be(t)).filter(t=>null!==t)}catch{if(e!==this.loadSeq)return;this.error=this.t("load_error")}finally{e===this.loadSeq&&(this.loading=!1)}}async removeItem(t){const e=this.entityId("shopping_cart");if(!e||this.pendingUids.has(t))return;const r=this.lines;this.pendingUids=new Set(this.pendingUids).add(t),this.lines=this.lines.filter(e=>e.uid!==t),this.error=null;try{await this.hass.callService("todo","remove_item",{item:t},{entity_id:e})}catch{this.lines=r,this.error=this.t("action_error")}finally{const e=new Set(this.pendingUids);e.delete(t),this.pendingUids=e}}async changeQuantity(t,e){if(this.pendingUids.has(t.uid))return;if(e<=0)return void await this.removeItem(t.uid);const r=this.entityId("shopping_cart");if(!r||void 0===t.productId)return;const i=this.lines;this.pendingUids=new Set(this.pendingUids).add(t.uid),this.lines=this.lines.map(r=>r.uid===t.uid?{...r,quantity:e}:r),this.error=null;try{await this.hass.callService("todo","remove_item",{item:t.uid},{entity_id:r});const i=await this.ensureConfigEntryId();if(!i)throw new Error("no config_entry_id for shopping_cart device");await Yt(this.hass,i,"add_to_cart",{product_id:t.productId,quantity:e})}catch{this.lines=i,this.error=this.t("action_error")}finally{const e=new Set(this.pendingUids);e.delete(t.uid),this.pendingUids=e}}async runSearch(t){const e=await this.ensureConfigEntryId();if(!e)return;const r=++this.searchSeq;this.searching=!0;try{const i=await Yt(this.hass,e,"search_product",{product_name:t,limit:8,favourite:this.favouriteOnly},!0);if(r!==this.searchSeq)return;this.searchResults=i?.search_results??[],this.highlightedIndex=-1,this.searchAttempted=!0,this.searchQuery.trim().length>=2&&this.openPopover()}catch{if(r!==this.searchSeq)return;this.searchResults=[],this.searchError=this.t("search_error"),this.searchAttempted=!0,this.searchQuery.trim().length>=2&&this.openPopover()}finally{r===this.searchSeq&&(this.searching=!1)}}async searchAndAdd(){const t=this.searchQuery.trim();if(!t)return;const e=await this.ensureConfigEntryId();if(!e)return;const{quantity:r,name:i}=Ze(t);this.searching=!0,this.searchError=null;try{const t=await Yt(this.hass,e,"search_and_add_to_cart",{product_name:i,quantity:r,favourite:this.favouriteOnly},!0);if(t&&!1===t.success)return void(this.searchError=t.message||this.t("search_add_error"));this.clearSearch(),await this.loadItems()}catch{this.searchError=this.t("search_add_error")}finally{this.searching=!1}}async addSearchResult(t){const e=await this.ensureConfigEntryId();if(!e)return;const{quantity:r}=Ze(this.searchQuery.trim());try{await Yt(this.hass,e,"add_to_cart",{product_id:t.id,quantity:r}),this.clearSearch(),await this.loadItems()}catch{this.searchError=this.t("search_add_error")}}clearSearch(){this.searchDebounce&&clearTimeout(this.searchDebounce),this.searchQuery="",this.searchResults=[],this.searchError=null,this.searching=!1,this.searchAttempted=!1,this.closePopover()}render(){if(!this.config)return V;const t=this.entityId("shopping_cart"),e=this.entityId("cart_price");if(!t||!e)return q`<ha-card>${this.renderError(this.t("missing_entities"))}</ha-card>`;const r=this.state("cart_price"),i=r?parseFloat(r.state):0,s=Boolean(this.attr("cart_price","Can Order")),o=this.attr("cart_price","Total items"),n="number"==typeof o?o:this.lines.length,a=0===this.lines.length,l=!1!==this.config.show_search,c=!1!==this.config.show_brand,h=!0===this.config.group_by_category,d=this.config.max_items??6,p=!1!==this.config.show_order_button,u=s&&!a;return q`
      <ha-card style=${$t(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:cart"></ha-icon>
          <span class="title">${this.config.name||this.t("title")}</span>
          <span class="chip ${s?"ok":"warn"}">
            ${s?this.t("can_order"):this.t("below_minimum")}
          </span>
        </div>

        <div class="big">${It(this.hass,Number.isFinite(i)?i:0)}</div>
        <div class="caption">
          ${a?this.t("empty_cart"):this.t("items_count",{count:n})}
        </div>
        ${a?this.renderEmptyHint():V}
        ${a||s?V:q`<div class="hint minimum-hint">${this.t("below_minimum_order")}</div>`}
        ${this.error?q`<div class="error">${this.error}</div>`:V}
        ${l?this.renderSearch():V}
        ${a?V:this.renderLines(h,c,d)}

        <div class="footer-row">
          ${this.renderFreshness()}
          <div class="footer-actions">
            <button
              class="btn ghost"
              ?disabled=${this.loading}
              @click=${()=>{this.loadItems()}}
            >
              ${this.t("refresh")}
            </button>
            ${p?this.renderOrderButton(u):V}
          </div>
        </div>
      </ha-card>
    `}renderOrderButton(t){const e=function(t){const e=t?.trim();return e||"https://www.rohlik.cz/kosik"}(this.config.checkout_url);return q`
      <a
        class=${_t({btn:!0,order:!0,disabled:!t})}
        href=${t?e:V}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled=${t?V:"true"}
        title=${t?this.t("order_hint"):this.t("below_minimum_order")}
      >
        <ha-icon icon="mdi:cart-arrow-right"></ha-icon>
        ${this.t("order")}
      </a>
    `}renderEmptyHint(){const t=this.attr("last_order","Items");return"number"!=typeof t?V:q`<div class="hint">${this.t("last_order_hint",{count:t})}</div>`}renderSearch(){return q`
      <div class="search">
        <div class="search-box">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input
            type="text"
            role="combobox"
            aria-expanded=${this.popoverOpen?"true":"false"}
            aria-controls="cart-search-listbox"
            aria-autocomplete="list"
            aria-activedescendant=${this.highlightedIndex>=0?`cart-search-option-${this.highlightedIndex}`:V}
            .value=${this.searchQuery}
            placeholder=${this.t("search_placeholder")}
            @input=${this.onSearchInput}
            @keydown=${this.onSearchKeydown}
            @focus=${this.onSearchFocus}
          />
          ${this.searching?this.renderSpinner():V}
          <button
            class=${_t({"icon-btn":!0,active:this.favouriteOnly})}
            title=${this.t("favourite_only")}
            @click=${this.toggleFavouriteOnly}
          >
            <ha-icon icon=${this.favouriteOnly?"mdi:heart":"mdi:heart-outline"}></ha-icon>
          </button>
        </div>
        ${this.popoverOpen?this.renderSearchPopover():V}
      </div>
    `}renderSearchPopover(){const t=this.popoverRect?{left:`${this.popoverRect.left}px`,top:`${this.popoverRect.top}px`,width:`${this.popoverRect.width}px`}:{display:"none"};return q`
      <div id="cart-search-listbox" class="search-popover" role="listbox" style=${$t(t)}>
        ${this.searchError?q`<div class="popover-error">${this.searchError}</div>`:this.searchResults.length?je(this.searchResults,t=>t.id,(t,e)=>this.renderSearchResult(t,e)):this.searchAttempted&&!this.searching?q`<div class="popover-empty">${this.t("no_results")}</div>`:V}
      </div>
    `}renderSpinner(){return customElements.get("ha-circular-progress")?q`<ha-circular-progress indeterminate size="small"></ha-circular-progress>`:q`<div class="spinner"></div>`}renderSearchResult(t,e){const r=[t.brand,t.amount].filter(Boolean).join(" · "),i=e===this.highlightedIndex;return q`
      <div
        id="cart-search-option-${e}"
        class=${_t({row:!0,"search-result":!0,highlighted:i})}
        role="option"
        aria-selected=${i?"true":"false"}
        @pointerenter=${()=>this.highlightedIndex=e}
      >
        <div class="cell">
          <div class="name">${t.name}</div>
          ${r?q`<div class="secondary">${r}</div>`:V}
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
    `}renderLines(t,e,r){const i=this.expanded?this.lines:this.lines.slice(0,r),s=this.lines.length>r;return q`
      <div class="lines">
        ${t?je(function(t){const e=new Map,r=[];for(const i of t){if(!i.category){r.push(i);continue}const t=e.get(i.category);t?t.push(i):e.set(i.category,[i])}const i=Array.from(e.entries()).sort(([t],[e])=>t.localeCompare(e)).map(([t,e])=>({category:t,lines:e}));return r.length&&i.push({category:void 0,lines:r}),i}(i),t=>t.category??"__uncategorised__",t=>q`
                <div class="category-header">${t.category??this.t("uncategorised")}</div>
                ${je(t.lines,t=>t.uid,t=>this.renderLine(t,e))}
              `):je(i,t=>t.uid,t=>this.renderLine(t,e))}
      </div>
      ${s?q`
            <button class="btn ghost show-toggle" @click=${()=>this.expanded=!this.expanded}>
              ${this.expanded?this.t("show_less"):this.t("show_all",{count:this.lines.length})}
            </button>
          `:V}
    `}renderLine(t,e){const r=this.pendingUids.has(t.uid),i=[t.category,e?t.brand:void 0].filter(t=>Boolean(t)).join(" · ");return q`
      <div class=${_t({row:!0,"cart-line":!0,pending:r})}>
        <div class="cell">
          <div class="name">${t.name}</div>
          ${i?q`<div class="secondary">${i}</div>`:V}
        </div>
        <div class="line-end">
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
          <div class="line-price">${It(this.hass,t.price)}</div>
          <button
            class="icon-btn remove"
            ?disabled=${r}
            title=${this.t("remove")}
            @click=${()=>{this.removeItem(t.uid)}}
          >
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
      </div>
    `}};Qe.styles=[Bt,Ue],t([gt()],Qe.prototype,"lines",void 0),t([gt()],Qe.prototype,"loading",void 0),t([gt()],Qe.prototype,"error",void 0),t([gt()],Qe.prototype,"expanded",void 0),t([gt()],Qe.prototype,"searchQuery",void 0),t([gt()],Qe.prototype,"searchResults",void 0),t([gt()],Qe.prototype,"searching",void 0),t([gt()],Qe.prototype,"searchError",void 0),t([gt()],Qe.prototype,"searchAttempted",void 0),t([gt()],Qe.prototype,"favouriteOnly",void 0),t([gt()],Qe.prototype,"popoverOpen",void 0),t([gt()],Qe.prototype,"popoverRect",void 0),t([gt()],Qe.prototype,"highlightedIndex",void 0),t([gt()],Qe.prototype,"pendingUids",void 0),t([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(t){return(e,r,i)=>((t,e,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,r),r))(e,r,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}(".search-box")],Qe.prototype,"searchBoxEl",void 0),Qe=t([dt("rohlik-cart-card")],Qe),Vt({type:"rohlik-cart-card",name:"Rohlík.cz Shopping Cart",description:"Live cart contents, quantity steppers and product search for Rohlík.cz."});const Ye=["express","standard","eco"],Ge={express:"mdi:lightning-bolt",standard:"mdi:truck-delivery",eco:"mdi:leaf"};function Je(t){if("number"==typeof t&&Number.isFinite(t))return t;if("string"==typeof t&&""!==t.trim()){const e=Number(t);if(Number.isFinite(e))return e}return null}function Xe(t){return"string"==typeof t&&""!==t.trim()?t:null}function tr(t){return null==t||Number.isNaN(t)?0:Math.min(100,Math.max(0,t))}const er=n`
  :host {
    container-type: inline-size;
    container-name: rohlik-slots;
  }

  .header {
    flex-wrap: wrap;
    row-gap: 6px;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 0 1 auto;
    min-width: 0;
    flex-wrap: wrap;
    margin-left: auto;
  }

  /* Below ~420px the actions drop under the title instead of squeezing it. */
  @container rohlik-slots (max-width: 420px) {
    .header-actions {
      flex-basis: 100%;
      justify-content: flex-end;
      margin-left: 0;
    }
  }

  .icon-toggle {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--secondary-text-color);
    cursor: pointer;
  }

  .icon-toggle ha-icon {
    --mdc-icon-size: 20px;
  }

  .icon-toggle.on {
    color: var(--rohlik-accent);
    background: color-mix(in srgb, var(--rohlik-accent) 15%, transparent);
  }

  .pulse-dot {
    position: absolute;
    top: 4px;
    right: 4px;
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

  .slots-grid.column,
  .slots-grid.auto {
    grid-template-columns: 1fr;
  }

  /* "auto": side by side once the card has room, one per row below that. */
  @container rohlik-slots (min-width: 480px) {
    .slots-grid.auto {
      grid-template-columns: repeat(var(--rohlik-slot-count, 3), 1fr);
    }
  }

  @media (min-width: 480px) {
    .slots-grid.auto {
      grid-template-columns: repeat(var(--rohlik-slot-count, 3), 1fr);
    }
  }

  /* Explicit "row" still collapses to one column at very narrow widths. */
  @container rohlik-slots (max-width: 359px) {
    .slots-grid:not(.column):not(.auto) {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 359px) {
    .slots-grid:not(.column):not(.auto) {
      grid-template-columns: 1fr;
    }
  }

  /*
   * Identical anatomy for every tile, available or not, top-aligned so an
   * "Unavailable" tile never grows taller than its neighbours: icon+label,
   * big time, exact-window meta line, capacity bar, capacity message.
   */
  .tile {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto auto;
    grid-template-areas: "head" "time" "meta" "bar" "msg";
    align-content: start;
    gap: 4px;
    padding: 10px 12px;
    border-radius: var(--ha-card-border-radius, 12px);
    background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
    min-width: 0;
    min-height: 96px;
  }

  .tile-head {
    grid-area: head;
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
    grid-area: time;
    font-size: 1.15rem;
    font-weight: 700;
    line-height: 1.25;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tile-time.muted {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--secondary-text-color);
  }

  .tile-meta {
    grid-area: meta;
    min-height: 1em;
    color: var(--secondary-text-color);
    font-size: 0.78rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .capacity-bar {
    grid-area: bar;
    height: 4px;
    border-radius: 2px;
    background: var(--divider-color);
    overflow: hidden;
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

  .capacity-fill.muted {
    width: 100%;
    background: var(--divider-color);
  }

  .capacity-bar.empty {
    opacity: 0.6;
  }

  .tile-msg {
    grid-area: msg;
    min-height: 1em;
    color: var(--secondary-text-color);
    font-size: 0.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /*
   * "auto" layout once it drops to one tile per row: a compact list row
   * instead of a tall tile — icon+label on the left, time+meta in the
   * middle, the capacity bar spanning the full width underneath.
   */
  @container rohlik-slots (max-width: 479px) {
    .slots-grid.auto .tile {
      grid-template-columns: auto 1fr;
      grid-template-rows: auto auto auto auto;
      grid-template-areas: "head time" "head meta" "bar bar" "msg msg";
      align-items: center;
      min-height: 0;
    }

    .slots-grid.auto .tile-head {
      align-self: center;
    }
  }

  @media (max-width: 479px) {
    .slots-grid.auto .tile {
      grid-template-columns: auto 1fr;
      grid-template-rows: auto auto auto auto;
      grid-template-areas: "head time" "head meta" "bar bar" "msg msg";
      align-items: center;
      min-height: 0;
    }

    .slots-grid.auto .tile-head {
      align-self: center;
    }
  }
`,rr={cs:{title:"Termíny rozvozu",slot_express:"Expres",slot_standard:"Standard",slot_eco:"Eko",express_available:"Expres k dispozici",no_express:"Bez expresu",watch_toggle:"Sledovat expres",watch_error:"Aktualizace se nezdařila",no_entities:"Na tomto zařízení nebyly nalezeny entity Rohlík.cz",layout_auto:"Automaticky",layout_row:"Řádek",layout_column:"Sloupec"},en:{title:"Delivery slots",slot_express:"Express",slot_standard:"Standard",slot_eco:"Eco",express_available:"Express available",no_express:"No express",watch_toggle:"Watch express",watch_error:"Refresh failed",no_entities:"Rohlík.cz entities not found on this device",layout_auto:"Auto",layout_row:"Row",layout_column:"Column"}},ir={cs:{device:"Zařízení",name:"Vlastní název",slots:"Zobrazené sloty",layout:"Rozložení",show_price:"Zobrazit cenu",show_location:"Zobrazit adresu",watch_interval:"Interval sledování (s)"},en:{device:"Device",name:"Custom name",slots:"Slots shown",layout:"Layout",show_price:"Show price",show_location:"Show location",watch_interval:"Watch interval (s)"}};let sr=class extends be{constructor(){super(...arguments),this.labels=ir,this.defaults={slots:["express","standard","eco"],show_price:!0,show_location:!0,watch_interval:15,layout:"auto"}}extraSchema(){const t=t=>Ut(this.hass,rr,t);return[{name:"slots",selector:{select:{multiple:!0,mode:"list",options:[{value:"express",label:t("slot_express")},{value:"standard",label:t("slot_standard")},{value:"eco",label:t("slot_eco")}]}}},{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"auto",label:t("layout_auto")},{value:"row",label:t("layout_row")},{value:"column",label:t("layout_column")}]}}},{name:"show_price",selector:{boolean:{}}},{name:"show_location",selector:{boolean:{}}},{name:"watch_interval",selector:{number:{mode:"box",min:10,max:300}}}]}};sr=t([dt("rohlik-slots-card-editor")],sr);let or=class extends qt{constructor(){super(...arguments),this.strings=rr,this.watching=!1,this.pollError=null,this.onVisibilityChange=()=>this.syncPolling(),this.toggleWatch=()=>{this.watching=!this.watching,this.saveWatchFlag(this.watching),this.watching&&(this.pollError=null)}}static getConfigElement(){return document.createElement("rohlik-slots-card-editor")}static getStubConfig(t){return{...qt.getStubConfig(t),type:"custom:rohlik-slots-card"}}getGridOptions(){return"column"===this.config?.layout?{columns:4,rows:4,min_columns:3,min_rows:3}:{columns:12,rows:2,min_columns:6,min_rows:2}}setConfig(t){super.setConfig(t),this.watching=this.loadWatchFlag()}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this.onVisibilityChange),this.syncPolling()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("visibilitychange",this.onVisibilityChange),this.stopPolling()}willUpdate(t){super.willUpdate(t),this.syncPolling()}watchStorageKey(){const t=this.config?.device;return t?`rohlik-slots-watch:${t}`:null}loadWatchFlag(){const t=this.watchStorageKey();if(!t)return!1;try{return"1"===localStorage.getItem(t)}catch{return!1}}saveWatchFlag(t){const e=this.watchStorageKey();if(e)try{localStorage.setItem(e,t?"1":"0")}catch{}}syncPolling(){const t=this.watching&&"visible"===document.visibilityState&&!!this.config,e=Math.max(10,this.config?.watch_interval??15);t?void 0!==this.pollTimer&&this.pollSeconds===e||(this.stopPolling(),this.pollTimer=setInterval(()=>{this.poll()},1e3*e),this.pollSeconds=e):this.stopPolling()}stopPolling(){void 0!==this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=void 0),this.pollSeconds=void 0}async poll(){const t=this.entityId("express_slot")??this.entityId("standard_slot")??this.entityId("eco_slot");if(t&&this.hass)try{const e=await Qt(this.hass,t);if(!e)throw new Error("no config entry");await Yt(this.hass,e,"refresh_slots"),this.pollError=null}catch{this.pollError=this.t("watch_error")}}slotsToShow(){const t=this.config?.slots;return t&&t.length>0?t:Ye}render(){if(!this.config)return V;if(0===this.entities.size)return q`
        <ha-card style=${$t(this.accentStyle)}>${this.renderError(this.t("no_entities"))}</ha-card>
      `;const t=this.slotsToShow(),e=this.isOn("is_express_available"),r=!1!==this.config.show_location,i=this.attr("first_delivery","delivery_location"),s=this.config.layout??"auto";return q`
      <ha-card style=${$t(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:calendar-clock"></ha-icon>
          <span class="title">${this.config.name||this.t("title")}</span>
          <div class="header-actions">
            <button
              class=${_t({"icon-toggle":!0,on:this.watching})}
              @click=${this.toggleWatch}
              aria-pressed=${this.watching}
              aria-label=${this.t("watch_toggle")}
              title=${this.t("watch_toggle")}
            >
              <ha-icon icon=${this.watching?"mdi:eye":"mdi:eye-outline"}></ha-icon>
              ${this.watching?q`<span class="pulse-dot"></span>`:V}
            </button>
            <span class="chip ${e?"warn":"neutral"}">
              ${e?this.t("express_available"):this.t("no_express")}
            </span>
          </div>
        </div>

        ${r&&"string"==typeof i&&i?q`
              <div class="location">
                <ha-icon icon="mdi:map-marker"></ha-icon>
                <span>${i}</span>
              </div>
            `:V}
        ${this.pollError?this.renderError(this.pollError):V}

        <div
          class=${_t({"slots-grid":!0,column:"column"===s,auto:"auto"===s})}
          style=${$t({"--rohlik-slot-count":String(t.length)})}
        >
          ${t.map(t=>this.renderTile(t))}
        </div>

        ${this.renderFreshness()}
      </ha-card>
    `}renderTile(t){const e=function(t,e){const r=e?.attributes??{},i=Et(e?.state);return{type:t,start:i,end:Et(r["Delivery Slot End"]),price:Je(r.Price),capacityPercent:Je(r["Remaining Capacity Percent"]),capacityMessage:Xe(r["Remaining Capacity Message"]),title:Xe(r.Title),subtitle:Xe(r.Subtitle),available:null!==i}}(t,this.state(`${t}_slot`)),r=Ge[t],i=this.t(`slot_${t}`),s=e.capacityMessage??e.subtitle??"";return q`
      <div class="tile">
        <div class="tile-head"><ha-icon icon=${r}></ha-icon><span>${i}</span></div>
        ${this.renderTileTime(e)}
        <div class="tile-meta">${this.renderMeta(e)}</div>
        ${this.renderCapacityBar(e)}
        <div class="tile-msg">${s}</div>
      </div>
    `}renderTileTime(t){return t.available&&t.start?q`
      <div class="tile-time">
        ${Pt(this.hass,t.start,{today:this.t("today"),tomorrow:this.t("tomorrow")})}
      </div>
    `:q`<div class="tile-time muted">${this.t("unavailable")}</div>`}renderMeta(t){if(!t.available||!t.start)return"";const e=[],r=Ot(this.hass,t.start);return e.push(t.end?`${r} – ${Ot(this.hass,t.end)}`:r),!1!==this.config.show_price&&null!=t.price&&e.push(0===t.price?this.t("free"):It(this.hass,t.price)),e.join(" · ")}renderCapacityBar(t){if(!t.available||null==t.capacityPercent)return q`
        <div class="capacity-bar empty"><div class="capacity-fill muted"></div></div>
      `;const e=null==(r=t.capacityPercent)||Number.isNaN(r)?"err":r>=50?"ok":r>=10?"warn":"err";var r;return q`
      <div class="capacity-bar">
        <div
          class=${_t({"capacity-fill":!0,[e]:!0})}
          style=${$t({width:`${tr(t.capacityPercent)}%`})}
        ></div>
      </div>
    `}};or.styles=[Bt,er],t([gt()],or.prototype,"watching",void 0),t([gt()],or.prototype,"pollError",void 0),or=t([dt("rohlik-slots-card")],or),Vt({type:"rohlik-slots-card",name:"Rohlík.cz Delivery Slots",description:"Express, standard and eco delivery slot times, prices and remaining capacity.",preview:!0});const nr=n`
  :host {
    container-type: inline-size;
    container-name: rohlik-account;
  }

  .header {
    flex-wrap: wrap;
    row-gap: 4px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 4px;
  }

  @container rohlik-account (max-width: 360px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 360px) {
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
    flex-direction: column;
    gap: 4px;
    margin-top: 12px;
    padding-top: 8px;
    border-top: 1px solid var(--divider-color);
  }

  .last-order {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .footer-row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }

  .footer-row .footer {
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
`,ar={cs:{title:"Účet",xtra_days:"Xtra · {days} {days:den|dny|dní}",no_xtra:"Bez Xtra",stat_credit:"Kredit",stat_bags:"Tašky",stat_no_limit:"Objednávky bez limitu",stat_free_express:"Expres zdarma",stat_parents_club:"Rodičovský klub",stat_reusable:"Vratné tašky",deposit_caption:"záloha {amount}",remaining:"zbývá {n}",yes:"Ano",no:"Ne",last_order:"Poslední objednávka",refresh_failed:"Aktualizace se nezdařila",no_entities:"Na tomto zařízení nebyly nalezeny entity Rohlík.cz"},en:{title:"Account",xtra_days:"Xtra · {days} {days:day|days}",no_xtra:"No Xtra",stat_credit:"Credit",stat_bags:"Bags",stat_no_limit:"Orders without limit",stat_free_express:"Free express",stat_parents_club:"Parents Club",stat_reusable:"Reusable bags",deposit_caption:"{amount} deposit",remaining:"{n} left",yes:"Yes",no:"No",last_order:"Last order",refresh_failed:"Refresh failed",no_entities:"Rohlík.cz entities not found on this device"}},lr={cs:{device:"Zařízení",name:"Vlastní název",stats:"Zobrazené statistiky",show_footer:"Zobrazit patičku"},en:{device:"Device",name:"Custom name",stats:"Stats shown",show_footer:"Show footer"}};let cr=class extends be{constructor(){super(...arguments),this.labels=lr,this.defaults={stats:["credit","bags","no_limit","free_express","parents_club","reusable"],show_footer:!0}}extraSchema(){const t=t=>Ut(this.hass,ar,t);return[{name:"stats",selector:{select:{multiple:!0,mode:"list",options:[{value:"credit",label:t("stat_credit")},{value:"bags",label:t("stat_bags")},{value:"no_limit",label:t("stat_no_limit")},{value:"free_express",label:t("stat_free_express")},{value:"parents_club",label:t("stat_parents_club")},{value:"reusable",label:t("stat_reusable")}]}}},{name:"show_footer",selector:{boolean:{}}}]}};cr=t([dt("rohlik-account-card-editor")],cr);const hr=["credit","bags","no_limit","free_express","parents_club","reusable"];function dr(t){if(null==t||"unknown"===t||"unavailable"===t)return null;const e=Number(t);return Number.isNaN(e)?null:e}let pr=class extends qt{constructor(){super(...arguments),this.strings=ar,this.refreshing=!1,this.refreshError=null,this.onRefresh=async()=>{if(this.refreshing)return;const t=this.entityId("credit_amount");if(t&&this.hass){this.refreshing=!0,this.refreshError=null;try{const e=await Qt(this.hass,t);if(!e)throw new Error("no config entry");await Yt(this.hass,e,"update_data")}catch{this.refreshError=this.t("refresh_failed")}finally{this.refreshing=!1}}}}static getConfigElement(){return document.createElement("rohlik-account-card-editor")}static getStubConfig(t){return{...qt.getStubConfig(t),type:"custom:rohlik-account-card"}}getGridOptions(){return{columns:6,rows:3,min_columns:4,min_rows:2}}statsToShow(){const t=this.config?.stats;return t&&t.length>0?t:hr}remainingDays(){const t=dr(this.state("premium_days")?.state);if(null!=t)return t;const e=this.attr("is_premium","remaining_days");return"number"==typeof e?e:null}statContent(t,e){switch(t){case"credit":{if(!this.entityId("credit_amount"))return null;const t=dr(this.state("credit_amount")?.state);return null==t?null:{icon:"mdi:cash-multiple",labelKey:"stat_credit",value:It(this.hass,t)}}case"bags":{if(!this.entityId("bags_amount"))return null;const t=dr(this.state("bags_amount")?.state);if(null==t)return null;const e=this.attr("bags_amount","Max Bags"),r=this.attr("bags_amount","Deposit Amount"),i=this.attr("bags_amount","Deposit Currency"),s="number"==typeof e?`${t} / ${e}`:String(t);let o;if("number"==typeof r&&r>0){const t="string"==typeof i?i:"CZK";o=this.t("deposit_caption",{amount:It(this.hass,r,t)})}return{icon:"mdi:shopping",labelKey:"stat_bags",value:s,caption:o}}case"no_limit":{if(!e||!this.entityId("no_limit"))return null;const t=dr(this.state("no_limit")?.state);return null==t?null:{icon:"mdi:cash-100",labelKey:"stat_no_limit",value:this.t("remaining",{n:t})}}case"free_express":{if(!e||!this.entityId("free_express"))return null;const t=dr(this.state("free_express")?.state);return null==t?null:{icon:"mdi:truck-fast",labelKey:"stat_free_express",value:this.t("remaining",{n:t})}}case"parents_club":return this.entityId("is_parent")?{icon:"mdi:human-male-female-child",labelKey:"stat_parents_club",value:this.isOn("is_parent")?this.t("yes"):this.t("no")}:null;case"reusable":return this.entityId("is_reusable")?{icon:"mdi:recycle",labelKey:"stat_reusable",value:this.isOn("is_reusable")?this.t("yes"):this.t("no")}:null;default:return null}}render(){if(!this.config)return V;if(0===this.entities.size)return q`
        <ha-card style=${$t(this.accentStyle)}>${this.renderError(this.t("no_entities"))}</ha-card>
      `;const t=this.isOn("is_premium"),e=this.statsToShow();return q`
      <ha-card style=${$t(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:account-star"></ha-icon>
          <span class="title">${this.deviceName()}</span>
          ${this.renderHeaderChip(t)}
        </div>

        <div class="stats-grid">${e.map(e=>this.renderStat(e,t))}</div>

        ${!1!==this.config.show_footer?this.renderFooter():V}
      </ha-card>
    `}renderHeaderChip(t){if(!t)return q`<span class="chip neutral">${this.t("no_xtra")}</span>`;const e=this.remainingDays();return q`
      <span class="chip ${null!=e&&e<7?"warn":"ok"}">${this.t("xtra_days",{days:e??"—"})}</span>
    `}renderStat(t,e){const r=this.statContent(t,e);return r?q`
      <div class="stat">
        <div class="stat-icon"><ha-icon icon=${r.icon}></ha-icon></div>
        <div class="stat-body">
          <span class="stat-value">${r.value}</span>
          ${r.caption?q`<span class="stat-caption">${r.caption}</span>`:V}
          <span class="stat-label">${this.t(r.labelKey)}</span>
        </div>
      </div>
    `:V}renderFooter(){return q`
      <div class="account-footer">
        ${this.renderLastOrderLine()}
        <div class="footer-row">
          ${this.renderFreshness()}
          <button
            class="btn ghost icon-btn"
            ?disabled=${this.refreshing}
            @click=${this.onRefresh}
            title=${this.t("refresh")}
          >
            <ha-icon icon="mdi:refresh" class=${_t({spin:this.refreshing})}></ha-icon>
          </button>
        </div>
      </div>
      ${this.refreshError?this.renderError(this.refreshError):V}
    `}renderLastOrderLine(){const t=Et(this.state("last_order")?.state);if(!t)return V;const e=this.attr("last_order","Items"),r=this.attr("last_order","Price"),i=new Intl.DateTimeFormat(this.hass.locale?.language||"en",{day:"numeric",month:"short"}).format(t),s=[`${this.t("last_order")} ${i}`];return"number"==typeof e&&s.push(this.t("items_count",{count:e})),"number"==typeof r&&s.push(It(this.hass,r)),q`<div class="last-order">${s.join(" · ")}</div>`}};pr.styles=[Bt,nr],t([gt()],pr.prototype,"refreshing",void 0),t([gt()],pr.prototype,"refreshError",void 0),pr=t([dt("rohlik-account-card")],pr),Vt({type:"rohlik-account-card",name:"Rohlík.cz Account",description:"Xtra membership status, credit, bags and account perks at a glance.",preview:!0});const ur=["l0","l1","l2","l3","items"],mr=["month","year","all"],gr=["auto","years","months","none"];function fr(t){return"all"===t?"all":"year"}const vr={l0:{year:"categories_l0_this_year",all:"categories_l0_all_time"},l1:{year:"categories_this_year",all:"categories_all_time"},l2:{year:"categories_l2_this_year",all:"categories_l2_all_time"},l3:{year:"categories_l3_this_year",all:"categories_l3_all_time"},items:{year:"items_this_year",all:"items_all_time"}};function yr(t,e){return vr[t][e]}function br(t){if("number"==typeof t&&Number.isFinite(t))return t;if("string"==typeof t&&""!==t.trim()){const e=Number(t);if(Number.isFinite(e))return e}}function _r(t,e){if(!t||"object"!=typeof t)return[];const r=t[e];if(!Array.isArray(r))return[];const i=[];for(const t of r){if(!t||"object"!=typeof t)continue;const e=t,r=e.start,s="number"==typeof r||"string"==typeof r?new Date(r):null;if(!s||Number.isNaN(s.getTime()))continue;const o=br(e.max);void 0!==o&&i.push({month:s,total:o})}return i.sort((t,e)=>t.month.getTime()-e.month.getTime()),i}function wr(t){return`${t.getFullYear()}-${t.getMonth()}`}const xr={cs:{title:"Útraty",not_found:"Na tomto zařízení nebyly nalezeny entity Rohlík.cz",period_month:"Tento měsíc",period_year:"Letos",period_all:"Celkem",avg_order:"průměrná objednávka",orders_count:"{n} {n:objednávka|objednávky|objednávek}",level_l0:"Hlavní",level_l1:"Kategorie",level_l2:"Podrobné",level_l3:"Nejpodrobnější",level_items:"Položky",expand_row:"{units} ks · {avg} za kus",enable_hint:"Rozpis zobrazíte zapnutím Analýzy útrat v nastavení integrace.",enriched:"obohaceno {enriched} z {total} objednávek",breakdown_year_hint:"Rozpis za rok {year} (měsíční kategorie nejsou k dispozici)",monthly_history_hint:"Měsíční historie vyžaduje recorder"},en:{title:"Spending",not_found:"Rohlík.cz entities not found on this device",period_month:"This month",period_year:"This year",period_all:"All time",avg_order:"avg order",orders_count:"{n} {n:order|orders}",level_l0:"Top",level_l1:"Categories",level_l2:"Detailed",level_l3:"Specific",level_items:"Items",expand_row:"{units} units · {avg} per unit",enable_hint:"Enable Spending Analytics in the integration options to see a breakdown.",enriched:"{enriched} of {total} orders enriched",breakdown_year_hint:"Breakdown shown for {year} (per-month categories are not available)",monthly_history_hint:"Monthly history needs the recorder"}},$r={cs:{device:"Zařízení",name:"Vlastní název",default_period:"Výchozí období",default_level:"Výchozí úroveň",top_n:"Počet položek",chart:"Graf",show_totals:"Zobrazit souhrn"},en:{device:"Device",name:"Custom name",default_period:"Default period",default_level:"Default level",top_n:"Row count",chart:"Chart",show_totals:"Show totals"}},kr=n`
  :host {
    container-type: inline-size;
    container-name: rohlik-spending;
  }

  /* Let the period pills drop under the title instead of squeezing it. */
  .header {
    flex-wrap: wrap;
  }

  .header .title {
    flex: 1 1 auto;
    min-width: 0;
  }

  @container rohlik-spending (max-width: 480px) {
    .header .segmented {
      flex-basis: 100%;
    }
  }

  @media (max-width: 480px) {
    .header .segmented {
      flex-basis: 100%;
    }
  }

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
    flex: 0 0 auto;
  }

  .pill.active {
    background: var(--rohlik-accent);
    color: var(--text-primary-color, #fff);
  }

  /* Level pills (L0..L3/Items) can outgrow the card — scroll rather than
     wrap into an awkward multi-row block. */
  .pills-row {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 6px;
    margin-bottom: 10px;
    scrollbar-width: thin;
  }

  .totals {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 16px;
  }

  @container rohlik-spending (max-width: 420px) {
    .totals {
      grid-template-columns: repeat(2, 1fr);
    }

    .totals-cell:last-child {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 420px) {
    .totals {
      grid-template-columns: repeat(2, 1fr);
    }

    .totals-cell:last-child {
      grid-column: 1 / -1;
    }
  }

  @container rohlik-spending (max-width: 280px) {
    .totals {
      grid-template-columns: 1fr;
    }

    .totals-cell:last-child {
      grid-column: auto;
    }
  }

  @media (max-width: 280px) {
    .totals {
      grid-template-columns: 1fr;
    }

    .totals-cell:last-child {
      grid-column: auto;
    }
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

  .chart-svg {
    display: block;
    width: 100%;
    max-width: 100%;
    height: 118px;
    max-height: 118px;
    margin-bottom: 16px;
    overflow: visible;
  }

  .chart-svg text {
    font-family: inherit;
  }

  .chart-hint {
    color: var(--secondary-text-color);
    font-size: 0.8rem;
    padding: 4px 0 12px;
  }

  .breakdown-hint {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
    padding: 8px 0;
  }

  .breakdown-year-hint {
    color: var(--secondary-text-color);
    font-size: 0.72rem;
    margin-bottom: 8px;
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

  /* Fixed proportions rather than a shrink-to-fit flex row, so long names
     wrap onto a second line instead of being cut off mid-word. */
  .breakdown-main {
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr) auto;
    grid-template-areas: "name bar amount";
    align-items: center;
    gap: 10px;
  }

  @container rohlik-spending (max-width: 420px) {
    .breakdown-main {
      grid-template-columns: 1fr auto;
      grid-template-areas:
        "name name"
        "bar amount";
      row-gap: 4px;
    }
  }

  @media (max-width: 420px) {
    .breakdown-main {
      grid-template-columns: 1fr auto;
      grid-template-areas:
        "name name"
        "bar amount";
      row-gap: 4px;
    }
  }

  .breakdown-name {
    grid-area: name;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: var(--primary-text-color);
    font-size: 0.88rem;
    line-height: 1.25;
  }

  .breakdown-bar-track {
    grid-area: bar;
    height: 10px;
    border-radius: 5px;
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    overflow: hidden;
  }

  .breakdown-bar-fill {
    display: block;
    height: 100%;
    border-radius: 5px;
    background: var(--rohlik-accent);
    opacity: 0.9;
  }

  .breakdown-spent {
    grid-area: amount;
    min-width: 64px;
    text-align: right;
    font-variant-numeric: tabular-nums;
    color: var(--primary-text-color);
    font-size: 0.88rem;
  }

  .breakdown-expand {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .breakdown-footer {
    margin-top: 4px;
    color: var(--secondary-text-color);
    font-size: 0.72rem;
  }
`,Sr={cs:{month:"Tento měsíc",year:"Letos",all:"Celkem"},en:{month:"This month",year:"This year",all:"All time"}},Ar={cs:{l0:"Hlavní",l1:"Kategorie",l2:"Podrobné",l3:"Nejpodrobnější",items:"Položky"},en:{l0:"Top",l1:"Categories",l2:"Detailed",l3:"Specific",items:"Items"}},zr={cs:{auto:"Automaticky",years:"Roky",months:"Měsíce",none:"Žádný"},en:{auto:"Automatic",years:"Years",months:"Months",none:"None"}};let Er=class extends be{constructor(){super(...arguments),this.labels=$r,this.defaults={default_period:"year",default_level:"l1",top_n:10,chart:"auto",show_totals:!0}}extraSchema(){return[{name:"default_period",selector:{select:{mode:"dropdown",options:mr.map(t=>({value:t,label:Ut(this.hass,Sr,t)}))}}},{name:"default_level",selector:{select:{mode:"dropdown",options:ur.map(t=>({value:t,label:Ut(this.hass,Ar,t)}))}}},{name:"top_n",selector:{number:{min:1,max:50,mode:"box"}}},{name:"chart",selector:{select:{mode:"dropdown",options:gr.map(t=>({value:t,label:Ut(this.hass,zr,t)}))}}},{name:"show_totals",selector:{boolean:{}}}]}};Er=t([dt("rohlik-spending-card-editor")],Er);let Cr=class extends qt{constructor(){super(...arguments),this.strings=xr,this.expanded=new Set,this.monthlyError=!1,this.hasSensor=t=>void 0!==this.entityId(t)}static getConfigElement(){return document.createElement("rohlik-spending-card-editor")}static getStubConfig(t){return{...qt.getStubConfig(t),type:"custom:rohlik-spending-card"}}getCardSize(){return 6}getGridOptions(){return{columns:12,rows:5,min_columns:6,min_rows:3}}get effectivePeriod(){return this.period??this.config?.default_period??"year"}resolveChart(t){const e=this.config?.chart??"auto";return"auto"!==e?e:!1===this.config?.show_years?"none":"month"===t?"months":"years"}get levelsForCurrentPeriod(){return t=this.hasSensor,e=fr(this.effectivePeriod),ur.filter(r=>t(yr(r,e)));var t,e}get hasAnyAnalytics(){return ur.some(t=>this.hasSensor(yr(t,"year"))||this.hasSensor(yr(t,"all")))}get effectiveLevel(){const t=this.levelsForCurrentPeriod;if(0===t.length)return;const e=this.level??this.config?.default_level??"l1";return t.includes(e)?e:t[0]}render(){if(!this.config)return V;if(!this.state("monthly_spent"))return q`<ha-card style=${$t(this.accentStyle)}>
        ${this.renderError(this.t("not_found"))}
      </ha-card>`;const t=this.effectivePeriod,e=!1!==this.config.show_totals,r=this.resolveChart(t);return q`
      <ha-card style=${$t(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:chart-timeline-variant"></ha-icon>
          <span class="title">${this.t("title")}</span>
          <div class="segmented">
            <button
              class=${_t({pill:!0,active:"month"===t})}
              type="button"
              @click=${()=>this.period="month"}
            >
              ${this.t("period_month")}
            </button>
            <button
              class=${_t({pill:!0,active:"year"===t})}
              type="button"
              @click=${()=>this.period="year"}
            >
              ${this.t("period_year")}
            </button>
            <button
              class=${_t({pill:!0,active:"all"===t})}
              type="button"
              @click=${()=>this.period="all"}
            >
              ${this.t("period_all")}
            </button>
          </div>
        </div>

        ${e?this.renderTotals(t):V}
        ${"years"===r?this.renderYearsChart():V}
        ${"months"===r?this.renderMonthsChart():V}
        ${this.renderBreakdown(t)}
        ${this.renderFreshness()}
      </ha-card>
    `}updated(t){super.updated(t),this.maybeFetchMonthly()}maybeFetchMonthly(){if(!this.config||!this.hass)return;if("months"!==this.resolveChart(this.effectivePeriod))return;const t=this.entityId("monthly_spent");if(!t)return;const e=new Date,r=`${e.getFullYear()}-${e.getMonth()}`,i=`${t}:${r}`;if(this.monthlyFetchKey===i)return;this.monthlyFetchKey=i;const s=new Date(e.getFullYear(),e.getMonth()-11,1);this.hass.callWS({type:"recorder/statistics_during_period",start_time:s.toISOString(),end_time:e.toISOString(),statistic_ids:[t],period:"month",units:{},types:["max"]}).then(e=>{this.monthly={entityId:t,monthKey:r,stats:_r(e,t)},this.monthlyError=!1}).catch(()=>{this.monthlyError=!0})}renderTotals(t){const e=this.state("monthly_spent"),r=Number(e?.state),i=new Intl.DateTimeFormat(Ct(this.hass),"month"===t?{month:"long",year:"numeric"}:{month:"long"}).format(new Date),s=this.state("yearly_spent"),o=Number(s?.state),n=s?.attributes?.year,a=Number(s?.attributes?.order_count??0),l=void 0!==n?`${n} · ${this.t("orders_count",{n:a})}`:this.t("orders_count",{n:a});let c,h;if("year"===t)c=Number(s?.attributes?.average_order_value),h=this.t("avg_order");else{const t=this.state("alltime_spent");c=Number(t?.attributes?.average_order_value);const e=Number(t?.attributes?.order_count??0);h=this.t("orders_count",{n:e})}return q`
      <div class="totals">
        <div class="totals-cell">
          <div class="totals-value">
            ${Number.isFinite(r)?It(this.hass,r):"–"}
          </div>
          <div class="totals-caption">${i}</div>
        </div>
        <div class="totals-cell">
          <div class="totals-value">
            ${Number.isFinite(o)?It(this.hass,o):"–"}
          </div>
          <div class="totals-caption">${l}</div>
        </div>
        <div class="totals-cell">
          <div class="totals-value">
            ${void 0!==c&&Number.isFinite(c)?It(this.hass,c):"–"}
          </div>
          <div class="totals-caption">${h}</div>
        </div>
      </div>
    `}renderYearsChart(){const t=function(t){if(!t||"object"!=typeof t)return[];const e=[];for(const[r,i]of Object.entries(t)){const t=Number(r);if(!Number.isFinite(t))continue;if(!i||"object"!=typeof i)continue;const s=i;e.push({year:t,total:br(s.total)??0,orderCount:br(s.order_count)??0})}return e.sort((t,e)=>t.year-e.year),e}(this.state("alltime_spent")?.attributes?.by_year);if(t.length<2)return V;const e=(new Date).getFullYear();return this.renderBarChart(t.map(t=>({key:String(t.year),label:String(t.year),total:t.total,highlighted:t.year===e})))}renderMonthsChart(){const t=this.entityId("monthly_spent");if(!t)return V;if(this.monthlyError)return q`<div class="chart-hint">${this.t("monthly_history_hint")}</div>`;if(!this.monthly||this.monthly.entityId!==t)return V;const e=new Date,r=Number(this.state("monthly_spent")?.state),i=function(t,e,r){const i=new Map;for(const e of t)i.set(wr(e.month),e.total);const s=[];for(let t=11;t>=0;t--){const o=new Date(e.getFullYear(),e.getMonth()-t,1),n=0===t&&void 0!==r&&Number.isFinite(r)?r:i.get(wr(o))??0;s.push({month:o,total:n})}return s}(this.monthly.stats,e,Number.isFinite(r)?r:void 0),s=new Intl.DateTimeFormat(Ct(this.hass),{month:"short"});return this.renderBarChart(i.map((t,e)=>({key:`${t.month.getFullYear()}-${t.month.getMonth()}`,label:s.format(t.month),total:t.total,highlighted:e===i.length-1})))}renderBarChart(t){if(t.length<2)return V;const e=t.reduce((t,e)=>Math.max(t,e.total),0)||1,r=40*t.length-12+12;return q`
      <svg
        class="chart-svg"
        viewBox="0 0 ${r} ${118}"
        preserveAspectRatio="xMidYMid meet"
        role="img"
      >
        ${je(t,t=>t.key,(t,r)=>{const i=Math.max(2,t.total/e*90),s=6+40*r,o=90-i+6,n=t.highlighted?"var(--rohlik-accent)":"color-mix(in srgb, var(--primary-text-color) 15%, transparent)";return K`
              <rect x=${s} y=${o} width=${28} height=${i} rx="4" fill=${n}>
                <title>${It(this.hass,t.total)}</title>
              </rect>
              <text
                x=${s+14}
                y=${112}
                text-anchor="middle"
                font-size="10.5"
                fill="var(--secondary-text-color)"
              >
                ${t.label}
              </text>
            `})}
      </svg>
    `}renderBreakdown(t){if(!this.hasAnyAnalytics)return q`<div class="breakdown-hint">${this.t("enable_hint")}</div>`;const e=fr(t),r=this.levelsForCurrentPeriod,i=this.effectiveLevel;if(!i)return V;const s=this.config.top_n??10,o=this.state(yr(i,e)),{entries:n,enrichedOrders:a,totalOrders:l}=function(t,e){const r=t?.attributes??{},i=r.categories??r.items,s=Array.isArray(i)?i:[],o=[];for(const t of s){if(!t||"object"!=typeof t)continue;const e=t,r="string"==typeof e.name&&""!==e.name.trim()?e.name:void 0,i=br(e.spent);r&&void 0!==i&&o.push({name:r,spent:i,units:br(e.units)??0,avgUnitPrice:br(e.avg_unit_price)??0,id:"string"==typeof e.id||"number"==typeof e.id?e.id:void 0})}o.sort((t,e)=>e.spent-t.spent);const n=br(r.total_count)??o.length,a=br(r.enriched_orders),l=br(r.total_orders);return{entries:o.slice(0,Math.max(0,e)),totalCount:n,enrichedOrders:a,totalOrders:l}}(o,s),c=function(t){const e=t.reduce((t,e)=>Math.max(t,e.spent),0);return e<=0?t.map(()=>0):t.map(t=>Math.max(0,Math.min(100,t.spent/e*100)))}(n),h=this.state("yearly_spent")?.attributes?.year??(new Date).getFullYear();return q`
      ${"month"===t?q`<div class="breakdown-year-hint">
            ${this.t("breakdown_year_hint",{year:h})}
          </div>`:V}
      ${r.length>1?q`
            <div class="pills-row">
              ${je(r,t=>t,t=>q`
                  <button
                    class=${_t({pill:!0,active:i===t})}
                    type="button"
                    @click=${()=>this.level=t}
                  >
                    ${this.t(`level_${t}`)}
                  </button>
                `)}
            </div>
          `:V}
      ${je(n,t=>t.id??t.name,(t,e)=>this.renderBreakdownRow(t,c[e]))}
      ${void 0!==a&&void 0!==l?q`
            <div class="breakdown-footer">
              ${this.t("enriched",{enriched:a,total:l})}
            </div>
          `:V}
    `}renderBreakdownRow(t,e){const r=String(t.id??t.name),i=this.expanded.has(r);return q`
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
              style=${$t({width:`${e}%`})}
            ></span>
          </span>
          <span class="breakdown-spent">${It(this.hass,t.spent)}</span>
        </div>
        ${i?q`
              <div class="breakdown-expand">
                ${this.t("expand_row",{units:t.units,avg:It(this.hass,t.avgUnitPrice)})}
              </div>
            `:V}
      </div>
    `}toggleExpanded(t){const e=new Set(this.expanded);e.has(t)?e.delete(t):e.add(t),this.expanded=e}};Cr.styles=[Bt,kr],t([gt()],Cr.prototype,"period",void 0),t([gt()],Cr.prototype,"level",void 0),t([gt()],Cr.prototype,"expanded",void 0),t([gt()],Cr.prototype,"monthly",void 0),t([gt()],Cr.prototype,"monthlyError",void 0),Cr=t([dt("rohlik-spending-card")],Cr),Vt({type:"rohlik-spending-card",name:"Rohlík.cz Spending",description:"Monthly, yearly and all-time spending totals with a category breakdown."});
