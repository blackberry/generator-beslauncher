/*
 * Copyright 2015 BlackBerry Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var _ = require('lodash');
var chalk = require('chalk');
var cordova = require('cordova');
var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({

	initializing: function() {
		this.log(chalk.white.bgBlue('This will generate a cross-platform web-launcher that can be installed in the work-space. (Requires: Cordova, and BB10/iOS/Android dev environment to already be setup and working.') + '\n');
		this.log(chalk.white.bgRed.bold('*** If you don\'t have your BlackBerry 10, iOS, or Android development evironment(s) setup already, please do so before running this generator.') + '\n');
	},

	prompting: function() {
		var done = this.async();
		this.prompt(
			questions,
			function(answers) {
				this.answers = answers
				done();
			}.bind(this)
		);
	},

	install: function() {
		// add plugins
		this.log(chalk.blue('...... adding Plugins'));
		cordova.plugin(
			'add', [
				'com.blackberry.app',
				'com.blackberry.invoke',
				'https://github.com/apache/cordova-plugin-inappbrowser.git'
			]
		);

		// add platforms
		if (this.answers.appPlatforms.length > 0) {
			this.log(chalk.blue('...... adding Platforms'));
			var done = this.async();
			_cordovaAddPlatform(0, this.answers.appPlatforms, done);
		}
	},

	writing: function() {
		this.log(chalk.blue('...... updating Templates'));

		// cordova folders
		mkdirp('hooks')
		mkdirp('plugins')
		mkdirp('platforms')

		// copy templates
		var replacements = {
			appName: this.answers.appName,
			appId: this.answers.appId,
			appDescription: this.answers.appDescription,
			authorName: this.answers.authorName,
			authorEmail: this.answers.authorEmail,
			authorURL: this.answers.authorURL,
			appURL: this.answers.appURL,
		}

		this.fs.copyTpl(
			this.templatePath('**'),
			this.destinationRoot(),
			replacements
		);
	},

	end: function() {
		this.log('\n' + chalk.white.bgBlue('Done! For information on how to build your app(s), see the applicable Platform Guide at ') + chalk.underline.white.bgBlue('https://cordova.apache.org/docs/en/5.0.0/guide_platforms_index.md.html#Platform%20Guides'));
	}
});


// helpers
var _cordovaAddPlatform = function(index, platforms, done) {
	if (index >= platforms.length || typeof platforms === 'undefined') {
		done();
		return;
	}

	console.log('adding platform: ' + platforms[index]);
	cordova.platform('add', platforms[index], function() {
		_cordovaAddPlatform(index + 1, platforms, done);
	})
};


// questions
var questions = [{
	type: 'input',
	name: 'appName',
	message: 'Name of the app',
	default: 'My Weblauncher'
}, {
	type: 'input',
	name: 'appId',
	message: 'App ID',
	default: 'com.mycompany.weblauncher'
}, {
	type: 'input',
	name: 'appDescription',
	message: 'Description of the app',
	default: 'A web-launcher'
}, {
	type: 'input',
	name: 'authorName',
	message: 'Company Name',
	default: 'My Company'
}, {
	type: 'input',
	name: 'authorEmail',
	message: 'Company Email',
	default: 'email@mycompany.com'
}, {
	type: 'input',
	name: 'authorURL',
	message: 'Company Website',
	default: 'http://www.blackberry.com'
}, {
	type: 'input',
	name: 'appURL',
	message: 'URL of the website you want to load (with http/https/etc. prefix)',
	default: 'http://www.blackberry.com'
}, {
	type: 'checkbox',
	name: 'appPlatforms',
	message: 'Build for which Platforms?',
	choices: [{
		name: 'BlackBerry 10',
		value: 'blackberry10',
		checked: true
	}, {
		name: 'Android',
		value: 'android',
	}, {
		name: 'iOS',
		value: 'ios',
	}]
}];