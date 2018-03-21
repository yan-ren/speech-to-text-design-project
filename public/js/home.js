// $('#_file').on('click', function() {
//   // $('#upload-input').click();
//   $('.progress_bar').text('0%');
//   $('.progress_bar').width('0%');
// });

$('#_file_form').submit(function(event) {
  event.preventDefault();
  console.log('start uploading');
  $('#loading_bar').css({'display' : 'block'});

  if ($('input[type=file]')[0].files.length == 0) {
    console.log('no file selected');
    return;
  }
  if(!Validate($('input[type=file]')[0].files[0].name)){
    return;
  }

  var data = new FormData();

  data.append('SelectedFile', $('input[type=file]')[0].files[0]);
  data.append('fileName', $('input[type=file]')[0].files[0].name);
  data.append('fileType', document.querySelector('input[name="type"]:checked').value);
  data.append('fileLanguage', document.querySelector('input[name="language"]:checked').value);

  $.ajax({
    url: '/storage',
    type: 'POST',
    data: data,
    processData: false,
    contentType: false,
    success: function(data) {
      $('#loading_bar').css({'display' : 'none'});
      location.reload(true);
      // console.log('upload successful! ' + data);
    },
    xhr: function() {
      // create an XMLHttpRequest
      var xhr = new XMLHttpRequest();

      // listen to the 'progress' event
      // xhr.upload.addEventListener('progress', function(evt) {
      //
      //   if (evt.lengthComputable) {
      //     // calculate the percentage of upload completed
      //     var percentComplete = evt.loaded / evt.total;
      //     percentComplete = parseInt(percentComplete * 100);
      //
      //     // update the Bootstrap progress bar with the new percentage
      //     $('.progress_bar').width(percentComplete + '%');
      //     $('.progress_bar').text(percentComplete + '%');
      //
      //     // once the upload reaches 100%, set the progress bar text to done
      //     if (percentComplete === 100) {
      //       $('.progress_bar').html('Done');
      //     }
      //
      //   }
      //
      // }, false);

      return xhr;
    },
  });
});

var _validFileExtensions = [".flac", ".mp3"];

function Validate(sFileName) {

  if (sFileName.length > 0) {
    var blnValid = false;
    for (var j = 0; j < _validFileExtensions.length; j++) {
      var sCurExtension = _validFileExtensions[j];
      if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
        blnValid = true;
        break;
      }
    }

    if (!blnValid) {
      alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
      return false;
    }
  }
  return true;
}
