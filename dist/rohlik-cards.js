function e(e,t,i,r){var o,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(s<3?o(n):s>3?o(t,i,n):o(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),o=new WeakMap;let s=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new s(i,e,r)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,m=globalThis,g=m.trustedTypes,f=g?g.emptyScript:"",v=m.reactiveElementPolyfillSupport,y=(e,t)=>e,w={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},_=(e,t)=>!l(e,t),b={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&c(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:o}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const s=r?.call(this);o?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),o=t.litNonce;void 0!==o&&r.setAttribute("nonce",o),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:w;this._$Em=r;const s=o.fromAttribute(t,e.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(e,t,i,r=!1,o){if(void 0!==e){const s=this.constructor;if(!1===r&&(o=this[e]),i??=s.getPropertyOptions(e),!((i.hasChanged??_)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:o},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==o||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,v?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k=globalThis,$=e=>e,S=k.trustedTypes,z=S?S.createPolicy("lit-html",{createHTML:e=>e}):void 0,A="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+C,I=`<${E}>`,O=document,N=()=>O.createComment(""),T=e=>null===e||"object"!=typeof e&&"function"!=typeof e,R=Array.isArray,D="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,j=/>/g,L=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,H=/"/g,F=/^(?:script|style|textarea|title)$/i,q=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),B=q(1),K=q(2),Z=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,Q=O.createTreeWalker(O,129);function Y(e,t){if(!R(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==z?z.createHTML(t):t}class G{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,s=0;const n=e.length-1,a=this.parts,[l,c]=((e,t)=>{const i=e.length-1,r=[];let o,s=2===t?"<svg>":3===t?"<math>":"",n=M;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===M?"!--"===l[1]?n=P:void 0!==l[1]?n=j:void 0!==l[2]?(F.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=L):void 0!==l[3]&&(n=L):n===L?">"===l[0]?(n=o??M,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?L:'"'===l[3]?H:U):n===H||n===U?n=L:n===P||n===j?n=M:(n=L,o=void 0);const h=n===L&&e[t+1].startsWith("/>")?" ":"";s+=n===M?i+I:c>=0?(r.push(a),i.slice(0,c)+A+i.slice(c)+C+h):i+C+(-2===c?t:h)}return[Y(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]})(e,t);if(this.el=G.createElement(l,i),Q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=Q.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(A)){const t=c[s++],i=r.getAttribute(e).split(C),n=/([.?@])?(.*)/.exec(t);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?ie:"?"===n[1]?re:"@"===n[1]?oe:te}),r.removeAttribute(e)}else e.startsWith(C)&&(a.push({type:6,index:o}),r.removeAttribute(e));if(F.test(r.tagName)){const e=r.textContent.split(C),t=e.length-1;if(t>0){r.textContent=S?S.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],N()),Q.nextNode(),a.push({type:2,index:++o});r.append(e[t],N())}}}else if(8===r.nodeType)if(r.data===E)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=r.data.indexOf(C,e+1));)a.push({type:7,index:o}),e+=C.length-1}o++}}static createElement(e,t){const i=O.createElement("template");return i.innerHTML=e,i}}function J(e,t,i=e,r){if(t===Z)return t;let o=void 0!==r?i._$Co?.[r]:i._$Cl;const s=T(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),void 0===s?o=void 0:(o=new s(e),o._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=o:i._$Cl=o),void 0!==o&&(t=J(e,o._$AS(e,t.values),o,r)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??O).importNode(t,!0);Q.currentNode=r;let o=Q.nextNode(),s=0,n=0,a=i[0];for(;void 0!==a;){if(s===a.index){let t;2===a.type?t=new ee(o,o.nextSibling,this,e):1===a.type?t=new a.ctor(o,a.name,a.strings,this,e):6===a.type&&(t=new se(o,this,e)),this._$AV.push(t),a=i[++n]}s!==a?.index&&(o=Q.nextNode(),s++)}return Q.currentNode=O,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),T(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==Z&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>R(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=G.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new X(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new G(e)),t}k(e){R(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const o of e)r===t.length?t.push(i=new ee(this.O(N()),this.O(N()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,o){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(e,t=this,i,r){const o=this.strings;let s=!1;if(void 0===o)e=J(this,e,t,0),s=!T(e)||e!==this._$AH&&e!==Z,s&&(this._$AH=e);else{const r=e;let n,a;for(e=o[0],n=0;n<o.length-1;n++)a=J(this,r[i+n],t,n),a===Z&&(a=this._$AH[n]),s||=!T(a)||a!==this._$AH[n],a===V?e=V:e!==V&&(e+=(a??"")+o[n+1]),this._$AH[n]=a}s&&!r&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}class re extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}}class oe extends te{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??V)===Z)return;const i=this._$AH,r=e===V&&i!==V||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==V&&(i===V||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const ne={I:ee},ae=k.litHtmlPolyfillSupport;ae?.(G,ee),(k.litHtmlVersions??=[]).push("3.3.3");const le=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ce=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let o=r._$litPart$;if(void 0===o){const e=i?.renderBefore??null;r._$litPart$=o=new ee(t.insertBefore(N(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}};ce._$litElement$=!0,ce.finalized=!0,le.litElementHydrateSupport?.({LitElement:ce});const de=le.litElementPolyfillSupport;de?.({LitElement:ce}),(le.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const he=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ue={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:_},pe=(e=ue,t,i)=>{const{kind:r,metadata:o}=i;let s=globalThis.litPropertyMetadata.get(o);if(void 0===s&&globalThis.litPropertyMetadata.set(o,s=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,o,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const o=this[r];t.call(this,i),this.requestUpdate(r,o,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function me(e){return(t,i)=>"object"==typeof i?pe(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ge(e){return me({...e,state:!0,attribute:!1})}
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
const fe=1,ve=2,ye=e=>(...t)=>({_$litDirective$:e,values:t});let we=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _e=ye(class extends we{constructor(e){if(super(e),e.type!==fe||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e)));for(const e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}const i=e.element.classList;for(const e of this.st)e in t||(i.remove(e),this.st.delete(e));for(const e in t){const r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(i.add(e),this.st.add(e)):(i.remove(e),this.st.delete(e)))}return Z}}),be="important",xe=" !"+be,ke=ye(class extends we{constructor(e){if(super(e),e.type!==fe||"style"!==e.name||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{const r=e[i];return null==r?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(e,[t]){const{style:i}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(t)),this.render(t);for(const e of this.ft)null==t[e]&&(this.ft.delete(e),e.includes("-")?i.removeProperty(e):i[e]=null);for(const e in t){const r=t[e];if(null!=r){this.ft.add(e);const t="string"==typeof r&&r.endsWith(xe);e.includes("-")||t?i.setProperty(e,t?r.slice(0,-11):r,t?be:""):i[e]=r}}return Z}}),$e="rohlikcz";
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Se(e){const t=new Set;for(const i of Object.values(e.entities??{}))i.platform===$e&&i.device_id&&t.add(i.device_id);const i=[];for(const r of t){const t=e.devices?.[r];t&&i.push(t)}return i}const ze=new Map;function Ae(e,t){const i=e.entities??{},r=ze.get(t);if(r&&r.entitiesRef===i)return r.map;const o=new Map;for(const e of Object.values(i))e.platform===$e&&e.device_id===t&&e.translation_key&&o.set(e.translation_key,e.entity_id);return ze.set(t,{entitiesRef:i,map:o}),o}function Ce(e){if(!e||"unknown"===e||"unavailable"===e)return null;const t=new Date(e);return Number.isNaN(t.getTime())?null:t}function Ee(e){return e.locale?.language||e.language||"en"}function Ie(e,t){const i=Ee(e),r=(e,t,r)=>new Intl.NumberFormat(i,{style:"unit",unit:t,maximumFractionDigits:r}).format(e);if("mi"===e.config?.unit_system?.length){const e=10*Math.round(t/.3048/10);return e<1e3?r(e,"foot",0):r(t/1609.344,"mile",1)}const o=10*Math.round(t/10);return o<1e3?r(o,"meter",0):r(t/1e3,"kilometer",1)}function Oe(e,t){return new Intl.DateTimeFormat(Ee(e),{hour:"2-digit",minute:"2-digit",hour12:!1}).format(t)}function Ne(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function Te(e,t,i){const r=Ee(e),o=Oe(e,t),s=new Date;if(Ne(t,s))return`${i.today} ${o}`;const n=new Date(s);if(n.setDate(s.getDate()+1),Ne(t,n))return`${i.tomorrow} ${o}`;return`${new Intl.DateTimeFormat(r,{weekday:"short",day:"numeric",month:"short"}).format(t)} ${o}`}const Re={en:{future:["in ",""],past:[""," ago"]},cs:{future:["za ",""],past:["před ",""]}};function De(e,t){const i=e.slice(0,2).toLowerCase();return(Re[i]??Re.en)[t]}function Me(e,t,i){const r=i.replace(/s$/,"");return new Intl.NumberFormat(e,{style:"unit",unit:r,unitDisplay:"short"}).format(t)}function Pe(e,t,i){return`${e}${t}${i}`}function je(e,t){const i=Ee(e),[r,o]=De(i,"future"),s=Math.max(0,Math.round((t.getTime()-Date.now())/1e3)),n=Math.round(s/60);if(s<60)return Pe(r,Me(i,s,"seconds"),o);if(n<60)return Pe(r,Me(i,n,"minutes"),o);const a=Math.floor(n/60),l=n%60;if(a<24){const e=Me(i,a,"hours");return Pe(r,0===l?e:`${e} ${Me(i,l,"minutes")}`,o)}return Pe(r,Me(i,Math.round(n/60/24),"days"),o)}function Le(e,t,i=!1){const r=Ee(e),o=Math.max(0,Math.round(t)),s=Math.floor(o/60),n=o%60;let a;if(a=0===s?Me(r,n,"minutes"):0===n?Me(r,s,"hours"):`${Me(r,s,"hours")} ${Me(r,n,"minutes")}`,!i)return a;const[l,c]=De(r,"future");return Pe(l,a,c)}function Ue(e,t){const i=Ee(e),[r,o]=De(i,"past"),s=Math.max(0,Math.round((Date.now()-t.getTime())/1e3)),n=Math.round(s/60);if(s<60)return Pe(r,Me(i,s,"seconds"),o);if(n<60)return Pe(r,Me(i,n,"minutes"),o);const a=Math.round(n/60);if(a<24)return Pe(r,Me(i,a,"hours"),o);return Pe(r,Me(i,Math.round(a/24),"days"),o)}const He=[{code:"cz",name:"Rohlík.cz",url:"https://www.rohlik.cz",cartUrl:"https://www.rohlik.cz/kosik",currency:"CZK"},{code:"de",name:"Knuspr.de",url:"https://www.knuspr.de",cartUrl:"https://www.knuspr.de",currency:"EUR"},{code:"at",name:"Gurkerl.at",url:"https://www.gurkerl.at",cartUrl:"https://www.gurkerl.at",currency:"EUR"},{code:"hu",name:"Kifli.hu",url:"https://www.kifli.hu",cartUrl:"https://www.kifli.hu",currency:"HUF"},{code:"ro",name:"Sezamo.ro",url:"https://www.sezamo.ro",cartUrl:"https://www.sezamo.ro",currency:"RON"}],Fe=He[0];function qe(e){return e.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().trim()}function Be(e,t){return e&&t?function(e){if(!e)return Fe;const t=qe(e);for(const e of He){const i=qe(e.name);if(t===i||t.includes(i.split(".")[0]))return e}return Fe}(e.devices?.[t]?.manufacturer):Fe}function Ke(e){if("string"!=typeof e)return null;const t=e.trim();return"Kč"===t||"kc"===t.toLowerCase()?"CZK":"€"===t?"EUR":"Ft"===t?"HUF":"lei"===t.toLowerCase()?"RON":/^[A-Z]{3}$/.test(t)?t:null}function Ze(e,t,i,r){const o=Ee(e).slice(0,2).toLowerCase(),s=t[o]?.[i]??t.en?.[i]??i;return r?s.replace(/\{(\w+)(?::([^{}]+))?\}/g,(e,t,i)=>Object.prototype.hasOwnProperty.call(r,t)?void 0===i?String(r[t]):function(e,t,i){if(t.length<2||Number.isNaN(i))return t[t.length-1]??"";const r=new Intl.PluralRules(e).select(i);return 2===t.length?"one"===r?t[0]:t[1]:"one"===r?t[0]:"few"===r?t[1]:t[t.length-1]}(o,i.split("|"),Number(r[t])):e):s}const Ve={cs:{today:"Dnes",tomorrow:"Zítra",updated_ago:"Aktualizováno {time}",refresh:"Obnovit",unavailable:"Nedostupné",error_generic:"Něco se nepovedlo",show_all:"Zobrazit vše ({count})",show_less:"Zobrazit méně",items:"položek",items_count:"{count} {count:položka|položky|položek}",free:"zdarma"},en:{today:"Today",tomorrow:"Tomorrow",updated_ago:"Updated {time}",refresh:"Refresh",unavailable:"Unavailable",error_generic:"Something went wrong",show_all:"Show all ({count})",show_less:"Show less",items:"items",items_count:"{count} {count:item|items}",free:"free"}},We=["cs","en"];function Qe(e,t){return t&&We.includes(t)?Ee(e).slice(0,2).toLowerCase()===t?e:{...e,language:t,locale:{...e.locale??{},language:t}}:e}const Ye=n`
  :host {
    --rohlik-accent: var(--primary-color);
    /* A flex column whose ha-card grows: fill a slot a parent stretches
       (HA's horizontal stack and grid card stretch the hui-card wrapper) but
       never shrink below the content. In an auto-height parent (masonry,
       rows "auto") min-height resolves to 0 and the card is content-sized. */
    display: flex;
    flex-direction: column;
    min-height: 100%;
    /* Lets cards adapt to their own width with @container queries. */
    container-type: inline-size;
  }

  ha-card {
    display: flex;
    flex-direction: column;
    /* Grows to fill the host (see :host), never shrinks below its content. */
    flex: 1 0 auto;
    padding: var(--ha-space-4, 16px);
    box-sizing: border-box;
    /* NOT a scroll container by default. On touch, a scrollable card eats
       the swipe before the dashboard view gets it, so the page stops
       scrolling. Cards are content-sized (rows "auto") instead. */
  }

  /* Only when the user picked a fixed height (see RohlikBaseCard.fixedHeight):
     fill the cell and scroll inside rather than paint over the next card.
     In a sections view (in-grid) a content-sized card also fills its cell,
     which the grid stretches to the tallest card of the row. Elsewhere
     (masonry, stacks) the card keeps its content height, so a parent that
     sets a height (e.g. a horizontal stack) can never squeeze it. */
  :host([fixed]),
  :host([in-grid]),
  :host([fixed]) ha-card,
  :host([in-grid]) ha-card {
    height: 100%;
  }

  :host([fixed]) ha-card {
    overflow-y: auto;
    /* overflow-y: auto would make overflow-x auto too; never scroll sideways. */
    overflow-x: hidden;
  }

  /* In a scrolling flex column, blocks that clip their own overflow (chip
     rows, progress tracks) would shrink to 0 px; keep every block at its
     content height and let the card scroll instead. */
  :host([fixed]) ha-card > * {
    flex-shrink: 0;
  }

  .header {
    display: flex;
    align-items: center;
    gap: var(--ha-space-2, 8px);
    font-size: var(--ha-font-size-l, 16px);
    font-weight: var(--ha-font-weight-medium, 500);
    color: var(--primary-text-color);
    margin-bottom: var(--ha-space-2, 8px);
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
    border-radius: var(--ha-border-radius-pill, 9999px);
    font-size: var(--ha-font-size-s, 12px);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: var(--ha-line-height-normal, 1.6);
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
    font-size: var(--ha-font-size-3xl, 28px);
    font-weight: 600;
    color: var(--primary-text-color);
    line-height: var(--ha-line-height-condensed, 1.2);
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
    /* HA's own buttons are pills. */
    border-radius: var(--ha-border-radius-pill, 9999px);
    /* <button> is border-box by default, a link styled as .btn is not: with
       width: 100% (narrow cards) its padding would stick out of the card. */
    box-sizing: border-box;
    border: none;
    background: var(--rohlik-accent);
    color: var(--text-primary-color, #fff);
    font-family: inherit;
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
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
    /* Sticks to the bottom of the card when the grid gives it extra height. */
    margin-top: auto;
    padding-top: 8px;
    color: var(--secondary-text-color);
    font-size: var(--ha-font-size-s, 12px);
  }

  .footer.stale {
    color: var(--warning-color, #ff9800);
  }

  .error {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: var(--ha-border-radius-md, 8px);
    color: var(--error-color, #db4437);
    background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent);
    font-size: var(--ha-font-size-m, 14px);
  }
`;const Ge=new Set(["hui-horizontal-stack-card","hui-conditional-card"]),Je=new Set(["hui-card","hui-card-edit-mode","hui-card-options"]);const Xe=["cart_price","credit_amount","monthly_spent","yearly_spent","alltime_spent"];class et extends ce{constructor(){super(...arguments),this.entities=new Map}get hass(){return this._localeHass??this._hass}set hass(e){const t=this.hass;this._hass=e,this._localeHass=this.applyLanguage(e),this.requestUpdate("hass",t)}get rawHass(){return this._hass}applyLanguage(e){if(!e||!this.config?.language||"auto"===this.config.language)return;const t=Qe(e,this.config.language);return t===e?void 0:t}setConfig(e){if(!e?.device)throw new Error("Rohlík card: 'device' is required — pick the Rohlík.cz device in the card editor.");this.config=e,this._localeHass=this.applyLanguage(this._hass),this.hass&&(this.entities=Ae(this.hass,this.config.device))}willUpdate(e){e.has("hass")&&this.hass&&this.config&&(this.entities=Ae(this.hass,this.config.device))}getCardSize(){return this.estimatedCardSize()}estimatedCardSize(){return 4}getGridOptions(){return{columns:12,rows:"auto",min_columns:6,min_rows:2}}get fixedHeight(){return!!function(e,t,i,r){if("grid"!==e)return!1;const o=r,s=null!=i?i:o?{rows:o.grid_rows,columns:o.grid_columns}:{},n={...t};for(const[e,t]of Object.entries(s))void 0!==t&&(n[e]=t);return"number"==typeof n.rows}(this.layout,this.config?this.getGridOptions():void 0,this.config?.grid_options,this.config?.layout_options)||"grid"!==this.layout&&this.isConnected&&function(e,t=24){let i=e.parentNode;for(let e=0;i&&e<t;e++){if(i instanceof Element){if(i.classList.contains("card")&&i.classList.contains("fit-rows"))return!0;const e=i.tagName.toLowerCase();if("hui-grid-section"===e||"hui-section"===e||"body"===e)return!1;if(e.includes("-")&&!Ge.has(e)&&!Je.has(e))return!1}i=i instanceof ShadowRoot?i.host:i.parentNode}return!1}(this)}updated(e){super.updated(e),this.toggleAttribute("fixed",this.fixedHeight),this.toggleAttribute("in-grid","grid"===this.layout)}static getStubConfig(e){const t=Se(e);return{device:t[0]?.id??""}}entityId(e){return this.entities.get(e)}state(e){const t=this.entityId(e);return t?this.hass?.states?.[t]:void 0}attr(e,t){return this.state(e)?.attributes?.[t]}isOn(e){return"on"===this.state(e)?.state}deviceName(){if(this.config?.name)return this.config.name;const e=this.hass?.devices?.[this.config?.device];return e?.name_by_user||e?.name||"Rohlík.cz"}get shop(){return Be(this.hass,this.config?.device)}get currency(){for(const e of Xe){const t=Ke(this.attr(e,"unit_of_measurement"));if(t)return t}return this.shop.currency}money(e,t=this.currency){return function(e,t,i="CZK"){const r=Ee(e);if("CZK"===i)return`${new Intl.NumberFormat(r,{minimumFractionDigits:2,maximumFractionDigits:2}).format(t)} Kč`;try{return new Intl.NumberFormat(r,{style:"currency",currency:i,currencyDisplay:"narrowSymbol"}).format(t)}catch{return`${new Intl.NumberFormat(r).format(t)} ${i}`}}(this.hass,e,t)}get accentStyle(){return this.config?.accent?{"--rohlik-accent":this.config.accent}:{}}t(e,t){return Ze(this.hass,{...Ve,...this.mergedStrings()},e,t)}mergedStrings(){const e={};for(const t of new Set([...Object.keys(Ve),...Object.keys(this.strings)]))e[t]={...Ve[t],...this.strings[t]};return e}renderFreshness(e="updated"){const t=Ce(this.state(e)?.state);if(!t)return V;const i=Date.now()-t.getTime()>12e5;return B`
      <div class="footer ${i?"stale":""}">
        ${this.t("updated_ago",{time:Ue(this.hass,t)})}
      </div>
    `}renderError(e){return B`<div class="error">${e}</div>`}}et.styles=Ye,e([me({attribute:!1})],et.prototype,"hass",null),e([me({attribute:!1})],et.prototype,"layout",void 0),e([ge()],et.prototype,"config",void 0),e([ge()],et.prototype,"entities",void 0);let tt=!1;function it(){tt||(tt=!0,console.info("%c ROHLIK-CARDS %c v0.2.1-beta ","color: white; background: #d4145a; font-weight: 700;","color: #d4145a; background: white; font-weight: 700;"))}function rt(e){it(),window.customCards=window.customCards??[],window.customCards.some(t=>t.type===e.type)||window.customCards.push({preview:!0,...e})}function ot(e,t){const i=new Set(t);return(t,r)=>{const o=t?.entities?.[r];if(!o||o.platform!==$e||!o.device_id)return null;if(!o.translation_key||!i.has(o.translation_key))return null;return{config:{type:`custom:${e}`,device:o.device_id}}}}const st=new Map;function nt(e,t){const i=st.get(t);if(i)return i;const r=e.callWS({type:"config/entity_registry/get",entity_id:t}).then(e=>e.config_entry_id).catch(e=>{throw st.delete(t),e});return st.set(t,r),r}async function at(e,t,i,r,o=!1){const s=await e.callService("rohlikcz",i,{config_entry_id:t,...r},void 0,!0,o);return o?s.response:void 0}function lt(e,t,i){const r=new CustomEvent(t,{detail:i,bubbles:!0,composed:!0});e.dispatchEvent(r)}function ct(e,t){lt(e,"hass-more-info",{entityId:t})}const dt=["in_queue","on_the_way","arrived","handing_over","delivered"],ht={phase:null,stopsBefore:null,distanceM:null,minutesLeft:null,etaSource:null,lastMile:!1},ut=216e5;function pt(e){return e.toString().padStart(2,"0")}function mt(e){return`${pt(e.getHours())}:${pt(e.getMinutes())}`}function gt(e){const t=e.tracking;if(!t?.status)return!1;const i=e.orderData?.id;return!e.isOrdered||null==t.orderId||null==i||String(t.orderId)===String(i)}const ft=new Set(["on_the_way","arrived","handing_over"]);function vt(e){return"delivered"===e.status?"delivered":e.courierAtDoor||"arrived"===e.status||"handing_over"===e.status?"at_door":"on_the_way"===e.status?"on_the_way":"in_queue"===e.status?"queued":null}function yt(e,t){const i=function(e,t){const i=e.tracking,r=gt(e);if(r&&"delivered"===i?.status){const e=i.statusSince??t;if(t.getTime()-e.getTime()<=ut)return"delivered"}if(r&&i?.status&&ft.has(i.status))return"arriving";if(r&&i?.courierAtDoor)return"arriving";if(!e.isOrdered&&r&&"in_queue"===i?.status)return"ordered";if(e.isOrdered)return e.since&&t.getTime()>=e.since.getTime()?"arriving":"ordered";const o=e.recentDelivery;if(o){const e=o.till??o.endedAt,i=Math.max(e.getTime(),o.endedAt.getTime());if(t.getTime()-i<=ut)return"delivered"}return"none"}(e,t);let r=null;e.since&&e.till&&(r=`${mt(e.since)}–${mt(e.till)}`);let o=null;if("arriving"===i&&e.since&&e.till&&e.till.getTime()>e.since.getTime()){o=function(e){return Math.min(1,Math.max(0,e))}(((e.eta??t).getTime()-e.since.getTime())/(e.till.getTime()-e.since.getTime()))}const s="delivered"===i&&!e.isOrdered,n=s?e.lastOrderItems??null:e.orderData?.itemsCount??null,a=s?e.lastOrderPrice??null:e.orderData?.priceComposition?.total?.amount??null,l=gt(e),c=(l&&"delivered"===e.tracking?.status?e.tracking.statusSince:null)??(e.recentDelivery?e.recentDelivery.till??e.recentDelivery.endedAt:null),d=e.tracking&&l&&"none"!==i?{phase:vt(e.tracking),stopsBefore:e.tracking.stopsBefore,distanceM:e.tracking.distanceM,minutesLeft:e.tracking.minutesLeft,etaSource:e.tracking.etaSource,lastMile:e.tracking.lastMile}:e.tracking&&"none"!==i?{...ht,minutesLeft:e.tracking.minutesLeft,etaSource:e.tracking.etaSource,lastMile:e.tracking.lastMile}:ht,h=(e.slots??[]).filter(e=>null!=e.start).map(e=>({key:e.key,start:e.start,price:e.price??null}));return{state:i,since:e.since,till:e.till,eta:e.eta,progress:o,windowLabel:r,orderId:e.orderData?.id??null,summaryItems:n,summaryPrice:a,announcementText:e.announcementText??null,announcementExtra:e.announcementExtra??null,announcementUpdatedAt:e.announcementUpdatedAt??null,lastOrderAt:e.lastOrderAt??null,firstDeliveryText:e.firstDeliveryText??null,isReserved:e.isReserved,isExpressAvailable:e.isExpressAvailable,deliveredAt:c,slots:h,tracking:d}}const wt=/till|until|expir|end/i,_t=/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}/;function bt(e,t,i=!0){if(i&&"at_door"===e.tracking.phase)return{kind:"now"};const r=i?function(e,t){if("arriving"!==e.state||!e.eta||null==e.tracking.minutesLeft)return null;const i=(e.eta.getTime()-t.getTime())/1e3;if(i<=0)return null;const r=Math.ceil(i/60);return r>90?null:r}(e,t):null;return null!=r?{kind:"countdown",minutes:r}:e.eta?{kind:"eta",at:e.eta}:e.till?{kind:"by",at:e.till}:{kind:"none"}}const xt=216e5;function kt(e){return`rohlik-delivery-last:${e}`}function $t(e,t){let i;try{i=e.getItem(kt(t))}catch{return null}if(!i)return null;try{const e=JSON.parse(i);return e&&"object"==typeof e?{orderId:e.orderId??null,till:"string"==typeof e.till?e.till:null,seenAt:"string"==typeof e.seenAt?e.seenAt:null,endedAt:"string"==typeof e.endedAt?e.endedAt:null,deliveredAt:"string"==typeof e.deliveredAt?e.deliveredAt:null}:null}catch{return null}}function St(e,t,i){try{e.setItem(kt(t),JSON.stringify(i))}catch{}}function zt(e){if(!e.endedAt)return null;let t=new Date(e.endedAt);if(Number.isNaN(t.getTime()))return null;const i=e.deliveredAt?new Date(e.deliveredAt):null;i&&!Number.isNaN(i.getTime())&&i<t&&(t=i);const r=e.deliveredAt??e.till,o=r?new Date(r):null;return{orderId:e.orderId,till:o&&!Number.isNaN(o.getTime())?o:null,endedAt:t}}function At(e,t){const i=$t(e,t);return i?zt(i):null}function Ct(e,t,i){const r=$t(e,t);if(!r)return null;if(r.endedAt)return zt(r);if(function(e,t){const i=e.seenAt?new Date(e.seenAt):null;if(!i||Number.isNaN(i.getTime()))return!0;if(t.getTime()-i.getTime()>xt)return!0;const r=e.till?new Date(e.till):null;return!!(r&&!Number.isNaN(r.getTime())&&t.getTime()-r.getTime()>xt)}(r,i))return Et(e,t),null;const o={...r,endedAt:i.toISOString()};return St(e,t,o),zt(o)}function Et(e,t){try{e.removeItem(kt(t))}catch{}}function It(){try{if("undefined"!=typeof window&&window.localStorage)return window.localStorage}catch{}return{getItem:()=>null,setItem:()=>{},removeItem:()=>{}}}function Ot(e,t,i){const r=$t(e,t);if(!r?.deliveredAt)return null;if(null!=i&&null!=r.orderId&&String(r.orderId)!==String(i))return null;const o=new Date(r.deliveredAt);return Number.isNaN(o.getTime())?null:o}const Nt=["express","standard","eco"],Tt=["tracking","announcement","slot","last_known"],Rt={m:1,km:1e3,mi:1609.344,nmi:1852,yd:.9144,ft:.3048,in:.0254,cm:.01,mm:.001};function Dt(e){const t=e?.state;return t&&"unknown"!==t&&"unavailable"!==t?t:null}function Mt(e){const t=Dt(e);if(null==t)return null;const i=Number(t);return Number.isFinite(i)?i:null}function Pt(e){const t=Mt(e);if(null==t)return null;const i=String(e?.attributes?.unit_of_measurement??"m"),r=Rt[i];return void 0===r?null:t*r}function jt(e,t,i){const r=It(),o=e("delivery_status");if("off"===e("is_ordered")?.state&&"in_queue"===o?.state)return At(r,t);const s=function(e,t,i,r){const o=t("is_ordered")?.state;if("on"!==o&&"off"!==o)return At(e,i);if("on"===o){const o=r?.id??null,s=At(e,i);return s&&null!=o&&s.orderId!==o&&Et(e,i),function(e,t,i,r=new Date){const o=$t(e,t),s=null!=o&&null!=i.orderId&&String(o.orderId)===String(i.orderId);St(e,t,{orderId:i.orderId,till:i.till?i.till.toISOString():null,seenAt:r.toISOString(),endedAt:null,deliveredAt:s?o.deliveredAt:null})}(e,i,{orderId:o,till:Ce(t("next_order_till")?.state)}),null}return Ct(e,i,new Date)}(r,e,t,i),n="delivered"===o?.state?Ce(o.last_changed):null;if(n){const i=o?.attributes?.order_id;return function(e,t,i,r){const o=$t(e,t),s=r.toISOString(),n=null!=o&&(null==i||null==o.orderId||String(o.orderId)===String(i));if(o&&n){const i=o.deliveredAt?new Date(o.deliveredAt):null;if(i&&!Number.isNaN(i.getTime())&&i.getTime()<=r.getTime())return;return void St(e,t,{...o,deliveredAt:s})}o&&!o.endedAt||St(e,t,{orderId:i,till:s,seenAt:s,endedAt:s,deliveredAt:s})}(r,t,"string"==typeof i||"number"==typeof i?i:null,n),"on"===e("is_ordered")?.state?null:At(r,t)}return s}function Lt(e,t){const i=(t,i)=>e(t)?.attributes?.[i],r=i("is_ordered","order_data")??null,o=e("delivery_status"),s=Dt(o),n=dt.includes(s)?s:null,a=i("delivery_time_remaining","source"),l=Tt.includes(a)?a:null,c=i("delivery_status","order_id"),d=jt(e,t,r),h=n?Ce(o?.last_changed):null,u="string"==typeof c||"number"==typeof c?c:null,p="delivered"===n?Ot(It(),t,u):null,m=r?.id,g=n||null==m||"on"!==e("is_ordered")?.state?null:Ot(It(),t,m),f=g||(p&&h?p<h?p:h:p??h);return{isOrdered:"on"===e("is_ordered")?.state,since:Ce(e("next_order_since")?.state),till:Ce(e("next_order_till")?.state),eta:"slot"===l?null:Ce(e("delivery_time")?.state),orderData:r,announcementText:Dt(e("delivery_info")),announcementExtra:i("delivery_info","Additional Content")??null,announcementUpdatedAt:Ce(i("delivery_info","Updated At")),lastOrderAt:Ce(e("last_order")?.state),lastOrderItems:i("last_order","Items")??null,lastOrderPrice:i("last_order","Price")??null,firstDeliveryText:Dt(e("first_delivery")),isReserved:"on"===e("is_reserved")?.state,isExpressAvailable:"on"===e("is_express_available")?.state,recentDelivery:d,slots:Nt.map(t=>({key:t,start:Ce(e(`${t}_slot`)?.state),price:i(`${t}_slot`,"Price")??null})),tracking:{status:g?"delivered":n,statusSince:f,orderId:g?m??null:u,stopsBefore:Mt(e("stops_before")),distanceM:Pt(e("courier_distance")),minutesLeft:Mt(e("delivery_time_remaining")),etaSource:l,courierAtDoor:"on"===e("courier_at_door")?.state,lastMile:"on"===e("last_mile")?.state}}}const Ut=n`
  .header {
    cursor: pointer;
  }

  /* Courier close (last mile) / at the door: tint the card's own border,
     which ha-card draws from these variables. */
  ha-card.last-mile {
    --ha-card-border-color: var(--rohlik-accent, var(--primary-color));
    --ha-card-border-width: 2px;
  }

  ha-card.at-door {
    --ha-card-border-color: var(--warning-color, #ff9800);
    --ha-card-border-width: 2px;
  }

  ha-card.last-mile .headline .big {
    color: var(--rohlik-accent, var(--primary-color));
  }

  ha-card.at-door .headline .big {
    color: var(--warning-color, #ff9800);
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

  /* Tracking stepper: four dots on a line, done ones filled with the accent. */
  .steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    list-style: none;
    margin: var(--ha-space-3, 12px) 0 var(--ha-space-1, 4px);
    padding: 0;
  }

  .step {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--ha-space-1, 4px);
    min-width: 0;
    color: var(--secondary-text-color);
    font-size: var(--ha-font-size-xs, 10px);
    text-align: center;
  }

  /* Connector to the previous step. */
  .step + .step::before {
    content: "";
    position: absolute;
    top: 4px;
    inset-inline-end: 50%;
    width: 100%;
    height: 2px;
    background: var(--divider-color);
  }

  .step.done + .step::before,
  .step.done + .step.current::before {
    background: var(--rohlik-accent, var(--primary-color));
  }

  .step .dot {
    position: relative;
    z-index: 1;
    width: 10px;
    height: 10px;
    box-sizing: border-box;
    border-radius: var(--ha-border-radius-circle, 50%);
    border: 2px solid var(--divider-color);
    background: var(--card-background-color, #fff);
  }

  .step.done .dot,
  .step.current .dot {
    border-color: var(--rohlik-accent, var(--primary-color));
    background: var(--rohlik-accent, var(--primary-color));
  }

  .step.current .dot {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--rohlik-accent, var(--primary-color)) 25%, transparent);
  }

  .step.current {
    color: var(--primary-text-color);
    font-weight: var(--ha-font-weight-medium, 500);
  }

  .step-label {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tracking-facts {
    display: flex;
    align-items: center;
    gap: var(--ha-space-2, 8px);
    margin: var(--ha-space-2, 8px) 0 var(--ha-space-1, 4px);
    color: var(--primary-text-color);
    font-size: var(--ha-font-size-m, 14px);
  }

  .tracking-facts ha-icon {
    --mdc-icon-size: 18px;
    color: var(--rohlik-accent, var(--primary-color));
    flex-shrink: 0;
  }

  .tracking-facts.alert {
    font-weight: var(--ha-font-weight-medium, 500);
  }

  .tracking-facts.alert ha-icon {
    color: var(--warning-color);
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
    text-align: end;
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

  /* The compact card can fill a taller slot (2-row cell, a row stretched by
     a taller neighbour, a square grid card); keep its single line centred.
     A no-op when the card is content-sized. */
  .compact-row {
    margin-block: auto;
  }

  /* On a narrow compact card the chip gives way (ellipsis) instead of
     pushing the row wider than the card. */
  .compact-row .chip {
    /* Block (not inline-flex), so text-overflow: ellipsis applies; never
       narrower than a readable few letters (it wraps instead). */
    display: block;
    flex: 0 1 auto;
    min-width: 4.5em;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Icon, time and chip on one line; when the chip can't fit with its
     readable minimum it wraps onto a second line (the compact card has room
     in its 2-row cell) instead of being squeezed or cutting off the time. */
  .compact-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 10px;
    cursor: pointer;
  }

  .compact-row ha-icon {
    color: var(--rohlik-accent, var(--primary-color));
    --mdc-icon-size: 24px;
    flex-shrink: 0;
  }

  /* The time never gives way to the chip; it only ellipsizes if it alone is
     wider than the card (next to the 24 px icon and the 10 px gap). */
  .compact-row .headline {
    flex: 1 0 auto;
    max-width: calc(100% - 34px);
    margin: 0;
    overflow: hidden;
  }

  .compact-row .big {
    font-size: 1.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* A default 6-column compact card in a narrow section: a smaller headline
     keeps "Tomorrow 06:00" whole. */
  @container (max-width: 240px) {
    .compact-row .big {
      font-size: 1.1rem;
    }
  }

  @container (max-width: 200px) {
    .compact-row .big {
      font-size: 0.95rem;
    }
  }

  @container (max-width: 180px) {
    .compact-row .big {
      font-size: 0.85rem;
    }
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
`,Ht={cs:{title:"Příští rozvoz",chip_arriving:"Na cestě",chip_ordered:"Objednáno",chip_delivered:"Doručeno",chip_none:"Bez objednávky",chip_express:"Expres k dispozici",chip_reserved:"Rezervovaný termín",estimated:"odhad",estimated_at:"odhad {time}",by:"do",delivered_caption:"doručeno",nearest_slot:"Nejbližší termín",window:"Okno",order:"objednávka",announcement_updated:"Aktualizováno {time}",refresh_failed:"Obnovení se nezdařilo",no_entities:"Na tomto zařízení nebyly nalezeny entity Rohlík",reserved_until:"Rezervováno do {time}",shop_link:"Objednat znovu na {shop}",tracking:"Sledování zásilky",phase_queued:"Ve frontě",phase_on_the_way:"Na cestě",phase_at_door:"Kurýr u dveří",phase_delivered:"Doručeno",step_queued:"Ve frontě",step_on_the_way:"Na cestě",step_at_door:"U dveří",step_delivered:"Doručeno",stops_before:"{count} {count:zastávka|zastávky|zastávek} před vámi",stops_short:"{count} {count:zastávka|zastávky|zastávek}",you_are_next:"Jste na řadě",now:"Teď",distance_away:"{distance} od vás",courier_at_door:"Kurýr je u vašich dveří",courier_close:"Kurýr je blízko",source_tracking:"sledování kurýra",source_announcement:"oznámení kurýra",source_last_known:"poslední známý",slot_express:"Expres",slot_standard:"Standard",slot_eco:"Eko"},en:{title:"Next delivery",chip_arriving:"Arriving",chip_ordered:"Ordered",chip_delivered:"Delivered",chip_none:"No order",chip_express:"Express available",chip_reserved:"Slot reserved",estimated:"estimated",estimated_at:"estimated {time}",by:"by",delivered_caption:"delivered",nearest_slot:"nearest slot",window:"Window",order:"order",announcement_updated:"Updated {time}",refresh_failed:"Refresh failed",no_entities:"Rohlík entities not found on this device",reserved_until:"Reserved until {time}",shop_link:"Order again on {shop}",tracking:"Delivery tracking",phase_queued:"Queued",phase_on_the_way:"On the way",phase_at_door:"At the door",phase_delivered:"Delivered",step_queued:"Queued",step_on_the_way:"On the way",step_at_door:"At the door",step_delivered:"Delivered",stops_before:"{count} {count:stop|stops} before you",stops_short:"{count} {count:stop|stops}",you_are_next:"You're next",now:"Now",distance_away:"{distance} away",courier_at_door:"The courier is at your door",courier_close:"The courier is close",source_tracking:"courier tracking",source_announcement:"courier announcement",source_last_known:"last known",slot_express:"Express",slot_standard:"Standard",slot_eco:"Eco"}},Ft={cs:{device:"Zařízení",name:"Vlastní název",show_announcement:"Zobrazit oznámení kurýra",show_order_summary:"Zobrazit shrnutí objednávky",show_express_chip:"Zobrazit chip Expres",show_refresh:"Zobrazit tlačítko Obnovit",show_slots:"Zobrazit termíny",show_shop_link:"Odkaz na obchod",show_tracking:"Zobrazit sledování kurýra",show_countdown:"Odpočet minut v posledních 90 minutách",compact:"Kompaktní zobrazení"},en:{device:"Device",name:"Custom name",show_announcement:"Show courier announcement",show_order_summary:"Show order summary",show_express_chip:"Show express chip",show_refresh:"Show refresh button",show_slots:"Show upcoming slots",show_shop_link:"Show shop link",show_tracking:"Show courier tracking",show_countdown:"Minutes countdown in the last 90 minutes",compact:"Compact layout"}},qt=[{name:"device",required:!0,selector:{device:{filter:{integration:"rohlikcz"}}}},{name:"name",selector:{text:{}}},{name:"language",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (Home Assistant)"},{value:"cs",label:"Čeština"},{value:"en",label:"English"}]}}}],Bt={cs:{device:"Zařízení (účet Rohlík)",name:"Vlastní název",language:"Jazyk karty"},en:{device:"Device (Rohlík account)",name:"Custom name",language:"Card language"}};class Kt extends ce{constructor(){super(...arguments),this.defaults={},this.computeLabel=e=>{const t={};for(const e of new Set([...Object.keys(Bt),...Object.keys(this.labels)]))t[e]={...Bt[e],...this.labels[e]};return Ze(this.hass,t,e.name)||e.name},this.onValueChanged=e=>{e.stopPropagation();const t={...this.config,...e.detail.value};"auto"!==t.language&&""!==t.language||delete t.language;for(const[e,i]of Object.entries(this.defaults))e in t&&t[e]===i&&delete t[e];lt(this,"config-changed",{config:t})}}setConfig(e){this.config=e}get schema(){return[...qt,...this.extraSchema()]}get formData(){return{language:"auto",...this.defaults,...this.config}}render(){return this.hass&&this.config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this.formData}
        .schema=${this.schema}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    `:V}}e([ge()],Kt.prototype,"hass",void 0),e([ge()],Kt.prototype,"config",void 0);let Zt=class extends Kt{constructor(){super(...arguments),this.labels=Ft,this.defaults={show_announcement:!0,show_order_summary:!0,show_express_chip:!0,show_refresh:!0,show_slots:!0,show_shop_link:!0,show_tracking:!0,show_countdown:!0,compact:!1}}extraSchema(){return[{name:"show_announcement",selector:{boolean:{}}},{name:"show_order_summary",selector:{boolean:{}}},{name:"show_express_chip",selector:{boolean:{}}},{name:"show_refresh",selector:{boolean:{}}},{name:"show_slots",selector:{boolean:{}}},{name:"show_shop_link",selector:{boolean:{}}},{name:"show_tracking",selector:{boolean:{}}},{name:"show_countdown",selector:{boolean:{}}},{name:"compact",selector:{boolean:{}}}]}};Zt=e([he("rohlik-delivery-card-editor")],Zt);const Vt={arriving:"ok",ordered:"neutral",delivered:"ok",none:"neutral"},Wt={none:"mdi:calendar-clock",ordered:"mdi:truck-delivery",arriving:"mdi:truck-fast",delivered:"mdi:check-circle"},Qt=["queued","on_the_way","at_door","delivered"],Yt={express:"mdi:lightning-bolt",standard:"mdi:truck-delivery",eco:"mdi:leaf"};let Gt=class extends et{constructor(){super(...arguments),this.strings=Ht,this.refreshing=!1,this.refreshError=null,this.onHeaderTap=()=>{if(this.tapDisabled)return;const e=this.entityId("is_ordered");e&&ct(this,e)},this.onHeaderKeydown=e=>{this.tapDisabled||"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.onHeaderTap())},this.onRefresh=async e=>{if(e.stopPropagation(),this.refreshing)return;const t=this.entityId("is_ordered");if(t){this.refreshing=!0,this.refreshError=null;try{const e=await nt(this.hass,t);if(!e)throw new Error("no config entry");const i=this.getView(),r="arriving"===i.state||"ordered"===i.state?"update_delivery_times":"refresh_slots";await at(this.hass,e,r)}catch{this.refreshError=this.t("refresh_failed")}finally{this.refreshing=!1}}}}static getConfigElement(){return document.createElement("rohlik-delivery-card-editor")}static getStubConfig(e){return{...et.getStubConfig(e),type:"custom:rohlik-delivery-card"}}connectedCallback(){super.connectedCallback(),this.tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),void 0!==this.tickTimer&&(clearInterval(this.tickTimer),this.tickTimer=void 0)}estimatedCardSize(){return this.config?.compact?2:9}getGridOptions(){return this.config?.compact?{columns:6,rows:2,min_columns:6,min_rows:2}:{columns:12,rows:"auto",min_columns:6,min_rows:3}}buildInput(){return Lt(e=>this.state(e),this.config.device)}getView(){return yt(this.buildInput(),new Date)}get tapDisabled(){const e=this.config?.tap_action;return"none"===e||!(!e||"object"!=typeof e||"none"!==e.action)}render(){if(!this.config)return V;if(!this.entityId("is_ordered"))return B`
        <ha-card style=${ke(this.accentStyle)}>${this.renderError(this.t("no_entities"))}</ha-card>
      `;const e=this.getView();return B`
      <ha-card class=${_e(this.closeClass(e))} style=${ke(this.accentStyle)}>
        ${this.config.compact?this.renderCompact(e):this.renderFull(e)}
      </ha-card>
    `}stateLabel(e){const t="delivered"===e.state?null:e.tracking.phase;return t?this.t(`phase_${t}`):this.t(`chip_${e.state}`)}renderStateChip(e){const t="delivered"===e.state?null:e.tracking.phase,i="at_door"===t?"warn":"queued"===t?"neutral":Vt[e.state];return B`<span class="chip ${i}">${this.stateLabel(e)}</span>`}renderChips(e){const t=!1!==this.config.show_express_chip&&e.isExpressAvailable,i="none"===e.state&&e.isReserved;return B`
      <div class="chips">
        ${this.renderStateChip(e)}
        ${t?B`<span class="chip warn">${this.t("chip_express")}</span>`:V}
        ${i?B`<span class="chip neutral">${this.t("chip_reserved")}</span>`:V}
      </div>
    `}renderCompact(e){return B`
      <div
        class="compact-row"
        @click=${this.onHeaderTap}
        @keydown=${this.onHeaderKeydown}
        role=${this.tapDisabled?"group":"button"}
        tabindex=${this.tapDisabled?V:"0"}
        aria-label=${`${this.headlineMain(e,!0)} · ${this.stateLabel(e)}`}
      >
        <ha-icon icon=${Wt[e.state]}></ha-icon>
        <div class="headline">
          <span class="big">${this.headlineMain(e,!0)}</span>
        </div>
        ${this.renderStateChip(e)}
      </div>
    `}renderFull(e){const t=!1!==this.config.show_announcement&&("arriving"===e.state||"ordered"===e.state)&&!!e.announcementText,i=!1!==this.config.show_order_summary&&null!=e.summaryItems,r=!1!==this.config.show_refresh,o=!("arriving"!==e.state&&"ordered"!==e.state||!e.since||!e.till),s=!1!==this.config.show_slots&&"none"===e.state&&e.slots.length>0,n=!1!==this.config.show_shop_link&&"delivered"===e.state,a=!1!==this.config.show_tracking&&("arriving"===e.state||"ordered"===e.state)&&null!=e.tracking.phase,l="none"===e.state&&e.isReserved?function(e){if(!e)return null;for(const[t,i]of Object.entries(e)){if(!wt.test(t))continue;if("string"!=typeof i||!_t.test(i))continue;const e=new Date(i);if(!Number.isNaN(e.getTime()))return e}return null}(this.state("is_reserved")?.attributes):null,c=this.headlineCaption(e);return B`
      <div
        class=${_e({header:!0,static:this.tapDisabled})}
        @click=${this.onHeaderTap}
        @keydown=${this.onHeaderKeydown}
        role=${this.tapDisabled?V:"button"}
        tabindex=${this.tapDisabled?V:"0"}
      >
        <ha-icon icon="mdi:truck-delivery"></ha-icon>
        <span class="title">${this.config.name||this.t("title")}</span>
        ${this.renderChips(e)}
      </div>

      <div class="headline">
        <span class="big">${this.headlineMain(e)}</span>
      </div>
      ${c?B`<div class="caption">${c}</div>`:V}

      ${o?B`<div class="sub">${this.renderSub(e)}</div>`:V}
      ${a?this.renderTracking(e):V}
      ${"arriving"===e.state?this.renderTrack(e):V}
      ${l?B`<div class="reserved-line">${this.t("reserved_until",{time:Oe(this.hass,l)})}</div>`:V}
      ${s?this.renderSlots(e):V}
      ${t?B`<div class="row">${this.renderAnnouncement(e)}</div>`:V}
      ${i?B`<div class="row">${this.renderSummary(e)}</div>`:V}
      ${this.refreshError?B`<div class="error">${this.refreshError}</div>`:V}
      ${r||n?B`
            <div class="actions">
              ${n?B`
                    <a class="btn ghost" href=${this.shop.url} target="_blank" rel="noopener">
                      ${this.t("shop_link",{shop:this.shop.name})}
                    </a>
                  `:V}
              ${r?B`
                    <button class="btn ghost" ?disabled=${this.refreshing} @click=${this.onRefresh}>
                      <ha-icon
                        icon="mdi:refresh"
                        class=${_e({spin:this.refreshing})}
                      ></ha-icon>
                      ${this.t("refresh")}
                    </button>
                  `:V}
            </div>
          `:V}
      ${this.renderFreshness()}
    `}renderSlots(e){return B`<div class="slots">${e.slots.map(e=>this.renderSlotRow(e))}</div>`}renderSlotRow(e){const t=Te(this.hass,e.start,{today:this.t("today"),tomorrow:this.t("tomorrow")}),i=0===e.price?this.t("free"):null!=e.price?this.money(e.price):"";return B`
      <div class="slot-row">
        <ha-icon icon=${Yt[e.key]}></ha-icon>
        <span class="slot-label">${this.t(`slot_${e.key}`)}</span>
        <span class="slot-day">${t}</span>
        <span class="slot-price">${i}</span>
      </div>
    `}arriving(e,t=!1){return bt(e,new Date,!t&&!1!==this.config.show_countdown)}closeClass(e){const t="arriving"===e.state&&!1!==this.config.show_countdown,i=t&&"at_door"===e.tracking.phase;return{"last-mile":t&&e.tracking.lastMile&&!i,"at-door":i}}headlineMain(e,t=!1){switch(e.state){case"arriving":{const i=this.arriving(e,t);switch(i.kind){case"now":return this.t("now");case"countdown":return Le(this.hass,i.minutes);case"eta":case"by":return Oe(this.hass,i.at);default:return"—"}}case"ordered":return e.since?Te(this.hass,e.since,{today:this.t("today"),tomorrow:this.t("tomorrow")}):e.tracking.phase?this.t(`phase_${e.tracking.phase}`):"—";case"delivered":return e.deliveredAt?Oe(this.hass,e.deliveredAt):"—";default:return e.firstDeliveryText??"—"}}headlineCaption(e){switch(e.state){case"arriving":{const t=this.arriving(e);if("now"===t.kind||"none"===t.kind)return"";if("by"===t.kind||!e.eta)return this.t("by");const i="countdown"===t.kind,r=[i?this.t("estimated_at",{time:Oe(this.hass,e.eta)}):this.t("estimated")],o=e.tracking.etaSource;return o&&r.push(this.t(`source_${o}`)),!i&&e.eta.getTime()-Date.now()>=6e4&&r.push(je(this.hass,e.eta)),r.join(" · ")}case"ordered":return e.since?je(this.hass,e.since):"";case"delivered":return this.t("delivered_caption");default:return this.t("nearest_slot")}}renderSub(e){if(!e.since||!e.till)return V;const t=Te(this.hass,e.since,{today:this.t("today"),tomorrow:this.t("tomorrow")}),i=[`${this.t("window")} ${t} – ${Oe(this.hass,e.till)}`];return null!=e.orderId&&i.push(`${this.t("order")} ${e.orderId}`),B`${i.join(" · ")}`}renderTracking(e){const{phase:t,stopsBefore:i,distanceM:r,lastMile:o}=e.tracking,s=t?Qt.indexOf(t):-1,n=[];return"at_door"===t?n.push(this.t("courier_at_door")):null!=i&&n.push(0===i?this.t("you_are_next"):this.t("stops_before",{count:i})),null!=r&&"at_door"!==t&&n.push(this.t("distance_away",{distance:Ie(this.hass,r)})),o&&"at_door"!==t&&!n.length&&n.push(this.t("courier_close")),B`
      <ol class="steps" aria-label=${this.t("tracking")}>
        ${Qt.map((e,t)=>B`
            <li
              class=${_e({step:!0,done:t<s,current:t===s})}
              aria-current=${t===s?"step":V}
            >
              <span class="dot"></span>
              <span class="step-label">${this.t(`step_${e}`)}</span>
            </li>
          `)}
      </ol>
      ${n.length?B`<div class=${_e({"tracking-facts":!0,alert:"at_door"===t})}>
            <ha-icon icon=${"at_door"===t?"mdi:door-open":"mdi:map-marker-path"}></ha-icon>
            <span>${n.join(" · ")}</span>
          </div>`:V}
    `}renderTrack(e){if(!e.since||!e.till||null==e.progress)return V;const t=new Date((e.since.getTime()+e.till.getTime())/2);return B`
      <div class="track-wrap">
        <div class="track">
          <div class="track-fill" style=${ke({width:100*e.progress+"%"})}></div>
          <div class="track-marker" style=${ke({left:100*e.progress+"%"})}></div>
        </div>
        <div class="ticks">
          <span>${Oe(this.hass,e.since)}</span>
          <span>${Oe(this.hass,t)}</span>
          <span>${Oe(this.hass,e.till)}</span>
        </div>
      </div>
    `}renderAnnouncement(e){return B`
      <div class="announce">
        <span class="text">${e.announcementText}</span>
        <span class="meta">
          ${e.announcementUpdatedAt?this.t("announcement_updated",{time:Oe(this.hass,e.announcementUpdatedAt)}):V}
          ${e.announcementExtra?` · ${e.announcementExtra}`:V}
        </span>
      </div>
    `}renderSummary(e){const t=this.t("items_count",{count:e.summaryItems??0}),i=null!=e.summaryPrice?this.money(e.summaryPrice):"";return B`<span>${[t,i].filter(Boolean).join(" · ")}</span>`}};Gt.styles=[Ye,Ut],e([ge()],Gt.prototype,"refreshing",void 0),e([ge()],Gt.prototype,"refreshError",void 0),Gt=e([he("rohlik-delivery-card")],Gt),rt({type:"rohlik-delivery-card",documentationURL:"https://github.com/dvejsada/rohlik-cz-HA-cards/blob/main/docs/cards/delivery-card.md",getEntitySuggestion:ot("rohlik-delivery-card",["is_ordered","delivery_time","delivery_status","delivery_time_remaining","stops_before","courier_distance","courier_at_door","last_mile","next_order_since","next_order_till","delivery_info","last_order","delivery_calendar"]),name:"Rohlík.cz Next Delivery",description:"Shows the state of your next Rohlík.cz order: ordered, on its way, or delivered.",preview:!0});const Jt={cs:{device:"Zařízení",name:"Vlastní název",show_name:"Zobrazit název zařízení"},en:{device:"Device",name:"Custom name",show_name:"Show device name"}};let Xt=class extends Kt{constructor(){super(...arguments),this.labels=Jt}extraSchema(){return[{name:"show_name",selector:{boolean:{}}}]}};Xt=e([he("rohlik-delivery-badge-editor")],Xt);let ei=class extends ce{constructor(){super(...arguments),this.entities=new Map,this.onClick=()=>{const e=this.entityId("is_ordered");e&&ct(this,e)},this.onKeydown=e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.onClick())}}get hass(){return this._localeHass??this._hass}set hass(e){const t=this.hass;this._hass=e,this._localeHass=this.applyLanguage(e),this.requestUpdate("hass",t)}applyLanguage(e){if(!e||!this.config?.language||"auto"===this.config.language)return;const t=Qe(e,this.config.language);return t===e?void 0:t}setConfig(e){if(!e?.device)throw new Error("Rohlík badge: 'device' is required — pick the Rohlík.cz device in the badge editor.");this.config=e,this._localeHass=this.applyLanguage(this._hass),this.hass&&(this.entities=Ae(this.hass,this.config.device))}willUpdate(e){e.has("hass")&&this.hass&&this.config&&(this.entities=Ae(this.hass,this.config.device))}connectedCallback(){super.connectedCallback(),this.tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),void 0!==this.tickTimer&&(clearInterval(this.tickTimer),this.tickTimer=void 0)}static getConfigElement(){return document.createElement("rohlik-delivery-badge-editor")}static getStubConfig(e){const t=Se(e);return{device:t[0]?.id??""}}entityId(e){return this.entities.get(e)}entityState(e){const t=this.entityId(e);return t?this.hass?.states?.[t]:void 0}t(e,t){const i={};for(const e of new Set([...Object.keys(Ve),...Object.keys(Ht)]))i[e]={...Ve[e],...Ht[e]};return Ze(this.hass,i,e,t)}deviceName(){if(this.config?.name)return this.config.name;const e=this.hass?.devices?.[this.config?.device];return e?.name_by_user||e?.name||"Rohlík.cz"}buildInput(){return Lt(e=>this.entityState(e),this.config.device)}render(){if(!this.config||!this.hass||!this.entityId("is_ordered"))return V;const e=yt(this.buildInput(),new Date),t="delivered"===e.state?null:e.tracking.phase,i="none"===e.state&&e.isExpressAvailable||"at_door"===t,r={...this.config.accent?{"--rohlik-accent":this.config.accent}:{},...i?{"--rohlik-icon-color":"var(--warning-color)"}:{}},o=t?this.t(`phase_${t}`):this.t(`chip_${e.state}`),s=this.config.show_name?`${this.deviceName()} · ${o}`:o,n="delivered"===e.state?"mdi:check":"at_door"===t?"mdi:door-open":"mdi:truck-delivery";return B`
      <div
        class="badge"
        style=${ke(r)}
        @click=${this.onClick}
        @keydown=${this.onKeydown}
        role="button"
        tabindex="0"
      >
        <div class="icon-circle">
          <ha-icon icon=${n}></ha-icon>
        </div>
        <div class="text">
          <span class="label">${s}</span>
          <span class="value">${this.value(e)}</span>
        </div>
      </div>
    `}value(e){switch(e.state){case"arriving":{const{stopsBefore:t}=e.tracking,i=bt(e,new Date);if("now"===i.kind)return this.t("now");const r="countdown"===i.kind?Le(this.hass,i.minutes,!0):"eta"===i.kind?Oe(this.hass,i.at):"by"===i.kind?`${this.t("by")} ${Oe(this.hass,i.at)}`:"—";if(null==t)return r;return`${r} · ${0===t?this.t("you_are_next"):this.t("stops_short",{count:t})}`}case"ordered":return e.since?Te(this.hass,e.since,{today:this.t("today"),tomorrow:this.t("tomorrow")}):e.tracking.phase?this.t(`phase_${e.tracking.phase}`):"—";case"delivered":return e.deliveredAt?Oe(this.hass,e.deliveredAt):"—";default:return e.firstDeliveryText??"—"}}};var ti;ei.styles=n`
    :host {
      --rohlik-accent: var(--primary-color);
      display: inline-flex;
      max-width: 100%;
    }

    .badge {
      display: flex;
      align-items: center;
      gap: 8px;
      height: var(--ha-badge-size, 36px);
      min-width: var(--ha-badge-size, 36px);
      padding: 0 12px 0 6px;
      box-sizing: border-box;
      border-radius: var(--ha-badge-border-radius, calc(var(--ha-badge-size, 36px) / 2));
      border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color));
      box-shadow: var(--ha-card-box-shadow, none);
      backdrop-filter: var(--ha-card-backdrop-filter, none);
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
      border-radius: var(--ha-border-radius-circle, 50%);
      flex-shrink: 0;
      background: color-mix(in srgb, var(--rohlik-icon-color, var(--rohlik-accent)) 15%, transparent);
    }

    ha-icon {
      color: var(--rohlik-icon-color, var(--rohlik-accent));
      --mdc-icon-size: var(--ha-badge-icon-size, 18px);
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
      font-size: var(--ha-font-size-xs, 10px);
      text-transform: uppercase;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .value {
      color: var(--primary-text-color);
      font-size: var(--ha-badge-font-size, var(--ha-font-size-s, 12px));
      font-weight: var(--ha-font-weight-medium, 500);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `,e([me({attribute:!1})],ei.prototype,"hass",null),e([ge()],ei.prototype,"config",void 0),e([ge()],ei.prototype,"entities",void 0),ei=e([he("rohlik-delivery-badge")],ei),ti={type:"rohlik-delivery-badge",documentationURL:"https://github.com/dvejsada/rohlik-cz-HA-cards/blob/main/docs/cards/delivery-card.md#badge--rohlik-delivery-badge",name:"Rohlík.cz Delivery Badge",description:"Compact status pill for your next Rohlík.cz delivery.",preview:!0},it(),window.customBadges=window.customBadges??[],window.customBadges.some(e=>e.type===ti.type)||window.customBadges.push({preview:!0,...ti});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const{I:ii}=ne,ri=e=>e,oi=()=>document.createComment(""),si=(e,t,i)=>{const r=e._$AA.parentNode,o=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=r.insertBefore(oi(),o),s=r.insertBefore(oi(),o);i=new ii(t,s,e,e.options)}else{const t=i._$AB.nextSibling,s=i._$AM,n=s!==e;if(n){let t;i._$AQ?.(e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==s._$AU&&i._$AP(t)}if(t!==o||n){let e=i._$AA;for(;e!==t;){const t=ri(e).nextSibling;ri(r).insertBefore(e,o),e=t}}}return i},ni=(e,t,i=e)=>(e._$AI(t,i),e),ai={},li=(e,t=ai)=>e._$AH=t,ci=e=>{e._$AR(),e._$AA.remove()},di=(e,t,i)=>{const r=new Map;for(let o=t;o<=i;o++)r.set(e[o],o);return r},hi=ye(class extends we{constructor(e){if(super(e),e.type!==ve)throw Error("repeat() can only be used in text expressions")}dt(e,t,i){let r;void 0===i?i=t:void 0!==t&&(r=t);const o=[],s=[];let n=0;for(const t of e)o[n]=r?r(t,n):n,s[n]=i(t,n),n++;return{values:s,keys:o}}render(e,t,i){return this.dt(e,t,i).values}update(e,[t,i,r]){const o=(e=>e._$AH)(e),{values:s,keys:n}=this.dt(t,i,r);if(!Array.isArray(o))return this.ut=n,s;const a=this.ut??=[],l=[];let c,d,h=0,u=o.length-1,p=0,m=s.length-1;for(;h<=u&&p<=m;)if(null===o[h])h++;else if(null===o[u])u--;else if(a[h]===n[p])l[p]=ni(o[h],s[p]),h++,p++;else if(a[u]===n[m])l[m]=ni(o[u],s[m]),u--,m--;else if(a[h]===n[m])l[m]=ni(o[h],s[m]),si(e,l[m+1],o[h]),h++,m--;else if(a[u]===n[p])l[p]=ni(o[u],s[p]),si(e,o[h],o[u]),u--,p++;else if(void 0===c&&(c=di(n,p,m),d=di(a,h,u)),c.has(a[h]))if(c.has(a[u])){const t=d.get(n[p]),i=void 0!==t?o[t]:null;if(null===i){const t=si(e,o[h]);ni(t,s[p]),l[p]=t}else l[p]=ni(i,s[p]),si(e,o[h],i),o[t]=null;p++}else ci(o[u]),u--;else ci(o[h]),h++;for(;p<=m;){const t=si(e,l[m+1]);ni(t,s[p]),l[p++]=t}for(;h<=u;){const e=o[h++];null!==e&&ci(e)}return this.ut=n,li(e,l),Z}}),ui=n`
  .adding {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 8px 0 4px;
    font-size: 13px;
    color: var(--secondary-text-color);
  }

  /* Scrolls only when list_max_height applies (pointer-fine devices, see
     listMaxHeight() in cart-card.ts). No overscroll-behavior: once the list
     reaches its end the scroll must chain to the dashboard view. */
  /* Never grows into spare height (a stretched or fixed cell), so "Show
     all" stays right under the last line, and never shrinks (a parent with
     a set height can't squeeze it; max-height caps it on desktop). */
  .lines {
    flex: 0 0 auto;
    min-height: 0;
    overflow-y: auto;
  }

  /* User-chosen fixed height: like the other cards, the list keeps its
     natural height (shared :host([fixed]) ha-card > * rule, and
     listMaxHeight() lifts the desktop cap) and the card is the one scroller,
     as HA's own to-do card does — no nested scroll region on any device. */

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
    box-shadow: var(--ha-box-shadow-m, 0 8px 24px rgba(0, 0, 0, 0.18));
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
    text-align: end;
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
`,pi={cs:{title:"Nákupní košík",can_order:"Nad minimem",ready_to_order:"Připraveno k objednání",below_minimum:"Pod minimem",below_minimum_by:"Do minimální hodnoty objednávky chybí {amount}",empty_cart:"Košík je prázdný",last_order_hint:"Váš poslední nákup měl {count} {count:položku|položky|položek}",search_placeholder:"Hledat na Rohlíku…",favourite_only:"Jen oblíbené",add:"Přidat",remove:"Odebrat",uncategorised:"Bez kategorie",missing_entities:"Chybí entity nákupního košíku — zkontrolujte integraci HA-RohlikCZ.",load_error:"Nepodařilo se načíst obsah košíku.",action_error:"Akci se nepodařilo dokončit, zkuste to prosím znovu.",search_error:"Vyhledávání selhalo.",search_add_error:"Přidání do košíku selhalo.",no_results:"Žádné výsledky",adding:"Přidávám {name}…",order:"Objednat",below_minimum_order:"Pod minimální hodnotou objednávky",order_hint:"Otevře košík na {shop} v novém okně",order_hint_shop:"Otevře {shop} v novém okně"},en:{title:"Shopping cart",can_order:"Above minimum",ready_to_order:"Ready to order",below_minimum:"Below minimum",below_minimum_by:"{amount} short of the minimum order value",empty_cart:"Cart is empty",last_order_hint:"Your last order had {count} {count:item|items}",search_placeholder:"Search Rohlík…",favourite_only:"Favourites only",add:"Add",remove:"Remove",uncategorised:"Uncategorised",missing_entities:"Shopping cart entities are missing — check the HA-RohlikCZ integration.",load_error:"Failed to load the cart contents.",action_error:"Couldn't complete that action, please try again.",search_error:"Search failed.",search_add_error:"Adding to cart failed.",no_results:"No results",adding:"Adding {name}…",order:"Order",below_minimum_order:"Below minimum order",order_hint:"Opens the cart on {shop} in a new tab",order_hint_shop:"Opens {shop} in a new tab"}},mi={cs:{device:"Zařízení",name:"Vlastní název",show_search:"Zobrazit vyhledávání",group_by_category:"Seskupit podle kategorie",show_brand:"Zobrazit značku",min_order:"Minimální hodnota objednávky (prázdné = minimum obchodu, 0 = neposuzovat)",list_max_height:"Max. výška seznamu (0 = bez omezení)",max_items:"Max. počet zobrazených položek (prázdné = automaticky, 0 = vše)",show_order_button:"Tlačítko Objednat",checkout_url:"Adresa košíku"},en:{device:"Device",name:"Custom name",show_search:"Show search",group_by_category:"Group by category",show_brand:"Show brand",min_order:"Minimum order value (empty = the shop's minimum, 0 = do not judge)",list_max_height:"Max list height (0 = unlimited)",max_items:"Max. items shown (empty = automatic, 0 = all)",show_order_button:"Order button",checkout_url:"Checkout URL"}},gi=/^(.+)\s*\((\d+)\)\s*-\s*(\d+(?:[.,]\d+)?)\s*(Kč|[A-Z]{3}|€|Ft|lei)?\s*$/;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function fi(e){if(!e||"string"!=typeof e.summary)return null;const t=gi.exec(e.summary.trim());if(!t)return null;const[,i,r,o,s]=t,n=i.trim(),a=parseInt(r,10),l=parseFloat(o.replace(",","."));if(!n||!Number.isFinite(a)||!Number.isFinite(l))return null;const c={uid:e.uid,name:n,quantity:a,price:l},d=Ke(s);d&&(c.currency=d);const{category:h,brand:u,productId:p}=function(e){const t={};if(!e)return t;for(const i of e.split(/\r?\n/)){const e=i.indexOf(":");if(-1===e)continue;const r=i.slice(0,e).trim().toLowerCase().replace(/[^a-z0-9]/g,""),o=i.slice(e+1).trim();if(o)if("category"===r)t.category=o;else if("brand"===r)t.brand=o;else if("productid"===r){const e=parseInt(o,10);Number.isFinite(e)&&(t.productId=e)}}return t}(e.description);return void 0!==h&&(c.category=h),void 0!==u&&(c.brand=u),void 0!==p&&(c.productId=p),c}const vi=/^(\d+)\s+(.+)$/,yi=/^(.+?)\s*\((\d+)\)\s*$/;function wi(e){const t=(e??"").trim(),i=vi.exec(t);if(i){const e=i[2].trim();if(e)return{quantity:parseInt(i[1],10),name:e}}const r=yi.exec(t);if(r){const e=r[1].trim();if(e)return{quantity:parseInt(r[2],10),name:e}}return{quantity:1,name:t}}function _i(e,t,i){if(i<=0)return-1;const r=e+t;return r<-1?-1:r>=i?i-1:r}let bi=class extends Kt{constructor(){super(...arguments),this.labels=mi,this.defaults={show_search:!0,show_brand:!0,group_by_category:!1,list_max_height:360,show_order_button:!0}}extraSchema(){return[{name:"show_search",selector:{boolean:{}}},{name:"group_by_category",selector:{boolean:{}}},{name:"show_brand",selector:{boolean:{}}},{name:"max_items",selector:{number:{min:0,max:50,mode:"box"}}},{name:"list_max_height",selector:{number:{min:0,max:2e3,step:10,mode:"box",unit_of_measurement:"px"}}},{name:"min_order",selector:{number:{min:0,max:1e6,step:1,mode:"box"}}},{name:"show_order_button",selector:{boolean:{}}},{name:"checkout_url",selector:{text:{}}}]}};bi=e([he("rohlik-cart-card-editor")],bi);let xi=class extends et{constructor(){super(...arguments),this.strings=pi,this.lines=[],this.loading=!1,this.error=null,this.expanded=!1,this.searchQuery="",this.searchResults=[],this.searching=!1,this.searchError=null,this.searchAttempted=!1,this.favouriteOnly=!1,this.addingName=null,this.popoverOpen=!1,this.popoverOutOfView=!1,this.popoverRect=null,this.highlightedIndex=-1,this.pendingUids=new Set,this.reloadDeferred=!1,this.totalOverride=null,this.itemsOverride=null,this.searchSeq=0,this.loadSeq=0,this.popoverListenersAttached=!1,this.onWindowReposition=()=>{void 0===this.repositionRaf&&(this.repositionRaf=requestAnimationFrame(()=>{this.repositionRaf=void 0,this.positionPopover()}))},this.onDocumentPointerDown=e=>{e.composedPath().includes(this)||this.closePopover()},this.onSearchInput=e=>{const t=e.target.value;this.searchQuery=t,this.searchError=null,this.highlightedIndex=-1,this.searchDebounce&&clearTimeout(this.searchDebounce);const i=t.trim();if(i.length<2)return this.searchSeq++,this.searchResults=[],this.searching=!1,this.searchAttempted=!1,void this.closePopover();this.openPopover(),this.searchDebounce=setTimeout(()=>{this.runSearch(i)},400)},this.onSearchFocus=()=>{this.searchQuery.trim().length>=2&&this.openPopover()},this.onSearchKeydown=e=>{if("Escape"===e.key)return this.popoverOpen&&e.preventDefault(),void this.clearSearch();if("ArrowDown"===e.key){if(!this.resultsVisible||!this.searchResults.length)return;return e.preventDefault(),void(this.highlightedIndex=_i(this.highlightedIndex,1,this.searchResults.length))}if("ArrowUp"===e.key){if(!this.resultsVisible||!this.searchResults.length)return;return e.preventDefault(),void(this.highlightedIndex=_i(this.highlightedIndex,-1,this.searchResults.length))}if("Enter"===e.key){if(e.preventDefault(),this.popoverOpen&&this.popoverOutOfView)return this.revealSearchBox(),void this.positionPopover();const t=this.highlightedIndex>=0?this.searchResults[this.highlightedIndex]:void 0;if(t)return void this.addSearchResult(t);this.searchAndAdd()}},this.toggleFavouriteOnly=()=>{this.favouriteOnly=!this.favouriteOnly;const e=this.searchQuery.trim();e.length>=2&&this.runSearch(e)}}static getConfigElement(){return document.createElement("rohlik-cart-card-editor")}static getStubConfig(e){return{...et.getStubConfig(e),type:"custom:rohlik-cart-card"}}estimatedCardSize(){return 10}getGridOptions(){return{columns:12,rows:"auto",min_columns:6,min_rows:4}}disconnectedCallback(){super.disconnectedCallback(),this.searchDebounce&&clearTimeout(this.searchDebounce),this.closePopover(),this.detachPopoverListeners(),this.searchSeq++,this.searching=!1}attachPopoverListeners(){this.popoverListenersAttached||(this.popoverListenersAttached=!0,window.addEventListener("scroll",this.onWindowReposition,!0),window.addEventListener("resize",this.onWindowReposition),document.addEventListener("pointerdown",this.onDocumentPointerDown),this.scrollingCard=this.renderRoot.querySelector("ha-card")??void 0,this.scrollingCard?.addEventListener("scroll",this.onWindowReposition,{passive:!0}))}detachPopoverListeners(){this.popoverListenersAttached&&(this.popoverListenersAttached=!1,window.removeEventListener("scroll",this.onWindowReposition,!0),window.removeEventListener("resize",this.onWindowReposition),document.removeEventListener("pointerdown",this.onDocumentPointerDown),this.scrollingCard?.removeEventListener("scroll",this.onWindowReposition),this.scrollingCard=void 0,void 0!==this.repositionRaf&&(cancelAnimationFrame(this.repositionRaf),this.repositionRaf=void 0))}positionPopover(){const e=this.searchBoxEl;if(!e)return;const t=e.getBoundingClientRect(),i=this.syncScrollingCard(),r=this.fixedHeight?i:null,o=r?.getBoundingClientRect();this.popoverOutOfView=!!o&&(t.bottom<o.top||t.bottom>o.bottom),this.popoverOutOfView&&(this.highlightedIndex=-1),this.popoverRect={left:t.left,top:t.bottom+4,width:t.width}}syncScrollingCard(){const e=this.renderRoot.querySelector("ha-card")??void 0;return this.popoverListenersAttached&&e!==this.scrollingCard&&(this.scrollingCard?.removeEventListener("scroll",this.onWindowReposition),this.scrollingCard=e,this.scrollingCard?.addEventListener("scroll",this.onWindowReposition,{passive:!0})),e}updated(e){super.updated(e),this.popoverOpen&&this.syncScrollingCard()}get resultsVisible(){return this.popoverOpen&&!this.popoverOutOfView}openPopover({reveal:e=!0}={}){this.isConnected&&(this.attachPopoverListeners(),this.popoverOpen=!0,e&&this.revealSearchBox(),this.positionPopover())}revealSearchBox(){if(!this.fixedHeight)return;const e=this.searchBoxEl,t=this.renderRoot.querySelector("ha-card");if(!e||!t)return;const i=e.getBoundingClientRect(),r=t.getBoundingClientRect();i.bottom>r.bottom?t.scrollTop+=i.bottom-r.bottom+4:i.top<r.top&&(t.scrollTop-=r.top-i.top+4)}closePopover(){this.detachPopoverListeners(),(this.popoverOpen||-1!==this.highlightedIndex)&&(this.popoverOpen=!1,this.highlightedIndex=-1)}willUpdate(e){if(super.willUpdate(e),!e.has("hass")||!this.hass||!this.config)return;const t=this.state("shopping_cart"),i=this.state("cart_price");if(!t||!i)return;const r=`${t.state}|${t.last_updated}|${i.state}`;r!==this.loadedKey&&(this.loadedKey=r,this.pendingUids.size>0?this.reloadDeferred=!0:this.loadItems())}sensorTotal(){const e=parseFloat(this.state("cart_price")?.state??"");return Number.isFinite(e)?e:0}sensorItems(){const e=this.attr("cart_price","Total items");return"number"==typeof e?e:this.lines.length}finishEdit(e){const t=new Set(this.pendingUids);t.delete(e),this.pendingUids=t,0===t.size&&(this.totalOverride=null,this.itemsOverride=null,this.reloadDeferred&&(this.reloadDeferred=!1,this.loadItems()))}listMaxHeight(){if(this.fixedHeight)return 0;const e=this.config.list_max_height??360;return e<=0||this.isTouch()?0:e}isTouch(){try{return Boolean(window.matchMedia?.("(pointer: coarse)").matches)}catch{return!1}}effectiveMaxItems(){if(null!=this.config.max_items)return this.config.max_items;const e=null!=this.config.list_max_height&&this.config.list_max_height<=0;return this.isTouch()&&!e?8:0}async ensureConfigEntryId(){if(this.configEntryId)return this.configEntryId;const e=this.entityId("cart_price");return e?(this.configEntryId=await nt(this.hass,e),this.configEntryId):void 0}async loadItems(){const e=this.entityId("shopping_cart");if(!e)return;const t=++this.loadSeq;this.loading=!0,this.error=null;try{const i=await this.hass.callWS({type:"todo/item/list",entity_id:e});if(t!==this.loadSeq)return;this.lines=(i.items??[]).map(e=>fi(e)).filter(e=>null!==e)}catch{if(t!==this.loadSeq)return;this.error=this.t("load_error")}finally{t===this.loadSeq&&(this.loading=!1)}}async removeItem(e){const t=this.entityId("shopping_cart");if(!t||this.pendingUids.has(e))return;const i=this.lines,r=this.lines.find(t=>t.uid===e);this.pendingUids=new Set(this.pendingUids).add(e),this.lines=this.lines.filter(t=>t.uid!==e),this.totalOverride=Math.max(0,(this.totalOverride??this.sensorTotal())-(r?.price??0)),this.itemsOverride=Math.max(0,(this.itemsOverride??this.sensorItems())-1),this.error=null;try{await this.hass.callService("todo","remove_item",{item:e},{entity_id:t})}catch{this.lines=i,this.error=this.t("action_error")}finally{this.finishEdit(e)}}async changeQuantity(e,t){if(this.pendingUids.has(e.uid))return;if(t<=0)return void await this.removeItem(e.uid);const i=this.entityId("shopping_cart");if(!i||void 0===e.productId)return;const r=this.lines,o=e.quantity>0?e.price/e.quantity:0,s=Math.round(o*t*100)/100;this.pendingUids=new Set(this.pendingUids).add(e.uid),this.lines=this.lines.map(i=>i.uid===e.uid?{...i,quantity:t,price:s}:i),this.totalOverride=Math.max(0,(this.totalOverride??this.sensorTotal())+(s-e.price)),this.error=null;try{await this.hass.callService("todo","remove_item",{item:e.uid},{entity_id:i});const r=await this.ensureConfigEntryId();if(!r)throw new Error("no config_entry_id for shopping_cart device");await at(this.hass,r,"add_to_cart",{product_id:e.productId,quantity:t})}catch{this.lines=r,this.error=this.t("action_error")}finally{this.reloadDeferred=!0,this.finishEdit(e.uid)}}async runSearch(e){const t=await this.ensureConfigEntryId();if(!t)return;const i=++this.searchSeq;this.searching=!0;try{const r=await at(this.hass,t,"search_product",{product_name:e,limit:8,favourite:this.favouriteOnly},!0);if(i!==this.searchSeq)return;this.searchResults=r?.search_results??[],this.highlightedIndex=-1,this.searchAttempted=!0,this.searchQuery.trim().length>=2&&this.openPopover({reveal:!1})}catch{if(i!==this.searchSeq)return;this.searchResults=[],this.searchError=this.t("search_error"),this.searchAttempted=!0,this.searchQuery.trim().length>=2&&this.openPopover({reveal:!1})}finally{i===this.searchSeq&&(this.searching=!1)}}async searchAndAdd(){const e=this.searchQuery.trim();if(!e)return;const t=await this.ensureConfigEntryId();if(!t)return;const{quantity:i,name:r}=wi(e);this.clearSearch(),this.addingName=r,this.error=null;try{const e=await at(this.hass,t,"search_and_add_to_cart",{product_name:r,quantity:i,favourite:this.favouriteOnly},!0);if(e&&!1===e.success)return void(this.error=e.message||this.t("search_add_error"));await this.loadItems()}catch{this.error=this.t("search_add_error")}finally{this.addingName=null}}async addSearchResult(e){const t=await this.ensureConfigEntryId();if(!t)return;const{quantity:i}=wi(this.searchQuery.trim());this.clearSearch(),this.addingName=e.name??"",this.error=null;try{await at(this.hass,t,"add_to_cart",{product_id:e.id,quantity:i}),await this.loadItems()}catch{this.error=this.t("search_add_error")}finally{this.addingName=null}}clearSearch(){this.searchDebounce&&clearTimeout(this.searchDebounce),this.searchSeq++,this.searchQuery="",this.searchResults=[],this.searchError=null,this.searching=!1,this.searchAttempted=!1,this.closePopover()}render(){if(!this.config)return V;const e=this.entityId("shopping_cart"),t=this.entityId("cart_price");if(!e||!t)return B`<ha-card>${this.renderError(this.t("missing_entities"))}</ha-card>`;const i=this.state("cart_price"),r=this.totalOverride??(i?parseFloat(i.state):0),o=Boolean(this.attr("cart_price","Can Order")),s=Number(this.attr("cart_price","Minimum Order Price")),n=this.config.min_order??(Number.isFinite(s)?s:0),a=Number(this.state("no_limit")?.state)>0,l=n>0&&!a&&r<n,c=this.attr("cart_price","Total items"),d=this.itemsOverride??("number"==typeof c?c:this.lines.length),h=0===this.lines.length,u=!1!==this.config.show_search,p=!1!==this.config.show_brand,m=!0===this.config.group_by_category,g=this.effectiveMaxItems(),f=!1!==this.config.show_order_button,v=!h;return B`
      <ha-card style=${ke(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:cart"></ha-icon>
          <span class="title">${this.config.name||this.t("title")}</span>
          ${h?V:o?B`<span class="chip ok">${this.t("ready_to_order")}</span>`:l?B`<span class="chip warn">${this.t("below_minimum")}</span>`:n>0?B`<span class="chip ok">${this.t("can_order")}</span>`:V}
        </div>

        <div class="big">${this.money(Number.isFinite(r)?r:0)}</div>
        <div class="caption">
          ${h?this.t("empty_cart"):this.t("items_count",{count:d})}
        </div>
        ${h?this.renderEmptyHint():V}
        ${l&&!h?B`<div class="hint minimum-hint">
              ${this.t("below_minimum_by",{amount:this.money(n-r)})}
            </div>`:V}
        ${this.error?B`<div class="error">${this.error}</div>`:V}
        ${u?this.renderSearch():V}
        ${null!==this.addingName?B`<div class="adding">${this.renderSpinner()} ${this.t("adding",{name:this.addingName})}</div>`:V}
        ${h?V:this.renderLines(m,p,g)}

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
            ${f?this.renderOrderButton(v):V}
          </div>
        </div>
      </ha-card>
    `}renderOrderButton(e){const t=function(e,t="https://www.rohlik.cz/kosik"){const i=e?.trim();return i||t}(this.config.checkout_url,this.shop.cartUrl);return B`
      <a
        class=${_e({btn:!0,order:!0,disabled:!e})}
        href=${e?t:V}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled=${e?V:"true"}
        title=${e?this.t(t===this.shop.url?"order_hint_shop":"order_hint",{shop:this.shop.name}):this.t("empty_cart")}
      >
        <ha-icon icon="mdi:cart-arrow-right"></ha-icon>
        ${this.t("order")}
      </a>
    `}renderEmptyHint(){const e=this.attr("last_order","Items");return"number"!=typeof e?V:B`<div class="hint">${this.t("last_order_hint",{count:e})}</div>`}renderSearch(){return B`
      <div class="search">
        <div class="search-box">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input
            type="text"
            role="combobox"
            aria-expanded=${this.resultsVisible?"true":"false"}
            aria-controls="cart-search-listbox"
            aria-autocomplete="list"
            aria-activedescendant=${this.resultsVisible&&this.highlightedIndex>=0?`cart-search-option-${this.highlightedIndex}`:V}
            .value=${this.searchQuery}
            placeholder=${this.t("search_placeholder")}
            @input=${this.onSearchInput}
            @keydown=${this.onSearchKeydown}
            @focus=${this.onSearchFocus}
          />
          ${this.searching?this.renderSpinner():V}
          <button
            class=${_e({"icon-btn":!0,active:this.favouriteOnly})}
            title=${this.t("favourite_only")}
            @click=${this.toggleFavouriteOnly}
          >
            <ha-icon icon=${this.favouriteOnly?"mdi:heart":"mdi:heart-outline"}></ha-icon>
          </button>
        </div>
        ${this.resultsVisible?this.renderSearchPopover():V}
      </div>
    `}renderSearchPopover(){const e=this.popoverRect?{left:`${this.popoverRect.left}px`,top:`${this.popoverRect.top}px`,width:`${this.popoverRect.width}px`}:{display:"none"};return B`
      <div id="cart-search-listbox" class="search-popover" role="listbox" style=${ke(e)}>
        ${this.searchError?B`<div class="popover-error">${this.searchError}</div>`:this.searchResults.length?hi(this.searchResults,e=>e.id,(e,t)=>this.renderSearchResult(e,t)):this.searchAttempted&&!this.searching?B`<div class="popover-empty">${this.t("no_results")}</div>`:V}
      </div>
    `}renderSpinner(){return customElements.get("ha-spinner")?B`<ha-spinner size="tiny" aria-hidden="true"></ha-spinner>`:B`<div class="spinner"></div>`}renderSearchResult(e,t){const i=[e.brand,e.amount].filter(Boolean).join(" · "),r=t===this.highlightedIndex;return B`
      <div
        id="cart-search-option-${t}"
        class=${_e({row:!0,"search-result":!0,highlighted:r})}
        role="option"
        aria-selected=${r?"true":"false"}
        @pointerenter=${()=>this.highlightedIndex=t}
      >
        <div class="cell">
          <div class="name">${e.name}</div>
          ${i?B`<div class="secondary">${i}</div>`:V}
        </div>
        <div class="price">${e.price}</div>
        <button
          class="icon-btn"
          title=${this.t("add")}
          @click=${()=>{this.addSearchResult(e)}}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>
    `}renderLines(e,t,i){const r=i>0?i:this.lines.length,o=this.expanded?this.lines:this.lines.slice(0,r),s=this.lines.length>r,n=this.listMaxHeight();return B`
      <div class="lines" style=${ke(n>0?{maxHeight:`${n}px`}:{})}>
        ${e?hi(function(e){const t=new Map,i=[];for(const r of e){if(!r.category){i.push(r);continue}const e=t.get(r.category);e?e.push(r):t.set(r.category,[r])}const r=Array.from(t.entries()).sort(([e],[t])=>e.localeCompare(t)).map(([e,t])=>({category:e,lines:t}));return i.length&&r.push({category:void 0,lines:i}),r}(o),e=>e.category??"__uncategorised__",e=>B`
                <div class="category-header">${e.category??this.t("uncategorised")}</div>
                ${hi(e.lines,e=>e.uid,e=>this.renderLine(e,t))}
              `):hi(o,e=>e.uid,e=>this.renderLine(e,t))}
      </div>
      ${s?B`
            <button class="btn ghost show-toggle" @click=${()=>this.expanded=!this.expanded}>
              ${this.expanded?this.t("show_less"):this.t("show_all",{count:this.lines.length})}
            </button>
          `:V}
    `}renderLine(e,t){const i=this.pendingUids.has(e.uid),r=[e.category,t?e.brand:void 0].filter(e=>Boolean(e)).join(" · ");return B`
      <div class=${_e({row:!0,"cart-line":!0,pending:i})}>
        <div class="cell">
          <div class="name">${e.name}</div>
          ${r?B`<div class="secondary">${r}</div>`:V}
        </div>
        <div class="line-end">
          <div class="stepper">
            <button
              class="step-btn"
              ?disabled=${i}
              title=${this.t("remove")}
              @click=${()=>{this.changeQuantity(e,e.quantity-1)}}
            >
              −
            </button>
            <span class="qty">${e.quantity}</span>
            <button
              class="step-btn"
              ?disabled=${i}
              @click=${()=>{this.changeQuantity(e,e.quantity+1)}}
            >
              +
            </button>
          </div>
          <div class="line-price">${this.money(e.price,e.currency)}</div>
          <button
            class="icon-btn remove"
            ?disabled=${i}
            title=${this.t("remove")}
            @click=${()=>{this.removeItem(e.uid)}}
          >
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
      </div>
    `}};function ki(e){return"string"==typeof e?e.trim():""}function $i(e){return"number"==typeof e&&Number.isFinite(e)?e:null}function Si(e){return e.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().trim()}xi.styles=[Ye,ui],e([ge()],xi.prototype,"lines",void 0),e([ge()],xi.prototype,"loading",void 0),e([ge()],xi.prototype,"error",void 0),e([ge()],xi.prototype,"expanded",void 0),e([ge()],xi.prototype,"searchQuery",void 0),e([ge()],xi.prototype,"searchResults",void 0),e([ge()],xi.prototype,"searching",void 0),e([ge()],xi.prototype,"searchError",void 0),e([ge()],xi.prototype,"searchAttempted",void 0),e([ge()],xi.prototype,"favouriteOnly",void 0),e([ge()],xi.prototype,"addingName",void 0),e([ge()],xi.prototype,"popoverOpen",void 0),e([ge()],xi.prototype,"popoverOutOfView",void 0),e([ge()],xi.prototype,"popoverRect",void 0),e([ge()],xi.prototype,"highlightedIndex",void 0),e([ge()],xi.prototype,"pendingUids",void 0),e([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(e){return(t,i,r)=>((e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i))(t,i,{get(){return(t=>t.renderRoot?.querySelector(e)??null)(this)}})}(".search-box")],xi.prototype,"searchBoxEl",void 0),e([ge()],xi.prototype,"totalOverride",void 0),e([ge()],xi.prototype,"itemsOverride",void 0),xi=e([he("rohlik-cart-card")],xi),rt({type:"rohlik-cart-card",documentationURL:"https://github.com/dvejsada/rohlik-cz-HA-cards/blob/main/docs/cards/cart-card.md",getEntitySuggestion:ot("rohlik-cart-card",["shopping_cart","cart_price"]),name:"Rohlík.cz Shopping Cart",description:"Live cart contents, quantity steppers and product search for Rohlík.cz."});const zi=n`
  :host {
    --rohlik-thumb-size: 56px;
  }

  /* Product shots are cut out on white, so a white tile keeps them readable
     in the dark theme too. */
  .thumb {
    flex: none;
    width: var(--rohlik-thumb-size);
    height: var(--rohlik-thumb-size);
    border-radius: 6px;
    object-fit: contain;
    background: #fff;
  }

  .thumb.placeholder {
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
  }

  .header .count {
    color: var(--secondary-text-color);
    font-size: 0.9rem;
    font-weight: 400;
  }

  .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--secondary-text-color);
    cursor: pointer;
  }

  .icon-btn:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .search {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 48px;
    padding: 0 8px 0 12px;
    margin-bottom: 8px;
    border: 2px solid var(--ha-card-border-color, var(--divider-color));
    border-radius: 8px;
    background: var(--card-background-color);
    color: var(--secondary-text-color);
  }

  .search:focus-within {
    border-color: var(--accent-color, var(--rohlik-accent));
  }

  .search input {
    flex: 1 1 auto;
    min-width: 0;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--primary-text-color);
    font: inherit;
    font-size: 1rem;
  }

  .list {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 16px;
  }

  @container (min-width: 640px) {
    .list {
      grid-template-columns: 1fr 1fr;
    }
  }

  .fav {
    min-height: 72px;
    gap: 12px;
  }

  /* In two columns every row keeps its bottom line; the last two may both end. */
  .list .fav:last-child {
    border-bottom: 1px solid var(--divider-color);
  }

  .fav.out {
    color: var(--secondary-text-color);
  }

  .fav.out .thumb {
    opacity: 0.5;
  }

  .cell {
    flex: 1 1 auto;
    min-width: 0;
  }

  .name {
    color: var(--primary-text-color);
    font-size: 1rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .fav.out .name {
    color: var(--secondary-text-color);
  }

  .meta {
    margin-top: 2px;
    color: var(--secondary-text-color);
    font-size: 0.85rem;
    font-variant-numeric: tabular-nums;
  }

  .meta .sale {
    color: var(--warning-color, #ff9800);
    font-weight: 500;
  }

  .meta .in-cart {
    color: var(--success-color, #4caf50);
    font-weight: 500;
  }

  .add {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border: 2px solid var(--ha-card-border-color, var(--divider-color));
    border-radius: 8px;
    background: var(--card-background-color);
    color: var(--rohlik-accent);
    cursor: pointer;
    --mdc-icon-size: 28px;
    transition: opacity 120ms;
  }

  .add.has {
    border-color: var(--success-color, #4caf50);
    color: var(--success-color, #4caf50);
  }

  .add:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .add:focus-visible {
    outline: 2px solid var(--accent-color, var(--rohlik-accent));
    outline-offset: 2px;
  }

  .hint {
    padding: 16px 4px;
    color: var(--secondary-text-color);
    font-size: 0.95rem;
  }

  .show-toggle {
    align-self: center;
    margin-top: 8px;
    min-height: 44px;
  }

  .toast {
    margin-top: 8px;
    padding: 8px 12px;
    border-radius: 8px;
    color: var(--primary-text-color);
    background: color-mix(in srgb, var(--success-color, #4caf50) 15%, transparent);
    font-size: 0.9rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .add {
      transition: none;
    }
  }
`,Ai={cs:{title:"Oblíbené",search_placeholder:"Hledat v oblíbených",add:"Přidat do košíku",added:"„{name}“ je v košíku",add_error:"Nepodařilo se přidat do košíku",in_cart:"{count}× v košíku",out_of_stock:"Není skladem",on_sale:"Akce",empty:"Zatím žádné oblíbené. Označte produkty v aplikaci srdíčkem, objeví se tady.",no_match:"Nic neodpovídá „{query}“",unavailable:"Oblíbené se nepodařilo načíst",needs_update:"Karta potřebuje novější HA-RohlikCZ se senzorem Oblíbené.",show_all:"Zobrazit vše ({count})",show_less:"Zobrazit méně",refresh:"Načíst znovu",clear:"Smazat"},en:{title:"Favourites",search_placeholder:"Search favourites",add:"Add to cart",added:"“{name}” is in the cart",add_error:"Could not add to the cart",in_cart:"{count}× in cart",out_of_stock:"Out of stock",on_sale:"Sale",empty:"No favourites yet. Mark products with the heart in the shop's app and they show up here.",no_match:"Nothing matches “{query}”",unavailable:"Favourites could not be loaded",needs_update:"This card needs a newer HA-RohlikCZ with the Favourites sensor.",show_all:"Show all ({count})",show_less:"Show less",refresh:"Reload",clear:"Clear"},de:{title:"Favoriten",search_placeholder:"In Favoriten suchen",add:"In den Warenkorb",added:"„{name}“ liegt im Warenkorb",add_error:"Konnte nicht in den Warenkorb legen",in_cart:"{count}× im Warenkorb",out_of_stock:"Nicht lieferbar",on_sale:"Aktion",empty:"Noch keine Favoriten. Markiere Produkte in der App mit dem Herz, dann erscheinen sie hier.",no_match:"Nichts passt zu „{query}“",unavailable:"Favoriten konnten nicht geladen werden",needs_update:"Diese Karte braucht ein neueres HA-RohlikCZ mit dem Sensor Favoriten.",show_all:"Alle zeigen ({count})",show_less:"Weniger zeigen",refresh:"Neu laden",clear:"Leeren"}},Ci={cs:{show_search:"Zobrazit vyhledávání",show_price:"Zobrazit cenu",hide_out_of_stock:"Skrýt nedostupné",max_items:"Počet položek (0 = vše)"},en:{show_search:"Show search",show_price:"Show price",hide_out_of_stock:"Hide out-of-stock products",max_items:"Items shown (0 = all)"},de:{show_search:"Suchfeld zeigen",show_price:"Preis zeigen",hide_out_of_stock:"Nicht lieferbare ausblenden",max_items:"Anzahl Einträge (0 = alle)"}};let Ei=class extends Kt{constructor(){super(...arguments),this.labels=Ci,this.defaults={show_search:!0,show_price:!0,hide_out_of_stock:!1,max_items:12}}extraSchema(){return[{name:"show_search",selector:{boolean:{}}},{name:"show_price",selector:{boolean:{}}},{name:"hide_out_of_stock",selector:{boolean:{}}},{name:"max_items",selector:{number:{min:0,max:200,mode:"box"}}}]}};Ei=e([he("rohlik-favourites-card-editor")],Ei);let Ii=class extends et{constructor(){super(...arguments),this.strings=Ai,this.query="",this.expanded=!1,this.pending=new Set,this.optimistic=new Map,this.cartLines=[],this.toast=null,this.error=null,this.refreshing=!1,this.cartKey="",this.onInput=e=>{this.query=e.target.value},this.clearQuery=()=>{this.query=""}}static getConfigElement(){return document.createElement("rohlik-favourites-card-editor")}static getStubConfig(e){return{...et.getStubConfig(e),type:"custom:rohlik-favourites-card"}}getGridOptions(){return{columns:12,rows:"auto",min_columns:6}}estimatedCardSize(){return 8}disconnectedCallback(){super.disconnectedCallback(),this.toastTimer&&clearTimeout(this.toastTimer)}willUpdate(e){if(super.willUpdate(e),!e.has("hass")||!this.hass||!this.config)return;const t=this.state("shopping_cart");if(!t)return;const i=`${t.state}|${t.last_updated}`;i!==this.cartKey&&(this.cartKey=i,this.loadCart())}async loadCart(){const e=this.entityId("shopping_cart");if(e)try{const t=await this.hass.callWS({type:"todo/item/list",entity_id:e});this.cartLines=(t.items??[]).map(e=>fi(e)).filter(e=>null!==e),this.optimistic=new Map}catch{}}async ensureConfigEntryId(){if(this.configEntryId)return this.configEntryId;const e=this.entityId("favourites")??this.entityId("cart_price");return e?(this.configEntryId=await nt(this.hass,e),this.configEntryId):void 0}showToast(e){this.toast=e,this.toastTimer&&clearTimeout(this.toastTimer),this.toastTimer=setTimeout(()=>this.toast=null,4e3)}async add(e){if(this.pending.has(e.id))return;const t=await this.ensureConfigEntryId();if(t){this.pending=new Set(this.pending).add(e.id),this.optimistic=new Map(this.optimistic).set(e.id,(this.optimistic.get(e.id)??0)+1),this.error=null;try{await at(this.hass,t,"add_to_cart",{product_id:e.id,quantity:1}),this.showToast(this.t("added",{name:e.name}))}catch{const t=new Map(this.optimistic),i=(t.get(e.id)??1)-1;i>0?t.set(e.id,i):t.delete(e.id),this.optimistic=t,this.error=this.t("add_error")}finally{const t=new Set(this.pending);t.delete(e.id),this.pending=t}}}async refresh(){const e=await this.ensureConfigEntryId();if(e&&!this.refreshing){this.refreshing=!0,this.error=null;try{await at(this.hass,e,"get_favourites",{},!0)}catch{this.error=this.t("unavailable")}finally{this.refreshing=!1}}}render(){if(!this.config)return V;const e=this.state("favourites"),t=ke(this.accentStyle);if(!this.entityId("favourites"))return B`<ha-card style=${t}>${this.renderHeader(null)}
        <div class="hint">${this.t("needs_update")}</div></ha-card>`;const i=function(e){const t=e?.attributes?.products;if(!Array.isArray(t))return[];const i=[];for(const e of t){if(!e||"object"!=typeof e)continue;const t=e,r=$i(t.id),o=ki(t.name);if(null===r||!o)continue;const s=ki(t.image);i.push({id:r,name:o,amount:ki(t.amount),price:$i(t.price),inStock:!1!==t.in_stock,onSale:!0===t.on_sale,image:/^https?:\/\//i.test(s)?s:null})}return i}(e).filter(e=>!(this.config.hide_out_of_stock&&!e.inStock)),r=!e||"unavailable"===e.state||"unknown"===e.state;return B`
      <ha-card style=${t}>
        ${this.renderHeader(r?null:i.length)}
        ${!1!==this.config.show_search&&i.length>0?this.renderSearch():V}
        ${this.error?this.renderError(this.error):V}
        ${r?this.renderError(this.t("unavailable")):this.renderBody(i)}
        ${this.toast?B`<div class="toast" role="status">${this.toast}</div>`:V}
      </ha-card>
    `}renderHeader(e){return B`
      <div class="header">
        <ha-icon icon="mdi:heart-outline"></ha-icon>
        <span class="title">${this.config.name||this.t("title")}</span>
        ${null!==e?B`<span class="count">${e}</span>`:V}
        <button
          class="icon-btn"
          title=${this.t("refresh")}
          aria-label=${this.t("refresh")}
          ?disabled=${this.refreshing}
          @click=${()=>{this.refresh()}}
        >
          <ha-icon icon="mdi:refresh"></ha-icon>
        </button>
      </div>
    `}renderSearch(){return B`
      <label class="search">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <input
          type="search"
          .value=${this.query}
          placeholder=${this.t("search_placeholder")}
          aria-label=${this.t("search_placeholder")}
          @input=${this.onInput}
        />
        ${this.query?B`<button class="icon-btn" title=${this.t("clear")} aria-label=${this.t("clear")}
              @click=${this.clearQuery}><ha-icon icon="mdi:close"></ha-icon></button>`:V}
      </label>
    `}renderBody(e){if(0===e.length)return B`<div class="hint">${this.t("empty")}</div>`;const t=function(e,t){const i=Si(t).split(/\s+/).filter(Boolean);return 0===i.length?e:e.filter(e=>{const t=Si(`${e.name} ${e.amount}`);return i.every(e=>t.includes(e))})}(e,this.query);if(0===t.length)return B`<div class="hint">${this.t("no_match",{query:this.query.trim()})}</div>`;const i=this.config.max_items??12,r=!this.query.trim()&&i>0&&!this.expanded?t.slice(0,i):t,o=function(e){const t=new Map;for(const i of e)void 0!==i.productId&&t.set(i.productId,(t.get(i.productId)??0)+i.quantity);return t}(this.cartLines);return B`
      <div class="list">
        ${hi(r,e=>e.id,e=>this.renderRow(e,o))}
      </div>
      ${!this.query.trim()&&i>0&&t.length>i?B`<button class="btn ghost show-toggle" @click=${()=>this.expanded=!this.expanded}>
            ${this.expanded?this.t("show_less"):this.t("show_all",{count:t.length})}
          </button>`:V}
    `}renderRow(e,t){const i=(t.get(e.id)??0)+(this.optimistic.get(e.id)??0),r=this.pending.has(e.id),o=[];return e.amount&&o.push(B`<span>${e.amount}</span>`),!1!==this.config.show_price&&null!==e.price&&o.push(B`<span class=${e.onSale?"sale":""}>${this.money(e.price)}</span>`),e.inStock||o.push(B`<span>${this.t("out_of_stock")}</span>`),i>0&&o.push(B`<span class="in-cart">${this.t("in_cart",{count:i})}</span>`),B`
      <div class=${_e({row:!0,fav:!0,out:!e.inStock})}>
        ${e.image?B`<img class="thumb" src=${e.image} alt="" loading="lazy" referrerpolicy="no-referrer" />`:B`<div class="thumb placeholder" aria-hidden="true"></div>`}
        <div class="cell">
          <div class="name">${e.name}</div>
          <div class="meta">${o.map((e,t)=>B`${t?" · ":""}${e}`)}</div>
        </div>
        <button
          class=${_e({add:!0,has:i>0})}
          title=${this.t("add")}
          aria-label=${`${this.t("add")}: ${e.name}`}
          ?disabled=${r||!e.inStock}
          @click=${()=>{this.add(e)}}
        >
          <ha-icon icon=${r?"mdi:timer-sand":"mdi:plus"}></ha-icon>
        </button>
      </div>
    `}};Ii.styles=[Ye,zi],e([ge()],Ii.prototype,"query",void 0),e([ge()],Ii.prototype,"expanded",void 0),e([ge()],Ii.prototype,"pending",void 0),e([ge()],Ii.prototype,"optimistic",void 0),e([ge()],Ii.prototype,"cartLines",void 0),e([ge()],Ii.prototype,"toast",void 0),e([ge()],Ii.prototype,"error",void 0),e([ge()],Ii.prototype,"refreshing",void 0),Ii=e([he("rohlik-favourites-card")],Ii),rt({type:"rohlik-favourites-card",documentationURL:"https://github.com/dvejsada/rohlik-cz-HA-cards/blob/main/docs/cards/favourites-card.md",getEntitySuggestion:ot("rohlik-favourites-card",["favourites"]),name:"Rohlík.cz Favourites",description:"Your favourite products with pictures and a large add-to-cart button.",preview:!0});const Oi=["express","standard","eco"],Ni={express:"mdi:lightning-bolt",standard:"mdi:truck-delivery",eco:"mdi:leaf"};function Ti(e){if("number"==typeof e&&Number.isFinite(e))return e;if("string"==typeof e&&""!==e.trim()){const t=Number(e);if(Number.isFinite(t))return t}return null}function Ri(e){return"string"==typeof e&&""!==e.trim()?e:null}function Di(e){return null==e||Number.isNaN(e)?0:Math.min(100,Math.max(0,e))}function Mi(e){if("string"!=typeof e||!e)return null;const t=new Date(e);return Number.isNaN(t.getTime())?null:t}function Pi(e,t=0){return"number"==typeof e&&Number.isFinite(e)?e:t}function ji(e){const t=e=>String(e).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`}function Li(e,t){return(e?.windows??[]).filter(e=>e.free>0&&(void 0===t||e.minutes===t)).length}const Ui=n`
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
    margin-inline-start: auto;
  }

  /* Below ~420px the actions drop under the title instead of squeezing it. */
  @container rohlik-slots (max-width: 420px) {
    .header-actions {
      flex-basis: 100%;
      justify-content: flex-end;
      margin-inline-start: 0;
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
    inset-inline-end: 4px;
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

  /* ---- All delivery windows (show_windows) ---- */
  .windows {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 12px;
  }

  .day-chips {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .day-chip,
  .seg {
    flex: none;
    min-height: 56px;
    padding: 6px 16px;
    border: 2px solid var(--ha-card-border-color, var(--divider-color));
    border-radius: 8px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font: inherit;
    cursor: pointer;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2px;
  }

  .day-chip.on,
  .seg.on {
    border-color: var(--accent-color, var(--rohlik-accent));
    background: color-mix(in srgb, var(--accent-color, var(--rohlik-accent)) 12%, transparent);
  }

  .day-chip:focus-visible,
  .seg:focus-visible {
    outline: 2px solid var(--accent-color, var(--rohlik-accent));
    outline-offset: 2px;
  }

  .day-name {
    font-size: 1rem;
    font-weight: 500;
  }

  .day-free {
    color: var(--secondary-text-color);
    font-size: 0.8rem;
  }

  .day-chip.none .day-name {
    color: var(--secondary-text-color);
  }

  .segmented {
    display: flex;
    gap: 8px;
  }

  .seg {
    flex: 1 1 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    font-size: 0.95rem;
  }

  .seg-count {
    margin-left: 6px;
    padding: 0 8px;
    border-radius: 12px;
    color: var(--secondary-text-color);
    background: color-mix(in srgb, var(--secondary-text-color) 15%, transparent);
    font-size: 0.8rem;
  }

  .window-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 8px;
  }

  .window-grid.quarter {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  }

  .window {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-height: 56px;
    padding: 8px 12px;
    border: 2px solid var(--ha-card-border-color, var(--divider-color));
    border-radius: 8px;
    background: var(--card-background-color);
    box-sizing: border-box;
  }

  .window.booked {
    border-style: dashed;
    color: var(--state-inactive-color, var(--secondary-text-color));
  }

  .window-time {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--primary-text-color);
    font-size: 1rem;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .window.booked .window-time {
    color: var(--state-inactive-color, var(--secondary-text-color));
    font-weight: 400;
  }

  .window-time .eco {
    --mdc-icon-size: 16px;
    color: var(--success-color, #4caf50);
  }

  .window-meta {
    color: var(--secondary-text-color);
    font-size: 0.8rem;
  }

  .window .capacity-bar {
    margin-top: auto;
  }

  .windows-hint {
    padding: 8px 4px;
    color: var(--secondary-text-color);
    font-size: 0.9rem;
  }
`,Hi={cs:{title:"Termíny rozvozu",slot_express:"Expres",slot_standard:"Standard",slot_eco:"Eko",express_available:"Expres k dispozici",no_express:"Bez expresu",watch_toggle:"Sledovat expres",watch_error:"Aktualizace se nezdařila",no_entities:"Na tomto zařízení nebyly nalezeny entity Rohlík.cz",layout_auto:"Automaticky",layout_row:"Řádek",layout_column:"Sloupec",windows_days:"Dny",windows_length:"Délka okna",windows_hour:"1 hodina",windows_quarter:"15 minut",windows_free_count:"{count} volných",windows_free_percent:"{percent} % volno",windows_booked:"Obsazeno",windows_none_free:"V tento den už není nic volného.",windows_empty:"Žádná doručovací okna nejsou známa.",windows_needs_update:"Seznam oken potřebuje novější HA-RohlikCZ se senzorem doručovacích oken."},en:{title:"Delivery slots",slot_express:"Express",slot_standard:"Standard",slot_eco:"Eco",express_available:"Express available",no_express:"No express",watch_toggle:"Watch express",watch_error:"Refresh failed",no_entities:"Rohlík.cz entities not found on this device",layout_auto:"Auto",layout_row:"Row",layout_column:"Column",windows_days:"Days",windows_length:"Window length",windows_hour:"1 hour",windows_quarter:"15 minutes",windows_free_count:"{count} free",windows_free_percent:"{percent} % free",windows_booked:"Booked out",windows_none_free:"Nothing left on this day.",windows_empty:"No delivery windows known.",windows_needs_update:"The window list needs a newer HA-RohlikCZ with the Delivery slots sensor."},de:{title:"Liefertermine",slot_express:"Express",slot_standard:"Standard",slot_eco:"Öko",express_available:"Express verfügbar",no_express:"Kein Express",watch_toggle:"Express beobachten",watch_error:"Aktualisieren fehlgeschlagen",no_entities:"Auf diesem Gerät wurden keine Rohlík-Entitäten gefunden",layout_auto:"Automatisch",layout_row:"Zeile",layout_column:"Spalte",windows_days:"Tage",windows_length:"Fensterlänge",windows_hour:"1 Stunde",windows_quarter:"15 Minuten",windows_free_count:"{count} frei",windows_free_percent:"{percent} % frei",windows_booked:"Ausgebucht",windows_none_free:"An diesem Tag ist nichts mehr frei.",windows_empty:"Keine Lieferfenster bekannt.",windows_needs_update:"Die Liste der Lieferfenster braucht ein neueres HA-RohlikCZ mit dem Sensor Lieferfenster."}},Fi={cs:{device:"Zařízení",name:"Vlastní název",slots:"Zobrazené sloty",layout:"Rozložení",show_price:"Zobrazit cenu",show_location:"Zobrazit adresu",watch_interval:"Interval sledování (s)",show_tiles:"Zobrazit dlaždice",show_windows:"Zobrazit všechna okna",hide_booked:"Skrýt obsazená okna"},en:{device:"Device",name:"Custom name",slots:"Slots shown",layout:"Layout",show_price:"Show price",show_location:"Show location",watch_interval:"Watch interval (s)",show_tiles:"Show tiles",show_windows:"Show all windows",hide_booked:"Hide booked-out windows"},de:{device:"Gerät",name:"Eigener Name",slots:"Angezeigte Termine",layout:"Anordnung",show_price:"Preis anzeigen",show_location:"Adresse anzeigen",watch_interval:"Intervall beim Beobachten (s)",show_tiles:"Kacheln zeigen",show_windows:"Alle Lieferfenster zeigen",hide_booked:"Ausgebuchte ausblenden"}};let qi=class extends Kt{constructor(){super(...arguments),this.labels=Fi,this.defaults={slots:["express","standard","eco"],show_price:!0,show_location:!0,watch_interval:15,layout:"auto",show_tiles:!0,show_windows:!1,hide_booked:!1}}extraSchema(){const e=e=>Ze(this.hass,Hi,e);return[{name:"slots",selector:{select:{multiple:!0,mode:"list",options:[{value:"express",label:e("slot_express")},{value:"standard",label:e("slot_standard")},{value:"eco",label:e("slot_eco")}]}}},{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"auto",label:e("layout_auto")},{value:"row",label:e("layout_row")},{value:"column",label:e("layout_column")}]}}},{name:"show_tiles",selector:{boolean:{}}},{name:"show_windows",selector:{boolean:{}}},{name:"hide_booked",selector:{boolean:{}}},{name:"show_price",selector:{boolean:{}}},{name:"show_location",selector:{boolean:{}}},{name:"watch_interval",selector:{number:{mode:"box",min:10,max:300}}}]}};qi=e([he("rohlik-slots-card-editor")],qi);let Bi=class extends et{constructor(){super(...arguments),this.strings=Hi,this.watching=!1,this.pollError=null,this.selectedDay=null,this.selectedLength=60,this.onVisibilityChange=()=>this.syncPolling(),this.toggleWatch=()=>{this.watching=!this.watching,this.saveWatchFlag(this.watching),this.watching&&(this.pollError=null)}}static getConfigElement(){return document.createElement("rohlik-slots-card-editor")}static getStubConfig(e){return{...et.getStubConfig(e),type:"custom:rohlik-slots-card"}}getGridOptions(){return this.config?.show_windows?{columns:12,rows:"auto",min_columns:6}:"column"===this.config?.layout?{columns:4,rows:"auto",min_columns:3,min_rows:4}:{columns:12,rows:"auto",min_columns:6,min_rows:2}}estimatedCardSize(){return"column"===this.config?.layout?9:6}setConfig(e){super.setConfig(e),this.watching=this.loadWatchFlag();const t=this.loadChoice();this.selectedDay=t.day,this.selectedLength=t.length}choiceStorageKey(){const e=this.config?.device;return e?`rohlik-slots-choice:${e}`:null}loadChoice(){const e=this.choiceStorageKey();try{const t=e?localStorage.getItem(e):null,i=t?JSON.parse(t):{};return{day:"string"==typeof i.day?i.day:null,length:15===i.length?15:60}}catch{return{day:null,length:60}}}saveChoice(){const e=this.choiceStorageKey();if(e)try{localStorage.setItem(e,JSON.stringify({day:this.selectedDay,length:this.selectedLength}))}catch{}}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this.onVisibilityChange),this.syncPolling()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("visibilitychange",this.onVisibilityChange),this.stopPolling()}willUpdate(e){super.willUpdate(e),this.syncPolling()}watchStorageKey(){const e=this.config?.device;return e?`rohlik-slots-watch:${e}`:null}loadWatchFlag(){const e=this.watchStorageKey();if(!e)return!1;try{return"1"===localStorage.getItem(e)}catch{return!1}}saveWatchFlag(e){const t=this.watchStorageKey();if(t)try{localStorage.setItem(t,e?"1":"0")}catch{}}syncPolling(){const e=this.watching&&"visible"===document.visibilityState&&!!this.config,t=Math.max(10,this.config?.watch_interval??15);e?void 0!==this.pollTimer&&this.pollSeconds===t||(this.stopPolling(),this.pollTimer=setInterval(()=>{this.poll()},1e3*t),this.pollSeconds=t):this.stopPolling()}stopPolling(){void 0!==this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=void 0),this.pollSeconds=void 0}async poll(){const e=this.entityId("express_slot")??this.entityId("standard_slot")??this.entityId("eco_slot");if(e&&this.hass)try{const t=await nt(this.hass,e);if(!t)throw new Error("no config entry");await at(this.hass,t,"refresh_slots"),this.pollError=null}catch{this.pollError=this.t("watch_error")}}slotsToShow(){const e=this.config?.slots;return e&&e.length>0?e:Oi}render(){if(!this.config)return V;if(0===this.entities.size)return B`
        <ha-card style=${ke(this.accentStyle)}>${this.renderError(this.t("no_entities"))}</ha-card>
      `;const e=this.slotsToShow(),t=this.isOn("is_express_available"),i=!1!==this.config.show_location,r=this.attr("first_delivery","delivery_location"),o=this.config.layout??"auto";return B`
      <ha-card style=${ke(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:calendar-clock"></ha-icon>
          <span class="title">${this.config.name||this.t("title")}</span>
          <div class="header-actions">
            <button
              class=${_e({"icon-toggle":!0,on:this.watching})}
              @click=${this.toggleWatch}
              aria-pressed=${this.watching}
              aria-label=${this.t("watch_toggle")}
              title=${this.t("watch_toggle")}
            >
              <ha-icon icon=${this.watching?"mdi:eye":"mdi:eye-outline"}></ha-icon>
              ${this.watching?B`<span class="pulse-dot"></span>`:V}
            </button>
            <span class="chip ${t?"warn":"neutral"}">
              ${t?this.t("express_available"):this.t("no_express")}
            </span>
          </div>
        </div>

        ${i&&"string"==typeof r&&r?B`
              <div class="location">
                <ha-icon icon="mdi:map-marker"></ha-icon>
                <span>${r}</span>
              </div>
            `:V}
        ${this.pollError?this.renderError(this.pollError):V}

        ${!1===this.config.show_tiles?V:B`
              <div
                class=${_e({"slots-grid":!0,column:"column"===o,auto:"auto"===o})}
                style=${ke({"--rohlik-slot-count":String(e.length)})}
              >
                ${e.map(e=>this.renderTile(e))}
              </div>
            `}
        ${this.config.show_windows?this.renderWindows():V}

        ${this.renderFreshness()}
      </ha-card>
    `}selectDay(e){this.selectedDay=e,this.saveChoice()}selectLength(e){this.selectedLength=e,this.saveChoice()}dayLabel(e){const[t,i,r]=e.split("-").map(Number),o=new Date(t,(i??1)-1,r??1),s=new Date,n=new Date(s);n.setDate(s.getDate()+1);const a=(e,t)=>e.toDateString()===t.toDateString();return a(o,s)?this.t("today"):a(o,n)?this.t("tomorrow"):new Intl.DateTimeFormat(Ee(this.hass),{weekday:"short",day:"numeric",month:"numeric"}).format(o)}renderWindows(){if(!this.entityId("delivery_slots"))return B`<div class="windows-hint">${this.t("windows_needs_update")}</div>`;const e=function(e){const t=new Map;for(const i of e){const e=t.get(i.date);e?e.push(i):t.set(i.date,[i])}return[...t.entries()].sort(([e],[t])=>e.localeCompare(t)).map(([e,t])=>({date:e,windows:t}))}(function(e){const t=e?.attributes?.slots;if(!Array.isArray(t))return[];const i=[];for(const e of t){if(!e||"object"!=typeof e)continue;const t=e,r=Mi(t.since);if(!r)continue;const o="string"==typeof t.date&&t.date?t.date:ji(r);i.push({id:"number"==typeof t.id?t.id:null,date:o,start:r,end:Mi(t.till),minutes:15===Pi(t.minutes,60)?15:60,free:Math.max(0,Pi(t.free)),price:Pi(t.price),premium:!0===t.premium,eco:!0===t.eco})}return i.sort((e,t)=>e.start.getTime()-t.start.getTime()||t.minutes-e.minutes),i}(this.state("delivery_slots")));if(0===e.length)return B`<div class="windows-hint">${this.t("windows_empty")}</div>`;const t=function(e,t){if(t){const i=e.find(e=>e.date===t);if(i)return i}return e.find(e=>Li(e)>0)??e[0]}(e,this.selectedDay),i=function(e){const t=new Set((e?.windows??[]).map(e=>e.minutes));return[60,15].filter(e=>t.has(e))}(t),r=i.includes(this.selectedLength)?this.selectedLength:i[0]??60,o=function(e,t,i=!1){return(e?.windows??[]).filter(e=>e.minutes===t&&(!i||e.free>0))}(t,r,!0===this.config.hide_booked);return B`
      <div class="windows">
        <div class="day-chips" role="tablist" aria-label=${this.t("windows_days")}>
          ${e.map(e=>this.renderDayChip(e,e.date===t?.date))}
        </div>
        ${i.length>1?B`
              <div class="segmented" role="group" aria-label=${this.t("windows_length")}>
                ${i.map(e=>B`
                    <button
                      class=${_e({seg:!0,on:e===r})}
                      aria-pressed=${e===r}
                      @click=${()=>this.selectLength(e)}
                    >
                      ${15===e?this.t("windows_quarter"):this.t("windows_hour")}
                      <span class="seg-count">${Li(t,e)}</span>
                    </button>
                  `)}
              </div>
            `:V}
        ${0===o.length?B`<div class="windows-hint">${this.t("windows_none_free")}</div>`:B`<div class=${_e({"window-grid":!0,quarter:15===r})}>
              ${o.map(e=>this.renderWindow(e))}
            </div>`}
      </div>
    `}renderDayChip(e,t){const i=Li(e);return B`
      <button
        class=${_e({"day-chip":!0,on:t,none:0===i})}
        role="tab"
        aria-selected=${t}
        @click=${()=>this.selectDay(e.date)}
      >
        <span class="day-name">${this.dayLabel(e.date)}</span>
        <span class="day-free">
          ${0===i?this.t("windows_booked"):this.t("windows_free_count",{count:i})}
        </span>
      </button>
    `}renderWindow(e){const t=e.free<=0,i=e.end?`${Oe(this.hass,e.start)} – ${Oe(this.hass,e.end)}`:Oe(this.hass,e.start),r=[];t?r.push(this.t("windows_booked")):r.push(this.t("windows_free_percent",{percent:Math.round(e.free)})),!t&&!1!==this.config.show_price&&e.price>0&&r.push(this.money(e.price));const o=t?"none":e.free>=50?"ok":"warn";return B`
      <div class=${_e({window:!0,booked:t})} title=${`${i} · ${r.join(" · ")}`}>
        <div class="window-time">
          ${i}
          ${e.eco&&!t?B`<ha-icon icon="mdi:leaf" class="eco"></ha-icon>`:V}
        </div>
        <div class="window-meta">${r.join(" · ")}</div>
        ${t?V:B`<div class="capacity-bar"><div
              class=${_e({"capacity-fill":!0,[o]:!0})}
              style=${ke({width:`${Di(e.free)}%`})}
            ></div></div>`}
      </div>
    `}renderTile(e){const t=function(e,t){const i=t?.attributes??{},r=Ce(t?.state);return{type:e,start:r,end:Ce(i["Delivery Slot End"]),price:Ti(i.Price),capacityPercent:Ti(i["Remaining Capacity Percent"]),capacityMessage:Ri(i["Remaining Capacity Message"]),title:Ri(i.Title),subtitle:Ri(i.Subtitle),available:null!==r}}(e,this.state(`${e}_slot`)),i=Ni[e],r=this.t(`slot_${e}`),o=t.capacityMessage??t.subtitle??"";return B`
      <div class="tile">
        <div class="tile-head"><ha-icon icon=${i}></ha-icon><span>${r}</span></div>
        ${this.renderTileTime(t)}
        <div class="tile-meta">${this.renderMeta(t)}</div>
        ${this.renderCapacityBar(t)}
        <div class="tile-msg">${o}</div>
      </div>
    `}renderTileTime(e){return e.available&&e.start?B`
      <div class="tile-time">
        ${Te(this.hass,e.start,{today:this.t("today"),tomorrow:this.t("tomorrow")})}
      </div>
    `:B`<div class="tile-time muted">${this.t("unavailable")}</div>`}renderMeta(e){if(!e.available||!e.start)return"";const t=[],i=Oe(this.hass,e.start);return t.push(e.end?`${i} – ${Oe(this.hass,e.end)}`:i),!1!==this.config.show_price&&null!=e.price&&t.push(0===e.price?this.t("free"):this.money(e.price)),t.join(" · ")}renderCapacityBar(e){if(!e.available||null==e.capacityPercent)return B`
        <div class="capacity-bar empty"><div class="capacity-fill muted"></div></div>
      `;const t=null==(i=e.capacityPercent)||Number.isNaN(i)?"err":i>=50?"ok":i>=10?"warn":"err";var i;return B`
      <div class="capacity-bar">
        <div
          class=${_e({"capacity-fill":!0,[t]:!0})}
          style=${ke({width:`${Di(e.capacityPercent)}%`})}
        ></div>
      </div>
    `}};Bi.styles=[Ye,Ui],e([ge()],Bi.prototype,"watching",void 0),e([ge()],Bi.prototype,"pollError",void 0),e([ge()],Bi.prototype,"selectedDay",void 0),e([ge()],Bi.prototype,"selectedLength",void 0),Bi=e([he("rohlik-slots-card")],Bi),rt({type:"rohlik-slots-card",documentationURL:"https://github.com/dvejsada/rohlik-cz-HA-cards/blob/main/docs/cards/slots-card.md",getEntitySuggestion:ot("rohlik-slots-card",["express_slot","standard_slot","eco_slot","first_delivery","is_express_available","is_reserved","delivery_slots"]),name:"Rohlík.cz Delivery Slots",description:"Express, standard and eco delivery slot times, prices and remaining capacity.",preview:!0});const Ki=n`
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
`,Zi={cs:{title:"Účet",xtra_days:"Xtra · {days} {days:den|dny|dní}",no_xtra:"Bez Xtra",stat_credit:"Kredit",stat_bags:"Tašky",stat_no_limit:"Objednávky bez limitu",stat_free_express:"Expres zdarma",stat_parents_club:"Rodičovský klub",stat_reusable:"Vratné tašky",deposit_caption:"záloha {amount}",remaining:"zbývá {n}",yes:"Ano",no:"Ne",last_order:"Poslední objednávka",refresh_failed:"Aktualizace se nezdařila",no_entities:"Na tomto zařízení nebyly nalezeny entity Rohlík.cz"},en:{title:"Account",xtra_days:"Xtra · {days} {days:day|days}",no_xtra:"No Xtra",stat_credit:"Credit",stat_bags:"Bags",stat_no_limit:"Orders without limit",stat_free_express:"Free express",stat_parents_club:"Parents Club",stat_reusable:"Reusable bags",deposit_caption:"{amount} deposit",remaining:"{n} left",yes:"Yes",no:"No",last_order:"Last order",refresh_failed:"Refresh failed",no_entities:"Rohlík.cz entities not found on this device"}},Vi={cs:{device:"Zařízení",name:"Vlastní název",stats:"Zobrazené statistiky",show_footer:"Zobrazit patičku"},en:{device:"Device",name:"Custom name",stats:"Stats shown",show_footer:"Show footer"}};let Wi=class extends Kt{constructor(){super(...arguments),this.labels=Vi,this.defaults={stats:["credit","bags","no_limit","free_express","parents_club","reusable"],show_footer:!0}}extraSchema(){const e=e=>Ze(this.hass,Zi,e);return[{name:"stats",selector:{select:{multiple:!0,mode:"list",options:[{value:"credit",label:e("stat_credit")},{value:"bags",label:e("stat_bags")},{value:"no_limit",label:e("stat_no_limit")},{value:"free_express",label:e("stat_free_express")},{value:"parents_club",label:e("stat_parents_club")},{value:"reusable",label:e("stat_reusable")}]}}},{name:"show_footer",selector:{boolean:{}}}]}};Wi=e([he("rohlik-account-card-editor")],Wi);const Qi=["credit","bags","no_limit","free_express","parents_club","reusable"];function Yi(e){if(null==e||"unknown"===e||"unavailable"===e)return null;const t=Number(e);return Number.isNaN(t)?null:t}let Gi=class extends et{constructor(){super(...arguments),this.strings=Zi,this.refreshing=!1,this.refreshError=null,this.onRefresh=async()=>{if(this.refreshing)return;const e=this.entityId("credit_amount");if(e&&this.hass){this.refreshing=!0,this.refreshError=null;try{const t=await nt(this.hass,e);if(!t)throw new Error("no config entry");await at(this.hass,t,"update_data")}catch{this.refreshError=this.t("refresh_failed")}finally{this.refreshing=!1}}}}static getConfigElement(){return document.createElement("rohlik-account-card-editor")}static getStubConfig(e){return{...et.getStubConfig(e),type:"custom:rohlik-account-card"}}getGridOptions(){return{columns:6,rows:"auto",min_columns:4,min_rows:3}}estimatedCardSize(){return 10}statsToShow(){const e=this.config?.stats;return e&&e.length>0?e:Qi}remainingDays(){const e=Yi(this.state("premium_days")?.state);if(null!=e)return e;const t=this.attr("is_premium","remaining_days");return"number"==typeof t?t:null}statContent(e,t){switch(e){case"credit":{if(!this.entityId("credit_amount"))return null;const e=Yi(this.state("credit_amount")?.state);return null==e?null:{icon:"mdi:cash-multiple",labelKey:"stat_credit",value:this.money(e)}}case"bags":{if(!this.entityId("bags_amount"))return null;const e=Yi(this.state("bags_amount")?.state);if(null==e)return null;const t=this.attr("bags_amount","Max Bags"),i=this.attr("bags_amount","Deposit Amount"),r=this.attr("bags_amount","Deposit Currency"),o="number"==typeof t?`${e} / ${t}`:String(e);let s;if("number"==typeof i&&i>0){const e=Ke(r)??this.currency;s=this.t("deposit_caption",{amount:this.money(i,e)})}return{icon:"mdi:shopping",labelKey:"stat_bags",value:o,caption:s}}case"no_limit":{if(!t||!this.entityId("no_limit"))return null;const e=Yi(this.state("no_limit")?.state);return null==e?null:{icon:"mdi:cash-100",labelKey:"stat_no_limit",value:this.t("remaining",{n:e})}}case"free_express":{if(!t||!this.entityId("free_express"))return null;const e=Yi(this.state("free_express")?.state);return null==e?null:{icon:"mdi:truck-fast",labelKey:"stat_free_express",value:this.t("remaining",{n:e})}}case"parents_club":return this.entityId("is_parent")?{icon:"mdi:human-male-female-child",labelKey:"stat_parents_club",value:this.isOn("is_parent")?this.t("yes"):this.t("no")}:null;case"reusable":return this.entityId("is_reusable")?{icon:"mdi:recycle",labelKey:"stat_reusable",value:this.isOn("is_reusable")?this.t("yes"):this.t("no")}:null;default:return null}}render(){if(!this.config)return V;if(0===this.entities.size)return B`
        <ha-card style=${ke(this.accentStyle)}>${this.renderError(this.t("no_entities"))}</ha-card>
      `;const e=this.isOn("is_premium"),t=this.statsToShow();return B`
      <ha-card style=${ke(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:account-star"></ha-icon>
          <span class="title">${this.deviceName()}</span>
          ${this.renderHeaderChip(e)}
        </div>

        <div class="stats-grid">${t.map(t=>this.renderStat(t,e))}</div>

        ${!1!==this.config.show_footer?this.renderFooter():V}
      </ha-card>
    `}renderHeaderChip(e){if(!e)return B`<span class="chip neutral">${this.t("no_xtra")}</span>`;const t=this.remainingDays();return B`
      <span class="chip ${null!=t&&t<7?"warn":"ok"}">${this.t("xtra_days",{days:t??"—"})}</span>
    `}renderStat(e,t){const i=this.statContent(e,t);return i?B`
      <div class="stat">
        <div class="stat-icon"><ha-icon icon=${i.icon}></ha-icon></div>
        <div class="stat-body">
          <span class="stat-value">${i.value}</span>
          ${i.caption?B`<span class="stat-caption">${i.caption}</span>`:V}
          <span class="stat-label">${this.t(i.labelKey)}</span>
        </div>
      </div>
    `:V}renderFooter(){return B`
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
            <ha-icon icon="mdi:refresh" class=${_e({spin:this.refreshing})}></ha-icon>
          </button>
        </div>
      </div>
      ${this.refreshError?this.renderError(this.refreshError):V}
    `}renderLastOrderLine(){const e=Ce(this.state("last_order")?.state);if(!e)return V;const t=this.attr("last_order","Items"),i=this.attr("last_order","Price"),r=new Intl.DateTimeFormat(this.hass.locale?.language||"en",{day:"numeric",month:"short"}).format(e),o=[`${this.t("last_order")} ${r}`];return"number"==typeof t&&o.push(this.t("items_count",{count:t})),"number"==typeof i&&o.push(this.money(i)),B`<div class="last-order">${o.join(" · ")}</div>`}};Gi.styles=[Ye,Ki],e([ge()],Gi.prototype,"refreshing",void 0),e([ge()],Gi.prototype,"refreshError",void 0),Gi=e([he("rohlik-account-card")],Gi),rt({type:"rohlik-account-card",documentationURL:"https://github.com/dvejsada/rohlik-cz-HA-cards/blob/main/docs/cards/account-card.md",getEntitySuggestion:ot("rohlik-account-card",["credit_amount","bags_amount","premium_days","no_limit","free_express","is_premium","is_reusable","is_parent","account_id","email","phone","updated"]),name:"Rohlík.cz Account",description:"Xtra membership status, credit, bags and account perks at a glance.",preview:!0});const Ji=["l0","l1","l2","l3","items"],Xi=["month","year","all"],er=["auto","years","months","none"];function tr(e){return"all"===e?"all":"year"}const ir={l0:{year:"categories_l0_this_year",all:"categories_l0_all_time"},l1:{year:"categories_this_year",all:"categories_all_time"},l2:{year:"categories_l2_this_year",all:"categories_l2_all_time"},l3:{year:"categories_l3_this_year",all:"categories_l3_all_time"},items:{year:"items_this_year",all:"items_all_time"}};function rr(e,t){return ir[e][t]}function or(e){if("number"==typeof e&&Number.isFinite(e))return e;if("string"==typeof e&&""!==e.trim()){const t=Number(e);if(Number.isFinite(t))return t}}function sr(e,t){if(!e||"object"!=typeof e)return[];const i=e[t];if(!Array.isArray(i))return[];const r=[];for(const e of i){if(!e||"object"!=typeof e)continue;const t=e,i=t.start,o="number"==typeof i||"string"==typeof i?new Date(i):null;if(!o||Number.isNaN(o.getTime()))continue;const s=or(t.state)??or(t.max)??or(t.mean);void 0!==s&&r.push({month:o,total:s})}return r.sort((e,t)=>e.month.getTime()-t.month.getTime()),r}function nr(e){return`${e.getFullYear()}-${e.getMonth()}`}const ar={cs:{title:"Útraty",not_found:"Na tomto zařízení nebyly nalezeny entity Rohlík.cz",period_month:"Tento měsíc",period_year:"Letos",period_all:"Celkem",avg_order:"průměrná objednávka",orders_count:"{n} {n:objednávka|objednávky|objednávek}",level_l0:"Hlavní",level_l1:"Kategorie",level_l2:"Podrobné",level_l3:"Nejpodrobnější",level_items:"Položky",expand_row:"{units} ks · {avg} za kus",enable_hint:"Rozpis zobrazíte zapnutím Analýzy útrat v nastavení integrace.",enriched:"obohaceno {enriched} z {total} objednávek",breakdown_year_hint:"Rozpis za rok {year} (měsíční kategorie nejsou k dispozici)",monthly_history_hint:"Měsíční historie vyžaduje recorder"},en:{title:"Spending",not_found:"Rohlík.cz entities not found on this device",period_month:"This month",period_year:"This year",period_all:"All time",avg_order:"avg order",orders_count:"{n} {n:order|orders}",level_l0:"Top",level_l1:"Categories",level_l2:"Detailed",level_l3:"Specific",level_items:"Items",expand_row:"{units} units · {avg} per unit",enable_hint:"Enable Spending Analytics in the integration options to see a breakdown.",enriched:"{enriched} of {total} orders enriched",breakdown_year_hint:"Breakdown shown for {year} (per-month categories are not available)",monthly_history_hint:"Monthly history needs the recorder"}},lr={cs:{device:"Zařízení",name:"Vlastní název",default_period:"Výchozí období",default_level:"Výchozí úroveň",top_n:"Počet položek",chart:"Graf",show_totals:"Zobrazit souhrn"},en:{device:"Device",name:"Custom name",default_period:"Default period",default_level:"Default level",top_n:"Row count",chart:"Chart",show_totals:"Show totals"}},cr=n`
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
    text-align: end;
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
`,dr={cs:{month:"Tento měsíc",year:"Letos",all:"Celkem"},en:{month:"This month",year:"This year",all:"All time"}},hr={cs:{l0:"Hlavní",l1:"Kategorie",l2:"Podrobné",l3:"Nejpodrobnější",items:"Položky"},en:{l0:"Top",l1:"Categories",l2:"Detailed",l3:"Specific",items:"Items"}},ur={cs:{auto:"Automaticky",years:"Roky",months:"Měsíce",none:"Žádný"},en:{auto:"Automatic",years:"Years",months:"Months",none:"None"}};let pr=class extends Kt{constructor(){super(...arguments),this.labels=lr,this.defaults={default_period:"year",default_level:"l1",top_n:10,chart:"auto",show_totals:!0}}extraSchema(){return[{name:"default_period",selector:{select:{mode:"dropdown",options:Xi.map(e=>({value:e,label:Ze(this.hass,dr,e)}))}}},{name:"default_level",selector:{select:{mode:"dropdown",options:Ji.map(e=>({value:e,label:Ze(this.hass,hr,e)}))}}},{name:"top_n",selector:{number:{min:1,max:50,mode:"box"}}},{name:"chart",selector:{select:{mode:"dropdown",options:er.map(e=>({value:e,label:Ze(this.hass,ur,e)}))}}},{name:"show_totals",selector:{boolean:{}}}]}};pr=e([he("rohlik-spending-card-editor")],pr);let mr=class extends et{constructor(){super(...arguments),this.strings=ar,this.expanded=new Set,this.monthlyError=!1,this.hasSensor=e=>void 0!==this.entityId(e)}static getConfigElement(){return document.createElement("rohlik-spending-card-editor")}static getStubConfig(e){return{...et.getStubConfig(e),type:"custom:rohlik-spending-card"}}estimatedCardSize(){return 13}getGridOptions(){return{columns:12,rows:"auto",min_columns:6,min_rows:5}}get effectivePeriod(){return this.period??this.config?.default_period??"year"}resolveChart(e){const t=this.config?.chart??"auto";return"auto"!==t?t:!1===this.config?.show_years?"none":"month"===e?"months":"years"}get levelsForCurrentPeriod(){return e=this.hasSensor,t=tr(this.effectivePeriod),Ji.filter(i=>e(rr(i,t)));var e,t}get hasAnyAnalytics(){return Ji.some(e=>this.hasSensor(rr(e,"year"))||this.hasSensor(rr(e,"all")))}get effectiveLevel(){const e=this.levelsForCurrentPeriod;if(0===e.length)return;const t=this.level??this.config?.default_level??"l1";return e.includes(t)?t:e[0]}render(){if(!this.config)return V;if(!this.state("monthly_spent"))return B`<ha-card style=${ke(this.accentStyle)}>
        ${this.renderError(this.t("not_found"))}
      </ha-card>`;const e=this.effectivePeriod,t=!1!==this.config.show_totals,i=this.resolveChart(e);return B`
      <ha-card style=${ke(this.accentStyle)}>
        <div class="header">
          <ha-icon icon="mdi:chart-timeline-variant"></ha-icon>
          <span class="title">${this.t("title")}</span>
          <div class="segmented">
            <button
              class=${_e({pill:!0,active:"month"===e})}
              type="button"
              @click=${()=>this.period="month"}
            >
              ${this.t("period_month")}
            </button>
            <button
              class=${_e({pill:!0,active:"year"===e})}
              type="button"
              @click=${()=>this.period="year"}
            >
              ${this.t("period_year")}
            </button>
            <button
              class=${_e({pill:!0,active:"all"===e})}
              type="button"
              @click=${()=>this.period="all"}
            >
              ${this.t("period_all")}
            </button>
          </div>
        </div>

        ${t?this.renderTotals(e):V}
        ${"years"===i?this.renderYearsChart():V}
        ${"months"===i?this.renderMonthsChart():V}
        ${this.renderBreakdown(e)}
        ${this.renderFreshness()}
      </ha-card>
    `}updated(e){super.updated(e),this.maybeFetchMonthly()}maybeFetchMonthly(){if(!this.config||!this.hass)return;if("months"!==this.resolveChart(this.effectivePeriod))return;const e=this.entityId("monthly_spent");if(!e)return;const t=new Date,i=`${t.getFullYear()}-${t.getMonth()}`,r=`${e}:${i}`;if(this.monthlyFetchKey===r)return;this.monthlyFetchKey=r;const o=new Date(t.getFullYear(),t.getMonth()-11,1);this.hass.callWS({type:"recorder/statistics_during_period",start_time:o.toISOString(),end_time:t.toISOString(),statistic_ids:[e],period:"month",units:{},types:["state"]}).then(t=>{this.monthly={entityId:e,monthKey:i,stats:sr(t,e)},this.monthlyError=!1}).catch(()=>{this.monthlyError=!0})}renderTotals(e){const t=this.state("monthly_spent"),i=Number(t?.state),r=new Intl.DateTimeFormat(Ee(this.hass),"month"===e?{month:"long",year:"numeric"}:{month:"long"}).format(new Date),o=this.state("yearly_spent"),s=Number(o?.state),n=o?.attributes?.year,a=Number(o?.attributes?.order_count??0),l=void 0!==n?`${n} · ${this.t("orders_count",{n:a})}`:this.t("orders_count",{n:a});let c,d;if("year"===e)c=Number(o?.attributes?.average_order_value),d=this.t("avg_order");else{const e=this.state("alltime_spent");c=Number(e?.attributes?.average_order_value);const t=Number(e?.attributes?.order_count??0);d=this.t("orders_count",{n:t})}return B`
      <div class="totals">
        <div class="totals-cell">
          <div class="totals-value">
            ${Number.isFinite(i)?this.money(i):"–"}
          </div>
          <div class="totals-caption">${r}</div>
        </div>
        <div class="totals-cell">
          <div class="totals-value">
            ${Number.isFinite(s)?this.money(s):"–"}
          </div>
          <div class="totals-caption">${l}</div>
        </div>
        <div class="totals-cell">
          <div class="totals-value">
            ${void 0!==c&&Number.isFinite(c)?this.money(c):"–"}
          </div>
          <div class="totals-caption">${d}</div>
        </div>
      </div>
    `}renderYearsChart(){const e=function(e){if(!e||"object"!=typeof e)return[];const t=[];for(const[i,r]of Object.entries(e)){const e=Number(i);if(!Number.isFinite(e))continue;if(!r||"object"!=typeof r)continue;const o=r;t.push({year:e,total:or(o.total)??0,orderCount:or(o.order_count)??0})}return t.sort((e,t)=>e.year-t.year),t}(this.state("alltime_spent")?.attributes?.by_year);if(e.length<2)return V;const t=(new Date).getFullYear();return this.renderBarChart(e.map(e=>({key:String(e.year),label:String(e.year),total:e.total,highlighted:e.year===t})))}renderMonthsChart(){const e=this.entityId("monthly_spent");if(!e)return V;if(this.monthlyError)return B`<div class="chart-hint">${this.t("monthly_history_hint")}</div>`;if(!this.monthly||this.monthly.entityId!==e)return V;const t=new Date,i=Number(this.state("monthly_spent")?.state),r=function(e,t,i){const r=new Map;for(const t of e)r.set(nr(t.month),t.total);const o=[];for(let e=11;e>=0;e--){const s=new Date(t.getFullYear(),t.getMonth()-e,1),n=0===e&&void 0!==i&&Number.isFinite(i)?i:r.get(nr(s))??0;o.push({month:s,total:n})}return o}(this.monthly.stats,t,Number.isFinite(i)?i:void 0),o=new Intl.DateTimeFormat(Ee(this.hass),{month:"short"});return this.renderBarChart(r.map((e,t)=>({key:`${e.month.getFullYear()}-${e.month.getMonth()}`,label:o.format(e.month),total:e.total,highlighted:t===r.length-1})))}renderBarChart(e){if(e.length<2)return V;const t=e.reduce((e,t)=>Math.max(e,t.total),0)||1,i=40*e.length-12+12;return B`
      <svg
        class="chart-svg"
        viewBox="0 0 ${i} ${118}"
        preserveAspectRatio="xMidYMid meet"
        role="img"
      >
        ${hi(e,e=>e.key,(e,i)=>{const r=Math.max(2,e.total/t*90),o=6+40*i,s=90-r+6,n=e.highlighted?"var(--rohlik-accent)":"color-mix(in srgb, var(--primary-text-color) 15%, transparent)";return K`
              <rect x=${o} y=${s} width=${28} height=${r} rx="4" fill=${n}>
                <title>${this.money(e.total)}</title>
              </rect>
              <text
                x=${o+14}
                y=${112}
                text-anchor="middle"
                font-size="10.5"
                fill="var(--secondary-text-color)"
              >
                ${e.label}
              </text>
            `})}
      </svg>
    `}renderBreakdown(e){if(!this.hasAnyAnalytics)return B`<div class="breakdown-hint">${this.t("enable_hint")}</div>`;const t=tr(e),i=this.levelsForCurrentPeriod,r=this.effectiveLevel;if(!r)return V;const o=this.config.top_n??10,s=this.state(rr(r,t)),{entries:n,enrichedOrders:a,totalOrders:l}=function(e,t){const i=e?.attributes??{},r=i.categories??i.items,o=Array.isArray(r)?r:[],s=[];for(const e of o){if(!e||"object"!=typeof e)continue;const t=e,i="string"==typeof t.name&&""!==t.name.trim()?t.name:void 0,r=or(t.spent);i&&void 0!==r&&s.push({name:i,spent:r,units:or(t.units)??0,avgUnitPrice:or(t.avg_unit_price)??0,id:"string"==typeof t.id||"number"==typeof t.id?t.id:void 0})}s.sort((e,t)=>t.spent-e.spent);const n=or(i.total_count)??s.length,a=or(i.enriched_orders),l=or(i.total_orders);return{entries:s.slice(0,Math.max(0,t)),totalCount:n,enrichedOrders:a,totalOrders:l}}(s,o),c=function(e){const t=e.reduce((e,t)=>Math.max(e,t.spent),0);return t<=0?e.map(()=>0):e.map(e=>Math.max(0,Math.min(100,e.spent/t*100)))}(n),d=this.state("yearly_spent")?.attributes?.year??(new Date).getFullYear();return B`
      ${"month"===e?B`<div class="breakdown-year-hint">
            ${this.t("breakdown_year_hint",{year:d})}
          </div>`:V}
      ${i.length>1?B`
            <div class="pills-row">
              ${hi(i,e=>e,e=>B`
                  <button
                    class=${_e({pill:!0,active:r===e})}
                    type="button"
                    @click=${()=>this.level=e}
                  >
                    ${this.t(`level_${e}`)}
                  </button>
                `)}
            </div>
          `:V}
      ${hi(n,e=>e.id??e.name,(e,t)=>this.renderBreakdownRow(e,c[t]))}
      ${void 0!==a&&void 0!==l?B`
            <div class="breakdown-footer">
              ${this.t("enriched",{enriched:a,total:l})}
            </div>
          `:V}
    `}renderBreakdownRow(e,t){const i=String(e.id??e.name),r=this.expanded.has(i);return B`
      <div
        class="breakdown-row"
        @click=${()=>this.toggleExpanded(i)}
        @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.toggleExpanded(i))}}
        role="button"
        tabindex="0"
      >
        <div class="breakdown-main">
          <span class="breakdown-name">${e.name}</span>
          <span class="breakdown-bar-track">
            <span
              class="breakdown-bar-fill"
              style=${ke({width:`${t}%`})}
            ></span>
          </span>
          <span class="breakdown-spent">${this.money(e.spent)}</span>
        </div>
        ${r?B`
              <div class="breakdown-expand">
                ${this.t("expand_row",{units:e.units,avg:this.money(e.avgUnitPrice)})}
              </div>
            `:V}
      </div>
    `}toggleExpanded(e){const t=new Set(this.expanded);t.has(e)?t.delete(e):t.add(e),this.expanded=t}};mr.styles=[Ye,cr],e([ge()],mr.prototype,"period",void 0),e([ge()],mr.prototype,"level",void 0),e([ge()],mr.prototype,"expanded",void 0),e([ge()],mr.prototype,"monthly",void 0),e([ge()],mr.prototype,"monthlyError",void 0),mr=e([he("rohlik-spending-card")],mr),rt({type:"rohlik-spending-card",documentationURL:"https://github.com/dvejsada/rohlik-cz-HA-cards/blob/main/docs/cards/spending-card.md",getEntitySuggestion:ot("rohlik-spending-card",["monthly_spent","yearly_spent","alltime_spent","categories_l0_this_year","categories_l0_all_time","categories_this_year","categories_all_time","categories_l2_this_year","categories_l2_all_time","categories_l3_this_year","categories_l3_all_time","items_this_year","items_all_time"]),name:"Rohlík.cz Spending",description:"Monthly, yearly and all-time spending totals with a category breakdown."});
