export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'actsplanning',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css', integrity: 'sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We', crossorigin: 'anonymous' }

        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/static/src/css/main'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // Simple usage
        '@nuxtjs/vuetify',
        '@nuxtjs/color-mode',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        'bootstrap-vue/nuxt',
        '@nuxtjs/axios',
        '@nuxtjs/auth',
    ],



    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        babel: {
            plugins: [
                ["@babel/plugin-proposal-class-properties", { "loose": true }],
                ["@babel/plugin-proposal-private-methods", { "loose": true }],
                ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
            ]
        },
        loaders: {
            vue: {
                prettify: false
            }
        },
        parallel: true,
        cache: true,
        hardSource: true
    },


    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: 'http://localhost:8000/api'
    },

    auth: {
        localStorage: false,
        cookie: {
            localStorage: false,
            cookie: {
                options: {
                    expires: 7
                }
            },
            strategies: {
                local: {
                    endpoints: {
                        login: { url: '/login', method: 'post', propertyName: false },
                        logout: false,
                        user: { url: '/utilisateurs', method: 'get', propertyName: false }
                    },
                    // tokenRequired: true,
                    tokenType: ''
                }
            },
            plugins: ['~/plugins/axios.js', { src: '~/plugins/auth.js', mode: 'client' }]
        },
    }
}