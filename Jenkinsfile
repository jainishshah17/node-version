node {
        stage 'Clone'
            git url: 'https://github.com/jainishshah17/node-version.git'

        stage 'Dependencies'
            sh 'npm --version'
            sh 'npm install'
            sh 'npm test'

        stage 'Build'
            def rtDocker = Artifactory.docker("admin", "password")
            tagName = "jfrog.local:5001/node-version"
            docker.build(tagName)
            rtDocker.push(tagName, "docker")

        stage 'Test'
             tag = "jfrog.local:5001/node-version"
             docker.image(tag).withRun('-p 3000:3000') {c ->
             sleep 10
             def stdout = sh(script: 'curl "http://localhost:3000/"', returnStdout: true)
                 if (stdout.contains("Package Version is: ")) {
                     println "*** Passed Test: " + stdout
                 } else {
                     println "*** Failed Test: " + stdout
                     result = false
                 }
             }
             sh "docker rmi ${tag}"

        stage 'Deploy'
             tag = "jfrog.local:5001/node-version"
             sh "docker rm -f node-version"
             sh "docker pull ${tag}"
             sh "docker run -d -p 3000:3000 --name node-version ${tag}"
}