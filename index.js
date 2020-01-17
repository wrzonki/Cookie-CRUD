const Cookie = {

    timer: {
        'SECONDS':  1000,
        'MINUTES':  1000 * 60,
        'HOURS':    1000 * 60 * 60,
        'DAYS':     1000 * 60 * 60 * 24
    },

    getAll: () => {
        let allCookies = {};
        document.cookie.split(';').forEach((cookie) => {
            allCookies[cookie.split('=')[0].trim()] = cookie.split('=')[1].trim()
        });
        return allCookies;
    },

    exists: (name) => Cookie.getAll().hasOwnProperty(name),

    getCookie: (name) => {
        try {
            if (!Cookie.exists(name)) {
                throw new Error(`Cookie: ${name} doesn\'t exist.`);
            }
            return Cookie.getAll()[name]
        } catch (error) {
            console.error(error.stack);
        }
    },

    set: function (obj) {
        try {
            if (!obj.name || !obj.value || !obj.timer || !obj.timerValue) {
                throw new Error('Invalid function arguments.');
            }
            let date = new Date();
            date.setTime(date.getTime() + (Cookie.timer[obj.timer]) * obj.timerValue);
            let expires = "expires="+ date.toUTCString();
            domain = obj.domain !== undefined ? `;domain=${obj.domain}` : '';
            path = obj.path !== undefined ? `;path=${obj.path}` : '';
            sameSite = obj.sameSite !== undefined ? `;SameSite=${obj.sameSite};` : `;SameSite=Lax;`;
            secure = obj.secure !== undefined && obj.secure ? `;Secure` : '';
            document.cookie = `${obj.name}=${obj.value};${expires}${domain}${path}${sameSite}${secure}`;
        } catch (error) {
            console.warn(error.stack);
        };
    },

    delete: (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
};

/**
 * TESTY
 */

Cookie.set({
    name: 'name1',
    value: 'value',
    timer: 'MINUTES',
    timerValue: 200
});

Cookie.set({
    name: 'name2',
    value: 'value',
    timer: 'MINUTES',
    timerValue: 200,
    domain: 'github.com'
});

Cookie.set({
    name: 'name3',
    value: 'value',
    timer: 'MINUTES',
    timerValue: 200,
    path: '/'
});

Cookie.set({
    name: 'name4',
    value: 'value',
    timer: 'MINUTES',
    timerValue: 200,
    sameSite: 'Strict'
});

Cookie.set({
    name: 'name5',
    value: 'value',
    timer: 'MINUTES',
    timerValue: 200,
    sameSite: 'None',
    secure: true
});

Cookie.delete('name1');
Cookie.getAll();