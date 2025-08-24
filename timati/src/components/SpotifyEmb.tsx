

export default function SpotifyEmb({playlistId}: {playlistId: string}){
    return (
        <iframe 
        src={`https://open.spotify.com/embed/playlist/${playlistId}`} 
        width = "300"
        height = "380"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"

        ></iframe>
    )
}