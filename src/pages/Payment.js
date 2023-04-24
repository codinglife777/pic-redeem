import * as React from 'react';
import { ApplePay, GooglePay, CreditCard, PaymentForm} from 'react-square-web-payments-sdk';
import { useNavigate } from 'react-router-dom';
import Config from '../config/config';

function Payment(props) {

    const packageObj = JSON.parse(sessionStorage.getItem('package'));
    const navigator = useNavigate();

    return (

        <PaymentForm
            /**
             * Identifies the calling form with a verified application ID generated from
             * the Square Application Dashboard.
             */
            applicationId={Config.applicationId}
            /**
             * Invoked when payment form receives the result of a tokenize generation
             * request. The result will be a valid credit card or wallet token, or an error.
             */
            cardTokenizeResponseReceived={(token, buyer) => {
                console.info({ token, buyer });
                navigator('/success');
            }}
            /**
             * This function enable the Strong Customer Authentication (SCA) flow
             *
             * We strongly recommend use this function to verify the buyer and reduce
             * the chance of fraudulent transactions.
             */
            createVerificationDetails={() => ({
                amount: packageObj?.total_cost,
                /* collected from the buyer */
                billingContact: {
                    addressLines: ['123 Main Street', 'Apartment 1'],
                    familyName: 'Doe',
                    givenName: 'John',
                    countryCode: 'US',
                    city: 'London',
                },
                currencyCode: 'USD',
                intent: 'CHARGE',
            })}

            createPaymentRequest={() => ({
                countryCode: "US",
                currencyCode: "USD",
                // lineItems: [
                //     {
                //         amount: "22.15",
                //         label: "Item to be purchased",
                //         id: "SKU-12345",
                //         imageUrl: "https://url-cdn.com/123ABC",
                //         pending: true,
                //         productUrl: "https://my-company.com/product-123ABC"
                //     }
                // ],
                taxLineItems: [
                    {
                        label: "Tax",
                        amount: '' + packageObj?.tax_rate,
                        pending: false
                    }
                ],
                // discounts: [
                //     {
                //         label: "Holiday Discount",
                //         amount: "5.00",
                //         pending: true
                //     }
                // ],
                requestBillingContact: false,
                requestShippingContact: false,
                // shippingOptions: [
                //     {
                //         label: "Next Day",
                //         amount: "15.69",
                //         id: "1"
                //     },
                //     {
                //         label: "Three Day",
                //         amount: "2.00",
                //         id: "2"
                //     }
                // ],
                // pending is only required if it's true.
                total: {
                    amount: '' + packageObj?.total_cost,
                    label: "Total",
                },
            })}
            /**
             * Identifies the location of the merchant that is taking the payment.
             * Obtained from the Square Application Dashboard - Locations tab.
             */
            locationId={Config.locationId}
        >
            <ApplePay />
            <GooglePay className='mt-5' />
            <CreditCard className='mt-3'>
                <div className='fs-2'>Pay ${packageObj?.total_cost}</div>
                {/* <Button variant="primary" size="lg">Pay ${packageObj?.total_cost}</Button> */}
            </CreditCard>
        </PaymentForm>
    )
}

export default Payment;