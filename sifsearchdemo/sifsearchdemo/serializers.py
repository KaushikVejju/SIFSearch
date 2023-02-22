'''
There are two serializer classes: EntrySerializer and EntryFileSerializer. This is to handle
the event that the user makes an entry that includes a link or one that includes a file.
'''
from rest_framework import serializers
from nbformat import read, NO_CONVERT
import openai
openai.api_key = "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" #TODO: move this somewhere else
from .models import SearchEntry,Tag, NotebookEntry, CodeBlockEntry

class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchEntry
        fields = ['name', 'description', 'link','tag']

class EntryFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchEntry
        fields = ['name', 'description', 'file','tag', 'file_name']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['tag']

class NotebookSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotebookEntry
        fields = ['name', 'description', 'tag', 'file']

class CodeBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeBlockEntry
        fields = ['code', 'explanation', 'notebook']

def get_inference(prompt):
    # Set the maximum number of tokens to generate in the response
    max_tokens = 1024
    model_engine = "text-davinci-003"

    # Generate a response
    completion = openai.Completion.create(
        engine=model_engine,
        prompt=prompt,
        max_tokens=max_tokens,
        temperature=0.5,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    # Print the response
    return completion.choices[0].text

#Notebook stuff
def gpt3_notebook(file):
    """
    Takes in the file path to a jupyter notebook and then
    returns a list of code blocks and associated explanations
    
    Return value is like [[code, explanation]]
    
    TODO: also add support for non-code blocks
    TODO: better initial prompt with more context
    """
    with open(file) as fp:
        notebook = read(fp, NO_CONVERT)
    cells = notebook["cells"]
    code_cells = [c for c in cells if c['cell_type'] == 'code']
    
    refs = []
    boiler_plate = "This code is from a quantitative finance club. The goal is to develop automated trading algorithms. Explain this code:"

    for cell in code_cells:
        ans = get_inference(boiler_plate + cell["source"])
        refs.append([cell["source"], ans])
    
    return refs

