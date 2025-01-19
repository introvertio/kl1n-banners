interface props {
  addHeightPadding?: boolean;
  isWhite?: boolean;
}

export default function Spinner({ addHeightPadding, isWhite }: props) {
  return (
    <div
      className={` flex w-full h-full items-center justify-center ${
        addHeightPadding && `h-40`
      } `}
    >
      <div
        className={`animate-spin rounded-full size-6 border-t-2 ${
          isWhite ? `border-white` : `border-main-blue`
        }   `}
      ></div>
    </div>
  );
}
