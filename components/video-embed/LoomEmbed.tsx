interface LoomEmbed {
  maxWidth: number;
  aspectRatio: number;
  videoId: string;
  title: string;
}

export const LoomEmbed: React.FC<LoomEmbed> = (props) => {
  return (
    <iframe
      width={props.maxWidth}
      loading="lazy"
      src={`https://www.loom.com/embed/${props.videoId}`}
      title={props.title}
      // eslint-disable-next-line react/forbid-dom-props
      style={{
        display: "block",
        maxWidth: "100%",
        aspectRatio: props.aspectRatio,
        border: "none",
      }}
      allowFullScreen
    ></iframe>
  );
};
