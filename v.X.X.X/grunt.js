/*global module:false*/
module.exports = function(grunt) {

  // Load resource files
  var fStructure = grunt.file.readJSON('folderStructure.json'),
      prodBundles = grunt.file.readJSON('prodbundles.json'),
      jsFiles = grunt.file.readJSON('jsfiles.json'),
      cssFiles = grunt.file.readJSON('cssfiles.json');

  // Build System Properties
  var bProps = {
    files: [],
    folders: []
  }

  // Build System Dynamic Functions
  var bFuncs = {

    // Concatinate function
    concat: function(taskName, src, dest, funcProps) {

      // Storage array for newly generated tasks
      var newTasks = [],
      taskObj = {
        src: [],
        dest: dest + funcProps.output,
        taskName: taskName
      };

      // Check to see if the file list is an array or string and act accordingly
      if (typeof(funcProps.file) == "string") {

        // Add the source item to the array
        taskObj.src.push(src + jsFiles[funcProps.file]);

      } else {

        // Must be an array of strings
        for (file in funcProps.files) {

          // Add all the source items to the array
          taskObj.src.push(src + jsFiles[funcProps.files[file]]);
        }

      }

      // Add concat to the config.
      grunt.config('concat.' + taskObj.taskName, {
          src: taskObj.src,
          dest: taskObj.dest
      });

      // Return the finished task that name that was just defined to add to our task object.
      return ('concat:' + taskObj.taskName);

    },

    // JS Minification Process
    min: function(taskName, src, dest, funcProps) {

      // Storage array for newly generated tasks
      var newTasks = [],
      taskObj = {
        src: [],
        dest: dest + funcProps.output,
        taskName: taskName
      };

      // Check to see if the file list is an array or string and act accordingly
      if (typeof(funcProps.file) == "string") {

        // Add the source item to the array
        taskObj.src.push(dest + jsFiles[funcProps.file]);

      } else {

        // Must be an array of strings
        for (file in funcProps.files) {

          // Add all the source items to the array
          taskObj.src.push(dest + funcProps.files[file]);
        }

      }

      // Add min to the config
      grunt.config('min.' + taskName, {
          src: taskObj.src,
          dest: taskObj.dest
      });

      // Return the finished task that name that was just defined to add to our task object.
      return ('min:' + taskObj.taskName);

    },

    // Less process and maybe concating
    less: function(taskName, src, dest, funcProps) {

      // Storage array for newly generated tasks
      var newTasks = [],
      taskObj = {
        src: [],
        dest: dest + funcProps.output,
        taskName: taskName
      };


      // Must be an array of strings
      for (file in funcProps.files) {
        // Add all the source items to the array
        //filesrc += src + funcProps.files[file];
        taskObj.src.push(src + cssFiles[funcProps.files[file]]);
      }

      if (funcProps.min == "true") {

        var lessObj = {
          options: {
            yuicompress: true
          },
          files: {}
        }

        lessObj.files[taskObj.dest] = taskObj.src;

      } else {

        // Make the file object used for the less config
        var lessObj = {
          files: {}
        }

        lessObj.files[taskObj.dest] = taskObj.src;

      }

      // Add less task to config without minification step.
      grunt.config('less.' + taskName, lessObj);

      // Return the finished task that name that was just defined to add to our task object.
      return ('less:' + taskName);

    }

  }

  function buildProcessor(mode, argument) {

    var taskName = "ux-core",
        bundle;

    // check for argument for a none standard build
    if (argument) {

      // Check to see if the argument is a defined bundle
      if (prodBundles.hasOwnProperty(argument)) {

        // This bundle was defined, now check they type of bundle and
        // preform the actions needed

        switch (prodBundles[argument].type) {

          // Standard bundles are self contained and can just be called.
          case "standard":
            
            taskName = argument;
            bundle = prodBundles[argument];

            // Execute this task
            taskExecuter(taskName, mode, bundle);

              break;
          
          // Combind bundles are simply a set of standard bundles, all that need to be called.
          case "combind":

            // Loop through all of the sub-bundles and execute them in the order they are declared.
            for (call in prodBundles[argument].calls) {
              //grunt.log.writeln(prodBundles[argument].calls[call]);
              
              //subTask = prodBundles[argument].calls[call];
              taskName = prodBundles[argument].calls[call];
              bundle = prodBundles[taskName];

              // Execute this task
              taskExecuter(taskName, mode, bundle);

            }

              break;
        }

      } 

    } else {

      switch (prodBundles[taskName].type) {

        // Standard bundles are self contained and can just be called.
        case "standard":
        
          // Just get the bundle
          bundle = prodBundles[taskName];

          // Execute this task
          taskExecuter(taskName, mode, bundle);

            break;
        
        // Combind bundles are simply a set of standard bundles, all that need to be called.
        case "combind":

          var origTask = taskName;

          // Loop through all of the sub-bundles and execute them in the order they are declared.
          for (call in prodBundles[origTask].calls) {
            //grunt.log.writeln(prodBundles[argument].calls[call]);
            
            //subTask = prodBundles[argument].calls[call];
            taskName = prodBundles[origTask].calls[call];
            bundle = prodBundles[taskName];

            // Execute this task
            taskExecuter(taskName, mode, bundle);

          }

            break;
      }

    }

  }

  function taskExecuter(taskName, mode, bundle) {

    var tasks = [];

    // Pull the asset types we are going to manipulate in this mode.
    assetTypes = bundle.mode[mode];

    // Loop will go throught all the different asset types (js/css/both)
    for (type in assetTypes) {

      // Save off all of the function types
      var functions = assetTypes[type];

      // Loop will go through all of the function objects
      for (func in functions) {
        //grunt.log.writeln(func + " = " + functions[func]);

        var actions = functions[func];

        // Loop through all of the individual functions
        for (action in actions) {

          // Call the functions and pass the data
          //grunt.log.writeln(action + " = " + actions[action]);

          switch(action) {

            // We are concating, so we need to pass the dest and src with the list of tiles to be concatinated.
            case "concat":
              
              //grunt.log.writeln('We have a concat');
              tasks.push(bFuncs.concat(taskName, fStructure[mode][type].src, fStructure[mode][type].dest, actions[action]));
              break;

            case "min":
              tasks.push(bFuncs.min(taskName, fStructure[mode][type].src, fStructure[mode][type].dest, actions[action]));
              break;

            case "less":
              tasks.push(bFuncs.less(taskName, fStructure[mode][type].src, fStructure[mode][type].dest, actions[action]));
              break;

          }

        } 

      }

    } // End all of the looping!


    // Execute all tasks
    grunt.task.run(tasks);

  }

  // Adds less module for grunt
  grunt.loadNpmTasks('grunt-contrib-less');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - */'
    }

    // All tasks are built dynamically through buildProcessor and JSON config files.

  });

  // Development definitation
  grunt.registerTask('dev', 'Execute development build', function(){

    if (arguments.length === 0) {
      
      // Set the work object to be the non argurment object
      buildProcessor('dev');

    } else {

      // Arguments were provided so loop through them
      for (arg in arguments) {

        // Call task with parameter
        buildProcessor('dev', arguments[arg]);
      }

    }


  });

  // Production definitation
  grunt.registerTask('prod', 'Execute production build', function(){

    if (arguments.length === 0) {
      
      // Set the work object to be the non argurment object
      buildProcessor('prod');

    } else {

      // Arguments were provided so loop through them
      for (arg in arguments) {

        //grunt.log.writeln(arguments[arg]);
        buildProcessor('prod', arguments[arg]);
      }

    }

  });

  // Default task. Override to manually call it ourselves
  grunt.registerTask('default', function() {

    // Pipe all generic 'grunt' calls through to 'dev'
    grunt.task.run('dev');

  });

};
