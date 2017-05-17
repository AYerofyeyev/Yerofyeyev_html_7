module.exports = function(grunt) {

  // 1. Вся настройка находится здесь
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    sass: {
      dist: {
        files: {
          "css/style.css": "css/*.scss"
        }
      }
    },

    postcss: {
      options: {
        map: true, // inline sourcemaps

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: ['last 4 versions']}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
        dist: {
          src: 'css/style.css'
        }
    },

    concat: {
      // 2. Настройка для объединения файлов находится тут
      dist: {
        src: [
          "js/libs/*.js",
          "js/main.js"
        ],
        dest: "js/script.js"
      }
    },

    uglify: {
      build: {
        src: "js/script.js",
        dest: "js/script.min.js"
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: "img/",
          src: ["**/*.{png,jpg,gif}"],
          dest: "img/build/"
        }]
      }
    },

    browserSync: {
      bsFiles: {
        src : 'css/*.css'
      },
      options: {
        server: {
            baseDir: "./"
        }
      }
    },

    watch: {
      sass: {
        files: ["css/*.scss"],
        tasks: ["sass"]
      },
      js: {
        files: ["js/main.js", "js/lib/*.js"],
        tasks: ["concat", "uglify"]
      }
    }

  });

  // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // require('load-grunt-tasks')(grunt);

  // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
  grunt.registerTask("default", ["sass", "postcss", "concat", "uglify", "imagemin", "browserSync"]);

};
