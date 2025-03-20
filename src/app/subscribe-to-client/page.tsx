"use client"
import dynamic from 'next/dynamic';
import { useState } from 'react';
const SubscribeDialog = dynamic(() => import('../../components/custom/subscribe-modal'), { ssr: false })

export default function SubscribeToClient() {
    const [open, setOpen] = useState(false)
    return (
        <div className='p-5'>
            <SubscribeDialog open={open} setOpen={setOpen} />
        </div>
    )
}
