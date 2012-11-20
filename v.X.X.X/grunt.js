/*global module:false*/
module.exports = function(grunt) {

  // Load resource files
  var fStructure = grunt.file.readJSON('folderStructure.json'),
      prodBundles = grunt.file.readJSON('prodbundles.json'),
      jsFiles = grunt.file.readJSON('jsfiles.json'),
      cssFiles = grunt.file.readJSON('cssfiles.json');

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
      var taskObj = {
        src: [],
        dest: "",
        taskName: taskName
      },
      tasks = [];

      if (typeof(funcProps.output) == "string") {

        // Add all the source items to the array
        for (file in funcProps.files) {

          taskObj.src.push(src + jsFiles[funcProps.files[file]]);

        }

        // Get the destination
        taskObj.dest = dest + funcProps.output,

        // Add min to the config
        grunt.config('min.' + taskName, {
            src: taskObj.src,
            dest: taskObj.dest
        });

        // Return the finished task that name that was just defined to add to our task object.
        return ('min:' + taskObj.taskName);

      } else {

        for (file in funcProps.files) {

          // Clear out old aray value
          taskObj.src = [];

          // Setup the current source and destination 
          taskObj.src.push(src + jsFiles[funcProps.files[file]]);
          taskObj.dest = dest + funcProps.output[file];

          // Add min to the config
          grunt.config('min.' + taskObj.taskName + "-" + funcProps.files[file], {
              src: taskObj.src,
              dest: taskObj.dest
          });

        // Return the finished task that name that was just defined to add to our task object.
        tasks.push('min:' + taskObj.taskName + "-" + funcProps.files[file]);

        }

        // Send all of the different array values back
        return (tasks);


      }

    },

    // Less process and maybe concating
    less: function(taskName, src, dest, funcProps) {

      // Storage array for newly generated tasks
      var taskObj = {
        src: [],
        dest: dest + funcProps.output,
        taskName: taskName
      };

      // Must be an array of strings
      for (file in funcProps.files) {
        
        // Add all the source items to the array
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

    },

    // Copy files from one folder to another.
    copy: function(taskName, src, dest, funcProps) {

      // Storage array for newly generated tasks
      var taskObj = {
        src: "",
        dest: "",
        taskName: taskName
      };

      // Create the initual copy object.
      var copyObj = {
        files: {}
      };

      // Loop through and add the copy properties in accordingly.
      for (file in funcProps.files) {

        // Add the src item to the src property
        taskObj.src = (src + jsFiles[funcProps.files[file]]);

        // Add the dest item to the dest property.
        taskObj.dest = (dest + jsFiles[funcProps.files[file]]);

        // Create the task object
        copyObj.files[taskObj.dest] = taskObj.src;

      }

      grunt.config('copy.' + taskObj.taskName, copyObj);

      // Return the finished task that name that was just defined to add to our task object.
      return ('copy:' + taskObj.taskName);

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
      
              //subTask = prodBundles[argument].calls[call];
              taskName = prodBundles[argument].calls[call];
              bundle = prodBundles[taskName];

              // Execute this task
              taskExecuter(taskName, mode, bundle);

            }

              break;

          case "mixed":

            var origTask = argument;

            // Loop through all of the sub-bundles and execute them in the order they are declared.
            
            for (call in prodBundles[argument].calls) {
              
              taskName = prodBundles[argument].calls[call];
              bundle = prodBundles[taskName];

              // Execute this task
              taskExecuter(taskName, mode, bundle);

            }
            

            // Build the original called item now that dependencies have been reached
            bundle = prodBundles[argument];

            // Execute this task
            taskExecuter(origTask, mode, bundle);

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

          // Task array
          var origTask = taskName;

          // Loop through all of the sub-bundles and execute them in the order they are declared.
          for (call in prodBundles[origTask].calls) {
            
            taskName = prodBundles[origTask].calls[call];
            bundle = prodBundles[taskName];

            // Execute this task
            taskExecuter(taskName, mode, bundle);

          }

            break;

        case "mixed":

          // Task array
          var origTask = taskName;

          // Loop through all of the sub-bundles and execute them in the order they are declared.
          for (call in prodBundles[origTask].calls) {
            
            taskName = prodBundles[origTask].calls[call];
            bundle = prodBundles[taskName];

            // Execute this task
            taskExecuter(taskName, mode, bundle);

          }

          // Build the original called item now that dependencies have been reached
          bundle = prodBundles[origTask];

          // Execute this task
          taskExecuter(taskName, mode, bundle);

            break;
      }

    }

  }

  function taskExecuter(taskName, mode, bundle) {

    grunt.log.writeln(taskName + " " + mode);


    if (bundle.hasOwnProperty('mode')) {
      grunt.log.writeln('has mode');
    } else {
      grunt.log.writeln('missing mode');
    }

    var tasks = [];

    // Pull the asset types we are going to manipulate in this mode.
    assetTypes = bundle.mode[mode];

    // Loop will go throught all the different asset types (js/css/both)
    for (type in assetTypes) {

      // Save off all of the function types
      var functions = assetTypes[type];

      // Loop will go through all of the function objects
      for (func in functions) {

        // Save off the action number
        var actions = functions[func];

        // Loop through all of the individual functions
        for (action in actions) {

          // Execute the actions based on the action name.
          switch(action) {

            // We are concating files
            case "concat":
              tasks.push(bFuncs.concat(taskName, fStructure[mode][type].src, fStructure[mode][type].dest, actions[action]));
              break;

            // We are minifiying JavaScript
            case "min":
              tasks = tasks.concat(bFuncs.min(taskName, fStructure[mode][type].src, fStructure[mode][type].dest, actions[action]));
              break;

            // Wa are compiling less, possible minifiying
            case "less":
              tasks.push(bFuncs.less(taskName, fStructure[mode][type].src, fStructure[mode][type].dest, actions[action]));
              break;

            // We are copying files
            case "copy":
              tasks.push(bFuncs.copy(taskName, fStructure[mode][type].src, fStructure[mode][type].dest, actions[action]));
              break;

          }

        } 

      }

    } // End all of the looping!

    // Execute all tasks
    grunt.task.run(tasks);

  }

  // Adds module for grunt
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');

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

  // Help Definition
  grunt.registerTask('help', 'Execute help (command list) build', function(){

    grunt.log.writeln('Enter the command "grunt" will preform the development build.');
    grunt.log.writeln(''); // Blank line
    grunt.log.writeln('To define a production build enter the command "grunt prod.'); 
    grunt.log.writeln('');
    grunt.log.writeln('To execute a particular sub task, enter the command "grunt mode:command"');
    grunt.log.writeln('"mode refers to either dev or prod. "command"');
    grunt.log.writeln('"command" refers to one of the following task:');
    grunt.log.writeln(''); // Blank line
    grunt.log.writeln(''); // Blank line


    for (task in prodBundles) {

      grunt.log.writeln('Command:     ' + task);
      grunt.log.writeln('Description: ' + prodBundles[task].description);
      grunt.log.writeln(''); // Blank line

    }

  });

  // Default task. Override to manually call it ourselves
  grunt.registerTask('default', function() {

    // Pipe all generic 'grunt' calls through to 'dev'
    grunt.task.run('dev');

  });

};
