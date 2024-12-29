import charming from './charming.js';
import anime from 'animejs/lib/anime.es.js';

(function (window) {
    'use strict';

    window.anime = anime;

    /**
     * Equation of a line.
     */
    window.lineEq = function (y2, y1, x2, x1, currentVal) {
        // y = mx + b
        let m = (y2 - y1) / (x2 - x1),
            b = y1 - m * x1;

        return m * currentVal + b;
    };

    function advancedAnimation(el) {
        this.el = el;
        this._init();
    }

    advancedAnimation.prototype._init = function () {
        this.el.classList.add('letter-effect');
        charming(this.el, { classPrefix: 'letter' });
        this.letters = [].slice.call(this.el.querySelectorAll('span'));
        this.lettersTotal = this.letters.length;
    };

    advancedAnimation.prototype._stop = function () {
        anime.remove(this.letters);
        this.letters.forEach(function (letter) {
            letter.style.WebkitTransform = letter.style.transform = '';
        });
    };

    advancedAnimation.prototype.show = function (effect, callback) {
        this._stop();
        arguments.length
            ? this._animate('in', effect, callback)
            : this.letters.forEach(function (letter) {
                  letter.style.opacity = 1;
              });
    };

    advancedAnimation.prototype.hide = function (effect, callback) {
        this._stop();
        arguments.length
            ? this._animate('out', effect, callback)
            : this.letters.forEach(function (letter) {
                  letter.style.opacity = 0;
              });
    };

    advancedAnimation.prototype._animate = function (direction, effecSettings, callback) {
        if (effecSettings.perspective != undefined) {
            this.el.style.WebkitPerspective = this.el.style.perspective = effecSettings.perspective + 'px';
        }
        if (effecSettings.origin != undefined) {
            this.letters.forEach(function (letter) {
                letter.style.WebkitTransformOrigin = letter.style.transformOrigin = effecSettings.origin;
            });
        }

        let animOpts = effecSettings[direction],
            target = effecSettings[direction]['parent'] ? this.el : this.letters;

        !effecSettings[direction]['parent'] &&
            target.forEach(function (t, p) {
                if (t.innerHTML === ' ') {
                    target.splice(p, 1);
                }
            });

        animOpts.targets = target;

        anime(animOpts);
    };

    window.advancedAnimation = advancedAnimation;
})(window);
