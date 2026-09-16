interface IPropertyDetailContainerProps {
  children: React.ReactNode;
}

export const PropertyDetailContainer: React.FC<
  IPropertyDetailContainerProps
> = ({ children }) => {
  return (
    <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
      {children}
    </div>
  );
};
