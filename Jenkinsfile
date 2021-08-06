#!groovy

pipeline {
  agent { label 'ecs-builder-node12' }
  options {
    ansiColor('xterm')
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }

  stages {
    stage('Build') {
      steps {
        initBuild()

        sh 'yarn install'
        sh 'yarn lint'
      }
    }

    stage('deploy prerelease npm package') {
      when {
        beforeAgent true
        not { branch 'master' }
      }
      steps {
        publishNpmPackagePreRelease('.')
      }
    }

    stage('deploy npm package') {
      when {
        beforeAgent true
        branch 'master'
      }
      steps {
        runSemanticRelease()
      }
    }
  }
}
