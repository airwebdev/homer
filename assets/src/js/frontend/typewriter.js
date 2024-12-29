import '../../scss/frontend/typewriter.scss';

import '../universal/GlobalStore';
import '../staticVendors/typer';
import '../staticVendors/effects';
import '../universal/BasicAnimations';
import TypeManager from '../universal/TypeManager';

const startAnimation = item => {
    let style, itemsList, settings, originalContent;

    const getValues = () => {
        style = item.dataset.style ? item.dataset.style : '1';
        itemsList = item.dataset.values ? JSON.parse(item.dataset.values) : [];
        settings = item.dataset.settings ? JSON.parse(item.dataset.settings) : [];
        originalContent = item.innerHTML;
        itemsList.unshift({ value: originalContent });
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
    styleItem.runAnimation(style);
};

const run = () => {
    const typeList = document.querySelectorAll('.homer-typewriter');
    typeList && typeList.forEach(startAnimation);
};

// start on dom loaded
document.addEventListener('DOMContentLoaded', run);

// restart when window/tab lose focus and get focus again
document.addEventListener('visibilitychange', run, false);
document.addEventListener('mozvisibilitychange', run, false);
document.addEventListener('webkitvisibilitychange', run, false);
document.addEventListener('msvisibilitychange', run, false);
