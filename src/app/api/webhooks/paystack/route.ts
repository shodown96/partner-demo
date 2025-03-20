import { originURL } from "@/lib/constants";
import { ChargeSuccessEventData } from "@/types/paystack";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


const { GRAPH_API_TOKEN, BUSINESS_NUMBER_ID, SAMPLE_PDF, PAYSTACK_API_SECRET_KEY } = process.env;

const verifyPaystackTransaction = async (eventData: any, signature: any) => {
    // const hmac = crypto.createHmac('sha512', `${process.env.PAYSTACK_API_SECRET_KEY}`);
    // const expectedSignature = hmac.update(JSON.stringify(eventData)).digest('hex');
    const secret = String(PAYSTACK_API_SECRET_KEY);
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-512' },
        false,
        ['sign']
    );

    const sig = await crypto.subtle.sign(
        'HMAC',
        key,
        encoder.encode(JSON.stringify(eventData))
    );

    const expectedSignature = Array.from(new Uint8Array(sig))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    return expectedSignature === signature;
}

export async function POST(req: NextRequest) {

    try {
        const eventData: any = req.body;
        const signature = req.headers.get('x-paystack-signature');

        if (!eventData || !verifyPaystackTransaction(eventData, signature)) {
            return new NextResponse(JSON.stringify({ error: "Invalid event type" }), {
                headers: { "Content-Type": "application/json" },
                status: 400,
            });
        }
        if (eventData.event === 'charge.success') {
            // data.source
            const data: ChargeSuccessEventData = eventData.data
            const phone = data.customer.phone.replace(" ", "").replace("+", "");
            const clientId = data.metadata.custom_fields.find(v => v.variable_name === "clientId")?.value;
            const unsubscribeURL = `${originURL}/unsubscribe?clientId=${clientId}`;
            const TEST_PHONES = String(process.env.TEST_PHONES).split(",")
            if (TEST_PHONES.includes(phone)) {
                await axios({
                    method: "POST",
                    url: `https://graph.facebook.com/v22.0/${BUSINESS_NUMBER_ID}/messages`,
                    headers: {
                        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                    },
                    data: {
                        messaging_product: "whatsapp",
                        to: phone,
                        type: "document",
                        document: {
                            // id: "<MEDIA_ID>", /* Only if using uploaded media */
                            link: SAMPLE_PDF, /* Only if linking to your media */
                            // caption: "<DOCUMENT_CAPTION>",
                            filename: "PDF for the Day"
                        }
                    },
                });

                await axios({
                    method: "POST",
                    url: `https://graph.facebook.com/v22.0/${BUSINESS_NUMBER_ID}/messages`,
                    headers: {
                        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                    },
                    data: {
                        messaging_product: "whatsapp",
                        to: phone,
                        type: "interactive",
                        interactive: {
                            type: "cta_url",
                            body: {
                                text: `To unsubscibe, please click the link below.`
                            },
                            footer: {
                                text: "Powered by Sendeet"
                            },
                            action: {
                                name: "cta_url",
                                parameters: {
                                    display_text: "Subscribe",
                                    url: unsubscribeURL
                                }
                            }
                        },
                    },
                });
                // LINK: URL of image asset on your public server. 
                // ID: For better performance, we recommend that you upload your media asset instead.
                // https://developers.facebook.com/docs/whatsapp/cloud-api/messages/document-messages
            }
            return new NextResponse(JSON.stringify({ message: "success" }), {
                headers: { "Content-Type": "application/json" },
                status: 200,
            });

        }

        return new NextResponse(JSON.stringify({ error: "Invalid event type" }), {
            headers: { "Content-Type": "application/json" },
            status: 400,
        });
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ error: "Invalid event type" }), {
            headers: { "Content-Type": "application/json" },
            status: 500,
        });
    }
}
