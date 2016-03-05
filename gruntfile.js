module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    imagemin: {                          
        dynamic: { 
            options: {
                
            },
            files: [{
                expand: true,                  
                cwd: '_site/images', // src                 
                src: ['**/*.{gif,png,jpg}'],   
                dest: '_site/images' // dest               
          }]
        }
    },

    uglify: {
      build: {
        src: ['_site/scripts/main.js'],
        dest: '_site/scripts/main.js'
      }
    },

    autoprefixer: {
      dist: {
        options: {
          // Default value: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
          browsers: ['ie >= 10']
        },
        files: {
          '_site/css/main.css' : '_site/css/main.css' // 'destination': 'source'
        }
      }
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('build', ['uglify', 'autoprefixer', 'imagemin']); 

};
