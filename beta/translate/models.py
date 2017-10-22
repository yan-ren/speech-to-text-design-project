from django.db import models

class Srt(models.Model):
    name = models.CharField(max_length=250)


class Video(models.Model):
    name = models.CharField(max_length=250)


class Audio(models.Model):
    name = models.CharField(max_length=250)
