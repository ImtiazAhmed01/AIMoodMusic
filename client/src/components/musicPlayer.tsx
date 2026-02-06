
export default function MusicPlayer({ videoId }: { videoId: string }) {
    return (
        <iframe
            width="100%"
            height="220"
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="autoplay"
        />
    );
}
