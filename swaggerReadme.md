#starting with swagger 

First we need to import the module using 
# npm install swagger --save 

Lets get started .

#swagger create project project_name

#swagger commands.
swagger always looks for the api folder in your root directory.

the editing the api docs :
#hit command : swagger project edit.
Now you will be able to edit the api doc.

#instrunction :
Swagger tool will create a Yaml file,so we need grunt to first convert the yaml file into json .so that we can view the api doc in swagger UI.

command for converting Yaml to json:
@ grunt yaml


