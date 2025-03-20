
import { originURL } from "@/lib/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server"

const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, BUSINESS_NUMBER_ID } = process.env;

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const mode = request.nextUrl.searchParams.get("hub.mode");
        const token = request.nextUrl.searchParams.get("hub.verify_token");
        const challenge = request.nextUrl.searchParams.get("hub.challenge");

        // check the mode and token sent are correct
        if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
            // respond with 200 OK and challenge token from the request

            console.log("Webhook verified successfully!");
            return new NextResponse(challenge, {
                status: 200,
            })
        } else {
            // respond with '403 Forbidden' if verify tokens do not match
            return new NextResponse("403 Forbidden", {
                status: 403,
            })
        }

    } catch (error: any) {
        console.log(error)
        return new NextResponse(`Webhook error: ${error.message}`, {
            status: 400,
        })
    }

}


export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const body = await request.json()
        // log incoming messages
        console.log("Incoming webhook message:", JSON.stringify(body, null, 2));

        // check if the webhook request contains a message
        // details on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
        const message = body.entry?.[0]?.changes[0]?.value?.messages?.[0];

        // check if the incoming message contains text
        if (message?.type === "text") {
            // extract the business number to send the reply from it
            const business_phone_number_id = body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id || BUSINESS_NUMBER_ID;
            const regex = /^Hello, my name is ([A-Za-z ]+), I would love to subscribe to ([A-Za-z_]+)$/i;
            const match = message.text.body.match(regex);
            if (match) {
                const name = match?.[0]
                const clientId = match?.[1]
                console.log(message.text.body, name, clientId)
                // send a reply message as per the docs here https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages
                await axios({
                    method: "POST",
                    url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                    headers: {
                        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                    },
                    data: {
                        messaging_product: "whatsapp",
                        to: message.from,
                        type: "interactive",
                        interactive: {
                            type: "cta_url",
                            body: {
                                text: `Hello ${name}, \n\n Thank you for messaging us, to proceed with subscribing, click the link below.`
                            },
                            footer: {
                                text: "Powered by Sendeet"
                            },
                            action: {
                                name: "cta_url",
                                parameters: {
                                    display_text: "Subscribe",
                                    url: `${originURL}/subscribe-to-client?phone=+${message.from}&clientId=${clientId}`
                                }
                            }
                        },
                        context: {
                            message_id: message.id, // shows the message as a reply to the original user message
                        },
                    },
                });

            } else {
                // send a reply message as per the docs here https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages
                await axios({
                    method: "POST",
                    url: `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
                    headers: {
                        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                    },
                    data: {
                        messaging_product: "whatsapp",
                        to: message.from,
                        text: {
                            body: "Echo: " + message.text.body,
                            footer: {
                                text: "Powered by Sendeet"
                            },

                        },
                        context: {
                            message_id: message.id, // shows the message as a reply to the original user message
                        },
                    },
                });
            }

            // mark incoming message as read
            await axios({
                method: "POST",
                url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
                headers: {
                    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
                },
                data: {
                    messaging_product: "whatsapp",
                    status: "read",
                    message_id: message.id,
                },
            });
        }

        return new NextResponse(JSON.stringify({ message: "Success" }), {
            status: 200,
        })
    } catch (error: any) {
        console.log(error)
        return new Response(`Webhook error: ${error.message}`, {
            status: 400,
        })
    }

}