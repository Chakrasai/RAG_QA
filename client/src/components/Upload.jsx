import React from 'react';

function Upload() {
    
return (
    <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
        <p className="text-gray-600 mb-2">Drag and drop your document here or click to select a file.</p>
        <input type="file" className="w-full bg-white border-2 border-dashed border-blue-400 rounded-xl p-6 text-center text-blue-600 font-semibold hover:bg-blue-50 transition" />
        <span role="img" aria-label="Upload Document">📤 Upload Document</span>
    </div>
);
}

export default Upload;