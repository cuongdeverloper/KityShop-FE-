import './Footer.scss';
import imageFooter from '../../assests/logo.png';

const Footer = () => {
    return (
        <div className="Footer-container">
            <div className="container">
                <div className="row">
                    <div className="col-12 footer-logo mb-3 mt-3" style={{ textAlign: 'center' }}>
                        <img src={imageFooter} alt="Footer Logo" />
                    </div>
                    <div className="col-12 footer-text" style={{ textAlign: 'center' }}>
                        <p>Đặt hàng và thu tiền tận nơi toàn quốc</p>
                        <h5 className="boxed-content-title">Liên hệ: 0917023051</h5>
                        <h4>
                            <a href="#" className="btn btn-link">Chương trình khuyến mãi</a>
                        </h4>
                        <h4>
                            <a href="#" className="btn btn-link">Giới thiệu về Shop</a>                        
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
