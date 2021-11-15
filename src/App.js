import { useRef, useState } from 'react';
import qrcode from "qrcode-generator";
import Pdf from "react-to-pdf";
import './App.css';

const options = {
  orientation: 'portrait',
  unit: 'mm',
  format: [210, 297]
};

function App() {
  const [qrcodeData, setQrcodeData] = useState("");
  const [qrcodes, setQrcodes] = useState([]);
  const ref = useRef();
  return (
    <div className="App">
      <div className="form">
        <div className="label">Digite os valores separado por vírgula</div>
        <textarea
          className="values"
          onChange={(evt) => setQrcodeData(evt.target.value)}
        ></textarea>
        <button onClick={() => {
          const qrcodeValues = qrcodeData.split(",")
            .map(item => {
              var qr = qrcode(0, "H");
              qr.addData(encodeURI(item));
              qr.make();
              return {
                image: qr.createImgTag(5, 16),
                label: item
              };
            });
          setQrcodes(qrcodeValues);
        }}>Gerar</button>
      </div>
      <div className="resultContainer">
        <Pdf targetRef={ref} filename="code-example.pdf" options={options}>
          {({ toPdf }) => <button onClick={toPdf}>Exportar</button>}
        </Pdf>
        <div className="result" ref={ref}>
          {
            qrcodes.map(qrcodeInfo => {
              return (
                <div
                  className="qrcode-container"
                  key={qrcodeInfo.label}
                >
                  <div className="qrcode-label">
                    {
                      qrcodeInfo.label
                    }
                  </div>
                  <div
                    className="qrcode-image"
                    dangerouslySetInnerHTML={{ __html: qrcodeInfo.image }}
                  />
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
