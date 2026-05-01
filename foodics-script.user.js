// ==UserScript==
// @name         Vodafone Cash + Advanced Last Items Manager for Foodics
// @namespace    http://tampermonkey.net/
// @version      3.9
// @description  تأكيد فودافون كاش + إدارة احترافية لـ Last Items بقوائم جاهزة وإضافة وحذف متقدم
// @author       Omar Saber
// @match        https://console.foodics.com/*
// @grant        none
// @updateURL https://raw.githubusercontent.com/OmarSaber652/Vodafone-Cash-Advanced-Last-Items-Manager-for-Foodics/main/foodics-script.user.js
// @downloadURL https://raw.githubusercontent.com/OmarSaber652/Vodafone-Cash-Advanced-Last-Items-Manager-for-Foodics/main/foodics-script.user.js
// ==/UserScript==

(function () {
    'use strict';


    //////////////////////////// قوائم جاهزة ////////////////////////////
    const predefinedLastItems = {
        "فته لحمه": [
            "فتة لحم وسط",
            "فتة لحم كبير",
            "فتة ميكس",
            "لحم سايب",
        ],

        "فته فراخ": [
            "فتة فراخ",
            "فتة ميكس",
            "السنجل",
            "الشيخ",
            "فتة شاورما دجاج",
            "دجاج سايب"

        ],

        "فراخ مكنه": [
            "فروج",
            "دبل ورك",
            "اوشا",
            "دوبل تشيكن",
            "الماجيك",
            "العز",
            "السنجل",
            "الملوكي"
        ],

        "رز": [
            "ارز",
            "ريزو",
            "فتة",
            "صدر",
            "ورك",
            "مع الارز",
            "دبل ورك",
            "اوشا",
            "ماجيك",
            "دبل تشيكن",
            "صينية",
            "وجبة كرسبي",
            "وجبة زنجر",
            "وجبة فاهيتا",
            "وجبة اسكالوب",
            "وجبة شيش",
            "السنجل",
            "الملوكي",
        ],
        "ماريا": [
            "ماريا",
            "دوبل تشيكن",
            "صينية العز"
        ],

        "فرنساوى": [
            "فرنساوى"
        ],

        "كيزر": [
            "كيزر"
        ],

        "شاورما فراخ": [
            "فتة فراخ",
            "فتة ميكس",
            "فتة شاورما دجاج",
            "دجاج سايب",
            "شاورما دجاج",
            "شاورما ميكس",
            "عربى دجاج",
            "عربى ميكس",
            "ماريا دجاج",
            "ماريا ميكس",
            "قطعة ميكس",
            "قطعة دجاج", 
            "تريبل تيست",
            "بيتزا شاورما دجاج",
            "بيتزا شاورما فراخ",
            "بيتزا فورسيزون",
            "بيتزا ميكس فراخ",
            "كريب شاورما دجاج",
            "كريب سوبريم دجاج",
            "كريب ميكس فراخ",
            "الموف اون",
            "دوبل تشيكن",
            "العز",
            "السنجل",
            "الشيخ",
            "عكرش",
            "4 شاورما دجاج وسط + واحد هدية",
            "6 ساندوتش شاورما دجاج وسط + 2 هدية",
            "الفورسيزون"
        ],

        "شاورما لحمه": [
            "شاورما لحم",
            "شاورما ميكس",
            "عربى لحم",
            "عربى ميكس",
            "ماريا لحم",
            "ماريا ميكس",
            "فتة لحم",
            "فتة ميكس",
            "لحم سايب",
            "تريبل تيست",
            "قطعة لحم",
            "قطعة ميكس",
            "بيتزا شاورما لحم",
            "بيتزا ميكس لحوم",
            "بيتزا فورسيزون",
            "كريب شاورما لحم",
            "كريب ميكس لحوم",
            "الموف اون",
            "اوشا",
            "العز",
            "الفورسيزون"

        ],

        "فاهيتا فراخ": [
            "فاهيتا",
            "مكسيكانو"
        ],

        "شيش": [
            "شيش",
            "الماجيك",
            "صينية الصحاب",
            "صينية الشيخ",
            "بيتزا مكس دجاج",
            "بيتزا ميكس دجاج",
            "بيتزا سوبريم دجاج",
            "كريب سوبريم دجاج",
            "كريب ميكس دجاج",
            "كريب ايلاند",
            "كريب تشكين باربكيو",
            "كريب اطياب الشام"
        ],

        "كرسبي+زنجر+اسكالوب": [
            "كرسبى",
            "زنجر",
            "اسكالوب",
            "سكالوب",
            "بوكس تريبل تيست",
            "فتة ريزو",
            "سوبر كرانشي",
            "كريب ايلاند",
            "كريب اطياب الشام",
            "اوشا",
            "الموف اون",
            "الماجيك",
            "صينية الصحاب",
            "صينية الشيخ",
            "الصينية الملوكي",
            "بيتزا تشيكن رانش",
            "بيتزا تشيكن",
            "بيتزا تشكن",
            "الفورسيزون"
        ]

    };

    //////////////////////////// زر تأكيد الطلب ////////////////////////////
    function createVodafoneCashButton() {
        const originalSubmit = document.getElementById('order.submit');
        if (!originalSubmit || document.getElementById('vodafoneCashConfirmBtn')) return;

        originalSubmit.style.display = 'none';

        const confirmBtn = document.createElement('button');
        confirmBtn.id = 'vodafoneCashConfirmBtn';
        confirmBtn.textContent = 'تأكيد الطلب';
        confirmBtn.className = 'custom-button';

        originalSubmit.parentNode.insertBefore(confirmBtn, originalSubmit);

        confirmBtn.addEventListener('click', async () => {
            const hasLastItem = await checkLastItemsInOrder();

            if (hasLastItem) {
                openLastItemConfirmation(async (continueOrder) => {
                    if (!continueOrder) return;
                    proceedWithVodafoneCheck(originalSubmit);
                });

                return;
            }

            proceedWithVodafoneCheck(originalSubmit);
        });
    }

    //////////////////////////// متابعة التأكيد ////////////////////////////
    function proceedWithVodafoneCheck(originalSubmit) {
        openVodafoneCashPopup(async (confirmed) => {
            const noteField = document.getElementById('form_field_ملاحظات_الفاتورة');

            if (!noteField) {
                createWarningPopup('⚠️ لم يتم العثور على حقل الملاحظات!');
                return;
            }

            if (confirmed) {
                const text = "تم الدفع فودافون كاش";

                if (!noteField.value.includes(text)) {
                    await setNote(noteField, text);
                }
            }

            originalSubmit.disabled = false;
            originalSubmit.click();
        });
    }

    //////////////////////////// زر إدارة Last Items ////////////////////////////
    function createLastItemsButton() {
        const vodafoneBtn = document.getElementById('vodafoneCashConfirmBtn');
        if (!vodafoneBtn || document.getElementById('lastItemsBtn')) return;

        const lastBtn = document.createElement('button');
        lastBtn.id = 'lastItemsBtn';
        lastBtn.textContent = 'إدارة Last Items';
        lastBtn.className = 'custom-button';

        vodafoneBtn.insertAdjacentElement('afterend', lastBtn);

        lastBtn.addEventListener('click', openLastItemsManager);
    }

    //////////////////////////// التصميم ////////////////////////////
    const style = document.createElement('style');

    style.innerHTML = `
    .custom-button {
        background-color: #0066ff;
        color: white;
        font-size: 16px;
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        cursor: pointer;
        margin-top: 12px;
        font-weight: 600;
        transition: background-color 0.3s, transform 0.2s;
    }

    .custom-button:hover {
        background-color: #0052cc;
        transform: translateY(-2px);
    }

    .custom-button:active {
        background-color: #0041a8;
        transform: translateY(0);
    }
`;

    document.head.appendChild(style);

    //////////////////////////// قراءة الطلب ////////////////////////////
    async function getOrderItems() {
        const itemsElements = document.querySelectorAll(
            '.py-4 .cursor-pointer .flex.justify-between .truncate .truncate label .font-semibold'
        );

        return Array.from(itemsElements).map(el => el.textContent.trim());
    }

    async function checkLastItemsInOrder() {
        const orderItems = await getOrderItems();

        const additionItemsElements = document.querySelectorAll('.truncate.me-2');

        const additionItems = Array.from(additionItemsElements)
            .map(el => el.textContent.trim())
            .filter(Boolean);

        const lastItems = JSON.parse(localStorage.getItem('lastItems') || '[]');

        const allItems = [...orderItems, ...additionItems];

        return allItems.some(orderItem =>
            lastItems.some(lastItem =>
                orderItem.includes(lastItem) ||
                lastItem.includes(orderItem)
            )
        );
    }

    //////////////////////////// قالب النوافذ ////////////////////////////
    function popupTemplate(title, content, width = '450px') {
        return `
    <style>
        #popupOverlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999999;
        }

        #popupBox {
            background: white;
            padding: 30px;
            border-radius: 20px;
            width: ${width};
            text-align: center;
            position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        #popupTitle {
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #333;
        }

        #popupClose {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #ff4d4d;
            border: none;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
        }

        button {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            font-size: 16px;
            margin: 5px;
        }

        select, textarea {
            font-size: 16px;
        }
    </style>

    <div id="popupOverlay">
        <div id="popupBox">
            <button id="popupClose">×</button>
            <div id="popupTitle">${title}</div>
            ${content}
        </div>
    </div>`;
    }

    //////////////////////////// فودافون كاش ////////////////////////////
    function openVodafoneCashPopup(onDecision) {
        const div = document.createElement('div');

        div.innerHTML = popupTemplate('تأكيد فودافون كاش', `
        <div style="display:flex; justify-content:center; gap:40px;">
            <button id="cancelPayment" style="background:#e74c3c; color:white;">لا</button>
            <button id="confirmPayment" style="background:#2ecc71; color:white;">نعم</button>
        </div>
    `, '400px');

        document.body.appendChild(div);

        div.querySelector('#popupClose').onclick = () => div.remove();

        div.querySelector('#cancelPayment').onclick = () => {
            div.remove();
            onDecision(false);
        };

        div.querySelector('#confirmPayment').onclick = () => {
            div.remove();
            onDecision(true);
        };
    }

    //////////////////////////// تنبيه Last Item ////////////////////////////
    function openLastItemConfirmation(onDecision) {
        const div = document.createElement('div');

        div.innerHTML = popupTemplate('⚠️ تنبيه Last Items', `
        <div style="font-size:18px; margin-bottom:20px;">
            هل أنت متأكد؟ الأصناف تحتوي على منتج Last Item
        </div>

        <div style="display:flex; justify-content:center; gap:30px;">
            <button id="cancelLastItem" style="background:#e74c3c; color:white;">لا</button>
            <button id="confirmLastItem" style="background:#2ecc71; color:white;">نعم</button>
        </div>
    `);

        document.body.appendChild(div);

        div.querySelector('#popupClose').onclick = () => div.remove();

        div.querySelector('#cancelLastItem').onclick = () => {
            div.remove();
            onDecision(false);
        };

        div.querySelector('#confirmLastItem').onclick = () => {
            div.remove();
            onDecision(true);
        };
    }

    //////////////////////////// إدارة Last Items ////////////////////////////
    function openLastItemsManager() {
        const div = document.createElement('div');

        div.innerHTML = popupTemplate('إدارة Last Items', `
        <button id="addLastItem" style="background:#3498db; color:white;">➕ إضافة</button>
        <button id="deleteLastItem" style="background:#f39c12; color:white;">🗑️ حذف</button>
        <button id="deleteAllLastItems" style="background:#e74c3c; color:white;">🔥 حذف الكل</button>
    `);

        document.body.appendChild(div);

        div.querySelector('#popupClose').onclick = () => div.remove();

        div.querySelector('#addLastItem').onclick = () => {
            div.remove();
            addLastItems();
        };

        div.querySelector('#deleteLastItem').onclick = () => {
            div.remove();
            deleteLastItems();
        };

        div.querySelector('#deleteAllLastItems').onclick = () => {
            localStorage.removeItem('lastItems');
            div.remove();
            createWarningPopup('✅ تم حذف جميع العناصر.');
        };
    }

    //////////////////////////// إضافة ////////////////////////////
    // ==================== استبدل بداية addLastItems بالكامل ====================

    function addLastItems() {
        let current = JSON.parse(localStorage.getItem('lastItems') || '[]');


        // إظهار فقط القوائم غير المضافة بالكامل
        const availablePresetLists = Object.keys(predefinedLastItems).filter(preset => {
            const presetItems = predefinedLastItems[preset];
            return !presetItems.every(item => current.includes(item));
        });

        const presetOptions = availablePresetLists
            .map(item => `<option value="${item}">${item}</option>`)
            .join('');

        const div = document.createElement('div');

        div.innerHTML = popupTemplate('➕ إضافة عناصر Last Items', `
    <div style="width:100%; text-align:center;">

        ${availablePresetLists.length > 0 ? `
            <label style="font-weight:bold;">اختر قائمة جاهزة:</label><br><br>

            <select id="presetLastItems" style="width:90%; padding:10px; border-radius:8px;">
                <option value="">-- اختر صنف --</option>
                ${presetOptions}
            </select>

            <br><br>
            ` : `
            <div style="color:#27ae60; font-weight:bold; margin-bottom:15px;">
                ✅ جميع القوائم الجاهزة تمت إضافتها بالفعل
            </div>
            `
            }

        <label style="font-weight:bold;">أو إضافة مخصصة:</label><br><br>

        <textarea
            id="customLastItemsInput"
            placeholder="اكتب العناصر مفصولة بـ ,"
            style="width:90%; height:100px; padding:10px; border-radius:8px;"
        ></textarea>

        <br><br>

        <button id="saveItems" style="background:#3498db; color:white;">
            💾 حفظ
        </button>
    </div>
`);

        document.body.appendChild(div);

        div.querySelector('#popupClose').onclick = () => div.remove();

        div.querySelector('#saveItems').onclick = () => {
            let current = JSON.parse(localStorage.getItem('lastItems') || '[]');

            const presetDropdown = document.getElementById('presetLastItems');
            const selectedPreset = presetDropdown ? presetDropdown.value : '';

            if (selectedPreset && predefinedLastItems[selectedPreset]) {
                current = [...current, ...predefinedLastItems[selectedPreset]];
            }

            const customInput = document.getElementById('customLastItemsInput').value;

            if (customInput.trim()) {
                const customItems = customInput
                    .split(',')
                    .map(item => item.trim())
                    .filter(item => item);

                current = [...current, ...customItems];
            }

            current = [...new Set(current)];

            localStorage.setItem('lastItems', JSON.stringify(current));

            div.remove();

            createWarningPopup('✅ تم حفظ العناصر بنجاح.');
        };

    }


    //////////////////////////// حذف ////////////////////////////
    function deleteLastItems() {
        const lastItems = JSON.parse(localStorage.getItem('lastItems') || '[]');

        if (lastItems.length === 0) {
            createWarningPopup('⚠️ لا يوجد عناصر!');
            return;
        }

        const availablePresetLists = Object.keys(predefinedLastItems).filter(preset => {
            const presetItems = predefinedLastItems[preset];
            return presetItems.every(item => lastItems.includes(item));
        });

        const presetOptions = availablePresetLists
            .map(item => `<option value="${item}">${item}</option>`)
            .join('');

        const div = document.createElement('div');

        div.innerHTML = popupTemplate('🗑️ حذف عناصر Last Items', `
        <div style="width:100%; text-align:center;">

            ${availablePresetLists.length > 0 ? `
                <label style="font-weight:bold;">حذف قائمة جاهزة بالكامل:</label><br><br>

                <select id="deletePresetList" style="width:90%; padding:10px; border-radius:8px;">
                    <option value="">-- اختر قائمة --</option>
                    ${presetOptions}
                </select>

                <br><br>

                <button id="deletePresetBtn" style="background:#e67e22; color:white;">
                    🗂️ حذف القائمة كاملة
                </button>

                <hr style="margin:25px 0;">
                ` : ''
            }

            <label style="font-weight:bold;">أو حذف عنصر فردي:</label><br><br>

            <select id="lastItemsDropdown" style="width:90%; padding:10px; border-radius:8px;">
                ${lastItems.map((item, index) =>
                `<option value="${index}">${item}</option>`
            ).join('')}
            </select>

            <br><br>

            <button id="deleteSelectedItem" style="background:red; color:white;">
                🗑️ حذف المحدد
            </button>

        </div>
    `);

        document.body.appendChild(div);

        div.querySelector('#popupClose').onclick = () => div.remove();

        const deletePresetBtn = div.querySelector('#deletePresetBtn');

        if (deletePresetBtn) {
            deletePresetBtn.onclick = () => {
                const selectedPreset = document.getElementById('deletePresetList').value;

                if (!selectedPreset || !predefinedLastItems[selectedPreset]) {
                    createWarningPopup('⚠️ اختر قائمة أولاً.');
                    return;
                }

                let current = JSON.parse(localStorage.getItem('lastItems') || '[]');

                current = current.filter(item =>
                    !predefinedLastItems[selectedPreset].includes(item)
                );

                localStorage.setItem('lastItems', JSON.stringify(current));

                div.remove();

                createWarningPopup(`✅ تم حذف قائمة ${selectedPreset} بالكامل.`);
            };
        }

        div.querySelector('#deleteSelectedItem').onclick = () => {
            const selectedIndex = parseInt(
                document.getElementById('lastItemsDropdown').value
            );

            let current = JSON.parse(localStorage.getItem('lastItems') || '[]');

            current.splice(selectedIndex, 1);

            localStorage.setItem('lastItems', JSON.stringify(current));

            div.remove();

            createWarningPopup('✅ تم حذف العنصر المحدد بنجاح.');
        };
    }

    //////////////////////////// تحذير ////////////////////////////
    function createWarningPopup(message) {
        const div = document.createElement('div');

        div.innerHTML = popupTemplate('⚠️ تنبيه', `
        <div style="font-size:18px; font-weight:bold; color:#333;">
            ${message}
        </div>

        <br>

        <button id="okBtn" style="background:#3498db; color:white;">
            حسناً
        </button>
    `);

        document.body.appendChild(div);

        div.querySelector('#popupClose').onclick = () => div.remove();
        div.querySelector('#okBtn').onclick = () => div.remove();
    }

    //////////////////////////// كتابة الملاحظات ////////////////////////////
    async function setNote(field, text) {
        const setter = Object.getOwnPropertyDescriptor(
            window.HTMLTextAreaElement.prototype,
            'value'
        ).set;

        setter.call(
            field,
            field.value + (field.value ? '\n' : '') + text
        );

        field.dispatchEvent(
            new Event('input', { bubbles: true })
        );
    }


    function autoResetLastItemsAt4AM() {
        const now = new Date();
        const currentHour = now.getHours();
        const today = now.toLocaleDateString();

        const lastResetDate = localStorage.getItem('lastResetDate');

        // بعد الساعة 4 صباحًا مرة واحدة يوميًا
        if (currentHour >= 4 && lastResetDate !== today) {
            localStorage.removeItem('lastItems');
            localStorage.setItem('lastResetDate', today);
        }


    }

    // تشغيل مباشر عند فتح الصفحة
    autoResetLastItemsAt4AM();

    // فحص كل دقيقة
    setInterval(autoResetLastItemsAt4AM, 60000);



    //////////////////////////// تشغيل ////////////////////////////
    const observer = new MutationObserver(() => {
        createVodafoneCashButton();
        createLastItemsButton();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });


})();