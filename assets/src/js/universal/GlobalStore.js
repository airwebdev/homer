(function () {
    window.homer = window.homer ? window.homer : {};
    homer.typewriter = homer.store ? homer.store : {};
    homer.helpers = homer.helpers ? homer.helpers : {};
    homer.typewriter.animations = homer.typewriter.animations ? homer.typewriter.animations : [];
    homer.typewriter.styles = {
        animeStyles:
            '.homer-typewriter-inner{vertical-align:bottom;display:inline-block;position:relative}.homer-typewriter-phrase{pointer-events:none;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex:none;flex:none;left:0;position:absolute}.homer-typewriter-phrase>span{opacity:0;display:block;-ms-flex:none;flex:none}.homer-typewriter-phrase.active>span{opacity:1}',
        widthStyles: '.homer-typewriter-inner{overflow:hidden!important;}body{display:flex;}',
        noWidthStyles: '.homer-typewriter-inner{overflow:visible!important;}',
        timelineStyles:
            '.homer-typewriter-inner{position:relative;--time:3s;}.homer-typewriter-inner::after{content:"";position:absolute;height:2px;bottom:0;left:0;width:0;background-color:var(--timelineColor);animation: var(--time) timeline1 0s infinite;} .homer-typewriter-inner.with-timeline::after{animation: var(--time) timeline2 0s infinite;} @-webkit-keyframes timeline1{from{width:0%;}to{width:100%;}} @-moz-keyframes timeline1{from{width:0%;}to{width:100%;}} @-o-keyframes timeline1{from{width:0%;}to{width:100%;}} @keyframes timeline1{from{width:0%;}to{width:100%;}} @-webkit-keyframes timeline2{from{width:0%;}to{width:100%;}} @-moz-keyframes timeline2{from{width:0%;}to{width:100%;}} @-o-keyframes timeline2{from{width:0%;}to{width:100%;}} @keyframes timeline2{from{width:0%;}to{width:100%;}}',
    };

    homer.helpers.blinkCursor = cursorElement => {
        jQuery &&
            setInterval(function () {
                jQuery(cursorElement).fadeOut(400).fadeIn(400);
            }, 900);
    };
})();
