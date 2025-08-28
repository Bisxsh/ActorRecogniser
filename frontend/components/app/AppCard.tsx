type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
};

const AppCard = ({ icon, title, description, className }: Props) => {
  return (
    <div
      className={`bg-alt-text p-8 lg:p-12 rounded-md shadow-md flex flex-col max-w-md mx-auto my-8 ${className}`}
    >
      <div className="flex items-center gap-2 text-center mb-4">
        <div className="bg-primary p-3 rounded-sm">{icon}</div>
        <h2 className="text-md">{title}</h2>
      </div>
      <p className="text-sm mt-2">{description}</p>
    </div>
  );
};

export default AppCard;
