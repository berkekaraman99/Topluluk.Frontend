import  { useEffect, useState } from "react";
import "./App.css";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

function App() {
  const [text, setText] = useState("");
  const [msgList, setMsgList] = useState<any>([]);
  const [hubConnection, setHubConnection] = useState<HubConnection | null>();
  const [idRef, setIdRef] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    createHubConnection();
  }, []);

  const createHubConnection = async () => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5167/chat-hub", {
        skipNegotiation: true,
        transport: 1,
      })
      .withAutomaticReconnect()
      .configureLogging(1)
      .build();

    connection.onclose(() => {
      console.log("Connection closed");
    });

    try {
      await connection.start();

      console.log("SignalR connected");
      setHubConnection(connection);
    } catch (error) {
      console.log("SignalR connection error:", error);
    }
  };

  const getConnectionId = async () => {
    await hubConnection!.invoke("getconnectionid").then((data) => {
      console.log("CONNECTION ID:", data);
      setIdRef(data);
    });
    await hubConnection!.invoke("assignconnectionid", userId);
  };

  useEffect(() => {
    if (hubConnection) {
      console.log("Bağlandı karşim");

      getConnectionId().then((res) => {
        console.log("GetConnectionId then:", res);
      });
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      const receiveMessageHandler = (msg: any) => {
        console.log("MESAJ ALINDII: ", msg);
        setMsgList((prevMsgList: any) => [...prevMsgList, msg]);
      };

      hubConnection.on("receiveMessage", receiveMessageHandler);

      return () => {
        // Temizlik işlemleri
        hubConnection.off("receiveMessage", receiveMessageHandler);
      };
    }
  }, [hubConnection]);
  const sendMsg = () => {
    const user = {
      id: userId,
      firstName: "İsmail",
      lastName: "Ertuğlu",
      profileImage: "profileImageUrl",
      gender: "male",
    };

    const message = {
      from: user,
      message: text,
      createdAt: new Date(),
    };
    if (hubConnection) {
      hubConnection
        .invoke(
          "SendMessageAsync",
          userId === "647481dd63357eb257b00bda"
            ? "64748e7ff56a4b9a869c4840"
            : "647481dd63357eb257b00bda",
          message
        )
        .then((res) => {
          console.log("Response", res);
        });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>ahmet: 647481dd63357eb257b00bda</p>
        <p>ismail: 64748e7ff56a4b9a869c4840</p>
        <p>ConnectionId: {idRef ?? "adsas"}</p>
        <p>UserId: {userId}</p>
        <input
          type="text"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        <button
          onClick={() => {
            getConnectionId();
            console.log("userid ref: ", userId);
          }}
        >
          Bağlan
        </button>
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button onClick={sendMsg}>Mesaj Gönder </button>
      </header>
      <div>
        <h2>Mesajlarr123</h2>
        <ul>
          {msgList.map((item: any) => {
            console.log(item);
            return (
              <li key={item.createdAt}>
                {item.from.firstName} {item.from.lastName}: {item.message} -{" "}
                {item.createdAt}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;