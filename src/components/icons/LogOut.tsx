import { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<SVGElement> {}

const LogOut = (props: Props) => (
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
      d="M86.02 85.1V21.267c0-.461-.368-.922-.83-1.015l-65.034-10.24c-.553-.091-1.107.37-1.199.923L16.835 41.1l35.884 5.904-17.895-12.73c-.185-.185-.37-.462-.37-.83l.739-9.963c.092-.83 1.014-1.2 1.568-.646l35.33 32.379c.462.461.37 1.291-.184 1.568L32.794 77.629c-.646.369-1.476-.185-1.384-.923l.923-13.283c0-.37.277-.646.553-.83l18.726-7.75-35.515-2.582-.46 8.118-1.661 28.596c0 .554.461 1.107 4.52 1.015l66.879-3.967c.738-.092.646-.369.646-.922Z"
      fill="currentColor"
    ></path>
  </svg>
);

export default LogOut;
