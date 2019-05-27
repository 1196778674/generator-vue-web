'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('lodash');
var extend = require('deep-extend');
var mkdirp = require('mkdirp');

module.exports = class extends Generator {

  initializing() {
    this.props = {};
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      '欢迎使用 ' + chalk.red('generator-lf-vue-web') + ' 轮子!'
    ));

    return this.prompt([{
        type: 'input',
        name: 'appname',
        message: '请输入项目名称：',
        default: 'lf-vue-web'
      },
      {
        type: 'input',
        name: 'projectDesc',
        message: '请输入项目描述:',
        default: 'vue project'
      },
      {
        type: 'input',
        name: 'username',
        message: '请输入作者名字：',
        default: '小灰灰 <1196778674@qq.com>'
      },
      {
        type: 'list',
        name: 'projectLicense',
        message: '请选择协议:',
        choices: ['MIT', 'ISC'],
        default: 'MIT'
      }
      //打印出answers回复内容
    ]).then((answers) => {
      //最后将用户输入的数据存在this.props中，以方便后面调用。
      this.props = answers;
      this.writing();
    })


  }

  writing() {

    mkdirp(`${this.props.appname}`);

    var readmeTpl = _.template(this.fs.read(this.templatePath('./README.md')));
    this.fs.write(this.destinationPath(`./${this.props.appname}/README.md`), readmeTpl({
      generatorName: 'generator-lf-vue-web',
      yoName: 'xiaohuihui'
    }));

    var pkg = this.fs.readJSON(this.templatePath('./package.json'), {});

    extend(pkg, {
      dependencies: {
        "axios": "^0.18.0",
        "vue": "^2.5.2",
        "vue-event-bus-use-map": "^1.0.0",
        "vue-global-function": "^1.0.0",
        "vue-i18n": "^8.0.0",
        "vue-network-use-axios": "^1.0.3",
        "vue-router": "^3.0.1",
        "vue-socket-use-socket-io": "^1.0.0",
        "vuex": "^3.0.1"
      },
      devDependencies: {
        "@kazupon/vue-i18n-loader": "^0.3.0",
        "autoprefixer": "^7.1.2",
        "babel-core": "^6.22.1",
        "babel-eslint": "^8.2.1",
        "babel-helper-vue-jsx-merge-props": "^2.0.3",
        "babel-jest": "^21.0.2",
        "babel-loader": "^7.1.1",
        "babel-plugin-dynamic-import-node": "^1.2.0",
        "babel-plugin-syntax-jsx": "^6.18.0",
        "babel-plugin-transform-es2015-modules-commonjs": "^6.26.0",
        "babel-plugin-transform-runtime": "^6.22.0",
        "babel-plugin-transform-vue-jsx": "^3.5.0",
        "babel-preset-env": "^1.3.2",
        "babel-preset-stage-2": "^6.22.0",
        "chalk": "^2.0.1",
        "copy-webpack-plugin": "^4.0.1",
        "css-loader": "^0.28.0",
        "deepmerge": "^2.1.1",
        "eslint": "^4.15.0",
        "eslint-config-standard": "^10.2.1",
        "eslint-friendly-formatter": "^3.0.0",
        "eslint-loader": "^1.7.1",
        "eslint-plugin-import": "^2.7.0",
        "eslint-plugin-node": "^5.2.0",
        "eslint-plugin-promise": "^3.4.0",
        "eslint-plugin-standard": "^3.0.1",
        "eslint-plugin-vue": "^4.0.0",
        "extract-text-webpack-plugin": "^3.0.0",
        "file-loader": "^1.1.4",
        "friendly-errors-webpack-plugin": "^1.6.1",
        "html-webpack-plugin": "^2.30.1",
        "jest": "^22.0.4",
        "jest-serializer-vue": "^0.3.0",
        "node-notifier": "^5.1.2",
        "optimize-css-assets-webpack-plugin": "^3.2.0",
        "ora": "^1.2.0",
        "portfinder": "^1.0.13",
        "postcss-import": "^11.0.0",
        "postcss-loader": "^2.0.8",
        "postcss-url": "^7.2.1",
        "rimraf": "^2.6.0",
        "semver": "^5.3.0",
        "shelljs": "^0.7.6",
        "uglifyjs-webpack-plugin": "^1.1.1",
        "url-loader": "^1.0.1",
        "vue-jest": "^1.0.2",
        "vue-loader": "^13.3.0",
        "vue-style-loader": "^3.0.1",
        "vue-template-compiler": "^2.5.2",
        "webpack": "^3.6.0",
        "webpack-bundle-analyzer": "^2.9.0",
        "webpack-dev-server": "^2.9.1",
        "webpack-merge": "^4.1.0"
      }
    });
    pkg.keywords = pkg.keywords || [];
    pkg.keywords.push('generator-lf-vue-web');

    pkg.name = this.props.appname;
    pkg.description = this.props.projectDesc;
    pkg.author = this.props.username;
    pkg.license = this.props.projectLicense;

    this.fs.writeJSON(this.destinationPath(`./${pkg.name}/package.json`), pkg);

    // this.fs.copy(
    //   this.templatePath('gitignore_tmpl'),
    //   this.destinationPath('.gitignore')
    // );

    this.fs.copy(
      this.templatePath('./appTpl/'),
      `./${pkg.name}/`
    );

  }

}
