import { NextResponse } from "next/server";

// https://docs.walletconnect.com/appkit/next/notifications/backend-integration#sending-notifications
const PROJECT_ID = process.env.PROJECT_ID;
const NOTIFY_API_SECRET = process.env.NOTIFY_API_SECRET;

export async function POST(request: Request) {
  try {
    const { notification } = await request.json();
    const { title, body } = notification;
    // console.log(notification);

    // Ensure title and body are provided
    if (!title || !body) {
      return NextResponse.json(
        { error: "Title and body are required." },
        { status: 400 }
      );
    }

    // Fetch the list of subscribers (accounts) from the WalletConnect API
    const subscriberResponse = await fetch(
      `https://notify.walletconnect.com/${PROJECT_ID}/subscribers`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${NOTIFY_API_SECRET}`,
        },
      }
    );

    // Check if the request was successful
    if (!subscriberResponse.ok) {
      throw new Error("Failed to fetch subscribers");
    }

    // Extract the accounts (subscribers) from the response
    const subscribers: string[] = await subscriberResponse.json();
    // console.log(subscribers);

    // Ensure there are subscribers
    if (subscribers.length === 0) {
      return NextResponse.json(
        { error: "No subscribers available to send notifications" },
        { status: 404 }
      );
    }

    // return NextResponse.json({ success: "OK" });

    const response = await fetch(
      `https://notify.walletconnect.com/${PROJECT_ID}/notify`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NOTIFY_API_SECRET}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notification: {
            type: "a8bfdd37-52ae-4a87-927f-8a9603108200",
            title: title,
            body: body,
            url: "https://example.com",
          },
          // There is no way to just send to all users that are subscribed we would need to make an api call to /subscribers endpoint to get all subscribers?
          // accounts: ["eip155:1:0xf7BEC4d478309Ce0f202258e3b1BEbC86facC133"],
          // If we keep accounts empty the notification gets sent successfully but no one receives it, it just exist in the void or whatever
          // The fact that we need to first get all subscribers with an api call is not really idea, because the get all subscribers endpoint has a warning that its an expensive operation and can take several seconds to complete
          // The warning => This endpoint will download all subscribers of your app, which is an expensive operation and can take several seconds to complete. Because of this, it has a low rate limit.
          //   accounts: [],
          // Dynamic accounts from the subscribers endpoint
          accounts: subscribers,
        }),
      }
    );

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
