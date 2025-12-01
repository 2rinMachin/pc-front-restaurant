import { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<SVGElement> {}

const Phone = (props: Props) => (
  <svg
    focusable={false}
    aria-hidden
    viewBox="0 0 100 100"
    fill="none"
    height={100}
    width={100}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m33.889 11.218 5.917 20.632c.16.56 0 1.2-.4 1.68l-6.637 9.036c-.64.64-.64 1.6-.08 2.32l17.593 23.43c.64.72 1.76.72 2.48.08l9.915-7.997c.48-.48 1.2-.64 1.84-.4l21.192 8.877c.88.4 1.28 1.44.88 2.32l-9.117 17.912c-.32.64-1.04.96-1.68.88l-27.909-3.519c-.4-.08-.8-.24-1.04-.56L13.657 46.725c-.32-.32-.4-.8-.4-1.28l3.2-27.99c.08-.559.48-1.119 1.039-1.359L31.569 10.1c.96-.32 2 .16 2.32 1.12Z"
      fill="currentColor"
    ></path>
  </svg>
);

export default Phone;
