// Notifications.tsx
import {
  useNotifications,
  useSubscription,
  useNotificationTypes,
  useWeb3InboxClient,
} from "@web3inbox/react";
import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
// import styles from "@/styles/Notifications.module.css";

// https://docs.walletconnect.com/appkit/next/notifications/frontend-integration/api => Use this for any issues with the API
function Notifications() {
  // When a new message is added it shows up immediately for the user, even if they already have the page open, but the You have ... unread message doesnt get updated, maybe we need to have a useEffect to check for changes in notifications and then update it?
  const { data: subscription } = useSubscription();
  // console.log("SUBSCRIPTION ", subscription);

  // https://docs.walletconnect.com/appkit/next/notifications/frontend-integration/api#managing-notifications
  // watch notifications of current account's subscription to current dapp
  const notificationsPerPage = 5;
  const isInfiniteScroll = true;
  const unreadFirst = true;
  const { address } = useAccount();
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN!;

  // Cant pass this to useNotifications despite showing it in docs?
  // const onRead = () => {
  //   console.log("Message sent as read successfully!")
  // }

  // const {
  //   data: notifications,
  //   markAllNotificationsAsRead,
  //   markNotificationsAsRead,
  //   fetchNextPage,
  // } = useNotifications(5);
  const {
    data: notifications,
    markAllNotificationsAsRead,
    markNotificationsAsRead,
    fetchNextPage,
  } = useNotifications(
    notificationsPerPage
    // isInfiniteScroll,
    // address, // Which address is passed here?
    // appDomain,
    // unreadFirst
    // Expected 1-5 arguments, but got 6.ts(2554)???
    // onRead // optional function to run whenever messages are read
  );
  // console.log("NOTIFICATIONS ", notifications);

  const [unreadCount, setUnreadCount] = useState(
    subscription?.unreadNotificationCount || 0
  );

  // // Doesnt work
  // // Effect to update unread count when subscription changes
  // useEffect(() => {
  //   console.log("-----------------subscription change");
  //   if (subscription?.unreadNotificationCount !== undefined) {
  //     setUnreadCount(subscription.unreadNotificationCount);
  //   }
  // }, [subscription]);

  // Effect to update unread count when notifications change => This one works ok
  useEffect(() => {
    // console.log("-----------------notifications change");
    if (notifications) {
      const unreadNotifications = notifications.filter((n) => !n.isRead).length;
      setUnreadCount(unreadNotifications);
    }
  }, [notifications]);

  // https://docs.walletconnect.com/appkit/next/notifications/frontend-integration/api#notification-types
  // const { data: types, update } = useNotificationTypes();

  // https://docs.walletconnect.com/appkit/next/notifications/frontend-integration/api#registering-for-device-push-notifications
  // If you wish to receive live push notifications to your React Native or Web app, you must integrate with Firebase Messaging!

  const { data: client } = useWeb3InboxClient();

  // // Test this
  // client?.on("notify_message", (e) => {
  //   console.log("---------------------NOTIFY MESSAGE");
  //   // console.log(e.params.message.isRead);
  //   if (!e.params.message.isRead) {
  //     alert("New message available!");
  //   }
  // });

  // Listen for new notifications
  useEffect(() => {
    client?.on("notify_message", (e) => {
      if (!e.params.message.isRead) {
        console.log("New message available!");
        // alert("New message available!");
        // Increment unread count manually if not updated automatically
        // Increments twice on localhost, should work in production?
        setUnreadCount((prevCount) => prevCount + 1);
      }
    });
  }, [client]);

  //   return (
  //     <div>
  //       <h2
  //       //   className={styles.heading}
  //       >
  //         Notifications
  //       </h2>
  //       {/* <p>You have {subscription?.unreadCount} unread notifications.</p> */}
  //       <pre style={{ overflow: "scroll" }}>
  //         {JSON.stringify(subscription, null, 2)}
  //       </pre>
  //       <div
  //       //   className={styles.notificationsContainer}
  //       >
  //         {!notifications?.length ? (
  //           <p
  //           //   className={styles.fallbackText}
  //           >
  //             No notifications yet.
  //           </p>
  //         ) : (
  //           notifications.map(({ id, ...message }) => (
  //             <div
  //               key={id}
  //               // className={styles.message}
  //             >
  //               <h3>{message.title}</h3>
  //               <p>{message.body}</p>
  //               <p>{message.isRead ? "Read" : "Unread"}</p>
  //               {/* <button onClick={message?.markAsRead}>Mark as read</button> */}
  //             </div>
  //           ))
  //         )}
  //       </div>
  //       {/* <button onClick={nextPage}>Next page</button> */}
  //     </div>
  //   );

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      {/* <p className="mb-4 text-gray-700">
        You have {subscription?.unreadNotificationCount} unread notifications.
      </p> */}
      <p className="mb-4 text-gray-700">
        You have {unreadCount} unread notifications.
      </p>
      {/* <pre style={{ overflow: "scroll" }}>
        {JSON.stringify(subscription, null, 2)}
      </pre> */}
      <div className="mt-4">
        {!notifications?.length ? (
          <p className="text-gray-500">No notifications yet.</p>
        ) : (
          notifications.map(({ id, ...message }) => (
            <div
              key={id}
              className="border-b border-gray-300 py-2 mb-2 last:border-b-0"
            >
              <h3 className="text-lg font-medium">{message.title}</h3>
              <p className="text-gray-800">{message.body}</p>
              <p
                className={`mt-1 ${
                  message.isRead ? "text-green-500" : "text-red-500"
                }`}
              >
                {message.isRead ? "Read" : "Unread"}
              </p>
              {!message?.isRead && (
                <button
                  // onClick={() => markNotificationsAsRead([id])}
                  onClick={() => {
                    markNotificationsAsRead([id]);
                    setUnreadCount((prevCount) => prevCount - 1);
                  }}
                  className="mt-2 text-blue-500 hover:underline"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))
        )}
        <button
          onClick={() => markAllNotificationsAsRead()}
          className="mt-2 text-blue-500 hover:underline"
        >
          Mark all as read
        </button>
      </div>
      <button
        onClick={() => fetchNextPage()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Next page
      </button>
    </div>
  );
}

export default Notifications;
