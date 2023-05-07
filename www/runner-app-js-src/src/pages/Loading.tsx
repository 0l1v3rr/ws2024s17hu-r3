type Props = {
  text?: string;
};

const Loading = ({ text = "Loading..." }: Props) => {
  return <div className="w-screen h-screen flex items-center justify-center text-xl">{text}</div>;
};

export default Loading;
