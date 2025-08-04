import type { SVGProps } from "react";

export const CartPlus = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="M21.667 30H35m-6.667 6.666V23.333"
      />
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M11.667 12.5v-.834a8.333 8.333 0 0 1 16.666 0v.834"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="M16.667 36.667c-3.8 0-5.716-.014-7.054-1.208C8.26 34.25 7.918 32.21 7.235 28.13L5.296 16.56c-.315-1.883-.472-2.824.013-3.442.485-.618 1.382-.618 3.176-.618h23.03c1.794 0 2.69 0 3.176.618.485.618.328 1.56.013 3.441L34.127 20M7.5 29.166h9.167"
      />
    </svg>
  );
};

export const BookPlay = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M34.167 28.214V16.666c0-6.285 0-9.428-1.953-11.38-1.953-1.953-5.095-1.953-11.38-1.953h-1.667c-6.286 0-9.429 0-11.381 1.953-1.953 1.952-1.953 5.095-1.953 11.38V32.5"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M34.167 28.333H10a4.167 4.167 0 0 0 0 8.333h24.167"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M34.167 28.333a4.167 4.167 0 0 0 0 8.333"
      />
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M24.935 16.397c-.21.895-1.205 1.528-3.194 2.793-1.922 1.224-2.883 1.835-3.658 1.59a1.905 1.905 0 0 1-.847-.561c-.57-.643-.57-1.89-.57-4.386 0-2.495 0-3.743.57-4.386.235-.266.527-.459.847-.56.775-.246 1.736.365 3.658 1.589 1.989 1.265 2.983 1.898 3.194 2.793.087.37.087.758 0 1.128Z"
      />
    </svg>
  );
};
