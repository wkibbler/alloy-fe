interface Props {
  height?: number;
  width?: number;
}

function Spacer({ height, width }: Props) {
  return <div style={{ height, width }} />;
}

export default Spacer;
