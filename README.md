# Speech to Text Design Project

This is a project made by a student group from McGill University as a design course project. Team member: Robyn Chen, Fei Feng, Yan Ren, Even Wang

This project would not have been possible without the help and kind support of our supervisors and the Radio-Canada Digital R&D Lab team. We would like to express our deepest appreciation to Xavier K. Richard and Thomas Le Jouan for their guidance and supervision as well as for providing support throughout the entire part one of this design project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

* [MongoDB](https://www.mongodb.com/) - The backend database used
* [NodeJS](https://nodejs.org/en/) - The web framework used

### Database setup

In app.js, find the code

```
mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });
```

Replace with the database you are using.

Create two collections:
* media
* subs

### Server setup

Install the dependencies

```
npm install
```

Start the backend

```
node app.js
```

### Google Cloud Platform setup

Create Google Cloud Platform account and activate [Cloud Storage](https://cloud.google.com/storage/) and [Cloud Speech API](https://cloud.google.com/speech/).

After Google Cloud Platform account, store the [JSON key file](https://cloud.google.com/storage/docs/authentication) in project root directory.

In /controller/storage.js, find the code
```
const bucketName = 'speech-to-text-sandbox';
const keyFileLocation = path.join(__dirname, '..', 'speech-to-text-sandbox-9b4c51ccdb39.json');
```
Replace with your JSON key file and cloud storage bucket.

In /controller/stt.js, find the code
```
const keyFileLocation = path.join(__dirname, '..', 'speech-to-text-sandbox-9b4c51ccdb39.json');
```
Replace with you JSON key file.

## Test the project

Use .flac mono channel file to test the project.

[https://cloud.google.com/speech/reference/rest/v1/RecognitionConfig#AudioEncoding]()
