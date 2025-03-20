"use client"
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
const SubscribeDialog = dynamic(() => import('../../components/custom/subscribe-modal'), { ssr: false })

export default function SubscribeToClient() {
    const [open, setOpen] = useState(false)
    const searchParams = useSearchParams()
    const clientId = searchParams.get("clientId")
    return (
        <div className='p-5'>
            <div>Subscribe to client {clientId}</div>
            <SubscribeDialog open={open} setOpen={setOpen} />
        </div>
    )
}
