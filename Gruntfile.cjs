module.exports = function (grunt) {
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Exemple de tâche
        hello: {
            options: {},
            files: {},
        },
    });

    // Chargement des plugins nécessaires
    grunt.loadNpmTasks('grunt-contrib-uglify'); // Exemple de plugin

    // Enregistrement des tâches par défaut
    grunt.registerTask('default', []);
};
