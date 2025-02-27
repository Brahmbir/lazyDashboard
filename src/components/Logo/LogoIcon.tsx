export default function LogoIcon() {
  return <LogoBorder color="#03C988">P</LogoBorder>;
}
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

interface IlogoBorderProps {
  children: React.ReactNode;
  color: Color;
}

export function LogoBorder({ children, color }: IlogoBorderProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ outlineColor: color }}
      className={`aspect-square outline outline-1 h-[calc(100%-2px)] p-[1px]`}
      viewBox="0 0 124 124"
      fill={color}
    >
      <defs>
        <mask id="text">
          <rect width={"124"} height={"124"} fill="white" />
          <text
            alignmentBaseline="central"
            fill="black"
            fontFamily="monospace"
            fontWeight="bold"
            fontSize="95"
            // fontSize="74"
            textAnchor="middle"
            transform="translate(65 61)"
          >
            {children}
          </text>
        </mask>
      </defs>
      {/* <path
        d="M1,1 H123 V123 H1 V1"
        fill="none"
        stroke="#03C988"
        strokeWidth={6}
      /> */}
      <rect mask="url(#text)" width={114} height={114} x={5} y={5} />
    </svg>
  );
}
