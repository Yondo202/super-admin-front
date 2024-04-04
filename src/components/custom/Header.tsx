const Header = ({ title }: { title?: string }) => {
  return (
    <div className="pb-7 pt-7">
      <h3 className="text-xl font-medium">{title}</h3>
    </div>
  );
};

export default Header;
