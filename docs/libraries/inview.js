"use strict";!function(){function e(e){for(var t=0,n=e.length;t<n;t++){var i=e[t].toLowerCase();this[i]=new Number(t),this[i].string=i}}var a={index:0,check:function(e){e[$.expando]||(e[$.expando]=++a.index)},make:function(e,t){return a.check(e),t.guid+"-"+e[$.expando]}},c={TYPE:new e(["onscreen","inview"]),INVIEW_STATES:new e(["none","top","bottom","left","right","both"]),registered:[],shouldReProcess:!0,register:function(e,t,n){var i=r.isLocked(),o=$(e);c.registered.push({id:a.make(e,t),data:t,$element:o,type:n,_onscreen:i?null:k.get(o).uniqueMeasurementId,_hasTriggered:!1}),c.shouldReProcess=!0},unregister:function(e,t,n){for(var i=c.registered,o=a.make(e,t),r=i.length-1;-1<r;r--){var s=i[r];s.id===o&&s.type===n&&(i.splice(r,1),c.shouldReProcess=!0)}},process:function(){var e,t=c.registered;for(c.shouldReProcess=!0;c.shouldReProcess;){if(c.shouldReProcess=!1,0===(e=t.length))return;for(var n=0;n<e;n++){var i=t[n],o=k.get(i.$element),r=void 0!==i._onscreen;if(r&&i._hasTriggered)if(!(i._onscreen!==o.uniqueMeasurementId))continue;switch(i._onscreen=o.uniqueMeasurementId,i._hasTriggered=!0,i.type){case c.TYPE.onscreen:c.processOnScreen(i,o);break;case c.TYPE.inview:c.processInView(i,o)}if(c.shouldReProcess)break}}},processOnScreen:function(e,t){e.$element.trigger("onscreen",t)},processInView:function(e,t){var n=0<=t.percentFromTop&&t.percentFromTop<100,i=0<=t.percentFromBottom&&t.percentFromBottom<100,o=0<=t.percentFromLeft&&t.percentFromLeft<100,r=0<=t.percentFromRight&&t.percentFromRight<100,n=(n&&i?c.INVIEW_STATES.both:n?c.INVIEW_STATES.top:i?c.INVIEW_STATES.bottom:c.INVIEW_STATES.none).string,i=(o&&r?c.INVIEW_STATES.both:o?c.INVIEW_STATES.left:r?c.INVIEW_STATES.right:c.INVIEW_STATES.none).string,o=[t.onscreen,i,n];e._inviewPreviousState=o,e._measurePreviousState=t,e.$element.trigger("inview",o)}},i={lastStartEvent:0,timeoutHandle:null,intervalDuration:100,hasRaf:!1,start:function(){i.lastStartEvent=(new Date).getTime(),i.repeat()},repeat:function(){i.stop(),i.hasRaf?i.timeoutHandle=requestAnimationFrame(i.main):i.timeoutHandle=setTimeout(i.main,i.intervalDuration)},hasExpired:function(){var e=(new Date).getTime()-i.lastStartEvent;if(!(e<1500))return i.stop(),!0},isThrottled:function(){return!((new Date).getTime()-i.lastMain>i.intervalDuration)},lastMain:(new Date).getTime(),main:function(){i.isThrottled()?i.repeat():(i.lastMain=(new Date).getTime(),i.hasExpired()||(0===c.registered.length?(i.stop(),i.intervalDuration=200):(i.stop(),i.intervalDuration=100),i.repeat(),r.isLocked())||c.process())},stop:function(){null!==i.timeoutHandle&&((i.hasRaf?cancelAnimationFrame:clearTimeout)(i.timeoutHandle),i.timeoutHandle=null)}},r=($.extend($.event.special,{onscreen:{noBubble:!0,add:function(e){c.register(this,e,c.TYPE.onscreen)},remove:function(e){c.unregister(this,e,c.TYPE.onscreen)}},inview:{noBubble:!0,add:function(e){c.register(this,e,c.TYPE.inview)},remove:function(e){c.unregister(this,e,c.TYPE.inview)}}}),$.extend($.fn,{onscreen:function(e){return e?(this.on("onscreen",e),this):k.get(this)},inview:function(e){return e?(this.on("inview",e),this):k.get(this)}}),{locks:[],lock:function(e){r.isLocked(e)||r.locks.push(e)},unlock:function(e){if(r.isLocked(e)){for(var t=0,n=r.locks.length;t<n;t++)if(r.locks[t]===e){r.locks.splice(t,1);break}i.start()}},isLocked:function(e){if(!e)return 0<r.locks.length;for(var t=0,n=r.locks.length;t<n;t++)if(r.locks[t]===e)return!0;return!1}}),t={options:{},config:function(e){"object"==typeof e&&$.extend(t.options,e)}},I=($.inview=$.onscreen=function(){i.start()},$.extend($.inview,r,t),{$el:$(window),height:null,width:null,heightRatio:null,widthRatio:null,resize:function(){I.height=window.innerHeight||I.$el.height(),I.width=window.innerWidth||I.$el.width(),I.heightRatio=100/I.height,I.widthRatio=100/I.width,i.start()}}),k={featureDetect:function(){i.hasRaf=window.requestAnimationFrame&&window.cancelAnimationFrame},get:function(e){if(0!==e.length){var t=e[0];try{o=t.getBoundingClientRect()}catch(e){o={top:0,right:0,bottom:0,left:0,width:0,height:0}}var e=o.height,n=o.width,i=o.top,o=o.left,r=I.height-(i+e),s=I.width-(o+n),a=Math.round(I.heightRatio*i),c=Math.round(I.widthRatio*o),h=Math.round(I.heightRatio*r),u=Math.round(I.widthRatio*s),l=null,l=0<o+n&&s<0&&o<0?n:o<0?n+o:o+n>I.width?I.width-o:n,d=null,f=((d=0<i+e&&r<0&&i<0?e:i<0?e+i:i+e>I.height?I.height-i:e)<0&&(d=0),l<0&&(l=0),Math.round(100/e*d)),g=Math.round(100/n*l),d=Math.round(100/(e*n)*(d*l)),m=e<=0&&n<=0?!1:100<u||100<c||100<h||100<a?!1:0<d;if(m=k.isElementHidden(t)?!1:m)for(var p=k.getParents(t),w=0,v=p.length-1;w<v;w++){var T=p[w];if(k.isElementHidden(T)){m=!1;break}var T=k.isOutOfBounds(t,T),E=t===document.fullscreenElement;if(T&&!E){m=!1;break}}return{top:i,left:o,bottom:r,right:s,percentFromTop:a,percentFromLeft:c,percentFromBottom:h,percentFromRight:u,percentInview:d,percentInviewHorizontal:g,percentInviewVertical:f,onscreen:m,uniqueMeasurementId:""+i+o+r+s+e+n+I.height+I.width+m,timestamp:(new Date).getTime()}}},getParents:function(e){for(var t,n=[];t=e.parentElement;)n.push(t),e=t;return n},isElementHidden:function(e){return"none"===e.style.display||"hidden"===e.style.visibility||"none"===(e=window.getComputedStyle(e,null)).display||"hidden"===e.visibility},isOutOfBounds:function(e,t){var n,i=$(t);return"visible"!==i.css("overflow")&&((n=$(e).offset()).bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,(e=i.offset()).bottom=e.top+t.clientHeight,e.right=e.left+t.clientWidth,Math.floor(n.bottom)<=Math.ceil(e.top)||Math.floor(n.right)<=Math.ceil(e.left)||Math.ceil(n.top)>=Math.floor(e.bottom)||Math.ceil(n.left)>=Math.floor(e.right))}};$(window).on({"touchmove scroll mousedown keydown":i.start,resize:I.resize}),$(k.featureDetect),I.resize()}();