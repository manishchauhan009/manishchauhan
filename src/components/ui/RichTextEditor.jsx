"use client";

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <div className="h-64 flex items-center justify-center text-gray-500 bg-white/5 rounded-xl">Loading Editor...</div>
});

export default function RichTextEditor({ value, onChange }) {

    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            ['blockquote', 'code-block'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    }), []);

    return (
        <div className="rich-text-editor-wrapper">
            <style jsx global>{`
                .rich-text-editor-wrapper .ql-toolbar {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.1) !important;
                    border-radius: 0.75rem 0.75rem 0 0;
                    color: white;
                }
                .rich-text-editor-wrapper .ql-container {
                    background: rgba(255, 255, 255, 0.02);
                    border-color: rgba(255, 255, 255, 0.1) !important;
                    border-radius: 0 0 0.75rem 0.75rem;
                    color: #e2e8f0;
                    font-size: 1rem;
                    min-height: 400px;
                }
                .rich-text-editor-wrapper .ql-picker {
                    color: #a0aec0;
                }
                .rich-text-editor-wrapper .ql-stroke {
                    stroke: #a0aec0 !important;
                }
                .rich-text-editor-wrapper .ql-fill {
                    fill: #a0aec0 !important;
                }
                .rich-text-editor-wrapper .ql-picker-options {
                    background-color: #1a202c !important;
                    border-color: rgba(255, 255, 255, 0.1) !important;
                    color: white;
                }
                .rich-text-editor-wrapper .ql-editor {
                    min-height: 400px;
                }
                .rich-text-editor-wrapper .ql-picker-label:hover,
                .rich-text-editor-wrapper button:hover .ql-stroke {
                    stroke: #fff !important;
                }
            `}</style>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
            />
        </div>
    );
}
