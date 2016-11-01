'use strict';

addEventListener('DOMContentLoaded', () => {

    const els = {

        credentials: {
            consumerKey: document.querySelector('#consumer_key'),
            consumerSecret: document.querySelector('#consumer_secret'),
            accessToken: document.querySelector('#access_token'),
            accessTokenSecret: document.querySelector('#access_token_secret'),
        },

        method: document.querySelector('#method'),

        endpoint: document.querySelector('#endpoint'),

        params: (() => {
            const names = [...document.querySelectorAll('input[name=name]')];
            const values = [...document.querySelectorAll('input[name=value]')];
            return names.map((name, i) => ({name, value: values[i]}));
        })(),

        submit: document.querySelector('#submit'),

        result: document.querySelector('#result'),

    };

    els.submit.addEventListener('click', () => {

        els.result.value = '';

        const tw = new Twitter(
            els.credentials.consumerKey.value.trim(),
            els.credentials.consumerSecret.value.trim(),
            els.credentials.accessToken.value.trim(),
            els.credentials.accessTokenSecret.value.trim()
        );

        const params = {};
        for (const param of els.params) {
            const name = param.name.value.trim();
            const value = param.value.value.trim();
            if (name != '' && value != '') {
                params[name] = value;
            }
        }

        const apply = json => els.result.value = JSON.stringify(json, null, 2);
        tw[els.method.value](`https://api.twitter.com/1.1/${els.endpoint.value.trim()}.json`, params)
        .then(apply, apply);
    });

});