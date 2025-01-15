interface props {
  addHeightPadding?: boolean;
  small?: boolean;
  isWhite?: boolean;
}

export default function Spinner({ addHeightPadding, small, isWhite }: props) {
  return (
    <div
      className={` flex w-full h-full items-center justify-center ${
        addHeightPadding && `h-40`
      } `}
    >
      <div
        className={`animate-spin rounded-full ${
          small ? `size-[18px]` : `size-7`
        } border-t-4 ${isWhite ? `border-white` : `border-main-blue`}   `}
      ></div>
    </div>
  );
}
