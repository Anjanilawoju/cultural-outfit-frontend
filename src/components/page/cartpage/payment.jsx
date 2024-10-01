import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { useNavigate, useParams } from "react-router-dom";

function Payment() {
  const { total } = useParams();
  const [transactionUuid, setTransactionUuid] = useState("");
  const [signature, setSignature] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentTime = new Date();
    const formattedTime =
      currentTime.toISOString().slice(2, 10).replace(/-/g, "") +
      "-" +
      currentTime.getHours().toString().padStart(2, "0") +
      currentTime.getMinutes().toString().padStart(2, "0") +
      currentTime.getSeconds().toString().padStart(2, "0");
    setTransactionUuid(formattedTime);
  }, []);

  useEffect(() => {
    const secretKey = "8gBm/:&EnhH.1/q";
    const dataToSign = `total_amount=${total},transaction_uuid=${transactionUuid},product_code=EPAYTEST`;
    const hash = CryptoJS.HmacSHA256(dataToSign, secretKey);
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    setSignature(hashInBase64);
  }, [total, transactionUuid]);

  const handleCancel = () => {
    navigate(`/checkout/${total}`); // Navigate back to the cart page
  };


  return (
    <div className="bg-gray-800 flex items-center justify-center min-h-screen">
      <div className="bg-gray-600 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">
          Confirm Payment
        </h1>
        <form
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST"
          target="_blank"
          className="space-y-4"
        >
          <input type="hidden" name="amount" value={total} />
          <input type="hidden" name="tax_amount" value="0" />
          <input type="hidden" name="total_amount" value={total} />
          <input
            type="hidden"
            name="transaction_uuid"
            value={transactionUuid}
          />
          <input type="hidden" name="product_code" value="EPAYTEST" />
          <input type="hidden" name="product_service_charge" value="0" />
          <input type="hidden" name="product_delivery_charge" value="0" />
          <input
            type="hidden"
            name="success_url"
            value="http://localhost:3000/payment-success"
          />
          <input
            type="hidden"
            name="failure_url"
            value="http://localhost:3000/"
          />
          <input
            type="hidden"
            name="signed_field_names"
            value="total_amount,transaction_uuid,product_code"
          />
          <input type="hidden" name="signature" value={signature} />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Confirm Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payment;