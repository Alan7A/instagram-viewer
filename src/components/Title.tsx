import React from "react";

interface Props {
  title: string;
}

const Title = (props: Props) => {
  const { title } = props;

  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {title}
    </h3>
  );
};

export default Title;
