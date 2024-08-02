import logo from './logo.svg';
import './App.css';
import CameraPopup from './camera/camera1'
import QrCodeScanner from './barcode/barcode'

function App() {
  return (
    <div className="App">
      <CameraPopup/>
      <QrCodeScanner/>
    </div>
  );
}

export default App;
