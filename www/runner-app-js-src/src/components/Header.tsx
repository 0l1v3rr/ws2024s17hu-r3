type Props = {
  teamName: string;
};

const Header = ({ teamName }: Props) => {
  return (
    <header className="w-full text-center p-3 font-semibold text-white bg-blue-primary text-lg">
      UB 2023 - {teamName}
    </header>
  );
};

export default Header;
