module.exports = function(grunt) {
  // Do grunt-related things in here
  
  // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        
        // Automatically run a task when a file changes
        watch: {
            css: {
                files: ["css/*.less", "!css/*.css"],
                tasks: ['cssroutine']
            },
            js: {
                files: ["js/*.js", "!js/*.min.js"],
                tasks: ['jsroutine']
            },
        },
        
        
        //Compile specified less files
        less: {
            development: {
                files: {
                    "css/main.css": "css/main.less"
                }
            }
        },
        
        
        // Compress generated css files
        cssmin: {
            minify: {
                expand: true,
                cwd: 'css/',
                src: ['*.css', '!*.min.css'],
                dest: 'css/',
                ext: '.min.css'
            }
        },
        
        
        // UglifyJS
        uglify: {
            minify: {
              files: {
                'js/script.min.js': ['js/plugins.js', 'js/plugins-desktop.js', 'js/main.js'],
                'js/script-mobile.min.js': ['js/plugins.js', 'js/main.js'],
              }
            }
          },
          
        
        //Prefix CSS3 properties
        autoprefixer: {
            dist: {
                  files: {
                        'css/main.css': ['css/main.css']
                  }
            }
        },
        
        //SVGMinifier
        svgmin: {                                            // Task
            options: {                                        // Configuration that will be passed directly to SVGO
                plugins: [{
                    removeViewBox: false
                }]
            },
            dist: {                                            // Target              
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['*.svg'],
                    dest: 'img/',
                    ext: '.svg'
                }]
            }
        },

        //SVG2PNG
        svg2png: {
            all: {
                files: [
                { src: ['img/*.svg']}
                ]
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-svg2png');
    
    
    //Watch
    grunt.registerTask('cssroutine', ['less:development', 'autoprefixer:dist', 'cssmin:minify']);
    grunt.registerTask('jsroutine', ['uglify:minify']);

};