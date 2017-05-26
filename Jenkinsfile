node {
        stage 'Clone'
            git url: 'https://github.com/jainishshah17/node-version.git'

        stage 'Test'
            sh 'npm --version'
            sh 'npm install'
            sh 'npm test'

        stage 'Build'
            def rtDocker = Artifactory.docker("admin", "password")
            tagName = "jfrog.local:5001/node-version:${env.BUILD_NUMBER}"
            docker.build(tagName)
            rtDocker.push(tagName, "docker")
}