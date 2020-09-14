import React from "react";
import { Document, Page, pdfjs } from "react-pdf"; 
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import { 
  useParams, Redirect
} from 'react-router-dom';

function PdfRenderer(){

  const params = useParams();
  const fileName = `./${params.file}.pdf`; 
  return (
    <div className="d-flex justify-content-center" 
      style={{
        paddingTop: '100px'
      }}
    >
      <Document file={fileName}
        onLoadError={console.error}

      >
        <Page pageNumber={1} width={800}/>
      </Document>
    </div>
  );
}

export default PdfRenderer;