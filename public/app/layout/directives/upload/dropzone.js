/**
 * Created by Shawn Miller on 6/30/2015.
 * Path: public/app/layout/directives/upload/smartDropzone.js
 * Notes: See http://www.dropzonejs.com/ for options and operation
 */
define(['layout/module', 'dropzone'], function (module) {

    'use strict';

    return module.registerDirective('dropzone', function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, tElement, tAttributes) {
                tElement.removeAttr('dropzone data-dropzone');

                scope.fileDropZone = tElement.dropzone({
                    url: "/api",
                    addRemoveLinks: true,
                    //acceptedFiles: tAttributes.acceptedFiles,
                    maxFilesize: 500, // MB
                    autoProcessQueue: false,
                    uploadMultiple: true,
                    headers: {'Content-Type': undefined},
                    parallelUploads: 100,
                    maxFiles: 100,
                    dictDefaultMessage: '<span class="text-center"><span class="font-lg"><span class="font-lg"><i class="fa fa-caret-right text-danger"></i> Drop files <span class="font-xs">to upload</span></span><span>&nbsp&nbsp<h4 class="display-inline"> (Or Click)</h4></span>',
                    dictResponseError: 'Error uploading file!'
                });

                /************************************************************
                 * DropZone iteration class		                            *
                 ************************************************************/
                scope.dzFilesIteration = function(dropZoneInstance){

                    var InstanceDropZone = dropZoneInstance;//Init DropZone
                    var files = dropZoneInstance.files;
                    if (this instanceof scope.dzFilesIteration) {
                        this.files = files;
                    } else {
                        return new scope.dzFilesIteration(dropZoneInstance);
                    }
                    //Marks upload success on POST success.
                    this.markFileUploadSuccess=function(){
                        try{
                            for(var i=0;i<this.files.length;i++)
                                InstanceDropZone.emit('success', this.files[i],'','');
                        }catch(e){

                        }
                    };
                    //Validates the length of file name
                    this.validateFile = function(){
                        var validFileNameLength = true;

                        try{
                            for(var i=0;i<this.files.length;i++){
                                if(this.files[i].invalid)
                                    return false;
                            }
                        }catch(e){

                        }
                        return validFileNameLength;
                    };
                    //Tag all files when upload fails.
                    this.emitErrors = function(){
                        for(var i=0;i<this.files.length;i++)
                            InstanceDropZone.emit('error', this.files[i], $rootScope.getWord('UploadingFailed'));
                    };
                    this.countInvalidFiles = function(){
                        var invalidFilesCount = 0;

                        for(var i=0;i<this.files.length;i++){
                            if(this.files[i].invalid)
                                invalidFilesCount++;
                        }

                        return invalidFilesCount;
                    };

                };
            }
        }
    });
});
