import { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<SVGElement> {}

const Clock = (props: Props) => (
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M89.466 41.31c-.664-3.57-3.153-8.359-5.31-11.058-4.563-5.66-8.048-9.143-14.354-12.713-9.957-5.747-23.979-7.14-36.59-2.525-2.324.87-6.804 2.438-12.778 8.882C6.744 38.524 9.98 51.41 11.307 58.203c1.66 8.359 9.127 17.327 15.599 22.116 3.07 2.264 7.467 4.876 11.699 5.921 7.052 1.829 12.03 1.829 16.096.871 4.398-1.045 7.965-1.916 14.603-5.747 2.406-1.393 8.795-6.617 15.35-16.283 6.97-10.274 5.31-21.158 4.812-23.77ZM65.57 76.923l-22.9-23.51-.912-35.09c7.218-4.267 11.781-.523 11.781-.523l-3.318 32.044 24.227 18.024c-2.489 5.224-8.878 9.055-8.878 9.055Z"
      fill="currentColor"
    ></path>
  </svg>
);

export default Clock;
