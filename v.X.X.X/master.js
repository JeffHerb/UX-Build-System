/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/* Test Script */'
    },
    // Outline the JS files that need to be concatonated
    concat: {

      // UX Object Build
      uxObject: {
        src: ['js-dev/ux-script/browserDetect.js','js-dev/ux-script/lazyloader.js','js-dev/ux-script/jquery.js','js-dev/ux-script/ux-object.js','js-dev/ux-script/default.js'],
        dest: 'js-temp/ux-script.js'
      },

      // UX Screen Styles
      uxScreenStyles: {
        src: ['css-dev/global.less','css-dev/ux-defaults.less','css-dev/ux-grid-system.less','css-dev/ux-structure.less','css-dev/ux-page-contents.less','css-dev/ux-tables.less','css-dev/ux-media-queries.less','css-dev/ux-utility.less'],
        dest: 'css-temp/ux-style.less'
      },

      // UX Print Styles
      uxPrintStyles: {
        src: ['css-dev/global-print.less','css-dev/ux-print.less'],
        dest: 'css-temp/ux-print.less'
      },

      // UX Guide Styles
      guideStyles: {
        src: ['css-temp/ux-style.less','css-dev/guide-only.less'],
        dest: 'css-temp/ux-guide.less'
      },

      // DOL Website Styles
      webStyles: {
        src: ['css-temp/ux-style.less','css-dev/website.less'],
        dest: 'css-temp/website.less'
      },

      // App (JSF) Styles
      appStyles: {
        src: ['css-temp/ux-style.less','css-dev/apps-defaults.less'],
        dest: 'css-temp/apps.less'
      },

      // Lazy Load CKEditor
      ckEditor: {
        src: ['css-dev/global.less','css-dev/lazy-ckeditor-override.less'],
        dest: 'css-temp/lazy-ckeditor-override.less'
      },

      // Lazy Load DynaTree
      dynaTree: {
        src: ['css-dev/global.less','css-dev/lazy-dynatree.less'],
        dest: 'css-temp/lazy-dynatree.less'
      },

      // Lazy Load Full Calendar
      fullCalendar: {
        src: ['css-dev/global.less','css-dev/lazy-fullcalendar.less','css-dev/lazy-fullcalendar-overrides.less'],
        dest: 'css-temp/lazy-fullcalendar.less'
      },

      // Lazy Load Page Feedback
      pageFeedback: {
        src: ['css-dev/global.less','css-dev/lazy-jquery-page-feedback.less'],
        dest: 'css-temp/lazy-jquery-page-feedback.less'
      },

      // Lazy Load Qtips
      qtips: {
        src: ['css-dev/global.less','css-dev/lazy-jquery-qtip.less'],
        dest: 'css-temp/lazy-jquery-qtip.less'
      },

      // Lazy Load jQuery UI
      jQueryUI: {
        src: ['css-dev/global.less','css-dev/lazy-jquery-ui.less','css-dev/lazy-jquery.chosen-overrides.less'],
        dest: 'css-temp/lazy-jquery-ui.less'
      },

      // Lazy Load chosen
      chosen: {
        src: ['css-dev/global.less','css-dev/lazy-jquery.chosen.less','css-dev/lazy-jquery.chosen-overrides.less'],
        dest: 'css-temp/lazy-jquery.chosen.less'
      },

      // Lazy load expander
      expander: {
        src: ['css-dev/global.less','css-dev/lazy-jquery.expander.less'],
        dest: 'css-temp/lazy-jquery.expander.less'
      },

      // Lazy load joyride
      joyRide: {
        src: ['css-dev/global.less','css-dev/lazy-jquery.joyride.less'],
        dest: 'css-temp/lazy-jquery.joyride.less'
      },

      // Lazy load formEnhancements
      formEnhancements: {
        src: ['css-dev/global.less','css-dev/lazy-jquery.open-ux.form-enhancements.less','css-dev/lazy-jquery.open-ux.character-counter-overrides.less'],
        dest: 'css-temp/lazy-jquery.open-ux.form-enhancements.less'
      },

      // Lazy load keyboard shortcutes
      keyboardShortcuts: {
        src: ['css-dev/global.less','css-dev/lazy-jquery.open-ux.keyboard-shortcuts.less'],
        dest: 'css-temp/lazy-jquery.open-ux.keyboard-shortcuts.less'
      },

      // Lazy load navigational-warning
      navigationalWarning: {
        src: ['css-dev/global.less','css-dev/lazy-jquery.open-ux.navigational-warning.less'],
        dest: 'css-temp/lazy-jquery.open-ux.navigational-warning.less'
      },

      // Lazy load notifications
      notifications: {
        src: ['css-dev/global.less','css-dev/lazy-jquery.open-ux.notifications.less'],
        dest: 'css-temp/lazy-jquery.open-ux.notifications.less'
      },

      // Lazy load popovers
      popovers: {
        src: ['css-dev/global.less','css-dev/lazy-jquery.open-ux.popovers.less'],
        dest: 'css-temp/lazy-jquery.open-ux.popovers.less'
      },

      // Lazy load Validation Engine
      validationEngine: {
        src: ['css-dev/global.less','css-dev/lazy-jquery.validationEngine.less','css-dev/lazy-jquery.validationEngine-overrides.less'],
        dest: 'css-temp/lazy-jquery.validationEngine.less'
      },

        // Lazy load Validation Engine
      video: {
        src: ['css-dev/global.less','css-dev/lazy-video-js.less'],
        dest: 'css-temp/lazy-video-js.less'
      }

    },
    // Minify all of the different files from js-dev to js for production.
    min: {

      uxObject: {
        src: ['<config:concat.uxObject.dest>'],
        dest: 'js/ux-script.min.js'
      },
      // Item belows are those that are not being concatinated, just need to be minified.
      pageFeedback: {
        src: ['js-dev/lazy-jquery-page-feedback.js'],
        dest: 'js/lazy-jquery-page-feedback.min.js'
      },
      juiAccordion: {
        src: ['js-dev/lazy-jquery-ui-accordion.js'],
        dest: 'js/lazy-jquery-ui-accordion.min.js'
      },
      juiAutocomplete: {
        src: ['js-dev/lazy-jquery-ui-autocomplete.js'],
        dest: 'js/lazy-jquery-ui-autocomplete.min.js'
      },
      juiButtons: {
        src: ['js-dev/lazy-jquery-ui-button.js'],
        dest: 'js/lazy-jquery-ui-button.min.js'
      },
      juiCore: {
        src: ['js-dev/lazy-jquery-ui-core.js'],
        dest: 'js/lazy-jquery-ui-core.min.js'
      },
      juiDatePicker: {
        src: ['js-dev/lazy-jquery-ui-datepicker.js'],
        dest: 'js/lazy-jquery-ui-datepicker.min.js'
      },
      juiDialog: {
        src: ['js-dev/lazy-jquery-ui-dialog.js'],
        dest: 'js/lazy-jquery-ui-dialog.min.js'
      },
      juiProgressBar: {
        src: ['js-dev/lazy-jquery-ui-progressbar.js'],
        dest: 'js/lazy-jquery-ui-progressbar.min.js'
      },
      juiSlider: {
        src: ['js-dev/lazy-jquery-ui-slider.js'],
        dest: 'js/lazy-jquery-ui-slider.min.js'
      },
      juiTabs: {
        src: ['js-dev/lazy-jquery-ui-tabs.js'],
        dest: 'js/lazy-jquery-ui-tabs.min.js'
      },
      chosen: {
        src: ['js-dev/lazy-jquery.chosen.js'],
        dest: 'js/lazy-jquery.chosen.min.js'
      },
      cookie: {
        src: ['js-dev/lazy-jquery.cookie.js'],
        dest: 'js/lazy-jquery.cookie.min.js'
      },
      dataTables: {
        src: ['js-dev/lazy-jquery.dataTables.js'],
        dest: 'js/lazy-jquery.dataTables.min.js'
      },
      dynaTree: {
        src: ['js-dev/lazy-jquery.dynatree.js'],
        dest: 'js/lazy-jquery.dynatree.min.js'
      },
      expander: {
        src: ['js-dev/lazy-jquery.expander.js'],
        dest: 'js/lazy-jquery.expander.min.js'
      },
      fullCalendar: {
        src: ['js-dev/lazy-jquery.fullcalendar.js'],
        dest: 'js/lazy-jquery.fullcalendar.min.js'
      },
      joyRide: {
        src: ['js-dev/lazy-jquery.joyride.js'],
        dest: 'js/lazy-jquery.joyride.min.js'
      },
      characterCounter: {
        src: ['js-dev/lazy-jquery.open-ux.character-counter.js'],
        dest: 'js/lazy-jquery.open-ux.character-counter.min.js'
      },
      keyboardShortcuts: {
        src: ['js-dev/lazy-jquery.open-ux.keyboard-shortcuts.js'],
        dest: 'js/lazy-jquery.open-ux.keyboard-shortcuts.min.js'
      },
      uxMenus: {
        src: ['js-dev/lazy-jquery.open-ux.menus.js'],
        dest: 'js/lazy-jquery.open-ux.menus.min.js'
      },
      modalLoader: {
        src: ['js-dev/lazy-jquery.open-ux.modal-loader.js'],
        dest: 'js/lazy-jquery.open-ux.modal-loader.min.js'
      },
      navigationalWarning: {
        src: ['js-dev/lazy-jquery.open-ux.navigational-warning.js'],
        dest: 'js/lazy-jquery.open-ux.navigational-warning.min.js'
      },
      notifications: {
        src: ['js-dev/lazy-jquery.open-ux.notifications.js'],
        dest: 'js/lazy-jquery.open-ux.notifications.min.js'
      },
      popovers: {
        src: ['js-dev/lazy-jquery.open-ux.popovers.js'],
        dest: 'js/lazy-jquery.open-ux.popovers.js'
      },
      showHidePassword: {
        src: ['js-dev/lazy-jquery.open-ux.show-hide-password.js'],
        dest: 'js/lazy-jquery.open-ux.show-hide-password.min.js'
      },
      qtips: {
        src: ['js-dev/lazy-jquery.qtip.js'],
        dest: 'js/lazy-jquery.qtip.min.js'
      },
      validationEngineRule: {
        src: ['js-dev/lazy-jquery.validationEngine-en.js'],
        dest: 'js/lazy-jquery.validationEngine-en.min.js'
      },
      validationEngine: {
        src: ['js-dev/lazy-jquery.validationEngine.js'],
        dest: 'js/lazy-jquery.validationEngine.min.js'
      },
      json2: {
        src: ['js-dev/lazy-json2.js'],
        dest: 'js/lazy-json2.min.js'
      },
      sugar: {
        src: ['js-dev/lazy-sugar.js'],
        dest: 'js/lazy-sugar.min.js'
      },
      swfObject: {
        src: ['js-dev/lazy-swfobject.js'],
        dest: 'js/lazy-swfobject.min.js'
      },
      video: {
        src: ['js-dev/lazy-video.js'],
        dest: 'js/lazy-video.min.js'
      },
      modernizr: {
        src: ['js-dev/modernizr.js'],
        dest: 'js/modernizr.js'
      }
    },

    less: {
      
      // Development version of UX Core Screen Styles
      uxCoreDev: {
        files: {
          "css/ux-style.css": "<config:concat.uxScreenStyles.dest>"
        }
      },

      // Production version of UX Core Screen Styles
      uxCoreProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/ux-style.min.css": "<config:concat.uxScreenStyles.dest>"
        }
      },

      // Development version of UX Print Screen Styles
      uxCorePrintDev: {
        files: {
          "css/ux-print.css": "<config:concat.uxPrintStyles.dest>"
        }
      },

      // Production version of UX Print Screen Styles
      uxCorePrintProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/ux-print.min.css": "<config:concat.uxPrintStyles.dest>"
        }
      },

      // Development version of UX Guide Styles
      uxGuideDev: {
        files: {
          "css/ux-guide.css": "<config:concat.guideStyles.dest>"
        }
      },

      // Production version of UX Print Screen Styles
      uxGuideProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/ux-guide.min.css": "<config:concat.guideStyles.dest>"
        }
      },

      // Development version of UX Print Screen Styles
      websiteDev: {
        files: {
          "css/website.css": "<config:concat.webStyles.dest>"
        }
      },

      // Production version of UX Print Screen Styles
      websiteProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/website.min.css": "<config:concat.webStyles.dest>"
        }
      },

      // Development version of UX Apps (JSF) Screen Styles
      appsDev: {
        files: {
          "css/apps.css": "<config:concat.appStyles.dest>"
        }
      },

      // Production version of UX Apps (JSF) Screen Styles
      appsProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/apps.min.css": "<config:concat.appStyles.dest>"
        }
      },

      // Development version of the combined lazy load of fullcalendars
      ckEditorDev: {
        files: {
          "css/lazy-ckeditor-override.css": "<config:concat.ckEditor.dest>"
        }
      },

      // Production version of the combined lazy load of fullcalendars
      ckEditorProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/lazy-ckeditor-override.min.css": "<config:concat.ckEditor.dest>"
        }
      },

      // Development version of the combined lazy load of dynaTree
      dynaTreeDev: {
        files: {
          "css/lazy-dynatree.css": "<config:concat.dynaTree.dest>"
        }
      },

      // Production version of the combined lazy load of dynaTree
      dynaTreeProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/lazy-dynatree.min.css": "<config:concat.dynaTree.dest>"
        }
      },

      // Development version of the combined lazy load of fullcalendars
      fullCalendarDev: {
        files: {
          "css/lazy-fullcalendar.css": "<config:concat.fullCalendar.dest>"
        }
      },

      // Production version of the combined lazy load of fullcalendars
      fullCalendarProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/lazy-fullcalendar.min.css": "<config:concat.fullCalendar.dest>"
        }
      },

      // Development version of the combined lazy load of page feedback
      pageFeedbackDev: {
        files: {
          "css/lazy-jquery-page-feedback.css": "<config:concat.qtips.dest>"
        }
      },

      // Production version of the combined lazy load of page feedback
      pageFeedbackProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/lazy-jquery-page-feedback.min.css": "<config:concat.qtips.dest>"
        }
      },

      // Development version of the combined lazy load of qtips
      qtipsDev: {
        files: {
          "css/lazy-jquery-qtip.css": "<config:concat.qtips.dest>"
        }
      },

      // Production version of the combined lazy load of qtips
      qtipsProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/lazy-jquery-qtip.min.css": "<config:concat.qtips.dest>"
        }
      },

      // Development version of the combined lazy load of jQuery UI
      jqueryUIDev: {
        files: {
          "css/lazy-jquery-ui.css": "<config:concat.jQueryUI.dest>"
        }
      },

      // Production version of the combined lazy load of jQuery UI
      jqueryUIProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/lazy-jquery-ui.min.css": "<config:concat.jQueryUI.dest>"
        }
      },

      // Development version of the combined lazy load of Chosen
      chosenDev: {
        files: {
          "css/lazy-jquery.chosen.css": "<config:concat.chosen.dest>"
        }
      },

      // Production version of the combined lazy load of Chosen
      chosenProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/lazy-jquery.chosen.min.css": "<config:concat.chosen.dest>"
        }
      },

      // Development version of the combined lazy load of Expander
      expanderDev: {
        files: {
          "css/lazy-jquery.expander.css": "<config:concat.expander.dest>"
        }
      },

      // Production version of the combined lazy load of Expander
      expanderProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/lazy-jquery.expander.min.css": "<config:concat.expander.dest>"
        }
      },

      // Development version of the combined lazy load of joyRide
      joyRideDev: {
        files: {
          "css/lazy-jquery.joyride.css": "<config:concat.joyRide.dest>"
        }
      },

      // Production version of the combined lazy load of joyRide
      joyRideProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/lazy-jquery.joyride.min.css": "<config:concat.joyRide.dest>"
        }
      },

      // Development version of the combined lazy load of formEhancements
      formEhancementsDev: {
        files: {
          "css/lazy-jquery.open-ux.form-enhancements.css": "<config:concat.formEnhancements.dest>"
        }
      },

      // Production version of the combined lazy load of formEhancements
      formEhancementsProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/lazy-jquery.open-ux.form-enhancements.min.css": "<config:concat.formEnhancements.dest>"
        }
      },
      // Development version of the combined lazy load of Navigational Warning
      keyboardShortcutsDev: {
        files: {
          "css/lazy-jquery.open-ux.navigational-warning.css": "<config:concat.keyboardShortcuts.dest>"
        }
      },

      // Production version of the combined lazy load of Navigational Warning
      keyboardShortcutsProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/lazy-jquery.open-ux.navigational-warning.min.css": "<config:concat.keyboardShortcuts.dest>"
        }
      },

      // Development version of the combined lazy load of Navigational Warning
      navigationalWarningDev: {
        files: {
          "css/lazy-jquery.open-ux.navigational-warning.css": "<config:concat.navigationalWarning.dest>"
        }
      },

      // Production version of the combined lazy load of Navigational Warning
      navigationalWarningProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/lazy-jquery.open-ux.navigational-warning.min.css": "<config:concat.navigationalWarning.dest>"
        }
      },

      // Development version of the combined lazy load of Notifications
      notificationsDev: {
        files: {
          "css/lazy-jquery.open-ux.notifications.css": "<config:concat.notifications.dest>"
        }
      },

      // Production version of the combined lazy load of Notifications
      notificationsProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/lazy-jquery.open-ux.notifications.min.css": "<config:concat.notifications.dest>"
        }
      },

      // Development version of the combined lazy load of Popovers
      popoversDev: {
        files: {
          "css/lazy-jquery.open-ux.popovers.css": "<config:concat.popovers.dest>"
        }
      },

      // Production version of the combined lazy load of Popovers
      popoversProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/lazy-jquery.open-ux.popovers.min.css": "<config:concat.popovers.dest>"
        }
      },

      // Development version of the combined lazy load of Validation Engine
      validationDev: {
        files: {
          "css/lazy-jquery.validationEngine.css": "<config:concat.validationEngine.dest>"
        }
      },

      // Production version of the combined lazy load of Validation Engine
      validationProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/lazy-jquery.validationEngine.min.css": "<config:concat.validationEngine.dest>"
        }
      },

      // Development version of the combined lazy load of Validation Engine
      videoDev: {
        files: {
          "css/lazy-video-js.css": "<config:concat.video.dest>"
        }
      },

      // Production version of the combined lazy load of Validation Engine
      videoProd: {
        options: {
          yuicompress: true
        },
        files: {
          "css/lazy-video-js.min.css": "<config:concat.video.dest>"
        }
      }

    }

  });

  // Adds less module for grunt
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task.
  grunt.registerTask('default', 'concat min less');

};
