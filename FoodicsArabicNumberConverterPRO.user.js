// ==UserScript==
// @name         Foodics Arabic Number Converter PRO
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  تحويل الأرقام العربية إلى إنجليزية مع تحديث فوري للبحث في فوديكس
// @author       Omar Saber
// @match        https://console.foodics.com/*
// @grant        none
// @updateURL https://raw.githubusercontent.com/OmarSaber652/Violent-Mankey-Script/master/Foodics%20Arabic%20Number%20Converter%20PRO.user.js
// @downloadURL https://raw.githubusercontent.com/OmarSaber652/Violent-Mankey-Script/master/Foodics%20Arabic%20Number%20Converter%20PRO.user.js
// ==/UserScript==

(function () {
    'use strict';

    function convertToEnglishNumbers(str) {
        const arabicNums = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        const persianNums = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

        return str
            .replace(/[٠-٩]/g, d => arabicNums.indexOf(d))
            .replace(/[۰-۹]/g, d => persianNums.indexOf(d));
    }

    function triggerReactInput(input, value) {
        const nativeSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value"
        ).set;

        nativeSetter.call(input, value);

        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: 'Enter' }));
        input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));
    }

    document.addEventListener('input', function (e) {
        const input = e.target;

        if (input.tagName === 'INPUT') {
            const original = input.value;
            const converted = convertToEnglishNumbers(original);

            if (original !== converted) {
                triggerReactInput(input, converted);
            }
        }
    });

    document.addEventListener('paste', function (e) {
        const input = e.target;

        if (input.tagName === 'INPUT') {
            setTimeout(() => {
                const original = input.value;
                const converted = convertToEnglishNumbers(original);

                if (original !== converted) {
                    triggerReactInput(input, converted);
                }
            }, 50);
        }
    });

})();