import TypeManager from '../../universal/TypeManager';

document.addEventListener('homer-content-ready', function () {
    const startAnimation = item => {
        let style, itemsList, settings, originalContent;

        const getValues = () => {
            style = item.dataset.style ? item.dataset.style : '1';
            itemsList = item.dataset.values ? JSON.parse(item.dataset.values) : [];
            settings = item.dataset.settings ? JSON.parse(item.dataset.settings) : [];
            originalContent = item.innerHTML;
            itemsList.unshift({ value: originalContent });
        };

        const stop = () => {
            animation.destroy && animation.destroy();
            styleItem = null;
            item.parentNode && item.parentNode.insertBefore(originalItem, item);
            item.remove();
            originalItem.focus() && originalItem.setSelectionRange(1, 1);
            !homer.vars.selected && homer.helpers.selectElement && homer.helpers.selectElement(originalItem);
            homer.vars.selected = true;
            const stopped = new Event('TypewriterStopped', { bubbles: true });
            originalItem && originalItem.dispatchEvent(stopped);
        };

        const restart = () => {
            getValues();
            animation.destroy && animation.destroy();
            const newInner = document.createElement('span');
            newInner.innerHTML = originalContent;
            newInner.className = 'homer-typewriter-inner';
            shadow.innerHTML = '';
            shadow.appendChild(newInner);
            shadow.appendChild(styleTag);
            styleItem.setData(newInner, styleTag, itemsList, settings, position);
            animation = styleItem.runAnimation(style);
        };

        const centered = item.closest('.has-text-align-center') || item.closest('.wp-block-button__link');
        const totheright = item.closest('.has-text-align-right');
        let position = 'left';
        if (centered) {
            position = 'center';
        } else if (totheright) {
            position = 'right';
        }

        getValues();
        const originalItem = item.cloneNode(true);
        const shadow = item.shadowRoot ? item.shadowRoot : item.attachShadow({ mode: 'open' });
        const styleTag = document.createElement('style');
        const inner = document.createElement('span');
        inner.innerHTML = originalContent;
        inner.className = 'homer-typewriter-inner';
        shadow.innerHTML = '';
        shadow.appendChild(inner);
        shadow.appendChild(styleTag);

        let styleItem = new TypeManager();
        styleItem.setData(inner, styleTag, itemsList, settings, position);
        let animation = styleItem.runAnimation(style);

        styleItem && animation && item.addEventListener('TypewriterRestart', restart);
        animation && item.addEventListener('TypewriterStop', stop);
    };

    // start animation event listner
    document.addEventListener('TypewriterStart', function (e) {
        startAnimation(e.target);
    });

    // start animation event listner
    document.addEventListener('click', function (e) {
        if (homer.vars.selected) homer.vars.selected = false;
    });
});
