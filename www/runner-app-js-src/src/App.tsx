import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MyTeam, Runner } from "./types";
import Header from "./components/Header";
import SelectRunner from "./pages/SelectRunner";
import Tracking from "./pages/Tracking";
import Loading from "./pages/Loading";
import { dateWithTimezoneDiff } from "./utils";

axios.defaults.baseURL = "http://backend2.ub2023.hu/api/v1/";

const App = () => {
  const [params] = useSearchParams();
  const [accessCode, setAccessCode] = useState<string | null>(null);
  const [team, setTeam] = useState<MyTeam>();
  const [selectedRunner, setSelectedRunner] = useState<Runner | null>(null);

  useEffect(() => {
    const code = params.get("accesscode");
    if (code === null) return;

    axios
      .get<MyTeam>("myteam", { headers: { Authorization: `Bearer ${code}` } })
      .then((res) => {
        setTeam(res.data);
        setAccessCode(code);
      })
      .catch(() => setAccessCode(null));
  }, [params]);

  if (accessCode === null || !team) {
    return <Loading text="Log in using your access code!" />;
  }

  return (
    <div className="bg-white h-screen w-screen overflow-hidden flex flex-col gap-3">
      <Header teamName={team.name} />

      <main className="w-full h-full flex flex-col gap-3 p-4">
        {selectedRunner === null ? (
          <SelectRunner
            runners={team.runners}
            selectRunner={(r) => setSelectedRunner(r)}
          />
        ) : (
          <Tracking
            runner={selectedRunner}
            accessCode={accessCode}
            plannedStartingTime={dateWithTimezoneDiff(team.plannedStartingTime)}
          />
        )}
      </main>
    </div>
  );
};

export default App;
