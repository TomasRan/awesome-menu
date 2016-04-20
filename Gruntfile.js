module.exports = {
	grunt.initConfig({
		pkg: grun.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/* <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy")%>*/\n'			 
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
	grunt.registerTask('uglify',  ['uglify']);
};
