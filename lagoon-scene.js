(function () {
    'use strict';

    if (document.getElementById('lagoon-scene')) return;

    /*
     * Orientation contract:
     * - fishSvg faces RIGHT: tail at x=4, eye and nose near x=86.
     * - rightbound groups use it as-is.
     * - leftbound groups flip each fish with scaleX(-1).
     * This keeps every fish facing its actual travel direction.
     */
    var fishSvg = '<svg viewBox="0 0 100 52" aria-hidden="true"><path fill="currentColor" d="M29 26 5 7c-2-2-4 0-3 3l6 16-6 16c-1 3 1 5 3 3l24-19Z"/><path fill="currentColor" d="M22 26C28 8 47 3 67 7c15 3 25 12 27 19-2 8-12 17-27 20-20 4-39-2-45-20Z"/><circle cx="79" cy="20" r="2.6" fill="rgba(244,255,252,.9)"/><path d="M55 12c-6 4-9 9-9 14s3 10 9 15" fill="none" stroke="rgba(244,255,252,.28)" stroke-width="2" stroke-linecap="round"/></svg>';
    var turtleSvg = '<svg viewBox="0 0 150 90" aria-hidden="true"><ellipse cx="68" cy="45" rx="38" ry="25" fill="currentColor"/><circle cx="112" cy="43" r="12" fill="currentColor"/><circle cx="117" cy="40" r="2" fill="rgba(244,255,252,.75)"/><path fill="currentColor" d="M45 26C30 8 19 9 15 15c-3 7 8 18 27 24M48 64C32 79 24 80 20 74c-4-7 6-17 25-23M86 27c17-15 28-12 31-7 3 6-7 14-24 18M87 64c15 13 24 11 27 6 3-6-7-13-23-18"/><path d="M43 45c13-15 38-15 51 0-13 15-38 15-51 0Z" fill="none" stroke="rgba(244,255,252,.24)" stroke-width="3"/></svg>';
    var seabedSvg = '<svg viewBox="0 0 1400 130" preserveAspectRatio="none" aria-hidden="true"><path fill="rgba(255,210,125,.38)" d="M0 91c154-25 265 11 408 4 165-8 271-45 435-19 183 29 332-8 557 15v39H0Z"/><g fill="none" stroke-linecap="round"><g stroke="rgba(8,119,124,.52)" stroke-width="8"><path d="M76 116c5-31-11-52-4-83M73 77c-17-13-22-25-19-39M74 68c16-10 22-24 23-40M1300 120c-4-33 13-53 6-87M1306 80c18-13 23-28 21-43M1305 70c-17-11-24-25-24-39"/></g><g stroke="rgba(255,125,115,.62)" stroke-width="9"><path d="M190 119c-1-26 5-48 24-66M206 93c-13-8-19-18-20-30M206 92c16-10 24-23 26-38M1195 120c1-28-6-49-25-67M1178 94c14-9 20-20 21-33M1179 92c-17-9-25-22-27-37"/></g></g><g fill="rgba(255,255,255,.28)"><circle cx="335" cy="113" r="8"/><circle cx="1090" cy="119" r="6"/><circle cx="1018" cy="111" r="4"/></g></svg>';

    function fish() {
        return '<span class="fish">' + fishSvg + '</span>';
    }

    var scene = document.createElement('div');
    scene.id = 'lagoon-scene';
    scene.setAttribute('aria-hidden', 'true');
    scene.innerHTML =
        '<div class="lagoon-sun"></div>' +
        '<div class="lagoon-caustics"></div>' +
        '<div class="lagoon-wave lagoon-wave--one"></div>' +
        '<div class="lagoon-wave lagoon-wave--two"></div>' +
        '<div class="lagoon-school lagoon-school--right">' + fish() + fish() + fish() + '</div>' +
        '<div class="lagoon-school lagoon-school--left">' + fish() + fish() + fish() + '</div>' +
        '<div class="lagoon-turtle">' + turtleSvg + '</div>' +
        '<div class="lagoon-seabed">' + seabedSvg + '</div>';

    for (var i = 0; i < 18; i++) {
        var bubble = document.createElement('span');
        bubble.className = 'lagoon-bubble';
        bubble.style.setProperty('--bubble-size', (4 + (i * 9 % 15)) + 'px');
        bubble.style.setProperty('--bubble-x', ((i * 41 + 5) % 96) + '%');
        bubble.style.setProperty('--bubble-duration', (10 + (i * 4 % 13)) + 's');
        bubble.style.setProperty('--bubble-delay', (-1 * (i * 2.41 % 19)).toFixed(2) + 's');
        scene.appendChild(bubble);
    }

    document.body.insertBefore(scene, document.body.firstChild);

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', '#0796a8');
})();
