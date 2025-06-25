import { useEffect, useState } from "react";
import { UserDialog } from "./components/UserDialog";
import { FoodDiary } from "./components/FoodDiary";

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
       <FoodDiary />
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
