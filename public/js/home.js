
$('#_file').on('click', function (){
    // $('#upload-input').click();
    $('.progress_bar').text('0%');
    $('.progress_bar').width('0%');
});

$('#_file_form').submit(function(event){
  event.preventDefault();
  console.log('start uploading');
  if($('input[type=file]')[0].files === 0){
    console.log('no file selected');
    return;
  }

  var data = new FormData();

  data.append('SelectedFile', $('input[type=file]')[0].files[0]);
  data.append('FileType', document.querySelector('input[name="type"]:checked').value);
  data.append('FileLanguage', document.querySelector('input[name="language"]:checked').value);

  var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
      if(request.readyState == 4){
          try {
              var resp = JSON.parse(request.response);
              console.log(resp.status + ': ' + resp.data);
          } catch (e){
              var resp = {
                  status: 'error',
                  data: 'Unknown error occurred: [' + request.responseText + ']'
              };
          }
      }
  };

  request.upload.addEventListener('progress', function(e){
      var percent_complete = Math.ceil(e.loaded/e.total) * 100;
      $('.progress_bar').width(percent_complete + '%');
      $('.progress_bar').text(percent_complete + '%');

      // once the upload reaches 100%, set the progress bar text to done
      if (percent_complete === 100) {
        $('.progress_bar').html('Done');
      }
  }, false);

  request.open('POST', '/upload');
  request.send(data);
});
