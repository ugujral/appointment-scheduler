/* eslint-disable no-console */
import React from 'react';
import styles from '../styles/style.css';
import Navbar from './Navbar';
import PatientInfo from './PatientInfo';

const App = () => (
  <div className={styles.app}>
    <Navbar />
    <PatientInfo />
  </div>
);

export default App;
