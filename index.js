var Cookie = {

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

    set: function (name, value, timer, timerValue, domain, path) {
        try {
            if (!name || !value || !timer || !timerValue) {
                throw new Error('Invalid function arguments.');
            }
            let date = new Date();
            date.setTime(date.getTime() + (Cookie.timer[timer]) * timerValue);
            var expires = "expires="+ date.toUTCString();
            domain = domain !== undefined ? `;domain=${domain}` : '';
            path = path !== undefined ? `;path=${path};` : '';
            document.cookie = `${name}=${value};${expires}${domain}${path}`;
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
console.table(Cookie.getAll());

//set on domain and pathname
Cookie.set('name1', 'value', 'DAYS', 2, '.pawel-wrzosek.pl', '/');
console.log('name1: ', Cookie.exists('name1'));

//set on subdomain
Cookie.set('name2', 'value', 'DAYS', 2, '.aaa.pawel-wrzosek.pl');
console.log('name2: ', Cookie.exists('name2'));


Cookie.set('name3', 'value', 'MINUTES', 200);
console.log('name3: ', Cookie.exists('name3'));

Cookie.set('name4', 'value', 'MINUTES', 200);
console.log('name4: ', Cookie.exists('name4'));

console.table(Cookie.getAll());

//delete
Cookie.delete('name4');

console.table(Cookie.getAll());