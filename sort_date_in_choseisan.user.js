// ==UserScript==
// @name         日付順に自動ソート@調整さん
// @namespace    http://tampermonkey.net/
// @version      2024-02-08
// @description  try to take over the world!
// @author       KiO
// @match        https://chouseisan.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chouseisan.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function sortDates(inputString) {
        const datesArray = inputString.trim().split('\n').map(dateStr => {
            return {
                originalString: dateStr,
                dateObject: new Date(dateStr.replace('〜',''))
            };
        });


        datesArray.sort((a, b) => a.dateObject - b.dateObject);


        const sortedDateStrings = datesArray.map(entry => entry.originalString);

        return sortedDateStrings.join('\n');
    }


    window.fun = () => {
        const textarea = document.getElementById('kouho');
        const sorted = sortDates(textarea.value);
        textarea.value = '';
        textarea.value = sorted;
    }


    document.querySelectorAll('.day[disabled="false"]').forEach(el => {
        el.addEventListener('click', window.fun)
    })


    const observe = new MutationObserver((mutations) => {
        const els = document.querySelectorAll('.day[disabled="false"]')
        els.forEach(el => {
            el.removeEventListener('click', window.fun)
            el.addEventListener('click', window.fun)
        })
    })
    observe.observe(document.querySelector("#datepicker > div"), {
        childList: true,
    })
})();
