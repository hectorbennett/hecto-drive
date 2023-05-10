// generate shadows

interface shadowArgs {
  x?: number;
  y?: number;
  blur?: number;
  spread?: number;
  colour?: string;
  inset?: boolean;
}

const shadow = ({
  x = 0,
  y = 0,
  blur = 0,
  spread = 0,
  colour = "black",
  inset = false,
}: shadowArgs) => {
  return `${
    inset ? "inset " : ""
  }${x}px ${y}px ${blur}px ${spread}px ${colour}`;
};

export default shadow;
