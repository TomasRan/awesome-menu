module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/* <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy")%>*/\n',
				sourceMap: true
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': '<%= pkg.name %>.js'
				}
			}	  
		},
		watch: {
			files: ['<%= pkg.name%>.js'],
			tasks: ['uglify']	
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('watch',  ['watch']);
	grunt.registerTask('default',  ['uglify']);
};
