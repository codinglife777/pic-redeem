import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import NotFound from './pages/NotFoundPage';
import ConfirmImage from './pages/ConfirmImage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ImageProvider } from './ImageProvider';
import RedeemConfirmation from './pages/RedeemConfirmation';
import PackageList from './pages/PackageList';
import CheckoutDelivery from './pages/CheckoutDelivery';
import Payment from './pages/Payment';

function App() {
  return (
    <ImageProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="/products" component={Products} />
          <Route exact path="/products/:id" component={ProductDetail} /> */}
          <Route path="*" element={<NotFound />} />
          <Route path="/confirm-image" element={<ConfirmImage />}/>
          <Route path="/redeem-confirm" element={<RedeemConfirmation />}/>
          <Route path="/package-list" element={<PackageList />}/>
          <Route path="/checkout-delivery" element={<CheckoutDelivery />}/>
          <Route path="/pay" element={<Payment />}/>
        </Routes>
      </BrowserRouter>
    </ImageProvider>
  );
}

export default App;
