adapt-sideView
===============

Adapt-sideView is an extension for the Adapt Framework. It implements a pannel on the right hand side of the screen that sits next to an Adapt course that loads in content through an iFrame.  Whilst on mobile the Sideview appears over the Adapt course. Other extensions can use this panel to show content and can trigger the showing and hiding on the panel.

## Attributes

**_isEnabled** (boolean): set to true to enable the extension in your project. Default: true

**_run** (object): The Run setting allows you to configure courses to be used in multiple different deployments with different iframe content being used for each course.

**Please disable this feature unless you understand what you are doing or it will break your iframe links!!!**

> **_isEnabled** (boolean): set to true to enable the feature in your project. Default: false

> **_number** (number): The current run number. Increment this whenever you republish a course

> **_hostName** (string): The url of the web app that will determine your run number and link to the correct iframe url.


## Supported extensions

* [Adapt-social](https://github.com/KingsOnline/adapt-social) - appends a button a block that which opens the sideview with content that is focused on interactions between learners.

If you wish to create your own extension that works with the SideView then feel free to contact me to ask for help.

## Limitations

*  Poor Accessibility support. Not really sure how to support navigation between two windows.

----------------------------
**Version number:**  0.0.1   <a href="https://community.adaptlearning.org/" target="_blank"><img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/adapt-logo-mrgn-lft.jpg" alt="adapt learning logo" align="right"></a>
**Framework versions:** 2.0 +   
**Author / maintainer:** [Simon Date](mailto:simon.date@kcl.ac.uk), [contributors](https://github.com/kingsonline/adapt-sideView/graphs/contributors)  
**Accessibility support:** No   
**RTL support:** No  
**Cross-platform coverage:** Chrome, Firefox (ESR + latest version), Edge 12, IE 11, IE10, IE Mobile 11, Safari for iPhone (iOS 8+9), Safari for iPad (iOS 8+9), Safari 8     
