import { Runner } from "../types";

type Props = {
  runners: Runner[];
  selectRunner: (runner: Runner) => void;
};

const SelectRunner = ({ runners, selectRunner }: Props) => {
  return (
    <>
      <h4 className="text-text-secondary">Tap on your name!</h4>

      {runners.map((runner) => (
        <div
          key={runner.id}
          onClick={() => selectRunner(runner)}
          className="cursor-pointer bg-pink w-full rounded-2xl p-2 text-center font-semibold text-white text-lg"
        >
          {runner.firstName} {runner.lastName}
        </div>
      ))}

      {Array.from({ length: 14 - runners.length }).map((_, i) => (
        <div
          key={i}
          className="bg-white-secondary w-full rounded-2xl p-2 text-center font-semibold text-white text-lg"
        >
          &nbsp;
        </div>
      ))}
    </>
  );
};

export default SelectRunner;
