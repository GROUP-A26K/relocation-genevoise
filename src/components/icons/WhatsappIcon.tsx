import { IIconProps } from "@/types";

export default function WhatsappIcon(props: IIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          fill="url(#b)"
          d="M.1 11.9c0 2.09.55 4.13 1.6 5.94L0 24l6.33-1.65A11.94 11.94 0 0 0 24 11.9 11.9 11.9 0 0 0 12.05 0 11.94 11.94 0 0 0 .1 11.9"
        />
        <path
          fill="#fff"
          d="M9.05 7.51c-.22-.48-.45-.5-.66-.5L7.82 7c-.2 0-.52.07-.79.37C6.76 7.66 6 8.37 6 9.8c0 1.43 1.06 2.82 1.2 3.02.15.2 2.05 3.23 5.05 4.4 2.5.97 3 .78 3.54.73.54-.05 1.75-.7 2-1.39.24-.68.24-1.26.17-1.38-.08-.12-.27-.2-.57-.34-.3-.15-1.75-.86-2.02-.95-.27-.1-.46-.15-.66.14-.2.3-.76.95-.94 1.15-.17.2-.34.22-.64.07s-1.24-.45-2.37-1.45a8.8 8.8 0 0 1-1.64-2.02c-.17-.29-.02-.45.13-.6.13-.12.3-.33.44-.5.15-.18.2-.3.3-.5.1-.19.04-.36-.03-.5-.07-.15-.65-1.6-.9-2.17Z"
        />
      </g>
      <defs>
        <linearGradient
          id="b"
          x1="1200"
          x2="1200"
          y1="2400"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f7d913" />
          <stop offset="1" stopColor="#f7d913" />
        </linearGradient>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
