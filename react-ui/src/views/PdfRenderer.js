import React from "react";
import { Document, Page, pdfjs } from "react-pdf"; 
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import { 
  useParams, useHistory
} from 'react-router-dom';

function PdfRenderer(){
  const history = useHistory();
  const redirectTo404 = () => {
    history.push('/404');
  };
  const params = useParams();
  const fileName = `./${(params.file).toLowerCase()}.pdf`;  
  return (
    <div className="d-flex justify-content-center" 
      style={{
        paddingTop: '100px'
      }}
    >
      <Document file={fileName}
        onLoadError={redirectTo404}
      >
        <Page pageNumber={1} width={800}/>
      </Document>
    </div>
  );
}

export default PdfRenderer;