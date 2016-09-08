angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicHistory, $rootScope, $window, $ionicPlatform, $cordovaCamera, $cordovaFileTransfer, $ionicActionSheet,$ionicLoading, LSFactory, Loader) {

//start of controller

var images = [];

$scope.data = { "ImageURI" :  "Select Image" };

        $scope.takePicture = function() {
        var options = {
            quality: 50,
            targetWidth: 300,
            targetHeight: 300,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA
          };
        $cordovaCamera.getPicture(options).then(
        function(imageData) {
          $scope.picData = imageData;
          images.push(imageData);
          $scope.ftLoad = true;
          window.localstorage.set('fotoUp', imageData);
          $ionicLoading.show({template: 'loading photo', duration:500});
        },
        function(err){
          $ionicLoading.show({template: 'EROOR IN GETTING', duration:500});
          })
        }

        $scope.selectPicture = function() { 
        var options = {
          quality: 50,
          targetWidth: 300,
          targetHeight: 300,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        };

        $cordovaCamera.getPicture(options).then(
        function(imageURL) {
          window.resolveLocalFileSystemURL(imageURL, function(fileEntry) {
            $scope.picData = fileEntry.nativeURL;
            images.push(fileEntry.nativeURL);
            $scope.ftLoad = true;
            var image = document.getElementById('myImage');
            image.src = fileEntry.nativeURL;
            });
          $ionicLoading.show({template: 'loading photo', duration:500});
        },
        function(err){
          $ionicLoading.show({template: 'EROOR IN GETTING', duration:500});
        })
      };

        $scope.uploadPicture = function() {
          if($scope.picData){
        Loader.showLoading('Uploading...');
        var fileURL = $scope.picData;
        var options = new FileUploadOptions();
        console.log("fileURL");
        console.log(fileURL);
        console.log("options");
        console.log(options);
        options.fileKey = "userfile";
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.chunkedMode = true;


        // var ft = new FileTransfer();
        // ft.upload(encodeURI("http://www.meanmentors.com/ipa/upload/upload.php"), fileURL, options);
            
            $cordovaFileTransfer.upload('http://meanmentors.com/api/index.php/example/upload', fileURL, options)
              .then(function(result) {
                console.log(result);
                Loader.hideLoading();
              }, function(err) {
                console.log(err);
              }, function (progress) {
                console.log(progress);
              });
            }
        }

        $scope.showActionsheet = function() {
        
        $ionicActionSheet.show({
          titleText: 'Choose Upload Option',
          buttons: [
            { text: '<i class="icon ion-camera"></i> From Camera' },
            { text: '<i class="icon ion-images"></i> From Gallery' },
          ],
          destructiveText: 'Delete',
          cancelText: 'Cancel',
          cancel: function() {
            console.log('CANCELLED');
          },
          buttonClicked: function(index) {
            console.log('BUTTON CLICKED', index);
            return true;
          },
           buttonClicked: function(index) {
                if(index === 0) {
                   $scope.takePicture();
                }
            
                if(index === 1) {
                   $scope.selectPicture();
                }
             },
          destructiveButtonClicked: function() {
            console.log('DESTRUCT');
            return true;
          }
        });
      };
  

//end of controller

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
