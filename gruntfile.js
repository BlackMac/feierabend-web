//Gruntfile
module.exports = function(grunt) {
//Initializing the configuration object
grunt.initConfig({
watch: {
// Folders and files that are being watched by grunt
// Add your additonal project files and folders here!
files: ["js/**/*.js", "tests/**/*.js", "tests/index.html"],
options: {
livereload: true
}
}
});

// Plugin loading
grunt.loadNpmTasks('grunt-contrib-watch');

// Set watch as the default task
grunt.registerTask('default', ['watch']);
};
