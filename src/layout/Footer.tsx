import DarkModeToggle from "./DarkModeToggle";

const Footer = () => {
  return (
    <div className="flex justify-between items-center fixed inset-x-0 bottom-0 p-2">
      <DarkModeToggle />
      <h1 className="">App Version Beta 0.3</h1>
    </div>
  );
};

export default Footer;
