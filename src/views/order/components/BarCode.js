import Barcode from 'react-barcode';

const BarCode = ({order_code}) => {
    return (
        <div >
            <Barcode value={order_code}/>
        </div>
    );
};

export default BarCode