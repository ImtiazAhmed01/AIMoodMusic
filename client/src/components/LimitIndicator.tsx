export default function LimitIndicator({ remaining }: { remaining: number }) {
    return (
        <div className="text-xs text-gray-400">
            🎧 Remaining today: {remaining}
        </div>
    );
}
