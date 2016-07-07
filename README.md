# Yeoman Generator - Cross Platform Web Launcher

This is a Yeoman generator that will build a cross platform web launcher (an icon that sits on the phone, which launches the system browser to a predefined URL) typically installed in the workspace, and based upon the [BES10 Web-Launcher](https://github.com/blackberry/BES10-WebWorks/tree/master/webworks-launcher) Sample app.

**Author**

* [Chad Tetreault](http://bit.ly/chadli123)

### Setup

Before using this generator you must have your development environment(s) setup, and ready to roll for each platform you plan on building an app for. Refer to the Cordova Platform Guides which will walk you through the setup process.

##### Platform Setup Guides
* [BlackBerry 10](https://cordova.apache.org/docs/en/4.0.0/guide_platforms_blackberry10_index.md.html#BlackBerry%2010%20Platform%20Guide)
* [Android](https://cordova.apache.org/docs/en/4.0.0/guide_platforms_android_index.md.html#Android%20Platform%20Guide)
* [iOS](https://cordova.apache.org/docs/en/4.0.0/guide_platforms_ios_index.md.html#iOS%20Platform%20Guide)


### Yeoman and Generator Installation

Yeoman is an NPM module, and installed globally through [Node.js](http://nodejs.org)'s `npm` command

* Download and install [Node.js](http://www.nodejs.org)
* Install Yeoman: ``npm install -g yo``
* Install this generator: ``npm install -g generator-beslauncher``

### Running the Generator

To run the generator run the following from terminal / command-prompt

`` yo beslauncher``

or, to list all installed generators and manually run it

``yo``

The generator will prompt you for eight answers.

1. **Name** - Displayed under the app icon.
2. **ID** - Unique ID, typically in the com.companyname.appname format.
3. **Description** - Short description of the app.
4. **Company Name** - Your company name.
5. **Company Email** - Contact email.
6. **Company Website** - Website.
7. **URL** - Where the app will 'launch' to.
8. **Platforms** - Select all Platforms you want to build for. You must have the Platform environment already. setup

### Next Steps

Next you need to ``build`` your new app. The *--release* flag indicates the app will be packaged for release.

*Note: For BlackBerry 10, you'll be prompted for your *Signing Password*. This is the password you chose when you [Setup your Signing Keys](https://developer.blackberry.com/html5/documentation/v1_0/signing_setup.html).

``cordova build --release``

### Done

At this point you should have a fully customized, cross-platform web launcher. For more information on how to test and deploy this app on each platform refer to the [Cordova Platform Guides](https://cordova.apache.org/docs/en/4.0.0/guide_platforms_index.md.html#Platform%20Guides).
