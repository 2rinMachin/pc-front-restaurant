import { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<SVGElement> {}

const LeftArrow = (props: Props) => (
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
      d="M73.515 31.078V11.775c0-1.136-1.217-1.784-2.109-1.217L17.148 44.622c-.811.487-.892 1.703-.163 2.271L71.245 90.04c.892.73 2.271.081 2.271-1.054V74.468c0-.405-.243-.81-.568-1.135L37.748 51.922c-.811-.65-.73-1.866.243-2.353l34.713-17.275c.487-.243.811-.73.811-1.216Z"
      fill="currentColor"
    ></path>
  </svg>
);

export default LeftArrow;
