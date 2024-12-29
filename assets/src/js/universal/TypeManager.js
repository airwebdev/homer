const { animeStyles, widthStyles, noWidthStyles, timelineStyles } = homer.typewriter.styles;

class TypeManager {
    constructor() {
        this.library = homer.typewriter.animations;
    }

    setData(target, styleTag, items, settings, position) {
        this.target = target;
        this.fixedWidth = settings.fixedWidth ? settings.fixedWidth : false;
        this.spaceStart = settings.spaceStart ? settings.spaceStart : false;
        this.cursor = settings.cursor ? settings.cursor : false;
        this.cursorType = settings.cursorType ? settings.cursorType : '|';
        this.fullWidth = settings.fullWidth ? settings.fullWidth : false;
        this.visibleStart = settings.visibleStart ? settings.visibleStart : false;
        this.styleTag = styleTag;
        this.items = items;
        this.speed = settings.speed;
        this.cursorBlink = settings.cursorBlink;
        this.timeline = settings.action === 'time' && settings.timeline;
        this.timelineColor = settings.timelineColor ? settings.timelineColor : 'black';
        this.cursorColor = settings.cursorColor ? settings.cursorColor : 'inherit';
        this.startDelay = settings.startDelay * 1000;
        this.delay = settings.delay * 1000;
        this.loop = settings.action === 'hover' || settings.loop;
        this.position = position;
        this.timer = 0;
        this.hoverOption = settings.action === 'hover';
        this.timeOption = settings.action === 'time';
    }

    animateWidth(elem, current, final, plus, speed, plusDelay, minusDelay) {
        const delay = minusDelay && current < final ? plusDelay : minusDelay;
        setTimeout(() => {
            jQuery(elem).animate({ width: final + 'px' }, speed);
        }, delay);
    }

    animeSwitch(elems, height, effect, speed, index, plus, plusDelay = speed, minusDelay = speed * 0.5, widthEffect) {
        const self = this;
        const delay = self.delay + speed;
        const curAnim = self.animations[index];
        const nextIndex = index + 1 < self.animations.length ? index + 1 : 0;
        const next = nextIndex || index == -1;
        const curIndex = index > -1 ? index : self.animations.length - 1;
        const curElem = elems.length ? elems[curIndex] : '';
        const nextElem = elems.length ? elems[nextIndex] : '';
        const nextAnim = plus ? self.animations[nextIndex] : self.animations[0];
        const nextWidth = nextElem.offsetWidth;
        const curWidth = curElem.offsetWidth;
        self.target.style.height = height + 'px';

        if (self.loop || next) {
            curAnim && curAnim.hide(effect, function () {});
            nextAnim && nextAnim.show(effect);
            if (self.timeOption) {
                widthEffect && self.animateWidth(self.target, curWidth, 0, plus, speed, 0, 0);
                widthEffect &&
                    setTimeout(function () {
                        self.animateWidth(self.target, 0, nextWidth + 2, plus, speed, 0, 0);
                    }, speed + 10);
                !widthEffect &&
                    !self.fullWidth &&
                    !self.fixedWidth &&
                    self.animateWidth(self.target, curWidth, nextWidth + 2, plus, speed, plusDelay, minusDelay);
                self.timer = setTimeout(function () {
                    self.animeSwitch(elems, height, effect, speed, nextIndex, plus, plusDelay, minusDelay, widthEffect);
                }, delay);
            }
        } else {
            self.target.style.setProperty('--timelineColor', 'transparent');
        }
    }

    createReturn() {
        return {
            destroy: () => {
                clearTimeout(this.timer);
            },
        };
    }

    animeRun(effect) {
        const { speed, plusDelay, minusDelay, widthEffect, hidden, center = true, manager } = effect;
        const self = this;
        self.animations = [];
        let styles = animeStyles;
        styles += hidden ? widthStyles : noWidthStyles;
        styles += self.timeline ? timelineStyles : '';
        self.styleTag.innerHTML = styles;
        self.target.innerHTML = 'P';
        const height = self.target.clientHeight;
        self.target.innerHTML = '';
        self.items.forEach(function (item, index) {
            const span = document.createElement('span');
            span.className = 'homer-typewriter-phrase';
            span.style.position = index == 0 ? 'static' : 'absolute';
            if (self.position == 'center' && center) {
                span.style.left = '50%';
                span.style.transform = 'translateX(-50%)';
            }
            span.innerHTML = item.value;
            // item.style &&
            //     Object.keys(item.style).length &&
            //     Object.keys(item.style).forEach(key => {
            //         span.style[key] = item.style[key];
            //     });
            if (item.color) span.style['color'] = item.color;
            self.target.appendChild(span);
            // if (self.fixedWidth) {
            //     self.maxWidth = self.maxWidth ? self.maxWidth : 0;
            //     self.maxWidth = self.maxWidth < span.offsetWidth ? span.offsetWidth : self.maxWidth;
            // }
            const final = manager && manager == 'opacity' ? new advancedAnimation(span) : new advancedAnimation(span);
            self.animations.push(final);
        });
        const elems = this.target.querySelectorAll('.homer-typewriter-phrase');
        (self.hoverOption || (self.visibleStart && elems.length)) && elems[0].classList.add('active');
        if (self.hoverOption || self.visibleStart) self.target.style.width = elems[0].offsetWidth + 5 + 'px';
        elems[0].style.position = 'absolute';
        self.target.style.height = height + 'px';
        self.target.style.setProperty('--time', self.startDelay + 'ms');
        self.target.style.setProperty('--timelineColor', self.timelineColor);
        // if (self.fixedWidth && self.maxWidth) {
        //     self.target.style.width = self.maxWidth + 'px';
        // }
        if (self.spaceStart) {
            self.target.style.width = elems[0].offsetWidth + 5 + 'px';
        }
        if (self.fullWidth) self.target.style.width = '100%';
        const position = self.hoverOption || self.visibleStart ? 0 : -1;
        if (self.timeOption) {
            self.timer = setTimeout(function () {
                self.animations &&
                    self.animations.length &&
                    self.animeSwitch(elems, height, effect, speed, position, true, plusDelay, minusDelay, widthEffect);

                if (self.timeline) {
                    self.target.style.setProperty('--time', self.delay + speed + 'ms');
                    self.target.className += self.timeline ? ' with-timeline' : '';
                }
            }, self.startDelay);
        } else if (self.hoverOption) {
            self.target.addEventListener('mouseover', () => {
                clearTimeout(self.timer);
                self.timer = setTimeout(function () {
                    self.animations &&
                        self.animations.length &&
                        self.animeSwitch(
                            elems,
                            height,
                            effect,
                            speed,
                            position,
                            true,
                            plusDelay,
                            minusDelay,
                            widthEffect,
                        );
                }, 0);
            });
            self.target.addEventListener('mouseout', () => {
                clearTimeout(self.timer);
                self.timer = setTimeout(function () {
                    self.animations &&
                        self.animations.length &&
                        self.animeSwitch(
                            elems,
                            height,
                            effect,
                            speed,
                            position + 1,
                            false,
                            plusDelay,
                            minusDelay,
                            widthEffect,
                        );
                }, 0);
            });
        }
    }

    runAnimation(animation) {
        const run = this.library[animation - 1] && this.library[animation - 1].bind(this);
        return run && run();
    }

    opacityAnimation(el) {
        this.el = el;
    }
}

export default TypeManager;
