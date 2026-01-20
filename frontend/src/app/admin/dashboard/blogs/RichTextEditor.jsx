'use client';

import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import 'quill/dist/quill.snow.css';

const RichTextEditor = forwardRef((props, ref) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [Quill, setQuill] = useState(null);

  useEffect(() => {
    // Dynamic import of Quill to avoid SSR
    import('quill').then((QuillModule) => {
      setQuill(() => QuillModule.default); // Save Quill in state

      if (editorRef.current) {
        quillRef.current = new QuillModule.default(editorRef.current, {
          theme: 'snow',
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['clean'],
            ],
          },
          placeholder: 'Write something...',
        });
      }
    });

    return () => {
      quillRef.current = null;
    };
  }, []);

  useImperativeHandle(ref, () => ({
    getContent: () => quillRef.current?.root.innerHTML || '',
  }));

  return <div ref={editorRef} style={{ height: '300px' }} />;
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
