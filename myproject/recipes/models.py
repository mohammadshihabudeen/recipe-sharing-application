from django.db import models

class Recipe(models.Model):
    title = models.CharField(max_length=100)
    ingredients = models.TextField()
    instructions = models.TextField()
    image = models.ImageField(upload_to='recipes/', blank=True, null=True)  # Add this line
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
