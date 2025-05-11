pipeline {
  agent any

  environment {
    IMAGE = 'ahmedabualkhair/nodeopsx-app'
    TAG = "${BUILD_NUMBER}"
    GIT_MANIFESTS_REPO = 'https://github.com/ahmedaboalkhair/nodeopsx-manifests.git'
  }

  stages {
    stage('Build & Push Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
            docker build -t $IMAGE:$TAG .
            docker push $IMAGE:$TAG
            docker tag $IMAGE:$TAG $IMAGE:latest
            docker push $IMAGE:latest
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'github-token', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
          sh '''
            rm -rf nodeopsx-manifests
            git clone https://$GIT_USER:$GIT_PASS@github.com/ahmedaboalkhair/nodeopsx-manifests.git
            cd nodeopsx-manifests

            sed -i "s|image:.*|image: $IMAGE:$TAG|" deployment.yaml

            kubectl apply -f deployment.yaml
            kubectl apply -f service.yaml
          '''
        }
      }
    }
  }
}
