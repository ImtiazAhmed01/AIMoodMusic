export default function MusicPlayer({ videoId }: any) {
    return (
        <div className="bg-black/40 p-4 rounded-xl">
            <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${videoId}`}
                allowFullScreen
            />
        </div>
    );
}
