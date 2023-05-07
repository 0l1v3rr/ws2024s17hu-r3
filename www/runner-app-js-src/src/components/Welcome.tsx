type Props = {
  name: string;
  subtitle: string;
};

const Welcome = ({ name, subtitle }: Props) => {
  return (
    <div>
      <h1 className="text-4xl font-bold">👋 Hi {name}!</h1>
      <h2 className="text-text-secondary">{subtitle}</h2>
    </div>
  );
};

export default Welcome;
