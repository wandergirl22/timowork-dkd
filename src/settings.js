module.exports = {
  title: "hrsaas",

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,
    // prettier 配置
    "prettier.jsxBracketSameLine": false,
    "prettier.printWidth": 58, // 超过最大值换行
    "prettier.tslintIntegration": false,
    "prettier.singleQuote": true, // 保存的时候自动格式化
    "prettier.semi": false,
    "workbench.editor.enablePreview": false,
    "[javascript]": {
      "editor.defaultFormatter": "rvest.vs-code-prettier-eslint" //配置格式化js默认使用prettier
    },
};
