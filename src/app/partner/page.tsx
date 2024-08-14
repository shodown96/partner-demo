"use client"
import { ConnectButton } from '360dialog-connect-button';

function Page() {
    const handleCallback = (callbackObject: any) => {
        /* The callback function returns the client ID as well as all channel IDs, for which you're enabled to fetch the API key via the Partner API */

        console.log('client ID: ' + callbackObject.client);
        console.log('channel IDs: ' + callbackObject.channels);
    };
    return (
        <div className='flex justify-center items-center h-screen'>
            <ConnectButton
                className='py-2 px-4 bg-black text-white rounded'
                partnerId={'DCPSKwPA'}
                callback={handleCallback} />
        </div>
    )
}

export default Page