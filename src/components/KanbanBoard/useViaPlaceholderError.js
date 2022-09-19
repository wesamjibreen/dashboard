export function useViaPlaceholderError(event, size) {
    const target = event.target
    target.src = `https://via.placeholder.com/${size}`
}
