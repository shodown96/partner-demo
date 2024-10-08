// import { redirect } from "next/navigation";
// import { NextRequest, NextResponse } from "next/server";
// import { seedDatabase } from "@/actions/dev-only/seed-database";

import { NextRequest } from "next/server"

// export async function GET(request: NextRequest) {
//   if (process.env.NODE_ENV !== "development") {
//     // dev-only route
//     redirect("/");
//   }

//   const searchParams = request.nextUrl.searchParams;

//   const numberOfProjectsParam = searchParams.get("numberOfProjects");
//   const formattedNumber = Number(numberOfProjectsParam ?? NaN);
//   const numberOfProjects = isNaN(formattedNumber) ? 20 : formattedNumber;

//   const shouldResetDatabaseParam = searchParams.get("shouldResetDatabase");
//   const shouldResetDatabase = shouldResetDatabaseParam === "true";

//   const seedDatabaseResponse = await seedDatabase({
//     numberOfProjects,
//     shouldResetDatabase,
//   });

//   if (seedDatabaseResponse === null) {
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 },
//     );
//   }

//   return NextResponse.json(seedDatabaseResponse, { status: 200 });
// }

export async function GET(request: NextRequest) {
    try {
        const text = await request.text()
        // // Process the webhook payload
        // sessionStorage.setItem("request", text)
        // https://partner-demo.vercel.app/api/partner_redirect?client=xxxxCL&channels=%5ByyyyCH%5D&revoked=%5BzzzzCH%5D&state=someStatePassedThrough
        console.log("text", text, request.nextUrl.searchParams)
    } catch (error: any) {
        return new Response(`Webhook error: ${error.message}`, {
            status: 400,
        })
    }

    return new Response('Success!', {
        status: 200,
    })
}