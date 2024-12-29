const startAll = () => {
    const typewriter = document.querySelectorAll('.homer-typewriter');
    if (document.visibilityState === 'visible') {
        typewriter && typewriter.forEach(homer.helpers.restartAnimationEvent);
    }
};

(() => {
    // restart when window/tab loose focus and get focus again
    document.addEventListener('visibilitychange', startAll, false);
    document.addEventListener('mozvisibilitychange', startAll, false);
    document.addEventListener('msvisibilitychange', startAll, false);
})();

(() => {
    // wp blocks content ready listener
    function start() {
        const ready = new Event('homer-content-ready');
        document.dispatchEvent(ready);
        const typewriter = document.querySelectorAll('.homer-typewriter');
        typewriter && typewriter.forEach(homer.helpers.startStopAnimationEvent);
        return true;
    }

    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    const observer = new MutationObserver(function (mutations, observer) {
        const container = document.querySelector('.block-editor-block-list__layout');
        container && start() && observer.disconnect();
    });

    observer.observe(document.body, {
        subtree: false,
        attributes: true,
    });
})();
