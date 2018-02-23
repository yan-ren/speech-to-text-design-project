1.  upload file with progress bar using following code
https://www.codeday.top/2017/07/07/30640.html
https://coligo.io/building-ajax-file-uploader-with-node/
issue: progress cache
https://stackoverflow.com/questions/18310038/xmlhttprequest-upload-onprogress-instantly-complete?noredirect=1&lq=1
//   var request = new XMLHttpRequest();
//   request.onreadystatechange = function(){
//       if(request.readyState == 4){
//           try {
//               var resp = JSON.parse(request.response);
//               console.log(resp.status + ': ' + resp.data);
//           } catch (e){
//               var resp = {
//                   status: 'error',
//                   data: 'Unknown error occurred: [' + request.responseText + ']'
//               };
//           }
//       }
//   };

//   request.upload.addEventListener('progress', function(e){
//       var percent_complete = Math.ceil(e.loaded/e.total) * 100;
//       $('.progress_bar').width(percent_complete + '%');
//       $('.progress_bar').text(percent_complete + '%');

//       // once the upload reaches 100%, set the progress bar text to done
//       if (percent_complete === 100) {
//         $('.progress_bar').html('Done');
//       }
//   }, false);

//   request.open('POST', '/upload');
//   request.send(data);

2.  mongoose using following source code
https://github.com/bradtraversy/bookstore
https://www.youtube.com/watch?v=eB9Fq9I5ocs

3.  IBM speech api restrictions
https://console.bluemix.net/docs/services/speech-to-text/input.html#input

4.  Google API restrictions
https://cloud.google.com/speech/quotas

5.  ffmpeg
http://www.ffmpeg.org/

6.  website templates
https://catbnb.glitch.me/

7.  glitch

8.  mLab

9. Goolge cloud storage
https://cloud.google.com/docs/authentication/production#obtaining_and_providing_service_account_credentials_manually
https://www.npmjs.com/package/@google-cloud/storage
API https://cloud.google.com/nodejs/docs/reference/storage/1.5.x/File#getSignedUrl
https://console.cloud.google.com/storage/browser/speech-to-text-sendbox?project=speech-to-text-sandbox-194702

10. Google cloud speech
API https://cloud.google.com/nodejs/docs/reference/speech/1.1.x/v1.SpeechClient#longRunningRecognize
file encoding https://cloud.google.com/speech/reference/rest/v1/RecognitionConfig#AudioEncoding
https://cloud.google.com/speech/docs/basics#time-offsets
