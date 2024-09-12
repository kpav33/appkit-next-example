// Notifications.tsx
import { useNotifications, useSubscription } from "@web3inbox/react";
import React from "react";
// import styles from "@/styles/Notifications.module.css";

// https://docs.walletconnect.com/appkit/next/notifications/frontend-integration/api => Use this for any issues with the API
function Notifications() {
  const { data: subscription } = useSubscription();
  const {
    data: notifications,
    markAllNotificationsAsRead,
    markNotificationsAsRead,
    fetchNextPage,
  } = useNotifications(5);
  console.log("NOTIFICATIONS ", notifications);

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
      <p className="mb-4 text-gray-700">
        You have {subscription?.unreadNotificationCount} unread notifications.
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
              <button
                onClick={() => markNotificationsAsRead([id])}
                className="mt-2 text-blue-500 hover:underline"
              >
                Mark as read
              </button>
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
