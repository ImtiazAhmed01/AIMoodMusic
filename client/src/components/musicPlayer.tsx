import YouTube from "react-youtube";

export default function MusicPlayer({ videoId }: { videoId: string }) {
    return <YouTube videoId={videoId} opts={{ width: "100%", height: "200" }} />;
}
