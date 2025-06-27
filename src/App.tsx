import { useEffect, useState } from "react";
import { UserDialog } from "./components/UserDialog";
import { Diary } from "./components/Diary";

function App() {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <>
      {userName ? (
       <Diary />
      ) : (
        <UserDialog
          onSubmit={(name) => {
            setUserName(name);
            localStorage.setItem('userName', name);
          }}
        />
      )}
    </>
  );
}

export default App;
