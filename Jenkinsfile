node {
        def rtServer = Artifactory.server 'artifactory-ha'
        def buildInfo = Artifactory.newBuildInfo()
        buildInfo.env.capture = true
        tag = "jfrog.local:5001/node-version"
        tag2 = "jfrog.local:5001/node-version:${BUILD_NUMBER}"

        stage 'Clone'
            git url: 'https://github.com/jainishshah17/node-version.git'

        stage 'Dependencies'
            withNPM(npmrcConfig: '0c42890f-07d6-4547-97f4-a780e8a9157c') {
                sh 'npm --version'
                sh 'npm cache clean'
                sh 'npm install'
                sh 'npm test'
            }

        stage 'Build'
            def rtDocker = Artifactory.docker("jenkins", "artifactory")
            docker.build(tag)
            docker.build(tag2)
            rtDocker.push(tag, "docker", buildInfo)
            rtDocker.push(tag2, "docker", buildInfo)
            buildInfo.env.collect()
            rtServer.publishBuildInfo buildInfo

        stage 'Test'
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
             sh "docker rmi ${tag2}"

        stage 'Deploy'
             tag = "jfrog.local:5001/node-version"
             sh "docker rm -f node-version"
             sh "docker pull ${tag}"
             sh "docker run -d -p 8087:3000 --name node-version ${tag}"
}