module.exports ={
    env:{
        browser: true,
        node: true,
        es2021: true,
    },
    extends: ['airbnb-base', "prettier"],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 12,
    },
    ignorePatterns: [".env"],
    rules:{
        'no-console': 0,
        "no-underscore-dangle": 0,
        "import/prefer-default-export": "off",
    },
};