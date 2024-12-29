(function ($) {
    'use strict';

    $.fn.typer = function (options) {
        // merge options
        const settings = $.extend(
            {
                typeSpeed: 60,
                backspaceSpeed: 20,
                backspaceDelay: 800,
                repeatDelay: 1000,
                repeat: true,
                autoStart: true,
                startDelay: 100,
                useCursor: true,
                cursor: '|',
                strings: ['Animated text'],
            },
            options,
        );

        // global constiables
        let chars,
            charsLength,
            charIndex = 0,
            stringIndex = 0,
            typerIndex = 0;

        function type(typedElement, strings) {
            if (stringIndex < strings.length) {
                chars = strings[stringIndex].value.split('');
                charsLength = chars.length;

                setTimeout(function () {
                    if (strings[stringIndex].color) {
                        typedElement[0].style.color = strings[stringIndex].color;
                    } else {
                        typedElement[0].style.color = 'inherit';
                    }
                    typedElement.append(chars[charIndex]);
                    charIndex++;
                    if (charIndex < charsLength) {
                        type(typedElement, strings);
                    } else {
                        charIndex = 0;
                        stringIndex++;

                        // type next string and backspace what is typed
                        setTimeout(function () {
                            if (stringIndex == strings.length - 1 || settings.repeat) {
                                backspace(typedElement, function () {
                                    type(typedElement, strings);
                                });
                            }
                        }, settings.backspaceDelay);
                    }
                }, settings.typeSpeed);
            } else {
                // all strings are typed
                // repeat
                if (settings.repeat) {
                    repeat(typedElement, strings);
                }
            }
        }

        // repeat typing
        function repeat(typedElement, strings) {
            stringIndex = 0;
            setTimeout(function () {
                type(typedElement, strings);
            }, settings.repeatDelay);
        }

        // backspace what is typed
        function backspace(typedElement, callback) {
            setTimeout(function () {
                typedElement.text(typedElement.text().slice(0, -1));
                if (0 < typedElement.text().length) {
                    backspace(typedElement, callback);
                } else {
                    if ('function' === typeof callback) {
                        callback();
                    }
                }
            }, settings.backspaceSpeed);
        }

        return this.each(function () {
            let t = $(this),
                typedElement,
                cursorElement;

            function init() {
                // add typed element
                const content = settings.visibleStart ? settings.strings[settings.strings.length - 1].value : '';
                t.append('<span class="typed">' + content + '</span>');

                if (settings.useCursor) {
                    // add cursor element
                    t.append(
                        '<span class="typed_cursor" style="color:' +
                            settings.cursorColor +
                            '">' +
                            settings.cursor +
                            '</span>',
                    );

                    // blink cursor
                    cursorElement = t.children('.typed_cursor');
                    settings.cursorBlink && homer.helpers.blinkCursor(cursorElement);
                }

                // type all strings.value
                typedElement = t.children('.typed');
                // typedElement.parent()[0].style.setProperty('--time', settings.startDelay + 'ms');
                // typedElement.parent()[0].style.setProperty('--timelineColor', settings.timelineColor);
            }

            init();
            setTimeout(function () {
                if (settings.visibleStart) {
                    backspace(typedElement, function () {
                        type(typedElement, settings.strings);
                    });
                } else {
                    type(typedElement, settings.strings);
                }
                // typedElement.parent()[0].style.setProperty('--time', settings.backspaceDelay + 'ms');
            }, settings.startDelay);
        });
    };
})(jQuery);
