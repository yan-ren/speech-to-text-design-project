TODO:
1.  Audio file convension
  Requirements:
  - input audio file in mutiple format and mutiple channel
  - output audio file in SLAC format and in sigle channel(mono)
  - develop code in "test" folder
  Refer to following google document for details
  - https://cloud.google.com/speech/reference/rest/v1/RecognitionConfig#AudioEncoding

2.  backend functions for retrieve audio file from GCS

3.  frontend mock
  - https://github.com/glitchdigital/video-transcriber
  - https://codepen.io/VietRC/pen/bLGLMr

    Instructions:

    - Play the video

    - Click display english script

    - Select the part and see the magic

    NOTE : File format is an VTT but it can be transformed from an srt.

    SRT TO VTT Examble via nodejs : https://www.npmjs.com/package/vtt-to-srt

  - https://www.gridbox.io/
  - https://avocode.com/design-to-code/?lng=en



FUTURE:
1.  split file

2.  convert video

3.  ISSUE long file translation
https://blog.robseder.com/2013/10/18/executing-a-long-running-process-from-a-web-page/


TESTING:
1.  setup testing structure for db, frontend js and backend controllers

2.  test with large file.
    currently has been tested with:  mp3 44s 691kb

    api sends file and receives result longer than response timeout
      idea: frontend adds progress bar for showing backend running process status
      https://www.codeproject.com/Articles/34072/Displaying-a-Progress-Bar-Loading-Box-During-any-T

      STUDY:
      1.  js anyc callback function
      https://www.youtube.com/watch?v=YxWMxJONp7E&list=PL4cUxeGkcC9jAhrjtZ9U93UMIhnCc44MH

      2.  js mutiple callback function

      3.  Video transcription tool
      https://medium.com/glitch-digital/preview-of-a-video-transcription-tool-452e043daef5?from=groupmessage&isappinstalled=0
