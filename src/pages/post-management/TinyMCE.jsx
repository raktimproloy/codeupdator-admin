import React from 'react'
import { Editor } from '@tinymce/tinymce-react';

function TinyMCE({text, setText, value, setValue}) {
  return (
    <Editor 
        apiKey={"6djxd8rcnpygxvmvu8lxrhlgeoiwku9qkxyb39ttkd3088tb"}
        onEditorChange={(newValue, editor) => {
        setValue(newValue)
        setText(editor.getContent({format:"text"}))
        }}
        onInit={(evt, editor) => {
        setText(editor.getContent({format: "text"}))
        }}
        
        init={{
            height: 500,
            menubar: false,
            plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', "codesample"
            ],
            toolbar: 'undo redo | blocks ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | codesample code help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            codesample_global_prismjs: true,
        }}
    />
  )
}

export default TinyMCE