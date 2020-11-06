import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Icon from '@mdi/react';
import {mdiCheckCircleOutline, mdiCloseCircleOutline} from '@mdi/js';
import '../styles/Report.css';

function Report() {
  let dragElem = null;
  const history = useHistory();
  const sheet = useSelector(state => {
    return state;
  });
  const [cols, setCols] = useState(sheet?.cols?.map((col) => ({added: false, name: col})));
  const [report, setReport] = useState({});
  useEffect(() => {
    setCols(sheet?.cols?.map((col) => ({added: false, name: col})));
  }, [sheet]);

  function updateReport(name, index) {
    if (report[name]) return;
    let colData = sheet.rows.map((row) => {
      if(Object.prototype.toString.call(row[index]) === '[object Date]') return row[index].toLocaleDateString();
      return row[index];
    });
    setReport((report) => ({...report, [name]: colData}));
    let newCols = [...cols];
    newCols[index].added = true;
    setCols(newCols);
  }

  function removeFromReport(key) {
    let {[key]: toRemove, ...after} = report;
    setReport(after);
    let newCols = cols.map((col) => {
      if(col.name == key) return {added: false, name: col.name};
      return col;
    });
    setCols(newCols);
  }

  function dragStart(event, name, index) {
    dragElem = [name, index];
  }

  function dragEnd(event) {
    dragElem = null;
  }

  function dragDrop(event) {
    if(dragElem != null) {
      updateReport(...dragElem);
    }
  }

  function dragEnter(event) {
    event.preventDefault();
  }

  function dragOver(event) {
    event.preventDefault();
  }

  function goHome() {
    history.push("/");
  }

  return (
    <div className="report">
      <div className="report-body">
        {cols && (<div className="report-cols-container">
          <div className="report-cols-wrapper">
          <p>You can change file from home page<br/>
          Go to <span className="pointer" onClick={goHome}><strong>Home</strong></span></p>
            {cols?.map((col, index) => (
              <div className="report-cols" key={index} 
              draggable={!col.added} onDragStart={(e) => dragStart(e, col.name, index)} 
              onDragEnd={dragEnd}>
                {col.name}
                {col.added && (<Icon className="absolute-top-left" path={mdiCheckCircleOutline} size={1} color="#333" />)}
              </div>
            ))}
          </div>
        </div>)}
        <div className="report-container" onDrop={dragDrop} 
        onDragEnter={dragEnter} onDragOver={dragOver}>
          {Object.keys(report).map((key, index) => (
            <div className="col-data-container" key={index}>
              <div className="col-data-header"><strong>{key}</strong>
                <Icon className="absolute-top-left pointer" onClick={() => removeFromReport(key)} path={mdiCloseCircleOutline} size={1} color="#333" />
              </div>
              {report[key]?.map((item, index) => (
                <div className="col-data-text" key={index}>{item}</div>
              ))} 
            </div>
          ))}
          {cols && !Object.keys(report)?.length && (<p className="auto-margin">Drag and drop columns here to display data</p>)}
          {!cols && (<p className="auto-margin">Please upload a file from the home page! Go to <span className="pointer" onClick={goHome}><strong>Home</strong></span></p>)}
        </div>
      </div>
    </div>
  );
}

export default Report;