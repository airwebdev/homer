(()=>{"use strict";var e=wp.i18n.__,t=wp.element.Fragment,a=wp.richText.registerFormatType,o=wp.blockEditor.BlockControls,n=wp.richText.toggleFormat,i=wp.components,l=i.ToolbarGroup,r=i.ToolbarDropdownMenu,c=homer.name+"/capitalize";window.homer.components.capitalize=!0,a(c,{title:e("Capitalize",homer.name),tagName:"span",className:"homer-capitalize",edit:function(a){var i=a.isActive,m=a.value,p=a.onChange;return React.createElement(t,null,i&&React.createElement(o,null,React.createElement(l,null,React.createElement(r,{icon:homer.icons.capitalize,label:e("Capitalize",homer.name),className:"typewriter-toolbar-btn active",controls:[{title:e("Capitalize: Remove",homer.name),icon:"trash",onClick:function(){p(n(m,{type:c}))}}]}))))}})})();