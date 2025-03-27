import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        // const mode = request.nextUrl.searchParams.get("hub.mode");
        const body = await request.json()
        console.log("method", request.method)
        console.log("body", body)
        return new NextResponse(null, {
            status: 200,
        })

    } catch (error: any) {
        console.log(error)
        return new NextResponse(`Webhook error: ${error.message}`, {
            status: 400,
        })
    }

}
export async function POST(request: NextRequest, response: NextResponse) {
    try {
        // const mode = request.nextUrl.searchParams.get("hub.mode");
        const body = await request.json()
        console.log("method", request.method)
        console.log("body", body)
        return new NextResponse(null, {
            status: 200,
        })

    } catch (error: any) {
        console.log(error)
        return new NextResponse(`Webhook error: ${error.message}`, {
            status: 400,
        })
    }

}