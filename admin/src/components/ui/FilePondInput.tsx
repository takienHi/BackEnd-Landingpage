import { useState } from 'react';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
// import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.min.css';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import FilePondPluginImageEditor from '@pqina/filepond-plugin-image-editor';

// pintura
import '@pqina/pintura/pintura.css';
import {
  // editor
  openEditor,
  locale_en_gb,
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultImageOrienter,
  createDefaultShapePreprocessor,
  legacyDataToImageState,
  processImage,

  // plugins
  setPlugins,
  plugin_crop,
  plugin_crop_locale_en_gb,
  plugin_finetune,
  plugin_finetune_locale_en_gb,
  plugin_finetune_defaults,
  plugin_filter,
  plugin_filter_locale_en_gb,
  plugin_filter_defaults,
  plugin_annotate,
  plugin_annotate_locale_en_gb,
  markup_editor_defaults,
  markup_editor_locale_en_gb,
} from '@pqina/pintura';

registerPlugin(
  FilePondPluginImageResize,
  // FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginFileValidateType,
  FilePondPluginImageEditor,
  FilePondPluginFilePoster
);

setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

type FilePondInputProps = {
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
};

const FilePondInput = ({ files, setFiles }: FilePondInputProps) => {
  return (
    <div>
      <FilePond
        files={files}
        onupdatefiles={(f: any) => {
          console.log(f[0].file), setFiles(f);
        }}
        acceptedFileTypes={['image/*']}
        allowMultiple={false}
        instantUpload={false}
        server='/api'
        name='files'
        /* @ts-ignore on roadmap to be fixed */
        filePosterMaxHeight={256}
        /* @ts-ignore on roadmap to be fixed */
        imageEditor={{
          // map legacy data objects to new imageState objects
          legacyDataToImageState: legacyDataToImageState,

          // used to create the editor, receives editor configuration, should return an editor instance
          createEditor: openEditor,

          // Required, used for reading the image data
          imageReader: [
            createDefaultImageReader,
            {
              /* optional image reader options here */
            },
          ],

          // optionally. can leave out when not generating a preview thumbnail and/or output image
          imageWriter: [
            createDefaultImageWriter,
            {
              /* optional image writer options here */
            },
          ],

          // used to generate poster images, runs an editor in the background
          imageProcessor: processImage,

          // editor options
          editorOptions: {
            imageOrienter: createDefaultImageOrienter(),
            shapePreprocessor: createDefaultShapePreprocessor(),
            ...plugin_finetune_defaults,
            ...plugin_filter_defaults,
            ...markup_editor_defaults,
            locale: {
              ...locale_en_gb,
              ...plugin_crop_locale_en_gb,
              ...plugin_finetune_locale_en_gb,
              ...plugin_filter_locale_en_gb,
              ...plugin_annotate_locale_en_gb,
              ...markup_editor_locale_en_gb,
            },
          },
        }}
      />
    </div>
  );
};

export default FilePondInput;
