
$('#_file').on('click', function (){
    // $('#upload-input').click();
    $('.progress_bar').text('0%');
    $('.progress_bar').width('0%');
});

$('#_file_form').submit(function(event){
  event.preventDefault();
  console.log('start uploading');

  if($('input[type=file]')[0].files.length== 0){
    console.log('no file selected');
    return;
  }

  var data = new FormData();

  // data.append('SelectedFile', $('input[type=file]')[0].files[0]);
  data.append('FileName', $('input[type=file]')[0].files[0].value);
  data.append('FileType', document.querySelector('input[name="type"]:checked').value);
  data.append('FileLanguage', document.querySelector('input[name="language"]:checked').value);

  $.ajax({
      url: '/upload',
      type: 'POST',
      data: data,
      processData: false,
      contentType: false,
      success: function(data){
          console.log('upload successful!\n' + data);
      },
      xhr: function() {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function(evt) {

          if (evt.lengthComputable) {
            // calculate the percentage of upload completed
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);

            // update the Bootstrap progress bar with the new percentage
            $('.progress_bar').width(percentComplete + '%');
            $('.progress_bar').text(percentComplete + '%');

            // once the upload reaches 100%, set the progress bar text to done
            if (percentComplete === 100) {
              $('.progress_bar').html('Done');
            }

          }

        }, false);

        return xhr;
      }
    });
});
