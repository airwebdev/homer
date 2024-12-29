(function ($) {
    const animations = [
        function () {
            // 1 - Simple type
            const speed = 1600 - this.speed * 200;
            this.animeRun({
                in: {
                    duration: 1,
                    delay: speed,
                    opacity: 1,
                },
                out: {
                    duration: 1,
                    delay: speed,
                    opacity: 0,
                },
                speed: speed,
                widthEffect: true,
                hidden: true,
                center: false,
            });
            if (this.cursor) {
                const cursor = document.createElement('span');
                cursor.innerText = this.cursorType;
                cursor.style = 'display: inline-block; transform: scaleY(1.2); color:' + this.cursorColor;
                this.target.parentNode.appendChild(cursor);
                this.cursorBlink && homer.helpers.blinkCursor(cursor);
            }
            this.target.parentNode.style = 'display: flex;';
            return this.createReturn();
        },
        function () {
            // 2 - Type effect
            // this.styleTag.innerHTML = homer.typewriter.styles.timelineStyles;
            this.styleTag.innerHTML = '';
            this.target.innerHTML = '';
            let items = [...this.items];
            this.visibleStart && items.push(items.shift());
            $(this.target).typer({
                strings: items,
                typeSpeed: 225 - 25 * this.speed,
                backspaceSpeed: 225 - 25 * this.speed,
                backspaceDelay: this.delay,
                repeatDelay: 0,
                repeat: this.loop,
                visibleStart: this.visibleStart,
                autoStart: this.timeOption,
                startDelay: this.startDelay,
                useCursor: this.cursor,
                cursor: this.cursorType,
                cursorBlink: this.cursorBlink,
                cursorColor: this.cursorColor,
                timelineColor: this.timelineColor,
                clearOnHighlight: true,
                highlightSpeed: 20,
            });
            return true;
        },
        function () {
            // 3 - Up change
            const speed = 2200 - this.speed * 200;
            this.animeRun({
                perspective: 1000,
                origin: '50%',
                in: {
                    duration: speed,
                    delay: 100,
                    translateY: ['70%', '0%'],
                    easing: 'easeOutExpo',
                    opacity: 1,
                },
                out: {
                    duration: speed * 0.9,
                    delay: 0,
                    translateY: ['0%', '-30%'],
                    rotateX: [0, -90],
                    easing: 'easeOutExpo',
                    opacity: 0,
                },
                speed: 300,
                plusDelay: 0,
                minusDelay: 200,
            });
            return this.createReturn();
        },
        function () {
            // 4 - Bottom
            const speed = 2200 - this.speed * 200;
            this.animeRun({
                perspective: 100,
                origin: '50%',
                in: {
                    duration: speed,
                    delay: 100,
                    easing: 'easeOutExpo',
                    rotateX: [90, 0],
                    translateY: ['-40%', '0%'],
                    opacity: 1,
                },
                out: {
                    duration: speed * 0.9,
                    delay: 0,
                    easing: 'easeOutExpo',
                    rotateX: [0, -90],
                    opacity: 0,
                    translateY: '80%',
                },
                speed: 300,
                plusDelay: 0,
            });
            return this.createReturn();
        },
        function () {
            // 5
            const speed = 2000 - this.speed * 200;
            this.animeRun({
                in: {
                    duration: speed,
                    delay: function (el, index) {
                        return index * 50;
                    },
                    easing: 'easeOutElastic',
                    opacity: 1,
                    translateY: function (el, index) {
                        return index % 2 === 0 ? ['-80%', '0%'] : ['80%', '0%'];
                    },
                },
                out: {
                    duration: speed,
                    delay: function (el, index) {
                        return index * 50;
                    },
                    easing: 'easeOutExpo',
                    opacity: 0,
                    translateY: function (el, index) {
                        return index % 2 === 0 ? '80%' : '-80%';
                    },
                },
                speed: 300,
                plusDelay: 0,
                minusDelay: 200,
            });
            return this.createReturn();
        },
        function () {
            // 6
            const speed = 2000 - this.speed * 200;
            const animation = this.animeRun({
                perspective: 1000,
                origin: '50% 100%',
                in: {
                    duration: speed,
                    delay: function (el, index) {
                        return 200 + index * 20;
                    },
                    easing: 'easeOutExpo',
                    opacity: 1,
                    rotateY: [-90, 0],
                },
                out: {
                    duration: speed,
                    delay: function (el, index) {
                        return index * 20;
                    },
                    easing: 'easeOutExpo',
                    opacity: 0,
                    rotateY: 90,
                },
                speed: 300,
                plusDelay: 0,
            });
            return this.createReturn();
        },
        function () {
            // 7
            const speed = 2000 - this.speed * 200;
            const animation = this.animeRun({
                perspective: 1000,
                origin: '50% 100%',
                in: {
                    duration: speed,
                    delay: function (el, index) {
                        return 200 + index * 30;
                    },
                    easing: 'easeOutExpo',
                    opacity: 1,
                    rotateX: [90, 0],
                },
                out: {
                    duration: speed,
                    delay: function (el, index) {
                        return index * 30;
                    },
                    easing: 'easeOutExpo',
                    opacity: 0,
                    rotateX: -90,
                },
                speed: 250,
                plusDelay: 150,
                minusDelay: 350,
            });
            return this.createReturn();
        },
        function () {
            // 8
            const speed = 2000 - this.speed * 200;
            const animation = this.animeRun({
                perspective: 1000,
                in: {
                    duration: speed,
                    delay: function (el, index) {
                        return 100 + index * 50;
                    },
                    easing: 'easeOutExpo',
                    opacity: 1,
                    rotateX: [110, 0],
                },
                out: {
                    duration: speed,
                    delay: function (el, index) {
                        return index * 50;
                    },
                    easing: 'easeOutExpo',
                    opacity: 0,
                    rotateX: -110,
                },
                speed: 270,
                minusDelay: 400,
            });
            return this.createReturn();
        },
        function () {
            // 9
            const speed = 2000 - this.speed * 200;
            const animation = this.animeRun({
                in: {
                    duration: speed,
                    delay: function (el, index) {
                        return anime.random(0, 75);
                    },
                    easing: 'easeInOutExpo',
                    opacity: 1,
                    translateY: ['-300%', '0%'],
                    rotateZ: function (el, index) {
                        return [anime.random(-50, 50), 0];
                    },
                },
                out: {
                    duration: speed,
                    delay: function (el, index) {
                        return anime.random(0, 80);
                    },
                    easing: 'easeInOutExpo',
                    opacity: 0,
                    translateY: '300%',
                    rotateZ: function (el, index) {
                        return anime.random(-50, 50);
                    },
                },
                speed: 300,
                minusDelay: 400,
            });
            return this.createReturn();
        },
        function () {
            // 10
            const speed = 2200 - this.speed * 200;
            this.animeRun({
                perspective: 100,
                in: {
                    duration: speed,
                    delay: 100,
                    easing: 'easeOutQuad',
                    rotateX: [-90, 0],
                    translateY: ['100%', '0%'],
                    opacity: 1,
                },
                out: {
                    duration: speed * 0.7,
                    delay: 0,
                    easing: 'easeOutQuad',
                    rotateX: [0, 90],
                    opacity: 0,
                    translateY: '-50%',
                },
                speed: 300,
                plusDelay: 100,
                minusDelay: 400,
            });
            return this.createReturn();
        },
        function () {
            // 11
            const speed = 2200 - this.speed * 200;
            this.animeRun({
                perspective: 100,
                in: {
                    duration: speed,
                    opacity: [0, 1],
                    easing: 'easeInOutQuad',
                    delay: (el, i) => 150 * (i + 1),
                },
                out: {
                    duration: speed * 0.7,
                    opacity: 0,
                    easing: 'easeOutExpo',
                    delay: 0,
                },
                speed: 300,
                plusDelay: 100,
                minusDelay: 400,
            });
            return this.createReturn();
        },
        function () {
            // 12
            const speed = 2200 - this.speed * 200;
            this.animeRun({
                perspective: 100,
                in: {
                    scale: [4, 1],
                    opacity: [0, 1],
                    translateZ: 0,
                    easing: 'easeOutExpo',
                    delay: (el, i) => 70 * i,
                    duration: speed,
                },
                out: {
                    opacity: 0,
                    duration: 10,
                    easing: 'easeOutExpo',
                },
                speed: 300,
                plusDelay: 100,
                minusDelay: 400,
            });
            return this.createReturn();
        },
        function () {
            // 13
            const speed = 2200 - this.speed * 200;
            this.animeRun({
                perspective: 100,
                in: {
                    duration: speed,
                    opacity: [0, 1],
                    scale: [0.2, 1],
                    delay: 600,
                },
                out: {
                    duration: speed * 0.4,
                    opacity: 0,
                    scale: 2,
                    easing: 'easeInExpo',
                },
                speed: 300,
                plusDelay: 300,
                minusDelay: 600,
            });
            return this.createReturn();
        },
        function () {
            // 14
            const speed = 2200 - this.speed * 200;
            this.animeRun({
                perspective: 100,
                in: {
                    scale: [0.3, 1],
                    opacity: [0, 1],
                    translateZ: 0,
                    easing: 'easeOutExpo',
                    delay: (el, i) => 70 * (i + 1),
                    duration: speed,
                },
                out: {
                    duration: 50,
                    opacity: 0,
                    easing: 'easeOutExpo',
                    delay: 0,
                },
                speed: 300,
                plusDelay: 200,
                minusDelay: 300,
            });
            return this.createReturn();
        },
        function () {
            // 15
            const speed = 2200 - this.speed * 200;
            this.animeRun({
                perspective: 100,
                in: {
                    translateX: [-40, 0],
                    translateZ: 0,
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                    duration: speed,
                    delay: (el, i) => 500 + 30 * i,
                },
                out: {
                    translateX: [0, 30],
                    opacity: [1, 0],
                    easing: 'easeInExpo',
                    duration: speed * 0.2,
                    delay: (el, i) => 100 + 30 * i,
                },
                speed: 300,
                plusDelay: 200,
                minusDelay: 300,
                hidden: true,
            });
            return this.createReturn();
        },
        function () {
            // 16
            const speed = 2200 - this.speed * 200;
            this.animeRun({
                perspective: 100,
                in: {
                    scale: [0, 1],
                    elasticity: 600,
                    delay: (el, i) => 45 * (i + 1),
                    opacity: [0, 1],
                    duration: speed,
                },
                out: {
                    opacity: 0,
                    easing: 'easeOutExpo',
                    delay: 0,
                },
                speed: 300,
                plusDelay: 200,
                minusDelay: 300,
            });
            return this.createReturn();
        },
        function () {
            // 17
            const speed = 2200 - this.speed * 200;
            this.animeRun({
                perspective: 100,
                in: {
                    translateY: ['1.1em', 0],
                    translateX: ['0.55em', 0],
                    translateZ: 0,
                    rotateZ: [180, 0],
                    duration: speed,
                    opacity: 1,
                    easing: 'easeOutExpo',
                    delay: (el, i) => 50 * i,
                },
                out: {
                    opacity: 0,
                    duration: speed * 0.4,
                    easing: 'easeOutExpo',
                },
                speed: 300,
                plusDelay: 200,
                minusDelay: 300,
            });
            return this.createReturn();
        },
        function () {
            // 18
            const speed = 2200 - this.speed * 200;
            this.animeRun({
                perspective: 100,
                in: {
                    duration: speed,
                    translateY: [-100, 0],
                    easing: 'easeOutExpo',
                    opacity: 1,
                    delay: (el, i) => 30 * i,
                },
                out: {
                    opacity: 0,
                    duration: speed * 0.4,
                    easing: 'easeOutExpo',
                },
                speed: 300,
                plusDelay: 200,
                minusDelay: 300,
            });
            return this.createReturn();
        },
    ];
    const store = homer && homer.typewriter && homer.typewriter.animations;
    animations.forEach(function (animation) {
        store && store.push(animation);
    });
})(jQuery);
