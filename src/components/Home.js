import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import setReport from '../store/actions';
import {useDispatch} from 'react-redux';
import XLSX from 'xlsx';
import Icon from '@mdi/react';
import {mdiProgressUpload} from '@mdi/js';
import '../styles/Home.css';

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [parseError, setParseError] = useState(false);
  function parseExcel(event) {
    let file = event.target.files[0];
    const promise = new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = (e) => {
        let bufferArray = e.target.result;
        let wb = XLSX.read(bufferArray, {type: "buffer", cellDates: true, dateNF:'dd-mm-yyyy'});
        let ws = wb.Sheets[wb.SheetNames[0]];
        let jsonData = XLSX.utils.sheet_to_json(ws, {header: 1, dateNF:'dd-mm-yyyy'});
        resolve(jsonData);
      }
      reader.onerror = (err) => {
        reject(err);
      }
      reader.readAsArrayBuffer(file);
    });
    promise.then((response) => {
      setParseError(false);
      let report = {
        cols: response[0],
        rows: response.slice(1)
      };
      dispatch(setReport(report));
      history.push("/report");
    }).catch((err) => {
      setParseError(true);
    })
    
  }
  return (
    <div className="home">
      <input id="file-upload" type="file"
      accept=".xls, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={parseExcel} />
      <label htmlFor="file-upload" className="file-upload-label">
        <Icon path={mdiProgressUpload} size={4} color="#333" />
      </label>
      <p>Upload/ Change File</p>
      {parseError && <p>Error reading file! Try another file.</p>}
    </div>
  );
}

export default Home;