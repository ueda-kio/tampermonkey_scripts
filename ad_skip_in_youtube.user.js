// ==UserScript==
// @name         広告スキップ
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       k-ueda
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

'use strict';
(() => {
    const skipAd = () => {
        const isAd = document.querySelector('.video-ads')?.hasChildNodes() ?? false;
        const videoElm = document.querySelector('video');
        const skipButtons = document.querySelectorAll('.ytp-ad-skip-button-container');
        const isReturn = !isAd || !videoElm;
        if (isReturn) return;
        skipButtons.length ? skipButtons.forEach(elm => elm.click()) : (videoElm.currentTime = 100);

        // バナーも削除
        document.querySelectorAll('.ytd-ad-slot-renderer').forEach(el => el.remove());
    }
    skipAd();
    const observer = new MutationObserver(skipAd);
    observer.observe(document.body, {
        subtree: true,
        childList: true,
        attributes: true
    });
})();
